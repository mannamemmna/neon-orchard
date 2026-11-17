// Neon Orchard — entry program (Node 22, standard library only).
//
// The game itself is this directory's game/ folder: plain static files a desktop browser
// loads offline from game/index.html, with no library and no network request. This program
// hands that game in. It copies game/ and screenshots/ beside this file to /output, then
// writes /output/dossier.json — the summary the judge reads — with the vendored make.fun
// library. Outside the grader's container MAKEFUN_OUTPUT_DIR stands in for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The checks below are the scorer's published caps, re-read after the copy: a build that
// the server would refuse fails here instead, naming the file that broke it.

import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's caps (reference/gate.json). Only text_max_bytes shapes the bytes; the rest
// refuse an entry the scorer would refuse: more than 4 screenshots or one over 256 KiB,
// more than 993 files in game/ or 48 MiB of game files in all, or a path under game/ over
// 1000 bytes. game/ counts beside /output's own 1000-entry cap, its screenshots/ and
// dossier.json.
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
};

const SCREENSHOT_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

interface Walked {
  path: string;
  bytes: number;
  isFile: boolean;
  isLink: boolean;
}

/** Every entry under `root`, depth first, as paths relative to it. Symlinks are reported
 *  but never followed: the gate refuses a symlink inside game/ outright. */
function walk(root: string): Walked[] {
  const found: Walked[] = [];
  const visit = (dir: string): void => {
    for (const name of readdirSync(dir)) {
      const absolute = join(dir, name);
      const shown = relative(root, absolute);
      const link = lstatSync(absolute, { throwIfNoEntry: false });
      if (link === undefined) continue;
      if (link.isSymbolicLink()) {
        found.push({ path: shown, bytes: 0, isFile: false, isLink: true });
        continue;
      }
      if (link.isDirectory()) {
        found.push({ path: shown, bytes: 0, isFile: false, isLink: false });
        visit(absolute);
      } else {
        found.push({ path: shown, bytes: link.size, isFile: link.isFile(), isLink: false });
      }
    }
  };
  visit(root);
  return found;
}

/** The gate's game_files and screenshots rows, checked against what was actually copied,
 *  so a cap breach names the offending path here rather than on the server. */
function verifyOutput(): void {
  const problems: string[] = [];

  const gameDir = join(out, 'game');
  const index = join(gameDir, 'index.html');
  if (!existsSync(index)) {
    problems.push('game/index.html is missing: the game is served from there');
  } else {
    const info = statSync(index);
    if (!info.isFile()) problems.push('game/index.html is not a regular file');
    if (info.size > 1048576) problems.push(`game/index.html is ${info.size} bytes, over the 1 MiB cap`);
  }

  const gameFiles = existsSync(gameDir) ? walk(gameDir) : [];
  const entryCount = gameFiles.length;
  const byteCount = gameFiles.reduce((sum, entry) => sum + entry.bytes, 0);
  for (const entry of gameFiles) {
    if (entry.isLink) problems.push(`game/${entry.path} is a symlink: game/ must be plain files and directories`);
    if (Buffer.byteLength(entry.path.split(sep).join('/'), 'utf8') > CAPS.game_path_max_bytes) {
      problems.push(`game/${entry.path} has a path over ${CAPS.game_path_max_bytes} bytes`);
    }
  }
  if (entryCount > CAPS.game_max_files) {
    problems.push(`game/ holds ${entryCount} files and directories, over the ${CAPS.game_max_files} cap`);
  }
  if (byteCount > CAPS.game_max_bytes) {
    problems.push(`game/ holds ${byteCount} bytes, over the ${CAPS.game_max_bytes}-byte cap`);
  }

  const shotDir = join(out, 'screenshots');
  const shots = existsSync(shotDir) ? walk(shotDir).filter((entry) => entry.isFile) : [];
  if (shots.length < 3 || shots.length > CAPS.screenshots.max) {
    problems.push(`screenshots/ holds ${shots.length} images; the entry needs 3 or 4`);
  }
  for (const shot of shots) {
    const name = shot.path.split(sep).join('/');
    if (!SCREENSHOT_NAME.test(name)) problems.push(`screenshots/${name} is not a plain image name`);
    if (shot.bytes > CAPS.screenshots.max_bytes) {
      problems.push(`screenshots/${name} is ${shot.bytes} bytes, over the ${CAPS.screenshots.max_bytes}-byte cap`);
    }
  }

  // The dossier is what the judge reads, so its own cap is checked on the bytes written.
  const dossier = join(out, 'dossier.json');
  if (!existsSync(dossier)) {
    problems.push('dossier.json was not written');
  } else if (statSync(dossier).size > 1572864) {
    problems.push(`dossier.json is ${statSync(dossier).size} bytes, over the 1.5 MiB cap`);
  }

  if (problems.length > 0) {
    throw new Error(`the output would be refused:\n  ${problems.join('\n  ')}`);
  }

  const totals = readFileSync(dossier, 'utf8')
    .split('\n')
    .find((line) => line.startsWith('Totals:'));
  process.stdout.write(
    `Neon Orchard: ${entryCount} entries, ${byteCount} bytes under game/, ${shots.length} screenshots` +
      `${totals === undefined ? '' : `; ${totals}`}\n`,
  );
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

writeFileSync(join(out, 'dossier.json'), buildDossier(out, CAPS));

verifyOutput();

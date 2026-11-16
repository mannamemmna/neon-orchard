import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
const root = join(import.meta.dirname, 'game');
const types: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
createServer(async (req, res) => {
  let pathname: string;
  try { pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (relative(root, file).startsWith('..')) { res.writeHead(403).end('Forbidden'); return; }
  let data: Buffer;
  try { data = await readFile(file); }
  catch { if (!res.destroyed) res.writeHead(404).end('Not found'); return; }
  // Only a failed read is a 404; never try to send headers twice.
  if (res.destroyed) return;
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  res.end(req.method === 'HEAD' ? undefined : data);
}).listen(8080, '127.0.0.1', () => console.log('Neon Orchard at http://localhost:8080'));

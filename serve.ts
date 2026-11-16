import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = join(import.meta.dirname, 'game');
const types: Record<string,string> = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css' };
createServer(async (req,res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const file = normalize(join(root, url.pathname === '/' ? 'index.html' : url.pathname));
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  try { const data = await readFile(file); res.writeHead(200, {'content-type': types[extname(file)] ?? 'application/octet-stream'}); res.end(data); }
  catch { res.writeHead(404); res.end('Not found'); }
}).listen(8080, '127.0.0.1', () => console.log('Neon Orchard at http://localhost:8080'));

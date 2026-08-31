import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const htmlPath = path.join(os.tmpdir(), 'tg-channel.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const urls = [...new Set([...html.matchAll(/https:\/\/cdn4\.telesco\.pe\/file\/[^"']+\.jpg/g)].map((m) => m[0]))];

console.log('count', urls.length);
urls.forEach((u, i) => console.log(`${i + 1}\t${u}`));

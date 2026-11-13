import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const radice = fileURLToPath(new URL('../../', import.meta.url));
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11'] });
try {
  const p = await browser.newPage();
  p.on('console', m => console.log('pagina:', m.text()));
  p.on('pageerror', e => console.log('errore:', e.message));
  await p.goto('http://localhost:5432/_lavoro/lod/index.html');
  await p.waitForFunction(() => window.__lod, null, { timeout: 600000, polling: 1000 });
  console.log(await p.textContent('#log'));
  const { testata, base64 } = await p.evaluate(() => window.__lod);
  writeFileSync(`${radice}public/modelli/concept-lod.bin`, Buffer.from(base64, 'base64'));
  writeFileSync(`${radice}public/modelli/concept-lod.json`, JSON.stringify({ origine: 'concept.glb semplificato con SimplifyModifier di three.js (strumento _lavoro/lod)', pezzi: testata }));
} finally {
  await browser.close();
}

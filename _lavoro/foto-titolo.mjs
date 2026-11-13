import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FOTO = fileURLToPath(new URL('./foto/finali/', import.meta.url));
mkdirSync(FOTO, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
try {
  for (const [l, a, nome] of [[1600, 900, 'titolo'], [1280, 720, 'titolo-piccolo']]) {
    const contesto = await browser.newContext({ viewport: { width: l, height: a } });
    await contesto.addInitScript(() => localStorage.setItem('corsa.grafica', 'alta'));
    const p = await contesto.newPage();
    await p.goto('http://localhost:5432/?locale');
    await p.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 180000 });
    await p.waitForTimeout(4000);
    await p.screenshot({ path: `${FOTO}${nome}.png` });
    await contesto.close();
  }
} finally {
  await browser.close();
}

import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] ?? 'http://localhost:5432/?locale';
const QUALITA = process.argv[3] ?? 'alta';
const FOTO = fileURLToPath(new URL('./foto/', import.meta.url));
mkdirSync(FOTO, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
const errori = [];
try {
  const contesto = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  await contesto.addInitScript(q => localStorage.setItem('corsa.grafica', q), QUALITA);
  const p = await contesto.newPage();
  p.on('pageerror', e => errori.push(`pagina: ${e.message}`));
  p.on('console', m => { if (m.type() === 'error' && !/favicon/.test(m.text())) errori.push(`console: ${m.text().slice(0, 300)}`); });
  const t0 = Date.now();
  await p.goto(BASE);
  await p.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 180000 });
  console.log(`pronto in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${FOTO}01-titolo.png` });
  await p.fill('#nome', 'Richi');
  await p.click('#entra');
  await p.waitForFunction(() => window.__gioco.stato().vista, null, { timeout: 30000 });
  await p.waitForTimeout(3000);
  console.log('stato', JSON.stringify(await p.evaluate(() => window.__gioco.stato())));
  await p.screenshot({ path: `${FOTO}02-griglia.png` });
  await p.keyboard.down('KeyW');
  await p.waitForTimeout(4000);
  await p.screenshot({ path: `${FOTO}03-via.png` });
  await p.waitForTimeout(3000);
  await p.keyboard.up('KeyW');
  console.log('stato', JSON.stringify(await p.evaluate(() => window.__gioco.stato())));
  await p.screenshot({ path: `${FOTO}04-guida.png` });
  console.log('statistiche', JSON.stringify(await p.evaluate(() => window.__gioco.statistiche())));
} catch (e) {
  console.log('NON RIUSCITO:', e.message.split('\n')[0]);
} finally {
  for (const e of [...new Set(errori)].slice(0, 12)) console.log('  errore:', e);
  await browser.close();
}

import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FOTO = fileURLToPath(new URL('./foto/finali/', import.meta.url));
mkdirSync(FOTO, { recursive: true });
const QUALITA = process.argv[2] ?? 'alta';
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
try {
  const contesto = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  await contesto.addInitScript(q => localStorage.setItem('corsa.grafica', q), QUALITA);
  const p = await contesto.newPage();
  await p.goto('http://localhost:5432/?locale');
  await p.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 180000 });
  await p.fill('#nome', 'Richi');
  await p.click('.t-livree button:nth-child(1)');
  await p.click('#entra');
  await p.waitForFunction(() => window.__gioco.stato().vista, null, { timeout: 30000 });
  await p.evaluate(() => {
    window.__gioco.autopilota(true);
    window.__gioco.giri(2);
  });
  for (const [indice, nome] of [[0, 'anello'], [1, 'sanrocco'], [2, 'triangolo']]) {
    await p.evaluate(i => window.__gioco.pista(i), indice);
    await p.waitForTimeout(1500);
    await p.keyboard.press('Enter');
    await p.waitForFunction(() => window.__gioco.stato().vista.fase === 'partenza', null, { timeout: 15000 });
    await p.waitForTimeout(3400);
    if (indice === 0) await p.screenshot({ path: `${FOTO}${nome}-semafori.png` });
    await p.waitForFunction(() => window.__gioco.stato().vista.fase === 'gara', null, { timeout: 15000 });
    await p.waitForTimeout(indice === 2 ? 14000 : 7000);
    await p.screenshot({ path: `${FOTO}${nome}-gara.png` });
    if (indice === 1) {
      await p.keyboard.press('KeyC');
      await p.waitForTimeout(1500);
      await p.screenshot({ path: `${FOTO}${nome}-lontana.png` });
      await p.keyboard.press('KeyC');
      await p.keyboard.press('KeyC');
      await p.keyboard.press('KeyC');
    }
    await p.waitForTimeout(9000);
    await p.screenshot({ path: `${FOTO}${nome}-gara2.png` });
  }
} finally {
  await browser.close();
}

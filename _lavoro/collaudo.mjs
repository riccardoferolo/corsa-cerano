import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const QUALITA = process.argv[2] ?? 'media';
const FOTO = fileURLToPath(new URL('./foto/collaudo/', import.meta.url));
mkdirSync(FOTO, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
const errori = [];
const esiti = [];
const verifica = (nome, ok, dettaglio = '') => {
  esiti.push(ok);
  console.log(`${ok ? 'OK ' : 'NO '} ${nome}${dettaglio ? ` · ${dettaglio}` : ''}`);
};
try {
  const contesto = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  await contesto.addInitScript(q => localStorage.setItem('corsa.grafica', q), QUALITA);
  const p = await contesto.newPage();
  p.on('pageerror', e => errori.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errori.push(m.text().slice(0, 200)); });
  await p.goto('http://localhost:5432/?locale');
  await p.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 180000 });
  await p.fill('#nome', 'Collaudo');
  await p.click('#entra');
  await p.waitForFunction(() => window.__gioco.stato().vista, null, { timeout: 30000 });
  const stato = () => p.evaluate(() => window.__gioco.stato());
  verifica('entra nel mondo come host con 7 avversari', (await stato()).vista.partecipanti === 8);
  await p.evaluate(() => {
    window.__gioco.giri(1);
    window.__gioco.autopilota(true);
  });
  await p.keyboard.press('Enter');
  await p.waitForFunction(() => window.__gioco.stato().vista.fase === 'partenza', null, { timeout: 15000 });
  verifica('Invio = pronto accorcia le prove', true);
  await p.waitForTimeout(3200);
  await p.screenshot({ path: `${FOTO}01-semafori.png` });
  const fermo = await stato();
  verifica('in griglia l\'auto è ferma', fermo.io.fermo && fermo.io.v < 0.5);
  await p.waitForFunction(() => window.__gioco.stato().vista.fase === 'gara', null, { timeout: 15000 });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${FOTO}02-via.png` });
  await p.waitForTimeout(9000);
  await p.screenshot({ path: `${FOTO}03-gara.png` });
  await p.keyboard.press('KeyC');
  await p.keyboard.press('KeyC');
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${FOTO}04-cofano.png` });
  await p.keyboard.press('KeyC');
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${FOTO}05-abitacolo.png` });
  await p.keyboard.press('KeyC');
  const t0 = Date.now();
  await p.waitForFunction(() => window.__gioco.stato().vista.fase === 'arrivo', null, { timeout: 240000, polling: 1000 });
  verifica('la gara finisce', true, `${((Date.now() - t0) / 1000).toFixed(0)} s`);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${FOTO}06-arrivo.png` });
  const righe = await p.$$eval('#risultati-righe tr', r => r.length);
  verifica('classifica d\'arrivo con 8 righe', righe === 8, `${righe}`);
  await p.waitForFunction(() => window.__gioco.stato().vista.fase === 'prove', null, { timeout: 30000 });
  const dopo = await stato();
  verifica('poi si passa alla pista successiva', dopo.vista.pista === 1, `pista ${dopo.vista.pista}`);
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${FOTO}07-sanrocco.png` });
} catch (e) {
  verifica('collaudo completo', false, e.message.split('\n')[0]);
} finally {
  for (const e of [...new Set(errori)].slice(0, 10)) console.log('  errore:', e);
  console.log(esiti.every(Boolean) && !errori.length ? 'TUTTO OK' : 'PROBLEMI');
  await browser.close();
}

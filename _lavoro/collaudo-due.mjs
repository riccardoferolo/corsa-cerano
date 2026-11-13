import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] ?? 'http://localhost:5432/?locale';
const FOTO = fileURLToPath(new URL('./foto/due/', import.meta.url));
mkdirSync(FOTO, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
const errori = [];
const esiti = [];
const verifica = (nome, ok, dettaglio = '') => {
  esiti.push(ok);
  console.log(`${ok ? 'OK ' : 'NO '} ${nome}${dettaglio ? ` · ${dettaglio}` : ''}`);
};
try {
  const contesto = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await contesto.addInitScript(() => localStorage.setItem('corsa.grafica', 'bassa'));
  const entra = async nome => {
    const p = await contesto.newPage();
    p.on('pageerror', e => errori.push(`${nome}: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error') errori.push(`${nome}: ${m.text().slice(0, 200)}`); });
    await p.goto(BASE);
    await p.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 180000 });
    await p.fill('#nome', nome);
    await p.click('#entra');
    return p;
  };
  const a = await entra('Richi');
  await a.waitForFunction(() => window.__gioco.stato().host, null, { timeout: 20000 });
  verifica('il primo organizza la gara', true);
  const b = await entra('Seba');
  await b.waitForFunction(() => window.__gioco.stato().vista?.partecipanti === 8 && !window.__gioco.stato().host, null, { timeout: 40000 }).catch(() => {});
  const sa = await a.evaluate(() => window.__gioco.stato());
  const sb = await b.evaluate(() => window.__gioco.stato());
  const umaniA = await a.evaluate(() => [...window.__gioco.gara().partecipanti.values()].filter(p => !p.ia).map(p => p.nome));
  verifica('il secondo entra come ospite', !sb.host, `vista ${JSON.stringify(sb.vista && { fase: sb.vista.fase, n: sb.vista.partecipanti })}`);
  verifica('l\'host vede due piloti e sei avversari', umaniA.length === 2 && sa.vista.partecipanti === 8, umaniA.join(', '));
  await b.bringToFront();
  await b.keyboard.down('KeyW');
  await b.waitForTimeout(3500);
  await b.keyboard.up('KeyW');
  const posB = await b.evaluate(() => window.__gioco.stato().io);
  const vistaDaA = await a.evaluate(id => {
    const p = window.__gioco.gara().partecipanti.get(id);
    return p ? { s: p.s, auto: p.auto ? { x: p.auto.x, z: p.auto.z } : null } : null;
  }, await b.evaluate(() => window.__gioco.mioId?.() ?? null));
  void vistaDaA;
  const mossoSuA = await a.evaluate(() => {
    const umani = [...window.__gioco.gara().partecipanti.values()].filter(p => !p.ia);
    return umani.map(p => ({ nome: p.nome, s: Math.round(p.s) }));
  });
  verifica('l\'auto dell\'ospite si muove anche sull\'host', mossoSuA.some(p => p.nome === 'Seba' && Math.abs(p.s - posB.s) < 40), `${JSON.stringify(mossoSuA)} contro s ${Math.round(posB.s)}`);
  await a.screenshot({ path: `${FOTO}richi.png` });
  await b.screenshot({ path: `${FOTO}seba.png` });
  await a.close();
  await b.waitForFunction(() => window.__gioco.stato().host, null, { timeout: 30000 }).catch(() => {});
  const dopo = await b.evaluate(() => window.__gioco.stato());
  verifica('se l\'host se ne va, la gara passa all\'altro', dopo.host, `fase ${dopo.vista?.fase}`);
  await b.waitForTimeout(2000);
  await b.screenshot({ path: `${FOTO}seba-host.png` });
} catch (e) {
  verifica('collaudo in due', false, e.message.split('\n')[0]);
} finally {
  for (const e of [...new Set(errori)].slice(0, 10)) console.log('  errore:', e);
  console.log(esiti.every(Boolean) && !errori.length ? 'TUTTO OK' : 'PROBLEMI');
  await browser.close();
}

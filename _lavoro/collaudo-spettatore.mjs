import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5432/?locale';
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
const errori = [];
const esiti = [];
const verifica = (nome, ok, dettaglio = '') => {
  esiti.push(ok);
  console.log(`${ok ? 'OK ' : 'NO '} ${nome}${dettaglio ? ` · ${dettaglio}` : ''}`);
};
try {
  const contesto = await browser.newContext({ viewport: { width: 1024, height: 600 } });
  await contesto.addInitScript(() => localStorage.setItem('corsa.grafica', 'bassa'));
  const entra = async nome => {
    const p = await contesto.newPage();
    p.on('pageerror', e => errori.push(`${nome}: ${e.message}`));
    await p.goto(BASE);
    await p.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 180000 });
    await p.fill('#nome', nome);
    await p.click('#entra');
    return p;
  };
  const a = await entra('Host');
  await a.waitForFunction(() => window.__gioco.stato().host, null, { timeout: 20000 });
  const b = await entra('Esce');
  await a.waitForFunction(() => [...window.__gioco.gara().partecipanti.values()].filter(p => !p.ia).length === 2, null, { timeout: 40000 });
  await b.close();
  await a.waitForTimeout(9000);
  const dopo = await a.evaluate(() => ({ umani: [...window.__gioco.gara().partecipanti.values()].filter(p => !p.ia).length, ia: [...window.__gioco.gara().partecipanti.values()].filter(p => p.ia).length, fase: window.__gioco.stato().vista.fase }));
  verifica('chi esce durante le prove viene sostituito e l\'host continua', dopo.umani === 1 && dopo.ia === 7, JSON.stringify(dopo));
  await a.evaluate(() => {
    window.__gioco.autopilota(true);
    window.__gioco.fase('partenza');
  });
  await a.waitForFunction(() => window.__gioco.stato().vista.fase === 'gara', null, { timeout: 20000 });
  const c = await entra('Tardi');
  await c.waitForFunction(() => window.__gioco.stato().vista?.fase === 'gara', null, { timeout: 40000 });
  await c.waitForTimeout(10000);
  const sc = await c.evaluate(() => window.__gioco.stato());
  const ancora = await a.evaluate(() => [...window.__gioco.gara().partecipanti.values()].find(p => p.nome === 'Tardi'));
  verifica('chi arriva a gara iniziata guarda da spettatore', sc.io.spettatore === true);
  verifica('e dopo 10 s non viene buttato fuori', !!ancora && ancora.spettatore === true);
  await a.evaluate(() => window.__gioco.fase('prove'));
  await c.waitForFunction(() => window.__gioco.stato().vista?.fase === 'prove' && !window.__gioco.stato().io.spettatore, null, { timeout: 15000 }).catch(() => {});
  const poi = await c.evaluate(() => window.__gioco.stato());
  verifica('alla gara dopo entra in pista', poi.io.spettatore === false, `fase ${poi.vista?.fase}`);
} catch (e) {
  verifica('collaudo spettatore', false, e.message.split('\n')[0]);
} finally {
  for (const e of [...new Set(errori)].slice(0, 10)) console.log('  errore:', e);
  console.log(esiti.every(Boolean) && !errori.length ? 'TUTTO OK' : 'PROBLEMI');
  await browser.close();
}

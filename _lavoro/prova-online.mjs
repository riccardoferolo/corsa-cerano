import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] ?? 'https://riccardoferolo.github.io/corsa-cerano/';
const FOTO = fileURLToPath(new URL('./foto/online/', import.meta.url));
const ATTESA_PUBBLICAZIONE_MS = 240000;
mkdirSync(FOTO, { recursive: true });

async function attendiPubblicazione() {
  const fine = Date.now() + ATTESA_PUBBLICAZIONE_MS;
  while (Date.now() < fine) {
    const r = await fetch(BASE, { signal: AbortSignal.timeout(15000) }).catch(() => null);
    if (r?.ok && (await r.text()).includes('Gran Premio di Cerano')) return true;
    await new Promise(ok => setTimeout(ok, 10000));
  }
  return false;
}

if (!(await attendiPubblicazione())) {
  console.log('NON PUBBLICATO: la pagina non risponde');
  process.exit(1);
}
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
let esito = 1;
try {
  const contesto = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await contesto.addInitScript(() => localStorage.setItem('corsa.grafica', 'media'));
  const errori = [];
  const entra = async nome => {
    const p = await contesto.newPage();
    p.on('pageerror', e => errori.push(`${nome}: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error') errori.push(`${nome}: ${m.text().slice(0, 200)}`); });
    const t0 = Date.now();
    await p.goto(BASE);
    await p.waitForFunction(() => !document.getElementById('entra').disabled, null, { timeout: 180000 });
    console.log(`${nome}: pronto in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
    await p.fill('#nome', nome);
    await p.click('#entra');
    return p;
  };
  const a = await entra('Richi');
  await a.waitForFunction(() => /Organizzi tu/.test(document.getElementById('rete')?.textContent ?? ''), null, { timeout: 30000 });
  const b = await entra('Seba');
  await b.waitForFunction(() => /2 piloti/.test(document.getElementById('rete')?.textContent ?? ''), null, { timeout: 60000 }).catch(() => {});
  await a.waitForTimeout(3000);
  const reteA = await a.textContent('#rete');
  const reteB = await b.textContent('#rete');
  console.log('Richi:', reteA);
  console.log('Seba:', reteB);
  await a.screenshot({ path: `${FOTO}richi.png` });
  await b.screenshot({ path: `${FOTO}seba.png` });
  for (const e of [...new Set(errori)].slice(0, 8)) console.log('  errore:', e);
  const insieme = /2 piloti/.test(reteA) && /2 piloti/.test(reteB);
  console.log(insieme && !errori.length ? 'TUTTO OK: stessa pista online' : 'PROBLEMI');
  esito = insieme && !errori.length ? 0 : 1;
} catch (e) {
  console.log('NON RIUSCITO:', e.message.split('\n')[0]);
} finally {
  await browser.close();
}
process.exitCode = esito;

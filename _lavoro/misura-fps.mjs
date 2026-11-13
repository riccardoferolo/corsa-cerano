import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5432/?locale';
const QUALITA = process.argv[3] ?? 'alta';
const SECONDI = Number(process.argv[4] ?? 14);
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-frame-rate-limit'] });
try {
  const contesto = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  await contesto.addInitScript(q => localStorage.setItem('corsa.grafica', q), QUALITA);
  const p = await contesto.newPage();
  const mancanti = [];
  p.on('response', r => { if (r.status() >= 400) mancanti.push(`${r.status()} ${r.url()}`); });
  await p.goto(BASE);
  await p.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 180000 });
  await p.fill('#nome', 'Misura');
  await p.click('#entra');
  await p.waitForFunction(() => window.__gioco.stato().vista, null, { timeout: 30000 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => {
    window.__fps = [];
    let prima = performance.now();
    const giro = ora => {
      window.__fps.push(ora - prima);
      prima = ora;
      requestAnimationFrame(giro);
    };
    requestAnimationFrame(giro);
  });
  await p.keyboard.down('KeyW');
  for (let i = 0; i < SECONDI; i++) {
    await p.waitForTimeout(1000);
    if (i % 4 === 3) {
      await p.keyboard.down('KeyD');
      await p.waitForTimeout(250);
      await p.keyboard.up('KeyD');
    }
  }
  await p.keyboard.up('KeyW');
  const esito = await p.evaluate(() => {
    const t = window.__fps.slice(10);
    const ordinati = [...t].sort((a, b) => a - b);
    const media = t.reduce((a, b) => a + b, 0) / t.length;
    const secondi = [];
    let acc = 0;
    let lenti = 0;
    for (const v of t) {
      acc += v;
      if (v > 25) lenti += 1;
      if (acc > 1000) {
        secondi.push(lenti);
        acc = 0;
        lenti = 0;
      }
    }
    return { secondi, tempi: window.__gioco.tempi(), fotogrammi: t.length, fps: 1000 / media, p95: ordinati[Math.floor(t.length * 0.95)], lenti: t.filter(v => v > 20).length / t.length, stato: window.__gioco.stato(), statistiche: window.__gioco.statistiche() };
  });
  console.log('cpu ms per fotogramma', JSON.stringify(esito.tempi), 'scatti >25ms per secondo', esito.secondi.join(','));
  console.log(JSON.stringify({ fps: esito.fps.toFixed(1), p95ms: esito.p95.toFixed(1), lenti: `${(esito.lenti * 100).toFixed(1)}%`, qualita: esito.stato.qualita, scala: esito.stato.scala, chiamate: esito.statistiche.calls, triangoli: esito.statistiche.triangles }));
  for (const m of [...new Set(mancanti)]) console.log('  mancante:', m);
} finally {
  await browser.close();
}

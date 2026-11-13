import { chromium } from 'playwright-core';

const QUALITA = process.argv[2] ?? 'media';
const VSYNC = process.argv.includes('--vsync');
const args = ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'];
if (!VSYNC) args.push('--disable-frame-rate-limit');
const browser = await chromium.launch({ channel: 'msedge', headless: true, args });
try {
  const contesto = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  await contesto.addInitScript(q => localStorage.setItem('corsa.grafica', q), QUALITA);
  const p = await contesto.newPage();
  await p.goto('http://localhost:5432/?locale');
  await p.waitForFunction(() => window.__gioco?.pronto(), null, { timeout: 180000 });
  await p.waitForTimeout(3000);
  await p.evaluate(() => window.__gioco.registro());
  await p.waitForTimeout(4000);
  const titolo = await p.evaluate(() => window.__gioco.registro());
  await p.fill('#nome', 'Scatti');
  await p.click('#entra');
  await p.waitForTimeout(2000);
  await p.keyboard.down('KeyW');
  await p.waitForTimeout(2000);
  await p.evaluate(() => window.__gioco.registro());
  await p.waitForTimeout(6000);
  const gioco = await p.evaluate(() => window.__gioco.registro());
  await p.keyboard.up('KeyW');
  const riassunto = (nome, r) => {
    const intervalli = r.slice(1).map((v, i) => [v[0] - r[i][0], v[1], v[2]]);
    const lunghi = intervalli.filter(v => v[0] > 25);
    const media = intervalli.reduce((a, v) => a + v[0], 0) / intervalli.length;
    console.log(`${nome}: ${(1000 / media).toFixed(1)} fps, ${lunghi.length}/${intervalli.length} lunghi; cpu media ${(intervalli.reduce((a, v) => a + v[1], 0) / intervalli.length).toFixed(1)} ms`);
    console.log('  lunghi [intervallo, cpu, render]:', lunghi.slice(0, 12).map(v => v.map(x => x.toFixed(0)).join('/')).join('  '));
  };
  riassunto('titolo', titolo);
  riassunto('gioco', gioco);
} finally {
  await browser.close();
}

import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
const errori = [];
try {
  const p = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  p.on('pageerror', e => errori.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errori.push(m.text().slice(0, 200)); });
  await p.goto('http://localhost:5433/?locale');
  await p.waitForFunction(() => !document.getElementById('entra').disabled, null, { timeout: 120000 });
  await p.fill('#nome', 'Dist');
  await p.click('#entra');
  await p.waitForFunction(() => /P\d/.test(document.getElementById('posizione').textContent), null, { timeout: 30000 });
  console.log('posizione', await p.textContent('#posizione'), '·', await p.textContent('#fase'));
} catch (e) {
  console.log('NON RIUSCITO', e.message.split('\n')[0]);
} finally {
  for (const e of errori) console.log('errore:', e);
  await browser.close();
}

import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { preparaCitta } from '../src/citta/citta.js';
import { campionaLinea } from '../src/citta/geometria.js';

const [cx = 0, cz = 0, raggio = 700, lato = 1700] = process.argv.slice(2).map(Number);
const radice = fileURLToPath(new URL('../', import.meta.url));
const dati = JSON.parse(readFileSync(`${radice}public/cerano/cerano.json`, 'utf8'));
const citta = preparaCitta(dati, { conParcheggi: false });
const muro = v => v.etichetta === 'muro' || v.etichetta === 'sponda' || v.etichetta === 'confine';
const scala = lato / (2 * raggio);
const px = x => ((x - cx + raggio) * scala).toFixed(1);
const pz = z => ((z - cz + raggio) * scala).toFixed(1);
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${lato}" height="${lato}" style="background:#1d2430;font-family:Arial">`;
for (const e of dati.edifici) if (e.p.some(([x, z]) => Math.abs(x - cx) < raggio && Math.abs(z - cz) < raggio)) svg += `<polygon points="${e.p.map(([x, z]) => `${px(x)},${pz(z)}`).join(' ')}" fill="#363d4a"/>`;
const colore = l => (l < 5.6 ? '#ff2d55' : l < 7.5 ? '#ffb020' : l < 9.5 ? '#c6f03a' : '#20e070');
for (const s of dati.strade) {
  if (!s.a || s.t === 'track') continue;
  if (!s.p.some(([x, z]) => Math.abs(x - cx) < raggio && Math.abs(z - cz) < raggio)) continue;
  const campioni = campionaLinea(s.p, 3);
  for (let i = 1; i < campioni.length; i++) {
    const a = campioni[i - 1];
    const b = campioni[i];
    const nx = b.uz;
    const nz = -b.ux;
    const sx = citta.collisioni.raggio(b.x, b.z, nx, nz, 12, muro).distanza;
    const dx = citta.collisioni.raggio(b.x, b.z, -nx, -nz, 12, muro).distanza;
    svg += `<line x1="${px(a.x)}" y1="${pz(a.z)}" x2="${px(b.x)}" y2="${pz(b.z)}" stroke="${colore(sx + dx)}" stroke-width="${Math.max(2, 4 * scala)}" stroke-linecap="round"/>`;
  }
}
for (let g = Math.ceil((cx - raggio) / 100) * 100; g <= cx + raggio; g += 100) svg += `<text x="${px(g)}" y="12" fill="#8899aa" font-size="11">${g}</text>`;
for (let g = Math.ceil((cz - raggio) / 100) * 100; g <= cz + raggio; g += 100) svg += `<text x="2" y="${pz(g)}" fill="#8899aa" font-size="11">${g}</text>`;
const nomi = new Map();
for (const s of dati.strade) if (s.a && s.n && s.p.some(([x, z]) => Math.abs(x - cx) < raggio && Math.abs(z - cz) < raggio)) nomi.set(s.n, s.p[Math.floor(s.p.length / 2)]);
for (const [n, p] of nomi) svg += `<text x="${px(p[0])}" y="${pz(p[1])}" fill="#bfefff" font-size="12" stroke="#000" stroke-width="2.5" paint-order="stroke">${n}</text>`;
svg += '</svg>';
mkdirSync(`${radice}_lavoro/mappe`, { recursive: true });
const nome = `${radice}_lavoro/mappe/larghezze_${cx}_${cz}_${raggio}`;
writeFileSync(`${nome}.svg`, svg);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const p = await browser.newPage({ viewport: { width: lato, height: lato } });
  await p.setContent(svg);
  await p.screenshot({ path: `${nome}.png` });
} finally {
  await browser.close();
}
console.log(`${nome}.png`);

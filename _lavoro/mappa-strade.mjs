import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const [cx = 0, cz = 0, raggio = 1400, lato = 1800, extra = ''] = process.argv.slice(2).map((v, i) => (i < 4 ? Number(v) : v));
const radice = fileURLToPath(new URL('../', import.meta.url));
const dati = JSON.parse(readFileSync(`${radice}public/cerano/cerano.json`, 'utf8'));
const scala = lato / (2 * raggio);
const px = x => ((x - cx + raggio) * scala).toFixed(1);
const pz = z => ((z - cz + raggio) * scala).toFixed(1);
const colore = s => (s.r >= 4 ? '#ffb347' : s.r >= 3 ? '#ffe08a' : s.t === 'residential' ? '#ffffff' : s.t === 'track' ? '#777' : '#bbbbbb');
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${lato}" height="${lato}" style="background:#1d2430;font-family:Arial">`;
for (const e of dati.edifici) {
  if (e.p.some(([x, z]) => Math.abs(x - cx) < raggio && Math.abs(z - cz) < raggio)) svg += `<polygon points="${e.p.map(([x, z]) => `${px(x)},${pz(z)}`).join(' ')}" fill="#3a4250"/>`;
}
for (let g = Math.ceil((cx - raggio) / 100) * 100; g <= cx + raggio; g += 100) svg += `<line x1="${px(g)}" y1="0" x2="${px(g)}" y2="${lato}" stroke="#2c3646" stroke-width="1"/><text x="${px(g)}" y="12" fill="#8899aa" font-size="10">${g}</text>`;
for (let g = Math.ceil((cz - raggio) / 100) * 100; g <= cz + raggio; g += 100) svg += `<line x1="0" y1="${pz(g)}" x2="${lato}" y2="${pz(g)}" stroke="#2c3646" stroke-width="1"/><text x="2" y="${pz(g)}" fill="#8899aa" font-size="10">${g}</text>`;
const etichette = new Map();
for (const s of dati.strade) {
  if (!s.a) continue;
  if (!s.p.some(([x, z]) => Math.abs(x - cx) < raggio && Math.abs(z - cz) < raggio)) continue;
  svg += `<polyline points="${s.p.map(([x, z]) => `${px(x)},${pz(z)}`).join(' ')}" fill="none" stroke="${colore(s)}" stroke-width="${Math.max(1, s.l * scala)}" stroke-linecap="round" stroke-linejoin="round" opacity="${s.s ? 0.5 : 0.9}"/>`;
  if (s.n) {
    const lunghezza = s.p.reduce((t, p, i) => (i ? t + Math.hypot(p[0] - s.p[i - 1][0], p[1] - s.p[i - 1][1]) : 0), 0);
    if (!etichette.has(s.n) || etichette.get(s.n).l < lunghezza) etichette.set(s.n, { l: lunghezza, p: s.p[Math.floor(s.p.length / 2)] });
  }
}
for (const [n, { p }] of etichette) svg += `<text x="${px(p[0])}" y="${pz(p[1])}" fill="#7fe0ff" font-size="${Math.max(9, 11 * Math.min(1.6, scala * 1.6))}" stroke="#000" stroke-width="2.5" paint-order="stroke">${n}</text>`;
if (extra) {
  for (const traccia of JSON.parse(readFileSync(extra, 'utf8'))) {
    svg += `<polyline points="${traccia.p.map(([x, z]) => `${px(x)},${pz(z)}`).join(' ')}" fill="none" stroke="${traccia.c ?? '#ff3b6b'}" stroke-width="3" opacity="0.85"/>`;
    for (const [x, z, t] of traccia.m ?? []) svg += `<circle cx="${px(x)}" cy="${pz(z)}" r="4" fill="#00ff99"/><text x="${px(x)}" y="${pz(z)}" fill="#00ff99" font-size="11">${t ?? ''}</text>`;
  }
}
svg += '</svg>';
mkdirSync(`${radice}_lavoro/mappe`, { recursive: true });
const nome = `${radice}_lavoro/mappe/strade_${cx}_${cz}_${raggio}${extra ? '_tracce' : ''}`;
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

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { preparaCitta } from '../src/citta/citta.js';
import { CIRCUITI, costruisciPista } from '../src/gioco/pista.js';

const radice = fileURLToPath(new URL('../', import.meta.url));
const dati = JSON.parse(readFileSync(`${radice}public/cerano/cerano.json`, 'utf8'));
const citta = preparaCitta(dati, { conParcheggi: false });
const scelti = process.argv[2] ? CIRCUITI.filter(c => c.id === process.argv[2]) : CIRCUITI;
for (const c of scelti) {
  const t0 = performance.now();
  const p = costruisciPista(citta, c);
  const curve = [...p.curva].map(Math.abs);
  const raggioMinimo = 1 / Math.max(...curve);
  const vMin = Math.min(...p.velocita);
  const lunghezzaBarriere = p.barriere.reduce((t, b) => t + b.punti.length, 0);
  const sx = [...p.sinistra]; const dx = [...p.destra];
  console.log(`${c.id}: ${p.lunghezza.toFixed(0)} m, punti ${p.n}, raggio minimo ${raggioMinimo.toFixed(1)} m, larghezza ${Math.min(...p.sinistra.map((v, i) => v + p.destra[i])).toFixed(1)}-${Math.max(...p.sinistra.map((v, i) => v + p.destra[i])).toFixed(1)} media ${(sx.reduce((a, b) => a + b, 0) / p.n + dx.reduce((a, b) => a + b, 0) / p.n).toFixed(1)}, vmin ${(vMin * 3.6).toFixed(0)} km/h, strozzature ${p.strozzature.map(v => v.toFixed(0)).join(',') || 'nessuna'}, barriere ${p.barriere.length} pezzi ${lunghezzaBarriere} m, ${(performance.now() - t0).toFixed(0)} ms`);
  const tracce = [{ p: Array.from({ length: p.n + 1 }, (_, i) => [p.x[i % p.n], p.z[i % p.n]]), c: '#ff3b6b', m: c.tappe.map(([x, z], i) => [x, z, String(i)]) }];
  for (const b of p.barriere) tracce.push({ p: b.punti, c: b.lato > 0 ? '#36f' : '#0f9' });
  tracce.push({ p: p.griglia.slice(0, 8).map(g => [g.x, g.z]), c: '#ff0' });
  mkdirSync(`${radice}_lavoro/mappe`, { recursive: true });
  const file = `${radice}_lavoro/mappe/tracce_${c.id}.json`;
  writeFileSync(file, JSON.stringify(tracce));
  const xs = [...p.x];
  const zs = [...p.z];
  const cx = Math.round((Math.min(...xs) + Math.max(...xs)) / 2);
  const cz = Math.round((Math.min(...zs) + Math.max(...zs)) / 2);
  const r = Math.round(Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...zs) - Math.min(...zs)) / 2 + 40);
  if (!process.argv.includes('--senza-foto')) console.log(execFileSync('node', [`${radice}_lavoro/mappa-strade.mjs`, String(cx), String(cz), String(r), '1600', file]).toString().trim());
}

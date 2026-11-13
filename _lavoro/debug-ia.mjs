import { readFileSync } from 'node:fs';
import { preparaGara } from '../src/gioco/preparazione.js';
import { creaAuto, simula, velocitaAvanti } from '../src/gioco/fisica.js';
import { creaContagiri } from '../src/gioco/pista.js';
import { creaPilota, guidaPilota } from '../src/gioco/pilota.js';

const dati = JSON.parse(readFileSync(new URL('../public/cerano/cerano.json', import.meta.url), 'utf8'));
const mondo = preparaGara(dati);
const indice = Number(process.argv[2] ?? 1);
const secondi = Number(process.argv[3] ?? 60);
const conMuri = !process.argv.includes('--senza-muri');
mondo.attivaPista(indice);
const p = mondo.piste[indice];
const g = p.griglia[0];
const a = creaAuto(g.x, g.z, g.yaw);
const c = creaContagiri(p);
c.s = g.s;
const pil = creaPilota(0.95, 0);
const DT = 1 / 60;
let urti = 0;
let ultimoGiro = 0;
for (let t = 0; t < secondi; t += DT) {
  const cmd = guidaPilota(pil, a, p, c, [a], DT);
  const forte = simula(a, cmd, DT, { collisioni: conMuri ? mondo.citta.collisioni : null });
  if (forte > 2) {
    urti += 1;
    const v0 = p.vicino(a.x, a.z, c.s);
    if (process.argv.includes('--dettagli') && c.s > 470 && c.s < 500) {
      const q = p.punto(c.s);
      console.log('  auto', a.x.toFixed(2), a.z.toFixed(2), 'yaw', a.yaw.toFixed(3), 'pista', Math.atan2(q.tx, q.tz).toFixed(3), 'w', a.w.toFixed(2), 'urto in', a.urtoX.toFixed(2), a.urtoZ.toFixed(2));
      for (const o of mondo.citta.collisioni.vicini(a.x, a.z, 4)) if (o.attivo) console.log('   ', o.tipo, o.etichetta, o.tipo === 's' ? [o.ax, o.az, o.bx, o.bz].map(v => v.toFixed(1)).join(',') : `${o.x.toFixed(1)},${o.z.toFixed(1)} r${o.r}`);
    }
    console.log(`URTO ${forte.toFixed(1)} m/s a s ${c.s.toFixed(0)} lat ${v0.laterale.toFixed(1)} (${p.sinistra[v0.i].toFixed(1)}/${p.destra[v0.i].toFixed(1)}) curva ${p.curva[v0.i].toFixed(3)} v ${(velocitaAvanti(a) * 3.6).toFixed(0)} st ${cmd.sterzo.toFixed(2)}`);
  }
  const info = c.aggiorna(a.x, a.z, DT, velocitaAvanti(a));
  if (info.giroFatto) {
    console.log(`GIRO ${c.giro} in ${(t - ultimoGiro).toFixed(1)} s`);
    ultimoGiro = t;
  }
  if (Math.round(t * 60) % 60 === 0) {
    const q = p.punto(c.s);
    console.log(`t ${t.toFixed(0)} s ${c.s.toFixed(0)} giro ${c.giro} v ${(velocitaAvanti(a) * 3.6).toFixed(0)} obj ${(q.velocita * 3.6).toFixed(0)} lat ${info.laterale.toFixed(1)} (${p.sinistra[info.i].toFixed(1)}/${p.destra[info.i].toFixed(1)}) gas ${cmd.gas.toFixed(2)} fr ${cmd.freno.toFixed(2)} st ${cmd.sterzo.toFixed(2)} m ${a.marcia} urti ${urti}`);
  }
}

import { velocitaAvanti, sterzoMassimo, AUTO } from './fisica.js';

const MARGINE_BORDO = 1.35;
const SGUARDO_BASE = 7;
const SGUARDO_VELOCITA = 0.5;
const PASSO_RUOTE = AUTO.avanti + AUTO.dietro;
const LINEA_INTERNA = 0.38;
const DISTANZA_TRAFFICO = 26;
const ATTESA_INCASTRO = 2.2;
const DURATA_RETRO = 1.1;
const DURATA_AGGIRA = 3;
export const FERMO_TROPPO = 7;

/** Un pilota del computer: abilità (frazione dell'aderenza usata in curva) e corsia preferita. */
export function creaPilota(abilita = 0.95, corsia = 0) {
  return { abilita, corsia, scarto: corsia, incastrato: 0, retro: 0, fermo: 0, aggira: 0 };
}

function curvaMedia(pista, s, da, a) {
  let somma = 0;
  let n = 0;
  for (let d = da; d <= a; d += 3) {
    somma += pista.punto(s + d).curva;
    n += 1;
  }
  return somma / Math.max(1, n);
}

/**
 * Comandi del pilota del computer: segue l'asse con un inseguimento puro su un punto davanti, tiene una linea
 * che taglia verso l'interno delle curve, frena sul profilo di velocità della pista e si sposta per sorpassare
 * chi è più lento davanti. Se resta incastrato fa retromarcia.
 */
export function guidaPilota(p, auto, pista, contagiri, altre, dt) {
  const u = velocitaAvanti(auto);
  const s = contagiri.s;
  p.fermo = Math.abs(u) < 1 ? p.fermo + dt : 0;
  if (p.aggira > 0) p.aggira -= dt;
  if (p.retro > 0) {
    p.retro -= dt;
    return { gas: 0, freno: 1, sterzo: 0, analogico: true };
  }
  const sguardo = SGUARDO_BASE + Math.max(0, u) * SGUARDO_VELOCITA;
  const davanti = pista.punto(s + sguardo);
  const curva = curvaMedia(pista, s, -6, 12);
  const metaSx = Math.max(0, davanti.sinistra - MARGINE_BORDO);
  const metaDx = Math.max(0, davanti.destra - MARGINE_BORDO);
  const interno = Math.max(-1, Math.min(1, curva * 30));
  let voluto = p.corsia * 0.25 * (metaSx + metaDx) * 0.5 + interno * (interno > 0 ? metaSx : metaDx) * LINEA_INTERNA;

  const fx = Math.sin(auto.yaw);
  const fz = Math.cos(auto.yaw);
  let lento = Infinity;
  for (const b of altre) {
    if (b === auto) continue;
    const dx = b.x - auto.x;
    const dz = b.z - auto.z;
    const lungo = dx * fx + dz * fz;
    if (lungo < 1 || lungo > DISTANZA_TRAFFICO) continue;
    const lato = dx * fz - dz * fx;
    const vb = b.vx * fx + b.vz * fz;
    if (Math.abs(lato) < 2.6 && vb < u + 1.5) {
      const verso = lato > 0 ? -1 : 1;
      voluto = verso > 0 ? Math.min(metaSx, voluto + 3.2) : Math.max(-metaDx, voluto - 3.2);
      if (lungo < 9 && Math.abs(lato) < 2 && p.aggira <= 0) lento = Math.min(lento, Math.max(vb - 1, 0));
    }
  }
  voluto = Math.max(-metaDx, Math.min(metaSx, voluto));
  p.scarto += (voluto - p.scarto) * Math.min(1, dt * 1.6);

  const nx = davanti.tz;
  const nz = -davanti.tx;
  const mx = davanti.x + nx * p.scarto;
  const mz = davanti.z + nz * p.scarto;
  const dx = mx - auto.x;
  const dz = mz - auto.z;
  const avanti = dx * fx + dz * fz;
  const sinistra = dx * fz - dz * fx;
  const alfa = Math.atan2(sinistra, Math.max(0.5, avanti));
  const distanza = Math.max(1, Math.hypot(dx, dz));
  const voluta = Math.atan2(2 * PASSO_RUOTE * Math.sin(alfa), distanza);
  const sterzo = Math.max(-1, Math.min(1, -voluta / sterzoMassimo(Math.abs(u))));

  const frenata = pista.punto(s + 1.5 + Math.max(0, u) * 0.12).velocita;
  let obiettivo = Math.min(frenata * p.abilita, lento);
  if (contagiri.contrario > 0.5) obiettivo = 8;
  let gas = Math.max(0, Math.min(1, (obiettivo - u) * 0.4 + 0.1));
  let freno = Math.max(0, Math.min(1, (u - obiettivo) * 0.55));
  if (freno > 0.05) gas = 0;

  if (u < 1.2 && (gas > 0.3 || lento < 2)) p.incastrato += dt;
  else p.incastrato = Math.max(0, p.incastrato - dt * 2);
  if (p.incastrato > ATTESA_INCASTRO && lento < 2) {
    p.incastrato = 0;
    p.aggira = DURATA_AGGIRA;
    p.retro = DURATA_RETRO * 0.6;
  }
  if (p.incastrato > ATTESA_INCASTRO) {
    p.incastrato = 0;
    p.retro = DURATA_RETRO;
  }
  if (Math.abs(sterzo) > 0.85 && u > 25) gas *= 0.6;
  return { gas, freno, sterzo, mano: false, analogico: true };
}

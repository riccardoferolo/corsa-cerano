import { preparaCitta } from '../citta/citta.js';
import { CIRCUITI, costruisciPista } from './pista.js';

const SGOMBRO_OLTRE = 0.8;
const PONTE_OLTRE = 1.5;
const ARREDI_A_TERRA = new Set(['strisce', 'linea']);

function sottoIPonti(citta, piste) {
  for (const v of citta.collisioni.segmenti) {
    if (v.etichetta !== 'acqua' || !v.attivo) continue;
    const mx = (v.ax + v.bx) / 2;
    const mz = (v.az + v.bz) / 2;
    if (piste.some(p => p.nelCorridoio(mx, mz, PONTE_OLTRE))) v.attivo = false;
  }
}

/**
 * Città per le corse: niente auto parcheggiate, pali, alberi e cartelli tolti dalle vie chiuse per il Gran Premio,
 * le tre piste costruite e le loro barriere fra le collisioni (attive solo quelle della pista in uso).
 */
export function preparaGara(dati) {
  const prima = preparaCitta(dati, { conParcheggi: false });
  sottoIPonti(prima, CIRCUITI.map(c => costruisciPista(prima, c)));
  const bozze = CIRCUITI.map(c => costruisciPista(prima, c));
  const sgombra = (x, z) => bozze.some(p => p.nelCorridoio(x, z, SGOMBRO_OLTRE));
  const tolti = { lampioni: dati.lampioni.length, alberi: dati.alberi.length, arredi: (dati.arredi ?? []).length };
  dati.lampioni = dati.lampioni.filter(([x, z]) => !sgombra(x, z));
  dati.alberi = dati.alberi.filter(([x, z]) => !sgombra(x, z));
  dati.arredi = (dati.arredi ?? []).filter(([tipo, x, z]) => ARREDI_A_TERRA.has(tipo) || !sgombra(x, z));
  tolti.lampioni -= dati.lampioni.length;
  tolti.alberi -= dati.alberi.length;
  tolti.arredi -= dati.arredi.length;
  const citta = preparaCitta(dati, { conParcheggi: false });
  sottoIPonti(citta, bozze);
  const piste = CIRCUITI.map(c => costruisciPista(citta, c));
  const barriere = piste.map(p => p.barriere.flatMap(b => b.punti.slice(1).map((q, i) => {
    const v = citta.collisioni.aggiungiSegmento(b.punti[i][0], b.punti[i][1], q[0], q[1], 'barriera');
    v.attivo = false;
    return v;
  })));
  let attiva = -1;
  return {
    citta,
    piste,
    tolti,
    get attiva() { return attiva; },
    attivaPista(indice) {
      attiva = indice;
      barriere.forEach((elenco, k) => {
        for (const v of elenco) v.attivo = k === indice;
      });
    },
  };
}

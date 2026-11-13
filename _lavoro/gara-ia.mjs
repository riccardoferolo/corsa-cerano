import { readFileSync } from 'node:fs';
import { preparaGara } from '../src/gioco/preparazione.js';
import { creaGara } from '../src/gioco/gara.js';

const dati = JSON.parse(readFileSync(new URL('../public/cerano/cerano.json', import.meta.url), 'utf8'));
const mondo = preparaGara(dati);
let seme = Number(process.argv[2] ?? 3);
const caso = () => {
  seme = (seme * 16807) % 2147483647;
  return seme / 2147483647;
};
for (let indice = 0; indice < mondo.piste.length; indice++) {
  mondo.attivaPista(indice);
  const gara = creaGara({ piste: mondo.piste, caso, primaPista: indice });
  gara.aggiungi('fermo', 'Fermo', 0);
  gara.partecipanti.get('fermo').spettatore = true;
  gara.cambiaFase('partenza');
  let t = 0;
  let rimessi = 0;
  const dt = 1 / 60;
  while (gara.stato.fase !== 'gara') {
    gara.passo(dt, { collisioni: mondo.citta.collisioni, altre: [] });
    t += dt;
  }
  const f = gara.partecipanti.get('fermo');
  f.spettatore = false;
  f.giro = 99;
  const ia = [...gara.partecipanti.values()].filter(x => x.ia);
  const fermi = new Map(ia.map(x => [x.id, 0]));
  while (gara.stato.fase === 'gara' && t < 900) {
    gara.passo(dt, { collisioni: mondo.citta.collisioni, altre: [] });
    for (const x of ia) {
      if (x.pilota.fermo > 6.9) fermi.set(x.id, fermi.get(x.id) + 1);
    }
    t += dt;
  }
  rimessi = [...fermi.values()].reduce((a, b) => a + b, 0);
  const finiti = ia.filter(x => x.arrivo !== null);
  const p = mondo.piste[indice];
  console.log(`${p.id}: ${finiti.length}/8 arrivati, primo ${Math.min(...finiti.map(x => x.arrivo)).toFixed(1)} s (${p.giri} giri), ultimo ${Math.max(...finiti.map(x => x.arrivo)).toFixed(1)} s, giro migliore ${Math.min(...ia.map(x => x.migliore ?? Infinity)).toFixed(1)} s, rimessi in pista ~${rimessi}`);
}

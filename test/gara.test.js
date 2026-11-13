import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { preparaGara } from '../src/gioco/preparazione.js';
import { creaGara, POSTI, DURATE } from '../src/gioco/gara.js';
import { creaContagiri } from '../src/gioco/pista.js';

const dati = JSON.parse(readFileSync(new URL('../public/cerano/cerano.json', import.meta.url), 'utf8'));
const mondo = preparaGara(dati);
const DT = 1 / 60;

function semeFisso(seme = 11) {
  let s = seme;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

test('le tre piste sono chiuse, lunghe il giusto e con la griglia sull\'asfalto', () => {
  for (const p of mondo.piste) {
    assert.ok(p.lunghezza > 600 && p.lunghezza < 3600, `${p.id}: ${p.lunghezza}`);
    const primo = p.punto(0);
    const ultimo = p.punto(p.lunghezza - 0.5);
    assert.ok(Math.hypot(primo.x - ultimo.x, primo.z - ultimo.z) < 2, `${p.id} non si chiude`);
    for (const g of p.griglia.slice(0, POSTI)) assert.ok(p.nelCorridoio(g.x, g.z), `${p.id}: posto in griglia fuori pista`);
    assert.ok(p.barriere.length > 0);
  }
  assert.ok(mondo.tolti.lampioni >= 0 && mondo.tolti.alberi >= 0);
});

test('il contagiri conta il giro solo passando dai tre settori', () => {
  const p = mondo.piste[1];
  const c = creaContagiri(p);
  c.s = p.griglia[0].s;
  for (let s = p.griglia[0].s; s < p.lunghezza + p.lunghezza + 5; s += 1.5) {
    const q = p.punto(s);
    c.aggiorna(q.x, q.z, DT, 10);
  }
  assert.equal(c.giro, 1);
  const indietro = creaContagiri(p);
  indietro.s = 5;
  for (let s = 5; s > -30; s -= 1.5) {
    const q = p.punto(s);
    indietro.aggiorna(q.x, q.z, DT, -10);
  }
  assert.equal(indietro.giro, 0);
});

test('i piloti del computer finiscono la gara del Circuito di San Rocco senza incastrarsi', () => {
  mondo.attivaPista(1);
  const gara = creaGara({ piste: mondo.piste, caso: semeFisso(), primaPista: 1 });
  gara.aggiungi('fermo', 'Fermo', 0);
  gara.aggiornaUmano('fermo', { pronto: true, s: 0, giro: 0 });
  gara.partecipanti.get('fermo').spettatore = true;
  gara.cambiaFase('partenza');
  let t = 0;
  while (gara.stato.fase !== 'gara' && t < 20) {
    gara.passo(DT, { collisioni: mondo.citta.collisioni, altre: [] });
    t += DT;
  }
  assert.equal(gara.stato.fase, 'gara');
  const ia = [...gara.partecipanti.values()].filter(x => x.ia);
  assert.equal(ia.length, POSTI);
  gara.partecipanti.get('fermo').spettatore = false;
  gara.partecipanti.get('fermo').giro = 99;
  gara.partecipanti.get('fermo').arrivo = null;
  while (gara.stato.fase === 'gara' && t < 360) {
    gara.passo(DT, { collisioni: mondo.citta.collisioni, altre: [] });
    t += DT;
  }
  const finiti = ia.filter(x => x.arrivo !== null);
  const giri = ia.map(x => x.migliore).filter(v => v !== null);
  assert.ok(finiti.length >= POSTI - 1, `arrivati ${finiti.length} su ${POSTI}: ${ia.map(x => `${x.nome} giro ${x.contagiri.giro} s ${x.contagiri.s.toFixed(0)}`).join(', ')}`);
  const migliore = Math.min(...giri);
  assert.ok(migliore > 25 && migliore < 70, `giro migliore ${migliore.toFixed(1)} s`);
  assert.ok(gara.stato.fase === 'arrivo' || t >= 360);
  assert.ok(DURATE.arrivo > 0);
});

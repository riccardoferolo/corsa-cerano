import { test } from 'node:test';
import assert from 'node:assert/strict';
import { valida, impacchetta, spacchetta, CAMPI_AUTO, pulisciNome } from '../src/rete/protocollo.js';
import { creaAuto } from '../src/gioco/fisica.js';

const auto = Object.assign(creaAuto(12.5, -40, 1.2), { vx: 30, vz: -4, rpm: 6500, marcia: 4, gas: 1 });

function istantanea(voci) {
  return { t: 'st', h: 123456.7, f: 'gara', p: 2, tf: 12.34, lu: 0, cr: 81.234, num: 3, g: voci, ord: voci.map(v => v[0]) };
}

test('lo stato dell\'auto fa andata e ritorno', () => {
  const d = impacchetta(auto);
  assert.equal(d.length, CAMPI_AUTO.length);
  const r = spacchetta(d, {});
  assert.equal(r.x, 12.5);
  assert.equal(r.marcia, 4);
  assert.ok(Math.abs(r.yaw - 1.2) < 1e-3);
});

test('l\'istantanea dell\'host passa la validazione, con spettatori e piloti del computer', () => {
  const voci = [
    ['ia-0', 'Pino Saetta', 3, 1, 0, 2, 812.3, -1, 41.25, 0, impacchetta(auto)],
    ['b9f1c2', 'Richi', 0, 0, 1, 1, 15.2, -1, -1, 0, impacchetta(auto)],
    ['c7d', 'Seba', 9, 0, 7, 0, 0, -1, -1, 1, 0],
    ['ia-5', 'Ugo Turbo', 5, 1, 11, 3, 1.5, 162.4, 40.1, 0, impacchetta(auto)],
  ];
  assert.ok(valida(istantanea(voci)));
});

test('messaggi malformati o fuori misura vengono scartati', () => {
  const buona = ['ia-0', 'Pino', 3, 1, 0, 2, 10, -1, -1, 0, impacchetta(auto)];
  assert.equal(valida(istantanea([[...buona.slice(0, 10), [1, 2, 3]]])), null);
  assert.equal(valida(istantanea([['ia-0', 'Pino', 99, 1, 0, 2, 10, -1, -1, 0, 0]])), null);
  assert.equal(valida({ ...istantanea([buona]), f: 'pausa' }), null);
  assert.equal(valida({ t: 'a', d: impacchetta(auto), giro: 1, s: 5, migliore: -1, pronto: 'si', pista: 0 }), null);
  assert.equal(valida({ t: 'sconosciuto' }), null);
  assert.equal(valida(null), null);
});

test('il messaggio dell\'ospite e il saluto sono validi', () => {
  assert.ok(valida({ t: 'a', d: impacchetta(auto), giro: 2, s: 431.7, migliore: 41.9, pronto: true, pista: 1 }));
  assert.ok(valida({ t: 'ciao', id: 'abc-123', nome: 'Seba', livrea: 4 }));
  assert.equal(valida({ t: 'ciao', id: 'abc-123', nome: '   ', livrea: 4 }), null);
  assert.equal(pulisciNome('<b>Richi</b>'), 'bRichi/b');
});

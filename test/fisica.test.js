import { test } from 'node:test';
import assert from 'node:assert/strict';
import { creaAuto, simula, velocita, velocitaAvanti, AUTO } from '../src/gioco/fisica.js';
import { creaCollisioni } from '../src/citta/collisioni.js';

const DT = 1 / 60;

function guida(a, comandi, secondi, opzioni) {
  for (let t = 0; t < secondi; t += DT) simula(a, typeof comandi === 'function' ? comandi(a, t) : comandi, DT, opzioni);
  return a;
}

test('da 0 a 100 km/h fra 3,4 e 5 secondi', () => {
  const a = creaAuto();
  let t = 0;
  while (velocita(a) < 100 / 3.6 && t < 10) {
    simula(a, { gas: 1 }, DT);
    t += DT;
  }
  assert.ok(t > 3.4 && t < 5, `0-100 in ${t.toFixed(2)} s`);
});

test('velocità massima fra 255 e 300 km/h', () => {
  const a = guida(creaAuto(), { gas: 1 }, 70);
  const kmh = velocita(a) * 3.6;
  assert.ok(kmh > 255 && kmh < 300, `massima ${kmh.toFixed(0)} km/h`);
});

test('frenata da 100 km/h sotto i 40 metri, senza perdere la direzione', () => {
  const a = creaAuto();
  a.vz = 100 / 3.6;
  const partenza = a.z;
  let t = 0;
  while (velocitaAvanti(a) > 0.3 && t < 6) {
    simula(a, { freno: 1 }, DT);
    t += DT;
  }
  assert.ok(a.z - partenza < 40, `spazio ${(a.z - partenza).toFixed(1)} m`);
  assert.ok(Math.abs(a.x) < 0.5 && Math.abs(a.yaw) < 0.05, `x ${a.x.toFixed(2)} yaw ${a.yaw.toFixed(3)}`);
});

test('in curva tiene fra 0,9 e 1,4 g e non gira su se stessa', () => {
  const a = creaAuto();
  a.vz = 22;
  guida(a, (auto) => ({ gas: velocita(auto) < 22 ? 0.5 : 0.25, sterzo: 0.45 }), 8);
  const g = Math.abs(a.ay) / 9.81;
  assert.ok(g > 0.9 && g < 1.4, `laterale ${g.toFixed(2)} g`);
  assert.ok(velocitaAvanti(a) > 10, 'non deve finire in testacoda');
});

test('il freno a mano in curva fa ruotare la coda', () => {
  const con = creaAuto();
  con.vz = 18;
  const senza = creaAuto();
  senza.vz = 18;
  guida(con, { sterzo: -0.6, mano: true }, 0.9);
  guida(senza, { sterzo: -0.6 }, 0.9);
  assert.ok(Math.abs(con.yaw) > Math.abs(senza.yaw) * 1.15, `${con.yaw.toFixed(2)} contro ${senza.yaw.toFixed(2)}`);
});

test('da fermi il freno tenuto innesta la retromarcia', () => {
  const a = guida(creaAuto(), { freno: 1 }, 3);
  assert.equal(a.marcia, 0);
  assert.ok(velocitaAvanti(a) < -2, `indietro a ${velocitaAvanti(a).toFixed(1)} m/s`);
  guida(a, { gas: 1 }, 4);
  assert.ok(a.marcia >= 1 && velocitaAvanti(a) > 2);
});

test('sterzo a destra gira a destra', () => {
  const a = creaAuto();
  a.vz = 10;
  guida(a, { gas: 0.3, sterzo: 0.4 }, 1);
  assert.ok(a.yaw < -0.3 && a.x < -1, `yaw ${a.yaw.toFixed(2)} x ${a.x.toFixed(2)}`);
});

test('contro un muro rimbalza e non lo attraversa', () => {
  const c = creaCollisioni();
  c.aggiungiSegmento(-20, 10, 20, 10, 'barriera');
  const a = creaAuto();
  a.vz = 30;
  guida(a, { gas: 0.3 }, 2, { collisioni: c });
  assert.ok(a.z < 10 - AUTO.lunghezza / 2 + 0.3, `davanti a ${a.z.toFixed(2)}`);
  assert.ok(velocitaAvanti(a) < 8);
});

test('niente valori impossibili con comandi a caso', () => {
  let seme = 7;
  const caso = () => {
    seme = (seme * 16807) % 2147483647;
    return seme / 2147483647;
  };
  const a = creaAuto();
  for (let i = 0; i < 4000; i++) {
    simula(a, { gas: caso(), freno: caso() < 0.2 ? 1 : 0, sterzo: caso() * 2 - 1, mano: caso() < 0.05, analogico: caso() < 0.5 }, DT);
    for (const k of ['x', 'z', 'yaw', 'vx', 'vz', 'w', 'rpm']) assert.ok(Number.isFinite(a[k]), `${k} = ${a[k]} al passo ${i}`);
  }
  assert.ok(velocita(a) < 90);
});

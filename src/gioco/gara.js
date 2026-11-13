import { creaAuto, simula, urtaAuto, calcolaScia, riposiziona } from './fisica.js';
import { creaContagiri } from './pista.js';
import { creaPilota, guidaPilota, FERMO_TROPPO } from './pilota.js';

export const POSTI = 8;
export const DURATE = Object.freeze({ prove: 35, provePronti: 3, partenza: 4, luce: 0.9, arrivo: 16, distaccoUltimi: 45 });
const NOMI_IA = Object.freeze(['Pino Saetta', 'Lia Rombo', 'Dino Curva', 'Sara Fulmine', 'Elio Scia', 'Mirko Lampo', 'Ugo Turbo', 'Tina Freccia', 'Nando Sterzo', 'Vera Scintilla']);
const LIVREE_IA = 10;

const totale = (giro, s, lunghezza) => (giro === 0 && s > lunghezza / 2 ? s - lunghezza : giro * lunghezza + s);
const ordinaUmani = (a, b) => (a.entrata - b.entrata) || (a.id < b.id ? -1 : 1);

/**
 * Direzione di gara, solo sull'host: fasi (prove libere, partenza coi semafori, gara, arrivo), griglia, piloti del
 * computer che riempiono i posti liberi, classifica in tempo reale e ordine d'arrivo. Il tempo è quello di gara
 * dell'host, in secondi; le auto dei giocatori le muovono i loro computer e qui arrivano solo le posizioni.
 */
export function creaGara({ piste, caso = Math.random, primaPista = 0 }) {
  const stato = { fase: 'prove', tempo: 0, pista: primaPista % piste.length, luci: 0, attesaVia: 0, cronometro: 0, numero: 1, primoArrivo: null };
  const partecipanti = new Map();
  let entrate = 0;
  let classifica = [];
  let risultati = [];
  const eventi = [];

  const pista = () => piste[stato.pista];
  const inGara = p => !p.spettatore;
  const umani = () => [...partecipanti.values()].filter(p => !p.ia).sort(ordinaUmani);

  function nuovaIA(indice) {
    const usati = new Set([...partecipanti.values()].map(p => p.livrea));
    let livrea = Math.floor(caso() * LIVREE_IA);
    for (let k = 0; k < LIVREE_IA && usati.has(livrea); k++) livrea = (livrea + 1) % LIVREE_IA;
    const nomiUsati = new Set([...partecipanti.values()].map(p => p.nome));
    const nome = NOMI_IA.find(n => !nomiUsati.has(n)) ?? `Pilota ${indice}`;
    const id = `ia-${indice}`;
    const p = {
      id, nome, livrea, ia: true, entrata: entrate++, posto: 0, spettatore: false,
      auto: creaAuto(), pilota: creaPilota(0.9 + caso() * 0.09, caso() * 2 - 1),
      contagiri: null, giro: 0, s: 0, totale: 0, arrivo: null, migliore: null, ultimo: null, inizioGiro: 0, pronto: true,
    };
    partecipanti.set(id, p);
    const pista = piste[stato.pista];
    const occupati = new Set([...partecipanti.values()].filter(x => x !== p && !x.spettatore).map(x => x.posto));
    p.posto = Math.max(0, pista.griglia.findIndex((_, i) => !occupati.has(i)));
    const g = pista.griglia[p.posto];
    riposiziona(p.auto, g.x, g.z, g.yaw);
    p.contagiri = creaContagiri(pista);
    p.contagiri.s = g.s;
    p.s = g.s;
    p.totale = g.s - pista.lunghezza;
    p.auto.fermo = stato.fase === 'partenza';
    return p;
  }

  function riempi() {
    const umaniInGara = umani().filter(inGara).length;
    const ia = [...partecipanti.values()].filter(p => p.ia);
    const servono = Math.max(0, POSTI - umaniInGara);
    for (let i = ia.length; i > servono; i--) partecipanti.delete(ia[i - 1].id);
    for (let i = ia.length; i < servono; i++) {
      let k = 0;
      while (partecipanti.has(`ia-${k}`)) k += 1;
      nuovaIA(k);
    }
  }

  function mettiInGriglia() {
    const p = pista();
    const elenco = [...partecipanti.values()].filter(inGara);
    const ordine = elenco.map(x => ({ x, k: caso() })).sort((a, b) => a.k - b.k).map(v => v.x);
    ordine.forEach((x, i) => {
      x.posto = i;
      x.giro = 0;
      x.arrivo = null;
      x.migliore = null;
      x.ultimo = null;
      x.inizioGiro = 0;
      const g = p.griglia[i];
      x.s = g.s;
      x.totale = g.s - p.lunghezza;
      if (x.ia) {
        riposiziona(x.auto, g.x, g.z, g.yaw);
        x.contagiri = creaContagiri(p);
        x.contagiri.s = g.s;
        x.pilota.scarto = 0;
      }
    });
  }

  function cambiaFase(fase) {
    stato.fase = fase;
    stato.tempo = 0;
    if (fase === 'prove') {
      for (const x of partecipanti.values()) x.spettatore = false;
      riempi();
      mettiInGriglia();
      for (const x of partecipanti.values()) {
        x.pronto = x.ia;
        if (x.ia) x.auto.fermo = false;
      }
    }
    if (fase === 'partenza') {
      riempi();
      mettiInGriglia();
      stato.luci = 0;
      stato.attesaVia = 0.4 + caso() * 1.4;
      for (const x of partecipanti.values()) if (x.ia) x.auto.fermo = true;
    }
    if (fase === 'gara') {
      stato.cronometro = 0;
      stato.primoArrivo = null;
      for (const x of partecipanti.values()) if (x.ia) x.auto.fermo = false;
    }
    if (fase === 'arrivo') risultati = classifica.map(x => ({ id: x.id, nome: x.nome, livrea: x.livrea, ia: x.ia, arrivo: x.arrivo, giro: x.giro, migliore: x.migliore }));
    eventi.push({ k: 'fase', fase, pista: stato.pista, numero: stato.numero });
  }

  function aggiornaClassifica() {
    const elenco = [...partecipanti.values()].filter(inGara);
    classifica = elenco.sort((a, b) => {
      if (a.arrivo !== null && b.arrivo !== null) return a.arrivo - b.arrivo;
      if (a.arrivo !== null) return -1;
      if (b.arrivo !== null) return 1;
      return b.totale - a.totale;
    });
  }

  function giroIA(x, info) {
    if (!info.giroFatto || stato.fase !== 'gara') return;
    const tempo = stato.cronometro - x.inizioGiro;
    x.ultimo = tempo;
    if (x.migliore === null || tempo < x.migliore) x.migliore = tempo;
    x.inizioGiro = stato.cronometro;
    x.giro = x.contagiri.giro;
    if (x.giro >= pista().giri && x.arrivo === null) segnaArrivo(x);
  }

  function segnaArrivo(x) {
    x.arrivo = stato.cronometro;
    if (stato.primoArrivo === null) stato.primoArrivo = stato.cronometro;
    eventi.push({ k: 'arrivo', id: x.id, tempo: x.arrivo });
  }

  function simulaIA(dt, { collisioni, altre }) {
    const p = pista();
    const ia = [...partecipanti.values()].filter(x => x.ia && inGara(x));
    const tutte = [...ia.map(x => x.auto), ...altre];
    for (const x of ia) {
      if (!x.contagiri) continue;
      const c = stato.fase === 'arrivo' && x.arrivo !== null ? { gas: 0, freno: 0.3, sterzo: 0 } : guidaPilota(x.pilota, x.auto, p, x.contagiri, tutte, dt);
      if (x.arrivo !== null && stato.fase === 'gara') c.gas = Math.min(c.gas, 0.35);
      calcolaScia(x.auto, tutte);
      simula(x.auto, c, dt, { collisioni });
      const info = x.contagiri.aggiorna(x.auto.x, x.auto.z, dt, x.auto.vx * Math.sin(x.auto.yaw) + x.auto.vz * Math.cos(x.auto.yaw));
      if (info.distanza > Math.max(p.sinistra[info.i], p.destra[info.i]) + 6 || (x.pilota.fermo > FERMO_TROPPO && stato.fase !== 'arrivo')) {
        const q = p.punto(x.contagiri.s);
        riposiziona(x.auto, q.x, q.z, Math.atan2(q.tx, q.tz));
        x.pilota.fermo = 0;
        x.pilota.aggira = 2;
      }
      x.s = x.contagiri.s;
      x.totale = totale(x.contagiri.giro, x.contagiri.s, p.lunghezza);
      giroIA(x, info);
    }
    for (let i = 0; i < ia.length; i++) {
      for (let j = i + 1; j < ia.length; j++) urtaAuto(ia[i].auto, ia[j].auto);
      for (const b of altre) urtaAuto(ia[i].auto, b, true);
    }
  }

  function passo(dt, mondo = { collisioni: null, altre: [] }) {
    stato.tempo += dt;
    const presenti = umani();
    if (stato.fase === 'prove') {
      const tuttiPronti = presenti.length > 0 && presenti.every(x => x.pronto);
      if (tuttiPronti && stato.tempo < DURATE.prove - DURATE.provePronti) stato.tempo = DURATE.prove - DURATE.provePronti;
      if (stato.tempo >= DURATE.prove) cambiaFase('partenza');
    } else if (stato.fase === 'partenza') {
      stato.luci = Math.max(0, Math.min(5, Math.floor((stato.tempo - DURATE.partenza + 5 * DURATE.luce) / DURATE.luce)));
      if (stato.tempo >= DURATE.partenza + stato.attesaVia) {
        stato.luci = 0;
        cambiaFase('gara');
      }
    } else if (stato.fase === 'gara') {
      stato.cronometro += dt;
      const umaniInGara = presenti.filter(inGara);
      const finiti = umaniInGara.length > 0 && umaniInGara.every(x => x.arrivo !== null);
      const scaduto = stato.primoArrivo !== null && stato.cronometro - stato.primoArrivo > DURATE.distaccoUltimi;
      const tuttiIA = [...partecipanti.values()].filter(inGara).every(x => x.arrivo !== null);
      if (finiti || scaduto || tuttiIA || umaniInGara.length === 0) cambiaFase('arrivo');
    } else if (stato.fase === 'arrivo' && stato.tempo >= DURATE.arrivo) {
      stato.pista = (stato.pista + 1) % piste.length;
      stato.numero += 1;
      cambiaFase('prove');
    }
    if (stato.fase !== 'partenza') simulaIA(dt, mondo);
    aggiornaClassifica();
    return eventi.splice(0);
  }

  return {
    stato,
    partecipanti,
    get classifica() { return classifica; },
    get risultati() { return risultati; },
    get pista() { return pista(); },
    aggiungi(id, nome, livrea) {
      if (partecipanti.has(id)) return partecipanti.get(id);
      const p = { id, nome, livrea, ia: false, entrata: entrate++, posto: 0, spettatore: stato.fase === 'partenza' || stato.fase === 'gara', giro: 0, s: 0, totale: 0, arrivo: null, migliore: null, ultimo: null, pronto: false };
      partecipanti.set(id, p);
      if (!p.spettatore) {
        riempi();
        const liberi = new Set(pista().griglia.map((_, i) => i));
        for (const x of partecipanti.values()) if (x !== p && !x.spettatore) liberi.delete(x.posto);
        p.posto = [...liberi][0] ?? 0;
        const g = pista().griglia[p.posto];
        p.s = g.s;
      }
      eventi.push({ k: 'entra', id, nome });
      return p;
    },
    togli(id) {
      const p = partecipanti.get(id);
      if (!p || p.ia) return;
      partecipanti.delete(id);
      if (stato.fase === 'prove') riempi();
      eventi.push({ k: 'esce', id, nome: p.nome });
    },
    aggiornaUmano(id, dati) {
      const p = partecipanti.get(id);
      if (!p || p.ia) return;
      if (typeof dati.pronto === 'boolean') p.pronto = dati.pronto;
      if (p.spettatore) return;
      p.s = dati.s;
      p.giro = dati.giro;
      p.totale = totale(p.giro, dati.s, pista().lunghezza);
      if (dati.migliore !== null && dati.migliore !== undefined) p.migliore = dati.migliore;
      if (stato.fase === 'gara' && p.arrivo === null && p.giro >= pista().giri) segnaArrivo(p);
      p.auto = dati.auto ?? p.auto;
    },
    passo,
    cambiaFase,
  };
}

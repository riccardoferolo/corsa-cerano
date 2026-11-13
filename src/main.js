import { preparaGara } from './gioco/preparazione.js';
import { creaGara, DURATE } from './gioco/gara.js';
import { creaContagiri } from './gioco/pista.js';
import { creaPilota, guidaPilota } from './gioco/pilota.js';
import { creaAuto, simula, urtaAuto, calcolaScia, riposiziona, velocitaAvanti, AUTO } from './gioco/fisica.js';
import { creaMondo } from './grafica/scena.js';
import { LIVELLI, leggiScelta, salvaScelta, livelloAttivo } from './grafica/qualita.js';
import { preparaAuto, LIVREE } from './grafica/auto3d.js';
import { costruisciPista3d } from './grafica/pista3d.js';
import { creaTelecamera, MODI } from './grafica/telecamera.js';
import { creaEffetti } from './grafica/effetti.js';
import { creaComandi } from './comandi.js';
import { creaHud, formattaTempo } from './hud.js';
import { creaSuono } from './suono.js';
import { entraNelMondo } from './rete/mondoPubblico.js';
import { pulisciNome, impacchetta, spacchetta } from './rete/protocollo.js';

const CHIAVE_NOME = 'corsa.nome';
const CHIAVE_LIVREA = 'corsa.livrea';
const CHIAVE_RECORD = 'corsa.record.';
const INVIO_AUTO_MS = 33;
const INVIO_STATO_MS = 50;
const RITARDO_RETE_MS = 110;
const SILENZIO_OSPITE_MS = 6000;
const PRESENTAZIONE_MS = 1000;
const BATTITO_OSPITE_MS = 1000;
const SENZA_NOTIZIE_MS = 12000;
const FUORI_PISTA_S = 2.5;
const OLTRE_LA_PISTA = 6;
const CONTROMANO_S = 1.6;
const PASSO_MASSIMO = 1 / 20;
const VELOCITA_RIFERIMENTO = 32;
const COMPARSE_TITOLO = 4;

const $ = id => document.getElementById(id);
const hud = creaHud();
const comandi = creaComandi();
const suono = creaSuono();
const telecamera = creaTelecamera();
const parametri = new URLSearchParams(location.search);
const locale = parametri.has('locale');

function leggi(chiave) {
  try {
    return localStorage.getItem(chiave);
  } catch {
    return null;
  }
}
function salva(chiave, valore) {
  try {
    localStorage.setItem(chiave, String(valore));
  } catch {
    return false;
  }
  return true;
}
const idCasuale = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`);

const s = {
  fase: 'carico',
  mioId: idCasuale(),
  nome: pulisciNome(leggi(CHIAVE_NOME)) ?? '',
  livrea: Math.min(LIVREE.length - 1, Math.max(0, Number(leggi(CHIAVE_LIVREA)) || 0)),
  rete: null,
  coll: null,
  sonoHost: false,
  gara: null,
  vista: null,
  ricevuto: 0,
  presentato: false,
  ultimoCiao: 0,
  ultimoInvio: 0,
  ultimoStato: 0,
  remoti: new Map(),
  macchine: new Map(),
  pistaAttiva: -1,
  chiaveFase: '',
  modo: 0,
  vistaMondo: null,
  comparse: [],
  luciPrima: 0,
};
const io = {
  auto: creaAuto(),
  contagiri: null,
  inizioGiro: 0,
  migliore: null,
  ultimo: null,
  pronto: false,
  arrivato: false,
  spettatore: false,
  fuori: 0,
  contromano: 0,
  macchina: null,
};

let gp = null;
let mondo = null;
let fabbrica = null;
let piste3d = [];
let effetti = null;

function carico(frazione, testo) {
  $('carico-barra').style.width = `${Math.round(frazione * 100)}%`;
  if (testo) $('carico-testo').textContent = testo;
}

const pistaCorrente = () => gp.piste[Math.max(0, s.pistaAttiva)];
const partecipante = id => s.vista?.partecipanti.find(p => p.id === id) ?? null;

function attivaPista(indice) {
  if (s.pistaAttiva === indice) return;
  s.pistaAttiva = indice;
  gp.attivaPista(indice);
  piste3d.forEach((p, i) => p.mostra(i === indice));
  hud.preparaMinimappa(gp.piste[indice]);
  effetti?.pulisci();
  io.contagiri = creaContagiri(gp.piste[indice]);
  $('pista-nome').textContent = gp.piste[indice].nome;
}

function mettiInGriglia(posto, fermo) {
  const pista = pistaCorrente();
  const g = pista.griglia[Math.min(posto, pista.griglia.length - 1)];
  riposiziona(io.auto, g.x, g.z, g.yaw);
  io.auto.fermo = fermo;
  io.contagiri = creaContagiri(pista);
  io.contagiri.s = g.s;
  io.inizioGiro = performance.now();
  io.arrivato = false;
  io.fuori = 0;
  telecamera.reimposta();
}

function rimettiInPista() {
  if (!io.contagiri || io.spettatore) return;
  const pista = pistaCorrente();
  const q = pista.punto(io.contagiri.s);
  const fermo = io.auto.fermo;
  riposiziona(io.auto, q.x, q.z, Math.atan2(q.tx, q.tz));
  io.auto.fermo = fermo;
  io.fuori = 0;
  io.contromano = 0;
  telecamera.reimposta();
}

function record(idPista) {
  const v = Number(leggi(CHIAVE_RECORD + idPista));
  return Number.isFinite(v) && v > 0 ? v : null;
}

function giroCompletato() {
  const ora = performance.now();
  const tempo = (ora - io.inizioGiro) / 1000;
  io.inizioGiro = ora;
  const fase = s.vista?.fase;
  if (fase !== 'gara' && fase !== 'prove') return;
  io.ultimo = tempo;
  const pista = pistaCorrente();
  const migliore = io.migliore === null || tempo < io.migliore;
  if (migliore) io.migliore = tempo;
  const primato = record(pista.id);
  if (primato === null || tempo < primato) {
    salva(CHIAVE_RECORD + pista.id, tempo.toFixed(3));
    if (primato !== null) hud.messaggio('Nuovo record personale', formattaTempo(tempo), 2.6);
  }
  suono.giro();
  if (fase === 'gara' && io.contagiri.giro >= pista.giri) {
    io.arrivato = true;
    const pos = (s.vista.ordine.indexOf(s.mioId) + 1) || '–';
    hud.messaggio(`Traguardo! P${pos}`, `Ultimo giro ${formattaTempo(tempo)}`, 4);
    return;
  }
  if (fase === 'gara' && io.contagiri.giro === pista.giri - 1) hud.messaggio('Ultimo giro', formattaTempo(tempo), 2.4);
  else if (migliore) hud.messaggio(formattaTempo(tempo), fase === 'gara' ? 'giro più veloce' : 'giro delle prove', 2);
}

function applicaFase() {
  const v = s.vista;
  const me = partecipante(s.mioId);
  const presenza = me ? (me.spettatore ? 'spettatore' : `posto${me.posto}`) : 'assente';
  const chiave = `${v.numero}:${v.fase}:${v.pista}`;
  if (chiave === s.chiaveFase && presenza === s.presenza) return;
  const prima = s.chiaveFase;
  const soloPresenza = chiave === s.chiaveFase;
  s.chiaveFase = chiave;
  s.presenza = presenza;
  attivaPista(v.pista);
  io.spettatore = !me || me.spettatore;
  if (soloPresenza) {
    if (!io.spettatore && v.fase !== 'gara' && v.fase !== 'arrivo') mettiInGriglia(me.posto, v.fase === 'partenza');
    return;
  }
  const pista = pistaCorrente();
  hud.risultati(null);
  if (v.fase === 'prove') {
    io.migliore = null;
    io.pronto = false;
    if (me && !me.spettatore) mettiInGriglia(me.posto, false);
    hud.messaggio(pista.nome, `Prove libere · ${(pista.lunghezza / 1000).toFixed(2).replace('.', ',')} km · ${pista.giri} ${pista.giri === 1 ? 'giro' : 'giri'} in gara`, 3.5);
  } else if (v.fase === 'partenza') {
    io.migliore = null;
    if (me && !me.spettatore) mettiInGriglia(me.posto, true);
    hud.messaggio('In griglia', `Gara ${v.numero} · ${pista.nome}`, 2);
  } else if (v.fase === 'gara') {
    io.auto.fermo = false;
    io.inizioGiro = performance.now();
    if (prima === `${v.numero}:partenza:${v.pista}`) {
      hud.messaggio('Via!', '', 1.2);
      suono.via();
    }
  } else if (v.fase === 'arrivo') {
    mostraRisultati();
  }
}

function mostraRisultati() {
  const v = s.vista;
  const righe = v.ordine.map(id => partecipante(id)).filter(Boolean).map((p, i, elenco) => {
    const primo = elenco[0];
    let tempo = 'Ritirato';
    if (p.arrivo !== null) tempo = i === 0 ? formattaTempo(p.arrivo) : formattaTempo(p.arrivo - primo.arrivo, true);
    else if (p.giro < pistaCorrente().giri) tempo = pistaCorrente().giri - p.giro === 1 ? '1 giro indietro' : `${pistaCorrente().giri - p.giro} giri indietro`;
    return { nome: p.nome, colore: LIVREE[p.livrea].primario, tempo, migliore: formattaTempo(p.migliore), io: p.id === s.mioId };
  });
  const prossima = gp.piste[(v.pista + 1) % gp.piste.length].nome;
  const primato = record(pistaCorrente().id);
  hud.risultati(righe, `Arrivo · ${pistaCorrente().nome}`, `Prossima gara: ${prossima}${primato ? ` · il tuo record qui: ${formattaTempo(primato)}` : ''}`);
}

function vistaDaGara() {
  const g = s.gara;
  const st = g.stato;
  return {
    fase: st.fase,
    pista: st.pista,
    tempo: st.tempo,
    luci: st.luci,
    cronometro: st.cronometro,
    numero: st.numero,
    partecipanti: [...g.partecipanti.values()].map(p => ({
      id: p.id, nome: p.nome, livrea: p.livrea, ia: p.ia, posto: p.posto, giro: p.giro, s: p.s, totale: p.totale,
      arrivo: p.arrivo, migliore: p.migliore, spettatore: p.spettatore, pronto: p.pronto,
    })),
    ordine: g.classifica.map(p => p.id),
  };
}

function vistaDaIstantanea(m) {
  const lunghezza = gp.piste[m.p].lunghezza;
  return {
    fase: m.f,
    pista: m.p,
    tempo: m.tf,
    luci: m.lu,
    cronometro: m.cr,
    numero: m.num,
    partecipanti: m.g.map(g => ({
      id: g[0], nome: g[1], livrea: g[2], ia: g[3] === 1, posto: g[4], giro: g[5], s: g[6],
      totale: g[5] === 0 && g[6] > lunghezza / 2 ? g[6] - lunghezza : g[5] * lunghezza + g[6],
      arrivo: g[7] < 0 ? null : g[7], migliore: g[8] < 0 ? null : g[8], spettatore: g[9] === 1, pronto: true,
    })),
    ordine: m.ord,
  };
}

function istantanea() {
  const g = s.gara;
  const st = g.stato;
  const voci = [...g.partecipanti.values()].map(p => {
    let stato = 0;
    if (p.ia) stato = impacchetta(p.auto);
    else if (p.id === s.mioId) stato = io.spettatore ? 0 : impacchetta(io.auto);
    else if (s.remoti.get(p.id)?.ultimo) stato = impacchetta(s.remoti.get(p.id).ultimo);
    return [p.id, p.nome, p.livrea, p.ia ? 1 : 0, p.posto, p.giro, Math.round(p.s * 10) / 10, p.arrivo ?? -1, p.migliore ?? -1, p.spettatore ? 1 : 0, stato];
  });
  return { t: 'st', h: performance.now(), f: st.fase, p: st.pista, tf: Math.round(st.tempo * 100) / 100, lu: st.luci, cr: Math.round(st.cronometro * 1000) / 1000, num: st.numero, g: voci, ord: g.classifica.map(p => p.id) };
}

function ricordaRemoto(id, stato) {
  let r = s.remoti.get(id);
  if (!r) {
    r = { buffer: [], ultimo: null, auto: creaAuto(), chiamata: 0 };
    s.remoti.set(id, r);
  }
  const ora = performance.now();
  r.buffer.push({ t: ora, stato });
  while (r.buffer.length > 8) r.buffer.shift();
  r.ultimo = stato;
}

const angolo = a => Math.atan2(Math.sin(a), Math.cos(a));
function interpolaRemoto(r, ora) {
  const quando = ora - RITARDO_RETE_MS;
  const b = r.buffer;
  if (!b.length) return null;
  let a = b[0];
  let c = b[b.length - 1];
  for (let i = 0; i < b.length - 1; i++) {
    if (b[i].t <= quando && b[i + 1].t >= quando) {
      a = b[i];
      c = b[i + 1];
      break;
    }
  }
  const auto = r.auto;
  if (quando >= c.t) {
    const avanti = Math.min(0.25, (quando - c.t) / 1000);
    Object.assign(auto, c.stato);
    auto.x += c.stato.vx * avanti;
    auto.z += c.stato.vz * avanti;
    auto.yaw += c.stato.w * avanti;
  } else {
    const t = c.t > a.t ? Math.max(0, Math.min(1, (quando - a.t) / (c.t - a.t))) : 1;
    Object.assign(auto, c.stato);
    auto.x = a.stato.x + (c.stato.x - a.stato.x) * t;
    auto.z = a.stato.z + (c.stato.z - a.stato.z) * t;
    auto.yaw = a.stato.yaw + angolo(c.stato.yaw - a.stato.yaw) * t;
  }
  const passato = r.chiamata ? Math.min(0.1, Math.max(0, (ora - r.chiamata) / 1000)) : 0;
  r.chiamata = ora;
  auto.ruote = (auto.ruote ?? 0) + (velocitaAvanti(auto) / AUTO.raggioRuota) * passato;
  return auto;
}

function suMessaggioHost(m, id) {
  if (m.t === 'ciao') {
    const nome = pulisciNome(m.nome);
    if (nome && s.gara) s.gara.aggiungi(id, nome, m.livrea);
    return;
  }
  if (m.t === 'a' && s.gara) {
    const p = s.gara.partecipanti.get(id);
    if (!p) return;
    ricordaRemoto(id, spacchetta(m.d, {}));
    if (m.pista !== s.gara.stato.pista) {
      s.gara.aggiornaUmano(id, { pronto: m.pronto, s: p.s, giro: p.giro });
      return;
    }
    s.gara.aggiornaUmano(id, { s: m.s, giro: m.giro, migliore: m.migliore < 0 ? null : m.migliore, pronto: m.pronto, auto: s.remoti.get(id).auto });
  }
}

function suMessaggioOspite(m) {
  if (m.t === 'st') {
    if (m.h <= s.ultimaIstantanea) return;
    s.ultimaIstantanea = m.h;
    s.vista = vistaDaIstantanea(m);
    s.ricevuto = performance.now();
    const presenti = new Set(m.g.map(g => g[0]));
    for (const g of m.g) if (g[0] !== s.mioId && Array.isArray(g[10])) ricordaRemoto(g[0], spacchetta(g[10], {}));
    for (const id of s.remoti.keys()) if (!presenti.has(id)) s.remoti.delete(id);
    s.presentato = presenti.has(s.mioId);
    return;
  }
  if (m.t === 'ev') for (const e of m.eventi) annuncia(e);
}

function annuncia(e) {
  const nome = pulisciNome(e.nome);
  if (!nome) return;
  if (e.k === 'entra' && e.id !== s.mioId) hud.messaggio(`${nome} è in pista`, '', 1.8);
  else if (e.k === 'esce') hud.messaggio(`${nome} ha lasciato Cerano`, '', 1.8);
}

function presentati() {
  s.coll?.invia({ t: 'ciao', id: s.mioId, nome: s.nome, livrea: s.livrea });
}

function suRuolo(ruolo, coll, numero) {
  s.coll = coll;
  s.sonoHost = ruolo === 'host';
  s.presentato = s.sonoHost;
  s.ultimaIstantanea = -Infinity;
  s.ricevuto = performance.now();
  s.remoti.clear();
  s.numeroMondo = numero;
  if (s.sonoHost) {
    s.gara = creaGara({ piste: gp.piste, primaPista: Math.max(0, s.pistaAttiva) });
    s.gara.aggiungi(s.mioId, s.nome, s.livrea);
    s.gara.cambiaFase('prove');
    coll.suMessaggio(suMessaggioHost);
    s.vista = vistaDaGara();
  } else {
    s.gara = null;
    coll.suMessaggio(suMessaggioOspite);
    presentati();
  }
  s.chiaveFase = '';
  s.presenza = '';
}

function collegati() {
  s.rete?.chiudi();
  s.coll = null;
  s.rete = entraNelMondo({
    mioId: s.mioId,
    locale,
    suRuolo,
    suStato: stato => {
      s.statoRete = stato;
    },
    giocatoriNoti: () => (s.vista?.partecipanti ?? []).filter(p => !p.ia).map(p => p.id),
  });
}

function entra() {
  const nome = pulisciNome($('nome').value);
  if (!nome) {
    $('errore').textContent = 'Scrivi il tuo nome da pilota.';
    $('nome').focus();
    return;
  }
  s.nome = nome;
  salva(CHIAVE_NOME, nome);
  salva(CHIAVE_LIVREA, s.livrea);
  suono.prepara();
  for (const c of s.comparse) c.rimuovi();
  s.comparse = [];
  $('titolo').hidden = true;
  hud.mostra(true);
  comandi.attiva(true);
  s.fase = 'gioco';
  io.macchina.colora(LIVREE[s.livrea]);
  collegati();
}

function passoHost(dt) {
  const g = s.gara;
  if (!io.spettatore && io.contagiri) {
    g.aggiornaUmano(s.mioId, { s: io.contagiri.s, giro: io.contagiri.giro, migliore: io.migliore, pronto: io.pronto, auto: io.auto });
  } else g.aggiornaUmano(s.mioId, { pronto: io.pronto, s: 0, giro: 0 });
  const ora = performance.now();
  for (const p of [...g.partecipanti.values()]) {
    if (p.ia || p.id === s.mioId) continue;
    if (s.coll.silenzio(p.id) > SILENZIO_OSPITE_MS) {
      g.togli(p.id);
      s.coll.rimuovi?.(p.id);
      s.remoti.delete(p.id);
    }
  }
  const altre = [];
  if (!io.spettatore) altre.push(io.auto);
  for (const [id, r] of s.remoti) {
    const a = interpolaRemoto(r, ora);
    if (a && g.partecipanti.has(id)) altre.push(a);
  }
  const eventi = g.passo(dt, { collisioni: gp.citta.collisioni, altre });
  const daMandare = eventi.filter(e => e.k === 'entra' || e.k === 'esce');
  for (const e of daMandare) annuncia(e);
  if (daMandare.length) s.coll.invia({ t: 'ev', eventi: daMandare });
  s.vista = vistaDaGara();
  if (ora - s.ultimoStato > INVIO_STATO_MS) {
    s.coll.invia(istantanea(), { veloce: true });
    s.ultimoStato = ora;
  }
  s.rete?.aggiornaQuanti([...g.partecipanti.values()].filter(p => !p.ia).length);
}

function altreAuto(ora) {
  const elenco = [];
  if (!s.vista) return elenco;
  for (const p of s.vista.partecipanti) {
    if (p.id === s.mioId || p.spettatore) continue;
    let a = null;
    if (s.sonoHost && p.ia) a = s.gara.partecipanti.get(p.id)?.auto ?? null;
    else if (s.remoti.has(p.id)) a = interpolaRemoto(s.remoti.get(p.id), ora);
    if (a) elenco.push({ p, a });
  }
  return elenco;
}

function guidaIo(dt, ora, altre) {
  let c = comandi.leggi();
  if (s.autopilota && io.contagiri && !io.spettatore) c = { ...guidaPilota(s.autopilota, io.auto, pistaCorrente(), io.contagiri, [io.auto, ...altre], dt), azioni: c.azioni };
  for (const azione of c.azioni) {
    if (azione === 'telecamera') s.modo = (s.modo + 1) % MODI.length;
    else if (azione === 'rimetti') rimettiInPista();
    else if (azione === 'pronto' && s.vista?.fase === 'prove') {
      io.pronto = true;
      hud.messaggio('Pronto', 'si parte appena sono pronti tutti', 1.6);
    } else if (azione === 'aiuti') {
      io.auto.aiuti = !io.auto.aiuti;
      hud.messaggio(io.auto.aiuti ? 'Aiuti accesi' : 'Aiuti spenti', io.auto.aiuti ? 'controllo di trazione e stabilità' : 'solo ABS: occhio alla coda', 1.8);
    } else if (azione === 'muto') hud.messaggio(suono.alternaMuto() ? 'Audio spento' : 'Audio acceso', '', 1.2);
  }
  s.indietro = c.indietro;
  if (io.spettatore || !io.contagiri) return;
  calcolaScia(io.auto, altre);
  const forte = simula(io.auto, c, dt, { collisioni: gp.citta.collisioni });
  if (![io.auto.x, io.auto.z, io.auto.yaw, io.auto.vx, io.auto.vz, io.auto.w].every(Number.isFinite)) {
    if (!Number.isFinite(io.auto.yaw)) io.auto.yaw = 0;
    rimettiInPista();
  }
  let urto = forte;
  for (const b of altre) urto = Math.max(urto, urtaAuto(io.auto, b, true));
  if (urto > 2) {
    suono.urto(urto);
    telecamera.scuoti(Math.min(1, urto / 12));
  }
  const pista = pistaCorrente();
  const info = io.contagiri.aggiorna(io.auto.x, io.auto.z, dt, velocitaAvanti(io.auto));
  if (info.giroFatto) giroCompletato();
  const larghezza = Math.max(pista.sinistra[info.i], pista.destra[info.i]);
  io.fuori = info.distanza > larghezza + OLTRE_LA_PISTA ? io.fuori + dt : 0;
  if (io.fuori > FUORI_PISTA_S) {
    rimettiInPista();
    hud.messaggio('Rimesso in pista', '', 1.4);
  }
  io.contromano = io.contagiri.contrario > CONTROMANO_S ? io.contromano + dt : 0;
  if (io.contromano > 0 && io.contromano < dt * 1.5) hud.messaggio('Contromano!', 'premi R per rimetterti in pista', 2);
  if (!s.sonoHost && s.coll && ora - s.ultimoInvio > INVIO_AUTO_MS && s.vista) {
    s.coll.invia({ t: 'a', d: impacchetta(io.auto), giro: io.contagiri.giro, s: Math.round(io.contagiri.s * 10) / 10, migliore: io.migliore ?? -1, pronto: io.pronto, pista: s.vista.pista }, { veloce: true });
    s.ultimoInvio = ora;
  }
}

function passo(dt, ora) {
  if (s.fase !== 'gioco') return;
  if (s.coll && !s.sonoHost && !s.presentato && ora - s.ultimoCiao > PRESENTAZIONE_MS) {
    presentati();
    s.ultimoCiao = ora;
  }
  if (s.coll && !s.sonoHost && (io.spettatore || !io.contagiri) && ora - s.ultimoInvio > BATTITO_OSPITE_MS) {
    s.coll.invia({ t: 'ping', n: ora });
    s.ultimoInvio = ora;
  }
  if (s.coll && !s.sonoHost && s.rete?.ruolo === 'ospite' && ora - s.ricevuto > SENZA_NOTIZIE_MS) collegati();
  const altre = altreAuto(ora).map(v => v.a);
  guidaIo(dt, ora, altre);
  if (s.sonoHost && s.gara) passoHost(dt);
  if (s.vista) applicaFase();
}

function macchinaPer(id, livrea, pieno = false) {
  let m = s.macchine.get(id);
  if (!m) {
    m = fabbrica.crea(LIVREE[livrea], { pieno });
    s.macchine.set(id, m);
  } else if (m.livrea !== LIVREE[livrea]) m.colora(LIVREE[livrea]);
  return m;
}

function tempoFase() {
  const v = s.vista;
  if (!v) return 0;
  return v.tempo + (s.sonoHost ? 0 : (performance.now() - s.ricevuto) / 1000);
}

function testoFase() {
  const v = s.vista;
  if (!v) return s.statoRete?.testo ?? 'Cerco la pista…';
  const pista = pistaCorrente();
  const umani = v.partecipanti.filter(p => !p.ia && !p.spettatore);
  if (v.fase === 'prove') {
    const resta = Math.max(0, Math.ceil(DURATE.prove - tempoFase()));
    const pronti = umani.filter(p => p.pronto).length;
    return `Prove libere · partenza tra ${resta} s · ${io.pronto ? 'sei pronto' : 'Invio = pronto'} (${pronti}/${umani.length})`;
  }
  if (v.fase === 'partenza') return `Partenza · ${pista.nome}`;
  if (v.fase === 'gara') return `Gara ${v.numero} · ${pista.giri} ${pista.giri === 1 ? 'giro' : 'giri'} · ${umani.length} ${umani.length === 1 ? 'pilota' : 'piloti'} e ${v.partecipanti.length - umani.length} avversari del computer`;
  const resta = Math.max(0, Math.ceil(DURATE.arrivo - tempoFase()));
  return `Prossima gara tra ${resta} s: ${gp.piste[(v.pista + 1) % gp.piste.length].nome}`;
}

function classificaHud() {
  const v = s.vista;
  if (!v) return [];
  const voci = v.ordine.map(id => v.partecipanti.find(p => p.id === id)).filter(Boolean);
  const primo = voci[0];
  return voci.map((p, i) => {
    let distacco = '';
    if (i === 0) distacco = p.arrivo !== null ? formattaTempo(p.arrivo) : v.fase === 'gara' ? 'in testa' : '';
    else if (p.arrivo !== null && primo.arrivo !== null) distacco = formattaTempo(p.arrivo - primo.arrivo, true);
    else if (v.fase === 'gara') {
      const metri = primo.totale - p.totale;
      const giri = Math.floor(metri / pistaCorrente().lunghezza);
      distacco = giri >= 1 ? `+${giri} ${giri === 1 ? 'giro' : 'giri'}` : `+${(metri / VELOCITA_RIFERIMENTO).toFixed(1)}`;
    }
    return { nome: p.nome, colore: LIVREE[p.livrea].primario, distacco, io: p.id === s.mioId };
  });
}

function aggiornaSemafori() {
  const v = s.vista;
  if (!v) return;
  const piste = piste3d[s.pistaAttiva];
  if (v.fase === 'partenza') {
    hud.semafori(v.luci, false, true);
    piste?.semafori(v.luci, false);
    if (v.luci > s.luciPrima) suono.luce();
    s.luciPrima = v.luci;
  } else if (v.fase === 'gara' && v.cronometro + (s.sonoHost ? 0 : (performance.now() - s.ricevuto) / 1000) < 1.5) {
    hud.semafori(0, true, true);
    piste?.semafori(0, true);
    s.luciPrima = 0;
  } else {
    hud.semafori(0, false, false);
    piste?.semafori(0, false);
    s.luciPrima = 0;
  }
}

function disegnaGioco(dt, ora) {
  const altre = altreAuto(ora);
  const vivi = new Set([s.mioId]);
  for (const { p, a } of altre) {
    vivi.add(p.id);
    macchinaPer(p.id, p.livrea).imposta(a);
  }
  for (const [id, m] of s.macchine) {
    if (vivi.has(id)) continue;
    m.rimuovi();
    s.macchine.delete(id);
  }
  io.macchina.imposta(io.spettatore ? null : io.auto);
  const scie = altre.map(({ p, a }) => ({ id: p.id, a }));
  if (!io.spettatore) scie.push({ id: s.mioId, a: io.auto });
  effetti.aggiorna(scie, dt);
  let occhio;
  const pista = pistaCorrente();
  if (io.spettatore || !io.contagiri) {
    const capo = altre.find(v => v.p.id === s.vista?.ordine[0]) ?? altre[0];
    occhio = capo ? telecamera.televisione(capo.a, pista, pista.vicino(capo.a.x, capo.a.z).s) : telecamera.orbita(io.auto, dt);
  } else occhio = telecamera.insegui(io.auto, dt, { modo: MODI[s.modo], collisioni: gp.citta.collisioni, indietro: s.indietro, altre: altre.map(v => v.a) });
  const r0 = performance.now();
  mondo.disegna(occhio, dt);
  s.ultimoDisegno = performance.now() - r0;
  tempi.disegno += s.ultimoDisegno;
  suono.aggiorna(io.spettatore ? null : io.auto, altre.map(v => v.a), { x: occhio.x, z: occhio.z, yaw: occhio.yaw });
  aggiornaSemafori();
  const v = s.vista;
  const umani = v ? v.partecipanti.filter(p => !p.ia).length : 1;
  const posizione = v ? v.ordine.indexOf(s.mioId) + 1 : 0;
  hud.aggiorna({
    velocita: velocitaAvanti(io.auto),
    marcia: io.auto.marcia,
    rpm: io.auto.rpm,
    posizione: io.spettatore ? 0 : posizione,
    totale: v?.ordine.length ?? 0,
    giro: io.contagiri?.giro ?? 0,
    giri: v?.fase === 'gara' || v?.fase === 'arrivo' ? pista.giri : 0,
    tempoGiro: io.arrivato || io.spettatore ? null : (ora - io.inizioGiro) / 1000,
    migliore: io.migliore,
    tempoGara: v?.fase === 'gara' ? v.cronometro + (s.sonoHost ? 0 : (ora - s.ricevuto) / 1000) : null,
    classifica: classificaHud(),
    pista: pista.nome,
    fase: testoFase(),
    aiuto: `C telecamera (${MODI[s.modo]}) · V guarda dietro · R rimetti in pista · T aiuti ${io.auto.aiuti ? 'accesi' : 'spenti'} · M audio`,
    rete: `${s.sonoHost ? 'Organizzi tu' : s.coll?.modo === 'diretto' ? 'Collegato' : s.coll ? 'Collegamento lento' : 'Cerco'} · Cerano ${s.numeroMondo ?? 1} · ${umani} ${umani === 1 ? 'pilota' : 'piloti'}`,
    scia: io.auto.scia,
    spettatore: io.spettatore ? 'Sei spettatore: entri in pista alla prossima gara' : '',
    auto: [...altre.map(({ p, a }) => ({ x: a.x, z: a.z, colore: LIVREE[p.livrea].primario, io: false })), ...(io.spettatore ? [] : [{ x: io.auto.x, z: io.auto.z, colore: LIVREE[s.livrea].primario, io: true }])],
  });
  const r1 = performance.now();
  fabbrica.aggiorna(mondo.camera, dt);
  tempi.auto += performance.now() - r1;
}

function disegnaTitolo(dt) {
  io.macchina.imposta(io.auto);
  const occhio = telecamera.orbita(io.auto, dt);
  mondo.disegna(occhio, dt);
  fabbrica.aggiorna(mondo.camera, dt);
}

const tempi = { passo: 0, totale: 0, disegno: 0, auto: 0, fotogrammi: 0 };
const registro = [];
let ultimoFotogramma = performance.now();
function fotogramma(ora) {
  requestAnimationFrame(fotogramma);
  const dt = Math.min(PASSO_MASSIMO, Math.max(0, (ora - ultimoFotogramma) / 1000));
  ultimoFotogramma = ora;
  if (!mondo || document.hidden) return;
  const t0 = performance.now();
  if (s.fase === 'titolo') disegnaTitolo(dt);
  else if (s.fase === 'gioco') {
    passo(dt, ora);
    const t1 = performance.now();
    disegnaGioco(dt, ora);
    tempi.passo += t1 - t0;
  }
  tempi.totale += performance.now() - t0;
  tempi.fotogrammi += 1;
  if (import.meta.env.DEV) registro.push([ora, performance.now() - t0, s.ultimoDisegno ?? 0]);
  if (registro.length > 2000) registro.shift();
}

let ultimoTick = performance.now();
function tickNascosto() {
  const ora = performance.now();
  const dt = Math.min(PASSO_MASSIMO, (ora - ultimoTick) / 1000);
  ultimoTick = ora;
  if (document.hidden && s.fase === 'gioco') passo(dt, ora);
}

function preparaTitolo() {
  const contenitore = $('livree');
  LIVREE.forEach((l, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.title = l.nome;
    b.style.background = `linear-gradient(135deg, #${l.primario.toString(16).padStart(6, '0')} 0 58%, #${l.secondario.toString(16).padStart(6, '0')} 58%)`;
    b.setAttribute('aria-pressed', String(i === s.livrea));
    b.addEventListener('click', () => {
      s.livrea = i;
      [...contenitore.children].forEach((x, k) => x.setAttribute('aria-pressed', String(k === i)));
      $('nome-livrea').textContent = l.nome;
      io.macchina?.colora(l);
    });
    contenitore.appendChild(b);
  });
  $('nome-livrea').textContent = LIVREE[s.livrea].nome;
  $('nome').value = s.nome;
  $('grafica').value = leggiScelta();
  $('grafica').options[0].textContent = `Automatica (${LIVELLI[livelloAttivo()].nome})`;
  $('grafica').addEventListener('change', () => {
    salvaScelta($('grafica').value);
    const nome = pulisciNome($('nome').value);
    if (nome) salva(CHIAVE_NOME, nome);
    salva(CHIAVE_LIVREA, s.livrea);
    location.reload();
  });
  $('modulo').addEventListener('submit', e => {
    e.preventDefault();
    if (!$('entra').disabled) entra();
  });
}

async function avvia() {
  preparaTitolo();
  carico(0.05, 'Scarico le vie di Cerano…');
  const risposta = await fetch('./cerano/cerano.json');
  if (!risposta.ok) throw new Error(`cerano.json: ${risposta.status}`);
  const dati = await risposta.json();
  carico(0.25, 'Chiudo le strade e monto le barriere…');
  await new Promise(r => setTimeout(r, 0));
  gp = preparaGara(dati);
  carico(0.4, 'Accendo i lampioni…');
  mondo = await creaMondo($('mondo'), gp.citta, { ora: 'tramonto', luciLampioni: 0 });
  carico(0.7, 'Porto le auto in griglia…');
  fabbrica = await preparaAuto(mondo.renderer, mondo.scena, { quota: gp.citta.quota });
  piste3d = gp.piste.map(p => costruisciPista3d(mondo.scena, p));
  effetti = creaEffetti(mondo.scena, { quota: gp.citta.quota });
  carico(0.95, 'Scaldo le gomme…');
  attivaPista(0);
  io.macchina = fabbrica.crea(LIVREE[s.livrea], { pieno: true });
  mettiInGriglia(0, true);
  const pista = pistaCorrente();
  for (let i = 1; i <= COMPARSE_TITOLO; i++) {
    const g = pista.griglia[i];
    const c = fabbrica.crea(LIVREE[(s.livrea + i * 3) % LIVREE.length]);
    c.imposta({ x: g.x, z: g.z, yaw: g.yaw });
    s.comparse.push(c);
  }
  $('prossima').innerHTML = `Si corre su <b>${pista.nome}</b><br>${pista.sottotitolo} · ${(pista.lunghezza / 1000).toFixed(2).replace('.', ',')} km`;
  for (const p of piste3d) p.mostra(true);
  fabbrica.precompila(mondo.camera);
  for (const [i, p] of piste3d.entries()) p.mostra(i === s.pistaAttiva);
  $('carico').hidden = true;
  $('titolo').hidden = false;
  $('entra').disabled = false;
  $('entra').querySelector('span').textContent = 'IN PISTA';
  s.fase = 'titolo';
  if (!s.nome) $('nome').focus();
  const orologio = new Worker(new URL('./orologio-worker.js', import.meta.url));
  orologio.onmessage = tickNascosto;
}

requestAnimationFrame(fotogramma);
avvia().catch(e => {
  console.error('Avvio non riuscito:', e);
  $('carico-testo').textContent = 'Non riesco a preparare la pista: ricarica la pagina.';
});

if (import.meta.env.DEV) {
  window.__gioco = {
    pronto: () => s.fase === 'titolo' || s.fase === 'gioco',
    stato: () => ({ fase: s.fase, host: s.sonoHost, vista: s.vista && { fase: s.vista.fase, pista: s.vista.pista, partecipanti: s.vista.partecipanti.length, ordine: s.vista.ordine }, io: { x: io.auto.x, z: io.auto.z, v: velocitaAvanti(io.auto), giro: io.contagiri?.giro, s: io.contagiri?.s, spettatore: io.spettatore, fermo: io.auto.fermo }, qualita: mondo?.qualita, scala: mondo?.scala }),
    statistiche: () => ({ ...mondo.statistiche(), auto: fabbrica.statistiche() }),
    gara: () => s.gara,
    registro: () => registro.splice(0),
    io,
    mondo: () => mondo,
    fase: f => s.gara?.cambiaFase(f),
    autopilota: si => {
      s.autopilota = si ? creaPilota(0.97, 0) : null;
    },
    pista: i => {
      if (!s.gara) return;
      s.gara.stato.pista = i;
      s.gara.cambiaFase('prove');
    },
    giri: n => gp.piste.forEach(p => {
      p.giri = n;
    }),
    tempi: () => {
      const r = Object.fromEntries(Object.entries(tempi).map(([k, v]) => [k, v / tempi.fotogrammi]));
      for (const k of Object.keys(tempi)) tempi[k] = 0;
      tempi.fotogrammi = 0;
      return r;
    },
  };
}

const NOME_MASSIMO = 16;
const ID_MASSIMO = 64;
const LIVREE = 10;
const PISTE = 3;
const FASI = Object.freeze(['prove', 'partenza', 'gara', 'arrivo']);
const PARTECIPANTI_MASSIMI = 16;
const EVENTI_MASSIMI = 40;

/** Numeri dello stato di un'auto in rete, in quest'ordine. */
export const CAMPI_AUTO = Object.freeze(['x', 'z', 'yaw', 'vx', 'vz', 'w', 'angoloSterzo', 'rpm', 'gas', 'freno', 'marcia', 'ax', 'ay', 'sbanda', 'urto']);

export function pulisciNome(testo) {
  const nome = String(testo ?? '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, NOME_MASSIMO);
  return nome || null;
}

const numero = x => typeof x === 'number' && Number.isFinite(x);
const intero = (x, min, max) => Number.isInteger(x) && x >= min && x <= max;
const testo = (x, massimo = ID_MASSIMO) => typeof x === 'string' && x.length > 0 && x.length <= massimo;
const facoltativo = x => x === -1 || (numero(x) && x >= 0);
const statoAuto = d => Array.isArray(d) && d.length === CAMPI_AUTO.length && d.every(numero);

export const impacchetta = a => CAMPI_AUTO.map(k => (Number.isFinite(a[k]) ? Math.round(a[k] * 1000) / 1000 : 0));
export function spacchetta(d, a = {}) {
  CAMPI_AUTO.forEach((k, i) => {
    a[k] = d[i];
  });
  return a;
}

function eVoce(g) {
  return Array.isArray(g) && g.length === 11 && testo(g[0]) && typeof g[1] === 'string' && g[1].length <= NOME_MASSIMO
    && intero(g[2], 0, LIVREE - 1) && intero(g[3], 0, 1) && intero(g[4], 0, 15) && intero(g[5], 0, 99) && numero(g[6])
    && facoltativo(g[7]) && facoltativo(g[8]) && intero(g[9], 0, 1) && (g[10] === 0 || statoAuto(g[10]));
}

const CONTROLLI = {
  ciao: m => testo(m.id) && pulisciNome(m.nome) !== null && intero(m.livrea, 0, LIVREE - 1),
  a: m => statoAuto(m.d) && intero(m.giro, 0, 99) && numero(m.s) && facoltativo(m.migliore) && typeof m.pronto === 'boolean' && intero(m.pista, 0, PISTE - 1),
  st: m => numero(m.h) && FASI.includes(m.f) && intero(m.p, 0, PISTE - 1) && numero(m.tf) && intero(m.lu, 0, 5) && numero(m.cr) && intero(m.num, 1, 1e6)
    && Array.isArray(m.g) && m.g.length <= PARTECIPANTI_MASSIMI && m.g.every(eVoce)
    && Array.isArray(m.ord) && m.ord.length <= PARTECIPANTI_MASSIMI && m.ord.every(x => testo(x)),
  ev: m => Array.isArray(m.eventi) && m.eventi.length <= EVENTI_MASSIMI && m.eventi.every(e => e && typeof e.k === 'string'),
  ping: m => numero(m.n),
  pong: m => numero(m.n),
};

export function valida(messaggio) {
  if (!messaggio || typeof messaggio !== 'object' || typeof messaggio.t !== 'string') return null;
  const controllo = CONTROLLI[messaggio.t];
  return controllo && controllo(messaggio) ? messaggio : null;
}

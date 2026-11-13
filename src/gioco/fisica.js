const G = 9.81;

/** Dati dell'auto da corsa: due posti, motore anteriore centrale da ~480 CV, trazione posteriore. */
export const AUTO = Object.freeze({
  massa: 1280,
  inerzia: 2100,
  avanti: 1.35,
  dietro: 1.45,
  altezza: 0.4,
  raggioRuota: 0.384,
  aderenza: 1.2,
  rigidezza: 9.5,
  forma: 1.7,
  aria: 0.42,
  deportanza: 0.5,
  rotolamento: 16,
  rapporti: Object.freeze([-3.3, 3.15, 2.2, 1.68, 1.34, 1.1, 0.9]),
  finale: 4.35,
  rendimento: 0.86,
  coppiaMassima: 520,
  giriPicco: 5000,
  giriMinimo: 950,
  giriMassimo: 7800,
  cambioSu: 7400,
  cambioGiu: 3500,
  tempoCambio: 0.11,
  frenoMassimo: 16500,
  ripartizione: 0.63,
  sterzoMassimo: 0.6,
  angoloPicco: 0.11,
  lunghezza: 4.34,
  larghezza: 2.1,
  baricentroModello: 0.135,
  raggioUrto: 1.02,
  centriUrto: Object.freeze([-1.05, 0.1, 1.24]),
});

export const PASSI_PER_SECONDO = 240;
const RESTITUZIONE = 0.22;
const ATTRITO_MURO = 0.3;
const LIMITE_TRAZIONE = 0.72;
const TRAZIONE_DRITTA = 0.94;
const ABS_ANTERIORE = 0.9;
const ABS_POSTERIORE = 0.72;
const SOGLIA_ESP = 0.1;
const COPPIA_ESP = 7000;
const RITORNO_STERZO = 5.5;
const SCIA_DA = 18;
const VELOCITA_STERZO = 3.6;

export function creaAuto(x = 0, z = 0, yaw = 0) {
  return {
    x, z, yaw, vx: 0, vz: 0, w: 0,
    sterzo: 0, angoloSterzo: 0, marcia: 1, rpm: AUTO.giriMinimo, cambio: 0,
    ax: 0, ay: 0, pattina: 0, sbanda: 0, bloccate: 0,
    gas: 0, freno: 0, mano: 0, ruote: 0, urto: 0, urtoX: 0, urtoZ: 0, scia: 0,
    fermo: false, aiuti: true,
  };
}

export const avanti = a => ({ x: Math.sin(a.yaw), z: Math.cos(a.yaw) });
export const velocita = a => Math.hypot(a.vx, a.vz);
export const velocitaAvanti = a => a.vx * Math.sin(a.yaw) + a.vz * Math.cos(a.yaw);

export function coppia(rpm) {
  const r = Math.min(Math.max(rpm, AUTO.giriMinimo), AUTO.giriMassimo);
  const sopra = (r - AUTO.giriPicco) / (r > AUTO.giriPicco ? 5600 : 4200);
  return AUTO.coppiaMassima * Math.max(0.35, 1 - sopra * sopra);
}

function giriDaVelocita(u, marcia) {
  return (Math.abs(u) / AUTO.raggioRuota) * Math.abs(AUTO.rapporti[marcia]) * AUTO.finale * (60 / (2 * Math.PI));
}

function magica(alfa) {
  return Math.sin(AUTO.forma * Math.atan(AUTO.rigidezza * alfa));
}

export function sterzoMassimo(u) {
  const lunghezza = AUTO.avanti + AUTO.dietro;
  return Math.min(AUTO.sterzoMassimo, AUTO.angoloPicco + (lunghezza * AUTO.aderenza * G) / Math.max(1, u * u));
}

function cambiaMarce(a, u, accelera) {
  if (a.marcia === 0 || a.cambio > 0) return;
  const rpm = giriDaVelocita(u, a.marcia);
  if (rpm > AUTO.cambioSu && a.marcia < AUTO.rapporti.length - 1 && u > 0) {
    a.marcia += 1;
    a.cambio = AUTO.tempoCambio;
    return;
  }
  if (a.marcia > 1) {
    const sotto = giriDaVelocita(u, a.marcia - 1);
    const soglia = accelera > 0.5 ? AUTO.cambioGiu + 1200 : AUTO.cambioGiu;
    if (rpm < soglia && sotto < AUTO.cambioSu - 600) {
      a.marcia -= 1;
      a.cambio = AUTO.tempoCambio * 0.7;
    }
  }
}

/** Traduce i comandi del pilota in acceleratore e freno, con la retromarcia «a freno tenuto» da fermi. */
function intenzione(a, c, u) {
  const gas = Math.min(1, Math.max(0, c.gas ?? 0));
  const freno = Math.min(1, Math.max(0, c.freno ?? 0));
  if (a.marcia === 0) {
    if (gas > 0.1) {
      if (u < -0.8) return { acceleratore: 0, frena: gas };
      a.marcia = 1;
      return { acceleratore: gas, frena: 0 };
    }
    return { acceleratore: freno, frena: 0 };
  }
  if (freno > 0.1 && gas < 0.1 && u < 0.6) {
    a.marcia = 0;
    return { acceleratore: freno, frena: 0 };
  }
  return { acceleratore: gas, frena: freno };
}

/**
 * Un passo di simulazione: modello a bicicletta con angoli di deriva e gomme a formula magica, trasferimento
 * di carico, deportanza, trazione posteriore con controllo di trazione, ABS, freno a mano, cambio automatico
 * e un controllo di stabilità leggero (spegnibile). Comandi: gas e freno 0…1, sterzo -1…1 (positivo a destra).
 */
export function passo(a, c, dt) {
  const fx = Math.sin(a.yaw);
  const fz = Math.cos(a.yaw);
  const lx = fz;
  const lz = -fx;
  const u = a.vx * fx + a.vz * fz;
  let v = a.vx * lx + a.vz * lz;
  const modulo = Math.hypot(a.vx, a.vz);
  const lunghezza = AUTO.avanti + AUTO.dietro;
  const { acceleratore, frena } = a.fermo ? { acceleratore: 0, frena: 1 } : intenzione(a, c, u);
  const mano = a.fermo || !!c.mano;

  const richiesta = Math.max(-1, Math.min(1, c.sterzo ?? 0));
  if (c.analogico) a.sterzo += (richiesta - a.sterzo) * Math.min(1, dt * 18);
  else {
    const rientra = richiesta === 0 || Math.sign(richiesta) !== Math.sign(a.sterzo);
    const passoSterzo = (rientra ? RITORNO_STERZO : VELOCITA_STERZO) * dt;
    const scarto = richiesta - a.sterzo;
    a.sterzo += Math.abs(scarto) <= passoSterzo ? scarto : Math.sign(scarto) * passoSterzo;
  }
  const delta = -a.sterzo * sterzoMassimo(Math.abs(u));
  a.angoloSterzo = delta;

  if (a.cambio > 0) a.cambio = Math.max(0, a.cambio - dt);
  cambiaMarce(a, u, acceleratore);

  const deportanza = AUTO.deportanza * modulo * modulo;
  const peso = AUTO.massa * G;
  const trasferimento = (AUTO.massa * a.ax * AUTO.altezza) / lunghezza;
  const caricoAnt = Math.max(peso * 0.12, (peso * AUTO.dietro) / lunghezza - trasferimento + deportanza * 0.45);
  const caricoPost = Math.max(peso * 0.12, (peso * AUTO.avanti) / lunghezza + trasferimento + deportanza * 0.55);
  const muAnt = AUTO.aderenza * caricoAnt;
  const muPost = AUTO.aderenza * caricoPost;

  const giriRuota = giriDaVelocita(u, a.marcia);
  let rpm = giriRuota;
  if (a.marcia === 1 || a.marcia === 0) rpm = Math.max(rpm, Math.min(AUTO.giriMassimo, AUTO.giriMinimo + 300 + acceleratore * 3200 * Math.max(0, 1 - Math.abs(u) / 9)));
  rpm = Math.max(AUTO.giriMinimo, rpm);
  let spinta = 0;
  if (a.cambio <= 0) {
    const verso = a.marcia === 0 ? -1 : 1;
    const motore = rpm >= AUTO.giriMassimo ? 0 : coppia(rpm) * acceleratore * (a.marcia === 0 ? 0.45 : 1);
    const freniMotore = acceleratore < 0.05 && frena < 0.05 ? -(28 + rpm * 0.012) * Math.sign(u) : 0;
    spinta = ((motore * verso + freniMotore) * Math.abs(AUTO.rapporti[a.marcia]) * AUTO.finale * AUTO.rendimento) / AUTO.raggioRuota;
  }
  const curvando = Math.min(1, Math.abs(a.ay) / 5 + Math.abs(a.w) * 1.5 + Math.abs(a.sterzo) * 0.6);
  const limite = muPost * (a.aiuti ? TRAZIONE_DRITTA - (TRAZIONE_DRITTA - LIMITE_TRAZIONE) * curvando : 0.98);
  a.pattina = Math.abs(spinta) > limite ? Math.min(1, (Math.abs(spinta) - limite) / limite) : 0;
  if (a.pattina > 0) rpm = Math.min(AUTO.giriMassimo, rpm + a.pattina * 1800);
  spinta = Math.max(-limite, Math.min(limite, spinta));

  const segnoU = u >= 0 ? 1 : -1;
  let frenoAnt = Math.min(frena * AUTO.frenoMassimo * AUTO.ripartizione, muAnt * ABS_ANTERIORE);
  let frenoPost = Math.min(frena * AUTO.frenoMassimo * (1 - AUTO.ripartizione), muPost * (a.aiuti ? ABS_POSTERIORE : ABS_ANTERIORE));
  frenoPost = Math.min(frenoPost, Math.max(0, muPost * (a.aiuti ? ABS_POSTERIORE : ABS_ANTERIORE) - Math.abs(spinta)));
  if (mano) frenoPost = muPost * 0.92;
  if (Math.abs(u) < 0.25) {
    frenoAnt = 0;
    frenoPost = 0;
  }

  const denominatore = Math.max(Math.abs(u), 3);
  const alfaAnt = Math.atan2(v + AUTO.avanti * a.w, denominatore) - delta * segnoU;
  const alfaPost = Math.atan2(v - AUTO.dietro * a.w, denominatore);
  const lungoPost = Math.abs(spinta) + frenoPost;
  const quotaAnt = Math.min(0.99, frenoAnt / muAnt);
  const quotaPost = Math.min(0.99, lungoPost / muPost);
  let laterAnt = -muAnt * magica(alfaAnt) * Math.sqrt(1 - quotaAnt * quotaAnt);
  let laterPost = -muPost * magica(alfaPost) * Math.sqrt(1 - quotaPost * quotaPost) * (mano ? 0.42 : 1);
  if (mano && Math.abs(u) > 3) laterPost *= 0.85;

  const resistenza = AUTO.aria * modulo + AUTO.rotolamento;
  let forzaLunga = spinta - (frenoAnt + frenoPost) * segnoU - laterAnt * Math.sin(delta) - resistenza * u;
  let forzaLaterale = laterAnt * Math.cos(delta) + laterPost - resistenza * v * 0.2;
  let momento = AUTO.avanti * laterAnt * Math.cos(delta) - AUTO.dietro * laterPost;

  if (a.aiuti && Math.abs(u) > 8 && !mano) {
    const atteso = (u * Math.tan(delta)) / (lunghezza * (1 + (u * u) / 900));
    const scarto = a.w - atteso;
    if (Math.abs(scarto) > SOGLIA_ESP) {
      momento -= Math.sign(scarto) * Math.min(COPPIA_ESP, (Math.abs(scarto) - SOGLIA_ESP) * 22000);
      if (spinta > 0) forzaLunga -= spinta * Math.min(0.6, (Math.abs(scarto) - SOGLIA_ESP) * 2);
    }
  }

  const axLocale = forzaLunga / AUTO.massa;
  const ayLocale = forzaLaterale / AUTO.massa;
  a.ax += (axLocale - a.ax) * Math.min(1, dt * 8);
  a.ay += (ayLocale - a.ay) * Math.min(1, dt * 8);
  a.vx += ((forzaLunga * fx + forzaLaterale * lx) / AUTO.massa) * dt;
  a.vz += ((forzaLunga * fz + forzaLaterale * lz) / AUTO.massa) * dt;
  a.w += (momento / AUTO.inerzia) * dt;

  const lento = Math.hypot(a.vx, a.vz);
  if (lento < 3) {
    const uNuova = a.vx * fx + a.vz * fz;
    const fusione = Math.max(0, Math.min(1, (lento - 0.6) / 2.4));
    const cinematica = (uNuova * Math.tan(delta)) / lunghezza;
    a.w = cinematica + (a.w - cinematica) * fusione;
    v = (a.vx * lx + a.vz * lz) * fusione;
    a.vx = fx * uNuova + lx * v;
    a.vz = fz * uNuova + lz * v;
    if (lento < 0.35 && acceleratore < 0.05) {
      a.vx = 0;
      a.vz = 0;
      a.w = 0;
    }
  }

  a.yaw += a.w * dt;
  a.x += a.vx * dt;
  a.z += a.vz * dt;
  a.rpm += (rpm - a.rpm) * Math.min(1, dt * 14);
  a.gas = acceleratore;
  a.freno = frena;
  a.mano = mano ? 1 : 0;
  a.ruote += (u / AUTO.raggioRuota) * dt * (a.pattina > 0 ? 1 + a.pattina * 2 : 1);
  a.sbanda = Math.max(Math.abs(Math.sin(alfaPost)) * Math.min(1, Math.abs(u) / 6), Math.abs(Math.sin(alfaAnt)) * 0.8 * Math.min(1, Math.abs(u) / 6));
  a.bloccate = mano && Math.abs(u) > 2 ? 1 : 0;
}

export function cerchiAuto(a) {
  const fx = Math.sin(a.yaw);
  const fz = Math.cos(a.yaw);
  return AUTO.centriUrto.map(d => ({ x: a.x + fx * d, z: a.z + fz * d, ox: fx * d, oz: fz * d, r: AUTO.raggioUrto }));
}

function impulso(a, ox, oz, nx, nz, massaAltro = Infinity, vAltroX = 0, vAltroZ = 0) {
  const pvx = a.vx + a.w * oz;
  const pvz = a.vz - a.w * ox;
  const rel = (pvx - vAltroX) * nx + (pvz - vAltroZ) * nz;
  if (rel >= 0) return 0;
  const k = oz * nx - ox * nz;
  const inverso = 1 / AUTO.massa + (k * k) / AUTO.inerzia + (Number.isFinite(massaAltro) ? 1 / massaAltro : 0);
  const j = (-(1 + RESTITUZIONE) * rel) / inverso;
  a.vx += (j * nx) / AUTO.massa;
  a.vz += (j * nz) / AUTO.massa;
  a.w += (k * j) / AUTO.inerzia;
  const tx = -nz;
  const tz = nx;
  const scorre = (pvx - vAltroX) * tx + (pvz - vAltroZ) * tz;
  const kt = oz * tx - ox * tz;
  const inversoT = 1 / AUTO.massa + (kt * kt) / AUTO.inerzia;
  const jt = Math.max(-ATTRITO_MURO * j, Math.min(ATTRITO_MURO * j, -scorre / inversoT));
  a.vx += (jt * tx) / AUTO.massa;
  a.vz += (jt * tz) / AUTO.massa;
  a.w += (kt * jt) / AUTO.inerzia;
  return -rel;
}

/** Urti con muri, barriere e pali: spinge fuori i tre cerchi e applica l'impulso con rotazione. */
export function urtaMondo(a, collisioni, filtro = null) {
  let forte = 0;
  for (const c of cerchiAuto(a)) {
    const esito = collisioni.respingi(c.x, c.z, c.r, filtro);
    if (!esito.urto) continue;
    const dx = esito.x - c.x;
    const dz = esito.z - c.z;
    const l = Math.hypot(dx, dz);
    if (l < 1e-6) continue;
    a.x += dx;
    a.z += dz;
    const forza = impulso(a, c.ox, c.oz, dx / l, dz / l);
    if (forza > forte) {
      forte = forza;
      a.urtoX = c.x + (dx / l) * -c.r;
      a.urtoZ = c.z + (dz / l) * -c.r;
    }
  }
  if (forte > a.urto) a.urto = forte;
  return forte;
}

/** Urto fra due auto. Con `soloPrima` muove solo la prima (l'altra è di un altro computer). */
export function urtaAuto(a, b, soloPrima = false) {
  if (Math.abs(a.x - b.x) > 6 || Math.abs(a.z - b.z) > 6) return 0;
  let forte = 0;
  const mie = cerchiAuto(a);
  const sue = cerchiAuto(b);
  for (const p of mie) {
    for (const q of sue) {
      const dx = p.x - q.x;
      const dz = p.z - q.z;
      const d = Math.hypot(dx, dz);
      const somma = p.r + q.r;
      if (d >= somma || d < 1e-6) continue;
      const nx = dx / d;
      const nz = dz / d;
      const spinta = somma - d;
      if (soloPrima) {
        a.x += nx * spinta * 0.6;
        a.z += nz * spinta * 0.6;
      } else {
        a.x += nx * spinta * 0.5;
        a.z += nz * spinta * 0.5;
        b.x -= nx * spinta * 0.5;
        b.z -= nz * spinta * 0.5;
      }
      const bvx = b.vx + b.w * q.oz;
      const bvz = b.vz - b.w * q.ox;
      const prima = { vx: a.vx, vz: a.vz, w: a.w };
      const forza = impulso(a, p.ox, p.oz, nx, nz, AUTO.massa, bvx, bvz);
      if (!soloPrima && forza > 0) {
        const dvx = a.vx - prima.vx;
        const dvz = a.vz - prima.vz;
        b.vx -= dvx;
        b.vz -= dvz;
        const k = q.oz * -nx - q.ox * -nz;
        b.w += (k * Math.hypot(dvx, dvz) * AUTO.massa) / AUTO.inerzia;
      }
      if (forza > forte) {
        forte = forza;
        a.urtoX = (p.x + q.x) / 2;
        a.urtoZ = (p.z + q.z) / 2;
      }
    }
  }
  if (forte > a.urto) a.urto = forte;
  if (!soloPrima && forte > b.urto) b.urto = forte;
  return forte;
}

/** Scia: dietro un'altra auto vicina e allineata la resistenza dell'aria cala fino al 40%. */
export function calcolaScia(a, altre) {
  const f = avanti(a);
  let migliore = 0;
  if (a.vx * f.x + a.vz * f.z < SCIA_DA) {
    a.scia *= 0.9;
    return a.scia;
  }
  for (const b of altre) {
    if (b === a) continue;
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const lungo = dx * f.x + dz * f.z;
    if (lungo < 3 || lungo > 28) continue;
    const lato = Math.abs(dx * f.z - dz * f.x);
    if (lato > 1.6) continue;
    const bf = avanti(b);
    if (bf.x * f.x + bf.z * f.z < 0.85) continue;
    migliore = Math.max(migliore, (1 - (lungo - 3) / 25) * (1 - lato / 1.6));
  }
  a.scia += (migliore - a.scia) * 0.1;
  return a.scia;
}

/** Avanza di `dt` in sottopassi fissi, con urti contro il mondo a ogni sottopasso. */
export function simula(a, c, dt, { collisioni = null, filtro = null } = {}) {
  const passi = Math.max(1, Math.round(dt * PASSI_PER_SECONDO));
  const piccolo = dt / passi;
  let forte = 0;
  a.urto = 0;
  const ariaVera = a.scia;
  for (let i = 0; i < passi; i++) {
    if (ariaVera > 0.01) {
      const modulo = Math.hypot(a.vx, a.vz);
      const recupero = AUTO.aria * ariaVera * 0.4 * modulo * piccolo / AUTO.massa;
      a.vx += a.vx * recupero;
      a.vz += a.vz * recupero;
    }
    passo(a, c, piccolo);
    if (collisioni) forte = Math.max(forte, urtaMondo(a, collisioni, filtro));
  }
  return forte;
}

export function riposiziona(a, x, z, yaw) {
  Object.assign(a, { x, z, yaw, vx: 0, vz: 0, w: 0, sterzo: 0, marcia: 1, cambio: 0, ax: 0, ay: 0, pattina: 0, sbanda: 0, rpm: AUTO.giriMinimo });
}

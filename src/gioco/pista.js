const PASSO = 1;
const MEZZA_MINIMA = 3.1;
const MARGINE_CORDOLO = 0.2;
const DISTANZA_BARRIERA = 0.35;
const LIBERO_OLTRE_STRADA = 4.5;
const STACCO_DAI_MURI = 0.5;
const SPALLA_APERTA = 1.4;
const LATO_MINIMO = 1.6;
const FINESTRA_MINIMO = 5;
const FINESTRA_MEDIA = 5;
const LIBERO_CENTRATURA = 9;
const SOGLIA_CENTRATURA = 3.4;
const SPOSTA_MASSIMO = 2.5;
const STROZZATURA = 5.6;
const STROZZATURA_LATO = 1.25;
const FINESTRA_RICERCA = 60;
const ADERENZA_IA = 1.18;
const GRAVITA = 9.81;
const FRENATA_IA = 8.5;
const VELOCITA_MASSIMA_IA = 74;
const VIA_INDIETRO_GRIGLIA = 9;
const GRIGLIA_FILA = 8;
const LATO_GRIGLIA_CELLA = 20;

/** Circuiti sulle vie vere di Cerano: tappe nel sistema del gioco (metri, x est, z sud), la prima è il traguardo. */
export const CIRCUITI = Object.freeze([
  Object.freeze({
    id: 'anello',
    nome: 'Anello della Circonvallazione',
    sottotitolo: 'Via Circonvallazione · Via Vignone · Piazza San Rocco',
    giri: 3,
    morbidezza: 11,
    tappe: [[-120, 280], [-259, 281], [-367, 144], [-324, -152], [-172, -195], [-86, -242], [-14, -268], [88, -101], [127, 36], [210, 180], [236, 289], [138, 292], [8, 278]],
  }),
  Object.freeze({
    id: 'sanrocco',
    nome: 'Circuito di San Rocco',
    sottotitolo: 'Via Carducci · Via Ticino · Via Vallazza · Via Novara',
    giri: 4,
    morbidezza: 11,
    tappe: [[150, -312], [370, -329], [373, -420], [150, -416], [-65, -413], [-20, -350], [3, -291]],
  }),
  Object.freeze({
    id: 'triangolo',
    nome: 'Triangolo delle Provinciali',
    sottotitolo: 'Via Milano · Strada Provinciale · Via Novara',
    giri: 2,
    morbidezza: 12,
    tappe: [[30, -700], [150, -920], [367, -1367], [-100, -1460], [-600, -1487], [-642, -1425], [-300, -850], [-75, -458]],
  }),
]);

const avvolgi = (i, n) => ((i % n) + n) % n;

function senzaRitorni(punti) {
  let cambiato = true;
  let p = punti.filter((q, i) => i === 0 || Math.hypot(q.x - punti[i - 1].x, q.z - punti[i - 1].z) > 0.05);
  while (cambiato && p.length > 3) {
    cambiato = false;
    const fuori = [];
    for (let i = 0; i < p.length; i++) {
      const a = p[avvolgi(i - 1, p.length)];
      const b = p[i];
      const c = p[avvolgi(i + 1, p.length)];
      const ux = b.x - a.x;
      const uz = b.z - a.z;
      const vx = c.x - b.x;
      const vz = c.z - b.z;
      const lu = Math.hypot(ux, uz);
      const lv = Math.hypot(vx, vz);
      if (lu > 1e-6 && lv > 1e-6 && (ux * vx + uz * vz) / (lu * lv) < -0.7) {
        cambiato = true;
        continue;
      }
      fuori.push(b);
    }
    p = fuori.filter((q, i) => i === 0 || Math.hypot(q.x - fuori[i - 1].x, q.z - fuori[i - 1].z) > 0.05);
  }
  return p;
}

function ricampionaChiuso(punti, passo) {
  const n = punti.length;
  const lunghezze = [];
  let totale = 0;
  for (let i = 0; i < n; i++) {
    const a = punti[i];
    const b = punti[(i + 1) % n];
    const l = Math.hypot(b.x - a.x, b.z - a.z);
    lunghezze.push(l);
    totale += l;
  }
  const quanti = Math.max(8, Math.round(totale / passo));
  const vero = totale / quanti;
  const fuori = [];
  let i = 0;
  let base = 0;
  for (let k = 0; k < quanti; k++) {
    const s = k * vero;
    while (base + lunghezze[i] < s && i < n - 1) {
      base += lunghezze[i];
      i += 1;
    }
    const t = lunghezze[i] > 1e-9 ? (s - base) / lunghezze[i] : 0;
    const a = punti[i];
    const b = punti[(i + 1) % n];
    fuori.push({ x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t });
  }
  return fuori;
}

function media(punti, raggio) {
  const n = punti.length;
  const fuori = new Array(n);
  for (let i = 0; i < n; i++) {
    let sx = 0;
    let sz = 0;
    let peso = 0;
    for (let k = -raggio; k <= raggio; k++) {
      const p = punti[avvolgi(i + k, n)];
      const w = raggio + 1 - Math.abs(k);
      sx += p.x * w;
      sz += p.z * w;
      peso += w;
    }
    fuori[i] = { x: sx / peso, z: sz / peso };
  }
  return fuori;
}

function centraFraIMuri(citta, punti) {
  const n = punti.length;
  const muro = v => v.etichetta === 'muro' || v.etichetta === 'sponda';
  const spinte = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const a = punti[avvolgi(i - 1, n)];
    const b = punti[avvolgi(i + 1, n)];
    const l = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    const nx = (b.z - a.z) / l;
    const nz = -(b.x - a.x) / l;
    const sx = citta.collisioni.raggio(punti[i].x, punti[i].z, nx, nz, LIBERO_CENTRATURA, muro).distanza;
    const dx = citta.collisioni.raggio(punti[i].x, punti[i].z, -nx, -nz, LIBERO_CENTRATURA, muro).distanza;
    if (Math.min(sx, dx) < SOGLIA_CENTRATURA) spinte[i] = Math.max(-SPOSTA_MASSIMO, Math.min(SPOSTA_MASSIMO, (sx - dx) / 2));
  }
  return punti.map((p, i) => {
    let somma = 0;
    let peso = 0;
    for (let k = -14; k <= 14; k++) {
      const v = spinte[avvolgi(i + k, n)];
      const w = 15 - Math.abs(k);
      somma += v * w;
      peso += w;
    }
    const spinta = somma / peso;
    const a = punti[avvolgi(i - 1, n)];
    const b = punti[avvolgi(i + 1, n)];
    const l = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    return { x: p.x + ((b.z - a.z) / l) * spinta, z: p.z - ((b.x - a.x) / l) * spinta };
  });
}

function tracciato(citta, tappe) {
  const grafo = citta.grafo;
  const ancore = tappe.map(([x, z]) => {
    let migliore = null;
    for (const n of grafo.nodi.values()) {
      const d = Math.hypot(n.x - x, n.z - z);
      if (d < 18 && n.archi.length >= 3 && (!migliore || d < migliore.d)) migliore = { d, n };
    }
    return migliore ? { x: migliore.n.x, z: migliore.n.z, nodo: true } : { x, z, nodo: false };
  });
  const punti = [];
  for (let i = 0; i < ancore.length; i++) {
    const tratto = grafo.percorso(ancore[i], ancore[(i + 1) % ancore.length]);
    if (!tratto) throw new Error(`circuito: nessuna strada fra la tappa ${i} e la ${(i + 1) % ancore.length}`);
    for (const p of tratto) punti.push(p);
  }
  return senzaRitorni(punti);
}

function chiaveCella(x, z) {
  return Math.floor(x / LATO_GRIGLIA_CELLA) * 100003 + Math.floor(z / LATO_GRIGLIA_CELLA);
}

/**
 * Costruisce la pista chiusa: asse ricampionato ogni metro e ammorbidito, larghezza dalla strada vera,
 * barriere sui due lati (saltate dove c'è già un edificio a fare da muro), griglia di partenza dietro al
 * traguardo e profilo di velocità per i piloti del computer. È puro calcolo: gira anche in Node.
 */
export function costruisciPista(citta, circuito) {
  const grezzo = tracciato(citta, circuito.tappe);
  let punti = ricampionaChiuso(grezzo, PASSO);
  for (let k = 0; k < 2; k++) punti = ricampionaChiuso(media(punti, circuito.morbidezza), PASSO);
  for (let k = 0; k < 2; k++) punti = ricampionaChiuso(media(centraFraIMuri(citta, punti), 3), PASSO);
  const traguardo = circuito.tappe[0];
  let inizio = 0;
  for (let i = 1; i < punti.length; i++) {
    if (Math.hypot(punti[i].x - traguardo[0], punti[i].z - traguardo[1]) < Math.hypot(punti[inizio].x - traguardo[0], punti[inizio].z - traguardo[1])) inizio = i;
  }
  punti = punti.slice(inizio).concat(punti.slice(0, inizio));
  const n = punti.length;
  const x = new Float64Array(n);
  const z = new Float64Array(n);
  const tx = new Float64Array(n);
  const tz = new Float64Array(n);
  const curva = new Float64Array(n);
  const mezza = new Float64Array(n);
  const velocita = new Float64Array(n);
  punti.forEach((p, i) => {
    x[i] = p.x;
    z[i] = p.z;
  });
  let lunghezza = 0;
  for (let i = 0; i < n; i++) lunghezza += Math.hypot(x[avvolgi(i + 1, n)] - x[i], z[avvolgi(i + 1, n)] - z[i]);
  for (let i = 0; i < n; i++) {
    const a = avvolgi(i - 1, n);
    const b = avvolgi(i + 1, n);
    const dx = x[b] - x[a];
    const dz = z[b] - z[a];
    const l = Math.hypot(dx, dz) || 1;
    tx[i] = dx / l;
    tz[i] = dz / l;
  }
  const passoAngolo = 4;
  for (let i = 0; i < n; i++) {
    const a = avvolgi(i - passoAngolo, n);
    const b = avvolgi(i + passoAngolo, n);
    const angoloA = Math.atan2(tx[a], tz[a]);
    const angoloB = Math.atan2(tx[b], tz[b]);
    let d = angoloB - angoloA;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    curva[i] = d / (2 * passoAngolo * PASSO);
  }
  const sinistra = new Float64Array(n);
  const destra = new Float64Array(n);
  const ostacolo = v => v.etichetta !== 'palo' && v.etichetta !== 'albero' && v.etichetta !== 'auto' && v.etichetta !== 'barriera' && v.etichetta !== 'basso';
  const grezze = [new Float64Array(n), new Float64Array(n)];
  const carreggiata = new Float64Array(n);
  const strozzature = [];
  for (let i = 0; i < n; i++) {
    const v = citta.grafo.piuVicino(x[i], z[i], 30);
    const largo = v ? citta.dati.strade[v.seg.strada].l : 6;
    const base = Math.max(MEZZA_MINIMA, largo / 2 + MARGINE_CORDOLO);
    carreggiata[i] = largo / 2;
    const liberi = [1, -1].map((lato, k) => {
      const tiro = citta.collisioni.raggio(x[i], z[i], lato * tz[i], -lato * tx[i], base + LIBERO_OLTRE_STRADA, ostacolo);
      grezze[k][i] = tiro.colpito
        ? Math.min(base + LIBERO_OLTRE_STRADA, Math.max(LATO_MINIMO, tiro.distanza - STACCO_DAI_MURI))
        : base + SPALLA_APERTA;
      return tiro.colpito ? tiro.distanza : Infinity;
    });
    const stretta = liberi[0] + liberi[1] < STROZZATURA || Math.min(...liberi) < STROZZATURA_LATO;
    if (stretta && (!strozzature.length || i * PASSO - strozzature[strozzature.length - 1] > 5)) strozzature.push(i * PASSO);
  }
  const minimi = grezze.map(g => Float64Array.from(g, (_, i) => {
    let m = Infinity;
    for (let k = -FINESTRA_MINIMO; k <= FINESTRA_MINIMO; k++) m = Math.min(m, g[avvolgi(i + k, n)]);
    return m;
  }));
  for (let i = 0; i < n; i++) {
    let a = 0;
    let b = 0;
    for (let k = -FINESTRA_MEDIA; k <= FINESTRA_MEDIA; k++) {
      a += minimi[0][avvolgi(i + k, n)];
      b += minimi[1][avvolgi(i + k, n)];
    }
    sinistra[i] = a / (2 * FINESTRA_MEDIA + 1);
    destra[i] = b / (2 * FINESTRA_MEDIA + 1);
    mezza[i] = Math.min(sinistra[i], destra[i]);
  }

  const celle = new Map();
  for (let i = 0; i < n; i++) {
    const k = chiaveCella(x[i], z[i]);
    if (!celle.has(k)) celle.set(k, []);
    celle.get(k).push(i);
  }
  const nelCorridoio = (px, pz, margine = 0) => {
    const ci = Math.floor(px / LATO_GRIGLIA_CELLA);
    const cj = Math.floor(pz / LATO_GRIGLIA_CELLA);
    for (let a = ci - 1; a <= ci + 1; a++) {
      for (let b = cj - 1; b <= cj + 1; b++) {
        for (const i of celle.get(a * 100003 + b) ?? []) {
          const dx = px - x[i];
          const dz = pz - z[i];
          if (Math.abs(dx * tx[i] + dz * tz[i]) > 0.75) continue;
          const lat = dx * tz[i] - dz * tx[i];
          if (lat < sinistra[i] + margine && lat > -destra[i] - margine) return true;
        }
      }
    }
    return false;
  };

  const barriere = [];
  for (const lato of [1, -1]) {
    let corrente = null;
    const larghezze = lato > 0 ? sinistra : destra;
    for (let i = 0; i <= n; i++) {
      const j = i % n;
      const offset = larghezze[j] + DISTANZA_BARRIERA;
      const px = x[j] + lato * tz[j] * offset;
      const pz = z[j] - lato * tx[j] * offset;
      const libero = citta.edificioIn(px, pz) === null && !nelCorridoio(px, pz, DISTANZA_BARRIERA * 0.5);
      if (libero) {
        if (!corrente) {
          corrente = { lato, punti: [] };
          barriere.push(corrente);
        }
        const ultimo = corrente.punti[corrente.punti.length - 1];
        if (!ultimo || Math.hypot(ultimo[0] - px, ultimo[1] - pz) > 0.9 || i === n) corrente.punti.push([px, pz]);
      } else corrente = null;
    }
  }
  const pezzi = barriere.filter(b => b.punti.length >= 2);

  for (let i = 0; i < n; i++) velocita[i] = Math.min(VELOCITA_MASSIMA_IA, Math.sqrt((ADERENZA_IA * GRAVITA) / Math.max(1e-4, Math.abs(curva[i]))));
  for (let giro = 0; giro < 2; giro++) {
    for (let k = n - 1; k >= 0; k--) {
      const i = k;
      const dopo = velocita[avvolgi(i + 1, n)];
      velocita[i] = Math.min(velocita[i], Math.sqrt(dopo * dopo + 2 * FRENATA_IA * PASSO));
    }
  }

  const griglia = [];
  for (let posto = 0; posto < 12; posto++) {
    const s = -(VIA_INDIETRO_GRIGLIA + posto * (GRIGLIA_FILA / 2));
    const i = avvolgi(Math.round(s / PASSO), n);
    const lato = posto % 2 === 0 ? 1 : -1;
    const largo = Math.min(Math.min(lato > 0 ? sinistra[i] : destra[i], Math.max(carreggiata[i], 2.6)) * 0.55, 2.3);
    griglia.push({ x: x[i] + lato * tz[i] * largo, z: z[i] - lato * tx[i] * largo, yaw: Math.atan2(tx[i], tz[i]), s: avvolgi(i, n) * (lunghezza / n) });
  }

  const passoVero = lunghezza / n;
  function vicino(px, pz, sStima = null) {
    let migliore = -1;
    let dMin = Infinity;
    if (sStima !== null) {
      const c = Math.round(sStima / passoVero);
      for (let k = -FINESTRA_RICERCA; k <= FINESTRA_RICERCA; k++) {
        const i = avvolgi(c + k, n);
        const d = (x[i] - px) ** 2 + (z[i] - pz) ** 2;
        if (d < dMin) {
          dMin = d;
          migliore = i;
        }
      }
    }
    if (migliore < 0 || dMin > 30 * 30) {
      for (let i = 0; i < n; i++) {
        const d = (x[i] - px) ** 2 + (z[i] - pz) ** 2;
        if (d < dMin) {
          dMin = d;
          migliore = i;
        }
      }
    }
    const i = migliore;
    const dx = px - x[i];
    const dz = pz - z[i];
    const lungo = dx * tx[i] + dz * tz[i];
    const laterale = dx * tz[i] - dz * tx[i];
    let s = i * passoVero + lungo;
    if (s < 0) s += lunghezza;
    if (s >= lunghezza) s -= lunghezza;
    return { i, s, laterale, distanza: Math.sqrt(dMin) };
  }

  function punto(s) {
    const f = (((s % lunghezza) + lunghezza) % lunghezza) / passoVero;
    const a = Math.floor(f) % n;
    const b = (a + 1) % n;
    const t = f - Math.floor(f);
    return {
      x: x[a] + (x[b] - x[a]) * t,
      z: z[a] + (z[b] - z[a]) * t,
      tx: tx[a] + (tx[b] - tx[a]) * t,
      tz: tz[a] + (tz[b] - tz[a]) * t,
      curva: curva[a] + (curva[b] - curva[a]) * t,
      mezza: mezza[a] + (mezza[b] - mezza[a]) * t,
      sinistra: sinistra[a] + (sinistra[b] - sinistra[a]) * t,
      destra: destra[a] + (destra[b] - destra[a]) * t,
      velocita: velocita[a] + (velocita[b] - velocita[a]) * t,
    };
  }


  return {
    id: circuito.id,
    nome: circuito.nome,
    sottotitolo: circuito.sottotitolo,
    giri: circuito.giri,
    n,
    passo: passoVero,
    lunghezza,
    x,
    z,
    tx,
    tz,
    curva,
    mezza,
    sinistra,
    destra,
    velocita,
    barriere: pezzi,
    strozzature,
    griglia,
    vicino,
    punto,
    nelCorridoio,
  };
}

/** Avanzamento di gara da posizione sull'asse: gestisce il giro (passaggio sul traguardo) e i settori. */
export function creaContagiri(pista) {
  const terzo = pista.lunghezza / 3;
  return {
    s: 0,
    giro: 0,
    settore: 0,
    contrario: 0,
    aggiorna(px, pz, dt, avanti = 0) {
      const prima = this.s;
      const v = pista.vicino(px, pz, this.s);
      let ds = v.s - prima;
      if (ds < -pista.lunghezza / 2) ds += pista.lunghezza;
      if (ds > pista.lunghezza / 2) ds -= pista.lunghezza;
      this.s = v.s;
      this.contrario = avanti < -2 ? this.contrario + dt : Math.max(0, this.contrario - dt * 2);
      const settore = Math.floor(v.s / terzo);
      let giroFatto = false;
      if (ds > 0 && prima > pista.lunghezza - 40 && v.s < 40) {
        if (this.settore === 2) {
          this.giro += 1;
          giroFatto = true;
        }
        this.settore = 0;
      } else if (ds < 0 && prima < 40 && v.s > pista.lunghezza - 40) {
        if (this.giro > 0 && this.settore === 0) {
          this.giro -= 1;
          this.settore = 2;
        }
      } else if (settore === this.settore + 1) this.settore = settore;
      return { ...v, giroFatto, ds };
    },
    get totale() {
      return this.giro * pista.lunghezza + this.s;
    },
  };
}

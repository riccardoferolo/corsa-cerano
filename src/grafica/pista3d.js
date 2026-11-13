import * as THREE from 'three';

const PROFILO = Object.freeze([[-0.3, 0], [-0.3, 0.08], [-0.17, 0.27], [-0.08, 0.82], [0.08, 0.82], [0.17, 0.27], [0.3, 0.08], [0.3, 0]]);
const BLOCCO = 2;
const PASSO_MASSIMO = 6;
const TOLLERANZA_ANGOLO = 0.012;
const CURVA_CORDOLO = 1 / 70;
const LARGO_CORDOLO = 1.1;
const PANNELLO_LUNGO = 7;
const PANNELLO_ALTO = 0.95;
const OGNI_PANNELLO = 42;
const ALTEZZA_PORTALE = 6.2;
const MARCHI = Object.freeze(['TICINO RACING', 'ROGGIA MOTOR OIL', 'GOMME LAMPO', 'RISO DORATO', 'CAFFÈ DEL TRAMONTO', 'BORGO SPORT', 'FRENI SAETTA', 'CERANO GP']);

function tela(l, a, disegna) {
  const c = document.createElement('canvas');
  c.width = l;
  c.height = a;
  disegna(c.getContext('2d'), l, a);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function semplifica(punti) {
  if (punti.length < 3) return punti;
  const fuori = [punti[0]];
  let ultimo = punti[0];
  for (let i = 1; i < punti.length - 1; i++) {
    const p = punti[i];
    const q = punti[i + 1];
    const a1 = Math.atan2(p[0] - ultimo[0], p[1] - ultimo[1]);
    const a2 = Math.atan2(q[0] - p[0], q[1] - p[1]);
    let d = a2 - a1;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    if (Math.abs(d) > TOLLERANZA_ANGOLO || Math.hypot(p[0] - ultimo[0], p[1] - ultimo[1]) > PASSO_MASSIMO) {
      fuori.push(p);
      ultimo = p;
    }
  }
  fuori.push(punti[punti.length - 1]);
  return fuori;
}

function geometriaBarriere(barriere) {
  const pos = [];
  const nor = [];
  const uv = [];
  const ind = [];
  for (const b of barriere) {
    const punti = semplifica(b.punti);
    if (punti.length < 2) continue;
    let lungo = 0;
    const base = pos.length / 3;
    for (let i = 0; i < punti.length; i++) {
      const a = punti[Math.max(0, i - 1)];
      const c = punti[Math.min(punti.length - 1, i + 1)];
      const dx = c[0] - a[0];
      const dz = c[1] - a[1];
      const l = Math.hypot(dx, dz) || 1;
      const nx = (b.lato * dz) / l;
      const nz = (-b.lato * dx) / l;
      if (i > 0) lungo += Math.hypot(punti[i][0] - punti[i - 1][0], punti[i][1] - punti[i - 1][1]);
      PROFILO.forEach(([u, y], k) => {
        pos.push(punti[i][0] + nx * u, y, punti[i][1] + nz * u);
        const prima = PROFILO[Math.max(0, k - 1)];
        const dopo = PROFILO[Math.min(PROFILO.length - 1, k + 1)];
        const du = dopo[0] - prima[0];
        const dy = dopo[1] - prima[1];
        const ln = Math.hypot(du, dy) || 1;
        const pu = dy / ln;
        const py = -du / ln;
        nor.push(nx * -pu, -py, nz * -pu);
        uv.push(lungo / (BLOCCO * 2), y / 0.82);
      });
    }
    const k = PROFILO.length;
    for (let i = 0; i < punti.length - 1; i++) {
      for (let j = 0; j < k - 1; j++) {
        const a = base + i * k + j;
        const b2 = a + k;
        ind.push(a, b2, a + 1, a + 1, b2, b2 + 1);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(ind);
  g.computeBoundingSphere();
  return g;
}

function materialeBarriera() {
  const mappa = tela(256, 64, (c, l, a) => {
    c.fillStyle = '#b8161c';
    c.fillRect(0, 0, l / 2, a);
    c.fillStyle = '#e9e7e1';
    c.fillRect(l / 2, 0, l / 2, a);
    for (let i = 0; i < 900; i++) {
      c.fillStyle = `rgba(${Math.random() < 0.5 ? '0,0,0' : '255,255,255'},${Math.random() * 0.05})`;
      c.fillRect(Math.random() * l, Math.random() * a, 2 + Math.random() * 6, 1 + Math.random() * 3);
    }
    const sporco = c.createLinearGradient(0, a, 0, a * 0.55);
    sporco.addColorStop(0, 'rgba(40,32,24,0.55)');
    sporco.addColorStop(1, 'rgba(40,32,24,0)');
    c.fillStyle = sporco;
    c.fillRect(0, 0, l, a);
    c.fillStyle = 'rgba(0,0,0,0.35)';
    c.fillRect(0, 0, 2, a);
    c.fillRect(l / 2, 0, 2, a);
  });
  mappa.wrapS = THREE.RepeatWrapping;
  mappa.flipY = false;
  return new THREE.MeshStandardMaterial({ map: mappa, roughness: 0.82, metalness: 0, side: THREE.DoubleSide });
}

function striscia(pista, s0, s1, da, a, quota = 0.025) {
  const pos = [];
  const uv = [];
  const ind = [];
  const passo = 0.5;
  const n = Math.max(1, Math.round((s1 - s0) / passo));
  for (let i = 0; i <= n; i++) {
    const s = s0 + ((s1 - s0) * i) / n;
    const p = pista.punto(s);
    const l = Math.hypot(p.tx, p.tz) || 1;
    const nx = p.tz / l;
    const nz = -p.tx / l;
    const sx = typeof da === 'function' ? da(p) : da;
    const dx = typeof a === 'function' ? a(p) : a;
    pos.push(p.x + nx * sx, quota, p.z + nz * sx, p.x + nx * dx, quota, p.z + nz * dx);
    uv.push((s - s0) / 1, 0, (s - s0) / 1, 1);
    if (i < n) {
      const b = i * 2;
      ind.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(ind);
  g.computeVertexNormals();
  return g;
}

function decalco(mappa, extra = {}) {
  return new THREE.MeshStandardMaterial({ map: mappa, transparent: true, roughness: 0.75, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3, depthWrite: false, ...extra });
}

function cordoli(pista, gruppo, materiale) {
  const geos = [];
  let inizio = -1;
  let verso = 0;
  const chiudi = fine => {
    if (inizio >= 0 && (fine - inizio) * pista.passo > 6) {
      const lato = verso;
      geos.push(striscia(pista, inizio * pista.passo, fine * pista.passo, p => lato * ((lato > 0 ? p.sinistra : p.destra) - LARGO_CORDOLO), p => lato * (lato > 0 ? p.sinistra : p.destra), 0.03));
    }
    inizio = -1;
  };
  for (let i = 0; i < pista.n; i++) {
    const c = pista.curva[i];
    const lato = Math.sign(c);
    if (Math.abs(c) > CURVA_CORDOLO) {
      if (inizio < 0) {
        inizio = i;
        verso = lato;
      } else if (lato !== verso) {
        chiudi(i);
        inizio = i;
        verso = lato;
      }
    } else chiudi(i);
  }
  chiudi(pista.n - 1);
  for (const g of geos) gruppo.add(new THREE.Mesh(g, materiale));
}

function pannelli(pista, gruppo, materiali) {
  let k = 0;
  for (const b of pista.barriere) {
    let lungo = 0;
    for (let i = 1; i < b.punti.length; i++) {
      const [ax, az] = b.punti[i - 1];
      const [bx, bz] = b.punti[i];
      lungo += Math.hypot(bx - ax, bz - az);
      if (lungo < OGNI_PANNELLO || i + PANNELLO_LUNGO >= b.punti.length) continue;
      const fine = b.punti[Math.min(b.punti.length - 1, i + PANNELLO_LUNGO)];
      const dx = fine[0] - ax;
      const dz = fine[1] - az;
      const l = Math.hypot(dx, dz);
      if (l < PANNELLO_LUNGO * 0.85) continue;
      lungo = 0;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(l, PANNELLO_ALTO), materiali[k++ % materiali.length]);
      const nx = (b.lato * dz) / l;
      const nz = (-b.lato * dx) / l;
      m.position.set((ax + fine[0]) / 2 - nx * 0.05, 0.82 + PANNELLO_ALTO / 2 + 0.05, (az + fine[1]) / 2 - nz * 0.05);
      m.rotation.y = Math.atan2(-nx, -nz);
      gruppo.add(m);
    }
  }
}

function materialiPannelli() {
  const sfondi = ['#0b1d3a', '#f4f1e8', '#111111', '#b8161c', '#0f5132', '#f2b300', '#1d1d24', '#ffffff'];
  const testi = ['#ffffff', '#b8161c', '#f2b300', '#ffffff', '#ffffff', '#111111', '#ff5e0e', '#0b1d3a'];
  return MARCHI.map((marchio, i) => new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    roughness: 0.6,
    map: tela(1024, 140, (c, l, a) => {
      c.fillStyle = sfondi[i];
      c.fillRect(0, 0, l, a);
      c.fillStyle = testi[i];
      c.font = `italic 900 ${a * 0.62}px "Arial Black", Arial, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(marchio, l / 2, a * 0.54);
      c.fillRect(0, 0, l, a * 0.05);
      c.fillRect(0, a * 0.95, l, a * 0.05);
    }),
  }));
}

/**
 * Disegna la pista: barriere in cemento a blocchi bianchi e rossi, cordoli all'interno delle curve, traguardo a
 * scacchi, piazzole della griglia, cartelloni e il portale di partenza con i cinque semafori.
 */
export function costruisciPista3d(scena, pista) {
  const gruppo = new THREE.Group();
  gruppo.name = `pista-${pista.id}`;
  const barriere = new THREE.Mesh(geometriaBarriere(pista.barriere), materialeBarriera());
  barriere.receiveShadow = true;
  barriere.castShadow = true;
  gruppo.add(barriere);

  const cordolo = decalco(tela(128, 32, (c, l, a) => {
    c.fillStyle = '#c4161c';
    c.fillRect(0, 0, l / 2, a);
    c.fillStyle = '#f3f1ea';
    c.fillRect(l / 2, 0, l / 2, a);
  }), { transparent: false, depthWrite: true });
  cordolo.map.wrapS = THREE.RepeatWrapping;
  cordolo.map.repeat.set(1 / 2, 1);
  cordoli(pista, gruppo, cordolo);

  const scacchi = decalco(tela(256, 64, (c, l, a) => {
    const lato = a / 4;
    for (let i = 0; i < l / lato; i++) {
      for (let j = 0; j < 4; j++) {
        c.fillStyle = (i + j) % 2 ? '#111' : '#f5f5f5';
        c.fillRect(i * lato, j * lato, lato, lato);
      }
    }
  }));
  const traguardo = new THREE.Mesh(striscia(pista, -0.6, 0.6, p => p.sinistra, p => -p.destra, 0.028), scacchi);
  traguardo.geometry.attributes.uv.array.forEach((v, i, arr) => {
    if (i % 2 === 1) arr[i] = v * 6;
  });
  gruppo.add(traguardo);

  const bianco = new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.7, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
  for (const g of pista.griglia.slice(0, 10)) {
    const v = pista.vicino(g.x, g.z);
    for (const [s0, s1, a, b] of [[g.s + 2.1, g.s + 2.4, v.laterale - 1.2, v.laterale + 1.2], [g.s - 0.6, g.s + 2.4, v.laterale - 1.2, v.laterale - 1.05], [g.s - 0.6, g.s + 2.4, v.laterale + 1.05, v.laterale + 1.2]]) {
      gruppo.add(new THREE.Mesh(striscia(pista, s0, s1, a, b, 0.026), bianco));
    }
  }

  pannelli(pista, gruppo, materialiPannelli());

  const p0 = pista.punto(0);
  const yaw = Math.atan2(p0.tx, p0.tz);
  const portale = new THREE.Group();
  portale.position.set(p0.x, 0, p0.z);
  portale.rotation.y = yaw;
  const metallo = new THREE.MeshStandardMaterial({ color: 0x2b2f36, metalness: 0.8, roughness: 0.45 });
  const sx = p0.sinistra + 0.9;
  const dx = p0.destra + 0.9;
  for (const x of [sx, -dx]) {
    const palo = new THREE.Mesh(new THREE.BoxGeometry(0.45, ALTEZZA_PORTALE, 0.45), metallo);
    palo.position.set(x, ALTEZZA_PORTALE / 2, 0);
    palo.castShadow = true;
    portale.add(palo);
  }
  const larghezza = sx + dx;
  const trave = new THREE.Mesh(new THREE.BoxGeometry(larghezza + 0.45, 1.1, 0.5), metallo);
  trave.position.set((sx - dx) / 2, ALTEZZA_PORTALE - 0.3, 0);
  trave.castShadow = true;
  portale.add(trave);
  const insegna = new THREE.Mesh(new THREE.PlaneGeometry(larghezza * 0.92, 0.95), new THREE.MeshStandardMaterial({
    map: tela(1024, 96, (c, l, a) => {
      c.fillStyle = '#0d0f14';
      c.fillRect(0, 0, l, a);
      c.fillStyle = '#ffffff';
      c.font = `italic 900 ${a * 0.6}px "Arial Black", Arial, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('GRAN PREMIO DI CERANO', l / 2, a * 0.53);
      c.fillStyle = '#ff2d2d';
      c.fillRect(0, a - 6, l, 6);
    }),
    roughness: 0.5,
    side: THREE.DoubleSide,
  }));
  insegna.position.set((sx - dx) / 2, ALTEZZA_PORTALE - 0.3, -0.27);
  insegna.rotation.y = Math.PI;
  portale.add(insegna);
  const spente = new THREE.MeshStandardMaterial({ color: 0x1a0505, emissive: 0x000000, roughness: 0.3 });
  const accese = new THREE.MeshStandardMaterial({ color: 0x400000, emissive: 0xff1205, emissiveIntensity: 6, roughness: 0.3 });
  const verdi = new THREE.MeshStandardMaterial({ color: 0x003300, emissive: 0x19ff3c, emissiveIntensity: 5, roughness: 0.3 });
  const semafori = [];
  for (let i = 0; i < 5; i++) {
    const luce = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 10), spente);
    luce.position.set((sx - dx) / 2 + (i - 2) * 0.62, ALTEZZA_PORTALE - 1.15, -0.1);
    portale.add(luce);
    semafori.push(luce);
  }
  gruppo.add(portale);
  scena.add(gruppo);
  gruppo.visible = false;

  return {
    gruppo,
    mostra(si) {
      gruppo.visible = si;
    },
    semafori(accesi, via = false) {
      semafori.forEach((l, i) => {
        l.material = via ? verdi : i < accesi ? accese : spente;
      });
    },
  };
}

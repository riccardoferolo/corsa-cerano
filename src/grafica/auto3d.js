import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { AUTO } from '../gioco/fisica.js';

export const LIVREE = Object.freeze([
  Object.freeze({ nome: 'Rosso Cerano', primario: 0xa80f1a, secondario: 0x121212 }),
  Object.freeze({ nome: 'Giallo Ticino', primario: 0xf0b000, secondario: 0x141414 }),
  Object.freeze({ nome: 'Blu Notte', primario: 0x0d2257, secondario: 0xd8d8d8 }),
  Object.freeze({ nome: 'Verde Risaia', primario: 0x0b5e33, secondario: 0xeeeeea }),
  Object.freeze({ nome: 'Bianco Perla', primario: 0xe9e9e4, secondario: 0x1a1a1a }),
  Object.freeze({ nome: 'Grafite', primario: 0x272a2f, secondario: 0xb80d24 }),
  Object.freeze({ nome: 'Arancio Tramonto', primario: 0xff5e0e, secondario: 0x161616 }),
  Object.freeze({ nome: 'Azzurro Roggia', primario: 0x2386d0, secondario: 0xf4f4f4 }),
  Object.freeze({ nome: 'Viola Vigna', primario: 0x4d1677, secondario: 0xf2c21b }),
  Object.freeze({ nome: 'Nero Asfalto', primario: 0x0b0b0c, secondario: 0xff5200 }),
]);

const DISTANZA_RUOTE_PIENE = 9;
const DISTANZA_RUOTE_LEGGERE = 55;
const DISTANZA_OMBRA = 16;
const DISTANZA_LOD = 13;
const CAPIENZA_RUOTE = 4 * 14;
const INTERNO = /^(Interior|BodyWindshieldWipers|BodyHoodInterior|Engine|Axles)/;
const RUOTA = /^Wheel(Front|Rear)(L|R)$/;
const FRENO_RUOTA = /BrakePad$/;

function geometriaIn(mesh, inversa) {
  const g = mesh.geometry.clone();
  const m = new THREE.Matrix4().multiplyMatrices(inversa, mesh.matrixWorld);
  g.applyMatrix4(m);
  if (m.determinant() < 0) {
    const indice = g.index;
    if (indice) {
      for (let i = 0; i < indice.count; i += 3) {
        const a = indice.getX(i + 1);
        indice.setX(i + 1, indice.getX(i + 2));
        indice.setX(i + 2, a);
      }
    }
  }
  return g;
}

function unisci(geometrie) {
  const tenuti = ['position', 'normal', 'uv', 'uv1'];
  const pronte = geometrie.map(g => {
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (!g.attributes.uv1) g.setAttribute('uv1', g.attributes.uv.clone());
    for (const nome of Object.keys(g.attributes)) if (!tenuti.includes(nome)) g.deleteAttribute(nome);
    g.morphAttributes = {};
    return g;
  });
  const finali = pronte.every(g => g.index) ? pronte : pronte.map(g => (g.index ? g.toNonIndexed() : g));
  const unita = mergeGeometries(finali, false);
  unita.computeBoundingSphere();
  return unita;
}

function perMateriale(meshes, inversa) {
  const gruppi = new Map();
  for (const mesh of meshes) {
    const materiali = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    if (materiali.length !== 1) continue;
    const mat = materiali[0];
    if (!gruppi.has(mat)) gruppi.set(mat, []);
    gruppi.get(mat).push(geometriaIn(mesh, inversa));
  }
  return [...gruppi].map(([materiale, geometrie]) => ({ materiale, geometria: unisci(geometrie) }));
}

function vetro(ambiente, scuro) {
  return new THREE.MeshPhysicalMaterial({
    color: scuro ? 0x05070a : 0x0b0e12, metalness: 0, roughness: 0.04, transparent: true, opacity: scuro ? 0.82 : 0.42,
    envMap: ambiente, envMapIntensity: 1.6, side: THREE.DoubleSide, depthWrite: false, clearcoat: 1, clearcoatRoughness: 0.02,
  });
}

function vernice(base, colore, ambiente) {
  const m = new THREE.MeshPhysicalMaterial({
    color: colore, metalness: 0.25, roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.04,
    normalMap: base.normalMap ?? null, normalScale: new THREE.Vector2(0.05, 0.05), aoMap: base.aoMap ?? null, aoMapIntensity: 0.85,
    envMap: ambiente, envMapIntensity: 0.62,
  });
  if (m.normalMap) {
    m.normalMap = m.normalMap.clone();
    m.normalMap.wrapS = THREE.RepeatWrapping;
    m.normalMap.wrapT = THREE.RepeatWrapping;
    m.normalMap.repeat.set(30, 30);
    m.normalMap.needsUpdate = true;
  }
  return m;
}

function cerchioMedio(gira, ferme, cerchio, lucido) {
  const forma = gira.filter(p => /Rim/.test(p.materiale.name)).map(p => new THREE.Box3().setFromBufferAttribute(p.geometria.attributes.position));
  const fuori = forma.length ? Math.max(...forma.map(b => b.max.x)) : 0.12;
  const dentro = forma.length ? Math.min(...forma.map(b => b.min.x)) : -0.1;
  const raggio = forma.length ? Math.max(...forma.map(b => b.max.y)) * 0.97 : 0.3;
  const botte = new THREE.CylinderGeometry(raggio, raggio, fuori - dentro, 28, 1, true);
  botte.rotateZ(Math.PI / 2);
  botte.translate((fuori + dentro) / 2, 0, 0);
  const pezzi = [];
  for (let k = 0; k < 5; k++) {
    for (const d of [-0.11, 0.11]) {
      const razza = new THREE.BoxGeometry(0.035, raggio * 0.82, 0.04);
      razza.translate(0, raggio * 0.5, 0);
      razza.rotateX((k * 2 * Math.PI) / 5 + d);
      razza.translate(fuori - 0.035, 0, 0);
      pezzi.push(razza);
    }
  }
  const mozzo = new THREE.CylinderGeometry(raggio * 0.24, raggio * 0.26, 0.06, 14);
  mozzo.rotateZ(Math.PI / 2);
  mozzo.translate(fuori - 0.04, 0, 0);
  pezzi.push(mozzo);
  const stella = mergeGeometries(pezzi.map(g => g.toNonIndexed()), false);
  const tenute = gira.filter(p => !/Rim/.test(p.materiale.name));
  const pinza = ferme[0];
  const centro = new THREE.Box3().setFromBufferAttribute(pinza.geometria.attributes.position).getCenter(new THREE.Vector3());
  const blocco = new THREE.BoxGeometry(0.07, 0.2, 0.13);
  blocco.translate(centro.x, centro.y, centro.z);
  return {
    gira: [...tenute, { geometria: botte, materiale: cerchio }, { geometria: stella, materiale: lucido }],
    ferme: [{ geometria: blocco, materiale: pinza.materiale }],
  };
}

function ombraAterra() {
  const tela = document.createElement('canvas');
  tela.width = 128;
  tela.height = 128;
  const c = tela.getContext('2d');
  const g = c.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, 'rgba(0,0,0,0.85)');
  g.addColorStop(0.55, 'rgba(0,0,0,0.55)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g;
  c.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(tela);
  t.colorSpace = THREE.SRGBColorSpace;
  const geo = new THREE.PlaneGeometry(2.7, 5.2);
  geo.rotateX(-Math.PI / 2);
  return { geo, mat: new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0.75, polygonOffset: true, polygonOffsetFactor: -2 }) };
}

/**
 * Carica il modello dell'auto e restituisce la fabbrica delle auto in pista: carrozzeria unita per materiale
 * (pochi disegni per auto), ruote istanziate per tutte le auto insieme con due livelli di dettaglio, vernice
 * e luci dei freni per auto, riflessi dal cielo del tramonto (HDR) solo sulle auto.
 */
async function caricaLod(url) {
  try {
    const [testata, binario] = await Promise.all([fetch(`${url}.json`).then(r => (r.ok ? r.json() : null)), fetch(`${url}.bin`).then(r => (r.ok ? r.arrayBuffer() : null))]);
    if (!testata || !binario) return null;
    const vista = ([inizio, lunghezza], Tipo) => new Tipo(binario, inizio, lunghezza);
    return new Map(testata.pezzi.map(p => {
      if (p.tenuto) return [p.chiave, null];
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(vista(p.posizioni, Float32Array), 3));
      g.setAttribute('normal', new THREE.BufferAttribute(vista(p.normali, Float32Array), 3));
      if (p.indici) g.setIndex(new THREE.BufferAttribute(vista(p.indici, Uint32Array), 1));
      g.computeBoundingSphere();
      return [p.chiave, g];
    }));
  } catch {
    return null;
  }
}

export async function preparaAuto(renderer, scena, { modello = './modelli/concept.glb', cielo = './cielo/tramonto.hdr', semplice = './modelli/concept-lod', quota = () => 0 } = {}) {
  const [gltf, hdr, lod] = await Promise.all([new GLTFLoader().loadAsync(modello), new RGBELoader().loadAsync(cielo), semplice ? caricaLod(semplice) : null]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const ambiente = pmrem.fromEquirectangular(hdr).texture;
  hdr.dispose();
  pmrem.dispose();

  const radice = gltf.scene;
  radice.updateMatrixWorld(true);
  const identita = new THREE.Matrix4();
  const esterni = [];
  const interni = [];
  const ruote = [];
  radice.traverse(o => {
    if (RUOTA.test(o.name)) ruote.push(o);
  });
  const dentroRuota = o => {
    for (let p = o; p; p = p.parent) if (RUOTA.test(p.name)) return true;
    return false;
  };
  const dentroInterno = o => {
    for (let p = o; p; p = p.parent) if (INTERNO.test(p.name)) return true;
    return false;
  };
  radice.traverse(o => {
    if (!o.isMesh || dentroRuota(o)) return;
    (dentroInterno(o) ? interni : esterni).push(o);
  });

  const nomeMateriale = m => m.name || 'finiture';
  const pezziEsterni = perMateriale(esterni, identita);
  const pezziInterni = perMateriale(interni, identita);
  for (const p of [...pezziEsterni, ...pezziInterni]) {
    const m = p.materiale;
    if (m.isMeshStandardMaterial) {
      m.envMap = ambiente;
      m.envMapIntensity = 1;
    }
    p.chiave = nomeMateriale(m);
  }
  const condivisi = new Map();
  const materialeCondiviso = (chiave, crea) => {
    if (!condivisi.has(chiave)) condivisi.set(chiave, crea());
    return condivisi.get(chiave);
  };

  const anteriore = ruote.find(r => r.name === 'WheelFrontL');
  const inversaRuota = anteriore.matrixWorld.clone().invert();
  const partiRuota = [];
  const fissiRuota = [];
  anteriore.traverse(o => {
    if (!o.isMesh) return;
    (FRENO_RUOTA.test(o.name) ? fissiRuota : partiRuota).push(o);
  });
  const gira = perMateriale(partiRuota, inversaRuota);
  const ferme = perMateriale(fissiRuota, inversaRuota);
  const centroPinza = new THREE.Box3().setFromBufferAttribute(ferme[0].geometria.attributes.position).getCenter(new THREE.Vector3());
  const versoFuori = centroPinza.x < 0 ? 1 : -1;
  const sistema = new THREE.Matrix4().makeRotationY(versoFuori > 0 ? 0 : Math.PI);
  for (const p of [...gira, ...ferme]) {
    p.geometria.applyMatrix4(sistema);
    if (p.materiale.isMeshStandardMaterial) p.materiale.envMap = ambiente;
  }
  const assi = ruote.map(r => {
    const pos = new THREE.Vector3().setFromMatrixPosition(r.matrixWorld);
    return { nome: r.name, x: pos.x, y: pos.y, z: pos.z, davanti: /Front/.test(r.name), sinistra: /L$/.test(r.name) };
  });

  const gomma = gira.find(p => /Tiretread/.test(p.materiale.name))?.materiale ?? new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });
  const cerchio = gira.find(p => /Rim1/.test(p.materiale.name))?.materiale ?? new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 1, roughness: 0.3 });
  const lucido = gira.find(p => /Rim2/.test(p.materiale.name))?.materiale ?? cerchio;
  const raggio = AUTO.raggioRuota;
  const gommaLeggera = new THREE.CylinderGeometry(raggio, raggio, 0.27, 22, 1, false);
  gommaLeggera.rotateZ(Math.PI / 2);
  const cerchioLeggero = new THREE.CylinderGeometry(raggio * 0.72, raggio * 0.72, 0.02, 18);
  cerchioLeggero.rotateZ(Math.PI / 2);
  cerchioLeggero.translate(0.125, 0, 0);
  const medie = cerchioMedio(gira, ferme, cerchio, lucido);

  const istanziate = (pezzi, ombre) => pezzi.map(p => {
    const m = new THREE.InstancedMesh(p.geometria, p.materiale, CAPIENZA_RUOTE);
    m.count = 0;
    m.frustumCulled = false;
    m.castShadow = ombre;
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scena.add(m);
    return m;
  });
  const vicineGira = istanziate(gira, false);
  const vicineFerme = istanziate(ferme, false);
  const medieGira = istanziate(medie.gira, false);
  const medieFerme = istanziate(medie.ferme, false);
  const lontane = istanziate([{ geometria: gommaLeggera, materiale: gomma }, { geometria: cerchioLeggero, materiale: cerchio }], false);
  const ombra = ombraAterra();

  const auto = new Set();
  const m4 = new THREE.Matrix4();
  const mRuota = new THREE.Matrix4();
  const mGiro = new THREE.Matrix4();
  const mSterzo = new THREE.Matrix4();
  const mLato = new THREE.Matrix4().makeRotationY(Math.PI);
  const posizioneCamera = new THREE.Vector3();

  function crea(livrea, { pieno = false } = {}) {
    const gruppo = new THREE.Group();
    const cassa = new THREE.Group();
    gruppo.add(cassa);
    const corpo = new THREE.Group();
    corpo.position.z = -AUTO.baricentroModello;
    cassa.add(corpo);
    const p1 = vernice(pezziEsterni.find(p => /^Paint 1/.test(p.chiave))?.materiale ?? {}, livrea.primario, ambiente);
    const p2 = vernice(pezziEsterni.find(p => /^Paint 2/.test(p.chiave))?.materiale ?? {}, livrea.secondario, ambiente);
    p2.metalness = 0.3;
    p2.roughness = 0.38;
    const frenata = new THREE.MeshStandardMaterial({ color: 0x220000, emissive: 0xff1a10, emissiveIntensity: 0.6, roughness: 0.35 });
    const p1l = new THREE.MeshStandardMaterial({ color: livrea.primario, metalness: 0.3, roughness: 0.3, envMap: ambiente, envMapIntensity: 0.6 });
    const p2l = new THREE.MeshStandardMaterial({ color: livrea.secondario, metalness: 0.3, roughness: 0.38, envMap: ambiente, envMapIntensity: 0.6 });
    const alto = new THREE.Group();
    const basso = new THREE.Group();
    corpo.add(alto, basso);
    basso.visible = false;
    if (lod && !pieno) {
      for (const p of pezziEsterni) {
        const g = lod.get(p.chiave) ?? p.geometria;
        let materiale;
        if (/^Paint 1/.test(p.chiave)) materiale = p1l;
        else if (/^Paint 2/.test(p.chiave)) materiale = p2l;
        else if (/^Glass/.test(p.chiave)) materiale = materialeCondiviso('vetro-scuro', () => vetro(ambiente, true));
        else if (/^Brakelight/.test(p.chiave)) materiale = frenata;
        else if (lod.get(p.chiave)) materiale = materialeCondiviso(`lod-${p.chiave}`, () => new THREE.MeshStandardMaterial({ color: p.materiale.color, roughness: p.materiale.roughness ?? 0.5, metalness: p.materiale.metalness ?? 0, envMap: ambiente }));
        else materiale = p.materiale;
        const m = new THREE.Mesh(g, materiale);
        m.matrixAutoUpdate = false;
        basso.add(m);
      }
    }
    const mesh = [];
    for (const p of [...pezziEsterni, ...(pieno ? pezziInterni : [])]) {
      let materiale = p.materiale;
      if (/^Paint 1/.test(p.chiave)) materiale = pieno ? p1 : p1l;
      else if (/^Paint 2/.test(p.chiave)) materiale = pieno ? p2 : p2l;
      else if (/^Glass/.test(p.chiave)) materiale = materialeCondiviso(pieno ? 'vetro' : 'vetro-scuro', () => vetro(ambiente, !pieno));
      else if (/^Brakelight/.test(p.chiave)) materiale = frenata;
      const m = new THREE.Mesh(p.geometria, materiale);
      m.castShadow = !/^Glass/.test(p.chiave);
      m.receiveShadow = false;
      m.matrixAutoUpdate = false;
      alto.add(m);
      mesh.push(m);
    }
    const sotto = new THREE.Mesh(ombra.geo, ombra.mat);
    sotto.position.y = 0.03;
    sotto.renderOrder = -1;
    gruppo.add(sotto);
    scena.add(gruppo);
    const voce = {
      gruppo,
      cassa,
      livrea,
      stato: null,
      visibile: true,
      beccheggio: 0,
      rollio: 0,
      imposta(stato) {
        this.stato = stato;
      },
      colora(nuova) {
        this.livrea = nuova;
        p1.color.setHex(nuova.primario);
        p2.color.setHex(nuova.secondario);
        p1l.color.setHex(nuova.primario);
        p2l.color.setHex(nuova.secondario);
      },
      rimuovi() {
        scena.remove(gruppo);
        auto.delete(voce);
        p1.normalMap?.dispose();
        p2.normalMap?.dispose();
        p1.dispose();
        p2.dispose();
        p1l.dispose();
        p2l.dispose();
        frenata.dispose();
      },
      mesh,
      frenata,
      pieno,
      alto,
      basso,
      semplificata: false,
      ombre: null,
    };
    auto.add(voce);
    return voce;
  }

  function aggiorna(camera, dt) {
    camera.getWorldPosition(posizioneCamera);
    const conti = [0, 0, 0];
    for (const a of auto) {
      const s = a.stato;
      if (!s || !a.visibile) {
        a.gruppo.visible = false;
        continue;
      }
      a.gruppo.visible = true;
      const suolo = quota(s.x, s.z);
      a.altezza = a.altezza === undefined || Math.abs(suolo - a.altezza) > 1 ? suolo : a.altezza + (suolo - a.altezza) * Math.min(1, dt * 14);
      a.gruppo.position.set(s.x, a.altezza, s.z);
      a.gruppo.rotation.set(0, s.yaw, 0);
      const verso = Math.min(1, dt * 7);
      a.beccheggio += (Math.max(-0.045, Math.min(0.045, (s.ax ?? 0) * 0.0045)) - a.beccheggio) * verso;
      a.rollio += (Math.max(-0.05, Math.min(0.05, -(s.ay ?? 0) * 0.0042)) - a.rollio) * verso;
      a.cassa.rotation.set(a.beccheggio, 0, a.rollio);
      a.frenata.emissiveIntensity = (s.freno ?? 0) > 0.05 ? 4.5 : 0.7;
      a.gruppo.updateMatrixWorld(true);
      const distanza = posizioneCamera.distanceTo(a.gruppo.position);
      const semplificata = lod !== null && !a.pieno && distanza > DISTANZA_LOD;
      if (a.semplificata !== semplificata) {
        a.semplificata = semplificata;
        a.alto.visible = !semplificata;
        a.basso.visible = semplificata;
      }
      const ombre = a.pieno && distanza < DISTANZA_OMBRA;
      if (a.ombre !== ombre) {
        a.ombre = ombre;
        for (const m of a.mesh) m.castShadow = ombre && m.material.opacity === 1;
      }
      const livello = a.pieno && distanza < DISTANZA_RUOTE_PIENE ? 0 : distanza < DISTANZA_RUOTE_LEGGERE ? 1 : 2;
      for (const asse of assi) {
        mRuota.makeTranslation(asse.x, asse.y, asse.z - AUTO.baricentroModello);
        if (asse.davanti) mRuota.multiply(mSterzo.makeRotationY(s.angoloSterzo ?? 0));
        const fisso = m4.multiplyMatrices(a.gruppo.matrixWorld, mRuota);
        if (!asse.sinistra) fisso.multiply(mLato);
        const giro = (s.ruote ?? 0) * (asse.sinistra ? 1 : -1);
        const girevole = mGiro.makeRotationX(giro).premultiply(fisso);
        if (livello === 0 && conti[0] < CAPIENZA_RUOTE) {
          for (const im of vicineGira) im.setMatrixAt(conti[0], girevole);
          for (const im of vicineFerme) im.setMatrixAt(conti[0], fisso);
          conti[0] += 1;
        } else if (livello <= 1 && conti[1] < CAPIENZA_RUOTE) {
          for (const im of medieGira) im.setMatrixAt(conti[1], girevole);
          for (const im of medieFerme) im.setMatrixAt(conti[1], fisso);
          conti[1] += 1;
        } else if (conti[2] < CAPIENZA_RUOTE) {
          for (const im of lontane) im.setMatrixAt(conti[2], girevole);
          conti[2] += 1;
        }
      }
    }
    [[vicineGira, 0], [vicineFerme, 0], [medieGira, 1], [medieFerme, 1], [lontane, 2]].forEach(([elenco, k]) => {
      for (const im of elenco) {
        im.count = conti[k];
        im.instanceMatrix.needsUpdate = true;
      }
    });
  }

  function precompila(camera) {
    const prima = [];
    for (const a of auto) {
      prima.push([a, a.gruppo.visible, a.alto.visible, a.basso.visible]);
      a.gruppo.visible = true;
      a.alto.visible = true;
      a.basso.visible = true;
    }
    const istanze = [...vicineGira, ...vicineFerme, ...medieGira, ...medieFerme, ...lontane].map(im => [im, im.count]);
    for (const [im] of istanze) im.count = 1;
    renderer.compile(scena, camera);
    for (const [im, n] of istanze) im.count = n;
    for (const [a, g, al, ba] of prima) {
      a.gruppo.visible = g;
      a.alto.visible = al;
      a.basso.visible = ba;
    }
  }

  const triangoli = pezzi => pezzi.reduce((t, p) => t + (p.geometria.index ? p.geometria.index.count : p.geometria.attributes.position.count) / 3, 0);
  return {
    crea,
    aggiorna,
    precompila,
    ambiente,
    pezziCarrozzeria: () => pezziEsterni,
    statistiche: () => ({ esterno: Math.round(triangoli(pezziEsterni)), interno: Math.round(triangoli(pezziInterni)), ruota: Math.round(triangoli(gira) + triangoli(ferme)), disegniCarrozzeria: pezziEsterni.length }),
  };
}

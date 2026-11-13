import * as THREE from 'three';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import { preparaAuto } from '/src/grafica/auto3d.js';

const QUOTE = { 'Paint 1': 0.11, 'Paint 2': 0.11, Glass: 0.2, finiture: 0.12, Mirror: 0.2, Hardware: 0.2 };
const MINIMO = 1500;
const log = t => {
  document.getElementById('log').textContent += `${t}\n`;
};

const renderer = new THREE.WebGLRenderer();
const scena = new THREE.Scene();
const fabbrica = await preparaAuto(renderer, scena, { modello: '/public/modelli/concept.glb', cielo: '/public/cielo/tramonto.hdr' });
const uscita = [];
for (const p of fabbrica.pezziCarrozzeria()) {
  const g = p.geometria;
  const tri = (g.index ? g.index.count : g.attributes.position.count) / 3;
  const nome = Object.keys(QUOTE).find(k => p.chiave.startsWith(k));
  if (!nome || tri < MINIMO) {
    log(`${p.chiave}: ${tri} tenuto`);
    uscita.push({ chiave: p.chiave, geometria: g, tenuto: true });
    continue;
  }
  const solo = new THREE.BufferGeometry();
  solo.setAttribute('position', g.attributes.position.clone());
  if (g.index) solo.setIndex(g.index.clone());
  const t0 = performance.now();
  const unita = new SimplifyModifier().modify(solo, 0);
  const vertici = unita.attributes.position.count;
  const ridotta = new SimplifyModifier().modify(unita, Math.floor(vertici * (1 - QUOTE[nome])));
  ridotta.computeVertexNormals();
  const triR = (ridotta.index ? ridotta.index.count : ridotta.attributes.position.count) / 3;
  log(`${p.chiave}: ${tri} -> ${triR} in ${(performance.now() - t0).toFixed(0)} ms`);
  uscita.push({ chiave: p.chiave, geometria: ridotta });
}
const parti = [];
const testata = [];
let offset = 0;
const aggiungi = arr => {
  const b = new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
  const pad = (4 - (offset % 4)) % 4;
  if (pad) {
    parti.push(new Uint8Array(pad));
    offset += pad;
  }
  const inizio = offset;
  parti.push(b.slice());
  offset += b.byteLength;
  return [inizio, arr.length];
};
for (const u of uscita) {
  const g = u.geometria;
  const voce = { chiave: u.chiave, tenuto: !!u.tenuto };
  if (!u.tenuto) {
    voce.posizioni = aggiungi(new Float32Array(g.attributes.position.array));
    voce.normali = aggiungi(new Float32Array(g.attributes.normal.array));
    const indice = g.index ? g.index.array : null;
    if (indice) voce.indici = aggiungi(new Uint32Array(indice));
  }
  testata.push(voce);
}
const totale = new Uint8Array(offset);
let k = 0;
for (const p of parti) {
  totale.set(p, k);
  k += p.byteLength;
}
let binario = '';
for (let i = 0; i < totale.length; i += 0x8000) binario += String.fromCharCode(...totale.subarray(i, i + 0x8000));
window.__lod = { testata, base64: btoa(binario) };
log('FATTO');

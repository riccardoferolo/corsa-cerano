import * as THREE from 'three';
import { AUTO } from '../gioco/fisica.js';

const SEGNI_MASSIMI = 1600;
const LARGO_SEGNO = 0.24;
const FUMO_MASSIMO = 240;
const VITA_FUMO = 1.6;
const SOGLIA_SEGNO = 0.22;
const SOGLIA_FUMO = 0.42;
const MEZZA_CARREGGIATA = 0.98;
const PASSO_SEGNO = 0.45;

function trama() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(32, 32, 2, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,255,255,0.9)');
  r.addColorStop(0.5, 'rgba(255,255,255,0.35)');
  r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * Segni di frenata sull'asfalto (un nastro a buffer circolare per tutte le auto) e fumo delle gomme
 * (particelle che salgono, si allargano e svaniscono), generati dalle ruote posteriori quando l'auto
 * scivola, pattina o blocca.
 */
export function creaEffetti(scena, { quota = () => 0 } = {}) {
  const posizioni = new Float32Array(SEGNI_MASSIMI * 4 * 3);
  const alfa = new Float32Array(SEGNI_MASSIMI * 4);
  const indici = new Uint32Array(SEGNI_MASSIMI * 6);
  for (let i = 0; i < SEGNI_MASSIMI; i++) indici.set([i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 2, i * 4 + 1, i * 4 + 3], i * 6);
  const geoSegni = new THREE.BufferGeometry();
  geoSegni.setAttribute('position', new THREE.BufferAttribute(posizioni, 3).setUsage(THREE.DynamicDrawUsage));
  geoSegni.setAttribute('alfa', new THREE.BufferAttribute(alfa, 1).setUsage(THREE.DynamicDrawUsage));
  geoSegni.setIndex(new THREE.BufferAttribute(indici, 1));
  const segni = new THREE.Mesh(geoSegni, new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
    vertexShader: 'attribute float alfa; varying float vA; void main() { vA = alfa; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'varying float vA; void main() { gl_FragColor = vec4(0.03, 0.03, 0.035, vA); }',
  }));
  segni.frustumCulled = false;
  segni.renderOrder = 1;
  scena.add(segni);
  let prossimo = 0;
  const ultimi = new Map();

  const fumoPos = new Float32Array(FUMO_MASSIMO * 3);
  const fumoDati = new Float32Array(FUMO_MASSIMO * 2);
  const fumoVel = new Float32Array(FUMO_MASSIMO * 3);
  const geoFumo = new THREE.BufferGeometry();
  geoFumo.setAttribute('position', new THREE.BufferAttribute(fumoPos, 3).setUsage(THREE.DynamicDrawUsage));
  geoFumo.setAttribute('dati', new THREE.BufferAttribute(fumoDati, 2).setUsage(THREE.DynamicDrawUsage));
  const fumo = new THREE.Points(geoFumo, new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { mappa: { value: trama() }, scala: { value: 600 } },
    vertexShader: 'attribute vec2 dati; uniform float scala; varying float vA; void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); float eta = dati.x; vA = dati.y * (1.0 - eta) * 0.32; gl_PointSize = (0.7 + eta * 2.6) * scala / -mv.z; gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform sampler2D mappa; varying float vA; void main() { vec4 t = texture2D(mappa, gl_PointCoord); gl_FragColor = vec4(vec3(0.82, 0.8, 0.78), t.a * vA); }',
  }));
  fumo.frustumCulled = false;
  fumo.renderOrder = 2;
  scena.add(fumo);
  let prossimoFumo = 0;
  let caso = 12345;
  const rnd = () => {
    caso = (caso * 16807) % 2147483647;
    return caso / 2147483647;
  };

  function aggiungiSegno(ax, az, bx, bz, forza, y) {
    const dx = bx - ax;
    const dz = bz - az;
    const l = Math.hypot(dx, dz);
    if (l < 1e-3) return;
    const nx = (-dz / l) * LARGO_SEGNO * 0.5;
    const nz = (dx / l) * LARGO_SEGNO * 0.5;
    const i = prossimo;
    prossimo = (prossimo + 1) % SEGNI_MASSIMI;
    const quota0 = y + 0.012;
    posizioni.set([ax + nx, quota0, az + nz, ax - nx, quota0, az - nz, bx + nx, quota0, bz + nz, bx - nx, quota0, bz - nz], i * 12);
    const a = Math.min(0.55, 0.15 + forza * 0.5);
    alfa.set([a, a, a, a], i * 4);
    geoSegni.attributes.position.addUpdateRange(i * 12, 12);
    geoSegni.attributes.alfa.addUpdateRange(i * 4, 4);
  }

  function emetti(x, y, z, vx, vz, forza) {
    const i = prossimoFumo;
    prossimoFumo = (prossimoFumo + 1) % FUMO_MASSIMO;
    fumoPos.set([x + (rnd() - 0.5) * 0.3, y + 0.25, z + (rnd() - 0.5) * 0.3], i * 3);
    fumoVel.set([vx * 0.12 + (rnd() - 0.5) * 1.2, 0.5 + rnd() * 0.7, vz * 0.12 + (rnd() - 0.5) * 1.2], i * 3);
    fumoDati.set([0, Math.min(1, forza)], i * 2);
  }

  return {
    aggiorna(auto, dt) {
      let segniCambiati = false;
      for (const { id, a } of auto) {
        const fx = Math.sin(a.yaw);
        const fz = Math.cos(a.yaw);
        const y = quota(a.x, a.z);
        const v = Math.hypot(a.vx, a.vz);
        const scivola = Math.max(a.sbanda ?? 0, (a.pattina ?? 0) * 0.8, (a.bloccate ?? 0) * 0.8, (a.freno ?? 0) > 0.9 && v > 8 ? 0.25 : 0);
        const ruote = [-1, 1].map(lato => ({ x: a.x - fx * (AUTO.dietro - 0.1) + fz * lato * MEZZA_CARREGGIATA, z: a.z - fz * (AUTO.dietro - 0.1) - fx * lato * MEZZA_CARREGGIATA }));
        const prima = ultimi.get(id);
        if (scivola > SOGLIA_SEGNO && v > 2 && prima) {
          ruote.forEach((r, k) => {
            const p = prima[k];
            if (Math.hypot(r.x - p.x, r.z - p.z) >= PASSO_SEGNO && Math.hypot(r.x - p.x, r.z - p.z) < 6) {
              aggiungiSegno(p.x, p.z, r.x, r.z, scivola, y);
              segniCambiati = true;
              prima[k] = r;
            }
          });
        } else ultimi.set(id, ruote);
        if (!prima) ultimi.set(id, ruote);
        if (scivola > SOGLIA_FUMO && v > 3 && rnd() < (scivola - SOGLIA_FUMO) * 2.2) {
          const r = ruote[rnd() < 0.5 ? 0 : 1];
          emetti(r.x, y, r.z, a.vx, a.vz, (scivola - SOGLIA_FUMO) * 1.8);
        }
      }
      if (segniCambiati) {
        geoSegni.attributes.position.needsUpdate = true;
        geoSegni.attributes.alfa.needsUpdate = true;
      }
      for (let i = 0; i < FUMO_MASSIMO; i++) {
        const eta = fumoDati[i * 2];
        if (fumoDati[i * 2 + 1] <= 0) continue;
        const nuova = eta + dt / VITA_FUMO;
        if (nuova >= 1) {
          fumoDati[i * 2 + 1] = 0;
          continue;
        }
        fumoDati[i * 2] = nuova;
        fumoPos[i * 3] += fumoVel[i * 3] * dt;
        fumoPos[i * 3 + 1] += fumoVel[i * 3 + 1] * dt;
        fumoPos[i * 3 + 2] += fumoVel[i * 3 + 2] * dt;
        fumoVel[i * 3] *= 1 - dt * 1.5;
        fumoVel[i * 3 + 2] *= 1 - dt * 1.5;
      }
      geoFumo.attributes.position.needsUpdate = true;
      geoFumo.attributes.dati.needsUpdate = true;
    },
    pulisci() {
      alfa.fill(0);
      geoSegni.attributes.alfa.needsUpdate = true;
      fumoDati.fill(0);
      ultimi.clear();
    },
  };
}

import { AUTO } from '../gioco/fisica.js';

export const MODI = Object.freeze(['inseguimento', 'lontana', 'cofano', 'abitacolo']);
const DISTANZE = Object.freeze({ inseguimento: [5.9, 1.8], lontana: [8.8, 2.7] });
const OCCHI_COFANO = Object.freeze([0, 1.16, 0.95]);
const OCCHI_ABITACOLO = Object.freeze([0, 1.07, 0.36]);
const FOV_BASE = 62;
const FOV_VELOCITA = 0.2;
const FOV_MASSIMO_IN_PIU = 15;
const ORBITA_RAGGIO = 7.4;
const ORBITA_ALTEZZA = 1.15;
const ORBITA_ANGOLO = -0.42;
const ORBITA_OSCILLA = 0.24;
const ORBITA_GIRI_AL_SECONDO = 0.035;
const SCAVALCA_ENTRO = 3.2;
const SCAVALCA_ALTEZZA = 1.4;
const TV_OGNI = 110;
const TV_LATO = 3.5;
const TV_ALTEZZA = 4.2;

const angolo = a => Math.atan2(Math.sin(a), Math.cos(a));
const muro = v => v.etichetta === 'muro' || v.etichetta === 'barriera';

function guarda(da, a) {
  const dx = a.x - da.x;
  const dy = a.y - da.y;
  const dz = a.z - da.z;
  const o = Math.hypot(dx, dz);
  return { yaw: Math.atan2(-dx, -dz), pitch: Math.atan2(dy, o) };
}

/**
 * Telecamere: inseguimento con ritardo a molla (la coda dell'auto si vede in derapata), più lontana, cofano,
 * abitacolo, sguardo all'indietro; per gli spettatori telecamere a bordo pista come in televisione; in copertina
 * un giro lento attorno all'auto.
 */
export function creaTelecamera() {
  const pos = { x: 0, y: 3, z: -8 };
  let segue = 0;
  let pronta = false;
  let orbita = 0;
  let scossa = 0;
  let tv = null;
  let sopra = 0;

  function vista(occhio, punto, fov) {
    const v = guarda(occhio, punto);
    return { x: occhio.x, y: occhio.y, z: occhio.z, yaw: v.yaw, pitch: v.pitch, fov };
  }

  function bordo(a, locale, indietro = false) {
    const fx = Math.sin(a.yaw);
    const fz = Math.cos(a.yaw);
    const avanti = locale[2] - AUTO.baricentroModello;
    const occhio = { x: a.x + fx * avanti + fz * locale[0], y: locale[1] + (a.y ?? 0), z: a.z + fz * avanti - fx * locale[0] };
    const verso = indietro ? -1 : 1;
    const punto = { x: occhio.x + fx * 20 * verso, y: occhio.y - 0.9, z: occhio.z + fz * 20 * verso };
    return vista(occhio, punto, 74);
  }

  return {
    get pronta() { return pronta; },
    scuoti(forza) {
      scossa = Math.min(1, scossa + forza);
    },
    reimposta() {
      pronta = false;
    },
    insegui(a, dt, { modo = 'inseguimento', collisioni = null, indietro = false, altre = [] } = {}) {
      const v = Math.hypot(a.vx, a.vz);
      if (modo === 'cofano') return bordo(a, OCCHI_COFANO, indietro);
      if (modo === 'abitacolo') return bordo(a, OCCHI_ABITACOLO, indietro);
      const [distanza, altezza] = DISTANZE[modo] ?? DISTANZE.inseguimento;
      const moto = v > 4 ? Math.atan2(a.vx, a.vz) : a.yaw;
      const voluto = a.yaw + angolo(moto - a.yaw) * 0.45 + (indietro ? Math.PI : 0);
      if (!pronta) {
        segue = voluto;
        pronta = true;
      }
      segue += angolo(voluto - segue) * (1 - Math.exp(-dt * (indietro ? 30 : 5.5)));
      let lontano = distanza + Math.min(1.6, v * 0.022);
      if (collisioni) {
        const colpo = collisioni.raggio(a.x, a.z, -Math.sin(segue), -Math.cos(segue), lontano + 0.4, muro);
        if (colpo.colpito) lontano = Math.max(2.2, colpo.distanza - 0.4);
      }
      const dietroX = a.x - Math.sin(segue) * lontano;
      const dietroZ = a.z - Math.cos(segue) * lontano;
      const ingombro = altre.some(b => Math.hypot(b.x - dietroX, b.z - dietroZ) < SCAVALCA_ENTRO);
      sopra += ((ingombro ? SCAVALCA_ALTEZZA : 0) - sopra) * (1 - Math.exp(-dt * 4));
      const desiderata = { x: dietroX, y: altezza + sopra + (a.y ?? 0), z: dietroZ };
      const molla = 1 - Math.exp(-dt * 16);
      pos.x += (desiderata.x - pos.x) * molla;
      pos.y += (desiderata.y - pos.y) * molla;
      pos.z += (desiderata.z - pos.z) * molla;
      if (Math.hypot(pos.x - desiderata.x, pos.z - desiderata.z) > 6) Object.assign(pos, desiderata);
      scossa = Math.max(0, scossa - dt * 2.5);
      const tremito = scossa * 0.12 + Math.max(0, v - 45) * 0.0012;
      const occhio = { x: pos.x + (Math.random() - 0.5) * tremito, y: pos.y + (Math.random() - 0.5) * tremito, z: pos.z + (Math.random() - 0.5) * tremito };
      const punto = { x: a.x + Math.sin(a.yaw) * 2.6, y: 0.85 + (a.y ?? 0), z: a.z + Math.cos(a.yaw) * 2.6 };
      return vista(occhio, punto, FOV_BASE + Math.min(FOV_MASSIMO_IN_PIU, v * FOV_VELOCITA));
    },
    orbita(a, dt) {
      orbita += dt * ORBITA_GIRI_AL_SECONDO * Math.PI * 2;
      const angoloVista = a.yaw + ORBITA_ANGOLO + Math.sin(orbita) * ORBITA_OSCILLA;
      const occhio = { x: a.x + Math.sin(angoloVista) * ORBITA_RAGGIO, y: ORBITA_ALTEZZA, z: a.z + Math.cos(angoloVista) * ORBITA_RAGGIO };
      pronta = false;
      return vista(occhio, { x: a.x, y: 0.62, z: a.z }, 42);
    },
    televisione(a, pista, s) {
      const indice = Math.floor((s + TV_OGNI * 0.35) / TV_OGNI);
      if (!tv || tv.indice !== indice) {
        const q = pista.punto(indice * TV_OGNI);
        const lato = indice % 2 ? 1 : -1;
        const larghezza = (lato > 0 ? q.sinistra : q.destra) + TV_LATO;
        tv = { indice, x: q.x + lato * q.tz * larghezza, y: TV_ALTEZZA, z: q.z - lato * q.tx * larghezza };
      }
      const d = Math.hypot(a.x - tv.x, a.z - tv.z);
      const fov = Math.max(14, Math.min(58, (2 * Math.atan(7 / Math.max(1, d)) * 180) / Math.PI));
      pronta = false;
      return vista(tv, { x: a.x, y: 0.7, z: a.z }, fov);
    },
  };
}

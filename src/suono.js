const VOLUME = 0.5;
const VOCI_ALTRE = 3;
const DISTANZA_UDITO = 140;
const IMPULSI_PER_GIRO = 4;

/**
 * Suoni sintetizzati: motore V8 (fondamentale = scoppi per giro, sottotono, ringhio distorto, filtro che si apre col
 * gas), stridio delle gomme, vento, urti, cambiata, semafori e giro. Le tre auto più vicine hanno un motore
 * più semplice, panoramico e attenuato con la distanza.
 */
export function creaSuono() {
  let ctx = null;
  let uscita = null;
  let rumore = null;
  let mio = null;
  let gomme = null;
  let vento = null;
  let muto = false;
  const altre = [];

  function sorgenteRumore() {
    const s = ctx.createBufferSource();
    s.buffer = rumore;
    s.loop = true;
    s.start(0, Math.random() * 2);
    return s;
  }

  function distorsione(quanta) {
    const n = 1024;
    const curva = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1;
      curva[i] = Math.tanh(x * quanta);
    }
    const w = ctx.createWaveShaper();
    w.curve = curva;
    return w;
  }

  function voceMotore(semplice) {
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.Q.value = 1.4;
    const volume = ctx.createGain();
    volume.gain.value = 0;
    const pan = ctx.createStereoPanner();
    const sega = ctx.createOscillator();
    sega.type = 'sawtooth';
    const sotto = ctx.createOscillator();
    sotto.type = 'square';
    const gs = ctx.createGain();
    gs.gain.value = 0.55;
    const ga = ctx.createGain();
    ga.gain.value = 0.7;
    const ringhio = distorsione(semplice ? 1.5 : 2.6);
    sega.connect(ga).connect(ringhio);
    sotto.connect(gs).connect(ringhio);
    let alto = null;
    if (!semplice) {
      alto = ctx.createOscillator();
      alto.type = 'sawtooth';
      alto.detune.value = 9;
      const gh = ctx.createGain();
      gh.gain.value = 0.22;
      alto.connect(gh).connect(ringhio);
      alto.start();
    }
    ringhio.connect(filtro).connect(volume).connect(pan).connect(uscita);
    sega.start();
    sotto.start();
    return {
      aggiorna(rpm, gas, guadagno, panorama = 0) {
        const t = ctx.currentTime;
        const f = Math.max(30, (rpm / 60) * IMPULSI_PER_GIRO);
        sega.frequency.setTargetAtTime(f, t, 0.02);
        sotto.frequency.setTargetAtTime(f / 2, t, 0.02);
        alto?.frequency.setTargetAtTime(f * 2, t, 0.02);
        filtro.frequency.setTargetAtTime(280 + rpm * 0.22 + gas * 1600, t, 0.04);
        volume.gain.setTargetAtTime(guadagno * (0.35 + gas * 0.65), t, 0.05);
        pan.pan.setTargetAtTime(Math.max(-1, Math.min(1, panorama)), t, 0.05);
      },
    };
  }

  function voceRumore(tipo, frequenza, q) {
    const s = sorgenteRumore();
    const f = ctx.createBiquadFilter();
    f.type = tipo;
    f.frequency.value = frequenza;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.value = 0;
    s.connect(f).connect(g).connect(uscita);
    return { f, g };
  }

  function prepara() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume();
      return;
    }
    ctx = new AudioContext();
    uscita = ctx.createGain();
    uscita.gain.value = muto ? 0 : VOLUME;
    const compressore = ctx.createDynamicsCompressor();
    uscita.connect(compressore).connect(ctx.destination);
    rumore = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = rumore.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    mio = voceMotore(false);
    gomme = voceRumore('bandpass', 1350, 7);
    vento = voceRumore('lowpass', 520, 0.7);
    for (let i = 0; i < VOCI_ALTRE; i++) altre.push(voceMotore(true));
  }
  const pronto = () => ctx && ctx.state === 'running';

  function bip(frequenza, durata, forza = 0.25) {
    if (!pronto()) return;
    const o = ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = frequenza;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(forza, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + durata);
    o.connect(g).connect(uscita);
    o.start(t);
    o.stop(t + durata + 0.02);
  }

  return {
    prepara,
    get muto() { return muto; },
    alternaMuto() {
      muto = !muto;
      if (uscita) uscita.gain.value = muto ? 0 : VOLUME;
      return muto;
    },
    aggiorna(io, vicine, ascoltatore) {
      if (!pronto()) return;
      const t = ctx.currentTime;
      if (io) {
        const v = Math.hypot(io.vx, io.vz);
        mio.aggiorna(io.rpm, io.gas, 0.42);
        gomme.g.gain.setTargetAtTime(Math.min(0.32, Math.max(0, io.sbanda - 0.07) * 1.6) * Math.min(1, v / 8), t, 0.05);
        gomme.f.frequency.setTargetAtTime(1100 + Math.min(900, v * 10), t, 0.1);
        vento.g.gain.setTargetAtTime(Math.min(0.3, (v / 75) ** 2 * 0.3), t, 0.2);
      } else {
        mio.aggiorna(900, 0, 0);
        gomme.g.gain.setTargetAtTime(0, t, 0.05);
        vento.g.gain.setTargetAtTime(0, t, 0.2);
      }
      const ordinate = vicine
        .map(a => ({ a, d: Math.hypot(a.x - ascoltatore.x, a.z - ascoltatore.z) }))
        .filter(v => v.d < DISTANZA_UDITO)
        .sort((x, y) => x.d - y.d)
        .slice(0, VOCI_ALTRE);
      altre.forEach((voce, i) => {
        const v = ordinate[i];
        if (!v) {
          voce.aggiorna(900, 0, 0);
          return;
        }
        const dx = v.a.x - ascoltatore.x;
        const dz = v.a.z - ascoltatore.z;
        const destra = -(dx * Math.cos(ascoltatore.yaw) - dz * Math.sin(ascoltatore.yaw)) / Math.max(1, v.d);
        voce.aggiorna(v.a.rpm ?? 3000, v.a.gas ?? 0.5, 0.3 / (1 + v.d / 9), destra);
      });
    },
    urto(forza) {
      if (!pronto() || forza < 1.5) return;
      const s = sorgenteRumore();
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 500 + Math.min(1500, forza * 90);
      const g = ctx.createGain();
      const t = ctx.currentTime;
      g.gain.setValueAtTime(Math.min(0.9, forza * 0.06), t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      s.connect(f).connect(g).connect(uscita);
      s.stop(t + 0.4);
    },
    luce: () => bip(520, 0.22),
    via: () => bip(1040, 0.6, 0.3),
    giro: () => bip(880, 0.15, 0.18),
  };
}

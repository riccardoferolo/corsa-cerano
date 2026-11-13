const ZONA_MORTA = 0.09;
const TASTI = Object.freeze({
  gas: ['KeyW', 'ArrowUp'],
  freno: ['KeyS', 'ArrowDown'],
  sinistra: ['KeyA', 'ArrowLeft'],
  destra: ['KeyD', 'ArrowRight'],
  mano: ['Space'],
});
const AZIONI_TASTO = Object.freeze({ KeyC: 'telecamera', KeyR: 'rimetti', Enter: 'pronto', NumpadEnter: 'pronto', KeyT: 'aiuti', KeyM: 'muto' });
const AZIONI_PULSANTE = Object.freeze({ 3: 'telecamera', 1: 'rimetti', 9: 'pronto', 8: 'aiuti' });
const CATTURATI = new Set([...Object.values(TASTI).flat(), ...Object.keys(AZIONI_TASTO), 'KeyV']);

/** Tastiera e joypad: acceleratore, freno, sterzo, freno a mano e qualche azione (telecamera, rimetti in pista, pronto). */
export function creaComandi() {
  const premuti = new Set();
  const azioni = [];
  let attivo = false;
  let pulsantiPrima = [];
  let ultimoJoypad = null;

  const suGiu = e => {
    if (!attivo || e.target?.tagName === 'INPUT' || e.target?.tagName === 'SELECT') return;
    if (!CATTURATI.has(e.code)) return;
    e.preventDefault();
    if (e.repeat) return;
    premuti.add(e.code);
    const azione = AZIONI_TASTO[e.code];
    if (azione) azioni.push(azione);
  };
  const suSu = e => premuti.delete(e.code);
  window.addEventListener('keydown', suGiu);
  window.addEventListener('keyup', suSu);
  window.addEventListener('blur', () => premuti.clear());

  const tieni = nomi => nomi.some(k => premuti.has(k));
  const curva = v => {
    const a = Math.abs(v);
    if (a < ZONA_MORTA) return 0;
    const t = (a - ZONA_MORTA) / (1 - ZONA_MORTA);
    return Math.sign(v) * t * (0.55 + 0.45 * t);
  };

  function leggiJoypad() {
    const elenco = navigator.getGamepads ? [...navigator.getGamepads()].filter(Boolean) : [];
    const j = elenco.find(g => g.connected && g.mapping === 'standard') ?? elenco[0];
    if (!j) return null;
    ultimoJoypad = j.id;
    const pulsanti = j.buttons.map(b => b.pressed);
    pulsanti.forEach((giu, i) => {
      if (giu && !pulsantiPrima[i] && AZIONI_PULSANTE[i]) azioni.push(AZIONI_PULSANTE[i]);
    });
    pulsantiPrima = pulsanti;
    return {
      gas: j.buttons[7]?.value ?? 0,
      freno: j.buttons[6]?.value ?? 0,
      sterzo: curva(j.axes[0] ?? 0),
      mano: !!j.buttons[0]?.pressed,
    };
  }

  return {
    attiva(si) {
      attivo = si;
      if (!si) premuti.clear();
    },
    get joypad() { return ultimoJoypad; },
    leggi() {
      const j = attivo ? leggiJoypad() : null;
      const tastiera = {
        gas: tieni(TASTI.gas) ? 1 : 0,
        freno: tieni(TASTI.freno) ? 1 : 0,
        sterzo: (tieni(TASTI.destra) ? 1 : 0) - (tieni(TASTI.sinistra) ? 1 : 0),
        mano: tieni(TASTI.mano),
      };
      const analogico = !!j && (Math.abs(j.sterzo) > 0 || j.gas > 0.02 || j.freno > 0.02);
      return {
        gas: Math.max(tastiera.gas, j?.gas ?? 0),
        freno: Math.max(tastiera.freno, j?.freno ?? 0),
        sterzo: tastiera.sterzo !== 0 ? tastiera.sterzo : j?.sterzo ?? 0,
        mano: tastiera.mano || !!j?.mano,
        analogico: analogico && tastiera.sterzo === 0,
        indietro: premuti.has('KeyV'),
        azioni: azioni.splice(0),
      };
    },
  };
}

import { AUTO } from './gioco/fisica.js';

const LATO_MAPPA = 210;
const MARGINE_MAPPA = 14;
const RIGHE_CLASSIFICA = 8;

export function formattaTempo(secondi, segno = false) {
  if (secondi === null || secondi === undefined || !Number.isFinite(secondi)) return '–';
  const s = Math.abs(secondi);
  const m = Math.floor(s / 60);
  const resto = s - m * 60;
  const testo = m > 0 ? `${m}:${resto.toFixed(3).padStart(6, '0')}` : resto.toFixed(3);
  return `${segno ? (secondi < 0 ? '−' : '+') : ''}${testo}`;
}

const sicuro = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const esadecimale = n => `#${n.toString(16).padStart(6, '0')}`;

export function creaHud() {
  const $ = id => document.getElementById(id);
  const tela = $('minimappa');
  const ctx = tela.getContext('2d');
  let fondo = null;
  let mappa = null;
  let timerMessaggio = null;
  const ultimo = {};

  const scrivi = (id, valore) => {
    if (ultimo[id] === valore) return;
    ultimo[id] = valore;
    $(id).textContent = valore;
  };
  const html = (id, valore) => {
    if (ultimo[id] === valore) return;
    ultimo[id] = valore;
    $(id).innerHTML = valore;
  };

  function preparaMinimappa(pista) {
    let x0 = Infinity;
    let x1 = -Infinity;
    let z0 = Infinity;
    let z1 = -Infinity;
    for (let i = 0; i < pista.n; i++) {
      x0 = Math.min(x0, pista.x[i]);
      x1 = Math.max(x1, pista.x[i]);
      z0 = Math.min(z0, pista.z[i]);
      z1 = Math.max(z1, pista.z[i]);
    }
    const scala = (LATO_MAPPA - 2 * MARGINE_MAPPA) / Math.max(x1 - x0, z1 - z0);
    const ox = MARGINE_MAPPA + (LATO_MAPPA - 2 * MARGINE_MAPPA - (x1 - x0) * scala) / 2 - x0 * scala;
    const oz = MARGINE_MAPPA + (LATO_MAPPA - 2 * MARGINE_MAPPA - (z1 - z0) * scala) / 2 - z0 * scala;
    mappa = { scala, ox, oz };
    fondo = document.createElement('canvas');
    fondo.width = LATO_MAPPA;
    fondo.height = LATO_MAPPA;
    const c = fondo.getContext('2d');
    c.lineJoin = 'round';
    c.lineCap = 'round';
    const linea = () => {
      c.beginPath();
      for (let i = 0; i <= pista.n; i += 3) {
        const k = i % pista.n;
        const px = ox + pista.x[k] * scala;
        const pz = oz + pista.z[k] * scala;
        if (i === 0) c.moveTo(px, pz);
        else c.lineTo(px, pz);
      }
      c.closePath();
    };
    c.strokeStyle = 'rgba(0,0,0,0.65)';
    c.lineWidth = 9;
    linea();
    c.stroke();
    c.strokeStyle = 'rgba(245,245,240,0.92)';
    c.lineWidth = 4;
    linea();
    c.stroke();
    const p = pista.punto(0);
    c.strokeStyle = '#e1251b';
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(ox + (p.x + p.tz * 7) * scala, oz + (p.z - p.tx * 7) * scala);
    c.lineTo(ox + (p.x - p.tz * 7) * scala, oz + (p.z + p.tx * 7) * scala);
    c.stroke();
  }

  function disegnaMinimappa(auto) {
    if (!fondo) return;
    ctx.clearRect(0, 0, LATO_MAPPA, LATO_MAPPA);
    ctx.drawImage(fondo, 0, 0);
    const ordinate = [...auto].sort((a, b) => (a.io ? 1 : 0) - (b.io ? 1 : 0));
    for (const a of ordinate) {
      const px = mappa.ox + a.x * mappa.scala;
      const pz = mappa.oz + a.z * mappa.scala;
      ctx.beginPath();
      ctx.arc(px, pz, a.io ? 6 : 4.2, 0, Math.PI * 2);
      ctx.fillStyle = esadecimale(a.colore);
      ctx.fill();
      ctx.lineWidth = a.io ? 2.5 : 1.5;
      ctx.strokeStyle = a.io ? '#fff' : 'rgba(0,0,0,0.8)';
      ctx.stroke();
    }
  }

  function aggiorna(d) {
    const kmh = Math.round(Math.abs(d.velocita) * 3.6);
    scrivi('velocita', String(kmh));
    scrivi('marcia', d.marcia === 0 ? 'R' : String(d.marcia));
    const frazione = Math.min(1, Math.max(0, (d.rpm - AUTO.giriMinimo) / (AUTO.giriMassimo - AUTO.giriMinimo)));
    $('giri-barra').style.width = `${(frazione * 100).toFixed(1)}%`;
    $('giri-barra').parentElement.classList.toggle('limite', d.rpm > AUTO.cambioSu - 150);
    scrivi('posizione', d.posizione ? `P${d.posizione}` : '–');
    scrivi('totale', d.totale ? `/${d.totale}` : '');
    scrivi('giro', d.giri ? `${Math.min(d.giro + 1, d.giri)}/${d.giri}` : '–');
    scrivi('tempo-giro', formattaTempo(d.tempoGiro));
    scrivi('tempo-migliore', formattaTempo(d.migliore));
    scrivi('tempo-gara', formattaTempo(d.tempoGara));
    html('classifica', d.classifica.slice(0, RIGHE_CLASSIFICA).map((r, i) => `<li class="${r.io ? 'io' : ''}"><span>${i + 1}</span><i class="c" style="background:${esadecimale(r.colore)}"></i><span class="n">${sicuro(r.nome)}</span><span class="d">${r.distacco}</span></li>`).join(''));
    scrivi('pista-nome', d.pista);
    scrivi('fase', d.fase);
    scrivi('aiuto', d.aiuto);
    scrivi('rete', d.rete);
    $('scia').hidden = !(d.scia > 0.25);
    $('spettatore').hidden = !d.spettatore;
    if (d.spettatore) scrivi('spettatore', d.spettatore);
    disegnaMinimappa(d.auto);
  }

  function messaggio(testo, sotto = '', durata = 2.2) {
    const el = $('messaggio');
    el.innerHTML = `${sicuro(testo)}${sotto ? `<small>${sicuro(sotto)}</small>` : ''}`;
    el.classList.add('visibile');
    clearTimeout(timerMessaggio);
    timerMessaggio = setTimeout(() => el.classList.remove('visibile'), durata * 1000);
  }

  function semafori(accesi, via = false, visibili = true) {
    const el = $('semafori');
    el.hidden = !visibili;
    el.classList.toggle('via', via);
    [...el.children].forEach((l, i) => l.classList.toggle('acceso', !via && i < accesi));
  }

  function risultati(righe, titolo, nota) {
    const el = $('risultati');
    if (!righe) {
      el.hidden = true;
      return;
    }
    $('risultati-titolo').textContent = titolo;
    $('risultati-nota').textContent = nota;
    $('risultati-righe').innerHTML = righe.map((r, i) => `<tr class="${r.io ? 'io' : ''}"><td>${i + 1}</td><td><i class="c" style="background:${esadecimale(r.colore)}"></i>${sicuro(r.nome)}</td><td>${r.tempo}</td><td>${r.migliore}</td></tr>`).join('');
    el.hidden = false;
  }

  return { preparaMinimappa, aggiorna, messaggio, semafori, risultati, mostra(si) { $('hud').hidden = !si; } };
}

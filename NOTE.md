# Gran Premio di Cerano — stato del lavoro

Corse su strada nelle vie vere di Cerano, al tramonto. Fino a 8 auto in griglia: gli amici online (niente stanze né
lobby, come Rapina a Cerano) e i piloti del computer che riempiono i posti liberi. Telecamera dietro l'auto, cofano,
abitacolo, sguardo all'indietro; joypad supportato.

## Comandi

| Cosa | Comando |
|---|---|
| Gioco in sviluppo | `npx vite --port 5432` (fermare per PID) — `?locale` per provare in più schede senza internet |
| Test | `npm test` (16: fisica, piste, contagiri, gara intera con 8 piloti del computer, protocollo di rete) |
| Pubblicazione | `npm run build` → `dist/` |
| Collaudo a video | `node _lavoro/collaudo.mjs [media]` (gara completa col pilota automatico), `node _lavoro/collaudo-due.mjs [url]` (due giocatori, passaggio dell'host), `node _lavoro/collaudo-spettatore.mjs` (chi esce durante le prove, chi entra a gara iniziata) |
| Prestazioni | `node _lavoro/misura-fps.mjs <url> <qualita> <secondi>`, `node _lavoro/scatti.mjs media --vsync` |
| Piste | `node _lavoro/circuiti.mjs [id]` (misure, strozzature, mappa con barriere e griglia), `node _lavoro/larghezze.mjs` (larghezza libera di ogni via) |
| Piloti del computer | `node _lavoro/gara-ia.mjs [seme]` (gara intera a 8 su tutte le piste, senza browser) |

## Struttura

| Pezzo | File |
|---|---|
| Città (riusata da Rapina a Cerano, vedi `MAPPA.md` di quel progetto) | `src/citta/`, `src/grafica/{scena,citta3d,…}.js`, `public/cerano/` |
| Piste: tappe sulle vie vere, asse ammorbidito e centrato fra i muri, larghezza dai muri veri, barriere, griglia, profilo di velocità | `src/gioco/pista.js` (`CIRCUITI`, `costruisciPista`, `creaContagiri`) |
| Città chiusa per la gara (via pali, alberi e cartelli dal corridoio, argini sotto i ponti disattivati, barriere attive solo sulla pista in uso) | `src/gioco/preparazione.js` |
| Fisica: modello a bicicletta, gomme a formula magica, trasferimento di carico, deportanza, cambio automatico, ABS e ripartizione di frenata, controllo di trazione adattivo e di stabilità (tasto T), scia, urti con impulso | `src/gioco/fisica.js` |
| Piloti del computer (inseguimento puro, linea interna, frenata sul profilo, sorpassi, uscita dagli ingorghi) | `src/gioco/pilota.js` |
| Direzione di gara sull'host: prove libere → semafori → gara → arrivo → pista successiva | `src/gioco/gara.js` |
| Rete: protocollo e validazione; mondo pubblico e passaggio dell'host copiati da Rapina | `src/rete/` (prefisso canale `corsacerano`) |
| Auto: carrozzeria unita per materiale, ruote istanziate a 3 livelli, carrozzeria semplificata oltre 13 m, riflessi HDR | `src/grafica/auto3d.js`, `public/modelli/concept.glb`, `concept-lod.{json,bin}` |
| Pista disegnata: barriere bianche e rosse, cordoli, traguardo, griglia, cartelloni inventati, portale coi semafori | `src/grafica/pista3d.js` |
| Fumo e segni delle gomme | `src/grafica/effetti.js` |
| Telecamere, HUD, suoni sintetizzati, comandi | `src/grafica/telecamera.js`, `src/hud.js`, `src/suono.js`, `src/comandi.js` |

## Rete

- L'host scarta le istantanee vecchie (canale veloce non ordinato), gli ospiti spettatori mandano un battito ogni
  secondo (l'host butta fuori solo dopo 6 s di silenzio vero), un ospite senza notizie per 12 s rientra da solo,
  la presenza nella griglia si ricalcola appena l'host accoglie il nuovo arrivato.
- Revisione indipendente del codice il 13/11: corretti 2 blocchi, 1 crash dell'host, il limite di partecipanti
  nell'istantanea (16), un'iniezione HTML possibile nei messaggi a video, perdite minori.

## Le tre piste

| Pista | Vie | Lunghezza | Giri | Giro dei piloti del computer |
|---|---|---|---|---|
| Anello della Circonvallazione | Via Circonvallazione, Via Vignone, Piazza San Rocco, Via Marconi | 1,95 km | 3 | ~70 s |
| Circuito di San Rocco | Via Carducci, Via Ticino, Via Vallazza, Via Novara | 1,06 km | 4 | ~41 s |
| Triangolo delle Provinciali | Via Milano, Strada Provinciale, Via Novara | 3,15 km | 2 | ~78 s |

Il centro storico vero (Via Roma, Via Tornielli, Piazza Crespi) è stato scartato: vicoli da 4 m, e accanto alla
parrocchiale il campanile entra nella via (mappa delle larghezze in `_lavoro/larghezze.mjs`).

## Prestazioni (misurate su Intel UHD integrata, Edge)

- Qualità automatica = Media su questa scheda: ~58-60 fps con vsync, ~70-80 senza limite. Alta (con le ombre del
  sole) su questa scheda scende a ~50-56: è pensata per schede video vere, e se scatta il gioco scende da solo.
- Scelte che hanno pesato: niente luci vere dei lampioni al tramonto (dimezzavano gli fps: restano lampade accese e
  pozze di luce), ombre vere solo per la propria auto (le altre hanno l'ombra a terra), ruote piene solo per la
  propria auto, carrozzeria semplificata (79k → 9k triangoli) e vernice senza trasparente oltre 13 m, shader
  precompilati al caricamento. La qualità automatica ora scende anche con gli scatti, non solo con la media.

## Modelli e dati scaricati (licenze nei crediti della schermata iniziale)

- Auto: «CarConcept» di Eric Chadwick / Darmstadt Graphics Group (CC BY 4.0), derivata da «Free Concept Car 004» di
  Unity Fan (CC0), da `github.com/KhronosGroup/glTF-Sample-Assets` (`Models/CarConcept/glTF-Binary`). Il file
  originale è stato cancellato dopo l'uso: `strumenti/prepara-auto.py <originale> public/modelli/concept.glb` lo
  rifà (toglie i loghi Khronos/3DCommerce dalla spalla delle gomme e dalla targa, lo stemma del volante, le mappe
  emissive col logo; targa inventata «CE 726 GP»). La carrozzeria semplificata si rigenera con
  `node _lavoro/lod/genera.mjs` a server avviato.
- Cielo per i riflessi: «Belfast Sunset Pure Sky» 1k di Poly Haven (CC0), `public/cielo/tramonto.hdr`.
- Piloti del computer, sponsor e marchi sono inventati.

## Limiti

- Un solo modello d'auto (monomarca) con 10 livree; nessun pilota visibile dentro.
- I suoni del motore sono sintetizzati (nessun campione registrato).
- L'abitacolo ha il cruscotto fisso del modello (il tachimetro vero è nell'HUD).

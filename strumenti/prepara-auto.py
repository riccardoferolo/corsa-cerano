"""Prepara il modello dell'auto per il gioco a partire dal CarConcept di Khronos (CC BY 4.0).

Toglie i marchi (logo Khronos anche come mappa emissiva di cerchi, maniglie e specchi; Khronos e 3DCommerce sulla spalla della gomma, targa col logo, stemma sul volante),
mette una targa inventata, riduce la mappa di occlusione da 2048 a 1024 e scrive public/modelli/concept.glb.

Uso: python strumenti/prepara-auto.py _lavoro/CarConcept-originale.glb public/modelli/concept.glb
"""
import io
import json
import math
import struct
import sys

from PIL import Image, ImageDraw, ImageFont

STEMMA_VOLANTE = 'InteriorSteeringEmblem'
IMMAGINE_TARGA = 3
IMMAGINE_SPALLA = 10
IMMAGINE_SPALLA_NORMALE = 11
IMMAGINE_OCCLUSIONE = 2
LATO_OCCLUSIONE = 1024
SETTORI_LOGHI = ((140.0, 225.0), (-35.0, 25.0))
RAGGIO_LOGHI = (0.70, 1.0)


def leggi_glb(percorso):
    dati = open(percorso, 'rb').read()
    lunghezza_json = struct.unpack_from('<I', dati, 12)[0]
    documento = json.loads(dati[20:20 + lunghezza_json])
    inizio_bin = 20 + lunghezza_json
    lunghezza_bin = struct.unpack_from('<I', dati, inizio_bin)[0]
    binario = dati[inizio_bin + 8:inizio_bin + 8 + lunghezza_bin]
    viste = []
    for v in documento['bufferViews']:
        a = v.get('byteOffset', 0)
        viste.append(bytes(binario[a:a + v['byteLength']]))
    return documento, viste


def scrivi_glb(percorso, documento, viste):
    blocchi = bytearray()
    for i, contenuto in enumerate(viste):
        while len(blocchi) % 4:
            blocchi.append(0)
        documento['bufferViews'][i]['byteOffset'] = len(blocchi)
        documento['bufferViews'][i]['byteLength'] = len(contenuto)
        blocchi.extend(contenuto)
    while len(blocchi) % 4:
        blocchi.append(0)
    documento['buffers'][0]['byteLength'] = len(blocchi)
    testo = json.dumps(documento, separators=(',', ':')).encode('utf8')
    while len(testo) % 4:
        testo += b' '
    totale = 12 + 8 + len(testo) + 8 + len(blocchi)
    with open(percorso, 'wb') as f:
        f.write(struct.pack('<III', 0x46546C67, 2, totale))
        f.write(struct.pack('<II', len(testo), 0x4E4F534A))
        f.write(testo)
        f.write(struct.pack('<II', len(blocchi), 0x004E4942))
        f.write(blocchi)


def png(immagine):
    uscita = io.BytesIO()
    immagine.save(uscita, 'PNG', optimize=True)
    return uscita.getvalue()


def immagine_di(documento, viste, indice):
    return Image.open(io.BytesIO(viste[documento['images'][indice]['bufferView']]))


def sostituisci(documento, viste, indice, contenuto):
    viste[documento['images'][indice]['bufferView']] = contenuto
    documento['images'][indice]['mimeType'] = 'image/png'


def carattere(dimensione, grassetto=True):
    for nome in ('arialbd.ttf' if grassetto else 'arial.ttf', 'DejaVuSans-Bold.ttf'):
        try:
            return ImageFont.truetype(nome, dimensione)
        except OSError:
            continue
    return ImageFont.load_default()


def targa(larghezza, altezza):
    """Targa inventata in stile europeo: banda blu a sinistra, lettere nere su bianco."""
    im = Image.new('RGB', (larghezza, altezza), (238, 238, 232))
    d = ImageDraw.Draw(im)
    banda = int(larghezza * 0.085)
    d.rectangle((0, 0, banda, altezza), fill=(22, 52, 150))
    d.ellipse((banda * 0.22, altezza * 0.12, banda * 0.78, altezza * 0.12 + banda * 0.56), outline=(240, 200, 40), width=3)
    d.text((banda / 2, altezza * 0.78), 'I', font=carattere(int(altezza * 0.3)), fill=(255, 255, 255), anchor='mm')
    d.rectangle((larghezza - banda, 0, larghezza, altezza), fill=(22, 52, 150))
    d.text(((larghezza + banda - banda) / 2 + 2, altezza / 2), 'CE 726 GP', font=carattere(int(altezza * 0.62)), fill=(18, 18, 20), anchor='mm')
    d.rectangle((2, 2, larghezza - 3, altezza - 3), outline=(20, 20, 20), width=3)
    return im


def nel_settore(gradi, settore):
    a, b = settore
    gradi = (gradi + 360.0) % 360.0
    a = (a + 360.0) % 360.0
    b = (b + 360.0) % 360.0
    return a <= gradi <= b if a <= b else gradi >= a or gradi <= b


def ripulisci_spalla(immagine, normale):
    """Ricostruisce i settori coi loghi dal profilo radiale mediano della spalla (che è un oggetto rotondo)."""
    im = immagine.convert('RGB')
    lato = im.size[0]
    pixel = im.load()
    centro = (lato - 1) / 2.0
    anelli = {}
    for y in range(lato):
        for x in range(lato):
            dx = x - centro
            dy = y - centro
            r = int(round(math.hypot(dx, dy)))
            if r == 0 or r > centro:
                continue
            fi = math.atan2(dy, dx)
            c = pixel[x, y]
            if normale:
                nx = c[0] / 127.5 - 1.0
                ny = c[1] / 127.5 - 1.0
                radiale = nx * math.cos(fi) + ny * math.sin(fi)
                tangente = -nx * math.sin(fi) + ny * math.cos(fi)
                anelli.setdefault(r, []).append((radiale, tangente, c[2]))
            else:
                anelli.setdefault(r, []).append(c)
    mediana = {}
    for r, valori in anelli.items():
        colonne = list(zip(*valori))
        mediana[r] = tuple(sorted(col)[len(col) // 2] for col in colonne)
    for y in range(lato):
        for x in range(lato):
            dx = x - centro
            dy = y - centro
            raggio = math.hypot(dx, dy)
            r = int(round(raggio))
            if r == 0 or r > centro or raggio / centro < RAGGIO_LOGHI[0]:
                continue
            gradi = math.degrees(math.atan2(dy, dx))
            if not any(nel_settore(gradi, s) for s in SETTORI_LOGHI):
                continue
            m = mediana[r]
            if normale:
                fi = math.atan2(dy, dx)
                nx = m[0] * math.cos(fi) - m[1] * math.sin(fi)
                ny = m[0] * math.sin(fi) + m[1] * math.cos(fi)
                pixel[x, y] = (int(round((nx + 1) * 127.5)), int(round((ny + 1) * 127.5)), int(m[2]))
            else:
                pixel[x, y] = tuple(int(v) for v in m)
    return im


def principale(sorgente, destinazione):
    documento, viste = leggi_glb(sorgente)
    for nodo in documento['nodes']:
        if nodo.get('name') == STEMMA_VOLANTE:
            nodo.pop('mesh', None)
    for materiale in documento['materials']:
        emissivo = materiale.get('emissiveTexture')
        if emissivo and documento['textures'][emissivo['index']]['source'] == IMMAGINE_TARGA:
            materiale.pop('emissiveTexture')
            materiale.pop('emissiveFactor', None)
    vecchia = immagine_di(documento, viste, IMMAGINE_TARGA)
    sostituisci(documento, viste, IMMAGINE_TARGA, png(targa(*vecchia.size)))
    sostituisci(documento, viste, IMMAGINE_SPALLA, png(ripulisci_spalla(immagine_di(documento, viste, IMMAGINE_SPALLA), False)))
    sostituisci(documento, viste, IMMAGINE_SPALLA_NORMALE, png(ripulisci_spalla(immagine_di(documento, viste, IMMAGINE_SPALLA_NORMALE), True)))
    occlusione = immagine_di(documento, viste, IMMAGINE_OCCLUSIONE).resize((LATO_OCCLUSIONE, LATO_OCCLUSIONE), Image.LANCZOS)
    sostituisci(documento, viste, IMMAGINE_OCCLUSIONE, png(occlusione))
    documento.setdefault('asset', {})['copyright'] = 'CarConcept: Eric Chadwick, Darmstadt Graphics Group (CC BY 4.0), da Free Concept Car 004 di Unity Fan (CC0); marchi tolti per Gran Premio di Cerano'
    scrivi_glb(destinazione, documento, viste)


if __name__ == '__main__':
    principale(sys.argv[1], sys.argv[2])

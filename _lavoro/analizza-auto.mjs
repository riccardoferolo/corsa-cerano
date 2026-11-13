import { readFileSync } from 'node:fs';

const file = process.argv[2];
const b = readFileSync(file);
const lJson = b.readUInt32LE(12);
const j = JSON.parse(b.subarray(20, 20 + lJson).toString());
const bin = b.subarray(20 + lJson + 8);
const triMesh = m => m.primitives.reduce((t, p) => t + (p.indices !== undefined ? j.accessors[p.indices].count / 3 : j.accessors[p.attributes.POSITION].count / 3), 0);
const dimensioni = im => {
  const v = j.bufferViews[im.bufferView];
  const d = bin.subarray(v.byteOffset ?? 0, (v.byteOffset ?? 0) + v.byteLength);
  if (d[0] === 0x89) return `${d.readUInt32BE(16)}x${d.readUInt32BE(20)} png`;
  let i = 2;
  while (i < d.length) {
    const m = d[i + 1];
    const l = d.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xc3) return `${d.readUInt16BE(i + 7)}x${d.readUInt16BE(i + 5)} jpg`;
    i += 2 + l;
  }
  return '?';
};
console.log('immagini');
(j.images ?? []).forEach((im, i) => console.log(` ${i} ${im.name ?? im.uri} ${Math.round(j.bufferViews[im.bufferView].byteLength / 1024)}KB ${dimensioni(im)}`));
console.log('materiali');
j.materials.forEach((m, i) => {
  const tex = [];
  const pbr = m.pbrMetallicRoughness ?? {};
  for (const [k, v] of Object.entries({ base: pbr.baseColorTexture, mr: pbr.metallicRoughnessTexture, nor: m.normalTexture, occ: m.occlusionTexture, emi: m.emissiveTexture })) if (v) tex.push(`${k}:${j.textures[v.index].source}`);
  console.log(` ${i} ${m.name} col=${(pbr.baseColorFactor ?? []).map(x => x.toFixed(2)).join(',')} met=${pbr.metallicFactor} rou=${pbr.roughnessFactor} ${m.alphaMode ?? ''} ${tex.join(' ')} ext=${Object.keys(m.extensions ?? {}).join(',')}`);
});
console.log('nodi');
const stampa = (n, prof) => {
  const nodo = j.nodes[n];
  const mesh = nodo.mesh !== undefined ? j.meshes[nodo.mesh] : null;
  const mat = mesh ? [...new Set(mesh.primitives.map(p => j.materials[p.material]?.name))].join('|') : '';
  const t = nodo.translation ? nodo.translation.map(x => x.toFixed(2)).join(',') : '';
  console.log(`${'  '.repeat(prof)}${n} ${nodo.name} ${mesh ? `tri=${Math.round(triMesh(mesh))} [${mat}]` : ''} ${t} ${nodo.rotation ? 'R' : ''}${nodo.scale ? 'S' : ''}`);
  for (const c of nodo.children ?? []) stampa(c, prof + 1);
};
for (const r of j.scenes[j.scene ?? 0].nodes) stampa(r, 0);
console.log('estensioni', j.extensionsUsed);
console.log('varianti', JSON.stringify(j.extensions?.KHR_materials_variants));

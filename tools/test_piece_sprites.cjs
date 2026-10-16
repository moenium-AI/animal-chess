'use strict';
// Loading failures must never publish a partial set. / 読み込み失敗時に一部の駒だけを切り替えない。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

async function check(failure) {
  let decodes = 0, atlasDraws = 0;
  class TestImage {
    constructor() { this.naturalWidth = failure === 'size' ? 1 : 1086; this.naturalHeight = 1448; }
    async decode() { decodes++; if (failure === 'decode') throw new Error('unavailable'); }
  }
  const document = { createElement(tag) {
    assert.equal(tag, 'canvas');
    const canvas = {width:0, height:0, dataset:{}};
    const ctx = {
      clearRect(){}, fillRect(){}, save(){}, restore(){}, scale(){}, translate(){},
      drawImage(source, ...args) {
        if (!(source instanceof TestImage)) return;
        atlasDraws++;
        if (failure === 'draw' && atlasDraws === 7) throw new Error('frame failed');
        const [sx,sy,sw,sh,x,y,w,h] = args;
        assert.ok(sx >= 0 && sy >= 0 && sx + sw <= source.naturalWidth && sy + sh <= source.naturalHeight);
        assert.ok(x >= 12 && y >= 12 && x + w <= canvas.width - 12 && y + h <= canvas.height - 12);
      },
    };
    canvas.getContext = () => ctx;
    return canvas;
  }};
  let miniatureRides = 0;
  const scene = { drawCarriage(canvas, frame, passenger) {
    assert.ok(passenger.width > 0);
    miniatureRides++;
  }};
  const context = vm.createContext({ document, Image:TestImage, MiniatureScene:scene, console:{warn(){}} });
  for (const file of ['sprite_data', 'piece_atlas', 'sprites']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', file + '.js'), 'utf8'), context);
  }
  const sprites = vm.runInContext('Sprites', context);
  const existing = sprites.makePiece('k', 'w');
  const legacy = sprites.makePiece('k', 'w', '3d');
  assert.equal(existing.dataset.render, 'pixel');
  const first = sprites.loadDetailed(), second = sprites.loadDetailed();
  assert.equal(first, second);
  assert.equal(await first, !failure);
  assert.equal(decodes, 1);
  for (const team of ['w', 'b']) for (const type of ['k', 'q', 'r', 'b', 'n', 'p']) {
    const piece = sprites.makePiece(type, team);
    assert.equal(piece.dataset.render, failure ? 'pixel' : 'miniature');
    assert.equal(piece.width, failure ? 26 : 256);
    sprites.redrawPiece(piece, true);
    assert.equal(piece.dataset.render, failure ? 'pixel' : 'miniature');
    const pixel = sprites.makePiece(type, team, '3d');
    assert.equal(pixel.dataset.render, 'pixel', '3D mode must retain original art after atlas decode');
    assert.equal(pixel.width, 26);
    sprites.redrawPiece(pixel, true);
    assert.equal(pixel.dataset.render, 'pixel');
  }
  sprites.redrawPiece(legacy, false);
  assert.equal(legacy.dataset.render, 'pixel');
  assert.equal(legacy.width, 26, 'existing legacy canvases must never upgrade');
  sprites.redrawPiece(existing, false);
  assert.equal(existing.width, failure ? 26 : 256);
  if (!failure) assert.equal(atlasDraws, 12, 'reuse decoded frames');
  const carriage = document.createElement('canvas');
  sprites.drawCarriage(carriage, 0, 'p', 'b', false);
  sprites.drawCarriage(carriage, 1, 'p', 'b', true);
  assert.equal(miniatureRides, 2);
  sprites.drawCarriage(carriage, 0, 'p', 'b', false, '3d');
  assert.equal(carriage.dataset.render, 'pixel');
  assert.equal(miniatureRides, 2, 'legacy carriage must not use miniature scenery');
}
(async () => {
  for (const failure of [null, 'decode', 'size', 'draw']) await check(failure);
  console.log('PASS: 12 bounded frames, cached decode, mode-specific canvas upgrade, atomic fallback, both carriages');
})().catch(error => { console.error(error); process.exitCode = 1; });

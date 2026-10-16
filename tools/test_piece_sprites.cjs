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
  const context = vm.createContext({ document, Image:TestImage, console:{warn(){}} });
  for (const file of ['sprite_data', 'piece_atlas', 'sprites']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', file + '.js'), 'utf8'), context);
  }
  const sprites = vm.runInContext('Sprites', context);
  const existing = sprites.makePiece('k', 'w');
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
  }
  sprites.redrawPiece(existing, false);
  assert.equal(existing.width, failure ? 26 : 256);
  if (!failure) assert.equal(atlasDraws, 12, 'reuse decoded frames');
  const carriage = document.createElement('canvas');
  sprites.drawCarriage(carriage, 0, 'p', 'b', false);
  sprites.drawCarriage(carriage, 1, 'p', 'b', true);
}
(async () => {
  for (const failure of [null, 'decode', 'size', 'draw']) await check(failure);
  console.log('PASS: 12 bounded frames, cached decode, existing canvas upgrade, atomic fallback, carriage');
})().catch(error => { console.error(error); process.exitCode = 1; });

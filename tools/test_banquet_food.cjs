'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../js/banquet_food.js'), 'utf8');
let image, draws = [];
class MockImage {
  constructor() { image = this; this.naturalWidth = 240; this.naturalHeight = 40; }
  set src(value) { assert.equal(value, 'assets/scenery/banquet-food-atlas.webp'); }
}
const document = {createElement(tag) {
  assert.equal(tag, 'canvas');
  return {width: 0, height: 0, dataset: {}, getContext(kind) {
    assert.equal(kind, '2d');
    return {drawImage(...args) { draws.push(args); }};
  }};
}};
const sandbox = {Image: MockImage, document};
vm.runInNewContext(source + '\nglobalThis.exported = BanquetFoodSprites;', sandbox);
const sprites = sandbox.exported;
assert.equal(sprites.frame('apple'), null, 'must return fallback before load');
image.onload();
for (const name of ['apple', 'cake', 'mug', 'meat', 'grapes', 'bread']) {
  assert.equal(sprites.frame(name).width, 40);
  assert.equal(sprites.frame(name).height, 40);
  assert.equal(sprites.frame(name).dataset.banquetFood, '1');
}
assert.equal(draws.length, 6);
assert.deepEqual(draws.map(call => call[1]), [0, 40, 80, 120, 160, 200]);
assert.equal(sprites.frame('table'), null);
console.log('banquet food sprite loader: PASS');

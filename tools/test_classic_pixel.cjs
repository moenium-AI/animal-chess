'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const source = fs.readFileSync(path.join(root, 'js/sprite_data.js'));
const signature = crypto.createHash('sha1')
  .update(Buffer.from('blob ' + source.length + '\0')).update(source).digest('hex');
assert.equal(signature, 'ace4720abdc83bd9c21a0a4e59043f4ce3390a15',
  'Classic piece art must match the user-provided 2026-10-17 release');
const sourceCalls = [];
const document = {
  createElement(tag) {
    assert.equal(tag, 'canvas');
    const c = {width:0, height:0, dataset:{}};
    c.getContext = () => ({
      fillRect(){}, clearRect(){}, save(){}, restore(){},
      translate(){}, scale(){},
      drawImage(source) {sourceCalls.push([source.width,source.height]);},
    });
    return c;
  }
};
const enhanced = {width:40,height:40,dataset:{banquetFood:'1'}};
const context = vm.createContext({
  document,
  console:{warn(){}},
  MiniatureScene:{itemCanvas(){return {width:100,height:100};},drawCarriage(){}},
  BanquetFoodSprites:{frame(name){return name==='apple'?enhanced:null;}},
  PixelHD:{makePiece(){return {width:40,height:52};}},
});
for(const file of ['sprite_data','sprites'])
  vm.runInContext(read('js/' + file + '.js'),context,{filename:file+'.js'});
const sprites = vm.runInContext('Sprites',context);
for(const team of ['w','b']) for(const type of ['k','q','r','b','n','p']){
  const classic=sprites.makePiece(type,team,'classic');
  assert.equal(classic.width,26);assert.equal(classic.height,34);
  assert.equal(classic.dataset.render,'pixel');
  assert.equal(classic.dataset.hd,'0');
  sprites.redrawPiece(classic,true);
  assert.equal(classic.dataset.blink,'1');
  assert.equal(classic.width,26);
  const hd=sprites.makePiece(type,team,'3d');
  assert.equal(hd.width,40);assert.equal(hd.height,52);
}
const originalApple=sprites.itemCanvas('apple','classic');
assert.equal(originalApple.width,8);
assert.equal(originalApple.height,8);
assert.strictEqual(sprites.itemCanvas('apple','3d'),enhanced);
const cart=document.createElement('canvas');
sprites.drawCarriage(cart,0,'p','w',false,'classic');
assert.equal(cart.width,38);assert.equal(cart.height,32);
sprites.drawCarriage(cart,1,'q','b',true,'classic');
assert.equal(cart.dataset.render,'pixel');
const app=read('js/app.js');
const html=read('index.html');
const css=read('css/style.css');
const i18n=read('js/i18n.js');
assert.match(app,/choose\('viewMode', \['3d', 'classic', 'miniature', 'simple'\]\)/);
assert.match(app,/const isClassicPixel/);
assert.match(app,/v\.classList\.toggle\('vclassic'/);
assert.match(app,/classList\.toggle\('mode-classic'/);
assert.match(app,/clearCarriages\(\);\s*settings\.viewMode = e\.target\.value; saveSettings\(\)/);
assert.match(html,/<option value="classic" data-i18n="settings.viewClassic">/);
assert.match(css,/\.venue\.v3d\.vclassic:not\(\.vmini\) \.venue-guests/);
assert.match(css,/\.mode-3d:not\(\.mode-classic\) \.p3d canvas/);
assert.match(i18n,/ドット絵 クラシック/);
assert.match(i18n,/Pixel Art Classic/);
console.log('PASS: 2026-10-17 sprites, classic modes, art, food, horse cart, persistence and localizations');

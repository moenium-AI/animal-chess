'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const original = fs.readFileSync(path.join(__dirname, '../js/royal_carriage.js'), 'utf8');
async function test(failure) {
  const draws = [], transforms = [];
  let requests = 0;
  class MockImage {
    constructor() {this.naturalWidth = failure === 'size' ? 15 : 512;this.naturalHeight=160;}
    async decode() {requests++;if(failure==='decode')throw Error('network');}
  }
  const canvas = {width:0,height:0,getContext:() => ({
    clearRect(){}, save(){}, restore(){},scale(x,y){transforms.push([x,y]);},translate(){},
    drawImage(...args){draws.push(args);},
  })};
  const context=vm.createContext({Image:MockImage, console:{warn(){}},document:{}});
  vm.runInContext(original, context);
  const api=vm.runInContext('RoyalCarriageSprites',context);
  assert.equal(api.ready(),false);
  assert.equal(api.draw(canvas,0,null,false),false);
  const p=api.load();assert.equal(api.load(),p);
  assert.equal(await p,!failure);
  assert.equal(requests,1);
  if(failure){assert.equal(api.draw(canvas,0,null,false),false);return;}
  assert.equal(api.ready(),true);
  for(let f=0;f<4;f++) {
    const old=draws.length;
    assert.equal(api.draw(canvas,f,{width:16,height:20},false),true);
    assert.equal(draws.length-old,3);
    assert.equal(draws[old][1],f*128);
    assert.equal(draws[old+2][2],80);
  }
  assert.equal(canvas.width,128);assert.equal(canvas.height,80);
  assert.equal(api.draw(canvas,4,null,true),true);
  assert.deepEqual(transforms, [[-1,1]]);
}
(async()=>{for(const mode of [null,'decode','size']) await test(mode);
 const css=fs.readFileSync(path.join(__dirname,'../css/style.css'),'utf8');
 const app=fs.readFileSync(path.join(__dirname,'../js/app.js'),'utf8');
 const startup=fs.readFileSync(path.join(__dirname,'../js/royal_sprite_start.js'),'utf8');
 assert.match(css,/pixel-art-loading \.mode-3d \.p3d canvas/);
 assert.match(app,/document\.documentElement\.classList\.add\('pixel-art-loading'\)/);
 assert.match(startup,/Promise\.allSettled\(\[art, carriage\]\)/);
 assert.match(startup,/classList\.remove\('pixel-art-loading'\)/);
 console.log('PASS: pixel carriage 4 frames, guest layering, direction, decode fallback and startup gate');
})().catch(e=>{console.error(e);process.exitCode=1});

'use strict';
// Approval gate for the six corrected 1254x1254 unindexed RGBA sheets.
// Fails intentionally if binary artwork has not yet been added to the PR.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '..');
const CELL = 627;
const HASHES = {
  k: '8876ca797a7085ae79acb17f5c458002342049de5121bb914242d240b27207ce',
  q: '0628ce6b4361356bee54e2996f52ed45ff15f00e4121ca3299ed702778c7bdaf',
  r: '9bcf674c95893016b39f35ea466a965102ec269a0729fe8a0505cc1bf6e31b63',
  b: '4823c87f7e6843d6337b47b6e6881292ccc7c42d3b6de499943bd7ccefc5712b',
  n: 'ef287f0613468fb44d680f176d0b9af801b714da4e56d75a302e85f2220b4bef',
  p: 'c40157cffd7418f14edb06f2beed1ea002320d36b525e84741da1474f6c9a21d',
};
const BLINK_Y = {
  k: [11,22], q: [6,6], r: [15,15],
  b: [16,15], n: [0,0], p: [22,21],
};

function decode(data) {
  assert.equal(data.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  let at=8, width=0, height=0, depth=0, type=-1;
  const idat=[];
  while(at<data.length){
    assert.ok(at+12<=data.length,'PNG chunk header');
    const n=data.readUInt32BE(at), tag=data.toString('ascii',at+4,at+8);
    assert.ok(at+n+12<=data.length,'PNG chunk bounds');
    const chunk=data.subarray(at+8,at+8+n);
    if(tag==='IHDR'){
      width=chunk.readUInt32BE(0);height=chunk.readUInt32BE(4);
      depth=chunk[8];type=chunk[9];
      assert.equal(chunk[12],0,'no interlacing');
    } else if(tag==='IDAT')idat.push(chunk);
    if(tag==='IEND')break;
    at+=n+12;
  }
  assert.equal(width,CELL*2);assert.equal(height,CELL*2);
  assert.equal(depth,8);assert.equal(type,6,'RGBA, no indexed palette');
  const inflated=zlib.inflateSync(Buffer.concat(idat));
  const stride=width*4;
  assert.equal(inflated.length,height*(stride+1));
  const boxes=[0,1,2,3].map(()=>({l:CELL,t:CELL,r:-1,b:-1,visible:0}));
  let previous=Buffer.alloc(stride), pos=0;
  for(let y=0;y<height;y++){
    const filter=inflated[pos++];
    assert.ok(filter<=4,'known PNG filter');
    const out=Buffer.alloc(stride);
    for(let i=0;i<stride;i++){
      const a=i>=4?out[i-4]:0,b=previous[i],c=i>=4?previous[i-4]:0;
      let predictor=0;
      if(filter===1) predictor=a;
      if(filter===2) predictor=b;
      if(filter===3) predictor=Math.floor((a+b)/2);
      if(filter===4) {
        const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);
        predictor=pa<=pb&&pa<=pc?a:pb<=pc?b:c;
      }
      out[i]=(inflated[pos++]+predictor)&255;
    }
    for(let x=0;x<width;x++){
      if(out[x*4+3]<=20)continue;
      const ci=(y>=CELL?2:0)+(x>=CELL?1:0);
      const q=boxes[ci],xx=x%CELL,yy=y%CELL;
      q.visible++;q.l=Math.min(q.l,xx);q.r=Math.max(q.r,xx);
      q.t=Math.min(q.t,yy);q.b=Math.max(q.b,yy);
    }
    previous=out;
  }
  for(const q of boxes){
    assert.ok(q.visible> CELL*CELL*.20 && q.visible<CELL*CELL*.75,'nonempty transparent sprite');
    assert.ok(q.l>0 && q.r<CELL-1 && q.t>=0 && q.b<CELL,'bounded sprite');
  }
  return boxes;
}
const records={};
for(const [type,expected] of Object.entries(HASHES)){
  const filename=path.join(ROOT,'assets','pixel_royal_hd',type+'.png');
  assert.ok(fs.existsSync(filename),'Missing approved binary asset: '+filename);
  const file=fs.readFileSync(filename);
  assert.equal(crypto.createHash('sha256').update(file).digest('hex'),expected,type+' source must match approved edit');
  const boxes=decode(file);
  for(let j=0;j<2;j++){
    const open=boxes[j], blink=boxes[j+2];
    assert.equal(open.b+1,blink.b+1+BLINK_Y[type][j],
      type+' '+(j?'black':'white')+' blink baseline');
    assert.ok(blink.t+BLINK_Y[type][j]>=0,'blink does not clip top');
    assert.ok(blink.b+BLINK_Y[type][j]<CELL,'blink does not clip bottom');
  }
  records[type]={bytes:file.length,cells:4};
}
const source=fs.readFileSync(path.join(ROOT,'js','sprites.js'),'utf8');
assert.ok(source.includes("if (style === 'miniature' && detailed)"),'miniature unaffected');
assert.ok(source.includes("if (style === '3d')"),'separate HD style');
assert.ok(source.includes('RoyalHDSprites.rider'),'HD carriage uses new portrait');
console.log(JSON.stringify({hdFrames:24,hdRiders:12,sourceResolution:CELL,
  unquantizedRGBA:'PASS',sourceIntegrity:'PASS',baseline:'PASS',records}));

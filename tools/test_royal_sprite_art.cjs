'use strict';
// Validate published Royal PNG pixels, geometry and the optional browser loader.
// No image libraries are required; handles the shipped indexed RGBA PNG format.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p));
function decodeIndexedPng(buffer) {
  assert.equal(buffer.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  let p=8,width,height,depth,type,colors=[],alpha=[],chunks=[];
  for(;p<buffer.length;) {
    assert.ok(p+12<=buffer.length);
    const n=buffer.readUInt32BE(p),tag=buffer.toString('ascii',p+4,p+8);
    assert.ok(p+n+12<=buffer.length, 'bounded PNG chunk');
    const data=buffer.subarray(p+8,p+8+n);
    if(tag==='IHDR') {width=data.readUInt32BE(0);height=data.readUInt32BE(4);depth=data[8];type=data[9];}
    else if(tag==='PLTE') colors=data;
    else if(tag==='tRNS') alpha=data;
    else if(tag==='IDAT') chunks.push(data);
    else if(tag==='IEND') { assert.equal(p+n+12,buffer.length);break; }
    p+=n+12;
  }
  assert.equal(depth,8);assert.equal(type,3);
  assert.equal(width,576);assert.equal(height,268);assert.ok(colors.length>=96);
  const raw=zlib.inflateSync(Buffer.concat(chunks));
  assert.equal(raw.length,height*(width+1));
  const rows=[],prev=Buffer.alloc(width);
  let at=0;
  for(let y=0;y<height;y++){
    const filter=raw[at++],out=Buffer.alloc(width);
    for(let x=0;x<width;x++){
      const value=raw[at++],a=x?out[x-1]:0,b=prev[x],c=x?prev[x-1]:0;
      let v=value;
      if(filter===1)v+=a;
      else if(filter===2)v+=b;
      else if(filter===3)v+=Math.floor((a+b)/2);
      else if(filter===4){
        const k=a+b-c,pa=Math.abs(k-a),pb=Math.abs(k-b),pc=Math.abs(k-c);
        v+= pa<=pb&&pa<=pc?a:pb<=pc?b:c;
      }else assert.equal(filter,0,'supported PNG row filter');
      out[x]=v&255;
    }
    rows.push(out);out.copy(prev);
  }
  function bbox(x0,y0,w,h) {
    let left=w,top=h,right=-1,bottom=-1;
    for(let y=0;y<h;y++) for(let x=0;x<w;x++){
      const idx=rows[y0+y][x0+x];
      if((alpha[idx]??255)<32)continue;
      if(x<left)left=x;if(x>right)right=x;
      if(y<top)top=y;if(y>bottom)bottom=y;
    }
    assert.ok(right>=left&&bottom>=top,'nonempty frame');
    return {left,top,right,bottom,width:right-left+1,height:bottom-top+1};
  }
  return {rows,bbox};
}

const pixel=decodeIndexedPng(read('assets/pixel_royal/royal_atlas.png'));
const areas={};
for(let index=0;index<6;index++){
  const kind=['k','k','q','q','p','p'][index],team=index%2?'b':'w';
  const key=kind+'|'+team;
  areas[key]=pixel.bbox(index*96,0,96,124);
  const closed=pixel.bbox(index*96,124,96,124);
  const rider=pixel.bbox(index*96,248,16,20);
  assert.ok(areas[key].left>=1&&areas[key].right<=94,key+' crosses X art margin');
  assert.ok(areas[key].top>=1&&areas[key].bottom<=122,key+' crosses Y art margin');
  assert.ok(closed.left>=1&&closed.right<=94,key+' blink art bounds');
  assert.ok(rider.left>=0&&rider.right<16&&rider.top>=0&&rider.bottom<20);
  let changed=false;
  for(let y=0;y<124;y++)for(let x=0;x<96;x++) if(pixel.rows[y][index*96+x]!==pixel.rows[y+124][index*96+x]) changed=true;
  assert.ok(changed,key+' blinking must visibly change artwork');
}
for(const team of ['w','b']){
  const king=areas['k|'+team],pawn=areas['p|'+team];
  assert.ok(pawn.width/king.width>=0.75&&pawn.width/king.width<=0.86,
    'pawn should be about 80% as wide as the king for '+team);
  assert.ok(pawn.height/king.height<=0.90,'pawn should be distinctly shorter '+team);
}


// New artwork lives in a separate atlas so the accepted k/q/p bitmap never
// gets re-quantized. New roles use the same column/row geometry.
const extra=decodeIndexedPng(read('assets/pixel_royal/royal_extra.png'));
for(let i=0;i<6;i++){
  const type=['r','r','b','b','n','n'][i],team=i%2?'b':'w',key=type+'|'+team;
  const open=extra.bbox(i*96,0,96,124);
  const closed=extra.bbox(i*96,124,96,124);
  const rider=extra.bbox(i*96,248,16,20);
  assert.ok(open.left>=3&&open.right<=92,key+' crosses horizontal safe margin');
  assert.ok(open.top>=8&&open.bottom<=120,key+' crosses vertical safe margin');
  assert.ok(closed.left>=3&&closed.right<=92,key+' blink outside safe margin');
  assert.ok(rider.left>=0&&rider.right<16&&rider.top>=0&&rider.bottom<20,key+' rider clipped');
  assert.ok(open.width>55&&open.height>67,key+' too small');
  assert.ok(rider.width>=10&&rider.height>=9,key+' rider face is undersized');
  let changed=false;
  for(let y=0;y<124;y++)for(let x=0;x<96;x++){
    if(extra.rows[y][i*96+x]!==extra.rows[y+124][i*96+x])changed=true;
  }
  assert.ok(changed,key+' lacks blink frame');
}

async function checkLoader(failure='none') {
  let decoded=0,draws=0,created=0,warns=0,patched=0;
  const scope=vm.createContext({
    console:{warn:()=>warns++},
    Image:class {
      _url='';
      set src(v){this._url=v;}
      get naturalWidth(){return failure==='extraSize'&&this._url.includes('royal_extra')?575:576;}
      get naturalHeight(){return 268;}
      async decode(){decoded++;if(failure==='extraDecode'&&this._url.includes('royal_extra'))throw new Error('decode');}
    },
    document:{createElement(tag){
      assert.equal(tag,'canvas');created++;
      return {width:0,height:0,getContext(){
        if(failure==='cropFailure'&&created===23)return null;
        return {imageSmoothingEnabled:false,
          clearRect(){},
          getImageData(x,y,w,h) {
            assert.ok(w===96||w===16);assert.ok(h===124||h===20);
            return {data:new Uint8ClampedArray(w*h*4)};
          },
          putImageData(image){patched++;assert.ok(image.data.length===96*124*4||image.data.length===16*20*4);},
          beginPath(){},moveTo(){},bezierCurveTo(){},stroke(){},
          drawImage(...args){
            draws++;assert.ok(args.length===9||args.length===3);
            if(args.length===9)assert.ok(args[1]>=0&&args[2]>=0&&args[3]>0&&args[4]>0);
          }
        };
      }};
    }}
  });
  vm.runInContext(read('js/royal_sprite_finish.js').toString('utf8'),scope);
  vm.runInContext(read('js/royal_sprite_loader.js').toString('utf8'),scope);
  const actual=await vm.runInContext('RoyalSpriteLoader.load()',scope);
  assert.equal(actual,failure==='none',failure);
  assert.equal(await vm.runInContext('RoyalSpriteLoader.load()',scope),actual);
  assert.equal(decoded,2,'each atlas decodes once');
  if(actual){
    assert.equal(created,42,'36 atlas crops plus 6 smiling-eye canvases');
    assert.equal(draws,42,'all six eyes start from the approved original source');
    assert.equal(patched,5,'three owl feather recolors and two horse iris removal passes');
    for(const type of ['k','q','p','r','b','n'])for(const team of ['w','b']){
      assert.equal(vm.runInContext("RoyalSpriteLoader.frame('"+type+"','"+team+"',true).height",scope),124);
      assert.equal(vm.runInContext("RoyalSpriteLoader.rider('"+type+"','"+team+"').width",scope),16);
    }
    assert.equal(vm.runInContext("RoyalSpriteLoader.frame('missing','w')",scope),null);
  }else{
    assert.ok(warns>=1);
    // A failure in the extra PNG must not leave the first three types visible.
    assert.equal(vm.runInContext("RoyalSpriteLoader.frame('k','w')",scope),null);
    assert.equal(vm.runInContext("RoyalSpriteLoader.frame('n','b')",scope),null);
  }
}
(async()=>{
  await checkLoader();
  await checkLoader('extraSize');
  await checkLoader('extraDecode');
  await checkLoader('cropFailure');
  // Test exact preservation for approved pieces and fail-fast dimensions for
  // supplementary sprites. The real browser run exercises Canvas 2D curves.
  const extraScope=vm.createContext({});
  vm.runInContext(read('js/royal_sprite_finish.js').toString('utf8'),extraScope);
  extraScope.a={width:96,height:124};
  extraScope.b={width:96,height:124};
  extraScope.c={width:16,height:20};
  const original=vm.runInContext("RoyalSpriteFinish.finish(a,b,c,'k','w')",extraScope);
  assert.equal(original.open,extraScope.a);
  assert.equal(original.closed,extraScope.b);
  assert.equal(original.rider,extraScope.c);
  assert.throws(()=>vm.runInContext("RoyalSpriteFinish.finish(a,{width:3,height:3},c,'n','b')",extraScope),
    /dimensions/);
  console.log(JSON.stringify({royalFrames:24,riders:12,
    whitePawnWidthRatio:+(areas['p|w'].width/areas['k|w'].width).toFixed(3),
    blackPawnWidthRatio:+(areas['p|b'].width/areas['k|b'].width).toFixed(3),
    geometry:'PASS',blinking:'PASS',atomicLoader:'PASS',fallback:'PASS'}));
})().catch(e=>{console.error(e);process.exitCode=1;});

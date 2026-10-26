'use strict';
// Exercise native 40x52 pixel drawing, closed eyes and complete fallback.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=name=>fs.readFileSync(path.join(__dirname,'../js',name+'.js'),'utf8');
function scene(fail=false){
  const pieces=[];
  const document={createElement(tag){
    assert.equal(tag,'canvas');
    const fills=[];
    const canvas={width:0,height:0,dataset:{},getContext(){
      if(fail && pieces.length===7)throw new Error('art context failed');
      return {
        fillStyle:'#000',fillRect(x,y,w,h){
          assert.ok(Number.isInteger(x)&&Number.isInteger(y)&&Number.isInteger(w)&&Number.isInteger(h));
          assert.ok(x>=0&&y>=0&&x+w<=canvas.width&&y+h<=canvas.height,'out-of-bounds HD art');
          if(w>0&&h>0)fills.push([x,y,w,h,this.fillStyle]);
        },
        clearRect(){},drawImage(){},save(){},restore(){},scale(){},translate(){},
      };
    },fills};
    pieces.push(canvas);return canvas;
  }};
  const ctx=vm.createContext({document,console:{warn(){}},Image:class{}});
  vm.runInContext(read('sprite_data'),ctx);
  vm.runInContext(read('pixel_hd'),ctx);
  return {ctx,pieces};
}
const s=scene();
for(const team of ['w','b'])for(const type of ['k','q','r','b','n','p']){
  const expr="PixelHD.makePiece('"+type+"','"+team+"',";
  const normal=vm.runInContext(expr+"false)",s.ctx);
  const closed=vm.runInContext(expr+"true)",s.ctx);
  for(const figure of [normal,closed]){
    assert.equal(figure.width,40);assert.equal(figure.height,52);
    assert.ok(figure.fills.length>100,type+' has insufficient sprite drawing');
  }
  assert.notDeepEqual(normal.fills,closed.fills,'blink must change eyes');
}
assert.equal(s.pieces.length,24);
assert.throws(()=>vm.runInContext("PixelHD.makePiece('invalid','w')",s.ctx),/Unknown HD piece/);
// An exception during the seventh HD canvas must revert all characters.
const bad=scene(true);
vm.runInContext(read('sprites'),bad.ctx);
const fallback=vm.runInContext("Sprites.makePiece('k','w','3d')",bad.ctx);
assert.equal(fallback.width,26);
assert.equal(fallback.dataset.render,'pixel');
const more=vm.runInContext("Sprites.makePiece('p','b','3d')",bad.ctx);
assert.equal(more.width,26);
console.log('PASS: 24 native frames, art bounds, blink and atomic legacy fallback');

// Native-resolution 40x52 pixel animals for Pixel art mode only.
// Miniature artwork and the legacy 26x34 fallback remain independent.
const PixelHD = (() => {
  'use strict';
  const W=40,H=52, roles=new Set(['k','q','r','b','n','p']);
  const colors={
    w:{cloth:'#b9575d',light:'#da7d7f',shade:'#803f49',trim:'#e5c38b',trimShade:'#98714a',boots:'#69493b',lining:'#f3e0bb'},
    b:{cloth:'#4c668c',light:'#7792b6',shade:'#303f62',trim:'#c7b17f',trimShade:'#807052',boots:'#494354',lining:'#d5d9db'},
  };
  const furs={
    k:{w:['#b96b31','#e9a55e','#f3c788','#70452c'],b:['#805239','#b97b4e','#d3a477','#4c3730']},
    q:{w:['#b89e82','#f1dec0','#fff0d8','#695b51'],b:['#77717b','#aaa7b1','#d9cdd2','#4b4756']},
    r:{w:['#806143','#b78a65','#d3aa83','#544335'],b:['#665a50','#8f7769','#b4a092','#453f3e']},
    b:{w:['#8e7053','#d2b28a','#efe0c1','#51443c'],b:['#635965','#9f8f99','#c9bec1','#43404a']},
    n:{w:['#866241','#be946d','#dbb28b','#554334'],b:['#695951','#9c8072','#c5a895','#484042']},
    p:{w:['#d39b45','#f3c56a','#ffe49b','#855d34'],b:['#97834b','#c9ae69','#ead397','#60553c']},
  };
  function dot(ctx,x,y,w,h,color){
    if(w<=0||h<=0)return;ctx.fillStyle=color;ctx.fillRect(x|0,y|0,w|0,h|0);
  }
  function oval(ctx,cx,cy,rx,ry,color){
    if(!(rx>0&&ry>0))return;
    for(let y=Math.ceil(cy-ry);y<=Math.floor(cy+ry);y++){
      const v=(y+.5-cy)/ry;if(Math.abs(v)>1)continue;
      const e=rx*Math.sqrt(1-v*v),a=Math.ceil(cx-e),b=Math.floor(cx+e);
      if(b>=a)dot(ctx,a,y,b-a+1,1,color);
    }
  }
  function poly(ctx,pts,color){
    const lo=Math.ceil(Math.min(...pts.map(p=>p[1]))),hi=Math.floor(Math.max(...pts.map(p=>p[1])));
    for(let y=lo;y<=hi;y++){
      const xs=[],at=y+.5;
      for(let i=0;i<pts.length;i++){
        const a=pts[i],b=pts[(i+1)%pts.length];
        if((a[1]<=at&&b[1]>at)||(b[1]<=at&&a[1]>at))
          xs.push(a[0]+(at-a[1])*(b[0]-a[0])/(b[1]-a[1]));
      }
      xs.sort((a,b)=>a-b);
      for(let i=0;i+1<xs.length;i+=2){
        const a=Math.ceil(xs[i]),b=Math.floor(xs[i+1]);if(b>=a)dot(ctx,a,y,b-a+1,1,color);
      }
    }
  }
  function line(ctx,x0,y0,x1,y1,color,thick=1){
    x0|=0;y0|=0;x1|=0;y1|=0;
    const dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1;
    let err=dx+dy;
    while(true){
      dot(ctx,x0-(thick>>1),y0-(thick>>1),thick,thick,color);
      if(x0===x1&&y0===y1)break;
      const e=2*err;if(e>=dy){err+=dy;x0+=sx;}if(e<=dx){err+=dx;y0+=sy;}
    }
  }
  function eyes(ctx,x1,x2,y,blink,ink,shine){
    if(blink){dot(ctx,x1,y,3,1,ink);dot(ctx,x2,y,3,1,ink);return;}
    dot(ctx,x1,y,3,3,ink);dot(ctx,x2,y,3,3,ink);
    dot(ctx,x1+1,y,1,1,shine);dot(ctx,x2+1,y,1,1,shine);
  }
  function outfit(ctx,c,role){
    dot(ctx,10,45,8,3,c.boots);dot(ctx,23,45,8,3,c.boots);
    poly(ctx,[[12,27],[28,27],[34,43],[31,46],[9,46],[6,43]],c.shade);
    poly(ctx,[[13,28],[27,28],[31,42],[29,44],[11,44],[9,42]],c.cloth);
    poly(ctx,[[12,29],[17,28],[15,43],[12,43],[10,41]],c.light);
    dot(ctx,11,44,18,1,c.trimShade);dot(ctx,12,43,16,1,c.trim);
    dot(ctx,19,31,2,12,c.lining);dot(ctx,18,32,1,8,c.trimShade);
    for(const y of [33,38,42])dot(ctx,20,y,1,1,c.trimShade);
    if(role==='k'||role==='q'){
      dot(ctx,15,28,10,2,c.trimShade);dot(ctx,16,28,8,1,c.trim);
      dot(ctx,20,35,2,2,c.trim);
    }
    if(role==='r'){
      dot(ctx,9,33,4,9,c.trimShade);dot(ctx,27,33,4,9,c.trimShade);
      dot(ctx,9,36,4,2,c.trim);dot(ctx,27,36,4,2,c.trim);
    }
    if(role==='b'){
      line(ctx,13,29,20,40,c.trim);line(ctx,27,29,21,40,c.trim);
    }
    if(role==='n'){
      dot(ctx,15,31,10,2,c.trimShade);dot(ctx,15,32,10,1,c.trim);
    }
    if(role==='p'){
      dot(ctx,13,35,14,3,c.trim);dot(ctx,14,38,12,1,c.trimShade);
    }
    oval(ctx,9,37,3,4,c.boots);oval(ctx,31,37,3,4,c.boots);
  }
  function crown(ctx,c){
    poly(ctx,[[12,14],[11,8],[15,10],[19,5],[22,10],[28,7],[27,14]],'#8f6a38');
    poly(ctx,[[13,13],[13,10],[16,12],[19,8],[22,12],[26,10],[26,13]],'#e4bd70');
    dot(ctx,13,14,14,2,'#684a37');dot(ctx,14,14,12,1,'#f0d290');
    dot(ctx,19,11,2,2,c.cloth);dot(ctx,15,11,1,1,'#fcf0ca');
  }
  function king(ctx,c,f,blink){
    const [shade,face,hi,ink]=f;
    oval(ctx,20,22,16,15,ink);oval(ctx,20,22,15,14,shade);
    oval(ctx,18,19,12,12,face);
    oval(ctx,12,17,4,7,shade);oval(ctx,28,18,5,7,shade);
    dot(ctx,9,20,3,7,hi);dot(ctx,29,20,3,5,shade);
    oval(ctx,20,23,11,9,hi);eyes(ctx,13,24,20,blink,ink,'#fff5dc');
    oval(ctx,20,27,7,4,face);dot(ctx,19,25,3,2,ink);dot(ctx,18,29,4,1,ink);
    dot(ctx,12,31,4,2,shade);dot(ctx,24,31,5,2,shade);crown(ctx,c);
  }
  function queen(ctx,c,f,blink){
    const [shade,face,hi,ink]=f;
    poly(ctx,[[7,18],[9,7],[17,13],[25,12],[32,7],[34,18],[29,29],[11,30]],ink);
    poly(ctx,[[10,18],[11,11],[17,16],[26,15],[30,11],[31,19],[29,27],[11,27]],shade);
    poly(ctx,[[12,15],[16,19],[25,18],[29,15],[28,26],[12,26]],face);
    dot(ctx,12,14,3,5,hi);dot(ctx,27,15,2,5,hi);
    oval(ctx,20,23,9,7,hi);eyes(ctx,13,24,21,blink,ink,'#fffbf0');
    dot(ctx,19,26,3,2,'#b87878');dot(ctx,16,28,2,1,ink);dot(ctx,22,28,2,1,ink);
    line(ctx,10,26,15,27,ink);line(ctx,25,27,30,26,ink);crown(ctx,c);
  }
  function rook(ctx,c,f,blink){
    const [shade,face,hi,ink]=f;
    oval(ctx,8,16,6,7,ink);oval(ctx,32,16,6,7,ink);
    oval(ctx,8,16,4,5,shade);oval(ctx,32,16,4,5,shade);
    oval(ctx,20,23,14,12,ink);oval(ctx,20,23,13,11,shade);
    oval(ctx,18,21,10,9,face);oval(ctx,16,17,5,3,hi);
    eyes(ctx,12,25,21,blink,ink,'#fff3df');
    oval(ctx,20,28,8,5,hi);dot(ctx,18,26,4,2,ink);dot(ctx,17,30,6,1,shade);
    dot(ctx,11,11,18,5,'#554e50');dot(ctx,12,8,4,7,'#a9a2a0');
    dot(ctx,18,9,5,5,'#bcb1a8');dot(ctx,25,8,4,7,'#a9a2a0');
    dot(ctx,11,15,18,2,c.trimShade);dot(ctx,17,15,6,1,c.trim);
  }
  function bishop(ctx,c,f,blink){
    const [shade,face,hi,ink]=f;
    poly(ctx,[[8,22],[10,10],[14,14],[20,11],[26,14],[30,10],[32,22],[28,31],[12,31]],ink);
    poly(ctx,[[10,22],[11,14],[15,17],[20,13],[25,17],[29,14],[30,22],[27,29],[13,29]],shade);
    oval(ctx,15,22,7,9,hi);oval(ctx,25,22,7,9,face);
    oval(ctx,15,22,5,6,'#ede0c3');oval(ctx,25,22,5,6,'#ede0c3');
    eyes(ctx,13,23,21,blink,ink,'#fff9ed');
    poly(ctx,[[19,26],[22,26],[20,30]],'#b88749');
    dot(ctx,10,28,3,3,shade);dot(ctx,27,28,3,3,shade);
    dot(ctx,19,8,3,4,c.trim);dot(ctx,19,11,3,1,c.trimShade);
  }
  function knight(ctx,c,f,blink){
    const [shade,face,hi,ink]=f;
    // Horse ears and a short flowing mane: no forked deer antlers, even if
    // the illustrated atlas fails and this deterministic fallback is used.
    poly(ctx,[[10,19],[11,9],[15,8],[19,19]],ink);
    poly(ctx,[[13,16],[13,11],[16,12],[17,18]],hi);
    poly(ctx,[[23,18],[25,9],[29,9],[30,21]],ink);
    poly(ctx,[[26,16],[27,12],[28,14],[28,18]],face);
    dot(ctx,10,18,5,3,shade);dot(ctx,9,21,4,4,ink);
    dot(ctx,8,24,4,3,shade);
    poly(ctx,[[9,24],[10,17],[16,13],[23,13],[31,18],[32,27],[27,32],[13,32]],ink);
    poly(ctx,[[11,22],[12,18],[16,15],[23,15],[29,20],[29,27],[25,30],[14,29]],shade);
    oval(ctx,19,23,10,9,face);dot(ctx,12,18,3,7,hi);
    oval(ctx,21,29,8,4,hi);dot(ctx,19,28,3,2,ink);
    eyes(ctx,13,24,21,blink,ink,'#fff9ee');
    dot(ctx,11,29,3,2,face);dot(ctx,27,27,3,2,shade);
  }
  function pawn(ctx,c,f,blink){
    const [shade,face,hi,ink]=f;
    oval(ctx,20,30,13,15,ink);oval(ctx,20,29,12,14,shade);
    oval(ctx,19,26,11,12,face);oval(ctx,17,21,6,5,hi);
    oval(ctx,8,33,4,7,face);oval(ctx,32,33,4,7,shade);
    eyes(ctx,13,24,23,blink,ink,'#fff2cb');
    poly(ctx,[[18,27],[23,27],[20,31]],'#b47740');
    dot(ctx,11,38,18,3,c.cloth);dot(ctx,12,40,16,2,c.trim);
    dot(ctx,15,13,4,3,shade);dot(ctx,19,12,3,4,hi);
  }
  function makePiece(type,team,blink=false){
    if(!roles.has(type)||!Object.hasOwn(colors,team))throw new TypeError('Unknown HD piece');
    const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
    const ctx=canvas.getContext('2d');if(!ctx)throw new Error('2D context unavailable');
    const c=colors[team],f=furs[type][team];
    oval(ctx,20,47,12,2,'rgba(30,27,29,.18)');
    if(type!=='p')outfit(ctx,c,type);
    ({k:king,q:queen,r:rook,b:bishop,n:knight,p:pawn})[type](ctx,c,f,blink);
    return canvas;
  }
  return {width:W,height:H,makePiece};
})();

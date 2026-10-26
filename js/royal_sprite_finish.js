// Final Pixel art expressions for rook, bishop and knight.
// Keep the approved king/queen/pawn frames and the carriage/banquet logic intact.
const RoyalSpriteFinish = (() => {
  'use strict';
  const W = 96, H = 124;
  const EYES = {
    r: {w: [[35,73,7,7],[59,73,7,7]], b: [[35,74,7,7],[59,74,7,7]]},
    b: {w: [[36,72,9,8],[61,72,9,8]], b: [[36,72,9,8],[61,72,9,8]]},
    n: {w: [[26,62,8,9],[47,59,9,9]], b: [[27,57,8,9],[49,55,9,9]]},
  };
  function image(ctx, w, h) {
    const im = ctx.getImageData(0, 0, w, h);
    if (!im || im.data.length !== w * h * 4) throw new Error('Incomplete pixel art image');
    return im;
  }
  const at = (a, w, x, y) => (y*w+x)*4;

  function tintOwl(c, small = false) {
    const w = c.width, h = c.height;
    if (w !== (small ? 16 : W) || h !== (small ? 20 : H))
      throw new Error('Unexpected bishop artwork dimensions');
    const ctx = c.getContext('2d', {willReadFrequently:true});
    if (!ctx) throw new Error('Cannot recolor bishop');
    const im = image(ctx, w, h), a = im.data;
    const xMin=small?1:20, xMax=small?14:80, yMin=small?4:52, yMax=small?16:90;
    for (let y=yMin; y<=yMax; y++) for (let x=xMin; x<=xMax; x++) {
      const p=at(a,w,x,y), r=a[p], g=a[p+1], b=a[p+2], alpha=a[p+3];
      if (alpha < 20 || Math.min(r,g,b) < 145 || Math.max(r,g,b)-Math.min(r,g,b)>50) continue;
      const radius=small ? 0 : Math.pow((x-48)/34,2)+Math.pow((y-72)/24,2);
      if (radius>=1) continue;
      const feather=small?1:Math.min(1,Math.max(0,(1-radius)/0.27));
      const strength=(small?0.36:0.64)*feather;
      a[p]=Math.round(r*(1-strength)+148*strength);
      a[p+1]=Math.round(g*(1-strength)+151*strength);
      a[p+2]=Math.round(b*(1-strength)+166*strength);
    }
    ctx.putImageData(im,0,0);
  }

  function horseEyes(ctx, positions) {
    // Reconstruct eyes from the clean OPEN frame. Never preserve the old pupils:
    // the earlier generated closed-eye frame covered cheeks but left pupils.
    const im=image(ctx,W,H), a=im.data;
    const source=new Uint8ClampedArray(a);
    function sample(x,y,channel) {
      const xx=Math.max(0,Math.min(W-1,Math.round(x)));
      const yy=Math.max(0,Math.min(H-1,Math.round(y)));
      return source[at(source,W,xx,yy)+channel];
    }
    for (const [cx,cy,rx,ry] of positions) {
      for(let y=cy-ry; y<=cy+ry; y++) for(let x=cx-rx; x<=cx+rx; x++){
        if ((x-cx)**2/rx**2 + (y-cy)**2/ry**2 > 1 || x<0 || x>=W || y<0 || y>=H) continue;
        const p=at(a,W,x,y);
        if(a[p+3]<10) continue;
        const v=Math.max(0,Math.min(1,(y-(cy-ry))/(2*ry)));
        for(let channel=0;channel<3;channel++){
          const top=sample(x,cy-ry-3,channel);
          const bottom=sample(x,cy+ry+3,channel);
          // A slight side sample retains the face's natural asymmetry without
          // borrowing the pupil. Pixel variance comes from the original fur.
          a[p+channel]=Math.round(top*(1-v)+bottom*v);
        }
      }
    }
    ctx.putImageData(im,0,0);
  }

  function smilingEyes(open, originalClosed, type, team) {
    if (!EYES[type] || (team!=='w' && team!=='b')) throw new Error('Unsupported blink variant');
    if (open.width!==W || open.height!==H || originalClosed.width!==W || originalClosed.height!==H)
      throw new Error('Unexpected blink art dimensions');
    const c=document.createElement('canvas');c.width=W;c.height=H;
    const ctx=c.getContext('2d',{willReadFrequently:true});
    if(!ctx) throw new Error('Cannot render blink');
    ctx.imageSmoothingEnabled=false;
    // The bear and owl already have pupils removed in their previous blink art.
    // The horse does not: it MUST start from the unmodified open-eye bitmap.
    ctx.drawImage(type==='n'?open:originalClosed,0,0);
    const eyes=EYES[type][team];
    if (type==='n') horseEyes(ctx,eyes);
    ctx.strokeStyle=(team==='b'?'#301f24':'#342224');
    ctx.lineCap='round';ctx.lineJoin='round';
    ctx.lineWidth=type==='r'?3:4;
    for(const [cx,cy,rx] of eyes){
      const half=rx-1, top=cy-(type==='r'?4:5), start=cy+2;
      ctx.beginPath();
      ctx.moveTo(cx-half,start);
      ctx.bezierCurveTo(cx-half+2,top-1,cx+half-2,top-1,cx+half,start);
      ctx.stroke();
    }
    return c;
  }

  function finish(open, closed, rider, type, team) {
    if (!Object.hasOwn(EYES,type)) return {open,closed,rider};
    if(type==='b' && team==='b') {
      tintOwl(open);
      tintOwl(closed);
      tintOwl(rider,true);
    }
    return {open,closed:smilingEyes(open,closed,type,team),rider};
  }
  return {finish};
})();
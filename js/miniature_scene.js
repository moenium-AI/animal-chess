// Scalable scenery, cached separately from the original pixel artwork. / 既存ドット絵と独立したミニチュア小物。
const MiniatureScene = (() => {
  'use strict';
  const cache = new Map();
  function canvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w * 2; c.height = h * 2;
    const ctx = c.getContext('2d');
    ctx.scale(2, 2);
    return [c, ctx];
  }
  function gradient(ctx, y, height, light, dark) {
    const g = ctx.createLinearGradient(0, y, 0, y + height);
    g.addColorStop(0, light); g.addColorStop(1, dark);
    return g;
  }
  function shape(ctx, path, fill, stroke = '#65442d', width = 1) {
    const p = new Path2D(path);
    ctx.fillStyle = fill; ctx.fill(p);
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(p); }
  }
  function oval(ctx, x, y, rx, ry, fill, stroke) {
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = fill; ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
  }
  function itemCanvas(name) {
    if (cache.has(name)) return cache.get(name);
    const sizes = {table:[220,76], meat:[44,32], cake:[32,40], mug:[28,36], apple:[28,32]};
    if (!Object.hasOwn(sizes, name)) throw new Error('Unknown miniature item: ' + name);
    const [c, ctx] = canvas(...sizes[name]);
    if (name === 'table') {
      oval(ctx, 110, 68, 101, 7, '#39261633');
      for (const x of [28, 180]) {
        shape(ctx, `M${x} 30h12l-2 37q-4 5-10 0Z`, gradient(ctx,30,38,'#b67b43','#67402a'));
      }
      shape(ctx, 'M13 27Q110 6 207 27L204 43Q110 65 16 43Z', gradient(ctx,27,26,'#9e6538','#573921'));
      shape(ctx, 'M10 22Q110 0 210 22Q222 29 208 34Q110 57 12 34Q0 29 10 22Z', gradient(ctx,6,38,'#d9ad73','#aa713f'), '#765037', 1.5);
      // Quiet grain and a linen runner. / 控えめな木目と麻のランナー。
      shape(ctx, 'M30 23Q110 8 188 23M24 30Q111 16 197 29', 'transparent', '#e9c38c', .7);
      shape(ctx, 'M80 9Q110 6 140 9L147 42Q110 49 73 42Z', gradient(ctx,9,36,'#fff3d9','#d8c7a5'), '#baa785', .7);
      shape(ctx, 'M80 13Q110 10 140 13M76 38Q110 44 144 38', 'transparent', '#bba17c', .7);
      for (const x of [48, 173]) {
        oval(ctx, x, 28, 15, 6, '#bdab88');
        oval(ctx, x, 26, 15, 6, '#fff4dc', '#cbb48b');
        oval(ctx, x, 26, 10, 3.5, '#eadbc0');
      }
    } else if (name === 'meat') {
      oval(ctx, 22, 27, 20, 4, '#68503b33');
      oval(ctx, 22, 24, 20, 6, '#f8edd7', '#cbb695');
      shape(ctx, 'M10 20Q7 9 21 8Q33 7 35 19Q31 26 10 20Z', gradient(ctx,8,17,'#d99b4a','#8a4827'));
      shape(ctx, 'M31 14L38 9Q42 3 43 8Q46 11 40 12L34 18Z', '#fff2d2', '#b89462');
      shape(ctx, 'M14 12Q21 9 28 13M16 16Q23 13 30 17', 'transparent', '#f1bc70', 1.2);
      for (const x of [6, 12, 35]) oval(ctx, x, 23, 3, 1.6, '#7c934c');
    } else if (name === 'cake') {
      oval(ctx, 16, 35, 15, 4, '#f9edd5', '#bea683');
      shape(ctx, 'M4 15L19 8L28 16L28 31L4 31Z', gradient(ctx,15,18,'#f4d59c','#c08a4d'));
      shape(ctx, 'M4 22H28V26H4Z', '#8e493c', null);
      shape(ctx, 'M4 15L19 8L28 16L4 19Z', '#fff7e3', '#d7ba91');
      oval(ctx, 17, 10, 4, 4.5, '#b94f41', '#8f3d33');
      shape(ctx, 'M16 7Q17 1 22 3', 'transparent', '#70844b', 1.5);
    } else if (name === 'mug') {
      oval(ctx, 13, 32, 11, 3, '#68503b26');
      shape(ctx, 'M18 12Q31 7 26 24Q23 28 18 25L19 21Q25 24 24 15Q23 12 19 16Z', '#cdac79', '#82613e');
      shape(ctx, 'M3 10H20L19 29Q11 34 4 28Z', gradient(ctx,10,21,'#f3dfb6','#b88c53'), '#8c6843');
      oval(ctx, 11.5, 10, 8.5, 3.5, '#fff1d3', '#9c7850');
      oval(ctx, 11.5, 10, 6.2, 2.2, '#85512e');
      shape(ctx, 'M7 15V25', 'transparent', '#fff3db', 1.6);
    } else {
      oval(ctx, 14, 28, 11, 3, '#68503b26');
      shape(ctx, 'M14 9C0 1 0 25 10 28Q14 26 17 28C30 25 29 1 14 9Z', gradient(ctx,6,23,'#e5905c','#a23832'), '#8c3d30');
      shape(ctx, 'M14 10Q13 4 17 2', 'transparent', '#674b30', 2);
      shape(ctx, 'M15 7Q19 0 25 5Q20 10 15 7', '#819451', '#596e3d');
      oval(ctx, 8, 14, 2, 4, '#ffe3b877');
    }
    cache.set(name, c);
    return c;
  }
  function drawCarriage(c, frame, passenger, faceLeft) {
    const w = 192, h = 112;
    if (c.width !== w * 2 || c.height !== h * 2) { c.width = w * 2; c.height = h * 2; }
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save(); ctx.scale(2, 2);
    if (faceLeft) { ctx.translate(w, 0); ctx.scale(-1, 1); }
    oval(ctx, 95, 102, 87, 6, '#3e2d2633');
    const wood = gradient(ctx,48,44,'#d3a36a','#82512f');
    // Passenger behind the cart's near wall. / 荷台の側板の奥に乗客を置く。
    if (passenger) {
      const fit = Math.min(69 / passenger.width, 69 / passenger.height);
      const pw = passenger.width * fit, ph = passenger.height * fit;
      ctx.drawImage(passenger, 14 + (69 - pw) / 2, 3 + frame + 69 - ph, pw, ph);
    }
    shape(ctx, 'M11 56L90 56L85 85Q49 94 17 83Z', wood, '#65432d', 2);
    shape(ctx, 'M12 55H91V62H12Z', '#e5bc80', '#805631');
    shape(ctx, 'M24 65V81M44 65V85M65 65V84M83 65L79 81', 'transparent', '#9a673c', 1.5);
    shape(ctx, 'M32 60H71V82H32Z', '#8a3733', '#c19b61');
    oval(ctx, 52, 71, 5, 6, '#d6b16d');
    shape(ctx, 'M87 77L132 74', 'transparent', '#755237', 4);
    for (const x of [27, 78]) {
      oval(ctx, x, 94, 11, 12, '#624730', '#3f3026');
      oval(ctx, x, 94, 8, 9, '#b88c57');
      ctx.save(); ctx.translate(x,94); ctx.rotate(frame * .4);
      shape(ctx, 'M-7 0H7M0-8V8M-5-6L5 6M-5 6L5-6', 'transparent', '#6c4b30', 1.3);
      ctx.restore(); oval(ctx, x, 94, 2.3, 2.8, '#e0bd7a');
    }
    // Carved toy pony with a leather harness. / 革のハーネスを付けた木彫りの仔馬。
    const step = frame ? 3 : 0;
    shape(ctx, `M131 65L128 ${96-step}H136L144 70M153 67L163 ${94+step}H171L163 65`, wood, '#68462e', 2);
    shape(ctx, 'M121 57Q106 44 107 73Q109 82 117 78Q111 65 121 65', '#594335', '#493528');
    shape(ctx, 'M119 55Q137 44 156 52L161 31L165 18L172 30L177 24L179 43L188 49Q192 58 183 61L169 57L166 73Q145 83 121 70Z', gradient(ctx,26,54,'#e2b880','#b27a45'), '#755030', 1.5);
    shape(ctx, 'M159 32L164 28L168 51L161 58L155 51Z', '#64503c', '#4a3c30');
    shape(ctx, 'M144 50L153 53L153 75L145 76Z', '#8a3733', '#bc965e');
    shape(ctx, 'M169 46L186 52', 'transparent', '#725139', 2);
    oval(ctx, 176, 41, 1.8, 2.2, '#302c29');
    oval(ctx, 185, 54, 1.2, 1.4, '#795239');
    ctx.restore();
  }
  return { itemCanvas, drawCarriage };
})();

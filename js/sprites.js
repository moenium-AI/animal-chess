// 3Dモード用スプライト描画エンジン
// SPRITE_DATA(sprite_data.js)のドット絵をcanvasに描く。
const Sprites = (() => {
  const TINT = [64, 68, 96];   // 黒チームの色調(寒色寄せ)
  const TINT_K = 0.25;
  const cache = {};            // key -> 描画済みcanvas

  const CW = SPRITE_DATA.meta.width;
  const CH = SPRITE_DATA.meta.height;

  function hex2rgb(h) {
    return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  }
  function tint(rgb) {
    return rgb.map((c, i) => Math.round(c * (1 - TINT_K) + TINT[i] * TINT_K));
  }

  // artをcanvasに描く(汎用)
  function drawArt(ctx, art, pal, opts = {}) {
    const { ox = 0, oy = 0, team = null, tinted = false, blink = false, blinkChar = 'f', scale = 1 } = opts;
    const p = Object.assign({}, pal);
    if (team && SPRITE_DATA.teams[team]) Object.assign(p, SPRITE_DATA.teams[team]);
    for (let y = 0; y < art.length; y++) {
      const row = art[y];
      for (let x = 0; x < row.length; x++) {
        let ch = row[x];
        if (ch === '.') continue;
        if (blink && (ch === 'e' || ch === 'E')) ch = blinkChar;
        const hex = p[ch];
        if (!hex) continue;
        let rgb = hex2rgb(hex);
        if (tinted && ch !== 'o' && ch !== 'e' && ch !== 'E' && ch !== 'W') rgb = tint(rgb);
        ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        ctx.fillRect(ox + x * scale, oy + y * scale, scale, scale);
      }
    }
  }

  function makeCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    return c;
  }

  // キャラのキャッシュ済みcanvas(open/closed)
  function charCanvas(type, team, blink = false) {
    const key = `${type}|${team}|${blink ? 'c' : 'o'}`;
    if (cache[key]) return cache[key];
    const def = SPRITE_DATA.chars[type];
    const c = makeCanvas(CW, CH);
    drawArt(c.getContext('2d'), def.art, def.pal, {
      team, tinted: team === 'b', blink, blinkChar: def.blinkChar || 'f',
    });
    cache[key] = c;
    return c;
  }

  function itemCanvas(name) {
    const key = `item|${name}`;
    if (cache[key]) return cache[key];
    const def = SPRITE_DATA.items[name];
    const w = def.art[0].length, h = def.art.length;
    const c = makeCanvas(w, h);
    drawArt(c.getContext('2d'), def.art, def.pal);
    cache[key] = c;
    return c;
  }

  // 盤面・宴会用: ピースcanvasを生成(まばたき差し替え可能)
  function makePiece(type, team) {
    const c = makeCanvas(CW, CH);
    c.dataset.type = type;
    c.dataset.team = team;
    redrawPiece(c, false);
    return c;
  }
  function redrawPiece(c, blink) {
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(charCanvas(c.dataset.type, c.dataset.team, blink), 0, 0);
  }

  // 馬車(乗客つき): frame 0/1
  function drawCarriage(c, frame, riderType, riderTeam, faceLeft) {
    const art = SPRITE_DATA.carriage.frames[frame % SPRITE_DATA.carriage.frames.length];
    const W = art[0].length, H = art.length;
    const PAD_TOP = 12;
    if (c.width !== W) { c.width = W; c.height = H + PAD_TOP; }
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    if (faceLeft) { ctx.translate(c.width, 0); ctx.scale(-1, 1); }
    // 乗客(荷台の上・下半身は荷台で隠れる)
    if (riderType) {
      ctx.drawImage(charCanvas(riderType, riderTeam, false), 2, 0, 15, 20);
    }
    drawArt(ctx, art, SPRITE_DATA.carriage.pal, { oy: PAD_TOP });
    ctx.restore();
  }

  const charName = (type) => SPRITE_DATA.chars[type].name;

  return { makePiece, redrawPiece, itemCanvas, drawCarriage, charName };
})();

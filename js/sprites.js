// Detailed characters with a pixel-art fallback. / 精細なキャラクターと読み込み失敗時のドット絵。
const Sprites = (() => {
  const TINT = [64, 68, 96];   // Dark-team cool tint. / 黒チームの寒色寄りの色調。
  const TINT_K = 0.25;
  const cache = {};            // key -> rendered canvas / key -> 描画済みcanvas
  let detailed = null, loading = null;

  const CW = SPRITE_DATA.meta.width;
  const CH = SPRITE_DATA.meta.height;

  function hex2rgb(h) {
    return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  }
  function tint(rgb) {
    return rgb.map((c, i) => Math.round(c * (1 - TINT_K) + TINT[i] * TINT_K));
  }

  // Draw art on canvas. / artをcanvasに描く（汎用）。
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

  // Decode once and publish all twelve frames together. / 一度だけデコードし、12駒をまとめて切り替える。
  function loadDetailed() {
    if (loading) return loading;
    loading = (async () => {
      try {
        const image = new Image();
        image.src = PIECE_ATLAS.url;
        await image.decode();
        if (image.naturalWidth !== PIECE_ATLAS.width || image.naturalHeight !== PIECE_ATLAS.height) {
          throw new Error('Unexpected piece atlas dimensions');
        }
        const frames = {};
        for (const team of ['w', 'b']) for (const type of ['k', 'q', 'r', 'b', 'n', 'p']) {
          const [x, y, w, h] = PIECE_ATLAS.frames[team][type];
          if (w <= 0 || h <= 0 || x < 0 || y < 0 || x + w > image.naturalWidth || y + h > image.naturalHeight) {
            throw new Error('Invalid piece atlas rectangle');
          }
          const scale = Math.min(PIECE_ATLAS.maxWidth / w, PIECE_ATLAS.heights[type] / h);
          const width = w * scale, height = h * scale;
          const frame = makeCanvas(PIECE_ATLAS.size, PIECE_ATLAS.size);
          const ctx = frame.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(image, x, y, w, h, (frame.width - width) / 2, PIECE_ATLAS.baseline - height, width, height);
          frames[`${type}|${team}`] = frame;
        }
        detailed = frames;
        return true;
      } catch (error) {
        console.warn('Detailed pieces unavailable; using pixel pieces.', error);
        return false;
      }
    })();
    return loading;
  }

  // Cached character canvas (open/closed eyes). / キャラクターのキャッシュ済みcanvas（目を開く・閉じる）。
  function charCanvas(type, team, blink = false, style = 'miniature') {
    if (style === 'miniature' && detailed) return detailed[`${type}|${team}`];
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

  function itemCanvas(name, style = '3d') {
    if (style === 'miniature') return MiniatureScene.itemCanvas(name);
    const key = `item|${name}`;
    if (cache[key]) return cache[key];
    const def = SPRITE_DATA.items[name];
    const w = def.art[0].length, h = def.art.length;
    const c = makeCanvas(w, h);
    drawArt(c.getContext('2d'), def.art, def.pal);
    cache[key] = c;
    return c;
  }

  // Create a piece canvas for the board or banquet; blinking can replace it. / 盤面・宴会用のピースcanvasを生成し、まばたきで差し替え可能にする。
  function makePiece(type, team, style = 'miniature') {
    const c = makeCanvas(CW, CH);
    c.dataset.type = type;
    c.dataset.team = team;
    c.dataset.style = style;
    redrawPiece(c, false);
    return c;
  }
  function redrawPiece(c, blink) {
    const source = charCanvas(c.dataset.type, c.dataset.team, blink, c.dataset.style);
    if (c.width !== source.width || c.height !== source.height) {
      c.width = source.width; c.height = source.height;
    }
    c.dataset.render = c.dataset.style === 'miniature' && detailed ? 'miniature' : 'pixel';
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(source, 0, 0);
  }

  // Carriage with passenger: frame 0/1. / 乗客付きの馬車: frame 0/1。
  function drawCarriage(c, frame, riderType, riderTeam, faceLeft, style = 'miniature') {
    if (style === 'miniature') {
      MiniatureScene.drawCarriage(c, frame, riderType ? charCanvas(riderType, riderTeam, false, style) : null, faceLeft);
      c.dataset.render = 'miniature';
      return;
    }
    const art = SPRITE_DATA.carriage.frames[frame % SPRITE_DATA.carriage.frames.length];
    const W = art[0].length, H = art.length;
    const PAD_TOP = 12;
    if (c.width !== W || c.height !== H + PAD_TOP) { c.width = W; c.height = H + PAD_TOP; }
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    if (faceLeft) { ctx.translate(W, 0); ctx.scale(-1, 1); }
    // Passenger on the cart; the lower body is hidden by the cart. / 荷台の上の乗客。下半身は荷台で隠れる。
    if (riderType) {
      const source = charCanvas(riderType, riderTeam, false, style);
      ctx.drawImage(source, 2, 0, 15, 20);
    }
    drawArt(ctx, art, SPRITE_DATA.carriage.pal, { oy: PAD_TOP });
    ctx.restore();
    c.dataset.render = 'pixel';
  }

  const charName = (type) => SPRITE_DATA.chars[type].name;

  return { makePiece, redrawPiece, itemCanvas, drawCarriage, charName, loadDetailed };
})();

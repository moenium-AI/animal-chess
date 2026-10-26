// High-resolution pixel-art sprites, restricted to style === '3d'.
// Native 627px RGBA cells are never resized, re-quantized or repainted here.
// Publish all 24 frames atomically; incomplete image sets retain royal fallback.
const RoyalHDSprites = (() => {
  'use strict';
  const CELL = 627, SHEET = 1254;
  const TYPES = ['k', 'q', 'r', 'b', 'n', 'p'];
  // Match the approved normal-frame foot baseline without resampling the art.
  const BLINK_Y = Object.freeze({
    k: {w: 11, b: 22}, q: {w: 6, b: 6},
    r: {w: 15, b: 15}, b: {w: 16, b: 15},
    n: {w: 0, b: 0}, p: {w: 22, b: 21},
  });
  let frames = null, riders = null, pending = null;

  function canvas(width, height) {
    const el = document.createElement('canvas');
    el.width = width;
    el.height = height;
    const ctx = el.getContext('2d', {willReadFrequently: true});
    if (!ctx) throw new Error('HD sprite canvas unavailable');
    return {el, ctx};
  }

  function frame(image, type, team, teamIndex, blinking) {
    const {el, ctx} = canvas(CELL, CELL);
    ctx.imageSmoothingEnabled = false;
    const offset = blinking ? BLINK_Y[type][team] : 0;
    ctx.drawImage(image, teamIndex * CELL, blinking ? CELL : 0,
      CELL, CELL, 0, offset, CELL, CELL);
    // Detect accidentally opaque backgrounds, empty crops and bad margins.
    const data = ctx.getImageData(0, 0, CELL, CELL).data;
    let visible = 0, left = CELL, right = -1, top = CELL, bottom = -1;
    for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++) {
      const alpha = data[(y * CELL + x) * 4 + 3];
      if (alpha <= 20) continue;
      visible++;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
    if (visible < CELL * CELL * 0.20 || visible > CELL * CELL * 0.75 ||
        left < 1 || right >= CELL - 1 || top < 1 || bottom >= CELL) {
      throw new Error('Invalid HD sprite transparency/bounds: ' + type + team);
    }
    return el;
  }

  function riderPortrait(source) {
    const {el, ctx} = canvas(16, 20);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    // Small cart passenger uses a head/torso portrait, not a 15px crop
    // from the left side of the 627px source frame.
    ctx.drawImage(source, 100, 88, 420, 500, 0, 0, 16, 20);
    return el;
  }

  function load() {
    if (pending) return pending;
    pending = (async () => {
      try {
        const sheets = await Promise.all(TYPES.map(async type => {
          const image = new Image();
          image.decoding = 'async';
          image.src = 'assets/pixel_royal_hd/' + type + '.png?v=1';
          await image.decode();
          if (image.naturalWidth !== SHEET || image.naturalHeight !== SHEET) {
            throw new Error('Invalid HD sheet dimensions: ' + type);
          }
          return image;
        }));
        const next = Object.create(null);
        const nextRiders = Object.create(null);
        for (let i = 0; i < TYPES.length; i++) {
          const type = TYPES[i];
          for (const [j, team] of ['w', 'b'].entries()) {
            const ordinary = frame(sheets[i], type, team, j, false);
            const closed = frame(sheets[i], type, team, j, true);
            next[type + '|' + team + '|o'] = ordinary;
            next[type + '|' + team + '|c'] = closed;
            nextRiders[type + '|' + team] = riderPortrait(ordinary);
          }
        }
        if (Object.keys(next).length !== 24 ||
            Object.keys(nextRiders).length !== 12) {
          throw new Error('HD sprite set is incomplete');
        }
        frames = next;
        riders = nextRiders;
        return true;
      } catch (error) {
        console.warn('HD pixel artwork unavailable; using royal fallback.', error);
        return false;
      }
    })();
    return pending;
  }

  const piece = (type, team, blinking = false) =>
    frames ? frames[type + '|' + team + '|' + (blinking ? 'c' : 'o')] || null : null;
  const rider = (type, team) => riders ? riders[type + '|' + team] || null : null;
  return {load, frame: piece, rider};
})();

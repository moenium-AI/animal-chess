// Optional high-resolution Pixel art set. All six 2x2 RGBA sheets must load
// before any frame becomes visible. The miniature renderer is independent.
const RoyalHDSprites = (() => {
  'use strict';
  const CELL = 627, SHEET = CELL * 2, DRAW = 320;
  const TYPES = ['k', 'q', 'r', 'b', 'n', 'p'];
  let frames = null, riders = null, pending = null;

  function makeCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    if (!ctx) throw new Error('HD pixel canvas unavailable');
    return {canvas, ctx};
  }

  function crop(sheet, teamIndex, blinkIndex) {
    const {canvas, ctx} = makeCanvas(DRAW, DRAW);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sheet, teamIndex * CELL, blinkIndex * CELL,
      CELL, CELL, 0, 0, DRAW, DRAW);
    const pixels = ctx.getImageData(0, 0, DRAW, DRAW).data;
    let visible = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 16) visible++;
    if (visible < DRAW * DRAW * 0.10 || visible > DRAW * DRAW * 0.90)
      throw new Error('Unexpected HD pixel alpha coverage');
    return canvas;
  }

  function sameAlpha(a, b) {
    const x = a.getContext('2d').getImageData(0, 0, DRAW, DRAW).data;
    const y = b.getContext('2d').getImageData(0, 0, DRAW, DRAW).data;
    for (let i = 3; i < x.length; i += 4) if (x[i] !== y[i]) return false;
    return true;
  }

  function portrait(source) {
    const {canvas, ctx} = makeCanvas(16, 20);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    // Face-and-head crop, not the first 15 source pixels of a huge frame.
    ctx.drawImage(source, 75, 30, 170, 215, 0, 0, 16, 20);
    return canvas;
  }

  function load() {
    if (pending) return pending;
    pending = (async () => {
      try {
        const sheets = await Promise.all(TYPES.map(async type => {
          const img = new Image();
          img.decoding = 'async';
          img.src = 'assets/pixel_royal_hd/' + type + '.png?v=1';
          await img.decode();
          if (img.naturalWidth !== SHEET || img.naturalHeight !== SHEET)
            throw new Error('Unexpected HD pixel sheet size: ' + type);
          return img;
        }));
        const next = Object.create(null), nextRiders = Object.create(null);
        TYPES.forEach((type, t) => {
          ['w', 'b'].forEach((team, j) => {
            const ordinary = crop(sheets[t], j, 0);
            const blink = crop(sheets[t], j, 1);
            if (!sameAlpha(ordinary, blink))
              throw new Error('Blink alpha differs from normal: ' + type + team);
            next[type + '|' + team + '|o'] = ordinary;
            next[type + '|' + team + '|c'] = blink;
            nextRiders[type + '|' + team] = portrait(ordinary);
          });
        });
        if (Object.keys(next).length !== 24 || Object.keys(nextRiders).length !== 12)
          throw new Error('Incomplete HD pixel sheet');
        frames = next;
        riders = nextRiders;
        return true;
      } catch (error) {
        console.warn('HD pixel sheets unavailable; preserving classic royal artwork.', error);
        return false;
      }
    })();
    return pending;
  }

  const frame = (type, team, blink = false) =>
    frames ? frames[type + '|' + team + '|' + (blink ? 'c' : 'o')] || null : null;
  const rider = (type, team) => riders ? riders[type + '|' + team] || null : null;
  return {load, frame, rider};
})();

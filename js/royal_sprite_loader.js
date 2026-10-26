// Pixel art mode: the original lion/cat/chick sheet and the complementary
// bear/owl/horse sheet. Both atlases must decode before any frame is published.
// This preserves existing approved art byte-for-byte and never mixes old/new
// artwork if one network request or a crop fails.
const RoyalSpriteLoader = (() => {
  'use strict';
  const WIDTH = 96, HEIGHT = 124, RIDER_WIDTH = 16, RIDER_HEIGHT = 20;
  const ATLAS_WIDTH = WIDTH * 6, ATLAS_HEIGHT = HEIGHT * 2 + RIDER_HEIGHT;
  const SOURCES = [
    {url:'assets/pixel_royal/royal_atlas.png?v=1', types:['k', 'q', 'p']},
    {url:'assets/pixel_royal/royal_extra.png?v=1', types:['r', 'b', 'n']},
  ];
  let frames = null, riders = null, pending = null;

  function crop(image, sx, sy, sw, sh) {
    if (sw <= 0 || sh <= 0 || sx < 0 || sy < 0 ||
        sx + sw > image.naturalWidth || sy + sh > image.naturalHeight) {
      throw new Error('Royal pixel crop outside atlas');
    }
    const c = document.createElement('canvas');
    c.width = sw; c.height = sh;
    const ctx = c.getContext('2d');
    if (!ctx) throw new Error('Royal art canvas is unavailable');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
    return c;
  }

  function load() {
    if (pending) return pending;
    pending = (async () => {
      try {
        const images = await Promise.all(SOURCES.map(async source => {
          const image = new Image();
          image.decoding = 'async';
          image.src = source.url;
          await image.decode();
          if (image.naturalWidth !== ATLAS_WIDTH ||
              image.naturalHeight !== ATLAS_HEIGHT) {
            throw new Error('Unexpected royal pixel atlas geometry');
          }
          return {image, types:source.types};
        }));

        const nextFrames = Object.create(null), nextRiders = Object.create(null);
        for (const {image, types} of images) {
          for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < 2; j++) {
              const col = i * 2 + j;
              const type = types[i], team = j ? 'b' : 'w', key = type + '|' + team;
              if (nextFrames[key + '|o']) throw new Error('Duplicate royal type');
              const open = crop(image, col * WIDTH, 0, WIDTH, HEIGHT);
              const closed = crop(image, col * WIDTH, HEIGHT, WIDTH, HEIGHT);
              const rider = crop(image, col * WIDTH, HEIGHT * 2, RIDER_WIDTH, RIDER_HEIGHT);
              // Finish all six of the newer expressions, even on cache misses.
              // Errors keep the entire preexisting PixelHD fallback, atomically.
              const polished = RoyalSpriteFinish.finish(open, closed, rider, type, team);
              nextFrames[key + '|o'] = polished.open;
              nextFrames[key + '|c'] = polished.closed;
              nextRiders[key] = polished.rider;
            }
          }
        }
        if (Object.keys(nextFrames).length !== 24 ||
            Object.keys(nextRiders).length !== 12) {
          throw new Error('Incomplete royal sprite set');
        }
        frames = nextFrames;
        riders = nextRiders;
        return true;
      } catch (error) {
        console.warn('Royal pixel artwork unavailable; using complete original sprite set.', error);
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

// Royal Pixel illustrations: selected lion, cat, and chick art, white and black.
// Entirely optional and limited to Pixel art mode; original PixelHD art is fallback.
const RoyalSpriteLoader = (() => {
  'use strict';
  const TYPES = ['k', 'q', 'p'];
  const TEAMS = ['w', 'b'];
  const WIDTH = 96, HEIGHT = 124, RIDER_WIDTH = 16, RIDER_HEIGHT = 20;
  const ATLAS_WIDTH = WIDTH * 6, ATLAS_HEIGHT = HEIGHT * 2 + RIDER_HEIGHT;
  const URL = 'assets/pixel_royal/royal_atlas.png?v=1';
  let frames = null, riders = null, pending = null;

  function crop(image, sx, sy, sw, sh) {
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
        const image = new Image();
        image.decoding = 'async';
        image.src = URL;
        await image.decode();
        if (image.naturalWidth !== ATLAS_WIDTH || image.naturalHeight !== ATLAS_HEIGHT) {
          throw new Error('Unexpected royal pixel atlas geometry');
        }
        const nextFrames = Object.create(null), nextRiders = Object.create(null);
        for (let i = 0; i < TYPES.length; i++) for (let j = 0; j < TEAMS.length; j++) {
          const col = i * 2 + j, type = TYPES[i], team = TEAMS[j];
          nextFrames[type + '|' + team + '|o'] = crop(image, col * WIDTH, 0, WIDTH, HEIGHT);
          nextFrames[type + '|' + team + '|c'] = crop(image, col * WIDTH, HEIGHT, WIDTH, HEIGHT);
          nextRiders[type + '|' + team] = crop(image, col * WIDTH, HEIGHT * 2, RIDER_WIDTH, RIDER_HEIGHT);
        }
        // No mixed partly-loaded characters: all 18 images publish in one step.
        frames = nextFrames;
        riders = nextRiders;
        return true;
      } catch (error) {
        console.warn('Royal pixel artwork unavailable; preserving original animals.', error);
        return false;
      }
    })();
    return pending;
  }

  const frame = (type, team, blink = false) =>
    frames ? frames[type + '|' + team + '|' + (blink ? 'c' : 'o')] || null : null;
  const rider = (type, team) => riders ? riders[type + '|' + team] || null : null;
  return { load, frame, rider };
})();

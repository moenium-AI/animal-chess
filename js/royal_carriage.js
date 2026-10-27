// Four-frame hand-authored pixel carriage, with a separate foreground panel.
// The horse/wheels and the captured animal are composited without per-frame
// network loads. A failed decode leaves the existing safe fallback available.
const RoyalCarriageSprites = (() => {
  'use strict';
  const W = 128, H = 80, FRAMES = 4;
  let atlas = null, pending = null;
  function load() {
    if (pending) return pending;
    pending = (async () => {
      try {
        const image = new Image();
        image.decoding = 'async';
        image.src = 'assets/scenery/royal-carriage-atlas.png?v=1';
        await image.decode();
        if (image.naturalWidth !== W * FRAMES || image.naturalHeight !== H * 2) {
          throw new Error('Unexpected pixel carriage atlas geometry');
        }
        atlas = image;
        return true;
      } catch (error) {
        console.warn('Pixel carriage artwork unavailable; using legacy cart.', error);
        return false;
      }
    })();
    return pending;
  }
  function draw(canvas, frame, passenger, faceLeft) {
    if (!atlas) return false;
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W; canvas.height = H;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const i = ((frame % FRAMES) + FRAMES) % FRAMES;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    if (faceLeft) { ctx.translate(W, 0); ctx.scale(-1, 1); }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(atlas, i * W, 0, W, H, 0, 0, W, H);
    if (passenger) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(passenger, 24, 9 + (i % 2), 28, 35);
    }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(atlas, i * W, H, W, H, 0, 0, W, H);
    ctx.restore();
    return true;
  }
  return {load, ready: () => atlas !== null, draw};
})();

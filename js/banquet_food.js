// Enhanced food sprites for the pixel banquet. Miniature props are unaffected.
const BanquetFoodSprites = (() => {
  'use strict';
  const size = 40;
  const columns = Object.freeze({apple: 0, cake: 1, mug: 2, meat: 3, grapes: 4, bread: 5});
  const frames = Object.create(null);
  let ready = false;

  if (typeof Image !== 'undefined') {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (image.naturalWidth !== size * 6 || image.naturalHeight !== size) return;
      const prepared = Object.create(null);
      for (const [name, column] of Object.entries(columns)) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(image, column * size, 0, size, size, 0, 0, size, size);
        canvas.dataset.banquetFood = '1';
        prepared[name] = canvas;
      }
      Object.assign(frames, prepared);
      ready = true;
    };
    // Gracefully fall back to built-in pixel sprites if the asset is unavailable.
    image.onerror = () => {};
    image.src = 'assets/scenery/banquet-food-atlas.webp';
  }

  return {
    frame(name) { return ready ? frames[name] || null : null; },
  };
})();

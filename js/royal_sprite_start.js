// On the initial paint, never expose temporary low-resolution royal pieces.
// Start both loads concurrently; the small carriage sprite also gets its first
// decode before the user can trigger the first capture.
if (typeof Sprites !== 'undefined' && typeof Sprites.loadRoyalArt === 'function') {
  const art = Sprites.loadRoyalArt();
  const carriage = typeof RoyalCarriageSprites !== 'undefined'
    ? RoyalCarriageSprites.load() : Promise.resolve(false);
  void Promise.allSettled([art, carriage]).then(() => {
    document.documentElement.classList.remove('pixel-art-loading');
  });
} else {
  document.documentElement.classList.remove('pixel-art-loading');
}

// Enhance only existing live Pixel art canvases; no game state is changed.
if (typeof Sprites !== 'undefined' && typeof Sprites.loadRoyalArt === 'function') {
  void Sprites.loadRoyalArt();
}

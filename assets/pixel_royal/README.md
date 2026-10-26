# Royal pixel sprite integration

This is the selected chibi animal artwork from the project's approved design
sheet, adapted for the existing **Pixel art** mode only.

- `royal_atlas.png`: 576 × 268 transparent indexed PNG, one local image.
- Columns 0–5: white/black lion king, white/black cat queen, white/black
  chick pawn.
- Rows 0–123: 96 × 124 open-eye frames.
- Rows 124–247: 96 × 124 closed-eye frames.
- Rows 248–267: 16 × 20 carriage rider portraits at each column's left edge.

### Size and safety

All 96 × 124 frames share identical canvas dimensions and foot alignment.
The actual chick figure was resized to **80%** of its source size and centered
against the same baseline; the king/queen were not stretched. Transparent
outside margins and the existing board's `overflow:hidden` prevent pieces from
overlapping adjacent squares. CSS `max-width/max-height:84%` provides a second
limit. The source remains sharper than 40 × 52, with smooth downsampling at
normal display size.

PNG colors are a restrained indexed palette for small download size; the
source package retains the full-resolution RGBA cutouts for further art edits.

`js/royal_sprite_loader.js` validates atlas geometry and publishes all 18
images in one step. If decoding or canvas creation fails, the shipped
`js/pixel_hd.js` animals continue to work. Rook, bishop and knight are
unmodified. Miniature and simple modes are unmodified.

### Acceptance and deferred changes

`node tools/test_royal_sprite_art.cjs` checks PNG geometry, transparent
margins, real pawn-to-king width ratio, blink differences, rider cells,
atomic load and failure fallback. The HTTP Playwright test checks the 96 × 124
actual canvases fit within squares and the pawn visual footprint.

The capture/carriage/banquet animations and existing food overlays are
unchanged. A full banquet-only eating artwork layer is **not** included,
because the concept illustration embeds food and would duplicate the
independent edible items already shown by the game.

The artwork is user-supplied/project-generated. No third-party online
asset is downloaded during runtime.

# Royal pixel art for Animal Chess

The six animal roles in **Pixel art** mode use two locally bundled sheets.
The original approved lion/cat/chick artwork remains byte-for-byte unchanged.

| File | Roles (left to right) | Image size |
| --- | --- | --- |
| `royal_atlas.png` | white lion, black lion, white cat, black cat, white chick, black chick | 576 × 268 PNG |
| `royal_extra.png` | white bear rook, black bear rook, white owl bishop, black owl bishop, white **anthropomorphic horse** knight, black horse knight | 576 × 268 PNG |

Each sheet has six 96px-wide columns. Rows y=0..123 are the ordinary 96×124 poses; rows y=124..247 are closed-eye variants; y=248..267 holds independent 16×20 carriage passengers at the left of each column. Alpha transparency is preserved. The PNG sources are indexed to reduce transfer size.

## Visual hierarchy

The chicks deliberately occupy roughly 80% of the king's visual width. The bear, owl and horse have approximately the king's height or less and fit inside a single chess square; all board canvases are constrained to at most 84% square width/height and their squares clip overflow. The horse is a **clothed, upright knight character**, not a four-legged horse or a deer. Its small ears, rounded muzzle and flowing mane preserve that identity.

The new extra sheet is derived from the user-approved six-figure art sheet, with the image's drawn checkerboard removed, opaque figures alpha-matted, and backgrounds left transparent. It is not a screenshot. Existing approved `royal_atlas.png` data was **not re-quantized** or overwritten.

## Loader and gameplay

`js/royal_sprite_loader.js` validates and decodes both PNGs before making any frame available. When one image fails to load, has incorrect dimensions, or canvas cropping fails, no partial royal art is published: all types fall back to the deterministic `js/pixel_hd.js` renderer. The fallback horse's branching antlers were changed to short horse ears.

**Finished artwork:** `royal_extra.png` now directly contains the six approved new
characters in both poses, including natural, bold smiling eyes, the darker
gray-faced black owl and the anthropomorphic horse knight. No JavaScript
per-pixel eye painting, cheek patch or feather tint runs during loading.
The two image atlases are independent of the Miniature mode assets
(`assets/pieces/miniature-atlas.png` and `js/piece_atlas.js`), which are
unchanged.

The same render path supplies:
- chessboard and promotion,
- carriage passengers (a separate 16×20 portrait), and
- banquet guests, blinking and sleeping.

The existing carriage trip, arrival sequencing, dining/drinking/sleeping animations, table, food layers, history and chess logic remain unchanged. Dedicated food-in-hand poses may be introduced separately after visual review; food is not baked into this first atlas to avoid double display.

## Validation

`node tools/test_royal_sprite_art.cjs` verifies both actual PNGs, alpha margins, portraits, closed eyes, chick relative size and two-image atomic loading (including invalid geometry, decode failure and canvas failure). Playwright's HTTP browser test confirms all twelve roles render from the royal images.

The user-approved original artwork files and editable per-sprite transparent PNGs are held in the authoring pack; runtime requires only the two local atlases. These are project-generated assets, not hotlinked external resources.

## Final integration (2026-10-26)

The six new closed-eye faces come from the approved original artwork, not
painted-on CSS strokes or `CanvasRenderingContext2D` retouching.
The loader crops the finished normal/blink/rider cells after PNG decode and
atomically publishes all 36 frames. Failure in either sheet leaves the
complete deterministic fallback unchanged. The original lion, cat and chick
atlas remains byte-for-byte unchanged. Only the Pixel art extra sheet changed.

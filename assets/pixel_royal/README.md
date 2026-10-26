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

**Horse blink correction:** The original generated closed-eye frames for the horse mistakenly painted over the cheek and mane. `js/royal_horse_blink.js` now rebuilds only those two frames from the approved open-eye art using RGB adjustments bounded to the two eyes; all other frames and carriage portraits remain unchanged. The invalid generated horse blink atlas cells are ignored at runtime. When source assets are next regenerated, bake this fix into the PNG atlas and remove the runtime compatibility patch.

The same render path supplies:
- chessboard and promotion,
- carriage passengers (a separate 16×20 portrait), and
- banquet guests, blinking and sleeping.

The existing carriage trip, arrival sequencing, dining/drinking/sleeping animations, table, food layers, history and chess logic remain unchanged. Dedicated food-in-hand poses may be introduced separately after visual review; food is not baked into this first atlas to avoid double display.

## Validation

`node tools/test_royal_sprite_art.cjs` verifies both actual PNGs, alpha margins, portraits, closed eyes, chick relative size and two-image atomic loading (including invalid geometry, decode failure and canvas failure). Playwright's HTTP browser test confirms all twelve roles render from the royal images.

The user-approved original artwork files and editable per-sprite transparent PNGs are held in the authoring pack; runtime requires only the two local atlases. These are project-generated assets, not hotlinked external resources.

## Matching the three original smiling blinks (2026-10-26)

The original king/cat/chick blink silhouettes are the visual reference: a bold,
curved, dark closed eye, not a faint thin lash or retained open pupil. The
`js/royal_sprite_finish.js` code now derives cheerful closed eyes for both
teams' bear, owl, and anthropomorphic horse. Horse blink starts from the intact
open-eye frame, so the previously faulty cheek overlay is never used. The
black-side owl receives a cooler, deeper gray facial feather shade (including
its guest blink and carriage thumbnail), but its gold/blue clothing and eyes
are protected. The three previously approved roles are untouched.

The source PNG `royal_extra.png` is kept as-is for binary compatibility in this
change; the loader performs a bounded canvas finishing pass before publishing
all frames atomically. When a final binary sprite atlas is committed, replace
the source with reviewed exported pixels and remove this finishing pass.

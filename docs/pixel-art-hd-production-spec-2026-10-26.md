# Pixel-art HD: production specification (2026-10-26)

## Goal
Refine **only the existing Pixel art mode**, internally `settings.viewMode === '3d'`.
Preserve the near-orthographic top-down chessboard and its exact 8x8 geometry.
**The capture story is essential:** a captured animal boards a pony carriage, rides to the hosting team's banquet hall, and then walks, eats, drinks, blinks, sleeps or lounges.
Do not replace that story with a static "captured pieces" list or an illustration that moves the banquet room elsewhere.

## Current source of truth (verified on main)
- `js/sprite_data.js`: 26x34 pixel characters (6 types), team palette, five banquet items, two pony-cart frames.
- `js/sprites.js`: `makePiece`, `redrawPiece`, `itemCanvas`, `drawCarriage`. These are shared by the board, promotion, banquet and carriage. Source pixels are cached.
- `js/app.js`: `createPieceEl`, `banquetSync`, `spawnGuest`, `setGuestState`, `carriageRide`, `clearCarriages`. The captured rider must remain hidden from the banquet until arrival; obsolete timers are invalidated when changing modes.
- `css/style.css`: board sprite height 84% of a square, banquet guests 40px wide, banquet panel 64px tall, table 110px wide, pixelated scaling, CSS animations for eat/drink/sleep/stroll.
- `miniature` uses the independent image atlas and scalable SVG scene. `simple` is a separate mode. Do not alter either mode.
- **Existing animals**: lion king, cat queen, bear rook, owl bishop, deer knight, chick pawn. Previous concept brainstorming suggested other animals; the initial art upgrade intentionally retains existing identities and names to avoid an unrelated gameplay/UX redesign.

## Pixel-art art direction
- Viewpoint remains overhead for the board; character tops and faces remain visible, with *restrained* volume in clothing and heads.
- Keep each role's silhouette and team identity readable when rendered at 40px wide in the banquet.
- Do not add extra furniture, plants, patterns, flags, glows or light sources as an automatic route to "higher quality".
- Use a single soft upper-left light and restrained palette. Let a quiet background support the figures.
- Character faces and silhouettes receive the extra pixels first; next come fabrics, crowns, and subdued material cues.
- Keep **white/red-ivory** and **black/navy-walnut** palettes as currently shipped. Do not switch to palette suggestions from unrelated full-scene concept images without review.

## Pixel-art native source contract (first pass)
| Art | Format | Size | Number |
| --- | --- | --- | --- |
| Character sprite | PNG RGBA with transparent background | **40 x 52 px** | 6 types x 2 teams = 12 |
| Banquet table | PNG RGBA | **80 x 28 px** | 1 |
| Banquet food: meat | PNG RGBA | **24 x 12 px** | 1 |
| Banquet food: cake | PNG RGBA | **20 x 14 px** | 1 |
| Banquet food: mug | PNG RGBA | **18 x 12 px** | 1 |
| Banquet food: apple | PNG RGBA | **16 x 16 px** | 1 |
- Keep character feet near source row 46. Shape and details must fit inside the canvas; no external bleed. The exact baseline can be fine-tuned once 32 pieces are previewed on a 320px viewport.
- One more shade in key forms is usually enough. Avoid covering the piece body with 1-pixel glitter or indiscriminate dither.
- **Do not merely resize 26x34 pixels** and call them finished: the starter pack contains tracing references only. The upgrade needs genuine manual pixel-level redesign.
- Produce open-eye and closed-eye variants (or a reliable reversible eye-state transformation) for banquet sleep and board blinking.

## Implementation architecture
1. **Art-only draft first.** Paint and review king, queen, knight, rook (2 teams) on a real 8x8 board screenshot. The first reference set is **not** shipped to users.
2. Keep current `SPRITE_DATA` as an uninterrupted fallback. Introduce a separately versioned, local `pixel-hd-atlas.png` (12 frames), an exact frame manifest, and an optional higher-detail banquet item atlas. PNG decoding happens once and all 12 frames are checked before they are published together; a partial or invalid atlas cannot replace some pieces.
3. Restrict the enhanced sprite path to `style === '3d'`. Use mode-qualified cache entries so `miniature` and classic pixel images cannot collide.
4. Existing element factory, a11y square labels, legal-move markers, promotion menu, animation state machine and capture progress should keep using the same interfaces. Do not change game state, IDs, FEN/SAN, storage or CPU/Worker logic.
5. **Carriage passenger crops must scale with the actual source dimensions.** Current legacy carriage draws the first 15x20 source pixels from 26x34 characters. Hard-coded source cropping cannot be reused against a 40x52 atlas; instead specify proportional crop/source rectangles (or a separate stable passenger view).
6. Keep the original banquet room geometry (64px tall) and guest motion/arrival logic. Furniture may be replaced with compatible transparent sprites, not a full-screen banquet illustration.
7. On bad or missing assets, return to the complete original pixel set without gameplay interruption, asynchronous stale updates, or mixed resolutions.

## Visual approval
- Start with comparisons at **actual on-screen size**, not only enlarged 8x preview. Check both teams and all six roles against the existing green/cream board.
- Character pixels should remain crisp at desktop and **320px / 390px** mobile widths, without touching adjacent squares. Distinguish black/white pieces even with subdued saturation.
- For the banquet check 0, 1, 8, 16 guests, varied orders, food items not covering faces, sleeping rotation inside hall bounds, and a captured guest not appearing until the carriage arrives.
- One visible motif for each role. King crown/mane, queen ears/crown, rook strong squared bulk, bishop round eyes, knight long antlers, pawn tiny silhouette.
- Compare rendered JPG/PNG screenshots from the current build against a candidate branch rather than approving sprite sheets in isolation.

## Automated acceptance and rollout
- `node tools/test_piece_sprites.cjs` and `node tools/test_graphics_lifecycle.cjs`.
- `node tools/test_course_expansion.cjs`, engine/Worker regression suite, real HTTP-served Playwright scenario.
- Add tests for decoding/validating **all** 12 pixel-HD source frames; failures must leave the original 3d sprites usable.
- Check 32 initial pieces, promotion, captured-piece carriage ride, undo/restart, board reversal, mode changes during carriage ride, blinking, eating/drinking/sleeping, and reduced-motion setting.
- Release as two narrow PRs after art review: (A) character artwork + renderer integration; (B) compatible banquet furniture/food art. Carriage illustration polishing comes last, and is optional.
- First PR here is *prep only* and must not change the published artwork until reviewed.

## Deliberately deferred
- Changing species identity (bear->elephant, deer->horse, chick->rabbit), if desired, should be decided separately. That affects labels, silhouette recognition and continuity of the banquet actors.
- Full hall recomposition, changing viewing angle, enlarging the banquet area, adding decorative spectators or a new animation system are out of scope.

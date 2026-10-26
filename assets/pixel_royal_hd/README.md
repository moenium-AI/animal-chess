# Approved HD pixel-art sprite set (2026-10-27)

Status: **all six approved binary sheets are committed to staging PR #48**.
Their Git blob IDs and SHA-256 values match the approved ZIP, and the HD integrity CI passes.

## Source files
Use `animal_chess_hd_approved_ready_to_copy.zip` from the ChatGPT
conversation. Unzip into the **repository root**, preserving these paths:

- `assets/pixel_royal_hd/k.png` lion king
- `assets/pixel_royal_hd/q.png` cat queen
- `assets/pixel_royal_hd/r.png` bear rook
- `assets/pixel_royal_hd/b.png` owl bishop
- `assets/pixel_royal_hd/n.png` anthropomorphic horse knight
- `assets/pixel_royal_hd/p.png` chick pawn

Every source is 1254×1254, 8-bit RGBA, two columns (white, black) and two
rows (normal, Blink). Each cell is 627×627 pixels, with **no palette
quantization**. The runtime keeps source-cell resolution, aligns Blink
baselines using integer translations and uses smooth visual scaling only
when the browser displays a small chess piece.

`tools/test_royal_hd_art.cjs` checks SHA-256 against the six reviewed
artworks, dimensions, PNG mode, alpha coverage and feet alignment. It
**intentionally fails** before the six PNG files have been added. Run:

```sh
node tools/test_royal_hd_art.cjs
node tools/test_royal_sprite_art.cjs
```

The change is isolated to Pixel art mode (`style === '3d'`). It does
not replace `assets/pieces/miniature-atlas.png`, its loader, chess
logic, venues, or carriage animations. If loading any of the six new
PNG files fails, all 24 HD frames are withheld and the complete
existing royal sprite set is used.

## Acceptance before merging
- Verify all six PNG files on the staging branch match approved source SHA-256.
- Pass the HD artwork test and existing sprite/unit suites.
- Visually test normal/blink, promotions, carriage rider, captured guests,
  dining, sleeping, board reversal, 320px mobile board and Miniature mode.
- Confirm GitHub Pages serves all six PNG assets without 404 errors.

Do **not** merge the staging PR while the new binary assets are absent.

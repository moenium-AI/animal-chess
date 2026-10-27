# Classic pixel art restoration (2026-10-27)

Original archive: `Animal_Chess_1017_006(1).zip` (original 2026-10-17 source).

The original `js/sprite_data.js` is already present in main, byte-for-byte
Git blob SHA `ace4720abdc83bd9c21a0a4e59043f4ce3390a15`. No replacement
binary or artwork is necessary.

- Existing `3d` mode is labelled Pixel Art HD (ドット絵 高精細).
- New `classic` mode uses 26×34 originals in `SPRITE_DATA.chars`.
- Original two-frame carriage and old pixel food are retained for classic mode.
- Restored simple banquet-room gradient, original table and lanterns for classic.
- The 94px venue height and contemporary game/AI/study code remain unchanged.
- Saved `viewMode: '3d'` stays HD without migration.
- The old art is deliberately visible immediately; the HD preload hiding rule
  applies only to high-resolution art.
- The mode switch keeps the game, move list and existing capture lifecycle.

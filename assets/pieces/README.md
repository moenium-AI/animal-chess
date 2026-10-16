# Miniature character atlas / ミニチュア駒の画像

Created on 2026-10-16 with the built-in `image_gen` tool, using the existing Miniature Kingdom proposal as a style reference. The complete production prompt is in [prompt.txt](prompt.txt).

2026-10-16に組み込みの `image_gen` で制作。既存のMiniature Kingdom案を画風の参考にした。[prompt.txt](prompt.txt)に実際のプロンプトを保存している。

- `miniature-atlas.png`: 1086 × 1448, RGBA, 1,644,513 bytes. Original generated alpha is preserved. / 生成された透過情報を保持。
- Twelve characters: lion king, cat queen, bear rook, owl bishop, horse knight, chick pawn, each in two teams. / 6種類×白黒の12駒。
- White: red and ivory, light base. Black: navy and walnut, dark base. Natural face colors stay bright. / 衣装と台座で白黒を区別し、顔の自然な色を保つ。
- The generator did not produce perfectly regular grid spacing. Verified source rectangles in `js/piece_atlas.js` address each figure individually. / 原画の間隔は完全な等間隔ではないため、確認した矩形を個別に定義。
- Each frame is fitted without stretching onto a cached 256 × 256 canvas, with a common baseline and per-role height. / 縦横比を保って256角に配置し、足元と種類ごとの高さを統一。
- These are static figurines; no closed-eye frames are supplied. Pixel-art fallback still supports blinking. / 精細画像は静止画。目を閉じたフレームは含まず、旧ドット絵のみまばたきに対応。
- Board, promotion, banquet guests, and carriage passenger share the same renderer. Miniature furniture, food and carriage use the scalable artwork in `js/miniature_scene.js`; the independent 3D mode retains all original pixel artwork. / 盤・昇格・宴会の動物・馬車の乗客で描画を共用。ミニチュアの家具・食事・馬車には拡大可能な描画を使い、独立した3Dモードでは従来のドット絵を保持。

Run `node tools/test_piece_sprites.cjs` to check caching, safe frame bounds, decode/dimension/frame failure fallback, and existing-canvas upgrades. Visual acceptance is recorded separately in [the implementation report](../../docs/miniature-pieces-2026-10-16.md).

上記コマンドでキャッシュ、描画範囲、読込・寸法・描画失敗時の代替表示、既存Canvasの切替を検査できる。実画面の確認は[実装記録](../../docs/miniature-pieces-2026-10-16.md)を参照。

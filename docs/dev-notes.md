# Development Notes

Notes for working on the code. You do not need to read this file just to play the game.

## File layout

| File | Purpose |
| --- | --- |
| `index.html` | Page layout |
| `css/style.css` | Styles, animations, and responsive layout (two columns ⇔ one column) |
| `js/chess.js` | Chess rules ([chess.js](https://github.com/jhlywa/chess.js) v0.13.4, BSD-2-Clause) |
| `js/engine.js` | AI engine (alpha-beta search + iterative deepening) and mate solver |
| `js/pieces.js` | Piece-set definitions for Simple mode |
| `js/sprite_data.js` | Pixel-art data for 3D mode, shared with the Python validation tools |
| `js/sprites.js` | Sprite renderer (canvas, team-color conversion, blinking, and carriage composition) |
| `js/bgm.js` | BGM generator (Web Audio, ten-song rotation) |
| `js/puzzles.js` | Puzzle data, generated after automatic validation with python-chess |
| `js/lessons.js` | Learn content (openings, combinations, and endgames), generated after validation |
| `js/i18n.js` | Japanese/English UI switching and message catalog |
| `js/puzzle_en.js` | English puzzle titles and ideas |
| `js/games.js` | Famous-game data with original annotations, generated after validating every move with python-chess |
| `js/app.js` | Main application (UI, games, PGN, puzzles, lessons, famous games, and presentation effects) |
| `tools/` | Validation and generation scripts described below |

The app makes no external network requests. Settings and puzzle progress are stored in `localStorage`.

## Run locally

```bash
python -m http.server 8420
# Open http://localhost:8420
```

## Editing pixel art (3D-mode characters)

Character art is defined in `js/sprite_data.js` as strings where one character represents one pixel.
The `pal` (palette) maps characters to colors. `A/L/D/a` and similar symbols represent team colors and are replaced automatically using the `teams` definitions.

After editing, render PNG previews with Python for visual inspection:

```bash
cd tools
python render_sprites.py   # Write all-character preview to sprites_preview.png
python mock_board.py       # Write a board mockup to board_mock.png
```

Change `meta.width` / `meta.height` to change character resolution (currently 26×34 px).
Change the hexadecimal colors in `teams` to update every character in a team.

## Adding puzzles

Add a FEN and expected move sequence to `CANDIDATES` in `tools/verify_puzzles.py` and run the script.
The python-chess solver verifies that each puzzle really mates and regenerates `js/puzzles.js`.

```bash
cd tools
python verify_puzzles.py ../js/puzzles.js
```

Requires `python-chess`: `python -m pip install python-chess`

## Adding famous games and lessons

Write the SAN moves and original annotations in the Python source, then validate every move with python-chess before generating JavaScript. **Do not copy other people's annotations; write all annotations independently.**

```bash
cd tools
python games_gen.py     # GAMES in tools/games_gen.py → js/games.js
python lessons_gen.py   # LESSONS in tools/lessons_gen.py → js/lessons.js
```

- Add famous games to `GAMES` with `moves=[(SAN, annotation), ...]`. The generator checks `+` / `#` against the actual position and also verifies that `#` is checkmate.
- Add famous-game translations to `tools/games_en.py` using the same ID. The generated `js/games.js` contains both Japanese and English data.
- Add lessons to `LESSONS` with `fen` (`None` for the standard initial position), `moves`, and `cat` (`opening` / `combo` / `endgame`). Add translations with the same ID in `tools/lessons_en.py`.
- Generation fails loudly when validation fails, so illegal moves are not silently published.

## Editing BGM

Define each song (notes, tempo, volume, and loop count) in the `SONGS` array in `js/bgm.js`.
Adjust overall volume with `MASTER_VOL`. The project generates audio with Web Audio and does not use external sound files.

## Layout

Adjust `--board-size` (board size) and `--side-w` (side-column width) in `:root` in `css/style.css`.
At 1099 px or less, the layout automatically switches to one column; the breakpoint is defined in the same `@media` block.

---

## 日本語

# 開発メモ

コードを変更するときのメモです。遊ぶだけなら読む必要はありません。

## ファイル構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | 画面レイアウト |
| `css/style.css` | スタイル・アニメーション・レスポンシブ対応（2列⇔1列） |
| `js/chess.js` | チェスのルール処理（[chess.js](https://github.com/jhlywa/chess.js) v0.13.4、BSD-2-Clause） |
| `js/engine.js` | AIエンジン（アルファベータ探索＋反復深化）・詰みソルバー |
| `js/pieces.js` | シンプルモードのピースセット定義 |
| `js/sprite_data.js` | 3Dモード用ドット絵データ。Python検証ツールと共有 |
| `js/sprites.js` | スプライト描画エンジン（canvas・チーム色変換・まばたき・馬車合成） |
| `js/bgm.js` | BGM生成（Web Audio・10曲ローテーション） |
| `js/puzzles.js` | パズルデータ。python-chessで自動検証して生成 |
| `js/lessons.js` | まなぶ教材（オープニング・コンビネーション・エンドゲーム）。検証して生成 |
| `js/i18n.js` | UIの日英切り替えとメッセージ辞書 |
| `js/puzzle_en.js` | パズルの英語タイトル・狙い |
| `js/games.js` | 名局データ。独自解説付きで、python-chessにより全手を検証して生成 |
| `js/app.js` | ゲーム本体（UI・対局・棋譜・パズル・まなぶ・名局・演出） |
| `tools/` | 下記の検証・生成スクリプト |

外部への通信はありません。設定とパズルのクリア状況は `localStorage` に保存されます。

## ローカルで動かす

```bash
python -m http.server 8420
# http://localhost:8420 を開く
```

## ドット絵を編集する（3Dモードのキャラクター）

キャラクターの絵は `js/sprite_data.js` に、1文字を1ピクセルとする文字列で定義しています。
`pal`（パレット）で文字と色を対応づけます。`A/L/D/a` などはチーム色を表し、`teams` の定義で自動的に置き換えます。

編集後は、PythonでPNGプレビューを生成して目視確認できます。

```bash
cd tools
python render_sprites.py   # 全キャラクター一覧を sprites_preview.png に出力
python mock_board.py       # 盤に並べた見え方を board_mock.png に出力
```

`meta.width` / `meta.height` を変えるとキャラクターの解像度を変更できます（現在は26×34px）。
`teams` の16進カラーを変えると、チーム全体のキャラクターに反映されます。

## パズルを追加する

`tools/verify_puzzles.py` の `CANDIDATES` にFENと想定手数を追記して実行します。
python-chessのソルバーが本当に詰むかを全問検証し、`js/puzzles.js` を再生成します。

```bash
cd tools
python verify_puzzles.py ../js/puzzles.js
```

`python-chess` が必要です: `python -m pip install python-chess`

## 名局・まなぶ教材を追加する

Python側にSANの指し手と独自解説を書き、python-chessで全手を検証してからJavaScriptを生成します。**他者の解説を転載せず、必ず独自に書いてください。**

```bash
cd tools
python games_gen.py     # tools/games_gen.py の GAMES → js/games.js
python lessons_gen.py   # tools/lessons_gen.py の LESSONS → js/lessons.js
```

- 名局は `GAMES` に `moves=[(SAN, 解説), ...]` を追記します。生成時に `+` / `#` と実際の局面を照合し、`#` は詰みも確認します。
- 名局の英訳は `tools/games_en.py` に同じIDで追加します。生成された `js/games.js` に日本語と英語の両方が埋め込まれます。
- 教材は `LESSONS` に `fen`（初期配置なら `None`）、`moves`、`cat`（`opening` / `combo` / `endgame`）を追加します。英訳は `tools/lessons_en.py` に同じIDで追加します。
- 検証に失敗した項目は生成時にエラーとなり、不正な手を混ぜたまま公開されません。

## BGMを編集する

`js/bgm.js` の `SONGS` 配列に、音符・テンポ・音量・ループ回数を含む曲を定義します。
全体音量は `MASTER_VOL` で調整します。外部音源ファイルは使わず、Web Audioで生成しています。

## レイアウト

`css/style.css` の `:root` にある `--board-size`（盤面サイズ）と `--side-w`（右列の幅）で調整します。
画面幅1099px以下では自動的に1列レイアウトへ切り替わります。ブレークポイントは同じ `@media` ブロックに定義されています。

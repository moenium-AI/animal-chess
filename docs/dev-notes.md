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
| `tools/puzzle_catalog.json` | Canonical bilingual puzzle data, answers, and continuation trees |
| `js/puzzles.js` | Generated puzzle data; validate with the JavaScript and independent Python checks |
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

The current Pixel art mode primarily uses the six approved full-color RGBA sheets in `assets/pixel_royal_hd/`, loaded through `js/royal_hd_loader.js`. Each 1254×1254 sheet contains four 627×627 cells (white/black × normal/blink). Keep original pixel data, transparency, and approved source hashes intact. The older `js/royal_sprite_loader.js`, `js/pixel_hd.js`, and `js/sprite_data.js` art remain fallbacks.

The legacy character art in `js/sprite_data.js` is defined as strings where one character represents one pixel.
The `pal` (palette) maps characters to colors. `A/L/D/a` and similar symbols represent team colors and are replaced automatically using the `teams` definitions.

After editing, render PNG previews with Python for visual inspection:

```bash
cd tools
python render_sprites.py   # Write all-character preview to sprites_preview.png
python mock_board.py       # Write a board mockup to board_mock.png
```

For the legacy fallback only, change `meta.width` / `meta.height` to change character resolution (currently 26×34 px).
Change the hexadecimal colors in `teams` to update every character in a team.

## Adding puzzles

Edit `tools/puzzle_catalog.json`. Keep each puzzle's ID stable and include its FEN,
objective (`mate` or `tactic`), all accepted SAN answers, continuation tree, and
Japanese/English explanations. One-move tactical challenges can have multiple
correct answers; they demonstrate a pattern, rather than guaranteeing a material gain.

Run these commands from the repository root. The Node builder generates both
language files. The Python verifier independently checks legality and complete,
shortest forced-mate trees without writing any generated files.

```bash
node tools/build_puzzles.cjs
node tools/build_puzzles.cjs --check
node tools/test_puzzle_quality.cjs
node tools/test_mate_solver.cjs
node tools/test_extended_tactics.cjs
node tools/audit_alternate_tactics.cjs
node tools/test_puzzle_alternatives.cjs
node tools/test_puzzle_navigation.cjs
node tools/test_learning_runtime.cjs
python -X utf8 tools/verify_puzzles.py
python -X utf8 tools/test_learning.py
```

Requires `python-chess`: `python -m pip install python-chess`

Optional browser checks use Playwright's managed Chromium on Windows, macOS or
Linux; no system-specific browser path is required:

```bash
python -m pip install playwright
python -m playwright install chromium
python -X utf8 tools/test_puzzle_navigation_browser.py
python -X utf8 tools/test_puzzle_alternatives_browser.py
```

These browser scripts inject the local HTML/JS for grading and navigation checks.
Also inspect the game over HTTP for asset loading and responsive appearance.
To use an installed Chrome instead of downloading managed Chromium, set
`ANIMAL_CHESS_BROWSER_CHANNEL=chrome` in the shell running the tests (PowerShell:
`$env:ANIMAL_CHESS_BROWSER_CHANNEL = 'chrome'`). This affects only the test browser.

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
| `tools/puzzle_catalog.json` | 日英の問題文・正解・継続手順をまとめた正本 |
| `js/puzzles.js` | 正本から生成したパズルデータ。JSと独立したPython検証で確認 |
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

現在のドット絵モードでは、`assets/pixel_royal_hd/` にある承認済みのRGBA画像6枚を主に使用します。`js/royal_hd_loader.js` が各1254×1254pxのシートから白黒×通常/Blinkの627×627pxセルを読み込みます。減色・不要な再生成・ハッシュ不一致を避け、旧ドット絵のフォールバックも保持してください。

従来のフォールバック画像は `js/sprite_data.js` に1文字を1ピクセルとする文字列で定義しています。
`pal`（パレット）で文字と色を対応づけます。`A/L/D/a` などはチーム色を表し、`teams` の定義で自動的に置き換えます。

編集後は、PythonでPNGプレビューを生成して目視確認できます。

```bash
cd tools
python render_sprites.py   # 全キャラクター一覧を sprites_preview.png に出力
python mock_board.py       # 盤に並べた見え方を board_mock.png に出力
```

旧フォールバックのみ、`meta.width` / `meta.height` を変えるとキャラクターの解像度を変更できます（現在は26×34px）。
`teams` の16進カラーを変えると、チーム全体のキャラクターに反映されます。

## パズルを追加する

`tools/puzzle_catalog.json` を編集します。固定ID、FEN、目的（`mate` または `tactic`）、
正解SANの全候補、継続手順、日英の説明を揃えてください。戦術の1手課題には複数の正解を
登録できます。戦術の形を作る練習であり、最善応手に対する駒得の保証とは区別します。

リポジトリのルートで以下を実行します。Nodeの生成器が日英のJSを生成し、Pythonの検証器は
生成物を書き換えず、合法性・最短詰み・全防御に対する継続手順を独立に検査します。

```bash
node tools/build_puzzles.cjs
node tools/build_puzzles.cjs --check
node tools/test_puzzle_quality.cjs
node tools/test_mate_solver.cjs
node tools/test_extended_tactics.cjs
node tools/audit_alternate_tactics.cjs
node tools/test_puzzle_alternatives.cjs
node tools/test_puzzle_navigation.cjs
node tools/test_learning_runtime.cjs
python -X utf8 tools/verify_puzzles.py
python -X utf8 tools/test_learning.py
```

`python-chess` が必要です: `python -m pip install python-chess`

ブラウザ検査は任意です。Windows・macOS・LinuxでPlaywright管理のChromiumを使用し、
特定のOSの実行ファイルパスには依存しません。

```bash
python -m pip install playwright
python -m playwright install chromium
python -X utf8 tools/test_puzzle_navigation_browser.py
python -X utf8 tools/test_puzzle_alternatives_browser.py
```

この2本はローカルのHTML・JSを直接読み込む方式で解答判定と移動を検査します。
画像の読み込みや画面幅ごとの表示は、HTTP配信した画面でも確認してください。
管理版Chromiumをダウンロードせず、インストール済みのChromeを使う場合は、実行する
シェルで `ANIMAL_CHESS_BROWSER_CHANNEL=chrome` を設定します。PowerShellでは
`$env:ANIMAL_CHESS_BROWSER_CHANNEL = 'chrome'` です。検査用ブラウザだけに適用されます。

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


---

## Recent validation / 最近の検証（2026-10-27）

The public `README.md` is intended for players. This document contains technical commands and links to the [changelog](CHANGELOG.md) and [dated research reports](./).

公開READMEから移した開発者向けの要点を以下にまとめます。日付のある詳細な監査結果はそれぞれの文書を参照してください。

### HD Pixel art / 高精細ドット絵

```sh
node --check js/royal_hd_loader.js
node --check js/sprites.js
node tools/test_royal_hd_art.cjs
node tools/test_royal_sprite_art.cjs
ANIMAL_CHESS_USE_HTTP=1 python tools/test_full_game_browser.py
```

The last test uses Playwright/Chromium and a local HTTP server; install Playwright and its browser first. The artifact test validates all six approved source SHA-256 values, RGBA format, nonempty transparent cells and Blink foot baselines. The browser suite verifies live 627px sprites, switching visual modes, promotion, banquet guests, carriage passengers and narrow screens.

実ブラウザ検査にはPlaywright/Chromiumが必要です。24フレーム・馬車用の12種類の画像、Blink、320pxの画面、昇格・宴会場の表示とモード分離を検証します。変更はドット絵モードだけに限定してください。

### Puzzle history / パズル関連

`tools/puzzle_catalog.json` is the source of truth. Generate both `js/puzzles.js` and `js/puzzle_en.js` with `node tools/build_puzzles.cjs`, then run the puzzle validation commands in the earlier **Adding puzzles / パズルを追加する** section. Independent Stockfish/python-chess reviews are in [puzzle Stockfish audit](puzzle-stockfish-audit-2026-10-24.md) and [alternate-answer audit](puzzle-answer-audit-2026-10-17.md). The 2026-10-17 title polish covered 55 Japanese/English puzzle titles; consult [puzzle title notes](puzzle-titles-2026-10-21.md).

パズルのクリア履歴は以前の形式と互換性のない更新があり、現行の記録は `animalchess_solved_v4` に保存されます。古い記録との互換性が必要な変更では、保存仕様を先に確認してください。

### AI research / AIの棋力検証

```sh
node tools/test_engine_search.cjs
node tools/test_ai_calibration.cjs
node tools/tournament_ai_levels.cjs --pair-mode adjacent --opening-indices 0,2,4,6,8,10 --budget-scale 0.12 --max-plies 96 --output matches.json
node tools/summarize_ai_tournament.cjs matches.json
```

- [Search reliability and test limitations](engine-search-and-balance-2026-10-24.md): repetition, 50-move rule, root scores, bounded time and checked positions.
- [AI self-play](ai-selfplay-2026-10-24.md): shortened-budget tournament with a ply cap. Elo-like estimates are **not** ratings for normal game settings.
- [AI calibration](ai-calibration-2026-10-24.md): levels 5–8 were conservatively tuned, without proof of monotonic strength. In a nine-position paired Stockfish 16 study, level 5 mean score loss was 116cp → 81cp; a 12-game reduced-time pilot was too small for reliable Elo claims.

These details are engineering observations, not promises about game difficulty. AI, chess logic, puzzle content and Miniature mode should not be changed as part of purely graphical edits.

これらの数値は研究時点の診断結果であり、実戦レーティングではありません。グラフィックのみの変更ではAI・チェスロジック・パズルやミニチュアモードに触れないでください。

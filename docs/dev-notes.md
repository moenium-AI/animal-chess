# 開発メモ

自分でコードをいじるとき用のメモ。遊ぶだけなら読む必要はありません。

## ファイル構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | 画面レイアウト |
| `css/style.css` | スタイル・アニメーション・レスポンシブ(2列⇔1列) |
| `js/chess.js` | チェスのルール処理 ([chess.js](https://github.com/jhlywa/chess.js) v0.13.4, BSD-2-Clause) |
| `js/engine.js` | AIエンジン(アルファベータ探索+反復深化)・詰みソルバー |
| `js/pieces.js` | ピースセット定義(シンプルモード) |
| `js/sprite_data.js` | 3Dモード用ドット絵データ(JSON形式・Python検証ツールと共有) |
| `js/sprites.js` | スプライト描画エンジン(canvas・チーム色変換・まばたき・馬車合成) |
| `js/bgm.js` | BGM生成(Web Audio・5曲ローテーション) |
| `js/puzzles.js` | パズルデータ(python-chess で自動検証して生成) |
| `js/lessons.js` | まなぶ教材(オープニング/コンビネーション/エンドゲーム。検証して生成) |
| `js/games.js` | 名局データ(独自解説つき。python-chess で全手検証して生成) |
| `js/app.js` | ゲーム本体(UI・対局・棋譜・パズル・まなぶ・名局・おもてなし演出) |
| `tools/` | 検証用スクリプト(下記) |

外部への通信は一切なし。設定とパズルのクリア状況は localStorage に保存。

## ローカルで動かす

```bash
python -m http.server 8420
# → http://localhost:8420 を開く
```

## ドット絵をいじる (3Dモードのキャラ)

キャラの絵は `js/sprite_data.js` にドット絵の文字列(1文字=1ピクセル)で定義。
色は `pal`(パレット)で文字→色を対応づけ。`A/L/D/a` などはチーム色で、
`teams` の定義で白(赤系)・黒(青系)に自動で差し替わる。

編集したら、Pythonで画像化して目視確認できる:

```bash
cd tools
python render_sprites.py   # 全キャラ一覧を sprites_preview.png に出力
python mock_board.py       # 盤に並べた見え方を board_mock.png に出力
```

`meta` の `width`/`height` を変えるとキャラの解像度を変更できる(現在 26×34px)。
チーム色は `teams` の16進カラーを変えるだけで全キャラに反映される。

## パズルを追加する

`tools/verify_puzzles.py` の `CANDIDATES` にFENと想定手数を追記して実行すると、
python-chess のソルバーで「本当に詰むか」を全数検証し、`js/puzzles.js` を再生成する。

```bash
cd tools
python verify_puzzles.py ../js/puzzles.js
```

`python-chess` が必要: `python -m pip install python-chess`

## 名局・まなぶ教材を追加する

いずれも指し手(SAN)と独自解説を Python 側に書き、python-chess で一手ずつ合法手を
検証してから JS を生成する。**他者の解説の転載は禁止。解説は必ず独自に書く。**

```bash
cd tools
python games_gen.py     # tools/games_gen.py の GAMES → js/games.js
python lessons_gen.py   # tools/lessons_gen.py の LESSONS → js/lessons.js
```

- 名局は `GAMES` に `moves=[(SAN, 解説), ...]` を追記。`#` で終わる手は詰みも自動確認される。
- 教材は `LESSONS` に `fen`(初期配置なら None)＋ `moves` ＋ `cat`(opening/combo/endgame)。
- 検証に失敗した項目は生成時にエラーで知らせる(不正な手を混ぜたまま公開しない)。

## BGMをいじる

`js/bgm.js` の `SONGS` 配列に1曲ずつ定義(音符・テンポ・音量・ループ回数)。
`MASTER_VOL` で全体音量を調整。外部音源ファイルは使わず Web Audio で生成している。

## レイアウト

`css/style.css` の `:root` にある `--board-size`(盤面サイズ)と `--side-w`(右列の幅)で調整。
画面幅 1099px 以下で自動的に縦1列レイアウトに切り替わる(同じく `@media` 内で定義)。

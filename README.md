# 🐻 どうぶつチェス (Animal Chess)

かわいい動物のピースで遊べるブラウザチェスゲームです。
サーバー不要・すべてブラウザ内で動くので、GitHub Pages で無料公開できます。

## ✨ 機能

- **ピースデザイン切り替え** — クラシック(通常のチェス駒)+ 動物セット4種類
  - 🐻 森のなかま / 🐳 うみのなかま / 🐶 まきばのなかま / 🦁 サバンナのなかま
- **コンピューター対戦** — 強さレベル1〜5(アルファベータ探索エンジン内蔵)
- **ふたりで遊ぶ** — 同じ画面で交互に操作
- **💡 ヒント機能** — 次の一手をAIがアドバイス
- **📜 棋譜(PGN)読み込み** — 貼り付け/ファイル読み込み、再生、途中局面から対局再開、棋譜コピー
- **🧩 チェスパズル** — 1手詰め・2手詰め全16問(ソルバーで詰みを全数検証済み)
- **🐴 おもてなし演出** — 動物ピース使用時、取られた動物は馬車に乗って相手チームの
  「おもてなし会場」へ。おいしい食べ物でおもてなしされます🍰

## 🎮 遊び方

`index.html` をブラウザで開くだけ。インストール不要です。

ローカルで開発サーバーを立てる場合:

```bash
python -m http.server 8420
# → http://localhost:8420 を開く
```

## 🌐 GitHub Pages で公開する

1. GitHub で新しいリポジトリを作る(例: `animal-chess`)
2. このフォルダをプッシュ:
   ```bash
   git remote add origin https://github.com/<ユーザー名>/animal-chess.git
   git push -u origin main
   ```
3. リポジトリの **Settings → Pages** を開き、
   **Source: Deploy from a branch / Branch: main / (root)** を選んで保存
4. 数分後 `https://<ユーザー名>.github.io/animal-chess/` で公開されます🎉

## 🛠 構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | 画面レイアウト |
| `css/style.css` | パステル調スタイル・アニメーション |
| `js/chess.js` | チェスのルール処理 ([chess.js](https://github.com/jhlywa/chess.js) v0.13.4, BSD-2-Clause) |
| `js/engine.js` | AIエンジン(アルファベータ探索+反復深化)・詰みソルバー |
| `js/pieces.js` | ピースセット定義 |
| `js/puzzles.js` | パズルデータ(python-chess で自動検証して生成) |
| `js/app.js` | ゲーム本体(UI・対局・棋譜・パズル・おもてなし演出) |

外部への通信は一切ありません。設定とパズルのクリア状況は localStorage に保存されます。

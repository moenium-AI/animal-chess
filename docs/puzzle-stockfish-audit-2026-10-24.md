# Stockfishによる独立パズル監査

正式な出題評価は `tools/puzzle_catalog.json` と既存の全防御メイト検証を用いる。
追加の `tools/audit_stockfish.cjs` は独立したUCIエンジンによる補助監査であり、棋力面の問題候補を抽出する。

## 実行

Stockfish本体はゲームや配布ZIPには同梱しない。公式ダウンロード: https://stockfishchess.org/download/

```sh
node tools/test_stockfish_audit.cjs
node tools/audit_stockfish.cjs --engine /usr/games/stockfish --depth 18 --mate-depth 20 --threshold-cp 250 --output stockfish-audit.json --report-only
```

Windowsでは `--engine "C:\\path\\to\\stockfish.exe"` を指定する。
GitHub ActionsはPRとmainへの変更時にStockfishをUbuntuへ導入して全80問を評価し、監査JSONを `stockfish-puzzle-audit` アーティファクトへ保存する。

## 警告の解釈

- `tactic_allows_forced_mate`: 登録正解を指した側が、解析範囲で強制メイトされる。
- `tactic_move_below_best`: 登録正解手がエンジンの最善手より設定した閾値を超えて低評価。テーマ問題では正解の形が成立している可能性もある。
- `engine_mate_longer_than_advertised`, `mate_solution_disagrees`: 有限探索の詰み手数と教材の設定が不一致。既存の厳密な全分岐探索とも照らし合わせる。
- `mate_not_verified_at_depth`: この深さではエンジンが強制メイトを検出できなかった。

警告があっても自動的に問題データは書き換えない。Stockfish単独では教材としての適切さとすべての合法な別解を証明できない。

初回解析結果は [調査メモ](puzzle-stockfish-review-2026-10-24.md) を参照。

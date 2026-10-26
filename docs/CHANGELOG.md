# Changelog / 開発履歴

Animal Chess の主な変更を時系列でまとめています。日々の細かな修正や検証結果の原文は、[merged pull requests](https://github.com/moenium-AI/animal-chess/pulls?q=is%3Apr+is%3Amerged) と [技術文書](./)を参照してください。

This page records notable changes. Consult the linked pull requests and reports for detailed implementation and validation history.

## 2026-10-27 — 高精細ドット絵 / High-resolution pixel art

- 承認済みの動物6種類について、白黒・通常/Blinkの計24フレームを採用。各シートは1254×1254px、各セルは627×627pxのRGBA原本です。
- ドット絵モードだけに適用。ミニチュアモードやゲームロジックを変えず、素材の読み込み失敗時には従来の画像へ戻ります。
- 馬車の乗客にも新画像を使用。PNG整合性とブラウザ回帰テストを追加しました。
- [PR #48](https://github.com/moenium-AI/animal-chess/pull/48) · [HD素材の仕様](../assets/pixel_royal_hd/README.md)

## 2026-10-26 — グラフィックと教材の改善 / Art and educational polish

- ドット絵モードのキャラクター刷新と、表示モード間で素材が混ざらないようにする修正。
- パズルの題名と詰み筋、チェス用語、教材の選択肢などを見直しました。
- [関連PR #35–47](https://github.com/moenium-AI/animal-chess/pulls?q=is%3Apr+is%3Amerged+created%3A2026-10-26) · [用語監査](chess-terminology-audit-2026-10-26.md) · [パズルの題材検証](puzzle-theme-integrity-2026-10-26.md)

## 2026-10-25 — 学習コンテンツ / Learning course

- 学習コースを80教材へ拡充し、各教材を実際の盤面で練習できるようにしました。
- 160問の理解度チェック、比較学習、盤面プレビュー、日英の問題文を整備しました。
- 名局15局を「まなぶ」の章に統合しました。
- [学習コース](learning-course-2026-10-25.md) · [理解度チェック](reasoning-complete-80-lessons-2026-10-25.md) · [監査](reasoning-quality-audit-2026-10-25.md)

## 2026-10-24 — AI・パズル・全体品質 / AI, puzzles, reliability

- AIの探索と時間制限、3回反復、50手ルール、ゲーム終了処理、Web Workerを改善しました。
- 10段階AIのバランスを自己対戦とStockfishによって検証。研究上の評価値を実際の対局レーティングとは区別しています。
- 80パズルの合法性、戦術、別解、最善応手を監査しました。
- [AI探索と限界](engine-search-and-balance-2026-10-24.md) · [AI自己対戦](ai-selfplay-2026-10-24.md) · [AI調整](ai-calibration-2026-10-24.md) · [パズル監査](puzzle-stockfish-audit-2026-10-24.md)

## 2026-10-17 — パズル整備 / Puzzle expansion

- パズルを80問に拡充し、採点・別解・継続手順の検証を実施しました。
- 55問の日本語・英語の題名を調整しました。既存のクリア履歴との互換性に影響する変更もこの時期に行われています。
- [拡張](puzzle-expansion-2026-10-17.md) · [別解監査](puzzle-answer-audit-2026-10-17.md) · [題名の検討](puzzle-titles-2026-10-21.md)

## Development records / 詳細な開発記録

- [開発手順・テストコマンド](dev-notes.md)
- [全体品質監査](full-game-audit-and-balance-2026-10-24.md)
- [教材監査](lesson-claims-audit-2026-10-25.md)
- [グラフィック方針](graphics-modes-2026-10-16.md)

過去の検証は当時の実装と条件に基づくものです。現在の機能や最新の結果は、公開ゲームと最新のCIを基準にしてください。

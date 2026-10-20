# Puzzle library redesign / パズル再設計

**Release:** `Animal_Chess_1017_003` (2026-10-17)

## 目的

旧版クリア履歴・並び順・総問題数との互換性は維持しない。重複を減らし、解法が明確で教育内容を実際の駒の動きに照らして検査可能な問題へ再編した。通常対局・棋譜・学習の機能は意図的に変更していない。

## 結果

| | 1017_002 | 1017_003 |
|---|---:|---:|
| 総数 | 38 | **41** |
| 強制メイト | 30 | **28** |
| 1手で成立する戦術・ルール | 8 | **13** |
| 旧クリア履歴移行 | 実施 | **廃止** |

### 削除した2問

- `puzzle-005` 「はんたいがわの扉」: 他のバックランク問題と狙いが重なる。駒の種類と守備方法の差がある残り3問を優先した。
- `puzzle-032` 「かいだんをつくる」: 既存の2手の二枚ルーク課題と指し手が同じであり、学習上の差別化が薄い。基礎・2手・3手の段階問題は残した。

### 追加した5問

| ID | テーマ | 正解 | 教育的確認 |
|---|---|---|---|
| `tactic-double-check` | ダブルチェック | `Bg6+` | ルークとビショップ両方の利きによる王手 |
| `tactic-en-passant` | アンパッサン | `exd6` | d5のポーンが消え、白ポーンはd6へ移動 |
| `tactic-knight-underpromotion` | ナイト昇格 | `c8=N+` | 黒キングe7とルークa7へのナイトの二重攻撃 |
| `tactic-rook-underpromotion` | ステイルメイト防止 | `c8=R` | `c8=Q`は実際にステイルメイト、`c8=R`では `Ka6` が合法 |
| `tactic-bishop-double-attack` | ビショップの両取り | `Bg5` | クイーンe7・ルークh4の双方を攻撃し、f4のポーンがg5を守る |

5問の英文も追加。問題説明と盤面の実際の関係を回帰テストで検証する。

## データモデルの整理

- **唯一の正本**: `tools/puzzle_catalog.json` にID、テーマ、目的、FEN、SAN正解、全継続応手、日英の問題名と解説をまとめる。
- **生成コマンド**: `node tools/build_puzzles.cjs` が `js/puzzles.js` と `js/puzzle_en.js` を確定的に再生成する。`--check` でドリフトを検出。原子的なファイル差し替えを利用。
- **独立検証**: `tools/test_mate_solver.cjs` は配布中の棋譜木を信頼せず最短強制メイトとすべての防御分岐を再探索する。
- **補助検証**: `tools/verify_puzzles.py` は `python-chess` が利用できる環境で実行できる二つ目のルール実装による検証。今回は環境に `python-chess` がないため実行していない。
- **UIのラベル**: 戦術とルール（アンパッサン、ステイルメイト回避）の双方を含むため、フィルタ名を「1手課題 / 1-move challenge」に統一。
- **クリア記録**: `animalchess_solved_v3` のみを読み書きする。`animalchess_solved` と `animalchess_solved_v2` を読み込まないため、古いクリア状況は表示されない（保存自体は削除しない）。
- **固定文字列ID**: 翻訳・フィルタ・現在の進捗を安全に対応づけるため引き続き使用。旧問題番号や旧問題との対応表は削除。

## 検証結果

実行コマンドと結果：

```
node tools/build_puzzles.cjs --check         PASS (41)
node tools/test_puzzle_quality.cjs          PASS (41, 13 tactical scenarios)
node tools/test_mate_solver.cjs             PASS (28 mate puzzles / 125 states)
node tools/test_learning_runtime.cjs        PASS (41 / 138 states / 226 edges)
node tools/test_learning_async.cjs          PASS
node tools/test_graphics_lifecycle.cjs      PASS
node tools/test_piece_sprites.cjs           PASS
node --check js/app.js                      PASS
node --check js/puzzles.js                  PASS
node --check js/puzzle_en.js                PASS
python -m py_compile tools/verify_puzzles.py PASS
```

- 開始盤面の完全重複0組、左右反転一致0組、1手メイト後の盤面の重複0組。
- 13の戦術・ルール題材について正解手の合法性をチェック。追加5問は各戦術の成立を幾何学・結果盤面・特殊ルールで検証。
- 旧進捗を読まないこと、新版での保存・再読込・無効ID排除・不正JSON耐性をテスト。
- 昇格課題でクイーンを選ぶ誤答が不正解となり、指定のナイト／ルークへの昇格が正解になることを、実際の `puzzleTryMove()` を通して検証。
- 配列インデックスに依存する訳文参照を使わない。

## 保証の範囲

「戦術1手」は**所定の戦術形を作る**問題であり、相手の全応手に対して駒得や勝勢が確定するという主張はしない。強制メイト問題については JavaScript のルールエンジンで最短詰みと全分岐を検証した。実在対局の初期配置からの到達可能性までは証明していない。ブラウザ実機の画面描画テストは実施していないが、解答判定・フィルタ・保存処理はNode.jsの実行回帰テストで検査した。

外部通信や外部ライブラリの追加はない。パズル文面のHTMLエスケープ処理は保持した。

# Stockfishで検証したパズル修正（2026-10-24）

## 対象・結果
GitHub の `main` にあった全80問（42詰み＋38戦術）を独立した Stockfish 16 で再調査した。
再検証条件は戦術 depth 18、詰み depth 20、評価差の警告しきい値 250cp。
修正後の結果は **80問 / 登録正解108手 / 要修正警告0件**。
ただし「警告0」は検査器が設定した条件内での結果であり、全問の最善性の証明ではない。

## 6問の盤面改訂
- `tactic-bishop-double-attack`: 王手を絡めた強制メイトを避けるため、黒キングと白クイーンの配置を変更。登録解 `Bg5` は最善手で、e7のクイーンとh4のルークへの二重攻撃を維持。
- `tactic-knight-underpromotion`: c1に白ルークを配置。登録解 `c8=N+` はナイトの王手＋ルーク攻撃を成立させ、Stockfishでも最善と確認。
- `tactic-fork-pawn-major`: 白クイーンと白ルークを追加し、`d5` のポーンフォークが相手の長い反撃で破綻しないよう修正。
- `tactic-pin-rook-relative`: 白クイーンをd1に加え、`Rf2` に対する応手が成立するようにした。
- `tactic-discovery-knight-queen`: 白ルークをa2に加え、登録別解 `Nf6+` と `Ng5+` の両方が十分に有効となるよう調整。
- `tactic-promotion-knight-majors`: 元の `a8=N` は強制メイト負けだったため廃止。白 `g7` ポーンから `g8=N+` と昇格し、黒キングh6・クイーンe7・ルークf6を同時に攻撃する新局面へ再設計。白ビショップc4がナイトを守る。

## 変更しなかった2問
- `mate-bishop-rook-three-step`: 深さ20の初期解析では7手詰めと出たが、登録初手 `Ke6` を深さ26で再探索すると3手詰めが確認できた。従来の全応手・最短手数の検査にも合格。出題内容は正しいため盤面はそのまま。
- `tactic-fork-queen-minors`: `Qh4+` が大きな優勢を築く最強の手だが、`Qe4` と `Qb4` も有効なクイーンによる二重攻撃で、Stockfishの評価でも双方+5ポーン程度の優位。教材の狙いから両方正解として維持する。これらは警告を黙って抑制せず `notes` に記載する。

## 回帰検証
`node tools/build_puzzles.cjs --check`
`node tools/test_puzzle_quality.cjs`
`node tools/test_extended_tactics.cjs`
`node tools/audit_alternate_tactics.cjs`
`node tools/test_tactic_counterplay.cjs`
`node tools/test_tactic_lookahead.cjs`
`node tools/test_mate_solver.cjs`
`node tools/test_puzzle_alternatives.cjs`
`node tools/test_puzzle_navigation.cjs`
`node tools/audit_stockfish.cjs --engine /usr/games/stockfish --depth 18 --mate-depth 20 --report-only --output stockfish-audit.json`

最終結果はGitHub Actions のアーティファクトに保存する。Python の `python-chess` を使うテストは今回のローカル環境では未実施。

## 注意事項
最善手との差分、駒得、強制メイトは必ずしも同じ意味ではない。チェスエンジン評価値だけで戦術課題の別解を否定せず、学習目標と局面の継続手順を照合する。解析は有限の深さであり、チェスの完全解決ではない。

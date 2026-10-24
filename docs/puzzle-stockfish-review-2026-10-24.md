# Stockfish 16 独立監査の初回結果（2026-10-24）

- ベース: `eda3820b69a5104d4a51cce9101ce98666d940b0`
- 80問題、登録正解108手。
- Stockfish 16、戦術探索深さ18、詰み問題探索深さ20、正解手と最善手の乖離250 cpを警告する設定。
- 本監査の「警告」はあくまでレビュー候補。教材への修正は実地の再検証と説明の見直しが必要。

## 重点再検証を要する3件

| 問題ID | 登録正解 | 独立エンジンの指摘 |
|---|---|---|
| `tactic-bishop-double-attack` | Bg5 | 黒の強制メイトが検出された |
| `tactic-fork-pawn-major` | d5 | 黒の強制メイトが検出された。直後の受けだけを確認した旧監査では漏れた |
| `tactic-promotion-knight-majors` | a8=N | 黒の強制メイトが検出された。クイーン昇格との比較にも大きな差 |

上記3問は、フォークなどの形が成立しても、その直後の勝敗が教材の意図と合っていない可能性が高い。
部分的な駒の追加だけでは別の反撃を生みやすいため、盤面の再設計と別実装による検査を推奨する。

## 実戦評価が異なる4件

| 問題ID | 登録正解 | 理由 |
|---|---|---|
| `tactic-knight-underpromotion` | c8=N+ | Stockfishはc8=Qを高評価。アンダープロモーションの教材として解説の精密化が必要 |
| `tactic-fork-queen-minors` | Qe4 / Qb4 | 幾何学的には両取りだが、Qh4+と比べると非常に低評価 |
| `tactic-pin-rook-relative` | Rf2 | Re2の方が大幅に高評価。ピンの成立と最善手を区別 |
| `tactic-discovery-knight-queen` | Ng5+ | Nf6+の方がはるかに高評価だが、Ng5+にも発見攻撃の形はある |

## メイト問題に関する注意

`mate-bishop-rook-three-step` は深さ20でStockfishから詰み手数の異なる警告が出るが、既存の全防御分岐探索では3手詰めを検証済み。
Stockfish 16の有限探索による深さ依存があるため、この件は「確定した誤り」として扱わない。他の3手詰めの警告2件も探索を深めると解消した。

## 再実行

```sh
node tools/test_stockfish_audit.cjs
node tools/audit_stockfish.cjs --engine /usr/games/stockfish --depth 18 --mate-depth 20 --threshold-cp 250 --output stockfish-audit.json --report-only
```

結果詳細はGitHub Actionsの `stockfish-puzzle-audit` アーティファクトに保存される。
本監査は有限探索であり、絶対的な最善手の証明でも、教材の自動修正器でもない。

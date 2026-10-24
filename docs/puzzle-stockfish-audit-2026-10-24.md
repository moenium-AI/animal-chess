# Stockfishによる独立パズル監査（2026-10-24）

## 目的
動物チェスの80問を、アプリの棋力評価器ではなく独立したUCIエンジンで再評価する。
42問のメイトではエンジンの詰み手数と登録初手を比較し、38問の戦術では最善手と登録正解手の評価差を調べる。
既存の「全応手の強制メイト探索」と「戦術形の成立検証」は引き続き併用する。

## 実行
Stockfishは同梱しない。公式配布の実行ファイルを用意すること。
```sh
node tools/test_stockfish_audit.cjs
node tools/audit_stockfish.cjs --engine /usr/games/stockfish --depth 13 --threshold-cp 250 --output stockfish-audit.json --report-only
```
Windowsでは `--engine "C:\\path\\to\\stockfish.exe"` を指定する。

GitHub Actionsはプルリクエストとmain更新時にStockfishをUbuntuにインストールし、全80問を解析する。
JSON報告書はActionsの `stockfish-puzzle-audit` アーティファクトで取得できる。

## 解釈上の注意
- エンジンの評価値は手番側の視点に統一して比較する。王手・詰みは駒得のcp値に換算した近似値。
- 戦術問題の「最善手との差が250cp超」は自動不合格ではなく、教材として再検討すべき疑義。特定の戦術を学ぶ課題では最善手と指定手が異なる場合がある。
- 深さ13は有限の探索であり、メイトを証明できない場合には `mate_not_verified_at_depth` を記録する。
- 詰み手数は既存の全防御分岐探索が一次判定となる。Stockfishの探索深さ不足で教材を自動的に間違いと判定しない。
- UIや対局の動作はこの監査の対象外。

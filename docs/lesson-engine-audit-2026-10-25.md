# 戦術・終盤39教材の独立エンジン監査（2026-10-25）

## 範囲と検証根拠

GitHub `main` の `569c3249587086bbe5f0861b8e4fbdc00f817d99` を基準として、戦術21教材と終盤18教材の**39教材・149半手**を対象にした。棋譜の正本は公開JavaScript `js/lessons.js` と `js/extra_lessons.js` であり、別途コピーした解答を判定基準に使わない。

新規の `tools/audit_lesson_engine.py` は次を行う。

1. **独立した `python-chess`** で開始FENの構造、全SANの合法性と正規表記、日英指し手一致、途中終局、代表的な詰み／ステイルメイト／駒不足を検査する。
2. **Stockfish 16（GitHub ActionsのUbuntuパッケージ）** に各局面の候補最善手と実演手を個別に探索させる。通常は各0.15秒、「一手ためす」の対象は各0.6秒。評価は着手者視点にそろえてJSONに保存する。
3. 2026-10-16に取得・保存したLichessテーブルベースの**44局面**を現在のFENと照合する。対象はルセナ16、フィリドール12、三角法16局面。白勝ち／引き分けについて手番視点のcategoryも再検査する。**今回オンラインのテーブルベースへ再照会したという意味ではない。**
4. 監査結果をGitHub Actionsの `lesson-engine-audit` Artifactとして残す。200cp以上の差は調査候補として記録し、それだけではCIを不合格にしない。

## 発見した具体的な問題と修正

### 中間手（`cb_zwischenzug`）

旧FENでは、教材の `1...Bxh2+` より強力な **`1...Ra1#`（一手詰め）** が存在した。同梱 `Chess` でもチェックメイトを再現でき、独立Stockfishも指摘した。ポーン得の中間手を教える配置として適切ではなかった。

- 白のf1にルークを配置し、偶発的なa1からの即詰みを排除。
- 本筋 `Bxh2+ Kh1 Rxd8` は維持。変更後の王手への白の合法応手は `Kh1` だけなので、日英両方の説明を修正。
- 新規テストでは黒に初手で一手詰めがないことと、本筋で黒ルークがd8の白クイーンを取ることを検証。
- 生成元の `tools/lessons_gen.py` と `tools/lessons_en.py` も同期し、再生成による巻き戻りを防止。

### 風車（`cb_windmill`）

`Rxc7+` のあと、黒は表示された `...Kg8` 以外に **`...Rf6`** とルークで発見王手の射線を遮る合法な応手を持つ。Stockfishの短時間診断でも、表示手順を唯一・最善の攻略法とする根拠は得られなかった。

- 日英の導入と指し手解説に `...Rf6` を明示。
- 既存の風車の実演棋譜は残すが、強制手順や最善手ではなく、特定の応手を選んだ**形の実演**であると強調。
- 回帰テストで `Rxc7+ Rf6` の合法性と王手が解消されること、日英説明に防御手があることを確認。

## エンジン評価の限界と確認が必要な事項

- **低い探索時間では評価の差を「教材の誤り」と同一視できない。** 強制メイト、特殊なルーク終盤、相手が意図的に選ぶ悪い応手では、mate scoreによって差が極端に大きくなる。独立Stockfishの選択と、教材の一手の質は「同じ根局面・着手者視点」で比較するが、時間制限の異なる分岐間で証明にはならない。
- ルセナ・フィリドール・三角法は、保存済みのテーブルベースが勝敗のより強い根拠になる。Stockfishの低時間評価はテーブルベースに代替しない。
- スマザーメイトやデコイなど、すでに別応手の存在を明記した教材は、最善手を網羅した強制手順とは扱わない。
- 全39教材・149半手を診断しても、**全合法応手への正確な評価、すべての手筋の最善性、名局の史実**はまだ保証されない。
- 盤面の改訂は中間手のみ。その他の教材のFEN/SAN、保存キー、動物演出は維持。

## ブラウザ配信

配布用 `js/lessons.js` を変更したため、`index.html` とWorkerのキャッシュ版数を `v=19` に更新。ブラウザのBlob Workerを用いる回帰テストでも、実際のWorker import表記を使うようテスト側の置換文字列を同期した。

## 再実行

```sh
python -m pip install 'python-chess==1.999'
python tools/audit_lesson_engine.py --no-engine
python tools/audit_lesson_engine.py --stockfish /usr/games/stockfish --time-per-search 0.15 --practice-time 0.6 --output lesson-engine-audit.json
node tools/test_course_expansion.cjs
node tools/test_lesson_comparisons.cjs
python tools/test_full_game_browser.py
```

CIでStockfishをインストールしているため通常のWeb配布にはStockfishもPythonも追加しない。

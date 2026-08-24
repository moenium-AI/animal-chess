# -*- coding: utf-8 -*-
"""Bulk-replace shogi-derived terms with standard katakana chess terminology.
将棋由来の用語をチェスの一般的なカタカナ表記に統一する一括置換スクリプト。

  玉・王 → キング / 王手 → チェック / 両王手 → ダブルチェック, and so on. / 玉・王 → キング / 王手 → チェック / 両王手 → ダブルチェック など

Non-piece uses of 「王」 (王座・王者・王道・大王・女王) must not be replaced,
so they are moved to placeholders first and restored at the end. Order also matters (longer terms first). / 駒ではない「王」(王座・王者・王道・大王・女王)は置換してはいけないので、先にプレースホルダへ退避し、最後に戻す。順序も重要(長い語から処理する)。

Only hand-written files are targets: regenerate generated js/{lessons,games,puzzles}.js
after editing the corresponding *_gen.py files. / 対象は「手で書いたファイル」だけ: 生成物 js/{lessons,games,puzzles}.js は各 *_gen.py を直したうえで再生成すること。
"""
import io
import sys

TARGETS = [
    "tools/lessons_gen.py",
    "tools/games_gen.py",
    "tools/verify_puzzles.py",
    "js/app.js",
    "README.md",
]

# 1) Protect non-piece uses of 「王」 from replacement. / 駒ではない「王」を退避(置換対象から守る)
PROTECT = ["王座", "王者", "王道", "大王", "女王"]

# 2) Replace longer compounds first. / 長い複合語から順に置換する
RULES = [
    ("両王手", "ダブルチェック"),
    ("発見王手", "ディスカバードチェック"),
    ("王手", "チェック"),
    # Compound terms containing 玉; process them first to avoid unnatural forms such as 「自キング」. / 玉の複合語(先に処理しないと「自キング」のような不自然な語になる)
    ("自玉", "自分のキング"),
    ("相手玉", "相手のキング"),
    ("白玉", "白のキング"),
    ("黒玉", "黒のキング"),
    ("両玉", "両方のキング"),
    ("玉側", "キングサイド"),
    ("玉狩り", "キング狩り"),
    ("王さま", "キング"),
    ("玉", "キング"),
    ("王", "キング"),
]

# 3) Normalize expressions after replacement (remove duplicates and awkward wording). / 置換後に整えたい表現(重複・不自然さの解消)
POLISH = [
    ("チェックでチェックメイト", "チェックメイト"),
    ("チェックをかけてチェックメイト", "チェックメイト"),
    ("キングキング", "キング"),
    ("のキングの", "のキングの"),
]

# 4) Standardize titles as 「katakana (Japanese translation)」. / タイトルは「カタカナ(和訳)」の語順に統一する
TITLE_FIXES = [
    ("ナイトの二股(フォーク)", "フォーク(ナイトの二股)"),
    ("串刺し(スキュア)", "スキュア(串刺し)"),
    ("クイーンの二重攻撃(ダブルアタック)", "ダブルアタック(クイーンの二重攻撃)"),
    ("【上級】風車(ウィンドミル)", "【上級】ウィンドミル(風車)"),
    ("ポーンの突破(ブレイクスルー)", "ブレイクスルー(ポーンの突破)"),
    ("ナイトへの昇格(アンダープロモーション)", "アンダープロモーション(ナイトへの昇格)"),
    ("【上級】三角法(手番を相手に渡す)", "【上級】トライアンギュレーション(三角法)"),
    ("四角形の法則(ポーンを追いつけるか)", "スクエアルール(四角形の法則)"),
    ("二枚のルークで階段メイト", "ラダーメイト(二枚のルークの階段)"),
    ("【きほん】タダの駒を見のがさない", "【きほん】ハンギングピース(タダの駒)"),
    # Restore double-check titles so the Japanese translation remains Japanese. / ダブルチェックのタイトルは(和訳)側を日本語のまま残すのが狙いなので復元する
    ("ダブルチェック(ダブルチェック)", "ダブルチェック(両王手)"),
]


def convert(text):
    for i, w in enumerate(PROTECT):
        text = text.replace(w, "\x00P%d\x00" % i)
    for a, b in RULES:
        text = text.replace(a, b)
    for a, b in POLISH:
        text = text.replace(a, b)
    for a, b in TITLE_FIXES:
        text = text.replace(a, b)
    for i, w in enumerate(PROTECT):
        text = text.replace("\x00P%d\x00" % i, w)
    return text


def main():
    for path in TARGETS:
        with io.open(path, encoding="utf-8") as f:
            src = f.read()
        out = convert(src)
        if out != src:
            with io.open(path, "w", encoding="utf-8", newline="\n") as f:
                f.write(out)
            print("updated %s" % path)
        else:
            print("no change %s" % path)


if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""チェス詰めパズルを python-chess で検証し js/puzzles.js を生成する。

各パズルに theme(まなぶの要素) と idea(狙いの解説) を持たせ、
「まなぶ」で学んだ戦術・終盤を実戦形式で練習できるようにする。
解説はすべて独自に書き下ろし。
"""
import chess
import io
import json
import sys


def mate_moves(board, n):
    result = []
    for mv in list(board.legal_moves):
        board.push(mv)
        if board.is_checkmate():
            result.append(mv)
        elif n > 1 and not board.is_game_over():
            ok = True
            for reply in list(board.legal_moves):
                board.push(reply)
                sub = mate_moves(board, n - 1)
                board.pop()
                if not sub:
                    ok = False
                    break
            if ok:
                result.append(mv)
        board.pop()
    return result


def classify(fen, max_n=2):
    board = chess.Board(fen)
    if not board.is_valid():
        return (None, [], "INVALID: " + str(board.status()))
    for n in range(1, max_n + 1):
        sols = mate_moves(board, n)
        if sols:
            return (n, [board.san(m) for m in sols], "OK")
    return (None, [], "no mate found within %d" % max_n)


# theme のラベルは js 側(app.js)で表示する。
# (expected_n, theme, title, fen, idea)
CANDIDATES = [
    # ---- きほん(バックランク・基本の詰み) ----
    (1, "backrank", "うらぐちからこんにちは", "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
     "相手の玉の前のポーンが逃げ道をふさいでいる。一段目(バックランク)にルークを飛び込ませよう!"),
    (1, "backrank", "ろうかのつきあたり", "6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1",
     "自分のポーンで塞がれた玉は一段目が弱点。ルークを送り込めば一発で詰む。"),
    (1, "opening", "がくしゃのメイト", "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
     "定跡の落とし穴『4手詰め(スカラーズ・メイト)』。f7はキングしか守っていない最大の弱点。"),
    (1, "opening", "さいそくのメイト", "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
     "史上最速の詰み『フールズ・メイト』。玉の斜めをうかつに開けると2手で詰まされる、という戒め。"),

    # ---- フォーク・ナイトの詰み ----
    (1, "knight", "もぐりこみメイト", "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1",
     "ナイトが玉のふところに潜り込む。自分の駒に囲まれた玉は、ナイトの一撃に弱い。"),
    (1, "knight", "アラビアのわな", "7k/R7/5N2/8/8/8/8/6K1 w - - 0 1",
     "ルークとナイトの連携『アラビアン・メイト』。隅の玉はナイトが逃げ道を消すと詰む。"),

    # ---- 斜めライン(ビショップ+クイーン) ----
    (1, "diagonal", "ななめのすきま", "6k1/5p1p/6pQ/8/8/8/1B6/6K1 w - - 0 1",
     "ビショップの斜めのラインとクイーンの合わせ技。玉の斜めの逃げ道を封じてから寄せる。"),
    (1, "diagonal", "ななめラインのひみつ", "6k1/p6p/6p1/8/7Q/8/1B6/5RK1 w - - 0 1",
     "遠くのビショップが利いていることを見逃さない。斜めの支えがあればクイーンが飛び込める。"),

    # ---- エンドゲーム(玉+大駒の詰め) ----
    (1, "endgame", "すみっこでつかまえた", "7k/8/6K1/8/8/8/8/R7 w - - 0 1",
     "終盤の基本『キング+ルークの詰め』。自分の玉で逃げ道を消し、ルックで最終列を封じる。"),
    (1, "endgame", "はしっこの王さま", "k7/8/1K6/8/8/8/8/7R w - - 0 1",
     "端に追い詰めた玉を、味方の玉で押さえてルックでとどめ。エンドゲームの型を体で覚えよう。"),
    (1, "endgame", "クイーンのごあいさつ", "7k/8/5K2/8/8/8/8/6Q1 w - - 0 1",
     "『キング+クイーンの詰め』。クイーンを玉の隣に置くときは、必ず自分の玉で支えること。"),
    (1, "endgame", "おしろのうえのクイーン", "1k6/8/1K6/8/8/8/8/6Q1 w - - 0 1",
     "向かい合った玉(オポジション)が決め手。逃げ道を全部消してからクイーンで王手する。"),

    # ---- 階段(二枚のルック) ----
    (1, "ladder", "ローラーさくせん", "7k/R7/1R6/8/8/8/8/6K1 w - - 0 1",
     "二枚のルックの階段(ラダー)。一枚が逃げ道の段を封鎖し、もう一枚が王手して詰ます。"),
    (1, "ladder", "2だんロケット", "7k/R7/8/8/8/8/8/1R4K1 w - - 0 1",
     "7段目を押さえたルックがあれば、もう一枚を8段目に送るだけで詰み。階段メイトの決めの形。"),
    (2, "ladder", "はしごをのぼって", "7k/8/R7/1R6/8/8/8/6K1 w - - 0 1",
     "二枚のルックで一段ずつ玉を追い上げる。まず片方で段を封じ、交互に王手して端へ押し込む。"),
    (2, "ladder", "ツインタワーさくせん", "7k/8/8/8/8/8/R7/1R5K w - - 0 1",
     "離れた場所からでも、二枚のルックがあれば階段で確実に端まで追い詰められる。"),

    # ---- 犠牲からの詰み ----
    (2, "sacrifice", "クイーンのプレゼント", "r5k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
     "クイーンを捨ててでも、詰みが見えているなら踏み込む。守り駒を引きはがす犠牲の考え方。"),
    (1, "diagonal", "りょうそでのキング", "2rkr3/8/8/8/8/8/7Q/6K1 w - - 0 1",
     "玉の両脇を自分のルークに塞がれると、クイーンが縦と斜めで逃げ道を全部消して一手で詰む。"),

    (1, "endgame", "とおくからのおうて", "6k1/8/6K1/8/8/8/8/3Q4 w - - 0 1",
     "クイーンは遠くからでも玉の逃げ道を全部消せる。味方の玉とはさめば、離れていても安全に詰む。"),
    (1, "ladder", "かいだんのてっぺん", "7k/1R6/8/8/8/8/8/R6K w - - 0 1",
     "7段目を封じたルックがあれば、もう一枚を8段目に回すだけ。二枚のルックの基本の詰み。"),

    # ---- 応用の2手詰め ----
    (2, "endgame", "おうさまのおてつだい", "7k/8/5K2/8/8/8/8/R7 w - - 0 1",
     "玉とルックだけの詰め。まず自分の玉を近づけて、相手の玉を端の一マスへ追い込む。"),
]


def main():
    verified = []
    print("=" * 72)
    ng = 0
    for expected, theme, title, fen, idea in CANDIDATES:
        n, sols, status = classify(fen)
        good = (n == expected and status == "OK")
        mark = "OK " if good else "NG!"
        if not good:
            ng += 1
        print("%s [m%s->m%s] %-12s %-22s %s" % (mark, expected, n, theme, title, "" if good else status))
        if n is not None and status == "OK":
            board = chess.Board(fen)
            verified.append({
                "title": title, "theme": theme, "idea": idea,
                "fen": fen, "mateIn": n,
                "turn": "w" if board.turn == chess.WHITE else "b",
                "solutions": sols,
            })
    print("=" * 72)
    print("verified: %d / %d  (NG: %d)" % (len(verified), len(CANDIDATES), ng))

    verified.sort(key=lambda p: (p["mateIn"], p["theme"]))
    out = io.StringIO()
    out.write("// 自動生成: tools/verify_puzzles.py (python-chessで全数検証済み)\n")
    out.write("// theme=まなぶの要素, idea=狙いの解説(すべて独自に記述)\n")
    out.write("const PUZZLES = ")
    out.write(json.dumps(verified, ensure_ascii=False, indent=1))
    out.write(";\n")
    path = sys.argv[1] if len(sys.argv) > 1 else "puzzles.js"
    with open(path, "w", encoding="utf-8") as f:
        f.write(out.getvalue())
    print("wrote %s" % path)
    if ng:
        print("!!! NGのパズルがあります。修正してください。")
        sys.exit(1)


if __name__ == "__main__":
    main()

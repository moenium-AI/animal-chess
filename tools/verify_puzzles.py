# -*- coding: utf-8 -*-
"""Validate chess puzzles with python-chess and generate js/puzzles.js.
チェス詰めパズルを python-chess で検証し js/puzzles.js を生成する。

Each puzzle has a theme (learning topic) and an idea (tactical explanation),
so tactics and endgames from Learn can be practiced in game-like positions. / 各パズルに theme(まなぶの要素) と idea(狙いの解説) を持たせ、
解説はすべて独自に書き下ろし。 / 「まなぶ」で学んだ戦術・終盤を実戦形式で練習できるようにする。
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


def classify(fen, max_n=3):
    board = chess.Board(fen)
    if not board.is_valid():
        return (None, [], "INVALID: " + str(board.status()))
    for n in range(1, max_n + 1):
        sols = mate_moves(board, n)
        if sols:
            return (n, [board.san(m) for m in sols], "OK")
    return (None, [], "no mate found within %d" % max_n)


# The theme label is displayed by the JavaScript side (app.js). / theme のラベルは js 側(app.js)で表示する。
# (expected_n, theme, title, fen, idea)
CANDIDATES = [
    # ---- Basics (back rank and fundamental mates) / きほん(バックランク・基本の詰み) ----
    (1, "backrank", "うらぐちからこんにちは", "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
     "相手のキングの前のポーンが逃げ道をふさいでいる。一段目(バックランク)にルークを飛び込ませよう!"),
    (1, "backrank", "ろうかのつきあたり", "6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1",
     "自分のポーンで塞がれたキングは一段目が弱点。ルークを送り込めば一発で詰む。"),
    (1, "opening", "がくしゃのメイト", "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
     "定跡の落とし穴『4手詰め(スカラーズ・メイト)』。f7はキングしか守っていない最大の弱点。"),
    (1, "opening", "さいそくのメイト", "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
     "史上最速の詰み『フールズ・メイト』。キングの斜めをうかつに開けると2手で詰まされる、という戒め。"),

    # ---- Forks and knight mates / フォーク・ナイトの詰み ----
    (1, "knight", "もぐりこみメイト", "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1",
     "ナイトがキングのふところに潜り込む。自分の駒に囲まれたキングは、ナイトの一撃に弱い。"),
    (1, "knight", "アラビアのわな", "7k/R7/5N2/8/8/8/8/6K1 w - - 0 1",
     "ルークとナイトの連携『アラビアン・メイト』。隅のキングはナイトが逃げ道を消すと詰む。"),

    # ---- Diagonal line (bishop + queen) / 斜めライン(ビショップ+クイーン) ----
    (1, "diagonal", "ななめのすきま", "6k1/5p1p/6pQ/8/8/8/1B6/6K1 w - - 0 1",
     "ビショップの斜めのラインとクイーンの合わせ技。キングの斜めの逃げ道を封じてから寄せる。"),
    (1, "diagonal", "ななめラインのひみつ", "6k1/p6p/6p1/8/7Q/8/1B6/5RK1 w - - 0 1",
     "遠くのビショップが利いていることを見逃さない。斜めの支えがあればクイーンが飛び込める。"),

    # ---- Endgame (king and major-piece mates) / エンドゲーム(キング+大駒の詰め) ----
    (1, "endgame", "すみっこでつかまえた", "7k/8/6K1/8/8/8/8/R7 w - - 0 1",
     "終盤の基本『キング+ルークの詰め』。自分のキングで逃げ道を消し、ルークで最終列を封じる。"),
    (1, "endgame", "はしっこのキング", "k7/8/1K6/8/8/8/8/7R w - - 0 1",
     "端に追い詰めたキングを、味方のキングで押さえてルークでとどめ。エンドゲームの型を体で覚えよう。"),
    (1, "endgame", "クイーンのごあいさつ", "7k/8/5K2/8/8/8/8/6Q1 w - - 0 1",
     "『キング+クイーンの詰め』。クイーンをキングの隣に置くときは、必ず自分のキングで支えること。"),
    (1, "endgame", "おしろのうえのクイーン", "1k6/8/1K6/8/8/8/8/6Q1 w - - 0 1",
     "向かい合ったキング(オポジション)が決め手。逃げ道を全部消してからクイーンでチェックする。"),

    # ---- Ladder mate (two rooks) / 階段(二枚のルーク) ----
    (1, "ladder", "ローラーさくせん", "7k/R7/1R6/8/8/8/8/6K1 w - - 0 1",
     "二枚のルークの階段(ラダー)。一枚が逃げ道の段を封鎖し、もう一枚がチェックして詰ます。"),
    (1, "ladder", "2だんロケット", "7k/R7/8/8/8/8/8/1R4K1 w - - 0 1",
     "7段目を押さえたルークがあれば、もう一枚を8段目に送るだけで詰み。階段メイトの決めの形。"),
    (2, "ladder", "はしごをのぼって", "7k/8/R7/1R6/8/8/8/6K1 w - - 0 1",
     "二枚のルークで一段ずつキングを追い上げる。まず片方で段を封じ、交互にチェックして端へ押し込む。"),
    (2, "ladder", "ツインタワーさくせん", "7k/8/8/8/8/8/R7/1R5K w - - 0 1",
     "離れた場所からでも、二枚のルークがあれば階段で確実に端まで追い詰められる。"),

    # ---- Mates after a sacrifice / 犠牲からの詰み ----
    (2, "sacrifice", "クイーンのプレゼント", "r5k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
     "クイーンを捨ててでも、詰みが見えているなら踏み込む。守り駒を引きはがす犠牲の考え方。"),
    (1, "diagonal", "りょうそでのキング", "2rkr3/8/8/8/8/8/7Q/6K1 w - - 0 1",
     "キングの両脇を自分のルークに塞がれると、クイーンが縦と斜めで逃げ道を全部消して一手で詰む。"),

    (1, "endgame", "とおくからのおうて", "6k1/8/6K1/8/8/8/8/3Q4 w - - 0 1",
     "クイーンは遠くからでもキングの逃げ道を全部消せる。味方のキングとはさめば、離れていても安全に詰む。"),
    (1, "ladder", "かいだんのてっぺん", "7k/1R6/8/8/8/8/8/R6K w - - 0 1",
     "7段目を封じたルークがあれば、もう一枚を8段目に回すだけ。二枚のルークの基本の詰み。"),

    # ---- Advanced two-move mates / 応用の2手詰め ----
    (2, "endgame", "おうさまのおてつだい", "7k/8/5K2/8/8/8/8/R7 w - - 0 1",
     "キングとルークだけの詰め。まず自分のキングを近づけて、相手のキングを端の一マスへ追い込む。"),

    # ============ Additional set / 追加ぶん ============
    # ---- Back rank (with different major pieces) / バックランク(いろいろな大駒で) ----
    (1, "backrank", "とじたドア", "6k1/5ppp/8/8/8/8/8/3Q2K1 w - - 0 1",
     "クイーンも一段目の詰めに使える。ポーンで塞がれたキングへ横から飛び込む。"),
    (1, "backrank", "よこどりメイト", "3r2k1/5ppp/8/8/8/8/8/3R2K1 w - - 0 1",
     "守りのルークと向かい合ったら取ってしまおう。取った瞬間に一段目が詰む。"),
    (1, "backrank", "はんたいがわの扉", "7k/6pp/8/8/8/8/8/R5K1 w - - 0 1",
     "キングが右端に寄っていても考え方は同じ。逃げ道のない一段目にルークを回す。"),
    # ---- Queen mating net (supported by a friendly piece) / クイーンの寄せ(味方で支える) ----
    (1, "support", "そらのてっぺんから", "6k1/8/7P/8/8/8/1Q6/7K w - - 0 1",
     "味方のポーンで支えれば、クイーンをキングの隣に置いても取られない。支えのあるチェックが決め手。"),
    (1, "support", "ルークの支え", "6k1/R7/8/4Q3/8/8/8/6K1 w - - 0 1",
     "7段目のルークがg7を守っている。支えを確認してからクイーンをキングの隣へ飛び込ませる。"),
    (1, "queen", "コーナーのおうさま", "7k/Q7/6K1/8/8/8/8/8 w - - 0 1",
     "自分のキングが相手の逃げ道を消しているとき、クイーンは隣に飛び込んで一手で詰む。"),
    # ---- Smothered mate / 窒息メイト(スマザー) ----
    (1, "smother", "いきどまりのナイト", "6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1",
     "自分の駒に囲まれたキングは、ナイトの飛び込みに弱い。周りが味方でふさがれたキングを一撃。"),

    # ---- Additional set 2 / 追加ぶん2 ----
    (1, "backrank", "すみのいちげき", "7k/5ppp/8/8/8/8/8/1Q5K w - - 0 1",
     "キングが隅にいても一段目は弱点。逃げ道がポーンでふさがれていれば、クイーンを横から送り込んで詰み。"),
    (1, "smother", "かこまれナイト", "6rk/5ppp/8/6N1/8/8/8/6K1 w - - 0 1",
     "キングのまわりが味方のルークとポーンでびっしり。ナイトが飛び込めば逃げ場ゼロで詰む(窒息メイト)。"),
    (1, "support", "ナイトとクイーン", "7k/8/5N2/8/8/8/8/6QK w - - 0 1",
     "ナイトが h7・g8 の逃げ道を見張り、クイーンをそのナイトが支える。支えのあるチェックで隅のキングを仕留める。"),

    # ---- Increased difficulty: two-move mates / 難易度アップ: 2手詰め ----
    (2, "queen", "はしへおいこめ", "7k/8/5K2/8/8/8/8/Q7 w - - 0 1",
     "クイーンとキングの連係。まず逃げ道を消してから、支えのある一撃でとどめを刺す。"),
    (2, "ladder", "かいだんをつくる", "6k1/8/8/8/8/R7/1R6/7K w - - 0 1",
     "二枚のルークの階段。まず一枚で段を封鎖し、もう一枚を最終列へ回す二手の型。"),
    (2, "endgame", "たまをちかづけて", "6k1/8/5K2/8/8/8/8/R7 w - - 0 1",
     "ルークだけでは詰まない。まず自分のキングを近づけて逃げ道を消してから、ルークで最終列を封じる。"),

    # ---- Increased difficulty: three-move mates (practice calculating carefully) / 難易度アップ: 3手詰め(じっくり読む練習) ----
    (3, "endgame", "ルークでしとめる", "6k1/8/4K3/8/8/8/8/R7 w - - 0 1",
     "キングとルークだけの寄せを三手で。自分のキングを一歩ずつ近づけ、相手のキングを端へ追い込んでから封じる。"),
    (3, "queen", "クイーンのつめ", "6k1/8/4K3/8/8/8/8/Q7 w - - 0 1",
     "クイーンで逃げ道を狭めつつ、自分のキングを近づける。三手先まで読み切る練習に。"),
    (3, "ladder", "とおいかいだん", "3k4/8/8/8/8/8/R7/1R5K w - - 0 1",
     "離れた二枚のルークで階段を作る。まず段を封じ、交互にチェックして三手で端まで押し込もう。"),
    (3, "queen", "すみへのみちすじ", "7k/8/4K3/8/8/8/8/1Q6 w - - 0 1",
     "隅のキングを追うときこそ落ち着いて。逃げ道を消す順番を間違えなければ三手で詰む。"),
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
    out.write("// Generated by tools/verify_puzzles.py; every puzzle was validated with python-chess. / tools/verify_puzzles.pyで自動生成し、python-chessで全問検証済み。\n")
    out.write("// theme=learning topic; idea=original explanation of the tactic. / theme=まなぶの要素、idea=狙いの解説（すべて独自に記述）。\n")
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

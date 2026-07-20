# -*- coding: utf-8 -*-
"""Verify chess mate puzzles with python-chess and emit puzzles.js"""
import chess
import io
import json
import sys

def mate_moves(board, n):
    """Moves for the side to move that force mate in <= n moves (attacker moves)."""
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

CANDIDATES = [
    # (expected_n, title, fen)
    (1, "うらぐちからこんにちは", "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1"),
    (1, "すみっこでつかまえた",   "7k/8/6K1/8/8/8/8/R7 w - - 0 1"),
    (1, "クイーンのごあいさつ",   "7k/8/5K2/8/8/8/8/6Q1 w - - 0 1"),
    (1, "もぐりこみメイト",       "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1"),
    (1, "ローラーさくせん",       "7k/R7/1R6/8/8/8/8/6K1 w - - 0 1"),
    (1, "アラビアのわな",         "7k/R7/5N2/8/8/8/8/6K1 w - - 0 1"),
    (1, "がくしゃのメイト",       "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4"),
    (1, "ななめのすきま",         "6k1/5p1p/6pQ/8/8/8/1B6/6K1 w - - 0 1"),
    (1, "おしろのうえのクイーン", "1k6/8/1K6/8/8/8/8/6Q1 w - - 0 1"),
    (1, "りょうそでのキング",     "2rkr3/8/8/8/8/8/7Q/6K1 w - - 0 1"),
    (1, "さいそくのメイト",       "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2"),
    (2, "はしごをのぼって",       "7k/8/R7/1R6/8/8/8/6K1 w - - 0 1"),
    (2, "ツインタワーさくせん",   "7k/8/8/8/8/8/R7/1R5K w - - 0 1"),
    (2, "クイーンのプレゼント",   "r5k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1"),
    (1, "ななめラインのひみつ",   "6k1/p6p/6p1/8/7Q/8/1B6/5RK1 w - - 0 1"),
    (2, "おうさまのおてつだい",   "7k/8/5K2/8/8/8/8/R7 w - - 0 1"),
]

def main():
    verified = []
    print("=" * 70)
    for expected, title, fen in CANDIDATES:
        n, sols, status = classify(fen)
        mark = "OK " if (n == expected and status == "OK") else "NG!"
        print("%s [expect m%s -> got m%s] %s" % (mark, expected, n, title))
        print("    fen: %s" % fen)
        print("    status: %s  solutions: %s" % (status, sols))
        if n is not None and status == "OK":
            board = chess.Board(fen)
            verified.append({
                "title": title,
                "fen": fen,
                "mateIn": n,
                "turn": "w" if board.turn == chess.WHITE else "b",
                "solutions": sols,
            })
    print("=" * 70)
    print("verified: %d / %d" % (len(verified), len(CANDIDATES)))

    # sort: mate-in-1 first, keep original order otherwise
    verified.sort(key=lambda p: p["mateIn"])
    out = io.StringIO()
    out.write("// 自動生成: verify_puzzles.py (python-chessで全数検証済み)\n")
    out.write("const PUZZLES = ")
    out.write(json.dumps(verified, ensure_ascii=False, indent=2))
    out.write(";\n")
    path = sys.argv[1] if len(sys.argv) > 1 else "puzzles.js"
    with open(path, "w", encoding="utf-8") as f:
        f.write(out.getvalue())
    print("wrote %s" % path)

if __name__ == "__main__":
    main()

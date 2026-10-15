"""Read-only audit of the shipped learning data (requires python-chess).

Run from any directory: python tools/audit_learning.py --output report.json
This checks positions, canonical SAN, translations and exact puzzle mate depth.
It does not certify prose, historical attribution or optimal play in lessons.
"""

import argparse
from collections import Counter
from functools import lru_cache
import json
from pathlib import Path

import chess


ROOT = Path(__file__).resolve().parents[1]


def read_data(filename, name):
    text = (ROOT / "js" / filename).read_text(encoding="utf-8")
    return json.loads(text.split(f"const {name} = ", 1)[1].strip().removesuffix(";"))


@lru_cache(maxsize=200000)
def forces_mate(fen, attacking_plies):
    """Existential attacker, universal defender; draw is not a forced mate."""
    board = chess.Board(fen)
    for move in list(board.legal_moves):
        board.push(move)
        wins = board.is_checkmate()
        if not wins and attacking_plies > 1 and not board.is_game_over():
            replies = list(board.legal_moves)
            wins = bool(replies)
            for reply in replies:
                board.push(reply)
                reply_loses = forces_mate(board.fen(), attacking_plies - 1)
                board.pop()
                if not reply_loses:
                    wins = False
                    break
        board.pop()
        if wins:
            return True
    return False


def mate_starts(board, n):
    result = []
    for move in list(board.legal_moves):
        san = board.san(move)
        board.push(move)
        wins = board.is_checkmate()
        if not wins and n > 1 and not board.is_game_over():
            replies = list(board.legal_moves)
            wins = bool(replies)
            for reply in replies:
                board.push(reply)
                reply_loses = forces_mate(board.fen(), n - 1)
                board.pop()
                if not reply_loses:
                    wins = False
                    break
        board.pop()
        if wins:
            result.append(san)
    return sorted(result)


def audit():
    issues = []
    report = {"issues": issues, "limits": [
        "Legal lines do not establish optimal defence, teaching accuracy, or historical authenticity.",
        "FEN validity is python-chess structural validity, not a proof of reachability from the start.",
    ]}
    for filename, name in [("lessons.js", "LESSONS"), ("games.js", "FAMOUS_GAMES")]:
        data = read_data(filename, name)
        plies = 0
        terminals = Counter()
        seen = set()
        for item in data:
            key = item["id"]
            if key in seen:
                issues.append({"id": key, "kind": "duplicate_id"})
            seen.add(key)
            board = chess.Board(item.get("fen") or chess.STARTING_FEN)
            if not board.is_valid():
                issues.append({"id": key, "kind": "invalid_initial_fen", "status": int(board.status())})
            translations = item.get("en", {}).get("moves", [])
            if len(translations) != len(item["moves"]):
                issues.append({"id": key, "kind": "translation_length"})
            for ply, entry in enumerate(item["moves"], 1):
                try:
                    move = board.parse_san(entry["san"])
                except ValueError as exc:
                    issues.append({"id": key, "ply": ply, "kind": "illegal_san", "detail": str(exc)})
                    break
                expected = board.san(move)
                if entry["san"] != expected:
                    issues.append({"id": key, "ply": ply, "kind": "noncanonical_san", "actual": entry["san"], "expected": expected})
                if ply <= len(translations) and (translations[ply - 1]["san"] != expected or not translations[ply - 1]["note"].strip()):
                    issues.append({"id": key, "ply": ply, "kind": "translation_move"})
                board.push(move)
                plies += 1
                if not board.is_valid():
                    issues.append({"id": key, "ply": ply, "kind": "invalid_resulting_fen"})
            terminals["mate" if board.is_checkmate() else "stalemate" if board.is_stalemate() else "insufficient" if board.is_insufficient_material() else "ongoing"] += 1
        report[name] = {"items": len(data), "plies": plies, "final_positions": dict(terminals)}

    puzzles = read_data("puzzles.js", "PUZZLES")
    puzzle_results = []
    for index, puzzle in enumerate(puzzles):
        board = chess.Board(puzzle["fen"])
        if not board.is_valid():
            issues.append({"id": puzzle["title"], "kind": "invalid_puzzle_fen"})
            continue
        turn = "w" if board.turn else "b"
        if puzzle["turn"] != turn:
            issues.append({"id": puzzle["title"], "kind": "puzzle_turn"})
        depth, solutions = None, []
        for n in range(1, puzzle["mateIn"] + 1):
            solutions = mate_starts(board, n)
            if solutions:
                depth = n
                break
        if depth != puzzle["mateIn"] or solutions != sorted(puzzle["solutions"]):
            issues.append({"id": puzzle["title"], "kind": "puzzle_solution", "depth": depth, "solutions": solutions})
        puzzle_results.append({"index": index, "title": puzzle["title"], "mateIn": depth, "solutions": solutions})
        print(f"Puzzle {index + 1}/{len(puzzles)}: mate in {depth}, {len(solutions)} starting moves", flush=True)
    report["PUZZLES"] = {"items": len(puzzles), "results": puzzle_results}
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    report = audit()
    body = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
    if args.output:
        args.output.write_text(body, encoding="utf-8")
    print(body)
    return 1 if report["issues"] else 0


if __name__ == "__main__":
    raise SystemExit(main())

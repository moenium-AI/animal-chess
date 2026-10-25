#!/usr/bin/env python3
"""Independent Stockfish diagnostic of the 21 tactic and 18 endgame lessons.

This is *not* a best-move certification: illustrative replies, deliberately
bad moves, and low-depth score fluctuations must be reviewed by a human.
Uses the shipped JSON-like JS lesson arrays, not a second authored catalog.
"""
from __future__ import annotations

import argparse
import json
import shutil
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

import chess
import chess.engine

ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = ("combo", "endgame")
EXPECTED = {"combo": 21, "endgame": 18}
SNAPSHOT = ROOT / "docs" / "learning-fixes-tablebase.json"


def read_array(relative_path: str) -> list[dict]:
    text = (ROOT / relative_path).read_text(encoding="utf-8")
    return json.loads(text[text.index("["):text.rindex("]") + 1])


def lessons_to_audit() -> list[dict]:
    entries = read_array("js/lessons.js") + read_array("js/extra_lessons.js")
    lessons = [entry for entry in entries if entry["cat"] in CHAPTERS]
    counts = Counter(entry["cat"] for entry in lessons)
    if dict(counts) != EXPECTED:
        raise AssertionError(f"Unexpected chapter counts: {counts}")
    if len({l["id"] for l in lessons}) != len(lessons):
        raise AssertionError("Duplicate lesson IDs")
    if sum(len(l["moves"]) for l in lessons) != 149:
        raise AssertionError("Unexpected tactical/endgame ply count")
    return lessons


def check_saved_tablebase(lessons: list[dict]) -> dict:
    """Cross-check all 44 *previously saved* Lichess tablebase observations.

    These are historical evidence, NOT new live tablebase queries.
    Lichess category is relative to side-to-move.
    """
    by_id = {lesson["id"]: lesson for lesson in lessons}
    saved = json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    expected_counts = {"lucena": 16, "philidor": 12, "triangulation": 16}
    counts = Counter()
    for evidence in saved:
        name = evidence["lesson"]
        if name not in expected_counts:
            raise AssertionError(f"Unexpected snapshot lesson: {name}")
        counts[name] += 1
        lesson = by_id["eg_" + name]
        board = chess.Board(lesson.get("fen") or chess.STARTING_FEN)
        ply = evidence["ply"]
        if not 0 <= ply <= len(lesson["moves"]):
            raise AssertionError(f"Invalid snapshot ply {name}: {ply}")
        for move in lesson["moves"][:ply]:
            board.push_san(move["san"])
        if board.fen() != evidence["fen"]:
            raise AssertionError(f"Snapshot differs from published {name} ply {ply}")
        category = evidence["response"]["category"]
        expected = "draw" if name == "philidor" else (
            "win" if board.turn == chess.WHITE else "loss"
        )
        if category != expected:
            raise AssertionError(
                f"Published {name} ply {ply} lost expected {expected}: {category}"
            )
    if dict(counts) != expected_counts:
        raise AssertionError(f"Snapshot coverage incomplete: {counts}")
    return {"positions": len(saved), "lessons": sorted(expected_counts),
            "source": "saved 2026-10-16 responses (no fresh probe)"}


def verify_outcomes(lesson_id: str, board: chess.Board) -> None:
    if lesson_id in ("cb_fork", "eg_underpromo"):
        if not board.is_insufficient_material():
            raise AssertionError(f"{lesson_id}: expected insufficient-material draw")
    elif lesson_id == "eg_wrongbishop":
        if not board.is_stalemate():
            raise AssertionError("Wrong-color bishop demonstration must end in stalemate")
    elif lesson_id in ("cb_smother", "cb_backrank", "cb_deflection",
                       "eg_rook", "eg_tworooks", "eg_queen",
                       "cb_boden", "cb_anastasia", "cb_epaulette"):
        if not board.is_checkmate():
            raise AssertionError(f"{lesson_id}: published mate no longer holds")


def score_cp(info: dict, mover: chess.Color) -> int | None:
    pov_score = info.get("score")
    if pov_score is None:
        return None
    return pov_score.pov(mover).score(mate_score=20000)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--stockfish", default=None,
                        help="Stockfish UCI binary path (autodetected if omitted)")
    parser.add_argument("--time-per-search", type=float, default=0.15,
                        help="Seconds for each best/forced root search (default: 0.15)")
    parser.add_argument("--output", type=Path, default=None,
                        help="Optional JSON report path")
    parser.add_argument("--no-engine", action="store_true",
                        help="Check positions and saved tablebase evidence only")
    args = parser.parse_args()
    if not 0.02 <= args.time_per_search <= 10:
        parser.error("time-per-search must be between 0.02 and 10 seconds")

    lessons = lessons_to_audit()
    tablebase = check_saved_tablebase(lessons)
    binary = args.stockfish or shutil.which("stockfish") or (
        "/usr/games/stockfish" if Path("/usr/games/stockfish").exists() else None
    )
    if not args.no_engine and not binary:
        parser.error("Stockfish binary not found; pass --stockfish or --no-engine")

    scores = []
    outcomes = Counter()
    engine_name = None
    engine = chess.engine.SimpleEngine.popen_uci(binary) if not args.no_engine else None
    try:
        if engine:
            engine_name = engine.id.get("name", "")
            if "stockfish" not in engine_name.lower():
                raise AssertionError(f"Not Stockfish: {engine_name}")
            engine.configure({"Threads": 1, "Hash": 64})
        for lesson in lessons:
            board = chess.Board(lesson.get("fen") or chess.STARTING_FEN)
            if not board.is_valid():
                raise AssertionError(f"Invalid lesson starting FEN: {lesson['id']}")
            if len(lesson["moves"]) != len(lesson["en"]["moves"]):
                raise AssertionError(f"Bilingual ply count differs: {lesson['id']}")
            for index, (item, translated) in enumerate(
                zip(lesson["moves"], lesson["en"]["moves"])
            ):
                san = item["san"]
                if san != translated["san"]:
                    raise AssertionError(f"Bilingual SAN mismatch: {lesson['id']} {index}")
                move = board.parse_san(san)
                if board.san(move) != san:
                    raise AssertionError(f"Noncanonical SAN: {lesson['id']} {san}")
                if board.is_game_over():
                    raise AssertionError(f"Moves follow terminal position: {lesson['id']}")
                if engine:
                    side = board.turn
                    root = board.fen()
                    best = engine.analyse(board, chess.engine.Limit(
                        time=args.time_per_search))
                    forced = engine.analyse(board, chess.engine.Limit(
                        time=args.time_per_search), root_moves=[move])
                    best_cp, forced_cp = score_cp(best, side), score_cp(forced, side)
                    best_pv = best.get("pv") or []
                    best_san = board.san(best_pv[0]) if best_pv else None
                    scores.append({
                        "id": lesson["id"], "chapter": lesson["cat"],
                        "ply": index, "fen": root, "san": san,
                        "best_san": best_san,
                        "best_cp": best_cp, "forced_cp": forced_cp,
                        "loss_cp": (max(0, best_cp - forced_cp)
                                    if best_cp is not None and forced_cp is not None
                                    else None),
                        "best_depth": best.get("depth"),
                        "forced_depth": forced.get("depth"),
                    })
                board.push(move)
            verify_outcomes(lesson["id"], board)
            outcomes["checkmate" if board.is_checkmate() else
                     "stalemate" if board.is_stalemate() else
                     "insufficient_material" if board.is_insufficient_material() else
                     "ongoing"] += 1
    finally:
        if engine:
            engine.quit()

    alerts = sorted(
        [row for row in scores if row["loss_cp"] is not None and row["loss_cp"] >= 200],
        key=lambda row: row["loss_cp"], reverse=True
    )
    report = {
        "date_utc": datetime.now(timezone.utc).isoformat(),
        "engine": engine_name or "not run", "time_per_search": (
            args.time_per_search if engine else None),
        "scope": {"lessons": len(lessons), "plies": sum(len(x["moves"]) for x in lessons),
                  "chapters": dict(Counter(x["cat"] for x in lessons))},
        "saved_tablebase": tablebase, "end_positions": dict(outcomes),
        "caution": "Search score differences are diagnostic, not a proof of error. "
                   "Stockfish time limits are shallow and mate scores saturate. "
                   "Deliberate mistakes and illustrative responses are included.",
        "large_score_differences": alerts,
        "all_plies": scores
    }
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n",
                               encoding="utf-8")
    print(json.dumps({
        "engine": engine_name, "lessons": len(lessons),
        "plies": report["scope"]["plies"], "tablebase_snapshots": tablebase["positions"],
        "end_positions": dict(outcomes), "large_score_differences": len(alerts),
        "top_examples": [{k: item[k] for k in (
            "id", "ply", "san", "best_san", "loss_cp", "best_depth", "forced_depth")}
            for item in alerts[:30]]
    }, ensure_ascii=False))
    print("PASS: 39 published lessons, terminal assertions, and 44 saved tablebase states")


if __name__ == "__main__":
    main()

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


def verify_zwischenzug(lesson: dict) -> None:
    """The example must show the useful intermezzo, not an accidental mate in one."""
    board = chess.Board(lesson["fen"])
    for move in board.legal_moves:
        trial = board.copy()
        trial.push(move)
        if trial.is_checkmate():
            raise AssertionError("Zwischenzug setup has a mate-in-one alternative")
    board.push_san("Bxh2+")
    replies = [board.san(mv) for mv in board.legal_moves]
    if replies != ["Kh1"]:
        raise AssertionError(f"Unexpected defense after Bxh2+: {replies}")
    board.push_san("Kh1")
    if board.piece_at(chess.D8) != chess.Piece(chess.QUEEN, chess.WHITE):
        raise AssertionError("White queen no longer on d8")
    board.push_san("Rxd8")
    if board.piece_at(chess.D8) != chess.Piece(chess.ROOK, chess.BLACK):
        raise AssertionError("Intermezzo must still win the queen")


def verify_windmill(lesson: dict) -> None:
    """Verify all immediate defenses and the instructional wins after interpositions."""
    initial = chess.Board(lesson["fen"])
    if initial.piece_at(chess.F8) != chess.Piece(chess.KNIGHT, chess.BLACK):
        raise AssertionError("Windmill requires Black's knight on f8")
    initial.push_san("Rxc7+")
    replies = {initial.san(move) for move in initial.legal_moves}
    if replies != {"Kg8", "Qc3", "Qe5"}:
        raise AssertionError(f"Unaccounted-for windmill defense: {sorted(replies)}")
    if "Qc3" not in lesson["intro"] or "Qc3" not in lesson["en"]["intro"]:
        raise AssertionError("Both languages must explain the queen interposition")
    for answer, capture in (("Qc3", "Bxc3+"), ("Qe5", "Bxe5+")):
        board = initial.copy()
        board.push_san(answer)
        board.push_san(capture)
        white_piece = board.piece_at(chess.C3 if answer == "Qc3" else chess.E5)
        if white_piece != chess.Piece(chess.BISHOP, chess.WHITE) or not board.is_check():
            raise AssertionError(f"{answer} must lose the queen with check")
        if any(piece.piece_type == chess.QUEEN and piece.color == chess.BLACK
               for piece in board.piece_map().values()):
            raise AssertionError(f"Black queen escaped after {answer}")
    demo = initial.copy()
    for san in ("Kg8", "Rg7+", "Kh8", "Rxb7+", "Kg8", "Rg7+", "Kh8"):
        demo.push_san(san)



def verify_windmill_engine(engine: chess.engine.SimpleEngine, lesson: dict) -> None:
    """An independent search must not find a refutation of the practised move.

    The depth limit is deterministic; this guards a sound attack, not a claim
    that Rxc7+ is the fastest mate (Stockfish may prefer a quicker line).
    """
    board = chess.Board(lesson["fen"])
    expected_move = board.parse_san("Rxc7+")
    info = engine.analyse(board, chess.engine.Limit(depth=16),
                          root_moves=[expected_move])
    score = info["score"].pov(chess.WHITE).score(mate_score=20000)
    if score is None or score < 500:
        raise AssertionError(
            f"Windmill Rxc7+ must be winning against best defense: {score}"
        )



def verify_other_tactic_defenses(lesson: dict) -> None:
    """Ensure the advertised defenses and concrete captures remain sound."""
    lesson_id = lesson["id"]
    board = chess.Board(lesson["fen"])
    if lesson_id == "cb_smother":
        board.push_san("Nf7+")
        expected = {"Kg8", "Rxf7"}
        replies = {board.san(move) for move in board.legal_moves}
        if replies != expected:
            raise AssertionError(f"Unaccounted smothered-mate defense: {replies}")
        board.push_san("Rxf7")
        board.push_san("Qxf7")
        if board.piece_at(chess.F7) != chess.Piece(chess.QUEEN, chess.WHITE):
            raise AssertionError("Smothered-mate alternative must win the rook")
        if any(p.color == chess.BLACK and p.piece_type == chess.ROOK
               for p in board.piece_map().values()):
            raise AssertionError("Black rook survives Qxf7")
    elif lesson_id == "cb_decoy":
        if board.piece_at(chess.F8) != chess.Piece(chess.BISHOP, chess.BLACK):
            raise AssertionError("Decoy must have black bishop f8")
        if board.piece_at(chess.F1) != chess.Piece(chess.ROOK, chess.WHITE):
            raise AssertionError("Decoy requires White rook f1")
        board.push_san("Bb3+")
        replies = {board.san(m) for m in board.legal_moves}
        if replies != {"Kh8", "Qd5"}:
            raise AssertionError(f"Unexpected defense to Bb3+: {replies}")
        for response, continuation in (("Kh8", ["Nf7+", "Kg8", "Nxd8+"]),
                                       ("Qd5", ["Bxd5+"])):
            branch = board.copy()
            branch.push_san(response)
            for san in continuation:
                branch.push_san(san)
            if any(p.color == chess.BLACK and p.piece_type == chess.QUEEN
                   for p in branch.piece_map().values()):
                raise AssertionError(f"Decoy queen survives ...{response}")
    elif lesson_id == "cb_interference":
        if board.piece_at(chess.D1) != chess.Piece(chess.ROOK, chess.WHITE):
            raise AssertionError("Interference needs White rook d1")
        if board.piece_at(chess.E5) != chess.Piece(chess.BISHOP, chess.WHITE):
            raise AssertionError("Interference needs White bishop e5")
        board.push_san("c7")
        for response, continuation, square, kind in (
            ("Rxc7", ["dxc7", "Bd8", "cxd8=Q+"], chess.D8, chess.QUEEN),
            ("Bxd6", ["Rxd6"], chess.D6, chess.ROOK),
            ("Kf7", ["c8=Q"], chess.C8, chess.QUEEN),
        ):
            branch = board.copy()
            branch.push_san(response)
            for san in continuation:
                branch.push_san(san)
            if branch.piece_at(square) != chess.Piece(kind, chess.WHITE):
                raise AssertionError(f"Interference fails against ...{response}")


def verify_tactic_engine(engine: chess.engine.SimpleEngine, lesson: dict) -> None:
    """Guard each practised tactic against a serious engine refutation."""
    if lesson["id"] not in ("cb_smother", "cb_decoy", "cb_interference"):
        return
    board = chess.Board(lesson["fen"])
    move = board.parse_san(lesson["moves"][0]["san"])
    result = engine.analyse(board, chess.engine.Limit(depth=16), root_moves=[move])
    score = result["score"].pov(chess.WHITE).score(mate_score=20000)
    if score is None or score < 200:
        raise AssertionError(f"{lesson['id']} loses its advantage under defense: {score}")


def verify_outcomes(lesson_id: str, board: chess.Board) -> None:
    if lesson_id in ("cb_fork", "eg_underpromo"):
        if not board.is_insufficient_material():
            raise AssertionError(f"{lesson_id}: expected insufficient-material draw")
    elif lesson_id == "eg_wrongbishop":
        if not board.is_stalemate():
            raise AssertionError("Wrong-color bishop demonstration must end in stalemate")
    elif lesson_id in ("cb_smother", "cb_backrank", "cb_deflection",
                       "eg_rook", "eg_tworooks", "eg_queen",
                       "cb_boden", "cb_anastasia", "cb_epaulette",
                       "cb_windmill"):
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
    parser.add_argument("--practice-time", type=float, default=0.6,
                        help="Seconds per search for one practised move per lesson")
    parser.add_argument("--output", type=Path, default=None,
                        help="Optional JSON report path")
    parser.add_argument("--no-engine", action="store_true",
                        help="Check positions and saved tablebase evidence only")
    args = parser.parse_args()
    if not 0.02 <= args.time_per_search <= 10:
        parser.error("time-per-search must be between 0.02 and 10 seconds")

    if not 0.02 <= args.practice_time <= 10:
        parser.error("practice-time must be between 0.02 and 10 seconds")
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
            if lesson["id"] == "cb_zwischenzug":
                verify_zwischenzug(lesson)
            if lesson["id"] == "cb_windmill":
                verify_windmill(lesson)
                if engine:
                    verify_windmill_engine(engine, lesson)
            if lesson["id"] in ("cb_smother", "cb_decoy", "cb_interference"):
                verify_other_tactic_defenses(lesson)
                if engine:
                    verify_tactic_engine(engine, lesson)
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
                practice_ply = lesson.get("practice", {}).get("ply", 0)
                practised = index == practice_ply
                if engine:
                    side = board.turn
                    root = board.fen()
                    search_time = args.practice_time if practised else args.time_per_search
                    best = engine.analyse(board, chess.engine.Limit(time=search_time))
                    forced = engine.analyse(board, chess.engine.Limit(
                        time=search_time), root_moves=[move])
                    best_cp, forced_cp = score_cp(best, side), score_cp(forced, side)
                    best_pv = best.get("pv") or []
                    best_san = board.san(best_pv[0]) if best_pv else None
                    scores.append({
                        "id": lesson["id"], "chapter": lesson["cat"],
                        "ply": index, "practice_move": practised, "fen": root, "san": san,
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
        "practice_moves": [row for row in scores if row["practice_move"]],
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
            "id", "ply", "san", "best_san", "best_cp", "forced_cp",
            "loss_cp", "best_depth", "forced_depth")}
            for item in alerts[:30]]
    }, ensure_ascii=False))
    print("PASS: 39 published lessons, terminal assertions, and 44 saved tablebase states")


if __name__ == "__main__":
    main()

"""Temporary exploratory scan for robust windmill positions, not a CI gate."""
import json
import chess
import chess.engine

# All candidates preserve the white rook on g7 and bishop on b2.
BASE = [
("original", "5r1k/1pp3Rp/8/q7/8/8/1B6/6K1 w - - 0 1"),
("knight_queen_a5", "5n1k/1pp3Rp/8/q7/8/8/1B6/6K1 w - - 0 1"),
("knight_rook_a5", "5n1k/1pp3Rp/8/r7/8/8/1B6/6K1 w - - 0 1"),
("knight_queen_b5", "5n1k/1pp3Rp/8/1q6/8/8/1B6/6K1 w - - 0 1"),
("knight_queen_c5", "5n1k/1pp3Rp/8/2q5/8/8/1B6/6K1 w - - 0 1"),
("knight_queen_h5", "5n1k/1pp3Rp/8/7q/8/8/1B6/6K1 w - - 0 1"),
("knight_queen_d5", "5n1k/1pp3Rp/8/3q4/8/8/1B6/6K1 w - - 0 1"),
("knight_queen_a7", "5n1k/qpp3Rp/8/8/8/8/1B6/6K1 w - - 0 1"),
("knight_no_queen", "5n1k/1pp3Rp/8/8/8/8/1B6/6K1 w - - 0 1"),
("knight_rook_c5", "5n1k/1pp3Rp/8/2r5/8/8/1B6/6K1 w - - 0 1"),
("knight_rook_h5", "5n1k/1pp3Rp/8/7r/8/8/1B6/6K1 w - - 0 1"),
("knight_bishop_a5", "5n1k/1pp3Rp/8/b7/8/8/1B6/6K1 w - - 0 1"),
]

def format_score(info, side):
    score=info.get("score").pov(side)
    return {"cp":score.score(mate_score=20000), "mate":score.mate(), "depth":info.get("depth")}
with chess.engine.SimpleEngine.popen_uci("/usr/games/stockfish") as engine:
    engine.configure({"Threads":1,"Hash":32})
    for name,fen in BASE:
        try:
            b=chess.Board(fen)
            if not b.is_valid(): print(json.dumps({"name":name,"error":"invalid FEN"}));continue
            move=b.parse_san("Rxc7+")
            a=engine.analyse(b,chess.engine.Limit(time=0.30))
            f=engine.analyse(b,chess.engine.Limit(time=0.30),root_moves=[move])
            best=a.get("pv",[None])[0]
            best_san=b.san(best) if best else None
            b.push(move)
            d=engine.analyse(b,chess.engine.Limit(time=0.50))
            best_response=d.get("pv",[None])[0]
            r={"name":name,"fen":fen,"root_best":best_san,"root_best_score":format_score(a,chess.WHITE),"root_forced_score":format_score(f,chess.WHITE),
               "opponent_best":b.san(best_response) if best_response else None,"after_move_score":format_score(d,chess.WHITE),
               "all_black_responses":[b.san(m) for m in b.legal_moves]}
            print(json.dumps(r),flush=True)
        except Exception as exc:
            print(json.dumps({"name":name,"error":str(exc)}),flush=True)

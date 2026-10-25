"""Temporary candidate screening; removed before merge."""
import chess
import chess.engine
import itertools
import json
import math

BASE = {
 "smother": ("5r1k/pp4pp/8/4N3/8/1Q6/PP4PP/6K1 w - - 0 1", "Nf7+"),
 "decoy": ("3q1rk1/6pp/8/4N3/8/8/2B5/6K1 w - - 0 1", "Bb3+"),
 "interference": ("6k1/r3b1pp/2PP4/8/8/8/8/6K1 w - - 0 1", "c7")
}
def placements(kind):
 if kind=="smother":
  for white_rook in [None, "f1", "e1", "d1", "a1"]:
   for white_bishop in [None, "c4", "e3", "g5", "f4"]:
    for white_other in [None,"a1","d1"]:
     extra={}
     if white_rook:extra[white_rook]=(chess.ROOK,chess.WHITE)
     if white_bishop:extra[white_bishop]=(chess.BISHOP,chess.WHITE)
     if white_other:extra[white_other]=(chess.ROOK,chess.WHITE)
     if len(extra)!=(int(bool(white_rook))+int(bool(white_bishop))+int(bool(white_other))):continue
     yield extra
 elif kind=="decoy":
  for replace_rook in [None,chess.KNIGHT,chess.BISHOP,False]:
   for white_rook in [None, "a1","e1","f1","h1"]:
    for white_extra in [None,"a2","b2","d2","f2"]:
     extra={"f8":(replace_rook,chess.BLACK) if replace_rook not in (None,False) else None} if replace_rook is not None else {}
     if white_rook: extra[white_rook]=(chess.ROOK,chess.WHITE)
     if white_extra: extra[white_extra]=(chess.PAWN,chess.WHITE)
     yield extra
 else:
  for wr1 in [None,"d1","a1","c1","b1","e1"]:
   for wr2 in [None,"a1","d1","f1"]:
    for wb in [None,"e5","c5","f4","b4","e3"]:
     extra={}
     if wr1:extra[wr1]=(chess.ROOK,chess.WHITE)
     if wr2:extra[wr2]=(chess.ROOK,chess.WHITE)
     if wb:extra[wb]=(chess.BISHOP,chess.WHITE)
     if len(extra)!=len([x for x in (wr1,wr2,wb) if x]):continue
     yield extra

def score(info,side):
 s=info.get("score")
 return s.pov(side).score(mate_score=20000) if s else None

with chess.engine.SimpleEngine.popen_uci("/usr/games/stockfish") as e:
 e.configure({"Threads":1,"Hash":64})
 for kind,(fen,first) in BASE.items():
  winners=[]; examined=0;invalid=0
  for extra in placements(kind):
   b=chess.Board(fen)
   for sq,value in extra.items():
    if value is None:b.remove_piece_at(chess.parse_square(sq))
    else:b.set_piece_at(chess.parse_square(sq),chess.Piece(*value))
   if not b.is_valid():invalid+=1;continue
   try:
    m=b.parse_san(first)
    if b.san(m)!=first: invalid+=1;continue
   except ValueError:invalid+=1;continue
   examined+=1
   try:
    forced=e.analyse(b,chess.engine.Limit(time=0.07),root_moves=[m])
    cp=score(forced,chess.WHITE)
    if cp is None:continue
    if cp>=150:
     best=e.analyse(b,chess.engine.Limit(time=0.07))
     b.push(m)
     defending=e.analyse(b,chess.engine.Limit(time=0.07))
     replies=[b.san(x) for x in b.legal_moves]
     winners.append(dict(fen=b.fen(),base_fen=chess.Board(fen).fen(),extra={k:str(v) for k,v in extra.items()},score=cp,best_score=score(best,chess.WHITE),
         best_san=chess.Board(fen).san(best.get("pv",[m])[0]) if not extra and best.get("pv") else None,
         defender=b.san(defending["pv"][0]) if defending.get("pv") else None,
         defender_score=score(defending,chess.WHITE),replies=replies))
   except Exception as exc:
    print("engine_error",repr(exc),flush=True)
  winners.sort(key=lambda x:(x["score"]-max(0,(x["best_score"] or 0)-x["score"])*2),reverse=True)
  print(json.dumps({"kind":kind,"tested":examined,"invalid":invalid,"winner_count":len(winners),"top":winners[:22]}),flush=True)

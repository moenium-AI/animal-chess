'use strict';
// Unit test search-boundary invariants without exposing diagnostic APIs at runtime.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({Date, console, setTimeout, clearTimeout});
const root = path.resolve(__dirname, '..');
vm.runInContext(fs.readFileSync(path.join(root,'js/chess.js'),'utf8'),context);
let src = fs.readFileSync(path.join(root,'js/engine.js'),'utf8');
const original = 'return { chooseMove, bestMove, cancelPending, mateMoves, LEVELS };';
assert.ok(src.includes(original));
src = src.replace(original, 'return { chooseMove, bestMove, cancelPending, mateMoves, LEVELS, _test:{quiesce,search,analyzeRoot,repetitionKey,sideEval,findImmediateMate,findForcedMateInTwo,sparseMatingEndgame} };');
vm.runInContext(src,context);
const {Chess,Engine} = vm.runInContext('({Chess,Engine})',context);
const {quiesce,search,repetitionKey,sideEval,analyzeRoot} = Engine._test;
const config = game => ({rep:new Map([[repetitionKey(game),1]]),nodes:0,history:{},killers:[],tt:new Map(),useQuiesce:true,ply:0});
function q(fen) {const g=new Chess(fen),c=config(g);const s=quiesce(g,-1000000,1000000,Infinity,c,0);return {s,g,c};}
// Checkmate at the quiescence frontier must not be mistaken for material evaluation.
const checkmate = q('7k/6Q1/5K2/8/8/8/8/8 b - - 0 1');
assert.equal(checkmate.g.in_checkmate(),true);
assert.ok(checkmate.s < -90000, 'checkmated leaf score must be decisive');
// Being in check forbids stand pat; every quiet evasion must be searched.
const evasions=q('7k/8/5K2/8/8/8/8/7R b - - 0 1');
assert.equal(evasions.g.in_check(),true);
assert.ok(evasions.g.fast_moves().some(m=>!m.captured));
assert.ok(evasions.c.nodes > 1,'expected quiescence to search quiet evasions');
// Stalemate has value zero even when the static material score is enormous.
const stalemate=q('7k/5K2/6Q1/8/8/8/8/8 b - - 0 1');
assert.equal(stalemate.g.in_stalemate(),true);
assert.equal(stalemate.s,0);
// Repetition is based on the board/turn/castling/en-passant, not move clocks.
const repeated=new Chess('8/8/8/8/8/7k/8/K7 w - - 12 35');
const repeatedCtx=config(repeated);repeatedCtx.rep.set(repetitionKey(repeated),2);
assert.equal(search(repeated,2,-100000,100000,1,Infinity,repeatedCtx),0);
assert.equal(repeatedCtx.rep.get(repetitionKey(repeated)),2,'repetition bookkeeping survives return');
// Do not spuriously draw checkmate at the fifty-move threshold.
const mate100=new Chess('7k/6Q1/5K2/8/8/8/8/8 b - - 100 70');
assert.ok(search(mate100,2,-1000000,1000000,1,Infinity,config(mate100)) < -90000);
// The root search must always return legal moves with finite scores.
const initial=new Chess();const results=analyzeRoot(initial.fen(),1,200,true,0);
assert.equal(results.length,20);
for(const result of results){assert.ok(Number.isFinite(result.score));assert.ok(initial.move(result.move));initial.undo();}
// A past-due deadline must never trigger unbounded 'first move' searching.
const fallback=analyzeRoot(initial.fen(),6,-1000,true,0);
assert.equal(fallback.length,20);
for(const r of fallback){assert.ok(Number.isFinite(r.score));assert.ok(initial.move(r.move));initial.undo();}
// Strength dials advance search budgets and decrease random noise monotonically;
// this does NOT claim a strictly monotonic practical Elo.
for(let level=2;level<=10;level++){
 const prev=Engine.LEVELS[level-1], cur=Engine.LEVELS[level];
 assert.ok(cur.depth>=prev.depth && cur.timeMs>=prev.timeMs, 'search budget regressed at '+level);
 assert.ok(cur.margin<=prev.margin && cur.noise<=prev.noise && cur.blunder<=prev.blunder, 'strength noise regressed at '+level);
}

// Lv4 must not voluntarily skip checkmate, even when no search pass can finish
// and the normal strength configuration would choose a random near-best move.
const mateFen = '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1';
const matePosition = new Chess(mateFen);
const mate = Engine._test.findImmediateMate(matePosition);
assert.ok(mate, 'immediate mate must be recognized');
assert.equal(matePosition.move(mate).san, 'Re8#');
matePosition.undo();
const aborted = analyzeRoot(mateFen, 6, -1000, true, 0);
assert.ok(aborted.length>0);
const fallbackMate = matePosition.move(aborted[0].move);
assert.ok(fallbackMate && matePosition.in_checkmate(),
  'even the time-expired static root must rank mate first');
matePosition.undo();

// Force mate in two in a sparse rook endgame. A non-checking king move
// prepares the mate; a checks-only detector would fail this test.
const mateTwoFen = '7k/8/5K2/8/8/8/8/R7 w - - 0 1';
const sparse = new Chess(mateTwoFen);
assert.equal(Engine._test.sparseMatingEndgame(sparse), true);
assert.equal(Engine._test.findImmediateMate(sparse), null);
const mateTwo = Engine._test.findForcedMateInTwo(sparse, Date.now() + 10000);
assert.ok(mateTwo, 'forced mate in two should be found in sparse rook ending');
sparse.move(mateTwo);
assert.ok(!sparse.game_over(), 'the first move must not stalemate');
for (const reply of sparse.fast_moves()) {
  sparse.move(reply);
  assert.ok(Engine._test.findImmediateMate(sparse), 'every defence must allow mate in one');
  sparse.undo();
}
sparse.undo();
assert.equal(sparse.fen(), mateTwoFen, 'tactical preflight must restore the position');

// Exercise the publicly exposed asynchronous selector repeatedly, including
// low clock settings where ordinary iterative deepening cannot complete.
async function regression() {
  const saved = Engine.LEVELS[4].timeMs;
  try {
    Engine.LEVELS[4].timeMs = -1;
    for (let attempt = 0; attempt < 4; attempt++) {
      const selected = await new Promise(resolve => Engine.chooseMove(mateFen, 4, resolve));
      const g = new Chess(mateFen);
      assert.ok(g.move(selected), 'selector returned an illegal move');
      assert.ok(g.in_checkmate(), 'Lv4 must deliver mate regardless of random choice');
    }
  } finally { Engine.LEVELS[4].timeMs = saved; }
  console.log('PASS: check evasions, draws, root scoring, Lv4 immediate mate and bounded mate-in-two');
}
regression().catch(error => { console.error(error); process.exitCode = 1; });

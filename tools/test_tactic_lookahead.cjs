'use strict';
// Material-only minimax audit of four half-moves after each intended tactic.
// It is a safety screen, NOT a claim that the first move is engine-optimal.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../js/chess.js'),'utf8'), ctx);
const Chess = vm.runInContext('Chess',ctx);
const puzzles = require('./puzzle_catalog.json').puzzles.filter(p=>p.objective==='tactic');
const byId = new Map(puzzles.map(p=>[p.id,p]));
const value = {p:100,n:320,b:330,r:500,q:900,k:0};
function material(g){
  let score=0;
  for(const row of g.board()) for(const piece of row) if(piece)
    score+=(piece.color==='w'?1:-1)*value[piece.type];
  return score;
}
const MATE=100000, DEPTH=4, MAX_LOSS=150;
let nodes=0, replies=0, answers=0;
function score(g,depth,alpha,beta,ply=0){
  nodes++;
  if(g.in_checkmate()) return g.turn()==='w' ? -MATE+ply : MATE-ply;
  if(g.in_draw())return 0;
  if(depth===0)return material(g);
  const moves=g.fast_moves();
  if(!moves.length)return material(g);
  moves.sort((a,b)=>(b.captured?value[b.captured]:0)-(a.captured?value[a.captured]:0));
  if(g.turn()==='w'){
    let best=-MATE;
    for(const m of moves){g.move(m);best=Math.max(best,score(g,depth-1,alpha,beta,ply+1));g.undo();alpha=Math.max(alpha,best);if(beta<=alpha)break;}
    return best;
  }
  let best=MATE;
  for(const m of moves){g.move(m);best=Math.min(best,score(g,depth-1,alpha,beta,ply+1));g.undo();beta=Math.min(beta,best);if(beta<=alpha)break;}
  return best;
}
function replay(id,...sans){const p=byId.get(id);assert.ok(p,id);const g=new Chess(p.fen);for(const san of sans){assert.ok(g.move(san),id+': '+san);}return g;}
// Regression lines which the original one-ply defense audit could not see.
{
 const g=replay('tactic-pin-rook-relative','Rf2','Qa3');
 assert.ok(!g.in_check(),'rook relative pin must not allow a queen check on the king');
}
{
 const g=replay('tactic-bishop-double-attack','Bg5','Qg7');
 assert.ok(g.move('Bxh4'),'bishop must be able to capture the forked rook');
}
{
 const g=replay('tactic-pin-bishop-relative','Bg5','Rb7');
 assert.ok(g.move('Bxd8'),'moving the pinned rook must expose its queen');
}
{
 const g=replay('tactic-fork-pawn-major','d5','Qc5+','Kg2','Rxe4');
 assert.ok(g.move('fxe4'),'pawn recapture must prevent the rook from winning the defender');
}
{
 const g=replay('tactic-promotion-knight-majors','a8=N','Qb7');
 assert.ok(g.move('Bxb7'),'bishop must defend against queen attack on the promoted knight');
}
const violations=[];
for(const p of puzzles){
 const baseline=material(new Chess(p.fen));
 for(const san of p.solutions){
  const g=new Chess(p.fen);
  assert.ok(g.move(san),p.id+': '+san);
  answers++;
  replies+=g.fast_moves().length;
  const outcome=score(g,DEPTH,-MATE,MATE);
  if(outcome<baseline-MAX_LOSS)violations.push(p.id+' '+san+': initial='+baseline+', defense='+outcome);
 }
}
assert.deepEqual(violations,[], 'Tactics lost material/mate in next '+DEPTH+' plies: '+violations.join('; '));
console.log('PASS: '+puzzles.length+' tactics, '+answers+' answers, '+replies+' replies, '+nodes+' nodes, '+DEPTH+'-ply minimax defense');

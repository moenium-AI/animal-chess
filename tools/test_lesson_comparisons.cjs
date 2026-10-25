'use strict';
// Each alternative starts from the precise position before the indicated
// annotated move, and every ply must be legal and fully SAN-canonical.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ctx=vm.createContext({console});
for(const name of ['chess','lessons','intro_lessons','extra_lessons','lesson_comparisons'])
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',name+'.js'),'utf8'),ctx);
const {Chess,LESSONS,INTRO_LESSONS,EXTRA_LESSONS,LESSON_COMPARISONS}=
  vm.runInContext('({Chess,LESSONS,INTRO_LESSONS,EXTRA_LESSONS,LESSON_COMPARISONS})',ctx);
const byId=new Map([...LESSONS,...INTRO_LESSONS,...EXTRA_LESSONS].map(l=>[l.id,l]));
const keys=Object.keys(LESSON_COMPARISONS);
// Stable coverage: dropping a curated comparison must fail the regression.
const EXPECTED_COMPARISONS = [
  'bk_stalemate','bk_mate','bk_castling','bk_enpassant','op_london',
  'pr_pin','cb_checkcapture','cb_knightfork2','cb_rookfile','cb_windmill',
  'cb_smother','cb_decoy','cb_interference',
  'eg_rookbehind','eg_passadvance','pr_trade'
];
assert.deepEqual(keys.sort(), EXPECTED_COMPARISONS.sort(), 'comparison catalog changed without review');
const positions={};
for(const id of keys){
  const l=byId.get(id),c=LESSON_COMPARISONS[id];
  assert.ok(l,'unknown lesson '+id);
  assert.ok(Number.isInteger(c.ply) && c.ply>=0 && c.ply<l.moves.length,'bad ply '+id);
  assert.ok(Array.isArray(c.alternative) && c.alternative.length>0 && c.alternative.length<=4,id);
  assert.ok(c.main.ja&&c.main.en&&c.other.ja&&c.other.en,id);
  assert.ok(['stalemate','kingSafety','castle','enpassant','plans','pin','capture','fork','check','tempo','defense'].includes(c.theme),id);
  const root=new Chess(l.fen||undefined);
  for(let i=0;i<c.ply;i++)assert.ok(root.move(l.moves[i].san),id+' root illegal '+i);
  const fen=root.fen();
  const main=new Chess(fen);
  const mainMove=main.move(l.moves[c.ply].san);
  assert.ok(mainMove,id+' main move illegal');
  const other=new Chess(fen);
  for(const [i,san] of c.alternative.entries()){
    const mv=other.move(san);
    assert.ok(mv,id+' alt move illegal '+san);
    assert.equal(mv.san,san,id+' noncanonical alternative SAN '+san);
  }
  assert.notEqual(c.alternative[0],mainMove.san,id+' variation does not diverge');
  assert.equal(root.fen(),fen,id+' baseline was modified');
  positions[id]={main,other,root};
}
assert.equal(positions.bk_stalemate.main.in_stalemate(),true,'Qf7 must stalemate');
assert.equal(positions.bk_stalemate.other.in_stalemate(),false,'Qf6+ avoids stalemate');
assert.equal(positions.bk_mate.other.in_checkmate(),false,'g3 must avoid the immediate mate');
assert.equal(positions.bk_castling.main.get('g1').type,'k','O-O king');
assert.equal(positions.bk_castling.other.fen().split(' ')[2].includes('K'),false,'Kd2 loses castling right');
assert.equal(positions.bk_enpassant.main.get('d5'),null,'en passant captures d5 pawn');
assert.equal(positions.bk_enpassant.other.get('e6').type,'p','normal pawn advance');
assert.equal(positions.pr_pin.main.get('g5').type,'b','pin bishop');
assert.equal(positions.pr_pin.other.get('e3').type,'b','alternate development');
assert.equal(positions.cb_checkcapture.main.get('d3').color,'w','rook takes queen');
assert.equal(positions.cb_checkcapture.other.get('d2').color,'b','queen takes rook');
assert.equal(positions.cb_knightfork2.main.in_check(),true,'knight fork check');
assert.equal(positions.cb_knightfork2.other.in_check(),false,'alternate lacks check');
assert.equal(positions.cb_rookfile.main.in_check(),true,'Ra8+ is a check');
assert.equal(positions.cb_rookfile.other.in_check(),false,'Ra7 is not a check');
assert.equal(positions.eg_rookbehind.main.get('a1').type,'r','rook behind pawn');
assert.equal(positions.eg_rookbehind.other.get('b8').type,'r','rook checked');
assert.equal(positions.eg_passadvance.main.get('a7').type,'p','passed pawn advances');
assert.equal(positions.eg_passadvance.other.get('a6').type,'p','pawn is not advanced');
assert.equal(positions.pr_trade.other.get('e4').color,'b','...dxe4 captures e4 pawn');
assert.equal(positions.cb_windmill.main.get('g8').type,'k','windmill king escapes to g8');
assert.equal(positions.cb_windmill.other.get('c3').type,'b','bishop takes the queen after ...Qc3');
assert.equal(positions.cb_windmill.other.get('c3').color,'w','white wins queen with bishop');
assert.equal(positions.cb_windmill.other.in_check(),true,'queen capture must give check');
assert.equal(positions.cb_smother.main.get('g8').type,'k','smother king line');
assert.equal(positions.cb_smother.other.get('f7').type,'q','Qxf7 wins black rook');
assert.equal(positions.cb_smother.other.get('f7').color,'w','white queen on f7');
assert.equal(positions.cb_decoy.main.get('h8').type,'k','king lured to h8');
assert.equal(positions.cb_decoy.other.get('d5').type,'b','bishop captures queen on d5');
assert.equal(positions.cb_decoy.other.get('d5').color,'w','white bishop on d5');
assert.equal(positions.cb_interference.main.get('c7').type,'r','black rook takes advanced pawn');
assert.equal(positions.cb_interference.other.get('c8').type,'q','pawn promotes after ...Kf7');
assert.equal(positions.cb_interference.other.get('c8').color,'w','white promotion queen');
console.log(JSON.stringify({comparedLessons:keys.length,legality:'PASS',criticalOutcomes:'PASS',sourceLessons:byId.size}));

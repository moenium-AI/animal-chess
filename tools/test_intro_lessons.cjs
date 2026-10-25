'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ctx = vm.createContext({ console });
for (const name of ['chess','learning','intro_lessons','lessons','puzzles'])
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',name+'.js'),'utf8'),ctx);
const { Chess, Learning, INTRO_LESSONS, LESSONS, PUZZLES } =
  vm.runInContext('({Chess,Learning,INTRO_LESSONS,LESSONS,PUZZLES})',ctx);
assert.equal(INTRO_LESSONS.length,24);
assert.equal(INTRO_LESSONS.filter(x=>x.cat==='basics').length,14);
assert.equal(INTRO_LESSONS.filter(x=>x.cat==='principles').length,10);
const validTheme = new Set(PUZZLES.map(p=>p.theme));
const ids = new Set(LESSONS.map(x=>x.id));
let plies=0, promoted=0, enPassant=0, stalemate=0;
for(const lesson of INTRO_LESSONS){
  assert.ok(!ids.has(lesson.id), 'legacy ID collision: '+lesson.id);
  assert.ok(!ids.has(lesson.id), 'duplicate lesson: '+lesson.id);
  ids.add(lesson.id);
  assert.ok(['basics','principles'].includes(lesson.cat));
  assert.ok(lesson.title && lesson.intro && lesson.takeaway && lesson.en.title && lesson.en.intro && lesson.en.takeaway);
  assert.equal(lesson.en.moves.length,lesson.moves.length);
  assert.ok(lesson.puzzleTheme===null || validTheme.has(lesson.puzzleTheme), 'unknown puzzle theme '+lesson.id);
  assert.ok(Number.isInteger(lesson.practice.ply) && lesson.practice.ply>=0 && lesson.practice.ply<lesson.moves.length);
  assert.ok(lesson.practice.prompt && lesson.practice.hint && lesson.en.practice.prompt && lesson.en.practice.hint);
  const g = lesson.fen ? new Chess(lesson.fen) : new Chess();
  for(const [i,item] of lesson.moves.entries()){
    assert.equal(item.san,lesson.en.moves[i].san,'SAN discrepancy: '+lesson.id);
    assert.ok(item.note && lesson.en.moves[i].note, 'missing bilingual commentary: '+lesson.id);
    if(i===lesson.practice.ply){
      const fen = g.fen(), history=g.history().join(' ');
      const legal=g.moves({verbose:true});
      const answer=legal.find(m=>m.san===item.san);
      assert.ok(answer,'practice answer not legal: '+lesson.id+' '+item.san);
      const result=Learning.practiceMove(g,item.san,answer);
      assert.equal(result.legal,true);
      assert.equal(result.correct,true);
      assert.equal(g.fen(),fen, 'grading mutated game: '+lesson.id);
      assert.equal(g.history().join(' '),history);
      const alternative=legal.find(m=>m.san!==item.san);
      if(alternative)assert.equal(Learning.practiceMove(g,item.san,alternative).correct,false);
      assert.equal(Learning.practiceMove(g,item.san,{from:'a9',to:'a0'}).legal,false);
      if(answer.promotion)promoted++;
      if(item.san==='exd6')enPassant++;
    }
    const move=g.move(item.san);
    assert.ok(move,'invalid SAN at '+lesson.id+' ply '+(i+1)+': '+item.san);
    assert.equal(move.san,item.san,'noncanonical SAN: '+lesson.id+' '+item.san);
    plies++;
  }
  if(lesson.id==='bk_stalemate'){assert.equal(g.in_stalemate(),true);stalemate++;}
  if(lesson.id==='bk_mate')assert.equal(g.in_checkmate(),true);
}
assert.equal(promoted,1);
assert.equal(enPassant,1);
assert.equal(stalemate,1);
const cleaned=Learning.restoreProgress(JSON.stringify({
  bk_pawn:'studied',bk_rook:'mastered',random:'mastered',bk_mate:true
}),ids);
assert.equal(cleaned.bk_pawn,'studied');
assert.equal(cleaned.bk_rook,'mastered');
assert.equal(cleaned.random,undefined);
assert.equal(cleaned.bk_mate,undefined);
assert.deepEqual(Object.keys(Learning.restoreProgress('not-json',ids)),[]);
assert.equal(Learning.markProgress(cleaned,'bk_rook','studied'),cleaned,'mastery must not downgrade');
const next=Learning.markProgress(cleaned,'bk_pawn','mastered');
assert.equal(next.bk_pawn,'mastered');
assert.throws(()=>Learning.markProgress(next,'bk_pawn','unknown'));
console.log(JSON.stringify({lessons:INTRO_LESSONS.length,plies,promoted,enPassant,stalemate,progress:'PASS'}));

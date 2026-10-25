'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ctx=vm.createContext({console});
for(const name of ['chess','learning','intro_lessons','lessons','extra_lessons','games','puzzles'])
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',name+'.js'),'utf8'),ctx);
const {Chess,Learning,INTRO_LESSONS,LESSONS,EXTRA_LESSONS,FAMOUS_GAMES,PUZZLES} =
  vm.runInContext('({Chess,Learning,INTRO_LESSONS,LESSONS,EXTRA_LESSONS,FAMOUS_GAMES,PUZZLES})',ctx);
assert.equal(INTRO_LESSONS.length,24);
assert.equal(LESSONS.length,44);
assert.equal(EXTRA_LESSONS.length,12);
assert.equal(FAMOUS_GAMES.length,15);
const lessons=[...INTRO_LESSONS,...LESSONS,...EXTRA_LESSONS];
assert.equal(lessons.length,80);
const ids=new Set(),validTheme=new Set(PUZZLES.map(x=>x.theme));
const counts={basics:0,principles:0,combo:0,opening:0,endgame:0};
let lessonPlies=0,gamePlies=0,practices=0,legacyPractices=0;
for(const lesson of lessons){
  assert.ok(!ids.has(lesson.id),'duplicate lesson ID '+lesson.id);ids.add(lesson.id);
  assert.ok(Object.hasOwn(counts,lesson.cat),'unrecognized chapter '+lesson.id);
  counts[lesson.cat]++;
  assert.ok(lesson.title&&lesson.intro&&lesson.takeaway&&lesson.en?.title&&lesson.en.intro&&lesson.en.takeaway,lesson.id);
  assert.equal(lesson.moves.length,lesson.en.moves.length,lesson.id);
  assert.ok(lesson.moves.length>=1,lesson.id);
  if(lesson.puzzleTheme)assert.ok(validTheme.has(lesson.puzzleTheme),lesson.id+' puzzle theme');
  const practice=lesson.practice||{ply:Learning.legacyPly(lesson)};
  if(!lesson.practice)legacyPractices++;
  assert.ok(Number.isInteger(practice.ply)&&practice.ply>=0&&practice.ply<lesson.moves.length,lesson.id);
  if(lesson.practice)assert.ok(lesson.practice.prompt&&lesson.practice.hint&&lesson.en.practice?.prompt&&lesson.en.practice.hint,lesson.id);
  const board=new Chess(lesson.fen||undefined);
  for(let i=0;i<lesson.moves.length;i++){
    const m=lesson.moves[i];
    assert.equal(m.san,lesson.en.moves[i].san,lesson.id+' bilingual SAN at '+i);
    assert.ok(m.note.trim()&&lesson.en.moves[i].note.trim(),lesson.id+' missing note at '+i);
    if(i===practice.ply){
      const fen=board.fen(),legal=board.moves({verbose:true}),move=legal.find(mv=>mv.san===m.san);
      assert.ok(move,lesson.id+' practice illegal at '+i+' '+m.san);
      const result=Learning.practiceMove(board,m.san,move);
      assert.equal(result.legal,true,lesson.id);
      assert.equal(result.correct,true,lesson.id);
      const alt=legal.find(x=>x.san!==m.san);
      if(alt)assert.equal(Learning.practiceMove(board,m.san,alt).correct,false,lesson.id);
      assert.equal(board.fen(),fen,'Practice mutated board: '+lesson.id);
      practices++;
    }
    const played=board.move(m.san);
    assert.ok(played,lesson.id+' illegal '+m.san);
    assert.equal(played.san,m.san,lesson.id+' noncanonical '+m.san);
    lessonPlies++;
  }
}
assert.deepEqual(counts,{basics:14,principles:10,combo:21,opening:17,endgame:18});
assert.equal(practices,80);assert.equal(legacyPractices,44);
for(const item of FAMOUS_GAMES){
  assert.ok(!ids.has(item.id),'duplicate game/lesson ID '+item.id);ids.add(item.id);
  assert.ok(item.title&&item.intro&&item.takeaway&&item.en?.title&&item.en.intro&&item.en.takeaway,item.id);
  assert.ok(item.moves.length&&item.moves.length===item.en.moves.length,item.id);
  const board=new Chess(item.fen||undefined);
  for(let i=0;i<item.moves.length;i++){
    const m=item.moves[i], translated=item.en.moves[i];
    assert.equal(m.san,translated.san,item.id+' bilingual SAN '+i);
    assert.ok(m.note.trim()&&translated.note.trim(),'unannotated game move '+item.id+' '+i);
    const mv=board.move(m.san);assert.ok(mv,item.id+' illegal '+m.san);
    assert.equal(mv.san,m.san,item.id+' noncanonical '+m.san);
    gamePlies++;
  }
}
assert.equal(ids.size,95);
assert.equal(gamePlies,695);
const p=Learning.restoreProgress('{"op_london":"mastered","opera":"studied","fake":"mastered"}',ids);
assert.equal(p.op_london,'mastered');assert.equal(p.opera,'studied');assert.equal(p.fake,undefined);
console.log(JSON.stringify({lessons:80,chapters:counts,legacyPractice:legacyPractices,allPractice:practices,lessonPlies,famousGames:15,gamePlies,progress:'PASS'}));
// The regular course CI must also validate the reasoning catalog and storage. 
require('./test_puzzle_theme_integrity.cjs');
require('./test_lesson_reasoning.cjs');
require('./test_reasoning_positions.cjs');
require('./test_reasoning_distractors.cjs');
// Nonblocking metrics: quantify distractor-length leakage on every CI run.
require('./audit_reasoning_quality.cjs');

'use strict';
// User-facing Japanese chess terms and their concrete board geometry.
// A vocabulary check alone is not proof; the examples below replay real moves.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const files=[
  'js/lessons.js','js/intro_lessons.js','js/extra_lessons.js',
  'js/games.js','js/puzzles.js','js/lesson_comparisons.js',
  'js/lesson_reasoning.js','js/lesson_reasoning_endgames.js',
  'js/lesson_reasoning_openings.js','js/lesson_reasoning_foundations.js'
];
for(const name of files) {
  const content=fs.readFileSync(path.join(root,name),'utf8');
  for(const [bad,description] of [
    ['最終列','promotion/back rank is a rank, not a file'],
    ['e筋(バックランク)','e-file must not be called a back rank'],
    ['合駒','describe interposition in accessible chess terminology'],
    ['王手','use チェック in chess explanations'],
  ]) assert.ok(!content.includes(bad),name+': '+description);
}
const source=fs.readFileSync(path.join(root,'tools/lessons_gen.py'),'utf8');
assert.ok(!source.includes('最終列'),'lesson generator still uses columns for ranks');
assert.ok(!source.includes('e筋(バックランク)'),'lesson generator confuses files and ranks');
const converter=fs.readFileSync(path.join(root,'tools/retermize.py'),'utf8');
assert.ok(!converter.includes('"ダブルチェック(両王手)"'),'terminology converter must not restore shogi labels');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'tools/puzzle_catalog.json'),'utf8'));
assert.equal(catalog.puzzles.length,80);
assert.ok(!JSON.stringify(catalog.puzzles).includes('最終列'));
const ctx=vm.createContext({});
for(const name of ['chess','lessons','intro_lessons','extra_lessons','puzzles',
  'lesson_reasoning','lesson_reasoning_endgames',
  'lesson_reasoning_openings','lesson_reasoning_foundations']) {
  vm.runInContext(fs.readFileSync(path.join(root,'js',name+'.js'),'utf8'),ctx,{filename:name+'.js'});
}
const {Chess,LESSONS,INTRO_LESSONS,EXTRA_LESSONS,PUZZLES,LESSON_REASONING}=
  vm.runInContext('({Chess,LESSONS,INTRO_LESSONS,EXTRA_LESSONS,PUZZLES,LESSON_REASONING})',ctx);
const courses=new Map([...LESSONS,...INTRO_LESSONS,...EXTRA_LESSONS].map(x=>[x.id,x]));
const puzzles=new Map(PUZZLES.map(x=>[x.id,x]));
assert.equal(courses.size,80);
assert.equal(Object.keys(LESSON_REASONING).length,80);
assert.match(courses.get('bk_board').intro,/ファイル/);
assert.match(courses.get('bk_board').intro,/ランク/);
assert.match(courses.get('eg_promote').intro,/最終段/);
assert.match(courses.get('eg_promote').intro,/両隣の筋/);
const promotion=new Chess(courses.get('eg_promote').fen);
assert.equal(promotion.get('b7').type,'p');
assert.ok(promotion.move('b8=Q'));
assert.equal(promotion.get('b8').type,'q');
const rook=new Chess(courses.get('eg_rook').fen);
assert.equal(rook.get('e8').type,'k');
assert.ok(rook.move('Ra8#'));
assert.equal(rook.get('a8').type,'r');
assert.ok(rook.in_checkmate());
assert.match(courses.get('eg_rook').moves[0].note,/8段目/);
const puzzle=puzzles.get('puzzle-010'),puzzleBoard=new Chess(puzzle.fen);
assert.ok(puzzle.idea.includes('8段目'));
assert.ok(puzzleBoard.move('Ra8#'));
assert.ok(puzzleBoard.in_checkmate());
const distraction=courses.get('cb_deflection');
assert.ok(distraction.intro.includes('e筋'));
assert.ok(!distraction.intro.includes('バックランク'));
const discovered=courses.get('cb_rookfile');
assert.ok(discovered.title.includes('ファイル'));
const discoveryBoard=new Chess(discovered.fen);
assert.ok(discoveryBoard.move('Ra8+'));
assert.equal(discoveryBoard.get('a8').type,'r');
assert.equal(discoveryBoard.get('g8').type,'k');
assert.equal(discoveryBoard.in_check(),true);
assert.ok(LESSON_REASONING.eg_lucena.defense.ja.question.includes('間に入れる'));
console.log(JSON.stringify({
  lessons:courses.size,puzzles:puzzles.size,reasoning:160,
  scannedFiles:files.length,geometryChecks:'PASS',terminology:'PASS'
}));

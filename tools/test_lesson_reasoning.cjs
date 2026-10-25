'use strict';
// Independent data and progress checks for the reasoning quizzes.
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const ctx = vm.createContext({console});
for (const name of ['chess', 'learning', 'lessons', 'intro_lessons', 'extra_lessons', 'lesson_comparisons', 'lesson_reasoning', 'lesson_reasoning_endgames'])
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', name+'.js'), 'utf8'), ctx);
const {Chess, Learning, LESSONS, INTRO_LESSONS, EXTRA_LESSONS, LESSON_COMPARISONS, LESSON_REASONING} =
  vm.runInContext('({Chess,Learning,LESSONS,INTRO_LESSONS,EXTRA_LESSONS,LESSON_COMPARISONS,LESSON_REASONING})',ctx);
const all = new Map([...LESSONS, ...INTRO_LESSONS, ...EXTRA_LESSONS].map(lesson => [lesson.id, lesson]));
const lessonCatalog=[...LESSONS,...INTRO_LESSONS,...EXTRA_LESSONS];
const tacticIds=lessonCatalog.filter(lesson=>lesson.cat==='combo').map(lesson=>lesson.id);
const endgameIds=lessonCatalog.filter(lesson=>lesson.cat==='endgame').map(lesson=>lesson.id);
assert.equal(tacticIds.length,21,'all tactical lessons must be covered');
assert.equal(endgameIds.length,18,'all endgame lessons must be covered');
const expected = ['bk_stalemate','bk_castling',...tacticIds,...endgameIds];
assert.deepEqual(Object.keys(LESSON_REASONING).sort(), expected.slice().sort(), 'unexpected/missing reasoning lessons');
const original=['bk_stalemate','bk_castling','cb_windmill','cb_smother','cb_decoy','cb_interference'];
let checked = 0, proofed = 0, endgameProofs=0;
for (const id of expected) {
  assert.ok(all.has(id), 'Unknown lesson '+id);
  if (original.includes(id)) assert.ok(LESSON_COMPARISONS[id], 'Missing audited comparison for '+id);
  const quiz = LESSON_REASONING[id];
  assert.deepEqual(Object.keys(quiz).sort(), ['defense','why']);
  for (const kind of ['why','defense']) {
    const q = quiz[kind];
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 3, id+'/'+kind);
    for (const lang of ['ja','en']) {
      const variant = q[lang];
      assert.ok(variant && typeof variant.question === 'string' && variant.question.trim(), id+'/'+lang);
      assert.ok(typeof variant.explanation === 'string' && variant.explanation.trim(), id+'/'+lang);
      assert.ok(Array.isArray(variant.options) && variant.options.length === 3,id+'/'+lang);
      assert.equal(new Set(variant.options).size,3,id+'/'+lang+' duplicate choices');
      for (const option of variant.options) assert.ok(typeof option === 'string' && option.trim(),id+'/'+lang);
    }
    if (!original.includes(id)) {
      const evidence=q.evidence;
      assert.ok(evidence && Array.isArray(evidence.line) && evidence.line.length>=1,id+'/'+kind+' evidence');
      const lesson=all.get(id), board=new Chess(lesson.fen || undefined);
      for(const san of evidence.line) {
        const played=board.move(san);
        assert.ok(played,id+'/'+kind+' illegal evidence '+san);
        assert.equal(played.san,san,id+'/'+kind+' noncanonical '+san);
      }
      if(evidence.terminal==='checkmate') assert.equal(board.in_checkmate(),true,id+'/'+kind+' mate');
      else if(evidence.terminal==='insufficient') assert.equal(board.insufficient_material(),true,id+'/'+kind+' draw');
      else if(evidence.terminal==='stalemate') assert.equal(board.in_stalemate(),true,id+'/'+kind+' stalemate');
      else assert.equal(evidence.terminal,undefined,id+'/'+kind+' unsupported outcome');
      assert.equal(evidence.line[0],lesson.moves[0].san,id+'/'+kind+' must anchor the demonstrated move');
      proofed++;
      if (endgameIds.includes(id)) endgameProofs++;
    }
    assert.equal(Learning.gradeReasoning(q, q.answer),true,id+'/'+kind);
    assert.equal(Learning.gradeReasoning(q, (q.answer+1)%3),false,id+'/'+kind);
    checked++;
  }
}
// Storage cannot invent an achievement or pollute prototypes.
const stored = JSON.stringify({
  cb_windmill:{why:true,defense:false,extra:true},
  cb_decoy:{why:'true',defense:1},
  unknown:{why:true,defense:true},
  bk_stalemate:{why:true,defense:true}
});
const restored = Learning.restoreReasoningProgress(stored, expected);
assert.equal(restored.cb_windmill.why,true);
assert.equal(restored.cb_windmill.defense,undefined);
assert.equal(restored.cb_decoy,undefined);
assert.equal(restored.unknown,undefined);
assert.equal(restored.bk_stalemate.defense,true);
assert.equal(Object.keys(Learning.restoreReasoningProgress('not JSON', expected)).length,0);
assert.equal(Object.keys(Learning.restoreReasoningProgress('[]', expected)).length,0);
const result = Learning.markReasoningProgress(restored,'cb_windmill','defense');
assert.equal(result.cb_windmill.defense,true);
assert.equal(restored.cb_windmill.defense,undefined,'Progress mutated previous state');
assert.equal(Learning.markReasoningProgress(result,'cb_windmill','defense'),result,'Repeated correct answer rewrites storage');
assert.throws(()=>Learning.markReasoningProgress({},'cb_windmill','bad'));
assert.throws(()=>Learning.gradeReasoning(LESSON_REASONING.cb_windmill.why,3));
// Prevent explanatory questions from drifting away from concrete rules.
const get=id=>new Chess(all.get(id).fen);
const pinned=get('cb_pin');
pinned.load(pinned.fen().replace(' w ', ' b '));
assert.equal(pinned.moves({verbose:true}).filter(m=>m.from==='d5').length,0,'pinned knight may not expose its king');
const doubleCheck=get('cb_doublecheck');doubleCheck.move('Ne7+');
assert.ok(doubleCheck.moves({verbose:true}).every(m=>m.piece==='k'),'double-check responses must move the king');
const mate=get('cb_backrank');mate.move('Rd8#');
assert.equal(mate.moves().length,0,'back-rank mate permits no replies');
const kingFlight=get('cb_rookfile');kingFlight.move('Ra8+');
assert.deepEqual([...kingFlight.moves()],['Kh7'],'long-range check escape squares changed');
// Validate historical tablebase evidence underpinning the three expert endings.
const snapshots=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/learning-fixes-tablebase.json'),'utf8'));
const expectedTB={lucena:16,philidor:12,triangulation:16};
const tbCounts={lucena:0,philidor:0,triangulation:0};
for (const item of snapshots) {
  assert.ok(Object.hasOwn(expectedTB,item.lesson),'unknown tablebase snapshot');
  const lesson=all.get('eg_'+item.lesson),board=new Chess(lesson.fen);
  for(let ply=0;ply<item.ply;ply++) assert.ok(board.move(lesson.moves[ply].san),'snapshot illegal ply');
  assert.equal(board.fen(),item.fen,'saved tablebase FEN drift '+item.lesson+'/'+item.ply);
  const expectedCategory=item.lesson==='philidor'?'draw':board.turn()==='w'?'win':'loss';
  assert.equal(item.response.category,expectedCategory,'tablebase result changed');
  tbCounts[item.lesson]++;
}
for(const [key,count] of Object.entries(expectedTB)) assert.equal(tbCounts[key],count,'saved tablebase snapshot coverage '+key);
// Guard the alternative outcomes described by two particularly easy-to-misread questions.
const egStalemate=new Chess(all.get('eg_stalemate').fen);
assert.equal(egStalemate.move('Qg6').san,'Qg6');
assert.equal(egStalemate.in_stalemate(),true,'Qg6 must draw by stalemate');
const egTriangulation=new Chess(all.get('eg_triangulation').fen);
for(const san of ['Ke5','Kc6','Kd4','Kd7','Kd5']) assert.ok(egTriangulation.move(san));
assert.equal(egTriangulation.turn(),'b','triangulation must hand move to Black');
const originalPlacement=all.get('eg_triangulation').fen.split(' ')[0];
assert.equal(egTriangulation.fen().split(' ')[0],originalPlacement,'triangulation should return to same placement');
const wrongBishop=new Chess(all.get('eg_wrongbishop').fen);
for(const san of ['Kg6','Kg8','h7+','Kh8','Kh6']) assert.ok(wrongBishop.move(san));
assert.equal(wrongBishop.in_stalemate(),true,'wrong-colored rook pawn ending must draw in displayed line');
assert.equal(endgameProofs,36,'two replayed evidence lines per endgame');
console.log(JSON.stringify({lessons:expected.length,tactical:tacticIds.length,endgames:endgameIds.length,questions:checked,verifiedExampleLines:proofed,endgameProofs,tablebaseSnapshots:snapshots.length,bilingual:'PASS',grading:'PASS',storage:'PASS'}));

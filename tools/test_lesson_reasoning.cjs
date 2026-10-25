'use strict';
// Independent data and progress checks for the reasoning quizzes.
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const ctx = vm.createContext({console});
for (const name of ['learning', 'lessons', 'intro_lessons', 'extra_lessons', 'lesson_comparisons', 'lesson_reasoning'])
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', name+'.js'), 'utf8'), ctx);
const {Learning, LESSONS, INTRO_LESSONS, EXTRA_LESSONS, LESSON_COMPARISONS, LESSON_REASONING} =
  vm.runInContext('({Learning,LESSONS,INTRO_LESSONS,EXTRA_LESSONS,LESSON_COMPARISONS,LESSON_REASONING})',ctx);
const all = new Map([...LESSONS, ...INTRO_LESSONS, ...EXTRA_LESSONS].map(lesson => [lesson.id, lesson]));
const expected = ['bk_stalemate','bk_castling','cb_windmill','cb_smother','cb_decoy','cb_interference'];
assert.deepEqual(Object.keys(LESSON_REASONING).sort(), expected.sort());
let checked = 0;
for (const id of expected) {
  assert.ok(all.has(id), 'Unknown lesson '+id);
  assert.ok(LESSON_COMPARISONS[id], 'Missing audited comparison for '+id);
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
console.log(JSON.stringify({lessons:expected.length,questions:checked,bilingual:'PASS',grading:'PASS',storage:'PASS'}));

'use strict';
// All 160 learning questions must resolve to the legal position immediately
// BEFORE the specific move, including alternative variations. No UI state here.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ctx=vm.createContext({console});
for(const name of [
 'chess','lessons','intro_lessons','extra_lessons','lesson_reasoning',
 'lesson_reasoning_endgames','lesson_reasoning_openings',
 'lesson_reasoning_foundations','reasoning_positions'
]){
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',name+'.js'),'utf8'),ctx,
   {filename:name+'.js'});
}
const {Chess,LESSONS,INTRO_LESSONS,EXTRA_LESSONS,LESSON_REASONING,ReasoningPositions}=
 vm.runInContext('({Chess,LESSONS,INTRO_LESSONS,EXTRA_LESSONS,LESSON_REASONING,ReasoningPositions})',ctx);
const lessons=[...LESSONS,...INTRO_LESSONS,...EXTRA_LESSONS],ids=new Set(lessons.map(x=>x.id));
assert.equal(lessons.length,80);
assert.equal(Object.keys(ReasoningPositions.focus).length,80);
assert.equal(Object.keys(LESSON_REASONING).length,80);
assert.ok(Object.keys(ReasoningPositions.focus).every(id=>ids.has(id)),'unknown focus mapping');
let count=0,alternates=0,main=0,examples=[];
for(const lesson of lessons){
 for(const kind of ['why','defense']){
   const q=LESSON_REASONING[lesson.id][kind];
   const prev=q.evidence?.line || lesson.moves.map(m=>m.san);
   const overridden=ReasoningPositions.alternate[lesson.id]?.[kind];
   const line=overridden || prev, at=ReasoningPositions.focus[lesson.id][kind==='why'?0:1];
   const p=ReasoningPositions.resolve(Chess,lesson,kind,q);
   assert.ok(p,lesson.id+'/'+kind+' does not resolve');
   assert.equal(p.focusPly,at);
   assert.ok(at>=0&&at<line.length);
   assert.equal(p.san,line[at]);
   assert.notEqual(p.beforeFen,p.afterFen,lesson.id+'/'+kind+' board did not change');
   // Verify the position is reached through actual legal chess moves.
   const game=new Chess(lesson.fen||undefined),original=game.fen();
   for(let i=0;i<line.length;i++){
     if(i===at)assert.equal(game.fen(),p.beforeFen);
     const move=game.move(line[i]);
     assert.ok(move,lesson.id+'/'+kind+'/'+i+' not legal');
     assert.equal(move.san,line[i],lesson.id+'/'+kind+' noncanonical SAN');
     if(i===at) {
       assert.equal(game.fen(),p.afterFen);
       assert.equal(move.from,p.from);
       assert.equal(move.to,p.to);
     }
   }
   assert.equal(new Chess(lesson.fen||undefined).fen(),original,'lesson FEN mutated');
   // A focused preview must stop at the exact move; never disclose later moves.
   const replay=new Chess(p.beforeFen);
   assert.equal(replay.move(p.san)?.san,p.san);
   assert.equal(replay.fen(),p.afterFen);
   count++; if(overridden)alternates++; else main++;
   if(['bk_stalemate','bk_castling','cb_smother','cb_windmill',
        'eg_triangulation','eg_lucena','op_kingsindian'].includes(lesson.id))
       examples.push([lesson.id,kind,p.san,p.focusPly]);
 }
}
assert.equal(count,160);
assert.equal(alternates,14); // six original lessons × two, two endgame alternatives
assert.equal(main,146);
assert.equal(ReasoningPositions.resolve(Chess,{},'why',{}) , null);
assert.equal(ReasoningPositions.resolve(Chess,lessons[0],'unknown',{}) , null);
console.log(JSON.stringify({lessons:80,questions:count,alternativeLines:alternates,
 mainLines:main,preAndPostFEN:'PASS',SAN:'PASS',examples}));

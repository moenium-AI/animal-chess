'use strict';
// Guard against answer-length shortcuts. This checks text, not chess quality.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ctx=vm.createContext({});
for(const name of ['lesson_reasoning','lesson_reasoning_endgames','lesson_reasoning_openings','lesson_reasoning_foundations','lessons','intro_lessons','extra_lessons']){
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',name+'.js'),'utf8'),ctx,{filename:name});
}
const {LESSON_REASONING,LESSONS,INTRO_LESSONS,EXTRA_LESSONS}=vm.runInContext(
 '({LESSON_REASONING,LESSONS,INTRO_LESSONS,EXTRA_LESSONS})',ctx);
const chapters=new Map([...LESSONS,...INTRO_LESSONS,...EXTRA_LESSONS].map(x=>[x.id,x.cat]));
const questions=Object.entries(LESSON_REASONING).flatMap(([id,block])=>
 ['why','defense'].map(kind=>({id,cat:chapters.get(id),kind,answer:block[kind].answer,
 ja:block[kind].ja,en:block[kind].en})));
assert.equal(Object.keys(LESSON_REASONING).length,80);
assert.equal(questions.length,160);
function heuristicHits(rows,lang,rank){
 let hits=0;
 for(const q of rows){
   assert.ok(Number.isInteger(q.answer) && q.answer>=0 && q.answer<3,q.id);
   const opts=q[lang].options;
   assert.equal(opts.length,3,q.id+'/'+lang);
   assert.equal(new Set(opts).size,3,q.id+'/'+lang+' identical alternatives');
   assert.ok(opts.every(s=>typeof s==='string'&&s.trim().length>=2),q.id+'/'+lang+' empty choice');
   const lengths=opts.map(s=>s.length);
   const chosenLength=lengths.slice().sort((a,b)=>a-b)[rank];
   // A strategy without chess knowledge: first option at selected length.
   if(lengths.indexOf(chosenLength)===q.answer)hits++;
 }
 return hits;
}
const MAX_PERCENT=45;
for(const lang of ['ja','en']){
 for(const [label,rows] of [['all',questions],...['basics','principles','combo','endgame','opening'].map(cat=>
   [cat,questions.filter(q=>q.cat===cat)])]){
   for(const [rank,name] of [[0,'shortest'],[1,'middle'],[2,'longest']]){
     const hits=heuristicHits(rows,lang,rank),ratio=100*hits/rows.length;
     assert.ok(ratio<=MAX_PERCENT,
       lang+'/'+label+'/'+name+' length shortcut scored '+ratio.toFixed(1)+'%');
   }
 }
}
// The Dutch lesson is a special trap: BOTH e4 and g4 are attacked by the
// black f5 pawn and f6 knight. Do not add g4 as an incorrect square.
for(const lang of ['ja','en']){
 const item=LESSON_REASONING.op_dutch.defense;
 assert.ok(!item[lang].options.some((s,i)=>i!==item.answer&&s.trim()==='g4'),
   'g4 cannot be a distractor for the Dutch common-attack question');
}
console.log(JSON.stringify({lessons:80,questions:questions.length,
 lengthHeuristics:['shortest','middle','longest'],languages:['ja','en'],
 chapterMetrics:true,thresholdPercent:MAX_PERCENT,status:'PASS'}));

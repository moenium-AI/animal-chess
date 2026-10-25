'use strict';
// Reproducible, NON-BLOCKING quality diagnostics for the published reasoning catalog.
// Behavioral regressions are tested separately in test_lesson_reasoning.cjs.
// Run: node tools/audit_reasoning_quality.cjs
const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm');
const root=path.resolve(__dirname,'..'), context=vm.createContext({});
for(const name of [
  'lesson_reasoning','lesson_reasoning_endgames','lesson_reasoning_openings','lesson_reasoning_foundations'
]){
  vm.runInContext(fs.readFileSync(path.join(root,'js',name+'.js'),'utf8'),context,{filename:name+'.js'});
}
for(const name of ['lessons','intro_lessons','extra_lessons']){
  vm.runInContext(fs.readFileSync(path.join(root,'js',name+'.js'),'utf8'),context,{filename:name+'.js'});
}
const {LESSON_REASONING,LESSONS,INTRO_LESSONS,EXTRA_LESSONS}=vm.runInContext(
  '({LESSON_REASONING,LESSONS,INTRO_LESSONS,EXTRA_LESSONS})',context);
const catalog=[...LESSONS,...INTRO_LESSONS,...EXTRA_LESSONS],category=new Map(catalog.map(l=>[l.id,l.cat]));
function analyzeLanguage(rows,lang){
  const unique=rows.filter(r=>{
    const opts=r[lang].options, max=Math.max(...opts.map(s=>s.length));
    return opts.filter(s=>s.length===max).length===1;
  });
  const correctUnique=unique.filter(r=>r[lang].options[r.answer].length===
    Math.max(...r[lang].options.map(s=>s.length))).length;
  // Deterministic heuristic: select the first option with maximal character length.
  const firstLongestCorrect=rows.filter(r=>r[lang].options.findIndex(s=>
    s.length===Math.max(...r[lang].options.map(t=>t.length)))===r.answer).length;
  return {uniqueLongestQuestions:unique.length,
    correctIsUniqueLongest:correctUnique,
    correctWhenUsingLongestHeuristic:firstLongestCorrect,
    longestHeuristicPercent:Number((100*firstLongestCorrect/rows.length).toFixed(1))};
}
const rows=Object.entries(LESSON_REASONING).flatMap(([id,block])=>
  ['why','defense'].map(kind=>({id,cat:category.get(id),kind,...block[kind]})));
const evidence=rows.filter(r=>Array.isArray(r.evidence?.line));
const answerCounts=[0,1,2].map(i=>rows.filter(r=>r.answer===i).length);
const groupResults={};
for(const cat of ['basics','principles','combo','endgame','opening']){
  const subset=rows.filter(r=>r.cat===cat);
  groupResults[cat]={questions:subset.length,
    jaLongestHeuristicCorrect:analyzeLanguage(subset,'ja').correctWhenUsingLongestHeuristic,
    enLongestHeuristicCorrect:analyzeLanguage(subset,'en').correctWhenUsingLongestHeuristic,
    examplesRequiringReplayOfAtLeastTwoMoves:subset.filter(r=>(r.evidence?.line.length||0)>1).length};
}
const report={
  source:'main working tree at audit execution',
  lessonCount:catalog.length,
  coveredLessons:Object.keys(LESSON_REASONING).length,
  questions:rows.length,
  answersByIndex:answerCounts,
  languages:{ja:analyzeLanguage(rows,'ja'),en:analyzeLanguage(rows,'en')},
  evidence:{withReplayLine:evidence.length,withoutReplayLine:rows.length-evidence.length,
    lineLength1:evidence.filter(r=>r.evidence.line.length===1).length,
    lineLengthAtLeast2:evidence.filter(r=>r.evidence.line.length>=2).length,
    lineLengthAtLeast4:evidence.filter(r=>r.evidence.line.length>=4).length,
    lineLengthAtLeast8:evidence.filter(r=>r.evidence.line.length>=8).length},
  categories:groupResults,
  status:'OBSERVATION ONLY: no subjective quality threshold is enforced'
};
console.log(JSON.stringify(report,null,2));

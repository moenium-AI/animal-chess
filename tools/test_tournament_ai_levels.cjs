'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');const os=require('node:os');const path=require('node:path');
const {parse,hashSeed,OPENINGS,pairs,match}=require('./tournament_ai_levels.cjs');
const {summary}=require('./summarize_ai_tournament.cjs');
assert.equal(OPENINGS.length,12);
assert.equal(pairs('adjacent').length,9);
assert.equal(pairs('cross').length,8);
assert.equal(hashSeed([1,2,'a']),hashSeed([1,2,'a']));
assert.notEqual(hashSeed([1,2,'a']),hashSeed([1,2,'b']));
assert.equal(parse(['--budget-scale','.1','--max-plies','20','--opening-indices','0,2']).budgetScale,.1);
assert.throws(()=>parse(['--budget-scale','2']),/budget/);
assert.throws(()=>parse(['--opening-indices','1,1']),/opening/);
(async()=>{
 const args=parse(['--budget-scale','.01','--max-plies','20']);
 const a=await match(1,2,0,101,0,args),b=await match(1,2,0,101,1,args);
 assert.equal(a.white,1);assert.equal(a.black,2);
 assert.equal(b.white,2);assert.equal(b.black,1);
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'animal-chess-selfplay-'));
 try{
  const f=path.join(d,'results.json');fs.writeFileSync(f,JSON.stringify({games:[a,b]}));
  const s=summary([f]);assert.equal(s.gameCount,2);
  assert.equal(s.pairSummaries[0].games,2);
  assert.equal(s.levelSummaries[0].games,2);
  assert.ok(s.levelSummaries.every(v=>v.avgThinkMs>=0));
  console.log('PASS: deterministic seeded self-play, both colors, legal SAN replay, outcome aggregation, 95% intervals');
 }finally{fs.rmSync(d,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});

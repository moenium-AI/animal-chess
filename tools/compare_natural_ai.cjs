'use strict';
// Read-only side-by-side AI smoke comparison against the PR merge's base parent.
// This is a *behavioural diagnostic*, not an Elo measurement.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const {performance}=require('node:perf_hooks');
const root=path.resolve(__dirname,'..');
const chessSrc=fs.readFileSync(path.join(root,'js/chess.js'),'utf8');
const currentSrc=fs.readFileSync(path.join(root,'js/engine.js'),'utf8');
const base=process.env.AI_BASELINE_REF||'HEAD^1:js/engine.js';
const originalSrc=execFileSync('git',['show',base],{cwd:root,encoding:'utf8'});
function load(source,seed){
 let x=seed>>>0;
 const math=Object.create(Math);
 math.random=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296};
 const context=vm.createContext({console,Date,Math:math,setTimeout,clearTimeout});
 vm.runInContext(chessSrc,context);
 vm.runInContext(source,context);
 return vm.runInContext('({Chess,Engine})',context);
}
const cases=[
 {name:'Opening, initial',fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',levels:[1,4]},
 {name:'Queen under rook attack',fen:'4k3/8/8/3r4/8/8/4Q3/6K1 w - - 0 1',levels:[1,4,7]},
 {name:'Italian middlegame',fen:'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',levels:[4,7]},
 {name:'Forced rook mate-in-two',fen:'7k/8/5K2/8/8/8/8/R7 w - - 0 1',levels:[1,4,7]},
 {name:'Queen trade',fen:'3k4/4q3/8/8/8/8/4Q3/6K1 w - - 0 1',levels:[1,4]}
];
const VAL={p:100,n:320,b:330,r:500,q:900};
function balance(g,side) {
 let s=0;for(const row of g.board())for(const p of row)if(p&&p.type!=='k')s+=(p.color===side?1:-1)*VAL[p.type];
 return s;
}
// Independent diagnostic: check an immediate capture and optional legal recapture.
function worstUnforcedLoss(g,move) {
 const side=g.turn(),initial=balance(g,side);
 g.move(move);
 let maxLoss=0;
 for(const r of g.fast_moves().filter(r=>r.captured&&VAL[r.captured]>=300)) {
  g.move(r);let best=balance(g,side);
  for(const c of g.fast_moves().filter(c=>c.captured&&c.to===r.to)){
   g.move(c);best=Math.max(best,balance(g,side));g.undo();
  }
  maxLoss=Math.max(maxLoss,initial-best);g.undo();
 }
 g.undo();
 return maxLoss;
}
async function choose(engine,fen,level) {
 const started=performance.now();
 const move=await new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(new Error('AI response timed out')),15000);
  engine.chooseMove(fen,level,m=>{clearTimeout(timer);resolve(m)});
 });
 return {move,ms:Math.round(performance.now()-started)};
}
(async()=>{
 const rows=[];
 for (let k=0;k<cases.length;k++) {
  const c=cases[k];
  for(const level of c.levels) {
   const seed=0xCA8E2026 ^ (k*259+level*157);
   const results=[];
   for(const [version,source] of [['before',originalSrc],['after',currentSrc]]) {
    const {Chess,Engine}=load(source,seed);
    const g=new Chess(c.fen);
    const output=await choose(Engine,c.fen,level);
    assert.ok(output.move,version+' missing move for '+c.name+' Lv'+level);
    const loss=worstUnforcedLoss(g,output.move);
    const played=g.move(output.move);
    assert.ok(played,version+' illegal move');
    results.push({version,san:played.san,move:played.from+played.to+(played.promotion||''),ms:output.ms,materialRiskCp:loss,mate:g.in_checkmate()});
   }
   rows.push({position:c.name,level,before:results[0],after:results[1]});
  }
 }
 for(const row of rows)console.log(JSON.stringify(row));
 const summary={
  positions:rows.length,
  beforeQueenOrMinorDrops:rows.filter(r=>r.before.materialRiskCp>=250).length,
  afterQueenOrMinorDrops:rows.filter(r=>r.after.materialRiskCp>=250).length,
  beforeTotalMs:rows.reduce((s,r)=>s+r.before.ms,0),
  afterTotalMs:rows.reduce((s,r)=>s+r.after.ms,0)
 };
 console.log('NATURAL_AI_COMPARISON '+JSON.stringify(summary));
 assert.equal(rows.length,12);
 // Regressions must be diagnosed rather than swept under a single aggregate.
})().catch(e=>{console.error(e);process.exitCode=1});

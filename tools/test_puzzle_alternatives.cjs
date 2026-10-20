'use strict';
// Exercise the production puzzle grader for EVERY registered correct move,
// then verify that legal but wrong moves are rejected without changing state.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const js=(name)=>fs.readFileSync(path.join(root,'js',name+'.js'),'utf8');
const app=js('app');
function extract(name){const m=app.match(new RegExp('^function '+name+'\\([^]*?^}', 'm'));assert.ok(m,'missing '+name);return m[0]}
const ctx=vm.createContext({console});
for(const file of ['chess','learning','puzzles'])vm.runInContext(js(file),ctx);
vm.runInContext(`
let mode='puzzle',cpuThinking=false,selected=null,legalTargets=[],puzzle,game;
let solvedPuzzles=new Set(),toastMessage='',saved=0;
const boardEl={classList:{add(){},remove(){}}}, tr=x=>x;
const toast=x=>toastMessage=x,sBad=()=>{},sWin=()=>{},confetti=()=>{};
const renderPosition=()=>{},renderStatus=()=>{},renderPuzzleList=()=>{},
 updatePuzzleCompletion=()=>{},saveSolved=()=>saved++;
const setTimeout=(fn,ms)=>{};
const applyMove=(m)=>{const result=game.move(m);if(!result)throw Error('Invalid legal move');return result};
${['playerCanMoveNow','puzzleCandidates','puzzleTryMove','puzzleSolved'].map(extract).join('\n')}
function runTactic(id,san,expected){
 const idx=PUZZLES.findIndex(p=>p.id===id);
 if(idx<0)throw Error('Missing '+id);
 const p=PUZZLES[idx];game=new Chess(p.fen);
 puzzle={idx,movesLeft:1,busy:false,complete:false};solvedPuzzles=new Set();saved=0;toastMessage='';
 const before=game.fen();
 const move=game.moves({verbose:true}).find(m=>m.san===san);
 if(!move)throw Error('Not legal: '+id+' '+san);
 puzzleTryMove({from:move.from,to:move.to,promotion:move.promotion});
 if(expected){
   if(!puzzle.complete||game.fen()===before||!solvedPuzzles.has(id)||saved!==1)throw Error('Rejected valid alternative: '+id+' '+san);
 }else{
   if(puzzle.complete||game.fen()!==before||solvedPuzzles.size||saved)throw Error('Accepted invalid move: '+id+' '+san);
 }
}
`,ctx);
let accepted=0;
const data=JSON.parse(vm.runInContext('JSON.stringify(PUZZLES)',ctx));
for(const p of data.filter(p=>p.objective==='tactic')){
  for(const san of p.solutions){ctx.id=p.id;ctx.san=san;vm.runInContext('runTactic(id,san,true)',ctx);accepted++}
}
const invalid=[
 ['tactic-double-check','Bd5+'], // discovered rook check only
 ['tactic-doublecheck-knight','Nb5+'], // discovered rook check only
 ['tactic-fork-queen-minors','Qa5'], // does not attack both knights
 ['tactic-pin-queen-knight','Qb3'], // off the pinning file
 ['tactic-rook-underpromotion','c8=Q'], // stalemate
 ['tactic-rook-underpromotion','c8=B'], // insufficient material
 ['tactic-rook-underpromotion','c8=N+'], // insufficient material
];
for(const [id,san] of invalid){ctx.id=id;ctx.san=san;vm.runInContext('runTactic(id,san,false)',ctx)}
console.log(`PASS: production UI grading accepts all ${accepted} tactical answers and rejects ${invalid.length} legal distractors`);

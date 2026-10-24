#!/usr/bin/env node
'use strict';
// Summarizes a paired-color self-play tournament. Elo-style gaps are descriptive,
// not independent ratings, particularly when time budgets are accelerated.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {OPENINGS}=require('./tournament_ai_levels.cjs');
const root=path.resolve(__dirname,'..');
const ctx=vm.createContext({console});
vm.runInContext(fs.readFileSync(path.join(root,'js/chess.js'),'utf8'),ctx);
const Chess=vm.runInContext('Chess',ctx);
function summary(files){
 const games=files.flatMap(p=>JSON.parse(fs.readFileSync(p,'utf8')).games);
 if(!games.length)throw Error('No tournament games');
 const pairs=new Map();let cap=0,complete=0;
 const totals=[...Array(10)].map((_,i)=>({level:i+1,games:0,score:0,win:0,loss:0,draw:0,thinkingMoves:0,thinkMs:0}));
 const perOpening=new Map();
 for(const g of games){
  if(!Number.isInteger(g.a)||!Number.isInteger(g.b)||g.a===g.b||g.white===g.black)throw Error('invalid levels');
  if(g.white!==g.a&&g.white!==g.b||g.black!==g.a&&g.black!==g.b)throw Error('mismatched colors');
  if(!g.reason||!['1-0','0-1','1/2-1/2'].includes(g.result))throw Error('unrecognized result');
  const line=OPENINGS.find(p=>p[0]===g.opening);if(!line)throw Error('unknown opening '+g.opening);
  const board=new Chess();for(const san of line[1].split(/\s+/).filter(Boolean)){if(!board.move(san))throw Error('Invalid opening '+g.opening)}
  for(const san of g.sans){if(!board.move(san))throw Error('Illegal move in recorded game '+g.opening+' '+san);}
  if(board.fen()!==g.finalFen)throw Error('Final FEN mismatch '+g.opening);
  if(g.completed!==board.game_over())throw Error('Completion status mismatch '+g.opening);
  if(g.completed&&g.result!==(board.in_checkmate()?(board.turn()==='w'?'0-1':'1-0'):'1/2-1/2'))throw Error('Result mismatch '+g.opening);
  if(g.scoreA!==(g.result==='1/2-1/2'?.5:g.result==='1-0'?(g.white===g.a?1:0):(g.black===g.a?1:0)))throw Error('scoreA mismatch');
  if(g.completed)complete++;else cap++;
  const pairKey=[g.a,g.b].join('-');if(!pairs.has(pairKey))pairs.set(pairKey,{a:g.a,b:g.b,games:0,winB:0,draw:0,winA:0,scoreB:0,completed:0,capDraws:0,colors:{}});
  const t=pairs.get(pairKey);t.games++;t.scoreB+=1-g.scoreA;t.winB+=g.scoreA===0?1:0;t.winA+=g.scoreA===1?1:0;t.draw+=g.scoreA===.5?1:0;t.completed+=g.completed?1:0;t.capDraws+=g.completed?0:1;t.colors[g.white]=(t.colors[g.white]||0)+1;
  for(const level of [g.a,g.b]){
    const t=totals[level-1];const score=level===g.a?g.scoreA:1-g.scoreA;t.games++;t.score+=score;t.win+=score===1?1:0;t.loss+=score===0?1:0;t.draw+=score===.5?1:0;
    const times=g.thinkMs[String(level)]||[];t.thinkingMoves+=times.length;t.thinkMs+=times.reduce((a,b)=>a+b,0);
  }
 }
 // Wilson interval with 95% normal bound on normalized score; treats draws as half results.
 const z=1.96;
 const pairSummaries=[...pairs.values()].map(t=>{
  const n=t.games,p=t.scoreB/n,denom=1+z*z/n;
  const c=(p+z*z/(2*n))/denom;
  const h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/denom;
  const lower=Math.max(0,c-h), upper=Math.min(1,c+h);
  const elo=q=>400*Math.log10(q/(1-q));
  // Resample each mirrored color pair as a single opening cluster. This better
  // captures correlated outcomes than treating the two color games as independent.
  const clustered=new Map();
  for(const g of games.filter(g=>g.a===t.a&&g.b===t.b)){
    const key=g.opening+'|'+g.seed;
    if(!clustered.has(key))clustered.set(key,[]);
    clustered.get(key).push(1-g.scoreA);
  }
  const groups=[...clustered.values()];
  if(groups.some(x=>x.length!==2))throw Error('Unmatched white/black pair '+t.a+'-'+t.b);
  let seed=(0x11223344^Math.imul(t.a,65537)^t.b)>>>0;
  const boot=[];
  for(let iter=0;iter<6000;iter++){
    let points=0;
    for(let j=0;j<groups.length;j++){
      seed=(Math.imul(seed,1664525)+1013904223)>>>0;
      points+=groups[seed%groups.length].reduce((x,y)=>x+y,0);
    }
    boot.push(elo((points+0.5)/(n+1)));
  }
  boot.sort((x,y)=>x-y);
  const bootstrap95=[Math.round(boot[Math.floor(boot.length*.025)]),Math.round(boot[Math.floor(boot.length*.975)])];
  return {...t,scoreB:Math.round(t.scoreB*10)/10,scorePctB:Math.round(p*1000)/10,eloGapBminusA:Math.round(elo((t.scoreB+0.5)/(n+1))),eloWilsonApprox95:[Math.round(elo(Math.max(.001,lower))),Math.round(elo(Math.min(.999,upper)))],eloPairedBootstrap95:bootstrap95};
 }).sort((a,b)=>a.a-b.a||a.b-b.b);
 const levelSummaries=totals.map(t=>({...t,score:Math.round(t.score*10)/10,scorePct:Math.round(1000*t.score/t.games)/10,avgThinkMs:Math.round(t.thinkMs/(t.thinkingMoves||1))}));
 return {method:'Actual game rules and legal moves replayed. Paired openings and colors; Elo gap uses score ratio with 0.5 pseudocount; paired-opening 95% bootstrap interval plus a separate approximate Wilson interval; 96-ply cap is scored as a draw. Accelerated budget is NOT live-game Elo.',gameCount:games.length,complete,capDraws:cap,checkmates:games.filter(g=>g.reason==='checkmate').length,otherDraws:complete-games.filter(g=>g.reason==='checkmate').length,pairSummaries,levelSummaries};
}
if(require.main===module){const argv=process.argv.slice(2);if(!argv.length){console.error('Usage: summarize_ai_tournament.cjs file1.json ... [--output report.json]');process.exit(2)}const pos=argv.indexOf('--output');let out=null;if(pos>=0){out=argv[pos+1];argv.splice(pos,2)}const data=summary(argv);if(out)fs.writeFileSync(out,JSON.stringify(data,null,2)+'\n');console.log(JSON.stringify(data,null,2));}
module.exports={summary};

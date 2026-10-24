#!/usr/bin/env node
'use strict';
/**
 * Reproducible mirrored-pair self-play for the actual game's Engine.chooseMove.
 * Optional budget scaling accelerates a diagnostic tournament, NOT live Elo.
 * No binary dependency; independent of browser Worker and the 50ms UI delay.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {performance} = require('node:perf_hooks');
const ROOT = path.resolve(__dirname, '..');
const code = ['js/chess.js', 'js/lessons.js', 'js/engine.js'].map(f => ({file:f, code:fs.readFileSync(path.join(ROOT, f), 'utf8')}));
const OPENINGS = [
  ['open', ''],
  ['italian', 'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6'],
  ['sicilian', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3'],
  ['queen-gambit', 'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7'],
  ['french', 'e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7'],
  ['ruy-lopez', 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O'],
  ['caro-kann', 'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5'],
  ['scandinavian', 'e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6'],
  ['english', 'c4 e5 Nc3 Nf6 Nf3 Nc6'],
  ['four-knights', 'e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4'],
  ['evans', 'e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5'],
  ['kings-indian', 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O'],
];
function parse(argv) {
  const args = {gamesPerOpening:1, budgetScale:.2, maxPlies:120, pairMode:'adjacent', seed:20261024, out:null, onlyPair:null, openingOffset:0, openingIndices:null};
  for(let i=0;i<argv.length;i++) {
    const a=argv[i];
    if(a==='--games-per-opening')args.gamesPerOpening=Number(argv[++i]);
    else if(a==='--budget-scale')args.budgetScale=Number(argv[++i]);
    else if(a==='--max-plies')args.maxPlies=Number(argv[++i]);
    else if(a==='--pair-mode')args.pairMode=argv[++i];
    else if(a==='--seed')args.seed=Number(argv[++i]);
    else if(a==='--output')args.out=argv[++i];
    else if(a==='--only-pair')args.onlyPair=argv[++i];
    else if(a==='--opening-offset')args.openingOffset=Number(argv[++i]);
    else if(a==='--opening-indices')args.openingIndices=argv[++i].split(',').map(Number);
    else throw Error('Unknown argument '+a);
  }
  if(!Number.isInteger(args.gamesPerOpening)||args.gamesPerOpening<1||args.gamesPerOpening>20)throw Error('invalid --games-per-opening');
  if(!Number.isFinite(args.budgetScale)||args.budgetScale<=0||args.budgetScale>1)throw Error('invalid --budget-scale');
  if(!Number.isInteger(args.maxPlies)||args.maxPlies<20||args.maxPlies>600)throw Error('invalid --max-plies');
  if(!Number.isInteger(args.seed))throw Error('invalid --seed');
  if(!Number.isInteger(args.openingOffset)||args.openingOffset<0||args.openingOffset>=OPENINGS.length)throw Error('invalid --opening-offset');
  if(args.openingIndices && (!args.openingIndices.length || args.openingIndices.some(i=>!Number.isInteger(i)||i<0||i>=OPENINGS.length)||new Set(args.openingIndices).size!==args.openingIndices.length))throw Error('invalid opening indices');
  if(!['adjacent','all','cross','anchor'].includes(args.pairMode))throw Error('invalid --pair-mode');
  return args;
}
function hashSeed(parts) {
  let h=2166136261; for(const ch of parts.join('|')){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0;
}
function createPlayer(seed,scale) {
  let state=seed>>>0;
  const rand=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  const math=Object.create(Math);math.random=rand;
  const ctx=vm.createContext({Math:math,Date,console,setTimeout:fn=>setImmediate(fn),clearTimeout:clearImmediate});
  for(const f of code)vm.runInContext(f.code,ctx,{filename:f.file});
  const {Chess,Engine}=vm.runInContext('({Chess,Engine})',ctx);
  for(const settings of Object.values(Engine.LEVELS))settings.timeMs=Math.max(10,Math.round(settings.timeMs*scale));
  return {Chess,Engine};
}
function choose(player,fen,level) {return new Promise((resolve,reject)=>{
  let settled=false;
  const watchdog=setTimeout(()=>{if(!settled){settled=true;reject(Error('chooseMove watchdog level '+level));}},25000);
  try{player.Engine.chooseMove(fen,level,move=>{if(settled)return;settled=true;clearTimeout(watchdog);resolve(move);});}
  catch(e){if(!settled){settled=true;clearTimeout(watchdog);reject(e);}}
});}
function openingGame(Chess,index){const [name,line]=OPENINGS[index];const g=new Chess();for(const san of line.split(/\s+/).filter(Boolean)){if(!g.move(san))throw Error('Invalid opening '+name+': '+san)}return g;}
function resultFor(game) {
  if(!game.game_over())return {result:'1/2-1/2',reason:'ply-cap-draw',completed:false};
  if(game.in_checkmate())return {result:game.turn()==='w'?'0-1':'1-0',reason:'checkmate',completed:true};
  const reason=game.in_stalemate()?'stalemate':game.in_threefold_repetition()?'repetition':game.insufficient_material()?'insufficient-material':game.in_draw()?'other-draw':'game-over';
  return {result:'1/2-1/2',reason,completed:true};
}
async function match(a,b,openingIndex,seed,side,args){
  const white=side===0?a:b,black=side===0?b:a;
  const playerWhite=createPlayer(hashSeed([seed,a,b,openingIndex,'white',side]),args.budgetScale);
  const playerBlack=createPlayer(hashSeed([seed,a,b,openingIndex,'black',side]),args.budgetScale);
  const g=openingGame(playerWhite.Chess,openingIndex);const given=g.history().length;
  const sans=[];const thinkMs={[String(a)]:[],[String(b)]:[]};
  for(let ply=given;ply<args.maxPlies && !g.game_over();ply++){
    const color=g.turn(),lv=color==='w'?white:black,player=color==='w'?playerWhite:playerBlack;
    const before=performance.now();const m=await choose(player,g.fen(),lv);const millis=performance.now()-before;
    thinkMs[String(lv)].push(Math.round(millis));
    const played=m&&g.move({from:m.from,to:m.to,promotion:m.promotion});
    if(!played)throw Error(`Illegal engine move level ${lv}, ply ${ply}, fen ${g.fen()}, move ${JSON.stringify(m)}`);
    sans.push(played.san);
  }
  const result=resultFor(g);
  const scoreA=result.result==='1/2-1/2'?.5:(result.result==='1-0'?(white===a?1:0):(black===a?1:0));
  return {a,b,white,black,opening:OPENINGS[openingIndex][0],seed,startingPly:given,playedPlies:sans.length,result:result.result,reason:result.reason,completed:result.completed,scoreA,sans,finalFen:g.fen(),thinkMs};
}
function pairs(mode){
  const r=[];
  if(mode==='adjacent'||mode==='all'){for(let a=1;a<=9;a++)r.push([a,a+1]);}
  if(mode==='cross'||mode==='all')r.push([1,4],[2,5],[3,6],[4,7],[5,8],[6,9],[7,10],[1,10]);
  if(mode==='anchor')for(let l=1;l<=9;l++)r.push([l,10]);
  return r;
}
async function tournament(args,log=true){
  let targets=pairs(args.pairMode);
  if(args.onlyPair){const [a,b]=args.onlyPair.split('-').map(Number);targets=targets.filter(x=>x[0]===a&&x[1]===b);if(!targets.length)throw Error('Unknown target pair '+args.onlyPair);}
  const games=[];const started=performance.now();
  const openingNumbers=args.openingIndices || OPENINGS.map((_,i)=>i);
  for(const [a,b] of targets){
    for(let rep=0;rep<args.gamesPerOpening;rep++)for(const index of openingNumbers){
      const o=(index+args.openingOffset)%OPENINGS.length;
      const seed=args.seed+rep;
      for(let side=0;side<2;side++){
        const g=await match(a,b,o,seed,side,args);games.push(g);
        if(log)process.stdout.write(`${games.length}/${targets.length*args.gamesPerOpening*openingNumbers.length*2} ${a}-${b} ${g.opening} ${g.white}-${g.black} ${g.result} ${g.reason}\n`);
      }
    }
  }
  const elapsedSec=Math.round((performance.now()-started)/1000);
  const report={format:1,method:'actual Engine.chooseMove / chess.js; deterministic seeded, paired colors; shortened engine time budget; ply-cap scored draw by tournament rule; no Elo claim for actual game time control',config:args,openings:OPENINGS.map(x=>x[0]),elapsedSec,games};
  if(args.out)fs.writeFileSync(args.out,JSON.stringify(report,null,2)+'\n');
  if(log)process.stdout.write('SUMMARY '+JSON.stringify({games:games.length,seconds:elapsedSec,finished:games.filter(g=>g.completed).length,capDraws:games.filter(g=>!g.completed).length})+'\n');
  return report;
}
if(require.main===module)tournament(parse(process.argv.slice(2))).catch(e=>{console.error(e.stack||e);process.exitCode=1});
module.exports={parse,hashSeed,OPENINGS,pairs,createPlayer,openingGame,match,resultFor,tournament};

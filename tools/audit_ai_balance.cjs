#!/usr/bin/env node
'use strict';
// Reproducible ten-level move-quality benchmark against a separately installed UCI engine.
// Sampling is not an Elo test; labels and uncertainty are deliberately explicit.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),readline=require('readline');
const root=path.resolve(__dirname,'..');
let seed=20261024;
const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,Date,setTimeout,clearTimeout,console});
for(const file of ['js/chess.js','js/lessons.js','js/engine.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const {Chess,Engine}=vm.runInContext('({Chess,Engine})',ctx);
const positions=[
 ['initial',''],
 ['italian','e4 e5 Nf3 Nc6 Bc4 Bc5'],
 ['sicilian','e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6'],
 ['queens_gambit','d4 d5 c4 e6 Nc3 Nf6'],
 ['french','e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7'],
 ['ruy_lopez','e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6'],
 ['scandinavian','e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6'],
 ['evans','e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5'],
 ['exchange','d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5'],
 ['four_knights','e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4'],
 ['endgame_knights','8/2k5/2p5/6p1/2K2P2/5N2/8/8 w - - 0 1'],
 ['endgame_rooks','8/4k3/5p2/6p1/3K1P2/6P1/3R4/6r1 w - - 0 1'],
];
// Include ten documented midgame snapshots from independently verified historical scores.
vm.runInContext(fs.readFileSync(path.join(root,'js/games.js'),'utf8'),ctx,{filename:'js/games.js'});
const games=vm.runInContext('FAMOUS_GAMES',ctx);
for(const [n,g] of games.filter(g=>g.moves.length>=28).slice(0,10).entries()) {
 const ply=Math.min(g.moves.length-3, 16+n);
 positions.push(['historic_'+g.id,g.moves.slice(0,ply).map(m=>m.san).join(' ')]);
}

function fenFor([label,source]){
 if(source.includes('/'))return source;
 const g=new Chess();for(const san of source.split(/\s+/).filter(Boolean)){if(!g.move(san))throw Error('Invalid setup '+label+' '+san);}return g.fen();
}
function choose(fen,level){return new Promise((resolve,reject)=>{
 let started=performance.now(),settled=false;
 const timer=setTimeout(()=>{if(!settled)reject(new Error('AI did not respond level '+level))},20000);
 Engine.chooseMove(fen,level,m=>{settled=true;clearTimeout(timer);resolve({move:m,ms:performance.now()-started})});
});}
class UCI {
 constructor(binary){this.child=cp.spawn(binary,[],{stdio:['pipe','pipe','pipe']});this.lines=readline.createInterface({input:this.child.stdout});this.messages=[];this.waiting=null;this.lines.on('line',l=>{if(this.waiting){const w=this.waiting;w(l)}else this.messages.push(l)});this.child.on('error',e=>console.error(e));}
 send(s){this.child.stdin.write(s+'\n');}
 async until(end){return new Promise((resolve,reject)=>{
  const prev=this.messages.splice(0);let last=prev.findLast(x=>end(x));if(last){resolve(prev);return;}
  const t=setTimeout(()=>{this.waiting=null;reject(Error('Stockfish timeout: '+end.toString()))},25000);
  let lines=prev;
  this.waiting=(line)=>{lines.push(line);if(end(line)){clearTimeout(t);this.waiting=null;resolve(lines)}};
 });}
 async initialize(){this.send('uci');await this.until(s=>s==='uciok');this.send('setoption name Threads value 1');this.send('setoption name Hash value 16');this.send('isready');await this.until(s=>s==='readyok');}
 async evaluate(fen,depth=8){this.send('position fen '+fen);this.send('go depth '+depth);const lines=await this.until(s=>s.startsWith('bestmove '));let score=0,kind='cp';for(const line of lines){if(!line.startsWith('info depth '))continue;const m=line.match(/\bscore (cp|mate) (-?\d+)/);if(m){kind=m[1];score=Number(m[2]);}}return kind==='mate'?(score>0?100000:score<0?-100000:0):score;}
 stop(){this.send('quit');this.child.kill();}
}
async function main(){
 const flags=process.argv;const quick=flags.includes('--quick');const binaryIndex=flags.indexOf('--stockfish');const stockfish=binaryIndex>=0?flags[binaryIndex+1]:process.env.STOCKFISH;
 const outIndex=flags.indexOf('--output');const out=outIndex>=0?flags[outIndex+1]:null;
 const engine=stockfish?new UCI(stockfish):null;if(engine)await engine.initialize();
 const sample=quick?positions.slice(0,4):flags.includes('--midgame')?positions.slice(12):positions;
 const levelsArg=flags.indexOf('--levels');const [minLevel,maxLevel]=levelsArg>=0?flags[levelsArg+1].split('-').map(Number):[1,10];
 const rows=[], rootScores=new Map();
 try{
  for(const [label,source] of sample){
   const fen=fenFor([label,source]);const g0=new Chess(fen);let reference=null;
   if(engine){reference=await engine.evaluate(fen);rootScores.set(label,reference);}
   for(let level=minLevel;level<=maxLevel;level++){
    const {move,ms}=await choose(fen,level);
    const g=new Chess(fen);const selected=g.move(move&&{from:move.from,to:move.to,promotion:move.promotion});
    if(!selected)throw Error('AI returned illegal move at '+label+' level '+level+' '+JSON.stringify(move));
    const uci=selected.from+selected.to+(selected.promotion||'');
    let loss=null,replyScore=null;
    if(engine){replyScore=-(await engine.evaluate(g.fen()));loss=Math.max(0,reference-replyScore);}
    const result={label,level,san:selected.san,uci,ms:Math.round(ms),lossCp:loss,rootScore:reference,replyScore};
    rows.push(result);console.log(`level=${level} sample=${label} move=${selected.san} ms=${result.ms} loss=${loss===null?'n/a':loss}cp`);
   }
  }
 }finally{if(engine)engine.stop();}
 const summary=[];for(let level=minLevel;level<=maxLevel;level++){
  const items=rows.filter(r=>r.level===level);const sorted=items.map(i=>i.ms).sort((a,b)=>a-b);
  summary.push({level,samples:items.length,avgMs:Math.round(items.reduce((s,i)=>s+i.ms,0)/items.length),p95Ms:sorted[Math.ceil(sorted.length*.95)-1],avgLossCp:engine?Math.round(items.reduce((s,i)=>s+i.lossCp,0)/items.length):null,blunders250:engine?items.filter(i=>i.lossCp>250).length:null,uniqueMoves:new Set(items.map(i=>i.uci)).size});
 }
 const report={seed:20261024,source:'current source engine.js',stockfish:stockfish||null,depth:8,method:'selected opening/endgame and independently verified historical midgame snapshots; Stockfish depth-8 reference and reply scores, deterministic seed; not Elo',positions:sample.map(([label,x])=>label),summary,rows};
 if(out)fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
 console.log('BALANCE',JSON.stringify(summary));
}
main().catch(e=>{console.error(e);process.exitCode=1;});

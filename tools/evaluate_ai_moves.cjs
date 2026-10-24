#!/usr/bin/env node
'use strict';
// Independent Stockfish move-quality review of saved, legally replayed AI matches.
// This is not an Elo estimator. Sampled centipawn losses are engine/depth dependent.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const cp=require('node:child_process'),readline=require('node:readline');
const {OPENINGS}=require('./tournament_ai_levels.cjs');
const {summary:verifyTournament}=require('./summarize_ai_tournament.cjs');
const ctx=vm.createContext({console});
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../js/chess.js'),'utf8'),ctx);
const Chess=vm.runInContext('Chess',ctx);

function collectSamples(games,{minPly=16,maxPerGame=6}={}) {
 if(!Number.isInteger(minPly)||minPly<0||!Number.isInteger(maxPerGame)||maxPerGame<1)throw Error('Invalid sample parameters');
 const rows=[];
 for(let gi=0;gi<games.length;gi++) {
  const g=games[gi],o=OPENINGS.find(x=>x[0]===g.opening);
  if(!o)throw Error('Unknown opening '+g.opening);
  const board=new Chess();
  for(const san of o[1].split(/\s+/).filter(Boolean))if(!board.move(san))throw Error('Illegal starting SAN '+san);
  if(board.history().length!==g.startingPly)throw Error('Mismatched starting ply');
  const positions=[];
  for(let i=0;i<g.sans.length;i++) {
   const fen=board.fen(),color=board.turn();
   const m=board.move(g.sans[i]);
   if(!m)throw Error('Illegal recorded move '+g.sans[i]);
   if(i+g.startingPly>=minPly)positions.push({
    pair:g.a+'-'+g.b,level:color==='w'?g.white:g.black,
    opening:g.opening,seed:g.seed,gameIndex:gi,ply:g.startingPly+i,
    fen,uci:m.from+m.to+(m.promotion||''),san:m.san,color,
    completed:g.completed,reason:g.reason
   });
  }
  if(board.fen()!==g.finalFen)throw Error('Recorded final FEN mismatch');
  const n=Math.min(maxPerGame,positions.length);
  for(let k=0;k<n;k++)rows.push(positions[Math.floor((k+.5)*positions.length/n)]);
 }
 return rows;
}
class Stockfish {
 constructor(binary) {
  this.proc=cp.spawn(binary,[],{stdio:['pipe','pipe','pipe'],shell:false});
  this.pending=null;this.queue=[];this.exited=false;
  this.stderr='';
  this.proc.stderr.on('data',b=>{this.stderr=(this.stderr+b.toString()).slice(-1000)});
  this.proc.stdin.on('error',e=>this.fail(e));
  this.proc.on('error',e=>this.fail(e));
  this.proc.on('exit',(code)=>this.fail(Error('Stockfish exited: '+code+' '+this.stderr)));
  const rl=readline.createInterface({input:this.proc.stdout});
  rl.on('line',line=>{
   if(this.pending){const p=this.pending;p.lines.push(line);if(p.test(line)){clearTimeout(p.timer);this.pending=null;p.resolve(p.lines)}}
   else this.queue.push(line);
  });
 }
 fail(e) {this.exited=true;if(this.pending){const p=this.pending;clearTimeout(p.timer);this.pending=null;p.reject(e)}}
 send(msg){if(this.exited)throw Error('Stockfish has exited');this.proc.stdin.write(msg+'\n')}
 until(test,timeoutMs=45000){
  if(this.exited)return Promise.reject(Error('Stockfish unavailable'));
  return new Promise((resolve,reject)=>{
   const lines=this.queue.splice(0);if(lines.some(test)){resolve(lines);return}
   if(this.pending){reject(Error('Concurrent UCI command'));return}
   const waiter={test,lines,resolve,reject,timer:null};
   waiter.timer=setTimeout(()=>{this.pending=null;reject(Error('Stockfish timed out'))},timeoutMs);
   this.pending=waiter;
  });
 }
 async init(){
  this.send('uci');const intro=await this.until(x=>x==='uciok');
  this.version=(intro.find(x=>x.startsWith('id name '))||'id name Unknown').slice(8);
  this.send('setoption name Threads value 1');
  this.send('setoption name Hash value 16');
  this.send('isready');await this.until(x=>x==='readyok');
 }
 async evaluate(fen,depth,forced=null){
  this.send('ucinewgame');
  this.send('position fen '+fen);
  this.send('go depth '+depth+(forced?' searchmoves '+forced:''));
  const lines=await this.until(x=>x.startsWith('bestmove '));
  let latest=null;
  for(const line of lines){
   if(!line.startsWith('info ')||line.includes(' lowerbound')||line.includes(' upperbound'))continue;
   const score=line.match(/\bscore (cp|mate) (-?\d+)/);
   const d=line.match(/\bdepth (\d+)/);
   if(score&&d&&(!latest||Number(d[1])>=latest.depth))latest={kind:score[1],score:Number(score[2]),depth:Number(d[1])};
  }
  if(!latest)throw Error('No exact Stockfish evaluation: '+fen);
  const best=(lines.findLast(x=>x.startsWith('bestmove '))||'').split(' ')[1];
  const sign=Math.sign(latest.score);
  const cp=latest.kind==='mate' ? sign*(100000-100*Math.min(999,Math.abs(latest.score))) : latest.score;
  return {...latest,cp,bestmove:best};
 }
 close(){
  if(this.exited)return;
  this.exited=true;
  this.proc.stdin.end('quit\n');
  const timer=setTimeout(()=>{if(this.proc.exitCode===null)this.proc.kill()},1000);
  timer.unref();
 }
}
function aggregate(rows){
 const levels=new Map();
 for(const r of rows){
  if(!levels.has(r.level))levels.set(r.level,[]);
  levels.get(r.level).push(r);
 }
 return [...levels.entries()].sort((a,b)=>a[0]-b[0]).map(([level,items])=>{
  const sorted=items.map(x=>x.lossCp).sort((a,b)=>a-b);
  const n=sorted.length;
  return {level,examined:n,meanLossCpCapped1000:Math.round(sorted.reduce((s,x)=>s+Math.min(1000,x),0)/n),
   medianLossCp:sorted[Math.floor((n-1)/2)],
   p90LossCp:sorted[Math.ceil(n*.9)-1],
   lossesOver200:sorted.filter(x=>x>200).length,
   zeroLosses:sorted.filter(x=>x===0).length};
 });
}
function parseArgs(argv){
 const a={files:[],engine:process.env.STOCKFISH||null,depth:9,minPly:16,maxPerGame:6,maxSamples:500,out:null};
 for(let i=0;i<argv.length;i++){
  const name=argv[i],val=()=>{if(i+1>=argv.length)throw Error('Missing value for '+name);return argv[++i]};
  if(name==='--engine')a.engine=val();
  else if(name==='--depth')a.depth=Number(val());
  else if(name==='--min-ply')a.minPly=Number(val());
  else if(name==='--max-per-game')a.maxPerGame=Number(val());
  else if(name==='--max-samples')a.maxSamples=Number(val());
  else if(name==='--output')a.out=val();
  else if(name.startsWith('--'))throw Error('Unknown option '+name);
  else a.files.push(name);
 }
 if(!a.files.length||!a.engine)throw Error('Usage: evaluate_ai_moves.cjs matches.json ... --engine /path/to/stockfish --output results.json');
 for(const [v,lo,hi] of [[a.depth,1,24],[a.minPly,0,600],[a.maxPerGame,1,40],[a.maxSamples,1,5000]])
  if(!Number.isInteger(v)||v<lo||v>hi)throw Error('Invalid option value: '+v);
 return a;
}
async function main(){
 const args=parseArgs(process.argv.slice(2));
 verifyTournament(args.files); // independently replay every legal SAN and assert the final FEN
 const matches=args.files.flatMap(p=>JSON.parse(fs.readFileSync(p,'utf8')).games);
 const all=collectSamples(matches,args);
 if(all.length>args.maxSamples)throw Error('Sample count '+all.length+' exceeds --max-samples '+args.maxSamples);
 const stockfish=new Stockfish(args.engine),cache=new Map(),rows=[];
 try{
  await stockfish.init();
  for(const [i,pos] of all.entries()){
   const key=pos.fen,ref=cache.has(key)?cache.get(key):await stockfish.evaluate(key,args.depth);
   cache.set(key,ref);
   const forced=ref.bestmove===pos.uci?ref:await stockfish.evaluate(pos.fen,args.depth,pos.uci);
   const lossCp=Math.max(0,ref.cp-forced.cp);
   rows.push({...pos,lossCp,bestmove:ref.bestmove,referenceCp:ref.cp,playedCp:forced.cp,
    bestKind:ref.kind,playedKind:forced.kind,depth:args.depth});
   if((i+1)%20===0)console.error('Stockfish moves',i+1,'/',all.length);
  }
 }finally{stockfish.close()}
 const report={method:'Stockfish fixed-depth root vs restricted searchmoves; sampled legal AI moves; score is side-to-move POV; depth/horizon artifacts possible; terminal mate scores are distinct; no Elo claim.',stockfish:args.engine,stockfishVersion:stockfish.version,depth:args.depth,sampledPositions:rows.length,perLevel:aggregate(rows),rows};
 if(args.out)fs.writeFileSync(args.out,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({depth:args.depth,sampledPositions:rows.length,perLevel:report.perLevel},null,2));
}
if(require.main===module)main().catch(e=>{console.error(e.stack||e);process.exitCode=1});
module.exports={collectSamples,aggregate,parseArgs};

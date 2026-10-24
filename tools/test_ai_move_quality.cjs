'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {collectSamples,aggregate,parseArgs}=require('./evaluate_ai_moves.cjs');
const ctx=vm.createContext({console});
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../js/chess.js'),'utf8'),ctx);
const Chess=vm.runInContext('Chess',ctx);
const game=new Chess();
const sans=['e4','e5','Nf3','Nc6','Bc4','Bc5'];
for(const m of sans)assert.ok(game.move(m));
const rows=collectSamples([{a:4,b:5,white:4,black:5,opening:'open',seed:7,
 startingPly:0,sans,finalFen:game.fen(),completed:false,reason:'ply-cap-draw'}],
 {minPly:0,maxPerGame:4});
assert.equal(rows.length,4);
assert.ok(rows.every(r=>r.pair==='4-5'&&[4,5].includes(r.level)));
for(const r of rows){
 const replay=new Chess(r.fen);
 assert.ok(replay.move({from:r.uci.slice(0,2),to:r.uci.slice(2,4),
  promotion:r.uci.length===5?r.uci.slice(4):undefined}));
}
assert.throws(()=>collectSamples([{a:4,b:5,opening:'open',startingPly:0,
 sans,finalFen:'bad'}]),/FEN/);
const sum=aggregate([{level:4,lossCp:25},{level:4,lossCp:350},{level:5,lossCp:0}]);
assert.equal(sum[0].lossesOver200,1);
assert.equal(sum[1].zeroLosses,1);
assert.equal(parseArgs(['x.json','--engine','stockfish']).depth,9);
assert.throws(()=>parseArgs(['x.json','--engine','stockfish','--depth','0']),/Invalid/);
console.log('PASS: Stockfish sampling from legal recorded moves and loss grouping');

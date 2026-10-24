'use strict';
// Make the published Stockfish move comparisons auditable, without asserting Elo.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({console});
vm.runInContext(fs.readFileSync(path.join(root,'js/chess.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'js/engine.js'),'utf8'),context);
const {Chess,Engine} = vm.runInContext('({Chess,Engine})', context);
const data=JSON.parse(fs.readFileSync(path.join(root,'docs/ai-calibration-2026-10-24.json'),'utf8'));
assert.equal(data.positions.length,9);
assert.equal(data.rows.length,36);
assert.deepEqual(data.summary.map(s=>s.level),[5,6,7,8]);
for(let level=1;level<=10;level++){
 const config=Engine.LEVELS[level];assert.ok(config,`Missing level ${level}`);
 assert.ok(config.timeMs>0 && config.depth>0);
 if(level>1){const prev=Engine.LEVELS[level-1];assert.ok(config.margin<=prev.margin && config.noise<=prev.noise && config.blunder<=prev.blunder,`strength profile regresses at ${level}`);}
}
for(const [level,variant] of Object.entries(data.settings))for(const [key,value] of Object.entries(variant.new))
 assert.equal(Engine.LEVELS[level][key],value,`Source profile does not match published ${level}.${key}`);
for(const row of data.rows){
 assert.ok([5,6,7,8].includes(row.level));
 assert.ok(data.positions.some(p=>p.fen===row.fen && p.name===row.position));
 for(const name of ['baseline','candidate']){
  const item=row[name];const game=new Chess(row.fen);
  assert.equal(item.uci.length===4||item.uci.length===5,true);
  const actual=game.move({from:item.uci.slice(0,2),to:item.uci.slice(2,4),promotion:item.uci.slice(4)||undefined});
  assert.ok(actual,`${row.position} level ${row.level} ${name}: illegal move`);
  assert.equal(actual.san,item.san);
  assert.ok(Number.isFinite(item.lossCp)&&item.lossCp>=0);
 }
}
for(const record of data.summary){
 const rows=data.rows.filter(r=>r.level===record.level);
 assert.equal(rows.length,record.n);
 for(const [key,mean] of [['baseline',record.avgOld],['candidate',record.avgNew]])
  assert.equal(Math.round(rows.reduce((s,r)=>s+r[key].lossCp,0)/rows.length),mean);
}
console.log('PASS: ten ordered level configurations, four calibrated settings, 36 legal paired Stockfish comparisons');

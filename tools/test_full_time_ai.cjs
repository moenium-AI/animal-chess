'use strict';
const assert=require('node:assert/strict');
const {analyze}=require('./summarize_full_time_ai.cjs');
function g(white,result,completed,reason){return {a:4,b:5,white,black:white===4?5:4,opening:'italian',seed:7,result,completed,reason,thinkMs:{4:[100],5:[200]}}}
const input={config:{budgetScale:1},games:[g(4,'1-0',true,'checkmate'),g(5,'1/2-1/2',false,'ply-cap-draw')]};
const s=analyze([input],{requireFullBudget:true});
assert.equal(s.completed,1);assert.equal(s.officialDraws,0);assert.equal(s.unfinished,1);assert.equal(s.pairs[0].scorePctBCompletedOnly,0);assert.equal(s.pairs[0].unfinishedPct,50);
assert.throws(()=>analyze([{...input,config:{budgetScale:.12}}],{requireFullBudget:true}),/budget/);
assert.throws(()=>analyze([{...input,games:[input.games[0]]}]),/mirrored/);
const t=analyze([{config:{budgetScale:1},games:[g(4,'1/2-1/2',true,'stalemate'),g(5,'1/2-1/2',true,'repetition')]}]);
assert.equal(t.officialDraws,2);assert.equal(t.pairs[0].scorePctBCompletedOnly,50);
console.log('PASS: outcome classification, full-time gate, mirrored color pairs');

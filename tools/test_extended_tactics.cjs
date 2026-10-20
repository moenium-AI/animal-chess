'use strict';
// Independently verify the teaching motif for each of the 25 newly added
// one-move exercises, rather than merely accepting its SAN as a legal move.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/chess.js'), 'utf8'),ctx);
const Chess = vm.runInContext('Chess',ctx);
const catalogue = JSON.parse(fs.readFileSync(path.join(__dirname, 'puzzle_catalog.json'),'utf8')).puzzles;
const byId = new Map(catalogue.map(p=>[p.id,p]));
const ids = catalogue.filter(p=>p.id.startsWith('tactic-') && ![
 'tactic-knight-queen-fork','tactic-knight-rook-fork','tactic-pawn-fork',
 'tactic-absolute-pin','tactic-relative-pin','tactic-rook-skewer',
 'tactic-discovered-attack','tactic-promotion','tactic-double-check',
 'tactic-en-passant','tactic-knight-underpromotion','tactic-rook-underpromotion',
 'tactic-bishop-double-attack',
].includes(p.id)).map(p=>p.id);
assert.equal(ids.length,25);
function xy(s) {return [s.charCodeAt(0)-97,Number(s[1])-1]}
function piece(g,s,type,color){const p=g.get(s);assert.ok(p && p.type===type && p.color===color, `${s} must contain ${color}${type}`)}
function line(g,a,b,kind){const [x,y]=xy(a),[u,v]=xy(b),dx=u-x,dy=v-y,ax=Math.abs(dx),ay=Math.abs(dy);
 if(kind==='r' ? !((dx===0)!==(dy===0)) : kind==='b' ? !(ax===ay && ax!==0) : !(ax===ay && ax!==0 || (dx===0)!==(dy===0)))return false;
 const n=Math.max(ax,ay),sx=Math.sign(dx),sy=Math.sign(dy);
 for(let k=1;k<n;k++){const square=String.fromCharCode(97+x+k*sx)+(y+k*sy+1);if(g.get(square))return false}
 return true;
}
function attack(g,a,b,type,color='w'){const [x,y]=xy(a),[u,v]=xy(b),dx=Math.abs(x-u),dy=Math.abs(y-v);
 if(type==='n')return dx===1&&dy===2||dx===2&&dy===1;
 if(type==='p')return dx===1&&v===y+(color==='w'?1:-1);
 if(type==='k')return Math.max(dx,dy)===1;
 return line(g,a,b,type);
}
function play(id){const p=byId.get('tactic-'+id);assert.ok(p, id);const before=new Chess(p.fen);
 assert.ok(before.validate_fen(p.fen).valid,id);
 assert.equal(before.in_check(),false,'white in check: '+id);
 assert.equal(new Chess(p.fen.replace(' w ',' b ')).in_check(),false,'black king already in check: '+id);
 assert.ok(!before.game_over());
 assert.ok(p.solutions.every(san=>before.moves().includes(san)),id+' all SAN moves must be legal and exact');
 const result=before.move(p.solutions[0]);assert.ok(result,id);
 assert.equal(before.in_checkmate(),false,id);
 return {g:before, move:result, before:new Chess(p.fen)};
}
const forks={
 'fork-knight-queen':['d6','n',[['f7','k'],['b5','q']]],
 'fork-knight-rooks':['f5','n',[['d4','r'],['h4','r']]],
 'fork-rook-minors':['d4','r',[['d7','n'],['d1','b']]],
 'fork-queen-minors':['e4','q',[['e7','n'],['e1','n']]],
 'fork-pawn-major':['d5','p',[['c6','q'],['e6','r']]],
 'fork-bishop-minors':['f6','b',[['d8','r'],['h8','n']]],
 'promotion-knight-majors':['a8','n',[['b6','q'],['c7','r']]],
};
for(const [id,[landing,type,targets]] of Object.entries(forks)){
 const {g}=play(id);piece(g,landing,type,'w');
 for(const [square,kind] of targets){piece(g,square,kind,'b');assert.ok(attack(g,landing,square,type),id+' does not attack '+square)}
}
const pins={
 'pin-queen-king':['g5','r','g7','q','g8','k'],
 'pin-bishop-knight':['e4','b','f5','n','g6','k'],
 'pin-queen-knight':['c5','q','c7','n','c8','k'],
 'pin-bishop-relative':['g5','b','e7','r','d8','q'],
 'pin-rook-relative':['f2','r','f5','b','f8','q'],
 'pin-bishop-king-2':['e4','b','c6','r','b7','k'],
};
for(const [id,[square,type,front,frontType,back,backType]] of Object.entries(pins)){
 const {g}=play(id);piece(g,square,type,'w');piece(g,front,frontType,'b');piece(g,back,backType,'b');
 assert.ok(line(g,square,front,type),id+' does not attack the front piece');
 assert.ok(line(g,front,back,type),id+' does not align behind it');
 if(backType==='k') {
   // Enemy king must stay shielded by the piece being pinned; moving that
   // piece sideways would expose an attack on the king.
   assert.ok(attack(g,square,front,type),id);
 }
}
const skewers={
 'skewer-bishop-king':['c4','b','e6','k','g8','r'],
 'skewer-rook-queen':['e5','r','e7','k','e8','q'],
};
for(const [id,[square,type,front,frontType,back,backType]] of Object.entries(skewers)){
 const {g}=play(id);piece(g,square,type,'w');piece(g,front,frontType,'b');piece(g,back,backType,'b');
 assert.ok(g.in_check(),id);assert.ok(line(g,square,front,type));assert.ok(line(g,front,back,type));
}
{
 const {g,before}=play('discovery-knight-queen');
 piece(before,'e4','n','w');piece(before,'e1','r','w');piece(before,'e8','q','b');
 assert.equal(line(before,'e1','e8','r'),false);
 piece(g,'f6','n','w');piece(g,'e1','r','w');piece(g,'e8','q','b');
 assert.ok(attack(g,'f6','h7','n'));assert.ok(g.in_check());assert.ok(line(g,'e1','e8','r'));
}
{
 const {g,before}=play('discovery-pawn-bishop');
 piece(before,'d4','p','w');assert.equal(line(before,'b2','g7','b'),false);
 piece(g,'d5','p','w');piece(g,'b2','b','w');piece(g,'g7','r','b');
 assert.ok(line(g,'b2','g7','b'));
}
{
 const {g}=play('doublecheck-knight');
 piece(g,'e6','n','w');piece(g,'d1','r','w');piece(g,'d8','k','b');
 assert.ok(attack(g,'e6','d8','n'));assert.ok(line(g,'d1','d8','r'));assert.ok(g.in_check());
}
for(const [id,defender,target,victim,friend,friendType] of [
 ['defender-bishop','e6','d8','n','d1','r'],
 ['defender-pawn','f5','e4','p','e2','q'],
 ['defender-bishop-2','g4','d7','b','a4','b'],
]){
 const {g,move,before}=play(id);
 assert.equal(move.to,defender,id);assert.ok(move.flags.includes('c'),id+' must capture defender');
 assert.equal(g.get(defender).color,'w');
 piece(g,target,id==='defender-pawn'?'n':'r','b');piece(g,friend,friendType,'w');
 assert.ok(attack(before,defender,target,victim,'b'),id+' defender did not defend target');
 assert.ok(attack(g,friend,target,friendType),id+' attack not opened');
}
{
 const {g,move}=play('promotion-capture-check');
 assert.ok(move.flags.includes('p')&&move.flags.includes('c'));
 assert.equal(move.promotion,'q');piece(g,'a8','q','w');assert.ok(g.in_check());
}
{
 const {g,move}=play('castling-kingside');
 assert.ok(move.flags.includes('k'));piece(g,'g1','k','w');piece(g,'f1','r','w');
 assert.equal(g.get('e1'),null);assert.equal(g.get('h1'),null);
}
{
 const {g,move}=play('rook-capture-check');
 assert.ok(move.flags.includes('c'));assert.ok(g.in_check());piece(g,'h8','r','w');piece(g,'d4','b','w');
 assert.ok(attack(g,'d4','h8','b'));
 assert.ok(!g.moves().includes('Kxh8'), 'captured rook must be defended against the king');
}
{
 const {g,move}=play('bishop-sacrifice-check');
 assert.ok(move.flags.includes('c')&&g.in_check());piece(g,'h7','b','w');piece(g,'g5','n','w');
 assert.ok(attack(g,'g5','h7','n'));
}
console.log(`PASS: ${ids.length} new tactical lessons, SAN/capture/check/castling/promotion and intended attack geometry`);

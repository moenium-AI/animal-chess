'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');const c=vm.createContext({});vm.runInContext(fs.readFileSync(__dirname+'/../js/chess.js','utf8'),c);const Chess=vm.runInContext('Chess',c);
const ps=require('./puzzle_catalog.json').puzzles.filter(x=>x.objective==='tactic');
function xy(s){return [s.charCodeAt(0)-97,Number(s[1])-1]}
function ray(g,a,b,ty){const [x,y]=xy(a),[u,v]=xy(b),dx=u-x,dy=v-y,n=Math.max(Math.abs(dx),Math.abs(dy));if(n===0)return false;let mode=(dx===0||dy===0)?'r':Math.abs(dx)===Math.abs(dy)?'b':null;if(mode===null||ty==='r'&&mode!=='r'||ty==='b'&&mode!=='b')return false;for(let i=1;i<n;i++){let s=String.fromCharCode(97+x+Math.sign(dx)*i)+(y+Math.sign(dy)*i+1);if(g.get(s))return false;}return true}
function attacks(g,a,b){const p=g.get(a);if(!p)return false;const [x,y]=xy(a),[u,v]=xy(b),dx=u-x,dy=v-y;switch(p.type){case'n':return Math.abs(dx)===1&&Math.abs(dy)===2||Math.abs(dx)===2&&Math.abs(dy)===1;case'p':return Math.abs(dx)===1&&dy===(p.color==='w'?1:-1);case'k':return Math.max(Math.abs(dx),Math.abs(dy))===1;default:return ray(g,a,b,p.type)} }
function straight(a,b,c){const [x,y]=xy(a),[u,v]=xy(b),[i,j]=xy(c);return (u-x)*(j-v)===(v-y)*(i-u)&&((u-x)*(i-u)+(v-y)*(j-v)>0)}
function at(g,s,type,color){let p=g.get(s);return p&&p.type===type&&p.color===color}
function allPieces(g,color){const o=[];for(let y=1;y<=8;y++)for(let x of 'abcdefgh'){let s=x+y,p=g.get(s);if(p?.color===color)o.push([s,p.type]);}return o}
function numChecks(g){let king=allPieces(g,'b').find(p=>p[1]==='k')?.[0];return king?allPieces(g,'w').filter(([square])=>attacks(g,square,king)).length:0}
const forks={
 'tactic-bishop-double-attack':['b',['e7','h4']],
 'tactic-knight-queen-fork':['n',['h8','d8']],
 'tactic-knight-rook-fork':['n',['h7','d7']],
 'tactic-pawn-fork':['p',['d6','f6']],
 'tactic-fork-knight-queen':['n',['f7','b5']],
 'tactic-fork-knight-rooks':['n',['d4','h4']],
 'tactic-fork-rook-minors':['r',['d7','d1']],
 'tactic-fork-queen-minors':['q',['e7','e1']],
 'tactic-fork-pawn-major':['p',['c6','e6']],
 'tactic-fork-bishop-minors':['b',['d8','h8']],
 'tactic-promotion-knight-majors':['n',['b6','c7']],
};
const pins={
 'tactic-absolute-pin':['r','e7','e8'],
 'tactic-relative-pin':['b','d5','c6'],
 'tactic-pin-queen-king':['r','g7','g8'],
 'tactic-pin-bishop-knight':['b','f5','g6'],
 'tactic-pin-queen-knight':['q','c7','c8'],
 'tactic-pin-bishop-relative':['b','e7','d8'],
 'tactic-pin-rook-relative':['r','f5','f8'],
 'tactic-pin-bishop-king-2':['b','c6','b7'],
};
const skewers={
 'tactic-rook-skewer':['r','c7','c8'],
 'tactic-skewer-bishop-king':['b','e6','g8'],
 'tactic-skewer-rook-queen':['r','e7','e8'],
};
function motif(p,g,m){let id=p.id,s=m.to,ty=g.get(s)?.type;
if(id in forks){let [kind,targets]=forks[id];return ty===kind && targets.every(t=>attacks(g,s,t))}
if(id in pins){let[kind,front,back]=pins[id];return ty===kind&&ray(g,s,front,ty)&&ray(g,front,back,ty)&&straight(s,front,back)&& at(g,front,g.get(front)?.type,'b')&&at(g,back,g.get(back)?.type,'b')}
if(id in skewers){let[kind,front,back]=skewers[id];return ty===kind&&ray(g,s,front,ty)&&ray(g,front,back,ty)&&straight(s,front,back)&&g.in_check()}
if(id==='tactic-discovered-attack')return ty==='b'&&g.in_check()&&ray(g,'e1','e8','r')&&at(g,'e8','q','b');
if(id==='tactic-discovery-knight-queen')return ty==='n'&&g.in_check()&&ray(g,'e1','e8','r')&&at(g,'e8','q','b');
if(id==='tactic-discovery-pawn-bishop')return ty==='p'&&ray(g,'b2','g7','b')&&at(g,'g7','r','b');
if(id.startsWith('tactic-double'))return numChecks(g)>=2;
if(id==='tactic-rook-underpromotion')return m.flags.includes('p')&&!g.game_over();
if(id==='tactic-promotion')return m.promotion==='q'&&g.in_check();
if(id==='tactic-knight-underpromotion')return m.promotion==='n'&&g.in_check()&&attacks(g,s,'e7')&&attacks(g,s,'a7');
if(id==='tactic-en-passant')return m.flags.includes('e');
if(id==='tactic-defender-bishop'||id==='tactic-defender-pawn'||id==='tactic-defender-bishop-2')return m.flags.includes('c')&&s===({'tactic-defender-bishop':'e6','tactic-defender-pawn':'f5','tactic-defender-bishop-2':'g4'}[id]);
if(id==='tactic-promotion-capture-check')return m.flags.includes('p')&&m.flags.includes('c')&&m.promotion==='q'&&g.in_check();
if(id==='tactic-castling-kingside')return m.flags.includes('k');
if(id==='tactic-rook-capture-check')return s==='h8'&&m.flags.includes('c')&&g.in_check();
if(id==='tactic-bishop-sacrifice-check')return s==='h7'&&m.flags.includes('c')&&g.in_check();
throw Error('unknown '+id);
}
for(const p of ps){let g=new Chess(p.fen), hits=[];for(const m of g.moves({verbose:true})){g.move(m);if(motif(p,g,m))hits.push(m.san);g.undo()}
let original=p.solutions;let missing=hits.filter(x=>!original.includes(x));let extra=original.filter(x=>!hits.includes(x));let pre='';if(p.id in pins){let [kind,front,back]=pins[p.id];pre=allPieces(g,'w').some(([s,type])=>type===kind&&ray(g,s,front,type)&&ray(g,front,back,type)&&straight(s,front,back))?' ALREADY_PINNED':''}
assert.deepEqual([...original].sort(),hits.sort(),`Incorrect or missing legitimate answer for ${p.id}`);
assert.ok(!pre,`A pin is already present before the move: ${p.id}`);
console.log(`${p.id.padEnd(33)} | ${hits.length} accepted moves: ${hits.join(',')}`);
}

console.log('PASS: exhaustive thematic alternatives for '+ps.length+' one-move exercises');

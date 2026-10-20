'use strict';
// Puzzle catalog regression: geometry, translation, duplicate patterns,
// lesson claims, filters, and intentionally reset progress. No network needed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const js = (name) => fs.readFileSync(path.join(root, 'js', name + '.js'), 'utf8');
const ctx = vm.createContext({console});
for (const file of ['chess', 'learning', 'puzzles', 'puzzle_en']) vm.runInContext(js(file), ctx);
const catalog = JSON.parse(vm.runInContext('JSON.stringify(PUZZLES)', ctx));
const en = JSON.parse(vm.runInContext('JSON.stringify(PUZZLE_EN)', ctx));
const source = JSON.parse(fs.readFileSync(path.join(root, 'tools/puzzle_catalog.json'), 'utf8'));
assert.equal(source.formatVersion, 1);
assert.equal(catalog.length, 80);
assert.equal(new Set(catalog.map(p => p.id)).size, 80);
assert.equal(new Set(catalog.map(p => p.fen)).size, 80);
assert.equal(catalog.filter(p => p.objective === 'tactic').length, 38);
assert.equal(catalog.filter(p => p.objective === 'mate').length, 42);
assert.deepEqual(Object.keys(en).sort(), catalog.map(p => p.id).sort());
assert.equal(source.puzzles.length, catalog.length);
assert.deepEqual(source.puzzles.map(p=>p.id), catalog.map(p=>p.id));
for(const p of source.puzzles){ assert.deepEqual([p.en.title,p.en.idea],en[p.id]); }
assert.ok(!catalog.some(p=>['puzzle-005','puzzle-032'].includes(p.id)));
assert.ok(!js('puzzles').includes('PUZZLE_LEGACY_IDS'));
const pById = new Map(catalog.map(p => [p.id, p]));
const completedBoards = new Map();
function fromFen(fen) {
  return vm.runInContext(`new Chess(${JSON.stringify(fen)})`, ctx);
}
function expandRow(row) {
  const chars = [];
  for (const c of row) {
    if (/\d/.test(c)) chars.push(...Array(Number(c)).fill('.'));
    else chars.push(c);
  }
  assert.equal(chars.length, 8);
  return chars;
}
function mirrorFen(fen) {
  const rows = fen.split(' ')[0].split('/');
  return rows.map(r => expandRow(r).reverse().join('')).join('/');
}
function geometryFen(fen) { return fen.split(' ')[0].split('/').map(r => expandRow(r).join('')).join('/'); }
const boardPositions = catalog.map(p => geometryFen(p.fen));
for (let a=0; a < catalog.length; a++) {
  for (let b=a+1; b < catalog.length; b++) {
    assert.notEqual(boardPositions[a], boardPositions[b], `identical starts: ${catalog[a].id} / ${catalog[b].id}`);
    assert.notEqual(mirrorFen(catalog[a].fen), boardPositions[b], `horizontally mirrored starts: ${catalog[a].id} / ${catalog[b].id}`);
  }
}
for (const p of catalog) {
  assert.ok(typeof p.id === 'string' && p.id.length >= 6);
  assert.ok(p.title.trim() && p.idea.trim());
  assert.ok(en[p.id][0].trim() && en[p.id][1].trim());
  assert.ok(['w','b'].includes(p.turn));
  const game = fromFen(p.fen);
  assert.equal(game.validate_fen(p.fen).valid, true, p.id);
  assert.equal(game.turn(), p.turn, p.id);
  assert.ok(!game.game_over(), p.id);
  const key = `${p.fen}|${p.mateIn}`;
  assert.deepEqual([...p.continuations[key]].sort(), [...p.solutions].sort(), p.id);
  if (p.objective === 'tactic') {
    assert.equal(p.mateIn, 1, p.id);
    assert.deepEqual(Object.keys(p.continuations), [key], p.id);
    assert.ok(p.solutions.length >= 1, p.id);
    assert.ok(p.solutions.every(san => !san.endsWith('#')), p.id);
  }
  if (p.objective === 'mate' && p.mateIn === 1) {
    for (const san of p.solutions) {
      const position = fromFen(p.fen);
      assert.ok(position.move(san), `${p.id}: ${san}`);
      assert.ok(position.in_checkmate(), `${p.id}: ${san}`);
      const after = geometryFen(position.fen());
      const existing = completedBoards.get(after);
      assert.ok(!existing, `${p.id} ends in the same mate position as ${existing}`);
      completedBoards.set(after,p.id);
    }
  }
}
// Tactical teaching claims, checked against legal post-move piece geometry.
function coord(s) {return [s.charCodeAt(0)-97, Number(s[1])-1];}
function knightAttacks(from,to) {
  const [a,b]=coord(from),[c,d]=coord(to);
  return [Math.abs(a-c),Math.abs(b-d)].sort().join(',') === '1,2';
}
function pawnAttacks(from,to) {
  const [a,b]=coord(from),[c,d]=coord(to);
  return Math.abs(a-c) === 1 && d-b === 1;
}
function rayClear(game,from,to,diagonal=false) {
  const [a,b]=coord(from),[c,d]=coord(to), dx=c-a,dy=d-b;
  if (diagonal ? (Math.abs(dx)!==Math.abs(dy)||dx===0) : (!((dx===0)!==(dy===0)))) return false;
  const sx=Math.sign(dx),sy=Math.sign(dy),count=Math.max(Math.abs(dx),Math.abs(dy));
  for(let i=1;i<count;i++) {
    const sq=String.fromCharCode(97+a+sx*i)+(b+sy*i+1);
    if(game.get(sq)) return false;
  }
  return true;
}
function piece(game,square,type,color) {
  const p=game.get(square);
  assert.ok(p && p.type===type && p.color===color, `expected ${color}${type} on ${square}`);
}
function play(id) {
  const p=pById.get(id), g=fromFen(p.fen);
  assert.ok(g.move(p.solutions[0]), id);
  assert.ok(!g.in_checkmate(), id);
  return g;
}
for(const [id,king,loot] of [
  ['tactic-knight-queen-fork','h8','d8'],
  ['tactic-knight-rook-fork','h7','d7'],
]) {
  const g=play(id);
  const landing=id==='tactic-knight-queen-fork'?'f7':'f6';
  piece(g,landing,'n','w');piece(g,king,'k','b');
  piece(g,loot,id==='tactic-knight-queen-fork'?'q':'r','b');
  assert.ok(g.in_check(),id);
  assert.ok(knightAttacks(landing,king)&&knightAttacks(landing,loot),id);
}
{
  const g=play('tactic-pawn-fork');
  piece(g,'e5','p','w');piece(g,'d6','r','b');piece(g,'f6','r','b');
  assert.ok(pawnAttacks('e5','d6')&&pawnAttacks('e5','f6'));
}
{
  const g=play('tactic-relative-pin');
  piece(g,'g2','b','w');piece(g,'d5','n','b');piece(g,'c6','q','b');
  assert.ok(rayClear(g,'g2','d5',true));
  // Knight on d5 is between bishop on g2 and queen on c6 after the move.
  assert.ok(rayClear(g,'d5','c6',true));
}
{
  const g=play('tactic-absolute-pin');
  piece(g,'e1','r','w');piece(g,'e7','n','b');piece(g,'e8','k','b');
  assert.ok(rayClear(g,'e1','e7'));
  assert.ok(rayClear(g,'e7','e8'));
  assert.equal(g.moves({square:'e7'}).length,0);
}
{
  const g=play('tactic-rook-skewer');
  piece(g,'c5','r','w');piece(g,'c7','k','b');piece(g,'c8','q','b');
  assert.ok(g.in_check());
  assert.ok(rayClear(g,'c5','c7'));
  assert.ok(rayClear(g,'c7','c8'));
}
{
  const g=play('tactic-discovered-attack');
  piece(g,'d5','b','w');piece(g,'e1','r','w');piece(g,'e8','q','b');
  assert.ok(g.in_check());
  assert.ok(rayClear(g,'e1','e8'));
}
{
  const g=play('tactic-promotion');
  piece(g,'a8','q','w');
  assert.ok(g.in_check());
}
// New tactical descriptions must match the actual board after the winning move.
{
  const g=play('tactic-double-check');
  piece(g,'g6','b','w');piece(g,'e1','r','w');piece(g,'e8','k','b');
  assert.ok(g.in_check());
  assert.ok(rayClear(g,'g6','e8',true));
  assert.ok(rayClear(g,'e1','e8'));
}
{
  const before=fromFen(pById.get('tactic-en-passant').fen);
  piece(before,'d5','p','b');piece(before,'e5','p','w');
  const move=before.move('exd6');
  assert.ok(move && move.flags.includes('e'));
  piece(before,'d6','p','w');assert.equal(before.get('d5'),null);
}
{
  const g=play('tactic-knight-underpromotion');
  piece(g,'c8','n','w');piece(g,'e7','k','b');piece(g,'a7','r','b');
  assert.ok(g.in_check());
  assert.ok(knightAttacks('c8','e7')&&knightAttacks('c8','a7'));
  const q=fromFen(pById.get('tactic-knight-underpromotion').fen);
  assert.ok(q.move({from:'c7',to:'c8',promotion:'q'}));
  assert.ok(!q.in_check());
}
{
  const p=pById.get('tactic-rook-underpromotion');
  const queen=fromFen(p.fen),rook=fromFen(p.fen);
  assert.ok(queen.move('c8=Q'));
  assert.ok(queen.in_stalemate());
  assert.ok(rook.move('c8=R'));
  piece(rook,'c8','r','w');
  assert.equal(rook.in_stalemate(),false);
  assert.equal(rook.moves().join(','),'Ka6');
}
{
  const g=play('tactic-bishop-double-attack');
  piece(g,'g5','b','w');piece(g,'e7','q','b');piece(g,'h4','r','b');
  piece(g,'f4','p','w');
  assert.ok(rayClear(g,'g5','e7',true));
  assert.ok(rayClear(g,'g5','h4',true));
  assert.ok(pawnAttacks('f4','g5'));
}
// Exercise the real progress helpers in isolation; legacy progress is deliberately ignored.
const app = js('app');
function extract(name) {
  const re = ['puzzleThemeLabel', 'puzzleSafeText'].includes(name)
    ? new RegExp('^function ' + name + '.*$', 'm')
    : new RegExp('^function ' + name + '\\([^]*?^}', 'm');
  const match=app.match(re);assert.ok(match,name);return match[0];
}
const progress = vm.createContext({console:{warn() {}}});
for(const file of ['puzzles','puzzle_en']) vm.runInContext(js(file),progress);
vm.runInContext(`let settings={viewMode:'miniature'}, solvedPuzzles=new Set();
const store=new Map();
const localStorage={getItem:(k)=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,v)};
${extract('saveSolved')}
${extract('loadSaved')}
`,progress);
progress.legacyJSON=JSON.stringify([0,1,2,10,17,20,999,-1,'3']);
vm.runInContext(`localStorage.setItem('animalchess_solved', legacyJSON);
localStorage.setItem('animalchess_solved_v2', JSON.stringify(['puzzle-001', 'tactic-promotion']));
loadSaved();`,progress);
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify([...solvedPuzzles])',progress)), []);
assert.equal(vm.runInContext('localStorage.getItem("animalchess_solved")',progress),progress.legacyJSON);
assert.ok(!vm.runInContext('localStorage.getItem("animalchess_solved_v4")',progress));
vm.runInContext(`solvedPuzzles=new Set(['tactic-promotion']); saveSolved();
solvedPuzzles=new Set();loadSaved();`,progress);
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify([...solvedPuzzles])',progress)), ['tactic-promotion']);
vm.runInContext(`localStorage.setItem('animalchess_solved_v4', JSON.stringify(['tactic-promotion','puzzle-001','puzzle-005', -1, {}, null]));
loadSaved();`,progress);
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify([...solvedPuzzles].sort())',progress)), ['puzzle-001','tactic-promotion']);
vm.runInContext(`localStorage.setItem('animalchess_solved_v4', 'bad json'); solvedPuzzles=new Set(); loadSaved();`,progress);
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify([...solvedPuzzles])',progress)), []);
// Verify live app list filters only show the intended type and translations are stable by ID.
const ui = vm.createContext({console});
for(const file of ['puzzles','puzzle_en']) vm.runInContext(js(file),ui);
const listFns=['puzzleText','puzzleThemeLabel','puzzleSafeText','puzzleMatchesFilter','renderPuzzleList'];
vm.runInContext(`const I18N={language:'en'};
const PUZZLE_THEME_EN={fork:'Fork',pin:'Pin'},PUZZLE_THEME_JA={};
const wrap={children:[],scrollTop:0,set innerHTML(v){this.children=[];}, appendChild(c){this.children.push(c)}};
const document={createElement:()=>({className:'',innerHTML:'',dataset:{},addEventListener(){}})};
const $=()=>wrap;
const tr=(key,v)=> key==='puzzle.mateIn'?'Mate in '+v.moves:key;
let puzzle={idx:-1},puzzleLevel='all',puzzleTheme='all',solvedPuzzles=new Set();
${listFns.map(extract).join('\n')}
`,ui);
vm.runInContext(`puzzleLevel='tactic';renderPuzzleList()`,ui);
assert.equal(vm.runInContext('wrap.children.length',ui),38);
vm.runInContext(`puzzleLevel=1;renderPuzzleList()`,ui);
assert.equal(vm.runInContext('wrap.children.length',ui),27);
vm.runInContext(`puzzleLevel='tactic';puzzleTheme='fork';renderPuzzleList()`,ui);
assert.equal(vm.runInContext('wrap.children.length',ui),10);
const one=pById.get('puzzle-020');
assert.equal(JSON.parse(vm.runInContext(`JSON.stringify(puzzleText(PUZZLES.find(p=>p.id==='puzzle-020')))`,ui)).title,en[one.id][0]);
// Real puzzle move and completion callbacks: a tactic must complete without checkmate.
const playCtx = vm.createContext({console});
for (const file of ['chess', 'learning', 'puzzles']) vm.runInContext(js(file),playCtx);
vm.runInContext(`
let mode = 'puzzle', cpuThinking = false, selected=null, legalTargets=[], puzzle;
let game, lastToast='', completedCount=0, saved=0, statusUpdates=0;
const solvedPuzzles = new Set(), boardEl={classList:{add(){},remove(){}}};
const tr=(key)=>key;
const toast=(key)=>{lastToast=key};
const sBad=()=>{},sWin=()=>{},confetti=()=>{};
const saveSolved=()=>saved++,renderPuzzleList=()=>{},renderStatus=()=>statusUpdates++,updatePuzzleCompletion=()=>{};
const renderPosition=()=>{};
const setTimeout=(callback,ms)=>{ if(ms<1000) callback(); };
const applyMove=(m)=>{const result=game.move(m); if(!result) throw Error('Invalid move'); return result;};
${extract('playerCanMoveNow')}
${extract('puzzleCandidates')}
${extract('puzzleTryMove')}
${extract('puzzleSolved')}
const idx=PUZZLES.findIndex(p=>p.id==='tactic-knight-queen-fork');
if(idx<0) throw Error('Missing fork');
game=new Chess(PUZZLES[idx].fen);
puzzle={idx,movesLeft:1,busy:false,complete:false};
const first = Learning.puzzleMoves(PUZZLES[idx],game,1)[0];
puzzleTryMove({from:first.from,to:first.to});
if(!puzzle.complete || !solvedPuzzles.has(PUZZLES[idx].id) || saved!==1 || game.in_checkmate()) throw Error('Tactic was not completed');
if(playerCanMoveNow()) throw Error('Solved puzzle accepted more moves');
if(lastToast !== 'toast.tacticSolved') throw Error('Wrong tactic completion notification');
// Both non-queen promotions must be selectable as real puzzle moves.
for(const id of ['tactic-knight-underpromotion','tactic-rook-underpromotion']){
  const which=PUZZLES.findIndex(p=>p.id===id);
  game=new Chess(PUZZLES[which].fen);
  puzzle={idx:which,movesLeft:1,busy:false,complete:false};
  const expected=Learning.puzzleMoves(PUZZLES[which],game,1)[0];
  // A queen is a legal chess promotion here, but not the lesson's target move.
  puzzleTryMove({from:expected.from,to:expected.to,promotion:'q'});
  if(puzzle.complete || game.fen()!==PUZZLES[which].fen)throw Error('Unwanted queen promotion accepted');
  puzzleTryMove({from:expected.from,to:expected.to,promotion:expected.promotion});
  if(!puzzle.complete || !solvedPuzzles.has(id))throw Error('Underpromotion failed: '+id);
}
// Run the actual puzzle interaction for every one-move challenge and mate.
let checkedTactics=0, checkedMateOnes=0;
for(let i=0;i<PUZZLES.length;i++){
  const current=PUZZLES[i];
  if(current.objective!=='tactic' && current.mateIn!==1)continue;
  game=new Chess(current.fen);
  puzzle={idx:i,movesLeft:1,busy:false,complete:false};
  const chosen=Learning.puzzleMoves(current,game,1)[0];
  puzzleTryMove({from:chosen.from,to:chosen.to,promotion:chosen.promotion});
  if(!puzzle.complete || !solvedPuzzles.has(current.id))throw Error('UI did not complete '+current.id);
  if(current.objective==='tactic')checkedTactics++;else checkedMateOnes++;
}
if(checkedTactics!==38 || checkedMateOnes!==27)throw Error('Incomplete one-move coverage');
`,playCtx);
console.log(`PASS: ${catalog.length} puzzles, 38 tactical/rules challenges, no direct/mirror/mate-end duplicates, all translations, progress reset, list filters, tactic completion`);

'use strict';
// Check that titles, ideas, mate lines and named supporting pieces agree.
// Called from the regular course regression suite. No external chess engine.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
for (const file of ['js/chess.js', 'js/puzzles.js', 'js/puzzle_en.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename:file});
}
const {Chess, PUZZLES, PUZZLE_EN} = vm.runInContext(
  '({Chess, PUZZLES, PUZZLE_EN})', context);
const canonical = JSON.parse(fs.readFileSync(path.join(__dirname, 'puzzle_catalog.json'), 'utf8'));
const entries = canonical.puzzles;
assert.equal(entries.length, 80);
assert.equal(PUZZLES.length, 80);
assert.equal(Object.keys(PUZZLE_EN).length, 80);
const byId = new Map(entries.map(p=>[p.id,p]));
assert.equal(byId.size, 80);

function checkmateMoves(board) {
  return board.moves().filter(san => {
    board.move(san);
    const checkmate = board.in_checkmate();
    board.undo();
    return checkmate;
  });
}
function mateInTwoStarts(board) {
  const result=[];
  for (const first of board.moves()) {
    board.move(first);
    if (board.in_checkmate() || board.in_draw()) {
      board.undo();
      continue;
    }
    let succeeds = true;
    const defenders = board.moves();
    if (!defenders.length) succeeds = false;
    for (const reply of defenders) {
      board.move(reply);
      if (!checkmateMoves(board).length) succeeds = false;
      board.undo();
      if (!succeeds) break;
    }
    board.undo();
    if (succeeds) result.push(first);
  }
  return result;
}
function removeWhiteKnight(board) {
  let removed = 0;
  for(const rank of '12345678') for(const file of 'abcdefgh') {
    const square = file + rank, piece=board.get(square);
    if(piece && piece.color === 'w' && piece.type === 'n') {
      board.remove(square);
      removed++;
    }
  }
  assert.ok(removed>0, 'expected at least one white knight');
}
let matesOneChecked=0;
for (let i=0;i<entries.length;i++) {
  const p=entries[i], actual=PUZZLES[i];
  const {en,...expected}=p;
  assert.equal(JSON.stringify(actual),JSON.stringify(expected),p.id+' generated Japanese catalog differs');
  assert.equal(JSON.stringify(PUZZLE_EN[p.id]),JSON.stringify([en.title,en.idea]),p.id+' generated English text differs');
  assert.ok(p.title && p.idea && en.title && en.idea,p.id+' missing copy');
  const board=new Chess(p.fen);
  assert.ok(board.validate_fen(p.fen).valid,p.id+' invalid FEN');
  assert.equal(board.turn(),p.turn,p.id+' side to move');
  if (p.objective==='mate' && p.mateIn===1) {
    assert.deepEqual([...new Set(checkmateMoves(board))].sort(),
      [...new Set(p.solutions)].sort(),p.id+' wrong one-move checkmates');
    matesOneChecked++;
  }
}
assert.equal(matesOneChecked,27);

// Any chessmate attributed to a *supporting knight* must fail without it.
// Merely displaying a knight on the board does not count as cooperation.
for (const id of [
  'puzzle-016', 'puzzle-027', 'mate-queen-knight-cover', 'mate-rook-knight-coordination'
]) {
  const p=byId.get(id), withKnight=new Chess(p.fen);
  for (const san of p.solutions) {
    const game=new Chess(p.fen);
    assert.equal(game.move(san).san,san,id+' illegal candidate');
    assert.ok(game.in_checkmate(),id+' alleged checkmate is not mate');
    const withoutKnight=new Chess(p.fen);
    removeWhiteKnight(withoutKnight);
    const attempt=withoutKnight.move(san);
    assert.ok(attempt && !withoutKnight.in_checkmate(),
      id+' knight is decorative for '+san);
  }
}

// Check the *meaning* of named supporting pieces in one-move mates.
// A legal move and an accurate title are different properties: removing
// the credited helper must make the SAME mating move cease to be checkmate.
// This counterfactual is only a motif test, not a new legal puzzle position.
const supportPieceNames = {
  b: {ja:/ビショップ/,en:/bishop/i},
  n: {ja:/ナイト/,en:/knight/i},
  p: {ja:/ポーン/,en:/pawn/i},
  r: {ja:/ルーク/,en:/rook/i},
};
const supportMotifs = [
  ['puzzle-007', 'b2', 'b', ['Qg7#']],
  ['puzzle-008', 'b2', 'b', ['Qd8#', 'Qc4#']],
  ['puzzle-017', 'a7', 'r', ['Rb8#']],
  ['puzzle-025', 'h6', 'p', ['Qg7#']],
  // Only Qg7# relies on the supporting rook: the other queen mates do not.
  ['puzzle-026', 'a7', 'r', ['Qg7#']],
  ['mate-bishop-corner-mate', 'g1', 'r', ['Bf6#']],
  ['mate-rook-bishop-wall', 'd6', 'b', ['Rf8#']],
  ['mate-two-bishops-king', 'f3', 'b', ['Kb6#']],
  ['mate-pawn-capture-mate', 'e7', 'n', ['fxg7#']],
  ['mate-pawn-capture-mate', 'g1', 'r', ['fxg7#']],
  ['mate-two-knights-final', 'h6', 'n', ['Ne6#']],
];
let supportingMateChecks=0;
for (const [id, square, type, sans] of supportMotifs) {
  const p=byId.get(id);
  assert.ok(p && p.objective==='mate' && p.mateIn===1, id+' missing one-move mate');
  const names=supportPieceNames[type];
  assert.match(p.idea,names.ja,id+' Japanese hint stopped naming its helper');
  assert.match(p.en.idea,names.en,id+' English hint stopped naming its helper');
  const board=new Chess(p.fen);
  const helper=board.get(square);
  assert.ok(helper && helper.type===type && helper.color==='w',
    id+' named helper missing at '+square);
  for (const san of sans) {
    assert.ok(p.solutions.includes(san), id+' solution removed: '+san);
    const actual=new Chess(p.fen);
    assert.ok(actual.move(san) && actual.in_checkmate(), id+' expected mate '+san);
    const without=new Chess(p.fen);
    without.remove(square);
    // Its SAN suffix may change from # to + or disappear after removal.
    const tryMove=without.move(san.replace(/[+#]+$/,''));
    assert.ok(tryMove && !without.in_checkmate(),
      id+' supporting '+type+' at '+square+' is decorative for '+san);
    supportingMateChecks++;
  }
}

// The formerly faulty "Pony's Ambush": the knight on b5 guards a7.
{
  const p=byId.get('mate-rook-knight-coordination');
  assert.equal(p.theme,'knight');
  assert.equal(p.solutions.join(' '),'Rf8#');
  assert.ok(/a7/.test(p.idea) && /a7/.test(p.en.idea));
  const board=new Chess(p.fen);
  assert.equal(board.get('b5').type,'n');
  const noKnight=new Chess(p.fen);
  noKnight.remove('b5');
  assert.equal(noKnight.move('Rf8#').san,'Rf8+');
  assert.deepEqual([...noKnight.moves()],['Ka7']);
}

// "A Royal Pony Walk": the knight on g7 rules out ...Ke8; a single
// king move uncovers the queen's diagonal and forces Qd8# against ALL replies.
{
  const p=byId.get('mate-queen-knight-endgame');
  assert.equal(p.theme,'knight');
  assert.equal(p.mateIn,2);
  assert.deepEqual(mateInTwoStarts(new Chess(p.fen)),['Kg6']);
  assert.deepEqual([...checkmateMoves(new Chess(p.fen))],[]);
  const board=new Chess(p.fen), knightBoard=new Chess(p.fen);
  assert.equal(board.get('g7').type,'n');
  const initial=p.fen+'|2';
  assert.equal(p.continuations[initial].join(' '),'Kg6');
  board.move('Kg6');
  const replies=board.moves();
  assert.deepEqual([...replies].sort(),['Kg8','a2'].sort());
  for (const reply of replies) {
    board.move(reply);
    assert.deepEqual([...checkmateMoves(board)],['Qd8#']);
    assert.equal(p.continuations[board.fen()+'|1'].join(' '),'Qd8#');
    board.undo();
  }
  removeWhiteKnight(knightBoard);
  assert.ok(!mateInTwoStarts(knightBoard).includes('Kg6'),
    'King-led two-move mate must depend on the knight');
  knightBoard.move('Kg6');
  assert.ok(knightBoard.moves().includes('Ke8'),
    'Without the knight, Black can escape toward e8');
}

// This problem removes the DEFENDER, rather than opening an already-open
// bishop diagonal. The knight-like animal "Owl" is an actual bishop.
{
  const p=byId.get('tactic-defender-bishop-2');
  const board=new Chess(p.fen);
  assert.equal(board.get('a4').type,'b');
  assert.equal(board.get('g4').type,'b');
  assert.equal(board.get('d7').type,'r');
  assert.ok(board.moves().includes('Bxd7'),'bishop already attacks d7');
  const before=new Chess(p.fen);
  before.move('Bxd7');
  assert.ok(before.moves().includes('Bxd7'),'black bishop can recapture before defender removal');
  assert.equal(board.move('hxg4').captured,'b');
  assert.equal(board.get('g4').color,'w');
  assert.ok(/守り/.test(p.idea) && /defend/i.test(p.en.idea));
}

// A rook finishes the three-move mate, but the first solution is a KING move.
// The new heading must not incorrectly imply an immediate rook move.
{
  const p=byId.get('puzzle-035');
  assert.ok(p.title.includes('あと一歩') && /rook mate/i.test(p.en.title));
  assert.equal(p.mateIn,3);
  assert.equal(new Chess(p.fen).move(p.solutions[0]).piece,'k');
  assert.ok(Object.values(p.continuations).some(sans=>
    sans.some(san=>/^R.*#$/.test(san))),'rook mating finish is absent');
}
console.log(JSON.stringify({
  puzzles:entries.length,oneMoveMates:matesOneChecked,
  supportedKnightMateChecks:4,supportingMateChecks,kingKnightMateIn2:'PASS',
  defenderExplanation:'PASS',rookTitle:'PASS',bilingualAssets:'PASS'
}));

'use strict';
// Exercise real application callbacks with deferred engine/timer replies and real Chess positions.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({ assert, console });
for (const file of ['chess', 'learning', 'puzzles']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', file + '.js'), 'utf8'), context);
}
const app = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
for (const name of ['maybeCpuMove', 'requestHint', 'playerCanMoveNow', 'puzzleCandidates', 'puzzleTryMove']) {
  const match = app.match(new RegExp('^function ' + name + '\\([^]*?^}', 'm'));
  assert.ok(match, name);
  vm.runInContext(match[0], context);
}
vm.runInContext(`
let game = new Chess(), mode = 'play', cpuThinking = false, hintThinking = false;
let settings = {opponent:'cpu', playerColor:'b', level:1};
let puzzle = {busy:false}, hintSquares = [], selected = null, legalTargets = [];
let callback, timer, renders = 0, moves = 0, notices = 0;
const Engine = {chooseMove:(_, __, cb) => callback = cb, bestMove:(_, cb) => callback = cb};
const I18N = {language:'en'}, is3D = () => true;
const tr = key => key, pieceName = () => 'piece', explainHintMove = () => '';
const renderStatus = () => renders++, renderPosition = () => renders++;
const renderAll = () => renders++, renderPuzzleGoal = () => renders++;
const toast = () => notices++, sBad = () => {}, puzzleSolved = () => {};
const boardEl = {classList:{add(){}, remove(){}}};
const setTimeout = cb => { timer = cb; };
const applyMove = m => { const move = game.move(m); assert.ok(move); moves++; return move; };

// A late CPU reply cannot move in a replacement game, even at exactly the same FEN.
maybeCpuMove();
const oldCpu = callback;
game = new Chess(); cpuThinking = false;
maybeCpuMove();
oldCpu({from:'e2', to:'e4'});
assert.equal(moves, 0); assert.equal(cpuThinking, true);
callback({from:'e2', to:'e4'});
assert.equal(moves, 1); assert.equal(cpuThinking, false);

// A normal hint is discarded if the player moves before it finishes.
settings.opponent = 'human';
requestHint();
game.move('e5');
callback({from:'e7', to:'e5', piece:'p'});
assert.equal(hintSquares.length, 0); assert.equal(hintThinking, false);

// An older game's callback cannot clear a newer game's pending hint.
requestHint(); const oldHint = callback;
game = new Chess(); hintThinking = false;
requestHint();
oldHint({from:'g1', to:'f3', piece:'n'});
assert.equal(hintThinking, true); assert.equal(hintSquares.length, 0);
callback({from:'e2', to:'e4', piece:'p'});
assert.equal(hintThinking, false); assert.equal(hintSquares.join(','), 'e2,e4');

const idx = PUZZLES.findIndex(p => p.title === 'ルークのまちて');
assert.ok(idx >= 0);
function startPuzzle() {
  mode = 'puzzle'; game = new Chess(PUZZLES[idx].fen);
  puzzle = {idx, movesLeft:2, busy:false}; cpuThinking = false;
}
startPuzzle();
const originalFen = game.fen();
puzzleTryMove({from:'f6', to:'e6'}); // Legal, but not a mate in two.
assert.equal(game.fen(), originalFen);
puzzleTryMove({from:'a1', to:'h1'});
assert.equal(puzzle.busy, true);
const oldDefense = timer;
startPuzzle();
const beforeMoves = moves, beforeNotices = notices;
oldDefense();
assert.equal(game.fen(), originalFen); assert.equal(moves, beforeMoves);
assert.equal(notices, beforeNotices); assert.equal(puzzle.busy, false);

// The current reply still runs and returns control to the player.
puzzleTryMove({from:'a1', to:'h1'}); timer();
assert.equal(game.turn(), PUZZLES[idx].turn); assert.equal(puzzle.busy, false);
assert.equal(puzzle.movesLeft, 1); assert.ok(puzzleCandidates().length);
console.log('PASS: stale CPU/hint/defense callbacks, wrong move, current defense');
`, context);

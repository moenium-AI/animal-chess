'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');
const context = vm.createContext({ console, performance });
for (const name of ['chess', 'learning', 'puzzles']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', name + '.js'), 'utf8'), context);
}
context.assert = assert;
vm.runInContext(`
assert.equal(Learning.moveLabel(null, 0), '1.');
assert.equal(Learning.moveLabel(null, 1), '1…');
const blackStart = '8/4k3/8/4PK2/8/7R/r7/8 b - - 0 37';
assert.deepEqual(Array.from({length: 4}, (_, i) => Learning.moveLabel(blackStart, i)), ['37…', '38.', '38…', '39.']);
assert.equal(new Chess(blackStart).header().FEN, blackStart);
let states = 0, edges = 0, maxLookupMs = 0;
for (const p of PUZZLES) {
  const visited = new Set();
  function walk(game, n) {
    const key = game.fen() + '|' + n;
    if (visited.has(key)) return;
    visited.add(key);
    const before = game.fen(), history = game.history().join(' ');
    const start = performance.now();
    const choices = Learning.puzzleMoves(p, game, n);
    maxLookupMs = Math.max(maxLookupMs, performance.now() - start);
    assert.deepEqual(choices.map(m => m.san).sort(), [...p.continuations[key]].sort());
    assert.equal(game.fen(), before);
    assert.equal(game.history().join(' '), history);
    for (const m of choices) {
      assert.ok(game.move(m)); edges++;
      if (p.objective === 'tactic') {
        assert.equal(n, 1);
        assert.ok(!game.in_checkmate());
      } else if (!game.in_checkmate()) {
        assert.ok(n > 1 && !game.game_over());
        for (const reply of game.moves({verbose:true})) {
          game.move(reply); walk(game, n - 1); game.undo();
        }
      }
      game.undo();
    }
  }
  walk(new Chess(p.fen), p.mateIn);
  assert.equal(visited.size, Object.keys(p.continuations).length);
  states += visited.size;
}
assert.throws(() => Learning.puzzleMoves({continuations:{}}, new Chess(), 1));
console.log(JSON.stringify({puzzles:PUZZLES.length, states, winningEdges:edges, maxLookupMs:Math.round(maxLookupMs*100)/100}));
`, context);

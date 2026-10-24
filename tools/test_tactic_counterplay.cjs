'use strict';
// Review every legal immediate defensive reply, not just the intended shape.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/chess.js'), 'utf8'), ctx);
const Chess = vm.runInContext('Chess', ctx);
const problems = JSON.parse(fs.readFileSync(path.join(__dirname, 'puzzle_catalog.json'), 'utf8')).puzzles.filter(p => p.objective === 'tactic');
const byId = new Map(problems.map(p => [p.id, p]));
function variation(id, first, black, white, captured) {
  const p = byId.get(id);
  assert.ok(p && p.solutions.includes(first), 'missing solution '+id+': '+first);
  const g = new Chess(p.fen);
  assert.ok(g.move(first), first);
  const defense = g.move(black);
  assert.ok(defense, 'missing defensive move '+black);
  const reply = g.move(white);
  assert.ok(reply && reply.captured === captured, id+': '+black+' must be answered by '+white);
}
// Regression tests for two previously unsound puzzles.
variation('tactic-fork-pawn-major', 'd5', 'Qxd5', 'exd5', 'q');
variation('tactic-fork-pawn-major', 'd5', 'Rxe4', 'dxc6', 'q');
variation('tactic-defender-bishop', 'Bxe6', 'Rxd2', 'Kxd2', 'r');
variation('tactic-defender-bishop', 'Bxe6', 'Rc8+', 'Bxc8', 'r');
let solutions = 0, replies = 0;
const unsafe = [];
for (const p of problems) for (const san of p.solutions) {
  const g = new Chess(p.fen);
  assert.ok(g.move(san), p.id+': '+san);
  solutions++;
  for (const m of g.moves({verbose:true})) {
    g.move(m);
    replies++;
    if (g.in_checkmate()) unsafe.push(p.id+' '+san+' '+m.san+': mate');
    if (m.captured && 'nbrq'.includes(m.captured)) {
      const canRecapture = g.moves({verbose:true}).some(r => r.captured && r.to === m.to);
      if (!canRecapture) unsafe.push(p.id+' '+san+' '+m.san+': unrecaptured '+m.captured);
    }
    g.undo();
  }
}
assert.deepEqual(unsafe, [], 'tactical counterplay needs review: '+unsafe.join('; '));
console.log('PASS: '+solutions+' tactical answers, '+replies+' opponent replies, no immediate mate or unrecaptured minor/major capture');

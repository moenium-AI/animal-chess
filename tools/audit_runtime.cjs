// Read-only cross-check of the actual browser chess rules and puzzle solver.
// Usage: node tools/audit_runtime.cjs [--puzzles]
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ setTimeout, console });
for (const name of ['chess', 'engine', 'lessons', 'games', 'puzzles']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'js', `${name}.js`), 'utf8'), context);
}
const result = vm.runInContext(`(() => {
  let plies = 0;
  const errors = [];
  for (const item of [...LESSONS, ...FAMOUS_GAMES]) {
    const game = new Chess(item.fen || undefined);
    for (const [index, entry] of item.moves.entries()) {
      const move = game.move(entry.san);
      if (!move || move.san !== entry.san) errors.push({id: item.id, ply: index + 1, san: entry.san});
      plies++;
    }
  }
  return { plies, errors, puzzles: PUZZLES.length };
})()`, context);
console.log(JSON.stringify(result));
if (result.errors.length) process.exitCode = 1;
if (process.argv.includes('--puzzles')) {
  for (let i = 0; i < result.puzzles; i++) {
    const start = performance.now();
    const outcome = vm.runInContext(`(() => {
      const p = PUZZLES[${i}], game = new Chess(p.fen);
      const before = game.fen();
      const actual = Engine.mateMoves(game, p.mateIn).map(m => m.san).sort();
      return { index: ${i}, title: p.title, actual, expected: [...p.solutions].sort(), unchanged: game.fen() === before && game.history().length === 0 };
    })()`, context, { timeout: 60000 });
    outcome.elapsedMs = Math.round(performance.now() - start);
    outcome.ok = outcome.unchanged && JSON.stringify(outcome.actual) === JSON.stringify(outcome.expected);
    console.log(JSON.stringify(outcome));
    if (!outcome.ok) process.exitCode = 1;
  }
}

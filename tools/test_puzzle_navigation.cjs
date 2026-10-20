'use strict';
// Fast, browser-independent boundary tests for the actual navigation functions.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const app = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
const get = name => {
  const match = app.match(new RegExp('^function ' + name + '\\([^]*?^}', 'm'));
  assert.ok(match, `missing ${name}`);
  return match[0];
};
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/puzzles.js'), 'utf8'), ctx);
vm.runInContext(`
let puzzleTheme='all', puzzleLevel='all', solvedPuzzles=new Set();
${get('puzzleMatchesFilter')}
${get('nextPuzzleAfter')}
`,ctx);
const value = cmd => JSON.parse(vm.runInContext(`JSON.stringify(${cmd})`,ctx));
assert.deepEqual(value('nextPuzzleAfter(12)'), {index:13,outsideFilter:false});
vm.runInContext('solvedPuzzles.add(PUZZLES[13].id)',ctx);
assert.deepEqual(value('nextPuzzleAfter(12)'), {index:14,outsideFilter:false});
vm.runInContext('puzzleLevel=1',ctx);
assert.deepEqual(value('nextPuzzleAfter(26)'), {index:27,outsideFilter:true});
assert.deepEqual(value('nextPuzzleAfter(25)'), {index:26,outsideFilter:false});
vm.runInContext('puzzleLevel="tactic"',ctx);
assert.deepEqual(value('nextPuzzleAfter(0)'), {index:1,outsideFilter:true});
assert.deepEqual(value('nextPuzzleAfter(42)'), {index:43,outsideFilter:false});
vm.runInContext('puzzleLevel="all";puzzleTheme="fork"',ctx);
assert.deepEqual(value('nextPuzzleAfter(42)'), {index:43,outsideFilter:true});
assert.equal(value('nextPuzzleAfter(79)'),null);
assert.equal(value('nextPuzzleAfter(-1)'),null);
assert.equal(value('nextPuzzleAfter(80)'),null);
// Already-solved problems earlier in the list may remain: never wrap backward.
vm.runInContext('solvedPuzzles=new Set(PUZZLES.slice(69).map(p=>p.id))',ctx);
assert.equal(value('nextPuzzleAfter(68)'),null);
vm.runInContext('solvedPuzzles=new Set(PUZZLES.map(p=>p.id))',ctx);
assert.equal(value('nextPuzzleAfter(12)'),null);
console.log('PASS: next-puzzle rules, solved skipping, filters, cross-section transitions, catalog end and no wrap');

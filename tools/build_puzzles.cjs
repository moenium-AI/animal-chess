#!/usr/bin/env node
'use strict';
// Deterministic offline build from a single bilingual puzzle catalog.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname,'puzzle_catalog.json'),'utf8'));
assert.equal(catalog.formatVersion,1);
assert.ok(Array.isArray(catalog.puzzles) && catalog.puzzles.length > 0);
const ids = new Set(),fens = new Set();
const puzzles=[], en={};
for(const entry of catalog.puzzles){
  assert.ok(typeof entry.id === 'string' && /^[a-z0-9-]+$/.test(entry.id));
  assert.ok(!ids.has(entry.id),`Duplicate ID: ${entry.id}`);
  assert.ok(!fens.has(entry.fen),`Duplicate FEN: ${entry.id}`);
  assert.ok(['mate','tactic'].includes(entry.objective));
  assert.ok(Number.isInteger(entry.mateIn)&&entry.mateIn>=1&&entry.mateIn<=3);
  assert.ok(Array.isArray(entry.solutions)&&entry.solutions.length>0);
  assert.ok(entry.en?.title && entry.en?.idea);
  ids.add(entry.id);fens.add(entry.fen);
  const {en:translation,...puzzle}=entry;
  puzzles.push(puzzle);
  en[entry.id]=[translation.title,translation.idea];
}
function build(output, value, comment){
  return `${comment}\nconst ${output} = ${JSON.stringify(value,null,1)};\n`;
}
const files=[
 ['js/puzzles.js',build('PUZZLES',puzzles,'// Auto-generated from tools/puzzle_catalog.json. Do not edit directly.')],
 ['js/puzzle_en.js',build('PUZZLE_EN',en,'// Auto-generated translations from tools/puzzle_catalog.json. Do not edit directly.')],
];
if(process.argv.includes('--check')){
  for(const [file,desired] of files){
    assert.equal(fs.readFileSync(path.join(root,file),'utf8'),desired,`Regenerate with node tools/build_puzzles.cjs: ${file}`);
  }
}else{
  for(const [file,desired] of files){
    const to=path.join(root,file),temp=to+'.tmp-'+process.pid;
    try {fs.writeFileSync(temp,desired,{encoding:'utf8',flag:'wx'});fs.renameSync(temp,to);}
    finally {if(fs.existsSync(temp))fs.unlinkSync(temp);}
  }
}
console.log(`Puzzle catalog ${process.argv.includes('--check')?'checked':'built'}: ${puzzles.length} problems`);

'use strict';
// Independent exhaustive bounded minimax check against the bundled Chess rules.
// Verifies that every advertised mate is the shortest forceable mate and
// that all first moves and all defense branches are in the stored solution tree.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/chess.js'),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/puzzles.js'),'utf8'),ctx);
const data=JSON.parse(vm.runInContext('JSON.stringify(PUZZLES)',ctx));
const Chess=vm.runInContext('Chess',ctx);
const memo=new Map();
let calls=0;
function hasMate(game,n){
  const key=game.fen()+'|'+n;
  if(memo.has(key)) return memo.get(key);
  calls++;
  for(const move of game.moves({verbose:true})){
    game.move(move);
    let ok=game.in_checkmate();
    if(!ok&&n>1&&!game.game_over()){
      ok=true;
      for(const reply of game.moves({verbose:true})){
        game.move(reply);
        if(!hasMate(game,n-1))ok=false;
        game.undo();
        if(!ok)break;
      }
    }
    game.undo();
    if(ok){memo.set(key,true);return true;}
  }
  memo.set(key,false);
  return false;
}
function getMateMoves(game,n){
  const result=[];
  for(const move of game.moves({verbose:true})){
    game.move(move);
    let ok=game.in_checkmate();
    if(!ok&&n>1&&!game.game_over()){
      ok=true;
      for(const reply of game.moves({verbose:true})){
        game.move(reply);
        if(!hasMate(game,n-1))ok=false;
        game.undo();
        if(!ok)break;
      }
    }
    game.undo();
    if(ok)result.push(move.san);
  }
  return result.sort();
}
let mateCount=0,validatedStates=0;
for(const p of data){
  if(p.objective!=='mate')continue;
  mateCount++;
  const game=new Chess(p.fen);
  for(let n=1;n<p.mateIn;n++)assert.deepEqual(getMateMoves(game,n),[],`Mate shorter than stated: ${p.id}`);
  assert.deepEqual(getMateMoves(game,p.mateIn),[...p.solutions].sort(),`Wrong mate first moves: ${p.id}`);
  const seen=new Set();
  function walk(remaining){
    const key=game.fen()+'|'+remaining;
    if(seen.has(key))return;
    seen.add(key);validatedStates++;
    const correct=getMateMoves(game,remaining);
    assert.deepEqual(correct,[...p.continuations[key]].sort(),`Wrong continuation: ${p.id}: ${key}`);
    for(const san of correct){
      game.move(san);
      if(!game.in_checkmate()){
        for(const reply of game.moves({verbose:true})){
          game.move(reply);walk(remaining-1);game.undo();
        }
      }
      game.undo();
    }
  }
  walk(p.mateIn);
  assert.equal(seen.size,Object.keys(p.continuations).length,p.id);
}
console.log(JSON.stringify({checkedMates:mateCount,validatedStates,examinedPositions:calls,cacheEntries:memo.size}));

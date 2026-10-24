// CPU chess search in an isolated Worker. No network calls or UI access.
'use strict';
importScripts('chess.js?v=2', 'lessons.js?v=18', 'engine.js?v=18');
self.onmessage = event => {
  const { id, kind, fen, level } = event.data || {};
  if (!Number.isInteger(id) || typeof fen !== 'string') return;
  try {
    const done = move => self.postMessage({id, move: move ? {from:move.from,to:move.to,promotion:move.promotion,piece:move.piece}:null});
    if (kind === 'choose') Engine.chooseMove(fen, level, done);
    else if (kind === 'hint') Engine.bestMove(fen, done);
    else self.postMessage({id, error:'unknown job'});
  } catch (e) { self.postMessage({id, error:String(e)}); }
};

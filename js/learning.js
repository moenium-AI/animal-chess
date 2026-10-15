// Pure helpers shared by learning UI and regression checks.
const Learning = (() => {
  function moveLabel(baseFen, ply) {
    const fields = (baseFen || new Chess().fen()).split(/\s+/);
    const offset = ply + (fields[1] === 'b' ? 1 : 0);
    return (Number(fields[5]) + Math.floor(offset / 2)) + (offset % 2 ? '…' : '.');
  }

  function puzzleMoves(puzzle, game, remaining) {
    const sans = puzzle.continuations && puzzle.continuations[game.fen() + '|' + remaining];
    if (!Array.isArray(sans) || !sans.length) throw new Error('Missing puzzle continuation');
    const legal = game.moves({ verbose: true });
    return sans.map(san => {
      const move = legal.find(m => m.san === san);
      if (!move) throw new Error('Invalid puzzle continuation');
      return move;
    });
  }
  return { moveLabel, puzzleMoves };
})();

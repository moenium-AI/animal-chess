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
  // Versioned progress stores only known lesson IDs and two stable states.
  // Malformed/foreign localStorage data never becomes display HTML.
  function restoreProgress(raw, ids) {
    let parsed;
    try { parsed = JSON.parse(raw); } catch (_) { return {}; }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const allowed = new Set(ids);
    const out = {};
    for (const [id, value] of Object.entries(parsed)) {
      if (allowed.has(id) && (value === 'studied' || value === 'mastered'))
        out[id] = value;
    }
    return out;
  }
  function markProgress(current, id, state) {
    if (state !== 'studied' && state !== 'mastered') throw new Error('Invalid learning state');
    if (current[id] === 'mastered') return current;
    return { ...current, [id]: state };
  }
  // Grade from currently LEGAL moves without modifying the lesson position.
  // Only the exact SAN of the demonstrated answer earns mastery; different
  // legal alternatives are not globally judged bad chess moves.
  function practiceMove(game, expectedSan, attempt) {
    const moves = game.moves({ verbose: true });
    const expected = moves.find(m => m.san === expectedSan);
    if (!expected) throw new Error('Invalid lesson practice answer');
    const actual = moves.find(m => m.from === attempt.from && m.to === attempt.to &&
      (m.promotion || null) === (attempt.promotion || null));
    return { legal: !!actual, correct: !!actual && actual.san === expected.san };
  }
  // Curated placement by educational category: early critical decision for
  // tactics/endgames, development choice on move 3 for opening examples.
  // This tests reproduction of the shown variation, NOT objective best play.
  function legacyPly(lesson) {
    if (!lesson || !['opening','combo','endgame'].includes(lesson.cat) || !Array.isArray(lesson.moves) || !lesson.moves.length)
      throw new Error('Invalid legacy lesson for practice');
    return lesson.cat === 'opening' ? Math.min(4, lesson.moves.length - 1) : 0;
  }
  return { moveLabel, puzzleMoves, restoreProgress, markProgress, practiceMove, legacyPly };
})();

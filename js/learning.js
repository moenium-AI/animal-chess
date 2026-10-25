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
  // Understanding checks are independent of the existing studied/mastered record.
  // Never trust persisted IDs, answer values, or unexpected object properties.
  function restoreReasoningProgress(raw, ids) {
    let parsed;
    try { parsed = JSON.parse(raw); } catch (_) { return {}; }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out = {};
    for (const id of ids) {
      if (!Object.prototype.hasOwnProperty.call(parsed, id)) continue;
      const progress = parsed[id];
      if (!progress || typeof progress !== 'object' || Array.isArray(progress)) continue;
      const valid = {};
      if (progress.why === true) valid.why = true;
      if (progress.defense === true) valid.defense = true;
      if (Object.keys(valid).length) out[id] = valid;
    }
    return out;
  }
  function markReasoningProgress(current, id, kind) {
    if (!['why', 'defense'].includes(kind) || typeof id !== 'string')
      throw new Error('Invalid reasoning progress');
    if (current[id] && current[id][kind] === true) return current;
    return { ...current, [id]: { ...(current[id] || {}), [kind]: true } };
  }
  function gradeReasoning(question, selectedIndex) {
    if (!question || !Number.isInteger(question.answer) ||
      !Number.isInteger(selectedIndex) || selectedIndex < 0 ||
      selectedIndex >= 3 || question.answer < 0 || question.answer >= 3)
      throw new Error('Invalid reasoning choice');
    return selectedIndex === question.answer;
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
  return { moveLabel, puzzleMoves, restoreProgress, markProgress, restoreReasoningProgress, markReasoningProgress, gradeReasoning, practiceMove, legacyPly };
})();

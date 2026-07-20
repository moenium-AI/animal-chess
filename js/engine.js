// シンプルなチェスAIエンジン(アルファベータ探索 + 反復深化)
// レベル1〜5の強さ調整、ヒント探索、パズル用メイトソルバーを提供する。
const Engine = (() => {
  const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
  const MATE = 100000;
  const INF = 1000000;
  const TIMEOUT = { timeout: true };

  // Piece-Square Tables("Simplified Evaluation Function" 由来)
  // 先頭行が8ランク目(a8..h8)。白はそのまま、黒はミラーして参照する。
  const PST = {
    p: [
       0,  0,  0,  0,  0,  0,  0,  0,
      50, 50, 50, 50, 50, 50, 50, 50,
      10, 10, 20, 30, 30, 20, 10, 10,
       5,  5, 10, 25, 25, 10,  5,  5,
       0,  0,  0, 20, 20,  0,  0,  0,
       5, -5,-10,  0,  0,-10, -5,  5,
       5, 10, 10,-20,-20, 10, 10,  5,
       0,  0,  0,  0,  0,  0,  0,  0,
    ],
    n: [
      -50,-40,-30,-30,-30,-30,-40,-50,
      -40,-20,  0,  0,  0,  0,-20,-40,
      -30,  0, 10, 15, 15, 10,  0,-30,
      -30,  5, 15, 20, 20, 15,  5,-30,
      -30,  0, 15, 20, 20, 15,  0,-30,
      -30,  5, 10, 15, 15, 10,  5,-30,
      -40,-20,  0,  5,  5,  0,-20,-40,
      -50,-40,-30,-30,-30,-30,-40,-50,
    ],
    b: [
      -20,-10,-10,-10,-10,-10,-10,-20,
      -10,  0,  0,  0,  0,  0,  0,-10,
      -10,  0,  5, 10, 10,  5,  0,-10,
      -10,  5,  5, 10, 10,  5,  5,-10,
      -10,  0, 10, 10, 10, 10,  0,-10,
      -10, 10, 10, 10, 10, 10, 10,-10,
      -10,  5,  0,  0,  0,  0,  5,-10,
      -20,-10,-10,-10,-10,-10,-10,-20,
    ],
    r: [
       0,  0,  0,  0,  0,  0,  0,  0,
       5, 10, 10, 10, 10, 10, 10,  5,
      -5,  0,  0,  0,  0,  0,  0, -5,
      -5,  0,  0,  0,  0,  0,  0, -5,
      -5,  0,  0,  0,  0,  0,  0, -5,
      -5,  0,  0,  0,  0,  0,  0, -5,
      -5,  0,  0,  0,  0,  0,  0, -5,
       0,  0,  0,  5,  5,  0,  0,  0,
    ],
    q: [
      -20,-10,-10, -5, -5,-10,-10,-20,
      -10,  0,  0,  0,  0,  0,  0,-10,
      -10,  0,  5,  5,  5,  5,  0,-10,
       -5,  0,  5,  5,  5,  5,  0, -5,
        0,  0,  5,  5,  5,  5,  0, -5,
      -10,  5,  5,  5,  5,  5,  0,-10,
      -10,  0,  5,  0,  0,  0,  0,-10,
      -20,-10,-10, -5, -5,-10,-10,-20,
    ],
    k: [
      -30,-40,-40,-50,-50,-40,-40,-30,
      -30,-40,-40,-50,-50,-40,-40,-30,
      -30,-40,-40,-50,-50,-40,-40,-30,
      -30,-40,-40,-50,-50,-40,-40,-30,
      -20,-30,-30,-40,-40,-30,-30,-20,
      -10,-20,-20,-20,-20,-20,-20,-10,
       20, 20,  0,  0,  0,  0, 20, 20,
       20, 30, 10,  0,  0, 10, 30, 20,
    ],
    // 終盤用キングテーブル(駒が少ないとき中央に出る)
    kEnd: [
      -50,-40,-30,-20,-20,-30,-40,-50,
      -30,-20,-10,  0,  0,-10,-20,-30,
      -30,-10, 20, 30, 30, 20,-10,-30,
      -30,-10, 30, 40, 40, 30,-10,-30,
      -30,-10, 30, 40, 40, 30,-10,-30,
      -30,-10, 20, 30, 30, 20,-10,-30,
      -30,-30,  0,  0,  0,  0,-30,-30,
      -50,-30,-30,-30,-30,-30,-30,-50,
    ],
  };

  // 白から見た評価値(センチポーン)
  function evaluate(game) {
    const board = game.board();
    let score = 0;
    let material = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const pc = board[r][c];
        if (pc && pc.type !== 'k') material += VAL[pc.type];
      }
    }
    const endgame = material < 2600; // クイーン+ルーク数枚以下なら終盤扱い
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const pc = board[r][c];
        if (!pc) continue;
        const idx = pc.color === 'w' ? r * 8 + c : (7 - r) * 8 + c;
        const table = pc.type === 'k' && endgame ? PST.kEnd : PST[pc.type];
        const v = VAL[pc.type] + table[idx];
        score += pc.color === 'w' ? v : -v;
      }
    }
    return score;
  }

  function sideEval(game) {
    return game.turn() === 'w' ? evaluate(game) : -evaluate(game);
  }

  function orderMoves(moves) {
    for (const m of moves) {
      let s = 0;
      if (m.captured) s += 10 * VAL[m.captured] - VAL[m.piece];
      if (m.promotion) s += VAL[m.promotion];
      m._score = s;
    }
    moves.sort((a, b) => b._score - a._score);
    return moves;
  }

  // 静止探索(取り合いだけ延長して水平線効果を軽減)
  function quiesce(game, alpha, beta, deadline) {
    if (Date.now() > deadline) throw TIMEOUT;
    const stand = sideEval(game);
    if (stand >= beta) return stand;
    if (stand > alpha) alpha = stand;
    const moves = orderMoves(game.moves({ verbose: true }).filter((m) => m.captured));
    for (const m of moves) {
      game.move(m);
      const s = -quiesce(game, -beta, -alpha, deadline);
      game.undo();
      if (s >= beta) return s;
      if (s > alpha) alpha = s;
    }
    return alpha;
  }

  function search(game, depth, alpha, beta, ply, deadline, useQuiesce) {
    if (Date.now() > deadline) throw TIMEOUT;
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return game.in_check() ? -MATE + ply : 0;
    if (depth === 0) {
      return useQuiesce ? quiesce(game, alpha, beta, deadline) : sideEval(game);
    }
    orderMoves(moves);
    let best = -INF;
    for (const m of moves) {
      game.move(m);
      const s = -search(game, depth - 1, -beta, -alpha, ply + 1, deadline, useQuiesce);
      game.undo();
      if (s > best) best = s;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }

  // ルート探索: 各手のスコアつきリストを返す(反復深化・時間打ち切りつき)
  function analyzeRoot(fen, maxDepth, timeMs, useQuiesce) {
    const game = new Chess(fen);
    const rootMoves = game.moves({ verbose: true });
    if (rootMoves.length === 0) return [];
    const deadline = Date.now() + timeMs;
    let results = rootMoves.map((m) => ({ move: m, score: 0 }));
    for (let d = 1; d <= maxDepth; d++) {
      const cur = [];
      try {
        let alpha = -INF;
        // 前回の並び順を使うと枝刈りが効く
        const ordered = results.map((r) => r.move);
        for (const m of ordered) {
          game.move(m);
          const s = -search(game, d - 1, -INF, -alpha, 1, d === 1 ? Infinity : deadline, useQuiesce);
          game.undo();
          cur.push({ move: m, score: s });
          if (s > alpha) alpha = s;
        }
      } catch (e) {
        if (e === TIMEOUT) break;
        throw e;
      }
      cur.sort((a, b) => b.score - a.score);
      results = cur;
      if (results[0].score > MATE - 100) break; // メイト発見なら十分
      if (Date.now() > deadline) break;
    }
    return results;
  }

  const LEVELS = {
    1: { depth: 1, timeMs: 400,  noise: 150, blunder: 0.4,  quiesce: false },
    2: { depth: 2, timeMs: 700,  noise: 60,  blunder: 0.15, quiesce: false },
    3: { depth: 3, timeMs: 1500, noise: 15,  blunder: 0,    quiesce: false },
    4: { depth: 4, timeMs: 2500, noise: 0,   blunder: 0,    quiesce: true },
    5: { depth: 5, timeMs: 4000, noise: 0,   blunder: 0,    quiesce: true },
  };

  // CPUの指し手を選ぶ(非同期: UI描画を待ってから計算開始)
  function chooseMove(fen, level, cb) {
    setTimeout(() => {
      const cfg = LEVELS[level] || LEVELS[3];
      const results = analyzeRoot(fen, cfg.depth, cfg.timeMs, cfg.quiesce);
      if (results.length === 0) { cb(null); return; }
      let pick;
      if (cfg.blunder > 0 && Math.random() < cfg.blunder) {
        // わざと適当な手(ただしすぐ詰まされる手はできれば避ける)
        const safe = results.filter((r) => r.score > -MATE + 1000);
        const pool = safe.length > 0 ? safe : results;
        pick = pool[Math.floor(Math.random() * pool.length)];
      } else if (cfg.noise > 0) {
        const noisy = results.map((r) => ({ move: r.move, score: r.score + (Math.random() * 2 - 1) * cfg.noise }));
        noisy.sort((a, b) => b.score - a.score);
        pick = noisy[0];
      } else {
        pick = results[0];
      }
      cb(pick.move);
    }, 50);
  }

  // ヒント(常に強めの設定で読む)
  function bestMove(fen, cb) {
    setTimeout(() => {
      const results = analyzeRoot(fen, 4, 2500, true);
      cb(results.length > 0 ? results[0].move : null);
    }, 50);
  }

  // n手以内の強制メイトになる手をすべて返す(パズル判定用)
  function mateMoves(game, n) {
    const out = [];
    const moves = game.moves({ verbose: true });
    for (const m of moves) {
      game.move(m);
      if (game.in_checkmate()) {
        out.push(m);
      } else if (n > 1 && !game.game_over()) {
        let ok = true;
        const replies = game.moves({ verbose: true });
        for (const r of replies) {
          game.move(r);
          const sub = mateMoves(game, n - 1);
          game.undo();
          if (sub.length === 0) { ok = false; break; }
        }
        if (ok) out.push(m);
      }
      game.undo();
    }
    return out;
  }

  return { chooseMove, bestMove, mateMoves, LEVELS };
})();

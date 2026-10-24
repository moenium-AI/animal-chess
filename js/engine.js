// Lightweight chess AI engine (alpha-beta search + iterative deepening). / シンプルなチェスAIエンジン（アルファベータ探索＋反復深化）。
// Provides strength levels 1–10, an opening book, endgame evaluation, hint search, and a mate solver for puzzles. / レベル1〜10、オープニングブック、終盤評価、ヒント探索、パズル用メイトソルバーを提供する。
const Engine = (() => {
  const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
  const MATE = 100000;
  const INF = 1000000;
  const TIMEOUT = { timeout: true };

  // Piece-Square Tables, based on the "Simplified Evaluation Function". / "Simplified Evaluation Function"由来の駒位置テーブル。
  // The first row is rank 8 (a8..h8); White uses it directly and Black uses a mirrored view. / 先頭行は8段目（a8..h8）。白はそのまま、黒は反転して参照する。
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
    // Endgame king table: the king should move toward the center when few pieces remain. / 終盤用キングテーブル。駒が少ないときはキングを中央へ出す。
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

  // Middlegame king safety: missing pawn cover or a king in the center is dangerous. / 中盤のキングの安全性。ポーンの盾が欠けたり中央にいるキングは危険。
  // Return danger (larger means more dangerous) to discourage reckless attacks with an exposed king. / 危険度（大きいほど危険）を返し、露出したキングでの無謀な攻めを抑える。
  function kingDanger(board, kr, kc, color) {
    const dir = color === 'w' ? -1 : 1; // Forward direction: White moves toward lower rows. / 前方向。白は上（行が減る）。
    let danger = 0;
    for (let dc = -1; dc <= 1; dc++) {
      const c = kc + dc;
      if (c < 0 || c > 7) { danger += 8; continue; } // No pawn shield can be built on the board edge. / 盤端では盾を作れない。
      let shield = false;
      for (let step = 1; step <= 2; step++) {
        const r = kr + dir * step;
        if (r < 0 || r > 7) break;
        const pc = board[r][c];
        if (pc && pc.type === 'p' && pc.color === color) { shield = true; break; }
      }
      if (!shield) danger += 16; // No shield pawn on this file. / この列に盾ポーンがない。
    }
    if (kc >= 2 && kc <= 5) danger += 14; // A king staying in the center is dangerous. / 中央に留まるキングは危険。
    return danger;
  }

  // Evaluation from White's perspective, in centipawns. / 白から見た評価値（センチポーン）。
  function evaluate(game) {
    const board = game.board();
    let score = 0;
    let material = 0;
    let wMat = 0, bMat = 0;
    const kings = { w: null, b: null };
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const pc = board[r][c];
        if (!pc) continue;
        if (pc.type === 'k') { kings[pc.color] = [r, c]; continue; }
        material += VAL[pc.type];
        if (pc.color === 'w') wMat += VAL[pc.type]; else bMat += VAL[pc.type];
      }
    }
    const endgame = material < 2600; // Treat queen plus a few rooks or less as an endgame. / クイーン＋ルーク数枚以下なら終盤扱い。
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const pc = board[r][c];
        if (!pc) continue;
        const idx = pc.color === 'w' ? r * 8 + c : (7 - r) * 8 + c;
        const table = pc.type === 'k' && endgame ? PST.kEnd : PST[pc.type];
        const v = VAL[pc.type] + table[idx];
        score += pc.color === 'w' ? v : -v;
        // A valuable piece (N/B/R/Q) attacked by an enemy pawn is dangerous. Penalize it statically to avoid blunders that search may miss, such as a queen being chased and trapped. / 高価な駒が敵ポーンに狙われる位置を静的に減点し、探索で見落としやすいクイーンの追い込みなどを防ぐ。
        if (pc.type === 'n' || pc.type === 'b' || pc.type === 'r' || pc.type === 'q') {
          const pr = pc.color === 'w' ? r - 1 : r + 1; // Rank from which the enemy pawn could capture. / 敵ポーンが取ってくる段。
          if (pr >= 0 && pr <= 7) {
            const foe = pc.color === 'w' ? 'b' : 'w';
            let attacked = false;
            for (const dc of [-1, 1]) {
              const cc = c + dc;
              if (cc < 0 || cc > 7) continue;
              const q = board[pr][cc];
              if (q && q.type === 'p' && q.color === foe) { attacked = true; break; }
            }
            if (attacked) {
              const pen = pc.type === 'q' ? 70 : pc.type === 'r' ? 40 : 22;
              score += pc.color === 'w' ? -pen : pen;
            }
          }
        }
      }
    }
    // Endgame knowledge: when far ahead, drive the enemy king to a corner and bring your own king closer to make mate easier. / 終盤の寄せ。大きく駒得した側は相手キングを隅へ追い、自分のキングを近づけると詰ませやすい。
    if (endgame && kings.w && kings.b && Math.abs(wMat - bMat) >= 400) {
      const winner = wMat > bMat ? 'w' : 'b';
      const lk = winner === 'w' ? kings.b : kings.w;   // Losing side's king. / 負けている側のキング。
      const wk = winner === 'w' ? kings.w : kings.b;   // Winning side's king. / 勝っている側のキング。
      const cmd = Math.min(Math.abs(lk[0] - 3), Math.abs(lk[0] - 4)) +
                  Math.min(Math.abs(lk[1] - 3), Math.abs(lk[1] - 4)); // Distance from center (0 center to 6 corner). / 中央からの距離（0が中央、6が隅）。
      const md = Math.abs(wk[0] - lk[0]) + Math.abs(wk[1] - lk[1]);   // Distance between the kings. / 両キング間の距離。
      const bonus = 8 * cmd + 3 * (14 - md);  // Drive the enemy king to a corner and bring up your own king. / 相手キングを隅へ追い、自分のキングを近づける。
      score += winner === 'w' ? bonus : -bonus;
    }
    // Apply king safety in the middlegame to avoid reckless attacks with an exposed king. / 中盤はキングの安全性を評価し、露出したキングでの無謀な攻めを避ける。
    if (!endgame && kings.w && kings.b) {
      score -= kingDanger(board, kings.w[0], kings.w[1], 'w');
      score += kingDanger(board, kings.b[0], kings.b[1], 'b');
    }
    return score;
  }

  function sideEval(game) {
    return game.turn() === 'w' ? evaluate(game) : -evaluate(game);
  }

  const EXACT = 0, LOWER = 1, UPPER = 2;
  function sameMove(a, b) {
    return !!a && !!b && a.from === b.from && a.to === b.to && a.promotion === b.promotion;
  }

  // Move ordering: transposition-table move → capture (MVV-LVA) → promotion → killer move → history heuristic. / 手の並べ替え。
  // Searching good moves first improves pruning and makes the engine stronger at the same time limit. / 良い手を先に読むほど枝刈りが効き、同じ時間で深く読める。
  function orderMoves(moves, ttMove, killers, history) {
    for (const m of moves) {
      let s;
      if (sameMove(m, ttMove)) s = 2e7;
      else if (m.captured) s = 1e6 + 10 * VAL[m.captured] - VAL[m.piece] + (m.promotion ? VAL[m.promotion] : 0);
      else if (m.promotion) s = 9e5 + VAL[m.promotion];
      else if (killers && sameMove(m, killers[0])) s = 8e5 + 1;
      else if (killers && sameMove(m, killers[1])) s = 8e5;
      else s = history[m.from + m.to] || 0;
      m._score = s;
    }
    moves.sort((a, b) => b._score - a._score);
    return moves;
  }

  // Repetition is path-dependent, unlike an ordinary transposition score.
  // Keep the piece placement, turn, castling and en-passant fields, but not clocks.
  function repetitionKey(game) { return game.fen().split(' ').slice(0, 4).join(' '); }
  function halfmoveDraw(game) { return Number(game.fen().split(' ')[4]) >= 100; }
  function pushRepetition(game, ctx) {
    const key = repetitionKey(game);
    ctx.rep.set(key, (ctx.rep.get(key) || 0) + 1);
    return key;
  }
  function popRepetition(key, ctx) {
    const n = ctx.rep.get(key);
    if (n <= 1) ctx.rep.delete(key); else ctx.rep.set(key, n - 1);
  }

  // Quiescence: standing pat is forbidden while the side to move is in check.
  // Search *all* legal evasions, including quiet king moves and interpositions.
  // At the extension limit still examine one legal evasion, never evaluate a
  // checkmated position as an ordinary static position.
  const QMAX = 4, QCHECKMAX = 8;
  function quiesce(game, alpha, beta, deadline, ctx, qply) {
    if ((ctx.nodes++ & 1023) === 0 && Date.now() > deadline) throw TIMEOUT;
    if ((ctx.rep.get(repetitionKey(game)) || 0) >= 3) return 0;
    const inCheck = game.in_check();
    const stand = sideEval(game);
    if (game.insufficient_material()) return 0;
    const clockDraw = halfmoveDraw(game);
    if (!inCheck && clockDraw) return 0;
    if (!inCheck && qply >= QMAX) return game.fast_moves().length ? stand : 0;
    const moves = game.fast_moves();
    if (moves.length === 0) return inCheck ? -MATE + ctx.ply + qply : 0;
    if (!inCheck) {
      if (stand >= beta) return stand;
      if (stand > alpha) alpha = stand;
    }
    if (clockDraw) return 0; // No mating move overrides the 50-move claim.
    if (inCheck && qply >= QCHECKMAX) {
      // Bound extraordinary checking sequences, but require a legal escape.
      let best = -INF;
      for (const m of moves) {
        game.move(m);
        const s = -sideEval(game);
        game.undo();
        if (s > best) best = s;
      }
      return best;
    }
    const candidates = inCheck ? moves : moves.filter(m => m.captured || m.promotion);
    orderMoves(candidates, null, null, ctx.history);
    let best = inCheck ? -INF : stand;
    for (const m of candidates) {
      if (!inCheck) {
        const gain = (m.captured ? VAL[m.captured] : 0) + (m.promotion ? VAL[m.promotion] : 0);
        if (stand + gain + 200 < alpha) continue;
      }
      game.move(m);
      const key = pushRepetition(game, ctx);
      let score;
      try { score = -quiesce(game, -beta, -alpha, deadline, ctx, qply + 1); }
      finally { popRepetition(key, ctx); game.undo(); }
      if (score > best) best = score;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }

  function search(game, depth, alpha, beta, ply, deadline, ctx) {
    if ((ctx.nodes++ & 1023) === 0 && Date.now() > deadline) throw TIMEOUT;
    const repetition = pushRepetition(game, ctx);
    try {
      if (ctx.rep.get(repetition) >= 3) return 0;
      if (game.insufficient_material()) return 0;
      const alphaOrig = alpha, betaOrig = beta;
      const inCheck = game.in_check();
      const clockDraw = halfmoveDraw(game);
      // Move-generation precedes draw adjudication: checkmate wins even on move 100.
      if (clockDraw) {
        if (inCheck && game.fast_moves().length === 0) return -MATE + ply;
        return 0;
      }
      if (ply >= 60) {
        ctx.ply = ply;
        return ctx.useQuiesce ? quiesce(game, alpha, beta, deadline, ctx, 0) : sideEval(game);
      }
      // The same board can evaluate differently with a different repetition
      // history. Do not reuse transposition bounds on repeated paths.
      const key = game.fen().split(' ').slice(0, 5).join(' ');
      const entry = ctx.rep.get(repetition) === 1 ? ctx.tt.get(key) : null;
      let ttMove = null;
      if (entry) {
        ttMove = entry.move;
        if (entry.depth >= depth && Math.abs(entry.score) < MATE - 1000) {
          if (entry.flag === EXACT) return entry.score;
          if (entry.flag === LOWER && entry.score > alpha) alpha = entry.score;
          else if (entry.flag === UPPER && entry.score < beta) beta = entry.score;
          if (alpha >= beta) return entry.score;
        }
      }
      const moves = game.fast_moves();
      if (moves.length === 0) return inCheck ? -MATE + ply : 0;
      if (depth <= 0) {
        ctx.ply = ply;
        return ctx.useQuiesce ? quiesce(game, alpha, beta, deadline, ctx, 0) : sideEval(game);
      }
      const killers = ctx.killers[ply] || (ctx.killers[ply] = [null, null]);
      orderMoves(moves, ttMove, killers, ctx.history);
      let best = -INF, bestMv = null, first = true;
      for (const m of moves) {
        game.move(m);
        let s;
        try {
          const ext = game.in_check() && depth > 1 && ply < 8 ? 1 : 0;
          if (first) s = -search(game, depth - 1 + ext, -beta, -alpha, ply + 1, deadline, ctx);
          else {
            s = -search(game, depth - 1 + ext, -alpha - 1, -alpha, ply + 1, deadline, ctx);
            if (s > alpha && s < beta)
              s = -search(game, depth - 1 + ext, -beta, -alpha, ply + 1, deadline, ctx);
          }
        } finally { game.undo(); }
        first = false;
        if (s > best) { best = s; bestMv = m; }
        if (best > alpha) alpha = best;
        if (alpha >= beta) {
          if (!m.captured && !m.promotion) {
            if (!sameMove(m, killers[0])) {
              killers[1] = killers[0]; killers[0] = {from:m.from,to:m.to,promotion:m.promotion};
            }
            ctx.history[m.from + m.to] = (ctx.history[m.from + m.to] || 0) + depth * depth;
          }
          break;
        }
      }
      let flag = EXACT;
      if (best <= alphaOrig) flag = UPPER;
      else if (best >= betaOrig) flag = LOWER;
      const storeMv = bestMv ? {from:bestMv.from,to:bestMv.to,promotion:bestMv.promotion} : ttMove;
      if (ctx.rep.get(repetition) === 1 && ctx.tt.size < 250000)
        ctx.tt.set(key, {depth,score:best,flag,move:storeMv});
      return best;
    } finally { popRepetition(repetition, ctx); }
  }

  // Every root move gets a full-window score; a PVS null-window result is
  // only a bound and cannot be compared fairly with a completed root score.
  // Only fully finished depths may replace the previous completed iteration.
  function analyzeRoot(fen, maxDepth, timeMs, useQuiesce, _refineMargin) {
    const game = new Chess(fen);
    const rootMoves = game.fast_moves();
    if (!rootMoves.length || game.game_over()) return [];
    const deadline = Date.now() + timeMs;
    const ctx = {tt:new Map(),killers:[],history:{},rep:new Map([[repetitionKey(game),1]]),nodes:0,useQuiesce,ply:0};
    // One-ply static fallback is always available. Never disable the deadline:
    // even a single quiescence tree can be extremely large in checking lines.
    let results = rootMoves.map(m=>{
      game.move(m);
      const score = -sideEval(game);
      game.undo();
      return {move:m,score};
    }).sort((a,b)=>b.score-a.score);
    let completedDepth = 0;
    for (let depth = 1; depth <= maxDepth; depth++) {
      const ordered = results.map(r=>r.move);
      const current = [];
      let timedOut = false;
      for (let index = 0; index < ordered.length; index++) {
        const m = ordered[index];
        const limit = deadline;
        game.move(m);
        let score;
        try { score = -search(game, depth - 1, -INF, INF, 1, limit, ctx); }
        catch (e) {
          if (e !== TIMEOUT) throw e;
          timedOut = true;
          break;
        } finally { game.undo(); }
        current.push({move:m,score});
      }
      if (!timedOut && current.length === ordered.length) {
        results = current.sort((a,b)=>b.score-a.score);
        completedDepth = depth;
      }
      if (timedOut || Date.now() > deadline) break;
      if (results[0].score >= MATE - 100) break;
    }
    return results;
  }

  // margin: include only moves within this centipawn distance of the best move. / 最善手からこの点数以内の手だけを候補にする。
  // Allow small inaccuracies but exclude outright piece drops; weak levels express weakness through small inaccuracies. / 小さな緩手は許すが、駒の無駄捨ては除外し、弱さは小さなミスで表現する。
  // Keep quiescence search at every level and cap margin around 1.2 pawns. / 静止探索は全レベルで維持し、marginもポーン約1.2枚までに抑える。
  // fast_moves made search about eight times faster, so depth and time were retuned to practical values. / fast_moves化で約8倍高速になったため、探索深さと時間を実用値に調整している。
  // depth is an upper bound; timeMs often becomes the effective limit. / depthは上限で、実際はtimeMsが制限になることが多い。
  const LEVELS = {
    // Progression uses both search budget and decreasing random variation.
    // Ratings are intentionally not given Elo labels without match evidence.
    1:  { depth: 1, timeMs: 200,  margin: 200, noise: 180, blunder: 0.55, quiesce: true, book: false },
    2:  { depth: 1, timeMs: 220,  margin: 170, noise: 140, blunder: 0.45, quiesce: true, book: true },
    3:  { depth: 2, timeMs: 320,  margin: 110, noise: 90,  blunder: 0.30, quiesce: true, book: true },
    4:  { depth: 2, timeMs: 420,  margin: 90,  noise: 65,  blunder: 0.20, quiesce: true, book: true },
    5:  { depth: 3, timeMs: 520,  margin: 70,  noise: 46,  blunder: 0.12, quiesce: true, book: true },
    6:  { depth: 3, timeMs: 650,  margin: 55,  noise: 32,  blunder: 0.07, quiesce: true, book: true },
    7:  { depth: 4, timeMs: 980,  margin: 34,  noise: 17,  blunder: 0.025,quiesce: true, book: true },
    8:  { depth: 4, timeMs: 1160, margin: 24,  noise: 10,  blunder: 0.012,quiesce: true, book: true },
    9:  { depth: 4, timeMs: 1300, margin: 15,  noise: 5,   blunder: 0,    quiesce: true, book: true },
    10: { depth: 5, timeMs: 1650, margin: 0,   noise: 0,   blunder: 0,    quiesce: true, book: true },
  };

  // ===== Opening book / オープニングブック（定跡の知識） =====
  // Learn position → next-move patterns from lessons and common opening lines. / まなぶ教材と基本ラインから「局面→次の手」を覚える。
  // This makes the opening natural and slightly more human. / 序盤で自然な手を指せるようにし、少しだけ人間らしくする。
  const EXTRA_LINES = [
    'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O',
    'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O',
    'e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Bc5 c3 d6 O-O O-O',
    'e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5',
    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7',
    'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6',
    'e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7',
    'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6',
    'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6',
    'd4 d5 c4 c6 Nf3 Nf6 Nc3 e6',
    'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5',
    'd4 Nf6 c4 e6 Nc3 Bb4 e3 O-O',
    'e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6',
    'c4 e5 Nc3 Nf6 Nf3 Nc6',
    'Nf3 d5 d4 Nf6 c4 e6',
  ];

  let BOOK = null;
  // Identify positions by piece placement, side to move, and castling rights. / 駒配置・手番・キャスリング権で局面を識別する。
  function posKey(fen) { return fen.split(' ').slice(0, 3).join(' '); }
  function addLine(sans) {
    const g = new Chess();
    for (const san of sans) {
      const key = posKey(g.fen());
      const mv = g.move(san, { sloppy: true });
      if (!mv) break;
      if (!BOOK[key]) BOOK[key] = [];
      if (!BOOK[key].some((b) => b.from === mv.from && b.to === mv.to && b.promotion === mv.promotion)) {
        BOOK[key].push({ from: mv.from, to: mv.to, promotion: mv.promotion });
      }
    }
  }
  function buildBook() {
    if (BOOK) return;
    BOOK = {};
    for (const line of EXTRA_LINES) addLine(line.split(/\s+/));
    // Include opening lines from the lessons. / まなぶ教材のオープニングラインも取り込む。
    if (typeof LESSONS !== 'undefined') {
      for (const L of LESSONS) {
        if (L.cat === 'opening' && !L.fen) addLine(L.moves.map((m) => m.san));
      }
    }
  }
  function bookMove(fen) {
    buildBook();
    const list = BOOK[posKey(fen)];
    if (!list || list.length === 0) return null;
    return list[Math.floor(Math.random() * list.length)];
  }

  // Worker isolates the CPU-heavy search from board rendering and user input.
  // One Worker per request makes cancellation immediate even during synchronous search.
  const pending = new Set();
  function cancelPending() {
    for (const job of pending) job.cancel();
    pending.clear();
  }
  function dispatch(kind, fen, level, cb, fallback) {
    if (typeof Worker === 'undefined' || typeof document === 'undefined') { // Node tests or inside the worker
      const job = { cancel: () => { job.cancelled = true; } };
      pending.add(job);
      fallback(value => { pending.delete(job); if (!job.cancelled) cb(value); });
      return;
    }
    let worker;
    try { worker = new Worker('js/engine_worker.js?v=2'); }
    catch (_) { fallback(cb); return; }
    let done = false;
    const job = {
      cancel() { if (done) return; done = true; worker.terminate(); pending.delete(job); }
    };
    pending.add(job);
    const finish = (value, error) => {
      if (done) return;
      job.cancel();
      if (error) fallback(cb);
      else cb(value);
    };
    worker.onmessage = event => {
      const data = event.data;
      if (!data || data.id !== 1) return;
      finish(data.move || null, !!data.error);
    };
    worker.onerror = event => { event.preventDefault(); finish(null, true); };
    worker.postMessage({ id: 1, kind, fen, level });
  }
  // Choose a CPU move asynchronously after allowing the UI to render. / UI描画を待ってから非同期でCPUの手を選ぶ。
  function chooseMoveLocal(fen, level, cb) {
    setTimeout(() => {
      const cfg = LEVELS[level] || LEVELS[5];
      // Use the opening book early for natural play. / 序盤は定跡ブックから自然な手を指す。
      if (cfg.book) {
        const bm = bookMove(fen);
        if (bm) { cb(bm); return; }
      }
      const results = analyzeRoot(fen, cfg.depth, cfg.timeMs, cfg.quiesce, cfg.margin || 0);
      if (results.length === 0) { cb(null); return; }
      const best = results[0].score;
      // Keep only moves within margin of the best; even weak levels avoid suicidal piece losses. / 最善手からmargin以内の手だけを候補にし、弱いレベルでも駒損の自滅手は避ける。
      const margin = cfg.margin || 0;
      let pool = results.filter((r) => r.score >= best - margin);
      if (pool.length === 0) pool = [results[0]];
      let pick;
      if (cfg.blunder > 0 && pool.length > 1 && Math.random() < cfg.blunder) {
        pick = pool[Math.floor(Math.random() * pool.length)];
      } else if (cfg.noise > 0 && pool.length > 1) {
        const noisy = pool.map((r) => ({ move: r.move, score: r.score + Math.random() * cfg.noise }));
        noisy.sort((a, b) => b.score - a.score);
        pick = noisy[0];
      } else {
        pick = pool[0];
      }
      cb(pick.move);
    }, 50);
  }

  // Hints always use a stronger search setting. / ヒントは常に強めの設定で読む。
  function bestMoveLocal(fen, cb) {
    setTimeout(() => {
      const results = analyzeRoot(fen, 7, 3000, true, 0);
      cb(results.length > 0 ? results[0].move : null);
    }, 50);
  }

  function chooseMove(fen, level, cb) {
    dispatch('choose', fen, level, cb, done => chooseMoveLocal(fen, level, done));
  }
  function bestMove(fen, cb) {
    dispatch('hint', fen, null, cb, done => bestMoveLocal(fen, done));
  }

  // Return all moves that force mate within n moves for puzzle validation. / n手以内の強制メイトになる手をすべて返し、パズル判定に使う。
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

  return { chooseMove, bestMove, cancelPending, mateMoves, LEVELS };
})();

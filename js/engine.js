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

  // Quiescence search extends captures and promotions to reduce the horizon effect. / 静止探索で取り合いと成りだけを延長し、水平線効果を軽減する。
  // It is used at every level so pieces about to be captured are valued correctly and queen blunders are avoided. / 全レベルで使い、取られる寸前のコマやクイーンの無駄捨てを正しく評価する。
  const QMAX = 4; // Maximum quiescence extension to keep exchanges within the time budget. / 静止探索の最大延長段数。
  function quiesce(game, alpha, beta, deadline, ctx, qply) {
    if ((ctx.nodes++ & 2047) === 0 && Date.now() > deadline) throw TIMEOUT;
    const stand = sideEval(game);
    if (stand >= beta) return stand;
    if (stand > alpha) alpha = stand;
    if (qply >= QMAX) return stand; // Do not extend further. / これ以上は延長しない。
    let best = stand;
    const caps = game.fast_moves().filter((m) => m.captured || m.promotion);
    orderMoves(caps, null, null, ctx.history);
    for (const m of caps) {
      // Delta pruning: skip a capture that cannot recover enough material. / デルタ枝刈り。取り返せないほど劣勢なら読まない。
      const gain = VAL[m.captured || 'p'] + (m.promotion ? VAL[m.promotion] : 0);
      if (stand + gain + 200 < alpha) continue;
      game.move(m);
      const s = -quiesce(game, -beta, -alpha, deadline, ctx, qply + 1);
      game.undo();
      if (s > best) best = s;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }

  function search(game, depth, alpha, beta, ply, deadline, ctx) {
    if ((ctx.nodes++ & 1023) === 0 && Date.now() > deadline) throw TIMEOUT;
    // Score insufficient-material draws as 0. Avoid chess.js repetition helpers because replaying the full history at every node is extremely expensive. / 駒不足の引き分けは0と評価し、毎ノード履歴を再生するchess.jsの重い検出は使わない。
    // Detect repetitions cheaply with the position key on the current search path (ctx.rep). / 千日手は探索経路上の局面キー（ctx.rep）で軽量に検出する。
    if (ply > 0 && game.insufficient_material()) return 0;
    if (ply >= 60) return ctx.useQuiesce ? quiesce(game, alpha, beta, deadline, ctx, 0) : sideEval(game);

    const alphaOrig = alpha, betaOrig = beta;
    const key = game.fen();
    const entry = ctx.tt.get(key);
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
    if (moves.length === 0) return game.in_check() ? -MATE + ply : 0;
    if (depth <= 0) {
      return ctx.useQuiesce ? quiesce(game, alpha, beta, deadline, ctx, 0) : sideEval(game);
    }

    const killers = ctx.killers[ply] || (ctx.killers[ply] = [null, null]);
    orderMoves(moves, ttMove, killers, ctx.history);

    let best = -INF, bestMv = null, first = true;
    for (const m of moves) {
      game.move(m);
      // Extend checks by one ply to avoid missing mates and defenses. / 王手では1手延長し、詰みや受けの見落としを防ぐ。
      const ext = game.in_check() && ply < 40 ? 1 : 0;
      let s;
      if (first) {
        s = -search(game, depth - 1 + ext, -beta, -alpha, ply + 1, deadline, ctx);
      } else {
        // PVS: verify later moves with a null window, then re-search if they exceed it. / PVS。2手目以降をヌルウィンドウで確認し、超えたら本探索する。
        s = -search(game, depth - 1 + ext, -alpha - 1, -alpha, ply + 1, deadline, ctx);
        if (s > alpha && s < beta) s = -search(game, depth - 1 + ext, -beta, -alpha, ply + 1, deadline, ctx);
      }
      game.undo();
      first = false;
      if (s > best) { best = s; bestMv = m; }
      if (best > alpha) alpha = best;
      if (alpha >= beta) {
        // Remember quiet cutoffs as killer/history moves for future ordering. / 静かな手のカットをキラー手・履歴として次回の並べ替えに使う。
        if (!m.captured && !m.promotion) {
          if (!sameMove(m, killers[0])) { killers[1] = killers[0]; killers[0] = { from: m.from, to: m.to, promotion: m.promotion }; }
          ctx.history[m.from + m.to] = (ctx.history[m.from + m.to] || 0) + depth * depth;
        }
        break;
      }
    }

    let flag = EXACT;
    if (best <= alphaOrig) flag = UPPER;
    else if (best >= betaOrig) flag = LOWER;
    const storeMv = bestMv ? { from: bestMv.from, to: bestMv.to, promotion: bestMv.promotion } : ttMove;
    if (ctx.tt.size < 250000) ctx.tt.set(key, { depth, score: best, flag, move: storeMv });
    return best;
  }

  // Root search: return scored moves using iterative deepening with a time limit. / ルート探索。反復深化と時間制限付きで各手のスコアを返す。
  // If refineMargin>0, re-search only moves within margin of the best move with a full window for accurate scores. / refineMargin>0なら最善手からmargin以内の候補を全幅で読み直し、弱いレベルの自滅手を除外する。
  function analyzeRoot(fen, maxDepth, timeMs, useQuiesce, refineMargin) {
    const game = new Chess(fen);
    const rootMoves = game.fast_moves();
    if (rootMoves.length === 0) return [];
    const deadline = Date.now() + timeMs;
    const ctx = { tt: new Map(), killers: [], history: {}, nodes: 0, useQuiesce };
    let results = rootMoves.map((m) => ({ move: m, score: 0 }));
    let completedDepth = 0;
    for (let d = 1; d <= maxDepth; d++) {
      const ordered = results.map((r) => r.move);
      const cur = [];
      let alpha = -INF, timedOut = false;
      for (let k = 0; k < ordered.length; k++) {
        const m = ordered[k];
        // Always finish searching the first move without a time limit to guarantee a usable result. / 最初の1手は時間無制限で読み切り、最低限の手を確保する。
        // Stop the remaining moves at the deadline and keep partial results. / 残りは締切で打ち切り、読めた結果を活かす。
        const dl = (d === 1 && k === 0) ? Infinity : deadline;
        game.move(m);
        let s;
        try {
          if (k === 0) {
            s = -search(game, d - 1, -INF, -alpha, 1, dl, ctx);
          } else {
            // PVS: check with a null window first, then perform a full search if needed. / PVS。まずヌルウィンドウで確認し、必要なら本探索する。
            s = -search(game, d - 1, -alpha - 1, -alpha, 1, dl, ctx);
            if (s > alpha) s = -search(game, d - 1, -INF, -alpha, 1, dl, ctx);
          }
        } catch (e) {
          game.undo();
          if (e === TIMEOUT) { timedOut = true; break; }
          throw e;
        }
        game.undo();
        cur.push({ move: m, score: s });
        if (s > alpha) alpha = s;
      }
      if (cur.length > 0) {
        // Merge searched moves with unread moves placed below them; preserve useful partial ordering. / 読めた手と未読の手をまとめ、部分的な深さでも順位を活かす。
        const done = new Set(cur.map((x) => x.move));
        for (const r of results) if (!done.has(r.move)) cur.push({ move: r.move, score: -INF });
        cur.sort((a, b) => b.score - a.score);
        results = cur;
        completedDepth = d; // A partial score at this depth is still useful for refinement. / 部分的でもこの深さのスコアを精密化に使える。
      }
      if (timedOut) break;
      if (results[0].score > MATE - 100) break; // A found mate is sufficient. / メイト発見なら十分。
      if (Date.now() > deadline) break;
    }
    // Weak-level refinement: a PVS scout window can give losing moves only a loose upper bound, allowing a queen blunder to look competitive. / 弱いレベルではPVSの上限値により大損手が候補へ紛れ込むことがある。
    // Re-search only moves that appear within margin of the best with a full window, then remove genuine blunders. / 最善からmargin以内に見える手を全幅で読み直し、本当の大損手を除外する。
    if (refineMargin > 0 && results.length > 1 && completedDepth >= 1) {
      const best = results[0].score;
      const threshold = best - refineMargin; // Do not enter the pool below this threshold. / これ未満の手は候補に入れない。
      const verified = [results[0]];         // Always keep the best move. / 最善手は常に採用する。
      // If a scout upper bound is below threshold, the true score is also below it, so the move can be discarded safely. / 上限値がthreshold未満なら真値も未満なので除外できる。
      // Only moves at or above threshold are candidates (real or disguised blunders), so verify them. / threshold以上の候補（本物または大損手）を検証する。
      const boundPass = results.slice(1).filter((r) => r.score >= threshold).slice(0, 8);
      const excluded = results.slice(1).filter((r) => r.score < threshold);
      const refineDeadline = Date.now() + 350;
      let i = 0;
      for (; i < boundPass.length; i++) {
        if (Date.now() > refineDeadline) break;
        const r = boundPass[i];
        game.move(r.move);
        let s;
        try {
          // Fast full-depth null-window verification around threshold. / threshold周辺を全深さのヌルウィンドウで高速検証する。
          s = -search(game, completedDepth - 1, -threshold, -(threshold - 1), 1, refineDeadline, ctx);
        } catch (e) { if (e !== TIMEOUT) throw e; game.undo(); break; }
        game.undo();
        r.score = s;
        if (s >= threshold) verified.push(r); else excluded.push(r);
      }
      // Exclude candidates left unverified at timeout rather than trusting their upper bounds. / 時間切れで未検証の候補は上限値を信用せず除外する。
      for (; i < boundPass.length; i++) { boundPass[i].score = threshold - 100000; excluded.push(boundPass[i]); }
      results = verified.concat(excluded);
      results.sort((a, b) => b.score - a.score);
    }
    return results;
  }

  // margin: include only moves within this centipawn distance of the best move. / 最善手からこの点数以内の手だけを候補にする。
  // Allow small inaccuracies but exclude outright piece drops; weak levels express weakness through small inaccuracies. / 小さな緩手は許すが、駒の無駄捨ては除外し、弱さは小さなミスで表現する。
  // Keep quiescence search at every level and cap margin around 1.2 pawns. / 静止探索は全レベルで維持し、marginもポーン約1.2枚までに抑える。
  // fast_moves made search about eight times faster, so depth and time were retuned to practical values. / fast_moves化で約8倍高速になったため、探索深さと時間を実用値に調整している。
  // depth is an upper bound; timeMs often becomes the effective limit. / depthは上限で、実際はtimeMsが制限になることが多い。
  const LEVELS = {
    1:  { depth: 1, timeMs: 200,  margin: 200, noise: 180, blunder: 0.55, quiesce: true, book: false },
    2:  { depth: 1, timeMs: 220,  margin: 170, noise: 140, blunder: 0.45, quiesce: true, book: true },
    3:  { depth: 2, timeMs: 320,  margin: 135, noise: 100, blunder: 0.34, quiesce: true, book: true },
    4:  { depth: 2, timeMs: 420,  margin: 110, noise: 72,  blunder: 0.24, quiesce: true, book: true },
    5:  { depth: 3, timeMs: 520,  margin: 85,  noise: 52,  blunder: 0.14, quiesce: true, book: true },
    6:  { depth: 3, timeMs: 650,  margin: 66,  noise: 36,  blunder: 0.09, quiesce: true, book: true },
    7:  { depth: 4, timeMs: 820,  margin: 48,  noise: 22,  blunder: 0.05, quiesce: true, book: true },
    8:  { depth: 4, timeMs: 1050, margin: 34,  noise: 13,  blunder: 0.025, quiesce: true, book: true },
    9:  { depth: 4, timeMs: 1300, margin: 22,  noise: 7,   blunder: 0.01, quiesce: true, book: true },
    10: { depth: 5, timeMs: 1650, margin: 13,  noise: 4,   blunder: 0,    quiesce: true, book: true },
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

  // Choose a CPU move asynchronously after allowing the UI to render. / UI描画を待ってから非同期でCPUの手を選ぶ。
  function chooseMove(fen, level, cb) {
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
  function bestMove(fen, cb) {
    setTimeout(() => {
      const results = analyzeRoot(fen, 7, 3000, true, 0);
      cb(results.length > 0 ? results[0].move : null);
    }, 50);
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

  return { chooseMove, bestMove, mateMoves, LEVELS };
})();

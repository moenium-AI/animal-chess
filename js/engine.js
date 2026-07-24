// シンプルなチェスAIエンジン(アルファベータ探索 + 反復深化)
// レベル1〜10の強さ調整、オープニングブック、終盤の寄せ評価、
// ヒント探索、パズル用メイトソルバーを提供する。
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

  // 中盤の王の安全性: 玉の前のポーンの盾が欠けていたり、玉が中央に居ると危険。
  // 返り値は「危険度(大きいほど危ない)」。露出した玉で無謀に戦って自滅するのを抑える。
  function kingDanger(board, kr, kc, color) {
    const dir = color === 'w' ? -1 : 1; // 前方向(白は上=行が減る)
    let danger = 0;
    for (let dc = -1; dc <= 1; dc++) {
      const c = kc + dc;
      if (c < 0 || c > 7) { danger += 8; continue; } // 盤端は盾が作れない
      let shield = false;
      for (let step = 1; step <= 2; step++) {
        const r = kr + dir * step;
        if (r < 0 || r > 7) break;
        const pc = board[r][c];
        if (pc && pc.type === 'p' && pc.color === color) { shield = true; break; }
      }
      if (!shield) danger += 16; // 盾ポーンがない列
    }
    if (kc >= 2 && kc <= 5) danger += 14; // 中央に留まった玉は危険
    return danger;
  }

  // 白から見た評価値(センチポーン)
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
    // 終盤の寄せ知識: 大きく駒得している側は、相手の玉を盤の隅へ追い、
    // 自分の玉を近づけると詰ませやすい。これを評価に加えて終盤を『勝ち切れる』ようにする。
    if (endgame && kings.w && kings.b && Math.abs(wMat - bMat) >= 400) {
      const winner = wMat > bMat ? 'w' : 'b';
      const lk = winner === 'w' ? kings.b : kings.w;   // 負けている側の玉
      const wk = winner === 'w' ? kings.w : kings.b;   // 勝っている側の玉
      const cmd = Math.min(Math.abs(lk[0] - 3), Math.abs(lk[0] - 4)) +
                  Math.min(Math.abs(lk[1] - 3), Math.abs(lk[1] - 4)); // 中央からの距離(0中央〜6隅)
      const md = Math.abs(wk[0] - lk[0]) + Math.abs(wk[1] - lk[1]);   // 両玉間の距離
      const bonus = 8 * cmd + 3 * (14 - md);  // 相手玉を隅へ+自玉を近づける
      score += winner === 'w' ? bonus : -bonus;
    }
    // 中盤は玉の安全を評価に反映(露出した玉での無謀な攻めを避ける)
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

  // 手の並べ替え: 置換表の手 → 取り(MVV-LVA) → 成り → キラー手 → 履歴ヒューリスティック
  // 良い手を先に読むほど枝刈りが効き、同じ時間でより深く読める(=強くなる)。
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

  // 静止探索(取り合い・成りだけ延長して水平線効果を軽減)
  // これを全レベルで使うことで「取られる寸前の駒」を正しく損と評価し、
  // クイーン突撃のようなタダ捨てで自滅するのを防ぐ。
  function quiesce(game, alpha, beta, deadline, ctx) {
    if ((ctx.nodes++ & 2047) === 0 && Date.now() > deadline) throw TIMEOUT;
    const stand = sideEval(game);
    if (stand >= beta) return stand;
    if (stand > alpha) alpha = stand;
    let best = stand;
    const caps = game.moves({ verbose: true }).filter((m) => m.captured || m.promotion);
    orderMoves(caps, null, null, ctx.history);
    for (const m of caps) {
      // デルタ枝刈り: この取りで挽回できないほど劣勢なら読まない
      const gain = VAL[m.captured || 'p'] + (m.promotion ? VAL[m.promotion] : 0);
      if (stand + gain + 200 < alpha) continue;
      game.move(m);
      const s = -quiesce(game, -beta, -alpha, deadline, ctx);
      game.undo();
      if (s > best) best = s;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }

  function search(game, depth, alpha, beta, ply, deadline, ctx) {
    if ((ctx.nodes++ & 1023) === 0 && Date.now() > deadline) throw TIMEOUT;
    // 引き分け(50手・不足駒・千日手)は0と評価。劣勢側は引き分けを目指して粘れる。
    if (ply > 0 && game.in_draw()) return 0;
    if (ply >= 60) return ctx.useQuiesce ? quiesce(game, alpha, beta, deadline, ctx) : sideEval(game);

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

    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return game.in_check() ? -MATE + ply : 0;
    if (depth <= 0) {
      return ctx.useQuiesce ? quiesce(game, alpha, beta, deadline, ctx) : sideEval(game);
    }

    const killers = ctx.killers[ply] || (ctx.killers[ply] = [null, null]);
    orderMoves(moves, ttMove, killers, ctx.history);

    let best = -INF, bestMv = null, first = true;
    for (const m of moves) {
      game.move(m);
      // 王手には延長(1手先を読む)。詰み・受けの見落としを防ぎ強くなる。
      const ext = game.in_check() && ply < 40 ? 1 : 0;
      let s;
      if (first) {
        s = -search(game, depth - 1 + ext, -beta, -alpha, ply + 1, deadline, ctx);
      } else {
        // PVS: 2手目以降はまずヌルウィンドウで確認し、超えたら本探索
        s = -search(game, depth - 1 + ext, -alpha - 1, -alpha, ply + 1, deadline, ctx);
        if (s > alpha && s < beta) s = -search(game, depth - 1 + ext, -beta, -alpha, ply + 1, deadline, ctx);
      }
      game.undo();
      first = false;
      if (s > best) { best = s; bestMv = m; }
      if (best > alpha) alpha = best;
      if (alpha >= beta) {
        // 静かな手でのカットはキラー手・履歴として記憶し次回の並べ替えに活かす
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

  // ルート探索: 各手のスコアつきリストを返す(反復深化・時間打ち切りつき)
  function analyzeRoot(fen, maxDepth, timeMs, useQuiesce) {
    const game = new Chess(fen);
    const rootMoves = game.moves({ verbose: true });
    if (rootMoves.length === 0) return [];
    const deadline = Date.now() + timeMs;
    const ctx = { tt: new Map(), killers: [], history: {}, nodes: 0, useQuiesce };
    let results = rootMoves.map((m) => ({ move: m, score: 0 }));
    for (let d = 1; d <= maxDepth; d++) {
      const cur = [];
      try {
        let alpha = -INF;
        // 前回の並び順を使うと枝刈りが効く
        const ordered = results.map((r) => r.move);
        let first = true;
        const dl = d === 1 ? Infinity : deadline;
        for (const m of ordered) {
          game.move(m);
          let s;
          if (first) {
            s = -search(game, d - 1, -INF, -alpha, 1, dl, ctx);
          } else {
            s = -search(game, d - 1, -alpha - 1, -alpha, 1, dl, ctx);
            if (s > alpha) s = -search(game, d - 1, -INF, -alpha, 1, dl, ctx);
          }
          game.undo();
          cur.push({ move: m, score: s });
          if (s > alpha) alpha = s;
          first = false;
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

  // margin: 最善手からこの点数以内の手だけを候補にする(単位センチポーン)。
  // ノイズや気まぐれ(blunder)もこの範囲内でしか起きないので、駒のタダ捨てのような
  // 自滅手は常に候補から外れる。弱いレベルは「小さな緩手」で弱さを表現する。
  // 全体の強さは「現状(=最強)を100、旧版を0」として70前後を狙う調整。
  // quiesce は全レベルで維持し、margin は最大でもポーン1.5枚程度に抑えるので、
  // 弱めても駒のタダ捨て(旧版の自滅)には戻らない。弱さは浅い読みと小さな緩手で表現する。
  const LEVELS = {
    1:  { depth: 2, timeMs: 450,  margin: 120, noise: 90, blunder: 0.30, quiesce: true, book: false },
    2:  { depth: 2, timeMs: 600,  margin: 95,  noise: 65, blunder: 0.20, quiesce: true, book: true },
    3:  { depth: 3, timeMs: 800,  margin: 70,  noise: 45, blunder: 0.12, quiesce: true, book: true },
    4:  { depth: 3, timeMs: 1050, margin: 50,  noise: 30, blunder: 0.06, quiesce: true, book: true },
    5:  { depth: 4, timeMs: 1350, margin: 34,  noise: 18, blunder: 0.03, quiesce: true, book: true },
    6:  { depth: 4, timeMs: 1750, margin: 22,  noise: 10, blunder: 0.015, quiesce: true, book: true },
    7:  { depth: 5, timeMs: 2300, margin: 12,  noise: 5,  blunder: 0,    quiesce: true, book: true },
    8:  { depth: 5, timeMs: 3000, margin: 6,   noise: 2,  blunder: 0,    quiesce: true, book: true },
    9:  { depth: 6, timeMs: 3800, margin: 3,   noise: 0,  blunder: 0,    quiesce: true, book: true },
    10: { depth: 7, timeMs: 4800, margin: 0,   noise: 0,  blunder: 0,    quiesce: true, book: true },
  };

  // ===== オープニングブック(定跡の知識) =====
  // まなぶ教材の定跡ラインと、よくある基本ラインから「局面→次の手」を覚える。
  // 序盤で自然な手を指せるようにして、少しだけ強く・人間らしくする。
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
  // 駒配置・手番・キャスリング権だけで局面を識別する(アンパッサン欄の表記差に強くする)
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
    // まなぶ教材のオープニングラインも取り込む
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

  // CPUの指し手を選ぶ(非同期: UI描画を待ってから計算開始)
  function chooseMove(fen, level, cb) {
    setTimeout(() => {
      const cfg = LEVELS[level] || LEVELS[5];
      // 序盤は定跡ブックから指す(自然な立ち上がりで少しだけ強く)
      if (cfg.book) {
        const bm = bookMove(fen);
        if (bm) { cb(bm); return; }
      }
      const results = analyzeRoot(fen, cfg.depth, cfg.timeMs, cfg.quiesce);
      if (results.length === 0) { cb(null); return; }
      const best = results[0].score;
      // 最善手から margin 点以内の手だけを候補にする。これより悪い手(=駒損などの
      // 自滅手)は弱いレベルでも選ばれない。劣勢でも「一番粘れる手」の中から指す。
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

  // ヒント(常に強めの設定で読む)
  function bestMove(fen, cb) {
    setTimeout(() => {
      const results = analyzeRoot(fen, 7, 3000, true);
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

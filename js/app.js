// どうぶつチェス メインアプリ
(() => {
'use strict';

// ===== 状態 =====
let game = new Chess();
let mode = 'play'; // 'play' | 'puzzle' | 'replay'
let settings = { set: 'farm', opponent: 'cpu', level: 3, playerColor: 'w', sound: true };
let orient = 'w';            // 盤の下側の色
let selected = null;         // 選択中マス
let legalTargets = [];       // 選択中の合法手
let lastMove = null;         // {from,to}
let hintSquares = [];
let cpuThinking = false;
let hintThinking = false;
let pendingGuests = 0;       // 馬車で移動中(まだ会場に表示しない)の数
let replay = { baseFen: null, sans: [], idx: 0 };
let puzzle = { idx: -1, movesLeft: 0, busy: false };
let solvedPuzzles = new Set();

// ===== DOM =====
const $ = (id) => document.getElementById(id);
const boardEl = $('board');
const overlayEl = $('overlay');
const statusEl = $('status-bar');

// ===== 保存・読み込み =====
function saveSettings() {
  try { localStorage.setItem('animalchess_settings', JSON.stringify(settings)); } catch (e) {}
}
function loadSaved() {
  try {
    const s = JSON.parse(localStorage.getItem('animalchess_settings'));
    if (s) Object.assign(settings, s);
    const sv = JSON.parse(localStorage.getItem('animalchess_solved'));
    if (Array.isArray(sv)) solvedPuzzles = new Set(sv);
  } catch (e) {}
}
function saveSolved() {
  try { localStorage.setItem('animalchess_solved', JSON.stringify([...solvedPuzzles])); } catch (e) {}
}

const SET = () => PIECE_SETS[settings.set] || PIECE_SETS.classic;
const isAnimal = () => !!SET().emoji;
const pieceName = (type) => SET().names[type] || PIECE_JA[type];

// ===== サウンド =====
let audioCtx = null;
function beep(freqs, dur = 0.08, type = 'triangle', gap = 0.06) {
  if (!settings.sound) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let t = audioCtx.currentTime;
    for (const f of freqs) {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + dur);
      t += gap;
    }
  } catch (e) {}
}
const sMove = () => beep([440]);
const sCapture = () => beep([523, 392], 0.1);
const sCheck = () => beep([660, 660], 0.09);
const sWin = () => beep([523, 659, 784, 1047], 0.14, 'triangle', 0.11);
const sBad = () => beep([330, 262], 0.12, 'sine', 0.1);
const sCarriage = () => beep([392, 494, 587], 0.09, 'sine', 0.09);

// ===== トースト =====
function toast(msg, ms = 2600) {
  const area = $('toast-area');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  area.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 450); }, ms);
}

// ===== 盤面 =====
const FILES = 'abcdefgh';
function squareName(dispR, dispC) {
  if (orient === 'w') return FILES[dispC] + (8 - dispR);
  return FILES[7 - dispC] + (dispR + 1);
}
function buildBoard() {
  boardEl.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = squareName(r, c);
      const f = FILES.indexOf(sq[0]);
      const rank = parseInt(sq[1], 10);
      const div = document.createElement('div');
      div.className = 'square ' + ((f + rank) % 2 === 0 ? 'light' : 'dark');
      div.dataset.square = sq;
      if (r === 7) { const s = document.createElement('span'); s.className = 'coord file'; s.textContent = sq[0]; div.appendChild(s); }
      if (c === 0) { const s = document.createElement('span'); s.className = 'coord rank'; s.textContent = sq[1]; div.appendChild(s); }
      div.addEventListener('click', () => onSquareClick(sq));
      boardEl.appendChild(div);
    }
  }
}
function pieceHtml(type, color) {
  const set = SET();
  const cls = set.emoji ? 'piece emoji ' + color : 'piece glyph ' + color;
  return `<span class="${cls}">${set.glyphs[type]}</span>`;
}
function renderPosition() {
  const board = game.board();
  const kings = { w: null, b: null };
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const pc = board[r][c];
    if (pc && pc.type === 'k') kings[pc.color] = FILES[c] + (8 - r);
  }
  const inCheck = game.in_check() ? kings[game.turn()] : null;
  for (const div of boardEl.children) {
    const sq = div.dataset.square;
    const f = FILES.indexOf(sq[0]);
    const r8 = 8 - parseInt(sq[1], 10);
    const pc = board[r8][f];
    // 既存のピース・ドットを消す(座標ラベルは残す)
    for (const child of [...div.children]) {
      if (!child.classList.contains('coord')) child.remove();
    }
    if (pc) div.insertAdjacentHTML('beforeend', pieceHtml(pc.type, pc.color));
    div.classList.toggle('selected', selected === sq);
    div.classList.toggle('lastmove', !!lastMove && (lastMove.from === sq || lastMove.to === sq));
    div.classList.toggle('check', inCheck === sq);
    div.classList.toggle('hint-sq', hintSquares.includes(sq));
    const target = legalTargets.find((m) => m.to === sq);
    div.classList.toggle('cap-target', !!(target && (target.captured || target.flags.includes('e'))));
    if (target) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      div.appendChild(dot);
    }
  }
}

// ===== おもてなし会場 =====
function venueOf(color) { // color 側チームの会場(取ったコマをもてなす場所)
  return color === orient ? $('venue-bottom') : $('venue-top');
}
function colorJa(c) { return c === 'w' ? 'しろ' : 'くろ'; }
function renderVenues() {
  const animal = isAnimal();
  const hist = game.history({ verbose: true });
  const guests = { w: [], b: [] };
  let capIdx = 0;
  for (const m of hist) {
    if (m.captured) {
      guests[m.color].push({ type: m.captured, food: foodFor(capIdx, m.captured) });
      capIdx++;
    }
  }
  for (const color of ['w', 'b']) {
    const v = venueOf(color);
    const title = v.querySelector('.venue-title');
    const area = v.querySelector('.venue-guests');
    title.textContent = animal
      ? `🏰 ${colorJa(color)}チームのおもてなし会場`
      : `${colorJa(color)}がとったコマ`;
    area.innerHTML = '';
    const list = guests[color];
    const hideFrom = color === lastCapturer ? list.length - pendingGuests : list.length;
    list.forEach((g, i) => {
      if (i >= hideFrom) return; // 馬車で移動中
      const span = document.createElement('span');
      if (animal) {
        span.className = 'guest';
        span.innerHTML = `${SET().glyphs[g.type]}<span class="food">${g.food}</span>`;
        span.title = `${pieceName(g.type)} … ${g.food}でおもてなし中`;
      } else {
        span.className = 'guest plain';
        span.innerHTML = pieceHtml(g.type, color === 'w' ? 'b' : 'w');
      }
      area.appendChild(span);
    });
    if (list.length === 0 || (animal && area.children.length === 0 && list.length === 0)) {
      if (list.length === 0) {
        const empty = document.createElement('span');
        empty.style.cssText = 'font-size:0.78rem;color:#c9b28a;';
        empty.textContent = animal ? 'おきゃくさまをおまちしています…' : 'まだありません';
        area.appendChild(empty);
      }
    }
  }
}
let lastCapturer = null;

// 馬車アニメーション
function carriageRide(move) {
  const animal = isAnimal();
  const capturedType = move.captured;
  const capturer = move.color;
  const victim = capturer === 'w' ? 'b' : 'w';
  if (!animal) { renderVenues(); sCapture(); return; }

  sCarriage();
  lastCapturer = capturer;
  pendingGuests++;
  const wrap = $('board-wrap');
  const sqEl = boardEl.querySelector(`[data-square="${move.to}"]`);
  const wrapRect = wrap.getBoundingClientRect();
  const sqRect = sqEl.getBoundingClientRect();
  const startX = sqRect.left - wrapRect.left;
  const startY = sqRect.top - wrapRect.top;
  // 会場は capturer 側: 下の会場なら下へ、上の会場なら上へ
  const goingDown = venueOf(capturer) === $('venue-bottom');
  const endX = goingDown ? wrapRect.width - 150 : 10;
  const endY = goingDown ? wrapRect.height + 8 : -62;

  const el = document.createElement('div');
  el.className = 'carriage';
  el.innerHTML = `<span class="pony">🐴</span><span class="cart"><span class="rider">${SET().glyphs[capturedType]}</span><span class="wheel w1"></span><span class="wheel w2"></span></span>`;
  el.style.transform = `translate(${startX}px, ${startY}px)`;
  overlayEl.appendChild(el);
  // 反映後にゴールへ
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transform = `translate(${endX}px, ${endY}px)`;
  }));
  const name = pieceName(capturedType);
  toast(`🐴ガラガラ… ${name}が馬車にのって${colorJa(capturer)}チームの会場へ!`);
  setTimeout(() => {
    el.remove();
    if (pendingGuests > 0) pendingGuests--;
    renderVenues();
    const hist = game.history({ verbose: true });
    let capIdx = -1, food = FOODS[0];
    for (const m of hist) if (m.captured) { capIdx++; food = foodFor(capIdx, m.captured); }
    toast(`🏰 ${name}は${food}でおもてなしされています♪`);
  }, 1900);
}

// ===== ステータス =====
function turnBadge() {
  const set = SET();
  const c = game.turn();
  const glyph = set.emoji ? set.glyphs.k : (c === 'w' ? '♔' : '♚');
  return `${glyph} ${colorJa(c)}チームのばん`;
}
function renderStatus() {
  if (mode === 'replay') {
    statusEl.innerHTML = `📜 きふ さいせいちゅう (${replay.idx} / ${replay.sans.length}手)`;
    return;
  }
  if (mode === 'puzzle') {
    const p = PUZZLES[puzzle.idx];
    if (!p) { statusEl.textContent = '🧩 パズルをえらんでね'; return; }
    if (game.in_checkmate()) { statusEl.innerHTML = '🎉 チェックメイト!せいかい!'; return; }
    statusEl.innerHTML = `🧩 ${colorJa(p.turn)}ばん: あと${puzzle.movesLeft}手でチェックメイトしよう!`;
    return;
  }
  if (game.game_over()) {
    statusEl.innerHTML = gameOverText().short;
    return;
  }
  let html = turnBadge();
  if (cpuThinking) html = `<span class="thinking">🤔 コンピューターがかんがえちゅう…</span>`;
  else if (hintThinking) html = `<span class="thinking">💡 ヒントをかんがえちゅう…</span>`;
  else if (game.in_check()) html += ' ⚠️ チェック!';
  renderStatusExtra(html);
}
function renderStatusExtra(html) { statusEl.innerHTML = html; }

function gameOverText() {
  if (game.in_checkmate()) {
    const winner = game.turn() === 'w' ? 'b' : 'w';
    const vsCpu = settings.opponent === 'cpu' && mode === 'play';
    const playerWon = vsCpu && winner === settings.playerColor;
    if (vsCpu) {
      return playerWon
        ? { short: '🎉 チェックメイト!あなたのかち!', emoji: '🎉🏆🎉', text: 'チェックメイト!あなたのかち!すごい!' }
        : { short: '😢 チェックメイト…まけちゃった', emoji: '🌧️🐾', text: 'まけちゃった…つぎはきっとかてるよ!' };
    }
    return { short: `🎉 チェックメイト!${colorJa(winner)}チームのかち!`, emoji: '🎉🏆🎉', text: `チェックメイト!${colorJa(winner)}チームのかち!` };
  }
  if (game.in_stalemate()) return { short: '🤝 ステイルメイト!ひきわけ', emoji: '🤝', text: 'ステイルメイト!ひきわけだよ' };
  if (game.in_threefold_repetition()) return { short: '🤝 くりかえしでひきわけ', emoji: '🔁', text: 'おなじ局面が3回…ひきわけだよ' };
  if (game.insufficient_material()) return { short: '🤝 ひきわけ', emoji: '🤝', text: 'おたがいチェックメイトできないのでひきわけ' };
  return { short: '🤝 ひきわけ', emoji: '🤝', text: 'ひきわけだよ' };
}

function confetti() {
  const emojis = ['🎉', '✨', '🌸', '⭐', '🎊', '💮', '🍀'];
  for (let i = 0; i < 26; i++) {
    const el = document.createElement('span');
    el.className = 'confetti';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = 1.8 + Math.random() * 1.6 + 's';
    el.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }
}

function showGameOver() {
  const info = gameOverText();
  $('gameover-emoji').textContent = info.emoji;
  $('gameover-text').textContent = info.text;
  $('gameover-modal').classList.remove('hidden');
  if (info.emoji.includes('🎉') || info.emoji.includes('🏆')) { sWin(); confetti(); }
  else sBad();
}

// ===== 棋譜リスト =====
function renderMovelist() {
  const ol = $('movelist');
  ol.innerHTML = '';
  const hist = game.history();
  for (let i = 0; i < hist.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="no">${Math.floor(i / 2) + 1}${i % 2 === 0 ? '.' : '…'}</span>${hist[i]}`;
    ol.appendChild(li);
  }
  ol.scrollTop = ol.scrollHeight;
}

// ===== 手の適用(共通) =====
function applyMove(moveArg, opts = {}) {
  const m = game.move(moveArg);
  if (!m) return null;
  lastMove = { from: m.from, to: m.to };
  selected = null; legalTargets = []; hintSquares = [];
  if (m.captured) carriageRide(m); else sMove();
  renderAll();
  if (game.in_check() && !game.game_over()) sCheck();
  if (mode === 'play') {
    if (game.game_over()) { setTimeout(showGameOver, m.captured && isAnimal() ? 2100 : 500); }
    else if (!opts.noCpu) maybeCpuMove();
  }
  return m;
}

function maybeCpuMove() {
  if (mode !== 'play' || settings.opponent !== 'cpu') return;
  if (game.game_over() || cpuThinking) return;
  if (game.turn() === settings.playerColor) return;
  cpuThinking = true;
  renderStatus();
  Engine.chooseMove(game.fen(), settings.level, (mv) => {
    cpuThinking = false;
    if (!mv || mode !== 'play') { renderStatus(); return; }
    applyMove({ from: mv.from, to: mv.to, promotion: mv.promotion });
  });
}

// ===== クリック操作 =====
function playerCanMoveNow() {
  if (cpuThinking || puzzle.busy) return false;
  if (mode === 'replay') return false;
  if (game.game_over()) return false;
  if (mode === 'puzzle') {
    const p = PUZZLES[puzzle.idx];
    return !!p && game.turn() === p.turn;
  }
  if (settings.opponent === 'cpu') return game.turn() === settings.playerColor;
  return true; // ふたりで遊ぶ
}
function onSquareClick(sq) {
  if (!playerCanMoveNow()) return;
  hintSquares = [];
  const target = legalTargets.find((m) => m.to === sq);
  if (selected && target) {
    const promos = legalTargets.filter((m) => m.to === sq && m.promotion);
    if (promos.length > 0) { showPromotion(selected, sq); return; }
    tryPlayerMove({ from: selected, to: sq });
    return;
  }
  const pc = game.get(sq);
  if (pc && pc.color === game.turn()) {
    selected = sq;
    legalTargets = game.moves({ square: sq, verbose: true });
  } else {
    selected = null; legalTargets = [];
  }
  renderPosition();
}

function tryPlayerMove(moveArg) {
  if (mode === 'puzzle') { puzzleTryMove(moveArg); return; }
  applyMove(moveArg);
}

// プロモーション
function showPromotion(from, to) {
  const modal = $('promo-modal');
  const box = $('promo-choices');
  box.innerHTML = '';
  const color = game.turn();
  for (const t of ['q', 'r', 'b', 'n']) {
    const btn = document.createElement('button');
    btn.innerHTML = SET().emoji ? SET().glyphs[t] : `<span class="piece glyph ${color}" style="font-size:2.2rem">${SET().glyphs[t]}</span>`;
    btn.title = pieceName(t);
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      tryPlayerMove({ from, to, promotion: t });
    });
    box.appendChild(btn);
  }
  modal.classList.remove('hidden');
}

// ===== ヒント =====
function requestHint() {
  if (mode === 'replay' || game.game_over() || cpuThinking || hintThinking) return;
  if (mode === 'play' && settings.opponent === 'cpu' && game.turn() !== settings.playerColor) return;
  const advisor = SET().emoji ? `${SET().glyphs.q} ${SET().names.q}せんせい` : '🧙 コーチ';
  if (mode === 'puzzle') {
    const p = PUZZLES[puzzle.idx];
    if (!p || game.turn() !== p.turn) return;
    const cands = Engine.mateMoves(game, puzzle.movesLeft);
    if (cands.length > 0) {
      const m = cands[0];
      hintSquares = [m.from, m.to];
      renderPosition();
      toast(`💡 ${advisor}: ${pieceName(m.piece)}をうごかしてみて!`);
    }
    return;
  }
  hintThinking = true;
  renderStatus();
  Engine.bestMove(game.fen(), (m) => {
    hintThinking = false;
    renderStatus();
    if (!m) return;
    hintSquares = [m.from, m.to];
    renderPosition();
    toast(`💡 ${advisor}のおすすめ: ${pieceName(m.piece)} ${m.from} → ${m.to}`);
  });
}

// ===== 新しいゲーム =====
function newGame() {
  game = new Chess();
  mode = 'play';
  selected = null; legalTargets = []; lastMove = null; hintSquares = [];
  cpuThinking = false; pendingGuests = 0; lastCapturer = null;
  overlayEl.innerHTML = '';
  orient = settings.opponent === 'cpu' ? settings.playerColor : 'w';
  buildBoard();
  renderAll();
  $('gameover-modal').classList.add('hidden');
  maybeCpuMove();
}

// ===== 待った =====
function undoMove() {
  if (mode !== 'play' || cpuThinking || game.history().length === 0) return;
  if (settings.opponent === 'cpu') {
    if (game.history().length < 2) return;
    game.undo(); game.undo();
  } else {
    game.undo();
  }
  pendingGuests = 0; lastCapturer = null;
  overlayEl.innerHTML = '';
  const hist = game.history({ verbose: true });
  lastMove = hist.length > 0 ? { from: hist[hist.length - 1].from, to: hist[hist.length - 1].to } : null;
  selected = null; legalTargets = []; hintSquares = [];
  renderAll();
  toast('↩️ 待った!ひとつまえにもどしたよ');
}

// ===== パズル =====
function renderPuzzleList() {
  const wrap = $('puzzle-list');
  wrap.innerHTML = '';
  PUZZLES.forEach((p, i) => {
    const btn = document.createElement('button');
    btn.className = 'puzzle-item' + (i === puzzle.idx ? ' active' : '');
    btn.innerHTML = `<span class="badge${p.mateIn === 2 ? ' m2' : ''}">${p.mateIn}手</span>${i + 1}. ${p.title}<span class="done">${solvedPuzzles.has(i) ? '✅' : ''}</span>`;
    btn.addEventListener('click', () => loadPuzzle(i));
    wrap.appendChild(btn);
  });
}
function loadPuzzle(i) {
  const p = PUZZLES[i];
  if (!p) return;
  game = new Chess(p.fen);
  mode = 'puzzle';
  puzzle = { idx: i, movesLeft: p.mateIn, busy: false };
  selected = null; legalTargets = []; lastMove = null; hintSquares = [];
  cpuThinking = false; pendingGuests = 0; lastCapturer = null;
  overlayEl.innerHTML = '';
  orient = p.turn;
  buildBoard();
  renderAll();
  renderPuzzleList();
  $('puzzle-title').textContent = `${i + 1}. ${p.title}`;
  $('puzzle-goal').textContent = `${colorJa(p.turn)}ばん: ${p.mateIn}手でチェックメイトさせよう!`;
  toast(`🧩 パズル「${p.title}」スタート!`);
}
function puzzleTryMove(moveArg) {
  const cands = Engine.mateMoves(game, puzzle.movesLeft);
  const hit = cands.find((m) => m.from === moveArg.from && m.to === moveArg.to
    && (!m.promotion || m.promotion === (moveArg.promotion || 'q')));
  if (!hit) {
    // 合法手だけどメイトにつながらない → 不正解
    sBad();
    boardEl.classList.add('shake');
    setTimeout(() => boardEl.classList.remove('shake'), 450);
    selected = null; legalTargets = [];
    renderPosition();
    toast('🐾 ざんねん!そのてでは つまないみたい。もういちど!');
    return;
  }
  applyMove({ from: hit.from, to: hit.to, promotion: hit.promotion });
  if (game.in_checkmate()) {
    puzzleSolved();
    return;
  }
  puzzle.movesLeft--;
  puzzle.busy = true;
  renderStatus();
  // 相手はいちばんねばる手で応じる
  setTimeout(() => {
    const replies = game.moves({ verbose: true });
    let best = null, bestCount = Infinity;
    for (const r of replies) {
      game.move(r);
      const count = Engine.mateMoves(game, puzzle.movesLeft).length;
      game.undo();
      if (count < bestCount) { bestCount = count; best = r; }
    }
    if (best) applyMove({ from: best.from, to: best.to, promotion: best.promotion });
    puzzle.busy = false;
    renderStatus();
  }, 700);
}
function puzzleSolved() {
  solvedPuzzles.add(puzzle.idx);
  saveSolved();
  renderPuzzleList();
  sWin(); confetti();
  const next = PUZZLES.findIndex((p, i) => !solvedPuzzles.has(i));
  setTimeout(() => {
    toast('🎉 せいかい!チェックメイト!', 3200);
    if (next >= 0) setTimeout(() => toast(`つぎは「${PUZZLES[next].title}」にちょうせんしてみてね`), 1500);
  }, 300);
}

// ===== 棋譜(PGN) =====
function loadPgnText(text) {
  const tmp = new Chess();
  if (!tmp.load_pgn(text.trim(), { sloppy: true })) {
    toast('😿 棋譜が読み込めなかったよ。PGN形式か確認してね');
    return;
  }
  const headers = tmp.header();
  replay.baseFen = headers.SetUp === '1' && headers.FEN ? headers.FEN : null;
  replay.sans = tmp.history();
  replay.idx = 0;
  mode = 'replay';
  selected = null; legalTargets = []; hintSquares = [];
  cpuThinking = false; pendingGuests = 0; lastCapturer = null;
  overlayEl.innerHTML = '';
  orient = 'w';
  buildBoard();
  $('replay-controls').classList.remove('hidden');
  replayGoTo(0);
  toast(`📜 ${replay.sans.length}手の棋譜を読み込んだよ!`);
}
function replayGoTo(idx) {
  replay.idx = Math.max(0, Math.min(idx, replay.sans.length));
  game = replay.baseFen ? new Chess(replay.baseFen) : new Chess();
  for (let i = 0; i < replay.idx; i++) game.move(replay.sans[i], { sloppy: true });
  const hist = game.history({ verbose: true });
  lastMove = hist.length > 0 ? { from: hist[hist.length - 1].from, to: hist[hist.length - 1].to } : null;
  $('replay-counter').textContent = `${replay.idx} / ${replay.sans.length}`;
  renderAll();
  renderReplayMovelist();
}
function renderReplayMovelist() {
  const ol = $('replay-movelist');
  ol.innerHTML = '';
  replay.sans.forEach((san, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="no">${Math.floor(i / 2) + 1}${i % 2 === 0 ? '.' : '…'}</span>${san}`;
    if (i === replay.idx - 1) li.classList.add('current');
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => replayGoTo(i + 1));
    ol.appendChild(li);
  });
  const cur = ol.querySelector('.current');
  if (cur) cur.scrollIntoView({ block: 'nearest' });
}
function replayToPlay() {
  if (mode !== 'replay') return;
  mode = 'play';
  settings.playerColor = game.turn();
  $('sel-color').value = settings.playerColor;
  saveSettings();
  orient = settings.opponent === 'cpu' ? settings.playerColor : 'w';
  buildBoard();
  renderAll();
  switchTab('play');
  toast(`🎮 ここから対局スタート!あなたは${colorJa(settings.playerColor)}だよ`);
  maybeCpuMove();
}

const SAMPLE_PGN = `[Event "オペラ座のゲーム"]
[Site "Paris"]
[Date "1858.11.02"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[Result "1-0"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7
8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7
14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`;

// ===== タブ =====
function switchTab(name) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.tab-page').forEach((p) => p.classList.toggle('active', p.id === 'tab-' + name));
}

// ===== 全体描画 =====
function renderAll() {
  renderPosition();
  renderVenues();
  renderStatus();
  renderMovelist();
}

// ===== イベント =====
function setupUI() {
  // ピースセット選択肢
  const selSet = $('sel-set');
  for (const key of Object.keys(PIECE_SETS)) {
    const opt = document.createElement('option');
    opt.value = key;
    const s = PIECE_SETS[key];
    opt.textContent = s.emoji ? `${s.glyphs.k} ${s.name}` : `♞ ${s.name}`;
    selSet.appendChild(opt);
  }
  selSet.value = settings.set;
  $('sel-opponent').value = settings.opponent;
  $('sel-level').value = String(settings.level);
  $('sel-color').value = settings.playerColor;
  $('btn-sound').textContent = settings.sound ? '🔊' : '🔇';
  $('row-level').style.display = settings.opponent === 'cpu' ? '' : 'none';
  $('row-color').style.display = settings.opponent === 'cpu' ? '' : 'none';

  selSet.addEventListener('change', () => {
    settings.set = selSet.value; saveSettings();
    renderAll();
    toast(`✨ ピースを「${SET().name}」にかえたよ!`);
  });
  $('sel-opponent').addEventListener('change', (e) => {
    settings.opponent = e.target.value; saveSettings();
    $('row-level').style.display = settings.opponent === 'cpu' ? '' : 'none';
    $('row-color').style.display = settings.opponent === 'cpu' ? '' : 'none';
    newGame();
  });
  $('sel-level').addEventListener('change', (e) => { settings.level = parseInt(e.target.value, 10); saveSettings(); });
  $('sel-color').addEventListener('change', (e) => { settings.playerColor = e.target.value; saveSettings(); newGame(); });

  $('btn-sound').addEventListener('click', () => {
    settings.sound = !settings.sound; saveSettings();
    $('btn-sound').textContent = settings.sound ? '🔊' : '🔇';
    if (settings.sound) sMove();
  });
  $('btn-new').addEventListener('click', newGame);
  $('btn-hint').addEventListener('click', requestHint);
  $('btn-undo').addEventListener('click', undoMove);
  $('btn-copy-pgn').addEventListener('click', () => {
    const pgn = game.pgn();
    if (!pgn) { toast('まだ棋譜がないよ'); return; }
    (navigator.clipboard ? navigator.clipboard.writeText(pgn) : Promise.reject())
      .then(() => toast('📋 棋譜をコピーしたよ!'))
      .catch(() => { $('pgn-input').value = pgn; switchTab('kifu'); toast('棋譜タブに書き出したよ'); });
  });

  document.querySelectorAll('.tab').forEach((t) => {
    t.addEventListener('click', () => switchTab(t.dataset.tab));
  });

  // パズル
  $('btn-puzzle-retry').addEventListener('click', () => { if (puzzle.idx >= 0) loadPuzzle(puzzle.idx); });
  $('btn-puzzle-hint').addEventListener('click', requestHint);

  // 棋譜
  $('btn-load-pgn').addEventListener('click', () => loadPgnText($('pgn-input').value));
  $('pgn-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { $('pgn-input').value = reader.result; loadPgnText(reader.result); };
    reader.readAsText(file);
    e.target.value = '';
  });
  $('btn-sample-pgn').addEventListener('click', () => { $('pgn-input').value = SAMPLE_PGN; loadPgnText(SAMPLE_PGN); });
  $('btn-replay-first').addEventListener('click', () => replayGoTo(0));
  $('btn-replay-prev').addEventListener('click', () => replayGoTo(replay.idx - 1));
  $('btn-replay-next').addEventListener('click', () => replayGoTo(replay.idx + 1));
  $('btn-replay-last').addEventListener('click', () => replayGoTo(replay.sans.length));
  $('btn-replay-play').addEventListener('click', replayToPlay);

  // モーダル
  $('promo-modal').addEventListener('click', (e) => {
    if (e.target === $('promo-modal')) { $('promo-modal').classList.add('hidden'); selected = null; legalTargets = []; renderPosition(); }
  });
  $('btn-gameover-close').addEventListener('click', () => $('gameover-modal').classList.add('hidden'));
  $('btn-gameover-new').addEventListener('click', newGame);

  renderPuzzleList();
  $('puzzle-title').textContent = 'パズルをえらんでね';
  $('puzzle-goal').textContent = 'したのリストからちょうせんするパズルをタップ!';
}

// ===== 起動 =====
loadSaved();
setupUI();
newGame();

})();

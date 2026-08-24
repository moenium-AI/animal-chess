// Animal Chess main application. / どうぶつチェスのメインアプリ。
(() => {
'use strict';

// ===== State / 状態 =====
let game = new Chess();
let mode = 'play'; // 'play' | 'puzzle' | 'replay'
let settings = { set: 'farm', opponent: 'cpu', level: 4, playerColor: 'w', sound: true, bgm: true, bgmSong: 'auto', viewMode: '3d', badges: true, language: 'ja' };
let orient = 'w';            // Board-side color. / 盤の下側の色。
let selected = null;         // Selected square. / 選択中のマス。
let legalTargets = [];       // Legal moves from the selected square. / 選択中マスからの合法手。
let lastMove = null;         // {from,to}
let hintSquares = [];
let cpuThinking = false;
let hintThinking = false;
let pendingGuests = 0;       // Pieces in transit by carriage, not yet shown at the venue. / 馬車で移動中で、まだ会場に表示しないコマの数。
let replay = { baseFen: null, sans: [], notes: [], idx: 0, meta: null, annotation: null };
let puzzle = { idx: -1, movesLeft: 0, busy: false };
let solvedPuzzles = new Set();

// ===== DOM =====
const $ = (id) => document.getElementById(id);
const boardEl = $('board');
const overlayEl = $('overlay');
const statusEl = $('status-bar');

// ===== Persistence / 保存・読み込み =====
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
const is3D = () => settings.viewMode === '3d';
const isAnimal = () => is3D() || !!SET().emoji;
const pieceName = (type) => I18N.language === 'en'
  ? ((SET().namesEn && SET().namesEn[type]) || I18N.t('piece.' + ({ k: 'king', q: 'queen', r: 'rook', b: 'bishop', n: 'knight', p: 'pawn' }[type])))
  : (is3D() ? Sprites.charName(type) + 'さん' : (SET().names[type] || PIECE_JA[type]));
const BADGE_GLYPHS = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
const badgesOn = () => settings.badges && (is3D() || SET().emoji);
const tr = (key, vars) => I18N.t(key, vars);
const BGM_NAMES_EN = ['Meadow Song', 'Strolling Waltz', 'Naptime Song', 'Feast Polka', 'Starlit Music Box', 'Rainy-Day Song', 'Exploration March', 'Dappled Sunlight Song', 'Sunset Song', 'Friendship Dance'];
const bgmSongName = (index) => I18N.language === 'en' ? (BGM_NAMES_EN[index] || BGM.songNames()[index]) : BGM.songNames()[index];
function lessonText(lesson) { return I18N.language === 'en' && lesson.en ? lesson.en : lesson; }
function gameText(game) { return I18N.language === 'en' && game.en ? game.en : game; }

// ===== Sound / サウンド =====
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

// ===== Toasts / トースト =====
function toast(msg, ms = 2600) {
  const area = $('toast-area');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  area.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 450); }, ms);
}

// ===== Board / 盤面 =====
const FILES = 'abcdefgh';
function squareName(dispR, dispC) {
  if (orient === 'w') return FILES[dispC] + (8 - dispR);
  return FILES[7 - dispC] + (dispR + 1);
}
function buildBoard() {
  boardEl.innerHTML = '';
  $('board-wrap').classList.toggle('mode-3d', is3D());
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = squareName(r, c);
      const f = FILES.indexOf(sq[0]);
      const rank = parseInt(sq[1], 10);
      const div = document.createElement('div');
      div.className = 'square ' + ((f + rank) % 2 === 0 ? 'light' : 'dark');
      div.dataset.square = sq;
      div.style.zIndex = r + 1; // Stack front rows above back rows in 3D mode. / 3Dモードで手前の列が上に重なるように。
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
// Board piece elements by mode. / モード別の盤面用ピース要素。
function createPieceEl(type, color, sq) {
  if (is3D()) {
    const wrap = document.createElement('div');
    wrap.className = 'p3d';
    const cv = Sprites.makePiece(type, color);
    // Keep the sway phase fixed per square so redraws do not change the rhythm. / 再描画でリズムが変わらないよう、揺れの位相をマスごとに固定する。
    const f = FILES.indexOf(sq[0]);
    const rank = parseInt(sq[1], 10);
    cv.style.animationDelay = '-' + (((f * 7 + rank * 13) % 9) / 10).toFixed(1) + 's';
    wrap.appendChild(cv);
    return wrap;
  }
  const span = document.createElement('span');
  const set = SET();
  span.className = (set.emoji ? 'piece emoji ' : 'piece glyph ') + color;
  span.textContent = set.glyphs[type];
  return span;
}
function createBadge(type, color) {
  const b = document.createElement('span');
  b.className = 'type-badge ' + color;
  b.textContent = BADGE_GLYPHS[type];
  return b;
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
    // Remove existing pieces and dots, but keep coordinate labels. / 既存のコマとドットを消し、座標ラベルは残す。
    for (const child of [...div.children]) {
      if (!child.classList.contains('coord')) child.remove();
    }
    if (pc) {
      div.appendChild(createPieceEl(pc.type, pc.color, sq));
      if (badgesOn()) div.appendChild(createBadge(pc.type, pc.color));
    }
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

// ===== Banquet venues / おもてなし会場 =====
function venueOf(color) { // Venue for the given team to host captured pieces. / color側チームが取ったコマをもてなす会場。
  return color === orient ? $('venue-bottom') : $('venue-top');
}
function colorJa(c) { return tr(c === 'w' ? 'color.white' : 'color.black'); }
function computeGuests() {
  const hist = game.history({ verbose: true });
  const guests = { w: [], b: [] };
  let capIdx = 0;
  for (const m of hist) {
    if (m.captured) {
      guests[m.color].push({ type: m.captured, victim: m.color === 'w' ? 'b' : 'w', food: foodFor(capIdx, m.captured) });
      capIdx++;
    }
  }
  return guests;
}

function renderVenues() {
  const v3d = is3D();
  const animal = isAnimal();
  const guests = computeGuests();
  for (const color of ['w', 'b']) {
    const v = venueOf(color);
    v.classList.toggle('v3d', v3d);
    const title = v.querySelector('.venue-title');
    const area = v.querySelector('.venue-guests');
    const list = guests[color];
    const hideFrom = color === lastCapturer ? list.length - pendingGuests : list.length;
    const visible = list.slice(0, Math.max(0, hideFrom));

    if (v3d) {
      title.textContent = tr('venue.banquet', { color: colorJa(color) });
      banquetSync(color, area, visible);
      continue;
    }
    // Simple mode: remove any leftover banquet DOM. / シンプルモードでは残った宴会DOMを破棄する。
    if (area.dataset.bq) { area.innerHTML = ''; delete area.dataset.bq; delete banquets[color]; }
    title.textContent = animal
      ? tr('venue.hosting', { color: colorJa(color) })
      : tr('venue.captured', { color: colorJa(color) });
    area.innerHTML = '';
    visible.forEach((g) => {
      const span = document.createElement('span');
      if (animal) {
        span.className = 'guest';
        span.innerHTML = `${SET().glyphs[g.type]}<span class="food">${g.food}</span>`;
        span.title = tr('venue.hosted', { piece: pieceName(g.type), food: g.food });
      } else {
        span.className = 'guest plain';
        span.innerHTML = pieceHtml(g.type, g.victim);
      }
      area.appendChild(span);
    });
    if (visible.length === 0) {
      const empty = document.createElement('span');
      empty.style.cssText = 'font-size:0.78rem;color:#c9b28a;';
      empty.textContent = animal ? tr('venue.waiting') : tr('venue.none');
      area.appendChild(empty);
    }
  }
}
let lastCapturer = null;

// ===== 3D banquet venues / 3D宴会会場 =====
let banquets = {}; // color -> { area, guests: [{el, spr, itemEl, type, team, state, until, x}] }

function banquetSync(color, area, list) {
  let bq = banquets[color];
  if (!bq || bq.area !== area) {
    area.innerHTML = '';
    area.dataset.bq = '1';
    // Table and food. / テーブルとごちそう。
    const table = document.createElement('canvas');
    table.className = 'bq-table';
    const t = Sprites.itemCanvas('table');
    table.width = t.width; table.height = t.height;
    table.getContext('2d').drawImage(t, 0, 0);
    area.appendChild(table);
    const deco = [['meat', 'calc(50% - 34px)'], ['cake', 'calc(50% - 4px)'], ['mug', 'calc(50% + 24px)']];
    for (const [name, left] of deco) {
      const d = document.createElement('canvas');
      d.className = 'bq-deco';
      const src = Sprites.itemCanvas(name);
      d.width = src.width; d.height = src.height;
      d.getContext('2d').drawImage(src, 0, 0);
      d.style.left = left;
      d.style.width = (src.width * 2) + 'px';
      area.appendChild(d);
    }
    bq = banquets[color] = { area, guests: [] };
  }
  // Rebuild if the type does not match, for example after undo. / 待ったなどで型が合わない場合は作り直す。
  const mismatch = bq.guests.some((g, i) => !list[i] || g.type !== list[i].type || g.team !== list[i].victim);
  if (mismatch) {
    for (const g of bq.guests) g.el.remove();
    bq.guests = [];
  }
  while (bq.guests.length > list.length) bq.guests.pop().el.remove();
  while (bq.guests.length < list.length) {
    bq.guests.push(spawnGuest(bq, list[bq.guests.length]));
  }
}

function spawnGuest(bq, info) {
  const el = document.createElement('div');
  el.className = 'bq-guest';
  const spr = Sprites.makePiece(info.type, info.victim);
  spr.className = 'spr';
  spr.style.animationDelay = '-' + (Math.random() * 0.8).toFixed(2) + 's';
  const itemEl = document.createElement('canvas');
  itemEl.className = 'item';
  const zzz = document.createElement('span');
  zzz.className = 'bq-zzz';
  zzz.textContent = '💤';
  el.appendChild(spr); el.appendChild(itemEl); el.appendChild(zzz);
  const W = Math.max(120, bq.area.clientWidth);
  const x = 8 + Math.random() * (W - 60);
  el.style.left = x + 'px';
  bq.area.appendChild(el);
  const g = { el, spr, itemEl, type: info.type, team: info.victim, state: 'idle', until: Date.now() + 600 + Math.random() * 1500, x };
  return g;
}

function setGuestState(g, s) {
  const now = Date.now();
  g.el.classList.remove('eating', 'drinking', 'sleeping');
  g.state = s;
  if (s === 'stroll') {
    const W = Math.max(120, g.el.parentElement.clientWidth);
    const nx = 8 + Math.random() * (W - 60);
    const dist = Math.abs(nx - g.x);
    const dur = Math.max(0.5, dist / 30);
    g.el.style.transitionDuration = dur.toFixed(2) + 's';
    g.el.classList.toggle('flip', nx < g.x);
    g.el.style.left = nx + 'px';
    g.x = nx;
    g.until = now + dur * 1000 + 300;
  } else if (s === 'eat' || s === 'drink') {
    const name = s === 'eat' ? ['meat', 'cake', 'apple'][Math.floor(Math.random() * 3)] : 'mug';
    const src = Sprites.itemCanvas(name);
    g.itemEl.width = src.width; g.itemEl.height = src.height;
    g.itemEl.getContext('2d').drawImage(src, 0, 0);
    g.itemEl.style.width = (src.width * 2) + 'px';
    g.el.classList.add(s === 'eat' ? 'eating' : 'drinking');
    g.until = now + 2500 + Math.random() * 3500;
  } else if (s === 'sleep') {
    g.el.classList.add('sleeping');
    Sprites.redrawPiece(g.spr, true); // Close the eyes. / おめめを閉じる。
    g.until = now + 4000 + Math.random() * 5000;
  } else {
    g.until = now + 1000 + Math.random() * 2200;
  }
  if (s !== 'sleep') Sprites.redrawPiece(g.spr, false);
}

function pickGuestState() {
  const r = Math.random();
  if (r < 0.30) return 'stroll';
  if (r < 0.55) return 'eat';
  if (r < 0.70) return 'drink';
  if (r < 0.85) return 'sleep';
  return 'idle';
}

setInterval(() => {
  const now = Date.now();
  for (const color in banquets) {
    for (const g of banquets[color].guests) {
      if (g.state !== 'sleeping' && Math.random() < 0.07) {
        Sprites.redrawPiece(g.spr, true);
        setTimeout(() => Sprites.redrawPiece(g.spr, false), 150);
      }
      if (now >= g.until) setGuestState(g, pickGuestState());
    }
  }
}, 600);

// Blinking board pieces in 3D mode. / 3Dモードの盤上コマのまばたき。
setInterval(() => {
  if (!is3D()) return;
  const canvases = boardEl.querySelectorAll('.p3d canvas');
  if (canvases.length === 0) return;
  const cv = canvases[Math.floor(Math.random() * canvases.length)];
  Sprites.redrawPiece(cv, true);
  setTimeout(() => { if (cv.isConnected) Sprites.redrawPiece(cv, false); }, 160);
}, 1100);

// Carriage animation. / 馬車アニメーション。
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
  // Move toward the capturer's venue: downward for the lower venue, upward for the upper venue. / capturer側の会場へ。下の会場なら下へ、上の会場なら上へ。
  const goingDown = venueOf(capturer) === $('venue-bottom');
  const endX = goingDown ? wrapRect.width - 150 : 10;
  const endY = goingDown ? wrapRect.height + 8 : -62;
  const rideMs = is3D() ? 2200 : 1800;

  const el = document.createElement('div');
  let spin = null;
  if (is3D()) {
    el.className = 'carriage3d';
    const cv = document.createElement('canvas');
    el.appendChild(cv);
    const faceLeft = endX < startX;
    let frame = 0;
    Sprites.drawCarriage(cv, frame, capturedType, victim, faceLeft);
    spin = setInterval(() => {
      frame ^= 1;
      Sprites.drawCarriage(cv, frame, capturedType, victim, faceLeft);
    }, 160);
  } else {
    el.className = 'carriage';
    el.innerHTML = `<span class="pony">🐴</span><span class="cart"><span class="rider">${SET().glyphs[capturedType]}</span><span class="wheel w1"></span><span class="wheel w2"></span></span>`;
  }
  el.style.transform = `translate(${startX}px, ${startY}px)`;
  overlayEl.appendChild(el);
  // Move to the destination after applying the captured piece. / 反映後にゴールへ移動する。
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transform = `translate(${endX}px, ${endY}px)`;
  }));
  const name = pieceName(capturedType);
  toast(tr('venue.arriving', { name, color: colorJa(capturer), place: is3D() ? tr('venue.banquetPlace') : tr('venue.hostPlace') }));
  setTimeout(() => {
    if (spin) clearInterval(spin);
    el.remove();
    if (pendingGuests > 0) pendingGuests--;
    renderVenues();
    const hist = game.history({ verbose: true });
    let capIdx = -1, food = FOODS[0];
    for (const m of hist) if (m.captured) { capIdx++; food = foodFor(capIdx, m.captured); }
    toast(is3D()
      ? tr('venue.joined', { name })
      : tr('venue.simpleHosted', { name, food }));
  }, rideMs + 100);
}

// ===== Status / ステータス =====
function turnBadge() {
  const set = SET();
  const c = game.turn();
  const glyph = is3D() ? (c === 'w' ? '⚪' : '⚫') : (set.emoji ? set.glyphs.k : (c === 'w' ? '♔' : '♚'));
  return tr('venue.turn', { glyph, color: colorJa(c) });
}
function renderStatus() {
  if (mode === 'replay') {
    statusEl.innerHTML = tr('status.replay', { current: replay.idx, total: replay.sans.length });
    return;
  }
  if (mode === 'puzzle') {
    const p = PUZZLES[puzzle.idx];
    if (!p) { statusEl.textContent = tr('status.choosePuzzle'); return; }
    if (game.in_checkmate()) { statusEl.innerHTML = tr('status.checkmate'); return; }
    statusEl.innerHTML = tr('status.puzzleTurn', { color: colorJa(p.turn), moves: puzzle.movesLeft });
    return;
  }
  if (game.game_over()) {
    statusEl.innerHTML = gameOverText().short;
    return;
  }
  let html = turnBadge();
  if (cpuThinking) html = `<span class="thinking">${tr('status.cpuThinking')}</span>`;
  else if (hintThinking) html = `<span class="thinking">${tr('status.hintThinking')}</span>`;
  else if (game.in_check()) html += tr('status.check');
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
        ? { short: tr('game.playerWinShort'), emoji: '🎉🏆🎉', text: tr('game.playerWinText') }
        : { short: tr('game.playerLoseShort'), emoji: '🌧️🐾', text: tr('game.playerLoseText') };
    }
    return { short: tr('game.teamWinShort', { color: colorJa(winner) }), emoji: '🎉🏆🎉', text: tr('game.teamWinText', { color: colorJa(winner) }) };
  }
  if (game.in_stalemate()) return { short: tr('game.stalemateShort'), emoji: '🤝', text: tr('game.stalemateText') };
  if (game.in_threefold_repetition()) return { short: tr('game.repetitionShort'), emoji: '🔁', text: tr('game.repetitionText') };
  if (game.insufficient_material()) return { short: tr('game.insufficientShort'), emoji: '🤝', text: tr('game.insufficientText') };
  return { short: tr('game.drawShort'), emoji: '🤝', text: tr('game.drawText') };
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

// ===== Move list / 棋譜リスト =====
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

// ===== Apply a move (shared path) / 手の適用（共通） =====
function applyMove(moveArg, opts = {}) {
  const m = game.move(moveArg);
  if (!m) return null;
  lastMove = { from: m.from, to: m.to };
  selected = null; legalTargets = []; hintSquares = [];
  if (m.captured) carriageRide(m); else sMove();
  renderAll();
  if (game.in_check() && !game.game_over()) sCheck();
  if (mode === 'play') {
    if (game.game_over()) { setTimeout(showGameOver, m.captured && isAnimal() ? (is3D() ? 2600 : 2100) : 500); }
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

// ===== Click interaction / クリック操作 =====
function playerCanMoveNow() {
  if (cpuThinking || puzzle.busy) return false;
  if (mode === 'replay') return false;
  if (game.game_over()) return false;
  if (mode === 'puzzle') {
    const p = PUZZLES[puzzle.idx];
    return !!p && game.turn() === p.turn;
  }
  if (settings.opponent === 'cpu') return game.turn() === settings.playerColor;
  return true; // Two-player mode. / ふたりで遊ぶ。
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

// Promotion. / プロモーション。
function showPromotion(from, to) {
  const modal = $('promo-modal');
  const box = $('promo-choices');
  box.innerHTML = '';
  const color = game.turn();
  for (const t of ['q', 'r', 'b', 'n']) {
    const btn = document.createElement('button');
    if (is3D()) {
      btn.appendChild(Sprites.makePiece(t, color));
    } else {
      btn.innerHTML = SET().emoji ? SET().glyphs[t] : `<span class="piece glyph ${color}" style="font-size:2.2rem">${SET().glyphs[t]}</span>`;
    }
    btn.title = pieceName(t);
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      tryPlayerMove({ from, to, promotion: t });
    });
    box.appendChild(btn);
  }
  modal.classList.remove('hidden');
}

// ===== Hints / ヒント =====
function requestHint() {
  if (mode === 'replay' || game.game_over() || cpuThinking || hintThinking) return;
  if (mode === 'play' && settings.opponent === 'cpu' && game.turn() !== settings.playerColor) return;
  const advisor = I18N.language === 'en'
    ? (is3D() ? '🐱 Cat Coach' : '🧙 Coach')
    : (is3D() ? '🐱 ねこせんせい' : (SET().emoji ? `${SET().glyphs.q} ${SET().names.q}せんせい` : '🧙 コーチ'));
  if (mode === 'puzzle') {
    const p = PUZZLES[puzzle.idx];
    if (!p || game.turn() !== p.turn) return;
    const cands = Engine.mateMoves(game, puzzle.movesLeft);
    if (cands.length > 0) {
      const m = cands[0];
      hintSquares = [m.from, m.to];
      renderPosition();
      toast(tr('toast.hintPuzzle', { advisor, piece: pieceName(m.piece) }));
    }
    return;
  }
  hintThinking = true;
  renderStatus();
  const fenBefore = game.fen();
  Engine.bestMove(fenBefore, (m) => {
    hintThinking = false;
    renderStatus();
    if (!m) return;
    hintSquares = [m.from, m.to];
    renderPosition();
    const why = explainHintMove(fenBefore, m);
    toast(tr('toast.hintMove', { advisor, piece: pieceName(m.piece), from: m.from, to: m.to, why }), 5200);
  });
}

// Calculate capture sequences with static exchange evaluation (SEE). / 静的交換評価（SEE）で取り合いの結果を計算する。
// Return the final material gain if captures continue on that square. / そのマスで取り返しが続いた場合の最終的な得点を返す。
// Without this, the hint could incorrectly call a defended piece free to take. / これがないと、守られたコマまで「ただで取れる」と誤って案内してしまう。
function evalCaptureExchange(fenBefore, m) {
  const VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 };
  const g = new Chess(fenBefore);
  const mv = g.move({ from: m.from, to: m.to, promotion: m.promotion });
  if (!mv || !mv.captured) return { see: 0, recapture: false };
  const target = mv.to;
  const gains = [VAL[mv.captured]];
  let occupant = VAL[mv.promotion || mv.piece]; // Value of the piece currently on that square. / そのマスにあるコマの価値。
  let recapture = false;
  let d = 0;
  while (d < 12) {
    // Choose the cheapest available recapturing piece. / 取り返せるコマのうち最も安いものを選ぶ。
    const list = (typeof g.fast_moves === 'function' ? g.fast_moves() : g.moves({ verbose: true }))
      .filter((x) => x.to === target && x.captured);
    if (list.length === 0) break;
    list.sort((a, b) => VAL[a.piece] - VAL[b.piece]);
    const r = list[0];
    if (d === 0) recapture = true;
    d++;
    gains[d] = occupant - gains[d - 1];
    occupant = VAL[r.promotion || r.piece];
    g.move({ from: r.from, to: r.to, promotion: r.promotion });
  }
  // A side may stop the exchange, so fold the result backward. / 途中でやめる選択もあるため、後ろから畳んで損得を出す。
  for (let i = d; i > 0; i--) gains[i - 1] = -Math.max(-gains[i - 1], gains[i]);
  return { see: gains[0], recapture };
}

// Explain why the suggested move is useful from its characteristics. / 推奨手の特徴から「なぜその手か」を独自に説明する。
function explainHintMove(fenBefore, m) {
  const VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  const g = new Chess(fenBefore);
  const mv = g.move({ from: m.from, to: m.to, promotion: m.promotion });
  if (!mv) return tr('hint.good');
  const reasons = [];
  if (g.in_checkmate()) return tr('hint.mate');
  // Capture. / 駒を取る。
  if (mv.captured) {
    const cap = pieceName(mv.captured);
    // Read through the recapture before choosing words; do not call a defended piece free. / 取り返しまで読んでから、守られたコマを「ただ」と言わない。
    const ex = evalCaptureExchange(fenBefore, m);
    if (!ex.recapture) reasons.push(tr('hint.freeCapture', { piece: cap }));
    else if (ex.see > 0) reasons.push(tr('hint.captureGain', { piece: cap }));
    else if (ex.see === 0) reasons.push(tr('hint.exchange', { piece: cap }));
    else reasons.push(tr('hint.capture', { piece: cap }));
  }
  // Promotion. / 成り。
  if (mv.promotion) reasons.push(tr('hint.promotion'));
  // Check. / チェック。
  if (g.in_check()) reasons.push(tr('hint.check'));
  // Castling. / キャスリング。
  if (mv.flags.includes('k') || mv.flags.includes('q')) reasons.push(tr('hint.castle'));
  // Central pawn advance. / 中央のポーン前進。
  if (mv.piece === 'p' && ['d4', 'e4', 'd5', 'e5'].includes(mv.to)) reasons.push(tr('hint.center'));
  // Minor-piece development from the starting rank. / 初期段からの軽いコマの展開。
  if ((mv.piece === 'n' || mv.piece === 'b')) {
    const backRank = mv.color === 'w' ? '1' : '8';
    if (mv.from[1] === backRank) reasons.push(tr('hint.develop'));
  }
  if (reasons.length === 0) reasons.push(tr('hint.general'));
  return '👉 ' + reasons.slice(0, 2).join('。') + '。';
}

// ===== New game / 新しいゲーム =====
function newGame() {
  game = new Chess();
  mode = 'play';
  replay.annotation = null;
  selected = null; legalTargets = []; lastMove = null; hintSquares = [];
  cpuThinking = false; pendingGuests = 0; lastCapturer = null;
  overlayEl.innerHTML = '';
  const sp = $('study-panel'); if (sp) sp.classList.add('hidden');
  orient = settings.opponent === 'cpu' ? settings.playerColor : 'w';
  buildBoard();
  renderAll();
  $('gameover-modal').classList.add('hidden');
  maybeCpuMove();
}

// ===== Undo / 待った =====
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
  toast(tr('toast.undo'));
}

// ===== Puzzles / パズル =====
// Prefer common Japanese katakana chess terms; add parentheses where the meaning may be unclear. / 一般的なカタカナのチェス用語を使い、意味が伝わりにくいものは括弧で補う。
const PUZZLE_THEME_JA = {
  backrank: 'バックランク', opening: '定跡の罠', knight: 'ナイト/フォーク',
  diagonal: '斜めライン', endgame: 'エンドゲーム', ladder: '二枚のルーク',
  sacrifice: 'サクリファイス(犠牲)', smother: 'スマザー・メイト(窒息)',
  queen: 'クイーンの寄せ', support: '支えの一撃',
};
const PUZZLE_THEME_EN = {
  backrank: 'Back rank', opening: 'Opening traps', knight: 'Knight / fork', diagonal: 'Diagonal line',
  endgame: 'Endgame', ladder: 'Two rooks', sacrifice: 'Sacrifice', smother: 'Smothered mate',
  queen: 'Queen finish', support: 'Supported attack',
};
let puzzleTheme = 'all';
let puzzleLevel = 'all';   // Filter by mate length. / 詰み手数で絞り込む。

function puzzleText(p) {
  const en = I18N.language === 'en' && typeof PUZZLE_EN !== 'undefined' ? PUZZLE_EN[PUZZLES.indexOf(p)] : null;
  return en ? { title: en[0], idea: en[1] } : p;
}
function puzzleThemeLabel(t) { return (I18N.language === 'en' ? PUZZLE_THEME_EN[t] : PUZZLE_THEME_JA[t]) || (I18N.language === 'en' ? 'Basics' : 'きほん'); }
// Difficulty labels based on mate length. / 詰み手数を目安にした難易度ラベル。
const PUZZLE_LEVEL_JA = { 1: '⭐ 1手詰め', 2: '⭐⭐ 2手詰め', 3: '⭐⭐⭐ 3手詰め' };

function renderPuzzleCats() {
  const wrap = $('puzzle-cats');
  if (!wrap) return;
  wrap.innerHTML = '';
  // First row: filter by difficulty (mate length). / 1行目: 難易度（詰み手数）で選ぶ。
  const levels = ['all'].concat([...new Set(PUZZLES.map((p) => p.mateIn))].sort((a, b) => a - b));
  for (const lv of levels) {
    const b = document.createElement('button');
    b.className = 'chip lv' + (lv === puzzleLevel ? ' active' : '');
    b.textContent = lv === 'all' ? tr('puzzle.allLevels') : (I18N.language === 'en' ? `⭐`.repeat(Number(lv)) + ` Mate in ${lv}` : (PUZZLE_LEVEL_JA[lv] || `${lv}手詰め`));
    b.addEventListener('click', () => { puzzleLevel = lv; renderPuzzleCats(); renderPuzzleList(); });
    wrap.appendChild(b);
  }
  // Second row: filter by theme. / 2行目: テーマで選ぶ。
  const themes = ['all'].concat([...new Set(PUZZLES.map((p) => p.theme))]);
  for (const t of themes) {
    const b = document.createElement('button');
    b.className = 'chip' + (t === puzzleTheme ? ' active' : '');
    b.textContent = t === 'all' ? tr('puzzle.allThemes') : puzzleThemeLabel(t);
    b.addEventListener('click', () => { puzzleTheme = t; renderPuzzleCats(); renderPuzzleList(); });
    wrap.appendChild(b);
  }
}
function renderPuzzleList() {
  const wrap = $('puzzle-list');
  wrap.innerHTML = '';
  PUZZLES.forEach((p, i) => {
    if (puzzleTheme !== 'all' && p.theme !== puzzleTheme) return;
    if (puzzleLevel !== 'all' && p.mateIn !== puzzleLevel) return;
    const btn = document.createElement('button');
    const text = puzzleText(p);
    btn.className = 'puzzle-item' + (i === puzzle.idx ? ' active' : '');
    btn.innerHTML = `<span class="badge m${p.mateIn}">${I18N.language === 'en' ? tr('puzzle.mateIn', { moves: p.mateIn }) : `${p.mateIn}手`}</span>` +
      `<span class="puz-name">${text.title}<span class="puz-theme">${puzzleThemeLabel(p.theme)}</span></span>` +
      `<span class="done">${solvedPuzzles.has(i) ? '✅' : ''}</span>`;
    btn.addEventListener('click', () => loadPuzzle(i));
    wrap.appendChild(btn);
  });
}
function loadPuzzle(i) {
  const p = PUZZLES[i];
  if (!p) return;
  game = new Chess(p.fen);
  mode = 'puzzle';
  replay.annotation = null;
  puzzle = { idx: i, movesLeft: p.mateIn, busy: false };
  selected = null; legalTargets = []; lastMove = null; hintSquares = [];
  cpuThinking = false; pendingGuests = 0; lastCapturer = null;
  overlayEl.innerHTML = '';
  $('study-panel').classList.add('hidden');
  orient = p.turn;
  buildBoard();
  renderAll();
  renderPuzzleList();
  const text = puzzleText(p);
  $('puzzle-title').innerHTML = `${text.title} <span class="puz-theme">${puzzleThemeLabel(p.theme)}</span>`;
  $('puzzle-goal').innerHTML = tr('puzzle.goal', { color: colorJa(p.turn), moves: p.mateIn, idea: text.idea });
  toast(tr('toast.puzzleStart', { title: text.title }));
}
function puzzleTryMove(moveArg) {
  const cands = Engine.mateMoves(game, puzzle.movesLeft);
  const hit = cands.find((m) => m.from === moveArg.from && m.to === moveArg.to
    && (!m.promotion || m.promotion === (moveArg.promotion || 'q')));
  if (!hit) {
    // Legal move, but it does not lead to mate → incorrect. / 合法手だがメイトにつながらない → 不正解。
    sBad();
    boardEl.classList.add('shake');
    setTimeout(() => boardEl.classList.remove('shake'), 450);
    selected = null; legalTargets = [];
    renderPosition();
    toast(tr('toast.puzzleWrong'));
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
  // Let the opponent choose the most resilient reply. / 相手はいちばん粘る手で応じる。
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
    toast(tr('toast.puzzleSolved'), 3200);
    if (next >= 0) setTimeout(() => toast(tr('toast.nextPuzzle', { title: puzzleText(PUZZLES[next]).title })), 1500);
  }, 300);
}

// ===== PGN records / 棋譜（PGN） =====
// Open study = { baseFen, sans[], notes[], meta:{title, sub, intro, takeaway} } in replay mode. / studyを再生モードで開く。
function enterStudy(study) {
  replay.baseFen = study.baseFen || null;
  replay.sans = study.sans;
  replay.notes = study.notes || [];
  replay.meta = study.meta || null;
  replay.annotation = study.annotation || null;
  replay.idx = 0;
  mode = 'replay';
  selected = null; legalTargets = []; hintSquares = [];
  cpuThinking = false; pendingGuests = 0; lastCapturer = null;
  overlayEl.innerHTML = '';
  orient = 'w';
  buildBoard();
  const panel = $('study-panel');
  panel.classList.remove('hidden');
  $('study-title').textContent = replay.meta ? replay.meta.title : tr('study.replay');
  $('study-meta').textContent = replay.meta && replay.meta.sub ? replay.meta.sub : '';
  replayGoTo(0);
}

function loadPgnText(text) {
  const tmp = new Chess();
  if (!tmp.load_pgn(text.trim(), { sloppy: true })) {
    toast(tr('toast.pgnBad'));
    return;
  }
  const headers = tmp.header();
  const baseFen = headers.SetUp === '1' && headers.FEN ? headers.FEN : null;
  const sans = tmp.history();
  const players = [headers.White, headers.Black].filter(Boolean).join(tr('games.vs'));
  enterStudy({
    baseFen, sans, notes: [],
    meta: { title: headers.Event || tr('study.loaded'), sub: players, intro: tr('study.intro'), takeaway: '' },
  });
  toast(tr('toast.pgnLoaded', { moves: sans.length }));
}

// Convert shared famous-game and lesson data ({fen, moves:[{san,note}]}) into study data. / 名局・レッスンの共通データをstudyに変換して開く。
function loadAnnotated(data, meta) {
  const text = data && data.moves && data.en ? gameText(data) : lessonText(data);
  const localizedMeta = meta ? {
    ...meta,
    title: meta.titleKey ? tr(meta.titleKey, { title: text.title }) : meta.title,
    sub: meta.subKey ? tr(meta.subKey) : meta.sub,
    intro: text.intro || meta.intro,
    takeaway: text.takeaway || meta.takeaway,
  } : null;
  enterStudy({
    baseFen: data.fen || null,
    sans: text.moves.map((m) => m.san),
    notes: text.moves.map((m) => m.note),
    meta: localizedMeta,
    annotation: { data, meta },
  });
}

function showStudyNote() {
  const i = replay.idx;
  let html = '';
  if (i === 0) html = (replay.meta && replay.meta.intro) || '';
  else html = replay.notes[i - 1] || '';
  if (i === replay.sans.length && replay.meta && replay.meta.takeaway) {
    html += `<div class="study-takeaway">💡 ${replay.meta.takeaway}</div>`;
  }
  $('study-note').innerHTML = html;
}

function replayGoTo(idx) {
  replay.idx = Math.max(0, Math.min(idx, replay.sans.length));
  game = replay.baseFen ? new Chess(replay.baseFen) : new Chess();
  for (let i = 0; i < replay.idx; i++) game.move(replay.sans[i], { sloppy: true });
  const hist = game.history({ verbose: true });
  lastMove = hist.length > 0 ? { from: hist[hist.length - 1].from, to: hist[hist.length - 1].to } : null;
  $('replay-counter').textContent = `${replay.idx} / ${replay.sans.length}`;
  showStudyNote();
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
function closeStudy() {
  $('study-panel').classList.add('hidden');
  newGame();
}
function replayToPlay() {
  if (mode !== 'replay') return;
  $('study-panel').classList.add('hidden');
  mode = 'play';
  settings.playerColor = game.turn();
  $('sel-color').value = settings.playerColor;
  saveSettings();
  orient = settings.opponent === 'cpu' ? settings.playerColor : 'w';
  buildBoard();
  renderAll();
  switchTab('game');
  toast(tr('toast.playFromHere', { color: colorJa(settings.playerColor) }));
  maybeCpuMove();
}

// ===== Learn lessons / まなぶ（レッスン） =====
const LEARN_CATS = [
  { key: 'opening', labelKey: 'learn.opening' },
  { key: 'combo', labelKey: 'learn.combo' },
  { key: 'endgame', labelKey: 'learn.endgame' },
];
const CAT_KEY = { opening: 'learn.catOpening', combo: 'learn.catCombo', endgame: 'learn.catEndgame' };
let learnCat = 'opening';

function renderLearnCats() {
  const wrap = $('learn-cats');
  wrap.innerHTML = '';
  for (const c of LEARN_CATS) {
    const b = document.createElement('button');
    b.className = 'chip' + (c.key === learnCat ? ' active' : '');
    b.textContent = tr(c.labelKey);
    b.addEventListener('click', () => { learnCat = c.key; renderLearnCats(); renderLearnList(); });
    wrap.appendChild(b);
  }
}
function renderLearnList() {
  const wrap = $('learn-list');
  wrap.innerHTML = '';
  const list = (typeof LESSONS !== 'undefined' ? LESSONS : []).filter((l) => l.cat === learnCat);
  list.forEach((l) => {
    const b = document.createElement('button');
    b.className = 'study-item';
    const text = lessonText(l);
    b.innerHTML = `<span class="study-item-title">${text.title}</span><span class="study-item-sub">${text.intro.slice(0, I18N.language === 'en' ? 72 : 32)}…</span>`;
    b.addEventListener('click', () => {
      loadAnnotated(l, { titleKey: 'learn.studyTitle', subKey: CAT_KEY[l.cat] });
      toast(tr('toast.studyOpened', { title: text.title }));
    });
    wrap.appendChild(b);
  });
}
function renderGamesList() {
  const wrap = $('games-list');
  wrap.innerHTML = '';
  const list = (typeof FAMOUS_GAMES !== 'undefined' ? FAMOUS_GAMES : []);
  list.forEach((gm) => {
    const text = gameText(gm);
    const b = document.createElement('button');
    b.className = 'study-item';
    b.innerHTML = `<span class="study-item-title">🏆 ${text.title}</span>` +
      `<span class="study-item-sub">${I18N.language === 'en' ? `${text.white} vs. ${text.black} · ${gm.year}` : `${text.white} 対 ${text.black}・${gm.year}`}</span>`;
    b.addEventListener('click', () => {
      loadAnnotated(gm, {
        title: `🏆 ${text.title}`,
        sub: I18N.language === 'en' ? `${text.white} vs. ${text.black} · ${gm.year} (${text.opening})` : `${text.white} 対 ${text.black}・${gm.year}(${text.opening})`,
        intro: text.intro, takeaway: text.takeaway,
      });
      toast(tr('toast.gameOpened', { title: text.title }));
    });
    wrap.appendChild(b);
  });
}

function refreshLanguage() {
  I18N.applyStatic();
  const selSet = $('sel-set');
  if (selSet) [...selSet.options].forEach((opt) => {
    const set = PIECE_SETS[opt.value];
    if (set) opt.textContent = set.emoji ? `${set.glyphs.k} ${I18N.language === 'en' ? set.nameEn : set.name}` : `♞ ${I18N.language === 'en' ? set.nameEn : set.name}`;
  });
  const selBgm = $('sel-bgm');
  if (selBgm && selBgm.options.length > 0) {
    selBgm.options[0].textContent = tr('toast.bgmAuto').replace(/^🎵\s*/, '🔀 ');
    [...selBgm.options].slice(1).forEach((opt, index) => { opt.textContent = `${index + 1}. ${bgmSongName(index)}`; });
  }
  renderLearnCats(); renderLearnList(); renderGamesList(); renderPuzzleCats(); renderPuzzleList();
  renderAll();
  if (puzzle.idx >= 0 && mode === 'puzzle') {
    const p = PUZZLES[puzzle.idx];
    if (p) {
      const text = puzzleText(p);
      $('puzzle-title').innerHTML = `${text.title} <span class="puz-theme">${puzzleThemeLabel(p.theme)}</span>`;
      $('puzzle-goal').innerHTML = tr('puzzle.goal', { color: colorJa(p.turn), moves: p.mateIn, idea: text.idea });
    }
  }
  if (replay.annotation) {
    const idx = replay.idx;
    const source = replay.annotation;
    loadAnnotated(source.data, source.meta);
    replayGoTo(idx);
  } else if (mode === 'replay') {
    showStudyNote();
  }
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

// ===== Tabs, independent within each group / グループごとに独立したタブ =====
function switchTab(name) {
  const clicked = document.querySelector(`.tab[data-tab="${name}"]`);
  const group = clicked ? clicked.dataset.group : null;
  if (!group) return;
  document.querySelectorAll(`.tab[data-group="${group}"]`).forEach((t) => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll(`.tab-page[data-group="${group}"]`).forEach((p) => p.classList.toggle('active', p.id === 'tab-' + name));
}

// ===== Full render / 全体描画 =====
function renderAll() {
  renderPosition();
  renderVenues();
  renderStatus();
  renderMovelist();
}

// ===== Events / イベント =====
function setupUI() {
  I18N.applyStatic();
  const selLanguage = $('sel-language');
  selLanguage.value = I18N.language;
  selLanguage.addEventListener('change', (e) => {
    settings.language = e.target.value === 'en' ? 'en' : 'ja';
    saveSettings();
    I18N.setLanguage(settings.language);
    refreshLanguage();
  });
  // Piece-set options. / ピースセットの選択肢。
  const selSet = $('sel-set');
  for (const key of Object.keys(PIECE_SETS)) {
    const opt = document.createElement('option');
    opt.value = key;
    const s = PIECE_SETS[key];
    opt.textContent = s.emoji ? `${s.glyphs.k} ${I18N.language === 'en' ? s.nameEn : s.name}` : `♞ ${I18N.language === 'en' ? s.nameEn : s.name}`;
    selSet.appendChild(opt);
  }
  selSet.value = settings.set;
  $('sel-view').value = settings.viewMode;
  $('sel-opponent').value = settings.opponent;
  $('sel-level').value = String(settings.level);
  $('sel-color').value = settings.playerColor;
  $('chk-badges').checked = settings.badges;
  $('btn-sound').textContent = settings.sound ? '🔊' : '🔇';
  $('row-level').style.display = settings.opponent === 'cpu' ? '' : 'none';
  $('row-color').style.display = settings.opponent === 'cpu' ? '' : 'none';
  $('row-set').style.display = is3D() ? 'none' : '';

  $('sel-view').addEventListener('change', (e) => {
    settings.viewMode = e.target.value; saveSettings();
    $('row-set').style.display = is3D() ? 'none' : '';
    // Rebuild the venue. / 会場を作り直す。
    for (const color of ['w', 'b']) {
      const area = venueOf(color).querySelector('.venue-guests');
      area.innerHTML = ''; delete area.dataset.bq;
    }
    banquets = {};
    overlayEl.innerHTML = '';
    pendingGuests = 0;
    buildBoard();
    renderAll();
    toast(is3D() ? tr('toast.view3d') : tr('toast.viewSimple'));
  });
  $('chk-badges').addEventListener('change', (e) => {
    settings.badges = e.target.checked; saveSettings();
    renderPosition();
  });

  selSet.addEventListener('change', () => {
    settings.set = selSet.value; saveSettings();
    renderAll();
    toast(tr('toast.pieceChanged', { name: I18N.language === 'en' ? SET().nameEn : SET().name }));
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
  // BGM starts after the first user action because of browser autoplay restrictions. / ブラウザの自動再生制限のため、最初の操作をきっかけにBGMを開始する。
  $('btn-bgm').classList.toggle('muted', !settings.bgm);
  $('btn-bgm').addEventListener('click', () => {
    settings.bgm = !settings.bgm; saveSettings();
    $('btn-bgm').classList.toggle('muted', !settings.bgm);
    if (settings.bgm) BGM.start(); else BGM.stop();
    toast(settings.bgm ? tr('toast.bgmOn') : tr('toast.bgmOff'));
  });
  document.addEventListener('pointerdown', () => { if (settings.bgm) BGM.start(); }, { once: true });

  // BGM selection: Auto cycles through all songs; an individual choice loops one song. / BGMの選択。オートは全曲順番に、個別指定はその曲を繰り返す。
  const selBgm = $('sel-bgm');
  const optAuto = document.createElement('option');
  optAuto.value = 'auto';
  optAuto.textContent = I18N.language === 'en' ? '🔀 Auto (all in order)' : '🔀 オート(ぜんぶ順番に)';
  selBgm.appendChild(optAuto);
  BGM.songNames().forEach((n, i) => {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = `${i + 1}. ${bgmSongName(i)}`;
    selBgm.appendChild(o);
  });
  selBgm.value = settings.bgmSong;
  if (!selBgm.value) { selBgm.value = 'auto'; settings.bgmSong = 'auto'; }
  BGM.setMode(settings.bgmSong);
  selBgm.addEventListener('change', (e) => {
    settings.bgmSong = e.target.value; saveSettings();
    BGM.setMode(settings.bgmSong);
    if (settings.bgm) BGM.start();
    toast(settings.bgmSong === 'auto'
      ? tr('toast.bgmAuto')
      : tr('toast.bgmSong', { name: bgmSongName(Number(settings.bgmSong)) }));
  });
  $('btn-new').addEventListener('click', newGame);
  $('btn-hint').addEventListener('click', requestHint);
  $('btn-undo').addEventListener('click', undoMove);
  $('btn-copy-pgn').addEventListener('click', () => {
    const pgn = game.pgn();
    if (!pgn) { toast(tr('toast.noPgn')); return; }
    (navigator.clipboard ? navigator.clipboard.writeText(pgn) : Promise.reject())
      .then(() => toast(tr('toast.pgnCopied')))
      .catch(() => { $('pgn-input').value = pgn; switchTab('load'); toast(tr('toast.pgnExported')); });
  });

  document.querySelectorAll('.tab').forEach((t) => {
    t.addEventListener('click', () => switchTab(t.dataset.tab));
  });

  // Puzzles. / パズル。
  $('btn-puzzle-retry').addEventListener('click', () => { if (puzzle.idx >= 0) loadPuzzle(puzzle.idx); });
  $('btn-puzzle-hint').addEventListener('click', requestHint);

  // PGN records. / 棋譜。
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
  $('btn-study-close').addEventListener('click', closeStudy);

  // Lessons and famous games. / まなぶ・名局。
  renderLearnCats();
  renderLearnList();
  renderGamesList();

  // Modal dialogs. / モーダル。
  $('promo-modal').addEventListener('click', (e) => {
    if (e.target === $('promo-modal')) { $('promo-modal').classList.add('hidden'); selected = null; legalTargets = []; renderPosition(); }
  });
  $('btn-gameover-close').addEventListener('click', () => $('gameover-modal').classList.add('hidden'));
  $('btn-gameover-new').addEventListener('click', newGame);

  renderPuzzleCats();
  renderPuzzleList();
  $('puzzle-title').textContent = tr('puzzle.select');
  $('puzzle-goal').textContent = tr('puzzle.filterHelp');
}

// ===== Startup / 起動 =====
loadSaved();
I18N.setLanguage(settings.language, false);
setupUI();
newGame();

})();

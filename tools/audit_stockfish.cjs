#!/usr/bin/env node
'use strict';
// Optional independent UCI engine audit; never replaces exhaustive mate tests.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawn } = require('node:child_process');
const { EventEmitter } = require('node:events');
const readline = require('node:readline');

function parseInfo(line) {
  if (!line.startsWith('info ')) return null;
  const depth = /\bdepth (\d+)\b/.exec(line);
  const score = /\bscore (cp|mate) (-?\d+)\b/.exec(line);
  if (!depth || !score) return null;
  return {
    depth: Number(depth[1]),
    kind: score[1],
    value: Number(score[2]),
    bound: /\b(?:lowerbound|upperbound)\b/.test(line),
    pv: /\bpv ([a-h][1-8][a-h][1-8][nbrq]?(?:\s+[a-h][1-8][a-h][1-8][nbrq]?)*)/.exec(line)?.[1] || null,
  };
}
function normalizedScore(info) {
  if (!info) return null;
  // Both searches start from the same position; UCI scores use that side's POV.
  if (info.kind === 'cp') return info.value;
  return Math.sign(info.value) * (100000 - Math.abs(info.value) * 100);
}
function getArgs(argv) {
  const options = { engine: process.env.STOCKFISH_PATH || 'stockfish', depth: 13,
    timeoutMs: 90000, thresholdCp: 250, output: null, include: 'all', max: 0, reportOnly: false };
  for (let i = 0; i < argv.length; i++) {
    const [raw, inline] = argv[i].split('=', 2);
    if (raw === '--report-only' && inline == null) { options.reportOnly = true; continue; }
    const flag = raw.replace(/^--/, '');
    if (!raw.startsWith('--') || !['engine','depth','timeout-ms','threshold-cp','output','include','max'].includes(flag))
      throw new Error('Unknown option: ' + argv[i]);
    const value = inline ?? argv[++i];
    if (value == null || !value) throw new Error('Missing value for ' + flag);
    const key = {'timeout-ms':'timeoutMs','threshold-cp':'thresholdCp'}[flag] || flag;
    options[key] = ['depth','timeoutMs','thresholdCp','max'].includes(key) ? Number(value) : value;
  }
  if (!Number.isInteger(options.depth) || options.depth < 4 || options.depth > 30) throw new Error('depth must be 4..30');
  if (!Number.isInteger(options.timeoutMs) || options.timeoutMs < 1000 || options.timeoutMs > 600000) throw new Error('timeout-ms must be 1000..600000');
  if (!Number.isInteger(options.thresholdCp) || options.thresholdCp < 0 || options.thresholdCp > 3000) throw new Error('threshold-cp must be 0..3000');
  if (!Number.isInteger(options.max) || options.max < 0 || options.max > 1000) throw new Error('max must be 0..1000');
  if (!['all','mate','tactic'].includes(options.include)) throw new Error('include must be all, mate, or tactic');
  return options;
}
class UciEngine {
  constructor(executable, timeoutMs) {
    this.proc = spawn(executable, [], { shell: false, stdio: ['pipe','pipe','pipe'], windowsHide: true });
    this.emitter = new EventEmitter();
    this.timeoutMs = timeoutMs;
    this.name = 'unknown UCI engine';
    this.stderr = '';
    this.closed = false;
    this.proc.on('error', e => this.emitter.emit('engine-error', e));
    this.proc.on('exit', (code, signal) => { this.closed = true; this.emitter.emit('engine-error', new Error(`Engine exited: ${code} (${signal})`)); });
    this.proc.stderr.setEncoding('utf8');
    this.proc.stderr.on('data', s => { this.stderr = (this.stderr + s).slice(-3000); });
    const rl = readline.createInterface({ input: this.proc.stdout, crlfDelay: Infinity });
    rl.on('line', line => { if (line.startsWith('id name ')) this.name = line.slice(8); this.emitter.emit('line', line); });
  }
  request(command, done) {
    return new Promise((resolve, reject) => {
      let last = null;
      const cleanup = () => { clearTimeout(timer); this.emitter.off('line', onLine); this.emitter.off('engine-error', onError); };
      const onError = e => { cleanup(); reject(e); };
      const onLine = line => {
        if (line.startsWith('info ')) {
          const info = parseInfo(line);
          if (info && !info.bound && (!last || info.depth >= last.depth)) last = info;
        }
        if (done(line)) { cleanup(); resolve({ line, info: last }); }
      };
      const timer = setTimeout(() => { cleanup(); this.proc.kill(); reject(new Error(`UCI timeout (${command})`)); }, this.timeoutMs);
      this.emitter.on('line', onLine);
      this.emitter.on('engine-error', onError);
      if (this.closed) { cleanup(); reject(new Error('UCI process already exited')); return; }
      this.proc.stdin.write(command + '\n');
    });
  }
  async init() {
    await this.request('uci', s => s === 'uciok');
    this.proc.stdin.write('setoption name Threads value 1\nsetoption name Hash value 32\n');
    await this.request('isready', s => s === 'readyok');
  }
  async analyze(fen, depth, searchMove=null) {
    this.proc.stdin.write('ucinewgame\n');
    this.proc.stdin.write('position fen ' + fen + '\n');
    await this.request('isready', s => s === 'readyok');
    const command = `go depth ${depth}` + (searchMove ? ` searchmoves ${searchMove}` : '');
    const response = await this.request(command, s => s.startsWith('bestmove '));
    const bestMove = response.line.split(/\s+/)[1];
    if (!response.info) throw new Error(`Engine gave no exact scored result for ${fen}`);
    if (searchMove && bestMove !== searchMove) throw new Error(`Engine ignored forced searchmove ${searchMove}: ${bestMove}`);
    return { ...response.info, bestMove, scoreCp: normalizedScore(response.info) };
  }
  quit() { if (!this.closed) { this.proc.stdin.write('quit\n'); this.proc.kill(); } }
}
function getChess() {
  const ctx = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.resolve(__dirname, '../js/chess.js'), 'utf8'), ctx);
  return vm.runInContext('Chess', ctx);
}
function uciFromSan(Chess, fen, san) {
  const board = new Chess(fen);
  const move = board.move(san);
  if (!move) throw new Error(`Illegal solution ${san} in ${fen}`);
  return `${move.from}${move.to}${move.promotion || ''}`;
}
function uciToSan(Chess, fen, uci) {
  if (!/^[a-h][1-8][a-h][1-8][nbrq]?$/.test(uci)) return null;
  const game = new Chess(fen);
  return game.move({from:uci.slice(0,2),to:uci.slice(2,4),promotion:uci[4]})?.san || null;
}
async function audit(opts) {
  const Chess = getChess();
  const all = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'puzzle_catalog.json'), 'utf8')).puzzles;
  const problems = all.filter(p => opts.include === 'all' || p.objective === opts.include).slice(0, opts.max || Infinity);
  const engine = new UciEngine(opts.engine, opts.timeoutMs);
  const results = [];
  let problemsDone = 0, movesChecked = 0;
  try {
    await engine.init();
    for (const p of problems) {
      const legal = new Chess(p.fen).moves({verbose:true});
      const legalUci = new Set(legal.map(m=>`${m.from}${m.to}${m.promotion || ''}`));
      const root = await engine.analyze(p.fen, opts.depth);
      if (root.bestMove !== '0000' && !legalUci.has(root.bestMove)) throw new Error(`Illegal engine move ${root.bestMove} for ${p.id}`);
      const accepted = p.solutions.map(san=>({san,uci:uciFromSan(Chess,p.fen,san)}));
      const item = {id:p.id,title:p.title,objective:p.objective,mateIn:p.mateIn,
        accepted:p.solutions,engineBestMove:root.bestMove,engineBestSan:uciToSan(Chess,p.fen,root.bestMove),
        engineBestScore:root.scoreCp,bestScoreType:root.kind,bestMate:root.kind==='mate'?root.value:null,
        reachedDepth:root.depth,solutions:[],flags:[]};
      if (root.depth < Math.min(10,opts.depth)) item.flags.push('low_engine_depth');
      const acceptedUci = new Set(accepted.map(a=>a.uci));
      if (p.objective==='mate' && root.kind === 'mate' && root.value > 0 && root.value <= p.mateIn && !acceptedUci.has(root.bestMove))
        item.flags.push('unregistered_mate_candidate');
      if (p.objective==='mate' && root.kind==='mate' && root.value > p.mateIn)
        item.flags.push('engine_mate_longer_than_advertised');
      if (p.objective==='mate' && root.kind!=='mate') item.flags.push('mate_not_verified_at_depth');
      for (const entry of accepted) {
        const forced = root.bestMove === entry.uci ? root : await engine.analyze(p.fen, opts.depth, entry.uci);
        const difference = root.scoreCp - forced.scoreCp;
        const info={san:entry.san,uci:entry.uci,scoreCp:forced.scoreCp,scoreType:forced.kind,scoreMate:forced.kind==='mate'?forced.value:null,lossVsBestCp:difference,depth:forced.depth};
        item.solutions.push(info);movesChecked++;
        if (p.objective==='tactic' && difference > opts.thresholdCp) item.flags.push(`tactic_move_below_best:${entry.san}`);
        if (p.objective==='mate' && forced.kind==='mate' && (forced.value < 1 || forced.value > p.mateIn)) item.flags.push(`mate_solution_disagrees:${entry.san}`);
        if (p.objective==='mate' && forced.kind!=='mate') item.flags.push(`mate_solution_not_verified:${entry.san}`);
      }
      item.flags = [...new Set(item.flags)];
      results.push(item); problemsDone++;
      console.error(`[${problemsDone}/${problems.length}] ${p.id}: ${item.flags.join(', ')||'OK'} (depth ${root.depth})`);
    }
    return {engine:engine.name, parameters:{depth:opts.depth,thresholdCp:opts.thresholdCp},
      summary:{analyzed:problemsDone,solutionMoves:movesChecked,flagged:results.filter(r=>r.flags.length).length},
      results};
  } finally { engine.quit(); }
}
async function main() {
  try {
    const opts = getArgs(process.argv.slice(2));
    const report = await audit(opts);
    const output = JSON.stringify(report,null,2)+'\n';
    if (opts.output) fs.writeFileSync(opts.output, output, {encoding:'utf8',flag:'w'});
    else process.stdout.write(output);
    process.exitCode = report.summary.flagged && !opts.reportOnly ? 2 : 0;
  } catch (e) { console.error('Stockfish audit unavailable or failed:', e.message); process.exitCode=1; }
}
if (require.main === module) main();
module.exports = { parseInfo, normalizedScore, getArgs, uciFromSan, uciToSan, UciEngine, audit };

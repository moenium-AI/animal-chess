#!/usr/bin/env node
'use strict';
// Normal-budget tournament analysis. A ply cap is CENSORED, never a chess draw.
// Preserve the legacy short-budget report format for backward compatibility.
const fs = require('node:fs');
const {summary: verifyReplay} = require('./summarize_ai_tournament.cjs');

function percentile(sorted, q) {
  if (!sorted.length) return null;
  return sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))];
}
function elo(score, n) {
  if (!n) return null;
  const p = (score + .5) / (n + 1); // finite estimate, even for a sweep
  return Math.round(400 * Math.log10(p / (1 - p)));
}
function lcg(seed) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}
function analyze(input, opts = {}) {
  if (!input.length || input.some(x => !Array.isArray(x.games))) throw Error('No tournament games');
  if (opts.requireFullBudget && input.some(x => !x.config || x.config.budgetScale !== 1))
    throw Error('Normal-budget results require --budget-scale 1');
  const games = input.flatMap(x => x.games);
  if (!games.length) throw Error('No games');
  const groups = new Map();
  for (const g of games) {
    if (!Number.isInteger(g.a) || !Number.isInteger(g.b) || g.a >= g.b ||
        g.white === g.black || ![g.a, g.b].includes(g.white) || ![g.a, g.b].includes(g.black))
      throw Error('Bad opponent or color');
    if (typeof g.completed !== 'boolean' || !['1-0', '0-1', '1/2-1/2'].includes(g.result))
      throw Error('Bad result');
    if ((!g.completed && g.reason !== 'ply-cap-draw') ||
        (g.completed && g.reason === 'ply-cap-draw'))
      throw Error('Incorrect ply-cap classification');
    const key = String(g.a) + '-' + String(g.b);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(g);
  }
  const rows = [];
  for (const [pair, matches] of groups) {
    const [a, b] = pair.split('-').map(Number);
    const clusters = new Map();
    let winB = 0, winA = 0, officialDraws = 0, unfinished = 0;
    const think = {[a]: {ms: 0, moves: 0}, [b]: {ms: 0, moves: 0}};
    for (const g of matches) {
      const key = g.opening + '|' + String(g.seed);
      if (!clusters.has(key)) clusters.set(key, []);
      clusters.get(key).push(g);
      if (!g.completed) unfinished++;
      else if (g.result === '1/2-1/2') officialDraws++;
      else if ((g.result === '1-0' ? g.white : g.black) === b) winB++;
      else winA++;
      for (const level of [a,b]) {
        const times = g.thinkMs && g.thinkMs[String(level)] || [];
        if (!Array.isArray(times) || times.some(t => !Number.isFinite(t) || t < 0)) throw Error('Invalid think times');
        think[level].moves += times.length;
        think[level].ms += times.reduce((s,x) => s+x, 0);
      }
    }
    for (const [key, pairGames] of clusters) {
      if (pairGames.length !== 2 || new Set(pairGames.map(g => g.white)).size !== 2)
        throw Error('Missing mirrored color game: ' + pair + ' ' + key);
    }
    const paired = [...clusters.values()];
    const completed = matches.length - unfinished;
    const scoreB = winB + officialDraws / 2;
    const bootScore = [], bootElo = [], bootCap = [];
    const random = lcg(0x1234abcd ^ Math.imul(a, 65537) ^ b);
    for (let i = 0; i < 6000; i++) {
      let n = 0, score = 0, cap = 0;
      for (let j = 0; j < paired.length; j++) {
        for (const g of paired[Math.floor(random() * paired.length)]) {
          if (!g.completed) {cap++; continue;}
          n++;
          if (g.result === '1/2-1/2') score += .5;
          else if ((g.result === '1-0' ? g.white : g.black) === b) score++;
        }
      }
      bootCap.push(cap / matches.length * 100);
      if (n) {
        bootScore.push(score / n * 100);
        bootElo.push(elo(score, n));
      }
    }
    bootCap.sort((x,y) => x-y);
    bootScore.sort((x,y) => x-y);
    bootElo.sort((x,y) => x-y);
    const interval = xs => xs.length ? [percentile(xs,.025),percentile(xs,.975)] : null;
    rows.push({
      a,b,games:matches.length,openingPairs:paired.length,
      winsB:winB,winsA:winA,officialDraws,completed,unfinished,
      unfinishedPct:+(100*unfinished/matches.length).toFixed(1),
      unfinishedPctPairedBootstrap95:interval(bootCap).map(v => +v.toFixed(1)),
      scorePctBCompletedOnly:completed ? +(100*scoreB/completed).toFixed(1) : null,
      scorePctPairedBootstrap95:interval(bootScore) && interval(bootScore).map(v => +v.toFixed(1)),
      eloGapBminusACompletedOnly:elo(scoreB,completed),
      eloPairedBootstrap95:interval(bootElo),
      meanThinkMs:{[a]:Math.round(think[a].ms / (think[a].moves||1)),[b]:Math.round(think[b].ms / (think[b].moves||1))}
    });
  }
  rows.sort((x,y) => x.a-y.a || x.b-y.b);
  return {
    schema: 1, method:'Actual Engine.chooseMove; full-budget check optional; completed games only in score and descriptive Elo; unfinished ply-cap games CENSORED and excluded, never draws; 6000 opening/seed/color-pair cluster bootstrap; excludes potential informative-censoring bias and does not provide absolute Elo.',
    games:games.length, completed:rows.reduce((s,r)=>s+r.completed,0),
    officialDraws:rows.reduce((s,r)=>s+r.officialDraws,0),
    unfinished:rows.reduce((s,r)=>s+r.unfinished,0),
    budgetScales:[...new Set(input.map(x => x.config && x.config.budgetScale))],
    pairs:rows
  };
}
function summarizeFiles(files,opts) {
  verifyReplay(files); // validates SAN, FEN, legality, result and completion
  return analyze(files.map(f => JSON.parse(fs.readFileSync(f,'utf8'))),opts);
}
function main(argv) {
  const files = [], flags = {requireFullBudget:false,out:null};
  for (let i=0;i<argv.length;i++) {
    if (argv[i]==='--require-full-time') flags.requireFullBudget=true;
    else if (argv[i]==='--output') flags.out=argv[++i];
    else if (argv[i].startsWith('--')) throw Error('Unknown option '+argv[i]);
    else files.push(argv[i]);
  }
  if (!files.length || !flags.out && argv.includes('--output')) throw Error('Usage: summarize_full_time_ai.cjs results.json ... [--require-full-time] [--output summary.json]');
  const data=summarizeFiles(files,{requireFullBudget:flags.requireFullBudget});
  if (flags.out) fs.writeFileSync(flags.out,JSON.stringify(data,null,2)+'\n');
  console.log(JSON.stringify(data,null,2));
}
if (require.main===module) {try{main(process.argv.slice(2));}catch(e){console.error(e.stack||e);process.exitCode=1;}}
module.exports={analyze,summarizeFiles,elo};

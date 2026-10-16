'use strict';
// Exercise the real carriage callbacks across a graphics switch. / 表示切替と遅延した馬車処理の競合を検査。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
const context = vm.createContext({assert, console});
vm.runInContext(`
let graphicsRevision = 0, pendingGuests = 0, lastCapturer = null;
let settings = {viewMode:'miniature'}, notices = 0, renders = 0, draws = [];
let timers = [], intervals = [], animationFrames = [];
const reducedMotion = {matches:false}, FOODS = ['food'];
const rect = {left:0, top:0, width:660, height:660};
function element() { return {style:{}, isConnected:false,
  appendChild(){}, remove(){this.isConnected=false;}, getBoundingClientRect:()=>rect}; }
const overlayEl = {children:[], appendChild(el){el.isConnected=true;this.children.push(el);},
  set innerHTML(_){for(const el of this.children) el.isConnected=false;this.children=[];} };
const bottom = element(), wrap = element(), sq = element();
const $ = id => id === 'venue-bottom' ? bottom : wrap;
const boardEl = {querySelector:()=>sq};
const document = {createElement:element};
const Sprites = {drawCarriage:(_c,_f,_t,_v,_l,style)=>draws.push(style)};
const isAnimal = ()=>true, isIllustrated = ()=>settings.viewMode !== 'simple';
const SET = ()=>({glyphs:{p:'P'}}), venueOf = ()=>bottom;
const toast = ()=>notices++, renderVenues = ()=>renders++;
const sCapture = ()=>{}, sCarriage = ()=>{}, pieceName = ()=> 'pawn', colorJa = ()=> 'white';
const tr = ()=>'', game = {history:()=>[]};
const setTimeout = fn => {timers.push(fn);return timers.length;};
const setInterval = fn => {intervals.push(fn);return intervals.length;};
const clearInterval = id => intervals[id-1] = null;
const requestAnimationFrame = fn => animationFrames.push(fn);
`, context);
for (const name of ['clearCarriages', 'carriageRide']) {
  const fn = source.match(new RegExp('^function ' + name + '\\([^]*?^}', 'm'));
  assert.ok(fn, name);
  vm.runInContext(fn[0], context);
}
vm.runInContext(`
carriageRide({captured:'p',color:'w',to:'d5'});
assert.equal(pendingGuests,1); assert.equal(draws[0],'miniature');
const obsoleteTimer = timers[0], obsoleteSpin = intervals[0];
clearCarriages(); settings.viewMode='3d';
assert.equal(pendingGuests,0); assert.equal(overlayEl.children.length,0);
const beforeNotices=notices, beforeDraws=draws.length;
carriageRide({captured:'p',color:'b',to:'e4'});
assert.equal(pendingGuests,1); assert.equal(draws.at(-1),'3d');
obsoleteSpin(); obsoleteTimer();
assert.equal(pendingGuests,1,'old ride must not decrement the new ride count');
assert.equal(notices,beforeNotices+1,'old ride must not show an arrival toast');
assert.equal(renders,0,'old ride must not redraw the new venue');
assert.equal(draws.length,beforeDraws+1,'old animation must stop drawing');
timers[1]();
assert.equal(pendingGuests,0); assert.equal(renders,1);
// Reduced motion skips the carriage and publishes the capture immediately.
reducedMotion.matches=true;
carriageRide({captured:'p',color:'w',to:'d5'});
assert.equal(pendingGuests,0); assert.equal(timers.length,2); assert.equal(renders,2);
console.log('PASS: obsolete carriage callbacks, independent new ride, reduced-motion capture');
`, context);

// やさしいBGM(Web Audioで生成・外部ファイルなし)
// Cメジャーペンタトニックの8小節ループ。ゆったりテンポ+柔らかい音色。
const BGM = (() => {
  let ctx = null, master = null, delayIn = null;
  let timer = null, playing = false, scheduledUntil = 0;

  const TEMPO = 84;
  const E8 = 60 / TEMPO / 2;   // 8分音符の秒数
  const LOOP = 64;             // 8小節 × 8分音符8個

  const freq = (m) => 440 * Math.pow(2, (m - 69) / 12);

  // メロディ [位置(8分), MIDIノート, 長さ(8分)]
  const MEL = [
    [0, 64, 2], [2, 67, 2], [4, 69, 2], [6, 67, 2],
    [8, 64, 2], [10, 62, 2], [12, 60, 4],
    [16, 69, 2], [18, 72, 2], [20, 69, 2], [22, 67, 2],
    [24, 67, 3], [27, 62, 1], [28, 64, 2], [30, 62, 2],
    [32, 64, 2], [34, 67, 2], [36, 69, 2], [38, 72, 2],
    [40, 72, 2], [42, 69, 2], [44, 67, 2], [46, 64, 2],
    [48, 69, 2], [50, 67, 2], [52, 64, 2], [54, 62, 2],
    [56, 62, 2], [58, 60, 6],
  ];
  // ベース(各小節の頭で全音符)
  const BASS = [[0, 48], [8, 45], [16, 41], [24, 43], [32, 48], [40, 45], [48, 41], [56, 43]];
  // パッド(和音を薄く)
  const PAD = [
    [0, [60, 67]], [8, [57, 64]], [16, [53, 60]], [24, [55, 62]],
    [32, [60, 67]], [40, [57, 64]], [48, [53, 60]], [56, [55, 62]],
  ];

  function ensure() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    // 柔らかい残響(ディレイ)
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.28;
    const fb = ctx.createGain(); fb.gain.value = 0.22;
    const wet = ctx.createGain(); wet.gain.value = 0.18;
    delay.connect(fb); fb.connect(delay);
    delay.connect(wet); wet.connect(master);
    delayIn = delay;
  }

  function note(midi, t, dur, type, vol, echo) {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq(midi);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.setValueAtTime(vol, Math.max(t + 0.02, t + dur - 0.1));
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    if (echo) {
      const s = ctx.createGain(); s.gain.value = 0.6;
      g.connect(s); s.connect(delayIn);
    }
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  function scheduleLoop(t0) {
    for (const [slot, midi, len] of MEL) note(midi, t0 + slot * E8, len * E8 * 0.95, 'triangle', 0.10, true);
    for (const [slot, midi] of BASS) note(midi, t0 + slot * E8, 8 * E8 * 0.95, 'sine', 0.09, false);
    for (const [slot, notes] of PAD) for (const m of notes) note(m, t0 + slot * E8, 8 * E8, 'sine', 0.028, false);
  }

  function tick() {
    if (!playing) return;
    const ahead = ctx.currentTime + 1.2;
    while (scheduledUntil < ahead) {
      scheduleLoop(scheduledUntil);
      scheduledUntil += LOOP * E8;
    }
  }

  function start() {
    ensure();
    if (ctx.state === 'suspended') ctx.resume();
    if (playing) return;
    playing = true;
    scheduledUntil = Math.max(scheduledUntil, ctx.currentTime + 0.1);
    tick();
    timer = setInterval(tick, 400);
  }

  function stop() {
    playing = false;
    if (timer) { clearInterval(timer); timer = null; }
    if (ctx) ctx.suspend();
  }

  return { start, stop };
})();

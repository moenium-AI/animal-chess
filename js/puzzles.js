// 自動生成: tools/verify_puzzles.py (python-chessで全数検証済み)
// theme=まなぶの要素, idea=狙いの解説(すべて独自に記述)
const PUZZLES = [
 {
  "title": "うらぐちからこんにちは",
  "theme": "backrank",
  "idea": "相手の玉の前のポーンが逃げ道をふさいでいる。一段目(バックランク)にルークを飛び込ませよう!",
  "fen": "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Re8#"
  ]
 },
 {
  "title": "ろうかのつきあたり",
  "theme": "backrank",
  "idea": "自分のポーンで塞がれた玉は一段目が弱点。ルークを送り込めば一発で詰む。",
  "fen": "6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rb8#"
  ]
 },
 {
  "title": "ななめのすきま",
  "theme": "diagonal",
  "idea": "ビショップの斜めのラインとクイーンの合わせ技。玉の斜めの逃げ道を封じてから寄せる。",
  "fen": "6k1/5p1p/6pQ/8/8/8/1B6/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qg7#"
  ]
 },
 {
  "title": "ななめラインのひみつ",
  "theme": "diagonal",
  "idea": "遠くのビショップが利いていることを見逃さない。斜めの支えがあればクイーンが飛び込める。",
  "fen": "6k1/p6p/6p1/8/7Q/8/1B6/5RK1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qd8#",
   "Qc4#"
  ]
 },
 {
  "title": "りょうそでのキング",
  "theme": "diagonal",
  "idea": "玉の両脇を自分のルークに塞がれると、クイーンが縦と斜めで逃げ道を全部消して一手で詰む。",
  "fen": "2rkr3/8/8/8/8/8/7Q/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qd6#"
  ]
 },
 {
  "title": "すみっこでつかまえた",
  "theme": "endgame",
  "idea": "終盤の基本『キング+ルークの詰め』。自分の玉で逃げ道を消し、ルックで最終列を封じる。",
  "fen": "7k/8/6K1/8/8/8/8/R7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Ra8#"
  ]
 },
 {
  "title": "はしっこの王さま",
  "theme": "endgame",
  "idea": "端に追い詰めた玉を、味方の玉で押さえてルックでとどめ。エンドゲームの型を体で覚えよう。",
  "fen": "k7/8/1K6/8/8/8/8/7R w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rh8#"
  ]
 },
 {
  "title": "クイーンのごあいさつ",
  "theme": "endgame",
  "idea": "『キング+クイーンの詰め』。クイーンを玉の隣に置くときは、必ず自分の玉で支えること。",
  "fen": "7k/8/5K2/8/8/8/8/6Q1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qg7#"
  ]
 },
 {
  "title": "おしろのうえのクイーン",
  "theme": "endgame",
  "idea": "向かい合った玉(オポジション)が決め手。逃げ道を全部消してからクイーンで王手する。",
  "fen": "1k6/8/1K6/8/8/8/8/6Q1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qg8#"
  ]
 },
 {
  "title": "とおくからのおうて",
  "theme": "endgame",
  "idea": "クイーンは遠くからでも玉の逃げ道を全部消せる。味方の玉とはさめば、離れていても安全に詰む。",
  "fen": "6k1/8/6K1/8/8/8/8/3Q4 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qd8#"
  ]
 },
 {
  "title": "もぐりこみメイト",
  "theme": "knight",
  "idea": "ナイトが玉のふところに潜り込む。自分の駒に囲まれた玉は、ナイトの一撃に弱い。",
  "fen": "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Nf7#"
  ]
 },
 {
  "title": "アラビアのわな",
  "theme": "knight",
  "idea": "ルークとナイトの連携『アラビアン・メイト』。隅の玉はナイトが逃げ道を消すと詰む。",
  "fen": "7k/R7/5N2/8/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rh7#"
  ]
 },
 {
  "title": "ローラーさくせん",
  "theme": "ladder",
  "idea": "二枚のルックの階段(ラダー)。一枚が逃げ道の段を封鎖し、もう一枚が王手して詰ます。",
  "fen": "7k/R7/1R6/8/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rb8#"
  ]
 },
 {
  "title": "2だんロケット",
  "theme": "ladder",
  "idea": "7段目を押さえたルックがあれば、もう一枚を8段目に送るだけで詰み。階段メイトの決めの形。",
  "fen": "7k/R7/8/8/8/8/8/1R4K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rb8#"
  ]
 },
 {
  "title": "かいだんのてっぺん",
  "theme": "ladder",
  "idea": "7段目を封じたルックがあれば、もう一枚を8段目に回すだけ。二枚のルックの基本の詰み。",
  "fen": "7k/1R6/8/8/8/8/8/R6K w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Ra8#"
  ]
 },
 {
  "title": "がくしゃのメイト",
  "theme": "opening",
  "idea": "定跡の落とし穴『4手詰め(スカラーズ・メイト)』。f7はキングしか守っていない最大の弱点。",
  "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qxf7#"
  ]
 },
 {
  "title": "さいそくのメイト",
  "theme": "opening",
  "idea": "史上最速の詰み『フールズ・メイト』。玉の斜めをうかつに開けると2手で詰まされる、という戒め。",
  "fen": "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
  "mateIn": 1,
  "turn": "b",
  "solutions": [
   "Qh4#"
  ]
 },
 {
  "title": "おうさまのおてつだい",
  "theme": "endgame",
  "idea": "玉とルックだけの詰め。まず自分の玉を近づけて、相手の玉を端の一マスへ追い込む。",
  "fen": "7k/8/5K2/8/8/8/8/R7 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Kf7",
   "Kg6"
  ]
 },
 {
  "title": "はしごをのぼって",
  "theme": "ladder",
  "idea": "二枚のルックで一段ずつ玉を追い上げる。まず片方で段を封じ、交互に王手して端へ押し込む。",
  "fen": "7k/8/R7/1R6/8/8/8/6K1 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Ra7",
   "Rb7"
  ]
 },
 {
  "title": "ツインタワーさくせん",
  "theme": "ladder",
  "idea": "離れた場所からでも、二枚のルックがあれば階段で確実に端まで追い詰められる。",
  "fen": "7k/8/8/8/8/8/R7/1R5K w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Ra7",
   "Rb7",
   "Rg1"
  ]
 },
 {
  "title": "クイーンのプレゼント",
  "theme": "sacrifice",
  "idea": "クイーンを捨ててでも、詰みが見えているなら踏み込む。守り駒を引きはがす犠牲の考え方。",
  "fen": "r5k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Qe8+"
  ]
 }
];

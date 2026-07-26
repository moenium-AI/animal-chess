// 自動生成: tools/verify_puzzles.py (python-chessで全数検証済み)
// theme=まなぶの要素, idea=狙いの解説(すべて独自に記述)
const PUZZLES = [
 {
  "title": "うらぐちからこんにちは",
  "theme": "backrank",
  "idea": "相手のキングの前のポーンが逃げ道をふさいでいる。一段目(バックランク)にルークを飛び込ませよう!",
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
  "idea": "自分のポーンで塞がれたキングは一段目が弱点。ルークを送り込めば一発で詰む。",
  "fen": "6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rb8#"
  ]
 },
 {
  "title": "とじたドア",
  "theme": "backrank",
  "idea": "クイーンも一段目の詰めに使える。ポーンで塞がれたキングへ横から飛び込む。",
  "fen": "6k1/5ppp/8/8/8/8/8/3Q2K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qd8#"
  ]
 },
 {
  "title": "よこどりメイト",
  "theme": "backrank",
  "idea": "守りのルークと向かい合ったら取ってしまおう。取った瞬間に一段目が詰む。",
  "fen": "3r2k1/5ppp/8/8/8/8/8/3R2K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rxd8#"
  ]
 },
 {
  "title": "はんたいがわの扉",
  "theme": "backrank",
  "idea": "キングが右端に寄っていても考え方は同じ。逃げ道のない一段目にルークを回す。",
  "fen": "7k/6pp/8/8/8/8/8/R5K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Ra8#"
  ]
 },
 {
  "title": "すみのいちげき",
  "theme": "backrank",
  "idea": "キングが隅にいても一段目は弱点。逃げ道がポーンでふさがれていれば、クイーンを横から送り込んで詰み。",
  "fen": "7k/5ppp/8/8/8/8/8/1Q5K w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qb8#"
  ]
 },
 {
  "title": "ななめのすきま",
  "theme": "diagonal",
  "idea": "ビショップの斜めのラインとクイーンの合わせ技。キングの斜めの逃げ道を封じてから寄せる。",
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
  "idea": "キングの両脇を自分のルークに塞がれると、クイーンが縦と斜めで逃げ道を全部消して一手で詰む。",
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
  "idea": "終盤の基本『キング+ルークの詰め』。自分のキングで逃げ道を消し、ルークで最終列を封じる。",
  "fen": "7k/8/6K1/8/8/8/8/R7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Ra8#"
  ]
 },
 {
  "title": "はしっこのキング",
  "theme": "endgame",
  "idea": "端に追い詰めたキングを、味方のキングで押さえてルークでとどめ。エンドゲームの型を体で覚えよう。",
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
  "idea": "『キング+クイーンの詰め』。クイーンをキングの隣に置くときは、必ず自分のキングで支えること。",
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
  "idea": "向かい合ったキング(オポジション)が決め手。逃げ道を全部消してからクイーンでチェックする。",
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
  "idea": "クイーンは遠くからでもキングの逃げ道を全部消せる。味方のキングとはさめば、離れていても安全に詰む。",
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
  "idea": "ナイトがキングのふところに潜り込む。自分の駒に囲まれたキングは、ナイトの一撃に弱い。",
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
  "idea": "ルークとナイトの連携『アラビアン・メイト』。隅のキングはナイトが逃げ道を消すと詰む。",
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
  "idea": "二枚のルークの階段(ラダー)。一枚が逃げ道の段を封鎖し、もう一枚がチェックして詰ます。",
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
  "idea": "7段目を押さえたルークがあれば、もう一枚を8段目に送るだけで詰み。階段メイトの決めの形。",
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
  "idea": "7段目を封じたルークがあれば、もう一枚を8段目に回すだけ。二枚のルークの基本の詰み。",
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
  "idea": "史上最速の詰み『フールズ・メイト』。キングの斜めをうかつに開けると2手で詰まされる、という戒め。",
  "fen": "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
  "mateIn": 1,
  "turn": "b",
  "solutions": [
   "Qh4#"
  ]
 },
 {
  "title": "コーナーのおうさま",
  "theme": "queen",
  "idea": "自分のキングが相手の逃げ道を消しているとき、クイーンは隣に飛び込んで一手で詰む。",
  "fen": "7k/Q7/6K1/8/8/8/8/8 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qb8#",
   "Qa8#",
   "Qh7#",
   "Qg7#"
  ]
 },
 {
  "title": "いきどまりのナイト",
  "theme": "smother",
  "idea": "自分の駒に囲まれたキングは、ナイトの飛び込みに弱い。周りが味方でふさがれたキングを一撃。",
  "fen": "6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Nf7#"
  ]
 },
 {
  "title": "かこまれナイト",
  "theme": "smother",
  "idea": "キングのまわりが味方のルークとポーンでびっしり。ナイトが飛び込めば逃げ場ゼロで詰む(窒息メイト)。",
  "fen": "6rk/5ppp/8/6N1/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Nxf7#"
  ]
 },
 {
  "title": "そらのてっぺんから",
  "theme": "support",
  "idea": "味方のポーンで支えれば、クイーンをキングの隣に置いても取られない。支えのあるチェックが決め手。",
  "fen": "6k1/8/7P/8/8/8/1Q6/7K w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qg7#"
  ]
 },
 {
  "title": "ルークの支え",
  "theme": "support",
  "idea": "7段目のルークがg7を守っている。支えを確認してからクイーンをキングの隣へ飛び込ませる。",
  "fen": "6k1/R7/8/4Q3/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qe8#",
   "Qb8#",
   "Qg7#"
  ]
 },
 {
  "title": "ナイトとクイーン",
  "theme": "support",
  "idea": "ナイトが h7・g8 の逃げ道を見張り、クイーンをそのナイトが支える。支えのあるチェックで隅のキングを仕留める。",
  "fen": "7k/8/5N2/8/8/8/8/6QK w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qg8#"
  ]
 },
 {
  "title": "おうさまのおてつだい",
  "theme": "endgame",
  "idea": "キングとルークだけの詰め。まず自分のキングを近づけて、相手のキングを端の一マスへ追い込む。",
  "fen": "7k/8/5K2/8/8/8/8/R7 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Kf7",
   "Kg6"
  ]
 },
 {
  "title": "たまをちかづけて",
  "theme": "endgame",
  "idea": "ルークだけでは詰まない。まず自分のキングを近づけて逃げ道を消してから、ルークで最終列を封じる。",
  "fen": "6k1/8/5K2/8/8/8/8/R7 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Rh1"
  ]
 },
 {
  "title": "はしごをのぼって",
  "theme": "ladder",
  "idea": "二枚のルークで一段ずつキングを追い上げる。まず片方で段を封じ、交互にチェックして端へ押し込む。",
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
  "idea": "離れた場所からでも、二枚のルークがあれば階段で確実に端まで追い詰められる。",
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
  "title": "かいだんをつくる",
  "theme": "ladder",
  "idea": "二枚のルークの階段。まず一枚で段を封鎖し、もう一枚を最終列へ回す二手の型。",
  "fen": "6k1/8/8/8/8/R7/1R6/7K w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Ra7",
   "Rb7"
  ]
 },
 {
  "title": "はしへおいこめ",
  "theme": "queen",
  "idea": "クイーンとキングの連係。まず逃げ道を消してから、支えのある一撃でとどめを刺す。",
  "fen": "7k/8/5K2/8/8/8/8/Q7 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Kf7+",
   "Kg6+",
   "Qa7",
   "Qg1"
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
 },
 {
  "title": "ルークでしとめる",
  "theme": "endgame",
  "idea": "キングとルークだけの寄せを三手で。自分のキングを一歩ずつ近づけ、相手のキングを端へ追い込んでから封じる。",
  "fen": "6k1/8/4K3/8/8/8/8/R7 w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Kf6"
  ]
 },
 {
  "title": "とおいかいだん",
  "theme": "ladder",
  "idea": "離れた二枚のルークで階段を作る。まず段を封じ、交互にチェックして三手で端まで押し込もう。",
  "fen": "3k4/8/8/8/8/8/R7/1R5K w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Ra7",
   "Rb7"
  ]
 },
 {
  "title": "クイーンのつめ",
  "theme": "queen",
  "idea": "クイーンで逃げ道を狭めつつ、自分のキングを近づける。三手先まで読み切る練習に。",
  "fen": "6k1/8/4K3/8/8/8/8/Q7 w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Kf6",
   "Qa7",
   "Qd4",
   "Qg1+"
  ]
 },
 {
  "title": "すみへのみちすじ",
  "theme": "queen",
  "idea": "隅のキングを追うときこそ落ち着いて。逃げ道を消す順番を間違えなければ三手で詰む。",
  "fen": "7k/8/4K3/8/8/8/8/1Q6 w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Kf6",
   "Qb7",
   "Qg1"
  ]
 }
];

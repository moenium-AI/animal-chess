// Auto-generated from tools/puzzle_catalog.json. Do not edit directly.
const PUZZLES = [
 {
  "title": "うらぐちからこんにちは",
  "theme": "backrank",
  "idea": "相手のキングの前のポーンが逃げ道をふさいでいる。相手の最終段（ここでは8段目）にルークを飛び込ませよう!",
  "fen": "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Re8#"
  ],
  "continuations": {
   "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1|1": [
    "Re8#"
   ]
  },
  "id": "puzzle-001",
  "objective": "mate"
 },
 {
  "title": "とじたドア",
  "theme": "backrank",
  "idea": "クイーンも相手の最終段（ここでは8段目）の詰めに使える。ポーンで塞がれたキングへ横から飛び込む。",
  "fen": "6k1/5ppp/8/8/8/8/8/3Q2K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qd8#"
  ],
  "continuations": {
   "6k1/5ppp/8/8/8/8/8/3Q2K1 w - - 0 1|1": [
    "Qd8#"
   ]
  },
  "id": "puzzle-003",
  "objective": "mate"
 },
 {
  "title": "よこどりメイト",
  "theme": "backrank",
  "idea": "守りのルークと向かい合ったら取ってしまおう。取った瞬間に相手の最終段（ここでは8段目）が詰む。",
  "fen": "3r2k1/5ppp/8/8/8/8/8/3R2K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rxd8#"
  ],
  "continuations": {
   "3r2k1/5ppp/8/8/8/8/8/3R2K1 w - - 0 1|1": [
    "Rxd8#"
   ]
  },
  "id": "puzzle-004",
  "objective": "mate"
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
  ],
  "continuations": {
   "6k1/5p1p/6pQ/8/8/8/1B6/6K1 w - - 0 1|1": [
    "Qg7#"
   ]
  },
  "id": "puzzle-007",
  "objective": "mate"
 },
 {
  "title": "ななめラインのひみつ",
  "theme": "diagonal",
  "idea": "遠くのビショップがキングの逃げ道を封じている。クイーンは横の8段目からも、斜めのラインからも詰ませられる。",
  "fen": "6k1/p6p/6p1/8/7Q/8/1B6/5RK1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qd8#",
   "Qc4#"
  ],
  "continuations": {
   "6k1/p6p/6p1/8/7Q/8/1B6/5RK1 w - - 0 1|1": [
    "Qd8#",
    "Qc4#"
   ]
  },
  "id": "puzzle-008",
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/8/6K1/8/8/8/8/R7 w - - 0 1|1": [
    "Ra8#"
   ]
  },
  "id": "puzzle-010",
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/8/5K2/8/8/8/8/6Q1 w - - 0 1|1": [
    "Qg7#"
   ]
  },
  "id": "puzzle-012",
  "objective": "mate"
 },
 {
  "title": "おしろのうえのクイーン",
  "theme": "endgame",
  "idea": "白キングが黒キングの逃げ道を押さえている。クイーンとキングを連携させ、残るマスを封じて詰ませよう。",
  "fen": "1k6/8/1K6/8/8/8/8/6Q1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qg8#"
  ],
  "continuations": {
   "1k6/8/1K6/8/8/8/8/6Q1 w - - 0 1|1": [
    "Qg8#"
   ]
  },
  "id": "puzzle-013",
  "objective": "mate"
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
  ],
  "continuations": {
   "6k1/8/6K1/8/8/8/8/3Q4 w - - 0 1|1": [
    "Qd8#"
   ]
  },
  "id": "puzzle-014",
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/R7/5N2/8/8/8/8/6K1 w - - 0 1|1": [
    "Rh7#"
   ]
  },
  "id": "puzzle-016",
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/R7/1R6/8/8/8/8/6K1 w - - 0 1|1": [
    "Rb8#"
   ]
  },
  "id": "puzzle-017",
  "objective": "mate"
 },
 {
  "title": "がくしゃのメイト",
  "theme": "opening",
  "idea": "スカラーズ・メイトは序盤の白の4手目に決まる詰みの型。この問題では、その最後の1手を探そう。f7は黒キングだけが守っている。",
  "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qxf7#"
  ],
  "continuations": {
   "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4|1": [
    "Qxf7#"
   ]
  },
  "id": "puzzle-020",
  "objective": "mate"
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
  ],
  "continuations": {
   "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2|1": [
    "Qh4#"
   ]
  },
  "id": "puzzle-021",
  "objective": "mate"
 },
 {
  "title": "りょうそでのキング",
  "theme": "pattern",
  "idea": "黒キングの両脇を黒自身のルークが塞いでいる。クイーンで残りの逃げ道を封じるエポレット・メイトを探そう。",
  "fen": "2rkr3/8/8/8/8/8/7Q/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qd6#"
  ],
  "continuations": {
   "2rkr3/8/8/8/8/8/7Q/6K1 w - - 0 1|1": [
    "Qd6#"
   ]
  },
  "id": "puzzle-009",
  "objective": "mate"
 },
 {
  "title": "コーナーのおうさま",
  "theme": "queen",
  "idea": "白キングが逃げ道を押さえている。クイーンを隣に置く方法も、離れた場所から横一列を封じる方法も詰みになる。",
  "fen": "7k/Q7/6K1/8/8/8/8/8 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qb8#",
   "Qa8#",
   "Qh7#",
   "Qg7#"
  ],
  "continuations": {
   "7k/Q7/6K1/8/8/8/8/8 w - - 0 1|1": [
    "Qb8#",
    "Qa8#",
    "Qh7#",
    "Qg7#"
   ]
  },
  "id": "puzzle-022",
  "objective": "mate"
 },
 {
  "title": "もぐりこみメイト",
  "theme": "smother",
  "idea": "ナイトがキングのふところに潜り込む。自分の駒に囲まれたキングは、ナイトの一撃に弱い。",
  "fen": "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Nf7#"
  ],
  "continuations": {
   "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1|1": [
    "Nf7#"
   ]
  },
  "id": "puzzle-015",
  "objective": "mate"
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
  ],
  "continuations": {
   "6k1/8/7P/8/8/8/1Q6/7K w - - 0 1|1": [
    "Qg7#"
   ]
  },
  "id": "puzzle-025",
  "objective": "mate"
 },
 {
  "title": "ルークの支え",
  "theme": "support",
  "idea": "7段目のルークはg7を守っている。クイーンを近くに置く筋も、8段目を遠くから押さえる筋もある。正解の王手を探そう。",
  "fen": "6k1/R7/8/4Q3/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qe8#",
   "Qb8#",
   "Qg7#"
  ],
  "continuations": {
   "6k1/R7/8/4Q3/8/8/8/6K1 w - - 0 1|1": [
    "Qe8#",
    "Qb8#",
    "Qg7#"
   ]
  },
  "id": "puzzle-026",
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/8/5N2/8/8/8/8/6QK w - - 0 1|1": [
    "Qg8#"
   ]
  },
  "id": "puzzle-027",
  "objective": "mate"
 },
 {
  "id": "mate-pawn-promotion-mate",
  "title": "さいごの一歩でメイト",
  "theme": "promotion",
  "idea": "ポーンを8段目へ進めると、すみのキングへ王手が届く。どの駒への昇格なら詰むか考えよう。",
  "fen": "k7/ppP5/8/8/8/8/8/7K w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "c8=Q#",
   "c8=R#"
  ],
  "continuations": {
   "k7/ppP5/8/8/8/8/8/7K w - - 0 1|1": [
    "c8=Q#",
    "c8=R#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-bishop-corner-mate",
  "title": "ビショップのななめ王手",
  "theme": "diagonal",
  "idea": "ビショップを移動して斜めの王手をかけよう。ルークが逃げ道をおさえている。",
  "fen": "7k/4B2p/8/8/8/8/8/K5R1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Bf6#"
  ],
  "continuations": {
   "7k/4B2p/8/8/8/8/8/K5R1 w - - 0 1|1": [
    "Bf6#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-pawn-capture-mate",
  "title": "ポーンで取って詰み",
  "theme": "support",
  "idea": "ポーンで駒を取りながら王手。ナイトとルークがキングの逃げ道を守る。",
  "fen": "7k/4N1rp/5P2/8/8/8/8/K5R1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "fxg7#"
  ],
  "continuations": {
   "7k/4N1rp/5P2/8/8/8/8/K5R1 w - - 0 1|1": [
    "fxg7#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-queen-knight-cover",
  "title": "ナイトが守るマス",
  "theme": "knight",
  "idea": "ナイトがふさいでいるキングの逃げ道に注目。クイーンの決め手を探そう。",
  "fen": "5k1N/2K5/4Q3/8/8/8/8/8 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qf7#"
  ],
  "continuations": {
   "5k1N/2K5/4Q3/8/8/8/8/8 w - - 0 1|1": [
    "Qf7#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-rook-bishop-wall",
  "title": "ルークとビショップの壁",
  "theme": "diagonal",
  "idea": "ビショップが守るマスとルークの横の利きを組み合わせよう。",
  "fen": "3k4/8/2KB4/4pR2/8/8/8/8 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rf8#"
  ],
  "continuations": {
   "3k4/8/2KB4/4pR2/8/8/8/8 w - - 0 1|1": [
    "Rf8#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-rook-knight-coordination",
  "title": "ルークとナイトの連携",
  "theme": "knight",
  "idea": "ルークで王手する前に、ナイトとキングがどこをおさえているか確認しよう。",
  "fen": "1k6/8/1K6/8/2N2R2/8/8/8 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rf8#"
  ],
  "continuations": {
   "1k6/8/1K6/8/2N2R2/8/8/8 w - - 0 1|1": [
    "Rf8#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-two-bishops-king",
  "title": "キングが最後の一手",
  "theme": "endgame",
  "idea": "キングがビショップの斜めの利きをふさいでいる。キングを動かして発見王手のメイトにしよう。",
  "fen": "k7/B7/2K5/8/8/5B2/8/8 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Kb6#"
  ],
  "continuations": {
   "k7/B7/2K5/8/8/5B2/8/8 w - - 0 1|1": [
    "Kb6#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-two-knights-final",
  "title": "ナイト二枚の一撃",
  "theme": "smother",
  "idea": "二枚のナイトで逃げ道をおさえ、ナイトの王手で詰ませよう。",
  "fen": "5k2/2NK4/7N/8/8/8/8/8 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Ne6#"
  ],
  "continuations": {
   "5k2/2NK4/7N/8/8/8/8/8 w - - 0 1|1": [
    "Ne6#"
   ]
  },
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/8/5K2/8/8/8/8/R7 w - - 0 1|2": [
    "Kf7",
    "Kg6"
   ],
   "8/5K1k/8/8/8/8/8/R7 w - - 2 2|1": [
    "Rh1#"
   ],
   "6k1/8/6K1/8/8/8/8/R7 w - - 2 2|1": [
    "Ra8#"
   ]
  },
  "id": "puzzle-028",
  "objective": "mate"
 },
 {
  "title": "ルークのまちて",
  "theme": "endgame",
  "idea": "キングはすでに逃げ道を押さえている。ルークの待機手で相手キングに動いてもらい、次に最終段から詰ませる。",
  "fen": "6k1/8/5K2/8/8/8/8/R7 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Rh1"
  ],
  "continuations": {
   "6k1/8/5K2/8/8/8/8/R7 w - - 0 1|2": [
    "Rh1"
   ],
   "5k2/8/5K2/8/8/8/8/7R w - - 2 2|1": [
    "Rh8#"
   ]
  },
  "id": "puzzle-029",
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/8/R7/1R6/8/8/8/6K1 w - - 0 1|2": [
    "Ra7",
    "Rb7"
   ],
   "6k1/R7/8/1R6/8/8/8/6K1 w - - 2 2|1": [
    "Rb8#"
   ],
   "6k1/1R6/R7/8/8/8/8/6K1 w - - 2 2|1": [
    "Ra8#"
   ]
  },
  "id": "puzzle-030",
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/8/8/8/8/8/R7/1R5K w - - 0 1|2": [
    "Ra7",
    "Rb7",
    "Rg1"
   ],
   "6k1/R7/8/8/8/8/8/1R5K w - - 2 2|1": [
    "Rb8#"
   ],
   "6k1/1R6/8/8/8/8/R7/7K w - - 2 2|1": [
    "Ra8#"
   ],
   "8/7k/8/8/8/8/R7/6RK w - - 2 2|1": [
    "Rh2#"
   ]
  },
  "id": "puzzle-031",
  "objective": "mate"
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
  ],
  "continuations": {
   "7k/8/5K2/8/8/8/8/Q7 w - - 0 1|2": [
    "Kf7+",
    "Kg6+",
    "Qa7",
    "Qg1"
   ],
   "8/5K1k/8/8/8/8/8/Q7 w - - 2 2|1": [
    "Qg7#",
    "Qh1#"
   ],
   "6k1/8/6K1/8/8/8/8/Q7 w - - 2 2|1": [
    "Qa8#",
    "Qg7#"
   ],
   "6k1/Q7/5K2/8/8/8/8/8 w - - 2 2|1": [
    "Qg7#"
   ],
   "8/7k/5K2/8/8/8/8/6Q1 w - - 2 2|1": [
    "Qg7#"
   ]
  },
  "id": "puzzle-033",
  "objective": "mate"
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
  ],
  "continuations": {
   "r5k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1|2": [
    "Qe8+"
   ],
   "4r1k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 2|1": [
    "Rxe8#"
   ]
  },
  "id": "puzzle-034",
  "objective": "mate"
 },
 {
  "id": "mate-rook-endgame-anticipate",
  "title": "ルークの終盤を読む",
  "theme": "endgame",
  "idea": "キングの一歩で相手を追いつめ、次のルークの詰みを準備しよう。",
  "fen": "8/8/8/8/4K3/1R6/8/2k5 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Kd3"
  ],
  "continuations": {
   "8/8/8/8/4K3/1R6/8/2k5 w - - 0 1|2": [
    "Kd3"
   ],
   "8/8/8/8/8/1R1K4/8/3k4 w - - 2 2|1": [
    "Rb1#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-bishop-rook-prep",
  "title": "ビショップで逃げ道をふさぐ",
  "theme": "diagonal",
  "idea": "まずビショップで黒キングの逃げ道を狭め、ルークとの連携で2手詰めを狙おう。",
  "fen": "3k4/6B1/4K3/8/1R6/8/5p2/8 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Be5"
  ],
  "continuations": {
   "3k4/6B1/4K3/8/1R6/8/5p2/8 w - - 0 1|2": [
    "Be5"
   ],
   "4k3/8/4K3/4B3/1R6/8/5p2/8 w - - 2 2|1": [
    "Rb8#"
   ],
   "2k5/8/4K3/4B3/1R6/8/5p2/8 w - - 2 2|1": [
    "Rb8#"
   ],
   "3k4/8/4K3/4B3/1R6/8/8/5q2 w - - 0 2|1": [
    "Rb8#"
   ],
   "3k4/8/4K3/4B3/1R6/8/8/5r2 w - - 0 2|1": [
    "Rb8#"
   ],
   "3k4/8/4K3/4B3/1R6/8/8/5b2 w - - 0 2|1": [
    "Rb8#"
   ],
   "3k4/8/4K3/4B3/1R6/8/8/5n2 w - - 0 2|1": [
    "Rb8#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-queen-knight-endgame",
  "title": "クイーンとナイトで2手詰め",
  "theme": "knight",
  "idea": "キングを寄せ、クイーンとナイトが協力して詰める道筋を読もう。",
  "fen": "5k2/8/4Q3/6K1/8/p1N5/8/8 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Kf6",
   "Kg6"
  ],
  "continuations": {
   "5k2/8/4Q3/6K1/8/p1N5/8/8 w - - 0 1|2": [
    "Kf6",
    "Kg6"
   ],
   "5k2/8/4QK2/8/8/2N5/p7/8 w - - 0 2|1": [
    "Qc8#",
    "Qf7#"
   ],
   "5k2/8/4Q1K1/8/8/2N5/p7/8 w - - 0 2|1": [
    "Qf7#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-queen-rook-zug",
  "title": "クイーンとルークの二手",
  "theme": "queen",
  "idea": "クイーンとルークの連携を見て、黒のすべての応手で詰む最初の手を探そう。",
  "fen": "3k4/7K/8/4Q3/8/8/R7/8 w - - 0 1",
  "mateIn": 2,
  "turn": "w",
  "solutions": [
   "Qg7",
   "Ra7"
  ],
  "continuations": {
   "3k4/7K/8/4Q3/8/8/R7/8 w - - 0 1|2": [
    "Qg7",
    "Ra7"
   ],
   "4k3/6QK/8/8/8/8/R7/8 w - - 2 2|1": [
    "Ra8#"
   ],
   "2k5/6QK/8/8/8/8/R7/8 w - - 2 2|1": [
    "Ra8#"
   ],
   "2k5/R6K/8/4Q3/8/8/8/8 w - - 2 2|1": [
    "Qc7#",
    "Qe8#",
    "Qh8#"
   ]
  },
  "objective": "mate"
 },
 {
  "title": "ルークでしとめる",
  "theme": "endgame",
  "idea": "「おうさまのおてつだい」の一段前から始める応用編。まずキングを近づけ、残り二手の詰みにつなげよう。",
  "fen": "6k1/8/4K3/8/8/8/8/R7 w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Kf6"
  ],
  "continuations": {
   "6k1/8/4K3/8/8/8/8/R7 w - - 0 1|3": [
    "Kf6"
   ],
   "7k/8/5K2/8/8/8/8/R7 w - - 2 2|2": [
    "Kf7",
    "Kg6"
   ],
   "8/5K1k/8/8/8/8/8/R7 w - - 4 3|1": [
    "Rh1#"
   ],
   "6k1/8/6K1/8/8/8/8/R7 w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/8/5K2/8/8/8/8/R7 w - - 2 2|2": [
    "Ra8#"
   ],
   "8/7k/5K2/8/8/8/8/R7 w - - 2 2|2": [
    "Ra8"
   ],
   "R7/8/5K1k/8/8/8/8/8 w - - 4 3|1": [
    "Rh8#"
   ]
  },
  "id": "puzzle-035",
  "objective": "mate"
 },
 {
  "title": "とおいかいだん",
  "theme": "ladder",
  "idea": "二枚のルークでキングの逃げ道を段ごとに減らそう。王手の連続だけでなく、キングの待機手をはさむ詰み筋もある。",
  "fen": "3k4/8/8/8/8/8/R7/1R5K w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Ra7",
   "Rb7"
  ],
  "continuations": {
   "3k4/8/8/8/8/8/R7/1R5K w - - 0 1|3": [
    "Ra7",
    "Rb7"
   ],
   "4k3/R7/8/8/8/8/8/1R5K w - - 2 2|2": [
    "Rh7",
    "Kh2",
    "Kg2",
    "Kg1",
    "Rb8#",
    "Rbb7",
    "Rb6",
    "Rb5",
    "Rb4",
    "Rb3",
    "Rb2",
    "Rf1",
    "Rd1"
   ],
   "5k2/7R/8/8/8/8/8/1R5K w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/7R/8/8/8/8/8/1R5K w - - 4 3|1": [
    "Rb8#"
   ],
   "5k2/R7/8/8/8/8/7K/1R6 w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/8/8/8/8/7K/1R6 w - - 4 3|1": [
    "Rb8#"
   ],
   "5k2/R7/8/8/8/8/6K1/1R6 w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/8/8/8/8/6K1/1R6 w - - 4 3|1": [
    "Rb8#"
   ],
   "5k2/R7/8/8/8/8/8/1R4K1 w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/8/8/8/8/8/1R4K1 w - - 4 3|1": [
    "Rb8#"
   ],
   "5k2/RR6/8/8/8/8/8/7K w - - 4 3|1": [
    "Rb8#",
    "Ra8#"
   ],
   "3k4/RR6/8/8/8/8/8/7K w - - 4 3|1": [
    "Rb8#",
    "Ra8#"
   ],
   "5k2/R7/1R6/8/8/8/8/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/1R6/8/8/8/8/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "5k2/R7/8/1R6/8/8/8/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/8/1R6/8/8/8/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "5k2/R7/8/8/1R6/8/8/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/8/8/1R6/8/8/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "5k2/R7/8/8/8/1R6/8/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/8/8/8/1R6/8/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "5k2/R7/8/8/8/8/1R6/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/8/8/8/8/1R6/7K w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/R7/8/8/8/8/8/5R1K w - - 4 3|1": [
    "Rf8#"
   ],
   "5k2/R7/8/8/8/8/8/3R3K w - - 4 3|1": [
    "Rd8#"
   ],
   "2k5/R7/8/8/8/8/8/1R5K w - - 2 2|2": [
    "Rh7",
    "Rg7",
    "Rf7",
    "Kh2",
    "Kg2",
    "Kg1",
    "Rbb7",
    "Rb6",
    "Rb5",
    "Rb4",
    "Rb3",
    "Rb2"
   ],
   "3k4/6R1/8/8/8/8/8/1R5K w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/5R2/8/8/8/8/8/1R5K w - - 4 3|1": [
    "Rb8#"
   ],
   "4k3/1R6/8/8/8/8/R7/7K w - - 2 2|2": [
    "Rh7",
    "Ra8#",
    "Raa7",
    "Ra6",
    "Ra5",
    "Ra4",
    "Ra3",
    "Rh2",
    "Rf2",
    "Rd2",
    "Ra1",
    "Kh2",
    "Kg2",
    "Kg1"
   ],
   "5k2/7R/8/8/8/8/R7/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/7R/8/8/8/8/R7/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/1R6/R7/8/8/8/8/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/1R6/R7/8/8/8/8/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/1R6/8/R7/8/8/8/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/1R6/8/R7/8/8/8/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/1R6/8/8/R7/8/8/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/1R6/8/8/R7/8/8/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/1R6/8/8/8/R7/8/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/1R6/8/8/8/R7/8/7K w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/1R6/8/8/8/8/7R/7K w - - 4 3|1": [
    "Rh8#"
   ],
   "3k4/1R6/8/8/8/8/7R/7K w - - 4 3|1": [
    "Rh8#"
   ],
   "3k4/1R6/8/8/8/8/5R2/7K w - - 4 3|1": [
    "Rf8#"
   ],
   "5k2/1R6/8/8/8/8/3R4/7K w - - 4 3|1": [
    "Rd8#"
   ],
   "5k2/1R6/8/8/8/8/8/R6K w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/1R6/8/8/8/8/8/R6K w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/1R6/8/8/8/8/R6K/8 w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/1R6/8/8/8/8/R6K/8 w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/1R6/8/8/8/8/R5K1/8 w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/1R6/8/8/8/8/R5K1/8 w - - 4 3|1": [
    "Ra8#"
   ],
   "5k2/1R6/8/8/8/8/R7/6K1 w - - 4 3|1": [
    "Ra8#"
   ],
   "3k4/1R6/8/8/8/8/R7/6K1 w - - 4 3|1": [
    "Ra8#"
   ],
   "2k5/1R6/8/8/8/8/R7/7K w - - 2 2|2": [
    "Raa7"
   ]
  },
  "id": "puzzle-036",
  "objective": "mate"
 },
 {
  "title": "クイーンのつめ",
  "theme": "queen",
  "idea": "「はしへおいこめ」より一手前の応用編。複数の初手から強制メイトになる。相手のどの応手でも詰むか確かめよう。",
  "fen": "6k1/8/4K3/8/8/8/8/Q7 w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Kf6",
   "Qa7",
   "Qd4",
   "Qg1+"
  ],
  "continuations": {
   "6k1/8/4K3/8/8/8/8/Q7 w - - 0 1|3": [
    "Kf6",
    "Qa7",
    "Qd4",
    "Qg1+"
   ],
   "7k/8/5K2/8/8/8/8/Q7 w - - 2 2|2": [
    "Kf7+",
    "Kg6+",
    "Qa7",
    "Qg1"
   ],
   "8/5K1k/8/8/8/8/8/Q7 w - - 4 3|1": [
    "Qg7#",
    "Qh1#"
   ],
   "6k1/8/6K1/8/8/8/8/Q7 w - - 4 3|1": [
    "Qa8#",
    "Qg7#"
   ],
   "6k1/Q7/5K2/8/8/8/8/8 w - - 4 3|1": [
    "Qg7#"
   ],
   "8/7k/5K2/8/8/8/8/6Q1 w - - 4 3|1": [
    "Qg7#"
   ],
   "5k2/8/5K2/8/8/8/8/Q7 w - - 2 2|2": [
    "Qa8#",
    "Qa7"
   ],
   "4k3/Q7/5K2/8/8/8/8/8 w - - 4 3|1": [
    "Qe7#"
   ],
   "8/7k/5K2/8/8/8/8/Q7 w - - 2 2|2": [
    "Qa8",
    "Qg1"
   ],
   "Q7/8/5K1k/8/8/8/8/8 w - - 4 3|1": [
    "Qh8#",
    "Qh1#"
   ],
   "7k/8/5K2/8/8/8/8/6Q1 w - - 4 3|1": [
    "Qg7#"
   ],
   "8/8/5K1k/8/8/8/8/6Q1 w - - 4 3|1": [
    "Qg6#",
    "Qh2#",
    "Qh1#"
   ],
   "7k/Q7/4K3/8/8/8/8/8 w - - 2 2|2": [
    "Kf6"
   ],
   "5k2/Q7/4K3/8/8/8/8/8 w - - 2 2|2": [
    "Qh7",
    "Qf7#",
    "Qg1",
    "Kf6"
   ],
   "4k3/7Q/4K3/8/8/8/8/8 w - - 4 3|1": [
    "Qh8#",
    "Qg8#",
    "Qe7#"
   ],
   "4k3/8/4K3/8/8/8/8/6Q1 w - - 4 3|1": [
    "Qg8#"
   ],
   "5k2/8/4K3/8/3Q4/8/8/8 w - - 2 2|2": [
    "Qh8#",
    "Qg4",
    "Qg1"
   ],
   "4k3/8/4K3/8/6Q1/8/8/8 w - - 4 3|1": [
    "Qg8#"
   ],
   "8/7k/4K3/8/3Q4/8/8/8 w - - 2 2|2": [
    "Kf7"
   ],
   "8/5K2/7k/8/3Q4/8/8/8 w - - 4 3|1": [
    "Qh4#"
   ],
   "7k/8/4K3/8/8/8/8/6Q1 w - - 2 2|2": [
    "Kf7",
    "Kf6"
   ],
   "8/5K1k/8/8/8/8/8/6Q1 w - - 4 3|1": [
    "Qg7#",
    "Qh2#",
    "Qh1#"
   ],
   "5k2/8/4K3/8/8/8/8/6Q1 w - - 2 2|2": [
    "Qg5",
    "Qg4",
    "Qg3",
    "Qg2"
   ],
   "4k3/8/4K3/6Q1/8/8/8/8 w - - 4 3|1": [
    "Qg8#",
    "Qe7#"
   ],
   "4k3/8/4K3/8/8/6Q1/8/8 w - - 4 3|1": [
    "Qg8#",
    "Qb8#"
   ],
   "4k3/8/4K3/8/8/8/6Q1/8 w - - 4 3|1": [
    "Qg8#",
    "Qa8#"
   ],
   "8/7k/4K3/8/8/8/8/6Q1 w - - 2 2|2": [
    "Kf7",
    "Kf6"
   ],
   "7k/5K2/8/8/8/8/8/6Q1 w - - 4 3|1": [
    "Qg8#",
    "Qg7#",
    "Qh2#",
    "Qh1#"
   ],
   "8/5K2/7k/8/8/8/8/6Q1 w - - 4 3|1": [
    "Qg6#"
   ]
  },
  "id": "puzzle-037",
  "objective": "mate"
 },
 {
  "id": "mate-queen-three-step",
  "title": "クイーンで三手の包囲",
  "theme": "queen",
  "idea": "キングとクイーンが協力して黒キングを端へ追い込もう。黒の応手をすべて読んで3手詰めを探す。",
  "fen": "8/8/8/8/2Q1K3/8/7k/8 w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Kf3",
   "Qg8"
  ],
  "continuations": {
   "8/8/8/8/2Q1K3/8/7k/8 w - - 0 1|3": [
    "Kf3",
    "Qg8"
   ],
   "8/8/8/8/2Q5/5K1k/8/8 w - - 2 2|2": [
    "Kf2",
    "Qg4+",
    "Qg8"
   ],
   "8/8/8/8/2Q5/8/5K1k/8 w - - 4 3|1": [
    "Qh4#"
   ],
   "8/8/8/8/6Q1/5K2/7k/8 w - - 4 3|1": [
    "Qg2#"
   ],
   "6Q1/8/8/8/7k/5K2/8/8 w - - 4 3|1": [
    "Qg4#"
   ],
   "6Q1/8/8/8/8/5K2/7k/8 w - - 4 3|1": [
    "Qg2#"
   ],
   "8/8/8/8/2Q5/5K2/8/7k w - - 2 2|2": [
    "Kf2",
    "Kg3",
    "Qa2",
    "Qc2",
    "Qe2",
    "Qf1+",
    "Qg4",
    "Qg8"
   ],
   "8/8/8/8/2Q5/6K1/8/6k1 w - - 4 3|1": [
    "Qc1#"
   ],
   "8/8/8/8/8/5K2/Q7/6k1 w - - 4 3|1": [
    "Qg2#"
   ],
   "8/8/8/8/8/5K2/2Q5/6k1 w - - 4 3|1": [
    "Qg2#"
   ],
   "8/8/8/8/8/5K2/4Q3/6k1 w - - 4 3|1": [
    "Qg2#"
   ],
   "8/8/8/8/8/5K2/7k/5Q2 w - - 4 3|1": [
    "Qg2#"
   ],
   "8/8/8/8/2Q5/5K2/8/6k1 w - - 2 2|2": [
    "Kg3",
    "Qa2",
    "Qc2",
    "Qe2",
    "Qh4"
   ],
   "8/8/8/8/2Q5/6K1/8/7k w - - 4 3|1": [
    "Qc1#",
    "Qf1#"
   ],
   "8/8/8/8/8/5K2/Q7/7k w - - 4 3|1": [
    "Qg2#"
   ],
   "8/8/8/8/8/5K2/Q7/5k2 w - - 4 3|1": [
    "Qa1#",
    "Qb1#",
    "Qf2#"
   ],
   "8/8/8/8/8/5K2/2Q5/7k w - - 4 3|1": [
    "Qg2#"
   ],
   "8/8/8/8/8/5K2/2Q5/5k2 w - - 4 3|1": [
    "Qb1#",
    "Qc1#",
    "Qd1#",
    "Qf2#"
   ],
   "8/8/8/8/8/5K2/4Q3/7k w - - 4 3|1": [
    "Qg2#"
   ],
   "8/8/8/8/7Q/5K2/8/5k2 w - - 4 3|1": [
    "Qf2#",
    "Qh1#"
   ],
   "6Q1/8/8/8/4K3/7k/8/8 w - - 2 2|2": [
    "Kf3"
   ],
   "6Q1/8/8/8/4K3/8/8/7k w - - 2 2|2": [
    "Kf3"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "mate-bishop-rook-three-step",
  "title": "ルークとビショップの三手",
  "theme": "diagonal",
  "idea": "キングを一歩寄せてから、ルークとビショップの利きを組み合わせて3手詰めにしよう。",
  "fen": "5k2/1R1K4/8/8/8/6B1/8/8 w - - 0 1",
  "mateIn": 3,
  "turn": "w",
  "solutions": [
   "Ke6"
  ],
  "continuations": {
   "5k2/1R1K4/8/8/8/6B1/8/8 w - - 0 1|3": [
    "Ke6"
   ],
   "6k1/1R6/4K3/8/8/6B1/8/8 w - - 2 2|2": [
    "Be5"
   ],
   "5k2/1R6/4K3/4B3/8/8/8/8 w - - 4 3|1": [
    "Rb8#"
   ],
   "4k3/1R6/4K3/8/8/6B1/8/8 w - - 2 2|2": [
    "Bd6",
    "Be5",
    "Rb8#",
    "Rf7"
   ],
   "3k4/1R6/3BK3/8/8/8/8/8 w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/1R6/4K3/4B3/8/8/8/8 w - - 4 3|1": [
    "Rb8#"
   ],
   "3k4/5R2/4K3/8/8/6B1/8/8 w - - 4 3|1": [
    "Rf8#"
   ]
  },
  "objective": "mate"
 },
 {
  "id": "tactic-discovered-attack",
  "title": "ビショップのはっけんこうげき",
  "theme": "discovery",
  "idea": "ビショップで王手をしながらe列を開こう。背後のルークがe8のクイーンを攻撃する発見攻撃になる。",
  "fen": "4q1k1/8/6p1/8/4B3/8/8/4R1K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "Bd5+"
  ],
  "continuations": {
   "4q1k1/8/6p1/8/4B3/8/8/4R1K1 w - - 0 1|1": [
    "Bd5+"
   ]
  }
 },
 {
  "id": "tactic-double-check",
  "title": "ダブルチェックをかけよう",
  "theme": "doublecheck",
  "idea": "ビショップを動かしてルークのe列を開こう。ルークとビショップの両方がキングを王手するダブルチェックになる。",
  "fen": "4k3/8/8/8/4B3/8/8/4R1K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "Bg6+",
   "Bc6+"
  ],
  "continuations": {
   "4k3/8/8/8/4B3/8/8/4R1K1 w - - 0 1|1": [
    "Bg6+",
    "Bc6+"
   ]
  }
 },
 {
  "id": "tactic-en-passant",
  "title": "アンパッサンの瞬間",
  "theme": "enpassant",
  "idea": "黒が直前にd7からd5へポーンを2マス進めた。白のe5のポーンは、この1手だけアンパッサンでd5のポーンを取れる。",
  "fen": "6k1/8/8/3pP3/8/8/8/6K1 w - d6 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "exd6"
  ],
  "continuations": {
   "6k1/8/8/3pP3/8/8/8/6K1 w - d6 0 1|1": [
    "exd6"
   ]
  }
 },
 {
  "id": "tactic-bishop-double-attack",
  "title": "ビショップの二重攻撃",
  "theme": "fork",
  "idea": "ビショップをg5に出すと、e7のクイーンとh4のルークを同時に攻撃できる。f4の味方ポーンがビショップを守る。",
  "fen": "k7/4q3/7B/8/5P1r/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "Bg5"
  ],
  "continuations": {
   "k7/4q3/7B/8/5P1r/8/8/6K1 w - - 0 1|1": [
    "Bg5"
   ]
  }
 },
 {
  "id": "tactic-knight-queen-fork",
  "title": "ナイトの王手フォーク",
  "theme": "fork",
  "idea": "王手をかけながらクイーンもねらおう。f7に移動したナイトは、h8のキングとd8のクイーンを同時に攻撃する。",
  "fen": "3q3k/8/8/4N3/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "Nf7+"
  ],
  "continuations": {
   "3q3k/8/8/4N3/8/8/8/6K1 w - - 0 1|1": [
    "Nf7+"
   ]
  }
 },
 {
  "id": "tactic-knight-rook-fork",
  "title": "ナイトでルークもねらえ",
  "theme": "fork",
  "idea": "ナイトで王手をかけ、ルークにも二重攻撃をかけよう。f6からh7とd7を同時にねらう。",
  "fen": "8/3r3k/8/8/4N3/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "Nf6+"
  ],
  "continuations": {
   "8/3r3k/8/8/4N3/8/8/6K1 w - - 0 1|1": [
    "Nf6+"
   ]
  }
 },
 {
  "id": "tactic-pawn-fork",
  "title": "ポーンのりょうどり",
  "theme": "fork",
  "idea": "ポーンを一歩進めて、d6とf6の二枚のルークを同時に攻撃しよう。安い駒でも大きな二重攻撃ができる。",
  "fen": "7k/8/3r1r2/8/4P3/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "e5"
  ],
  "continuations": {
   "7k/8/3r1r2/8/4P3/8/8/6K1 w - - 0 1|1": [
    "e5"
   ]
  }
 },
 {
  "id": "tactic-absolute-pin",
  "title": "キングへのピン",
  "theme": "pin",
  "idea": "ルークをe列に置こう。e7のナイトは、後ろにe8のキングがいるため動けなくなる。これが絶対ピン。",
  "fen": "4k3/4n3/8/8/8/8/8/R5K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "Re1"
  ],
  "continuations": {
   "4k3/4n3/8/8/8/8/8/R5K1 w - - 0 1|1": [
    "Re1"
   ]
  }
 },
 {
  "id": "tactic-relative-pin",
  "title": "クイーンへのピン",
  "theme": "pin",
  "idea": "ビショップを斜めラインに乗せよう。d5のナイトが動くと、その後ろのc6のクイーンが攻撃される。これは相対ピン。",
  "fen": "7k/8/2q5/3n4/8/8/8/5BK1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "Bg2"
  ],
  "continuations": {
   "7k/8/2q5/3n4/8/8/8/5BK1 w - - 0 1|1": [
    "Bg2"
   ]
  }
 },
 {
  "id": "tactic-knight-underpromotion",
  "title": "ナイトにしょうかくして王手",
  "theme": "promotion",
  "idea": "クイーンではなくナイトへ昇格しよう。c8のナイトはe7のキングに王手し、a7のルークも同時に攻撃する。",
  "fen": "8/r1P1k3/8/8/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "c8=N+"
  ],
  "continuations": {
   "8/r1P1k3/8/8/8/8/8/6K1 w - - 0 1|1": [
    "c8=N+"
   ]
  }
 },
 {
  "id": "tactic-promotion",
  "title": "クイーンへのしょうかく",
  "theme": "promotion",
  "idea": "ポーンを最終段へ進め、クイーンに昇格しよう。新しいクイーンでそのまま王手もできる。",
  "fen": "7k/P7/8/8/8/8/6K1/8 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "a8=Q+"
  ],
  "continuations": {
   "7k/P7/8/8/8/8/6K1/8 w - - 0 1|1": [
    "a8=Q+"
   ]
  }
 },
 {
  "id": "tactic-rook-skewer",
  "title": "キングのうしろのクイーン",
  "theme": "skewer",
  "idea": "ルークの王手でキングを動かし、その後ろのクイーンをねらう。高価値の駒を先に攻撃するスキュアの形。",
  "fen": "2q5/2k5/8/R7/8/8/8/6K1 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "Rc5+"
  ],
  "continuations": {
   "2q5/2k5/8/R7/8/8/8/6K1 w - - 0 1|1": [
    "Rc5+"
   ]
  }
 },
 {
  "id": "tactic-rook-underpromotion",
  "title": "ステイルメイトをふせげ",
  "theme": "stalemate",
  "idea": "c8=Qはステイルメイト。c8=Bやc8=Nは駒不足によって即引き分け。c8=Rなら黒はKa6と動け、勝ちを目指せる。",
  "fen": "8/k1P5/2K5/8/8/8/8/8 w - - 0 1",
  "mateIn": 1,
  "objective": "tactic",
  "turn": "w",
  "solutions": [
   "c8=R"
  ],
  "continuations": {
   "8/k1P5/2K5/8/8/8/8/8 w - - 0 1|1": [
    "c8=R"
   ]
  }
 },
 {
  "id": "tactic-fork-knight-queen",
  "title": "ナイトでキングとクイーン",
  "theme": "fork",
  "idea": "ナイトで王手をかけながら、次にクイーンを狙うマスへ動こう。",
  "fen": "8/5k2/8/1q6/2N5/8/8/7K w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Nd6+"
  ],
  "continuations": {
   "8/5k2/8/1q6/2N5/8/8/7K w - - 0 1|1": [
    "Nd6+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-fork-knight-rooks",
  "title": "二つのルークを狙え",
  "theme": "fork",
  "idea": "ナイトで2枚のルークを一度に狙えるマスを探そう。",
  "fen": "6k1/8/8/8/3r3r/6N1/8/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Nf5"
  ],
  "continuations": {
   "6k1/8/8/8/3r3r/6N1/8/K7 w - - 0 1|1": [
    "Nf5"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-fork-rook-minors",
  "title": "ルークで二つの駒を狙おう",
  "theme": "fork",
  "idea": "ルークの縦の利きで2つの駒を同時に攻撃しよう。",
  "fen": "7k/3n4/8/8/R7/8/8/1K1b4 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rd4"
  ],
  "continuations": {
   "7k/3n4/8/8/R7/8/8/1K1b4 w - - 0 1|1": [
    "Rd4"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-fork-queen-minors",
  "title": "クイーンで2枚のナイトを両取り",
  "theme": "fork",
  "idea": "クイーンでe7とe1のナイトを同時に攻撃しよう。e4からの縦の攻撃だけでなく、b4・h4からの斜めの攻撃でも両取りになる。",
  "fen": "7k/4n3/8/8/Q7/8/7K/4n3 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qe4",
   "Qb4",
   "Qh4+"
  ],
  "continuations": {
   "7k/4n3/8/8/Q7/8/7K/4n3 w - - 0 1|1": [
    "Qe4",
    "Qb4",
    "Qh4+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-fork-pawn-major",
  "title": "ポーンで大駒を両取り",
  "theme": "fork",
  "idea": "ポーンを一歩進め、クイーンとルークを同時に攻撃しよう。",
  "fen": "7k/8/2q1r3/8/3P4/8/8/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "d5"
  ],
  "continuations": {
   "7k/8/2q1r3/8/3P4/8/8/K7 w - - 0 1|1": [
    "d5"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-fork-bishop-minors",
  "title": "ビショップの遠い両取り",
  "theme": "fork",
  "idea": "長い斜めの利きでルークとナイトを同時に狙おう。",
  "fen": "3r3n/k7/8/8/8/8/1B6/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Bf6"
  ],
  "continuations": {
   "3r3n/k7/8/8/8/8/1B6/K7 w - - 0 1|1": [
    "Bf6"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-pin-queen-king",
  "title": "クイーンをキングにピン",
  "theme": "pin",
  "idea": "a5のルークをg5へ移して、g7のクイーンをg8のキングにピンしよう。h4のポーンがルークを守る。",
  "fen": "6k1/6q1/8/R7/7P/8/K7/8 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rg5"
  ],
  "continuations": {
   "6k1/6q1/8/R7/7P/8/K7/8 w - - 0 1|1": [
    "Rg5"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-pin-bishop-knight",
  "title": "ビショップの絶対ピン",
  "theme": "pin",
  "idea": "ビショップをh1からe4へ動かすと、f5のナイトがg6のキングの前にピンされる。最初からピンされているわけではないぞ。",
  "fen": "8/8/6k1/5n2/8/8/8/K6B w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Be4"
  ],
  "continuations": {
   "8/8/6k1/5n2/8/8/8/K6B w - - 0 1|1": [
    "Be4"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-pin-queen-knight",
  "title": "クイーンでナイトをピン",
  "theme": "pin",
  "idea": "c7のナイトの背後にはc8のキング。クイーンをc列へ移すと、ナイトは動けば王手になってしまう絶対ピンを受ける。c1・c3・c5のどこでも成立する。",
  "fen": "2k5/2n5/8/8/8/Q7/8/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Qc5",
   "Qc1",
   "Qc3"
  ],
  "continuations": {
   "2k5/2n5/8/8/8/Q7/8/K7 w - - 0 1|1": [
    "Qc5",
    "Qc1",
    "Qc3"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-pin-bishop-relative",
  "title": "大駒の手前のルーク",
  "theme": "pin",
  "idea": "ルークの奥にクイーンがいる。ビショップを動かして長い斜めのピンを作ろう。",
  "fen": "3q4/k3r3/8/8/8/8/8/1KB5 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Bg5"
  ],
  "continuations": {
   "3q4/k3r3/8/8/8/8/8/1KB5 w - - 0 1|1": [
    "Bg5"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-pin-rook-relative",
  "title": "ルークでビショップをピン",
  "theme": "pin",
  "idea": "ビショップの奥にクイーンがいる。ルークを同じ縦の線へ。",
  "fen": "5q1k/8/8/5b2/8/8/R7/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rf2"
  ],
  "continuations": {
   "5q1k/8/8/5b2/8/8/R7/K7 w - - 0 1|1": [
    "Rf2"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-skewer-bishop-king",
  "title": "ビショップのスキュア",
  "theme": "skewer",
  "idea": "キングに王手をかけ、その後ろのルークも射程に入れよう。",
  "fen": "6r1/8/4k3/1B6/8/8/8/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Bc4+"
  ],
  "continuations": {
   "6r1/8/4k3/1B6/8/8/8/K7 w - - 0 1|1": [
    "Bc4+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-skewer-rook-queen",
  "title": "クイーンを背後に置いた王手",
  "theme": "skewer",
  "idea": "ルークでキングへ王手し、その奥のクイーンも狙おう。",
  "fen": "4q3/4k3/8/R7/8/8/8/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Re5+"
  ],
  "continuations": {
   "4q3/4k3/8/R7/8/8/8/K7 w - - 0 1|1": [
    "Re5+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-discovery-knight-queen",
  "title": "ナイトで発見攻撃",
  "theme": "discovery",
  "idea": "ナイトで王手しながらルークの縦の利きをクイーンまで開こう。",
  "fen": "4q3/7k/8/8/4N3/8/8/4R2K w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Nf6+",
   "Ng5+"
  ],
  "continuations": {
   "4q3/7k/8/8/4N3/8/8/4R2K w - - 0 1|1": [
    "Nf6+",
    "Ng5+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-discovery-pawn-bishop",
  "title": "ポーンを進めてラインを開こう",
  "theme": "discovery",
  "idea": "ポーンを前進させ、奥のビショップから相手ルークへの線を開こう。",
  "fen": "7k/6r1/8/8/3P4/8/1B6/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "d5"
  ],
  "continuations": {
   "7k/6r1/8/8/3P4/8/1B6/K7 w - - 0 1|1": [
    "d5"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-defender-bishop",
  "title": "守りのナイトを除去",
  "theme": "defender",
  "idea": "相手ルークを守るナイトをビショップで取り、守りを崩そう。",
  "fen": "3r3k/8/4n3/8/2B5/8/8/K2R4 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Bxe6"
  ],
  "continuations": {
   "3r3k/8/4n3/8/2B5/8/8/K2R4 w - - 0 1|1": [
    "Bxe6"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-defender-pawn",
  "title": "守りのポーンを除去",
  "theme": "defender",
  "idea": "ナイトを守っているポーンを取り、守りの数を減らそう。",
  "fen": "7k/8/8/5p2/4n1P1/8/4Q3/K7 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "gxf5"
  ],
  "continuations": {
   "7k/8/8/5p2/4n1P1/8/4Q3/K7 w - - 0 1|1": [
    "gxf5"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-defender-bishop-2",
  "title": "大駒を守るビショップ",
  "theme": "defender",
  "idea": "ルークを守るビショップをポーンで取り、ビショップの斜めの利きを通そう。",
  "fen": "6k1/3r4/8/8/B5b1/7P/8/1K6 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "hxg4"
  ],
  "continuations": {
   "6k1/3r4/8/8/B5b1/7P/8/1K6 w - - 0 1|1": [
    "hxg4"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-doublecheck-knight",
  "title": "ナイトのダブルチェック",
  "theme": "doublecheck",
  "idea": "ナイトを動かし、ナイトとルークの両方から同時に王手をかけよう。",
  "fen": "3k4/8/8/8/3N4/8/8/K2R4 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Ne6+",
   "Nc6+"
  ],
  "continuations": {
   "3k4/8/8/8/3N4/8/8/K2R4 w - - 0 1|1": [
    "Ne6+",
    "Nc6+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-promotion-capture-check",
  "title": "取りながらクイーンへ昇格",
  "theme": "promotion",
  "idea": "ポーンでルークを取りながらクイーンに昇格し、王手をかけよう。",
  "fen": "r4k2/1P6/8/8/8/8/8/2K5 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "bxa8=Q+"
  ],
  "continuations": {
   "r4k2/1P6/8/8/8/8/8/2K5 w - - 0 1|1": [
    "bxa8=Q+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-castling-kingside",
  "title": "キング側へキャスリング",
  "theme": "castling",
  "idea": "キングとルークを一度に動かす特殊ルールを練習しよう。",
  "fen": "r1k5/8/8/8/8/8/8/4K2R w K - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "O-O"
  ],
  "continuations": {
   "r1k5/8/8/8/8/8/8/4K2R w K - 0 1|1": [
    "O-O"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-rook-capture-check",
  "title": "ルークを取って王手",
  "theme": "capture",
  "idea": "ビショップに守られたルークで、相手ルークを取りながら王手をかけよう。",
  "fen": "6kr/8/8/8/3B4/8/8/K6R w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Rxh8+"
  ],
  "continuations": {
   "6kr/8/8/8/3B4/8/8/K6R w - - 0 1|1": [
    "Rxh8+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-bishop-sacrifice-check",
  "title": "守られたビショップの王手",
  "theme": "support",
  "idea": "ナイトに守られたビショップでh7のポーンを取り、王手をかけよう。",
  "fen": "6k1/7p/8/6N1/8/3B4/8/6K1 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Bxh7+"
  ],
  "continuations": {
   "6k1/7p/8/6N1/8/3B4/8/6K1 w - - 0 1|1": [
    "Bxh7+"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-promotion-knight-majors",
  "title": "大駒へのナイト昇格フォーク",
  "theme": "promotion",
  "idea": "ナイトに昇格するとクイーンとルークの両方を狙える。",
  "fen": "6k1/P1r5/1q6/8/8/8/8/7K w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "a8=N"
  ],
  "continuations": {
   "6k1/P1r5/1q6/8/8/8/8/7K w - - 0 1|1": [
    "a8=N"
   ]
  },
  "objective": "tactic"
 },
 {
  "id": "tactic-pin-bishop-king-2",
  "title": "別の斜めピンを発見",
  "theme": "pin",
  "idea": "b1のビショップをe4へ出すと、c6のルークがb7のキングにピンされる。斜めラインを新しく開く練習じゃ。",
  "fen": "8/1k6/2r5/8/8/8/K7/1B6 w - - 0 1",
  "mateIn": 1,
  "turn": "w",
  "solutions": [
   "Be4"
  ],
  "continuations": {
   "8/1k6/2r5/8/8/8/K7/1B6 w - - 0 1|1": [
    "Be4"
   ]
  },
  "objective": "tactic"
 }
];

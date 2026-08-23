// 自動生成: tools/games_gen.py (python-chessで全手検証済み)
// 解説はすべて独自に書き下ろし。他者の注釈の転載はしていない。
const FAMOUS_GAMES = [
 {
  "id": "opera",
  "title": "オペラ座の夜",
  "white": "ポール・モーフィー",
  "black": "ブラウンシュヴァイク公 & イズアール伯",
  "year": 1858,
  "event": "パリ・オペラ座",
  "result": "1-0",
  "opening": "フィリドール・ディフェンス",
  "intro": "オペラ鑑賞中に指されたという逸話で知られる、攻めの手本のような一局。モーフィーは手数をかけず全ての駒を最短で使い、相手が駒を遊ばせている隙に仕留めます。",
  "takeaway": "駒は『数』ではなく『働き』。全部の駒を攻めに参加させ、遅れている相手を一気に攻略する。",
  "moves": [
   {
    "san": "e4",
    "note": "キングの前のポーンを2つ進め、中央を取りビショップとクイーンの道を開ける最も基本的な第一手。"
   },
   {
    "san": "e5",
    "note": "黒も対称に応じ、中央で張り合う。"
   },
   {
    "san": "Nf3",
    "note": "e5のポーンに当てながらナイトを展開。攻めと展開を同時にこなす好手。"
   },
   {
    "san": "d6",
    "note": "ポーンを守ったが受け身。黒のビショップの活動が狭くなる。"
   },
   {
    "san": "d4",
    "note": "もう一方の中央ポーンも突き、中央を制圧しにいく。"
   },
   {
    "san": "Bg4",
    "note": "ナイトにピンをかけたが、この一手が後で標的になる。"
   },
   {
    "san": "dxe5",
    "note": "中央で取り、相手のビショップとナイトの関係を問う。"
   },
   {
    "san": "Bxf3",
    "note": "取り返さないとポーンを損するため応じるが、白の駒得の呼び水になる。"
   },
   {
    "san": "Qxf3",
    "note": "クイーンで取り返し、f7とb7をにらむ好位置に自然と出る。"
   },
   {
    "san": "dxe5",
    "note": "黒もポーンを取り返して形は互角に見えるが、白は展開で先行している。"
   },
   {
    "san": "Bc4",
    "note": "弱点f7を狙ってビショップを走らせる。攻めの照準が定まる。"
   },
   {
    "san": "Nf6",
    "note": "クイーンのh5からの攻めを消しつつ展開。"
   },
   {
    "san": "Qb3",
    "note": "b7とf7を同時ににらむ二重の狙い。守りにくい二つの的を作る。"
   },
   {
    "san": "Qe7",
    "note": "f7を守るためやむなくクイーンを引き、駒の働きがさらに鈍る。"
   },
   {
    "san": "Nc3",
    "note": "ポーンを取るより展開を優先。全駒参加という思想が徹底されている。"
   },
   {
    "san": "c6",
    "note": "b7とd5を守る。受けに追われ黒は攻めに一切手が回らない。"
   },
   {
    "san": "Bg5",
    "note": "最後の軽い駒も展開し、f6のナイトにピンをかけて攻めの網を絞る。"
   },
   {
    "san": "b5",
    "note": "反撃を試みるが、白のビショップを呼び込むだけに終わる。"
   },
   {
    "san": "Nxb5",
    "note": "ナイトを捨ててc6を破壊し、黒のキングの周りをこじ開ける。犠牲の始まり。"
   },
   {
    "san": "cxb5",
    "note": "取れば白の攻めが加速する。取らなくても不利で、黒に選択肢はない。"
   },
   {
    "san": "Bxb5+",
    "note": "チェックをかけつつd7を狙う。黒はまだキングを囲えていない。"
   },
   {
    "san": "Nbd7",
    "note": "身を挺して受けるが、この守りのナイトが次の標的になる。"
   },
   {
    "san": "O-O-O",
    "note": "キャスリングでルークを一気にd列へ。守りのナイトに火力を集中させる。"
   },
   {
    "san": "Rd8",
    "note": "ピンされたナイトを補強するが、駒はすべて受けに縛られている。"
   },
   {
    "san": "Rxd7",
    "note": "守りの要を除去。相手の防御を一枚ずつ剥がしていく。"
   },
   {
    "san": "Rxd7",
    "note": "取り返すしかないが、d列のピンは解けない。"
   },
   {
    "san": "Rd1",
    "note": "もう一台のルークもd列に重ね、ピンされた駒への圧力を倍にする。"
   },
   {
    "san": "Qe6",
    "note": "d7を支えつつ逃げ道を探すが、白の仕上げは目前。"
   },
   {
    "san": "Bxd7+",
    "note": "またも捨ててピンを維持。黒のキングを裸にする最後の布石。"
   },
   {
    "san": "Nxd7",
    "note": "取り返すが、これで黒のd7は動けないピン駒になる。"
   },
   {
    "san": "Qb8+",
    "note": "クイーンを捨てる決め手。取れば動けないナイトが退く。"
   },
   {
    "san": "Nxb8",
    "note": "取るしかないが、これでd列が完全に開通する。"
   },
   {
    "san": "Rd8#",
    "note": "ルークがd8に入りチェックメイト。全ての駒を働かせた者が、遊ばせた者に勝つ典型。"
   }
  ],
  "en": {
   "title": "A Night at the Opera",
   "white": "Paul Morphy",
   "black": "Duke of Brunswick & Count Isouard",
   "opening": "Philidor Defense",
   "intro": "Known for the story that it was played during an opera performance, this game is a model attacking lesson. Morphy develops every piece quickly and punishes Black while several pieces remain out of play.",
   "takeaway": "Chess is about activity, not just material. Bring every piece into the attack before the opponent can coordinate.",
   "moves": [
    {
     "san": "e4",
     "note": "Advance the king pawn two squares: take central space and open the bishops' and queen's diagonals."
    },
    {
     "san": "e5",
     "note": "Black answers symmetrically and contests the center."
    },
    {
     "san": "Nf3",
     "note": "Develops the knight while attacking the e5-pawn, combining development with a threat."
    },
    {
     "san": "d6",
     "note": "The pawn is defended, but the move is passive and restricts Black's bishop."
    },
    {
     "san": "d4",
     "note": "The other central pawn advances to challenge the center."
    },
    {
     "san": "Bg4",
     "note": "The bishop pins the knight, but the placement later becomes a target."
    },
    {
     "san": "dxe5",
     "note": "White captures in the center and tests the relationship between Black's bishop and knight."
    },
    {
     "san": "Bxf3",
     "note": "Black chooses to recapture, but this helps White gain time and activity."
    },
    {
     "san": "Qxf3",
     "note": "The queen recaptures and reaches a useful square, eyeing f7 and b7."
    },
    {
     "san": "dxe5",
     "note": "Black recaptures in turn. The material looks even, but White is ahead in development."
    },
    {
     "san": "Bc4",
     "note": "The bishop targets the weak f7-square and gives the attack a clear direction."
    },
    {
     "san": "Nf6",
     "note": "The knight develops while covering ideas based on Qh5."
    },
    {
     "san": "Qb3",
     "note": "The queen attacks b7 and f7 at the same time, creating two difficult targets."
    },
    {
     "san": "Qe7",
     "note": "The queen moves to defend f7, losing more time and coordination."
    },
    {
     "san": "Nc3",
     "note": "White chooses development over a pawn grab and brings another piece into play."
    },
    {
     "san": "c6",
     "note": "Black protects b7 and d5, but is forced into defense instead of an active plan."
    },
    {
     "san": "Bg5",
     "note": "The last minor piece joins in and pins the f6-knight to the queen on d8."
    },
    {
     "san": "b5",
     "note": "Black tries to counterattack, but the move only invites White's bishop forward."
    },
    {
     "san": "Nxb5",
     "note": "White gives up the knight to destroy c6 and open lines around the uncastled king."
    },
    {
     "san": "cxb5",
     "note": "This is the selected line. Accepting the sacrifice lets White's attack accelerate; other choices would lead to different defenses."
    },
    {
     "san": "Bxb5+",
     "note": "The bishop checks while targeting d7. Black's king still has no safe castling position."
    },
    {
     "san": "Nbd7",
     "note": "The knight steps in to defend, but becomes the next target."
    },
    {
     "san": "O-O-O",
     "note": "Castling places a rook on the d-file, concentrating force on the pinned defender."
    },
    {
     "san": "Rd8",
     "note": "Black reinforces the pinned knight, but all of the pieces are tied to defensive duties."
    },
    {
     "san": "Rxd7",
     "note": "White removes a key defender and peels away another layer of the position."
    },
    {
     "san": "Rxd7",
     "note": "Black recaptures in this line, but the pressure on the d-file remains."
    },
    {
     "san": "Rd1",
     "note": "The second rook joins the d-file, doubling the pressure on the pinned piece."
    },
    {
     "san": "Qe6",
     "note": "The queen supports d7 and looks for a way to survive, but White's finish is close."
    },
    {
     "san": "Bxd7+",
     "note": "White gives up another piece to preserve the pin and expose the black king."
    },
    {
     "san": "Nxd7",
     "note": "Black recaptures, leaving the d7-knight pinned and unable to move safely."
    },
    {
     "san": "Qb8+",
     "note": "The queen sacrifice is the final combination. If Black takes, the pinned knight must move and the d-file opens."
    },
    {
     "san": "Nxb8",
     "note": "Black accepts in the selected line, and the d-file is now completely open."
    },
    {
     "san": "Rd8#",
     "note": "The rook mates on d8. White's active army overwhelms Black's pieces, which never had time to coordinate."
    }
   ]
  }
 },
 {
  "id": "immortal",
  "title": "不減の一局(インモータル・ゲーム)",
  "white": "アドルフ・アンデルセン",
  "black": "リオネル・キーゼリツキー",
  "year": 1851,
  "event": "ロンドン",
  "result": "1-0",
  "opening": "キングズ・ギャンビット",
  "intro": "ロマン派チェスの象徴。アンデルセンはビショップ・ルーク2枚・クイーンまで惜しみなく捨て、残った軽い駒だけで詰め上げます。物量ではなく働きと狙いがすべてを決めることを示した歴史的名局。",
  "takeaway": "捨てるのは損ではなく、相手の駒を『邪魔な位置』へ押しやり、詰みの網を作るための投資になりうる。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "e5",
    "note": "対称に応じる。"
   },
   {
    "san": "f4",
    "note": "キングズ・ギャンビット。ポーンを捨てて中央と攻めの速度を買う攻撃的な選択。"
   },
   {
    "san": "exf4",
    "note": "ギャンビットを受けて取る。"
   },
   {
    "san": "Bc4",
    "note": "f7をにらんでビショップを展開。"
   },
   {
    "san": "Qh4+",
    "note": "チェックでf1のキングを動かし、白のキャスリング権を奪う。"
   },
   {
    "san": "Kf1",
    "note": "キングは動かされるが、この後白はキングの安全より攻めに全てを賭ける。"
   },
   {
    "san": "b5",
    "note": "ビショップをそらそうとする反撃。"
   },
   {
    "san": "Bxb5",
    "note": "ポーンを取りつつ攻めの利きを保つ。"
   },
   {
    "san": "Nf6",
    "note": "展開しつつg4やe4をにらむ。"
   },
   {
    "san": "Nf3",
    "note": "黒クイーンに当てて手を稼ぎながら展開。"
   },
   {
    "san": "Qh6",
    "note": "クイーンを保つが、遠くに置かれ守りに利かない。"
   },
   {
    "san": "d3",
    "note": "中央を支え、c1のビショップの道を開ける。"
   },
   {
    "san": "Nh5",
    "note": "f4のポーンを守るが、ナイトが盤の端に追いやられる。"
   },
   {
    "san": "Nh4",
    "note": "f5への進出とクイーンへの圧力を狙う。"
   },
   {
    "san": "Qg5",
    "note": "クイーンで的を避けるが、なお働きに乏しい。"
   },
   {
    "san": "Nf5",
    "note": "ナイトを絶好の前哨に据え、g7と周辺をにらむ。"
   },
   {
    "san": "c6",
    "note": "ビショップを追う。"
   },
   {
    "san": "g4",
    "note": "ポーンでナイトを守りつつh5のナイトを追う大胆な突き。キングの前を開く危険もいとわない。"
   },
   {
    "san": "Nf6",
    "note": "端のナイトが戻る。"
   },
   {
    "san": "Rg1",
    "note": "ルークを開いたg列に備える。次の犠牲の伏線。"
   },
   {
    "san": "cxb5",
    "note": "ビショップを取って駒得だが、白はここから連続犠牲に入る。"
   },
   {
    "san": "h4",
    "note": "クイーンを追い立て、h列も攻めに使う。"
   },
   {
    "san": "Qg6",
    "note": "逃げ場を探すクイーン。"
   },
   {
    "san": "h5",
    "note": "さらに追う。黒クイーンは的から的へ追われ続ける。"
   },
   {
    "san": "Qg5",
    "note": "戻るしかない。"
   },
   {
    "san": "Qf3",
    "note": "f6のナイトを狙い、f7方面の攻めも見る二重の圧力。"
   },
   {
    "san": "Ng8",
    "note": "受けのため引くが、黒の駒は総崩れの配置になる。"
   },
   {
    "san": "Bxf4",
    "note": "捨ててあったf4を回収しつつ黒クイーンに当てる。攻めの起点が整う。"
   },
   {
    "san": "Qf6",
    "note": "クイーンを守りに使う。"
   },
   {
    "san": "Nc3",
    "note": "最後の軽い駒を展開。全軍を攻めに向ける。"
   },
   {
    "san": "Bc5",
    "note": "反撃を試み、g1のルークに当てる。"
   },
   {
    "san": "Nd5",
    "note": "クイーンに当てながらナイトを中央へ。ルークは捨てる覚悟。"
   },
   {
    "san": "Qxb2",
    "note": "ルークを取りにいく黒。だがこれで黒クイーンは戦場から完全に離れる。"
   },
   {
    "san": "Bd6",
    "note": "ビショップを捨てる一手。黒のビショップの利きを断ち、詰めへの布石を敷く。"
   },
   {
    "san": "Bxg1",
    "note": "黒はルークを取るが、白の攻め駒は着々と急所へ集まる。"
   },
   {
    "san": "e5",
    "note": "ポーンを突いて黒クイーンの帰り道を封鎖する。守りは間に合わない。"
   },
   {
    "san": "Qxa1+",
    "note": "黒はもう一台のルークまで取るが、これらの駒は詰みに一切関与できない。"
   },
   {
    "san": "Ke2",
    "note": "チェックを軽くかわす。白のキングは自力で安全地帯へ歩く。"
   },
   {
    "san": "Na6",
    "note": "遅ればせの受けを試みるが遅い。"
   },
   {
    "san": "Nxg7+",
    "note": "軽い駒だけでチェック。詰みの網が閉じ始める。"
   },
   {
    "san": "Kd8",
    "note": "逃げるしかない。"
   },
   {
    "san": "Qf6+",
    "note": "クイーンを捨てる決め手。取ればナイトが釘付けから離れる。"
   },
   {
    "san": "Nxf6",
    "note": "取るしかない。"
   },
   {
    "san": "Be7#",
    "note": "ビショップがe7に入りチェックメイト。ルーク2枚とクイーンを捨てた側が、軽い駒だけで詰ませた伝説の幕切れ。"
   }
  ],
  "en": {
   "title": "The Immortal Game",
   "white": "Adolf Anderssen",
   "black": "Lionel Kieseritzky",
   "opening": "King's Gambit",
   "intro": "A symbol of Romantic-era chess. Anderssen gives up a bishop, two rooks, and finally the queen, then mates with the remaining minor pieces. The game shows how activity and concrete threats can outweigh material in a forcing attack.",
   "takeaway": "A sacrifice can be an investment: drive the enemy pieces into awkward roles and use the resulting coordination to build a mating net.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "e5",
     "note": "Black replies symmetrically."
    },
    {
     "san": "f4",
     "note": "The King's Gambit sacrifices a pawn to gain central control and attacking time."
    },
    {
     "san": "exf4",
     "note": "Black accepts the gambit."
    },
    {
     "san": "Bc4",
     "note": "The bishop develops toward f7."
    },
    {
     "san": "Qh4+",
     "note": "The queen checks, drives the king from f1, and removes White's castling option."
    },
    {
     "san": "Kf1",
     "note": "The king moves; White now commits to an attack rather than king safety."
    },
    {
     "san": "b5",
     "note": "Black tries to drive the bishop away."
    },
    {
     "san": "Bxb5",
     "note": "White takes the pawn while keeping the bishop active."
    },
    {
     "san": "Nf6",
     "note": "Develops while watching g4 and e4."
    },
    {
     "san": "Nf3",
     "note": "White develops with tempo by attacking the black queen."
    },
    {
     "san": "Qh6",
     "note": "The queen keeps its material, but its distant square contributes little to defense."
    },
    {
     "san": "d3",
     "note": "Supports the center and opens the c1-bishop's diagonal."
    },
    {
     "san": "Nh5",
     "note": "The knight protects f4 but is pushed toward the edge."
    },
    {
     "san": "Nh4",
     "note": "Eyes an advance to f5 and puts pressure on the queen."
    },
    {
     "san": "Qg5",
     "note": "The queen sidesteps the threat but remains poorly placed."
    },
    {
     "san": "Nf5",
     "note": "The knight reaches an excellent outpost and eyes g7 and the surrounding squares."
    },
    {
     "san": "c6",
     "note": "Black drives the bishop away."
    },
    {
     "san": "g4",
     "note": "The pawn protects the knight on f5 and drives the h5-knight, despite opening lines near the king."
    },
    {
     "san": "Nf6",
     "note": "The edge knight returns."
    },
    {
     "san": "Rg1",
     "note": "The rook prepares to use the open g-file; this is a first hint of the coming sacrifice."
    },
    {
     "san": "cxb5",
     "note": "Black takes the bishop and wins material, but White now begins a sequence of sacrifices."
    },
    {
     "san": "h4",
     "note": "The pawn drives the queen and opens the h-file as another attacking route."
    },
    {
     "san": "Qg6",
     "note": "The queen searches for a safe square."
    },
    {
     "san": "h5",
     "note": "White drives it again; the black queen is forced from target to target."
    },
    {
     "san": "Qg5",
     "note": "The queen returns in the selected line."
    },
    {
     "san": "Qf3",
     "note": "The queen attacks the f6-knight and also eyes the f7-area, creating two pressures."
    },
    {
     "san": "Ng8",
     "note": "The knight retreats to help defend, leaving Black's pieces poorly coordinated."
    },
    {
     "san": "Bxf4",
     "note": "White recovers the sacrificed f4-pawn while attacking the queen and rebuilding the attack."
    },
    {
     "san": "Qf6",
     "note": "The queen is pulled into defensive work."
    },
    {
     "san": "Nc3",
     "note": "White develops the last minor piece and points the whole army toward the king."
    },
    {
     "san": "Bc5",
     "note": "Black tries to counterattack against the rook on g1."
    },
    {
     "san": "Nd5",
     "note": "The knight centralizes with tempo against the queen; White is ready to sacrifice the rook."
    },
    {
     "san": "Qxb2",
     "note": "Black takes the rook, moving the queen far away from the defense."
    },
    {
     "san": "Bd6",
     "note": "White sacrifices the bishop to remove a defender and prepare the mating net."
    },
    {
     "san": "Bxg1",
     "note": "Black takes the bishop, but White's attacking pieces are reaching their targets."
    },
    {
     "san": "e5",
     "note": "The pawn blocks the queen's route back to the defense; Black cannot reorganize in time."
    },
    {
     "san": "Qxa1+",
     "note": "Black takes the other rook, but those rooks are no longer relevant to the mating attack."
    },
    {
     "san": "Ke2",
     "note": "The king steps away from check. White's king walks to safety under its own power."
    },
    {
     "san": "Na6",
     "note": "Black makes a late defensive attempt, but it is too slow."
    },
    {
     "san": "Nxg7+",
     "note": "A minor piece checks and the mating net begins to close."
    },
    {
     "san": "Kd8",
     "note": "The king moves in the selected line; other legal replies can lead to different continuations."
    },
    {
     "san": "Qf6+",
     "note": "The queen sacrifice is the final blow. If it is taken, the knight is freed from its pin."
    },
    {
     "san": "Nxf6",
     "note": "Black accepts the queen in this line."
    },
    {
     "san": "Be7#",
     "note": "The bishop mates on e7. After giving up both rooks and the queen, White finishes with the light pieces alone."
    }
   ]
  }
 },
 {
  "id": "evergreen",
  "title": "常緑の一局(エバーグリーン・ゲーム)",
  "white": "アドルフ・アンデルセン",
  "black": "ジャン・デュフレーン",
  "year": 1852,
  "event": "ベルリン",
  "result": "1-0",
  "opening": "エヴァンス・ギャンビット",
  "intro": "『いつまでも色あせない』と讃えられた名局。終盤、白は連続犠牲から美しい詰みを決めます。攻めの流れの作り方と、犠牲を伴う組み合わせ(コンビネーション)の見本。",
  "takeaway": "相手の弱い列や斜めに全ての攻め駒を向け、犠牲で守り駒を引きはがして一気に詰める。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "e5",
    "note": "対称。"
   },
   {
    "san": "Nf3",
    "note": "e5に当てて展開。"
   },
   {
    "san": "Nc6",
    "note": "ポーンを守りつつ展開。"
   },
   {
    "san": "Bc4",
    "note": "f7をにらむ。"
   },
   {
    "san": "Bc5",
    "note": "対称に展開。"
   },
   {
    "san": "b4",
    "note": "エヴァンス・ギャンビット。ポーンを捨ててc3とd4を素早く作り、中央と展開の速さを買う。"
   },
   {
    "san": "Bxb4",
    "note": "受けて取る。"
   },
   {
    "san": "c3",
    "note": "捨てたポーンの代わりにd4の準備。ビショップにも当てる。"
   },
   {
    "san": "Ba5",
    "note": "ビショップを保つ。"
   },
   {
    "san": "d4",
    "note": "中央を一気に押し広げ、開いた盤で駒の速さを生かす。"
   },
   {
    "san": "exd4",
    "note": "取る。"
   },
   {
    "san": "O-O",
    "note": "キングを囲い、ルークを中央近くへ。攻めの準備完了。"
   },
   {
    "san": "d3",
    "note": "ポーンを押し込んで白の陣形を乱そうとする。"
   },
   {
    "san": "Qb3",
    "note": "f7とb7をにらむ二重の狙い。"
   },
   {
    "san": "Qf6",
    "note": "f7を守る。"
   },
   {
    "san": "e5",
    "note": "黒クイーンを追いながら中央を制圧。"
   },
   {
    "san": "Qg6",
    "note": "逃げる。"
   },
   {
    "san": "Re1",
    "note": "ルークをe列に据え、開いた中央を支配する。"
   },
   {
    "san": "Nge7",
    "note": "展開しつつf5などを見る。"
   },
   {
    "san": "Ba3",
    "note": "ビショップを長い斜めに置き、黒のキャスリングを妨げe7を狙う。"
   },
   {
    "san": "b5",
    "note": "反撃を試みる。"
   },
   {
    "san": "Qxb5",
    "note": "ポーンを取りつつ圧力を保つ。"
   },
   {
    "san": "Rb8",
    "note": "クイーンを追う。"
   },
   {
    "san": "Qa4",
    "note": "退きつつd7とa5をにらむ。"
   },
   {
    "san": "Bb6",
    "note": "ビショップを活用。"
   },
   {
    "san": "Nbd2",
    "note": "最後の軽い駒を展開し、e4への進出を用意。"
   },
   {
    "san": "Bb7",
    "note": "黒も展開してf3のナイトをにらむ。"
   },
   {
    "san": "Ne4",
    "note": "ナイトを中央へ跳ね、f6やd6を狙う。攻めの布陣が整う。"
   },
   {
    "san": "Qf5",
    "note": "クイーンで受けつつ反撃を探る。"
   },
   {
    "san": "Bxd3",
    "note": "ポーンを回収しつつ攻め駒を増やす。"
   },
   {
    "san": "Qh5",
    "note": "反撃を狙って白のキング方面へ。ここから終盤の応酬が始まる。"
   },
   {
    "san": "Nf6+",
    "note": "ナイトでチェックし、gxf6と応じさせて黒のキングの前を開く。"
   },
   {
    "san": "gxf6",
    "note": "取るしかない。黒のキングの守りが崩れる。"
   },
   {
    "san": "exf6",
    "note": "開いた黒のキングに迫るポーン。攻めが加速する。"
   },
   {
    "san": "Rg8",
    "note": "反撃を試み、g2を狙う。"
   },
   {
    "san": "Rad1",
    "note": "最後のルークも中央に呼び、d7への犠牲を用意する伏線。"
   },
   {
    "san": "Qxf3",
    "note": "黒はナイトを取って攻め合いに出るが、白の組み合わせが一枚上を行く。"
   },
   {
    "san": "Rxe7+",
    "note": "ルークを捨ててナイトを除去し、黒のキングを釣り出す。連続犠牲の第一撃。"
   },
   {
    "san": "Nxe7",
    "note": "取るしかない。"
   },
   {
    "san": "Qxd7+",
    "note": "クイーンを捨てる第二撃。取れば決定的なチェックが続く。"
   },
   {
    "san": "Kxd7",
    "note": "取れば…"
   },
   {
    "san": "Bf5+",
    "note": "ビショップのチェックで黒のキングを狭い所へ追う。"
   },
   {
    "san": "Ke8",
    "note": "戻る。"
   },
   {
    "san": "Bd7+",
    "note": "さらにチェックで押し込む。"
   },
   {
    "san": "Kf8",
    "note": "逃げ場はここだけ。"
   },
   {
    "san": "Bxe7#",
    "note": "ビショップがe7を取ってチェックメイト。二枚の犠牲から生まれた完璧な詰み。"
   }
  ],
  "en": {
   "title": "The Evergreen Game",
   "white": "Adolf Anderssen",
   "black": "Jean Dufresne",
   "opening": "Evans Gambit",
   "intro": "A game praised as one that never grows old. White finishes with a beautiful sequence of sacrifices, making it a useful example of building an attack and using combinations to remove defenders.",
   "takeaway": "Aim every attacking piece at the opponent's weak files and diagonals. A sacrifice can pull defenders away and make the final mating net possible.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "e5",
     "note": "Black mirrors the move."
    },
    {
     "san": "Nf3",
     "note": "Develops while attacking e5."
    },
    {
     "san": "Nc6",
     "note": "Develops while defending the pawn."
    },
    {
     "san": "Bc4",
     "note": "The bishop targets f7."
    },
    {
     "san": "Bc5",
     "note": "Black develops symmetrically."
    },
    {
     "san": "b4",
     "note": "The Evans Gambit sacrifices a pawn to prepare c3 and d4 quickly, buying central space and development."
    },
    {
     "san": "Bxb4",
     "note": "Black accepts the gambit."
    },
    {
     "san": "c3",
     "note": "Prepares d4 and attacks the bishop, using the sacrificed pawn to gain time."
    },
    {
     "san": "Ba5",
     "note": "The bishop preserves itself."
    },
    {
     "san": "d4",
     "note": "White expands in the center and uses the open position to accelerate development."
    },
    {
     "san": "exd4",
     "note": "Black captures in the center."
    },
    {
     "san": "O-O",
     "note": "White castles and brings a rook toward the center; the attack is ready to grow."
    },
    {
     "san": "d3",
     "note": "Black advances the pawn to disturb White's formation."
    },
    {
     "san": "Qb3",
     "note": "The queen attacks f7 and b7 at once."
    },
    {
     "san": "Qf6",
     "note": "The queen defends f7."
    },
    {
     "san": "e5",
     "note": "The pawn drives the black queen while taking more central space."
    },
    {
     "san": "Qg6",
     "note": "The queen retreats."
    },
    {
     "san": "Re1",
     "note": "The rook takes the open e-file and begins to control the center."
    },
    {
     "san": "Nge7",
     "note": "The knight develops and prepares ideas such as ...f5."
    },
    {
     "san": "Ba3",
     "note": "The bishop reaches a long diagonal, interferes with castling, and targets e7."
    },
    {
     "san": "b5",
     "note": "Black starts a counterattack."
    },
    {
     "san": "Qxb5",
     "note": "White takes the pawn and keeps the pressure."
    },
    {
     "san": "Rb8",
     "note": "Black attacks the queen."
    },
    {
     "san": "Qa4",
     "note": "The queen retreats while watching d7 and a5."
    },
    {
     "san": "Bb6",
     "note": "The bishop develops actively."
    },
    {
     "san": "Nbd2",
     "note": "White develops the last minor piece and prepares a central jump."
    },
    {
     "san": "Bb7",
     "note": "Black also develops and eyes the knight on f3."
    },
    {
     "san": "Ne4",
     "note": "The knight reaches the center and attacks f6 and d6; White's attacking setup is complete."
    },
    {
     "san": "Qf5",
     "note": "The queen defends while looking for counterplay."
    },
    {
     "san": "Bxd3",
     "note": "White recovers the pawn and adds another attacking piece."
    },
    {
     "san": "Qh5",
     "note": "The queen heads toward White's king and starts the final phase."
    },
    {
     "san": "Nf6+",
     "note": "The knight checks and invites gxf6, opening lines in front of the black king."
    },
    {
     "san": "gxf6",
     "note": "Black accepts the capture in the selected line, weakening the king."
    },
    {
     "san": "exf6",
     "note": "The pawn advances against the exposed king."
    },
    {
     "san": "Rg8",
     "note": "Black seeks counterplay against g2."
    },
    {
     "san": "Rad1",
     "note": "The last rook joins the center and prepares a sacrifice on d7."
    },
    {
     "san": "Qxf3",
     "note": "Black takes the knight, but White's combination is stronger."
    },
    {
     "san": "Rxe7+",
     "note": "White sacrifices the rook to remove a defender and pull out the black king."
    },
    {
     "san": "Nxe7",
     "note": "Black recaptures in the selected line."
    },
    {
     "san": "Qxd7+",
     "note": "The queen sacrifice is the second blow; taking it allows the forcing checks to continue."
    },
    {
     "san": "Kxd7",
     "note": "Black accepts in this line."
    },
    {
     "san": "Bf5+",
     "note": "The bishop checks and drives the king into a narrow area."
    },
    {
     "san": "Ke8",
     "note": "The king returns."
    },
    {
     "san": "Bd7+",
     "note": "Another check pushes the king farther in."
    },
    {
     "san": "Kf8",
     "note": "The king moves to the selected square."
    },
    {
     "san": "Bxe7#",
     "note": "The bishop captures on e7 and mates. Two sacrifices have created a complete mating net."
    }
   ]
  }
 },
 {
  "id": "reti_tartakower",
  "title": "クイーン一閃",
  "white": "リヒャルト・レティ",
  "black": "サヴィエリ・タルタコワー",
  "year": 1910,
  "event": "ウィーン",
  "result": "1-0",
  "opening": "カロ・カン風の展開",
  "intro": "わずか11手。中央での小競り合いから、白は突然クイーンを捨てて相手のキングを引きずり出し、二枚のビショップだけで詰ませます。短手数コンビネーションの傑作。",
  "takeaway": "相手のキングが中央に取り残されているときは、犠牲で釣り出して軽い駒の連携で仕留められることがある。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "c6",
    "note": "カロ・カン。次にd5でe4に挑む堅実な作戦。"
   },
   {
    "san": "d4",
    "note": "中央を広げる。"
   },
   {
    "san": "d5",
    "note": "予定通り中央に当てる。"
   },
   {
    "san": "Nc3",
    "note": "d5に当ててe4を支える。"
   },
   {
    "san": "dxe4",
    "note": "取る。"
   },
   {
    "san": "Nxe4",
    "note": "取り返し、ナイトが中央の好位置に立つ。"
   },
   {
    "san": "Nf6",
    "note": "e4のナイトに当てて展開。"
   },
   {
    "san": "Qd3",
    "note": "あえてクイーンを前に出す。後の犠牲を見据えた伏線。"
   },
   {
    "san": "e5",
    "note": "中央で反発するが、黒のキングはまだ中央に留まったまま。"
   },
   {
    "san": "dxe5",
    "note": "取る。盤の中央が開き、黒のキングが危うくなる。"
   },
   {
    "san": "Qa5+",
    "note": "チェックでクイーンを働かせつつ、白のe5を取り返す狙い。"
   },
   {
    "san": "Bd2",
    "note": "チェックを受けつつ発展。"
   },
   {
    "san": "Qxe5",
    "note": "ポーンを回収したが、黒のキングは依然として中央にさらされている。"
   },
   {
    "san": "O-O-O",
    "note": "キャスリングでルークを一気にd列へ。中央の黒のキングに狙いを定める。"
   },
   {
    "san": "Nxe4",
    "note": "ナイトを取って駒得を図るが、これが罠にかかる決定的な一手。"
   },
   {
    "san": "Qd8+",
    "note": "クイーンを捨てる衝撃の一手。取れば黒のキングが致命的な位置に引き出される。"
   },
   {
    "san": "Kxd8",
    "note": "取るしかない。キングがd8に釣り出される。"
   },
   {
    "san": "Bg5+",
    "note": "ビショップのチェック。黒のキングの逃げ道を限定する。"
   },
   {
    "san": "Kc7",
    "note": "逃げるが…"
   },
   {
    "san": "Bd8#",
    "note": "ビショップがd8に戻ってチェックメイト。クイーンを捨てて二枚のビショップだけで詰ませた鮮烈な幕切れ。"
   }
  ],
  "en": {
   "title": "A Queen Sacrifice in One Flash",
   "white": "Richard Réti",
   "black": "Savielly Tartakower",
   "opening": "Caro-Kann-style setup",
   "intro": "In only eleven moves, White turns a central skirmish into a queen sacrifice that drags the black king into the open and finishes with two bishops. It is a compact lesson in forcing combinations.",
   "takeaway": "When the enemy king is stranded in the center, a sacrifice can draw it onto a vulnerable square where the minor pieces can coordinate a mate.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "c6",
     "note": "The Caro-Kann setup prepares ...d5 to challenge e4."
    },
    {
     "san": "d4",
     "note": "Expands in the center."
    },
    {
     "san": "d5",
     "note": "Black challenges the center as planned."
    },
    {
     "san": "Nc3",
     "note": "Attacks d5 and supports e4."
    },
    {
     "san": "dxe4",
     "note": "Black captures in the center."
    },
    {
     "san": "Nxe4",
     "note": "White recaptures and places the knight on a strong central square."
    },
    {
     "san": "Nf6",
     "note": "Develops while attacking the knight on e4."
    },
    {
     "san": "Qd3",
     "note": "The queen moves forward deliberately, preparing the later sacrifice."
    },
    {
     "san": "e5",
     "note": "Black strikes in the center, but the king remains uncastled."
    },
    {
     "san": "dxe5",
     "note": "White captures, opening lines and making the exposed king more vulnerable."
    },
    {
     "san": "Qa5+",
     "note": "The queen checks while preparing to recover the pawn on e5."
    },
    {
     "san": "Bd2",
     "note": "White answers the check and develops."
    },
    {
     "san": "Qxe5",
     "note": "Black recovers the pawn, but the king is still exposed in the center."
    },
    {
     "san": "O-O-O",
     "note": "Castling places a rook on the d-file and points it toward the black king."
    },
    {
     "san": "Nxe4",
     "note": "Black wins a knight, but this is the tactical mistake in the selected game."
    },
    {
     "san": "Qd8+",
     "note": "White offers the queen with check. If Black takes, the king is dragged onto a mating square."
    },
    {
     "san": "Kxd8",
     "note": "Black accepts in the selected line and the king is pulled to d8."
    },
    {
     "san": "Bg5+",
     "note": "The bishop checks and limits the king's escape squares."
    },
    {
     "san": "Kc7",
     "note": "The king moves in the selected variation."
    },
    {
     "san": "Bd8#",
     "note": "The bishop returns to d8 and mates. White has given up the queen to finish with two bishops."
    }
   ]
  }
 },
 {
  "id": "lasker_thomas",
  "title": "キングを狩る",
  "white": "エドワード・ラスカー",
  "black": "ジョージ・トーマス",
  "year": 1912,
  "event": "ロンドン",
  "result": "1-0",
  "opening": "オランダ・ディフェンス",
  "intro": "クイーン犠牲から黒のキングを初手から相手陣の奥まで引きずり出し、盤を縦断させて詰ませる『キング・ハント』の代表作。キングが裸になったときの攻めの破壊力を示します。",
  "takeaway": "キングの守りがはがれた瞬間に連続チェックで追い込めば、キング自身を盤の反対側まで歩かせて詰ませられる。",
  "moves": [
   {
    "san": "d4",
    "note": "中央を取る。"
   },
   {
    "san": "e6",
    "note": "オランダ系やフレンチ系を含みにした柔らかい出だし。"
   },
   {
    "san": "Nf3",
    "note": "自然に展開。"
   },
   {
    "san": "f5",
    "note": "オランダ・ディフェンス。e4を抑えて攻めを狙うが、キングの前が薄くなる弱点も抱える。"
   },
   {
    "san": "Nc3",
    "note": "展開を続ける。"
   },
   {
    "san": "Nf6",
    "note": "対称に展開。"
   },
   {
    "san": "Bg5",
    "note": "f6のナイトにピンをかける。"
   },
   {
    "san": "Be7",
    "note": "ピンを外す準備。"
   },
   {
    "san": "Bxf6",
    "note": "あえて交換し、黒のキング前の守り駒を減らす。"
   },
   {
    "san": "Bxf6",
    "note": "取り返す。"
   },
   {
    "san": "e4",
    "note": "中央を開き、黒のキングの前の弱さを突く準備。"
   },
   {
    "san": "fxe4",
    "note": "取る。"
   },
   {
    "san": "Nxe4",
    "note": "取り返してナイトを中央へ。"
   },
   {
    "san": "b6",
    "note": "ビショップの道を開こうとするが展開が遅い。"
   },
   {
    "san": "Ne5",
    "note": "ナイトを急所へ跳ね、g4やf7方面の攻めを見る。"
   },
   {
    "san": "O-O",
    "note": "ようやくキングを囲うが、まさにそこが標的になる。"
   },
   {
    "san": "Bd3",
    "note": "h7を狙ってビショップを据える。攻めの照準完成。"
   },
   {
    "san": "Bb7",
    "note": "展開するが受けが間に合わない。"
   },
   {
    "san": "Qh5",
    "note": "h7を二重に狙い、決定的な犠牲を用意する。"
   },
   {
    "san": "Qe7",
    "note": "受けを試みるが遅い。"
   },
   {
    "san": "Qxh7+",
    "note": "クイーンを捨ててh7を破壊。キングを裸にして狩りが始まる。"
   },
   {
    "san": "Kxh7",
    "note": "取るしかない。キングが引きずり出される。"
   },
   {
    "san": "Nxf6+",
    "note": "ナイトのチェックでキングをさらに追う。"
   },
   {
    "san": "Kh6",
    "note": "逃げ道はここだけ。"
   },
   {
    "san": "Neg4+",
    "note": "もう一枚のナイトもチェックに参加。"
   },
   {
    "san": "Kg5",
    "note": "キングはどんどん前に出される。"
   },
   {
    "san": "h4+",
    "note": "ポーンまでチェックに使い、キングの帰り道を断つ。"
   },
   {
    "san": "Kf4",
    "note": "キングは相手陣へ進むしかない。"
   },
   {
    "san": "g3+",
    "note": "さらに追う。"
   },
   {
    "san": "Kf3",
    "note": "キングは白陣深くへ。"
   },
   {
    "san": "Be2+",
    "note": "ビショップのチェックで押し込む。"
   },
   {
    "san": "Kg2",
    "note": "逃げ場が尽きてくる。"
   },
   {
    "san": "Rh2+",
    "note": "ルークもチェックに加わる。"
   },
   {
    "san": "Kg1",
    "note": "キングは隅へ。"
   },
   {
    "san": "O-O-O#",
    "note": "キャスリングでルークがd1に入り、盤を縦断してきたキングをチェックメイト。史上もっとも有名なキング狩りの完成。"
   }
  ],
  "en": {
   "title": "The King Hunt",
   "white": "Edward Lasker",
   "black": "George Thomas",
   "opening": "Dutch Defense",
   "intro": "A classic king hunt: after a queen sacrifice, Black's king is driven from its shelter across the board and finally mated. It demonstrates the power of a coordinated attack against an exposed king.",
   "takeaway": "Once the king's shelter has been broken, a sequence of checks can drive it far from safety. The attacking pieces must keep the escape squares controlled.",
   "moves": [
    {
     "san": "d4",
     "note": "Takes central space."
    },
    {
     "san": "e6",
     "note": "A flexible move that can lead to Dutch- or French-style structures."
    },
    {
     "san": "Nf3",
     "note": "Develops naturally."
    },
    {
     "san": "f5",
     "note": "The Dutch Defense controls e4 and seeks active play, but it also weakens the area around the king."
    },
    {
     "san": "Nc3",
     "note": "Continues development."
    },
    {
     "san": "Nf6",
     "note": "Develops symmetrically."
    },
    {
     "san": "Bg5",
     "note": "Pins the knight on f6."
    },
    {
     "san": "Be7",
     "note": "Prepares to break the pin."
    },
    {
     "san": "Bxf6",
     "note": "White exchanges deliberately to remove a defender near the black king."
    },
    {
     "san": "Bxf6",
     "note": "Black recaptures."
    },
    {
     "san": "e4",
     "note": "White opens the center and prepares to attack the weakened king."
    },
    {
     "san": "fxe4",
     "note": "Black takes in the center."
    },
    {
     "san": "Nxe4",
     "note": "White recaptures and centralizes the knight."
    },
    {
     "san": "b6",
     "note": "Black tries to open the bishop's diagonal, but development is still behind."
    },
    {
     "san": "Ne5",
     "note": "The knight jumps toward the key squares around g4 and f7."
    },
    {
     "san": "O-O",
     "note": "Black castles, but the newly castled king becomes the target."
    },
    {
     "san": "Bd3",
     "note": "The bishop takes aim at h7 and completes the attacking setup."
    },
    {
     "san": "Bb7",
     "note": "Black tries to defend, but the response is too slow."
    },
    {
     "san": "Qh5",
     "note": "The queen attacks h7 twice and prepares the decisive sacrifice."
    },
    {
     "san": "Qe7",
     "note": "Black attempts to meet the threat."
    },
    {
     "san": "Qxh7+",
     "note": "The queen captures on h7 with check, sacrificing itself to tear open the king's shelter."
    },
    {
     "san": "Kxh7",
     "note": "Black accepts the queen in the selected line, pulling the king out."
    },
    {
     "san": "Nxf6+",
     "note": "The knight checks and drives the king farther away."
    },
    {
     "san": "Kh6",
     "note": "The king moves in the selected variation; the position may offer other legal choices."
    },
    {
     "san": "Neg4+",
     "note": "The second knight joins the checks."
    },
    {
     "san": "Kg5",
     "note": "The king is driven toward the center."
    },
    {
     "san": "h4+",
     "note": "Even the pawn gives check, cutting off the return route."
    },
    {
     "san": "Kf4",
     "note": "The king is forced deeper into White's half of the board."
    },
    {
     "san": "g3+",
     "note": "Another pawn check continues the chase."
    },
    {
     "san": "Kf3",
     "note": "The king moves farther into the attack."
    },
    {
     "san": "Be2+",
     "note": "The bishop checks and keeps the king boxed in."
    },
    {
     "san": "Kg2",
     "note": "The king moves toward the corner."
    },
    {
     "san": "Rh2+",
     "note": "The rook joins the attack with check."
    },
    {
     "san": "Kg1",
     "note": "The king reaches the corner."
    },
    {
     "san": "O-O-O#",
     "note": "Castling completes the combination: the rook arrives on d1 and mates the king that has crossed the board."
    }
   ]
  }
 },
 {
  "id": "legal",
  "title": "ルガールの罠",
  "white": "ルガール・ド・ケルミュール",
  "black": "サン・ブリ",
  "year": 1750,
  "event": "パリ",
  "result": "1-0",
  "opening": "イタリアン風",
  "intro": "『ルガールのメイト』として教材で必ず登場する古典。クイーンを取らせてでもナイトとビショップで詰ませる、ピンを逆用した罠の原型です。",
  "takeaway": "ピンは万能ではない。詰みが見えているなら、ピンされた駒を動かしてでも軽い駒の連携で仕留められる。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "e5",
    "note": "対称。"
   },
   {
    "san": "Nf3",
    "note": "e5に当てる。"
   },
   {
    "san": "Nc6",
    "note": "守る。"
   },
   {
    "san": "Bc4",
    "note": "f7をにらむ。"
   },
   {
    "san": "d6",
    "note": "中央を固める受け身の手。"
   },
   {
    "san": "Nc3",
    "note": "展開。"
   },
   {
    "san": "Bg4",
    "note": "f3のナイトにピンをかけ、クイーンを縛ったつもりになる。"
   },
   {
    "san": "h3",
    "note": "ビショップに問いを発する。動くか、交換か。"
   },
   {
    "san": "Bh5",
    "note": "ピンを維持しようとするが、これが罠にはまる。"
   },
   {
    "san": "Nxe5",
    "note": "ピンされているはずのナイトを動かす衝撃の一手。クイーンを取らせる誘い。"
   },
   {
    "san": "Bxd1",
    "note": "黒はクイーンを取って大喜びするが、これが敗着。"
   },
   {
    "san": "Bxf7+",
    "note": "ビショップのチェック。キングを釣り出す。"
   },
   {
    "san": "Ke7",
    "note": "逃げ場はここだけ。"
   },
   {
    "san": "Nd5#",
    "note": "ナイトがd5に入りチェックメイト。クイーンを捨てて軽い駒3枚で詰ませた、罠の完成形。"
   }
  ],
  "en": {
   "title": "Legal's Trap",
   "white": "Kermur de Legal",
   "black": "Saint Brie",
   "opening": "Italian-style opening",
   "intro": "A classic pattern often taught as Legal's Mate. White allows the queen to be taken and then mates with the knights and bishop, turning a pin into a tactical resource.",
   "takeaway": "A pin is not absolute. When a mating sequence is available, a pinned piece may move if the concrete calculation supports it.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "e5",
     "note": "Black mirrors the move."
    },
    {
     "san": "Nf3",
     "note": "Attacks e5."
    },
    {
     "san": "Nc6",
     "note": "Defends the pawn."
    },
    {
     "san": "Bc4",
     "note": "The bishop targets f7."
    },
    {
     "san": "d6",
     "note": "A solid, passive central defense."
    },
    {
     "san": "Nc3",
     "note": "Develops another piece."
    },
    {
     "san": "Bg4",
     "note": "The bishop pins the f3-knight and thinks the queen has been secured."
    },
    {
     "san": "h3",
     "note": "White asks the bishop to decide between moving and exchanging."
    },
    {
     "san": "Bh5",
     "note": "The bishop keeps the pin, but this allows the tactical idea."
    },
    {
     "san": "Nxe5",
     "note": "The knight moves despite the pin and attacks the queen; White is offering it as bait."
    },
    {
     "san": "Bxd1",
     "note": "Black takes the queen, but this is the decisive mistake."
    },
    {
     "san": "Bxf7+",
     "note": "The bishop checks and draws the king into the mating net."
    },
    {
     "san": "Ke7",
     "note": "The king chooses the line shown in this study."
    },
    {
     "san": "Nd5#",
     "note": "The knight mates on d5. White has given up the queen to finish with a coordinated group of minor pieces."
    }
   ]
  }
 },
 {
  "id": "canal",
  "title": "ペルーの不減局",
  "white": "エステバン・カナル",
  "black": "無名の対戦者(NN)",
  "year": 1934,
  "event": "ブダペスト(公開対局)",
  "result": "1-0",
  "opening": "スカンジナビア・ディフェンス",
  "intro": "『ペルーのインモータル』と呼ばれる公開対局。白は両ルークを捨て、クイーンまで捨てて、最後はビショップ一枚で詰ませます。早いキャスリングが必ずしも安全でないことも教えてくれます。",
  "takeaway": "相手のキングサイドのキャスリングが逆に的になることもある。斜めのラインが開くと、犠牲の連鎖で一気に詰むことがある。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "d5",
    "note": "スカンジナビア。すぐにe4へ当てる。"
   },
   {
    "san": "exd5",
    "note": "取る。"
   },
   {
    "san": "Qxd5",
    "note": "クイーンで取り返すが、早くクイーンが盤に出て的になりやすい。"
   },
   {
    "san": "Nc3",
    "note": "クイーンに当てて手を稼ぎながら展開。"
   },
   {
    "san": "Qa5",
    "note": "斜めに逃げる定番の位置。"
   },
   {
    "san": "d4",
    "note": "中央を広げる。"
   },
   {
    "san": "c6",
    "note": "b5やd5の逃げ道とビショップの帰り道を作る。"
   },
   {
    "san": "Nf3",
    "note": "展開。"
   },
   {
    "san": "Bg4",
    "note": "f3のナイトにピンをかける。"
   },
   {
    "san": "Bf4",
    "note": "展開しつつc7方面もにらむ。"
   },
   {
    "san": "e6",
    "note": "ビショップの道を開ける。"
   },
   {
    "san": "h3",
    "note": "ピンのビショップに問う。"
   },
   {
    "san": "Bxf3",
    "note": "交換を選ぶ。"
   },
   {
    "san": "Qxf3",
    "note": "取り返し、クイーンが好位置に出る。"
   },
   {
    "san": "Bb4",
    "note": "ピンで反撃を試みる。"
   },
   {
    "san": "Be2",
    "note": "静かに備えつつキャスリングを用意。"
   },
   {
    "san": "Nd7",
    "note": "展開。"
   },
   {
    "san": "a3",
    "note": "ビショップに問う。"
   },
   {
    "san": "O-O-O",
    "note": "黒はクイーンサイドへキングを囲うが、まさにその方面が白の攻めの的になる。"
   },
   {
    "san": "axb4",
    "note": "ビショップを取り、黒クイーンを的にする。"
   },
   {
    "san": "Qxa1+",
    "note": "黒はルークを取ってチェックだが、これは白の連続犠牲の呼び水。"
   },
   {
    "san": "Kd2",
    "note": "チェックをキングでかわす。白は攻めに集中する。"
   },
   {
    "san": "Qxh1",
    "note": "黒はもう一台のルークまで取るが、これらの駒はキングを守りに戻れない。"
   },
   {
    "san": "Qxc6+",
    "note": "クイーンを捨てる決め手。取れば致命的なビショップのチェックが待つ。"
   },
   {
    "san": "bxc6",
    "note": "取るしかない。黒のキングの前が完全に開く。"
   },
   {
    "san": "Ba6#",
    "note": "ビショップがa6に入りチェックメイト。両ルークとクイーンを捨て、ビショップ一枚で締めくくる圧巻の幕切れ。"
   }
  ],
  "en": {
   "title": "The Peruvian Immortal",
   "white": "Esteban Canal",
   "black": "Anonymous (NN)",
   "opening": "Scandinavian Defense",
   "intro": "Known as the Peruvian Immortal, this attacking game ends with White sacrificing both rooks and the queen before mating with a single bishop. It also shows why an early castle is not automatically safe when the attacking lines point toward it.",
   "takeaway": "A castled king can still become a target. When a diagonal opens, a chain of sacrifices may suddenly make a mating attack possible.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "d5",
     "note": "The Scandinavian immediately challenges e4."
    },
    {
     "san": "exd5",
     "note": "White captures in the center."
    },
    {
     "san": "Qxd5",
     "note": "Black recaptures with the queen, developing it early but also making it a target."
    },
    {
     "san": "Nc3",
     "note": "Develops with tempo by attacking the queen."
    },
    {
     "san": "Qa5",
     "note": "The queen retreats to a standard diagonal square."
    },
    {
     "san": "d4",
     "note": "Expands in the center."
    },
    {
     "san": "c6",
     "note": "Creates an escape square for the queen and a route for the bishop."
    },
    {
     "san": "Nf3",
     "note": "Develops."
    },
    {
     "san": "Bg4",
     "note": "Pins the f3-knight."
    },
    {
     "san": "Bf4",
     "note": "Develops while looking toward c7."
    },
    {
     "san": "e6",
     "note": "Opens the bishop's diagonal."
    },
    {
     "san": "h3",
     "note": "Questions the pinned bishop."
    },
    {
     "san": "Bxf3",
     "note": "Black chooses the exchange."
    },
    {
     "san": "Qxf3",
     "note": "White recaptures and places the queen actively."
    },
    {
     "san": "Bb4",
     "note": "Black uses the pin to seek counterplay."
    },
    {
     "san": "Be2",
     "note": "White quietly prepares to castle."
    },
    {
     "san": "Nd7",
     "note": "Develops."
    },
    {
     "san": "a3",
     "note": "The bishop is questioned again."
    },
    {
     "san": "O-O-O",
     "note": "Black castles long in the selected line, but that side of the board is exactly where White's attack is aimed."
    },
    {
     "san": "axb4",
     "note": "White captures the bishop and opens lines toward the black queen."
    },
    {
     "san": "Qxa1+",
     "note": "Black takes a rook with check, but this is the first step in White's forcing sacrifice sequence."
    },
    {
     "san": "Kd2",
     "note": "The king answers the check; White keeps the initiative."
    },
    {
     "san": "Qxh1",
     "note": "Black takes the second rook, but the captured rooks cannot return to defend the king."
    },
    {
     "san": "Qxc6+",
     "note": "White sacrifices the queen with check. If Black accepts, the bishop's final check becomes decisive."
    },
    {
     "san": "bxc6",
     "note": "Black accepts in this line, leaving the king's front completely open."
    },
    {
     "san": "Ba6#",
     "note": "The bishop mates on a6. White has given up both rooks and the queen to finish with one bishop."
    }
   ]
  }
 },
 {
  "id": "levitsky_marshall",
  "title": "黄金の雨",
  "white": "ステパン・レヴィツキー",
  "black": "フランク・マーシャル",
  "year": 1912,
  "event": "ブレスラウ",
  "result": "0-1",
  "opening": "フレンチ風の中央戦",
  "intro": "黒番マーシャルの最終手が、あまりに美しく観客が盤上に金貨を投げたという伝説の一手で終わります(真偽は諸説あり)。三通りの取り方すべてが受からない、二股(フォーク)の妙。",
  "takeaway": "最も安全そうなマスへの駒の投入が、実は複数の必殺の狙いを同時に生む『捨てて二股』になることがある。",
  "moves": [
   {
    "san": "d4",
    "note": "中央を取る。"
   },
   {
    "san": "e6",
    "note": "フレンチ系の柔らかい出だし。"
   },
   {
    "san": "e4",
    "note": "中央をさらに広げる。"
   },
   {
    "san": "d5",
    "note": "中央に当てる。"
   },
   {
    "san": "Nc3",
    "note": "d5に当てて展開。"
   },
   {
    "san": "c5",
    "note": "中央のd4を突いて反撃。"
   },
   {
    "san": "Nf3",
    "note": "展開。"
   },
   {
    "san": "Nc6",
    "note": "展開。"
   },
   {
    "san": "exd5",
    "note": "中央を整理する。"
   },
   {
    "san": "exd5",
    "note": "取り返し、中央が開く。"
   },
   {
    "san": "Be2",
    "note": "展開しつつキャスリングを用意。"
   },
   {
    "san": "Nf6",
    "note": "展開。"
   },
   {
    "san": "O-O",
    "note": "キングを囲う。"
   },
   {
    "san": "Be7",
    "note": "展開。"
   },
   {
    "san": "Bg5",
    "note": "f6のナイトにピンをかける。"
   },
   {
    "san": "O-O",
    "note": "黒もキングを囲う。"
   },
   {
    "san": "dxc5",
    "note": "ポーンを取り、黒の中央を崩す。"
   },
   {
    "san": "Be6",
    "note": "展開しつつd5を支える。"
   },
   {
    "san": "Nd4",
    "note": "中央のナイトを好位置へ。"
   },
   {
    "san": "Bxc5",
    "note": "ポーンを回収し、ビショップが働く。"
   },
   {
    "san": "Nxe6",
    "note": "交換して黒の形を乱す。"
   },
   {
    "san": "fxe6",
    "note": "取り返すが、f列が開いて後に黒の攻め筋になる。"
   },
   {
    "san": "Bg4",
    "note": "e6を狙う。"
   },
   {
    "san": "Qd6",
    "note": "クイーンを活用。"
   },
   {
    "san": "Bh3",
    "note": "e6への圧力を保つ。"
   },
   {
    "san": "Rae8",
    "note": "ルークを開いたe列に据える。"
   },
   {
    "san": "Qd2",
    "note": "クイーンを整える。"
   },
   {
    "san": "Bb4",
    "note": "ピンで白のナイトを縛り、攻めの布石を敷く。"
   },
   {
    "san": "Bxf6",
    "note": "ピンを外そうと交換する。"
   },
   {
    "san": "Rxf6",
    "note": "ルークで取り返し、f列とクイーンサイドの攻めを見る。"
   },
   {
    "san": "Rad1",
    "note": "ルークをd列に。"
   },
   {
    "san": "Qc5",
    "note": "クイーンでc3のナイトのピンを強め、攻めを加速。"
   },
   {
    "san": "Qe2",
    "note": "受けを試みる。"
   },
   {
    "san": "Bxc3",
    "note": "ピンされたナイトを取り、白の陣形を壊す。"
   },
   {
    "san": "bxc3",
    "note": "取り返すが、白のポーン形が崩れる。"
   },
   {
    "san": "Qxc3",
    "note": "ポーンを取り、白陣に深く侵入する。"
   },
   {
    "san": "Rxd5",
    "note": "反撃してd5を取る。"
   },
   {
    "san": "Nd4",
    "note": "ナイトを絶好の位置へ。e2やf3をにらむ。"
   },
   {
    "san": "Qh5",
    "note": "反撃を狙って白クイーンが遠征。"
   },
   {
    "san": "Ref8",
    "note": "もう一台のルークもf列に重ね、攻めを集中。"
   },
   {
    "san": "Re5",
    "note": "受けを試みる。"
   },
   {
    "san": "Rh6",
    "note": "クイーンを狙いつつ攻めを継続。"
   },
   {
    "san": "Qg5",
    "note": "受ける。"
   },
   {
    "san": "Rxh3",
    "note": "ビショップを取り、白のキングの前をさらに開く。"
   },
   {
    "san": "Rc5",
    "note": "反撃を試みるが、次の一手で全てが終わる。"
   },
   {
    "san": "Qg3",
    "note": "空きマスへクイーンを『捨てる』伝説の一手。hxg3でもfxg3でもQxg3でも、いずれもNe2かNf3の二股や詰みが受からない。白は投了。"
   }
  ],
  "en": {
   "title": "The Gold Coins Game",
   "white": "Stepan Levitsky",
   "black": "Frank Marshall",
   "opening": "French-style central battle",
   "intro": "Marshall's final move was so striking that spectators were said to have thrown gold coins onto the board; the story is disputed. The move is a famous example of a queen sacrifice that creates several simultaneous tactical threats.",
   "takeaway": "A piece placed on a seemingly safe square can create multiple mating or winning threats at once. Sometimes the strongest fork begins with a sacrifice.",
   "moves": [
    {
     "san": "d4",
     "note": "Takes central space."
    },
    {
     "san": "e6",
     "note": "A flexible French-style setup."
    },
    {
     "san": "e4",
     "note": "Expands further in the center."
    },
    {
     "san": "d5",
     "note": "Challenges the center."
    },
    {
     "san": "Nc3",
     "note": "Develops while attacking d5."
    },
    {
     "san": "c5",
     "note": "Counters by striking at d4."
    },
    {
     "san": "Nf3",
     "note": "Develops."
    },
    {
     "san": "Nc6",
     "note": "Develops."
    },
    {
     "san": "exd5",
     "note": "White exchanges in the center."
    },
    {
     "san": "exd5",
     "note": "Black recaptures and opens the center."
    },
    {
     "san": "Be2",
     "note": "Develops and prepares to castle."
    },
    {
     "san": "Nf6",
     "note": "Develops."
    },
    {
     "san": "O-O",
     "note": "White castles."
    },
    {
     "san": "Be7",
     "note": "Black also develops."
    },
    {
     "san": "Bg5",
     "note": "The bishop pins the f6-knight and adds pressure."
    },
    {
     "san": "O-O",
     "note": "Black castles."
    },
    {
     "san": "dxc5",
     "note": "White captures the pawn and disturbs Black's center."
    },
    {
     "san": "Be6",
     "note": "Develops while supporting d5."
    },
    {
     "san": "Nd4",
     "note": "The knight centralizes."
    },
    {
     "san": "Bxc5",
     "note": "Black recovers the pawn and activates the bishop."
    },
    {
     "san": "Nxe6",
     "note": "White exchanges to damage Black's structure."
    },
    {
     "san": "fxe6",
     "note": "Black recaptures, opening the f-file and creating a possible attacking route."
    },
    {
     "san": "Bg4",
     "note": "The bishop targets e6."
    },
    {
     "san": "Qd6",
     "note": "The queen becomes active."
    },
    {
     "san": "Bh3",
     "note": "The bishop keeps pressure on e6."
    },
    {
     "san": "Rae8",
     "note": "The rook occupies the open e-file."
    },
    {
     "san": "Qd2",
     "note": "The queen improves its position."
    },
    {
     "san": "Bb4",
     "note": "The bishop pins the knight and prepares a tactical attack."
    },
    {
     "san": "Bxf6",
     "note": "White exchanges to remove the pin."
    },
    {
     "san": "Rxf6",
     "note": "Black recaptures with the rook and eyes the f-file."
    },
    {
     "san": "Rad1",
     "note": "The rook reaches the d-file."
    },
    {
     "san": "Qc5",
     "note": "The queen strengthens the pin on the knight and accelerates the attack."
    },
    {
     "san": "Qe2",
     "note": "White tries to defend."
    },
    {
     "san": "Bxc3",
     "note": "Black captures the pinned knight and damages the pawn structure."
    },
    {
     "san": "bxc3",
     "note": "White recaptures, but the pawn structure is weakened."
    },
    {
     "san": "Qxc3",
     "note": "The queen captures deeply and enters the white position."
    },
    {
     "san": "Rxd5",
     "note": "White counterattacks by taking on d5."
    },
    {
     "san": "Nd4",
     "note": "The knight reaches a strong square and attacks e2 and f3."
    },
    {
     "san": "Qh5",
     "note": "The queen moves forward to seek counterplay."
    },
    {
     "san": "Ref8",
     "note": "The second rook joins the f-file and concentrates the attack."
    },
    {
     "san": "Re5",
     "note": "White tries to defend."
    },
    {
     "san": "Rh6",
     "note": "The rook attacks the queen and keeps the attack going."
    },
    {
     "san": "Qg5",
     "note": "White tries to defend again."
    },
    {
     "san": "Rxh3",
     "note": "The rook captures the bishop and opens more lines around the king."
    },
    {
     "san": "Rc5",
     "note": "White attempts a counterattack, but the next move ends the game."
    },
    {
     "san": "Qg3",
     "note": "The queen is offered on an apparently safe square. Each of the three captures leads to a decisive fork or mating attack; White resigns."
    }
   ]
  }
 },
 {
  "id": "byrne_fischer",
  "title": "世紀の対局",
  "white": "ドナルド・バーン",
  "black": "ボビー・フィッシャー",
  "year": 1956,
  "event": "ニューヨーク(ローゼンワルド杯)",
  "result": "0-1",
  "opening": "グリュンフェルト・ディフェンス",
  "intro": "13歳のフィッシャーが放った歴史的名局。クイーンを捨てながら、ビショップ・ナイト・ルークの完璧な連携で相手を縛り上げ、最後は自分のキングを安全に保ったまま相手のキングを追い詰めます。若き天才の構想力の証明。",
  "takeaway": "クイーンより働く軽い駒たちの連携。相手のキングを終始危険にさらし続ければ、駒の質より『働きの総和』が勝る。",
  "moves": [
   {
    "san": "Nf3",
    "note": "柔らかい出だし。中央を決めずに様子を見る。"
   },
   {
    "san": "Nf6",
    "note": "対称に応じる。"
   },
   {
    "san": "c4",
    "note": "英国式。c4で中央に間接的に働きかける。"
   },
   {
    "san": "g6",
    "note": "キングをg7のビショップで守るグリュンフェルト/キングズインディアン系の構え。"
   },
   {
    "san": "Nc3",
    "note": "展開。"
   },
   {
    "san": "Bg7",
    "note": "長い斜めににらむビショップ。この駒が終盤まで主役になる。"
   },
   {
    "san": "d4",
    "note": "中央を占める。"
   },
   {
    "san": "O-O",
    "note": "キングを早めに安全にする。"
   },
   {
    "san": "Bf4",
    "note": "展開しつつc7方面もにらむ。"
   },
   {
    "san": "d5",
    "note": "グリュンフェルト。中央に反発して主導権を争う。"
   },
   {
    "san": "Qb3",
    "note": "d5とb7をにらむ。"
   },
   {
    "san": "dxc4",
    "note": "クイーンを誘い出しつつポーンを取る。"
   },
   {
    "san": "Qxc4",
    "note": "取り返す。"
   },
   {
    "san": "c6",
    "note": "b5やd5の準備をし、ビショップの帰り道も作る。"
   },
   {
    "san": "e4",
    "note": "中央を大きく占め、白は優勢に見える。"
   },
   {
    "san": "Nbd7",
    "note": "展開しつつb6からの反撃を用意。"
   },
   {
    "san": "Rd1",
    "note": "d列にルークを据える。"
   },
   {
    "san": "Nb6",
    "note": "白クイーンに当てて手を稼ぐ。"
   },
   {
    "san": "Qc5",
    "note": "クイーンを保つ。"
   },
   {
    "san": "Bg4",
    "note": "f3のナイトにピンをかけ、中央への圧力を強める。"
   },
   {
    "san": "Bg5",
    "note": "反撃を試みる。"
   },
   {
    "san": "Na4",
    "note": "白クイーンとb2を同時に狙い、攻めの号砲を鳴らす鋭手。"
   },
   {
    "san": "Qa3",
    "note": "クイーンは逃げる。"
   },
   {
    "san": "Nxc3",
    "note": "白の陣形を崩し、中央突破の準備。"
   },
   {
    "san": "bxc3",
    "note": "取り返すが、白のポーンとキングの守りが乱れる。"
   },
   {
    "san": "Nxe4",
    "note": "中央のポーンを取る大胆な一手。ピンや反撃の網を張る。"
   },
   {
    "san": "Bxe7",
    "note": "黒クイーンを取りにいくが、これがフィッシャーの罠にはまる。"
   },
   {
    "san": "Qb6",
    "note": "クイーンを守りに使わず、逆に白のキング方面と中央を狙う。"
   },
   {
    "san": "Bc4",
    "note": "受けを試みる。"
   },
   {
    "san": "Nxc3",
    "note": "ナイトでチェックをかけ、コンビネーションの本番へ。"
   },
   {
    "san": "Bc5",
    "note": "白は苦しい受け。"
   },
   {
    "san": "Rfe8+",
    "note": "ルークでチェックし、白のキングを追う。"
   },
   {
    "san": "Kf1",
    "note": "逃げるしかない。"
   },
   {
    "san": "Be6",
    "note": "驚愕の一手。白クイーンを取らせても構わないと、ビショップを差し出す。"
   },
   {
    "san": "Bxb6",
    "note": "白はついにクイーンを取るが…"
   },
   {
    "san": "Bxc4+",
    "note": "チェックをかけながら取り返し、黒の軽い駒が一斉に働き出す。"
   },
   {
    "san": "Kg1",
    "note": "逃げる。"
   },
   {
    "san": "Ne2+",
    "note": "ナイトのチェック。連続チェックで白のキングを縛る。"
   },
   {
    "san": "Kf1",
    "note": "戻る。"
   },
   {
    "san": "Nxd4+",
    "note": "ポーンを取りながらチェック。駒得を重ねる。"
   },
   {
    "san": "Kg1",
    "note": "戻る。"
   },
   {
    "san": "Ne2+",
    "note": "再びチェックで位置を整える。"
   },
   {
    "san": "Kf1",
    "note": "戻る。"
   },
   {
    "san": "Nc3+",
    "note": "ディスカバードチェック。白クイーンやルークへの利きも生む。"
   },
   {
    "san": "Kg1",
    "note": "戻る。"
   },
   {
    "san": "axb6",
    "note": "落ち着いてビショップを回収。黒は駒得のうえ全駒が絶好調。"
   },
   {
    "san": "Qb4",
    "note": "反撃を試みる。"
   },
   {
    "san": "Ra4",
    "note": "クイーンに当てて主導権を握り続ける。"
   },
   {
    "san": "Qxb6",
    "note": "取るが…"
   },
   {
    "san": "Nxd1",
    "note": "ルークを取り、黒の駒得は決定的になる。"
   },
   {
    "san": "h3",
    "note": "白はキングに空気を作ろうとする。"
   },
   {
    "san": "Rxa2",
    "note": "ルークが暴れ、白陣を刈り取る。"
   },
   {
    "san": "Kh2",
    "note": "キングを逃がす。"
   },
   {
    "san": "Nxf2",
    "note": "さらにポーンを取り、白の抵抗を削ぐ。"
   },
   {
    "san": "Re1",
    "note": "反撃を試みる。"
   },
   {
    "san": "Rxe1",
    "note": "交換して白の反撃の芽を摘む。"
   },
   {
    "san": "Qd8+",
    "note": "チェックで粘る。"
   },
   {
    "san": "Bf8",
    "note": "冷静に受ける。黒のキングは終始安全。"
   },
   {
    "san": "Nxe1",
    "note": "取り返す。"
   },
   {
    "san": "Bd5",
    "note": "ビショップを絶好の斜めに据え、白のキングへの網を絞る。"
   },
   {
    "san": "Nf3",
    "note": "白は逃げ回る。"
   },
   {
    "san": "Ne4",
    "note": "ナイトを中央へ戻し、詰めの布陣を作る。"
   },
   {
    "san": "Qb8",
    "note": "白は反撃を探すが手がない。"
   },
   {
    "san": "b5",
    "note": "ポーンも押し上げ、白のキングへの包囲を完成させにいく。"
   },
   {
    "san": "h4",
    "note": "白は的のないポーンを突くしかない。"
   },
   {
    "san": "h5",
    "note": "黒も応じて陣形を保つ。"
   },
   {
    "san": "Ne5",
    "note": "白は最後の抵抗。"
   },
   {
    "san": "Kg7",
    "note": "キングを安全に整え、寄せの態勢を作る。"
   },
   {
    "san": "Kg1",
    "note": "白のキングは隅で震える。"
   },
   {
    "san": "Bc5+",
    "note": "チェックで寄せの最終盤に入る。"
   },
   {
    "san": "Kf1",
    "note": "逃げる。"
   },
   {
    "san": "Ng3+",
    "note": "ナイトのチェック。網が閉じ始める。"
   },
   {
    "san": "Ke1",
    "note": "逃げる。"
   },
   {
    "san": "Bb4+",
    "note": "チェックで白のキングを追う。"
   },
   {
    "san": "Kd1",
    "note": "逃げる。"
   },
   {
    "san": "Bb3+",
    "note": "斜めのチェックで仕留めにかかる。"
   },
   {
    "san": "Kc1",
    "note": "隅へ。"
   },
   {
    "san": "Ne2+",
    "note": "チェック。"
   },
   {
    "san": "Kb1",
    "note": "逃げ場が尽きる。"
   },
   {
    "san": "Nc3+",
    "note": "チェックで位置を決める。"
   },
   {
    "san": "Kc1",
    "note": "戻るしかない。"
   },
   {
    "san": "Rc2#",
    "note": "ルークがc2に入りチェックメイト。13歳の少年が、クイーンを捨てて軽い駒だけで相手のキングを狩り切った、まさに世紀の一局。"
   }
  ],
  "en": {
   "title": "The Game of the Century",
   "white": "Donald Byrne",
   "black": "Bobby Fischer",
   "opening": "Grünfeld Defense",
   "intro": "A historic game played by thirteen-year-old Bobby Fischer. He sacrifices the queen and uses the bishop, knight, and rooks so effectively that White's king remains under pressure while Black's own king stays safe.",
   "takeaway": "Coordination can outweigh the nominal value of a queen. If the enemy king remains under lasting pressure, the activity of several lesser pieces may be decisive.",
   "moves": [
    {
     "san": "Nf3",
     "note": "A flexible move that keeps the center undecided."
    },
    {
     "san": "Nf6",
     "note": "Black replies symmetrically."
    },
    {
     "san": "c4",
     "note": "The English Opening challenges the center from the side."
    },
    {
     "san": "g6",
     "note": "A kingside fianchetto prepares to protect the king with the g7-bishop."
    },
    {
     "san": "Nc3",
     "note": "Develops."
    },
    {
     "san": "Bg7",
     "note": "The bishop reaches its long diagonal; it will remain important throughout the game."
    },
    {
     "san": "d4",
     "note": "White occupies the center."
    },
    {
     "san": "O-O",
     "note": "Black castles early and secures the king."
    },
    {
     "san": "Bf4",
     "note": "Develops while looking toward c7."
    },
    {
     "san": "d5",
     "note": "The Grünfeld challenges White's broad center immediately."
    },
    {
     "san": "Qb3",
     "note": "The queen attacks d5 and b7."
    },
    {
     "san": "dxc4",
     "note": "Black captures and draws the queen forward while taking a pawn."
    },
    {
     "san": "Qxc4",
     "note": "White recaptures."
    },
    {
     "san": "c6",
     "note": "Prepares ...b5 or ...d5 and opens a route for the bishop."
    },
    {
     "san": "e4",
     "note": "White builds a large center and appears to have the space advantage."
    },
    {
     "san": "Nbd7",
     "note": "Develops and prepares a ...b6 counterattack."
    },
    {
     "san": "Rd1",
     "note": "The rook takes the d-file."
    },
    {
     "san": "Nb6",
     "note": "Black attacks the queen with tempo."
    },
    {
     "san": "Qc5",
     "note": "The queen preserves itself."
    },
    {
     "san": "Bg4",
     "note": "The bishop pins the f3-knight and increases pressure on the center."
    },
    {
     "san": "Bg5",
     "note": "White tries to create counterplay."
    },
    {
     "san": "Na4",
     "note": "The knight attacks the queen and b2 at once, starting a sharp tactical sequence."
    },
    {
     "san": "Qa3",
     "note": "The queen retreats in the selected line."
    },
    {
     "san": "Nxc3",
     "note": "Black exchanges on c3 and prepares to break through the center."
    },
    {
     "san": "bxc3",
     "note": "White recaptures, but the pawn structure and king shelter are disturbed."
    },
    {
     "san": "Nxe4",
     "note": "Black takes the central pawn and sets tactical pressure around the pinned knight."
    },
    {
     "san": "Bxe7",
     "note": "White appears to win the queen, but this capture enters Fischer's combination."
    },
    {
     "san": "Qb6",
     "note": "The queen remains active instead of defending passively, attacking the center and the white king."
    },
    {
     "san": "Bc4",
     "note": "White tries to hold the position together."
    },
    {
     "san": "Nxc3",
     "note": "The knight checks and begins the forcing phase."
    },
    {
     "san": "Bc5",
     "note": "White answers the check."
    },
    {
     "san": "Rfe8+",
     "note": "The rook checks and drives the king away."
    },
    {
     "san": "Kf1",
     "note": "The king moves in the selected line."
    },
    {
     "san": "Be6",
     "note": "The bishop offers itself, allowing White to take the queen while opening lines for Black's remaining pieces."
    },
    {
     "san": "Bxb6",
     "note": "White takes the queen, but Black's tactical compensation is decisive."
    },
    {
     "san": "Bxc4+",
     "note": "The bishop recaptures with check and brings the light pieces into full activity."
    },
    {
     "san": "Kg1",
     "note": "The king moves."
    },
    {
     "san": "Ne2+",
     "note": "The knight checks and keeps the king tied down."
    },
    {
     "san": "Kf1",
     "note": "The king returns."
    },
    {
     "san": "Nxd4+",
     "note": "The knight captures with check and gains more material."
    },
    {
     "san": "Kg1",
     "note": "The king returns."
    },
    {
     "san": "Ne2+",
     "note": "The knight checks again and improves its position."
    },
    {
     "san": "Kf1",
     "note": "The king returns."
    },
    {
     "san": "Nc3+",
     "note": "A discovered check also attacks the white queen and rook."
    },
    {
     "san": "Kg1",
     "note": "The king returns."
    },
    {
     "san": "axb6",
     "note": "Black calmly recaptures the bishop. Black has material and every piece is active."
    },
    {
     "san": "Qb4",
     "note": "White searches for counterplay."
    },
    {
     "san": "Ra4",
     "note": "The rook attacks the queen and keeps the initiative."
    },
    {
     "san": "Qxb6",
     "note": "White takes the bishop, but Black wins a rook."
    },
    {
     "san": "Nxd1",
     "note": "The knight captures the rook, making Black's material advantage decisive."
    },
    {
     "san": "h3",
     "note": "White creates luft for the king."
    },
    {
     "san": "Rxa2",
     "note": "The rook invades the second rank and collects material."
    },
    {
     "san": "Kh2",
     "note": "The king moves away."
    },
    {
     "san": "Nxf2",
     "note": "The knight takes another pawn and reduces resistance."
    },
    {
     "san": "Re1",
     "note": "White tries to activate the rook."
    },
    {
     "san": "Rxe1",
     "note": "Black exchanges it and removes the counterplay."
    },
    {
     "san": "Qd8+",
     "note": "White checks to prolong the game."
    },
    {
     "san": "Bf8",
     "note": "Black blocks calmly; the black king remains safe."
    },
    {
     "san": "Nxe1",
     "note": "White recaptures."
    },
    {
     "san": "Bd5",
     "note": "The bishop takes an excellent diagonal and tightens the net around the king."
    },
    {
     "san": "Nf3",
     "note": "White's knight searches for a square."
    },
    {
     "san": "Ne4",
     "note": "The knight centralizes and prepares the final attack."
    },
    {
     "san": "Qb8",
     "note": "White looks for counterplay, but has no effective plan."
    },
    {
     "san": "b5",
     "note": "The pawn advances and completes the encirclement of the king."
    },
    {
     "san": "h4",
     "note": "White can only make a waiting pawn move."
    },
    {
     "san": "h5",
     "note": "Black preserves the formation."
    },
    {
     "san": "Ne5",
     "note": "White makes a final attempt."
    },
    {
     "san": "Kg7",
     "note": "The king improves its safety and prepares the finish."
    },
    {
     "san": "Kg1",
     "note": "White's king returns to the corner."
    },
    {
     "san": "Bc5+",
     "note": "The bishop checks and begins the final sequence."
    },
    {
     "san": "Kf1",
     "note": "The king moves."
    },
    {
     "san": "Ng3+",
     "note": "The knight checks and closes more escape squares."
    },
    {
     "san": "Ke1",
     "note": "The king moves."
    },
    {
     "san": "Bb4+",
     "note": "The bishop checks again."
    },
    {
     "san": "Kd1",
     "note": "The king moves."
    },
    {
     "san": "Bb3+",
     "note": "The bishop checks from the diagonal."
    },
    {
     "san": "Kc1",
     "note": "The king moves toward the corner."
    },
    {
     "san": "Ne2+",
     "note": "The knight checks."
    },
    {
     "san": "Kb1",
     "note": "The king moves to b1."
    },
    {
     "san": "Nc3+",
     "note": "The knight checks and forces the king onto the mating route."
    },
    {
     "san": "Kc1",
     "note": "The king returns."
    },
    {
     "san": "Rc2#",
     "note": "The rook mates on c2. Fischer has sacrificed the queen and used the minor pieces to complete a legendary king hunt."
    }
   ]
  }
 },
 {
  "id": "deepblue_kasparov",
  "title": "ディープ・ブルー対カスパロフ 第6局（1997）",
  "white": "ディープ・ブルー",
  "black": "ガルリ・カスパロフ",
  "year": 1997,
  "event": "IBMマン・マシン戦再戦・ニューヨーク 第6局",
  "result": "1-0",
  "opening": "カロ・カン・ディフェンス（シュタイニッツ・バリエーション、B17）",
  "intro": "1997年5月11日にニューヨークで行われた、ディープ・ブルー対カスパロフ再戦の第6局です。7...h6の直後に、ディープ・ブルーは有名な8.Nxe6!のナイト犠牲を決め、19.c4のあとカスパロフが投了しました。",
  "takeaway": "定跡は手順の丸暗記だけではない。8.Nxe6!のような犠牲は、駒得だけでなく相手キングの安全と自分の展開の速さを合わせて評価する。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "c6",
    "note": "カロ・カン。次にd5とぶつける準備。"
   },
   {
    "san": "d4",
    "note": "堂々と中央を広げる。"
   },
   {
    "san": "d5",
    "note": "予定通り中央にポーンをぶつける。"
   },
   {
    "san": "Nc3",
    "note": "d5に当てて展開。"
   },
   {
    "san": "dxe4",
    "note": "中央のポーンを交換する。"
   },
   {
    "san": "Nxe4",
    "note": "取り返し、ナイトを中央の好位置に置く。"
   },
   {
    "san": "Nd7",
    "note": "次のNgf6に備えて展開する。"
   },
   {
    "san": "Ng5",
    "note": "f7とe6をにらんでナイトを跳ねる、攻撃的な一手。"
   },
   {
    "san": "Ngf6",
    "note": "もう一枚のナイトを展開し、g5のナイトに対応する。"
   },
   {
    "san": "Bd3",
    "note": "攻めのビショップを繰り出す。"
   },
   {
    "san": "e6",
    "note": "ビショップの利きを止め、陣形を整える。"
   },
   {
    "san": "N1f3",
    "note": "もう一枚のナイトも展開し、攻めの駒をそろえる。"
   },
   {
    "san": "h6",
    "note": "g5のナイトを追う。直後の8.Nxe6!につながる、実戦で注目された一手。"
   },
   {
    "san": "Nxe6",
    "note": "実戦で決まったナイト犠牲。黒王の安全と展開の遅れを突く、局面の核心。"
   },
   {
    "san": "Qe7",
    "note": "ナイトをすぐには取らず、クイーンで受ける実戦の応手。"
   },
   {
    "san": "O-O",
    "note": "まずキングを安全にし、ルークも攻撃へ参加させる。"
   },
   {
    "san": "fxe6",
    "note": "ナイトを取る。fポーンが動いてキング周辺の守りが変わり、e6のポーンが攻撃目標になる。"
   },
   {
    "san": "Bg6+",
    "note": "ビショップがチェック。黒王は動かざるを得ず、キャスリング権も失う。"
   },
   {
    "san": "Kd8",
    "note": "キングをd8へ移すが、中央で危険にさらされる。"
   },
   {
    "san": "Bf4",
    "note": "ビショップを攻撃に加え、e6への圧力を強める。"
   },
   {
    "san": "b5",
    "note": "クイーンサイドで反撃し、スペースを取ろうとする。"
   },
   {
    "san": "a4",
    "note": "b5を攻め、クイーンサイドを開く準備をする。"
   },
   {
    "san": "Bb7",
    "note": "ビショップを長い対角線へ展開する。"
   },
   {
    "san": "Re1",
    "note": "ルークをeファイルに置き、e6のポーンとe7周辺を狙う。"
   },
   {
    "san": "Nd5",
    "note": "ナイトを中央に置いて守りを固める。"
   },
   {
    "san": "Bg3",
    "note": "ビショップを引きつつ、e5経由の圧力を保つ。"
   },
   {
    "san": "Kc8",
    "note": "キングをc8へ移して少しでも安全を求める。"
   },
   {
    "san": "axb5",
    "note": "クイーンサイドを交換して攻撃の線を開く。"
   },
   {
    "san": "cxb5",
    "note": "cポーンで取り返し、局面を保つ。"
   },
   {
    "san": "Qd3",
    "note": "クイーンも攻撃に加わり、b5とe6を同時に狙う。"
   },
   {
    "san": "Bc6",
    "note": "ビショップをc6へ置いて守る。"
   },
   {
    "san": "Bf5",
    "note": "e6をさらに攻め、黒の守りに決断を迫る。"
   },
   {
    "san": "exf5",
    "note": "e6のポーンでビショップを取るが、eファイルが開く。"
   },
   {
    "san": "Rxe7",
    "note": "ルークがe7のクイーンを取り、黒はクイーンを失う。"
   },
   {
    "san": "Bxe7",
    "note": "ビショップでルークを取り返すが、白の攻撃と駒の働きは決定的。"
   },
   {
    "san": "c4",
    "note": "この手のあとカスパロフが投了。白のクイーンが侵入する脅威が残り、実戦はここで終わった。"
   }
  ],
  "en": {
   "title": "Deep Blue vs. Kasparov, Game 6 (1997)",
   "white": "Deep Blue",
   "black": "Garry Kasparov",
   "opening": "Caro-Kann Defense, Steinitz Variation (B17)",
   "intro": "This is Game 6, the sixth and final game of the 1997 Deep Blue–Kasparov rematch in New York. After 7...h6, Deep Blue played the famous 8.Nxe6! knight sacrifice, and Kasparov resigned after 19.c4.",
   "takeaway": "Opening moves are not just a sequence to memorize. The 8.Nxe6! sacrifice works because it combines pressure on the king with White's lead in development; evaluate material together with king safety and piece activity.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "c6",
     "note": "The Caro-Kann prepares ...d5."
    },
    {
     "san": "d4",
     "note": "White expands confidently in the center."
    },
    {
     "san": "d5",
     "note": "Black challenges the center as planned."
    },
    {
     "san": "Nc3",
     "note": "Develops while attacking d5."
    },
    {
     "san": "dxe4",
     "note": "Black exchanges the central pawns."
    },
    {
     "san": "Nxe4",
     "note": "White recaptures and centralizes the knight."
    },
    {
     "san": "Nd7",
     "note": "A solid move preparing ...Ngf6."
    },
    {
     "san": "Ng5",
     "note": "The knight attacks f7 and e6 and begins an aggressive plan."
    },
    {
     "san": "Ngf6",
     "note": "The other knight develops and addresses the g5-knight."
    },
    {
     "san": "Bd3",
     "note": "The bishop joins the attack."
    },
    {
     "san": "e6",
     "note": "Black blocks the bishop and strengthens the structure."
    },
    {
     "san": "N1f3",
     "note": "The second knight develops and brings more force toward the king."
    },
    {
     "san": "h6",
     "note": "Black attacks the g5-knight. This move became the key moment before 8.Nxe6! in the actual game."
    },
    {
     "san": "Nxe6",
     "note": "The famous knight sacrifice from the game. It exploits Black's king safety and lag in development."
    },
    {
     "san": "Qe7",
     "note": "Black does not take immediately and uses the queen to meet the sacrifice."
    },
    {
     "san": "O-O",
     "note": "White castles, secures the king, and brings the rook toward the attack."
    },
    {
     "san": "fxe6",
     "note": "Black takes the knight. The f-pawn has moved, and the e6-pawn becomes the main target."
    },
    {
     "san": "Bg6+",
     "note": "The bishop checks; the black king must move and loses the right to castle."
    },
    {
     "san": "Kd8",
     "note": "The king moves to d8 and remains exposed in the center."
    },
    {
     "san": "Bf4",
     "note": "White brings another bishop into the attack and increases the pressure on e6."
    },
    {
     "san": "b5",
     "note": "Black seeks counterplay on the queenside."
    },
    {
     "san": "a4",
     "note": "White attacks b5 and prepares to open lines on the queenside."
    },
    {
     "san": "Bb7",
     "note": "The bishop develops along the long diagonal."
    },
    {
     "san": "Re1",
     "note": "The rook targets the e6-pawn and the e7-square."
    },
    {
     "san": "Nd5",
     "note": "Black places a knight in the center to defend."
    },
    {
     "san": "Bg3",
     "note": "The bishop retreats while preserving its pressure."
    },
    {
     "san": "Kc8",
     "note": "The king moves to c8 in search of safety."
    },
    {
     "san": "axb5",
     "note": "White opens the queenside to keep the attack moving."
    },
    {
     "san": "cxb5",
     "note": "Black recaptures with the c-pawn."
    },
    {
     "san": "Qd3",
     "note": "The queen joins the attack and targets b5 and e6."
    },
    {
     "san": "Bc6",
     "note": "The bishop moves to c6 to defend."
    },
    {
     "san": "Bf5",
     "note": "The bishop attacks e6 and forces a decision."
    },
    {
     "san": "exf5",
     "note": "The e6-pawn captures the bishop, but the e-file opens."
    },
    {
     "san": "Rxe7",
     "note": "The rook takes the queen on e7; Black has lost the queen."
    },
    {
     "san": "Bxe7",
     "note": "Black recaptures the rook, but White's attack and piece activity are decisive."
    },
    {
     "san": "c4",
     "note": "After this move Kasparov resigned. White threatens to invade with the queen, and the historical game ends here."
    }
   ]
  }
 },
 {
  "id": "kasparov_topalov",
  "title": "カスパロフの大王狩り",
  "white": "ガルリ・カスパロフ",
  "black": "ヴェセリン・トパロフ",
  "year": 1999,
  "event": "ホーホーフェンス・トーナメント(ウェイク・アーン・ゼー)",
  "result": "1-0",
  "opening": "ピルツ・ディフェンス",
  "intro": "『カスパロフのイモータル』と讃えられる、史上屈指の大作。ルークを捨てて相手のキングを自陣から敵陣のすみずみまで引きずり回し、盤を横断するキング狩りで仕留めます。",
  "takeaway": "決め手が見えたら駒の損得を超えて踏み込む。連続チェックで相手のキングを『逃げ道のある広い場所』へ誘い出し、正確な追撃で仕留める。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "d6",
    "note": "ピルツ。いったん中央を譲り、g7のビショップで反撃をねらう。"
   },
   {
    "san": "d4",
    "note": "中央を広く占領する。"
   },
   {
    "san": "Nf6",
    "note": "e4をけん制。"
   },
   {
    "san": "Nc3",
    "note": "展開しつつ中央を支える。"
   },
   {
    "san": "g6",
    "note": "ビショップをg7へ構える準備。"
   },
   {
    "san": "Be3",
    "note": "駒を出しつつ、次のQd2‑Bh6の攻め筋を用意。"
   },
   {
    "san": "Bg7",
    "note": "フィアンケットのビショップが長い斜めをにらむ。"
   },
   {
    "san": "Qd2",
    "note": "クイーンを出し、h6への攻めとキャスリングを準備。"
   },
   {
    "san": "c6",
    "note": "b5の反撃とキングの逃げ道を用意する柔らかい一手。"
   },
   {
    "san": "f3",
    "note": "e4を固め、後のg4‑h4の攻めの土台にする。"
   },
   {
    "san": "b5",
    "note": "反対側で反撃を開始。互いに逆方向へ攻める激しい将棋に。"
   },
   {
    "san": "Nge2",
    "note": "ナイトを展開し、キングを早く囲う準備。"
   },
   {
    "san": "Nbd7",
    "note": "駒を組み、後のc5やe5に備える。"
   },
   {
    "san": "Bh6",
    "note": "にらみ合うビショップを交換し、黒のキングの守りを削る。"
   },
   {
    "san": "Bxh6",
    "note": "取り返すしかない。"
   },
   {
    "san": "Qxh6",
    "note": "クイーンが黒のキングのそばに居座り、圧力をかける。"
   },
   {
    "san": "Bb7",
    "note": "ビショップを長い斜めへ。中央のe4をにらむ。"
   },
   {
    "san": "a3",
    "note": "b4を防ぎ、自分のキングの安全を確保。"
   },
   {
    "san": "e5",
    "note": "中央で反撃。局面が一気に開いていく。"
   },
   {
    "san": "O-O-O",
    "note": "白は反対側へキャスリングし、キングを左へ避難させる。"
   },
   {
    "san": "Qe7",
    "note": "駒を連結し、O-O-Oを準備。"
   },
   {
    "san": "Kb1",
    "note": "キングをさらに安全なマスへ寄せる用心。"
   },
   {
    "san": "a6",
    "note": "自分のキングの壁を整える。"
   },
   {
    "san": "Nc1",
    "note": "ナイトをb3へ回して中央を狙う組み替え。"
   },
   {
    "san": "O-O-O",
    "note": "黒も反対側へキングを囲う。両者のキングが左右に分かれ、総攻撃の号砲。"
   },
   {
    "san": "Nb3",
    "note": "ナイトを好位置へ。d4とc5をにらむ。"
   },
   {
    "san": "exd4",
    "note": "中央を清算する。"
   },
   {
    "san": "Rxd4",
    "note": "ルークで取り返し、d筋を主戦場にする。"
   },
   {
    "san": "c5",
    "note": "ルークに当てて追い返す。"
   },
   {
    "san": "Rd1",
    "note": "いったん引いて力を溜める。"
   },
   {
    "san": "Nb6",
    "note": "ナイトを前線へ。d5やc4をうかがう。"
   },
   {
    "san": "g3",
    "note": "ビショップの活用とh3の準備。"
   },
   {
    "san": "Kb8",
    "note": "キングを安全なマスへ整える。"
   },
   {
    "san": "Na5",
    "note": "ナイトがa5からc6・b7の急所をにらむ。"
   },
   {
    "san": "Ba8",
    "note": "ビショップを隅へ引いて長い斜めを保つ。"
   },
   {
    "san": "Bh3",
    "note": "ビショップを繰り出し、d7やe6の弱点を狙う。"
   },
   {
    "san": "d5",
    "note": "中央を突いて反撃するが、これが激しい戦いの引き金に。"
   },
   {
    "san": "Qf4+",
    "note": "チェックをかけつつクイーンを好位置へ転換。"
   },
   {
    "san": "Ka7",
    "note": "キングが上がって危険地帯へ。"
   },
   {
    "san": "Rhe1",
    "note": "最後のルークも戦線へ。全駒が黒のキングを向く。"
   },
   {
    "san": "d4",
    "note": "中央のポーンを押し込み、ナイトの利きを止めにいく。"
   },
   {
    "san": "Nd5",
    "note": "ナイトを中央へ跳ね、猛烈な圧力をかける。"
   },
   {
    "san": "Nbxd5",
    "note": "取るしかない。"
   },
   {
    "san": "exd5",
    "note": "取り返し、e筋とd筋が黒のキングへ向かって開く。"
   },
   {
    "san": "Qd6",
    "note": "懸命に受けの態勢を整える。"
   },
   {
    "san": "Rxd4",
    "note": "ルークを捨てる大決断!この一手から盤を横断するキング狩りが始まる。"
   },
   {
    "san": "cxd4",
    "note": "取れば…"
   },
   {
    "san": "Re7+",
    "note": "もう一枚のルークも突入してチェック。黒のキングを安全な自陣から引きずり出す。"
   },
   {
    "san": "Kb6",
    "note": "キングは前進を強いられる。"
   },
   {
    "san": "Qxd4+",
    "note": "クイーンがチェックで追撃。キングに安住の地はない。"
   },
   {
    "san": "Kxa5",
    "note": "キングはついに敵陣近くのa5まで引きずり出された。"
   },
   {
    "san": "b4+",
    "note": "ポーンでさらにチェックし、逃げ道を限定する。"
   },
   {
    "san": "Ka4",
    "note": "キングは盤の左端a4へ。まさに大王狩り。"
   },
   {
    "san": "Qc3",
    "note": "網を締める。キングの逃げ道を静かに消す。"
   },
   {
    "san": "Qxd5",
    "note": "黒も懸命に応戦しつつ受ける。"
   },
   {
    "san": "Ra7",
    "note": "ルークが7段目を走り、a列のキングを狙う。"
   },
   {
    "san": "Bb7",
    "note": "ビショップで受ける。"
   },
   {
    "san": "Rxb7",
    "note": "取ってさらに追撃を続ける。"
   },
   {
    "san": "Qc4",
    "note": "黒は反撃で紛れを求める。"
   },
   {
    "san": "Qxf6",
    "note": "駒を回収しつつ攻めをつなぐ。"
   },
   {
    "san": "Kxa3",
    "note": "キングは白陣めがけて逃げ続ける。"
   },
   {
    "san": "Qxa6+",
    "note": "チェックで追い立てる。"
   },
   {
    "san": "Kxb4",
    "note": "キングはさらに白陣へ。"
   },
   {
    "san": "c3+",
    "note": "ポーンのチェック。逃げ道を一つずつ消す。"
   },
   {
    "san": "Kxc3",
    "note": "取るしかない。"
   },
   {
    "san": "Qa1+",
    "note": "クイーンのチェックで網を締める。"
   },
   {
    "san": "Kd2",
    "note": "キングは白陣の奥へ迷い込む。"
   },
   {
    "san": "Qb2+",
    "note": "追撃のチェック。"
   },
   {
    "san": "Kd1",
    "note": "キングはついに白の1段目まで追い詰められた。"
   },
   {
    "san": "Bf1",
    "note": "ビショップが逃げ道をふさぐ静かな決め手。"
   },
   {
    "san": "Rd2",
    "note": "黒は必死の反撃を試みる。"
   },
   {
    "san": "Rd7",
    "note": "白は正確に受けと攻めを両立させる。"
   },
   {
    "san": "Rxd7",
    "note": "取り合う。"
   },
   {
    "san": "Bxc4",
    "note": "クイーンを取り返し、優勢を確定させる。"
   },
   {
    "san": "bxc4",
    "note": "取り返す。"
   },
   {
    "san": "Qxh8",
    "note": "遠くのルークも回収し、駒得が決定的に。"
   },
   {
    "san": "Rd3",
    "note": "黒は最後の粘り。"
   },
   {
    "san": "Qa8",
    "note": "クイーンを引き、cポーンを止めにいく。"
   },
   {
    "san": "c3",
    "note": "黒は望みをポーンの昇格に託す。"
   },
   {
    "san": "Qa4+",
    "note": "チェックで追いながらポーンを絡め取りにいく。"
   },
   {
    "san": "Ke1",
    "note": "キングは逃げ続ける。"
   },
   {
    "san": "f4",
    "note": "白は落ち着いて自分の攻めを進める。"
   },
   {
    "san": "f5",
    "note": "黒も応じる。"
   },
   {
    "san": "Kc1",
    "note": "キングを安全にし、寄せの態勢を整える。"
   },
   {
    "san": "Rd2",
    "note": "黒は食らいつく。"
   },
   {
    "san": "Qa7",
    "note": "クイーンで受けと攻めを両立。黒に有効な手はなく、トパロフは投了。盤を端から端まで走ったキング狩りの名局。"
   }
  ],
  "en": {
   "title": "Kasparov's Immortal King Hunt",
   "white": "Garry Kasparov",
   "black": "Veselin Topalov",
   "opening": "Pirc Defense",
   "intro": "Often called Kasparov's Immortal, this is one of the great attacking games. Kasparov sacrifices a rook and drives the black king across the board before finishing the hunt with precise checks.",
   "takeaway": "When the winning continuation is concrete, material is not the only measure. Use checks to drive the king into open space, then calculate the next net accurately.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "d6",
     "note": "The Pirc gives White the center while preparing counterplay with the g7-bishop."
    },
    {
     "san": "d4",
     "note": "White builds a broad center."
    },
    {
     "san": "Nf6",
     "note": "The knight challenges e4."
    },
    {
     "san": "Nc3",
     "note": "Develops and supports the center."
    },
    {
     "san": "g6",
     "note": "Prepares the fianchetto."
    },
    {
     "san": "Be3",
     "note": "The bishop develops to its long diagonal."
    },
    {
     "san": "Bg7",
     "note": "Black's fianchetto bishop eyes the long diagonal."
    },
    {
     "san": "Qd2",
     "note": "The queen prepares the h6 attack and castling long."
    },
    {
     "san": "c6",
     "note": "Black prepares ...b5 and gives the king a flight square."
    },
    {
     "san": "f3",
     "note": "Supports e4 and prepares the later g4-h4 advance."
    },
    {
     "san": "b5",
     "note": "Black starts a counterattack on the opposite wing; both sides are racing toward the enemy king."
    },
    {
     "san": "Nge2",
     "note": "The knight develops and prepares to castle."
    },
    {
     "san": "Nbd7",
     "note": "Black completes development and prepares ...c5 or ...e5."
    },
    {
     "san": "Bh6",
     "note": "White exchanges the dangerous bishop and removes a defender near the king."
    },
    {
     "san": "Bxh6",
     "note": "Black recaptures in the selected line."
    },
    {
     "san": "Qxh6",
     "note": "The queen occupies an aggressive square near the black king."
    },
    {
     "san": "Bb7",
     "note": "The bishop develops and watches e4 from the long diagonal."
    },
    {
     "san": "a3",
     "note": "Prevents ...b4 and gives White's king more breathing room."
    },
    {
     "san": "e5",
     "note": "Black strikes in the center and opens the position."
    },
    {
     "san": "O-O-O",
     "note": "White castles long and places the king on the opposite wing."
    },
    {
     "san": "Qe7",
     "note": "The queen connects the pieces and prepares to castle long."
    },
    {
     "san": "Kb1",
     "note": "The king steps to b1 for extra safety."
    },
    {
     "san": "a6",
     "note": "Black reinforces the king's shelter."
    },
    {
     "san": "Nc1",
     "note": "The knight heads toward b3 and central squares."
    },
    {
     "san": "O-O-O",
     "note": "Black castles long; both kings are now on opposite wings and the attack becomes a race."
    },
    {
     "san": "Nb3",
     "note": "The knight reaches a useful square and eyes d4 and c5."
    },
    {
     "san": "exd4",
     "note": "Black exchanges in the center."
    },
    {
     "san": "Rxd4",
     "note": "White recaptures with the rook and contests the d-file."
    },
    {
     "san": "c5",
     "note": "Black drives the rook away."
    },
    {
     "san": "Rd1",
     "note": "The rook retreats temporarily to build pressure."
    },
    {
     "san": "Nb6",
     "note": "The knight advances toward d5 and c4."
    },
    {
     "san": "g3",
     "note": "White prepares the bishop and h3."
    },
    {
     "san": "Kb8",
     "note": "The king moves to b8, the selected safety square."
    },
    {
     "san": "Na5",
     "note": "The knight attacks c6 and b7 from a5."
    },
    {
     "san": "Ba8",
     "note": "The bishop retreats to the corner while keeping its diagonal."
    },
    {
     "san": "Bh3",
     "note": "The bishop enters the attack and targets d7 and e6."
    },
    {
     "san": "d5",
     "note": "Black pushes in the center, starting the tactical battle."
    },
    {
     "san": "Qf4+",
     "note": "The queen checks while moving to an active attacking square."
    },
    {
     "san": "Ka7",
     "note": "The king moves toward the queenside and into danger."
    },
    {
     "san": "Rhe1",
     "note": "The final rook joins the attack; every white piece now faces the king."
    },
    {
     "san": "d4",
     "note": "Black advances the central pawn and tries to blunt the knight."
    },
    {
     "san": "Nd5",
     "note": "The knight centralizes and increases the pressure."
    },
    {
     "san": "Nbxd5",
     "note": "Black captures the knight in the selected line."
    },
    {
     "san": "exd5",
     "note": "White recaptures, opening the e- and d-files toward the king."
    },
    {
     "san": "Qd6",
     "note": "The queen tries to organize a defense."
    },
    {
     "san": "Rxd4",
     "note": "White sacrifices a rook. This is the decision that starts the cross-board king hunt."
    },
    {
     "san": "cxd4",
     "note": "Black accepts the rook in the selected line."
    },
    {
     "san": "Re7+",
     "note": "The other rook checks and drags the king away from its shelter."
    },
    {
     "san": "Kb6",
     "note": "The king is forced forward in the selected variation."
    },
    {
     "san": "Qxd4+",
     "note": "The queen checks again; the king cannot find a safe square."
    },
    {
     "san": "Kxa5",
     "note": "The king is driven all the way to a5 near White's camp."
    },
    {
     "san": "b4+",
     "note": "A pawn check restricts the remaining escape squares."
    },
    {
     "san": "Ka4",
     "note": "The king reaches a4 on the edge of the board."
    },
    {
     "san": "Qc3",
     "note": "The queen quietly tightens the net."
    },
    {
     "san": "Qxd5",
     "note": "Black counterattacks while trying to survive."
    },
    {
     "san": "Ra7",
     "note": "The rook runs to the seventh rank and attacks the king on the a-file."
    },
    {
     "san": "Bb7",
     "note": "The bishop blocks the attack."
    },
    {
     "san": "Rxb7",
     "note": "White captures and continues the chase."
    },
    {
     "san": "Qc4",
     "note": "Black looks for counterplay."
    },
    {
     "san": "Qxf6",
     "note": "White recovers material without releasing the attack."
    },
    {
     "san": "Kxa3",
     "note": "The king runs deeper into White's position."
    },
    {
     "san": "Qxa6+",
     "note": "The queen checks and keeps the king moving."
    },
    {
     "san": "Kxb4",
     "note": "The king moves still farther into White's camp."
    },
    {
     "san": "c3+",
     "note": "The pawn checks and removes another escape square."
    },
    {
     "san": "Kxc3",
     "note": "The king captures in the selected line."
    },
    {
     "san": "Qa1+",
     "note": "The queen checks again and closes the net."
    },
    {
     "san": "Kd2",
     "note": "The king moves into the heart of White's position."
    },
    {
     "san": "Qb2+",
     "note": "Another queen check drives the king toward the first rank."
    },
    {
     "san": "Kd1",
     "note": "The king reaches d1."
    },
    {
     "san": "Bf1",
     "note": "The bishop quietly seals an escape square."
    },
    {
     "san": "Rd2",
     "note": "Black makes a desperate counterattack."
    },
    {
     "san": "Rd7",
     "note": "White keeps defense and attack coordinated."
    },
    {
     "san": "Rxd7",
     "note": "Black exchanges rooks."
    },
    {
     "san": "Bxc4",
     "note": "White recaptures the queen and secures a winning advantage."
    },
    {
     "san": "bxc4",
     "note": "Black recaptures."
    },
    {
     "san": "Qxh8",
     "note": "White collects the distant rook as well."
    },
    {
     "san": "Rd3",
     "note": "Black makes a final attempt."
    },
    {
     "san": "Qa8",
     "note": "The queen retreats to stop the c-pawn."
    },
    {
     "san": "c3",
     "note": "Black pushes the passed pawn and hopes for promotion."
    },
    {
     "san": "Qa4+",
     "note": "The queen checks while preparing to take the pawn."
    },
    {
     "san": "Ke1",
     "note": "The king moves."
    },
    {
     "san": "f4",
     "note": "White advances a pawn calmly while the king hunt is already decided."
    },
    {
     "san": "f5",
     "note": "Black replies."
    },
    {
     "san": "Kc1",
     "note": "The king moves to safety and prepares the finish."
    },
    {
     "san": "Rd2",
     "note": "Black keeps trying to hold on."
    },
    {
     "san": "Qa7",
     "note": "The queen balances defense and attack. Black has no useful move left and resigns after a king hunt from one side of the board to the other."
    }
   ]
  }
 },
 {
  "id": "paulsen_morphy",
  "title": "モーフィーのクイーン犠牲",
  "white": "ルイス・パウルゼン",
  "black": "ポール・モーフィー",
  "year": 1857,
  "event": "ニューヨーク(第1回アメリカ選手権)",
  "result": "0-1",
  "opening": "フォー・ナイツ・ゲーム",
  "intro": "『チェスの魔術師』モーフィーの名を不朽にしたクイーン犠牲。守りに参加していない相手の駒を尻目に、クイーンをズバッと切って猛攻を繰り出します。",
  "takeaway": "攻めは駒の『数』より『働きと速さ』。決め手が見えたらクイーンさえ捨て、相手が守りを整える前に一気に寄せる。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "e5",
    "note": "対称に応じる。"
   },
   {
    "san": "Nf3",
    "note": "e5に当てて展開。"
   },
   {
    "san": "Nc6",
    "note": "守りつつ展開。"
   },
   {
    "san": "Nc3",
    "note": "もう一枚のナイトも出す。"
   },
   {
    "san": "Nf6",
    "note": "フォー・ナイツ。四枚のナイトが出そろう対称形。"
   },
   {
    "san": "Bb5",
    "note": "ナイトを間接的に狙う。"
   },
   {
    "san": "Bc5",
    "note": "対称に展開。"
   },
   {
    "san": "O-O",
    "note": "まずキングを安全に。"
   },
   {
    "san": "O-O",
    "note": "黒も囲う。"
   },
   {
    "san": "Nxe5",
    "note": "中央のポーンを取ってみる。"
   },
   {
    "san": "Re8",
    "note": "すぐ取り返さず、e筋にルークを乗せて反撃を用意する好判断。"
   },
   {
    "san": "Nxc6",
    "note": "ナイトを清算する。"
   },
   {
    "san": "dxc6",
    "note": "取り返し、ビショップの道と半開きのd筋を得る。"
   },
   {
    "san": "Bc4",
    "note": "ビショップを引く。"
   },
   {
    "san": "b5",
    "note": "ビショップを追ってテンポを稼ぐ。"
   },
   {
    "san": "Be2",
    "note": "下がる。"
   },
   {
    "san": "Nxe4",
    "note": "ポーンを取り返しつつ中央のナイトを消す。"
   },
   {
    "san": "Nxe4",
    "note": "取り返す。"
   },
   {
    "san": "Rxe4",
    "note": "ルークで取り、e筋の主導権を握る。"
   },
   {
    "san": "Bf3",
    "note": "ルークに当てて追い返そうとする。"
   },
   {
    "san": "Re6",
    "note": "ルークを引きつつ、後のRg6/Rh6という攻め替えを含みに残す。"
   },
   {
    "san": "c3",
    "note": "中央を支える。"
   },
   {
    "san": "Qd3",
    "note": "クイーンを深く侵入させ、白陣をしばりつける強烈な一手。"
   },
   {
    "san": "b4",
    "note": "ビショップに当てて時間を稼ぐ。"
   },
   {
    "san": "Bb6",
    "note": "にらみを保って退く。"
   },
   {
    "san": "a4",
    "note": "端で反撃を試みる。"
   },
   {
    "san": "bxa4",
    "note": "取っておく。"
   },
   {
    "san": "Qxa4",
    "note": "取り返す。"
   },
   {
    "san": "Bd7",
    "note": "ビショップを活用し、次にRae8で総攻撃の構え。"
   },
   {
    "san": "Ra2",
    "note": "二段目を守るが、駒が次々と受けに回される。"
   },
   {
    "san": "Rae8",
    "note": "もう一枚のルークも参戦。全駒が白のキングを向く。"
   },
   {
    "san": "Qa6",
    "note": "遠くで駒を稼ごうとするが、キングから離れすぎた。"
   },
   {
    "san": "Qxf3",
    "note": "クイーンを切る衝撃の一撃!取ればg筋が開いて白のキングが裸になる。"
   },
   {
    "san": "gxf3",
    "note": "取るしかない。"
   },
   {
    "san": "Rg6+",
    "note": "開いたg筋にルークを回してチェック。攻めの本隊が突入する。"
   },
   {
    "san": "Kh1",
    "note": "隅へ逃げる。"
   },
   {
    "san": "Bh3",
    "note": "ビショップも参加し、f1・g2の詰め筋を作る。"
   },
   {
    "san": "Rd1",
    "note": "懸命に受ける。"
   },
   {
    "san": "Bg2+",
    "note": "ビショップが飛び込んでチェック。"
   },
   {
    "san": "Kg1",
    "note": "戻るしかない。"
   },
   {
    "san": "Bxf3+",
    "note": "ビショップを引きながらディスカバードチェック。ポーンも回収する。"
   },
   {
    "san": "Kf1",
    "note": "逃げる。"
   },
   {
    "san": "Bg2+",
    "note": "再びチェック。ビショップのシーソーで白のキングをなぶる。"
   },
   {
    "san": "Kg1",
    "note": "戻る。"
   },
   {
    "san": "Bh3+",
    "note": "またチェック。逃げ道を一つずつ消していく。"
   },
   {
    "san": "Kh1",
    "note": "隅へ。"
   },
   {
    "san": "Bxf2",
    "note": "駒を稼ぎつつ、詰めの網を締める。"
   },
   {
    "san": "Qf1",
    "note": "最後の受け。"
   },
   {
    "san": "Bxf1",
    "note": "取る。"
   },
   {
    "san": "Rxf1",
    "note": "取り返す。"
   },
   {
    "san": "Re2",
    "note": "二段目にルークを侵入させ、寄せを決めにいく。"
   },
   {
    "san": "Ra1",
    "note": "受けにもがく。"
   },
   {
    "san": "Rh6",
    "note": "もう一枚のルークも呼び込み、h筋から止めを刺す態勢。"
   },
   {
    "san": "d4",
    "note": "苦し紛れの一手。"
   },
   {
    "san": "Be3",
    "note": "ビショップが致命的な地点に入り、受けが尽きた白は投了。駒を捨てて速度で圧倒した、モーフィーらしい名局。"
   }
  ],
  "en": {
   "title": "Morphy's Queen Sacrifice",
   "white": "Louis Paulsen",
   "black": "Paul Morphy",
   "opening": "Four Knights Game",
   "intro": "This queen sacrifice helped make Morphy famous as a master of attack. He ignores pieces that are not helping the defense, gives up the queen, and finishes with a fast coordinated assault.",
   "takeaway": "Attacking strength comes from activity and speed, not only material count. When the winning continuation is clear, even the queen can be sacrificed before the defender coordinates.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "e5",
     "note": "Black replies symmetrically."
    },
    {
     "san": "Nf3",
     "note": "Develops while attacking e5."
    },
    {
     "san": "Nc6",
     "note": "Defends the pawn while developing."
    },
    {
     "san": "Nc3",
     "note": "The second knight joins the game."
    },
    {
     "san": "Nf6",
     "note": "The Four Knights formation is complete and symmetrical."
    },
    {
     "san": "Bb5",
     "note": "The bishop indirectly pressures the knight."
    },
    {
     "san": "Bc5",
     "note": "Black develops symmetrically."
    },
    {
     "san": "O-O",
     "note": "White castles first and secures the king."
    },
    {
     "san": "O-O",
     "note": "Black castles too."
    },
    {
     "san": "Nxe5",
     "note": "White takes the central pawn."
    },
    {
     "san": "Re8",
     "note": "Black declines an immediate recapture and places a rook on the e-file for counterplay."
    },
    {
     "san": "Nxc6",
     "note": "White exchanges one knight."
    },
    {
     "san": "dxc6",
     "note": "Black recaptures and opens the d-file and bishop's diagonal."
    },
    {
     "san": "Bc4",
     "note": "The bishop retreats to a safer diagonal."
    },
    {
     "san": "b5",
     "note": "Black gains time by attacking the bishop."
    },
    {
     "san": "Be2",
     "note": "The bishop retreats."
    },
    {
     "san": "Nxe4",
     "note": "Black recaptures the central pawn and removes the other knight."
    },
    {
     "san": "Nxe4",
     "note": "White recaptures."
    },
    {
     "san": "Rxe4",
     "note": "The rook takes control of the e-file."
    },
    {
     "san": "Bf3",
     "note": "The bishop attacks the rook and tries to gain a tempo."
    },
    {
     "san": "Re6",
     "note": "The rook moves while keeping the later ...Rg6/...Rh6 attack in reserve."
    },
    {
     "san": "c3",
     "note": "Supports the center."
    },
    {
     "san": "Qd3",
     "note": "The queen penetrates deeply and ties down the white position."
    },
    {
     "san": "b4",
     "note": "The pawn attacks the bishop to gain time."
    },
    {
     "san": "Bb6",
     "note": "The bishop retreats while keeping its line."
    },
    {
     "san": "a4",
     "note": "White seeks counterplay on the wing."
    },
    {
     "san": "bxa4",
     "note": "Black captures the pawn."
    },
    {
     "san": "Qxa4",
     "note": "White recaptures."
    },
    {
     "san": "Bd7",
     "note": "The bishop develops and prepares to bring the other rook to the e-file."
    },
    {
     "san": "Ra2",
     "note": "The rook defends the second rank, but White's pieces are being pushed into passive roles."
    },
    {
     "san": "Rae8",
     "note": "The second rook joins the attack; all of Black's pieces point toward the king."
    },
    {
     "san": "Qa6",
     "note": "The queen tries to collect material, but it is far from the king."
    },
    {
     "san": "Qxf3",
     "note": "The queen sacrifice opens the g-file. If White accepts, the king shelter is torn open."
    },
    {
     "san": "gxf3",
     "note": "White accepts in the selected line."
    },
    {
     "san": "Rg6+",
     "note": "The rook enters the open g-file with check; the main attack begins."
    },
    {
     "san": "Kh1",
     "note": "The king moves to the corner."
    },
    {
     "san": "Bh3",
     "note": "The bishop joins and prepares mating ideas on f1 and g2."
    },
    {
     "san": "Rd1",
     "note": "White tries to defend."
    },
    {
     "san": "Bg2+",
     "note": "The bishop checks from g2."
    },
    {
     "san": "Kg1",
     "note": "The king returns in the selected line."
    },
    {
     "san": "Bxf3+",
     "note": "The bishop retreats with discovered check and also recovers a pawn."
    },
    {
     "san": "Kf1",
     "note": "The king moves."
    },
    {
     "san": "Bg2+",
     "note": "The bishop returns with another check."
    },
    {
     "san": "Kg1",
     "note": "The king returns."
    },
    {
     "san": "Bh3+",
     "note": "The bishop checks again and removes another escape square."
    },
    {
     "san": "Kh1",
     "note": "The king moves to the corner."
    },
    {
     "san": "Bxf2",
     "note": "The bishop captures while tightening the mating net."
    },
    {
     "san": "Qf1",
     "note": "White makes a final defensive move."
    },
    {
     "san": "Bxf1",
     "note": "Black captures the defender."
    },
    {
     "san": "Rxf1",
     "note": "White recaptures."
    },
    {
     "san": "Re2",
     "note": "The rook invades the second rank and prepares to finish."
    },
    {
     "san": "Ra1",
     "note": "White struggles to defend."
    },
    {
     "san": "Rh6",
     "note": "The other rook joins from the h-file."
    },
    {
     "san": "d4",
     "note": "White makes a desperate pawn move."
    },
    {
     "san": "Be3",
     "note": "The bishop reaches the decisive square; White has no defense and resigns."
    }
   ]
  }
 },
 {
  "id": "steinitz_bardeleben",
  "title": "逃げるキングを追いつめて",
  "white": "ヴィルヘルム・スタイニッツ",
  "black": "クルト・フォン・バルデレーベン",
  "year": 1895,
  "event": "ヘイスティングス",
  "result": "1-0",
  "opening": "イタリアン・ゲーム",
  "intro": "初代世界王者スタイニッツの代表作。取ることのできない絶妙の連続チェックで相手のキングを盤の端まで追い込む、『触れられないルーク』の名局です。",
  "takeaway": "連続チェックでは、相手が取れない位置に駒を置き続けるのがコツ。キングに逃げ道を与えつつ、実は詰みの網を一枚ずつ張っていく。",
  "moves": [
   {
    "san": "e4",
    "note": "中央を取る。"
   },
   {
    "san": "e5",
    "note": "対称に応じる。"
   },
   {
    "san": "Nf3",
    "note": "e5に当てて展開。"
   },
   {
    "san": "Nc6",
    "note": "守る。"
   },
   {
    "san": "Bc4",
    "note": "イタリアン。f7をにらむ。"
   },
   {
    "san": "Bc5",
    "note": "対称に応じる。"
   },
   {
    "san": "c3",
    "note": "d4で中央を広げる準備。"
   },
   {
    "san": "Nf6",
    "note": "e4をうかがう。"
   },
   {
    "san": "d4",
    "note": "中央を開く。"
   },
   {
    "san": "exd4",
    "note": "取る。"
   },
   {
    "san": "cxd4",
    "note": "取り返し、大きな中央を得る。"
   },
   {
    "san": "Bb4+",
    "note": "チェックで駒を出す。"
   },
   {
    "san": "Nc3",
    "note": "合い駒しつつ展開。"
   },
   {
    "san": "d5",
    "note": "中央で反撃する。"
   },
   {
    "san": "exd5",
    "note": "取る。"
   },
   {
    "san": "Nxd5",
    "note": "取り返す。"
   },
   {
    "san": "O-O",
    "note": "キングを安全にする。"
   },
   {
    "san": "Be6",
    "note": "駒を連結し、d5のナイトを支える。"
   },
   {
    "san": "Bg5",
    "note": "ピンをかけて圧力を強める。"
   },
   {
    "san": "Be7",
    "note": "ピンを外す。"
   },
   {
    "san": "Bxd5",
    "note": "交換して局面を明確にする。"
   },
   {
    "san": "Bxd5",
    "note": "取り返す。"
   },
   {
    "san": "Nxd5",
    "note": "取る。"
   },
   {
    "san": "Qxd5",
    "note": "クイーンで取り返す。"
   },
   {
    "san": "Bxe7",
    "note": "ビショップを清算し、キングを動かさせる。"
   },
   {
    "san": "Nxe7",
    "note": "取り返すが、キングの守りが薄くなる。"
   },
   {
    "san": "Re1",
    "note": "開いたe筋にルークを乗せ、e7とe筋をにらむ。"
   },
   {
    "san": "f6",
    "note": "キングに空気穴を作るが、陣形に傷が残る。"
   },
   {
    "san": "Qe2",
    "note": "クイーンもe筋に重ね、圧力を高める。"
   },
   {
    "san": "Qd7",
    "note": "受けを整える。"
   },
   {
    "san": "Rac1",
    "note": "もう一枚のルークも好位置へ。全駒が黒のキングを向く。"
   },
   {
    "san": "c6",
    "note": "d5の進出を防ぐ。"
   },
   {
    "san": "d5",
    "note": "かまわず中央を突いてこじ開ける。"
   },
   {
    "san": "cxd5",
    "note": "取る。"
   },
   {
    "san": "Nd4",
    "note": "ナイトを中央へ跳ね、e6の急所をにらむ。"
   },
   {
    "san": "Kf7",
    "note": "キングが自ら前に出て危険地帯へ。"
   },
   {
    "san": "Ne6",
    "note": "ナイトが急所に居座り、黒陣を締めつける。"
   },
   {
    "san": "Rhc8",
    "note": "ルークを回して反撃を試みる。"
   },
   {
    "san": "Qg4",
    "note": "クイーンを攻めに転換し、g7・d7をにらむ。"
   },
   {
    "san": "g6",
    "note": "受ける。"
   },
   {
    "san": "Ng5+",
    "note": "ナイトのチェックでキングを追い立てる。"
   },
   {
    "san": "Ke8",
    "note": "キングは戻る。"
   },
   {
    "san": "Rxe7+",
    "note": "ルークを切ってチェック!取れば別の詰みが待つ、触れられないルーク。"
   },
   {
    "san": "Kf8",
    "note": "取れずに逃げる。"
   },
   {
    "san": "Rf7+",
    "note": "ルークはそのままチェックを続ける。まだ取れない。"
   },
   {
    "san": "Kg8",
    "note": "逃げる。"
   },
   {
    "san": "Rg7+",
    "note": "さらに横へずれてチェック。ルークは不死身。"
   },
   {
    "san": "Kh8",
    "note": "隅へ追い込まれる。"
   },
   {
    "san": "Rxh7+",
    "note": "ポーンを取りながらなおチェック。バルデレーベンは席を立って戻らず、スタイニッツは十手以内の詰みを読み上げた。連続チェックでキングを狩り切った不滅の名局。"
   }
  ],
  "en": {
   "title": "Chasing the King",
   "white": "Wilhelm Steinitz",
   "black": "Curt von Bardeleben",
   "opening": "Italian Game",
   "intro": "A classic game by the first official world champion. A series of rook checks that cannot safely be captured drives the king to the edge, creating a famous lesson in a forcing king hunt.",
   "takeaway": "In a checking sequence, keep placing the attacking piece where the king cannot take it. Give the king legal squares, but use each move to build the next part of the net.",
   "moves": [
    {
     "san": "e4",
     "note": "Takes central space."
    },
    {
     "san": "e5",
     "note": "Black replies symmetrically."
    },
    {
     "san": "Nf3",
     "note": "Develops while attacking e5."
    },
    {
     "san": "Nc6",
     "note": "Defends the pawn."
    },
    {
     "san": "Bc4",
     "note": "The Italian bishop eyes f7."
    },
    {
     "san": "Bc5",
     "note": "Black replies symmetrically."
    },
    {
     "san": "c3",
     "note": "Prepares d4 and a larger center."
    },
    {
     "san": "Nf6",
     "note": "Black attacks e4."
    },
    {
     "san": "d4",
     "note": "White opens the center."
    },
    {
     "san": "exd4",
     "note": "Black captures."
    },
    {
     "san": "cxd4",
     "note": "White recaptures and gains a broad center."
    },
    {
     "san": "Bb4+",
     "note": "The bishop checks while developing."
    },
    {
     "san": "Nc3",
     "note": "White interposes and develops."
    },
    {
     "san": "d5",
     "note": "Black strikes in the center."
    },
    {
     "san": "exd5",
     "note": "White captures."
    },
    {
     "san": "Nxd5",
     "note": "Black recaptures."
    },
    {
     "san": "O-O",
     "note": "White castles and secures the king."
    },
    {
     "san": "Be6",
     "note": "Black connects the pieces and supports d5."
    },
    {
     "san": "Bg5",
     "note": "The bishop pins and increases pressure."
    },
    {
     "san": "Be7",
     "note": "Black breaks the pin."
    },
    {
     "san": "Bxd5",
     "note": "White exchanges to clarify the position."
    },
    {
     "san": "Bxd5",
     "note": "Black recaptures."
    },
    {
     "san": "Nxd5",
     "note": "White recaptures."
    },
    {
     "san": "Qxd5",
     "note": "The queen recaptures."
    },
    {
     "san": "Bxe7",
     "note": "The bishop exchanges and makes the king move."
    },
    {
     "san": "Nxe7",
     "note": "Black recaptures, but the king shelter is thinner."
    },
    {
     "san": "Re1",
     "note": "The rook occupies the open e-file and targets e7."
    },
    {
     "san": "f6",
     "note": "Black creates luft, but the pawn move leaves a lasting weakness."
    },
    {
     "san": "Qe2",
     "note": "The queen joins the e-file pressure."
    },
    {
     "san": "Qd7",
     "note": "Black organizes the defense."
    },
    {
     "san": "Rac1",
     "note": "The second rook reaches a strong square; the whole army points toward the king."
    },
    {
     "san": "c6",
     "note": "Black prevents the knight from reaching d5."
    },
    {
     "san": "d5",
     "note": "White pushes anyway and opens the center."
    },
    {
     "san": "cxd5",
     "note": "Black captures."
    },
    {
     "san": "Nd4",
     "note": "The knight centralizes and eyes the key e6-square."
    },
    {
     "san": "Kf7",
     "note": "The king steps forward into the dangerous part of the board."
    },
    {
     "san": "Ne6",
     "note": "The knight occupies a powerful outpost and restricts the black position."
    },
    {
     "san": "Rhc8",
     "note": "Black brings a rook across to seek counterplay."
    },
    {
     "san": "Qg4",
     "note": "The queen turns toward the attack and eyes g7 and d7."
    },
    {
     "san": "g6",
     "note": "Black defends."
    },
    {
     "san": "Ng5+",
     "note": "The knight checks and starts the king chase."
    },
    {
     "san": "Ke8",
     "note": "The king moves back in the selected line."
    },
    {
     "san": "Rxe7+",
     "note": "White sacrifices the rook with check. Taking it would allow a different mating continuation, so the rook cannot be touched safely."
    },
    {
     "san": "Kf8",
     "note": "Black declines the capture and moves the king."
    },
    {
     "san": "Rf7+",
     "note": "The rook checks again from f7 and remains untouchable."
    },
    {
     "san": "Kg8",
     "note": "The king moves."
    },
    {
     "san": "Rg7+",
     "note": "The rook shifts sideways with check and continues the forcing sequence."
    },
    {
     "san": "Kh8",
     "note": "The king is driven into the corner."
    },
    {
     "san": "Rxh7+",
     "note": "The rook captures the pawn with check. The historical game is remembered for this relentless sequence; the players' later actions are part of the story, not a forced chess move."
    }
   ]
  }
 },
 {
  "id": "fischer_spassky72",
  "title": "王座への一局",
  "white": "ボビー・フィッシャー",
  "black": "ボリス・スパスキー",
  "year": 1972,
  "event": "世界選手権 レイキャビク 第6局(7月23日)",
  "result": "1-0",
  "opening": "クイーンズ・ギャンビット(タルタコワー形)",
  "intro": "冷戦下の『世紀の対決』で指された、フィッシャー会心の一局。いつもの 1.e4 ではなく 1.c4 で始め、静かな駒組みから中央を一気に開いて押し切ります。敗れたスパスキー自身が観客とともに拍手を送ったと伝えられます。",
  "takeaway": "派手な犠牲がなくても勝てる。小さな優位(よい形・相手の弱いポーン・通ったライン)を積み上げ、機が熟したところで中央を開いて一気に攻める。",
  "moves": [
   {
    "san": "c4",
    "note": "いつもの e4 ではなく c4。相手の準備を外す心理戦でもあった。"
   },
   {
    "san": "e6",
    "note": "オーソドックスに応じる。"
   },
   {
    "san": "Nf3",
    "note": "柔軟に駒を出す。"
   },
   {
    "san": "d5",
    "note": "中央を主張。"
   },
   {
    "san": "d4",
    "note": "ここで d4 と合流し、クイーンズ・ギャンビットの形へ。"
   },
   {
    "san": "Nf6",
    "note": "自然な展開。"
   },
   {
    "san": "Nc3",
    "note": "駒を組み上げる。"
   },
   {
    "san": "Be7",
    "note": "キャスリングを準備。"
   },
   {
    "san": "Bg5",
    "note": "f6のナイトにピンをかけて圧力。"
   },
   {
    "san": "O-O",
    "note": "キングを安全に。"
   },
   {
    "san": "e3",
    "note": "堅実に中央を支え、ビショップの道を開ける。"
   },
   {
    "san": "h6",
    "note": "ビショップに態度を問う。"
   },
   {
    "san": "Bh4",
    "note": "ピンを保ったまま退く。"
   },
   {
    "san": "b6",
    "note": "タルタコワー・システム。ビショップを長い斜めへ出す準備。"
   },
   {
    "san": "cxd5",
    "note": "中央を清算して形を決める。"
   },
   {
    "san": "Nxd5",
    "note": "ナイトで取り返し、ピンの解消を図る。"
   },
   {
    "san": "Bxe7",
    "note": "交換を進める。"
   },
   {
    "san": "Qxe7",
    "note": "クイーンで取り返す。"
   },
   {
    "san": "Nxd5",
    "note": "さらに清算。"
   },
   {
    "san": "exd5",
    "note": "ポーンで取り返すが、この d5 が後々の弱点になる。"
   },
   {
    "san": "Rc1",
    "note": "開いたc筋にルークを据える。狙いは黒のc7・c5。"
   },
   {
    "san": "Be6",
    "note": "ビショップを出して d5 を支える。"
   },
   {
    "san": "Qa4",
    "note": "クイーンを働かせ、a6やc6の弱点をうかがう。"
   },
   {
    "san": "c5",
    "note": "黒は中央を広げて反撃を試みる。"
   },
   {
    "san": "Qa3",
    "note": "クイーンを転換し、c5 に狙いを定める。"
   },
   {
    "san": "Rc8",
    "note": "ルークをc筋へ。"
   },
   {
    "san": "Bb5",
    "note": "ビショップを繰り出して締めつける。"
   },
   {
    "san": "a6",
    "note": "ビショップに当てる。"
   },
   {
    "san": "dxc5",
    "note": "中央を清算。"
   },
   {
    "san": "bxc5",
    "note": "取り返すが、黒のポーンがバラバラになった。"
   },
   {
    "san": "O-O",
    "note": "白もキングを安全にし、全駒を戦線へ。"
   },
   {
    "san": "Ra7",
    "note": "黒は窮屈な受けを強いられる。"
   },
   {
    "san": "Be2",
    "note": "ビショップを引き、次の狙いを準備する落ち着いた好手。"
   },
   {
    "san": "Nd7",
    "note": "駒を組み直す。"
   },
   {
    "san": "Nd4",
    "note": "ナイトを中央の急所へ。e6のビショップを狙う。"
   },
   {
    "san": "Qf8",
    "note": "受けに回る。"
   },
   {
    "san": "Nxe6",
    "note": "交換して黒の守りをさらに削る。"
   },
   {
    "san": "fxe6",
    "note": "取り返すが、e6・d5と弱いポーンが並んでしまった。"
   },
   {
    "san": "e4",
    "note": "この一局の決め手!中央を開き、黒の弱いポーンとキングに一気に照準を合わせる。"
   },
   {
    "san": "d4",
    "note": "黒は中央を押さえて耐えようとする。"
   },
   {
    "san": "f4",
    "note": "もう一方のポーンも進め、黒陣を圧迫する。"
   },
   {
    "san": "Qe7",
    "note": "受けを整える。"
   },
   {
    "san": "e5",
    "note": "中央を封じ、黒の駒を窮屈にする。"
   },
   {
    "san": "Rb8",
    "note": "反撃の糸口を探す。"
   },
   {
    "san": "Bc4",
    "note": "ビショップを最強の斜めへ。e6 の弱点を直撃する。"
   },
   {
    "san": "Kh8",
    "note": "キングを避難させる。"
   },
   {
    "san": "Qh3",
    "note": "クイーンも攻めに合流し、e6 と h6 をにらむ。"
   },
   {
    "san": "Nf8",
    "note": "懸命に受ける。"
   },
   {
    "san": "b3",
    "note": "急がず自陣の傷をなくす。フィッシャーらしい丁寧さ。"
   },
   {
    "san": "a5",
    "note": "黒は反撃を試みるが手が細い。"
   },
   {
    "san": "f5",
    "note": "ついに突破口を開く猛攻の一手。"
   },
   {
    "san": "exf5",
    "note": "取るしかない。"
   },
   {
    "san": "Rxf5",
    "note": "ルークで取り返し、f筋が白の大通りになる。"
   },
   {
    "san": "Nh7",
    "note": "黒は受けに追われるばかり。"
   },
   {
    "san": "Rcf1",
    "note": "もう一枚のルークも合流。全駒が黒のキングを向いた。"
   },
   {
    "san": "Qd8",
    "note": "受けを模索する。"
   },
   {
    "san": "Qg3",
    "note": "クイーンを好位置へ転換する。"
   },
   {
    "san": "Re7",
    "note": "黒は必死に守りを繋ぐ。"
   },
   {
    "san": "h4",
    "note": "端のポーンも押し上げ、包囲を完成させにいく。"
   },
   {
    "san": "Rbb7",
    "note": "黒はひたすら受けるのみ。"
   },
   {
    "san": "e6",
    "note": "ポーンを突き刺し、黒陣を真っ二つにする。"
   },
   {
    "san": "Rbc7",
    "note": "受けるが…"
   },
   {
    "san": "Qe5",
    "note": "クイーンが中央の絶好点へ。すべての攻め筋が交差する。"
   },
   {
    "san": "Qe8",
    "note": "黒はもう有効な手がない。"
   },
   {
    "san": "a4",
    "note": "端も固め、黒の反撃の芽を完全に摘む。"
   },
   {
    "san": "Qd8",
    "note": "手詰まりで動くしかない。"
   },
   {
    "san": "R1f2",
    "note": "ルークを整えて、ゆっくりと網を締める。"
   },
   {
    "san": "Qe8",
    "note": "黒は待つしかない。"
   },
   {
    "san": "R2f3",
    "note": "さらに態勢を整える。相手に手を渡し続ける指し回し。"
   },
   {
    "san": "Qd8",
    "note": "黒は同じ場所を往復するだけ。"
   },
   {
    "san": "Bd3",
    "note": "ビショップを h7 のナイトに向け、最後の狙いを作る。"
   },
   {
    "san": "Qe8",
    "note": "受けようがない。"
   },
   {
    "san": "Qe4",
    "note": "クイーンが h7 とf筋を同時ににらむ位置へ。決着が近い。"
   },
   {
    "san": "Nf6",
    "note": "ナイトで受けるしかないが…"
   },
   {
    "san": "Rxf6",
    "note": "ルークを切ってナイトを除去!黒のキングの守りが完全に剥がれる。"
   },
   {
    "san": "gxf6",
    "note": "取ればキングの前が裸になる。"
   },
   {
    "san": "Rxf6",
    "note": "もう一枚のルークが飛び込み、寄せは決まった。"
   },
   {
    "san": "Kg8",
    "note": "キングは逃げ惑う。"
   },
   {
    "san": "Bc4",
    "note": "ビショップも e6 の斜めからキングを狙い、逃げ道を消す。"
   },
   {
    "san": "Kh8",
    "note": "隅へ。"
   },
   {
    "san": "Qf4",
    "note": "とどめの一手。受けが尽きたスパスキーは投了し、観客とともに立ち上がって拍手を送ったと伝えられる。派手な犠牲ではなく、優位を積み重ねて押し切った完璧な一局。"
   }
  ],
  "en": {
   "title": "A Game for the Crown",
   "white": "Bobby Fischer",
   "black": "Boris Spassky",
   "opening": "Queen's Gambit (Tartakower variation)",
   "intro": "Played during the Cold War match for the world title, this was one of Fischer's finest games. He begins with 1.c4 rather than his usual 1.e4, builds quietly, then opens the center and converts the accumulated advantages.",
   "takeaway": "A game can be won without a spectacular sacrifice. Build small advantages—better piece placement, weak pawns, and open lines—then open the center when the position is ready.",
   "moves": [
    {
     "san": "c4",
     "note": "Fischer begins with c4 instead of his usual e4, also sidestepping some preparation."
    },
    {
     "san": "e6",
     "note": "Black responds in a classical way."
    },
    {
     "san": "Nf3",
     "note": "White develops flexibly."
    },
    {
     "san": "d5",
     "note": "Black claims the center."
    },
    {
     "san": "d4",
     "note": "White joins the d4 structure and reaches a Queen's Gambit position."
    },
    {
     "san": "Nf6",
     "note": "Natural development."
    },
    {
     "san": "Nc3",
     "note": "White develops another piece."
    },
    {
     "san": "Be7",
     "note": "Black prepares to castle."
    },
    {
     "san": "Bg5",
     "note": "The bishop pins the f6-knight and adds pressure."
    },
    {
     "san": "O-O",
     "note": "Black castles."
    },
    {
     "san": "e3",
     "note": "White supports the center and opens the bishop's diagonal."
    },
    {
     "san": "h6",
     "note": "Black asks the bishop to choose a square."
    },
    {
     "san": "Bh4",
     "note": "The bishop keeps the pin."
    },
    {
     "san": "b6",
     "note": "The Tartakower setup prepares to develop the bishop on the long diagonal."
    },
    {
     "san": "cxd5",
     "note": "White exchanges in the center."
    },
    {
     "san": "Nxd5",
     "note": "Black recaptures and works to remove the pin."
    },
    {
     "san": "Bxe7",
     "note": "White continues the exchange."
    },
    {
     "san": "Qxe7",
     "note": "The queen recaptures."
    },
    {
     "san": "Nxd5",
     "note": "White exchanges again."
    },
    {
     "san": "exd5",
     "note": "Black recaptures with the pawn, leaving d5 as a potential long-term weakness."
    },
    {
     "san": "Rc1",
     "note": "The rook occupies the open c-file and eyes c7 and c5."
    },
    {
     "san": "Be6",
     "note": "The bishop supports d5."
    },
    {
     "san": "Qa4",
     "note": "The queen becomes active and eyes a6 and c6."
    },
    {
     "san": "c5",
     "note": "Black expands in the center and seeks counterplay."
    },
    {
     "san": "Qa3",
     "note": "The queen changes direction and targets c5."
    },
    {
     "san": "Rc8",
     "note": "The rook joins the c-file."
    },
    {
     "san": "Bb5",
     "note": "The bishop adds pressure."
    },
    {
     "san": "a6",
     "note": "Black attacks the bishop."
    },
    {
     "san": "dxc5",
     "note": "White exchanges in the center."
    },
    {
     "san": "bxc5",
     "note": "Black recaptures, leaving the pawns less coordinated."
    },
    {
     "san": "O-O",
     "note": "White castles and brings the remaining pieces into the game."
    },
    {
     "san": "Ra7",
     "note": "Black is forced into a cramped defensive position."
    },
    {
     "san": "Be2",
     "note": "The bishop retreats calmly and prepares the next plan."
    },
    {
     "san": "Nd7",
     "note": "Black rearranges the pieces."
    },
    {
     "san": "Nd4",
     "note": "The knight centralizes and attacks the bishop on e6."
    },
    {
     "san": "Qf8",
     "note": "Black defends."
    },
    {
     "san": "Nxe6",
     "note": "White exchanges and removes another defender."
    },
    {
     "san": "fxe6",
     "note": "Black recaptures, but weak e6 and d5 pawns remain together."
    },
    {
     "san": "e4",
     "note": "White opens the center with the key move of the game, targeting the weak pawns and king at once."
    },
    {
     "san": "d4",
     "note": "Black pushes the center to hold."
    },
    {
     "san": "f4",
     "note": "White advances the other pawn and increases the pressure."
    },
    {
     "san": "Qe7",
     "note": "Black reorganizes the defense."
    },
    {
     "san": "e5",
     "note": "White closes the center and restricts Black's pieces."
    },
    {
     "san": "Rb8",
     "note": "Black searches for counterplay."
    },
    {
     "san": "Bc4",
     "note": "The bishop reaches its strongest diagonal and attacks e6."
    },
    {
     "san": "Kh8",
     "note": "Black moves the king away."
    },
    {
     "san": "Qh3",
     "note": "The queen joins the attack and eyes e6 and h6."
    },
    {
     "san": "Nf8",
     "note": "Black defends as well as possible."
    },
    {
     "san": "b3",
     "note": "White makes a quiet improving move and removes a potential weakness."
    },
    {
     "san": "a5",
     "note": "Black tries to counterattack but has little activity."
    },
    {
     "san": "f5",
     "note": "White pushes the f-pawn and opens the next attacking route."
    },
    {
     "san": "exf5",
     "note": "Black captures in the selected line."
    },
    {
     "san": "Rxf5",
     "note": "The rook recaptures and turns the f-file into an open highway."
    },
    {
     "san": "Nh7",
     "note": "Black's pieces are driven into passive defense."
    },
    {
     "san": "Rcf1",
     "note": "The other rook joins; every white piece now points toward the king."
    },
    {
     "san": "Qd8",
     "note": "Black looks for a defensive square."
    },
    {
     "san": "Qg3",
     "note": "The queen improves its position."
    },
    {
     "san": "Re7",
     "note": "Black keeps trying to hold the line."
    },
    {
     "san": "h4",
     "note": "The h-pawn joins the encirclement."
    },
    {
     "san": "Rbb7",
     "note": "Black can only defend."
    },
    {
     "san": "e6",
     "note": "White drives the pawn deeper into the position."
    },
    {
     "san": "Rbc7",
     "note": "Black moves the rook to block."
    },
    {
     "san": "Qe5",
     "note": "The queen reaches the central crossing point of the attack."
    },
    {
     "san": "Qe8",
     "note": "Black has no useful active move."
    },
    {
     "san": "a4",
     "note": "White secures the flank and removes counterplay."
    },
    {
     "san": "Qd8",
     "note": "Black shuffles the queen."
    },
    {
     "san": "R1f2",
     "note": "White calmly coordinates the rooks."
    },
    {
     "san": "Qe8",
     "note": "Black shuffles again."
    },
    {
     "san": "R2f3",
     "note": "The second rook improves; White keeps passing the move back."
    },
    {
     "san": "Qd8",
     "note": "Black returns the queen."
    },
    {
     "san": "Bd3",
     "note": "The bishop turns toward the h7-knight and creates the last tactical target."
    },
    {
     "san": "Qe8",
     "note": "Black tries to defend."
    },
    {
     "san": "Qe4",
     "note": "The queen attacks h7 and the f-file at once."
    },
    {
     "san": "Nf6",
     "note": "The knight is forced to defend."
    },
    {
     "san": "Rxf6",
     "note": "White sacrifices a rook to remove the final defender around the king."
    },
    {
     "san": "gxf6",
     "note": "Black recaptures, leaving the king exposed."
    },
    {
     "san": "Rxf6",
     "note": "The other rook enters and the attack is decisive."
    },
    {
     "san": "Kg8",
     "note": "The king moves."
    },
    {
     "san": "Bc4",
     "note": "The bishop helps control the king's escape squares."
    },
    {
     "san": "Kh8",
     "note": "The king returns to the corner."
    },
    {
     "san": "Qf4",
     "note": "The queen delivers the final pressure. Spassky resigns in the selected line; the win was built from small advantages rather than a single flashy sacrifice."
    }
   ]
  }
 },
 {
  "id": "larsen_spassky",
  "title": "17手の逆転劇",
  "white": "ベント・ラルセン",
  "black": "ボリス・スパスキー",
  "year": 1970,
  "event": "ソ連 対 世界選抜(ベオグラード)",
  "result": "0-1",
  "opening": "ラルセン・オープニング(1.b3)",
  "intro": "わずか17手で終わった、ミニチュアの傑作。ルークをまるごと差し出し、たった一つのポーンを昇格させて勝つという、信じられない結末が待っています。",
  "takeaway": "駒の値打ちより『相手のキングに届くか』。ルークを捨ててでも、止められないポーンと連続チェックが残るなら、それが最速の勝ち筋になる。",
  "moves": [
   {
    "san": "b3",
    "note": "ラルセン・オープニング。横からじわりと中央をうかがう独特の入り方。"
   },
   {
    "san": "e5",
    "note": "黒は堂々と中央を取る。"
   },
   {
    "san": "Bb2",
    "note": "長い斜めにビショップを構え、e5をにらむ。"
   },
   {
    "san": "Nc6",
    "note": "ポーンを守りつつ展開。"
   },
   {
    "san": "c4",
    "note": "反対側からも中央に圧力をかける。"
   },
   {
    "san": "Nf6",
    "note": "自然に展開。"
   },
   {
    "san": "Nf3",
    "note": "e5に当てて手を作る。"
   },
   {
    "san": "e4",
    "note": "ポーンを突き出してナイトを追う積極策。中央のスペースを奪いにいく。"
   },
   {
    "san": "Nd4",
    "note": "ナイトを中央へ跳ねる。"
   },
   {
    "san": "Bc5",
    "note": "ナイトに当てて手得をねらう。"
   },
   {
    "san": "Nxc6",
    "note": "交換する。"
   },
   {
    "san": "dxc6",
    "note": "取り返し、d筋が黒の攻めの通り道になる。"
   },
   {
    "san": "e3",
    "note": "陣形を整える。"
   },
   {
    "san": "Bf5",
    "note": "ビショップも出して e4 のポーンを支える。黒の駒がすべて働き出す。"
   },
   {
    "san": "Qc2",
    "note": "e4を狙いつつクイーンを働かせる。"
   },
   {
    "san": "Qe7",
    "note": "駒を連結し、O-O-Oを準備。"
   },
   {
    "san": "Be2",
    "note": "展開してキャスリングを用意。"
   },
   {
    "san": "O-O-O",
    "note": "黒は反対側へキングを囲う。ここから一気に攻めが加速する。"
   },
   {
    "san": "f4",
    "note": "白は黒のポーンを攻めるが、これがキングの周りを緩めることに。"
   },
   {
    "san": "Ng4",
    "note": "ナイトが飛び出し、h2やe3の急所をにらむ。"
   },
   {
    "san": "g3",
    "note": "受けようとするが、キングのそばに穴が空く。"
   },
   {
    "san": "h5",
    "note": "端のポーンが突撃を開始。h筋をこじ開けにいく。"
   },
   {
    "san": "h3",
    "note": "ナイトを追い返そうとするが…"
   },
   {
    "san": "h4",
    "note": "かまわず突き進む!ポーンを取らせて h筋 を開くのが狙い。"
   },
   {
    "san": "hxg4",
    "note": "ナイトを取るが、これで黒の狙いが実現する。"
   },
   {
    "san": "hxg3",
    "note": "取り返して、g3のポーンが白のキングのすぐそばに居座った。"
   },
   {
    "san": "Rg1",
    "note": "ルークで g3 のポーンを止めにいく。これで大丈夫に見えたが——"
   },
   {
    "san": "Rh1",
    "note": "衝撃のルーク捨て!取らせて g2 への道を作る、常識外の一手。"
   },
   {
    "san": "Rxh1",
    "note": "取るしかない。"
   },
   {
    "san": "g2",
    "note": "ポーンがルークを飛び越えて突進。もう止められない。"
   },
   {
    "san": "Rf1",
    "note": "ルークを引いて昇格マスを守る。"
   },
   {
    "san": "Qh4+",
    "note": "クイーンがチェックで飛び込み、白のキングの逃げ道を奪う。"
   },
   {
    "san": "Kd1",
    "note": "逃げる。"
   },
   {
    "san": "gxf1=Q+",
    "note": "ポーンがルークを取りながらクイーンに昇格!駒損どころか大優勢になり、ラルセンは投了。たった17手の伝説的な逆転劇。"
   }
  ],
  "en": {
   "title": "The Seventeen-Move Turnaround",
   "white": "Bent Larsen",
   "black": "Boris Spassky",
   "opening": "Larsen Opening (1.b3)",
   "intro": "A miniature ending after only seventeen moves. White gives up a rook and relies on a single passed pawn, producing an astonishing promotion finish.",
   "takeaway": "Material value is not everything: if a passed pawn cannot be stopped and checks remain available, sacrificing a rook may be the fastest route to victory.",
   "moves": [
    {
     "san": "b3",
     "note": "The Larsen Opening develops pressure from the side with an unusual first move."
    },
    {
     "san": "e5",
     "note": "Black confidently takes the center."
    },
    {
     "san": "Bb2",
     "note": "The bishop occupies the long diagonal and eyes e5."
    },
    {
     "san": "Nc6",
     "note": "Develops while defending the pawn."
    },
    {
     "san": "c4",
     "note": "White adds pressure from the other side."
    },
    {
     "san": "Nf6",
     "note": "Natural development."
    },
    {
     "san": "Nf3",
     "note": "White attacks e5 and gains a tempo."
    },
    {
     "san": "e4",
     "note": "Black pushes the pawn to drive away the knight and gain central space."
    },
    {
     "san": "Nd4",
     "note": "The knight jumps to the center."
    },
    {
     "san": "Bc5",
     "note": "Black attacks the knight and gains time."
    },
    {
     "san": "Nxc6",
     "note": "White exchanges."
    },
    {
     "san": "dxc6",
     "note": "Black recaptures and opens the d-file for the attack."
    },
    {
     "san": "e3",
     "note": "White stabilizes the formation."
    },
    {
     "san": "Bf5",
     "note": "The bishop supports e4 and Black's pieces become active."
    },
    {
     "san": "Qc2",
     "note": "The queen attacks e4 while improving its position."
    },
    {
     "san": "Qe7",
     "note": "The queen connects the pieces and prepares to castle long."
    },
    {
     "san": "Be2",
     "note": "White develops and prepares to castle."
    },
    {
     "san": "O-O-O",
     "note": "Black castles long, starting the race toward the kingside attack."
    },
    {
     "san": "f4",
     "note": "White attacks the black pawns but loosens the area around the king."
    },
    {
     "san": "Ng4",
     "note": "The knight jumps out and eyes h2 and e3."
    },
    {
     "san": "g3",
     "note": "White tries to defend, but creates a hole near the king."
    },
    {
     "san": "h5",
     "note": "The h-pawn begins the assault and tries to open the h-file."
    },
    {
     "san": "h3",
     "note": "White tries to drive the knight away."
    },
    {
     "san": "h4",
     "note": "Black continues regardless; allowing the pawn to be captured is part of the plan to open the h-file."
    },
    {
     "san": "hxg4",
     "note": "White takes the knight, but Black's attacking idea succeeds."
    },
    {
     "san": "hxg3",
     "note": "Black recaptures and leaves a pawn on g3 next to the king."
    },
    {
     "san": "Rg1",
     "note": "The rook tries to stop the pawn, but the position only appears safe."
    },
    {
     "san": "Rh1",
     "note": "The rook sacrifice opens the route to g2 and is the key tactical idea."
    },
    {
     "san": "Rxh1",
     "note": "Black accepts the rook in the selected line."
    },
    {
     "san": "g2",
     "note": "The pawn advances past the rook and cannot be stopped by ordinary means."
    },
    {
     "san": "Rf1",
     "note": "The rook moves to control the promotion square."
    },
    {
     "san": "Qh4+",
     "note": "The queen checks and removes the king's escape squares."
    },
    {
     "san": "Kd1",
     "note": "The king moves in the selected variation."
    },
    {
     "san": "gxf1=Q+",
     "note": "The pawn captures the rook and promotes with check. The rook sacrifice has produced a winning queen and Black resigns."
    }
   ]
  }
 }
];

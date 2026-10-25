// Original optional expansion lessons, separately versioned from generated legacy catalog.
// Move sequences are illustrative, not claims of unique optimal play.
const EXTRA_LESSONS = [
  {
    "id": "op_london",
    "cat": "opening",
    "fen": null,
    "title": "ロンドン・システム",
    "intro": "d4、Nf3、Bf4を軸に、似た駒組みを目指す定跡です。相手の手に応じた調整が必要です。",
    "takeaway": "定型的な配置でも、相手の脅威や中央の変化を確認しよう。",
    "moves": [
      {
        "san": "d4",
        "note": "白はd4で中央にポーンを置きます。"
      },
      {
        "san": "d5",
        "note": "黒もd5で中央を争います。"
      },
      {
        "san": "Nf3",
        "note": "白ナイトをf3へ展開します。"
      },
      {
        "san": "Nf6",
        "note": "黒もナイトをf6へ出します。"
      },
      {
        "san": "Bf4",
        "note": "白ビショップをf4へ出すのがロンドン・システムの代表的な駒組みです。"
      }
    ],
    "practice": {
      "ply": 4,
      "prompt": "c1のビショップをf4へ展開しよう。",
      "hint": "d2のポーンが進んだので、c1からf4への斜めの道が開いています。"
    },
    "en": {
      "title": "London System",
      "intro": "The London System often features d4, Nf3 and Bf4. Adapt the setup to your opponent's moves.",
      "takeaway": "A familiar structure does not replace watching your opponent's threats.",
      "moves": [
        {
          "san": "d4",
          "note": "White occupies d4."
        },
        {
          "san": "d5",
          "note": "Black contests the center with ...d5."
        },
        {
          "san": "Nf3",
          "note": "Nf3 develops a knight."
        },
        {
          "san": "Nf6",
          "note": "Black develops ...Nf6."
        },
        {
          "san": "Bf4",
          "note": "Bf4 establishes a typical London System bishop setup."
        }
      ],
      "practice": {
        "prompt": "Develop the bishop from c1 to f4.",
        "hint": "The d-pawn has cleared the c1–f4 diagonal."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "op_slav",
    "cat": "opening",
    "fen": null,
    "title": "スラヴ・ディフェンス",
    "intro": "クイーンズ・ギャンビットに対し黒が...c6でd5を守る堅実な構えです。",
    "takeaway": "c6のポーンはd5の守りを助けるが、c8のビショップをどう働かせるかも考えよう。",
    "moves": [
      {
        "san": "d4",
        "note": "白はd4で中央へ進みます。"
      },
      {
        "san": "d5",
        "note": "黒もd5で対抗します。"
      },
      {
        "san": "c4",
        "note": "白はc4でd5のポーンに挑戦します。"
      },
      {
        "san": "c6",
        "note": "黒はc6でd5をポーンで支えます。"
      }
    ],
    "practice": {
      "ply": 3,
      "prompt": "黒のc7ポーンをc6へ進めよう。",
      "hint": "c6にポーンを置くと、d5の黒ポーンを守れます。"
    },
    "en": {
      "title": "Slav Defense",
      "intro": "In the Slav Defense, Black supports the d5 pawn with ...c6 against the Queen's Gambit.",
      "takeaway": "The pawn on c6 protects d5. Also plan where the c8 bishop will develop.",
      "moves": [
        {
          "san": "d4",
          "note": "White starts with d4."
        },
        {
          "san": "d5",
          "note": "Black occupies d5."
        },
        {
          "san": "c4",
          "note": "White challenges the d5 pawn with c4."
        },
        {
          "san": "c6",
          "note": "...c6 supports the pawn on d5."
        }
      ],
      "practice": {
        "prompt": "Move Black's pawn from c7 to c6.",
        "hint": "The pawn on c6 defends d5."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "op_nimzo",
    "cat": "opening",
    "fen": null,
    "title": "ニムゾ・インディアン・ディフェンス",
    "intro": "黒は...Bb4でナイトc3をキングに対してピンし、中央への圧力をかけます。",
    "takeaway": "ナイトが動くとe1のキングにビショップの斜めの利きが通る形です。",
    "moves": [
      {
        "san": "d4",
        "note": "白が中央を確保します。"
      },
      {
        "san": "Nf6",
        "note": "黒はナイトで中央への影響力を保ちます。"
      },
      {
        "san": "c4",
        "note": "白はc4で中央を争います。"
      },
      {
        "san": "e6",
        "note": "黒はe6で中央を支えます。"
      },
      {
        "san": "Nc3",
        "note": "白ナイトがc3へ展開します。"
      },
      {
        "san": "Bb4",
        "note": "黒ビショップがb4へ出て、ナイトc3に圧力をかけます。"
      }
    ],
    "practice": {
      "ply": 5,
      "prompt": "黒ビショップをf8からb4へ動かそう。",
      "hint": "e7のポーンがe6へ動いたため、f8からb4への斜めが空いています。"
    },
    "en": {
      "title": "Nimzo-Indian Defense",
      "intro": "Black plays ...Bb4 to pin the c3 knight to the king and pressure the center.",
      "takeaway": "If the c3 knight moves, the bishop's diagonal toward the king on e1 opens.",
      "moves": [
        {
          "san": "d4",
          "note": "White claims d4."
        },
        {
          "san": "Nf6",
          "note": "Black develops the knight to f6."
        },
        {
          "san": "c4",
          "note": "White challenges the center with c4."
        },
        {
          "san": "e6",
          "note": "...e6 supports the center."
        },
        {
          "san": "Nc3",
          "note": "White develops the c3 knight."
        },
        {
          "san": "Bb4",
          "note": "...Bb4 pins White's c3 knight to the king on e1; moving the knight would uncover the b4–e1 diagonal."
        }
      ],
      "practice": {
        "prompt": "Move Black's bishop from f8 to b4.",
        "hint": "...e6 cleared the f8–b4 diagonal."
      }
    },
    "puzzleTheme": "pin"
  },
  {
    "id": "op_dutch",
    "cat": "opening",
    "fen": null,
    "title": "ダッチ・ディフェンス",
    "intro": "黒の初手...f5が特徴。e4の支配を目指す一方、黒キング周辺が弱くなることもあります。",
    "takeaway": "序盤のポーンの前進は攻めと守りの両面から考えよう。",
    "moves": [
      {
        "san": "d4",
        "note": "白がd4で中央へ進みます。"
      },
      {
        "san": "f5",
        "note": "黒はfポーンをf5へ進め、e4のマスに働きかけます。"
      },
      {
        "san": "c4",
        "note": "白はc4で黒の中央構想に挑みます。"
      },
      {
        "san": "Nf6",
        "note": "黒ナイトをf6へ展開します。"
      },
      {
        "san": "Nc3",
        "note": "白ナイトをc3へ展開します。"
      },
      {
        "san": "e6",
        "note": "黒はe6で中央を支え、ビショップの進路を考えます。"
      }
    ],
    "practice": {
      "ply": 1,
      "prompt": "黒のf7ポーンをf5へ2マス進めよう。",
      "hint": "fポーンを動かしてe4のマスに利かせます。"
    },
    "en": {
      "title": "Dutch Defense",
      "intro": "Black opens with ...f5 to contest e4, at the cost of potentially weakening king safety.",
      "takeaway": "Pawn advances create both opportunities and weaknesses.",
      "moves": [
        {
          "san": "d4",
          "note": "White claims d4."
        },
        {
          "san": "f5",
          "note": "Black plays ...f5 to contest control of e4."
        },
        {
          "san": "c4",
          "note": "White plays c4, increasing central influence."
        },
        {
          "san": "Nf6",
          "note": "Black develops ...Nf6."
        },
        {
          "san": "Nc3",
          "note": "White develops Nc3."
        },
        {
          "san": "e6",
          "note": "Black supports its structure with ...e6."
        }
      ],
      "practice": {
        "prompt": "Advance Black's pawn from f7 to f5.",
        "hint": "The pawn on f5 controls e4."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "cb_knightfork2",
    "cat": "combo",
    "fen": "8/8/5k2/8/8/2N5/3q4/6K1 w - - 0 1",
    "title": "ナイトのチェックフォーク",
    "intro": "ナイトのL字の利きが、キングとクイーンの両方へ届く局面を観察します。",
    "takeaway": "チェックへの対応を強いられる間に、次の手でクイーンを取れる可能性があります。",
    "moves": [
      {
        "san": "Ne4+",
        "note": "ナイトをc3からe4へ動かすと、黒キングf6へのチェックとクイーンd2への攻撃が同時に生まれます。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "ナイトをc3からe4へ動かしてチェックをかけよう。",
      "hint": "e4からはf6とd2を同時に攻撃できます。"
    },
    "en": {
      "title": "Knight fork with check",
      "intro": "Find an L-shaped knight move that simultaneously attacks king and queen.",
      "takeaway": "The forced reply to check may allow a queen capture on the next move.",
      "moves": [
        {
          "san": "Ne4+",
          "note": "The knight jumps from c3 to e4, checking the king on f6 while attacking the queen on d2."
        }
      ],
      "practice": {
        "prompt": "Move the knight from c3 to e4 and give check.",
        "hint": "A knight on e4 attacks both f6 and d2."
      }
    },
    "puzzleTheme": "fork"
  },
  {
    "id": "cb_rookfile",
    "cat": "combo",
    "fen": "6k1/5pp1/8/8/8/8/8/R5K1 w - - 0 1",
    "title": "開いたファイルから遠くのチェック",
    "intro": "ルークは道が空いていれば遠くの相手にも攻撃を届けられます。",
    "takeaway": "aファイルを縦に進み、着地した8段目では横にチェックできることにも注目しましょう。",
    "moves": [
      {
        "san": "Ra8+",
        "note": "a1のルークが開いたa列を上がり、8段目にいる黒キングへ横からチェックをかけます。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "a1のルークをa8へ進めてチェックをかけよう。",
      "hint": "a列は空いており、a8からg8まで同じ段です。"
    },
    "en": {
      "title": "A long-range rook check",
      "intro": "Rooks work at long range when their path is clear.",
      "takeaway": "After moving along a file, a rook may also attack across a rank.",
      "moves": [
        {
          "san": "Ra8+",
          "note": "The rook travels up the open a-file to a8 and checks the black king along the eighth rank."
        }
      ],
      "practice": {
        "prompt": "Move the rook from a1 to a8 to give check.",
        "hint": "The a-file is open; the rook will then attack along rank eight."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "cb_supportqueen",
    "cat": "combo",
    "fen": "6k1/5ppp/8/8/8/8/5Q2/5RK1 w - - 0 1",
    "title": "ルークに支えられたクイーン",
    "intro": "攻撃に参加する駒同士がお互いを守っているかを確認しよう。",
    "takeaway": "クイーンを前へ出すときも、後ろのルークが支えているかを確認します。",
    "moves": [
      {
        "san": "Qxf7+",
        "note": "白クイーンはf2からf7の黒ポーンを取り、黒キングへチェック。f1のルークがクイーンのいるf7を守っています。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "白クイーンをf2からf7へ動かしてポーンを取ろう。",
      "hint": "f1のルークはf7まで同じ列を利かせています。"
    },
    "en": {
      "title": "Queen supported by a rook",
      "intro": "Coordinated pieces can protect one another while attacking.",
      "takeaway": "Before advancing your queen, check whether a supporting rook defends it.",
      "moves": [
        {
          "san": "Qxf7+",
          "note": "White's queen captures the pawn on f7 with check, supported by the rook on f1 along the f-file."
        }
      ],
      "practice": {
        "prompt": "Capture the pawn on f7 with the queen from f2.",
        "hint": "The rook on f1 supports the queen along the f-file."
      }
    },
    "puzzleTheme": "support"
  },
  {
    "id": "cb_checkcapture",
    "cat": "combo",
    "fen": "8/8/3k4/8/8/3q4/8/3R2K1 w - - 0 1",
    "title": "駒を取りながらチェック",
    "intro": "敵の駒を取った着地点でチェックもかかると、一度に2つの目的を果たせます。",
    "takeaway": "駒取りとチェックを同時に実現する着地点を探してみよう。",
    "moves": [
      {
        "san": "Rxd3+",
        "note": "d1のルークがd3のクイーンを取ると、そのままd6のキングにもチェックがかかります。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "d1のルークでd3の黒クイーンを取ろう。",
      "hint": "ルークはd列を直進できます。"
    },
    "en": {
      "title": "Capture with check",
      "intro": "A move that captures an important piece and gives check achieves two goals at once.",
      "takeaway": "Look for capture squares that also line up with the king.",
      "moves": [
        {
          "san": "Rxd3+",
          "note": "The rook on d1 captures the queen on d3 while also checking the king on d6."
        }
      ],
      "practice": {
        "prompt": "Use the rook on d1 to capture the queen on d3.",
        "hint": "The rook can travel straight up the d-file."
      }
    },
    "puzzleTheme": "capture"
  },
  {
    "id": "eg_passadvance",
    "cat": "endgame",
    "fen": "7k/8/P7/8/8/8/8/4K3 w - - 0 1",
    "title": "遠くのキングとパスポーン",
    "intro": "通過ポーンを相手キングが止められない場合、そのまま昇格を目指せます。",
    "takeaway": "ポーンの進路と相手キングとの距離を確かめましょう。",
    "moves": [
      {
        "san": "a7",
        "note": "白ポーンはa7まで進み、昇格まであと1マスです。"
      },
      {
        "san": "Kh7",
        "note": "遠くの黒キングはh7へ。aポーンを止められません。"
      },
      {
        "san": "a8=Q",
        "note": "白ポーンがa8でクイーンに昇格します。この位置ではチェックではありません。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "a6の白ポーンをa7へ進めよう。",
      "hint": "前が空いていればa7へ進めます。"
    },
    "en": {
      "title": "A distant king and a passed pawn",
      "intro": "A passed pawn may promote if the opposing king is too far away to stop it.",
      "takeaway": "Compare the pawn's route with the enemy king's distance.",
      "moves": [
        {
          "san": "a7",
          "note": "The white pawn advances to a7, one square from promotion."
        },
        {
          "san": "Kh7",
          "note": "Black's distant king moves to h7; it cannot stop the a-pawn."
        },
        {
          "san": "a8=Q",
          "note": "White promotes to a queen on a8. In this position it is not check."
        }
      ],
      "practice": {
        "prompt": "Advance the white pawn from a6 to a7.",
        "hint": "The a7 square is clear."
      }
    },
    "puzzleTheme": "promotion"
  },
  {
    "id": "eg_activeking",
    "cat": "endgame",
    "fen": "7k/8/8/8/8/4K3/4P3/8 w - - 0 1",
    "title": "終盤はキングも働こう",
    "intro": "駒が少なくなったら、キングを安全な範囲で積極的に動かすことが大切です。",
    "takeaway": "キングを使うことと、危険なマスへ無理に進めることは別です。",
    "moves": [
      {
        "san": "Kd4",
        "note": "白キングをe3からd4へ進めます。終盤ではキング自身も中央で働く駒になります。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "白キングをe3からd4へ動かそう。",
      "hint": "キングは斜めにも1マス進めます。"
    },
    "en": {
      "title": "Activate your king",
      "intro": "With fewer pieces, the king becomes a useful active piece in the center.",
      "takeaway": "King activity matters, but never move into danger.",
      "moves": [
        {
          "san": "Kd4",
          "note": "The white king moves from e3 to d4. In the endgame, the king can become an active central piece."
        }
      ],
      "practice": {
        "prompt": "Move the white king from e3 to d4.",
        "hint": "The king can move one square diagonally."
      }
    },
    "puzzleTheme": "endgame"
  },
  {
    "id": "eg_rookbehind",
    "cat": "endgame",
    "fen": "7k/8/P7/8/8/8/8/1R4K1 w - - 0 1",
    "title": "通過ポーンの後ろにルーク",
    "intro": "ルークは通過ポーンの後方で働きやすいことがあります。ただし局面ごとに最善の配置は変わります。",
    "takeaway": "ポーンの進路をふさがず、後ろから支える配置を覚えましょう。",
    "moves": [
      {
        "san": "Ra1",
        "note": "白ルークをb1からa1へ移動し、a6の通過ポーンの後ろに配置します。ポーンを押し進める通り道の邪魔をしません。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "b1のルークをa1へ動かそう。",
      "hint": "a列のポーンはa6、ルークはその後ろのa1に置きます。"
    },
    "en": {
      "title": "Put a rook behind a passer",
      "intro": "A rook often works well behind a passed pawn, but the best square depends on the position.",
      "takeaway": "Learn how to support a pawn without blocking its path.",
      "moves": [
        {
          "san": "Ra1",
          "note": "The rook moves from b1 to a1, positioning itself behind the passed pawn on a6 and leaving its path clear."
        }
      ],
      "practice": {
        "prompt": "Move the rook from b1 to a1.",
        "hint": "Place the rook behind the pawn on a6."
      }
    },
    "puzzleTheme": "endgame"
  },
  {
    "id": "eg_kingescort",
    "cat": "endgame",
    "fen": "8/4k3/8/4K3/4P3/8/8/8 w - - 0 1",
    "title": "キングでポーンを支えよう",
    "intro": "ポーン終盤ではキングが自分のポーンを守りながら相手キングと向き合います。",
    "takeaway": "この例はキングによるポーンの支えを示す一手であり、強制勝ちを示す教材ではありません。",
    "moves": [
      {
        "san": "Kd5",
        "note": "白キングはe5からd5へ動き、e4のポーンを斜め後ろから守りつつ前へ出ます。これだけで勝利が決まるわけではありません。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "キングをe5からd5へ動かしてe4のポーンを守ろう。",
      "hint": "d5のキングはe4のポーンに斜めに隣接します。"
    },
    "en": {
      "title": "Escort a pawn with the king",
      "intro": "In a pawn endgame, the king can protect its pawns while facing the opposing king.",
      "takeaway": "This demonstrates pawn support, not a claim of forced victory.",
      "moves": [
        {
          "san": "Kd5",
          "note": "The white king moves e5–d5, remaining adjacent to and protecting its pawn on e4. This alone does not prove a win."
        }
      ],
      "practice": {
        "prompt": "Move the king from e5 to d5 to protect e4.",
        "hint": "The king on d5 stands diagonally next to e4."
      }
    },
    "puzzleTheme": "endgame"
  }
];

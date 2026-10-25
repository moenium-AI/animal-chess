// Carefully curated reasoning checks for specific illustrated positions.
// "Defense" means a concrete legal reply in the lesson, not globally best play.
// Answer indices stay identical across Japanese and English.
const LESSON_REASONING = {
  bk_stalemate: {
    why: {
      answer: 1,
      ja: { question: 'Qf7のあと、なぜ引き分けになるのかな？', options: ['黒キングがチェックメイトされたから', '黒は王手を受けておらず、合法手もないから', '白のクイーンが取られたから'], explanation: 'Qf7は王手ではない。黒に合法手がないため、チェックメイトではなくステイルメイトの引き分けじゃ。' },
      en: { question: 'Why is the game drawn after Qf7?', options: ['Black is checkmated', 'Black is not in check and has no legal move', 'White lost the queen'], explanation: 'Qf7 does not give check. Black has no legal move, so the result is a stalemate draw rather than checkmate.' }
    },
    defense: {
      answer: 2,
      ja: { question: 'Qf7の代わりにQf6+と指したら、黒はどうできる？', options: ['必ずその場で詰む', '白クイーンを取れる', 'Kg8でチェックから逃げ、対局が続く'], explanation: 'Qf6+にはKg8という合法な応手がある。ステイルメイトを避けられる一例じゃ。' },
      en: { question: 'If White plays Qf6+ instead, what can Black do?', options: ['Black must be checkmated immediately', 'Capture White’s queen', 'Escape with Kg8 and continue'], explanation: 'Black can legally escape the check with ...Kg8. This is one way to avoid the immediate stalemate.' }
    }
  },
  bk_castling: {
    why: {
      answer: 0,
      ja: { question: 'キング側キャスリングO-Oでは、白のキングとルークはどこへ動く？', options: ['キングg1・ルークf1', 'キングf1・ルークg1', 'キングd1・ルークc1'], explanation: 'O-Oではキングがe1からg1へ、h1のルークがf1へ移る。' },
      en: { question: 'Where do White’s king and rook go after O-O?', options: ['King g1, rook f1', 'King f1, rook g1', 'King d1, rook c1'], explanation: 'Kingside castling moves the king from e1 to g1 and the rook from h1 to f1.' }
    },
    defense: {
      answer: 1,
      ja: { question: 'この局面でO-Oの代わりにKd2とキングを動かすと？', options: ['次の手でO-Oできる', '白は以後キャスリングできなくなる', '黒がただちに勝つ'], explanation: 'キングを一度動かすと、戻ってもキャスリング権は回復しない。Kd2自体が必ず負ける手という意味ではないぞ。' },
      en: { question: 'What changes if White plays Kd2 instead of O-O here?', options: ['White can castle next turn', 'White permanently loses castling rights', 'Black wins immediately'], explanation: 'Once the king moves, castling rights are permanently lost, even if it moves back. Kd2 is not necessarily an outright losing move.' }
    }
  },
  cb_windmill: {
    why: {
      answer: 2,
      ja: { question: 'Rxc7+から風車が始まる理由は？', options: ['ルークがナイトのように跳ぶから', '黒クイーンがすでに取られたから', 'ルークが動くとb2のビショップの王手が開くから'], explanation: 'ルークがg7からc7へ動くと、b2のビショップの対角線がh8のキングに通る。これが発見王手じゃ。' },
      en: { question: 'Why can Rxc7+ begin the windmill?', options: ['The rook jumps like a knight', 'Black’s queen was already captured', 'The rook uncovers the bishop’s diagonal check'], explanation: 'Moving the rook from g7 to c7 reveals the bishop on b2 checking the king on h8. This is discovered check.' }
    },
    defense: {
      answer: 0,
      ja: { question: '黒がRxc7+に...Qc3と合駒すると、白はどう対応する？', options: ['Bxc3+でクイーンを取る', 'Rf6でルークを取る', '必ずその場で引き分けになる'], explanation: '...Qc3は発見王手を遮るが、b2のビショップがBxc3+でクイーンを取れる。風車が続かなくても白の攻めは成立する。' },
      en: { question: 'How does White answer ...Qc3 after Rxc7+?', options: ['Bxc3+ captures the queen', 'Rf6 wins a rook', 'The game is necessarily drawn'], explanation: '...Qc3 blocks the discovered check, but the bishop on b2 can capture the queen with Bxc3+. The attack still works without repeated checks.' }
    }
  },
  cb_smother: {
    why: {
      answer: 1,
      ja: { question: '掲載変化のQg8+でクイーンを捨てる狙いは？', options: ['ポーンを昇格させるため', 'Rxg8で逃げ道をふさぎ、Nf7#を可能にするため', 'キングを長く動かすため'], explanation: '黒ルークがg8でクイーンを取ると、黒キングの逃げ道が自分のルークで埋まり、Nf7#の窒息メイトとなる。' },
      en: { question: 'What is the purpose of Qg8+ in the displayed line?', options: ['To promote a pawn', 'To induce ...Rxg8, block an escape square and allow Nf7#', 'To move the king farther away'], explanation: 'After ...Rxg8, Black’s own rook blocks g8, letting the knight deliver smothered mate with Nf7#.' }
    },
    defense: {
      answer: 2,
      ja: { question: '黒が最初のNf7+に...Rxf7と応じたら？', options: ['必ず同じNf7#になる', '白はクイーンを失う', '白はQxf7で黒ルークを取り返せる'], explanation: '...Rxf7にはQxf7。窒息メイトの筋は消えるが、白は黒ルークを取り返して攻めを続けられるぞ。' },
      en: { question: 'What if Black answers the first Nf7+ with ...Rxf7?', options: ['The same Nf7# must follow', 'White loses the queen', 'White recaptures the rook with Qxf7'], explanation: 'After ...Rxf7, White can play Qxf7. The smothered-mate line changes, but White wins the rook.' }
    }
  },
  cb_decoy: {
    why: {
      answer: 0,
      ja: { question: 'Bb3+ Kh8のあと、Nf7+で何を狙う？', options: ['キングとd8のクイーンを同時に攻撃する', '黒ルークをa8へ誘う', 'すぐポーンを昇格させる'], explanation: 'ナイトがf7でキングに王手をかけ、同時にd8のクイーンも狙う。f8の黒ビショップはそのナイトを取れない。' },
      en: { question: 'After Bb3+ Kh8, what does Nf7+ threaten?', options: ['A fork of the king and queen on d8', 'Luring a rook to a8', 'Immediate pawn promotion'], explanation: 'The knight checks the king while attacking the queen on d8. The black bishop on f8 cannot capture that knight.' }
    },
    defense: {
      answer: 1,
      ja: { question: 'Bb3+に黒が...Qd5と合駒した場合、白の一手は？', options: ['Nf7+しかない', 'Bxd5+でクイーンを取る', 'Qxd5#で詰ませる'], explanation: '白ビショップはb3からd5へ進み、Bxd5+で黒クイーンを取れる。フォークと異なる勝ち筋じゃ。' },
      en: { question: 'If Black blocks Bb3+ with ...Qd5, what can White play?', options: ['Only Nf7+', 'Bxd5+ to capture the queen', 'Qxd5# for immediate mate'], explanation: 'The bishop on b3 can take the queen on d5 with Bxd5+. This wins material without the knight fork.' }
    }
  },
  cb_interference: {
    why: {
      answer: 2,
      ja: { question: '白のc7が「利きの遮断」になるのはなぜ？', options: ['黒のキングをチェックするから', '黒ビショップをその場で取るから', 'a7の黒ルークからe7の黒ビショップへの守りをふさぐから'], explanation: 'c7へ進んだ白ポーンが、a7のルークの横方向の守りを遮る。見えない防御線を見つける練習じゃ。' },
      en: { question: 'Why is White’s c7 an interference move?', options: ['It checks the king', 'It immediately captures the bishop', 'It blocks the rook on a7 from defending the bishop on e7'], explanation: 'The pawn on c7 interrupts the rook’s seventh-rank line of defense. Look for pieces relying on that line.' }
    },
    defense: {
      answer: 0,
      ja: { question: 'c7に黒が...Bxd6と応じたら、白は？', options: ['Rxd6でビショップを取る', 'ただちに投了する', '白キングでe7を取る'], explanation: '新しい局面ではd1の白ルークがd6まで通っており、...Bxd6にはRxd6でビショップを取り返せる。' },
      en: { question: 'How can White respond if Black plays ...Bxd6 after c7?', options: ['Rxd6 captures the bishop', 'Resign immediately', 'Capture e7 with the king'], explanation: 'The rook on d1 has a clear file to d6, so White can reply Rxd6 and take the bishop.' }
    }
  },
  "cb_fork": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Ne7+がフォークになるのはなぜ？",
        "options": [
          "黒キングと白キングを同時に守るから",
          "黒キングに王手をかけながら、c6のクイーンを攻撃するから",
          "ナイトがルークに変わるから"
        ],
        "explanation": "e7のナイトは黒キングg8と黒クイーンc6を同時に狙う。王手への対応が先になるのがポイントじゃ。"
      },
      "en": {
        "question": "Why is Ne7+ a knight fork?",
        "options": [
          "It protects both kings",
          "It checks Black's king while attacking the queen on c6",
          "It turns the knight into a rook"
        ],
        "explanation": "From e7 the knight checks the king on g8 and attacks the queen on c6 simultaneously."
      },
      "evidence": {
        "line": [
          "Ne7+",
          "Kh8",
          "Nxc6"
        ],
        "terminal": "insufficient"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "この例でNxc6とクイーンを取ったあと、対局の結果は？",
        "options": [
          "白のチェックメイト",
          "黒のチェックメイト",
          "駒不足による引き分け"
        ],
        "explanation": "クイーンは取れたが、キング＋ナイト対キングでは詰ませられない。駒得と勝利は別なのじゃ。"
      },
      "en": {
        "question": "What is the result after the knight captures the queen on c6 here?",
        "options": [
          "White checkmates Black",
          "Black checkmates White",
          "A draw for insufficient material"
        ],
        "explanation": "White wins the queen, but king and knight against king cannot force checkmate. Winning material is not always winning the game."
      },
      "evidence": {
        "line": [
          "Ne7+",
          "Kh8",
          "Nxc6"
        ],
        "terminal": "insufficient"
      }
    }
  },
  "cb_pin": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "黒ナイトd5がピンされているのはなぜ？",
        "options": [
          "動くとd1の白ルークがd8の黒キングへ王手をかけるから",
          "黒ナイトはどの方向にも進めない駒だから",
          "白ポーンc4がチェックをかけているから"
        ],
        "explanation": "黒ナイトd5がd筋から離れると、白ルークd1が黒キングd8を直線で攻撃するため、そのナイトは動かせない。"
      },
      "en": {
        "question": "Why is Black's knight on d5 absolutely pinned?",
        "options": [
          "Moving it would expose the king on d8 to the rook on d1",
          "Knights cannot move at all",
          "White's pawn on c4 is checking the king"
        ],
        "explanation": "If the knight leaves the d-file, the white rook on d1 attacks Black's king on d8."
      },
      "evidence": {
        "line": [
          "cxd5"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "黒はd5のナイトを動かしてcxd5を避けられる？",
        "options": [
          "ナイトなら王手を無視してよい",
          "できない。キングを王手にさらす移動は違法",
          "d5のナイトで白ルークをすぐ取れる"
        ],
        "explanation": "この局面でd5ナイトを動かすとd筋の白ルークの利きがキングに届く。ピンされた駒の移動は合法ではないぞ。"
      },
      "en": {
        "question": "Can Black move the knight on d5 away from the pawn capture?",
        "options": [
          "A knight may ignore check",
          "No, exposing its own king to check is illegal",
          "The knight can immediately capture White's rook"
        ],
        "explanation": "Moving the pinned knight would expose the king to the rook's line of attack, which is illegal."
      },
      "evidence": {
        "line": [
          "cxd5"
        ]
      }
    }
  },
  "cb_skewer": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Re1+を『串刺し』と呼ぶ理由は？",
        "options": [
          "白キングがクイーンを守るから",
          "黒キングが前にいるのでクイーンは攻撃されないから",
          "キングが動くと背後のe8のクイーンがルークの利きに残るから"
        ],
        "explanation": "キングe5とクイーンe8が同じe筋に並ぶ。チェックでキングを動かせば背後のクイーンを取れる形じゃ。"
      },
      "en": {
        "question": "Why does Re1+ create a skewer?",
        "options": [
          "White's king protects the queen",
          "The queen cannot be attacked while the king stands in front",
          "When the king moves, the queen on e8 stays on the rook's file"
        ],
        "explanation": "The king on e5 stands in front of the queen on e8; the checking rook can capture the queen after the king moves."
      },
      "evidence": {
        "line": [
          "Re1+",
          "Kd5",
          "Rxe8"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "黒がRe1+に...Kd5と逃げたら、白の続きは？",
        "options": [
          "Rxe8でクイーンを取る",
          "ルークをa1へ戻す",
          "白キングをh2へ動かす"
        ],
        "explanation": "キングがe筋から逃げたので、ルークはe8のクイーンを取れる。これが串刺しの収穫じゃ。"
      },
      "en": {
        "question": "If Black answers Re1+ with ...Kd5, what can White do?",
        "options": [
          "Capture the queen with Rxe8",
          "Return the rook to a1",
          "Move the white king to h2"
        ],
        "explanation": "The king has left the e-file, allowing the rook to capture the queen on e8."
      },
      "evidence": {
        "line": [
          "Re1+",
          "Kd5",
          "Rxe8"
        ]
      }
    }
  },
  "cb_backrank": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Rd8#で詰みになる最大の理由は？",
        "options": [
          "白のルークがナイトに守られているから",
          "黒キングの逃げ道が自分のf7・g7・h7のポーンに塞がれているから",
          "黒キングがすでにクイーンを失っているから"
        ],
        "explanation": "黒のポーンがキングの逃げ道を塞いでいるため、8段目のルークの王手を受けられない。"
      },
      "en": {
        "question": "Why does Rd8# checkmate Black?",
        "options": [
          "A knight protects White's rook",
          "Black's own f7, g7 and h7 pawns block the king's escape squares",
          "Black has already lost its queen"
        ],
        "explanation": "Black's pawn shield prevents the king from escaping the rook's back-rank check."
      },
      "evidence": {
        "line": [
          "Rd8#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "この局面でRd8#を指されたあと、黒に合法な受けはある？",
        "options": [
          "...f6で逃げ道を作れる",
          "...Kf8で逃げられる",
          "ない。すでにチェックメイト"
        ],
        "explanation": "詰みの時点ではポーンを動かしても王手を解除できず、キングにも逃げ道がない。準備段階で『ルフト』を作るのが大切じゃ。"
      },
      "en": {
        "question": "After Rd8# in this exact position, does Black have a legal reply?",
        "options": [
          "Play ...f6 to create luft",
          "Escape with ...Kf8",
          "No, the position is already checkmate"
        ],
        "explanation": "There is no legal response to the rook's check. Creating a king escape square (luft) must be done before the mating attack."
      },
      "evidence": {
        "line": [
          "Rd8#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "cb_double": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Qa4+が二重攻撃になるのはなぜ？",
        "options": [
          "黒キングへの王手とh4のビショップへの攻撃を同時に作るから",
          "a4のクイーンが2枚に増えるから",
          "黒キングと白キングを同時に動かすから"
        ],
        "explanation": "クイーンa4はe8のキングへ斜めに王手をかけ、h4のビショップへ横から利きを通している。"
      },
      "en": {
        "question": "Why is Qa4+ a double attack?",
        "options": [
          "It checks the king while attacking the bishop on h4",
          "It duplicates the queen",
          "It moves both kings simultaneously"
        ],
        "explanation": "From a4, the queen checks along the diagonal toward e8 and attacks the bishop on h4 along the fourth rank."
      },
      "evidence": {
        "line": [
          "Qa4+",
          "Kf8",
          "Qxh4"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "黒がQa4+に...Kf8と応じたら、白は何を取れる？",
        "options": [
          "黒キングを直接取れる",
          "a7のポーンを取るしかない",
          "Qxh4でビショップを取れる"
        ],
        "explanation": "黒キングが王手に対応したあと、白クイーンのh4への利きが残り、Qxh4でビショップを取れる。"
      },
      "en": {
        "question": "After ...Kf8 in reply to Qa4+, what can White capture?",
        "options": [
          "The black king directly",
          "Only the pawn on a7",
          "The bishop with Qxh4"
        ],
        "explanation": "After Black addresses the check, the queen can take the bishop on h4."
      },
      "evidence": {
        "line": [
          "Qa4+",
          "Kf8",
          "Qxh4"
        ]
      }
    }
  },
  "cb_discovered": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Nc6+が『発見王手』なのはなぜ？",
        "options": [
          "ナイト自身がe8のキングを取るから",
          "ナイトがe筋を離れてe1のルークの王手を開くから",
          "黒クイーンがe7へ必ず逃げるから"
        ],
        "explanation": "ナイトe5がc6へ動くと、白ルークe1から黒キングe8への縦の利きが開く。ナイトもd8のクイーンを狙う。"
      },
      "en": {
        "question": "Why is Nc6+ a discovered check?",
        "options": [
          "The knight itself captures the king",
          "The knight leaves the e-file and uncovers the rook on e1",
          "Black's queen must always move to e7"
        ],
        "explanation": "The knight on e5 moves off the rook's e-file, uncovering a check on the king on e8 while attacking the queen on d8."
      },
      "evidence": {
        "line": [
          "Nc6+",
          "Kf8",
          "Nxd8"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "黒がNc6+に...Qe7で王手を遮ったら、白は？",
        "options": [
          "Rxe7+でクイーンを取れる",
          "必ずNxd8と取るしかない",
          "白の王手が解けないため対局終了"
        ],
        "explanation": "黒がクイーンをe7へ差し込んでも、白ルークがRxe7+でそのクイーンを取れる。この教材で示した...Kf8以外にも対応があるぞ。"
      },
      "en": {
        "question": "If Black blocks Nc6+ with ...Qe7, what can White play?",
        "options": [
          "Rxe7+ captures the queen",
          "Only Nxd8 is legal",
          "The game ends because check cannot be blocked"
        ],
        "explanation": "The rook on e1 can capture the interposing queen with Rxe7+. This is a different reply from the displayed ...Kf8."
      },
      "evidence": {
        "line": [
          "Nc6+",
          "Qe7",
          "Rxe7+"
        ]
      }
    }
  },
  "cb_doublecheck": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Ne7+でダブルチェックになるのはなぜ？",
        "options": [
          "黒ルークが白に王手をかけるから",
          "ナイトが2枚に増えるから",
          "ナイト自身の王手とc1の白ルークの発見王手が同時に生じるから"
        ],
        "explanation": "c6のナイトがe7に動くとキングc8をナイトで攻撃し、同時にc1のルークの縦の利きも開く。"
      },
      "en": {
        "question": "Why is Ne7+ a double check?",
        "options": [
          "Black's rook checks White",
          "The knight doubles itself",
          "The knight's check and the rook's uncovered c-file check occur together"
        ],
        "explanation": "Moving the knight from c6 to e7 checks the king on c8 and opens the rook on c1 along the same file."
      },
      "evidence": {
        "line": [
          "Ne7+",
          "Kb8",
          "Nxg8"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "黒はNe7+のダブルチェックを合駒だけで防げる？",
        "options": [
          "c筋に駒を置けばキングを動かさなくてよい",
          "できない。キングを動かして二つの王手を同時に避ける",
          "白ナイトを取ればルークの王手も必ず消える"
        ],
        "explanation": "ダブルチェックでは、一方の王手だけを遮ってももう一方が残る。この局面ではキングの移動が必要じゃ。"
      },
      "en": {
        "question": "Can Black stop Ne7+ by blocking only the rook's line?",
        "options": [
          "Yes, any interposition ends both checks",
          "No, the king must move out of both checks",
          "Capturing the knight always cancels the rook's check"
        ],
        "explanation": "Blocking a single line does not stop the knight's check. Black must move the king to a safe square."
      },
      "evidence": {
        "line": [
          "Ne7+",
          "Kb8",
          "Nxg8"
        ]
      }
    }
  },
  "cb_epaulette": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Qe6#で黒キングが逃げられない理由は？",
        "options": [
          "キングの左右に白ポーンがあるから",
          "d8とf8を黒自身のルークが塞ぎ、ほかの逃げ道もクイーンに攻撃されるから",
          "白クイーンがキングを飛び越えるから"
        ],
        "explanation": "黒のルークが両脇をふさぎ、白クイーンが残りの逃げ道を押さえる。味方の駒が作る窒息が特徴じゃ。"
      },
      "en": {
        "question": "Why is the king trapped after Qe6#?",
        "options": [
          "White pawns occupy both neighboring squares",
          "Black's own rooks block d8 and f8 and the queen covers the other escapes",
          "The white queen jumps over the king"
        ],
        "explanation": "Black's rooks fill the squares beside the king, while White's queen controls the remaining escape routes."
      },
      "evidence": {
        "line": [
          "Qe6#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "Qe6#を受けたあと、黒に指せる合法手は？",
        "options": [
          "ない。これはエポーレット・メイト",
          "...Rd7で王手を防げる",
          "...Kf8で白クイーンを取れる"
        ],
        "explanation": "この配置でのQe6#はすでに詰み。どの黒駒も王手を解消できない。"
      },
      "en": {
        "question": "Does Black have a legal reply to Qe6#?",
        "options": [
          "No, this is epaulette mate",
          "Black can play ...Rd7 to block",
          "Black can capture the queen with ...Kf8"
        ],
        "explanation": "Qe6# is checkmate in this position; no black move removes the check."
      },
      "evidence": {
        "line": [
          "Qe6#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "cb_anastasia": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Rh4#でルークとナイトが協力する役割は？",
        "options": [
          "ナイトが白ルークを取る",
          "ルークがポーンを昇格させる",
          "ルークがh筋で王手し、e7のナイトがg6・g8の逃げ道を押さえる"
        ],
        "explanation": "ナイトe7がg6・g8への脱出を防ぎ、ルークがh4からキングh7へ王手をかける。"
      },
      "en": {
        "question": "What roles do the rook and knight play after Rh4#?",
        "options": [
          "The knight captures White's rook",
          "The rook promotes a pawn",
          "The rook checks along the h-file while the knight covers g6 and g8"
        ],
        "explanation": "The knight on e7 guards escape squares g6 and g8 while the rook checks the king along the h-file."
      },
      "evidence": {
        "line": [
          "Rh4#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "Rh4#のあと黒キングがg8へ逃げられないのは？",
        "options": [
          "g8に白ポーンがあるから",
          "白ナイトe7がg8を利かせているから",
          "g8への移動はいつでも禁止だから"
        ],
        "explanation": "ナイトのL字の利きでg8は守られている。ほかの逃げ道も塞がれ、この局面はチェックメイトじゃ。"
      },
      "en": {
        "question": "Why can't Black escape to g8 after Rh4#?",
        "options": [
          "A white pawn occupies g8",
          "White's knight on e7 attacks g8",
          "Kings are never allowed on g8"
        ],
        "explanation": "The knight on e7 controls g8, and the remaining escape routes are closed. Rh4# is checkmate."
      },
      "evidence": {
        "line": [
          "Rh4#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "cb_boden": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Ba6#で2枚のビショップが担う役割は？",
        "options": [
          "a6のビショップが王手し、f4のビショップがb8・c7を押さえる",
          "2枚ともキングを直接取る",
          "片方がルークに変わる"
        ],
        "explanation": "a6のビショップがキングc8に王手し、f4のビショップがb8・c7の逃げ道を押さえる。黒のポーン・ルークもキングの逃げ道をふさぐ。"
      },
      "en": {
        "question": "How do the two bishops cooperate in Ba6#?",
        "options": [
          "The bishop on a6 checks, while the bishop on f4 covers b8 and c7",
          "Both bishops directly capture the king",
          "One bishop turns into a rook"
        ],
        "explanation": "The bishop on a6 checks the king on c8; the bishop on f4 covers escape squares b8 and c7, helped by Black's own blocking pieces."
      },
      "evidence": {
        "line": [
          "Ba6#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "このBa6#に対して、黒は何を指せる？",
        "options": [
          "...d6でビショップの利きを止める",
          "...Rb8でキングを逃がす",
          "合法な受けはない。チェックメイト"
        ],
        "explanation": "黒キングの逃げ道はビショップの利きと黒自身の駒で塞がれており、王手を防ぐ手はない。"
      },
      "en": {
        "question": "What legal defense does Black have after Ba6#?",
        "options": [
          "Block with ...d6",
          "Move the king away with ...Rb8",
          "None: the position is checkmate"
        ],
        "explanation": "The bishops and Black's own pieces leave no escape or effective block. Ba6# ends the game."
      },
      "evidence": {
        "line": [
          "Ba6#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "cb_hanging": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Qxa5で白がルークを取れる理由は？",
        "options": [
          "白クイーンがキングをチェックしているから",
          "a5の黒ルークに守り駒がなく、この取り方が合法だから",
          "ルークはクイーンに取られない駒だから"
        ],
        "explanation": "黒ルークa5は守られておらず、白クイーンがa1からa5へ進んで取れる。無防備な駒を見つける基本じゃ。"
      },
      "en": {
        "question": "Why can White capture the rook with Qxa5?",
        "options": [
          "The queen is checking the king",
          "The rook on a5 is undefended and the capture is legal",
          "Rooks can never be captured by queens"
        ],
        "explanation": "The rook on a5 has no defender, and the queen can travel from a1 to a5 to capture it."
      },
      "evidence": {
        "line": [
          "Qxa5",
          "Kh8"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "Qxa5のあと、黒キングは王手を受けている？",
        "options": [
          "受けていない。白はルークを取ったが王手ではない",
          "受けていて、黒は一手詰め",
          "受けていて、黒キングはa5に移るしかない"
        ],
        "explanation": "Qxa5は王手ではない。黒はたとえば...Kh8と続けられる。駒得と王手を区別しよう。"
      },
      "en": {
        "question": "After Qxa5, is Black's king in check?",
        "options": [
          "No. White captured the rook without giving check",
          "Yes, Black is checkmated",
          "Yes, Black must move its king to a5"
        ],
        "explanation": "Qxa5 wins an undefended rook but does not give check; Black can continue, for example with ...Kh8."
      },
      "evidence": {
        "line": [
          "Qxa5",
          "Kh8"
        ]
      }
    }
  },
  "cb_deflection": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Qxf7+の狙いは黒のルークに何をさせること？",
        "options": [
          "f7のポーンを昇格させる",
          "黒ルークをe7へ戻す",
          "...Rxf7とクイーンを取らせ、e筋の守りからルークをそらす"
        ],
        "explanation": "黒ルークe7がf7でクイーンを取るとe筋が空き、白ルークe1からRe8#が狙える。"
      },
      "en": {
        "question": "What is White trying to induce with Qxf7+?",
        "options": [
          "Promotion of the pawn on f7",
          "Return of Black's rook to e7",
          "...Rxf7, pulling the rook away from guarding the e-file"
        ],
        "explanation": "Once Black's rook captures on f7, it no longer guards the e-file, allowing Re8# in the displayed line."
      },
      "evidence": {
        "line": [
          "Qxf7+",
          "Rxf7",
          "Re8#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "Qxf7+に黒が...Rxf7と取り返したら、白の決め手は？",
        "options": [
          "Re8#でチェックメイト",
          "Qxf7ともう一度クイーンで取る",
          "ポーンをa8へ昇格させる"
        ],
        "explanation": "黒ルークがe筋を離れたため、白ルークがRe8#で詰ませられる。教材で示したデフレクションの筋じゃ。"
      },
      "en": {
        "question": "If Black replies ...Rxf7 to Qxf7+, what is White's finishing move?",
        "options": [
          "Re8# is checkmate",
          "Capture with the queen again",
          "Promote a pawn on a8"
        ],
        "explanation": "With the rook drawn off the e-file, White can finish with Re8# in this particular line."
      },
      "evidence": {
        "line": [
          "Qxf7+",
          "Rxf7",
          "Re8#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "cb_zwischenzug": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "黒の...Bxh2+はなぜ『中間手』になる？",
        "options": [
          "d8のクイーンを取る前に王手でh2のポーンを取れるから",
          "黒ルークがクイーンを取れなくなるから",
          "黒キングがポーンに昇格するから"
        ],
        "explanation": "黒はすぐ...Rxd8でクイーンを取る代わりに、先に...Bxh2+を挟んでh2のポーンを得る。王手のため白は対応を強いられる。"
      },
      "en": {
        "question": "Why is ...Bxh2+ an intermediate move?",
        "options": [
          "It captures the pawn on h2 with check before Black takes the queen on d8",
          "It makes ...Rxd8 illegal",
          "It promotes the black king"
        ],
        "explanation": "Black inserts a capture with check on h2 before taking the queen with ...Rxd8, gaining an extra pawn."
      },
      "evidence": {
        "line": [
          "Bxh2+",
          "Kh1",
          "Rxd8"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "...Bxh2+を受けた白の合法な応手はどれ？",
        "options": [
          "Kxh2でビショップを取る",
          "Kh1でキングを逃がす",
          "Qxd8+で黒ルークを取る"
        ],
        "explanation": "白はKh1しか指せない。h2のビショップはg4のナイトに守られ、Kxh2で取ることはできない。"
      },
      "en": {
        "question": "What is White's legal reply to ...Bxh2+ here?",
        "options": [
          "Kxh2 captures the bishop",
          "Kh1 moves the king away",
          "Qxd8+ captures Black's rook"
        ],
        "explanation": "Only Kh1 is legal. The bishop on h2 is protected by the knight on g4, so Kxh2 is illegal."
      },
      "evidence": {
        "line": [
          "Bxh2+",
          "Kh1",
          "Rxd8"
        ]
      }
    }
  },
  "cb_knightfork2": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Ne4+のナイトの二股で狙われる黒駒は？",
        "options": [
          "黒ルークa8と黒ビショップc8",
          "キングf6とクイーンd2",
          "黒キングと白キング"
        ],
        "explanation": "c3のナイトがe4へ跳ぶと、f6のキングに王手をかけながらd2のクイーンも狙う。"
      },
      "en": {
        "question": "Which black pieces are forked by Ne4+?",
        "options": [
          "Rook on a8 and bishop on c8",
          "King on f6 and queen on d2",
          "The black and white kings"
        ],
        "explanation": "From e4 the knight checks the king on f6 and simultaneously attacks the queen on d2."
      },
      "evidence": {
        "line": [
          "Ne4+",
          "Ke7",
          "Nxd2"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "黒がNe4+を受けるとき、まず必要なのは？",
        "options": [
          "黒クイーンをどの手でも自由に動かすこと",
          "白ナイトを自分のキングで取ること",
          "王手を解消すること。たとえば...Ke7"
        ],
        "explanation": "王手を無視してクイーンだけを動かすことはできない。黒はまずキングの安全を確保する必要がある。"
      },
      "en": {
        "question": "What must Black do first after Ne4+?",
        "options": [
          "Move its queen freely without addressing check",
          "Capture the knight with its king",
          "Answer the check, for example with ...Ke7"
        ],
        "explanation": "Black cannot ignore check to save its queen. It must first find a legal response that makes the king safe."
      },
      "evidence": {
        "line": [
          "Ne4+",
          "Ke7",
          "Nxd2"
        ]
      }
    }
  },
  "cb_rookfile": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Ra8+で遠くの黒キングに王手が届くのはなぜ？",
        "options": [
          "a筋を上がったルークの利きが8段目を横に伸びてg8のキングへ届くから",
          "ルークが斜めに飛び移るから",
          "白キングが黒キングをチェックしているから"
        ],
        "explanation": "ルークはa1からa8まで開いたa筋を進み、到着したa8からg8へ横向きに王手をかける。"
      },
      "en": {
        "question": "Why does Ra8+ check a distant king?",
        "options": [
          "The rook goes up the open a-file, then attacks the king on g8 across rank eight",
          "Rooks jump diagonally",
          "White's king is giving check"
        ],
        "explanation": "The rook travels up the clear a-file and then attacks horizontally from a8 toward the black king on g8."
      },
      "evidence": {
        "line": [
          "Ra8+",
          "Kh7"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "この局面のRa8+に対して黒キングが逃げられるマスは？",
        "options": [
          "f8",
          "h7",
          "g7"
        ],
        "explanation": "Ra8+のあと黒の合法な応手は...Kh7だけ。この局面ではf7とg7に黒のポーンがある。"
      },
      "en": {
        "question": "After Ra8+ here, where can Black's king legally escape?",
        "options": [
          "f8",
          "h7",
          "g7"
        ],
        "explanation": "...Kh7 is Black's only legal reply in this specific position; f7 and g7 are occupied by Black's pawns."
      },
      "evidence": {
        "line": [
          "Ra8+",
          "Kh7"
        ]
      }
    }
  },
  "cb_supportqueen": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Qxf7+で白クイーンがf7に進んでも守られているのは？",
        "options": [
          "黒キングが白クイーンを守るから",
          "白ポーンがf7へ昇格しているから",
          "f1の白ルークがf筋を通してクイーンを支えるから"
        ],
        "explanation": "白のルークはf1からf7のクイーンを守っている。クイーンが前へ出るときには味方の支援を確認しよう。"
      },
      "en": {
        "question": "What protects White's queen after Qxf7+?",
        "options": [
          "Black's king protects the queen",
          "A white pawn has promoted on f7",
          "The rook on f1 supports the queen along the f-file"
        ],
        "explanation": "The rook on f1 defends the queen on f7 up the open f-file."
      },
      "evidence": {
        "line": [
          "Qxf7+",
          "Kh8"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "このQxf7+への黒キングの合法な応手は？",
        "options": [
          "...Kh8と逃げる",
          "...Kxf7でクイーンを取る",
          "...Kg7でポーンを越える"
        ],
        "explanation": "f7のクイーンはルークに守られており、黒キングは取れない。この局面では...Kh8だけが合法な受けじゃ。"
      },
      "en": {
        "question": "How can Black legally respond to Qxf7+ in this position?",
        "options": [
          "Move the king with ...Kh8",
          "Capture the queen with ...Kxf7",
          "Jump over a pawn with ...Kg7"
        ],
        "explanation": "The queen is supported by the rook and cannot be captured by the king. ...Kh8 is Black's only legal reply here."
      },
      "evidence": {
        "line": [
          "Qxf7+",
          "Kh8"
        ]
      }
    }
  },
  "cb_checkcapture": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Rxd3+が一手で達成する二つの目的は？",
        "options": [
          "白キングへの王手とクイーンの保護",
          "黒クイーンd3の捕獲と黒キングd6への王手",
          "白ルークを2枚に増やす"
        ],
        "explanation": "白ルークd1がd3のクイーンを取り、そのd筋の先にいるキングd6へ王手をかける。"
      },
      "en": {
        "question": "What two goals does Rxd3+ achieve?",
        "options": [
          "Checking White's king and protecting the queen",
          "Capturing Black's queen on d3 and checking the king on d6",
          "Creating a second white rook"
        ],
        "explanation": "The white rook takes the black queen on d3 and gives check up the d-file toward the black king on d6."
      },
      "evidence": {
        "line": [
          "Rxd3+",
          "Kc7"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "黒はRxd3+でクイーンを失ったあと、何を先にする？",
        "options": [
          "黒クイーンを同じd3へ戻す",
          "王手を無視してポーンを進める",
          "黒キングを安全なマスへ動かす。たとえば...Kc7"
        ],
        "explanation": "クイーンを取り返すより前に王手に対応しなければならない。この局面では...Kc7は合法な一例じゃ。"
      },
      "en": {
        "question": "What must Black do after losing the queen to Rxd3+?",
        "options": [
          "Put the captured queen back on d3",
          "Ignore check and push a pawn",
          "Answer the check by moving the king, for example ...Kc7"
        ],
        "explanation": "Black must respond to check first. ...Kc7 is one legal response in the displayed position."
      },
      "evidence": {
        "line": [
          "Rxd3+",
          "Kc7"
        ]
      }
    }
  }
};

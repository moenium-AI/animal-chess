// Carefully curated reasoning checks for specific illustrated positions.
// "Defense" means a concrete legal reply in the lesson, not globally best play.
// Answer indices stay identical across Japanese and English.
const LESSON_REASONING = {
  "bk_stalemate": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Qf7のあと、なぜ引き分けになるのかな？",
        "options": [
          "黒キングは王手を受けており、白クイーンを取る手だけが禁じられたから",
          "黒は王手を受けておらず、合法手もないから",
          "黒キングに合法な手はあるが、同じ局面が3回繰り返されたから"
        ],
        "explanation": "Qf7は王手ではない。黒に合法手がないため、チェックメイトではなくステイルメイトの引き分けじゃ。"
      },
      "en": {
        "question": "Why is the game drawn after Qf7?",
        "options": [
          "Black is in check but the only capture of White's queen is forbidden",
          "Black is not in check and has no legal move",
          "Black has legal moves, but the same position has occurred three times"
        ],
        "explanation": "Qf7 does not give check. Black has no legal move, so the result is a stalemate draw rather than checkmate."
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "Qf7の代わりにQf6+と指したら、黒はどうできる？",
        "options": [
          "黒キングは...Kh7と進んで王手を避けることができる",
          "黒キングは...Kxf6と白クイーンを取って王手を消せる",
          "Kg8でチェックから逃げ、対局が続く"
        ],
        "explanation": "Qf6+にはKg8という合法な応手がある。ステイルメイトを避けられる一例じゃ。"
      },
      "en": {
        "question": "If White plays Qf6+ instead, what can Black do?",
        "options": [
          "The king can sidestep the check by moving to h7",
          "The king can capture White's checking queen with ...Kxf6",
          "Escape with Kg8 and continue"
        ],
        "explanation": "Black can legally escape the check with ...Kg8. This is one way to avoid the immediate stalemate."
      }
    }
  },
  "bk_castling": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "キング側キャスリングO-Oでは、白のキングとルークはどこへ動く？",
        "options": [
          "キングg1・ルークf1",
          "キングf1・ルークh1。キングだけが斜めに動く",
          "キングc1・ルークd1。クイーン側にまとめて移動"
        ],
        "explanation": "O-Oではキングがe1からg1へ、h1のルークがf1へ移る。"
      },
      "en": {
        "question": "Where do White’s king and rook go after O-O?",
        "options": [
          "King g1, rook f1",
          "King to f1, rook stays h1: only the king makes a diagonal move",
          "King to c1, rook to d1: White castles toward the queenside"
        ],
        "explanation": "Kingside castling moves the king from e1 to g1 and the rook from h1 to f1."
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "この局面でO-Oの代わりにKd2とキングを動かすと？",
        "options": [
          "Kd2からe1へ戻せば、まだ未使用のルークでO-Oが可能",
          "白は以後キャスリングできなくなる",
          "キングをd2へ動かしたあと、黒の次の手まで権利が残る"
        ],
        "explanation": "キングを一度動かすと、戻ってもキャスリング権は回復しない。Kd2自体が必ず負ける手という意味ではないぞ。"
      },
      "en": {
        "question": "What changes if White plays Kd2 instead of O-O here?",
        "options": [
          "White can return to e1 and castle because the rook has not moved",
          "White permanently loses castling rights",
          "White retains castling rights until Black's next turn after Kd2"
        ],
        "explanation": "Once the king moves, castling rights are permanently lost, even if it moves back. Kd2 is not necessarily an outright losing move."
      }
    }
  },
  "cb_windmill": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Rxc7+から風車が始まる理由は？",
        "options": [
          "ルークc7がb2ビショップからの王手を遮り、守りを固めるから",
          "ルークがc7へ動くと黒キングh8へ横から直接王手するから",
          "ルークが動くとb2のビショップの王手が開くから"
        ],
        "explanation": "ルークがg7からc7へ動くと、b2のビショップの対角線がh8のキングに通る。これが発見王手じゃ。"
      },
      "en": {
        "question": "Why can Rxc7+ begin the windmill?",
        "options": [
          "The rook on c7 blocks the bishop from b2 and protects White's position",
          "Moving the rook to c7 checks the king on h8 directly along its rank",
          "The rook uncovers the bishop’s diagonal check"
        ],
        "explanation": "Moving the rook from g7 to c7 reveals the bishop on b2 checking the king on h8. This is discovered check."
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "黒がRxc7+に...Qc3と合駒すると、白はどう対応する？",
        "options": [
          "Bxc3+でクイーンを取る",
          "黒が...Qc3と合駒すると白はRxc3+でクイーンを取る",
          "黒が...Qc3と遮ったあと白はRxc7+で再び発見王手"
        ],
        "explanation": "...Qc3は発見王手を遮るが、b2のビショップがBxc3+でクイーンを取れる。風車が続かなくても白の攻めは成立する。"
      },
      "en": {
        "question": "How does White answer ...Qc3 after Rxc7+?",
        "options": [
          "Bxc3+ captures the queen",
          "After ...Qc3, White can capture the queen with Rxc3+",
          "After ...Qc3, White repeats the discovered check by playing Rxc7+"
        ],
        "explanation": "...Qc3 blocks the discovered check, but the bishop on b2 can capture the queen with Bxc3+. The attack still works without repeated checks."
      }
    }
  },
  "cb_smother": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "掲載変化のQg8+でクイーンを捨てる狙いは？",
        "options": [
          "Qg8+でルークをg8から追い払いナイトをf7に出しやすくする",
          "Rxg8で逃げ道をふさぎ、Nf7#を可能にするため",
          "Qg8+で黒キングをf8へ押し戻し、f7のナイトを守り切る"
        ],
        "explanation": "黒ルークがg8でクイーンを取ると、黒キングの逃げ道が自分のルークで埋まり、Nf7#の窒息メイトとなる。"
      },
      "en": {
        "question": "What is the purpose of Qg8+ in the displayed line?",
        "options": [
          "Qg8+ drives the rook away from g8 to clear a route for the knight",
          "To induce ...Rxg8, block an escape square and allow Nf7#",
          "Qg8+ forces Black's king back to f8 and protects the knight on f7"
        ],
        "explanation": "After ...Rxg8, Black’s own rook blocks g8, letting the knight deliver smothered mate with Nf7#."
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "黒が最初のNf7+に...Rxf7と応じたら？",
        "options": [
          "黒が...Rxf7とナイトを取ったあと白はQxb7でポーンを得る",
          "...Rxf7には白クイーンがg8へ進み、同じ詰みが続く",
          "白はQxf7で黒ルークを取り返せる"
        ],
        "explanation": "...Rxf7にはQxf7。窒息メイトの筋は消えるが、白は黒ルークを取り返して攻めを続けられるぞ。"
      },
      "en": {
        "question": "What if Black answers the first Nf7+ with ...Rxf7?",
        "options": [
          "After ...Rxf7, White captures the pawn on b7 with Qxb7",
          "After ...Rxf7, White brings the queen to g8 and forces the same mate",
          "White recaptures the rook with Qxf7"
        ],
        "explanation": "After ...Rxf7, White can play Qxf7. The smothered-mate line changes, but White wins the rook."
      }
    }
  },
  "cb_decoy": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Bb3+ Kh8のあと、Nf7+で何を狙う？",
        "options": [
          "キングとd8のクイーンを同時に攻撃する",
          "f7ナイトが黒ルークh8と黒ビショップf8を同時に狙う",
          "f7ナイトは黒キングへの王手だけでクイーンには当たらない"
        ],
        "explanation": "ナイトがf7でキングに王手をかけ、同時にd8のクイーンも狙う。f8の黒ビショップはそのナイトを取れない。"
      },
      "en": {
        "question": "After Bb3+ Kh8, what does Nf7+ threaten?",
        "options": [
          "A fork of the king and queen on d8",
          "The knight on f7 attacks both the rook on h8 and bishop on f8",
          "The knight gives check but does not attack Black's queen on d8"
        ],
        "explanation": "The knight checks the king while attacking the queen on d8. The black bishop on f8 cannot capture that knight."
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "Bb3+に黒が...Qd5と合駒した場合、白の一手は？",
        "options": [
          "黒の...Qd5には白はNf7+としてからQxd5と取る",
          "Bxd5+でクイーンを取る",
          "黒が...Qd5と合駒したらビショップをc4へ戻して守る"
        ],
        "explanation": "白ビショップはb3からd5へ進み、Bxd5+で黒クイーンを取れる。フォークと異なる勝ち筋じゃ。"
      },
      "en": {
        "question": "If Black blocks Bb3+ with ...Qd5, what can White play?",
        "options": [
          "After ...Qd5 White must play Nf7+ before capturing with Qxd5",
          "Bxd5+ to capture the queen",
          "When Black interposes with ...Qd5 White retreats the bishop to c4"
        ],
        "explanation": "The bishop on b3 can take the queen on d5 with Bxd5+. This wins material without the knight fork."
      }
    }
  },
  "cb_interference": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "白のc7が「利きの遮断」になるのはなぜ？",
        "options": [
          "c7のポーンが黒ビショップe7から黒ルークa7への斜めの利きを遮るから",
          "白ポーンがc7へ進み黒ルークa7を直接攻撃して守りを破るから",
          "a7の黒ルークからe7の黒ビショップへの守りをふさぐから"
        ],
        "explanation": "c7へ進んだ白ポーンが、a7のルークの横方向の守りを遮る。見えない防御線を見つける練習じゃ。"
      },
      "en": {
        "question": "Why is White’s c7 an interference move?",
        "options": [
          "The pawn on c7 blocks the bishop on e7 from defending the rook on a7",
          "White's pawn moves to c7 and directly attacks the black rook on a7",
          "It blocks the rook on a7 from defending the bishop on e7"
        ],
        "explanation": "The pawn on c7 interrupts the rook’s seventh-rank line of defense. Look for pieces relying on that line."
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "c7に黒が...Bxd6と応じたら、白は？",
        "options": [
          "Rxd6でビショップを取る",
          "黒が...Bxd6と取ったら白はc8=Qでその場で昇格する",
          "黒の...Bxd6には白はRxd1とルークを後方へ戻して守る"
        ],
        "explanation": "新しい局面ではd1の白ルークがd6まで通っており、...Bxd6にはRxd6でビショップを取り返せる。"
      },
      "en": {
        "question": "How can White respond if Black plays ...Bxd6 after c7?",
        "options": [
          "Rxd6 captures the bishop",
          "If Black plays ...Bxd6, White promotes immediately with c8=Q",
          "White answers ...Bxd6 by retreating its rook back to d1"
        ],
        "explanation": "The rook on d1 has a clear file to d6, so White can reply Rxd6 and take the bishop."
      }
    }
  },
  "cb_fork": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Ne7+がフォークになるのはなぜ？",
        "options": [
          "e7ナイトは黒キングg8に王手をかけつつ黒ルークa8を狙う",
          "黒キングに王手をかけながら、c6のクイーンを攻撃するから",
          "e7ナイトは黒クイーンc6を守るため白キングから離れる"
        ],
        "explanation": "e7のナイトは黒キングg8と黒クイーンc6を同時に狙う。王手への対応が先になるのがポイントじゃ。"
      },
      "en": {
        "question": "Why is Ne7+ a knight fork?",
        "options": [
          "From e7 the knight checks g8 and attacks the rook on a8",
          "It checks Black's king while attacking the queen on c6",
          "The knight moves away from White's king to defend Black's queen on c6"
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
          "Nxc6で黒クイーンを取るとキングとナイトだけでは勝ち切れないが、黒にまだポーンが残る",
          "Nxc6のあと白ナイトはc6で黒キングに王手をかけ続けるため詰む",
          "駒不足による引き分け"
        ],
        "explanation": "クイーンは取れたが、キング＋ナイト対キングでは詰ませられない。駒得と勝利は別なのじゃ。"
      },
      "en": {
        "question": "What is the result after the knight captures the queen on c6 here?",
        "options": [
          "After Nxc6 only kings and a knight remain, but Black still has a pawn",
          "After Nxc6 the knight continues checking Black's king from c6 and forces mate",
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
          "ナイトd5が動くとc4の白ポーンがd8キングへ斜めに王手するから",
          "ナイトd5はd1ルークへ反撃できるので動くと必ず取られるから"
        ],
        "explanation": "黒ナイトd5がd筋から離れると、白ルークd1が黒キングd8を直線で攻撃するため、そのナイトは動かせない。"
      },
      "en": {
        "question": "Why is Black's knight on d5 absolutely pinned?",
        "options": [
          "Moving it would expose the king on d8 to the rook on d1",
          "Moving the knight lets the pawn on c4 check the king on d8 diagonally",
          "Moving the knight invites capture because it could attack White's rook on d1"
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
          "黒ナイトはc7へ下がればルークの射線を遮り続けられる",
          "できない。キングを王手にさらす移動は違法",
          "黒ナイトはe7へ逃げれば黒キングがルークの王手を受けずに済む"
        ],
        "explanation": "この局面でd5ナイトを動かすとd筋の白ルークの利きがキングに届く。ピンされた駒の移動は合法ではないぞ。"
      },
      "en": {
        "question": "Can Black move the knight on d5 away from the pawn capture?",
        "options": [
          "The knight may retreat to c7 and keep blocking the rook's line",
          "No, exposing its own king to check is illegal",
          "The knight can escape to e7 without exposing Black's king to the rook"
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
          "ルークe1の後ろに白キングがいるため、黒キングが前へ出ると危険",
          "黒キングがe5を離れるとd8の黒クイーンがルークに守られる",
          "キングが動くと背後のe8のクイーンがルークの利きに残るから"
        ],
        "explanation": "キングe5とクイーンe8が同じe筋に並ぶ。チェックでキングを動かせば背後のクイーンを取れる形じゃ。"
      },
      "en": {
        "question": "Why does Re1+ create a skewer?",
        "options": [
          "The white king behind the rook becomes exposed when Black's king advances",
          "Once Black's king leaves e5, the queen on d8 is defended by the rook",
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
          "黒キングがd5へ逃げると白はRxe5で黒キングの跡を狙う",
          "黒キングがd5へ逃げたので白はRe8+と王手を続ける"
        ],
        "explanation": "キングがe筋から逃げたので、ルークはe8のクイーンを取れる。これが串刺しの収穫じゃ。"
      },
      "en": {
        "question": "If Black answers Re1+ with ...Kd5, what can White do?",
        "options": [
          "Capture the queen with Rxe8",
          "After Black's king moves to d5, White plays Rxe5 to target its old square",
          "Once the king moves to d5, White continues checking with Re8+"
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
          "白ルークd8が黒キングに守られていないので逃げる必要があるから",
          "黒キングの逃げ道が自分のf7・g7・h7のポーンに塞がれているから",
          "黒キングg8は白のルークを取れるが次の手で詰まされるから"
        ],
        "explanation": "黒のポーンがキングの逃げ道を塞いでいるため、8段目のルークの王手を受けられない。"
      },
      "en": {
        "question": "Why does Rd8# checkmate Black?",
        "options": [
          "The rook on d8 is undefended, forcing Black's king to pursue it",
          "Black's own f7, g7 and h7 pawns block the king's escape squares",
          "Black's king on g8 could take the checking rook but would be mated later"
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
          "黒は...f6と指しg7のポーンを守りながら王手を遮れる",
          "黒は...Kh7でf7ポーンを避け、7段目へ脱出できる",
          "ない。すでにチェックメイト"
        ],
        "explanation": "詰みの時点ではポーンを動かしても王手を解除できず、キングにも逃げ道がない。準備段階で『ルフト』を作るのが大切じゃ。"
      },
      "en": {
        "question": "After Rd8# in this exact position, does Black have a legal reply?",
        "options": [
          "Black can block with ...f6 while keeping the g7-pawn defended",
          "Black may flee with ...Kh7, moving out beside its pawn on f7",
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
          "クイーンa4は黒キングを王手すると同時にd4の白ポーンも守るから",
          "クイーンa4は黒キングだけに王手をかけ、h4ビショップには届かない"
        ],
        "explanation": "クイーンa4はe8のキングへ斜めに王手をかけ、h4のビショップへ横から利きを通している。"
      },
      "en": {
        "question": "Why is Qa4+ a double attack?",
        "options": [
          "It checks the king while attacking the bishop on h4",
          "The queen on a4 gives check while also defending White's pawn on d4",
          "The queen on a4 checks the king but has no attack along the fourth rank"
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
          "黒キングがf8へ逃げると白はQxa7でa7ポーンを取れる",
          "...Kf8のあと白クイーンはQe8+で王手を続ける",
          "Qxh4でビショップを取れる"
        ],
        "explanation": "黒キングが王手に対応したあと、白クイーンのh4への利きが残り、Qxh4でビショップを取れる。"
      },
      "en": {
        "question": "After ...Kf8 in reply to Qa4+, what can White capture?",
        "options": [
          "After the king goes to f8, White can take Black's a7-pawn with Qxa7",
          "After ...Kf8 the queen gives another check with Qe8+",
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
          "ナイトc6自身が黒キングe8へL字の王手をかけるから",
          "ナイトがe筋を離れてe1のルークの王手を開くから",
          "ナイトがc6へ動くことで白ビショップの対角線がe8へ通るから"
        ],
        "explanation": "ナイトe5がc6へ動くと、白ルークe1から黒キングe8への縦の利きが開く。ナイトもd8のクイーンを狙う。"
      },
      "en": {
        "question": "Why is Nc6+ a discovered check?",
        "options": [
          "The knight on c6 itself gives an L-shaped check to the king on e8",
          "The knight leaves the e-file and uncovers the rook on e1",
          "Moving the knight to c6 uncovers a bishop's diagonal toward e8"
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
          "黒の...Qe7に白はNxe7でナイトがクイーンを取る",
          "...Qe7に対して白はRxe5でナイトのいた場所を守る"
        ],
        "explanation": "黒がクイーンをe7へ差し込んでも、白ルークがRxe7+でそのクイーンを取れる。この教材で示した...Kf8以外にも対応があるぞ。"
      },
      "en": {
        "question": "If Black blocks Nc6+ with ...Qe7, what can White play?",
        "options": [
          "Rxe7+ captures the queen",
          "After ...Qe7 the knight captures the queen with Nxe7",
          "After ...Qe7 White plays Rxe5 to protect the knight's old square"
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
          "Ne7+では白ルークが黒ナイトだけを攻撃し王手は一つ",
          "ナイトがe7に動くとc1ルークはナイトに遮られ王手が消える",
          "ナイト自身の王手とc1の白ルークの発見王手が同時に生じるから"
        ],
        "explanation": "c6のナイトがe7に動くとキングc8をナイトで攻撃し、同時にc1のルークの縦の利きも開く。"
      },
      "en": {
        "question": "Why is Ne7+ a double check?",
        "options": [
          "Ne7+ lets the rook attack a black knight, leaving only a single check",
          "The knight on e7 blocks the rook on c1 so its check disappears",
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
          "黒はc7へビショップを置いてc1ルークだけの王手を防げる",
          "できない。キングを動かして二つの王手を同時に避ける",
          "黒はナイトを取れば残ったc1ルークの王手も遮れる"
        ],
        "explanation": "ダブルチェックでは、一方の王手だけを遮ってももう一方が残る。この局面ではキングの移動が必要じゃ。"
      },
      "en": {
        "question": "Can Black stop Ne7+ by blocking only the rook's line?",
        "options": [
          "Black can interpose a bishop on c7 to block only the rook's attack",
          "No, the king must move out of both checks",
          "Capturing the knight also blocks the remaining check from the rook on c1"
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
          "黒のルークがd8とf8から黒キングの両側を守って逃げ道を開く",
          "d8とf8を黒自身のルークが塞ぎ、ほかの逃げ道もクイーンに攻撃されるから",
          "白クイーンe6はd7とf7を押さえるが黒キングには王手していない"
        ],
        "explanation": "黒のルークが両脇をふさぎ、白クイーンが残りの逃げ道を押さえる。味方の駒が作る窒息が特徴じゃ。"
      },
      "en": {
        "question": "Why is the king trapped after Qe6#?",
        "options": [
          "Black's rooks defend both sides of the king and clear its escape squares",
          "Black's own rooks block d8 and f8 and the queen covers the other escapes",
          "White's queen on e6 guards d7 and f7 but does not check the king"
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
          "黒のルークd8で...Rd7と合駒して王手を止められる",
          "黒は...Kd7と一歩進んで白クイーンの射線から逃れる"
        ],
        "explanation": "この配置でのQe6#はすでに詰み。どの黒駒も王手を解消できない。"
      },
      "en": {
        "question": "Does Black have a legal reply to Qe6#?",
        "options": [
          "No, this is epaulette mate",
          "Black's rook on d8 can interpose with ...Rd7 to block the check",
          "The king can step to d7 to leave the queen's checking line"
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
          "e7ナイトはh5の白ルークを守るためg6を空けておく",
          "ルークがh4へ動くとナイトe7はg6へ移動して王手を続ける",
          "ルークがh筋で王手し、e7のナイトがg6・g8の逃げ道を押さえる"
        ],
        "explanation": "ナイトe7がg6・g8への脱出を防ぎ、ルークがh4からキングh7へ王手をかける。"
      },
      "en": {
        "question": "What roles do the rook and knight play after Rh4#?",
        "options": [
          "The knight on e7 frees g6 while guarding White's rook on h5",
          "After the rook reaches h4, the knight moves to g6 to keep checking",
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
          "黒キングはg8へ移れるが白ルークh4が次にg4へ回る",
          "白ナイトe7がg8を利かせているから",
          "ナイトe7はg6のみを守り、g8へのキング移動は可能"
        ],
        "explanation": "ナイトのL字の利きでg8は守られている。ほかの逃げ道も塞がれ、この局面はチェックメイトじゃ。"
      },
      "en": {
        "question": "Why can't Black escape to g8 after Rh4#?",
        "options": [
          "The king may reach g8, after which White shifts the rook to g4",
          "White's knight on e7 attacks g8",
          "The knight on e7 attacks g6 alone, leaving g8 open for the king"
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
          "ビショップf4がc7キングへ王手しa6ビショップはb8を守る",
          "2枚のビショップはa6から同じ対角線で黒キングを攻撃する"
        ],
        "explanation": "a6のビショップがキングc8に王手し、f4のビショップがb8・c7の逃げ道を押さえる。黒のポーン・ルークもキングの逃げ道をふさぐ。"
      },
      "en": {
        "question": "How do the two bishops cooperate in Ba6#?",
        "options": [
          "The bishop on a6 checks, while the bishop on f4 covers b8 and c7",
          "The bishop on f4 checks the king on c7 while the other guards b8",
          "Both bishops attack the king along the same diagonal starting from a6"
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
          "黒は...b7へポーンを戻せばc8キングの逃げ道を作れる",
          "黒は...Rb8とルークをb8へ動かし白ビショップを遮る",
          "合法な受けはない。チェックメイト"
        ],
        "explanation": "黒キングの逃げ道はビショップの利きと黒自身の駒で塞がれており、王手を防ぐ手はない。"
      },
      "en": {
        "question": "What legal defense does Black have after Ba6#?",
        "options": [
          "Black can move its pawn backward to b7 and create a flight square",
          "Black can interpose the rook with ...Rb8 to obstruct the bishop",
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
          "黒ルークa5は黒キングg8に守られているが取られる",
          "a5の黒ルークに守り駒がなく、この取り方が合法だから",
          "白クイーンはa5のルークを取ると黒キングへ王手できる"
        ],
        "explanation": "黒ルークa5は守られておらず、白クイーンがa1からa5へ進んで取れる。無防備な駒を見つける基本じゃ。"
      },
      "en": {
        "question": "Why can White capture the rook with Qxa5?",
        "options": [
          "The rook on a5 is defended by Black's king on g8 but is still captured",
          "The rook on a5 is undefended and the capture is legal",
          "The queen captures the rook on a5 because the capture also checks Black"
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
          "Qxa5は黒キングへの王手なので...Kh8で回避する必要がある",
          "黒キングは...Kxa5でクイーンを取り返せる位置にいる"
        ],
        "explanation": "Qxa5は王手ではない。黒はたとえば...Kh8と続けられる。駒得と王手を区別しよう。"
      },
      "en": {
        "question": "After Qxa5, is Black's king in check?",
        "options": [
          "No. White captured the rook without giving check",
          "Qxa5 gives check, forcing Black to respond with ...Kh8",
          "Black's king is close enough to recapture the queen with ...Kxa5"
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
          "...Rxf7でe7ルークがf7を守り、e筋を引き続き封鎖する",
          "黒ルークはe7からe8へ動き、白ルークの前進を阻止する",
          "...Rxf7とクイーンを取らせ、e筋の守りからルークをそらす"
        ],
        "explanation": "黒ルークe7がf7でクイーンを取るとe筋が空き、白ルークe1からRe8#が狙える。"
      },
      "en": {
        "question": "What is White trying to induce with Qxf7+?",
        "options": [
          "After ...Rxf7 the rook still blocks the e-file from f7",
          "Black's rook shifts from e7 to e8 to prevent White's rook advancing",
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
          "...Rxf7でルークがf7へ移ったため白はRxe7+で取り返す",
          "黒は...Rxf7で白クイーンを取ったので白にチェックの手はない"
        ],
        "explanation": "黒ルークがe筋を離れたため、白ルークがRe8#で詰ませられる。教材で示したデフレクションの筋じゃ。"
      },
      "en": {
        "question": "If Black replies ...Rxf7 to Qxf7+, what is White's finishing move?",
        "options": [
          "Re8# is checkmate",
          "Because the rook moved to f7, White can recapture with Rxe7+",
          "Black's ...Rxf7 captured the queen and left White no possible checking move"
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
          "黒は...Bxh2+で白クイーンd8を同時に取るので交換が完了する",
          "...Bxh2+は白キングを攻撃しないが次の...Rxd8を先送りする"
        ],
        "explanation": "黒はすぐ...Rxd8でクイーンを取る代わりに、先に...Bxh2+を挟んでh2のポーンを得る。王手のため白は対応を強いられる。"
      },
      "en": {
        "question": "Why is ...Bxh2+ an intermediate move?",
        "options": [
          "It captures the pawn on h2 with check before Black takes the queen on d8",
          "Black's ...Bxh2+ also captures White's queen on d8, completing the trade",
          "...Bxh2+ postpones ...Rxd8 but does not actually give check"
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
          "白キングはKxh2と進み、守られているビショップを取れる",
          "Kh1でキングを逃がす",
          "白はQxd8+と返し王手をかければ自分のキングも守れる"
        ],
        "explanation": "白はKh1しか指せない。h2のビショップはg4のナイトに守られ、Kxh2で取ることはできない。"
      },
      "en": {
        "question": "What is White's legal reply to ...Bxh2+ here?",
        "options": [
          "White can play Kxh2 to capture the defended bishop on h2",
          "Kh1 moves the king away",
          "White can give a countercheck with Qxd8+ to protect its king"
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
          "ナイトe4が黒キングf6と黒ルークa8を同時に攻撃する",
          "キングf6とクイーンd2",
          "ナイトe4はd2クイーンを守り、キングだけに王手する"
        ],
        "explanation": "c3のナイトがe4へ跳ぶと、f6のキングに王手をかけながらd2のクイーンも狙う。"
      },
      "en": {
        "question": "Which black pieces are forked by Ne4+?",
        "options": [
          "The knight on e4 checks the king and attacks the rook on a8",
          "King on f6 and queen on d2",
          "The knight on e4 defends Black's queen on d2 while checking the king"
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
          "黒はクイーンをe3に逃がせばキングへの王手も消せる",
          "黒キングはナイトe4を取れるのでまず...Kxe4と進む",
          "王手を解消すること。たとえば...Ke7"
        ],
        "explanation": "王手を無視してクイーンだけを動かすことはできない。黒はまずキングの安全を確保する必要がある。"
      },
      "en": {
        "question": "What must Black do first after Ne4+?",
        "options": [
          "Black can save its queen with ...Qe3, which also ends the check",
          "The black king can capture the knight directly with ...Kxe4",
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
          "ルークa8は黒キングg8への斜めの利きで王手をかける",
          "ルークがa1からa8まで進む間に黒キングを通過して王手する"
        ],
        "explanation": "ルークはa1からa8まで開いたa筋を進み、到着したa8からg8へ横向きに王手をかける。"
      },
      "en": {
        "question": "Why does Ra8+ check a distant king?",
        "options": [
          "The rook goes up the open a-file, then attacks the king on g8 across rank eight",
          "The rook on a8 gives check diagonally across toward g8",
          "The rook checks by passing across the king during its trip from a1"
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
          "黒キングはf8へ動き8段目の白ルークを取る道を作れる",
          "h7",
          "黒キングはg7のポーンを取ってg7へ進めば王手を避けられる"
        ],
        "explanation": "Ra8+のあと黒の合法な応手は...Kh7だけ。この局面ではf7とg7に黒のポーンがある。"
      },
      "en": {
        "question": "After Ra8+ here, where can Black's king legally escape?",
        "options": [
          "Black can move to f8 and prepare to capture the rook along rank eight",
          "h7",
          "The king can capture its pawn on g7 to escape the rook's check"
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
          "クイーンf7は白キングg1から対角線で直接守られている",
          "白ルークf1は黒キングの王手を受けておりクイーンを守れない",
          "f1の白ルークがf筋を通してクイーンを支えるから"
        ],
        "explanation": "白のルークはf1からf7のクイーンを守っている。クイーンが前へ出るときには味方の支援を確認しよう。"
      },
      "en": {
        "question": "What protects White's queen after Qxf7+?",
        "options": [
          "The queen on f7 is defended directly by White's king along a diagonal",
          "The rook on f1 is pinned by Black's king and cannot defend the queen",
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
          "黒キングは...Kxf7と取れるが白ルークに取られるだけ",
          "黒は...Kg7でf7クイーンの背後へ安全に逃げられる"
        ],
        "explanation": "f7のクイーンはルークに守られており、黒キングは取れない。この局面では...Kh8だけが合法な受けじゃ。"
      },
      "en": {
        "question": "How can Black legally respond to Qxf7+ in this position?",
        "options": [
          "Move the king with ...Kh8",
          "The king may play ...Kxf7 and accept recapture by White's rook",
          "Black can move to g7, slipping behind the white queen on f7"
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
          "d3クイーンを取ると同時に白キングをd6へ誘い出す",
          "黒クイーンd3の捕獲と黒キングd6への王手",
          "黒クイーンを攻撃しながら白ルークをd1のまま守る"
        ],
        "explanation": "白ルークd1がd3のクイーンを取り、そのd筋の先にいるキングd6へ王手をかける。"
      },
      "en": {
        "question": "What two goals does Rxd3+ achieve?",
        "options": [
          "The capture on d3 also lures White's own king toward d6",
          "Capturing Black's queen on d3 and checking the king on d6",
          "The rook attacks Black's queen while remaining on d1 to defend itself"
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
          "黒は白ルークd3をクイーンでQxd3と取り返せる",
          "黒はd7ポーンをd5へ進めればルークの王手を遮れる",
          "黒キングを安全なマスへ動かす。たとえば...Kc7"
        ],
        "explanation": "クイーンを取り返すより前に王手に対応しなければならない。この局面では...Kc7は合法な一例じゃ。"
      },
      "en": {
        "question": "What must Black do after losing the queen to Rxd3+?",
        "options": [
          "Black can recapture White's rook on d3 with its queen using Qxd3",
          "Black can push a pawn from d7 to d5 to block the checking rook",
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

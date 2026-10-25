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
          "黒キングはチェックを受けており、白クイーンを取る手だけが禁じられたから",
          "黒はチェックを受けておらず、合法手もないから",
          "黒キングに合法な手はあるが、同じ局面が3回繰り返されたから"
        ],
        "explanation": "Qf7はチェックではない。黒に合法手がないため、チェックメイトではなくステイルメイトの引き分けじゃ。"
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
          "黒キングは...Kh7と進んでチェックを避けることができる",
          "黒キングは...Kxf6と白クイーンを取ってチェックを消せる",
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
          "c7ルーク自身のチェック",
          "b2ビショップを遮る",
          "ルークが動くとb2のビショップのチェックが開くから"
        ],
        "explanation": "ルークがg7からc7へ動くと、b2のビショップの対角線がh8のキングに通る。これが発見チェックじゃ。"
      },
      "en": {
        "question": "Why can Rxc7+ begin the windmill?",
        "options": [
          "The rook checks on c7",
          "It blocks the bishop",
          "The rook uncovers the bishop’s diagonal check"
        ],
        "explanation": "Moving the rook from g7 to c7 reveals the bishop on b2 checking the king on h8. This is discovered check."
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "黒がRxc7+に...Qc3とクイーンを間に入れてチェックを遮ると、白はどう対応する？",
        "options": [
          "Bxc3+でクイーンを取る",
          "Rxc3+で取る",
          "黒が...Qc3と遮ったあと白はRxc7+で再び発見チェック"
        ],
        "explanation": "...Qc3は発見チェックを遮るが、b2のビショップがBxc3+でクイーンを取れる。風車が続かなくても白の攻めは成立する。"
      },
      "en": {
        "question": "How does White answer ...Qc3 after Rxc7+?",
        "options": [
          "Bxc3+ captures the queen",
          "Capture with Rxc3+",
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
          "黒ルークをg8から追う",
          "Rxg8で逃げ道をふさぎ、Nf7#を可能にするため",
          "黒キングをf8へ戻す"
        ],
        "explanation": "黒ルークがg8でクイーンを取ると、黒キングの逃げ道が自分のルークで埋まり、Nf7#の窒息メイトとなる。"
      },
      "en": {
        "question": "What is the purpose of Qg8+ in the displayed line?",
        "options": [
          "To chase the g8-rook",
          "To induce ...Rxg8, block an escape square and allow Nf7#",
          "To force the king to f8"
        ],
        "explanation": "After ...Rxg8, Black’s own rook blocks g8, letting the knight deliver smothered mate with Nf7#."
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "黒が最初のNf7+に...Rxf7と応じたら？",
        "options": [
          "Qxb7で取る",
          "...Rxf7には白クイーンがg8へ進み、同じ詰みが続く",
          "白はQxf7で黒ルークを取り返せる"
        ],
        "explanation": "...Rxf7にはQxf7。窒息メイトの筋は消えるが、白は黒ルークを取り返して攻めを続けられるぞ。"
      },
      "en": {
        "question": "What if Black answers the first Nf7+ with ...Rxf7?",
        "options": [
          "Capture on b7",
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
          "h8ルークも狙う",
          "d8クイーンを守る"
        ],
        "explanation": "ナイトがf7でキングにチェックをかけ、同時にd8のクイーンも狙う。f8の黒ビショップはそのナイトを取れない。"
      },
      "en": {
        "question": "After Bb3+ Kh8, what does Nf7+ threaten?",
        "options": [
          "A fork of the king and queen on d8",
          "It attacks the rook h8",
          "It defends queen d8"
        ],
        "explanation": "The knight checks the king while attacking the queen on d8. The black bishop on f8 cannot capture that knight."
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "Bb3+に黒が...Qd5とクイーンを間に入れた場合、白の一手は？",
        "options": [
          "Nf7+で攻める",
          "Bxd5+でクイーンを取る",
          "黒が...Qd5とチェックを遮ったらビショップをc4へ戻して守る"
        ],
        "explanation": "白ビショップはb3からd5へ進み、Bxd5+で黒クイーンを取れる。フォークと異なる勝ち筋じゃ。"
      },
      "en": {
        "question": "If Black blocks Bb3+ with ...Qd5, what can White play?",
        "options": [
          "Play Nf7+ first",
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
          "ビショップの利きを遮る",
          "a7ルークを攻撃する",
          "a7の黒ルークからe7の黒ビショップへの守りをふさぐから"
        ],
        "explanation": "c7へ進んだ白ポーンが、a7のルークの横方向の守りを遮る。見えない防御線を見つける練習じゃ。"
      },
      "en": {
        "question": "Why is White’s c7 an interference move?",
        "options": [
          "Blocks the bishop's attack",
          "Directly attacks rook a7",
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
          "c8=Qと昇格",
          "黒の...Bxd6には白はRxd1とルークを後方へ戻して守る"
        ],
        "explanation": "新しい局面ではd1の白ルークがd6まで通っており、...Bxd6にはRxd6でビショップを取り返せる。"
      },
      "en": {
        "question": "How can White respond if Black plays ...Bxd6 after c7?",
        "options": [
          "Rxd6 captures the bishop",
          "Promote with c8=Q",
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
          "a8ルークを狙う",
          "黒キングにチェックをかけながら、c6のクイーンを攻撃するから",
          "c6クイーンを守る"
        ],
        "explanation": "e7のナイトは黒キングg8と黒クイーンc6を同時に狙う。チェックへの対応が先になるのがポイントじゃ。"
      },
      "en": {
        "question": "Why is Ne7+ a knight fork?",
        "options": [
          "It attacks the a8-rook",
          "It checks Black's king while attacking the queen on c6",
          "It protects the c6-queen"
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
          "Nxc6のあと白ナイトはc6で黒キングにチェックをかけ続けるため詰む",
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
          "動くとd1の白ルークがd8の黒キングへチェックをかけるから",
          "c4ポーンのチェック",
          "白ルークを守る手"
        ],
        "explanation": "黒ナイトd5がd筋から離れると、白ルークd1が黒キングd8を直線で攻撃するため、そのナイトは動かせない。"
      },
      "en": {
        "question": "Why is Black's knight on d5 absolutely pinned?",
        "options": [
          "Moving it would expose the king on d8 to the rook on d1",
          "Pawn c4 gives check",
          "Defending White's rook"
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
          "Nc7で逃げる",
          "できない。キングをチェックにさらす移動は違法",
          "黒ナイトはe7へ逃げれば黒キングがルークのチェックを受けずに済む"
        ],
        "explanation": "この局面でd5ナイトを動かすとd筋の白ルークの利きがキングに届く。ピンされた駒の移動は合法ではないぞ。"
      },
      "en": {
        "question": "Can Black move the knight on d5 away from the pawn capture?",
        "options": [
          "Retreat to c7",
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
          "Rxe5で取る",
          "黒キングがd5へ逃げたので白はRe8+とチェックを続ける"
        ],
        "explanation": "キングがe筋から逃げたので、ルークはe8のクイーンを取れる。これが串刺しの収穫じゃ。"
      },
      "en": {
        "question": "If Black answers Re1+ with ...Kd5, what can White do?",
        "options": [
          "Capture the queen with Rxe8",
          "Capture with Rxe5",
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
        "explanation": "黒のポーンがキングの逃げ道を塞いでいるため、8段目のルークのチェックを受けられない。"
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
        "question": "黒がバックランク・メイトを前もって防ぐなら、どんなルフトを作るのが有効？",
        "options": [
          "黒キングはf7の自分のポーンを飛び越えられるので準備は不要",
          "Rd8#とメイトされたあとでも...h6を指せば助かる",
          "事前に...h6でh7を空け、必要ならキングが逃げられるようにする"
        ],
        "explanation": "現局面でRd8#を許すと、黒キングg8の前にはf7・g7・h7の味方ポーンが並び、逃げ道がない。黒が前もって...h6とすればh7が空き、同じRd8+にも...Kh7で逃げられる。チェックメイトされてからでは遅い。"
      },
      "en": {
        "question": "To prevent this back-rank mate in advance, how could Black make luft?",
        "options": [
          "The king can always jump over its own pawn on f7, so no preparation is needed",
          "After being checkmated by Rd8#, Black can still play ...h6",
          "Play ...h6 ahead of time to clear h7 as a possible king escape square"
        ],
        "explanation": "In the shown position Rd8# traps the king behind its own f7, g7 and h7 pawns. If Black had played ...h6 earlier, h7 would be open and ...Kh7 could answer Rd8+. Once checkmated it is too late."
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
          "黒キングへのチェックとh4のビショップへの攻撃を同時に作るから",
          "d4ポーンを守るチェック",
          "h4ビショップを守るチェック"
        ],
        "explanation": "クイーンa4はe8のキングへ斜めにチェックをかけ、h4のビショップへ横から利きを通している。"
      },
      "en": {
        "question": "Why is Qa4+ a double attack?",
        "options": [
          "It checks the king while attacking the bishop on h4",
          "Check and guard d4",
          "Check and guard h4"
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
          "Qxa7で取る",
          "...Kf8のあと白クイーンはQe8+でチェックを続ける",
          "Qxh4でビショップを取れる"
        ],
        "explanation": "黒キングがチェックに対応したあと、白クイーンのh4への利きが残り、Qxh4でビショップを取れる。"
      },
      "en": {
        "question": "After ...Kf8 in reply to Qa4+, what can White capture?",
        "options": [
          "Capture with Qxa7",
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
        "question": "Nc6+が『発見チェック』なのはなぜ？",
        "options": [
          "c6ナイト自身のチェック",
          "ナイトがe筋を離れてe1のルークのチェックを開くから",
          "白ビショップの発見チェック"
        ],
        "explanation": "ナイトe5がc6へ動くと、白ルークe1から黒キングe8への縦の利きが開く。ナイトもd8のクイーンを狙う。"
      },
      "en": {
        "question": "Why is Nc6+ a discovered check?",
        "options": [
          "Knight itself gives check",
          "The knight leaves the e-file and uncovers the rook on e1",
          "A bishop gives the check"
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
        "question": "黒がNc6+に...Qe7でチェックを遮ったら、白は？",
        "options": [
          "Rxe7+でクイーンを取れる",
          "Nxe7で取る",
          "...Qe7に対して白はRxe5でナイトのいた場所を守る"
        ],
        "explanation": "黒がクイーンをe7へ差し込んでも、白ルークがRxe7+でそのクイーンを取れる。この教材で示した...Kf8以外にも対応があるぞ。"
      },
      "en": {
        "question": "If Black blocks Nc6+ with ...Qe7, what can White play?",
        "options": [
          "Rxe7+ captures the queen",
          "Capture via Nxe7",
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
          "Ne7+では白ルークが黒ナイトだけを攻撃しチェックは一つ",
          "ナイトがe7に動くとc1ルークはナイトに遮られチェックが消える",
          "ナイト自身のチェックとc1の白ルークの発見チェックが同時に生じるから"
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
        "question": "黒はNe7+のダブルチェックを駒を間に入れるだけで防げる？",
        "options": [
          "c7に駒を入れて遮る",
          "できない。キングを動かして二つのチェックを同時に避ける",
          "黒はナイトを取れば残ったc1ルークのチェックも遮れる"
        ],
        "explanation": "ダブルチェックでは、一方のチェックだけを遮ってももう一方が残る。この局面ではキングの移動が必要じゃ。"
      },
      "en": {
        "question": "Can Black stop Ne7+ by blocking only the rook's line?",
        "options": [
          "Block on c7",
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
          "白クイーンe6はd7とf7を押さえるが黒キングにはチェックしていない"
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
        "question": "もしf8の黒ルークが盤上になければ、Qe6+のあと黒キングはどこへ逃げられる？",
        "options": [
          "f8。味方ルークがいなければ、そこが逃げ道になる",
          "d8。残った黒ルークがキングを飛び越えさせる",
          "e7。チェック中の白クイーンを黒キングが取れる"
        ],
        "explanation": "本来のQe6#では、黒キングe8の両隣d8・f8を黒自身のルークが塞いでいる。仮にf8のルークがなければ、黒キングは...Kf8と逃げられる。相手の駒が逃げ道をふさぐこと自体がメイトの条件じゃ。"
      },
      "en": {
        "question": "If Black's rook on f8 were absent, where could the king escape after Qe6+?",
        "options": [
          "To f8, which would then be an open escape square",
          "To d8 by jumping over Black's remaining rook",
          "To e7 by capturing the checking queen"
        ],
        "explanation": "In the original Qe6#, Black's own rooks occupy both d8 and f8 beside the king on e8. Without the rook on f8, ...Kf8 would be legal. The blocked escape squares make this mating pattern work."
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
          "ルークがh4へ動くとナイトe7はg6へ移動してチェックを続ける",
          "ルークがh筋でチェックし、e7のナイトがg6・g8の逃げ道を押さえる"
        ],
        "explanation": "ナイトe7がg6・g8への脱出を防ぎ、ルークがh4からキングh7へチェックをかける。"
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
          "g8へ逃げられる",
          "白ナイトe7がg8を利かせているから",
          "ナイトe7はg6のみを守り、g8へのキング移動は可能"
        ],
        "explanation": "ナイトのL字の利きでg8は守られている。ほかの逃げ道も塞がれ、この局面はチェックメイトじゃ。"
      },
      "en": {
        "question": "Why can't Black escape to g8 after Rh4#?",
        "options": [
          "The king can reach g8",
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
          "a6のビショップがチェックし、f4のビショップがb8・c7を押さえる",
          "ビショップf4がc7キングへチェックしa6ビショップはb8を守る",
          "2枚のビショップはa6から同じ対角線で黒キングを攻撃する"
        ],
        "explanation": "a6のビショップがキングc8にチェックし、f4のビショップがb8・c7の逃げ道を押さえる。黒のポーン・ルークもキングの逃げ道をふさぐ。"
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
        "question": "もしf4の白ビショップがいなければ、Ba6+のあと黒キングはどうできる？",
        "options": [
          "a6のビショップはc8へチェックできなくなる",
          "黒キングは自分のd7ポーンを飛び越えてd6へ逃げられる",
          "b8が守られなくなり、...Kb8と逃げられる"
        ],
        "explanation": "Ba6+を指したビショップはc8のキングにチェックする。もう一枚のf4ビショップはb8・c7への逃走を防ぐ。f4のビショップがなければ...Kb8で逃げられ、メイトにならない。"
      },
      "en": {
        "question": "If White's bishop on f4 were absent, what could Black do after Ba6+?",
        "options": [
          "The bishop on a6 could no longer check the king on c8",
          "Black could jump over its own pawn on d7 to escape to d6",
          "The b8 escape would be uncovered, allowing ...Kb8"
        ],
        "explanation": "The bishop that moves to a6 checks the king on c8. White's other bishop on f4 covers b8 and c7. Without that supporting bishop, ...Kb8 would escape and the position would not be mate."
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
          "白クイーンはa5のルークを取ると黒キングへチェックできる"
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
        "question": "a5の黒ルークに守りがないと気づいたら、Qxa5を指す前に何を確かめるべき？",
        "options": [
          "取ったクイーンが反撃で失われないか、黒の駒の利きも確認する",
          "守られていない駒なら、クイーンが取られても必ず駒得になる",
          "Qxa5がチェックでなくても、相手の応手は一切確認しなくてよい"
        ],
        "explanation": "守りのない黒ルークa5はQxa5で取れる。ただしハンギング・ピースを見つけても、取ったクイーンが安全か、相手に反撃がないかを確かめる習慣が大切じゃ。この例では黒に即座の取り返しはない。"
      },
      "en": {
        "question": "Before taking the undefended rook on a5 with Qxa5, what else should White check?",
        "options": [
          "Whether the queen can be recaptured or hit by a tactical counterattack",
          "An undefended piece always yields a gain even if White loses the queen",
          "As long as Qxa5 is not check, Black's possible replies never need to be considered"
        ],
        "explanation": "The rook on a5 is hanging and Qxa5 wins it. Still, check the queen's safety and potential replies before taking a hanging piece. In this example Black has no immediate recapture."
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
          "d8のクイーンを取る前にチェックでh2のポーンを取れるから",
          "黒は...Bxh2+で白クイーンd8を同時に取るので交換が完了する",
          "...Bxh2+は白キングを攻撃しないが次の...Rxd8を先送りする"
        ],
        "explanation": "黒はすぐ...Rxd8でクイーンを取る代わりに、先に...Bxh2+を挟んでh2のポーンを得る。チェックのため白は対応を強いられる。"
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
          "白はQxd8+と返しチェックをかければ自分のキングも守れる"
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
          "ナイトe4はd2クイーンを守り、キングだけにチェックする"
        ],
        "explanation": "c3のナイトがe4へ跳ぶと、f6のキングにチェックをかけながらd2のクイーンも狙う。"
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
          "...Qe3で逃げる",
          "黒キングはナイトe4を取れるのでまず...Kxe4と進む",
          "チェックを解消すること。たとえば...Ke7"
        ],
        "explanation": "チェックを無視してクイーンだけを動かすことはできない。黒はまずキングの安全を確保する必要がある。"
      },
      "en": {
        "question": "What must Black do first after Ne4+?",
        "options": [
          "Save queen with ...Qe3",
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
        "question": "Ra8+で遠くの黒キングにチェックが届くのはなぜ？",
        "options": [
          "a筋を上がったルークの利きが8段目を横に伸びてg8のキングへ届くから",
          "ルークa8は黒キングg8への斜めの利きでチェックをかける",
          "ルークがa1からa8まで進む間に黒キングを通過してチェックする"
        ],
        "explanation": "ルークはa1からa8まで開いたa筋を進み、到着したa8からg8へ横向きにチェックをかける。"
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
          "黒キングはg7のポーンを取ってg7へ進めばチェックを避けられる"
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
          "白キングがf7を守る",
          "f7クイーンの自衛",
          "f1の白ルークがf筋を通してクイーンを支えるから"
        ],
        "explanation": "白のルークはf1からf7のクイーンを守っている。クイーンが前へ出るときには味方の支援を確認しよう。"
      },
      "en": {
        "question": "What protects White's queen after Qxf7+?",
        "options": [
          "White king guards f7",
          "Queen defends itself",
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
          "黒クイーンd3の捕獲と黒キングd6へのチェック",
          "黒クイーンを攻撃しながら白ルークをd1のまま守る"
        ],
        "explanation": "白ルークd1がd3のクイーンを取り、そのd筋の先にいるキングd6へチェックをかける。"
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
          "黒はd7ポーンをd5へ進めればルークのチェックを遮れる",
          "黒キングを安全なマスへ動かす。たとえば...Kc7"
        ],
        "explanation": "クイーンを取り返すより前にチェックに対応しなければならない。この局面では...Kc7は合法な一例じゃ。"
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

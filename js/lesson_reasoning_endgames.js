// Bilingual why-and-defense reasoning for every endgame chapter lesson.
// Loaded after lesson_reasoning.js; existing stored lesson IDs remain unchanged.
// Evidence lines are replayed from the published lesson FEN by regression tests.
const ENDGAME_REASONING = {
  "eg_rook": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Ra8#が詰みになるために、白キングe6はどんな役目を果たす？",
        "options": [
          "白キングe6は8段目を攻撃し、ルークの横の利きを強める",
          "黒キングのd7・e7・f7への逃げ道をふさぐ",
          "白キングe6が黒キングを斜めに押してf8から退かせる"
        ],
        "explanation": "白キングe6が黒キングの前方の逃げ道を押さえ、a8のルークが8段目の王手を担当する。"
      },
      "en": {
        "question": "What does White's king on e6 contribute to Ra8#?",
        "options": [
          "The king on e6 directly attacks every square on Black's eighth rank",
          "It controls the escape squares d7, e7 and f7",
          "The king on e6 forces Black's king to leave f8 by moving diagonally"
        ],
        "explanation": "The king covers the escape squares while the rook gives check along the eighth rank."
      },
      "evidence": {
        "line": [
          "Ra8#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "Ra8#のあと黒はどう受けられる？",
        "options": [
          "黒は...Kd7へ逃げられるが、次にルークが追い詰める",
          "黒は...Kf7と斜めに逃げ、白キングから距離を取れる",
          "合法な応手はない"
        ],
        "explanation": "キングとルークで逃げ道を全部封じた局面なので、黒はすでにチェックメイトじゃ。"
      },
      "en": {
        "question": "How can Black respond after Ra8#?",
        "options": [
          "Black can run to d7, but White's rook would catch it next turn",
          "Black can retreat to f7, moving away from White's approaching king",
          "There is no legal response"
        ],
        "explanation": "The white king and rook cover all escape squares. Ra8# is checkmate."
      },
      "evidence": {
        "line": [
          "Ra8#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "eg_tworooks": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Rb8#のとき、a7の白ルークは何をしている？",
        "options": [
          "7段目のキングの逃げ道を封じている",
          "a7ルークは8段目のb8ルークを守る役割だけを持つ",
          "a7ルークは黒キングのいる8段目を直接攻撃する"
        ],
        "explanation": "a7のルークが7段目を横に押さえ、b8のルークが8段目から王手をかける。階段メイトの役割分担じゃ。"
      },
      "en": {
        "question": "What is White's rook on a7 doing when Rb8# is played?",
        "options": [
          "Sealing the king's escape along rank seven",
          "The rook on a7 only protects the other rook already on b8",
          "The rook on a7 directly gives check along the eighth rank"
        ],
        "explanation": "One rook blocks rank seven while the other checks on rank eight: the ladder mate pattern."
      },
      "evidence": {
        "line": [
          "Rb8#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "このRb8#で黒キングが7段目へ逃げられる？",
        "options": [
          "黒キングは...Kd7へ移れるが、次は白ルークa7に狙われる",
          "逃げられない。a7のルークが7段目を押さえる",
          "黒キングは...Kf7へ出て7段目の白ルークを攻撃できる"
        ],
        "explanation": "a7のルークが7段目を横から攻撃している。黒キングに合法手はなく、詰みになっておる。"
      },
      "en": {
        "question": "Can Black's king escape to rank seven after Rb8#?",
        "options": [
          "Black can move to d7 but will be attacked by the rook on a7 next",
          "No, the rook on a7 controls that rank",
          "Black may escape to f7 and attack the rook on a7 in return"
        ],
        "explanation": "The rook on a7 attacks across rank seven and the other rook gives check. Black has no legal move."
      },
      "evidence": {
        "line": [
          "Rb8#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "eg_queen": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Qg7#の白クイーンを黒キングが取れないのはなぜ？",
        "options": [
          "白キングg6は黒キングを直接王手してクイーンを守る",
          "白クイーンg7はキングに守られず黒キングが取れる",
          "白キングg6がクイーンg7を守っているから"
        ],
        "explanation": "g6の白キングがg7を守っている。隣接して王手するクイーンには支えが必要じゃ。"
      },
      "en": {
        "question": "Why can't Black's king capture the queen after Qg7#?",
        "options": [
          "White's king on g6 is giving check itself, which protects the queen",
          "The queen on g7 is undefended, so Black's king can capture it",
          "White's king on g6 protects the queen on g7"
        ],
        "explanation": "The white king protects g7; the black king cannot capture a defended queen."
      },
      "evidence": {
        "line": [
          "Qg7#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "Qg7#を受けた黒の合法手は？",
        "options": [
          "ない。チェックメイト",
          "黒キングはg7のクイーンを取れるが次の手で白キングが取る",
          "黒キングは...Kh8に逃げられるが白に再び王手される"
        ],
        "explanation": "黒キングは白キングが守るクイーンを取れず、ほかの逃げ道もない。"
      },
      "en": {
        "question": "What legal reply does Black have to Qg7#?",
        "options": [
          "None: checkmate",
          "Black can capture the queen on g7 but would then lose its king",
          "Black can flee to h8 but White's queen will check it again"
        ],
        "explanation": "The queen is defended and Black has no legal escape or block."
      },
      "evidence": {
        "line": [
          "Qg7#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "eg_promote": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "b8=Qの「=Q」は何を意味する？",
        "options": [
          "b8のポーンがクイーンに昇格できるのは次の白番だけ",
          "bポーンが最終段でクイーンに昇格した印",
          "b8=Qは白クイーンがb8に移ってポーンを支える手"
        ],
        "explanation": "白ポーンがb7からb8へ進み、クイーンに昇格する表記じゃ。"
      },
      "en": {
        "question": "What does '=Q' mean in b8=Q?",
        "options": [
          "The pawn on b8 must wait until White's next turn to promote",
          "The pawn reached the last rank and promoted to a queen",
          "The notation means White's existing queen moved to b8 to defend a pawn"
        ],
        "explanation": "The pawn advances from b7 to b8 and becomes a queen on promotion."
      },
      "evidence": {
        "line": [
          "b8=Q"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "このb8=Qの直後、対局はどうなる？",
        "options": [
          "昇格で黒キングはただちに王手を受けるが受けは残る",
          "昇格後のクイーンは同じ手でさらに1マス進むことができる",
          "新しいクイーンができるが、対局は続く"
        ],
        "explanation": "昇格は詰みとは違う。黒キングはg7におり、クイーンとキングで寄せる段階が残っておる。"
      },
      "en": {
        "question": "What happens immediately after b8=Q here?",
        "options": [
          "Promotion immediately gives Black check here, although replies remain",
          "The newly promoted queen may make one additional move in the same turn",
          "White gains a queen, but play continues"
        ],
        "explanation": "Promoting a pawn does not automatically end the game. White must still convert the advantage."
      },
      "evidence": {
        "line": [
          "b8=Q"
        ]
      }
    }
  },
  "eg_opposition": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Kd6から白キングをポーンの前に置く狙いは？",
        "options": [
          "黒キングを押し下げ、eポーンを守って前進させる",
          "Kd6で白キングがe6のポーンの前に立ち、進路を封じる",
          "Kd6で白キングが黒のキングに直接王手をかける"
        ],
        "explanation": "キングを先に進めれば黒キングの行き場を減らし、eポーンを支えて昇格を狙える。"
      },
      "en": {
        "question": "Why does White lead with Kd6 before pushing the e-pawn?",
        "options": [
          "To push back Black's king and support the pawn's advance",
          "The white king on d6 blocks its pawn on e6 and prevents any advance",
          "The white king on d6 directly checks Black's king from a distance"
        ],
        "explanation": "The active king restricts Black's king and escorts the e-pawn toward promotion."
      },
      "evidence": {
        "line": [
          "Kd6",
          "Kd8",
          "e6"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "黒が...Kd8と守ったあと、教材で白はどう続ける？",
        "options": [
          "白はe6を進めるとキングの支えを失い黒が直ちに取れる",
          "e6と進め、キングの支援を受けたポーンを前へ出す",
          "白はKd7と進み黒キングを追いかけてからe6を指す"
        ],
        "explanation": "Kd6 Kd8 のあと、白はe6と進める。ポーンの移動とキングの支援を組み合わせる一例じゃ。"
      },
      "en": {
        "question": "After ...Kd8 in the lesson, how does White continue?",
        "options": [
          "The e6 advance removes king support and allows immediate capture",
          "Play e6, supported by White's king",
          "White follows the black king with Kd7 before trying the e6 advance"
        ],
        "explanation": "After Kd6 ...Kd8, White advances e6 as part of the king-and-pawn escort."
      },
      "evidence": {
        "line": [
          "Kd6",
          "Kd8",
          "e6"
        ]
      }
    }
  },
  "eg_breakthrough": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "白の最初のb6は何を狙った突き捨て？",
        "options": [
          "b6の突き捨てで黒のcポーンを固定し、c筋を閉じたまま勝つ",
          "b6を動かすと白のaポーンが直接b6を守り、交換を避ける",
          "黒ポーンの取り方を誘い、別の白ポーンの突破口を開く"
        ],
        "explanation": "b6を取らせて黒のポーン配置を動かし、続くa6とc6でパスポーンを作る狙いじゃ。"
      },
      "en": {
        "question": "What is White trying to achieve with the pawn sacrifice b6?",
        "options": [
          "The sacrifice fixes Black's c-pawn so that the c-file stays closed",
          "Moving to b6 lets White's a-pawn defend b6 and avoid exchanges",
          "Induce pawn captures to open a breakthrough for another white pawn"
        ],
        "explanation": "b6 tempts Black to capture, changing the pawn structure so another pawn can break through."
      },
      "evidence": {
        "line": [
          "b6",
          "cxb6",
          "a6",
          "bxa6",
          "c6"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "教材の...cxb6 ...bxa6という取り方のあと、白の突破手は？",
        "options": [
          "c6で残ったポーンを走らせる",
          "残るcポーンはc5に留まり、aポーンをa7へ進める",
          "白はb6のポーンをb7へ進めてからcポーンを動かす"
        ],
        "explanation": "bポーンとaポーンを突き捨てた結果、cポーンが前進できる。別の取り方なら同じ手順とは限らないぞ。"
      },
      "en": {
        "question": "After the illustrated ...cxb6 and ...bxa6 captures, what can White play?",
        "options": [
          "Advance the remaining pawn with c6",
          "White keeps the c-pawn on c5 and advances the a-pawn to a7",
          "White advances the sacrificed b-pawn to b7 before touching the c-pawn"
        ],
        "explanation": "The sacrifices clear a route for the c-pawn. Other black capture choices can require a different order."
      },
      "evidence": {
        "line": [
          "b6",
          "cxb6",
          "a6",
          "bxa6",
          "c6"
        ]
      }
    }
  },
  "eg_square": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "この局面でa5を進めると、なぜ黒キングが追いつきにくい？",
        "options": [
          "白ポーンがa5に進むと黒キングは一手でa筋に移れないから",
          "黒キングがポーンの昇格を防ぐ四角形の外にいるから",
          "黒キングは白ポーンの斜め前には入れない規則だから"
        ],
        "explanation": "ポーンa4の進路とa8の昇格マスで考える四角形に、黒キングが間に合わない局面じゃ。"
      },
      "en": {
        "question": "Why is Black's king unable to catch the a-pawn after a5?",
        "options": [
          "After a5, Black's king may not switch to the a-file in one move",
          "Black's king is outside the pawn's rule-of-the-square catchment",
          "A king may never occupy a square diagonally ahead of an enemy pawn"
        ],
        "explanation": "Black's king is outside the relevant square and cannot catch the advancing pawn in this position."
      },
      "evidence": {
        "line": [
          "a5",
          "Ke6",
          "a6"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "黒がa5に...Ke6、続いてa6に...Kd6と追っても白は？",
        "options": [
          "白はキングh1をg2へ動かしてaポーンを守るのが先",
          "白はa6のポーンをa5へ戻し黒キングを遠ざける",
          "a7と前進し、先に昇格を狙う"
        ],
        "explanation": "黒キングは追いかけても間に合わず、白はa7からa8=Qへ進める変化じゃ。"
      },
      "en": {
        "question": "If Black chases with ...Ke6 and ...Kd6, what does White do?",
        "options": [
          "White must move its king from h1 to g2 to escort the pawn first",
          "White withdraws the pawn from a6 to a5 to lure Black's king away",
          "Keep advancing with a7, then aim for a8=Q"
        ],
        "explanation": "In the shown line Black is too far away to stop the pawn's promotion."
      },
      "evidence": {
        "line": [
          "a5",
          "Ke6",
          "a6",
          "Kd6",
          "a7",
          "Kc7",
          "a8=Q"
        ]
      }
    }
  },
  "eg_underpromo": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "e8=N+とナイトに昇格する狙いは？",
        "options": [
          "キングへの王手とd6のクイーンへのフォーク",
          "e8=Q+でもクイーンd6を同じ形でフォークできるから",
          "ナイトe8はg7のキングではなくf6のマスを王手するから"
        ],
        "explanation": "e8のナイトはg7のキングへ王手し、d6のクイーンも攻撃できる。昇格先による利きの違いじゃ。"
      },
      "en": {
        "question": "Why promote to a knight with e8=N+?",
        "options": [
          "To check the king while forking the queen on d6",
          "Promoting to a queen would also fork the queen on d6 in exactly the same way",
          "The new knight checks the square f6 rather than the king on g7"
        ],
        "explanation": "The new knight checks Black's king and attacks the queen on d6 at the same time."
      },
      "evidence": {
        "line": [
          "e8=N+",
          "Kf7",
          "Nxd6+"
        ],
        "terminal": "insufficient"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "ナイトでクイーンを取ったNxd6+のあと、最善同士の結果は？",
        "options": [
          "ナイトがクイーンを取ったので白の勝ちが確定する",
          "ナイトは黒キングを王手中なので次の手で必ず詰む",
          "キング＋ナイト対キングで引き分けになる"
        ],
        "explanation": "クイーンは取れるが、盤上はキング＋ナイト対キング。これだけで詰ませられず引き分けとなる。"
      },
      "en": {
        "question": "After Nxd6+ wins the queen, what is the result of this material?",
        "options": [
          "Capturing the queen guarantees a win because the knight survives",
          "The checking knight must force mate on the next move after Nxd6+",
          "King and knight versus king is drawn for insufficient material"
        ],
        "explanation": "The fork wins the queen but leaves only a king and knight against a king, which cannot deliver checkmate."
      },
      "evidence": {
        "line": [
          "e8=N+",
          "Kf7",
          "Nxd6+"
        ],
        "terminal": "insufficient"
      }
    }
  },
  "eg_connected": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "c7を指した白ポーンは何に守られている？",
        "options": [
          "c7の白ポーンは白キングg1が遠くから守っている",
          "隣のb6の白ポーン",
          "c7のポーンはb7に進んだ白ポーンだけが守れる"
        ],
        "explanation": "b6の白ポーンは斜め前のc7を守っている。連結パスポーンは支え合って前進できるぞ。"
      },
      "en": {
        "question": "What protects White's pawn after c7?",
        "options": [
          "The white king on g1 defends c7 from across the board",
          "The neighboring white pawn on b6",
          "Only a pawn advanced to b7, not one on b6, could defend c7"
        ],
        "explanation": "The pawn on b6 defends c7 diagonally, helping the connected passers advance."
      },
      "evidence": {
        "line": [
          "c7",
          "Kf7",
          "b7"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "この教材で黒キングが...Kf7 ...Ke7と近づいても、白は？",
        "options": [
          "c8=Qと昇格できる",
          "白はc8でナイトに昇格する以外の手を選べない",
          "白はb8=Qと昇格してからcポーンを進める必要がある"
        ],
        "explanation": "黒キングが間に合う前に二枚の白ポーンが進み、cポーンがc8でクイーンになる。"
      },
      "en": {
        "question": "In this line, after Black approaches with ...Kf7 and ...Ke7, what can White do?",
        "options": [
          "Promote with c8=Q",
          "White must choose knight promotion on c8 in this line",
          "White first needs to promote its b-pawn on b8 before advancing c7"
        ],
        "explanation": "The connected pawns advance quickly enough for the c-pawn to promote in the displayed variation."
      },
      "evidence": {
        "line": [
          "c7",
          "Kf7",
          "b7",
          "Ke7",
          "c8=Q"
        ]
      }
    }
  },
  "eg_stalemate": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Qg7#を選ぶ理由は何かな？",
        "options": [
          "Qg7#なら黒キングには合法手が残り、まだ対局が続く",
          "Qg7#は黒キングを王手せず、逃げ道だけを消している",
          "王手をかけて詰ませ、ステイルメイトを避けるため"
        ],
        "explanation": "Qg7#は黒に王手をかけ、合法な応手がないので詰み。王手がないまま合法手を消すと引き分けじゃ。"
      },
      "en": {
        "question": "Why play Qg7# instead of carelessly restricting the king?",
        "options": [
          "With Qg7#, Black still has legal moves and the game continues",
          "The queen on g7 removes all flights without actually giving check",
          "To give checkmate rather than cause stalemate"
        ],
        "explanation": "Qg7# is checkmate. Removing every legal move without giving check would instead result in stalemate."
      },
      "evidence": {
        "line": [
          "Qg7#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "この局面でQg7#の代わりにQg6?を指すとどうなる？",
        "options": [
          "Qg6は黒キングへの王手になり、次に黒はh7へ逃げる",
          "黒は王手を受けておらず合法手もなく、引き分け",
          "Qg6のあと黒は...Kxg6とクイーンを取って対局を続ける"
        ],
        "explanation": "Qg6?では黒キングに王手がなく、合法な手もない。ステイルメイトの落とし穴じゃ。"
      },
      "en": {
        "question": "What happens if White plays Qg6? instead of Qg7# here?",
        "options": [
          "Qg6 checks the king, which may flee to h7 next",
          "Black has no legal moves and is not in check, so the game is drawn",
          "After Qg6 Black can capture the queen with ...Kxg6 and continue"
        ],
        "explanation": "Qg6? is stalemate in this position: the black king has no legal move but is not in check."
      },
      "evidence": {
        "line": [
          "Qg7#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "eg_lucena": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "ルセナの最初のRf4は何のための準備？",
        "options": [
          "Rf4で黒ルークa8の進路を切り、黒キングを直ちに追う",
          "あとでルークをc4などへ動かしてチェックを遮る『橋』を作る",
          "Rf4で白ポーンe7が8段目へ進むマスを守れなくなる"
        ],
        "explanation": "4段目にルークを置くと、あとで黒の横・縦の王手に合駒してキングを守れる。"
      },
      "en": {
        "question": "Why does White start this Lucena example with Rf4?",
        "options": [
          "Rf4 directly cuts off the black rook on a8 and chases the king",
          "To prepare a fourth-rank bridge and interpose the rook against checks",
          "Rf4 removes protection from the promotion square ahead of the pawn on e7"
        ],
        "explanation": "Rf4 places the rook on the fourth rank so it can later shield the king from checks."
      },
      "evidence": {
        "line": [
          "Rf4",
          "Ra1",
          "Kd7",
          "Rd1+",
          "Ke6",
          "Re1+",
          "Kd6",
          "Rd1+",
          "Kc5",
          "Rc1+",
          "Rc4"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "教材の...Rc1+に白がRc4と応じる狙いは？",
        "options": [
          "c筋の王手を合駒で止め、キングでルークを支える",
          "Rc4で黒ルークの王手を避けるため白キングはc6へ移る",
          "Rc4で黒ルークを取らず白キングc5が無防備なまま残る"
        ],
        "explanation": "Rc4でチェックの射線を遮り、キングc5がルークc4を支える。ここでは黒が...Rxc4+と交換する一例が続く。"
      },
      "en": {
        "question": "Why is Rc4 useful against ...Rc1+ in the Lucena line?",
        "options": [
          "It blocks the check while the king supports the rook",
          "Rc4 forces White's king to move to c6 to escape the checking rook",
          "Rc4 blocks the rook but leaves White's king on c5 undefended"
        ],
        "explanation": "Rc4 interposes the rook on the c-file, protected by White's king on c5. The shown reply ...Rxc4+ is one example."
      },
      "evidence": {
        "line": [
          "Rf4",
          "Ra1",
          "Kd7",
          "Rd1+",
          "Ke6",
          "Re1+",
          "Kd6",
          "Rd1+",
          "Kc5",
          "Rc1+",
          "Rc4"
        ]
      }
    }
  },
  "eg_philidor": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "黒番のフィリドール局面で...Ra6とする狙いは？",
        "options": [
          "...Ra6で黒ルークが白のe6ポーンをすぐ横から取れる",
          "...Ra6で白キングが6段目へ進みやすいよう場所を空ける",
          "黒ルークで6段目を押さえ、白キングの前進を防ぐ"
        ],
        "explanation": "黒ルークをa6へ置いて6段目を横に守り、白キングが前へ出にくい形を作る。"
      },
      "en": {
        "question": "Why does Black play ...Ra6 in this Philidor position?",
        "options": [
          "...Ra6 lets the rook immediately capture White's pawn on e6",
          "...Ra6 clears rank six to make it easier for White's king to enter",
          "To use the rook to guard the sixth rank and restrict White's king"
        ],
        "explanation": "The defending rook controls the sixth rank and limits the attacking king's advance."
      },
      "evidence": {
        "line": [
          "Ra6",
          "e6",
          "Ra1"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "教材で白がe6と進めたあと、黒はどんな守備に切り替える？",
        "options": [
          "...Ra1で黒は後方へ戻るが、次の王手はあえて避ける",
          "...Ra1と後方へ回り、チェックを続ける",
          "...Ra1は黒のルークを受け身にし、白キングの前進を許す"
        ],
        "explanation": "白ポーンが6段目へ来たら黒ルークを後方へ回して王手をかける。これはフィリドールの引き分けを保つ考え方じゃ。"
      },
      "en": {
        "question": "After White plays e6 in this example, how does Black defend?",
        "options": [
          "...Ra1 retreats the rook specifically to avoid giving any further checks",
          "Retreat with ...Ra1 and give checks from behind",
          "...Ra1 makes the rook passive and permits White's king to advance freely"
        ],
        "explanation": "Once the pawn advances to the sixth rank, Black switches to rear checks with the rook, a standard drawing idea."
      },
      "evidence": {
        "line": [
          "Ra6",
          "e6",
          "Ra1",
          "Kg6",
          "Rg1+"
        ]
      }
    }
  },
  "eg_wrongbishop": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "白がビショップとhポーンを持っていても勝てない理由は？",
        "options": [
          "白ビショップはh8の昇格マスの色を攻撃できないから",
          "白ビショップはh7の白ポーンを守れないので直ちに負ける",
          "h8への昇格には白キングが必ずh8へ先に入る必要がある"
        ],
        "explanation": "hポーンの昇格マスh8は黒マスだが、白のビショップは白マスしか利かない。黒キングが隅を守れば引き分けを狙える。"
      },
      "en": {
        "question": "Why can't White force a win with bishop and h-pawn here?",
        "options": [
          "The bishop cannot control the color of h8, the promotion square",
          "The bishop cannot protect White's pawn on h7, causing an immediate loss",
          "White's king must first occupy h8 before the pawn is allowed to promote"
        ],
        "explanation": "The h-pawn promotes on the dark square h8, which the light-squared bishop cannot control. The defending king can hold the corner."
      },
      "evidence": {
        "line": [
          "Kg6",
          "Kg8",
          "h7+",
          "Kh8",
          "Kh6"
        ],
        "terminal": "stalemate"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "教材の最後のKh6のあと、黒キングが動けないのに引き分けとなるのは？",
        "options": [
          "最後のKh6のあと黒には...Kg8と...Kh7の逃げ道が残る",
          "Kh6で白キングが黒へ王手し、黒は合駒を選べない",
          "黒は王手を受けておらず合法手もない、ステイルメイトだから"
        ],
        "explanation": "黒キングはh8でチェックされていないのに動く手がないため、ステイルメイトとなる。"
      },
      "en": {
        "question": "After Kh6, why is the result a draw despite Black having no legal move?",
        "options": [
          "After Kh6, Black still has the escapes ...Kg8 and ...Kh7",
          "Kh6 gives check and Black simply has no piece to interpose",
          "Black is not in check and has no legal move: stalemate"
        ],
        "explanation": "The black king is not in check on h8 and has no legal move, so the game ends in stalemate."
      },
      "evidence": {
        "line": [
          "Kg6",
          "Kg8",
          "h7+",
          "Kh8",
          "Kh6"
        ],
        "terminal": "stalemate"
      }
    }
  },
  "eg_triangulation": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Ke5→Kd4→Kd5の『三角法』で狙うのは？",
        "options": [
          "キングを三角形に回し、黒キングが一手多く指せるようにする",
          "ポーンを動かさず、同じ駒配置に黒番で戻す",
          "白キングをd5に置く前に白ポーンをc6へ進める準備"
        ],
        "explanation": "キングで三角形の経路を進み、開始時と同じ配置でも手番を黒へ渡す。ツークツワンクを作る準備じゃ。"
      },
      "en": {
        "question": "What is the point of Ke5–Kd4–Kd5 triangulation?",
        "options": [
          "The triangular walk lets Black's king gain an extra free move",
          "To return to the same piece placement with Black to move, without moving a pawn",
          "The maneuver advances the c-pawn before White's king reaches d5"
        ],
        "explanation": "The king makes a triangular maneuver that transfers the move to Black while preserving the piece placement."
      },
      "evidence": {
        "line": [
          "Ke5",
          "Kc6",
          "Kd4",
          "Kd7",
          "Kd5"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "開始局面ですぐc6+とポーンを進めると、教材によれば黒は？",
        "options": [
          "...Kc8で引き分けへ持ち込める",
          "黒キングは...Kc8ではなく...Kd8で白ポーンを取れる",
          "...Kc8と指されると白はc7から必ず次に昇格できる"
        ],
        "explanation": "即c6+は...Kc8で引き分け。キングの手番調整には意味があり、単純にポーンを押せばよいわけではない。"
      },
      "en": {
        "question": "What can Black do against an immediate c6+ in the initial triangulation position?",
        "options": [
          "Reply ...Kc8 to reach a draw",
          "Black can capture the white pawn immediately with ...Kd8 instead of ...Kc8",
          "After ...Kc8, White's pawn is guaranteed to promote on its very next move"
        ],
        "explanation": "The immediate c6+ allows ...Kc8 and a draw under best play in this position; the king maneuver changes the timing."
      },
      "evidence": {
        "line": [
          "Ke5",
          "Kc6",
          "Kd4",
          "Kd7",
          "Kd5"
        ]
      }
    }
  },
  "eg_passadvance": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "a7と進めた白ポーンが強い理由は？",
        "options": [
          "a7で黒キングへの王手が生じ黒は昇格に応じられない",
          "a7のポーンが黒キングh8を直接攻撃して動けなくする",
          "次にa8へ進めば昇格でき、黒キングは遠くて止めにくいから"
        ],
        "explanation": "a7まで進んだ通過ポーンはあと一歩で昇格。黒キングh8は遠くにいる。"
      },
      "en": {
        "question": "Why is the move a7 powerful here?",
        "options": [
          "Playing a7 checks the distant king and prevents a reply to promotion",
          "The pawn on a7 directly attacks the black king on h8 and immobilizes it",
          "It threatens promotion on a8 while Black's king is far away"
        ],
        "explanation": "The passed pawn on a7 is one step from promotion, beyond the distant black king's reach in this position."
      },
      "evidence": {
        "line": [
          "a7",
          "Kh7",
          "a8=Q"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "教材の...Kh7のあとa8=Qと昇格すると、黒キングに王手はかかる？",
        "options": [
          "a8=Qは黒キングh7へ横から王手をかけている",
          "この配置では王手ではないが、白クイーンができる",
          "a8=Qはチェックメイトで黒に合法な受けがない"
        ],
        "explanation": "a8=Qで白はクイーンを得るが、黒キングh7には王手をかけていない。昇格と王手は別のことじゃ。"
      },
      "en": {
        "question": "Does a8=Q give check after ...Kh7 in this example?",
        "options": [
          "Promotion on a8 checks Black's king on h7 along the eighth rank",
          "No, but White gets a queen",
          "The promotion is checkmate, leaving Black no legal response"
        ],
        "explanation": "The pawn promotes on a8, but the new queen does not give check to the black king on h7."
      },
      "evidence": {
        "line": [
          "a7",
          "Kh7",
          "a8=Q"
        ]
      }
    }
  },
  "eg_activeking": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "終盤でKd4と白キングを中央へ動かす意味は？",
        "options": [
          "キングもポーンを支えたり重要なマスを押さえたりできるから",
          "Kd4で白キングを中央に置けば相手キングは以後動けない",
          "Kd4で自分のポーンを守る力がなくなるのが主な狙い"
        ],
        "explanation": "終盤ではキングを活動させる価値が高い。e3からd4へ進めるのはその一例じゃ。"
      },
      "en": {
        "question": "Why activate White's king with Kd4 in an endgame?",
        "options": [
          "The king can support pawns and control important squares",
          "Centralizing with Kd4 stops the opposing king from ever moving again",
          "The purpose of Kd4 is to give up protection of White's pawns"
        ],
        "explanation": "An active king can support pawns and control squares in the endgame. Kd4 illustrates this principle."
      },
      "evidence": {
        "line": [
          "Kd4"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "このKd4は、それだけで白の強制勝ちを示す？",
        "options": [
          "Kd4のあと黒キングが動けないため即引き分けが確定する",
          "Kd4で白は黒キングに必ず王手をかけ、逃げ道を奪う",
          "いいえ。安全なキング活動の一例で、勝ちの証明ではない"
        ],
        "explanation": "キングを中央へ動かすのは有用だが、その一手だけで勝敗は確定しない。"
      },
      "en": {
        "question": "Does this single Kd4 move prove a forced win?",
        "options": [
          "Kd4 immediately creates stalemate because Black cannot move",
          "Kd4 necessarily gives check and removes all of Black's escape squares",
          "No, it illustrates safe king activity, not a forced win"
        ],
        "explanation": "Centralizing the king is useful, but the lesson does not establish a forced win from this move alone."
      },
      "evidence": {
        "line": [
          "Kd4"
        ]
      }
    }
  },
  "eg_rookbehind": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Ra1で白ルークをaポーンの後ろへ置く狙いは？",
        "options": [
          "Ra1でルークを通過ポーンの前に置き道をふさぐ",
          "aポーンの前進路を空け、後ろから支えやすくする",
          "Ra1からすぐa7の黒ルークを取れるよう位置を合わせる"
        ],
        "explanation": "ルークa1はa6の白ポーンより後ろに位置し、ポーンの進路をふさがない。"
      },
      "en": {
        "question": "Why move the rook behind the passed pawn with Ra1?",
        "options": [
          "Ra1 places the rook ahead of the pawn to block its forward route",
          "To leave the pawn's path open while supporting it from behind",
          "From a1 the rook can immediately capture Black's rook on a7"
        ],
        "explanation": "The rook on a1 sits behind the a6-pawn, supporting its advance without blocking the path."
      },
      "evidence": {
        "line": [
          "Ra1"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "このRa1は、どの終盤でも必ず唯一の最善手？",
        "options": [
          "いいえ。通過ポーンの後ろは有力な形だが、局面次第",
          "通過ポーンがある限りルークは必ずその前に置く必要がある",
          "Ra1のような後方配置は強いが、黒が王手ならすべて不合法"
        ],
        "explanation": "ルークを通過ポーンの後方に置く原則は有用だが、最善手かどうかは具体的な局面で変わる。"
      },
      "en": {
        "question": "Is Ra1 always the only best move in every rook ending?",
        "options": [
          "No. Behind the passer is often useful, but it depends on the position",
          "A rook must always be placed in front of a passed pawn, without exception",
          "Putting a rook behind a passer is illegal whenever the opponent can give check"
        ],
        "explanation": "Rooks often work well behind passed pawns, but optimal placement depends on the position."
      },
      "evidence": {
        "line": [
          "Ra1"
        ]
      }
    }
  },
  "eg_kingescort": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Kd5で白キングがe4ポーンを支えられるのはなぜ？",
        "options": [
          "d5のキングはe4ポーンに近いが、斜めには守れない",
          "キングがd5へ出るとe4ポーンの進路を直接ふさぐ",
          "d5から斜め隣のe4を守るから"
        ],
        "explanation": "d5のキングは斜め隣のe4を守る。ポーン終盤ではキングの支援が重要じゃ。"
      },
      "en": {
        "question": "Why does the king on d5 still support the pawn on e4?",
        "options": [
          "The king on d5 is near e4 but kings cannot defend diagonally",
          "Moving the king to d5 directly blocks its pawn on e4 from advancing",
          "The king on d5 guards e4 diagonally"
        ],
        "explanation": "The king on d5 controls adjacent e4, where White's pawn stands."
      },
      "evidence": {
        "line": [
          "Kd5"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "この教材のKd5だけで、白の勝利が確定したと考えてよい？",
        "options": [
          "白キングd5は黒のキングを一手で必ず追い出して勝つ",
          "いいえ。ポーンを守る一手の例示で、強制勝ちは主張していない",
          "ポーンを守れているので黒のすべての応手は違法になる"
        ],
        "explanation": "Kd5はキングの支えを示す教材で、全合法応手に対して白の勝ちを証明した手順ではない。"
      },
      "en": {
        "question": "Does Kd5 alone prove a forced win for White?",
        "options": [
          "White's king on d5 can always drive Black's king away in one move",
          "No, it demonstrates king support without claiming a forced win",
          "Protecting the pawn makes every possible black response illegal"
        ],
        "explanation": "This move shows king support, but the example is not a proof of a forced victory."
      },
      "evidence": {
        "line": [
          "Kd5"
        ]
      }
    }
  }
};
Object.assign(LESSON_REASONING, ENDGAME_REASONING);

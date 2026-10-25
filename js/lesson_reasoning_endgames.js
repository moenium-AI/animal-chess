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
          "ルークのように縦へ王手する",
          "黒キングのd7・e7・f7への逃げ道をふさぐ",
          "黒ルークを取る"
        ],
        "explanation": "白キングe6が黒キングの前方の逃げ道を押さえ、a8のルークが8段目の王手を担当する。"
      },
      "en": {
        "question": "What does White's king on e6 contribute to Ra8#?",
        "options": [
          "It checks like a rook along a file",
          "It controls the escape squares d7, e7 and f7",
          "It captures a black rook"
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
          "...Kd7で逃げる",
          "...Kf8で逃げる",
          "合法な応手はない"
        ],
        "explanation": "キングとルークで逃げ道を全部封じた局面なので、黒はすでにチェックメイトじゃ。"
      },
      "en": {
        "question": "How can Black respond after Ra8#?",
        "options": [
          "Escape with ...Kd7",
          "Escape with ...Kf8",
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
          "黒キングを直接取っている",
          "b8の白ルークを昇格させる"
        ],
        "explanation": "a7のルークが7段目を横に押さえ、b8のルークが8段目から王手をかける。階段メイトの役割分担じゃ。"
      },
      "en": {
        "question": "What is White's rook on a7 doing when Rb8# is played?",
        "options": [
          "Sealing the king's escape along rank seven",
          "Capturing Black's king directly",
          "Promoting the rook on b8"
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
          "...Kd7なら逃げられる",
          "逃げられない。a7のルークが7段目を押さえる",
          "...Kf7だけは逃げられる"
        ],
        "explanation": "a7のルークが7段目を横から攻撃している。黒キングに合法手はなく、詰みになっておる。"
      },
      "en": {
        "question": "Can Black's king escape to rank seven after Rb8#?",
        "options": [
          "Yes, with ...Kd7",
          "No, the rook on a7 controls that rank",
          "Only ...Kf7 escapes"
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
          "キングはクイーンを取れない規則だから",
          "黒ポーンがg7にいるから",
          "白キングg6がクイーンg7を守っているから"
        ],
        "explanation": "g6の白キングがg7を守っている。隣接して王手するクイーンには支えが必要じゃ。"
      },
      "en": {
        "question": "Why can't Black's king capture the queen after Qg7#?",
        "options": [
          "Kings are never allowed to capture queens",
          "A black pawn occupies g7",
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
          "...Kxg7でクイーンを取る",
          "...Kh8で逃げる"
        ],
        "explanation": "黒キングは白キングが守るクイーンを取れず、ほかの逃げ道もない。"
      },
      "en": {
        "question": "What legal reply does Black have to Qg7#?",
        "options": [
          "None: checkmate",
          "...Kxg7 captures the queen",
          "...Kh8 escapes"
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
          "b8で王手をかけた印",
          "bポーンが最終段でクイーンに昇格した印",
          "クイーンを取った印"
        ],
        "explanation": "白ポーンがb7からb8へ進み、クイーンに昇格する表記じゃ。"
      },
      "en": {
        "question": "What does '=Q' mean in b8=Q?",
        "options": [
          "It means check on b8",
          "The pawn reached the last rank and promoted to a queen",
          "It means a queen was captured"
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
          "昇格したので即チェックメイト",
          "白のポーンが全部戻る",
          "新しいクイーンができるが、対局は続く"
        ],
        "explanation": "昇格は詰みとは違う。黒キングはg7におり、クイーンとキングで寄せる段階が残っておる。"
      },
      "en": {
        "question": "What happens immediately after b8=Q here?",
        "options": [
          "Promotion automatically checkmates",
          "White's pawns return to their starting squares",
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
          "自分のキングを昇格させる",
          "e5のポーンを捨てて引き分けにする"
        ],
        "explanation": "キングを先に進めれば黒キングの行き場を減らし、eポーンを支えて昇格を狙える。"
      },
      "en": {
        "question": "Why does White lead with Kd6 before pushing the e-pawn?",
        "options": [
          "To push back Black's king and support the pawn's advance",
          "To promote the king",
          "To sacrifice the pawn and draw"
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
          "e5のポーンをe4へ戻す",
          "e6と進め、キングの支援を受けたポーンを前へ出す",
          "キングを盤の外へ逃がす"
        ],
        "explanation": "Kd6 Kd8 のあと、白はe6と進める。ポーンの移動とキングの支援を組み合わせる一例じゃ。"
      },
      "en": {
        "question": "After ...Kd8 in the lesson, how does White continue?",
        "options": [
          "Move the e-pawn backwards to e4",
          "Play e6, supported by White's king",
          "Move White's king off the board"
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
          "即座にキングへ王手をかける",
          "黒ポーンをすべて守る",
          "黒ポーンの取り方を誘い、別の白ポーンの突破口を開く"
        ],
        "explanation": "b6を取らせて黒のポーン配置を動かし、続くa6とc6でパスポーンを作る狙いじゃ。"
      },
      "en": {
        "question": "What is White trying to achieve with the pawn sacrifice b6?",
        "options": [
          "Check the king immediately",
          "Protect all of Black's pawns",
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
          "aポーンをa1へ戻す",
          "白キングで黒キングを取る"
        ],
        "explanation": "bポーンとaポーンを突き捨てた結果、cポーンが前進できる。別の取り方なら同じ手順とは限らないぞ。"
      },
      "en": {
        "question": "After the illustrated ...cxb6 and ...bxa6 captures, what can White play?",
        "options": [
          "Advance the remaining pawn with c6",
          "Move the a-pawn backward to a1",
          "Capture Black's king with White's king"
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
          "白キングが黒キングに王手をしているから",
          "黒キングがポーンの昇格を防ぐ四角形の外にいるから",
          "aポーンがナイトになるから"
        ],
        "explanation": "ポーンa4の進路とa8の昇格マスで考える四角形に、黒キングが間に合わない局面じゃ。"
      },
      "en": {
        "question": "Why is Black's king unable to catch the a-pawn after a5?",
        "options": [
          "White's king is checking Black",
          "Black's king is outside the pawn's rule-of-the-square catchment",
          "The pawn turns into a knight"
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
          "aポーンをa4へ戻す",
          "白キングを昇格させる",
          "a7と前進し、先に昇格を狙う"
        ],
        "explanation": "黒キングは追いかけても間に合わず、白はa7からa8=Qへ進める変化じゃ。"
      },
      "en": {
        "question": "If Black chases with ...Ke6 and ...Kd6, what does White do?",
        "options": [
          "Move the a-pawn back to a4",
          "Promote White's king",
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
          "黒ポーンをただちに昇格させる",
          "白キングをe8へ動かす"
        ],
        "explanation": "e8のナイトはg7のキングへ王手し、d6のクイーンも攻撃できる。昇格先による利きの違いじゃ。"
      },
      "en": {
        "question": "Why promote to a knight with e8=N+?",
        "options": [
          "To check the king while forking the queen on d6",
          "To promote a black pawn immediately",
          "To move White's king to e8"
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
          "白の勝ちが確定する",
          "黒の一手詰めになる",
          "キング＋ナイト対キングで引き分けになる"
        ],
        "explanation": "クイーンは取れるが、盤上はキング＋ナイト対キング。これだけで詰ませられず引き分けとなる。"
      },
      "en": {
        "question": "After Nxd6+ wins the queen, what is the result of this material?",
        "options": [
          "White is guaranteed to win",
          "Black has mate in one",
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
          "黒キングg8",
          "隣のb6の白ポーン",
          "白キングg1の王手"
        ],
        "explanation": "b6の白ポーンは斜め前のc7を守っている。連結パスポーンは支え合って前進できるぞ。"
      },
      "en": {
        "question": "What protects White's pawn after c7?",
        "options": [
          "The black king on g8",
          "The neighboring white pawn on b6",
          "A check by the white king on g1"
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
          "bポーンをb5へ戻す",
          "c7のポーンを黒キングに渡す"
        ],
        "explanation": "黒キングが間に合う前に二枚の白ポーンが進み、cポーンがc8でクイーンになる。"
      },
      "en": {
        "question": "In this line, after Black approaches with ...Kf7 and ...Ke7, what can White do?",
        "options": [
          "Promote with c8=Q",
          "Retreat the b-pawn to b5",
          "Give the pawn on c7 to Black's king"
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
          "黒に好きなだけ合法手を残すため",
          "白クイーンを取らせるため",
          "王手をかけて詰ませ、ステイルメイトを避けるため"
        ],
        "explanation": "Qg7#は黒に王手をかけ、合法な応手がないので詰み。王手がないまま合法手を消すと引き分けじゃ。"
      },
      "en": {
        "question": "Why play Qg7# instead of carelessly restricting the king?",
        "options": [
          "To leave Black unlimited legal moves",
          "To let Black capture the queen",
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
          "黒が白クイーンを取って勝つ",
          "黒は王手を受けておらず合法手もなく、引き分け",
          "即座に黒のチェックメイト"
        ],
        "explanation": "Qg6?では黒キングに王手がなく、合法な手もない。ステイルメイトの落とし穴じゃ。"
      },
      "en": {
        "question": "What happens if White plays Qg6? instead of Qg7# here?",
        "options": [
          "Black captures the queen and wins",
          "Black has no legal moves and is not in check, so the game is drawn",
          "Black immediately checkmates White"
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
          "ただちに黒ルークを取る",
          "あとでルークをc4などへ動かしてチェックを遮る『橋』を作る",
          "白ポーンをe6へ戻す"
        ],
        "explanation": "4段目にルークを置くと、あとで黒の横・縦の王手に合駒してキングを守れる。"
      },
      "en": {
        "question": "Why does White start this Lucena example with Rf4?",
        "options": [
          "To capture Black's rook immediately",
          "To prepare a fourth-rank bridge and interpose the rook against checks",
          "To move the e-pawn backwards to e6"
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
          "黒キングをその場で取る",
          "ポーンを昇格前のe6へ戻す"
        ],
        "explanation": "Rc4でチェックの射線を遮り、キングc5がルークc4を支える。ここでは黒が...Rxc4+と交換する一例が続く。"
      },
      "en": {
        "question": "Why is Rc4 useful against ...Rc1+ in the Lucena line?",
        "options": [
          "It blocks the check while the king supports the rook",
          "It captures Black's king immediately",
          "It moves the pawn backwards to e6"
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
          "白のポーンを即クイーンに昇格させる",
          "黒キングをa6に移す",
          "黒ルークで6段目を押さえ、白キングの前進を防ぐ"
        ],
        "explanation": "黒ルークをa6へ置いて6段目を横に守り、白キングが前へ出にくい形を作る。"
      },
      "en": {
        "question": "Why does Black play ...Ra6 in this Philidor position?",
        "options": [
          "To promote White's pawn immediately",
          "To move the black king to a6",
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
          "すぐに黒ポーンを昇格させる",
          "...Ra1と後方へ回り、チェックを続ける",
          "ルークを投げ捨てて投了する"
        ],
        "explanation": "白ポーンが6段目へ来たら黒ルークを後方へ回して王手をかける。これはフィリドールの引き分けを保つ考え方じゃ。"
      },
      "en": {
        "question": "After White plays e6 in this example, how does Black defend?",
        "options": [
          "Promote a black pawn at once",
          "Retreat with ...Ra1 and give checks from behind",
          "Sacrifice the rook and resign"
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
          "白ビショップがキングより強すぎるから",
          "黒キングがポーンを2枚持つから"
        ],
        "explanation": "hポーンの昇格マスh8は黒マスだが、白のビショップは白マスしか利かない。黒キングが隅を守れば引き分けを狙える。"
      },
      "en": {
        "question": "Why can't White force a win with bishop and h-pawn here?",
        "options": [
          "The bishop cannot control the color of h8, the promotion square",
          "White's bishop is too strong",
          "Black has two pawns"
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
          "黒はまだ王手を受けているから",
          "ポーンがクイーンへ昇格したから",
          "黒は王手を受けておらず合法手もない、ステイルメイトだから"
        ],
        "explanation": "黒キングはh8でチェックされていないのに動く手がないため、ステイルメイトとなる。"
      },
      "en": {
        "question": "After Kh6, why is the result a draw despite Black having no legal move?",
        "options": [
          "Black remains in check",
          "The pawn has promoted",
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
          "キングを昇格させる",
          "ポーンを動かさず、同じ駒配置に黒番で戻す",
          "白ポーンを必ず取らせる"
        ],
        "explanation": "キングで三角形の経路を進み、開始時と同じ配置でも手番を黒へ渡す。ツークツワンクを作る準備じゃ。"
      },
      "en": {
        "question": "What is the point of Ke5–Kd4–Kd5 triangulation?",
        "options": [
          "To promote the king",
          "To return to the same piece placement with Black to move, without moving a pawn",
          "To force White's pawn to be captured"
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
          "即座にチェックメイトされる",
          "白のcポーンをその場で昇格させる"
        ],
        "explanation": "即c6+は...Kc8で引き分け。キングの手番調整には意味があり、単純にポーンを押せばよいわけではない。"
      },
      "en": {
        "question": "What can Black do against an immediate c6+ in the initial triangulation position?",
        "options": [
          "Reply ...Kc8 to reach a draw",
          "Get checkmated immediately",
          "Promote White's c-pawn on the spot"
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
          "黒のクイーンが取れるから",
          "白キングがa7のポーンを取るから",
          "次にa8へ進めば昇格でき、黒キングは遠くて止めにくいから"
        ],
        "explanation": "a7まで進んだ通過ポーンはあと一歩で昇格。黒キングh8は遠くにいる。"
      },
      "en": {
        "question": "Why is the move a7 powerful here?",
        "options": [
          "It immediately captures a black queen",
          "White's king captures the pawn on a7",
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
          "必ずチェックメイトになる",
          "この配置では王手ではないが、白クイーンができる",
          "白は昇格できずポーンが消える"
        ],
        "explanation": "a8=Qで白はクイーンを得るが、黒キングh7には王手をかけていない。昇格と王手は別のことじゃ。"
      },
      "en": {
        "question": "Does a8=Q give check after ...Kh7 in this example?",
        "options": [
          "It is always checkmate",
          "No, but White gets a queen",
          "The pawn vanishes without promoting"
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
          "キングをクイーンに変えるから",
          "必ずその一手で詰みになるから"
        ],
        "explanation": "終盤ではキングを活動させる価値が高い。e3からd4へ進めるのはその一例じゃ。"
      },
      "en": {
        "question": "Why activate White's king with Kd4 in an endgame?",
        "options": [
          "The king can support pawns and control important squares",
          "The king becomes a queen",
          "It always delivers immediate checkmate"
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
          "必ずチェックメイトになる",
          "黒キングを取る",
          "いいえ。安全なキング活動の一例で、勝ちの証明ではない"
        ],
        "explanation": "キングを中央へ動かすのは有用だが、その一手だけで勝敗は確定しない。"
      },
      "en": {
        "question": "Does this single Kd4 move prove a forced win?",
        "options": [
          "It always checkmates",
          "It captures Black's king",
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
          "白ポーンの行き先をふさぐ",
          "aポーンの前進路を空け、後ろから支えやすくする",
          "黒キングを即チェックメイトする"
        ],
        "explanation": "ルークa1はa6の白ポーンより後ろに位置し、ポーンの進路をふさがない。"
      },
      "en": {
        "question": "Why move the rook behind the passed pawn with Ra1?",
        "options": [
          "To block the pawn's way",
          "To leave the pawn's path open while supporting it from behind",
          "To deliver immediate checkmate"
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
          "はい。例外はない",
          "ルークをポーンの前に置くことはいつでも違法"
        ],
        "explanation": "ルークを通過ポーンの後方に置く原則は有用だが、最善手かどうかは具体的な局面で変わる。"
      },
      "en": {
        "question": "Is Ra1 always the only best move in every rook ending?",
        "options": [
          "No. Behind the passer is often useful, but it depends on the position",
          "Yes, without exception",
          "Putting a rook in front of a pawn is always illegal"
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
          "白キングが黒キングを直接取るから",
          "e4ポーンが白キングに昇格するから",
          "d5から斜め隣のe4を守るから"
        ],
        "explanation": "d5のキングは斜め隣のe4を守る。ポーン終盤ではキングの支援が重要じゃ。"
      },
      "en": {
        "question": "Why does the king on d5 still support the pawn on e4?",
        "options": [
          "It captures Black's king directly",
          "The pawn promotes into a king",
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
          "黒キングは必ず投了する",
          "いいえ。ポーンを守る一手の例示で、強制勝ちは主張していない",
          "ポーンはすぐ取られて白が負ける"
        ],
        "explanation": "Kd5はキングの支えを示す教材で、全合法応手に対して白の勝ちを証明した手順ではない。"
      },
      "en": {
        "question": "Does Kd5 alone prove a forced win for White?",
        "options": [
          "Black must resign",
          "No, it demonstrates king support without claiming a forced win",
          "The pawn is immediately lost and White loses"
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

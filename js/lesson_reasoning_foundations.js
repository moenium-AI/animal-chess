// Two bilingual why-and-response questions for the 12 remaining basics and 10 principles.
// Loaded after existing reasoning catalogs; prior IDs and saved answers are preserved.
const FOUNDATION_REASONING = {
  "bk_board": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "e4というマス名の意味は？",
        "options": [
          "e列の2段目",
          "e列の4段目",
          "4列のe段目"
        ],
        "explanation": "英字は列、数字は段。e4はe列の4段目じゃ。"
      },
      "en": {
        "question": "What is square e4?",
        "options": [
          "File e, rank 2",
          "File e, rank 4",
          "File 4, rank e"
        ],
        "explanation": "File letters a–h come before rank numbers 1–8."
      },
      "evidence": {
        "line": [
          "e4"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "初期配置からe4へ2マス進めるのは？",
        "options": [
          "後ろへも進めるから",
          "相手の駒を飛び越えるから",
          "最初のポーンの手で、途中も空いているから"
        ],
        "explanation": "e2のポーンは最初だけe3とe4が空なら2マス進める。"
      },
      "en": {
        "question": "Why may the e-pawn initially advance to e4?",
        "options": [
          "It may move backwards",
          "It can jump enemy pieces",
          "It is the first pawn move and both squares are clear"
        ],
        "explanation": "A pawn can make a two-square first move along a clear file."
      },
      "evidence": {
        "line": [
          "e4"
        ]
      }
    }
  },
  "bk_pawn": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "d2のポーンがd4まで進めるのは？",
        "options": [
          "いつでも2マス進めるから",
          "斜めに相手の駒があるから",
          "初回の手でd3・d4が空いているから"
        ],
        "explanation": "ポーンの2マス前進は初期位置からの最初の手だけ。"
      },
      "en": {
        "question": "Why can the pawn advance from d2 to d4?",
        "options": [
          "It can always advance two",
          "It captures diagonally",
          "It is the pawn's first move and d3 and d4 are clear"
        ],
        "explanation": "The initial two-square pawn move requires a clear path."
      },
      "evidence": {
        "line": [
          "d4"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "d4のポーンはd2へ戻れる？",
        "options": [
          "いいえ、ポーンは後退できない",
          "はい、最初だけ戻れる",
          "d2に相手の駒があれば戻れる"
        ],
        "explanation": "ポーンは後ろに進めない。"
      },
      "en": {
        "question": "Can the d4-pawn retreat to d2?",
        "options": [
          "No, pawns cannot move backward",
          "Yes, once",
          "Yes, to capture a piece there"
        ],
        "explanation": "Pawns cannot retreat."
      },
      "evidence": {
        "line": [
          "d4"
        ]
      }
    }
  },
  "bk_rook": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Ra8+でルークはどう動く？",
        "options": [
          "a筋を縦に進む",
          "斜めに進む",
          "L字に跳ぶ"
        ],
        "explanation": "ルークは縦横へ直進する。a2からa8は同じ筋じゃ。"
      },
      "en": {
        "question": "How does the rook travel in Ra8+?",
        "options": [
          "Along the a-file",
          "Diagonally",
          "In an L jump"
        ],
        "explanation": "Rooks move along files and ranks."
      },
      "evidence": {
        "line": [
          "Ra8+"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "Ra8+の「+」は何を表す？",
        "options": [
          "昇格",
          "黒キングe8への王手",
          "必ずチェックメイト"
        ],
        "explanation": "a8のルークが8段目のキングに王手している。"
      },
      "en": {
        "question": "What does '+' mean in Ra8+?",
        "options": [
          "Promotion",
          "Check on the king at e8",
          "Guaranteed checkmate"
        ],
        "explanation": "The rook on a8 checks along the eighth rank."
      },
      "evidence": {
        "line": [
          "Ra8+"
        ]
      }
    }
  },
  "bk_bishop": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "e4で白ビショップf1の道が開くのは？",
        "options": [
          "ポーンがビショップになるから",
          "e2ポーンが動いて対角線が空くから",
          "ビショップが駒を飛び越すから"
        ],
        "explanation": "e2が空いたのでf1のビショップはe2・d3を通りc4へ進める。"
      },
      "en": {
        "question": "Why does e4 free the f1-bishop?",
        "options": [
          "The pawn becomes a bishop",
          "The e2-pawn vacates the diagonal",
          "The bishop jumps over pawns"
        ],
        "explanation": "The move clears the diagonal from f1."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Bc4"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "Bc4はどのように移動する手？",
        "options": [
          "横へ3マス",
          "縦へ2マス",
          "f1から空いた対角線をc4へ進む"
        ],
        "explanation": "ビショップは斜めへ進み、駒は飛び越せない。"
      },
      "en": {
        "question": "How does Bc4 travel from f1?",
        "options": [
          "Three squares sideways",
          "Two squares vertically",
          "Along the clear diagonal to c4"
        ],
        "explanation": "A bishop slides diagonally without jumping."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Bc4"
        ]
      }
    }
  },
  "bk_knight": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Nf3でg1のナイトはどう移動する？",
        "options": [
          "同じ筋を直進",
          "斜めに3マス",
          "縦2・横1のL字"
        ],
        "explanation": "ナイトはL字に跳ぶ。"
      },
      "en": {
        "question": "How does a knight move from g1 to f3?",
        "options": [
          "Along a file",
          "Three diagonal squares",
          "An L: two squares one way and one across"
        ],
        "explanation": "Knights use an L-shaped move."
      },
      "evidence": {
        "line": [
          "Nf3"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "初期配置でもNf3が可能なのは？",
        "options": [
          "ナイトは途中の駒を飛び越えられるから",
          "味方のポーンを取るから",
          "キングがすでに王手だから"
        ],
        "explanation": "ナイトは途中の駒に邪魔されず跳べる。"
      },
      "en": {
        "question": "Why can Nf3 be played in the initial position?",
        "options": [
          "Knights can jump over pieces",
          "It captures its own pawn",
          "Black is already in check"
        ],
        "explanation": "Knights may jump over occupied intervening squares."
      },
      "evidence": {
        "line": [
          "Nf3"
        ]
      }
    }
  },
  "bk_queen": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Qe2+でクイーンがa2からe2に行けるのは？",
        "options": [
          "L字に跳ぶから",
          "2段目を横に進めるから",
          "前に一歩だけ動くから"
        ],
        "explanation": "クイーンは縦横斜めの空いた線を進む。"
      },
      "en": {
        "question": "Why is the queen move from a2 to e2 legal?",
        "options": [
          "Queens jump in an L",
          "Queens travel along an open rank",
          "Queens only move one square"
        ],
        "explanation": "Queens slide along unobstructed ranks, files and diagonals."
      },
      "evidence": {
        "line": [
          "Qe2+"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "Qe2+が王手になる理由は？",
        "options": [
          "黒キングがクイーンを取れるから",
          "a8を攻撃するから",
          "e筋を通して黒キングe8を攻撃するから"
        ],
        "explanation": "e2からe8への線が空いている。"
      },
      "en": {
        "question": "Why does Qe2+ check Black?",
        "options": [
          "The king can capture it",
          "The queen attacks a8",
          "It attacks the king along the e-file"
        ],
        "explanation": "The queen on e2 checks the king on e8."
      },
      "evidence": {
        "line": [
          "Qe2+"
        ]
      }
    }
  },
  "bk_king": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Kd2でe1のキングは何マス進む？",
        "options": [
          "斜め隣へ1マス",
          "縦に3マス",
          "ナイトのL字"
        ],
        "explanation": "キングは隣のマスへ1歩進む。"
      },
      "en": {
        "question": "How does the king move in Kd2?",
        "options": [
          "One diagonally adjacent square",
          "Three squares up",
          "An L jump"
        ],
        "explanation": "Kings move one square at a time."
      },
      "evidence": {
        "line": [
          "Kd2"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "キングがd2へ行く前に確認するのは？",
        "options": [
          "黒ポーンをすべて取ったか",
          "白クイーンがあるか",
          "d2が敵の利きに入っていないか"
        ],
        "explanation": "キングは王手になるマスへ動けない。"
      },
      "en": {
        "question": "What must be checked before Kd2?",
        "options": [
          "All black pawns captured",
          "White queen exists",
          "d2 is not attacked by Black"
        ],
        "explanation": "A king may never move into check."
      },
      "evidence": {
        "line": [
          "Kd2"
        ]
      }
    }
  },
  "bk_capture": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "exd5でポーンがd5を取れるのは？",
        "options": [
          "まっすぐ前へ取るから",
          "斜め前の敵駒を取れるから",
          "後退して取るから"
        ],
        "explanation": "ポーンは移動は前、捕獲は斜め前じゃ。"
      },
      "en": {
        "question": "Why is exd5 a legal pawn capture?",
        "options": [
          "Pawns capture straight",
          "Pawns capture diagonally forward",
          "Pawns capture backward"
        ],
        "explanation": "A pawn captures diagonally forward."
      },
      "evidence": {
        "line": [
          "exd5"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "exd5のあとd5にいるのは？",
        "options": [
          "白ポーン。黒ポーンは取られた",
          "黒ポーンのまま",
          "両方のポーン"
        ],
        "explanation": "白ポーンがd5へ進み、黒ポーンは取り除かれる。"
      },
      "en": {
        "question": "What occupies d5 after exd5?",
        "options": [
          "A white pawn; the black pawn is gone",
          "Still the black pawn",
          "Both pawns"
        ],
        "explanation": "The capturing pawn replaces the captured pawn."
      },
      "evidence": {
        "line": [
          "exd5"
        ]
      }
    }
  },
  "bk_check": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Re2+が王手になる理由は？",
        "options": [
          "ルークが斜めに跳ぶから",
          "白キングがe8へ行くから",
          "ルークe2が同じe筋の黒キングを攻撃するから"
        ],
        "explanation": "ルークe2からe8への縦の利きで王手になる。"
      },
      "en": {
        "question": "Why does Re2+ give check?",
        "options": [
          "The rook jumps diagonally",
          "White's king moves to e8",
          "The rook attacks Black's king along the e-file"
        ],
        "explanation": "The rook gives check up the e-file."
      },
      "evidence": {
        "line": [
          "Re2+"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "王手を受けた黒が必ずすべきことは？",
        "options": [
          "王手を無視してポーンを進める",
          "合法手で王手を解消する",
          "白キングを直接取る"
        ],
        "explanation": "王手を放置する手は違法じゃ。"
      },
      "en": {
        "question": "What must Black do when in check?",
        "options": [
          "Ignore the check",
          "Make a legal move resolving the check",
          "Capture the white king"
        ],
        "explanation": "The next move must remove check."
      },
      "evidence": {
        "line": [
          "Re2+"
        ]
      }
    }
  },
  "bk_mate": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Qh4#の「#」が意味するのは？",
        "options": [
          "王手を回避できないチェックメイト",
          "昇格",
          "ルークの交換"
        ],
        "explanation": "黒クイーンの王手を白は合法的に防げない。"
      },
      "en": {
        "question": "What does the '#' in Qh4# mean?",
        "options": [
          "Checkmate with no legal escape",
          "Promotion",
          "Rook exchange"
        ],
        "explanation": "White cannot legally escape the queen's check."
      },
      "evidence": {
        "line": [
          "f3",
          "e5",
          "g4",
          "Qh4#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "白のf3・g4が危険だったのは？",
        "options": [
          "すでにキングを囲えていたから",
          "キング周りのポーンを動かしQh4#を許したから",
          "黒キングがe4に来たから"
        ],
        "explanation": "f・gポーンを進めるとキングの対角線が弱くなる。"
      },
      "en": {
        "question": "Why were f3 and g4 dangerous?",
        "options": [
          "They safely castled",
          "They exposed king-side diagonals and Qh4#",
          "Black's king reached e4"
        ],
        "explanation": "Early pawn moves left White's king exposed."
      },
      "evidence": {
        "line": [
          "f3",
          "e5",
          "g4",
          "Qh4#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "bk_promotion": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "a8=Q+の「=Q」が表すのは？",
        "options": [
          "ポーン捕獲",
          "クイーンの移動",
          "aポーンがクイーンに昇格"
        ],
        "explanation": "8段目でポーンがクイーンに変わる。"
      },
      "en": {
        "question": "What does '=Q' signify in a8=Q+?",
        "options": [
          "Capture",
          "Queen move",
          "Promotion of the a-pawn to a queen"
        ],
        "explanation": "The pawn promotes upon reaching rank eight."
      },
      "evidence": {
        "line": [
          "a8=Q+"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "a8=Q+の「+」は？",
        "options": [
          "対局終了の印",
          "昇格したクイーンによる王手",
          "ポーンを2枚取った印"
        ],
        "explanation": "新しいクイーンが8段目の黒キングe8へ王手する。"
      },
      "en": {
        "question": "What does '+' signify after a8=Q?",
        "options": [
          "Game over",
          "The promoted queen gives check",
          "Two pawns captured"
        ],
        "explanation": "Promotion gives check here but not necessarily mate."
      },
      "evidence": {
        "line": [
          "a8=Q+"
        ]
      }
    }
  },
  "bk_enpassant": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "黒の...d5直後にexd6ができるのは？",
        "options": [
          "黒ポーンがd6に止まるから",
          "黒がd7からd5へ2マス進み白のe5ポーンの隣に来たから",
          "白ポーンが後退するから"
        ],
        "explanation": "直前の2マス前進だけに使えるアンパッサンじゃ。"
      },
      "en": {
        "question": "Why may White play exd6 just after ...d5?",
        "options": [
          "Black stopped on d6",
          "Black's pawn moved two squares next to White's e5-pawn",
          "White retreats"
        ],
        "explanation": "En passant is allowed immediately after the adjacent double pawn move."
      },
      "evidence": {
        "line": [
          "d5",
          "exd6"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "アンパッサンexd6のあと黒ポーンd5は？",
        "options": [
          "d5に残る",
          "d6で昇格する",
          "d5から取り除かれ白ポーンがd6へ着く"
        ],
        "explanation": "通常の斜め捕獲と異なり、捕まる黒ポーンはd5にいた。"
      },
      "en": {
        "question": "Where is the black pawn after exd6 en passant?",
        "options": [
          "Still on d5",
          "Promoted on d6",
          "Removed from d5 while White reaches d6"
        ],
        "explanation": "En passant captures the pawn from its passed square."
      },
      "evidence": {
        "line": [
          "d5",
          "exd6"
        ]
      }
    }
  },
  "pr_center": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "e4・d4で中央を占める狙いは？",
        "options": [
          "ナイトをすべて禁止",
          "空間を作り駒の働きを助ける",
          "自動キャスリング"
        ],
        "explanation": "中央を支配すると駒の活動範囲を広げやすい。"
      },
      "en": {
        "question": "Why play e4 and d4 in the center?",
        "options": [
          "Ban all knights",
          "Gain space and help piece activity",
          "Castle automatically"
        ],
        "explanation": "Central pawns claim space for active pieces."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "d4"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "d4に黒が...exd4と取ったら？",
        "options": [
          "白キングをe4へ",
          "白クイーンを捨てる",
          "Nxd4で取り返せる"
        ],
        "explanation": "f3ナイトがd4の黒ポーンを取れる。"
      },
      "en": {
        "question": "After ...exd4, what can White play?",
        "options": [
          "Ke4",
          "Sacrifice the queen",
          "Nxd4 to recapture"
        ],
        "explanation": "The f3-knight can recapture on d4."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "d4",
          "exd4",
          "Nxd4"
        ]
      }
    }
  },
  "pr_develop": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "Nf3が展開と攻撃を兼ねるのは？",
        "options": [
          "g1ナイトをf3へ出しe5を攻撃するから",
          "キャスリングも同時にするから",
          "ナイトが昇格するから"
        ],
        "explanation": "駒を出しながら相手の中央ポーンへ圧力をかける。"
      },
      "en": {
        "question": "Why is Nf3 both development and attack?",
        "options": [
          "It moves the knight to f3 and attacks e5",
          "It castles simultaneously",
          "The knight promotes"
        ],
        "explanation": "Developing the knight creates pressure on e5."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "黒はNf3にどう対応してe5を守れる？",
        "options": [
          "...Qh4#で必ず詰ませる",
          "...Nc6で守りつつ展開する",
          "黒キングでe5を取る"
        ],
        "explanation": "ナイトc6がe5を守る。"
      },
      "en": {
        "question": "How can Black defend e5 after Nf3?",
        "options": [
          "Guaranteed ...Qh4#",
          "Develop ...Nc6 to protect e5",
          "Capture e5 with the king"
        ],
        "explanation": "Black can develop a defender on c6."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6"
        ]
      }
    }
  },
  "pr_defend": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "...Nc6がe5の黒ポーンを守るのは？",
        "options": [
          "黒キングを取るから",
          "ナイトがまっすぐ進むから",
          "c6ナイトがe5を利かせるから"
        ],
        "explanation": "c6のナイトはe5へL字の利きがある。"
      },
      "en": {
        "question": "Why does ...Nc6 protect e5?",
        "options": [
          "It captures its king",
          "Knights move straight",
          "The knight on c6 guards e5"
        ],
        "explanation": "Knights defend squares they attack."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "...Nc6の守備以外の利点は？",
        "options": [
          "b8ナイトを展開できる",
          "黒クイーンが昇格する",
          "キングがワープする"
        ],
        "explanation": "駒を守るのと展開するのを同時にできる。"
      },
      "en": {
        "question": "What else does ...Nc6 accomplish?",
        "options": [
          "Develops the b8 knight",
          "Promotes the queen",
          "Teleports the king"
        ],
        "explanation": "It combines defense with development."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6"
        ]
      }
    }
  },
  "pr_castle": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "白がO-Oできる準備が整ったのは？",
        "options": [
          "キングがg1にいたから",
          "ナイトとビショップを出しf1・g1が空いたから",
          "黒を詰ませたから"
        ],
        "explanation": "f1・g1の道が空き、キャスリングできる。"
      },
      "en": {
        "question": "Why can White castle O-O here?",
        "options": [
          "The king started on g1",
          "Knight and bishop cleared f1 and g1",
          "White delivered mate"
        ],
        "explanation": "Kingside development cleared the route."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "Bc4",
          "Bc5",
          "O-O"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "O-Oでh1ルークはどこへ？",
        "options": [
          "d1",
          "g1",
          "f1"
        ],
        "explanation": "キングはg1、ルークはf1に移る。"
      },
      "en": {
        "question": "Where does the h1-rook go after O-O?",
        "options": [
          "d1",
          "g1",
          "f1"
        ],
        "explanation": "The rook moves from h1 to f1."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "Bc4",
          "Bc5",
          "O-O"
        ]
      }
    }
  },
  "pr_open": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "exd5のようなポーン交換の狙いは？",
        "options": [
          "中央の形を変えてラインを開く",
          "自動的に詰み",
          "全ポーンが昇格"
        ],
        "explanation": "交換後に駒の通り道が開くことがある。"
      },
      "en": {
        "question": "Why exchange central pawns with exd5?",
        "options": [
          "Change the structure and open lines",
          "Automatic mate",
          "Promote every pawn"
        ],
        "explanation": "Pawn exchanges can open routes for pieces."
      },
      "evidence": {
        "line": [
          "e4",
          "d5",
          "exd5"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "exd5のあと黒が...Qxd5と取れるのは？",
        "options": [
          "キングを取れるから",
          "d8クイーンがd筋を進み白ポーンを取れるから",
          "ナイトのように跳ぶから"
        ],
        "explanation": "ポーンを取っても黒が取り返せる。"
      },
      "en": {
        "question": "Why is ...Qxd5 legal after exd5?",
        "options": [
          "It captures the king",
          "The d8-queen takes the pawn along the d-file",
          "The queen jumps like a knight"
        ],
        "explanation": "Black's queen can recapture on d5."
      },
      "evidence": {
        "line": [
          "e4",
          "d5",
          "exd5",
          "Qxd5"
        ]
      }
    }
  },
  "pr_pin": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "Bg5でf6ナイトの後ろにある価値の高い駒は？",
        "options": [
          "黒キングe8",
          "黒クイーンd8",
          "白ルークa1"
        ],
        "explanation": "ナイトはd8のクイーンへ対する相対ピン。キングのピンとは違う。"
      },
      "en": {
        "question": "Which piece is behind the knight pinned by Bg5?",
        "options": [
          "Black king e8",
          "Black queen d8",
          "White rook a1"
        ],
        "explanation": "It is a relative pin to the queen, not the king."
      },
      "evidence": {
        "line": [
          "d4",
          "d5",
          "c4",
          "e6",
          "Nc3",
          "Nf6",
          "Bg5"
        ]
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "黒が...Be7と指す意味は？",
        "options": [
          "ビショップを展開しナイトとクイーンの間へ置く",
          "キングでビショップを取る",
          "ナイトが昇格する"
        ],
        "explanation": "e7にビショップを置き、ピンを和らげる。"
      },
      "en": {
        "question": "What does ...Be7 do against Bg5?",
        "options": [
          "Develop a bishop between knight and queen",
          "King captures bishop",
          "Knight promotes"
        ],
        "explanation": "The bishop on e7 interrupts the diagonal behind the knight."
      },
      "evidence": {
        "line": [
          "d4",
          "d5",
          "c4",
          "e6",
          "Nc3",
          "Nf6",
          "Bg5",
          "Be7"
        ]
      }
    }
  },
  "pr_fork": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "フォーク（二股）とは？",
        "options": [
          "2枚の駒を一度に動かす",
          "必ずチェックメイト",
          "一つの駒が複数の相手の駒を同時に攻撃"
        ],
        "explanation": "ナイトが得意な複数目標への攻撃じゃ。"
      },
      "en": {
        "question": "What is a fork?",
        "options": [
          "Moving two pieces at once",
          "Always checkmate",
          "One piece attacking multiple enemy targets"
        ],
        "explanation": "Forks attack two or more targets."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "この教材のNf3はフォーク？",
        "options": [
          "キングとクイーンのフォーク",
          "いいえ。e5を攻撃するがフォークではない",
          "ルーク2枚のフォーク"
        ],
        "explanation": "単なる攻撃とフォークは違う。"
      },
      "en": {
        "question": "Is Nf3 already a fork here?",
        "options": [
          "Fork of king and queen",
          "No, it attacks e5 but not multiple targets",
          "Fork of both rooks"
        ],
        "explanation": "This move attacks the e5-pawn but is not yet a fork."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6"
        ]
      }
    }
  },
  "pr_trade": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "exd5ですぐ駒得とは言えないのは？",
        "options": [
          "黒が...Qxd5で取り返せるから",
          "自動キャスリングだから",
          "キングが逃げるから"
        ],
        "explanation": "交換の続きまで確認しよう。"
      },
      "en": {
        "question": "Why doesn't exd5 immediately gain material?",
        "options": [
          "Black can recapture with ...Qxd5",
          "It castles",
          "The king escapes"
        ],
        "explanation": "Check recaptures before claiming a gain."
      },
      "evidence": {
        "line": [
          "e4",
          "d5",
          "exd5",
          "Qxd5"
        ]
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "...Qxd5のあと白のNc3は？",
        "options": [
          "すぐ詰ませる",
          "ポーンを昇格",
          "ナイトを展開しd5のクイーンを攻撃"
        ],
        "explanation": "黒クイーンに当てながら展開する手じゃ。"
      },
      "en": {
        "question": "What is the idea of Nc3 after ...Qxd5?",
        "options": [
          "Immediate mate",
          "Promotion",
          "Develop while attacking the queen on d5"
        ],
        "explanation": "The knight develops with a threat against the queen."
      },
      "evidence": {
        "line": [
          "e4",
          "d5",
          "exd5",
          "Qxd5",
          "Nc3"
        ]
      }
    }
  },
  "pr_threat": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "白のf3・g4が危険なのは？",
        "options": [
          "ナイトが強くなるから",
          "キング周辺の守りを弱めQh4#を許すから",
          "ルークが跳べるから"
        ],
        "explanation": "次の王手・詰みを読まないと危険じゃ。"
      },
      "en": {
        "question": "Why are White's f3 and g4 risky?",
        "options": [
          "They empower knights",
          "They expose the king and allow Qh4#",
          "Rooks can jump"
        ],
        "explanation": "The pawn moves leave White vulnerable to mate."
      },
      "evidence": {
        "line": [
          "f3",
          "e5",
          "g4",
          "Qh4#"
        ],
        "terminal": "checkmate"
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "g4の直後、黒の詰みの手は？",
        "options": [
          "...Qh4#",
          "...O-O-O#",
          "...Nxa1"
        ],
        "explanation": "黒クイーンがh4へ出てチェックメイト。"
      },
      "en": {
        "question": "What checkmate does Black have after g4?",
        "options": [
          "...Qh4#",
          "...O-O-O#",
          "...Nxa1"
        ],
        "explanation": "The black queen moves to h4 to deliver mate."
      },
      "evidence": {
        "line": [
          "f3",
          "e5",
          "g4",
          "Qh4#"
        ],
        "terminal": "checkmate"
      }
    }
  },
  "pr_plan": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "Bc4が次の計画に役立つのは？",
        "options": [
          "キングが同時に移動",
          "クイーンがキングを取る",
          "ビショップを出してキャスリングの道を開ける"
        ],
        "explanation": "ナイトとビショップを出せばO-Oの準備が整う。"
      },
      "en": {
        "question": "Why is Bc4 a useful move in White's plan?",
        "options": [
          "Moves the king",
          "Queen captures the king",
          "Develops a bishop and clears castling path"
        ],
        "explanation": "Developing the bishop clears f1 for castling."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "Bc4"
        ]
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "黒が...Bc5と指したあと、白のキングを守る手は？",
        "options": [
          "白キングをe8へ",
          "O-Oとキャスリング",
          "白ルークをh8へ"
        ],
        "explanation": "白はf1・g1が空いており、O-Oできる。"
      },
      "en": {
        "question": "How can White improve king safety after ...Bc5?",
        "options": [
          "Move king to e8",
          "Castle O-O",
          "Jump rook to h8"
        ],
        "explanation": "Castling kingside is legal in the illustrated position."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "Bc4",
          "Bc5",
          "O-O"
        ]
      }
    }
  }
};
Object.assign(LESSON_REASONING, FOUNDATION_REASONING);

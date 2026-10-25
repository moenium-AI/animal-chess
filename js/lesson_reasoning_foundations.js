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
          "白から数えた4番目の縦の列を指す記号"
        ],
        "explanation": "英字は列、数字は段。e4はe列の4段目じゃ。"
      },
      "en": {
        "question": "What is square e4?",
        "options": [
          "File e, rank 2",
          "File e, rank 4",
          "The fourth file counted from White's left side"
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
          "e3を飛び越すから",
          "e3へ進んだあと続けてもう一手指せるから",
          "最初のポーンの手で、途中も空いているから"
        ],
        "explanation": "e2のポーンは最初だけe3とe4が空なら2マス進める。"
      },
      "en": {
        "question": "Why may the e-pawn initially advance to e4?",
        "options": [
          "By jumping over e3",
          "The pawn makes a second move immediately after reaching e3",
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
          "d3の駒を取るから",
          "d4が安全なら途中のd3が埋まっていてもよいから",
          "初回の手でd3・d4が空いているから"
        ],
        "explanation": "ポーンの2マス前進は初期位置からの最初の手だけ。"
      },
      "en": {
        "question": "Why can the pawn advance from d2 to d4?",
        "options": [
          "To capture on d3",
          "The pawn may pass through an occupied d3 as long as d4 is free",
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
          "d3へは戻れる",
          "白ポーンは斜め後ろのc3なら取って戻れる"
        ],
        "explanation": "ポーンは後ろに進めない。"
      },
      "en": {
        "question": "Can the d4-pawn retreat to d2?",
        "options": [
          "No, pawns cannot move backward",
          "It may retreat to d3",
          "A white pawn can move back diagonally to capture on c3"
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
          "a筋を斜めに",
          "a2からa8へ斜めのマスを順に渡って進む"
        ],
        "explanation": "ルークは縦横へ直進する。a2からa8は同じ筋じゃ。"
      },
      "en": {
        "question": "How does the rook travel in Ra8+?",
        "options": [
          "Along the a-file",
          "Diagonally up file a",
          "It follows a diagonal path of clear squares from a2 to a8"
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
          "黒キングに詰み",
          "黒キングe8への王手",
          "ルークが黒キングのいるマスまで進めることを示す印"
        ],
        "explanation": "a8のルークが8段目のキングに王手している。"
      },
      "en": {
        "question": "What does '+' mean in Ra8+?",
        "options": [
          "Black is checkmated",
          "Check on the king at e8",
          "It indicates the rook may move directly onto the king's square"
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
          "e4ポーンがf1を守る",
          "e2ポーンが動いて対角線が空くから",
          "f1のビショップとe2の白ポーンが場所を交換するため"
        ],
        "explanation": "e2が空いたのでf1のビショップはe2・d3を通りc4へ進める。"
      },
      "en": {
        "question": "Why does e4 free the f1-bishop?",
        "options": [
          "The e4-pawn defends f1",
          "The e2-pawn vacates the diagonal",
          "The bishop and its own pawn on e2 are allowed to trade places"
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
          "e2ポーンを飛び越す",
          "f1からc4へは途中の駒を一度だけ跳び越せる",
          "f1から空いた対角線をc4へ進む"
        ],
        "explanation": "ビショップは斜めへ進み、駒は飛び越せない。"
      },
      "en": {
        "question": "How does Bc4 travel from f1?",
        "options": [
          "Jump over the e2-pawn",
          "A bishop may jump over one intervening piece on its first move",
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
          "縦1・横2の直進",
          "g1からf2を通過してそのままf3へ進む",
          "縦2・横1のL字"
        ],
        "explanation": "ナイトはL字に跳ぶ。"
      },
      "en": {
        "question": "How does a knight move from g1 to f3?",
        "options": [
          "One square straight",
          "It passes through f2 before taking one more step to f3",
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
          "f2ポーンを取って進む",
          "ナイトは自分の駒のいるマスに着地してもよいから"
        ],
        "explanation": "ナイトは途中の駒に邪魔されず跳べる。"
      },
      "en": {
        "question": "Why can Nf3 be played in the initial position?",
        "options": [
          "Knights can jump over pieces",
          "Capture the f2-pawn first",
          "The knight may land on squares occupied by friendly pieces"
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
          "a2からe2へ斜め移動",
          "2段目を横に進めるから",
          "a2からe2の間に白の駒がいても通り抜けられるから"
        ],
        "explanation": "クイーンは縦横斜めの空いた線を進む。"
      },
      "en": {
        "question": "Why is the queen move from a2 to e2 legal?",
        "options": [
          "A diagonal move to e2",
          "Queens travel along an open rank",
          "It may cross occupied squares on the second rank without stopping"
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
          "f3方向への斜め王手",
          "e2のクイーンがd1の白キングを守ること自体が王手だから",
          "e筋を通して黒キングe8を攻撃するから"
        ],
        "explanation": "e2からe8への線が空いている。"
      },
      "en": {
        "question": "Why does Qe2+ check Black?",
        "options": [
          "Check along the f3 diagonal",
          "Protecting White's own king from e2 is itself counted as a check",
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
          "d1を経由して進む",
          "キングがe1からd2へ移るには途中に駒が必要"
        ],
        "explanation": "キングは隣のマスへ1歩進む。"
      },
      "en": {
        "question": "How does the king move in Kd2?",
        "options": [
          "One diagonally adjacent square",
          "Via d1 and then d2",
          "A king can reach d2 only by passing through an occupied square"
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
          "d2を味方が守るか",
          "d2から次の手に敵のクイーンを取れるかどうか",
          "d2が敵の利きに入っていないか"
        ],
        "explanation": "キングは王手になるマスへ動けない。"
      },
      "en": {
        "question": "What must be checked before Kd2?",
        "options": [
          "If a friend guards d2",
          "Whether moving to d2 creates an attack on the enemy queen next turn",
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
          "d5が空でも取れる",
          "斜め前の敵駒を取れるから",
          "e4のポーンがd5の駒を飛び越えてd6の駒を取るから"
        ],
        "explanation": "ポーンは移動は前、捕獲は斜め前じゃ。"
      },
      "en": {
        "question": "Why is exd5 a legal pawn capture?",
        "options": [
          "Capture an empty d5",
          "Pawns capture diagonally forward",
          "The pawn on e4 jumps over d5 to capture an enemy piece on d6"
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
          "白ポーンはe4に残る",
          "白のポーンがd5へ移り、黒のポーンはe4へ戻る"
        ],
        "explanation": "白ポーンがd5へ進み、黒ポーンは取り除かれる。"
      },
      "en": {
        "question": "What occupies d5 after exd5?",
        "options": [
          "A white pawn; the black pawn is gone",
          "White stays on e4",
          "White's pawn reaches d5 and Black's pawn is moved back to e4"
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
          "e2から斜めに王手",
          "ルークe2が同じ2段目から黒キングe8を横に狙うから",
          "ルークe2が同じe筋の黒キングを攻撃するから"
        ],
        "explanation": "ルークe2からe8への縦の利きで王手になる。"
      },
      "en": {
        "question": "Why does Re2+ give check?",
        "options": [
          "A diagonal check from e2",
          "From e2 the rook attacks the king on e8 along the second rank",
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
          "先に王手を返せる",
          "合法手で王手を解消する",
          "黒キングが守られていれば王手を受けたままでも指せる"
        ],
        "explanation": "王手を放置する手は違法じゃ。"
      },
      "en": {
        "question": "What must Black do when in check?",
        "options": [
          "Give countercheck first",
          "Make a legal move resolving the check",
          "A defended king may remain in check while Black makes another move"
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
          "受けが残る王手",
          "キングに直接触れずにクイーンを捕獲できることを示す印"
        ],
        "explanation": "黒クイーンの王手を白は合法的に防げない。"
      },
      "en": {
        "question": "What does the '#' in Qh4# mean?",
        "options": [
          "Checkmate with no legal escape",
          "Check with a reply",
          "A sign that White can capture a queen without touching the king"
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
          "f3とg4で王を守る",
          "キング周りのポーンを動かしQh4#を許したから",
          "f3とg4で白のクイーンが守る対角線を広げたから"
        ],
        "explanation": "f・gポーンを進めるとキングの対角線が弱くなる。"
      },
      "en": {
        "question": "Why were f3 and g4 dangerous?",
        "options": [
          "The pawns guard the king",
          "They exposed king-side diagonals and Qh4#",
          "Those moves widened the diagonals guarded by White's queen"
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
          "a8のクイーンを取る",
          "ポーンがa8に着いたあと次の手でクイーンに変わること",
          "aポーンがクイーンに昇格"
        ],
        "explanation": "8段目でポーンがクイーンに変わる。"
      },
      "en": {
        "question": "What does '=Q' signify in a8=Q+?",
        "options": [
          "Capture a queen on a8",
          "The pawn reaches a8 but must wait until the next turn to become a queen",
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
          "詰みを示す記号",
          "昇格したクイーンによる王手",
          "黒キングの逃げ場が完全になくなったチェックメイトの印"
        ],
        "explanation": "新しいクイーンが8段目の黒キングe8へ王手する。"
      },
      "en": {
        "question": "What does '+' signify after a8=Q?",
        "options": [
          "Checkmate symbol",
          "The promoted queen gives check",
          "The new queen attacks with no legal response, meaning checkmate"
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
          "黒ポーンはd6に来た",
          "黒がd7からd5へ2マス進み白のe5ポーンの隣に来たから",
          "黒が2マス進む前から、白には好きな手番で取る権利があるから"
        ],
        "explanation": "直前の2マス前進だけに使えるアンパッサンじゃ。"
      },
      "en": {
        "question": "Why may White play exd6 just after ...d5?",
        "options": [
          "Black stopped on d6",
          "Black's pawn moved two squares next to White's e5-pawn",
          "The right to capture remains available on any later turn after ...d5"
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
          "黒ポーンはd5に残る",
          "白ポーンはd5へ移り、黒ポーンはd6へ押し戻される",
          "d5から取り除かれ白ポーンがd6へ着く"
        ],
        "explanation": "通常の斜め捕獲と異なり、捕まる黒ポーンはd5にいた。"
      },
      "en": {
        "question": "Where is the black pawn after exd6 en passant?",
        "options": [
          "Black stays on d5",
          "White lands on d5 and pushes Black's pawn backward to d6",
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
          "ポーン交換で得をする",
          "空間を作り駒の働きを助ける",
          "中央のマスを占めると相手はそこへ駒を展開できないから"
        ],
        "explanation": "中央を支配すると駒の活動範囲を広げやすい。"
      },
      "en": {
        "question": "Why play e4 and d4 in the center?",
        "options": [
          "Force a pawn exchange",
          "Gain space and help piece activity",
          "Occupying central squares means the opponent cannot develop any pieces there"
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
          "Qxd4で取り返す",
          "クイーンd1でd4を取り返してナイトを初期位置に残す",
          "Nxd4で取り返せる"
        ],
        "explanation": "f3ナイトがd4の黒ポーンを取れる。"
      },
      "en": {
        "question": "After ...exd4, what can White play?",
        "options": [
          "Recapture with Qxd4",
          "Recapture on d4 with the queen, leaving the knight undeveloped",
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
          "ナイトの王手だから",
          "f3ナイトはe5を守っているので黒が自由に進めなくなるから"
        ],
        "explanation": "駒を出しながら相手の中央ポーンへ圧力をかける。"
      },
      "en": {
        "question": "Why is Nf3 both development and attack?",
        "options": [
          "It moves the knight to f3 and attacks e5",
          "The knight gives check",
          "The knight on f3 defends Black's pawn on e5 and prevents pawn moves"
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
          "...Bc5でe5を守る",
          "...Nc6で守りつつ展開する",
          "黒ポーンをe6へ戻してe5の取り合いを避けられる"
        ],
        "explanation": "ナイトc6がe5を守る。"
      },
      "en": {
        "question": "How can Black defend e5 after Nf3?",
        "options": [
          "Protect e5 with ...Bc5",
          "Develop ...Nc6 to protect e5",
          "Move Black's pawn backward to e6 to withdraw from the attack on e5"
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
          "ナイトはe5へ進む",
          "c6のナイトはd4だけを守りe5を攻撃しないから",
          "c6ナイトがe5を利かせるから"
        ],
        "explanation": "c6のナイトはe5へL字の利きがある。"
      },
      "en": {
        "question": "Why does ...Nc6 protect e5?",
        "options": [
          "The knight moves to e5",
          "The knight on c6 protects d4 but cannot influence the e5 square",
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
          "d8クイーンが自由になる",
          "ナイトc6によりa8ルークが中央のd5を直接守れる"
        ],
        "explanation": "駒を守るのと展開するのを同時にできる。"
      },
      "en": {
        "question": "What else does ...Nc6 accomplish?",
        "options": [
          "Develops the b8 knight",
          "The queen gains space",
          "The knight on c6 lets the rook on a8 defend the pawn on d5 directly"
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
          "f1ビショップがまだいる",
          "ナイトとビショップを出しf1・g1が空いたから",
          "黒が...Bc5と指すとキングは王手を無視して動けるから"
        ],
        "explanation": "f1・g1の道が空き、キャスリングできる。"
      },
      "en": {
        "question": "Why can White castle O-O here?",
        "options": [
          "Bishop stays on f1",
          "Knight and bishop cleared f1 and g1",
          "Black's ...Bc5 makes it legal for White's king to ignore attacks"
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
          "ルークはh1に残る",
          "h1のルークがg1へ行きキングはf1で止まる",
          "f1"
        ],
        "explanation": "キングはg1、ルークはf1に移る。"
      },
      "en": {
        "question": "Where does the h1-rook go after O-O?",
        "options": [
          "The rook stays on h1",
          "The rook goes to g1 and the king stops on f1 instead",
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
          "中央が閉じるから",
          "交換後に中央が完全に閉じてビショップの道がなくなる"
        ],
        "explanation": "交換後に駒の通り道が開くことがある。"
      },
      "en": {
        "question": "Why exchange central pawns with exd5?",
        "options": [
          "Change the structure and open lines",
          "To close the center",
          "The exchange closes every central diagonal and blocks both bishops"
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
          "黒は...e6で取り返す",
          "d8クイーンがd筋を進み白ポーンを取れるから",
          "黒のe7ポーンがd5へ進んで白ポーンと交換する"
        ],
        "explanation": "ポーンを取っても黒が取り返せる。"
      },
      "en": {
        "question": "Why is ...Qxd5 legal after exd5?",
        "options": [
          "Black recaptures ...e6",
          "The d8-queen takes the pawn along the d-file",
          "Black's pawn on e7 moves to d5 to trade for White's pawn"
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
          "ビショップg5はf6を攻撃するが、その後ろの駒には利かない"
        ],
        "explanation": "ナイトはd8のクイーンへ対する相対ピン。キングのピンとは違う。"
      },
      "en": {
        "question": "Which piece is behind the knight pinned by Bg5?",
        "options": [
          "Black's king on e8",
          "Black queen d8",
          "The bishop attacks the knight but cannot influence the piece behind it"
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
          "ナイトをe4へ逃がす",
          "クイーンをd7へ動かすと黒キングへの絶対ピンに変わる"
        ],
        "explanation": "e7にビショップを置き、ピンを和らげる。"
      },
      "en": {
        "question": "What does ...Be7 do against Bg5?",
        "options": [
          "Develop a bishop between knight and queen",
          "The knight escapes to e4",
          "Move the queen to d7, turning the relative pin into an absolute king pin"
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
          "自分の2枚を守る手",
          "相手のキングを王手して次の手をすべて禁止すること",
          "一つの駒が複数の相手の駒を同時に攻撃"
        ],
        "explanation": "ナイトが得意な複数目標への攻撃じゃ。"
      },
      "en": {
        "question": "What is a fork?",
        "options": [
          "Defending two allies",
          "Checking the king and preventing every possible reply next turn",
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
          "王とクイーンへの二股",
          "いいえ。e5を攻撃するがフォークではない",
          "c6の黒ナイトとe5の黒ポーンを同時に攻撃するフォーク"
        ],
        "explanation": "単なる攻撃とフォークは違う。"
      },
      "en": {
        "question": "Is Nf3 already a fork here?",
        "options": [
          "A king-queen fork",
          "No, it attacks e5 but not multiple targets",
          "It forks the black knight on c6 and the pawn on e5 at once"
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
          "黒キングが守るから",
          "exd5と取ると白クイーンも自動的に交換されるから"
        ],
        "explanation": "交換の続きまで確認しよう。"
      },
      "en": {
        "question": "Why doesn't exd5 immediately gain material?",
        "options": [
          "Black can recapture with ...Qxd5",
          "Defended by the king",
          "Capturing on d5 automatically exchanges both queens as well"
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
          "Nc3はe4ポーンを守る",
          "c3のナイトはd5のクイーンを守る側に回るため",
          "ナイトを展開しd5のクイーンを攻撃"
        ],
        "explanation": "黒クイーンに当てながら展開する手じゃ。"
      },
      "en": {
        "question": "What is the idea of Nc3 after ...Qxd5?",
        "options": [
          "Nc3 protects e4",
          "The knight on c3 becomes a defender of Black's queen on d5",
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
          "白キングへの進路が開く",
          "キング周辺の守りを弱めQh4#を許すから",
          "黒ビショップがf8に残るため白のキャスリングが妨げられるから"
        ],
        "explanation": "次の王手・詰みを読まないと危険じゃ。"
      },
      "en": {
        "question": "Why are White's f3 and g4 risky?",
        "options": [
          "Open a route for White's king",
          "They expose the king and allow Qh4#",
          "They allow Black's bishop on f8 to prevent White from ever castling"
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
          "...Nf6+で詰める",
          "...Bc5+とビショップを出してから次に...Qh4を狙う"
        ],
        "explanation": "黒クイーンがh4へ出てチェックメイト。"
      },
      "en": {
        "question": "What checkmate does Black have after g4?",
        "options": [
          "...Qh4#",
          "Mate with ...Nf6+",
          "Play ...Bc5+ as an immediate bishop check before aiming for ...Qh4"
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
          "ルークも同時に動かす",
          "ビショップをc4へ動かすと黒キングを直ちに王手できるから",
          "ビショップを出してキャスリングの道を開ける"
        ],
        "explanation": "ナイトとビショップを出せばO-Oの準備が整う。"
      },
      "en": {
        "question": "Why is Bc4 a useful move in White's plan?",
        "options": [
          "The rook moves too",
          "Developing the bishop to c4 immediately checks Black's king on e8",
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
          "Kd2で王を中央へ",
          "O-Oとキャスリング",
          "白キングをd2へ出して中央の白ポーンを直接守る"
        ],
        "explanation": "白はf1・g1が空いており、O-Oできる。"
      },
      "en": {
        "question": "How can White improve king safety after ...Bc5?",
        "options": [
          "Centralize with Kd2",
          "Castle O-O",
          "Activate White's king with Kd2 to defend the central pawns directly"
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

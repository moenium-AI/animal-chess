// Two bilingual why-and-response questions for the 12 remaining basics and 10 principles.
// Loaded after existing reasoning catalogs; prior IDs and saved answers are preserved.
const FOUNDATION_REASONING = {
  "bk_board": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "e4というマス名の意味は？",
        "options": [
          "e列に並ぶ4枚の駒をまとめた記号",
          "e列の4段目",
          "白から数えた4番目の縦の列を指す記号"
        ],
        "explanation": "英字は列、数字は段。e4はe列の4段目じゃ。"
      },
      "en": {
        "question": "What is square e4?",
        "options": [
          "A group of four pieces arranged along file e",
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
          "最初の手なら途中に駒があっても跳べるから",
          "e3へ進んだあと続けてもう一手指せるから",
          "最初のポーンの手で、途中も空いているから"
        ],
        "explanation": "e2のポーンは最初だけe3とe4が空なら2マス進める。"
      },
      "en": {
        "question": "Why may the e-pawn initially advance to e4?",
        "options": [
          "A pawn can jump over an occupied square on its first move",
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
          "2マス進めば途中の相手の駒も同時に取れるから",
          "d4が安全なら途中のd3が埋まっていてもよいから",
          "初回の手でd3・d4が空いているから"
        ],
        "explanation": "ポーンの2マス前進は初期位置からの最初の手だけ。"
      },
      "en": {
        "question": "Why can the pawn advance from d2 to d4?",
        "options": [
          "A two-square move may capture an enemy piece on d3 en route",
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
          "d4からd3へは戻れるが2マスは戻れない",
          "白ポーンは斜め後ろのc3なら取って戻れる"
        ],
        "explanation": "ポーンは後ろに進めない。"
      },
      "en": {
        "question": "Can the d4-pawn retreat to d2?",
        "options": [
          "No, pawns cannot move backward",
          "The pawn can retreat to d3 but may not retreat two squares",
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
          "a2からa5まで進んで斜めにa8へ向きを変える",
          "a2からa8へ斜めのマスを順に渡って進む"
        ],
        "explanation": "ルークは縦横へ直進する。a2からa8は同じ筋じゃ。"
      },
      "en": {
        "question": "How does the rook travel in Ra8+?",
        "options": [
          "Along the a-file",
          "It travels to a5 and then turns diagonally toward a8",
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
          "黒キングは攻撃されているが、受ける必要はないという印",
          "黒キングe8への王手",
          "ルークが黒キングのいるマスまで進めることを示す印"
        ],
        "explanation": "a8のルークが8段目のキングに王手している。"
      },
      "en": {
        "question": "What does '+' mean in Ra8+?",
        "options": [
          "Black's king is attacked but is free to ignore the threat",
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
          "e4のポーンがf1のビショップを直接守るため",
          "e2ポーンが動いて対角線が空くから",
          "f1のビショップとe2の白ポーンが場所を交換するため"
        ],
        "explanation": "e2が空いたのでf1のビショップはe2・d3を通りc4へ進める。"
      },
      "en": {
        "question": "Why does e4 free the f1-bishop?",
        "options": [
          "The pawn on e4 directly protects the bishop still on f1",
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
          "f1からd3を通るがe2の白ポーンが残っても進める",
          "f1からc4へは途中の駒を一度だけ跳び越せる",
          "f1から空いた対角線をc4へ進む"
        ],
        "explanation": "ビショップは斜めへ進み、駒は飛び越せない。"
      },
      "en": {
        "question": "How does Bc4 travel from f1?",
        "options": [
          "It follows the same diagonal even if White's pawn still occupies e2",
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
          "g1からg3へ2マス進み、そのあとf3へ斜めに折れる",
          "g1からf2を通過してそのままf3へ進む",
          "縦2・横1のL字"
        ],
        "explanation": "ナイトはL字に跳ぶ。"
      },
      "en": {
        "question": "How does a knight move from g1 to f3?",
        "options": [
          "It moves along the g-file to g3 and then steps diagonally to f3",
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
          "g1のナイトはf2の白ポーンを先に取って通り道を開くから",
          "ナイトは自分の駒のいるマスに着地してもよいから"
        ],
        "explanation": "ナイトは途中の駒に邪魔されず跳べる。"
      },
      "en": {
        "question": "Why can Nf3 be played in the initial position?",
        "options": [
          "Knights can jump over pieces",
          "The knight captures its own pawn on f2 to clear its route first",
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
          "a2からe2へはb3・c4・d5を経由して進めるから",
          "2段目を横に進めるから",
          "a2からe2の間に白の駒がいても通り抜けられるから"
        ],
        "explanation": "クイーンは縦横斜めの空いた線を進む。"
      },
      "en": {
        "question": "Why is the queen move from a2 to e2 legal?",
        "options": [
          "It travels diagonally through b3, c4 and d5 to reach e2",
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
          "e2からf3の方向へ攻撃し、その延長に黒キングがいるから",
          "e2のクイーンがd1の白キングを守ること自体が王手だから",
          "e筋を通して黒キングe8を攻撃するから"
        ],
        "explanation": "e2からe8への線が空いている。"
      },
      "en": {
        "question": "Why does Qe2+ check Black?",
        "options": [
          "The queen attacks diagonally from e2 through f3 toward the king",
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
          "e1からd1へ横移動して、さらにd2へ続けて進む",
          "キングがe1からd2へ移るには途中に駒が必要"
        ],
        "explanation": "キングは隣のマスへ1歩進む。"
      },
      "en": {
        "question": "How does the king move in Kd2?",
        "options": [
          "One diagonally adjacent square",
          "The king moves sideways to d1 before continuing up to d2",
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
          "d2に敵の利きがあっても白の駒が守れば進めるか",
          "d2から次の手に敵のクイーンを取れるかどうか",
          "d2が敵の利きに入っていないか"
        ],
        "explanation": "キングは王手になるマスへ動けない。"
      },
      "en": {
        "question": "What must be checked before Kd2?",
        "options": [
          "Whether a friendly defender lets the king move onto an attacked square",
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
          "e4からd5は斜め前へ進めるので、d5が空でも同じ表記になるから",
          "斜め前の敵駒を取れるから",
          "e4のポーンがd5の駒を飛び越えてd6の駒を取るから"
        ],
        "explanation": "ポーンは移動は前、捕獲は斜め前じゃ。"
      },
      "en": {
        "question": "Why is exd5 a legal pawn capture?",
        "options": [
          "A pawn may move to an empty d5 diagonally and still write exd5",
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
          "白のポーンはe4に残り、d5の黒ポーンだけ消える",
          "白のポーンがd5へ移り、黒のポーンはe4へ戻る"
        ],
        "explanation": "白ポーンがd5へ進み、黒ポーンは取り除かれる。"
      },
      "en": {
        "question": "What occupies d5 after exd5?",
        "options": [
          "A white pawn; the black pawn is gone",
          "White's pawn stays on e4 while only Black's pawn disappears",
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
          "ルークh2がe2へ移って黒キングの斜め後ろを攻撃するから",
          "ルークe2が同じ2段目から黒キングe8を横に狙うから",
          "ルークe2が同じe筋の黒キングを攻撃するから"
        ],
        "explanation": "ルークe2からe8への縦の利きで王手になる。"
      },
      "en": {
        "question": "Why does Re2+ give check?",
        "options": [
          "Moving from h2 to e2 opens a diagonal attack on Black's king",
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
          "王手をかけ返せば黒キングが攻撃されてもそのままでよい",
          "合法手で王手を解消する",
          "黒キングが守られていれば王手を受けたままでも指せる"
        ],
        "explanation": "王手を放置する手は違法じゃ。"
      },
      "en": {
        "question": "What must Black do when in check?",
        "options": [
          "Giving a countercheck allows Black to leave its king in check",
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
          "王手が続くが、相手に少なくとも1つの受けが残る印",
          "キングに直接触れずにクイーンを捕獲できることを示す印"
        ],
        "explanation": "黒クイーンの王手を白は合法的に防げない。"
      },
      "en": {
        "question": "What does the '#' in Qh4# mean?",
        "options": [
          "Checkmate with no legal escape",
          "A check that still has at least one legal answer available",
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
          "f3とg4で白のキングに近いマスをすべて守り切ったから",
          "キング周りのポーンを動かしQh4#を許したから",
          "f3とg4で白のクイーンが守る対角線を広げたから"
        ],
        "explanation": "f・gポーンを進めるとキングの対角線が弱くなる。"
      },
      "en": {
        "question": "Why were f3 and g4 dangerous?",
        "options": [
          "The f3 and g4 pawns completely protected the king's neighboring squares",
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
          "a8のクイーンを新しい白ポーンに交換すること",
          "ポーンがa8に着いたあと次の手でクイーンに変わること",
          "aポーンがクイーンに昇格"
        ],
        "explanation": "8段目でポーンがクイーンに変わる。"
      },
      "en": {
        "question": "What does '=Q' signify in a8=Q+?",
        "options": [
          "The queen on a8 is exchanged for a newly arriving pawn",
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
          "新しいクイーンは黒キングに迫るが、まだ攻撃していない印",
          "昇格したクイーンによる王手",
          "黒キングの逃げ場が完全になくなったチェックメイトの印"
        ],
        "explanation": "新しいクイーンが8段目の黒キングe8へ王手する。"
      },
      "en": {
        "question": "What does '+' signify after a8=Q?",
        "options": [
          "The promoted queen approaches Black's king but is not yet checking",
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
          "黒ポーンはd5へ進んだので、白はd5のマスに着地して取るから",
          "黒がd7からd5へ2マス進み白のe5ポーンの隣に来たから",
          "黒が2マス進む前から、白には好きな手番で取る権利があるから"
        ],
        "explanation": "直前の2マス前進だけに使えるアンパッサンじゃ。"
      },
      "en": {
        "question": "Why may White play exd6 just after ...d5?",
        "options": [
          "Black's pawn is on d5, so White must land on d5 to capture it",
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
          "白ポーンはd6へ移るが、黒ポーンはd5に残り次の手で消える",
          "白ポーンはd5へ移り、黒ポーンはd6へ押し戻される",
          "d5から取り除かれ白ポーンがd6へ着く"
        ],
        "explanation": "通常の斜め捕獲と異なり、捕まる黒ポーンはd5にいた。"
      },
      "en": {
        "question": "Where is the black pawn after exd6 en passant?",
        "options": [
          "White reaches d6, but the black pawn remains until the next turn",
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
          "中央のポーンを前へ出せば必ず駒得できるから",
          "空間を作り駒の働きを助ける",
          "中央のマスを占めると相手はそこへ駒を展開できないから"
        ],
        "explanation": "中央を支配すると駒の活動範囲を広げやすい。"
      },
      "en": {
        "question": "Why play e4 and d4 in the center?",
        "options": [
          "Any pawn advance into the center guarantees an immediate material gain",
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
          "e4の白ポーンをd5へ進め、d4の黒ポーンを残す",
          "クイーンd1でd4を取り返してナイトを初期位置に残す",
          "Nxd4で取り返せる"
        ],
        "explanation": "f3ナイトがd4の黒ポーンを取れる。"
      },
      "en": {
        "question": "After ...exd4, what can White play?",
        "options": [
          "Move the pawn on e4 to d5 while leaving Black's pawn on d4",
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
          "ナイトはf3へ出ると黒キングへ直接王手もかかるから",
          "f3ナイトはe5を守っているので黒が自由に進めなくなるから"
        ],
        "explanation": "駒を出しながら相手の中央ポーンへ圧力をかける。"
      },
      "en": {
        "question": "Why is Nf3 both development and attack?",
        "options": [
          "It moves the knight to f3 and attacks e5",
          "The knight on f3 directly checks Black's king as it develops",
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
          "黒のf8ビショップをc5へ出せばe5を直接守れる",
          "...Nc6で守りつつ展開する",
          "黒ポーンをe6へ戻してe5の取り合いを避けられる"
        ],
        "explanation": "ナイトc6がe5を守る。"
      },
      "en": {
        "question": "How can Black defend e5 after Nf3?",
        "options": [
          "Develop Black's f8 bishop to c5 to defend the e5-pawn directly",
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
          "c6のナイトがe5に移って白のe4ポーンを取れるから",
          "c6のナイトはd4だけを守りe5を攻撃しないから",
          "c6ナイトがe5を利かせるから"
        ],
        "explanation": "c6のナイトはe5へL字の利きがある。"
      },
      "en": {
        "question": "Why does ...Nc6 protect e5?",
        "options": [
          "The knight on c6 moves straight to e5 to capture White's pawn there",
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
          "ナイトをc6へ出すとd8クイーンの進路がすべて開く",
          "ナイトc6によりa8ルークが中央のd5を直接守れる"
        ],
        "explanation": "駒を守るのと展開するのを同時にできる。"
      },
      "en": {
        "question": "What else does ...Nc6 accomplish?",
        "options": [
          "Develops the b8 knight",
          "Moving the knight to c6 opens every route for Black's queen on d8",
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
          "キングとルークの間のf1にビショップが残っているから",
          "ナイトとビショップを出しf1・g1が空いたから",
          "黒が...Bc5と指すとキングは王手を無視して動けるから"
        ],
        "explanation": "f1・g1の道が空き、キャスリングできる。"
      },
      "en": {
        "question": "Why can White castle O-O here?",
        "options": [
          "The bishop still occupies f1 between the king and rook",
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
          "キングがg1へ進むのでルークはh1に残って支える",
          "h1のルークがg1へ行きキングはf1で止まる",
          "f1"
        ],
        "explanation": "キングはg1、ルークはf1に移る。"
      },
      "en": {
        "question": "Where does the h1-rook go after O-O?",
        "options": [
          "The king reaches g1 while the rook stays on h1 as a defender",
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
          "交換すると白ポーンが2枚になり中央を固められる",
          "交換後に中央が完全に閉じてビショップの道がなくなる"
        ],
        "explanation": "交換後に駒の通り道が開くことがある。"
      },
      "en": {
        "question": "Why exchange central pawns with exd5?",
        "options": [
          "Change the structure and open lines",
          "A capture creates a second white pawn and strengthens the center",
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
          "黒のクイーンはd8からc7へ行き、次にd5で取る",
          "d8クイーンがd筋を進み白ポーンを取れるから",
          "黒のe7ポーンがd5へ進んで白ポーンと交換する"
        ],
        "explanation": "ポーンを取っても黒が取り返せる。"
      },
      "en": {
        "question": "Why is ...Qxd5 legal after exd5?",
        "options": [
          "Black's queen must first move from d8 to c7 before recapturing",
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
          "ビショップg5から見てナイトf6の後ろにはキングe8がある",
          "黒クイーンd8",
          "ビショップg5はf6を攻撃するが、その後ろの駒には利かない"
        ],
        "explanation": "ナイトはd8のクイーンへ対する相対ピン。キングのピンとは違う。"
      },
      "en": {
        "question": "Which piece is behind the knight pinned by Bg5?",
        "options": [
          "The king on e8 is directly behind the knight on f6 along the diagonal",
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
          "ナイトをe4へ前進させ、白ビショップを取りながら守る",
          "クイーンをd7へ動かすと黒キングへの絶対ピンに変わる"
        ],
        "explanation": "e7にビショップを置き、ピンを和らげる。"
      },
      "en": {
        "question": "What does ...Be7 do against Bg5?",
        "options": [
          "Develop a bishop between knight and queen",
          "Move the knight forward to e4 and capture White's bishop as it escapes",
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
          "2つの自分の駒を同時に守ることで攻撃を防ぐこと",
          "相手のキングを王手して次の手をすべて禁止すること",
          "一つの駒が複数の相手の駒を同時に攻撃"
        ],
        "explanation": "ナイトが得意な複数目標への攻撃じゃ。"
      },
      "en": {
        "question": "What is a fork?",
        "options": [
          "One piece defending two of its own pieces against an attack",
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
          "黒キングとd8クイーンを同時に狙うフォークになっている",
          "いいえ。e5を攻撃するがフォークではない",
          "c6の黒ナイトとe5の黒ポーンを同時に攻撃するフォーク"
        ],
        "explanation": "単なる攻撃とフォークは違う。"
      },
      "en": {
        "question": "Is Nf3 already a fork here?",
        "options": [
          "It is already forking the king and queen on d8 simultaneously",
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
          "d5のポーンはまだ黒キングに守られているため白は取れない",
          "exd5と取ると白クイーンも自動的に交換されるから"
        ],
        "explanation": "交換の続きまで確認しよう。"
      },
      "en": {
        "question": "Why doesn't exd5 immediately gain material?",
        "options": [
          "Black can recapture with ...Qxd5",
          "Black's king still defends the pawn on d5, so White cannot capture",
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
          "c3ナイトで黒のe4ポーンを守りつつ次にd4へ進む",
          "c3のナイトはd5のクイーンを守る側に回るため",
          "ナイトを展開しd5のクイーンを攻撃"
        ],
        "explanation": "黒クイーンに当てながら展開する手じゃ。"
      },
      "en": {
        "question": "What is the idea of Nc3 after ...Qxd5?",
        "options": [
          "The knight on c3 protects Black's pawn on e4 before advancing",
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
          "f3・g4によって白キングから黒クイーンへの進路が開くから",
          "キング周辺の守りを弱めQh4#を許すから",
          "黒ビショップがf8に残るため白のキャスリングが妨げられるから"
        ],
        "explanation": "次の王手・詰みを読まないと危険じゃ。"
      },
      "en": {
        "question": "Why are White's f3 and g4 risky?",
        "options": [
          "The moves open a safe path for White's king toward Black's queen",
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
          "...Nf6+とナイトで白キングに王手し次にクイーンを出す",
          "...Bc5+とビショップを出してから次に...Qh4を狙う"
        ],
        "explanation": "黒クイーンがh4へ出てチェックメイト。"
      },
      "en": {
        "question": "What checkmate does Black have after g4?",
        "options": [
          "...Qh4#",
          "Play ...Nf6+ as an immediate knight check before deploying the queen",
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
          "Bc4と指すとh1ルークも同じ手でf1に移れるから",
          "ビショップをc4へ動かすと黒キングを直ちに王手できるから",
          "ビショップを出してキャスリングの道を開ける"
        ],
        "explanation": "ナイトとビショップを出せばO-Oの準備が整う。"
      },
      "en": {
        "question": "Why is Bc4 a useful move in White's plan?",
        "options": [
          "The move Bc4 also shifts the rook from h1 to f1 during the same turn",
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
          "クイーンをe2へ動かしてキングをe1に残し安全を確保する",
          "O-Oとキャスリング",
          "白キングをd2へ出して中央の白ポーンを直接守る"
        ],
        "explanation": "白はf1・g1が空いており、O-Oできる。"
      },
      "en": {
        "question": "How can White improve king safety after ...Bc5?",
        "options": [
          "Move the queen to e2 and leave the king on e1 for greater safety",
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

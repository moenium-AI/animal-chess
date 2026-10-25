// Why-and-response questions for the 17 opening lessons.
// Every evidence line is replayed from the published lesson's starting FEN.
// Alternative replies are illustrative legal moves, not necessarily forced or best.
const OPENING_REASONING = {
  "op_italian": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "3.Bc4で白ビショップをc4に出す狙いは？",
        "options": [
          "クイーンをすぐ取る",
          "黒キングの近くのf7に圧力をかけながら展開する",
          "キングをb1に移動する"
        ],
        "explanation": "c4のビショップはf7をにらむ。中央を占めたあと、駒を活用するイタリアンの基本じゃ。"
      },
      "en": {
        "question": "Why does White develop the bishop with 3.Bc4?",
        "options": [
          "To capture the queen immediately",
          "To develop while looking toward f7 near Black's king",
          "To move the king to b1"
        ],
        "explanation": "The bishop on c4 eyes f7. Developing a piece and applying pressure is a key Italian Game idea."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "Bc4"
        ],
        "focus": "Bc4"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "白がBc4と出たあと、黒が...Bc5を選ぶと何が起きる？",
        "options": [
          "黒キングがキャスリング済みになる",
          "白のc4ビショップが取られる",
          "黒もビショップを展開し、白のf2の方向へ利きを向ける"
        ],
        "explanation": "黒のc5ビショップはf2をにらみ、白のc4ビショップはf7をにらむ。両者の展開を比較してみよう。"
      },
      "en": {
        "question": "What does Black's ...Bc5 do after White plays Bc4?",
        "options": [
          "It castles Black's king",
          "It immediately captures White's bishop",
          "It develops a bishop toward White's f2 square"
        ],
        "explanation": "The bishops face the respective f-pawn areas: White's on c4 eyes f7 and Black's on c5 eyes f2."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "Bc4",
          "Bc5"
        ],
        "focus": "Bc5"
      }
    }
  },
  "op_ruylopez": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "3.Bb5で白が狙う黒の駒は？",
        "options": [
          "e5のポーンを守るc6のナイト",
          "d8のクイーンを直接取る",
          "h8のルークを捕まえる"
        ],
        "explanation": "白ビショップb5が黒ナイトc6へ圧力をかける。ナイトはe5のポーンを守っている。"
      },
      "en": {
        "question": "Which black piece does 3.Bb5 pressure in the Ruy Lopez?",
        "options": [
          "The knight on c6 defending the e5 pawn",
          "The queen on d8 for an immediate capture",
          "The rook on h8"
        ],
        "explanation": "The bishop on b5 pressures the c6 knight, one of the defenders of e5."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "Bb5"
        ],
        "focus": "Bb5"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "黒の...a6に対し白がBa4と戻る理由は？",
        "options": [
          "必ずチェックメイトになるから",
          "ビショップを失わず、c6ナイトへの圧力を残すため",
          "白キングをチェックから守るため"
        ],
        "explanation": "...a6はb5のビショップを攻撃する。Ba4で一歩引き、対角線によるナイトへの圧力を残す。"
      },
      "en": {
        "question": "Why does White retreat to Ba4 after ...a6?",
        "options": [
          "It forces immediate checkmate",
          "It saves the bishop and keeps pressure on the knight at c6",
          "It blocks a check against White's king"
        ],
        "explanation": "Black's ...a6 attacks the bishop; Ba4 preserves the bishop and maintains its diagonal toward c6."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "Bb5",
          "a6",
          "Ba4"
        ],
        "focus": "Ba4"
      }
    }
  },
  "op_sicilian": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "シチリアンの1...c5は、1...e5と比べてどんな中央への働きかけ？",
        "options": [
          "白のe4ポーンをその場で取る",
          "cポーンを昇格させる",
          "黒のcポーンでd4のマスを攻撃する"
        ],
        "explanation": "c5の黒ポーンはd4を攻撃する。e5と左右対称に応じず、中央を側面から争うのじゃ。"
      },
      "en": {
        "question": "What does 1...c5 achieve in the Sicilian compared with ...e5?",
        "options": [
          "It captures the e4-pawn immediately",
          "It promotes the c-pawn",
          "The c-pawn attacks the d4 square"
        ],
        "explanation": "The pawn on c5 attacks d4, challenging the center asymmetrically rather than mirroring 1.e4."
      },
      "evidence": {
        "line": [
          "e4",
          "c5"
        ],
        "focus": "c5"
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "教材で白のd4を黒が...cxd4と取ったあと、白は何で取り返す？",
        "options": [
          "f3のナイトでNxd4",
          "e4のポーンでexd4",
          "白キングでKxd4"
        ],
        "explanation": "白はNxd4で取り返し、ナイトを中央d4に置く。これは掲載したオープン・シチリアンの変化じゃ。"
      },
      "en": {
        "question": "In the displayed Sicilian, how does White recapture after ...cxd4?",
        "options": [
          "With the knight from f3: Nxd4",
          "With the e4-pawn: exd4",
          "With the king: Kxd4"
        ],
        "explanation": "White recaptures with Nxd4, placing the knight on the central square d4 in this open variation."
      },
      "evidence": {
        "line": [
          "e4",
          "c5",
          "Nf3",
          "d6",
          "d4",
          "cxd4",
          "Nxd4"
        ],
        "focus": "Nxd4"
      }
    }
  },
  "op_french": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "フレンチの1...e6が準備する中心的なポーンの手は？",
        "options": [
          "...f5で白キングをただちに詰ませる",
          "...d5で白のe4・d4の中央に挑む",
          "...a5でルークを昇格させる"
        ],
        "explanation": "...e6から...d5を支え、白の中央とぶつかるのがフレンチ・ディフェンスの典型じゃ。"
      },
      "en": {
        "question": "What central pawn move does 1...e6 prepare in the French Defense?",
        "options": [
          "...f5 for immediate checkmate",
          "...d5 to challenge White's center",
          "...a5 to promote a rook"
        ],
        "explanation": "The pawn on e6 supports ...d5, Black's typical challenge to White's central pawns."
      },
      "evidence": {
        "line": [
          "e4",
          "e6",
          "d4",
          "d5"
        ],
        "focus": "d5"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "白のBg5でf6ナイトに圧力がかかったあと、教材の黒の応手は？",
        "options": [
          "...Kxf6でナイトを取る",
          "...Qa5#で詰ませる",
          "...Be7で駒を展開し、ピンを和らげる"
        ],
        "explanation": "e7へビショップを出すことで、f6ナイトとd8クイーンの間に黒の駒が入り、白の圧力に対応する。"
      },
      "en": {
        "question": "What does Black play in the lesson after Bg5 pressures the f6-knight?",
        "options": [
          "...Kxf6, capturing its own knight",
          "...Qa5# for mate",
          "...Be7, developing a piece and easing the pin"
        ],
        "explanation": "The bishop on e7 interrupts the line behind the knight and develops a defender."
      },
      "evidence": {
        "line": [
          "e4",
          "e6",
          "d4",
          "d5",
          "Nc3",
          "Nf6",
          "Bg5",
          "Be7"
        ],
        "focus": "Be7"
      }
    }
  },
  "op_qgd": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "クイーンズ・ギャンビットの2.c4は何を攻撃する？",
        "options": [
          "黒のd5ポーン",
          "黒キングe8",
          "黒クイーンd8を直接取る"
        ],
        "explanation": "c4の白ポーンはd5を攻撃する。中央を側面から崩す誘いじゃ。"
      },
      "en": {
        "question": "What does White's 2.c4 attack in the Queen's Gambit?",
        "options": [
          "Black's pawn on d5",
          "Black's king on e8",
          "Black's queen on d8 for immediate capture"
        ],
        "explanation": "The c-pawn on c4 attacks d5, creating central pressure from the flank."
      },
      "evidence": {
        "line": [
          "d4",
          "d5",
          "c4"
        ],
        "focus": "c4"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "黒が...e6と応じて『拒否形』になるのはなぜ？",
        "options": [
          "c4のポーンを必ず取るから",
          "c4を取らず、d5ポーンをe6から支えるから",
          "黒キングを一手でキャスリングするから"
        ],
        "explanation": "黒は白のc4ポーンをすぐ取らず、e6ポーンでd5を支える。"
      },
      "en": {
        "question": "Why is ...e6 a 'declined' Queen's Gambit response?",
        "options": [
          "Black must capture the c4-pawn",
          "Black supports d5 with the e6-pawn instead of taking c4",
          "Black castles in one move"
        ],
        "explanation": "Black reinforces the pawn on d5 rather than immediately accepting the offered c4-pawn."
      },
      "evidence": {
        "line": [
          "d4",
          "d5",
          "c4",
          "e6"
        ],
        "focus": "e6"
      }
    }
  },
  "op_carokann": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "カロ・カンの...Bf5には、フレンチと比べてどんな長所がある？",
        "options": [
          "キングをビショップに昇格する",
          "クイーンがf5へ飛んでくる",
          "c8のビショップをe6ポーンで閉じ込める前に展開できる"
        ],
        "explanation": "...c6から...d5を作り、ビショップをf5に出せるのがカロ・カンの持ち味の一つじゃ。"
      },
      "en": {
        "question": "What is an advantage of ...Bf5 in the Caro-Kann compared with the French?",
        "options": [
          "Promoting the king into a bishop",
          "Teleporting the queen to f5",
          "Developing the c8-bishop before an ...e6-pawn can restrict it"
        ],
        "explanation": "The Caro-Kann can develop the light-squared bishop outside the pawn chain before ...e6 is needed."
      },
      "evidence": {
        "line": [
          "e4",
          "c6",
          "d4",
          "d5",
          "Nc3",
          "dxe4",
          "Nxe4",
          "Bf5"
        ],
        "focus": "Bf5"
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "教材で黒が...Bf5とビショップを出したあと、白はどう当てる？",
        "options": [
          "Ng3でナイトからf5ビショップを攻撃する",
          "Nxf5#で即詰み",
          "Bxf5で白ビショップと交換する"
        ],
        "explanation": "白のNg3はe4のナイトをg3へ動かし、f5のビショップを攻撃する。この応手が指せるか盤面でも確認しよう。"
      },
      "en": {
        "question": "After ...Bf5 in the example, how does White challenge that bishop?",
        "options": [
          "Ng3 attacks it with the knight",
          "Nxf5# checkmates immediately",
          "Bxf5 trades it with a bishop"
        ],
        "explanation": "White plays Ng3, moving the knight from e4 to attack the bishop on f5."
      },
      "evidence": {
        "line": [
          "e4",
          "c6",
          "d4",
          "d5",
          "Nc3",
          "dxe4",
          "Nxe4",
          "Bf5",
          "Ng3"
        ],
        "focus": "Ng3"
      }
    }
  },
  "op_scotch": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "スコッチの3.d4はなぜ中央の展開を早める？",
        "options": [
          "黒ルークをその場で取るため",
          "黒のe5ポーンに挑み、中央のラインを開くため",
          "白キングを中央に置くため"
        ],
        "explanation": "d4でe5にぶつかり、ポーン交換からナイトを中央へ出せる形を作る。"
      },
      "en": {
        "question": "Why does 3.d4 lead to open central play in the Scotch Game?",
        "options": [
          "It captures a rook immediately",
          "It challenges the e5-pawn and opens central lines",
          "It centralizes White's king"
        ],
        "explanation": "The d-pawn challenges e5, and exchanges can open files and develop a central knight."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nc6",
          "d4"
        ],
        "focus": "d4"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "この教材で黒が...exd4と取ったあと、白がNxd4を選ぶのは？",
        "options": [
          "白のクイーンを交換するため",
          "黒キングへチェックメイトをかけるため",
          "f3のナイトで取り返してd4へ展開するため"
        ],
        "explanation": "f3ナイトがd4の黒ポーンを取り返す。中央の好位置にナイトを置く手じゃ。"
      },
      "en": {
        "question": "Why does White answer ...exd4 with Nxd4 in the lesson?",
        "options": [
          "To trade queens immediately",
          "To give immediate checkmate",
          "To recapture with the knight from f3 and occupy d4"
        ],
        "explanation": "The knight recaptures the pawn on d4, placing a developed piece in the center."
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
        ],
        "focus": "Nxd4"
      }
    }
  },
  "op_scandinavian": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "スカンジナビアンで白のNc3が...Qxd5に当たるのはなぜ？",
        "options": [
          "c3のナイトがd5の黒クイーンを攻撃するから",
          "白キングが黒キングに王手しているから",
          "白ポーンがf8へ昇格したから"
        ],
        "explanation": "ナイトc3の利きがd5へ届く。相手クイーンを攻撃しながら駒を展開できる。"
      },
      "en": {
        "question": "Why does Nc3 attack Black's queen after ...Qxd5?",
        "options": [
          "The knight on c3 attacks the queen on d5",
          "White's king is checking Black's king",
          "A pawn has promoted on f8"
        ],
        "explanation": "The knight on c3 attacks d5, developing with a threat to the early queen."
      },
      "evidence": {
        "line": [
          "e4",
          "d5",
          "exd5",
          "Qxd5",
          "Nc3"
        ],
        "focus": "Nc3"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "白がNc3で黒クイーンを攻撃したあと、教材の黒の応手は？",
        "options": [
          "...Kxd5でキングで取り返す",
          "...Qa5でクイーンを攻撃から逃がす",
          "...Qe1#ですぐ詰ませる"
        ],
        "explanation": "...Qa5でクイーンを安全な場所へ退き、白のナイトの当たりを避ける。"
      },
      "en": {
        "question": "How does Black respond to Nc3's attack on the queen in the example?",
        "options": [
          "...Kxd5, capturing with the king",
          "...Qa5, moving the queen away from the knight's attack",
          "...Qe1# for immediate mate"
        ],
        "explanation": "Black plays ...Qa5, moving the queen away after White's developing knight attacked it."
      },
      "evidence": {
        "line": [
          "e4",
          "d5",
          "exd5",
          "Qxd5",
          "Nc3",
          "Qa5"
        ],
        "focus": "Qa5"
      }
    }
  },
  "op_kingsindian": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "キングス・インディアンで黒の...g6にはどんな展開の狙いがある？",
        "options": [
          "a8のルークを昇格させる",
          "...Bg7とフィアンケットして長い対角線へビショップを置く",
          "f6のナイトを無理に失う"
        ],
        "explanation": "...g6はビショップをg7へ出す道を用意する。中央はあとからポーンで反撃する考え方じゃ。"
      },
      "en": {
        "question": "Why does Black play ...g6 in the King's Indian Defense?",
        "options": [
          "To promote the rook on a8",
          "To prepare ...Bg7 and fianchetto the bishop on a long diagonal",
          "To deliberately lose the f6-knight"
        ],
        "explanation": "The move ...g6 prepares development of the bishop to g7, while Black plans later central counterplay."
      },
      "evidence": {
        "line": [
          "d4",
          "Nf6",
          "c4",
          "g6",
          "Nc3",
          "Bg7"
        ],
        "focus": "Bg7"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "黒がキングを...O-Oで囲ったあと、教材で行う中央への反撃は？",
        "options": [
          "...b5でビショップを取る",
          "...Qxd4で白キングを捕まえる",
          "...e5で白の広い中央に挑む"
        ],
        "explanation": "黒は...d6と...O-Oを経て、...e5で白のe4・d4の中央に圧力をかける。"
      },
      "en": {
        "question": "After Black castles with ...O-O, what central counterstrike follows in the lesson?",
        "options": [
          "...b5 to capture a bishop",
          "...Qxd4 to capture White's king",
          "...e5 to challenge White's broad center"
        ],
        "explanation": "After building up and castling, Black eventually plays ...e5 to challenge the central pawn structure."
      },
      "evidence": {
        "line": [
          "d4",
          "Nf6",
          "c4",
          "g6",
          "Nc3",
          "Bg7",
          "e4",
          "d6",
          "Nf3",
          "O-O",
          "Be2",
          "e5"
        ],
        "focus": "e5"
      }
    }
  },
  "op_english": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "イングリッシュの1.c4が側面から攻撃する中央のマスは？",
        "options": [
          "e5",
          "f7",
          "d5"
        ],
        "explanation": "c4の白ポーンは斜め前のd5を利かせる。e4やd4へ最初からポーンを置かない中央への働きかけじゃ。"
      },
      "en": {
        "question": "Which central square is attacked by the pawn after 1.c4 in the English?",
        "options": [
          "e5",
          "f7",
          "d5"
        ],
        "explanation": "The pawn on c4 attacks d5 diagonally, contesting the center from the flank."
      },
      "evidence": {
        "line": [
          "c4"
        ],
        "focus": "c4"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "教材で黒が...d5で中央を広げたら、白はどう応じる？",
        "options": [
          "cポーンをc3へ戻す",
          "cxd5でd5の黒ポーンを取る",
          "白キングをd5へ進める"
        ],
        "explanation": "白はc4からd5へポーンを進めて...d5の黒ポーンを取る。掲載された交換手順の一例じゃ。"
      },
      "en": {
        "question": "If Black expands with ...d5 in the lesson, what does White do?",
        "options": [
          "Retreat the c-pawn to c3",
          "Capture the pawn on d5 with cxd5",
          "Move White's king to d5"
        ],
        "explanation": "White captures from c4 to d5 with cxd5, the chosen central exchange in the displayed line."
      },
      "evidence": {
        "line": [
          "c4",
          "e5",
          "Nc3",
          "Nf6",
          "Nf3",
          "Nc6",
          "g3",
          "d5",
          "cxd5"
        ],
        "focus": "cxd5"
      }
    }
  },
  "op_kingsgambit": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "キングス・ギャンビットの2.f4は何を攻撃する？",
        "options": [
          "黒のe5ポーン",
          "黒キングe8を直接取る",
          "黒クイーンd8をただで取る"
        ],
        "explanation": "f4の白ポーンはe5を攻撃する。中央を開いて主導権を狙う積極的な選択じゃ。"
      },
      "en": {
        "question": "What does the move 2.f4 attack in the King's Gambit?",
        "options": [
          "Black's pawn on e5",
          "Black's king on e8 for capture",
          "Black's queen on d8 for free"
        ],
        "explanation": "The pawn on f4 attacks e5, offering a sharp fight over the center."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "f4"
        ],
        "focus": "f4"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "この教材の黒は2.f4のポーンをすぐ取る代わりにどう応じる？",
        "options": [
          "...exf4でギャンビットを受ける",
          "...Bc5でビショップを展開して拒否する",
          "...Qh4#で確実に詰ませる"
        ],
        "explanation": "黒は...Bc5と出てギャンビットを受けず、ビショップを活動させる変化を選ぶ。"
      },
      "en": {
        "question": "In the example, how does Black decline the offered pawn after 2.f4?",
        "options": [
          "By accepting with ...exf4",
          "By developing with ...Bc5 instead of taking the pawn",
          "By forcing immediate mate with ...Qh4#"
        ],
        "explanation": "Black chooses ...Bc5, developing the bishop instead of capturing the f4-pawn."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "f4",
          "Bc5"
        ],
        "focus": "Bc5"
      }
    }
  },
  "op_vienna": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "ウィーン・ゲームで2.Nc3を先に指す意図は？",
        "options": [
          "fポーンを昇格させる",
          "ナイトを展開し、後のf4による攻めを選択肢に残す",
          "中央ポーンを全部捨てる"
        ],
        "explanation": "白はナイトをc3へ出して中央を支え、次にf4と動く計画を残す。"
      },
      "en": {
        "question": "Why does White develop with 2.Nc3 in the Vienna Game?",
        "options": [
          "To promote the f-pawn",
          "To develop while keeping f4 as a possible later break",
          "To sacrifice every central pawn"
        ],
        "explanation": "White develops the knight and retains the option of a later pawn thrust with f4."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nc3"
        ],
        "focus": "Nc3"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "白のf4に対する黒の...d5は何を狙った応手？",
        "options": [
          "ただちに白キングを詰ます",
          "dポーンで黒ビショップを取る",
          "中央で反撃し、白に自由な攻めをさせない"
        ],
        "explanation": "黒は...d5と中央で切り返す。教材ではこれがf4に対する一つの受け方として示される。"
      },
      "en": {
        "question": "What is the point of Black's ...d5 after White plays f4?",
        "options": [
          "To checkmate the king immediately",
          "To capture Black's own bishop with the d-pawn",
          "To strike back in the center rather than allow a free attack"
        ],
        "explanation": "Black counters in the center with ...d5. This is a concrete reply to f4 in the shown Vienna variation."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nc3",
          "Nf6",
          "f4",
          "d5"
        ],
        "focus": "d5"
      }
    }
  },
  "op_petrov": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "ペトロフの2...Nf6は、黒のe5ポーンを守る代わりに何をする？",
        "options": [
          "白のd4をポーンで取る",
          "白のe4ポーンを黒ナイトで攻撃する",
          "白キングをただちにチェックする"
        ],
        "explanation": "黒はe5を直接守らず、...Nf6で白のe4を攻撃し返す。対称的なカウンターじゃ。"
      },
      "en": {
        "question": "What does 2...Nf6 do in the Petrov instead of defending e5 directly?",
        "options": [
          "Capture White's d4-pawn with a pawn",
          "Attack White's e4-pawn with Black's knight",
          "Give immediate check to White's king"
        ],
        "explanation": "The black knight on f6 attacks the e4-pawn rather than directly guarding e5."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nf6"
        ],
        "focus": "Nf6"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "白がNxe5とe5のポーンを取ったあと、教材で黒が選ぶ手は？",
        "options": [
          "すぐ...Nxe4で取り返すだけ",
          "...Qh4#で詰ませる",
          "...d6でe5ナイトを追い、次にe4を取り返す準備をする"
        ],
        "explanation": "まず...d6でe5のナイトを攻撃し、退いたあとに...Nxe4で取り返す手順じゃ。"
      },
      "en": {
        "question": "After White plays Nxe5 in the Petrov, what is Black's shown reply?",
        "options": [
          "Always ...Nxe4 immediately",
          "...Qh4# for checkmate",
          "...d6, attacking the knight on e5 before recapturing e4"
        ],
        "explanation": "Black first plays ...d6 to drive away the knight, then recaptures e4 after it retreats."
      },
      "evidence": {
        "line": [
          "e4",
          "e5",
          "Nf3",
          "Nf6",
          "Nxe5",
          "d6",
          "Nf3",
          "Nxe4"
        ],
        "focus": "Nxe4"
      }
    }
  },
  "op_london": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "ロンドン・システムのBf4を指す狙いは？",
        "options": [
          "ビショップをc1からf4へ早めに展開し、中央へ働かせる",
          "白キングをf4へ出す",
          "白ポーンをその場で昇格させる"
        ],
        "explanation": "ロンドンではd4・Nf3・Bf4が代表的な駒組み。Bf4でビショップを外へ出す。"
      },
      "en": {
        "question": "Why does White play Bf4 in the London System?",
        "options": [
          "To develop the bishop from c1 to f4 and influence central squares",
          "To move White's king to f4",
          "To promote a pawn on the spot"
        ],
        "explanation": "The London commonly develops the bishop to f4 early, alongside d4 and Nf3."
      },
      "evidence": {
        "line": [
          "d4",
          "d5",
          "Nf3",
          "Nf6",
          "Bf4"
        ],
        "focus": "Bf4"
      }
    },
    "defense": {
      "answer": 1,
      "ja": {
        "question": "白のBf4のあと、黒は...c5で中央へ挑める？",
        "options": [
          "いいえ、cポーンは進めない",
          "はい。...c5は合法で、d4の白ポーンを攻撃する",
          "いいえ、Bf4を指すと黒は自動的に負ける"
        ],
        "explanation": "Bf4は黒の応手を封じるわけではない。この局面では...c5が合法でd4に圧力をかける。"
      },
      "en": {
        "question": "Can Black challenge the London with ...c5 after White's Bf4?",
        "options": [
          "No, Black's c-pawn cannot move",
          "Yes: ...c5 is legal and attacks White's pawn on d4",
          "No, Bf4 automatically wins the game"
        ],
        "explanation": "The London setup does not prevent counterplay. Black can legally play ...c5 to attack d4 in this position."
      },
      "evidence": {
        "line": [
          "d4",
          "d5",
          "Nf3",
          "Nf6",
          "Bf4",
          "c5"
        ],
        "focus": "c5"
      }
    }
  },
  "op_slav": {
    "why": {
      "answer": 2,
      "ja": {
        "question": "スラヴの...c6は主にどの黒ポーンを支える？",
        "options": [
          "e7のポーン",
          "h7のポーン",
          "d5のポーン"
        ],
        "explanation": "c6に黒ポーンを置くと、斜め前のd5を守れる。スラヴの堅実な中央構造じゃ。"
      },
      "en": {
        "question": "Which black pawn is supported by ...c6 in the Slav Defense?",
        "options": [
          "The pawn on e7",
          "The pawn on h7",
          "The pawn on d5"
        ],
        "explanation": "The pawn on c6 guards d5, reinforcing Black's central pawn."
      },
      "evidence": {
        "line": [
          "d4",
          "d5",
          "c4",
          "c6"
        ],
        "focus": "c6"
      }
    },
    "defense": {
      "answer": 0,
      "ja": {
        "question": "...c6のあと白がcxd5と取ったら、黒はどう取り返せる？",
        "options": [
          "c6ポーンで...cxd5と取る",
          "黒キングで...Kxd5と取る",
          "...Qxd5#でチェックメイトする"
        ],
        "explanation": "黒はc6のポーンでd5を取り返せる。c6によるポーンの守りが盤面で分かる変化じゃ。"
      },
      "en": {
        "question": "If White plays cxd5 after ...c6, how can Black recapture?",
        "options": [
          "With the c6-pawn: ...cxd5",
          "With the king: ...Kxd5",
          "With ...Qxd5# for mate"
        ],
        "explanation": "Black can recapture on d5 using the pawn from c6, demonstrating the central pawn support."
      },
      "evidence": {
        "line": [
          "d4",
          "d5",
          "c4",
          "c6",
          "cxd5",
          "cxd5"
        ],
        "focus": "cxd5"
      }
    }
  },
  "op_nimzo": {
    "why": {
      "answer": 0,
      "ja": {
        "question": "ニムゾ・インディアンの...Bb4はなぜc3ナイトをピンする？",
        "options": [
          "ナイトが動くとビショップb4から白キングe1への対角線が開くから",
          "ビショップがナイトの動きを飛び越えるから",
          "黒のキングがナイトを取るから"
        ],
        "explanation": "c3のナイトはb4のビショップとe1のキングの間にいる。キングを王手にさらす移動はできない。"
      },
      "en": {
        "question": "Why does ...Bb4 pin the c3-knight in the Nimzo-Indian?",
        "options": [
          "Moving the knight exposes the diagonal from the bishop on b4 to White's king on e1",
          "The bishop can jump over the knight",
          "Black's king can capture the knight"
        ],
        "explanation": "The knight on c3 lies between the bishop on b4 and the king on e1, restricting its legal moves."
      },
      "evidence": {
        "line": [
          "d4",
          "Nf6",
          "c4",
          "e6",
          "Nc3",
          "Bb4"
        ],
        "focus": "Bb4"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "白がa3でb4のビショップを攻撃し、黒が...Bxc3+でナイトを取ったら、白は？",
        "options": [
          "白キングでKxc3と取り返す",
          "白ポーンd4でdxc3と取る",
          "bポーンでbxc3と取り返すことができる"
        ],
        "explanation": "b2の白ポーンはc3へ斜めに進んでビショップを取り返せる。ナイトのピンと交換の一例じゃ。"
      },
      "en": {
        "question": "If White plays a3 and Black captures the knight with ...Bxc3+, how can White recapture?",
        "options": [
          "With the king: Kxc3",
          "With the d4-pawn: dxc3",
          "With the b-pawn: bxc3"
        ],
        "explanation": "The pawn from b2 can recapture the bishop on c3, leaving a changed pawn structure."
      },
      "evidence": {
        "line": [
          "d4",
          "Nf6",
          "c4",
          "e6",
          "Nc3",
          "Bb4",
          "a3",
          "Bxc3+",
          "bxc3"
        ],
        "focus": "bxc3"
      }
    }
  },
  "op_dutch": {
    "why": {
      "answer": 1,
      "ja": {
        "question": "ダッチの初手...f5で黒ポーンが利かせる中央のマスは？",
        "options": [
          "d4",
          "e4",
          "c4"
        ],
        "explanation": "黒ポーンf5は斜め前のe4を攻撃する。一方、fポーンを動かすとキング周辺の守りにも影響する。"
      },
      "en": {
        "question": "Which central square does the pawn attack after ...f5 in the Dutch?",
        "options": [
          "d4",
          "e4",
          "c4"
        ],
        "explanation": "The pawn on f5 attacks e4, although moving the f-pawn also changes king-side defenses."
      },
      "evidence": {
        "line": [
          "d4",
          "f5"
        ],
        "focus": "f5"
      }
    },
    "defense": {
      "answer": 2,
      "ja": {
        "question": "この教材で黒が...Nf6も指したとき、f5ポーンとf6ナイトが共に攻撃するマスは？",
        "options": [
          "h7",
          "c4",
          "e4"
        ],
        "explanation": "f5のポーンもf6のナイトも、どちらもe4を攻撃する。中央の同じマスへ駒を集める形じゃ。"
      },
      "en": {
        "question": "After ...Nf6 in the Dutch example, which square is attacked by both the f5-pawn and the f6-knight?",
        "options": [
          "h7",
          "c4",
          "e4"
        ],
        "explanation": "Both the pawn on f5 and knight on f6 attack e4, concentrating pressure on a central square."
      },
      "evidence": {
        "line": [
          "d4",
          "f5",
          "c4",
          "Nf6"
        ],
        "focus": "Nf6"
      }
    }
  }
};
Object.assign(LESSON_REASONING, OPENING_REASONING);

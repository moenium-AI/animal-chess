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
          "ビショップc4がd5の黒ポーンをすぐ取れるようにする",
          "黒キングの近くのf7に圧力をかけながら展開する",
          "e4の白ポーンをビショップc4で直接守りながら展開する"
        ],
        "explanation": "c4のビショップはf7をにらむ。中央を占めたあと、駒を活用するイタリアンの基本じゃ。"
      },
      "en": {
        "question": "Why does White develop the bishop with 3.Bc4?",
        "options": [
          "To arrange an immediate bishop capture of Black's pawn on d5",
          "To develop while looking toward f7 near Black's king",
          "To develop the bishop chiefly to defend White's pawn on e4"
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
          "黒ビショップc5が白のe3ポーンに直接圧力をかける",
          "黒ビショップc5が白のd2ポーンを攻撃し、その場で取る",
          "黒もビショップを展開し、白のf2の方向へ利きを向ける"
        ],
        "explanation": "黒のc5ビショップはf2をにらみ、白のc4ビショップはf7をにらむ。両者の展開を比較してみよう。"
      },
      "en": {
        "question": "What does Black's ...Bc5 do after White plays Bc4?",
        "options": [
          "The bishop on c5 develops with its main attack directed at e3",
          "The bishop on c5 immediately attacks White's pawn on d2",
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
          "黒のf6ナイトを攻撃し、e4のポーンを守る役割を弱める",
          "黒のd7ポーンを直接攻撃し、黒の中央進出を妨げる"
        ],
        "explanation": "白ビショップb5が黒ナイトc6へ圧力をかける。ナイトはe5のポーンを守っている。"
      },
      "en": {
        "question": "Which black piece does 3.Bb5 pressure in the Ruy Lopez?",
        "options": [
          "The knight on c6 defending the e5 pawn",
          "The bishop threatens the knight on f6, weakening protection of e4",
          "The bishop attacks the pawn on d7 to prevent central counterplay"
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
          "Ba4でビショップはa6ポーンを直接取れる位置へ移る",
          "ビショップを失わず、c6ナイトへの圧力を残すため",
          "Ba4でビショップをc6ナイトから完全に遠ざけて交換を避ける"
        ],
        "explanation": "...a6はb5のビショップを攻撃する。Ba4で一歩引き、対角線によるナイトへの圧力を残す。"
      },
      "en": {
        "question": "Why does White retreat to Ba4 after ...a6?",
        "options": [
          "Ba4 places the bishop where it can immediately capture the a6-pawn",
          "It saves the bishop and keeps pressure on the knight at c6",
          "Ba4 removes the bishop's pressure on c6 to avoid any knight exchange"
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
          "黒のc5ポーンで白のe4ポーンを直ちに攻撃する",
          "黒のc5ポーンがb4だけを攻撃して中央は無視する",
          "黒のcポーンでd4のマスを攻撃する"
        ],
        "explanation": "c5の黒ポーンはd4を攻撃する。e5と左右対称に応じず、中央を側面から争うのじゃ。"
      },
      "en": {
        "question": "What does 1...c5 achieve in the Sicilian compared with ...e5?",
        "options": [
          "The pawn on c5 directly attacks White's e4-pawn immediately",
          "The pawn on c5 attacks b4 alone and leaves the center uncontested",
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
          "白はe4ポーンをd5へ動かしてcxd4を取り返す",
          "白はb1ナイトでc3を経由してd4をすぐ取り返す"
        ],
        "explanation": "白はNxd4で取り返し、ナイトを中央d4に置く。これは掲載したオープン・シチリアンの変化じゃ。"
      },
      "en": {
        "question": "In the displayed Sicilian, how does White recapture after ...cxd4?",
        "options": [
          "With the knight from f3: Nxd4",
          "White recaptures by moving the e4-pawn forward to d5",
          "White must recapture with the knight from b1 via c3 to d4"
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
          "...c5を最初に指してe6ポーンを中央へ移す準備",
          "...d5で白のe4・d4の中央に挑む",
          "...e5と進めて白のe4ポーンを黒ポーンで守る準備"
        ],
        "explanation": "...e6から...d5を支え、白の中央とぶつかるのがフレンチ・ディフェンスの典型じゃ。"
      },
      "en": {
        "question": "What central pawn move does 1...e6 prepare in the French Defense?",
        "options": [
          "It prepares ...c5 by transferring the e6-pawn into the center",
          "...d5 to challenge White's center",
          "It prepares ...e5 so Black's pawn on e6 can defend White's e4-pawn"
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
          "...h6で白ビショップを追い、f6ナイトをd8クイーンの前に残す",
          "...Qd7でクイーンを前に出し、f6ナイトの利きを消す",
          "...Be7で駒を展開し、ピンを和らげる"
        ],
        "explanation": "e7へビショップを出すことで、f6ナイトとd8クイーンの間に黒の駒が入り、白の圧力に対応する。"
      },
      "en": {
        "question": "What does Black play in the lesson after Bg5 pressures the f6-knight?",
        "options": [
          "Black plays ...h6 and keeps the knight between bishop and queen",
          "Black plays ...Qd7 to move the queen forward and remove the knight's attacks",
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
          "白のc4ポーンは黒のe6ポーンをすぐに取れる",
          "白のc4ポーンは黒のc7ポーンをまっすぐ攻撃する"
        ],
        "explanation": "c4の白ポーンはd5を攻撃する。中央を側面から崩す誘いじゃ。"
      },
      "en": {
        "question": "What does White's 2.c4 attack in the Queen's Gambit?",
        "options": [
          "Black's pawn on d5",
          "The pawn on c4 immediately attacks Black's pawn on e6",
          "The pawn on c4 attacks the pawn on c7 straight ahead"
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
          "...e6で黒はc4ポーンを取ったがd5の守りを失う",
          "c4を取らず、d5ポーンをe6から支えるから",
          "...e6で黒はd5を前へ押し出して白c4ポーンを取る"
        ],
        "explanation": "黒は白のc4ポーンをすぐ取らず、e6ポーンでd5を支える。"
      },
      "en": {
        "question": "Why is ...e6 a 'declined' Queen's Gambit response?",
        "options": [
          "Black captures the c4-pawn with ...e6 but weakens d5",
          "Black supports d5 with the e6-pawn instead of taking c4",
          "Black pushes the pawn from d5 forward and captures on c4"
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
          "c8のビショップをe6へ退いてd5を守る余地ができる",
          "c8のビショップがポーンc6を飛び越してd5を直接守る",
          "c8のビショップをe6ポーンで閉じ込める前に展開できる"
        ],
        "explanation": "...c6から...d5を作り、ビショップをf5に出せるのがカロ・カンの持ち味の一つじゃ。"
      },
      "en": {
        "question": "What is an advantage of ...Bf5 in the Caro-Kann compared with the French?",
        "options": [
          "The c8-bishop can retreat to e6 and directly guard d5",
          "The c8-bishop can jump over the pawn on c6 to defend d5",
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
          "白ナイトをg3へ動かしe5にいる黒ナイトを攻撃する",
          "白ナイトをg3へ動かしてf5のビショップを直接守る"
        ],
        "explanation": "白のNg3はe4のナイトをg3へ動かし、f5のビショップを攻撃する。この応手が指せるか盤面でも確認しよう。"
      },
      "en": {
        "question": "After ...Bf5 in the example, how does White challenge that bishop?",
        "options": [
          "Ng3 attacks it with the knight",
          "White's knight goes to g3 to attack a black knight on e5",
          "White's knight moves to g3 to defend Black's bishop on f5"
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
          "黒のc6ナイトにd4ポーンを取らせて白の中央を閉じる",
          "黒のe5ポーンに挑み、中央のラインを開くため",
          "d4ポーンで黒のc5ポーンを攻撃して即座に取る"
        ],
        "explanation": "d4でe5にぶつかり、ポーン交換からナイトを中央へ出せる形を作る。"
      },
      "en": {
        "question": "Why does 3.d4 lead to open central play in the Scotch Game?",
        "options": [
          "It invites the c6-knight to capture on d4 and close the center",
          "It challenges the e5-pawn and opens central lines",
          "The d4-pawn attacks and immediately captures a black pawn on c5"
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
          "白のc2ポーンをc4へ進めて黒のd4ポーンを取る",
          "白クイーンをd1からd4へ出してe5のポーンを守る",
          "f3のナイトで取り返してd4へ展開するため"
        ],
        "explanation": "f3ナイトがd4の黒ポーンを取り返す。中央の好位置にナイトを置く手じゃ。"
      },
      "en": {
        "question": "Why does White answer ...exd4 with Nxd4 in the lesson?",
        "options": [
          "White advances the c2-pawn to c4 to recapture the d4-pawn",
          "White's queen moves from d1 to d4 to defend the e5-pawn",
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
          "c3ナイトが黒クイーンのいるd5を白キングから遮る",
          "c3ナイトが黒クイーンd5を守って黒に時間を与える"
        ],
        "explanation": "ナイトc3の利きがd5へ届く。相手クイーンを攻撃しながら駒を展開できる。"
      },
      "en": {
        "question": "Why does Nc3 attack Black's queen after ...Qxd5?",
        "options": [
          "The knight on c3 attacks the queen on d5",
          "The knight on c3 blocks Black's queen on d5 from White's king",
          "The knight on c3 protects Black's queen on d5, giving Black time"
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
          "黒クイーンはd5からc6へ行き白ナイトを取る",
          "...Qa5でクイーンを攻撃から逃がす",
          "黒クイーンはd5に留まりc3ナイトの攻撃を受け続ける"
        ],
        "explanation": "...Qa5でクイーンを安全な場所へ退き、白のナイトの当たりを避ける。"
      },
      "en": {
        "question": "How does Black respond to Nc3's attack on the queen in the example?",
        "options": [
          "Black's queen leaves d5 to capture White's knight on c3 via c6",
          "...Qa5, moving the queen away from the knight's attack",
          "Black's queen stays on d5 despite the attack from the knight on c3"
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
          "...g6で黒ビショップをf8からe7へ出す斜め道を作る",
          "...Bg7とフィアンケットして長い対角線へビショップを置く",
          "...g6で黒のf6ナイトをg8へ戻しキングを守る"
        ],
        "explanation": "...g6はビショップをg7へ出す道を用意する。中央はあとからポーンで反撃する考え方じゃ。"
      },
      "en": {
        "question": "Why does Black play ...g6 in the King's Indian Defense?",
        "options": [
          "The pawn move ...g6 prepares a bishop route from f8 to e7",
          "To prepare ...Bg7 and fianchetto the bishop on a long diagonal",
          "Black uses ...g6 to retreat the f6-knight to g8 for defense"
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
          "...c5と指し白のe4ポーンをただちに取る反撃",
          "...f5と指して白キングへ一手で王手する反撃",
          "...e5で白の広い中央に挑む"
        ],
        "explanation": "黒は...d6と...O-Oを経て、...e5で白のe4・d4の中央に圧力をかける。"
      },
      "en": {
        "question": "After Black castles with ...O-O, what central counterstrike follows in the lesson?",
        "options": [
          "Black plays ...c5 to capture the white pawn on e4 immediately",
          "Black answers with ...f5, giving an immediate check against White's king",
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
          "白のc4ポーンがe5を直接狙い黒ポーンを追い払う",
          "c4の白ポーンはc5にいる相手の駒だけを攻撃する",
          "d5"
        ],
        "explanation": "c4の白ポーンは斜め前のd5を利かせる。e4やd4へ最初からポーンを置かない中央への働きかけじゃ。"
      },
      "en": {
        "question": "Which central square is attacked by the pawn after 1.c4 in the English?",
        "options": [
          "White's c4-pawn directly attacks e5 and drives away Black's pawn",
          "The pawn on c4 attacks only an enemy piece directly ahead on c5",
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
          "白はc4ポーンをc3へ戻し黒のd5ポーンを守る",
          "cxd5でd5の黒ポーンを取る",
          "白はc4からe6へ2マス斜めに進んで取り返す"
        ],
        "explanation": "白はc4からd5へポーンを進めて...d5の黒ポーンを取る。掲載された交換手順の一例じゃ。"
      },
      "en": {
        "question": "If Black expands with ...d5 in the lesson, what does White do?",
        "options": [
          "White withdraws the c4-pawn to c3 to defend Black's d5-pawn",
          "Capture the pawn on d5 with cxd5",
          "White's pawn on c4 captures diagonally two squares away on e6"
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
          "白のf4ポーンは黒のd5ポーンを斜めに攻撃する",
          "白のf4ポーンは黒のf7ポーンを同じ筋から攻撃する"
        ],
        "explanation": "f4の白ポーンはe5を攻撃する。中央を開いて主導権を狙う積極的な選択じゃ。"
      },
      "en": {
        "question": "What does the move 2.f4 attack in the King's Gambit?",
        "options": [
          "Black's pawn on e5",
          "White's pawn on f4 attacks Black's pawn on d5 diagonally",
          "The pawn on f4 attacks Black's f7-pawn along the same file"
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
          "黒は...Nc6でナイトを展開しながらf4ポーンを取る",
          "...Bc5でビショップを展開して拒否する",
          "黒は...d6でf4ポーンを直接取り、ギャンビットを受ける"
        ],
        "explanation": "黒は...Bc5と出てギャンビットを受けず、ビショップを活動させる変化を選ぶ。"
      },
      "en": {
        "question": "In the example, how does Black decline the offered pawn after 2.f4?",
        "options": [
          "Black plays ...Nc6 to develop a knight while capturing f4",
          "By developing with ...Bc5 instead of taking the pawn",
          "Black plays ...d6 to capture the f4-pawn and accept the gambit"
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
          "Nc3でe5の黒ポーンをすぐナイトで取れるようにする",
          "ナイトを展開し、後のf4による攻めを選択肢に残す",
          "Nc3でキング側キャスリングをただちに完了できる"
        ],
        "explanation": "白はナイトをc3へ出して中央を支え、次にf4と動く計画を残す。"
      },
      "en": {
        "question": "Why does White develop with 2.Nc3 in the Vienna Game?",
        "options": [
          "The knight on c3 immediately captures the e5-pawn",
          "To develop while keeping f4 as a possible later break",
          "Developing to c3 completes kingside castling on the same turn"
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
          "黒は...d5で白のf4ポーンを直接取って反撃する",
          "黒は...d5で白ナイトc3を取ってから中央に出る",
          "中央で反撃し、白に自由な攻めをさせない"
        ],
        "explanation": "黒は...d5と中央で切り返す。教材ではこれがf4に対する一つの受け方として示される。"
      },
      "en": {
        "question": "What is the point of Black's ...d5 after White plays f4?",
        "options": [
          "Black plays ...d5 to capture White's pawn on f4 immediately",
          "Black plays ...d5 to capture the knight on c3 before central play",
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
          "黒ナイトf6は白のf3ナイトを直接取ろうとする",
          "白のe4ポーンを黒ナイトで攻撃する",
          "黒ナイトf6は黒のe5ポーンを守るためだけに出る"
        ],
        "explanation": "黒はe5を直接守らず、...Nf6で白のe4を攻撃し返す。対称的なカウンターじゃ。"
      },
      "en": {
        "question": "What does 2...Nf6 do in the Petrov instead of defending e5 directly?",
        "options": [
          "Black's knight on f6 directly threatens to capture White's knight on f3",
          "Attack White's e4-pawn with Black's knight",
          "Black develops the knight only to protect the pawn on e5"
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
          "黒は...Nc6でe5ポーンを守り白ナイトを追い返す",
          "黒は...f6でf6ナイトを守りながらe5ポーンを取り返す",
          "...d6でe5ナイトを追い、次にe4を取り返す準備をする"
        ],
        "explanation": "まず...d6でe5のナイトを攻撃し、退いたあとに...Nxe4で取り返す手順じゃ。"
      },
      "en": {
        "question": "After White plays Nxe5 in the Petrov, what is Black's shown reply?",
        "options": [
          "Black plays ...Nc6 to defend e5 and drive away White's knight",
          "Black plays ...f6 to defend the knight and recapture the e5-pawn",
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
          "ビショップf4で黒のd5ポーンを直ちに取れる形を作る",
          "ビショップf4から黒キングe8へ直接王手するため"
        ],
        "explanation": "ロンドンではd4・Nf3・Bf4が代表的な駒組み。Bf4でビショップを外へ出す。"
      },
      "en": {
        "question": "Why does White play Bf4 in the London System?",
        "options": [
          "To develop the bishop from c1 to f4 and influence central squares",
          "The bishop on f4 gains an immediate capture of Black's d5-pawn",
          "The bishop on f4 delivers direct check to Black's king on e8"
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
          "...c5は合法だが白のd4ポーンには利きが届かない",
          "はい。...c5は合法で、d4の白ポーンを攻撃する",
          "...c5は白のf4ビショップを直接攻撃して交換を迫る"
        ],
        "explanation": "Bf4は黒の応手を封じるわけではない。この局面では...c5が合法でd4に圧力をかける。"
      },
      "en": {
        "question": "Can Black challenge the London with ...c5 after White's Bf4?",
        "options": [
          "...c5 is legal, but Black's pawn cannot attack the white pawn on d4",
          "Yes: ...c5 is legal and attacks White's pawn on d4",
          "...c5 primarily attacks White's bishop on f4 and forces an exchange"
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
          "c6ポーンは黒のe5マスを守り、d5の守りには参加しない",
          "c6ポーンはc4の白ポーンをまっすぐ攻撃するためにある",
          "d5のポーン"
        ],
        "explanation": "c6に黒ポーンを置くと、斜め前のd5を守れる。スラヴの堅実な中央構造じゃ。"
      },
      "en": {
        "question": "Which black pawn is supported by ...c6 in the Slav Defense?",
        "options": [
          "The pawn on c6 protects e5 but does not defend the pawn on d5",
          "Black's pawn on c6 attacks White's pawn on c4 directly ahead",
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
          "黒はd8のクイーンでd5を取り返してc6ポーンを残す",
          "黒はe7のポーンをd6へ進めてd5ポーンを取り返す"
        ],
        "explanation": "黒はc6のポーンでd5を取り返せる。c6によるポーンの守りが盤面で分かる変化じゃ。"
      },
      "en": {
        "question": "If White plays cxd5 after ...c6, how can Black recapture?",
        "options": [
          "With the c6-pawn: ...cxd5",
          "Black recaptures with its queen from d8 and leaves the c6-pawn intact",
          "Black advances the e7-pawn to d6 to recapture White's pawn on d5"
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
          "ビショップb4はd2ポーンの後ろの白クイーンd1を狙うから",
          "ナイトc3がキングを守っているため、どの白ポーンも動けないから"
        ],
        "explanation": "c3のナイトはb4のビショップとe1のキングの間にいる。キングを王手にさらす移動はできない。"
      },
      "en": {
        "question": "Why does ...Bb4 pin the c3-knight in the Nimzo-Indian?",
        "options": [
          "Moving the knight exposes the diagonal from the bishop on b4 to White's king on e1",
          "The bishop on b4 attacks the queen on d1 behind the pawn on d2",
          "The knight on c3 protects the king so none of White's pawns may move"
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
          "白はd4ポーンをc3へ斜めに下げて交換を完成させる",
          "白はクイーンd1でc2を通りc3のビショップを取る",
          "bポーンでbxc3と取り返すことができる"
        ],
        "explanation": "b2の白ポーンはc3へ斜めに進んでビショップを取り返せる。ナイトのピンと交換の一例じゃ。"
      },
      "en": {
        "question": "If White plays a3 and Black captures the knight with ...Bxc3+, how can White recapture?",
        "options": [
          "White retreats its pawn from d4 to c3 to finish the exchange",
          "White's queen travels via c2 to c3 to recapture the bishop",
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
          "黒ポーンf5は白のd4ポーンを斜めに直接攻撃する",
          "e4",
          "黒ポーンf5は白のg3マスだけを狙いe4には利かない"
        ],
        "explanation": "黒ポーンf5は斜め前のe4を攻撃する。一方、fポーンを動かすとキング周辺の守りにも影響する。"
      },
      "en": {
        "question": "Which central square does the pawn attack after ...f5 in the Dutch?",
        "options": [
          "The pawn on f5 attacks White's pawn on d4 diagonally",
          "e4",
          "The f5-pawn attacks g3 alone and has no influence over e4"
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
          "f6ナイトとf5ポーンがそれぞれd5を同時に攻撃する",
          "f6ナイトがd4、f5ポーンがg4を攻撃し目標は別々",
          "e4"
        ],
        "explanation": "f5のポーンもf6のナイトも、どちらもe4を攻撃する。中央の同じマスへ駒を集める形じゃ。"
      },
      "en": {
        "question": "After ...Nf6 in the Dutch example, which square is attacked by both the f5-pawn and the f6-knight?",
        "options": [
          "Both the knight on f6 and pawn on f5 attack d5 together",
          "The knight on f6 targets d4 while the f5-pawn targets g4 instead",
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

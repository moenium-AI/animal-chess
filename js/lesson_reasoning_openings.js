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
          "d5ポーンを取る",
          "黒キングの近くのf7に圧力をかけながら展開する",
          "e4ポーンを守る"
        ],
        "explanation": "c4のビショップはf7をにらむ。中央を占めたあと、駒を活用するイタリアンの基本じゃ。"
      },
      "en": {
        "question": "Why does White develop the bishop with 3.Bc4?",
        "options": [
          "To take the d5-pawn",
          "To develop while looking toward f7 near Black's king",
          "To guard the e4-pawn"
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
          "白d2を狙う",
          "黒ビショップc5が白のd2ポーンを攻撃し、その場で取る",
          "黒もビショップを展開し、白のf2の方向へ利きを向ける"
        ],
        "explanation": "黒のc5ビショップはf2をにらみ、白のc4ビショップはf7をにらむ。両者の展開を比較してみよう。"
      },
      "en": {
        "question": "What does Black's ...Bc5 do after White plays Bc4?",
        "options": [
          "To target d2",
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
          "a6ポーンを取る",
          "ビショップを失わず、c6ナイトへの圧力を残すため",
          "c6ナイトを見捨てる"
        ],
        "explanation": "...a6はb5のビショップを攻撃する。Ba4で一歩引き、対角線によるナイトへの圧力を残す。"
      },
      "en": {
        "question": "Why does White retreat to Ba4 after ...a6?",
        "options": [
          "To capture a6",
          "It saves the bishop and keeps pressure on the knight at c6",
          "To abandon c6"
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
          "e4を取るため",
          "黒のc5ポーンがb4だけを攻撃して中央は無視する",
          "黒のcポーンでd4のマスを攻撃する"
        ],
        "explanation": "c5の黒ポーンはd4を攻撃する。e5と左右対称に応じず、中央を側面から争うのじゃ。"
      },
      "en": {
        "question": "What does 1...c5 achieve in the Sicilian compared with ...e5?",
        "options": [
          "To capture e4",
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
          "exd4で取り返す",
          "白はb1ナイトでc3を経由してd4をすぐ取り返す"
        ],
        "explanation": "白はNxd4で取り返し、ナイトを中央d4に置く。これは掲載したオープン・シチリアンの変化じゃ。"
      },
      "en": {
        "question": "In the displayed Sicilian, how does White recapture after ...cxd4?",
        "options": [
          "With the knight from f3: Nxd4",
          "Recapture with exd4",
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
          "...e5へ進むため",
          "...d5で白のe4・d4の中央に挑む",
          "...e5と進めて白のe4ポーンを黒ポーンで守る準備"
        ],
        "explanation": "...e6から...d5を支え、白の中央とぶつかるのがフレンチ・ディフェンスの典型じゃ。"
      },
      "en": {
        "question": "What central pawn move does 1...e6 prepare in the French Defense?",
        "options": [
          "To push ...e5",
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
          "...h6で追い払う",
          "...Qd7で守る",
          "...Be7で駒を展開し、ピンを和らげる"
        ],
        "explanation": "e7へビショップを出すことで、f6ナイトとd8クイーンの間に黒の駒が入り、白の圧力に対応する。"
      },
      "en": {
        "question": "What does Black play in the lesson after Bg5 pressures the f6-knight?",
        "options": [
          "To play ...h6",
          "To defend with ...Qd7",
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
          "e6ポーン",
          "白のc4ポーンは黒のc7ポーンをまっすぐ攻撃する"
        ],
        "explanation": "c4の白ポーンはd5を攻撃する。中央を側面から崩す誘いじゃ。"
      },
      "en": {
        "question": "What does White's 2.c4 attack in the Queen's Gambit?",
        "options": [
          "Black's pawn on d5",
          "Pawn on e6",
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
          "c4を取って守る",
          "c4を取らず、d5ポーンをe6から支えるから",
          "d5ポーンを進める"
        ],
        "explanation": "黒は白のc4ポーンをすぐ取らず、e6ポーンでd5を支える。"
      },
      "en": {
        "question": "Why is ...e6 a 'declined' Queen's Gambit response?",
        "options": [
          "To capture c4",
          "Black supports d5 with the e6-pawn instead of taking c4",
          "To advance d5"
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
          "c8のビショップをe6へ戻す",
          "c8ビショップでd5を守る",
          "c8のビショップをe6ポーンで閉じ込める前に展開できる"
        ],
        "explanation": "...c6から...d5を作り、ビショップをf5に出せるのがカロ・カンの持ち味の一つじゃ。"
      },
      "en": {
        "question": "What is an advantage of ...Bf5 in the Caro-Kann compared with the French?",
        "options": [
          "To retreat bishop to e6",
          "To defend d5 with bishop",
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
          "中央を閉じるため",
          "黒のe5ポーンに挑み、中央のラインを開くため",
          "c5ポーンを取るため"
        ],
        "explanation": "d4でe5にぶつかり、ポーン交換からナイトを中央へ出せる形を作る。"
      },
      "en": {
        "question": "Why does 3.d4 lead to open central play in the Scotch Game?",
        "options": [
          "To close the center",
          "It challenges the e5-pawn and opens central lines",
          "To capture a pawn on c5"
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
        "question": "黒が...exd4と取ったあと、白がQxd4ではなくNxd4とする主な利点は？",
        "options": [
          "クイーンd1を先に出せば黒はそのクイーンを攻撃できないから",
          "ナイトd4が黒のすべてのポーンを動けなくするから",
          "f3のナイトで取り返しながら中央へ展開し、クイーンの早出しを避けられるから"
        ],
        "explanation": "Nxd4はポーンを取り返すと同時に、f3のナイトを中央のd4へ活用する。Qxd4も合法だが、クイーンを早く出すと相手が駒の展開とともに攻撃してテンポを得る場合がある。"
      },
      "en": {
        "question": "After ...exd4, what is the main advantage of Nxd4 instead of Qxd4?",
        "options": [
          "Developing the queen to d4 first prevents Black from attacking it",
          "A knight on d4 makes every black pawn unable to move",
          "The knight from f3 recaptures while developing centrally and avoids exposing the queen early"
        ],
        "explanation": "Nxd4 recaptures the pawn and improves the knight from f3 to a central square. Qxd4 is legal too, but an early queen sortie can allow the opponent to develop with tempo by attacking it."
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
          "d5を守るため",
          "c3でチェックするため"
        ],
        "explanation": "ナイトc3の利きがd5へ届く。相手クイーンを攻撃しながら駒を展開できる。"
      },
      "en": {
        "question": "Why does Nc3 attack Black's queen after ...Qxd5?",
        "options": [
          "The knight on c3 attacks the queen on d5",
          "To protect d5",
          "To check from c3"
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
          "...Qc6と逃げる",
          "...Qa5でクイーンを攻撃から逃がす",
          "黒クイーンはd5に留まりc3ナイトの攻撃を受け続ける"
        ],
        "explanation": "...Qa5でクイーンを安全な場所へ退き、白のナイトの当たりを避ける。"
      },
      "en": {
        "question": "How does Black respond to Nc3's attack on the queen in the example?",
        "options": [
          "To retreat ...Qc6",
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
          "...Be7を準備",
          "...Bg7とフィアンケットして長い対角線へビショップを置く",
          "...Ng8を準備"
        ],
        "explanation": "...g6はビショップをg7へ出す道を用意する。中央はあとからポーンで反撃する考え方じゃ。"
      },
      "en": {
        "question": "Why does Black play ...g6 in the King's Indian Defense?",
        "options": [
          "To prepare ...Be7",
          "To prepare ...Bg7 and fianchetto the bishop on a long diagonal",
          "To prepare ...Ng8"
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
        "question": "白に広い中央を許した黒が、キャスリング後に...e5と指す狙いは？",
        "options": [
          "白の中央のポーンを無視し、黒のキングをすぐ攻めるため",
          "黒のeポーンをe5からe7へ戻し、守りを固めるため",
          "中央の白ポーンに圧力をかけ、遅れて中央の主導権を争うため"
        ],
        "explanation": "キングス・インディアンでは黒がいったん白に中央を広げさせ、駒を展開してキングを安全にしてから...e5で反撃する。ポーンで中央へ働きかける理由を考えよう。"
      },
      "en": {
        "question": "Why does Black play ...e5 after castling despite allowing White a broad pawn center?",
        "options": [
          "To ignore the central pawns and attack White's king immediately",
          "To retreat Black's e-pawn from e5 to e7 and strengthen the defense",
          "To challenge White's center and contest central control after completing development"
        ],
        "explanation": "In the King's Indian, Black initially allows White a broad center, develops pieces and castles, then challenges central control with ...e5. The move is a purposeful pawn break rather than passive play."
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
          "c5",
          "c4の白ポーンはc5にいる相手の駒だけを攻撃する",
          "d5"
        ],
        "explanation": "c4の白ポーンは斜め前のd5を利かせる。e4やd4へ最初からポーンを置かない中央への働きかけじゃ。"
      },
      "en": {
        "question": "Which central square is attacked by the pawn after 1.c4 in the English?",
        "options": [
          "e4",
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
          "c3へ戻す",
          "cxd5でd5の黒ポーンを取る",
          "白はc4からe6へ2マス斜めに進んで取り返す"
        ],
        "explanation": "白はc4からd5へポーンを進めて...d5の黒ポーンを取る。掲載された交換手順の一例じゃ。"
      },
      "en": {
        "question": "If Black expands with ...d5 in the lesson, what does White do?",
        "options": [
          "To retreat to c3",
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
          "d5ポーン",
          "白のf4ポーンは黒のf7ポーンを同じ筋から攻撃する"
        ],
        "explanation": "f4の白ポーンはe5を攻撃する。中央を開いて主導権を狙う積極的な選択じゃ。"
      },
      "en": {
        "question": "What does the move 2.f4 attack in the King's Gambit?",
        "options": [
          "Black's pawn on e5",
          "The d5-pawn",
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
          "...Nc6で取る",
          "...Bc5でビショップを展開して拒否する",
          "...d6で取る"
        ],
        "explanation": "黒は...Bc5と出てギャンビットを受けず、ビショップを活動させる変化を選ぶ。"
      },
      "en": {
        "question": "In the example, how does Black decline the offered pawn after 2.f4?",
        "options": [
          "To capture via ...Nc6",
          "By developing with ...Bc5 instead of taking the pawn",
          "To capture via ...d6"
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
          "e5をすぐ取る",
          "ナイトを展開し、後のf4による攻めを選択肢に残す",
          "次にO-Oを完了"
        ],
        "explanation": "白はナイトをc3へ出して中央を支え、次にf4と動く計画を残す。"
      },
      "en": {
        "question": "Why does White develop with 2.Nc3 in the Vienna Game?",
        "options": [
          "To capture e5 now",
          "To develop while keeping f4 as a possible later break",
          "To castle O-O"
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
          "f4を取るため",
          "黒は...d5で白ナイトc3を取ってから中央に出る",
          "中央で反撃し、白に自由な攻めをさせない"
        ],
        "explanation": "黒は...d5と中央で切り返す。教材ではこれがf4に対する一つの受け方として示される。"
      },
      "en": {
        "question": "What is the point of Black's ...d5 after White plays f4?",
        "options": [
          "To capture f4",
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
          "白ナイトf3を取る",
          "白のe4ポーンを黒ナイトで攻撃する",
          "黒ナイトf6は黒のe5ポーンを守るためだけに出る"
        ],
        "explanation": "黒はe5を直接守らず、...Nf6で白のe4を攻撃し返す。対称的なカウンターじゃ。"
      },
      "en": {
        "question": "What does 2...Nf6 do in the Petrov instead of defending e5 directly?",
        "options": [
          "To capture the f3-knight",
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
        "question": "黒が白のNxe5にすぐ...Nxe4とせず、先に...d6を挟む狙いは？",
        "options": [
          "黒キングをd6へ出して、白ナイトを直接取れるようにする",
          "黒はe4ポーンを取る権利を失うので、...d6で引き分けを申し出る",
          "e5の白ナイトを追ってから...Nxe4で取り返し、白の早いクイーン攻撃を避けるため"
        ],
        "explanation": "...d6でe5のナイトを攻撃し、退かせてから...Nxe4でe4ポーンを取り返す。すぐ...Nxe4と取ると、Qe2で黒ナイトがピンされるなど、白からテンポを得る手がある。手順の違いが重要じゃ。"
      },
      "en": {
        "question": "Why does Black insert ...d6 instead of immediately recapturing on e4 after Nxe5?",
        "options": [
          "To move Black's king to d6 so it can take the white knight",
          "Black permanently loses the right to take the e4-pawn and offers a draw with ...d6",
          "To drive the knight from e5 before ...Nxe4, avoiding early queen pressure"
        ],
        "explanation": "...d6 first attacks the knight on e5, then ...Nxe4 can recover the pawn after the knight retreats. An immediate ...Nxe4 gives White tactical chances such as Qe2, attacking the pinned knight. Move order matters."
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
          "d5をすぐ取る",
          "e8王にチェックする"
        ],
        "explanation": "ロンドンではd4・Nf3・Bf4が代表的な駒組み。Bf4でビショップを外へ出す。"
      },
      "en": {
        "question": "Why does White play Bf4 in the London System?",
        "options": [
          "To develop the bishop from c1 to f4 and influence central squares",
          "To capture d5",
          "To check the king e8"
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
          "d4に利かない",
          "はい。...c5は合法で、d4の白ポーンを攻撃する",
          "...c5でf4を狙う"
        ],
        "explanation": "Bf4は黒の応手を封じるわけではない。この局面では...c5が合法でd4に圧力をかける。"
      },
      "en": {
        "question": "Can Black challenge the London with ...c5 after White's Bf4?",
        "options": [
          "No attack on d4",
          "Yes: ...c5 is legal and attacks White's pawn on d4",
          "To target bishop f4"
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
          "e5ポーン",
          "c6ポーンはc4の白ポーンをまっすぐ攻撃するためにある",
          "d5のポーン"
        ],
        "explanation": "c6に黒ポーンを置くと、斜め前のd5を守れる。スラヴの堅実な中央構造じゃ。"
      },
      "en": {
        "question": "Which black pawn is supported by ...c6 in the Slav Defense?",
        "options": [
          "Pawn on e5",
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
          "...Qxd5で取る",
          "黒はe7のポーンをd6へ進めてd5ポーンを取り返す"
        ],
        "explanation": "黒はc6のポーンでd5を取り返せる。c6によるポーンの守りが盤面で分かる変化じゃ。"
      },
      "en": {
        "question": "If White plays cxd5 after ...c6, how can Black recapture?",
        "options": [
          "With the c6-pawn: ...cxd5",
          "To recapture ...Qxd5",
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
        "explanation": "c3のナイトはb4のビショップとe1のキングの間にいる。キングをチェックにさらす移動はできない。"
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
          "dxc3で取り返す",
          "白はクイーンd1でc2を通りc3のビショップを取る",
          "bポーンでbxc3と取り返すことができる"
        ],
        "explanation": "b2の白ポーンはc3へ斜めに進んでビショップを取り返せる。ナイトのピンと交換の一例じゃ。"
      },
      "en": {
        "question": "If White plays a3 and Black captures the knight with ...Bxc3+, how can White recapture?",
        "options": [
          "To recapture dxc3",
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
          "c4",
          "e4",
          "黒ポーンf5は白のg3マスだけを狙いe4には利かない"
        ],
        "explanation": "黒ポーンf5は斜め前のe4を攻撃する。一方、fポーンを動かすとキング周辺の守りにも影響する。"
      },
      "en": {
        "question": "Which central square does the pawn attack after ...f5 in the Dutch?",
        "options": [
          "g3",
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
          "f4",
          "f6ナイトがd4、f5ポーンがg4を攻撃し目標は別々",
          "e4"
        ],
        "explanation": "f5のポーンもf6のナイトも、どちらもe4を攻撃する。中央の同じマスへ駒を集める形じゃ。"
      },
      "en": {
        "question": "After ...Nf6 in the Dutch example, which square is attacked by both the f5-pawn and the f6-knight?",
        "options": [
          "c4",
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

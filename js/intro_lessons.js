// Original bilingual introductory chess lessons. Practice asks for the demonstrated move.
const INTRO_LESSONS = [
  {
    "id": "bk_board",
    "cat": "basics",
    "fen": null,
    "title": "64マスのチェス盤",
    "intro": "盤には縦8列・横8段の64マスがあります。白が先手で、マスはe2などの名前で呼びます。",
    "takeaway": "e2のポーンをe4へ進め、マスの名前を覚えよう。",
    "moves": [
      {
        "san": "e4",
        "note": "e2のポーンをe4へ進め、マスの名前を覚えよう。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "e2のひよこをe4へ動かそう。",
      "hint": "e列の2段目から4段目へ。"
    },
    "en": {
      "title": "The 64-square board",
      "intro": "There are eight files and eight ranks; White moves first. Squares have names such as e2.",
      "takeaway": "Move the e2 pawn to e4 to learn coordinates.",
      "moves": [
        {
          "san": "e4",
          "note": "Move the e2 pawn to e4 to learn coordinates."
        }
      ],
      "practice": {
        "prompt": "Move the pawn from e2 to e4.",
        "hint": "Select e2, then e4."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "bk_pawn",
    "cat": "basics",
    "fen": null,
    "title": "ポーン（ひよこ）の進み方",
    "intro": "ポーンは1マス前へ進み、最初だけ2マス進めます。後ろには戻れません。取るときは斜め前へ進みます。",
    "takeaway": "d2のポーンがd4へ2マス進みます。",
    "moves": [
      {
        "san": "d4",
        "note": "d2のポーンがd4へ2マス進みます。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "d2のポーンをd4へ進めよう。",
      "hint": "最初の移動なので2マス進めます。"
    },
    "en": {
      "title": "How pawns move",
      "intro": "Pawns advance one square, or two from their starting square. They capture diagonally and cannot retreat.",
      "takeaway": "The pawn moves from d2 to d4.",
      "moves": [
        {
          "san": "d4",
          "note": "The pawn moves from d2 to d4."
        }
      ],
      "practice": {
        "prompt": "Move the pawn from d2 to d4.",
        "hint": "It may advance two squares on its first move."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "bk_rook",
    "cat": "basics",
    "fen": "4k3/8/8/8/8/8/R7/4K3 w - - 0 1",
    "title": "ルーク（くま）は縦横へ",
    "intro": "ルークは縦横に好きなだけ進めます。駒を飛び越えることはできません。",
    "takeaway": "a2からa8へ直進し、8段目のキングに王手をかけます。",
    "moves": [
      {
        "san": "Ra8+",
        "note": "a2からa8へ直進し、8段目のキングに王手をかけます。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "a2のルークをa8へ動かそう。",
      "hint": "a列を上までまっすぐ。"
    },
    "en": {
      "title": "How rooks move",
      "intro": "Rooks travel along open ranks and files without jumping over pieces.",
      "takeaway": "Moving a2 to a8 gives check along the eighth rank.",
      "moves": [
        {
          "san": "Ra8+",
          "note": "Moving a2 to a8 gives check along the eighth rank."
        }
      ],
      "practice": {
        "prompt": "Move the rook from a2 to a8.",
        "hint": "Travel straight up the a-file."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "bk_bishop",
    "cat": "basics",
    "fen": null,
    "title": "ビショップ（ふくろう）は斜め",
    "intro": "ビショップは斜めに動き、同じ色のマスにずっととどまります。途中の駒を飛び越えられません。",
    "takeaway": "e4で道が開き、f1のビショップがc4へ進みます。",
    "moves": [
      {
        "san": "e4",
        "note": "e4で道が開き、f1のビショップがc4へ進みます。"
      },
      {
        "san": "e5",
        "note": "e4で道が開き、f1のビショップがc4へ進みます。"
      },
      {
        "san": "Bc4",
        "note": "e4で道が開き、f1のビショップがc4へ進みます。"
      }
    ],
    "practice": {
      "ply": 2,
      "prompt": "f1のビショップをc4へ動かそう。",
      "hint": "f1→e2→d3→c4。"
    },
    "en": {
      "title": "How bishops move",
      "intro": "Bishops slide diagonally, remaining on the same square color; they cannot jump.",
      "takeaway": "After e4 clears the path, the f1 bishop goes to c4.",
      "moves": [
        {
          "san": "e4",
          "note": "After e4 clears the path, the f1 bishop goes to c4."
        },
        {
          "san": "e5",
          "note": "After e4 clears the path, the f1 bishop goes to c4."
        },
        {
          "san": "Bc4",
          "note": "After e4 clears the path, the f1 bishop goes to c4."
        }
      ],
      "practice": {
        "prompt": "Move the bishop from f1 to c4.",
        "hint": "Follow the diagonal through e2 and d3."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "bk_knight",
    "cat": "basics",
    "fen": null,
    "title": "ナイト（うま）はL字に跳ぶ",
    "intro": "ナイトは縦2マスと横1マスのL字に跳びます。唯一ほかの駒を飛び越えられる駒です。",
    "takeaway": "g1のナイトがf3へ跳びます。",
    "moves": [
      {
        "san": "Nf3",
        "note": "g1のナイトがf3へ跳びます。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "g1のナイトをf3へ動かそう。",
      "hint": "2マスと1マスのL字。"
    },
    "en": {
      "title": "How knights move",
      "intro": "Knights jump in an L shape and can hop over pieces.",
      "takeaway": "The g1 knight jumps to f3.",
      "moves": [
        {
          "san": "Nf3",
          "note": "The g1 knight jumps to f3."
        }
      ],
      "practice": {
        "prompt": "Jump the knight from g1 to f3.",
        "hint": "Think of a two-plus-one L."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "bk_queen",
    "cat": "basics",
    "fen": "4k3/8/8/8/8/8/Q7/4K3 w - - 0 1",
    "title": "クイーン（ねこ）は万能",
    "intro": "クイーンは縦・横・斜めへ何マスでも進めますが、駒は飛び越えられません。",
    "takeaway": "a2からe2へ横移動し、e列から黒キングへ王手をかけます。",
    "moves": [
      {
        "san": "Qe2+",
        "note": "a2からe2へ横移動し、e列から黒キングへ王手をかけます。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "a2のクイーンをe2へ動かそう。",
      "hint": "同じ横列を進みます。"
    },
    "en": {
      "title": "How queens move",
      "intro": "Queens travel along ranks, files and diagonals but cannot jump.",
      "takeaway": "From a2 to e2, the queen checks the king on the e-file.",
      "moves": [
        {
          "san": "Qe2+",
          "note": "From a2 to e2, the queen checks the king on the e-file."
        }
      ],
      "practice": {
        "prompt": "Move the queen from a2 to e2.",
        "hint": "Both squares are on the same rank."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "bk_king",
    "cat": "basics",
    "fen": "7k/p7/8/8/8/8/8/4K3 w - - 0 1",
    "title": "キング（ライオン）は1歩",
    "intro": "キングはどの方向にも1マスだけ動けます。ただし敵の利きがあるマスへは移動できません。",
    "takeaway": "e1のキングがd2へ1マス進みます。",
    "moves": [
      {
        "san": "Kd2",
        "note": "e1のキングがd2へ1マス進みます。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "e1のキングをd2へ動かそう。",
      "hint": "キングは斜めにも1歩進めます。"
    },
    "en": {
      "title": "How kings move",
      "intro": "Kings move one square in any direction but may not step into check.",
      "takeaway": "The king steps diagonally from e1 to d2.",
      "moves": [
        {
          "san": "Kd2",
          "note": "The king steps diagonally from e1 to d2."
        }
      ],
      "practice": {
        "prompt": "Move the king from e1 to d2.",
        "hint": "Kings can step diagonally."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "bk_capture",
    "cat": "basics",
    "fen": "4k3/8/8/3p4/4P3/8/8/4K3 w - - 0 1",
    "title": "相手の駒を取ろう",
    "intro": "相手の駒のあるマスへ移動すると、その駒を取れます。ポーンは斜め前へ取ります。",
    "takeaway": "e4のポーンがd5の黒ポーンを取ります。",
    "moves": [
      {
        "san": "exd5",
        "note": "e4のポーンがd5の黒ポーンを取ります。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "e4の白ポーンでd5の黒ポーンを取ろう。",
      "hint": "ポーンは斜め前へ取ります。"
    },
    "en": {
      "title": "How captures work",
      "intro": "Moving onto an opponent's piece captures it. Pawns capture diagonally.",
      "takeaway": "The pawn from e4 captures on d5.",
      "moves": [
        {
          "san": "exd5",
          "note": "The pawn from e4 captures on d5."
        }
      ],
      "practice": {
        "prompt": "Capture the pawn on d5 using e4.",
        "hint": "Pawns capture diagonally forward."
      }
    },
    "puzzleTheme": "capture"
  },
  {
    "id": "bk_check",
    "cat": "basics",
    "fen": "4k3/8/8/8/8/8/7R/4K3 w - - 0 1",
    "title": "王手（チェック）とは",
    "intro": "相手のキングを攻撃すると王手です。王手を受けたら必ず危険をなくさなければなりません。",
    "takeaway": "h2からe2にルークを動かすと王手になります。「+」は王手の記号です。",
    "moves": [
      {
        "san": "Re2+",
        "note": "h2からe2にルークを動かすと王手になります。「+」は王手の記号です。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "h2のルークをe2に動かそう。",
      "hint": "黒キングと同じe列にルークを置きます。"
    },
    "en": {
      "title": "What is check?",
      "intro": "Check means attacking the king. The threatened player must resolve the check immediately.",
      "takeaway": "The rook moves from h2 to e2 to give check. + means check.",
      "moves": [
        {
          "san": "Re2+",
          "note": "The rook moves from h2 to e2 to give check. + means check."
        }
      ],
      "practice": {
        "prompt": "Move the rook from h2 to e2.",
        "hint": "Line up with the king on the e-file."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "bk_mate",
    "cat": "basics",
    "fen": null,
    "title": "チェックメイトで勝つ",
    "intro": "王手から逃れる合法手がなければチェックメイト。キングを取らずに勝敗が決まります。",
    "takeaway": "白の弱点を突き、黒クイーンがh4へ出てメイト。「#」はチェックメイトです。",
    "moves": [
      {
        "san": "f3",
        "note": "白の弱点を突き、黒クイーンがh4へ出てメイト。「#」はチェックメイトです。"
      },
      {
        "san": "e5",
        "note": "白の弱点を突き、黒クイーンがh4へ出てメイト。「#」はチェックメイトです。"
      },
      {
        "san": "g4",
        "note": "白の弱点を突き、黒クイーンがh4へ出てメイト。「#」はチェックメイトです。"
      },
      {
        "san": "Qh4#",
        "note": "白の弱点を突き、黒クイーンがh4へ出てメイト。「#」はチェックメイトです。"
      }
    ],
    "practice": {
      "ply": 3,
      "prompt": "黒クイーンをd8からh4へ動かそう。",
      "hint": "d8からh4への斜めの道を使います。"
    },
    "en": {
      "title": "Win by checkmate",
      "intro": "Checkmate occurs when a king is attacked with no legal escape. The king is never captured.",
      "takeaway": "The queen reaches h4 and delivers mate. # marks checkmate.",
      "moves": [
        {
          "san": "f3",
          "note": "The queen reaches h4 and delivers mate. # marks checkmate."
        },
        {
          "san": "e5",
          "note": "The queen reaches h4 and delivers mate. # marks checkmate."
        },
        {
          "san": "g4",
          "note": "The queen reaches h4 and delivers mate. # marks checkmate."
        },
        {
          "san": "Qh4#",
          "note": "The queen reaches h4 and delivers mate. # marks checkmate."
        }
      ],
      "practice": {
        "prompt": "Move Black's queen from d8 to h4.",
        "hint": "Use the open diagonal."
      }
    },
    "puzzleTheme": "backrank"
  },
  {
    "id": "bk_castling",
    "cat": "basics",
    "fen": "r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1",
    "title": "キャスリングを覚えよう",
    "intro": "キングとルークを同時に動かす特別な手です。途中は空で、キングは王手から・王手を通って・王手へは動けません。両方未移動であることも必要です。",
    "takeaway": "e1のキングがg1へ、h1のルークがf1へ移動します。",
    "moves": [
      {
        "san": "O-O",
        "note": "e1のキングがg1へ、h1のルークがf1へ移動します。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "e1のキングをg1へ動かそう。",
      "hint": "キングを2マス右へ動かしてキャスリング。"
    },
    "en": {
      "title": "Learn castling",
      "intro": "Castling moves king and rook together. Their path must be clear, neither may have moved, and the king cannot castle out of, through or into check.",
      "takeaway": "The king goes e1–g1 and the rook h1–f1.",
      "moves": [
        {
          "san": "O-O",
          "note": "The king goes e1–g1 and the rook h1–f1."
        }
      ],
      "practice": {
        "prompt": "Move the king from e1 to g1.",
        "hint": "Move the king two squares toward its rook."
      }
    },
    "puzzleTheme": "castling"
  },
  {
    "id": "bk_promotion",
    "cat": "basics",
    "fen": "4k3/P7/8/8/8/8/8/4K3 w - - 0 1",
    "title": "ポーンが昇格する",
    "intro": "ポーンは一番奥まで進むと、クイーン・ルーク・ビショップ・ナイトのいずれかに変身します。",
    "takeaway": "a7からa8へ進み、クイーンに昇格します。",
    "moves": [
      {
        "san": "a8=Q+",
        "note": "a7からa8へ進み、クイーンに昇格します。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "a7のポーンをa8へ進め、クイーンを選ぼう。",
      "hint": "a8へ進んだら昇格画面でクイーンを選びます。"
    },
    "en": {
      "title": "Pawn promotion",
      "intro": "A pawn reaching the last rank becomes a queen, rook, bishop or knight.",
      "takeaway": "The pawn promotes on a8 to a queen.",
      "moves": [
        {
          "san": "a8=Q+",
          "note": "The pawn promotes on a8 to a queen."
        }
      ],
      "practice": {
        "prompt": "Move the pawn from a7 to a8 and choose a queen.",
        "hint": "Choose queen in the promotion dialog."
      }
    },
    "puzzleTheme": "promotion"
  },
  {
    "id": "bk_enpassant",
    "cat": "basics",
    "fen": "4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1",
    "title": "アンパッサンとは",
    "intro": "相手ポーンが初手で2マス進んで自分の隣へ来た直後だけ、通り過ぎたマスで取れる特別なルールです。",
    "takeaway": "黒がd5へ2マス進んだ直後、白ポーンはe5からd6へ進み、黒ポーンを取れます。",
    "moves": [
      {
        "san": "d5",
        "note": "黒がd5へ2マス進んだ直後、白ポーンはe5からd6へ進み、黒ポーンを取れます。"
      },
      {
        "san": "exd6",
        "note": "黒がd5へ2マス進んだ直後、白ポーンはe5からd6へ進み、黒ポーンを取れます。"
      }
    ],
    "practice": {
      "ply": 1,
      "prompt": "e5の白ポーンをd6へ動かそう。",
      "hint": "2マス進んだ直後だけ有効です。"
    },
    "en": {
      "title": "En passant",
      "intro": "Immediately after an enemy pawn advances two squares beside yours, you can capture it as if it advanced one.",
      "takeaway": "After ...d5, the white pawn moves e5–d6 and captures en passant.",
      "moves": [
        {
          "san": "d5",
          "note": "After ...d5, the white pawn moves e5–d6 and captures en passant."
        },
        {
          "san": "exd6",
          "note": "After ...d5, the white pawn moves e5–d6 and captures en passant."
        }
      ],
      "practice": {
        "prompt": "Move the white pawn from e5 to d6.",
        "hint": "This capture is available only immediately after ...d5."
      }
    },
    "puzzleTheme": "enpassant"
  },
  {
    "id": "bk_stalemate",
    "cat": "basics",
    "fen": "7k/8/6K1/5Q2/8/8/8/8 w - - 0 1",
    "title": "ステイルメイトは引き分け",
    "intro": "王手ではないのに手番側が合法手を一つも指せないとステイルメイトで引き分け。勝ちそうな局面でも注意。",
    "takeaway": "Qf7は王手にならず黒に合法手がなくなる失敗例です。これは勝つための良い手ではありません。",
    "moves": [
      {
        "san": "Qf7",
        "note": "Qf7は王手にならず黒に合法手がなくなる失敗例です。これは勝つための良い手ではありません。"
      }
    ],
    "practice": {
      "ply": 0,
      "prompt": "失敗例としてクイーンをf5からf7へ動かそう。",
      "hint": "引き分けになる状況を体験する練習です。"
    },
    "en": {
      "title": "Stalemate is a draw",
      "intro": "If the side to move has no legal move but is not in check, the result is a stalemate draw.",
      "takeaway": "Qf7 leaves Black no legal move and no check. It is a mistake, not a winning move.",
      "moves": [
        {
          "san": "Qf7",
          "note": "Qf7 leaves Black no legal move and no check. It is a mistake, not a winning move."
        }
      ],
      "practice": {
        "prompt": "Reproduce the mistake by moving the queen f5–f7.",
        "hint": "This is a demonstration of a draw, not a good move."
      }
    },
    "puzzleTheme": "stalemate"
  },
  {
    "id": "pr_center",
    "cat": "principles",
    "fen": null,
    "title": "中央を支配する",
    "intro": "序盤では中央の4マスを大切にします。中央で戦うと駒の動きが活発になります。",
    "takeaway": "d4を突いて中央の戦いを始めます。相手から取られる可能性も考えましょう。",
    "moves": [
      {
        "san": "e4",
        "note": "d4を突いて中央の戦いを始めます。相手から取られる可能性も考えましょう。"
      },
      {
        "san": "e5",
        "note": "d4を突いて中央の戦いを始めます。相手から取られる可能性も考えましょう。"
      },
      {
        "san": "Nf3",
        "note": "d4を突いて中央の戦いを始めます。相手から取られる可能性も考えましょう。"
      },
      {
        "san": "Nc6",
        "note": "d4を突いて中央の戦いを始めます。相手から取られる可能性も考えましょう。"
      },
      {
        "san": "d4",
        "note": "d4を突いて中央の戦いを始めます。相手から取られる可能性も考えましょう。"
      }
    ],
    "practice": {
      "ply": 4,
      "prompt": "d2のポーンをd4へ進めよう。",
      "hint": "初手のポーンを2マス中央へ。"
    },
    "en": {
      "title": "Control the center",
      "intro": "The four central squares matter because pieces gain space and mobility.",
      "takeaway": "d4 challenges Black in the center. Be ready for captures.",
      "moves": [
        {
          "san": "e4",
          "note": "d4 challenges Black in the center. Be ready for captures."
        },
        {
          "san": "e5",
          "note": "d4 challenges Black in the center. Be ready for captures."
        },
        {
          "san": "Nf3",
          "note": "d4 challenges Black in the center. Be ready for captures."
        },
        {
          "san": "Nc6",
          "note": "d4 challenges Black in the center. Be ready for captures."
        },
        {
          "san": "d4",
          "note": "d4 challenges Black in the center. Be ready for captures."
        }
      ],
      "practice": {
        "prompt": "Move the pawn from d2 to d4.",
        "hint": "Advance two squares into the center."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "pr_develop",
    "cat": "principles",
    "fen": null,
    "title": "駒を早く展開する",
    "intro": "序盤は同じ駒を何度も動かすより、ナイトやビショップを働かせるのが基本です。",
    "takeaway": "g1のナイトをf3へ動かし、e5を攻撃しながら展開します。",
    "moves": [
      {
        "san": "e4",
        "note": "g1のナイトをf3へ動かし、e5を攻撃しながら展開します。"
      },
      {
        "san": "e5",
        "note": "g1のナイトをf3へ動かし、e5を攻撃しながら展開します。"
      },
      {
        "san": "Nf3",
        "note": "g1のナイトをf3へ動かし、e5を攻撃しながら展開します。"
      }
    ],
    "practice": {
      "ply": 2,
      "prompt": "g1のナイトをf3へ展開しよう。",
      "hint": "ナイトがe5を攻撃できる位置を探します。"
    },
    "en": {
      "title": "Develop pieces early",
      "intro": "In the opening, develop knights and bishops rather than repeatedly moving one piece.",
      "takeaway": "Nf3 develops a knight while attacking e5.",
      "moves": [
        {
          "san": "e4",
          "note": "Nf3 develops a knight while attacking e5."
        },
        {
          "san": "e5",
          "note": "Nf3 develops a knight while attacking e5."
        },
        {
          "san": "Nf3",
          "note": "Nf3 develops a knight while attacking e5."
        }
      ],
      "practice": {
        "prompt": "Move the knight from g1 to f3.",
        "hint": "Develop while attacking e5."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "pr_defend",
    "cat": "principles",
    "fen": null,
    "title": "攻撃された駒を守る",
    "intro": "相手に狙われた駒がないか、指す前に確認しましょう。",
    "takeaway": "白ナイトがe5の黒ポーンを狙ったので、黒はNc6で守ります。",
    "moves": [
      {
        "san": "e4",
        "note": "白ナイトがe5の黒ポーンを狙ったので、黒はNc6で守ります。"
      },
      {
        "san": "e5",
        "note": "白ナイトがe5の黒ポーンを狙ったので、黒はNc6で守ります。"
      },
      {
        "san": "Nf3",
        "note": "白ナイトがe5の黒ポーンを狙ったので、黒はNc6で守ります。"
      },
      {
        "san": "Nc6",
        "note": "白ナイトがe5の黒ポーンを狙ったので、黒はNc6で守ります。"
      }
    ],
    "practice": {
      "ply": 3,
      "prompt": "黒のナイトをb8からc6へ動かそう。",
      "hint": "c6のナイトはe5へ利きます。"
    },
    "en": {
      "title": "Defend threatened pieces",
      "intro": "Before moving, check whether any piece or pawn is attacked.",
      "takeaway": "Black's ...Nc6 defends the e5 pawn while developing.",
      "moves": [
        {
          "san": "e4",
          "note": "Black's ...Nc6 defends the e5 pawn while developing."
        },
        {
          "san": "e5",
          "note": "Black's ...Nc6 defends the e5 pawn while developing."
        },
        {
          "san": "Nf3",
          "note": "Black's ...Nc6 defends the e5 pawn while developing."
        },
        {
          "san": "Nc6",
          "note": "Black's ...Nc6 defends the e5 pawn while developing."
        }
      ],
      "practice": {
        "prompt": "Move the black knight from b8 to c6.",
        "hint": "A knight on c6 protects e5."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "pr_castle",
    "cat": "principles",
    "fen": null,
    "title": "キングの安全を優先",
    "intro": "序盤はキングを安全な場所へ。キャスリング前にナイトとビショップの道を開きます。",
    "takeaway": "白はナイトとビショップを展開したので、キング側にキャスリングできます。",
    "moves": [
      {
        "san": "e4",
        "note": "白はナイトとビショップを展開したので、キング側にキャスリングできます。"
      },
      {
        "san": "e5",
        "note": "白はナイトとビショップを展開したので、キング側にキャスリングできます。"
      },
      {
        "san": "Nf3",
        "note": "白はナイトとビショップを展開したので、キング側にキャスリングできます。"
      },
      {
        "san": "Nc6",
        "note": "白はナイトとビショップを展開したので、キング側にキャスリングできます。"
      },
      {
        "san": "Bc4",
        "note": "白はナイトとビショップを展開したので、キング側にキャスリングできます。"
      },
      {
        "san": "Bc5",
        "note": "白はナイトとビショップを展開したので、キング側にキャスリングできます。"
      },
      {
        "san": "O-O",
        "note": "白はナイトとビショップを展開したので、キング側にキャスリングできます。"
      }
    ],
    "practice": {
      "ply": 6,
      "prompt": "白キングをg1へ動かしてキャスリングしよう。",
      "hint": "e1からg1へ2マス。"
    },
    "en": {
      "title": "Put king safety first",
      "intro": "Develop the knight and bishop before castling to shelter the king.",
      "takeaway": "White's kingside pieces are developed, so castling is available.",
      "moves": [
        {
          "san": "e4",
          "note": "White's kingside pieces are developed, so castling is available."
        },
        {
          "san": "e5",
          "note": "White's kingside pieces are developed, so castling is available."
        },
        {
          "san": "Nf3",
          "note": "White's kingside pieces are developed, so castling is available."
        },
        {
          "san": "Nc6",
          "note": "White's kingside pieces are developed, so castling is available."
        },
        {
          "san": "Bc4",
          "note": "White's kingside pieces are developed, so castling is available."
        },
        {
          "san": "Bc5",
          "note": "White's kingside pieces are developed, so castling is available."
        },
        {
          "san": "O-O",
          "note": "White's kingside pieces are developed, so castling is available."
        }
      ],
      "practice": {
        "prompt": "Castle White by moving the king to g1.",
        "hint": "Move the king from e1 to g1."
      }
    },
    "puzzleTheme": null
  },
  {
    "id": "pr_open",
    "cat": "principles",
    "fen": null,
    "title": "中央のラインを開く",
    "intro": "ポーンを交換するとラインが開き、ルークやビショップが働きやすくなることがあります。",
    "takeaway": "白はe4のポーンでd5を取り、中央を開きます。黒の取り返しも考えましょう。",
    "moves": [
      {
        "san": "e4",
        "note": "白はe4のポーンでd5を取り、中央を開きます。黒の取り返しも考えましょう。"
      },
      {
        "san": "d5",
        "note": "白はe4のポーンでd5を取り、中央を開きます。黒の取り返しも考えましょう。"
      },
      {
        "san": "exd5",
        "note": "白はe4のポーンでd5を取り、中央を開きます。黒の取り返しも考えましょう。"
      }
    ],
    "practice": {
      "ply": 2,
      "prompt": "白のe4ポーンでd5のポーンを取ろう。",
      "hint": "ポーンは斜め前に取ります。"
    },
    "en": {
      "title": "Open lines in the center",
      "intro": "Pawn exchanges can open lines for rooks and bishops.",
      "takeaway": "White captures on d5 to open the center; Black may recapture.",
      "moves": [
        {
          "san": "e4",
          "note": "White captures on d5 to open the center; Black may recapture."
        },
        {
          "san": "d5",
          "note": "White captures on d5 to open the center; Black may recapture."
        },
        {
          "san": "exd5",
          "note": "White captures on d5 to open the center; Black may recapture."
        }
      ],
      "practice": {
        "prompt": "Capture the pawn on d5 using e4.",
        "hint": "Pawns capture diagonally."
      }
    },
    "puzzleTheme": "capture"
  },
  {
    "id": "pr_pin",
    "cat": "principles",
    "fen": null,
    "title": "ピンを理解する",
    "intro": "ピンとは、駒が動くと後ろのもっと大切な駒が攻撃される配置です。",
    "takeaway": "白のビショップがg5へ出て、f6のナイトをd8のクイーンに対してピンします。これはキングへのピンではありません。",
    "moves": [
      {
        "san": "d4",
        "note": "白のビショップがg5へ出て、f6のナイトをd8のクイーンに対してピンします。これはキングへのピンではありません。"
      },
      {
        "san": "d5",
        "note": "白のビショップがg5へ出て、f6のナイトをd8のクイーンに対してピンします。これはキングへのピンではありません。"
      },
      {
        "san": "Nf3",
        "note": "白のビショップがg5へ出て、f6のナイトをd8のクイーンに対してピンします。これはキングへのピンではありません。"
      },
      {
        "san": "Nf6",
        "note": "白のビショップがg5へ出て、f6のナイトをd8のクイーンに対してピンします。これはキングへのピンではありません。"
      },
      {
        "san": "Bg5",
        "note": "白のビショップがg5へ出て、f6のナイトをd8のクイーンに対してピンします。これはキングへのピンではありません。"
      }
    ],
    "practice": {
      "ply": 4,
      "prompt": "白ビショップをc1からg5へ動かそう。",
      "hint": "d2のポーンはすでに動き、斜めの道が空いています。"
    },
    "en": {
      "title": "Understand a pin",
      "intro": "A pinned piece cannot move freely without exposing a more valuable piece behind it.",
      "takeaway": "Bg5 pins the f6 knight to the queen on d8, not to the king.",
      "moves": [
        {
          "san": "d4",
          "note": "Bg5 pins the f6 knight to the queen on d8, not to the king."
        },
        {
          "san": "d5",
          "note": "Bg5 pins the f6 knight to the queen on d8, not to the king."
        },
        {
          "san": "Nf3",
          "note": "Bg5 pins the f6 knight to the queen on d8, not to the king."
        },
        {
          "san": "Nf6",
          "note": "Bg5 pins the f6 knight to the queen on d8, not to the king."
        },
        {
          "san": "Bg5",
          "note": "Bg5 pins the f6 knight to the queen on d8, not to the king."
        }
      ],
      "practice": {
        "prompt": "Move the bishop from c1 to g5.",
        "hint": "The d-pawn has cleared the diagonal."
      }
    },
    "puzzleTheme": "pin"
  },
  {
    "id": "pr_fork",
    "cat": "principles",
    "fen": null,
    "title": "フォークを探す準備",
    "intro": "一手で複数の相手の駒を同時に狙うのがフォークです。特にナイトが得意です。",
    "takeaway": "Nf3はe5を狙いますが、まだフォークではありません。フォークは関連パズルで実践しよう。",
    "moves": [
      {
        "san": "e4",
        "note": "Nf3はe5を狙いますが、まだフォークではありません。フォークは関連パズルで実践しよう。"
      },
      {
        "san": "e5",
        "note": "Nf3はe5を狙いますが、まだフォークではありません。フォークは関連パズルで実践しよう。"
      },
      {
        "san": "Nf3",
        "note": "Nf3はe5を狙いますが、まだフォークではありません。フォークは関連パズルで実践しよう。"
      },
      {
        "san": "Nc6",
        "note": "Nf3はe5を狙いますが、まだフォークではありません。フォークは関連パズルで実践しよう。"
      }
    ],
    "practice": {
      "ply": 2,
      "prompt": "g1のナイトをf3へ動かそう。",
      "hint": "まずナイトの着地点と攻撃できるマスを覚えよう。"
    },
    "en": {
      "title": "Prepare to find forks",
      "intro": "A fork attacks two targets at once, often using a knight.",
      "takeaway": "Nf3 attacks e5 but is NOT itself a fork. Try fork puzzles afterward.",
      "moves": [
        {
          "san": "e4",
          "note": "Nf3 attacks e5 but is NOT itself a fork. Try fork puzzles afterward."
        },
        {
          "san": "e5",
          "note": "Nf3 attacks e5 but is NOT itself a fork. Try fork puzzles afterward."
        },
        {
          "san": "Nf3",
          "note": "Nf3 attacks e5 but is NOT itself a fork. Try fork puzzles afterward."
        },
        {
          "san": "Nc6",
          "note": "Nf3 attacks e5 but is NOT itself a fork. Try fork puzzles afterward."
        }
      ],
      "practice": {
        "prompt": "Move the knight from g1 to f3.",
        "hint": "Identify the knight's target squares."
      }
    },
    "puzzleTheme": "fork"
  },
  {
    "id": "pr_trade",
    "cat": "principles",
    "fen": null,
    "title": "交換の先まで読む",
    "intro": "取った駒が相手に取り返されるなら、単純な駒得とは限りません。",
    "takeaway": "白がd5のポーンを取っても、黒クイーンが取り返せます。取る前に交換の続きを考えましょう。",
    "moves": [
      {
        "san": "e4",
        "note": "白がd5のポーンを取っても、黒クイーンが取り返せます。取る前に交換の続きを考えましょう。"
      },
      {
        "san": "d5",
        "note": "白がd5のポーンを取っても、黒クイーンが取り返せます。取る前に交換の続きを考えましょう。"
      },
      {
        "san": "exd5",
        "note": "白がd5のポーンを取っても、黒クイーンが取り返せます。取る前に交換の続きを考えましょう。"
      },
      {
        "san": "Qxd5",
        "note": "白がd5のポーンを取っても、黒クイーンが取り返せます。取る前に交換の続きを考えましょう。"
      }
    ],
    "practice": {
      "ply": 2,
      "prompt": "e4のポーンでd5を取ろう。",
      "hint": "次に黒がQxd5と取り返すことを想像しよう。"
    },
    "en": {
      "title": "Look ahead in exchanges",
      "intro": "A capture is not automatically a gain if the enemy can recapture.",
      "takeaway": "White captures on d5, but Black's queen can recapture immediately.",
      "moves": [
        {
          "san": "e4",
          "note": "White captures on d5, but Black's queen can recapture immediately."
        },
        {
          "san": "d5",
          "note": "White captures on d5, but Black's queen can recapture immediately."
        },
        {
          "san": "exd5",
          "note": "White captures on d5, but Black's queen can recapture immediately."
        },
        {
          "san": "Qxd5",
          "note": "White captures on d5, but Black's queen can recapture immediately."
        }
      ],
      "practice": {
        "prompt": "Capture the pawn on d5 with e4.",
        "hint": "Think about ...Qxd5 afterward."
      }
    },
    "puzzleTheme": "capture"
  },
  {
    "id": "pr_threat",
    "cat": "principles",
    "fen": null,
    "title": "相手の脅威を確認",
    "intro": "指す前には相手の王手や駒取りの可能性を確かめましょう。",
    "takeaway": "白のf3・g4でキングが弱くなり、黒クイーンのQh4#が決まります。",
    "moves": [
      {
        "san": "f3",
        "note": "白のf3・g4でキングが弱くなり、黒クイーンのQh4#が決まります。"
      },
      {
        "san": "e5",
        "note": "白のf3・g4でキングが弱くなり、黒クイーンのQh4#が決まります。"
      },
      {
        "san": "g4",
        "note": "白のf3・g4でキングが弱くなり、黒クイーンのQh4#が決まります。"
      },
      {
        "san": "Qh4#",
        "note": "白のf3・g4でキングが弱くなり、黒クイーンのQh4#が決まります。"
      }
    ],
    "practice": {
      "ply": 3,
      "prompt": "黒クイーンをd8からh4へ動かしてみよう。",
      "hint": "斜めのラインが開いています。"
    },
    "en": {
      "title": "Watch for opponent threats",
      "intro": "Before moving, look for opposing checks and captures.",
      "takeaway": "White's f3 and g4 permit the quick ...Qh4#.",
      "moves": [
        {
          "san": "f3",
          "note": "White's f3 and g4 permit the quick ...Qh4#."
        },
        {
          "san": "e5",
          "note": "White's f3 and g4 permit the quick ...Qh4#."
        },
        {
          "san": "g4",
          "note": "White's f3 and g4 permit the quick ...Qh4#."
        },
        {
          "san": "Qh4#",
          "note": "White's f3 and g4 permit the quick ...Qh4#."
        }
      ],
      "practice": {
        "prompt": "Move the black queen from d8 to h4.",
        "hint": "The diagonal is open."
      }
    },
    "puzzleTheme": "backrank"
  },
  {
    "id": "pr_plan",
    "cat": "principles",
    "fen": null,
    "title": "一手先の計画を立てる",
    "intro": "良い手には次の目的があります。中央を取る、駒を展開する、キングを守る順序を意識しましょう。",
    "takeaway": "白はBc4でビショップを展開し、次のキャスリングに近づきます。",
    "moves": [
      {
        "san": "e4",
        "note": "白はBc4でビショップを展開し、次のキャスリングに近づきます。"
      },
      {
        "san": "e5",
        "note": "白はBc4でビショップを展開し、次のキャスリングに近づきます。"
      },
      {
        "san": "Nf3",
        "note": "白はBc4でビショップを展開し、次のキャスリングに近づきます。"
      },
      {
        "san": "Nc6",
        "note": "白はBc4でビショップを展開し、次のキャスリングに近づきます。"
      },
      {
        "san": "Bc4",
        "note": "白はBc4でビショップを展開し、次のキャスリングに近づきます。"
      }
    ],
    "practice": {
      "ply": 4,
      "prompt": "f1のビショップをc4へ出そう。",
      "hint": "ビショップを動かすとキング側の道が空きます。"
    },
    "en": {
      "title": "Make a simple plan",
      "intro": "Ask what the next move is for. Occupy the center, develop and protect the king.",
      "takeaway": "Bc4 develops the bishop and prepares to castle soon.",
      "moves": [
        {
          "san": "e4",
          "note": "Bc4 develops the bishop and prepares to castle soon."
        },
        {
          "san": "e5",
          "note": "Bc4 develops the bishop and prepares to castle soon."
        },
        {
          "san": "Nf3",
          "note": "Bc4 develops the bishop and prepares to castle soon."
        },
        {
          "san": "Nc6",
          "note": "Bc4 develops the bishop and prepares to castle soon."
        },
        {
          "san": "Bc4",
          "note": "Bc4 develops the bishop and prepares to castle soon."
        }
      ],
      "practice": {
        "prompt": "Move the bishop from f1 to c4.",
        "hint": "Developing the bishop clears the path for castling."
      }
    },
    "puzzleTheme": null
  }
];

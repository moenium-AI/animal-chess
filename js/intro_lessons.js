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
  }
];

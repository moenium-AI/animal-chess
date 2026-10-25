// Pure chess-position resolver for each of the 80 two-part understanding checks.
// Focus denotes the move to study (zero-based), NOT a game-wide replay index.
// The source lesson and answer key are not mutated; variations use the same Chess rules.
const ReasoningPositions = (() => {
  const focus = {
  "bk_stalemate": [
    0,
    1
  ],
  "bk_castling": [
    0,
    0
  ],
  "cb_windmill": [
    0,
    2
  ],
  "cb_smother": [
    4,
    2
  ],
  "cb_decoy": [
    2,
    2
  ],
  "cb_interference": [
    0,
    2
  ],
  "cb_fork": [
    0,
    2
  ],
  "cb_pin": [
    0,
    0
  ],
  "cb_skewer": [
    0,
    2
  ],
  "cb_backrank": [
    0,
    0
  ],
  "cb_double": [
    0,
    2
  ],
  "cb_discovered": [
    0,
    2
  ],
  "cb_doublecheck": [
    0,
    0
  ],
  "cb_epaulette": [
    0,
    0
  ],
  "cb_anastasia": [
    0,
    0
  ],
  "cb_boden": [
    0,
    0
  ],
  "cb_hanging": [
    0,
    0
  ],
  "cb_deflection": [
    0,
    2
  ],
  "cb_zwischenzug": [
    0,
    1
  ],
  "cb_knightfork2": [
    0,
    1
  ],
  "cb_rookfile": [
    0,
    1
  ],
  "cb_supportqueen": [
    0,
    1
  ],
  "cb_checkcapture": [
    0,
    1
  ],
  "bk_board": [
    0,
    0
  ],
  "bk_pawn": [
    0,
    0
  ],
  "bk_rook": [
    0,
    0
  ],
  "bk_bishop": [
    0,
    2
  ],
  "bk_knight": [
    0,
    0
  ],
  "bk_queen": [
    0,
    0
  ],
  "bk_king": [
    0,
    0
  ],
  "bk_capture": [
    0,
    0
  ],
  "bk_check": [
    0,
    0
  ],
  "bk_mate": [
    3,
    2
  ],
  "bk_promotion": [
    0,
    0
  ],
  "bk_enpassant": [
    1,
    1
  ],
  "pr_center": [
    4,
    6
  ],
  "pr_develop": [
    2,
    3
  ],
  "pr_defend": [
    3,
    3
  ],
  "pr_castle": [
    6,
    6
  ],
  "pr_open": [
    2,
    3
  ],
  "pr_pin": [
    6,
    7
  ],
  "pr_fork": [
    2,
    2
  ],
  "pr_trade": [
    2,
    4
  ],
  "pr_threat": [
    2,
    3
  ],
  "pr_plan": [
    4,
    6
  ],
  "op_italian": [
    4,
    5
  ],
  "op_ruylopez": [
    4,
    6
  ],
  "op_sicilian": [
    1,
    6
  ],
  "op_french": [
    1,
    7
  ],
  "op_qgd": [
    2,
    3
  ],
  "op_carokann": [
    7,
    8
  ],
  "op_scotch": [
    4,
    6
  ],
  "op_scandinavian": [
    4,
    5
  ],
  "op_kingsindian": [
    3,
    11
  ],
  "op_english": [
    0,
    8
  ],
  "op_kingsgambit": [
    2,
    3
  ],
  "op_vienna": [
    2,
    5
  ],
  "op_petrov": [
    3,
    5
  ],
  "op_london": [
    4,
    5
  ],
  "op_slav": [
    3,
    5
  ],
  "op_nimzo": [
    5,
    8
  ],
  "op_dutch": [
    1,
    3
  ],
  "eg_rook": [
    0,
    0
  ],
  "eg_tworooks": [
    0,
    0
  ],
  "eg_queen": [
    0,
    0
  ],
  "eg_promote": [
    0,
    0
  ],
  "eg_opposition": [
    0,
    2
  ],
  "eg_breakthrough": [
    0,
    4
  ],
  "eg_square": [
    0,
    4
  ],
  "eg_underpromo": [
    0,
    2
  ],
  "eg_connected": [
    0,
    4
  ],
  "eg_stalemate": [
    0,
    0
  ],
  "eg_lucena": [
    0,
    10
  ],
  "eg_philidor": [
    0,
    2
  ],
  "eg_wrongbishop": [
    4,
    4
  ],
  "eg_triangulation": [
    4,
    1
  ],
  "eg_passadvance": [
    0,
    2
  ],
  "eg_activeking": [
    0,
    0
  ],
  "eg_rookbehind": [
    0,
    0
  ],
  "eg_kingescort": [
    0,
    0
  ]
};
  const alternate = {
  "bk_stalemate": {
    "why": [
      "Qf7"
    ],
    "defense": [
      "Qf6+",
      "Kg8"
    ]
  },
  "bk_castling": {
    "why": [
      "O-O"
    ],
    "defense": [
      "Kd2"
    ]
  },
  "cb_windmill": {
    "why": [
      "Rxc7+"
    ],
    "defense": [
      "Rxc7+",
      "Qc3",
      "Bxc3+"
    ]
  },
  "cb_smother": {
    "why": [
      "Nf7+",
      "Kg8",
      "Nh6+",
      "Kh8",
      "Qg8+"
    ],
    "defense": [
      "Nf7+",
      "Rxf7",
      "Qxf7"
    ]
  },
  "cb_decoy": {
    "why": [
      "Bb3+",
      "Kh8",
      "Nf7+"
    ],
    "defense": [
      "Bb3+",
      "Qd5",
      "Bxd5+"
    ]
  },
  "cb_interference": {
    "why": [
      "c7"
    ],
    "defense": [
      "c7",
      "Bxd6",
      "Rxd6"
    ]
  },
  "eg_stalemate": {
    "defense": [
      "Qg6"
    ]
  },
  "eg_triangulation": {
    "defense": [
      "c6+",
      "Kc8"
    ]
  }
};
  function resolve(ChessCtor, lesson, kind, question) {
    if (!lesson || !lesson.id || !['why','defense'].includes(kind) ||
        !question || !focus[lesson.id]) return null;
    const line = alternate[lesson.id]?.[kind] ||
      question.evidence?.line || lesson.moves?.map(m=>m.san);
    const at = focus[lesson.id][kind === 'why' ? 0 : 1];
    if (!Array.isArray(line) || !line.length || !Number.isInteger(at) ||
        at < 0 || at >= line.length) return null;
    const board = lesson.fen ? new ChessCtor(lesson.fen) : new ChessCtor();
    let beforeFen = '', afterFen = '', move = null;
    for (let i = 0; i <= at; i++) {
      if (i === at) beforeFen = board.fen();
      move = board.move(line[i]);
      if (!move || move.san !== line[i]) return null;
      if (i === at) afterFen = board.fen();
    }
    return { beforeFen, afterFen, san: move.san, from: move.from,
      to: move.to, focusPly: at, lineLength: line.length };
  }
  return {resolve, focus, alternate};
})();

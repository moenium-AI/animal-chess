// Bilingual illustrative branches. These do not claim optimal play in all continuations.
const LESSON_COMPARISONS = {
  "bk_stalemate": {
    "ply": 0,
    "alternative": [
      "Qf6+",
      "Kg8"
    ],
    "main": {
      "ja": "Qf7は王手ではなく、黒には合法手がないためステイルメイトで引き分けになります。",
      "en": "Qf7 is not check and leaves Black no legal move: stalemate."
    },
    "other": {
      "ja": "Qf6+なら王手となり、黒キングはg8へ逃げます。ゲームは続きます。",
      "en": "Qf6+ gives check and Black can escape to g8. The game continues."
    },
    "theme": "stalemate"
  },
  "bk_mate": {
    "ply": 2,
    "alternative": [
      "g3",
      "Nf6"
    ],
    "main": {
      "ja": "白のg4でキングの斜めの弱点が開き、黒のQh4#が成立します。",
      "en": "After White's g4, Black can checkmate with ...Qh4#."
    },
    "other": {
      "ja": "白のg3はh4を利かせるので、教材の即詰みは起きません。g3が唯一の最善という意味ではありません。",
      "en": "White's g3 controls h4, preventing the immediate queen mate. This does not mean g3 is the only good move."
    },
    "theme": "kingSafety"
  },
  "bk_castling": {
    "ply": 0,
    "alternative": [
      "Kd2",
      "Kd7"
    ],
    "main": {
      "ja": "O-Oはキングをg1、ルークをf1へ移すキング側キャスリングです。",
      "en": "O-O shelters the king on g1 and places the rook on f1."
    },
    "other": {
      "ja": "Kd2も合法ですが、キングを動かした白は以後キャスリングできません。黒のKd7は一例です。",
      "en": "Kd2 is legal but permanently loses White's castling right. ...Kd7 is an illustrative reply."
    },
    "theme": "castle"
  },
  "bk_enpassant": {
    "ply": 1,
    "alternative": [
      "e6"
    ],
    "main": {
      "ja": "exd6はd5のポーンをアンパッサンで取る、直後だけ使える特別な手です。",
      "en": "exd6 captures the pawn on d5 en passant, immediately after it moved two squares."
    },
    "other": {
      "ja": "e6も合法ですが、この後はアンパッサンの権利が消えます。悪手と断定する比較ではありません。",
      "en": "e6 is legal too, but the en passant opportunity disappears after this turn. This is not a universal quality ranking."
    },
    "theme": "enpassant"
  },
  "op_london": {
    "ply": 4,
    "alternative": [
      "Bg5"
    ],
    "main": {
      "ja": "Bf4はロンドン・システムの代表的なビショップ配置で、e5に影響します。",
      "en": "Bf4 is the London System's characteristic bishop placement and influences e5."
    },
    "other": {
      "ja": "Bg5も合法な展開手で、g5のビショップは黒ナイトf6を狙います。両者は計画が違います。",
      "en": "Bg5 is another legal development, attacking the knight on f6. It follows a different plan."
    },
    "theme": "plans"
  },
  "pr_pin": {
    "ply": 6,
    "alternative": [
      "Be3"
    ],
    "main": {
      "ja": "Bg5はf6ナイトをd8の黒クイーンへピンします。e7が空いている点が重要です。",
      "en": "Bg5 pins the knight on f6 to the queen on d8 because e7 has been cleared."
    },
    "other": {
      "ja": "Be3もビショップの展開ですが、f6ナイトをクイーンへピンする配置ではありません。",
      "en": "Be3 also develops a bishop, but it does not pin the f6 knight to the queen."
    },
    "theme": "pin"
  },
  "cb_checkcapture": {
    "ply": 0,
    "alternative": [
      "Rd2",
      "Qxd2"
    ],
    "main": {
      "ja": "Rxd3+はクイーンを取ると同時にキングへ王手をかけます。",
      "en": "Rxd3+ captures the queen and checks the king."
    },
    "other": {
      "ja": "Rd2なら黒クイーンにQxd2でルークを取られてしまいます。盤面にある直接の脅威に注目しましょう。",
      "en": "After Rd2, Black can capture the rook with ...Qxd2. Notice immediate threats."
    },
    "theme": "capture"
  },
  "cb_knightfork2": {
    "ply": 0,
    "alternative": [
      "Nb5"
    ],
    "main": {
      "ja": "Ne4+はf6キングに王手をかけつつ、d2クイーンを攻撃します。",
      "en": "Ne4+ checks the king on f6 while attacking the queen on d2."
    },
    "other": {
      "ja": "Nb5は合法ですが、王手とクイーン攻撃を同時には実現しません。戦術の好機を逃す例です。",
      "en": "Nb5 is legal but misses the opportunity to attack king and queen together."
    },
    "theme": "fork"
  },
  "cb_windmill": {
    "ply": 1,
    "alternative": [
      "Qc3",
      "Bxc3+"
    ],
    "main": {
      "ja": "黒が...Kg8と逃げると、白はRg7+から風車を回し、ポーンを取りながら攻められます。ほかの応手でも同じ手順になるわけではありません。",
      "en": "After ...Kg8, White can return with Rg7+ and continue the windmill to collect pawns. Other defenses lead to different lines."
    },
    "other": {
      "ja": "黒が...Qc3で発見王手を遮っても、Bxc3+で白ビショップがクイーンを取ります。...Qe5もBxe5+で同様です。風車の連続王手は止まっても、攻めを防ぎきれません。",
      "en": "Black can block the discovered check with ...Qc3, but Bxc3+ captures the queen. Likewise ...Qe5 allows Bxe5+. The repeated windmill stops, but the attack still succeeds."
    },
    "theme": "defense"
  },
  "cb_rookfile": {
    "ply": 0,
    "alternative": [
      "Ra7"
    ],
    "main": {
      "ja": "Ra8+は8段目からg8の黒キングへ横方向の王手をかけます。",
      "en": "Ra8+ attacks the king on g8 along the eighth rank."
    },
    "other": {
      "ja": "Ra7ではキングへの直接の王手になりません。ルークの着地点で横方向の利きが変わります。",
      "en": "Ra7 does not check the king directly. The rook's rank matters."
    },
    "theme": "check"
  },
  "eg_rookbehind": {
    "ply": 0,
    "alternative": [
      "Rb8+",
      "Kh7"
    ],
    "main": {
      "ja": "Ra1ではルークがaポーンの後ろにつき、前進路をふさぎません。",
      "en": "Ra1 puts the rook behind its a-pawn without blocking promotion."
    },
    "other": {
      "ja": "Rb8+も王手ですが、ルークは通過ポーンの後ろから離れます。黒キングはh7に逃げられます。",
      "en": "Rb8+ gives check but leaves the rook off the pawn's file; the black king can escape to h7."
    },
    "theme": "plans"
  },
  "eg_passadvance": {
    "ply": 0,
    "alternative": [
      "Kd2",
      "Kh7"
    ],
    "main": {
      "ja": "a7は通過ポーンを昇格の一歩手前へ進めます。",
      "en": "a7 brings the passed pawn one square from promotion."
    },
    "other": {
      "ja": "Kd2はキングの活動を進めますが、ポーンの前進は1手先送りです。黒キングもh7へ進めます。",
      "en": "Kd2 develops the king but postpones the pawn push; Black's king can approach to h7."
    },
    "theme": "tempo"
  },
  "pr_trade": {
    "ply": 2,
    "alternative": [
      "Nf3",
      "dxe4"
    ],
    "main": {
      "ja": "exd5のあと黒にはQxd5と取り返す手があり、交換の先を読む必要があります。",
      "en": "After exd5, Black can recapture with ...Qxd5. Read the entire exchange."
    },
    "other": {
      "ja": "Nf3も展開手ですが黒には...dxe4があります。その後の取り返しまで読んで判断しましょう。",
      "en": "Nf3 develops a knight but permits ...dxe4. Calculate the possible recapture before evaluating the line."
    },
    "theme": "capture"
  }
};

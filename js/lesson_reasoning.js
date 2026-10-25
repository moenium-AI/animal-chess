// Carefully curated reasoning checks for specific illustrated positions.
// "Defense" means a concrete legal reply in the lesson, not globally best play.
// Answer indices stay identical across Japanese and English.
const LESSON_REASONING = {
  bk_stalemate: {
    why: {
      answer: 1,
      ja: { question: 'Qf7のあと、なぜ引き分けになるのかな？', options: ['黒キングがチェックメイトされたから', '黒は王手を受けておらず、合法手もないから', '白のクイーンが取られたから'], explanation: 'Qf7は王手ではない。黒に合法手がないため、チェックメイトではなくステイルメイトの引き分けじゃ。' },
      en: { question: 'Why is the game drawn after Qf7?', options: ['Black is checkmated', 'Black is not in check and has no legal move', 'White lost the queen'], explanation: 'Qf7 does not give check. Black has no legal move, so the result is a stalemate draw rather than checkmate.' }
    },
    defense: {
      answer: 2,
      ja: { question: 'Qf7の代わりにQf6+と指したら、黒はどうできる？', options: ['必ずその場で詰む', '白クイーンを取れる', 'Kg8でチェックから逃げ、対局が続く'], explanation: 'Qf6+にはKg8という合法な応手がある。ステイルメイトを避けられる一例じゃ。' },
      en: { question: 'If White plays Qf6+ instead, what can Black do?', options: ['Black must be checkmated immediately', 'Capture White’s queen', 'Escape with Kg8 and continue'], explanation: 'Black can legally escape the check with ...Kg8. This is one way to avoid the immediate stalemate.' }
    }
  },
  bk_castling: {
    why: {
      answer: 0,
      ja: { question: 'キング側キャスリングO-Oでは、白のキングとルークはどこへ動く？', options: ['キングg1・ルークf1', 'キングf1・ルークg1', 'キングd1・ルークc1'], explanation: 'O-Oではキングがe1からg1へ、h1のルークがf1へ移る。' },
      en: { question: 'Where do White’s king and rook go after O-O?', options: ['King g1, rook f1', 'King f1, rook g1', 'King d1, rook c1'], explanation: 'Kingside castling moves the king from e1 to g1 and the rook from h1 to f1.' }
    },
    defense: {
      answer: 1,
      ja: { question: 'この局面でO-Oの代わりにKd2とキングを動かすと？', options: ['次の手でO-Oできる', '白は以後キャスリングできなくなる', '黒がただちに勝つ'], explanation: 'キングを一度動かすと、戻ってもキャスリング権は回復しない。Kd2自体が必ず負ける手という意味ではないぞ。' },
      en: { question: 'What changes if White plays Kd2 instead of O-O here?', options: ['White can castle next turn', 'White permanently loses castling rights', 'Black wins immediately'], explanation: 'Once the king moves, castling rights are permanently lost, even if it moves back. Kd2 is not necessarily an outright losing move.' }
    }
  },
  cb_windmill: {
    why: {
      answer: 2,
      ja: { question: 'Rxc7+から風車が始まる理由は？', options: ['ルークがナイトのように跳ぶから', '黒クイーンがすでに取られたから', 'ルークが動くとb2のビショップの王手が開くから'], explanation: 'ルークがg7からc7へ動くと、b2のビショップの対角線がh8のキングに通る。これが発見王手じゃ。' },
      en: { question: 'Why can Rxc7+ begin the windmill?', options: ['The rook jumps like a knight', 'Black’s queen was already captured', 'The rook uncovers the bishop’s diagonal check'], explanation: 'Moving the rook from g7 to c7 reveals the bishop on b2 checking the king on h8. This is discovered check.' }
    },
    defense: {
      answer: 0,
      ja: { question: '黒がRxc7+に...Qc3と合駒すると、白はどう対応する？', options: ['Bxc3+でクイーンを取る', 'Rf6でルークを取る', '必ずその場で引き分けになる'], explanation: '...Qc3は発見王手を遮るが、b2のビショップがBxc3+でクイーンを取れる。風車が続かなくても白の攻めは成立する。' },
      en: { question: 'How does White answer ...Qc3 after Rxc7+?', options: ['Bxc3+ captures the queen', 'Rf6 wins a rook', 'The game is necessarily drawn'], explanation: '...Qc3 blocks the discovered check, but the bishop on b2 can capture the queen with Bxc3+. The attack still works without repeated checks.' }
    }
  },
  cb_smother: {
    why: {
      answer: 1,
      ja: { question: '掲載変化のQg8+でクイーンを捨てる狙いは？', options: ['ポーンを昇格させるため', 'Rxg8で逃げ道をふさぎ、Nf7#を可能にするため', 'キングを長く動かすため'], explanation: '黒ルークがg8でクイーンを取ると、黒キングの逃げ道が自分のルークで埋まり、Nf7#の窒息メイトとなる。' },
      en: { question: 'What is the purpose of Qg8+ in the displayed line?', options: ['To promote a pawn', 'To induce ...Rxg8, block an escape square and allow Nf7#', 'To move the king farther away'], explanation: 'After ...Rxg8, Black’s own rook blocks g8, letting the knight deliver smothered mate with Nf7#.' }
    },
    defense: {
      answer: 2,
      ja: { question: '黒が最初のNf7+に...Rxf7と応じたら？', options: ['必ず同じNf7#になる', '白はクイーンを失う', '白はQxf7で黒ルークを取り返せる'], explanation: '...Rxf7にはQxf7。窒息メイトの筋は消えるが、白は黒ルークを取り返して攻めを続けられるぞ。' },
      en: { question: 'What if Black answers the first Nf7+ with ...Rxf7?', options: ['The same Nf7# must follow', 'White loses the queen', 'White recaptures the rook with Qxf7'], explanation: 'After ...Rxf7, White can play Qxf7. The smothered-mate line changes, but White wins the rook.' }
    }
  },
  cb_decoy: {
    why: {
      answer: 0,
      ja: { question: 'Bb3+ Kh8のあと、Nf7+で何を狙う？', options: ['キングとd8のクイーンを同時に攻撃する', '黒ルークをa8へ誘う', 'すぐポーンを昇格させる'], explanation: 'ナイトがf7でキングに王手をかけ、同時にd8のクイーンも狙う。f8の黒ビショップはそのナイトを取れない。' },
      en: { question: 'After Bb3+ Kh8, what does Nf7+ threaten?', options: ['A fork of the king and queen on d8', 'Luring a rook to a8', 'Immediate pawn promotion'], explanation: 'The knight checks the king while attacking the queen on d8. The black bishop on f8 cannot capture that knight.' }
    },
    defense: {
      answer: 1,
      ja: { question: 'Bb3+に黒が...Qd5と合駒した場合、白の一手は？', options: ['Nf7+しかない', 'Bxd5+でクイーンを取る', 'Qxd5#で詰ませる'], explanation: '白ビショップはb3からd5へ進み、Bxd5+で黒クイーンを取れる。フォークと異なる勝ち筋じゃ。' },
      en: { question: 'If Black blocks Bb3+ with ...Qd5, what can White play?', options: ['Only Nf7+', 'Bxd5+ to capture the queen', 'Qxd5# for immediate mate'], explanation: 'The bishop on b3 can take the queen on d5 with Bxd5+. This wins material without the knight fork.' }
    }
  },
  cb_interference: {
    why: {
      answer: 2,
      ja: { question: '白のc7が「利きの遮断」になるのはなぜ？', options: ['黒のキングをチェックするから', '黒ビショップをその場で取るから', 'a7の黒ルークからe7の黒ビショップへの守りをふさぐから'], explanation: 'c7へ進んだ白ポーンが、a7のルークの横方向の守りを遮る。見えない防御線を見つける練習じゃ。' },
      en: { question: 'Why is White’s c7 an interference move?', options: ['It checks the king', 'It immediately captures the bishop', 'It blocks the rook on a7 from defending the bishop on e7'], explanation: 'The pawn on c7 interrupts the rook’s seventh-rank line of defense. Look for pieces relying on that line.' }
    },
    defense: {
      answer: 0,
      ja: { question: 'c7に黒が...Bxd6と応じたら、白は？', options: ['Rxd6でビショップを取る', 'ただちに投了する', '白キングでe7を取る'], explanation: '新しい局面ではd1の白ルークがd6まで通っており、...Bxd6にはRxd6でビショップを取り返せる。' },
      en: { question: 'How can White respond if Black plays ...Bxd6 after c7?', options: ['Rxd6 captures the bishop', 'Resign immediately', 'Capture e7 with the king'], explanation: 'The rook on d1 has a clear file to d6, so White can reply Rxd6 and take the bishop.' }
    }
  }
};

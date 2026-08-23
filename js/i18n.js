// Animal Chess UI localization.  Lesson text is stored in lessons.js.en;
// this module handles the surrounding interface and short runtime messages.
const I18N = (() => {
  const dict = {
    ja: {
      'app.title': '🐱 どうぶつチェス <span class="sub">Animal Chess</span>',
      'ui.bgmToggle': 'BGM切り替え', 'ui.soundToggle': '効果音切り替え', 'ui.close': 'とじる',
      'ui.first': 'さいしょ', 'ui.previous': 'まえ', 'ui.next': 'つぎ', 'ui.last': 'さいご',
      'ui.playFromHere': '🎮 ここから対局', 'ui.moveList': 'きふ', 'ui.promote': 'どのコマにへんしんする?', 'ui.playAgain': 'もういちど!',
      'tab.settings': '⚙️ 設定', 'tab.puzzle': '🧩 パズル', 'tab.learn': '🎓 まなぶ',
      'tab.currentGame': '📜 この対局', 'tab.famousGames': '🏆 名局', 'tab.load': '📥 よみこみ',
      'settings.graphics': 'グラフィック', 'settings.view3d': '3Dモード(ドット絵)', 'settings.viewSimple': 'シンプルモード', 'settings.bgm': 'BGM',
      'settings.pieceDesign': 'ピースのデザイン', 'settings.opponent': 'あいて', 'settings.cpu': 'コンピューター',
      'settings.twoPlayer': 'ふたりで遊ぶ', 'settings.cpuStrength': 'コンピューターの強さ(1〜10)',
      'settings.level1': 'Lv1 はじめて', 'settings.level2': 'Lv2 とてもやさしい', 'settings.level3': 'Lv3 やさしい',
      'settings.level4': 'Lv4 すこしやさしい', 'settings.level5': 'Lv5 ふつう', 'settings.level6': 'Lv6 すこしつよい',
      'settings.level7': 'Lv7 つよい', 'settings.level8': 'Lv8 かなりつよい', 'settings.level9': 'Lv9 とてもつよい',
      'settings.level10': 'Lv10 さいきょう', 'settings.playerColor': 'じぶんの色',
      'settings.whiteFirst': 'しろ(先手)', 'settings.blackSecond': 'くろ(後手)', 'settings.showBadges': 'コマの種類記号を表示',
      'button.newGame': '🌱 新しいゲーム', 'button.hint': '💡 ヒント', 'button.undo': '↩️ 待った',
      'button.copyPgn': '📋 棋譜コピー', 'button.retry': '🔄 さいしょから', 'button.loadPgn': '📥 読み込み',
      'button.file': '📂 ファイル', 'button.samplePgn': '✨ サンプル棋譜',
      'learn.help': 'テーマを選ぶと、一手ずつ「なぜそう指すのか」を解説つきで学べます',
      'games.help': '歴史に残る名勝負を、一手ずつ独自の解説つきで鑑賞できます',
      'load.help': 'PGN形式の棋譜を貼り付けるか、ファイルを選んでね',
      'load.placeholder': '1. e4 e5 2. Nf3 Nc6 ...',
      'load.helpAfter': '読み込むと盤の下に再生パネルが出ます。手をクリックすればどこからでも再生できます',
      'color.white': 'しろ', 'color.black': 'くろ', 'color.team': '{color}チーム',
      'venue.banquet': '{color}チームの宴会会場', 'venue.hosting': '🏰 {color}チームのおもてなし会場', 'venue.banquetPlace': '宴会会場', 'venue.hostPlace': '会場',
      'venue.captured': '{color}がとったコマ', 'venue.waiting': 'おきゃくさまをおまちしています…', 'venue.none': 'まだありません',
      'venue.hosted': '{piece} … {food}でおもてなし中', 'venue.arriving': '🐴ガラガラ… {name}が馬車にのって{color}チームの{place}へ!',
      'venue.joined': '🏮 {name}が宴会に合流!ごちそうを楽しんでいます♪', 'venue.simpleHosted': '🏰 {name}は{food}でおもてなしされています♪',
      'venue.turn': '{glyph} {color}チームのばん', 'status.replay': '📜 きふ さいせいちゅう ({current} / {total}手)',
      'status.choosePuzzle': '🧩 パズルをえらんでね', 'status.checkmate': '🎉 チェックメイト!せいかい!',
      'status.puzzleTurn': '🧩 {color}ばん: あと{moves}手でチェックメイトしよう!', 'status.cpuThinking': '🤔 コンピューターがかんがえちゅう…',
      'status.hintThinking': '💡 ヒントをかんがえちゅう…', 'status.check': ' ⚠️ チェック!',
      'game.playerWinShort': '🎉 チェックメイト!あなたのかち!', 'game.playerWinText': 'チェックメイト!あなたのかち!すごい!',
      'game.playerLoseShort': '😢 チェックメイト…まけちゃった', 'game.playerLoseText': 'まけちゃった…つぎはきっとかてるよ!',
      'game.teamWinShort': '🎉 チェックメイト!{color}チームのかち!', 'game.teamWinText': 'チェックメイト!{color}チームのかち!',
      'game.stalemateShort': '🤝 ステイルメイト!ひきわけ', 'game.stalemateText': 'ステイルメイト!ひきわけだよ',
      'game.repetitionShort': '🤝 くりかえしでひきわけ', 'game.repetitionText': 'おなじ局面が3回…ひきわけだよ',
      'game.insufficientShort': '🤝 ひきわけ', 'game.insufficientText': 'おたがいチェックメイトできないのでひきわけ',
      'game.drawShort': '🤝 ひきわけ', 'game.drawText': 'ひきわけだよ',
      'hint.good': 'いい手だよ!', 'hint.mate': 'これでチェックメイト! 勝ちだよ🎉', 'hint.freeCapture': 'ただで{piece}が取れて駒得だよ',
      'hint.captureGain': '{piece}が取れるよ。取り返されても駒得になる', 'hint.exchange': '{piece}と交換できるよ(取り返されても損はしない)',
      'hint.capture': '{piece}が取れるよ', 'hint.promotion': 'ポーンがクイーンに大出世できる',
      'hint.check': '相手のキングにチェックをかけて主導権をにぎれる', 'hint.castle': 'キングを安全な場所に囲えるよ',
      'hint.center': '中央をおさえて盤の主導権をにぎれる', 'hint.develop': '眠っていた駒を戦いに参加させられる',
      'hint.general': '駒の働きが良くなって、じっくり有利にできるよ',
      'toast.view3d': '🎮 3Dモードにきりかえたよ!', 'toast.viewSimple': '✨ シンプルモードにきりかえたよ!',
      'toast.pieceChanged': '✨ ピースを「{name}」にかえたよ!', 'toast.bgmOn': '🎵 BGMをつけたよ', 'toast.bgmOff': '🎵 BGMをけしたよ',
      'toast.bgmAuto': '🎵 オート: ぜんぶの曲を順番に流すよ', 'toast.bgmSong': '🎵 「{name}」をずっと流すよ',
      'toast.noPgn': 'まだ棋譜がないよ', 'toast.pgnCopied': '📋 棋譜をコピーしたよ!', 'toast.pgnExported': '棋譜よみこみタブに書き出したよ',
      'toast.undo': '↩️ 待った!ひとつまえにもどしたよ', 'toast.puzzleStart': '🧩 パズル「{title}」スタート!',
      'toast.puzzleWrong': '🐾 ざんねん!そのてでは つまないみたい。もういちど!', 'toast.puzzleSolved': '🎉 せいかい!チェックメイト!',
      'toast.nextPuzzle': 'つぎは「{title}」にちょうせんしてみてね', 'toast.studyOpened': '🎓 「{title}」を開いたよ。▶で一手ずつ解説を読んでね',
      'toast.gameOpened': '🏆 「{title}」を開いたよ。▶で一手ずつ解説を読んでね', 'toast.pgnBad': '😿 棋譜が読み込めなかったよ。PGN形式か確認してね',
      'toast.pgnLoaded': '📜 {moves}手の棋譜を読み込んだよ!', 'toast.playFromHere': '🎮 ここから対局スタート!あなたは{color}だよ',
      'toast.hintPuzzle': '💡 {advisor}: {piece}をうごかしてみて!', 'toast.hintMove': '💡 {advisor}のおすすめ: {piece} {from}→{to}\n{why}',
      'learn.opening': '♟️ オープニング', 'learn.combo': '⚡ コンビネーション', 'learn.endgame': '👑 エンドゲーム',
      'learn.catOpening': 'オープニング定跡', 'learn.catCombo': 'コンビネーション(戦術)', 'learn.catEndgame': 'エンドゲーム(終盤)',
      'learn.studyTitle': '🎓 {title}', 'learn.openingToast': '🎓 「{title}」を開いたよ。▶で一手ずつ解説を読んでね',
      'games.vs': ' 対 ', 'games.meta': '{white} 対 {black}・{year}', 'games.metaOpening': '{white} 対 {black}・{year}({opening})',
      'study.replay': '棋譜さいせい', 'study.loaded': 'よみこんだ棋譜', 'study.intro': '手をクリックするか、下のボタンでどこからでも再生できます。',
      'puzzle.allLevels': 'ぜんぶの難しさ', 'puzzle.allThemes': 'すべて', 'puzzle.mateIn': '{moves}手詰め',
      'puzzle.goal': '{color}ばん・{moves}手でチェックメイト!<br><span class="puz-idea">💡 {idea}</span>', 'puzzle.select': 'パズルをえらんでね',
      'puzzle.filterHelp': 'テーマでしぼりこめるよ。リストからタップして挑戦!', 'advisor.cat': 'せんせい',
      'piece.king': 'キング', 'piece.queen': 'クイーン', 'piece.rook': 'ルーク', 'piece.bishop': 'ビショップ', 'piece.knight': 'ナイト', 'piece.pawn': 'ポーン',
      'piece.classic': 'クラシック', 'piece.forest': '森のなかま', 'piece.sea': 'うみのなかま', 'piece.farm': 'まきばのなかま', 'piece.savanna': 'サバンナのなかま',
    },
    en: {
      'app.title': '🐱 Animal Chess <span class="sub">どうぶつチェス</span>',
      'ui.bgmToggle': 'Toggle BGM', 'ui.soundToggle': 'Toggle sound', 'ui.close': 'Close', 'ui.first': 'First', 'ui.previous': 'Previous', 'ui.next': 'Next', 'ui.last': 'Last',
      'ui.playFromHere': '🎮 Play from here', 'ui.moveList': 'Moves', 'ui.promote': 'Choose a piece', 'ui.playAgain': 'Play again!',
      'tab.settings': '⚙️ Settings', 'tab.puzzle': '🧩 Puzzles', 'tab.learn': '🎓 Learn', 'tab.currentGame': '📜 This game', 'tab.famousGames': '🏆 Famous games', 'tab.load': '📥 Load',
      'settings.graphics': 'Graphics', 'settings.view3d': '3D mode (pixel art)', 'settings.viewSimple': 'Simple mode', 'settings.bgm': 'BGM', 'settings.pieceDesign': 'Piece design',
      'settings.opponent': 'Opponent', 'settings.cpu': 'Computer', 'settings.twoPlayer': 'Two players', 'settings.cpuStrength': 'Computer strength (1–10)',
      'settings.level1': 'Lv1 Beginner', 'settings.level2': 'Lv2 Very easy', 'settings.level3': 'Lv3 Easy', 'settings.level4': 'Lv4 Gentle', 'settings.level5': 'Lv5 Normal',
      'settings.level6': 'Lv6 A little strong', 'settings.level7': 'Lv7 Strong', 'settings.level8': 'Lv8 Very strong', 'settings.level9': 'Lv9 Expert', 'settings.level10': 'Lv10 Strongest',
      'settings.playerColor': 'Your color', 'settings.whiteFirst': 'White (first)', 'settings.blackSecond': 'Black (second)', 'settings.showBadges': 'Show piece symbols',
      'button.newGame': '🌱 New game', 'button.hint': '💡 Hint', 'button.undo': '↩️ Undo', 'button.copyPgn': '📋 Copy PGN', 'button.retry': '🔄 Start over',
      'button.loadPgn': '📥 Load', 'button.file': '📂 File', 'button.samplePgn': '✨ Sample PGN',
      'learn.help': 'Choose a theme to learn, move by move, why each move makes sense.', 'games.help': 'Watch historic games with original move-by-move commentary.',
      'load.help': 'Paste a PGN game or choose a file.', 'load.placeholder': '1. e4 e5 2. Nf3 Nc6 ...', 'load.helpAfter': 'A replay panel appears below the board. Click any move to start there.',
      'color.white': 'White', 'color.black': 'Black', 'color.team': '{color} team', 'venue.banquet': '{color} team banquet', 'venue.hosting': '🏰 {color} team hospitality', 'venue.banquetPlace': 'banquet', 'venue.hostPlace': 'venue',
      'venue.captured': 'Pieces captured by {color}', 'venue.waiting': 'Waiting for guests…', 'venue.none': 'None yet', 'venue.hosted': '{piece} … being hosted with {food}',
      'venue.arriving': '🐴 Clatter… {name} rides by carriage to the {place} of the {color} team!', 'venue.joined': '🏮 {name} joins the banquet and enjoys the feast!',
      'venue.simpleHosted': '🏰 {name} is being hosted with {food}♪', 'venue.turn': '{glyph} {color} team to move',
      'status.replay': '📜 Replaying ({current} / {total} moves)', 'status.choosePuzzle': '🧩 Choose a puzzle', 'status.checkmate': '🎉 Checkmate! Correct!',
      'status.puzzleTurn': '🧩 {color} to move: mate in {moves}', 'status.cpuThinking': '🤔 The computer is thinking…', 'status.hintThinking': '💡 Thinking of a hint…', 'status.check': ' ⚠️ Check!',
      'game.playerWinShort': '🎉 Checkmate! You win!', 'game.playerWinText': 'Checkmate! You win! Great job!', 'game.playerLoseShort': '😢 Checkmate… you lost', 'game.playerLoseText': 'You lost… you can win next time!',
      'game.teamWinShort': '🎉 Checkmate! {color} wins!', 'game.teamWinText': 'Checkmate! {color} wins!', 'game.stalemateShort': '🤝 Stalemate! Draw', 'game.stalemateText': 'Stalemate! The game is a draw',
      'game.repetitionShort': '🤝 Draw by repetition', 'game.repetitionText': 'The same position occurred three times… draw', 'game.insufficientShort': '🤝 Draw', 'game.insufficientText': 'Neither side has enough material to checkmate', 'game.drawShort': '🤝 Draw', 'game.drawText': 'The game is a draw',
      'hint.good': 'That is a good move!', 'hint.mate': 'That is checkmate! You win 🎉', 'hint.freeCapture': 'You can win a {piece} for free', 'hint.captureGain': 'You can take the {piece} and still gain material after a recapture', 'hint.exchange': 'You can trade for the {piece} without losing material', 'hint.capture': 'You can take the {piece}', 'hint.promotion': 'The pawn can promote to a queen', 'hint.check': 'Check the enemy king and seize the initiative', 'hint.castle': 'Castle to move the king to safety', 'hint.center': 'Control the center and take the initiative', 'hint.develop': 'Bring a waiting piece into the game', 'hint.general': 'Improve your pieces and build a lasting advantage',
      'toast.view3d': '🎮 Switched to 3D mode!', 'toast.viewSimple': '✨ Switched to simple mode!', 'toast.pieceChanged': '✨ Piece set changed to “{name}”!', 'toast.bgmOn': '🎵 BGM on', 'toast.bgmOff': '🎵 BGM off', 'toast.bgmAuto': '🎵 Auto: play every song in order', 'toast.bgmSong': '🎵 Looping “{name}”', 'toast.noPgn': 'There is no game record yet', 'toast.pgnCopied': '📋 PGN copied!', 'toast.pgnExported': 'PGN written to the Load tab', 'toast.undo': '↩️ Undone one move', 'toast.puzzleStart': '🧩 Puzzle “{title}” started!', 'toast.puzzleWrong': '🐾 Not this move. Try again!', 'toast.puzzleSolved': '🎉 Correct! Checkmate!', 'toast.nextPuzzle': 'Try “{title}” next', 'toast.studyOpened': '🎓 “{title}” opened. Use ▶ to read the commentary one move at a time', 'toast.gameOpened': '🏆 “{title}” opened. Use ▶ to read the commentary one move at a time', 'toast.pgnBad': '😿 Could not load the game. Check that it is valid PGN.', 'toast.pgnLoaded': '📜 Loaded a {moves}-move game!', 'toast.playFromHere': '🎮 Starting from here! You are {color}', 'toast.hintPuzzle': '💡 {advisor}: try moving the {piece}!', 'toast.hintMove': '💡 {advisor} recommends: {piece} {from}→{to}\n{why}',
      'learn.opening': '♟️ Openings', 'learn.combo': '⚡ Tactics', 'learn.endgame': '👑 Endgames', 'learn.catOpening': 'Opening principles', 'learn.catCombo': 'Tactics', 'learn.catEndgame': 'Endgames', 'learn.studyTitle': '🎓 {title}', 'learn.openingToast': '🎓 “{title}” opened. Use ▶ to read the commentary one move at a time',
      'games.vs': ' vs. ', 'games.meta': '{white} vs. {black} · {year}', 'games.metaOpening': '{white} vs. {black} · {year} ({opening})', 'study.replay': 'Game replay', 'study.loaded': 'Loaded game', 'study.intro': 'Click a move or use the buttons below to replay from anywhere.',
      'puzzle.allLevels': 'All difficulties', 'puzzle.allThemes': 'All themes', 'puzzle.mateIn': 'Mate in {moves}', 'puzzle.goal': '{color} to move · mate in {moves}<br><span class="puz-idea">💡 {idea}</span>', 'puzzle.select': 'Choose a puzzle', 'puzzle.filterHelp': 'Filter by theme and tap a puzzle to try it!', 'advisor.cat': 'Coach',
      'piece.king': 'king', 'piece.queen': 'queen', 'piece.rook': 'rook', 'piece.bishop': 'bishop', 'piece.knight': 'knight', 'piece.pawn': 'pawn', 'piece.classic': 'Classic', 'piece.forest': 'Forest friends', 'piece.sea': 'Sea friends', 'piece.farm': 'Farm friends', 'piece.savanna': 'Savanna friends',
    },
  };

  let lang = 'ja';
  const listeners = [];
  function format(value, vars) {
    return String(value).replace(/\{(\w+)\}/g, (_, key) => vars && vars[key] !== undefined ? vars[key] : `{${key}}`);
  }
  function t(key, vars) {
    const value = (dict[lang] && dict[lang][key]) || dict.ja[key] || key;
    return format(value, vars);
  }
  function applyStatic(root = document) {
    document.documentElement.lang = lang;
    root.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = t(el.dataset.i18nTitle); });
    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  }
  function setLanguage(next, notify = true) {
    lang = next === 'en' ? 'en' : 'ja';
    applyStatic();
    if (notify) listeners.forEach((fn) => fn(lang));
  }
  function onChange(fn) { listeners.push(fn); }
  return { t, applyStatic, setLanguage, onChange, get language() { return lang; } };
})();

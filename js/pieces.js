// ピースセット定義
const PIECE_SETS = {
  classic: {
    id: 'classic', name: 'クラシック', nameEn: 'Classic', emoji: false,
    glyphs: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
    names:  { k: 'キング', q: 'クイーン', r: 'ルーク', b: 'ビショップ', n: 'ナイト', p: 'ポーン' },
    namesEn: { k: 'king', q: 'queen', r: 'rook', b: 'bishop', n: 'knight', p: 'pawn' },
  },
  forest: {
    id: 'forest', name: '森のなかま', nameEn: 'Forest friends', emoji: true,
    glyphs: { k: '🐻', q: '🦊', r: '🐺', b: '🦉', n: '🦌', p: '🐿️' },
    names:  { k: 'くまさん', q: 'きつねさん', r: 'おおかみさん', b: 'ふくろうさん', n: 'しかさん', p: 'りすさん' },
    namesEn: { k: 'bear', q: 'fox', r: 'wolf', b: 'owl', n: 'deer', p: 'squirrel' },
  },
  sea: {
    id: 'sea', name: 'うみのなかま', nameEn: 'Sea friends', emoji: true,
    glyphs: { k: '🐳', q: '🐬', r: '🦀', b: '🐙', n: '🦈', p: '🐟' },
    names:  { k: 'くじらさん', q: 'いるかさん', r: 'かにさん', b: 'たこさん', n: 'さめさん', p: 'おさかなさん' },
    namesEn: { k: 'whale', q: 'dolphin', r: 'crab', b: 'octopus', n: 'shark', p: 'fish' },
  },
  farm: {
    id: 'farm', name: 'まきばのなかま', nameEn: 'Farm friends', emoji: true,
    glyphs: { k: '🐶', q: '🐱', r: '🐷', b: '🐰', n: '🐴', p: '🐤' },
    names:  { k: 'わんちゃん', q: 'ねこさん', r: 'ぶたさん', b: 'うさぎさん', n: 'ポニーさん', p: 'ひよこさん' },
    namesEn: { k: 'dog', q: 'cat', r: 'pig', b: 'rabbit', n: 'pony', p: 'chick' },
  },
  savanna: {
    id: 'savanna', name: 'サバンナのなかま', nameEn: 'Savanna friends', emoji: true,
    glyphs: { k: '🦁', q: '🐘', r: '🦏', b: '🦒', n: '🦓', p: '🐒' },
    names:  { k: 'ライオンさん', q: 'ぞうさん', r: 'サイさん', b: 'きりんさん', n: 'しまうまさん', p: 'おさるさん' },
    namesEn: { k: 'lion', q: 'elephant', r: 'rhino', b: 'giraffe', n: 'zebra', p: 'monkey' },
  },
};

// おもてなしの食べ物
const FOODS = ['🍰', '🧁', '🍩', '🍪', '🍎', '🍓', '🍇', '🍯', '🥕', '🍵', '🍮', '🥧', '🍒', '🫐'];

// 駒種の日本語名(クラシック用・メッセージ用)
const PIECE_JA = { k: 'キング', q: 'クイーン', r: 'ルーク', b: 'ビショップ', n: 'ナイト', p: 'ポーン' };

// 決め打ちで安定した食べ物を返す(待った・再描画でも変わらないように)
function foodFor(captureIndex, pieceType) {
  return FOODS[(captureIndex * 5 + pieceType.charCodeAt(0)) % FOODS.length];
}

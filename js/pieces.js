// ピースセット定義
const PIECE_SETS = {
  classic: {
    id: 'classic', name: 'クラシック', emoji: false,
    glyphs: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
    names:  { k: 'キング', q: 'クイーン', r: 'ルーク', b: 'ビショップ', n: 'ナイト', p: 'ポーン' },
  },
  forest: {
    id: 'forest', name: '森のなかま', emoji: true,
    glyphs: { k: '🐻', q: '🦊', r: '🐺', b: '🦉', n: '🦌', p: '🐿️' },
    names:  { k: 'くまさん', q: 'きつねさん', r: 'おおかみさん', b: 'ふくろうさん', n: 'しかさん', p: 'りすさん' },
  },
  sea: {
    id: 'sea', name: 'うみのなかま', emoji: true,
    glyphs: { k: '🐳', q: '🐬', r: '🦀', b: '🐙', n: '🦈', p: '🐟' },
    names:  { k: 'くじらさん', q: 'いるかさん', r: 'かにさん', b: 'たこさん', n: 'さめさん', p: 'おさかなさん' },
  },
  farm: {
    id: 'farm', name: 'まきばのなかま', emoji: true,
    glyphs: { k: '🐶', q: '🐱', r: '🐷', b: '🐰', n: '🐴', p: '🐤' },
    names:  { k: 'わんちゃん', q: 'ねこさん', r: 'ぶたさん', b: 'うさぎさん', n: 'ポニーさん', p: 'ひよこさん' },
  },
  savanna: {
    id: 'savanna', name: 'サバンナのなかま', emoji: true,
    glyphs: { k: '🦁', q: '🐘', r: '🦏', b: '🦒', n: '🦓', p: '🐒' },
    names:  { k: 'ライオンさん', q: 'ぞうさん', r: 'サイさん', b: 'きりんさん', n: 'しまうまさん', p: 'おさるさん' },
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

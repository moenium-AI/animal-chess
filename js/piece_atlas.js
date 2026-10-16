// Source rectangles and shared display geometry. / 原画の切り出し範囲と共通表示寸法。
const PIECE_ATLAS = {
  url: 'assets/pieces/miniature-atlas.png?v=1',
  width: 1086, height: 1448, size: 256, baseline: 238, maxWidth: 220,
  heights: { k: 224, q: 212, r: 200, b: 214, n: 200, p: 160 },
  frames: {
    w: { k: [96, 34, 258, 380], q: [430, 73, 227, 340], r: [766, 79, 218, 334],
      b: [102, 418, 243, 352], n: [437, 439, 233, 331], p: [786, 523, 193, 242] },
    b: { k: [97, 773, 260, 376], q: [432, 806, 231, 341], r: [769, 809, 219, 339],
      b: [125, 1151, 208, 287], n: [445, 1156, 207, 279], p: [791, 1212, 176, 221] },
  },
};

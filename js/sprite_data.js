// 3Dモード用ドット絵データ(擬人化どうぶつ・宴会アイテム・馬車)
// 注意: この定義は末尾の ; を除いて厳密なJSON。Pythonのレンダラー(検証用)がパースする。
const SPRITE_DATA = {
  "meta": { "width": 18, "height": 26, "baseline": 24 },
  "teams": {
    "w": { "A": "#e25a5a", "a": "#f2c879" },
    "b": { "A": "#5a6fb8", "a": "#a8bcd8" }
  },
  "chars": {
    "p": {
      "name": "ひよこ",
      "pal": { "o": "#3a2a22", "e": "#2a1c14", "f": "#ffd94f", "F": "#fff3b8", "d": "#e8b93a", "n": "#f28c2e" },
      "art": [
        "..................",
        "..................",
        "..................",
        "..................",
        "..................",
        "..................",
        "..................",
        "..................",
        "..................",
        ".........d........",
        "........dd........",
        ".......oooo.......",
        ".....ooffffoo.....",
        "....offffffffo....",
        "...offeffffeffo...",
        "...offffnnffffo...",
        "..offffffffffffo..",
        "..odffffffffffdo..",
        "..odAAAAAAAAAAdo..",
        "..ofAAAAAAAAAAfo..",
        "..offFFFFFFFFffo..",
        "...offFFFFFFffo...",
        "....oooooooooo....",
        "......nn..nn......",
        "..................",
        ".................."
      ]
    },
    "n": {
      "name": "うま",
      "pal": { "o": "#3a2a22", "e": "#2a1c14", "f": "#c8925a", "F": "#f0d6ae", "d": "#a87844", "m": "#7a5636", "n": "#6a4a30" },
      "art": [
        "....oo......oo....",
        "....ofo....ofo....",
        "....offo..offo....",
        "...offfoooofffo...",
        "..ommmfffffffffo..",
        "..ommffffffffffo..",
        "..omfffffffffffo..",
        "..offffffffffffo..",
        "..offfeffffefffo..",
        "..offFFFFFFFFffo..",
        "..offFFFFFFFFffo..",
        "..ofFFFFFFFFFFfo..",
        "..ofFFnFFFFnFFfo..",
        "...oFFFFFFFFFFo...",
        "....oooooooooo....",
        "....oAAAAAAAAo....",
        "...oAaAAAAAAaAo...",
        "...oAAAAAAAAAAo...",
        "...oAAAAAAAAAAo...",
        "....oAAAAAAAAo....",
        "....oaaaaaaaao....",
        ".....off..ffo.....",
        "....offf..fffo....",
        "....oooo..oooo....",
        "..................",
        ".................."
      ]
    },
    "b": {
      "name": "ふくろう",
      "pal": { "o": "#3a2a22", "e": "#2a1c14", "f": "#b08a5c", "F": "#e8d0a8", "d": "#93704a", "y": "#f2a53c", "h": "#7a5aa8", "H": "#9a7ac8", "W": "#ffffff" },
      "art": [
        ".........hh.......",
        "........hhhh......",
        ".......hhhhhh.....",
        "......hHhhhhhh....",
        "...hhhhhhhhhhhh...",
        "..offffffffffffo..",
        "..offffffffffffo..",
        "..ofWWWWffWWWWfo..",
        "..ofWWeWffWeWWfo..",
        "..ofWWWWffWWWWfo..",
        "..offfffyyfffffo..",
        "..offfffyffffffo..",
        "...offffffffffo...",
        "....oooooooooo....",
        ".....oAAAAAAo.....",
        "....oAAAAAAAAo....",
        "...oAaAAaaAAaAo...",
        "...oAAAAaaAAAAo...",
        "...oAAAAaaAAAAo...",
        "....oAAAAAAAAo....",
        "....oaaaaaaaao....",
        ".....off..ffo.....",
        "....offf..fffo....",
        "....oooo..oooo....",
        "..................",
        ".................."
      ]
    },
    "r": {
      "name": "くま",
      "pal": { "o": "#3a2a22", "e": "#2a1c14", "f": "#a8764a", "F": "#e0c096", "d": "#8a5c38", "n": "#4a3226", "h": "#9aa4b2", "H": "#c2ccd8" },
      "art": [
        "....hh..hh..hh....",
        "....hhhhhhhhhh....",
        "....hHHhhhhHHh....",
        "...ohhhhhhhhhho...",
        "..offffffffffffo..",
        "..offffffffffffo..",
        "..offffffffffffo..",
        "..offffffffffffo..",
        "..offfeffffefffo..",
        "..offFFFFFFFFffo..",
        "..offFFFnnFFFffo..",
        "..offFFFFFFFFffo..",
        "...offffffffffo...",
        "....oooooooooo....",
        ".....oAAAAAAo.....",
        "....oAAAAAAAAo....",
        "...oAaAAAAAAaAo...",
        "...oAAAAAAAAAAo...",
        "...oAAAAAAAAAAo...",
        "....oAAAAAAAAo....",
        "....oaaaaaaaao....",
        ".....off..ffo.....",
        "....offf..fffo....",
        "....oooo..oooo....",
        "..................",
        ".................."
      ]
    },
    "q": {
      "name": "ねこ",
      "pal": { "o": "#3a2a22", "e": "#2a1c14", "f": "#f5d9a8", "F": "#fff3dc", "d": "#dcbb82", "n": "#e88aa0", "p": "#f2a5a5", "y": "#e0a92e" },
      "art": [
        "...o..........o...",
        "..ofo..y.y.y.ofo..",
        "..ofpo.yyyyyopfo..",
        "..offoyyyyyyoffo..",
        "..offffffffffffo..",
        "..offffffffffffo..",
        "..offffffffffffo..",
        "..offffffffffffo..",
        "..offfeffffefffo..",
        "..offFFFFFFFFffo..",
        "..ofpFFFnnFFFpfo..",
        "..offFFFFFFFFffo..",
        "...offffffffffo...",
        "....oooooooooo....",
        ".....oAAAAAAo.....",
        "....oAAAAAAAAo....",
        "...oAaAAAAAAaAo...",
        "...oAAAAAAAAAAo...",
        "...oAAAAAAAAAAo...",
        "....oAAAAAAAAo....",
        "....oaaaaaaaao....",
        ".....off..ffo.....",
        "....offf..fffo....",
        "....oooo..oooo....",
        "..................",
        ".................."
      ]
    },
    "k": {
      "name": "ライオン",
      "pal": { "o": "#3a2a22", "e": "#2a1c14", "f": "#f0a852", "F": "#ffe0b0", "d": "#d18a38", "m": "#c05f2e", "n": "#7a4030", "p": "#f2a5a5", "y": "#e0a92e" },
      "art": [
        "......y..y..y.....",
        "......yyyyyyy.....",
        "......yAyyyAy.....",
        "...mmmmmmmmmmmm...",
        "..mmffffffffffmm..",
        ".mmffffffffffffmm.",
        ".mmffffffffffffmm.",
        ".mmffffffffffffmm.",
        ".mmfffeffffefffmm.",
        ".mmffFFFFFFFFffmm.",
        ".mmfpFFFnnFFFpfmm.",
        ".mmffFFFFFFFFffmm.",
        ".mmffffffffffffmm.",
        "..mmffffffffffmm..",
        "...mmmmmmmmmmmm...",
        "....oAAAAAAAAo....",
        "...oAaAAAAAAaAo...",
        "...oAAAAAAAAAAo...",
        "...oAAAAAAAAAAo...",
        "....oAAAAAAAAo....",
        "....oaaaaaaaao....",
        ".....off..ffo.....",
        "....offf..fffo....",
        "....oooo..oooo....",
        "..................",
        ".................."
      ]
    }
  },
  "items": {
    "meat": {
      "pal": { "o": "#3a2a22", "b": "#b05a34", "B": "#e08a54", "W": "#fff6e0" },
      "art": [
        "...oooooo...",
        "..obbbbbbo..",
        "WobBBBBBBboW",
        "WobBBBBBBboW",
        "..obbbbbbo..",
        "...oooooo..."
      ]
    },
    "cake": {
      "pal": { "o": "#3a2a22", "s": "#f6d7a0", "c": "#fff8f0", "i": "#e25a6a" },
      "art": [
        "....ii....",
        "...iiii...",
        ".cccccccc.",
        ".cccccccc.",
        ".ssssssss.",
        ".ssssssss.",
        ".oooooooo."
      ]
    },
    "mug": {
      "pal": { "o": "#3a2a22", "y": "#f2b53c", "W": "#fff8f0" },
      "art": [
        ".WWWWW...",
        "oyyyyyoo.",
        "oyyyyyo.o",
        "oyyyyyo.o",
        "oyyyyyoo.",
        "ooooooo.."
      ]
    },
    "apple": {
      "pal": { "o": "#3a2a22", "R": "#d84848", "g": "#6aa04a" },
      "art": [
        "....o...",
        "...og...",
        ".oRRRRo.",
        "oRRRRRRo",
        "oRRRRRRo",
        "oRRRRRRo",
        ".oRRRRo.",
        "..oooo.."
      ]
    },
    "table": {
      "pal": { "o": "#3a2a22", "T": "#d8a468", "t": "#a06a38" },
      "art": [
        "..oooooooooooooooo..",
        ".oTTTTTTTTTTTTTTTTo.",
        ".otttttttttttttttto.",
        "..oo............oo..",
        "..oo............oo..",
        "..oo............oo..",
        "...................."
      ]
    }
  },
  "carriage": {
    "pal": { "o": "#3a2a22", "f": "#b98757", "F": "#f0d6ae", "m": "#6a4a30", "n": "#6a4a30", "B": "#a06a38", "b": "#7c4a20", "y": "#e8c07a", "e": "#2a1c14", "W": "#ffffff" },
    "frames": [
      [
        "..............................mm......",
        ".............................mmoo.....",
        ".............................moffo....",
        ".....................mm.....offffo....",
        "....................mmmm...offfffo....",
        "oooooooooooooooo....mffffooffffeffo...",
        "oBBBBBBBBBBBBBBo....mfffffffffffffo...",
        "oBBBbbbbbbbbBBBo....mffffffffoFFno....",
        "oBBBbbbbbbbbBBBoooooffffffffffoFFo....",
        "oBBBBBBBBBBBBBBobbbbffffffffffoooo....",
        "oBBBBBBBBBBBBBBo...offffffffffo.......",
        ".oooooooooooooo....offffffffffo.......",
        "......oooo.........off.....offo.......",
        ".....oyyyyo........off......off.......",
        "....oyoyyoyo.......off......off.......",
        "....oyyooyyo.......off......off.......",
        "....oyoyyoyo......ooo......ooo........",
        ".....oyyyyo...........................",
        "......oooo............................",
        "......................................"
      ],
      [
        "..............................mm......",
        ".............................mmoo.....",
        ".............................moffo....",
        ".....................mm.....offffo....",
        "....................mmmm...offfffo....",
        "oooooooooooooooo....mffffooffffeffo...",
        "oBBBBBBBBBBBBBBo....mfffffffffffffo...",
        "oBBBbbbbbbbbBBBo....mffffffffoFFno....",
        "oBBBbbbbbbbbBBBoooooffffffffffoFFo....",
        "oBBBBBBBBBBBBBBobbbbffffffffffoooo....",
        "oBBBBBBBBBBBBBBo...offffffffffo.......",
        ".oooooooooooooo....offffffffffo.......",
        "......oooo..........off....off........",
        ".....oyyyyo.........off....off........",
        "....oyyoyoyo........off....off........",
        "....oyooyoyo.......off......off.......",
        "....oyyoyoyo......off........off......",
        ".....oyyyyo.......off........off......",
        "......oooo.......ooo........ooo.......",
        "......................................"
      ]
    ]
  }
};

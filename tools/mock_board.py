# -*- coding: utf-8 -*-
"""3Dモードの盤面表示をブラウザと同じ比率で再現して目視確認する"""
import json, os, re, zlib, struct
from render_sprites import load_data, hex2rgb, tint, write_png

SQ_W = 70
SQ_H = int(70 * 0.72)
SPR_W = 45
MARGIN_TOP = 40
OUT = os.path.join(os.path.dirname(__file__), "board_mock.png")

LIGHT = hex2rgb("#fdf3dd")
DARK = hex2rgb("#bcd9a0")
EDGE_MIX = 0.16  # タイル下端の陰

START = [
    "rnbqkbnr",
    "pppppppp",
    "........",
    "........",
    "........",
    "........",
    "PPPPPPPP",
    "RNBQKBNR",
]

def main():
    data = load_data()
    teams = data["teams"]
    W = SQ_W * 8
    H = MARGIN_TOP + SQ_H * 8 + 8
    canvas = {}

    def put(x, y, rgb):
        if 0 <= x < W and 0 <= y < H:
            canvas[(x, y)] = rgb

    # 盤(市松+下端の陰)
    for r in range(8):
        for c in range(8):
            base = LIGHT if (r + c) % 2 == 0 else DARK
            edge = tuple(int(v * (1 - EDGE_MIX)) for v in base)
            for dy in range(SQ_H):
                rgb = edge if dy >= SQ_H - 5 else base
                for dx in range(SQ_W):
                    put(c * SQ_W + dx, MARGIN_TOP + r * SQ_H + dy, rgb)

    # スプライト(奥の列から描く)
    scale = None  # per-sprite
    for r in range(8):
        for c in range(8):
            ch = START[r][c]
            if ch == ".":
                continue
            team = "w" if ch.isupper() else "b"
            key = ch.lower()
            cdef = data["chars"][key]
            pal = dict(cdef["pal"])
            pal.update(teams[team])
            art = cdef["art"]
            aw = max(len(r) for r in art)
            sc = SPR_W / float(aw)
            spr_h = int(len(art) * sc)
            x0 = c * SQ_W + (SQ_W - SPR_W) // 2
            y0 = MARGIN_TOP + r * SQ_H + SQ_H - 2 - spr_h
            # 影
            cx, cy = c * SQ_W + SQ_W // 2, MARGIN_TOP + r * SQ_H + SQ_H - 4
            for dy in range(-4, 5):
                for dx in range(-20, 21):
                    if (dx / 20.0) ** 2 + (dy / 4.0) ** 2 <= 1:
                        old = canvas.get((cx + dx, cy + dy), LIGHT)
                        put(cx + dx, cy + dy, tuple(int(v * 0.82) for v in old))
            for py in range(spr_h):
                sy = min(len(art) - 1, int(py / sc))
                row = art[sy]
                for px in range(SPR_W):
                    sx = min(aw - 1, int(px / sc))
                    chp = row[sx] if sx < len(row) else "."
                    if chp == ".":
                        continue
                    hexv = pal.get(chp)
                    if not hexv:
                        continue
                    rgb = hex2rgb(hexv)
                    if team == "b" and chp not in ("o", "e", "W"):
                        rgb = tint(rgb)
                    put(x0 + px, y0 + py, rgb)

    def get(x, y):
        return canvas.get((x, y), (243, 236, 221))
    write_png(OUT, W, H, get)
    print("wrote", OUT, W, "x", H)

if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""sprite_data.js のドット絵を目視確認用PNGに描き出す(依存ライブラリなし)"""
import json, os, re, sys, zlib, struct

SRC = os.path.join(os.path.dirname(__file__), "..", "js", "sprite_data.js")
OUT = os.path.join(os.path.dirname(__file__), "sprites_preview.png")

def load_data():
    text = open(SRC, encoding="utf-8").read()
    m = re.search(r"const SPRITE_DATA = (\{.*\});", text, re.S)
    return json.loads(m.group(1))

def hex2rgb(h):
    h = h.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))

TINT = (64, 68, 96)
def tint(rgb, k=0.25):
    return tuple(int(c * (1 - k) + t * k) for c, t in zip(rgb, TINT))

def render_art(art, pal, team=None, teams=None, tinted=False):
    """artを (w,h,pixels dict) に。palはchar->hex。team指定でA/a差し替え+暗色チーム tint"""
    w = max(len(r) for r in art)
    for i, r in enumerate(art):
        if len(r) != w:
            raise SystemExit("ROW LENGTH ERROR: row %d len=%d (expected %d): %r" % (i, len(r), w, r))
    h = len(art)
    px = {}
    p = dict(pal)
    if team and teams:
        p.update(teams[team])
    for y, row in enumerate(art):
        for x, ch in enumerate(row):
            if ch == ".":
                continue
            if ch not in p:
                raise SystemExit("UNKNOWN PALETTE CHAR %r in art" % ch)
            rgb = hex2rgb(p[ch])
            if tinted and ch not in ("o", "e", "W"):
                rgb = tint(rgb)
            px[(x, y)] = rgb
    return w, h, px

def write_png(path, w, h, get):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        for x in range(w):
            raw += bytes(get(x, y))
    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
    png += chunk(b"IEND", b"")
    open(path, "wb").write(png)

def main():
    data = load_data()
    teams = data["teams"]
    SCALE = 6
    PAD = 8
    sprites = []  # (w, h, px)
    # キャラ: 白チーム/黒チームを並べる
    for key in ["k", "q", "r", "b", "n", "p"]:
        c = data["chars"][key]
        sprites.append(render_art(c["art"], c["pal"], "w", teams, tinted=False))
        sprites.append(render_art(c["art"], c["pal"], "b", teams, tinted=True))
    row1 = sprites
    row2 = []
    for key in ["meat", "cake", "mug", "apple", "table"]:
        it = data["items"][key]
        row2.append(render_art(it["art"], it["pal"]))
    for fr in data["carriage"]["frames"]:
        row2.append(render_art(fr, data["carriage"]["pal"]))
    rows = [row1, row2]
    row_ws = [sum(s[0] for s in r) * SCALE + PAD * (len(r) + 1) for r in rows]
    row_hs = [max(s[1] for s in r) * SCALE + PAD * 2 for r in rows]
    W = max(row_ws)
    H = sum(row_hs)
    # 背景: 薄い市松模様(透明部分が見えるように)
    canvas = {}
    y0 = 0
    for r, rh in zip(rows, row_hs):
        x0 = PAD
        for (sw, sh, px) in r:
            base_y = y0 + rh - PAD - sh * SCALE  # 下揃え
            for (x, y), rgb in px.items():
                for dy in range(SCALE):
                    for dx in range(SCALE):
                        canvas[(x0 + x * SCALE + dx, base_y + y * SCALE + dy)] = rgb
            x0 += sw * SCALE + PAD
        y0 += rh
    def get(x, y):
        if (x, y) in canvas:
            return canvas[(x, y)]
        return (238, 234, 224) if ((x // 24) + (y // 24)) % 2 == 0 else (222, 218, 206)
    write_png(OUT, W, H, get)
    print("wrote", OUT, W, "x", H)

if __name__ == "__main__":
    main()

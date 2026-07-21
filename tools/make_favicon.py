# -*- coding: utf-8 -*-
"""3Dモードのキング(ライオン)の顔から favicon.svg / favicon.png を生成する。

favicon は正方形が前提なので、ライオンの頭(王冠〜たてがみ)を切り出して使う。
SVG はどのサイズでもドットがぼやけない(crispEdges)ので主アイコン、
PNG は SVG 非対応ブラウザ向けの控え。
"""
import os
import re
import json
import zlib
import struct

HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, "..", "js", "sprite_data.js")
OUT_SVG = os.path.join(HERE, "..", "favicon.svg")
OUT_PNG = os.path.join(HERE, "..", "favicon.png")
PREVIEW = os.path.join(HERE, "favicon_preview.png")

# 切り出す範囲(ライオンの頭部。王冠の先〜たてがみの下端まで)
ROW0, ROW1 = 0, 17   # 王冠の先〜たてがみ下端
COL0, COL1 = 1, 24   # たてがみの左端〜右端
TEAM = "w"           # しろチーム(赤い衣装)の配色


def load_data():
    text = open(SRC, encoding="utf-8").read()
    m = re.search(r"const SPRITE_DATA = (\{.*\});", text, re.S)
    return json.loads(m.group(1))


def hex2rgb(h):
    h = h.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def build_pixels():
    """切り出した領域を正方形の中央に配置して {(x, y): (r, g, b)} で返す。

    favicon は正方形が前提なので、切り出しが横長・縦長でも
    余白を均等に足して正方形にする(余白は透明のまま)。
    """
    data = load_data()
    lion = data["chars"]["k"]
    pal = dict(lion["pal"])
    pal.update(data["teams"][TEAM])
    cw = COL1 - COL0 + 1
    ch = ROW1 - ROW0 + 1
    size = max(cw, ch)
    offx = (size - cw) // 2
    offy = (size - ch) // 2
    px = {}
    for y in range(ROW0, ROW1 + 1):
        row = lion["art"][y]
        for x in range(COL0, COL1 + 1):
            c = row[x] if x < len(row) else "."
            if c == ".":
                continue
            if c not in pal:
                raise SystemExit("UNKNOWN PALETTE CHAR %r" % c)
            px[(x - COL0 + offx, y - ROW0 + offy)] = hex2rgb(pal[c])
    return px, size, size


def write_svg(px, w, h):
    """同じ色が横に続く部分は1つの矩形にまとめて出力する。"""
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" '
        'shape-rendering="crispEdges">' % (w, h)
    ]
    for y in range(h):
        x = 0
        while x < w:
            c = px.get((x, y))
            if c is None:
                x += 1
                continue
            run = 1
            while x + run < w and px.get((x + run, y)) == c:
                run += 1
            parts.append(
                '<rect x="%d" y="%d" width="%d" height="1" fill="#%02x%02x%02x"/>'
                % (x, y, run, c[0], c[1], c[2])
            )
            x += run
    parts.append("</svg>")
    svg = "".join(parts)
    open(OUT_SVG, "w", encoding="utf-8").write(svg + "\n")
    return len(svg)


def write_png_rgba(path, w, h, get_rgba):
    raw = bytearray()
    for y in range(h):
        raw.append(0)  # フィルタなし
        for x in range(w):
            raw += bytes(get_rgba(x, y))

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))  # 6 = RGBA
    png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
    png += chunk(b"IEND", b"")
    open(path, "wb").write(png)


def main():
    px, w, h = build_pixels()
    n = write_svg(px, w, h)
    print("wrote %s (%dx%d dots, %d bytes)" % (OUT_SVG, w, h, n))

    # PNG は4倍(ニアレストネイバー)で出力。ドットが潰れないように整数倍にする。
    scale = 4
    def get(x, y):
        c = px.get((x // scale, y // scale))
        return (c[0], c[1], c[2], 255) if c else (0, 0, 0, 0)
    write_png_rgba(OUT_PNG, w * scale, h * scale, get)
    print("wrote %s (%dx%d)" % (OUT_PNG, w * scale, h * scale))

    # 目視確認用: 実際のタブ表示サイズ(16px)と拡大版を市松模様の上に並べる
    pad = 6
    cells = [(1, "16px相当"), (2, "32px相当"), (8, "拡大")]
    total_w = sum(w * s for s, _ in cells) + pad * (len(cells) + 1)
    total_h = max(h * s for s, _ in cells) + pad * 2
    canvas = {}
    ox = pad
    for s, _ in cells:
        oy = total_h - pad - h * s
        for (sx, sy), c in px.items():
            for dy in range(s):
                for dx in range(s):
                    canvas[(ox + sx * s + dx, oy + sy * s + dy)] = c
        ox += w * s + pad

    def prev(x, y):
        if (x, y) in canvas:
            r, g, b = canvas[(x, y)]
            return (r, g, b, 255)
        v = 235 if ((x // 8) + (y // 8)) % 2 == 0 else 215
        return (v, v, v, 255)

    write_png_rgba(PREVIEW, total_w, total_h, prev)
    print("wrote %s (preview)" % PREVIEW)


if __name__ == "__main__":
    main()

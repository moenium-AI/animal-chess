#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Validate staging PNG headers and chunk integrity before integrating pixel-HD art.

Usage: python tools/check_pixel_hd_source.py path/to/staging-folder
Requires only the Python standard library. Does NOT publish or resize images.
"""
import argparse
import struct
import sys
import zlib
from pathlib import Path

EXPECTED = {
    **{f"pieces/{team}_{kind}_{name}.png": (40, 52)
       for team in ("w", "b")
       for kind, name in (("k", "lion_king"), ("q", "cat_queen"),
                          ("r", "bear_rook"), ("b", "owl_bishop"),
                          ("n", "deer_knight"), ("p", "chick_pawn"))},
    "banquet/table.png": (80, 28),
    "banquet/meat.png": (24, 12),
    "banquet/cake.png": (20, 14),
    "banquet/mug.png": (18, 12),
    "banquet/apple.png": (16, 16),
}
SIG = bytes.fromhex("89504e470d0a1a0a")
MAX_PNG_SIZE = 512 * 1024


def verify_png(path, expected):
    buf = path.read_bytes()
    if len(buf) > MAX_PNG_SIZE or not buf.startswith(SIG):
        raise ValueError("not a bounded PNG")
    pos = 8
    ihdr = None
    has_idat = False
    has_iend = False
    while pos + 12 <= len(buf):
        size = struct.unpack_from(">I", buf, pos)[0]
        typ = buf[pos + 4:pos + 8]
        stop = pos + 12 + size
        if stop > len(buf):
            raise ValueError("truncated PNG chunk")
        payload = buf[pos + 8:pos + 8 + size]
        crc = struct.unpack_from(">I", buf, pos + 8 + size)[0]
        if zlib.crc32(typ + payload) & 0xFFFFFFFF != crc:
            raise ValueError("PNG chunk CRC mismatch")
        if typ == b"IHDR":
            if ihdr is not None or size != 13:
                raise ValueError("invalid IHDR")
            w, h, depth, color, compression, filtering, interlace = struct.unpack(">IIBBBBB", payload)
            if (w, h) != expected or (depth, color, compression, filtering, interlace) != (8, 6, 0, 0, 0):
                raise ValueError(f"expected {expected} RGBA8 non-interlaced, got {w}x{h} ({depth},{color})")
            ihdr = (w, h)
        elif typ == b"IDAT":
            if ihdr is None:
                raise ValueError("IDAT before IHDR")
            has_idat = True
        elif typ == b"IEND":
            if size or not has_idat or ihdr is None or stop != len(buf):
                raise ValueError("invalid PNG end")
            has_iend = True
            break
        pos = stop
    if not has_iend:
        raise ValueError("missing PNG end")
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="unpacked source folder with pieces/ and banquet/")
    args = parser.parse_args()
    errors = []
    for rel, expected in EXPECTED.items():
        file = args.source / rel
        try:
            verify_png(file, expected)
        except (OSError, ValueError) as exc:
            errors.append(f"{rel}: {exc}")
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"PASS: {len(EXPECTED)} bounded RGBA PNGs, correct dimensions and CRCs")
    print("Note: this is structural PNG validation; artistic review and actual browser rendering remain required.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

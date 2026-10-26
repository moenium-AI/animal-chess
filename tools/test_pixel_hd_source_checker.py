#!/usr/bin/env python3
"""Self-test for the pixel HD source-asset structural validator."""
import importlib.util
import struct
import tempfile
import unittest
import zlib
from pathlib import Path

MODULE = Path(__file__).with_name("check_pixel_hd_source.py")
spec = importlib.util.spec_from_file_location("check_pixel_hd_source", MODULE)
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


def chunk(tag, payload):
    body = tag + payload
    return struct.pack(">I", len(payload)) + body + struct.pack(">I", zlib.crc32(body) & 0xFFFFFFFF)


def valid_image(w, h):
    header = chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
    # RGBA rows with no filtering, bounded size, and non-opaque background.
    scan = (b"\x00" + b"\x00\x00\x00\x00" * w) * h
    return checker.SIG + header + chunk(b"IDAT", zlib.compress(scan)) + chunk(b"IEND", b"")


class ArtValidatorTest(unittest.TestCase):
    def test_contract(self):
        self.assertEqual(len(checker.EXPECTED), 17)
        self.assertEqual(checker.EXPECTED["pieces/w_k_lion_king.png"], (40, 52))
        with tempfile.TemporaryDirectory() as tmp:
            file = Path(tmp) / "piece.png"
            file.write_bytes(valid_image(40, 52))
            self.assertTrue(checker.verify_png(file, (40, 52)))
            with self.assertRaisesRegex(ValueError, "expected"):
                checker.verify_png(file, (52, 40))

    def test_corruption(self):
        with tempfile.TemporaryDirectory() as tmp:
            file = Path(tmp) / "bad.png"
            payload = bytearray(valid_image(40, 52))
            payload[46] ^= 1
            file.write_bytes(payload)
            with self.assertRaisesRegex(ValueError, "CRC"):
                checker.verify_png(file, (40, 52))
            file.write_bytes(valid_image(40, 52)[:-12])
            with self.assertRaisesRegex(ValueError, "missing PNG end"):
                checker.verify_png(file, (40, 52))


if __name__ == "__main__":
    unittest.main()

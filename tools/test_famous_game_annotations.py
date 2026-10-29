# -*- coding: utf-8 -*-
"""Verify the five added games against their independent, move-only PGN."""
from pathlib import Path
import re
import unittest

import chess
import chess.pgn

from famous_games_extra import EXTRA_FAMOUS_GAMES

REFERENCE = Path(__file__).parent / "reference" / "famous_games_2026.pgn"
EXPECTED = {
    "capablanca_tartakower_1924": (103, "1-0", "6k1/2R3P1/1pKP4/8/r7/8/8/8 b - - 0 52"),
    "botvinnik_tal_1960": (92, "0-1", "8/2R4p/6p1/8/3k1P2/2p3KP/8/4r3 w - - 2 47"),
    "karpov_kasparov_1985": (80, "0-1", "8/5pk1/7p/8/1p4P1/1P1R2P1/3N1qBP/3Nr2K w - - 1 41"),
    "hou_polgar_2012": (93, "1-0", "3R4/5pk1/prr1b2p/5P1R/8/1P1B2P1/2PK3P/8 b - - 0 47"),
    "carlsen_karjakin_2016": (99, "1-0", "2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"),
}
PIECE_TYPES = {
    "キング": chess.KING,
    "クイーン": chess.QUEEN,
    "ルーク": chess.ROOK,
    "ビショップ": chess.BISHOP,
    "ナイト": chess.KNIGHT,
    "ポーン": chess.PAWN,
}
EXPLICIT_ATTACK = re.compile(
    r"([a-h][1-8])の(キング|クイーン|ルーク|ビショップ|ナイト|ポーン)"
    r"(?:を|に)(?:も)?(?:狙|攻め|にら|当て|見張)"
)


def replay(game, plies=None):
    board = chess.Board()
    for san, _, _ in game["moves"][:plies]:
        board.push_san(san)
    return board


class FamousGameAnnotationsTest(unittest.TestCase):
    def test_move_only_pgn_and_complete_bilingual_annotations(self):
        self.assertEqual([game["id"] for game in EXTRA_FAMOUS_GAMES], list(EXPECTED))
        with REFERENCE.open(encoding="utf-8") as source:
            for game in EXTRA_FAMOUS_GAMES:
                with self.subTest(game=game["id"]):
                    reference = chess.pgn.read_game(source)
                    self.assertIsNotNone(reference)
                    self.assertEqual(reference.errors, [])
                    expected_plies, result, fen = EXPECTED[game["id"]]
                    self.assertEqual(reference.headers["Result"], result)
                    self.assertEqual(game["result"], result)
                    self.assertEqual(len(game["moves"]), expected_plies)

                    reference_board = reference.board()
                    reference_sans = []
                    for move in reference.mainline_moves():
                        reference_sans.append(reference_board.san(move))
                        reference_board.push(move)
                    self.assertEqual([move[0] for move in game["moves"]], reference_sans)
                    self.assertEqual(reference_board.fen(), fen)
                    self.assertEqual(replay(game).fen(), fen)

                    for key in ("title", "white", "black", "opening", "intro", "takeaway"):
                        self.assertTrue(game[key].strip(), (game["id"], key))
                        self.assertTrue(game["en"][key].strip(), (game["id"], key))
                    for ply, (san, japanese, english) in enumerate(game["moves"], 1):
                        self.assertTrue(japanese.strip(), (game["id"], ply, san))
                        self.assertTrue(english.strip(), (game["id"], ply, san))
            self.assertIsNone(chess.pgn.read_game(source))

    def test_explicit_attack_claims(self):
        # Check the precisely phrased claims this pattern recognizes. Other prose
        # still needs human review; this is not a claim of full semantic coverage.
        checked = 0
        for game in EXTRA_FAMOUS_GAMES:
            board = chess.Board()
            for ply, (san, japanese, _) in enumerate(game["moves"], 1):
                move = board.parse_san(san)
                board.push(move)
                attacker = board.piece_at(move.to_square)
                for match in EXPLICIT_ATTACK.finditer(japanese):
                    square_name, piece_name = match.groups()
                    square = chess.parse_square(square_name)
                    target = board.piece_at(square)
                    with self.subTest(game=game["id"], ply=ply, claim=match.group(0)):
                        self.assertIsNotNone(target)
                        self.assertEqual(target.piece_type, PIECE_TYPES[piece_name])
                        self.assertNotEqual(target.color, attacker.color)
                        self.assertIn(square, board.attacks(move.to_square))
                    checked += 1
        self.assertGreater(checked, 0)

    def test_carlsen_en_passant_and_final_mating_lines(self):
        game = next(game for game in EXTRA_FAMOUS_GAMES if game["id"] == "carlsen_karjakin_2016")
        board = replay(game, 29)
        move = board.parse_san(game["moves"][29][0])
        self.assertTrue(board.is_en_passant(move))
        self.assertEqual(board.san(move), "axb3")

        board = replay(game)
        self.assertTrue(board.is_check())
        self.assertFalse(board.is_checkmate())
        self.assertEqual({board.san(move) for move in board.legal_moves}, {"Kxh6", "gxh6"})
        for defense, mate in (("Kxh6", "Rh8#"), ("gxh6", "Rxf7#")):
            variation = board.copy()
            variation.push_san(defense)
            variation.push_san(mate)
            self.assertTrue(variation.is_checkmate(), defense)

    def test_resignation_positions_are_not_described_as_played_mates(self):
        games = {game["id"]: game for game in EXTRA_FAMOUS_GAMES}
        tal = games["botvinnik_tal_1960"]
        self.assertEqual(tal["moves"][-1][0], "Kd4")
        self.assertIn("封じ手", tal["intro"])
        self.assertFalse(replay(tal).is_game_over())

        kasparov = games["karpov_kasparov_1985"]
        self.assertEqual(kasparov["moves"][-1][0], "Re1+")
        self.assertTrue(replay(kasparov).is_check())
        self.assertFalse(replay(kasparov).is_checkmate())

        carlsen = games["carlsen_karjakin_2016"]
        self.assertEqual(carlsen["moves"][-1][0], "Qh6+")
        self.assertIn("投了", carlsen["moves"][-1][1])
        self.assertIn("resigns", carlsen["moves"][-1][2])


if __name__ == "__main__":
    unittest.main()

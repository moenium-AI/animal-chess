# -*- coding: utf-8 -*-
"""Check revised original famous games against move-only sources and positions."""
from pathlib import Path
import re
import unittest

import chess
import chess.pgn

from games_en import EN
from games_gen import GAMES

REFERENCE = Path(__file__).parent / "reference" / "famous_games_original_2026.pgn"
ORIGINAL_IDS = [
    "opera", "immortal", "evergreen", "reti_tartakower", "lasker_thomas",
    "legal", "canal", "levitsky_marshall", "byrne_fischer",
    "deepblue_kasparov", "kasparov_topalov", "paulsen_morphy",
    "steinitz_bardeleben", "fischer_spassky72", "larsen_spassky",
]
PIECE_TYPES = {
    "キング": chess.KING, "クイーン": chess.QUEEN, "ルーク": chess.ROOK,
    "ビショップ": chess.BISHOP, "ナイト": chess.KNIGHT, "ポーン": chess.PAWN,
}
EXPLICIT_ATTACK = re.compile(
    r"([a-h][1-8])の(キング|クイーン|ルーク|ビショップ|ナイト|ポーン)"
    r"(?:を|に)(?:も)?(?:狙|攻め|にら|当て|見張)"
)


def game_by_id(game_id):
    return next(game for game in GAMES if game["id"] == game_id)


def board_after(game_id, plies):
    board = chess.Board()
    for san, _ in game_by_id(game_id)["moves"][:plies]:
        board.push_san(san)
    return board


class RevisedFamousGamesTest(unittest.TestCase):
    def test_reference_scores_and_documented_transposition(self):
        self.assertEqual([game["id"] for game in GAMES[:15]], ORIGINAL_IDS)
        expected_reference_ids = set(ORIGINAL_IDS) - {"legal"}
        found = set()
        with REFERENCE.open(encoding="utf-8") as source:
            while (reference := chess.pgn.read_game(source)) is not None:
                self.assertEqual(reference.errors, [])
                game_id = reference.headers["GameID"]
                self.assertNotIn(game_id, found)
                found.add(game_id)
                game = game_by_id(game_id)
                self.assertEqual(game["result"], reference.headers["Result"])
                reference_board = reference.board()
                reference_sans = []
                for move in reference.mainline_moves():
                    reference_sans.append(reference_board.san(move))
                    reference_board.push(move)
                own_sans = [san for san, _ in game["moves"]]
                if game_id == "levitsky_marshall":
                    # Sources reverse White's first and second moves.
                    source_after_two = reference.board()
                    own_after_two = chess.Board()
                    for san in reference_sans[:4]:
                        source_after_two.push_san(san)
                    for san in own_sans[:4]:
                        own_after_two.push_san(san)
                    self.assertEqual(source_after_two.fen(), own_after_two.fen())
                    self.assertEqual(reference_sans[4:], own_sans[4:])
                else:
                    self.assertEqual(reference_sans, own_sans, game_id)
                self.assertEqual(board_after(game_id, len(own_sans)).fen(), reference_board.fen())
        self.assertEqual(found, expected_reference_ids)

    def test_complete_annotations_and_explicit_attack_claims(self):
        total_plies = 0
        attack_claims = 0
        for game in GAMES[:15]:
            board = chess.Board()
            en = EN[game["id"]]
            self.assertEqual(len(game["moves"]), len(en["notes"]))
            for key in ("intro", "takeaway"):
                self.assertTrue(game[key].strip())
                self.assertTrue(en[key].strip())
            for ply, ((san, ja), english) in enumerate(zip(game["moves"], en["notes"]), 1):
                self.assertTrue(ja.strip())
                self.assertTrue(english.strip())
                move = board.parse_san(san)
                self.assertEqual(board.san(move), san)
                board.push(move)
                attacker = board.piece_at(move.to_square)
                for match in EXPLICIT_ATTACK.finditer(ja):
                    square = chess.parse_square(match.group(1))
                    target = board.piece_at(square)
                    with self.subTest(game=game["id"], ply=ply, claim=match.group(0)):
                        self.assertIsNotNone(target)
                        self.assertEqual(target.color, not attacker.color)
                        self.assertEqual(target.piece_type, PIECE_TYPES[match.group(2)])
                        self.assertIn(square, board.attacks(move.to_square))
                    attack_claims += 1
                total_plies += 1
        self.assertEqual(total_plies, 695)
        self.assertGreater(attack_claims, 0)

    def test_lasker_played_mate_and_unplayed_castling_alternative(self):
        game = game_by_id("lasker_thomas")
        self.assertEqual(game["moves"][-1][0], "Kd2#")
        before = board_after("lasker_thomas", len(game["moves"]) - 1)
        for san in ("Kd2#", "O-O-O#"):
            variation = before.copy()
            variation.push_san(san)
            self.assertTrue(variation.is_checkmate(), san)
        self.assertIn("実戦では指されていない", game["moves"][-1][1])
        self.assertIn("not played", EN[game["id"]]["notes"][-1])

    def test_marshall_queen_captures_and_continuations(self):
        board = board_after("levitsky_marshall", 46)
        self.assertEqual({board.san(move) for move in board.legal_moves
                          if move.to_square == chess.G3}, {"hxg3", "fxg3", "Qxg3"})
        for line in (("hxg3", "Ne2#"), ("fxg3", "Ne2+", "Kh1", "Rxf1#")):
            variation = board.copy()
            for san in line:
                variation.push_san(san)
            self.assertTrue(variation.is_checkmate(), line)
        fork = board.copy()
        fork.push_san("Qxg3")
        fork.push_san("Ne2+")
        self.assertTrue(fork.is_check())
        self.assertEqual(fork.piece_at(chess.G3), chess.Piece(chess.QUEEN, chess.WHITE))
        self.assertIn(chess.G3, fork.attacks(chess.E2))

    def test_recorded_checks_and_captured_pieces(self):
        # 15...Nxc3 in Byrne-Fischer takes a pawn and is not check.
        before = board_after("byrne_fischer", 29)
        move = before.parse_san("Nxc3")
        self.assertEqual(before.piece_at(move.to_square), chess.Piece(chess.PAWN, chess.WHITE))
        before.push(move)
        self.assertFalse(before.is_check())
        note = game_by_id("byrne_fischer")["moves"][29][1]
        self.assertIn("ポーン", note)
        self.assertIn("pawn", EN["byrne_fischer"]["notes"][29])

        # 10.Bg6+ permits an interposing queen in addition to the played Kd8.
        check = board_after("deepblue_kasparov", 19)
        self.assertTrue(check.is_check())
        self.assertIn("Qf7", {check.san(move) for move in check.legal_moves})
        self.assertIn("Qf7", game_by_id("deepblue_kasparov")["moves"][18][1])

        # Both kings have castled queenside after 13...O-O-O.
        board = board_after("kasparov_topalov", 26)
        self.assertEqual(board.king(chess.WHITE), chess.B1)
        self.assertEqual(board.king(chess.BLACK), chess.C8)

    def test_steinitz_rook_is_capturable_and_replay_stops(self):
        board = board_after("steinitz_bardeleben", 43)
        self.assertEqual({board.san(move) for move in board.legal_moves},
                         {"Kf8", "Kd8", "Kxe7", "Qxe7"})
        board.push_san("Qxe7")
        board.push_san("Rxc8+")
        self.assertTrue(board.is_check())
        later = board_after("steinitz_bardeleben", 47)
        self.assertTrue({"Kxg7", "Qxg7"} <= {later.san(move) for move in later.legal_moves})
        finish = board_after("steinitz_bardeleben", 49)
        self.assertTrue(finish.is_check())
        self.assertFalse(finish.is_checkmate())
        self.assertEqual(game_by_id("steinitz_bardeleben")["moves"][-1][0], "Rxh7+")

    def test_illustrative_legal_and_larsen_resignation(self):
        legal = game_by_id("legal")
        self.assertIn("諸説", legal["intro"])
        self.assertIn("illustrates", EN["legal"]["intro"])
        larsen = game_by_id("larsen_spassky")
        self.assertEqual(larsen["result"], "0-1")
        self.assertIn("白は", larsen["moves"][-1][1])
        self.assertIn("White resigned", EN[larsen["id"]]["notes"][-1])


if __name__ == "__main__":
    unittest.main()

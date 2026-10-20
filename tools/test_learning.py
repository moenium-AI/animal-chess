"""Regression checks for audited claims, complete puzzle trees and safe generation."""
import contextlib
import copy
import io
import json
import shutil
import subprocess
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import chess
import audit_learning
import generated_output
import games_gen
import lessons_gen
import verify_puzzles

ROOT = Path(__file__).resolve().parents[1]


class LearningTests(unittest.TestCase):
    def test_endgame_claims_against_saved_tablebase(self):
        lessons = {x['id']: x for x in lessons_gen.LESSONS}
        evidence = json.loads((ROOT / 'docs/learning-fixes-tablebase.json').read_text(encoding='utf-8'))
        for name, expected in [('lucena', 'win'), ('philidor', 'draw'), ('triangulation', 'win')]:
            lesson = lessons['eg_' + name]
            board = chess.Board(lesson['fen'])
            records = [r for r in evidence if r['lesson'] == name]
            self.assertEqual(len(records), len(lesson['moves']) + 1)
            for ply, record in enumerate(records):
                if ply:
                    board.push_san(lesson['moves'][ply - 1][0])
                self.assertEqual(board.fen(), record['fen'])
                category = expected if expected == 'draw' or board.turn else 'loss'
                self.assertEqual(record['response']['category'], category, (name, ply))
            if name == 'triangulation':
                self.assertEqual(records[0]['fen'].split()[0], records[5]['fen'].split()[0])
                self.assertNotEqual(records[0]['fen'].split()[1], records[5]['fen'].split()[1])
                self.assertEqual(next(m for m in records[0]['response']['moves'] if m['san'] == 'c6+')['category'], 'draw')
            if name == 'lucena':
                self.assertEqual(next(m for m in records[6]['response']['moves'] if m['san'] == 'Kd5')['category'], 'draw')
                self.assertNotIn('Kxe8', [board.san(m) for m in board.legal_moves])

    def test_zwischenzug_keeps_bishop_and_wins_extra_pawn(self):
        lesson = next(l for l in lessons_gen.LESSONS if l['id'] == 'cb_zwischenzug')
        direct = chess.Board(lesson['fen']); direct.push_san('Rxd8')
        board = chess.Board(lesson['fen']); board.push_san('Bxh2+')
        self.assertEqual(set(board.san(m) for m in board.legal_moves), {'Kh1', 'Kf1'})
        for reply in ['Kh1', 'Kf1']:
            branch = board.copy(); branch.push_san(reply); branch.push_san('Rxd8')
            for piece in [chess.ROOK, chess.BISHOP, chess.KNIGHT]:
                self.assertEqual(len(branch.pieces(piece, chess.BLACK)), len(direct.pieces(piece, chess.BLACK)))
            self.assertEqual(len(branch.pieces(chess.PAWN, chess.WHITE)), len(direct.pieces(chess.PAWN, chess.WHITE)) - 1)

    def test_complete_puzzle_trees_with_independent_solver(self):
        puzzles = audit_learning.read_data('puzzles.js', 'PUZZLES')
        states = 0
        for puzzle in puzzles:
            if puzzle.get('objective') == 'tactic':
                board = chess.Board(puzzle['fen'])
                self.assertTrue(board.is_valid())
                self.assertEqual(puzzle['mateIn'], 1)
                self.assertEqual(puzzle['continuations'], {board.fen() + '|1': puzzle['solutions']})
                for san in puzzle['solutions']:
                    move = board.parse_san(san)
                    board.push(move)
                    self.assertFalse(board.is_checkmate())
                    board.pop()
                states += 1
                continue
            tree = puzzle['continuations']; visited = set()
            def walk(board, remaining):
                key = board.fen() + '|' + str(remaining)
                if key in visited: return
                visited.add(key)
                expected = audit_learning.mate_starts(board, remaining)
                self.assertEqual(sorted(tree[key]), expected, key)
                for san in expected:
                    board.push_san(san)
                    if not board.is_checkmate():
                        self.assertGreater(remaining, 1)
                        self.assertFalse(board.is_game_over())
                        for reply in list(board.legal_moves):
                            board.push(reply); walk(board, remaining - 1); board.pop()
                    board.pop()
            walk(chess.Board(puzzle['fen']), puzzle['mateIn'])
            self.assertEqual(set(tree), visited)
            states += len(visited)
        print(f'Independent solver: {len(puzzles)} puzzles, {states} continuation states')

    def test_invalid_content_does_not_replace_output(self):
        for module, variable in [(lessons_gen, 'LESSONS'), (games_gen, 'GAMES')]:
            data = copy.deepcopy(getattr(module, variable))
            data[0]['moves'][0] = ('Ka9', 'invalid')
            with tempfile.TemporaryDirectory() as folder:
                target = Path(folder) / 'data.js'; target.write_bytes(b'keep existing data')
                with patch.object(module, variable, data), patch('sys.argv', ['generator', str(target)]), contextlib.redirect_stdout(io.StringIO()):
                    with self.assertRaises(SystemExit) as error: module.main()
                self.assertEqual(error.exception.code, 1)
                self.assertEqual(target.read_bytes(), b'keep existing data')

    def test_puzzle_builder_rejects_invalid_catalog_before_writing(self):
        node = shutil.which('node')
        if not node:
            self.skipTest('Node.js is required to exercise the puzzle builder')
        original = json.loads((ROOT / 'tools/puzzle_catalog.json').read_text(encoding='utf-8'))
        cases = []
        for field, value in [('mateIn', 4), ('solutions', [])]:
            data = copy.deepcopy(original)
            data['puzzles'][0][field] = value
            cases.append(json.dumps(data))
        duplicate = copy.deepcopy(original)
        duplicate['puzzles'][1]['id'] = duplicate['puzzles'][0]['id']
        cases.extend([json.dumps(duplicate), '{invalid JSON'])
        for data in cases:
            with self.subTest(catalog=data[:100]), tempfile.TemporaryDirectory() as folder:
                sandbox = Path(folder)
                (sandbox / 'tools').mkdir(); (sandbox / 'js').mkdir()
                # Run the real builder in an isolated copy; never overwrite shipped files.
                builder = sandbox / 'tools/build_puzzles.cjs'
                shutil.copyfile(ROOT / 'tools/build_puzzles.cjs', builder)
                (sandbox / 'tools/puzzle_catalog.json').write_text(data, encoding='utf-8')
                outputs = [sandbox / 'js' / name for name in ['puzzles.js', 'puzzle_en.js']]
                for output in outputs:
                    output.write_bytes(b'keep existing data')
                result = subprocess.run([node, str(builder)], capture_output=True, timeout=20)
                self.assertNotEqual(result.returncode, 0)
                for output in outputs:
                    self.assertEqual(output.read_bytes(), b'keep existing data')
                self.assertEqual(sorted(p.name for p in (sandbox / 'js').iterdir()),
                                 ['puzzle_en.js', 'puzzles.js'])

    def validate_puzzles(self, puzzles):
        with patch.object(verify_puzzles, 'read_catalog', return_value=puzzles), contextlib.redirect_stdout(io.StringIO()):
            verify_puzzles.main()

    def test_puzzle_validator_accepts_reordered_mate_answers(self):
        puzzle = copy.deepcopy(next(p for p in verify_puzzles.read_catalog()
                                   if p['id'] == 'mate-queen-knight-endgame'))
        puzzle['solutions'].reverse()
        for answers in puzzle['continuations'].values():
            answers.reverse()
        self.validate_puzzles([puzzle])
        # Order independence must not conceal a missing legal alternative.
        answers = next(a for a in puzzle['continuations'].values() if len(a) > 1)
        answers.pop()
        with self.assertRaisesRegex(ValueError, 'continuation tree'):
            self.validate_puzzles([puzzle])

    def test_puzzle_validator_checks_all_tactical_alternatives(self):
        original = next(p for p in verify_puzzles.read_catalog() if p['id'] == 'tactic-double-check')
        puzzle = copy.deepcopy(original)
        puzzle['solutions'].reverse()
        self.validate_puzzles([puzzle])
        for wrong in ['Ka9', 'Bg6', 'Bg6+']:
            invalid = copy.deepcopy(original)
            invalid['solutions'][1] = wrong
            invalid['continuations'][invalid['fen'] + '|1'] = list(invalid['solutions'])
            with self.subTest(answer=wrong), self.assertRaises(ValueError):
                self.validate_puzzles([invalid])

    def test_puzzle_validator_rejects_wrong_mate_depth_without_writes(self):
        puzzle = copy.deepcopy(verify_puzzles.read_catalog()[0])
        self.assertEqual(puzzle['mateIn'], 1)
        puzzle['mateIn'] = 2
        outputs = [ROOT / 'js' / name for name in ['puzzles.js', 'puzzle_en.js']]
        before = [output.read_bytes() for output in outputs]
        with self.assertRaisesRegex(ValueError, 'Incorrect shortest mate'):
            self.validate_puzzles([puzzle])
        self.assertEqual([output.read_bytes() for output in outputs], before)

    def test_atomic_replace_failure_keeps_previous_file(self):
        with tempfile.TemporaryDirectory() as folder:
            target = Path(folder) / 'data.js'; target.write_text('previous', encoding='utf-8')
            with patch.object(generated_output.os, 'replace', side_effect=OSError('test failure')):
                with self.assertRaises(OSError): generated_output.atomic_write(target, 'next')
            self.assertEqual(target.read_text(encoding='utf-8'), 'previous')
            self.assertEqual(list(Path(folder).iterdir()), [target])


if __name__ == '__main__':
    unittest.main()

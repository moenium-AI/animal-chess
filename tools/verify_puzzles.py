# -*- coding: utf-8 -*-
"""Read-only validation of the bilingual puzzle catalog with python-chess.
日英パズル正本を python-chess で検証する。JSの生成は build_puzzles.cjs が担う。

Each puzzle has a theme (learning topic) and an idea (tactical explanation),
so tactics and endgames from Learn can be practiced in game-like positions. / 各パズルに theme(まなぶの要素) と idea(狙いの解説) を持たせ、
解説はすべて独自に書き下ろし。 / 「まなぶ」で学んだ戦術・終盤を実戦形式で練習できるようにする。
"""
import chess
import json
from functools import lru_cache
from pathlib import Path


def mate_moves(board, n):
    return [chess.Move.from_uci(uci) for uci in winning_moves(board.fen(), n)]


@lru_cache(maxsize=200000)
def winning_moves(fen, n):
    board = chess.Board(fen)
    result = []
    for mv in list(board.legal_moves):
        board.push(mv)
        if board.is_checkmate():
            result.append(mv.uci())
        elif n > 1 and not board.is_game_over():
            ok = True
            for reply in list(board.legal_moves):
                board.push(reply)
                sub = has_mate(board.fen(), n - 1)
                board.pop()
                if not sub:
                    ok = False
                    break
            if ok:
                result.append(mv.uci())
        board.pop()
    return tuple(result)


@lru_cache(maxsize=200000)
def has_mate(fen, n):
    board = chess.Board(fen)
    for move in list(board.legal_moves):
        board.push(move)
        wins = board.is_checkmate()
        if not wins and n > 1 and not board.is_game_over():
            wins = True
            for reply in list(board.legal_moves):
                board.push(reply)
                child = has_mate(board.fen(), n - 1)
                board.pop()
                if not child:
                    wins = False
                    break
        board.pop()
        if wins:
            return True
    return False


def continuations(fen, n):
    """All winning alternatives and every legal defense, not a single PV."""
    states = {}
    def visit(board, remaining):
        key = board.fen() + '|' + str(remaining)
        if key in states:
            return
        moves = mate_moves(board, remaining)
        if not moves:
            raise ValueError('Missing forced mate at ' + key)
        states[key] = [board.san(move) for move in moves]
        for move in moves:
            board.push(move)
            if not board.is_checkmate():
                assert remaining > 1 and not board.is_game_over()
                for reply in list(board.legal_moves):
                    board.push(reply)
                    visit(board, remaining - 1)
                    board.pop()
            board.pop()
    visit(chess.Board(fen), n)
    return states


def classify(fen, max_n=3):
    board = chess.Board(fen)
    if not board.is_valid():
        return (None, [], "INVALID: " + str(board.status()))
    for n in range(1, max_n + 1):
        sols = mate_moves(board, n)
        if sols:
            return (n, [board.san(m) for m in sols], "OK")
    return (None, [], "no mate found within %d" % max_n)


# Canonical input lives in tools/puzzle_catalog.json (no legacy puzzle-order mapping).
def read_catalog():
    path = Path(__file__).with_name('puzzle_catalog.json')
    data = json.loads(path.read_text(encoding='utf-8'))
    if data.get('formatVersion') != 1:
        raise ValueError('Unsupported puzzle catalog version')
    puzzles = data.get('puzzles')
    if not isinstance(puzzles, list):
        raise ValueError('Missing puzzles array')
    return puzzles


def answer_set(answers):
    """Order is editorial; repeated or empty SAN answers are invalid."""
    if not isinstance(answers, list) or not answers or any(
        not isinstance(san, str) or not san.strip() for san in answers
    ):
        raise ValueError('Expected a nonempty SAN answer list')
    result = set(answers)
    if len(result) != len(answers):
        raise ValueError('Duplicate SAN answers')
    return result


def normalized_tree(tree):
    if not isinstance(tree, dict) or any(not isinstance(key, str) for key in tree):
        raise ValueError('Expected a continuation dictionary')
    return {key: answer_set(answers) for key, answers in tree.items()}


def main():
    puzzles = read_catalog()
    ids, starts = set(), set()
    if not puzzles:
        raise ValueError('Empty puzzle catalog')
    for puzzle in puzzles:
        puzzle_id = puzzle['id']
        fen = puzzle['fen']
        if puzzle_id in ids or fen in starts:
            raise ValueError('Duplicate puzzle ID/FEN: ' + puzzle_id)
        ids.add(puzzle_id)
        starts.add(fen)
        board = chess.Board(fen)
        if not board.is_valid() or board.is_game_over():
            raise ValueError('Invalid starting position: ' + puzzle_id)
        if puzzle['turn'] != ('w' if board.turn == chess.WHITE else 'b'):
            raise ValueError('Incorrect side to move: ' + puzzle_id)
        if type(puzzle['mateIn']) is not int or not 1 <= puzzle['mateIn'] <= 3:
            raise ValueError('Incorrect puzzle depth: ' + puzzle_id)
        registered = answer_set(puzzle['solutions'])
        stored_tree = normalized_tree(puzzle['continuations'])
        if puzzle['objective'] == 'mate':
            n, solutions, status = classify(fen, puzzle['mateIn'])
            if n != puzzle['mateIn'] or status != 'OK':
                raise ValueError('Incorrect shortest mate: ' + puzzle_id)
            if set(solutions) != registered:
                raise ValueError('Incomplete/wrong initial solutions: ' + puzzle_id)
            tree = continuations(fen, n)
            if normalized_tree(tree) != stored_tree:
                raise ValueError('Incomplete/wrong mate continuation tree: ' + puzzle_id)
        elif puzzle['objective'] == 'tactic':
            if puzzle['mateIn'] != 1:
                raise ValueError('Tactic must be a one-move challenge: ' + puzzle_id)
            if board.is_check():
                raise ValueError('Tactic should not begin in check: ' + puzzle_id)
            for san in puzzle['solutions']:
                # Every alternative starts at the original position. / 別解ごとに開始局面へ戻す。
                branch = board.copy(stack=False)
                try:
                    move = branch.parse_san(san)
                except ValueError as error:
                    raise ValueError('Illegal tactic: ' + puzzle_id + ': ' + san) from error
                if branch.san(move) != san:
                    raise ValueError('Noncanonical tactic SAN: ' + puzzle_id + ': ' + san)
                branch.push(move)
                if branch.is_checkmate():
                    raise ValueError('Tactic duplicates a mate lesson: ' + puzzle_id)
            if stored_tree != {fen + '|1': registered}:
                raise ValueError('Incorrect tactic continuation: ' + puzzle_id)
        else:
            raise ValueError('Unknown objective: ' + puzzle_id)
        if not puzzle['title'] or not puzzle['idea'] or not puzzle['en']['title'] or not puzzle['en']['idea']:
            raise ValueError('Missing bilingual text: ' + puzzle_id)
        print('OK', puzzle_id, puzzle['title'])
    print('VALIDATED', len(puzzles), 'puzzles. Source and app output can be regenerated with node tools/build_puzzles.cjs')


if __name__ == '__main__':
    main()

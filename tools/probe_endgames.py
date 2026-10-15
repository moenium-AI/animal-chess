"""Refresh public tablebase evidence for the current corrected lessons (network required)."""
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path
import chess
from generated_output import atomic_write
from lessons_gen import LESSONS


def main():
    output = []
    path = Path(__file__).resolve().parents[1] / 'docs' / 'learning-fixes-tablebase.json'
    lessons = {lesson['id']: lesson for lesson in LESSONS}
    for name in ['lucena', 'philidor', 'triangulation']:
        lesson = lessons['eg_' + name]
        board = chess.Board(lesson['fen'])
        if not board.is_valid():
            raise ValueError((name, board.status()))
        for ply, san in enumerate([None] + [move[0] for move in lesson['moves']]):
            if san:
                move = board.parse_san(san)
                if board.san(move) != san:
                    raise ValueError((name, san, board.san(move)))
                board.push(move)
            url = 'https://tablebase.lichess.ovh/standard?' + urllib.parse.urlencode({'fen': board.fen()})
            with urllib.request.urlopen(url, timeout=30) as response:
                result = json.load(response)
            expected = 'draw' if name == 'philidor' else ('win' if board.turn else 'loss')
            if result['category'] != expected:
                raise ValueError((name, ply, expected, result['category']))
            output.append(dict(lesson=name, ply=ply, san=san, fen=board.fen(), url=url, response=result))
            print(name, ply, san, result['category'], flush=True)
            time.sleep(.3)
    atomic_write(path, json.dumps(output, ensure_ascii=False, indent=2) + '\n')

if __name__ == '__main__':
    main()

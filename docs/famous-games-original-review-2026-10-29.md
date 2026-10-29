# Review of the original 15 famous games

The Japanese and English introductions, takeaways, and move annotations were
reviewed against the chess positions, then revised where needed. The changes
were written for this project from the game scores and board positions; no
third-party explanatory prose was copied or adapted. Very short notes were
expanded with the relevant piece, square, capture, check, or direct threat.

The move-only reference file, tools/reference/famous_games_original_2026.pgn,
contains 14 score records and their source URLs. It was constructed from
factual moves and headers without importing third-party annotations:

- Eleven games match their PGN Mentor player archives throughout. The archive
  also supplies a twelfth score, Levitsky–Marshall.
- The retained Levitsky–Marshall score begins 1.d4 e6 2.e4 d5, whereas the
  PGN Mentor archive starts 1.e4 e6 2.d4 d5. The position after move two and
  all subsequent moves match; the difference is disclosed in the introduction.
- The historical Lasker–Thomas score and the last move were checked against
  Edward Lasker's game record reproduced in the historical source linked in
  the PGN. The played final move is 18.Kd2#. The legal 18.O-O-O# is mentioned
  as an unplayed alternative.
- The Canal score was checked against the factual move list at the source URL
  in the PGN. The older Légal's Mate record has variant move orders; this
  project presents its retained full-board line as an illustrative version,
  not as a uniquely verified historical score.

The source scores check which moves were recorded; they do not prove every
strategic judgment or interpretation. Tests validate legal moves, the stated
final positions and results, explicit attack claims recognized by a limited
pattern, and specific tactical facts. Notable checks cover both Lasker mates,
the three Qg3 captures in Levitsky–Marshall, Deep Blue's Qf7 interposition,
the non-check 15...Nxc3 in Byrne–Fischer, the sides of castling in
Kasparov–Topalov, and the legal captures of Steinitz's rook.

Run with python-chess installed:

    python tools/test_famous_games_legacy.py
    python tools/test_famous_game_annotations.py
    python tools/games_gen.py
    node tools/test_course_expansion.cjs

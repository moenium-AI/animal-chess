# Added famous games: source and validation notes

The five new sets of Japanese and English annotations were written independently
from the chess positions. No published game commentary was copied or adapted.
The editable source for both languages is tools/famous_games_extra.py;
tools/games_gen.py validates the moves and generates js/games.js.

The reference PGN in tools/reference/famous_games_2026.pgn records only the
game scores and brief factual notes written for this project. Its source tags
identify the score archives used:

- Capablanca–Tartakower, New York 1924: [PGN Mentor archive](https://www.pgnmentor.com/events/NewYork1924.pgn).
- Botvinnik–Tal, World Championship game 6, 1960: [PGN Mentor archive](https://www.pgnmentor.com/events/WorldChamp1960.pgn).
- Karpov–Kasparov, World Championship game 16, 1985: [PGN Mentor archive](https://www.pgnmentor.com/events/WorldChamp1985.pgn).
- Hou Yifan–Judit Polgár, Gibraltar 2012: [PGN Mentor player archive](https://www.pgnmentor.com/players/Hou.zip).
- Carlsen–Karjakin, 2016 World Championship rapid tiebreak game 4: [PGN Mentor archive](https://www.pgnmentor.com/events/WorldChamp2016.pgn).

Some Capablanca–Tartakower records reverse Black's first two moves; the chosen
score uses 1...e6 2...f5, with the same position after move two. In the
Botvinnik–Tal game, the score here stops at 46...Kd4, before the sealed
47.Rd7+ and resignation. In the Carlsen–Karjakin game, 50.Qh6+ is the final
played move and the result is resignation; the two subsequent mating lines in
the annotation are hypothetical replies, not moves played in the game.

The command python tools/test_famous_game_annotations.py checks the saved PGN
against the source data, all bilingual notes, the stated final positions, en
passant, and the two mating continuations. It also checks a limited set of
explicitly phrased Japanese attack claims against the board; other explanatory
prose still requires human review. The JavaScript course test checks the
generated games and notes through the application's chess implementation.

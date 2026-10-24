# Held-out full-time Animal Chess AI level validation (2026-10-24)

The first normally timed, paired 120-game tournament used openings 0–11 and seed 20261024. Its saved results are [run 40084170013](https://github.com/moenium-AI/animal-chess/actions/runs/40084170013) and [independent Stockfish review 40087514769](https://github.com/moenium-AI/animal-chess/actions/runs/40087514769).

## Why run again

- Level 8 vs 9: 24 games, 54.2% for level 9 with a wide clustered bootstrap interval.
- Level 9 vs 10: 24 games, 56.3% for level 10 with wide uncertainty.
- Level 7 vs 8: wide uncertainty.
- Level 6 vs 7: level 7 won more games, but a small sample of Stockfish evaluations selected worse moves. The two measures assess different things.

These results cannot justify reducing or boosting the high-level engines yet.

## Truly held-out design

- Additional twelve *different* named openings, indices 12–23, leaving the baseline's 0–11 unchanged and validating every SAN by replay.
- Independent seeds: 20261025 and 20261026 for the two-replicate pairs; 20261025 for the other two.
- Normal (100%) search budget, 240 half-move cap; all openings played as both colors.
- Pair 6–7 and 7–8: 24 games each. Pair 8–9 and 9–10: 48 games each. Total 144 new games.
- No tournament move cap is ever counted as a legitimate draw. Only legally completed games are scored, with the unfinished fraction separately reported.
- The main-branch review pipeline checks legal replay and emits pair-cluster bootstrap score/Elo intervals and Stockfish 16 fixed-depth move-quality samples, keeping mate outliers distinguishable in raw rows.

## Decision gate

Compare baseline and held-out *separately* before optionally pooling results. A small positive estimated Elo difference is not sufficient justification to tune. For any adjustment, require consistent pairwise improvement evidence and a new independent verification. A failed or incomplete experimental run does not justify editing the production engine.

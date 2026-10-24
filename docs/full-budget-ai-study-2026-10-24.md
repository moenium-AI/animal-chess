# AI difficulty calibration: full-budget tournament (2026-10-24)

## Status

A 120-game **normal-think-time** baseline run has been started:
[GitHub Actions execution #40084170013](https://github.com/moenium-AI/animal-chess/actions/runs/40084170013).

The run uses a dedicated experiment branch based directly on main
`f666114d6d3d9ffc3893b0dfc284e346ccc1ff75`.
Only the workflow trigger differs. The production AI settings and chess rules
have not changed.

This is a planned/started experiment, **not yet a completed rating study**.

## Protocol

- Priority pairs: 4-5, 6-7, 7-8, 8-9, 9-10.
- 12 supplied opening positions and both colors, one opening/seed mirror each.
- `Engine.chooseMove` at `--budget-scale 1` (the exact live level settings).
- Maximum 240 half-moves. Any game reaching this cap is **unresolved**, not
  a chess-rule draw.
- Official terminal results remain separate: decisive game, or legitimate
  stalemate/repetition/insufficient-material/etc. draw.
- Conditional on completion, report wins, official draws, losses, descriptive
  score-to-Elo gap and an opening-pair clustered bootstrap interval (6000
  resamples). Report the unfinished proportion and its interval separately.
  With few completed games, the conditional Elo value may be uninformative.

## Move-quality follow-up

After a *successful* run, the read-only workflow
`Review normal-time AI tournament` downloads its existing JSON artifacts,
replays all SAN scores for legality and final FEN, and emits a combined
statistical report. Five independent Stockfish jobs sample four real moves per
game from each pairing. Every position is evaluated at equal configured depth
with both unrestricted root search and a search restricted to the AI's played
move. The report preserves exact FENs, moves, scores, engine identity and
estimated centipawn loss.

These sample evaluations are noisy at small depth. A mean cp loss is not an
Elo rating, and a Stockfish-assessed advantage in an unfinished game is **not**
a win or a draw. Use paired openings, color effects, censoring rates and
confidence intervals when deciding whether to tune a level.

## Acceptance criteria for any future AI adjustment

1. Confirm legal full-budget games, CI pass, and analyze the full 120 games.
2. Identify only pairs with a reliable and practically relevant strength
   inversion/plateau; otherwise keep the settings unchanged.
3. Make the smallest targeted parameter change on a fresh branch from main.
4. Use independent positions and new RNG seeds for held-out revalidation;
   report all gains and regressions with uncertainty.
5. Only merge a change to production AI after the tests pass and comparison
   supports it. Keep move caps distinct from chess-rule draws throughout.

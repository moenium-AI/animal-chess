# Tactical puzzle follow-up audit (2026-10-24)

Five exercises were adjusted after checking counterattacks beyond the first reply.

| Puzzle ID | Change | Reason |
|---|---|---|
| tactic-pin-rook-relative | White king moved from a1 to g2 | After Rf2 the old Qa3+ Ra2 Qc1# counterexample made the supposed pin lose by force |
| tactic-bishop-double-attack | White king moved from g1 to b1 | Bg5 Qg7 used to pin the bishop against its own king, preventing Bxh4 |
| tactic-fork-pawn-major | White king moved to g1; added a white pawn on f3 | After d5, a queen check could divert the king and leave the defending e4 pawn vulnerable |
| tactic-promotion-knight-majors | Added a white bishop on f3 | After a8=N a queen maneuver could escape the fork and capture the promoted knight |
| tactic-pin-bishop-relative | White king moved to h2 and white knight added on g2 | Checking rook moves were neutralizing the relative pin without exposing the queen |

### Verification

The new offline command `node tools/test_tactic_lookahead.cjs` checks all 38 tactical exercises and 45 registered answers. For each answer, it carries out a four-half-move minimax search, looking for forced checkmates and material losses greater than 150 centipawns relative to the starting material. On this revision it visited 40,935 search nodes, in addition to the existing one-reply checks for all 487 legal immediate responses.

It also directly replays five counterexample or recapture variations to ensure the intended motif survives.

**Limitations:** This is a bounded, material-only safety regression, not Stockfish analysis, an optimal-play certification, or proof of forced material gain for every motif. Position evaluation, longer forcing sequences, alternative correct answers, and true retrograde legality remain areas for independent review.


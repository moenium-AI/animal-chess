# Puzzle ZIP integration / パズル拡充版の反映

Source: `Animal_Chess_1017_006.zip`, reviewed against `538cebf` on 2026-10-20.
SHA-256: `bbe25a3b27a01bc43a3a176f1dbd70a1c66014db0da35c2fc63fe3f4953f6488`.

## Integrated behavior / 反映内容

- 80 puzzles: 42 forced mates (27 mate-in-one, 10 mate-in-two, 5 mate-in-three) and 38 one-move tactical/rules challenges.
- A single bilingual JSON catalog generates `js/puzzles.js` and `js/puzzle_en.js`.
- 45 registered tactical answers, including seven additional alternatives.
- Persistent next-puzzle controls, forward navigation, filtering and scroll preservation.
- Progress uses fixed IDs in `animalchess_solved_v4`. Older puzzle progress is not imported or deleted. Normal settings remain compatible.
- One-move tactics teach a board pattern or rule; they do not promise a material gain against best defence.

日本語: ZIP版の80問・別解対応・次問案内・固定IDによる進捗管理を反映。
旧クリア記録は読み込まず、保存データ自体は削除しない。戦術1手は形とルールの練習であり、
最善応手に対する駒得の保証とは区別する。

## Review fixes / レビュー指摘の修正

1. The Python verifier compares SAN answer sets rather than their editorial order.
   It still rejects missing states, missing alternatives, repeated SAN and empty lists.
2. Every registered tactical alternative is checked from a fresh copy of the initial
   board, including canonical SAN and continuation-list consistency.
3. The removed `CANDIDATES` generator test is replaced by tests of the real Node
   builder in isolated temporary directories. Invalid JSON, duplicate IDs, unsupported
   depth and empty solutions must leave both output files intact, without temporary files.
4. New verifier regressions cover reordered mate answers, missing mate answers,
   multiple tactical answers, an invalid/noncanonical/duplicate second answer and
   a valid position with an incorrect expected mate depth. Existing lesson/game tests remain.
5. Development notes now describe JSON editing, Node generation and read-only Python
   verification in both languages. Browser tests use Playwright's managed Chromium
   or an optional installed-browser channel instead of `/usr/bin/chromium`.

日本語: Python検証の順序依存と複数正解の拒否を修正し、新しい正本・生成器を対象とした
回帰検査へ更新。古い日英の開発手順も訂正し、ブラウザ検査のOS依存パスを除いた。

## Verification / 検証

The corrected archive was validated in a separate directory before updating the local
project. Copied files were compared with that validated version. The source ZIP is retained.

- `node tools/build_puzzles.cjs --check`: 80 puzzles; generated files match the catalog.
- `python -X utf8 tools/verify_puzzles.py`: all 80 puzzles pass independent rule checks,
  shortest-mate classification and full mate continuation comparison.
- `python -X utf8 tools/test_learning.py`: 9 tests pass, including the new regressions
  and the independent 80-puzzle / 216-state solver check.
- Node puzzle quality, extended tactics, exhaustive alternatives, application grading,
  navigation, learning runtime, asynchronous callbacks, carriage lifecycle and sprite
  regressions: pass. Runtime covers 80 puzzles, 216 states and 341 answer edges.
- `node tools/test_mate_solver.cjs`: 42 mate puzzles and 178 continuation states pass
  in the validated staging copy, including shortest-mate and all-defence checks.
- Both Python browser scripts: pass on Windows using headless Chrome and Playwright
  1.64.0 with `ANIMAL_CHESS_BROWSER_CHANNEL=chrome`. These tests inject local HTML/JS;
  they are separate from normal HTTP asset-loading and responsive checks.
- Python and JavaScript syntax checks; Git whitespace checks: pass.

Python Playwright was installed only in a separate validation folder, not in the
repository or the global Python environment. Other browser engines, physical touch
devices and every pixel ratio remain outside this verification. The local update
does not publish GitHub or the hosted website.

日本語: 修正済みの展開先で検証後にローカルへ反映し、コピー内容の一致も確認する。
Pythonの全80問検証・9テスト、Nodeのパズル・描画・遅延処理検査、Windows Chromeでの
2本のブラウザ検査に合格。PythonのPlaywrightはリポジトリ外の検証用フォルダーだけに導入。
実機タッチ操作・他のブラウザ・全画素密度は未検証。GitHubや公開サイトへの配信は含まない。

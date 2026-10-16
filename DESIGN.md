# Animal Chess visual contract

- Keep the board as the primary focus, with the two team banquet rooms directly above and below it. Settings remain in the existing responsive side column.
- Offer three independent graphics modes: `3d` (original pixel characters), `miniature` (detailed figures), and `simple` (all existing emoji/classic sets). New installations default to miniature; saved `3d` preferences select the original graphics.
- Miniature materials: maple and muted walnut squares, dark carved wood frame with brass inlay, warm plaster and timber banquet rooms, miniature wooden furniture and ceramic dishes. Keep surfaces quiet enough to read moves and pieces.
- Preserve square cells and contained pieces in every mode. Do not apply perspective to the interactive board. Preserve legal move markers, check, selected state, coordinates, keyboard focus and badges.
- Original 3D mode retains its pixel characters, furniture, food and carriage. Miniature uses smooth, scalable scenery. No external runtime assets or network services.
- Use existing spacing (4/8/12/16/24px), 12px board corners, 16px venue corners and the existing Segoe UI / Hiragino / Meiryo font stack. Never use Yu Gothic or Yu Mincho.
- Do not reset game state when changing graphics. Keep the selected square and board keyboard focus. Refresh promotion options and remove obsolete carriage animations when switching.
- Respect reduced motion. Verify desktop, 390px and 320px layouts, both languages, captures, occupied venues, promotion and mode persistence.

日本語: 従来の3D・ミニチュア・シンプルを独立した表示として保持する。ミニチュアは木製の盤と温かい小さな食堂で統一する。盤面の操作性と対局状態を保ち、狭い画面でも駒・ラベルを収める。

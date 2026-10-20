# Puzzle titles / パズルの名前

Updated on 2026-10-21. Renamed the 52 added puzzles in Japanese and English to match the playful, story-like tone of the original 28 titles. The original titles remain unchanged.

追加52問の日英の名前を、駒の動きや小さな物語を感じるものへ変更した。従来28問の名前は保持。戦術の用語と具体的な説明はテーマ・解説で伝える。

The fixed IDs, positions, objectives, accepted answers, continuation trees, descriptions and progress keys are unchanged. The catalog is the source; rebuild both JavaScript files with `node tools/build_puzzles.cjs`.

固定ID・盤面・目的・正解・継続手順・解説・保存キーは変更していない。正本を編集し、日英のJSを再生成している。

Checked the full catalog against the preceding commit: only these 52 Japanese/English title pairs changed, with all 28 original records identical and no duplicate titles in either language. Generated-output, puzzle-quality, learning-runtime and asynchronous regression checks passed. At 320px, neither language produced overflowing list items or headings; captured browser warnings/errors were empty.

変更前との全データ比較で名前以外の一致を確認。日英とも80問の名前に重複なし。生成物・パズル品質・学習実行時・非同期処理の検査に合格。320px幅で日英の一覧と見出しが横にはみ出さず、取得したブラウザの警告・エラーログも空だった。

| ID | Previous / 変更前 | New / 変更後 | English |
|---|---|---|---|
| mate-pawn-promotion-mate | さいごの一歩でメイト | さいごのマスのまほう | Magic on the Last Square |
| mate-bishop-corner-mate | ビショップのななめ王手 | ななめのとびらをトントン | Knock on the Diagonal Door |
| mate-pawn-capture-mate | ポーンで取って詰み | ひよこのひとくち | A Little Bite for the Chick |
| mate-queen-knight-cover | ナイトが守るマス | おうまさんのとおせんぼ | The Pony Blocks the Way |
| mate-rook-bishop-wall | ルークとビショップの壁 | でぐちのないおしろ | A Castle with No Way Out |
| mate-rook-knight-coordination | ルークとナイトの連携 | おうまさんのまちぶせ | The Pony's Ambush |
| mate-two-bishops-king | キングが最後の一手 | おうさま、ちょっとよけて | A Little Room, Your Majesty |
| mate-two-knights-final | ナイト二枚の一撃 | ふたごのおうまさん | The Twin Ponies |
| mate-rook-endgame-anticipate | ルークの終盤を読む | おうさまのあといっぽ | One More Step, Your Majesty |
| mate-bishop-rook-prep | ビショップで逃げ道をふさぐ | ななめのかぎをかけて | Lock the Diagonal Door |
| mate-queen-knight-endgame | クイーンとナイトで2手詰め | おうさまとおうまのさんぽ | A Royal Pony Walk |
| mate-queen-rook-zug | クイーンとルークの二手 | おしろのふたりぐみ | The Castle Duo |
| mate-queen-three-step | クイーンで三手の包囲 | ぐるりとまわってつかまえて | Round and Round the King |
| mate-bishop-rook-three-step | ルークとビショップの三手 | おうさまのひみつのおでかけ | The King's Secret Outing |
| tactic-discovered-attack | ビショップのはっけんこうげき | カーテンのうしろから | From Behind the Curtain |
| tactic-double-check | ダブルチェックをかけよう | ふたつのこえでこんにちは | Two Voices Say Hello |
| tactic-en-passant | アンパッサンの瞬間 | すれちがいのつかまえっこ | Catch Me as I Pass |
| tactic-bishop-double-attack | ビショップの二重攻撃 | ななめのわかれみち | The Diagonal Crossroads |
| tactic-knight-queen-fork | ナイトの王手フォーク | おうまさんのよくばりジャンプ | The Pony's Greedy Jump |
| tactic-knight-rook-fork | ナイトでルークもねらえ | おうまさんのよりみち | The Pony's Detour |
| tactic-pawn-fork | ポーンのりょうどり | ちいさなふたまたのみち | A Little Fork in the Road |
| tactic-absolute-pin | キングへのピン | おうさまのまえできをつけ | Stand Still for the King |
| tactic-relative-pin | クイーンへのピン | うしろのひみつはまもってね | Guard the Secret Behind You |
| tactic-knight-underpromotion | ナイトにしょうかくして王手 | ひよこ、おうまさんになる | The Chick Becomes a Pony |
| tactic-promotion | クイーンへのしょうかく | ひよこのおめかし | The Chick Dresses Up |
| tactic-rook-skewer | キングのうしろのクイーン | おうさま、そこをどいて | Step Aside, Your Majesty |
| tactic-rook-underpromotion | ステイルメイトをふせげ | おめかしはほどほどに | Don't Dress Up Too Much |
| tactic-fork-knight-queen | ナイトでキングとクイーン | ふたりにごあいさつ | One Leap, Two Surprises |
| tactic-fork-knight-rooks | 二つのルークを狙え | ふたつのおしろでまよっちゃう | Which Castle Shall We Visit? |
| tactic-fork-rook-minors | ルークで二つの駒を狙おう | まっすぐのよくばりみち | Two Stops, One Straight Road |
| tactic-fork-queen-minors | クイーンで2枚のナイトを両取り | おうまさんたち、みいつけた | Found You, Ponies! |
| tactic-fork-pawn-major | ポーンで大駒を両取り | ちいさなこがまんなかへ | The Little One Steps Between |
| tactic-fork-bishop-minors | ビショップの遠い両取り | とおくのふたりにこんにちは | Hello to You Both, Far Away |
| tactic-pin-queen-king | クイーンをキングにピン | おきさきさまのせまいみち | The Queen's Narrow Path |
| tactic-pin-bishop-knight | ビショップの絶対ピン | おうまさん、そこでまってて | Wait Right There, Pony |
| tactic-pin-queen-knight | クイーンでナイトをピン | おきさきさまのとおせんぼ | The Queen Blocks the Way |
| tactic-pin-bishop-relative | 大駒の手前のルーク | おしろのうしろのおきさきさま | The Queen Behind the Castle |
| tactic-pin-rook-relative | ルークでビショップをピン | ふくろうさんのうしろには | Who's Behind the Owl? |
| tactic-skewer-bishop-king | ビショップのスキュア | おうさまのかげにみいつけた | Found You Behind the King |
| tactic-skewer-rook-queen | クイーンを背後に置いた王手 | おうさまのかくしもの | The King's Hidden Treasure |
| tactic-discovery-knight-queen | ナイトで発見攻撃 | おうまがあけるひみつのみち | The Pony Opens a Secret Path |
| tactic-discovery-pawn-bishop | ポーンを進めてラインを開こう | ひよこがあけたまど | The Window the Chick Opened |
| tactic-defender-bishop | 守りのナイトを除去 | みはりばんをつかまえろ | Catch the Lookout |
| tactic-defender-pawn | 守りのポーンを除去 | ちいさなばんにん | The Little Gatekeeper |
| tactic-defender-bishop-2 | 大駒を守るビショップ | ふくろうさんにごようじん | Watch Out for the Owl |
| tactic-doublecheck-knight | ナイトのダブルチェック | おうまさんとせーの | Together with the Pony |
| tactic-promotion-capture-check | 取りながらクイーンへ昇格 | おみやげつきのおめかし | Dressing Up with a Souvenir |
| tactic-castling-kingside | キング側へキャスリング | おうさまのおひっこし | The King's Moving Day |
| tactic-rook-capture-check | ルークを取って王手 | おしろをたずねてこんにちは | Hello at the Castle Door |
| tactic-bishop-sacrifice-check | 守られたビショップの王手 | ふくろうさんのいただきます | The Owl Says Bon Appétit |
| tactic-promotion-knight-majors | 大駒へのナイト昇格フォーク | おうまになってよくばり | A Greedy New Pony |
| tactic-pin-bishop-king-2 | 別の斜めピンを発見 | おしろのかげのおうさま | The King Behind the Castle |

# Classic banquet scenery (2026-10-27)

Asset: `assets/scenery/banquet-classic-day.png`, 640x188 RGB PNG.

The 640x94 top half is the white team; the bottom 640x94 is the black team.
Both halves use the same room and food pixels, including a legible strawberry
shortcake, bread on a plate, and the visual gap between the wall crown and food.
Only the two red banners and the red table runner have been recolored blue.
This makes the daytime hall equally bright for both teams.

In `css/style.css`, only `.venue.v3d.vclassic:not(.vmini)` receives the new
backdrop. Existing pixel piece art, their animated food, capture animations,
chess rules, high-detail scenery, and miniature mode are preserved.
The original separate table and food canvases remain in the DOM but are hidden
for Classic, avoiding duplicate decorations over the baked-in scene.
The room is rendered at native pixel dimensions; narrower screens crop the
outer left/right edges instead of distorting the artwork.

Source: approved generated red/blue banquet comparison image revised after
feedback on the crown separation and table-runner tip.

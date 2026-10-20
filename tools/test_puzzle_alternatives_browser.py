"""Chromium smoke test: click the actual board to solve newly recognized alternatives."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import base64
import re
import os

ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / 'index.html').read_text(encoding='utf-8')
scripts = re.findall(r'<script\s+src="([^"]+)', html)
html = re.sub(r'<script\s+src="[^"]+"\s*></script>', '', html)
html = re.sub(r'<link[^>]*>', '', html)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        headless=True,
        channel=os.environ.get('ANIMAL_CHESS_BROWSER_CHANNEL') or None,
    )
    page = browser.new_page(viewport={'width': 1400, 'height': 980}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.set_content(html, wait_until='domcontentloaded')
    page.add_style_tag(content=(ROOT / 'css/style.css').read_text(encoding='utf-8'))
    for src in scripts:
        page.add_script_tag(content=(ROOT / src.split('?')[0]).read_text(encoding='utf-8'))
        if 'piece_atlas' in src:
            atlas = base64.b64encode((ROOT / 'assets/pieces/miniature-atlas.png').read_bytes()).decode('ascii')
            page.evaluate('(url)=>PIECE_ATLAS.url=url', 'data:image/png;base64,' + atlas)
    page.locator('button.tab[data-tab="puzzle"]').click()
    # These are the previously unrecognized but valid alternative moves.
    alternates = [
        ('tactic-double-check', 'Bc6+'),
        ('tactic-doublecheck-knight', 'Nc6+'),
        ('tactic-fork-queen-minors', 'Qb4'),
        ('tactic-fork-queen-minors', 'Qh4+'),
        ('tactic-pin-queen-knight', 'Qc1'),
        ('tactic-pin-queen-knight', 'Qc3'),
        ('tactic-discovery-knight-queen', 'Ng5+'),
    ]
    for name, san in alternates:
        result = page.evaluate('''([name, san]) => {
          const idx=PUZZLES.findIndex(p=>p.id===name);
          if(idx<0)throw Error('missing '+name);
          document.querySelector(`[data-puzzle-index="${idx}"]`).click();
          const g=new Chess(PUZZLES[idx].fen);
          const m=g.move(san);
          if(!m)throw Error('illegal '+san);
          document.querySelector(`#board .square[data-square="${m.from}"]`).click();
          document.querySelector(`#board .square[data-square="${m.to}"]`).click();
          return {complete:!document.querySelector('#puzzle-completion').classList.contains('hidden'), saved:!!document.querySelector(`[data-puzzle-index=\"${idx}\"] .done`), status:document.querySelector('#puzzle-completion-text').textContent};
        }''', [name, san])
        assert result['complete'] and result['saved'], (name, san, result)
    # A discovered single check does not count as double check.
    result = page.evaluate('''() => {
      const id='tactic-double-check', idx=PUZZLES.findIndex(p=>p.id===id);
      document.querySelector(`[data-puzzle-index="${idx}"]`).click();
      const m=new Chess(PUZZLES[idx].fen).move('Bd5+');
      document.querySelector(`#board .square[data-square="${m.from}"]`).click();
      document.querySelector(`#board .square[data-square="${m.to}"]`).click();
      return {complete:!document.querySelector('#puzzle-completion').classList.contains('hidden')};
    }''')
    assert not result['complete'], result
    assert not errors, errors
    print(f'PASS: {len(alternates)} newly valid board-click answers, 1 invalid check rejected, no JS errors')
    browser.close()

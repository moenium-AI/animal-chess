from playwright.sync_api import sync_playwright
from pathlib import Path
import re,base64,os
ROOT=Path(__file__).resolve().parent.parent
html=(ROOT/'index.html').read_text(encoding='utf8')
scripts=re.findall(r'<script\s+src="([^"]+)',html)
html=re.sub(r'<script\s+src="[^"]+"\s*></script>','',html)
html=re.sub(r'<link[^>]*>','',html)
JS=r'''
window.solveNow=async function (i) {
 let el=document.querySelector(`#puzzle-list .puzzle-item[data-puzzle-index="${i}"]`);
 if(!el) throw Error(`puzzle ${i} invisible`);
 el.click();
 const p=PUZZLES[i], g=new Chess(p.fen);
 let rem=p.mateIn;
 for(let n=0;n<6;n++) {
   let key=g.fen()+'|'+rem;
   let san=p.continuations[key]?.[0];
   if(!san) throw Error(`missing continuation puzzle ${i} ${key}`);
   let m=g.move(san);
   if(!m) throw Error('invalid move '+san);
   document.querySelector(`#board .square[data-square="${m.from}"]`).click();
   document.querySelector(`#board .square[data-square="${m.to}"]`).click();
   if(m.promotion){
     let promo=['q','r','b','n'].indexOf(m.promotion);
     document.querySelectorAll('#promo-choices button')[promo].click();
   }
   if(p.objective==='tactic'||g.in_checkmate()) break;
   rem--;
   let best=null,count=Infinity;
   for(const r of g.moves({verbose:true})) {
     g.move(r);
     let opts=p.continuations[g.fen()+'|'+rem];
     g.undo();
     if(!opts) throw Error('missing reply');
     if(opts.length<count){count=opts.length;best=r;}
   }
   if(!best) throw Error('no reply');
   g.move(best);
   await new Promise(resolve=>setTimeout(resolve,850));
 }
 if(!document.querySelector(`#puzzle-list .puzzle-item[data-puzzle-index="${i}"] .done`)?.textContent.includes('✅')) throw Error('no solved '+i);
 return document.querySelector('#puzzle-completion-text').textContent;
};
'''
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True, channel=os.environ.get('ANIMAL_CHESS_BROWSER_CHANNEL') or None)
 page=browser.new_page(viewport={'width':1440,'height':980},reduced_motion='reduce')
 errors=[]
 page.on('pageerror', lambda e: errors.append(str(e)))
 page.set_content(html,wait_until='domcontentloaded')
 page.add_style_tag(content=(ROOT/'css/style.css').read_text(encoding='utf8'))
 for src in scripts:
  page.add_script_tag(content=(ROOT/src.split('?')[0]).read_text(encoding='utf8'))
  if 'piece_atlas' in src:
   img='data:image/png;base64,'+base64.b64encode((ROOT/'assets/pieces/miniature-atlas.png').read_bytes()).decode()
   page.evaluate('(s)=>PIECE_ATLAS.url=s',img)
 page.locator('button.tab[data-tab="puzzle"]').click()
 page.add_script_tag(content=JS)
 assert page.locator('.puzzle-item').count()==80
 assert page.locator('#puzzle-completion').is_hidden()
 # selection and solved list repaint must maintain scroll, not return to start
 page.evaluate('document.querySelector("#puzzle-list").scrollTop = 490')
 before=page.evaluate('document.querySelector("#puzzle-list").scrollTop')
 result=page.evaluate('(i)=>window.solveNow(i)',12)
 after=page.evaluate('document.querySelector("#puzzle-list").scrollTop')
 assert after==before,(before,after)
 assert 'クリア' in result and '「' in result and '」' in result,result
 nextTitle=page.evaluate('PUZZLES[13].title')
 assert nextTitle in result, (result,nextTitle)
 assert page.locator('#btn-puzzle-next').is_visible()
 page.locator('#btn-puzzle-next').click()
 assert page.locator('.puzzle-item.active').get_attribute('data-puzzle-index')=='13'
 assert page.locator('#puzzle-completion').is_hidden()
 print('PASS: next following selected puzzle + 1-click + scroll preserved',flush=True)
 # skip prior clears, don't recommend first incomplete
 page.evaluate('(i)=>window.solveNow(i)',14)
 result=page.evaluate('(i)=>window.solveNow(i)',13)
 assert page.evaluate('PUZZLES[15].title') in result,result
 assert 'PUZZLES[0]' not in result
 print('PASS: skip already-solved subsequent entry, no wrap to the first',flush=True)
 # filter transition at end of one-move mates
 page.locator('#puzzle-cats .chip.lv').nth(1).click()
 assert page.locator('.puzzle-item').count()==27
 result=page.evaluate('(i)=>window.solveNow(i)',26)
 assert 'この範囲の続きは終了' in result,result
 assert page.locator('#btn-puzzle-next').is_visible()
 page.locator('#btn-puzzle-next').click()
 assert page.locator('.puzzle-item').count()==80
 assert page.locator('.puzzle-item.active').get_attribute('data-puzzle-index')=='27'
 print('PASS: continue to next section, filters reset only when necessary',flush=True)
 # last puzzle cannot wrap to top
 result=page.evaluate('(i)=>window.solveNow(i)',79)
 assert 'ここから先の問題は終了' in result,result
 assert page.locator('#btn-puzzle-next').is_hidden()
 print('PASS: last question has no wrap-around CTA',flush=True)
 # translation of completion
 page.locator('#sel-language').select_option('en')
 assert 'You have reached the end' in page.locator('#puzzle-completion-text').inner_text()
 page.evaluate('(i)=>window.solveNow(i)',77)
 assert page.evaluate('PUZZLES[79].id')
 assert 'Next up:' in page.locator('#puzzle-completion-text').inner_text()
 assert page.locator('#btn-puzzle-next').inner_text()=='▶ Next puzzle'
 print('PASS: completion and button translate live',flush=True)
 # A new normal game must not leave a stale puzzle next button behind.
 page.evaluate("document.querySelector('#btn-new').click()")
 assert page.locator('#puzzle-completion').is_hidden()
 print('PASS: switching back to normal play hides the finished-puzzle CTA',flush=True)
 assert errors==[],errors
 print('PASS: no uncaught JavaScript errors',flush=True)
 browser.close()

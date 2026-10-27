"""Live browser regression of game state, settings, dialogs and Worker search."""
from pathlib import Path
import json,time,os,re,threading
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
JSERR=[]
HTTP=bool(os.getenv('ANIMAL_CHESS_USE_HTTP'))
_server=None
if HTTP:
    class SilentHandler(SimpleHTTPRequestHandler):
        def log_message(self, *args): pass
    _server=ThreadingHTTPServer(('127.0.0.1',0),partial(SilentHandler,directory=str(ROOT)))
    threading.Thread(target=_server.serve_forever,daemon=True).start()

def load_inline(page, settings):
    if HTTP:
        page.add_init_script("localStorage.setItem('animalchess_settings', JSON.stringify(" + json.dumps(settings) + "));" )
        page.goto(f'http://127.0.0.1:{_server.server_port}/index.html')
        return
    html=(ROOT/'index.html').read_text()
    scripts=re.findall(r'<script src="([^"]+)"[^>]*></script>',html)
    html=re.sub(r'<script src="[^"]+"[^>]*></script>','',html)
    html=re.sub(r'<link[^>]*href="css/style.css[^>]*>','',html)
    page.goto('about:blank')
    page.set_content(html)
    page.add_style_tag(content=(ROOT/'css/style.css').read_text())
    page.evaluate("""data => { const cache=new Map(); Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>cache.get(k)||null,setItem:(k,v)=>cache.set(k,v),removeItem:k=>cache.delete(k)}});localStorage.setItem('animalchess_settings',JSON.stringify(data)); }""",settings)
    # The restricted browser cannot fetch localhost. Bundle the actual Worker source
    # into a blob so it still executes on a real independent Worker thread.
    worker_content='\n'.join((ROOT/f).read_text() for f in ('js/chess.js','js/lessons.js','js/engine.js'))+'\n'+(ROOT/'js/engine_worker.js').read_text().replace("importScripts('chess.js?v=2', 'lessons.js?v=21', 'engine.js?v=22');",'')
    page.evaluate("""source => { const NativeWorker=window.Worker; window.Worker=function(path) { const url=URL.createObjectURL(new Blob([source],{type:'application/javascript'}));const w=new NativeWorker(url);const terminate=w.terminate.bind(w);w.terminate=()=>{terminate();URL.revokeObjectURL(url)};return w;}; }""",worker_content)
    for source in scripts:page.add_script_tag(content=(ROOT/source.split('?')[0]).read_text())

def move(page,a,b):
    page.locator(f'[data-square="{a}"]').click(force=True)
    page.locator(f'[data-square="{b}"]').click(force=True)

with sync_playwright() as pw:
    launch={'headless':True,'args':['--no-sandbox','--disable-dev-shm-usage']}
    browser_bin=os.getenv('ANIMAL_CHESS_BROWSER') or ('/usr/bin/chromium' if Path('/usr/bin/chromium').exists() else None)
    if browser_bin:launch['executable_path']=browser_bin
    browser=pw.chromium.launch(**launch)
    context=browser.new_context(viewport={'width':1280,'height':900},reduced_motion='reduce')
    page=context.new_page();page.on('pageerror',lambda e: JSERR.append(str(e)))
    load_inline(page,{'opponent':'human','sound':False,'bgm':False,'viewMode':'simple','set':'classic'})
    assert page.locator('#board .square').count()==64
    # Royal HD art belongs only to Pixel art mode. Native 627x627 source pixels
    # remain unquantized while the browser scales their CSS display size.
    if HTTP:
        page.locator('#sel-view').select_option('3d')
        page.wait_for_function(
            "typeof RoyalHDSprites !== 'undefined' && !!RoyalHDSprites.frame('k','w')"
            " && !!document.querySelector('#board .p3d canvas[data-hd=\"1\"]')",
            timeout=15000)
        visual=page.evaluate("""() => {
          const king=Sprites.makePiece('k','w','3d'),pawn=Sprites.makePiece('p','w','3d');
          const boxes=[...document.querySelectorAll('#board .p3d canvas[data-hd="1"]')].map(c=>{
            const a=c.getBoundingClientRect(),b=c.closest('.square').getBoundingClientRect();
            return {inside:a.left>=b.left-.5&&a.top>=b.top-.5&&a.right<=b.right+.5&&a.bottom<=b.bottom+.5};
          });
          function bbox(c) {
            const data=c.getContext('2d').getImageData(0,0,c.width,c.height).data;
            let minX=c.width,maxX=-1;
            for(let y=0;y<c.height;y++) for(let x=0;x<c.width;x++){
              if(data[(y*c.width+x)*4+3]<32)continue;
              minX=Math.min(minX,x);maxX=Math.max(maxX,x);
            }
            return maxX-minX+1;
          }
          return {k:[king.width,king.height],p:[pawn.width,pawn.height],
            ratio:bbox(pawn)/bbox(king),count:boxes.length,inside:boxes.every(b=>b.inside)};
        }""")
        assert visual['k']==[627,627] and visual['p']==[627,627],visual
        assert .75<=visual['ratio']<=.90,visual
        assert visual['count']>=1 and visual['inside'],visual
        royal=page.evaluate("""() => {
          const list=['k','q','p','r','b','n'], result={};
          for(const role of list) for(const team of ['w','b']){
            const key=role+'|'+team, sprite=Sprites.makePiece(role,team,'3d');
            const rider=RoyalHDSprites.rider(role,team);
            const closed=RoyalHDSprites.frame(role,team,true);
            result[key]={w:sprite.width,h:sprite.height,
              hd:sprite.dataset.hd,
              rider:!!rider&&rider.width===16&&rider.height===20,
              blink:!!closed&&closed.width===627&&closed.height===627};
          }
          return result;
        }""")
        assert len(royal)==12,royal
        assert all(v['w']==627 and v['h']==627 and v['hd']=='1'
                   and v['rider'] and v['blink'] for v in royal.values()),royal
        # Verify that the approved closed-eye images differ, and that
        # drawing a passenger actually changes the carriage pixels.
        visuals = page.evaluate("""() => {
          let changedEyes=0;
          for (const type of ['k','q','r','b','n','p']) {
            for (const team of ['w','b']) {
              const ordinary=RoyalHDSprites.frame(type,team,false);
              const blink=RoyalHDSprites.frame(type,team,true);
              const a=ordinary.getContext('2d').getImageData(0,0,627,627).data;
              const b=blink.getContext('2d').getImageData(0,0,627,627).data;
              let different=false;
              for(let i=0;i<a.length;i+=4) {
                if(a[i]!==b[i]||a[i+1]!==b[i+1]||a[i+2]!==b[i+2]||a[i+3]!==b[i+3]) {
                  different=true;break;
                }
              }
              if(different)changedEyes++;
            }
          }
          const occupied=document.createElement('canvas'),empty=document.createElement('canvas');
          Sprites.drawCarriage(occupied,0,'p','b',false,'3d');
          Sprites.drawCarriage(empty,0,null,null,false,'3d');
          const a=occupied.getContext('2d').getImageData(0,0,occupied.width,occupied.height).data;
          const b=empty.getContext('2d').getImageData(0,0,empty.width,empty.height).data;
          return {changedEyes,passengerVisible:a.some((v,i)=>v!==b[i])};
        }""")
        assert visuals['changedEyes']==12 and visuals['passengerVisible'],visuals
        # A real capture must put an HD character in the correct banquet hall.
        move(page,'e2','e4')
        move(page,'d7','d5')
        move(page,'e4','d5')
        page.locator('.bq-guest canvas.spr[data-hd="1"]').first.wait_for(timeout=3000)
        assert page.locator('.bq-guest canvas.spr[data-hd="1"]').count()==1
        page.locator('#btn-new').click(force=True)
        assert page.locator('#board .p3d canvas[data-hd="1"]').count()==32
        # A 320px-wide screen must retain all 32 HD sprites within the board.
        page.set_viewport_size({'width':320,'height':700})
        mobile=page.evaluate("""() => {
          const b=document.querySelector('#board').getBoundingClientRect();
          const pieces=[...document.querySelectorAll('#board .p3d canvas[data-hd="1"]')];
          return {withinScreen:b.left>=-1&&b.right<=innerWidth+1,
            count:pieces.length,
            contained:pieces.every(c=>{
              const a=c.getBoundingClientRect(),s=c.closest('.square').getBoundingClientRect();
              return a.left>=s.left-.5&&a.top>=s.top-.5&&a.right<=s.right+.5&&a.bottom<=s.bottom+.5;
            })};
        }""")
        assert mobile['withinScreen'] and mobile['count']==32 and mobile['contained'],mobile
        page.set_viewport_size({'width':1280,'height':900})
        # The HD atlas may not leak into Miniature mode.
        page.locator('#sel-view').select_option('miniature')
        assert page.locator('#board canvas[data-style="miniature"]').count()==32
        assert page.locator('#board canvas[data-hd="1"]').count()==0
        page.locator('#sel-view').select_option('simple')
    # B-01: desktop moves the *single* live status node to the sidebar,
    # freeing space to enlarge the board. Both banquet titles remain ABOVE
    # the artwork. A narrower viewport puts the status below the board again.
    for width,height in [(1503,840),(1440,900)]:
        page.set_viewport_size({'width':width,'height':height})
        page.locator('#sel-view').select_option('miniature')
        boxes=page.evaluate("""() => {
          const rect = s => document.querySelector(s).getBoundingClientRect();
          const top = rect('#venue-top'), bottom = rect('#venue-bottom');
          const status = rect('#status-bar'), board = rect('#board');
          const side = rect('.side-col');
          const label = rect('#venue-top .venue-title');
          const room = rect('#venue-top .venue-guests');
          const lowerLabel = rect('#venue-bottom .venue-title');
          const lowerRoom = rect('#venue-bottom .venue-guests');
          return {
            top: top.top, bottom: bottom.bottom, status: status.bottom,
            statusTop: status.top, statusLeft: status.left,
            sidebarTop: side.top, sidebarLeft: side.left,
            statusParent: document.querySelector('#status-bar').parentElement.className,
            statusCount: document.querySelectorAll('#status-bar').length,
            boardWidth: board.width, boardHeight: board.height,
            labelTop: label.top, labelBottom: label.bottom,
            roomTop: room.top, roomBottom: room.bottom,
            lowerLabelBottom: lowerLabel.bottom, lowerRoomTop: lowerRoom.top,
            labelFont: parseFloat(getComputedStyle(document.querySelector('#venue-top .venue-title')).fontSize),
            labelPosition: getComputedStyle(document.querySelector('#venue-top .venue-title')).position
          };
        }""")
        assert boxes['top']>=0, f'banquet top offscreen: {width}x{height} {boxes}'
        assert boxes['status']<=height-2, f'status offscreen: {width}x{height} {boxes}'
        assert boxes['statusParent']=='side-col', f'desktop status not in sidebar: {boxes}'
        assert boxes['statusCount']==1, f'duplicate status node: {boxes}'
        assert abs(boxes['statusTop']-boxes['sidebarTop'])<2, f'status not at sidebar top: {boxes}'
        assert abs(boxes['statusLeft']-boxes['sidebarLeft'])<2, f'status not aligned to sidebar: {boxes}'
        assert boxes['bottom']<=height-2, f'bottom banquet offscreen: {width}x{height} {boxes}'
        assert 360<=boxes['boardWidth']<=660, f'board size: {width}x{height} {boxes}'
        assert boxes['boardWidth'] >= (475 if height==840 else 535), f'board not enlarged: {width}x{height} {boxes}'
        assert abs(boxes['boardWidth']-boxes['boardHeight'])<2, f'board not square: {boxes}'
        assert 8.5<=boxes['labelFont']<=9.5, f'banquet label must be 9px: {boxes}'
        assert boxes['labelPosition']=='static', f'banquet label must not overlay graphics: {boxes}'
        assert boxes['labelBottom'] < boxes['roomTop'], f'top banquet label overlaps room: {boxes}'
        assert boxes['lowerLabelBottom'] < boxes['lowerRoomTop'], f'bottom banquet label overlaps room: {boxes}'
    # Status must follow the board when the sidebar falls below it, and return
    # to the desktop sidebar without duplicating or losing its live text.
    for width,height in [(1099,840),(390,840),(1280,900)]:
        page.set_viewport_size({'width':width,'height':height})
        # The matchMedia change event can arrive after set_viewport_size returns.
        expected_parent = 'board-col' if width < 1100 else 'side-col'
        page.wait_for_function(
            "(expected) => document.querySelector('#status-bar').parentElement.className === expected",
            arg=expected_parent, timeout=3000)
        placement=page.evaluate("""() => {
          const status = document.querySelector('#status-bar');
          const parent = status.parentElement;
          const venue = document.querySelector('#venue-bottom');
          return {
            count: document.querySelectorAll('#status-bar').length,
            parent: parent.className,
            statusTop: status.getBoundingClientRect().top,
            venueBottom: venue.getBoundingClientRect().bottom,
            text: status.textContent.trim()
          };
        }""")
        assert placement['count']==1 and placement['text'], f'status lost on resize: {placement}'
        if width<1100:
            assert placement['parent']=='board-col', f'mobile status not after board: {placement}'
            assert placement['statusTop']>=placement['venueBottom'], f'mobile status moved too far up: {placement}'
        else:
            assert placement['parent']=='side-col', f'desktop status not restored: {placement}'
    page.locator('#sel-view').select_option('simple')
    # L-01: six chapters, beginner exercises, saved progress and a wrong answer.
    page.locator('.tab[data-tab="learn"]').click(force=True)
    assert page.locator('#learn-cats .chip').count()==6
    assert page.locator('#learn-list .study-item').count()==14
    page.locator('#learn-list .study-item').first.click(force=True)
    assert '考えてみよう' in page.locator('#study-reasoning-heading').inner_text()
    assert 'ポイント' in page.locator('#btn-reason-why').inner_text()
    assert 'もう一歩' in page.locator('#btn-reason-defense').inner_text()
    page.locator('#btn-replay-last').click(force=True)
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).bk_board")=='studied'
    page.locator('#btn-study-practice').click(force=True)
    assert page.locator('#study-practice').is_visible()
    move(page,'e2','e4')
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).bk_board")=='mastered'
    assert '✅' in page.locator('#study-practice-feedback').inner_text()
    page.locator('#btn-study-next').click(force=True)
    page.locator('#btn-study-practice').click(force=True)
    move(page,'d2','d3')  # Legal, but not the demonstrated d4.
    assert page.locator('#replay-counter').inner_text().startswith('0 /')
    assert '違う' in page.locator('#study-practice-feedback').inner_text()
    page.locator('#sel-language').select_option('en')
    assert 'Think it through' in page.locator('#study-reasoning-heading').inner_text()
    assert 'Think further' in page.locator('#btn-reason-defense').inner_text()
    assert 'pawn' in page.locator('#study-practice-prompt').inner_text().lower()
    page.locator('#btn-study-practice-hint').click(force=True)
    assert 'Hint:' in page.locator('#study-practice-feedback').inner_text()
    move(page,'d2','d4')
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).bk_pawn")=='mastered'
    page.locator('#sel-language').select_option('ja')

    # L-02: promotion and en passant are validated through the normal board.
    page.locator('#learn-list .study-item').nth(11).click(force=True)
    page.locator('#btn-study-practice').click(force=True)
    # Learning tab hides Settings, so exercise the actual change handler
    # without asking Playwright to click an invisible select element.
    page.evaluate("""() => {
      const sel=document.getElementById('sel-view');
      sel.value='3d';sel.dispatchEvent(new Event('change',{bubbles:true}));
    }""")
    move(page,'a7','a8')
    page.locator('#promo-modal:not(.hidden)').wait_for(timeout=2000)
    assert page.locator('#promo-choices canvas[data-hd="1"]').count()==4
    page.locator('#promo-choices button').first.click(force=True)
    page.evaluate("""() => {
      const sel=document.getElementById('sel-view');
      sel.value='simple';sel.dispatchEvent(new Event('change',{bubbles:true}));
    }""")
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).bk_promotion")=='mastered'
    page.locator('#learn-list .study-item').nth(12).click(force=True)
    page.locator('#btn-study-practice').click(force=True)
    move(page,'e5','d6')
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).bk_enpassant")=='mastered'

    # L-03: related puzzles must preserve the source lesson's exact replay,
    # selected reasoning question, answer and progress when returning.
    page.locator('#learn-list .study-item').nth(7).click(force=True) # bk_capture
    page.locator('#btn-replay-last').click(force=True)
    source_counter=page.locator('#replay-counter').inner_text()
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(1).click(force=True)  # wrong, preserve original progress totals
    source_fen=page.locator('#study-reasoning-position-board').get_attribute('data-fen')
    assert page.locator('#btn-return-lesson').is_hidden()
    page.locator('#btn-study-puzzle').click(force=True)
    assert page.locator('#tab-puzzle').evaluate("(node) => node.classList.contains('active')")
    assert page.locator('#puzzle-list .puzzle-item').count()>0
    assert page.locator('#btn-return-lesson').is_visible()
    assert page.locator('#related-lesson-title').inner_text()==page.evaluate("INTRO_LESSONS.find(l=>l.id==='bk_capture').title")
    page.locator('#sel-language').select_option('en')
    assert 'Back to lesson' in page.locator('#btn-return-lesson').inner_text()
    page.locator('#btn-return-lesson').click(force=True)
    assert page.locator('#tab-learn').evaluate("(node) => node.classList.contains('active')")
    assert page.locator('#study-panel').is_visible()
    assert page.locator('#replay-counter').inner_text()==source_counter
    assert page.locator('#btn-reason-defense').get_attribute('aria-pressed')=='true'
    assert page.locator('#study-reasoning-position-board').get_attribute('data-fen')==source_fen
    assert 'Think again' in page.locator('#study-reasoning-feedback').inner_text()
    assert page.locator('#btn-return-lesson').is_hidden()
    page.locator('#sel-language').select_option('ja')

    # A brand-new game discards the return target. Unrelated puzzles should
    # not grow a stale button from a previous learning session.
    page.locator('#btn-study-practice').click(force=True)
    assert page.locator('#btn-study-practice-hint').is_visible()
    page.locator('#btn-study-puzzle').click(force=True)
    assert page.locator('#btn-return-lesson').is_visible()
    page.locator('#btn-return-lesson').click(force=True)
    assert page.locator('#btn-study-practice-hint').is_visible(), 'active move practice was not restored'
    page.locator('#btn-study-puzzle').click(force=True)
    assert page.locator('#btn-return-lesson').is_visible()
    page.locator('.tab[data-tab="settings"]').click(force=True)
    page.locator('#btn-new').click(force=True)
    assert page.locator('#btn-return-lesson').is_hidden()

    # L-04: old 44 lessons are also interactive and a challenge does not
    # mutate position when graded. Quiz status survives navigation.
    page.locator('.tab[data-tab="learn"]').click(force=True)
    page.locator('#learn-cats .chip').nth(2).click(force=True)
    assert page.locator('#learn-list .study-item').count()==21
    page.locator('#learn-list .study-item').first.click(force=True)
    page.locator('#btn-study-practice').click(force=True)
    fork_move=page.evaluate("""() => {
      const l=LESSONS.find(x=>x.id==='cb_fork');
      const g=new Chess(l.fen);const m=g.moves({verbose:true}).find(x=>x.san===l.moves[0].san);
      return {from:m.from,to:m.to};
    }""")
    move(page,fork_move['from'],fork_move['to'])
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).cb_fork")=='mastered'
    page.locator('#learn-cats .chip').nth(4).click(force=True)
    assert page.locator('#learn-list .study-item').count()==17
    page.locator('#learn-list .study-item').nth(13).click(force=True)
    page.locator('#btn-study-practice').click(force=True)
    london=page.evaluate("""() => {
      const l=EXTRA_LESSONS.find(x=>x.id==='op_london');
      const g=new Chess(l.fen||undefined);
      for(let i=0;i<l.practice.ply;i++)g.move(l.moves[i].san);
      const m=g.moves({verbose:true}).find(x=>x.san===l.moves[l.practice.ply].san);
      return {from:m.from,to:m.to};
    }""")
    move(page,london['from'],london['to'])
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).op_london")=='mastered'
    # L-04b: compare an alternate line on the actual chessboard, then restore
    # the annotated main line without awarding/downgrading mastery.
    assert page.locator('#study-comparison').is_visible()
    assert page.locator('#btn-compare-main').get_attribute('aria-pressed')=='true'
    page.locator('#btn-compare-other').click(force=True)
    assert page.locator('#btn-compare-other').get_attribute('aria-pressed')=='true'
    assert 'Bg5' in page.locator('#study-compare-line').inner_text()
    assert 'Bg5' in page.locator('#replay-movelist li').last.inner_text()
    assert page.locator('#replay-counter').inner_text()=='0 / 5'
    page.locator('#btn-replay-next').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='1 / 5'
    page.locator('#btn-replay-prev').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='0 / 5'
    page.locator('#btn-replay-last').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='5 / 5'
    page.locator('#sel-language').select_option('en')
    assert page.locator('#btn-compare-other').get_attribute('aria-pressed')=='true'
    assert 'legal' in page.locator('#study-compare-reason').inner_text().lower()
    assert 'Bg5' in page.locator('#replay-movelist li').last.inner_text()
    page.locator('#sel-language').select_option('ja')
    page.locator('#btn-compare-main').click(force=True)
    assert page.locator('#btn-compare-main').get_attribute('aria-pressed')=='true'
    assert 'Bf4' in page.locator('#replay-movelist li').last.inner_text()
    assert page.locator('#replay-counter').inner_text()=='0 / 5'
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).op_london")=='mastered'
    page.locator('#btn-compare-other').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='0 / 5'
    page.locator('#btn-study-practice').click(force=True)
    assert page.locator('#btn-compare-main').get_attribute('aria-pressed')=='true'
    assert page.locator('#replay-counter').inner_text()=='4 / 5'

    # L-04c: Stalemate is the shortest contrast (Qf7: 1 ply;
    # alternative Qf6+ Kg8: 2 plies). Both must start at zero even when
    # switching from a fully viewed final position.
    page.locator('#learn-cats .chip').first.click(force=True)
    page.locator('#learn-list .study-item').nth(13).click(force=True)
    assert page.locator('#replay-counter').inner_text()=='0 / 1'
    page.locator('#btn-replay-last').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='1 / 1'
    page.locator('#btn-compare-other').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='0 / 2'
    page.locator('#btn-replay-next').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='1 / 2'
    page.locator('#btn-replay-next').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='2 / 2'
    page.locator('#btn-compare-main').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='0 / 1'
    # Related puzzles must also restore an alternative replay branch.
    page.locator('#btn-compare-other').click(force=True)
    page.locator('#btn-replay-next').click(force=True)
    page.locator('#btn-reason-defense').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='1 / 2'
    page.locator('#btn-study-puzzle').click(force=True)
    assert page.locator('#btn-return-lesson').is_visible()
    page.locator('#btn-return-lesson').click(force=True)
    assert page.locator('#btn-compare-other').get_attribute('aria-pressed')=='true'
    assert page.locator('#replay-counter').inner_text()=='1 / 2'
    assert page.locator('#btn-reason-defense').get_attribute('aria-pressed')=='true'
    page.locator('#btn-compare-main').click(force=True)
    page.locator('#btn-reason-why').click(force=True)
    assert page.locator('#replay-counter').inner_text()=='0 / 1'

    # L-04d: reasoning questions are separate from move mastery and do not
    # change the chessboard. Wrong answers cannot award understanding credit.
    assert page.locator('#study-reasoning').is_visible()
    counter_before=page.locator('#replay-counter').inner_text()
    assert '0 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#study-reasoning-options button').nth(0).click(force=True)  # wrong
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1') || '{}').bk_stalemate === undefined")
    assert page.locator('#replay-counter').inner_text()==counter_before
    page.locator('#study-reasoning-options button').nth(1).click(force=True)  # why
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1')).bk_stalemate.why===true")
    page.locator('#btn-reason-defense').click(force=True)
    assert page.locator('#btn-reason-defense').get_attribute('aria-pressed')=='true'
    page.locator('#study-reasoning-options button').nth(2).click(force=True)
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1')).bk_stalemate.defense===true")
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert page.locator('#replay-counter').inner_text()==counter_before
    page.locator('#sel-language').select_option('en')
    assert 'If White' in page.locator('#study-reasoning-question').inner_text()
    assert 'Correct' in page.locator('#study-reasoning-feedback').inner_text()
    assert page.locator('#btn-reason-defense').get_attribute('aria-pressed')=='true'
    page.locator('#sel-language').select_option('ja')
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert page.locator('#replay-counter').inner_text()==counter_before
    # Switching the comparison does not erase reasoning, and an unrelated
    # lesson must not inherit its answer.
    page.locator('#btn-compare-other').click(force=True)
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1')).bk_stalemate.defense===true")
    # Every course lesson now has a reasoning check, including principles.
    page.locator('#learn-cats .chip').nth(1).click(force=True)
    page.locator('#learn-list .study-item').first.click(force=True)
    assert page.locator('#study-reasoning').is_visible()
    page.locator('#learn-cats .chip').first.click(force=True)
    page.locator('#learn-list .study-item').nth(13).click(force=True)
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert '理解チェック' in page.locator('#learn-progress').inner_text()

    # L-04e: all 21 tactical lessons have two bilingual reasoning checks.
    # Confirm a brand-new old lesson, a mate lesson, and a persisted reload.
    page.locator('#learn-cats .chip').nth(2).click(force=True)
    assert page.locator('#learn-list .study-item').count()==21
    assert '0 / 42' in page.locator('#learn-progress').inner_text()
    page.locator('#learn-list .study-item').first.click(force=True)  # cb_fork
    assert page.locator('#study-reasoning').is_visible()
    assert 'Ne7+' in page.locator('#study-reasoning-question').inner_text()
    replay_before=page.locator('#replay-counter').inner_text()
    page.locator('#study-reasoning-options button').nth(1).click(force=True) # why
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(2).click(force=True) # draw
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert '2 / 42' in page.locator('#learn-progress').inner_text()
    assert page.locator('#replay-counter').inner_text()==replay_before
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1')).cb_fork.defense===true")
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).cb_fork==='mastered'")
    page.locator('#sel-language').select_option('en')
    assert 'result' in page.locator('#study-reasoning-question').inner_text().lower()
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#sel-language').select_option('ja')

    page.locator('#learn-list .study-item').nth(3).click(force=True) # cb_backrank
    assert '0 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).cb_backrank === undefined")
    page.locator('#study-reasoning-options button').nth(1).click(force=True)
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(2).click(force=True)
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert '4 / 42' in page.locator('#learn-progress').inner_text()
    # Correct understanding must not silently award the old move-mastered state.
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).cb_backrank === undefined")
    page.reload(wait_until='load')
    page.locator('.tab[data-tab="learn"]').click(force=True)
    page.locator('#learn-cats .chip').nth(2).click(force=True)
    assert '4 / 42' in page.locator('#learn-progress').inner_text()
    page.locator('#learn-list .study-item').first.click(force=True)
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#btn-reason-defense').click(force=True)
    assert page.locator('#study-reasoning-options button').count()==3

    # L-04f: all 18 endgames have reasoning questions, separate from
    # studied/mastered progress. Check mate and insufficient-material concepts.
    page.locator('#learn-cats .chip').nth(3).click(force=True)
    assert page.locator('#learn-list .study-item').count()==18
    assert '0 / 36' in page.locator('#learn-progress').inner_text()
    assert page.locator('#learn-list .study-item .learn-state').filter(has_text='理解チェック').count()==18
    page.locator('#learn-list .study-item').first.click(force=True) # eg_rook
    assert page.locator('#study-reasoning').is_visible()
    before_counter=page.locator('#replay-counter').inner_text()
    page.locator('#study-reasoning-options button').nth(0).click(force=True) # wrong
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1') || '{}').eg_rook === undefined")
    page.locator('#study-reasoning-options button').nth(1).click(force=True) # why
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(2).click(force=True) # counterfactual escape square
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert '2 / 36' in page.locator('#learn-progress').inner_text()
    assert page.locator('#replay-counter').inner_text()==before_counter
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1') || '{}').eg_rook !== 'mastered'")
    page.locator('#sel-language').select_option('en')
    assert 'g8' in page.locator('#study-reasoning-question').inner_text().lower()
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#sel-language').select_option('ja')

    page.locator('#learn-list .study-item').nth(7).click(force=True) # eg_underpromo
    assert '0 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#study-reasoning-options button').nth(0).click(force=True) # why
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(2).click(force=True) # draw
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert '4 / 36' in page.locator('#learn-progress').inner_text()
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1')).eg_underpromo.defense===true")
    page.reload(wait_until='load')
    page.locator('.tab[data-tab="learn"]').click(force=True)
    page.locator('#learn-cats .chip').nth(3).click(force=True)
    assert '4 / 36' in page.locator('#learn-progress').inner_text()
    page.locator('#learn-list .study-item').first.click(force=True)
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()

    # L-04g: opening chapter: 17 lessons, 34 reasoning checks, bilingual
    # concepts and unforced but legal counterplay. Progress is separate from mastery.
    page.locator('#learn-cats .chip').nth(4).click(force=True)
    assert page.locator('#learn-list .study-item').count()==17
    assert '0 / 34' in page.locator('#learn-progress').inner_text()
    assert page.locator('#learn-list .study-item .learn-state').filter(has_text='理解チェック').count()==17
    page.locator('#learn-list .study-item').first.click(force=True)  # op_italian
    assert page.locator('#study-reasoning').is_visible()
    assert 'Bc4' in page.locator('#study-reasoning-question').inner_text()
    opening_counter=page.locator('#replay-counter').inner_text()
    page.locator('#study-reasoning-options button').nth(0).click(force=True) # incorrect
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1') || '{}').op_italian === undefined")
    page.locator('#study-reasoning-options button').nth(1).click(force=True) # why: f7
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(2).click(force=True) # ...Bc5
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert '2 / 34' in page.locator('#learn-progress').inner_text()
    assert page.locator('#replay-counter').inner_text()==opening_counter
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1')).op_italian.defense===true")
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1') || '{}').op_italian !== 'mastered'")
    page.locator('#sel-language').select_option('en')
    assert '...Bc5' in page.locator('#study-reasoning-question').inner_text()
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#sel-language').select_option('ja')

    page.locator('#learn-list .study-item').nth(13).click(force=True) # op_london
    assert '0 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#study-reasoning-options button').nth(0).click(force=True) # Bf4 purpose
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(1).click(force=True) # ...c5 possible
    assert '4 / 34' in page.locator('#learn-progress').inner_text()
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).op_london==='mastered'")
    page.reload(wait_until='load')
    page.locator('.tab[data-tab="learn"]').click(force=True)
    page.locator('#learn-cats .chip').nth(4).click(force=True)
    assert '4 / 34' in page.locator('#learn-progress').inner_text()
    page.locator('#learn-list .study-item').first.click(force=True)
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()

    # L-04h: completing the basics/principles chapters yields 80 fully
    # covered lessons / 160 questions, without modifying the old mastery.
    assert page.evaluate("Object.keys(LESSON_REASONING).length") == 80
    page.locator('#learn-cats .chip').first.click(force=True)
    assert page.locator('#learn-list .study-item').count()==14
    assert '2 / 28' in page.locator('#learn-progress').inner_text() # bk_stalemate
    assert page.locator('#learn-list .study-item .learn-state').filter(has_text='理解チェック').count()==14
    page.locator('#learn-list .study-item').first.click(force=True) # bk_board
    assert page.locator('#study-reasoning').is_visible()
    basic_counter=page.locator('#replay-counter').inner_text()
    page.locator('#study-reasoning-options button').nth(0).click(force=True)  # wrong
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_reasoning_v1')).bk_board === undefined")
    page.locator('#study-reasoning-options button').nth(1).click(force=True)  # e4 file/rank
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(2).click(force=True)  # first double pawn move
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    assert '4 / 28' in page.locator('#learn-progress').inner_text()
    assert page.locator('#replay-counter').inner_text()==basic_counter
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).bk_board==='mastered'")

    page.locator('#learn-list .study-item').nth(12).click(force=True) # bk_enpassant
    page.locator('#study-reasoning-options button').nth(1).click(force=True)
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(2).click(force=True)
    assert '6 / 28' in page.locator('#learn-progress').inner_text()

    page.locator('#learn-cats .chip').nth(1).click(force=True)
    assert page.locator('#learn-list .study-item').count()==10
    assert '0 / 20' in page.locator('#learn-progress').inner_text()
    assert page.locator('#learn-list .study-item .learn-state').filter(has_text='理解チェック').count()==10
    page.locator('#learn-list .study-item').first.click(force=True) # pr_center
    assert page.locator('#study-reasoning').is_visible()
    principle_counter=page.locator('#replay-counter').inner_text()
    page.locator('#study-reasoning-options button').nth(1).click(force=True) # central space
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(2).click(force=True) # Nxd4
    assert '2 / 20' in page.locator('#learn-progress').inner_text()
    assert page.locator('#replay-counter').inner_text()==principle_counter
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1') || '{}').pr_center !== 'mastered'")
    page.locator('#sel-language').select_option('en')
    assert 'After' in page.locator('#study-reasoning-question').inner_text()
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#sel-language').select_option('ja')

    page.locator('#learn-list .study-item').nth(8).click(force=True) # pr_threat
    page.locator('#study-reasoning-options button').nth(1).click(force=True)
    page.locator('#btn-reason-defense').click(force=True)
    page.locator('#study-reasoning-options button').nth(0).click(force=True)
    assert '4 / 20' in page.locator('#learn-progress').inner_text()
    page.reload(wait_until='load')
    page.locator('.tab[data-tab="learn"]').click(force=True)
    page.locator('#learn-cats .chip').nth(1).click(force=True)
    assert '4 / 20' in page.locator('#learn-progress').inner_text()
    page.locator('#learn-list .study-item').first.click(force=True)
    assert '2 / 2' in page.locator('#study-reasoning-progress').inner_text()
    page.locator('#learn-cats .chip').first.click(force=True)
    assert '6 / 28' in page.locator('#learn-progress').inner_text()

    # L-04i: chessboard previews stop BEFORE the answer move, with a
    # separate immutable Chess instance. Correct answers reveal that move.
    page.locator('#learn-cats .chip').first.click(force=True)
    page.locator('#learn-list .study-item').nth(13).click(force=True)  # bk_stalemate
    assert page.locator('#study-reasoning-position-board .reasoning-position-square').count()==64
    preview_fen=page.locator('#study-reasoning-position-board').get_attribute('data-fen')
    assert preview_fen==page.evaluate("new Chess(INTRO_LESSONS.find(l=>l.id==='bk_stalemate').fen).fen()")
    assert page.locator('#btn-reason-after').is_disabled()
    counter=page.locator('#replay-counter').inner_text()
    page.locator('#study-reasoning-options button').nth(0).click(force=True)  # wrong
    assert page.locator('#btn-reason-after').is_disabled()
    assert page.locator('#study-reasoning-position-board').get_attribute('data-fen')==preview_fen
    page.locator('#study-reasoning-options button').nth(1).click(force=True)  # correct
    result_fen=page.locator('#study-reasoning-position-board').get_attribute('data-fen')
    assert result_fen!=preview_fen
    assert 'Qf7' in page.locator('#study-reasoning-position-label').inner_text()
    assert page.locator('#study-reasoning-position-board .reasoning-position-move').count()==2
    assert page.locator('#replay-counter').inner_text()==counter
    page.locator('#btn-reason-before').click(force=True)
    assert page.locator('#study-reasoning-position-board').get_attribute('data-fen')==preview_fen
    page.locator('#btn-reason-after').click(force=True)
    assert page.locator('#study-reasoning-position-board').get_attribute('data-fen')==result_fen

    page.locator('#btn-reason-defense').click(force=True)  # Qf6+ ...Kg8 branch
    expected_before=page.evaluate("""() => {
      const g=new Chess(INTRO_LESSONS.find(l=>l.id==='bk_stalemate').fen);
      g.move('Qf6+'); return g.fen();
    }""")
    assert page.locator('#study-reasoning-position-board').get_attribute('data-fen')==expected_before
    assert page.locator('#btn-reason-after').is_disabled()
    page.locator('#study-reasoning-options button').nth(2).click(force=True)  # ...Kg8
    assert 'Kg8' in page.locator('#study-reasoning-position-label').inner_text()
    assert page.locator('#replay-counter').inner_text()==counter
    page.locator('#btn-compare-other').click(force=True)
    assert page.locator('#study-reasoning-position-board').get_attribute('data-fen')!=preview_fen
    assert page.locator('#replay-counter').inner_text()=='0 / 2'
    page.locator('#sel-language').select_option('en')
    assert 'Move replayed' in page.locator('#study-reasoning-position-label').inner_text()
    assert 'Kg8' in page.locator('#study-reasoning-position-label').inner_text()
    page.locator('#sel-language').select_option('ja')

    # The deep opening line must show the position before 12th half-move
    # ...e5, without inserting eleven moves into the main replay.
    page.locator('#learn-cats .chip').nth(4).click(force=True)
    page.locator('#learn-list .study-item').nth(8).click(force=True)  # op_kingsindian
    page.locator('#btn-reason-defense').click(force=True)
    assert page.locator('#replay-counter').inner_text().startswith('0 /')
    before=page.evaluate("""() => {
      const l=LESSONS.find(x=>x.id==='op_kingsindian');
      return ReasoningPositions.resolve(Chess,l,'defense',LESSON_REASONING.op_kingsindian.defense).beforeFen;
    }""")
    assert page.locator('#study-reasoning-position-board').get_attribute('data-fen')==before
    assert page.locator('#btn-reason-after').is_disabled()
    page.locator('#study-reasoning-options button').nth(2).click(force=True)
    assert 'e5' in page.locator('#study-reasoning-position-label').inner_text()
    assert page.locator('#replay-counter').inner_text().startswith('0 /')
    page.reload(wait_until='load')
    page.locator('.tab[data-tab="learn"]').click(force=True)
    page.locator('#learn-cats .chip').nth(4).click(force=True)
    page.locator('#learn-list .study-item').nth(8).click(force=True)
    assert page.locator('#btn-reason-after').is_disabled()
    assert page.locator('#study-reasoning-position-board .reasoning-position-square').count()==64

    # L-04j: stepping through a long replay scrolls only its move list,
    # never the outer page. Use DOM clicks to exclude Playwright's own
    # automatic scroll-into-view behavior from the measurement.
    page.locator('#learn-cats .chip').nth(2).click(force=True)
    windmill_idx=page.evaluate("LESSONS.filter(l=>l.cat==='combo').findIndex(l=>l.id==='cb_windmill')")
    assert windmill_idx>=0
    page.locator('#learn-list .study-item').nth(windmill_idx).click(force=True)
    page.evaluate("window.scrollTo(0, 260)")
    page.wait_for_timeout(80)
    before_scroll=page.evaluate("window.scrollY")
    assert before_scroll>0
    for _ in range(10):
        page.evaluate("document.getElementById('btn-replay-next').click()")
        assert abs(page.evaluate("window.scrollY")-before_scroll)<=2, 'replay navigation moved the page'
    assert page.locator('#replay-counter').inner_text()=='10 / 11'
    list_metrics=page.locator('#replay-movelist').evaluate(
        "(node) => ({top:node.scrollTop, height:node.clientHeight, content:node.scrollHeight})")
    if list_metrics['content']>list_metrics['height']:
        assert list_metrics['top']>0, 'overflowed move list did not scroll internally'
    for _ in range(5):
        page.evaluate("document.getElementById('btn-replay-prev').click()")
        assert abs(page.evaluate("window.scrollY")-before_scroll)<=2, 'replay rewind moved the page'

    # L-05: famous games moved from record tabs to the sixth learning chapter;
    # viewing the last ply saves viewed state, language refreshes annotations.
    page.locator('#learn-cats .chip').nth(5).click(force=True)
    assert page.locator('#learn-list .study-item').count()==15
    assert page.locator('.card-kifu .tab').count()==2
    assert page.locator('#tab-games').count()==0
    page.locator('#learn-list .study-item').first.click(force=True)
    assert 'hidden' in page.locator('#study-reasoning').get_attribute('class'), 'famous games should not inherit a course quiz'
    assert 'hidden' in page.locator('#study-practice').get_attribute('class')
    page.evaluate("window.scrollTo(0, 260)")
    original_y=page.evaluate("window.scrollY")
    page.evaluate("document.getElementById('btn-replay-last').click()")
    assert abs(page.evaluate("window.scrollY")-original_y)<=2, 'famous game replay scrolled whole page'
    assert page.locator('#replay-movelist').evaluate("(node) => node.scrollTop")>0, 'long replay did not scroll inside its list'
    assert page.evaluate("JSON.parse(localStorage.getItem('animalchess_learning_v1')).opera")=='studied'
    page.locator('#sel-language').select_option('en')
    assert 'Opera' in page.locator('#study-title').inner_text()
    page.locator('#sel-language').select_option('ja')
    page.locator('.tab[data-tab="settings"]').click(force=True)
    page.locator('#btn-new').click(force=True)
    # Changing locale during normal play must not reopen a stale lesson.
    page.locator('#sel-language').select_option('en')
    assert 'hidden' in page.locator('#study-panel').get_attribute('class')
    page.locator('#sel-language').select_option('ja')
    assert 'hidden' in page.locator('#study-panel').get_attribute('class')
    # A-01: terminal dialog callback must not outlive the game.
    for a,b in [('f2','f3'),('e7','e5'),('g2','g4'),('d8','h4')]:move(page,a,b)
    assert page.locator('#movelist li').count()==4
    page.locator('#btn-new').click(force=True)
    page.wait_for_timeout(950)
    assert 'hidden' in page.locator('#gameover-modal').get_attribute('class'), 'stale game-over modal after reset'
    assert page.locator('#movelist li').count()==0
    # A-01b: active game over dialog must be keyboard accessible and labelled
    for a,b in [('f2','f3'),('e7','e5'),('g2','g4'),('d8','h4')]:move(page,a,b)
    page.locator('#gameover-modal:not(.hidden)').wait_for(timeout=2500)
    assert page.locator('#gameover-modal').get_attribute('aria-modal')=='true'
    assert page.evaluate('document.activeElement.id')=='btn-gameover-close'
    page.keyboard.press('Tab');assert page.evaluate('document.activeElement.id')=='btn-gameover-new'
    page.keyboard.press('Tab');assert page.evaluate('document.activeElement.id')=='btn-gameover-close'
    page.keyboard.press('Escape');assert 'hidden' in page.locator('#gameover-modal').get_attribute('class')
    # A-04: sanitize persisted settings against injected/invalid types
    context2=browser.new_context(viewport={'width':390,'height':840},reduced_motion='reduce')
    p2=context2.new_page();p2.on('pageerror',lambda e: JSERR.append(str(e)))
    load_inline(p2,{'set':'missing','opponent':'cpu','playerColor':'invalid','level':999,'viewMode':'nosuch','language':'fr','sound':'yes','bgmSong':'-999','badges':None,'bgm':0})
    assert p2.locator('#sel-level').input_value()=='4'
    assert p2.locator('#sel-color').input_value()=='w'
    assert p2.locator('#sel-view').input_value()=='miniature'
    assert p2.locator('#sel-set').input_value()=='farm'
    assert p2.locator('#sel-bgm').input_value()=='auto'
    # A-03: promotion modal initial focus and keyboard cycling
    page.locator('#btn-new').click(force=True)
    page.locator('.tab[data-tab="load"]').click(force=True)
    page.locator('#pgn-input').fill('[SetUp "1"]\n[FEN "7k/P7/6K1/8/8/8/8/8 w - - 0 1"]\n\n*')
    page.locator('#btn-load-pgn').click(force=True)
    page.locator('#btn-replay-play').click(force=True)
    move(page,'a7','a8')
    page.locator('#promo-modal:not(.hidden)').wait_for(timeout=2000)
    assert page.evaluate('document.activeElement.closest("#promo-modal") !== null')
    assert page.locator('#promo-modal').get_attribute('role')=='dialog'
    for _ in range(4):page.keyboard.press('Tab');assert page.evaluate('document.activeElement.closest("#promo-modal") !== null')
    page.keyboard.press('Escape');assert 'hidden' in page.locator('#promo-modal').get_attribute('class')
    move(page,'a7','a8');page.locator('#promo-modal:not(.hidden)').wait_for(timeout=2000)
    page.locator('#promo-choices button').first.click(force=True)
    assert 'hidden' in page.locator('#promo-modal').get_attribute('class')
    # A-02: asynchronous CPU/hint search must not lock UI.
    page.locator('#btn-new').click(force=True)
    page.locator('#sel-opponent').select_option('cpu')
    page.locator('#sel-level').select_option('10')
    t0=time.monotonic();page.locator('#btn-hint').click(force=True)
    page.locator('#sel-view').select_option('simple')
    elapsed=(time.monotonic()-t0)*1000
    assert elapsed < 1100, 'UI blocked by hint %.0f ms'%elapsed
    # Cancel the hint with new game; CPU request should remain responsive.
    page.locator('#btn-new').click(force=True)
    move(page,'e2','e4')
    t0=time.monotonic();page.locator('#btn-new').click(force=True)
    elapsed_reset=(time.monotonic()-t0)*1000
    assert elapsed_reset<1100, 'UI blocked by CPU %.0f ms'%elapsed_reset
    page.wait_for_timeout(2200)
    assert page.locator('#movelist li').count()==0, 'old CPU move survived game reset'
    # The Worker must also finish a real move, not merely be cancellable.
    page.locator('#sel-level').select_option('1')
    move(page,'e2','e4')
    page.wait_for_function("document.querySelectorAll('#movelist li').length >= 2",timeout=6000)
    assert page.locator('#movelist li').count()==2
    page.locator('#btn-new').click(force=True)
    page.locator('#btn-hint').click(force=True)
    page.wait_for_function("document.querySelector('#status-bar').textContent.indexOf('考え中') < 0",timeout=7000)
    # P-80: verify that the corrected Japanese / English catalog reaches
    # the actual puzzle UI, including both mate sequences.
    page.locator('.tab[data-tab="puzzle"]').click(force=True)
    page.locator('#puzzle-cats .chip.lv').first.click(force=True)
    page.locator('#puzzle-cats .chip:not(.lv)').first.click(force=True)
    rook_idx=page.evaluate("PUZZLES.findIndex(p=>p.id==='mate-rook-knight-coordination')")
    assert rook_idx>=0
    page.locator(f'#puzzle-list .puzzle-item[data-puzzle-index="{rook_idx}"]').click(force=True)
    assert 'おうまさんのまちぶせ' in page.locator('#puzzle-title').inner_text()
    assert page.evaluate("""() => {
      const p=PUZZLES.find(x=>x.id==='mate-rook-knight-coordination');
      const game=new Chess(p.fen),noKnight=new Chess(p.fen);
      noKnight.remove('b5');
      game.move('Rf8#');
      noKnight.move('Rf8#');
      return game.in_checkmate() && !noKnight.in_checkmate();
    }"""), 'knight does not matter for published rook mate'
    move(page,'f4','f8')
    assert page.locator('#puzzle-completion').is_visible(), 'rook/knight mate not accepted in browser'

    queen_idx=page.evaluate("PUZZLES.findIndex(p=>p.id==='mate-queen-knight-endgame')")
    page.locator(f'#puzzle-list .puzzle-item[data-puzzle-index="{queen_idx}"]').click(force=True)
    assert 'おうさまとおうまのさんぽ' in page.locator('#puzzle-title').inner_text()
    move(page,'g5','g6')
    page.wait_for_timeout(850)  # deterministic black response to the puzzle line
    move(page,'h4','d8')
    assert page.locator('#puzzle-completion').is_visible(), 'queen/knight mate not accepted'

    finish_idx=page.evaluate("PUZZLES.findIndex(p=>p.id==='puzzle-035')")
    page.locator(f'#puzzle-list .puzzle-item[data-puzzle-index="{finish_idx}"]').click(force=True)
    assert 'ルークのメイトへ、あと一歩' in page.locator('#puzzle-title').inner_text()
    page.locator('#sel-language').select_option('en')
    assert 'One Step to Rook Mate' in page.locator('#puzzle-title').inner_text()
    page.locator('#sel-language').select_option('ja')
    assert not JSERR,JSERR
    print(json.dumps({'result':'PASS','gameOverReset':True,'modalFocus':True,'invalidSettings':True,'workerSearchResponsiveMs':round(elapsed),'cpuCancelResponsiveMs':round(elapsed_reset),'errors':JSERR}))
    context2.close();context.close();browser.close()
if _server:_server.shutdown()

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
    worker_content='\n'.join((ROOT/f).read_text() for f in ('js/chess.js','js/lessons.js','js/engine.js'))+'\n'+(ROOT/'js/engine_worker.js').read_text().replace("importScripts('chess.js?v=2', 'lessons.js?v=18', 'engine.js?v=19');",'')
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
    # B-01: at ordinary desktop browser heights both banquet halls and the
    # status must be visible without vertical scrolling. Titles are overlaid
    # inside the miniature room instead of consuming a separate layout row.
    for width,height in [(1503,840),(1440,900)]:
        page.set_viewport_size({'width':width,'height':height})
        page.locator('#sel-view').select_option('miniature')
        boxes=page.evaluate("""() => {
          const rect = s => document.querySelector(s).getBoundingClientRect();
          const top = rect('#venue-top'), bottom = rect('#venue-bottom');
          const status = rect('#status-bar'), board = rect('#board');
          const label = rect('#venue-top .venue-title');
          const room = rect('#venue-top .venue-guests');
          return {
            top: top.top, bottom: bottom.bottom, status: status.bottom,
            boardWidth: board.width, boardHeight: board.height,
            labelTop: label.top, labelBottom: label.bottom,
            roomTop: room.top, roomBottom: room.bottom,
            labelFont: parseFloat(getComputedStyle(document.querySelector('#venue-top .venue-title')).fontSize)
          };
        }""")
        assert boxes['top']>=0, f'banquet top offscreen: {width}x{height} {boxes}'
        assert boxes['status']<=height-2, f'status offscreen: {width}x{height} {boxes}'
        assert boxes['bottom']<=height-2, f'bottom banquet offscreen: {width}x{height} {boxes}'
        assert 360<=boxes['boardWidth']<=660, f'board size: {width}x{height} {boxes}'
        assert abs(boxes['boardWidth']-boxes['boardHeight'])<2, f'board not square: {boxes}'
        assert 9<=boxes['labelFont']<=10.5, f'banquet label too large: {boxes}'
        assert boxes['roomTop']<=boxes['labelTop']<boxes['labelBottom']<=boxes['roomBottom'], f'label not overlaid: {boxes}'
    page.set_viewport_size({'width':1280,'height':900})
    page.locator('#sel-view').select_option('simple')
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
    assert not JSERR,JSERR
    print(json.dumps({'result':'PASS','gameOverReset':True,'modalFocus':True,'invalidSettings':True,'workerSearchResponsiveMs':round(elapsed),'cpuCancelResponsiveMs':round(elapsed_reset),'errors':JSERR}))
    context2.close();context.close();browser.close()
if _server:_server.shutdown()

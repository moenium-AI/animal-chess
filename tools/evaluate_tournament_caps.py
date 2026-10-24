#!/usr/bin/env python3
"""Offline, engine-assisted *positional lead* analysis at the fixed-ply cap.
This never changes an unfinished game's recorded result or the Elo sample.
"""
import argparse, collections, json, os, pathlib, re, subprocess, sys, time

class Uci:
    def __init__(self, binary):
        self.p = subprocess.Popen([binary], stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                  stderr=subprocess.DEVNULL, text=True, bufsize=1)
        self.cmd('uci'); self.until('uciok')
        self.cmd('setoption name Threads value 1'); self.cmd('setoption name Hash value 16')
        self.cmd('isready'); self.until('readyok')
    def cmd(self, line):
        self.p.stdin.write(line+'\n'); self.p.stdin.flush()
    def until(self, target):
        while True:
            x=self.p.stdout.readline()
            if not x: raise RuntimeError('Engine exited before '+target)
            if x.strip()==target:return
    def eval(self, fen, depth):
        self.cmd('position fen '+fen);self.cmd('go depth '+str(depth))
        last=None
        while True:
            line=self.p.stdout.readline()
            if not line: raise RuntimeError('Stockfish exited')
            if line.startswith('bestmove '): break
            if line.startswith('info depth ') and 'score ' in line:
                m=re.search(r'\bscore (cp|mate) (-?\d+)',line)
                if m and not ('lowerbound' in line or 'upperbound' in line):
                    last=(m.group(1),int(m.group(2)),int(line.split('depth ')[1].split()[0]))
        if last is None: raise RuntimeError('Missing engine score for '+fen)
        kind,score,d=last
        cp=(100000-100*abs(score)) * (1 if score>0 else -1) if kind=='mate' else score
        return -cp if fen.split()[1]=='b' else cp,kind,d
    def close(self):
        self.cmd('quit');self.p.wait(timeout=3)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('results',nargs='+');ap.add_argument('--engine',required=True)
    ap.add_argument('--depth',type=int,default=9);ap.add_argument('--output',required=True)
    args=ap.parse_args();assert 1<=args.depth<=24
    files=[]
    for f in args.results:files.extend(json.loads(pathlib.Path(f).read_text())['games'])
    engine=Uci(args.engine);rows=[];start=time.time()
    try:
        for i,g in enumerate(files):
            if g['completed']:continue
            cp,kind,reached=engine.eval(g['finalFen'],args.depth)
            stronger=g['b']; whiteStrong=g['white']==stronger
            relative=cp if whiteStrong else -cp
            rows.append({'a':g['a'],'b':g['b'],'opening':g['opening'],'white':g['white'],
                        'black':g['black'],'scoreWhiteCp':cp,'scoreStrongerCp':relative,
                        'lead':'b' if relative>300 else 'a' if relative<-300 else 'unclear',
                        'scoreKind':kind,'depth':reached})
            if (i+1)%20==0: print('evaluated',len(rows),'/',len(files),'in',round(time.time()-start),'sec',flush=True)
    finally: engine.close()
    summary=[]
    for key,grp in __import__('itertools').groupby(sorted(rows,key=lambda r:(r['a'],r['b'])),lambda r:(r['a'],r['b'])):
        r=list(grp);c=collections.Counter(x['lead'] for x in r)
        summary.append({'a':key[0],'b':key[1],'unfinished':len(r),'strongerLead':c['b'],
                        'weakerLead':c['a'],'unclear':c['unclear'],
                        'averageStrongerCp':round(sum(x['scoreStrongerCp'] for x in r)/len(r))})
    report={'method':'Stockfish 16 at ply-limit positions, depth '+str(args.depth)+'. Position lead is NOT an official win, not added to Elo; |cp|>300 lead threshold.','evaluated':len(rows),'summary':summary,'rows':rows}
    pathlib.Path(args.output).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print('CAP_EVAL',json.dumps({'evaluated':len(rows),'summary':summary,'elapsedSec':round(time.time()-start)}))
if __name__=='__main__':main()

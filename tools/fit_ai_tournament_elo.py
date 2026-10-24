#!/usr/bin/env python3
"""Experimental regularized Bradley-Terry relative ratings with opening-pair bootstrap.
Nonterminal move-cap adjudicated draws make these *tournament-rule* estimates only.
Requires numpy/scipy, unlike the zero-dependency production JS scripts.
"""
import argparse, collections, json, math, pathlib
import numpy as np
from scipy.optimize import minimize

M=math.log(10)/400

def rating(rows):
    # In each row: two ratings a and b, B score in [0, 1], sample weight.
    a=np.array([r['a']-1 for r in rows],int)
    b=np.array([r['b']-1 for r in rows],int)
    y=np.array([r['scoreB'] for r in rows],float)
    weights=np.array([r.get('weight',1) for r in rows],float)
    def func(x):
        rr=x - x.mean()
        z=(rr[b]-rr[a])*M
        p=np.maximum(1e-10,np.minimum(1-1e-10,1/(1+np.exp(-np.clip(z,-40,40)))))
        negLL=-np.sum(weights*(y*np.log(p)+(1-y)*np.log(1-p)))+0.5*sum((rr/600)**2)
        grad=np.zeros(10)
        t=weights*(p-y)*M
        np.add.at(grad,b,t)
        np.add.at(grad,a,-t)
        grad+=rr/(600**2)
        grad-=grad.mean()
        return negLL,grad
    res=minimize(func,np.zeros(10),jac=True,method='BFGS',options={'gtol':1e-7,'maxiter':1000})
    if not np.isfinite(res.x).all():raise ValueError('Invalid rating fit')
    return res.x-res.x.mean()

def run(inputs,bootstrap=400):
    games=[g for filename in inputs for g in json.loads(pathlib.Path(filename).read_text())['games']]
    grouped=collections.defaultdict(lambda:collections.defaultdict(list))
    for g in games:
        key=(g['a'],g['b'])
        grouped[key][(g['opening'],g['seed'])].append(1-g['scoreA'])
    obs=[]
    for (a,b),openings in grouped.items():
        for key,scores in openings.items():
            if len(scores)!=2:raise ValueError('Unmirrored '+str((a,b,key)))
            obs.append({'a':a,'b':b,'opening':key,'scoreB':sum(scores)/2})
    # Pair groups are the statistical resampling units (one game as each color).
    perPair=collections.defaultdict(list)
    for row in obs:perPair[(row['a'],row['b'])].append(row)
    estimate=rating(obs)
    rng=np.random.default_rng(20261024)
    sampled=np.zeros((bootstrap,10))
    for i in range(bootstrap):
        resampled=[]
        for pair,rows in perPair.items():
            idx=rng.integers(0,len(rows),len(rows))
            resampled.extend(rows[j] for j in idx)
        sampled[i]=rating(resampled)
    return {'method':'Experimental centered Bradley-Terry fractional-score model with 600 Elo weak ridge, 95% opening-pair bootstrap interval. Capped games counted as draws by tournament rule. Not an absolute Elo or official strength estimate.',
            'games':len(games),'completed':sum(g['completed'] for g in games),'bootstrapDraws':bootstrap,
            'levels':[{'level':i+1,'centeredRating':int(round(estimate[i])),
                       'pairedBootstrap95':[int(v) for v in np.rint(np.quantile(sampled[:,i],[.025,.975])).astype(int)]} for i in range(10)]}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('files',nargs='+');p.add_argument('--output');p.add_argument('--bootstrap',type=int,default=400)
    a=p.parse_args();r=run(a.files,a.bootstrap)
    if a.output:pathlib.Path(a.output).write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps(r,ensure_ascii=False,indent=2))

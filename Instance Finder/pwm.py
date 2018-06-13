from typing import Dict, List
from collections import OrderedDict
from model import Code, CodeDist, PWM, Prob

Score = float
PSSM = List[Dict[Code, Score]]
Background = CodeDist
Sequence = str


def log2(x):
    import math
    if x == 0:
        return float("-inf")
    else:
        return math.log2(x)


def round_to(x, prec):
    import math
    if math.fabs(x) != float("+inf"):
        return round(x / prec) * prec
    else:
        return x


def pseudo_count(pwm: PWM):
    c = 0.000001
    m1 = []
    for d in pwm:
        d = {k: c + v for k,v in d.items()}
        s = sum(d.values())
        d = {k: v/s for k,v in d.items()}
        m1.append(d)
    return m1


def pwm_to_pssm(bgd: Background, pwm: PWM, precision=0.001):
    # pwm = pseudo_count(pwm)
    pssm = []
    for d in pwm:
        pssm.append({code: round_to(log2(prob / bgd[code]), precision) for code, prob in d.items()})
    return pssm


def make_score_dist(background: Background, pssm: PSSM):
    def new_score_dist(old_score_dist, code2score):
        # new score dist.
        nsd: Dict[float, float] = {}
        for old_score, pr_old_score in old_score_dist.items():
            for code, pr_base in background.items():
                score = old_score + code2score[code]
                nsd[score] = nsd.get(score, 0) + pr_old_score * pr_base
        return nsd

    score_distribution: Dict[Score, Prob] = {0: 1}
    for score_table in pssm:
        score_distribution = new_score_dist(score_distribution, score_table)

    return OrderedDict(sorted(score_distribution.items(), key=lambda x: x[0], reverse=True))


def make_score2p_value(score_dist: Dict[Score, Prob], threshold=1):
    # ---> { score: Pr(SCORE >= score) }
    prob_sum = 0
    d = {}
    for score, prob in score_dist.items():
        prob_sum += prob
        if prob_sum > threshold:
            break
        d[score] = prob_sum
    return d


def make_score(pssm: PSSM, seq: Sequence):
    score = 0
    # print(pssm)
    # input()
    for code, code2score in zip(seq, pssm):
        score += code2score[code]
    return score

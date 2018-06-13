from typing import List, Tuple

from _3_IHFA_model import Hook, SHook, GHook, Interval
from _5_D_model import Model
from model import Sequence
from pfsm import PFSM
from pwm_scanner import scan_pwms
import heapq


class PWMMatch:
    def __init__(self, name, start, end, score):
        self.name = name
        self.start = start
        self.end = end
        self.score = score

    def __repr__(self):
        return str((self.name, self.start, self.end, self.score))

    def __lt__(self, other):
        assert isinstance(other, PWMMatch)
        return self.start < other.start


class Matcher:
    def __init__(self, state, score: float, hook, path: List[PWMMatch]):
        self.state = state
        self.score = score
        self.hook = hook
        self.path = path
        self.start = path[0].start
        self.end = path[-1].end

    def __repr__(self):
        return str((self.start, self.end))


def make_pv_dict(pwm_dict):
    d = {}
    for name in pwm_dict.keys():
        d[name] = 0.1
    return d


class MatchLogger:
    def __init__(self, size):
        self.size = size
        self.heap: List[Tuple[float, List[PWMMatch]]] = []

    def put(self, score, match: List[PWMMatch]):
        # print("put", score, match)
        heapq.heappush(self.heap, (-score, match))
        if len(self.heap) > self.size:
            import math
            self.heap[math.floor(self.size):] = []

    def get_results(self):
        for m_score, match in sorted(self.heap):
            yield - m_score, match


def scan_model(model: Model, pv_dict, top: float, sequence: Sequence):
    pool = []
    logger = MatchLogger(top)
    for pwm_name, pwm_start, pwm_end, pwm_pv, pwm_score in scan_pwms(model.pwm_dict, pv_dict, model.bgd, sequence):
        pwm_match = PWMMatch(name=pwm_name, start=pwm_start, end=pwm_end, score=pwm_score)
        new_pool = []
        for matcher in get_new_matchers(pool, model.graph, model.start, pwm_match):
            new_pool.append(matcher)
        # log newly generated matchers
        for matcher in get_endable_matchers(new_pool, model.ends):
            logger.put(matcher.score, matcher.path)
        # add alive old matchers to new pool
        for matcher in get_alive_matchers(pool, model.graph, pwm_match):
            new_pool.append(matcher)
        pool = new_pool

    yield from logger.get_results()


def get_alive_matchers(pool, graph: PFSM, pwm_match: PWMMatch):
    for matcher in pool:
        distance = pwm_match.start - matcher.end
        for p, interval, s1 in graph.out_edges(matcher.state):
            if distance < interval.high:
                yield matcher
                break


def get_new_matchers(pool, graph, g_start, pwm_match: PWMMatch):
    for state, hook in step_by_hook(graph, g_start, pwm_match.name):
        yield Matcher(state=state, score=pwm_match.score, hook=hook, path=[pwm_match])
    for matcher in pool:
        yield from get_child_matchers(graph, matcher, pwm_match)


def get_endable_matchers(pool, ends):
    for matcher in pool:
        if matcher.state in ends:
            yield matcher


def step_by_hook(graph: PFSM, s0, name):
    for p, hook, s1 in graph.out_edges(s0):
        assert isinstance(hook, Hook)
        if hook.name == name:
            yield s1, hook


def get_child_matchers(graph: PFSM, matcher: Matcher, pwm_match: PWMMatch):
    hook = matcher.hook
    assert isinstance(hook, Hook), hook
    if isinstance(hook, GHook):
        if matcher.end == pwm_match.start and hook.name == pwm_match.name:
            yield Matcher(state=matcher.state,
                          hook=hook,
                          score=matcher.score * pwm_match.score,
                          path=matcher.path + [pwm_match])
        yield from get_normal_child_matchers(graph, matcher, pwm_match)
    elif isinstance(hook, SHook):
        yield from get_normal_child_matchers(graph, matcher, pwm_match)
    else:
        assert False


def get_normal_child_matchers(graph: PFSM, matcher: Matcher, pwm_match: PWMMatch):
    distance = pwm_match.start - matcher.end
    for p1, interval, s1 in graph.out_edges(matcher.state):
        assert isinstance(interval, Interval)
        if interval.includes(distance):
            for p2, hook, s2 in graph.out_edges(s1):
                assert isinstance(hook, Hook)
                # print(interval, distance)
                if hook.name == pwm_match.name:
                    yield Matcher(state=s2,
                                  hook=hook,
                                  score=matcher.score * pwm_match.score,
                                  path=matcher.path + [pwm_match])


# test
if __name__ == "__main__":
    import _0_re_model as rem
    import _1_NFAe_model as nfaem
    import _2_NNFA_model as nnfa
    import _3_IHFA_model as ihfa
    import _4_SIHFA_model as sihfa
    import json
    import io

    m = rem.Model.load(json.load(io.open("./test cases/model(11).json", mode="r", encoding="utf-8-sig")))
    m = nfaem.Model.load(m)
    m = nnfa.Model.load(m)
    m = ihfa.Model.load(m)
    m = sihfa.Model.load(m)
    m = Model.load(m)

    # sequence = "GAACGTCCCTGCCGTAAAAAATTATTGTTTTTATAGG"
    sequence = "AAAATATACCCCGCGCGTTTT"
    # for name, location, p_value in scan_pwms(model.motif_dict, pv_dict, model.background, sequence):
    #     # print(name, location, p_value)
    #     pass
    for x in (scan_model(m, make_pv_dict(m.pwm_dict), float('3'), sequence)):
        print("result", x)

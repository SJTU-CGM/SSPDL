"""
Interval-Hook Finite Automaton

inline spacers and change Nones to Interval(0,0,[1])
"""

import _2_NNFA_model as nnfa
from _0_re_model import Namespace, Spacer, Motif, SimpleMotif, GeneralizedMotif
from graph import MultiGraph
from model import Distribution
from pfsm import PFSM


class Model:
    def __init__(self, bgd, pwm_dict, graph: PFSM, start, end):
        self.bgd = bgd
        self.pwm_dict = pwm_dict
        self.graph = graph
        self.start = start
        self.end = end

    @staticmethod
    def load(m: nnfa.Model):
        graph, start, end = inline_elements(m.ns, m.graph, m.start, m.end)
        pwm_dict = {name: element.pwm for name, element in m.ns.items() if isinstance(element, Motif)}
        return Model(m.bgd, pwm_dict, graph, start, end)


class Hook:
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<{}>".format(self.name)


class SHook(Hook):
    def __hash__(self):
        return hash(("s.hook", self.name))

    def __eq__(self, other):
        return isinstance(other, SHook) and repr(self) == repr(other)


class GHook(Hook):
    def __init__(self, name, dist):
        super().__init__(name)
        self.prange = PRange.load(dist)

    def __repr__(self):
        return super().__repr__() + "*"

    def __hash__(self):
        return hash(("g.hook", self.name))

    def __eq__(self, other):
        return isinstance(other, GHook) and repr(self) == repr(other)


class PRange:
    def __init__(self, low, high, probabilities):
        self.low, self.high, self.probabilities = low, high, probabilities

    def includes(self, n):
        return self.low <= n <= self.high and self.probabilities[n - self.low] > 0

    def __eq__(self, other):
        return isinstance(other, PRange) and hash(self) == hash(other)

    def __add__(self, i1):
        i0: PRange = self
        i1: PRange = i1
        low = i0.low + i1.low
        ps = [0] * (len(i0.probabilities) + len(i1.probabilities) - 1)
        for i, p in enumerate(i0.probabilities):
            for j, q in enumerate(i1.probabilities):
                ps[i + j] += p * q
        return PRange(low, low + len(ps) - 1, ps)

    @staticmethod
    def load(dist: Distribution):
        return PRange(dist.low, dist.low + len(dist.probs) - 1, dist.probs)


class Interval(PRange):
    @staticmethod
    def load(dist: Distribution):
        return Interval(dist.low, dist.low + len(dist.probs) - 1, dist.probs)

    def __add__(self, other):
        assert isinstance(other, Interval)
        x = super().__add__(other)
        return Interval(x.low, x.high, x.probabilities)

    def __repr__(self):
        return "[{},{}]".format(self.low, self.high)

    def __hash__(self):
        return hash(("interval", self.low, self.high))

    def __eq__(self, other):
        return isinstance(other, Interval) and repr(self) == repr(other)


def make_event(ns: Namespace, name: str):
    if name is None:
        return Interval(0, 0, [1])
    elif isinstance(name, str):
        e = ns[name]
        if isinstance(e, Spacer):
            return Interval.load(e.dist)
        elif isinstance(e, SimpleMotif):
            return SHook(name)
        elif isinstance(e, GeneralizedMotif):
            return GHook(name, e.dist)
        assert False
    assert False


def inline_elements(ns: Namespace, g: MultiGraph, start, end):
    graph = PFSM()

    state_dict = dict()

    def map_state(s):
        if s not in state_dict.keys():
            state_dict[s] = graph.new_state()
        return state_dict[s]

    visited = set()

    def n(s0):
        if s0 in visited:
            return
        else:
            visited.add(s0)
            for p, e, s1 in g.out_edges(s0):
                graph.link(map_state(s0), map_state(s1), p, make_event(ns, e))
                n(s1)
            return

    n(start)
    return graph, map_state(start), map_state(end)


if __name__ == '__main__':
    import _0_re_model as rem
    import _1_NFAe_model as nfaem
    import _2_NNFA_model as nnfa
    import json
    import io

    m = rem.Model.load(json.load(io.open("./test cases/model(3).json", mode="r", encoding="utf-8-sig")))
    m = nfaem.Model.load(m)
    m = nnfa.Model.load(m)
    m = Model.load(m)
    print(m.graph)

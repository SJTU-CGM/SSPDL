"""
Simple Interval-Hook Finite Automaton
"""
from typing import Set

import _3_IHFA_model as ihfa
from graph import State
from pfsm import PFSM


class Model:
    def __init__(self, bgd, pwm_dict, graph: PFSM, start: State, ends: Set[State]):
        self.bgd = bgd
        self.pwm_dict = pwm_dict
        self.graph = graph
        self.start = start
        self.ends = ends

    @staticmethod
    def load(m: ihfa.Model):
        graph, start, ends = simplify(m.graph, m.start, m.end)
        return Model(m.bgd, m.pwm_dict, graph, start, ends)


def simplify(graph_0: PFSM, start_0, end_0):
    graph = PFSM()

    # h states enters with hooks, leave with interval
    # i states enters with intervals, leaves with hooks

    h_state_dict = dict()

    def map_h_state(s):
        if s not in h_state_dict.keys():
            h_state_dict[s] = graph.new_state()
        return h_state_dict[s]

    i_state_dict = dict()

    def map_i_state(s):
        if s not in i_state_dict.keys():
            i_state_dict[s] = graph.new_state()
        return i_state_dict[s]

    def get_hook_edges(s):
        for p, h, s1 in graph_0.out_edges(s):
            if isinstance(h, ihfa.Hook):
                yield p, h, s1

    ends = set()

    visited_h = set()

    def visit_h_state(s0, where):
        # print("visit h", s0)
        if s0 not in visited_h:
            visited_h.add(s0)
            for p, interval, s1 in get_interval_tracks(graph_0, s0, where):
                # print("track", s0, p, interval, s1)
                assert isinstance(interval, ihfa.Interval), interval
                if s1 == end_0:
                    ends.add(map_h_state(s0))
                if p > 0:
                    visit_i_state(s1)
                    if has_hook_outs[s1]:
                        graph.link(map_h_state(s0), map_i_state(s1), p, interval)

    visited_i = set()
    has_hook_outs = dict()

    def visit_i_state(s0):
        # print("visit i", s0)
        if s0 not in visited_i:
            visited_i.add(s0)
            edges = list(get_hook_edges(s0))
            has_hook_outs[s0] = len(edges) > 0
            for p, hook, s1 in edges:
                graph.link(map_i_state(s0), map_h_state(s1), p, hook)
                visit_h_state(s1, "PWM {}".format(hook.name))

    start = graph.new_state()
    for p, interval, s1 in get_interval_tracks(graph_0, start_0, "the beginning"):
        if s1 == end_0:
            ends.add(start)
        if p > 0:
            edges = list(get_hook_edges(s1))
            has_hook_outs[s1] = len(edges) > 0
            for p_1, hook, s2 in edges:
                graph.link(start, map_h_state(s2), p * p_1, hook)
                visit_h_state(s2, "the beginning")
    return graph, start, ends


def get_interval_tracks(graph, start, where):
    def get(s0, intervals, p):
        assert s0 not in intervals, "find an interval-only loop after {}.".format(where)
        for p_out, e, s1 in graph.out_edges(s0):
            if isinstance(e, ihfa.Interval):
                yield from get(s1, intervals + [e], p * p_out)
            elif isinstance(e, ihfa.Hook):
                pass
            else:
                assert False, e
        yield p, sum(intervals, ihfa.Interval(0, 0, [1])), s0

    yield from get(start, [], 1)


if __name__ == '__main__':
    import _0_re_model as rem
    import _1_NFAe_model as nfaem
    import _2_NNFA_model as nnfa
    import _3_IHFA_model as ihfa
    import json
    import io

    m = rem.Model.load(json.load(io.open("./test cases/model(11).json", mode="r", encoding="utf-8-sig")))
    m = nfaem.Model.load(m)
    m = nnfa.Model.load(m)
    m = ihfa.Model.load(m)
    m = Model.load(m)
    print(m.graph)
    print('start', m.start)
    print('ends', m.ends)

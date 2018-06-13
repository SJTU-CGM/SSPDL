"""
D for deterministic
"""
from typing import Set, Dict, Any, Tuple, List

import _4_SIHFA_model as sihfa
from graph import State
from pfsm import PFSM


class Model:
    def __init__(self, bgd, pwm_dict, graph: PFSM, start: State, ends: Set[State]):
        self.bgd = bgd
        self.pwm_dict = pwm_dict
        self.graph = graph
        self.start = start
        self.ends = ends
        return

    @staticmethod
    def load(m: sihfa.Model):
        graph, start, ends = determine(m.graph, m.start, m.ends)
        return Model(m.bgd, m.pwm_dict, graph, start, ends)


def determine(graph_0: PFSM, start_0, ends_0):
    graph = PFSM()

    state_dict = dict()

    def get_state(sd):
        name = repr(tuple(sorted(sd.items())))
        if name not in state_dict.keys():
            state_dict[name] = graph.new_state()
        return state_dict[name]

    ends = set()
    visited = set()

    def get_s_dict_id(sd):
        return repr(tuple(sorted(sd.items())))

    def d(sd0: Dict[State, float]):
        id = get_s_dict_id(sd0)
        if id not in visited:
            visited.add(id)

            if any(s in ends_0 for s in sd0.keys()):
                ends.add(get_state(sd0))

            Event = Any
            go: List[Tuple[float, Event, State]] = []
            for s0, p0 in sd0.items():
                for p1, e, s1 in graph_0.out_edges(s0):
                    go.append((p0 * p1, e, s1))

            event_dist, sd_dict = make_transition(go)
            for e, p in event_dist.items():
                graph.link(get_state(sd0), get_state(sd_dict[e]), p, e)
                d(sd_dict[e])
            return

    sd = {start_0: 1.0}
    d(sd)
    return graph, get_state(sd), ends


def make_transition(go):
    # build event distribution
    event_dist = {}
    for p, e, s in go:
        event_dist.setdefault(e, 0)
        event_dist[e] += p
    # build sd by event
    psd_dict = {}
    for p, e, s in go:
        psd_dict.setdefault(e, {})
        psd_dict[e].setdefault(s, 0)
        psd_dict[e][s] += p

    def normalize(psd):
        # psd = pseudo-state_dict
        s = sum(psd.values())
        return {k: v / s for k, v in psd.items()}

    sd_dict = {e: normalize(psd) for e, psd in psd_dict.items()}
    return event_dist, sd_dict


if __name__ == '__main__':
    import _0_re_model as rem
    import _1_NFAe_model as nfaem
    import _2_NNFA_model as nnfa
    import _3_IHFA_model as ihfa
    import _4_SIHFA_model as sihfa
    import json
    import io

    m = rem.Model.load(json.load(io.open("./test cases/model(3).json", mode="r", encoding="utf-8-sig")))
    m = nfaem.Model.load(m)
    m = nnfa.Model.load(m)
    m = ihfa.Model.load(m)
    m = sihfa.Model.load(m)
    m = Model.load(m)
    print(m.graph)
    print('start', m.start)
    print('ends', m.ends)

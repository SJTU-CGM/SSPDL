import _1_NFAe_model as nfaem
from graph import MultiGraph, State
from pfsm import PFSM


class Model:
    def __init__(self, bgd, ns, graph, start: State, end: State):
        self.bgd = bgd
        self.ns = ns
        self.graph = graph
        self.start = start
        self.end = end

    @staticmethod
    def load(m: nfaem.Model):
        graph, start, end = normalize(m.graph, m.start, m.end)
        return Model(m.bgd, m.ns, graph, start, end)


def normalize(g: MultiGraph, start, end):
    graph = PFSM()

    state_dict = dict()

    def map_state(s):
        if s not in state_dict.keys():
            state_dict[s] = graph.new_state()
        return state_dict[s]

    def make_p_and_e(label):
        if label is None:
            return 1, None
        elif isinstance(label, float):
            return label, None
        elif isinstance(label, str):
            return 1, label
        assert False

    visited = set()

    def n(s0):
        if s0 in visited:
            return
        else:
            visited.add(s0)
            for label, s1 in g.out_edges(s0):
                p, e = make_p_and_e(label)
                graph.link(map_state(s0), map_state(s1), p, e)
                n(s1)
            return

    n(start)
    return graph, map_state(start), map_state(end)


if __name__ == '__main__':
    import _0_re_model as rem
    import _1_NFAe_model as nfaem
    import json
    import io
    m = rem.Model.load(json.load(io.open("./test cases/model.json", mode="r", encoding="utf-8-sig")))
    m = nfaem.Model.load(m)
    m = Model.load(m)
    print(m.graph)

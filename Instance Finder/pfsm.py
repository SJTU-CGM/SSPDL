from graph import MultiGraph


class PFSM:
    """
    Probabilistic Finite-State Machine
    """

    def __init__(self):
        self._graph = MultiGraph()

    def get_states(self):
        return self._graph.get_states()

    def new_state(self):
        return self._graph.new_state()

    def link(self, s0, s1, p, e):
        self._graph.link(s0, s1, (p, e))
        return

    def out_edges(self, s):
        for lbl, s1 in self._graph.out_edges(s):
            p, e = lbl
            yield p, e, s1

    def __repr__(self):
        return self._graph.__repr__()
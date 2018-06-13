import _0_re_model as rem
from graph import State, MultiGraph


class Model:
    def __init__(self, bgd, ns, graph, start: State, end: State):
        self.bgd = bgd
        self.ns = ns
        self.graph = graph
        self.start = start
        self.end = end

    @staticmethod
    def load(m: rem.Model):
        graph, start, end = make_graph(m.root)
        return Model(m.bgd, m.ns, graph, start, end)


def make_graph(root):
    def t_mod(mod: rem.Module, s0: State, s1: State):
        # for item in mod:
        #     s = graph.new_state()
        #     t_item(item, s0, s)
        #     s0 = s
        # graph.link(s0, s1, None)
        if len(mod) == 0:
            graph.link(s0, s1, None)
            return
        else:
            for item in mod[:-1]:
                s = graph.new_state()
                t_item(item, s0, s)
                s0 = s
            t_item(mod[-1], s0, s1)
            return

    def t_item(item: rem.ModuleItem, s0: State, s1: State):
        if isinstance(item, rem.Alternation):
            # sa0, sa1, sd0, sd1 = [graph.new_state() for i in range(4)]
            # graph.link(s0, sa0, item.pfirst)
            # graph.link(s0, sd0, item.psecond)
            # graph.link(sa1, s1, None)
            # graph.link(sd1, s1, None)
            # t_mod(item.first, sa0, sa1)
            # t_mod(item.second, sd0, sd1)
            for p, m in item.get_branches():
                t0, t1 = graph.new_state(), graph.new_state()
                t_mod(m, t0, t1)
                graph.link(s0, t0, p)
                graph.link(t1, s1, None)
            return
        elif isinstance(item, rem.Repetition):
            s = graph.new_state()
            t_mod(item.body, s0, s)
            graph.link(s, s0, item.p)
            graph.link(s, s1, 1 - item.p)
            return
        elif isinstance(item, rem.Element):
            graph.link(s0, s1, item.name)
            return
        assert False

    graph = MultiGraph()
    start, end = graph.new_state(), graph.new_state()
    t_mod(root, start, end)
    return graph, start, end


if __name__ == "__main__":
    import json, io

    m = rem.Model.load(json.load(io.open("./test cases/model.json", mode="r", encoding="utf-8-sig")))
    m = Model.load(m)
    print(m.graph)

from typing import Dict, Set, Any, List, Tuple

State = int
Transition = Any


class Graph:
    def __init__(self):
        self._graph: Dict[State, Dict[Transition, State]] = dict()
        self._state_count = 0

    def new_state(self):
        self._state_count += 1
        self._graph[self._state_count] = dict()
        return self._state_count

    def link(self, s1, s2, t):
        self._graph[s1][t] = s2

    def out_edges(self, s: State):
        for t, s1 in self._graph[s].items():
            yield t, s1

    def __repr__(self):
        lines = []
        for s0, d in self._graph.items():
            for t, s1 in d.items():
                lines.append("{}--{}-->{}".format(s0, t, s1))
        return '\n'.join(lines)


class MultiGraph:
    def __init__(self):
        self._graph: Dict[State, List[Tuple[Transition, State]]] = {}
        self._state_count = 0


    def get_states(self):
        yield from range(self._state_count)

    def new_state(self):
        self._state_count += 1
        self._graph[self._state_count] = []
        return self._state_count

    def link(self, s1, s2, t):
        self._graph[s1].append((t, s2))

    def out_edges(self, s: State):
        for t, s1 in self._graph[s]:
            yield t, s1

    def get_labels(self, s: State):
        return { l for l,_ in self._graph[s] }

    def __repr__(self):
        lines = []
        for s0, edge in self._graph.items():
            for t, s1 in edge:
                lines.append("{}--{}-->{}".format(s0, t, s1))
        return '\n'.join(lines)

import math
from typing import List
from ghmm_scanner import HookMatch


class ModelMatch:
    def __init__(self, hm_list: List[HookMatch], score: float):
        self.matches = hm_list
        self.start = hm_list[0].start
        self.end = hm_list[-1].end
        self.score = score

    def __repr__(self):
        return "<score:{} ; items: {}>".format(self.score, ' '.join(map(repr, self.matches)))

    def __lt__(self, other):
        assert isinstance(other, ModelMatch)
        return self.start < other.start


class Logger:
    def __init__(self, size):
        if size == float('+inf'):
            self.should_cut = False
            self.size = None
        else:
            self.should_cut = True
            self.size = math.floor(size)
        self.adjust_point = 2 * size
        self.items: List[ModelMatch] = []

    def put(self, match: ModelMatch):
        self.items.append(match)
        if len(self.items) > self.adjust_point:
            self.adjust()

    def adjust(self):
        self.items.sort(key=lambda m: m.score, reverse=True)
        if self.should_cut:
            self.items[self.size:] = []

    def get_results(self):
        self.adjust()
        for match in self.items:
            yield match

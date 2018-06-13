from typing import Dict, List

Code = str
Prob = float
CodeDist = Dict[Code, Prob]

PWM = List[CodeDist]

Alphabet = List[Code]
Background = CodeDist

Sequence = str


class Distribution:
    def __init__(self, low, probs):
        self.low = low
        self.probs = tuple(probs)

    def __hash__(self):
        return hash((self.low, self.probs))

    def __repr__(self):
        return "[{},{}]".format(self.low, self.low + len(self.probs) - 1)

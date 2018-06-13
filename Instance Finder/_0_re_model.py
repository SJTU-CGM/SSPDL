from typing import Dict, List
from model import Background, Distribution


class Definition:
    pass


class Module(list):
    pass


Namespace = Dict[str, Definition]


class Model:
    def __init__(self, alphabet: List[str], bgd: Background, ns: Namespace, root: Module):
        self.alphabet = alphabet
        self.bgd = bgd
        self.ns = ns
        self.root = root

    @staticmethod
    def load(data):

        def load_ns(jn):

            def load_dist(jd):
                return Distribution(jd["from"], jd["probs"])

            def load_def(jd):
                if jd["kind"] == "motif":
                    return SimpleMotif(jd["matrix"])
                elif jd["kind"] == "g-motif":
                    return GeneralizedMotif(jd["matrix"], load_dist(jd["distribution"]))
                elif jd["kind"] == "spacer":
                    return Spacer(load_dist(jd["distribution"]))
                assert False, "bad element definition"

            ns = dict()
            for name, jdef in jn.items():
                ns[name] = load_def(jdef)
            return ns

        def load_module(jm):
            return Module([load_item(ji) for ji in jm])

        def load_item(ji):
            if ji["kind"] == "alternation":
                # return Alternation(ji["psubs"][0]["prob"],
                #                    load_module(ji["psubs"][0]["mod"]),
                #                    ji["psubs"][1]["prob"],
                #                    load_module(ji["psubs"][1]["mod"]))
                ps = []
                ms = []
                for x in ji['psubs']:
                    ps.append(x['prob'])
                    ms.append(load_module(x['mod']))
                return Alternation(ps, ms)
            elif ji["kind"] == "repetition":
                return Repetition(ji["prob"], load_module(ji["sub"]))
            elif ji["kind"] == "element":
                return Element(ji["name"])
            assert False, "bad module item"

        ns = load_ns(data["namespace"])
        root = load_module(data["root"])
        return Model(data["alphabet"], data["background"], ns, root)


PWM = List[Dict[str, float]]


class Motif(Definition):
    def __init__(self, pwm: PWM):
        super()
        self.pwm = pwm


class SimpleMotif(Motif):
    pass


class GeneralizedMotif(Motif):
    def __init__(self, pwm: PWM, dist: Distribution):
        super().__init__(pwm)
        self.dist = dist


class Spacer(Definition):
    def __init__(self, dist: Distribution):
        super()
        self.dist = dist


class ModuleItem:
    pass


# class Alternation(ModuleItem):
#     def __init__(self, pfirst: float, first: Module, psecond: float, second: Module):
#         super()
#         self.pfirst = pfirst
#         self.first = first
#         self.psecond = psecond
#         self.second = second


class Alternation(ModuleItem):
    def __init__(self, probabilities, modules):
        super().__init__()
        self.probabilities = probabilities
        self.modules = modules
        self.branch_count = len(probabilities)

    def get_branches(self):
        for p, m in zip(self.probabilities, self.modules):
            yield p, m


class Repetition(ModuleItem):
    def __init__(self, p: float, body: Module):
        super()
        self.p = p
        self.body = body


class Element(ModuleItem):
    def __init__(self, name: str):
        super()
        self.name = name


if __name__ == "__main__":
    import json, io

    m = Model.load(json.load(io.open("./model.json", mode="r", encoding="utf-8-sig")))
    print(m)

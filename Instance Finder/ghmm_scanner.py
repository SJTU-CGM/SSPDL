import sys
import time
from typing import List, Tuple, Dict

from _3_IHFA_model import Hook, SHook, GHook, Interval
from _5_D_model import Model
from graph import State
from model import Sequence
from pwm_scanner import scan_pwms


class PWMMatch:
    def __init__(self, name, start, end, score):
        self.name = name
        self.start = start
        self.end = end
        self.score = score

    def __repr__(self):
        return str((self.name, self.start, self.end, self.score))

    def __lt__(self, other):
        assert isinstance(other, PWMMatch)
        return self.start < other.start


def make_pv_dict(pwm_dict):
    d = {}
    for name in pwm_dict.keys():
        d[name] = 0.1
    return d


class HookMatch:
    def __init__(self, start, end, score, name):
        self.start, self.end = start, end
        self.score = score
        self.name = name


class SHookMatch(HookMatch):
    def __repr__(self):
        return "<{} {}:{}>".format(self.name, self.start, self.end)


class GHookMatch(HookMatch):
    def __init__(self, start, end, score, name, n_repeat):
        super().__init__(start, end, score, name)
        self.n_repeat = n_repeat

    def __repr__(self):
        return "<{}x{} {}:{}>".format(self.name, self.n_repeat, self.start, self.end)


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


def make_init_table(model):
    d = {}
    for pr, event, state, in model.graph.out_edges(model.start):
        assert isinstance(event, Hook)
        d[event.name] = (pr, event, state)
    return d


class Matcher:
    def __init__(self, state: State, end: int):
        self.state = state
        self.end = end

    def get_history(self):
        return []

    def get_score(self):
        # return sum(m.score for m in self.get_history())
        return 0

    @staticmethod
    def new(state: State, hook: Hook, pwm_match: PWMMatch):
        if isinstance(hook, SHook):
            match = SHookMatch(pwm_match.start, pwm_match.end, pwm_match.score, pwm_match.name)
            return SMatcher(state=state,
                            path=[match],
                            score=pwm_match.score)
        elif isinstance(hook, GHook):
            return GMatcher(state=state,
                            path=list(),
                            pwm_name=pwm_match.name,
                            pwm_matches=[pwm_match],
                            score=0)
        else:
            assert False

    def eat(self, state: State, hook: Hook, pwm_match: PWMMatch):
        if isinstance(hook, SHook):
            match = SHookMatch(pwm_match.start, pwm_match.end, pwm_match.score, pwm_match.name)
            return SMatcher(state=state,
                            path=self.get_history() + [match],
                            score=self.get_score() + pwm_match.score)
        elif isinstance(hook, GHook):
            return GMatcher(state=state,
                            path=self.get_history(),
                            pwm_name=pwm_match.name,
                            pwm_matches=[pwm_match],
                            score=self.get_score())
        else:
            assert False, hook


class SMatcher(Matcher):
    def __init__(self, state: State, path: List[HookMatch], score):
        super().__init__(state, path[-1].end)
        self.path = path
        self.score = score

    def get_history(self):
        return self.path

    def get_score(self):
        return self.score


class GMatcher(Matcher):
    def __init__(self, state: State, path: List[HookMatch], pwm_name: str, pwm_matches: List[PWMMatch], score: float):
        super().__init__(state, pwm_matches[-1].end)
        self.path = path
        self.pwm_name = pwm_name
        self.pwm_matches = pwm_matches
        self.score = score

    def get_history(self):
        match = GHookMatch(start=self.pwm_matches[0].start,
                           end=self.pwm_matches[-1].end,
                           score=sum(m.score for m in self.pwm_matches),
                           name=self.pwm_name,
                           n_repeat=len(self.pwm_matches))
        return self.path + [match]

    def get_score(self):
        return self.score + sum(m.score for m in self.pwm_matches)

    def extend(self, pwm_match: PWMMatch):
        return GMatcher(state=self.state,
                        path=self.path,
                        pwm_name=self.pwm_name,
                        pwm_matches=self.pwm_matches + [pwm_match],
                        score=self.score)


def get_init_matchers(init_table, pwm_match):
    if pwm_match.name in init_table.keys():
        pr, hook, state = init_table[pwm_match.name]
        yield Matcher.new(state, hook, pwm_match)


def get_pwm_matches(pwm_dict, pv_dict, bgd, sequence):
    for pwm_name, pwm_start, pwm_end, pwm_pv, pwm_score in scan_pwms(pwm_dict, pv_dict, bgd, sequence):
        yield PWMMatch(name=pwm_name, start=pwm_start, end=pwm_end, score=pwm_score)


def make_match_result(matcher: Matcher):
    return ModelMatch(list(matcher.get_history()), matcher.get_score())


def veterbi_filter(pool: List[Matcher]):
    d: Dict[int, Matcher] = {}
    for matcher in pool:
        k = matcher.state
        if k in d.keys():
            if d[k].get_score() < matcher.get_score():
                d[k] = matcher
        else:
            d[k] = matcher
    return list(d.values())


class ProgressPrinter:
    def __init__(self):
        self.message_length = 0
        self.last_time = time.clock()
        # self.last_time = float('+inf')

    def print(self, message):
        if time.clock() - self.last_time > 0.01:
            self.last_time = time.clock()

            bs = "\b" * self.message_length
            ws = " " * self.message_length
            print(bs + ws + bs + message, end="", file=sys.stderr)
            self.message_length = len(message)

    def clean(self):
        self.print("")


TransitionTable = Dict[State, Dict[Interval, Dict[str, Tuple[float, Hook, State]]]]


def make_transiton_table(model: Model):
    tab: List[Tuple[float, State, Interval, Hook, State]] = []

    g = model.graph

    def m_1(s: State):
        for pr, hk, t in g.out_edges(s):
            m_2(t)

    visited = set()

    def m_2(s1: State):
        if s1 in visited:
            return
        visited.add(s1)
        for pr_1, it, s2 in g.out_edges(s1):
            assert isinstance(it, Interval)
            for pr_2, hk, s3 in g.out_edges(s2):
                assert isinstance(hk, Hook)
                tab.append((pr_1 * pr_2, s1, it, hk, s3))
                m_2(s3)

    m_1(model.start)

    # tab to table
    table: TransitionTable = { s: dict() for s in visited }
    for pr, s, it, hk, t in tab:
        assert isinstance(it, Interval)
        assert isinstance(hk, Hook)
        table[s].setdefault(it, {})
        table[s][it][hk.name] = (pr, hk, t)
    return table


from logger import Logger


def print_comment(s):
    print("# " + s, file=sys.stderr)


def display_model(model: Model):
    print_comment("The graph of input model, each line corresponds to an edge")
    print_comment("<From>--(<Probability>, <Label>)--><To>")
    print_comment("Labels displayed as '[<X>, <Y>]' is a spacer whose length ranges between X and Y.")
    print_comment("Labels displayed as '<<S>>' is a PWM whose name is S.")
    print(model.graph, file=sys.stderr)
    print(file=sys.stderr)


def scan_model(model: Model, pv_dict, top: float, sequence: Sequence):
    # import time
    printer = ProgressPrinter()

    display_model(model)

    pool: List[Matcher] = []
    logger = Logger(top)
    init_table = make_init_table(model)
    alive_table = make_alive_table(model)
    transition_table = make_transiton_table(model)

    for pwm_match in get_pwm_matches(model.pwm_dict, pv_dict, model.bgd, sequence):
        new_pool = []
        for matcher in get_init_matchers(init_table, pwm_match):
            new_pool.append(matcher)
        for matcher in get_child_matchers(pool, pwm_match, transition_table):
            new_pool.append(matcher)
        # filter
        new_pool = veterbi_filter(new_pool)
        # log newly generated matchers
        for matcher in new_pool:
            if matcher.state in model.ends:
                logger.put(make_match_result(matcher))
        # add alive old matchers to new pool
        for matcher in get_alive_matchers(alive_table, pool, pwm_match):
            new_pool.append(matcher)
        pool = new_pool
        assert len(pool) < 10000, "out of memory, scan to {} so far.".format(pwm_match.start)
        # display progress
        import statistics
        progress = f"Scanned {pwm_match.start: 6}/{len(sequence): 6} nt"
        stat_count = f"# of ongoing matcher: {len(pool):3}"
        printer.print(f"{progress}; {stat_count};")
    printer.print("Preparing the match result.")
    printer.clean()
    yield from logger.get_results()


def make_alive_table(model: Model):
    d = {}
    g = model.graph

    def m1(s):
        for pr, hook, t in g.out_edges(s):
            m2(t)

    def m2(s):
        if s not in d.keys():
            high = 0
            ts = set()
            for pr, itvl, t in g.out_edges(s):
                high = max(high, itvl.high)
                ts.add(t)
            d[s] = high
            for t in ts:
                m1(t)

    m1(model.start)
    return d


def get_alive_matchers(alive_table, pool: List[Matcher], pwm_match: PWMMatch):
    for matcher in pool:
        distance = pwm_match.start - matcher.end
        if distance <= alive_table[matcher.state]:
            yield matcher


def get_child_matchers(pool, pwm_match, transition_table: TransitionTable):
    for matcher in pool:
        if isinstance(matcher, SMatcher):
            yield from get_normal_child_matchers(matcher, pwm_match, transition_table)
        elif isinstance(matcher, GMatcher):
            yield from get_normal_child_matchers(matcher, pwm_match, transition_table)
            yield from get_gmatcher_specific_child(matcher, pwm_match)
        else:
            assert False, matcher


def get_gmatcher_specific_child(matcher: GMatcher, pwm_match):
    if pwm_match.name == matcher.pwm_name and pwm_match.start == matcher.pwm_matches[-1].end:
        yield matcher.extend(pwm_match)


def get_normal_child_matchers(matcher: Matcher, pwm_match: PWMMatch, transition_table: TransitionTable):
    distance = pwm_match.start - matcher.end
    for itvl, d in transition_table[matcher.state].items():
        if itvl.includes(distance):
            if pwm_match.name in d.keys():
                pr, hook, state = d[pwm_match.name]
                yield matcher.eat(state, hook, pwm_match)


# test
if __name__ == "__main__":
    import _0_re_model as rem
    import _1_NFAe_model as nfaem
    import _2_NNFA_model as nnfa
    import _3_IHFA_model as ihfa
    import _4_SIHFA_model as sihfa
    import _5_D_model as dm
    import json
    import io

    m = rem.Model.load(json.load(io.open("./E. coli/test_rbs_orf/no-stop_model.json", mode="r", encoding="utf-8-sig")))
    m = nfaem.Model.load(m)
    m = nnfa.Model.load(m)
    m = ihfa.Model.load(m)
    m = sihfa.Model.load(m)
    print("after")
    print(m.graph)
    print(m.ends)
    print()
    m = dm.Model.load(m)
    m = Model.load(m)
    print("after")
    print(m.graph)
    print(m.ends)
    print()

    # sequence = "GAACGTCCCTGCCGTAAAAAATTATTGTTTTTATAGG"
    sequence = "AAAATATACCCCGCGCGTTTT"
    # for name, location, p_value in scan_pwms(model.motif_dict, pv_dict, model.background, sequence):
    #     # print(name, location, p_value)
    #     pass
    for x in (scan_model(m, make_pv_dict(m.pwm_dict), float('3'), sequence)):
        print("result", x)

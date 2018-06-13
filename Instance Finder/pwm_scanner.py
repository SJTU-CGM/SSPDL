from typing import Dict

from pwm import PWM, Background, Sequence, pwm_to_pssm, make_score, make_score_dist, make_score2p_value

PValue = float


def make_pssm_dict(bgd: Background, pwm_dict: Dict[str, PWM]):
    d = {}
    for name, pwm in pwm_dict.items():
        d[name] = pwm_to_pssm(bgd, pwm)
    return d


def make_s2pv_dict(bgd: Background, pssm_dict, pv_dict):
    d = {}
    for name, pssm in pssm_dict.items():
        score_dist = make_score_dist(bgd, pssm)
        s2pv = make_score2p_value(score_dist, pv_dict[name])
        if len(s2pv) == 0:
            raise AssertionError(
                f'The given alpha for pwm `{name}` is too restricted ({pv_dict[name]}). Please use an alpha value not '
                f'less than `{list(score_dist.values())[0]}`.')
        else:
            d[name] = s2pv
    return d


def make_char_stream(s):
    for c in s:
        yield c


def make_window_stream(char_stream, window_size):
    buffer = ""
    for i in range(window_size):
        buffer += next(char_stream)
    yield buffer
    for c in char_stream:
        buffer = buffer[1:] + c
        yield buffer


def read_sequence_windows_1(sequence, window_size):
    i = 0
    for win in make_window_stream(make_char_stream(sequence), window_size):
        yield i, win
        i += 1


def read_sequence_windows_2(sequence, window_size):
    import array
    sequence = array.array('u', str(sequence))
    for i in range(len(sequence)):
        yield i, sequence[i:i+window_size].tounicode()


def read_sequence_windows(sequence, window_size):
    for i in range(len(sequence)):
        yield i, sequence[i:i+window_size]


def scan_pwms(pwm_dict: Dict[str, PWM], pv_dict: Dict[str, PValue], bgd: Background, seq: Sequence):
    pssm_dict = make_pssm_dict(bgd, pwm_dict)
    s2pv_dict = make_s2pv_dict(bgd, pssm_dict, pv_dict)
    score_dict = {k: min(s2pv.keys()) for k, s2pv in s2pv_dict.items()}
    for i, window in read_sequence_windows(seq, max(map(len, pssm_dict.values()))):
        for name, pssm in pssm_dict.items():
            j = i + len(pssm)
            # seq_piece = window[:len(pssm)]
            piece = window
            if len(piece) >= len(pssm):
                score = make_score(pssm, piece)
                if score >= score_dict[name]:
                    try:
                        yield name, i, j, s2pv_dict[name][score], score
                    except KeyError:
                        import json
                        print(json.dumps(s2pv_dict, indent=4))
                        print(name, score)
                        exit(-1)


def scan_pwms_backup(pwm_dict: Dict[str, PWM], pv_dict: Dict[str, PValue], bgd: Background, seq: Sequence):
    pssm_dict = make_pssm_dict(bgd, pwm_dict)
    s2pv_dict = make_s2pv_dict(bgd, pssm_dict, pv_dict)
    score_dict = {k: min(s2pv.keys()) for k, s2pv in s2pv_dict.items()}
    for i in range(len(seq)):
        for name, pssm in pssm_dict.items():
            seq_piece = seq[i:i + len(pssm)]
            if len(seq_piece) == len(pssm):
                score = make_score(pssm, seq_piece)
                if score >= score_dict[name]:
                    try:
                        yield name, i, i + len(pssm), s2pv_dict[name][score], score
                    except KeyError:
                        import json
                        print(json.dumps(s2pv_dict, indent=4))
                        print(name, score)
                        exit(-1)


def scan_pwms_SBS(pwm_dict: Dict[str, PWM], pv_dict: Dict[str, PValue], bgd: Background, seq: Sequence):
    # SBS = step-by-step
    pssm_dict = make_pssm_dict(bgd, pwm_dict)
    s2pv_dict = make_s2pv_dict(bgd, pssm_dict, pv_dict)

    def scan(sequence):

        def scan_one(i, s):
            d = {}
            for nm, pssm in pssm_dict.items():
                piece = s[i:i + len(pssm)]
                if len(piece) == len(pssm):
                    score = make_score(pssm, piece)
                    p_value = s2pv_dict[name].get(score, None)
                    if p_value is not None:
                        d[name] = (i, i + len(pssm), p_value, score)
            return d

        for i in range(len(sequence)):
            yield scan_one(i, sequence)

    yield from scan(seq)


if __name__ == "__main__":
    background = {
        "A": 0.25,
        "C": 0.25,
        "G": 0.25,
        "T": 0.25
    }
    # Position-specific Distribution Matrix
    psdm = [
        {'A': 0.1, 'C': 0.1, 'G': 0.1, 'T': 0.7},
        {'A': 0.7, 'C': 0.1, 'G': 0.1, 'T': 0.1},
        {'A': 0.1, 'C': 0.1, 'G': 0.1, 'T': 0.7},
        {'A': 0.7, 'C': 0.1, 'G': 0.1, 'T': 0.1}
    ]
    seq = "GAACGTCCCTGCCGTATTATTGTTTTTATAGG"
    for name, loc, end, p_value, score in scan_pwms({'TATA': psdm}, {'TATA': 0.1}, background, seq):
        print(name, loc, p_value)
        print(seq[loc:loc + 4])

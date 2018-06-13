#!/usr/bin/env python


import json

from _5_D_model import Model
from ghmm_scanner import scan_model, PWMMatch, ModelMatch, HookMatch


class AppParameter:
    def __init__(self, model_path, alpha_path, alpha, top, pwm, fasta_paths):
        self.model_path = model_path
        self.alpha_path = alpha_path
        self.alpha = alpha
        self.top = top
        self.pwm = pwm
        self.fasta_paths = fasta_paths


def get_args():
    import argparse
    parser = argparse.ArgumentParser(description="Search for model instances in given sequence file.")
    parser.add_argument('--model_path', required=True)
    parser.add_argument('--alpha_path', required=False)
    parser.add_argument('--alpha', type=float, default=0.05)
    parser.add_argument('--top', required=True, type=float, default=float('+inf'))
    parser.add_argument('--pwm', action='store_true')
    parser.add_argument('fasta_paths', metavar="FILE", nargs='+')
    args = parser.parse_args()
    try:
        return AppParameter(model_path=args.model_path,
                            alpha_path=args.alpha_path,
                            alpha=args.alpha,
                            top=args.top,
                            pwm=args.pwm,
                            fasta_paths=args.fasta_paths)
    except FileNotFoundError as e:
        import sys
        print("Invalid file path: {}".format(e.filename), file=sys.stderr)
        print("Error message:", e.strerror, file=sys.stderr)
        exit(-1)


def get_model(path):
    import _0_re_model as rem
    import _1_NFAe_model as nfaem
    import _2_NNFA_model as nnfa
    import _3_IHFA_model as ihfa
    import _4_SIHFA_model as sihfa
    import json
    import io

    m = rem.Model.load(json.load(io.open(path, mode="r", encoding="utf-8-sig")))
    m = nfaem.Model.load(m)
    m = nnfa.Model.load(m)
    m = ihfa.Model.load(m)
    m = sihfa.Model.load(m)
    m = Model.load(m)
    return m


def get_alpha_dict(pwm_names, alpha_path, alpha):
    d = {}
    default: dict = json.load(open(alpha_path, 'r')) if alpha_path else {}
    for name in pwm_names:
        if name in default.keys():
            d[name] = default[name]
        else:
            d[name] = alpha
    return d


def read_fasta_sequences(path):
    from Bio import SeqIO
    for record in SeqIO.parse(path, format='fasta'):
        yield "{}(+)".format(record.id), record.seq
        # yield "{}(-)".format(record.id), record.seq.reverse_complement()


def print_match(id, match: ModelMatch, seq):
    import json
    assert isinstance(match, ModelMatch)
    hooks = []
    for hook_match in match.matches:
        assert isinstance(hook_match, HookMatch)
        hooks.append({"name": hook_match.name, "start": hook_match.start, "end": hook_match.end})
        # hooks.append({"name": hook_match.name, "start": hook_match.start, "end": hook_match.end, "seq": str(seq[hook_match.start:hook_match.end]) })
    data = {"sequence": id, "elements": hooks}
    print(json.dumps(data))


def main():
    para = get_args()
    model = get_model(para.model_path)
    alpha = get_alpha_dict(model.pwm_dict.keys(), para.alpha_path, para.alpha)
    if para.pwm:
        scan = scan_pwm_matches
    else:
        scan = scan_model_matches
    for path in para.fasta_paths:
        for id, seq in read_fasta_sequences(path):
            scan(model, alpha, para.top, id, seq)


def scan_model_matches(model, alpha, top, id, seq):
    for match in scan_model(model, alpha, top, seq):
        print_match(id, match, seq)
    return


def scan_pwm_matches(model, pv_dict, top, id, seq):
    from pwm_scanner import scan_pwms
    print('name', 'start', 'end', 'p-value', 'score', sep=',')
    for pwm_name, pwm_start, pwm_end, pwm_pv, pwm_score in scan_pwms(model.pwm_dict, pv_dict, model.bgd, seq):
        print(pwm_name, pwm_start, pwm_end, pwm_pv, pwm_score, sep=',')


main()

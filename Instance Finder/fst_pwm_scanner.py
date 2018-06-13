"""
FST = FaSTer

A context sensitive pwm scanner
"""

from pwm import make_score
from pwm_scanner import make_s2pv_dict, make_pssm_dict


class SequenceReader:
    def __init__(self, sequence):
        self.sequence = sequence
        self.position = 0

    def peak_string(self, length):
        return self.sequence[self.position:self.position + length]

    def at_end(self):
        return self.position >= len(self.sequence)

    def forward(self, d=1):
        self.position += d


class PWMScannerConf:
    def __init__(self, pssm_dict, s2pv_dict, pv_dict):
        self.pssm_dict = pssm_dict
        self.s2pv_dict = s2pv_dict
        self.pv_dict = pv_dict

    @staticmethod
    def build(bgd, pwm_dict, pv_dict):
        pssm_dict = make_pssm_dict(bgd, pwm_dict)
        s2pv_dict = make_s2pv_dict(bgd, pssm_dict, pv_dict)
        return PWMScannerConf(pssm_dict, s2pv_dict, pv_dict)


def scan_pwm(reader: SequenceReader, names, pssm_dict, s2pv_dict, pv_dict):
    for nm in names:
        pssm = pssm_dict[nm]
        piece = reader.peak_string(len(pssm))
        if len(piece) == len(pssm):
            score = make_score(pssm, piece)
            p_value = s2pv_dict[nm][score]
            if p_value <= pv_dict[nm]:
                yield nm, p_value, score

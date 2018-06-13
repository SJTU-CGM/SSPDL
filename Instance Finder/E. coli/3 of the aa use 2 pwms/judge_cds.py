#!/usr/bin/env python
import sys


def load_test(path):
    import csv
    return { (int(s), int(e)) for s,e in list(csv.reader(open(path)))[1:] }


def main(standard, test):
    standard = load_test(standard)
    test = load_test(test)
    
    true_positive = standard.intersection(test)
    false_position = test.difference(standard)
    false_negative = standard.difference(test)
    
    print("TP", len(true_positive))
    print("FP", len(false_position), "of", len(test))
    print("FN", len(false_negative), "of", len(standard))
    
    print()
    
    gk = lambda x: x[0]
    
    print("Some FP")
    for s,e in list(sorted(list(false_position), key=gk))[:10]:
        print(s,e)
    
    print()
    print("Some FN")
    for s,e in list(sorted(list(false_negative), key=gk))[:10]:
        print(s,e)


if __name__ == '__main__':
    main(*sys.argv[1:3])

#!/usr/bin/env python
import sys

def load_standard(path):
    import csv
    ans = set()
    rows = list(csv.reader(open(path)))[1:]
    for start, end in rows:
        ans.add((start, end))
    return ans


def load_test(path):
    import csv
    ans = list()
    rows = list(csv.reader(open(path)))[1:]
    for start, end in rows:
        ans.append((start, end))
    return ans

def main(standard, test):
    standard = load_standard(standard)
    test = load_test(test)

    success_count = 0
    index = 0
    for start, end in test:
        if (start,end) in standard:
            success_count += 1
            print("success", index)
        index += 1
    print("total", success_count)


if __name__ == '__main__':
    main(*sys.argv[1:3])

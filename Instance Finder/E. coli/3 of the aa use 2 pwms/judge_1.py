#!/usr/bin/python


import sys
import csv


def load_test(path):
    return { (int(s), int(e)) for s,e in list(csv.reader(open(path)))[1:] }


def main(standard, test, out):
    standard = load_test(standard)
    writer = csv.writer(open(out, 'x'))
    writer.writerow(['start', 'end', 't'])
    for start_str, end_str in list(csv.reader(open(test)))[1:]:
        start, end = int(start_str), int(end_str)
        if (start, end) in standard:
            flag = 1;
        else:
            flag = 0;
        writer.writerow([start, end, flag])


if __name__ == '__main__':
    main(*sys.argv[1:4])

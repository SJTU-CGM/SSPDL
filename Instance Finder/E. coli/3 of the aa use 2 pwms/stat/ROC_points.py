import csv
import sys


def load_inputs(ifile):
    return list(map(lambda x: tuple(map(int, x)),
                    list(csv.reader(open(ifile)))[1:]))


def thresholds_of(inputs):
    return range(10, len(inputs) + 10, 10)


def make_writer(ofile):
    wtr = csv.writer(open(ofile, 'x'))
    wtr.writerow(['FDR', 'TPR'])
    return wtr


def points_of(inputs, th):
    inputs = inputs[:th]
    tp_count = sum(map(lambda x: x[2], inputs[:th]))
    tpr = tp_count / 2108
    fdr = (len(inputs) - tp_count) / len(inputs)
    return fdr, tpr


def main(ifile, ofile):
    inputs = load_inputs(ifile)
    writer = make_writer(ofile)
    for th in thresholds_of(inputs):
        writer.writerow(points_of(inputs, th))


main(sys.argv[1], sys.argv[2]) 

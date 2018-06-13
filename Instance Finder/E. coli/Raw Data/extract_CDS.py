#!/usr/bin/env python

import json
import csv
import sys


if len(sys.argv) == 1:
    ifile = sys.stdin
    ofile = sys.stdout
else:
    ipath, opath = sys.argv[1:3]
    ifile = open(ipath)
    ofile = open(opath, 'w')

writer = csv.writer(ofile)

writer.writerow(['start','end'])
for line in ifile.readlines():
    data = json.loads(line)
    start = data['elements'][1]['start']
    end = data['elements'][-1]['end']
    writer.writerow([start,end])

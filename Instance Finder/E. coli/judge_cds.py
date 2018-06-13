import sys


my_result, standard = sys.argv[1:3]


def load_my_result(path):

    def load_line(line):
        import json
        data = json.loads(line)
        start = end = None
        for elem in data["elements"]:
            if elem["name"] == 'ORF (1)':
                start = elem["start"]
            elif elem["name"] == 'ORF (3)':
                end = elem["end"]
        assert isinstance(start, int)
        assert isinstance(end, int)
        return start, end

    fl = open(path)
    ans = set()
    for line in fl.readlines():
        start, end = load_line(line)
        ans.add((start, end))
    return ans


def load_standard(path):
    import json
    ans = set()
    for rec in json.load(open(path)):
        ans.add((rec["start"], rec["end"]))
        # ans.add(rec["end"])
    return ans


my_result = load_my_result(my_result)
standard = load_standard(standard)


def print_ans(ans):
    print("start", 'end')
    for start, end in ans:
        print('{},{}'.format(start,end))
    return


def compare(ans1, ans2):
    print("size#1:", len(ans1))
    print("size#2:", len(ans2))
    print("size intersect:", len(ans1.intersection(ans2)))
    print_ans(ans1.intersection(ans2))


compare(my_result, standard)

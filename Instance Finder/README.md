# Instance Finder

Given a sequence file and a model file, find matches of model.

## Usage

```
./main.py -h
usage: main.py [-h] [--top TOP] [--alpha ALPHA] [--pwm]
               [--alpha_path ALPHA_PATH]
               MODEL_PATH SEQUENCE_PATH [SEQUENCE_PATH ...]

Search for model instances in given sequence file.

positional arguments:
  MODEL_PATH            path to the model file
  SEQUENCE_PATH         where to find the model instances

optional arguments:
  -h, --help            show this help message and exit
  --top TOP             (default: '+inf') only output the top X model
                        instances, sorted by their scores
  --alpha ALPHA         (default: 0.05) alpha value for a sequence to be
                        viewed as a true pwm match
  --pwm                 (advanced) just find and print instances of involved
                        pwm(s)
  --alpha_path ALPHA_PATH
                        (advanced) path to a file specifying alpha value(s)
```

# Prerequisites

Biopython

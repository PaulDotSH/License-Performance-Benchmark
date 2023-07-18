import sys
import random
import string

if len(sys.argv) < 2:
    print("Please provide the number of lines to generate.")
    sys.exit(1)

try:
    num_lines = int(sys.argv[1])
except ValueError:
    print("Invalid number of lines.")
    sys.exit(1)

strings = [''.join(random.choice(string.ascii_letters) for _ in range(256)) for _ in range(num_lines)]

with open('output.txt', 'w') as f:
    for i, s in enumerate(strings):
        f.write(f'{s} # Line {i+1}\n')

print(f'{num_lines} lines of code generated.')

# TODO: RIR

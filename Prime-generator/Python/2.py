import sys
import time
from math import sqrt


def is_prime(n):
    for i in range(2, int(sqrt(n))):
        if n % i == 0:
            return False
    return True



start = time.time_ns()
primes = []
for i in range(2, int(sys.argv[1])):
    if is_prime(i):
        primes.append(i)
duration = time.time_ns() - start
print(f"Execution time: {duration} ns")

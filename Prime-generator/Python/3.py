import sys
import time
from math import sqrt


def is_prime(n):
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(sqrt(n)), 2):
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
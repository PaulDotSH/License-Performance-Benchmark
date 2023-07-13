import sys
import time

def is_prime(n):
    prime = True
    for i in range(2, n - 1):
        if n % i == 0:
            prime = False
    return prime


start = time.time_ns()
primes = []
for i in range(2, int(sys.argv[1])):
    if is_prime(i):
        primes.append(i)
duration = time.time_ns() - start
print(f"Execution time: {duration} ns")


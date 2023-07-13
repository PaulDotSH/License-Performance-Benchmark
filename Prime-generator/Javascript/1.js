function is_prime(n) {
    let prime = true
    for (let i=2; i<n-1; i++) {
        if (n % i == 0)
            prime = false
    }
    return prime
}

const start = process.hrtime.bigint();
const primes = [];
for (let i=2; i<process.argv[2]; i++) {
    if (is_prime(i)) {
        primes.push(i)
    }
}
const end = process.hrtime.bigint();
const duration = end - start;
console.log(`Execution time: ${duration} ns`);

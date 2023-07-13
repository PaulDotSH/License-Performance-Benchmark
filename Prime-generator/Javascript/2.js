function is_prime(n) {
    for (let i=2; i<Math.sqrt(n); i++) {
        if (n % i == 0)
            return false
    }
    return true
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


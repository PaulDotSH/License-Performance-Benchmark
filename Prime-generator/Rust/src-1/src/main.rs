use std::env::args;
use std::time::Instant;

fn is_prime(number: u32) -> bool {
    let mut prime = true;
    for i in 2..number {
        if number % i == 0 {
            prime = false;
        }
    }
    prime
}

fn main() {
    let end = str::parse(&args().nth(1).unwrap()).unwrap();

    let start = Instant::now();
    let mut primes = Vec::new();
    for i in 2..end {
        if is_prime(i) {
            primes.push(i);
        }
    }
    let duration = start.elapsed();
    let ns = duration.as_nanos();
    println!("Execution time: {} ns", ns);
}

use std::env::args;
use std::time::Instant;

fn is_prime(number: u32) -> bool {
    for i in 2..((number as f32).sqrt() as u32) {
        if number % i == 0 {
            return false
        }
    }
    true
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

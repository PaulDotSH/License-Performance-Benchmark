use std::env::args;
use std::time::Instant;

fn is_prime(number: u32) -> bool {
    if number == 2 {
        return true
    }

    if number % 2 == 0 {
        return false;
    }

    let end = (number as f32).sqrt() as u32;
    for i in (3..end).step_by(2) {
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

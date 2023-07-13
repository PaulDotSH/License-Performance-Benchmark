use std::{fs, time::Instant};
use simd_json::{BorrowedValue, ValueAccess};

fn quick_sort(arr: &mut [usize]) {
    if arr.len() <= 1 {
        return;
    }

    let pivot = arr[arr.len() - 1];
    let mut i = 0;
    for j in 0..arr.len() - 1 {
        if arr[j] <= pivot {
            arr.swap(i, j);
            i += 1;
        }
    }

    arr.swap(i, arr.len() - 1);

    quick_sort(&mut arr[0..i]);
    quick_sort(&mut arr[i + 1..]);
}

fn main() {
    let mut array = fs::read("../../data.json").unwrap();

    let json: BorrowedValue = simd_json::from_slice(&mut array).expect("Failed to parse JSON");

    let mut array = json.as_array()
        .map(|arr| {
            arr.iter()
                .filter_map(BorrowedValue::as_usize)
                .collect::<Vec<usize>>()
        })
        .unwrap_or_else(Vec::new);

    
    let start = Instant::now();
    quick_sort(&mut array);
    let duration = start.elapsed();
    let ns = duration.as_nanos();
    println!("Execution time: {} ns", ns);
}

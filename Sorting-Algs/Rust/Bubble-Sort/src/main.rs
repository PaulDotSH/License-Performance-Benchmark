use std::{fs, time::Instant};
use simd_json::{BorrowedValue, ValueAccess};

fn bubble_sort(array: &mut Vec<usize>) {
    let len = array.len();
    for i in 0..len-1 {
        for j in 0..len-i-1 {
            if array[j] > array[j+1] {
                array.swap(j, j + 1);
            }
        }
    }
}

fn main() {
    let mut array = fs::read("../../data.json").unwrap();

    // Parse the JSON into BorrowedValue
    let json: BorrowedValue = simd_json::from_slice(&mut array).expect("Failed to parse JSON");

    // Deserialize JSON into Vec<usize>
    let mut array = json.as_array()
        .map(|arr| {
            arr.iter()
                .filter_map(BorrowedValue::as_usize)
                .collect::<Vec<usize>>()
        })
        .unwrap_or_else(Vec::new);

    
    let start = Instant::now();
    bubble_sort(&mut array);
    let duration = start.elapsed();
    let ns = duration.as_nanos();
    println!("Execution time: {} ns", ns);
}

use std::{fs, time::Instant};
use simd_json::{BorrowedValue, ValueAccess};


fn insertion_sort(arr: &mut Vec<usize>) {
    for i in 1..arr.len() {
        let key = arr[i];
        let mut j = i as i32 - 1;

        while j >= 0 && arr[j as usize] > key {
            arr[(j + 1) as usize] = arr[j as usize];
            j -= 1;
        }

        arr[(j + 1) as usize] = key;
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
    insertion_sort(&mut array);
    let duration = start.elapsed();
    let ns = duration.as_nanos();
    println!("Execution time: {} ns", ns);
}

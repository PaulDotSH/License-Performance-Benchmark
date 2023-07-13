use std::{env, fs};
use std::io::Cursor;
use simd_json::to_writer;
use rand::Rng;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        eprintln!("You must provide the array size");
        return;
    }

    if args[1].to_lowercase() == "help" {
        println!("Usage: generate SIZE [file_name]");
        return;
    }

    let size = args[1].parse::<usize>().expect(&format!("You must input a valid number in the range of {} -> {}", usize::MIN, usize::MAX));

    let ostr = &"output.json".to_string();
    let output_file = args.get(2).unwrap_or(ostr);


    let mut array: Vec<usize> = Vec::with_capacity(size);

    let mut rng = rand::thread_rng();
    for _ in 0..size {
            array.push(rng.gen());
    }

    let mut writer = Cursor::new(Vec::new());


    if let Err(err) = to_writer(&mut writer, &array) {
        eprintln!("Failed to serialize the array: {}", err);
        return;
    }

    let serialized_data = writer.into_inner();
    // let serialized_string = String::from_utf8_lossy(&serialized_data);

    fs::write(output_file, serialized_data).unwrap();
}

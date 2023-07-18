use std::env;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

fn split(file_path: &str, output_dir: &str, max_file_size: usize) {
    let input_file_path = Path::new(file_path);
    let file_name = input_file_path.file_name().unwrap().to_str().unwrap();

    let mut file = File::open(&input_file_path).expect("No such file or directory");
    let mut input_bytes = Vec::new();
    file.read_to_end(&mut input_bytes).expect("Failed to read the file");

    let mut current_byte_count = 0;
    let mut files_written = 0;
    let mut last_stop = 0;
    for (index, &byte) in input_bytes.iter().enumerate() {
        current_byte_count += 1;
        if byte == b'\n' && current_byte_count > max_file_size {
            write_to_file(&format!("{}/{}_{}.txt", output_dir, file_name, files_written), 
                          &input_bytes[last_stop..=index]);
            last_stop = index + 1;
            current_byte_count = 0;
            files_written += 1;
        }
        if current_byte_count >= max_file_size {
            write_to_file(&format!("{}/{}_{}.txt", output_dir, file_name, files_written), 
                          &input_bytes[last_stop..index]);
            last_stop = index;
            current_byte_count = 0;
            files_written += 1;
        }
    }
    if last_stop < input_bytes.len() {
        write_to_file(&format!("{}/{}_{}.txt", output_dir, file_name, files_written), 
                      &input_bytes[last_stop..]);
    }
}

fn write_to_file(file_name: &str, bytes: &[u8]) {
    let mut file = File::create(file_name).expect("Failed to create file");
    file.write_all(bytes).expect("Failed to write to file");
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 3 {
        eprintln!("Please provide the input file name or file path and maximum file size.");
        std::process::exit(1);
    }

    let file_path = &args[1];
    let max_file_size: usize = args[2].parse().expect("Please provide a valid number for maximum file size");
    let output_dir = "/tmp";

    split(file_path, output_dir, max_file_size);
}

use std::env;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

const CHUNK_SIZE: usize = 4096;

fn split(file_path: &str, output_dir: &str, max_file_size: usize) {
    let input_file_path = Path::new(file_path);
    let file_name = input_file_path.file_name().unwrap().to_str().unwrap();

    let mut file = File::open(&input_file_path).expect("No such file or directory");

    let mut files_written = 0;
    let mut current_file_size = 0;
    let mut buffer = Vec::new();
    let mut chunk = vec![0; CHUNK_SIZE];

    loop {
        let bytes_read = file.read(&mut chunk).expect("Failed to read the file");

        if bytes_read == 0 {
            // Reached the end of the file
            break;
        }

        buffer.extend_from_slice(&chunk[..bytes_read]);
        current_file_size += bytes_read;

        if current_file_size > max_file_size {
            // Split the buffer if the maximum file size is exceeded
            if let Some(last_newline_index) = buffer.iter().rposition(|&b| b == b'\n') {
                let split_buffer = buffer.split_off(last_newline_index + 1);

                // Write the buffer to a new file
                write_to_file(&format!("{}/{}_{}.txt", output_dir, file_name, files_written), &buffer);

                // Prepare for the next file
                buffer = split_buffer;
                files_written += 1;
                current_file_size = buffer.len();
            }
        }

        if current_file_size > 0 {
            // Write the remaining buffer to the current file
            write_to_file(&format!("{}/{}_{}.txt", output_dir, file_name, files_written), &buffer);

            current_file_size = buffer.len();
        }
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

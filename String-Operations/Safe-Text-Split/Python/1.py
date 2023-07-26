import sys
import os
import time

output_dir = '/tmp'

def split(file_path, output_dir, max_file_size):
    with open(file_path, "rb") as file:
        input_bytes = file.read()

    file_name = os.path.basename(file_path)

    current_byte_count = 0
    files_written = 0
    last_stop = 0
    for index, byte in enumerate(input_bytes):
        current_byte_count += 1
        if byte == ord('\n'):
            if current_byte_count > max_file_size:
                open(f'{output_dir}/{file_name}_{files_written}.txt', "wb").write(input_bytes[last_stop:index+1])
                last_stop = index + 1
                current_byte_count = 0
                files_written += 1
        if current_byte_count >= max_file_size:
            open(f'{output_dir}/{file_name}_{files_written}.txt', "wb").write(input_bytes[last_stop:index])
            last_stop = index
            current_byte_count = 0
            files_written += 1

    # Write the remaining bytes to the last file
    if last_stop < len(input_bytes):
        open(f'{output_dir}/{file_name}_{files_written}.txt', "wb").write(input_bytes[last_stop:])

if len(sys.argv) < 3:
    print("Please provide the input file name or file path and maximum file size.")
    sys.exit(1)

file_path = sys.argv[1]
max_file_size = int(sys.argv[2])

start = time.time_ns()
split(file_path, output_dir, max_file_size)
duration = time.time_ns() - start
print(f"Execution time: {duration} ns")
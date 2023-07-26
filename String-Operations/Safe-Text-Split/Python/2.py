import sys
import os
import time

output_dir = '/tmp'
chunk_size = 4096

def split(file_path, output_dir, max_file_size):
    with open(file_path, "rb") as file:
        files_written = 0
        current_file_size = 0

        file_name = os.path.basename(file_path)

        # Read the input file in chunks
        while True:
            chunk = file.read(chunk_size)

            if not chunk:
                # Reached the end of the file
                break

            current_file_size += len(chunk)

            if current_file_size > max_file_size:
                # Split the chunk if the maximum file size is exceeded
                last_newline_index = chunk.rfind(b'\n', 0, max_file_size)
                split_chunk = chunk[:last_newline_index + 1]

                # Write the split chunk to a new file
                output_file_path = f'{output_dir}/{file_name}_{files_written}.txt'
                with open(output_file_path, "wb") as output_file:
                    output_file.write(split_chunk)

                # Prepare for the next file
                chunk = chunk[last_newline_index + 1:]
                files_written += 1
                current_file_size = len(chunk)

            if current_file_size > 0:
                # Write the remaining chunk to the current file
                output_file_path = f'{output_dir}/{file_name}_{files_written}.txt'
                with open(output_file_path, "ab") as output_file:
                    output_file.write(chunk)

                current_file_size = len(chunk)

if len(sys.argv) < 3:
    print("Please provide the input file name or file path and maximum file size.")
    sys.exit(1)

file_path = sys.argv[1]
max_file_size = int(sys.argv[2])

start = time.time_ns()
split(file_path, output_dir, max_file_size)
duration = time.time_ns() - start
print(f"Execution time: {duration} ns")
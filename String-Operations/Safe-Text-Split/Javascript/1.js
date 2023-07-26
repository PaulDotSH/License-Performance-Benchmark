const fs = require('fs');
const path = require('path');

const output_dir = '/tmp';

function split(file_path, output_dir, max_file_size) {
  const input_bytes = fs.readFileSync(file_path);

  const file_name = path.basename(file_path);

  let current_byte_count = 0;
  let files_written = 0;
  let last_stop = 0;
  for (let index = 0; index < input_bytes.length; index++) {
    const byte = input_bytes[index];
    current_byte_count += 1;
    if (byte === 10 /* ASCII code for '\n' */) {
      if (current_byte_count > max_file_size) {
        fs.writeFileSync(
          path.join(output_dir, `${file_name}_${files_written}.txt`),
          input_bytes.slice(last_stop, index + 1)
        );
        last_stop = index + 1;
        current_byte_count = 0;
        files_written += 1;
      }
    }
    if (current_byte_count >= max_file_size) {
      fs.writeFileSync(
        path.join(output_dir, `${file_name}_${files_written}.txt`),
        input_bytes.slice(last_stop, index)
      );
      last_stop = index;
      current_byte_count = 0;
      files_written += 1;
    }
  }

  // Write the remaining bytes to the last file
  if (last_stop < input_bytes.length) {
    fs.writeFileSync(
      path.join(output_dir, `${file_name}_${files_written}.txt`),
      input_bytes.slice(last_stop)
    );
  }
}

if (process.argv.length < 4) {
  console.log('Please provide the input file name or file path and maximum file size.');
  process.exit(1);
}

const file_path = process.argv[2];
const max_file_size = parseInt(process.argv[3], 10);


const start = process.hrtime.bigint();
split(file_path, output_dir, max_file_size);
const end = process.hrtime.bigint();
const duration = end - start;
console.log(`Execution time: ${duration} ns`);

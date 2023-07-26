const fs = require('fs');
const path = require('path');

const output_dir = '/tmp';
const chunk_size = 4096;

function split(file_path, output_dir, max_file_size) {
  const file = fs.openSync(file_path, 'r');
  let files_written = 0;
  let current_file_size = 0;

  const file_name = path.basename(file_path);
  let chunk = Buffer.alloc(chunk_size);

  while (true) {
    const bytesRead = fs.readSync(file, chunk, 0, chunk_size, null);

    if (bytesRead === 0) {
      break;
    }

    current_file_size += bytesRead;

    if (current_file_size > max_file_size) {
      const last_newline_index = chunk.lastIndexOf('\n', max_file_size);
      const split_chunk = chunk.slice(0, last_newline_index + 1);

      const output_file_path = path.join(output_dir, `${file_name}_${files_written}.txt`);
      fs.writeFileSync(output_file_path, split_chunk);

      const remaining_chunk = chunk.slice(last_newline_index + 1);
      files_written += 1;
      current_file_size = remaining_chunk.length;

      if (current_file_size > 0) {
        fs.appendFileSync(output_file_path, remaining_chunk);
      }
    } else if (current_file_size > 0) {
      const output_file_path = path.join(output_dir, `${file_name}_${files_written}.txt`);
      fs.appendFileSync(output_file_path, chunk);
    }
  }

  fs.closeSync(file);
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

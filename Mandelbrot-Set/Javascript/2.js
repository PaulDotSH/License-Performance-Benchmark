const { createCanvas } = require('canvas');

function mandelbrot(c_real, c_imag, max_iterations) {
  let z_real = 0;
  let z_imag = 0;
  let n = 0;

  while (z_real * z_real + z_imag * z_imag <= 4 && n < max_iterations) {
    const newReal = z_real * z_real - z_imag * z_imag + c_real;
    const newImag = 2 * z_real * z_imag + c_imag;
    z_real = newReal;
    z_imag = newImag;
    n++;
  }

  return n;
}

function create_mandelbrot_set(width, height, x_min, x_max, y_min, y_max, max_iterations) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  let dataIndex = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const real = x_min + (x / (width - 1)) * (x_max - x_min);
      const imag = y_min + (y / (height - 1)) * (y_max - y_min);

      const iteration = mandelbrot(real, imag, max_iterations);

      // Map the number of iterations to a color
      const r = iteration % 256;
      const g = (iteration * 2) % 256;
      const b = (iteration * 5) % 256;

      data[dataIndex] = r;
      data[dataIndex + 1] = g;
      data[dataIndex + 2] = b;
      data[dataIndex + 3] = 255; // Set alpha to 255 (fully opaque)

      dataIndex += 4;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

function main() {
  const WIDTH = 3200;
  const HEIGHT = 3200;
  const X_MIN = -2.5;
  const X_MAX = 1.5;
  const Y_MIN = -2.0;
  const Y_MAX = 2.0;
  const MAX_ITERATIONS = 5000;
  
  const mandelbrot_canvas = create_mandelbrot_set(WIDTH, HEIGHT, X_MIN, X_MAX, Y_MIN, Y_MAX, MAX_ITERATIONS);
  const fs = require('fs');
  const out = fs.createWriteStream(__dirname + '/mandelbrot.png');
  const stream = mandelbrot_canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('The PNG file was created.'));
}

const start = process.hrtime.bigint();
main()
const end = process.hrtime.bigint();
const duration = end - start;
console.log(`Execution time: ${duration} ns`);
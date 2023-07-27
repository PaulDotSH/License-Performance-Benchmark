const { createCanvas } = require('canvas');
const ndarray = require('ndarray');

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

  // Create a typed array to hold the pixel data
  const pixelData = new Uint8ClampedArray(width * height * 4);

  const pixelArray = ndarray(pixelData, [height, width, 4]);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const real = x_min + (x / (width - 1)) * (x_max - x_min);
      const imag = y_min + (y / (height - 1)) * (y_max - y_min);

      const iteration = mandelbrot(real, imag, max_iterations);

      // Map the number of iterations to a color
      const r = iteration % 256;
      const g = (iteration * 2) % 256;
      const b = (iteration * 5) % 256;

      // Set the pixel values using ndarray
      pixelArray.set(y, x, 0, r);
      pixelArray.set(y, x, 1, g);
      pixelArray.set(y, x, 2, b);
      pixelArray.set(y, x, 3, 255); // Set alpha to 255 (fully opaque)
    }
  }

  // Manually transfer pixel data to the canvas
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixelData);
  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

function main() {
  const WIDTH = 1600;
  const HEIGHT = 1600;
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
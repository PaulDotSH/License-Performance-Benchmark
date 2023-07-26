const { createCanvas } = require('canvas');

function mandelbrot(c, max_iterations) {
  let z = { real: 0, imag: 0 };
  let n = 0;
  while (z.real * z.real + z.imag * z.imag <= 4 && n < max_iterations) {
    const newReal = z.real * z.real - z.imag * z.imag + c.real;
    const newImag = 2 * z.real * z.imag + c.imag;
    z.real = newReal;
    z.imag = newImag;
    n += 1;
  }
  return n;
}

function create_mandelbrot_set(width, height, x_min, x_max, y_min, y_max, max_iterations) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Map pixel coordinates to complex plane coordinates
      const real = x_min + (x / (width - 1)) * (x_max - x_min);
      const imag = y_min + (y / (height - 1)) * (y_max - y_min);

      const c = { real, imag };
      const iteration = mandelbrot(c, max_iterations);

      // Map the number of iterations to a color
      const color = [iteration % 256, (iteration * 3) % 256, (iteration * 7) % 256];

      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  return canvas;
}

const WIDTH = 1600;
const HEIGHT = 1600;
const X_MIN = -2.5;
const X_MAX = 1.5;
const Y_MIN = -2.0;
const Y_MAX = 2.0;
const MAX_ITERATIONS = 1000;

const mandelbrot_canvas = create_mandelbrot_set(WIDTH, HEIGHT, X_MIN, X_MAX, Y_MIN, Y_MAX, MAX_ITERATIONS);
const fs = require('fs');
const out = fs.createWriteStream(__dirname + '/mandelbrot.png');
const stream = mandelbrot_canvas.createPNGStream();
stream.pipe(out);

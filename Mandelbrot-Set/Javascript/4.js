const { createCanvas } = require('canvas');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

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

  const numChunks = 4; // Change this to the desired number of chunks
  const chunkHeight = Math.ceil(height / numChunks);

  const drawChunk = (startY, endY) => {
    for (let y = startY; y < endY; y++) {
      for (let x = 0; x < width; x++) {
        const real = x_min + (x / (width - 1)) * (x_max - x_min);
        const imag = y_min + (y / (height - 1)) * (y_max - y_min);

        const iteration = mandelbrot(real, imag, max_iterations);

        // Map the number of iterations to a color
        const r = iteration % 256;
        const g = (iteration * 2) % 256;
        const b = (iteration * 5) % 256;

        const pixelIndex = (y * width + x) * 4;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 255)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  // Draw chunks sequentially
  for (let i = 0; i < numChunks; i++) {
    const startY = i * chunkHeight;
    const endY = Math.min(startY + chunkHeight, height);
    drawChunk(startY, endY);
  }

  return canvas;
}

// The worker function to calculate a portion of the Mandelbrot set
function workerFunction() {
  const { startY, endY, width, x_min, x_max, y_min, y_max, max_iterations } = workerData;
  const chunkSize = (endY - startY) * width * 4;
  const chunkData = new Uint8ClampedArray(chunkSize);

  let index = 0;
  for (let y = startY; y < endY; y++) {
    for (let x = 0; x < width; x++) {
      const real = x_min + (x / (width - 1)) * (x_max - x_min);
      const imag = y_min + (y / (height - 1)) * (y_max - y_min);

      const iteration = mandelbrot(real, imag, max_iterations);

      // Map the number of iterations to a color
      const r = iteration % 256;
      const g = (iteration * 2) % 256;
      const b = (iteration * 5) % 256;

      chunkData[index++] = r;
      chunkData[index++] = g;
      chunkData[index++] = b;
      chunkData[index++] = 255; // Set alpha to 255
    }
  }

  parentPort.postMessage({ startY, data: chunkData }, [chunkData.buffer]);
}

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

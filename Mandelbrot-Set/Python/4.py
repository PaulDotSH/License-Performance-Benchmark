# Uses concurrency
import numpy as np
from numba import jit
from PIL import Image
import concurrent.futures

@jit(nopython=True)
def mandelbrot_numba(c_real, c_imag, max_iterations):
    z_real, z_imag = 0.0, 0.0
    n = 0
    while n < max_iterations and z_real * z_real + z_imag * z_imag <= 4.0:
        new_real = z_real * z_real - z_imag * z_imag + c_real
        new_imag = 2.0 * z_real * z_imag + c_imag
        z_real, z_imag = new_real, new_imag
        n += 1
    return n

def compute_mandelbrot_row(row, width, height, x_min, x_max, y_min, y_max, max_iterations):
    c_imag = y_min + (row / (height - 1)) * (y_max - y_min)
    row_values = np.empty(width, dtype=np.uint32)

    for x in range(width):
        c_real = x_min + (x / (width - 1)) * (x_max - x_min)
        iteration = mandelbrot_numba(c_real, c_imag, max_iterations)
        row_values[x] = iteration

    return row_values

def create_mandelbrot_set_parallel(width, height, x_min, x_max, y_min, y_max, max_iterations):
    image = Image.new('RGB', (width, height), color='white')
    pixels = image.load()

    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_row = {executor.submit(compute_mandelbrot_row, row, width, height, x_min, x_max, y_min, y_max, max_iterations): row for row in range(height)}
        for future in concurrent.futures.as_completed(future_to_row):
            row = future_to_row[future]
            row_values = future.result()
            for x, iteration in enumerate(row_values):
                color = (iteration % 256, (iteration * 2) % 256, (iteration * 5) % 256)
                pixels[x, row] = color

    return image

if __name__ == "__main__":
    WIDTH, HEIGHT = 1600, 1600
    X_MIN, X_MAX = -2.5, 1.5
    Y_MIN, Y_MAX = -2.0, 2.0
    MAX_ITERATIONS = 1000

    mandelbrot_image = create_mandelbrot_set_parallel(WIDTH, HEIGHT, X_MIN, X_MAX, Y_MIN, Y_MAX, MAX_ITERATIONS)
    mandelbrot_image.save("mandelbrot.png")

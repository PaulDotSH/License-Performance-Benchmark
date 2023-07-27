# Uses numba for JIT
import numpy as np
from numba import jit
from PIL import Image
import time

@jit(nopython=True)
def mandelbrot(c_real, c_imag, max_iterations):
    z_real, z_imag = 0.0, 0.0
    n = 0
    while n < max_iterations and z_real * z_real + z_imag * z_imag <= 4.0:
        new_real = z_real * z_real - z_imag * z_imag + c_real
        new_imag = 2.0 * z_real * z_imag + c_imag
        z_real, z_imag = new_real, new_imag
        n += 1
    return n

def create_mandelbrot_set(width, height, x_min, x_max, y_min, y_max, max_iterations):
    image = Image.new('RGB', (width, height), color='white')
    pixels = image.load()

    for x in range(width):
        for y in range(height):
            c_real = x_min + (x / (width - 1)) * (x_max - x_min)
            c_imag = y_min + (y / (height - 1)) * (y_max - y_min)

            iteration = mandelbrot(c_real, c_imag, max_iterations)

            color = (iteration % 256, (iteration * 2) % 256, (iteration * 5) % 256)
            pixels[x, y] = color

    return image

def main():
    WIDTH, HEIGHT = 800, 800
    X_MIN, X_MAX = -2.5, 1.5
    Y_MIN, Y_MAX = -2.0, 2.0
    MAX_ITERATIONS = 1000

    mandelbrot_image = create_mandelbrot_set(WIDTH, HEIGHT, X_MIN, X_MAX, Y_MIN, Y_MAX, MAX_ITERATIONS)
    mandelbrot_image.save("mandelbrot.png")

if __name__ == "__main__":
    start = time.time_ns()
    main()
    duration = time.time_ns() - start
    print(f"Execution time: {duration} ns")

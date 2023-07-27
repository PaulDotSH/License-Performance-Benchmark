# Uses numpy so arrays are actually C/C++
import numpy as np
import time
from PIL import Image

def mandelbrot_numpy(c, max_iterations):
    z = np.zeros_like(c, dtype=complex)
    n = np.zeros(c.shape, dtype=int)

    for i in range(max_iterations):
        # Bool array representing if the point is part or isnt part of the mandelbrot set (bonded or goes to infinity)
        mask = np.less(np.abs(z), 2)
        z[mask] = z[mask] * z[mask] + c[mask]
        n[mask] = i
    return n

def create_mandelbrot_set(width, height, x_min, x_max, y_min, y_max, max_iterations):
    # Create a grid of complex numbers covering a rectangle
    x, y = np.ogrid[y_min:y_max:height*1j, x_min:x_max:width*1j]
    c = x + y * 1j
    mandelbrot = mandelbrot_numpy(c, max_iterations)

    # Assign colors based on iteration number
    colors = (mandelbrot % 256, (mandelbrot * 2) % 256, (mandelbrot * 5) % 256)
    # Transpose is needed because np is row-major and img libraries have colors on the last dimension (RGB)
    colors = np.transpose(colors, axes=(1, 2, 0))

    return Image.fromarray(colors.astype('uint8'), 'RGB')

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

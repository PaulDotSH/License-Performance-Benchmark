# Uses vectorization
# TODO: FIX
import numpy as np
from PIL import Image
from numba import jit

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

def create_mandelbrot_set_numpy(width, height, x_min, x_max, y_min, y_max, max_iterations):
    x, y = np.ogrid[y_min:y_max:height*1j, x_min:x_max:width*1j]
    c = x + y * 1j
    mandelbrot = mandelbrot_numba(c.real, c.imag, max_iterations)

    # Map the number of iterations to a color
    colors = (mandelbrot % 256, (mandelbrot * 2) % 256, (mandelbrot * 5) % 256)
    colors = np.transpose(colors, axes=(1, 2, 0))

    image = Image.fromarray(colors.astype('uint8'), 'RGB')
    return image

if __name__ == "__main__":
    WIDTH, HEIGHT = 1600, 1600
    X_MIN, X_MAX = -2.5, 1.5
    Y_MIN, Y_MAX = -2.0, 2.0
    MAX_ITERATIONS = 1000

    mandelbrot_image = create_mandelbrot_set_numpy(WIDTH, HEIGHT, X_MIN, X_MAX, Y_MIN, Y_MAX, MAX_ITERATIONS)
    mandelbrot_image.save("mandelbrot.png")

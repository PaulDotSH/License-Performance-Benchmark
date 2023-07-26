from PIL import Image

def mandelbrot(c, max_iterations):
    z = 0
    n = 0
    while abs(z) <= 2 and n < max_iterations:
        z = z*z + c
        n += 1
    return n

def create_mandelbrot_set(width, height, x_min, x_max, y_min, y_max, max_iterations):
    image = Image.new('RGB', (width, height), color='white')
    pixels = image.load()

    for x in range(width):
        for y in range(height):
            real = x_min + (x / (width - 1)) * (x_max - x_min)
            imag = y_min + (y / (height - 1)) * (y_max - y_min)

            c = complex(real, imag)
            iteration = mandelbrot(c, max_iterations)

            # Color based on iter number
            color = (iteration % 256, (iteration * 2) % 256, (iteration * 5) % 256)
            pixels[x, y] = color

    return image

if __name__ == "__main__":
    WIDTH, HEIGHT = 1600, 1600
    X_MIN, X_MAX = -2.5, 1.5
    Y_MIN, Y_MAX = -2.0, 2.0
    MAX_ITERATIONS = 1000

    mandelbrot_image = create_mandelbrot_set(WIDTH, HEIGHT, X_MIN, X_MAX, Y_MIN, Y_MAX, MAX_ITERATIONS)
    mandelbrot_image.save("mandelbrot.png")

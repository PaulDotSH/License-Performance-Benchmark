use image::{Rgb, RgbImage};

fn mandelbrot(c_real: f64, c_imag: f64, max_iterations: u32) -> u32 {
    let mut z_real = 0.0;
    let mut z_imag = 0.0;
    let mut n = 0;

    while z_real * z_real + z_imag * z_imag <= 4.0 && n < max_iterations {
        let zr = z_real * z_real - z_imag * z_imag + c_real;
        let zi = 2.0 * z_real * z_imag + c_imag;
        z_real = zr;
        z_imag = zi;
        n += 1;
    }

    n
}

fn create_mandelbrot_set(
    width: u32,
    height: u32,
    x_min: f64,
    x_max: f64,
    y_min: f64,
    y_max: f64,
    max_iterations: u32,
) -> RgbImage {
    let mut image = RgbImage::new(width, height);

    for x in 0..width {
        for y in 0..height {
            // Map pixel coordinates to complex plane coordinates
            let real = x_min + x as f64 / (width - 1) as f64 * (x_max - x_min);
            let imag = y_min + y as f64 / (height - 1) as f64 * (y_max - y_min);

            let iteration = mandelbrot(real, imag, max_iterations);

            // Map the number of iterations to a color
            let color = Rgb([
                (iteration % 256) as u8,
                ((iteration * 2) % 256) as u8,
                ((iteration * 5) % 256) as u8,
            ]);
            image.put_pixel(x, y, color);
        }
    }

    image
}

fn main() {
    const WIDTH: u32 = 3200;
    const HEIGHT: u32 = 3200;
    const X_MIN: f64 = -2.5;
    const X_MAX: f64 = 1.5;
    const Y_MIN: f64 = -2.0;
    const Y_MAX: f64 = 2.0;
    const MAX_ITERATIONS: u32 = 1000;

    let mandelbrot_image =
        create_mandelbrot_set(WIDTH, HEIGHT, X_MIN, X_MAX, Y_MIN, Y_MAX, MAX_ITERATIONS);
    mandelbrot_image.save("mandelbrot.png").unwrap();
}

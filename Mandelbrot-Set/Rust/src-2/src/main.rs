use image::{Rgb, RgbImage};

const WIDTH: usize = 3200;
const HEIGHT: usize = 3200;
const X_MIN: f64 = -2.5;
const X_MAX: f64 = 1.5;
const Y_MIN: f64 = -2.0;
const Y_MAX: f64 = 2.0;
const MAX_ITERATIONS: u32 = 1000;

fn mandelbrot(c: (f64, f64), max_iterations: u32) -> u32 {
    let mut z = (0.0, 0.0);
    let mut n = 0;

    while z.0 * z.0 + z.1 * z.1 <= 4.0 && n < max_iterations {
        let zr = z.0 * z.0 - z.1 * z.1 + c.0;
        let zi = 2.0 * z.0 * z.1 + c.1;
        z = (zr, zi);
        n += 1;
    }

    n
}

fn create_mandelbrot_set() -> RgbImage {
    let mut image = RgbImage::new(WIDTH as u32, HEIGHT as u32);

    for y in 0..HEIGHT {
        for x in 0..WIDTH {
            let real = X_MIN + x as f64 / (WIDTH - 1) as f64 * (X_MAX - X_MIN);
            let imag = Y_MIN + y as f64 / (HEIGHT - 1) as f64 * (Y_MAX - Y_MIN);
            let iteration = mandelbrot((real, imag), MAX_ITERATIONS);

            // Map the number of iterations to a color
            let color = Rgb([
                (iteration % 256) as u8,
                ((iteration * 2) % 256) as u8,
                ((iteration * 5) % 256) as u8,
            ]);
            image.put_pixel(x as u32, y as u32, color);
        }
    }

    image
}

fn main() {
    let start = Instant::now();
    let mandelbrot_image = create_mandelbrot_set();
    let duration = start.elapsed();
    let ns = duration.as_nanos();
    println!("Execution time: {} ns", ns);
    mandelbrot_image.save("mandelbrot.png").unwrap();    mandelbrot_image.save("mandelbrot.png").unwrap();
}

use image::{Rgb, RgbImage};
use rayon::prelude::*;

const WIDTH: usize = 6400;
const HEIGHT: usize = 6400;
const X_MIN: f64 = -2.5;
const X_MAX: f64 = 1.5;
const Y_MIN: f64 = -2.0;
const Y_MAX: f64 = 2.0;
const MAX_ITERATIONS: u32 = 5000;

fn mandelbrot(c: (f64, f64)) -> u32 {
    let mut z = (0.0, 0.0);
    let mut n = 0;

    while z.0 * z.0 + z.1 * z.1 <= 4.0 && n < MAX_ITERATIONS {
        let zr = z.0 * z.0 - z.1 * z.1 + c.0;
        let zi = 2.0 * z.0 * z.1 + c.1;
        z = (zr, zi);
        n += 1;
    }

    n
}

fn create_mandelbrot_set() -> RgbImage {
    let mut image = RgbImage::new(WIDTH as u32, HEIGHT as u32);

    let coordinates: Vec<(f64, f64)> = (0..WIDTH)
        .into_par_iter()
        .flat_map(|x| {
            (0..HEIGHT).into_par_iter().map(move |y| {
                let real = X_MIN + x as f64 / (WIDTH - 1) as f64 * (X_MAX - X_MIN);
                let imag = Y_MIN + y as f64 / (HEIGHT - 1) as f64 * (Y_MAX - Y_MIN);
                (real, imag)
            })
        })
        .collect();

    let mandelbrot_iterations: Vec<u32> = coordinates.par_iter().map(|&c| mandelbrot(c)).collect();

    for (i, iteration) in mandelbrot_iterations.into_iter().enumerate() {
        let x = i as u32 % WIDTH as u32;
        let y = i as u32 / WIDTH as u32;
        let color = Rgb([
            (iteration % 256) as u8,
            ((iteration * 2) % 256) as u8,
            ((iteration * 5) % 256) as u8,
        ]);
        image.put_pixel(x, y, color);
    }

    image
}

fn main() {
    let mandelbrot_image = create_mandelbrot_set();
    mandelbrot_image.save("mandelbrot.png").unwrap();
}

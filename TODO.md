# TODO
- Make some scripts (Python or Rust) to generate the sample data needed for the benchmarks
- Make a binary to run the benchmarks and generate some graphs
- Create more benchmarks i.e. various text processing and analysis, "cheap" (computationally-wise) backend (some simple CRUD with ORM and/or simple driver), "expensive" backend with complex calculations
- Check if the code samples are close enough, since I am tired and cant be bothered to check now...
- Fix the mandelbrot programs to print the expected output (time taken in ms) and to take from args or env var the parameters


Maybe after compiling rust binaries or running benchmarks, wait for 5 seconds between them, because if a cpu core is constantly stressed, it can overheat and drop the clockspeed.
Also do an average of X runs, configurable

# file-io
A few simple file IO functions.

- `glob(pattern)` - Globs all files according to the given pattern and returns an array of the file paths
- `readLines(path)` - Reads the given file into an array of lines
- `readJson(path)` - Reads the given file and parses it as JSON
- `writeLines(path, array, append = false)` - Writes the given array of lines (joined with "\n") to a file

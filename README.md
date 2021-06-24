# file-io
A few simple file IO functions.

- `glob(pattern)` - Globs all files according to the given pattern and returns an array of the file paths. This is a thin wrapper around [fast-glob](https://www.npmjs.com/package/fast-glob).
- `readLines(path)` - Reads a text file into an array of lines
- `readJson(path)` - Reads a text file and parses it as JSON. Equivalent to calling `JSON.parse(readLines(path))`.
- `writeLines(path, array, append = false)` - Writes the given array of lines (joined with `"\n"`) to a file

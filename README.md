# file-io

A single package for file IO that combines `fs-extra`, `fast-glob` and `untildify`.

- `glob(pattern)` - Globs all files according to the given pattern and returns an array of the file paths. This is a thin wrapper around [fast-glob](https://www.npmjs.com/package/fast-glob).
- `readLines(path)` - Reads a text file into an array of lines
- `readLinesAsString(path)` - Reads a text file into a single string
- `readJson(path)` - Reads a text file and parses it as JSON. Equivalent to calling `JSON.parse(readLines(path))`.
- `writeLines(path, array, append = false)` - Writes the given array of lines (joined with `"\n"`) to a file
- `copyFolder(inputFolder, outputFolder, options)` - Copies the given folder recursively, preserving directory structure. Options are the options used when globbing up the input folder. See [fast-glob](https://www.npmjs.com/package/fast-glob) options.
- `exists(path)` - Checks if the given path exists

# file-io
A few simple file IO functions.

- `globFiles(folder, extension)` - Recursively selects all files inside the given folder that have the given extension and returns an array of the file paths
- `readLines(path)` - Reads the given file into an array of lines
- `readJson(path)` - Reads the given file and parses it as JSON
- `writeLines(path, array, append = false)` - Writes the given array of lines out to a file

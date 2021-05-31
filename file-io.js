const fs = require('fs-extra');
const glob = require('glob');

/**
 * Recursively glob all files in the given folder with the given extension.
 *
 * @param {string} folder folder to search
 * @param {string} extension file extension to include
 * @returns {array} files found
 */
const globFiles = (folder, extension) => {
  const globStr = folder + (folder.endsWith("/") ? "" : "/") + "**/*." + extension;
  const files = glob.sync(globStr);
  return files;
}

/**
 * Read the contents of a file into a string.
 *
 * @param {string} filename file to read
 * @returns {string} file contents
 */
const readLines = filename => {
  const contents = fs.readFileSync(filename, 'utf8');
  return contents;
}

/**
 * Reads a JSON file and converts it to a JS object.
 *
 * @param {string} filename file to read
 * @returns {object} file contents parsed with JSON.parse
 */
const readJson = filename => {
  return JSON.parse(readLines(filename));
}

/**
 * Writes the given array to a file.
 *
 * @param {string} filename file to write
 * @returns {array} data string or array of lines to write
 */
const writeLines = (filename, data, append = false) => {
  let dataOut;
  if(typeof data === "string") {
    dataOut = data;
  } else {
    dataOut = data.join("\n");
  }
  const options = { flag: append ? "a" : "w" };
  fs.outputFileSync(filename, dataOut, options);
}

const fileio = { globFiles, readLines, readJson, writeLines };
module.exports = fileio;

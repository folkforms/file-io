const fs = require('fs-extra');
const globLib = require('fast-glob');

/**
 * Glob all files according to the given pattern.
 *
 * @param {string} pattern glob pattern
 * @returns {array} files found
 */
const glob = (pattern) => {
  return globLib.sync(pattern);
}

/**
 * Read the contents of a file into an array.
 *
 * @param {string} filename file to read
 * @returns {array} file contents
 */
const readLines = filename => {
  return readLinesAsString(filename).split("\n");
}

/**
 * Read the contents of a file into a string.
 *
 * @param {string} filename file to read
 * @returns {string} file contents
 */
const readLinesAsString = filename => {
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
  return JSON.parse(readLinesAsString(filename));
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

const fileio = { glob, readLines, readLinesAsString, readJson, writeLines };
module.exports = fileio;

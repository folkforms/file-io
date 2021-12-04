const fs = require('fs-extra');
const globLib = require('fast-glob');
const shelljs = require('shelljs');
const untildify = require('untildify');

/**
 * Glob all files according to the given pattern.
 *
 * This is a thin wrapper around `fast-glob` (https://www.npmjs.com/package/fast-glob)
 *
 * @param {string} pattern glob pattern
 * @param {object} options fast-glob options
 * @returns {array} files found
 */
const glob = (pattern, options) => {
  return globLib.sync(pattern, options);
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
 * Read the contents of a file into a string. Will automatically convert \r\n into \n.
 *
 * @param {string} filename file to read
 * @returns {string} file contents
 */
const readLinesAsString = filename => {
  let contents = fs.readFileSync(untildify(filename), 'utf8');
  contents = contents.replace(/\r\n/g, '\n');
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
  fs.outputFileSync(untildify(filename), dataOut, options);
}

/**
 * Copies the given folder recursively, preserving directory structure.
 *
 * @param {string} inputFolder input folder
 * @param {string} outputFolder output folder, will be created if it does not exist
 * @param {object} options options used when globbing up the input files
 */
const copyFolder = (inputFolder, outputFolder, options) => {
  let files = glob(`${inputFolder}/**/*`, options);
  const copyTasks = [];
  files.forEach(f => {
    f = untildify(f);
    copyTasks.push({
      src: f,
      dest: f.replace(inputFolder, outputFolder)
    });
  });
  copyTasks.forEach(c => {
    const folderPart = c.dest.substring(0, c.dest.lastIndexOf("/"));
    shelljs.mkdir("-p", folderPart);
    shelljs.cp(c.src, c.dest);
  });
}

/**
 * Checks if the given path exists.
 *
 * @param {string} path
 */
const exists = path => {
  path = untildify(path);
  return fs.existsSync(path);
}

const fileio = { glob, readLines, readLinesAsString, readJson, writeLines, copyFolder, exists };
module.exports = fileio;

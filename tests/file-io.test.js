const fs = require("fs-extra");
const fileio = require("../file-io.js");

test("readLines", () => {
  const expected = [ "aaa", "bbbaaa", "bbb", "" ];
  const actual = fileio.readLines("tests/input.txt");
  expect(actual).toEqual(expected);
});

test("readLinesAsString", () => {
  const expected = "aaa\nbbbaaa\nbbb\n";
  const actual = fileio.readLinesAsString("tests/input.txt");
  expect(actual).toEqual(expected);
});
  
test("readJson", () => {
  const expected = { foo: "bar", muk: "qux" };
  const actual = fileio.readJson("tests/input.json");
  expect(actual).toEqual(expected);
});

test("writeLines", () => {
  const data = [ "line 1", "line 2" ];
  const expected = "line 1\nline 2";

  fileio.writeLines("tests/temp1.txt", data, false);
  const actual = fileio.readLinesAsString("tests/temp1.txt");

  expect(actual).toEqual(expected);
});

test("glob", () => {
  const expected = [ "tests/test-glob/bar/bar.txt", "tests/test-glob/foo.txt" ].sort();
  const actual = fileio.glob("tests/test-glob/**/*.txt").sort();
  expect(actual).toEqual(expected);
});

test("ignore", () => {
  const expected = [
    "tests/test-ignore/bar/bar.txt",
    "tests/test-ignore/foo.txt",
    "tests/test-ignore/muk.txt"
  ].sort();
  const files = fileio.glob("tests/test-ignore/**/*.txt").sort();
  const actual = fileio.ignore(files, "tests/test-ignore", ".testignore");
  expect(actual).toEqual(expected);
});

test("copyFolder", () => {
  const inputFolder = "tests/test-copy-folder/input";
  const expectedFolder = "tests/test-copy-folder/expected";
  const temporaryFolder = "tests/test-copy-folder/temp";
  fileio.copyFolder(inputFolder, temporaryFolder);

  // Compare temporary folder with expected folder
  const actualFiles = fileio.glob(`${temporaryFolder}/**`);
  const expectedFiles = fileio.glob(`${expectedFolder}/**`);

  // ...Check file lists
  const modActualFiles = actualFiles.map(file => file.replace(temporaryFolder, expectedFolder));
  expect(modActualFiles).toEqual(expectedFiles);

  // ...Check number of files
  expect(actualFiles.length).toEqual(expectedFiles.length);

  // ...Check file contents
  for(let i = 0; i < actualFiles.length; i++) {
    const actualContents = fileio.readLines(actualFiles[i]);
    const expectedContents = fileio.readLines(expectedFiles[i]);
    expect(actualContents).toEqual(expectedContents);
  }
});

test("exists detects a folder correctly", () => {
  const inputFolder = "tests/test-copy-folder/input";
  const actual = fileio.exists(inputFolder);
  expect(actual).toEqual(true);
});

test("exists detects a file correctly", () => {
  const inputFolder = "tests/test-copy-folder/input/file1.md";
  const actual = fileio.exists(inputFolder);
  expect(actual).toEqual(true);
});

test("exists detects non-existent file or folder correctly", () => {
  const inputFolder = "tests/does-not-exist";
  const actual = fileio.exists(inputFolder);
  expect(actual).toEqual(false);
});

test("rm_rf deletes a file", () => {
  const tempFile = "tests/temp_rm_rf.txt";
  expect(fileio.exists(tempFile)).toEqual(false);
  fileio.writeLines(tempFile, "temp file created for rm_rf test");

  fileio.rm_rf(tempFile);

  expect(fileio.exists(tempFile)).toEqual(false);
});

test("rm_rf deletes a folder and its contents", () => {
  const parentFolder = "tests/test_rm_rf";
  expect(fileio.exists(parentFolder)).toEqual(false);

  const inputFolder = `${parentFolder}/foo`;
  fs.mkdirpSync(inputFolder);
  const testFile1 = `${inputFolder}/muk1.txt`;
  fileio.writeLines(testFile1, "muk1");
  const testFile2 = `${inputFolder}/muk2.txt`;
  fileio.writeLines(testFile2, "muk2");

  fileio.rm_rf(parentFolder);

  expect(fileio.exists(parentFolder)).toEqual(false);
});

test("mkdir_p creates a folder and all child folders", () => {
  const inputFolder1 = "tests/does-not-exist";
  const inputFolder2 = "tests/does-not-exist/foo";
  fs.remove(inputFolder1);
  expect(fileio.exists(inputFolder1)).toEqual(false);
  expect(fileio.exists(inputFolder2)).toEqual(false);

  fileio.mkdir_p(inputFolder2);

  expect(fileio.exists(inputFolder2)).toEqual(true);
  fs.remove(inputFolder1);
});

test("cp copies a file to a file", () => {
  const src = "tests/cp/src.txt";
  const dest = "tests/cp/output/foo.txt"
  expect(fileio.exists(dest)).toEqual(false);

  fileio.cp(src, dest);

  expect(fileio.exists(dest)).toEqual(true);
  fileio.rm_rf(dest);
});

test("cp copies a file to a folder", () => {
  const src = "tests/cp/src.txt";
  const destFolder = "tests/cp/output"
  const expectedFile = `${destFolder}/src.txt`;
  expect(fileio.exists(expectedFile)).toEqual(false);

  fileio.cp(src, destFolder);

  expect(fileio.exists(expectedFile)).toEqual(true);
  fileio.rm_rf(expectedFile);
});

const fileio = require("../file-io.js");

test("readLines", () => {
  // Arrange
  const expected = [ "aaa", "bbbaaa", "bbb", "" ];

  // Act
  const actual = fileio.readLines("tests/input.txt");

  // Assert
  expect(actual).toEqual(expected);
});

test("readLinesAsString", () => {
  // Arrange
  const expected = "aaa\nbbbaaa\nbbb\n";

  // Act
  const actual = fileio.readLinesAsString("tests/input.txt");

  // Assert
  expect(actual).toEqual(expected);
});
  
test("readJson", () => {
  // Arrange
  const expected = { foo: "bar", muk: "qux" };

  // Act
  const actual = fileio.readJson("tests/input.json");

  // Assert
  expect(actual).toEqual(expected);
});

test("writeLines", () => {
  // Arrange
  const data = [ "line 1", "line 2" ];
  const expected = "line 1\nline 2";

  // Act
  fileio.writeLines("tests/temp1.txt", data, false);
  const actual = fileio.readLinesAsString("tests/temp1.txt");

  // Assert
  expect(actual).toEqual(expected);
});

test("glob", () => {
  // Arrange
  const expected = [ "tests/test-glob/bar/bar.txt", "tests/test-glob/foo.txt" ].sort();

  // Act
  const actual = fileio.glob("tests/test-glob/**/*.txt").sort();

  // Assert
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

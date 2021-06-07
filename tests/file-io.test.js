const fileio = require("../file-io.js");

test("Test readLines", () => {
  // Arrange
  const expected = [ "aaa", "bbbaaa", "bbb", "" ];

  // Act
  const actual = fileio.readLines("tests/input.txt");

  // Assert
  expect(actual).toEqual(expected);
});

test("Test readLinesAsString", () => {
  // Arrange
  const expected = "aaa\nbbbaaa\nbbb\n";

  // Act
  const actual = fileio.readLinesAsString("tests/input.txt");

  // Assert
  expect(actual).toEqual(expected);
});
  
test("Test readJson", () => {
  // Arrange
  const expected = { foo: "bar", muk: "qux" };

  // Act
  const actual = fileio.readJson("tests/input.json");

  // Assert
  expect(actual).toEqual(expected);
});

test("Test writeLines", () => {
  // Arrange
  const data = [ "line 1", "line 2" ];
  const expected = "line 1\nline 2";

  // Act
  fileio.writeLines("tests/temp1.txt", data, false);
  const actual = fileio.readLinesAsString("tests/temp1.txt");

  // Assert
  expect(actual).toEqual(expected);
});

test("Test glob", () => {
  // Arrange
  const expected = [ "tests/test-glob/bar/bar.txt", "tests/test-glob/foo.txt" ];

  // Act
  const actual = fileio.glob("tests/test-glob/**/*.txt");

  // Assert
  expect(actual).toEqual(expected);
});
  
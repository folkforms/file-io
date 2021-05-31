const fileio = require("./file-io.js");

const arr = [ "aaa", "bbb" ];
fileio.writeLines("foo.txt", arr, true);

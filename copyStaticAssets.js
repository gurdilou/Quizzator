var shell = require("shelljs");

// TODO tlu : only if dev
shell.mkdir("-p", "dist/public/src/public");
shell.ln("-s", "../../../../src/public/js", "dist/public/src/public/js");


shell.cp("-R", "src/public/js/lib", "dist/public/js/");
shell.cp("-R", "src/public/fonts", "dist/public/");
shell.cp("-R", "src/public/images", "dist/public/");


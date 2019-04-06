var shell = require("shelljs");
var fs = require("fs");

if (!fs.existsSync("dist/public/src/public/js")) {
    shell.mkdir("-p", "dist/public/src/public");
    shell.ln("-s", "../../../../client/js", "dist/public/src/public/js");
}



shell.cp("-R", "client/fonts/", "dist/public/");
shell.cp("-R", "client/images/", "dist/public/");
shell.cp("-R", "client/js/lib/", "dist/public/js/");


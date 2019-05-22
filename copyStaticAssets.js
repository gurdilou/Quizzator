var shell = require("shelljs");
var fs = require("fs");


if (!fs.existsSync("dist/public/client/js")) {
    shell.mkdir("-p", "dist/public/client");
    shell.ln("-s", "../../../client/js", "dist/public/client/js");
}

if (!fs.existsSync("dist/views")) {
    shell.mkdir("-p", "dist/");
    shell.ln("-s", "../server/views", "dist/views");
}



shell.cp("-R", " node_modules/font-awesome/fonts/", "dist/public/");
shell.cp("-R", "client/fonts/", "dist/public/");
shell.cp("-R", "client/images/", "dist/public/");
shell.cp("-R", "client/js/lib/", "dist/public/js/");


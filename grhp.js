#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var jsdom_1 = require("jsdom");
var glob = require("glob");
function main() {
    if (process.argv.length < 2) {
        throw new Error("Usage: grhp [-i includeGlob] <querySelector>");
    }
    var includeGlobIndex = process.argv.indexOf("-i");
    var includeGlob = "./**/*.html";
    if (includeGlobIndex !== -1) {
        if (includeGlobIndex >= process.argv.length - 2) {
            throw new Error("Must specify a glob pattern after -i");
        }
        includeGlob = process.argv[includeGlobIndex + 1];
    }
    var domQuery = process.argv[process.argv.length - 1];
    var includedFiles = glob.sync(includeGlob, {});
    includedFiles.forEach(function (file) {
        fs.readFile(file, {}, function (err, data) {
            var dom = new jsdom_1.JSDOM(data);
            try {
                var elements = dom.window.document.querySelectorAll(domQuery);
                if (elements.length > 0) {
                    console.log(file);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    });
}
main();
//# sourceMappingURL=grhp.js.map
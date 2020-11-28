#! /usr/bin/env node
import * as fs from "fs";
import { JSDOM } from "jsdom";
import * as glob from "glob";

function main() {
  if (process.argv.length < 2) {
    throw new Error("Usage: grhp [-i includeGlob] <querySelector>");
  }

  const includeGlobIndex = process.argv.indexOf("-i");
  let includeGlob = "./**/*.html";
  if (includeGlobIndex !== -1) {
    if (includeGlobIndex >= process.argv.length - 2) {
      throw new Error("Must specify a glob pattern after -i");
    }
    includeGlob = process.argv[includeGlobIndex + 1];
  }

  const domQuery = process.argv[process.argv.length - 1];

  const includedFiles = glob.sync(includeGlob, {});

  includedFiles.forEach((file) => {
    fs.readFile(file, {}, (err, data) => {
      const dom = new JSDOM(data);
      try {
        const elements = dom.window.document.querySelectorAll(domQuery);
        if (elements.length > 0) {
          console.log(file);
        }
      } catch (e) {
        console.error(e);
      }
    });
  });
}

main();

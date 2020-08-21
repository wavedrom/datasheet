'use strict';

const fs = require('fs');

console.log('node-main 1');

const outName = nw.App.manifest.output;

let count = 0;
setInterval(function () {
  console.log(count++);
  fs.access(outName, fs.constants.F_OK, (err) => {
    if (err) {
      // console.log(outName + ' does not exist');
    } else {
      nw.App.quit();
    }
  });
}, 1000);

/* global nw */

'use strict';

const renderAll = require('./render-all');

function nwPrint () {
  if (nw === undefined) {
    throw new Error('nw is undefined');
  }

  // var dumpFileName = nw.path.resolve(process.env.PWD, 'vector.pdf');

  var win = nw.Window.get();

  // setTimeout(function () {
  win.print({
    pdf_path: 'datasheet.pdf',
    scaleFactor: 100,
    headerFooterEnabled: false,
    // headerString: 'RISC-V',
    // footerString: '"V" Vector Extension'
  });
  setTimeout(function () {
    nw.process.exit(0);
  }, 500);
  // }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  nwPrint();
});

/* eslint-env browser */
/* global nw */

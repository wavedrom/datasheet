'use strict';

const renderAll = require('./render-all');

function nwPrint () {
  if (nw === undefined) {
    throw new Error('nw is undefined');
  }

  // var dumpFileName = nw.path.resolve(process.env.PWD, 'vector.pdf');

  var win = nw.Window.get();

  setTimeout(function () {
    win.print({
      pdf_path: 'datasheet.pdf',
      // scaleFactor: 100,
      mediaSize: {
        name: 'CUSTOM',
        width_microns: 215900,
        height_microns: 279400,
        custom_display_name: 'Letter',
        is_default: true
      },
      marginsType: 3, // 0 - Default; 1 - No margins; 2 - minimum; 3 - Custom
      marginsCustom: {
        marginBottom: 60, // 21.1667 mm
        marginLeft: 60,
        marginRight: 60,
        marginTop: 60
      },
      headerFooterEnabled: false
      // headerString: 'RISC-V',
      // footerString: '"V" Vector Extension'
    });
    setTimeout(function () {
      nw.process.exit(0);
    }, 1000);
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  nwPrint();
});

/* eslint-env browser */
/* global nw */

'use strict';

// const fs = require('fs');
const renderAll = require('./render-all');

function nwPrint () {
  if (nw === undefined) {
    throw new Error('nw is undefined');
  }

  var win = nw.Window.get();
  // console.log('NWJS print2');

  win.print({
    pdf_path: nw.App.manifest.output,
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
  });
  // console.log('NWJS print3');

  setTimeout(function () {
    nw.App.quit();
    // console.log('NWJS print4');
    // console.log('NWJS done');
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  // console.log('NWJS started');
  renderAll();
  // console.log('NWJS rendered');
  nwPrint();
  // console.log('NWJS printed');
});


/* eslint-env browser */
/* global nw */

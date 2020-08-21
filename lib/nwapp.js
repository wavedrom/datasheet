'use strict';

const renderAll = require('./render-all');

function nwPrint (context) {
  var win = context.Window.get();
  const outName = context.App.manifest.output;
  console.log('NWJS print 1');
  win.print({
    pdf_path: outName,
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
  console.log('NWJS print 2');
}

document.addEventListener('DOMContentLoaded', () => {
  let context;
  try {
    context = nw;
  } catch (err) {
    console.log('browser');
  }
  renderAll(context);
  if (context !== undefined) {
    nwPrint(context);
  }
});

/* eslint-env browser */
/* global nw */

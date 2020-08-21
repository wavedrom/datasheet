'use strict';

module.exports = {
  name: 'DataSheet',
  main: 'index.html',
  'node-main': 'node-main.js',
  window: {'show': false},
  'chromium-args': '--enable-logging=stderr --headless --no-sandbox --disable-setuid-sandbox',
  output: null,
  numPages: 0,
  TOC: []
};

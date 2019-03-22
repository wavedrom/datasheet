'use strict';

const renderAll = require('./render-all');

window.matchMedia('print').addListener(e => {
  console.log('mql');
  console.log(e);
});

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});

console.log('app is up');
/* eslint-env browser */

'use strict';

const hljs = require('highlight.js/lib/core');
const cpp = require('highlight.js/lib/languages/cpp.js');
const js = require('highlight.js/lib/languages/javascript.js');
const wavedrom = require('wavedrom');

const vreg = require('./vreg.js');
const riscvasm = require('../lib/riscvasm.js');
// const pagedjs = require('pagedjs');
const pageNumbers = require('./page-numbers.js');

hljs.registerLanguage('riscvasm', riscvasm);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('js', js);

// const paged = new pagedjs.Previewer();

module.exports = context => {
  const pkg = (context || {App: {}}).App.manifest;
  pageNumbers(pkg);

  // window.matchMedia('print').addListener(() => {
  //   document.querySelectorAll('h2,h3').forEach(block => {
  //     const rect = block.getClientRects();
  //     // const page = rect.top; // ) / 92862.015625 / 87;
  //     // console.log(page);
  //     // console.log(JSON.stringify(rect[0].top / (92862.015625 / 85)));
  //   });
  // });

  document.querySelectorAll('pre code').forEach(block => {
    const lang = block.getAttribute('data-lang');
    if (lang === 'wavedrom') {
      const source = eval('(' + block.innerHTML + ')');
      const newNode = document.createElement('div');
      if (source.vreg !== undefined) {
        newNode.innerHTML = vreg(source.vreg);
      } else {
        const ml = wavedrom.renderAny(0, source, wavedrom.waveSkin);
        newNode.innerHTML = wavedrom.onml.stringify(ml);
      }
      const parent = block.parentNode;
      const grandparent = parent.parentNode;
      grandparent.replaceChild(newNode, parent);
    } else {
      hljs.highlightBlock(block);
    }
  });
};

/* eslint-env browser */

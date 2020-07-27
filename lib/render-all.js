'use strict';

const hljs = require('highlight.js/lib/highlight');
const riscvasm = require('../lib/riscvasm.js');
const cpp = require('highlight.js/lib/languages/cpp.js');
const wavedrom = require('wavedrom');
const vreg = require('./vreg.js');
// const pagedjs = require('pagedjs');

hljs.registerLanguage('riscvasm', riscvasm);
hljs.registerLanguage('cpp', cpp);

// const paged = new pagedjs.Previewer();

module.exports = () => {

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
      const parent = block.parentNode;
      const grandparent = parent.parentNode;
      grandparent.replaceChild(newNode, parent);

      if (source.reg !== undefined) {
        const s = {
          reg: source.reg,
          config: Object.assign(source.config || {}, {lanes: 1, hspace: 968, fontsize: 13})
        };
        wavedrom.renderWaveElement(0, s, newNode, wavedrom.waveSkin.default);
      } else
      if (source.vreg !== undefined) {
        newNode.innerHTML = vreg(source.vreg);
      } else {
        return;
      }
    } else {
      hljs.highlightBlock(block);
    }
  });
};

/* eslint-env browser */

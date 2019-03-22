'use strict';

const hljs = require('highlight.js/lib/highlight');
const riscvasm = require('../lib/riscvasm.js');
const cpp = require('highlight.js/lib/languages/cpp.js');
const wavedrom = require('wavedrom');
const vreg = require('./vreg.js');

hljs.registerLanguage('riscvasm', riscvasm);
hljs.registerLanguage('cpp', cpp);

module.exports = () => document.querySelectorAll('pre code').forEach(block => {
  const lang = block.getAttribute('data-lang');
  if (lang === 'datasheet') {
    const source = eval('(' + block.innerHTML + ')');

    const newNode = document.createElement('div');
    const parent = block.parentNode;
    const grandparent = parent.parentNode;
    grandparent.replaceChild(newNode, parent);

    if (source.isa !== undefined) {
      const s = {
        reg: source.isa,
        config: Object.assign(source.config || {}, {lanes: 1, hspace: ((980 - 8) >> 5) << 5})
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

/* eslint-env browser */

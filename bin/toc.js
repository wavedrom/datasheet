#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const yargs = require('yargs');
const pdfjsLib = require('pdfjs-dist/es5/build/pdf.js');

const nwpkg = require('../lib/nwpkg.js');

const isH1 = e => e.transform[0] === 12.999999250333342;
const isH2 = e => e.transform[0] === 10.139999915259978;

const main = async argv => {
  const loadingTask = pdfjsLib.getDocument(argv.input);
  const doc = await loadingTask.promise;

  const res = [];
  for (let i = 1; i < doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    content.items.map(e => {
      if (isH1(e)) {
        const str = e.str;
        const m = str.match(/^(\d+)\.\s+/);
        if (m) {
          const idx = parseInt(m[1]) - 1;
          if (res[idx] === undefined) {
            res[idx] = {};
          }
          res[idx].str = str;
          res[idx].page = i;
          res[idx].items = [];
        }
      }
      if (isH2(e)) {
        const str = e.str;
        const m = str.match(/^(\d+)\.(\d+)\.\s+/);
        if (m) {
          const idx = parseInt(m[1]) - 1;
          const idx1 = parseInt(m[2]) - 1;
          if (res[idx] === undefined) {
            res[idx] = {
              items: []
            };
          }
          res[idx].items[idx1] = {
            str: e.str, page: i
          };
        }
      }
    });
  }
  const result = Object.assign(nwpkg, {numPaages: doc.numPages, TOC: res});
  await fs.outputFile(argv.output, JSON.stringify(result, null, 2));
};

const argv = yargs
  .option('input', {alias: 'i', desc: 'path to the input PDF'})
  .option('output', {alias: 'o', desc: 'path to the output JSON'})
  .option('log', {desc: 'path to the log file'})
  .demandOption(['input', 'output'])
  .help()
  .argv;

main(argv);

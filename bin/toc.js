#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const yargs = require('yargs');
const pdfjsLib = require('pdfjs-dist/lib/pdf.js');

const nwpkg = require('../lib/nwpkg.js');
const tocExtract = require('../lib/toc-extract.js');

const main = async argv => {
  const loadingTask = pdfjsLib.getDocument(argv.input);
  const doc = await loadingTask.promise;
  const TOC = await tocExtract(doc);
  const result = Object.assign(nwpkg, {numPaages: doc.numPages, TOC});
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

#!/usr/bin/env node
'use strict';

const fs = require('fs/promises');
const path = require('path');
const yargs = require('yargs');

const outputFile = async (file, data) => {
  await fs.mkdir(path.dirname(file), {recursive: true});
  await fs.writeFile(file, data);
};
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

const nwpkg = require('../lib/nwpkg.js');
const tocExtract = require('../lib/toc-extract.js');

const main = async argv => {
  const loadingTask = pdfjsLib.getDocument(argv.input);
  const doc = await loadingTask.promise;
  const TOC = await tocExtract(doc);
  const result = Object.assign(nwpkg, {numPaages: doc.numPages, TOC});
  await outputFile(argv.output, JSON.stringify(result, null, 2));
};

const argv = yargs
  .option('input', {alias: 'i', desc: 'path to the input PDF'})
  .option('output', {alias: 'o', desc: 'path to the output JSON'})
  .option('log', {desc: 'path to the log file'})
  .demandOption(['input', 'output'])
  .help()
  .argv;

main(argv);

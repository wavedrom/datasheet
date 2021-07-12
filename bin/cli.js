#!/usr/bin/env node
'use strict';

const path = require('path');
const childProcess = require('child_process');

const fs = require('fs-extra');
const yargs = require('yargs');
const nwBin = require('nw/lib/findpath.js');
const pdfjsLib = require('pdfjs-dist/lib/pdf.js');
const pdfLib = require('pdf-lib');

const bundler = require('../lib/bundler.js');
const nwpkg = require('../lib/nwpkg.js');
const tocExtract = require('../lib/toc-extract.js');
const headFoot = require('../lib/head-foot.js');

const argv = yargs
  .option('input', {alias: 'i', desc: 'path to the source'})
  .option('output', {alias: 'o', desc: 'path to the output PDF'})
  .option('log', {desc: 'path to the log file'})
  .demandOption(['input', 'output'])
  .help()
  .argv;

const main = async () => {
  await fs.remove(path.resolve(argv.output)); // delete PDF
  await fs.remove(path.resolve('./index.html')); // delete HTML
  await fs.copy(path.resolve(__dirname, '../lib/node-main.js'), './node-main.js');

  await bundler(argv.input, path.resolve(__dirname, '../lib/nwapp.js'), './index.html');
  console.log('HTML cooked');

  nwpkg.output = path.basename(argv.output);
  if (!await fs.pathExists('./package.json')) {
    await fs.outputFile('./package.json', JSON.stringify(nwpkg, null, 2) + '\n');
  }

  const nw = childProcess.spawn(nwBin(), [path.resolve('./')], {stdio: 'inherit'});
  nw.on('close', async () => {
    console.log('PDF cooked');
    const loadingTask = pdfjsLib.getDocument(argv.output);
    const doc = await loadingTask.promise;
    const TOC = await tocExtract(doc);
    const result = Object.assign(nwpkg, {numPages: doc.numPages, TOC});
    await fs.outputFile('./package.json', JSON.stringify(result, null, 2) + '\n');

    const inputPdfBytes = await fs.readFile(argv.output);
    const pdfDoc = await pdfLib.PDFDocument.load(inputPdfBytes);
    headFoot(pdfDoc, TOC);
    const outputPdfBytes = await pdfDoc.save();
    await fs.outputFile(argv.output, outputPdfBytes);
  });
};

main();

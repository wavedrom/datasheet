'use strict';

const path = require('path');

const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const pdfLib = require('pdf-lib');

const bundler = require('../lib/bundler.js');
const nwpkg = require('../lib/nwpkg.js');
const tocExtract = require('../lib/toc-extract.js');
const headFoot = require('../lib/head-foot.js');

module.exports =  async (argv) => {
  const htmlPath = path.resolve('./index.html');
  const pdfPath  = path.resolve(argv.output);

  await fs.remove(pdfPath); // delete PDF
  await fs.remove(htmlPath); // delete HTML
  // await fs.copy(path.resolve(__dirname, '../lib/node-main.js'), './node-main.js');

  await bundler(argv.input, path.resolve(__dirname, '../lib/nwapp.js'), './index.html');
  console.log('HTML cooked');

  nwpkg.output = path.basename(argv.output);
  if (!await fs.pathExists('./package.json')) {
    await fs.outputFile('./package.json', JSON.stringify(nwpkg, null, 2) + '\n');
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('file:' + htmlPath);

  await page.pdf({
    path: pdfPath,
    printBackground: true,
    format: 'Letter'
  });

  await browser.close();
  console.log('PDF cooked');

  const loadingTask = pdfjsLib.getDocument(pdfPath);
  const doc = await loadingTask.promise;
  const TOC = await tocExtract(doc);
  const result = Object.assign(nwpkg, {numPages: doc.numPages, TOC});
  await fs.outputFile('./package.json', JSON.stringify(result, null, 2) + '\n');

  const inputPdfBytes = await fs.readFile(pdfPath);
  const pdfDoc = await pdfLib.PDFDocument.load(inputPdfBytes);
  headFoot(pdfDoc, TOC);
  const outputPdfBytes = await pdfDoc.save();
  await fs.outputFile(argv.output, outputPdfBytes);
};
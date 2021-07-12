#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const yargs = require('yargs');
const pdfLib = require('pdf-lib');
const pdfjsLib = require('pdfjs-dist/lib/pdf.js');

const argv = yargs
  .option('input', {alias: 'i', desc: 'path to the input PDF'})
  .option('output', {alias: 'o', desc: 'path to the output PDF'})
  .option('log', {desc: 'path to the log file'})
  .demandOption(['input', 'output'])
  .help()
  .argv;

const getTOC = async argv => {
  const loadingTask = pdfjsLib.getDocument(argv.input);
  const doc = await loadingTask.promise;
  console.log(doc.numPages);
  const meta = await doc.getMetadata();
  console.log(meta);
  const outline = await doc.getOutline();
  console.log(JSON.stringify(outline, null, 2));

  let res = [];
  for (let i = 1; i < doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    content.items.map(e => {
      const size = e.transform[0];

      if (size === 12.999999250333342) {
        res.push({type: 1, str: e.str, page: i});
      }
      if (size === 10.139999915259978) {
        res.push({type: 2, str: e.str, page: i});
      }
    });
  }
  return res;
};


const main = async () => {
  const inputPdfBytes = await fs.readFile(argv.input);
  const pdfDoc = await pdfLib.PDFDocument.load(inputPdfBytes);

  const TOC = await getTOC(argv);
  // console.log(TOC);

  console.log(pdfDoc.getTitle());
  pdfDoc.setTitle('DataSheet');

  console.log(pdfDoc.catalog);

  const pages = pdfDoc.getPages();

  const pageWidth = pages[0].getWidth();

  pages.map((page, i) => {
    if (i == 0) {
      return;
    }
    page.drawText((i + 1) + '', {
      x: pageWidth / 2,
      y: 20,
      size: 16
    });
  });

  // pages.map(page => {
  //   console.log(page);
  // });

  const outputPdfBytes = await pdfDoc.save();
  await fs.outputFile(argv.output, outputPdfBytes);
};

main();

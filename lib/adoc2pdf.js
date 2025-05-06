'use strict';

const path = require('path');
const fs = require('fs-extra');

const puppeteer = require('puppeteer');
const pdfjsLib = import('pdfjs-dist/legacy/build/pdf.mjs');
// const pdfLib = require('pdf-lib');

const bundler = require('./bundler.js');
// const nwpkg = require('../lib/nwpkg.js');
const tocExtract = require('./toc-extract.js');
// const headFoot = require('../lib/head-foot.js');


const tocFill = require('./toc-fill.js');

const adoc2pdf = async (opts) => {
  const adocPath = path.resolve(opts.input);
  const pdfPath  = path.resolve(opts.output);
  const outputDir = path.dirname(opts.output);
  const htmlPath = path.resolve(outputDir, 'index.html');

  // await fs.remove(pdfPath); // delete PDF
  // await fs.remove(htmlPath); // delete HTML
  // await fs.copy(path.resolve(__dirname, '../lib/node-main.js'), './node-main.js');

  const htmlDocBody = await bundler(
    adocPath,
    path.resolve(__dirname, '../lib/nwapp.js'),
    opts
  );

  await fs.outputFile(htmlPath, htmlDocBody);
  console.log('HTML1 cooked');

  // nwpkg.output = path.basename(opts.output);
  // if (!await fs.pathExists('./package.json')) {
  //   await fs.outputFile('./package.json', JSON.stringify(nwpkg, null, 2) + '\n');
  // }

  let pargs = puppeteer.defaultArgs();
  // pargs = pargs.filter((f) => f !== 'about:blank');
  // pargs = pargs.filter((f) => f !== '--headless=new');
  // pargs = pargs.filter((f) => f !== '--no-first-run');
  // pargs.push('--allow-file-access-from-files');
  // pargs.push('--enable-local-file-accesses');
  pargs.push('--no-sandbox');
  // console.log(pargs);

  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: true,
    args: pargs
  //   // args: ['--allow-file-access-from-files'],
  //   // devtools: true,
  //   // headless: false
  //   // headless: 'new'
  });

  // console.log('DEBUG DATASHEET VERSION');
  // const context = await browser.createBrowserContext();
  // const page = await context.newPage();
  const page = await browser.newPage();

  // page.setDefaultTimeout(1000000);


  // const contentHtml = await fs.readFile(htmlPath, 'utf8');
  // await page.setContent(contentHtml);

  // console.log('a1');
  await page.goto('file:' + htmlPath);
  // console.log('a2');
  // await page.goto('file://' + htmlPath, { waitUntil: 'load' });

  // await new Promise(resolve => setTimeout(resolve, 1000));

  await page.pdf({
    path: pdfPath,
    printBackground: true,
    format: 'Letter'
  });

  await browser.close();
  console.log('PDF1 cooked');

  // console.log(await pdfjsLib);
  const loadingTask = (await pdfjsLib).getDocument(pdfPath);
  const doc = await loadingTask.promise;
  const pageNumbers = await tocExtract(doc, opts);

  const htmlDocBody2 = tocFill(htmlDocBody, pageNumbers);

  await fs.outputFile(htmlPath, htmlDocBody2);
  console.log('HTML2 cooked');

  const browser2 = await puppeteer.launch({
    ignoreDefaultArgs: true,
    args: pargs
  //   // args: ['--allow-file-access-from-files'],
  //   // devtools: true,
  //   // headless: false
  //   // headless: 'new'
  });

  // console.log('DEBUG DATASHEET VERSION');
  // const context = await browser.createBrowserContext();
  // const page = await context.newPage();
  const page2 = await browser2.newPage();

  // page.setDefaultTimeout(1000000);


  // const contentHtml = await fs.readFile(htmlPath, 'utf8');
  // await page.setContent(contentHtml);

  // console.log('a1');
  await page2.goto('file:' + htmlPath);
  // console.log('a2');
  // await page.goto('file://' + htmlPath, { waitUntil: 'load' });

  // await new Promise(resolve => setTimeout(resolve, 1000));

  await page2.pdf({
    path: pdfPath,
    printBackground: true,
    format: 'Letter'
  });

  await browser2.close();
  console.log('PDF2 cooked');

  // const result = Object.assign(nwpkg, {numPages: doc.numPages, TOC});
  // console.log(result);
  // await fs.outputFile('./package.json', JSON.stringify(result, null, 2) + '\n');

  // const inputPdfBytes = await fs.readFile(pdfPath);
  // const pdfDoc = await pdfLib.PDFDocument.load(inputPdfBytes);
  // headFoot(pdfDoc, TOC);
  // const outputPdfBytes = await pdfDoc.save();
  // await fs.outputFile(pdfPath, outputPdfBytes);
};

module.exports = adoc2pdf;

/* eslint no-console: 0 */

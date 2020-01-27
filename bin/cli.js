#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');

const yargs = require('yargs');
const bundler = require('../lib/bundler.js');
const nwpkg = require('../lib/nwpkg.js');
const nwBin = require('nw/lib/findpath.js');

const argv = yargs
  .option('input', {alias: 'i', desc: 'path to the source'})
  .option('output', {alias: 'o', desc: 'path to the output PDF'})
  .option('log', {desc: 'path to the log file'})
  .demandOption(['input', 'output'])
  .help()
  .argv;

const main = async () => {
  // console.log('start');
  await bundler(argv.input, path.resolve(__dirname, '../lib/app.js'), './index1.html');
  console.log('bundler 1 done');
  await bundler(argv.input, path.resolve(__dirname, '../lib/nwapp.js'), './index.html');
  console.log('bundler 2 done');
  nwpkg.output = path.basename(argv.output);
  await fs.outputFile('./package.json', JSON.stringify(nwpkg, null, 4));
  childProcess.execFile(nwBin(), [path.resolve('./')], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    console.error(stderr);
    if (argv.log !== undefined) {
      fs.outputFile(argv.log, stderr);
    }
  });

};

main();

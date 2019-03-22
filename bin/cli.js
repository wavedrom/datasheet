#!/usr/bin/env node
'use strict';

const path = require('path');
const util = require('util');
const fs = require('fs-extra');
const childProcess = require('child_process');

const yargs = require('yargs');
const bundler = require('../lib/bundler.js');
const nwpkg = require('../lib/nwpkg.js');
const nwBin = require('nw/lib/findpath.js');

const argv = yargs
  .option('input', {alias: 'i', desc: 'path to the source'})
  .option('output', {alias: 'o', desc: 'path to the output folder'})
  .demandOption(['input', 'output'])
  .help()
  .argv;

const outputDir = path.dirname(argv.output);

const execFile = util.promisify(childProcess.execFile);

const main = async () => {

  await bundler(
    argv.input,
    path.resolve(__dirname, '../lib/app.js'),
    path.resolve(outputDir, 'index.html')
  );

  await bundler(
    argv.input,
    path.resolve(__dirname, '../lib/nwapp.js'),
    './build/index.html'
  );

  await fs.outputFile('./build/package.json', JSON.stringify(nwpkg, null, 4));
  await execFile(nwBin(), [path.resolve('./build/')], {stdio: 'inherit'});
  await fs.copy('datasheet.pdf', argv.output);
};

main();

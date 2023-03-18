#!/usr/bin/env node
'use strict';

const yargs = require('yargs');

const {adoc2pdf} = require('../lib');

const argv = yargs
  .option('input', {alias: 'i', desc: 'path to the source'})
  .option('output', {alias: 'o', desc: 'path to the output PDF'})
  .option('log', {desc: 'path to the log file'})
  .demandOption(['input', 'output'])
  .help()
  .argv;

const main = async () => {
  await adoc2pdf(argv);
};

main();

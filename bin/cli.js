#!/usr/bin/env node
'use strict';

const { program } = require('commander');

const { adoc2pdf } = require('../lib');

const main = async () => {
  program
    .requiredOption('-i, --input <file>', 'path to the source')
    .requiredOption('-o, --output <file>', 'path to the output PDF')
    .option('--log <file>', 'path to the log file')
    .parse(process.argv);

  const opts = program.opts();
  await adoc2pdf(opts);
};

main();

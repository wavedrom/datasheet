#!/usr/bin/env node
'use strict';

const { parseArgs } = require('node:util');

const { adoc2pdf } = require('../lib');

const usage = () => {
  console.error(
    'Usage: datasheet -i <file> -o <file> [-c <file>] [--log <file>]\n\n' +
    '  -i, --input <file>   path to the source (required)\n' +
    '  -o, --output <file>  path to the output PDF (required)\n' +
    '  -c, --config <file>  document template\n' +
    '      --log <file>     path to the log file'
  );
};

const main = async () => {
  let opts;
  try {
    ({ values: opts } = parseArgs({
      options: {
        input:  { type: 'string', short: 'i' },
        output: { type: 'string', short: 'o' },
        config: { type: 'string', short: 'c' },
        log:    { type: 'string' }
      }
    }));
  } catch (err) {
    console.error(err.message);
    usage();
    process.exit(1);
  }

  if (!opts.input || !opts.output) {
    console.error('error: required option \'-i, --input <file>\' and \'-o, --output <file>\' not specified');
    usage();
    process.exit(1);
  }

  await adoc2pdf(opts);
};

main();

'use strict';

const path = require('path');
const fs = require('fs/promises');
const { expect } = require('chai');

const adoc2pdf = require('../../lib/adoc2pdf.js');

describe('adoc2pdf', function () {
  this.timeout(30000);

  const outputDir = path.resolve(__dirname, 'out');
  const output = path.resolve(outputDir, 'index.pdf');

  after(async () => {
    await fs.rm(outputDir, { recursive: true, force: true });
  });

  it('generates a PDF without throwing (regression: pdfjs-dist getDocument)', async () => {
    await adoc2pdf({
      input: path.resolve(__dirname, 'src/index.adoc'),
      output
    });

    const stat = await fs.stat(output);
    expect(stat.size).to.be.greaterThan(0);
  });
});

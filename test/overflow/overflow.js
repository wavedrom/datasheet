'use strict';

const path = require('path');
const fs = require('fs/promises');
const { expect } = require('chai');

const adoc2pdf = require('../../lib/adoc2pdf.js');
const overflow = require('../../lib/overflow.js');

describe('overflow', function () {
  this.timeout(60000);

  const outputDir = path.resolve(__dirname, 'out');

  after(async () => {
    await fs.rm(outputDir, { recursive: true, force: true });
  });

  it('lengthToPx', () => {
    expect(overflow.lengthToPx(10)).to.equal(10);
    expect(overflow.lengthToPx('96px')).to.equal(96);
    expect(overflow.lengthToPx('1in')).to.equal(96);
    expect(overflow.lengthToPx('72pt')).to.equal(96);
    expect(Math.round(overflow.lengthToPx('25.4mm'))).to.equal(96);
    expect(() => overflow.lengthToPx('bogus')).to.throw();
  });

  it('maxWidthOf defaults to Letter with 15mm margins', () => {
    const w = overflow.maxWidthOf({});
    expect(Math.round(w)).to.equal(703);
    expect(overflow.maxWidthOf({maxWidth: '5in'})).to.equal(480);
    expect(Math.round(overflow.maxWidthOf({format: 'A4'}))).to.equal(681);
    expect(() => overflow.maxWidthOf({format: 'B7'})).to.throw();
  });

  it('reports a wide code snippet', async () => {
    const src = path.resolve(outputDir, 'wide.adoc');
    await fs.mkdir(outputDir, {recursive: true});
    await fs.writeFile(src, [
      '= Wide',
      ':doctype: book',
      '',
      '== Chapter 1',
      '',
      '[source,c]',
      '----',
      'void ok(void) { return; }',
      'void bad(void) { /* ' + 'A'.repeat(120) + ' */ }',
      '----',
      ''
    ].join('\n'));

    let report;
    await adoc2pdf({
      input: src,
      output: path.resolve(outputDir, 'wide.pdf'),
      onOverflow: (r) => { report = r; }
    });

    expect(report).to.be.an('object');
    expect(report.violations.length).to.be.greaterThan(0);
    const v = report.violations[0];
    expect(v.kind).to.equal('pre');
    expect(v.longestLine).to.contain('void bad');
    expect(v.overflow).to.be.greaterThan(0);
    expect(v.sectionTitle).to.contain('Chapter 1');
    expect(overflow.formatReport(report)).to.contain('void bad');
  });

  it('no violations for a narrow document', async () => {
    let report;
    await adoc2pdf({
      input: path.resolve(__dirname, '../adoc2pdf/src/index.adoc'),
      output: path.resolve(outputDir, 'narrow.pdf'),
      onOverflow: (r) => { report = r; }
    });
    expect(report).to.equal(undefined);
  });

  it('failOnOverflow throws', async () => {
    const src = path.resolve(outputDir, 'wide2.adoc');
    await fs.mkdir(outputDir, {recursive: true});
    await fs.writeFile(src, [
      '= Wide',
      '',
      '== Chapter 1',
      '',
      '----',
      'X'.repeat(200),
      '----',
      ''
    ].join('\n'));

    let err;
    try {
      await adoc2pdf({
        input: src,
        output: path.resolve(outputDir, 'wide2.pdf'),
        onOverflow: () => {},
        failOnOverflow: true
      });
    } catch (e) {
      err = e;
    }
    expect(err).to.be.an('error');
    expect(err.report.violations.length).to.be.greaterThan(0);
  });
});

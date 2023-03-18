'use strict';

const promisify = require('util').promisify;
const fs = require('fs-extra');
const path = require('path');
const asciidoctor = require('asciidoctor');
const browserify = require('browserify');

const template = require('../lib/template.js');
const style = require('../lib/style.js');
const inliner = require('../lib/inliner.js');


const a = asciidoctor({
  platform: 'node',
  runtime: {
    ioModule: 'node'
  }
});

const fonts = [
  'Open+Sans',
  'IBM+Plex+Sans',
  'Roboto+Mono'
]
  .map(e => '<link href="https://fonts.googleapis.com/css?family=' + e + '" rel="stylesheet">')
  .join('\n');

const getFront = doc => {
  let image = doc.getAttribute('title-logo-image');
  let logoPath;
  if (image) {
    logoPath = path.relative(
      process.cwd(),
      path.resolve(doc.getAttribute('imagesdir'), image)
    );
  }
  return `
  <div class="ftitle">
  ${logoPath ? '<img src="' + logoPath + '">' : ''}
  <div class="ftitle1">${doc.getTitle()}</div>
  <div class="ftitle2">${doc.getAuthor()}</div>
  </div>
  `;
};

const bundler = async (inp, dst) => {

  const b = browserify();
  const doBundle = promisify(b.bundle.bind(b));

  const highlightcss = await fs.readFile(
    path.resolve(__dirname, 'default.css'),
    'utf8'
  );
  const abody = inliner(inp, {});
  const dbody = a.load(abody);
  // const imagesdir = dbody.getAttribute('imagesdir');
  // dbody.setAttribute('imagesdir', '../' + imagesdir);
  const body = dbody.convert();

  // b.add(app);
  const script = await doBundle();

  const doc = template({
    title: 'DataSheet',
    fonts: fonts,
    style: highlightcss + style,
    front: getFront(dbody),
    body: body,
    script: script
  });

  await fs.outputFile(dst, doc);
};

module.exports = bundler;

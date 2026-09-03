'use strict';

const fs = require('fs/promises');
const path = require('path');
const asciidoctor = require('asciidoctor');
const esbuild = require('esbuild');

const defaultTemplate = require('../lib/template.js');
const style = require('../lib/style.js');
const inliner = require('../lib/inliner.js');


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

const getChaptero = (body) => {
  const lines = body.split('\n');
  const res = {};
  lines.map((line) => {
    const m = line.match(/^<h2 id="(?<id>[\w-]+)">(?<name>.+)<\/h2>$/);
    if (m) {
      res[m.groups.id] = m.groups.name;
    }
  });
  return res;
};


const bundler = async (inp, app, opts) => {
  const template = opts.template || defaultTemplate;
  const cutomStyleFn = opts?.cssFn || (() => {});

  const highlightcss = await fs.readFile(
    path.resolve(__dirname, 'default.css'),
    'utf8'
  );
  const abody = inliner(inp, {});
  const dbody = await asciidoctor.load(abody);
  // const imagesdir = dbody.getAttribute('imagesdir');
  // dbody.setAttribute('imagesdir', '../' + imagesdir);
  const body = await dbody.convert();

  const bundleResult = await esbuild.build({
    entryPoints: [app],
    bundle: true,
    write: false,
    platform: 'browser',
    format: 'iife'
  });
  const script = bundleResult.outputFiles[0].text;

  const front = (opts?.frontHtmlFn || getFront)(dbody);
  const title = (opts?.titleFn || (() => 'DataSheet'))(dbody);

  const doc = template({
    title,
    fonts,
    style: highlightcss + style + cutomStyleFn({
      title: dbody.getTitle(),
      author: dbody.getAuthor(),
      chaptero: getChaptero(body)
    }),
    front,
    body,
    script,
    document: dbody
  });
  return doc;
};

module.exports = bundler;

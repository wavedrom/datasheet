'use strict';

const promisify = require('util').promisify;
const fs = require('fs-extra');
const path = require('path');
const asciidoctor = require('asciidoctor.js');
const browserify = require('browserify');

const template = require('../lib/template.js');
const style = require('../lib/style.js');

// const regImage  = /\nimage::(.+)\[(.*)\]\n/g;
const regImage  = /image::(.+)\[(.*)\]/g;
// const regImage1 = /image::(.+)\[(.*)\]/;

const regInclude  = /\ninclude::(.+)\[\]\n/g;
const regInclude1 = /\ninclude::(.+)\[\]\n/;

const inliner = root => {
  const full = path.resolve(root);
  const dir = path.dirname(full);
  const body = fs.readFileSync(full, 'utf8');

  const body1 = body.replace(regImage, e => {
    // const inFile = e.match(regImage1);

    // const filename = inFile[1];
    // const attr = inFile[2];

//     if (filename.match(/.svg$/)) {
//       console.log(filename);
//       const buf = fs.readFileSync('assets/images/tilelink/' + filename);
//       const buf64 = buf.toString('base64');
//       return '\n++++\n' +
//         '<img src="data:image/svg+xml;base64,' + buf64 + '">' +
//         '\n++++\n';
//     }
//
//     if (filename.match(/.png$/)) {
//       console.log(filename);
//       const buf = fs.readFileSync('assets/images/tilelink/' + filename);
//       const buf64 = buf.toString('base64');
//       return '\nimage:data:image/png;base64,' + buf64 + '[]\n';
//       return '\n++++\n' +
//         '<img src="data:image/png;base64,' + buf64 + '">' +
//         '\n++++\n';
//     }
//
//     const m = attr.match(/link="(.+)"/);
//     if (m) {
//       // console.log(m);
//       return `
// [source,wavedrom]
// ----
// ${fs.readFileSync(m[1], 'utf8')}
// ----
// `;
//     }
    return e;
  });

  const body2 = body1.replace(regInclude, e => {
    const inFile = e.match(regInclude1);
    return '\n\n' + inliner(path.resolve(dir, inFile[1])) + '\n\n';
  });

  return body2;
};

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

const getFront = doc => `
<div class="ftitle">
<div class="ftitle1">${doc.getTitle()}</div>
<div class="ftitle2">${doc.getAuthor()}</div>
</div>
`;

const bundler = async (inp, app, dst) => {

  const b = browserify();
  const doBundle = promisify(b.bundle.bind(b));

  const highlightcss = await fs.readFile(
    path.resolve(__dirname, 'default.css'),
    'utf8'
  );
  const abody = inliner(inp);
  const dbody = a.load(abody);
  // const imagesdir = dbody.getAttribute('imagesdir');
  // dbody.setAttribute('imagesdir', '../' + imagesdir);
  const body = dbody.convert();

  b.add(app);
  const script = await doBundle();

  const doc = template({
    // title: 'Vector',
    fonts: fonts,
    style: highlightcss + style,
    front: getFront(dbody),
    body: body,
    script: script
  });

  await fs.outputFile(dst, doc);
};

module.exports = bundler;

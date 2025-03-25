'use strict';

const fs = require('fs-extra');
const path = require('path');

// const regImage  = /\nimage::(.+)\[(.*)\]\n/g;
const regImage  = /image::(.+)\[(.*)\]/g;
// const regImage1 = /image::(.+)\[(.*)\]/;

const regInclude  = /\ninclude::(.+)\[([a-zA-z0-9=;.\-+]*)\]\n/g;
const regInclude1 = /\ninclude::(.+)\[([a-zA-z0-9=;.\-+]*)\]\n/;

const lineRanges = (str, range) => {
  const strs = str.split('\n');
  const ranges = range
    .split(/[,;]/)
    .map(r => {
      let [from, to] = r.split('..');
      return {from: parseInt(from) - 1, to: parseInt(to)};
    });
  let res = [];
  ranges.map(range => {
    if (range.to === -1) {
      res = res.concat(strs.slice(range.from));
    } else {
      res = res.concat(strs.slice(range.from, range.to));
    }
  });
  return res.join('\n');
};

const getDirectives = str => {
  const ds = str
    .split(',')
    .flatMap(d =>(d.trim() === '') ? [] : [d.split('=')])
    .reduce((res, d) => {
      res[d[0]] = d[1];
      return res;
    }, {});
  return ds;
};

const inliner = (root, opt) => {
  // console.log(opt);
  const full = path.resolve(root);
  const dir = path.dirname(full);
  let body = '';
  try {
    body = fs.readFileSync(full, 'utf8');
  } catch (err) {
    console.error(err);
  }

  if (opt.lines !== undefined) {
    body = lineRanges(body, opt.lines);
  }

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
    return '\n\n' + inliner(path.resolve(dir, inFile[1]), getDirectives(inFile[2])) + '\n\n';
  });

  return body2;
};

module.exports = inliner;

/* eslint no-console: 0 */

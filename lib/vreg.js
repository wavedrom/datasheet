'use strict';

const onmlStringify = require('onml/stringify');
const range = require('lodash.range');

const t = (x, y) => ({transform: 'translate(' + (x || 0) + ',' + (y || 0) + ')'});

const getSvg = cfg => {
  cfg = cfg || {};
  cfg.w = cfg.w || 880;
  cfg.h = cfg.h || 256;
  return ['svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: cfg.w + 1,
    height: cfg.h + 1,
    viewBox: [0, 0, cfg.w + 1, cfg.h + 1].join(' ')
  }];
};

const render = props => {
  const {vlen, sew, lmul, slen} = props;
  const bwidth = 24;
  const hstep = bwidth * props.sew / 8;
  const vstep = 24;
  const bytes = 32;
  const hsteps = vlen / sew;
  const stripe = slen / sew;

  const head = getSvg({w: 880, h: (lmul + 1) * vstep + 4});

  const style = ['style', {}, `
    line { stroke: #000; stroke-width: 1px; }
    .vreg { font-size: 16px; alignment-baseline: middle; text-anchor: middle; }
    .rowlabel { text-anchor: start; }
    .collabel { font-size: 14px; }
  `];

  const grid = ['g', {}]
    .concat(
      range(lmul + 1).map(i =>
        ['line', {x1: 0, x2: -(hsteps * hstep),  y1: i * vstep, y2: i * vstep}]),
      range(hsteps + 1).map(i =>
        ['line', {y1: 0, y2: lmul * vstep, x1: -i * hstep, x2: -i * hstep}]));

  const colLabels = ['g', t(-bwidth / 2, -7)]
    .concat(
      range(vlen >> 3).map(i =>
        ['text', {class: 'vreg collabel', x: -i * bwidth}, i.toString(16).toUpperCase()]));

  const rowLabels = ['g', t(8, vstep >> 1)]
    .concat(
      range(lmul).map(i =>
        ['text', {class: 'vreg rowlabel', y: i * vstep}, 'v' + lmul + ' * n + ' + i]));

  const cells = ['g', t(-bwidth >> 1, (vstep >> 1) + 2)]
    .concat(
      range(lmul).map(y =>
        ['g', t(0, y * vstep)]
          .concat(
            range(hsteps).map(x =>
              ['text', {class: 'vreg', x: -x * hstep},
                (x + y * stripe + (((x / stripe)|0) * (stripe * lmul - stripe)))
                  .toString(16).toUpperCase()]))));

  return head.concat(
    [style],
    [['g', t(bwidth * bytes + 4.5, vstep + .5),
      ['text', {x: 8, y: -9, class: 'vreg rowlabel'}, 'Byte'],
      grid,
      colLabels,
      rowLabels,
      cells
    ]]);
};

module.exports = p => {
  const ml = render(p);
  const str = onmlStringify(ml);
  return str;
};

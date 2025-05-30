'use strict';


// top margin : y = 759.000001375
// bottom margin : y = 23.250032031250043

// TOC
// h1 : scale = 10.68000147499992
// h2 : scale = 9.612001327499927
// h3 : scale = 8.544001179999935

const isH1 = (e, scales) => (
  (
    (Math.abs(e.transform[0] - scales[0]) < 0.2)
    || (Math.abs(e.transform[0] - scales[1]) < 0.2)
    || (Math.abs(e.transform[0] - scales[2]) < 0.2)
  )
  && (e.transform[5] > 25)
  && (e.transform[5] < 757)
);
// const isH2 = e => (e.transform[0] > 10) && (e.transform[0] < 11); // 10.139999915259978;

module.exports = async (doc, opts) => {
  const scales = opts?.scales || [17.08800235999987, 14.952002064999885, 13.884001917499894];
  const allScales = {};
  const res = [];
  let idx1 = -1;
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();

    let yPrev = -1;
    let oPrev;
    for (const item of content.items) {
      const scale = item.transform[0];
      if (allScales[scale] === undefined) {
        allScales[scale] = 0;
      }
      allScales[scale]++;
      if (isH1(item, scales)) {
        const yCur = item.transform[5];
        if (yCur !== yPrev) {
          yPrev = yCur;
          idx1++;
          oPrev = {
            str: '',
            scale: item.transform[0],
            // y: yCur,
            page: i
          };
          res[idx1] = oPrev;
        }
        oPrev.str += item.str;
      }
    }
  }
  if(opts?.debug) {
    console.log(Object.entries(allScales).sort((a, b) => b[0] - a[0]));
  }
  res.map((row) => {
    const m = row.str.match(/^(?<cnum>[\d.]+\s)/);
    if (m) {
      row.cnum = m.groups.cnum;
    }
  });
  // // console.log(item);
  // // const m = str.match(/^(\d+)\.\s+/);
  // // if (m) {
  // // const idx = parseInt(m[1]) - 1;
  // if (res[idx1] === undefined) {
  //   res[idx1] = {};
  // }
  // res[idx1].str = str;
  // res[idx1].page = i;
  // res[idx1].items = [];
  // res[idx1].y = item.transform[5];
  // // }
  // else
  // if (isH2(e)) {
  //   const str = e.str;
  //   const m = str.match(/^(\d+)\.(\d+)\.\s+/);
  //   if (m) {
  //     console.log(str, e.transform[0]);
  //     const idx = parseInt(m[1]) - 1;
  //     const idx1 = parseInt(m[2]) - 1;
  //     if (res[idx] === undefined) {
  //       res[idx] = {
  //         items: []
  //       };
  //     }
  //     res[idx].items[idx1] = {
  //       str: e.str, page: i
  //     };
  //   }
  // }

  return res;
};

/* eslint no-console:0 */

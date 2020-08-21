'use strict';

const isH1 = e => (e.transform[0] > 12) && (e.transform[0] < 13); // 12.999999250333342;
// const isH2 = e => (e.transform[0] > 10) && (e.transform[0] < 11); // 10.139999915259978;

module.exports = async doc => {
  const res = [];
  let idx1 = -1;
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();

    content.items.map(e => {
      if (isH1(e)) {
        idx1++;
        const str = e.str;
        // console.log(str, e.transform[0]);
        // const m = str.match(/^(\d+)\.\s+/);
        // if (m) {
        // const idx = parseInt(m[1]) - 1;
        if (res[idx1] === undefined) {
          res[idx1] = {};
        }
        res[idx1].str = str;
        res[idx1].page = i;
        res[idx1].items = [];
        // }
      } // else
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
    });
  }
  return res;
};

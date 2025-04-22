'use strict';

const tocFill = (html1, pageNumbers) => {

  // console.log(pageNumbers);
  const pageNumString = `
  window.PAGE_NUMBERS = ${JSON.stringify(pageNumbers, null, 2)};
`;
  const html2 = html1.replace('/* PAGE NUMBERS */', pageNumString);
  // patch HTML with global page numbers data structure
  return html2;
};

module.exports = tocFill;

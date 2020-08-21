'use strict';

module.exports = (pdfDoc, TOC) => {
  const pages = pdfDoc.getPages();
  const pageWidth = pages[0].getWidth();
  pages.map((page, i) => {
    if (i == 0) {
      return;
    }
    page.drawText((i + 1) + '', {
      x: pageWidth / 2,
      y: 20,
      size: 12
    });
  });
};

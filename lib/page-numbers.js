'use strict';

module.exports = pkg => {
  if (pkg === undefined) {
    return;
  }
  const TOC = pkg.TOC;

  document.querySelectorAll('.sectlevel1 > li').forEach((l1, i1) => {
    const TOC1 = TOC[i1];
    if (TOC1 === undefined) {
      return;
    }
    // console.log(JSON.stringify(TOC1, null, 2));

    const n1 = document.createElement('span');
    n1.innerHTML = (TOC1.page || (i1 + 1));

    const s1 = document.createElement('span');
    s1.appendChild(n1);

    const a1 = l1.children[0];
    a1.after(s1);
  });

};

/* eslint-env browser */

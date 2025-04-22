'use strict';

const addNumber = (eL, lut) => {
  const eA = eL.children[0];
  const aName = eA.innerHTML;
  let num;
  if (lut === undefined) {
    num = ' ';
  } else {
    const found = lut.find((element) =>
      element.cnum && aName.match(new RegExp('^' + element.cnum))
    );
    // console.log(aName, found);
    if (found) {
      num = found.page;
    } else {
      num = '?';
    }
  }
  const eS = document.createElement('span');
  eL.replaceChild(eS, eA);

  eS.append(eA);

  const eDots = document.createElement('span');
  eS.append(eDots);

  const eNum = document.createElement('span');
  eNum.innerHTML = num;
  eS.append(eNum);
};

const pageNumbers = (pkg) => {

  // if (pkg === undefined) {
  //   return;
  // }
  // const TOC = pkg.TOC;

  [1, 2, 3].map((level) => {
    document.querySelectorAll('.sectlevel' + level + ' > li').forEach((el) => {
      addNumber(el, window.PAGE_NUMBERS);
    });
  });

  // const TOC1 = TOC[i1];
  // if (TOC1 === undefined) {
  //   return;
  // }
  // console.log(JSON.stringify(TOC1, null, 2));

  // document.querySelectorAll('.sectlevel2 > li').forEach((l1, i1) => {
  //   // const TOC1 = TOC[i1];
  //   // if (TOC1 === undefined) {
  //   //   return;
  //   // }
  //   // console.log(JSON.stringify(TOC1, null, 2));

  //   const n1 = document.createElement('span');
  //   n1.innerHTML = 888; // (TOC1.page || (i1 + 1));

  //   const s1 = document.createElement('span');
  //   s1.appendChild(n1);

  //   const a1 = l1.children[0];
  //   a1.after(s1);
  // });

};

module.exports = pageNumbers;

/* eslint-env browser */

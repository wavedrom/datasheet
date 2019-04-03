(function () {
  'use strict';

var words = 'Lorem ipsum do&shy;lor sit amet, conse&shy;ctetur adipi&shy;sicing elit, sed do eiu&shy;smod tempor inci&shy;di&shy;dunt ut la&shy;bore et dolore magna aliqua. Ut enim ad minim veni&shy;am, quis nostrud exe&shy;rcitation ulla&shy;mco labo&shy;ris nisi ut aliquip ex ea commo&shy;do con&shy;sequ&shy;at. Dui&shy;s aute irure dolor in repre&shy;hende&shy;rit in voluptate velit esse cillum dolore eu fugi&shy;at nulla pari&shy;atur. Exce&shy;pteur sint occaecat cupidatat non proi&shy;dent, sunt in culpa qui offi&shy;cia deserunt mollit anim id est laborum'.split(' ');

function randomT (l1) {
  var res = [];
  var wlen = words.length;
  var index, i, ilen = l1 * Math.random() + l1 / 2;
  for (i = 0; i < ilen; i++) {
      index = Math.round(wlen * Math.random());
      res.push(words[index]);
  }
  return res.join(' ');
}

function randomSection (l1, l2) {
    var res = [];
    var i, ilen = l2 * Math.random() + l2 / 2;
    res.push('<h3>' + randomT(3) + '</h3>');
    for (i = 0; i < ilen; i++) {
      res.push('<p>');
      res.push(randomT(l1));
      res.push('</p>');
    }
    return res.join(' ');
}

function randomChapter (l1, l2, l3) {
  var res = [];
  var i, ilen = l3 * Math.random() + l3 / 2;
  res.push('<h2>' + randomT(3) + '</h2>');
  for (i = 0; i < ilen; i++) {
    res.push(randomSection(l1, l2));
  }
  return res.join(' ');
}

function randomBook (l1, l2, l3, l4) {
  var res = [];
  var i, ilen = l4 * Math.random() + l4 / 2;
  for (i = 0; i < ilen; i++) {
    res.push(randomChapter(l1, l2, l3));
  }
  return res.join(' ');
}

function nwPrint () {
  if (nw === undefined) {
      return;
  }

  var fs = require('fs'),
      path = require('path');

  var dumpFileName = path.resolve(process.env.PWD, 'datasheet.pdf');

  var win = nw.Window.get();

  setTimeout(function () {
      win.print({
          pdf_path: path.resolve(dumpFileName),
          headerFooterEnabled: false,
          shouldPrintBackgrounds: true,
          marginsType: 3,
          marginsCustom: {
            marginBottom: 20,
            marginLeft: 60,
            marginRight: 60,
            marginTop: 20
          },
          mediaSize: {
            name: 'CUSTOM',
            width_microns: 215900,
            height_microns: 279400,
            custom_display_name: 'Letter',
            is_default: true
          }
      });
      setTimeout(function () {
          process.exit(0);
      }, 7000);
  }, 3000);
}

var styleSpacer = document.getElementById('styleSpacer');

const dy = 949 + 53; // 27 + 27;
const h = 30 + 30;
const w = 653; // 654;
const pages = 200;
const ypad = 9 + 30;

const comb = () => {
  let res = [];
  for (let i = 0; i < pages; i++) {
    res.push(`0 ${i * dy - ypad}px, ${w}px ${i * dy - ypad}px, ${w}px ${i * dy + h - ypad}px, 0 ${i * dy + h - ypad}px`);
  }
  console.log(res);
  return res.join(',\n');
};

const headers = pages => {
  let res = [];
  for (let i = 1; i <= pages; i++) {
    res.push('<div class="hdr" style="top: ' + (i * dy) + 'px;">' + (i + 1) + '</div>');
  }
  return res.join('');
};

styleSpacer.innerHTML = `
#spacer {
  shape-outside: polygon(${comb()});
  width: ${w}px;
  height: ${(pages - 1) * dy + 10}px;
  /* border: 1px solid #000; */
  float: left;
  padding: 0px;
  margin: 0px;
}
#headerl {
  z-index: 5;
  position: fixed;
  text-align: right;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 15px;
  font-size: 16px;
  border: 1px solid #f00;
  background: rgba(255, 0, 0, 0.1);
}
#footerl {
  z-index: 5;
  position: fixed;
  text-align: right;
  bottom: 0px;
  left: 0px;
  width: 100px;
  height: 15px;
  font-size: 16px;
  border: 1px solid #00f;
  background: rgba(0, 0, 255, 0.1);
}
#headerr {
  z-index: 5;
  position: fixed;
  text-align: left;
  top: 0px;
  right: 0px;
  width: 100px;
  height: 15px;
  font-size: 16px;
  border: 1px solid #f00;
  background: rgba(255, 0, 0, 0.1);
}
#footerr {
  z-index: 5;
  position: fixed;
  text-align: left;
  bottom: 0px;
  right: 0px;
  width: 100px;
  height: 15px;
  font-size: 16px;
  border: 1px solid #00f;
  background: rgba(0, 0, 255, 0.1);
}
`;

var contentDiv = document.getElementById('content');

contentDiv.innerHTML = randomBook(100, 10, 10, 10);

var headersDiv = document.getElementById('headers');

headersDiv.innerHTML = headers(pages);

nwPrint();

})();
/* eslint strict: 0, indent: 0 */

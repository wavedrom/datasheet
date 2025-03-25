'use strict';

/*
    get callback when @media changes.
    usefull to perform some operations in "@media print" context.
*/

module.exports = handler => {
  const sheets = document.styleSheets;
  for (let i = 0, ilen = sheets.length; i < ilen; i++) {
    try {
      const rules = sheets[i].cssRules;
      for (let j = 0, jlen = rules.length; j < jlen; j++) {
        if (rules[j].constructor === CSSMediaRule) {
          const mql = window.matchMedia(rules[j].media.mediaText);
          mql.addListener(handler);
          console.log(mql);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
};

/* eslint-env browser */
/* eslint no-console: 0 */

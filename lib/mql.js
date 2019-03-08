'use strict';

/*
    get callback when @media changes.
    usefull to perform some operations in "@media print" context.
*/

function mql (handler) {
    var sheets, rules, mlq, i, ilen, j, jlen;

    sheets = document.styleSheets;
    for (i = 0, ilen = sheets.length; i < ilen; i++) {
        rules = sheets[i].cssRules;
        for (j = 0, jlen = rules.length; j < jlen; j++) {
            if (rules[j].constructor === CSSMediaRule) {
                var mql = window.matchMedia(rules[j].media.mediaText);
                mql.addListener(mediaChangeHandler);
            }
        }
    }
}

module.exports = mql;

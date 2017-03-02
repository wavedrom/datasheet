(function () {
    'use strict';

var words = 'Lorem ipsum do&shy;lor sit amet, conse&shy;ctetur adipi&shy;sicing elit, sed do eiu&shy;smod tempor inci&shy;di&shy;dunt ut la&shy;bore et dolore magna aliqua. Ut enim ad minim veni&shy;am, quis nostrud exe&shy;rcitation ulla&shy;mco labo&shy;ris nisi ut aliquip ex ea commo&shy;do con&shy;sequ&shy;at. Dui&shy;s aute irure dolor in repre&shy;hende&shy;rit in voluptate velit esse cillum dolore eu fugi&shy;at nulla pari&shy;atur. Exce&shy;pteur sint occaecat cupidatat non proi&shy;dent, sunt in culpa qui offi&shy;cia deserunt mollit anim id est laborum'.split(' ');

function randomText () {
    var res = [];
    var wlen = words.length;
    var index, i, ilen = 500 * Math.random();
    res.push('<p>');
    for (i = 0; i < ilen; i++) {
        index = Math.round(wlen * Math.random());
        res.push(words[index]);
    }
    res.push('</p>');
    return res.join(' ');
}

function randomChapter () {
    var res = [];
    var i, ilen = 20 * Math.random();
    res.push('<div>');
    for (i = 0; i < ilen; i++) {
        res.push(randomText());
    }
    res.push('</div>');
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
            headerFooterEnabled: false
        });
        setTimeout(function () {
            process.exit(0);
        }, 7000);
    }, 3000);
}

var contentDiv = document.getElementById('content');

contentDiv.innerHTML = randomChapter();

nwPrint();

})();

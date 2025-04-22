'use strict';

module.exports = `
pre, code {
  font-family: 'Roboto Mono', monospace;
  background-color: #eee;
}
pre {
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  display: block;
  padding: 10px 0px 10px 0px;
}
body {
  font-size: 16px;
  /* font-family: 'Open Sans', sans-serif; */
  font-family: 'IBM Plex Sans', sans-serif;
  hyphens: none;
}
.title {
  text-align: center;
}
.imageblock > .content > img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.note {
  font-size: 0.875em;
  padding: 2px;
}
.important {
  background: hsla(58, 100%, 86%, 1);
  padding: 8px;
  margin: 8px 0px 8px 0px;
  border: 2px solid #999;
}

.note .icon {
  width: 40px;
}

.note .content {
  padding-left: 8px;
  border-left: 2px solid #aaa;
}


.tip .icon {
  width: 40px;
}

.tip .content {
  padding-left: 8px;
  border-left: 2px solid #aaa;
}


.important .icon {
  width: 80px;
}

.important .content {
  padding-left: 8px;
  border-left: 2px solid #aaa;
}


.caution .icon {
  width: 80px;
}

.caution .content {
  padding-left: 8px;
  border-left: 2px solid #aaa;
}


.warning .icon {
  width: 80px;
}

.warning .content {
  padding-left: 8px;
  border-left: 2px solid #aaa;
}

#toctitle {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #003262;
}

.toc ul { list-style-type: none; }

.toc li { padding-top: 0.2em; }

.ftitle {
  margin: 4em;
}
.ftitle1 { margin: 2em; font-size: 3em; }
.ftitle2 { margin: 2em; font-size: 2em; }
.ftitle3 { margin: 1em; font-size: 1em; }

table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  padding-bottom: 4px;
}

.tableblock {
  padding: 1px 4px 1px 4px;
  margin: 0px;
}

.imageblock {
  padding: 16px 0px 8px 0px;
  margin: 0px;
}

.frame-all {
  margin: 8px 0px 16px 0px;
}

.tableblock td, .tableblock th {
  border: 1px solid #000;
}

th.halign-right, td.halign-right { text-align: right; }
th.halign-left, td.halign-left { text-align: left; }

.title {
  padding-top: 8px;
}

h2 {
  color: #003262;
  font-size: 32px;
}

h3 {
  font-size: 28px;
}

h4 {
  font-size: 26px;
}

.note { text-align: justify; }

.hdlist1 {
  font-weight: bold;
}

.hljs {
  overflow-x: hidden;
}

@media screen and (min-width: 1400px) {
  #toc {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: min(820px, calc(100% - 1000px));
    overflow: auto;
  }
  body {
    padding-left: min(820px, calc(100% - 1000px));
  }
}

@media screen {
  table {
    border-color: #000;
    border-width: 1px;
  }
  img {
    max-width: 968px;
  }
  .container {
    max-width: 968px;
    margin: 0 auto;
  }

  a {
    color: #003262;

  }

}

@media print {
  p {
    widows: 3;
    orphans: 3;
  }
  img {
    max-width: 800px;
  }
  a {
    text-decoration-line: none;
    color: #000;
  }
  body {
    font-size: 20px;
  }

${[20, 18, 16].map((size, idx) => `\
  .sectlevel${idx + 1} > li {
    font-size: ${size}px;
    /* padding: 0; */
    margin: 6px 0 6px 0;
    span {
      display: flex;
      a {
        flex-shrink: 0;
        margin-left: 12px;
        margin-right: 12px;
      }
      a + span:after {
        content: ".................................................................................."
      }
      a + span {
        height: 1em;
        overflow: hidden;
        word-wrap: break-word;
        color: #999;
        letter-spacing: 8px;
        margin: 0 8px;
      }
    }
  }
`).join('')}


  #toc { page: toc; }
  @page toc { @top-right { content: "Table of Contents"; }}

  @page {
    margin-top:    20mm;
    margin-bottom: 20mm;
    font-size: 18px;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  @page :first {
    margin-top:    20mm;
    margin-bottom: 20mm;
    @top-left-corner      { content: none; }
    @top-left             { content: none; }
    @top-center           { content: none; }
    @top-right            { content: none; }
    @top-right-corner     { content: none; }
    @bottom-left-corner   { content: none; }
    @bottom-left          { content: none; }
    @bottom-center        { content: none; }
    @bottom-right         { content: none; }
    @bottom-right-corner  { content: none; }
  }

  @page :left  { @bottom-left-corner  { content: counter(page); }}
  @page :right { @bottom-right-corner { content: counter(page); }}

  @page :left {
    margin-left:  15mm;
    margin-right: 15mm;
  }
  @page :right {
    margin-left:  15mm;
    margin-right: 15mm;
  }

  h2 {
    break-before: page;
    page-break-before: page;
  }
  h2, h3, h4, h5 {
    break-after: avoid-page;
    page-break-after: avoid-page;
  }
  pre {
    font-size: 12pt;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .listingblock {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .ftitle {
    text-align: center;
    margin-top: 50%;
    break-after: always;
    page-break-after: always;
  }
  .toc {
    page-break-after: always;
  }
  .note {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .important {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  table {
    page-break-inside: avoid;
  }
}

`;

// `
// #spacer {
//   shape-outside: polygon(0 0, 800px 0, 800px 50px, 0 50px, 0 700px, 800px 700px, 800px 750px, 0 750px, 0 1500px, 800px 1500px, 800px 1550px, 0 1550px);
//   width: 800px;
//   height: 3200px;
//   float: left;
// }
// `;

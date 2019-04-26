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
  hyphens: auto;
}
.note {
  font-size: 0.875em;
  padding: 2px;
}
.icon .title {
  display: none;
}
.icon {
  width: 8px;
  border-right: 3px solid #999;
  margin: 3px;
}
.note .content {
  padding-left: 16px;
}

#toctitle {
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  color: #003262;
}

.toc ul { list-style-type: none; }

.toc li { padding-top: 0.2em; }

.sectlevel1 li { font-size: 1.5rem; }

.sectlevel2 li { font-size: 1.2rem; }

.ftitle {
  margin: 4em;
}
.ftitle1 {
  margin: 2em;
  font-size: 2em;
}
.ftitle2 {
  margin: 2em;
  font-size: 1.5em;
}

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

.frame-all {
  margin: 8px 0px 8px 0px;
}

.tableblock td, .tableblock th {
  border: 1px solid #999;
}

.halign-left {
  text-align: left;
}

.title {
  padding-top: 8px;
}

h2 {
  color: #003262;
}

.note, p {
  text-align: justify;
}

.hljs {
  overflow-x: hidden;
}

@media screen {
  .container {
    max-width: 968px;
    margin: 0 auto;
  }

  a {
    color: #003262;
  }

}

@media print {
  a {
    text-decoration-line: none;
    color: #000;
  }
  body {
    font-size: 14pt;
  }

  h1 {
    string-set: header content();
  }

  @page {
    @top-center {
      content: "top-center"; border: solid green;
    }
  }

  @page {
    @bottom-center {
      content: "bottom-center"; border: solid green;
    }
  }

  @page {
    margin-top: 15mm;
    margin-bottom: 15mm;
  }
  @page :left {
    margin-left: 25mm;
    margin-right: 15mm;
  }
  @page :right {
    margin-left: 15mm;
    margin-right: 25mm;
  }
  @page :first {
    margin-left: 20mm;
    margin-right: 20mm;
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
  .note {
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

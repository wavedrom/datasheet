Production quality [Datasheet](https://en.wikipedia.org/wiki/Datasheet) generator using Web technologies: Markdown, SVG, HTML, CSS, JS.

## CLI Usage

### With install

```
npm i datasheet
datasheet -i myspec.adoc -o myspec.pdf
```

### Without installing

```
npx datasheet -i myspec.adoc -o myspec.pdf
```

## Width overflow reporting

One element wider than the printable page area makes Chrome shrink *every* page
(shrink-to-fit), which changes the page count and breaks page numbering and the
TOC. `adoc2pdf` reports such elements with a locator, so they can be fixed at
the source.

Reporting only: no styling and no PDF output is changed. The measurement runs
after the first PDF is written, on the page that is about to be discarded.

### Options

| option | default | meaning |
|---|---|---|
| `format` | `'Letter'` | page format used for the width budget |
| `marginLeft` / `marginRight` | `'15mm'` | side margins used for the width budget |
| `maxWidth` | derived | explicit budget: number of px or `'6.5in'`, `'170mm'`, `'520pt'`, ... |
| `tolerance` | `0.5` | px slack before reporting |
| `checkWidth` | `true` | run the check |
| `onOverflow` | console report | `(report) => {}` |
| `failOnOverflow` | `false` | throw after reporting; the error carries `err.report` |
| `reportClipped` | `false` | also report content clipped by `overflow: hidden` (`true`, or a selector to scope it) |
| `overflowDebug` | `false` | add `report.widest`: the 20 rightmost elements |

Default budget: Letter minus 15mm side margins = `702.61px`.

### Report

```js
{
  maxWidth: 702.61,
  violations: [{
    selector, tag, id, class,          // locator
    sectionId, sectionTitle,           // nearest enclosing heading
    kind,                              // 'pre', 'table', 'img', ...
    reason,                            // 'edge' (widens the page) | 'clip'
    width, contentRight, scrollWidth, clientWidth,
    overflow, edgeOverflow, clipOverflow,
    charWidth, maxChars, excessChars,  // monospace estimates, for `pre`
    longestLine, longestLineLength, text
  }]
}
```

Only the innermost offenders are reported. Elements that cannot widen the page
are ignored: SVG internals (the `<svg>` root clips) and anything inside a
horizontally clipping ancestor. Non-wrapping text (`white-space: pre`) is
measured with a `Range`, so literal blocks without a `<code>` wrapper are
caught too.

### Standalone use on any puppeteer page

```js
const {checkOverflow, formatOverflowReport} = require('datasheet');

const report = await checkOverflow(page, {format: 'Letter'});
if (report.violations.length > 0) {
  console.error(formatOverflowReport(report));
}
```

## References

[F. Raymond Dewey. A Complete Guide to Data Sheets](https://www.allegromicro.com/-/media/files/technical-documents/complete-guide-to-datasheets-pub26000.pdf)
'use strict';

// Detect elements that are wider than the printable page width.
//
// Chrome/puppeteer silently shrinks *all* pages when a single element
// overflows the printable width. That changes the page count, breaks the
// page-number extraction and the TOC. This module only *reports* the
// offenders; it does not change any styling or PDF output.

const PX_PER_IN = 96;
const PX_PER_MM = PX_PER_IN / 25.4;

const PAGE_SIZES_IN = { // width x height, inches
  Letter: [8.5, 11],
  Legal: [8.5, 14],
  Tabloid: [11, 17],
  Ledger: [17, 11],
  A0: [33.1, 46.8],
  A1: [23.4, 33.1],
  A2: [16.54, 23.4],
  A3: [11.7, 16.54],
  A4: [8.27, 11.7],
  A5: [5.83, 8.27],
  A6: [4.13, 5.83]
};

const lengthToPx = (val) => {
  if (val === undefined || val === null) {
    return 0;
  }
  if (typeof val === 'number') {
    return val;
  }
  const m = String(val).trim().match(/^(-?[\d.]+)\s*(px|in|mm|cm|pt|pc)?$/);
  if (!m) {
    throw new Error('overflow: cannot parse length: ' + val);
  }
  const num = parseFloat(m[1]);
  switch (m[2] || 'px') {
  case 'px': return num;
  case 'in': return num * PX_PER_IN;
  case 'mm': return num * PX_PER_MM;
  case 'cm': return num * 10 * PX_PER_MM;
  case 'pt': return num * PX_PER_IN / 72;
  case 'pc': return num * PX_PER_IN / 6;
  }
};

// printable width in CSS px for a given page format and side margins
const maxWidthOf = (opts) => {
  const o = opts || {};
  if (o.maxWidth !== undefined) {
    return lengthToPx(o.maxWidth);
  }
  const format = o.format || 'Letter';
  const size = PAGE_SIZES_IN[format];
  if (size === undefined) {
    throw new Error('overflow: unknown page format: ' + format);
  }
  const landscape = !!o.landscape;
  const widthIn = landscape ? size[1] : size[0];
  // datasheet's default print stylesheet uses 15mm left/right margins
  const marginLeft = lengthToPx(o.marginLeft !== undefined ? o.marginLeft : '15mm');
  const marginRight = lengthToPx(o.marginRight !== undefined ? o.marginRight : '15mm');
  return widthIn * PX_PER_IN - marginLeft - marginRight;
};

// runs inside the browser
const collect = (maxWidth, tolerance, sample, clipSelector, debug) => {
  const isBlank = (s) => s.replace(/\s/g, '') === '';

  const selectorOf = (el) => {
    const parts = [];
    let node = el;
    while (node && node.nodeType === 1 && parts.length < 8) {
      if (node.id) {
        parts.unshift('#' + node.id);
        break;
      }
      let part = node.tagName.toLowerCase();
      const cls = (node.getAttribute('class') || '').trim().split(/\s+/)
        .filter(c => c !== '').slice(0, 2);
      if (cls.length) {
        part += '.' + cls.join('.');
      }
      const parent = node.parentElement;
      if (parent) {
        const sibs = Array.prototype.filter.call(
          parent.children, c => c.tagName === node.tagName
        );
        if (sibs.length > 1) {
          part += ':nth-of-type(' + (sibs.indexOf(node) + 1) + ')';
        }
      }
      parts.unshift(part);
      node = node.parentElement;
    }
    return parts.join(' > ');
  };

  const sectionOf = (el) => {
    let node = el;
    while (node && node.nodeType === 1) {
      const h = node.querySelector
        ? node.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6')
        : null;
      if (h) {
        return {id: h.id || null, title: h.textContent.trim().slice(0, 120)};
      }
      node = node.parentElement;
    }
    return {id: null, title: null};
  };

  // char width of the element font, to convert px overflow into characters
  const charWidthOf = (el) => {
    const probe = document.createElement('span');
    const cs = getComputedStyle(el);
    probe.style.font = cs.font || (cs.fontSize + ' ' + cs.fontFamily);
    probe.style.whiteSpace = 'pre';
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.textContent = '0'.repeat(100);
    document.body.appendChild(probe);
    const w = probe.getBoundingClientRect().width / 100;
    probe.remove();
    return w;
  };

  const longestLineOf = (el) => {
    const lines = el.textContent.split('\n');
    let best = '';
    for (const line of lines) {
      if (line.length > best.length) {
        best = line;
      }
    }
    return best;
  };

  // an element inside a horizontally clipping ancestor cannot widen the page
  const clippedByAncestor = (el) => {
    let node = el.parentElement;
    while (node && node !== document.body) {
      const cs = getComputedStyle(node);
      const ox = cs.overflowX;
      if (ox === 'hidden' || ox === 'clip' || ox === 'scroll' || ox === 'auto') {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  };

  // widest right edge of the element's own text content; needed for
  // non-wrapping text (white-space: pre) that has no element wrapper
  const textRight = (el) => {
    let right = -Infinity;
    for (const node of el.childNodes) {
      if (node.nodeType !== 3 || node.nodeValue.trim() === '') {
        continue;
      }
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of range.getClientRects()) {
        if (r.right > right) {
          right = r.right;
        }
      }
      range.detach();
    }
    return right;
  };

  const matchesClip = (el) =>
    clipSelector !== null && el.matches(clipSelector);

  // skip elements that cannot influence the printed page width
  const skip = (el, cs) => (
    cs.display === 'none'
    || cs.visibility === 'hidden'
    // SVG internals: the <svg> root clips (overflow: hidden), so only the
    // root's own box matters
    || !!el.ownerSVGElement
    // clipped content cannot widen the page -> irrelevant for shrink-to-fit,
    // only reported for the opted-in element kinds
    || (clippedByAncestor(el) && !matchesClip(el))
  );

  const rightEdgeOf = (el, cs, rect) => {
    if (cs.whiteSpace !== 'pre' && cs.whiteSpace !== 'nowrap') {
      return rect.right;
    }
    return Math.max(rect.right, textRight(el));
  };

  const measure = (el) => {
    const cs = getComputedStyle(el);
    if (skip(el, cs)) {
      return null;
    }
    const clipped = clippedByAncestor(el);
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return null;
    }
    // right edge past the printable area (viewport is set to maxWidth)
    const right = rightEdgeOf(el, cs, rect);
    const edgeOverflow = right - maxWidth;
    // Content clipped inside the element (overflow: hidden / scroll).
    // Clipped content cannot widen the page, so it never triggers the
    // shrink-to-fit; and datasheet clips on purpose (TOC leader dots,
    // .hljs). Off by default: opt in with reportClipped: true.
    // scrollWidth/clientWidth are rounded integers, so sub-pixel layout
    // routinely yields a bogus 1px delta -> only trust it when the content
    // itself is wider than the printable width.
    const clipOverflow = el.clientWidth > 0
      ? el.scrollWidth - el.clientWidth
      : 0;
    const clipCounts = clipOverflow > 2
      && el.scrollWidth > maxWidth + tolerance
      && matchesClip(el);
    const over = Math.max(
      edgeOverflow,
      clipCounts ? clipOverflow : 0
    );
    if (over <= tolerance) {
      return null;
    }
    return {
      el, over, edgeOverflow, clipOverflow, rect, right,
      reason: (!clipped && edgeOverflow > tolerance) ? 'edge' : 'clip'
    };
  };

  const violations = [];
  const overflowing = new Set();
  const widest = [];
  for (const el of document.querySelectorAll('body *')) {
    if (debug) {
      const r = el.getBoundingClientRect();
      widest.push({
        selector: null, el,
        right: Math.round(r.right * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth
      });
    }
    const v = measure(el);
    if (v !== null) {
      overflowing.add(el);
      violations.push(v);
    }
  }

  // keep only the innermost offenders: an ancestor is wide only because
  // its child is wide
  const hasOverflowingChild = (el) => {
    for (const child of el.querySelectorAll('*')) {
      if (overflowing.has(child)) {
        return true;
      }
    }
    return false;
  };

  const describe = (v) => {
    const el = v.el;
    const section = sectionOf(el);
    const preEl = el.closest('pre');
    const isPre = preEl !== null;
    // highlight.js wraps tokens in spans: report the whole source line
    const longestLine = isPre ? longestLineOf(preEl) : '';
    const charWidth = isPre ? charWidthOf(el) : 0;
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    return {
      selector: selectorOf(el),
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      class: el.getAttribute('class') || null,
      sectionId: section.id,
      sectionTitle: section.title,
      width: Math.round(v.rect.width * 100) / 100,
      contentRight: Math.round(v.right * 100) / 100,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      overflow: Math.round(v.over * 100) / 100,
      edgeOverflow: Math.round(v.edgeOverflow * 100) / 100,
      clipOverflow: v.clipOverflow,
      reason: v.reason,
      kind: isPre ? 'pre' : el.tagName.toLowerCase(),
      charWidth: charWidth ? Math.round(charWidth * 1000) / 1000 : null,
      maxChars: charWidth ? Math.floor(maxWidth / charWidth) : null,
      excessChars: charWidth ? Math.ceil(v.over / charWidth) : null,
      longestLine: longestLine
        ? longestLine.slice(0, sample)
        : null,
      longestLineLength: longestLine ? longestLine.length : null,
      text: isBlank(text) ? null : text.slice(0, sample)
    };
  };

  const res = violations
    .filter(v => !hasOverflowingChild(v.el))
    .map(describe);

  if (!debug) {
    return {violations: res};
  }
  const top = widest
    .sort((a, b) => b.right - a.right)
    .slice(0, 20)
    .map(w => {
      w.selector = selectorOf(w.el);
      delete w.el;
      return w;
    });
  return {violations: res, widest: top};
};

// Measure a puppeteer page against the printable width.
// Returns {maxWidth, violations: [...]}
const checkOverflow = async (page, opts) => {
  const o = opts || {};
  const maxWidth = maxWidthOf(o);
  const tolerance = o.tolerance === undefined ? 0.5 : lengthToPx(o.tolerance);
  const sample = o.sample || 200;
  // clipped content cannot widen the page, but it is silently truncated,
  // so it is still worth reporting for a few element kinds
  const clipSelector = (o.reportClipped === true)
    ? 'pre, pre *, code, table, img, svg, object'
    : (typeof o.reportClipped === 'string' ? o.reportClipped : null);
  const debug = !!o.overflowDebug;

  const viewport = page.viewport();
  await page.setViewport({
    width: Math.ceil(maxWidth),
    height: (viewport && viewport.height) || 1024,
    deviceScaleFactor: 1
  });
  await page.emulateMediaType('print');

  const out = await page.evaluate(
    collect, maxWidth, tolerance, sample, clipSelector, debug
  );

  await page.emulateMediaType(null);
  if (viewport) {
    await page.setViewport(viewport);
  }

  return {maxWidth, violations: out.violations, widest: out.widest};
};

const formatReport = (report) => {
  const lines = [
    `overflow: ${report.violations.length} element(s) wider than ` +
    `${Math.round(report.maxWidth * 100) / 100}px printable width`
  ];
  for (const v of report.violations) {
    lines.push(
      `  ${v.selector}` +
      (v.sectionTitle ? `\n    section: ${v.sectionTitle}` +
        (v.sectionId ? ` (#${v.sectionId})` : '') : '') +
      `\n    width: ${v.width}px  content: ${v.scrollWidth}px  ` +
      `over by: ${v.overflow}px (${v.reason})` +
      (v.excessChars ? ` (~${v.excessChars} chars, max ~${v.maxChars})` : '') +
      (v.longestLine ? `\n    longest line: ${JSON.stringify(v.longestLine)}` : '') +
      (!v.longestLine && v.text ? `\n    text: ${JSON.stringify(v.text)}` : '')
    );
  }
  if (report.widest) {
    lines.push('  widest elements (debug):');
    for (const w of report.widest) {
      lines.push(`    right: ${w.right}px  width: ${w.width}px  ` +
        `scroll: ${w.scrollWidth}px  client: ${w.clientWidth}px  ${w.selector}`);
    }
  }
  return lines.join('\n');
};

module.exports = {
  PX_PER_IN,
  PX_PER_MM,
  PAGE_SIZES_IN,
  lengthToPx,
  maxWidthOf,
  checkOverflow,
  formatReport
};

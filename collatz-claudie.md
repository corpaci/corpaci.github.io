---
layout: page
title: Collatz Claudie
subtitle: One step, fifty orbits, and whether 4 → 2 → 1 pulls. A second take, alongside the other playground.
permalink: /collatz-claudie/
description: "An interactive Collatz simulator: the single-step map, trajectories for the first fifty primes, and the 4-2-1 cycle drawn as an attractor."
epistemic_status: Playground
epistemic_note: The Collatz conjecture is open. Everything here is computed from the map itself, so the plots are exact for the range shown; the gravitational reading in the third figure is a stated analogy, not a physical claim or a proof.
---

The rule is one line. For a positive integer $n$, the map is $T(n) = n/2$ when $n$ is even, and $T(n) = 3n + 1$ when $n$ is odd. Halve it, or treble it and add one.

The conjecture is that iterating $T$ from any starting point reaches 1. It has been checked past $2^{68}$ and remains unproven.

<div class="cx-controls">
  <label>Integers on Ox <input type="range" id="cx-n" min="40" max="600" value="220" step="20"><output id="cx-n-out">220</output></label>
  <label>Primes traced <input type="range" id="cx-p" min="5" max="50" value="50" step="5"><output id="cx-p-out">50</output></label>
</div>

## 1 · One application of the rule

Every integer on Ox, the value it maps to on Oy. The rule splits cleanly into two branches, which is the whole engine of the problem: odd numbers are thrown far up the line $3n+1$, even numbers fall to $n/2$. Nothing else happens, ever.

<figure class="cx-fig">
  <div class="cx-legend" id="cx-lg1"></div>
  <svg id="cx-p1" class="cx-svg" role="img" aria-label="Scatter of each integer against its image under one Collatz step, split into odd and even branches."></svg>
  <figcaption>Odd inputs land on the upper ray, even inputs on the lower. Note that neither branch falls here: both rays rise, at slopes 3 and 1/2. The descent lives in the iteration, not in this graph. Multiplicatively the two moves are a tripling against a halving, which in the log scale of the next two figures is 1.585 up against exactly 1 down.</figcaption>
</figure>

## 2 · Fifty primes, followed to the end

Each path starts at a prime and applies the rule to its own output, over and over, until it reaches 1. Ox is the step index, Oy the value on a logarithmic scale, since the excursions are far too tall to plot linearly.

<figure class="cx-fig">
  <div class="cx-legend" id="cx-lg2"></div>
  <svg id="cx-p2" class="cx-svg" role="img" aria-label="Collatz trajectories for the first fifty primes, value against step index on a log scale."></svg>
  <figcaption>Darker paths start from larger primes. Hover any path to isolate it. Every one of them ends in the same place.</figcaption>
</figure>

## 3 · Is 4 → 2 → 1 a gravitational point?

Here is the honest version of the analogy, and then the picture.

Take **altitude** to be $\log_2 n$. Then an even step lowers altitude by exactly 1, and an odd step raises it by $\log_2(3 + 1/n)$, just under 1.585. Because $3n+1$ is always even, every rise is immediately followed by at least one fall. Averaged over a trajectory the altitude drifts **down**, which is the usual heuristic for why the conjecture ought to be true. The number below reports that drift, and then explains why you should not be impressed by it.

<div class="cx-stat">
  <div class="cx-stat-value" id="cx-drift">·</div>
  <div class="cx-stat-label">mean change in altitude per step across the traced primes<br>negative, but read the caveat below before believing it means anything</div>
</div>

**This number is bookkeeping, not evidence, and it is worth being precise about why.** Summed over a trajectory the altitude changes telescope, so the mean is just $\bigl(\log_2 1 - \log_2 p\bigr)$ divided by the step count. Every trajectory here ends at 1 by selection, so the numerator is fixed before any dynamics are consulted. The quantity carries no information beyond which primes were chosen and how many steps they took. I verified that identity numerically and initially recorded it as a confirmation; it is better read as a deflation. A negative average drift is also exactly what a fair coin would give you, and a coin proves nothing about a deterministic parity sequence.

What the polar view below does add is falsifiability. Radius is $\log_2 n$, which depends only on the state, so it is defined for every integer whether or not it reaches 1. A divergent trajectory would climb and leave the frame. The figure can be contradicted by its own subject.

**What the angle does not add.** It advances one notch per step and carries no dynamical information at all, so this figure is the previous one bent into a circle. The inward motion is real, since radius tracks the state. The *spiral* is decoration, and the orbital reading it invites is not in the data.

<figure class="cx-fig">
  <div class="cx-legend" id="cx-lg3"></div>
  <svg id="cx-p3" class="cx-svg cx-svg-square" role="img" aria-label="Polar plot with radius as log-2 of the value and angle advancing per step; all trajectories spiral inward to the 4-2-1 cycle at the centre."></svg>
  <figcaption>Radius is $\log_2 n$, so the centre is $n = 1$; angle is step index only. Every traced path winds inward and finishes on the same small cycle. A path that did not reach 1 would spiral outward and off the plot, which is the one thing this coordinate buys over a steps-remaining coordinate.</figcaption>
</figure>

**Where the analogy holds.** Every tested start falls into the same basin, nothing escapes the centre once it arrives, and the coordinate is honest enough that a counterexample would be visible rather than undefined.

**Where it breaks, and it matters.** A gravitational point is a *point*, and this is not one. Solving $T(n) = n$ gives $n = 0$ or $n = -1/2$: the map has **no positive fixed point at all**. What sits at the centre is a 3-cycle, $1 \to 4 \to 2 \to 1$, so the right physical image is a stable orbit rather than a mass. The drift is also only an average. Individual steps go up, some trajectories climb for a long time first, and an average pointing down is not a proof that nothing escapes. That gap between measured drift and proof is exactly the open problem.

<details class="cx-table">
  <summary>Table view: the traced primes</summary>
  <div class="cx-table-scroll"><table id="cx-tbl"></table></div>
</details>

{% raw %}
<script>
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var SVGNS = 'http://www.w3.org/2000/svg';

  /* ---------- the map ---------- */
  function step(n) { return n % 2 === 0 ? n / 2 : 3 * n + 1; }
  function trajectory(n) {
    var t = [n], guard = 0;
    while (n !== 1 && guard++ < 2000) { n = step(n); t.push(n); }
    return t;
  }
  function firstPrimes(k) {
    var out = [], n = 2;
    while (out.length < k) {
      var p = true;
      for (var d = 2; d * d <= n; d++) if (n % d === 0) { p = false; break; }
      if (p) out.push(n);
      n++;
    }
    return out;
  }

  /* ---------- svg helpers ---------- */
  function el(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function clear(svg) { while (svg.firstChild) svg.removeChild(svg.firstChild); }
  function size(svg, square) {
    var w = svg.clientWidth || 640;
    var h = square ? w : Math.max(240, Math.round(w * 0.52));
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('height', h);
    return { w: w, h: h };
  }
  function legend(host, items) {
    host.innerHTML = items.map(function (it) {
      return '<span class="cx-key"><i style="background:' + it.c + '"></i>' + it.t + '</span>';
    }).join('');
  }

  /* one shared tooltip */
  var tip = document.createElement('div');
  tip.className = 'cx-tip';
  tip.hidden = true;
  document.body.appendChild(tip);
  function showTip(evt, html) {
    tip.innerHTML = html; tip.hidden = false;
    var r = tip.getBoundingClientRect();
    var x = evt.clientX + 14, y = evt.clientY - r.height - 10;
    if (x + r.width > window.innerWidth - 8) x = evt.clientX - r.width - 14;
    if (y < 4) y = evt.clientY + 18;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function hideTip() { tip.hidden = true; }

  function axes(svg, d, xlab, ylab) {
    var g = el('g', { class: 'cx-axis' });
    g.appendChild(el('line', { x1: d.l, y1: d.h - d.b, x2: d.w - d.r, y2: d.h - d.b }));
    g.appendChild(el('line', { x1: d.l, y1: d.t, x2: d.l, y2: d.h - d.b }));
    svg.appendChild(g);
    var tx = el('text', { x: (d.l + d.w - d.r) / 2, y: d.h - 6, class: 'cx-axis-label', 'text-anchor': 'middle' });
    tx.textContent = xlab; svg.appendChild(tx);
    var ty = el('text', { x: 12, y: (d.t + d.h - d.b) / 2, class: 'cx-axis-label', 'text-anchor': 'middle',
                          transform: 'rotate(-90 12 ' + ((d.t + d.h - d.b) / 2) + ')' });
    ty.textContent = ylab; svg.appendChild(ty);
  }
  function gridline(svg, x1, y1, x2, y2) {
    svg.appendChild(el('line', { x1: x1, y1: y1, x2: x2, y2: y2, class: 'cx-grid' }));
  }
  function tick(svg, x, y, txt, anchor) {
    var t = el('text', { x: x, y: y, class: 'cx-tick', 'text-anchor': anchor || 'middle' });
    t.textContent = txt; svg.appendChild(t);
  }

  /* ---------- plot 1: one step ---------- */
  function plot1(N) {
    var svg = $('cx-p1'); clear(svg);
    var s = size(svg), d = { w: s.w, h: s.h, l: 52, r: 14, t: 14, b: 38 };
    var maxY = 3 * N + 1;
    var X = function (n) { return d.l + (n / N) * (d.w - d.l - d.r); };
    var Y = function (v) { return d.h - d.b - (v / maxY) * (d.h - d.b - d.t); };

    for (var i = 0; i <= 4; i++) {
      var v = maxY * i / 4, y = Y(v);
      gridline(svg, d.l, y, d.w - d.r, y);
      tick(svg, d.l - 8, y + 4, v >= 1000 ? Math.round(v / 1000) + 'k' : Math.round(v), 'end');
    }
    for (var j = 0; j <= 4; j++) {
      var n = Math.round(N * j / 4);
      tick(svg, X(n), d.h - d.b + 16, n);
    }
    axes(svg, d, 'n', 'T(n)');

    var gO = el('g', {}), gE = el('g', {});
    for (var n2 = 1; n2 <= N; n2++) {
      var odd = n2 % 2 === 1, v2 = step(n2);
      var c = el('circle', { cx: X(n2), cy: Y(v2), r: 2.1, class: odd ? 'cx-odd' : 'cx-even' });
      c.addEventListener('pointerenter', (function (a, b, o) {
        return function (e) {
          showTip(e, '<b>n = ' + a + '</b><br>' + (o ? '3n + 1' : 'n / 2') + ' = ' + b);
        };
      })(n2, v2, odd));
      c.addEventListener('pointerleave', hideTip);
      (odd ? gO : gE).appendChild(c);
    }
    svg.appendChild(gE); svg.appendChild(gO);
    legend($('cx-lg1'), [
      { c: 'var(--cx-1)', t: 'odd &rarr; 3n + 1' },
      { c: 'var(--cx-2)', t: 'even &rarr; n / 2' }
    ]);
  }

  /* ---------- plot 2: prime trajectories ---------- */
  function plot2(K) {
    var svg = $('cx-p2'); clear(svg);
    var s = size(svg), d = { w: s.w, h: s.h, l: 52, r: 14, t: 14, b: 38 };
    var primes = firstPrimes(K);
    var trs = primes.map(trajectory);
    var maxLen = Math.max.apply(null, trs.map(function (t) { return t.length; }));
    var maxV = Math.max.apply(null, trs.map(function (t) { return Math.max.apply(null, t); }));
    var maxL = Math.log2(maxV);

    var X = function (i) { return d.l + (i / (maxLen - 1)) * (d.w - d.l - d.r); };
    var Y = function (v) { return d.h - d.b - (Math.log2(v) / maxL) * (d.h - d.b - d.t); };

    for (var p = 0; p <= Math.floor(maxL); p += 4) {
      var y = Y(Math.pow(2, p));
      gridline(svg, d.l, y, d.w - d.r, y);
      tick(svg, d.l - 8, y + 4, p === 0 ? '1' : '2^' + p, 'end');
    }
    for (var j = 0; j <= 4; j++) {
      var i2 = Math.round((maxLen - 1) * j / 4);
      tick(svg, X(i2), d.h - d.b + 16, i2);
    }
    axes(svg, d, 'step', 'value (log scale)');

    trs.forEach(function (t, k) {
      var dd = t.map(function (v, i) { return (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1); }).join(' ');
      var path = el('path', { d: dd, class: 'cx-traj', 'stroke-opacity': (0.22 + 0.58 * (k / Math.max(1, K - 1))).toFixed(3) });
      path.addEventListener('pointerenter', function (e) {
        path.classList.add('cx-traj-hi'); path.parentNode.appendChild(path);
        showTip(e, '<b>start ' + primes[k] + '</b><br>' + (t.length - 1) + ' steps<br>peak ' +
                   Math.max.apply(null, t).toLocaleString());
      });
      path.addEventListener('pointerleave', function () { path.classList.remove('cx-traj-hi'); hideTip(); });
      svg.appendChild(path);
    });

    legend($('cx-lg2'), [{ c: 'var(--cx-ramp)', t: 'prime 2 &rarr; ' + primes[K - 1] + ' (light to dark)' }]);
    table(primes, trs);
    drift(trs);
  }

  /* ---------- plot 3: polar descent ---------- */
  function plot3(K) {
    var svg = $('cx-p3'); clear(svg);
    var s = size(svg, true), cx = s.w / 2, cy = s.h / 2;
    var R = Math.min(cx, cy) - 26;
    var primes = firstPrimes(K), trs = primes.map(trajectory);
    var maxL = Math.log2(Math.max.apply(null, trs.map(function (t) { return Math.max.apply(null, t); })));
    var DTH = 0.20;

    var pt = function (v, i) {
      var r = (Math.log2(v) / maxL) * R, th = -Math.PI / 2 + i * DTH;
      return [cx + r * Math.cos(th), cy + r * Math.sin(th)];
    };

    [0.25, 0.5, 0.75, 1].forEach(function (f) {
      svg.appendChild(el('circle', { cx: cx, cy: cy, r: R * f, class: 'cx-grid cx-ring' }));
      tick(svg, cx + 4, cy - R * f - 3, '2^' + Math.round(maxL * f), 'start');
    });

    trs.forEach(function (t, k) {
      var dd = t.map(function (v, i) {
        var q = pt(v, i); return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1);
      }).join(' ');
      var path = el('path', { d: dd, class: 'cx-orbit', 'stroke-opacity': (0.18 + 0.42 * (k / Math.max(1, K - 1))).toFixed(3) });
      path.addEventListener('pointerenter', function (e) {
        path.classList.add('cx-orbit-hi'); path.parentNode.appendChild(path);
        showTip(e, '<b>start ' + primes[k] + '</b><br>falls ' + (Math.log2(primes[k])).toFixed(1) +
                   ' &rarr; 0 in ' + (t.length - 1) + ' steps');
      });
      path.addEventListener('pointerleave', function () { path.classList.remove('cx-orbit-hi'); hideTip(); });
      svg.appendChild(path);
    });

    /* the cycle itself, drawn on top */
    var cyc = [4, 2, 1].map(function (v) { return (Math.log2(v) / maxL) * R; });
    cyc.forEach(function (r) {
      svg.appendChild(el('circle', { cx: cx, cy: cy, r: Math.max(r, 1.5), class: 'cx-cycle' }));
    });
    var lab = el('text', { x: cx, y: cy - 6, class: 'cx-cycle-label', 'text-anchor': 'middle' });
    lab.textContent = '4 → 2 → 1';
    svg.appendChild(lab);

    legend($('cx-lg3'), [
      { c: 'var(--cx-ramp)', t: 'trajectories, falling inward' },
      { c: 'var(--cx-2)', t: 'the 4 &rarr; 2 &rarr; 1 cycle' }
    ]);
  }

  /* ---------- measured drift ---------- */
  function drift(trs) {
    var sum = 0, cnt = 0;
    trs.forEach(function (t) {
      for (var i = 1; i < t.length; i++) { sum += Math.log2(t[i]) - Math.log2(t[i - 1]); cnt++; }
    });
    var m = cnt ? sum / cnt : 0;
    $('cx-drift').textContent = (m > 0 ? '+' : '') + m.toFixed(4);
  }

  /* ---------- table view ---------- */
  function table(primes, trs) {
    var rows = ['<tr><th>prime</th><th>steps</th><th>peak</th><th>peak altitude</th></tr>'];
    primes.forEach(function (p, k) {
      var pk = Math.max.apply(null, trs[k]);
      rows.push('<tr><td>' + p + '</td><td>' + (trs[k].length - 1) + '</td><td>' +
                pk.toLocaleString() + '</td><td>' + Math.log2(pk).toFixed(2) + '</td></tr>');
    });
    $('cx-tbl').innerHTML = rows.join('');
  }

  /* ---------- wiring ---------- */
  function renderAll() {
    var N = +$('cx-n').value, K = +$('cx-p').value;
    $('cx-n-out').textContent = N; $('cx-p-out').textContent = K;
    plot1(N); plot2(K); plot3(K);
  }
  $('cx-n').addEventListener('input', renderAll);
  $('cx-p').addEventListener('input', renderAll);

  var rt = null;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(renderAll, 150);
  }, { passive: true });

  renderAll();
})();
</script>
{% endraw %}

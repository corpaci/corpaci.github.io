// Interactive logic for /collatz-chattie/.
(function () {
  'use strict';

  var MAX_STEPS = 2000;
  var CYCLE = new Set([1, 2, 4]);
  var charts = { map: null, primes: null };
  var gravity = {
    model: null,
    positions: new Map(),
    hover: null,
    width: 0,
    height: 0
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function css(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  }

  function palette() {
    return {
      text: css('--text-primary'),
      muted: css('--text-secondary'),
      background: css('--bg-primary'),
      border: css('--border-color'),
      even: css('--cz-series-even'),
      odd: css('--cz-series-odd')
    };
  }

  function formatNumber(value) {
    return Number(value).toLocaleString('en-US');
  }

  function collatz(value) {
    var next = value % 2 === 0 ? value / 2 : 3 * value + 1;
    if (!Number.isSafeInteger(next)) {
      throw new RangeError('The next value is larger than JavaScript can represent exactly.');
    }
    return next;
  }

  function trajectory(start) {
    var values = [start];
    var seen = new Set([start]);
    var reachedOne = start === 1;

    for (var step = 0; step < MAX_STEPS && !reachedOne; step += 1) {
      var next = collatz(values[values.length - 1]);
      values.push(next);
      reachedOne = next === 1;
      if (!reachedOne && seen.has(next)) break;
      seen.add(next);
    }

    return { values: values, reachedOne: reachedOne };
  }

  function firstPrimes(count) {
    var primes = [];
    var candidate = 2;
    while (primes.length < count) {
      var isPrime = true;
      for (var divisor = 2; divisor * divisor <= candidate; divisor += 1) {
        if (candidate % divisor === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(candidate);
      candidate += 1;
    }
    return primes;
  }

  function chartScales(xTitle, yTitle, logarithmic) {
    var colors = palette();
    var mono = "'JetBrains Mono', monospace";
    return {
      x: {
        type: 'linear',
        grid: { color: colors.border },
        border: { color: colors.border },
        ticks: { color: colors.muted, font: { family: mono, size: 10 }, maxTicksLimit: 9 },
        title: { display: true, text: xTitle, color: colors.muted, font: { family: mono, size: 11 } }
      },
      y: {
        type: logarithmic ? 'logarithmic' : 'linear',
        beginAtZero: !logarithmic,
        min: logarithmic ? 1 : undefined,
        grid: { color: colors.border },
        border: { color: colors.border },
        ticks: { color: colors.muted, font: { family: mono, size: 10 }, maxTicksLimit: 8 },
        title: { display: true, text: yTitle, color: colors.muted, font: { family: mono, size: 11 } }
      }
    };
  }

  function commonChartOptions(xTitle, yTitle, logarithmic) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      normalized: true,
      parsing: false,
      interaction: { mode: 'nearest', axis: 'xy', intersect: false },
      scales: chartScales(xTitle, yTitle, logarithmic),
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          backgroundColor: palette().text,
          titleColor: palette().background,
          bodyColor: palette().background
        }
      }
    };
  }

  // Single-seed simulator ----------------------------------------------------
  var simulator = { seed: 27, values: [27] };

  function readSeed() {
    var input = byId('cz-seed');
    var value = Number(input.value);
    if (!Number.isInteger(value) || value < 1 || value > 1000000) {
      input.reportValidity();
      return null;
    }
    return value;
  }

  function resetSimulator() {
    var seed = readSeed();
    if (seed === null) return;
    simulator.seed = seed;
    simulator.values = [seed];
    renderSimulator();
  }

  function renderSimulator() {
    var values = simulator.values;
    var current = values[values.length - 1];
    var peak = Math.max.apply(null, values);
    byId('cz-current').textContent = formatNumber(current);
    byId('cz-steps').textContent = formatNumber(values.length - 1);
    byId('cz-peak').textContent = formatNumber(peak);

    var sequence = byId('cz-sequence');
    var fragment = document.createDocumentFragment();
    values.forEach(function (value, index) {
      if (index > 0) {
        var arrow = document.createElement('span');
        arrow.className = 'cz-sequence-arrow';
        arrow.textContent = '\u2192';
        fragment.appendChild(arrow);
      }
      var item = document.createElement('span');
      item.className = 'cz-sequence-item';
      item.textContent = formatNumber(value);
      fragment.appendChild(item);
    });
    sequence.replaceChildren(fragment);
    sequence.scrollLeft = sequence.scrollWidth;
  }

  function simulatorStep() {
    var current = simulator.values[simulator.values.length - 1];
    try {
      simulator.values.push(collatz(current));
      renderSimulator();
    } catch (error) {
      window.alert(error.message);
    }
  }

  function simulatorRun() {
    var current = simulator.values[simulator.values.length - 1];
    if (current === 1) return;
    try {
      var remainder = trajectory(current);
      simulator.values = simulator.values.concat(remainder.values.slice(1));
      renderSimulator();
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Plot 1: one application of T --------------------------------------------
  function renderMapChart() {
    var limit = Number(byId('cz-map-limit').value);
    var colors = palette();
    var even = [];
    var odd = [];
    for (var n = 1; n <= limit; n += 1) {
      (n % 2 === 0 ? even : odd).push({ x: n, y: collatz(n) });
    }
    byId('cz-map-limit-out').textContent = '1\u2013' + limit;

    var datasets = [
      {
        label: 'even n: n / 2',
        data: even,
        showLine: true,
        borderColor: colors.even,
        backgroundColor: colors.even,
        borderWidth: 1.5,
        pointRadius: 1.8,
        pointHoverRadius: 4
      },
      {
        label: 'odd n: 3n + 1',
        data: odd,
        showLine: true,
        borderColor: colors.odd,
        backgroundColor: colors.odd,
        borderWidth: 1.5,
        pointRadius: 1.8,
        pointHoverRadius: 4
      }
    ];

    if (charts.map) {
      charts.map.data.datasets = datasets;
      charts.map.update('none');
      return;
    }

    var options = commonChartOptions('starting integer n', 'one step T(n)', false);
    options.plugins.tooltip.callbacks = {
      title: function (items) { return items[0].dataset.label; },
      label: function (item) { return 'T(' + item.raw.x + ') = ' + formatNumber(item.raw.y); }
    };
    charts.map = new Chart(byId('cz-map-chart'), { type: 'scatter', data: { datasets: datasets }, options: options });
  }

  // Plot 2: first 50 primes -------------------------------------------------
  var primeRuns = firstPrimes(50).map(function (prime) {
    var run = trajectory(prime);
    return {
      prime: prime,
      values: run.values,
      peak: Math.max.apply(null, run.values)
    };
  });

  function primeColor(index) {
    var hue = Math.round((index * 137.508 + 188) % 360);
    return 'hsl(' + hue + ', 68%, 52%)';
  }

  function primeDatasets() {
    return primeRuns.map(function (run, index) {
      return {
        label: 'p = ' + run.prime,
        data: run.values.map(function (value, step) { return { x: step, y: value }; }),
        borderColor: primeColor(index),
        backgroundColor: primeColor(index),
        borderWidth: 1.15,
        pointRadius: 0,
        pointHoverRadius: 3,
        showLine: true,
        tension: 0
      };
    });
  }

  function renderPrimeChart() {
    var logarithmic = byId('cz-prime-log').checked;
    var options = commonChartOptions('iteration k', 'iterate T\u1d4f(p)', logarithmic);
    options.interaction = { mode: 'nearest', axis: 'xy', intersect: false };
    options.plugins.tooltip.callbacks = {
      title: function (items) { return items[0].dataset.label; },
      label: function (item) { return 'k = ' + item.raw.x + ', value = ' + formatNumber(item.raw.y); }
    };

    if (charts.primes) {
      charts.primes.options.scales = options.scales;
      charts.primes.update('none');
      return;
    }
    charts.primes = new Chart(byId('cz-prime-chart'), {
      type: 'scatter',
      data: { datasets: primeDatasets() },
      options: options
    });
  }

  function renderPrimeMetrics() {
    var longest = primeRuns.reduce(function (best, run) {
      return run.values.length > best.values.length ? run : best;
    });
    var highest = primeRuns.reduce(function (best, run) {
      return run.peak > best.peak ? run : best;
    });
    byId('cz-prime-longest').textContent = (longest.values.length - 1) + ' steps (p=' + longest.prime + ')';
    byId('cz-prime-peak').textContent = formatNumber(highest.peak) + ' (p=' + highest.prime + ')';
  }

  // Plot 3: a radial hitting-time potential ---------------------------------
  function buildGravityModel(limit) {
    var tau = new Map([[1, 0], [2, 0], [4, 0]]);
    var reached = 0;

    for (var start = 1; start <= limit; start += 1) {
      var current = start;
      var path = [];
      var local = new Set();
      var safe = true;

      while (!tau.has(current) && path.length < MAX_STEPS) {
        if (local.has(current)) {
          safe = false;
          break;
        }
        local.add(current);
        path.push(current);
        try {
          current = collatz(current);
        } catch (error) {
          safe = false;
          break;
        }
      }

      if (safe && tau.has(current)) {
        var depth = tau.get(current);
        for (var index = path.length - 1; index >= 0; index -= 1) {
          depth += 1;
          tau.set(path[index], depth);
        }
        reached += 1;
      }
    }

    var nodes = Array.from(tau.keys());
    var children = new Map();
    nodes.forEach(function (node) { children.set(node, []); });
    nodes.forEach(function (node) {
      if (CYCLE.has(node)) return;
      var parent = collatz(node);
      if (children.has(parent)) children.get(parent).push(node);
    });
    children.forEach(function (values) { values.sort(function (a, b) { return a - b; }); });

    var maxDepth = nodes.reduce(function (maximum, node) {
      return Math.max(maximum, tau.get(node));
    }, 0);

    return {
      limit: limit,
      nodes: nodes,
      tau: tau,
      children: children,
      maxDepth: maxDepth,
      reached: reached
    };
  }

  function gravityLayout() {
    var model = gravity.model;
    if (!model || !gravity.width || !gravity.height) return;

    var centerX = gravity.width / 2;
    var centerY = gravity.height / 2;
    var outer = Math.max(80, Math.min(gravity.width, gravity.height) / 2 - 20);
    var inner = 36;
    var weights = new Map();
    var positions = new Map();

    function leafWeight(node) {
      if (weights.has(node)) return weights.get(node);
      var kids = model.children.get(node) || [];
      var weight = kids.length ? kids.reduce(function (sum, child) { return sum + leafWeight(child); }, 0) : 1;
      weights.set(node, weight);
      return weight;
    }

    function placeChildren(node, startAngle, endAngle) {
      var kids = model.children.get(node) || [];
      if (!kids.length) return;
      var total = kids.reduce(function (sum, child) { return sum + leafWeight(child); }, 0);
      var cursor = startAngle;
      kids.forEach(function (child) {
        var span = (endAngle - startAngle) * leafWeight(child) / total;
        var childStart = cursor;
        var childEnd = cursor + span;
        var angle = (childStart + childEnd) / 2 - Math.PI / 2;
        var depth = model.tau.get(child);
        var fraction = model.maxDepth ? Math.pow(depth / model.maxDepth, 0.72) : 0;
        var radius = inner + fraction * (outer - inner);
        positions.set(child, {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          angle: angle
        });
        placeChildren(child, childStart, childEnd);
        cursor = childEnd;
      });
    }

    leafWeight(4);
    placeChildren(4, 0, Math.PI * 2);
    positions.set(4, { x: centerX, y: centerY - 11 });
    positions.set(2, { x: centerX + 10, y: centerY + 7 });
    positions.set(1, { x: centerX - 10, y: centerY + 7 });
    gravity.positions = positions;
  }

  function traceToCycle(start) {
    var trace = new Set();
    var current = start;
    for (var step = 0; step < MAX_STEPS && gravity.positions.has(current); step += 1) {
      trace.add(current);
      if (CYCLE.has(current)) break;
      current = collatz(current);
    }
    if (CYCLE.has(current)) {
      trace.add(1);
      trace.add(2);
      trace.add(4);
    }
    return trace;
  }

  function drawGravity() {
    var canvas = byId('cz-gravity');
    var context = canvas.getContext('2d');
    var colors = palette();
    var model = gravity.model;
    if (!model) return;

    context.clearRect(0, 0, gravity.width, gravity.height);
    var centerX = gravity.width / 2;
    var centerY = gravity.height / 2;
    var outer = Math.max(80, Math.min(gravity.width, gravity.height) / 2 - 20);
    var trace = gravity.hover === null ? new Set() : traceToCycle(gravity.hover);

    // Equipotential rings: equal radial bands represent equal fractions of tau.
    context.save();
    context.strokeStyle = colors.border;
    context.fillStyle = colors.muted;
    context.font = "9px 'JetBrains Mono', monospace";
    context.textAlign = 'center';
    context.globalAlpha = 0.65;
    for (var ring = 1; ring <= 4; ring += 1) {
      var radius = 36 + ring / 4 * (outer - 36);
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();
      var tauLabel = Math.round(model.maxDepth * Math.pow(ring / 4, 1 / 0.72));
      context.fillText('\u03c4=' + tauLabel, centerX, centerY - radius + 11);
    }
    context.restore();

    // Each edge is one application of T and points geometrically inward.
    model.nodes.forEach(function (node) {
      if (CYCLE.has(node)) return;
      var from = gravity.positions.get(node);
      var parent = collatz(node);
      var to = gravity.positions.get(parent);
      if (!from || !to) return;
      var highlighted = trace.has(node) && trace.has(parent);
      context.save();
      context.strokeStyle = highlighted ? (node % 2 ? colors.odd : colors.even) : colors.border;
      context.globalAlpha = highlighted ? 0.95 : 0.27;
      context.lineWidth = highlighted ? 1.7 : 0.55;
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.stroke();
      context.restore();
    });

    model.nodes.forEach(function (node) {
      if (CYCLE.has(node)) return;
      var point = gravity.positions.get(node);
      if (!point) return;
      var highlighted = trace.has(node);
      context.save();
      context.fillStyle = node % 2 ? colors.odd : colors.even;
      context.globalAlpha = highlighted ? 1 : 0.72;
      context.beginPath();
      context.arc(point.x, point.y, highlighted ? 3.1 : (model.nodes.length > 1200 ? 1 : 1.35), 0, Math.PI * 2);
      context.fill();
      context.restore();
    });

    // The terminal cycle is a three-node attractor, not a fixed point.
    var cycleOrder = [4, 2, 1, 4];
    context.save();
    context.strokeStyle = colors.text;
    context.lineWidth = 1.25;
    context.globalAlpha = 0.85;
    context.beginPath();
    cycleOrder.forEach(function (node, index) {
      var point = gravity.positions.get(node);
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    context.stroke();
    context.restore();

    [4, 2, 1].forEach(function (node) {
      var point = gravity.positions.get(node);
      context.save();
      context.fillStyle = colors.background;
      context.strokeStyle = colors.text;
      context.lineWidth = 1.4;
      context.beginPath();
      context.arc(point.x, point.y, 7, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.fillStyle = colors.text;
      context.font = "600 8px 'JetBrains Mono', monospace";
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(String(node), point.x, point.y + 0.5);
      context.restore();
    });
  }

  function sizeGravity() {
    var wrap = byId('cz-gravity-wrap');
    var canvas = byId('cz-gravity');
    var width = Math.max(280, wrap.clientWidth);
    var height = Math.max(width < 600 ? 384 : 448, Math.min(610, width * 0.78));
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    wrap.style.height = height + 'px';
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    gravity.width = width;
    gravity.height = height;
    gravityLayout();
    drawGravity();
  }

  function renderGravity() {
    var limit = Number(byId('cz-gravity-limit').value);
    byId('cz-gravity-limit-out').textContent = '1\u2013' + limit;
    gravity.model = buildGravityModel(limit);
    gravity.hover = null;
    byId('cz-gravity-nodes').textContent = formatNumber(gravity.model.nodes.length);
    byId('cz-gravity-depth').textContent = '\u03c4 = ' + gravity.model.maxDepth;
    byId('cz-gravity-reached').textContent = gravity.model.reached + ' / ' + limit;
    byId('cz-gravity-tooltip').style.display = 'none';
    sizeGravity();
  }

  function gravityPointerMove(event) {
    var canvas = byId('cz-gravity');
    var tooltip = byId('cz-gravity-tooltip');
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var nearest = null;
    var nearestDistance = 9 * 9;

    gravity.positions.forEach(function (point, node) {
      var dx = point.x - x;
      var dy = point.y - y;
      var distance = dx * dx + dy * dy;
      if (distance < nearestDistance) {
        nearest = node;
        nearestDistance = distance;
      }
    });

    if (nearest === gravity.hover) return;
    gravity.hover = nearest;
    if (nearest === null) {
      tooltip.style.display = 'none';
    } else {
      tooltip.innerHTML = 'n = ' + formatNumber(nearest) + '<br>T(n) = ' + formatNumber(collatz(nearest)) + '<br>\u03c4<sub>C</sub>(n) = ' + gravity.model.tau.get(nearest);
      tooltip.style.display = 'block';
      tooltip.style.left = Math.min(x + 12, gravity.width - 120) + 'px';
      tooltip.style.top = Math.max(8, y - 54) + 'px';
    }
    drawGravity();
  }

  function refreshTheme() {
    var colors = palette();
    if (charts.map) {
      charts.map.data.datasets[0].borderColor = colors.even;
      charts.map.data.datasets[0].backgroundColor = colors.even;
      charts.map.data.datasets[1].borderColor = colors.odd;
      charts.map.data.datasets[1].backgroundColor = colors.odd;
      charts.map.options.scales = chartScales('starting integer n', 'one step T(n)', false);
      charts.map.options.plugins.tooltip.backgroundColor = colors.text;
      charts.map.options.plugins.tooltip.titleColor = colors.background;
      charts.map.options.plugins.tooltip.bodyColor = colors.background;
      charts.map.update('none');
    }
    if (charts.primes) {
      var logarithmic = byId('cz-prime-log').checked;
      charts.primes.options.scales = chartScales('iteration k', 'iterate T\u1d4f(p)', logarithmic);
      charts.primes.options.plugins.tooltip.backgroundColor = colors.text;
      charts.primes.options.plugins.tooltip.titleColor = colors.background;
      charts.primes.options.plugins.tooltip.bodyColor = colors.background;
      charts.primes.update('none');
    }
    drawGravity();
  }

  function initialize() {
    byId('cz-run').addEventListener('click', simulatorRun);
    byId('cz-step').addEventListener('click', simulatorStep);
    byId('cz-reset').addEventListener('click', resetSimulator);
    byId('cz-seed').addEventListener('change', resetSimulator);
    byId('cz-map-limit').addEventListener('input', renderMapChart);
    byId('cz-prime-log').addEventListener('change', renderPrimeChart);
    byId('cz-gravity-limit').addEventListener('input', renderGravity);
    byId('cz-gravity').addEventListener('pointermove', gravityPointerMove);
    byId('cz-gravity').addEventListener('pointerleave', function () {
      gravity.hover = null;
      byId('cz-gravity-tooltip').style.display = 'none';
      drawGravity();
    });

    renderSimulator();
    renderMapChart();
    renderPrimeMetrics();
    renderPrimeChart();
    renderGravity();

    var resizeFrame = null;
    window.addEventListener('resize', function () {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(sizeGravity);
    });
    new MutationObserver(function () {
      window.requestAnimationFrame(refreshTheme);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
}());

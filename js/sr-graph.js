/**
 * sr-graph.js
 * D3 force-directed renderer for the self-reference graph.
 *
 * Consumes:
 *   - window.SR          (the self_reference.json data, inlined by Liquid)
 *   - window.SRDistance  (distance matrix + link builders from sr-distance.js)
 *
 * Named links (hand-labeled relations) render solid; derived affinity links
 * (distance < threshold) render faint and dashed. Text and chrome colors come
 * from CSS variables, so the graph follows the day/night/spectrum theme
 * without re-rendering. Node fills are fixed cluster colors chosen to read
 * on both the paper and the dark backgrounds.
 */
(function () {
  'use strict';

  var data = window.SR;
  if (!data || !window.SRDistance || !window.d3) return;

  var DERIVED_THRESHOLD = 0.5;
  var CLUSTER_COLOR = {
    'productive':        '#43a047',
    'hinge':             '#00acc1',
    'collapse-classical': '#ef6c00',
    'outlier':           '#8e24aa',
    'alignment':         '#e91e8c'
  };
  var CLUSTER_LABEL = {
    'productive':        'productive — self-reference that works',
    'hinge':             'hinge — the engine of the limits',
    'collapse-classical': 'classical collapse — the walls',
    'outlier':           'outlier — collapse without self-reference',
    'alignment':         'alignment — the walls, wearing ML'
  };
  // Loose horizontal ordering echoing the CAN | CAN'T | ELSE map in /limits/:
  // productive left, hinge center-left, collapse center-right, alignment right.
  var CLUSTER_X = {
    'productive': 0.14, 'hinge': 0.38, 'collapse-classical': 0.62,
    'outlier': 0.62, 'alignment': 0.88
  };

  var nodes = data.nodes.map(function (n) { return Object.assign({}, n); });
  var matrix = SRDistance.buildMatrix(nodes, data.config.feature_weights);
  var springs = SRDistance.buildSpringLinks(nodes, matrix, DERIVED_THRESHOLD, 0.5);
  var links = SRDistance.mergeLinks(springs, data.links, nodes, matrix)
    .map(function (l) { return Object.assign({}, l); });

  var degree = {};
  links.forEach(function (l) {
    if (l.derived) return;
    degree[l.source] = (degree[l.source] || 0) + 1;
    degree[l.target] = (degree[l.target] || 0) + 1;
  });

  var container = document.getElementById('sr-graph');
  if (!container) return;

  var width = container.clientWidth || 720;
  var height = Math.max(480, Math.round(width * 0.78));

  var svg = d3.select(container).append('svg')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('width', '100%')
    .attr('role', 'img')
    .attr('aria-label', 'Force-directed graph of self-reference instances');

  var linkLayer = svg.append('g');
  var nodeLayer = svg.append('g');
  var labelLayer = svg.append('g');

  var link = linkLayer.selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', function (d) { return d.derived ? 'var(--border-color)' : 'var(--text-secondary)'; })
    .attr('stroke-opacity', function (d) { return d.derived ? 0.55 : 0.75; })
    .attr('stroke-width', function (d) { return d.derived ? 1 : 1.6; })
    .attr('stroke-dasharray', function (d) { return d.derived ? '3 4' : null; })
    .attr('class', function (d) { return d.derived ? 'sr-link-derived' : 'sr-link-named'; });

  link.append('title').text(function (d) {
    var base = d.derived
      ? 'affinity ' + (1 - d.distance).toFixed(2)
      : d.relation.replace(/-/g, ' ');
    return sourceId(d) + ' → ' + targetId(d) + ' · ' + base;
  });

  function sourceId(l) { return typeof l.source === 'object' ? l.source.id : l.source; }
  function targetId(l) { return typeof l.target === 'object' ? l.target.id : l.target; }

  var node = nodeLayer.selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', function (d) { return 7 + 2 * (degree[d.id] || 0); })
    .attr('fill', function (d) { return CLUSTER_COLOR[d.cluster] || '#777'; })
    .attr('fill-opacity', function (d) { return 0.55 + 0.45 * d.productive; })
    .attr('stroke', 'var(--bg-primary)')
    .attr('stroke-width', 1.5)
    .style('cursor', 'pointer');

  node.append('title').text(function (d) { return d.label; });

  var label = labelLayer.selectAll('text')
    .data(nodes)
    .join('text')
    .text(function (d) { return d.label; })
    .attr('font-size', 10.5)
    .attr('font-family', "'Inter', sans-serif")
    .attr('fill', 'var(--text-secondary)')
    .attr('text-anchor', 'middle')
    .attr('pointer-events', 'none');

  var sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(function (d) { return d.id; })
      .distance(function (d) { return 40 + 140 * (d.distance !== null ? d.distance : 0.6); })
      .strength(function (d) { return d.strength; }))
    .force('charge', d3.forceManyBody().strength(-220))
    .force('collide', d3.forceCollide().radius(function (d) { return 16 + 2 * (degree[d.id] || 0); }))
    .force('x', d3.forceX(function (d) { return width * (CLUSTER_X[d.cluster] || 0.5); }).strength(0.12))
    .force('y', d3.forceY(height / 2).strength(0.08))
    .on('tick', tick);

  function tick() {
    nodes.forEach(function (d) {
      var r = 12 + 2 * (degree[d.id] || 0);
      d.x = Math.max(r, Math.min(width - r, d.x));
      d.y = Math.max(r + 6, Math.min(height - r - 14, d.y));
    });
    link
      .attr('x1', function (d) { return d.source.x; })
      .attr('y1', function (d) { return d.source.y; })
      .attr('x2', function (d) { return d.target.x; })
      .attr('y2', function (d) { return d.target.y; });
    node
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; });
    label
      .attr('x', function (d) { return d.x; })
      .attr('y', function (d) { return d.y + 20 + 2 * (degree[d.id] || 0); });
  }

  node.call(d3.drag()
    .on('start', function (event, d) {
      if (!event.active) sim.alphaTarget(0.25).restart();
      d.fx = d.x; d.fy = d.y;
    })
    .on('drag', function (event, d) { d.fx = event.x; d.fy = event.y; })
    .on('end', function (event, d) {
      if (!event.active) sim.alphaTarget(0);
      d.fx = null; d.fy = null;
    }));

  // --- Detail panel ---

  var panel = document.getElementById('sr-detail');
  var nn = SRDistance.nearestNeighbors(nodes, matrix, 3);
  var nnById = {};
  nn.forEach(function (e) { nnById[e.id] = e.nearest; });

  function chips(items) {
    return (items || []).map(function (t) {
      return '<span class="sr-chip">' + t + '</span>';
    }).join(' ');
  }

  function showDetail(d) {
    if (!panel) return;
    var named = links.filter(function (l) {
      return !l.derived && (sourceId(l) === d.id || targetId(l) === d.id);
    }).map(function (l) {
      var other = sourceId(l) === d.id ? targetId(l) : sourceId(l);
      var otherLabel = nodes.find(function (n) { return n.id === other; }).label;
      return '<li>' + l.relation.replace(/-/g, ' ') + ' · ' + otherLabel + '</li>';
    }).join('');
    var nearest = (nnById[d.id] || []).map(function (m) {
      return '<li>' + m.label + ' <span class="sr-dist">(' + m.d.toFixed(2) + ')</span></li>';
    }).join('');

    panel.innerHTML =
      '<h3 style="margin-top:0">' + d.label + '</h3>' +
      (d.thinkers && d.thinkers.length ? '<p class="sr-thinkers">' + d.thinkers.join(' · ') + '</p>' : '') +
      '<p>' + d.description + '</p>' +
      (d.pa_instance ? '<p class="sr-pa"><strong>In PA:</strong> ' + d.pa_instance + '</p>' : '') +
      '<p class="sr-meta">mechanism ' + chips(d.mechanism) +
      ' &nbsp;breaks ' + (d.what_breaks.length ? chips(d.what_breaks) : '<span class="sr-chip">nothing</span>') +
      ' &nbsp;escape ' + chips(d.escape) + '</p>' +
      (named ? '<p class="sr-meta" style="margin-bottom:0.25rem">named relations</p><ul class="sr-list">' + named + '</ul>' : '') +
      '<p class="sr-meta" style="margin-bottom:0.25rem">nearest by feature distance</p><ul class="sr-list">' + nearest + '</ul>';
    panel.classList.add('sr-detail-open');
  }

  node.on('click', function (event, d) { showDetail(d); });

  // --- Legend ---

  var legend = document.getElementById('sr-legend');
  if (legend) {
    legend.innerHTML = Object.keys(CLUSTER_COLOR).map(function (c) {
      return '<span class="sr-legend-item"><span class="sr-swatch" style="background:' +
        CLUSTER_COLOR[c] + '"></span>' + CLUSTER_LABEL[c] + '</span>';
    }).join('');
  }

  // --- Derived-links toggle ---

  var toggle = document.getElementById('sr-derived-toggle');
  if (toggle) {
    toggle.addEventListener('change', function () {
      linkLayer.selectAll('.sr-link-derived')
        .attr('display', toggle.checked ? null : 'none');
    });
  }

  // Console diagnostics for the curious.
  SRDistance.diagnose(nodes, matrix);
})();

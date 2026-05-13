/**
 * sr-distance.js
 * Distance matrix for the self-reference graph.
 * Consumed by sr-graph.js to set D3 force-link strengths.
 *
 * All distances are in [0, 1].
 * Feature weights must sum to 1.
 */
(function (global) {

  // --- Core metric ---

  /**
   * Jaccard distance between two arrays treated as sets.
   * Empty ∩ Empty → 0 (identical in "nothing applies").
   */
  function jaccardDist(a, b) {
    if (a.length === 0 && b.length === 0) return 0;
    const setA = new Set(a);
    const intersection = b.filter(x => setA.has(x)).length;
    const union = new Set([...a, ...b]).size;
    return union === 0 ? 0 : 1 - intersection / union;
  }

  /**
   * Weighted distance between two nodes.
   * weights: { mechanism, productive, what_breaks, locus, domain }
   * All weights must sum to 1.
   */
  function nodeDist(u, v, weights) {
    return (
      weights.mechanism   * jaccardDist(u.mechanism,   v.mechanism)   +
      weights.productive  * Math.abs(u.productive - v.productive)      +
      weights.what_breaks * jaccardDist(u.what_breaks, v.what_breaks) +
      weights.locus       * jaccardDist(u.locus,       v.locus)       +
      weights.domain      * jaccardDist(u.domain,       v.domain)
    );
  }

  // --- Matrix ---

  /**
   * Build an n×n symmetric distance matrix.
   * Returns a 2D array; matrix[i][j] === matrix[j][i], diagonal is 0.
   */
  function buildMatrix(nodes, weights) {
    const n = nodes.length;
    const m = Array.from({ length: n }, () => new Float32Array(n));
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const d = nodeDist(nodes[i], nodes[j], weights);
        m[i][j] = d;
        m[j][i] = d;
      }
    }
    return m;
  }

  // --- Link sets for D3 ---

  /**
   * Derive implicit spring links from the matrix.
   * Only pairs with distance < threshold get a spring.
   * strength = (1 - distance) * dampening  →  closer nodes pull harder.
   */
  function buildSpringLinks(nodes, matrix, threshold, dampening) {
    threshold  = threshold  !== undefined ? threshold  : 0.75;
    dampening  = dampening  !== undefined ? dampening  : 0.5;
    var links = [];
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var d = matrix[i][j];
        if (d < threshold) {
          links.push({
            source:   nodes[i].id,
            target:   nodes[j].id,
            distance: d,
            strength: (1 - d) * dampening,
            derived:  true
          });
        }
      }
    }
    return links;
  }

  /**
   * Merge derived spring links with the explicit named links from the JSON.
   * Named links always included (at full strength); derived links fill in the rest.
   * Deduplicates: if a named link already covers a pair, derived link is dropped.
   */
  function mergeLinks(springLinks, namedLinks, nodes, matrix) {
    var nodeIndex = {};
    nodes.forEach(function (n, i) { nodeIndex[n.id] = i; });

    var covered = new Set(
      namedLinks.map(function (l) {
        var a = l.source < l.target ? l.source : l.target;
        var b = l.source < l.target ? l.target : l.source;
        return a + '|' + b;
      })
    );

    var enrichedNamed = namedLinks.map(function (l) {
      var i = nodeIndex[l.source];
      var j = nodeIndex[l.target];
      var d = (i !== undefined && j !== undefined) ? matrix[i][j] : null;
      return Object.assign({}, l, {
        distance: d,
        strength: d !== null ? (1 - d) * 0.7 : 0.4,
        derived:  false
      });
    });

    var filteredDerived = springLinks.filter(function (l) {
      var a = l.source < l.target ? l.source : l.target;
      var b = l.source < l.target ? l.target : l.source;
      return !covered.has(a + '|' + b);
    });

    return enrichedNamed.concat(filteredDerived);
  }

  // --- Diagnostics ---

  /**
   * Return the k nearest neighbors for each node, sorted by distance.
   * Useful for verifying the matrix before rendering.
   */
  function nearestNeighbors(nodes, matrix, k) {
    k = k !== undefined ? k : 3;
    return nodes.map(function (node, i) {
      var neighbors = nodes
        .map(function (other, j) {
          return { id: other.id, label: other.label, d: matrix[i][j] };
        })
        .filter(function (_, j) { return j !== i; })
        .sort(function (a, b) { return a.d - b.d; })
        .slice(0, k);
      return { id: node.id, label: node.label, nearest: neighbors };
    });
  }

  /**
   * Log a nearest-neighbor report to the console.
   * Call SRDistance.diagnose(nodes, matrix) after building the matrix.
   */
  function diagnose(nodes, matrix) {
    var report = nearestNeighbors(nodes, matrix, 3);
    console.group('SR Distance Matrix — nearest neighbors');
    report.forEach(function (entry) {
      var neighbors = entry.nearest
        .map(function (n) { return n.label + ' (' + n.d.toFixed(3) + ')'; })
        .join(', ');
      console.log(entry.label + '  →  ' + neighbors);
    });
    console.groupEnd();
  }

  global.SRDistance = {
    jaccardDist:      jaccardDist,
    nodeDist:         nodeDist,
    buildMatrix:      buildMatrix,
    buildSpringLinks: buildSpringLinks,
    mergeLinks:       mergeLinks,
    nearestNeighbors: nearestNeighbors,
    diagnose:         diagnose
  };

})(window);

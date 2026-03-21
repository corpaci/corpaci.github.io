---
layout: page
title: "ICTSS Playground"
subtitle: "Poke at a test matrix, watch the spectral complexity react."
permalink: /projects/ictss-playground/
---

From the [ICTSS 2024 Best Paper](/projects/bias-measurement/): spectral matrix complexity metrics predict combinatorial *t*-way coverage. The intuition — a random-looking matrix covers more combinations than a structured one, and its singular value spectrum is visibly flatter.

Click cells to toggle bits. Try making a highly structured matrix (stripes, blocks) vs. a random one and watch how the singular value distribution changes.

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<style>
.pg {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  background: var(--code-bg);
}
.pg-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.pg-left, .pg-right {
  flex: 1;
  min-width: 260px;
}
.pg-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}
.pg-controls label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--text-secondary);
}
.pg-controls input[type=range] {
  width: 80px;
  accent-color: var(--accent);
}
.pg-btn {
  padding: 4px 10px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.pg-btn:hover { border-color: var(--accent); color: var(--accent); }
#matrix-grid {
  display: grid;
  gap: 4px;
}
.mc {
  aspect-ratio: 1;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: var(--font-mono);
  cursor: pointer;
  background: var(--bg-primary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: 3px;
  transition: background 0.12s, color 0.12s;
  line-height: 1;
}
.mc.on {
  background: var(--accent);
  color: var(--bg-primary);
  border-color: var(--accent);
}
.metric-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.metric-card {
  flex: 1;
  padding: 0.6rem 0.9rem;
  border-radius: 6px;
  background: var(--bg-primary);
  border-left: 3px solid var(--accent-secondary);
}
.metric-label {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.metric-val {
  font-family: var(--font-mono);
  font-size: 1.15rem;
  color: var(--text-primary);
}
.pg-note {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}
</style>

<div class="pg">
  <div class="pg-controls">
    <label>Rows <strong id="lbl-rows">6</strong></label>
    <input type="range" id="ctrl-rows" min="2" max="12" value="6" oninput="resizeMatrix()">
    <label>Cols <strong id="lbl-cols">5</strong></label>
    <input type="range" id="ctrl-cols" min="2" max="10" value="5" oninput="resizeMatrix()">
    <button class="pg-btn" onclick="randomizeMatrix()">Randomize</button>
    <button class="pg-btn" onclick="clearMatrix()">Clear</button>
    <button class="pg-btn" onclick="stripeMatrix()">Stripe</button>
  </div>
  <div class="pg-layout">
    <div class="pg-left">
      <div id="matrix-grid"></div>
      <p class="pg-note">Click any cell to toggle · Stripe = maximally structured</p>
    </div>
    <div class="pg-right">
      <div class="metric-row">
        <div class="metric-card">
          <div class="metric-label">SVD Entropy</div>
          <div class="metric-val" id="val-entropy">—</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Spectral Radius σ₁</div>
          <div class="metric-val" id="val-radius">—</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Rank</div>
          <div class="metric-val" id="val-rank">—</div>
        </div>
      </div>
      <canvas id="spectrumChart"></canvas>
    </div>
  </div>
</div>

<script>
(function() {
  var rows = 6, cols = 5;
  var matrix = mkMatrix(rows, cols, 'random');
  var chart = null;

  function mkMatrix(r, c, mode) {
    return Array.from({length: r}, function(_, i) {
      return Array.from({length: c}, function(_, j) {
        if (mode === 'random') return Math.round(Math.random());
        if (mode === 'stripe') return (i + j) % 2;
        return 0;
      });
    });
  }

  function css(v) {
    return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  }

  function renderMatrix() {
    var grid = document.getElementById('matrix-grid');
    grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    grid.innerHTML = '';
    matrix.forEach(function(row, r) {
      row.forEach(function(val, c) {
        var btn = document.createElement('button');
        btn.className = 'mc' + (val ? ' on' : '');
        btn.textContent = val;
        btn.onclick = function() { matrix[r][c] = val ? 0 : 1; update(); };
        grid.appendChild(btn);
      });
    });
  }

  function compute() {
    var A = matrix;
    var AT = math.transpose(A);
    var AS = math.multiply(AT, A);
    var sigmas = [];
    try {
      var eigs = math.eigs(AS).values.toArray();
      sigmas = eigs
        .map(function(v) { return typeof v === 'number' ? v : (v.re || 0); })
        .map(function(v) { return Math.sqrt(Math.max(0, v)); })
        .filter(function(v) { return v > 1e-6; })
        .sort(function(a, b) { return b - a; });
    } catch(e) {}
    return sigmas;
  }

  function update() {
    renderMatrix();
    var sigmas = compute();
    var sum = sigmas.reduce(function(a, b) { return a + b; }, 0) || 1;
    var norm = sigmas.map(function(s) { return s / sum; });
    var entropy = norm.reduce(function(h, p) { return p > 0 ? h - p * Math.log2(p) : h; }, 0);
    var radius = sigmas[0] || 0;
    var rank = sigmas.length;

    document.getElementById('val-entropy').textContent = entropy.toFixed(3);
    document.getElementById('val-radius').textContent = radius.toFixed(2);
    document.getElementById('val-rank').textContent = rank;

    var accent = css('--accent');
    var textSec = css('--text-secondary');
    var gridCol = css('--border-color');
    var labels = sigmas.map(function(_, i) { return '\u03c3' + (i + 1); });

    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = sigmas;
      chart.data.datasets[0].backgroundColor = accent;
      chart.options.scales.y.grid.color = gridCol;
      chart.options.scales.y.ticks.color = textSec;
      chart.options.scales.x.ticks.color = textSec;
      chart.update();
    } else {
      chart = new Chart(document.getElementById('spectrumChart'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{ label: 'Singular values', data: sigmas,
            backgroundColor: accent, borderRadius: 3 }]
        },
        options: {
          responsive: true,
          animation: { duration: 120 },
          scales: {
            y: { beginAtZero: true,
              grid: { color: gridCol },
              ticks: { color: textSec, font: { family: 'JetBrains Mono, monospace', size: 11 } }
            },
            x: { grid: { display: false },
              ticks: { color: textSec, font: { family: 'JetBrains Mono, monospace', size: 11 } }
            }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  window.randomizeMatrix = function() { matrix = mkMatrix(rows, cols, 'random'); update(); };
  window.clearMatrix    = function() { matrix = mkMatrix(rows, cols, 'clear');  update(); };
  window.stripeMatrix   = function() { matrix = mkMatrix(rows, cols, 'stripe'); update(); };
  window.resizeMatrix   = function() {
    rows = parseInt(document.getElementById('ctrl-rows').value);
    cols = parseInt(document.getElementById('ctrl-cols').value);
    document.getElementById('lbl-rows').textContent = rows;
    document.getElementById('lbl-cols').textContent = cols;
    matrix = mkMatrix(rows, cols, 'random');
    if (chart) { chart.destroy(); chart = null; }
    update();
  };

  update();
})();
</script>

---

**What you're seeing:** The singular values of the matrix are the square roots of the eigenvalues of $A^T A$. A flat spectrum (high SVD entropy) means the matrix's "information" is spread across many dimensions — it covers the test space more uniformly. A peaked spectrum (low entropy, high $\sigma_1$) means most variance is concentrated in one direction — the matrix is redundant. The ICTSS result: this entropy predicts combinatorial *t*-way coverage without enumerating the combinations.

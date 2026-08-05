---
layout: page
title: "Collatz Chattie"
subtitle: "Iterate, compare trajectories, and turn stopping time into a gravity well."
permalink: /collatz-chattie/
description: "An interactive Collatz conjecture simulator with one-step maps, the trajectories of the first 50 primes, and a finite-basin gravity-well view."
epistemic_status: Mathematical playground
epistemic_note: Computation verifies only the displayed finite range. The gravity-well view is a chosen coordinate system, not evidence that every positive integer reaches 4–2–1.
---

For a positive integer $n$, the Collatz map is

$$
T(n)=\begin{cases}
n/2 & \text{if } n \text{ is even},\\
3n+1 & \text{if } n \text{ is odd}.
\end{cases}
$$

The rule is local and simple; its repeated behavior is not. Try a starting value, then compare three views of the same dynamics.

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<style>
/* Chart series colours, scoped to :root so the canvas renderer can read them.
   Day reuses the site accents. Night and spectrum use steps snapped into the
   dark-mode lightness band (L 0.48-0.67): the raw accents sit at L 0.69-0.77
   and bloom against the dark surface. Separation is unchanged and passes
   (CVD dE 15.4-19.0, normal-vision dE 20.8-22.8, contrast >= 3:1). */
:root                   { --cz-series-even: #1580a0; --cz-series-odd: #c4841d; }
[data-theme="night"]    { --cz-series-even: #1a95b2; --cz-series-odd: #b57800; }
[data-theme="spectrum"] { --cz-series-even: #dd3a9a; --cz-series-odd: #cb6800; }

.cz-shell {
  --cz-even: var(--cz-series-even);
  --cz-odd: var(--cz-series-odd);
  margin: 1.75rem 0 2.5rem;
}
.cz-panel {
  margin: 1.25rem 0 2rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--code-bg);
}
.cz-panel h2,
.cz-panel h3 { margin-top: 0; }
.cz-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.9rem;
}
.cz-kicker {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--accent);
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.cz-panel-title {
  margin: 0;
  font-size: 1.08rem;
}
.cz-panel-copy {
  max-width: 37rem;
  margin: 0.3rem 0 0;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  line-height: 1.55;
}
.cz-controls {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin: 0 0 1rem;
}
.cz-field {
  display: grid;
  gap: 0.25rem;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.72rem;
}
.cz-field-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}
.cz-field output {
  min-width: 2.5ch;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-weight: 500;
}
.cz-field input[type="number"] {
  width: 9rem;
  min-height: 2rem;
  padding: 0.35rem 0.5rem;
  color: var(--text-primary);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-family: var(--font-mono);
}
.cz-field input[type="range"] {
  width: min(12rem, 45vw);
  accent-color: var(--accent);
}
.cz-btn,
.cz-toggle {
  min-height: 2rem;
  padding: 0.35rem 0.7rem;
  color: var(--text-primary);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-family: var(--font-sans);
  font-size: 0.76rem;
  cursor: pointer;
}
.cz-btn:hover,
.cz-btn:focus-visible,
.cz-toggle:hover,
.cz-toggle:focus-visible { border-color: var(--accent); }
.cz-btn-primary {
  color: var(--bg-primary);
  background: var(--accent);
  border-color: var(--accent);
}
.cz-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.cz-toggle input { accent-color: var(--accent); }
.cz-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;
  margin-bottom: 0.85rem;
}
.cz-metric {
  min-width: 0;
  padding: 0.55rem 0.7rem;
  background: var(--bg-primary);
  border-left: 2px solid var(--accent-secondary);
  border-radius: 5px;
}
.cz-metric-label {
  display: block;
  overflow: hidden;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}
.cz-metric-value {
  display: block;
  overflow: hidden;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cz-sim-current {
  margin: 0 0 0.65rem;
  font-family: var(--font-mono);
  font-size: 1.25rem;
}
.cz-sequence {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  min-height: 3.1rem;
  max-height: 9rem;
  padding: 0.6rem;
  overflow: auto;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  white-space: nowrap;
}
.cz-sequence-item { color: var(--text-primary); }
.cz-sequence-item:nth-child(4n+1) { color: var(--accent); }
.cz-sequence-arrow { color: var(--text-secondary); }
.cz-chart-wrap {
  position: relative;
  height: 21rem;
  padding: 0.35rem 0;
}
.cz-chart-wrap-tall { height: 28rem; }
.cz-gravity-wrap {
  position: relative;
  width: 100%;
  min-height: 28rem;
  overflow: hidden;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 7px;
}
#cz-gravity {
  display: block;
  width: 100%;
  height: 100%;
}
.cz-gravity-tooltip {
  position: absolute;
  z-index: 2;
  display: none;
  padding: 0.38rem 0.5rem;
  color: var(--text-primary);
  background: var(--code-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--text-primary) 12%, transparent);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  line-height: 1.45;
  pointer-events: none;
}
.cz-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0.65rem 0 0;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.7rem;
}
.cz-key::before {
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.3rem;
  background: var(--key-color);
  border-radius: 50%;
  content: "";
}
.cz-note {
  margin: 0.75rem 0 0;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  line-height: 1.55;
}
.cz-definition {
  margin: 1rem 0 0;
  padding: 0.75rem 0.9rem;
  color: var(--text-secondary);
  background: var(--bg-primary);
  border-left: 2px solid var(--accent);
  font-size: 0.9rem;
}
@media (max-width: 600px) {
  .cz-panel { padding: 0.8rem; }
  .cz-panel-head { display: block; }
  .cz-metrics { grid-template-columns: 1fr; }
  .cz-chart-wrap { height: 18rem; }
  .cz-chart-wrap-tall { height: 24rem; }
  .cz-gravity-wrap { min-height: 24rem; }
}
</style>

<div class="cz-shell" id="collatz-chattie">
  <section class="cz-panel" aria-labelledby="cz-sim-title">
    <div class="cz-panel-head">
      <div>
        <span class="cz-kicker">Simulator</span>
        <h2 class="cz-panel-title" id="cz-sim-title">Follow one integer</h2>
        <p class="cz-panel-copy">Run all the way to 1, or advance one application of $T$ at a time.</p>
      </div>
    </div>
    <div class="cz-controls">
      <label class="cz-field" for="cz-seed">Starting value
        <input id="cz-seed" type="number" min="1" max="1000000" step="1" value="27" inputmode="numeric">
      </label>
      <button class="cz-btn cz-btn-primary" id="cz-run" type="button">Run to 1</button>
      <button class="cz-btn" id="cz-step" type="button">One step</button>
      <button class="cz-btn" id="cz-reset" type="button">Reset</button>
    </div>
    <div class="cz-metrics">
      <div class="cz-metric"><span class="cz-metric-label">Current value</span><span class="cz-metric-value" id="cz-current">27</span></div>
      <div class="cz-metric"><span class="cz-metric-label">Steps shown</span><span class="cz-metric-value" id="cz-steps">0</span></div>
      <div class="cz-metric"><span class="cz-metric-label">Peak</span><span class="cz-metric-value" id="cz-peak">27</span></div>
    </div>
    <div class="cz-sequence" id="cz-sequence" aria-live="polite" aria-label="Collatz sequence"></div>
  </section>

  <section class="cz-panel" aria-labelledby="cz-map-title">
    <div class="cz-panel-head">
      <div>
        <span class="cz-kicker">Plot 01 · The rule</span>
        <h2 class="cz-panel-title" id="cz-map-title">One step over the naturals</h2>
        <p class="cz-panel-copy">Each point is $(n,T(n))$. The two straight branches are sampled on alternating integers.</p>
      </div>
    </div>
    <div class="cz-controls">
      <label class="cz-field" for="cz-map-limit">Natural numbers
        <span class="cz-field-row"><input id="cz-map-limit" type="range" min="25" max="400" step="5" value="120"><output id="cz-map-limit-out">1–120</output></span>
      </label>
    </div>
    <div class="cz-chart-wrap">
      <canvas id="cz-map-chart" role="img" aria-label="One Collatz step applied to consecutive natural numbers"></canvas>
    </div>
    <div class="cz-legend" aria-hidden="true">
      <span class="cz-key" style="--key-color: var(--cz-even)">even: $n/2$</span>
      <span class="cz-key" style="--key-color: var(--cz-odd)">odd: $3n+1$</span>
    </div>
  </section>

  <section class="cz-panel" aria-labelledby="cz-primes-title">
    <div class="cz-panel-head">
      <div>
        <span class="cz-kicker">Plot 02 · The iteration</span>
        <h2 class="cz-panel-title" id="cz-primes-title">Trajectories of the first 50 primes</h2>
        <p class="cz-panel-copy">Here the horizontal axis is iteration $k$, and each colored path is $(k,T^k(p))$ for one prime $p$.</p>
      </div>
    </div>
    <div class="cz-controls">
      <label class="cz-toggle"><input id="cz-prime-log" type="checkbox" checked> Logarithmic vertical axis</label>
    </div>
    <div class="cz-metrics">
      <div class="cz-metric"><span class="cz-metric-label">Paths</span><span class="cz-metric-value">50</span></div>
      <div class="cz-metric"><span class="cz-metric-label">Longest path</span><span class="cz-metric-value" id="cz-prime-longest">—</span></div>
      <div class="cz-metric"><span class="cz-metric-label">Highest peak</span><span class="cz-metric-value" id="cz-prime-peak">—</span></div>
    </div>
    <div class="cz-chart-wrap cz-chart-wrap-tall">
      <canvas id="cz-prime-chart" role="img" aria-label="Iterated Collatz trajectories of the first 50 prime numbers"></canvas>
    </div>
    <p class="cz-note">Hover a path to identify its starting prime. The log scale keeps small trajectories visible beside the larger excursions.</p>
  </section>

  <section class="cz-panel" aria-labelledby="cz-gravity-title">
    <div class="cz-panel-head">
      <div>
        <span class="cz-kicker">Plot 03 · A chosen potential</span>
        <h2 class="cz-panel-title" id="cz-gravity-title">A Collatz gravity well?</h2>
        <p class="cz-panel-copy">Every displayed state is placed at a radius determined by how many steps remain before it first reaches the cycle $C=\{1,2,4\}$.</p>
      </div>
    </div>
    <div class="cz-controls">
      <label class="cz-field" for="cz-gravity-limit">Starting values included
        <span class="cz-field-row"><input id="cz-gravity-limit" type="range" min="50" max="500" step="10" value="250"><output id="cz-gravity-limit-out">1–250</output></span>
      </label>
    </div>
    <div class="cz-metrics">
      <div class="cz-metric"><span class="cz-metric-label">Distinct states</span><span class="cz-metric-value" id="cz-gravity-nodes">—</span></div>
      <div class="cz-metric"><span class="cz-metric-label">Deepest layer</span><span class="cz-metric-value" id="cz-gravity-depth">—</span></div>
      <div class="cz-metric"><span class="cz-metric-label">Reached the cycle</span><span class="cz-metric-value" id="cz-gravity-reached">—</span></div>
    </div>
    <div class="cz-gravity-wrap" id="cz-gravity-wrap">
      <canvas id="cz-gravity" role="img" aria-label="Radial Collatz graph where radius represents steps remaining to the 4 2 1 cycle"></canvas>
      <div class="cz-gravity-tooltip" id="cz-gravity-tooltip" role="status"></div>
    </div>
    <div class="cz-legend" aria-hidden="true">
      <span class="cz-key" style="--key-color: var(--cz-even)">even state</span>
      <span class="cz-key" style="--key-color: var(--cz-odd)">odd state</span>
      <span class="cz-key" style="--key-color: var(--text-primary)">4–2–1 cycle</span>
    </div>
    <div class="cz-definition">
      Define $\tau_C(n)=\min\{k\geq 0:T^k(n)\in C\}$. On the finite basin shown here, $\tau_C(T(n))=\tau_C(n)-1$ outside $C$: every non-cycle edge descends one layer toward the center.
    </div>
    <p class="cz-note"><strong>So is 4–2–1 gravitational?</strong> It is an attractor for every starting value computed here, and $\tau_C$ makes that attraction visible. But “gravity” comes from the coordinate choice. Extending the observation to every positive integer would be the Collatz conjecture itself.</p>
  </section>
</div>

<script src="/js/collatz-chattie.js"></script>

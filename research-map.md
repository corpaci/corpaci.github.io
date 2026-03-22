---
layout: page
title: Research Map
permalink: /research/map/
hide_title: true
description: "A categorical navigation of research areas and their morphisms."
---

<style>
  .category-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 820px;
    margin: 0 auto;
  }

  .map-heading {
    font-family: var(--font-ui);
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin: 0 0 4px 0;
  }

  .diagram-wrapper {
    position: relative;
    width: 100%;
    height: 420px;
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .object-node rect {
    fill: var(--bg-primary);
    stroke: var(--border-color);
    stroke-width: 2;
    transition: stroke 0.25s, fill 0.25s;
    rx: 6;
  }

  .object-node text {
    fill: var(--text-primary);
    font-family: var(--font-ui);
    font-size: 13px;
    font-weight: 600;
    pointer-events: none;
  }

  .object-node:hover rect,
  .object-node.active rect {
    stroke: var(--accent);
    fill: var(--code-bg);
    cursor: pointer;
  }

  .morphism path {
    fill: none;
    stroke: var(--text-secondary);
    stroke-width: 2;
    transition: stroke 0.25s, stroke-width 0.25s;
    cursor: pointer;
  }

  .morphism text {
    fill: var(--text-secondary);
    font-family: var(--font-ui);
    font-size: 11px;
    font-style: italic;
    cursor: pointer;
    transition: fill 0.25s;
  }

  .morphism:hover path,
  .morphism.active path {
    stroke: var(--accent);
    stroke-width: 3;
  }

  .morphism:hover text,
  .morphism.active text {
    fill: var(--accent);
    font-weight: 600;
  }

  .explanation-panel {
    background: var(--code-bg);
    padding: 20px 24px;
    border-radius: 8px;
    border-left: 4px solid var(--accent);
    min-height: 110px;
    transition: background-color 0.4s ease;
  }

  .explanation-panel h3 {
    margin: 0 0 8px 0;
    color: var(--accent);
    font-family: var(--font-ui);
    font-size: 1rem;
    font-weight: 600;
  }

  .explanation-panel p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.92rem;
    line-height: 1.6;
  }
</style>

<p class="map-heading">Research Category</p>

<div class="category-container">
  <div class="diagram-wrapper">
    <svg width="100%" height="100%" viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" class="arr-fill"/>
        </marker>
        <marker id="arr-hi" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" class="arr-fill-hi"/>
        </marker>
      </defs>

      <!-- Morphism f: CT → ML (top) -->
      <g class="morphism" onclick="showExplanation('f', event)">
        <path d="M 210 120 L 490 120" marker-end="url(#arr)" />
        <text x="350" y="108" text-anchor="middle">SVD feature extraction (f)</text>
      </g>

      <!-- Morphism g: ML → AI Safety (right) -->
      <g class="morphism" onclick="showExplanation('g', event)">
        <path d="M 560 145 L 560 295" marker-end="url(#arr)" />
        <text x="575" y="220" text-anchor="start" transform="rotate(90 575 220)">interpretability (g)</text>
      </g>

      <!-- Morphism h: CT → AI Safety (diagonal, g ∘ f) -->
      <g class="morphism" onclick="showExplanation('h', event)">
        <path d="M 130 145 Q 220 330 490 315" marker-end="url(#arr)" />
        <text x="280" y="295" text-anchor="middle">coverage estimation (g ∘ f)</text>
      </g>

      <!-- Morphism i: AI Safety → Active Inference (bottom) -->
      <g class="morphism" onclick="showExplanation('i', event)">
        <path d="M 490 340 L 210 340" marker-end="url(#arr)" />
        <text x="350" y="360" text-anchor="middle">endogenous precision-weighting (i)</text>
      </g>

      <!-- Object: Combinatorial Testing -->
      <g class="object-node" transform="translate(30, 95)" onclick="showExplanation('obj-ct', event)">
        <rect width="180" height="50" />
        <text x="90" y="20" text-anchor="middle">Combinatorial</text>
        <text x="90" y="36" text-anchor="middle">Testing</text>
      </g>

      <!-- Object: Machine Learning -->
      <g class="object-node" transform="translate(490, 95)" onclick="showExplanation('obj-ml', event)">
        <rect width="160" height="50" />
        <text x="80" y="20" text-anchor="middle">Spectral</text>
        <text x="80" y="36" text-anchor="middle">ML</text>
      </g>

      <!-- Object: AI Safety / Interpretability -->
      <g class="object-node" transform="translate(490, 295)" onclick="showExplanation('obj-safety', event)">
        <rect width="160" height="50" />
        <text x="80" y="20" text-anchor="middle">AI Safety &amp;</text>
        <text x="80" y="36" text-anchor="middle">Interpretability</text>
      </g>

      <!-- Object: Active Inference -->
      <g class="object-node" transform="translate(30, 295)" onclick="showExplanation('obj-alife', event)">
        <rect width="180" height="50" />
        <text x="90" y="20" text-anchor="middle">Active Inference</text>
        <text x="90" y="36" text-anchor="middle">&amp; FEP</text>
      </g>
    </svg>
  </div>

  <div class="explanation-panel" id="panel">
    <h3>Research Category</h3>
    <p id="panel-text">Click an object or morphism to see how the research areas connect. The diagram is a category; arrows compose.</p>
  </div>
</div>

<script>
  var contentMap = {
    'f': {
      title: 'f : Combinatorial Testing → Spectral ML',
      text: 'Represent a covering array as a matrix; compute its SVD. Combinatorial structure becomes continuous spectral data: singular values, entropy, condition number. The ICTSS 2024 paper lives here.'
    },
    'g': {
      title: 'g : Spectral ML → AI Safety & Interpretability',
      text: 'Spectral metrics of weight matrices reveal internal structure in language models. The same SVD-entropy probes that estimate t-way coverage can probe LLM internal geometry ; decision boundaries, representation collapse, feature entanglement.'
    },
    'h': {
      title: 'g ∘ f : Coverage Estimation',
      text: 'The composed morphism. Predicting combinatorial coverage via spectral ML is a heuristic that commutes with the exact combinatorial calculation ; at a fraction of the cost. The diagram commutes (up to approximation error).'
    },
    'i': {
      title: 'i : AI Safety → Active Inference & FEP',
      text: 'A system with endogenous precision-weighting ; one that generates its own sense of what errors count ; is different in kind from a system executing instructions. This morphism asks whether interpretability probes can detect the boundary between imposed and endogenous relevance structure.'
    },
    'obj-ct': {
      title: 'Combinatorial Testing',
      text: 'Covering arrays, t-way interaction coverage, systematic test-suite design. The combinatorial structure is the input domain.'
    },
    'obj-ml': {
      title: 'Spectral ML',
      text: 'SVD entropy, spectral radius, condition number ; continuous complexity metrics derived from matrix structure. Lasso and gradient-boosted regressors trained on these features.'
    },
    'obj-safety': {
      title: 'AI Safety & Interpretability',
      text: 'Mechanistic interpretability, representational probing, decision-boundary geometry in language models. Where formal methods meet the question of what these systems are doing internally.'
    },
    'obj-alife': {
      title: 'Active Inference & FEP',
      text: 'The Free Energy Principle and its boundary conditions: what separates a thermostat from a bacterium from an LLM? Endogenous precision-weighting as the candidate criterion.'
    }
  };

  function showExplanation(id, event) {
    var panel = document.getElementById('panel');
    var title = panel.querySelector('h3');
    var text = document.getElementById('panel-text');

    document.querySelectorAll('.morphism, .object-node').forEach(function(el) {
      el.classList.remove('active');
    });

    if (event && event.currentTarget) {
      event.currentTarget.classList.add('active');
    }

    if (contentMap[id]) {
      title.innerText = contentMap[id].title;
      text.innerText = contentMap[id].text;
      panel.style.transition = 'none';
      panel.style.backgroundColor = 'color-mix(in srgb, var(--accent) 12%, var(--code-bg))';
      setTimeout(function() {
        panel.style.transition = 'background-color 0.5s ease';
        panel.style.backgroundColor = '';
      }, 60);
    }
  }

  document.querySelectorAll('.morphism').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      el.querySelector('path').setAttribute('marker-end', 'url(#arr-hi)');
    });
    el.addEventListener('mouseleave', function() {
      if (!el.classList.contains('active')) {
        el.querySelector('path').setAttribute('marker-end', 'url(#arr)');
      }
    });
  });
</script>

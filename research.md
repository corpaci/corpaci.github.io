---
layout: page
title: Research
subtitle: Active threads and publications.
permalink: /research/
---

I study semantic faithfulness in AI systems: when intent is translated into specs, code, tests, proofs, tool calls, or explanations, does the meaning survive, or does the artifact just look locally valid while the content drifted? Formal verification and equational theories are the grounded evals I use to ask that question, from hardware to interpretability to bias measurement.

## Active Threads

<div class="research-thread" id="semantic-faithfulness">
<div class="thread-status">Active · Research</div>

### Semantic Faithfulness Across Representations

AI systems translate intent into plans, specs, code, tests, proofs, and tool calls. Each artifact can look locally valid while failing to preserve what it was supposed to mean ; a model can produce a formally valid proof, test, or implementation of the wrong meaning.

**Testbed:** the [Equational Theories Project](https://github.com/teorth/equational_theories), which gives Lean-verified implications and non-implications between equational laws ; external, mechanically-checked ground truth for whether two statements are actually equivalent.

**Method:** construct content-preserving vs. drifted pairs across representations that vary in formality and ambiguity (bare equation, natural-language paraphrase, formal query, counterexample framing, ...), then measure whether a probe is sensitive to the semantic invariant or just to surface form.

**Initial observations** (numbers as published on the [SAIR embedding geometry](/projects/sair-embedding-geometry/) project; the surface-structure control is still pending): a linear probe trained and evaluated within a single template reaches 0.915 accuracy, but training on one template and testing on another collapses to 0.532 ; near chance, a transfer gap of 0.383. The signal a probe finds is anchored in surface form more than in the underlying semantic invariant.

**Why this matters for safety:** this looks like an upstream mechanism of Goodhart ; a proxy can stop tracking what it's supposed to measure before anyone has even optimized against it, purely from a change in surface representation.

**How this could be wrong:**
- The checker itself may encode the wrong meaning ; grounding against an external verifier relocates trust rather than eliminating it. Best current response: use a checker independent of the representation being tested (Lean, not another LLM), and treat drift in the checker as its own explicit risk.
- Behavioral evals plus adversarial training may turn out to be sufficient in practice, without any correspondence guarantee. Best current response: track both approaches rather than assuming grounding is necessary ; if adversarial training closes the same gap, that's informative on its own.

**Planned outputs:** an eval suite over representation pairs, a contamination probe, a benchmark, and a mechanistic follow-up on what the probe is actually keying on.

</div>

<div class="research-thread" id="limits-to-formalization">
<div class="thread-status">Active · Research</div>

### [Limits to Formalization](/formalization-limits/)

What happens when you take fuzzy input and produce something measurable and checkable? Self-reference creates paradoxes, and finite formalizations don't capture all true statements about sufficiently rich domains. [Full thread →](/formalization-limits/)

</div>

<div class="research-thread" id="interpretability-grounding">
<div class="thread-status">Active · Research</div>

### [Interpretability and Grounding](/interpretability-grounding/)

A system's outputs encode the structure of the measuring system itself ; what I call Grounding Relative Understanding (GRU), and what it implies for whether SAE features are stable at rule-gap boundaries. [Full thread →](/interpretability-grounding/)

</div>

<div class="research-thread" id="bias-measurement">
<div class="thread-status">Active · Research</div>

### [Social Bias Measurement](/projects/bias-measurement/)

Measuring social bias in language models with midpoint geometry instead of deviation from an arbitrary reference point, with Soheyb Kouider. [Full thread →](/projects/bias-measurement/)

</div>

<div class="research-thread" id="active-inference">
<div class="thread-status">Active · Research</div>

### [Active Inference & the Living/Non-Living Boundary](/active-inference/)

What distinguishes a thermostat from a cell: whether the relevance-weighting over prediction errors is endogenously generated through organizational closure. [Full thread →](/active-inference/)

</div>

<div class="research-thread" id="collective-intelligence">
<div class="thread-status">Active · Collaboration</div>

### [Collective Intelligence](/collective-intelligence/)

Infrastructure for collective intelligence and value alignment ; the Mutual Thriving framework with collaborators Marian and Johannes. [Full thread →](/collective-intelligence/)

</div>

<div class="research-thread" id="ai-safety">
<div class="thread-status">Active · Research</div>

### [AI Safety](/ai-safety/)

My approach runs through interpretability: if we cannot reliably read what a model is doing internally, we cannot make strong guarantees about its behavior in deployment. [Full thread →](/ai-safety/)

</div>

<div class="research-thread" id="category-theory">
<div class="thread-status">Active · Research</div>

### [Category Theory](/category-theory/)

Structure that travels across domains ; functors, natural transformations, and adjunctions keep appearing across logic, computation, linguistics, and learning. [Full thread →](/category-theory/)

</div>

## Publications

<ul class="publications">
  <li>
    <span class="publication-award">Best Paper</span><br>
    L. Corpaci, M. Wagner, S. Raubitzek, L. Kampel, K. Mallinger, D. E. Simos. <em>Estimating Combinatorial t-Way Coverage Based on Matrix Complexity Metrics.</em> <strong>ICTSS 2024</strong>: 3-20. <a href="https://doi.org/10.1007/978-3-031-80889-0_1">DOI</a>
  </li>
  <li>
    K. Mallinger, L. Corpaci, T. Neubauer, I. E. Tikász, T. M. Banhazi. <em>Unsupervised and supervised machine learning approach to assess user readiness levels for precision livestock farming technology adoption.</em> Computers and Electronics in Agriculture, 213: 108239, 2023. <a href="https://doi.org/10.1016/j.compag.2023.108239">DOI</a>
  </li>
  <li>
    S. Raubitzek, L. Corpaci, R. Hofer, K. Mallinger. <em>Scaling Exponents of Time Series Data: A Machine Learning Approach.</em> Entropy 25(12): 1671, 2023.
  </li>
</ul>

---
layout: page
title: Research
subtitle: Active threads and publications.
permalink: /research/
description: "Active research threads on semantic faithfulness, limits to formalization, interpretability and grounding, and bias measurement. Each thread is labelled by evidence level."
epistemic_status: Research overview
epistemic_note: Each thread below is labeled by evidence level; experimental findings, hypotheses, and conceptual work are not presented as equivalent kinds of support.
---

I study semantic faithfulness in AI systems: when intent is translated into specs, code, tests, proofs, tool calls, or explanations, does the meaning survive, or does the artifact just look locally valid while the content drifted? Formal verification and equational theories are the grounded evals I use to ask that question, from hardware to interpretability to bias measurement.

## Active Threads

<div class="research-thread" id="semantic-faithfulness" markdown="1">
<div class="thread-status">Empirical program · Exploratory results</div>

### Semantic Faithfulness Across Representations

AI systems translate intent into plans, specs, code, tests, proofs, and tool calls. Each artifact can look locally valid while failing to preserve what it was supposed to mean. A model can produce a formally valid proof, test, or implementation of the wrong meaning.

**Testbed:** the [Equational Theories Project](https://github.com/teorth/equational_theories), which gives Lean-verified implications and non-implications between formalized equational laws: an external, mechanically checked reference for the encoded relation.

**Method:** construct content-preserving vs. drifted pairs across representations that vary in formality and ambiguity (bare equation, natural-language paraphrase, formal query, counterexample framing, ...), then measure whether a probe is sensitive to the semantic invariant or just to surface form.

**Initial observations** (numbers reported on the [SAIR embedding geometry](/projects/sair-embedding-geometry/) project; the surface-structure control is still pending): a linear probe trained and evaluated within a single template reaches 0.915 accuracy, while mean cross-template accuracy is 0.532, a transfer gap of 0.383. This shows that the recovered label signal is not template-invariant in this setup; the pending control is needed to determine how much of the gap is explained by surface structure.

**Interpretation to test:** representation changes can break the relationship between a probe and its target even before anyone optimizes against that probe. This resembles one ingredient of Goodhart-style failure, but the pilot does not establish a general Goodhart mechanism.

**How this could be wrong:**
- The checker itself may encode the wrong meaning; grounding against an external verifier relocates trust rather than eliminating it. Best current response: use a checker independent of the representation being tested (Lean, not another LLM), and treat drift in the checker as its own explicit risk.
- Behavioral evals plus adversarial training may turn out to be sufficient in practice, without any correspondence guarantee. Best current response: track both approaches rather than assuming grounding is necessary. If adversarial training closes the same gap, that's informative on its own.

**Planned outputs:** an eval suite over representation pairs, a contamination probe, a benchmark, and a mechanistic follow-up on what the probe is actually keying on.

</div>

<div class="research-thread" id="limits-to-formalization" markdown="1">
<div class="thread-status">Conceptual inquiry</div>

### [Limits to Formalization](/formalization-limits/)

What happens when you take fuzzy input and produce something measurable and checkable? This thread separates proved limits for formal systems under explicit hypotheses from open questions about specification and meaning. [Full thread →](/formalization-limits/)

</div>

<div class="research-thread" id="interpretability-grounding" markdown="1">
<div class="thread-status">Methodological hypothesis</div>

### [Interpretability and Grounding](/interpretability-grounding/)

Interpretability findings depend on the model, probe, data, and intervention. I use Grounding Relative Understanding (GRU) as shorthand for that measurement discipline and ask whether SAE features remain stable at rule-gap boundaries. [Full thread →](/interpretability-grounding/)

</div>

<div class="research-thread" id="bias-measurement" markdown="1">
<div class="thread-status">Experimental project · Unpublished</div>

### [Social Bias Measurement](/projects/bias-measurement/)

Measuring social bias in language models with midpoint geometry instead of deviation from an arbitrary reference point, with Soheyb Kouider. [Full thread →](/projects/bias-measurement/)

</div>

<div class="research-thread" id="collective-intelligence" markdown="1">
<div class="thread-status">Conceptual collaboration</div>

### [Collective Intelligence](/collective-intelligence/)

Infrastructure for collective intelligence and value alignment: the Mutual Thriving framework with collaborators Marian and Johannes. [Full thread →](/collective-intelligence/)

</div>

<div class="research-thread" id="ai-safety" markdown="1">
<div class="thread-status">Research position</div>

### [AI Safety](/ai-safety/)

My current approach emphasizes interpretability and formal evaluation while treating their measurement limits as limits on the guarantees they can support. [Full thread →](/ai-safety/)

</div>

<div class="research-thread" id="self-reference-map" markdown="1">
<div class="thread-status">Conceptual map · Similarity is not equivalence</div>

### [Self-Reference Map](/map/)

24 examples and analogies involving self-reference, from recursive definitions and quines through Gödel and Tarski to Goodhart, ELK, and mesa-optimization, arranged by explicitly chosen features. The map proposes comparisons; it does not establish that the phenomena are equivalent. [Explore →](/map/)

</div>

## Publications

<ul class="publications">
  <li>
    <span class="publication-award">Best Paper</span><br>
    L. Corpaci, M. Wagner, S. Raubitzek, L. Kampel, K. Mallinger, D. E. Simos. <em>Estimating Combinatorial t-Way Coverage Based on Matrix Complexity Metrics.</em> <strong>ICTSS 2024</strong>, pages 3 to 20. <a href="https://doi.org/10.1007/978-3-031-80889-0_1">DOI</a>
  </li>
  <li>
    K. Mallinger, L. Corpaci, T. Neubauer, I. E. Tikász, T. M. Banhazi. <em>Unsupervised and supervised machine learning approach to assess user readiness levels for precision livestock farming technology adoption.</em> Computers and Electronics in Agriculture, 213: 108239, 2023. <a href="https://doi.org/10.1016/j.compag.2023.108239">DOI</a>
  </li>
  <li>
    S. Raubitzek, L. Corpaci, R. Hofer, K. Mallinger. <em>Scaling Exponents of Time Series Data: A Machine Learning Approach.</em> Entropy 25(12): 1671, 2023. <a href="https://doi.org/10.3390/e25121671">DOI</a>
  </li>
</ul>

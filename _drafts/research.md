---
layout: page
title: Research
subtitle: Active threads and publications.
permalink: /research/
---

## Active Threads

<div class="research-thread" id="limits-to-formalization">
<div class="thread-status">Active · Research</div>

### Limits to Formalization

What happens when you take fuzzy input and produce something measurable / checkable? Self-reference creates paradoxes (Tarski[^tarski], Gödel[^godel]); finite formalizations don't capture all true statements about some (sufficiently rich) domains. The main tension: syntax is tractable[^tractable], semantics is rich[^rich], and formalization covers them imperfectly. I'm interested in the maximal[^maximal] complexity that can be compressed through formalization, the syntax-semantics interface (where structure ends and meaning begins), and whether there exists a natural language kernel that is fully formalizable[^kernel].

One direction recommended by [Leo de Moura's work on Lean](https://lean-lang.org/): formalization as bootstrapping — using a program implemented from a spec as a spec for an improved program, where each iteration collapses semantic ambiguity into syntactic commitment[^commitment] and quality becomes improvement rather than correspondence to a fixed ground truth.

[^tarski]: Tarski's undefinability theorem: no sufficiently expressive language can define its own truth predicate. The condition is that the language must be able to express basic arithmetic. Truth for a language can only be defined in a richer metalanguage — you always need to step outside.

[^godel]: Gödel's incompleteness theorems: any consistent formal system capable of expressing basic arithmetic contains true statements it cannot prove (first theorem) and cannot prove its own consistency (second theorem). The formal system is necessarily incomplete from within.

[^tractable]: Syntactic objects — strings, symbols, formal expressions — can be mechanically manipulated, checked, and compared. You can write algorithms over them. They hold still.

[^rich]: Semantic content — meaning, reference, truth conditions — resists mechanical capture because it's tied to context, interpretation, and the world outside the formal system. It doesn't hold still.

[^maximal]: Chaitin's incompleteness gives the bound: for any formal system F, there's a constant c such that F cannot prove any specific string has Kolmogorov complexity greater than c. The formalism can't reach beyond its own weight class — the ceiling on what you can certifiably compress is bounded by the complexity of the formal system itself.

[^kernel]: Controlled natural languages (like Attempto Controlled English) are fragments designed to map cleanly to first-order logic — simple declaratives with unambiguous referents. The formalizable region ends where context-dependence, deixis, metaphor, and pragmatic implication take over. The boundary isn't sharp; there's a gradient, and the fully formalizable fragment is narrow enough that it barely feels like natural language anymore.

[^commitment]: Implementation forces you to resolve every ambiguity the spec left open. "Handle errors appropriately" becomes a concrete choice about *how*. Each such choice collapses the space of possible interpretations into one specific form. In the bootstrapping loop, these commitments accumulate: the next spec inherits resolved ambiguities from the previous implementation, and the process converges toward increasing precision.

</div>

<div class="research-thread" id="gru">
<div class="thread-status">Active · Research</div>

### Grounding Relative Understanding (GRU)

A system's outputs encode the structure of the measuring system itself. This principle, connected to the ICTSS 2024 result on spectral metrics, gives a basis for thinking about what interpretability methods can and cannot reveal about neural networks. The connection to Fisher Information is key: the information a measurement carries about a parameter is bounded by the geometry of the measurement apparatus. Applied to interpretability, this means the features we extract from a model are as much about our probing method as about the model itself.

</div>

<div class="research-thread" id="sae-invariance">
<div class="thread-status">Active · Research</div>

### SAE Feature Invariance

Probing how sparse autoencoder features behave in ambiguous contexts using tacit knowledge and rule-gap situations as the main test. The question is whether SAE features remain stable across the boundary between clear and ambiguous inputs, and what breaks when they don't. This matters for AI safety because feature instability in ambiguous regions is precisely where a system is most likely to be operating outside its reliable regime — and where we most need interpretability to work.

</div>

<div class="research-thread" id="bias-measurement">
<div class="thread-status">Active · Research</div>

### Social Bias Measurement

An experimental framework using the BBQ dataset and SONAR embeddings, with midpoint geometry as the principled bias metric. The goal is to measure social bias in language models with mathematical rigor rather than ad hoc benchmarks. The specific insight: midpoint geometry avoids the reference-group problem that plagues most bias benchmarks — instead of measuring deviation from an arbitrary "neutral" baseline, it measures the geometric structure of the embedding space itself.

</div>

<div class="research-thread" id="mutual-thriving">
<div class="thread-status">Active · Collaboration</div>

### Mutual Thriving

Infrastructure for collective intelligence and value alignment implemented in a framework with my collaborators, Marian and Johannes. Includes community formats, epistemic tools, and a shared vocabulary for reasoning about alignment at the human level. Theoretically grounded in active inference — the idea that collectives, like individuals, maintain themselves by minimizing surprise about their own boundaries and states.

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

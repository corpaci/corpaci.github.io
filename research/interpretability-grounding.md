---
layout: page
title: Interpretability and Grounding
subtitle: What measurement can and cannot reveal about neural networks.
permalink: /research/interpretability-grounding/
---

<div class="nerd-only" markdown="1">

A system's outputs encode the structure of the measuring system itself. This principle — Grounding Relative Understanding (GRU) — is the interpretability consequence of the ICTSS 2024 result on spectral metrics.

**The Fisher Information connection.** The information a measurement carries about a parameter is bounded by the geometry of the measurement apparatus: $I(\theta; X) \leq I(\theta; f(X))$ with equality iff $f$ is sufficient. Applied to interpretability: the features you extract from a model are a joint product of the model *and* the probe. Your probing method is not neutral. The features you find tell you about the model filtered through the probe's geometry — and most of the field is not being careful about this.

This is not a bug in interpretability methodology. It's the methodology's fundamental structure. It means: (1) probing results should always be reported relative to their probe architecture, (2) feature comparisons across different probing methods are not apples-to-apples, and (3) the claim that a feature represents some concept is always a claim about the (model, probe) pair, not the model alone.

**SAE feature invariance.** The applied question: do sparse autoencoder features remain stable across the boundary between clearly-in-distribution inputs and rule-gap territory — cases where the training regime said nothing specific? Feynman would ask: stable in what sense? Stable under what transformation group? I mean: does the feature activation geometry remain consistent when inputs transition into the rule-gap region? If features fracture there, that is a precise safety-relevant signal. We are most exposed exactly where interpretability is most likely to break.

**Planned experiments:**

1. Identify rule-gap boundary cases using the ICTSS spectral complexity metric as a prior (high-complexity regions = likely ambiguity).
2. Measure SAE feature activation distributions at clean inputs vs. boundary inputs.
3. Test whether feature geometry (cosine similarity structure, clustering) is stable across the boundary.
4. Correlate instability with model output variance — does feature fracture predict behavioral inconsistency?
5. Repeat across multiple SAE architectures and probe methods to test whether instability is a model property or a (model, probe) property.
6. Extend to out-of-distribution inputs where ground truth behavior is available (controlled ambiguity injection).
7. Develop a stability metric that can be computed without requiring explicit boundary labels.
8. Test whether stability predicts downstream task performance on ambiguous inputs.
9. Compare stability profiles across model scales — does larger = more stable at boundaries?
10. Connect stability to the endogenous precision-weighting question from the active inference thread.
11. Formalize GRU in terms of sufficient statistics and test whether "more sufficient" probes give more stable features.
12. Draft: a probe-relative feature report format for interpretability papers.

</div>

<div class="public-only" markdown="1">

A system's outputs encode the structure of the measuring system itself. This is the core idea I call Grounding Relative Understanding (GRU): when you probe a neural network with a measurement tool, what you find is partly a property of the network and partly a property of the tool.

This matters for interpretability — the field that tries to understand what's happening inside AI systems. Most interpretability results are reported as if the measurement tool were transparent. GRU says it isn't. The "features" you find in a model are always features of the (model + probe) pair.

The applied question: do the internal features of a neural network remain stable when the network is operating in ambiguous situations it wasn't explicitly trained on? If not, that's precisely where interpretability breaks down — and where we most need it to work.

</div>

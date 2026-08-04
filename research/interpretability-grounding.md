---
layout: page
title: Interpretability and Grounding
subtitle: What measurement can and cannot reveal about neural networks.
permalink: /interpretability-grounding/
epistemic_status: Methodological hypothesis
epistemic_note: GRU is my name for a measurement discipline, not an established theorem. The proposed connection to SAE stability is a testable research direction.
---

Interpretability measurements depend on both the object being measured and the instrument. I use **Grounding Relative Understanding (GRU)** as shorthand for keeping the model, probe, data, and intervention visible when interpreting a result.

Moving from an extracted pattern to a claim about a model's representation requires controls: the same pattern may change with the probe, dataset, layer, or intervention. GRU therefore treats a reported feature first as a result of a particular measurement setup. Stronger claims require evidence that the feature survives relevant changes to that setup.

The applied question is whether internal features remain stable when a network operates in ambiguous situations it was not explicitly trained on. Instability would identify a limit of that model and measurement pairing; it would not, by itself, show that interpretability fails in general.

<div class="in-night" markdown="1">

The ICTSS 2024 result on spectral metrics motivates this line of questioning, but it does not establish GRU as a consequence.

**The Fisher-information connection.** Under the usual regularity conditions, deterministic processing cannot increase the Fisher information a measurement carries about a parameter: $I(\theta; f(X)) \leq I(\theta; X)$, with equality when $f(X)$ is sufficient for $\theta$. This supplies an analogy and one route to formalization: a probe can discard or reshape accessible information. It does not prove a universal bound on every interpretability method.

The resulting reporting discipline is: (1) state the probe architecture and data, (2) avoid treating results from different probes as directly comparable without calibration, and (3) distinguish “this setup recovers a feature” from the stronger claim that the model uses that feature causally.

**SAE feature invariance hypothesis.** Do sparse-autoencoder features remain stable across the boundary between clearly in-distribution inputs and rule-gap territory, cases where the training regime said nothing specific? Here, stability means that feature-activation geometry remains consistent under defined input transformations. A fracture could be a useful warning about that SAE's transfer behavior; its relationship to downstream safety would still need to be shown.

**Planned experiments:**

1. Identify rule-gap boundary cases using the ICTSS spectral complexity metric as a prior (high-complexity regions = likely ambiguity).
2. Measure SAE feature activation distributions at clean inputs vs. boundary inputs.
3. Test whether feature geometry (cosine similarity structure, clustering) is stable across the boundary.
4. Correlate instability with model output variance: does feature fracture predict behavioral inconsistency?
5. Repeat across multiple SAE architectures and probe methods to test whether instability is a model property or a (model, probe) property.
6. Extend to out-of-distribution inputs where an independently checked behavioral target is available (controlled ambiguity injection).
7. Develop a stability metric that can be computed without requiring explicit boundary labels.
8. Test whether stability predicts downstream task performance on ambiguous inputs.
9. Compare stability profiles across model scales: does larger = more stable at boundaries?
10. Formalize GRU in terms of sufficient statistics and test whether "more sufficient" probes give more stable features.
11. Draft: a probe-relative feature report format for interpretability papers.

</div>

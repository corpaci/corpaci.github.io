---
layout: page
title: Social Bias Measurement
subtitle: Geometric rigor over ad hoc benchmarks.
permalink: /projects/bias-measurement/
---

An experimental framework for measuring social bias in AI language models with mathematical rigor, rather than ad hoc benchmarks. With Soheyb Kouider.

The specific insight: most bias metrics measure deviation from a "neutral" reference point ; but that reference point is always chosen by someone, and that choice is never truly neutral. Midpoint geometry replaces a one-sided reference group with a symmetric construction: given two chosen group representations, it measures their relative structure in a specified embedding space and metric.

This connects to a broader question: what can be measured before defining "fair"? Relative structure can be measured without fixing an absolute baseline, but interpreting that structure as unfairness still requires normative and contextual choices.

**Methodological basis:** the combinatorial machinery builds on L. Corpaci, M. Wagner, S. Raubitzek, L. Kampel, K. Mallinger, D. E. Simos. *Estimating Combinatorial t-Way Coverage Based on Matrix Complexity Metrics.* **ICTSS 2024**: 3–20. [DOI](https://doi.org/10.1007/978-3-031-80889-0_1) ; Best Paper Award. The bias-measurement work itself is not yet published.

[Interactive playground →](/projects/ictss-playground/)

<div class="in-night" markdown="1">

**The reference-group problem, more precisely.** Once the two group representations, embedding model, and distance metric are fixed, their midpoint is a symmetric reference point determined by that geometry. This removes the asymmetry of selecting one group as the default baseline ; it does not make the result normatively neutral or eliminate the external choices that define the geometry.

**The combinatorial testing angle.** The BBQ dataset has structure: social categories (race, gender, religion, etc.) interact. A model that performs well on each category independently may still behave unexpectedly when categories co-occur. Covering arrays let us enumerate the *t*-way interactions systematically rather than relying on what happened to appear in the benchmark. The same combinatorial machinery that applies to test suite design applies here.

**The GRU connection.** LLM decision boundaries in SONAR space reveal internal precision-weighting that isn't specified by the training objective. The model's own geometry generates relevance ; which groups it treats as similar, which as distant ; in ways that weren't externally imposed. This is one of the two empirical anchors for the [active inference](/active-inference/) thread.

</div>

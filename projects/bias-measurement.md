---
layout: page
title: Social Bias Measurement
subtitle: Geometric rigor over ad hoc benchmarks.
permalink: /projects/bias-measurement/
---

<div class="night-only" markdown="1">

An experimental framework using the BBQ dataset and SONAR embeddings, with midpoint geometry as the principled bias metric. With Soheyb Kouider (primary collaborator on the geometric framing).

**The reference-group problem.** Most bias benchmarks measure deviation from a "neutral" baseline — but who chooses the baseline? The choice is arbitrary, and the metric is contaminated by that arbitrariness. Midpoint geometry sidesteps this: instead of measuring distance from an external anchor, it measures the geometric structure of the embedding space itself — which groups cluster together, which are separated, and by how much. The midpoint between two group representations is the natural bias-neutral reference point, requiring no external calibration.

**The combinatorial testing angle.** The BBQ dataset has structure: social categories (race, gender, religion, etc.) interact. A model that performs well on each category independently may still behave unexpectedly when categories co-occur. Covering arrays let us enumerate the *t*-way interactions systematically rather than relying on what happened to appear in the benchmark. The same combinatorial machinery that applies to test suite design applies here.

**The GRU connection.** LLM decision boundaries in SONAR space reveal internal precision-weighting that isn't specified by the training objective. The model's own geometry generates relevance — which groups it treats as similar, which as distant — in ways that weren't externally imposed. This is one of the two empirical anchors for the [active inference](/research/active-inference/) thread.

**Publication:** L. Corpaci, M. Wagner, S. Raubitzek, L. Kampel, K. Mallinger, D. E. Simos. *Estimating Combinatorial t-Way Coverage Based on Matrix Complexity Metrics.* **ICTSS 2024**: 3–20. [DOI](https://doi.org/10.1007/978-3-031-80889-0_1) — Best Paper Award.

</div>

<div class="day-only" markdown="1">

An experimental framework for measuring social bias in AI language models with mathematical rigor, rather than ad hoc benchmarks. With Soheyb Kouider.

The specific insight: most bias metrics measure deviation from a "neutral" reference point — but that reference point is always chosen by someone, and that choice is never truly neutral. Midpoint geometry avoids this by measuring the shape of the embedding space itself: how groups cluster, how far apart they are, what the natural midpoints between them look like.

This connects to a broader question: how do you measure unfairness without first defining "fair"? We argue you can measure relative structure without fixing an absolute baseline.

**Publication:** L. Corpaci, M. Wagner, S. Raubitzek, L. Kampel, K. Mallinger, D. E. Simos. *Estimating Combinatorial t-Way Coverage Based on Matrix Complexity Metrics.* **ICTSS 2024**: 3–20. [DOI](https://doi.org/10.1007/978-3-031-80889-0_1) — Best Paper Award.

[Interactive playground →](/projects/ictss-playground/)

</div>

---
layout: page
title: Social Bias Measurement
subtitle: Geometric rigor over ad hoc benchmarks.
permalink: /projects/bias-measurement/
epistemic_status: Experimental project
epistemic_note: This work is unpublished. Its geometry is descriptive; interpreting geometric differences as bias or harm still requires normative and contextual choices.
---

An experimental framework for describing social-bias patterns in language models with geometric and combinatorial tools. With Soheyb Kouider.

The specific motivation: many bias metrics measure deviation from a designated reference group. That designation encodes a modeling choice. Midpoint geometry replaces a one-sided reference group with a symmetric construction: given two chosen group representations, it measures their relative structure in a specified embedding space and metric.

This connects to a broader question: what can be measured before defining "fair"? Relative structure can be measured without fixing an absolute baseline, but interpreting that structure as unfairness still requires normative and contextual choices.

**Methodological basis:** the combinatorial machinery builds on L. Corpaci, M. Wagner, S. Raubitzek, L. Kampel, K. Mallinger, D. E. Simos. *Estimating Combinatorial t-Way Coverage Based on Matrix Complexity Metrics.* **ICTSS 2024**, pages 3 to 20. [DOI](https://doi.org/10.1007/978-3-031-80889-0_1). Best Paper Award. The bias-measurement work itself is not yet published.

[Interactive playground →](/projects/ictss-playground/)

<div class="in-night" markdown="1">

**The reference-group problem, more precisely.** Once the two group representations, embedding model, and distance metric are fixed, their midpoint is a symmetric reference point determined by that geometry. This removes the asymmetry of selecting one group as the default baseline; it does not make the result normatively neutral or eliminate the external choices that define the geometry.

**The combinatorial testing angle.** The BBQ dataset has structure: social categories (race, gender, religion, etc.) interact. A model that performs well on each category independently may still behave unexpectedly when categories co-occur. Covering arrays let us enumerate the *t*-way interactions systematically rather than relying on what happened to appear in the benchmark. The same combinatorial machinery that applies to test suite design applies here.

**Possible GRU connection.** Differences in SONAR-space decision geometry may reflect the model, embedding system, prompts, or their interaction. Testing stability across those choices could inform interpretability; the current setup does not establish an intrinsic model geometry.

</div>

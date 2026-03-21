---
layout: post
title: "What Your Probe Tells You About Yourself"
permalink: /blog/what-your-probe-tells-you
tags: [interpretability, ai-safety, formal-methods]
description: "GRU as an interpretability meta-result: the Fisher Information geometry of probing, and the Cramér-Rao bound as a statement about measurement."
---

<div class="night-only" markdown="1">

Every microscope has a fingerprint. The structures you see through it are partly in the specimen and partly in the optics. This is not a defect of microscopy ; it's its fundamental structure. The right response is not to pretend the fingerprint isn't there, but to characterize it precisely.

<!--more-->

The Fisher Information bound makes this precise for measurement in general: $I(\theta; X) \leq I(\theta; f(X))$ with equality iff $f$ is a sufficient statistic. The information you can extract about a parameter $\theta$ from a measurement $f(X)$ is bounded by the information in the raw data $X$, with equality only when $f$ captures everything relevant about $\theta$. Any lossy transformation ; any probe that isn't sufficient ; loses information, and that loss depends on the geometry of $f$ relative to $\theta$.

Applied to interpretability: you have a model $M$ and a probing method $P$ (a linear probe, a sparse autoencoder, a causal intervention). The features you find are not features of $M$ alone. They are features of $(M, P)$. The Cramér-Rao bound says your estimate of any model parameter has variance at least $1/I(\theta; P(M))$ ; and that lower bound depends on how well $P$ is matched to the structure of $M$.

**What this means in practice:**

1. Two probing methods on the same model will find different "features" ; this is not disagreement about the model, it's disagreement about $(M, P_1)$ vs $(M, P_2)$.
2. A feature that's stable under one probing method may be unstable under another. Stability is a property of the probe-model pair, not the model.
3. When you claim "the model represents concept $C$ in layer $L$," you are making a claim about $(M, P)$ ; and the claim is only as strong as $P$'s sufficiency for $C$.
4. Comparing features across models requires holding the probe constant ; and even then, the comparison is in probe-space, not model-space.

I call this Grounding Relative Understanding (GRU). It's not skepticism about interpretability ; it's a demand for precision about what interpretability results are actually claims about.

The ICTSS 2024 result[^ictss] is the empirical anchor: spectral matrix complexity metrics predict combinatorial coverage ; a case where the structure of the measuring apparatus (the spectral transform) shows up explicitly in the measurement. GRU is the generalization.

[^ictss]: L. Corpaci, M. Wagner, S. Raubitzek, L. Kampel, K. Mallinger, D. E. Simos. *Estimating Combinatorial t-Way Coverage Based on Matrix Complexity Metrics.* ICTSS 2024: 3–20. Best Paper Award.

</div>

<div class="day-only" markdown="1">

Every microscope has a fingerprint. The patterns you see through it are partly in the specimen and partly in the glass. A good microscopist knows this and accounts for it. A careless one mistakes the optics for reality.

<!--more-->

Interpretability research ; the field that tries to understand what's happening inside AI systems ; has a microscope problem.

When researchers probe a neural network and say "we found a feature that represents 'royalty' in layer 7," they're reporting what their probing method found. The probing method is a lens. Like any lens, it has a fingerprint: it emphasizes some structures and suppresses others. The "royalty feature" is partly in the model and partly in the lens.

This doesn't make interpretability wrong. It makes interpretability a statement about (model + measurement tool), not model alone.

The practical consequence: two research groups using different probing methods on the same model will find different features. This isn't disagreement ; it's two different lenses showing two different projections of the same object. Neither is complete. Neither is wrong. But neither can be directly compared to the other without accounting for the difference in optics.

I call this Grounding Relative Understanding. The key move is to stop asking "what does the model represent?" and start asking "what does the (model, probe) pair represent, and what is the probe geometry?"

This is harder. It requires characterizing the probe as carefully as the model. But it's the only way to make interpretability results that generalize.

</div>

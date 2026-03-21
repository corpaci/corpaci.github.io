---
layout: page
title: About
permalink: /about/
---

<div class="public-only">

I'm an AI engineer at AMD in Iași, Romania. My job is making sure chips work correctly before they go into the world — a bit like being a very rigorous editor for hardware.

On the side, I do research. The question I keep coming back to is: *when you try to write rules for something, what gets lost?* A recipe can tell you the steps, but it can't tell you when the dough feels right. A test suite can check a thousand cases but can't guarantee the thousand-and-first. I'm interested in that gap — the edge where formal rules run out.

That question connects everything I do. I study how AI systems represent knowledge internally (can we actually read what they're doing, or are we just projecting?), how groups of people build shared understanding, and whether the same patterns of structure and meaning show up in silicon, mathematics, and contemplative practice. I think they do.

I studied engineering in Bucharest, designed chips at Marvell, did math and complexity research in Vienna, then ML research on how neural networks work from the inside. I'm finishing a Master's in Data Science and applying to PhD programs and AI safety fellowships for 2026.

I won Best Paper at ICTSS 2024. I run reading groups on topology and category theory, and I'm building towards a framework called **Mutual Thriving** for how groups can reason well together with Johannes and Marian.

</div>

<div class="nerd-only">

AMD hardware verification engineer by day; the rest is a single research program with several open threads.

**The central result so far:** ICTSS 2024 Best Paper — spectral matrix complexity metrics predict combinatorial t-way coverage. The deeper claim: *any system's outputs encode the geometry of the measuring apparatus.* This is what I call Grounding Relative Understanding (GRU). The Fisher Information bound makes it precise: I(θ; X) ≤ I(θ; f(X)) with equality iff f is sufficient. Applied to mechanistic interpretability — your probing method is not neutral. The features you find are a joint product of the model and the probe. This is not a bug in the methodology, it is the methodology's fundamental structure, and most of the field is not being careful about it.

**The formalization thread:** Tarski, Gödel, Chaitin form a sequence. Undefinability → incompleteness → incompressibility. The Chaitin bound is the one that bites hardest in practice: for any formal system F there exists c such that F ⊬ K(s) > c for any specific string s. The ceiling on certifiable compression is bounded by the complexity of the formalizer itself. This shows up in hardware verification (why specs always have gaps), in interpretability (why SAE features behave strangely at ambiguous boundaries), and in natural language (why controlled natural languages feel like they've had their soul removed). Same phenomenon, different substrate.

**SAE feature invariance:** The question is whether sparse autoencoder features are stable across the tacit-knowledge / rule-gap boundary. Feynman would ask: stable in what sense? Stable under what transformation group? I mean: does the feature activation geometry remain consistent when the input transitions from clearly-in-distribution to rule-gap territory — cases where the training regime said nothing specific. If features fracture there, that is a precise safety-relevant signal. We're most exposed exactly where interpretability is most likely to break.

**Collective intelligence:** The Mutual Thriving framework with Johannes and Marian is grounded in active inference — the FEP applied at the group level. A collective that models itself minimizes surprise about its own boundary conditions. The practical output is epistemic infrastructure: community formats and shared vocabulary for reasoning about alignment at the human level, before you even get to the AI alignment problem. Schmidhuber would say: the prior over group trajectories is learnable; Hinton would say: the distributed representation of group belief is what needs to be read, not the individual outputs.

**The category-theoretic thread** is background radiation through all of it. Functors, natural transformations, adjunctions keep reappearing as the right language for talking about structure-preserving maps between domains that look unrelated on the surface. Learning is a functor from data to hypotheses. Interpretation is a natural transformation between models. The fixpoints are the interesting part.

**Background:** Politehnica Bucharest (Automatic Control & CS) → Marvell (chip design, low-level verification) → SBA Research Vienna (combinatorial testing, complexity theory, socio-technological resilience) → University of Vienna (mechanistic interpretability, ML) → AMD (hardware verification) → converging toward AI safety and the geometry of understanding.

Finishing MSc Data Science. Applying PhD programs and MATS / Apollo Research / ARENA fellowships, Fall 2026.

</div>

## Background

<div class="public-only">
Bucharest (engineering) → Marvell (chip design) → Vienna (math & ML research) → AMD (AI/hardware) → PhD & AI safety, 2026.
</div>

<div class="nerd-only">
Politehnica Bucharest → Marvell → SBA Research → University of Vienna → AMD → PhD + safety fellowships, 2026.
</div>

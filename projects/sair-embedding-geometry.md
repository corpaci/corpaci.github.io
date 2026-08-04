---
layout: page
title: SAIR Embedding Geometry
subtitle: How much label signal is recoverable from prompt-conditioned renderings of equational implications?
permalink: /projects/sair-embedding-geometry/
epistemic_status: Exploratory experiment
epistemic_note: This is a frozen sentence-encoder pilot. It shows label decodability in the stated setup, not algebraic understanding or a causal reasoning mechanism.
---

A pilot on prompt-conditioned representation geometry in the SAIR equational-theory benchmark.

This project began with a small question that sits somewhere between interpretability, formal reasoning, and representation:

**For a fixed learned model, how does the input change its internal representations, and how does that affect the output?**

An immediate trigger was the [SAIR Mathematics Distillation Challenge](https://competition.sair.foundation/competitions/mathematics-distillation-challenge-equational-theories-stage1/overview) on equational theories, where the task is to compress useful reasoning into a small human-readable cheat sheet (smaller than 10KB). The benchmark is built on the [equational_theories project](https://github.com/teorth/equational_theories?tab=readme-ov-file), which has the goal to "explore the space of equational theories of magmas, ordered by implication."

The challenge raises broad questions about mathematical compression. This pilot tests a much narrower one: whether a small, structured textual rendering changes how much task-label signal a fixed encoder exposes.

These said, I am **not** testing whether an embedder understands algebra. What I am testing is whether a frozen sentence encoder contains recoverable TRUE/FALSE signal for **different textual renderings** of equational-implication instances.

**Question:** How much TRUE/FALSE signal is recoverable from different textual renderings of the same equational-implication instance using a frozen encoder?

**Setup:** 1000 equation pairs, SAIR normal split, Lean-verified labels. Encoder: `all-MiniLM-L6-v2` (384-dim). Probe: L2 logistic regression, GroupKFold CV grouped by antecedent equation.

## Results

| Template | Grouped AUC |
|---|---|
| eq1_only | **0.951** |
| formal_query | 0.947 |
| natural | 0.933 |
| conjoined | 0.935 |
| eq2_only | 0.544 |

<div class="in-beyond" markdown="1">

The full evaluation also tested two more templates:

| Template | Grouped acc | Grouped AUC |
|---|---|---|
| countermodel | 0.861 | 0.941 |
| raw | 0.852 | 0.934 |

</div>

- Grouped CV vs. naive: −1.5pp. Leakage was small.
- Cross-template transfer gap: 0.383. Signal is not template-invariant.
- Best shallow baseline (operator counts): AUC 0.863. Encoder adds ~0.09 AUC.
- Delta (natural − eq1_only) classifies at 89.3%. Surface-structure control pending.

<div class="in-beyond" markdown="1">

**Cross-template transfer, in full:** training on one template and testing on another (full matrix in the repo) gives within-template accuracy 0.915 and cross-template accuracy 0.532. Selected pairs: `raw` → `conjoined` transfers at 0.830 (structurally similar, both concatenating); `natural` → `formal_query` transfers at 0.507 (near chance despite both being implication phrasings). The signal is not template-invariant.

</div>

<div class="day-only" markdown="1">

![Accuracy and AUC across splits](/img/performance_across_splits.png)

All templates degrade together on harder splits. `eq2_only` is near chance throughout.

</div>

<div class="night-only" markdown="1">

![Accuracy and AUC degradation across splits](/img/performance_across_splits_night.png)

All templates drop together as splits get harder. `eq2_only` is near chance the whole time. The antecedent does the work.

</div>

<div class="beyond-only" markdown="1">

![Accuracy and AUC degradation across splits for each template](/img/performance_across_splits_beyond.png)

The two charts above show what happens per different splits. All templates drop together. `eq2_only` (the flat bottom line) sits near chance throughout every split. The signal lives almost entirely in the first equation.

</div>

<div class="day-only" markdown="1">

![Full results dashboard](/img/sair_results_day.png)

`eq2_only` is the outlier in every panel. `eq1_only` separates class centroids furthest. Clustering and classification align.

</div>

<div class="night-only" markdown="1">

![Full results dashboard](/img/sair_results_night.png)

Heatmaps confirm `eq2_only` is the outlier everywhere. `eq1_only` separates class centroids most in embedding space. Templates that cluster TRUE/FALSE apart also classify them better.

</div>

<div class="beyond-only" markdown="1">

![Full results dashboard: heatmaps, template ranking, centroid separation, clustering vs. classification](/img/sair_results_beyond.png)

The dashboard above summarizes the full picture. Top row: accuracy and AUC are stable across splits for most templates, and `eq2_only` is the one clear outlier in every panel. Middle row: the centroid separation chart (top-right) shows that `eq1_only` keeps TRUE and FALSE embeddings furthest apart; the antecedent equation already carries most of the geometry. Bottom-center: templates that separate classes in embedding space (high Cohen's d) also classify better, as clustering and classification are aligned.

</div>

<div class="in-beyond" markdown="1">

### Delta analysis

For each instance, compute Δ = embed(`natural`) − embed(`eq1_only`). This is what the prompt wrapper adds to the bare equation embedding.

| Pair | Var(Δ)/Var(base) | Cohen's d on \|Δ\| | Classify from Δ alone |
|---|---|---|---|
| natural − raw | 0.117 | 0.289 | 0.868 |
| natural − conjoined | 0.124 | −0.032 | 0.854 |
| natural − eq1_only | **1.092** | 0.158 | **0.893** |

The delta between `natural` and `eq1_only` has variance exceeding the base embedding (ratio 1.09), and classifies at 89.3% on its own. The delta varies across instances in ways that correlate with the label. **Whether this survives after regressing out operator counts and equation length is the remaining open question.** That control hasn't been run, and the strongest version of the prompt-restructuring claim depends on it.

</div>

## Current interpretation

> Within this setup, label signal survives grouped cross-validation. It is concentrated in equation1, partially explained by operator statistics, and not template-invariant. Whether prompt-induced displacement carries signal beyond surface structure remains open.

<div class="in-night" markdown="1">

## Why I find this interesting

**Hypothesis, not result:** the most useful object may be the **prompt-induced displacement** rather than the embedding alone. `eq1_only` gives a base representation; `natural` adds a prompt-conditioned deformation. In this dataset, that deformation carries label-correlated signal.

**When a prompt helps a model, does it help by changing what is represented, or by changing how existing representations are routed and read out?**

If the delta survives surface-structure control, restructuring becomes a more plausible explanation. That result could inform the design of a 10KB cheat sheet as a *lens* rather than an encyclopedia, but it would not by itself identify the model's causal mechanism.[^further]

[^further]: Waiting for SAIR organizers to [open access to cheatsheets and scores](https://zulip.sair.foundation/#narrow/channel/13-Math-Distillation-Challenge---equational-theories/topic/prompt.26score.20~.20public.20.2Fmech.20interp.20on.20cheatsheet.20effect/with/1307) for the next step.

</div>

<div class="in-beyond" markdown="1">

**Speculative connection.** In the [verification/validation gap](https://en.wikipedia.org/wiki/Verification_and_validation), one question is whether a specification captures what was needed. A cheat sheet can be treated as a loose specification for reasoning, but the analogy has limits: this experiment measures encoder geometry, not whether a language model follows or understands the sheet. The result does show that framing changes the measured embedding geometry and its usefulness to this classifier.

And that's a specific instance of a much broader question about AI-human co-production: when AI helps us think, does it change what we think, or how we access what we already know?[^co-production]

[^co-production]: I put some extra thoughts in a [LessWrong post](https://www.lesswrong.com/posts/jqcJeAezRzFwhw3Kz/you-re-absolutely-right-senator-i-was-being-naive-about-the) on the broader framing of this question in the context of AI-assisted reasoning loops.

Ongoing. Next step is the surface-structure control on the delta: if the delta remains label-informative after regressing out operator counts, equation length, and variable count, the prompt-restructuring story gets much stronger. If it doesn't, the story is simpler but still interesting.

</div>

[Code](https://github.com/corpaci/sair-competition-exploration)

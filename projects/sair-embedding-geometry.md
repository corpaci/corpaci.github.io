---
layout: page
title: SAIR Embedding Geometry
subtitle: How much label signal is recoverable from prompt-conditioned renderings of equational implications?
permalink: /projects/sair-embedding-geometry/
---

<div class="beyond-only" markdown="1">

This project began with a small question that sits somewhere between interpretability, formal reasoning, and representation:

**For a fixed learned model, how does the input change its internal representations, and how does that affect the output?**

An immediate trigger was the [SAIR Mathematics Distillation Challenge](https://competition.sair.foundation/competitions/mathematics-distillation-challenge-equational-theories-stage1/overview) on equational theories, where the task is to compress useful reasoning into a small human-readable cheat sheet (smaller than 10KB). The benchmark is built on the [equational_theories project](https://github.com/teorth/equational_theories?tab=readme-ov-file), which has the goal to "explore the space of equational theories of magmas, ordered by implication."

What I think they're asking is: How much information to contain all human-discovered algebra? How much of that information can be compressed into a small cheat sheet? What is the best way to compress it? And how much of that information is already present in a frozen sentence encoder? How can we design a cheat sheet that extracts that information in a way that generalizes across different textual renderings of the same underlying mathematical facts?

### How much information fits in all of mathematics?

Rough estimates suggest that large formal libraries like [Lean's mathlib](https://leanprover-community.github.io/mathlib-overview.html) already encode tens of megabytes of structured mathematics, while the total corpus of published mathematics is orders of magnitude larger. However, the core of it in the minimal dependency graph of independent ideas may be far smaller than what raw text volumes suggest.

My question from this project for now is not about an exact number, but whether **a small, well-structured textual object** (e.g., as the SAIR competition constrains to a 10KB cheat sheet) can activate a meaningful portion of the latent structure in a model.

These said, I am **not** testing whether an embedder understands algebra. What I am testing is whether a frozen sentence encoder contains recoverable TRUE/FALSE signal for **different textual renderings** of equational-implication instances.

## The Question

Given a pair of equations `(equation1, equation2)` labeled TRUE or FALSE, how much of that label is recoverable from the embedding of a textual rendering such as:

- `equation1 implies equation2`
- `If equation1, then equation2.`
- `equation1`
- `equation2`
- `Is there an algebra where equation2 holds but equation1 fails?`
+ additional controlled variants (rewrite, counterexample)

And once stronger controls are added:

- does the signal survive grouped evaluation (holding out all rows sharing the same antecedent)?
- is it invariant across templates?
- how much is explained by shallow structure alone?
- what changes when a prompt wrapper is added to a bare equation?

## Setup

**Dataset:** 1000 equation pairs from the SAIR normal split (500 TRUE, 500 FALSE), Lean-verified labels.

**Encoder:** `all-MiniLM-L6-v2` (384-dim) from `sentence-transformers`. Results below use MiniLM; `all-mpnet-base-v2` (768-dim) is consistent throughout.

**Probe:** L2-regularized logistic regression on the raw embedding, with `StandardScaler` preprocessing.

**Evaluation:** 5-fold stratified CV for naive estimates; GroupKFold grouped by `equation1` for leakage-corrected estimates. 906 unique antecedents across 1000 rows; ~9% of test examples have an exact `equation1` match in training. Grouped CV removes this entirely; the drop is ~1.5pp.

## Results

### Linear probe accuracy

| Template | Grouped acc | Grouped AUC |
|---|---|---|
| eq1_only | **0.878** | **0.951** |
| formal_query | 0.871 | 0.947 |
| countermodel | 0.861 | 0.941 |
| conjoined | 0.860 | 0.935 |
| natural | 0.855 | 0.933 |
| raw | 0.852 | 0.934 |
| eq2_only | 0.535 | 0.544 |

Naive CV on `natural`: 0.870. Grouped: 0.855. Leakage was real, effect was small.

### Cross-template transfer

Training on one template, testing on another (full matrix in the repo):

- **Within-template accuracy:** 0.915
- **Cross-template accuracy:** 0.532
- **Transfer gap:** 0.383

Selected pairs: `raw` → `conjoined` transfers at 0.830 (structurally similar, as both are concatenating). `natural` -> `formal_query` transfers at 0.507 (near chance despite both being implication phrasings). The signal is **not** template-invariant. Different textual templates find different paths to the label.

### Shallow structural baselines

| Baseline | AUC |
|---|---|
| operator/symbol counts | **0.863** |
| shuffled eq2 (broken pairing) | 0.762 |
| parenthesis profile only | 0.721 |
| char TF-IDF (2–4 gram) | 0.685 |
| equation lengths only | 0.662 |
| random labels | 0.500 |

Best encoder (mpnet, natural): AUC 0.950. Best shallow baseline: AUC 0.863. Gap: 0.087.

Counting `*`, `+`, `(`, `=`, and unique variables explains most of what the encoder explains. The encoder adds real signal, but the margin is smaller than headline accuracy suggests.

### Delta analysis

For each instance, compute Δ = embed(`natural`) − embed(`eq1_only`). This is what the prompt wrapper adds to the bare equation embedding.

| Pair | Var(Δ)/Var(base) | Cohen's d on \|Δ\| | Classify from Δ alone |
|---|---|---|---|
| natural − raw | 0.117 | 0.289 | 0.868 |
| natural − conjoined | 0.124 | −0.032 | 0.854 |
| natural − eq1_only | **1.092** | 0.158 | **0.893** |

The delta between `natural` and `eq1_only` has variance exceeding the base embedding (ratio 1.09), and classifies at 89.3% on its own. The delta varies across instances in ways that correlate with the label. **Whether this survives after regressing out operator counts and equation length is the remaining open question.** That control hasn't been run, and the strongest version of the prompt-restructuring claim depends on it.

## Current interpretation

> There is a label signal in frozen embeddings of equational-implication instances (grouped AUC 0.93–0.95), but it is not template-invariant. Much of the signal is anchored in `equation1` and is partially explainable by shallow operator statistics. Prompt wrappers induce additional label-relevant deformations of the base representation, but whether those deformations carry signal independent of surface structure is unverified.

## Why I find this interesting

The most useful object here may be in the **prompt-induced displacement**.

- `eq1_only` gives a rough base representation of the source-law family.
- `natural` gives that base plus a prompt-conditioned deformation.
- the deformation itself carries label signal.

That makes this a small model organism for a broader question:

**When a prompt helps a model, does it help by changing what is represented, or by changing how existing representations are routed and read out?**

This connects to something I keep circling back to.[^active-inference] In the [verification/validation gap](https://en.wikipedia.org/wiki/Verification_and_validation), the hard question is whether the spec captures what was needed (validation). In the SAIR competition case, a cheat sheet is a spec for reasoning. The model either follows it (verification) or it doesn't. But whether the cheat sheet *guides the right thing in the model* is validation. The delta result suggests that framing isn't neutral. The same mathematical content, framed differently, produces geometrically different representations that differ in their usefulness for a task.

[^active-inference]: The active inference framing: the cheat sheet reduces free energy by providing priors. It constrains the model's prediction space. The question is whether the constraint changes the model's generative model (what is represented) or just its precision-weighting over existing representations (how they're read out). 

If this idea is on the right track, the optimal cheat sheet is a *lens*; a framing that deforms the model's representations toward a decision boundary. 10KB of the right lens may beat 10KB of algebraic facts.

And that's a specific instance of a much broader question about AI-human co-production: when AI helps us think, does it change what we think, or how we access what we already know?[^co-production]

[^co-production]: I put some extra thoughts in a [LessWrong post](https://www.lesswrong.com/posts/jqcJeAezRzFwhw3Kz/you-re-absolutely-right-senator-i-was-being-naive-about-the) on the broader framing of this question in the context of AI-assisted reasoning loops.

Ongoing. Next step is the surface-structure control on the delta: if the delta remains label-informative after regressing out operator counts, equation length, and variable count, the prompt-restructuring story gets much stronger. If it doesn't, the story is simpler but still interesting.

[Code](https://github.com/corpaci/sair-competition-exploration)

</div>

<div class="night-only" markdown="1">

This project began with a small question that sits somewhere between interpretability, formal reasoning, and representation:

**For a fixed learned model, how does the input change its internal representations, and how does that affect the output?**

An immediate trigger was the [SAIR Mathematics Distillation Challenge](https://competition.sair.foundation/competitions/mathematics-distillation-challenge-equational-theories-stage1/overview) on equational theories, where the task is to compress useful reasoning into a small human-readable cheat sheet (smaller than 10KB). Built on the [equational_theories project](https://github.com/teorth/equational_theories).

I am testing whether a frozen sentence encoder contains recoverable TRUE/FALSE signal for **different textual renderings** of equational-implication instances. I am **not** testing whether an embedder understands algebra.

**Setup:** 1000 equation pairs (500 TRUE / 500 FALSE), SAIR normal split, Lean-verified labels. Encoder: `all-MiniLM-L6-v2` (384-dim). Probe: L2 logistic regression. Evaluation: GroupKFold by `equation1` (906 unique antecedents, ~9% row overlap removed).

## Results

**Grouped CV accuracy across templates:**

| Template | Grouped acc | Grouped AUC |
|---|---|---|
| eq1_only | **0.878** | **0.951** |
| formal_query | 0.871 | 0.947 |
| natural | 0.855 | 0.933 |
| conjoined | 0.860 | 0.935 |
| eq2_only | 0.535 | 0.544 |

Naive CV vs. grouped: ~1.5pp drop. Leakage was real, effect was small.

**Cross-template transfer gap: 0.383** (within 0.915, cross 0.532). `natural` → `formal_query`: 0.507 despite semantic similarity. `raw` → `conjoined`: 0.830.

**Best shallow baseline** (operator counts): AUC 0.863. Encoder (mpnet, natural): AUC 0.950. Gap: 0.087.

**Delta (natural − eq1_only):** variance ratio 1.09, classifies at 89.3%. 

## Current interpretation

> The label signal survives grouped CV, but not in a template-invariant form. Much is anchored in `equation1`, partially explained by operator statistics. Prompt wrappers add label-relevant geometric deformation; independence from surface structure is unverified.

## Why I find this interesting

The most useful object here may not be the embedding itself, but the **prompt-induced displacement**. `eq1_only` gives a base representation. `natural` adds a prompt-conditioned deformation. The deformation carries label signal.

**When a prompt helps a model, does it help by changing what is represented, or by changing how existing representations are routed and read out?**

If the delta survives surface-structure control, the answer leans toward restructuring. Either way it's informative for what the optimal 10KB cheat sheet looks like: a *lens*, not an encyclopedia.[^further]

[^further]: Waiting for SAIR organizers to [open access to cheatsheets and scores](https://zulip.sair.foundation/#narrow/channel/13-Math-Distillation-Challenge---equational-theories/topic/prompt.26score.20~.20public.20.2Fmech.20interp.20on.20cheatsheet.20effect/with/1307) for the next step.

[Code](https://github.com/corpaci/sair-competition-exploration)

</div>

<div class="day-only" markdown="1">

A pilot on prompt-conditioned representation geometry in the SAIR equational-theory benchmark.

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

- Grouped CV vs. naive: −1.5pp. Leakage was small.
- Cross-template transfer gap: 0.383. Signal is not template-invariant.
- Best shallow baseline (operator counts): AUC 0.863. Encoder adds ~0.09 AUC.
- Delta (natural − eq1_only) classifies at 89.3%. Surface-structure control pending.

## Current interpretation

> Signal is robust and survives leakage correction. It is anchored in equation1, partially explained by operator statistics, and not template-invariant. Whether prompt-induced displacement carries signal beyond surface structure is the open question.

[Code](https://github.com/corpaci/sair-competition-exploration)

</div>


<div class="all-modes" markdown="1">

**Reading modes:**
- ☀️ Day: results mostly as-is
- 🌙 Night: interpretation

</div>

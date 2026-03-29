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

These said, I am **not** testing whether an embedder understands algebra. What I am testing is whether a frozen sentence encoder contains recoverable TRUE/FALSE signal for **different textual renderings** of equational-implication/-identity instances.

## The Question

Given a pair of equations `(equation1, equation2)` labeled TRUE or FALSE, how much of that label is recoverable from the embedding of a textual rendering such as:

- `equation1 implies equation2`
- `If equation1, then equation2.`
- `equation1`
- `equation2`
- `Is there an algebra where equation2 holds but equation1 fails?`
+ additional controlled variants (rewrite, counterexample)

And once stronger controls are added:

- does the signal survive grouped evaluation?
- is it invariant across templates?
- how much is explained by shallow structure alone?
- what changes when a prompt wrapper is added to a bare equation?

## Results

The strongest claims are these:

- A linear probe on frozen embeddings performs well, and this effect survives grouped cross-validation with only a small drop relative to naive CV. That means the main effect is not explained away by the train/test leakage story.
- Cross-template transfer drops substantially. So this is **not** a single template-invariant geometry that all phrasings reveal equally. Different textual templates induce different usable geometries.
- `eq1_only` remains very strong, and under grouped evaluation it can outperform the more natural implication phrasing. This suggests that much of the recoverable label signal is already present in the source law alone.
- A shallow baseline based on operator counts already performs strongly. So a substantial portion of the effect is tied to structural regularities in the equations themselves, not just high-level linguistic framing.
- The most interesting result is that the **difference vector** between `natural` and `eq1_only` embeddings is highly label-informative. This suggests that the prompt wrapper is not behaving like a constant additive offset. It changes the representation in an instance-dependent way that correlates with the label.

### Open question: what survives after controlling for surface structure?

The shallow baseline's strength means the difference vector result needs further testing. If the difference vector remains label-informative after regressing out operator counts, equation length, and other surface features, that's the real headline — evidence of prompt-induced geometric structure beyond what syntax explains. If it doesn't survive, the story is simpler: prompts help the encoder pick up on structural regularities it already partially encodes. I haven't run this control yet.

## Current interpretation

The most cautious interpretation I'm comfortable with is:

>> There is robust label signal in frozen embeddings of equational-implication instances, but it is not template-invariant. Much of the signal is anchored in `equation1`, while prompt wrappers induce additional label-relevant deformations of that base representation.

## Why I find this interesting

The most useful object here may not be the embedding itself, but the **prompt-induced displacement**.

- `eq1_only` gives a rough base representation of the source-law family.
- `natural` gives that base plus a prompt-conditioned deformation.
- the deformation itself carries label signal.

That makes this a small model organism for a broader question:

**When a prompt helps a model, does it help by changing what is represented, or by changing how existing representations are routed and read out?**

This connects to something I keep circling back to.[^active-inference] In the [verification/validation gap](https://en.wikipedia.org/wiki/Verification_and_validation), the hard question is never whether the system meets the spec — it's whether the spec captures what was needed. A cheat sheet is a spec for reasoning. The model either follows it (verification) or it doesn't. But whether the cheat sheet *asks the right thing of the model* — whether it frames the problem in a way the model can use — that's validation. And the difference vector result suggests that framing isn't neutral. The same mathematical content, framed differently, produces geometrically different representations that differ in their usefulness for the task.

[^active-inference]: The active inference framing: the cheat sheet reduces free energy by providing priors. It constrains the model's prediction space. The question is whether the constraint changes the model's generative model (what is represented) or just its precision-weighting over existing representations (how they're read out). The difference vector being label-informative suggests the former — the prompt is restructuring representation, not just filtering it.

If this is right, the optimal cheat sheet isn't a knowledge dump. It's a *lens* — a framing that maximally deforms the model's representations toward the decision boundary. 10KB of the right lens beats 10KB of algebraic facts.

And that's a specific instance of a much broader question about AI-human co-production: when AI helps us think, does it change what we think, or how we access what we already know?[^co-production]

[^co-production]: I put some extra thoughts in a [LessWrong post](https://www.lesswrong.com/posts/jqcJeAezRzFwhw3Kz/you-re-absolutely-right-senator-i-was-being-naive-about-the) on the broader framing of this question in the context of AI-assisted reasoning loops.

[Code →](https://github.com/corpaci/sair-competition-exploration)

</div>

<div class="night-only" markdown="1">

This project began with a small question that sits somewhere between interpretability, formal reasoning, and representation:

**For a fixed learned model, how does the input change its internal representations, and how does that affect the output?**

An immediate trigger was the [SAIR Mathematics Distillation Challenge](https://competition.sair.foundation/competitions/mathematics-distillation-challenge-equational-theories-stage1/overview) on equational theories, where the task is to compress useful reasoning into a small human-readable cheat sheet (smaller than 10KB). The benchmark is built on the [equational_theories project](https://github.com/teorth/equational_theories?tab=readme-ov-file), which has the goal to "explore the space of equational theories of magmas, ordered by implication."

I am testing whether a frozen sentence encoder contains recoverable TRUE/FALSE signal for **different textual renderings** of equational-implication instances.
I am **not** testing whether an embedder understands algebra.


## The Question

Given an identity of equations `equation1 = equation2` labeled TRUE or FALSE, how much of that label is recoverable from the embedding of a textual rendering such as:

- `equation1 implies equation2`
- `If equation1, then equation2.`
- `equation1`
- `equation2`
- `Is there an algebra where equation2 holds but equation1 fails?`
+ additional controlled variants (rewrite, counterexample)

## Results

The strongest claims are these:

- A linear probe on frozen embeddings performs well, and this effect survives grouped cross-validation with only a small drop relative to naive CV. That means the main effect is not explained away by the train/test leakage story.
- Cross-template transfer drops substantially. So this is **not** one universal templatic implication geometry that every phrasing reveals. Different textual templates induce different usable geometries.
- `eq1_only` remains very strong, and under grouped evaluation it can outperform the more natural implication phrasing. This suggests that much of the recoverable label signal is already present in the source law alone.
- A shallow baseline based on operator counts already performs strongly. So a substantial portion of the effect is tied to structural regularities in the equations themselves, not just high-level linguistic framing.
- The most interesting result is that the **difference vector** between `natural` and `eq1_only` embeddings is highly label-informative. This suggests that the prompt wrapper is **not well-approximated by a constant additive offset**. It appears to induce an instance-dependent change in representation that correlates with the label.

Taken together, these results suggest that prompt effects in this setting are not purely cosmetic: different textual framings change the geometry of representations in ways that affect downstream classification.

## Current interpretation

The most cautious interpretation I'm comfortable with is:

> There is robust label signal in frozen embeddings of equational-implication instances, but it is not template-invariant. Much of the signal is anchored in `equation1`, while prompt wrappers induce additional label-relevant deformations of that base representation.


## Why I find this interesting

The most useful object here may not be the embedding itself, but the **prompt-induced displacement**.

- `eq1_only` gives a rough base representation of the source-law family.
- `natural` gives that base plus a prompt-conditioned deformation.
- the deformation itself carries label signal.

That makes this a small model organism for a broader question:

**When a prompt helps a model, does it help by changing what is represented, or by changing how existing representations are routed and read out?**

This has a direct implication for the competition itself. If the optimal prompt is not a summary of algebraic facts but a framing that maximally deforms representations toward the decision boundary, then the 10KB cheat sheet should be designed as a *lens*, not an encyclopedia. The question becomes: what framing induces the largest label-relevant displacement across the widest range of equation types?


[Code →](https://github.com/corpaci/sair-competition-exploration)

</div>

<div class="day-only" markdown="1">

A pilot on prompt-conditioned representation geometry in the SAIR equational-theory benchmark.

The core question is simple:

**How much TRUE/FALSE signal is recoverable from different textual renderings of the same equational-implication instance using a frozen encoder?**

## Main takeaways

- A linear probe on frozen embeddings performs strongly, and this survives grouped cross-validation.
- The signal is **not** template-invariant: cross-template transfer drops substantially.
- `equation1` carries most of the predictive mass.
- Shallow structural baselines explain a large fraction of the effect.
- The most interesting result is that the embedding difference between `natural` and `eq1_only` is itself strongly label-informative, indicating that prompt-induced changes in representation carry may task-relevant signal.

## Current interpretation

The safest summary is:

> Much of the recoverable signal is anchored in the source, but prompt wrappers induce additional label-relevant deformations of that base representation.

This is evidence that prompt wording can induce structured, task-relevant changes in representation. It is **not** claiming anything about an embedder's mathematical understanding.



[Code →](https://github.com/corpaci/sair-competition-exploration)

</div>

Onwards, next steps may take me towards an exploration of prompt-induced displacements as measurable objects. Ping if curious.


<div class="all-modes" markdown="1">

**Reading modes:**
- ☀️ Day: results only
- 🌙 Night: interpretation
- 🪐 Beyond: speculation & broader framing

</div>
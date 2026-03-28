---
layout: page
title: SAIR Embedding Geometry
subtitle: How much label signal is recoverable from prompt-conditioned renderings of equational implications?
permalink: /projects/sair-embedding-geometry/
---

<div class="night-only" markdown="1">

This project began with a small question that sits somewhere between interpretability, formal reasoning, and representation:

**For a fixed learned model, how does the input change its internal representations, and how does that affect the output?**

An immediate trigger was the [https://competition.sair.foundation/competitions/mathematics-distillation-challenge-equational-theories-stage1/overview](SAIR Mathematics Distillation Challenge) on equational theories, where the task is to compress useful reasoning into a small human-readable cheat sheet (smaller than 10KB). The benchmark is built on the [https://github.com/teorth/equational_theories?tab=readme-ov-file](equational_theories project), which has the goal to "explore the space of equational theories of magmas, ordered by implication."

In my context, I'm exploring a narrow scope.

I am **not** testing whether an embedder understands algebra.  
I am testing whether a frozen sentence encoder contains recoverable TRUE/FALSE signal for **different textual renderings** of equational-implication instances.

## The Question

Given a pair of equations `(equation1, equation2)` labeled TRUE or FALSE, how much of that label is recoverable from the embedding of a textual rendering such as:

- `equation1 implies equation2`
- `If equation1, then equation2.`
- `equation1`
- `equation2`
- <todo add the other templates>

And once stronger controls are added:

- does the signal survive grouped evaluation?
- is it invariant across templates?
- how much is explained by shallow structure alone?
- what changes when a prompt wrapper is added to a bare equation?

## Dataset

The experiment uses the [https://huggingface.co/datasets/SAIRfoundation/equational-theories-selected-problems/tree/main/data](SAIR equational-theory benchmark) derived from the equational_theories project. The broader project explores equational laws ordered by implication; Stage 1 of the challenge asks for a design of a compact cheat sheet to improve performance on true/false implication judgments.

The strongest claims are these:

- A linear probe on frozen embeddings performs well, and this effect survives grouped cross-validation with only a small drop relative to naive CV. That means the main effect is not explained away by the train/test leakage story.
- Cross-template transfer drops substantially. So this is **not** one universal implication geometry that every phrasing simply reveals. Different textual templates induce different usable geometries.
- `eq1_only` remains very strong, and under grouped evaluation it can outperform the more natural implication phrasing. This suggests that much of the recoverable label signal is already present in the source law alone.
- A shallow baseline based on operator counts already performs strongly. So a substantial portion of the effect is tied to structural regularities in the equations themselves, not just high-level linguistic framing.
- The most interesting result is that the **difference vector** between `natural` and `eq1_only` embeddings is highly label-informative. This suggests that the prompt wrapper is not behaving like a constant additive offset. It changes the representation in an instance-dependent way that correlates with the label.

## Current interpretation

The most cautious interpretation I’m comfortable with is:

> There is robust label signal in frozen embeddings of equational-implication instances, but it is not template-invariant. Much of the signal is anchored in `equation1`, while prompt wrappers induce additional label-relevant deformations of that base representation.

That is more modest than saying the embedder understands the mathematics.  
It is also more interesting than saying the effect is trivial leakage.

## Why I find this interesting

The most useful object here may not be the embedding itself, but the **prompt-induced displacement**.

- `eq1_only` gives a rough base representation of the source-law family.
- `natural` gives that base plus a prompt-conditioned deformation.
- the deformation itself carries label signal.

That makes this a small model organism for a broader question:

**when a prompt helps a model, does it help by changing what is represented, or by changing how existing representations are routed and read out?**


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
- The most interesting result is that the embedding difference between `natural` and `eq1_only` is itself strongly label-informative.

## Current interpretation

The safest summary is:

> Much of the recoverable signal is anchored in the source law, but prompt wrappers induce additional label-relevant deformations of that base representation.

This is evidence of structured prompt effects on representation. It is **not** yet evidence of mathematical understanding.

## Context

The work was inspired by the SAIR Mathematics Distillation Challenge, whose first stage asks for a compact cheat sheet that improves model performance on true/false equational-theory problems, and by the broader equational_theories project on implication relations between magma laws. :contentReference[oaicite:3]{index=3}

[Code →](https://github.com/corpaci/sair-competition-exploration)

</div>
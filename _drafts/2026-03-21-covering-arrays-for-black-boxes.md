---
layout: post
title: "Covering Arrays for Black Boxes"
permalink: /blog/covering-arrays-for-black-boxes
tags: [formal-methods, ai-safety, interpretability]
description: "Testing every possible combination is impossible ; but testing the right combinations isn't. Combinatorial testing for LLM decision boundaries."
---

<div class="night-only" markdown="1">

A *t*-way covering array $CA(N; t, k, v)$ is an $N \times k$ array over a $v$-element alphabet such that every $t$-column subarray contains every $t$-tuple at least once. The key parameter is $t$ ; the interaction strength. A 2-way covering array guarantees that every pair of input features takes every combination of values at least once. A 3-way array covers every triple. And so on.

<!--more-->

The classical result: the size of a *t*-way covering array grows logarithmically in $k$ (the number of features) for fixed $t$ and $v$. This means you can cover all *t*-way interactions with $O(v^t \log k)$ tests rather than $O(v^k)$ ; exponential savings for small $t$.

**Applied to LLMs.** The input to a language model can be described by a set of features: topic, persona, phrasing style, presence of specific named entities, sentence structure, etc. The model's output behavior is a function of these features. We expect most of the interesting behavior to be determined by low-order interactions (pairs and triples) rather than requiring all features to be set simultaneously. Covering arrays exploit this assumption.

**The spectral prior.** The ICTSS 2024 result[^ictss] gives a complexity prior: the spectral complexity of the test input matrix predicts the combinatorial coverage. High-complexity regions of the input space are where the model's internal geometry is most stressed ; where we expect decision boundaries to be most irregular. A principled testing strategy uses spectral metrics to prioritize which regions to probe with covering arrays.

**The decision boundary question.** A *t*-way interaction failure is a case where features $f_1, f_2, \ldots, f_t$ together produce qualitatively different behavior from what any strict subset of them produces. Finding these interactions characterizes the model's decision boundary ; the manifold where behavior changes. For safety-relevant applications, mapping this boundary is the primary goal.

**With Ludwig Kampel.** Two papers in preparation for IEEE AITest, extending the ICTSS result to LLM testing.

[^ictss]: L. Corpaci, M. Wagner, S. Raubitzek, L. Kampel, K. Mallinger, D. E. Simos. *Estimating Combinatorial t-Way Coverage Based on Matrix Complexity Metrics.* ICTSS 2024: 3–20. Best Paper Award.

</div>

<div class="day-only" markdown="1">

Testing whether an AI behaves correctly is hard because the space of possible inputs is enormous ; effectively infinite. You can't test everything.

<!--more-->

But here's the insight from combinatorial testing: most failures aren't caused by one specific input value in isolation. They're caused by *combinations* ; two or three features of an input that together produce unexpected behavior, even though each feature separately seems fine.

If that's true, you don't need to test every possible input. You need to test every possible *combination* of $t$ features, for small $t$. And there are mathematical structures ; covering arrays ; that let you do this with a surprisingly small number of tests.

The classic result: to cover every pair of feature values (every 2-way interaction) in a system with $k$ features and $v$ possible values per feature, you need roughly $v^2 \cdot \log k$ tests ; not $v^k$. For even moderate $k$, this is an enormous reduction.

With Ludwig Kampel, we're applying this to LLMs: using covering arrays to systematically find the combinations of input features where an AI's behavior changes unexpectedly. Which topics combined with which personas produce inconsistent answers? Which combinations of phrasing and named entities push the model into territory it wasn't trained on?

The goal isn't just to find bugs. It's to map the shape of the model's reliability ; to know where it's robust and where it's fragile, before it matters.

</div>

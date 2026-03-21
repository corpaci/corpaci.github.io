---
layout: post
title: "The Bootstrapping Loop"
permalink: /blog/the-bootstrapping-loop
tags: [formal-methods, ai-safety, interpretability]
description: "Leo de Moura's insight about implementation-as-spec, connected to fixed-point theorems and hardware verification."
---

<div class="night-only" markdown="1">

Leo de Moura's key insight, applied to the Lean prover: the best spec for a second implementation is a first implementation. Not because the first implementation is correct, but because it has committed to specific answers for every ambiguity the original spec left open.

<!--more-->

This sounds circular. It is circular — deliberately. The loop is: write a spec, implement it, use the implementation as a spec for a second implementation, compare the two. Each pass through the loop collapses ambiguities. The spec becomes more precise not because you added more words, but because you were forced to make choices.

The fixed-point theorem framing: you're iterating a function $f: \text{Spec} \to \text{Impl}$ followed by $g: \text{Impl} \to \text{Spec}$ (by treating the implementation as the next spec). The composition $g \circ f$ is a map from specs to specs. A fixed point of $g \circ f$ is a spec that survives one full cycle — implementation plus re-abstraction — without changing. In practice, you don't need a true fixed point; you need convergence to a spec that's precise enough for your purpose.

**When does the loop diverge?** Three cases:
1. The LLM's implementation choices are inconsistent across runs (noise dominates signal).
2. The spec contains genuine semantic ambiguity that maps to multiple distinct implementations, none of which dominates.
3. The implementation language is strictly less expressive than the spec language — some semantic content can't be compressed into the implementation at all, and is lost at each iteration.

Case 3 is the Chaitin case: there exists content in the spec whose Kolmogorov complexity exceeds what the implementation language can certifiably compress. The bootstrapping loop doesn't converge — it orbits.

This is the structure underlying LLM-to-formal-assertion pipelines in hardware verification. Each LLM call is a compression step. The interesting question is: which errors survive multiple loops, and why?

</div>

<div class="day-only" markdown="1">

Here's a strange trick for writing better recipes: cook from the recipe, then write a new recipe based on what you actually did.

<!--more-->

The original recipe said "simmer until reduced." The second recipe will say "simmer for 12 minutes at medium-low heat until the volume drops by half." Every vague instruction gets replaced by what you were actually forced to decide when you cooked it.

You could do this again: cook from the second recipe, then write a third. Each time, the ambiguities get smaller. The recipe gets more precise, not because you added more words, but because you were forced to make choices.

Leo de Moura noticed this about formal programming: the best spec for a second implementation of something is a first implementation of it. Not because the first implementation is right, but because it committed to specific answers for every question the original spec left open.

The bootstrapping loop is: write a spec, implement it, use the implementation as the next spec. Repeat.

Hardware verification is a natural home for this idea: an AI reads the English description of how a chip should behave, produces formal assertions, and we check those assertions against the chip. The interesting question is: when you run the loop multiple times, do the assertions converge? Do they get more accurate? And when they don't — what went wrong, and where?

The loop doesn't always converge. Sometimes the original spec contains a genuine ambiguity — something that could legitimately be implemented two different ways — and the loop alternates between them forever. Sometimes the AI's choices are just inconsistent from run to run. Sometimes the formalism isn't expressive enough to capture what the spec meant at all.

Each failure mode is informative. The bootstrapping loop is a probe for where meaning leaks out.

</div>

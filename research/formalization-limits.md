---
layout: page
title: Limits to Formalization
subtitle: What happens when you try to measure what resists measurement.
permalink: /formalization-limits/
epistemic_status: Conceptual inquiry
epistemic_note: This page combines established results in logic with open extrapolations about specification and alignment. The extrapolations are questions, not consequences of the theorems.
---

What happens when you take fuzzy input and produce something measurable and checkable? Tarski and Gödel establish precise limits for formal languages and systems that meet their hypotheses.[^tarski][^godel] I use those results as reference points for a broader question: where does a mechanically checked artifact cease to support the interpretation we place on it? The analogy is suggestive, but it is not itself a theorem.

I'm interested in the maximal complexity that can be compressed through formalization, the syntax-semantics interface (where structure ends and meaning begins), and whether there exists a natural language kernel that is fully formalizable[^kernel].

One direction, inspired by iterative formal development in [Lean](https://lean-lang.org/), is to treat formalization as bootstrapping: use an implementation and its specification to construct a more precise successor. Each iteration forces syntactic commitments,[^commitment] but whether those commitments preserve the original intent remains an empirical and interpretive question.

Longer treatments: [the limits-of-formalization post](/blog/limits-of-formalization), the [limits/ interactive](/limits/) that walks the first walls by hand, and the [self-reference map](/map/).

[^tarski]: Roughly: an adequate truth predicate for a sufficiently expressive formalized language cannot be defined within that same language under the theorem's hypotheses. A richer metalanguage is one standard response; the exact formulation matters.

[^godel]: Roughly: any consistent, effectively axiomatized formal system strong enough to represent the relevant arithmetic is incomplete, and under related hypotheses cannot prove its own consistency. The exact hypotheses matter.

[^kernel]: Controlled natural languages (such as Attempto Controlled English) are fragments designed to map cleanly to formal logic. Where to draw a useful boundary between controlled and open-ended language is a design choice, not a settled natural division.

[^commitment]: Implementation forces choices where a specification is silent. Those choices can increase precision, but they can also preserve or amplify a misunderstanding; convergence in syntax does not guarantee convergence on intent.

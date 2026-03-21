---
layout: page
title: Limits to Formalization
subtitle: What happens when you try to measure what resists measurement.
permalink: /research/formalization-limits/
---

What happens when you take fuzzy input and produce something measurable and checkable? Self-reference creates paradoxes (Tarski[^tarski], Gödel[^godel]); finite formalizations don't capture all true statements about some sufficiently rich domains. The main tension: syntax is tractable[^tractable], semantics is rich[^rich], and formalization covers them imperfectly.

I'm interested in the maximal complexity that can be compressed through formalization, the syntax-semantics interface (where structure ends and meaning begins), and whether there exists a natural language kernel that is fully formalizable[^kernel].

One direction recommended by [Leo de Moura's work on Lean](https://lean-lang.org/): formalization as bootstrapping ; using a program implemented from a spec as a spec for an improved program, where each iteration collapses semantic ambiguity into syntactic commitment[^commitment] and quality becomes improvement rather than correspondence to a fixed ground truth.

[^tarski]: Tarski's undefinability theorem: no sufficiently expressive language can define its own truth predicate. The condition is that the language must be able to express basic arithmetic. Truth for a language can only be defined in a richer metalanguage ; you always need to step outside.

[^godel]: Gödel's incompleteness theorems: any consistent formal system capable of expressing basic arithmetic contains true statements it cannot prove (first theorem) and cannot prove its own consistency (second theorem). The formal system is necessarily incomplete from within.

[^tractable]: Syntactic objects ; strings, symbols, formal expressions ; can be mechanically manipulated, checked, and compared. You can write algorithms over them. They hold still.

[^rich]: Semantic content ; meaning, reference, truth conditions ; resists mechanical capture because it's tied to context, interpretation, and the world outside the formal system. It doesn't hold still.

[^kernel]: Controlled natural languages (like Attempto Controlled English) are fragments designed to map cleanly to first-order logic ; simple declaratives with unambiguous referents. The formalizable region ends where context-dependence, deixis, metaphor, and pragmatic implication take over. The boundary isn't sharp; there's a gradient, and the fully formalizable fragment is narrow enough that it barely feels like natural language anymore.

[^commitment]: Implementation forces you to resolve every ambiguity the spec left open. "Handle errors appropriately" becomes a concrete choice about *how*. Each such choice collapses the space of possible interpretations into one specific form. In the bootstrapping loop, these commitments accumulate: the next spec inherits resolved ambiguities from the previous implementation, and the process converges toward increasing precision.

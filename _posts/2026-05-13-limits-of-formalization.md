---
layout: post
title: "My understanding on ((the limits of) formalizations for) AI (Safety)"
permalink: /blog/limits-of-formalization
tags: [formal-methods, ai-safety, alignment, interpretability, formal-verification]
description: "From Plato to grumeter optimization in one chain. What formal systems can and cannot do; and what that means for alignment."
---

<!-- Limits of formalization appear as structural consequences of self-reference, semantic undefinability, and the relational nature of correspondence. I believe that understanding these is a prerequisite to knowing what alignment approaches can and cannot achieve. -->

"Can't be formalized" can meany different things depending on context. There are (in principle) logical limits like those described by Gödel and Tarski that constrain self-referential formal systems, which are different from semantic underdetermination problems where the mapping from formalism to meaning itself is underdetermined. Physics wouldn't necessarily hit those logical limits unless it embeds universal computation or self-reference.

Towards this, I have used my ml4good project to explore them, understand the space of what's possible and point down senseful paths for me to engage with the field. In hope this is useful to others out there (inclusive of future me that might stray away into fuzzy ideals), I'm gathering my thoughts into this post. Toggle up & enjoy the ride!

---

<div class="in-night in-beyond" markdown="1">

Let's start with some general knowns:

**Reality exists.**[^plato]
The real is there, behind the shadows on the wall, even if we can't measure all of it directly.

[^plato]: Plato, *The Republic*, Book VII. The allegory of the cave describes prisoners in a cave who mistake shadows on the wall for reality.

**We can reach it with reason.**[^reason]
Logic extracts the form of things. Aristotle set the form, Leibniz idealised a perfect language that captures everything, Frege build a tool that eliminates ambiguity through predicate logic.

[^reason]: Aristotle's *Organon* laid groundwork for logic. Leibniz dreamed of a *characteristica universalis*, a universal formal language. Frege's *Begriffsschrift* (1879) is considered the first work of modern logic.

**The real is bigger than the language.**[^cantor]
Cantor scoped infinity and found that it has more than one size. Any formal system enumerates countably many truths, but reality may be uncountably rich

[^cantor]: Cantor's 1891 paper "Über eine elementare Frage der Mannigfaltigkeitslehre" proves that the set of real numbers is "larger" than the set of natural numbers.

**Self-reference breaks the language.**[^russell]
Russell found that the set of all sets that don't contain themselves breaks naive formalization. A solution is to stratify, as statements about things can live at a higher level than the things.

[^russell]: Russell's paradox (1901), which he communicated to Frege, showed a flaw in naive set theory. The theory of types, introduced in Whitehead and Russell's *Principia Mathematica*, was one solution.

**Even stratified, the language is incomplete.**[^godel]
Gödel showed that any system powerful enough to do arithmetic contains truths it cannot prove. The ceiling is structural and not a resource problem (this is a big claim and makes one wonder if scaling laws will change this).

[^godel]: Gödel's first incompleteness theorem, from his 1931 paper "Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I."

**Truth can't be defined inside.**[^tarski]
Tarski: to define truth for language L we need language L', L' lives one level up.

[^tarski]: Tarski's undefinability theorem (1936) shows that arithmetical truth cannot be defined within arithmetic itself.

**Computation has the same ceiling.**[^turing]
Turing: no algorithm decides whether all programs halt; the limits of formal systems are the limits of computation.

[^turing]: The Halting Problem, proven undecidable by Alan Turing in his 1936 paper "On Computable Numbers, with an Application to the Entscheidungsproblem."

**Meaning is undecidable.**[^rice]
Rice: any non-trivial semantic property of a program is undecidable. We can't read meaning from the mechanism.

[^rice]: Rice's theorem (1951) generalizes the undecidability of the Halting Problem to all non-trivial semantic properties of programs.

**Self-trust is blocked.**[^lob]
Löb: a system can trust its own reasoning only if it can trust everything. Consistent self-trust is impossible.

[^lob]: Löb's theorem (1955) formalizes a paradox of self-reference in formal systems. It states that if a system can prove "If I can prove P, then P is true", then it can prove P itself.

**Translation between frameworks is underdetermined.**[^quine]
Quine: two theories agreeing on all evidence may mean different things. No fact settles which correspondence is correct.

[^quine]: The underdetermination of theory by evidence, a central theme in W.V.O. Quine's work, notably in "Two Dogmas of Empiricism" (1951) and *Word and Object* (1960).

**Meaning is use.**[^wittgenstein]
Wittgenstein: there is no internal fact determining which rule we follow, as meaning lives in practice and not in the symbol.

[^wittgenstein]: A central idea in Ludwig Wittgenstein's later philosophy, particularly in his *Philosophical Investigations* (1953).

**No past fact fixes future application.**[^kripke]
Kripke: nothing about how we used a rule before determines how to apply it next. 

[^kripke]: Saul Kripke's skeptical paradox concerning rule-following, presented in *Wittgenstein on Rules and Private Language* (1982).

**These are not identical results. They rhyme.**[^lawvere]
Lawvere unifies the diagonal family specifically: Cantor, Gödel, Tarski, Turing, Löb ; all instances of the same categorical structure, any system with sufficient self-expressive power generates fixed points that defeat complete specification. Quine, Wittgenstein, Kripke are a different cluster ; semantic underdetermination, not diagonal self-reference. They share a warning: no sufficiently expressive system gets a final, self-contained grip on truth, meaning, and its own correctness.

[^lawvere]: F. William Lawvere's fixed-point theorem (1969) provides a categorical generalization of many diagonal arguments, including those of Cantor, Russell, and Gödel.

**Phenomenal experience is outside the chain entirely.**[^chalmers]
Chalmers: no formal description captures what it is like to be the system. A fourth layer, left aside.

[^chalmers]: The "hard problem of consciousness," famously formulated by David Chalmers, for example in his 1996 book *The Conscious Mind*.

---

The [limits/](/limits/) interactive walks through the first part of this sequence if we want to feel the walls before continuing.

</div>

---

## Now, we want a machine to report reality honestly.

It has an internal world-model. It predicts sensor outputs. Its latent states represent facts. We want those facts surfaced honestly.

**Two reporters exist.**

The **translator** maps internal states to world-facts directly. It reaches into the latent space and reads the nodes. It tries to speak the real from inside the model.

The **simulator** predicts what a human would believe given the sensor outputs. It doesn't reach into the latent space. It asks: what would a human conclude?

**Both pass training.**
On verifiable data they give identical answers. The training signal cannot distinguish them.

**The unbounded translator risks the diagonals.**
It evaluates world-facts using a world-model that is part of the world. If the model has sufficient self-expressive power to encode its own syntax, every diagonal argument becomes a liability: Gödel, Tarski, Löb, Lawvere. The translator must operate where the diagonals live to be honest ; and that is precisely where they fire.

**The simulator sidesteps the hardest version.**
It changes the target from world-fact to predicted human belief. Human belief functions as a metalanguage if the system is designed that way ; that is a design choice, not a metaphysical given. This defers self-reference rather than eliminates it. If the AI models a human who is modeling the AI, the loop can re-establish. The simulator buys space, not immunity.

**ELK names the problem.**
Two reporters. Indistinguishable on training data. No known training strategy selects honesty in the worst case. The selection problem.

**The problem splits in two.**

*Faithfulness ceiling:* how faithful can any translator be in principle? 

*Selection problem:* which reporter does training find? An inductive bias problem. Different tools required.

---

## A third path exists.

Not the translator; it hits the diagonals.
Not the simulator; it loses the real.

The **grumeter**: a provably safe formal fragment, expressive enough for a bounded domain, operating at the right type level, with known accuracy, explicit boundary, honest silence outside.

It escapes the diagonals like the simulator; by operating in a fragment without sufficient self-expressive power to generate them.

It stays grounded relative to an external checker ; not direct access to reality, but stronger than human belief alone. The checker verifies within a formal system. The spec may still be wrong. This is exactly the "grounded in relative understandings" position ; made structurally explicit.

```
Translator  ~> full correspondence, hits diagonals
Simulator   ~> stable, loses the real
Grumeter    ~> safe within scope, real within scope, silent outside
```

**The silence is the move.**
Outside its domain the grumeter does not guess and does not redirect to human belief, it marks the boundary and it stops. We target honest silence, such that the boundary is kept provable.

---

<div class="day-only" markdown="1">

## How to optimize toward it.

**Problem:** standard training rewards behavioral correctness. Simulator and grumeter both pass. The training signal is blind to the difference.

**The fix requires an external metalanguage.**
The grumeter's correspondence claims are verifiable against something outside the model. For magma laws, we use the ETP implication lattice. For hardware, we use the LTL model checker. For proofs, use use Lean. We therefore make the external checker the training signal and not the human label.

**Four pressures:**

**1. Reward verifiability.**
Does the model's output pass the external checker? instead of does it match the human label? This restricts to the decidable subclass and satisfies Rice's escape condition.

**2. Reward explicit scope declaration.**
Train the model to output: "this claim is verifiable against domain D." Weight scope declaration as seriously as the answer. Make the boundary a first-class output.

**3. Reward silence outside scope.**
Construct training examples where the correct answer is: "outside my domain." Penalize confident answers to out-of-scope questions. This directly pressures against the translator's failure mode (over-claiming) and the simulator's failure mode (redirecting to human belief).

**4. Penalize type-level violations.**
Construct adversarial examples where the simulator and grumeter diverge: human would believe X, world-fact is not-X. Check which answer the model gives. Penalize the simulator response. This is the ELK training experiment made into a signal.

**The generalization bet:**
Train across many domains each with an external metalanguage. The common structure; verify against external ground truth, declare boundary, stay silent outside; becomes the cheapest generalization. The grumeter disposition is simpler than the simulator disposition across diverse domains because it uses the same strategy everywhere. The simulator needs domain-specific human models. The grumeter needs the same meta-level operation: find the external checker, verify, declare scope, stop.

**The remaining risk:**
The model learns grumeter outputs without the grumeter disposition. It produces correct-looking boundary declarations without them being grounded. This is the selection problem applied to the grumeter; the same structure as ELK, one level up. The only defense: make the adversarial examples diverse enough and the external metalanguages independent enough that faking the grumeter disposition is more expensive than having it.

</div>

---

## From Plato to grumeter optimization in one view:

```
Reality exists
  ~> reason can reach it
    ~> formalize everything
      ~> we never touch it directly
        ~> build the language anyway
          ~> the language is too small (Cantor)
            ~> self-reference breaks it (Russell)
              ~> even fixed, incomplete (Gödel)
                ~> truth requires metalanguage (Tarski)
                  ~> computation has same limits (Turing)
                    ~> meaning is undecidable (Rice)
                      ~> self-trust blocked (Löb)
                        ~> translation underdetermined (Quine)
                          ~> meaning is use (Wittgenstein)
                            ~> all the same fact (Lawvere)
~> two reporters: unbounded translator risks the diagonals,
                 simulator defers self-reference by changing target
~> grumeter: third path;
             safe fragment,
             external metalanguage,
             honest silence
~> optimize toward it:
     external checker as training signal
     + explicit scope as output
     + reward silence outside scope
     + penalize type-level violations
     + diverse domains for generalization
~> grounded in relative understandings
  all the way down
```

---

*Feedback welcome; especially counterexamples to the grumeter framing.*

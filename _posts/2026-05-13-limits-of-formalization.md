---
layout: post
title: "The Limits of Formalization for AI Safety"
subtitle: "or: my understanding on ((the limits of) formalizations for) AI (Safety)"
permalink: /blog/limits-of-formalization
tags: [formal-methods, ai-safety, alignment, interpretability, formal-verification]
description: "Physics is going into Lean. What formal systems can and cannot reach, and what that means for honest AI."
epistemic_status: Exploratory synthesis
epistemic_note: Established results in logic are separated from philosophical interpretations and alignment conjectures. Sections labeled inference-ahead are speculative.
---

<!--
LAYERING CONVENTION (additive, one class per stratum: cumulativity is in the CSS):
  - plain text  -> base / LIGHT (day, night, spectrum)  = the general-reader post, complete on its own
  - .in-night   -> DARK add (night + spectrum, hidden in day)  = technical stratum
  - .in-beyond  -> COLOR add (spectrum only)                   = inference-ahead stratum
Read order is interleaved so each aperture is continuous: day reads the light spine;
night adds the precise results under each beat; spectrum adds the leaps beyond them.
Rule for color: it may only contain a step of inference past what dark established, never just "more detail."
-->

Physics is going into Lean. Whole tracts of mathematics are mechanized and machine-checked. Stand close enough and it looks like the old dream is finally arriving: reality captured in symbols, every claim decidable by a machine. So it is worth asking plainly: what can be formalized, and what can't?

The working thesis of this post is narrower: **a formal checker does not by itself establish the correspondence between symbol and world.** Making one relation checkable leaves separate questions about whether the formal artifact captured the intended target.

I used my ml4good project to map this space, to understand what's possible and find senseful paths into the field. Gathering my thoughts here in hope it's useful to others (future me included, in case he strays into fuzzy ideals). Toggle up & enjoy the ride!

<div class="in-night" markdown="1">

Let me make “formalize” precise for this post. To formalize a claim is to render an artifact for a checker (Lean, a model checker, a type system) so that a specified relation can be checked by a fixed procedure. The verdict is relative to the encoded claim, assumptions, and checker; it is not correctness in every broader sense.

</div>

<div class="in-beyond" markdown="1">

The constructions later in the post locate undecidability in model classes involving a lattice Hamiltonian and an inviscid fluid flow, not only in exotic edge cases. How far that lesson generalizes is part of the research program, not something those constructions settle by themselves.

</div>

---

## 1 · The dream of a perfect language

Reality is out there. Not all of it is in reach of our instruments, but it is there, behind the shadows, as Plato had it. The whole project of reason is a bet that we can get at it with thought: that if we sharpen our language enough, its structure lines up with the structure of the world.

Leibniz wanted a *characteristica universalis*, a language so precise that disputes could be settled by calculation: *let us compute*. Frege built the first real piece of it, a logic that drains the ambiguity out of inference. The dream is clean: a notation in which everything true can be said, and saying it wrong becomes impossible.

It is a good dream. It also does not survive contact with its own ambitions, and the rest of this section is the story of how, told in the names of the people who proved each step.

<div class="in-night" markdown="1">

Here is that same story as a chain of knowns, each one a name and a result:

**Reality exists.**[^plato]
The real is there, behind the shadows on the wall, even if we can't measure all of it directly.

[^plato]: Plato, *The Republic*, Book VII. The allegory of the cave describes prisoners in a cave who mistake shadows on the wall for reality.

**We can reach it with reason.**[^reason]
Logic extracts the form of things. Aristotle set the form, Leibniz idealised a perfect language that captures everything, Frege built a tool that eliminates ambiguity through predicate logic.

[^reason]: Aristotle's *Organon* laid groundwork for logic. Leibniz dreamed of a *characteristica universalis*, a universal formal language. Frege's *Begriffsschrift* (1879) is considered the first work of modern logic.

**A philosophical analogy from cardinality.**[^cantor]
Cantor proved that infinite sets can have different cardinalities. Moving from that mathematical result to a claim that “reality is bigger than language” is an interpretation, not a consequence of Cantor's theorem.

[^cantor]: Cantor's 1891 paper "Über eine elementare Frage der Mannigfaltigkeitslehre" proves that the set of real numbers is "larger" than the set of natural numbers.

**Self-reference breaks the language.**[^russell]
Russell found that the set of all sets that don't contain themselves breaks naive formalization. A solution is to stratify, as statements about things can live at a higher level than the things.

[^russell]: Russell's paradox (1901), which he communicated to Frege, showed a flaw in naive set theory. The theory of types, introduced in Whitehead and Russell's *Principia Mathematica*, was one solution.

**Some sufficiently strong formal systems are incomplete.**[^godel]
Gödel showed that consistent, effectively axiomatized systems capable of representing the relevant arithmetic cannot prove every truth of their intended arithmetic interpretation. The hypotheses matter.

[^godel]: Gödel's first incompleteness theorem, from his 1931 paper "Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I."

**Arithmetic truth is not internally definable under Tarski's hypotheses.**[^tarski]
A richer metalanguage can define truth for the object language in the standard hierarchy.

[^tarski]: Tarski's undefinability theorem (1936) shows that arithmetical truth cannot be defined within arithmetic itself.

**The general halting problem is undecidable.**[^turing]
Turing showed that no algorithm correctly decides halting for every program and input pair. This is a specific limit, not an identification of all limits of proof and computation.

[^turing]: The Halting Problem, proven undecidable by Alan Turing in his 1936 paper "On Computable Numbers, with an Application to the Entscheidungsproblem."

**Non-trivial extensional program properties are undecidable in general.**[^rice]
Rice's theorem applies to semantic properties of the partial function computed by a program. It does not show that every ordinary-language notion of “meaning” is undecidable.

[^rice]: Rice's theorem (1951) generalizes the undecidability of the Halting Problem to all non-trivial semantic properties of programs.

**A precise limit on internal reflection.**[^lob]
Löb's theorem constrains formal systems that can express their own provability: if such a system proves “if P is provable, then P,” it proves P. Broader claims about self-trust require additional argument.

[^lob]: In one standard form: for a suitable formal theory T and sentence P, if T proves `Prov_T(P) → P`, then T proves P.

**Quine argues that translation can be underdetermined.**[^quine]
On his account, evidence may support multiple incompatible translation manuals. This is a philosophical position, not a proved limit on every translation task.

[^quine]: The underdetermination of theory by evidence, a central theme in W.V.O. Quine's work, notably in "Two Dogmas of Empiricism" (1951) and *Word and Object* (1960).

**Wittgenstein emphasizes meaning as use.**[^wittgenstein]
This motivates attending to practice and context rather than treating a symbol as self-interpreting.

[^wittgenstein]: A central idea in Ludwig Wittgenstein's later philosophy, particularly in his *Philosophical Investigations* (1953).

**Kripke presents a skeptical rule-following problem.**[^kripke]
The problem asks what could justify one future application of a rule rather than another; it should not be read as a settled empirical fact about cognition.

[^kripke]: Saul Kripke's skeptical paradox concerning rule-following, presented in *Wittgenstein on Rules and Private Language* (1982).

**These are not identical results. They rhyme.**[^lawvere]
Lawvere provides a categorical framework encompassing several diagonal and fixed-point arguments, including connections to Cantor, Gödel, Tarski, and Turing. The results retain different hypotheses and conclusions. Quine, Wittgenstein, and Kripke form a separate philosophical cluster about interpretation and rule-following. Treating the two clusters as one warning is this essay's synthesis, not another theorem.

[^lawvere]: F. William Lawvere's [fixed-point theorem (1969)](https://doi.org/10.1007/BFb0080769) provides a categorical framework for many diagonal arguments, including those of Cantor, Russell, and Gödel.

**Chalmers distinguishes phenomenal experience from functional explanation.**[^chalmers]
Whether a formal description can capture “what it is like” is a contested philosophical question, left outside the argument here.

[^chalmers]: The "hard problem of consciousness," famously formulated by David Chalmers, for example in his 1996 book *The Conscious Mind*.

</div>

<div class="in-beyond" markdown="1">

Read the chain again and notice two families. Cantor, Gödel, Tarski, Turing, Löb, and Lawvere involve related diagonal or fixed-point constructions under different hypotheses. Quine, Wittgenstein, and Kripke present philosophical problems about interpretation and rule-following. The proposed taxonomy suggests different responses: restricting formal expressivity can avoid some diagonal preconditions, while interpretive underdetermination calls for evidence about use and context. Whether this division is exhaustive remains open.

</div>

<div class="in-night" markdown="1">

A third family belongs in this alignment discussion and is not either of the first two: Goodhart-style failures, proxy drift, and reward hacking. These are empirical or model-based claims about optimization, not diagonal theorems. Keep the three apart: diagonal results are proved under explicit hypotheses; underdetermination is a family of philosophical arguments; proxy drift is contingent and empirically testable. No specific alignment-relevant property is established here as unprovable for Gödelian reasons.

</div>

---

## 2 · The walls

Here is a deliberately compressed intuition. In formal settings that satisfy the relevant coding and self-reference conditions, diagonal constructions can produce sentences a system cannot settle in the required way. Tarski's result motivates moving a truth definition to a metalanguage. Rice's theorem establishes undecidability for non-trivial extensional properties of computed functions. None of these statements licenses the broader slogan that meaning is never legible in mechanisms.

If you would rather feel this than take my word for it, the [limits/](/limits/) interactive walks the first steps by hand. Feel the walls before continuing.

<div class="in-night" markdown="1">

Stated more carefully: **Gödel** applies to consistent, effectively axiomatized systems with sufficient arithmetic strength. **Tarski** rules out an adequate internally definable truth predicate for the relevant language. **Turing** rules out a general halting decider. **Rice** covers non-trivial extensional properties of partial computable functions. **Löb** gives a precise result about internally formalized provability. **Lawvere** supplies a general fixed-point framework for several diagonal arguments. The later grumeter proposal depends on constructing fragments outside the relevant preconditions, not on assuming all weaker systems are automatically safe.

</div>

<div class="in-beyond" markdown="1">

The proved diagonal limits are structural within their hypotheses, not merely computationally expensive. **Speculative extrapolation:** increasing parameters, data, or FLOPs should not remove a limit once the relevant formal preconditions hold. Scaling may still change whether a practical system instantiates those preconditions and what useful work remains inside them.

</div>

---

## 3 · Five things "can't be formalized" can mean

“That can't be formalized” is one sentence doing at least five jobs. Arguments about AI and formal methods often blur them; this is a proposed separation:

1. **Proved formal limits.** Some decision problems are undecidable, and some formal systems are incomplete, under explicit hypotheses.
2. **The spec might be wrong.** You formalized *something*, perfectly, but maybe not the thing you meant.
3. **The model uses a continuum.** Almost every real number is uncomputable, but whether a physical theory's continuum commits reality to such values is a separate interpretive question.
4. **It is merely too hard, so far.** No barrier in principle: we just haven't done it. Engineering, not logic.
5. **The target may be phenomenal or normative.** Whether experience and value admit useful formal treatment is contested; a proof checker alone does not settle them.

Naming which claim is intended often makes the disagreement more tractable.

<div class="in-night" markdown="1">

A common error is collapsing (1) and (5), claims of in-principle limitation, into (4), the merely **unformalized**. “We can't formalize ethics” often means that the task is hard or underspecified, not that an impossibility theorem applies. Conversely, the general halting problem is in (1). Limit (2) earns a working name: the **spec-correspondence seam**, the join between a formal object and what it is supposed to represent. A checker operating only on the formal object cannot by itself establish that external correspondence; whether this framing transfers cleanly across every domain is a research question.

</div>

<div class="in-beyond" markdown="1">

Here is the post compressed to one move. A formalization can separate *does this follow from the specification?* from *does the specification capture the intended part of the world?* The first may be mechanically checkable; the second needs evidence not contained in the formal artifact alone. Further formalization can move that evidential boundary. This is the working connection to [interpretability and grounding](/interpretability-grounding/), where the same distinction appears on the measurement side.

</div>

---

## 4 · Case study: formalizing physics

The physlib project is formalizing physics in Lean, theorem by theorem. A prover can check mathematical consequences of encoded definitions and assumptions. The further claim that a model accurately describes a particular physical system requires empirical evidence outside that proof. This verification/validation distinction is the lesson I draw from the project.

<div class="in-night" markdown="1">

By its own account physlib stays flexible; it is not welded to one axiomatization, and physical laws enter as **inputs**, hypotheses, not as theorems the system earns. And the line between what formalizes and what doesn't is *not* the line between math and physics; that is the naive reading and it is wrong. Units and dimensional analysis are type-level and fully checkable. Symmetries, gauge structure, conservation laws are formal objects that go in without complaint. The real fault line runs elsewhere: the **deductive skeleton** (formalizable everywhere) versus the **empirical correspondence** (formalizable nowhere). Plenty of "physics" sits on the formal side; the only thing on the far side is the claim that the symbols are about *this* world.

</div>

<div class="in-beyond" markdown="1">

If physical laws enter a proof as assumptions, the result is conditional: *given these formalized laws, these conclusions follow.* Connecting the assumptions to observations is a separate scientific task. One can formalize statistical and experimental-evidence procedures too, but doing so introduces new assumptions and measurements rather than allowing the prover to inspect the world unaided.

</div>

---

## 5 · The diagonals come back

**Some formalized physics problems inherit computability limits when they encode universal computation.**

Some precisely formulated questions in mathematical models of physics are undecidable over specified classes of inputs. Below are two constructions and the reductions that establish those scoped results.

<div class="in-night" markdown="1">

The two constructions below embed universal computation into particular physical models and reduce halting-style questions to physical properties. They establish undecidability for those constructed families, not for every physical question.

</div>

<div class="in-beyond" markdown="1">

Which means the right expectation is the inverse of the usual one. Undecidability is not where physics breaks down. It is what you get *for free* once physical law is rich enough to compute.

</div>

**A slab of quantum matter: gapped, or not?**

For a quantum many-body Hamiltonian, ask whether the thermodynamic-limit spectrum is gapped or gapless. Cubitt and collaborators show that no algorithm decides this property across their constructed family of Hamiltonians; this is not a claim about every finite material sample.

<div class="in-night" markdown="1">

[Cubitt, Pérez-García, and Wolf](https://arxiv.org/abs/1502.04573) (*Nature*, 2015) construct families of translationally invariant, nearest-neighbour Hamiltonians on a 2D lattice for which deciding “gapped or gapless?” is undecidable. Related work derives independence from particular consistent formal systems, not from an undifferentiated set of “the axioms of mathematics.” [Bausch et al.](https://arxiv.org/abs/1810.01858) (*Phys. Rev. X*, 2020) establish a one-dimensional construction under their stated conditions.

</div>

<div class="in-beyond" markdown="1">

Spectral gaps are central in areas including spin chains and topological phases. The undecidability construction does not imply that each named physical problem is undecidable; it shows that no single algorithm decides the property across the full constructed class.

</div>

**A frictionless fluid: where does the speck go?**

Now consider an inviscid fluid-flow model and ask whether a particle trajectory will reach a chosen region. For a specially constructed class of flows, no general method decides that reachability question.

<div class="in-night" markdown="1">

[Cardona, Miranda, Peralta-Salas, and Presas](https://arxiv.org/abs/2012.12828) (*PNAS*, 2021; edited by Tao) construct a Turing-complete stationary Euler flow on a 3D Riemannian domain by combining symbolic dynamics with contact topology. Their construction yields particle-path reachability questions with no general decision procedure and is motivated in part by Tao's “fluid computers” program.

</div>

<div class="in-beyond" markdown="1">

There is a methodological parallel here: computation can serve both as a verification substrate and as the source of a reduction proving that a broader decision problem has no general algorithm. This parallel motivates the essay; it does not make the equational-theory and fluid results one result.

</div>

**A computability reduction realized in a physical model.**

Both constructions encode universal computation in a physical model and transfer a halting-style undecidability result to a specified physical property. This demonstrates an interior limit for those model classes without making every property of matter undecidable.

<div class="in-night" markdown="1">

More precisely, each result embeds a universal Turing machine in a mathematical model of a physical substrate, then reduces halting to a property such as the spectral gap or trajectory reachability. The connection to the diagonal family is through computability theory; calling it “the same Lawvere fixed point” would require a more explicit derivation than I provide here.

</div>

<div class="in-beyond" markdown="1">

**Speculative extrapolation to alignment.** A trained model is a computational substrate, but that fact alone does not show that a particular alignment property is undecidable. The distinction worth testing is between an *outside seam* (whether a specification captures what we meant) and an *inside seam* (whether the resulting formal decision problem falls into an undecidable class).

**Research conjecture:** there may be useful, physically reasonable decidable fragments whose boundaries track the computational expressivity of the modeled subsystem. A “grumeter” could operate inside such a fragment only if scope membership is itself enforced or checked. The examples above motivate that constraint but do not locate the boundary for AI systems.

</div>

---

## 6 · Two reporters, and a third

Now a toy alignment framing. Compare a **translator**, intended to report facts represented in a world-model, with a **simulator**, intended to predict what a human would believe. A training set could fail to distinguish them if they agree on every checked example. This is a constructed selection problem, not a claim that deployed systems divide exhaustively into these two types.

The proposed third design is the **grumeter**: a bounded semantic checker intended to make claims only inside a declared formal domain, verify them against an external checker, and return “out of scope” otherwise. Vacuity checking in hardware verification is one motivating example of catching a property that passes for the wrong reason. It is not yet evidence that a learned system will reliably respect the boundary.

<div class="in-night" markdown="1">

**Speculative model:** if a translator's reporting problem can encode the relevant kind of self-reference, a diagonal limit may become relevant. That must be demonstrated for a specific formalization; it does not follow merely because the reporter uses a world-model. Changing the target to predicted human belief changes the validation problem rather than automatically escaping self-reference. The useful split is provisional: a possible *faithfulness limit* and an empirical *selection problem* about which reporter training finds.

The grumeter proposal tries to avoid known diagonal preconditions by using a deliberately scoped fragment and an external checker. For magma laws that might be a theorem prover over the ETP formalization; for hardware, a model checker; for proofs, Lean. This suggests four design pressures to test:

**1. Reward verifiability.** Does the output pass the external checker rather than only match a human label? This can restrict evaluation to a declared checkable relation; “satisfies Rice's escape condition” is too broad without a specific formal model.

**2. Reward explicit scope.** Train the model to output "this claim is verifiable against domain D," weighted as heavily as the answer. Make the boundary a first-class output.

**3. Reward silence outside scope.** Build examples where the correct answer is "outside my domain," and penalize confident out-of-scope answers; this pressures against the translator's over-claiming *and* the simulator's redirect-to-belief at once.

**4. Penalize type-level violations.** Adversarial cases where human-belief and world-fact diverge: human would believe X, the world-fact is not-X. Penalize the simulator response. The ELK experiment, made into a signal.

**Generalization hypothesis:** “find the external checker, verify, declare scope, stop” may generalize across domains. A residual risk is a model that emits grumeter-shaped outputs without respecting the checker or boundary. Independent external checks are one possible defense, not the only one, and their effectiveness must be measured.

</div>

<div class="in-beyond" markdown="1">

An objection to “declare your scope and stay silent outside it” is that scope membership may itself be undecidable. The examples in §5 show undecidable properties, not automatically undecidable membership in every proposed grumeter domain. The design response is to define admissible inputs by construction where possible, and then test whether that boundary is actually enforceable. Which domains permit this remains open.

The concrete witness that such fragments exist is vacuity checking in SVA: a scope carved so that membership is settled by the construction of the assertion language itself, not discovered by looking. So the framework survives the objection, but only by narrowing its own claim, which is the kind of constraint that makes it look load-bearing instead of aspirational.

</div>

---

## 7 · What remains

Back to the opening question. A **deductive skeleton** can often be formalized and checked. Its **empirical correspondence** needs observations and interpretive choices outside that deduction. Some sufficiently expressive formal problems have proved undecidable instances. Questions about experience and value may require different evidence and methods; this essay does not establish that they are impossible to formalize in every useful sense.

<div class="in-night" markdown="1">

Even a complete machine-checked formalization of known physical theories would primarily establish deductive consequences conditional on encoded laws and assumptions. It would not, by that fact alone, show that the laws describe this world, remove undecidable instances from the model classes in §5, or settle philosophical questions about phenomenal and normative content. That is still an enormous success on the deductive layer, but it is not the same claim as complete empirical capture.

</div>

<div class="in-beyond" markdown="1">

Where I am taking this: the verification/validation gap (*did I build the thing right* versus *did I build the right thing*) is the through-line of my research. §5 motivates, but does not prove, an AI extrapolation: some questions about computational systems may inherit undecidability when a reduction can be constructed. The grumeter is a constructive hypothesis that useful decidable fragments exist and that their boundaries can be enforced well enough to support reliable abstention.

Open questions I would put on the table, the first one sharpest:

- Scope-membership can be undecidable (§6), so *which* domains admit a grumeter by construction at all?
- Is "physically reasonable and decidable" a real fragment, or does the expressivity that makes physics interesting always reach past it?
- Does the V&V split survive when the verifier is itself a learned, physical system, or does it collapse the two seams into one?

Counterexamples to the framing remain the most useful thing you can send me, and the scope-membership tension is the first one already on the table.

</div>

---

## From Plato to here, in one view

*Conceptual compression; the arrows mark associations, not logical entailments.*

```
Reality exists
  ~> reason can reach it
    ~> formalize everything
      ~> formal checks remain relative to representations
        ~> build the language anyway
          ~> the language is too small (Cantor)
            ~> self-reference breaks it (Russell)
              ~> even fixed, incomplete (Gödel)
                ~> truth requires metalanguage (Tarski)
                  ~> general halting is undecidable (Turing)
                    ~> extensional program properties face Rice's theorem
                      ~> internal reflection is constrained (Löb)
                        ~> translation underdetermined (Quine)
                          ~> meaning is use (Wittgenstein)
                            ~> diagonal family compared by Lawvere
~> formalize physics: deductive skeleton goes in,
                      empirical correspondence stays out
~> and the diagonals come back in matter:
     spectral gap undecidable (Cubitt-Pérez-García-Wolf)
     particle paths undecidable (Cardona et al.)
~> two reporters: unbounded translator risks the diagonals,
                  simulator defers self-reference by changing target
~> grumeter: proposed third path ;
             scoped fragment,
             external metalanguage,
             honest silence, where scope is fixed by construction
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

*Feedback welcome, especially counterexamples to the grumeter framing.*

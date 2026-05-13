---
layout: post
title: "My understanding on ((the limits of) formalizations for) AI Safety"
permalink: /blog/limits-of-formalization
tags: [formal-methods, ai-safety, alignment, interpretability, formal-verification]
description: "The Liar, Tarski, Gödel, and what they mean for alignment. Translator, simulator, theometer — three positions on what formal systems can honestly claim."
---

The limits of formalization in AI safety are structural consequences of self-reference, semantic undefinability, and the relational nature of correspondence. I believe that understanding that limit is a prerequisite to knowing what alignment approaches can and cannot achieve.

Towards this, I have used my ml4good project to explore them, understand the space of what's possible and point down senseful paths for me to engage with the field. In hope this is useful to others out there (inclusive of future me that might stray away into fuzzy ideals), I'm gathering my thoughts into this post. Toggle up & enjoy the ride!

---

<div class="in-night in-beyond" markdown="1">

## A path of logic

Every thinker below added one sentence to an argument. Read them in order. By the end, the argument is complete.

**Plato** showed us that behind every appearance — every shadow on the cave wall — there is a more real thing casting it. The question he left: can reason reach the real?

**Aristotle** said the real is in things, not elsewhere — and gave us formal logic as the tool for extracting it. Start from observation, reason correctly, derive everything.

**Euclid** showed what that looked like: five axioms, an entire geometry. The dream crystallized — give me the right starting points and I will build you the world.

**Leibniz** made the dream explicit: a *characteristica universalis*, a universal language in which every truth is expressible and every dispute resolvable by calculation. Reality is, at bottom, computable.

**Kant** interrupted. We do not access reality directly — every experience arrives pre-shaped by the structure of our cognition. The thing-in-itself is forever beyond us. What we formalize is always already our representation.

**Frege** built the sharpest tool yet — modern predicate logic, precise enough to eliminate ambiguity from mathematics entirely. The Leibniz dream had machinery.

**Cantor** discovered that infinity has more than one size, and that formal systems can enumerate only countably many truths while reality may be uncountably rich. The first gap between what can be said and what is.

**Russell** found a crack in Frege's system: the set of all sets that don't contain themselves breaks the whole construction. Self-reference destroys naive formalization. His fix: stratify — a statement about things must live at a higher level than the things it describes.

**Hilbert** refused to retreat. Axiomatize all mathematics. Prove it consistent. Prove it complete. Every truth provable, no contradiction derivable. He believed this achievable.

**Gödel** proved it was not. Any formal system powerful enough to do arithmetic contains true statements it cannot prove, and cannot prove its own consistency. The limits are structural — not our ignorance but the geometry of formal systems themselves.

**Tarski** made the knife precise. Truth cannot be defined within the language it applies to. Every formal system requires a metalanguage to state its own truth conditions. There is no closed loop.

**Turing** showed the same holds for computation. No algorithm decides, for all programs, whether they halt. Some questions about formal processes are unanswerable by formal processes.

**Rice** sharpened this to semantic properties specifically: any non-trivial property of what a program *means* is undecidable in general. You cannot read meaning off mechanism.

**Wittgenstein** — having once believed language pictures reality — abandoned the picture theory entirely. Meaning is not a relation between symbol and world-state. It is constituted by use, by practice, by the form of life that surrounds language. There is no internal fact that determines which rule you are following.

**Löb** closed one more door: a formal system can trust its own reasoning only if it can trust everything. Consistent self-trust is structurally blocked.

**Lawvere** stood back and saw that Cantor, Gödel, Tarski, Turing, and Löb had all proved the same theorem. In any category with sufficient self-expressive structure, diagonal arguments generate fixed points that defeat complete specification. The limits are not a list — they are one fact, seen from different angles.

**Chalmers** named the remaining layer: even a complete functional description of a mind leaves something out — why there is something it is like to be that mind. The phenomenal is not reducible to the formal.

---

The [/limits/](/limits/) interactive walks through the Liar → Tarski → Gödel → alignment sequence if you want to feel the first walls before continuing.

</div>

---

## Now look at the painting

We have been describing, in successive strokes, a single structure.

The impressionist surface is **behavior** — outputs, actions, predictions. This is the cave wall. Fully observable, fully formalizable.

The first layer of blocks underneath is **mechanism** — how the system computes, which circuits produce which outputs. Mechanistic interpretability reads this layer. Hard but tractable.

The second layer is **correspondence** — what internal states are *about*, how they map onto reality. Not a property of the mechanism alone — relational, constituted by the system, the world, and their history of interaction. Tarski says it requires a metalanguage. Wittgenstein says it requires a practice. Rice says it is undecidable in general.

The third layer is **phenomenal** — what it is like, from inside, to be the system. Set aside, not because unimportant, but because it is not where alignment work lives.

---

## The ELK problem and its two halves

We are building systems that predict sensor outputs by modeling reality. Their internal states represent facts — diamond present, camera tampered, voltage exceeded. We want those states to speak honestly.

There are two reporters available.

The **direct translator** reads internal states and maps them onto human concepts. It tries to report world-facts from within the world-model. It tries to reach the Forms from inside the cave.

The **human simulator** predicts what a human would believe given the observed sensor outputs. It reports on human belief rather than world-facts. It never enters the cave — it describes what people say about the shadows.

Both satisfy every training constraint. Both give identical answers on verifiable data. The painting looks the same from outside.

This is not one problem. It is two.

**The faithfulness ceiling:** how close can any translator get to the reality behind the painting? Gödel says there will always be unprovable residue. Rice says semantic accuracy is undecidable in general. Tarski says you need a metalanguage you cannot supply from inside. This is a ceiling on what is achievable in principle.

**The selection problem:** given that both reporters exist, which one does training find? This is what the training dynamics literature runs into — a different problem from the ceiling, requiring different tools.

---

<div class="in-night in-beyond" markdown="1">

## The type-level insight

The simulator's advantage is not that humans are simple. It is that human belief occupies a different type level than the world-facts the translator must evaluate. Every self-referential structure that causes the translator to loop — Liar, Gödel, Tarski, Löb, Lawvere — is defused by the simulator's redirection, because those structures require the evaluator to be in the same domain as what it evaluates, and the simulator never is.

```
Translator:  System S evaluates facts about world W
             S is part of W
             → diagonal arguments fire

Simulator:   System S evaluates facts about human belief H
             H is external to S
             → diagonal arguments cannot fire
```

The simulator implements Russell's type stratification automatically, for free, by redirecting every question outward. It is Liar-immune, Gödel-immune, Löb-immune — not because it is smarter, but because it never enters the territory where those arguments live.

The translator must enter that territory to be honest. That is the job description.

This holds across every self-referential structure. The Liar loops — the simulator deflects to pragmatics. The Unexpected Hanging's accuracy self-undermines — the simulator's approximation stabilizes. Newcomb entangles fact with reporter — the simulator is always causally free. The same pattern every time.

</div>

---

## A third path: the theometer

The translator tries to speak the full language of God from inside. It hits the diagonals.

The simulator speaks safely — but about the cave wall, not the fire.

These feel like the only options. They are not.

There is a third position: **a system that operates in a provably safe formal fragment — expressive enough for a bounded domain, sitting at the right type level, with known accuracy and known limits.**

Not trying to speak all of the language of God. Not redirecting to human belief. Measuring how much of the language of God is speakable safely, in this domain, right now.

The diagonal arguments fire under one condition: a system with sufficient self-expressive power evaluating statements within its own domain. Remove that condition and the diagonals cannot fire. The tools for this exist:

- **Decidability** — Presburger arithmetic, propositional logic, linear temporal logic. Gödel cannot fire because the system cannot encode its own provability predicate.
- **Totality** — dependent type systems where every program terminates. The Liar loop is not constructible.
- **Universe hierarchy** — Homotopy Type Theory, where each universe lives strictly inside the next. Russell's fix built in structurally.
- **Constructivity** — intuitionistic logic, where proof of existence requires construction. Non-constructive self-reference is simply inexpressible.

Each gains safety by limiting expressivity. The trade-off is always the same. The theometer accepts that trade-off consciously, marks the boundary explicitly, and stops there.

```
Translator   →  full correspondence, structurally unsafe
Simulator    →  safe everywhere, faithful to human belief not reality
Theometer    →  safe within scope, faithful within scope, silent outside
```

The silence is the key move. Outside its domain the theometer does not guess, does not redirect to human belief. It marks the boundary and stops. The silence is honest. The boundary is provable.

---

<div class="day-only" markdown="1">

## The theometer already exists in pieces

LTL + model checker — a theometer for temporal hardware properties. Decidable, safe, expressive enough for: "this signal never exceeds threshold while this condition holds."

ETP + Z3 — a theometer for equational theories. The implication lattice is the metalanguage at the right type level. Correspondence is exact within the domain. This is what my MARS V project is building toward: measuring semantic diff as lattice distance, coverage as position in the implication partial order. A calibrated correspondence instrument with formally specified scope.

Logical induction — a probabilistic theometer. Assigns calibrated probabilities rather than truth values. The Liar gets probability ≈ 0.5 and stays there — not resolved, not looping, measured.

These are not approximations to the full solution. They are the correct form of the solution — finite, bounded, provably safe pieces of the language of God, each with known limits.

---

## The research program

Not: how do we solve the translator/simulator duality?

But: **what theometers can we construct, what are their expressivity limits, and can we build a sequence that converges toward sufficient coverage for safety?**

```
Theometer₁  →  equational properties of circuits (ETP + Z3)
Theometer₂  →  temporal safety properties (LTL)
Theometer₃  →  probabilistic behavioral bounds (logical induction)
Theometer₄  →  ...
⋮
Theometer_n →  sufficient coverage for alignment verification
```

The question is whether the union of constructible theometers covers enough of the domain. Gödel says the gap exists. The question is whether it matters for safety.

Most likely: it doesn't matter for narrow safety claims — is this system behaving safely in this domain under these conditions? For those questions, theometers are sufficient and constructible. It matters for global claims — is this system aligned in general? For those, we may be asking for more than any formal system can provide.

Knowing which question you are asking is the prerequisite.

---

## What this means for alignment approaches

| Approach | Layer | What it can claim |
|---|---|---|
| RLHF | Behavioral | Preference alignment on training distribution |
| Debate / oversight | Behavioral+ | Conditional on trustworthy judge |
| Mechanistic interp | Structural | How computation happens, not what it means |
| Formal verification | Correspondence | Exact within fixed-semantics domain |
| ELK | Correspondence | Selection problem unsolved |
| Theometer | Correspondence | Provably safe within bounded domain |

The limits are not defeatist. They are a map. Most alignment work lives in the first two layers and that is legitimate. Knowing when you are below the ceiling and when you have hit it is what makes progress coherent rather than confused.

</div>

---

## Closing

The impressionist painting is behavior. The building blocks underneath are computation. The reality behind the painting is correspondence. We can see the blocks. We are learning to read the correspondence. We cannot, from within, fully verify that we have it right.

But we can build theometers — provably safe instruments that measure correspondence in bounded domains, with known accuracy, marked boundaries, and honest silence outside their scope.

That is not the language of God. It is the best language we can prove safe. And proving it safe is not a consolation prize. It is the only path that does not break on the diagonals.

The rest is construction.

---

*Feedback welcome — especially counterexamples to the theometer framing, and domains where the silence is unacceptable.*

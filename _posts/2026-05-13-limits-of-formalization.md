---
layout: post
title: "My understanding on ((the limits of) formalizations for) AI Safety"
permalink: /blog/limits-of-formalization
tags: [formal-methods, ai-safety, alignment, interpretability, formal-verification]
description: "From Plato to grumeter optimization in one chain. What formal systems can and cannot do ; and what that means for alignment."
---

The limits of formalization in AI safety are structural consequences of self-reference, semantic undefinability, and the relational nature of correspondence. I believe that understanding that limit is a prerequisite to knowing what alignment approaches can and cannot achieve.

Towards this, I have used my ml4good project to explore them, understand the space of what's possible and point down senseful paths for me to engage with the field. In hope this is useful to others out there (inclusive of future me that might stray away into fuzzy ideals), I'm gathering my thoughts into this post. Toggle up & enjoy the ride!

---

<div class="in-night in-beyond" markdown="1">

**Reality exists.**
Something is there. Behind the shadows on the wall. Plato names it.

**We can reach it with reason.**
Logic extracts form from things. Aristotle builds the tool.

**We can say it all.**
If reality is computable, a perfect language captures everything. Leibniz dreams it.

**We never touch it directly.**
Every representation is already filtered through our cognitive structure. Kant interrupts.

**Build the language anyway.**
Frege makes predicate logic. Precise enough to eliminate ambiguity. The tool is sharp.

**The real is bigger than the language.**
Cantor: infinity has more than one size. Any formal system enumerates countably many truths. Reality may be uncountably rich. First gap.

**Self-reference breaks the language.**
Russell: the set of all sets that don't contain themselves destroys naive formalization. Fix: stratify. Statements about things must live at a higher level than the things.

**Even stratified, the language is incomplete.**
Gödel: any system powerful enough to do arithmetic contains truths it cannot prove. The ceiling is structural, not a resource problem (big claim here; will scaling laws change this?).

**Truth can't be defined inside.**
Tarski: to define truth for language L we need language L'. Always one level up. No closed loop.

**Computation has the same ceiling.**
Turing: no algorithm decides whether all programs halt. The limits of formal systems are the limits of computation.

**Meaning is undecidable.**
Rice: any non-trivial semantic property of a program is undecidable. We can't read meaning off mechanism.

**Self-trust is blocked.**
Löb: a system can trust its own reasoning only if it can trust everything. Consistent self-trust is impossible.

**Translation between frameworks is underdetermined.**
Quine: two theories agreeing on all evidence may mean different things. No fact settles which correspondence is correct.

**Meaning is use.**
Wittgenstein: there is no internal fact determining which rule we follow, as meaning lives in practice and not in the symbol.

**No past fact fixes future application.**
Kripke: nothing about how we used a rule before determines how to apply it next. 

**All of this is one fact.**
Lawvere: Cantor, Gödel, Tarski, Turing, Löb ; all instances of the same categorical structure. Any system with sufficient self-expressive power generates fixed points that defeat complete specification.

**Phenomenal experience is outside the chain entirely.**
Chalmers: no formal description captures what it is like to be the system. A fourth layer, left aside.

---

The [/limits/](/limits/) interactive walks through the first part of this sequence if we want to feel the walls before continuing.

</div>

---

## Now: we want a machine to report reality honestly.

It has an internal world-model. It predicts sensor outputs. Its latent states represent facts. We want those facts surfaced honestly.

**Two reporters exist.**

The **translator** maps internal states to world-facts directly. It reaches into the latent space and reads the nodes. It tries to speak the real from inside the model.

The **simulator** predicts what a human would believe given the sensor outputs. It doesn't reach into the latent space. It asks: what would a human conclude?

**Both pass training.**
On verifiable data they give identical answers. The training signal cannot distinguish them.

**The translator hits the diagonals.**
It evaluates world-facts using a world-model that is part of the world. The evaluator is in the same domain as what it evaluates. Every diagonal argument fires: Gödel, Tarski, Löb, Lawvere. The translator must operate where the diagonals live to be honest.

**The simulator escapes them.**
It evaluates human belief, which is external to the system. Human belief is at a different type level. The diagonal arguments require the evaluator to be in the same domain as what it evaluates. The simulator never is. Russell's stratification, for free.

This is not because humans are simple. It is because human belief is external. The type level changes. The diagonals have no purchase.

**ELK names the problem.**
Two reporters. Indistinguishable on training data. No known training strategy selects honesty in the worst case. The selection problem.

**The problem splits in two.**

*Faithfulness ceiling:* how faithful can any translator be in principle? 

*Selection problem:* which reporter does training find? An inductive bias problem. Different tools required.

---

## A third path exists.

Not the translator ; it hits the diagonals.
Not the simulator ; it loses the real.

The **grumeter**: a provably safe formal fragment, expressive enough for a bounded domain, operating at the right type level, with known accuracy, explicit boundary, honest silence outside.

It escapes the diagonals like the simulator ; by operating in a fragment without sufficient self-expressive power to generate them.

It stays grounded in reality unlike the simulator ; because its metalanguage is fixed externally instead of being redirected to human belief.

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
Train across many domains each with an external metalanguage. The common structure ; verify against external ground truth, declare boundary, stay silent outside ; becomes the cheapest generalization. The grumeter disposition is simpler than the simulator disposition across diverse domains because it uses the same strategy everywhere. The simulator needs domain-specific human models. The grumeter needs the same meta-level operation: find the external checker, verify, declare scope, stop.

**The remaining risk:**
The model learns grumeter outputs without the grumeter disposition. It produces correct-looking boundary declarations without them being grounded. This is the selection problem applied to the grumeter ; the same structure as ELK, one level up. The only defense: make the adversarial examples diverse enough and the external metalanguages independent enough that faking the grumeter disposition is more expensive than having it.

</div>

---

## From Plato to grumeter optimization in one chain.

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
~> two reporters: translator hits the diagonals,
                 simulator escapes by type-level redirection
~> grumeter: third path ;
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

*Feedback welcome ; especially counterexamples to the grumeter framing, and domains where the silence is unacceptable.*

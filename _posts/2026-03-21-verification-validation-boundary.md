---
layout: post
title: "The Verification/Validation Boundary"
permalink: /blog/verification-validation-boundary
tags: [formal-methods, ai-safety, interpretability]
description: "Why checking an implementation against a specification leaves a separate correspondence question."
epistemic_status: Conceptual analogy
epistemic_note: The verification/validation distinction is standard engineering practice. The connection to Tarski is an analogy, not a theorem about every validation task.
---

There's a distinction engineers are trained to make: verification asks "did we build it right?" and validation asks "did we build the right thing?"

These sound similar. They're not.

<!--more-->

Verification is something you can automate. You write down what the system should do (a specification), build the system, and check whether the system matches the specification. This can be done mechanically, formally, provably. Hardware verification tools do exactly this.

Validation is different. It asks whether the specification itself was right: whether it captured what you actually wanted. That cannot be inferred from the specification alone; it requires evidence about users, intent, or the world the system is supposed to interact with.

Better requirements work can narrow this gap. The question I am exploring is whether some part of it remains structural whenever a formal artifact is interpreted as standing for something outside itself.

Tarski's undefinability theorem places a precise limit on truth predicates in sufficiently expressive formalized languages. The verification/validation boundary has a useful but incomplete analogy to its object-language/metalanguage distinction: verification stays within a declared formal relation, while validation introduces evidence from outside that relation.

This shows up everywhere:
- A test suite that passes tells you the code does what the tests say it should. It doesn't tell you the tests said the right things.
- An interpretability probe that finds "a royalty feature" tells you the model has an activation pattern that correlates with royalty-related inputs under that probe. It doesn't tell you that activation pattern is what the model "actually knows about" royalty.
- A formal proof of security tells you the system is secure relative to the threat model. It doesn't tell you the threat model was complete.

The honest move is to be explicit about which boundary you're on. "This verification result tells us X. To know whether X is what we care about, we need to do Y." The boundary is not a defect to be eliminated; it's a structure to be navigated. The long version of this argument, with the walls named and the escape route sketched, is [the limits of formalization post](/blog/limits-of-formalization).

<div class="in-night" markdown="1">

**Scope of the analogy:** verification mechanically checks implementations relative to specifications. Validation asks whether the specification corresponds to an external intent or need. Calling the latter a “metalanguage” question is conceptually useful, but does not make Tarski's theorem a proof that validation is impossible. Better evidence and tooling can improve validation even though the specification cannot validate its own correspondence by itself.

**In interpretability.** A probing method may reliably find an activation pattern. Showing that the pattern represents or causally mediates a concept requires additional interventions and references. Some interpretability errors fit the verification/validation distinction; the claim that most do would require evidence I do not yet have.

**In hardware.** Formal verification can show that a chip satisfies its formal properties. Bugs that survive may reflect missing or mistaken properties, environmental assumptions, tool limitations, or implementation details outside the verified model. The V&V distinction helps classify these cases without reducing all of them to one cause.

</div>

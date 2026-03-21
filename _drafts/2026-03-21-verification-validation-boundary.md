---
layout: post
title: "The Verification/Validation Boundary"
permalink: /blog/verification-validation-boundary
tags: [formal-methods, ai-safety, interpretability]
description: "Why you can never fully check your own work ; and what Tarski has to do with it."
---

<div class="night-only" markdown="1">

In engineering, verification and validation are distinguished as follows: verification asks "did we build the thing right?" and validation asks "did we build the right thing?" Most engineering curricula treat this as a procedural distinction ; different stages of a project, different checklists. I think it's an epistemological boundary.

<!--more-->

Verification is internal to a formal system. You have a spec, you have an implementation, and you check the implementation against the spec. The check is mechanical ; it can be automated, certified, and formally guaranteed. This is what model checkers do, what proof assistants do, what hardware verification does. It's syntactic: it compares structures within a shared formalism.

Validation is external. You ask whether the spec itself captured what you actually wanted. But "what you actually wanted" is not inside the formal system ; it's in the world, in the intent, in the context. There's no formal procedure for checking that your spec is correct, because correctness of the spec is relative to something outside the formalism.

**The Tarski connection.** Tarski's undefinability theorem says that no sufficiently expressive language can define its own truth predicate ; truth for the language must be defined in a richer metalanguage. This is exactly the structure of the verification/validation boundary: verification is a truth predicate for implementations relative to specs, and it's definable within the formal system. Validation is a truth predicate for specs relative to intent, and it requires stepping outside the formal system ; it requires a metalanguage.

This is not a contingent limitation that better tooling will fix. It's a structural property of formalization. Every formal system has a metalanguage; every verification has a corresponding validation question that it cannot answer.

**In interpretability.** Mechanistic interpretability verifies that a probing method finds certain activation patterns. It cannot validate that those activation patterns represent what we think they represent ; that requires a ground truth about model semantics that exists outside the formal measurement system. Most interpretability failures are validation failures, not verification failures.

**In hardware.** Formal verification verifies that a chip matches its specification. It cannot validate that the specification captured the designer's intent. The history of hardware bugs that survived formal verification is a history of validation failures.

**The practical upshot:** always know which question you're asking. "Does the model do what the spec says?" is answerable. "Does the spec say what we want?" requires stepping outside ; more experiments, more stakeholder input, more reality contact. No formal tool substitutes for that step.

</div>

<div class="day-only" markdown="1">

There's a distinction engineers are trained to make: verification asks "did we build it right?" and validation asks "did we build the right thing?"

These sound similar. They're not.

<!--more-->

Verification is something you can automate. You write down what the system should do (a specification), build the system, and check whether the system matches the specification. This can be done mechanically, formally, provably. Hardware verification tools do exactly this.

Validation is different. It asks whether the specification itself was right ; whether it captured what you actually wanted. And there's no formal procedure for that check, because "what you actually wanted" isn't written down in the specification. It's in your head, or your users' heads, or the world the system is supposed to interact with.

This sounds like a practical limitation ; something that better requirements-gathering would fix. I think it's deeper than that.

Tarski showed that no formal language rich enough to do arithmetic can define its own truth predicate ; the definition always has to come from outside, from a "metalanguage." The verification/validation boundary is the same structure. You can verify within the formal system. You can only validate by stepping outside it.

This shows up everywhere:
- A test suite that passes tells you the code does what the tests say it should. It doesn't tell you the tests said the right things.
- An interpretability probe that finds "a royalty feature" tells you the model has an activation pattern that correlates with royalty-related inputs under that probe. It doesn't tell you that activation pattern is what the model "actually knows about" royalty.
- A formal proof of security tells you the system is secure relative to the threat model. It doesn't tell you the threat model was complete.

The honest move is to be explicit about which boundary you're on. "This verification result tells us X. To know whether X is what we care about, we need to do Y." The boundary is not a defect to be eliminated ; it's a structure to be navigated.

</div>

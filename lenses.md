---
layout: page
title: Three Lenses
subtitle: One research program, read from three angles.
permalink: /lenses/
description: "One claim about scoped, honestly silent checkers, read three ways: as engineering, as measurement, and as philosophy."
epistemic_status: Orientation page
epistemic_note: This page reframes work described elsewhere on the site. The three readings below are deliberately not equivalent; the gaps between them are the subject of the research, not an accident of presentation.
---

Most of what I do answers to one claim:

> **A checker that must always answer will eventually answer wrongly rather than admit it cannot tell.** So build checkers that can say *outside my domain*, and fix the domain by construction, so that saying it is a checked guarantee rather than a guess.

That sentence means different things depending on what you came here with. Below it is rendered three ways. They are the same commitment; they are not the same statement.

## The same claim, three readings

<div class="lens-readings" markdown="1">

<div class="lens-reading" markdown="1">
<div class="lens-reading-label">As engineering</div>

An assertion that passes for the wrong reason is worse than one that fails, because it consumes the budget you would have spent finding the bug. Vacuity checking exists for this. The design response is a fragment whose membership is settled by how the assertion language is built, not discovered by inspection afterwards, and a checker with three outcomes instead of two.

</div>

<div class="lens-reading" markdown="1">
<div class="lens-reading-label">As measurement</div>

Report the instrument, not just the reading. A probe trained and tested within one template reaches 0.915; across templates it falls to 0.532. Same underlying relation, different surface, so the signal was keyed to the rendering, not the invariant. An honest evaluation needs a third class for cases it cannot decide, pooled into neither the faithful rate nor the drifted one.

</div>

<div class="lens-reading" markdown="1">
<div class="lens-reading-label">As philosophy</div>

Tarski's response to the truth predicate was to step outside: define truth for a language in a richer metalanguage. Abstention is that move made operational. A system that reports *I cannot settle this from here* is not failing to answer; it is locating the question relative to its own reach, which is the only honest thing a bounded system can do about its boundary.

</div>

</div>

**These three are not equivalent, and the differences matter.** The first is a technique with an existence proof. The second is a measurement with a pending control. The third is an analogy, and analogies to Tarski are cheap. Reading them side by side is the same exercise I run on models: hold the content fixed, vary the representation, and ask whether the meaning survived. Here, honestly, some of it does not, and the residue is a decent map of what is still open.

## Pick a lens

{% for lens in site.data.lenses %}
<div class="lens-card" id="{{ lens.id }}" markdown="1">
<div class="lens-card-head">
  <span class="lens-name">{{ lens.name }}</span>
  <span class="lens-question">{{ lens.question }}</span>
</div>

{{ lens.summary }}

<ul class="lens-path">
{% for item in lens.reading %}<li><a href="{{ item.url }}">{{ item.title }}</a> <span class="lens-why">{{ item.why }}</span></li>
{% endfor %}</ul>

</div>
{% endfor %}

---

If you want the unlensed version, [research](/research/) lists every thread with its evidence level, and [about](/about/#contact) has the ways to reach me.

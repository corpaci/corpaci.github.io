---
layout: page
title: AI Safety
subtitle: Where interpretability meets reliability.
permalink: /research/ai-safety/
---

My approach to AI safety runs through interpretability: if we cannot reliably read what a model is doing internally, we cannot make strong guarantees about its behavior in deployment.

This connects to the SAE feature invariance work ; probing whether sparse autoencoder features remain stable across the boundary between clear and ambiguous inputs. Instability in that region is a safety-relevant signal, not just a technical curiosity. It's where a system is most likely to behave in ways that diverge from what its interpretability profile would predict.

The broader frame: AI safety depends on formal tools keeping pace with model capability, and on those tools being grounded in what models actually compute rather than what we project onto them. The limits-to-formalization thread runs directly into this ; the same tensions between syntax and semantics that constrain formal verification in software constrain mechanistic interpretability in neural networks.

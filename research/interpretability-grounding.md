---
layout: page
title: Interpretability and Grounding
subtitle: What measurement can and cannot reveal about neural networks.
permalink: /research/interpretability-grounding/
---

A system's outputs encode the structure of the measuring system itself. This principle, connected to the ICTSS 2024 result on spectral metrics, gives a basis for thinking about what interpretability methods can and cannot reveal about neural networks.

The connection to Fisher Information is key: the information a measurement carries about a parameter is bounded by the geometry of the measurement apparatus. Applied to interpretability, this means the features we extract from a model are as much about our probing method as about the model itself — what I call Grounding Relative Understanding (GRU).

This is related to ongoing work probing how sparse autoencoder features behave in ambiguous contexts using tacit knowledge and rule-gap situations as the main test. The question is whether SAE features remain stable across the boundary between clear and ambiguous inputs, and what breaks when they don't. Feature instability in ambiguous regions is precisely where a system is most likely to be operating outside its reliable regime — and where we most need interpretability to work.

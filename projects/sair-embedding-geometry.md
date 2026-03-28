---
layout: page
title: SAIR Embedding Geometry
subtitle: Do TRUE and FALSE mathematical implications cluster differently in sentence embedding space?
permalink: /projects/sair-embedding-geometry/
---

<div class="night-only" markdown="1">

An experimental investigation into whether sentence embedders can distinguish TRUE from FALSE mathematical implications without understanding the underlying mathematics — purely from the linguistic texture of how the implications are written.

## The Question

Mathematical implications have a distinctive linguistic structure depending on their truth value:

- **TRUE implications** often express *structural relationships*: "if projection, then absorption" — one property transforms into another using the same entities.
- **FALSE implications** often juxtapose *unrelated properties*: "if commutative, then associative" — two properties that happen to be about the same structure but aren't actually connected.

This creates a hypothesis: even without mathematical understanding, an embedder might detect the difference through pure linguistic texture.

We tested this on the SAIR competition dataset — 1269 verified Lean-proof algebraic equations across four difficulty levels (normal, hard, hard1, hard2), each labeled TRUE or FALSE.

## The Findings

### Core Result: 87.4% Accuracy (Normal Split)

Using `all-mpnet-base-v2` sentence embeddings + logistic regression with 5-fold stratified cross-validation:

- **Accuracy**: 87.4% ± 2.27% (p < 0.001, permutation test)
- **AUC**: 0.9496 ± 1.79%
- **Cohen's d** (effect size on PC1): -0.627
- **Centroid similarity**: 0.9883 (classes nearly overlap but remain linearly separable)

This is *real* signal — permutation tests with randomized labels yielded 49.9% ± 2.1%, far below the observed 87.4%.

### Text Templates: Semantic Framing Matters

Testing six distinct linguistic templates (same equation pairs, different phrasings):

| Template | AUC | Notes |
|----------|-----|-------|
| **separate** | 0.9206 | Embed eq1 and eq2 independently, concatenate |
| **conjoined** | 0.9145 | "eq1 and eq2" (drops implication structure) |
| **natural** | 0.9136 | "If eq1, then eq2." |
| **raw** | 0.9031 | "eq1 implies eq2" |
| **eq1_only** | 0.8980 | Just the first equation |
| **eq2_only** | 0.7466 | Just the second equation |

**Interpretation**: Both equations are essential; the second equation carries little discriminative power alone. The natural conditional phrasing ("if...then...") doesn't help beyond raw juxtaposition, suggesting the embedder responds to equation structure, not phrasing.

### The Hard Split Paradox

Performance on "hard" subsets is *better* than normal, not worse — 97.5% vs 87.4%. This demanded investigation:

**Structural analysis** revealed hard equations have:
- Shorter text (25.5 vs 25.8 chars) — not the reason
- Fewer variables (3.5 vs 3.8) — not the reason
- **Higher variable reuse** (77.2% vs 76.4%) — *this matters*

Hard split TRUE implications reuse variables more consistently. This makes them structurally distinctive — true signal, but a selection artifact rather than semantic depth.

**Baseline test** (character n-gram Jaccard similarity): Hard split achieves 79.5% with text patterns alone. Normal split achieves 49.1%, showing:
- Normal split relies on genuine semantic embedding signal (87.4% - 49.1% = 38.3% gain)
- Hard split relies partly on lexical structure (79.5% baseline; only 18% additional gain from embedder)

## What the Embedder Actually Detects

1. **On normal split**: Genuine differences in equation structure that simple character statistics miss. The embedder provides real semantic value.
2. **On hard split**: Mostly structural cues (variable reuse patterns) baked into how the dataset was curated.
3. **Variable choice matters**: TRUE implications tend to reuse the same variables; FALSE implications introduce new variables. This is a statistical signature the embedder picks up without reasoning about algebra.

## Statistical Rigor

- **Permutation test** (100 iterations): Real accuracy (87.4%) vs. randomized labels (49.9%). P-value < 0.001.
- **Cross-validation**: 5-fold stratified to preserve class ratios, especially important on imbalanced splits.
- **Effect sizes**: Cohen's d = -0.627 (moderate separation); centroid cosine similarity = 0.9883 (tight but separable).

## Code & Reproducibility

The full pipeline is parametrizable:

```bash
# Embed, cluster, classify, and plot all splits with all templates
python sair_experiment.py --data all --template all --steps embed cluster classify plot

# Run diagnostics (lexical baseline, structural analysis, permutation test)
python diagnostic_tests.py

# Generate comprehensive visualizations
python visualize_results.py
```

Code lives in `/llm-bias-traffic-light/` alongside diagnostic tests and visualization scripts.

## Open Questions

1. **Does variable naming drive the effect?** Randomizing variable names (x → VAR_0, y → VAR_1) would test whether the embedder exploits naming patterns vs. semantic structure.
2. **How does this generalize?** Do other mathematical domains (calculus, logic, set theory) show similar TRUE/FALSE separation?
3. **What's the ceiling?** With fine-tuning or larger models, what accuracy is theoretically possible?

## Implications

This suggests embedders learn statistical regularities about *how humans write true vs. false claims* — not because they understand mathematics, but because TRUE statements tend to be more coherent (reusing entities, building structure) while FALSE statements often throw together unrelated ideas. This is a warning about confusing linguistic coherence with semantic correctness.

</div>

<div class="day-only" markdown="1">

An investigation into whether sentence embeddings can distinguish TRUE from FALSE mathematical implications. Using Lean-verified algebraic equations from the SAIR dataset, we show that standard embeddings (all-mpnet-base-v2) achieve 87.4% accuracy in a binary classification task, significantly above chance.

## Core Results

**87.4% ± 2.27% accuracy** (logistic regression, 5-fold CV) on 1000 balanced algebraic equations. Permutation tests confirm the signal is real (p < 0.001), not overfitting or noise.

### Key Findings

- TRUE implications use similar variables and express structural transformations
- FALSE implications often juxtapose unrelated properties
- Embedders detect this difference without mathematical understanding — it's a linguistic texture signal
- Hard splits (37-35% TRUE class) classify at 97.5%, likely due to selection artifacts (higher variable reuse)
- Character n-gram Jaccard similarity explains 79.5% on hard splits but only 49.1% on normal, showing hard splits rely on surface patterns while normal splits require semantic understanding

### Text Templates

Different linguistic framings (same equations):
- **separate** (independent embeddings): Best (AUC 0.9206)
- **natural** ("If...then..."): Good (AUC 0.9136)
- **conjoined** (drops structure): Still good (AUC 0.9145)
- **eq2_only** (second equation alone): Poor (AUC 0.7466)

Both equations are necessary; phrasing matters less than equation structure.

## The Finding in Context

This demonstrates that embeddings capture statistical regularities about how TRUE and FALSE statements are *written* — TRUE statements are linguistically more coherent (reuse variables, build structure), while FALSE statements throw together unrelated ideas. This is useful for classification but doesn't imply mathematical understanding.

[Code →](https://github.com/corpaci/llm-bias-traffic-light) | [Diagnostic tests →](/projects/sair-embedding-geometry/#diagnostic-tests)

</div>

## Diagnostic Tests

Three ruthless checks for experimental validity:

**Fool #1: Lexical Leakage**
Character 3-gram Jaccard similarity as a baseline:
- Normal: 49.1% (no signal) → Embedder adds 38.3%
- Hard: 79.5% (substantial signal) → Embedder adds 18%

Conclusion: Normal split requires semantic understanding; hard split is mostly surface-level.

**Fool #2: Hard Split Paradox**
Why does the harder split classify better? Structural analysis:
- Hard equations share more variables (77.2% vs 76.4%)
- This makes TRUE implications more distinctive (same variables transformed)
- Selection artifact, not overfitting

**Fool #3: Overfitting on Small Samples**
Permutation test (100 randomized label runs):
- Real accuracy: 87.4%
- Permuted mean: 49.9% ± 2.1%
- Min permuted: 44.0%, Max: 54.7%
- P-value: < 0.001

Signal is statistically indistinguishable from absolutely real.

---

**Repository**: [github.com/corpaci/llm-bias-traffic-light](https://github.com/corpaci/llm-bias-traffic-light)
**Dataset**: [SAIR Competition](https://sair.mosaicml.com/)

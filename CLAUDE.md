# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bundle install              # Install Ruby dependencies
bundle exec jekyll serve    # Local dev server (http://localhost:4000)
bundle exec jekyll build    # Production build (output: _site/)
```

Requires Ruby 3.3+ and Bundler.

## Architecture

Jekyll 4.3 research portfolio + blog hosted on GitHub Pages, custom domain `corpaci.com` (see `CNAME`). There is no `.github/workflows/` in this repo — no custom Actions build was found. Deployment on push to `main` almost certainly relies on GitHub Pages' own built-in Jekyll build rather than a committed workflow; verify current Pages settings on GitHub before assuming otherwise. `_site/` is gitignored and not part of deployment.

### Site Structure

- **Home** (`/index.html`): intro (hand-written slot marked with HTML comments — Luiza writes this text herself), an "Open questions" list linking into the research threads, then the full post archive grouped by month (there is no separate `/blog/` page — this is it; posts live at `/blog/<slug>` permalinks)
- **Research** (`/research.md`): Hub — active research threads + publications; most threads link out to standalone pages in `research/`
- **About** (`/about.md`): Narrative bio, current work, and a contact section (`#contact`)
- **Limits** (`/limits.html` → `/limits/`): Interactive walkthrough (Liar → Tarski → Gödel → alignment → grumeter), companion to the limits-of-formalization post
- **Map** (`/map.html` → `/map/`): D3 force graph of the 24 self-reference instances in `_data/self_reference.json` (data inlined via Liquid `jsonify`; distances from `js/sr-distance.js`, rendering in `js/sr-graph.js`, d3 from CDN)
- **Projects** (`projects/`): `sair-embedding-geometry`, `bias-measurement`, `ictss-playground`
- Navbar: Research, About, theme toggle

`/blog.md`, `/connect.md`, and `/blog/tags.html` do not exist in this repo despite earlier versions of this doc claiming they did — don't assume they're there.

### Post Front Matter

```yaml
---
layout: post
title: "Post Title"
permalink: /blog/slug-here
tags: [ai-safety, formal-methods]
description: "Short description for SEO/feeds"
---
```

- Three layouts: `default` (base), `page` (pages with auto header/subtitle), `post` (blog posts with TOC/sidenotes)
- Tags are metadata only: they are not rendered anywhere on the site; they feed Atom `<category>` elements in `feed.xml`
- `<!--more-->` sets `post.excerpt`, used only as the feed summary fallback when `description` is missing; the homepage lists titles only, no excerpts
- Use `published: false` in front matter for drafts
- Use `hidden: true` to publish a post accessible via direct link but hidden from listings and the feed

### Styling

`css/main.css` — warm-mathematical theme with CSS variables. Theming is driven by a `data-theme` attribute set by an inline script in `default.html` (localStorage, defaulting to `prefers-color-scheme`); with JS disabled the hardcoded `data-theme="day"` wins — there is deliberately no pure-CSS dark fallback. No Bootstrap — spacing utilities (`mb-3`, `py-4`, etc.) are defined directly in main.css.

**Fonts** (Google Fonts): Source Serif 4 (body serif), Inter (UI sans — navbar, footer, dates, TOC), JetBrains Mono (code).

**Color palette** (day): warm paper background (`#f0efeb`), near-black text (`#222830`), teal-blue accent (`#1580a0`), amber secondary accent (`#c4841d`, used for publication awards). Night uses warm dark variants; spectrum reuses the night surfaces with a pink accent (`#ff5cb8`) and animated rainbow-gradient headings (guarded by `prefers-reduced-motion`).

**Key components**: research thread cards (`.research-thread`), page headers (`.page-header`), home identity (`.home-identity`), footer ethos (`.footer-ethos`).

### Theme layering (day / night / spectrum)

The theme toggle cycles `data-theme` through `day` → `night` → `spectrum` (light / dark / color). Content visibility is additive, not exclusive: **light ⊆ dark ⊆ color** — switching to a deeper theme should only ever add content, never hide or replace it.

**Strata (cumulative prose) — one class per stratum; cumulativity is enforced in the CSS, never combine the classes:**

- Plain text (no wrapper) = visible in all three themes. The base layer, complete on its own for a day reader — including the motivation/why, not just results.
- `<div class="in-night">` = visible in night **and** spectrum (the CSS makes spectrum inherit it). The precision stratum: exact results, named theorems, methods, caveats. If it would just repeat a base sentence, trim the repeat.
- `<div class="in-beyond">` = visible in spectrum only. One further inference step past the night layer, never just more detail.
- The old `class="in-night in-beyond"` double form still renders correctly but is deprecated — write single classes.

**Swaps (exclusive variants of the same artifact):** `day-only` / `night-only` / `beyond-only` each show in exactly one theme. Use only for per-theme identity headings (e.g. "AI hardware verification engineer" / "Wanderer by night." / "Wonderer in the beyond.") and per-theme renderings of the *same* figure (see `projects/sair-embedding-geometry.md`). Never for prose — swapping a title or a chart styling isn't hiding information; swapping sentences is. (`.in-day` is retired; it no longer exists in the CSS.)

Avoid `day-only`/`night-only` (without a base plain-text layer) for body content — a page with only those two classes and no plain text renders a blank body in spectrum mode.

**Discoverability (deliberately subtle):** any page whose rendered content contains a strata/swap class makes the navbar theme toggle "breathe" (slow opacity pulse via `.theme-toggle-breathe`; suppressed in spectrum and under `prefers-reduced-motion`). Posts additionally get dim ◑ / ✺ `.stratum-glyph` markers next to the date and in the homepage listing when they contain `in-night` / `in-beyond` strata. Both are Liquid `contains` checks in the layouts — no front matter needed.

**Feed:** `feed.xml` ships the **night view** of each post — base prose plus `in-night` blocks, with spectrum-only `<div class="in-beyond">` blocks stripped by a string-level Liquid filter. Consequence: in-beyond blocks in posts must not contain nested `<div>`s, or the filter will cut at the wrong closing tag.

### Includes

- `head.html`: Meta tags, fonts, KaTeX (math rendering with `$...$`, `$$...$$`, `\(...\)`, `\[...\]` delimiters)
- `toc.html`: Auto-generated table of contents from h2/h3 headings (visible on wide screens ≥1200px)
- `sidenotes.html`: Transforms Markdown footnotes into margin sidenotes (wide screens) or toggleable inline notes (narrow screens)
- `github-link.html`: Reusable GitHub repo link component (currently unused by any page)

### SEO & Metadata

- `jekyll-seo-tag` generates `<title>`, Open Graph, and Twitter Card meta tags
- `jekyll-sitemap` auto-generates `sitemap.xml` — the only sitemap; the hand-written `sitemap-*.xml` files were removed after drifting out of date
- `jekyll-last-modified-at` populates `<lastmod>` from git history
- `robots.txt` points to the sitemap
- `llms.txt` is Liquid-templated (front matter present) so the Writing list auto-updates from `site.posts`; the rest (threads, projects, profiles) is manual — update it when adding pages. GitHub profile is `github.com/corpaci` (an older `CorpaciLC` account also exists; the site standardizes on `corpaci`)
- Default `og:image` set to `/apple-touch-icon.png` via front matter defaults in `_config.yml`
- Favicons: `/img/favicon.ico`, `/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png`
- `404.html` provides a custom not-found page for GitHub Pages
- `jekyll-last-modified-at` needs full git history to read commit dates; if a build ever runs with a shallow checkout, `<lastmod>` will silently fall back to build time

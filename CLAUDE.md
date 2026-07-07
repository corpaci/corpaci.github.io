# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bundle install              # Install Ruby dependencies
bundle exec jekyll serve    # Local dev server (http://localhost:4000)
bundle exec jekyll build    # Production build (output: _site/)
```

Requires Ruby 3.3+ and Bundler. CI uses `bundle exec jekyll build --baseurl ""` with `JEKYLL_ENV=production`.

## Architecture

Jekyll 4.3 research portfolio + blog hosted on GitHub Pages. Deploys automatically on push to `main` via `.github/workflows/jekyll.yml`.

### Site Structure

- **Home** (`/index.html`): Identity statement + recent posts with tag badges
- **Research** (`/research.md`): Active research threads + publications
- **Blog** (`/blog.md`): Full post archive with client-side tag filtering
- **About** (`/about.md`): Narrative biography
- **Connect** (`/connect.md`): Social links and communities
- **Tags** (`/blog/tags.html`): Posts grouped by tag

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

- Three layouts: `default` (base), `page` (pages with auto header/subtitle), `post` (blog posts with tags/TOC/sidenotes)
- Tags render as amber badges linking to `/blog/tags/#tag-slug`
- Use `<!--more-->` separator for homepage excerpts
- Use `published: false` in front matter for drafts
- Use `hidden: true` to publish a post accessible via direct link but hidden from listings

### Styling

`css/main.css` — warm-mathematical theme with CSS variables, dark mode (`prefers-color-scheme: dark`). No Bootstrap — spacing utilities (`mb-3`, `py-4`, etc.) are defined directly in main.css.

**Fonts** (Google Fonts): Source Serif 4 (body serif), Inter (UI sans — navbar, footer, dates, TOC, tags), JetBrains Mono (code).

**Color palette**: warm off-white background (`#faf9f7`), warm near-black text (`#2d2a26`), deep teal accent (`#0d7377`), warm amber for tags (`#c4841d`). Dark mode uses warm dark variants.

**Key components**: tag badges (`.tag-badge`), research thread cards (`.research-thread`), page headers (`.page-header`), home identity (`.home-identity`), tag filter (`.tag-filter`), footer ethos (`.footer-ethos`).

### Theme layering (day / night / spectrum)

The theme toggle cycles `data-theme` through `day` → `night` → `spectrum` (light / dark / color). Content visibility is additive, not exclusive: **light ⊆ dark ⊆ color** — switching to a deeper theme should only ever add content, never hide or replace it.

- Plain text (no wrapper) = visible in all three themes. This is the base layer, complete on its own for a day reader.
- `<div class="in-night in-beyond">` = visible in night + spectrum. Adds technical depth on top of the base; if it would just repeat a base sentence, trim the repeat and keep only what's new.
- `<div class="in-beyond">` alone = visible in spectrum only. Adds one further inference step past the dark layer, never just more detail.
- **Exception:** a heading that serves as a per-theme identity frame (e.g. "AI hardware verification engineer" / "Wanderer by night." / "Wonderer in the beyond.") may stay wrapped in the older exclusive `day-only` / `night-only` / `beyond-only` classes — swapping a title isn't hiding information, only body prose must be strictly additive.

Avoid `day-only`/`night-only` (without a base plain-text layer) for body content — a page with only those two classes and no plain text renders a blank body in spectrum mode.

### Includes

- `head.html`: Meta tags, fonts, KaTeX (math rendering with `$...$`, `$$...$$`, `\(...\)`, `\[...\]` delimiters)
- `toc.html`: Auto-generated table of contents from h2/h3 headings (visible on wide screens ≥1200px)
- `sidenotes.html`: Transforms Markdown footnotes into margin sidenotes (wide screens) or toggleable inline notes (narrow screens)
- `tag-filter.html`: Lightweight JS for client-side tag filtering on the blog page
- `github-link.html`: Reusable GitHub repo link component

### SEO & Metadata

- `jekyll-seo-tag` generates `<title>`, Open Graph, and Twitter Card meta tags
- `jekyll-sitemap` auto-generates `sitemap.xml`; `jekyll-last-modified-at` populates `<lastmod>` from git history
- `robots.txt` points to the sitemap
- Default `og:image` set to `/apple-touch-icon.png` via front matter defaults in `_config.yml`
- Favicons: `/img/favicon.ico`, `/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png`
- `404.html` provides a custom not-found page for GitHub Pages
- CI checkout uses `fetch-depth: 0` (full git history) so `jekyll-last-modified-at` can read commit dates

---
layout: page
title: Blog
subtitle: Notes, essays, and thinking in public.
permalink: /blog/
---

<div class="tag-filter" id="tag-filter">
  <a href="#" class="active" data-tag="all">All</a>
  {% assign all_tags = site.posts | map: "tags" | join: "," | split: "," | uniq | sort %}
  {% for tag in all_tags %}
  {% if tag != "" %}
  <a href="#" data-tag="{{ tag | slugify }}">{{ tag }}</a>
  {% endif %}
  {% endfor %}
</div>

<div class="posts" id="posts-list">
  {% for post in site.posts %}
  {% unless post.hidden %}
  <article class="post-card mb-3" data-tags="{% for tag in post.tags %}{{ tag | slugify }} {% endfor %}">
    <time class="entry_date">{{ post.date | date: "%B %d, %Y" }}</time>
    <h2 class="post-title">
      <a href="{{ post.url }}" class="entry_title">{{ post.title }}</a>
      {% for tag in post.tags %}
      <a href="/blog/tags/#{{ tag | slugify }}" class="tag-badge">{{ tag }}</a>
      {% endfor %}
    </h2>
  </article>
  {% endunless %}
  {% endfor %}
</div>

{% include tag-filter.html %}

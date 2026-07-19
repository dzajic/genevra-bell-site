# Genevra Bell portfolio

Markdown-powered recreation of [genevrabell.com](https://genevrabell.com), prepared for GitHub Pages.

## Editing the site

Page content and artwork lists live in `src/pages/`. Shared page structure is
in `src/_includes/`, all styling is in `src/assets/site.css`, and carousel
behavior is in `src/assets/site.js`.

## Preview locally

```sh
pnpm install
pnpm dev
```

Eleventy prints the local preview address and automatically rebuilds changes.

## Build and verify

```sh
pnpm validate
```

The generated static website is written to `_site/`.

## Before publishing

- Confirm image credits, captions, and final copy with Genevra Bell.
- Connect the contact form to an approved endpoint if required.
- Enable GitHub Pages and update the domain DNS only after final approval.

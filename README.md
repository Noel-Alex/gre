# GRE Atlas Master Edition — 340 + 6.0 Study Studio

A static, browser-based GRE preparation system built for long-term, high-score preparation. No build step, backend, framework, or package manager is required; the repository is ready for GitHub Pages as-is.

## What is in the Master Edition

- **109 resumable curriculum chapters**
  - 51 Quantitative Reasoning
  - 33 Verbal Reasoning
  - 14 Analytical Writing
  - 11 test-strategy / execution chapters
- A **Master Syllabus** that maps the current official ETS scope to explicit GRE Atlas chapters.
- A route-based curriculum so you can stop for days or weeks and resume exactly where you left off.
- Diagnostic, original drill engine, formula atlas, error log, mock tracker, focus timer, notes, progress, XP, and backup/export.
- **Vocabulary Mastery System v2**:
  - 380 built-in annotated Atlas Core words that work offline
  - browser-side merge of public mirrors of GregMAT 960 and Magoosh 1000 word lists, de-duplicated into a high-frequency study deck
  - consensus/high-frequency tiers
  - spaced retrieval with a configurable daily-new-word cap
  - 36 semantic groups
  - 60 secondary/trap meanings
  - 60 roots and affixes
  - a searchable 9,500+ word Deep Vault drawn from a public cross-list GRE collection
  - on-demand definitions for supplemental words from Open Dictionary / Wiktionary-derived JSON, cached in browser storage after lookup
  - personal vocabulary promotion from practice and from the Deep Vault

### Vocabulary design note

There is no finite official ETS list of "all GRE words." The Master Edition therefore does **not** pretend that memorizing a giant alphabetical dump guarantees vocabulary coverage. The default SRS focuses on high-frequency and consensus vocabulary, while the Deep Vault provides breadth when practice exposes an unusual word.

The high-frequency word sources and Deep Vault are loaded over the network when the site starts. If those requests are unavailable, the 380-word annotated Atlas Core remains usable offline. Supplemental definitions are also fetched only when needed and then cached in `localStorage`.

## Deploy on GitHub Pages

This repository is already deployed and live at:

**https://noel-alex.github.io/gre/**

To redeploy after edits (from this folder):

```bash
git add .
git commit -m "Describe your change"
git push
```

GitHub Pages will rebuild automatically within a minute or two.

No `npm install`, build command, Jekyll configuration, or server is required.

## Run locally

You can double-click `index.html`, but serving the folder locally gives browser networking the same shape as a hosted site:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Data and privacy

Study state is stored in the browser with `localStorage`, including progress, vocabulary scheduling, cached supplemental definitions, notes, errors, mock scores, essay drafts, and settings. GRE Atlas has no backend.

Use the in-app backup export periodically. `localStorage` is origin-specific, so local-file progress and GitHub Pages progress are separate. Export from one and import into the other when moving environments.

## Routing

GRE Atlas uses hash routes such as `#/quant`, `#/vocab`, `#/vocab-traps`, and `#/coverage`. This keeps every in-app route compatible with GitHub Pages project subpaths without server rewrites.

## Files

- `index.html` — site shell and entry point
- `styles.css` — complete visual system and responsive layout
- `app.js` — curriculum, vocabulary systems, tools, routing, state, drills, and interactions
- `.nojekyll` — tells GitHub Pages to serve the static files directly

## Vocabulary research/data references

- ETS defines the current Verbal measure and official question families.
- Magoosh's 2026 vocabulary-list review recommends prioritizing a focused high-frequency core rather than brute-forcing very large unranked lists.
- Supplemental word-list coverage uses the public `Xatta-Trone/gre-words-collection` project as a source mirror/aggregation.
- Supplemental definitions are fetched from `mhollingshead/open-dictionary`, which exposes Wiktionary-derived dictionary JSON.

GRE Atlas does not copy proprietary commercial flashcard definitions into the repository.

## Focus timer

The timer overlay starts hidden and can be closed with the **×** button, **Esc**, or by clicking the backdrop. Closing the panel does not stop a running timer.

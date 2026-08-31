# GRE Atlas Complete Edition — GRE 340 + 6.0 Study Studio

This folder is a **drop-in GitHub Pages site**. There is no build step, package manager, framework, backend, or deployment script.

## Replace your current repo with this

If your repository is already `Noel-Alex/gre`, copy **all files in this folder** into the repository root, replacing the old versions, then run:

```bash
git add -A
git commit -m "Upgrade GRE Atlas to Complete Edition"
git push
```

Your existing GitHub Pages branch/root configuration can stay the same.

The application deliberately keeps the existing localStorage key (`gre-atlas-state-v1`), so progress already saved at the same GitHub Pages origin is preserved when the files are replaced.

## What changed

The original Master Edition had the correct syllabus breadth but lessons were too compressed. The Complete Edition adds a deep instructional layer to **every one of the 109 curriculum chapters**:

- foundation notes already present in the chapter
- **6 additional deep-mastery notes** specific to that chapter
- a **4-step GRE attack algorithm**
- **2 worked reasoning examples that are separate from the checkpoint**
- a topic-specific + module-specific **trap radar**
- a **6-rep retrieval/transfer workout**
- an independent cold checkpoint
- a five-part mastery standard and personal memory-note field

Coverage:

- **51 Quantitative Reasoning chapters**
- **33 Verbal Reasoning chapters**
- **14 Analytical Writing chapters**
- **11 strategy / test-execution chapters**
- **109 / 109 chapters have six deep-mastery notes**

The lesson time label is now derived from the amount of lesson material plus an active-practice allowance instead of displaying a fixed arbitrary “35 min” on tiny lessons.

## Vocabulary

The vocabulary system remains deliberately layered rather than pretending there is an official finite GRE word list:

- **380 fully annotated offline Atlas Core words**
- high-frequency online merge of public mirrors of GregMAT 960 + Magoosh 1000
- de-duplicated consensus/high-frequency study tiers
- configurable spaced-repetition queue
- **36 semantic groups**
- **60 secondary/trap meanings**
- **60 roots and affixes**
- searchable **9,500+ word Deep Vocabulary Vault**
- on-demand Wiktionary-derived definitions for supplemental words
- personal-word promotion into SRS

The online lists are supplemental. The built-in 380-word annotated core works even if those network requests fail.

## Practice and study tools

The site includes:

- full route-based curriculum and resume state
- diagnostic
- randomized Quant and Verbal drill engine
- vocabulary SRS and browsing labs
- formula atlas
- Essay Studio with 30-minute timer
- error log
- mock tracker
- study roadmap
- focus timer
- chapter notes
- progress / XP
- JSON backup and restore
- official ETS resource links
- Master Syllabus coverage map

Generated questions in GRE Atlas are original training material. **Official ETS / POWERPREP material remains the source for final score calibration and authentic released/practice GRE questions.**

## Reliability changes preserved

- focus modal begins hidden and can close with × / backdrop / Escape
- `[hidden]` is forced to `display:none`
- dynamic route navigation uses delegated click handling
- browser storage failures fall back to in-memory state instead of blanking the application
- startup/render failures are isolated so an optional feature cannot easily white-screen the site
- legacy service workers/caches are removed on load so an older deployment cannot continue serving stale app code
- Google Fonts load non-blockingly; system fonts remain usable if the CDN is unavailable
- hash routes remain GitHub Pages-safe

## Files

- `index.html` — GitHub Pages entry point
- `styles.css` — complete visual system
- `deep-content.js` — deep instructional layer for all 109 chapters
- `app.js` — curriculum, vocabulary, drills, routing, state, tools, and interactions
- `GRE_Atlas_Standalone.html` — optional single-file version
- `CONTENT_AUDIT.md` — build/coverage audit
- `.nojekyll` — disables Jekyll transformation
- `.gitignore`

## Run locally

For best parity with GitHub Pages:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

You can also open `GRE_Atlas_Standalone.html` directly.

## Data

Study state is browser-local. Export a JSON backup periodically from Settings.

If you replace the files at the **same** GitHub Pages URL, existing progress remains under the same localStorage origin/key. A different domain or local `file://` copy has separate browser storage.

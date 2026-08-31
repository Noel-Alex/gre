# GRE Atlas — Source-Integrated Edition

A static, route-based GRE General Test study studio designed to consolidate a complete curriculum, active recall, targeted practice, vocabulary, Analytical Writing, test strategy, source navigation, and long-term progress in one GitHub Pages site.

## What changed in this edition

This build was audited against the supplied 2025 ETS books and the supplied Manhattan Prep 5 lb. book, with the legacy ETS GRE Big Book treated as a filtered supplemental source rather than a current-format authority.

### Curriculum

**115 resumable chapters**

- **56 Quantitative Reasoning**
- **33 Verbal Reasoning**
- **14 Analytical Writing**
- **12 Test Strategy / execution**

The source audit added explicit chapters for gaps that were too easy to hide inside broader headings:

- Decimals: place value, operations, conversion, rounding
- Simple and compound interest
- Graphs of functions
- Backsolving / smart numbers / variables-in-the-choices
- The full ETS problem-solving strategy repertoire
- A source-practice system explaining how to sequence official, third-party, legacy, mixed, and full-test material

### Lesson architecture

Every chapter includes:

- foundation teaching notes
- six deep-mastery notes
- chapter-specific tricks / trap-prevention rules
- chapter-specific formulas or reasoning frameworks
- a repeatable attack algorithm
- two separate worked reasoning examples
- a trap radar
- a six-rep retrieval / transfer workout
- a separate cold checkpoint
- a source-synthesis block showing where the skill lives in the supplied books
- a source-specific practice recommendation
- mastery criteria, personal notes, previous / next navigation

The old failure mode — a nominal 30–40 minute lesson containing only a few lines and reusing the teaching example as the question — is not the lesson model used here.

## Sourcebook & Practice Map

The new `#/sourcebook` route organizes five source families:

1. **The Official Guide to the GRE General Test, Fourth Edition (2025)** — current source of truth, mixed sets, Math Review, two full tests.
2. **Official GRE Quantitative Reasoning Practice Questions, Volume 1, Third Edition (2025)** — 150 authentic Quant questions, content-area practice, Math Review, conventions and mixed sets.
3. **Official GRE Verbal Reasoning Practice Questions, Volume 1, Third Edition (2025)** — 150 authentic Verbal questions, RC/TC/SE by difficulty, mixed sets and AWA guidance.
4. **Manhattan Prep 5 lb. Book of GRE Practice Problems, Third Edition** — high-volume third-party skill drilling. Its Advanced Quant material is deliberately treated as stretch work, not as the baseline definition of current GRE difficulty.
5. **ETS GRE Big Book** — legacy paper-test material. The site explicitly filters it: RC and selected sentence-completion/foundational Quant practice can transfer; analogies, antonyms, old timing/scoring and discontinued formats are not treated as current GRE practice.

Every one of the 115 chapters has a source assignment.

### Practice ladder

The recommended sequence is:

**Learn → Retrieve → Targeted volume → Current official calibration → Mixed timed transfer → Full simulation**

This preserves scarce high-fidelity ETS material until it can actually measure transfer and pacing rather than merely expose a basic content gap.

## Official-scope audit

The Master Syllabus contains both a broad ETS content map and a finer 2025-book crosswalk. Quant explicitly maps the GRE Math Review sections:

- 1.1 Integers
- 1.2 Fractions
- 1.3 Exponents and Roots
- 1.4 Decimals
- 1.5 Real Numbers
- 1.6 Ratio
- 1.7 Percent
- 2.1 Algebraic Expressions
- 2.2 Rules of Exponents
- 2.3 Solving Linear Equations
- 2.4 Solving Quadratic Equations
- 2.5 Solving Linear Inequalities
- 2.6 Functions
- 2.7 Applications — average, mixture, rate, work, interest
- 2.8 Coordinate Geometry
- 2.9 Graphs of Functions
- 3.1–3.6 Geometry
- 4.1–4.6 Data presentation, descriptive methods, counting, probability, distributions, and DI

The Verbal crosswalk maps ETS’s explicit RC abilities, TC/SE rules and current response formats. The AWA crosswalk maps task compliance, complexity, development, organization, language control and timed execution.

## Drill Lab

The original practice engine includes Quant families for:

- decimals / rounding
- percent / reverse percent / successive change
- interest / growth
- ratio
- algebra
- remainders
- averages / statistics
- probability
- geometry
- exponents / roots
- divisibility / GCF
- inequalities
- functions
- function graphs
- backsolving / smart-number reasoning
- coordinate geometry
- counting
- sets / Venn diagrams
- data interpretation
- Quantitative Comparison

and Verbal families for TC, SE, sentence logic, vocabulary, RC, inference, argument reasoning and tone/stance.

Atlas drill questions are original training items. They are not presented as substitutes for current official ETS calibration.

## Vocabulary system

- 380 fully annotated built-in Atlas Core entries that work offline
- SRS review scheduling
- daily-new quota
- semantic groups
- secondary-meaning / familiar-word traps
- roots and affixes
- personal word promotion from practice
- optional browser-loaded high-frequency list merge
- optional 9,500+ Deep Vault for lookup / breadth rather than brute-force memorization

## Other tools

- Dashboard and daily plan
- Roadmap / test-date planning
- Mini diagnostic
- Error Log
- Mock Tracker
- Essay Studio
- Formula & Framework Atlas with a deck for every chapter
- Master Syllabus
- Sourcebook & Practice Map
- Official Resources
- Focus timer
- Ctrl/Cmd + K global search
- local progress / notes / SRS storage
- JSON export/import backup

## Copyright / source handling

The repository does **not** bundle or republish the supplied copyrighted ETS or Manhattan books and does not copy their question banks. It contains original teaching, original drills, source-location references, coverage maps and study-method synthesis. Students should use their lawful copies for the authentic questions and the publishers' explanations.

## Deploy on GitHub Pages

Put the contents of this folder at the repository root and push:

```bash
git add -A
git commit -m "Upgrade GRE Atlas to Source-Integrated Edition"
git push
```

Then enable GitHub Pages from the default branch / root if it is not already enabled.

`index.html` is the normal deployed entry point. `.nojekyll` is included.

## Local use

Opening `index.html` directly works for most of the application. For the most browser-consistent behavior, serve the folder locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

The optional remote vocabulary layers require internet access; the built-in Atlas Core remains available without them.

## Progress compatibility

The local-storage key remains:

`gre-atlas-state-v1`

so existing progress from earlier GRE Atlas editions on the same GitHub Pages origin is preserved unless browser storage is cleared.

## File map

- `index.html` — application shell
- `styles.css` — editorial UI, responsive layout, sourcebook styling
- `app.js` — curriculum, tools, drill engine, vocabulary, routes and state
- `deep-content.js` — deep instructional layer
- `topic-toolkit.js` — chapter-specific tricks + formula/framework decks
- `source-synthesis.js` — source catalog, 2025-book crosswalk, chapter assignments, legacy filter, new-source deep/toolkit extensions
- `GRE_Atlas_Standalone.html` — generated single-file copy
- `CONTENT_AUDIT.md` — machine-checked content and package audit

# GRE Atlas Source-Integrated Edition — Content Audit

Audit date: 2026-08-31

## Curriculum count

| Track | Chapters | Deep layer | Toolkit | Source map |
|---|---:|---:|---:|---:|
| Quantitative Reasoning | 56 | 56 | 56 | 56 |
| Verbal Reasoning | 33 | 33 | 33 | 33 |
| Analytical Writing | 14 | 14 | 14 | 14 |
| Strategy / execution | 12 | 12 | 12 | 12 |
| **Total** | **115** | **115** | **115** | **115** |

No duplicate topic IDs.

## New source-audit chapters

The supplied 2025 ETS Math Review and Manhattan taxonomy exposed several areas that deserved explicit homes instead of remaining implicit inside broader lessons:

- `q-decimals` — GRE Math Review §1.4
- `q-interest` — GRE Math Review §2.7 Applications: Interest
- `q-function-graphs` — GRE Math Review §2.9 Graphs of Functions
- `q-answer-choice-methods` — backsolving / smart numbers / variables in choices
- `q-strategy-repertoire` — ETS general problem-solving loop + 14 strategy families
- `s-source-practice-system` — source sequencing / preservation / legacy filter

## Exact ETS source crosswalk

The Sourcebook / Master Syllabus now maps the exact 2025 GRE Math Review structure, current Quant question formats/conventions, the ETS Verbal ability list, TC/SE rules, AWA scoring/task requirements, and current test-execution rules.

The audit asserts that every listed crosswalk target resolves to a real GRE Atlas topic ID.

## Per-chapter lesson components

Every topic resolves to:

1. Foundation teaching sections
2. Six deep-mastery notes
3. Four or more chapter-specific tricks
4. Four or more formulas / decision frameworks
5. GRE attack sequence
6. Two separate worked reasoning examples
7. Trap radar
8. Six-rep retrieval / transfer workout
9. Separate cold checkpoint
10. Source-synthesis block
11. Official / supplemental practice assignment
12. Mastery gate
13. Personal notes
14. Previous / next navigation

## Source integration

Five source families are represented:

- Official Guide 4e (2025)
- Official Quant Practice 3e (2025)
- Official Verbal Practice 3e (2025)
- Manhattan Prep 5 lb. 3e (supplemental volume)
- ETS GRE Big Book (legacy filter)

All 115 topics have a source assignment. Current ETS material is explicitly prioritized for format, conventions and difficulty calibration.

## Big Book compatibility filter

- Reading Comprehension: use
- Sentence Completion: selectively use for single-blank/prethinking practice
- Selected foundational Quant: selectively use
- Analogies: obsolete format; do not train
- Antonyms: obsolete format; do not train
- Old analytical sections: not current GRE format
- Old timing / score conversions / section structure: ignore

## Drill engine

Quant original drill families: 21, including the new Decimals, Interest, Function Graphs and Backsolve/Smart Numbers families.

Verbal original drill families: 9.

The drill engine clearly distinguishes original Atlas training items from official ETS calibration material.

## Vocabulary

- 380 local annotated core entries
- 36 semantic groups
- 60 secondary-meaning / familiar-word traps
- 60 roots / affixes
- optional high-frequency remote merge
- optional 9,500+ Deep Vault architecture
- SRS + personal word promotion

## Test structure encoded in the site

- Analytical Writing: one 30-minute Issue task, first
- Verbal: 12 questions / 18 minutes; 15 questions / 23 minutes
- Quant: 12 questions / 21 minutes; 15 questions / 26 minutes
- Verbal and Quant: section-level adaptive
- Quant: on-screen calculator
- no wrong-answer penalty for V/Q; answer every question

## Package checks required before release

- `node --check app.js`
- `node --check deep-content.js`
- `node --check topic-toolkit.js`
- `node --check source-synthesis.js`
- machine audit: 115 topics; no duplicate IDs; no missing deep/toolkit/source assignments; no broken official-checklist topic references
- standalone regenerated from final CSS/JS
- standalone contains Sourcebook route and source-synthesis data
- ZIP integrity check

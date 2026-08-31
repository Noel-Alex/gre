/* GRE Atlas Source Synthesis
 * This file contains original synthesis and source-navigation metadata.
 * It does not reproduce copyrighted practice questions from ETS/Manhattan materials.
 */
(function(){
  const CATALOG = {
    guide:{
      short:'Official Guide 4e',
      title:'The Official Guide to the GRE General Test, Fourth Edition',
      publisher:'ETS / McGraw Hill',
      edition:'2025 · current-format official guide',
      kind:'Official ETS',
      badge:'Official',
      use:'Primary source of truth for the current test; AWA, Verbal and Quant overviews; easy→hard practice; mixed sets; Math Review; two full-length paper practice tests.',
      protect:'Do not burn the two full tests as casual question banks. Save them for later-stage calibration under realistic timing.',
      current:true
    },
    quant:{
      short:'Official Quant 3e',
      title:'Official GRE Quantitative Reasoning Practice Questions, Volume 1, Third Edition',
      publisher:'ETS / McGraw Hill',
      edition:'2025 · 150 authentic Quant questions',
      kind:'Official ETS',
      badge:'Official',
      use:'Best content-area calibration for Arithmetic, Algebra, Geometry, Data Analysis, question formats, calculator/conventions, and the complete GRE Math Review.',
      protect:'Use content-area practice after learning the chapter cluster; save the five mixed sets for timed transfer once several clusters are stable.',
      current:true
    },
    verbal:{
      short:'Official Verbal 3e',
      title:'Official GRE Verbal Reasoning Practice Questions, Volume 1, Third Edition',
      publisher:'ETS / McGraw Hill',
      edition:'2025 · 150 authentic Verbal questions',
      kind:'Official ETS',
      badge:'Official',
      use:'Best source for current RC, TC and SE wording, easy→medium→hard calibration, five mixed sets, and current Analytical Writing guidance/scored samples.',
      protect:'Use the type-specific sets while learning; save mixed sets for timed section-like practice. Read ETS explanations even after correct answers when your reasoning differed.',
      current:true
    },
    manhattan:{
      short:'Manhattan 5 lb 3e',
      title:'Manhattan Prep 5 lb. Book of GRE Practice Problems, Third Edition',
      publisher:'Manhattan Prep',
      edition:'2018 · third-party high-volume practice',
      kind:'Supplement',
      badge:'Volume',
      use:'High-volume drilling by narrow skill: arithmetic, algebra, rates/work, variables-in-choices, stats, probability, DI, geometry, TC/SE/RC, diagnostics, and mixed sections.',
      protect:'Treat ETS as the authority on current wording/difficulty. Manhattan Advanced Quant is intentionally capable of exceeding real-GRE difficulty, so do not let it distort your time allocation.',
      current:false
    },
    bigbook:{
      short:'ETS GRE Big Book',
      title:'GRE General Test Big Book — 27 formerly administered paper tests',
      publisher:'ETS',
      edition:'Legacy material · old GRE format',
      kind:'Legacy official',
      badge:'Legacy',
      use:'A large reservoir for transferable reading comprehension, older sentence-completion logic, and selected foundational Quant practice.',
      protect:'Do NOT study its analogies, antonyms, old section structure/timing, old score conversions, or discontinued analytical formats as though they were on the current GRE.',
      current:false
    }
  };

  const topicSources = {};
  function assign(ids, data){ids.split(/\s+/).filter(Boolean).forEach(id=>topicSources[id]={...(topicSources[id]||{}),...data});}

  // Quant: official anchors mirror the 2025 ETS Math Review/content chapters.
  assign('q-number-line q-absolute', {primary:'quant',anchor:'Appendix A · GRE Math Review §1.5 Real Numbers',officialPractice:'Chapter 3 · Arithmetic',supp:'Manhattan Ch 9 / Ch 15',practice:'Learn the rule → do Atlas transfer reps → use several Arithmetic questions where sign, magnitude, absolute value, or ordering is the real constraint.'});
  assign('q-integers q-factors q-remainders q-integer-constraints', {primary:'quant',anchor:'Appendix A · §1.1 Integers',officialPractice:'Chapter 3 · Arithmetic',supp:'Manhattan Ch 13 Divisibility & Primes + Ch 15 Number Properties',practice:'Use official Arithmetic for calibration; use Manhattan for extra divisibility/prime/remainder/integer-volume reps after you can explain the rules without notes.'});
  assign('q-fractions', {primary:'quant',anchor:'Appendix A · §1.2 Fractions and §1.4 Decimals',officialPractice:'Chapter 3 · Arithmetic',supp:'Manhattan Ch 11 Fractions and Decimals',practice:'Practice exact fraction arithmetic first, then force estimation/choice-elimination on a second pass so you learn when exact computation is unnecessary.'});
  assign('q-decimals', {primary:'quant',anchor:'Appendix A · §1.4 Decimals',officialPractice:'Chapter 3 · Arithmetic',supp:'Manhattan Ch 11 Fractions and Decimals',practice:'Drill place value, operations, conversion, and rounding until decimal alignment is automatic; then calibrate with official Arithmetic questions.'});
  assign('q-ratio q-scaling', {primary:'quant',anchor:'Appendix A · §1.6 Ratio + geometry similarity/scale sections',officialPractice:'Chapters 3 and 5 · Arithmetic / Geometry',supp:'Manhattan Ch 20 Ratios + geometry chapters',practice:'Separate part:part from part:whole. Do ratio-only reps first; then mix ratios into similar figures, rates, mixtures, and DI.'});
  assign('q-percent-growth', {primary:'quant',anchor:'Appendix A · §1.7 Percent',officialPractice:'Chapter 3 · Arithmetic',supp:'Manhattan Ch 12 Percents',practice:'Do forward %, reverse %, successive %, and percent-change items as different templates. The original/base denominator must become automatic.'});
  assign('q-rates q-work-combined', {primary:'quant',anchor:'Appendix A · §2.7 Applications · Rate and Work Problems',officialPractice:'Chapters 3–4 · Arithmetic / Algebra',supp:'Manhattan Ch 18 Rates and Work',practice:'Write units with every rate. For work, convert completion times to job/time rates before combining.'});
  assign('q-mixtures', {primary:'quant',anchor:'Appendix A · §2.7 Applications · Mixture Problems',officialPractice:'Chapter 4 · Algebra',supp:'Manhattan Ch 16–17 Word Problems',practice:'Track the amount of the pure component, not just total volume. Follow with weighted-average reasoning so both representations are available.'});
  assign('q-interest', {primary:'quant',anchor:'Appendix A · §2.7 Applications · Interest',officialPractice:'Chapter 4 · Algebra',supp:'Manhattan word-problem chapters for algebraic modeling',practice:'Know simple vs compound growth and be able to solve backward for principal/rate/time. Use calculator only after the algebraic model is correct.'});
  assign('q-units', {primary:'quant',anchor:'Appendix A · arithmetic/algebra applications + Chapter 2 problem-solving',officialPractice:'Arithmetic and Algebra sets',supp:'Manhattan Word Problems / Rates and Work',practice:'Keep units attached until cancellation is visible. Convert once, preferably before substituting into a formula.'});
  assign('q-exponents', {primary:'quant',anchor:'Appendix A · §1.3 Exponents and Roots + §2.2 Rules of Exponents',officialPractice:'Chapters 3–4',supp:'Manhattan Ch 14 Exponents and Roots',practice:'Mix numeric and algebraic exponent rules; include 0<base<1, negative bases, and root-domain cases.'});
  assign('q-sequences', {primary:'quant',anchor:'Arithmetic content · sequences; Appendix A algebra patterns',officialPractice:'Chapter 3 · Arithmetic',supp:'Manhattan Ch 10 Functions, Formulas, and Sequences',practice:'Train term-finding, recursive pattern recognition, sums when appropriate, and remainders/cycles. Do not assume every sequence is arithmetic/geometric.'});
  assign('q-expressions', {primary:'quant',anchor:'Appendix A · §2.1 Algebraic Expressions',officialPractice:'Chapter 4 · Algebra',supp:'Manhattan Ch 8 Algebra',practice:'Factor/simplify before substituting. Always preserve domain restrictions when cancellation removes a denominator factor.'});
  assign('q-linear q-systems', {primary:'quant',anchor:'Appendix A · §2.3 Solving Linear Equations',officialPractice:'Chapter 4 · Algebra',supp:'Manhattan Ch 8 Algebra + Ch 17 Two-Variable Word Problems',practice:'Choose substitution/elimination based on structure; when the question asks for a combination such as x+y, solve only what is needed.'});
  assign('q-inequalities', {primary:'quant',anchor:'Appendix A · §2.5 Solving Linear Inequalities',officialPractice:'Chapter 4 · Algebra',supp:'Manhattan Ch 9 Inequalities and Absolute Values',practice:'Control sign before multiplying/dividing. For non-linear expressions, sign-chart intervals instead of solving the equality and stopping.'});
  assign('q-quadratics', {primary:'quant',anchor:'Appendix A · §2.4 Solving Quadratic Equations',officialPractice:'Chapter 4 · Algebra',supp:'Manhattan Ch 8 Algebra',practice:'Factoring first when clean; discriminant/Vieta for root-count and root-relation questions; quadratic formula as the universal fallback.'});
  assign('q-functions', {primary:'quant',anchor:'Appendix A · §2.6 Functions',officialPractice:'Chapter 4 · Algebra',supp:'Manhattan Ch 10 Functions, Formulas, and Sequences',practice:'Drill evaluation/composition/domain/piecewise behavior. Treat f(x) as an output rule, never as multiplication.'});
  assign('q-function-graphs', {primary:'quant',anchor:'Appendix A · §2.9 Graphs of Functions',officialPractice:'Chapter 4 · Algebra',supp:'Manhattan Ch 10 + Ch 28 Coordinate Geometry',practice:'Translate among equation, table and graph. Intersections solve equal-output equations; intercepts and transformations should be readable without over-computation.'});
  assign('q-coordinate', {primary:'quant',anchor:'Appendix A · §2.8 Coordinate Geometry',officialPractice:'Chapters 4–5',supp:'Manhattan Ch 28 Coordinate Geometry',practice:'Drill slope, distance, midpoint, line equations, intersections, and graph scale. Remember coordinate figures are drawn to scale on GRE.'});
  assign('q-translation', {primary:'quant',anchor:'Chapter 2 · General Problem-solving Steps + Appendix A §2.7 Applications',officialPractice:'Arithmetic / Algebra practice',supp:'Manhattan Ch 16–17 Word Problems',practice:'Before solving, write what each variable means and translate one relationship per line. Then estimate the expected magnitude before choosing an answer.'});
  assign('q-answer-choice-methods', {primary:'quant',anchor:'Chapter 2 · strategies: trial and error, try variable values, estimation, simplify',officialPractice:'Across all Quant question types',supp:'Manhattan Ch 19 Variables-in-the-Choices Problems',practice:'Use backsolving when numeric choices encode the solution; use smart numbers when variables are unconstrained. Avoid degenerate picks such as 0 or 1 when they erase distinctions.'});
  assign('q-strategy-repertoire', {primary:'quant',anchor:'Chapter 2 · General Problem-solving Steps and 14 ETS strategies',officialPractice:'Apply across Chapters 3–7',supp:'Manhattan diagnostic + mixed practice',practice:'Name the strategy after every reviewed problem until representation choice becomes automatic: translate, simplify, pattern, estimate, test cases, counterexample, sufficiency, etc.'});
  assign('q-angles q-triangles q-special-triangles', {primary:'quant',anchor:'Appendix A · §3.1 Lines and Angles + §3.3 Triangles',officialPractice:'Chapter 5 · Geometry',supp:'Manhattan Ch 27 Triangles + Ch 29 Mixed Geometry',practice:'Redraw/annotate figures, add auxiliary lines only when justified, and never infer unstated lengths/angles from visual appearance.'});
  assign('q-polygons q-area', {primary:'quant',anchor:'Appendix A · §3.2 Polygons + §3.4 Quadrilaterals',officialPractice:'Chapter 5 · Geometry',supp:'Manhattan Ch 25 Polygons and Rectangular Solids',practice:'Know angle sums and area/perimeter formulas, but prioritize decomposition and scaling relationships over brute-force formula use.'});
  assign('q-circles', {primary:'quant',anchor:'Appendix A · §3.5 Circles',officialPractice:'Chapter 5 · Geometry',supp:'Manhattan Ch 26 Circles and Cylinders',practice:'Separate radius/diameter/circumference/area; use central-angle fraction of 360° for arcs/sectors.'});
  assign('q-similarity', {primary:'quant',anchor:'Geometry content · congruent and similar figures',officialPractice:'Chapter 5 · Geometry',supp:'Manhattan Ch 27 / Ch 29',practice:'Match corresponding sides before writing proportions; square the scale factor for area and cube it for volume.'});
  assign('q-solids', {primary:'quant',anchor:'Appendix A · §3.6 Three-Dimensional Figures',officialPractice:'Chapter 5 · Geometry',supp:'Manhattan Ch 25–26',practice:'Translate diagrams into base-area × height models. Track whether the prompt asks volume, surface area, edge length, or a ratio.'});
  assign('q-mean q-median q-quartiles q-sd', {primary:'quant',anchor:'Appendix A · §4.2 Numerical Methods for Describing Data',officialPractice:'Chapter 6 · Data Analysis',supp:'Manhattan Ch 21–22',practice:'Use the statistic that the question actually changes. For mean, track total sum; for median/quartiles, sort; for SD, reason about distance from the mean.'});
  assign('q-graphs q-scatter q-frequency q-di-hard', {primary:'quant',anchor:'Appendix A · §4.1 Methods for Presenting Data + §4.6 Data Interpretation Examples',officialPractice:'Chapter 6 · Data Analysis / DI sets',supp:'Manhattan Ch 24 Data Interpretation',practice:'Read title/axes/units/legend first. Write the denominator before any percent calculation and reuse display work across a set.'});
  assign('q-sets', {primary:'quant',anchor:'Appendix A · §4.3 Counting Methods · sets/lists + Venn diagrams',officialPractice:'Chapter 6 · Data Analysis',supp:'Manhattan Ch 23 Probability, Combinatorics, and Overlapping Sets',practice:'Draw Venn regions and start with the intersection when totals overlap. Distinguish “only,” “both,” “at least one,” and “neither.”'});
  assign('q-counting', {primary:'quant',anchor:'Appendix A · §4.3 Counting Methods',officialPractice:'Chapter 6 · Data Analysis',supp:'Manhattan Ch 23',practice:'Decide whether order matters and whether repetition is allowed before choosing multiplication, permutation, or combination.'});
  assign('q-probability q-conditional', {primary:'quant',anchor:'Appendix A · §4.4 Probability',officialPractice:'Chapter 6 · Data Analysis',supp:'Manhattan Ch 23',practice:'Define the sample space explicitly. For conditional probability, replace the denominator with the condition set; for “at least one,” try the complement first.'});
  assign('q-distributions q-normal', {primary:'quant',anchor:'Appendix A · §4.5 Distributions, Random Variables, and Probability Distributions',officialPractice:'Chapter 6 · Data Analysis',supp:'Manhattan Ch 22 Standard Deviation and Normal Distribution',practice:'Separate distribution shape, center and spread. Use z-distance/68–95–99.7 only when normality is actually given or justified.'});
  assign('q-qc q-qc-adversarial', {primary:'quant',anchor:'Chapter 2 · Quantitative Comparison directions/tips',officialPractice:'QC blocks in Chapters 3–6',supp:'Manhattan QC throughout Quant chapters',practice:'Simplify first, then attack uncertainty with legal counterexamples. Test sign, zero, fractions, equality/boundaries, parity, and extremes when variables are not fixed.'});
  assign('q-estimation', {primary:'quant',anchor:'Chapter 2 · Strategy 9 Estimate',officialPractice:'Across Quant; especially DI and numeric choices',supp:'Manhattan arithmetic/DI',practice:'Estimate before exact calculation whenever answer choices are well separated. Use estimation again as a reasonableness check after computing.'});
  assign('q-conventions', {primary:'quant',anchor:'Appendix B · Mathematical Conventions for the Quantitative Reasoning Measure',officialPractice:'Review before all official Quant practice',supp:'No third-party source supersedes ETS conventions',practice:'Memorize the legal assumptions: real numbers; ordinary geometry not necessarily to scale; coordinate/data graphics to scale; standard notation unless redefined.'});
  assign('q-formats', {primary:'quant',anchor:'Chapter 2 · QC, select-one, select-one-or-more, Numeric Entry, DI',officialPractice:'Read directions before each official question-type block',supp:'Manhattan mixed Quant after format rules are stable',practice:'Know the response rule before solving. Multi-select gives no partial credit; numeric entry may require an exact fraction or decimal format.'});

  // Verbal: ETS question type chapters are the primary calibration source.
  assign('v-rc-map v-main v-detail v-inference v-tone v-longrc v-rhetorical-role v-rc-inference-hard v-science-passages v-humanities-passages v-social-passages v-reading-lab', {primary:'verbal',anchor:'Chapter 2 · Reading Comprehension overview + Chapter 3 RC easy/medium/hard',officialPractice:'Chapter 3 RC sets; then Chapter 6 mixed sets',supp:'Manhattan Ch 5 Reading Comprehension; Big Book RC for additional transfer',practice:'Map role and viewpoint before choices. Answer only from passage evidence; use Big Book RC as extra reading volume, not as a current-format timing model.'});
  assign('v-rc-formats', {primary:'verbal',anchor:'Chapter 2 · RC single-answer, select-one-or-more, and select-in-passage directions',officialPractice:'Chapter 3 RC sets',supp:'Use current ETS material to calibrate formats',practice:'Multi-answer: judge each choice independently and select all-and-only correct. Select-in-passage: match the whole requested role, not a sentence that only partially fits.'});
  assign('v-logic v-connectors v-scope v-syntax-spine v-reference', {primary:'verbal',anchor:'Chapter 2 · TC/SE advice: structural words, coherent whole, own-word prediction',officialPractice:'Chapters 4–5 + mixed sets',supp:'Manhattan Ch 3–4',practice:'Read for logical relationship before vocabulary. Mark contrast, continuation, cause, concession, degree, and referents; then predict the blank/role.'});
  assign('v-tc v-tc-one v-tc-multi', {primary:'verbal',anchor:'Chapter 2 · Text Completion description/tips + Chapter 4 easy/medium/hard',officialPractice:'Chapter 4; then Chapter 6 mixed sets',supp:'Manhattan Ch 3 Text Completions; Big Book sentence completions only as legacy single-blank logic practice',practice:'Do not brute-force combinations. Start with the most constrained blank, prephrase, and verify the completed text is logically, grammatically, and stylistically coherent.'});
  assign('v-se v-se-pairing', {primary:'verbal',anchor:'Chapter 2 · Sentence Equivalence description/tips + Chapter 5 easy/medium/hard',officialPractice:'Chapter 5; then Chapter 6 mixed sets',supp:'Manhattan Ch 4 Sentence Equivalence',practice:'Predict sentence meaning first. The correct pair must each fit and must produce completed sentences alike in meaning; a synonym pair alone is not sufficient.'});
  assign('v-vocab-strategy v-morphology v-polysemy v-connotation', {primary:'verbal',anchor:'TC/SE and RC in-context word meaning',officialPractice:'Use official explanations to collect recurring words and secondary senses',supp:'Atlas SRS + Manhattan TC/SE; Big Book antonym lists may supply vocabulary only, never current-format practice',practice:'Learn word + polarity + degree + register + secondary sense + synonym neighborhood. Retrieval in sentences beats memorizing isolated glosses.'});
  assign('v-elimination v-trap-taxonomy', {primary:'verbal',anchor:'Chapter 2 · RC/TC/SE answer-choice guidance',officialPractice:'All official Verbal sets',supp:'Manhattan diagnostics and practice',practice:'Label why every tempting wrong choice fails: scope, reversal, outside knowledge, partial truth, unsupported strength, wrong blank logic, or non-equivalent SE meaning.'});
  assign('v-cr v-assumption v-strengthen-weaken v-paradox', {primary:'verbal',anchor:'RC abilities: assumptions, strengths/weaknesses, alternative explanations, inference',officialPractice:'RC questions across Chapters 3 and 6',supp:'Manhattan Ch 6 Logic-Based Reading Comprehension',practice:'Reduce argument to evidence → conclusion. For assumption, ask what must bridge the gap; for weaken/strengthen, change the support link; for paradox, reconcile both facts.'});

  // Writing.
  assign('a-format a-task', {primary:'guide',anchor:'Chapter 2 · GRE Analytical Writing; one 30-minute Issue task with specific instructions',officialPractice:'Official published Issue pool + sample tasks',supp:'Official Verbal 3e Chapter 7',practice:'Before writing, rewrite the exact instruction in your own words. A good essay on the general topic can still underperform if it answers the wrong task.'});
  assign('a-rubric a-nuance', {primary:'guide',anchor:'Chapter 2 · GRE Scoring Guide and score-level descriptions',officialPractice:'Compare 5/6 samples and reader commentary',supp:'Official Verbal 3e pp. 193–end of AWA chapter',practice:'Audit complexity, position, development, organization and language. Nuance means meaningful conditions/limitations, not indecision.'});
  assign('a-structure a-reasoning a-counter a-examples a-example-depth', {primary:'guide',anchor:'Chapter 2 · strategies + scored sample essays/reader commentary',officialPractice:'Write from the published Issue pool, then self-score against ETS rubric',supp:'Manhattan Ch 31 Essays for extra prompts/structure practice',practice:'Each paragraph needs claim → reason/mechanism → example/evidence → explicit link. Use concession only when it changes or sharpens the thesis.'});
  assign('a-style a-revision', {primary:'guide',anchor:'AWA scoring: standard written English, clarity/control; no spelling/grammar checker',officialPractice:'Timed essays + final 2–4 minute revision pass',supp:'Official Verbal 3e scored samples',practice:'Prioritize clarity and logical control over ornate vocabulary. Build a personal last-three-minutes error checklist.'});
  assign('a-timing a-practice a-idea-bank', {primary:'guide',anchor:'AWA general strategies: plan, compose, save time to check obvious errors',officialPractice:'Published Issue pool under 30-minute timing',supp:'Official Verbal 3e Chapter 7',practice:'Use repeatable planning lenses and timed cycles. Review the essay after a delay and rewrite the weakest paragraph rather than only scoring it.'});

  // Strategy / meta.
  assign('s-structure s-adaptive-deep', {primary:'guide',anchor:'Chapter 1 · test structure, section-level adaptation, scoring',officialPractice:'Use official Test Preview/POWERPREP to learn the interface',supp:'Official Quant/Verbal overview chapters',practice:'Know the exact current timing and section behavior, but never try to game perceived item difficulty. Maximize correct answers.'});
  assign('s-timing s-review s-scratch s-calculator', {primary:'guide',anchor:'Chapter 1 test-taking strategies + Quant Chapter 2 calculator guidance',officialPractice:'Timed official mixed sets',supp:'Manhattan mixed sections only after strategy is stable',practice:'Use mark/review, answer every item, keep scratchwork legible, and treat the calculator as a tool—not the default solution method.'});
  assign('s-mocks s-final-calibration', {primary:'guide',anchor:'Chapters 10–11 · two full-length tests + official POWERPREP',officialPractice:'Full simulations late in prep under realistic conditions',supp:'Manhattan practice sections for additional timing reps',practice:'Preserve scarce official full tests. After each, classify misses by content/reasoning/execution/time and train the pattern before spending another official test.'});
  assign('s-error-budget s-masterygates s-testday', {primary:'guide',anchor:'Chapter 1 strategies + official scoring/test-day guidance',officialPractice:'Evidence from timed official sets and mocks',supp:'Atlas Error Log / delayed retesting',practice:'A chapter is stable only after delayed mixed timed accuracy. Test day is execution of practiced routines, not a place to invent new ones.'});
  assign('s-source-practice-system', {primary:'guide',anchor:'How to Use This Book + Official Guide practice/mixed/full-test sequence',officialPractice:'Use all official sources in increasing fidelity',supp:'Manhattan 5 lb for volume; Big Book only through the legacy filter',practice:'Learn → original Atlas drills → focused third-party volume → official type/content calibration → official mixed sets → full simulations. Review before adding more volume.'});

  const officialChecklist = [
    {group:'Quant · Math Review exact sections',items:[
      ['1.1 Integers','q-integers q-factors q-remainders q-integer-constraints'],['1.2 Fractions','q-fractions'],['1.3 Exponents and Roots','q-exponents'],['1.4 Decimals','q-decimals q-fractions'],['1.5 Real Numbers','q-number-line q-absolute'],['1.6 Ratio','q-ratio'],['1.7 Percent','q-percent-growth'],
      ['2.1 Algebraic Expressions','q-expressions'],['2.2 Rules of Exponents','q-exponents'],['2.3 Solving Linear Equations','q-linear q-systems'],['2.4 Solving Quadratic Equations','q-quadratics'],['2.5 Solving Linear Inequalities','q-inequalities'],['2.6 Functions','q-functions'],['2.7 Applications: average, mixture, rate, work, interest','q-mean q-mixtures q-rates q-work-combined q-interest q-translation'],['2.8 Coordinate Geometry','q-coordinate'],['2.9 Graphs of Functions','q-function-graphs'],
      ['3.1 Lines and Angles','q-angles'],['3.2 Polygons','q-polygons q-area'],['3.3 Triangles','q-triangles q-special-triangles'],['3.4 Quadrilaterals','q-polygons q-area'],['3.5 Circles','q-circles'],['3.6 Three-Dimensional Figures','q-solids q-scaling'],
      ['4.1 Methods for Presenting Data','q-graphs q-scatter q-frequency q-di-hard'],['4.2 Numerical Methods for Describing Data','q-mean q-median q-quartiles q-sd'],['4.3 Counting Methods','q-counting q-sets'],['4.4 Probability','q-probability q-conditional'],['4.5 Distributions / random variables / probability distributions','q-distributions q-normal'],['4.6 Data Interpretation Examples','q-di-hard q-graphs']
    ]},
    {group:'Quant · method & format',items:[
      ['Understand → strategy → check','q-strategy-repertoire q-translation q-estimation'],['ETS problem-solving repertoire / representation choice','q-strategy-repertoire q-answer-choice-methods'],['Quantitative Comparison','q-qc q-qc-adversarial'],['Select one / select one-or-more / Numeric Entry / DI','q-formats q-di-hard'],['Calculator judgment','s-calculator'],['Mathematical conventions','q-conventions']
    ]},
    {group:'Verbal · Reading Comprehension abilities',items:[
      ['word/sentence/paragraph/whole-text meaning','v-rc-map v-syntax-spine v-reference'],['minor vs major points and summary','v-main v-rc-map'],['draw conclusions / infer missing information','v-inference v-rc-inference-hard'],['text structure and relations among parts','v-rhetorical-role v-connectors v-rc-map'],['author perspective and commitment','v-tone v-scope'],['author assumptions','v-assumption'],['strengths, weaknesses, alternative explanations','v-cr v-strengthen-weaken v-paradox'],['single-answer / multi-answer / select-in-passage','v-rc-formats'],['domain variety and long passages','v-science-passages v-humanities-passages v-social-passages v-longrc']
    ]},
    {group:'Verbal · Text Completion & Sentence Equivalence',items:[
      ['TC overall sense + structural signals + own-word prediction','v-tc v-logic v-connectors'],['one blank','v-tc-one'],['two / three blanks and solve most constrained first','v-tc-multi'],['logical + grammatical + stylistic coherence','v-syntax-spine v-reference v-connotation'],['SE exactly two choices; completed sentences alike in meaning','v-se v-se-pairing'],['vocabulary relationships / secondary meanings','v-vocab-strategy v-polysemy v-connotation v-morphology']
    ]},
    {group:'Analytical Writing',items:[
      ['one 30-minute Issue task + specific instruction','a-format a-task'],['consider complexities / take and support a position','a-nuance a-reasoning'],['relevant reasons/examples and explicit development','a-examples a-example-depth'],['organization and coherent discussion','a-structure'],['counterpressure and qualification','a-counter'],['standard written English / language control','a-style a-revision'],['timed plan-draft-revise routine','a-timing a-practice'],['ETS scoring guide / reader commentary','a-rubric']
    ]},
    {group:'Execution',items:[
      ['current 1h58 structure; AWA first','s-structure'],['section-level adaptation','s-adaptive-deep'],['mark/review/change answers within section','s-review'],['answer every V/Q question; no wrong-answer penalty','s-timing'],['scratch materials and calculator discipline','s-scratch s-calculator'],['official calibration and full-test use','s-mocks s-final-calibration s-source-practice-system']
    ]}
  ];

  const legacyFilter = [
    ['Big Book Reading Comprehension','USE','Highly transferable for passage structure, inference, main idea, tone, evidence discipline and stamina. Do not use its section timing as current GRE pacing.'],
    ['Big Book Sentence Completion','USE SELECTIVELY','Useful for single-blank logic, prephrasing and vocabulary in context. Current TC also includes multi-blank formats, so pair with modern ETS material.'],
    ['Big Book Quant','USE SELECTIVELY','Good extra fundamentals and reasoning volume; screen for old wording/format and calibrate difficulty/response types with 2025 ETS books.'],
    ['Big Book Analogies','SKIP AS FORMAT','Not a current GRE question type. Any vocabulary encountered can be added to SRS, but do not train analogy mechanics.'],
    ['Big Book Antonyms','SKIP AS FORMAT','Not a current GRE question type. Mine only genuinely useful vocabulary; do not spend timed practice on antonym questions.'],
    ['Old Analytical/logic sections','DO NOT TREAT AS CURRENT','Some reasoning may transfer, but the current GRE has one AWA Issue task plus modern Verbal/Quant formats.'],
    ['Old timing / scoring / section structure','IGNORE','Use the 2025 ETS books and current ETS site for all format, timing, scoring and policy decisions.']
  ];

  const awaInstructionTypes = [
    ['Claim + challenge','Take a position on a claim, then confront the strongest reasons or examples that could challenge your position.'],
    ['Recommendation + circumstances','Evaluate a recommendation and explain when adopting it would or would not be advantageous.'],
    ['Two competing views','Choose which view is closer to your position, explain why, and address both views rather than ignoring the weaker one.'],
    ['Claim + supporting reason','Evaluate both the claim and the reason offered for that claim; they can succeed or fail independently.'],
    ['Policy + consequences','Evaluate a policy while explicitly considering likely consequences and how those consequences shape your position.']
  ];

  const manhattanMap = [
    ['Verbal','Ch 3 Text Completions · Ch 4 Sentence Equivalence · Ch 5 Reading Comprehension · Ch 6 Logic-Based RC'],
    ['Arithmetic','Ch 7 Arithmetic · Ch 11 Fractions/Decimals · Ch 12 Percents · Ch 13 Divisibility/Primes · Ch 14 Exponents/Roots · Ch 15 Number Properties'],
    ['Algebra / word problems','Ch 8 Algebra · Ch 9 Inequalities/Absolute Value · Ch 10 Functions/Formulas/Sequences · Ch 16–18 Word Problems/Rates/Work · Ch 19 Variables-in-the-Choices'],
    ['Stats / probability / DI','Ch 21 Averages/Median/Mode · Ch 22 SD/Normal · Ch 23 Probability/Combinatorics/Overlapping Sets · Ch 24 Data Interpretation'],
    ['Geometry','Ch 25 Polygons/Rectangular Solids · Ch 26 Circles/Cylinders · Ch 27 Triangles · Ch 28 Coordinate Geometry · Ch 29 Mixed Geometry'],
    ['Stretch only','Ch 30 Advanced Quant — intentionally can exceed real-GRE difficulty; use sparingly after normal hard questions are reliable']
  ];

  window.GRE_SOURCE_GUIDE={catalog:CATALOG,topicSources,officialChecklist,legacyFilter,manhattanMap,awaInstructionTypes};

  // Deep-content extensions for source-audit gaps discovered in the 2025 ETS Math Review and the 5 lb. drill taxonomy.
  window.GRE_DEEP_CONTENT=window.GRE_DEEP_CONTENT||{};
  Object.assign(window.GRE_DEEP_CONTENT,{
    'q-decimals':[
      'Decimal notation is place value. Multiplying/dividing by powers of 10 moves the decimal point because each place is ten times the next; do not rely on vague “move it” rules without tracking direction.',
      'For addition/subtraction, align decimal points; for multiplication, multiply as integers then restore the total number of decimal places. For division, scale both dividend and divisor by the same power of 10 until the divisor is convenient.',
      'Terminating decimals are rational; repeating decimals are rational. The GRE may move freely among fraction, decimal and percent representations, so convert to the representation that makes comparison easiest.',
      'Rounding is decided by the first discarded digit: 0–4 keep, 5–9 increase the retained digit by 1. Distinguish “nearest hundredth” from “two significant figures” unless the question explicitly uses significant figures.',
      'For magnitude, leading zeros after the decimal do not change place-value naming but do change size dramatically: 0.04 is ten times 0.004. Write zeros deliberately under time pressure.',
      'Estimate before calculator entry. If a decimal computation produces a result outside the plausible interval, suspect decimal placement, percent conversion, or a key-entry error.'
    ],
    'q-interest':[
      'Interest is just growth modeling. Simple interest repeatedly adds the same amount based on the original principal; compound interest repeatedly multiplies by a growth factor because prior interest becomes part of the new principal.',
      'Translate an annual rate r percent to decimal r/100 before using formulas. For compounding n times per year, each period uses rate r/n and there are nt periods.',
      'Simple-interest value after t years is P(1+rt) when r is decimal. Compound value with n compounding periods per year is P(1+r/n)^(nt). Annual compounding is the special case P(1+r)^t.',
      'Reverse problems are common: if the final value is known, divide by the accumulated growth factor to recover principal. Do not subtract the final percentage from the final amount.',
      'Compare simple vs compound without overcomputing: with positive rate and multiple compounding periods, compound growth exceeds simple growth because interest earns interest.',
      'Calculator use belongs at the final numerical stage. Set up the exponent and parentheses first; a perfectly keyed calculator cannot repair an incorrect growth model.'
    ],
    'q-function-graphs':[
      'A graph of y=f(x) is the set of input-output pairs (x,f(x)). Reading a graph is function evaluation in visual form: the y-coordinate at x=a is f(a).',
      'x-intercepts solve f(x)=0; the y-intercept is f(0) when defined. Intersections of y=f(x) and y=g(x) are exactly the x-values where f(x)=g(x).',
      'For linear graphs, slope is constant and intercepts can often answer a problem faster than solving an equation. For quadratics, vertex, opening direction and zeros organize the entire graph.',
      'Transformations are relative: f(x)+k shifts vertically; f(x−h) shifts right by h; af(x) scales outputs; f(ax) changes horizontal scale. GRE questions are usually qualitative rather than notation-heavy.',
      'Piecewise graphs require checking which rule/segment owns the input, especially at open/closed endpoints. Do not assume an endpoint is included because a line visually reaches it.',
      'ETS coordinate systems are drawn to scale, unlike ordinary geometry sketches. Visual estimation from a coordinate graph is legal when the problem permits it, but exact labels/relations still dominate when supplied.'
    ],
    'q-answer-choice-methods':[
      'Backsolving treats numeric answer choices as candidate solutions. It is strongest when the equation/model is easier to verify than to derive and when choices are ordered so a middle choice can eliminate half the field.',
      'Smart-number substitution is valid when variables are deliberately unspecified and the target is invariant across legal choices. Choose numbers that preserve every condition and expose, rather than erase, differences.',
      'Avoid degenerate picks such as 0, 1, equal values, or values already present in the prompt when those choices collapse expressions and make multiple options accidentally coincide. A second legal test can confirm uniqueness.',
      'For percentage/ratio word problems, picking a total of 100 or the least common multiple of denominators can turn fractions into integers and reveal the structure immediately.',
      'For variables-in-the-choices, substitute a convenient legal value into the prompt and every answer choice. The correct symbolic choice must reproduce the target for that value; if several survive, use a second value.',
      'These are decision tools, not rituals. If algebra is one clean line, do algebra. Use backsolving/substitution when they reduce cognitive load and preserve logical certainty.'
    ],
    'q-strategy-repertoire':[
      'ETS begins with a three-stage loop: understand the problem, carry out a strategy, check the answer. Treat this as a control system—representation errors occur before calculation, and reasonableness checks occur after it.',
      'Translation strategies convert words↔algebra, words→diagram, algebra→graph, and figure→algebra. A large share of “hard” GRE Quant is choosing the representation in which the relationship becomes obvious.',
      'Structure strategies include simplifying, adding useful lines to geometry, finding a pattern, and searching for a relationship. These reduce the problem before computation.',
      'Testing strategies include estimation, trial/refinement, substituting multiple legal values, and dividing into cases. They are especially valuable in QC and constrained-variable questions.',
      'Proof-style reasoning on GRE is lightweight but crucial: a single counterexample can disprove a universal conclusion; conversely, several examples cannot prove one. This distinction is a 170-level QC habit.',
      'Sufficiency thinking asks what missing information would force a unique answer. Even when the GRE is not a data-sufficiency test, recognizing what remains undetermined prevents unjustified assumptions.'
    ],
    's-source-practice-system':[
      'Not all practice is equally valuable. Official current-format ETS questions are the highest-fidelity calibration material; third-party material is best used for volume, isolation of weak skills, and deliberate overtraining.',
      'Protect scarce official full simulations. Learning a concept from the answer explanation of a full test is an expensive way to discover a basic gap that a chapter drill could have exposed first.',
      'Use sources in an increasing-fidelity ladder: Atlas concept/retrieval → targeted volume → official type/content set → official mixed set → POWERPREP/full simulation. Move up only when the previous layer is stable.',
      'Review is part of practice, not an optional afterthought. For every miss and lucky guess, classify the cause, reconstruct the correct reasoning, write a prevention cue, and retest after delay.',
      'Legacy materials require a transfer filter. The Big Book is excellent for some RC and foundational practice but contains obsolete formats; old timing and scoring must never overwrite current ETS rules.',
      'Difficulty is a training variable, not a status symbol. Manhattan explicitly includes “Advanced Quant” that may exceed real-GRE difficulty; use it to stretch only after normal hard-GRE accuracy is reliable.'
    ]
  });

  window.GRE_TOPIC_TOOLKIT=window.GRE_TOPIC_TOOLKIT||{};
  Object.assign(window.GRE_TOPIC_TOOLKIT,{
    'q-decimals':{
      tricks:['Align decimal points for +/−; count decimal places for ×; scale both numbers equally for ÷.','Convert awkward decimals to fractions when structure is clearer, especially repeating/simple terminating values.','Rounding trap: identify the requested place first, then inspect exactly one digit to its right.','Magnitude check: estimate order of magnitude before accepting a calculator result.'],
      formulas:['p% = p/100','decimal → percent: ×100%','percent → decimal: ÷100','round to place d: inspect the next smaller place']
    },
    'q-interest':{
      tricks:['Simple interest adds the same dollar interest each period; compound interest multiplies the balance.','Reverse-growth problems divide by the growth factor; they do not subtract a percent from the final value.','Convert rate percent to decimal before the formula, and divide by compounding frequency only after that.','Estimate first: positive compounding for multiple periods should exceed simple interest at the same nominal positive rate.'],
      formulas:['Simple: V = P(1 + rt)','Annual compound: V = P(1+r)^t','n times/year: V = P(1+r/n)^(nt)','Principal from final: P = V / growth factor']
    },
    'q-function-graphs':{
      tricks:['At x=a, read the graph vertically to get f(a).','Graph intersections solve f(x)=g(x); x-intercepts solve f(x)=0.','Open circle = endpoint excluded; closed circle = endpoint included.','Coordinate graphs are drawn to scale on GRE, unlike ordinary geometry figures.'],
      formulas:['x-intercept: f(x)=0','y-intercept: (0,f(0))','intersection: f(x)=g(x)','line: y=mx+b; m=Δy/Δx']
    },
    'q-answer-choice-methods':{
      tricks:['Backsolve ordered numeric choices from the middle when monotonicity lets you eliminate half the options.','For symbolic choices, pick a legal easy number and test every choice; use a second value if multiple choices survive.','Avoid 0/1/equal values when they make terms vanish or become indistinguishable.','Pick 100 for percent problems and common multiples for ratio/fraction problems when legal.'],
      formulas:['Backsolve: choice → original conditions → accept/reject','Smart numbers: legal input → target value → compare choices','Invariant test: correct symbolic option must work for every legal input','Second-test rule: if >1 choice survives, choose a structurally different legal value']
    },
    'q-strategy-repertoire':{
      tricks:['Ask “what representation makes this easiest?” before asking “what formula?”','Use estimation both as a solving method and as a post-computation error detector.','In QC, search deliberately for a counterexample instead of trying to prove equality from a few examples.','When stuck for ~20–30 seconds, change representation or strategy rather than repeating the same algebra.'],
      formulas:['ETS loop: Understand → Strategy → Check','Translation: words ↔ algebra/diagram/graph','Testing: estimate → guess/refine → multiple values → cases','Proof/sufficiency: counterexample disproves; determine what extra fact would force an answer']
    },
    's-source-practice-system':{
      tricks:['Spend high-fidelity official questions only when you are ready to learn from their wording/difficulty, not while relearning basic arithmetic.','Third-party volume is for repetitions; ETS is for calibration. When they conflict about format or convention, ETS wins.','Do not take a new mock until the previous mock has generated concrete repairs that you have retested.','Use Big Book through a legacy filter: RC and selected fundamentals yes; analogies/antonyms/current timing no.'],
      formulas:['Practice ladder = Learn → Retrieve → Targeted volume → Official calibration → Mixed timed → Full simulation','Review loop = Miss/lucky guess → classify → repair rule → targeted reps → delayed mixed retest','Official-test preservation: fewer well-reviewed simulations > many casually consumed simulations','Difficulty ROI: master common/hard GRE patterns before beyond-GRE challenge work']
    }
  });
})();

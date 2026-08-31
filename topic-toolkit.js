window.GRE_TOPIC_TOOLKIT = {
  "q-number-line": {
    "tricks": [
      "Critical-value trick: split the number line at 0, 1, −1, denominator zeros, square-root boundaries, and stated endpoints before testing values.",
      "Distance trick: rewrite |x−a| as “distance from a.” Absolute-value equations and inequalities often become a picture instead of casework.",
      "Reciprocal trap: never invert an inequality until you know the signs. Positive reciprocals reverse order; crossing zero changes everything.",
      "QC speed move: one legal counterexample that changes the relationship is enough to prove “cannot be determined”; do not over-solve."
    ],
    "formulas": [
      "|a−b| = distance between a and b",
      "|x−a| < r  ⇔  a−r < x < a+r",
      "|x−a| > r  ⇔  x < a−r or x > a+r",
      "If 0<a<b, then 1/a > 1/b; if signs are unrestricted, test cases."
    ]
  },
  "q-integers": {
    "tricks": [
      "Write even as 2k and odd as 2k+1 when parity gets messy; this turns “pattern intuition” into proof.",
      "Remember the boundaries: 0 is even and neither positive nor negative; 1 is neither prime nor composite.",
      "For consecutive integers, exploit guaranteed divisibility: among any 2 consecutive integers one is even; among any 3 one is divisible by 3.",
      "If a product is odd, every integer factor is odd; if a product is even, at least one factor is even. Use implications in reverse carefully."
    ],
    "formulas": [
      "even = 2k; odd = 2k+1",
      "even±even=even; odd±odd=even; even±odd=odd",
      "Product odd ⇔ every integer factor odd",
      "n(n+1) is divisible by 2; n(n+1)(n+2) is divisible by 6."
    ]
  },
  "q-factors": {
    "tricks": [
      "Prime-factorize early whenever you see GCF, LCM, divisor count, perfect square/cube, or “smallest multiplier.”",
      "Divisor-count trick: if n=p^a q^b…, the positive divisor count comes from choosing each exponent independently.",
      "Perfect-square repair: every prime exponent must be even; for a cube every exponent must be divisible by 3.",
      "Fast divisibility: memorize 2,3,4,5,6,8,9,10,11 rules; these often eliminate answer choices without division."
    ],
    "formulas": [
      "If n=p^a q^b…, # positive divisors=(a+1)(b+1)…",
      "GCF uses minimum prime exponents; LCM uses maximum exponents.",
      "For positive a,b: GCF(a,b)·LCM(a,b)=ab",
      "Perfect square ⇔ all prime exponents even; perfect cube ⇔ all exponents multiples of 3."
    ]
  },
  "q-remainders": {
    "tricks": [
      "Translate immediately: “remainder r when divided by d” means n=dk+r or n≡r (mod d).",
      "Last-digit problems are mod 10 problems. Powers cycle; find the cycle instead of evaluating the power.",
      "For two remainder conditions, list the short arithmetic progression for one condition and test the other; this is often faster than formal CRT.",
      "Reduce after every arithmetic step. Keeping residues small prevents calculation errors."
    ],
    "formulas": [
      "n=dq+r with 0≤r<d",
      "If a≡r and b≡s (mod d), then a+b≡r+s (mod d)",
      "If a≡r and b≡s (mod d), then ab≡rs (mod d)",
      "Last digit of N = N mod 10; reduce exponent by the power cycle length."
    ]
  },
  "q-fractions": {
    "tricks": [
      "Cancel factors, never terms. Factor first before cancelling algebraic fractions.",
      "Benchmark fractions (1/2,1/3,2/3,1/4,3/4,1/5,1/8) should be instant; they make DI and estimation much faster.",
      "Cross-multiply only when denominator signs are known; with variable denominators, sign uncertainty can invalidate an inequality step.",
      "For complex fractions, multiply top and bottom by the least common denominator instead of converting everything to decimals."
    ],
    "formulas": [
      "a/b ÷ c/d = ad/bc",
      "a/b + c/d = (ad+bc)/bd",
      "For positive b,d: a/b ? c/d  ⇔  ad ? bc",
      "p% = p/100; fraction ↔ decimal ↔ percent should be interchangeable."
    ]
  },
  "q-ratio": {
    "tricks": [
      "Ratio is part-to-part unless the question asks a part of the whole: 3:5 means 3/8 and 5/8 of total.",
      "Introduce a scale factor k: if A:B=3:5, write A=3k and B=5k; totals/differences then become one-step equations.",
      "Chain ratios by matching the shared term before combining them.",
      "For direct/inverse variation, identify the invariant first (y/x or xy) rather than memorizing words."
    ],
    "formulas": [
      "A:B=a:b ⇒ A=ak, B=bk",
      "Direct variation: y=kx ⇒ y/x=k",
      "Inverse variation: y=k/x ⇒ xy=k",
      "Part fraction from ratio a:b is a/(a+b) or b/(a+b)."
    ]
  },
  "q-rates": {
    "tricks": [
      "Write units beside every number; if units do not cancel to the requested unit, the setup is wrong.",
      "Average speed is total distance / total time, not the average of the speeds unless time weights are equal.",
      "Toward each other: add speeds. Same direction: subtract speeds. Think “rate at which the gap changes.”",
      "Split multi-stage trips into rows of a distance-rate-time table; combine only at the end."
    ],
    "formulas": [
      "distance = rate × time",
      "average speed = total distance / total time",
      "Equal-distance two-speed average = 2ab/(a+b)",
      "relative speed = a+b (toward) or |a−b| (same direction)."
    ]
  },
  "q-exponents": {
    "tricks": [
      "Rewrite to a common base before computing huge powers.",
      "√(x²)=|x| is a GRE favorite; dropping the absolute value silently assumes x≥0.",
      "For 0<a<1, bigger positive exponent makes a smaller number—the direction reverses from the a>1 intuition.",
      "Negative bases require parity control; distinguish (−3)^2 from −3^2."
    ],
    "formulas": [
      "a^m·a^n=a^(m+n); a^m/a^n=a^(m−n)",
      "(a^m)^n=a^(mn); a^(−n)=1/a^n",
      "a^(m/n)=nth-root(a^m) when real-defined",
      "√(x²)=|x|."
    ]
  },
  "q-absolute": {
    "tricks": [
      "Use the distance interpretation before algebraic case splitting.",
      "“Inside” inequalities (< or ≤) become a single interval; “outside” (> or ≥) becomes two rays joined by OR.",
      "If the right side of |expression|=c is negative, there are no real solutions; if c=0, the inside must be zero.",
      "In QC, |x| compared with x is immediately sign-dependent unless x≥0 is given."
    ],
    "formulas": [
      "|x−a|=r ⇒ x=a±r (r≥0)",
      "|x−a|<r ⇒ a−r<x<a+r",
      "|x−a|>r ⇒ x<a−r or x>a+r",
      "|x|=x for x≥0; |x|=−x for x≤0."
    ]
  },
  "q-sequences": {
    "tricks": [
      "Write the first few terms if the pattern is unfamiliar; differences, ratios, parity, or cycles often reveal the rule faster than formulas.",
      "For arithmetic sequences, use the first and last terms to sum; do not add term-by-term.",
      "For geometric sequences, watch signs when the ratio is negative—terms alternate.",
      "Indexing trap: the nth-term exponent is n−1 because a1 uses zero jumps."
    ],
    "formulas": [
      "Arithmetic: a_n=a_1+(n−1)d",
      "Arithmetic sum: S_n=n(a_1+a_n)/2",
      "Geometric: a_n=a_1 r^(n−1)",
      "Finite geometric sum: S_n=a_1(1−r^n)/(1−r), r≠1."
    ]
  },
  "q-expressions": {
    "tricks": [
      "Factor before expanding when the goal is cancellation, roots, divisibility, or comparison.",
      "Use substitutions for repeated chunks such as x²+x; the GRE often hides a simple quadratic inside a complicated expression.",
      "Never cancel across addition: (x+3)/x does not become 3.",
      "Preserve domain restrictions from the original expression even after cancellation."
    ],
    "formulas": [
      "a²−b²=(a−b)(a+b)",
      "(a+b)²=a²+2ab+b²; (a−b)²=a²−2ab+b²",
      "a³−b³=(a−b)(a²+ab+b²)",
      "a³+b³=(a+b)(a²−ab+b²)."
    ]
  },
  "q-linear": {
    "tricks": [
      "Translate words before solving; most errors occur in setup, not algebra.",
      "Clear fractions by multiplying the entire equation by the LCD.",
      "Backsolve answer choices when the verbal setup is cumbersome and choices are ordered; start near the middle.",
      "Attach units to variables so “price per item” and “total price” do not get confused."
    ],
    "formulas": [
      "ax+b=c ⇒ x=(c−b)/a, a≠0",
      "“p% more than y” ⇒ x=(1+p/100)y",
      "“p% of y” ⇒ x=(p/100)y",
      "proportion a/b=c/d ⇒ ad=bc (b,d≠0)."
    ]
  },
  "q-inequalities": {
    "tricks": [
      "Every time you multiply or divide by a negative, physically flip the inequality sign on paper.",
      "Factor polynomial inequalities and make a sign chart around roots instead of guessing.",
      "For compound inequalities, AND means intersection; OR means union.",
      "In QC, test boundary-adjacent values and sign regions, not random values."
    ],
    "formulas": [
      "If a<b, then a+c<b+c",
      "If c>0 and a<b, ac<bc; if c<0, ac>bc",
      "a<x<b means x>a AND x<b",
      "(x−r1)(x−r2) changes sign only at roots r1,r2."
    ]
  },
  "q-systems": {
    "tricks": [
      "Choose elimination when coefficients nearly match; substitution when one variable is already isolated.",
      "For word systems, one equation often tracks quantity and the other value/cost/concentration.",
      "Parallel distinct lines = no solution; same line = infinitely many solutions.",
      "If only one expression (like x+y) is requested, eliminate toward that expression instead of solving both variables."
    ],
    "formulas": [
      "Linear system solution = intersection of the lines",
      "For ax+by=e and cx+dy=f, eliminate by multiplying equations to match one coefficient",
      "Parallel nonvertical lines: same slope, different intercepts ⇒ no solution",
      "Equivalent equations ⇒ infinitely many solutions."
    ]
  },
  "q-quadratics": {
    "tricks": [
      "Factor first; use the quadratic formula only when factoring is not obvious.",
      "If a question asks only sum/product of roots, use Vieta instead of solving.",
      "Discriminant tells number of real roots instantly.",
      "For sign questions, factor and use intervals around roots; a positive leading coefficient means the parabola opens upward."
    ],
    "formulas": [
      "ax²+bx+c=0 ⇒ x=[−b±√(b²−4ac)]/(2a)",
      "Discriminant Δ=b²−4ac",
      "Roots r,s: r+s=−b/a; rs=c/a",
      "Axis of symmetry: x=−b/(2a)."
    ]
  },
  "q-functions": {
    "tricks": [
      "Treat f(x) as a machine, not multiplication. Substitute the entire input, including parentheses.",
      "Composition order matters: f(g(x)) means g first.",
      "Domain restrictions often come from denominator ≠0 and even-root radicand ≥0.",
      "For transformations, horizontal shifts feel reversed: f(x−h) shifts right h."
    ],
    "formulas": [
      "(f∘g)(x)=f(g(x))",
      "f(x)+k: vertical shift up k",
      "f(x−h): horizontal shift right h",
      "−f(x): reflect over x-axis; f(−x): reflect over y-axis."
    ]
  },
  "q-coordinate": {
    "tricks": [
      "Use slope to decide parallel/perpendicular relationships before writing full line equations.",
      "Horizontal line slope=0; vertical line slope undefined—do not call it infinite.",
      "For distance, look for Pythagorean triples before using the square-root formula.",
      "Coordinate graphs are to scale under ETS conventions; ordinary geometry sketches are not."
    ],
    "formulas": [
      "m=(y2−y1)/(x2−x1)",
      "y=mx+b; point-slope y−y1=m(x−x1)",
      "distance=√[(x2−x1)²+(y2−y1)²]",
      "midpoint=((x1+x2)/2,(y1+y2)/2); perpendicular slopes multiply to −1 when defined."
    ]
  },
  "q-translation": {
    "tricks": [
      "Define the target variable first; many word problems become easier when you model what the question actually asks.",
      "Build equations before doing arithmetic—premature number-crunching hides relationships.",
      "Use answer choices: backsolve if the choices are numeric and the model is monotonic.",
      "Check the solution against story constraints such as positivity, integrality, capacity, or time order."
    ],
    "formulas": [
      "quantity = rate × time",
      "total value = Σ(quantity × unit value)",
      "part + part = whole (when categories are exhaustive)",
      "Percent relation: new = old × (1 ± p/100)."
    ]
  },
  "q-angles": {
    "tricks": [
      "Do not trust apparent angle sizes in ordinary geometry figures.",
      "When parallel lines appear, mark equal corresponding/alternate interior angles immediately.",
      "At an intersection, vertical angles are equal and adjacent linear-pair angles sum to 180°.",
      "If many angles appear, use variables and the smallest number of equations rather than chasing every angle."
    ],
    "formulas": [
      "Straight angle =180°; full turn=360°",
      "Vertical angles are equal",
      "Linear pair angles sum to 180°",
      "With parallel lines: corresponding and alternate interior angles equal; same-side interior sum 180°."
    ]
  },
  "q-triangles": {
    "tricks": [
      "Triangle inequality is fastest as |a−b|<c<a+b for the third side.",
      "Largest side faces largest angle; this can answer comparison questions without calculating angles.",
      "Any side can be a base, but the height must be perpendicular to that base.",
      "For isosceles triangles, equal sides ↔ equal opposite angles; exploit symmetry."
    ],
    "formulas": [
      "Interior angles sum to 180°",
      "Area=½bh",
      "Triangle inequality: |a−b|<c<a+b",
      "Isosceles: equal sides ⇔ equal opposite angles."
    ]
  },
  "q-special-triangles": {
    "tricks": [
      "Memorize 3-4-5, 5-12-13, 8-15-17 and scaled versions; spotting triples beats square roots.",
      "In 30-60-90, the shortest side is opposite 30°; do not attach the ratio to the wrong angles.",
      "In 45-45-90, equal legs imply hypotenuse leg√2.",
      "No trigonometry is required; reduce to Pythagorean theorem or special-triangle ratios."
    ],
    "formulas": [
      "Right triangle: a²+b²=c²",
      "45-45-90 sides = 1:1:√2",
      "30-60-90 sides opposite 30°,60°,90° = 1:√3:2",
      "Common triples: 3-4-5, 5-12-13, 8-15-17."
    ]
  },
  "q-polygons": {
    "tricks": [
      "Exterior-angle sum is always 360° for a convex polygon—often faster than interior-angle formulas.",
      "For a regular polygon, one exterior angle immediately gives n=360/exterior.",
      "Remember hierarchy: square is both rectangle and rhombus; rectangle/rhombus are parallelograms.",
      "Diagonal properties differ by quadrilateral; do not assume rectangle diagonals are perpendicular or rhombus diagonals equal."
    ],
    "formulas": [
      "Interior sum=(n−2)180°",
      "Regular interior angle=[(n−2)180°]/n",
      "Sum of exterior angles=360°",
      "Trapezoid area=½(b1+b2)h."
    ]
  },
  "q-circles": {
    "tricks": [
      "Convert arc/sector questions to “fraction of 360°” before calculating.",
      "Radius is perpendicular to tangent at the point of tangency.",
      "Doubling radius doubles circumference but quadruples area.",
      "If a chord passes through the center, it is a diameter; diameter subtends a right angle in many standard circle setups."
    ],
    "formulas": [
      "C=2πr=πd",
      "A=πr²",
      "Arc length=(θ/360°)·2πr",
      "Sector area=(θ/360°)·πr²."
    ]
  },
  "q-similarity": {
    "tricks": [
      "For similar figures, find the linear scale factor first; then square/cube it for area/volume.",
      "Area ratio is not side ratio: take square roots to recover linear ratio.",
      "Congruent means same size and shape; similar means same shape with proportional dimensions.",
      "Use corresponding-angle labels carefully; one mismatched correspondence ruins every ratio."
    ],
    "formulas": [
      "Linear scale=k ⇒ perimeter scale=k",
      "Linear scale=k ⇒ area scale=k²",
      "Linear scale=k ⇒ volume scale=k³",
      "If area ratio=A1:A2, linear ratio=√A1:√A2 for similar figures."
    ]
  },
  "q-area": {
    "tricks": [
      "Decompose composite figures into rectangles/triangles/circles or subtract holes from a larger shape.",
      "Perimeter counts only the outside boundary; shared interior edges disappear.",
      "Equal perimeter does not imply equal area—QC loves this.",
      "When dimensions scale, use k² for area instead of recomputing every piece."
    ],
    "formulas": [
      "Rectangle A=lw; P=2l+2w",
      "Square A=s²; P=4s",
      "Triangle A=½bh",
      "Parallelogram A=bh; trapezoid A=½(b1+b2)h."
    ]
  },
  "q-solids": {
    "tricks": [
      "Visualize dimensions and label units; volume uses cubic units, surface area square units.",
      "Scale-factor trick: if all lengths multiply by k, surface area ×k² and volume ×k³.",
      "For open-top/open-bottom solids, remove the missing face from surface-area formulas.",
      "For box diagonals, apply Pythagorean theorem twice or use the 3D diagonal formula."
    ],
    "formulas": [
      "Rectangular solid V=lwh",
      "Rectangular solid SA=2(lw+lh+wh)",
      "Space diagonal=√(l²+w²+h²)",
      "Cylinder V=πr²h; total SA=2πr²+2πrh."
    ]
  },
  "q-mean": {
    "tricks": [
      "Convert a mean to a total immediately: sum=mean×count. Combined-average problems then become bookkeeping.",
      "Weighted averages must weight by group size; never average averages blindly.",
      "If one observation changes by d among n values, the mean changes by d/n.",
      "Average speed is a rate problem, not automatically an arithmetic-mean problem."
    ],
    "formulas": [
      "mean=Σx/n",
      "sum=mean×count",
      "weighted mean=Σ(w_i x_i)/Σw_i",
      "If one value changes by d in n observations, new mean=old mean+d/n."
    ]
  },
  "q-median": {
    "tricks": [
      "Sort first—always. Median is positional, not based on the magnitude of all values.",
      "With even n, median is average of the two middle values.",
      "Outliers can drag the mean dramatically while leaving the median almost unchanged.",
      "Range depends only on min/max; changes to interior values do nothing to range."
    ],
    "formulas": [
      "Odd n: median = value at position (n+1)/2 after sorting",
      "Even n: median = average of positions n/2 and n/2+1",
      "range=max−min",
      "mode=most frequent value(s); a set may have multiple modes."
    ]
  },
  "q-quartiles": {
    "tricks": [
      "Read boxplots by five-number summary: min, Q1, median, Q3, max.",
      "IQR measures the middle 50% and is resistant to extremes.",
      "Percentile means relative position, not percent correct.",
      "When comparing boxplots, separate center (median) from spread (IQR/range)."
    ],
    "formulas": [
      "IQR=Q3−Q1",
      "Q1≈25th percentile; Q2=median≈50th; Q3≈75th",
      "Middle 50% lies from Q1 to Q3",
      "Common outlier rule in many contexts: below Q1−1.5IQR or above Q3+1.5IQR (use only if stated/appropriate)."
    ]
  },
  "q-sd": {
    "tricks": [
      "GRE usually tests what standard deviation does, not long manual computation.",
      "Adding a constant shifts every value and mean but leaves SD unchanged.",
      "Multiplying every value by k multiplies SD by |k|.",
      "SD=0 only when all observations are identical."
    ],
    "formulas": [
      "SD measures spread around the mean",
      "x_i→x_i+c ⇒ mean→mean+c, SD unchanged",
      "x_i→kx_i ⇒ mean→k·mean, SD→|k|·SD",
      "SD=0 ⇔ all data values equal."
    ]
  },
  "q-graphs": {
    "tricks": [
      "Read title, axes, units, legend, and footnotes before touching numbers.",
      "Watch broken axes and nonzero baselines; visual steepness may exaggerate changes.",
      "Distinguish percent change from percentage-point change.",
      "For DI, scan the display once, then fetch only data needed by each question."
    ],
    "formulas": [
      "percent change=(new−old)/old×100%",
      "percentage-point change=new%−old%",
      "part of total=part/total",
      "weighted total=Σ(category value × category weight/count) when applicable."
    ]
  },
  "q-sets": {
    "tricks": [
      "Fill the overlap first in Venn problems, then “only” regions, then neither.",
      "Inclusion-exclusion prevents double-counting.",
      "“At least one” means union; “both” means intersection; “neither” means complement of union.",
      "For three sets, work from the triple overlap outward."
    ],
    "formulas": [
      "n(A∪B)=n(A)+n(B)−n(A∩B)",
      "n(neither)=N−n(A∪B)",
      "P(A∪B)=P(A)+P(B)−P(A∩B)",
      "3-set inclusion-exclusion: Σsingles−Σpair intersections+triple intersection."
    ]
  },
  "q-counting": {
    "tricks": [
      "First ask: does order matter? If yes, permutation; if no, combination.",
      "Use complement counting when “at least one,” “not together,” or forbidden arrangements make direct counting ugly.",
      "Divide out overcounting for repeated objects.",
      "Break multi-stage choices into independent slots and multiply possibilities."
    ],
    "formulas": [
      "Fundamental counting principle: total = product of choices per stage",
      "n! = n(n−1)…1; 0!=1",
      "nP r=n!/(n−r)!",
      "nC r=n!/[r!(n−r)!] and nC r=nC(n−r)."
    ]
  },
  "q-probability": {
    "tricks": [
      "Use complement for “at least one”: 1−P(none).",
      "For OR, add and subtract overlap; for independent AND, multiply.",
      "Without replacement usually creates dependence.",
      "Count the sample space carefully before applying favorable/total; outcomes must be equally likely for that shortcut."
    ],
    "formulas": [
      "P(A)=favorable/total for equally likely outcomes",
      "P(A^c)=1−P(A)",
      "P(A∪B)=P(A)+P(B)−P(A∩B)",
      "If independent: P(A∩B)=P(A)P(B)."
    ]
  },
  "q-conditional": {
    "tricks": [
      "Restrict the universe to the condition first; then compute within that smaller universe.",
      "Tree diagrams make without-replacement sequences easier to audit.",
      "Independence means learning B does not change P(A).",
      "Do not confuse P(A|B) with P(B|A)—the denominator changes."
    ],
    "formulas": [
      "P(A|B)=P(A∩B)/P(B)",
      "P(A∩B)=P(A|B)P(B)",
      "Independence ⇔ P(A|B)=P(A)",
      "Independence ⇔ P(A∩B)=P(A)P(B)."
    ]
  },
  "q-distributions": {
    "tricks": [
      "Expected value is a long-run weighted average, not necessarily a possible outcome.",
      "For symmetric distributions, mean and median often coincide; for a normal distribution mean=median=mode.",
      "Right skew means long tail to the right and typically mean>median; left skew typically mean<median.",
      "Check that probabilities in a discrete distribution sum to 1."
    ],
    "formulas": [
      "E(X)=Σ[x·P(X=x)]",
      "ΣP(X=x)=1",
      "Normal distribution: mean=median=mode",
      "z=(x−μ)/σ gives standardized distance from the mean."
    ]
  },
  "q-qc": {
    "tricks": [
      "Memorize the four answer choices so you never waste time rereading them.",
      "Simplify both quantities before computing exact values; ETS explicitly rewards avoiding unnecessary computation.",
      "For variables, test strategically: negative, 0, fraction, 1, >1, and boundaries when legal.",
      "To prove D, find two legal cases with different outcomes. To prove A/B/equal, show the relationship is fixed for all legal cases."
    ],
    "formulas": [
      "A−B>0 ⇒ A greater; A−B<0 ⇒ B greater; A−B=0 ⇒ equal",
      "If B>0, compare A/B with 1; do not divide by unknown-sign B",
      "QC D proof = two legal cases with different relationships",
      "Always preserve domain restrictions before testing values."
    ]
  },
  "q-estimation": {
    "tricks": [
      "Estimate the sign and order of magnitude before exact arithmetic; this catches calculator-entry mistakes.",
      "Round numbers in a direction that creates useful bounds if choices are close.",
      "If answer choices are far apart, exact computation is often unnecessary.",
      "Use benchmark roots/powers and fractions rather than decimalizing everything."
    ],
    "formulas": [
      "Approximation rule: replace values with nearby easy values, then verify choice separation is large enough",
      "If a<x<b and x positive, then a²<x²<b²",
      "Percent estimate: p% of N ≈ (easy nearby p%)(easy nearby N)",
      "Error check: exact answer should have the predicted sign, units, and magnitude."
    ]
  },
  "q-conventions": {
    "tricks": [
      "Default variables are real numbers unless the problem adds restrictions; never assume integer/positive.",
      "Ordinary geometry figures are not necessarily to scale; coordinate/data graphs are drawn to scale according to ETS conventions.",
      "Nonstandard symbols are defined locally—ignore the symbol’s usual meaning and follow the given definition.",
      "If rounding is not requested in Numeric Entry, prefer an exact answer."
    ],
    "formulas": [
      "Domain default: real numbers unless stated otherwise",
      "Ordinary geometry: trust stated relationships, not visual scale",
      "Coordinate/data displays: read using the provided scale",
      "Numeric Entry: enter exact value unless rounding instructions say otherwise."
    ]
  },
  "q-formats": {
    "tricks": [
      "For “select one or more,” test every option independently; there may be any number of correct answers.",
      "For Numeric Entry, reread units and requested form before typing.",
      "DI sets share a display: scan metadata once and reuse useful calculations.",
      "For QC, the answer-choice meanings never change—know them cold."
    ],
    "formulas": [
      "QC choices: A greater / B greater / equal / cannot determine",
      "Multiple-answer: credit requires the complete correct set",
      "Numeric Entry: exact unless rounding explicitly requested",
      "DI workflow: title → axes/units/legend → question-specific extraction."
    ]
  },
  "q-units": {
    "tricks": [
      "Treat units like algebraic factors and cancel them.",
      "Square/cubic conversions require squaring/cubing the linear conversion factor.",
      "If the final unit is wrong, the setup is wrong even if arithmetic is flawless.",
      "Convert before combining rates; 90 km/h and 20 m/s cannot be compared safely until units match."
    ],
    "formulas": [
      "1 linear unit conversion factor k ⇒ area factor k², volume factor k³",
      "quantity = rate × time carries units automatically",
      "density = mass/volume; productivity = output/time (or output/worker-time)",
      "unit check: multiply/divide dimensions until only the requested unit remains."
    ]
  },
  "q-percent-growth": {
    "tricks": [
      "Use multipliers, not “percent points,” for repeated percent changes.",
      "Reverse percent by division, not by subtracting the same percent from the final value.",
      "Equal percent increase and decrease do not generally cancel.",
      "For subgroup changes, compute from totals unless weights are equal."
    ],
    "formulas": [
      "Increase p%: new=old(1+p/100)",
      "Decrease p%: new=old(1−p/100)",
      "Successive changes: final=initial·∏(1+r_i)",
      "Net percent change=(final/initial−1)×100%."
    ]
  },
  "q-mixtures": {
    "tricks": [
      "Track the amount of pure component, not just total liquid.",
      "Final concentration must lie between source concentrations unless pure solute/solvent outside that range is added.",
      "If a well-mixed solution is removed, the removed portion has the same concentration as the current mixture.",
      "Mixture problems are weighted averages in disguise."
    ],
    "formulas": [
      "pure component = concentration × total amount",
      "final concentration=(c1V1+c2V2)/(V1+V2)",
      "component before + component added − component removed = component after",
      "weighted average concentration=Σ(c_i V_i)/ΣV_i."
    ]
  },
  "q-work-combined": {
    "tricks": [
      "Convert “finishes in t hours” to rate 1/t job per hour immediately.",
      "Combined time must be less than the fastest individual time; use this as a sanity check.",
      "If workers join/leave, break the timeline into stages and track fraction of job completed.",
      "For productivity, separate number of workers, hours, and rate per worker."
    ],
    "formulas": [
      "Individual rate=1/t",
      "Combined rate=Σ(1/t_i)",
      "Combined time T=1/[Σ(1/t_i)]",
      "work completed=rate×time; remaining work=1−completed fraction."
    ]
  },
  "q-scatter": {
    "tricks": [
      "Direction, strength, form, and outliers are separate features—name all four mentally.",
      "Correlation does not prove causation; always consider lurking variables and reverse causality.",
      "A nonlinear relationship can be strong even if a straight-line trend is weak.",
      "One extreme point can change apparent correlation; inspect the cloud and outliers separately."
    ],
    "formulas": [
      "Positive association: larger x tends to pair with larger y",
      "Negative association: larger x tends to pair with smaller y",
      "Correlation measures association, not causation",
      "No numerical r formula is normally needed; interpret direction/strength from the plot unless data are supplied."
    ]
  },
  "q-frequency": {
    "tricks": [
      "Distinguish histogram (quantitative bins) from bar chart (categories).",
      "Relative frequency is count divided by total; convert to percent only at the end if needed.",
      "For cumulative frequency, add all bins up to the requested boundary.",
      "Skew is named for the long tail, not the side with the tallest bar."
    ],
    "formulas": [
      "relative frequency=bin count/total count",
      "percentage frequency=relative frequency×100%",
      "cumulative frequency at boundary = sum of included bin counts",
      "All frequencies sum to total n; all relative frequencies sum to 1."
    ]
  },
  "q-normal": {
    "tricks": [
      "Use symmetry: 50% is below the mean and 50% above.",
      "Convert to z-score to compare positions across distributions with different means/SDs.",
      "Use the 68-95-99.7 rule only when the distribution is stated/treated as normal and approximation is appropriate.",
      "A larger SD makes the curve wider, not “higher scores.”"
    ],
    "formulas": [
      "z=(x−μ)/σ",
      "Normal: mean=median=mode",
      "≈68% within μ±1σ",
      "≈95% within μ±2σ; ≈99.7% within μ±3σ."
    ]
  },
  "q-di-hard": {
    "tricks": [
      "Write the denominator before computing any percent; hard DI questions often hide denominator changes.",
      "Annotate units/magnitudes (thousands, millions, percent) once at the top of scratchwork.",
      "Do not over-study the graph. Scan, answer, and return only to the data each question needs.",
      "Reuse computed totals/ratios across a set, but do not let one difficult item consume the entire set."
    ],
    "formulas": [
      "percent of total=part/total×100%",
      "percent change=(new−old)/old×100%",
      "weighted average=Σ(wx)/Σw",
      "ratio A:B=A/B; preserve units and scale factors from axes/legends."
    ]
  },
  "q-qc-adversarial": {
    "tricks": [
      "Build a standard test-value checklist: negative, 0, fraction, 1, >1, boundary; prune illegal values first.",
      "Try to break a proposed fixed relationship rather than prove it by random examples.",
      "If algebra reveals a factor with unknown sign, stop and case-split instead of cancelling/ordering blindly.",
      "Use extreme values when a relationship depends on growth rates (x vs x², linear vs reciprocal, etc.)."
    ],
    "formulas": [
      "D answer criterion: ∃ legal cases with different A/B/equal outcomes",
      "Compare A−B sign whenever possible",
      "If dividing by expression E, first determine sign(E)",
      "Critical regions usually split at zeros, 1/−1, roots, denominator zeros, and domain endpoints."
    ]
  },
  "q-scaling": {
    "tricks": [
      "Find the linear scale factor once, then use powers instead of recomputing formulas.",
      "If area ratio is given, square-root it to get side ratio; if volume ratio is given, cube-root it.",
      "Perimeter is linear, area quadratic, volume cubic.",
      "Percentage increase in dimension produces a much larger percentage change in area/volume; use multipliers."
    ],
    "formulas": [
      "length factor=k",
      "perimeter factor=k",
      "area/surface-area factor=k²",
      "volume factor=k³."
    ]
  },
  "q-integer-constraints": {
    "tricks": [
      "When variables are integers, stop treating the solution set as continuous.",
      "Factor-pair enumeration is powerful for xy=N and transformed products like (x−a)(y−b)=N.",
      "Use parity/modular constraints to eliminate cases before solving.",
      "Positive-integer bounds often make only a handful of legal values; list them."
    ],
    "formulas": [
      "xy=N with positive integers ⇒ x must be a positive divisor of N",
      "even=2k; odd=2k+1",
      "n≡r (mod d) encodes remainder restrictions",
      "For integer x with a<x<b, legal values are the integers strictly between the bounds."
    ]
  },
  "v-logic": {
    "tricks": [
      "Predict the blank before looking at choices; even a crude “positive/negative/contrast” prediction blocks vocabulary anchoring.",
      "Circle logical pivots: although/yet = turn; moreover/indeed = continuation; therefore = result; because = reason.",
      "Use punctuation as logic: colon often explains; semicolon links complete thoughts; dash may restate or qualify.",
      "When stuck, replace the blank with “good/bad/same/opposite/cause/result” before demanding a precise word."
    ],
    "formulas": [
      "Contrast formula: A, but B ⇒ B resists/qualifies A",
      "Continuation formula: A; moreover B ⇒ B reinforces A",
      "Cause formula: because X, Y ⇒ X is reason/evidence for Y",
      "Prediction workflow: logic → rough meaning → choices → coherence check."
    ]
  },
  "v-tc": {
    "tricks": [
      "Solve the most constrained blank first; ETS explicitly says you need not go left-to-right.",
      "Do not brute-force combinations. Build local predictions, then verify global coherence.",
      "If no choice fits a later blank, revisit the earlier selection instead of forcing it.",
      "After filling all blanks, reread the entire passage for logical, grammatical, and stylistic coherence."
    ],
    "formulas": [
      "TC algorithm: read whole → mark signals → predict → solve anchor blank → propagate → reread",
      "Contrast blank ≈ semantic opposite of the contrasted clue (adjust for nuance)",
      "Cause/result blank must preserve direction of causality",
      "Multi-blank credit = all blanks correct; no partial credit."
    ]
  },
  "v-se": {
    "tricks": [
      "Do not simply hunt synonyms; ETS warns that synonym pairs can be wrong in context.",
      "First predict the sentence meaning, then identify candidates, then pair by equivalent completed meaning.",
      "An attractive word with no valid partner is often an “orphan” signaling a wrong interpretation.",
      "Check both grammar and connotation; two close meanings may differ in tone/intensity enough to fail."
    ],
    "formulas": [
      "SE condition 1: each chosen word makes a coherent sentence",
      "SE condition 2: the two completed sentences have equivalent overall meaning",
      "SE workflow: predict → individual fit → pair equivalence → reread",
      "Credit requires both correct choices; no partial credit."
    ]
  },
  "v-rc-map": {
    "tricks": [
      "After each paragraph, write a 3–6 word role label, not a content summary.",
      "Track viewpoints separately: author, old theory, critic, new study. Most hard traps are attribution errors.",
      "Do not memorize details; know where they live and why they were introduced.",
      "Signal words are architecture: however=turn, for example=illustration, therefore=conclusion, admittedly=concession."
    ],
    "formulas": [
      "Passage map = P1 role → P2 role → P3 role …",
      "Common arc: old view → problem/evidence → revised view",
      "Common argument arc: claim → evidence → objection → response",
      "Question rule: answer from mapped role + exact supporting lines, not memory of topic."
    ]
  },
  "v-main": {
    "tricks": [
      "Separate topic (“what it discusses”) from thesis (“what it says about the topic”).",
      "Wrong main-idea answers are often too broad, too narrow, or too strong.",
      "For primary purpose, use a verb: challenge, explain, compare, qualify, reconcile, advocate.",
      "If an answer describes only one paragraph/example, it is usually too narrow."
    ],
    "formulas": [
      "Main idea ≈ central claim + appropriate scope",
      "Primary purpose = rhetorical verb + object (e.g., “challenge X by presenting Y”)",
      "Good summary preserves author stance + passage scope",
      "Trap test: if choice could describe only one paragraph, reject for whole-passage questions."
    ]
  },
  "v-detail": {
    "tricks": [
      "Return to the cited region; do not answer detail questions from memory.",
      "Function questions ask “why is this here?” not “what does this sentence say?”",
      "For select-in-passage, match the requested function exactly, not merely a sentence on the right topic.",
      "Paraphrase before comparing choices; copied passage words can be bait."
    ],
    "formulas": [
      "Detail answer = textually supported paraphrase",
      "Function answer = local content + relation to surrounding argument",
      "Example usually supports/illustrates a nearby generalization",
      "Select-in-passage: requested role → locate sentence performing that role."
    ]
  },
  "v-inference": {
    "tricks": [
      "Prefer the smallest claim the passage forces; GRE inference rewards calibrated certainty.",
      "Quantifier audit every answer: some≠most≠all; may≠must.",
      "Counterexample test: if you can imagine a scenario consistent with the passage where the choice is false, it may be too strong.",
      "Outside knowledge is irrelevant unless the passage supplies it."
    ],
    "formulas": [
      "Inference = passage facts + valid logical consequence, no outside premise",
      "“Some A are B” ⇒ at least one A is B; not “most/all”",
      "“May/can” supports possibility, not necessity",
      "Best-answer formula: support strength ≥ answer certainty."
    ]
  },
  "v-tone": {
    "tricks": [
      "Tone on GRE is usually restrained: skeptical, qualified, appreciative, critical, ambivalent—not cartoonishly emotional.",
      "Watch attribution verbs and evaluative adjectives; “claims” vs “demonstrates” encodes stance.",
      "One concession can downgrade “enthusiastic” to “qualified approval.”",
      "Choose the adjective matching both direction and intensity."
    ],
    "formulas": [
      "Tone = valence (positive/negative/neutral) + intensity + certainty",
      "Praise + reservation ⇒ qualified approval",
      "“Suggests/may” + criticism ⇒ cautious skepticism, not rejection",
      "Author stance ≠ stance of quoted/cited speaker."
    ]
  },
  "v-cr": {
    "tricks": [
      "Always isolate conclusion, evidence, and the gap between them.",
      "For causation, check reverse causation, confounding, selection bias, and timing.",
      "An answer strengthens/weakens only if it changes confidence in the conclusion, not merely discusses the topic.",
      "Use the negation test for necessary assumptions."
    ],
    "formulas": [
      "Argument = premises + assumption(s) ⇒ conclusion",
      "Necessary assumption test: negate candidate; if argument collapses, candidate is required",
      "Causal gap checklist: correlation ≠ causation; rule out reverse cause/confounders",
      "Strengthen/weakening power ∝ how directly the choice targets the gap."
    ]
  },
  "v-longrc": {
    "tricks": [
      "Use a paragraph ledger; do not reread the entire passage for every question.",
      "For names/theories, create a tiny viewpoint matrix so claims do not get swapped.",
      "Resolve pronouns like “this view” by replacing them with the full antecedent.",
      "Spend reading time on structure and turns; retrieve details only when asked."
    ],
    "formulas": [
      "Ledger: P# → role → viewpoint → key turn",
      "Viewpoint matrix: speaker | claim | evidence | author attitude",
      "Reference chain: pronoun/demonstrative → exact antecedent proposition",
      "Long-RC workflow: map once → question → return to proof lines."
    ]
  },
  "v-vocab-strategy": {
    "tricks": [
      "Learn words in semantic families, not isolated alphabetic lists; SE rewards relationships.",
      "For each word store meaning, tone, one synonym, one contrast/antonym, and one natural sentence.",
      "Active recall beats rereading: hide the definition and retrieve it before checking.",
      "Prioritize high-frequency words, then add unknowns from practice; giant unranked lists have poor return on time."
    ],
    "formulas": [
      "Word memory = meaning + connotation + synonym family + contrast + example",
      "SRS rule: successful recall ⇒ longer interval; failed recall ⇒ shorter interval",
      "SE utility = knowing relationships, not just dictionary glosses",
      "Unknown-word strategy: sentence logic + morphology + elimination, then verify later."
    ]
  },
  "v-elimination": {
    "tricks": [
      "Name the exact flaw in a wrong answer: scope, certainty, viewpoint, reversal, irrelevant truth, half-right, outside knowledge.",
      "At 50/50, state the difference between the choices in your own words and find the smallest text that decides it.",
      "One wrong word invalidates the whole answer.",
      "Do not reward choices for repeating passage vocabulary; test logic, not lexical overlap."
    ],
    "formulas": [
      "Answer validity = every material word supported",
      "Trap taxonomy: too broad / too narrow / too strong / reversed / wrong speaker / irrelevant",
      "50/50 rule: identify distinguishing claim → locate deciding evidence",
      "Elimination > attraction: reject provable flaws before choosing “best sounding.”"
    ]
  },
  "v-morphology": {
    "tricks": [
      "Use roots/prefixes as probability clues, never as proof; modern meaning can drift.",
      "Grammar suffixes can eliminate choices even if the exact definition is unknown.",
      "Combine morphology with sentence valence: a “bad” root in a positive blank should trigger suspicion.",
      "Learn families (equivocal/equivocate/equivocation) to multiply vocabulary coverage."
    ],
    "formulas": [
      "Morphology hypothesis = prefix + root + suffix",
      "Final meaning = morphology hypothesis checked against context",
      "Common polarity roots: bene/eu≈good; mal/dys≈bad",
      "Grammar clue: -ity/-ness noun; -ous/-ive/-al adjective; -ize/-ify verb (not absolute rules)."
    ]
  },
  "v-rc-formats": {
    "tricks": [
      "For multi-answer RC, evaluate each option independently as true/false; do not assume a fixed number of answers.",
      "No partial credit: selecting one extra wrong option loses the item.",
      "For select-in-passage, translate the prompt into a rhetorical role before scanning.",
      "Single-answer still follows the same proof standard: every part must be licensed by the passage."
    ],
    "formulas": [
      "Multi-answer credit = all correct + no incorrect",
      "Select-in-passage: requested function → sentence performing function",
      "RC proof rule: passage support only; no specialized outside knowledge",
      "Choice audit: scope + speaker + certainty + relationship must all match."
    ]
  },
  "v-syntax-spine": {
    "tricks": [
      "Bracket interrupting modifiers and find the independent clause first.",
      "Ask “who/what does what?” before interpreting qualifications.",
      "Long noun phrases can hide the real subject; locate the main finite verb.",
      "After finding the spine, add modifiers back one at a time and label concession/cause/definition/etc."
    ],
    "formulas": [
      "Sentence spine = subject + main verb + object/complement",
      "Although X, Y ⇒ X is concession; Y is main assertion",
      "Because X, Y ⇒ X reason; Y result/main claim",
      "Relative clause (“which/that/who…”) modifies a specific noun phrase; attach it explicitly."
    ]
  },
  "v-reference": {
    "tricks": [
      "Replace pronouns with candidate antecedents and reread; grammar + meaning should both work.",
      "“This result/view/claim” often summarizes an entire previous proposition, not the nearest noun.",
      "Watch “former/latter” and plural/singular agreement.",
      "Modifier attachment can change the argument; identify exactly which noun a relative clause describes."
    ],
    "formulas": [
      "Pronoun resolution = number/gender/grammar match + semantic coherence",
      "“This + noun” = previous idea recategorized by that noun",
      "Relative clause attachment: noun phrase + who/which/that clause",
      "Reference-chain check: substitute full antecedent into sentence and verify meaning."
    ]
  },
  "v-connectors": {
    "tricks": [
      "Build a mental polarity map of connectors; recognize them instantly rather than translating during the test.",
      "“Although” does not mean exact opposite; it signals a concession/qualification relationship.",
      "Cause/result connectors reveal direction—do not reverse evidence and conclusion.",
      "Restatement markers (“in other words,” colon) can give a near-definition of a blank."
    ],
    "formulas": [
      "Contrast: although/however/yet/nevertheless ⇒ turn",
      "Continuation: moreover/indeed/likewise ⇒ same direction",
      "Cause→result: because X, Y / X; therefore Y",
      "Example/restatement: for example/specifically/in other words/colon ⇒ explanation or illustration."
    ]
  },
  "v-scope": {
    "tricks": [
      "Circle quantifiers and modal verbs; many hard RC questions hinge on one small scope word.",
      "Downshift extreme answers unless the text is equally extreme.",
      "“At least” gives a lower bound; “at most” an upper bound; “not necessarily” only denies necessity.",
      "Preserve population/time frame: findings about one subgroup do not automatically generalize."
    ],
    "formulas": [
      "some < many < most < all (logical strength generally increases)",
      "may/can = possibility; must/necessarily = requirement",
      "Answer certainty must not exceed passage certainty",
      "Scope match = same subject/population + same time frame + same degree."
    ]
  },
  "v-tc-one": {
    "tricks": [
      "Cover choices mentally and write a crude prediction before scanning options.",
      "Use all clues, including grammar, punctuation, tone, and degree—not just one nearby word.",
      "If two choices fit roughly, test connotation/intensity and full-sentence coherence.",
      "Eliminate contradictions and redundancies before choosing the prettiest vocabulary word."
    ],
    "formulas": [
      "One-blank TC = logic clue → prediction → semantic match → full reread",
      "“Far from X” ⇒ blank/claim often contrasts with X",
      "“Because X” ⇒ blank should be causally compatible with X",
      "Correct choice must satisfy logic + grammar + style simultaneously."
    ]
  },
  "v-tc-multi": {
    "tricks": [
      "Start with the anchor blank—the one with clearest local evidence—not necessarily blank 1.",
      "Propagate the meaning of a solved blank through the rest of the passage.",
      "If a later blank becomes impossible, backtrack rather than force a bad word.",
      "Do not test every combination; ETS explicitly warns against it."
    ],
    "formulas": [
      "Multi-TC = identify anchor → solve → constrain others → global coherence check",
      "Each blank has local constraints; the passage has one global meaning",
      "No partial credit: all blanks must be correct",
      "Backtracking rule: no viable choice later ⇒ reconsider earlier anchor."
    ]
  },
  "v-se-pairing": {
    "tricks": [
      "Scan for semantic pairs only after understanding the sentence; pairing is a hypothesis, not a solution.",
      "Each word must independently fit; then the resulting sentences must mean the same thing.",
      "If a fitting word has no partner, look for a different interpretation.",
      "Pay attention to register and valence—near-synonyms can diverge enough to fail."
    ],
    "formulas": [
      "SE = individual fit × pair equivalence",
      "Prediction → candidate set → pair → reread both completed sentences",
      "Correct pair need not be exact dictionary synonyms",
      "Synonym pair alone is insufficient if sentence logic fails."
    ]
  },
  "v-polysemy": {
    "tricks": [
      "Familiar-looking words are dangerous because recognition creates false confidence; actively learn secondary academic senses.",
      "Store two meanings with contrastive example sentences.",
      "Use syntax/object to select the intended sense (“qualify a claim” differs from “qualify for a job”).",
      "Add every missed secondary meaning to a personal trap ledger."
    ],
    "formulas": [
      "Polysemy decision = syntax + collocation + topic + tone",
      "qualify a claim ≈ limit/modify it",
      "disinterested ≈ impartial (not merely bored)",
      "enervate ≈ weaken; ingenuous ≈ frank/naive; belie ≈ contradict/misrepresent."
    ]
  },
  "v-connotation": {
    "tricks": [
      "Build intensity ladders and positive/negative valence labels for synonym families.",
      "GRE choices often share denotation but differ in approval, hostility, formality, or degree.",
      "A rare word is not better; the right word is the one whose tone exactly fits.",
      "When uncertain, eliminate by polarity first, then intensity, then precision."
    ],
    "formulas": [
      "Word fit = denotation + connotation + intensity + register",
      "Positive/negative valence is a first-pass filter",
      "Intensity match: mild clue ↔ mild word; extreme clue ↔ extreme word",
      "SE pair equivalence requires similar completed-sentence tone, not just rough meaning."
    ]
  },
  "v-rhetorical-role": {
    "tricks": [
      "Label sentences by job: claim, evidence, example, objection, concession, rebuttal, definition, implication.",
      "Function is relational: evidence is evidence for a specific claim.",
      "If a sentence begins “for example,” its role is usually illustrative, not the thesis.",
      "For “why mention X?” answer with what X does to the argument."
    ],
    "formulas": [
      "Rhetorical role = local statement + relationship to argument",
      "Claim ← supported by evidence/example",
      "Objection → response/rebuttal is a common two-step structure",
      "Concession formula: admit limited point → preserve/qualify main position."
    ]
  },
  "v-assumption": {
    "tricks": [
      "Negate answer choices to test necessity; if the argument survives comfortably, the choice is not required.",
      "Look for common bridges: sample→population, correlation→cause, past→future, proxy→construct.",
      "An assumption need not prove the conclusion; it only needs to be required by the reasoning.",
      "Do not choose a statement merely because it would strengthen the argument if it is not necessary."
    ],
    "formulas": [
      "Premises + necessary assumption ⇒ conclusion",
      "Negation test: NOT(candidate) destroys argument ⇒ candidate likely necessary",
      "Causal assumption often rules out major alternative explanations",
      "Generalization assumption links sampled group to target population."
    ]
  },
  "v-strengthen-weaken": {
    "tricks": [
      "Identify the conclusion and gap before reading options.",
      "For causal arguments, strong weakeners introduce a confounder/reverse cause; strong strengtheners rule those out or verify mechanism.",
      "Ask “If true, why does this change the conclusion’s probability?”",
      "Ignore topical facts that do not touch the reasoning chain."
    ],
    "formulas": [
      "Strengthen: new fact ↑ support for premise/assumption/causal link",
      "Weaken: new fact ↓ support or adds viable alternative explanation",
      "Causal chain: proposed cause → mechanism → effect",
      "Relevance test: choice must move confidence in conclusion, not merely add information."
    ]
  },
  "v-paradox": {
    "tricks": [
      "Accept both facts as true; do not “solve” a paradox by denying one.",
      "State the tension in one sentence before reading choices.",
      "Look for hidden subgroup, denominator, time lag, opposing mechanisms, or definition changes.",
      "Insert each candidate into the story; the correct answer makes the surprise disappear."
    ],
    "formulas": [
      "Paradox form: expectation from A ⇒ X, but observation=not-X",
      "Resolution = missing fact that makes A and not-X compatible",
      "Common mechanisms: subgroup/composition + timing + selection + hidden variable",
      "Correct choice explains both facts simultaneously."
    ]
  },
  "v-rc-inference-hard": {
    "tricks": [
      "Break the passage into small propositions and combine only what their scopes allow.",
      "Use the “could this be false while passage remains true?” test.",
      "Prefer modest answers with exact support over elegant but ambitious claims.",
      "Watch conditional logic: if A→B does not imply B→A."
    ],
    "formulas": [
      "Valid inference = stated facts + valid logical rule",
      "If A→B and A, infer B (modus ponens)",
      "If A→B and not-B, infer not-A (contrapositive)",
      "Do not infer converse: A→B does not imply B→A."
    ]
  },
  "v-science-passages": {
    "tricks": [
      "Treat technical nouns as labels; track relationships, variables, hypotheses, and evidence.",
      "Identify experiment skeleton: hypothesis → prediction → observation → interpretation.",
      "Distinguish association from causation and necessary from sufficient language.",
      "Unknown science knowledge should not be imported; GRE supplies what you need."
    ],
    "formulas": [
      "Science map = phenomenon → hypothesis → evidence → limitation/alternative",
      "Experiment: independent variable → outcome/dependent variable",
      "Association ≠ causation",
      "Necessary vs sufficient: A necessary for B means B→A; A sufficient for B means A→B."
    ]
  },
  "v-humanities-passages": {
    "tricks": [
      "Map schools/scholars and their interpretations separately.",
      "Attribution verbs reveal author distance: “argues/claims” can be neutral or skeptical; “demonstrates” is stronger endorsement.",
      "Humanities RC often asks how new evidence qualifies an old interpretation rather than simply replaces it.",
      "Do not get lost in names/dates; track the interpretive dispute."
    ],
    "formulas": [
      "Humanities map = interpretation A ↔ evidence ↔ interpretation B ↔ author synthesis",
      "Author stance = wording + selection of evidence + concessions",
      "Qualification formula: old view partly valid BUT incomplete under new evidence",
      "Primary purpose often = evaluate/compare/revise an interpretation."
    ]
  },
  "v-social-passages": {
    "tricks": [
      "Identify unit of analysis: individual, firm, city, country, cohort. Cross-level generalization is a classic trap.",
      "Check sample selection and comparison groups when studies are discussed.",
      "Separate descriptive (“what”), causal (“why”), and normative (“should”) claims.",
      "Incentives and unintended consequences are common mechanisms in social-science arguments."
    ],
    "formulas": [
      "Observed association = outcome difference; causal claim requires stronger bridge",
      "Sample → population requires representativeness/generalizability",
      "Policy analysis = intended effect + incentives + costs + unintended effects",
      "Descriptive evidence alone does not automatically prove a normative recommendation."
    ]
  },
  "v-reading-lab": {
    "tricks": [
      "Read difficult nonfiction actively: paragraph role, thesis, evidence, qualification, inference.",
      "Close the article and reconstruct the argument; retrieval is the training, not highlighting.",
      "Rotate domains so performance is not dependent on familiarity.",
      "Collect vocabulary in context, but do not turn reading into a dictionary session."
    ],
    "formulas": [
      "20–40 min session: read → map paragraphs → close → reconstruct → verify",
      "Paragraph note = role, not full summary",
      "Post-read recall = thesis + 2–3 supports + strongest qualification + author stance",
      "Vocabulary capture rule: add only words whose meaning/use materially affected comprehension."
    ]
  },
  "v-trap-taxonomy": {
    "tricks": [
      "Classify every wrong answer during review; “I picked B” is not diagnostic.",
      "Most hard traps are controlled distortions: scope, degree, viewpoint, relationship, chronology, or relevance.",
      "Lucky guesses count as errors because the process is unreliable.",
      "For each miss, write the earliest point where a better decision was possible."
    ],
    "formulas": [
      "RC trap classes: broad/narrow/strong/reversed/wrong speaker/irrelevant/half-right",
      "TC/SE traps: wrong direction/wrong degree/right synonym pair but wrong context",
      "Error review = trap label + textual proof + prevention cue",
      "Mastery requires eliminating the same trap correctly on later mixed practice."
    ]
  },
  "a-format": {
    "tricks": [
      "Current GRE AWA is one 30-minute Analyze an Issue task; do not train the old Argument task as if it still appears.",
      "Read both the issue statement and the specific instruction; the instruction controls what your response must do.",
      "No specialist knowledge is required—reasoning quality matters more than factual sophistication.",
      "Plan before drafting and reserve a few minutes for revision, as ETS recommends."
    ],
    "formulas": [
      "30 min = plan + draft + revise",
      "Core score dimensions = task response + analysis/development + organization + language control",
      "Issue response = position + reasons + examples + qualification/counterpressure",
      "No fixed paragraph count or template is required by ETS."
    ]
  },
  "a-task": {
    "tricks": [
      "Underline the task verb: agree/disagree, discuss conditions, explain consequences, evaluate recommendation.",
      "Rephrase the prompt into a question your thesis directly answers.",
      "If the task asks for circumstances, build conditions into the thesis rather than tacking them on at the end.",
      "Avoid generic essays that could fit any instruction."
    ],
    "formulas": [
      "Task compliance formula: thesis must answer the exact instruction",
      "Conditional thesis: Generally X because A/B, except when C",
      "Extent prompt: position + degree + boundary conditions",
      "Recommendation prompt: benefits + assumptions/conditions + costs/alternatives."
    ]
  },
  "a-structure": {
    "tricks": [
      "Each paragraph should have one analytical job; do not mix unrelated reasons.",
      "Start body paragraphs with claims, not historical narration.",
      "After each example, explicitly connect it back to the paragraph claim.",
      "Use counterpressure to sharpen the thesis, not to create a disconnected “other side” paragraph."
    ],
    "formulas": [
      "Intro = interpret issue + thesis + roadmap (optional)",
      "Body = claim → warrant/mechanism → evidence/example → link back",
      "Counter paragraph = strongest objection → concession → boundary/response",
      "Conclusion = synthesize principle + conditions; do not merely repeat sentences."
    ]
  },
  "a-rubric": {
    "tricks": [
      "Score 6 is about insightful, well-developed analysis, not maximum length or rare vocabulary.",
      "Self-grade separate dimensions instead of giving one vague “good/bad” score.",
      "Minor errors can coexist with a high score; persistent clarity-breaking errors are the real danger.",
      "Compare your writing against ETS 5/6 samples and rater commentary, not internet folklore."
    ],
    "formulas": [
      "6-level target ≈ clear insightful position + compelling development + focus/organization + precise fluent language",
      "Development quality > number of examples",
      "Language precision + sentence variety support meaning; they are not decoration",
      "Rubric audit: task | thesis | reasoning | examples | organization | language | mechanics."
    ]
  },
  "a-timing": {
    "tricks": [
      "Do not spend 10 minutes planning a perfect outline; plan enough to prevent drift, then draft.",
      "If behind schedule, compress examples rather than abandoning a conclusion/revision entirely.",
      "Use a fixed time checkpoint so you know when to leave the introduction/body and move on.",
      "Revision priority: logic/clarity first, then grammar/mechanics, then style."
    ],
    "formulas": [
      "Useful default: 4–5 min plan + 21–23 min draft + 2–4 min revise",
      "Planning skeleton = thesis + 2–3 claims + examples + counterpoint",
      "Revision order = argument coherence → sentence clarity → grammar/spelling",
      "Time rule: stop expanding a paragraph when it threatens completion of the essay."
    ]
  },
  "a-reasoning": {
    "tricks": [
      "Ask “why?” twice after every claim; the missing second answer is often the warrant.",
      "Explain mechanisms—how incentives, information, institutions, behavior, or constraints produce the claimed outcome.",
      "Do not treat correlation/anecdote as proof of causation without qualification.",
      "Use “This matters because…” after examples to force the analytical link."
    ],
    "formulas": [
      "Paragraph logic = claim → warrant/mechanism → evidence → implication",
      "Causal argument = cause → mechanism → effect + alternative-explanation check",
      "Example value = relevance × explanation depth",
      "Qualified claim = general rule + stated boundary/exception."
    ]
  },
  "a-counter": {
    "tricks": [
      "Steelman the strongest reasonable objection; weak straw men add words but no sophistication.",
      "Concede only what is justified, then explain how it changes the scope/weight of your thesis.",
      "Use counterarguments to introduce conditions, tradeoffs, or exceptions.",
      "If the objection fully destroys your thesis, revise the thesis instead of pretending it does not."
    ],
    "formulas": [
      "Counter formula = objection → why plausible → limitation/condition → response",
      "Concession language: “This concern is strongest when…”",
      "Nuance formula: X generally holds under A/B; Y dominates under C",
      "Weighting formula: compare magnitude + likelihood + reversibility of competing consequences."
    ]
  },
  "a-examples": {
    "tricks": [
      "Specificity should serve analysis; do not waste time on dates/names that do not matter.",
      "Hypothetical examples are valid if they clearly illustrate the mechanism.",
      "Use examples from domains you understand well so factual uncertainty does not derail you.",
      "One deeply developed example can outperform several name-drops."
    ],
    "formulas": [
      "Example = context → action/condition → mechanism → consequence → thesis link",
      "Example test: remove it; if the paragraph reasoning does not weaken, it was decorative",
      "Contrastive example = case where rule works + case where condition changes outcome",
      "Accuracy rule: uncertain detail → generalize rather than invent precision."
    ]
  },
  "a-style": {
    "tricks": [
      "Prefer precise ordinary words to risky “GRE vocabulary” used unnaturally.",
      "Vary sentence length intentionally; complexity without control lowers clarity.",
      "Check pronoun reference, agreement, fragments, run-ons, modifiers, and parallelism.",
      "Use transitions that name logic (however, therefore, for example) rather than decorating every paragraph."
    ],
    "formulas": [
      "Good style = precision + clarity + controlled variety",
      "Parallel list formula: same grammatical form for coordinated items",
      "Pronoun clarity: every pronoun has one obvious antecedent",
      "Transition choice = actual logical relation (contrast/cause/example/concession), not habit."
    ]
  },
  "a-practice": {
    "tricks": [
      "Use three modes: fast outlines, untimed rewrites, and full 30-minute essays.",
      "Review takes as much thinking as writing; annotate claims, warrants, evidence, and weak transitions.",
      "Track recurring process failures (planning, development, grammar), not just word count.",
      "Rewrite one weak paragraph after review to practice the corrected skill immediately."
    ],
    "formulas": [
      "Practice loop = write → rubric audit → isolate weakness → targeted rewrite → timed retest",
      "5-minute outline trains idea generation; untimed rewrite trains quality; 30-min essay trains execution",
      "Error frequency = occurrences of same weakness across essays, not one-off mistake",
      "Improvement metric = stronger development + fewer repeated errors + stable completion under time."
    ]
  },
  "a-nuance": {
    "tricks": [
      "Nuance means a clear rule with meaningful boundaries, not “both sides are right.”",
      "Generate exceptions using scale, stakeholder, time horizon, normal vs emergency conditions, and reversibility.",
      "Put the qualification in the thesis so the essay structure follows naturally.",
      "After conceding an exception, explain whether it narrows or actually strengthens the main principle."
    ],
    "formulas": [
      "Nuanced thesis = general position + because A/B + exception when C",
      "Boundary lens = stakeholder × scale × time horizon × context",
      "Concession ≠ surrender; it changes scope, not necessarily direction",
      "Analytical sophistication = distinctions + mechanisms, not hedging language alone."
    ]
  },
  "a-example-depth": {
    "tricks": [
      "Do not stop at “for example.” Explain the causal/logical bridge from example to claim.",
      "Choose details that reveal incentives, constraints, actions, and outcomes.",
      "Use a contrast case when it helps expose a boundary condition.",
      "If an example consumes too much time, compress background and expand the analytical link."
    ],
    "formulas": [
      "Deep example = context → mechanism → consequence → inference",
      "Link sentence: “This supports the claim because…”",
      "Contrast pair = same principle under condition A vs condition B",
      "Example efficiency = analytical payoff / words spent."
    ]
  },
  "a-revision": {
    "tricks": [
      "First fix any paragraph that contradicts or fails to support the thesis.",
      "Next fix sentences whose grammar obscures meaning; cosmetic edits come last.",
      "Use a personal error checklist built from previous essays.",
      "Do not rewrite whole paragraphs in the final minute; target high-impact defects."
    ],
    "formulas": [
      "3-minute pass: argument → clarity → grammar/mechanics",
      "High-impact edit = changes meaning/coherence or prevents reader confusion",
      "Low-impact edit = synonym polishing with no clarity gain",
      "Personal checklist = top 3 repeated grammar/style errors from prior essays."
    ]
  },
  "a-idea-bank": {
    "tricks": [
      "Use reusable lenses rather than memorized essays: incentives, information, institutions, fairness, innovation, risk, time.",
      "Ask who gains, who pays, who decides, who bears risk, and who lacks information.",
      "Test the claim at individual vs institutional scale and short vs long term.",
      "Build a small bank of examples you understand deeply across education, science, technology, policy, and organizations."
    ],
    "formulas": [
      "Idea lens set = incentives + information + institutions + equity + innovation + risk + time",
      "Stakeholder map = actor → benefit/cost → incentive → power/information",
      "Tradeoff analysis = benefit magnitude/probability vs cost magnitude/probability",
      "Scale check = individual/local rule may not generalize to institution/national level."
    ]
  },
  "s-structure": {
    "tricks": [
      "Know the current section counts/timing before test day so no cognitive effort is spent learning the interface.",
      "AWA is first; Verbal and Quant are section-level adaptive.",
      "Within a section you can skip, mark, review, and change answers while time remains.",
      "All Verbal/Quant questions are worth pursuing; there is no penalty for incorrect answers."
    ],
    "formulas": [
      "AWA: 1 Issue task, 30 min",
      "Verbal: 12Q/18m + 15Q/23m",
      "Quant: 12Q/21m + 15Q/26m",
      "Verbal/Quant scale 130–170; AWA 0–6 in 0.5 increments."
    ]
  },
  "s-timing": {
    "tricks": [
      "Use a two-pass system: secure accessible points first, then return to time sinks.",
      "Average pace is a checkpoint, not a rigid per-question timer; RC passages and DI sets naturally vary.",
      "Never let one “hero question” consume time that could answer multiple easier ones.",
      "With seconds left, fill every unanswered Verbal/Quant item because wrong answers are not penalized."
    ],
    "formulas": [
      "Verbal pace ≈18/12=1.50 min/Q and 23/15≈1.53 min/Q",
      "Quant pace ≈21/12=1.75 min/Q and 26/15≈1.73 min/Q",
      "Time bank = section time − time already spent; compare with questions remaining",
      "Expected-value rule: skip when extra time on one item costs more likely points elsewhere."
    ]
  },
  "s-calculator": {
    "tricks": [
      "Estimate first, then use the calculator for tedious arithmetic—not as a substitute for setup.",
      "Mental math/factoring is usually faster for simple operations.",
      "Avoid calculator decimals when an exact fraction is requested.",
      "If the display is outside your estimated range, assume an input/setup error until checked."
    ],
    "formulas": [
      "Calculator decision: use if computation time saved > entry/checking time",
      "Estimate → calculate → compare to estimate",
      "Exact-answer rule: keep fractions/radicals exact unless decimal/rounding requested",
      "Calculator cannot validate the mathematical model; only arithmetic."
    ]
  },
  "s-review": {
    "tricks": [
      "Mark questions only when a second look is likely to improve the answer; marking half the section creates noise.",
      "Change an answer only with a specific new reason/evidence, not anxiety.",
      "Use the review screen to locate unanswered items first.",
      "If you return to a problem, restart from the key decision point rather than rereading everything."
    ],
    "formulas": [
      "Mark value = probability of improvement × points protected − revisit time cost",
      "Answer-change rule: new evidence/reasoning required",
      "Final scan priority: unanswered > solvable marked > pure rechecks",
      "Review trigger = unresolved setup / 50-50 verbal / calculation needing verification."
    ]
  },
  "s-mocks": {
    "tricks": [
      "Official POWERPREP is calibration material; do not burn all tests before you can learn from them.",
      "Review every miss, lucky guess, and slow correct answer.",
      "Classify errors into concept, reasoning, execution, and time/strategy.",
      "Retest the same failure pattern after delay; logging without retesting is not remediation."
    ],
    "formulas": [
      "Mock loop = simulate → score → classify → repair → delayed retest",
      "Error rate by category = category misses / opportunities",
      "Lucky guess = process error even if score is correct",
      "Review time should often be ≥ test time for high-value diagnostic work."
    ]
  },
  "s-scratch": {
    "tricks": [
      "Write decisions and constraints, not transcripts of the question.",
      "Keep each Quant problem in one visual zone and label the requested quantity.",
      "For QC, record tested cases so you do not forget which relationship occurred.",
      "For RC, use paragraph-role fragments rather than copied sentences."
    ],
    "formulas": [
      "Quant scratch template: givens | restrictions | target | equation/cases | check",
      "QC mini-table: case → A → B → relationship",
      "RC map: P1 role / P2 role / P3 role",
      "Unit/sign check belongs beside the final Quant answer."
    ]
  },
  "s-testday": {
    "tricks": [
      "Rehearse the actual test-day sequence and start time before the final week.",
      "Do not introduce new pacing systems or giant content areas in the last 48 hours.",
      "Recheck current ETS ID/test-center/at-home policies shortly before the exam.",
      "One ugly question is not diagnostic of your score; reset mentally at each section boundary."
    ],
    "formulas": [
      "Final 48h = light retrieval + error rules + sleep/logistics, not marathon learning",
      "Section reset = breathe → clear scratch context → execute familiar pacing plan",
      "No wrong-answer penalty ⇒ answer every Verbal/Quant item",
      "Performance stability = routine + sleep + practiced process, not last-minute volume."
    ]
  },
  "s-adaptive-deep": {
    "tricks": [
      "Do not try to game section difficulty; maximize correct answers.",
      "First-section accuracy matters because it influences second-section difficulty, but that does not justify unlimited time on one item.",
      "A hard-feeling second section is not a score report—keep the same process.",
      "Difficulty guessing is wasted cognition; solve the question in front of you."
    ],
    "formulas": [
      "Adaptation unit = section, not individual question",
      "Objective = maximize correct answers under section time",
      "First-section strategy = accuracy + normal triage, not perfectionism",
      "Second-section difficulty is conditional on first-section performance, but every scored item still matters."
    ]
  },
  "s-error-budget": {
    "tricks": [
      "At 170-level ambitions, process errors matter as much as concept gaps.",
      "Count lucky guesses and excessively slow correct answers as unresolved reliability issues.",
      "Create one observable prevention cue for each recurring error.",
      "Reliability is measured across repeated timed sets, not one successful problem."
    ],
    "formulas": [
      "Accuracy = correct/attempted",
      "Reliable accuracy should be tracked over multiple timed sets, not one sample",
      "Error repair = trigger → replacement behavior → targeted reps → delayed mixed retest",
      "Closed error = prevention behavior succeeds again under time after delay."
    ]
  },
  "s-masterygates": {
    "tricks": [
      "Do not mark a chapter mastered because it feels familiar.",
      "Gate 1: explain without notes; Gate 2: solve representative items; Gate 3: transfer in mixed sets; Gate 4: retain after delay.",
      "Use hard variants and disguised surface forms to test transfer.",
      "If performance collapses under time, the skill is not yet test-ready even if untimed accuracy is high."
    ],
    "formulas": [
      "Mastery = retrieval + execution + transfer + retention",
      "Gate 1 explain → Gate 2 untimed accuracy → Gate 3 mixed recognition → Gate 4 delayed timed retest",
      "Recognition ≠ recall; recall ≠ transfer",
      "Completion click is metadata; timed delayed performance is evidence."
    ]
  },
  "s-final-calibration": {
    "tricks": [
      "Use official simulations to validate pacing, stamina, interface behavior, and score—not to learn brand-new tricks.",
      "Replicate conditions: no pausing, no answer checking, realistic scratch setup, minimal interruptions.",
      "After each mock, change only strategies supported by repeated evidence.",
      "Taper volume in final days while maintaining retrieval and confidence."
    ],
    "formulas": [
      "Calibration = official-like conditions + objective post-test analysis",
      "Best-score gap = target total − best validated total (use trend, not one outlier)",
      "Final-week plan = maintain strengths + repair top recurrent errors + protect sleep",
      "Strategy change threshold = repeated pattern across multiple sets, not one emotional result."
    ]
  }
};

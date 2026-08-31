window.GRE_DEEP_CONTENT = {
  "q-number-line": [
    "Partition the real number line before comparing expressions. The GRE repeatedly changes behavior at 0, 1, −1, endpoints, and denominator zeros; a 170-level solver actively identifies those critical regions instead of testing random numbers.",
    "Absolute value is distance, so |a−b| is the distance between a and b and |x−c|<r describes an interval centered at c. Recasting an algebraic-looking condition geometrically often removes casework.",
    "Inequality language must become notation immediately: at least ≥, at most ≤, no more than ≤, no less than ≥, between may or may not include endpoints depending on wording. Do not let conversational English blur endpoint rules.",
    "Reciprocal order depends on sign. For positive a>b, 1/a<1/b; across zero the comparison changes completely. Never take reciprocals in an inequality without controlling the sign/domain.",
    "Squaring preserves order only under restrictions. If 0≤a<b then a²<b², but with unrestricted reals magnitude matters; −10<2 while 100>4. QC uses this constantly.",
    "Use interval notation mentally even if the GRE never asks you to write it. A condition such as x≤−2 or x>4 should become two regions you can test independently, not one vague statement."
  ],
  "q-integers": [
    "Parity is algebra: write even integers as 2k and odd integers as 2k+1 when a verbal parity claim becomes complicated. This proves results and prevents relying on a few examples.",
    "Zero is an even integer but is neither positive nor negative. One is neither prime nor composite. These boundary facts are common sources of otherwise avoidable perfect-score misses.",
    "For products, one even factor forces an even product; an odd product forces every integer factor to be odd. For sums, track parity rather than values when the question only asks even/odd.",
    "Consecutive integers are n,n+1,…; consecutive evens/odds differ by 2. Products of consecutive integers contain predictable divisibility—for example n(n+1) is always even and n(n+1)(n+2) is divisible by 6.",
    "Sign logic and parity often combine. An even exponent erases the sign of a nonzero base; an odd exponent preserves it. Parentheses matter: (−3)^2=9 whereas −3^2=−9.",
    "When variables are restricted to integers, exploit discreteness. An interval such as 2<x<5 contains only 3 and 4 if x is an integer; that can turn an indeterminate-looking QC into a fixed result."
  ],
  "q-factors": [
    "Prime factorization is the universal representation for divisibility questions. Convert numbers into prime powers when GCF, LCM, divisor count, perfect squares/cubes, or divisibility constraints appear.",
    "For positive integers, GCF takes minimum prime exponents and LCM takes maximum exponents. The identity gcd(a,b)×lcm(a,b)=ab is a fast consistency check and sometimes the entire solution.",
    "If n=p^a q^b r^c, the number of positive divisors is (a+1)(b+1)(c+1). A divisor is a perfect square only when every chosen prime exponent is even, which enables harder counting variants.",
    "Divisibility tests worth instantaneous recall: 2 last digit even; 3/9 digit sum; 4 last two digits; 5 last digit 0/5; 6 divisible by 2 and 3; 8 last three digits; 10 last digit 0; 11 alternating digit sum test.",
    "Perfect square prime factorizations have only even exponents; perfect cubes have exponents divisible by 3. If a number must be multiplied by the smallest integer to become a square/cube, repair the deficient exponents.",
    "“Factor” can mean positive divisor unless signs are explicitly relevant. Read wording carefully: GRE number-property problems usually mean positive factors when counting factors, but algebraic factorization is different."
  ],
  "q-remainders": [
    "Use the division algorithm n=dq+r with 0≤r<d. The remainder is constrained by the divisor; a proposed remainder equal to or larger than the divisor is impossible.",
    "Translate “leaves remainder r when divided by d” into n=dk+r or n≡r (mod d). This makes sums, products, and polynomial expressions manageable without finding n itself.",
    "Remainders add and multiply cleanly: if a≡r and b≡s mod d, then a+b≡r+s and ab≡rs mod d, followed by reduction into 0,…,d−1.",
    "Last-digit questions are remainder questions mod 10. Powers of most last digits cycle; find the cycle length and reduce the exponent rather than computing a giant power.",
    "For simultaneous remainder conditions, listing a short arithmetic progression is often fastest on the GRE. Start with numbers satisfying the stricter condition and test the second condition.",
    "Negative numbers still use the standard nonnegative remainder convention on GRE-style arithmetic. For example −1 divided by 5 has remainder 4 because −1=5(−1)+4."
  ],
  "q-fractions": [
    "Fractions represent both numbers and ratios. Before operating, decide whether the task is addition/subtraction (common denominator) or multiplication/division (factor and cancel); mixing these procedures causes needless arithmetic.",
    "Cancel factors, never terms: (x²−9)/(x−3) can cancel after factoring to (x−3)(x+3)/(x−3), but (x+3)/x does not allow the x terms to cancel.",
    "Know benchmark fractions and decimals cold: 1/2=.5, 1/3≈.333, 2/3≈.667, 1/4=.25, 3/4=.75, 1/5=.2, 1/8=.125, 1/10=.1. They speed estimation and DI.",
    "To compare positive fractions a/b and c/d, cross-multiply ad and bc. If signs or variable denominators are unknown, first establish denominator signs before using cross-products in inequalities.",
    "A complex fraction becomes ordinary by multiplying numerator and denominator by a common denominator of the smaller fractions. Do structure first; do not turn every term into a decimal.",
    "Percent is simply a fraction over 100, so move fluently among fraction, decimal, and percent forms. The GRE often disguises the same relationship in different formats across stem and choices."
  ],
  "q-ratio": [
    "A ratio a:b is part-to-part, not automatically a part of the whole. If red:blue=3:5, red is 3/8 of the total; this distinction is a frequent word-problem trap.",
    "Ratios determine relative scale, not absolute amounts. Introduce a multiplier k: quantities are ak and bk. A total, difference, or one actual value then determines k.",
    "Proportions encode equal ratios: a/b=c/d implies ad=bc for nonzero denominators. Keep units aligned—miles per hour cannot be equated to hours per mile without reciprocation.",
    "Direct variation y=kx preserves y/x; inverse variation y=k/x preserves xy. Identify which product or quotient stays constant before plugging numbers.",
    "Compound ratios can be chained by matching a shared term. If A:B=2:3 and B:C=4:5, rescale the B parts to a common value before combining.",
    "Weighted composition and mixture questions are ratio problems in disguise. Always track the actual amount of the component, then divide by total amount at the end."
  ],
  "q-rates": [
    "Rate problems live on the identity quantity=rate×time. Write units beside every quantity until the setup is complete; dimensional cancellation exposes inverted rates instantly.",
    "Average speed is total distance/total time, not the arithmetic mean of speeds unless the times are equal. For equal distances at speeds a and b, the harmonic-mean form 2ab/(a+b) is useful but derivable.",
    "Relative speed: moving toward each other adds speeds; moving in the same direction subtracts speeds. Distance closed = relative speed × time.",
    "Round trips usually have equal distances but unequal times. Build a small distance/rate/time table rather than averaging the outbound and inbound speeds.",
    "Conversion is part of the problem, not clerical detail: 60 mph is 1 mile/minute, 1 m/s=3.6 km/h, and square/cubic unit conversions require powers.",
    "When a rate changes midway, split the trip into stages and sum distances/times. Do not apply one average rate until you have total quantity and total time."
  ],
  "q-exponents": [
    "Exponent laws apply to products of the same base, not sums: a^m·a^n=a^(m+n), but a^m+a^n does not combine that way. Preserve structure.",
    "Negative exponents mean reciprocals; zero exponent is 1 for nonzero base. These rules are often tested through simplification rather than direct recall.",
    "Fractional exponents translate roots: a^(m/n)=(nth root of a)^m when real-defined. Convert to whichever form makes comparison or simplification clearer.",
    "Principal square roots are nonnegative, so √(x²)=|x|. This is one of the most important GRE algebra traps because dropping the absolute value silently assumes x≥0.",
    "For bases greater than 1, larger exponent means larger value; for 0<base<1, larger positive exponent means smaller value. Negative bases require parity control.",
    "Compare large powers by rewriting to a common base or common exponent. 8^4 vs 4^6 is easier as 2^12 vs 2^12 than by calculating either number."
  ],
  "q-absolute": [
    "Absolute value is distance from zero; |x−a| is distance from a. Distance thinking is usually faster and less error-prone than memorized case rules.",
    "|x−a|=d with d≥0 gives two points a±d; if d<0 there is no real solution. |expression|=0 forces the inside expression to zero.",
    "|x−a|<d describes values within d of a: a−d<x<a+d. The ≤ version includes endpoints.",
    "|x−a|>d describes values farther than d from a: x<a−d or x>a+d. The outside region is an OR, not an AND.",
    "For expressions such as |x|=x, recognize the hidden condition x≥0; |x|=−x corresponds to x≤0. QC frequently packages sign information this way.",
    "The triangle inequality |a+b|≤|a|+|b| and reverse intuition can help comparisons, but only use advanced identities when they genuinely simplify the GRE item."
  ],
  "q-sequences": [
    "First determine what kind of pattern is justified. Constant first differences imply arithmetic; constant ratios imply geometric; otherwise inspect second differences, alternation, cycles, or recursion.",
    "Arithmetic nth term: a_n=a_1+(n−1)d. Arithmetic sum: n(first+last)/2. Check whether indexing starts at 1 before substituting.",
    "Geometric nth term: a_n=a_1 r^(n−1). A finite geometric sum is a_1(1−r^n)/(1−r) for r≠1, but many GRE questions can be solved by listing a few terms instead.",
    "Recursive definitions require respecting starting values. Generate only as many terms as needed; do not hunt for a closed form unless the question benefits.",
    "Alternating sign or remainder cycles often have short periods. Use the requested index modulo the cycle length to avoid writing dozens of terms.",
    "Sequence averages can collapse: the average of equally spaced arithmetic terms is the midpoint of first and last, and symmetric pairs have the same sum."
  ],
  "q-expressions": [
    "Treat expressions structurally before substituting numbers. Factor common terms, group, use identities, and look for repeated subexpressions; GRE algebra is often a recognition test.",
    "Core identities: a²−b²=(a−b)(a+b); (a±b)²=a²±2ab+b². Recognizing them can turn multi-line arithmetic into one cancellation.",
    "Rational expressions carry domain restrictions from the original denominator. Even if algebraic cancellation removes a factor, the excluded original value remains excluded.",
    "Distribution works in both directions: a(b+c)=ab+ac and ab+ac=a(b+c). Factoring is frequently better for QC because it reveals sign or common structure.",
    "If the same complicated chunk repeats, substitute u for it. For example (x+1)^2−5(x+1)+6 is a quadratic in u=x+1.",
    "When asked for a value of an expression rather than the variables themselves, manipulate given equations toward the target. Solving every variable can be unnecessary."
  ],
  "q-linear": [
    "Before solving, translate the English relationship accurately. “Five less than twice x” is 2x−5, while “five times the difference” creates parentheses.",
    "Clear fractions by multiplying every term by the least common denominator. Doing so reduces arithmetic noise and sign mistakes.",
    "Linear equations can have one solution, no solution, or infinitely many if variables cancel. Interpret contradictions such as 0=5 and identities such as 0=0 correctly.",
    "Use answer choices when helpful: backsolving is especially efficient for integer word problems and ordered choices. Start near the middle when monotonic.",
    "Keep units attached to variables in word problems. An equation may be algebraically valid but model the wrong quantity if dollars, items, hours, or people are mixed.",
    "Check the result in the original relationship, particularly when the setup involved percentages, ages, or translated wording. The GRE rewards avoiding model errors more than algebra heroics."
  ],
  "q-inequalities": [
    "Inequalities preserve direction when adding/subtracting the same amount and when multiplying/dividing by a positive number; multiplying/dividing by a negative reverses the sign.",
    "Compound inequalities use intersection for AND and union for OR. Draw a quick number line if endpoints or overlapping ranges are easy to confuse.",
    "For polynomial/rational inequalities, critical points are zeros of numerator and denominator. Sign-test intervals rather than treating the inequality like an equation.",
    "Squaring both sides can introduce ambiguity unless signs are controlled. If both sides are nonnegative, squaring preserves order; otherwise analyze cases.",
    "Reciprocals reverse order for positive quantities but behave differently across negative values. Never reciprocate a variable inequality without sign information.",
    "QC with a range should test values near boundaries and values that change sign or cross 0/1. One counterexample is enough to destroy a supposed universal relationship."
  ],
  "q-systems": [
    "Systems encode simultaneous constraints. Elimination is efficient when coefficients align; substitution is efficient when a variable is isolated or has coefficient 1.",
    "Two linear equations can intersect once, be parallel with no solution, or represent the same line with infinitely many solutions. Algebraic cancellation tells you which case.",
    "Word systems often have one equation for quantity and one for value/rate. Label what each equation represents before solving.",
    "For integer systems, use divisibility or parity after algebra narrows the possibilities. A continuous solution set may collapse under integer restrictions.",
    "Graphically, inequalities describe half-planes and their system is the intersection. The GRE may ask whether a point satisfies all constraints without requiring graphing.",
    "Sometimes the target is x+y, x−y, or another combination. Add/subtract equations directly to obtain the requested combination instead of solving x and y separately."
  ],
  "q-quadratics": [
    "Put a quadratic into standard form ax²+bx+c=0 before choosing a method. Factoring is fastest when integer factors are visible; the quadratic formula is universal.",
    "The discriminant D=b²−4ac tells the number of real roots: positive two, zero one repeated, negative none. This can answer root-count questions without solving.",
    "Vieta relationships: sum of roots=−b/a and product=c/a. GRE questions asking about root sums/products often reward these directly.",
    "Graph shape: a>0 opens upward, a<0 downward; axis of symmetry x=−b/(2a). The vertex is a minimum or maximum accordingly.",
    "A quadratic inequality depends on where the expression is positive/negative relative to roots. Factor and sign-test intervals; do not simply solve the equality and stop.",
    "If roots or coefficients are constrained to integers, use factor pairs and sign logic. Always verify that any transformed equation has not introduced extraneous roots."
  ],
  "q-functions": [
    "f(x) is notation for an output, not multiplication. Substitute the entire input everywhere x appears, using parentheses to protect signs.",
    "Composition f(g(x)) means apply g first, then f. Work inside-out and keep intermediate expressions organized.",
    "Domain restrictions arise from denominators, even roots, logs (not a GRE focus), and real-world context. The GRE may ask which input is invalid rather than asking for the domain explicitly.",
    "One-to-one/inverse reasoning on GRE is generally basic: if f(a)=b, an inverse relation would send b back to a where defined. Do not import higher-level function theory unnecessarily.",
    "Graph transformations: f(x)+k vertical, f(x−h) right h, f(x+h) left h, −f(x) reflect x-axis, f(−x) reflect y-axis. Horizontal signs feel reversed.",
    "When a function is defined piecewise or by a custom operation, read the definition literally. Evaluate the relevant case before performing arithmetic."
  ],
  "q-coordinate": [
    "Slope=(change in y)/(change in x). Horizontal lines have slope 0; vertical lines have undefined slope. Keep point order consistent in numerator and denominator.",
    "Parallel nonvertical lines share slope. Perpendicular nonvertical lines have negative reciprocal slopes, so their product is −1 when both slopes are defined.",
    "Line equations: y=mx+b for slope/intercept; y−y1=m(x−x1) from a point and slope. Choose the form that minimizes algebra.",
    "Distance comes from Pythagoras; midpoint averages coordinates. Many coordinate geometry items become ordinary triangles once you draw horizontal/vertical differences.",
    "Coordinate graphs are among the displays ETS treats as drawn to scale, unlike generic geometry figures. You may use the axes/scale where appropriate, but exact questions still require exact reasoning.",
    "Regions defined by inequalities can be tested with a sample point. Boundary inclusion depends on ≤/≥ versus </>, though the computer test may describe rather than require plotting."
  ],
  "q-translation": [
    "Use a five-step model: identify target; define variables with units; translate relationships; solve; verify against the story. Delaying arithmetic until the model is complete prevents most word-problem failures.",
    "Distinguish totals from rates and parts from wholes. “20% more than” means multiply the reference by 1.2, while “20 percentage points more” is additive on percentages.",
    "Age problems are differences-invariant: ages all increase by the same number of years, so age differences stay constant. Translate time shifts explicitly.",
    "Cost/revenue/profit: revenue=price×quantity; profit=revenue−cost. Fixed and variable costs must not be conflated.",
    "When choices are numeric, backsolve if the relationship is messy and monotonic. Testing a middle choice can eliminate half the options.",
    "Ask whether the answer is physically/logically possible: counts should respect integer/nonnegative constraints; rates and lengths should have sensible magnitude; percentages may exceed 100 when context allows."
  ],
  "q-angles": [
    "Know the nonnegotiables: straight line 180°, full turn 360°, vertical angles equal, linear pair supplementary, perpendicular lines create 90° angles.",
    "For parallel lines cut by a transversal, corresponding and alternate interior angles are equal; same-side interior angles are supplementary. Mark the parallel condition—it cannot be inferred from appearance.",
    "Ordinary GRE geometry diagrams are not guaranteed to scale. Apparent acute/obtuse relationships, equal lengths, or parallelism are not evidence unless stated or derivable.",
    "Angle algebra is often faster than angle chasing: assign x to a repeated relationship and use 180/360 totals. Avoid measuring-looking assumptions.",
    "Exterior angle of a triangle equals the sum of the two remote interior angles. This shortcut often replaces two equations.",
    "When multiple lines meet, carefully distinguish adjacent, vertical, supplementary, and corresponding relationships. A quick labeled sketch on scratch paper is safer than mental rotation."
  ],
  "q-triangles": [
    "Triangle interior angles sum to 180°. Larger angles face longer sides and equal angles face equal sides; these order relationships answer many QC items without lengths.",
    "Triangle inequality: for sides a,b,c, each side is less than the sum and greater than the positive difference of the other two. Equality would be a degenerate non-triangle.",
    "Area=1/2 bh where height is perpendicular to the chosen base and can fall outside an obtuse triangle. Do not use a slanted side as height unless it is perpendicular.",
    "Isosceles triangles have equal base angles opposite equal sides; equilateral triangles are 60-60-60. Conversely, equal angles imply opposite equal sides.",
    "For fixed base and height, triangles have equal area regardless of horizontal position of the third vertex. GRE diagrams sometimes hide this invariance.",
    "Combine algebra and geometry: if angles are expressions in x, use the 180° total; if sides are expressions, apply triangle inequality and positivity."
  ],
  "q-special-triangles": [
    "Pythagorean theorem applies only to right triangles: a²+b²=c² with c opposite the right angle. Recognize scaled triples such as 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
    "45-45-90 side ratio is 1:1:√2. Equal legs imply the two acute angles are 45°; hypotenuse=leg√2.",
    "30-60-90 side ratio opposite 30°,60°,90° is 1:√3:2. The short leg is half the hypotenuse.",
    "Do not use trigonometry: ETS does not require it. Special triangle ratios plus Pythagoras cover the intended right-triangle calculations.",
    "Altitude from the right angle to the hypotenuse can create similar triangles, but only use that deeper relationship if the problem cues it; basic proportions are usually enough.",
    "Coordinate geometry often creates right triangles from horizontal/vertical differences. Look for hidden triples before reaching for square roots."
  ],
  "q-polygons": [
    "Interior-angle sum of an n-gon=(n−2)180°. For a regular n-gon, each interior angle is that sum/n and each exterior angle is 360/n.",
    "Parallelogram: opposite sides parallel/equal, opposite angles equal, consecutive angles supplementary, diagonals bisect each other. A rectangle adds four right angles.",
    "Rhombus: parallelogram with four equal sides; diagonals are perpendicular and bisect opposite angles. A square is both rectangle and rhombus.",
    "Trapezoid on GRE typically has at least one pair of parallel sides; area=1/2(b1+b2)h using perpendicular height. Do not use a slanted leg as height.",
    "For regular polygons, symmetry can turn angle/diagonal questions into central angles of 360/n. Draw the center when helpful.",
    "Properties do not automatically reverse. A quadrilateral with perpendicular diagonals is not necessarily a square; identify the minimum guaranteed classification."
  ],
  "q-circles": [
    "Core relationships: diameter=2r, circumference=2πr, area=πr². Linear changes affect circumference linearly but area quadratically.",
    "Arc length and sector area use the same fraction θ/360 of the whole circumference/area when θ is a central angle.",
    "A radius to a point of tangency is perpendicular to the tangent. Tangent segments drawn from the same external point have equal length.",
    "Central angle measure equals its intercepted arc measure; an inscribed angle is half its intercepted arc. Use only if the configuration is clearly defined.",
    "Chord facts are secondary but useful: equal chords subtend equal arcs; a perpendicular from the center to a chord bisects the chord.",
    "Keep π symbolic unless the question requests a decimal or choices require approximation. Prematurely replacing π with 3.14 creates unnecessary arithmetic."
  ],
  "q-similarity": [
    "Congruent figures match in shape and size; similar figures match shape with a constant linear scale factor. Corresponding angles equal and corresponding lengths proportional.",
    "If linear scale factor is k, perimeter scales k, area k², volume k³. Never carry a side ratio unchanged into an area/volume comparison.",
    "An area ratio can reveal a linear ratio by square root; a volume ratio by cube root. This reverse-scaling move is common in harder GRE questions.",
    "Parallel lines inside triangles often generate similar triangles through equal angles. Set up correspondence carefully before writing proportions.",
    "Similarity is about corresponding positions, not visually matching sides. Write vertex correspondence or mark angles before forming a ratio.",
    "QC often asks whether two areas/lengths are determined from partial similarity information. Ask whether enough independent dimensions are fixed rather than trusting the drawing."
  ],
  "q-area": [
    "Perimeter measures boundary length; area measures surface. Combining shapes removes shared interior edges from perimeter, a classic trap.",
    "Composite area strategy: decompose into rectangles/triangles/circles or subtract holes from a larger simple figure. Choose the representation with the fewest unknowns.",
    "Rectangle A=lw; square A=s²; triangle A=1/2bh; parallelogram A=bh; trapezoid A=1/2(b1+b2)h; circle A=πr².",
    "Equal perimeter does not imply equal area and vice versa. Among rectangles with fixed perimeter, the square has greatest area, but you rarely need that theorem unless specifically useful.",
    "Scaling every length by k multiplies area by k². Percent changes in dimensions therefore do not translate directly into the same percent change in area.",
    "For shaded regions, compute exact boundaries and account for overlap only once. A quick labeled decomposition is safer than visually estimating proportions."
  ],
  "q-solids": [
    "Rectangular solid volume=lwh; total surface area=2(lw+lh+wh); space diagonal=√(l²+w²+h²). Distinguish which measure the question asks.",
    "Cube volume=s³, surface area=6s², space diagonal=s√3. If volume is given, cube-root before computing surface area.",
    "Cylinder volume=πr²h and total surface area=2πr²+2πrh. Lateral area excludes the two circular bases.",
    "Linear scaling by k multiplies surface area by k² and volume by k³. This is usually faster than recomputing formulas.",
    "Unit conversions are powered: centimeters to meters is /100, cm² to m² is /10,000, cm³ to m³ is /1,000,000.",
    "If a solid is filled, emptied, or recast with equal volume, set volumes equal. The shape may change while material volume stays constant."
  ],
  "q-mean": [
    "Mean=sum/count is most powerful as sum=mean×count. Convert group averages into totals before combining groups.",
    "Combined mean is a weighted average by group sizes, not the simple mean of group means unless group sizes are equal.",
    "Changing one observation by d changes the total by d and therefore the mean by d/n for a fixed count n.",
    "Adding a new value above the current mean raises the mean; adding below lowers it; adding exactly the mean leaves it unchanged. This qualitative rule settles many QC items.",
    "Average speed is a separate rate concept and should not be treated as arithmetic mean of speeds unless equal times are explicitly given.",
    "For an arithmetic sequence or symmetric equally spaced data, mean equals the midpoint of first and last. Use structure instead of summing every term."
  ],
  "q-median": [
    "Median requires ordering. For odd n take the middle; for even n average the two central values. Unsorted presentation is a deliberate speed trap.",
    "Mode is the most frequent value and can be none or multiple. Range=max−min and depends only on extremes.",
    "Median is robust to extreme outliers compared with mean. A huge change to an extreme value may leave the median unchanged while moving the mean.",
    "When a value is inserted/deleted, track the new position of the middle rather than recomputing unrelated statistics.",
    "Knowing mean and median alone usually does not determine the dataset. QC “cannot determine” often arises because many distributions share the same center.",
    "For ordered data with variables, use position constraints: if x is stated to be the median, values on either side constrain x without fixing every number."
  ],
  "q-quartiles": [
    "Quartiles divide ordered data into four portions; Q2 is the median and IQR=Q3−Q1. ETS may provide the exact quartile convention implicitly through a boxplot rather than asking you to calculate ambiguous small-sample quartiles.",
    "A percentile is positional: 80th percentile means roughly 80% of observations are at or below that value. It does not mean 80% of questions were correct.",
    "Boxplots encode median, quartiles, and spread. Compare center, IQR, total range, asymmetry, and possible outliers without inventing individual data values.",
    "IQR is resistant to extreme endpoints because it uses the middle 50%. Range is highly sensitive to extremes.",
    "If every data value is shifted by c, all quartiles/median shift by c but IQR stays unchanged. Scaling by positive k scales IQR by k.",
    "Do not infer frequencies within the quartile intervals beyond the intended 25% partitions; the physical widths on the number line represent value spread, not count density."
  ],
  "q-sd": [
    "Standard deviation measures spread around the mean; GRE emphasis is usually conceptual comparison and transformation, not hand-computing the full formula.",
    "SD=0 exactly when all observations are equal. More dispersed values around the same center generally produce larger SD.",
    "Adding the same constant to every value shifts mean/median but leaves SD unchanged. Multiplying every value by k multiplies SD by |k|.",
    "Outliers can increase SD substantially because deviations are squared in the variance calculation. Compare distributions by how far values lie from their means.",
    "Two sets can have the same range but different SD, or same SD but different mean. Do not treat one spread statistic as determining another.",
    "For symmetric transformations around the mean, redistributing points farther outward increases spread even when mean stays fixed. This is useful for conceptual QC."
  ],
  "q-graphs": [
    "Read title, axes, units, legends, scale increments, category definitions, and footnotes before calculating. Many DI misses are metadata misses rather than math misses.",
    "Distinguish counts, rates, percentages, percentage points, indexed values, and cumulative totals. The denominator you choose must match the requested quantity.",
    "Bar/line/circle graphs and coordinate/data displays are drawn to scale under ETS conventions, but truncated axes can make small numerical differences look dramatic.",
    "For percent change, denominator is the original/base value. For share of total, denominator is the relevant total. Write the denominator explicitly on scratch paper.",
    "Interpolate only when the graph and question support approximation. If exact values are labeled or tabled, use them instead of measuring by eye.",
    "Shared-data sets reward one initial scan, then targeted reading. Do not memorize every value; retrieve only what each question needs."
  ],
  "q-sets": [
    "For two sets, |A∪B|=|A|+|B|−|A∩B|. The overlap is subtracted because it was counted twice.",
    "“Neither” equals universal total minus union. “Only A” equals |A|−|A∩B|. Label regions instead of manipulating words mentally.",
    "For three sets, fill the central triple intersection first, then pairwise-only regions, then single-only regions, then neither. This order prevents double-counting.",
    "Complement language—at least one, none, not A—often makes Venn/probability questions faster. Define the universe before taking a complement.",
    "If categories overlap, adding category totals without subtracting intersections overcounts. If they are mutually exclusive, intersections are zero.",
    "Bounds matter when overlap is unknown: with a fixed total, minimum/maximum possible intersection can sometimes be found from pigeonhole-style reasoning."
  ],
  "q-counting": [
    "Fundamental counting principle multiplies choices across sequential stages when every stage choice can pair with the next. Add counts for mutually exclusive alternative cases.",
    "Permutation means order matters: nPr=n!/(n−r)!. Combination means order does not matter: nCr=n!/[r!(n−r)!]. Ask whether rearranging the selected members creates a new outcome.",
    "Restrictions are often easiest via total minus forbidden. For “at least one” conditions, count all outcomes then subtract none of the required type.",
    "When objects repeat, ordinary factorial arrangements overcount; divide by factorials of identical-item counts when this pattern is explicitly relevant.",
    "For seating/order with conditions, place the constrained objects first or treat a required adjacent block as one unit, then account for internal arrangements.",
    "Do not automatically use a memorized formula. Small finite choices can be listed systematically, which is often faster and safer under GRE time."
  ],
  "q-probability": [
    "Probability is favorable outcomes/total only when outcomes are equally likely. Otherwise use weighted probabilities supplied by the problem.",
    "Complement: P(not A)=1−P(A). “At least one” over repeated trials is often 1−P(none), dramatically reducing casework.",
    "Addition rule: P(A or B)=P(A)+P(B)−P(A∩B). If mutually exclusive, the intersection is zero.",
    "Multiplication for independent events: P(A and B)=P(A)P(B). Without replacement, probabilities usually change and events are not independent.",
    "Conditional probability restricts the universe; treat “given B” as discarding outcomes outside B before finding the fraction for A.",
    "Probability answers must be between 0 and 1. Estimate direction/magnitude before arithmetic, and reduce fractions only if useful for matching choices."
  ],
  "q-conditional": [
    "P(A|B)=P(A∩B)/P(B) for P(B)>0. The vertical bar means “given,” and B becomes the new sample space.",
    "Independence means learning B does not change probability of A: P(A|B)=P(A), equivalently P(A∩B)=P(A)P(B).",
    "Mutually exclusive is different from independent. If nonzero-probability events cannot occur together, knowing one occurred makes the other impossible, so they are dependent.",
    "Without-replacement draws are dependent because the composition changes after each draw; with replacement generally restores independence.",
    "Trees are useful for sequential conditional events: multiply along a branch, add mutually exclusive branches that satisfy the event.",
    "Two-way tables make conditional probability mechanical: restrict to the relevant row/column total, then compute the desired cell fraction within that restricted total."
  ],
  "q-distributions": [
    "A random variable maps outcomes to numerical values. A discrete probability distribution lists possible values and probabilities that sum to 1.",
    "Expected value E(X)=ΣxP(X=x) is a long-run average, not necessarily a possible single outcome. Negative and positive outcomes can offset.",
    "Distribution shape matters: symmetric, skewed, uniform, unimodal/bimodal. The mean is pulled toward a long tail more than the median.",
    "For right skew, tail extends right and typically mean>median; for left skew, tail extends left and typically mean<median. Treat these as typical shape relationships, not magical identities for every dataset.",
    "Linear transformations move center/spread predictably: X+c shifts expectation by c; multiplying by k scales expectation by k and SD by |k|.",
    "Normal distributions are a special family, not a synonym for any bell-looking dataset. Use normal-specific rules only when normality is stated or justified."
  ],
  "q-qc": [
    "QC has four relationship choices. “Cannot be determined” is a mathematical claim: legal cases produce different relationships—not a confession of uncertainty.",
    "Simplify before calculating. Subtract B from A, form a safe ratio, factor common expressions, or compare signs/magnitudes; exact numerical values are often irrelevant.",
    "For unrestricted variables, test strategic values: negative, 0, positive fraction, 1, and >1 as applicable. Pick values designed to cross behavior boundaries.",
    "Read domain restrictions obsessively: integer, positive, distinct, nonzero, geometry constraints, denominator zeros, and root domains determine which counterexamples are legal.",
    "If one case gives A>B, do not stop unless the problem’s structure proves it for all cases. QC rewards searching for a second relationship before committing.",
    "For geometry QC, never use visual measurement from a generic sketch. Derive relationships from given facts and known theorems."
  ],
  "q-estimation": [
    "Estimate sign and order of magnitude before exact computation. A result off by a factor of 10 or with impossible sign can then be rejected immediately.",
    "Round intelligently based on answer spacing. Widely separated choices permit coarse rounding; close choices require bounds or exact work.",
    "Bounding preserves guarantees: if 3.1<x<3.2 and x positive, then 9.61<x²<10.24. Bounds are stronger than a vague “about 10.”",
    "Use compatible numbers: 398/19.9 is mentally about 400/20=20. Choose replacements that simplify while staying close.",
    "Percent/ratio estimation can eliminate choices before arithmetic. Translate 49/101 as “just under half” rather than long division.",
    "Estimation is not license to ignore requested accuracy. Numeric Entry and close multiple-choice options may require exact or specified rounding."
  ],
  "q-conventions": [
    "Unless stated otherwise, GRE Quant variables/numbers are real. Never silently assume integer, positive, nonzero, or distinct.",
    "Ordinary geometry figures are not necessarily drawn to scale. Straight-looking lines are intended straight and relative placement is meaningful, but lengths/angles/equalities cannot be inferred by appearance.",
    "Coordinate systems and graphical data presentations are drawn to scale. Read their axes and labels carefully; this is a different convention from generic geometry sketches.",
    "Nonstandard symbols or operations are defined within the question. Replace the symbol with its definition exactly before applying familiar algebra.",
    "Degrees, units, and numerical labels are part of the conditions. If a diagram labels a value, trust the label over visual proportion.",
    "The test stays within specified high-school mathematics; do not invent trigonometric/calculus machinery. A simpler algebraic/geometric interpretation is intended."
  ],
  "q-formats": [
    "Quantitative Comparison asks only the relationship A/B/equal/cannot determine. Do not waste time solving for an exact value when comparison can be established directly.",
    "Single-answer multiple choice has exactly one correct option; use estimation, backsolving, and choice structure when they reduce work.",
    "Multiple-answer Quant says select one or more; there is no fixed number of correct choices. Test every option independently and select the complete correct set.",
    "Numeric Entry demands your own value and may allow fraction fields. Follow requested rounding and units; no answer choices exist to catch a transcription mistake.",
    "Data Interpretation questions share a table/graph/display. Scan metadata once, but solve each question independently and do not carry an incorrect denominator from one item to the next.",
    "Every format can test the same underlying content. Practice recognizing the mathematical task beneath interface differences instead of treating formats as separate subjects."
  ],
  "q-units": [
    "Dimensional analysis treats units like algebraic factors. Write conversions so unwanted units cancel; if the final units do not match the target, the setup is wrong.",
    "Linear conversions must be squared/cubed for area/volume. 1 m=100 cm implies 1 m²=10,000 cm² and 1 m³=1,000,000 cm³.",
    "Compound rates invert when wording reverses: miles/gallon versus gallons/mile. Read the target unit to determine which way the ratio must face.",
    "Time conversions are a common trap: minutes/hours/seconds can silently create factors of 60. Convert before combining rates.",
    "Density, cost per unit, productivity, and concentration all follow total=(rate per unit)×number of units. Units reveal the correct multiplication/division.",
    "Keep exact conversion factors as fractions until cancellation is done; premature decimals introduce rounding and make structure harder to see."
  ],
  "q-percent-growth": [
    "A p% increase multiplies by 1+p/100; a p% decrease by 1−p/100. Repeated percent changes multiply growth factors rather than add percentages.",
    "Equal percent increase and decrease do not cancel in general because they use different bases. Example: ×1.2 then ×0.8=0.96.",
    "Reverse percent means divide by the growth factor. If a final value after 25% increase is 150, original=150/1.25.",
    "Percentage points versus percent change: 20%→25% is +5 percentage points but +25% relative to the original rate.",
    "For compound growth over n equal periods, final=initial(1+r)^n. You may estimate if choices are broad; no advanced finance formulas are needed.",
    "Overall percent change across unequal groups must come from total old and total new values. Averaging subgroup percent changes is generally invalid."
  ],
  "q-mixtures": [
    "Track the quantity of active component: component amount=concentration×total volume/mass. Final concentration=total component/total mixture.",
    "When combining solutions, add component amounts and total amounts separately. A weighted average emerges automatically.",
    "A mixture concentration must lie between source concentrations unless pure solute/solvent or another out-of-range source is added.",
    "If a well-mixed solution is removed, the removed portion has the current concentration. Update both total volume and component amount before replacement.",
    "For alligation-style problems, algebra is safer than memorized tricks: pA+qB=target(A+B), with percentages expressed as decimals or consistent percent units.",
    "Check whether the problem refers to percent by mass, volume, or another measure. Use the exact measure supplied; do not assume physical density relationships not stated."
  ],
  "q-work-combined": [
    "Convert a completion time a into rate 1/a job per time unit. Add rates, not times, when workers operate simultaneously on the same divisible task.",
    "Combined time must be less than the fastest individual time when all rates are positive. This is an excellent magnitude check.",
    "If someone joins/leaves, split into time intervals: work done=rate×time; subtract from one whole job; continue with new combined rate.",
    "If one worker undoes work (leak/drain), its rate is negative. Net rate can be addition or subtraction depending on direction.",
    "Productivity questions generalize the same model: output=workers×time×output per worker-time, adjusted if efficiencies differ.",
    "Beware wording such as “A works twice as fast as B”: A’s rate is twice B’s, so A’s time for the same job is half B’s."
  ],
  "q-scatter": [
    "Scatterplots show association direction, strength, and form; they do not by themselves prove causation. A lurking variable or reverse direction may explain the pattern.",
    "Positive association trends upward, negative downward, no association lacks systematic pattern. Strong nonlinear association can exist even when a straight-line trend is poor.",
    "Outliers can change an apparent relationship disproportionately. Ask whether the overall cloud and the exceptional point tell different stories.",
    "A restricted range can make an underlying association look weaker. Read axis limits before judging strength visually.",
    "Prediction within observed range is interpolation; beyond it is extrapolation and generally less secure. GRE reasoning may test this conceptual difference.",
    "Do not infer individual behavior from aggregate trends or vice versa. Match the unit of analysis shown by each point."
  ],
  "q-frequency": [
    "Frequency is count; relative frequency=count/total; percent frequency=100×relative frequency. Keep these distinct when axes switch units.",
    "Histograms group quantitative data into intervals; bar charts commonly represent categories. Adjacent histogram bars do not imply categorical labels.",
    "Cumulative frequency adds counts up to a boundary and answers “at most/below” questions. Observe whether interval endpoints are inclusive or exclusive.",
    "Skew is named for the long tail: right-skew tail right, left-skew tail left. The tallest bar does not determine skew direction.",
    "Bin width affects appearance. Do not assume two histograms with different binning reveal identical fine detail even if based on the same data.",
    "When converting a frequency table to probabilities, divide the relevant frequency by total count; for conditional probabilities, restrict to the specified subgroup first."
  ],
  "q-normal": [
    "A normal distribution is symmetric and bell-shaped with mean=median=mode at center. Equal intervals on opposite sides of the mean contain equal proportions.",
    "z=(x−mean)/SD measures how many standard deviations x lies above/below mean. z>0 above, z<0 below, z=0 at mean.",
    "Empirical rule: approximately 68% within 1 SD, 95% within 2, 99.7% within 3 for a normal distribution. Use as approximation only when normality is specified.",
    "Changing mean shifts the curve horizontally; changing SD changes spread. Standardizing allows comparison across distributions with different units/scales.",
    "At the mean, 50% lies below and 50% above by symmetry. A percentile above 50 corresponds to a positive z-score in a normal distribution.",
    "GRE normal-distribution questions are conceptual/descriptive; do not invent z-tables or calculus. If an exact non-empirical percentile is needed, sufficient information will be given."
  ],
  "q-di-hard": [
    "Spend an initial 20–30 seconds scanning title, axes, units, legend, date range, notes, and denominator definitions. This investment prevents repeated rereads across a set.",
    "Write the denominator before computing a percentage. “of total,” “increase from,” “share among,” and “ratio to” use different bases.",
    "Watch dual axes, nonzero baselines, stacked values, indexed values, thousands/millions/billions, and rounded data. Visual height alone can mislead.",
    "When a set has multiple questions, reuse trustworthy totals/conversions but treat each target independently. One early mistake should not contaminate later answers.",
    "Approximate when answer choices permit; compute exactly when choices are close. The graph is a source of data, not an instruction to overcalculate.",
    "If a question becomes a time sink, mark and move just as with a discrete question. Shared data does not make the first item more valuable."
  ],
  "q-qc-adversarial": [
    "Adversarial QC means you actively try to break your first conclusion. After finding one relationship, search for a legal value from a different behavior region.",
    "Value checklist for unrestricted real variables: negative, zero, fraction between 0 and 1, 1, greater than 1. Add equality/boundary values when conditions permit.",
    "For integers, test parity, sign, and smallest/largest boundary-adjacent values. Fractions are illegal in integer domains and create fake counterexamples.",
    "For expressions with denominators/roots, map excluded values before testing. Every counterexample must satisfy all original conditions.",
    "If algebra proves the sign of A−B for the whole domain, stop testing. Examples demonstrate possibility; algebra establishes universality.",
    "The fastest D (“cannot determine”) proof is two legal cases with two different outcomes. Record both clearly so you do not accidentally compare different problem conditions."
  ],
  "q-scaling": [
    "Linear scale factor k multiplies every corresponding length and perimeter by k, area by k², and volume by k³. This hierarchy should be automatic.",
    "A 20% increase in every length means k=1.2, so area becomes 1.44 times and volume 1.728 times—nonlinear percent change is the key lesson.",
    "Reverse from area ratio by square root and from volume ratio by cube root when figures are similar.",
    "Only use scaling laws when shapes remain similar or every relevant dimension is scaled consistently. Changing one dimension of a rectangle is not uniform scaling.",
    "Surface area of similar solids follows k² while volume follows k³, so surface-area-to-volume ratio changes as 1/k. This can appear as a conceptual ratio question.",
    "Keep ratios exact where possible: side ratio 2:3 → area 4:9 → volume 8:27. Do not convert to decimals unless needed."
  ],
  "q-integer-constraints": [
    "Whenever “integer,” “positive integer,” “distinct integer,” or “consecutive” appears, write the restriction prominently. It can be more important than the equation.",
    "Factor-pair method solves integer products efficiently: xy=n means x must be a divisor of n. Shifted products such as (x−a)(y−b)=c work the same way.",
    "Parity and modular constraints eliminate entire branches before calculation. If an equation forces an odd number to equal an even number, that branch is impossible.",
    "Bounds plus integrality turn intervals into finite candidate lists. Count or test only those candidates rather than treating x as continuous.",
    "Positive integer optimization often occurs at extremes or balanced factors depending on sum/product constraints. Test structure before using advanced optimization.",
    "“Distinct” matters: two variables cannot take the same value, which can eliminate symmetric solutions or reduce combination counts."
  ],
  "v-logic": [
    "GRE sentence questions are logic problems wearing vocabulary. Before reading choices, identify whether the blank must continue, reverse, explain, intensify, weaken, or exemplify another idea.",
    "Build a crude prediction in ordinary English—“skeptical,” “praise,” “reduce,” “surprising”—rather than hunting for an exact sophisticated synonym. The prediction protects you from attractive but logically wrong choices.",
    "Contrast signals include although, despite, yet, however, nevertheless, rather than, while; continuation/support signals include moreover, indeed, likewise, because, therefore, consequently. Punctuation can perform the same job.",
    "Negation scope matters: not uncommon does not mean rare; scarcely any is close to almost none; far from X often predicts the opposite/absence of X. Rewrite double negatives into positive meaning.",
    "Degree words such as merely, primarily, even, only, somewhat, largely, exceptionally constrain intensity. A choice with the right direction but wrong strength can still be wrong.",
    "After choosing, reread the completed sentence as a single argument. Grammar, register, logical direction, and overall coherence must all work simultaneously."
  ],
  "v-tc": [
    "Text Completion tests passage-level coherence, not isolated vocabulary. One-, two-, and three-blank forms differ in mechanics but share the same discipline: infer the meaning architecture before committing.",
    "For multi-blank TC, solve the most constrained blank first rather than automatically blank 1. A definition, contrast, or restatement can anchor the entire passage.",
    "Do not brute-force every combination. Select a plausible anchor, propagate its implications, and backtrack only if the whole passage fails.",
    "Use local and global clues separately: a nearby phrase may define one blank while the larger sentence determines another blank’s tone or causal relationship.",
    "Each blank must be correct for credit. A word that is individually plausible can still be wrong because it makes another blank incoherent or creates redundancy.",
    "When reviewing TC, write the predicted idea and the exact clue that licensed it. “I did not know the word” and “I misread the logic” are different errors and require different repair."
  ],
  "v-se": [
    "Sentence Equivalence requires two choices that each complete the sentence coherently and produce equivalent overall meanings. The task is not simply “find two synonyms.”",
    "Predict the blank first, then scan for semantic pairs. A visible synonym pair is only a candidate pair; both words must independently fit grammar, tone, and logic.",
    "Correct choices need not be perfect dictionary synonyms. Context can make words with different literal nuances yield equivalent completed sentences.",
    "Conversely, two near-synonyms can both be wrong because the sentence demands a different semantic direction. Never let pairing replace sentence analysis.",
    "Connotation and intensity distinguish tempting pairs: frugal vs parsimonious, confident vs presumptuous, concise vs curt. Ask what attitude the sentence carries.",
    "If one word seems perfect but has no viable partner, reconsider the prediction. The two-answer requirement is evidence about the intended meaning, not an annoyance."
  ],
  "v-rc-map": [
    "Read passages for architecture, not memorized detail. After each paragraph, assign a 3–7 word role such as old theory, objection, new evidence, author synthesis, example, or implication.",
    "Track viewpoints explicitly: author, critic, researcher A, traditional view, recent studies. GRE distractors often attribute a true statement to the wrong speaker.",
    "Signal words reveal structure: however/although concession, for example illustration, therefore inference, indeed emphasis, instead replacement, admittedly concession, by contrast comparison.",
    "Details are addresses in the map. You do not need to remember every date/name; remember where and why the detail appeared so you can retrieve it when asked.",
    "At the end, articulate topic, author’s main move, and attitude in one sentence. If you cannot, the passage map is not yet coherent enough.",
    "Long passages should not trigger slower word-by-word reading. Structure-first reading reduces rereading because each question can be routed to the relevant paragraph."
  ],
  "v-main": [
    "Main idea is the claim or synthesis organizing the whole passage, not merely the subject. “The passage is about X” is usually too weak; ask what the author says about X.",
    "Primary purpose describes the author’s action: challenge, explain, reconcile, compare, qualify, advocate, trace, evaluate, or propose. Match the verb to the passage structure.",
    "Wrong answers are often too narrow (one example), too broad (a whole field), or too strong (author only qualifies a theory but choice says refutes it).",
    "The opening sentence may give background rather than thesis; the final sentence may give implication rather than main idea. Use the whole map, not position alone.",
    "When two choices remain, compare scope and attitude word by word. The correct answer usually preserves the passage’s qualification and does not invent a stronger agenda.",
    "Practice writing a one-line summary after reading: “Old view X; new evidence Y; author argues qualified revision Z.” This becomes a direct main-purpose prediction."
  ],
  "v-detail": [
    "Detail questions are evidence retrieval. Return to the relevant lines and answer from the passage, not from memory or what is generally true in the subject.",
    "A correct detail answer may paraphrase rather than copy wording. Translate passage wording into simpler language before evaluating choices.",
    "Function questions ask why a sentence/detail exists in the argument: example, evidence, concession, objection, definition, transition, counterexample, or consequence.",
    "Select-in-Passage requires choosing the exact sentence that satisfies a description. Topic overlap is insufficient; match rhetorical function precisely.",
    "Use a narrow evidence window first—usually the target sentence plus surrounding context. Reread more only if a reference or logical relation extends farther.",
    "A choice can accurately quote a fact yet answer the wrong question. Always restate the task in your own words before selecting."
  ],
  "v-inference": [
    "Inference means best supported by the passage, not merely possible in the real world. The safest correct choice is often modest and tightly bounded.",
    "Match certainty: may/can/some/often do not license must/all/always. A single strengthened quantifier can invalidate an otherwise faithful choice.",
    "Combine statements only when their scopes overlap. If one claim concerns early studies and another concerns recent studies, do not silently merge populations/time frames.",
    "Use a counterexample test: can you imagine a scenario consistent with the passage in which the choice is false? If yes, the choice is probably too strong.",
    "Negative inference questions (“which is NOT supported/EXCEPT”) require careful task marking. Do not let a correct statement trick you when the question asks for the exception.",
    "Outside knowledge is deliberately unnecessary. Even if you know the scientific/history topic, the answer must be textually licensed."
  ],
  "v-tone": [
    "GRE academic tone is usually calibrated rather than emotional: skeptical, qualified, approving, ambivalent, cautiously optimistic, critical, detached, or appreciative.",
    "Look for evaluative diction—ingenious, merely, unfortunately, compelling, dubious—as well as concessions and attribution verbs. These reveal author stance more reliably than topic.",
    "Degree matters. “Qualified approval” differs from “unreserved enthusiasm”; “skeptical” differs from “dismissive.” Extreme emotional choices often overstate restrained prose.",
    "Distinguish author attitude toward a claim from attitude toward a person or evidence. The author may respect a scholar’s ingenuity while rejecting the conclusion.",
    "Attribution verbs encode distance: argues/claims/contends may be neutral, alleges can imply doubt, demonstrates is stronger endorsement, speculates signals uncertainty.",
    "When tone shifts, identify the final or dominant stance rather than averaging incompatible labels. A passage can concede strengths before delivering a critical conclusion."
  ],
  "v-cr": [
    "Argument reasoning begins by separating conclusion, evidence, and missing bridge. Do this before reading answer choices; otherwise topic-relevant distractors feel persuasive.",
    "Common gaps: correlation→causation, sample→population, past→future, proxy→construct, plan→outcome, one group→another, and absence of evidence→evidence of absence.",
    "For causal arguments test reverse causation, third variables, selection effects, timing, measurement, and whether the proposed mechanism can operate.",
    "Strengthen/weaken answers must change confidence in the conclusion. A true fact about the topic that leaves the bridge untouched is irrelevant.",
    "Necessary assumption uses the negation test: negate a candidate; if the argument’s support collapses, the candidate was required.",
    "Resolve-paradox questions accept both stated facts and seek a hidden distinction or mechanism making them compatible. Do not “solve” by denying one observation."
  ],
  "v-longrc": [
    "Long-passage success depends on navigation. Maintain a paragraph ledger of role + viewpoint, not a sentence-by-sentence memory dump.",
    "Reference chains such as this view, such findings, the latter, these assumptions often connect paragraphs. Resolve them when first encountered to avoid later confusion.",
    "Expect multiple question types on one passage. A good map lets main idea use the whole passage while detail/function questions use targeted rereads.",
    "Technical terminology can be compressed into symbols: Theory A, mechanism B, group C. Relationships matter more than memorizing unfamiliar names.",
    "Pacing: invest enough in the first read to understand structure, but do not spend time mastering every detail. Retrieval from the text is part of the intended process.",
    "When a question seems ambiguous, locate the exact evidence and compare the remaining choices on scope, speaker, degree, and causal direction."
  ],
  "v-vocab-strategy": [
    "There is no finite official ETS list of every possible GRE word. The realistic target is a very strong high-frequency academic lexicon plus context/morphology skills and a personal error-driven vocabulary layer.",
    "Learn words as retrieval units: plain meaning, connotation, one synonym/antonym, a natural sentence, and any secondary meaning. Recognition alone is fragile.",
    "Organize semantic families—talkative, praise, criticize, stubborn, obscure, clear, harmful—because Sentence Equivalence depends on relationships between meanings.",
    "Spaced repetition should prioritize failed/hard words and delay mastered words. New-word volume is useful only if retention remains high; hundreds of passive cards per day are counterproductive.",
    "Polysemy deserves separate training: qualify=limit a claim, pedestrian=ordinary, intimate=suggest, arrest=stop/hold attention. Familiar words can be more dangerous than unfamiliar ones.",
    "Every unknown word encountered in official/high-quality practice belongs in a personal list with the sentence context and why it mattered. Practice-derived vocabulary is highly targeted."
  ],
  "v-elimination": [
    "Every answer choice is a precise claim. Evaluate subject, scope, speaker, time frame, certainty, causality, and relevance—not just whether it “sounds like the passage.”",
    "Common RC traps: too broad, too narrow, too strong, reversed relationship, wrong viewpoint, true-but-irrelevant, half-right/half-wrong, chronology shift, outside-knowledge bait.",
    "TC/SE traps include right tone wrong logic, synonym pair that fails context, correct direction wrong degree, and impressive-looking rare vocabulary.",
    "In a 50/50, articulate the exact difference between choices. Then find the smallest piece of evidence that resolves that difference rather than rereading everything.",
    "Do not reward a choice for repeating passage vocabulary. Distractors often recycle exact nouns while subtly reversing the logical relationship.",
    "Review wrong choices actively: name the trap type. “Scope inflation” or “author/critic swap” becomes a reusable detection rule; “B felt wrong” does not."
  ],
  "v-morphology": [
    "Morphology is a probability tool, not proof. Roots/prefixes can suggest direction, but semantic drift means context must confirm the hypothesis.",
    "High-yield roots: bene good, mal bad, cred believe, loqu/locut speak, tac silent, ver truth, phil love, miso hate, chrono time, luc light, anthrop human.",
    "High-yield prefixes: anti/contra against, pre/ante before, post after, sub under, super above, trans across, circum around, mono one, poly many, omni all.",
    "Grammar suffixes help identify part of speech: -ity/-ness nouns, -ous/-ive/-al adjectives, -ize/-ify verbs, though exceptions exist. Part-of-speech fit can eliminate choices.",
    "Learn word families when useful: equivocal/equivocate/equivocation; lucid/elucidate; corroborate/corroboration. Families multiply vocabulary coverage efficiently.",
    "Never force an etymological guess against sentence logic. If root suggests “good” but contrast requires a negative meaning, reconsider the decomposition or word history."
  ],
  "v-rc-formats": [
    "RC single-answer questions have one correct option. Use normal evidence-based elimination and do not assume the longest or most qualified choice is correct.",
    "Select-one-or-more RC has three choices and can have one, two, or three correct answers. Evaluate each independently as true/false; there is no partial credit for an incomplete set.",
    "Select-in-Passage asks you to click the sentence satisfying a function or content description. Focus on the requested role, not merely keyword overlap.",
    "Question format does not change evidence standards. Every selected answer must be supported by the passage and answer the exact task.",
    "For multiple-answer, resist social-test instincts such as “there must be two.” ETS explicitly allows varying counts; stop only after testing all choices.",
    "Practice interface discipline: mark the task type before reading options, especially EXCEPT/NOT questions and select-all formats."
  ],
  "v-syntax-spine": [
    "Dense GRE prose often separates subject from main verb with appositives, parentheticals, relative clauses, and prepositional phrases. Find the independent-clause spine first.",
    "Bracket removable modifiers mentally. If the sentence still makes grammatical sense without a phrase, that phrase is probably subordinate information rather than the main assertion.",
    "Subordinate markers reveal role: although concession, because reason, if condition, which/who relative description, while contrast or simultaneity depending context.",
    "After locating subject→main verb→object/complement, rebuild modifiers one at a time and ask exactly what each modifies. Misattachment can reverse meaning.",
    "Punctuation is syntax: colon explains/elaborates, semicolon joins complete clauses, dash interrupts or apposes, commas can mark nonessential modifiers.",
    "For TC, grammatical spine predicts part of speech and relationship of the blank; for RC, it prevents losing the author’s central assertion inside technical detail."
  ],
  "v-reference": [
    "Pronouns do not always refer to the nearest noun. Replace it/they/this/which mentally with each plausible referent and test grammar plus meaning.",
    "“This result/view/assumption/problem” is especially valuable because the following noun tells you how the author categorizes the preceding idea.",
    "Relative clauses attach to noun phrases; identify which noun who/which/that modifies before interpreting the clause’s implication.",
    "“Former/latter” and paired comparisons require keeping order. Write A/B on scratch paper if a dense passage introduces two theories and repeatedly contrasts them.",
    "A demonstrative can refer to an entire proposition, not a physical noun. “This suggests…” often summarizes the preceding finding as a whole.",
    "Referent mistakes propagate: if you assign one pronoun incorrectly, later main-idea/inference answers may all seem plausible. Resolve ambiguity immediately."
  ],
  "v-connectors": [
    "Contrast/concession: although, though, despite, notwithstanding, yet, however, nevertheless, nonetheless, whereas, by contrast. They signal tension but not necessarily exact opposites.",
    "Continuation/support: moreover, furthermore, indeed, in fact, likewise, similarly, additionally. They generally preserve argumentative direction or add reinforcement.",
    "Cause/result: because, since, given that, owing to versus therefore, thus, hence, consequently. Distinguish premise marker from conclusion marker.",
    "Example/restatement: for example, for instance, specifically, namely, in other words. These often let one clause define the meaning required in another.",
    "Qualification/restriction: only, merely, primarily, largely, at least, at most, except, unless, even. Tiny restrictions are frequently decisive in inference questions.",
    "Distance/uncertainty: apparently, ostensibly, allegedly, purportedly, arguably, perhaps, may. These prevent you from attributing full author endorsement."
  ],
  "v-scope": [
    "Quantifier ladder matters: all/always/never are extreme; most is stronger than many; some means at least one; may/can signal possibility; must/necessarily signal requirement.",
    "Author commitment verbs matter: suggests/indicates are weaker than demonstrates/establishes; appears/seems hedge; clearly/certainly intensify.",
    "Time/population scope must match. Evidence about one decade, subgroup, species, or region cannot automatically support a universal answer.",
    "Only and primarily restrict causes/roles differently. “Primarily caused by X” allows other causes; “caused only by X” excludes them.",
    "Negative scopes require precision: “not all” means at least one exception, not “none”; “no evidence that X” is not necessarily evidence that not-X.",
    "When an answer choice is tempting, underline its strongest word mentally. If that word exceeds the passage’s commitment, eliminate the whole choice."
  ],
  "v-tc-one": [
    "One-blank TC is the purest prediction exercise. Cover choices mentally and reduce the sentence to a relationship: praise vs criticism, certainty vs doubt, increase vs decrease, conventional vs unusual.",
    "Use grammar to predict part of speech and syntactic role. If the blank follows “was remarkably,” you likely need an adjective; after “to,” often a verb.",
    "Use punctuation as a clue: colon/restatement can virtually define the blank; dash can appose; semicolon may link parallel or contrasting complete thoughts.",
    "When two choices match direction, compare connotation and degree. “Cautious” and “timid” differ in judgment; “skeptical” and “hostile” differ in intensity.",
    "Beware word association: a choice may relate to the topic but not complete the logic. Explain the sentence without the choices first.",
    "Final check: substitute the word and paraphrase the whole sentence. If your paraphrase sounds contradictory or strangely redundant, revisit."
  ],
  "v-tc-multi": [
    "Multi-blank TC is a constraint network. Find the blank with strongest evidence first; this anchor can reveal the direction of less constrained blanks.",
    "Blank order is irrelevant to scoring and need not be solution order. A later blank after a colon/definition may be much easier than blank 1.",
    "After filling one blank, update the passage meaning. Do not keep an initial prediction if new evidence from another blank makes it impossible.",
    "Global coherence beats local fit. A choice can make its immediate clause sound fine while contradicting another sentence or producing an illogical shift.",
    "Do not test every possible combination; with 3×3×3 choices brute force is inefficient and encourages post-hoc rationalization.",
    "Review by drawing arrows between clues and blanks. If a blank has no identifiable textual constraint, you likely missed a logical signal or semantic relationship."
  ],
  "v-se-pairing": [
    "First derive the completed-sentence meaning without choices. Then identify all choices individually compatible with that prediction before pairing.",
    "Semantic pairing is a check, not the starting point. Two synonyms can be distractors if the stem demands a different meaning.",
    "Correct choices may differ in dictionary nuance but produce equivalent sentence meanings in this specific context. Evaluate the sentence outcome, not lexical identity.",
    "Connotation, intensity, and register separate candidates. A neutral word may not pair with a strongly pejorative one even if both share a broad denotation.",
    "An “orphan” word that fits but has no partner is evidence to revisit your interpretation. The task guarantees a pair.",
    "On review, create a mini synonym cluster around the correct pair and note why the tempting pair failed. This makes each SE question vocabulary training as well as logic training."
  ],
  "v-polysemy": [
    "Polysemy means one familiar word has multiple senses. GRE academic prose may use the less everyday sense: qualify=limit, pedestrian=ordinary, intimate=suggest, sanction=approve or penalize by context.",
    "Learn trap words contrastively: everyday meaning / academic meaning / one sentence for each. A single flashcard definition is insufficient.",
    "Syntax often disambiguates sense. “Qualify the conclusion” signals modify/limit; “qualify for admission” signals meet requirements.",
    "Collocations are clues: “arrest attention,” “brook no dissent,” “exact a price,” “table a motion,” “temper a claim.” Store common phrase patterns.",
    "Do not overcorrect and always choose the rare meaning. Context decides; GRE is not trying to trick you arbitrarily.",
    "Your personal error log should flag “familiar word, wrong sense” separately because the fix is dual-definition retrieval, not learning a new word from scratch."
  ],
  "v-connotation": [
    "Denotation is core meaning; connotation is evaluative/emotional coloring. Frugal can be approving, parsimonious/miserly pejorative; confident can become presumptuous at higher negative intensity.",
    "Build intensity ladders as approximate networks, not rigid scales. annoyed→irate→furious and praise→laud→extol help discriminate choices when context signals degree.",
    "Register matters: GRE prose is formal/academic. A choice can be semantically possible but stylistically awkward or colloquial relative to the sentence.",
    "Valence—positive, negative, neutral—provides useful partial knowledge. If contrast demands praise, a known-negative word can be eliminated even if you cannot define every option.",
    "Connotation often encodes author stance: “tenacious” may admire persistence while “obstinate” criticizes refusal to change. Same behavior, different judgment.",
    "Learn synonym families with differences, not just lists. Ask what feature makes two neighboring words non-interchangeable."
  ],
  "v-rhetorical-role": [
    "Label sentences by job: background, claim, evidence, example, definition, concession, objection, rebuttal, mechanism, implication, transition, or question.",
    "Function is relational: a historical case is “evidence” only for a particular claim; the same sentence may be an example of one idea and a counterexample to another.",
    "Prompts asking why the author mentions X demand the argumentative role, not a paraphrase of X’s content.",
    "Paragraph roles often form an argument sequence: conventional view → problem → new evidence → revised view. This map predicts main purpose and reduces rereading.",
    "Concession markers (“admittedly,” “to be sure”) often introduce a point the author accepts before limiting it. Do not mistake conceded opposition for thesis.",
    "In select-in-passage, choose the exact sentence doing the requested job. A neighboring sentence on the same topic may still be wrong."
  ],
  "v-assumption": [
    "An assumption is an unstated proposition the reasoning needs. Separate premise and conclusion, then ask what must be true for the evidence to make the conclusion more credible.",
    "Negation test: negate a candidate necessary assumption. If the argument’s support collapses or connection becomes irrelevant, the original candidate was required.",
    "Common assumption families: representative sample, reliable measurement, no decisive confounder, future resembles past, proxy tracks target, proposed action causes intended outcome.",
    "Necessary does not mean sufficient. An assumption can be required yet far from proving the conclusion by itself.",
    "Do not choose a statement merely because it strengthens the argument. If the argument could survive its negation, it is not necessary.",
    "For passage-author assumptions, remain text-bound. The author need only presuppose what their actual claim requires, not a broad worldview you associate with the topic."
  ],
  "v-strengthen-weaken": [
    "Target the inferential gap. A strengthening choice can support a premise, confirm mechanism, rule out alternatives, improve sample relevance, or connect evidence to conclusion.",
    "A weakening choice can introduce a confounder, reverse causation, measurement problem, exception, incompatible evidence, or reason the plan will not produce the intended result.",
    "Relevance test: explicitly state “If this is true, the conclusion becomes more/less likely because ___.” If you cannot fill the because clause, the choice is probably topical noise.",
    "Causal arguments are especially vulnerable to alternative explanations. Temporal order and controlled comparisons are high-value strengthening information.",
    "No answer needs to prove/disprove with certainty unless wording asks that. Choose the fact that changes confidence most strongly among choices.",
    "Watch scope: evidence about a different group/time or a side effect unrelated to the conclusion may sound important while leaving the target claim untouched."
  ],
  "v-paradox": [
    "Resolve-the-discrepancy questions treat both surprising facts as true. Your task is to add a fact that removes the apparent contradiction.",
    "State the tension explicitly: expected X because A, yet observed not-X. Then search for different subgroups, denominators, time lags, hidden costs, or opposing mechanisms.",
    "Do not pick an answer that explains only one side; it must connect both facts or show why they can coexist.",
    "Composition effects are common: overall average can change even when subgroup behavior moves differently because subgroup weights changed.",
    "Timing can resolve apparent conflict: a policy may cause a short-term decrease and long-term increase, or measured outcomes may lag the cause.",
    "After inserting a choice, retell the paradox. If the surprise remains equally strong, the choice did not resolve it."
  ],
  "v-rc-inference-hard": [
    "Hard inference often combines two small claims rather than hiding a fact. Translate each relevant sentence into propositions and combine only where their scopes permit.",
    "Prefer the weakest statement that must/strongly follow. GRE distractors inflate possibility into certainty or correlation into causation.",
    "Counterexample test is powerful: construct a world satisfying the passage where the answer is false. Easy counterexample means insufficient support.",
    "Inference can be about author attitude, future expectation, category membership, or logical consequence—not just factual details.",
    "Negative evidence is nuanced: “none of the sampled sites contained X” supports a claim about the sample, not necessarily every site in existence.",
    "When evidence is incomplete, answers using may/could/suggests often better match the epistemic status than categorical claims, but wording alone never guarantees correctness."
  ],
  "v-science-passages": [
    "Compress technical content into phenomenon → hypothesis → prediction → experiment/observation → result → interpretation → limitation. Names are labels; relationships are the testable structure.",
    "Distinguish observation from causal experiment. Correlation, comparison groups, interventions, and controls imply different evidential strength.",
    "Mechanism verbs matter: associated with, causes, inhibits, necessary, sufficient, mediates, catalyzes. Do not upgrade one relationship into another.",
    "When two models compete, map which observation each explains and which prediction separates them. GRE questions often ask why evidence favors one account.",
    "Unknown terms should be symbolized (Protein X, process Y) rather than researched mentally. ETS passages are designed not to require specialized subject knowledge.",
    "Figures/data described in prose should be treated exactly like argument evidence: ask what changed, compared with what, and whether the author regards it as decisive or suggestive."
  ],
  "v-humanities-passages": [
    "Humanities passages often debate interpretation rather than objective chronology. Track critic/school A, critic B, evidence each uses, and author’s evaluation.",
    "Texts, archival records, style, artifacts, and reception can function as evidence. Ask what interpretation each piece is supposed to support.",
    "Attribution is crucial: “Scholar X contends…” is not author endorsement. Look for later verbs/adjectives that indicate distance, criticism, or qualified acceptance.",
    "A new interpretation may revise rather than completely overturn an old one. Main-purpose distractors often exaggerate a nuanced scholarly disagreement.",
    "Historical context can be background or causal explanation; literary example can illustrate a claim or challenge a school. Label role, not just content.",
    "Do not let familiarity with an author/history topic import outside facts. Treat the passage as the complete evidence universe for GRE questions."
  ],
  "v-social-passages": [
    "Identify unit of analysis: individuals, firms, cities, countries, institutions, periods. Generalizing across levels can create ecological or aggregation errors.",
    "Study design matters: volunteers vs representative samples, before/after vs control groups, omitted variables, operational definitions, and incentives.",
    "Distinguish descriptive (“what”), causal (“why”), and normative (“what should”). Evidence supporting one does not automatically support the others.",
    "Business/economic terms can usually be understood from ordinary relationships: price, quantity, costs, incentives, productivity, risk. Use definitions supplied by passage.",
    "Policy passages often weigh tradeoffs and heterogeneous effects. A policy can help one group, hurt another, or work under some institutional conditions only.",
    "When a passage compares studies, note differences in sample, method, timeframe, and outcome measure; those often explain apparently conflicting results."
  ],
  "v-reading-lab": [
    "Daily 20–40 minutes of demanding nonfiction is useful only if active. After each paragraph note role; after the piece reconstruct thesis, evidence, qualification, and author stance from memory.",
    "Rotate domains: natural science, social science/business, history/arts/humanities, argument/commentary. GRE comfort must transfer across unfamiliar subjects.",
    "Practice paraphrasing one dense sentence per session by extracting grammatical spine, then restoring qualifiers. This directly trains GRE syntactic control.",
    "Collect only high-value unknown words. Guess from context first, verify, then record meaning/connotation/collocation; do not turn reading into endless dictionary interruption.",
    "Close the article before summarizing. Retrieval exposes whether you understood structure or only felt familiar while looking at the text.",
    "Time some sessions: gradually reduce rereading while preserving accurate maps. Speed should emerge from structural fluency, not skimming without comprehension."
  ],
  "v-trap-taxonomy": [
    "RC scope traps: answer expands beyond the population/time/topic actually discussed or narrows a broad thesis to one supporting example.",
    "Certainty traps: passage says may/some/suggests while answer says must/all/proves. One word can make a choice wrong.",
    "Viewpoint traps: true claim from a critic/researcher is attributed to author, or a historical view is presented as current conclusion.",
    "Relationship traps: cause/effect reversed, evidence/conclusion reversed, chronology reversed, comparison direction flipped.",
    "True-but-irrelevant and half-right/half-wrong choices exploit recognition. Every clause of an answer and its relevance to the question must survive.",
    "TC/SE trap taxonomy: right semantic field wrong direction, right direction wrong degree, synonym-pair bait, rare-word intimidation, and local fit/global incoherence."
  ],
  "a-format": [
    "The current GRE Analytical Writing measure is one 30-minute Analyze an Issue task, administered first. Do not spend preparation time on the old Analyze an Argument task unless you are using it for general writing practice.",
    "The prompt contains a statement and a specific instruction. Your response is judged against that instruction, so “write about the topic” is insufficient.",
    "No specialist subject knowledge is required. Historical, scientific, social, institutional, personal, or hypothetical examples are useful only insofar as they support the reasoning accurately.",
    "The test editor is intentionally basic; plan for no grammar/spell-check assistance. Your revision system must catch your own recurring mechanical errors.",
    "AWA is scored separately from 130–170 Verbal/Quant. A perfect 340 does not imply a 6.0 essay, so writing needs its own deliberate practice.",
    "Use the published ETS Issue topic pool for authentic prompt variety and GRE Atlas for skills/original practice. Avoid memorizing full essays because instructions and claims vary."
  ],
  "a-task": [
    "Read directive and statement separately. A prompt may ask extent of agreement, conditions under which a recommendation works, consequences, competing views, or what questions must be considered.",
    "Underline the logical task in your plan: “agree/disagree + reasons,” “circumstances,” “consequences,” or “evaluate recommendation.” Build the thesis to answer that exact verb phrase.",
    "A generic five-paragraph opinion can be well written yet underperform if it ignores the directive. Task compliance is the first constraint on every paragraph.",
    "Generate both a default rule and at least one meaningful boundary condition. This produces depth without becoming indecisive.",
    "Distinguish descriptive claims from normative recommendations. If the prompt says what institutions should do, your reasons should connect outcomes/values to the recommendation.",
    "Restate the issue in your own conceptual language rather than copying the prompt. This forces interpretation and reduces canned introductions."
  ],
  "a-structure": [
    "A reliable 6.0-oriented architecture is: concise context + nuanced thesis; two deeply reasoned body paragraphs; one counterpressure/condition paragraph; synthesis conclusion. It is a scaffold, not a mandatory template.",
    "Each body paragraph should have claim → warrant/mechanism → concrete support → explicit link to thesis. Missing the warrant is the most common form of shallow “example dumping.”",
    "Topic sentences should advance distinct reasons, not paraphrase the thesis. If paragraphs can be swapped without changing the argument, their logical roles may be underdeveloped.",
    "Transitions should name relationships: concession, consequence, contrast, example, qualification, extension. Decorative “firstly/secondly” cannot substitute for logical continuity.",
    "Counterargument can appear as a dedicated paragraph or integrated qualification. Its purpose is to test and refine the thesis, not merely display “both sides.”",
    "The conclusion should synthesize the governing principle and limits. Do not spend precious time introducing a new example or repeating the introduction verbatim."
  ],
  "a-rubric": [
    "A 6-level response is characterized by insightful/cogent analysis, compelling development, sustained focus and organization, precise/fluent language, sentence variety, and strong command of standard written English.",
    "Length itself is not a criterion. More words help only if they create development; repetitive paragraphs and ornamental vocabulary can make a longer essay worse.",
    "Minor errors are compatible with a top response when they do not interfere with meaning. Persistent sentence-boundary, agreement, or clarity errors are much more damaging.",
    "Score yourself by dimensions rather than one vague number: task compliance, thesis quality, reasoning depth, example development, counterpressure, organization, style, grammar/mechanics.",
    "“Compelling examples” means examples are relevant and explained. A prestigious historical reference with no mechanism is weaker than a simple hypothetical analyzed precisely.",
    "Use rubric language diagnostically after every essay. Your next practice goal should target the lowest repeated dimension, not simply “write another essay.”"
  ],
  "a-timing": [
    "A strong default split is roughly 4–5 minutes planning, 21–23 drafting, 2–4 revision. Adjust from evidence, but never spend 30 minutes improvising without a thesis map.",
    "Planning output should be compact: thesis, 2–3 reasons, example/mechanism for each, strongest counterargument/condition. Full sentences during planning waste time.",
    "If idea generation stalls, use lenses—stakeholders, incentives, information, fairness, short/long term, scale, unintended consequences—to create distinct reasons quickly.",
    "Drafting pace should protect completion. A brilliant first body paragraph cannot compensate for an unfinished essay; use section time checkpoints during practice.",
    "Revision priority: argument contradiction/incomplete thought → sentence clarity → repeated grammar/spelling → precision. Do not rewrite whole paragraphs at minute 29.",
    "Practice timed outlines separately. If you can produce a strong argument skeleton in four minutes, full essays become much more controlled."
  ],
  "a-reasoning": [
    "The warrant is the hidden middle between claim and evidence. Ask “why would this example make my claim more likely?” and write the causal/logical mechanism explicitly.",
    "A useful paragraph often has multiple links: policy changes incentive → actors alter behavior → behavior changes outcome → outcome matters to thesis value. Skipping links produces assertion.",
    "Distinguish causal evidence, analogy, principle, and example. Each supports claims differently and has different limitations.",
    "Use “This matters because…” as a diagnostic sentence after an example. If it merely repeats the claim, the reasoning needs another step.",
    "Qualify causal claims when evidence could have alternative explanations. Intellectual precision is stronger than overclaiming.",
    "When a reason is abstract—freedom, fairness, efficiency—define what it means operationally in this context and explain the tradeoff it resolves."
  ],
  "a-counter": [
    "Steelman the strongest reasonable objection, not a caricature. A credible opposing mechanism makes your response demonstrate real analytical control.",
    "Concede precisely: acknowledge what the objection proves and no more. “This concern is strongest when X” is more useful than abandoning the thesis.",
    "Respond by showing boundary, relative weight, mitigation, or changed condition. You do not have to “defeat” every objection absolutely.",
    "A counterargument can strengthen your thesis by revealing the principle that separates ordinary from exceptional cases.",
    "Avoid mechanical “some may say…” paragraphs with no substance. Name the stakeholder/value/mechanism that creates actual pressure on your position.",
    "If the prompt explicitly asks for circumstances, counterpressure is not optional decoration; it is central task compliance."
  ],
  "a-examples": [
    "Relevance beats prestige. Choose an example you can explain accurately and connect directly to the mechanism rather than name-dropping famous events.",
    "Build examples as context → action/condition → mechanism → consequence → thesis link. This structure turns narrative into evidence.",
    "If exact facts are uncertain, generalize rather than fabricate dates, statistics, or quotations. AWA rewards reasoning, not trivia recall.",
    "Hypotheticals are legitimate when realistic and analytically precise. They can isolate a causal mechanism better than a vague historical anecdote.",
    "Diversify examples across contexts when useful—individual/institution, public/private, short/long term—to demonstrate that a principle transfers or has limits.",
    "One example can support multiple sentences of reasoning. Two deeply developed examples usually outperform five examples listed in one sentence each."
  ],
  "a-style": [
    "Precision is more valuable than rarity. Use an advanced word only when you own its meaning and collocation; misused GRE vocabulary harms clarity and credibility.",
    "Vary sentence structure deliberately: concise claim, longer causal sentence, controlled concession. Variety should serve emphasis and relationship, not complexity for its own sake.",
    "High-impact grammar checks: subject–verb agreement, pronoun reference, tense consistency, fragments, run-ons/comma splices, modifiers, parallelism, apostrophes, repeated spelling errors.",
    "Transitions should encode logic: however contrast, therefore consequence, for example illustration, admittedly concession, more importantly priority. Do not use them interchangeably.",
    "Avoid vague placeholders such as things, a lot, good, bad when a more exact noun/verb exists. Precision reduces word count while increasing analysis.",
    "Read one difficult sentence aloud mentally during revision. If the main clause disappears under stacked modifiers, split it rather than trusting sophistication."
  ],
  "a-practice": [
    "Use three practice modes: 4–5 minute outlines for idea generation; untimed rewrites for reasoning/style repair; full 30-minute essays for execution. Each trains a different bottleneck.",
    "After writing, annotate the essay: thesis, paragraph claims, warrants, examples, counterpressure, transitions. Unlabelable sentences are often unfocused.",
    "Keep a recurring-error ledger separate from score: vague thesis, undeveloped examples, paragraph drift, comma splices, repetition, weak counterargument, late conclusion.",
    "Rewrite only the weakest paragraph after review, then compare versions. Targeted revision teaches more than immediately discarding the essay and writing another.",
    "Build an idea bank of principles/examples you genuinely understand, not memorized prose. Flexible knowledge reduces planning time while preserving authenticity.",
    "Retest the same weakness under time a few days later. A lesson is learned only when the repaired behavior survives pressure and delay."
  ],
  "a-nuance": [
    "Nuance is a clear rule plus meaningful conditions, not “both sides are right.” State what you generally believe and the mechanism that creates exceptions.",
    "Useful distinctions include short vs long term, individuals vs institutions, normal vs crisis conditions, discovery vs implementation, local vs national scale, reversible vs irreversible decisions.",
    "Qualification should narrow your claim to what you can defend. Overly absolute theses create easy counterexamples and force shallow rebuttals.",
    "A nuanced thesis can still be decisive: “Generally X because A/B; however under C, Y better protects value D.” The reader knows your hierarchy.",
    "Revisit qualification in the conclusion so the essay’s complexity feels intentional rather than a mid-essay retreat.",
    "Practice turning absolute prompt statements into a matrix of conditions. This produces paragraphs faster than brainstorming unrelated examples."
  ],
  "a-example-depth": [
    "An example is not self-explanatory. Explicitly identify what feature of the example maps onto your claim and why that feature causes or illustrates the outcome.",
    "Prefer mechanism-rich details—actors, incentives, constraints, decisions, consequences—over decorative chronology and names.",
    "Contrastive examples are powerful: one case where principle works, another where changed condition reverses result. The contrast itself creates analysis.",
    "If using a personal/hypothetical example, scale its lesson carefully. Explain why the underlying mechanism generalizes rather than claiming one anecdote proves a universal rule.",
    "Avoid false precision. “A major public-health campaign” can be safer than an invented 37% statistic, and the argument can remain compelling.",
    "After each example, ask what alternative explanation or limitation exists. Addressing it briefly can elevate the paragraph from illustration to analysis."
  ],
  "a-revision": [
    "First scan for logical damage: sentence contradicts thesis, unsupported universal claim, missing link, paragraph that never answers prompt. Content repair outranks punctuation polish.",
    "Second scan sentence boundaries and clarity: fragments, run-ons, pronoun ambiguity, missing words, modifier attachment, subject–verb agreement.",
    "Third scan precision/repetition: replace vague nouns/verbs, remove redundant phrases, vary repeated sentence openings where easy.",
    "Use a personal mechanical checklist based on your own error history. Three known recurring errors are more useful than trying to inspect every grammar rule in three minutes.",
    "Do not introduce a new risky word during revision merely to sound advanced. Revision should reduce variance, not create it.",
    "End with the introduction/thesis and conclusion: make sure the final position matches what the body actually argued after any mid-draft qualification."
  ],
  "a-idea-bank": [
    "Incentives: how does a rule change costs, rewards, effort, risk, or strategic behavior? This lens is useful for education, policy, business, technology, and institutions.",
    "Information/knowledge: who knows what, how reliable is the evidence, and can centralized decision-makers access local expertise? Useful for experts, governance, science, and media prompts.",
    "Fairness/distribution: who gains, who pays, whether equal treatment creates unequal outcomes, and whether vulnerable groups bear disproportionate risk.",
    "Institutional capacity: even a good principle can fail if organizations lack enforcement, resources, competence, or accountability. Separate design from implementation.",
    "Innovation/adaptation: experimentation can create learning but also risk; reversible errors differ from catastrophic irreversible ones.",
    "Time/scale: short-run benefit may create long-run cost; local success may fail nationally; individual behavior may not aggregate. These distinctions generate sophisticated conditions quickly."
  ],
  "s-structure": [
    "The current shorter GRE is about 1 hour 58 minutes: AWA first (one 30-minute Issue task), plus two Verbal and two Quant sections.",
    "Verbal: 12 questions/18 minutes then 15/23. Quant: 12/21 then 15/26. The exact order of Verbal/Quant sections after AWA can vary.",
    "Verbal and Quant are each scored 130–170 in one-point increments; AWA is 0–6 in half-point increments.",
    "Verbal and Quant are section-level adaptive: first section performance affects difficulty of the second section in that measure.",
    "Within a section you can skip, mark, return, and change answers while time remains. Build pacing around that freedom rather than treating the section as strictly linear.",
    "There is no subtraction for incorrect Verbal/Quant answers, so every question should have an answer before time expires."
  ],
  "s-timing": [
    "Average pacing is roughly 1:30 per Verbal question and 1:44–1:45 per Quant question, but question types vary. Use averages as checkpoints, not per-question commandments.",
    "Two-pass strategy: first secure accessible points and mark expensive items; second return with remaining time. The goal is expected score, not conquering questions in order.",
    "Define skip triggers during practice: no model after ~45–60 seconds, algebra exploding, RC 50/50 with no new evidence, or calculation that clearly exceeds value.",
    "Protect a final answer-completion buffer. With no wrong-answer penalty, unanswered questions are the only guaranteed zeroes.",
    "Section 1 deserves accuracy because of adaptation, but overprotecting it by spending four minutes on one item can create more misses. Triage still applies.",
    "Analyze timing by question family after mocks: slow-correct can be as important a training signal as wrong. Speed problems often come from method choice, not arithmetic ability."
  ],
  "s-calculator": [
    "The on-screen calculator is a computation tool, not a reasoning strategy. Most GRE Quant becomes faster after simplifying, estimating, factoring, or canceling first.",
    "Use it for tedious multi-digit arithmetic, square roots, or verification when manual calculation would consume attention. Avoid opening it for 20×5 or simple fractions.",
    "Estimate sign and magnitude before pressing equals. A result far from expectation signals entry/setup error immediately.",
    "Calculator use has overhead: opening, mouse/keyboard entry, reading display, transferring result. Practice when that overhead is worthwhile.",
    "Do not let decimals erase exact structure. Fractions, radicals, and π are often easier to compare symbolically and avoid rounding.",
    "In DI, calculator helps repeated percent calculations, but the hard part is usually choosing correct values/denominator. Verify model before computation."
  ],
  "s-review": [
    "Mark questions you can plausibly improve, not every uncertainty. A useful mark has a reason: unresolved setup, calculation to verify, 50/50 with evidence location known.",
    "Change an answer when you find specific new evidence or a flaw in prior reasoning. Anxiety alone is not evidence.",
    "On final review, prioritize unanswered first, then marked questions with clear next action, then quick mechanical checks. Do not reread every solved question.",
    "For Quant, check target quantity, units, sign, and whether you answered x versus x² or percent versus amount. For Verbal, recheck task word and strongest scope term.",
    "If a problem was guessed due to time, fill an answer immediately before marking so a sudden timeout cannot leave it blank.",
    "Mock analysis should record whether review actually changed answers beneficially. Your personal data can refine how aggressively you revisit."
  ],
  "s-mocks": [
    "Official POWERPREP is calibration material, not an endless question bank. Use simulations at meaningful checkpoints so each one tests a block of preparation.",
    "Replicate conditions: no pausing, realistic start time/setup, no phone, authentic section timing, scratch process, and no answer checking mid-test.",
    "Classify every miss or lucky guess: concept, reasoning/model, execution/careless, time/strategy, vocabulary. The category determines the repair.",
    "For each error, locate the earliest preventable decision—not only the final wrong step. “I chose the wrong formula” may really begin with misreading units.",
    "Review should take at least as seriously as the mock itself. Re-solve cold, articulate correct method, analyze tempting distractor, and schedule delayed retest.",
    "Trend process metrics alongside scores: first-pass completion, marked count, slow-correct items, careless misses, vocab misses, section-end guesses. Scaled score alone hides causes."
  ],
  "s-scratch": [
    "Good scratchwork externalizes constraints and decisions, not the entire prompt. Write variable definitions, equations, sign/domain restrictions, units, and critical cases.",
    "Keep each Quant problem in its own visual zone. Crowded overlapping arithmetic creates so-called “careless” errors that are actually information-layout failures.",
    "Circle/box the requested quantity before final answer. Many GRE misses solve a related intermediate variable correctly then answer the wrong target.",
    "QC scratch can be a tiny table of tested values and A/B outcomes; this prevents confusing which case produced which relationship.",
    "RC scratch should be paragraph roles/viewpoints, not copied sentences. P1 old view / P2 problem / P3 new account is enough to navigate.",
    "AWA planning scratch should be thesis, body claims, examples/mechanisms, countercondition. Full prose belongs in the editor, not the plan."
  ],
  "s-testday": [
    "In the final week, preserve proven routines. Do not introduce a new pacing philosophy, giant vocabulary list, or exhausting study volume because anxiety rises.",
    "Recheck current ETS ID, registration, test-center/at-home procedures, arrival/setup requirements, and permitted materials shortly before the test because logistics can change.",
    "Sleep and wake timing should approximate test-day schedule for several days if possible. Cognitive consistency is more valuable than one late-night cram session.",
    "Use a brief warm-up of familiar material, not a scored mini-mock that can damage confidence. Arrive mentally activated, not fatigued.",
    "During the exam, reset at each section. One unusually hard/easy item is not reliable evidence of performance or adaptive path; continue executing your rules.",
    "Answer every Verbal/Quant question, use mark/review deliberately, and let the clock—not emotion—trigger triage decisions."
  ],
  "s-adaptive-deep": [
    "Adaptation occurs between sections, not question-by-question. First section in a measure is average difficulty; performance determines the difficulty of that measure’s second section.",
    "Do not try to reverse-engineer the algorithm from how a question feels. Perceived difficulty is noisy and thinking about it consumes working memory.",
    "Maximize correct answers under normal triage. Intentionally missing easier questions or refusing to skip a time sink cannot improve the scoring objective.",
    "Accuracy in section 1 matters, but time still has opportunity cost. A four-minute battle can cost multiple other questions and harm both raw performance and adaptive path.",
    "A hard-feeling section 2 can be consistent with strong section 1 performance, but it is not a score report. Execute identically regardless of perceived difficulty.",
    "Practice complete section pairs sometimes, not only isolated sets, so pacing and emotional response to changing difficulty become automatic."
  ],
  "s-error-budget": [
    "At 165→170 territory, many losses are process variance rather than missing syllabus: misread qualifier, sign, denominator, illegal assumption, wrong target, or premature verbal selection.",
    "Track error rates across several timed sets by category. One correct hard question does not establish reliability; repeated low-variance execution does.",
    "Lucky guesses are unresolved errors because the process could fail next time. Log them with the same seriousness as wrong answers.",
    "Create a prevention rule for each recurring cause: “write denominator,” “test negative/fraction,” “name speaker,” “predict before choices,” “circle target.” Rules must be observable actions.",
    "Repair with targeted repetition, then mixed transfer, then delayed timed retest. Only the final stage demonstrates that the new behavior survived context change.",
    "A perfect-score target needs an error budget mindset without perfectionism during learning: errors are expected in practice, but unresolved recurring errors are unacceptable."
  ],
  "s-masterygates": [
    "Gate 1—explain: without notes, state concept/strategy and one common trap/counterexample. Recognition while reading is not retrieval.",
    "Gate 2—execute: solve several representative items accurately untimed, including at least one variant that changes surface form.",
    "Gate 3—transfer: identify the skill inside mixed practice where no chapter title tells you which method to use.",
    "Gate 4—speed: solve under realistic time without sacrificing setup quality or evidence checking.",
    "Gate 5—retain: retest after days/weeks. Delayed retrieval is the strongest evidence that mastery will be available on test day.",
    "The site’s “mastered” button is a navigation/progress marker. Your practice accuracy, error recurrence, and delayed performance are the real mastery evidence."
  ],
  "s-final-calibration": [
    "Use official simulations late enough to measure integrated skill but early enough to repair. Space them; do not burn all high-fidelity tests in one anxious week.",
    "Replicate the complete current exam order/timing and environment. Calibration is invalid if you pause, look up answers, extend breaks, or multitask.",
    "After each mock, convert outcomes into a training prescription: two highest recurring error mechanisms, one pacing issue, one content cluster, one writing weakness.",
    "In the final 7–10 days, shift from acquisition to consolidation: mixed retrieval, vocabulary reviews, error rules, one or two controlled simulations/sections, and sleep consistency.",
    "Use confidence intervals mentally: a single score can vary. Trust a pattern across multiple official/high-fidelity performances more than one unusually good/bad day.",
    "Finish preparation with a test-day playbook: section checkpoints, skip rule, calculator rule, AWA time split, reset cue, and logistics checklist. No decisions should be invented under stress."
  ]
};

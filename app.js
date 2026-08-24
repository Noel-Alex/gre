const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const STORAGE_KEY = 'gre-atlas-state-v1';
// Storage can throw in private browsing, when cookies/site data are blocked, or when
// quota is exhausted. Never let that kill the app: fall back to in-memory storage.
const safeStorage = (() => {
  let mem = null, usable = null;
  const probe = () => {
    if (usable !== null) return usable;
    try { const t='__gre_probe__'; localStorage.setItem(t,'1'); localStorage.removeItem(t); usable = true; }
    catch(e){ usable = false; }
    return usable;
  };
  return {
    get(){ if(!probe()) return mem; try{ return localStorage.getItem(STORAGE_KEY); }catch(e){ return mem; } },
    set(v){ mem = v; if(!probe()) return; try{ localStorage.setItem(STORAGE_KEY,v); }catch(e){} },
    del(){ mem = null; if(!probe()) return; try{ localStorage.removeItem(STORAGE_KEY); }catch(e){} },
    persistent(){ return probe(); }
  };
})();
const pad2 = n => String(n).padStart(2,'0');
const todayISO = () => { const x=new Date(); return `${x.getFullYear()}-${pad2(x.getMonth()+1)}-${pad2(x.getDate())}`; };
const addDays = (d,n) => { const x=new Date(d); x.setDate(x.getDate()+n); return x; };
const parseLocalDate = s => { if(!s||!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null; const [y,m,d]=s.split('-').map(Number); const x=new Date(y,m-1,d,12); return isNaN(x.getTime())?null:x; };
const fmtDate = d => { const x = d instanceof Date ? d : parseLocalDate(d)||new Date(d); return x&&isNaN(x.getTime())?'—':new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric',year:'numeric'}).format(x); };
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a};

const defaultState = {
  created: Date.now(), examDate:'', hoursWeek:10, targetQ:170,targetV:170,targetAWA:6,
  completed:{}, mastery:{}, notes:{}, xp:0, streak:1,lastStudy:todayISO(),lastRoute:'dashboard',
  diag:null, errors:[], mocks:[], vocab:{}, vocabDefs:{}, customWords:[], essayDraft:'', essayPrompt:0,
  essays:{}, drillStats:{attempts:0,correct:0,days:{}}, quizLog:[], settings:{night:false, compact:false}, activity:[]
};
function migrateState(s){
  // v2: per-prompt essay drafts replace the single shared draft (which "Another prompt" used to wipe)
  if(!s.essays){
    s.essays={};
    if(s.essayPrompt!=null&&s.essayDraft) s.essays[s.essayPrompt]={text:s.essayDraft,date:s.created||Date.now()};
    else if(s.essayDraft) s.essays[0]={text:s.essayDraft,date:s.created||Date.now()};
  }
  if(!s.drillStats)s.drillStats={attempts:0,correct:0,days:{}};
  if(!s.quizLog)s.quizLog=[];
  return s;
}
let state = migrateState(loadState());
function loadState(){
  const raw = safeStorage.get();
  let parsed = null;
  try{ parsed = raw ? JSON.parse(raw) : null; }catch(e){ parsed = null; }
  if(!parsed || typeof parsed!=='object' || Array.isArray(parsed)) return {...defaultState};
  // Coerce corrupted/legacy shapes so renderers can never hit a missing array/object
  const s = {...defaultState, ...parsed};
  for(const k of ['errors','mocks','customWords','activity','quizLog']) if(!Array.isArray(s[k])) s[k]=defaultState[k]!==undefined?[...defaultState[k]]:[];
  for(const k of ['completed','mastery','notes','vocab','vocabDefs','essays']) if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k])) s[k]={};
  if(typeof s.settings!=='object'||!s.settings||Array.isArray(s.settings)) s.settings={...defaultState.settings};
  if(s.drillStats==null||typeof s.drillStats!=='object'){s.drillStats={attempts:0,correct:0,days:{}}}else if(!s.drillStats.days||typeof s.drillStats.days!=='object')s.drillStats.days={};
  return s;
}
function saveState(){ safeStorage.set(JSON.stringify(state)); updateChrome(); }
function logActivity(type,detail){state.activity.unshift({t:Date.now(),type,detail});state.activity=state.activity.slice(0,80);saveState();}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2200)}

const OFFICIAL = {
  structure:'https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html',
  content:'https://www.ets.org/gre/test-takers/general-test/prepare/content.html',
  quant:'https://www.ets.org/gre/test-takers/general-test/prepare/content/quantitative-reasoning.html',
  verbal:'https://www.ets.org/gre/test-takers/general-test/prepare/content/verbal-reasoning.html',
  writing:'https://www.ets.org/gre/test-takers/general-test/prepare/content/analytical-writing.html',
  scoring:'https://www.ets.org/gre/test-takers/general-test/scores/understand-scores.html',
  scoreScale:'https://www.ets.org/gre/test-takers/general-test/scores/get-scores.html',
  tips:'https://www.ets.org/gre/test-takers/general-test/prepare/strategies-tips.html',
  khan:'https://www.ets.org/gre/test-takers/general-test/prepare/khan-prep-videos.html',
  issue:'https://www.ets.org/gre/test-takers/general-test/prepare/content/analytical-writing/issue.html',
  awaScore:'https://www.ets.org/gre/test-takers/general-test/prepare/content/analytical-writing/scoring.html',
  prep:'https://www.ets.org/gre/test-takers/general-test/prepare.html',
  powerprep:'https://www.ets.org/gre/test-takers/general-test/prepare/powerprep.html'
};

const MODULES = {
  quant:{name:'Quantitative Reasoning',letter:'Q',klass:'quant',desc:'Arithmetic, algebra, geometry, data analysis, and the logic of solving under GRE constraints.'},
  verbal:{name:'Verbal Reasoning',letter:'V',klass:'verbal',desc:'Reading comprehension, text completion, sentence equivalence, vocabulary, and argument reasoning.'},
  writing:{name:'Analytical Writing',letter:'A',klass:'writing',desc:'The 30-minute Analyze an Issue task: analysis, structure, examples, style, and timed execution.'},
  strategy:{name:'Test Strategy',letter:'S',klass:'strategy',desc:'Section-level adaptation, timing, guessing, review, calculator discipline, mock analysis, and test-day execution.'}
};

function topic(id,module,title,summary,sections,opts={}){
  return {id,module,title,summary,sections,minutes:opts.minutes||35,difficulty:opts.difficulty||'Core',visual:opts.visual||null,quiz:opts.quiz||[],tags:opts.tags||[]};
}

const TOPICS = [
// QUANT — ARITHMETIC
 topic('q-number-line','quant','Real numbers & the number line','Ordering, distance, signs, intervals, and the mental model behind many comparison problems',[
   ['What you must know',`GRE Quant uses real numbers unless a question explicitly says otherwise. Be fluent with positive/negative numbers, ordering, distance, intervals, and the fact that multiplying or dividing an inequality by a negative reverses the inequality sign.`],
   ['Core ideas',`A number's absolute value is its distance from 0, so it is never negative. Distance between numbers a and b is |a − b|. On the number line, values increase as you move right. Between any two distinct real numbers lie infinitely many real numbers.`],
   ['Perfect-score habits',`Translate words such as “at least,” “at most,” “between,” “no more than,” and “no less than” into inequalities before doing arithmetic. In Quantitative Comparison, test values from different sign regions whenever a variable is unrestricted.`]
 ],{visual:'numberline',quiz:[['If x < -3, which must be true?',['|x| > 3','x² < 9','1/x < -1/3','x+3 > 0'],0,'Any number left of −3 is more than 3 units from zero, so |x| > 3.']]}),
 topic('q-integers','quant','Integers, parity & sign logic','Odd/even behavior, positive/negative products, consecutive integers, and fast case analysis',[
   ['Integer structure',`Integers are ..., −2, −1, 0, 1, 2, ... . Zero is even. The sum of two integers is an integer; the quotient need not be. Consecutive integers differ by 1, consecutive even or odd integers differ by 2.`],
   ['Parity rules',`even ± even = even; odd ± odd = even; even ± odd = odd. A product is odd only when every integer factor is odd. A product is even if at least one integer factor is even.`],
   ['Sign rules',`A product or quotient with an even number of negative factors is positive; with an odd number, negative. For powers, a negative base raised to an even integer exponent is positive and to an odd integer exponent is negative.`],
   ['GRE trap',`Do not assume “positive” when the prompt says only “integer.” In QC, x² versus x depends dramatically on whether x<0, 0<x<1, x=1, or x>1.`]
 ],{quiz:[['If n is an odd integer, which is always even?',['n²','n(n+1)','n+2','3n'],1,'n and n+1 are consecutive, so one is even; their product is even.']]}),
 topic('q-factors','quant','Factors, multiples, primes & divisibility','Prime factorization, divisibility tests, divisor counting, GCF and LCM',[
   ['Prime factorization',`Every integer greater than 1 can be written uniquely as a product of primes apart from order. Prime numbers are integers greater than 1 with exactly two positive divisors. 1 is not prime.`],
   ['GCF and LCM',`For prime factorizations, GCF takes the smaller exponent of each shared prime; LCM takes the larger exponent of every prime present. For positive integers a and b: GCF(a,b) × LCM(a,b) = ab.`],
   ['Number of positive divisors',`If n = p^a q^b r^c ... then the number of positive divisors is (a+1)(b+1)(c+1)... . This is a high-value GRE shortcut.`],
   ['Divisibility checks',`Know 2,3,4,5,6,8,9,10,11. Example: divisible by 3 or 9 depends on the digit sum; divisible by 4 depends on the last two digits; by 8, the last three.`]
 ],{quiz:[['How many positive divisors does 72 have?',['8','10','12','16'],2,'72 = 2³×3², so the count is (3+1)(2+1)=12.']]}),
 topic('q-remainders','quant','Remainders & modular thinking','Division algorithm, cycles, last digits, and remainder constraints',[
   ['Division algorithm',`For integer n divided by positive integer d, n = dq + r where 0 ≤ r < d. A remainder can never equal or exceed the divisor.`],
   ['Modular language',`“n leaves remainder 3 when divided by 7” means n = 7k+3, or n ≡ 3 (mod 7). Rewriting in this form makes algebraic remainder problems much easier.`],
   ['Cycles',`Last digits of powers repeat in cycles. Instead of computing a huge power, identify the cycle length and reduce the exponent modulo that length.`],
   ['Perfect-score habit',`When multiple remainder conditions exist, list the smallest values satisfying one condition and test the other, unless a more direct algebraic route is obvious.`]
 ],{quiz:[['If n leaves remainder 4 when divided by 7, what remainder does 2n+3 leave when divided by 7?',['0','1','3','4'],3,'n≡4, so 2n+3≡8+3≡11≡4 (mod 7).']]}),
 topic('q-fractions','quant','Fractions, decimals & percent','Conversion fluency, percent change, reverse percent, repeated change, and comparison',[
   ['Fraction fluency',`Reduce before multiplying. To divide by a fraction, multiply by its reciprocal. To compare fractions, cross-multiply only when denominators are positive or use a common denominator.`],
   ['Percent language',`p% of x = (p/100)x. “A is what percent of B?” means 100A/B. “A is p% greater than B” means A=(1+p/100)B.`],
   ['Percent change',`Percent change = (new−old)/old ×100%. The denominator is the original amount. A 20% increase followed by a 20% decrease does not return to the original: 1.2×0.8=0.96.`],
   ['Reverse percent',`If a value after a 25% increase is 150, the original is 150/1.25, not 150−25% of 150.`]
 ],{quiz:[['A price rises 25% and then falls 20%. Relative to the original price, the final price is:',['5% lower','unchanged','5% higher','10% higher'],1,'1.25×0.80=1.00, so it returns exactly to the original.']]}),
 topic('q-ratio','quant','Ratios, proportions & variation','Part-part vs part-whole, scaling, direct/inverse variation, mixtures',[
   ['Ratios',`A ratio a:b means a/b. If boys:girls=3:5, total parts=8; boys are 3/8 of the group, not 3/5.`],
   ['Proportions',`a/b=c/d implies ad=bc when denominators are nonzero. Scaling a recipe, map, or similar figure often reduces to proportional reasoning.`],
   ['Variation',`Direct variation: y=kx. Inverse variation: y=k/x. Joint variation combines factors, e.g. z=kxy.`],
   ['Mixtures',`Use amount of pure component = concentration × total amount. Track the component you care about, not merely total volume.`]
 ],{quiz:[['If x varies inversely with y and x=6 when y=4, what is x when y=9?',['8/3','3','13.5','54'],0,'xy=k=24, so x=24/9=8/3.']]}),
 topic('q-rates','quant','Rates, work & motion','Unit rates, distance-rate-time, average speed, combined work, and unit conversion',[
   ['Motion',`distance = rate × time. Keep units consistent. When equal distances are traveled at two speeds, average speed is not usually the arithmetic mean.`],
   ['Average speed',`Average speed = total distance / total time. If equal distances are traveled at a and b, the average speed is 2ab/(a+b).`],
   ['Work',`If A completes a job in a hours, A's rate is 1/a job per hour. Add rates when workers act simultaneously.`],
   ['Units',`Write units beside quantities until the setup is complete. Dimensional consistency catches many mistakes before calculation.`]
 ],{quiz:[['A does a job in 6 h and B in 3 h. Working together, how long?',['1.5 h','2 h','2.5 h','4.5 h'],1,'Combined rate =1/6+1/3=1/2 job per hour, so time=2 h.']]}),
 topic('q-exponents','quant','Exponents, roots & radicals','Exponent laws, fractional exponents, radicals, squares, and magnitude traps',[
   ['Exponent laws',`For nonzero a: a^m a^n=a^(m+n), a^m/a^n=a^(m−n), (a^m)^n=a^(mn), a^0=1, a^(−n)=1/a^n.`],
   ['Roots',`√(a²)=|a|, not automatically a. This absolute-value detail is a classic trap. For real numbers, an even root requires a nonnegative radicand.`],
   ['Fractional exponents',`a^(m/n) is the nth root of a^m when defined. Convert between radical and exponent notation freely.`],
   ['Comparison habit',`For 0<a<1, increasing a positive exponent makes the value smaller. For a>1 it makes the value larger.`]
 ],{quiz:[['For real x, √(x²) equals:',['x','−x','|x|','x²'],2,'Principal square roots are nonnegative, so √(x²)=|x|.']]}),
 topic('q-absolute','quant','Absolute value & distance equations','Piecewise thinking, distance interpretation, equations and inequalities',[
   ['Distance model',`|x−a| is the distance from x to a. So |x−a|=d gives x=a±d for d≥0.`],
   ['Inequalities',`|x−a|<d means x lies inside an interval: a−d<x<a+d. |x−a|>d means x lies outside: x<a−d or x>a+d.`],
   ['Case splitting',`If an expression inside absolute value can change sign, split into sign cases only when necessary. Often the geometric distance interpretation is faster.`]
 ],{quiz:[['How many real solutions does |2x−5|=7 have?',['0','1','2','infinitely many'],2,'2x−5=7 or −7, giving x=6 or x=−1.']]}),
 topic('q-sequences','quant','Sequences & patterns','Arithmetic and geometric sequences, recursive patterns, sums, and cycle spotting',[
   ['Arithmetic sequence',`Common difference d. nth term: a_n=a_1+(n−1)d. Sum: n(a_1+a_n)/2.`],
   ['Geometric sequence',`Common ratio r. nth term: a_n=a_1 r^(n−1). For finite sum with r≠1: a_1(1−r^n)/(1−r).`],
   ['Pattern problems',`GRE often rewards pattern recognition more than formula memorization. Write the first few terms, inspect differences, ratios, parity, and repetition.`]
 ],{quiz:[['In an arithmetic sequence, a₁=7 and d=4. What is a₁₀?',['39','43','47','70'],1,'a₁₀=7+9×4=43.']]}),

// ALGEBRA
 topic('q-expressions','quant','Algebraic expressions & factoring','Simplification, identities, factoring patterns, rational expressions, and domain restrictions',[
   ['Operate structurally',`Combine like terms, factor common factors, and recognize identities: a²−b²=(a−b)(a+b); (a±b)²=a²±2ab+b².`],
   ['Rational expressions',`Factor before canceling. You may cancel factors, not terms. Keep track of excluded values that make an original denominator zero.`],
   ['Substitution',`If a complicated repeated expression appears, substitute a new variable for it. GRE algebra is often testing structural recognition.`]
 ],{quiz:[['(x²−9)/(x−3), for x≠3, simplifies to:',['x−3','x+3','x²+3','1'],1,'x²−9=(x−3)(x+3); cancel the factor x−3.']]}),
 topic('q-linear','quant','Linear equations & word translation','Solving equations, translating phrases, proportions, and modeling',[
   ['Linear equations',`Collect variable terms on one side and constants on the other. Fractions are often easiest after multiplying through by the least common denominator.`],
   ['Translate carefully',`“5 less than x” = x−5. “5 less than twice x” = 2x−5. “x is 30% more than y” = x=1.3y.`],
   ['Model before solving',`Define variables with units, write the relationship, then solve. Many GRE errors happen in setup, not algebra.`]
 ],{quiz:[['Three less than twice x equals 17. x = ?',['7','8','10','20'],2,'2x−3=17 → 2x=20 → x=10.']]}),
 topic('q-inequalities','quant','Inequalities & ranges','Linear inequalities, sign reversal, interval reasoning, compound conditions',[
   ['Sign reversal',`Multiplying or dividing both sides by a negative reverses <, >, ≤, or ≥.`],
   ['Compound inequalities',`Treat a<x<b as two simultaneous conditions. “or” corresponds to a union of ranges; “and” to an intersection.`],
   ['QC strategy',`If the prompt gives a range, test endpoints conceptually and critical values where signs or order relationships change.`]
 ],{quiz:[['Solve −3x > 12.',['x>−4','x<−4','x>4','x<4'],1,'Divide by −3 and reverse the inequality: x<−4.']]}),
 topic('q-systems','quant','Systems of equations & inequalities','Substitution, elimination, intersections, and translating coupled conditions',[
   ['Two linear equations',`Use substitution when one variable is easy to isolate; use elimination when coefficients align. Graphically, a solution is an intersection point.`],
   ['No/infinitely many solutions',`Parallel distinct lines have no solution; equivalent equations represent the same line and have infinitely many.`],
   ['Word systems',`Mixtures, tickets, ages, and totals often create one equation for total quantity and another for total value.`]
 ],{quiz:[['x+y=11 and x−y=3. x = ?',['4','7','8','14'],1,'Add equations: 2x=14, so x=7.']]}),
 topic('q-quadratics','quant','Quadratics','Factoring, roots, discriminant intuition, vertex symmetry, and sign behavior',[
   ['Standard form',`ax²+bx+c=0. Factor when convenient; otherwise the quadratic formula gives x=[−b±√(b²−4ac)]/(2a).`],
   ['Discriminant',`b²−4ac >0 gives two distinct real roots; =0 one repeated real root; <0 no real roots.`],
   ['Root relationships',`For ax²+bx+c with roots r and s: r+s=−b/a and rs=c/a. This can be much faster than solving.`],
   ['Graph intuition',`A parabola opens upward if a>0 and downward if a<0. Axis of symmetry x=−b/(2a).`]
 ],{quiz:[['The roots of x²−7x+10=0 are:',['2 and 5','−2 and −5','1 and 10','3 and 4'],0,'Factor: (x−2)(x−5)=0.']]}),
 topic('q-functions','quant','Functions & notation','Inputs/outputs, composition, domain, range, transformations, and function graphs',[
   ['Notation',`f(x) is an output associated with input x; it is not multiplication. To find f(3), substitute 3 everywhere x appears.`],
   ['Composition',`f(g(x)) means evaluate g first, then use that result as the input to f.`],
   ['Domain',`Exclude inputs that create division by zero or invalid even roots. Context may also restrict domain, such as counts being nonnegative integers.`],
   ['Transformations',`f(x)+k shifts vertically; f(x−h) shifts right by h; −f(x) reflects over x-axis; f(−x) reflects over y-axis.`]
 ],{quiz:[['If f(x)=2x²−1, f(−3)=?',['−19','17','19','35'],1,'2(9)−1=17.']]}),
 topic('q-coordinate','quant','Coordinate geometry','Slope, lines, intercepts, distance, midpoint, regions, and graph interpretation',[
   ['Slope',`m=(y₂−y₁)/(x₂−x₁). Horizontal lines have slope 0; vertical lines have undefined slope.`],
   ['Line forms',`Slope-intercept y=mx+b. Point-slope y−y₁=m(x−x₁). Parallel nonvertical lines share slope; perpendicular slopes multiply to −1.`],
   ['Distance & midpoint',`Distance = √[(x₂−x₁)²+(y₂−y₁)²]. Midpoint = ((x₁+x₂)/2,(y₁+y₂)/2).`],
   ['Scale rule',`ETS treats coordinate systems and data graphs as drawn to scale, unlike ordinary geometry figures.`]
 ],{visual:'coordinate',quiz:[['A line through (2,5) and (6,13) has slope:',['1/2','2','4','8'],1,'(13−5)/(6−2)=8/4=2.']]}),
 topic('q-translation','quant','Word problems as models','A systematic translation framework for ages, mixtures, rates, costs, growth, and constraints',[
   ['The five-step model',`1) Identify the target. 2) Define variables with units. 3) Translate each sentence into a relation. 4) Solve only after the model is complete. 5) Check against the story.`],
   ['Avoid premature arithmetic',`The hardest word problems often include irrelevant or differently framed information. Write relationships before reaching for numbers.`],
   ['Backsolving',`When answer choices are numerical and the equation setup is messy, testing choices can be faster—especially if choices are ordered and monotonicity lets you start in the middle.`]
 ],{quiz:[['A number is 8 more than three times another. If their sum is 32, the smaller number is:',['4','6','8','10'],1,'Let smaller=y, larger=3y+8. Then 4y+8=32 → y=6.']]}),

// GEOMETRY
 topic('q-angles','quant','Lines, angles & transversals','Angle pairs, parallel lines, perpendicularity, and diagram discipline',[
   ['Angle facts',`A straight angle is 180°, a full turn 360°. Vertical angles are equal. Adjacent angles on a straight line are supplementary.`],
   ['Parallel lines',`With a transversal, corresponding and alternate interior angles are equal; same-side interior angles are supplementary.`],
   ['GRE diagram rule',`Ordinary geometry figures are not necessarily drawn to scale. Trust stated relationships and geometry, not appearance.`]
 ],{visual:'angles',quiz:[['Two supplementary angles are in ratio 2:3. Smaller angle?',['36°','60°','72°','108°'],2,'5 parts=180°, so each part=36°; smaller=72°.']]}),
 topic('q-triangles','quant','Triangles','Angle sum, side rules, area, isosceles/equilateral properties, and triangle inequality',[
   ['Core rules',`Interior angles sum to 180°. Larger angles face longer sides. Triangle inequality: sum of any two side lengths must exceed the third.`],
   ['Area',`A=½bh, where height is perpendicular to the chosen base. Different base-height pairs produce the same area.`],
   ['Isosceles/equilateral',`In an isosceles triangle, equal sides face equal angles. Equilateral triangles have three 60° angles.`]
 ],{visual:'triangle',quiz:[['Which could be the third side of a triangle with sides 5 and 11?',['5','6','10','17'],2,'Third side x must satisfy 6<x<16, so 10 works.']]}),
 topic('q-special-triangles','quant','Right & special triangles','Pythagorean triples, 45-45-90, 30-60-90, and geometric shortcuts',[
   ['Pythagorean theorem',`For a right triangle with legs a,b and hypotenuse c: a²+b²=c². Recognize triples such as 3-4-5, 5-12-13, 8-15-17 and scaled versions.`],
   ['45-45-90',`Side ratio 1:1:√2. The hypotenuse is leg×√2.`],
   ['30-60-90',`Side ratio 1:√3:2 opposite 30°, 60°, 90° respectively.`],
   ['No trig required',`GRE Quant does not test trigonometry; these side relationships replace many trig calculations.`]
 ],{visual:'specialtriangle',quiz:[['A 45-45-90 triangle has leg 6. Hypotenuse?',['6√2','12','3√2','12√2'],0,'In a 45-45-90 triangle, hypotenuse = leg√2.']]}),
 topic('q-polygons','quant','Quadrilaterals & polygons','Interior/exterior angles, rectangles, parallelograms, trapezoids, and regular polygons',[
   ['Polygon angle sum',`An n-gon's interior angle sum is (n−2)180°. A regular n-gon has each exterior angle 360°/n.`],
   ['Parallelogram family',`Opposite sides and angles of parallelograms are equal; diagonals bisect each other. Rectangles add right angles; rhombi add four equal sides; squares have both.`],
   ['Trapezoid area',`A=½(b₁+b₂)h for parallel bases b₁,b₂.`]
 ],{quiz:[['Interior angle sum of a hexagon?',['540°','720°','900°','1080°'],1,'(6−2)180°=720°.']]}),
 topic('q-circles','quant','Circles','Radius, diameter, circumference, area, arcs, sectors, chords, and tangents',[
   ['Core formulas',`Circumference C=2πr=πd. Area A=πr².`],
   ['Arcs and sectors',`An arc or sector is the same fraction of the whole circle as its central angle is of 360°. Sector area=(θ/360)πr².`],
   ['Tangents',`A tangent is perpendicular to the radius drawn to the point of tangency.`],
   ['Scaling',`If radius scales by k, circumference scales by k and area by k².`]
 ],{visual:'circle',quiz:[['If a circle’s radius doubles, its area becomes:',['2 times','4 times','6 times','8 times'],1,'Area depends on r², so doubling r multiplies area by 4.']]}),
 topic('q-similarity','quant','Similarity, congruence & scale','Proportional sides, corresponding angles, area/volume scaling, and hidden ratios',[
   ['Similarity',`Similar figures have equal corresponding angles and proportional corresponding side lengths. Congruent figures are the same size and shape.`],
   ['Scale effects',`If linear dimensions scale by k, perimeter scales by k, area by k², and volume by k³.`],
   ['Perfect-score trap',`Do not use an area ratio as a side ratio. A 9:16 area ratio implies a 3:4 linear ratio for similar figures.`]
 ],{quiz:[['Similar solids have linear scale factor 2:3. Volume ratio?',['2:3','4:9','6:9','8:27'],3,'Volume scales with the cube of linear scale: 2³:3³=8:27.']]}),
 topic('q-area','quant','Area & perimeter','Composite figures, shaded regions, transformations, and efficient decomposition',[
   ['Think by decomposition',`Break complex figures into rectangles, triangles, circles, or subtract a hole from a larger simple shape.`],
   ['Perimeter is boundary',`When figures are combined, shared interior edges disappear from the outside perimeter.`],
   ['Scaling distinction',`Equal perimeter does not imply equal area; equal area does not imply equal perimeter. QC frequently exploits this.`]
 ],{quiz:[['A square has perimeter 40. Area?',['40','64','100','160'],2,'Side=10, area=100.']]}),
 topic('q-solids','quant','3D figures','Volume, surface area, boxes, cylinders, and spatial scaling',[
   ['Rectangular solid',`V=lwh. Surface area=2(lw+lh+wh). Space diagonal=√(l²+w²+h²).`],
   ['Cylinder',`V=πr²h. Total surface area=2πr²+2πrh.`],
   ['Scale',`Linear factor k changes surface area by k² and volume by k³.`]
 ],{quiz:[['A cube has volume 125. Its surface area is:',['25','75','125','150'],3,'Side=5; surface area=6×25=150.']]}),

// DATA ANALYSIS
 topic('q-mean','quant','Mean, weighted mean & averages','Arithmetic mean, missing values, weighted averages, and average-speed distinction',[
   ['Mean',`mean = sum / count. Therefore sum = mean × count. This identity is often the fastest route to combined-average problems.`],
   ['Weighted mean',`Weighted mean = Σ(weight×value)/Σweights. Group sizes act as weights when combining group averages.`],
   ['Change logic',`If one observation increases by d in a set of n values, the mean increases by d/n.`],
   ['Trap',`Average speed uses total distance/total time, not usually the arithmetic mean of speeds.`]
 ],{quiz:[['Five numbers have mean 12. A sixth number 18 is added. New mean?',['12','13','14','15'],1,'Original sum=60; new sum=78; 78/6=13.']]}),
 topic('q-median','quant','Median, mode, range & robust center','Ordering data, effects of changes, outliers, and choosing the right statistic',[
   ['Median',`Sort first. For odd n, take the middle value; for even n, average the two middle values.`],
   ['Mode and range',`Mode is most frequent. Range=max−min. A data set may have multiple modes or no repeated mode.`],
   ['Robustness',`Median is less sensitive to extreme outliers than mean. Adding one huge value can change mean substantially while leaving median nearly unchanged.`]
 ],{quiz:[['Median of 3, 9, 2, 11, 7, 8?',['7','7.5','8','8.5'],1,'Sorted:2,3,7,8,9,11; median=(7+8)/2=7.5.']]}),
 topic('q-quartiles','quant','Quartiles, percentiles, IQR & boxplots','Position, spread, outliers, and reading box-and-whisker displays',[
   ['Quartiles',`Q1 is roughly the 25th percentile, median Q2 the 50th, Q3 the 75th. IQR=Q3−Q1.`],
   ['Boxplots',`The box spans Q1 to Q3; a line marks the median; whiskers extend toward extremes according to the display's convention. Compare center, spread, skew, and possible outliers.`],
   ['Percentile wording',`Being at the 80th percentile means about 80% of observations are at or below that value—not that you answered 80% correctly.`]
 ],{visual:'boxplot',quiz:[['If Q1=18 and Q3=31, IQR = ?',['13','18','24.5','49'],0,'IQR=31−18=13.']]}),
 topic('q-sd','quant','Standard deviation & spread','Conceptual understanding of dispersion, transformations, and comparison',[
   ['Meaning',`Standard deviation measures typical spread around the mean. GRE generally emphasizes conceptual comparison rather than manual computation of a long formula.`],
   ['Transformations',`Adding the same constant to every value shifts the mean but leaves standard deviation unchanged. Multiplying every value by k multiplies standard deviation by |k|.`],
   ['Zero spread',`Standard deviation is 0 only when every data value is identical.`]
 ],{visual:'distribution',quiz:[['If 5 is added to every observation, standard deviation:',['increases by 5','is multiplied by 5','stays the same','cannot be determined'],2,'Translation changes location, not spread.']]}),
 topic('q-graphs','quant','Tables & graphs','Bar/line/circle graphs, broken scales, units, interpolation, and efficient reading',[
   ['Read metadata first',`Check title, axes, units, legends, scale increments, and footnotes before using the data.`],
   ['Scale discipline',`Unlike ordinary geometry figures, ETS states that coordinate systems and graphical data presentations are drawn to scale.`],
   ['Do not overread',`Scan the display, then read only the values needed for the question. Watch for millions/billions, percent vs percentage points, and truncated axes.`]
 ],{quiz:[['A rate rises from 20% to 25%. The increase is:',['5%','5 percentage points','20 percentage points','25%'],1,'The direct change in a percentage is 5 percentage points; relative percent increase is 25%.']]}),
 topic('q-sets','quant','Sets & Venn diagrams','Union, intersection, complements, inclusion-exclusion, and two/three-set counting',[
   ['Two-set formula',`n(A∪B)=n(A)+n(B)−n(A∩B). Subtract the overlap because it was counted twice.`],
   ['Neither',`If the universal total is N, then neither = N−n(A∪B).`],
   ['Three sets',`Use regions or full inclusion-exclusion carefully. Label the central triple overlap first, then pair-only regions, then singles.`]
 ],{visual:'venn',quiz:[['In 100 students, 60 take X, 45 take Y, and 20 take both. How many take neither?',['5','15','20','25'],1,'Union=60+45−20=85, so neither=15.']]}),
 topic('q-counting','quant','Counting, permutations & combinations','Fundamental counting principle, arrangements, selections, restrictions, and overcounting',[
   ['Fundamental counting principle',`If one choice has a possibilities and another independent stage has b possibilities, total ordered outcomes = ab.`],
   ['Permutations',`Order matters: nPr=n!/(n−r)!.`],
   ['Combinations',`Order does not matter: nCr=n!/[r!(n−r)!]. Also nCr=nC(n−r).`],
   ['Restriction strategy',`Count total minus forbidden when direct restricted counting becomes messy.`]
 ],{quiz:[['How many ways to choose 3 students from 8?',['24','56','336','512'],1,'8C3=56.']]}),
 topic('q-probability','quant','Probability','Sample spaces, complements, addition/multiplication rules, independence, and “at least one”',[
   ['Basic probability',`For equally likely outcomes, P(event)=favorable/total. Probabilities lie from 0 to 1.`],
   ['Complement',`P(not A)=1−P(A). “At least one” is often fastest as 1−P(none).`],
   ['Addition',`P(A or B)=P(A)+P(B)−P(A and B). For mutually exclusive events, intersection is zero.`],
   ['Multiplication',`For independent events, P(A and B)=P(A)P(B). Without independence, use conditional probability.`]
 ],{quiz:[['A fair coin is tossed 3 times. Probability of at least one head?',['1/8','3/8','7/8','1'],2,'Complement: 1−P(all tails)=1−1/8=7/8.']]}),
 topic('q-conditional','quant','Conditional probability & independence','Restricted sample spaces, tree thinking, dependence, and without-replacement events',[
   ['Conditional probability',`P(A|B)=P(A∩B)/P(B), provided P(B)>0. The condition B creates a new restricted universe.`],
   ['Independence test',`A and B are independent when P(A|B)=P(A), equivalently P(A∩B)=P(A)P(B).`],
   ['Without replacement',`Sequential draws without replacement are generally dependent because the composition changes after each draw.`]
 ],{quiz:[['A bag has 3 red and 2 blue balls. Two are drawn without replacement. P(both red)?',['1/5','3/10','2/5','9/25'],1,'3/5×2/4=6/20=3/10.']]}),
 topic('q-distributions','quant','Random variables & distributions','Expected value, normal-distribution intuition, symmetry, and shape',[
   ['Random variable',`A random variable assigns a numerical value to outcomes of a random process. A probability distribution pairs possible values with their probabilities.`],
   ['Expected value',`E(X)=Σ[x·P(X=x)]. Think of it as the long-run average over many repetitions.`],
   ['Normal distribution',`A normal curve is symmetric and bell-shaped; mean=median=mode. GRE may ask qualitative questions about center, spread, and standardized position.`],
   ['Shape',`Right-skewed data have a longer right tail and often mean>median; left-skewed often mean<median.`]
 ],{visual:'distribution',quiz:[['For a perfectly symmetric normal distribution, which is true?',['mean<median','mean=median','mean>mode','no mode'],1,'Normal distributions are symmetric with mean=median=mode.']]}),
 topic('q-qc','quant','Quantitative Comparison mastery','The A/B/equal/cannot-determine format, variable testing, simplification, and avoiding overcalculation',[
   ['The four outcomes',`Compare Quantity A and Quantity B: A greater, B greater, equal, or relationship cannot be determined. The fourth choice is not “I am unsure”; it means valid cases produce different relationships.`],
   ['Simplify both sides',`Cancel common positive factors, compare differences or ratios when safe, and use algebra before computing exact values.`],
   ['Test cases intelligently',`For unrestricted variables, test 0, 1, −1, a fraction between 0 and 1, and a larger positive/negative value as relevant. Seek a counterexample.`],
   ['Geometry caution',`Do not trust apparent lengths or angles unless the display is a coordinate system/data graph that ETS says is to scale.`]
 ],{quiz:[['x is a real number. A: x². B: x. Relationship?',['A>B','B>A','Equal','Cannot be determined'],3,'For x=2, A>B; x=1/2, B>A; x=0 or1 equal.']]}),

 topic('q-estimation','quant','Estimation, bounds & approximation','Magnitude checks, smart rounding, bounding, and using answer choices to avoid unnecessary arithmetic',[
   ['Why estimation matters',`GRE Quant rewards exact reasoning, but many questions become faster when you estimate first. Estimation also acts as an error detector: know the sign, rough size, and plausible range before doing detailed arithmetic.`],
   ['Smart rounding',`Round in a direction that preserves what you need. For 49.8×20.3, 50×20 gives an excellent magnitude estimate. For inequalities or close answer choices, use tighter bounds rather than crude rounding.`],
   ['Bounding',`If 3.1<x<3.2, then x² lies between 9.61 and 10.24 because x is positive. Bounds can settle comparisons without finding an exact value.`],
   ['Backsolving and answer choices',`When choices are numeric, estimating can eliminate most of them before exact work. If choices are widely spaced, exact arithmetic may be wasted effort.`]
 ],{quiz:[['Without exact multiplication, 19.8×50.4 is closest to:',['100','500','1,000','5,000'],2,'20×50≈1,000, so the product must be near 1,000.']]}),
 topic('q-conventions','quant','GRE mathematical conventions & figures','Real-number assumptions, geometry drawings, coordinate/data displays, notation, and what you may safely infer',[
   ['Default number domain',`Unless a problem says otherwise, numbers used in GRE Quant are real numbers. Do not silently restrict a variable to integers, positives, or nonzero values.`],
   ['Ordinary geometry figures',`Lines shown straight are straight and relative positions/order are reliable, but ordinary geometric figures are not necessarily drawn to scale. Never infer an angle, length, parallelism, or equality from appearance alone.`],
   ['Displays that are to scale',`Coordinate systems and graphical data presentations such as bar, line, and circle graphs are drawn to scale, so values can be read or estimated from their scales when the question permits.`],
   ['Nonstandard notation',`If GRE uses nonstandard notation, it defines it in the question. Read the definition literally and substitute carefully instead of relying on what the symbol usually means.`]
 ],{quiz:[['Which display may generally be read to scale on GRE Quant?',['an ordinary triangle sketch','a coordinate plane','an unlabeled quadrilateral','a circle geometry diagram'],1,'ETS states that coordinate systems and graphical data presentations are drawn to scale; ordinary geometry figures need not be.']]}),

// VERBAL
 topic('v-logic','verbal','Sentence logic & clue words','Contrast, continuation, cause, concession, degree, and predicting before choices',[
   ['The core verbal habit',`Do not begin with vocabulary. Begin with logic. Identify what the sentence is doing, predict the blank's role, then evaluate choices.`],
   ['Contrast markers',`although, despite, however, yet, nevertheless, rather than, while can signal a reversal or qualification.`],
   ['Continuation markers',`and, moreover, indeed, likewise, because, therefore, consequently often preserve or explain a direction.`],
   ['Punctuation clues',`Colons often explain; semicolons can join parallel or contrasting complete thoughts; dashes can restate, define, or interrupt. Grammar narrows what kind of word can fit.`]
 ],{quiz:[['“Although the critic was usually ___, this review was unusually generous.” Best prediction?',['harsh','popular','precise','famous'],0,'“Although” creates contrast with generous, so a negative/harsh baseline is predicted.']]}),
 topic('v-tc','verbal','Text Completion','One-, two-, and three-blank questions; local logic, global coherence, and blank independence',[
   ['Question structure',`Text Completion can contain one, two, or three blanks. Each blank has its own choice set. For multi-blank questions, all blanks must be correct for credit.`],
   ['Predict first',`Cover choices mentally. Identify sentence logic, write a simple prediction such as “negative,” “praise,” “cause,” or a rough synonym, then match.`],
   ['Solve easiest blank first',`Multi-blank questions do not need to be solved left-to-right. A highly constrained blank can unlock the rest.`],
   ['Coherence test',`Insert every chosen word and reread the whole sentence or passage. Local fit is insufficient if the overall meaning breaks.`]
 ],{quiz:[['Because the evidence was ___, the committee wisely remained ___ about the dramatic claim.',['conclusive / enthusiastic','equivocal / skeptical','abundant / certain','irrelevant / jubilant'],1,'Unclear evidence logically supports skepticism.']]}),
 topic('v-se','verbal','Sentence Equivalence','One blank, six choices, two answers that produce equivalent completed meanings',[
   ['What ETS is testing',`You must choose two words that each make the sentence coherent and that yield sentences with the same overall meaning. There is no partial credit.`],
   ['Do not synonym-hunt blindly',`Two choices can be synonyms yet both be wrong in context. Conversely, the correct pair need not be exact dictionary synonyms if the completed sentences are equivalent.`],
   ['Prediction + pairing',`Predict the blank, identify all individually plausible candidates, then pair by resulting sentence meaning.`]
 ],{quiz:[['“The speaker’s style was so ___ that even a technical topic felt lively.” Choose two.',['ponderous','animated','vivacious','opaque','tedious','taciturn'],[1,2],'Animated and vivacious both fit and produce equivalent meanings.']]}),
 topic('v-rc-map','verbal','Reading passage mapping','Read for structure, roles, viewpoints, shifts, and the passage’s job—not every detail',[
   ['Map, do not memorize',`For each paragraph, record its role in a few words: old view, new evidence, objection, reply, example, implication. This preserves structure without rereading everything.`],
   ['Viewpoint tracking',`Distinguish author, researchers, critics, historical actors, and hypothetical positions. GRE answer choices often misattribute one person's view to another.`],
   ['Signal words',`however, yet, nevertheless, by contrast, for example, therefore, admittedly, in fact, instead reveal logical architecture.`],
   ['Passage subjects',`GRE passages span humanities, social sciences/business, and natural sciences. You need reasoning, not outside subject knowledge.`]
 ],{visual:'passagemap',quiz:[['A paragraph that begins “Critics of this account object that…” most likely serves to:',['introduce an objection','state the author’s conclusion','define a term','give numerical evidence'],0,'The explicit signal introduces a competing objection.']]}),
 topic('v-main','verbal','Main idea & primary purpose','Separating topic from thesis, capturing scope, and rejecting distorted summaries',[
   ['Main idea',`Ask: what claim or point organizes the passage as a whole? The answer must cover the important architecture without overfocusing on one example.`],
   ['Primary purpose',`Purpose asks what the author is doing: challenging a theory, reconciling evidence, explaining a phenomenon, evaluating proposals, etc.`],
   ['Scope trap',`Wrong answers may be too broad, too narrow, or stronger than the passage. Prefer the choice whose scope and certainty match the text.`]
 ],{quiz:[['If a passage presents a traditional theory, new evidence against it, and a revised theory that fits both old and new data, its primary purpose is likely to:',['list unrelated facts','advocate a revision to an existing account','attack all theories','describe a biography'],1,'The structure centers on revising the old account in light of new evidence.']]}),
 topic('v-detail','verbal','Detail, function & select-in-passage','Locating proof, understanding why a sentence exists, and using textual evidence precisely',[
   ['Detail questions',`Return to the relevant lines. Correct answers are paraphrases or implications of what is stated, not what seems generally plausible.`],
   ['Function questions',`Ask what role a sentence/example plays in the author's argument: evidence, concession, contrast, illustration, definition, counterexample, transition.`],
   ['Select-in-passage',`The answer is a sentence in the passage itself. Match the requested function exactly; do not choose a sentence merely because it mentions the right topic.`]
 ],{quiz:[['An author gives one historical case immediately after a general claim. The case most likely functions as:',['a counterexample','an illustration','a definition','the main conclusion'],1,'A concrete case following a general claim typically illustrates it.']]}),
 topic('v-inference','verbal','Inference questions','What must or strongly follows, calibrated certainty, and evidence-bounded reasoning',[
   ['Inference standard',`An inference must be supported by the passage. Do not import outside knowledge. Prefer modest conclusions that are compelled or strongly licensed by the text.`],
   ['Certainty matching',`If the passage says “may” or “often,” an answer saying “always” is usually too strong. Watch every quantifier.`],
   ['Negation test',`For close choices, ask whether denying the candidate would conflict with the passage. This can expose a necessary implication.`]
 ],{quiz:[['Passage: “No sample from the northern site contained mineral X, though several southern samples did.” Which is supported?',['Mineral X never occurs in the north','At least one southern sample contained X','All southern samples contained X','Northern samples were older'],1,'Only the existence claim about southern samples is directly supported.']]}),
 topic('v-tone','verbal','Tone, attitude & author stance','Calibrating adjectives, detecting approval/skepticism, and avoiding emotionally excessive choices',[
   ['Tone is usually restrained',`Academic prose is more often skeptical, qualified, appreciative, critical, ambivalent, or cautiously optimistic than furious, ecstatic, or contemptuous.`],
   ['Evidence',`Look at evaluative adjectives, concessions, verbs of attribution, and what the author chooses to defend or challenge.`],
   ['Fine distinctions',`“Qualified approval” differs from “unreserved enthusiasm.” GRE tone questions often hinge on degree.`]
 ],{quiz:[['“The proposal is ingenious, though its practical assumptions remain doubtful.” Tone?',['unreserved admiration','qualified approval','hostile rejection','indifference'],1,'The author praises ingenuity but expresses reservations.']]}),
 topic('v-cr','verbal','Argument reasoning inside Reading Comprehension','Assumptions, strengthen/weaken, resolve paradox, evaluate, cause/effect, and alternative explanations',[
   ['Argument skeleton',`Identify conclusion, evidence, and the gap connecting them. Critical reasoning questions target that gap.`],
   ['Assumption',`An assumption is a required bridge. Negate a candidate: if the argument collapses, that candidate was likely necessary.`],
   ['Strengthen/weaken',`A strong answer changes confidence in the conclusion by addressing the logic. Merely discussing the topic is not enough.`],
   ['Causation',`For causal claims, consider reverse causation, third variables, selection effects, timing, and whether the supposed cause actually precedes the effect.`]
 ],{quiz:[['Study finds coffee drinkers report less fatigue; author concludes coffee causes lower fatigue. Which weakens?',['Coffee contains caffeine','Less-fatigued people may be more likely to choose coffee','Coffee is sold worldwide','Some people dislike coffee'],1,'This gives reverse/selection causation: the observed association need not be caused by coffee.']]}),
 topic('v-longrc','verbal','Long-passage control','Paragraph roles, reference chains, viewpoint matrices, and evidence retrieval under time pressure',[
   ['Paragraph ledger',`After each paragraph, record 3–6 words: P1 problem, P2 old theory, P3 evidence, P4 author synthesis. This is enough to navigate questions quickly.`],
   ['Reference chains',`Track pronouns and phrases such as “this view,” “such findings,” “the latter.” Many difficult questions require resolving what a reference points to.`],
   ['Time discipline',`Do not attempt to memorize names, dates, or examples. Know where they are and why they were introduced; return to details only when asked.`]
 ],{quiz:[['Best note for a paragraph that catalogs three experiments supporting the same hypothesis?',['definitions','supporting evidence','author biography','unrelated tangent'],1,'Its structural role is a body of supporting evidence.']]}),
 topic('v-vocab-strategy','verbal','Vocabulary strategy','Synonym clusters, roots, context, spaced repetition, and building an academic lexicon without memorizing blindly',[
   ['No finite official word list',`There is no official bounded “GRE vocabulary list.” Your goal is broad academic lexical precision plus the ability to infer meaning from context and morphology.`],
   ['Learn in networks',`Store each word with a plain-language meaning, one strong synonym/antonym, a sentence, and its tone or usage. Clusters make Sentence Equivalence faster.`],
   ['Spaced retrieval',`Recognition feels easy but is fragile. Use active recall, increasing intervals, and frequent mixed review. The Vocabulary Lab in this site implements a lightweight SRS.`],
   ['Morphology',`Roots and affixes help: bene- good, mal- bad, loqu-/locut- speak, cred- believe, tac-/tic- silent, ambi- both, circum- around, eu- good, dys- bad.`]
 ],{quiz:[['“Taciturn” most nearly means:',['talkative','silent/reserved','wasteful','uncertain'],1,'Taciturn describes someone habitually quiet or sparing in speech.']]}),

 topic('v-elimination','verbal','Answer-choice elimination & trap taxonomy','Extreme language, scope shifts, reversals, true-but-irrelevant choices, half-right choices, and proof-based elimination',[
   ['Every choice is a claim',`Do not ask which option “sounds best.” Ask what evidence would have to be true for each option to be correct. One unsupported word can invalidate an otherwise attractive answer.`],
   ['Common RC traps',`Watch for scope shifts, reversed relationships, wrong viewpoints, extreme certainty, chronology errors, true statements that do not answer the question, and choices that copy passage vocabulary while changing the logic.`],
   ['TC/SE traps',`A word may fit grammatically but violate the sentence direction; a synonym pair may be semantically close but wrong in context; a sophisticated-looking word may simply have the wrong tone.`],
   ['The 50/50 protocol',`When two choices remain, name the exact difference between them and return to the smallest piece of text that can decide that difference. Do not reread the entire passage aimlessly.`]
 ],{quiz:[['A passage says a method “sometimes improves accuracy.” Which answer is most suspicious?',['It can improve accuracy','It improves accuracy in some cases','It invariably improves accuracy','Its benefit may depend on circumstances'],2,'“Invariably” is stronger than the passage’s “sometimes.”']]}),
 topic('v-morphology','verbal','Roots, prefixes & morphological inference','Using word structure as a probability tool without letting etymology override context',[
   ['Morphology is backup, not proof',`Prefixes and roots can narrow an unfamiliar word, but modern meanings drift. Sentence logic and actual usage remain primary.`],
   ['High-yield building blocks',`Examples: bene- good; mal- bad; eu- good; dys- bad; cred- believe; loqu/locut- speak; tac- silent; ambi- both; circum- around; omni- all; poly- many; mono- one; contra-/anti- against; pre-/ante- before; post- after.`],
   ['Suffix clues',`-ous/-ive/-al often mark adjectives; -ity/-ness nouns; -ize/-ify verbs. Grammar clues can eliminate choices even when you do not know every definition.`],
   ['Build families',`Learn related forms together when useful: equivocal/equivocate/equivocation; lucid/clarity; corroborate/corroboration. This expands usable vocabulary faster than isolated memorization.`]
 ],{quiz:[['The root “cred” most often relates to:',['speaking','belief','movement','time'],1,'Cred- appears in credible, credence, credulous, and incredulous.']]}),

// WRITING
 topic('a-format','writing','Current Analytical Writing format','The single 30-minute Analyze an Issue task and what it actually measures',[
   ['Current task',`The current GRE General Test has one 30-minute Analyze an Issue task. The older Analyze an Argument task is not part of the current shorter GRE General Test.`],
   ['What is assessed',`You are judged on how clearly and effectively you articulate complex ideas, support them with relevant reasons/examples, sustain a focused coherent discussion, and control standard written English.`],
   ['No specialist knowledge required',`The task is designed to assess reasoning and writing, not domain-specific facts. You can use historical, academic, social, personal, or hypothetical examples if they genuinely support your reasoning.`],
   ['Tool limitations',`ETS provides a basic word processor; do not rely on spellcheck or grammar-check assistance.`]
 ],{quiz:[['Current GRE Analytical Writing consists of:',['Issue + Argument tasks','one Issue task','one Argument task','two Issue tasks'],1,'The shorter GRE uses one 30-minute Analyze an Issue task.']]}),
 topic('a-task','writing','Issue task families & instruction reading','Responding to the exact directive rather than writing a generic opinion essay',[
   ['Read the instruction twice',`The topic statement and the instruction are separate. Your essay must address the specific instruction—e.g., discuss conditions, consequences, agreement extent, or competing considerations.`],
   ['Common demand patterns',`You may be asked to take a position, discuss circumstances under which a claim holds, consider consequences, or evaluate a recommendation. Build your thesis around that demand.`],
   ['Nuance beats indecision',`A sophisticated thesis can be conditional: “Generally X, except when Y because Z.” Nuance should sharpen your logic, not blur your position.`]
 ],{quiz:[['A prompt asks “Discuss circumstances in which the recommendation would or would not be advantageous.” Best thesis style?',['absolute yes/no only','conditional framework','topic summary only','no thesis'],1,'The instruction explicitly rewards conditions and boundaries.']]}),
 topic('a-structure','writing','6.0 essay architecture','Thesis, analytical body paragraphs, counterpressure, transitions, and conclusion',[
   ['A reliable architecture',`Intro: interpret the issue + clear nuanced thesis. Body 1: strongest reason + developed example. Body 2: distinct reason + example. Body 3: counterargument/limitation or condition + response. Conclusion: synthesize, do not merely repeat.`],
   ['Paragraph job',`Each body paragraph should contain a claim, reasoning chain, concrete support, and a sentence tying it back to the thesis.`],
   ['Depth over list-making',`Two deeply explained examples are usually better than five namedropped examples. Explain mechanism: why does the example prove the claim?`],
   ['Transitions',`Use logical transitions to show relation—not decorative “firstly/secondly.” Examples: “The limitation matters because…”, “A stronger case arises when…”, “This objection weakens if…”`]
 ],{quiz:[['Which most improves an example’s value?',['adding more proper nouns','explaining how it supports the claim','making it longer regardless of relevance','using rare vocabulary'],1,'Raters reward developed reasoning, not name-dropping.']]}),
 topic('a-rubric','writing','Decoding the 6.0 rubric','Insight, development, focus, organization, precision, sentence variety, and language control',[
   ['Outstanding responses',`A top response presents a cogent, well-articulated analysis; develops its position fully with compelling reasons or persuasive examples; remains focused and organized; uses language fluently and precisely; and shows strong command of standard written English.`],
   ['What 6.0 is not',`It is not a contest for longest essay, fanciest vocabulary, or obscure facts. Precision, logical development, relevance, and control dominate.`],
   ['Error tolerance',`Minor mistakes can occur even in a top response. Persistent errors that interfere with clarity are the real danger.`],
   ['Self-check',`After each timed essay, grade separately: task compliance, thesis quality, reasoning depth, example development, counterpressure, organization, sentence control, grammar/mechanics.`]
 ],{quiz:[['Which is least aligned with the 6.0 rubric?',['logical organization','precise vocabulary','compelling support','maximum possible word count'],3,'Word count alone is not a rubric criterion.']]}),
 topic('a-timing','writing','30-minute execution system','Planning, drafting, revision, and preventing mid-essay collapse',[
   ['Suggested split',`A strong default is about 4–5 minutes planning, 21–23 minutes drafting, and 2–4 minutes revision. Adjust after practice, but never begin with no plan.`],
   ['Plan in skeleton form',`Write thesis + 2–3 paragraph claims + example names + counterargument in shorthand. This prevents repetition and wandering.`],
   ['Revision priorities',`First repair incomplete sentences and logical contradictions, then obvious grammar/spelling, then awkward repetition. Do not rewrite whole paragraphs in the final minute.`]
 ],{quiz:[['Best use of the first few minutes?',['write immediately with no thesis','plan thesis and paragraph logic','search for rare words','write conclusion first only'],1,'A compact plan greatly improves coherence under the 30-minute constraint.']]}),

 topic('a-reasoning','writing','Reasoning depth: claim → warrant → evidence','Building causal and logical bridges so paragraphs analyze instead of merely assert',[
   ['The hidden middle',`A strong paragraph is not just claim + example. It explains the warrant: why the example makes the claim more likely, important, or generally applicable.`],
   ['Mechanism language',`Ask “through what mechanism?” If you claim a policy improves innovation, explain whether it changes incentives, information flow, risk tolerance, competition, or resource allocation.`],
   ['Test the link',`After each example, write a sentence beginning “This matters because…” If that sentence merely repeats the claim, the reasoning is still underdeveloped.`],
   ['Avoid causal overreach',`Correlation, one anecdote, or a plausible story does not automatically prove causation. Qualify when alternative explanations or boundary conditions matter.`]
 ],{quiz:[['Which paragraph pattern is strongest?',['claim → example name → new claim','claim → mechanism → specific example → link back','example list only','thesis repeated three times'],1,'The warrant/mechanism connects support to the paragraph claim and thesis.']]}),
 topic('a-counter','writing','Counterarguments, concessions & qualification','Using opposing considerations to sharpen—not weaken—your position',[
   ['Counterpressure earns sophistication',`Acknowledge the strongest reasonable objection or condition. Then explain whether it limits your claim, creates an exception, or is outweighed under specific circumstances.`],
   ['Concede precisely',`A concession should give away only what is justified: “This concern is strongest when…” is more controlled than abandoning the thesis.`],
   ['Conditional thesis',`Many Issue prompts reward a rule plus boundary: X is generally preferable when A and B hold, but Y can dominate when C creates a serious cost.`],
   ['Steelman first',`Respond to the best version of the opposing case. Refuting a weak caricature creates length but little analytical value.`]
 ],{quiz:[['Best use of a counterargument?',['ignore it','present a weak straw man','state its strongest form and explain its boundary or weight','replace your thesis entirely'],2,'A developed counterargument demonstrates complexity while preserving a coherent position.']]}),
 topic('a-examples','writing','Examples that actually prove something','Selecting relevant examples, developing hypotheticals, avoiding factual traps, and connecting evidence to principle',[
   ['Relevance beats prestige',`A simple, accurate hypothetical can outperform a famous historical reference if the hypothetical directly illustrates the mechanism in your argument.`],
   ['Specific enough to reason with',`Give enough detail to show actors, incentives, constraints, and consequences. Do not spend half the essay narrating background that never becomes analysis.`],
   ['Do not bluff facts',`If you are unsure of a date, statistic, or attribution, generalize the example rather than inventing precision. GRE writing is not a trivia contest.`],
   ['Diversify support',`When possible, let body paragraphs test your principle in different contexts—e.g., institutions versus individuals, short term versus long term, ordinary versus exceptional conditions.`]
 ],{quiz:[['You remember the general lesson of a historical case but not its exact date. Best move?',['invent a date','avoid all examples','state the case without unnecessary uncertain precision and analyze the mechanism','add more names'],2,'Accuracy and analytical relevance matter more than decorative specificity.']]}),
 topic('a-style','writing','Style, grammar & sentence control','Precision, variety, transitions, agreement, modifiers, pronouns, punctuation, and editing under pressure',[
   ['Clarity first',`Use the most precise ordinary word available. Advanced vocabulary helps only when it is exact and natural. Avoid inflated diction that increases error risk.`],
   ['Sentence variety with control',`Mix concise statements with controlled complex sentences. Long sentences should have clear clause relationships; short sentences can emphasize a key inference.`],
   ['High-value grammar checks',`Watch subject–verb agreement, pronoun reference, tense consistency, sentence fragments, run-ons/comma splices, misplaced modifiers, parallelism, apostrophes, and repeated spelling errors.`],
   ['Transitions are logic labels',`Use transitions that name the relationship: concession, cause, example, consequence, contrast, qualification, or synthesis. Do not scatter “moreover” where the ideas are not actually additive.`]
 ],{quiz:[['Which editing priority is highest?',['replace simple words with rare ones','repair a sentence whose grammar obscures the reasoning','increase paragraph length','add ornamental transitions'],1,'Language control serves clarity and reasoning.']]}),
 topic('a-practice','writing','Deliberate AWA practice & review cycle','Outlines, full essays, rubric scoring, revision, idea banks, and measuring improvement without memorized templates',[
   ['Three practice modes',`Use 5-minute outlines for idea generation, untimed rewrites for reasoning/style repair, and full 30-minute essays for execution. Each trains a different bottleneck.`],
   ['Review with evidence',`After writing, highlight thesis, paragraph claims, warrants, examples, counterpressure, and transitions. If you cannot label the function of a sentence, it may be expendable or unfocused.`],
   ['Keep an idea bank',`Collect flexible domains—education, science, public policy, business, technology, institutions, art, history—along with principles you understand well. Do not memorize whole essays.`],
   ['Measure process',`Track planning time, completion, number of developed body paragraphs, repeated grammar errors, and rubric weaknesses. Improvement should be visible in both reasoning and timed control.`]
 ],{quiz:[['Best way to improve a recurring weak essay pattern?',['write many essays without review','alternate targeted rewrite work with timed essays and rubric analysis','memorize one universal template','focus only on word count'],1,'Deliberate practice isolates the failure, repairs it, then tests the repair under time.']]}),

// STRATEGY
 topic('s-structure','strategy','Current GRE structure & scoring','Five sections, timing, score scales, and section-level adaptation',[
   ['Current structure',`The shorter GRE General Test is about 1 hour 58 minutes: Analytical Writing first (one 30-minute Issue task), then two Verbal sections and two Quant sections. Verbal sections contain 12 questions/18 minutes and 15 questions/23 minutes; Quant sections contain 12 questions/21 minutes and 15 questions/26 minutes.`],
   ['Score scales',`Verbal and Quant are each reported from 130–170 in 1-point increments; Analytical Writing is 0–6 in half-point increments.`],
   ['Section-level adaptive',`The second Verbal section difficulty depends on performance in the first Verbal section; likewise for Quant. Within a section, you can move forward/back, mark, review, and change answers while time remains.`],
   ['Perfect-score implication',`Section 1 accuracy matters enormously because it determines the second-section difficulty path, yet all operational questions count. Treat every point as valuable.`]
 ],{quiz:[['GRE adaptation occurs primarily at what level?',['every question','section level','only the essay','there is no adaptation'],1,'The current GRE is section-level adaptive for Verbal and Quant.']]}),
 topic('s-timing','strategy','Timing & triage','Two-pass section management, checkpoints, skip/return behavior, and protecting easy points',[
   ['No question is worth extra raw credit',`Within a section, all questions contribute equally to the raw score. Do not donate 4 minutes to a single hard question while leaving easier questions unseen.`],
   ['Two-pass model',`Pass 1: secure straightforward points and mark expensive questions. Pass 2: return to marked items with remaining time. Reserve a final scan for unanswered questions.`],
   ['Approximate pacing',`12-question verbal in 18 min averages 1:30 each; 15 in 23 min ≈1:32. Quant 12 in 21 min ≈1:45; 15 in 26 min ≈1:44. Actual allocation should vary by question type.`],
   ['Answer everything',`ETS explicitly states there is no subtraction for incorrect answers in Verbal/Quant, so never leave a question blank.`]
 ],{quiz:[['You have 90 seconds left and 3 unanswered questions. Best policy?',['leave blank','answer all, then improve any you can','spend all time on one','cancel section'],1,'There is no wrong-answer penalty; fill every answer.']]}),
 topic('s-calculator','strategy','Calculator discipline','When the on-screen calculator helps, when it slows you down, and estimation checks',[
   ['Calculator is a tool, not a method',`ETS provides a basic on-screen calculator. Most questions do not require difficult computation; use it for tedious arithmetic, long division, square roots, or multi-digit work.`],
   ['Avoid dependency',`Mental arithmetic, factoring, estimation, and cancellation are often faster. Calculator entry creates its own error risk.`],
   ['Estimate first',`Before pressing equals, estimate the magnitude/sign. If the display is far outside that range, investigate an entry or modeling error.`]
 ],{quiz:[['Best calculator habit?',['use it for every arithmetic step','estimate first and use it selectively','avoid it entirely','trust every displayed result'],1,'Selective use plus estimation gives speed and error control.']]}),
 topic('s-review','strategy','Mark, review & answer-changing','Using the computer interface strategically without losing time',[
   ['Section navigation',`You may skip questions, mark them, return within the section, and change answers while time remains. Use this freedom intentionally.`],
   ['Mark with a reason',`Mark only items you are genuinely likely to improve: an unresolved setup, a 50/50 verbal choice, a calculation to recheck. Marking half the section creates noise.`],
   ['Changing answers',`Change an answer when you find a specific flaw or new evidence—not merely because anxiety increased.`]
 ],{quiz:[['A good reason to change an answer is:',['it feels too easy','you found a specific contradiction in your original reasoning','you usually change answers','the clock is low'],1,'Evidence-based revision is rational; anxiety-based switching is not.']]}),
 topic('s-mocks','strategy','Mock-test system & error analysis','How to use POWERPREP, classify misses, track timing, and turn tests into training data',[
   ['Baseline first',`Take an official POWERPREP simulation early enough to diagnose strengths, but after learning the interface and current test structure so the score is informative.`],
   ['Four error classes',`Concept gap: did not know. Reasoning gap: knew concepts but modeled badly. Execution gap: arithmetic/reading slip. Time/strategy gap: pacing, overinvestment, panic, or poor skip decision.`],
   ['Review deeper than correctness',`For every missed or guessed question, record why the wrong path felt attractive, the earliest point where a better decision was possible, and the rule that would prevent recurrence.`],
   ['Retest weak patterns',`An error log is only useful if it creates future drills. Revisit error categories after 3–7 days and again under timed conditions.`]
 ],{quiz:[['Best post-mock question?',['What score did I get?','What recurring process caused misses and how do I retrain it?','Was the test unfair?','How many pages of notes can I write?'],1,'The score is a measurement; process-level diagnosis creates improvement.']]}),
 topic('s-scratch','strategy','Scratch-work systems & notation','Minimal, legible Quant work and compact Verbal passage maps that reduce working-memory errors',[
   ['Write decisions, not transcripts',`Scratch work should preserve the steps most likely to be forgotten: variable definitions, equations, sign constraints, units, case splits, and eliminated choices. Do not copy the whole prompt.`],
   ['Quant layout',`Keep one problem in one visual zone, label variables, circle the requested quantity, and write units. For QC, make a tiny A/B table or list tested cases so you do not confuse outcomes.`],
   ['Verbal layout',`For RC, note paragraph roles and viewpoints in fragments such as P1 old view / P2 evidence / P3 author reply. The map should make retrieval faster than rereading.`],
   ['Error-proofing',`Separate arithmetic lines clearly and avoid doing multiple unrelated calculations on the same line. Many “careless” misses are actually poor information layout.`]
 ],{quiz:[['Best scratch-work principle?',['copy every sentence','record only final answers','externalize constraints and decision points that reduce errors','avoid scratch work entirely'],2,'Good notation protects working memory without consuming excessive time.']]}),
 topic('s-testday','strategy','Test-day execution & final-week taper','Simulation, sleep, food, equipment/ID checks, warm-up, pacing rules, and what not to change at the last minute',[
   ['Rehearse the real sequence',`In the final weeks, practice the current order and timing: Analytical Writing first, then the Verbal/Quant sections in whatever order they appear. Build endurance for the actual roughly two-hour experience.`],
   ['Final 48 hours',`Review compact notes, error rules, vocabulary due items, and a few confidence-building problems. Avoid a giant new topic dump or an exhausting late-night mock.`],
   ['Logistics',`Re-check current ETS registration, identification, test-center or at-home requirements, and arrival/setup instructions shortly before test day because policies can change.`],
   ['During the test',`Use your practiced skip thresholds, answer every Verbal/Quant item, and reset mentally at each section. One ugly question is not evidence that the whole test is going badly.`]
 ],{quiz:[['Best final-week change?',['invent a new pacing system','rehearse the system already validated in mocks','learn an entirely new math curriculum','take an all-nighter mock'],1,'The taper should stabilize proven execution rather than introduce volatility.']]}),

];

TOPICS.push(
 topic('q-formats','quant','Quant question formats & Data Interpretation sets','QC, single-answer, multiple-answer, numeric entry, and shared-data question sets',[
   ['Four question types',`GRE Quant uses Quantitative Comparison; multiple-choice with one answer; multiple-choice with one or more answers; and Numeric Entry. A question can be discrete or belong to a Data Interpretation set built around the same table, graph, or display.`],
   ['Multiple-answer discipline',`When the instruction says select one or more, there is no reason to assume a fixed number of correct choices. Test each option independently against the condition rather than stopping after one plausible answer.`],
   ['Numeric Entry',`Enter the requested exact value unless rounding is explicitly requested. Check whether the interface expects an integer/decimal or a fraction entry and reread units before submitting.`],
   ['Data Interpretation sets',`Scan the title, units, axes, legend, and notes first; then answer only from the presented data plus ordinary facts and mathematics. Do not import specialized outside knowledge about the context.`]
 ],{quiz:[['Which is NOT an official GRE Quant question format?',['Quantitative Comparison','Numeric Entry','Select one or more','Proof construction'],3,'GRE Quant does not ask you to construct mathematical proofs.']]}),
 topic('v-rc-formats','verbal','Reading Comprehension question formats','Single-answer, select-all-that-apply, select-in-passage, and the no-partial-credit rule',[
   ['Three RC formats',`Reading Comprehension includes traditional multiple choice with one answer; multiple choice asking you to select one or more correct answers; and Select-in-Passage questions that ask you to click the sentence satisfying a description.`],
   ['Select one or more',`For GRE RC multiple-answer items, choose every correct answer and no incorrect answers. Partial selections do not earn partial credit. Evaluate each choice as an independent true/false claim about the passage.`],
   ['Select-in-Passage',`Match the requested sentence function exactly—e.g., a sentence that states an assumption, gives evidence, or presents a contrast. In longer passages, the selectable region may be restricted to specified paragraphs.`],
   ['Evidence standard',`The interface changes, but the reasoning rule does not: every selected answer must be defensible from the passage, and no correct answer can require unsupported outside information.`]
 ],{quiz:[['For an RC “select one or more” item, how do you earn credit?',['Choose at least one correct answer','Choose all correct and only correct answers','Choose exactly two answers','Partial credit is automatic'],1,'The multiple-answer format requires the complete correct set; there is no partial credit.']]})
);

// MASTER EDITION — deep-dive chapters added after the original complete topic map.
// These chapters split high-value skills that deserve their own deliberate-practice loop.
TOPICS.push(...[
// VERBAL — sentence mechanics, TC/SE micro-skills, argument analysis, passage genres
 topic('v-syntax-spine','verbal','Dense sentence parsing: find the spine','Strip intimidating GRE prose down to subject, verb, object/complement, then rebuild modifiers',[
  ['Why this matters',`GRE sentences often feel difficult because several modifiers, appositives, parenthetical phrases, and subordinate clauses sit between the grammatical subject and its main verb. Vocabulary alone will not save you if you misidentify what is being asserted.`],
  ['The spine method',`First bracket interrupting material. Then locate the independent clause: subject → main verb → object or complement. Only after you can paraphrase that skeleton should you restore qualifications, examples, and contrasts.`],
  ['Clause hierarchy',`Independent clauses can stand alone. Dependent clauses introduced by although, because, while, if, when, which, that, who, despite the fact that, and similar markers modify or qualify a larger assertion. Ask what each clause is doing: concession, reason, condition, evidence, definition, example, or contrast.`],
  ['Hard-sentence drill',`On a difficult sentence, do not reread the whole thing five times. Mark the structural words, slash at clause boundaries, name the main claim in under ten words, and then attach each modifier to the exact idea it qualifies.`]
 ],{difficulty:'Advanced',minutes:45,quiz:[['In “Although the theory, once dismissed as speculative, has gained support, its central prediction remains unverified,” what is the main clause?',['the theory was dismissed','the theory has gained support','its central prediction remains unverified','support was speculative'],2,'“Although …” marks a concession. The independent main assertion is that the central prediction remains unverified.']]}),
 topic('v-reference','verbal','Pronouns, referents & modifier control','Track exactly what “it,” “they,” “this,” “which,” and compressed modifiers refer to',[
  ['Referent discipline',`In dense prose, a pronoun may refer to a whole proposition rather than the nearest noun. Replace every vague pronoun mentally with its candidate referent and check grammar plus meaning.`],
  ['This/that + noun',`Academic writers often write “this result,” “that assumption,” or “such a view.” The following noun tells you how the author classifies the previous idea. Treat it as a built-in summary clue.`],
  ['Relative clauses',`Who/which/that clauses attach to nouns or noun phrases. Misattaching a relative clause can reverse an argument. Ask: which exact noun is being described, and what new limitation or property is added?`],
  ['GRE habit',`When two answer choices differ only in what a pronoun or modifier refers to, return to the sentence and trace the grammatical link instead of choosing the interpretation that merely sounds plausible.`]
 ],{difficulty:'Advanced',quiz:[['In “The committee rejected the proposal because its assumptions were implausible. This criticism surprised the authors,” “This criticism” refers most directly to:',['the committee','the proposal','the rejection based on implausible assumptions','the authors'],2,'The demonstrative phrase summarizes the preceding evaluative action/reason, not merely the nearest noun.']]}),
 topic('v-connectors','verbal','Logic words: the complete signal system','Master contrast, support, cause, concession, condition, example, chronology, and emphasis signals',[
  ['Contrast / concession',`although, though, even though, while, whereas, despite, notwithstanding, yet, but, however, nevertheless, nonetheless, still, on the other hand, by contrast. These predict a turn, but the two sides need not be exact opposites.`],
  ['Support / continuation',`and, moreover, furthermore, indeed, in fact, likewise, similarly, also, additionally. These tell you the next idea generally points in the same argumentative direction.`],
  ['Cause / result',`because, since, given that, owing to, therefore, thus, hence, consequently, as a result. Distinguish evidence/reason from conclusion/result; GRE distractors often reverse them.`],
  ['Other high-value signals',`for example/for instance = illustration; specifically = narrowing; in other words = restatement; if/unless/provided = condition; primarily/especially = emphasis; allegedly/apparently/ostensibly = distance or uncertainty; only/merely = restriction.`]
 ],{quiz:[['Which word most strongly predicts that the clause after it will resist or qualify the preceding idea?',['moreover','nevertheless','therefore','for example'],1,'“Nevertheless” marks concession/contrast: despite what came before, a countervailing claim follows.']]}),
 topic('v-scope','verbal','Scope, qualifiers & degrees of certainty','Tiny words—some, many, usually, merely, may, must—control what an answer may legitimately claim',[
  ['Quantifier ladder',`all/always/never are extreme; most is stronger than many; some means at least one, not “only a few”; can/may indicates possibility; must/necessarily indicates requirement. Do not strengthen a passage in your head.`],
  ['Author commitment',`Writers signal confidence with certainly, clearly, demonstrates, establishes and soften with suggests, appears, may, arguably, likely, perhaps. In RC, an answer with stronger certainty than the passage is often wrong.`],
  ['Restriction words',`only, merely, primarily, largely, at least, at most, except, unless, not necessarily. Circle them mentally. They frequently determine whether an inference is licensed.`],
  ['Answer-choice audit',`Before selecting an inference answer, compare subject, scope, time frame, degree, causality, and certainty to the passage. A choice can be “basically right” yet still be too broad or too strong.`]
 ],{quiz:[['A passage says a method “may partly explain” a pattern. Which conclusion is safest?',['The method fully explains the pattern','The method necessarily caused the pattern','The method could contribute to the pattern','No other explanation is possible'],2,'“May” and “partly” license only a possibility/contribution claim.']]}),
 topic('v-tc-one','verbal','Text Completion: one-blank precision','Predict before options, determine direction, then separate near-synonyms by logic and tone',[
  ['Build the blank',`Before looking at choices, write a crude prediction such as “praise,” “skeptical,” “reduce,” “ordinary,” or “unexpected.” You do not need the exact word; you need the semantic job.`],
  ['Use every clue',`A one-blank TC can hinge on a contrast word, causal relation, example, degree word, punctuation, or the author’s tone. The correct choice must make the entire sentence logically, grammatically, and stylistically coherent.`],
  ['Do not vocabulary-match blindly',`A word may fit the topic but violate the logic. Another may be a synonym of your prediction yet have the wrong connotation or intensity. Reinsert the candidate and reread the whole sentence.`],
  ['Eliminate by contradiction',`If two choices seem plausible, ask what each would imply about the rest of the sentence. The one producing a contradiction, redundancy, wrong direction, or awkward register is out.`]
 ],{quiz:[['“Far from being ___, the report repeatedly acknowledges the limits of its evidence.” Best prediction?',['dogmatic','lucid','lengthy','empirical'],0,'“Far from” reverses direction. A report that acknowledges limits is not dogmatic/overly certain.']]}),
 topic('v-tc-multi','verbal','Text Completion: two- & three-blank systems','Solve multi-blank passages as a constraint network, not a combinatorial guessing game',[
  ['Do not multiply choices',`ETS explicitly advises against testing every combination. Solve the blank with the strongest local evidence first, then use it to constrain the rest.`],
  ['Anchor blank',`Look for a blank governed by an obvious contrast, definition, parallel structure, or cause. Fill that one conceptually, choose its best option, then propagate the meaning through the passage.`],
  ['Global coherence',`Each blank is selected independently in the interface, but the completed passage must work as one argument. A locally plausible word can still be wrong if it makes another clause incoherent.`],
  ['Backtracking rule',`If a later blank becomes impossible, do not force it. Reconsider the earlier anchor. Multi-blank TC rewards flexible revision of your model of the passage.`]
 ],{difficulty:'Advanced',quiz:[['In a three-blank TC, the most efficient first move is usually to:',['test all 27 combinations','always solve blank 1 first','start with the blank having the clearest logical clues','pick the rarest vocabulary word'],2,'Use the strongest constraint first; ETS specifically warns against brute-force combinations.']]}),
 topic('v-se-pairing','verbal','Sentence Equivalence: pairing without traps','Create a sentence meaning first; then find the two choices that independently fit and preserve equivalent meaning',[
  ['Two conditions',`Each selected word must fit the sentence, and the two completed sentences must be alike in meaning. Two dictionary synonyms can both be wrong if they do not satisfy the sentence logic.`],
  ['Pair map',`Scan six choices for rough semantic pairs, but treat that only as a map. Then test each member independently against the stem.`],
  ['No orphan answers',`If one word fits beautifully but has no partner yielding an equivalent completed sentence, your interpretation is probably wrong. Search for another semantic direction supported by the clues.`],
  ['Connotation matters',`Near-synonyms differ in approval/disapproval, intensity, formality, agency, and object. The sentence can demand “stingy” rather than merely “poor,” or “talkative” rather than “eloquent.”`]
 ],{quiz:[['Why is “find two synonyms” an unsafe SE strategy?',['Synonyms never appear together','The correct pair may not be exact synonyms, and synonym pairs may not fit the sentence','SE has only one answer','Grammar does not matter'],1,'ETS emphasizes completed-sentence equivalence and coherence, not merely dictionary synonymy.']]}),
 topic('v-polysemy','verbal','Secondary meanings & GRE trap words','Learn familiar-looking words whose less-common meanings can decide TC, SE, and RC',[
  ['Why familiar words are dangerous',`GRE difficulty often comes from polysemy: a common word used in an uncommon but legitimate sense. “Pedestrian” can mean dull/ordinary; “qualify” can mean limit; “intimate” can mean suggest; “arrest” can mean stop or attract attention.`],
  ['Dual-definition study',`For trap words, store primary meaning + GRE-relevant secondary meaning + one contrastive example. Recognition of the word is not mastery if you know only its everyday sense.`],
  ['Context decides sense',`Do not ask “what does this word mean?” Ask “which sense is compatible with this syntax, object, tone, and topic?” A verb’s object often reveals the intended sense.`],
  ['Build a personal trap ledger',`Every time an official/practice question catches you with a familiar word in an unfamiliar sense, add it to the Vocabulary Lab’s trap list and review it more aggressively than a totally new word.`]
 ],{difficulty:'Advanced',quiz:[['In “The new evidence qualifies the earlier conclusion,” “qualifies” most nearly means:',['certifies','limits or modifies','makes eligible','praises'],1,'In academic prose, to qualify a claim often means to limit, modify, or add conditions to it.']]}),
 topic('v-connotation','verbal','Connotation, intensity & register','Distinguish words that share denotation but differ in emotional charge, strength, or formality',[
  ['Denotation is not enough',`“Thrifty,” “frugal,” “parsimonious,” “miserly,” and “penurious” occupy related territory but are not interchangeable in tone or emphasis. GRE answer choices exploit these distinctions.`],
  ['Intensity ladder',`Build scales: annoyed → irate → furious; dislike → antipathy → abhorrence; praise → laud → extol → venerate. Exact ordering is context-sensitive, but relative intensity helps eliminate choices.`],
  ['Register',`Academic prose may prefer “ameliorate” to “make nicer,” “repudiate” to “say no to,” or “corroborate” to “back up.” TC/SE answers must fit the sentence’s stylistic register as well as its logic.`],
  ['Valence',`Label unfamiliar words roughly positive, negative, or neutral when possible. Even incomplete knowledge can eliminate choices if the sentence clearly requires approval, condemnation, uncertainty, restraint, etc.`]
 ],{quiz:[['Which word is most clearly negative in describing someone reluctant to spend money?',['frugal','prudent','parsimonious','economical'],2,'“Parsimonious” commonly carries a stingy/ungenerous negative connotation.']]}),
 topic('v-rhetorical-role','verbal','Rhetorical role & sentence function','Identify whether a sentence states a thesis, objection, evidence, example, concession, mechanism, or implication',[
  ['Read for function',`RC is easier when you stop treating every sentence as equal information. Label sentences by job: claim, evidence, example, background, competing view, concession, rebuttal, definition, consequence, question, or transition.`],
  ['Function is relational',`A statistic is not automatically “evidence” in the abstract; it is evidence for a particular claim. A sentence can introduce a view only to reject it in the next sentence.`],
  ['Question language',`Prompts may ask why the author mentions X, what role a sentence plays, or which statement best describes a paragraph’s function. Answer with the relationship to the argument, not merely the sentence’s topic.`],
  ['Passage map',`After each paragraph, write a 3–7 word role label: “old theory,” “problem with theory,” “new evidence,” “author’s qualified synthesis.” This map dramatically reduces rereading.`]
 ],{quiz:[['A paragraph begins with a theory, then lists two observations the theory cannot explain. The observations primarily serve to:',['define the theory','challenge its adequacy','provide historical background','praise its simplicity'],1,'Their argumentative role is to expose limitations in the theory.']]}),
 topic('v-assumption','verbal','Assumptions & hidden bridges','Find what must be accepted for evidence to support a conclusion',[
  ['Argument anatomy',`Separate evidence/premises from conclusion. The assumption is often the invisible bridge that makes the move from one to the other possible.`],
  ['Necessary vs helpful',`A necessary assumption need not prove the conclusion; it must be something the argument depends on. Use the negation test: if denying a candidate wrecks the argument, it is likely necessary.`],
  ['Common gaps',`Correlation→causation, sample→population, past→future, one group→another, proxy measure→real construct, no evidence→evidence of absence, relative→absolute, and plan→desired outcome without side effects.`],
  ['RC caution',`Only infer an assumption when the passage’s reasoning requires it. Do not import a philosophical premise merely because it would make the author’s argument stronger.`]
 ],{difficulty:'Advanced',quiz:[['A study finds users of an app exercise more and concludes the app causes exercise. A central assumption is that:',['exercise is healthy','the groups do not differ in some preexisting way that explains the difference','all apps are identical','everyone owns a phone'],1,'The causal conclusion depends on ruling out selection/confounding explanations.']]}),
 topic('v-strengthen-weaken','verbal','Strengthen, weaken & alternative explanations','Evaluate which new fact changes the credibility of an argument rather than merely discussing its topic',[
  ['Target the gap',`A strengthening fact supports a premise, bridges an assumption, rules out an alternative, or makes the causal mechanism more plausible. A weakening fact attacks the same structural points.`],
  ['Causal arguments',`Ask about reverse causation, confounders, selection bias, measurement errors, coincidence, and whether the proposed mechanism operates at the relevant time/scale.`],
  ['Relevance test',`An answer can sound important yet leave the conclusion’s probability unchanged. Always say: “If this is true, exactly why should I believe the conclusion more/less?”`],
  ['Degree',`Strengthen/weaken questions rarely require certainty. The choice only has to move the evidential needle more than the alternatives.`]
 ],{difficulty:'Advanced',quiz:[['Which fact best weakens “City X’s bike lanes caused the fall in traffic injuries”?',['Bike lanes are popular','During the same period, the city also lowered speed limits citywide','Many residents own bicycles','Injuries are undesirable'],1,'A simultaneous intervention is an alternative causal explanation.']]}),
 topic('v-paradox','verbal','Resolve the paradox / explain the discrepancy','Hold both surprising facts true and find the missing circumstance that makes them compatible',[
  ['Do not attack a fact',`In paradox questions, the stated observations are givens. The correct answer explains how both can be true; it does not simply deny one.`],
  ['Build the tension',`State the contradiction in one sentence: “We expected X because A, but observed not-X.” Then ask what variable, subgroup, timing difference, denominator, or mechanism could reconcile them.`],
  ['Common resolutions',`Different populations, different time windows, hidden costs, composition effects, self-selection, thresholds, lagged effects, measurement definitions, or two opposing mechanisms.`],
  ['Answer test',`After reading a choice, retell the two facts with the new information inserted. If the surprise genuinely shrinks, it resolves the discrepancy.`]
 ],{quiz:[['A store cut prices yet total revenue rose. Which could resolve this?',['Customers dislike sales','The quantity sold rose by a sufficiently large percentage','Revenue equals price only','The store changed its logo'],1,'Revenue = price × quantity. A large enough increase in quantity can more than offset a lower price.']]}),
 topic('v-rc-inference-hard','verbal','Inference: must follow vs merely plausible','Use the narrowest defensible claim, combine statements carefully, and avoid real-world embellishment',[
  ['Inference standard',`Correct answers are supported by the passage even if not stated verbatim. “Could be true” is too weak; “must be true in all imaginable worlds” can be too strong. Think “best justified by the text.”`],
  ['Combination',`Some inferences require linking two separate statements. Write each as a small proposition, then combine only what their scopes allow.`],
  ['Counterexample test',`Try to imagine a scenario consistent with the passage in which the answer is false. If easy to do, the inference is probably too strong.`],
  ['Beware outside knowledge',`Specialized background may make an option factually true but textually unsupported. GRE RC asks what follows from the passage.`]
 ],{difficulty:'Advanced',quiz:[['If a passage says “some early studies failed to replicate the effect,” what can be inferred?',['No study replicated it','At least one early study failed to replicate it','Most early studies failed','The effect is false'],1,'“Some” guarantees at least one, and nothing stronger.']]}),
 topic('v-science-passages','verbal','Science passage literacy without science prerequisites','Read hypotheses, mechanisms, experiments, and competing explanations structurally rather than technically',[
  ['Translate the scientific skeleton',`Identify phenomenon → hypothesis → predicted observation → evidence → interpretation → limitation/alternative. Technical nouns are often less important than this structure.`],
  ['Variables and comparisons',`Notice what differs between groups, what is held constant, what outcome is measured, and whether evidence is observational or experimental. These details drive inference questions.`],
  ['Mechanism language',`Words like mediates, inhibits, catalyzes, associated with, necessary, sufficient, correlated, and proposed mechanism encode different strength. Do not convert association into causation.`],
  ['Unknown terms',`When a passage defines protein X, process Y, or species Z, treat the names as symbols. Build relationships from the text instead of spending working memory on the labels.`]
 ],{quiz:[['In a technical science passage, an unfamiliar molecule name should usually be treated first as:',['a cue to use outside knowledge','a label whose relationships are defined by the passage','proof the passage is impossible','a vocabulary question'],1,'GRE RC is designed so specialized knowledge is not required; track the relationships supplied in the passage.']]}),
 topic('v-humanities-passages','verbal','Humanities & arts passage literacy','Track interpretation, evidence, schools of thought, and authorial qualification in history, literature, and arts passages',[
  ['Interpretive disputes',`Humanities passages often contrast scholars’ readings rather than test factual chronology. Map who believes what and what evidence each view emphasizes.`],
  ['Evidence types',`Texts, artifacts, style, archival records, reception history, and contextual clues can support interpretations. Notice when the author argues evidence is incomplete or overread.`],
  ['Author distance',`Attribution verbs matter: argues, claims, assumes, concedes, demonstrates, speculates. “Scholar X contends” does not mean the passage author agrees.`],
  ['Nuance',`The correct main idea may be a qualified synthesis: an older interpretation is useful but incomplete; a new explanation is promising but not decisive.`]
 ],{quiz:[['If the author writes “Critic A ingeniously argues X, though the surviving letters offer little support,” the author is most likely:',['fully endorsing X','qualified/skeptical toward X despite respecting the argument','unaware of X','discussing only chronology'],1,'Praise for ingenuity is immediately qualified by an evidentiary weakness.']]}),
 topic('v-social-passages','verbal','Social science & business passage literacy','Handle studies, incentives, institutions, samples, policy claims, and competing causal stories',[
  ['Unit of analysis',`Know whether claims concern individuals, firms, countries, historical periods, or subgroups. Generalizing across levels is a common trap.`],
  ['Study design',`Sample selection, comparison groups, omitted variables, incentives, and operational definitions often matter more than technical terminology.`],
  ['Policy reasoning',`Distinguish descriptive claims (“what happens”), causal claims (“why”), and normative claims (“what should be done”). A passage may support one without supporting the others.`],
  ['Business/economic language',`Elasticity, incentives, productivity, market share, costs, and risk may be used in ordinary conceptual ways. Follow definitions supplied in context; no specialized economics course is assumed.`]
 ],{quiz:[['A study of volunteers is used to generalize to all residents. The most immediate concern is:',['arithmetic','sample representativeness','grammar','whether volunteers exist'],1,'Volunteers may systematically differ from the target population, making the generalization vulnerable.']]}),
 topic('v-reading-lab','verbal','Graduate-prose Reading Lab','Train the exact habits ETS recommends: sustained, active reading of sophisticated nonfiction',[
  ['Daily protocol',`Read 20–40 minutes from demanding nonfiction. After each paragraph, write its role; after the article, state thesis, evidence, strongest qualification, author attitude, and one inference.`],
  ['Do not collect facts',`The goal is not to memorize the subject. Train structure recognition, paraphrase speed, vocabulary-in-context, and comfort with long sentences.`],
  ['Source rotation',`Rotate science, social science, business/economics, arts/humanities, and argumentative commentary. Variety prevents you from becoming dependent on a familiar domain.`],
  ['Turn reading into retrieval',`Highlight at most a few words. Close the article and reconstruct the argument from memory. Then reopen and compare. That retrieval step is what turns “reading more” into GRE training.`]
 ],{minutes:40,quiz:[['The highest-value post-reading exercise is to:',['copy every unfamiliar word','reconstruct the argument and paragraph roles from memory','memorize the author’s biography','read only topics you already know'],1,'Active reconstruction trains structure, inference, and retention rather than passive familiarity.']]}),
 topic('v-trap-taxonomy','verbal','Verbal trap taxonomy: why wrong answers look right','Classify wrong choices by distortion type so elimination becomes a repeatable skill',[
  ['Common RC traps',`Too broad, too narrow, too strong, half-right/half-wrong, reversed relationship, wrong speaker, wrong time frame, true-but-irrelevant, plausible outside knowledge, cause/effect reversal, and detail used as main idea.`],
  ['TC/SE traps',`Correct tone but wrong logic; right general meaning but wrong degree; attractive rare word; synonym pair that fails the sentence; one blank solved locally but whole passage broken.`],
  ['Name the trap',`During review, do not write only “I chose B.” Write “B was a scope inflation” or “I confused author with cited scholar.” A named error is easier to recognize next time.`],
  ['Perfect-score review',`For every miss—and every lucky guess—explain why the correct answer must work and why each tempting alternative fails. That is more valuable than solving five fresh items mindlessly.`]
 ],{difficulty:'Advanced',quiz:[['An answer repeats a sentence from the passage accurately but does not answer the question asked. This is:',['a true-but-irrelevant trap','a grammar error','a calculation slip','a necessary inference'],0,'GRE distractors often exploit information that is true in the passage but irrelevant to the specific task.']]}),
// QUANT — split commonly tested applied/data skills into dedicated deep dives
 topic('q-units','quant','Units & dimensional analysis','Convert units, cancel dimensions, and detect impossible answers before calculating',[
  ['Write units into the algebra',`Treat units as factors: 60 miles/hour × 2 hours = 120 miles. Unit cancellation catches many setup errors automatically.`],
  ['Square/cubic conversion',`If 1 m = 100 cm, then 1 m² = 10,000 cm² and 1 m³ = 1,000,000 cm³. Linear conversion factors must be squared or cubed for area/volume.`],
  ['Rates',`Complex units such as dollars/item, miles/gallon, people/km², or widgets/worker-hour tell you which quantities should multiply or divide.`],
  ['Sanity check',`Before finalizing, inspect the target unit. If the question asks for time and your expression ends in distance/time, the model is wrong regardless of arithmetic.`]
 ],{quiz:[['If 1 meter = 100 centimeters, 2 square meters equals:',['200 cm²','2,000 cm²','20,000 cm²','200,000 cm²'],2,'1 m² = 100² = 10,000 cm², so 2 m² = 20,000 cm².']]}),
 topic('q-percent-growth','quant','Repeated percent change & growth factors','Handle compounding, reverse percent, percent points, and weighted changes cleanly',[
  ['Growth-factor model',`A p% increase multiplies by 1+p/100; a p% decrease multiplies by 1−p/100. Repeated changes multiply factors rather than adding percentages.`],
  ['Reverse change',`If final = original × factor, then original = final/factor. Do not “undo” a 20% increase by subtracting 20% of the final.`],
  ['Percent vs percentage points',`A rate moving from 20% to 25% rises 5 percentage points but rises 25% relative to its original rate.`],
  ['Unequal bases',`When groups have different original sizes, overall percent change must be computed from totals; averaging subgroup percentages is generally wrong.`]
 ],{quiz:[['A quantity falls 20% then rises 25%. Net change?',['5% increase','unchanged','5% decrease','cannot know'],1,'0.80×1.25=1.00.']]}),
 topic('q-mixtures','quant','Mixtures, concentration & weighted composition','Track the amount of the component that matters through adding, removing, and mixing',[
  ['Conservation equation',`Pure component = concentration × total amount. In a mixture problem, write an equation for the component, not merely the total liquid.`],
  ['Mixing',`If a liters at concentration p and b liters at concentration q are combined, component amount is ap+bq and total is a+b, so final concentration=(ap+bq)/(a+b).`],
  ['Removal/replacement',`If a well-mixed solution is partially removed, the removed portion has the same concentration as the solution at that moment. Recompute after each stage.`],
  ['Weighted-average link',`Concentration problems are weighted averages. The final percentage must lie between the source percentages unless pure component/solvent is added outside that range.`]
 ],{difficulty:'Advanced',quiz:[['10 L of 20% solution is mixed with 10 L of 40% solution. Final concentration?',['25%','30%','35%','60%'],1,'Pure amount=2+4=6 L in 20 L total → 30%.']]}),
 topic('q-work-combined','quant','Combined work & productivity','Translate individual rates into fractions of a job per unit time',[
  ['Rate representation',`If A completes one job in a hours, A’s rate is 1/a job/hour. Add rates when workers operate simultaneously on the same divisible task.`],
  ['Combined time',`For two workers: 1/T=1/a+1/b when both work continuously at constant independent rates. The combined time must be less than the faster individual time.`],
  ['Partial schedules',`If workers join or leave, break the timeline into stages. Work completed in a stage = rate × time; remaining work carries forward.`],
  ['Productivity units',`Workers × hours × output/worker-hour = output. If productivity changes, separate headcount/time from rate.`]
 ],{quiz:[['A takes 6 h and B takes 3 h to complete a job alone. Together they take:',['1 h','2 h','3 h','4.5 h'],1,'Combined rate=1/6+1/3=1/2 job/h, so time=2 h.']]}),
 topic('q-scatter','quant','Scatterplots, association & trend','Interpret direction, strength, outliers, nonlinear patterns, and what correlation cannot prove',[
  ['Direction and form',`Positive association rises left→right; negative falls; weak association is diffuse; nonlinear patterns may be strong even if not well described by a line.`],
  ['Outliers',`A single extreme point can materially change an apparent trend. Compare the cloud with and without the point when the question asks what influences association.`],
  ['No automatic causation',`A scatterplot can show association, not by itself establish that X causes Y. A lurking variable or reverse direction may exist.`],
  ['Scale',`ETS graphical data presentations are drawn to scale, but read axes, units, truncated ranges, and labels before judging visual steepness or magnitude.`]
 ],{quiz:[['A strong positive scatterplot association proves:',['X causes Y','Y causes X','a positive association, but not causation by itself','there are no outliers'],2,'Association alone does not identify causal direction or eliminate confounding.']]}),
 topic('q-frequency','quant','Frequency distributions & histograms','Read bins, frequencies, relative frequencies, cumulative counts, and unequal visual scales',[
  ['Bins',`A histogram groups quantitative values into intervals; adjacent bars normally represent continuous intervals. Do not confuse histogram bins with categorical bar-chart labels.`],
  ['Frequency vs relative frequency',`Frequency is a count. Relative frequency = count/total. Percentage = relative frequency×100%.`],
  ['Cumulative frequency',`Cumulative counts answer “at most/below” style questions by adding all bins up to a boundary. Be precise about inclusive/exclusive endpoints given by the intervals.`],
  ['Shape',`Recognize symmetric, left-skewed, right-skewed, uniform, unimodal, and bimodal patterns. Skew direction points toward the long tail, not the location of the tallest bar.`]
 ],{quiz:[['In a right-skewed distribution, the long tail extends primarily:',['left','right','both equally','nowhere'],1,'Skew is named for the direction of the longer tail.']]}),
 topic('q-normal','quant','Normal distributions & standardized position','Use symmetry and qualitative normal-curve reasoning without overreaching beyond GRE scope',[
  ['Shape',`A normal distribution is symmetric, bell-shaped, and centered at its mean; mean=median=mode for an ideal normal distribution.`],
  ['Spread',`Standard deviation controls width. A larger SD spreads observations farther from the same mean. Converting x to z=(x−mean)/SD expresses distance from the mean in SD units.`],
  ['Empirical rule',`For a normal distribution, roughly 68% lies within 1 SD, 95% within 2, and 99.7% within 3. Use only when the distribution is described as normal and the question supports the approximation.`],
  ['Percentile intuition',`By symmetry, 50% lies below the mean. Values above the mean have z>0; below, z<0. Equal z-scores indicate equal relative position even across different scales.`]
 ],{difficulty:'Advanced',quiz:[['A score one standard deviation above the mean has z-score:',['−1','0','1','depends on units'],2,'z=(x−mean)/SD=1.']]}),
 topic('q-di-hard','quant','Data Interpretation: hard-set protocol','Control units, denominators, broken scales, multi-step percentages, and shared-display timing',[
  ['30-second scan',`Before question 1, identify title, axes, units, legends, date ranges, notes, and whether values are totals, rates, percentages, or indexed figures. Do not study every number.`],
  ['Denominator discipline',`“Percent of total,” “percent increase,” “share of subgroup,” and “ratio to category B” use different denominators. Write the denominator explicitly before calculating.`],
  ['Display traps',`Watch nonzero baselines, broken scales, dual axes, thousands/millions/billions, stacked categories, cumulative totals, and rounding notes.`],
  ['Reuse work',`A DI set shares a display, so annotate useful totals/conversions once. But do not let a hard early item consume the time of later easier items in the same set.`]
 ],{difficulty:'Advanced',quiz:[['Before calculating a DI percent change, the most important denominator check is:',['use the larger number','use the original/base value unless the prompt defines otherwise','always use total sample','always use 100'],1,'Percent change is relative to the original/base amount unless another denominator is explicitly specified.']]}),
 topic('q-qc-adversarial','quant','Quantitative Comparison: adversarial value testing','Systematically search sign, zero, fraction, equality, boundary, and extreme cases before committing',[
  ['Four outcomes',`A greater, B greater, equal, or relationship cannot be determined. “Cannot be determined” is proved by finding two legal cases that produce different relationships.`],
  ['Case checklist',`For unrestricted variables test negative, zero, positive fraction, 1, and >1 when relevant. For inequalities test boundary-adjacent values. For integers test parity and smallest allowed values.`],
  ['Do not over-solve',`QC asks for relationship, not exact values. Simplify both quantities, compare differences/ratios when safe, and stop once the relationship is established for all permitted cases.`],
  ['Hidden restrictions',`Square roots, denominators, geometry, counts, and words like positive/distinct/consecutive impose domain restrictions. Illegal test values can create fake counterexamples.`]
 ],{difficulty:'Advanced',quiz:[['To prove QC answer D (“cannot be determined”), you need:',['one example where A>B','two legal examples producing different comparison outcomes','an algebraic solution for x','a calculator'],1,'Different legal cases with different outcomes prove no single relationship is forced.']]}),
 topic('q-scaling','quant','Scaling laws: length, area & volume','Understand how changing dimensions changes perimeter, area, surface area, and volume',[
  ['Linear scale',`If every length is multiplied by k, all other lengths and perimeter scale by k.`],
  ['Area scale',`Areas scale by k². Doubling every dimension quadruples area; tripling gives nine times the area.`],
  ['Volume scale',`Volumes scale by k³. Doubling every dimension multiplies volume by 8.`],
  ['Similarity shortcut',`For similar figures, corresponding side ratio = k, area ratio = k², volume ratio = k³. This often eliminates lengthy formula substitution.`]
 ],{quiz:[['A cube’s edge length increases by 50%. Its volume is multiplied by:',['1.5','2.25','3.375','4.5'],2,'Volume scales with the cube of the linear factor: 1.5³=3.375.']]}),
 topic('q-integer-constraints','quant','Integer constraints & hidden discreteness','Exploit divisibility, parity, bounds, and integrality when algebra alone leaves many possibilities',[
  ['Continuous vs integer world',`An equation may permit infinitely many real solutions but only a few integer solutions. If variables are integers, use divisibility and bounds before heavy algebra.`],
  ['Factor-pair method',`Expressions such as xy=n or (x−a)(y−b)=c can be solved by enumerating integer factor pairs of c.`],
  ['Parity/mod constraints',`If one side must be even, odd, or a particular remainder class, eliminate impossible cases immediately.`],
  ['Bounds',`Positive integer restrictions plus a fixed sum/product often make extreme values easy to identify. Always use the domain information the GRE gives you.`]
 ],{difficulty:'Advanced',quiz:[['If positive integers x and y satisfy xy=12, how many ordered pairs (x,y) exist?',['3','4','6','12'],2,'Positive divisors x=1,2,3,4,6,12 each determine y, giving 6 ordered pairs.']]}),
// WRITING — additional 6.0-specific drills
 topic('a-nuance','writing','Nuance without mush: qualify a thesis','Take a clear position while identifying the exact conditions under which the opposite view has force',[
  ['Qualification is not indecision',`A nuanced thesis still answers the prompt. State the general rule, then specify a boundary: “Generally X because A and B; however, when condition C holds, Y becomes preferable.”`],
  ['Choose meaningful exceptions',`A useful concession changes the analysis. Avoid token “both sides have merit” paragraphs. Explain the mechanism that makes the exception different.`],
  ['Return to the thesis',`After conceding, show whether the exception narrows, modifies, or strengthens your main principle. This turns counterargument into analysis rather than digression.`],
  ['6.0 habit',`Complexity comes from distinctions—short vs long term, individual vs institution, discovery vs implementation, normal vs crisis conditions—not from using ornate vocabulary.`]
 ],{difficulty:'Advanced',quiz:[['Which thesis is most analytically useful?',['Both sides are right','I completely agree in every case','Generally the policy is beneficial because X, but when Y is present its incentives reverse','This issue is complex'],2,'It is decisive yet conditional, giving the essay a clear analytical structure.']]}),
 topic('a-example-depth','writing','Turn examples into analysis, not name-dropping','Build mechanism-rich examples that actually prove the claim',[
  ['Example chain',`Context → specific action/event → mechanism → consequence → explicit link to thesis. The mechanism is the part most rushed essays omit.`],
  ['Accuracy over trivia',`You do not need obscure dates or exhaustive historical detail. Use facts you can state confidently and spend words explaining relevance.`],
  ['Hypotheticals are valid',`A well-designed hypothetical can be persuasive if it makes the causal logic clear. ETS evaluates reasoning and support, not a trivia contest.`],
  ['Contrastive examples',`Pair cases where the principle works and fails under different conditions. This creates nuance efficiently and prevents sweeping generalization.`]
 ],{quiz:[['The most important sentence after an example is usually the one that:',['adds another proper noun','explains how the example supports the argument','uses the longest word','repeats the prompt'],1,'Examples become evidence only when their mechanism and relevance are made explicit.']]}),
 topic('a-revision','writing','The 3-minute revision pass','Prioritize thesis alignment, logical gaps, sentence clarity, and high-impact grammar under time pressure',[
  ['First: argument',`Check that each body paragraph has a claim and that the conclusion actually follows. Delete or repair a sentence that contradicts the thesis before hunting commas.`],
  ['Second: clarity',`Fix pronoun ambiguity, fragments/run-ons, missing words, subject–verb disagreement, and sentences so long that the main clause disappears.`],
  ['Third: precision',`Replace vague “things,” “a lot,” “good/bad,” and repeated generic verbs with precise but natural language. Do not insert risky vocabulary solely to sound sophisticated.`],
  ['Last: mechanics',`Scan sentence starts and endings for capitalization/punctuation, then common personal errors. A targeted checklist is faster than rereading for “anything wrong.”`]
 ],{quiz:[['With 90 seconds left, which edit has highest priority?',['replace “use” with an obscure synonym','fix a sentence whose logic contradicts your thesis','add a fourth example','change font'],1,'Coherence and clarity affect the rubric more than decorative vocabulary.']]}),
 topic('a-idea-bank','writing','Issue idea bank: reusable analytical lenses','Generate arguments rapidly using incentives, tradeoffs, institutions, knowledge, equity, innovation, and time horizons',[
  ['Seven lenses',`Ask about incentives, unintended consequences, information/knowledge limits, fairness/distribution, institutional capacity, innovation/adaptation, and short-term vs long-term effects.`],
  ['Stakeholders',`Who gains, who pays, who decides, who lacks information, and who bears risk? Stakeholder mapping quickly generates reasons and exceptions.`],
  ['Scale',`A principle appropriate for individuals may fail for governments; a local success may not scale nationally; an emergency rule may be poor normal policy.`],
  ['Do not memorize essays',`Memorize reasoning lenses and flexible examples, not canned paragraphs. The task instruction changes what you must do with the topic.`]
 ],{quiz:[['A fast way to create a sophisticated exception is to ask:',['Can I use more adjectives?','Does the principle change across stakeholders, scale, or time horizon?','Can I quote a celebrity?','Can I avoid a thesis?'],1,'Stakeholder/scale/time distinctions generate real analytical conditions.']]}),
// STRATEGY — perfect-score process chapters
 topic('s-adaptive-deep','strategy','Section-level adaptation: what to optimize','Understand what adaptation changes—and what it does not—so you protect accuracy without gaming the test',[
  ['How it works',`Verbal and Quant are section-level adaptive: performance on the first scored section influences the difficulty of the second section in that measure. Within a section, you can move around, mark, review, and change answers.`],
  ['Do not game difficulty',`Your job is still to maximize correct answers. Do not intentionally miss questions, spend absurd time trying to infer difficulty, or panic because an item feels easy/hard.`],
  ['First-section discipline',`Because the first section affects the second section’s difficulty, careless early misses can be costly. But “protect section 1” means controlled accuracy and triage, not refusing to skip a time sink.`],
  ['Second section',`A harder-feeling second section is not a score report. Continue using the same evidence-based timing rules and answer every question.`]
 ],{difficulty:'Advanced',quiz:[['The best adaptation strategy is to:',['intentionally miss easy questions','maximize correct answers while using normal triage and review','guess the algorithm after each item','spend unlimited time in section 1'],1,'Adaptation changes section difficulty; the scoring objective remains getting as many questions correct as possible.']]}),
 topic('s-error-budget','strategy','170-level error budget & reliability','Turn “I know this” into repeatable near-zero careless-error performance',[
  ['Knowledge is necessary, not sufficient',`At the top end, misses increasingly come from execution: misreading scope, sign errors, wrong denominator, skipped constraint, premature answer selection, or overthinking a verbal choice.`],
  ['Reliability metric',`Track error rate by category over several timed sets. A concept is not “mastered” because you solved one hard example; it is mastered when you repeatedly execute it under time with low variance.`],
  ['Lucky guesses count as errors',`If your reasoning was incomplete but the answer happened to be right, log it. Perfect-score preparation cannot hide behind answer-key luck.`],
  ['Repair loop',`Classify → identify trigger → write replacement behavior → do 3–10 targeted items → retest later mixed and timed. An error is closed only after the replacement behavior survives delay.`]
 ],{difficulty:'Advanced',quiz:[['A guessed-correct question should be treated in review as:',['fully mastered','an unresolved reasoning error','irrelevant','proof your intuition is enough'],1,'The result was correct but the process is unreliable; top-score prep audits the process.']]}),
 topic('s-masterygates','strategy','Mastery gates: when a chapter is actually done','Use retrieval, transfer, mixed practice, and delayed retesting instead of completion clicks',[
  ['Gate 1 — explain',`Without notes, explain the rule or strategy in your own words and give a counterexample/trap.`],
  ['Gate 2 — execute',`Solve several representative questions with high accuracy untimed, including at least one hard variant.`],
  ['Gate 3 — transfer',`Recognize the skill when it appears mixed with other topics and when the surface story changes.`],
  ['Gate 4 — retain',`Retest after delay under realistic time. Only then treat the skill as stable. GRE Atlas completion is a navigation marker; your error log and timed results are the real evidence.`]
 ],{quiz:[['Which is the strongest evidence of mastery?',['reading the lesson twice','getting one example right immediately','accurate mixed timed performance after a delay','recognizing the formula when shown'],2,'Delayed, mixed, timed retrieval demonstrates retention and transfer.']]}),
 topic('s-final-calibration','strategy','Final calibration: convert practice skill into test-day score','Use official simulations, pacing evidence, sleep/routine, and a taper instead of last-minute volume',[
  ['Official calibration',`Use official POWERPREP strategically to calibrate interface, pacing, adaptation, stamina, and score—not simply as another question bank.`],
  ['Replicate conditions',`Same start time when possible, normal breaks/rules, no pausing, no answer checking mid-test, realistic scratch setup, and no phone interruptions.`],
  ['Taper',`In the final days, prioritize stable sleep, light retrieval, error-log review, familiar pacing, and logistics. Avoid introducing dozens of new tricks or exhausting marathon sessions.`],
  ['After each mock',`Separate content gap from process failure. The next week’s plan should be driven by repeated evidence across questions, not emotion about one scaled score.`]
 ],{difficulty:'Advanced',quiz:[['The best use of an official full simulation is to:',['take it casually for extra questions','replicate test conditions and diagnose pacing/process/content','pause whenever tired','look up answers during sections'],1,'Calibration requires realistic conditions and disciplined post-test analysis.']]})
]);

const topicMap = Object.fromEntries(TOPICS.map(t=>[t.id,t]));
const byModule = m => TOPICS.filter(t=>t.module===m);

const VOCAB = [
 ['abate','verb','become less intense; reduce','subside, diminish'],['aberrant','adj.','departing from the normal or expected','anomalous, deviant'],['abeyance','noun','temporary suspension or inactivity','suspension, dormancy'],['abjure','verb','renounce formally or solemnly','forswear, repudiate'],['abstemious','adj.','moderate and restrained, especially in consumption','temperate, sparing'],['accretion','noun','gradual growth by accumulation','buildup, accumulation'],['acrimony','noun','bitterness or sharp hostility in speech','rancor, bitterness'],['adroit','adj.','skillful and clever in action or thought','dexterous, deft'],['aesthetic','adj.','concerned with beauty or artistic judgment','artistic, tasteful'],['alacrity','noun','cheerful readiness and quickness','eagerness, promptness'],
 ['ameliorate','verb','make a bad situation better','improve, mitigate'],['anachronism','noun','something placed in the wrong historical time','misdating, temporal mismatch'],['anodyne','adj./noun','soothing or unlikely to provoke disagreement','bland, calming'],['antipathy','noun','strong dislike or aversion','aversion, hostility'],['apathy','noun','lack of interest or feeling','indifference, listlessness'],['appease','verb','calm or satisfy by concessions','placate, pacify'],['arbitrary','adj.','based on whim rather than reason or system','capricious, random'],['arcane','adj.','understood by very few; obscure','esoteric, recondite'],['arduous','adj.','requiring great effort','strenuous, laborious'],['artless','adj.','simple and sincere; without guile','guileless, ingenuous'],
 ['ascetic','adj./noun','practicing severe self-discipline and abstention','austere, self-denying'],['assiduous','adj.','showing persistent careful effort','diligent, industrious'],['assuage','verb','make an unpleasant feeling less intense','soothe, alleviate'],['audacious','adj.','bold, daring, sometimes recklessly so','intrepid, brazen'],['austere','adj.','severely simple, strict, or plain','stern, unadorned'],['avarice','noun','extreme greed for wealth','cupidity, greed'],['banal','adj.','so common as to be boring','trite, hackneyed'],['belie','verb','give a false impression of; contradict','misrepresent, contradict'],['beneficent','adj.','doing good or producing benefit','benevolent, charitable'],['bolster','verb','support or strengthen','reinforce, buttress'],
 ['bombastic','adj.','pompous and inflated in language','grandiloquent, turgid'],['boorish','adj.','rough, rude, and insensitive','uncouth, coarse'],['burgeon','verb','grow or develop rapidly','flourish, expand'],['cajole','verb','persuade through flattery or coaxing','coax, wheedle'],['calumny','noun','a false statement meant to damage reputation','slander, defamation'],['candor','noun','honest and direct expression','frankness, openness'],['capricious','adj.','changing unpredictably according to whim','fickle, arbitrary'],['castigate','verb','criticize or punish severely','chastise, rebuke'],['caustic','adj.','bitingly sarcastic or corrosive','scathing, cutting'],['censure','verb/noun','express strong official disapproval','condemn, rebuke'],
 ['chicanery','noun','deception by clever trickery','subterfuge, trickery'],['circumspect','adj.','careful to consider risks and consequences','cautious, prudent'],['clandestine','adj.','kept secret, often because improper','covert, surreptitious'],['coalesce','verb','come together into one whole','merge, unite'],['cogent','adj.','clear, logical, and convincing','compelling, persuasive'],['complacent','adj.','self-satisfied and unaware of danger or defects','smug, unworried'],['conciliatory','adj.','intended to reduce hostility','appeasing, pacifying'],['concomitant','adj./noun','naturally accompanying or associated','attendant, accompanying'],['conflagration','noun','a large destructive fire; major conflict','inferno, blaze'],['conundrum','noun','a difficult puzzle or problem','puzzle, dilemma'],
 ['corroborate','verb','confirm with additional evidence','verify, substantiate'],['credulous','adj.','too ready to believe claims','gullible, trusting'],['cursory','adj.','quick and not thorough','perfunctory, superficial'],['dearth','noun','a scarcity or lack','paucity, shortage'],['debunk','verb','expose as false or exaggerated','discredit, refute'],['decorum','noun','proper and dignified behavior','propriety, etiquette'],['deference','noun','respectful submission to another’s judgment','respect, submission'],['deleterious','adj.','causing harm or damage','detrimental, injurious'],['demur','verb','raise doubts or objections','object, hesitate'],['denigrate','verb','criticize unfairly; belittle','disparage, demean'],
 ['derivative','adj.','imitative rather than original','unoriginal, borrowed'],['desultory','adj.','lacking a plan or steady purpose','random, aimless'],['didactic','adj.','intended to teach, sometimes excessively','instructive, preachy'],['diffident','adj.','modest or shy from lack of confidence','timid, self-effacing'],['dilatory','adj.','slow or intended to cause delay','tardy, procrastinating'],['disabuse','verb','free someone from a mistaken belief','correct, enlighten'],['disparate','adj.','fundamentally different','dissimilar, divergent'],['dispassionate','adj.','not influenced by strong emotion','impartial, objective'],['dogmatic','adj.','asserting opinions as unquestionably true','doctrinaire, inflexible'],['dupe','verb/noun','deceive; a person who is deceived','trick, gull'],
 ['ebullient','adj.','cheerful and full of energy','exuberant, buoyant'],['eclectic','adj.','drawn from many varied sources','diverse, wide-ranging'],['effrontery','noun','shameless boldness','audacity, impudence'],['egalitarian','adj.','favoring equality of rights or status','equalitarian'],['egregious','adj.','outstandingly bad','flagrant, glaring'],['elicit','verb','draw out a response or information','evoke, extract'],['eloquent','adj.','fluent and persuasive in expression','expressive, articulate'],['enervate','verb','weaken or drain energy','debilitate, exhaust'],['enigmatic','adj.','mysterious or difficult to interpret','puzzling, cryptic'],['ephemeral','adj.','lasting a very short time','fleeting, transitory'],
 ['equivocal','adj.','ambiguous or open to multiple interpretations','ambiguous, noncommittal'],['erudite','adj.','having deep scholarly knowledge','learned, scholarly'],['esoteric','adj.','intended for or understood by a small group','arcane, recondite'],['eulogy','noun','speech or writing praising someone, often after death','tribute, praise'],['exacerbate','verb','make a problem or bad situation worse','aggravate, intensify'],['exculpate','verb','clear from blame','absolve, vindicate'],['exigent','adj.','urgent and demanding immediate attention','pressing, critical'],['extant','adj.','still existing','surviving, remaining'],['fastidious','adj.','very attentive to detail; hard to please','meticulous, exacting'],['fatuous','adj.','silly and pointless','inane, foolish'],
 ['fervid','adj.','intensely enthusiastic or passionate','ardent, impassioned'],['florid','adj.','excessively elaborate or ornate','flowery, ornate'],['garrulous','adj.','excessively talkative','loquacious, verbose'],['germane','adj.','directly relevant','pertinent, relevant'],['glib','adj.','fluent but shallow or insincere','slick, facile'],['gregarious','adj.','sociable and fond of company','outgoing, convivial'],['hackneyed','adj.','overused and lacking freshness','trite, banal'],['iconoclast','noun','one who attacks cherished beliefs or institutions','nonconformist, critic'],['idiosyncratic','adj.','peculiar to an individual','distinctive, quirky'],['impecunious','adj.','having little or no money','poor, penniless'],
 ['imperturbable','adj.','calm and not easily upset','unflappable, composed'],['impetuous','adj.','acting quickly without enough thought','rash, impulsive'],['implacable','adj.','unable to be appeased','relentless, inexorable'],['inchoate','adj.','only partly formed or developed','incipient, rudimentary'],['incongruous','adj.','out of place or inconsistent','discordant, incompatible'],['indolent','adj.','habitually lazy','slothful, idle'],['ineffable','adj.','too great or extreme to be expressed in words','indescribable, inexpressible'],['ingenuous','adj.','innocent and straightforward; candid','naive, guileless'],['inimical','adj.','hostile or harmful','adverse, antagonistic'],['insipid','adj.','lacking flavor, vigor, or interest','bland, dull'],
 ['intransigent','adj.','unwilling to compromise','uncompromising, obstinate'],['laconic','adj.','using very few words','terse, concise'],['laud','verb','praise highly','extol, acclaim'],['loquacious','adj.','very talkative','garrulous, voluble'],['lucid','adj.','clear and easy to understand','intelligible, coherent'],['magnanimous','adj.','generous and forgiving, especially toward a rival','noble, generous'],['malleable','adj.','easily shaped or influenced','pliable, adaptable'],['mendacious','adj.','dishonest; lying','deceitful, untruthful'],['mercurial','adj.','changing mood or behavior unpredictably','volatile, fickle'],['meticulous','adj.','extremely careful about details','scrupulous, exacting'],
 ['mitigate','verb','make less severe or painful','alleviate, moderate'],['mollify','verb','calm someone’s anger or anxiety','placate, soothe'],['munificent','adj.','extremely generous','lavish, bountiful'],['myopic','adj.','short-sighted; lacking long-term perspective','narrow, shortsighted'],['nascent','adj.','just beginning to exist or develop','emerging, incipient'],['nebulous','adj.','vague or ill-defined','hazy, amorphous'],['obdurate','adj.','stubbornly refusing to change','inflexible, unyielding'],['obfuscate','verb','make unclear or harder to understand','confuse, obscure'],['obsequious','adj.','excessively eager to please or obey','servile, sycophantic'],['opaque','adj.','not transparent; difficult to understand','obscure, inscrutable'],
 ['ostentatious','adj.','designed to attract notice and display wealth/status','showy, pretentious'],['paradigm','noun','a model or typical pattern','model, framework'],['parsimonious','adj.','extremely unwilling to spend; also economical in explanation','stingy, frugal'],['pedantic','adj.','overly concerned with minor rules or displays of learning','doctrinaire, bookish'],['pellucid','adj.','very clear in meaning or style','lucid, transparent'],['perfunctory','adj.','done with minimal effort or interest','cursory, mechanical'],['pernicious','adj.','having a harmful effect, often gradually','damaging, deleterious'],['placate','verb','make less angry or hostile','appease, pacify'],['pragmatic','adj.','focused on practical results','practical, realistic'],['precipitate','verb/adj.','cause suddenly; done too hastily','trigger, rash'],
 ['prodigal','adj.','wastefully extravagant','lavish, spendthrift'],['prolific','adj.','producing much or many','productive, abundant'],['prosaic','adj.','ordinary, unimaginative, or matter-of-fact','mundane, pedestrian'],['protean','adj.','able to change form readily; versatile','mutable, versatile'],['prudent','adj.','showing careful good judgment','wise, cautious'],['pugnacious','adj.','eager to fight or argue','belligerent, combative'],['quixotic','adj.','idealistic in an impractical way','romantic, unrealistic'],['recalcitrant','adj.','resisting authority or control','defiant, uncooperative'],['recondite','adj.','little known and difficult to understand','obscure, esoteric'],['reticent','adj.','not revealing thoughts readily; reserved','restrained, taciturn'],
 ['sagacious','adj.','wise and perceptive','shrewd, discerning'],['salubrious','adj.','health-giving or pleasant','wholesome, beneficial'],['sanguine','adj.','optimistic, especially in a difficult situation','hopeful, buoyant'],['sardonic','adj.','grimly mocking or cynical','scornful, derisive'],['scrupulous','adj.','very careful and principled','meticulous, conscientious'],['spurious','adj.','false but appearing genuine','bogus, specious'],['stolid','adj.','calm and showing little emotion','impassive, phlegmatic'],['taciturn','adj.','habitually quiet; saying little','reserved, laconic'],['tenuous','adj.','very weak, slight, or thin','fragile, insubstantial'],['tirade','noun','a long angry speech','diatribe, rant'],
 ['trenchant','adj.','sharp, effective, and insightful','incisive, penetrating'],['ubiquitous','adj.','present or found everywhere','omnipresent, pervasive'],['vacillate','verb','waver between choices','hesitate, oscillate'],['venerate','verb','regard with deep respect','revere, honor'],['verbose','adj.','using more words than necessary','wordy, prolix'],['vindicate','verb','clear from blame or prove right','exonerate, justify'],['vitriolic','adj.','filled with bitter criticism','caustic, venomous'],['volatile','adj.','liable to change rapidly and unpredictably','unstable, mercurial'],['wary','adj.','cautious about possible danger','vigilant, circumspect'],['zealous','adj.','showing intense enthusiasm','fervent, ardent']
];

VOCAB.push(...[
 ['abrogate','verb','formally abolish or repeal','revoke, annul'],['abscond','verb','leave secretly to avoid capture or duty','flee, escape'],['acerbic','adj.','sharp and bitter in tone','caustic, biting'],['acquiesce','verb','accept something reluctantly without protest','consent, comply'],['admonish','verb','warn or reprimand firmly','rebuke, caution'],['adulterate','verb','make impure by adding inferior material','contaminate, debase'],['advocate','verb/noun','support publicly; a supporter','champion, promote'],['aggrandize','verb','increase power, status, or reputation','exalt, magnify'],['aggregate','verb/noun','collect into a whole; a total','combine, sum'],['altruistic','adj.','concerned selflessly with others','selfless, benevolent'],
 ['ambivalent','adj.','having mixed or conflicting feelings','uncertain, conflicted'],['amenable','adj.','open and responsive to suggestion; manageable','receptive, compliant'],['amorphous','adj.','without clear shape or structure','formless, vague'],['antagonistic','adj.','actively opposed or hostile','inimical, adversarial'],['apocryphal','adj.','widely told but of doubtful truth','dubious, legendary'],['approbation','noun','official or strong approval','praise, endorsement'],['archaic','adj.','very old-fashioned or no longer in common use','antiquated, obsolete'],['artifice','noun','clever trickery or a deceptive device','ruse, stratagem'],['augment','verb','make larger or greater','increase, enlarge'],['autonomous','adj.','self-governing or independent','independent, self-directed'],
 ['baleful','adj.','threatening harm; menacing','sinister, harmful'],['benign','adj.','gentle, harmless, or favorable','mild, innocuous'],['brazen','adj.','bold and shameless','audacious, impudent'],['brittle','adj.','hard but easily broken; lacking flexibility','fragile, rigid'],['byzantine','adj.','excessively complicated and difficult to navigate','convoluted, labyrinthine'],['canonical','adj.','accepted as authoritative or standard','orthodox, established'],['capitulate','verb','stop resisting; surrender','yield, submit'],['catalyst','noun','something that accelerates change','stimulus, trigger'],['cathartic','adj.','providing emotional release','purging, cleansing'],['cerebral','adj.','intellectual rather than emotional','analytical, intellectual'],
 ['chauvinistic','adj.','excessively convinced of the superiority of one’s group','jingoistic, prejudiced'],['circumscribe','verb','restrict within limits','confine, delimit'],['coercive','adj.','using force or threats to compel','compulsory, intimidating'],['commensurate','adj.','corresponding in size or degree','proportionate, equivalent'],['compendium','noun','a concise collection of information','digest, collection'],['complaisant','adj.','eager to please; obliging','accommodating, agreeable'],['convoluted','adj.','extremely complex and difficult to follow','tortuous, intricate'],['cosmopolitan','adj.','familiar with many cultures; worldly','sophisticated, international'],['credence','noun','belief or acceptance as true','belief, trust'],['cryptic','adj.','mysterious or obscure in meaning','enigmatic, puzzling'],
 ['cynical','adj.','distrustful of human sincerity or motives','skeptical, sardonic'],['daunt','verb','make someone feel intimidated or discouraged','dismay, intimidate'],['debase','verb','reduce in quality, dignity, or value','degrade, cheapen'],['debilitate','verb','make weak or feeble','enervate, weaken'],['decry','verb','publicly condemn','denounce, criticize'],['delineate','verb','describe or mark precisely','outline, define'],['demagogue','noun','a leader who exploits emotions and prejudice','agitator, rabble-rouser'],['deride','verb','mock with contempt','ridicule, scorn'],['dichotomy','noun','a division into two contrasting parts','split, duality'],['diffuse','adj./verb','spread out; disperse widely','scattered, disseminate'],
 ['digress','verb','depart temporarily from the main subject','deviate, wander'],['disinterested','adj.','impartial; not influenced by personal advantage','unbiased, objective'],['dissemble','verb','conceal true motives or feelings','feign, disguise'],['dissident','noun/adj.','one who opposes official policy or doctrine','dissenting, opponent'],['edify','verb','instruct or improve morally or intellectually','instruct, enlighten'],['efficacious','adj.','successful in producing the intended result','effective, potent'],['effusive','adj.','showing excessive or unrestrained emotion','gushing, demonstrative'],['elegy','noun','a mournful poem or composition','lament, dirge'],['empirical','adj.','based on observation or experiment','observational, evidence-based'],['emulate','verb','try to equal or surpass by imitation','imitate, rival'],
 ['endemic','adj.','regularly found in a particular place or group','native, prevalent'],['engender','verb','cause or give rise to','generate, produce'],['ennui','noun','weary boredom from lack of interest','tedium, listlessness'],['enumerate','verb','list items one by one','itemize, count'],['equivocate','verb','use ambiguous language to avoid commitment','hedge, prevaricate'],['erratic','adj.','unpredictable and inconsistent','irregular, capricious'],['euphoria','noun','intense happiness or confidence','elation, exhilaration'],['evanescent','adj.','quickly fading or disappearing','fleeting, ephemeral'],['exonerate','verb','officially clear from blame','absolve, vindicate'],['expedient','adj./noun','convenient and practical, sometimes at moral cost','pragmatic, advantageous'],
 ['explicit','adj.','clearly and directly stated','unambiguous, definite'],['extol','verb','praise enthusiastically','laud, acclaim'],['extraneous','adj.','irrelevant or coming from outside','irrelevant, superfluous'],['facile','adj.','superficially easy or fluent, often lacking depth','glib, simplistic'],['fallacious','adj.','based on mistaken reasoning','unsound, misleading'],['fecund','adj.','fertile or highly productive','prolific, fruitful'],['flagrant','adj.','conspicuously and offensively bad','glaring, egregious'],['foment','verb','stir up or encourage unrest','incite, instigate'],['fortuitous','adj.','happening by chance, often fortunately','accidental, serendipitous'],['fractious','adj.','irritable and difficult to control','quarrelsome, unruly'],
 ['frugal','adj.','careful and economical with resources','thrifty, sparing'],['futile','adj.','incapable of producing a useful result','pointless, vain'],['gainsay','verb','deny or contradict','dispute, refute'],['galvanize','verb','shock or excite into action','stimulate, spur'],['grandiloquent','adj.','pompously elaborate in speech','bombastic, lofty'],['gratuitous','adj.','unnecessary or uncalled for; free','unwarranted, needless'],['guile','noun','sly or cunning deception','cunning, deceit'],['hegemony','noun','dominance of one group over others','supremacy, predominance'],['immutable','adj.','unable to be changed','unchangeable, fixed'],['impassive','adj.','showing no emotion','stolid, expressionless'],
 ['impugn','verb','challenge as false or questionable','attack, dispute'],['inadvertent','adj.','unintentional','accidental, unintended'],['incipient','adj.','beginning to happen or develop','nascent, emerging'],['incisive','adj.','clear, sharp, and analytically direct','trenchant, penetrating'],['intractable','adj.','very difficult to solve or manage','stubborn, unmanageable'],['inveterate','adj.','long-established and unlikely to change','habitual, entrenched'],['irascible','adj.','easily angered','irritable, hot-tempered'],['irresolute','adj.','unable to decide firmly','indecisive, wavering'],['judicious','adj.','showing sensible and careful judgment','prudent, discerning'],['latent','adj.','present but not yet visible or active','dormant, hidden'],
 ['lethargic','adj.','sluggish and lacking energy','torpid, listless'],['meander','verb','wander without a direct course','ramble, wind'],['misanthropic','adj.','distrustful or contemptuous of humankind','cynical, antisocial'],['modicum','noun','a small amount','bit, trace'],['morose','adj.','sullen and gloomy','dour, melancholy'],['mundane','adj.','ordinary and lacking excitement','prosaic, commonplace'],['negligible','adj.','so small as to be unimportant','trivial, insignificant'],['nettlesome','adj.','causing annoyance or difficulty','vexing, troublesome'],['novice','noun','a beginner','neophyte, newcomer'],['oblique','adj.','indirect or not straightforward','indirect, slanting'],
 ['obstinate','adj.','stubbornly refusing to change','obdurate, headstrong'],['officious','adj.','intrusively eager to offer unwanted help or authority','meddlesome, interfering'],['onerous','adj.','involving a heavy burden','burdensome, taxing'],['opprobrium','noun','harsh public disgrace or criticism','infamy, condemnation'],['orthodox','adj.','following established or traditional beliefs','conventional, traditional'],['paradoxical','adj.','seemingly contradictory yet possibly true','contradictory, puzzling'],['partial','adj.','biased in favor of one side; incomplete','biased, incomplete'],['paucity','noun','a small or insufficient amount','dearth, scarcity'],['pedestrian','adj.','dull, ordinary, and unimaginative','prosaic, commonplace'],['penchant','noun','a strong liking or tendency','inclination, fondness'],
 ['pervasive','adj.','spread throughout','ubiquitous, widespread'],['phlegmatic','adj.','calm and unemotional','stolid, impassive'],['placid','adj.','calm and peaceful','serene, tranquil'],['plausible','adj.','seemingly reasonable or believable','credible, likely'],['precarious','adj.','unstable or dangerously uncertain','insecure, risky'],['preclude','verb','prevent from happening or make impossible','bar, forestall'],['predilection','noun','a preference or special liking','penchant, inclination'],['presumptuous','adj.','overstepping proper bounds with excessive confidence','forward, arrogant'],['prevaricate','verb','avoid the truth by being deliberately vague','equivocate, hedge'],['prodigious','adj.','remarkably great in size, extent, or ability','enormous, exceptional'],
 ['propensity','noun','a natural tendency','inclination, proclivity'],['qualify','verb','limit or modify a statement; meet requirements','restrict, modify'],['rarefied','adj.','esoteric, refined, or accessible to few','elevated, exclusive'],['rebuke','verb/noun','express sharp disapproval','reprimand, censure'],['recant','verb','publicly withdraw a belief or statement','retract, renounce'],['redress','verb/noun','remedy or correct a wrong','remedy, compensation'],['refute','verb','prove a claim or argument false','disprove, rebut'],['relegate','verb','assign to a lower or less important position','demote, consign'],['remiss','adj.','negligent in fulfilling a duty','careless, lax'],['reproach','verb/noun','express disappointment or blame','rebuke, criticism'],
 ['repudiate','verb','reject or refuse to accept','disavow, renounce'],['resilient','adj.','able to recover quickly from difficulty','robust, adaptable'],['resolute','adj.','firmly determined','steadfast, unwavering'],['reverent','adj.','showing deep respect','venerating, respectful'],['robust','adj.','strong, healthy, or able to withstand stress','sturdy, vigorous'],['rueful','adj.','expressing regret or sorrow','remorseful, wry'],['sanction','noun/verb','official permission or a penalty; authorize','approval, penalty'],['scant','adj.','barely sufficient; meager','sparse, insufficient'],['skeptical','adj.','not easily convinced; questioning','doubtful, critical'],['solicitous','adj.','showing attentive concern','considerate, concerned'],
 ['soporific','adj.','causing sleep or drowsiness','sedative, sleep-inducing'],['specious','adj.','seemingly convincing but actually false','plausible-looking, deceptive'],['sporadic','adj.','occurring irregularly','intermittent, occasional'],['steadfast','adj.','firm and unwavering','resolute, constant'],['stringent','adj.','strict and demanding','rigorous, severe'],['sublime','adj.','of exceptional beauty or excellence','exalted, magnificent'],['subvert','verb','undermine the power or effectiveness of','destabilize, sabotage'],['supercilious','adj.','behaving as though superior to others','haughty, disdainful'],['tacit','adj.','understood without being openly stated','implicit, unspoken'],['temperate','adj.','moderate and restrained','abstemious, mild'],
 ['tentative','adj.','not fully decided or certain','provisional, hesitant'],['terse','adj.','brief and concise, sometimes abruptly so','laconic, succinct'],['torpor','noun','a state of inactivity or sluggishness','lethargy, stupor'],['transient','adj.','lasting only a short time','temporary, ephemeral'],['unequivocal','adj.','clear and leaving no doubt','unambiguous, explicit'],['urbane','adj.','polished, courteous, and sophisticated','suave, refined'],['vacuous','adj.','lacking thought or meaningful content','empty, inane'],['venerable','adj.','respected because of age, wisdom, or character','esteemed, august'],['veracity','noun','truthfulness or accuracy','truth, reliability'],['viable','adj.','capable of working successfully','feasible, workable'],
 ['visceral','adj.','arising from deep instinct rather than reasoning','instinctive, gut-level'],['wan','adj.','pale or weak in appearance','pallid, faint'],['whimsical','adj.','playfully unusual or governed by sudden fancy','capricious, fanciful'],['abash','verb','make embarrassed or ashamed','disconcert, embarrass'],['abject','adj.','extremely bad, miserable, or degraded','wretched, servile'],['adamant','adj.','refusing to change position','unyielding, resolute'],['affable','adj.','friendly and easy to talk to','genial, amiable'],['affectation','noun','behavior adopted to impress rather than naturally felt','pretense, pose'],['allay','verb','reduce fear, worry, or pain','assuage, calm'],['analogous','adj.','comparable in important respects','similar, parallel'],
 ['animosity','noun','strong hostility','antipathy, rancor'],['antediluvian','adj.','extremely old-fashioned','archaic, antiquated'],['apprise','verb','inform or notify','advise, acquaint'],['apt','adj.','appropriate or especially suitable; likely','fitting, prone'],['arresting','adj.','striking enough to attract attention','striking, compelling'],['attenuate','verb','reduce in force, value, or thickness','weaken, diminish'],['bellicose','adj.','eager to fight','pugnacious, belligerent'],['bucolic','adj.','pleasantly rural or pastoral','pastoral, rustic'],['cavalier','adj.','showing dismissive lack of concern','offhand, disdainful'],['corrosive','adj.','gradually destructive physically or figuratively','caustic, damaging'],
 ['defer','verb','postpone; yield respectfully to another','delay, submit'],['demarcate','verb','set the boundaries of','delineate, separate'],['discrete','adj.','separate and distinct','distinct, separate'],['encomium','noun','a formal expression of high praise','tribute, eulogy'],['foible','noun','a minor weakness or eccentricity','flaw, quirk'],['homogeneous','adj.','uniform in composition or kind','uniform, consistent'],['hubris','noun','excessive pride or self-confidence','arrogance, conceit'],['iconoclastic','adj.','challenging established beliefs or traditions','unorthodox, rebellious'],['impudent','adj.','boldly disrespectful','brazen, insolent'],['insular','adj.','narrow in outlook; isolated','provincial, inward-looking'],
 ['nuance','noun','a subtle distinction or variation','shade, subtlety'],['proclivity','noun','a natural tendency or inclination','propensity, penchant'],['quotidian','adj.','ordinary or occurring every day','daily, mundane'],['rancor','noun','lasting bitter resentment','acrimony, animosity'],['satiate','verb','satisfy fully or excessively','sate, glut'],['succinct','adj.','brief and clearly expressed','concise, terse'],['surreptitious','adj.','kept secret, especially because improper','clandestine, covert'],['sycophantic','adj.','excessively flattering toward the powerful','obsequious, servile'],['transgression','noun','an act that violates a rule or moral boundary','offense, violation'],['zealot','noun','a fanatically devoted supporter','fanatic, partisan']
]);

const ESSAY_PROMPTS = [
 'Universities should require every student, regardless of major, to complete substantial coursework outside the student’s primary field of study.',
 'The best leaders are those who are willing to change their most important decisions when new evidence appears.',
 'Society benefits more when public funding supports a small number of ambitious scientific projects than when it is spread among many modest projects.',
 'Educational institutions should reward intellectual risk-taking even when it results in failure.',
 'Governments should preserve historically significant buildings even when doing so limits economically valuable development.',
 'The increasing ability to personalize news and information weakens rather than strengthens public understanding.',
 'People learn more from defending a position they disagree with than from defending a position they already hold.',
 'A nation’s progress should be judged primarily by the quality of life of its least advantaged citizens.',
 'Technological convenience often reduces people’s capacity to solve problems independently.',
 'Experts should have greater influence than the general public over decisions that require specialized knowledge.',
 'Competition is a more powerful driver of excellence than cooperation.',
 'The most effective way to reduce misinformation is to teach people how to evaluate evidence rather than to restrict false claims.',
 'Organizations should promote employees based more on demonstrated potential than on past performance.',
 'The study of history is most valuable when it challenges a society’s preferred stories about itself.',
 'Major discoveries are more often the result of persistent incremental work than sudden flashes of genius.',
 'Public institutions should prefer policies that are reversible when the long-term consequences are uncertain.',
 'Students should be allowed to use artificial-intelligence tools in most academic work provided that their use is disclosed.',
 'A person’s willingness to revise a belief is a better sign of intelligence than the confidence with which the belief is held.',
 'Cities should prioritize dense public transportation systems over infrastructure designed for private cars.',
 'Works of art should be evaluated independently of the character and conduct of their creators.'
];

const DIAGNOSTIC = [
 {m:'quant',q:'If n is an integer and n² is odd, what must be true?',o:['n is even','n is odd','n is prime','n is positive'],a:1,skill:'Integers & parity'},
 {m:'quant',q:'A jacket marked $2400 is discounted 25%, then the sale price is increased by 10%. Final price?',o:['$1,800','$1,980','$2,040','$2,100'],a:1,skill:'Percent'},
 {m:'quant',q:'If x/y=3/5 and x+y=64, what is x?',o:['24','32','40','48'],a:0,skill:'Ratio'},
 {m:'quant',q:'For x>0, Quantity A: x+1/x. Quantity B: 2.',o:['A greater','B greater','Equal','Cannot be determined'],a:3,skill:'QC / algebra'},
 {m:'quant',q:'A right triangle has legs 9 and 12. Its area is:',o:['54','72','108','150'],a:0,skill:'Geometry'},
 {m:'quant',q:'The mean of 8 values is 15. If one value 11 is replaced by 27, the new mean is:',o:['16','17','18','19'],a:1,skill:'Averages'},
 {m:'quant',q:'A fair die is rolled twice. Probability the sum is 12?',o:['1/36','1/18','1/12','1/6'],a:0,skill:'Probability'},
 {m:'quant',q:'How many ways can 2 people be chosen from 7?',o:['14','21','35','42'],a:1,skill:'Counting'},
 {m:'verbal',q:'Although the scientist’s public lectures were lucid, her earliest papers were notoriously ___.',o:['opaque','concise','popular','generous'],a:0,skill:'Text Completion'},
 {m:'verbal',q:'Choose two words: “The committee’s report was praised for being ___: it made a complicated dispute unusually easy to understand.”',o:['pellucid','arcane','lucid','equivocal','desultory','opaque'],a:[0,2],skill:'Sentence Equivalence'},
 {m:'verbal',q:'Passage: “The new archive does not disprove the traditional account; rather, it shows that the account explains only one of several regional patterns.” The author’s stance toward the traditional account is best described as:',o:['total rejection','qualified limitation','unreserved endorsement','indifference'],a:1,skill:'Tone / stance'},
 {m:'verbal',q:'An argument claims a training program caused higher sales because employees who joined it sold more. Which most weakens?',o:['The program was popular','High-performing employees were more likely to volunteer for the program','Sales are measured monthly','The company sells several products'],a:1,skill:'Critical reasoning'},
 {m:'verbal',q:'“Parsimonious” most nearly means:',o:['extravagant','stingy or economical','uncertain','talkative'],a:1,skill:'Vocabulary'},
 {m:'verbal',q:'Passage: “The first theory explained the timing but not the location of the events. A later model explains both.” Main purpose?',o:['describe why a later model is more comprehensive','argue that timing is irrelevant','list unrelated models','prove the first theory fraudulent'],a:0,skill:'Main idea'},
 {m:'verbal',q:'“The claim is plausible, but the evidence offered for it is ___.”',o:['decisive','equivocal','copious','irrefutable'],a:1,skill:'Sentence logic'},
 {m:'verbal',q:'If a passage says a method “sometimes improves accuracy,” which conclusion is safest?',o:['It always improves accuracy','It can improve accuracy in at least some cases','It never hurts accuracy','It doubles accuracy'],a:1,skill:'Inference'}
];

const FORMULAS = [
 ['Arithmetic',['percent change = (new−old)/old ×100%','average = sum/count','weighted mean = Σ(wx)/Σw','distance = rate×time','work rates add: 1/T = 1/a + 1/b','GCF(a,b)×LCM(a,b)=ab for positive integers']],
 ['Exponents & algebra',['a^m·a^n=a^(m+n)','a^m/a^n=a^(m−n)','(a^m)^n=a^(mn)','a^(−n)=1/a^n','a²−b²=(a−b)(a+b)','quadratic: x=[−b±√(b²−4ac)]/(2a)']],
 ['Lines & coordinates',['slope=(y₂−y₁)/(x₂−x₁)','y=mx+b','distance=√[(x₂−x₁)²+(y₂−y₁)²]','midpoint=((x₁+x₂)/2,(y₁+y₂)/2)']],
 ['Triangles',['angle sum=180°','area=½bh','a²+b²=c² for right triangles','45-45-90 → 1:1:√2','30-60-90 → 1:√3:2']],
 ['Polygons & circles',['n-gon interior sum=(n−2)180°','regular exterior angle=360°/n','circle C=2πr','circle A=πr²','sector area=(θ/360)πr²']],
 ['Solids',['rectangular solid V=lwh','surface area=2(lw+lh+wh)','cylinder V=πr²h','cylinder SA=2πr²+2πrh','linear scale k → area k², volume k³']],
 ['Statistics',['range=max−min','IQR=Q3−Q1','translation +c leaves SD unchanged','scaling ×k changes SD by |k|','sum=mean×count']],
 ['Counting & probability',['nPr=n!/(n−r)!','nCr=n!/[r!(n−r)!]','P(not A)=1−P(A)','P(A or B)=P(A)+P(B)−P(A∩B)','P(A|B)=P(A∩B)/P(B)']],
 ['Sequences',['arithmetic nth=a₁+(n−1)d','arithmetic sum=n(a₁+a_n)/2','geometric nth=a₁r^(n−1)','geometric finite sum=a₁(1−r^n)/(1−r)']]
];

function routeTo(route){
  if(!route) route='dashboard';
  location.hash='#/'+route;
}
function currentRoute(){return location.hash.replace(/^#\/?/,'')||state.lastRoute||'dashboard'}
function moduleProgress(m){const arr=byModule(m), done=arr.filter(t=>state.completed[t.id]).length;return {done,total:arr.length,pct:arr.length?Math.round(done/arr.length*100):0}}
function overallProgress(){const done=TOPICS.filter(t=>state.completed[t.id]).length;return {done,total:TOPICS.length,pct:TOPICS.length?Math.round(done/TOPICS.length*100):0}}
function updateChrome(){
  const p=overallProgress();
  $('#miniProgress').textContent=p.pct+'%';$('#miniTopicCount').textContent=`${p.done} / ${p.total} topics`;$('#miniRing').style.setProperty('--p',`${p.pct*3.6}deg`);
  $('#topXp').textContent=`${state.xp||0} XP`;$('#topStreak').textContent=`Day ${state.streak||1}`;
  document.body.classList.toggle('night',!!state.settings?.night);
  const dueEl=$('#dueBadge');
  if(dueEl){try{const n=vocabQueue().due.length;dueEl.textContent=n>99?'99+':n;dueEl.hidden=!n}catch(e){}}
}
function setActiveNav(route){$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.route===route || (route.startsWith('vocab')&&b.dataset.route==='vocab') || (topicMap[route] && b.dataset.route===topicMap[route].module)))}

function render(){
  const route=currentRoute();state.lastRoute=route;saveState();setActiveNav(route);
  const app=$('#app');window.scrollTo({top:0,behavior:'instant'});
  if(topicMap[route]) app.innerHTML=renderLesson(topicMap[route]);
  else if(route==='dashboard') app.innerHTML=renderDashboard();
  else if(route==='roadmap') app.innerHTML=renderRoadmap();
  else if(route==='diagnostic') app.innerHTML=renderDiagnostic();
  else if(route==='today') app.innerHTML=renderToday();
  else if(route==='quant'||route==='verbal'||route==='writing'||route==='strategy') app.innerHTML=renderModule(route);
  else if(route==='drill') app.innerHTML=renderDrill();
  else if(route==='vocab'||route==='vocab-browse'||route==='vocab-groups'||route==='vocab-traps'||route==='vocab-roots'||route==='vocab-vault') app.innerHTML=renderVocab(route);
  else if(route==='essay') app.innerHTML=renderEssay();
  else if(route==='errors') app.innerHTML=renderErrors();
  else if(route==='mocks') app.innerHTML=renderMocks();
  else if(route==='coverage') app.innerHTML=renderCoverage();
  else if(route==='formula') app.innerHTML=renderFormula();
  else if(route==='resources') app.innerHTML=renderResources();
  else if(route==='settings') app.innerHTML=renderSettings();
  else app.innerHTML=renderNotFound(route);
  bindPage(route);
}

function renderDashboard(){
  const p=overallProgress(), q=moduleProgress('quant'),v=moduleProgress('verbal'),a=moduleProgress('writing'),s=moduleProgress('strategy');
  let due={reviews:0,newWords:0};try{const qq=vocabQueue();due={reviews:qq.reviews.length,newWords:qq.newRemaining}}catch(e){}
  const lastT=topicMap[state.lastRoute];const next=lastT&&!state.completed[lastT.id]?lastT:(TOPICS.find(t=>!state.completed[t.id])||TOPICS[0]);
  const exam = parseLocalDate(state.examDate);
  const days = exam ? Math.max(0,Math.ceil((exam-new Date())/86400000)) : null;
  return `<div class="page">
    <section class="hero"><div class="hero-grid"><div>
      <span class="eyebrow">Your GRE headquarters</span>
      <h1>Build the score.<br><em>Keep the system.</em></h1>
      <p class="lead">A complete study environment for a 340 + 6.0 target: concept mastery, timed reasoning, vocabulary retrieval, writing, error analysis, official-test simulation, and a plan you can stop and resume without losing your place.</p>
    </div><div class="hero-note">
      <div class="score-card"><small>Target</small><b>340</b><p>170 Quant + 170 Verbal</p></div>
      <div class="score-card"><small>Writing target</small><b>6.0</b><p>Outstanding analytical writing</p></div>
      <div class="score-card"><small>Curriculum</small><b>${p.total}</b><p>separate resumable topics</p></div>
      <div class="score-card"><small>Runway</small><b>${days==null?'—':days}</b><p>${exam?`days to ${fmtDate(exam)}`:'set your exam date in the roadmap'}</p></div>
    </div></div></section>

    <div class="daily-plan">
      <section class="mission-card"><span class="eyebrow" style="color:#9fb0b0">Continue where you left off</span><h3>${esc(next.title)}</h3><p>${esc(next.summary)}. Finish the lesson, do the mastery check, then log anything you miss.</p><div class="mission-actions"><button class="primary-btn" data-route="${next.id}">Continue chapter →</button><button class="secondary-btn" data-route="today">Today's plan</button></div></section>
      <section class="card agenda-card"><span class="eyebrow">Daily minimum</span>
        <div class="agenda-row" data-route="vocab" style="cursor:pointer"><span class="agenda-icon">Aa</span><div><strong>Vocabulary retrieval</strong><small>${due.reviews?`${due.reviews} review${due.reviews>1?'s':''} due`:'no reviews due'}${due.newWords?` · ${due.newWords} new available`:''}</small></div><span class="agenda-time">15m</span></div>
        <div class="agenda-row"><span class="agenda-icon">Q</span><div><strong>Quant / Verbal core</strong><small>one lesson + drill set</small></div><span class="agenda-time">45m</span></div>
        <div class="agenda-row"><span class="agenda-icon">↺</span><div><strong>Error review</strong><small>re-solve yesterday's misses</small></div><span class="agenda-time">15m</span></div>
        <div class="agenda-row"><span class="agenda-icon">¶</span><div><strong>Writing or RC depth</strong><small>alternate by day</small></div><span class="agenda-time">25m</span></div>
      </section>
    </div>

    <div class="section-title"><div><span class="eyebrow">Four-track curriculum</span><h2>Your syllabus</h2></div><p>The full exam is smaller than the old GRE, but perfect-score preparation is not. Every official content area is decomposed into a navigable skill map.</p></div>
    <div class="grid grid-4">
      ${moduleCard('quant',q)}${moduleCard('verbal',v)}${moduleCard('writing',a)}${moduleCard('strategy',s)}
    </div>

    <div class="section-title"><div><span class="eyebrow">Evidence, not vibes</span><h2>Progress dashboard</h2></div><button class="pill-btn" data-route="errors">Open error log →</button></div>
    <div class="stat-strip">
      <div class="stat-cell"><b>${p.pct}%</b><span>curriculum complete</span></div>
      <div class="stat-cell"><b>${(() => { const d=(state.drillStats?.days||{})[todayISO()]; return d?`${Math.round(d.c/Math.max(1,d.a)*100)}%`:'—' })()}</b><span>todays drill accuracy</span></div>
      <div class="stat-cell"><b>${state.errors.filter(e=>!e.resolved).length}/${state.errors.length}</b><span>open errors</span></div>
      <div class="stat-cell"><b>${state.mocks.length}</b><span>mocks recorded</span></div>
    </div>

    <div class="section-title"><div><span class="eyebrow">The operating system</span><h2>How to use this site</h2></div></div>
    <div class="grid grid-3">
      <div class="card"><span class="badge red">01 · Learn</span><h3>Master the concept</h3><p>Read a short, dense lesson; inspect the worked examples and traps; then complete the checkpoint. Mark a topic done only when you can explain it without notes.</p></div>
      <div class="card"><span class="badge blue">02 · Retrieve</span><h3>Practice from memory</h3><p>Use the drill engine and Vocabulary Lab. Retrieval should feel harder than rereading—that difficulty is the signal that learning is happening.</p></div>
      <div class="card"><span class="badge gold">03 · Diagnose</span><h3>Turn misses into rules</h3><p>Every wrong, guessed, or painfully slow question belongs in the Error Log with a cause and prevention rule. Review patterns weekly.</p></div>
    </div>
    <div class="source-note" style="margin-top:22px">GRE Atlas is an independent study tool. It uses original explanatory content and original practice questions. For test policy, structure, scoring, and official practice, ETS is the authority; the Official Resources page links directly to ETS.</div>
  </div>`;
}
function moduleCard(m,p){const x=MODULES[m];return `<div class="card module-card ${x.klass} hover" data-route="${m}"><div><span class="big-letter">${x.letter}</span><h3>${x.name}</h3><p>${x.desc}</p></div><div><div class="progress-line" style="--accent:var(--${m==='quant'?'red':m==='verbal'?'blue':m==='writing'?'lav':'gold'});--progress:${p.pct}%"><span style="width:${p.pct}%"></span></div><div class="meta"><span>${p.done}/${p.total} topics</span><span>•</span><span>${p.pct}% mastered</span></div></div></div>`}

function renderModule(m){
  const mod=MODULES[m], topics=byModule(m), p=moduleProgress(m);
  const intro = {
    quant:'ETS defines four Quant content areas: arithmetic, algebra, geometry, and data analysis. The test stays at high-school/intro-statistics level: no trigonometry, calculus, higher mathematics, or inferential statistics. This track also teaches the conventions and question-format strategy needed for 170-level execution.',
    verbal:'The current Verbal measure uses Reading Comprehension, Text Completion, and Sentence Equivalence. Roughly half involves passage reading; the rest focuses on completing and interpreting text.',
    writing:'The current shorter GRE uses one 30-minute Analyze an Issue task. Preparation here is about analytical depth, task compliance, organization, examples, language control, and repeatable timing.',
    strategy:'The GRE is section-level adaptive in Quant and Verbal. Strong strategy protects accuracy, unlocks the harder second section, and prevents avoidable losses from pacing or interface misuse.'
  }[m];
  return `<div class="page"><header class="route-header"><div><span class="eyebrow">Curriculum · ${m.toUpperCase()}</span><h1>${mod.name}</h1><p>${intro}</p><div class="pill-row"><span class="badge">${topics.length} topics</span><span class="badge green">${p.pct}% complete</span></div></div><div class="route-stamp"><div><b>${mod.letter}</b><small>${p.done}/${p.total}<br>mastered</small></div></div></header>
    <div class="section-title"><div><span class="eyebrow">Skill map</span><h2>Every chapter</h2></div><p>Each topic is a separate route, so your browser URL and local progress always preserve exactly where you were.</p></div>
    <div class="topic-list">${topics.map((t,i)=>topicRow(t,i)).join('')}</div>
    <div class="route-footer"><button data-route="dashboard">← Dashboard</button><button data-route="drill">Open drill engine →</button></div></div>`
}
function topicRow(t,i){const done=!!state.completed[t.id];return `<div class="topic-row" data-route="${t.id}"><div class="topic-num">${String(i+1).padStart(2,'0')}</div><div><h4>${t.title}</h4><p>${t.summary}</p></div><span class="topic-status ${done?'done':''}">${done?'✓':'→'}</span></div>`}

function renderLesson(t){
  const mod=MODULES[t.module], topics=byModule(t.module), idx=topics.findIndex(x=>x.id===t.id), prev=topics[idx-1],next=topics[idx+1], done=!!state.completed[t.id];
  const note=state.notes[t.id]||'';
  return `<div class="page lesson-layout"><article class="lesson-main">
    <header class="lesson-hero"><div class="crumbs"><button data-route="${t.module}">${mod.name}</button><span>›</span><span>${idx+1} / ${topics.length}</span></div><h1>${t.title}</h1><p>${t.summary}</p><div class="pill-row"><span class="badge ${t.module==='quant'?'red':t.module==='verbal'?'blue':t.module==='writing'?'':'gold'}">${t.difficulty}</span><span class="badge">~${t.minutes} min lesson</span>${done?'<span class="badge green">Mastered ✓</span>':''}</div></header>
    ${t.visual?renderVisual(t.visual):''}
    ${t.sections.map((s,i)=>`<section class="lesson-section"><h2>${s[0]}</h2>${paragraphize(s[1])}${i===0?topicCallout(t):''}</section>`).join('')}
    ${renderTopicExamples(t)}
    ${renderTopicTraps(t)}
    ${t.quiz?.length?`<section class="lesson-section"><span class="eyebrow">Checkpoint</span><h2>Can you do it cold?</h2>${t.quiz.map((q,i)=>renderQuiz(q,t.id,i)).join('')}</section>`:''}
    <section class="lesson-section"><h2>Mastery standard</h2><div class="checklist"><div class="checkline">I can explain the central rule without looking at this page.</div><div class="checkline">I can recognize the common GRE trap associated with this skill.</div><div class="checkline">I can solve a fresh problem accurately, not merely repeat the example.</div><div class="checkline">I know when this topic interacts with another topic or question format.</div></div></section>
    <div class="route-footer">${prev?`<button data-route="${prev.id}">← ${prev.title}</button>`:'<button data-route="'+t.module+'">← Module home</button>'}${next?`<button data-route="${next.id}">${next.title} →</button>`:'<button data-route="drill">Drill this module →</button>'}</div>
  </article>
  <aside class="lesson-aside">
    <div class="aside-card"><span class="eyebrow">Chapter status</span><h4>${done?'Mastered':'In progress'}</h4><p>Mark complete only when the idea is retrievable and usable on a fresh question.</p><button id="completeTopic" class="complete-btn ${done?'done':''}" data-topic="${t.id}">${done?'✓ Mastered — click to undo':'Mark mastered +25 XP'}</button></div>
    <div class="aside-card"><span class="eyebrow">Quick actions</span><h4>Train it</h4><div class="next-prev"><button data-route="drill">⚡ Drill</button><button data-route="errors">↺ Log error</button><button data-route="formula">ƒ Formula</button><button id="focusLesson">◷ Focus</button></div></div>
    <div class="aside-card note-box"><span class="eyebrow">Your note</span><h4>Memory hook</h4><p>Write only what future-you would otherwise forget.</p><textarea id="topicNote" data-topic="${t.id}" placeholder="e.g. √(x²)=|x|, not x…">${esc(note)}</textarea></div>
    <div class="aside-card"><span class="eyebrow">Official anchor</span><h4>Source of truth</h4><p>For official content boundaries and test rules, verify against ETS.</p><a href="${t.module==='quant'?OFFICIAL.quant:t.module==='verbal'?OFFICIAL.verbal:t.module==='writing'?OFFICIAL.writing:OFFICIAL.tips}" target="_blank" rel="noopener">Open ETS guidance ↗</a></div>
  </aside></div>`
}
function paragraphize(s){return String(s).split(/\n\n+/).map(x=>`<p>${esc(x)}</p>`).join('')}
function topicCallout(t){
  const text=t.module==='quant'?'Perfect-score lens: before computing, ask what the problem is really testing—structure, sign, scale, constraints, or arithmetic.':t.module==='verbal'?'Perfect-score lens: evidence and logic beat intuition. Predict first, then force every answer choice to prove itself.':t.module==='writing'?'Perfect-score lens: the essay is scored holistically. Develop a precise position and reasoning chain; ornate vocabulary cannot rescue shallow analysis.':'Perfect-score lens: strategy is useful only when it protects expected points. Build rules from timed evidence, not superstition.';
  return `<div class="callout"><b>Perfect-score lens</b>${text.replace('Perfect-score lens: ','')}</div>`
}
function renderTopicExamples(t){
  const e = t.quiz?.[0]; if(!e) return '';
  const answer=Array.isArray(e[2])?e[2].map(i=>e[1][i]).join(' + '):e[1][e[2]];
  return `<section class="lesson-section"><span class="eyebrow">Worked example</span><h2>See the reasoning path</h2><div class="example-box"><span class="label">Prompt</span><h4>${e[0]}</h4><div class="solution"><div class="step"><span class="step-num">1</span><div><b>Identify the governing idea.</b><br>${t.summary}.</div></div><div class="step"><span class="step-num">2</span><div><b>Apply it cleanly.</b><br>${e[3]}</div></div><div class="step"><span class="step-num">3</span><div><b>Answer.</b><br>${esc(answer)}</div></div></div></div></section>`
}
function renderTopicTraps(t){
  const base = t.module==='quant' ? [
    ['Hidden assumption','Treating a variable as positive, integer, or nonzero when the prompt never said so.'],
    ['Over-computation','Doing exact arithmetic before simplifying, estimating, factoring, or testing structure.'],
    ['Diagram seduction','Reading ordinary geometry drawings by eye even though they need not be to scale.'],
    ['Unit drift','Combining minutes with hours, percent with percentage points, or part-to-part with part-to-whole.']
  ] : t.module==='verbal' ? [
    ['Choice-first reading','Letting attractive vocabulary dictate the sentence rather than deriving a prediction from logic.'],
    ['Strength inflation','Choosing “always/entirely/proves” when the passage supports only “may/often/suggests.”'],
    ['Viewpoint swap','Assigning a critic’s or researcher’s claim to the author.'],
    ['Topic match','Choosing an answer because it mentions the right subject even though it performs the wrong logical job.']
  ] : t.module==='writing' ? [
    ['Generic template','Writing a memorized essay that does not answer the exact instruction.'],
    ['Name-dropping','Listing historical or current examples without explaining the causal or logical connection.'],
    ['False sophistication','Using rare words where precise ordinary language would be clearer.'],
    ['No counterpressure','Ignoring important limitations, conditions, or competing values when nuance would strengthen the position.']
  ] : [
    ['Hero-question syndrome','Spending several minutes trying to conquer one question while easier points remain unseen.'],
    ['Blank answers','Leaving items unanswered despite no penalty for incorrect Verbal/Quant responses.'],
    ['Anxiety switching','Changing answers with no new evidence.'],
    ['Mock obsession','Tracking scores but not error causes, timing patterns, and repeat failures.']
  ];
  return `<section class="lesson-section"><span class="eyebrow">Trap radar</span><h2>What usually breaks</h2><div class="trap-grid">${base.map(x=>`<div class="trap"><strong>${x[0]}</strong><p>${x[1]}</p></div>`).join('')}</div></section>`
}
function renderQuiz(q,tid,idx){
  const [text,opts,ans,exp]=q; return `<div class="quiz-card" data-quiz="${tid}-${idx}" data-answer='${JSON.stringify(ans)}'><div class="q">${esc(text)}</div><div class="choices">${opts.map((o,i)=>`<button class="choice" data-i="${i}">${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join('')}</div><div class="explanation"><b>Why:</b> ${exp}</div></div>`
}

function renderVisual(type){
  const v={
    numberline:`<svg viewBox="0 0 760 180" aria-label="number line"><line x1="70" y1="90" x2="690" y2="90" stroke="currentColor" stroke-width="2"/><path d="M690 90l-12-7v14z" fill="currentColor"/><path d="M70 90l12-7v14z" fill="currentColor"/>${[-4,-3,-2,-1,0,1,2,3,4].map((n,i)=>`<g><line x1="${110+i*68}" y1="82" x2="${110+i*68}" y2="98" stroke="currentColor"/><text x="${110+i*68}" y="122" text-anchor="middle" font-family="DM Mono" font-size="12">${n}</text></g>`).join('')}<circle cx="382" cy="90" r="6" fill="#a64946"/><text x="382" y="55" text-anchor="middle" font-family="Fraunces" font-size="20">distance = absolute difference</text></svg>`,
    coordinate:`<svg viewBox="0 0 600 320"><g stroke="rgba(21,33,38,.18)" stroke-width="1">${[80,130,180,230,280,330,380,430,480,530].map(x=>`<line x1="${x}" y1="25" x2="${x}" y2="285"/>`).join('')}${[35,85,135,185,235,285].map(y=>`<line x1="55" y1="${y}" x2="555" y2="${y}"/>`).join('')}</g><line x1="55" y1="185" x2="555" y2="185" stroke="currentColor" stroke-width="2"/><line x1="280" y1="285" x2="280" y2="25" stroke="currentColor" stroke-width="2"/><line x1="80" y1="250" x2="520" y2="70" stroke="#a64946" stroke-width="4"/><circle cx="180" cy="209" r="6" fill="#a64946"/><circle cx="430" cy="107" r="6" fill="#a64946"/><text x="455" y="85" font-family="DM Mono" font-size="12">rise / run</text></svg>`,
    angles:`<svg viewBox="0 0 650 260"><line x1="70" y1="80" x2="580" y2="80" stroke="currentColor" stroke-width="3"/><line x1="70" y1="190" x2="580" y2="190" stroke="currentColor" stroke-width="3"/><line x1="210" y1="230" x2="430" y2="35" stroke="#a64946" stroke-width="4"/><text x="450" y="60" font-family="Fraunces" font-size="20">parallel lines + transversal</text><path d="M387 80 A40 40 0 0 1 414 51" fill="none" stroke="#b58a4b" stroke-width="4"/><path d="M263 190 A40 40 0 0 1 235 219" fill="none" stroke="#b58a4b" stroke-width="4"/></svg>`,
    triangle:`<svg viewBox="0 0 650 300"><path d="M120 245 L525 245 L390 60 Z" fill="none" stroke="currentColor" stroke-width="4"/><line x1="390" y1="60" x2="390" y2="245" stroke="#a64946" stroke-width="3" stroke-dasharray="7 7"/><rect x="390" y="227" width="18" height="18" fill="none" stroke="#a64946"/><text x="250" y="275" font-family="DM Mono" font-size="12">base b</text><text x="405" y="160" font-family="DM Mono" font-size="12">height h</text><text x="120" y="40" font-family="Fraunces" font-size="22">Area = ½bh · angles sum to 180°</text></svg>`,
    specialtriangle:`<svg viewBox="0 0 700 300"><path d="M90 245 L315 245 L315 80 Z" fill="none" stroke="currentColor" stroke-width="4"/><text x="180" y="272" font-family="DM Mono" font-size="12">1</text><text x="330" y="170" font-family="DM Mono" font-size="12">1</text><text x="185" y="145" font-family="DM Mono" font-size="12">√2</text><text x="120" y="70" font-family="Fraunces" font-size="18">45–45–90</text><path d="M410 245 L630 245 L630 55 Z" fill="none" stroke="#a64946" stroke-width="4"/><text x="505" y="272" font-family="DM Mono" font-size="12">√3</text><text x="645" y="160" font-family="DM Mono" font-size="12">1</text><text x="505" y="140" font-family="DM Mono" font-size="12">2</text><text x="445" y="70" font-family="Fraunces" font-size="18">30–60–90</text></svg>`,
    circle:`<svg viewBox="0 0 650 300"><circle cx="315" cy="150" r="110" fill="none" stroke="currentColor" stroke-width="4"/><line x1="315" y1="150" x2="425" y2="150" stroke="#a64946" stroke-width="4"/><line x1="315" y1="150" x2="370" y2="55" stroke="#b58a4b" stroke-width="4"/><path d="M365 150 A50 50 0 0 0 340 107" fill="none" stroke="#557381" stroke-width="4"/><text x="366" y="140" font-family="DM Mono" font-size="12">θ</text><text x="360" y="173" font-family="DM Mono" font-size="12">r</text><text x="60" y="70" font-family="Fraunces" font-size="22">C = 2πr</text><text x="60" y="105" font-family="Fraunces" font-size="22">A = πr²</text></svg>`,
    boxplot:`<svg viewBox="0 0 720 250"><line x1="80" y1="130" x2="650" y2="130" stroke="currentColor" stroke-width="2"/><line x1="140" y1="105" x2="140" y2="155" stroke="currentColor" stroke-width="3"/><rect x="220" y="85" width="280" height="90" fill="rgba(85,115,129,.12)" stroke="#557381" stroke-width="3"/><line x1="355" y1="85" x2="355" y2="175" stroke="#a64946" stroke-width="4"/><line x1="580" y1="105" x2="580" y2="155" stroke="currentColor" stroke-width="3"/><text x="140" y="195" text-anchor="middle" font-family="DM Mono" font-size="11">min</text><text x="220" y="195" text-anchor="middle" font-family="DM Mono" font-size="11">Q1</text><text x="355" y="195" text-anchor="middle" font-family="DM Mono" font-size="11">median</text><text x="500" y="195" text-anchor="middle" font-family="DM Mono" font-size="11">Q3</text><text x="580" y="195" text-anchor="middle" font-family="DM Mono" font-size="11">max</text></svg>`,
    distribution:`<svg viewBox="0 0 720 260"><line x1="70" y1="210" x2="650" y2="210" stroke="currentColor"/><path d="M85 208 C170 205,190 180,235 130 C275 85,310 45,360 45 C410 45,445 85,485 130 C530 180,550 205,635 208" fill="rgba(85,115,129,.10)" stroke="#557381" stroke-width="4"/><line x1="360" y1="45" x2="360" y2="210" stroke="#a64946" stroke-dasharray="6 6"/><text x="360" y="235" text-anchor="middle" font-family="DM Mono" font-size="11">mean = median = mode</text></svg>`,
    venn:`<svg viewBox="0 0 650 300"><circle cx="265" cy="155" r="110" fill="rgba(166,73,70,.10)" stroke="#a64946" stroke-width="3"/><circle cx="390" cy="155" r="110" fill="rgba(85,115,129,.10)" stroke="#557381" stroke-width="3"/><text x="225" y="75" font-family="Fraunces" font-size="20">A</text><text x="415" y="75" font-family="Fraunces" font-size="20">B</text><text x="326" y="160" text-anchor="middle" font-family="DM Mono" font-size="12">A ∩ B</text></svg>`,
    passagemap:`<svg viewBox="0 0 760 300"><g font-family="DM Sans"><rect x="55" y="85" width="145" height="90" rx="15" fill="rgba(85,115,129,.10)" stroke="#557381"/><text x="127" y="120" text-anchor="middle" font-size="14" font-weight="700">P1</text><text x="127" y="145" text-anchor="middle" font-size="11">old view</text><path d="M200 130 H260" stroke="currentColor"/><path d="M260 130l-10-6v12z" fill="currentColor"/><rect x="270" y="85" width="145" height="90" rx="15" fill="rgba(166,73,70,.09)" stroke="#a64946"/><text x="342" y="120" text-anchor="middle" font-size="14" font-weight="700">P2</text><text x="342" y="145" text-anchor="middle" font-size="11">new evidence</text><path d="M415 130 H475" stroke="currentColor"/><path d="M475 130l-10-6v12z" fill="currentColor"/><rect x="485" y="85" width="180" height="90" rx="15" fill="rgba(181,138,75,.10)" stroke="#b58a4b"/><text x="575" y="120" text-anchor="middle" font-size="14" font-weight="700">P3</text><text x="575" y="145" text-anchor="middle" font-size="11">author synthesis</text><text x="380" y="230" text-anchor="middle" font-family="Fraunces" font-size="23">Map roles → retrieve evidence later</text></g></svg>`
  }[type]; return v?`<div class="visual">${v}</div>`:''
}

function renderRoadmap(){
  const phases = [
    ['0','Baseline & setup','Learn the current test interface, take a short diagnostic, set target date, and start the error log.',['1–3 days','diagnostic','workflow']],
    ['1','Foundations without a clock','Complete all core Quant concepts and verbal logic while building daily vocabulary retrieval. Accuracy first.',['25–35% of runway','concepts','vocab daily']],
    ['2','Skill-specific pressure','Add timed mini-sets, deeper RC, harder QC, mixed probability/counting, and 30-minute essays.',['25–30%','timed sets','AWA weekly']],
    ['3','Mixed sections & adaptation','Practice complete 12/15-question sections, two-pass pacing, mark/review choices, and second-section difficulty.',['20–25%','section timing','mixed review']],
    ['4','Official mocks & taper','Use official POWERPREP strategically; repair recurring misses; simulate exact conditions; reduce new material late.',['final 15–20%','POWERPREP','test-day rehearsal']]
  ];
  return `<div class="page"><header class="route-header"><div><span class="eyebrow">Plan before grind</span><h1>Roadmap to 340 + 6.0</h1><p>A perfect score is an extreme target. The correct plan is not “finish notes, then practice.” It is a loop: diagnose → learn → retrieve → time → analyze errors → retest. The proportions below automatically matter more than any arbitrary calendar.</p></div><div class="route-stamp"><div><b>5</b><small>training<br>phases</small></div></div></header>
  <div class="planner">
    <aside class="card planner-form"><span class="eyebrow">Build your runway</span><h3>Plan settings</h3><div class="field"><label>Exam date</label><input id="examDateInput" type="date" value="${state.examDate||''}"></div><div class="field"><label>Hours per week</label><input id="hoursWeekInput" type="number" min="3" max="40" value="${state.hoursWeek||10}"></div><div class="field"><label>Target Quant</label><input id="targetQ" type="number" min="130" max="170" value="${state.targetQ||170}"></div><div class="field"><label>Target Verbal</label><input id="targetV" type="number" min="130" max="170" value="${state.targetV||170}"></div><div class="field"><label>Target AWA</label><input id="targetA" type="number" min="0" max="6" step=".5" value="${state.targetAWA||6}"></div><button id="savePlan" class="complete-btn">Save plan</button><p style="font-size:10px;color:var(--muted)">Your plan is stored only in this browser via localStorage.</p></aside>
    <section class="card"><span class="eyebrow">Training architecture</span>${phases.map(p=>`<div class="phase"><div class="phase-num">${p[0]}</div><div><h3>${p[1]}</h3><p>${p[2]}</p><div class="phase-tags">${p[3].map(x=>`<span class="tag">${x}</span>`).join('')}</div></div></div>`).join('')}</section>
  </div>
  <div class="section-title"><div><span class="eyebrow">Weekly cadence</span><h2>A plan that compounds</h2></div><p>At a 340 target, “studying more” is not enough; you need high-quality feedback loops.</p></div>
  <div class="roadmap-scale">${[
    ['Mon','Concept + vocab','60–90m'],['Tue','Drill + RC','60–90m'],['Wed','Concept + vocab','60–90m'],['Thu','Timed mixed set','60–90m'],['Fri','Error repair + essay','60–90m']
  ].map(x=>`<div class="scale-step"><small>${x[0]}</small><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div>
  <div class="section-title"><div><span class="eyebrow">Weekend block</span><h2>Saturday / Sunday</h2></div></div>
  <div class="grid grid-2"><div class="card"><h3>One deep block</h3><p>Alternate between a full official or high-fidelity timed section, a long mixed Quant set, and an RC-heavy Verbal block. Review should take at least as long as testing.</p></div><div class="card"><h3>Weekly audit</h3><p>Count concept misses, reasoning misses, careless misses, timeouts, and guesses. Pick the top two recurring patterns for next week. Do not carry a giant unsorted backlog.</p></div></div>
  </div>`
}

function buildTodayPlan(){
  const pending=TOPICS.filter(t=>!state.completed[t.id]);
  const lastT=topicMap[state.lastRoute];
  const first=lastT&&!state.completed[lastT.id]?lastT:(pending[0]||TOPICS[0]), second=pending.find(t=>t.module!==first.module)||pending[1]||TOPICS[1];
  const day=new Date().getDay();
  let vocabSub='no reviews due';try{const q=vocabQueue();vocabSub=q.due.length?`${q.due.length} in queue (${q.reviews.length} reviews + new)`:'queue clear — add words or raise the daily cap'}catch(e){}
  return [
    {icon:'Aa',title:'Vocabulary retrieval',sub:vocabSub,time:'15m',route:'vocab'},
    {icon:MODULES[first.module].letter,title:first.title,sub:`${MODULES[first.module].name} · next incomplete`,time:'35m',route:first.id},
    {icon:'⚡',title:'Timed mixed drill',sub:day%2?'Verbal logic + vocabulary':'Quant mixed accuracy',time:'20m',route:'drill'},
    {icon:'↺',title:'Error replay',sub:state.errors.length?`${Math.min(5,state.errors.length)} logged errors to review`:'Start the error log with any miss',time:'15m',route:'errors'},
    {icon:day%2?'¶':'RC',title:day%2?'Issue essay / outline':'Deep verbal block',sub:day%2?'30-minute essay or 10-minute outline':'one passage mapped carefully',time:day%2?'30m':'20m',route:day%2?'essay':second.id}
  ]
}
function renderToday(){const items=buildTodayPlan();return `<div class="page"><header class="route-header"><div><span class="eyebrow">Daily operating plan</span><h1>Today</h1><p>Small enough to finish, serious enough to move the score. Keep the sequence flexible, but do not skip retrieval and error review.</p></div><div class="route-stamp"><div><b>${items.reduce((s,x)=>s+parseInt(x.time),0)}</b><small>planned<br>minutes</small></div></div></header><div class="grid grid-2"><section class="card agenda-card">${items.map((x,i)=>`<div class="agenda-row" data-route="${x.route}" style="cursor:pointer"><span class="agenda-icon">${x.icon}</span><div><strong>${i+1}. ${x.title}</strong><small>${x.sub}</small></div><span class="agenda-time">${x.time}</span></div>`).join('')}</section><section class="mission-card"><span class="eyebrow" style="color:#9fb0b0">Rule for today</span><h3>Finish with fewer unknowns than you started with.</h3><p>When you miss, do not simply read the answer. Identify whether the cause was knowledge, reasoning, execution, vocabulary, or time. Then create one prevention rule.</p><div class="mission-actions"><button class="primary-btn" data-route="drill">Start a drill →</button><button class="secondary-btn" id="focusToday">Open focus timer</button></div></section></div></div>`}

let diagIndex=0,diagAnswers=[],diagPicks=new Set();
function renderDiagnostic(){
  if(state.diag) return renderDiagnosticResult();
  diagIndex=clamp(diagIndex,0,DIAGNOSTIC.length-1); const d=DIAGNOSTIC[diagIndex];
  return `<div class="page"><header class="route-header"><div><span class="eyebrow">Fast baseline · ${DIAGNOSTIC.length} questions</span><h1>Diagnostic</h1><p>This is an original mini-diagnostic, not an official GRE score predictor. Its job is to locate broad weaknesses before you choose what to study first. Use official POWERPREP for a true GRE simulation.</p></div></header><div class="diagnostic-board"><section class="card diagnostic-question"><div class="diag-progress"><span style="width:${(diagIndex/DIAGNOSTIC.length)*100}%"></span></div><div style="margin-top:22px"><span class="badge ${d.m==='quant'?'red':'blue'}">${d.m} · ${d.skill}</span><h2 style="font-family:var(--serif);font-size:30px;line-height:1.3">${d.q}</h2><div class="diag-options">${d.o.map((o,i)=>`<button class="diag-option" data-diag="${i}">${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join('')}</div></div></section><aside class="card"><span class="eyebrow">Progress</span><h3>${diagIndex+1} / ${DIAGNOSTIC.length}</h3><div class="diag-side-score"><div class="tiny-stat"><b>${diagAnswers.filter(x=>x?.ok).length}</b><span>correct so far</span></div><div class="tiny-stat"><b>${diagAnswers.length}</b><span>answered</span></div></div><div class="source-note" style="margin-top:14px">Do this cold. No notes, no calculator unless you would genuinely use the GRE on-screen calculator for the item.</div></aside></div></div>`
}
function renderDiagnosticResult(){const r=state.diag;return `<div class="page"><header class="route-header"><div><span class="eyebrow">Diagnostic complete</span><h1>Your starting map</h1><p>Use this as triage, not a label. The mini-diagnostic is deliberately small; official POWERPREP is the better benchmark once you have learned the interface.</p></div><div class="route-stamp"><div><b>${r.total}/${DIAGNOSTIC.length}</b><small>correct</small></div></div></header><div class="grid grid-3"><div class="card"><span class="badge red">Quant</span><h3>${r.q}/${DIAGNOSTIC.filter(x=>x.m==='quant').length}</h3><p>${r.q>=7?'Strong baseline. Shift toward hard QC, speed, data analysis, and eliminating careless errors.':r.q>=5?'Good base with visible gaps. Complete the full Quant map before heavy mock testing.':'Build concepts systematically before timing pressure.'}</p></div><div class="card"><span class="badge blue">Verbal</span><h3>${r.v}/${DIAGNOSTIC.filter(x=>x.m==='verbal').length}</h3><p>${r.v>=7?'Strong baseline. Focus on subtle inference, dense passages, vocabulary precision, and timed consistency.':r.v>=5?'Solid reasoning base. Daily vocabulary + structured RC/TC work should compound quickly.':'Prioritize sentence logic, passage mapping, and daily vocabulary retrieval.'}</p></div><div class="card"><span class="badge gold">Next move</span><h3>${r.weak[0]||'Mixed review'}</h3><p>Your weakest tagged skills are the best place to begin, but still complete the entire curriculum for a 340 target.</p></div></div><div class="section-title"><div><span class="eyebrow">Weak-skill queue</span><h2>What to study first</h2></div></div><div class="pill-row">${r.weak.map(x=>`<span class="badge">${x}</span>`).join('')||'<span class="badge green">No obvious weak tag in this small sample</span>'}</div><div class="route-footer"><button id="resetDiag">Retake mini-diagnostic</button><button data-route="roadmap">Build roadmap →</button></div></div>`}

let drillState={module:'quant',kind:'mixed',q:null,answered:false,correct:0,total:0};
function resetDrillSession(){drillState={module:drillState.module,kind:drillState.kind,q:null,answered:false,correct:0,total:0}}
function newDrillQuestion(){drillState.q=drillState.module==='quant'?genQuant(drillState.kind):genVerbal(drillState.kind);drillState.answered=false}
function renderDrill(){if(!drillState.q)newDrillQuestion();const q=drillState.q;const todayKey=todayISO(),td=(state.drillStats?.days||{})[todayKey]||{a:0,c:0};return `<div class="page"><header class="route-header"><div><span class="eyebrow">Original practice engine</span><h1>Drill lab</h1><p>Generate fresh micro-problems for retrieval and speed. These are original training items, not copied ETS questions. Use official material for final calibration.</p></div><div class="route-stamp"><div><b>${drillState.total?`${drillState.correct}/${drillState.total}`:`${td.c}/${td.a}`}</b><small>${drillState.total?'session':'today'}<br>accuracy</small></div></div><div class="drill-toolbar"><div class="field"><label>Track</label><select id="drillModule"><option value="quant" ${drillState.module==='quant'?'selected':''}>Quantitative</option><option value="verbal" ${drillState.module==='verbal'?'selected':''}>Verbal</option></select></div><div class="field"><label>Question family</label><select id="drillKind">${drillKinds().map(x=>`<option value="${x[0]}" ${drillState.kind===x[0]?'selected':''}>${x[1]}</option>`).join('')}</select></div><button id="newDrill" class="pill-btn">New question</button></div><section class="card drill-stage"><span class="badge ${drillState.module==='quant'?'red':'blue'}">${q.label}</span><h2 style="font-family:var(--serif);font-size:32px;line-height:1.3">${esc(q.text)}</h2>${q.choices?`<div class="diag-options">${q.choices.map((o,i)=>`<button class="diag-option drill-choice" data-i="${i}">${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join('')}</div>`:`<input id="drillNumeric" class="numeric-entry" inputmode="decimal" placeholder="Enter answer"><div class="answer-row"><button id="checkNumeric" class="primary-btn">Check answer</button></div>`}<div id="drillFeedback"></div></section></div>`}
function drillKinds(){return drillState.module==='quant'?[['mixed','Mixed Quant'],['percent','Percent & percent change'],['ratio','Ratio & proportion'],['algebra','Linear algebra'],['remainder','Remainders'],['average','Averages & statistics'],['probability','Probability'],['geometry','Geometry'],['exponents','Exponents & roots'],['divisibility','Divisibility / GCF'],['inequality','Inequalities'],['functions','Functions'],['coordinate','Coordinate geometry'],['counting','Counting'],['sets','Sets / Venn'],['data','Data interpretation'],['qc','Quantitative Comparison']]:[['mixed','Mixed Verbal'],['tc','Text Completion'],['se','Sentence Equivalence'],['logic','Sentence logic'],['vocab','Vocabulary'],['rc','Reading Comprehension'],['inference','Inference'],['argument','Argument reasoning'],['tone','Tone & stance']];}
function genQuant(kind){
  if(kind==='mixed')kind=shuffle(['percent','ratio','algebra','remainder','average','probability','geometry','exponents','divisibility','inequality','functions','coordinate','counting','sets','data','qc'])[0];
  const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
  if(kind==='percent'){
    const mode=ri(0,2),p=shuffle([10,15,20,25,30,40])[0],base=ri(4,20)*20;
    if(mode===0){const ans=base*(1+p/100);return {label:'Percent',text:`A value of ${base} is increased by ${p}%. What is the new value?`,answer:ans,explain:`Multiply by 1+${p}/100 = ${1+p/100}. ${base} × ${1+p/100} = ${ans}.`}}
    if(mode===1){const final=base*(1+p/100);return {label:'Reverse percent',text:`After a ${p}% increase, a quantity is ${final}. What was the original quantity?`,answer:base,explain:`The final amount is original×${1+p/100}; divide ${final} by ${1+p/100}.`}}
    const q=shuffle([10,20,25,50])[0],ans=p-q-p*q/100;return {label:'Successive percent change',text:`A price rises ${p}% and then falls ${q}%. What is the net percent change? Enter a positive number for an increase and a negative number for a decrease.`,answer:ans,explain:`Multiplier=(1+${p}/100)(1−${q}/100). Net percent = ${ans}%.`}
  }
  if(kind==='ratio'){const a=ri(2,6),b=ri(3,8),k=ri(3,10),total=(a+b)*k,ans=a*k;return {label:'Ratio',text:`The ratio of red to blue tokens is ${a}:${b}. If there are ${total} tokens total, how many are red?`,answer:ans,explain:`Total ratio parts = ${a+b}. Each part = ${total}/${a+b}=${k}; red=${a}×${k}=${ans}.`}}
  if(kind==='algebra'){const x=ri(-8,15),a=ri(2,7),b=ri(-10,10),c=a*x+b;return {label:'Linear equation',text:`Solve for x: ${a}x ${b>=0?'+ '+b:'− '+Math.abs(b)} = ${c}`,answer:x,explain:`Undo the constant term, then divide by ${a}. The solution is ${x}.`}}
  if(kind==='remainder'){const d=ri(4,11),r=ri(0,d-1),m=ri(2,5),c=ri(1,9),ans=(m*r+c)%d;return {label:'Remainder',text:`Integer n leaves remainder ${r} when divided by ${d}. What remainder does ${m}n+${c} leave when divided by ${d}?`,answer:ans,explain:`n≡${r} (mod ${d}), so ${m}n+${c}≡${m*r+c}≡${ans} (mod ${d}).`}}
  if(kind==='average'){const vals=Array.from({length:5},()=>ri(3,25)).sort((a,b)=>a-b);const mode=ri(0,1);if(mode===0){const ans=vals.reduce((a,b)=>a+b,0)/vals.length;return {label:'Mean',text:`Find the mean of: ${vals.join(', ')}`,answer:+ans.toFixed(4),tolerance:.001,explain:`Add the five values and divide by 5: ${ans}.`}}const ans=vals[2];return {label:'Median',text:`Find the median of: ${shuffle(vals).join(', ')}`,answer:ans,explain:`Order the five values. The middle value is ${ans}.`}}
  if(kind==='probability'){const r=ri(2,6),b=ri(2,6),total=r+b,ans=(r/total)*((r-1)/(total-1));return {label:'Probability',text:`A bag contains ${r} red and ${b} blue balls. Two are drawn without replacement. What is the probability both are red? Enter a decimal.`,answer:+ans.toFixed(4),tolerance:.01,explain:`P=(${r}/${total})×(${r-1}/${total-1})=${ans.toFixed(4)}.`}}
  if(kind==='geometry'){const mode=ri(0,2);if(mode===0){const w=ri(4,14),h=ri(3,12),ans=w*h/2;return {label:'Triangle area',text:`A triangle has base ${w} and perpendicular height ${h}. What is its area?`,answer:ans,explain:`Area=½bh=½×${w}×${h}=${ans}.`}}if(mode===1){const r=ri(2,9),ans=2*r;return {label:'Circle',text:`A circle has radius ${r}. What is its diameter?`,answer:ans,explain:`Diameter=2r=${ans}.`}}const a=ri(2,8),b=ri(2,8),ans=Math.sqrt(a*a+b*b);return {label:'Right triangle',text:`A right triangle has legs ${a} and ${b}. What is the hypotenuse? Enter a decimal if needed.`,answer:+ans.toFixed(4),tolerance:.002,explain:`By the Pythagorean theorem, c=√(${a*a}+${b*b})=${ans.toFixed(4)}.`}}
  if(kind==='exponents'){const b=ri(2,5),m=ri(2,4),n=ri(1,3),ans=b**(m+n);return {label:'Exponents',text:`Evaluate ${b}^${m} × ${b}^${n}.`,answer:ans,explain:`Same base: add exponents. ${b}^(${m}+${n})=${b}^${m+n}=${ans}.`}}
  if(kind==='divisibility'){const a=ri(12,60),b=ri(12,60),ans=gcd(a,b);return {label:'GCF',text:`What is the greatest common factor of ${a} and ${b}?`,answer:ans,explain:`Prime-factorize or use the Euclidean algorithm. GCF(${a},${b})=${ans}.`}}
  if(kind==='inequality'){const x=ri(-5,10),a=-ri(2,6),b=ri(-8,8),c=a*x+b;return {label:'Inequality',text:`Solve for x: ${a}x ${b>=0?'+ '+b:'− '+Math.abs(b)} > ${c}. Which condition is equivalent?`,choices:[`x < ${x}`,`x > ${x}`,`x ≤ ${x}`,`x ≥ ${x}`],answer:0,explain:`Subtract ${b} and divide by the negative coefficient ${a}; the inequality reverses, giving x < ${x}.`}}
  if(kind==='functions'){const a=ri(-4,5)||2,b=ri(-8,8),x=ri(-5,6),ans=a*x+b;return {label:'Functions',text:`If f(x) = ${a}x ${b>=0?'+ '+b:'− '+Math.abs(b)}, what is f(${x})?`,answer:ans,explain:`Substitute x=${x}: ${a}(${x}) ${b>=0?'+ '+b:'− '+Math.abs(b)}=${ans}.`}}
  if(kind==='coordinate'){const x1=ri(-5,2),x2=x1+ri(2,6),m=shuffle([-3,-2,-1,1,2,3])[0],y1=ri(-5,5),y2=y1+m*(x2-x1);return {label:'Slope',text:`What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`,answer:m,explain:`Slope=(y₂−y₁)/(x₂−x₁)=(${y2}-${y1})/(${x2}-${x1})=${m}.`}}
  if(kind==='counting'){const n=ri(5,10),ans=n*(n-1)/2;return {label:'Counting',text:`How many distinct pairs can be chosen from ${n} people?`,answer:ans,explain:`Choose 2 from ${n}: C(${n},2)=${n}×${n-1}/2=${ans}.`}}
  if(kind==='sets'){const A=ri(20,50),B=ri(20,50),I=ri(5,Math.min(A,B)-2),ans=A+B-I;return {label:'Sets / Venn',text:`In a group, ${A} people are in set A, ${B} are in set B, and ${I} are in both. How many are in A ∪ B?`,answer:ans,explain:`|A∪B|=|A|+|B|−|A∩B|=${A}+${B}−${I}=${ans}.`}}
  if(kind==='data'){const jan=ri(40,90),feb=jan+ri(5,30),mar=feb-ri(0,20),ans=((feb-jan)/jan)*100;return {label:'Data interpretation',text:`A table reports monthly output: January ${jan}, February ${feb}, March ${mar}. To the nearest whole percent, by what percent did output increase from January to February?`,answer:+ans.toFixed(0),tolerance:.5,explain:`Percent increase=(${feb}−${jan})/${jan}×100≈${ans.toFixed(2)}%, which rounds to ${Math.round(ans)}%.`}}
  const bank=[
    {text:'x is a real number. Quantity A: x². Quantity B: x.',answer:3,explain:'x=2 gives A>B; x=1/2 gives B>A; x=0 or1 gives equality.'},
    {text:'n is a positive integer. Quantity A: n(n+1). Quantity B: n².',answer:0,explain:'A−B=n, and n>0, so Quantity A is greater.'},
    {text:'a and b are positive and a>b. Quantity A: 1/a. Quantity B: 1/b.',answer:1,explain:'For positive numbers, reciprocals reverse order: 1/a<1/b.'},
    {text:'x≠0. Quantity A: |x|. Quantity B: x.',answer:3,explain:'If x>0 they are equal; if x<0, |x|>x.'}
  ];const q=shuffle(bank)[0];return {label:'Quantitative Comparison',text:q.text,choices:['Quantity A is greater','Quantity B is greater','The quantities are equal','The relationship cannot be determined'],answer:q.answer,explain:q.explain}
}
function genVerbal(kind){
 if(kind==='mixed')kind=shuffle(['tc','se','logic','vocab','rc','inference','argument','tone'])[0];
 if(kind==='vocab'){const pool=VOCAB.map(normalizeVocabEntry).filter(x=>x&&x.definition),w=pool[Math.floor(Math.random()*pool.length)];const distract=shuffle(pool.filter(x=>x.word!==w.word)).slice(0,3).map(x=>x.definition);const choices=shuffle([w.definition,...distract]);return {label:'Vocabulary',text:`“${esc(w.word)}” most nearly means:`,choices,answer:choices.indexOf(w.definition),explain:`${esc(w.word)}: ${esc(w.definition)}${w.synonyms?`. Synonyms / neighbors: ${esc(w.synonyms)}.`:''}`}}
 const bank={
  tc:[
   ['Although the proposal sounded ___ at first, a closer financial analysis showed that it was entirely workable.',['impractical','lucid','obsequious','prolific'],0,'“Although” contrasts the initial impression with “workable,” so impractical fits.'],
   ['The historian’s account is valuable precisely because it is ___: she openly identifies the limits of the surviving evidence.',['dogmatic','candid','bombastic','capricious'],1,'Openly identifying limits is candid/frank.'],
   ['Far from being ___, the committee’s report was careful to distinguish speculation from established fact.',['circumspect','reckless','meticulous','qualified'],1,'“Far from” reverses the idea; careful distinction contradicts recklessness.'],
   ['The critic found the novel’s dialogue surprisingly ___; despite its historical setting, the exchanges felt natural rather than stiff.',['stilted','plausible','arcane','didactic'],1,'“Natural rather than stiff” supports plausible.'],
   ['Because the evidence was fragmentary, any reconstruction of the event must remain ___.',['provisional','irrefutable','exhaustive','dogmatic'],0,'Fragmentary evidence calls for a tentative/provisional conclusion.'],
   ['The policy’s apparent simplicity is ___; its implementation depends on a web of exceptions.',['genuine','misleading','salutary','inevitable'],1,'The exceptions contradict the appearance of simplicity.'],
   ['The scientist was praised not for making grand claims but for being unusually ___ about what the data could support.',['circumspect','bombastic','credulous','capricious'],0,'Caution about evidential limits is circumspection.'],
   ['The essay is neither wholly celebratory nor wholly critical; its tone is deliberately ___.',['nuanced','vitriolic','ebullient','dogmatic'],0,'The neither/nor construction signals a balanced, nuanced stance.']
  ],
  logic:[
   ['Because the data were collected inconsistently, the researchers treated their conclusion as ___.',['provisional','irrefutable','dogmatic','permanent'],0,'Weak evidence supports a tentative/provisional conclusion.'],
   ['The two theories appear opposed; ___, they make the same prediction in the case at issue.',['nevertheless','therefore','for example','likewise'],0,'The second clause contrasts with apparent opposition.'],
   ['The new evidence does not refute the theory; ___, it requires the theory to be narrowed.',['instead','therefore','similarly','for example'],0,'The second clause replaces “refute” with a more limited consequence.'],
   ['The method is expensive. ___, it is often reserved for cases in which cheaper methods fail.',['Consequently','Nevertheless','For instance','Likewise'],0,'Expense causes the restricted use, so a consequence marker fits.'],
   ['The author concedes that the reform has costs; ___, she argues that the long-term gains outweigh them.',['however','because','likewise','specifically'],0,'The second clause contrasts with the concession.']
  ],
  se:[
   ['The editor was known for comments that were brief but ___.',['trenchant','incisive','verbose','diffident','desultory','banal'],[0,1],'Trenchant and incisive both mean sharply effective and fit the contrast with brief.'],
   ['The witness’s account was so ___ that investigators could not determine what had actually happened.',['equivocal','ambiguous','lucid','cogent','forthright','pellucid'],[0,1],'Equivocal and ambiguous both describe unclear, multiple-meaning testimony.'],
   ['Rather than ___ the dispute, the announcement made both sides more hostile.',['assuage','placate','foment','exacerbate','catalog','vindicate'],[0,1],'Assuage and placate both mean calm/reduce hostility, matching “rather than.”'],
   ['The researcher was admired for a style that was rigorous yet ___.',['pellucid','lucid','opaque','convoluted','dogmatic','perfunctory'],[0,1],'Pellucid and lucid both mean clear.'],
   ['The regulation proved ___: it imposed costs while producing almost no measurable benefit.',['futile','ineffectual','efficacious','salubrious','cogent','fecund'],[0,1],'Futile and ineffectual both mean ineffective.']
  ],
  rc:[
   ['Passage: Early studies treated urban tree cover mainly as an aesthetic amenity. More recent work, however, links canopy density to lower surface temperatures and reduced storm-water runoff. The newer research does not show that every planting program is cost-effective, but it has broadened the criteria by which such programs are evaluated. Question: The primary purpose is to…',['argue that all tree planting programs save money','describe a shift toward broader evaluation of urban tree cover','deny that trees have aesthetic value','compare two cities’ budgets'],1,'The passage contrasts an older narrow view with newer research that broadens evaluation criteria.'],
   ['Passage: A translation can preserve the literal meaning of each sentence yet alter a work’s overall effect if it changes rhythm, register, or ambiguity. For this reason, judging fidelity solely by word-level correspondence can be misleading. Question: The author would most likely agree that…',['literal accuracy is irrelevant','fidelity can involve features beyond literal wording','all translations should preserve rhyme','ambiguity should always be removed'],1,'The passage explicitly argues for dimensions of fidelity beyond word-level correspondence.'],
   ['Passage: Some ecologists once assumed that a species found across many habitats must be highly adaptable. Genetic studies have complicated this view: what appears to be one widespread species can consist of several locally specialized populations. Question: The genetic studies primarily serve to…',['support the original assumption','complicate an inference from geographic spread','show that local specialization is impossible','define habitat'],1,'They undermine the simple inference that wide distribution necessarily means one adaptable population.']
  ],
  inference:[
   ['Passage: No manuscript dated before 1720 contains the disputed stanza, although several copies produced after 1740 include it. Which is most strongly supported?',['The stanza was definitely written in 1730','The stanza may have entered the tradition after the earliest surviving copies','Every copy after 1740 contains it','The stanza is artistically inferior'],1,'The evidence supports a cautious timing inference, not an exact date or universal claim.'],
   ['Passage: The trial improved average response time, but the improvement disappeared when participants were retested six months later without additional practice. Which inference is best supported?',['The intervention can produce a short-term effect','The intervention never works','Practice always harms performance','Six months is the optimal interval'],0,'The measured improvement existed initially but did not persist under the stated condition.'],
   ['Passage: The museum’s new pricing increased revenue even though total attendance fell slightly. Which must be possible?',['Average revenue per visitor increased enough to offset the attendance decline','Every ticket became more expensive','Attendance among tourists rose','Operating costs fell'],0,'Revenue rose despite fewer visitors, so revenue per visitor or another visitor-linked revenue source had to offset the decline.']
  ],
  argument:[
   ['A city claims that extending library hours caused a rise in library membership because membership rose during the same year. Which fact most weakens the causal claim?',['The city also made library membership free that year','Some members prefer mornings','Libraries contain books and computers','Membership had been measured before'],0,'A simultaneous policy change provides a strong alternative explanation for the rise.'],
   ['A company argues: “Employees using standing desks took fewer sick days, so standing desks improve health.” Which assumption is most important?',['Standing desks are more expensive','The two employee groups did not differ in some other health-related way that explains sick days','Employees like office furniture','Sick days can never be misreported'],1,'The comparison requires ruling out major confounders.'],
   ['A school says a new tutoring program is effective because participants’ scores rose. What information would most strengthen the claim?',['Participants improved more than comparable nonparticipants over the same period','The program has a colorful logo','Some students enjoy tutoring','Scores vary across subjects'],0,'A comparison group helps isolate the program from general trends or maturation.']
  ],
  tone:[
   ['“The proposal is imaginative and addresses a genuine problem, though its cost estimates are far too optimistic.” The author’s attitude is best described as…',['unqualified enthusiasm','qualified approval','indifference','contempt'],1,'The author praises aspects of the proposal while expressing a serious reservation.'],
   ['“The theory remains influential, but the evidence offered in its defense is, at best, suggestive.” The tone is…',['cautiously skeptical','ecstatic','entirely neutral','nostalgic'],0,'“At best, suggestive” signals restrained skepticism.'],
   ['“It would be premature to dismiss the finding; replication is limited, but the result is intriguing.” The attitude is…',['guardedly interested','furious','certain of the result','dismissive'],0,'The wording balances interest with caution.']
  ]
 };
 const q=shuffle(bank[kind]||bank.tc)[0];return {label:kind==='se'?'Sentence Equivalence':kind==='rc'?'Reading Comprehension':kind==='inference'?'Inference':kind==='argument'?'Argument Reasoning':kind==='tone'?'Tone & Stance':kind==='logic'?'Sentence Logic':'Text Completion',text:q[0],choices:q[1],answer:q[2],explain:q[3],multi:Array.isArray(q[2])}
}

const VOCAB_SOURCES = {
  gregmat: 'https://raw.githubusercontent.com/Xatta-Trone/gre-words-collection/main/word-list/001%20GregMat960.csv',
  magoosh: 'https://raw.githubusercontent.com/Xatta-Trone/gre-words-collection/main/word-list/008%20Magoosh-1000.csv',
  vault: 'https://raw.githubusercontent.com/Xatta-Trone/gre-words-collection/main/word-list/combined.csv',
  dictionaryBase: 'https://raw.githubusercontent.com/mhollingshead/open-dictionary/main/api'
};

const VOCAB_GROUPS = [
 ['Talkative','garrulous · loquacious · voluble · verbose · prolix','All involve abundant speech. Verbose/prolix stress too many words; voluble stresses fluent speech.'],
 ['Quiet / concise','laconic · taciturn · reticent · terse · succinct','Laconic/terse/succinct describe brevity; taciturn describes a habitually quiet person; reticent often means reluctant to reveal.'],
 ['Praise','laud · extol · acclaim · lionize · venerate · approbation','Laud/extol/acclaim praise; lionize treats someone like a celebrity; venerate adds deep reverence.'],
 ['Criticize','censure · castigate · lambaste · excoriate · berate · upbraid','All are negative, but censure can be formal and excoriate/lambaste are especially severe.'],
 ['Deception','dissemble · equivocate · prevaricate · chicanery · duplicity · perfidy','Dissemble conceals; equivocate/prevaricate evade truth; chicanery is trickery; perfidy is treacherous bad faith.'],
 ['Obscure / difficult','abstruse · arcane · esoteric · recondite · inscrutable','All can describe hard-to-understand material; esoteric often implies knowledge restricted to a small group.'],
 ['Clear / persuasive','lucid · limpid · pellucid · cogent · trenchant','Lucid/limpid/pellucid = clear; cogent = logically convincing; trenchant = sharply perceptive and effective.'],
 ['Harmful','deleterious · pernicious · inimical · noxious · detrimental','Pernicious often suggests subtle or gradual harm; inimical means hostile/adverse to something.'],
 ['Stubborn','obstinate · obdurate · intransigent · dogmatic · pertinacious','Intransigent stresses refusal to compromise; dogmatic stresses rigid certainty in beliefs.'],
 ['Calm','placid · phlegmatic · imperturbable · equanimity · serene','Equanimity is composure; imperturbable means very difficult to disturb.'],
 ['Passionate','ardent · fervent · fervid · zealous · ebullient','Ebullient adds exuberance; zealous often attaches to a cause; fervid can imply intense heat/emotion.'],
 ['Gloomy','morose · lugubrious · plaintive · saturnine · dour','Morose/saturnine describe gloomy temperament; plaintive suggests mournful expression.'],
 ['Wasteful','prodigal · profligate · spendthrift · extravagant','Prodigal/profligate can be recklessly wasteful; spendthrift is a wasteful spender.'],
 ['Stingy','parsimonious · miserly · penurious · stinting','Parsimonious and miserly imply excessive unwillingness to spend; penurious can also relate to poverty.'],
 ['Arrogant','haughty · imperious · presumptuous · supercilious · overweening','Imperious is commanding; presumptuous oversteps bounds; supercilious looks down on others.'],
 ['Timid','diffident · timorous · craven · pusillanimous','Diffident is shy/self-doubting; craven/pusillanimous are much harsher: cowardly.'],
 ['Bold','audacious · intrepid · mettlesome · dauntless · brazen','Audacious can be admirable or reckless; brazen often implies shameless boldness.'],
 ['Short-lived','ephemeral · transient · transitory · evanescent · fleeting','Evanescent emphasizes vanishing quickly; perennial is the useful opposite.'],
 ['Ordinary / dull','banal · mundane · pedestrian · prosaic · vapid · insipid','Pedestrian/prosaic are ordinary and unimaginative; vapid/insipid suggest lack of liveliness or substance.'],
 ['Scholarly','erudite · cerebral · learned · pedantic · encyclopedic','Erudite is genuinely learned; pedantic often criticizes fussy displays of learning or rule-focus.'],
 ['Unpredictable','capricious · mercurial · erratic · fickle · volatile','Mercurial/fickle often apply to temperament or preference; volatile can change suddenly and dramatically.'],
 ['Soothe','assuage · allay · mollify · placate · appease · pacify','Assuage/allay often take fears or pain; mollify/placate/appease often take an angry person or hostility.'],
 ['Worsen','exacerbate · aggravate · intensify · inflame','Exacerbate is a classic GRE verb meaning make a problem or condition worse.'],
 ['Improve / relieve','ameliorate · alleviate · mitigate · remedy','Ameliorate improves; alleviate/mitigate reduce severity; remedy corrects a problem.'],
 ['Relevant','germane · pertinent · apposite · apropos','All mean relevant or fitting; apposite often means strikingly appropriate.'],
 ['Irrelevant','extraneous · tangential · peripheral · immaterial','Tangential touches the topic only indirectly; extraneous is unnecessary or unrelated.'],
 ['Friendly','affable · amiable · congenial · convivial · amicable','Convivial suggests sociable festivity; amicable often describes relations or settlements without hostility.'],
 ['Hostile','acrimonious · belligerent · antagonistic · truculent · inimical','Acrimonious often describes bitter speech/dispute; truculent means aggressively defiant/eager to fight.'],
 ['Honest','candid · forthright · ingenuous · veracious · probity','Ingenuous means innocent/frank, not ingenious; probity is strong moral integrity.'],
 ['False / misleading','specious · spurious · fallacious · bogus · apocryphal','Specious looks plausible but is wrong; spurious is not genuine; apocryphal is of doubtful authenticity.'],
 ['Abundant','copious · profuse · prolific · plethora · surfeit','Prolific produces much; plethora/surfeit are nouns for excess or overabundance.'],
 ['Scarce','dearth · paucity · scant · sparse · meager','Dearth/paucity are nouns for shortage; scant/sparse describe limited amount or density.'],
 ['Flexible','malleable · pliant · tractable · supple · plastic','Malleable/plastic can be literal or figurative; tractable often means manageable or easily influenced.'],
 ['Rigid','inflexible · immutable · ossified · doctrinaire · stringent','Immutable cannot change; ossified can mean rigidly conventional; stringent means strict/exacting.'],
 ['Careful','meticulous · scrupulous · fastidious · punctilious · circumspect','Circumspect is cautious about consequences; punctilious/fastidious emphasize exactness or detail.'],
 ['Careless / hasty','cursory · perfunctory · precipitate · slapdash · negligent','Cursory = quick and shallow; perfunctory = done mechanically with little care; precipitate = rashly hasty.']
];

const TRAP_MEANINGS = [
 ['qualify','meet a requirement','limit, modify, or soften a claim'],['intimate','close/personal','suggest or imply indirectly'],['pedestrian','a person walking','ordinary, dull, unimaginative'],['plastic','synthetic material','moldable, adaptable, capable of being shaped'],['arrest','take into custody','stop/check; attract and hold attention'],['august','the month','majestic, venerable, inspiring respect'],['brook','small stream','tolerate or allow'],['flag','banner','weaken, droop, lose vigor'],['exact','precise','demand or require'],['appropriate','suitable','take or claim for one’s own use'],
 ['sanction','penalty','authorize/approve; context can reverse the sense'],['table','piece of furniture','postpone/remove a proposal from consideration in U.S. usage'],['check','verify','restrain, limit, or stop'],['betray','be disloyal','reveal unintentionally'],['partial','incomplete','biased or favoring one side'],['singular','one','remarkable, unusual, exceptional'],['sound','noise','valid, reliable, well-founded'],['patent','legal right for invention','obvious, plain, readily apparent'],['telling','speaking','revealing, significant, persuasive'],['wanting','desiring','lacking or deficient'],
 ['nice','pleasant','precise, fine, or exacting in formal/older usage'],['champion','winner','support or advocate'],['temper','anger','moderate, soften, or restrain'],['hedge','shrubs','qualify a statement or avoid firm commitment'],['color','hue','influence, distort, or give a particular character to'],['moot','irrelevant','open to debate; in some contexts deprived of practical significance'],['meet','encounter','fitting, suitable, proper'],['rent','payment for use','a tear or split; also past of rend'],['steep','sharply sloping','soak or immerse'],['tender','gentle','offer formally'],
 ['disinterested','not interested','impartial, free from personal stake'],['enervate','energize (false friend)','weaken or drain energy'],['prodigal','gifted (false friend)','recklessly wasteful'],['restive','restful (false friend)','impatient, uneasy, hard to control'],['belie','confirm (false friend)','contradict or give a false impression of'],['discrete','careful/private (confused with discreet)','separate, distinct'],['ingenuous','clever (confused with ingenious)','innocent, frank, unsophisticated'],['proscribe','prescribe','forbid or prohibit'],['prescribe','forbid','recommend or lay down as a rule'],['comprise','compose','consist of; include'],
 ['affected','influenced','artificial, pretentious, or assumed in manner'],['artless','without art/skill','guileless, natural, innocent'],['base','foundation','morally low or ignoble'],['coin','money','invent a new word or phrase'],['countenance','face','approve, tolerate, or support'],['economy','financial system','careful sparing use; efficiency'],['fell','past of fall','fierce, cruel, deadly (adjective)'],['grouse','bird','complain or grumble'],['obtain','get','be established, prevalent, or in force'],['rail','metal bar','complain or protest bitterly'],
 ['render','create/draw','cause to become; provide or give'],['skirt','garment','avoid or go around the edge of an issue'],['stint','period of work','restrict or be sparing with'],['transparent','see-through','obvious, easy to perceive; sometimes candid'],['volatile','evaporates readily','unstable, changeable, explosive in temperament'],['gall','bile','bold impudence; also annoy'],['minute','60 seconds','extremely small (my-NOOT)'],['severe','harsh','plain/unadorned as well as strict'],['sophisticated','cultured','complex/refined; historically altered from natural simplicity'],['canonical','religiously authorized','standard, accepted, belonging to an established canon']
];

const VOCAB_ROOTS = [
 ['bene','good / well','beneficent, benevolent, benediction'],['mal','bad / evil','malevolent, malfeasance, malign'],['eu','good / pleasant','euphemism, euphony, euphoria'],['dys','bad / difficult','dysfunction, dyspeptic'],['cred','believe / trust','credible, credulous, incredulous'],['ver','truth','veracity, veritable, verify'],['loqu/locut','speak','loquacious, eloquent, circumlocution'],['dict','say / declare','dictum, dictate, contradict'],['voc/vok','voice / call','vociferous, invoke, revoke'],['scrib/script','write','describe, manuscript, proscribe'],
 ['phil','love','philanthropy, philology, bibliophile'],['miso','hate','misanthrope, misogyny'],['anthrop','human','misanthropic, anthropology'],['omni','all','omnipresent, omniscient'],['poly','many','polymath, polyglot'],['mono','one','monolithic, monotony'],['hetero','different','heterodox, heterogeneous'],['homo','same','homogeneous, homonym'],['magn','great','magnanimous, magnify'],['micro','small','microscopic, microcosm'],
 ['macro','large','macroscopic, macrocosm'],['pre','before','precursor, prescient, preclude'],['post','after','posthumous, postscript'],['ante','before','antedate, antecedent'],['retro','back / backward','retrospective, retroactive'],['con/com','together / with','converge, coalesce, commensurate'],['dis','apart / not / reverse','disparate, disavow, dissemble'],['re','again / back','reiterate, recant, regress'],['tract','pull / draw','tractable, retract, protract'],['ject','throw','reject, interject, abject'],
 ['ced/cess','go / yield','recede, concede, secession'],['chron','time','anachronism, chronological'],['bio','life','biography, biodegradable'],['geo','earth','geology, geography'],['luc/lum','light','lucid, luminous, elucidate'],['vid/vis','see','evident, visionary, perspicacious (conceptually sight-like)'],['aud','hear','audible, audience'],['sens/sent','feel / perceive','sentient, sensation, consensus'],['path','feeling / suffering','apathy, antipathy, empathy'],['mort','death','mortal, moribund'],
 ['viv/vit','life','vivacious, vitality, revive'],['gen','birth / produce','engender, progeny, indigenous'],['cap/capt','take / hold','capture, captive, capacious'],['fer','carry / bear','transfer, defer, confer'],['mit/miss','send','transmit, dismiss, emissary'],['pel/puls','drive / push','compel, expel, repulsive'],['sta/stat','stand','static, steadfast, status'],['grad/gress','step / go','gradual, digress, regress'],['fac/fec/fic','make / do','facile, efficacious, prolific'],['form','shape','conform, amorphous (a+form), reform'],
 ['circum','around','circumspect, circumscribe'],['sub','under','subservient, subordinate, subvert'],['super','over / above','superfluous, supersede'],['trans','across / beyond','transient, transcend'],['in/im','in / into OR not','inhibit, immutable, impeccable — inspect the word; prefix meaning depends on formation'],['ex/e','out / from','exculpate, extraneous, elicit'],['ad/ac/af/ag','to / toward','accrete, affable, aggrandize'],['ob/op','against / toward','obviate, opprobrium'],['per','through / thoroughly','pervade, perfidy'],['pro','forward / for','proliferate, proclivity, propitious']
];

let remoteVocabMap = new Map();
let remoteVocabStatus = {state:'idle',loaded:0,failed:0,message:'Expanded high-frequency sources have not loaded yet.'};
let deepVaultWords = [];
let deepVaultStatus = {state:'idle',message:'Load the Deep Vault only when you need a reference beyond the high-frequency study deck.'};
let dictionaryBucketCache = new Map();
let vocabIndex=0,vocabFlipped=false;

function normalizeVocabEntry(w){
  if(!w) return null;
  if(!Array.isArray(w)) return {
    word:String(w.word||'').trim(), pos:w.pos||w.partOfSpeech||'', definition:w.definition||'', synonyms:Array.isArray(w.synonyms)?w.synonyms.join(', '):(w.synonyms||''),
    tier:w.tier||'Personal', sources:w.sources||['Personal']
  };
  // Historical personal entries were saved as [word, definition, 'custom', synonyms].
  if(w[2]==='custom') return {word:String(w[0]||'').trim(),pos:'custom',definition:w[1]||'',synonyms:w[3]||'',tier:'Personal',sources:['Personal']};
  return {word:String(w[0]||'').trim(),pos:w[1]||'',definition:w[2]||'',synonyms:w[3]||'',tier:'Atlas Core',sources:['Atlas Core']};
}
function parseWordList(text){
  return [...new Set(String(text||'').split(/\r?\n/).map(line=>line.replace(/^\uFEFF/,'').split(',')[0].replace(/^['"]|['"]$/g,'').trim().toLowerCase()).filter(w=>/^[a-z][a-z -]{1,40}$/.test(w)&&!/^word$|^words$/.test(w)))];
}
let studyEntryCache=null;
function invalidateStudyEntries(){studyEntryCache=null}
function buildStudyEntries(){
  if(studyEntryCache)return studyEntryCache;
  const map=new Map();
  VOCAB.map(normalizeVocabEntry).filter(Boolean).forEach(e=>map.set(e.word.toLowerCase(),e));
  (state.customWords||[]).map(normalizeVocabEntry).filter(Boolean).forEach(e=>{if(e.word)map.set(e.word.toLowerCase(),e)});
  remoteVocabMap.forEach((meta,key)=>{
    if(map.has(key)){
      const e=map.get(key); e.sources=[...new Set([...(e.sources||[]),...meta.sources])]; return;
    }
    map.set(key,{word:meta.word,pos:'',definition:'',synonyms:'',tier:meta.sources.length>=2?'Consensus Core':'High-frequency Extended',sources:meta.sources});
  });
  const rank={'Personal':0,'Atlas Core':1,'Consensus Core':2,'High-frequency Extended':3};
  studyEntryCache=[...map.values()].sort((a,b)=>(rank[a.tier]??9)-(rank[b.tier]??9)||a.word.localeCompare(b.word));
  return studyEntryCache;
}
function findStudyEntry(word){return buildStudyEntries().find(e=>e.word.toLowerCase()===String(word||'').toLowerCase())}
function vocabKey(word){return String(word||'').toLowerCase()}
function getVocabRecord(word){const k=vocabKey(word);return state.vocab[k]||{box:0,due:0,seen:0,correct:0,introduced:''};}
function vocabDailyQuota(){state.settings=state.settings||{};return clamp(Number(state.settings.vocabDailyNew)||25,5,100)}
function vocabQueue(){
  const now=Date.now(),today=todayISO(),entries=buildStudyEntries();
  const reviews=entries.filter(e=>{const r=getVocabRecord(e.word);return r.seen&&r.due<=now}).sort((a,b)=>getVocabRecord(a.word).due-getVocabRecord(b.word).due);
  const introducedToday=entries.filter(e=>getVocabRecord(e.word).introduced===today).length;
  const room=Math.max(0,vocabDailyQuota()-introducedToday);
  const unseen=entries.filter(e=>!getVocabRecord(e.word).seen).slice(0,room);
  return {entries,reviews,unseen,due:[...reviews,...unseen],introducedToday,newRemaining:room};
}
function dueWords(){return vocabQueue().due}
function currentVocabWord(){const q=vocabQueue();if(q.due.length)return q.due[vocabIndex%q.due.length];return q.entries[vocabIndex%Math.max(1,q.entries.length)]||normalizeVocabEntry(VOCAB[0])}
function entryDefinition(e){const cached=state.vocabDefs?.[vocabKey(e.word)];return {pos:e.pos||cached?.pos||'',definition:e.definition||cached?.definition||'',synonyms:e.synonyms||cached?.synonyms||'',extra:cached?.extra||[]}}

async function loadRemoteVocab(force=false){
  if(remoteVocabStatus.state==='loading'||(remoteVocabStatus.state==='ready'&&!force))return;
  remoteVocabStatus={state:'loading',loaded:0,failed:0,message:'Loading high-frequency GRE sources…'};
  if(currentRoute().startsWith('vocab'))render();
  const sources=[['GregMAT 960',VOCAB_SOURCES.gregmat],['Magoosh 1000',VOCAB_SOURCES.magoosh]];
  const settled=await Promise.allSettled(sources.map(async ([name,url])=>{const res=await fetch(url,{cache:'force-cache'});if(!res.ok)throw new Error(name);return [name,parseWordList(await res.text())]}));
  remoteVocabMap=new Map();
  settled.forEach((result,i)=>{
    if(result.status!=='fulfilled'){remoteVocabStatus.failed++;return}
    remoteVocabStatus.loaded++;const [name,words]=result.value;
    words.forEach(word=>{const key=word.toLowerCase(),prev=remoteVocabMap.get(key)||{word,sources:[]};prev.sources=[...new Set([...prev.sources,name])];remoteVocabMap.set(key,prev)});
  });
  remoteVocabStatus.state=remoteVocabStatus.loaded?'ready':'error';
  remoteVocabStatus.message=remoteVocabStatus.loaded?`${remoteVocabStatus.loaded}/2 curated high-frequency sources loaded and de-duplicated.`:'Could not reach the online vocabulary sources. The built-in annotated Atlas Core still works offline.';
  invalidateStudyEntries();
  if(currentRoute().startsWith('vocab'))render();
}
async function lookupDictionary(word){
  const key=vocabKey(word);const prev=state.vocabDefs?.[key];
  if(prev?.definition)return state.vocabDefs[key];
  if(prev?.error&&Date.now()-(prev.fetched||0)<86400000*3)return null; // retry failed lookups after 3 days
  const clean=key.replace(/[^a-z]/g,'');if(clean.length<2)return null;
  const prefix=clean.slice(0,2),dir=clean[0];
  try{
    let bucket=dictionaryBucketCache.get(prefix);
    if(!bucket){const res=await fetch(`${VOCAB_SOURCES.dictionaryBase}/${dir}/${prefix}.json`,{cache:'force-cache'});if(!res.ok)throw new Error('dictionary');bucket=await res.json();dictionaryBucketCache.set(prefix,bucket)}
    const entry=Array.isArray(bucket)?bucket.find(x=>String(x.word||'').toLowerCase()===key):(bucket?.[key]||Object.values(bucket||{}).find(x=>String(x?.word||'').toLowerCase()===key));if(!entry)throw new Error('not found');
    const senses=[];const pos=[];
    (entry.etymologies||[]).forEach(et=>(et.partsOfSpeech||[]).forEach(p=>{if(p.partOfSpeech&&!pos.includes(p.partOfSpeech))pos.push(p.partOfSpeech);(p.senses||[]).forEach(s=>{const def=String(s.sense||s.definition||'').trim();if(def&&!senses.includes(def)&&senses.length<4)senses.push(def)})}));
    if(!senses.length)throw new Error('no senses');
    state.vocabDefs=state.vocabDefs||{};state.vocabDefs[key]={pos:pos.slice(0,2).join('/'),definition:senses[0],extra:senses.slice(1),fetched:Date.now()};saveState();return state.vocabDefs[key];
  }catch(e){state.vocabDefs=state.vocabDefs||{};state.vocabDefs[key]={definition:'',error:true,fetched:Date.now()};saveState();return null}
}
async function loadDeepVault(force=false){
  if(deepVaultStatus.state==='loading'||(deepVaultStatus.state==='ready'&&!force))return;
  deepVaultStatus={state:'loading',message:'Loading the 9,500+ word cross-list reference vault…'};render();
  try{const res=await fetch(VOCAB_SOURCES.vault,{cache:'force-cache'});if(!res.ok)throw new Error();deepVaultWords=parseWordList(await res.text());deepVaultStatus={state:'ready',message:`${deepVaultWords.length.toLocaleString()} de-duplicated reference words loaded. Search this vault; do not memorize it linearly.`}}
  catch{deepVaultStatus={state:'error',message:'The Deep Vault could not load. Check your connection and retry.'}}
  if(currentRoute()==='vocab-vault')render();
}

function vocabSubnav(route){return `<nav class="vocab-subnav">${[
 ['vocab','Review'],['vocab-browse','Browse'],['vocab-groups','Semantic groups'],['vocab-traps','Trap meanings'],['vocab-roots','Roots'],['vocab-vault','Deep Vault']
 ].map(([r,label])=>`<button data-route="${r}" class="${route===r?'active':''}">${label}</button>`).join('')}</nav>`}
function vocabHeader(route,eyebrow,title,desc,stamp='V'){return `<header class="route-header"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p>${vocabSubnav(route)}</div><div class="route-stamp"><div><b>${stamp}</b><small>mastery<br>system</small></div></div></header>`}
function sourceStatusHTML(){const q=vocabQueue();return `<div class="source-status ${remoteVocabStatus.state}"><span class="source-dot"></span><div><b>${esc(remoteVocabStatus.message)}</b><small>Built-in Atlas Core: ${VOCAB.length} annotated words · Study deck currently: ${q.entries.length.toLocaleString()}</small></div>${remoteVocabStatus.state==='error'?'<button id="retryVocabSources" class="pill-btn">Retry</button>':''}</div>`}

function renderVocab(route='vocab'){
  if(route==='vocab-browse')return renderVocabBrowse(route);
  if(route==='vocab-groups')return renderVocabGroups(route);
  if(route==='vocab-traps')return renderVocabTraps(route);
  if(route==='vocab-roots')return renderVocabRoots(route);
  if(route==='vocab-vault')return renderVocabVault(route);
  const q=vocabQueue(),w=currentVocabWord(),r=getVocabRecord(w.word),info=entryDefinition(w),seen=q.entries.filter(e=>getVocabRecord(e.word).seen).length,mastered=q.entries.filter(e=>getVocabRecord(e.word).box>=4).length;
  const noDue=!q.due.length;
  return `<div class="page">${vocabHeader(route,'Spaced retrieval · high-frequency first','Vocabulary Mastery','For a top-end Verbal score, vocabulary must be retrievable in context—not merely familiar. This system prioritizes high-frequency consensus words, semantic neighborhoods, secondary meanings, morphology, and delayed retrieval.','V')}
  <div class="vocab-method-banner"><div><span class="badge blue">Method</span><h3>Core → consensus → context → obscure reference</h3><p>There is no official finite ETS vocabulary list. GRE Atlas therefore uses a bounded high-frequency study deck and keeps the enormous cross-list vault as searchable insurance rather than turning 9,500 random words into mandatory flashcards.</p></div><div class="method-steps"><b>1</b><span>Recall</span><b>2</b><span>Contrast</span><b>3</b><span>Use</span><b>4</b><span>Retest</span></div></div>
  ${sourceStatusHTML()}
  <div class="vocab-layout"><section>${noDue?`<div class="card empty-state"><h2>Today’s vocabulary queue is clear.</h2><p>You have finished due reviews and today’s new-word allowance. Increase the daily-new quota only if retention remains strong.</p></div>`:`<div class="flashcard" id="flashcard" tabindex="0" role="button" aria-label="Flashcard — press Enter or Space to flip"><div><span class="pos">${esc(info.pos||w.tier)} · ${esc(w.tier)} · box ${r.box}</span><div class="word">${esc(w.word)}</div></div><div>${vocabFlipped?`<div class="definition">${info.definition?esc(info.definition):'<span class="definition-loading">Fetching an open-dictionary definition…</span>'}</div>${info.extra?.length?`<div class="secondary-senses">Also: ${info.extra.slice(0,2).map(esc).join(' · ')}</div>`:''}<div class="synonyms">${info.synonyms?`Synonyms / neighbors: ${esc(info.synonyms)}`:'Connect this word to a semantic group or write your own neighbor.'}</div>`:`<div class="definition recall-prompt">Recall <b>meaning + tone + one contrast</b>. Then click to reveal.</div>`}</div></div>${vocabFlipped?`<div class="rating-row"><button data-vrate="again">Again · soon</button><button data-vrate="hard">Hard · 1d</button><button data-vrate="good">Good · grow</button><button data-vrate="easy">Easy · longer</button></div>`:''}`}</section>
  <aside class="card"><span class="eyebrow">Today</span><div class="vocab-stats"><div class="tiny-stat"><b>${q.reviews.length}</b><span>reviews due</span></div><div class="tiny-stat"><b>${q.newRemaining}</b><span>new slots</span></div><div class="tiny-stat"><b>${seen}</b><span>seen</span></div><div class="tiny-stat"><b>${mastered}</b><span>mature</span></div></div><label class="quota-control">New words / day <input id="vocabDailyNew" type="number" min="5" max="100" value="${vocabDailyQuota()}"></label><p class="microcopy">Default 25. Reviews are never hidden by the new-word cap.</p><div class="vocab-callouts"><button data-route="vocab-groups" class="mini-route">Semantic groups <span>→</span></button><button data-route="vocab-traps" class="mini-route">Secondary meanings <span>→</span></button><button data-route="vocab-vault" class="mini-route">Deep Vault <span>→</span></button></div></aside></div>
  <div class="section-title"><div><span class="eyebrow">Personal lexicon</span><h2>Add words your practice exposes</h2></div></div><div class="card"><div class="error-form vocab-add-form"><input id="customWord" placeholder="word"><input id="customDef" placeholder="definition (optional — can fetch on reveal)"><input id="customSyn" placeholder="synonyms / clue"><button id="addWord" class="primary-btn">Add</button></div></div></div>`
}
function renderVocabBrowse(route){const q=vocabQueue();return `<div class="page">${vocabHeader(route,'Your active study deck','High-frequency dictionary','Search the de-duplicated study deck. Atlas Core words include hand-built concise definitions; supplemental high-frequency words retrieve open-dictionary definitions only when you study them.',String(q.entries.length))}${sourceStatusHTML()}<div class="tier-grid">${[
 ['Atlas Core',q.entries.filter(e=>e.tier==='Atlas Core').length,'Built-in, annotated, fully offline.'],['Consensus Core',q.entries.filter(e=>e.tier==='Consensus Core').length,'Appears in both loaded high-frequency lists.'],['High-frequency Extended',q.entries.filter(e=>e.tier==='High-frequency Extended').length,'Appears in one curated source.'],['Personal',q.entries.filter(e=>e.tier==='Personal').length,'Words you added from practice.']
 ].map(x=>`<div class="card tier-card"><span class="eyebrow">${x[0]}</span><h3>${x[1].toLocaleString()}</h3><p>${x[2]}</p></div>`).join('')}</div><section class="card"><div class="vault-toolbar"><input id="vocabSearch" class="vocab-search" placeholder="Search word, meaning, synonym, or tier"><span class="badge">${q.entries.length.toLocaleString()} active</span></div><div id="wordList" class="word-list master-word-list">${renderWordList('')}</div></section></div>`}
function renderWordList(term){term=String(term||'').toLowerCase().trim();return buildStudyEntries().filter(e=>{const i=entryDefinition(e),hay=`${e.word} ${i.definition} ${i.synonyms} ${e.tier} ${(e.sources||[]).join(' ')}`.toLowerCase();return !term||hay.includes(term)}).slice(0,250).map(e=>{const r=getVocabRecord(e.word),i=entryDefinition(e);return `<div class="word-row"><span><b>${esc(e.word)}</b><small>${esc(i.definition||e.tier)}${e.sources?.length?` · ${esc(e.sources.join(' + '))}`:''}</small></span><span class="word-row-actions"><span class="badge ${r.box>=4?'green':''}">${r.seen?'B'+r.box:'new'}</span>${!i.definition?`<button class="pill-btn lookup-word" data-word="${esc(e.word)}">define</button>`:''}</span></div>`}).join('')||'<div class="empty-state">No words match that search.</div>'}
function renderVocabGroups(route){return `<div class="page">${vocabHeader(route,'Semantic memory','Semantic Groups','Sentence Equivalence rewards meaning relationships. Learn vocabulary as networks so one known idea activates several candidate words—and so you can distinguish near-synonyms by tone and use.',String(VOCAB_GROUPS.length))}<div class="group-grid">${VOCAB_GROUPS.map((g,i)=>`<article class="card group-card"><span class="badge blue">Group ${String(i+1).padStart(2,'0')}</span><h3>${g[0]}</h3><div class="group-words">${g[1].split(' · ').map(w=>`<button class="word-chip" data-vocab-search="${esc(w)}">${esc(w)}</button>`).join('')}</div><p>${g[2]}</p></article>`).join('')}</div></div>`}
function renderVocabTraps(route){return `<div class="page">${vocabHeader(route,'Polysemy · familiar-looking traps','Secondary Meaning Lab','GRE passages and sentence questions can weaponize familiar words by using a less familiar academic meaning. These are high-value because ordinary English confidence can make them easier to misread.',String(TRAP_MEANINGS.length))}<div class="trap-grid">${TRAP_MEANINGS.map((x,i)=>`<article class="trap-row"><div><span class="trap-number">${String(i+1).padStart(2,'0')}</span><h3>${x[0]}</h3></div><div><small>Everyday pull</small><p>${x[1]}</p></div><div><small>GRE / academic sense</small><p><b>${x[2]}</b></p></div></article>`).join('')}</div></div>`}
function renderVocabRoots(route){return `<div class="page">${vocabHeader(route,'Morphology as a backup strategy','Root & Affix Lab','Roots help you generate a hypothesis when a word is unfamiliar. They are clues, not guarantees: semantic drift and borrowed forms can defeat mechanical decoding.',String(VOCAB_ROOTS.length))}<div class="vocab-method-banner"><div><span class="badge">Rule</span><h3>Use morphology to narrow, not to hallucinate.</h3><p>First use sentence logic and tone. Then let roots/prefixes suggest a direction. Finally test that direction against every clue in the sentence.</p></div></div><div class="root-table"><div class="root-head"><span>Root / affix</span><span>Core idea</span><span>Examples</span></div>${VOCAB_ROOTS.map(x=>`<div class="root-row"><b>${x[0]}</b><span>${x[1]}</span><span>${x[2]}</span></div>`).join('')}</div></div>`}
function renderVocabVault(route){const loaded=deepVaultStatus.state==='ready';return `<div class="page">${vocabHeader(route,'Cross-list reference · not a required deck','Deep Vocabulary Vault','This is the “what if I encounter something obscure?” layer: a union drawn from many GRE lists. Search it when practice exposes a word, then promote useful words into your personal SRS. Do not memorize the vault alphabetically.','9.5k+')}
 <div class="vocab-method-banner warning"><div><span class="badge red">Important</span><h3>More words ≠ more score per hour.</h3><p>The core study system deliberately prioritizes roughly 1,000-ish high-frequency words and consensus overlap. The Deep Vault exists for breadth without sabotaging retention.</p></div></div>
 <div class="source-status ${deepVaultStatus.state}"><span class="source-dot"></span><div><b>${esc(deepVaultStatus.message)}</b><small>Source: public cross-list GRE word collection. Definitions are not imported from proprietary lists.</small></div>${!loaded?'<button id="loadVault" class="primary-btn">Load Deep Vault</button>':''}</div>
 ${loaded?`<section class="card"><div class="vault-toolbar"><input id="vaultSearch" class="vocab-search" placeholder="Type at least 2 letters…"><span class="badge">${deepVaultWords.length.toLocaleString()} words</span></div><div id="vaultResults" class="vault-results"><div class="empty-state"><h3>Search when you need breadth.</h3><p>Example: search <b>perspicacious</b>, then add it to Personal SRS if your practice makes it relevant.</p></div></div></section>`:''}</div>`}
function renderVaultResults(term){term=String(term||'').trim().toLowerCase();if(term.length<2)return '<div class="empty-state">Type at least 2 letters.</div>';const active=new Set(buildStudyEntries().map(e=>e.word.toLowerCase()));return deepVaultWords.filter(w=>w.includes(term)).slice(0,160).map(w=>`<div class="vault-word"><b>${esc(w)}</b>${active.has(w)?'<span class="badge green">in study deck</span>':`<button class="pill-btn add-vault-word" data-word="${esc(w)}">+ Personal SRS</button>`}</div>`).join('')||'<div class="empty-state">No match in the loaded vault.</div>'}
function addPersonalWord(word,definition='',synonyms=''){state.customWords=state.customWords||[];const key=String(word||'').trim().toLowerCase();if(!key)return false;if(buildStudyEntries().some(e=>e.word.toLowerCase()===key))return false;state.customWords.push({word:key,pos:'',definition,synonyms,tier:'Personal',sources:['Personal']});invalidateStudyEntries();saveState();return true}
function rateVocab(rating){const w=currentVocabWord(),k=vocabKey(w.word),rec=getVocabRecord(w.word),now=Date.now(),today=todayISO();let box=rec.box||0,days=0;if(rating==='again'){box=0;days=.007}else if(rating==='hard'){box=Math.max(1,box);days=1}else if(rating==='good'){box=Math.min(5,box+1);days=[0,1,3,7,16,35][box]||35}else{box=Math.min(5,box+2);days=[0,1,4,10,24,50][box]||50}state.vocab[k]={box,due:now+days*86400000,seen:(rec.seen||0)+1,correct:(rec.correct||0)+(rating==='again'?0:1),introduced:rec.introduced||today};state.xp=(state.xp||0)+(rating==='again'?1:3);markStudyDay();vocabFlipped=false;vocabIndex++;saveState();render();updateChrome()}
let essaySeconds=1800,essayTimer=null;
function currentEssayRec(){const pi=state.essayPrompt%ESSAY_PROMPTS.length;state.essays=state.essays||{};return state.essays[pi]||(state.essays[pi]={text:'',date:Date.now()})}
function renderEssay(){
 const pi=state.essayPrompt%ESSAY_PROMPTS.length;const prompt=ESSAY_PROMPTS[pi];const rec=currentEssayRec();const draft=rec.text||'';const wc=draft.trim()?draft.trim().split(/\s+/).length:0;const draftsKept=Object.values(state.essays||{}).filter(r=>r&&r.text&&r.text.trim()).length;
 return `<div class="page"><header class="route-header"><div><span class="eyebrow">30-minute practice environment</span><h1>Essay Studio</h1><p>Practice the current Analyze an Issue task with original prompts. Each prompt keeps its own draft automatically, so switching prompts never destroys writing. The goal is task compliance, a clear nuanced position, developed reasoning, persuasive examples, organization, and language control—not a memorized template.</p></div><div class="route-stamp"><div><b>6.0</b><small>target<br>rubric</small></div></div></header>
 <div class="essay-layout"><section><div class="card"><span class="badge">Practice prompt</span><h2 style="font-family:var(--serif);font-size:28px;line-height:1.35">${prompt}</h2><p style="font-size:12px;color:var(--muted)">Write a response in which you discuss the extent to which you agree or disagree with the statement. Develop your position with relevant reasons and examples, and consider circumstances that could affect your view.</p><div class="pill-row"><span class="badge">Prompt ${pi+1} of ${ESSAY_PROMPTS.length}</span>${draftsKept?`<span class="badge green">${draftsKept} draft${draftsKept>1?'s':''} saved</span>`:''}<button id="newPrompt" class="pill-btn">Another prompt →</button><button id="outlinePrompt" class="pill-btn">Show planning scaffold</button></div><div id="outlineBox"></div></div>
 <div class="essay-toolbar"><div class="timer-badge" id="essayTimer">${fmtTime(essaySeconds)}</div><div><span id="essayWords" class="badge">${wc} words</span> <button id="essayStart" class="pill-btn">Start / pause</button><button id="essayReset" class="pill-btn">Reset timer</button></div></div><textarea id="essayEditor" class="essay-editor" placeholder="Plan first. Then write your response here…">${esc(draft)}</textarea></section>
 <aside><div class="card"><span class="eyebrow">6.0 self-audit</span><h3>Before you call it done</h3>${[
 ['1','Task','Did I answer the exact instruction, not merely the topic?'],['2','Position','Is my thesis clear, defensible, and appropriately nuanced?'],['3','Development','Does each body paragraph explain why, not merely assert?'],['4','Evidence','Are examples concrete and explicitly tied to claims?'],['5','Counterpressure','Did I address an important limitation or opposing consideration?'],['6','Control','Are sentences precise, varied, and grammatically controlled?']
 ].map(x=>`<div class="rubric-row"><b>${x[0]}</b><p><strong>${x[1]}</strong><br>${x[2]}</p></div>`).join('')}</div><div class="aside-card" style="margin-top:12px"><span class="eyebrow">Time model</span><h4>4–5 / 21–23 / 2–4</h4><p>Minutes for plan / draft / revise is a strong default. Personalize it from timed evidence.</p></div></aside></div></div>`
}
function fmtTime(s){s=Math.max(0,s);return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}

function renderErrors(){
 const rows=state.errors||[];const open=rows.filter(r=>!r.resolved);const done=rows.length-open.length;
 return `<div class="page"><header class="route-header"><div><span class="eyebrow">Your highest-value dataset</span><h1>Error Log</h1><p>Log wrong answers, lucky guesses, and questions that were unacceptably slow. Re-solve open errors after a few days — only resolve one once you can beat a fresh version of it cold.</p></div><div class="route-stamp"><div><b>${open.length}/${rows.length}</b><small>open<br>errors</small></div></div></header>
 <section class="card"><div class="error-form"><input id="errorText" placeholder="What went wrong? e.g. assumed x>0 in QC"><select id="errorType"><option>Concept gap</option><option>Reasoning gap</option><option>Execution slip</option><option>Time / strategy</option><option>Vocabulary</option></select><select id="errorModule"><option>Quant</option><option>Verbal</option><option>Writing</option><option>Strategy</option></select><button id="addError" class="primary-btn">Log it</button></div><table class="error-table"><thead><tr><th>Error</th><th>Type</th><th>Track</th><th>Date</th><th>Status / actions</th></tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr${r.resolved?' style="opacity:.55"':''}><td>${esc(r.text)}${r.reviews?.length?`<br><small style="color:var(--muted)">re-visited ${r.reviews.length}× · last ${fmtDate(r.reviews[r.reviews.length-1])}</small>`:''}</td><td><span class="badge">${esc(r.type)}</span></td><td>${esc(r.module)}</td><td>${fmtDate(r.date)}</td><td><button class="pill-btn toggle-error" data-i="${i}">${r.resolved?'Reopen':'✓ Resolved'}</button> <button class="pill-btn review-error" data-i="${i}">Re-solved today</button> <button class="pill-btn remove-error" data-i="${i}" aria-label="Delete">×</button></td></tr>`).join(''):`<tr><td colspan="5"><div class="empty-state"><h3>No errors yet.</h3><p>Your first serious practice set will change that. Good—that gives you something concrete to fix.</p></div></td></tr>`}</tbody></table></section>
 <div class="section-title"><div><span class="eyebrow">Weekly review</span><h2>Classify patterns</h2></div></div><div class="grid grid-4">${['Concept gap','Reasoning gap','Execution slip','Time / strategy'].map(x=>{const n=open.filter(r=>r.type===x).length;return `<div class="card"><span class="eyebrow">${x}</span><h3>${n}${done?` <small style="font-size:12px;color:var(--muted)">(${rows.filter(r=>r.type===x&&r.resolved).length} resolved)</small>`:''}</h3><p>${x==='Concept gap'?'Relearn the underlying topic, then solve fresh items without notes.':x==='Reasoning gap'?'Write the wrong reasoning chain and the better decision point.':x==='Execution slip'?'Create a mechanical check: units, signs, re-read target, estimate.':'Adjust skip rules, checkpoints, or question order based on repeated timed evidence.'}</p></div>`}).join('')}</div></div>`
}

function renderMocks(){
 const rows=state.mocks||[];return `<div class="page"><header class="route-header"><div><span class="eyebrow">Score is measurement</span><h1>Mock Tracker</h1><p>Record official POWERPREP and other full simulations separately. Track Quant, Verbal, AWA, and one process note. The trend and recurring failure modes matter more than a single result.</p></div><div class="route-stamp"><div><b>${rows.length}</b><small>mocks<br>tracked</small></div></div></header>
 <section class="card"><div class="mock-row" style="font-family:var(--mono);font-size:9px;text-transform:uppercase;color:var(--muted)"><span>Test / note</span><span>Quant</span><span>Verbal</span><span>AWA</span><span>Date</span><span></span></div><div id="mockRows">${rows.map((r,i)=>mockRow(r,i)).join('')}</div><div class="mock-row"><input id="mockName" placeholder="POWERPREP 1 / mock name"><input id="mockQ" type="number" min="130" max="170" placeholder="Q"><input id="mockV" type="number" min="130" max="170" placeholder="V"><input id="mockA" type="number" min="0" max="6" step=".5" placeholder="AWA"><input id="mockDate" type="date" value="${todayISO()}"><button id="addMock" class="primary-btn">Add</button></div></section>
 ${rows.length?`<div class="section-title"><div><span class="eyebrow">Trend</span><h2>What the numbers say</h2></div></div><div class="stat-strip"><div class="stat-cell"><b>${Math.max(...rows.map(r=>r.q||130))}</b><span>best Quant</span></div><div class="stat-cell"><b>${Math.max(...rows.map(r=>r.v||130))}</b><span>best Verbal</span></div><div class="stat-cell"><b>${(() => { const c=rows.filter(r=>r.q!=null&&r.v!=null); return c.length?Math.max(...c.map(r=>r.q+r.v)):'—' })()}</b><span>best Q+V total</span></div><div class="stat-cell"><b>${rows.length}</b><span>simulations</span></div></div>
 <div class="card" style="margin-top:14px"><span class="eyebrow">Score history</span><table class="error-table"><thead><tr><th>Test</th><th>Quant</th><th>Verbal</th><th>Total</th><th>AWA</th><th>Date</th></tr></thead><tbody>${[...rows].reverse().map(r=>`<tr><td>${esc(r.name)}</td><td>${r.q||'—'}</td><td>${r.v||'—'}</td><td>${(r.q&&r.v)?r.q+r.v:'—'}</td><td>${r.a??'—'}</td><td>${fmtDate(r.date)}</td></tr>`).join('')}</tbody></table>${state.targetQ&&state.targetV?`<p style="font-size:11px;color:var(--muted);margin:10px 0 0">Target total: ${+state.targetQ+ +state.targetV} · gap to target from best: ${(()=>{const c=rows.filter(r=>r.q&&r.v);if(!c.length)return '—';const best=Math.max(...c.map(r=>r.q+r.v));return Math.max(0,+state.targetQ + +state.targetV - best)+' points'})()}</p>`:''}</div>`:''}
 <div class="source-note" style="margin-top:18px">Use the free official POWERPREP tests to learn the actual interface and section-level experience. Avoid burning all official tests early; space them so each one can validate a block of training.</div></div>`
}
function mockRow(r,i){return `<div class="mock-row"><span><b>${esc(r.name)}</b></span><span>${r.q||'—'}</span><span>${r.v||'—'}</span><span>${r.a??'—'}</span><span>${r.date?fmtDate(r.date):'—'}</span><button class="pill-btn remove-mock" data-i="${i}">×</button></div>`}

function renderCoverage(){
 const groups=[
  {k:'Quant · Arithmetic',src:'ETS Quantitative Reasoning',items:[
   ['Integer properties: divisibility, factors, primes, remainders, odd/even',['q-integers','q-factors','q-remainders','q-integer-constraints']],
   ['Arithmetic operations, exponents and roots',['q-fractions','q-exponents']],
   ['Estimation, percent, ratio, rate, absolute value, number line, decimals, sequences',['q-estimation','q-percent-growth','q-ratio','q-rates','q-work-combined','q-absolute','q-number-line','q-fractions','q-sequences']],
   ['Units, scaling, mixtures and applied arithmetic',['q-units','q-scaling','q-mixtures']]
  ]},
  {k:'Quant · Algebra',src:'ETS Quantitative Reasoning',items:[
   ['Expressions, factoring and simplifying',['q-expressions']],
   ['Relations, functions, equations and inequalities',['q-functions','q-linear','q-inequalities']],
   ['Linear/quadratic equations and inequalities; simultaneous systems',['q-linear','q-quadratics','q-systems']],
   ['Word-problem modeling',['q-translation']],
   ['Coordinate geometry, graphs, slopes and intercepts',['q-coordinate']]
  ]},
  {k:'Quant · Geometry',src:'ETS Quantitative Reasoning',items:[
   ['Parallel/perpendicular lines and angle relationships',['q-angles']],
   ['Triangles including isosceles, equilateral, 30-60-90 and Pythagorean theorem',['q-triangles','q-special-triangles']],
   ['Quadrilaterals and polygons',['q-polygons']],
   ['Circles',['q-circles']],
   ['Congruence, similarity and scale',['q-similarity','q-scaling']],
   ['3D figures, area, perimeter and volume',['q-area','q-solids']]
  ]},
  {k:'Quant · Data analysis',src:'ETS Quantitative Reasoning',items:[
   ['Mean, median, mode, range, standard deviation, IQR, quartiles, percentiles',['q-mean','q-median','q-quartiles','q-sd']],
   ['Tables, line/bar/circle graphs, boxplots, scatterplots, frequency distributions',['q-graphs','q-scatter','q-frequency','q-di-hard']],
   ['Compound/independent probability and conditional probability',['q-probability','q-conditional']],
   ['Random variables and probability distributions including normal distributions',['q-distributions','q-normal']],
   ['Counting, permutations, combinations and Venn diagrams',['q-counting','q-sets']]
  ]},
  {k:'Quant · Interface & conventions',src:'ETS Quantitative Reasoning',items:[
   ['Quantitative Comparison',['q-qc','q-qc-adversarial']],
   ['Select-one, select-one-or-more, Numeric Entry and Data Interpretation sets',['q-formats','q-di-hard']],
   ['Mathematical conventions and what figures may/may not be assumed to scale',['q-conventions']],
   ['Calculator discipline and section execution',['s-calculator','s-timing']]
  ]},
  {k:'Verbal · Reading Comprehension',src:'ETS Verbal Reasoning',items:[
   ['Meaning of words, sentences, paragraphs and whole passages',['v-rc-map','v-syntax-spine','v-reference']],
   ['Major vs minor points; summary; main idea and primary purpose',['v-main','v-rc-map']],
   ['Conclusions and inference from incomplete information',['v-inference','v-rc-inference-hard','v-scope']],
   ['Text structure and relationships among parts',['v-rhetorical-role','v-rc-map','v-connectors']],
   ['Author assumptions and perspective',['v-assumption','v-tone']],
   ['Analyze text, strengths/weaknesses, alternative explanations',['v-cr','v-strengthen-weaken','v-paradox']],
   ['Single-answer, multiple-answer and select-in-passage formats',['v-rc-formats']],
   ['Short/long passage control and domain variety',['v-longrc','v-science-passages','v-humanities-passages','v-social-passages']],
   ['Graduate-level sustained reading practice',['v-reading-lab']]
  ]},
  {k:'Verbal · Text Completion',src:'ETS Verbal Reasoning',items:[
   ['Sentence logic and clue words',['v-logic','v-connectors','v-scope']],
   ['One-blank Text Completion',['v-tc','v-tc-one']],
   ['Two- and three-blank Text Completion',['v-tc','v-tc-multi']],
   ['Grammar/style coherence and dense sentence parsing',['v-syntax-spine','v-reference','v-connotation']]
  ]},
  {k:'Verbal · Sentence Equivalence & vocabulary',src:'ETS Verbal Reasoning',items:[
   ['Sentence Equivalence logic and equivalent completed meanings',['v-se','v-se-pairing']],
   ['Word/concept relationships and synonym networks',['v-vocab-strategy','v-connotation']],
   ['Roots and morphological inference',['v-morphology']],
   ['Secondary meanings / polysemy',['v-polysemy']],
   ['Answer-choice trap analysis',['v-elimination','v-trap-taxonomy']]
  ]},
  {k:'Analytical Writing',src:'ETS Analytical Writing',items:[
   ['Current Analyze an Issue format and instruction sets',['a-format','a-task']],
   ['Clear position, insightful analysis, reasons and persuasive examples',['a-reasoning','a-example-depth','a-nuance']],
   ['Organization and 6.0 architecture',['a-structure']],
   ['Counterargument, concession and qualification',['a-counter','a-nuance']],
   ['Precise vocabulary, sentence variety, grammar and usage',['a-style','a-revision']],
   ['30-minute execution, deliberate practice and idea generation',['a-timing','a-practice','a-idea-bank']],
   ['ETS score-level criteria',['a-rubric']]
  ]},
  {k:'Test execution',src:'ETS test structure & strategy pages',items:[
   ['Current test structure and scoring',['s-structure']],
   ['Section-level adaptation',['s-adaptive-deep']],
   ['Timing, triage, mark/review and answer changes',['s-timing','s-review']],
   ['Scratchwork and calculator use',['s-scratch','s-calculator']],
   ['Mock-test analysis and official calibration',['s-mocks','s-final-calibration']],
   ['170-level reliability and mastery gates',['s-error-budget','s-masterygates']],
   ['Test day and final week',['s-testday']]
  ]}
 ];
 const total=groups.reduce((n,g)=>n+g.items.length,0),mapped=groups.reduce((n,g)=>n+g.items.filter(x=>x[1].every(id=>topicMap[id])).length,0);
 return `<div class="page"><header class="route-header"><div><span class="eyebrow">Official-scope audit · Master Edition</span><h1>Master Syllabus</h1><p>This page exists for one reason: you should never have to wonder whether a GRE skill vanished between broad chapter titles. It maps the current ETS content/skill descriptions to specific GRE Atlas chapters. A green map means the skill has an explicit home; it does <em>not</em> mean you personally have mastered it yet.</p></div><div class="route-stamp"><div><b>${mapped}/${total}</b><small>scope lines<br>mapped</small></div></div></header>
 <div class="callout"><b>Important boundary</b>ETS says Quant is high-school mathematics/statistics at roughly no higher than a second algebra course. Trigonometry, calculus, other higher mathematics, inferential statistics, and formal geometric proof construction are not tested. GRE Atlas therefore does not waste your study time pretending those are hidden requirements.</div>
 <div class="coverage-grid">${groups.map(g=>`<section class="card coverage-card"><div class="coverage-head"><div><span class="eyebrow">${g.src}</span><h3>${g.k}</h3></div><span class="badge green">${g.items.length} mapped</span></div><div class="coverage-list">${g.items.map(([label,ids])=>`<div class="coverage-row"><span class="coverage-check">✓</span><div><strong>${label}</strong><div class="coverage-links">${ids.map(id=>`<button class="text-link" data-route="${id}">${esc(topicMap[id]?.title||id)}</button>`).join(' · ')}</div></div></div>`).join('')}</div></section>`).join('')}</div>
 <div class="section-title"><div><span class="eyebrow">What “complete” means here</span><h2>Coverage ≠ mastery</h2></div></div><div class="grid grid-3"><div class="card"><h3>1 · Learn</h3><p>Understand the concept, strategy, edge cases, and why common shortcuts work.</p></div><div class="card"><h3>2 · Retrieve</h3><p>Explain it without notes and solve representative items without being cued.</p></div><div class="card"><h3>3 · Transfer</h3><p>Recognize it inside mixed, timed, unfamiliar-looking GRE questions.</p></div></div>
 <div class="source-note" style="margin-top:20px">Audit basis: current ETS GRE General Test content pages for Quantitative Reasoning, Verbal Reasoning, Analytical Writing, question formats, mathematical conventions, and test strategy. Use Official Resources for the source-of-truth links and re-check ETS before test day.</div></div>`;
}

function renderFormula(){return `<div class="page"><header class="route-header"><div><span class="eyebrow">Quant reference</span><h1>Formula Atlas</h1><p>Memorize relationships, not isolated symbols. The GRE rewards knowing when a formula applies, how quantities scale, and what assumptions are legal.</p></div><div class="route-stamp"><div><b>ƒ</b><small>rapid<br>reference</small></div></div></header><div class="formula-grid">${FORMULAS.map(f=>`<section class="formula-card"><h3>${f[0]}</h3><ul>${f[1].map(x=>`<li><span class="formula">${x}</span></li>`).join('')}</ul></section>`).join('')}</div><div class="callout"><b>Do not memorize blindly</b>If a formula is unfamiliar, open its curriculum chapter and derive it from an example. Retrieval becomes much more durable when the symbols have a mental model.</div></div>`}

function renderResources(){
 const cards=[
  ['Test structure','Current section counts, timing, order, and adaptive design',OFFICIAL.structure],['General content','Official overview of what the GRE measures',OFFICIAL.content],['Quantitative Reasoning','Official content areas, question types, conventions, strategies, and calculator guidance',OFFICIAL.quant],['Verbal Reasoning','Official Reading Comprehension, Text Completion, and Sentence Equivalence overview',OFFICIAL.verbal],['Analytical Writing','Current Analyze an Issue task overview and preparation guidance',OFFICIAL.writing],['Published Issue topic pool','ETS publishes the entire pool from which your test-day Issue topic is selected',OFFICIAL.issue],['Writing scoring guide','ETS score-level criteria, including what distinguishes a 6 response',OFFICIAL.awaScore],['POWERPREP','Official GRE simulations: preview, free online practice tests, and paid PLUS tests',OFFICIAL.powerprep],['Strategies & tips','Mark/review, timing, answering every question, and test experience',OFFICIAL.tips],['Khan Academy mapping','ETS page linking GRE Math Review topics to Khan Academy instruction',OFFICIAL.khan],['Official preparation hub','POWERPREP, sample questions, Math Review, and official preparation materials',OFFICIAL.prep]
 ];
 return `<div class="page"><header class="route-header"><div><span class="eyebrow">Source of truth</span><h1>Official resources</h1><p>GRE Atlas teaches and organizes; ETS defines the exam. Use these links for current policy, official sample material, POWERPREP, and test-day details.</p></div><div class="route-stamp"><div><b>ETS</b><small>verify<br>here</small></div></div></header><div class="grid grid-3">${cards.map(c=>`<div class="card resource-card"><span class="badge green">Official ETS</span><h3>${c[0]}</h3><p>${c[1]}</p><div class="meta"><a href="${c[2]}" target="_blank" rel="noopener">Open official page ↗</a></div></div>`).join('')}</div>
 <div class="section-title"><div><span class="eyebrow">Current format snapshot</span><h2>What this site is built for</h2></div></div><div class="grid grid-3"><div class="card"><h3>Analytical Writing</h3><p>1 section · one Analyze an Issue task · 30 minutes · always first.</p></div><div class="card"><h3>Verbal</h3><p>2 sections · 12 questions in 18 minutes, then 15 in 23 minutes · section-level adaptive.</p></div><div class="card"><h3>Quant</h3><p>2 sections · 12 questions in 21 minutes, then 15 in 26 minutes · section-level adaptive · on-screen calculator.</p></div></div>
 <div class="source-note" style="margin-top:20px">Test rules can change. Before scheduling and again shortly before test day, re-check ETS for registration, ID, at-home/test-center procedures, and any format updates.</div>
 <div class="section-title"><div><span class="eyebrow">Vocabulary methodology</span><h2>Why the vocabulary system is layered</h2></div></div><div class="grid grid-2"><div class="card resource-card"><span class="badge blue">2026 prep research</span><h3>High-frequency first</h3><p>Magoosh’s 2026 review recommends a focused ~1,000-word high-frequency core rather than brute-forcing sprawling 3,500+ lists. GRE Atlas follows that principle, then adds a Deep Vault as optional insurance.</p><div class="meta"><a href="https://magoosh.com/gre/best-and-worst-gre-word-lists/" target="_blank" rel="noopener">Read methodology ↗</a></div></div><div class="card resource-card"><span class="badge">Public data</span><h3>Word coverage + open definitions</h3><p>The supplemental study words and Deep Vault are seeded from a public cross-list GRE collection. Definitions for supplemental words are fetched on demand from Open Dictionary’s Wiktionary-derived JSON rather than copying commercial flashcard definitions.</p><div class="meta"><a href="https://github.com/Xatta-Trone/gre-words-collection" target="_blank" rel="noopener">Word-list collection ↗</a> &nbsp; <a href="https://github.com/mhollingshead/open-dictionary" target="_blank" rel="noopener">Open Dictionary ↗</a></div></div></div></div>`
}

function renderSettings(){
 const p=overallProgress();return `<div class="page"><header class="route-header"><div><span class="eyebrow">Local workspace</span><h1>Settings</h1><p>GRE Atlas saves progress in your browser’s localStorage. Exporting a backup prevents accidental loss if browser data is cleared.</p></div></header><div class="grid grid-2"><section class="card"><span class="eyebrow">Appearance</span><h3>Reading mode</h3><div class="split-note"><strong>Night mode</strong><div><button id="settingNight" class="pill-btn">${state.settings?.night?'Turn off':'Turn on'}</button></div></div><div class="split-note"><strong>Progress</strong><div>${p.done} of ${p.total} topics mastered · ${state.xp} XP</div></div></section><section class="card"><span class="eyebrow">Data</span><h3>Backup / reset</h3><p>Export a JSON backup of notes, progress, vocabulary scheduling, errors, mocks, and settings.</p><div class="pill-row"><button id="exportData" class="pill-btn">Export backup</button><label class="pill-btn" style="cursor:pointer">Import backup<input id="importData" type="file" accept="application/json" hidden></label><button id="resetAll" class="pill-btn" style="color:var(--red)">Reset all local data</button></div></section></div><div class="section-title"><div><span class="eyebrow">Design principle</span><h2>Why this is route-based</h2></div></div><div class="card"><p>A giant scrolling notes page is hostile to long-term study. Every chapter here has its own route, completion state, note field, and previous/next navigation. The dashboard remembers your next incomplete topic, while tools such as Vocabulary Lab and the Error Log remain persistent across sessions.</p></div></div>`
}
function renderNotFound(r){return `<div class="page empty-state"><h3>That page does not exist.</h3><p>${esc(r)}</p><button class="pill-btn" data-route="dashboard">Back to dashboard</button></div>`}

function bindPage(route){
  if($('#completeTopic')) $('#completeTopic').onclick=()=>{const id=$('#completeTopic').dataset.topic;if(state.completed[id]){delete state.completed[id];state.xp=Math.max(0,(state.xp||0)-25);toast('Topic moved back to in progress.')}else{state.completed[id]=Date.now();state.xp=(state.xp||0)+25;logActivity('mastered',topicMap[id]?.title||id);toast('+25 XP · topic mastered');}saveState();render()};
  if($('#topicNote')) $('#topicNote').addEventListener('input',e=>{state.notes[e.target.dataset.topic]=e.target.value;saveState()});
  if($('#focusLesson')) $('#focusLesson').onclick=openFocus;
  if($('#focusToday')) $('#focusToday').onclick=openFocus;
  $$('.quiz-card').forEach(card=>bindQuiz(card));
  if(route==='roadmap')bindRoadmap();
  if(route==='diagnostic')bindDiagnostic();
  if(route==='drill')bindDrill();
  if(route.startsWith('vocab'))bindVocab(route);
  if(route==='essay')bindEssay();
  if(route==='errors')bindErrors();
  if(route==='mocks')bindMocks();
  if(route==='settings')bindSettings();
}
function bindQuiz(card){
  let answer;try{answer=JSON.parse(card.dataset.answer)}catch{answer=+card.dataset.answer}
  const choices=$$('.choice',card);let picked=[];const tid=card.closest('[data-topic-id]')?.dataset.topicId||card.dataset.quiz?.split('-')[0];
  choices.forEach(c=>c.onclick=()=>{
    if(card.dataset.done)return;
    const i=+c.dataset.i;
    if(Array.isArray(answer)){
      c.classList.toggle('selected');
      if(c.classList.contains('selected'))picked.push(i);else picked=picked.filter(x=>x!==i);
      if(picked.length===answer.length){
        const ok=[...picked].sort().join(',')===[...answer].sort().join(',');
        choices.forEach(x=>{const j=+x.dataset.i;if(answer.includes(j))x.classList.add('correct');else if(picked.includes(j))x.classList.add('wrong')});
        $('.explanation',card).classList.add('show');card.dataset.done='1';recordQuizResult(tid,ok);toast(ok?'+5 XP · correct':'Checkpoint reviewed');
      }
    } else {
      const ok=i===answer;c.classList.add(ok?'correct':'wrong');choices[answer]?.classList.add('correct');$('.explanation',card).classList.add('show');card.dataset.done='1';recordQuizResult(tid,ok);toast(ok?'+5 XP · correct':'Checkpoint reviewed');
    }
  })
}
function recordQuizResult(tid,ok){
  state.xp=(state.xp||0)+(ok?5:1);
  state.quizLog.push({t:tid,ok,d:todayISO()});
  if(state.quizLog.length>400)state.quizLog=state.quizLog.slice(-300);
  markStudyDay();saveState();
}
function bindRoadmap(){
  $('#savePlan').onclick=()=>{const v=$('#examDateInput').value;state.examDate=v&&parseLocalDate(v)?v:'';state.hoursWeek=+$('#hoursWeekInput').value||10;state.targetQ=Math.min(170,Math.max(130,+$('#targetQ').value||170));state.targetV=Math.min(170,Math.max(130,+$('#targetV').value||170));state.targetAWA=Math.min(6,Math.max(0,+$('#targetA').value||6));saveState();toast('Roadmap saved');render()}
}
function bindDiagnostic(){
  if($('#resetDiag')){$('#resetDiag').onclick=()=>{state.diag=null;diagIndex=0;diagAnswers=[];diagPicks=new Set();saveState();render()};return}
  $$('.diag-option').forEach(b=>b.onclick=()=>{
    const d=DIAGNOSTIC[diagIndex],pick=+b.dataset.diag;let ok;
    if(Array.isArray(d.a)){
      b.classList.toggle('selected');
      diagPicks.has(pick)?diagPicks.delete(pick):diagPicks.add(pick);
      if(diagPicks.size<d.a.length)return;
      ok=[...diagPicks].sort().join(',')===[...d.a].sort().join(',');
      diagAnswers.push({i:diagIndex,ok,skill:d.skill,m:d.m});diagPicks=new Set();
    } else { ok=pick===d.a; diagAnswers.push({i:diagIndex,ok,skill:d.skill,m:d.m}); }
    if(diagIndex<DIAGNOSTIC.length-1){diagIndex++;render()}
    else{const q=diagAnswers.filter(x=>x.m==='quant'&&x.ok).length,v=diagAnswers.filter(x=>x.m==='verbal'&&x.ok).length,total=q+v;const weak=diagAnswers.filter(x=>!x.ok).map(x=>x.skill);state.diag={q,v,total,weak:[...new Set(weak)].slice(0,8),date:Date.now()};state.xp=(state.xp||0)+20;markStudyDay();saveState();render()}
  })
}
function bindDrill(){
  $('#drillModule').onchange=e=>{drillState.module=e.target.value;drillState.kind='mixed';newDrillQuestion();render()};
  $('#drillKind').onchange=e=>{drillState.kind=e.target.value;newDrillQuestion();render()};
  $('#newDrill').onclick=()=>{newDrillQuestion();render()};
  const q=drillState.q;
  if(q.choices){let picks=[];$$('.drill-choice').forEach(b=>b.onclick=()=>{
    if(drillState.answered)return;const i=+b.dataset.i;
    if(Array.isArray(q.answer)){b.classList.toggle('selected');picks=b.classList.contains('selected')?[...picks,i]:picks.filter(x=>x!==i);if(picks.length<q.answer.length)return;const ok=[...picks].sort().join(',')===[...q.answer].sort().join(',');finishDrill(ok,q.explain,picks,q.answer);}
    else finishDrill(i===q.answer,q.explain,[i],[q.answer]);
  })}
  if($('#checkNumeric'))$('#checkNumeric').onclick=()=>{if(drillState.answered)return;const val=parseFloat($('#drillNumeric').value);const tol=q.tolerance??1e-9;finishDrill(Number.isFinite(val)&&Math.abs(val-q.answer)<=tol,q.explain,null,null)}
}
function finishDrill(ok,explain,picks,answers){
  drillState.answered=true;drillState.total++;if(ok)drillState.correct++;
  state.drillStats=state.drillStats||{attempts:0,correct:0,days:{}};
  state.drillStats.attempts++;if(ok)state.drillStats.correct++;
  const t=todayISO();state.drillStats.days[t]=state.drillStats.days[t]||{a:0,c:0};
  state.drillStats.days[t].a++;if(ok)state.drillStats.days[t].c++;
  if(drillState.total===1)markStudyDay();
  state.xp=(state.xp||0)+(ok?5:1);saveState();
  if(picks){$$('.drill-choice').forEach(b=>{const i=+b.dataset.i;if(answers&&answers.includes(i))b.classList.add('correct');else if(picks.includes(i))b.classList.add('wrong')})}
  else if(!ok&&answers){$$('.drill-choice').forEach(b=>{if(answers.includes(+b.dataset.i))b.classList.add('correct')})}
  const box=$('#drillFeedback');box.className=`feedback ${ok?'good':'bad'}`;box.innerHTML=`<b>${ok?'Correct.':'Not quite.'}</b> <span style="font-family:var(--mono);font-size:10px;color:var(--muted)">Session ${drillState.correct}/${drillState.total}${(state.drillStats.attempts-drillState.total)?` · all-time ${state.drillStats.correct}/${state.drillStats.attempts}`:''}</span><br>${explain}<div style="margin-top:9px"><button id="nextDrill" class="pill-btn">Next question →</button>${!ok?'<button id="logDrillError" class="pill-btn">Log this miss</button>':''}</div>`;$('#nextDrill').onclick=()=>{newDrillQuestion();render()};if($('#logDrillError'))$('#logDrillError').onclick=()=>{state.errors.unshift({text:`Drill miss: ${drillState.q.label} — ${drillState.q.text}`.slice(0,240),type:'Reasoning gap',module:drillState.module==='quant'?'Quant':'Verbal',date:Date.now(),resolved:false,reviews:[]});saveState();toast('Added to Error Log')}}

function bindVocab(route='vocab'){
  if($('#retryVocabSources'))$('#retryVocabSources').onclick=()=>loadRemoteVocab(true);
  if($('#vocabDailyNew'))$('#vocabDailyNew').onchange=e=>{state.settings=state.settings||{};state.settings.vocabDailyNew=clamp(Number(e.target.value)||25,5,100);saveState();render()};
  if($('#flashcard'))$('#flashcard').onclick=async()=>{
    vocabFlipped=!vocabFlipped;const word=currentVocabWord()?.word;render();
    if(vocabFlipped&&word){const e=findStudyEntry(word),info=e?entryDefinition(e):null;if(e&&!info?.definition){await lookupDictionary(word);if(currentRoute()==='vocab'&&vocabFlipped){render();updateChrome()}}}
  };
  if(!document.__vocabHotkeysClean){document.__vocabHotkeysClean=true;document.addEventListener('keydown',e=>{
    if(currentRoute()==='vocab'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){
      if(e.key===' '&&vocabFlipped===false){e.preventDefault();$('#flashcard')?.click()}
      const map={'1':'again','2':'hard','3':'good','4':'easy'};
      if(vocabFlipped&&map[e.key]){e.preventDefault();rateVocab(map[e.key])}
    }
  })}
  $$('[data-vrate]').forEach(b=>b.onclick=()=>rateVocab(b.dataset.vrate));
  if($('#vocabSearch'))$('#vocabSearch').oninput=e=>{$('#wordList').innerHTML=renderWordList(e.target.value);bindWordLookups()};
  bindWordLookups();
  if($('#addWord'))$('#addWord').onclick=()=>{
    const w=$('#customWord').value.trim(),d=$('#customDef').value.trim(),syn=$('#customSyn').value.trim();
    if(!w)return toast('Add a word first');
    if(!addPersonalWord(w,d,syn))return toast('That word is already in the study deck');
    toast('Added to Personal SRS');render();
  };
  $$('.word-chip[data-vocab-search]').forEach(b=>b.onclick=()=>{routeTo('vocab-browse');setTimeout(()=>{const i=$('#vocabSearch');if(i){i.value=b.dataset.vocabSearch;i.dispatchEvent(new Event('input'))}},80)});
  if($('#loadVault'))$('#loadVault').onclick=()=>loadDeepVault(true);
  if($('#vaultSearch'))$('#vaultSearch').oninput=e=>{$('#vaultResults').innerHTML=renderVaultResults(e.target.value);bindVaultAdds()};
  bindVaultAdds();
}
function bindWordLookups(){$$('.lookup-word').forEach(b=>b.onclick=async e=>{e.stopPropagation();b.disabled=true;b.textContent='…';await lookupDictionary(b.dataset.word);if(currentRoute()==='vocab-browse'){const i=$('#vocabSearch'),term=i?.value||'';if($('#wordList'))$('#wordList').innerHTML=renderWordList(term);bindWordLookups()}})}
function bindVaultAdds(){$$('.add-vault-word').forEach(b=>b.onclick=async()=>{const word=b.dataset.word;if(addPersonalWord(word)){toast(`${word} added to Personal SRS`);await lookupDictionary(word);if(currentRoute()==='vocab-vault'&&$('#vaultSearch')){$('#vaultResults').innerHTML=renderVaultResults($('#vaultSearch').value);bindVaultAdds()}}else toast('That word is already in your study deck')})}
function bindEssay(){
  $('#essayEditor').oninput=e=>{currentEssayRec().text=e.target.value;markStudyDay();saveState();const n=e.target.value.trim()?e.target.value.trim().split(/\s+/).length:0;$('#essayWords').textContent=n+' words'};
  $('#newPrompt').onclick=()=>{const cur=currentEssayRec(),words=(cur.text||'').trim()?(cur.text||'').trim().split(/\s+/).length:0;if(words>10&&!confirm(`Switch prompts? Your current draft (${words} words) stays saved to prompt ${state.essayPrompt%ESSAY_PROMPTS.length+1} and you can come back to it.`)){return}
    clearInterval(essayTimer);essayTimer=null;essaySeconds=1800;state.essayPrompt=(state.essayPrompt+1)%ESSAY_PROMPTS.length;saveState();render()};
  $('#outlinePrompt').onclick=()=>{$('#outlineBox').innerHTML=`<div class="callout" style="margin-bottom:0"><b>4-minute planning scaffold</b><strong>Thesis:</strong> I generally agree/disagree because ___, though ___ is an important exception.<br><br><strong>Body 1:</strong> strongest reason → mechanism → concrete example.<br><strong>Body 2:</strong> distinct reason → mechanism → concrete example.<br><strong>Body 3:</strong> strongest objection/limitation → concession → response or condition.<br><strong>Conclusion:</strong> synthesize the principle and boundary.</div>`};
  $('#essayStart').onclick=()=>{
    if(essayTimer){clearInterval(essayTimer);essayTimer=null;toast('Essay timer paused')}
    else{essayTimer=setInterval(()=>{
      if(currentRoute()!=='essay'){clearInterval(essayTimer);essayTimer=null;return}
      essaySeconds=Math.max(0,essaySeconds-1);const el=$('#essayTimer');if(el)el.textContent=fmtTime(essaySeconds);
      if(essaySeconds===0){clearInterval(essayTimer);essayTimer=null;toast('30 minutes — stop writing and revise what you can see.')}
    },1000)}
  };
  $('#essayReset').onclick=()=>{clearInterval(essayTimer);essayTimer=null;essaySeconds=1800;$('#essayTimer').textContent=fmtTime(essaySeconds)}
}
function bindErrors(){
 $('#addError').onclick=()=>{const text=$('#errorText').value.trim();if(!text)return toast('Describe the error first');state.errors.unshift({text,type:$('#errorType').value,module:$('#errorModule').value,date:Date.now(),resolved:false,reviews:[]});markStudyDay();saveState();toast('Error logged');render()};
 $$('.remove-error').forEach(b=>b.onclick=()=>{state.errors.splice(+b.dataset.i,1);saveState();render()})
 $$('.toggle-error').forEach(b=>b.onclick=()=>{const r=state.errors[+b.dataset.i];r.resolved=!r.resolved;saveState();render()})
 $$('.review-error').forEach(b=>b.onclick=()=>{const r=state.errors[+b.dataset.i];r.reviews=r.reviews||[];r.reviews.push(todayISO());markStudyDay();saveState();toast('Re-solve logged — revisit again in 3–7 days');render()})
}
function bindMocks(){
 $('#addMock').onclick=()=>{const name=$('#mockName').value.trim();if(!name)return toast('Name the mock test');const qv=$('#mockQ').value,vv=$('#mockV').value,av=$('#mockA').value;const q=qv===''?null:+qv,v=vv===''?null:+vv,a=av===''?null:+av;state.mocks.push({name,q,v,a,date:$('#mockDate').value||todayISO()});saveState();toast('Mock recorded');render()};
 $$('.remove-mock').forEach(b=>b.onclick=()=>{state.mocks.splice(+b.dataset.i,1);saveState();render()})
}
function bindSettings(){
 $('#settingNight').onclick=()=>{state.settings=state.settings||{};state.settings.night=!state.settings.night;saveState();render()};
 $('#exportData').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`gre-atlas-backup-${todayISO()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
 $('#importData').onchange=e=>{const f=e.target.files[0];if(!f)return;if(!confirm('Import this backup? It replaces all progress currently stored in this browser.'))return e.target.value='';const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(typeof x!=='object'||Array.isArray(x)||!x||typeof (x.completed??{})!=='object')throw 0;
   const merged={...defaultState,...migrateState(x)};
   merged.settings={...defaultState.settings,...(x.settings&&typeof x.settings==='object'?x.settings:{})};
   for(const k of ['completed','notes','vocab','vocabDefs','essays','drillStats','diag'])if(k in x&&x[k]==null)delete merged[k];
   if(!Array.isArray(merged.errors))merged.errors=[];if(!Array.isArray(merged.mocks))merged.mocks=[];if(!Array.isArray(merged.customWords))merged.customWords=[];if(!Array.isArray(merged.activity))merged.activity=[];if(!Array.isArray(merged.quizLog))merged.quizLog=[];
   state=merged;invalidateStudyEntries();saveState();updateChrome();toast('Backup imported');render()}catch{toast('That file is not a valid GRE Atlas backup')}};r.readAsText(f)};
 $('#resetAll').onclick=()=>{if(confirm('Reset ALL GRE Atlas progress, notes, vocabulary scheduling, errors, and mocks in this browser?')){safeStorage.del();state=migrateState({...defaultState});invalidateStudyEntries();saveState();routeTo('dashboard');render()}}
}

let focusSeconds=1500,focusTimer=null,focusWasOpen=false;
function openFocus(){focusWasOpen=true;lastFocusEl=document.activeElement;focusSeconds=focusSeconds||1500;$('#focusModal').hidden=false;$('#focusTime').textContent=fmtTime(focusSeconds);setTimeout(()=>$('#focusStart')?.focus(),20)}
function closeFocus(){if(!focusWasOpen)return;if($('#focusModal'))$('#focusModal').hidden=true;focusWasOpen=false;lastFocusEl?.focus?.()}
function trapModalTab(e,modalSel){if(e.key!=='Tab'||$(modalSel).hidden)return false;const f=$$('button,input,[tabindex="0"]',$(modalSel)).filter(x=>!x.disabled&&x.offsetParent!==null);if(!f.length)return false;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();return true}if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();return true}return false}
function initFocus(){
 $('#focusBtn').onclick=openFocus;$$('[data-close-focus]').forEach(x=>x.onclick=closeFocus);$('#focusClose').onclick=closeFocus;
 document.addEventListener('keydown',e=>{trapModalTab(e,'#focusModal')||trapModalTab(e,'#searchModal');
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}
   if((e.key==='Enter'||e.key===' ')&&document.activeElement===$('#flashcard')){e.preventDefault();$('#flashcard').click()}
   if(e.key==='Escape'){closeSearch();closeFocus()}});
 $('#focusStart').onclick=()=>{if(focusTimer){clearInterval(focusTimer);focusTimer=null;$('#focusStart').textContent='Resume'}else{$('#focusStart').textContent='Pause';focusTimer=setInterval(()=>{focusSeconds=Math.max(0,focusSeconds-1);const el=$('#focusTime');if(el)el.textContent=fmtTime(focusSeconds);if(focusSeconds===0){clearInterval(focusTimer);focusTimer=null;const btn=$('#focusStart');if(btn)btn.textContent='Start';toast('Focus block complete · +10 XP');state.xp=(state.xp||0)+10;markStudyDay();saveState()}},1000)}};
 $('#focusReset').onclick=()=>{clearInterval(focusTimer);focusTimer=null;focusSeconds=1500;$('#focusTime').textContent=fmtTime(focusSeconds);$('#focusStart').textContent='Start'};
 $$('.focus-presets button').forEach(b=>b.onclick=()=>{clearInterval(focusTimer);focusTimer=null;focusSeconds=+b.dataset.minutes*60;$('#focusTime').textContent=fmtTime(focusSeconds);$('#focusStart').textContent='Start'})
}

function buildSearchIndex(){return [
  ...TOPICS.map(t=>({title:t.title,sub:`${MODULES[t.module].name} · ${t.summary}`,route:t.id,terms:`${t.title} ${t.summary} ${t.sections.map(s=>s.join(' ')).join(' ')}`})),
  {title:'Vocabulary Mastery System',sub:'SRS, high-frequency lists, semantic groups, roots, secondary meanings',route:'vocab',terms:'vocabulary words synonyms SRS flashcards Magoosh GregMAT roots polysemy semantic groups '+VOCAB.map(normalizeVocabEntry).map(e=>e.word).join(' ')},
  ...VOCAB_GROUPS.map((g,i)=>({title:g[0],sub:`Semantic group · ${(g[1]||'').split(' · ').slice(0,4).join(', ')}`,route:'vocab-groups',terms:`semantic group synonyms ${g[1]} ${g[2]}`})),
  {title:'Secondary Meaning Lab',sub:'Familiar words with trap GRE meanings',route:'vocab-traps',terms:'secondary meanings polysemy traps '+TRAP_MEANINGS.map(x=>x[0]).join(' ')},
  {title:'Root & Affix Lab',sub:'Morphology as a backup strategy',route:'vocab-roots',terms:'roots prefixes affixes morphology '+VOCAB_ROOTS.map(x=>x[0]).join(' ')},
  {title:'Deep Vocabulary Vault',sub:'9,500+ word searchable reference collection',route:'vocab-vault',terms:'deep vault reference word list search'},
  {title:'Master Syllabus',sub:'Official ETS coverage audit mapped to GRE Atlas chapters',route:'coverage',terms:'coverage syllabus audit ETS quant verbal writing all topics'},
  {title:'Formula Atlas',sub:'Quant formulas and relationships',route:'formula',terms:'formula geometry algebra probability statistics '+FORMULAS.map(f=>f[1].join(' ')).join(' ')},
  {title:'Error Log',sub:'Classify and repair misses',route:'errors',terms:'wrong answers mistakes review'},
  {title:'Mock Tracker',sub:'Record POWERPREP and simulation scores',route:'mocks',terms:'mock practice test scores powerprep simulation trend'},
  {title:'Diagnostic',sub:'Fast baseline across Quant and Verbal',route:'diagnostic',terms:'diagnostic baseline assessment placement'},
  {title:'Today',sub:'The daily operating plan',route:'today',terms:'today daily plan agenda routine'},
  {title:'Study Roadmap',sub:'Five-phase plan to a 340 + 6.0 target',route:'roadmap',terms:'roadmap plan phases timeline schedule exam date'},
  {title:'Settings & Backup',sub:'Night mode, export, import, reset',route:'settings',terms:'settings backup export import night mode reset'},
  {title:'Essay Studio',sub:'30-minute Analyze an Issue practice',route:'essay',terms:'writing analytical issue essay AWA'},
  {title:'Official Resources',sub:'ETS links and current format',route:'resources',terms:'ETS powerprep official structure scoring'}
 ]}
const SEARCH_INDEX=buildSearchIndex();
let lastFocusEl=null;
function openSearch(){lastFocusEl=document.activeElement;const m=$('#searchModal');m.hidden=false;const i=$('#globalSearch');i.value='';renderSearch('');setTimeout(()=>i.focus(),20)}
function closeSearch(){if($('#searchModal').hidden)return;$('#searchModal').hidden=true;lastFocusEl?.focus?.()}
function renderSearch(term){term=term.trim().toLowerCase();const scored=SEARCH_INDEX.map(x=>{const hay=(x.title+' '+x.sub+' '+x.terms).toLowerCase();let score=term?term.split(/\s+/).reduce((s,w)=>s+(hay.includes(w)?1:0),0):1;if(term&&x.title.toLowerCase().includes(term))score+=3;return {...x,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,12);$('#searchResults').innerHTML=scored.map((x,i)=>`<div class="search-result" data-search-route="${x.route}" tabindex="0" role="option" data-idx="${i}"><div><strong>${esc(x.title)}</strong><small>${esc(x.sub)}</small></div><span>↵</span></div>`).join('')||'<div class="empty-state">No matching chapter.</div>';$$('[data-search-route]').forEach(x=>{x.onclick=()=>{closeSearch();routeTo(x.dataset.searchRoute)};x.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();closeSearch();routeTo(x.dataset.searchRoute)}}})}
function initSearch(){
 $('#searchTrigger').onclick=openSearch;$('#searchTriggerMobile').onclick=openSearch;$('#globalSearch').oninput=e=>renderSearch(e.target.value);$$('[data-close-modal]').forEach(x=>x.onclick=closeSearch);
}
function initChrome(){
 // Single delegated handler covers EVERY [data-route] element — static chrome and
 // dynamically rendered pages alike — so navigation can never be lost to re-rendering.
 document.addEventListener('click',e=>{
   const routeEl=e.target.closest('[data-route]');
   if(routeEl&&routeEl.dataset.route) routeTo(routeEl.dataset.route);
 });
 $('#themeBtn').onclick=()=>{state.settings=state.settings||{};state.settings.night=!state.settings.night;saveState();updateChrome()};
 const closeSidebar=()=>{$('#sidebar').classList.remove('open');$('#sidebarBackdrop').hidden=true};
 $('#mobileNavBtn').onclick=()=>{const open=$('#sidebar').classList.toggle('open');$('#sidebarBackdrop').hidden=!open};
 $('#sidebarBackdrop').onclick=closeSidebar;
 document.addEventListener('click',e=>{
   const routeEl=e.target.closest('[data-route]');
   if(routeEl){$('#sidebar').classList.remove('open');$('#sidebarBackdrop').hidden=true}
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSidebar()});
}
function markStudyDay(){
  const today=todayISO(),yest=todayISOOf(addDays(new Date(),-1));
  if(state.lastStudy===today)return;
  state.streak=state.lastStudy===yest?(state.streak||1)+1:1;
  state.lastStudy=today;
}
function todayISOOf(d){return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`}
function updateStreak(){markStudyDay();saveState()}

window.addEventListener('hashchange',()=>{ try{ render() }catch(e){ console.error('GRE Atlas: render failed.', e); try{ $('#app').innerHTML=`<div class="page empty-state"><h3>Something went wrong displaying this page.</h3><p>${esc(String(e&&e.message||e))}</p><button class="pill-btn" onclick="routeTo('dashboard')">Back to dashboard</button></div>`; }catch(e2){} } });
document.addEventListener('DOMContentLoaded',()=>{
  // Boot must survive ANY failure — a broken optional feature must never blank the app.
  const step = fn => { try{ fn() }catch(e){ console.error('GRE Atlas: startup step failed, continuing.', e); } };
  step(updateStreak);
  step(()=>{ if(!safeStorage.persistent()) toast('Private-browsing mode: progress lasts only for this session. Export a backup from a normal window to keep it.'); });
  step(initChrome);
  step(initSearch);
  step(initFocus);
  step(()=>{
    const valid = !location.hash || state.lastRoute==='dashboard' || topicMap[state.lastRoute] || ['dashboard','roadmap','diagnostic','today','quant','verbal','writing','strategy','drill','vocab','vocab-browse','vocab-groups','vocab-traps','vocab-roots','vocab-vault','essay','errors','mocks','coverage','formula','resources','settings'].includes(state.lastRoute);
    if(!location.hash) location.hash='#/'+(valid?state.lastRoute:'dashboard');
    else render();
  });
  setTimeout(()=>{ try{ loadRemoteVocab(false) }catch(e){} },180);
});

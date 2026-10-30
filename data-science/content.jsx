/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */

const NB = "https://irvincisneros-png.github.io/Year-10-Science/data-science-2/";

/* ================================================================
   FIGURES
   ================================================================ */

/* 8.1.1 — four checks that make a question investigable */
function InvestigableFlow() {
  const rows = [
    { y: 64, t: "1  Measurable?", s: "Can you measure or count it?" },
    { y: 128, t: "2  Resources?", s: "Equipment, money, materials?" },
    { y: 192, t: "3  Time?", s: "Done in the time you have?" },
    { y: 256, t: "4  Ethical?", s: "Safe, with consent, no harm?" },
  ];
  const box = { fill: "var(--card)", stroke: "var(--ink)", strokeWidth: 1.5 };
  return (
    <Figure num={1} caption="A question is investigable only if it passes all four checks. If it fails one, narrow it or change the method.">
      <svg role="img" aria-label="Flowchart. Start with your question. Check 1: can you measure or count it. Check 2: do you have the equipment, money and materials. Check 3: can it be done in the time you have. Check 4: is it safe, with consent and no harm. Yes to all means investigable. A no at any check means it is not investigable as written: narrow it, change the method or use existing data." width="100%" viewBox="0 0 360 366" style={{ maxWidth: 520, display: "block", margin: "0 auto" }}>
        <defs>
          <marker id="ds-arr1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--ink)" />
          </marker>
        </defs>
        <rect x="10" y="8" width="220" height="36" rx="18" fill="var(--bg-2)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="120" y="31" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">Start: your question</text>
        {rows.map((r, i) => (
          <g key={i}>
            <line x1="120" y1={r.y - 20} x2="120" y2={r.y - 2} stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#ds-arr1)" />
            {i > 0 && <text x="128" y={r.y - 7} fontSize="10.5" fill="var(--ink-muted)">yes</text>}
            <rect x="10" y={r.y} width="220" height="44" rx="8" {...box} />
            <text x="22" y={r.y + 18} fontSize="13" fontWeight="700" fill="var(--ink)">{r.t}</text>
            <text x="22" y={r.y + 35} fontSize="11.5" fill="var(--ink-muted)">{r.s}</text>
            <line x1="230" y1={r.y + 22} x2="256" y2={r.y + 22} stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#ds-arr1)" />
            <text x="235" y={r.y + 14} fontSize="10" fill="var(--ink-muted)">no</text>
          </g>
        ))}
        <rect x="258" y="64" width="94" height="236" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="5 3" />
        {["Not", "investigable", "as written.", "", "Narrow it,", "change the", "method, or", "use existing", "data."].map((w, i) => (
          <text key={i} x="305" y={110 + i * 17} textAnchor="middle" fontSize="11.5" fontWeight={i < 3 ? 700 : 400} fill="var(--ink)">{w}</text>
        ))}
        <line x1="120" y1="300" x2="120" y2="318" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#ds-arr1)" />
        <text x="128" y="313" fontSize="10.5" fill="var(--ink-muted)">yes</text>
        <rect x="10" y="320" width="220" height="38" rx="19" fill="var(--card)" stroke="var(--accent)" strokeWidth="3" />
        <text x="120" y="344" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">Yes to all: investigable</text>
      </svg>
    </Figure>
  );
}

/* 8.1.5 — claim, evidence, reasoning */
function CERFigure() {
  const boxes = [
    { x: 6, t: "CLAIM", a: "What you", b: "conclude" },
    { x: 128, t: "EVIDENCE", a: "Data with", b: "numbers + units" },
    { x: 250, t: "REASONING", a: "The science", b: "that links them" },
  ];
  const chips = [
    { x: 6, y: 150, w: 112, l: "large sample" },
    { x: 124, y: 150, w: 112, l: "control group" },
    { x: 242, y: 150, w: 112, l: "repeat trials" },
    { x: 6, y: 186, w: 172, l: "one variable changed" },
    { x: 184, y: 186, w: 170, l: "results consistent" },
  ];
  return (
    <Figure num={2} caption="Claim, evidence, reasoning. The evidence is only as strong as the investigation that produced it.">
      <svg role="img" aria-label="Three boxes in a row. Claim: what you conclude. Evidence: data with numbers and units. Reasoning: the science that links them. Below: evidence is stronger with a large sample, a control group, repeat trials, only one variable changed, and consistent results." width="100%" viewBox="0 0 360 222" style={{ maxWidth: 560, display: "block", margin: "0 auto" }}>
        <defs>
          <marker id="ds-arr2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--ink)" />
          </marker>
        </defs>
        {boxes.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y="10" width="104" height="82" rx="10" fill="var(--card)" stroke="var(--accent)" strokeWidth="2.5" />
            <text x={b.x + 52} y="36" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="var(--ink)">{b.t}</text>
            <text x={b.x + 52} y="58" textAnchor="middle" fontSize="11" fill="var(--ink)">{b.a}</text>
            <text x={b.x + 52} y="74" textAnchor="middle" fontSize="11" fill="var(--ink)">{b.b}</text>
            {i < 2 && <line x1={b.x + 106} y1="51" x2={b.x + 120} y2="51" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#ds-arr2)" />}
          </g>
        ))}
        <text x="180" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">Evidence is stronger with:</text>
        {chips.map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height="28" rx="14" fill="var(--bg-2)" stroke="var(--ink-muted)" strokeWidth="1" />
            <text x={c.x + c.w / 2} y={c.y + 18.5} textAnchor="middle" fontSize="11.5" fill="var(--ink)">{c.l}</text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

/* 8.1.5 — a confounding variable */
function ConfoundFigure() {
  return (
    <Figure num={3} caption="Umbrella sales and car crashes rise and fall together, but neither causes the other. Rain (a confounding variable) causes both.">
      <svg role="img" aria-label="Diagram. Rainy weather has arrows to more umbrellas sold and to more car crashes. A dashed line between umbrellas sold and car crashes is labelled correlated, but not cause and effect." width="100%" viewBox="0 0 360 200" style={{ maxWidth: 520, display: "block", margin: "0 auto" }}>
        <defs>
          <marker id="ds-arr3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--ink)" />
          </marker>
        </defs>
        <rect x="115" y="8" width="130" height="40" rx="20" fill="var(--card)" stroke="var(--accent)" strokeWidth="2.5" />
        <text x="180" y="25" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="var(--ink)">Rainy weather</text>
        <text x="180" y="40" textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)">confounding variable</text>
        <rect x="6" y="128" width="128" height="44" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="70" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">More umbrellas</text>
        <text x="70" y="164" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">sold</text>
        <rect x="226" y="128" width="128" height="44" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="290" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">More car</text>
        <text x="290" y="164" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">crashes</text>
        <line x1="150" y1="48" x2="86" y2="124" stroke="var(--ink)" strokeWidth="1.8" markerEnd="url(#ds-arr3)" />
        <line x1="210" y1="48" x2="274" y2="124" stroke="var(--ink)" strokeWidth="1.8" markerEnd="url(#ds-arr3)" />
        <text x="96" y="84" textAnchor="end" fontSize="10.5" fill="var(--ink-muted)">causes</text>
        <text x="264" y="84" fontSize="10.5" fill="var(--ink-muted)">causes</text>
        <line x1="138" y1="150" x2="222" y2="150" stroke="var(--ink-muted)" strokeWidth="1.8" strokeDasharray="5 4" />
        <text x="180" y="188" textAnchor="middle" fontSize="11" fill="var(--ink)">correlated, but not cause and effect</text>
      </svg>
    </Figure>
  );
}

/* 8.1.6 — street temperature line graph (worked extended response) */
const TREE = [31.2, 33.0, 29.8, 34.1, 32.4];
const BARE = [33.6, 35.1, 31.9, 36.8, 34.6];
function StreetGraph() {
  const X = (d) => 60 + d * 65;               // day index 0..4
  const Y = (t) => 200 - (t - 28) * 17;        // 28 °C at y=200, 38 °C at y=30
  const ticks = [28, 30, 32, 34, 36, 38];
  const path = (arr) => arr.map((t, i) => (i ? "L" : "M") + X(i) + "," + Y(t)).join(" ");
  return (
    <Figure num={4} caption="Air temperature at 3 pm on five hot days, measured 1.5 m above the footpath on two streets.">
      <svg role="img" aria-label="Line graph of air temperature at 3 pm over five days. Bare street: 33.6, 35.1, 31.9, 36.8 and 34.6 degrees Celsius. Tree-lined street: 31.2, 33.0, 29.8, 34.1 and 32.4 degrees Celsius. The tree-lined street is cooler every day." width="100%" viewBox="0 0 360 272" style={{ maxWidth: 560, display: "block", margin: "0 auto" }}>
        {ticks.map(t => (
          <g key={t}>
            <line x1="44" y1={Y(t)} x2="344" y2={Y(t)} stroke="var(--border)" strokeWidth="1" />
            <text x="38" y={Y(t) + 4} textAnchor="end" fontSize="11" fill="var(--ink-muted)">{t}</text>
          </g>
        ))}
        <line x1="44" y1="30" x2="44" y2="200" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="44" y1="200" x2="344" y2="200" stroke="var(--ink)" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map(d => (
          <text key={d} x={X(d)} y="216" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">{d + 1}</text>
        ))}
        <text x="194" y="234" textAnchor="middle" fontSize="11.5" fill="var(--ink)">Day</text>
        <text x="14" y="115" textAnchor="middle" fontSize="11.5" fill="var(--ink)" transform="rotate(-90 14 115)">Air temperature (°C)</text>
        <path d={path(BARE)} fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 4" />
        {BARE.map((t, i) => <rect key={i} x={X(i) - 4.5} y={Y(t) - 4.5} width="9" height="9" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />)}
        <path d={path(TREE)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        {TREE.map((t, i) => <circle key={i} cx={X(i)} cy={Y(t)} r="5" fill="var(--accent)" stroke="var(--card)" strokeWidth="1.5" />)}
        <line x1="56" y1="256" x2="80" y2="256" stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 4" />
        <rect x="63.5" y="251.5" width="9" height="9" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
        <text x="86" y="260" fontSize="11.5" fill="var(--ink)">Bare street</text>
        <line x1="194" y1="256" x2="218" y2="256" stroke="var(--accent)" strokeWidth="2.5" />
        <circle cx="206" cy="256" r="5" fill="var(--accent)" />
        <text x="224" y="260" fontSize="11.5" fill="var(--ink)">Tree-lined street</text>
      </svg>
    </Figure>
  );
}

/* 8.2.2 — homeopathic dilutions */
function DilutionFigure() {
  const steps = [
    { l: "Start", r: "about 10²³", dots: 18 },
    { l: "2C", r: "1 in 10⁴", dots: 9 },
    { l: "6C", r: "1 in 10¹²", dots: 3 },
    { l: "12C", r: "1 in 10²⁴", dots: 0 },
    { l: "30C", r: "1 in 10⁶⁰", dots: 0 },
  ];
  const pos = [[0, 0], [8, 6], [-8, 8], [4, -6], [-4, 14], [10, 18], [-10, -2], [0, 22], [6, 28], [-6, 30], [12, 34], [-12, 22], [2, 40], [-2, 10], [10, 44], [-10, 40], [6, 12], [-6, 46]];
  return (
    <Figure num={5} caption="Each 'C' step dilutes the mixture 1 part in 100. By about 12C, it is very unlikely that even one molecule of the original substance is left.">
      <svg role="img" aria-label="Five beakers. Start: about 10 to the 23 molecules, many dots. 2C: diluted 1 in 10 to the 4, fewer dots. 6C: 1 in 10 to the 12, a few dots. 12C: 1 in 10 to the 24, no dots, probably no molecules left. 30C: 1 in 10 to the 60, no dots." width="100%" viewBox="0 0 360 170" style={{ maxWidth: 560, display: "block", margin: "0 auto" }}>
        {steps.map((s, i) => {
          const cx = 38 + i * 71;
          return (
            <g key={i}>
              <path d={`M${cx - 24},40 L${cx - 24},112 Q${cx - 24},120 ${cx - 16},120 L${cx + 16},120 Q${cx + 24},120 ${cx + 24},112 L${cx + 24},40`} fill="none" stroke="var(--ink)" strokeWidth="1.8" />
              <rect x={cx - 22.5} y="58" width="45" height="60" fill="var(--bg-2)" />
              {pos.slice(0, s.dots).map((p, j) => <circle key={j} cx={cx + p[0]} cy={66 + p[1] * 1.05} r="2.6" fill="var(--accent)" />)}
              <text x={cx} y="24" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="var(--ink)">{s.l}</text>
              <text x={cx} y="140" textAnchor="middle" fontSize="11" fill="var(--ink)">{s.r}</text>
              {i < 4 && <text x={cx + 35.5} y="88" textAnchor="middle" fontSize="13" fill="var(--ink-muted)">→</text>}
            </g>
          );
        })}
        <text x="38" y="156" textAnchor="middle" fontSize="10" fill="var(--ink-muted)">molecules</text>
        <text x="287" y="156" textAnchor="middle" fontSize="10" fill="var(--ink-muted)">probably none left</text>
      </svg>
    </Figure>
  );
}

/* styled stimulus card (social post, label, forum, podcast) */
function Stimulus({ kind, children }) {
  return (
    <div style={{ border: "1.5px solid var(--ink)", borderRadius: 12, padding: "12px 14px", background: "var(--card)", margin: "10px 0" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 6 }}>{kind}</div>
      {children}
    </div>
  );
}

/* ================================================================
   SECTION 8.1 — Investigating questions and claims
   ================================================================ */
function Section1({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">8.1 Investigating questions and claims</div>
        <h1>Questions, evidence and arguments</h1>
        <p className="lead">Can the question be tested? Does the data really back up the claim? Can you write an argument that weighs up all the evidence? Those three skills are the whole of 8.1.</p>
      </div>

      {/* ---------------- 8.1.1 ---------------- */}
      <DotPoint id="8.1.1" title="Investigable and non-investigable questions" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important" />
        <Recap>
          <ul>
            <li>An <Term def="A question that can be answered by collecting measurable data in a fair, safe and practical way.">investigable question</Term> can be answered by collecting data. It names an <strong>independent variable</strong> (what you change) and a <strong>dependent variable</strong> (what you measure).</li>
            <li>It must pass four checks: <strong>measurability</strong> (can the variables be measured or counted?), <strong>resources</strong> (equipment, money, materials, place), <strong>time</strong> (can you get results in the time you have?) and <strong>ethics</strong> (safe, with consent, no harm to people, animals or the environment).</li>
            <li>Questions about opinions, values or beliefs ("Which is the best…?", "Should we…?") are <Term def="A question that cannot be settled by collecting data, because it depends on opinion or values, or cannot be measured, or cannot be tested safely or practically.">non-investigable</Term>. Science can inform them but cannot settle them.</li>
            <li>Vague words like "better", "healthier" or "harmful" must be replaced with something you can measure (mass in g, time in s, height in cm, a score out of 10).</li>
            <li>A question that is unethical or too slow to test directly can sometimes be answered with <strong>existing data</strong> (records, surveys, past studies) instead of an experiment.</li>
          </ul>
        </Recap>
        <InvestigableFlow />
        <WorkedExample
          title="Turning a vague question into an investigable one"
          problem={<p>Mia asks: <em>"Does music help plants grow better?"</em> Explain why this is not investigable as written, then rewrite it so it is.</p>}
          steps={[
            "Check measurability. 'Better' is vague: it could mean taller, heavier, more leaves or more flowers. 'Music' is also vague: what type, how loud, for how long?",
            "Check resources and time. Radish seeds sprout and grow quickly, cost little and need only pots, soil, a speaker and a ruler, so a two-week test is practical in a school.",
            "Check ethics. No people or animals are harmed, so it is ethical.",
            "Rewrite naming the independent variable (music on or off, at a set volume and time) and a measurable dependent variable (mean height in cm after a set number of days).",
          ]}
          answer={<>"Better" and "music" cannot be measured as written. Investigable version: <em>"Does playing classical music at 70 dB for 6 hours a day change the mean height (cm) of radish seedlings after 14 days, compared with seedlings grown in silence?"</em></>}
        />
        <ExamTip>
          When asked to <strong>justify</strong> whether a question is investigable, name the check it passes or fails (measurable, resources, time, ethics) and quote the word from the question that causes the problem. Then, if asked, rewrite it with an IV and a DV that has a unit.
        </ExamTip>
        <Practice title="Investigable questions">
          <MCQ num={1}
            question="Which question is investigable in a school science lab?"
            options={[
              "Is it wrong to keep fish in small tanks?",
              "Does the temperature of water affect how long a 2 g effervescent tablet takes to dissolve?",
              "Which colour is the most beautiful to look at?",
              "Will humans ever live on another planet?",
            ]}
            correct={1}
            explain="Temperature (°C) and dissolving time (s) can both be measured with cheap equipment in a lesson, so B is investigable. A is tempting because fish are real things you could observe, but 'wrong' is a value judgement, not something data can settle. C is opinion and D is about the future, which cannot be measured now." />
          <MCQ num={2}
            question={"A student wants to test the question: 'Does going without sleep for two nights affect a teenager's memory?' Which check does this question mainly fail?"}
            options={["Measurability", "Time", "Ethics", "Resources"]}
            correct={2}
            explain="Keeping people awake for two nights could harm their health and safety, so it fails the ethics check. Measurability is tempting, but memory can be measured with a recall test score, so that check is passed. A safer version could use existing sleep-diary data or compare normal sleep with a slightly later bedtime." />
          <WrittenQ num={3}
            question={"A coastal council asks: 'Will the new rock sea wall stop our beach eroding over the next 50 years?' Explain why this question is difficult to investigate directly, and suggest how scientists could still gather useful evidence. (2 marks)"}
            model="The question fails the time check: it would take 50 years to collect the results, far too long for the council to wait before deciding. Scientists could instead use existing data, such as measurements of beach width at other beaches where similar sea walls were built decades ago, or measure the beach width every three months for a few years and compare it with a nearby beach that has no wall." />
          <WrittenQ num={4}
            question={"Noah's question is: 'Are energy drinks bad for you?' Identify two reasons it is not investigable as written, then rewrite it as an investigable question that a school could test safely. (3 marks)"}
            model="First, 'bad for you' is vague and cannot be measured, because it does not say which effect (heart rate, sleep, concentration) is meant. Second, giving teenagers energy drinks to test for harm would be unethical because of the high caffeine content. An investigable and safe version is: 'Does the volume of an energy drink added to 100 mL of water change the pH of the mixture?' The IV is the volume of drink (mL) and the DV is pH, which can be measured with a pH meter." />
        </Practice>
        <SelfCheck id="8.1.1" items={[
          "I can say whether a question is investigable using the four checks: measurable, resources, time, ethics.",
          "I can spot vague words like 'better' or 'harmful' and replace them with a measurement and unit.",
          "I can rewrite a question so it names an independent and a dependent variable.",
          "I can suggest using existing data when a question is too slow or unethical to test directly.",
        ]} />
        <NotebookLink href={NB + "#8.1"} label="Learn it in full: Investigating Questions" />
      </DotPoint>

      {/* ---------------- 8.1.5 ---------------- */}
      <DotPoint id="8.1.5" title="Using evidence and reasoning to support conclusions" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core" />
        <Recap>
          <ul>
            <li><strong>Claim, evidence, reasoning (CER).</strong> The <Term def="A statement that answers the question or says what you conclude.">claim</Term> says what you conclude. The <Term def="Specific data from the investigation, quoted with numbers and units, that backs up the claim.">evidence</Term> quotes the data (numbers with units, often means or differences). The <Term def="The scientific explanation of why the evidence supports the claim.">reasoning</Term> explains the science that links them.</li>
            <li><strong>Sample size.</strong> More test subjects or samples means one unusual result has less effect, so the conclusion is more <Term def="Results are reliable when repeating the investigation gives similar results each time.">reliable</Term>. A test on 3 people says very little; a test on 300 says much more.</li>
            <li><strong>Controls.</strong> A <Term def="A group that does not receive the change being tested, used for comparison.">control group</Term> gives you something to compare with. <Term def="Variables kept the same so that only the independent variable changes.">Controlled variables</Term> are kept the same so the test is fair, which makes it <Term def="An investigation is valid when it actually tests what it claims to test, because only the independent variable was changed.">valid</Term>.</li>
            <li><strong>Repeats.</strong> Repeating trials and taking a mean reduces the effect of random errors and lets you spot <Term def="A result that does not fit the pattern of the others.">outliers</Term>.</li>
            <li><strong>Correlation is not causation.</strong> Two variables can change together (a <Term def="A relationship where two variables change together. Positive: both increase. Negative: one increases as the other decreases.">correlation</Term>) without one causing the other. A <Term def="A third variable that affects both variables being studied, creating a correlation that is not cause and effect.">confounding variable</Term> may cause both. Only a controlled experiment can show cause and effect.</li>
            <li>Common mistake: writing "this proves…". Data <em>support</em> a claim; they rarely prove it.</li>
          </ul>
        </Recap>
        <CERFigure />
        <ConfoundFigure />
        <WorkedExample
          title="Is the conclusion justified?"
          problem={<p>Liam claims a new brand of running shoe makes people faster. He asks three friends to sprint 100 m in their old shoes, then straight away sprint 100 m again in the new shoes. Their times drop from a mean of 15.2 s to 14.9 s. Liam concludes, "The new shoes make you faster." Evaluate his conclusion. (3 marks)</p>}
          steps={[
            "State the evidence fairly: the mean time fell by 15.2 − 14.9 = 0.3 s, which is a small difference.",
            "Sample size: only 3 people, so one person having a good run could cause the whole difference. The result is not reliable.",
            "Fairness: the new-shoe run was always second, so the friends were warmed up (or more tired). Order is an uncontrolled variable. The runners also knew which shoes they wore, so they may have tried harder.",
            "No repeats: each person ran once in each shoe, so random variation cannot be averaged out.",
            "Make a judgement and suggest an improvement.",
          ]}
          answer="The conclusion is not justified. The 0.3 s improvement is small and came from only 3 runners with one trial each, so it is not reliable. The test was not valid because the new shoes were always worn second, so warm-up or effort could explain the faster time. A better test would use 30 or more runners, randomly decide which shoe each person wears first, rest between runs, and repeat each run three times."
        />
        <WorkedExample
          title="Correlation or cause?"
          problem={<p>A survey of 2000 adults found that people who own a dog have lower average blood pressure than people who do not. A news site reports: "Owning a dog lowers your blood pressure." Explain whether this conclusion is supported. (3 marks)</p>}
          steps={[
            "Identify the type of evidence: a survey that compares groups. It shows a correlation (dog ownership goes with lower blood pressure). The large sample of 2000 makes the correlation itself believable.",
            "Look for confounding variables: dog owners may walk more, be younger, or have more time and money. Each of these could lower blood pressure on its own.",
            "Reverse direction: people who are already fit and healthy may be more likely to choose to get a dog.",
            "Say what would show cause and effect: a controlled experiment, or a study that measures blood pressure before and after people get a dog while controlling exercise and age.",
          ]}
          answer="The headline is not supported. The survey shows a correlation between owning a dog and lower blood pressure, but it does not show that the dog causes it. A confounding variable such as exercise (dog owners walk more) or age could cause both. A controlled study comparing similar people before and after getting a dog would be needed to test cause and effect."
        />
        <ExamTip>
          For <strong>evaluate</strong> or <strong>assess</strong> a conclusion, use the checklist <strong>S-C-R-C</strong>: <strong>S</strong>ample size, <strong>C</strong>ontrols and fairness, <strong>R</strong>epeats, <strong>C</strong>orrelation vs causation. Each point you link to the data usually earns a mark. Finish with a clear judgement: supported, partly supported or not supported.
        </ExamTip>
        <Practice title="Evidence and conclusions">
          <MCQ num={5}
            question="Why do scientists repeat trials and calculate a mean?"
            options={[
              "To make the results match the hypothesis",
              "To reduce the effect of random errors and make results more reliable",
              "To remove the need for a control group",
              "To prove the hypothesis is correct",
            ]}
            correct={1}
            explain="Repeating and averaging smooths out random errors and shows whether results are consistent, which improves reliability. 'Prove the hypothesis' is tempting, but repeats can only support a hypothesis; one well-designed contrary result could still overturn it. Repeats never replace a control group." />
          <MCQ num={6}
            question="In a hospital trial of a new cough syrup, half the patients get the syrup and half get an identical-looking syrup with no medicine. What is the purpose of the second group?"
            options={[
              "To increase the sample size",
              "To act as a control group for comparison, including any placebo effect",
              "To test a second independent variable",
              "To make the trial cheaper to run",
            ]}
            correct={1}
            explain="The group given the fake syrup (a placebo) is the control. Any improvement they show is due to time or expectation, so the real effect of the medicine is the difference between the two groups. It is tempting to say 'increase the sample size', but the control group's job is comparison, not size." />
          <MCQ num={7}
            question="Across a city, weeks with higher hot-chocolate sales also have more flu cases. What is the best explanation?"
            options={[
              "Hot chocolate causes flu",
              "Flu makes people crave hot chocolate",
              "Cold weather is a confounding variable that increases both",
              "The data must be wrong because the two are unrelated",
            ]}
            correct={2}
            explain="Cold winter weather makes people buy warm drinks and is also when flu spreads most, so it drives both variables. B is tempting because it sounds possible, but there is no evidence for that direction, and the confounder explains the pattern much better. The data can be correct and still not show cause and effect." />
          <MCQ num={8}
            question="Four groups tested whether a fertiliser increases tomato yield. Which design gives the most reliable evidence?"
            options={[
              "1 plant with fertiliser, 1 plant without, measured once",
              "10 plants with fertiliser only, measured weekly",
              "20 plants with fertiliser and 20 without, same soil, water and light",
              "20 plants with fertiliser in a greenhouse and 20 without outside",
            ]}
            correct={2}
            explain="C has a large sample, a control group and controlled variables, so any difference is likely due to the fertiliser. D is tempting because it has the same sample size, but the greenhouse changes temperature and light as well, so the test is not fair. B has no control group to compare with." />
          <WrittenQ num={9}
            question={<>Ella tested how much water two brands of paper towel absorb, using sheets of the same size dipped for 10 s. Brand A: 42 mL, 45 mL, 39 mL. Brand B: 31 mL, 30 mL, 32 mL. Calculate the mean for each brand and write a claim, evidence and reasoning conclusion. (3 marks)</>}
            model="Claim: Brand A paper towel absorbs more water than Brand B. Evidence: the mean for Brand A is (42 + 45 + 39) ÷ 3 = 42 mL, and the mean for Brand B is (31 + 30 + 32) ÷ 3 = 31 mL, so Brand A absorbed 11 mL more. Reasoning: the sheets were the same size and dipped for the same time, so the brand was the only variable changed; all three Brand A trials were higher than every Brand B trial, so the difference is consistent and not due to one unusual result." />
          <WrittenQ num={10}
            question={"A website states: 'Students who play chess score higher in maths tests, so chess makes you better at maths.' Explain why this conclusion may not be valid, and describe how it could be tested properly. (4 marks)"}
            model="The statement is based on a correlation: chess players score higher in maths, but that does not show chess causes the higher scores. A confounding variable, such as students who already enjoy problem-solving being more likely to join chess club, could explain both. To test cause and effect, take a large group of similar students (e.g. 100), measure their maths scores, then randomly put half in weekly chess lessons and half in another activity for one term. Keep the maths teaching the same for both groups, then retest. If the chess group improves more, the claim is supported." />
        </Practice>
        <SelfCheck id="8.1.5" items={[
          "I can write a claim, evidence and reasoning conclusion that quotes data with units.",
          "I can explain how sample size, controls and repeats affect how much we trust a conclusion.",
          "I can explain why a correlation does not show cause and effect, and name a likely confounding variable.",
          "I can judge whether a conclusion is supported, partly supported or not supported.",
        ]} />
        <NotebookLink href={NB + "#8.1"} label="Learn it in full: Investigating Questions" />
      </DotPoint>

      {/* ---------------- 8.1.6 ---------------- */}
      <DotPoint id="8.1.6" title="Writing a scientific argument (extended response)" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core">Extended responses are worth the most marks of any single question. Learn the structure below and practise it.</ExamFocus>
        <Recap>
          <p>A scientific argument weighs up <strong>a range of evidence</strong> and decides how well it supports a claim. Use this structure:</p>
          <ol>
            <li><strong>Position.</strong> Restate the claim and say whether the evidence supports it, partly supports it or does not support it.</li>
            <li><strong>Evidence for.</strong> Quote specific data with units. Do a calculation (mean, difference, percentage change) to show the size of the effect.</li>
            <li><strong>Reasoning.</strong> Explain the science that links the evidence to the claim (the cause).</li>
            <li><strong>Evidence against or limitations.</strong> Contrary data, small sample, missing controls, few repeats, short time, correlation only, possible bias in who ran the test.</li>
            <li><strong>Judgement.</strong> Weigh it up in one or two sentences, and say what further evidence would make the conclusion stronger.</li>
          </ol>
          <p>Useful formula: <strong>percentage change = (new − original) ÷ original × 100</strong>.</p>
          <p>Common mistakes: only using one source, describing the graph without numbers, and never actually saying whether you agree with the claim.</p>
        </Recap>
        <WorkedExample
          title="A full extended response: do street trees cool a suburb?"
          problem={<>
            <p>A local newspaper headline claims: <em>"Street trees cool a suburb by 5 °C on hot days."</em></p>
            <p><strong>Source 1.</strong> Students measured air temperature at 3 pm on five hot days, 1.5 m above the footpath, on a street with mature trees and on a bare street 2 km away.</p>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th>Day</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead>
                <tbody>
                  <tr><td>Tree-lined street (°C)</td><td>31.2</td><td>33.0</td><td>29.8</td><td>34.1</td><td>32.4</td></tr>
                  <tr><td>Bare street (°C)</td><td>33.6</td><td>35.1</td><td>31.9</td><td>36.8</td><td>34.6</td></tr>
                </tbody>
              </table>
            </div>
            <StreetGraph />
            <p><strong>Source 2.</strong> A summary of a peer-reviewed study across 20 suburbs reports that streets with heavy tree cover were 1 °C to 3 °C cooler in the afternoon than similar streets without trees.</p>
            <p>Evaluate the newspaper's claim using both sources. (6 marks)</p>
          </>}
          steps={[
            "Calculate the size of the effect. Mean tree-lined = (31.2 + 33.0 + 29.8 + 34.1 + 32.4) ÷ 5 = 160.5 ÷ 5 = 32.1 °C. Mean bare = (33.6 + 35.1 + 31.9 + 36.8 + 34.6) ÷ 5 = 172.0 ÷ 5 = 34.4 °C. Difference = 34.4 − 32.1 = 2.3 °C.",
            "Check consistency. Daily differences are 2.4, 2.1, 2.1, 2.7 and 2.2 °C, so the tree-lined street was cooler on every day, by a similar amount.",
            "Compare with the claim. The claim says 5 °C, but Source 1 shows 2.3 °C, less than half. Source 2 (larger, peer reviewed) agrees with a cooling effect of 1 to 3 °C, not 5 °C.",
            "Reasoning. Tree leaves shade the ground and footpath so they absorb less sunlight, and trees release water vapour from their leaves (transpiration), which cools the air around them.",
            "Limitations. Source 1 only compared two streets, so other differences (distance from the sea, road colour, traffic, building height) could explain some of the gap. It only used five days and one time of day.",
            "Judgement. Decide 'partly supported' and suggest what further evidence would help.",
          ]}
          answer={<>
            <p><em>Model response.</em> The evidence partly supports the newspaper's claim: trees do cool the street, but by much less than 5 °C.</p>
            <p>In Source 1, the mean temperature of the tree-lined street was 32.1 °C compared with 34.4 °C for the bare street, a difference of 2.3 °C. The tree-lined street was cooler on all five days, by 2.1 to 2.7 °C, so the effect is consistent. Source 2 supports this, because a larger peer-reviewed study of 20 suburbs found tree-covered streets were 1 to 3 °C cooler.</p>
            <p>This makes scientific sense: leaves shade the ground so less sunlight is absorbed and re-released as heat, and transpiration releases water vapour that cools the air.</p>
            <p>However, neither source shows a 5 °C drop. Source 1's 2.3 °C is less than half of the claimed value and sits within Source 2's 1 to 3 °C range. Source 1 is also limited: it compared only two streets, which may differ in other ways such as distance from the coast or road surface, and it used only five days at one time.</p>
            <p>Overall, the evidence supports the claim that trees cool streets, but not the size of the cooling. The headline should say "about 1 to 3 °C". Stronger evidence would come from measuring many pairs of similar streets over a whole summer, or measuring the same street before and after trees are planted.</p>
          </>}
        />
        <WorkedExample
          title="When the evidence does not support the claim"
          problem={<>
            <p>A sports drink label says: <em>"Boosts endurance by 30%."</em> In a trial, 12 rowers each rowed on a machine until exhaustion on three different days, drinking either water, the sports drink, or a flavoured placebo that looked and tasted the same but had no active ingredients. Nobody knew which drink they had. Mean times: water 40 min, sports drink 44 min, placebo 43 min.</p>
            <p>Use the data to evaluate the claim. (4 marks)</p>
          </>}
          steps={[
            "Calculate the claimed effect: percentage change from water = (44 − 40) ÷ 40 × 100 = 10%. The claim is 30%, so the drink gave only one-third of the claimed boost.",
            "Use the placebo: the placebo group improved by (43 − 40) ÷ 40 × 100 = 7.5%. Most of the improvement also happens with a fake drink, so it may come from expectation or flavour, not the ingredients.",
            "The real effect of the ingredients is the difference from the placebo: 44 − 43 = 1 min, which is very small.",
            "Limitations: only 12 rowers, so the small difference may be due to chance. Judgement: not supported.",
          ]}
          answer="The data do not support the claim. Compared with water, the sports drink increased mean time to exhaustion from 40 to 44 min, which is a 10% increase, not 30%. The placebo drink also increased time to 43 min (7.5%), so most of the improvement happened without the active ingredients, probably due to expectation. The drink's own effect was only 1 min more than the placebo. With only 12 rowers, even this small difference could be due to chance, so a larger blind trial would be needed before any boost could be claimed."
        />
        <ExamTip title="How extended responses are marked">
          Markers look for: a clear position, accurate data quoted with units, a correct calculation, scientific reasoning, at least one limitation or piece of contrary evidence, and a judgement. A long answer that only describes the graph will not reach the top band. Use "however" to switch to the limitations; it shows the marker you have weighed both sides.
        </ExamTip>
        <Practice title="Scientific arguments">
          <MCQ num={11}
            question="Which sentence is the best use of evidence in a scientific argument?"
            options={[
              "The graph clearly shows the fertiliser worked really well.",
              "Plants with fertiliser grew taller.",
              "Plants with fertiliser had a mean height of 24 cm, compared with 16 cm without, a 50% increase.",
              "Everyone knows fertiliser helps plants grow.",
            ]}
            correct={2}
            explain="C quotes specific data with units and calculates the size of the effect: (24 − 16) ÷ 16 × 100 = 50%. B is tempting because it is true, but it gives no numbers, so it would not earn the evidence mark. A and D are opinions." />
          <MCQ num={12}
            question={"A question says 'Evaluate the claim using the data.' What must your answer include that a 'describe' answer does not?"}
            options={[
              "A list of the data values",
              "A judgement about how well the evidence supports the claim, with strengths and limitations",
              "A labelled diagram",
              "A new hypothesis",
            ]}
            correct={1}
            explain="Evaluate means make a judgement based on criteria, so you weigh up strengths and limitations and then decide. Listing data values (A) is only describing, which is the tempting trap: it earns some marks but never the top band." />
          <MCQ num={13}
            question={"A study claims a new toothpaste reduces tooth sensitivity. Which piece of information is the strongest reason to doubt it?"}
            options={[
              "The study was published in English",
              "The study used 400 people",
              "The study was paid for and run only by the toothpaste company, and nobody else has repeated it",
              "The toothpaste is mint flavoured",
            ]}
            correct={2}
            explain="If the only people who tested it gain from a positive result and no independent group has repeated it, the results may be biased. 400 people (B) is a strength, not a weakness, which is why it is the wrong choice even though it is about study design." />
          <MCQ num={14}
            question={"The mean height of a group of seedlings rose from 20 cm to 25 cm. What is the percentage increase?"}
            options={["5%", "20%", "25%", "80%"]}
            correct={2}
            explain="Percentage change = (25 − 20) ÷ 20 × 100 = 5 ÷ 20 × 100 = 25%. The tempting wrong answer is 20%, which comes from dividing by the new value (5 ÷ 25) instead of the original value." />
          <WrittenQ num={15}
            question={"A sunscreen company claims its SPF 50 'blocks all UV for 8 hours'. Lab tests on skin samples showed it blocked 98% of UV when first applied and 61% after 4 hours. Use this evidence to write one paragraph that evaluates the claim. (3 marks)"}
            model="The evidence does not support the claim. When first applied, the sunscreen blocked 98% of UV, not all of it, so even at its best it does not block 'all' UV. After 4 hours it blocked only 61%, a drop of 37 percentage points, so it is losing effectiveness well before 8 hours, probably because the active ingredients break down or rub off. The claim should be changed to say users need to reapply every 2 hours, and further tests should be done on people outdoors, not only on lab samples." />
          <Stimulus kind="Question 16 · claim and three sources">
            <p style={{ marginTop: 0 }}>Claim from a gardening blog: <em>"Mixing crushed eggshells into the soil makes tomato plants produce more fruit."</em></p>
            <p><strong>Source 1.</strong> A school agriculture class grew 40 tomato plants of the same variety in one garden bed. Plants were randomly given soil with crushed eggshells (20 plants) or soil without (20 plants). All had the same water, sunlight and fertiliser. Mean mass of ripe fruit per plant over the season: with eggshells 2.4 kg, without 2.0 kg.</p>
            <p><strong>Source 2.</strong> An online poll of 300 home gardeners found that those who said they add eggshells to their soil also said their tomato harvests were bigger.</p>
            <p><strong>Source 3.</strong> One gardener tried eggshells on two of her plants for one summer and saw no difference.</p>
          </Stimulus>
          <WrittenQ num={16}
            question="Use the claim and the three sources above. Evaluate the claim using all three sources. (6 marks)"
            model={<>
              <p>The evidence mostly supports the claim that adding crushed eggshells to the soil increases the amount of fruit tomato plants produce.</p>
              <p>Source 1 is the strongest evidence. Plants with eggshells produced a mean of 2.4 kg of fruit compared with 2.0 kg without, which is 0.4 kg more, a (2.4 − 2.0) ÷ 2.0 × 100 = 20% increase. The plants were the same variety, randomly assigned and given the same water, sunlight and fertiliser, with 20 plants in each group, so the eggshells were the only variable changed. This means it can show cause and effect.</p>
              <p>A scientific reason supports this: eggshells are mostly calcium carbonate, and calcium is a nutrient plants need to build cell walls. A shortage of calcium causes blossom-end rot, which spoils tomato fruit.</p>
              <p>Source 2 agrees, but it is only a correlation based on what gardeners said, not measured masses. Gardeners who add eggshells may also take more care of their plants in other ways, such as watering or fertilising more, which could explain the bigger harvests.</p>
              <p>Source 3 disagrees, but it used only two plants for one season with no control group, so it is the least reliable and does not outweigh Source 1.</p>
              <p>Overall, the claim is supported, mainly by Source 1. It would be stronger if the trial were repeated over several seasons, in different soils, and if the calcium already in the soil were measured, because eggshells may only help where soil calcium is low.</p>
              <p><em>Marking guide (6 marks):</em> clear judgement (1); accurate data from Source 1 with units and a calculation (1); explains why Source 1 is valid and reliable (random assignment, controlled variables, sample size) (1); scientific reasoning (calcium as a plant nutrient) (1); evaluates Source 2 as correlation or self-report (1); evaluates Source 3 as small and uncontrolled, and suggests further evidence (1).</p>
            </>} />
        </Practice>
        <SelfCheck id="8.1.6" items={[
          "I can structure an extended response: position, evidence for, reasoning, limitations or evidence against, judgement.",
          "I can calculate a mean, a difference and a percentage change and use them as evidence.",
          "I can compare sources and explain which is the most reliable and why.",
          "I can finish with a judgement and suggest what further evidence would help.",
        ]} />
        <NotebookLink href={NB + "#8.1"} label="Learn it in full: Investigating Questions" />
      </DotPoint>
    </>
  );
}

/* ================================================================
   SECTION 8.2 — Pseudoscience
   ================================================================ */
const FLAG_ITEMS = [
  { id: "f1", label: "Results published in a peer-reviewed journal", bucket: "sci" },
  { id: "f2", label: "“It works if you truly believe in it”", bucket: "pseudo" },
  { id: "f3", label: "Tested against a placebo with hundreds of people", bucket: "sci" },
  { id: "f4", label: "A famous footballer says it changed his life", bucket: "pseudo" },
  { id: "f5", label: "“Unlocks your cells' hidden healing code”", bucket: "pseudo" },
  { id: "f6", label: "Other labs repeated it and got the same result", bucket: "sci" },
  { id: "f7", label: "Studies that found no effect are called a cover-up", bucket: "pseudo" },
  { id: "f8", label: "Makes a prediction that could be shown wrong", bucket: "sci" },
];

function Section2({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">8.2 Pseudoscience</div>
        <h1>Science or pseudoscience?</h1>
        <p className="lead">Pseudoscience looks and sounds like science but does not follow the scientific method. Learn the common examples and the warning signs, then practise spotting them in posts, labels and podcasts.</p>
      </div>

      {/* ---------------- 8.2.2 ---------------- */}
      <DotPoint id="8.2.2" title="Examples of pseudoscientific claims" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core" />
        <Recap>
          <p><Term def="Claims or practices presented as scientific that are not based on the scientific method: they are not properly tested, cannot be shown wrong, or ignore evidence against them.">Pseudoscience</Term> uses scientific-sounding language but its claims have failed fair tests or cannot be tested at all. Know these examples and <strong>why</strong> each counts as pseudoscience:</p>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th>Example</th><th>The claim</th><th>What the evidence shows</th></tr></thead>
              <tbody>
                <tr><td>Astrology</td><td>The positions of stars and planets at birth shape personality and future events.</td><td>Blind tests show astrologers cannot match people to their charts better than chance. Horoscopes use vague statements that fit almost anyone (the Barnum effect).</td></tr>
                <tr><td>Homeopathy</td><td>A substance diluted again and again becomes a stronger medicine.</td><td>Dilutions are so extreme that usually no molecule remains. Large reviews of trials find no effect beyond placebo.</td></tr>
                <tr><td>Detox products</td><td>Foot pads, teas or juice cleanses pull "toxins" out of the body.</td><td>The "toxins" are never named or measured. The liver and kidneys already remove wastes. Pads go brown when they get damp with sweat or water.</td></tr>
                <tr><td>Iridology</td><td>Patterns and colours in the iris of the eye reveal illness in other organs.</td><td>When iridologists were shown eye photos of people with and without kidney disease, they could not pick the ill people better than chance, and they disagreed with each other.</td></tr>
                <tr><td>Crystal healing</td><td>Crystals give off healing "vibrations".</td><td>The "vibrations" are never defined or measured. People report the same effects when handed glass replicas.</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li>A <Term def="An inactive treatment that looks like the real one. People sometimes feel better after a placebo because they expect to (the placebo effect).">placebo</Term> effect is real: people often feel better because they expect to. That is why fair trials compare the treatment with a placebo.</li>
            <li>Pseudoscience is not the same as an idea that turned out wrong. Scientists test their ideas and change them when evidence goes against them; pseudoscience does not.</li>
          </ul>
        </Recap>
        <DilutionFigure />
        <WorkedExample
          title="Why homeopathy cannot work as claimed"
          problem={<p>A homeopathic remedy is labelled "30C". Each C step dilutes the mixture 1 part in 100. A spoonful of the starting substance contains roughly 10<sup>23</sup> molecules. Use this to explain why scientists classify homeopathy as pseudoscience. (3 marks)</p>}
          steps={[
            <>Work out the total dilution. 1 in 100 = 1 in 10<sup>2</sup>. Thirty steps: (10<sup>2</sup>)<sup>30</sup> = 10<sup>60</sup>. So 30C means 1 part in 10<sup>60</sup>.</>,
            <>Compare with the number of molecules. After 12C the dilution is already 10<sup>24</sup>, which is more than the 10<sup>23</sup> molecules we started with, so on average less than one molecule is left. At 30C it is almost certain none remains.</>,
            "Link to evidence: if no molecule of the substance remains, there is no known way it could act on the body. Fair, placebo-controlled trials agree: homeopathic remedies do no better than placebo.",
            "Link to the features of pseudoscience: the claim goes against well-tested chemistry and its supporters keep it despite the trial evidence.",
          ]}
          answer={<>A 30C remedy is diluted 1 in 10<sup>60</sup>. Since a spoonful only has about 10<sup>23</sup> molecules, there is almost certainly no molecule of the original substance left, so there is no way for it to work. Controlled trials comparing homeopathic remedies with placebos find no difference. Because the idea conflicts with established chemistry and is kept despite contrary evidence, it is pseudoscience.</>}
        />
        <WorkedExample
          title="Testing a detox foot pad"
          problem={<p>A seller says their foot pads "draw toxins out while you wear them" and point to the pads turning dark brown as proof. Describe a simple controlled test of this claim and explain what result would show it is pseudoscience. (3 marks)</p>}
          steps={[
            "Identify what the pad does that you can test: it changes colour. The claim says the colour comes from toxins in the body.",
            "Design a control: put a few drops of water on an unused pad, and leave another pad in a warm, damp place, with no foot at all. Compare with pads worn on feet for 8 hours.",
            "Keep variables the same: same brand, same time (8 hours), same temperature. Repeat with several pads.",
            "Predict and interpret: if the control pads also turn brown, the colour change is caused by moisture reacting with the pad's ingredients, not by toxins.",
          ]}
          answer="Wet some unused pads with a few drops of water (or leave them somewhere warm and damp) and compare them with pads worn on feet for 8 hours, using the same brand, time and temperature, with several pads in each group. If the pads with no foot also turn brown, the colour comes from moisture, not toxins. The claim also never names or measures any toxin, so it cannot be checked, which is a sign of pseudoscience."
        />
        <Practice title="Pseudoscience examples">
          <MCQ num={17}
            question="Which of these is an example of pseudoscience?"
            options={[
              "Using DNA evidence to identify a suspect",
              "Choosing your diet according to your blood type to lose weight",
              "Measuring blood sugar to diagnose diabetes",
              "Using a vaccine tested in large controlled trials",
            ]}
            correct={1}
            explain="When researchers compared people's blood types with how well they did on 'blood-type diets', any benefit came from eating more healthily, and it was the same whatever their blood type, yet the diet is still sold as if blood type matters. The other three have been tested many times and give consistent, measurable results. A vaccine is a tempting wrong answer only if you think 'injection = unnatural'; the deciding feature is the controlled-trial evidence." />
          <MCQ num={18}
            question={"A horoscope says: 'This week you may feel torn between your heart and your head, but an opportunity is coming.' Why do so many people feel it describes them?"}
            options={[
              "The positions of the planets really affect their week",
              "It is so vague that it fits almost anyone (the Barnum effect)",
              "It was written for their exact birth time",
              "It was peer reviewed before publication",
            ]}
            correct={1}
            explain="Vague, general statements feel personal because they apply to nearly everyone. This is the Barnum effect. Option A is the astrological claim itself, which blind tests do not support." />
          <MCQ num={19}
            question="Why do doctors say detox teas are unnecessary for healthy people?"
            options={[
              "The teas contain toxins themselves",
              "The liver and kidneys already break down and remove wastes from the blood",
              "Toxins can only be removed by surgery",
              "Tea is not absorbed by the body",
            ]}
            correct={1}
            explain="The body already has organs that filter wastes: the liver breaks them down and the kidneys remove them in urine. Detox products never name or measure the 'toxins' they remove. Option A may be true for some products, which makes it tempting, but it is not the main reason they are unnecessary." />
          <MCQ num={20}
            question="A homeopathic remedy is labelled 6C (each C is a 1 in 100 dilution). What is the total dilution?"
            options={["1 in 600", "1 in 10⁶", "1 in 10¹²", "1 in 10⁶⁰"]}
            correct={2}
            explain="Six steps of 1 in 100: 100⁶ = (10²)⁶ = 10¹². The tempting wrong answer is 1 in 10⁶, which treats each step as 1 in 10 instead of 1 in 100." />
          <WrittenQ num={21}
            question={"Explain why astrology is classed as a pseudoscience rather than a science. (3 marks)"}
            model="Astrology claims the positions of the stars and planets at birth affect personality and future events, but there is no known mechanism for how this could happen. When it has been tested fairly, for example by asking astrologers to match people's personality profiles to their birth charts without meeting them, they did no better than chance. Horoscopes are written in vague terms that fit almost anyone (the Barnum effect), so they cannot be shown to be wrong, and astrologers have not changed their ideas in response to the failed tests. Science changes when evidence goes against it; astrology does not." />
          <WrittenQ num={22}
            question={"A café owner sells a 'memory tea'. To prove it works, she gave a cup to 10 regular customers, told them it would sharpen their memory, then gave them a 30-word recall test. Their mean score was 18 words, and she says this proves the tea works. Identify three problems with her test and describe how to fix each one. (4 marks)"}
            model="1. There is no comparison group, so 18 words means nothing on its own: we do not know what the same people would score without the tea. Fix: also test a group who drink an identical-tasting tea without the 'memory' herbs. 2. The customers were told what the tea should do, so expectation (the placebo effect) could improve their effort and scores. Fix: make it double-blind, with the cups coded by someone else so neither the customers nor the tester knows who had which tea. 3. Only 10 people were tested once, and they were her own customers chosen by the person who profits, so the result could be due to chance or bias. Fix: use a much larger, randomly assigned group (e.g. 60 people), repeat the test, and have someone independent run it and mark the recall tests." />
        </Practice>
        <SelfCheck id="8.2.2" items={[
          "I can name at least four examples of pseudoscience: astrology, homeopathy, detox products, iridology, crystal healing.",
          "I can explain what fair tests have shown for each example.",
          "I can calculate a homeopathic dilution and explain why it means no molecules are left.",
          "I can design a placebo-controlled test of a pseudoscientific product.",
        ]} />
        <NotebookLink href={NB + "#8.2"} label="Learn it in full: Pseudoscience" />
      </DotPoint>

      {/* ---------------- 8.2.5 ---------------- */}
      <DotPoint id="8.2.5" title="Deciding if a claim is pseudoscientific" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core" />
        <Recap>
          <p>Look for these <strong>features of pseudoscience</strong>. The more you find, the more likely the claim is pseudoscientific.</p>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th>Pseudoscience</th><th>Science</th></tr></thead>
              <tbody>
                <tr><td><strong>Untestable or unfalsifiable</strong>: any result can be explained away ("it didn't work because you didn't believe").</td><td><Term def="A claim is falsifiable if a test could, in principle, show it to be wrong.">Falsifiable</Term>: makes a clear prediction that a test could prove wrong.</td></tr>
                <tr><td><strong>Anecdotes and testimonials</strong>: personal stories, reviews, celebrity endorsements.</td><td>Data from large, controlled studies.</td></tr>
                <tr><td><strong>No peer review</strong>: results only on the seller's website or social media.</td><td><Term def="Checking of a study's methods and conclusions by independent experts before it is published.">Peer reviewed</Term> and repeated by independent scientists.</td></tr>
                <tr><td><strong>Vague or science-sounding jargon</strong>: "structured", "vibrational", "bio-resonance", "toxins", "cellular renewal".</td><td>Precise terms, measured quantities with units.</td></tr>
                <tr><td><strong>No controlled trials</strong>: no placebo, no control group, no blinding.</td><td>Fair tests with a control group, blinding and many participants.</td></tr>
                <tr><td><strong>Ignores contrary evidence</strong>: calls failed tests a conspiracy; never changes.</td><td>Changes the idea when the evidence changes.</td></tr>
              </tbody>
            </table>
          </div>
          <p>In an answer, always <strong>quote the words</strong> from the stimulus that show each feature.</p>
        </Recap>
        <Interactive title="Red flag or good science?" subtitle="Tap a statement, then tap the group it belongs in (or drag it)."
          takeaway="Good science is testable, controlled, peer reviewed and repeated. Pseudoscience leans on stories, jargon and excuses.">
          <MatchBuckets items={FLAG_ITEMS} buckets={[{ id: "sci", label: "Sign of good science" }, { id: "pseudo", label: "Red flag for pseudoscience" }]} />
        </Interactive>
        <WorkedExample
          title="Analysing a social-media post"
          problem={<>
            <Stimulus kind="Social-media post · fictional account">
              <p style={{ margin: 0 }}>Obsessed with my new <strong>Vortex Hydro bottle</strong>! It spins your water into "structured water" with a higher vibrational frequency, so your cells absorb it 3× faster. I've felt SO much sharper this month and my skin is glowing. Scientists won't talk about it because the big drink companies don't want you to know. Link in bio!</p>
            </Stimulus>
            <p>Identify three features that suggest this claim is pseudoscientific. Use evidence from the post. (3 marks)</p>
          </>}
          steps={[
            "Scan for jargon: 'structured water' and 'higher vibrational frequency' sound scientific but are not defined or measured. Water molecules move constantly; spinning water does not give it a lasting structure.",
            "Scan for anecdotes: 'I've felt SO much sharper' and 'my skin is glowing' are one person's experience, with no control or measurement.",
            "Scan for how contrary evidence is handled: 'Scientists won't talk about it because the big drink companies don't want you to know' dismisses the lack of evidence as a cover-up.",
            "Notice the number with nothing behind it: '3× faster' has no study, no peer review and no data.",
          ]}
          answer="1. Science-sounding jargon: 'structured water with a higher vibrational frequency' is vague and not a measurable property of water. 2. Anecdotal evidence: 'I've felt so much sharper' is one person's story, with no control group or measurements, so it could be a placebo effect. 3. Ignores or explains away contrary evidence: the lack of scientific support is blamed on drink companies hiding it, rather than on the claim being tested. (Also accepted: no peer review, since the '3× faster' figure has no published study.)"
        />
        <WorkedExample
          title="Is the claim falsifiable? (product label)"
          problem={<>
            <Stimulus kind="Product label · fictional product">
              <p style={{ margin: 0 }}>Set it up in your veggie patch. The GardenHum speaker plays natural harmonic tones that awaken your plants' growth rhythms for bigger tomato harvests. Every garden is different. If your crop is no bigger, your soil's harmony is out of balance: keep it humming for another season.</p>
            </Stimulus>
            <p>Explain why this claim is unfalsifiable, and rewrite it as a claim that could be tested. (3 marks)</p>
          </>}
          steps={[
            "Find the escape clauses: 'every garden is different' and 'if your crop is no bigger, your soil's harmony is out of balance'. Whatever happens, the seller has an excuse.",
            "Explain what that means: no result could ever show the claim is wrong, so it is unfalsifiable. 'Growth rhythms' and 'soil harmony' are never defined and cannot be measured.",
            "Rewrite it with a measurable outcome and a comparison group, so it could be shown wrong.",
          ]}
          answer="The claim is unfalsifiable because every possible result is explained away: if the harvest is bigger the speaker is credited, and if it isn't, the gardener's 'soil harmony' is blamed. Its key terms ('growth rhythms', 'soil harmony') cannot be measured. A testable version is: 'Tomato plants grown in a greenhouse with a GardenHum speaker playing produce a greater total mass of ripe tomatoes per plant over one season than the same variety grown in a matching greenhouse with no speaker.' This could be tested by randomly assigning 30 seedlings to each greenhouse, keeping water, soil, light and temperature the same, weighing every tomato picked, and repeating the trial the next season, so it could be shown to be wrong."
        />
        <ExamTip>
          For "Is this claim pseudoscientific? Justify your answer", aim for <strong>feature + quote + why it matters</strong> each time. For example: "It relies on a testimonial ('my headaches vanished'), which is one person's experience with no control group, so the improvement could be a placebo effect."
        </ExamTip>
        <Practice title="Spotting pseudoscience">
          <MCQ num={23}
            question="Which feature, on its own, most strongly suggests a claim is pseudoscientific?"
            options={[
              "The product is expensive",
              "The claim cannot be tested in any way that could show it is wrong",
              "The product is made from plants",
              "The claim was made by a company",
            ]}
            correct={1}
            explain="If no test could ever show a claim is wrong, it is outside science altogether. Being made by a company (D) is tempting, because companies can be biased, but many real medicines are developed by companies and tested properly. Price and plant origin say nothing about the evidence." />
          <MCQ num={24}
            question={<>A wellness podcast host says: <em>"Himalayan salt lamps purify the air in your home. If your hay fever hasn't improved, your lamp just isn't big enough."</em> Which feature of pseudoscience is shown by the second sentence?</>}
            options={[
              "Peer review",
              "A large sample size",
              "An unfalsifiable excuse that explains away a negative result",
              "A controlled trial",
            ]}
            correct={2}
            explain="The second sentence means no result can ever count against the claim: if your hay fever is no better, the lamp is blamed for being too small, never the idea itself. 'Purify the air' in the first sentence is a vague claim with nothing measured, which is a feature too, but the question asks about the second sentence." />
          <MCQ num={25}
            question="What does it mean when a study has been peer reviewed?"
            options={[
              "The researchers' friends agreed with the results",
              "Independent experts checked the methods and conclusions before it was published",
              "The study has been proven to be true",
              "Lots of people shared it on social media",
            ]}
            correct={1}
            explain="Peer review means other qualified scientists, who did not do the study, check that the methods and reasoning are sound before publication. It is tempting to think peer review proves a result true (C), but it only checks quality; the results still need to be repeated by other scientists." />
          <MCQ num={26}
            question={<>A forum post reads: <em>"My nan has used vinegar foot soaks for 30 years and has never caught a cold. Proof it boosts your immune system!"</em> What is the main weakness of this evidence?</>}
            options={[
              "30 years is too short",
              "It is a single anecdote with no control group, so other factors could explain it",
              "Vinegar is an acid",
              "It was posted online, so it must be false",
            ]}
            correct={1}
            explain="One person's experience cannot show cause and effect: she may have a strong immune system, avoid sick people, or simply forget minor colds. Option D is tempting but wrong: being online doesn't make something false; the problem is the type of evidence." />
          <WrittenQ num={27}
            question={"Explain the difference between a falsifiable claim and an unfalsifiable claim. Give an example of each. (2 marks)"}
            model="A falsifiable claim makes a clear prediction that a test could show to be wrong, for example 'This hand gel kills 99% of E. coli bacteria on a surface within 30 seconds', which can be tested by counting bacteria. An unfalsifiable claim is worded so that no test could ever disprove it, for example 'This crystal protects you from harmful vibrations', because 'harmful vibrations' are never defined or measured and any result can be explained away." />
          <Stimulus kind="Question 28 · online car forum · fictional product">
            <p style={{ margin: "0 0 6px" }}><strong>RoadTrip_Wombat:</strong> Anyone tried FuelMax pellets? You drop one in the petrol tank and it "re-aligns the fuel molecules" so the engine burns them more completely. Box says it cuts fuel use by 25%.</p>
            <p style={{ margin: "0 0 6px" }}><strong>UteLife:</strong> Put one in my ute last month. Easily getting an extra 100 km out of every tank!</p>
            <p style={{ margin: "0 0 6px" }}><strong>RoadTrip_Wombat:</strong> Their website has a video of a car on a test machine using less fuel. Doesn't say how the test was done though.</p>
            <p style={{ margin: 0 }}><strong>Marco_T:</strong> A motoring magazine tested six cars with and without the pellets and fuel use was the same, within 1%. Pretty sure the oil companies pay them to say that.</p>
          </Stimulus>
          <WrittenQ num={28}
            question="Use the forum thread above. Evaluate whether the FuelMax claim is pseudoscientific. Refer to at least three features, with evidence from the thread. (5 marks)"
            model="The FuelMax claim shows several features of pseudoscience, so it is very likely pseudoscientific. First, it uses science-sounding jargon: 're-aligns the fuel molecules' sounds scientific, but it is not defined or measured, and no mechanism is given for how a pellet could change how completely an engine burns petrol. Second, it relies on an anecdote: UteLife's 'extra 100 km out of every tank' is one driver's impression with no measurements or control, and it could be explained by other changes such as more highway driving or new tyres. Third, the only supporting evidence is the seller's own video, which has not been peer reviewed and gives no method, no repeats and no comparison, and the seller benefits from a positive result. Fourth, it ignores contrary evidence: the magazine's controlled test of six cars found no difference, but this is dismissed as being paid for by oil companies instead of being taken seriously. Overall the claim is not supported by reliable evidence and should be treated as pseudoscience unless independent, repeated, controlled tests show a real saving." />
        </Practice>
        <SelfCheck id="8.2.5" items={[
          "I can list the six features of pseudoscience and the matching features of good science.",
          "I can quote words from a post, label, podcast or forum to show each feature.",
          "I can explain why an unfalsifiable claim is outside science, and rewrite it as a testable claim.",
          "I can write a 'feature + quote + why it matters' paragraph to justify a judgement.",
        ]} />
        <NotebookLink href={NB + "#8.2"} label="Learn it in full: Pseudoscience" />
      </DotPoint>
    </>
  );
}

/* ================================================================
   MOUNT
   ================================================================ */
mountTopicApp({
  year: 10,
  topicTitle: "Data Science",
  branch: "general",
  heroImage: "img/hero.webp",
  strand: "Yearly Exam Revision · Stage 5",
  accent: "teal",
  storageKey: "y10.rev-datascience",
  hubHref: "../",
  intro: "Revise how to judge whether a question can be investigated, use evidence and reasoning to support a conclusion, write an extended scientific argument, and tell real science from pseudoscience. Each dot point has a recap, worked examples, practice questions with model answers, and a self-check.",
  glossary: {
    "investigable question": "A question that can be answered by collecting measurable data in a fair, safe and practical way.",
    "independent variable": "The variable you change on purpose in an investigation.",
    "dependent variable": "The variable you measure to see the effect of the change.",
    "controlled variable": "A variable kept the same so that the test is fair.",
    "control group": "A group that does not receive the change being tested, used for comparison.",
    "sample size": "The number of individuals or samples tested. Larger samples give more reliable results.",
    "reliable": "Results are reliable when repeating the investigation gives similar results each time.",
    "valid": "An investigation is valid when it actually tests what it claims to test, because only the independent variable was changed.",
    "outlier": "A result that does not fit the pattern of the other results.",
    "correlation": "A relationship where two variables change together. It does not on its own show that one causes the other.",
    "causation": "When a change in one variable directly produces a change in another.",
    "confounding variable": "A third variable that affects both variables being studied, creating a misleading correlation.",
    "claim": "A statement that answers the question or says what you conclude.",
    "evidence": "Specific data, quoted with numbers and units, that supports or challenges a claim.",
    "reasoning": "The scientific explanation of why the evidence supports the claim.",
    "percentage change": "(new value − original value) ÷ original value × 100.",
    "placebo": "An inactive treatment that looks like the real one, used in a control group.",
    "double-blind trial": "A trial in which neither the participants nor the researchers know who is receiving the real treatment.",
    "peer review": "Checking of a study's methods and conclusions by independent experts before it is published.",
    "falsifiable": "A claim is falsifiable if a test could, in principle, show it to be wrong.",
    "pseudoscience": "Claims presented as scientific that are not based on the scientific method and are not supported by fair tests.",
    "anecdote": "A personal story or experience used as evidence. It cannot show cause and effect.",
    "testimonial": "A statement from a customer or celebrity praising a product.",
    "Barnum effect": "The tendency to believe vague, general statements are personal descriptions of yourself.",
    "homeopathy": "A practice based on the idea that extreme dilutions of substances act as medicines. Trials show no effect beyond placebo.",
  },
  sections: [
    {
      id: "8.1",
      label: "Investigating questions and claims",
      accent: "teal",
      blurb: "★★★ Using evidence to support conclusions and writing an extended scientific argument, plus ★★ investigable questions.",
      points: ["8.1.1", "8.1.5", "8.1.6"],
      render: (p) => <Section1 {...p} />,
    },
    {
      id: "8.2",
      label: "Pseudoscience",
      accent: "teal",
      blurb: "★★★ Examples of pseudoscience and how to decide whether a claim is pseudoscientific.",
      points: ["8.2.2", "8.2.5"],
      render: (p) => <Section2 {...p} />,
    },
  ],
});

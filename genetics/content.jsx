/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
const { useState } = React;

/* a soft tint that stays light in light mode and dark in dark mode, so var(--ink) text stays readable */
const SOFT = "color-mix(in srgb, var(--accent) 26%, var(--card))";

const NB = "https://irvincisneros-png.github.io/Year-10-Science/genetics-evolution/";

/* ============================================================
   SHARED FIGURES
   ============================================================ */

/* Nested sets: genome ⊃ chromosome ⊃ gene ⊃ bases */
function OrganisationFigure() {
  const boxes = [
    { x: 6,  y: 6,   w: 348, h: 252, t: "GENOME", d: "all of an organism's DNA (every chromosome)" },
    { x: 22, y: 62,  w: 316, h: 188, t: "CHROMOSOME", d: "a thread of DNA wound around histone proteins" },
    { x: 38, y: 118, w: 284, h: 124, t: "GENE", d: "a section of DNA that codes for one protein" },
  ];
  return (
    <Figure num={1} caption="Each level sits inside the one above it. A genome is made of chromosomes, each chromosome is one DNA molecule carrying many genes, and each gene is a sequence of bases." maxWidth={460}>
      <svg viewBox="0 0 360 264" width="100%" role="img" aria-label="Nested boxes. The genome box contains a chromosome box, which contains a gene box, which contains a row of base pairs.">
        {boxes.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="12" fill={i === 0 ? "var(--card)" : "var(--bg-2)"} stroke={i === 2 ? "var(--accent-deep)" : "var(--ink-muted)"} strokeWidth="1.8"/>
            <text x={b.x + 12} y={b.y + 21} fontSize="13" fontWeight="800" fill="var(--ink)">{b.t}</text>
            <text x={b.x + 12} y={b.y + 39} fontSize="11.5" fill="var(--ink-muted)">{b.d}</text>
          </g>
        ))}
        <rect x="54" y="174" width="252" height="60" rx="10" fill={SOFT} stroke="var(--accent-deep)" strokeWidth="1.5"/>
        <text x="66" y="192" fontSize="11.5" fontWeight="700" fill="var(--ink)">BASES (the code)</text>
        {["A–T", "C–G", "G–C", "T–A", "A–T"].map((p, i) => (
          <text key={i} x={80 + i * 48} y="222" fontSize="14" fontWeight="700" fill="var(--ink)" textAnchor="middle" fontFamily="var(--font-mono)">{p}</text>
        ))}
      </svg>
    </Figure>
  );
}

/* Straightened section of the DNA ladder */
function LadderFigure() {
  const rungs = [["A", "T"], ["C", "G"], ["G", "C"], ["T", "A"]];
  const ys = [60, 120, 180, 240];
  const pent = (cx, cy) => {
    const r = 11, pts = [];
    for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; pts.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1)); }
    return pts.join(" ");
  };
  const bonds = (b) => (b === "A" || b === "T") ? 2 : 3;
  return (
    <Figure num={2} caption="A short section of DNA 'unwound' so it lies flat. The sides are the sugar–phosphate backbone; the rungs are base pairs joined by weak hydrogen bonds (dashes). A–T pairs have 2 hydrogen bonds and C–G pairs have 3." maxWidth={460}>
      <svg viewBox="0 0 360 330" width="100%" role="img" aria-label="DNA ladder. Two backbones of alternating sugar pentagons and phosphate circles. Four rungs: A pairs with T, C with G, G with C, T with A, joined by dashed hydrogen bonds.">
        <text x="60" y="20" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">Backbone</text>
        <text x="180" y="20" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">Base pairs</text>
        <text x="300" y="20" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">Backbone</text>
        {[60, 300].map(x => <line key={x} x1={x} y1="34" x2={x} y2="262" stroke="var(--ink-muted)" strokeWidth="3"/>)}
        {[30, 90, 150, 210].map(y => [60, 300].map(x => (
          <circle key={x + "-" + y} cx={x} cy={y} r="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/>
        )))}
        {rungs.map(([l, r], i) => {
          const y = ys[i];
          const n = bonds(l);
          const offs = n === 2 ? [-4, 4] : [-7, 0, 7];
          return (
            <g key={i}>
              <polygon points={pent(60, y)} fill={SOFT} stroke="var(--accent-deep)" strokeWidth="1.6"/>
              <polygon points={pent(300, y)} fill={SOFT} stroke="var(--accent-deep)" strokeWidth="1.6"/>
              <line x1="71" y1={y} x2="80" y2={y} stroke="var(--ink-muted)" strokeWidth="2"/>
              <line x1="280" y1={y} x2="289" y2={y} stroke="var(--ink-muted)" strokeWidth="2"/>
              <rect x="80" y={y - 15} width="90" height="30" rx="6" fill={l === "A" || l === "T" ? SOFT : "var(--bg-2)"} stroke="var(--ink)" strokeWidth="1.4"/>
              <rect x="190" y={y - 15} width="90" height="30" rx="6" fill={r === "A" || r === "T" ? SOFT : "var(--bg-2)"} stroke="var(--ink)" strokeWidth="1.4"/>
              <text x="125" y={y + 5} fontSize="15" fontWeight="800" fill="var(--ink)" textAnchor="middle">{l}</text>
              <text x="235" y={y + 5} fontSize="15" fontWeight="800" fill="var(--ink)" textAnchor="middle">{r}</text>
              {offs.map(o => <line key={o} x1="172" y1={y + o} x2="188" y2={y + o} stroke="var(--accent-deep)" strokeWidth="1.8" strokeDasharray="3 2"/>)}
            </g>
          );
        })}
        <polygon points={pent(40, 290)} fill={SOFT} stroke="var(--accent-deep)" strokeWidth="1.6"/>
        <text x="58" y="294" fontSize="12" fill="var(--ink)">sugar (deoxyribose)</text>
        <circle cx="210" cy="290" r="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/>
        <text x="225" y="294" fontSize="12" fill="var(--ink)">phosphate</text>
        <line x1="30" y1="316" x2="48" y2="316" stroke="var(--accent-deep)" strokeWidth="1.8" strokeDasharray="3 2"/>
        <text x="58" y="320" fontSize="12" fill="var(--ink)">weak hydrogen bond</text>
      </svg>
    </Figure>
  );
}

/* Punnett square. top/side: arrays of two alleles, e.g. ["Y","y"] */
function PunnettSVG({ top, side, label }) {
  const cell = 70, ox = 52, oy = 52;
  const geno = (a, b) => (a <= b ? a + b : b + a);   // capital letters sort first, so "Yy" not "yY"
  return (
    <svg viewBox="0 0 250 250" width="100%" style={{ maxWidth: 270, display: "block", margin: "0 auto" }} role="img" aria-label={label}>
      {top.map((g, i) => (
        <g key={"t" + i}>
          <circle cx={ox + cell * i + cell / 2} cy="30" r="15" fill="var(--bg-2)" stroke="var(--ink-muted)" strokeWidth="1.4"/>
          <text x={ox + cell * i + cell / 2} y="36" fontSize="17" fontWeight="800" fill="var(--ink)" textAnchor="middle">{g}</text>
        </g>
      ))}
      {side.map((g, j) => (
        <g key={"s" + j}>
          <circle cx="28" cy={oy + cell * j + cell / 2} r="15" fill="var(--bg-2)" stroke="var(--ink-muted)" strokeWidth="1.4"/>
          <text x="28" y={oy + cell * j + cell / 2 + 6} fontSize="17" fontWeight="800" fill="var(--ink)" textAnchor="middle">{g}</text>
        </g>
      ))}
      {side.map((s, j) => top.map((t, i) => {
        const gt = geno(t, s);
        const rec = gt === gt.toLowerCase();
        return (
          <g key={i + "-" + j}>
            <rect x={ox + cell * i} y={oy + cell * j} width={cell} height={cell} fill={rec ? SOFT : "var(--card)"} stroke="var(--ink)" strokeWidth="1.6"/>
            <text x={ox + cell * i + cell / 2} y={oy + cell * j + cell / 2 + 7} fontSize="20" fontWeight="800" fill="var(--ink)" textAnchor="middle">{gt}</text>
          </g>
        );
      }))}
    </svg>
  );
}

/* Pedigree chart. people: {id,x,gen,sex:"m"|"f",aff,geno}; couples: [[a,b]]; families: [{parents:[a,b], kids:[...]}] */
function Pedigree({ people, couples, families, showGeno, label, width = 360 }) {
  const S = 14;                                   // half the symbol size
  const gy = g => 40 + (g - 1) * 120;
  const by = Object.fromEntries(people.map(p => [p.id, p]));
  const gens = [...new Set(people.map(p => p.gen))].sort();
  const roman = ["I", "II", "III", "IV"];
  const H = gy(gens.length) + (showGeno ? 56 : 42) + 30;
  return (
    <svg viewBox={`0 0 ${width} ${H}`} width="100%" style={{ maxWidth: 480, display: "block", margin: "0 auto" }} role="img" aria-label={label}>
      {gens.map(g => <text key={g} x="4" y={gy(g) + 5} fontSize="14" fontWeight="800" fill="var(--ink-muted)">{roman[g - 1]}</text>)}
      {couples.map(([a, b], i) => {
        const A = by[a], B = by[b];
        return <line key={"c" + i} x1={Math.min(A.x, B.x) + S} y1={gy(A.gen)} x2={Math.max(A.x, B.x) - S} y2={gy(A.gen)} stroke="var(--ink)" strokeWidth="1.8"/>;
      })}
      {families.map((f, i) => {
        const A = by[f.parents[0]], B = by[f.parents[1]];
        const mid = (A.x + B.x) / 2, py = gy(A.gen), sy = py + 62;
        const xs = f.kids.map(k => by[k].x);
        const lo = Math.min(mid, ...xs), hi = Math.max(mid, ...xs);
        return (
          <g key={"f" + i} stroke="var(--ink)" strokeWidth="1.8">
            <line x1={mid} y1={py} x2={mid} y2={sy}/>
            {hi > lo && <line x1={lo} y1={sy} x2={hi} y2={sy}/>}
            {f.kids.map(k => <line key={k} x1={by[k].x} y1={sy} x2={by[k].x} y2={gy(by[k].gen) - S}/>)}
          </g>
        );
      })}
      {people.map(p => {
        const y = gy(p.gen);
        const fill = p.aff ? "var(--accent-deep)" : "var(--card)";
        const num = p.id.split("-")[1];
        return (
          <g key={p.id}>
            {p.sex === "m"
              ? <rect x={p.x - S} y={y - S} width={2 * S} height={2 * S} fill={fill} stroke="var(--ink)" strokeWidth="2"/>
              : <circle cx={p.x} cy={y} r={S} fill={fill} stroke="var(--ink)" strokeWidth="2"/>}
            <text x={p.x} y={y + S + 15} fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">{num}</text>
            {showGeno && p.geno && <text x={p.x} y={y + S + 30} fontSize="12" fill="var(--ink)" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">{p.geno}</text>}
          </g>
        );
      })}
      {/* legend */}
      <g transform={`translate(0 ${H - 22})`}>
        <rect x="8" y="-8" width="16" height="16" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/>
        <text x="29" y="5" fontSize="11.5" fill="var(--ink)">male</text>
        <circle cx="76" cy="0" r="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/>
        <text x="89" y="5" fontSize="11.5" fill="var(--ink)">female</text>
        <rect x="140" y="-8" width="16" height="16" fill="var(--accent-deep)" stroke="var(--ink)" strokeWidth="1.6"/>
        <circle cx="170" cy="0" r="8" fill="var(--accent-deep)" stroke="var(--ink)" strokeWidth="1.6"/>
        <text x="184" y="5" fontSize="11.5" fill="var(--ink)">affected (shaded)</text>
      </g>
    </svg>
  );
}

/* Recessive pedigree (phenylketonuria, PKU) — used for teaching only, genotypes shown */
const PED_REC = {
  people: [
    { id: "I-1", x: 110, gen: 1, sex: "m", geno: "Pp" },
    { id: "I-2", x: 200, gen: 1, sex: "f", geno: "Pp" },
    { id: "II-1", x: 60, gen: 2, sex: "m", geno: "P_" },
    { id: "II-2", x: 160, gen: 2, sex: "f", aff: true, geno: "pp" },
    { id: "II-3", x: 250, gen: 2, sex: "m", geno: "P_" },
    { id: "III-1", x: 165, gen: 3, sex: "m", geno: "Pp" },
    { id: "III-2", x: 245, gen: 3, sex: "f", geno: "Pp" },
  ],
  couples: [["I-1", "I-2"], ["II-2", "II-3"]],
  families: [
    { parents: ["I-1", "I-2"], kids: ["II-1", "II-2"] },
    { parents: ["II-2", "II-3"], kids: ["III-1", "III-2"] },
  ],
};

/* Dominant pedigree (brachydactyly, short fingers) — used in the worked example and practice */
const PED_DOM = {
  people: [
    { id: "I-1", x: 110, gen: 1, sex: "m", aff: true },
    { id: "I-2", x: 200, gen: 1, sex: "f" },
    { id: "II-1", x: 80, gen: 2, sex: "m" },
    { id: "II-2", x: 170, gen: 2, sex: "f", aff: true },
    { id: "II-3", x: 270, gen: 2, sex: "m", aff: true },
    { id: "III-1", x: 140, gen: 3, sex: "m", aff: true },
    { id: "III-2", x: 220, gen: 3, sex: "f" },
    { id: "III-3", x: 300, gen: 3, sex: "f", aff: true },
  ],
  couples: [["I-1", "I-2"], ["II-2", "II-3"]],
  families: [
    { parents: ["I-1", "I-2"], kids: ["II-1", "II-2"] },
    { parents: ["II-2", "II-3"], kids: ["III-1", "III-2", "III-3"] },
  ],
};

function PedigreeDomFigure() {
  return (
    <Figure num={5} caption="A family showing brachydactyly (short fingers). Use this pedigree for the worked example and questions below. II-3 married into the family." maxWidth={480}>
      <Pedigree {...PED_DOM} label="Pedigree for brachydactyly over three generations. Generation I: male 1 affected, female 2 unaffected. Generation II: male 1 unaffected, female 2 affected, married to male 3 affected. Generation III: male 1 affected, female 2 unaffected, female 3 affected."/>
    </Figure>
  );
}

/* Gel electrophoresis, parentage of a Tasmanian devil joey */
function GelFigure() {
  const lanes = [
    { name: "Mother", x: 95, bands: [90, 140, 200] },
    { name: "Joey", x: 165, bands: [90, 120, 170, 200] },
    { name: "Male 1", x: 235, bands: [105, 150, 180, 220] },
    { name: "Male 2", x: 305, bands: [120, 135, 170, 230] },
  ];
  return (
    <Figure num={6} caption="DNA profiles from a captive Tasmanian devil family. Each band is a DNA fragment. Every band in the joey's profile must come from either its mother or its father." maxWidth={460}>
      <svg viewBox="0 0 360 270" width="100%" role="img" aria-label="Gel with four lanes: Mother, Joey, Male 1 and Male 2. Wells at the negative end at the top, DNA moves down towards the positive end. The joey's bands each match a band from the mother or from Male 2.">
        <rect x="60" y="40" width="290" height="215" rx="8" fill="var(--bg-2)" stroke="var(--ink-muted)" strokeWidth="1.6"/>
        {lanes.map(l => (
          <g key={l.name}>
            <text x={l.x} y="28" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">{l.name}</text>
            <rect x={l.x - 20} y="46" width="40" height="8" rx="2" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.3"/>
            {l.bands.map(b => <rect key={b} x={l.x - 20} y={b} width="40" height="6" rx="2" fill="var(--accent-deep)"/>)}
          </g>
        ))}
        <text x="30" y="56" fontSize="18" fontWeight="800" fill="var(--ink)" textAnchor="middle">–</text>
        <text x="30" y="252" fontSize="16" fontWeight="800" fill="var(--ink)" textAnchor="middle">+</text>
        <line x1="40" y1="70" x2="40" y2="226" stroke="var(--ink-muted)" strokeWidth="2"/>
        <polygon points="34,224 46,224 40,236" fill="var(--ink-muted)"/>
        <text transform="translate(24 148) rotate(-90)" fontSize="10.5" fill="var(--ink-muted)" textAnchor="middle">smaller pieces move further</text>
      </svg>
    </Figure>
  );
}

/* Allopatric speciation in four panels */
function SpeciationFigure() {
  const panel = (x, y, title, children) => (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="172" height="118" rx="10" fill="var(--card)" stroke="var(--ink-muted)" strokeWidth="1.5"/>
      <text x="10" y="19" fontSize="11.5" fontWeight="800" fill="var(--ink)">{title}</text>
      {children}
    </g>
  );
  const dots = (pts, fill) => pts.map(([a, b], i) => <circle key={i} cx={a} cy={b} r="5" fill={fill} stroke="var(--ink)" strokeWidth="1"/>);
  const mixed = [[40, 60], [62, 80], [106, 52], [106, 85], [128, 62], [50, 95], [118, 98], [140, 80]];
  const land = <ellipse cx="86" cy="76" rx="76" ry="34" fill="var(--bg-2)" stroke="var(--ink-muted)" strokeWidth="1.2"/>;
  const barrier = <path d="M86 40 C 78 55, 96 68, 84 82 C 74 96, 94 104, 86 112" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round"/>;
  return (
    <Figure num={7} caption="How a geographic barrier can lead to new species. Once the two groups can no longer interbreed to produce fertile offspring, they are separate species." maxWidth={460}>
      <svg viewBox="0 0 360 256" width="100%" role="img" aria-label="Four panels. 1: one mixed population. 2: a barrier splits it into two groups. 3: each group changes in its own environment, shown by different colours. 4: two species that cannot interbreed even if the barrier is removed.">
        {panel(6, 6, "1  One population", <>{land}{dots(mixed, "var(--ink-muted)")}</>)}
        {panel(182, 6, "2  A barrier splits it", <>{land}{barrier}{dots(mixed, "var(--ink-muted)")}</>)}
        {panel(6, 132, "3  Groups change separately", <>{land}{barrier}{dots(mixed.filter(p => p[0] < 84), "var(--accent-deep)")}{dots(mixed.filter(p => p[0] >= 84), "var(--card)")}</>)}
        {panel(182, 132, "4  Two species", <>{land}{dots(mixed.filter(p => p[0] < 84), "var(--accent-deep)")}{dots(mixed.filter(p => p[0] >= 84), "var(--card)")}</>)}
      </svg>
    </Figure>
  );
}

/* ============================================================
   INTERACTIVE: Punnett square builder
   ============================================================ */
function PunnettBuilder() {
  const [p1, setP1] = useState("Aa");
  const [p2, setP2] = useState("Aa");
  const opts = ["AA", "Aa", "aa"];
  const kids = [];
  for (const a of p1) for (const b of p2) kids.push(a <= b ? a + b : b + a);
  const n = g => kids.filter(k => k === g).length;
  const dom = n("AA") + n("Aa");
  return (
    <Interactive title="Punnett square builder" subtitle="Pick a genotype for each parent. A (dominant) and a (recessive). Shaded boxes show the recessive phenotype."
      takeaway="Each box is one equally likely outcome, so each box is a 1 in 4 (25%) chance. Two heterozygous parents give the classic 3 : 1 phenotype ratio.">
      <div className="row" style={{ alignItems: "center", marginBottom: 6 }}><strong style={{ minWidth: 72 }}>Parent 1</strong><SegToggle options={opts} value={p1} onChange={setP1}/></div>
      <div className="row" style={{ alignItems: "center", marginBottom: 10 }}><strong style={{ minWidth: 72 }}>Parent 2</strong><SegToggle options={opts} value={p2} onChange={setP2}/></div>
      <PunnettSVG top={p1.split("")} side={p2.split("")} label={`Punnett square for ${p1} crossed with ${p2}`}/>
      <div className="stat-readout" style={{ justifyContent: "center" }}>
        <Stat value={`${n("AA")} : ${n("Aa")} : ${n("aa")}`} label="genotype ratio"/>
        <Stat value={`${dom * 25}%`} label="dominant phenotype"/>
        <Stat value={`${(4 - dom) * 25}%`} label="recessive phenotype"/>
      </div>
      <p className="muted" style={{ textAlign: "center", margin: "4px 0 0", fontSize: "0.88rem" }}>Genotype ratio is in the order AA : Aa : aa.</p>
    </Interactive>
  );
}

/* ============================================================
   SECTION 5.1
   ============================================================ */
function Section1({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.1 DNA structure and function</div>
        <h1>DNA, genes and chromosomes</h1>
        <p className="lead">Know the levels of genetic information and how the shape of DNA lets it store and copy the code.</p>
      </div>

      <DotPoint id="5.1.2" title="DNA, genes, chromosomes and genomes" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li><Term def="Deoxyribonucleic acid: a double-stranded molecule that carries the genetic code as a sequence of bases.">DNA</Term> is the molecule that carries genetic information as a sequence of four bases: A, T, C and G.</li>
            <li>A <Term def="A section of DNA that codes for one protein, which affects a characteristic.">gene</Term> is a section of DNA that codes for one protein. Different versions of the same gene are called <Term def="Different forms of the same gene, e.g. the allele for red eyes and the allele for white eyes in fruit flies.">alleles</Term>.</li>
            <li>A <Term def="A thread-like package of DNA wound around histone proteins. It carries hundreds to thousands of genes.">chromosome</Term> is a thread-like package of DNA wound around histone proteins, so a very long strand fits inside the nucleus. One chromosome carries hundreds to thousands of genes.</li>
            <li>The <Term def="The complete set of DNA (all the chromosomes and genes) of an organism.">genome</Term> is the complete set of DNA in an organism. The human genome is about 3 billion base pairs and about 20 000 genes.</li>
            <li>Human body cells have 46 chromosomes in 23 pairs (one of each pair from each parent). Sex cells (eggs and sperm) have 23, one from each pair.</li>
            <li>Common mistake: a gene is <em>part of</em> a chromosome, not the same thing. Smallest to largest: base → gene → chromosome → genome.</li>
          </ul>
        </Recap>
        <OrganisationFigure/>
        <WorkedExample
          title="Linking the three terms"
          problem="Describe the relationship between DNA, genes and chromosomes. (3 marks)"
          steps={[
            "One mark for each correct link. Start with the smallest idea that the others are built from: DNA is a long molecule whose sequence of bases (A, T, C, G) carries the genetic code.",
            "Next, place the gene: a gene is a particular section of a DNA molecule that codes for one protein.",
            "Finally, the chromosome: a chromosome is a thread-like package of DNA wound around histone proteins, and its DNA holds many genes one after another.",
          ]}
          answer="DNA is a molecule that stores genetic information in its sequence of bases. A gene is a short section of a DNA molecule that codes for a particular protein. A chromosome is a thread-like package of DNA wound around histone proteins, and because its DNA is so long, one chromosome contains many genes."
        />
        <Practice title="DNA, genes and chromosomes">
          <MCQ num={1} question="Which statement best describes a gene?"
            options={[
              "A thread-like package of DNA and histone proteins that becomes visible when a cell divides",
              "A section of DNA that codes for a particular protein",
              "The complete set of DNA in an organism",
              "A single base, such as adenine",
            ]} correct={1}
            explain="A gene is a section of DNA that codes for one protein. The first option is tempting, but it describes a chromosome, which contains many genes. The complete set of DNA is the genome."/>
          <MCQ num={2} question="A dog's body cells each contain 78 chromosomes. How many chromosomes are in one of its sperm cells?"
            options={["78", "156", "39", "23"]} correct={2}
            explain="Sex cells carry one chromosome from each pair, so they have half the body-cell number: 78 ÷ 2 = 39. 23 is the number in human sex cells, not dog sex cells."/>
          <WrittenQ num={3} question="Distinguish between a chromosome and a genome. (2 marks)"
            model="A chromosome is a thread-like package of DNA wound around histone proteins, and it carries many genes. A genome is the complete set of DNA of an organism, which includes all of its chromosomes. So a genome is made up of many chromosomes."/>
          <WrittenQ num={4} question="A student writes: 'A chromosome is just one gene.' Explain why this is incorrect. (2 marks)"
            model="A gene is only a short section of DNA that codes for one protein. A chromosome is a whole DNA molecule that contains hundreds to thousands of genes, so a chromosome is much larger and carries many genes, not one."/>
        </Practice>
        <SelfCheck id="5.1.2" items={[
          "I can define DNA, gene, allele, chromosome and genome in one sentence each.",
          "I can put base, gene, chromosome and genome in order of size.",
          "I can state the number of chromosomes in human body cells and sex cells, and explain why they differ.",
          "I can explain why one chromosome carries many genes.",
        ]}/>
        <NotebookLink href={NB + "#5.1"} label="Learn it in full: 5.1 DNA Structure and Function"/>
      </DotPoint>

      <DotPoint id="5.1.3" title="How the shape of the DNA double helix suits its job" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>DNA is made of <Term def="The building block of DNA: one sugar (deoxyribose), one phosphate and one base.">nucleotides</Term>. Each nucleotide = a sugar (deoxyribose) + a phosphate + a base.</li>
            <li>Two strands twist into a <Term def="The shape of DNA: two strands twisted around each other like a spiral ladder.">double helix</Term> (a twisted ladder). The sides are the <strong>sugar–phosphate backbone</strong>; the rungs are pairs of bases.</li>
            <li><Term def="The rule that A always pairs with T, and C always pairs with G.">Complementary base pairing</Term>: A pairs with T, and C pairs with G. Pairs are held together by weak <strong>hydrogen bonds</strong>.</li>
            <li>Structure → function: the <strong>order of bases</strong> stores the code; the strong backbone keeps the code stable; the weak hydrogen bonds let the strands “unzip” to be copied.</li>
            <li><strong>Replication</strong>: the strands separate, and each acts as a template. Free nucleotides pair up (A–T, C–G), making two identical DNA molecules, each with one old and one new strand.</li>
            <li>Because of pairing, %A = %T and %C = %G in any DNA sample (Chargaff's rule).</li>
            <li>Common mistakes: pairing A with G, or writing U. U (uracil) is only in RNA, never in DNA.</li>
          </ul>
        </Recap>
        <LadderFigure/>
        <WorkedExample
          title="Using base pairing to calculate percentages"
          problem="A DNA sample taken from a wheat plant contains 22% guanine (G). Calculate the percentage of each of the other three bases. (2 marks)"
          steps={[
            "G pairs with C, so %C = %G = 22%.",
            "Together G and C make 22% + 22% = 44%, so A and T make up 100% − 44% = 56%.",
            "A pairs with T, so they are equal: 56% ÷ 2 = 28% each.",
            "Check: 22 + 22 + 28 + 28 = 100%.",
          ]}
          answer="Cytosine 22%, adenine 28%, thymine 28%."
        />
        <ExamTip>
          For <strong>calculate</strong> questions, show each step (pairing rule → subtraction → halve) even when you can do it in your head. A correct method can still earn a mark if you slip on the final number.
        </ExamTip>
        <Practice title="The double helix">
          <MCQ num={5} question="A student was given the DNA strand T G A C C T A G G and wrote its partner strand as A C T G C A T C C. Counting from the left, at which position did the student make a mistake?"
            options={["Position 2", "Position 5", "Position 8", "There is no mistake"]} correct={1}
            explain="Pairing each base in turn (T→A, G→C, A→T, C→G, C→G, T→A, A→T, G→C, G→C) gives A C T G G A T C C. The fifth base on the given strand is C, so its partner must be G, but the student wrote C. Position 2 is tempting because G and C are both there, but G pairs with C, so that one is correct."/>
          <MCQ num={6} question="Which part of a DNA molecule stores the genetic information?"
            options={["The sugar–phosphate backbone", "The order (sequence) of the bases", "The hydrogen bonds between the strands", "The number of twists in the helix"]} correct={1}
            explain="The code is the order of the bases, in the same way a message is the order of the letters. The backbone is important for strength and stability, but it is the same repeating sugar–phosphate pattern in every gene, so it carries no information."/>
          <WrittenQ num={7} question="A sample of bacterial DNA contains 35% thymine. Calculate the percentage of cytosine. Show your working. (2 marks)"
            model="T pairs with A, so A = 35%. A + T = 35 + 35 = 70%. C + G = 100 − 70 = 30%. C pairs with G so they are equal: 30 ÷ 2 = 15%. Cytosine = 15%."/>
          <WrittenQ num={8} question="Describe why both the weak hydrogen bonds and complementary base pairing are important when DNA is copied (replicated). (3 marks)"
            model="The hydrogen bonds between bases are weak, so the two strands can separate (unzip) easily without breaking the strong backbone. Each separated strand then acts as a template. Because of complementary base pairing, only A can join opposite T and only C opposite G, so the new strands are exact copies and the two new DNA molecules are identical to the original."/>
        </Practice>
        <SelfCheck id="5.1.3" items={[
          "I can name the three parts of a nucleotide.",
          "I can label the sugar–phosphate backbone, base pairs and hydrogen bonds on a DNA diagram.",
          "I can write the complementary strand for any DNA sequence.",
          "I can calculate base percentages using A = T and C = G.",
          "I can explain how DNA's structure allows it to be copied exactly.",
        ]}/>
        <NotebookLink href={NB + "#5.1"} label="Learn it in full: 5.1 DNA Structure and Function"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 5.2
   ============================================================ */
function Section2({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.2 Variation and inheritance</div>
        <h1>Mutations, alleles and predicting offspring</h1>
        <p className="lead">The highest-value part of the topic. Practise Punnett squares and pedigrees until they feel automatic.</p>
      </div>

      <DotPoint id="5.2.3" title="Mutations cause variation (helpful, harmful or no effect)" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li>A <Term def="A change in the sequence of bases in DNA.">mutation</Term> is a change in the base sequence of DNA. Mutations happen randomly when DNA is copied, or are caused by <Term def="Something that increases the rate of mutations, such as UV light, X-rays or some chemicals.">mutagens</Term> such as UV light, X-rays and chemicals in cigarette smoke.</li>
            <li>Gene mutations: <strong>substitution</strong> (one base swapped), <strong>insertion</strong> (base added), <strong>deletion</strong> (base removed). Chromosome mutations change whole chromosomes or large sections, e.g. Down syndrome (an extra chromosome 21).</li>
            <li>Every allele that exists today first appeared as a mutation. Sexual reproduction reshuffles alleles into new combinations, but only mutation makes brand-new ones, adding to genetic <Term def="Differences between individuals of the same species.">variation</Term>.</li>
            <li>Effects: <strong>harmful</strong> (protein no longer works, e.g. cystic fibrosis, sickle cell anaemia); <strong>beneficial</strong> (e.g. lactase persistence lets adults digest milk); <strong>minimal / neutral</strong> (in DNA that doesn't code for protein, or the protein still works the same).</li>
            <li>Only mutations in sex cells (gametes) are passed on to offspring. A mutation in a body cell, such as a skin cell damaged by UV, is not inherited.</li>
          </ul>
        </Recap>
        <Practice title="Mutations">
          <MCQ num={9} question="A section of DNA reads TAC GGA TTC. After a mutation it reads TAC GGT TTC. Which type of mutation has occurred?"
            options={["Deletion", "Insertion", "Substitution", "Chromosome mutation"]} correct={2}
            explain="The sequence is still nine bases long, but the sixth base has changed from A to T, so one base has been swapped: a substitution. It is not a deletion or insertion, because no bases were removed or added."/>
          <WrittenQ num={10} question="Using an example for each, describe how a mutation can be harmful, beneficial or have minimal effect on an organism. (3 marks)"
            model="Harmful: a mutation in the CFTR gene produces a protein that does not work, causing cystic fibrosis, where thick mucus builds up in the lungs. Beneficial: a mutation that keeps the lactase gene switched on in adults lets them digest milk, an extra food source. Minimal: a mutation in a section of DNA that does not code for a protein has no effect on the organism's traits."/>
        </Practice>
        <SelfCheck id="5.2.3" items={[
          "I can define mutation and name two mutagens.",
          "I can identify substitution, insertion and deletion from two DNA sequences.",
          "I can give an example of a harmful, a beneficial and a neutral mutation.",
          "I can explain why only mutations in sex cells are inherited.",
        ]}/>
        <NotebookLink href={NB + "#5.2"} label="Learn it in full: 5.2 Variation and Inheritance"/>
      </DotPoint>

      <DotPoint id="5.2.4" title="Genotype, phenotype and Mendel's patterns of inheritance" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li>Each body cell has <strong>two alleles</strong> for each gene, one from each parent.</li>
            <li><Term def="The combination of alleles an organism has, e.g. Rr.">Genotype</Term> = the alleles (e.g. Rr). <Term def="The observable characteristic, e.g. round seeds. Produced by genotype and environment together.">Phenotype</Term> = the characteristic you can observe (e.g. round seeds). Phenotype depends on genotype <em>and</em> the environment.</li>
            <li>A <strong>dominant</strong> allele (capital letter, R) shows in the phenotype whenever it is present. A <strong>recessive</strong> allele (lower case, r) only shows when there are two copies (rr).</li>
            <li><Term def="Having two identical alleles, e.g. RR or rr.">Homozygous</Term> = two identical alleles (RR or rr). <Term def="Having two different alleles, e.g. Rr.">Heterozygous</Term> = two different alleles (Rr). A heterozygous person for a recessive condition is a <strong>carrier</strong>.</li>
            <li>Mendel's pea plants: pure-breeding round × pure-breeding wrinkled → all offspring round. Crossing those offspring together → about 3 round : 1 wrinkled. The two alleles separate when gametes form, so each gamete carries just one.</li>
            <li>Same patterns in animals, e.g. in cattle, hornless (polled, P) is dominant to horned (p).</li>
            <li>Common mistakes: use one letter for both alleles (R and r, not R and W). “Dominant” does not mean “most common” or “better”.</li>
          </ul>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table" style={{ minWidth: 320 }}>
              <thead><tr><th>Genotype</th><th>Name</th><th>Phenotype (pea seeds)</th></tr></thead>
              <tbody>
                <tr><td>RR</td><td>homozygous dominant</td><td>round</td></tr>
                <tr><td>Rr</td><td>heterozygous</td><td>round</td></tr>
                <tr><td>rr</td><td>homozygous recessive</td><td>wrinkled</td></tr>
              </tbody>
            </table>
          </div>
        </Recap>
        <WorkedExample
          title="Explaining a cross between pure-breeding plants"
          problem="In pea plants, the allele for tall stems (T) is dominant to the allele for short stems (t). A pure-breeding tall plant is crossed with a pure-breeding short plant. All the offspring are tall. Explain this result. (3 marks)"
          steps={[
            "Translate 'pure-breeding': it means homozygous. So the tall parent is TT and the short parent is tt.",
            "Gametes: the TT parent can only make T gametes; the tt parent can only make t gametes.",
            "Every offspring therefore receives one T and one t, so every offspring is Tt (heterozygous).",
            "Link genotype to phenotype: T is dominant, so it masks t and every Tt plant is tall.",
          ]}
          answer="The parents are TT and tt. Each offspring gets a T allele from the tall parent and a t allele from the short parent, so they are all Tt. Because T is dominant, it masks the recessive t allele, so all offspring are tall."
        />
        <WorkedExample
          title="The test cross"
          problem="In cattle, hornless (P) is dominant to horned (p). A farmer has a hornless bull and wants to know whether it is PP or Pp. Describe a cross she could do and explain how the results would tell her the bull's genotype. (4 marks)"
          steps={[
            "Choose a partner whose genotype is certain: a horned cow must be pp, because horned is recessive.",
            "If the bull is PP: PP × pp → every calf is Pp, so all calves are hornless.",
            "If the bull is Pp: Pp × pp → half Pp (hornless) and half pp (horned), so about 1 in 2 calves are horned.",
            "Conclusion: even one horned calf proves the bull is Pp. If many calves are all hornless, the bull is very likely PP.",
          ]}
          answer="Cross the bull with several horned (pp) cows. If any calf is horned (pp), it must have received a p allele from the bull, so the bull is Pp (expected 1 hornless : 1 horned). If all of a large number of calves are hornless, the bull is almost certainly PP."
        />
        <Practice title="Genotype and phenotype">
          <MCQ num={11} question="In tomato plants, the allele for a purple stem (A) is dominant to the allele for a green stem (a). Which plant has a green stem?"
            options={["AA", "Aa", "Both Aa and aa", "aa"]} correct={3}
            explain="A recessive phenotype only appears with two recessive alleles, so only aa is green. Aa is tempting, but the dominant A allele masks a, so Aa plants are purple."/>
          <MCQ num={12} question="Which term describes an organism with the genotype Hh?"
            options={["Heterozygous", "Homozygous dominant", "Homozygous recessive", "Pure-breeding"]} correct={0}
            explain="Hh has two different alleles, so it is heterozygous. Pure-breeding means homozygous (HH or hh), so it does not describe Hh."/>
          <MCQ num={13} question="Two pea plants can have the same phenotype but different genotypes. Which pair shows this? (R = round seeds, r = wrinkled seeds)"
            options={["Rr and rr, which both have round seeds", "RR and Rr, which both have round seeds", "RR and rr, which both have wrinkled seeds", "rr and rr, which both have round seeds"]} correct={1}
            explain="RR and Rr both contain the dominant R allele, so both are round, but their genotypes differ. Rr and rr is wrong because rr plants have wrinkled seeds."/>
          <MCQ num={14} question="Which statement about a dominant allele is correct?"
            options={["It is always the most common allele in a population", "It always gives a survival advantage", "It shows in the phenotype even when only one copy is present", "It is only found in homozygous organisms"]} correct={2}
            explain="Dominant means one copy is enough to show in the phenotype. It does not mean common: many dominant alleles, such as the one causing Huntington's disease, are rare."/>
          <WrittenQ num={15} question="Define genotype and phenotype, and explain why two organisms with exactly the same genotype can have different phenotypes. (3 marks)"
            model="Genotype is the combination of alleles an organism has for a gene (e.g. Tt). Phenotype is the characteristic that can be observed (e.g. tall). The phenotype is produced by the genotype and the environment together, so if two genetically identical plants are grown in different conditions, such as one in full sun and one in deep shade, they can grow to different heights even though their genotypes are the same."/>
          <WrittenQ num={16} question="In fruit flies, normal wings (W) are dominant to short, crumpled 'vestigial' wings (w). A fly with normal wings is crossed with a fly with vestigial wings. Half the offspring have normal wings and half have vestigial wings. Deduce the genotype of the normal-winged parent and explain your reasoning. (3 marks)"
            model="The vestigial-winged parent must be ww, so it can only pass on w. Some offspring are vestigial (ww), so they must also have received a w from the normal-winged parent. The normal-winged parent therefore has one W and one w: it is Ww. Check: Ww × ww gives 2 Ww (normal) : 2 ww (vestigial), which is the 1 : 1 ratio observed."/>
        </Practice>
        <SelfCheck id="5.2.4" items={[
          "I can define allele, genotype, phenotype, dominant, recessive, homozygous and heterozygous.",
          "I can write the genotype of a pure-breeding (homozygous) organism from its phenotype.",
          "I can explain Mendel's 3 : 1 result using alleles and gametes.",
          "I can describe how a test cross reveals an unknown genotype.",
          "I can explain why the same genotype can give different phenotypes.",
        ]}/>
        <NotebookLink href={NB + "#5.2"} label="Learn it in full: 5.2 Variation and Inheritance"/>
      </DotPoint>

      <DotPoint id="5.2.5" title="Using Punnett squares and pedigrees to predict inheritance" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li><strong>Punnett square method:</strong> (1) write a key; (2) write the parents' genotypes; (3) split each parent's two alleles into gametes along the edges; (4) fill each box with one allele from the top and one from the side; (5) write the genotype and phenotype ratios.</li>
            <li>Each of the 4 boxes is an equal chance: 1 box = 1/4 = 25%. Ratios are <em>expected</em> results; real numbers vary because each fertilisation is random.</li>
            <li>Key results: Aa × Aa → 1 AA : 2 Aa : 1 aa (3 dominant : 1 recessive). Aa × aa → 1 : 1. AA × anything → all show the dominant phenotype.</li>
            <li>Chance resets for every child. If the first child of two carriers is affected, the next child still has a 1/4 chance.</li>
            <li><Term def="A family tree that shows how a trait is inherited across generations.">Pedigree</Term> symbols: square = male, circle = female, shaded = affected; a horizontal line joins parents and a vertical line leads down to their children. Generations are Roman numerals (I, II, III); individuals are numbered left to right.</li>
            <li><strong>Recessive</strong> clue: two unaffected parents have an affected child, so both parents must be carriers (Aa). <strong>Dominant</strong> clue: two affected parents have an unaffected child, so both parents must be heterozygous.</li>
            <li>To deduce genotypes, start with the people you are sure of (aa for affected in a recessive trait; dd for unaffected in a dominant trait), then work up to parents and down to children.</li>
          </ul>
        </Recap>
        <Figure num={3} caption="Two pea plants heterozygous for seed colour, Yy × Yy (Y = yellow, dominant; y = green). Result: 1 YY : 2 Yy : 1 yy, so 3 yellow : 1 green. The shaded box is the only green outcome." maxWidth={320}>
          <PunnettSVG top={["Y", "y"]} side={["Y", "y"]} label="Punnett square for Yy crossed with Yy. Boxes: YY, Yy, Yy, yy. The yy box is shaded."/>
        </Figure>
        <Figure num={4} caption="A recessive trait (phenylketonuria, PKU; p = PKU allele, P = normal allele). Genotypes worked out are shown under each person; P_ means PP or Pp (cannot be certain). The clue that it is recessive: unaffected I-1 and I-2 have an affected daughter, II-2. Every child of an affected (pp) parent receives a p, so III-1 and III-2 must be carriers. II-3 married into the family." maxWidth={480}>
          <Pedigree {...PED_REC} showGeno label="Pedigree for phenylketonuria over three generations with genotypes. Generation I: male 1 Pp and female 2 Pp. Generation II: their children are male 1, P_, and affected female 2, pp; female 2 is partnered with male 3, P_, who married into the family. Generation III: their children are male 1, Pp, and female 2, Pp, both unaffected."/>
        </Figure>
        <PunnettBuilder/>
        <WorkedExample
          title="A full Punnett square answer"
          problem="Two pea plants that are heterozygous for seed colour (Yy) are crossed. Yellow (Y) is dominant to green (y). (a) State the expected genotype ratio. (b) What is the probability that a seed is green? (c) What percentage of the seeds are expected to be homozygous? (4 marks)"
          steps={[
            "Key: Y = yellow (dominant), y = green (recessive). Parents: Yy × Yy.",
            "Gametes: each parent makes Y and y gametes. Put Y, y along the top and Y, y down the side.",
            "Fill the boxes: YY, Yy, Yy, yy (see Figure 3).",
            "(a) Count genotypes: 1 YY : 2 Yy : 1 yy.",
            "(b) Only yy is green: 1 box out of 4 = 1/4 = 25%.",
            "(c) Homozygous means two identical alleles: YY and yy = 2 boxes out of 4 = 50%.",
          ]}
          answer="(a) 1 YY : 2 Yy : 1 yy. (b) 1/4 (25%). (c) 50% are homozygous (YY or yy)."
        />
        <PedigreeDomFigure/>
        <WorkedExample
          title="Reading a dominant pedigree"
          problem="Use Figure 5. (a) Is brachydactyly caused by a dominant or a recessive allele? Justify your answer. (b) Using D and d, give the genotypes of II-2 and II-3. (4 marks)"
          steps={[
            "Look for the 'tell-tale' family: II-2 and II-3 are both affected, but their daughter III-2 is unaffected.",
            "Test the 'recessive' idea: if the trait were recessive, both affected parents would have two recessive alleles, so they could only pass on the recessive allele and every child would be affected. III-2 is unaffected, so the trait cannot be recessive. It is dominant.",
            "Key: D = brachydactyly (dominant), d = normal fingers. Unaffected III-2 must be dd.",
            "III-2 received one d from each parent, so II-2 and II-3 each carry a d. They are affected, so each also has a D.",
          ]}
          answer="(a) Dominant: two affected parents (II-2 and II-3) have an unaffected child (III-2), so both parents must carry a hidden normal allele. A recessive trait could not do this. (b) II-2 is Dd and II-3 is Dd."
        />
        <ExamTip>
          In pedigree questions, marks come from <strong>naming the evidence</strong>. Don't just say “it is recessive”: quote the individuals, e.g. “I-1 and I-2 are unaffected but their daughter II-2 is affected”. For probabilities, show the Punnett square and give the answer as a fraction or percentage.
        </ExamTip>
        <Practice title="Punnett squares and pedigrees">
          <MCQ num={17} question="In Figure 5, what is the genotype of III-2?"
            options={["DD", "Dd", "dd", "It cannot be determined"]} correct={2}
            explain="Brachydactyly is dominant, so anyone without it cannot carry D: III-2 must be dd. 'Cannot be determined' is tempting, but that only applies to affected people (who could be DD or Dd), not unaffected ones."/>
          <MCQ num={18} question="In Figure 5, what is the probability that the next child of II-2 and II-3 will have brachydactyly?"
            options={["25%", "50%", "75%", "100%"]} correct={2}
            explain="Dd × Dd gives DD, Dd, Dd, dd. Three of the four boxes contain D, so 3/4 = 75%. 25% is the chance of an unaffected (dd) child, not an affected one."/>
          <MCQ num={19} question="In pea plants, green pods (G) are dominant to yellow pods (g). A Gg plant is crossed with a gg plant. What fraction of the offspring are expected to have yellow pods?"
            options={["1/4", "1/2", "3/4", "None of them"]} correct={1}
            explain="Gg × gg gives Gg, Gg, gg, gg. Two of the four boxes are gg (yellow), so 2/4 = 1/2. 1/4 is the result for a Gg × Gg cross, not this one."/>
          <WrittenQ num={20} question="Cystic fibrosis is caused by a recessive allele (f). Two parents who do not have cystic fibrosis have a child who does. (a) State the genotypes of both parents. (b) Use a Punnett square to find the probability that their next child will be a carrier. (4 marks)"
            model="(a) The child has cystic fibrosis, so it is ff and received one f from each parent. Neither parent is affected, so each also has an F. Both parents are Ff. (b) Ff × Ff: gametes F and f from each parent. Boxes: FF, Ff, Ff, ff. Carriers are heterozygous (Ff): 2 boxes out of 4 = 1/2, so there is a 50% chance the next child is a carrier."/>
          <WrittenQ num={21} question="Two students model a cross between two tomato plants that are heterozygous for fruit colour (Rr; red R is dominant to yellow r). Each student tosses two coins at once: heads = R, tails = r, and two tails = a yellow-fruited plant. Mia does 12 double tosses and gets 6 yellow. Kai does 400 double tosses and gets 97 yellow. (a) Calculate how many yellow results Kai should expect. (b) Explain why Kai's result is much closer to the expected ratio than Mia's. (3 marks)"
            model="(a) Rr × Rr gives RR, Rr, Rr, rr, so the chance of rr (two tails) is 1/4. Expected yellow = 1/4 × 400 = 100, and Kai got 97, very close. (b) Each toss, like each fertilisation, is random, so a small sample can easily drift far from 1/4 by chance: Mia's 6 out of 12 is 1/2. With many more trials the random ups and downs cancel out, so Kai's large sample gives a proportion (97/400 ≈ 0.24) very close to the expected 1/4."/>
          <WrittenQ num={22} question="Using Figure 5, explain why the genotype of III-1 cannot be determined with certainty. (2 marks)"
            model="III-1 is affected, so he has at least one dominant D allele. His parents are both Dd, so he could have received D from both (DD) or D from one and d from the other (Dd). Both genotypes give the same phenotype, so the pedigree cannot tell them apart."/>
        </Practice>
        <SelfCheck id="5.2.5" items={[
          "I can draw a Punnett square and state genotype and phenotype ratios.",
          "I can turn a Punnett square into a probability or an expected number of offspring.",
          "I can read pedigree symbols and number individuals correctly.",
          "I can decide whether a trait is dominant or recessive by quoting evidence from a pedigree.",
          "I can deduce genotypes of individuals in a pedigree and say when a genotype is uncertain.",
        ]}/>
        <NotebookLink href={NB + "#5.2"} label="Learn it in full: 5.2 Variation and Inheritance"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 5.3
   ============================================================ */
function Section3({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.3 Genetic technologies</div>
        <h1>Reading, copying and changing DNA</h1>
        <p className="lead">Know what each technology does, then be ready to weigh up its benefits and risks.</p>
      </div>

      <DotPoint id="5.3.1" title="Current and emerging genetic technologies" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li><strong><Term def="Polymerase chain reaction: a technique that makes millions of copies of a small piece of DNA.">PCR</Term></strong> copies a tiny DNA sample millions of times using repeated heating and cooling (about 95 °C to separate strands, about 55 °C for primers to attach, about 72 °C for an enzyme to build new strands). Used in virus tests and forensics.</li>
            <li><strong>Gel electrophoresis / DNA profiling</strong>: DNA is cut into fragments by enzymes and placed in wells in a gel. An electric current pulls the negatively charged DNA towards the positive end; smaller fragments move further. The band pattern is a DNA profile, unique to each person (except identical twins).</li>
            <li><strong>Recombinant DNA / genetic modification (GM)</strong>: a gene is cut from one organism and inserted into another, often using a bacterial <Term def="A small circle of DNA in bacteria, used to carry a new gene into a cell.">plasmid</Term>. Example: bacteria with the human insulin gene make human insulin.</li>
            <li><strong><Term def="A gene-editing tool: a guide RNA leads the Cas9 enzyme to an exact DNA sequence, where it cuts so genes can be removed, repaired or added.">CRISPR-Cas9</Term></strong>: a guide molecule leads the Cas9 enzyme to an exact DNA sequence, which it cuts, so scientists can delete, repair or insert genes.</li>
            <li><strong><Term def="Treating a genetic disorder by delivering a working copy of a gene into a patient's cells.">Gene therapy</Term></strong>: a working copy of a gene is delivered into a patient's cells, often carried by a harmless virus, to treat a genetic disorder.</li>
            <li><strong><Term def="Producing genetically identical copies of an organism, cell or gene.">Cloning</Term></strong>: making genetically identical copies, e.g. Dolly the sheep (1996, made by putting a body-cell nucleus into an empty egg cell) or growing plants from cuttings.</li>
          </ul>
        </Recap>
        <GelFigure/>
        <ExamTip>
          With a DNA profile, go band by band: every band in the offspring must match a band in the mother <em>or</em> the father. A possible father who is missing even one of the non-mother bands can be ruled out.
        </ExamTip>
        <Practice title="Genetic technologies">
          <MCQ num={23} question="Use Figure 6. Which male is most likely to be the joey's father?"
            options={["Male 1", "Male 2", "Both males are equally likely", "Neither male could be the father"]} correct={1}
            explain="Two of the joey's bands match its mother. The other two bands match bands in Male 2's profile. Male 1 has neither of these bands, so he can be ruled out."/>
          <MCQ num={24} question="Police find a single hair at a crime scene. Which technology would scientists use first to make enough DNA to analyse?"
            options={["Gel electrophoresis", "CRISPR-Cas9", "PCR", "Cloning"]} correct={2}
            explain="PCR copies a tiny DNA sample millions of times, so there is enough to test. Gel electrophoresis is tempting, but it separates DNA fragments; it can only be done once there is enough DNA."/>
        </Practice>
        <SelfCheck id="5.3.1" items={[
          "I can describe what PCR, gel electrophoresis, recombinant DNA, CRISPR, gene therapy and cloning each do.",
          "I can explain why smaller DNA fragments travel further in a gel.",
          "I can use a DNA profile to identify a parent or match a sample.",
        ]}/>
        <NotebookLink href={NB + "#5.3"} label="Learn it in full: 5.3 Genetic Technologies"/>
      </DotPoint>

      <DotPoint id="5.3.2" title="Uses of genetic technology in conservation, farming, industry and medicine: benefits and risks" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table" style={{ minWidth: 560 }}>
              <thead><tr><th>Area</th><th>Example</th><th>Benefits</th><th>Risks / concerns</th></tr></thead>
              <tbody>
                <tr><td><strong>Conservation</strong></td><td>DNA profiling in captive breeding (e.g. Tasmanian devils); environmental DNA (eDNA) from water samples</td><td>Pair unrelated animals to keep genetic diversity; detect rare species without catching them</td><td>Expensive; doesn't fix habitat loss; possible contamination of samples</td></tr>
                <tr><td><strong>Agriculture</strong></td><td>Herbicide-tolerant GM canola; golden rice with extra vitamin A precursor</td><td>Higher yields, easier weed control, better nutrition</td><td>Genes may spread to weeds or wild relatives; weeds can evolve resistance; seed costs and ownership (patents)</td></tr>
                <tr><td><strong>Industry</strong></td><td>GM microbes making enzymes for laundry detergents, rennet for cheese, biofuels</td><td>Cheaper, purer products in large amounts; fewer animal products needed</td><td>GM microbes escaping; a few companies controlling the technology</td></tr>
                <tr><td><strong>Medicine</strong></td><td>Human insulin from GM bacteria; gene therapy; CRISPR treatment for sickle cell disease; PCR diagnosis</td><td>Treats or even cures disease; reliable supply of medicines</td><td>Unknown long-term effects; unintended (off-target) edits; very high cost; privacy of genetic data</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>Discuss</strong> = give points for <em>and</em> against (benefits and risks). <strong>Evaluate</strong> = weigh them up and finish with a clear judgement.</li>
            <li>Strong answers name a specific example and explain <em>why</em> each point is a benefit or a risk, rather than just listing words like “cheaper” or “dangerous”.</li>
          </ul>
        </Recap>
        <WorkedExample
          title="Discussing a medical application"
          problem="Discuss the use of genetically modified bacteria to produce human insulin for people with diabetes. (4 marks)"
          steps={[
            "'Discuss' needs both sides, so plan two benefits and two risks or limits, each with a reason.",
            "Benefit 1: the bacteria carry the human insulin gene, so the insulin is identical to human insulin and causes fewer allergic reactions than insulin taken from pigs or cattle.",
            "Benefit 2: bacteria reproduce very quickly, so large amounts can be made reliably, without relying on animals from slaughterhouses.",
            "Risk / limit: the GM bacteria must be contained so they don't escape, and the factories and purification are expensive, which may make insulin costly in poorer countries.",
            "Optional link to finish: overall the benefits are large because millions of people rely on insulin every day.",
          ]}
          answer="Inserting the human insulin gene into bacteria means the insulin made is identical to human insulin, so it causes fewer allergic reactions than animal insulin. Bacteria multiply rapidly, so large, reliable supplies can be produced without using animals. However, the GM bacteria must be kept contained to avoid release into the environment, and production is costly, which may limit access in poorer countries. Overall, the benefits to the millions of people with diabetes are very large."
        />
        <WorkedExample
          title="Discussing an agricultural application"
          problem="Canola has been genetically modified to tolerate a herbicide (weed killer), so farmers can spray the whole field and kill only the weeds. Discuss one benefit and two risks of growing herbicide-tolerant canola. (3 marks)"
          steps={[
            "Benefit, with a reason: weeds compete with the crop for light, water and nutrients; killing them without harming the canola increases yield.",
            "Risk 1, with a reason: pollen can carry the herbicide-tolerance gene to related wild plants, creating weeds that are hard to kill.",
            "Risk 2, with a reason: spraying one herbicide over and over is a strong selection pressure, so resistant weeds can evolve and the herbicide stops working.",
          ]}
          answer="Benefit: farmers can kill competing weeds without harming the crop, so the canola gets more light, water and nutrients and yields increase. Risk: pollen may transfer the tolerance gene to related wild plants, creating 'superweeds'. Risk: heavy use of the same herbicide selects for resistant weeds, so over time the herbicide becomes less effective."
        />
        <ExamTip>
          Read the verb. <strong>Discuss</strong>: both sides, no judgement needed. <strong>Evaluate</strong> or <strong>assess</strong>: both sides, then a final sentence that clearly states your judgement and the main reason for it.
        </ExamTip>
        <Practice title="Applications, benefits and risks">
          <MCQ num={25} question="Which of these is an application of genetic technology in industry?"
            options={["DNA testing of seized shark fins to identify protected species", "PCR used to diagnose a viral infection", "GM microbes producing enzymes used in laundry detergents", "Golden rice modified to contain a vitamin A precursor"]} correct={2}
            explain="Using GM microbes to manufacture a product, such as detergent enzymes, is an industrial use. Shark-fin testing is conservation, PCR diagnosis is medicine and golden rice is agriculture."/>
          <MCQ num={26} question="Which is a risk scientists often raise about herbicide-tolerant GM crops?"
            options={["The herbicide-tolerance gene could spread to related wild plants through pollen", "People who eat the crop become resistant to herbicides", "The crop can no longer make seeds", "The crop can no longer photosynthesise"]} correct={0}
            explain="Pollen can carry the gene to related plants, possibly creating weeds that are hard to control. Eating the crop does not transfer genes into people's cells, so the second option is a common misconception."/>
          <MCQ num={27} question="Why is insulin made by GM bacteria usually preferred to insulin extracted from pigs or cattle?"
            options={["It permanently cures type 1 diabetes", "It is identical to human insulin and can be made in large amounts", "It does not need to be injected", "It changes the patient's genes so they make their own insulin"]} correct={1}
            explain="The bacteria use the human gene, so the insulin is the same as human insulin, and bacteria can produce it in large quantities. It is a treatment, not a cure, so patients still need regular doses."/>
          <WrittenQ num={28} question="Gene therapy has been used to restore some sight to people with an inherited form of blindness. Discuss one benefit and two risks of gene therapy. (3 marks)"
            model="Benefit: delivering a working copy of the faulty gene can treat the cause of the disorder, not just the symptoms, so one treatment may last for years. Risk: the virus used to carry the gene could trigger an immune reaction, and some types of virus can insert the gene in the wrong place in the DNA, causing new problems. Risk: the treatment is new, so long-term effects are unknown, and it is extremely expensive, so not everyone who needs it can access it."/>
          <WrittenQ num={29} question="The platypus is hard to see because it is active at night and lives in murky water. Explain how a genetic technology could help scientists find out where platypuses live, and identify one limitation of this method. (3 marks)"
            model="Platypuses shed skin cells and other material into the water, leaving traces of their DNA (environmental DNA, eDNA). Scientists can collect water samples from creeks and use PCR to copy and detect platypus DNA, showing which creeks platypuses live in without having to see or catch them. Limitation: DNA can be carried downstream or last for a while in the water, so a positive result does not prove a platypus is living at that exact spot right now, and it does not tell how many there are."/>
          <WrittenQ num={30} question="Golden rice has been genetically modified to produce a precursor of vitamin A. Evaluate the use of golden rice to reduce vitamin A deficiency in communities where rice is the main food. (5 marks)"
            model="Benefits: vitamin A deficiency causes blindness and weakens the immune system, especially in children. Because rice is already the main food, golden rice could deliver vitamin A without people changing their diet, and farmers can save and replant the seed. Risks and limitations: some people distrust GM food, so it may not be accepted; the modified genes could spread to other rice varieties by pollen; and it does not fix the underlying problem of poor diet variety, so other foods and supplements are still needed. Judgement: overall, golden rice is a worthwhile tool because it targets a serious health problem cheaply through a food people already eat, as long as it is used alongside other measures and its spread to other crops is monitored."/>
        </Practice>
        <SelfCheck id="5.3.2" items={[
          "I can give one example of genetic technology in each of conservation, agriculture, industry and medicine.",
          "I can explain at least one benefit and one risk for each example.",
          "I can tell the difference between a 'discuss' and an 'evaluate' answer.",
          "I can write an evaluation that ends with a justified judgement.",
        ]}/>
        <NotebookLink href={NB + "#5.3"} label="Learn it in full: 5.3 Genetic Technologies"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 5.4
   ============================================================ */
function Section4({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.4 Evolution</div>
        <h1>Natural selection and new species</h1>
        <p className="lead">Learn the steps of natural selection in order, then practise applying them to examples you have never seen.</p>
      </div>

      <DotPoint id="5.4.1" title="Natural selection and isolation lead to evolution and new species" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li><Term def="The process where individuals with inherited traits better suited to their environment survive and reproduce more, so those traits become more common over generations.">Natural selection</Term> in five steps:
              <ol style={{ margin: "4px 0 0", paddingLeft: "1.3em" }}>
                <li><strong>Variation</strong>: individuals in a population differ, because of mutations and sexual reproduction.</li>
                <li><strong>Selection pressure</strong>: something in the environment (predators, disease, climate, limited food, a chemical such as an antibiotic) means not all individuals survive. More offspring are produced than can survive, so there is competition.</li>
                <li><strong>Survival and reproduction</strong>: individuals with a helpful variation are more likely to survive and reproduce.</li>
                <li><strong>Inheritance</strong>: they pass the allele for the helpful trait to their offspring.</li>
                <li><strong>Change over generations</strong>: the helpful allele becomes more common in the population.</li>
              </ol>
            </li>
            <li>Populations evolve, not individuals. Organisms do not “try” or “need” to adapt: mutations happen randomly, then the environment selects.</li>
            <li>A <Term def="A group of organisms that can interbreed to produce fertile offspring.">species</Term> is a group that can interbreed to produce fertile offspring.</li>
            <li><Term def="The formation of a new species.">Speciation</Term> by isolation: (1) a barrier (sea, river, mountain range, rising land) splits a population; (2) no gene flow between the groups; (3) different selection pressures and different random mutations change each group; (4) after many generations they can no longer interbreed to produce fertile offspring.</li>
          </ul>
        </Recap>
        <SpeciationFigure/>
        <WorkedExample
          title="Antibiotic-resistant bacteria"
          problem="A patient takes an antibiotic for a bacterial infection but stops after two days because they feel better. Later the infection returns and the antibiotic no longer works. Explain, using natural selection, how the bacteria became resistant. (4 marks)"
          steps={[
            "Variation: in the large bacterial population, a few bacteria by chance carry a mutation that makes them resistant to the antibiotic.",
            "Selection pressure: the antibiotic kills the non-resistant bacteria. Stopping early means the resistant ones are not all killed.",
            "Survival and reproduction: the resistant bacteria survive and divide rapidly with less competition.",
            "Inheritance and change: they pass the resistance allele to their offspring, so the population becomes mostly resistant and the antibiotic no longer works.",
          ]}
          answer="Within the bacterial population there was variation: a few bacteria had a random mutation giving resistance. The antibiotic acted as a selection pressure, killing the non-resistant bacteria, and stopping the course early left the resistant survivors. These survived and reproduced, passing the resistance allele to their offspring. Over many generations, resistant bacteria became most of the population, so the antibiotic no longer worked."
        />
        <WorkedExample
          title="Speciation across a land bridge"
          problem="About 3 million years ago, the Isthmus of Panama rose out of the sea, joining North and South America and separating the Caribbean Sea from the Pacific Ocean. Pairs of very similar snapping shrimp species now live on either side. When shrimp from opposite sides are put together, they rarely mate. Explain how one original population could have become two species. (4 marks)"
          steps={[
            "Name the isolating barrier: the land bridge split one shrimp population into a Caribbean group and a Pacific group.",
            "No gene flow: the two groups could no longer interbreed, so alleles were not shared between them.",
            "Different changes: the two seas have different conditions (e.g. temperature, food, predators), so different selection pressures acted, and different random mutations arose in each group.",
            "Outcome: over millions of years the groups changed so much that they no longer mate to produce fertile offspring, so they are now separate species.",
          ]}
          answer="The rising Isthmus of Panama geographically isolated the shrimp into two groups with no interbreeding (no gene flow). Each group faced different selection pressures in its own sea and gained different random mutations, so natural selection changed the groups in different ways. After many generations, they became so different that they no longer interbreed to produce fertile offspring, so they are now two separate species."
        />
        <ExamTip>
          For <strong>explain</strong> questions on natural selection, use the five steps in order and name each one (variation → selection pressure → survival and reproduction → inheritance → change over generations). Marks are usually given for each step tied to the example. Avoid “they needed to”, “they got used to it” or “they adapted during their life”.
        </ExamTip>
        <Practice title="Natural selection and speciation">
          <MCQ num={31} question="On a small island in the Galápagos, a severe drought killed most of the plants that make small, soft seeds, leaving mainly large, hard seeds. In the next generation of medium ground finches, the average beak was deeper and stronger than before the drought. Which is the best explanation?"
            options={["Finches strengthened their beaks by cracking hard seeds, then passed the stronger beaks on to their chicks", "The drought caused mutations for deeper beaks", "Finches with deeper beaks chose to stay on the island while the others flew away", "Finches that already had deeper beaks could crack the large, hard seeds, so more of them survived and bred, passing on the alleles for deep beaks"]} correct={3}
            explain="Beak depth already varied and is inherited. The food shortage was the selection pressure: birds with deeper beaks could eat the hard seeds, so more of them survived to breed, and the alleles for deep beaks became more common in the next generation. The first option is tempting, but a beak strengthened by use during a bird's life does not change its alleles, so it is not inherited."/>
          <MCQ num={32} question="Cane toads were released in Queensland in 1935 and have spread across northern Australia. Toads at the front of the invasion have longer legs than toads in older populations. What is the most likely explanation?"
            options={["Toads that hopped further grew longer legs and passed them on", "Toads with longer legs move faster, so they reach new areas first and breed with each other there", "All the toads mutated at the same time because of the hot climate", "Long legs were not inherited, so they appeared by chance each generation"]} correct={1}
            explain="Leg length varies and is inherited. The fastest, longest-legged toads arrive first at the front, breed with each other, and pass long legs on, so leg length increases there. The first option is wrong because characteristics gained by use during a lifetime are not inherited."/>
          <MCQ num={33} question="Which observation is the best evidence that two populations have become separate species?"
            options={["They look different from each other", "They live in different places", "They can no longer interbreed to produce fertile offspring", "They eat different foods"]} correct={2}
            explain="A species is defined as a group that can interbreed to produce fertile offspring, so losing this ability is the key test. Looking different is tempting, but many members of the same species look very different, such as dog breeds."/>
          <WrittenQ num={34} question="In 1950 the myxoma virus was released in Australia to control rabbits. At first it killed more than 99% of infected rabbits. Within about ten years, a much smaller proportion of infected rabbits died. Explain this change using natural selection. (4 marks)"
            model="Variation: in the huge rabbit population, a small number of rabbits had genetic variations that made them more resistant to the virus. Selection pressure: the virus killed almost all non-resistant rabbits. Survival and reproduction: the resistant rabbits survived and bred. Inheritance: they passed their resistance alleles to their offspring. Over many generations, resistant rabbits became more common in the population, so a smaller proportion of infected rabbits died. (The virus also evolved: less deadly strains spread further, because rabbits infected with them lived longer.)"/>
          <WrittenQ num={35} question="A farmer sprays the same insecticide on a crop every year. After several years, the spray kills far fewer insects. A student says, 'The insects got used to the spray.' Explain why this statement is incorrect and give the correct explanation. (3 marks)"
            model="The statement is incorrect because individual insects cannot become used to a poison or change their genes during their lives. Instead, a few insects already had a random mutation that made them resistant. The spray killed the non-resistant insects, so the resistant ones survived, reproduced and passed on the resistance allele. Over many generations, most of the insect population became resistant."/>
          <WrittenQ num={36} question="A population of lizards lives on a large island. Rising sea levels split the island into two smaller islands: one wet and forested, the other dry and rocky. Describe how two separate species of lizard could form over a long time. (4 marks)"
            model="The sea acts as a geographic barrier, isolating the lizards into two groups so they cannot interbreed (no gene flow). The two islands have different environments, so different selection pressures act: for example, lizards suited to climbing trees may survive better in the forest, while lizards suited to hot, dry rocks survive better on the other island. Different random mutations also arise in each group. Over many generations, natural selection makes the two groups more and more different, until they could no longer interbreed to produce fertile offspring even if they met. They are then two separate species."/>
        </Practice>
        <SelfCheck id="5.4.1" items={[
          "I can list the five steps of natural selection in order.",
          "I can apply the five steps to a new example, such as resistance in bacteria or insects.",
          "I can explain why 'they got used to it' or 'they needed to' is wrong.",
          "I can define a species.",
          "I can describe how geographic isolation can lead to a new species.",
        ]}/>
        <NotebookLink href={NB + "#5.4"} label="Learn it in full: 5.4 The Theory of Evolution and Evidence of Natural Selection"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 5.5
   ============================================================ */
function Section5({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.5 Genetics in context</div>
        <h1>Arguing about genetic technology</h1>
        <p className="lead">Science tells us what we <em>can</em> do; ethics asks what we <em>should</em> do. Learn three frameworks and how to build an argument with them.</p>
      </div>

      <DotPoint id="5.5.1" title="Using ethical frameworks to argue about a genetic technology" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li><strong>Consequences (utilitarian)</strong>: the right choice gives the greatest benefit and least harm for the greatest number of people. Weigh up the outcomes.</li>
            <li><strong>Duty / rights-based</strong>: some actions are right or wrong no matter the outcome. Respect people's rights, such as <Term def="Agreeing to take part, or to have your cells or data used, after being told clearly what will happen and the risks.">informed consent</Term>, privacy and the right to choose; follow duties such as “do no harm” and telling the truth.</li>
            <li><strong>Virtue ethics</strong>: what would a person of good character (honest, fair, caring, responsible) do?</li>
            <li>An evidence-based argument: state your position → give scientific evidence → apply a framework by name → consider the other side → finish with a conclusion.</li>
            <li>The syllabus case study is the <strong>HeLa cell line</strong>. Read about it in the notebook; the frameworks above are the tools for discussing it.</li>
          </ul>
        </Recap>
        <WorkedExample
          title="Two frameworks, one technology"
          problem="Scientists have designed 'gene drive' mosquitoes that spread a gene through wild populations that makes female mosquitoes infertile, which could greatly reduce the mosquitoes that spread malaria. The World Health Organization estimates that malaria kills about 600 000 people each year, mostly young children in Africa. Use two ethical frameworks to argue whether gene-drive mosquitoes should be released. (5 marks)"
          steps={[
            "State your position first, so the marker knows where the argument is going: e.g. 'Gene-drive mosquitoes should be released, but only after careful trials and community agreement.'",
            "Apply framework 1 by name, with evidence: consequences (utilitarian). Benefit: hundreds of thousands of lives could be saved each year. Harm: removing a mosquito species could affect food webs (e.g. animals that eat mosquitoes or larvae), and a gene drive spreads by itself and cannot easily be recalled.",
            "Apply framework 2 by name: rights-based. Communities where the mosquitoes would be released have a right to be informed and to agree, because a gene drive will spread across borders and affect people who did not choose it.",
            "Consider the other side, then conclude, linking back to both frameworks.",
          ]}
          answer="I think gene-drive mosquitoes should be released, but only after careful trials and with community consent. Using a consequences framework, the benefit is enormous: malaria kills about 600 000 people a year, so greatly reducing mosquito numbers could save many lives. The possible harms, such as effects on animals that feed on mosquitoes, seem smaller, but they are uncertain and a gene drive cannot easily be reversed, so field trials are needed first. Using a rights-based framework, people in affected regions have a right to informed consent, because the gene will spread across borders and affect communities that did not choose it. So release is justified only if the evidence shows little ecological harm and the communities involved agree."
        />
        <ExamTip>
          Always <strong>name</strong> the framework you are using and show how it leads to your point (“From a utilitarian view, … because …”). Use at least one piece of scientific evidence, and finish with a clear conclusion.
        </ExamTip>
        <Practice title="Ethical frameworks">
          <MCQ num={37} question="A scientist argues that a new gene therapy should be approved because it will save thousands of lives, even though a few patients may suffer side effects. Which ethical framework is she using?"
            options={["Rights-based", "Consequences (utilitarian)", "Virtue ethics", "None: this is not an ethical argument"]} correct={1}
            explain="She is weighing total benefits (lives saved) against total harms (side effects), which is a consequences-based approach. A rights-based argument would focus on whether each patient's rights, such as consent, are respected, whatever the overall outcome."/>
          <MCQ num={38} question="Which statement uses a duty / rights-based framework?"
            options={["More people will benefit from genetic testing than will be harmed by it", "A caring and honest doctor would explain the test results kindly", "A company should do whatever makes the most money", "A person's genetic test results must not be given to an insurance company without their consent"]} correct={3}
            explain="It is based on a right (privacy and consent) that must be respected regardless of outcome. The first statement weighs outcomes (utilitarian) and the second asks what a good person would do (virtue), while making money is not an ethical framework."/>
          <WrittenQ num={39} question="Parents of a child with a serious inherited blood disorder use IVF and genetic testing of embryos to choose an embryo that is a tissue match. Stem cells from the new baby's umbilical cord could then treat their sick child. Use a consequences framework and a rights-based framework to discuss this decision. (4 marks)"
            model="Consequences: the sick child could be cured by a matching stem-cell transplant, which is a large benefit, and collecting cord blood causes no harm to the new baby. A possible harm is that embryos that are not a match are not used, and the new child may later feel they were created mainly to help a sibling. Rights-based: the new baby cannot give consent to being selected or to having cells used, and some people believe every embryo has a right not to be discarded. However, the parents also have a right to make reproductive choices and a duty to care for their sick child. Considering both, the decision has a strong benefit but raises real rights concerns, so it needs careful rules and counselling."/>
          <WrittenQ num={40} question="A company plans to use cloning and gene editing to bring back the thylacine (Tasmanian tiger), which became extinct in 1936. Construct an evidence-based argument for or against this project, using virtue ethics and one other ethical framework. (5 marks)"
            model="Position: I am against the project going ahead now. Virtue ethics: a responsible and caring society might want to undo a harm humans caused, since hunting helped drive the thylacine extinct. But a responsible scientist would also be honest that a gene-edited animal would only be a close copy and would face risks to its welfare, born without parents of its own species. Consequences: the money and effort could instead protect endangered species that still exist, such as Tasmanian devils, which would help more animals; a released animal could also affect today's ecosystems in ways we cannot predict. The other side: the research may develop gene-editing tools that help conservation of living species. Conclusion: because a responsible approach puts welfare and living species first, and the overall benefits are uncertain, the project should not go ahead until the science is proven and living species are protected."/>
        </Practice>
        <SelfCheck id="5.5.1" items={[
          "I can describe the consequences, duty/rights and virtue frameworks in one sentence each.",
          "I can identify which framework an argument is using.",
          "I can build an argument: position, evidence, named framework, other side, conclusion.",
          "I can briefly explain why the HeLa cell line raises ethical questions.",
        ]}/>
        <NotebookLink href={NB + "#5.5"} label="Learn it in full: 5.5 Genetics and Evolutionary Change in Context"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   MOUNT
   ============================================================ */
mountTopicApp({
  year: 10,
  topicTitle: "Genetics and Evolutionary Change",
  branch: "biology",
  heroImage: "img/hero.webp",
  strand: "Yearly Exam Revision · Stage 5",
  accent: "pink",
  storageKey: "y10.rev-genetics",
  hubHref: "../",
  intro: "Revise the parts of genetics and evolution most likely to earn you marks: DNA and its structure, mutations, Punnett squares and pedigrees, genetic technologies and their uses, natural selection and speciation, and arguing about genetic technology with ethical frameworks. Each part has a quick recap, worked examples and practice questions with model answers.",
  glossary: {
    "DNA": "Deoxyribonucleic acid: a double-stranded molecule that carries the genetic code as a sequence of the bases A, T, C and G.",
    "nucleotide": "The building block of DNA: a deoxyribose sugar, a phosphate group and a base.",
    "double helix": "The shape of DNA: two strands twisted around each other like a spiral ladder.",
    "complementary base pairing": "The rule that A always pairs with T, and C always pairs with G.",
    "sugar–phosphate backbone": "The sides of the DNA ladder, made of alternating deoxyribose sugars and phosphate groups.",
    "replication": "Copying DNA: the strands separate and each acts as a template for a new strand.",
    "gene": "A section of DNA that codes for one protein.",
    "allele": "One version of a gene, e.g. the allele for tall stems or the allele for short stems.",
    "chromosome": "A thread-like package of DNA wound around histone proteins, carrying many genes. Humans have 46 in each body cell.",
    "genome": "The complete set of DNA (all chromosomes and genes) in an organism.",
    "mutation": "A change in the base sequence of DNA.",
    "mutagen": "Something that increases the rate of mutation, such as UV light, X-rays or some chemicals.",
    "genotype": "The combination of alleles an organism has, e.g. Rr.",
    "phenotype": "The observable characteristic, produced by genotype and environment together.",
    "dominant": "An allele that shows in the phenotype when only one copy is present.",
    "recessive": "An allele that only shows in the phenotype when two copies are present.",
    "homozygous": "Having two identical alleles for a gene (e.g. RR or rr).",
    "heterozygous": "Having two different alleles for a gene (e.g. Rr).",
    "carrier": "A heterozygous person who has one copy of a recessive allele but does not show the trait.",
    "Punnett square": "A grid used to predict the possible genotypes of offspring from two parents.",
    "pedigree": "A family tree chart showing how a trait is inherited over generations.",
    "PCR": "Polymerase chain reaction: makes millions of copies of a small DNA sample.",
    "gel electrophoresis": "Separating DNA fragments by size using an electric current through a gel.",
    "DNA profile": "The pattern of DNA bands that identifies an individual.",
    "recombinant DNA": "DNA made by joining DNA from two different sources, such as a human gene inserted into a bacterial plasmid.",
    "genetically modified organism (GMO)": "An organism whose DNA has been changed using genetic technology.",
    "CRISPR-Cas9": "A gene-editing tool that cuts DNA at an exact sequence so genes can be removed, repaired or added.",
    "gene therapy": "Treating a genetic disorder by delivering a working copy of a gene into a patient's cells.",
    "cloning": "Producing genetically identical copies of an organism, cell or gene.",
    "natural selection": "The process where individuals with helpful inherited traits survive and reproduce more, so those traits become more common over generations.",
    "selection pressure": "A factor in the environment, such as predators or disease, that affects which individuals survive and reproduce.",
    "evolution": "Change in the inherited characteristics of a population over many generations.",
    "species": "A group of organisms that can interbreed to produce fertile offspring.",
    "speciation": "The formation of a new species, often after populations are isolated.",
    "geographic isolation": "When a physical barrier separates a population so the groups cannot interbreed.",
    "utilitarian (consequences) ethics": "Judging an action by its outcomes: the greatest good for the greatest number.",
    "rights-based (duty) ethics": "Judging an action by whether it respects rights and duties, whatever the outcome.",
    "virtue ethics": "Judging an action by what a person of good character would do.",
    "informed consent": "Agreeing to take part, or to have your cells or data used, after being told clearly what will happen.",
  },
  sections: [
    {
      id: "5.1",
      label: "DNA structure",
      accent: "pink",
      blurb: "★★ DNA, genes, chromosomes and genomes, and how the double helix stores and copies the code.",
      points: ["5.1.2", "5.1.3"],
      render: (p) => <Section1 {...p}/>,
    },
    {
      id: "5.2",
      label: "Inheritance",
      accent: "violet",
      blurb: "★★★ Mutations, genotype and phenotype, Punnett squares and pedigrees.",
      points: ["5.2.3", "5.2.4", "5.2.5"],
      render: (p) => <Section2 {...p}/>,
    },
    {
      id: "5.3",
      label: "Genetic technologies",
      accent: "blue",
      blurb: "★★★ PCR, DNA profiling, GM, CRISPR, gene therapy and cloning, with their benefits and risks.",
      points: ["5.3.1", "5.3.2"],
      render: (p) => <Section3 {...p}/>,
    },
    {
      id: "5.4",
      label: "Evolution",
      accent: "emerald",
      blurb: "★★★ Natural selection step by step, and how isolation leads to new species.",
      points: ["5.4.1"],
      render: (p) => <Section4 {...p}/>,
    },
    {
      id: "5.5",
      label: "Ethics",
      accent: "amber",
      blurb: "★★ Using ethical frameworks to argue about a genetic technology.",
      points: ["5.5.1"],
      render: (p) => <Section5 {...p}/>,
    },
  ],
});

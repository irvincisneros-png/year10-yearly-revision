/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
const { useState } = React;

const NB = "https://irvincisneros-png.github.io/Year-10-Science/chemical-reactions/";

/* ============================================================
   Small helpers
   ============================================================ */

/* nuclear symbol: mass number on top, atomic number below, then the symbol */
function Nuc({ a, z, s }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", verticalAlign: "middle", whiteSpace: "nowrap" }}>
      <span style={{ display: "inline-flex", flexDirection: "column", fontSize: "0.68em", lineHeight: 1.05, textAlign: "right", marginRight: 2 }}>
        <span>{a}</span><span>{z}</span>
      </span>
      <span style={{ fontWeight: 600 }}>{s}</span>
    </span>
  );
}

/* a displayed equation that can scroll sideways on its own if it is long */
function Eq({ children }) {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <div style={{ display: "inline-block", minWidth: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "rgba(127,127,127,0.07)", fontSize: "1.02rem", whiteSpace: "nowrap", textAlign: "center" }}>
        {children}
      </div>
    </div>
  );
}

function TableWrap({ children }) {
  return <div style={{ overflowX: "auto" }}>{children}</div>;
}

/* monotone cubic path through pixel points, so curves never overshoot a plateau */
function monoPath(p) {
  const n = p.length;
  if (n < 2) return "";
  const dx = [], m = [];
  for (let i = 0; i < n - 1; i++) { dx[i] = p[i + 1][0] - p[i][0]; m[i] = (p[i + 1][1] - p[i][1]) / dx[i]; }
  const t = [m[0]];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  t[n - 1] = m[n - 2];
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
    const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b;
    if (s > 9) { const k = 3 / Math.sqrt(s); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i]; }
  }
  let d = "M" + p[0][0].toFixed(1) + "," + p[0][1].toFixed(1);
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += " C" + (p[i][0] + h).toFixed(1) + "," + (p[i][1] + t[i] * h).toFixed(1) + " " +
      (p[i + 1][0] - h).toFixed(1) + "," + (p[i + 1][1] - t[i + 1] * h).toFixed(1) + " " +
      p[i + 1][0].toFixed(1) + "," + p[i + 1][1].toFixed(1);
  }
  return d;
}

/* simple accurate line graph. series: [{ data:[[x,y]], stroke, dash, smooth, markers }] */
function Chart({ label, w = 440, h = 290, xMax, yMax, xTicks, yTicks, xLabel, yLabel, series = [], extra, fmtY }) {
  const L = 54, R = 14, T = 14, B = 50;
  const pw = w - L - R, ph = h - T - B;
  const sx = (x) => L + (x / xMax) * pw;
  const sy = (y) => T + ph - (y / yMax) * ph;
  return (
    <svg role="img" aria-label={label} width="100%" viewBox={`0 0 ${w} ${h}`} style={{ maxWidth: 560, display: "block", margin: "0 auto" }}>
      <rect x={L} y={T} width={pw} height={ph} fill="var(--card)" stroke="none"/>
      {yTicks.map(v => <line key={"gy" + v} x1={L} x2={L + pw} y1={sy(v)} y2={sy(v)} stroke="var(--border)" strokeWidth="1"/>)}
      {xTicks.map(v => <line key={"gx" + v} x1={sx(v)} x2={sx(v)} y1={T} y2={T + ph} stroke="var(--border)" strokeWidth="1"/>)}
      <line x1={L} y1={T + ph} x2={L + pw} y2={T + ph} stroke="var(--ink)" strokeWidth="1.6"/>
      <line x1={L} y1={T} x2={L} y2={T + ph} stroke="var(--ink)" strokeWidth="1.6"/>
      {yTicks.map(v => <text key={"ty" + v} x={L - 6} y={sy(v) + 4} textAnchor="end" fontSize="12" fill="var(--ink-muted)">{fmtY ? fmtY(v) : v}</text>)}
      {xTicks.map(v => <text key={"tx" + v} x={sx(v)} y={T + ph + 17} textAnchor="middle" fontSize="12" fill="var(--ink-muted)">{v}</text>)}
      <text x={L + pw / 2} y={h - 8} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)">{xLabel}</text>
      <text x={14} y={T + ph / 2} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)" transform={`rotate(-90 14 ${T + ph / 2})`}>{yLabel}</text>
      {series.map((s, i) => {
        const pts = s.data.map(([x, y]) => [sx(x), sy(y)]);
        const d = s.smooth === false ? "M" + pts.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" L") : monoPath(pts);
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={s.stroke || "var(--accent)"} strokeWidth={s.width || 3} strokeDasharray={s.dash || "none"} strokeLinecap="round" strokeLinejoin="round"/>
            {s.markers && pts.map((q, j) => <circle key={j} cx={q[0]} cy={q[1]} r="3.6" fill={s.stroke || "var(--accent)"} stroke="var(--card)" strokeWidth="1.2"/>)}
          </g>
        );
      })}
      {extra && extra(sx, sy)}
    </svg>
  );
}

/* ============================================================
   FIGURES
   ============================================================ */

function BalanceFigure() {
  const bottle = (x, sealed, after) => (
    <g>
      {/* balance */}
      <rect x={x - 70} y={196} width={140} height={34} rx={6} fill="var(--card)" stroke="var(--ink)" strokeWidth="2"/>
      <rect x={x - 44} y={204} width={88} height={20} rx={3} fill="var(--bg-2)" stroke="var(--ink-muted)" strokeWidth="1.2"/>
      <text x={x} y={219} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)" fontFamily="var(--font-mono, monospace)">{after && !sealed ? "247.90 g" : "248.60 g"}</text>
      <rect x={x - 56} y={188} width={112} height={8} rx={2} fill="var(--ink-muted)"/>
      {/* bottle */}
      <path d={`M${x - 30},186 L${x - 30},110 Q${x - 30},96 ${x - 16},90 L${x - 12},70 L${x + 12},70 L${x + 16},90 Q${x + 30},96 ${x + 30},110 L${x + 30},186 Z`} fill="var(--card)" stroke="var(--ink)" strokeWidth="2"/>
      <path d={`M${x - 28},184 L${x - 28},130 L${x + 28},130 L${x + 28},184 Z`} fill="var(--accent)" opacity="0.22"/>
      {sealed && <rect x={x - 15} y={60} width={30} height={12} rx={2} fill="var(--accent)"/>}
      {/* bubbles */}
      {after && [[-14, 170], [6, 160], [-4, 146], [14, 176], [-18, 150], [10, 138]].map(([dx, y], i) => <circle key={i} cx={x + dx} cy={y} r={3.2} fill="none" stroke="var(--accent)" strokeWidth="1.4"/>)}
      {after && <rect x={x - 9} y={174} width={18} height={6} rx={2} fill="var(--ink-muted)" opacity="0.6"/>}
      {after && !sealed && [[-6, 50], [8, 36], [-2, 22]].map(([dx, y], i) => <circle key={"g" + i} cx={x + dx} cy={y} r={4} fill="none" stroke="var(--accent)" strokeWidth="1.6"/>)}
      {after && !sealed && <text x={x + 22} y={34} fontSize="12" fill="var(--accent)" fontWeight="700">CO₂ escapes</text>}
      {after && sealed && <text x={x} y={52} textAnchor="middle" fontSize="12" fill="var(--accent)" fontWeight="700">CO₂ trapped</text>}
    </g>
  );
  return (
    <Figure num="1" caption="An effervescent tablet dropped into water in an open bottle (left) and a sealed bottle (right). Readings are after the fizzing stops. Only the open bottle loses mass, because the carbon dioxide gas leaves the system.">
      <svg role="img" aria-label="Two bottles on balances. Both start at 248.60 grams. The open bottle reads 247.90 grams after the reaction because carbon dioxide escapes. The sealed bottle still reads 248.60 grams." width="100%" viewBox="0 0 440 274" style={{ maxWidth: 520, display: "block", margin: "0 auto" }}>
        <text x={110} y={266} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">Open system</text>
        <text x={330} y={266} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">Closed system</text>
        {bottle(110, false, true)}
        {bottle(330, true, true)}
        <text x={110} y={244} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">started at 248.60 g</text>
        <text x={330} y={244} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">started at 248.60 g</text>
      </svg>
    </Figure>
  );
}

function CrissCrossFigure() {
  return (
    <Figure num="2" caption="The criss-cross method for calcium phosphate. The size of each ion's charge becomes the other ion's subscript. Brackets go around a polyatomic ion when you need more than one of it.">
      <svg role="img" aria-label="Calcium ion with charge 2 plus and phosphate ion with charge 3 minus. Arrows cross over: the 3 goes to calcium and the 2 goes to phosphate, giving Ca3(PO4)2." width="100%" viewBox="0 0 400 200" style={{ maxWidth: 460, display: "block", margin: "0 auto" }}>
        <defs>
          <marker id="rx-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/>
          </marker>
        </defs>
        <text x={110} y={58} textAnchor="middle" fontSize="30" fontWeight="700" fill="var(--ink)">Ca</text>
        <text x={142} y={40} fontSize="18" fontWeight="700" fill="var(--accent)">2+</text>
        <text x={236} y={58} fontSize="30" fontWeight="700" fill="var(--ink)">PO<tspan fontSize="18" dy="8">4</tspan></text>
        <text x={298} y={36} fontSize="18" fontWeight="700" fill="var(--accent)">3−</text>
        <path d="M152,46 C190,80 220,110 268,138" fill="none" stroke="var(--accent)" strokeWidth="2.2" markerEnd="url(#rx-arrow)"/>
        <path d="M314,44 C334,92 240,118 146,138" fill="none" stroke="var(--accent)" strokeWidth="2.2" markerEnd="url(#rx-arrow)"/>
        <text x={200} y={178} textAnchor="middle" fontSize="30" fontWeight="700" fill="var(--ink)">Ca₃(PO₄)₂</text>
        <text x={36} y={110} fontSize="12" fill="var(--ink-muted)">3 × (2+) = 6+</text>
        <text x={304} y={130} fontSize="12" fill="var(--ink-muted)">2 × (3−) = 6−</text>
      </svg>
    </Figure>
  );
}

function PhScaleFigure() {
  const items = [
    [0.5, "battery acid", 0], [2, "lemon juice", 1], [3, "vinegar", 0], [5, "black coffee", 1],
    [6.5, "milk", 0], [7, "pure water", 1], [8, "sea water", 0], [9, "baking soda", 1],
    [10.5, "milk of magnesia", 0], [12.5, "bleach", 1], [14, "drain cleaner", 0],
  ];
  const x = (p) => 20 + p * 28;
  return (
    <Figure num="3" caption="The pH scale with some common substances (approximate values). Pure water at 25 °C is neutral, pH 7.">
      <svg role="img" aria-label="pH scale from 0 to 14. Acids below 7 include battery acid, lemon juice, vinegar and black coffee. Milk is about 6.5. Pure water is 7. Bases above 7 include sea water, baking soda, milk of magnesia, bleach and drain cleaner." width="100%" viewBox="0 0 432 210" style={{ maxWidth: 600, display: "block", margin: "0 auto" }}>
        <rect x={20} y={92} width={392} height={22} rx={4} fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/>
        <rect x={20} y={92} width={196} height={22} rx={4} fill="var(--accent)" opacity="0.25"/>
        <rect x={214} y={92} width={4} height={22} fill="var(--ink)"/>
        {Array.from({ length: 15 }, (_, i) => (
          <g key={i}>
            <line x1={x(i)} x2={x(i)} y1={114} y2={120} stroke="var(--ink)" strokeWidth="1.2"/>
            <text x={x(i)} y={133} textAnchor="middle" fontSize="11" fill="var(--ink)">{i}</text>
          </g>
        ))}
        {items.map(([p, name, up], i) => {
          const y1 = up ? 92 : 136, y2 = up ? (i % 4 === 1 ? 50 : 72) : (i % 4 === 0 ? 156 : 176);
          return (
            <g key={name}>
              <line x1={x(p)} x2={x(p)} y1={y1} y2={up ? y2 + 4 : y2 - 12} stroke="var(--ink-muted)" strokeWidth="1"/>
              <text x={x(p) < 40 ? 20 : x(p) > 400 ? 412 : x(p)} y={y2} textAnchor={x(p) < 40 ? "start" : x(p) > 400 ? "end" : "middle"} fontSize="11" fill="var(--ink)">{name}</text>
            </g>
          );
        })}
        <text x={20} y={22} fontSize="12" fontWeight="700" fill="var(--accent)">← more acidic</text>
        <text x={216} y={22} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">neutral</text>
        <text x={412} y={22} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--ink-muted)">more basic →</text>
        <text x={216} y={204} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">each step of 1 = 10 × change in acidity</text>
      </svg>
    </Figure>
  );
}

/* pH of 25.0 mL of 0.100 mol/L KOH as 0.100 mol/L HCl is added (strong acid + strong base) */
function phAt(v) {
  const base = 0.1 * 25, acid = 0.1 * v, tot = 25 + v;
  if (Math.abs(base - acid) < 1e-9) return 7;
  if (base > acid) return 14 + Math.log10((base - acid) / tot);
  return -Math.log10((acid - base) / tot);
}
const PH_CURVE = (() => {
  const xs = [];
  for (let v = 0; v <= 50.0001; v += v > 22 && v < 28 ? 0.1 : 0.5) xs.push(Math.round(v * 10) / 10);
  return xs.map(v => [v, phAt(v)]);
})();

function NeutralisationCurve() {
  return (
    <Figure num="4" caption="pH meter readings as hydrochloric acid is added, a little at a time, to 25.0 mL of potassium hydroxide solution (both 0.100 mol/L). The pH falls slowly, then plunges through 7 when the acid has exactly neutralised the base (25.0 mL), then levels off in the acidic range.">
      <Chart
        label="Graph of pH against volume of acid added. pH starts at 13, stays above 12 until about 20 millilitres, drops steeply through pH 7 at 25 millilitres, then levels off near pH 1.5 by 50 millilitres."
        xMax={50} yMax={14} xTicks={[0, 10, 20, 30, 40, 50]} yTicks={[0, 2, 4, 6, 7, 8, 10, 12, 14]}
        xLabel="Volume of acid added (mL)" yLabel="pH"
        series={[{ data: PH_CURVE, smooth: false }]}
        extra={(sx, sy) => (
          <g>
            <line x1={sx(0)} x2={sx(25)} y1={sy(7)} y2={sy(7)} stroke="var(--ink-muted)" strokeDasharray="4 4" strokeWidth="1.3"/>
            <line x1={sx(25)} x2={sx(25)} y1={sy(7)} y2={sy(0)} stroke="var(--ink-muted)" strokeDasharray="4 4" strokeWidth="1.3"/>
            <circle cx={sx(25)} cy={sy(7)} r="4.5" fill="var(--accent)"/>
            <text x={sx(26.5)} y={sy(7) - 6} fontSize="12" fill="var(--ink)" fontWeight="600">neutral point</text>
            <text x={sx(3)} y={sy(11.2)} fontSize="12" fill="var(--ink-muted)">basic (excess KOH)</text>
            <text x={sx(30)} y={sy(3.4)} fontSize="12" fill="var(--ink-muted)">acidic (excess HCl)</text>
          </g>
        )}
      />
    </Figure>
  );
}

function CollisionFigure() {
  const box = (x, y, title, nRed, seed) => {
    const pts = [];
    let s = seed;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < nRed; i++) pts.push([x + 14 + rnd() * 152, y + 14 + rnd() * 92]);
    return (
      <g>
        <rect x={x} y={y} width={180} height={120} rx={8} fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/>
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="5" fill="var(--accent)"/>)}
        <rect x={x + 70} y={y + 82} width={40} height={30} rx={3} fill="var(--ink-muted)" opacity="0.75"/>
        <text x={x + 90} y={y + 140} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{title}</text>
      </g>
    );
  };
  return (
    <Figure num="5" caption="Collision theory. The coloured dots are acid particles; the grey block is a solid reactant. More particles in the same volume (higher concentration) means more frequent collisions with the solid, so the reaction is faster.">
      <svg role="img" aria-label="Two boxes containing a solid block and acid particles. The low concentration box has 6 particles, the high concentration box has 20 particles crowded around the solid." width="100%" viewBox="0 0 400 168" style={{ maxWidth: 520, display: "block", margin: "0 auto" }}>
        {box(10, 8, "Low concentration", 6, 7)}
        {box(210, 8, "High concentration", 20, 11)}
      </svg>
    </Figure>
  );
}

/* marble chips (5.00 g, acid in excess): mass of CO2 lost against time */
const SMALL = [[0, 0], [30, 0.90], [60, 1.50], [90, 1.86], [120, 2.06], [150, 2.16], [180, 2.20], [210, 2.20], [240, 2.20], [270, 2.20], [300, 2.20], [330, 2.20], [360, 2.20]];
const LARGE = [[0, 0], [30, 0.45], [60, 0.85], [90, 1.20], [120, 1.48], [150, 1.70], [180, 1.86], [210, 1.98], [240, 2.07], [270, 2.13], [300, 2.17], [330, 2.19], [360, 2.20]];

function MarbleGraph({ num = "6" }) {
  return (
    <Figure num={num} caption="Mass lost from a flask on a balance as 5.00 g of marble (calcium carbonate) reacts with excess hydrochloric acid. The mass lost is the carbon dioxide escaping. Small chips (solid line) react faster than large chips (dashed line), but both lose 2.20 g in total.">
      <Chart
        label="Graph of mass lost in grams against time in seconds. Small chips: 0.90 g at 30 s, 1.50 g at 60 s, 2.06 g at 120 s, levelling at 2.20 g from 180 s. Large chips: 0.45 g at 30 s, 0.85 g at 60 s, 1.48 g at 120 s, 1.86 g at 180 s, reaching 2.20 g at 360 s."
        xMax={360} yMax={2.5} xTicks={[0, 60, 120, 180, 240, 300, 360]} yTicks={[0, 0.5, 1.0, 1.5, 2.0, 2.5]}
        fmtY={(v) => v.toFixed(1)}
        xLabel="Time (s)" yLabel="Mass lost (g)"
        series={[
          { data: SMALL, markers: true },
          { data: LARGE, markers: true, stroke: "var(--orange)", dash: "7 5" },
        ]}
        extra={(sx, sy) => (
          <g>
            <text x={sx(16)} y={sy(1.9)} fontSize="12" fontWeight="700" fill="var(--accent)">small chips</text>
            <text x={sx(150)} y={sy(1.32)} fontSize="12" fontWeight="700" fill="var(--orange)">large chips</text>
          </g>
        )}
      />
    </Figure>
  );
}

/* sodium-24 decay (half-life 15 h) */
const NA24 = Array.from({ length: 31 }, (_, i) => { const t = i * 2.5; return [t, 1600 * Math.pow(0.5, t / 15)]; });

function DecayGraph() {
  return (
    <Figure num="7" caption="Activity of a sodium-24 sample over time. It falls from 1600 Bq to 800 Bq in 15 hours, so its half-life is 15 h. Each further 15 h halves the activity again.">
      <Chart
        label="Decay curve of activity in becquerels against time in hours. 1600 Bq at 0 h, 800 at 15 h, 400 at 30 h, 200 at 45 h, 100 at 60 h, 50 at 75 h."
        xMax={75} yMax={1600} xTicks={[0, 15, 30, 45, 60, 75]} yTicks={[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600]}
        xLabel="Time (h)" yLabel="Activity (Bq)"
        series={[{ data: NA24 }]}
        extra={(sx, sy) => (
          <g>
            {[[15, 800], [30, 400], [45, 200]].map(([t, a]) => (
              <g key={t}>
                <line x1={sx(0)} x2={sx(t)} y1={sy(a)} y2={sy(a)} stroke="var(--ink-muted)" strokeDasharray="4 4" strokeWidth="1.2"/>
                <line x1={sx(t)} x2={sx(t)} y1={sy(a)} y2={sy(0)} stroke="var(--ink-muted)" strokeDasharray="4 4" strokeWidth="1.2"/>
                <circle cx={sx(t)} cy={sy(a)} r="4" fill="var(--accent)"/>
              </g>
            ))}
            <text x={sx(17)} y={sy(800) - 8} fontSize="12" fontWeight="600" fill="var(--ink)">1 half-life: 800 Bq</text>
            <text x={sx(32)} y={sy(400) - 8} fontSize="12" fontWeight="600" fill="var(--ink)">2 half-lives: 400 Bq</text>
          </g>
        )}
      />
    </Figure>
  );
}

function HalfLifeInteractive() {
  const ISO = {
    tc: { name: "Technetium-99m", t: 6, unit: "hours", start: 400, u: "MBq" },
    na: { name: "Sodium-24", t: 15, unit: "hours", start: 1600, u: "Bq" },
    co: { name: "Cobalt-60", t: 5.3, unit: "years", start: 800, u: "GBq" },
  };
  const [k, setK] = useState("tc");
  const [n, setN] = useState(0);
  const iso = ISO[k];
  const frac = Math.pow(0.5, n);
  const left = iso.start * frac;
  const fmt = (v) => (v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2));
  return (
    <Interactive title="Half-life stepper" subtitle="Pick an isotope and slide through half-lives. Watch what is left." takeaway="Every half-life the amount left halves, no matter how much you start with. After n half-lives, the fraction left is (½)ⁿ: ½, ¼, ⅛, ¹⁄₁₆ …">
      <div className="ctrl-row">
        <SegToggle options={[{ value: "tc", label: "Tc-99m" }, { value: "na", label: "Na-24" }, { value: "co", label: "Co-60" }]} value={k} onChange={(v) => setK(v)}/>
      </div>
      <Slider label="Half-lives passed" min={0} max={5} step={1} value={n} onChange={setN}/>
      <div style={{ height: 22, borderRadius: 6, border: "1.5px solid var(--ink)", overflow: "hidden", margin: "10px 0" }}>
        <div style={{ width: (frac * 100) + "%", height: "100%", background: "var(--accent)", transition: "width 0.3s" }}/>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Stat value={(Math.round(iso.t * n * 10) / 10) + " " + iso.unit} label="Time passed"/>
        <Stat value={n === 0 ? "1" : "1/" + Math.pow(2, n)} label="Fraction left"/>
        <Stat value={fmt(left) + " " + iso.u} label={"Activity (start " + iso.start + " " + iso.u + ")"}/>
      </div>
      <p className="muted" style={{ fontSize: "0.85rem", marginTop: 8 }}>{iso.name}: half-life {iso.t} {iso.unit}.</p>
    </Interactive>
  );
}

/* ============================================================
   SECTION 6.1  Conservation of mass
   ============================================================ */
function Section61({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.1 Conservation of mass</div>
        <h1>Atoms are never lost</h1>
        <p className="lead">In a chemical reaction, atoms are rearranged. None are made and none are destroyed, so the total mass stays the same.</p>
      </div>

      <DotPoint id="6.1.1" title="Explain the law of conservation of mass" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>The <Term def="In a chemical reaction mass is neither created nor destroyed: total mass of reactants = total mass of products.">law of conservation of mass</Term>: in any chemical reaction, <strong>total mass of reactants = total mass of products</strong>.</li>
            <li>Why: atoms are only <strong>rearranged</strong> into new substances. The same number of each type of atom is there before and after, and each atom keeps its mass.</li>
            <li>A <Term def="An equation where the number of each type of atom is the same on both sides.">balanced equation</Term> shows this: count each type of atom on each side and the numbers match.</li>
            <li>Use it to calculate a missing mass: mass of missing substance = total on one side − the known masses on the other side.</li>
            <li>Common mistake: saying mass "disappears" when a gas forms. The gas still has mass; it just may not be on the balance.</li>
          </ul>
        </Recap>
        <WorkedExample
          title="Finding a missing mass"
          problem="When 10.0 g of calcium carbonate is heated strongly, it breaks down into 5.6 g of calcium oxide and carbon dioxide gas. What mass of carbon dioxide forms?"
          steps={[
            "Write the word equation: calcium carbonate → calcium oxide + carbon dioxide.",
            "Conservation of mass: mass of reactants = mass of products, so 10.0 g = 5.6 g + mass of carbon dioxide.",
            "Rearrange: mass of carbon dioxide = 10.0 g − 5.6 g = 4.4 g.",
          ]}
          answer="4.4 g of carbon dioxide."
        />
        <ExamTip>
          "Explain" questions on this law need the <strong>atom idea</strong>, not just the rule. A full answer says: atoms are rearranged, not created or destroyed → same number of each atom → so total mass stays the same.
        </ExamTip>
        <Practice title="Conservation of mass">
          <MCQ num={1}
            question="6.4 g of copper reacts completely with sulfur to make 9.6 g of copper(II) sulfide. What mass of sulfur reacted?"
            options={["16.0 g", "3.2 g", "6.4 g", "9.6 g"]}
            correct={1}
            explain="Mass of sulfur = 9.6 g − 6.4 g = 3.2 g, because total mass of reactants equals total mass of product. 16.0 g is the tempting wrong answer: it comes from adding the two numbers, but 9.6 g is already the product, which includes the copper."
          />
          <MCQ num={2}
            question="Which statement best explains why mass is conserved in a chemical reaction?"
            options={["The molecules stay the same, they only change state", "Some of the mass changes into heat energy", "Atoms are rearranged into new substances, but none are created or destroyed", "The products always end up in the same state as the reactants"]}
            correct={2}
            explain="Atoms are rearranged into new combinations, and the same atoms (with the same mass) are there at the end. The first option is wrong because in a chemical reaction new molecules do form; staying the same describes a physical change."
          />
          <WrittenQ num={3}
            question="Hydrogen peroxide breaks down: 2H₂O₂ → 2H₂O + O₂. Use the number of atoms on each side to explain how this equation shows conservation of mass. (3 marks)"
            model="On the reactant side there are 4 hydrogen atoms and 4 oxygen atoms (2 × H₂O₂). On the product side there are 4 hydrogen atoms (2 × H₂O) and 2 + 2 = 4 oxygen atoms (2 in the water, 2 in O₂). The same number of each type of atom is present before and after, because atoms are only rearranged, so the total mass of the products equals the total mass of the reactants."
          />
          <WrittenQ num={4}
            question="A flask of dilute hydrochloric acid and a small dish of marble chips (calcium carbonate) sit together on a balance, which reads 152.40 g. The chips are tipped into the acid and the flask is left open. The reaction makes calcium chloride, water and 0.88 g of carbon dioxide gas. Predict the balance reading when the fizzing stops, and explain your prediction using the law of conservation of mass. (2 marks)"
            model="The balance will read 152.40 g − 0.88 g = 151.52 g. No atoms are created or destroyed, so the total mass of the products is still 152.40 g, but the carbon dioxide is a gas that bubbles out of the open flask into the air, so its 0.88 g is no longer on the balance. If the flask had been stoppered, the reading would have stayed at 152.40 g."
          />
        </Practice>
        <SelfCheck id="6.1.1" items={[
          "I can state the law of conservation of mass in one sentence.",
          "I can explain it using the idea that atoms are rearranged, not created or destroyed.",
          "I can count atoms on both sides of an equation to show mass is conserved.",
          "I can calculate a missing mass of a reactant or product.",
        ]}/>
        <NotebookLink href={NB + "#6.1"} label="Learn it in full: Conservation of Mass"/>
      </DotPoint>

      <DotPoint id="6.1.2" title="Demonstrate conservation of mass in open and closed systems" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>An <Term def="A system where matter (such as gas) can move in or out, for example an open beaker.">open system</Term> lets matter in or out (an open beaker or bottle). A <Term def="A sealed system where no matter can get in or out, but energy can.">closed system</Term> is sealed: no matter can get in or out.</li>
            <li>In a <strong>closed system</strong> the balance reading stays the same, which directly shows mass is conserved. Example: mixing copper(II) sulfate and sodium hydroxide solutions in a stoppered flask makes a blue solid, but the mass does not change.</li>
            <li>In an open system mass can <strong>seem to decrease</strong> when a gas product escapes (an effervescent tablet fizzing in an open bottle loses carbon dioxide).</li>
            <li>Mass can <strong>seem to increase</strong> when a gas from the air joins the product (a dish of quicklime, calcium oxide, left open slowly takes in carbon dioxide from the air: calcium oxide + carbon dioxide → calcium carbonate, so the solid gets heavier).</li>
            <li>In both cases mass is still conserved; the balance just is not weighing everything involved.</li>
          </ul>
        </Recap>
        <BalanceFigure/>
        <WorkedExample
          title="Explaining a mass change"
          problem="Look at Figure 1. Explain why the open bottle lost 0.70 g but the sealed bottle did not change mass. (3 marks)"
          steps={[
            "Name what happens: the tablet reacts with water and produces carbon dioxide gas (the fizzing).",
            "Open bottle: the carbon dioxide escapes into the air, so it is no longer on the balance. The reading drops by the mass of gas lost: 248.60 g − 247.90 g = 0.70 g.",
            "Closed bottle: the lid traps the carbon dioxide, so all the products stay on the balance.",
            "Link to the law: no atoms were created or destroyed in either bottle; the open bottle only seemed to lose mass because a product left the system.",
          ]}
          answer="The reaction makes carbon dioxide gas. In the open bottle it escapes, so 0.70 g of gas is no longer weighed; in the sealed bottle the gas is trapped, so the total mass stays at 248.60 g. Mass is conserved in both; only the closed system shows it on the balance."
        />
        <Practice title="Open and closed systems">
          <MCQ num={5}
            question="An open beaker holding silver nitrate solution and a test tube of sodium chloride solution stand together on a balance, which reads 96.25 g. The sodium chloride is poured into the beaker and the empty test tube is put back on the balance. A white solid (silver chloride) forms, and no gas is made. What does the balance read now?"
            options={["More than 96.25 g, because a solid has formed", "Less than 96.25 g, because the beaker is open", "96.25 g, because no gas is made or used, so no atoms leave or enter even though the beaker is open", "0 g, because the reactants have been used up"]}
            correct={2}
            explain="The products (silver chloride and sodium nitrate solution) are made from exactly the same atoms as the reactants, and none of them is a gas that can escape, so the reading stays 96.25 g. 'Less, because the beaker is open' is tempting, but an open container only loses mass when a product such as a gas actually leaves it."
          />
          <MCQ num={6}
            question="Copper(II) sulfate solution and sodium hydroxide solution are mixed in a stoppered flask. The flask and contents weigh 185.30 g before mixing. A blue solid forms. What does the balance read after the reaction?"
            options={["More than 185.30 g, because a solid has formed", "Less than 185.30 g, because the solid sinks", "185.30 g", "0 g, because the reactants are used up"]}
            correct={2}
            explain="It is a closed system and no gas is involved, so nothing enters or leaves: the mass stays 185.30 g. A new solid forming does not add mass, because it is made from atoms that were already in the solutions."
          />
          <WrittenQ num={7}
            question="Omar puts an effervescent tablet into water in an open beaker on a balance and finds the mass goes down. Describe how he could change his method to show that mass is conserved. (3 marks)"
            model="He should carry out the reaction in a closed system, for example a plastic bottle with a screw-top lid. He weighs the bottle with water, the tablet (kept separate, such as resting in the neck) and the lid, then tips the tablet in and seals it straight away. When the fizzing stops he weighs it again with the lid still on. The mass should be the same, because the carbon dioxide produced is trapped inside, showing mass is conserved."
          />
          <WrittenQ num={8}
            question="When baking soda (sodium hydrogen carbonate) is heated in an open test tube, the solid left behind is lighter than the baking soda was. When quicklime (calcium oxide) is left in an open dish for a week, the solid gets heavier. Explain both results using conservation of mass. (3 marks)"
            model="Heating baking soda breaks it down into sodium carbonate, water vapour and carbon dioxide. The water vapour and carbon dioxide are gases that escape from the open tube, so the solid left behind is lighter. The quicklime reacts with carbon dioxide (and water vapour) from the air to form calcium carbonate, so the solid now contains extra atoms that came from the air and it is heavier. In both cases no atoms are created or destroyed and total mass is conserved; the balance changes only because gases leave the solid or join it from the air, and the air is not being weighed."
          />
        </Practice>
        <SelfCheck id="6.1.2" items={[
          "I can explain the difference between an open and a closed system.",
          "I can explain why mass seems to go down when a gas escapes.",
          "I can explain why mass seems to go up when a gas from the air reacts.",
          "I can describe a closed-system practical that shows mass is conserved.",
        ]}/>
        <NotebookLink href={NB + "#6.1"} label="Learn it in full: Conservation of Mass"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 6.2  Chemical reactions
   ============================================================ */
function Section62({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.2 Chemical reactions</div>
        <h1>Names, equations and reaction types</h1>
        <p className="lead">Name compounds, write balanced equations, recognise common reaction types, and use the pH scale.</p>
      </div>

      <DotPoint id="6.2.1" title="Name and write formulas for ionic and covalent compounds" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li><strong>Ionic compounds</strong> (metal + non-metal): name the metal first, then the non-metal ending in <strong>-ide</strong> (chlorine → chloride, oxygen → oxide, sulfur → sulfide). Polyatomic ions keep their own names (sulfate, nitrate, carbonate).</li>
            <li>The charges must add to zero. Use the <Term def="Swap the sizes of the ion charges so each becomes the other ion's subscript, then simplify.">criss-cross method</Term>: the size of each charge becomes the other ion's subscript. Simplify if you can (Mg²⁺ and O²⁻ give MgO, not Mg₂O₂).</li>
            <li>Put brackets around a polyatomic ion when you need more than one: Ca(NO₃)₂, not CaNO₃₂.</li>
            <li>Metals with more than one charge show it in Roman numerals: iron(II) = Fe²⁺, iron(III) = Fe³⁺, copper(II) = Cu²⁺.</li>
            <li><strong>Covalent compounds</strong> (non-metal + non-metal): use prefixes for the number of atoms: mono 1, di 2, tri 3, tetra 4, penta 5, hexa 6. Skip "mono" on the first element: CO₂ is carbon dioxide, CO is carbon monoxide.</li>
            <li>Ion charges: use the <strong>periodic table on your exam data sheet</strong>. Group 1 → 1+, group 2 → 2+, group 16 → 2−, group 17 → 1−.</li>
          </ul>
        </Recap>
        <TableWrap>
          <table className="data-table" style={{ minWidth: 300 }}>
            <thead><tr><th>Positive ions</th><th>Negative ions</th><th>Polyatomic ions</th></tr></thead>
            <tbody>
              <tr><td>Na⁺, K⁺, Ag⁺</td><td>Cl⁻ chloride, Br⁻ bromide</td><td>NH₄⁺ ammonium, OH⁻ hydroxide</td></tr>
              <tr><td>Mg²⁺, Ca²⁺, Zn²⁺, Cu²⁺</td><td>O²⁻ oxide, S²⁻ sulfide</td><td>NO₃⁻ nitrate, HCO₃⁻ hydrogen carbonate</td></tr>
              <tr><td>Fe²⁺ iron(II), Fe³⁺ iron(III)</td><td>N³⁻ nitride</td><td>SO₄²⁻ sulfate, CO₃²⁻ carbonate, PO₄³⁻ phosphate</td></tr>
            </tbody>
          </table>
        </TableWrap>
        <CrissCrossFigure/>
        <WorkedExample
          title="Formula of iron(III) sulfate, and a covalent name"
          problem="(a) Write the formula of iron(III) sulfate. (b) Name the compound PCl₅."
          steps={[
            "(a) Ions: iron(III) is Fe³⁺ (the Roman numeral tells you the charge); sulfate is SO₄²⁻.",
            "Criss-cross: the 3 goes to sulfate and the 2 goes to iron, giving Fe₂(SO₄)₃. Brackets are needed because there are three sulfate ions.",
            "Check the charges: 2 × (3+) = 6+ and 3 × (2−) = 6−. They add to zero.",
            "(b) P and Cl are both non-metals, so it is covalent: use prefixes. One P (no 'mono' at the start), five Cl → penta + chloride.",
          ]}
          answer="(a) Fe₂(SO₄)₃  (b) phosphorus pentachloride."
        />
        <ExamTip>
          First decide <strong>ionic or covalent</strong>. Metal present → charges and criss-cross, no prefixes. Only non-metals → prefixes, no charges. Mixing the two rules (e.g. "magnesium dichloride") loses the mark.
        </ExamTip>
        <Practice title="Naming and formulas">
          <MCQ num={9}
            question="What is the formula of magnesium nitrate?"
            options={["MgNO₃", "Mg₂NO₃", "Mg(NO₃)₂", "MgN₂"]}
            correct={2}
            explain="Mg²⁺ needs two NO₃⁻ ions to balance the charge (2+ and 2 × 1−), and brackets show two whole nitrate ions: Mg(NO₃)₂. MgNO₃ is tempting but leaves an overall charge of 1+."
          />
          <MCQ num={10}
            question="What is the correct name for SO₃?"
            options={["sulfur(III) oxide", "sulfur trioxide", "monosulfur trioxide", "sulfite"]}
            correct={1}
            explain="Sulfur and oxygen are both non-metals, so use prefixes: one sulfur (no 'mono' at the start) and three oxygens: sulfur trioxide. Roman numerals like (III) are only used for metal ions in ionic compounds."
          />
          <WrittenQ num={11}
            question="Write the formula for each compound: (a) potassium carbonate (b) ammonium sulfate (c) copper(II) hydroxide. (3 marks)"
            model="(a) K₂CO₃ (two K⁺ balance one CO₃²⁻). (b) (NH₄)₂SO₄ (two NH₄⁺ balance one SO₄²⁻, brackets because there are two ammonium ions). (c) Cu(OH)₂ (Cu²⁺ needs two OH⁻, brackets around the hydroxide)."
          />
          <WrittenQ num={12}
            question="Name Na₂S and N₂O₄, and explain why only one of these names uses prefixes. (3 marks)"
            model="Na₂S is sodium sulfide. N₂O₄ is dinitrogen tetroxide. Sodium sulfide is ionic (a metal with a non-metal), so the ratio is fixed by the ion charges (Na⁺ and S²⁻) and no prefixes are needed. N₂O₄ is covalent (two non-metals), and the same elements can join in different ratios, so prefixes are needed to show the number of each atom."
          />
        </Practice>
        <SelfCheck id="6.2.1" items={[
          "I can decide if a compound is ionic or covalent.",
          "I can find ion charges from the periodic table on the data sheet.",
          "I can use the criss-cross method, including brackets for polyatomic ions.",
          "I can name covalent compounds using prefixes.",
        ]}/>
        <NotebookLink href={NB + "#6.2"} label="Learn it in full: Chemical Reactions"/>
      </DotPoint>

      <DotPoint id="6.2.2" title="Write word and balanced equations, and predict products" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>A <strong>word equation</strong> names the reactants → products: zinc + hydrochloric acid → zinc chloride + hydrogen.</li>
            <li>A <strong>balanced symbol equation</strong> uses formulas, with the same number of each atom on both sides.</li>
            <li>Balance by changing only the big numbers in front (<Term def="A number in front of a formula showing how many units of that substance react or form.">coefficients</Term>). Never change subscripts, because that changes the substance.</li>
            <li>States: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. A solid that forms when two solutions mix is a <Term def="An insoluble solid formed when two solutions are mixed.">precipitate</Term> (s).</li>
            <li>Diatomic elements: H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂.</li>
            <li>Predict products from the reaction type (see 6.2.4), e.g. a hydrocarbon burning completely always gives carbon dioxide and water.</li>
          </ul>
        </Recap>
        <WorkedExample
          title="Balancing a combustion equation"
          problem="Propane gas (C₃H₈) burns completely in oxygen. Write the word equation and a balanced equation with states."
          steps={[
            "Products of complete combustion: carbon dioxide and water. Word equation: propane + oxygen → carbon dioxide + water.",
            "Unbalanced: C₃H₈(g) + O₂(g) → CO₂(g) + H₂O(l).",
            "Balance C first: 3 C on the left, so 3CO₂.",
            "Balance H: 8 H on the left, so 4H₂O.",
            "Balance O last: right side has 3 × 2 + 4 × 1 = 10 O atoms, so 5O₂ on the left.",
            "Check: C 3 = 3, H 8 = 8, O 10 = 10.",
          ]}
          answer="C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)"
        />
        <Practice title="Writing equations">
          <MCQ num={13}
            question="Which equation for sodium reacting with chlorine is correctly balanced?"
            options={["Na + Cl₂ → NaCl", "Na + Cl₂ → NaCl₂", "2Na + 2Cl₂ → 2NaCl", "2Na + Cl₂ → 2NaCl"]}
            correct={3}
            explain="2Na + Cl₂ → 2NaCl has 2 Na and 2 Cl on each side. Na + Cl₂ → NaCl₂ looks balanced, but it changes the formula of sodium chloride (the product is NaCl, because Na⁺ and Cl⁻ have equal and opposite charges)."
          />
          <MCQ num={14}
            question="Lead(II) nitrate solution is mixed with potassium iodide solution and a bright yellow solid of lead(II) iodide appears. Which state symbol should lead(II) iodide have?"
            options={["(aq)", "(l)", "(s)", "(g)"]}
            correct={2}
            explain="A solid that forms when two solutions mix is a precipitate, so it is (s). (aq) is tempting because the reactants are solutions, but (aq) means dissolved, and a precipitate is the part that does not dissolve."
          />
          <WrittenQ num={15}
            question="Zinc granules react with hydrochloric acid. Write the word equation and the balanced symbol equation with states. (3 marks)"
            model="Word equation: zinc + hydrochloric acid → zinc chloride + hydrogen. Balanced equation: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g). Check: 1 Zn, 2 H and 2 Cl on each side."
          />
          <WrittenQ num={16}
            question="In a blast furnace, iron(III) oxide reacts with carbon monoxide gas to form liquid iron and carbon dioxide. Write the balanced equation with states. (2 marks)"
            model="Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g). Check: Fe 2 = 2; C 3 = 3; O 3 + 3 = 6 on the left and 3 × 2 = 6 on the right."
          />
        </Practice>
        <SelfCheck id="6.2.2" items={[
          "I can write a word equation from a description of a reaction.",
          "I can balance an equation by changing coefficients only.",
          "I can add correct state symbols, including (s) for a precipitate.",
          "I can predict the products of common reactions.",
        ]}/>
        <NotebookLink href={NB + "#6.2"} label="Learn it in full: Chemical Reactions"/>
      </DotPoint>

      <DotPoint id="6.2.4" title="Features of synthesis, decomposition, displacement, neutralisation and other reactions" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <TableWrap>
            <table className="data-table" style={{ minWidth: 420 }}>
              <thead><tr><th>Type</th><th>Pattern</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td><Term def="Two or more reactants join to make one product.">Synthesis</Term></td><td>A + B → AB</td><td>iron + sulfur → iron(II) sulfide</td></tr>
                <tr><td><Term def="One compound breaks down into two or more simpler substances, often by heating or electricity.">Decomposition</Term></td><td>AB → A + B</td><td>copper(II) carbonate → copper(II) oxide + carbon dioxide</td></tr>
                <tr><td><Term def="A more reactive element takes the place of a less reactive element in a compound.">Single displacement</Term></td><td>A + BC → AC + B</td><td>zinc + copper(II) sulfate → zinc sulfate + copper</td></tr>
                <tr><td><Term def="An acid reacts with a base to make a salt and water.">Neutralisation</Term></td><td>acid + base → salt + water</td><td>hydrochloric acid + potassium hydroxide → potassium chloride + water</td></tr>
                <tr><td>Combustion</td><td>fuel + oxygen → carbon dioxide + water</td><td>methane + oxygen → carbon dioxide + water</td></tr>
                <tr><td>Acid + metal</td><td>→ salt + hydrogen</td><td>zinc + sulfuric acid → zinc sulfate + hydrogen</td></tr>
                <tr><td>Acid + carbonate</td><td>→ salt + water + carbon dioxide</td><td>calcium carbonate + nitric acid → calcium nitrate + water + carbon dioxide</td></tr>
              </tbody>
            </table>
          </TableWrap>
          <ul>
            <li>Displacement only happens if the free metal is <strong>more reactive</strong> than the metal in the compound. Part of the reactivity series: magnesium &gt; zinc &gt; iron &gt; copper &gt; silver.</li>
            <li>Salt names: hydrochloric acid → chlorides, sulfuric acid → sulfates, nitric acid → nitrates.</li>
            <li>Gas tests: <strong>hydrogen</strong> gives a squeaky "pop" with a lit splint; <strong>carbon dioxide</strong> turns limewater milky; <strong>oxygen</strong> relights a glowing splint.</li>
          </ul>
        </Recap>
        <WorkedExample
          title="Identifying and testing a decomposition"
          problem="Green copper(II) carbonate powder is heated in a test tube. It turns black and a gas is given off. Name the type of reaction, write the word equation and describe a test for the gas. (3 marks)"
          steps={[
            "Count reactants and products: one compound breaks into two simpler substances, so it is a (thermal) decomposition.",
            "Products of heating a metal carbonate: the metal oxide (black copper(II) oxide) and carbon dioxide.",
            "Word equation: copper(II) carbonate → copper(II) oxide + carbon dioxide.",
            "Test: bubble the gas through limewater. Carbon dioxide turns it milky (cloudy).",
          ]}
          answer="Decomposition. Copper(II) carbonate → copper(II) oxide + carbon dioxide. The gas turns limewater milky, showing it is carbon dioxide."
        />
        <WorkedExample
          title="Will displacement happen?"
          problem="Mia puts a strip of zinc into blue copper(II) sulfate solution, and a strip of copper into colourless zinc sulfate solution. Predict what happens in each, with reasons and observations. (4 marks)"
          steps={[
            "Use the reactivity series: zinc is more reactive than copper.",
            "Zinc in copper(II) sulfate: zinc displaces copper. Word equation: zinc + copper(II) sulfate → zinc sulfate + copper.",
            "Observations: a brown/pink coating of copper forms on the zinc and the blue colour of the solution fades (Cu²⁺ ions are used up).",
            "Copper in zinc sulfate: copper is less reactive than zinc, so it cannot displace it. No reaction, no change seen.",
          ]}
          answer="Only the zinc strip reacts: it gets a brown copper coating and the blue solution fades, because zinc is more reactive than copper and displaces it. The copper strip in zinc sulfate shows no change, because copper is less reactive than zinc."
        />
        <ExamTip>
          For "identify the type" questions, look at the pattern: how many reactants, how many products, is an element swapping places, is an acid meeting a base? Then <strong>justify</strong> with that feature, e.g. "decomposition, because one reactant breaks down into two products".
        </ExamTip>
        <Practice title="Types of reactions">
          <MCQ num={17}
            question="Iron filings and sulfur powder are heated together and form a single product, iron(II) sulfide. What type of reaction is this?"
            options={["Decomposition", "Synthesis", "Single displacement", "Neutralisation"]}
            correct={1}
            explain="Two reactants join to make one product: A + B → AB, which is synthesis. Decomposition is the reverse (one reactant breaking into several products), so it is the opposite pattern."
          />
          <MCQ num={18}
            question="Zinc carbonate is added to sulfuric acid and bubbles form. Which gas is made, and how is it identified?"
            options={["Hydrogen: it makes a lit splint pop", "Oxygen: it relights a glowing splint", "Carbon dioxide: it turns limewater milky", "Carbon dioxide: it makes a lit splint pop"]}
            correct={2}
            explain="Acid + carbonate → salt + water + carbon dioxide, and carbon dioxide turns limewater milky. Hydrogen with a 'pop' is tempting, but hydrogen is made when an acid reacts with a metal, not with a carbonate."
          />
          <MCQ num={19}
            question="What are the products when ethanol burns completely in plenty of oxygen?"
            options={["Carbon dioxide and water", "Carbon monoxide and hydrogen", "Carbon and water", "Carbon dioxide and hydrogen"]}
            correct={0}
            explain="Complete combustion of a fuel containing carbon and hydrogen gives carbon dioxide and water. Carbon monoxide and soot (carbon) form only in incomplete combustion, when oxygen is limited."
          />
          <MCQ num={20}
            question="Reactivity: magnesium > zinc > iron > copper > silver. Which of these will react?"
            options={["Copper wire in zinc nitrate solution", "An iron nail in copper(II) sulfate solution", "Silver foil in magnesium sulfate solution", "Copper wire in iron(II) sulfate solution"]}
            correct={1}
            explain="Iron is more reactive than copper, so it displaces copper from copper(II) sulfate. In each other option the free metal is less reactive than the metal in the solution, so no displacement occurs."
          />
          <WrittenQ num={21}
            question="An antacid tablet contains magnesium hydroxide, which reacts with hydrochloric acid in the stomach. Name the type of reaction, write the word equation and name the salt formed. (3 marks)"
            model="It is a neutralisation reaction, because an acid reacts with a base. Word equation: magnesium hydroxide + hydrochloric acid → magnesium chloride + water. The salt formed is magnesium chloride."
          />
          <WrittenQ num={22}
            question="Compare the reaction of hydrochloric acid with zinc metal and the reaction of hydrochloric acid with zinc carbonate. Include the products and a test for each gas. (4 marks)"
            model="Both reactions make the salt zinc chloride and both fizz because a gas is produced. With zinc metal (acid + metal) the products are zinc chloride and hydrogen; hydrogen gives a squeaky pop with a lit splint. With zinc carbonate (acid + carbonate) the products are zinc chloride, water and carbon dioxide; carbon dioxide turns limewater milky. So the difference is the gas made, and only the carbonate reaction also produces water."
          />
        </Practice>
        <SelfCheck id="6.2.4" items={[
          "I can identify synthesis, decomposition, single displacement and neutralisation from their pattern.",
          "I can predict products of combustion, acid + metal and acid + carbonate reactions.",
          "I can use a reactivity series to decide if displacement will happen.",
          "I can describe the tests for hydrogen, carbon dioxide and oxygen.",
          "I can name the salt made by a given acid.",
        ]}/>
        <NotebookLink href={NB + "#6.2"} label="Learn it in full: Chemical Reactions"/>
      </DotPoint>

      <DotPoint id="6.2.5" title="pH measures acidity; compare common substances with pure water" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li><Term def="A scale from 0 to 14 showing how acidic or basic a solution is.">pH</Term> measures how acidic or basic a solution is, usually on a 0–14 scale.</li>
            <li>pH below 7 = <strong>acidic</strong>; pH 7 = <strong>neutral</strong> (pure water at 25 °C); pH above 7 = <strong>basic</strong> (alkaline, if the base is dissolved).</li>
            <li>The lower the pH, the stronger the acidity: each drop of 1 pH unit means 10 times more acidic (pH 2 is 100 times more acidic than pH 4).</li>
            <li>Typical acids: lemon juice, vinegar, soft drinks, stomach acid. Typical bases: baking soda, soap, milk of magnesia, bleach, drain cleaner.</li>
          </ul>
        </Recap>
        <PhScaleFigure/>
        <Practice title="The pH scale">
          <MCQ num={23}
            question="Which of these substances has a pH closest to pure water?"
            options={["Lemon juice", "Milk", "Drain cleaner", "Vinegar"]}
            correct={1}
            explain="Milk is about pH 6.5, very close to neutral pH 7. Vinegar might seem mild, but at about pH 3 it is 10 000 times more acidic than water."
          />
          <MCQ num={24}
            question="Rainwater in one town has a pH of 4. In another town it is pH 6. How does the acidity compare?"
            options={["pH 4 rain is 2 times more acidic", "pH 4 rain is 100 times more acidic", "pH 6 rain is 100 times more acidic", "They are equally acidic because both are below 7"]}
            correct={1}
            explain="Each pH unit is a 10 times change, so 2 units is 10 × 10 = 100 times. Lower pH means more acidic, so the pH 4 rain is the more acidic. '2 times' is tempting but treats the scale as if it went up in equal steps."
          />
        </Practice>
        <SelfCheck id="6.2.5" items={[
          "I can say what pH below 7, equal to 7 and above 7 means.",
          "I can place common substances on the pH scale compared with pure water.",
          "I can explain that a lower pH means more acidic, by 10 times per unit.",
        ]}/>
        <NotebookLink href={NB + "#6.2"} label="Learn it in full: Chemical Reactions"/>
      </DotPoint>

      <DotPoint id="6.2.6" title="Use indicators or a pH meter to follow neutralisation" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li>An <Term def="A substance that changes colour depending on the pH.">indicator</Term> changes colour with pH. Litmus: red in acid, blue in base. Phenolphthalein: colourless in acid and neutral solutions, pink in basic ones. Universal indicator shows a range of colours you match against a chart to estimate pH.</li>
            <li>A <strong>pH meter</strong> gives a number (often to 0.01). Calibrate it first, rinse the probe between solutions, and stir before reading.</li>
            <li>To follow a neutralisation, add acid a little at a time to a base (or base to acid) and record the pH after each addition.</li>
            <li>The pH moves towards 7, changes very quickly near the <strong>neutral point</strong>, then levels off on the other side (Figure 4).</li>
          </ul>
        </Recap>
        <NeutralisationCurve/>
        <Practice title="Following neutralisation">
          <MCQ num={25}
            question="Use Figure 4. What volume of acid had been added when the solution was exactly neutral?"
            options={["10.0 mL", "20.0 mL", "25.0 mL", "50.0 mL"]}
            correct={2}
            explain="The curve crosses pH 7 at 25.0 mL, the middle of the steep drop. At 20.0 mL the pH is still about 12, because a little unreacted base remains and pH changes only slowly until very close to the neutral point."
          />
          <WrittenQ num={26}
            question="Give two reasons why a pH meter is better than universal indicator for following the pH change in Figure 4. (2 marks)"
            model="A pH meter gives a precise number (for example 12.05) instead of a colour you have to match to a chart, so the results are more accurate. It also does not depend on judging colours by eye, so different people get the same reading, and it can take many readings quickly to show the sudden change near the neutral point."
          />
        </Practice>
        <SelfCheck id="6.2.6" items={[
          "I can describe the colours of litmus and phenolphthalein in acids and bases.",
          "I can describe how to use a pH meter to follow a neutralisation.",
          "I can read the neutral point from a pH curve.",
        ]}/>
        <NotebookLink href={NB + "#6.2"} label="Learn it in full: Chemical Reactions"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 6.3  Reaction rate
   ============================================================ */
function Section63({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.3 Reaction rate</div>
        <h1>Faster or slower</h1>
        <p className="lead">Collision theory explains how concentration, surface area, temperature and catalysts change the speed of a reaction, and how to investigate it fairly.</p>
      </div>

      <DotPoint id="6.3.1" title="How concentration, surface area, temperature and catalysts affect rate (collision theory)" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li><Term def="Particles must collide, with enough energy and the right orientation, to react.">Collision theory</Term>: to react, particles must <strong>collide</strong> with at least the <Term def="The minimum energy colliding particles need to react.">activation energy</Term>. Rate depends on <strong>how often</strong> collisions happen and <strong>what fraction</strong> have enough energy.</li>
            <li><strong>Concentration</strong> ↑ → more particles in the same volume → more frequent collisions → faster.</li>
            <li><strong>Surface area</strong> ↑ (powder or small pieces instead of a lump) → more particles exposed → more frequent collisions → faster.</li>
            <li><strong>Temperature</strong> ↑ → particles move faster → collide more often <em>and</em> a bigger fraction of collisions have enough energy → faster (often about double for every 10 °C).</li>
            <li>A <Term def="A substance that speeds up a reaction by lowering the activation energy, and is not used up.">catalyst</Term> gives the reaction a different pathway with a lower activation energy, so more collisions succeed. It is not used up. Examples: manganese dioxide or the enzyme catalase (in yeast or liver) with hydrogen peroxide.</li>
            <li>Changing the rate does not change the total amount of product, unless you change the amount of reactant.</li>
          </ul>
        </Recap>
        <CollisionFigure/>
        <WorkedExample
          title="Explaining a temperature effect"
          problem="When sodium thiosulfate solution reacts with acid it turns cloudy, so a cross under the flask disappears. Explain why the cross disappears sooner when the solutions are warmed from 20 °C to 40 °C. (3 marks)"
          steps={[
            "Cause: at higher temperature the particles have more kinetic energy and move faster.",
            "Effect 1: they collide more often.",
            "Effect 2: a greater proportion of the collisions have energy equal to or above the activation energy.",
            "Link: more successful collisions per second means a faster rate, so the cloudy sulfur forms sooner and the cross disappears in less time.",
          ]}
          answer="At 40 °C the particles move faster, so they collide more frequently and more of the collisions have at least the activation energy. This gives more successful collisions per second, a faster rate, and the cross disappears sooner."
        />
        <WorkedExample
          title="What a catalyst does"
          problem="A little black manganese dioxide powder is added to hydrogen peroxide solution and it fizzes rapidly with oxygen. Afterwards the powder is filtered, dried and weighed: it has the same mass as at the start. Explain these observations. (3 marks)"
          steps={[
            "Name its role: manganese dioxide is a catalyst for the decomposition hydrogen peroxide → water + oxygen.",
            "How it speeds up the reaction: it provides a pathway with a lower activation energy, so a larger fraction of collisions are successful.",
            "Why the mass is unchanged: a catalyst is not used up in the reaction, so it can be recovered.",
          ]}
          answer="Manganese dioxide is a catalyst. It lowers the activation energy, so more collisions succeed and oxygen is made much faster. Its mass is unchanged because a catalyst is not used up."
        />
        <ExamTip>
          A full "explain" answer on rate has three links: <strong>change</strong> (e.g. smaller pieces) → <strong>collisions</strong> (more frequent, or more with enough energy) → <strong>rate</strong> (faster). Answers that skip the collision step usually lose a mark. Say "more frequent collisions", not just "more collisions".
        </ExamTip>
        <Practice title="Collision theory">
          <MCQ num={27}
            question="Equal masses of marble powder and marble chips are added to identical acid. The powder reacts faster. Why?"
            options={["The powder particles have more energy", "The powder has a larger surface area, so collisions with acid particles are more frequent", "The powder lowers the activation energy", "The powder has more mass exposed to the air"]}
            correct={1}
            explain="Grinding exposes more surface, so acid particles collide with the solid more often. Lowering the activation energy is what a catalyst does; grinding does not change the energy needed for a collision to succeed."
          />
          <MCQ num={28}
            question="What is the main reason raising the temperature speeds up a reaction?"
            options={["The activation energy becomes lower", "The particles become larger and easier to hit", "Particles move faster, so they collide more often and more collisions have enough energy", "The concentration of the reactants increases"]}
            correct={2}
            explain="Faster particles collide more often, and a bigger share of collisions reach the activation energy. The activation energy itself does not change with temperature; only a catalyst lowers it."
          />
          <MCQ num={29}
            question="A piece of liver (containing the enzyme catalase) is added to a flask of hydrogen peroxide. Compared with no liver, what happens to the total volume of oxygen collected when the reaction has finished?"
            options={["It is the same, but it is produced faster", "It is doubled", "It is less, because the catalyst uses some up", "It is the same, but it is produced more slowly"]}
            correct={0}
            explain="A catalyst speeds the reaction up but does not change how much product the reactants can make. 'Doubled' is tempting, but the volume of oxygen depends only on how much hydrogen peroxide there is."
          />
          <MCQ num={30}
            question="Sasha repeats a reaction using acid twice as concentrated. Which statement explains why it is faster?"
            options={["The acid particles move faster", "There are more acid particles in the same volume, so collisions are more frequent", "Each collision has more energy", "The acid becomes a catalyst"]}
            correct={1}
            explain="Higher concentration means more particles crowded into the same volume, so they collide more often. Speed and energy of particles depend on temperature, which has not changed."
          />
          <WrittenQ num={31}
            question="Explain, using collision theory, why milk stays fresh for longer in a fridge at 4 °C than on a bench at 25 °C. (3 marks)"
            model="Milk goes off because of chemical reactions (caused by bacteria and their enzymes). At 4 °C the particles have less kinetic energy and move more slowly, so they collide less often and fewer collisions have the activation energy. This means fewer successful collisions per second, so the reactions that spoil the milk are slower and it stays fresh for longer."
          />
          <WrittenQ num={32}
            question="A bag of flour burns slowly if lit, but a cloud of fine flour dust in the air of a flour mill can explode. Explain this difference using collision theory. (4 marks)"
            model="In a cloud of dust each tiny flour particle is surrounded by air, so the surface area in contact with oxygen is enormous compared with a packed bag where only the outside surface is exposed. A larger surface area means oxygen particles collide with flour particles far more frequently. More frequent collisions give many more successful collisions per second, so the reaction rate is extremely fast. The heat is released so quickly that it causes an explosion, whereas the bag only burns slowly at its surface."
          />
        </Practice>
        <SelfCheck id="6.3.1" items={[
          "I can state collision theory, including activation energy.",
          "I can explain the effect of concentration and surface area using collision frequency.",
          "I can explain why temperature has two effects on collisions.",
          "I can explain how a catalyst works and that it is not used up.",
        ]}/>
        <NotebookLink href={NB + "#6.3"} label="Learn it in full: Reaction Rate"/>
      </DotPoint>

      <DotPoint id="6.3.2" title="Investigate rate: hypothesis, variables, means, outliers and graphs" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li>A <strong>measurable hypothesis</strong> names the independent and dependent variables and the direction: "If the temperature of the thiosulfate is increased from 20 °C to 50 °C, then the time for the cross to disappear will decrease, because particles collide more often and with more energy."</li>
            <li><Term def="The variable you change on purpose.">Independent variable</Term> (IV): what you change. <Term def="The variable you measure.">Dependent variable</Term> (DV): what you measure. <Term def="Variables kept the same so the test is fair.">Controlled variables</Term>: everything else kept the same (volumes, concentration, mass, chip size, temperature, same balance).</li>
            <li>Do at least <strong>three trials</strong> and calculate the <strong>mean</strong>. An <Term def="A result that does not fit the pattern of the others; leave it out of the mean.">outlier</Term> is a result that clearly does not fit; leave it out of the mean and say so.</li>
            <li>Measuring rate: mass lost on a balance (gas escaping), volume of gas collected, or time for a cross to disappear. Shorter time = faster rate; rate ≈ 1 ÷ time.</li>
            <li>Graphs: IV on the x-axis, DV on the y-axis, labels with units, even scales, a smooth curve of best fit. <strong>Steeper gradient = faster rate.</strong> The curve flattens when a reactant runs out.</li>
            <li>Average rate = change in amount ÷ time taken (e.g. g/s).</li>
          </ul>
        </Recap>
        <MarbleGraph/>
        <WorkedExample
          title="Means and outliers"
          problem={
            <div>
              <p style={{ marginTop: 0 }}>Jordan times how long the cross takes to disappear at different temperatures.</p>
              <TableWrap>
                <table className="data-table" style={{ minWidth: 300 }}>
                  <thead><tr><th>Temp (°C)</th><th>Trial 1 (s)</th><th>Trial 2 (s)</th><th>Trial 3 (s)</th></tr></thead>
                  <tbody>
                    <tr><td>20</td><td>62</td><td>60</td><td>85</td></tr>
                    <tr><td>30</td><td>31</td><td>29</td><td>30</td></tr>
                    <tr><td>40</td><td>16</td><td>14</td><td>15</td></tr>
                  </tbody>
                </table>
              </TableWrap>
              <p style={{ marginBottom: 0 }}>Identify the outlier, calculate the mean time at each temperature, and describe the trend.</p>
            </div>
          }
          steps={[
            "Look for a result far from the others in the same row: 85 s at 20 °C (the others are 62 s and 60 s). That is the outlier.",
            "Mean at 20 °C (outlier removed): (62 + 60) ÷ 2 = 61 s.",
            "Mean at 30 °C: (31 + 29 + 30) ÷ 3 = 90 ÷ 3 = 30 s.",
            "Mean at 40 °C: (16 + 14 + 15) ÷ 3 = 45 ÷ 3 = 15 s.",
            "Trend: as temperature increases the time decreases, so the rate increases. Each 10 °C rise roughly halves the time (doubles the rate).",
          ]}
          answer="Outlier: 85 s. Means: 61 s, 30 s, 15 s. As temperature increases, the time for the cross to disappear decreases (rate increases), roughly halving for every 10 °C."
        />
        <WorkedExample
          title="Reading a rate graph"
          problem="Use Figure 6. (a) Calculate the average rate of reaction for the small chips over the first 60 s. (b) Explain why both lines level off at the same mass. (3 marks)"
          steps={[
            "(a) Read the graph: at 60 s the small chips have lost 1.50 g.",
            "Average rate = change in mass ÷ time = 1.50 g ÷ 60 s = 0.025 g/s.",
            "(b) The lines level off when the reaction stops, because all the marble has been used up (the acid is in excess).",
            "Both used the same mass of marble (5.00 g), so both make the same mass of carbon dioxide (2.20 g). Chip size changes only how fast it is made.",
          ]}
          answer="(a) 0.025 g/s. (b) Each reaction stops when the 5.00 g of marble is used up; the same mass of marble gives the same total mass of carbon dioxide, 2.20 g. The small chips just get there sooner."
        />
        <Practice title="Rate investigations">
          <MCQ num={33}
            question="A class investigates how temperature affects the time for a cross to disappear under a flask of sodium thiosulfate and acid. What is the independent variable?"
            options={["The time for the cross to disappear", "The temperature of the solution", "The volume of sodium thiosulfate", "The size of the cross"]}
            correct={1}
            explain="The independent variable is the one deliberately changed: temperature. The time is the dependent variable, because it is what you measure."
          />
          <MCQ num={34}
            question="Four trials give times of 42 s, 44 s, 43 s and 61 s. What is the best mean value to record?"
            options={["47.5 s", "61 s", "43 s", "44 s"]}
            correct={2}
            explain="61 s is an outlier, so leave it out: (42 + 44 + 43) ÷ 3 = 129 ÷ 3 = 43 s. 47.5 s is what you get if you include the outlier, which drags the mean away from the real result."
          />
          <MCQ num={35}
            question="Look at the small-chips line in Figure 6. When is the rate of reaction fastest?"
            options={["At the start, from 0 to 30 s", "From 120 to 150 s", "From 180 to 240 s", "The rate is the same throughout"]}
            correct={0}
            explain="The line is steepest at the start, when the most marble and acid are available to collide. From 180 s the line is flat, so the rate there is zero, not fastest."
          />
          <WrittenQ num={36}
            question="Ava drops one effervescent antacid tablet into 200 mL of water and times how long it takes to stop fizzing. She repeats this with water at 15 °C, 25 °C, 35 °C and 45 °C. Write a measurable hypothesis for her investigation. (2 marks)"
            model="If the temperature of the water is increased from 15 °C to 45 °C, then the time for the tablet to stop fizzing will decrease, because the particles move faster, so they collide more frequently and more of the collisions have at least the activation energy."
          />
          <WrittenQ num={37}
            question="For Ava's investigation in Question 36, identify two variables she must control, and suggest one way to make her timing more accurate. (3 marks)"
            model="Two controlled variables: the volume of water (200 mL) and the type and size of tablet (same brand, one whole tablet each time; also no stirring). Keeping these the same means any change in time is caused only by temperature. Deciding exactly when fizzing has 'stopped' is hard to judge, so she could agree a clear end point beforehand (e.g. no bubbles rising for 5 s) and use the same observer and stopwatch every time, which reduces random timing errors."
          />
          <WrittenQ num={38}
            question="Use Figure 6. Calculate the average rate for the large chips over the first 120 s, and compare it with the small chips over the same time. (3 marks)"
            model="Large chips: mass lost at 120 s = 1.48 g. Average rate = 1.48 g ÷ 120 s ≈ 0.012 g/s. Small chips: 2.06 g ÷ 120 s ≈ 0.017 g/s. The small chips react faster, because they have a larger surface area, so acid particles collide with the marble more frequently."
          />
        </Practice>
        <SelfCheck id="6.3.2" items={[
          "I can write a measurable 'If … then … because' hypothesis.",
          "I can identify independent, dependent and controlled variables.",
          "I can spot an outlier and calculate a mean without it.",
          "I can read a rate graph and calculate an average rate with units.",
          "I can explain why a rate curve gets less steep and levels off.",
        ]}/>
        <NotebookLink href={NB + "#6.3"} label="Learn it in full: Reaction Rate"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 6.4  Nuclear reactions
   ============================================================ */
function Section64({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.4 Nuclear reactions</div>
        <h1>Unstable nuclei</h1>
        <p className="lead">Write alpha and beta decay as balanced nuclear equations, work with half-life, and weigh up how radioisotopes are used.</p>
      </div>

      <DotPoint id="6.4.3" title="Write alpha and beta decay as nuclear equations" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>In a nuclear symbol such as sodium-23, <Nuc a="23" z="11" s="Na"/>, the upper number counts all the particles in the nucleus (protons + neutrons): this is the <strong>mass number</strong>. The lower number counts only the protons: this is the <strong>atomic number</strong>, and it decides which element it is. Neutrons = 23 − 11 = 12.</li>
            <li><Term def="Decay in which a nucleus emits an alpha particle: a group of 2 protons and 2 neutrons.">Alpha decay</Term>: the nucleus throws out an alpha particle, a tight group of 2 protons and 2 neutrons, written <Nuc a="4" z="2" s="α"/>. The new nucleus has a mass number <strong>4 lower</strong> and an atomic number <strong>2 lower</strong>.</li>
            <li><Term def="Decay in which a neutron changes into a proton and a fast electron (beta particle) is emitted.">Beta decay</Term>: a neutron turns into a proton and an electron <Nuc a="0" z="−1" s="e"/> is shot out. Mass number <strong>stays the same</strong>, atomic number goes <strong>up 1</strong>.</li>
            <li>Nothing is lost in the decay, so check two totals: the mass number before the arrow equals the sum of the mass numbers after it, and the atomic number before the arrow equals the sum of the atomic numbers after it (count −1 for a beta particle).</li>
            <li>The new atomic number tells you the new element: look it up on the <strong>periodic table on your data sheet</strong>.</li>
            <li>Gamma rays are energy only, so they change neither number.</li>
          </ul>
        </Recap>
        <WorkedExample
          title="Alpha decay of americium-241"
          problem={<span>Americium-241 (<Nuc a="241" z="95" s="Am"/>), used in smoke detectors, decays by alpha emission. Write the nuclear equation.</span>}
          steps={[
            "Alpha particle: mass number 4, atomic number 2.",
            "New mass number: 241 − 4 = 237. New atomic number: 95 − 2 = 93.",
            "Periodic table: element 93 is neptunium (Np).",
            <span key="c">Check the totals: mass numbers 241 = 237 + 4; atomic numbers 95 = 93 + 2.</span>,
          ]}
          answer={<span><Nuc a="241" z="95" s="Am"/> → <Nuc a="237" z="93" s="Np"/> + <Nuc a="4" z="2" s="He"/></span>}
        />
        <Eq><Nuc a="60" z="27" s="Co"/> → <Nuc a="60" z="28" s="Ni"/> + <Nuc a="0" z="−1" s="e"/>   (beta decay of cobalt-60)</Eq>
        <Practice title="Nuclear equations">
          <MCQ num={39}
            question="Strontium-90 (mass number 90, atomic number 38) undergoes beta decay. What is the new nucleus?"
            options={["Yttrium-90 (atomic number 39)", "Krypton-86 (atomic number 36)", "Rubidium-90 (atomic number 37)", "Strontium-91 (atomic number 38)"]}
            correct={0}
            explain="In beta decay the mass number stays at 90 and the atomic number rises by 1 to 39, which is yttrium. Krypton-86 is what alpha decay would give (mass − 4, atomic number − 2)."
          />
          <MCQ num={40}
            question="Radium-226 (atomic number 88) decays by alpha emission. What are the mass number and atomic number of the new nucleus?"
            options={["226 and 89", "222 and 86", "224 and 86", "222 and 90"]}
            correct={1}
            explain="Alpha decay removes 4 from the mass number (226 → 222) and 2 from the atomic number (88 → 86, radon). '222 and 90' is tempting if you add 2 to the atomic number instead of subtracting it."
          />
          <WrittenQ num={41}
            question="Phosphorus-32 (atomic number 15) decays by beta emission. Write the nuclear equation and describe what happens inside the nucleus. (3 marks)"
            model={<span><Nuc a="32" z="15" s="P"/> → <Nuc a="32" z="16" s="S"/> + <Nuc a="0" z="−1" s="e"/>. Inside the nucleus a neutron changes into a proton and an electron; the electron is emitted as a beta particle. The mass number stays at 32 but the atomic number rises from 15 to 16, so the phosphorus becomes sulfur (sulfur-32).</span>}
          />
          <WrittenQ num={42}
            question="Thorium-232 (atomic number 90) decays by one alpha emission, then two beta emissions in a row. Identify the final nucleus, showing the mass number and atomic number after each step. (3 marks)"
            model="Alpha: mass 232 − 4 = 228, atomic number 90 − 2 = 88 (radium-228). First beta: mass stays 228, atomic number 88 + 1 = 89 (actinium-228). Second beta: mass 228, atomic number 89 + 1 = 90. The final nucleus is thorium-228 (mass number 228, atomic number 90)."
          />
        </Practice>
        <SelfCheck id="6.4.3" items={[
          "I can describe an alpha particle and a beta particle with their symbols.",
          "I can predict the new mass number and atomic number after alpha or beta decay.",
          "I can use the periodic table to name the new element.",
          "I can check that the mass numbers and the atomic numbers each have the same total before and after the arrow.",
        ]}/>
        <NotebookLink href={NB + "#6.4"} label="Learn it in full: Nuclear Reactions"/>
      </DotPoint>

      <DotPoint id="6.4.4" title="Half-life: definition and calculations from tables and graphs" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li><Term def="The time taken for half of the radioactive nuclei in a sample to decay (or for the activity to halve).">Half-life</Term>: the time for <strong>half</strong> of the radioactive atoms in a sample to decay. The activity (counts per second, in becquerels, Bq) halves in the same time.</li>
            <li>Each half-life leaves half of what was there: 1 → ½ → ¼ → ⅛ → ¹⁄₁₆.</li>
            <li>Number of half-lives n = time passed ÷ half-life. Amount left = starting amount × (½)ⁿ.</li>
            <li>From a graph or table: find the time for the value to fall to half (e.g. 1600 → 800). Check with a second halving (800 → 400) for accuracy.</li>
            <li>Half-lives range hugely: technetium-99m 6 hours, sodium-24 15 hours, cobalt-60 5.3 years, americium-241 432 years, carbon-14 5730 years.</li>
            <li>Decay is random: you cannot predict when one atom decays, only how a large sample behaves.</li>
          </ul>
        </Recap>
        <DecayGraph/>
        <HalfLifeInteractive/>
        <WorkedExample
          title="Activity after a whole number of half-lives"
          problem="A patient is injected with technetium-99m with an activity of 80 MBq. Its half-life is 6 hours. What is the activity 24 hours later?"
          steps={[
            "Number of half-lives: n = 24 h ÷ 6 h = 4.",
            "Halve four times: 80 → 40 → 20 → 10 → 5 MBq.",
            "Or use the formula: 80 × (½)⁴ = 80 ÷ 16 = 5 MBq.",
          ]}
          answer="5 MBq."
        />
        <WorkedExample
          title="Working backwards: carbon-14 dating"
          problem="A wooden tool has only 25% of the carbon-14 found in living wood. Carbon-14 has a half-life of 5730 years. How old is the tool?"
          steps={[
            "Work out how many halvings give 25%: 100% → 50% → 25%, which is 2 half-lives.",
            "Age = number of half-lives × half-life = 2 × 5730 years.",
            "= 11 460 years.",
          ]}
          answer="About 11 460 years old."
        />
        <ExamTip>
          "Calculate" questions: show the number of half-lives, then the halving steps, then the answer with a unit. Writing 80 → 40 → 20 → 10 → 5 MBq earns working marks even if you slip at the end.
        </ExamTip>
        <Practice title="Half-life">
          <MCQ num={43}
            question="Cobalt-60 has a half-life of 5.3 years. A hospital source is 10.6 years old. What fraction of its original cobalt-60 is left?"
            options={["One half", "One quarter", "One eighth", "None"]}
            correct={1}
            explain="10.6 ÷ 5.3 = 2 half-lives, so ½ × ½ = ¼ is left. 'None' is a common mistake: after two half-lives a quarter remains, not zero, because each half-life halves what is left."
          />
          <MCQ num={44}
            question="Use Figure 7. What is the half-life of sodium-24?"
            options={["7.5 hours", "15 hours", "30 hours", "800 hours"]}
            correct={1}
            explain="The activity falls from 1600 Bq to 800 Bq (half) in 15 hours. 30 hours is when it reaches 400 Bq, a quarter, which is two half-lives."
          />
          <MCQ num={45}
            question="Americium-241 in a smoke detector has a half-life of 432 years. How does its activity after 10 years compare with when the detector was new?"
            options={["It is almost exactly the same", "It has fallen to about half", "It has fallen to about a quarter", "It has fallen to zero"]}
            correct={0}
            explain="10 years is a tiny fraction of one 432-year half-life, so almost no americium has decayed (about 98% is left). 'About half' would need 432 years to pass."
          />
          <WrittenQ num={46}
            question="A patient is given technetium-99m (half-life 6 hours) with an activity of 400 MBq at 8:00 am. (a) What is the activity at 8:00 pm the same day? (b) How many hours after the injection does the activity reach 25 MBq? (3 marks)"
            model="(a) 8:00 am to 8:00 pm is 12 hours, which is 12 ÷ 6 = 2 half-lives: 400 → 200 → 100 MBq. Activity = 100 MBq. (b) 400 → 200 → 100 → 50 → 25 MBq is 4 half-lives, so 4 × 6 = 24 hours after the injection."
          />
          <WrittenQ num={47}
            question="A detector measures a fluorine-18 sample: 0 min, 1200 counts/s; 55 min, 850; 110 min, 600; 165 min, 425; 220 min, 300. Determine the half-life, showing how you used the data. (2 marks)"
            model="The count rate halves from 1200 counts/s to 600 counts/s between 0 and 110 minutes, so the half-life is 110 minutes. This is confirmed because it halves again from 600 to 300 counts/s between 110 and 220 minutes (another 110 minutes)."
          />
          <WrittenQ num={48}
            question="Iron-59 has a half-life of about 45 days. A research lab has 3.2 g of it. How many days will it take until only 0.4 g of iron-59 remains? (2 marks)"
            model="Halve until 0.4 g is reached: 3.2 → 1.6 → 0.8 → 0.4 g, which is 3 half-lives. Time = 3 × 45 = 135 days."
          />
        </Practice>
        <SelfCheck id="6.4.4" items={[
          "I can define half-life.",
          "I can read a half-life from a decay graph or table.",
          "I can calculate the amount left after a whole number of half-lives.",
          "I can work backwards from a fraction left to find a time or age.",
        ]}/>
        <NotebookLink href={NB + "#6.4"} label="Learn it in full: Nuclear Reactions"/>
      </DotPoint>

      <DotPoint id="6.4.5" title="Benefits and considerations of radioisotopes in medicine, industry and the environment" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ul>
            <li>A <Term def="An unstable isotope of an element that emits radiation as it decays.">radioisotope</Term> is chosen for a job by its <strong>type of radiation</strong> and its <strong>half-life</strong>.</li>
            <li>Penetration: alpha is stopped by paper or skin; beta by a few millimetres of aluminium; gamma needs thick lead or concrete.</li>
          </ul>
          <TableWrap>
            <table className="data-table" style={{ minWidth: 420 }}>
              <thead><tr><th>Use</th><th>Radioisotope</th><th>Why it suits the job</th></tr></thead>
              <tbody>
                <tr><td>Medical imaging (tracer)</td><td>Technetium-99m</td><td>Gamma passes out of the body to a camera; 6 h half-life means low dose</td></tr>
                <tr><td>Radiotherapy; sterilising equipment and food</td><td>Cobalt-60</td><td>Strong gamma kills cancer cells or microbes; 5.3 y half-life lasts years</td></tr>
                <tr><td>Smoke detectors</td><td>Americium-241</td><td>Alpha ionises air but is stopped by the case; 432 y half-life</td></tr>
                <tr><td>Paper/foil thickness gauge</td><td>a beta emitter</td><td>Beta is partly absorbed, so readings change with thickness</td></tr>
                <tr><td>Finding pipe leaks</td><td>Sodium-24</td><td>Gamma detected through soil; 15 h half-life, gone in days</td></tr>
                <tr><td>Dating and environmental tracing</td><td>Carbon-14; tracers in water</td><td>Dates once-living things; tracks water flow and pollution</td></tr>
              </tbody>
            </table>
          </TableWrap>
          <ul>
            <li><strong>Benefits</strong>: diagnosis without surgery, cancer treatment, safer sterile products, fire safety, quality control, dating the past, tracking pollution.</li>
            <li><strong>Considerations</strong>: radiation can damage cells and DNA (cancer risk), so doses must be kept low; shielding and protective equipment for workers; safe storage and disposal of long-lived waste; cost; security of sources.</li>
          </ul>
        </Recap>
        <WorkedExample
          title="Evaluating a medical use"
          problem="Evaluate the use of technetium-99m to produce images of a patient's bones. (4 marks)"
          steps={[
            "Benefit 1: it emits gamma rays, which pass out of the body and are picked up by a camera, giving an image without surgery.",
            "Benefit 2: its short half-life (6 hours) means the activity drops quickly, so the patient receives a low total dose.",
            "Consideration: any ionising radiation can damage cells and slightly raises cancer risk; staff need shielding; it must be made fresh because it decays quickly.",
            "Judgement: the benefits of an accurate diagnosis clearly outweigh the small, short-lived risk, so it is a very suitable choice.",
          ]}
          answer="Technetium-99m is well suited: its gamma rays escape the body to form an image and its 6-hour half-life keeps the dose low. The risks (cell damage, handling, short shelf life) are small and managed, so the benefit of diagnosis outweighs them."
        />
        <WorkedExample
          title="Why this isotope?"
          problem="Explain why americium-241 is a suitable radioisotope for a household smoke detector. (3 marks)"
          steps={[
            "Type of radiation: it emits alpha particles, which ionise the air between two plates so a small current flows. Smoke absorbs the alpha particles, the current drops and the alarm sounds.",
            "Safety: alpha particles travel only a few centimetres in air and are stopped by the plastic case, so people are not exposed.",
            "Half-life: 432 years, so the source lasts far longer than the detector and never needs replacing.",
          ]}
          answer="It emits alpha radiation, which ionises the air to make the detector work but is stopped by the casing, and its 432-year half-life means it keeps working for the life of the detector."
        />
        <ExamTip>
          "Evaluate" means give <strong>benefits and considerations</strong>, then a <strong>judgement</strong> ("overall the benefits outweigh the risks because…"). Without a judgement, an evaluate answer usually cannot get full marks.
        </ExamTip>
        <Practice title="Using radioisotopes">
          <MCQ num={49}
            question="Which radioisotope would be most suitable as a tracer injected into a patient to image an organ?"
            options={["An alpha emitter with a 432-year half-life", "A beta emitter with a 29-year half-life", "A gamma emitter with a 6-hour half-life", "A beta emitter with a 5730-year half-life"]}
            correct={2}
            explain="Gamma rays leave the body to reach the camera, and a short half-life keeps the dose low. An alpha emitter is the worst choice: alpha cannot escape the body to be detected, and it does a lot of damage to nearby cells."
          />
          <MCQ num={50}
            question="A paper mill uses a radioactive source and a detector to check paper thickness. Why is a beta emitter used?"
            options={["Beta passes straight through paper whatever its thickness", "Beta is partly absorbed by paper, so the reading changes when thickness changes", "Beta is completely stopped by a single sheet of paper", "Beta has the longest half-life"]}
            correct={1}
            explain="Some beta gets through and some is absorbed, so thicker paper lowers the count. Alpha is the radiation stopped by a sheet of paper, so it would give zero reading whatever the thickness; gamma passes through almost unchanged."
          />
          <MCQ num={51}
            question="Why can carbon-14 dating not be used to find the age of a 2-million-year-old volcanic rock?"
            options={["Rocks are too hard for carbon-14 to decay", "Carbon-14 only decays in water", "The rock was never alive, and after so many half-lives almost no carbon-14 would be left anyway", "Carbon-14 has a half-life that is too short to measure"]}
            correct={2}
            explain="Carbon-14 dating works on things that were once living (they took in carbon), and only up to about 50 000 years, because after many half-lives there is too little left to measure. Rock hardness has no effect: radioactive decay is not affected by physical conditions."
          />
          <WrittenQ num={52}
            question="Some foods are irradiated with gamma rays from cobalt-60 to kill bacteria. Evaluate this use of a radioisotope. (4 marks)"
            model="Benefit: gamma rays kill bacteria and insects in the food, so it lasts longer and there is less food poisoning and waste. The food does not become radioactive, because it is only exposed to the radiation, not contaminated with the source. Considerations: the cobalt-60 source is very dangerous to people, so it must be heavily shielded and kept secure, and workers must be protected; the 5.3-year half-life means it must eventually be replaced and disposed of safely; some people worry about the taste or nutrients changing. Judgement: with strict shielding and handling, the benefits of safer, longer-lasting food outweigh the risks."
          />
          <WrittenQ num={53}
            question="Engineers add a small amount of sodium-24 (a gamma emitter, half-life 15 hours) to water in an underground pipe to find a leak. Explain why sodium-24 is suitable. (3 marks)"
            model="Sodium-24 emits gamma rays, which can pass through the soil, so a detector on the surface picks up a high reading where water containing it has leaked out. Its half-life of 15 hours is long enough to complete the test, but short enough that the activity falls to almost nothing within a few days, so it does not leave a long-term hazard in the water or soil."
          />
          <WrittenQ num={54}
            question="Outline one benefit and one consideration of using radioisotopes for environmental monitoring, such as tracing how pollution spreads through a river. (2 marks)"
            model="Benefit: a radioactive tracer can be detected in very tiny amounts, so scientists can see exactly where and how fast pollution moves and plan how to clean it up. Consideration: the tracer releases radiation into the environment, so only a small amount of a short half-life isotope should be used to avoid harming living things or people who use the water."
          />
        </Practice>
        <SelfCheck id="6.4.5" items={[
          "I can describe uses of radioisotopes in medicine, industry and the environment.",
          "I can explain why the type of radiation and half-life suit a use.",
          "I can list risks and how they are managed.",
          "I can write an 'evaluate' answer with a clear judgement.",
        ]}/>
        <NotebookLink href={NB + "#6.4"} label="Learn it in full: Nuclear Reactions"/>
      </DotPoint>
    </>
  );
}

/* ============================================================
   MOUNT
   ============================================================ */
mountTopicApp({
  year: 10,
  topicTitle: "Reactions",
  branch: "chemistry",
  heroImage: "img/hero.webp",
  strand: "Yearly Exam Revision · Stage 5",
  accent: "purple",
  storageKey: "y10.rev-reactions",
  hubHref: "../",
  intro: "Revise conservation of mass, naming compounds, balancing equations, reaction types, pH, reaction rate and nuclear reactions. Each dot point has a quick recap, worked examples, practice questions with model answers, and a self-check. Keep your data sheet's periodic table handy for ion charges and element names.",
  glossary: {
    "law of conservation of mass": "In a chemical reaction mass is neither created nor destroyed: total mass of reactants = total mass of products.",
    "open system": "A system where matter, such as a gas, can enter or leave.",
    "closed system": "A sealed system where no matter can enter or leave.",
    "ion": "An atom or group of atoms with an electric charge, from losing or gaining electrons.",
    "polyatomic ion": "A charged group of atoms that stays together, such as sulfate (SO₄²⁻) or ammonium (NH₄⁺).",
    "ionic compound": "A compound of positive and negative ions, usually a metal with a non-metal.",
    "covalent compound": "A compound of non-metal atoms sharing electrons; named with prefixes.",
    "criss-cross method": "Swap the sizes of the ion charges so each becomes the other ion's subscript, then simplify.",
    "balanced equation": "An equation with the same number of each type of atom on both sides.",
    "coefficient": "The number in front of a formula in an equation.",
    "state symbols": "(s) solid, (l) liquid, (g) gas, (aq) dissolved in water.",
    "precipitate": "An insoluble solid that forms when two solutions are mixed.",
    "synthesis": "A reaction where two or more reactants join to make one product (A + B → AB).",
    "decomposition": "A reaction where one compound breaks into simpler substances (AB → A + B).",
    "single displacement": "A more reactive element replaces a less reactive one in a compound (A + BC → AC + B).",
    "neutralisation": "Acid + base → salt + water.",
    "combustion": "A reaction of a fuel with oxygen, releasing energy; complete combustion of a hydrocarbon gives carbon dioxide and water.",
    "reactivity series": "A list of metals in order of how reactive they are.",
    "pH": "A 0–14 scale of acidity: below 7 acidic, 7 neutral, above 7 basic.",
    "indicator": "A substance that changes colour depending on pH.",
    "pH meter": "An electronic probe that gives a numerical pH reading.",
    "rate of reaction": "How quickly reactants are used up or products are made.",
    "collision theory": "Particles must collide with enough energy (the activation energy) to react.",
    "activation energy": "The minimum energy colliding particles need for a reaction to happen.",
    "catalyst": "A substance that speeds up a reaction by lowering the activation energy, without being used up.",
    "independent variable": "The variable you change on purpose.",
    "dependent variable": "The variable you measure.",
    "controlled variable": "A variable kept the same to make the test fair.",
    "outlier": "A result that does not fit the pattern of the others.",
    "mass number": "The number of protons plus neutrons in a nucleus.",
    "atomic number": "The number of protons in a nucleus.",
    "alpha decay": "Emission of an alpha particle (2 protons + 2 neutrons): mass number − 4, atomic number − 2.",
    "beta decay": "A neutron becomes a proton and an electron is emitted: mass number unchanged, atomic number + 1.",
    "half-life": "The time for half the radioactive atoms in a sample to decay.",
    "radioisotope": "An unstable isotope that emits radiation as it decays.",
    "becquerel (Bq)": "The unit of activity: one decay per second.",
  },
  sections: [
    {
      id: "6.1",
      label: "Conservation of mass",
      accent: "purple",
      blurb: "★★ The law of conservation of mass, and why mass seems to change in open systems.",
      points: ["6.1.1", "6.1.2"],
      render: (p) => <Section61 {...p}/>,
    },
    {
      id: "6.2",
      label: "Chemical reactions",
      accent: "purple",
      blurb: "★★★ Reaction types, plus naming compounds, balanced equations and pH.",
      points: ["6.2.1", "6.2.2", "6.2.4", "6.2.5", "6.2.6"],
      render: (p) => <Section62 {...p}/>,
    },
    {
      id: "6.3",
      label: "Reaction rate",
      accent: "purple",
      blurb: "★★★ Collision theory and rate investigations: variables, means, outliers and graphs.",
      points: ["6.3.1", "6.3.2"],
      render: (p) => <Section63 {...p}/>,
    },
    {
      id: "6.4",
      label: "Nuclear reactions",
      accent: "purple",
      blurb: "★★★ Half-life and uses of radioisotopes, plus alpha and beta nuclear equations.",
      points: ["6.4.3", "6.4.4", "6.4.5"],
      render: (p) => <Section64 {...p}/>,
    },
  ],
});

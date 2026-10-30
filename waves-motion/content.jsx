/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
const { useState } = React;

const NB = "https://irvincisneros-png.github.io/Year-10-Science/waves-motion/";

/* ---------- small SVG helpers ---------- */
/* sine-wave path: starts on the rest line going up (crest a quarter-wavelength in) */
function wavePath(x0, x1, yMid, amp, lambdaPx, step = 2) {
  let d = "";
  for (let x = x0; x <= x1 + 0.01; x += step) {
    const y = yMid - amp * Math.sin((2 * Math.PI * (x - x0)) / lambdaPx);
    d += (d ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
  }
  return d;
}
/* particle rest positions shifted by s·sin(kx): compressions at x0 + λ/2, 3λ/2 … */
function longPositions(x0, x1, gap, lambdaPx, s) {
  const out = [];
  for (let p = x0; p <= x1 + 0.01; p += gap) out.push(p + s * Math.sin((2 * Math.PI * (p - x0)) / lambdaPx));
  return out;
}
const lbl = { fill: "var(--ink)", fontSize: 12, fontFamily: "inherit" };
const lblMuted = { fill: "var(--ink-muted)", fontSize: 11, fontFamily: "inherit" };

function Arrowheads({ id, color = "var(--ink)" }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" style={{ fill: color }}/>
      </marker>
    </defs>
  );
}

/* generic line graph with grid. xs/ys: axis maps; pts in data units */
function LineGraph({ id, w = 370, h = 250, xMax, yMax, xStep, yStep, xLabel, yLabel, pts, shade = false, children, aria }) {
  const L = 50, R = w - 20, T = 30, B = 210;
  const X = (t) => L + (t / xMax) * (R - L);
  const Y = (v) => B - (v / yMax) * (B - T);
  const xt = []; for (let t = 0; t <= xMax + 1e-9; t += xStep) xt.push(t);
  const yt = []; for (let v = 0; v <= yMax + 1e-9; v += yStep) yt.push(v);
  const d = pts.map((p, i) => (i ? "L " : "M ") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1)).join(" ");
  const area = d + " L " + X(pts[pts.length - 1][0]).toFixed(1) + " " + B + " L " + X(pts[0][0]).toFixed(1) + " " + B + " Z";
  return (
    <svg role="img" aria-label={aria} width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block", maxWidth: 560, margin: "0 auto" }}>
      {xt.map(t => <line key={"gx" + t} x1={X(t)} y1={T} x2={X(t)} y2={B} style={{ stroke: "var(--border)" }} strokeWidth="1"/>)}
      {yt.map(v => <line key={"gy" + v} x1={L} y1={Y(v)} x2={R} y2={Y(v)} style={{ stroke: "var(--border)" }} strokeWidth="1"/>)}
      {shade && <path d={area} style={{ fill: "var(--accent)" }} opacity="0.18"/>}
      <line x1={L} y1={B} x2={R} y2={B} style={{ stroke: "var(--ink)" }} strokeWidth="1.5"/>
      <line x1={L} y1={T} x2={L} y2={B} style={{ stroke: "var(--ink)" }} strokeWidth="1.5"/>
      {xt.map(t => <text key={"tx" + t} x={X(t)} y={B + 15} textAnchor="middle" style={lblMuted}>{t}</text>)}
      {yt.map(v => <text key={"ty" + v} x={L - 6} y={Y(v) + 4} textAnchor="end" style={lblMuted}>{v}</text>)}
      <text x={(L + R) / 2} y={h - 6} textAnchor="middle" style={lbl}>{xLabel}</text>
      <text x={14} y={(T + B) / 2} textAnchor="middle" transform={`rotate(-90 14 ${(T + B) / 2})`} style={lbl}>{yLabel}</text>
      {children && children({ X, Y })}
      <path d={d} fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="3" strokeLinejoin="round"/>
      {pts.map((p, i) => <circle key={"p" + i} cx={X(p[0])} cy={Y(p[1])} r="3.5" style={{ fill: "var(--accent-deep)" }}/>)}
    </svg>
  );
}

/* ---------- figures ---------- */
function TransverseFig() {
  // λ = 120 px, A = 45 px, rest line y = 90. Crests at x = 50, 170; troughs at 110, 230.
  return (
    <svg role="img" aria-label="Transverse wave with a crest, a trough, the wavelength measured crest to crest and the amplitude measured from the rest position to a crest" width="100%" viewBox="0 0 400 180" style={{ display: "block", maxWidth: 560, margin: "0 auto" }}>
      <Arrowheads id="tw-ah"/>
      <line x1="10" y1="90" x2="330" y2="90" style={{ stroke: "var(--ink-muted)" }} strokeDasharray="5 4" strokeWidth="1.2"/>
      <text x="10" y="106" style={lblMuted}>rest position</text>
      <path d={wavePath(20, 280, 90, 45, 120)} fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="3"/>
      <text x="50" y="36" textAnchor="middle" style={lbl}>crest</text>
      <text x="80" y="150" textAnchor="end" style={lbl}>trough</text>
      <text x="170" y="36" textAnchor="middle" style={lbl}>crest</text>
      {/* amplitude: rest line to crest level, drawn to the right */}
      <line x1="170" y1="45" x2="330" y2="45" style={{ stroke: "var(--ink-muted)" }} strokeDasharray="3 3" strokeWidth="1"/>
      <line x1="320" y1="90" x2="320" y2="47" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd="url(#tw-ah)" markerStart="url(#tw-ah)"/>
      <text x="327" y="72" style={lbl}>amplitude</text>
      {/* wavelength: trough to trough (same as crest to crest) */}
      <line x1="110" y1="140" x2="110" y2="172" style={{ stroke: "var(--ink-muted)" }} strokeWidth="1"/>
      <line x1="230" y1="140" x2="230" y2="172" style={{ stroke: "var(--ink-muted)" }} strokeWidth="1"/>
      <line x1="112" y1="166" x2="228" y2="166" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd="url(#tw-ah)" markerStart="url(#tw-ah)"/>
      <text x="238" y="170" style={lbl}>wavelength (λ)</text>
    </svg>
  );
}

function LongitudinalFig({ dots = false, speaker = false, ariaExtra = "" }) {
  // λ = 120 px. Compressions at x0 + 60 and x0 + 180; rarefactions at x0, x0 + 120, x0 + 240.
  const x0 = speaker ? 70 : 30;
  const xs = longPositions(x0, x0 + 300, 6, 120, 12);
  const mk = "url(#" + (speaker ? "sp-ah" : "lw-ah") + ")";
  const top = 40, bot = 110;
  const c1 = x0 + 60, c2 = x0 + 180, r1 = x0 + 120;
  return (
    <svg role="img" aria-label={"Longitudinal wave: particles bunched together at compressions and spread out at rarefactions; the wavelength is the distance from one compression to the next" + ariaExtra} width="100%" viewBox="0 0 400 175" style={{ display: "block", maxWidth: 560, margin: "0 auto" }}>
      <Arrowheads id={speaker ? "sp-ah" : "lw-ah"}/>
      {speaker && <g>
        <rect x="12" y="52" width="22" height="46" rx="3" style={{ fill: "var(--ink-muted)" }}/>
        <path d="M34 60 L56 40 L56 110 L34 90 Z" style={{ fill: "var(--card)", stroke: "var(--ink)" }} strokeWidth="1.5"/>
        <text x="34" y="128" textAnchor="middle" style={lblMuted}>speaker</text>
        <text x="34" y="141" textAnchor="middle" style={lblMuted}>cone</text>
      </g>}
      {xs.map((x, i) => dots
        ? [0, 1, 2, 3, 4, 5].map(r => <circle key={i + "-" + r} cx={x} cy={top + 6 + r * 12} r="2" style={{ fill: "var(--accent)" }}/>)
        : <line key={i} x1={x} y1={top} x2={x} y2={bot} style={{ stroke: "var(--accent)" }} strokeWidth="1.6"/>)}
      <text x={c1} y="30" textAnchor="middle" style={lbl}>compression</text>
      <text x={x0 + 240} y="30" textAnchor="middle" style={lbl}>rarefaction</text>
      <line x1={c1} y1="114" x2={c1} y2="130" style={{ stroke: "var(--ink-muted)" }}/>
      <line x1={c2} y1="114" x2={c2} y2="130" style={{ stroke: "var(--ink-muted)" }}/>
      <line x1={r1} y1="124" x2={c2 - 2} y2="124" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd={mk}/>
      <line x1={r1} y1="124" x2={c1 + 2} y2="124" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd={mk}/>
      <text x={r1} y="142" textAnchor="middle" style={lbl}>wavelength (λ)</text>
      <line x1={x0} y1="162" x2={x0 + 40} y2="162" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd={mk} markerStart={mk}/>
      <text x={x0 + 48} y="166" style={lblMuted}>particles vibrate</text>
      <line x1={x0 + 170} y1="162" x2={x0 + 220} y2="162" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd={mk}/>
      <text x={x0 + 228} y="166" style={lblMuted}>energy travels</text>
    </svg>
  );
}

function SpectrumFig() {
  const names = [["Radio"], ["Micro-", "waves"], ["Infra-", "red"], ["Visible"], ["Ultra-", "violet"], ["X-rays"], ["Gamma", "rays"]];
  const w = 52, x0 = 18;
  return (
    <svg role="img" aria-label="Electromagnetic spectrum in order: radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays. Wavelength decreases and frequency and energy increase from radio to gamma. All travel at 3.0 times 10 to the 8 metres per second in a vacuum." width="100%" viewBox="0 0 400 170" style={{ display: "block", maxWidth: 560, margin: "0 auto" }}>
      <Arrowheads id="em-ah"/>
      <defs>
        <linearGradient id="em-vis" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d33"/><stop offset="0.2" stopColor="#f80"/><stop offset="0.4" stopColor="#ec0"/>
          <stop offset="0.6" stopColor="#3a3"/><stop offset="0.8" stopColor="#36c"/><stop offset="1" stopColor="#82c"/>
        </linearGradient>
      </defs>
      {names.map((n, i) => (
        <g key={i}>
          <rect x={x0 + i * w} y="20" width={w - 2} height="56" rx="6" style={{ fill: "color-mix(in srgb, var(--accent) 22%, var(--card))", stroke: "var(--accent-deep)" }} strokeWidth="1.2"/>
          {n.map((t, j) => <text key={j} x={x0 + i * w + (w - 2) / 2} y={n.length === 1 ? 52 : 45 + j * 14} textAnchor="middle" style={{ ...lbl, fontSize: 11, fill: "var(--ink)", fontWeight: 700 }}>{t}</text>)}
        </g>
      ))}
      <rect x={x0 + 3 * w + 4} y="64" width={w - 10} height="6" rx="2" fill="url(#em-vis)"/>
      {/* long, low-frequency wave on the left, short, high-frequency wave on the right */}
      <path d={wavePath(x0, x0 + 160, 98, 8, 80)} fill="none" style={{ stroke: "var(--ink-muted)" }} strokeWidth="1.6"/>
      <path d={wavePath(x0 + 200, x0 + 360, 98, 8, 16, 1)} fill="none" style={{ stroke: "var(--ink-muted)" }} strokeWidth="1.6"/>
      <line x1="80" y1="124" x2="340" y2="124" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd="url(#em-ah)"/>
      <text x="74" y="128" textAnchor="end" style={{ ...lbl, fontSize: 11 }}>radio</text>
      <text x="346" y="128" style={{ ...lbl, fontSize: 11 }}>gamma</text>
      <text x="220" y="140" textAnchor="middle" style={{ ...lbl, fontSize: 11 }}>frequency ↑ · energy ↑ · wavelength ↓</text>
      <text x="200" y="162" textAnchor="middle" style={lblMuted}>All travel at 3.0 × 10⁸ m/s in a vacuum</text>
    </svg>
  );
}

function EarChainFig() {
  const box = (x, y, w, lines, k) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height="50" rx="8" style={{ fill: "var(--card)", stroke: "var(--accent-deep)" }} strokeWidth="1.5"/>
      {lines.map((t, j) => <text key={j} x={x + w / 2} y={lines.length === 1 ? y + 29 : y + 22 + j * 14} textAnchor="middle" style={{ ...lbl, fontSize: 11, fontWeight: 600 }}>{t}</text>)}
    </g>
  );
  const band = (y, text, anchorEnd) => (
    <g>
      <rect x="4" y={y} width="352" height="94" rx="10" style={{ fill: "color-mix(in srgb, var(--accent) 22%, var(--card))" }}/>
      <text x={anchorEnd ? 348 : 12} y={y + 18} textAnchor={anchorEnd ? "end" : "start"} style={{ ...lbl, fontSize: 11, fontWeight: 700, fill: "var(--ink)" }}>{text}</text>
    </g>
  );
  const ar = (x1, y1, x2, y2, k) => <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd="url(#ear-ah)"/>;
  return (
    <svg role="img" aria-label="Flow chart of hearing. Outer ear: pinna, ear canal, eardrum. Middle ear: hammer, anvil, stirrup, oval window. Inner ear: cochlea fluid, hair cells, auditory nerve, brain." width="100%" viewBox="0 0 360 330" style={{ display: "block", maxWidth: 520, margin: "0 auto" }}>
      <Arrowheads id="ear-ah"/>
      {band(4, "Outer ear: sound waves in air", false)}
      {band(118, "Middle ear: vibrations in tiny bones", false)}
      {band(232, "Inner ear: fluid waves → electrical signals", true)}
      {box(10, 36, 100, ["Pinna"], "a")}{box(130, 36, 100, ["Ear canal"], "b")}{box(250, 36, 100, ["Eardrum"], "c")}
      {ar(111, 61, 128, 61, "a1")}{ar(231, 61, 248, 61, "a2")}
      {/* row 2 runs right to left */}
      {box(274, 150, 77, ["Hammer"], "d")}{box(186, 150, 77, ["Anvil"], "e")}{box(98, 150, 77, ["Stirrup"], "f")}{box(10, 150, 77, ["Oval", "window"], "g")}
      {ar(273, 175, 265, 175, "a3")}{ar(185, 175, 177, 175, "a4")}{ar(97, 175, 89, 175, "a5")}
      {ar(310, 87, 310, 148, "a6")}
      {/* row 3 runs left to right */}
      {box(10, 264, 77, ["Cochlea", "(fluid)"], "h")}{box(98, 264, 77, ["Hair", "cells"], "i")}{box(186, 264, 77, ["Auditory", "nerve"], "j")}{box(274, 264, 77, ["Brain"], "k")}
      {ar(88, 289, 96, 289, "a7")}{ar(176, 289, 184, 289, "a8")}{ar(264, 289, 272, 289, "a9")}
      {ar(48, 201, 48, 262, "a10")}
    </svg>
  );
}

function LightFig() {
  const s = { stroke: "var(--ink)" };
  return (
    <svg role="img" aria-label="Left: reflection from a mirror, the angle of incidence equals the angle of reflection, both measured from the normal. Right: light passing from air into water slows down and bends towards the normal." width="100%" viewBox="0 0 360 200" style={{ display: "block", maxWidth: 560, margin: "0 auto" }}>
      <Arrowheads id="lt-ah" color="var(--accent-deep)"/>
      {/* reflection */}
      <text x="90" y="16" textAnchor="middle" style={{ ...lbl, fontWeight: 700 }}>Reflection</text>
      <line x1="15" y1="150" x2="165" y2="150" style={s} strokeWidth="2.5"/>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <line key={i} x1={20 + i * 15} y1="152" x2={12 + i * 15} y2="160" style={{ stroke: "var(--ink-muted)" }}/>)}
      <text x="90" y="176" textAnchor="middle" style={lblMuted}>mirror</text>
      <line x1="90" y1="40" x2="90" y2="150" style={{ stroke: "var(--ink-muted)" }} strokeDasharray="5 4"/>
      <text x="95" y="48" style={lblMuted}>normal</text>
      <line x1="22.5" y1="69.6" x2="89" y2="149" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" markerEnd="url(#lt-ah)"/>
      <line x1="90" y1="150" x2="157.5" y2="69.6" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" markerEnd="url(#lt-ah)"/>
      <path d="M 90 120 A 30 30 0 0 0 70.7 127" fill="none" style={s} strokeWidth="1.2"/>
      <path d="M 90 120 A 30 30 0 0 1 109.3 127" fill="none" style={s} strokeWidth="1.2"/>
      <text x="75.6" y="112" textAnchor="middle" style={{ ...lbl, fontStyle: "italic" }}>i</text>
      <text x="104.4" y="112" textAnchor="middle" style={{ ...lbl, fontStyle: "italic" }}>r</text>
      {/* refraction */}
      <text x="275" y="16" textAnchor="middle" style={{ ...lbl, fontWeight: 700 }}>Refraction</text>
      <rect x="190" y="95" width="165" height="90" style={{ fill: "color-mix(in srgb, var(--accent) 22%, var(--card))" }}/>
      <line x1="190" y1="95" x2="355" y2="95" style={s} strokeWidth="1.5"/>
      <text x="196" y="88" style={lblMuted}>air</text>
      <text x="196" y="112" style={lblMuted}>water</text>
      <line x1="275" y1="25" x2="275" y2="185" style={{ stroke: "var(--ink-muted)" }} strokeDasharray="5 4"/>
      <text x="280" y="36" style={lblMuted}>normal</text>
      <line x1="213.7" y1="43.6" x2="274.3" y2="94.4" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" markerEnd="url(#lt-ah)"/>
      <line x1="275" y1="95" x2="323.8" y2="164.6" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" markerEnd="url(#lt-ah)"/>
      <path d="M 275 67 A 28 28 0 0 0 253.6 77" fill="none" style={s} strokeWidth="1.2"/>
      <path d="M 275 123 A 28 28 0 0 0 291.1 117.9" fill="none" style={s} strokeWidth="1.2"/>
      <text x="262" y="62" textAnchor="middle" style={{ ...lblMuted, fontSize: 10 }}>50°</text>
      <text x="289" y="138" textAnchor="middle" style={{ ...lblMuted, fontSize: 10 }}>35°</text>
    </svg>
  );
}

function LiftFig() {
  return (
    <svg role="img" aria-label="Force diagram of a lift car: tension of 11 800 newtons upward and weight of 9 800 newtons downward; net force 2 000 newtons upward." width="100%" viewBox="0 0 360 220" style={{ display: "block", maxWidth: 440, margin: "0 auto" }}>
      <Arrowheads id="lf-ah" color="var(--accent-deep)"/>
      <rect x="150" y="82" width="60" height="60" rx="4" style={{ fill: "var(--card)", stroke: "var(--ink)" }} strokeWidth="2"/>
      <text x="180" y="116" textAnchor="middle" style={lblMuted}>lift</text>
      <line x1="180" y1="82" x2="180" y2="12" style={{ stroke: "var(--accent-deep)" }} strokeWidth="3.5" markerEnd="url(#lf-ah)"/>
      <text x="192" y="36" style={lbl}>Tension</text>
      <text x="192" y="52" style={{ ...lbl, fontWeight: 700 }}>11 800 N</text>
      <line x1="180" y1="142" x2="180" y2="200" style={{ stroke: "var(--accent-deep)" }} strokeWidth="3.5" markerEnd="url(#lf-ah)"/>
      <text x="192" y="184" style={lbl}>Weight</text>
      <text x="192" y="200" style={{ ...lbl, fontWeight: 700 }}>9 800 N</text>
      <text x="136" y="102" textAnchor="end" style={lblMuted}>Net force</text>
      <text x="136" y="118" textAnchor="end" style={{ ...lbl, fontWeight: 700 }}>2 000 N up</text>
    </svg>
  );
}

/* ---------- interactive: v = fλ at a fixed speed ---------- */
function WaveEqLab() {
  const [f, setF] = useState(2);
  const [v, setV] = useState(4);
  const lam = v / f;
  const pxPerM = 330 / 8;              // 8 m window
  const lamPx = lam * pxPerM;
  const x0 = 20;
  const c1 = x0 + lamPx / 4, c2 = c1 + lamPx;
  return (
    <Interactive title="Same rope, different frequency"
      subtitle="A wave is sent along a long rope. The wave speed depends on the rope (the medium), not on how fast you shake it."
      takeaway="In one medium the speed stays the same. Shake faster (higher f) and the wavelength gets shorter, so f × λ always equals v.">
      <SegToggle value={v} onChange={setV} options={[{ value: 4, label: "Loose rope: 4 m/s" }, { value: 8, label: "Tight rope: 8 m/s" }]}/>
      <Slider label="Frequency, f" min={1} max={8} step={1} value={f} onChange={setF} unit=" Hz"/>
      <svg role="img" aria-label={`Wave on a rope with wavelength ${lam.toFixed(2)} metres`} width="100%" viewBox="0 0 370 120" style={{ display: "block", maxWidth: 560, margin: "8px auto" }}>
        <Arrowheads id="wl-ah"/>
        <line x1={x0} y1="62" x2="350" y2="62" style={{ stroke: "var(--ink-muted)" }} strokeDasharray="4 4"/>
        <path d={wavePath(x0, 350, 62, 26, lamPx, 1)} fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="3"/>
        {c2 <= 350 && <g>
          <line x1={c1} y1="20" x2={c2} y2="20" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" markerEnd="url(#wl-ah)" markerStart="url(#wl-ah)"/>
          <text x={Math.min(Math.max((c1 + c2) / 2, 30), 330)} y="13" textAnchor="middle" style={{ ...lbl, fontSize: 11 }}>λ = {+lam.toFixed(2)} m</text>
        </g>}
        {c2 > 350 && <text x="185" y="14" textAnchor="middle" style={{ ...lbl, fontSize: 11 }}>λ = {+lam.toFixed(2)} m (longer than the window)</text>}
        <text x="20" y="112" style={lblMuted}>0 m</text>
        <text x="350" y="112" textAnchor="end" style={lblMuted}>8 m</text>
      </svg>
      <div className="stat-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Stat value={v + " m/s"} label="speed v (set by the rope)"/>
        <Stat value={f + " Hz"} label="frequency f"/>
        <Stat value={+lam.toFixed(2) + " m"} label="wavelength λ = v ÷ f"/>
      </div>
    </Interactive>
  );
}

const tableWrap = { overflowX: "auto" };

/* =========================================================
   SECTION 7.1 WAVE PROPERTIES
   ========================================================= */
function Section71({ progress, setProgress }) {
  return (
    <div>
      <div className="topic-head">
        <div className="eyebrow">7.1 Wave properties</div>
        <h1>Waves carry energy, not matter</h1>
        <p className="lead">Know the two wave types and their features, the EM spectrum and its uses, and how to use v = fλ.</p>
      </div>

      <DotPoint id="7.1.3" title="Transverse and longitudinal waves and their features" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>A <Term def="A wave where the particles vibrate at right angles (perpendicular) to the direction the energy travels.">transverse wave</Term> makes particles vibrate <strong>at right angles</strong> to the direction of energy transfer. It has <strong>crests</strong> (highest points) and <strong>troughs</strong> (lowest points). Examples: light and all EM waves, a vibrating guitar string, ripples on water.</li>
            <li>A <Term def="A wave where the particles vibrate back and forth parallel to the direction the energy travels.">longitudinal wave</Term> makes particles vibrate <strong>back and forth along</strong> the direction of energy transfer. It has <strong>compressions</strong> (particles squashed together) and <strong>rarefactions</strong> (particles spread apart). Examples: sound, ultrasound, P-waves in earthquakes.</li>
            <li><strong>Wavelength (λ)</strong>: the distance between two matching points next to each other: crest to crest, trough to trough, or compression to compression. Unit: metres (m).</li>
            <li><strong>Amplitude</strong>: the biggest displacement of a particle from its <strong>rest position</strong>. It is measured from the middle line to a crest, <em>not</em> crest to trough. Bigger amplitude = more energy.</li>
            <li>Waves transfer <strong>energy</strong>, not matter. The particles only vibrate about a fixed spot.</li>
          </ul>
          <Figure num="1" caption="A transverse wave. Wavelength is one full cycle (trough to trough, or crest to crest); amplitude is rest position to crest.">
            <TransverseFig/>
          </Figure>
          <Figure num="2" caption="A longitudinal wave. Wavelength is the distance from one compression to the next.">
            <LongitudinalFig/>
          </Figure>
        </Recap>
        <WorkedExample title="Reading ocean swell"
          problem="A surf report says the swell has a height of 3.0 m from trough to crest, and the crests are 80 m apart. State the amplitude and the wavelength of the swell."
          steps={[
            "Wavelength is crest to crest, so λ = 80 m.",
            "The 3.0 m is trough to crest. That is twice the amplitude, because amplitude is measured from the rest position (halfway) to a crest.",
            "Amplitude = 3.0 m ÷ 2 = 1.5 m.",
          ]}
          answer="Amplitude = 1.5 m, wavelength = 80 m."/>
        <ExamTip>
          <p>"Compare" means give a similarity <em>and</em> a difference. For wave types, the key difference is the direction particles vibrate compared with the direction energy travels. Always name the features (crest/trough or compression/rarefaction) and give an example of each.</p>
        </ExamTip>
        <Practice title="Transverse and longitudinal waves">
          <MCQ num={1} question="In a longitudinal wave, what is a rarefaction?"
            options={["A region where the particles are pushed close together", "A region where the particles are spread further apart", "The highest point of the wave", "The distance between two compressions"]}
            correct={1}
            explain="A rarefaction is where particles are spread out (lower pressure). Particles pushed close together is a compression, the opposite. 'Highest point' is a crest, which belongs to transverse waves."/>
          <MCQ num={2} question="A guitar string is plucked and a wave travels along it from the bridge towards the neck. How do the parts of the string move?"
            options={["Along the string, towards the neck", "Back and forth along the length of the string", "Up and down, at right angles to the length of the string", "They travel with the wave to the neck and stay there"]}
            correct={2}
            explain="A wave on a string is transverse: each bit of string moves at right angles to the direction the wave travels. 'Back and forth along the string' would make it longitudinal. The string itself does not travel to the neck: only energy does."/>
          <WrittenQ num={3} question="On a grid, a student draws a wave. The rest line is 4 cm below each crest, and 3 complete waves fit across 36 cm. (a) State the amplitude. (b) Calculate the wavelength. (c) The student says the amplitude is 8 cm because the crest is 8 cm above the trough. Explain the mistake. (3 marks)"
            model="(a) Amplitude = 4 cm. (b) Wavelength = 36 cm ÷ 3 = 12 cm. (c) Amplitude is measured from the rest position to a crest (or to a trough), not from trough to crest. 8 cm is twice the amplitude."/>
          <WrittenQ num={4} question="Compare transverse and longitudinal waves. Give an example of each in your answer. (3 marks)"
            model="Both types of wave transfer energy from one place to another without moving matter along with them. In a transverse wave, such as a Wi-Fi signal or a wave on a guitar string, the particles or fields vibrate at right angles to the direction the energy travels, forming crests and troughs. In a longitudinal wave, such as ultrasound, the particles vibrate back and forth parallel to the direction of travel, forming compressions and rarefactions."/>
        </Practice>
        <SelfCheck id="7.1.3" items={[
          "I can describe how particles move in transverse and longitudinal waves.",
          "I can label crest, trough, compression, rarefaction, wavelength and amplitude on a diagram.",
          "I can measure amplitude from the rest position, not trough to crest.",
          "I can give an example of each type of wave.",
        ]}/>
        <NotebookLink href={NB + "#7.1"} label="Learn it in full: Wave Properties"/>
      </DotPoint>

      <DotPoint id="7.1.4" title="Comparing the waves of the electromagnetic spectrum" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li>Order (long wavelength to short): <strong>radio, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays</strong>. Memory hook: <em>"Raging Martians Invaded Venus Using X-ray Guns."</em></li>
            <li>From radio to gamma: <strong>wavelength decreases</strong>, <strong>frequency increases</strong>, <strong>energy increases</strong>.</li>
            <li>All EM waves are transverse, need no medium and travel at the <strong>same speed in a vacuum</strong>: 3.0 × 10⁸ m/s (the speed of light).</li>
            <li>Visible light is a small band: red has the longest wavelength, violet the shortest.</li>
            <li>High-energy waves (UV, X-rays, gamma) are <strong>ionising</strong>: they can damage cells and DNA.</li>
          </ul>
          <Figure num="3" caption="The EM spectrum. Moving right, waves get shorter, more frequent and more energetic, but never faster.">
            <SpectrumFig/>
          </Figure>
        </Recap>
        <Practice title="The EM spectrum">
          <MCQ num={5} question="Which type of EM wave has a longer wavelength than visible light but a shorter wavelength than microwaves?"
            options={["Ultraviolet", "Infrared", "Radio waves", "X-rays"]}
            correct={1}
            explain="Infrared sits between microwaves and visible light. Ultraviolet is on the other side of visible light (shorter wavelength than visible), so it is the tempting wrong answer if you mix up the order."/>
          <MCQ num={6} question="In a vacuum, how do X-rays compare with the radio waves used by an FM station?"
            options={["X-rays travel faster and have a higher frequency", "X-rays travel at the same speed and have a longer wavelength", "X-rays travel at the same speed and have a higher frequency", "X-rays travel slower because they carry more energy"]}
            correct={2}
            explain="All EM waves travel at 3.0 × 10⁸ m/s in a vacuum. X-rays are near the high-frequency, short-wavelength end. Higher energy does not mean a higher speed, which is the common trap."/>
        </Practice>
        <SelfCheck id="7.1.4" items={[
          "I can list the EM spectrum in order from radio to gamma.",
          "I can state how wavelength, frequency and energy change across the spectrum.",
          "I can state that all EM waves travel at the same speed in a vacuum.",
        ]}/>
        <NotebookLink href={NB + "#7.1"} label="Learn it in full: Wave Properties"/>
      </DotPoint>

      <DotPoint id="7.1.6" title="The wave equation: v = f λ" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li><strong>v = f λ</strong>. Wave speed <strong>v</strong> in m/s, <Term def="The number of complete waves passing a point each second, in hertz (Hz).">frequency</Term> <strong>f</strong> in hertz (Hz), wavelength <strong>λ</strong> in metres (m).</li>
            <li>Rearranged: <strong>f = v ÷ λ</strong> and <strong>λ = v ÷ f</strong>.</li>
            <li>Convert first: kHz × 1 000, MHz × 1 000 000 (10⁶), GHz × 10⁹; cm ÷ 100, mm ÷ 1 000. 1 Hz = 1 wave per second.</li>
            <li>In one medium the speed is fixed, so if frequency goes up, wavelength goes down (they are inversely proportional).</li>
            <li>Useful speeds: EM waves 3.0 × 10⁸ m/s; sound in air about 340 m/s; sound in soft tissue about 1 500 m/s.</li>
          </ul>
        </Recap>
        <WorkedExample title="Wavelength of a Wi-Fi signal"
          problem="A Wi-Fi router sends microwaves at a frequency of 2.4 GHz. Microwaves travel at 3.0 × 10⁸ m/s. Calculate the wavelength in centimetres."
          steps={[
            "Convert the frequency: 2.4 GHz = 2.4 × 10⁹ Hz.",
            "Rearrange v = f λ to get λ = v ÷ f.",
            "Substitute: λ = (3.0 × 10⁸) ÷ (2.4 × 10⁹) = 0.125 m.",
            "Convert to centimetres: 0.125 m × 100 = 12.5 cm.",
          ]}
          answer="λ = 0.125 m = 12.5 cm."/>
        <WaveEqLab/>
        <ExamTip>
          <p>"Calculate" questions usually give a mark for the correct working and a mark for the answer with its unit. Write the formula, substitute with units converted, then give the answer with a unit.</p>
        </ExamTip>
        <Practice title="Using v = f λ">
          <MCQ num={7} question="Ocean swell has a wavelength of 60 m and a frequency of 0.10 Hz. What is the speed of the swell?"
            options={["0.0017 m/s", "6.0 m/s", "60 m/s", "600 m/s"]}
            correct={1}
            explain="v = f λ = 0.10 × 60 = 6.0 m/s. 600 m/s comes from dividing 60 by 0.10 instead of multiplying."/>
          <MCQ num={8} question="A guitar plays a note of 220 Hz. The sound travels through air at 330 m/s. What is its wavelength?"
            options={["1.5 m", "0.67 m", "72 600 m", "1.5 cm"]}
            correct={0}
            explain="λ = v ÷ f = 330 ÷ 220 = 1.5 m. 0.67 m comes from dividing the wrong way (220 ÷ 330), and 72 600 m comes from multiplying."/>
          <WrittenQ num={9} question="An ultrasound probe sends waves through soft tissue at 1 500 m/s. The wavelength is 0.50 mm. Calculate the frequency in MHz. Show your working. (3 marks)"
            model="λ = 0.50 mm = 0.50 ÷ 1 000 = 0.000 50 m (5.0 × 10⁻⁴ m). f = v ÷ λ = 1 500 ÷ 0.000 50 = 3 000 000 Hz. 3 000 000 Hz ÷ 1 000 000 = 3.0 MHz."/>
          <WrittenQ num={10} question="A radio station broadcasts at 100 MHz. Radio waves travel at 3.0 × 10⁸ m/s. (a) Calculate the wavelength. (b) Another station broadcasts at 200 MHz. State and explain what happens to the wavelength. (3 marks)"
            model="(a) f = 100 MHz = 1.0 × 10⁸ Hz. λ = v ÷ f = (3.0 × 10⁸) ÷ (1.0 × 10⁸) = 3.0 m. (b) The wavelength halves to 1.5 m. All radio waves travel at the same speed, so if the frequency doubles, the wavelength must halve to keep f × λ equal to 3.0 × 10⁸ m/s."/>
        </Practice>
        <SelfCheck id="7.1.6" items={[
          "I can write v = f λ and give the unit for each quantity.",
          "I can rearrange it to find f or λ.",
          "I can convert kHz, MHz, GHz, cm and mm before substituting.",
          "I can explain why a higher frequency gives a shorter wavelength in the same medium.",
        ]}/>
        <NotebookLink href={NB + "#7.1"} label="Learn it in full: Wave Properties"/>
      </DotPoint>

      <DotPoint id="7.1.7" title="Uses of EM waves based on their properties" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <p>Each use matches a property. Learn the link, not just the list.</p>
          <div style={tableWrap}>
            <table>
              <thead><tr><th>Wave</th><th>Key property</th><th>Uses</th></tr></thead>
              <tbody>
                <tr><td>Radio</td><td>Long wavelength; bends around hills and buildings; reflects off the upper atmosphere</td><td>Radio and TV broadcasting</td></tr>
                <tr><td>Microwaves</td><td>Pass through the atmosphere; absorbed by water, which heats up</td><td>Mobile phones, Wi-Fi, satellite links, cooking</td></tr>
                <tr><td>Infrared</td><td>Given off by all warm objects; felt as heat</td><td>Thermal imaging, remote controls, heaters</td></tr>
                <tr><td>Visible</td><td>Detected by our eyes; travels along optical fibres</td><td>Seeing, photography, fibre-optic internet</td></tr>
                <tr><td>Ultraviolet</td><td>Makes some substances glow; kills microbes</td><td>Sterilising water, checking banknotes</td></tr>
                <tr><td>X-rays</td><td>Very penetrating; dense materials such as metal stop more of them than light materials do</td><td>Airport baggage scans, checking welds and pipes for hidden cracks, medical imaging</td></tr>
                <tr><td>Gamma</td><td>Very high energy; kills cells</td><td>Cancer treatment, sterilising medical equipment</td></tr>
              </tbody>
            </table>
          </div>
          <p>When a question gives you a data table, use the numbers or descriptions in it as your evidence ("the table shows…").</p>
        </Recap>
        <Practice title="Choosing the right wave">
          <p className="muted" style={{ marginTop: 0 }}>Use this data for both questions.</p>
          <div style={tableWrap}>
            <table>
              <thead><tr><th>Wave</th><th>Typical wavelength</th><th>Passes through the atmosphere?</th><th>Passes through skin and muscle?</th><th>Strongly absorbed by</th></tr></thead>
              <tbody>
                <tr><td>Microwaves</td><td>1 cm</td><td>Yes</td><td>Partly</td><td>Water</td></tr>
                <tr><td>Infrared</td><td>0.01 mm</td><td>Partly</td><td>No</td><td>Skin, most solids</td></tr>
                <tr><td>Ultraviolet</td><td>0.000 3 mm</td><td>Partly (ozone absorbs a lot)</td><td>No</td><td>Skin, ozone</td></tr>
                <tr><td>X-rays</td><td>0.000 000 1 mm</td><td>No</td><td>Yes</td><td>Dense metals such as lead</td></tr>
              </tbody>
            </table>
          </div>
          <MCQ num={11} question="Using the data, which wave is best for sending signals between a ground station and a satellite in orbit?"
            options={["Microwaves", "Infrared", "Ultraviolet", "X-rays"]}
            correct={0}
            explain="The table shows microwaves pass through the atmosphere, so the signal reaches orbit. X-rays do not pass through the atmosphere at all, and infrared and ultraviolet only partly do, so signals would be weakened."/>
          <WrittenQ num={12} question="Rescuers use an infrared camera at night to find a lost bushwalker. Use the properties of infrared to explain why this works. (2 marks)"
            model="All warm objects give off infrared, and the bushwalker's body is warmer than the cool ground and plants around them. The camera detects the extra infrared from the person, so they show up brightly against the darker background even with no visible light."/>
        </Practice>
        <SelfCheck id="7.1.7" items={[
          "I can match each EM wave to a use and the property that makes it suitable.",
          "I can use a data table as evidence when choosing a wave for a job.",
        ]}/>
        <NotebookLink href={NB + "#7.1"} label="Learn it in full: Wave Properties"/>
      </DotPoint>
    </div>
  );
}

/* =========================================================
   SECTION 7.2 SOUND
   ========================================================= */
function Section72({ progress, setProgress }) {
  return (
    <div>
      <div className="topic-head">
        <div className="eyebrow">7.2 Sound and hearing</div>
        <h1>From vibration to signal</h1>
        <p className="lead">Sound is a longitudinal wave that needs a medium. The highest-value part is following sound energy through the ear, step by step.</p>
      </div>

      <DotPoint id="7.2.1" title="Sound travels as compressions and rarefactions and needs a medium" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>Sound starts with a <strong>vibrating object</strong> (a speaker cone, a guitar string, your vocal cords).</li>
            <li>As it moves forward it pushes particles together, making a <strong>compression</strong> (higher pressure). As it moves back it leaves a <strong>rarefaction</strong> (particles spread out, lower pressure).</li>
            <li>Sound is a <strong>longitudinal</strong> wave: particles vibrate back and forth parallel to the direction the sound travels. Each particle passes energy to the next and stays roughly where it was.</li>
            <li>Sound needs a <Term def="The substance a wave travels through, such as air, water or steel.">medium</Term>. It cannot travel through a vacuum, because there are no particles to pass the vibrations on. Space is silent.</li>
            <li>Sound travels fastest in solids, then liquids, then gases (roughly 5 000 m/s in steel, 1 500 m/s in water, 340 m/s in air), because particles are closer together.</li>
          </ul>
          <Figure num="4" caption="A speaker cone vibrates and sends compressions and rarefactions through the air. The air particles only jiggle back and forth.">
            <LongitudinalFig dots speaker ariaExtra=", produced by a vibrating speaker cone"/>
          </Figure>
        </Recap>
        <WorkedExample title="A silent spacewalk"
          problem="Two astronauts are on a spacewalk. One uses a power drill but the other cannot hear it. When they press their helmets together, they can hear each other talk. Explain both observations. (3 marks)"
          steps={[
            "State the rule: sound is a vibration passed from particle to particle, so it needs a medium.",
            "Apply it to space: space is a near vacuum, with almost no particles, so the drill's vibrations cannot travel through it to the other astronaut.",
            "Apply it to the helmets: when the helmets touch, the vibrations pass through the solid helmet material (and the air inside each helmet), so sound can reach the ear.",
          ]}
          answer="Sound needs particles to pass on its compressions and rarefactions. Space has no medium, so the drill cannot be heard, but touching helmets gives a solid path for the vibrations."/>
        <Practice title="How sound travels">
          <MCQ num={13} question="As sound from a speaker travels across a room, what do the air particles do?"
            options={["They travel from the speaker to your ear", "They vibrate up and down at right angles to the direction of the sound", "They vibrate back and forth about fixed positions, parallel to the direction of the sound", "They stay completely still while the energy moves past them"]}
            correct={2}
            explain="Sound is longitudinal, so particles vibrate back and forth along the direction of travel, passing energy on. The tempting answer, 'travel from the speaker to your ear', is wrong: only energy travels across the room, not the air itself."/>
          <MCQ num={14} question="A snorkeller with her head under water can clearly hear dolphins clicking nearby. Which statement best explains this?"
            options={["Sound travels through water because water is a medium with particles close together", "Sound only travels through water, not through air", "Water turns sound into light, which the diver detects", "Sound travels more slowly in water so it is louder"]}
            correct={0}
            explain="Water is a medium, and its particles are closer together than in air, so sound travels well (and faster, about 1 500 m/s). Sound does travel through air too, so that option is wrong."/>
          <WrittenQ num={15} question="Describe how the sound from a plucked guitar string reaches a listener's ear. (3 marks)"
            model="The plucked string vibrates. As it moves forward it pushes nearby air particles together, forming a compression, and as it moves back it leaves a rarefaction. The air particles vibrate back and forth and pass the energy on to their neighbours, so a longitudinal wave of compressions and rarefactions travels through the air to the listener's ear. The air particles themselves do not travel to the ear."/>
          <WrittenQ num={16} question="A ringing phone is sealed in a glass jar and the air is slowly pumped out. Predict what the listener hears and explain why. (2 marks)"
            model="The ringing gets quieter and quieter until it can hardly be heard. As air is removed there are fewer particles to carry the vibrations, and sound cannot travel through a vacuum, so less sound energy reaches the glass and the listener."/>
        </Practice>
        <SelfCheck id="7.2.1" items={[
          "I can describe how a vibrating object makes compressions and rarefactions.",
          "I can explain why sound is a longitudinal wave.",
          "I can explain why sound cannot travel through a vacuum.",
          "I can compare the speed of sound in solids, liquids and gases.",
        ]}/>
        <NotebookLink href={NB + "#7.2"} label="Learn it in full: Sound Waves"/>
      </DotPoint>

      <DotPoint id="7.2.4" title="How the ear responds to sound waves" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <ol>
            <li>The <strong>pinna</strong> (outer ear flap) collects sound waves and funnels them into the <strong>ear canal</strong>.</li>
            <li>The ear canal carries the sound to the <Term def="A thin membrane at the end of the ear canal that vibrates when sound waves hit it.">eardrum</Term>, which <strong>vibrates</strong> at the same frequency as the sound.</li>
            <li>The <Term def="The three smallest bones in the body (hammer, anvil and stirrup) that pass vibrations from the eardrum to the inner ear and amplify them.">ossicles</Term> (hammer, anvil and stirrup) pass the vibrations along and <strong>amplify</strong> them, pushing on the <strong>oval window</strong> of the cochlea.</li>
            <li>The <Term def="A snail-shaped, fluid-filled tube in the inner ear lined with hair cells.">cochlea</Term> is filled with fluid. The vibrations make waves in the fluid.</li>
            <li>The moving fluid bends tiny <strong>hair cells</strong>. Bending the hair cells makes them produce <strong>electrical signals</strong> (nerve impulses). This is where mechanical energy is changed into electrical signals.</li>
            <li>The <strong>auditory nerve</strong> carries the signals to the <strong>brain</strong>, which interprets them as sound.</li>
          </ol>
          <ul>
            <li><strong>Loudness</strong>: a larger amplitude makes the eardrum vibrate further, bending hair cells more and sending stronger signals.</li>
            <li><strong>Pitch</strong>: different frequencies make different parts of the cochlea vibrate most. Hair cells near the entrance respond to high frequencies; those further in respond to low frequencies. Humans hear about 20 Hz to 20 000 Hz.</li>
            <li><strong>Damage</strong>: hair cells do not grow back. Loud sound (above about 85 dB for long periods) damages them and causes permanent hearing loss, often high frequencies first. A torn eardrum or stiff ossicles stop vibrations being passed on.</li>
            <li><strong>Protection</strong>: earplugs and earmuffs absorb sound energy so smaller-amplitude vibrations reach the eardrum. Also reduce the volume, limit the time, and move further away.</li>
          </ul>
          <Figure num="5" caption="The path of sound energy through the ear, from sound waves in air to electrical signals in the auditory nerve.">
            <EarChainFig/>
          </Figure>
        </Recap>
        <WorkedExample title="Putting the steps in order"
          problem="These events happen when you hear a dog bark. Put them in the correct order: (P) hair cells bend, (Q) the eardrum vibrates, (R) the auditory nerve carries signals to the brain, (S) the ossicles vibrate, (T) the pinna funnels sound into the ear canal, (U) the fluid in the cochlea moves."
          steps={[
            "Start outside the head: the pinna collects the sound first, so T.",
            "Sound waves in the canal hit the eardrum: Q.",
            "The eardrum is joined to the ossicles, which vibrate next: S.",
            "The stirrup pushes on the oval window, making the cochlear fluid move: U.",
            "Moving fluid bends the hair cells, which make electrical signals: P.",
            "The auditory nerve carries the signals to the brain: R.",
          ]}
          answer="T → Q → S → U → P → R"/>
        <WorkedExample title="Effect of damage to one part"
          problem="A person's ossicles become stiff and can hardly move. Explain how this affects their hearing. (3 marks)"
          steps={[
            "Cause: say what the damaged part normally does. The ossicles pass vibrations from the eardrum to the oval window and amplify them.",
            "Effect: stiff ossicles pass on much smaller vibrations, so the fluid in the cochlea moves less and the hair cells bend less.",
            "Link to hearing: weaker electrical signals travel along the auditory nerve, so the brain interprets sounds as much quieter. The hair cells still work, so a hearing aid that makes sounds louder can help.",
          ]}
          answer="Stiff ossicles cannot transmit and amplify the eardrum's vibrations, so the hair cells are barely stimulated and sounds seem much quieter (hearing loss), even though the inner ear is healthy."/>
        <ExamTip>
          <p>For "explain" questions about the ear, follow the energy one step at a time and name each part and what it does. Use cause → effect → link: what the part does, what changes if it is damaged or the sound changes, and how that changes what the brain hears.</p>
        </ExamTip>
        <Practice title="The ear in action">
          <MCQ num={17} question="Which part of the ear changes vibrations into electrical signals?"
            options={["The eardrum", "The ossicles", "The hair cells in the cochlea", "The auditory nerve"]}
            correct={2}
            explain="Hair cells bend when the cochlear fluid moves and produce electrical signals. The auditory nerve is the tempting answer, but it only carries the signals that the hair cells have already made."/>
          <MCQ num={18} question="A bird's high whistle and a low bass note are equally loud. How does the cochlea tell them apart?"
            options={["The high note bends more hair cells than the low note", "Different frequencies make hair cells in different parts of the cochlea respond", "The ossicles change the high note into a low note", "The auditory nerve carries the high note faster"]}
            correct={1}
            explain="Pitch depends on which hair cells respond: high frequencies stimulate hair cells near the entrance of the cochlea, low frequencies those further in. Bending more hair cells (more strongly) is how we sense loudness, not pitch."/>
          <MCQ num={19} question="The volume of a song is turned up but the notes stay the same. What changes at the eardrum?"
            options={["It vibrates with a larger amplitude at the same frequency", "It vibrates at a higher frequency", "It vibrates with a smaller amplitude", "It stops vibrating and the ossicles take over"]}
            correct={0}
            explain="Louder means a larger amplitude, so the eardrum vibrates further each time. The notes (pitch) are unchanged, so the frequency is the same. A higher frequency would mean a higher pitch."/>
          <MCQ num={20} question="An older person can follow normal conversation but can no longer hear a 15 000 Hz tone that a teenager hears easily. What is the most likely cause?"
            options={["Their pinna has become too small", "Hair cells that respond to high frequencies have been damaged over time", "Their auditory nerve now carries signals too fast", "Sound travels more slowly through older air"]}
            correct={1}
            explain="Hair cells near the cochlea's entrance detect high frequencies and are usually damaged first by age and loud noise; they do not grow back. Speech uses lower frequencies, which is why conversation is still heard. The pinna only collects sound."/>
          <WrittenQ num={21} question="Write these parts in the order that sound energy passes through them: auditory nerve, ear canal, cochlear fluid, eardrum, stirrup, hammer, anvil, hair cells. (2 marks)"
            model="Ear canal → eardrum → hammer → anvil → stirrup → cochlear fluid → hair cells → auditory nerve."/>
          <WrittenQ num={22} question="A person has a small tear (perforation) in their eardrum. Predict how this affects their hearing and explain why. (2 marks)"
            model="Their hearing in that ear becomes quieter or muffled. A torn eardrum cannot vibrate properly when sound waves hit it, so smaller vibrations are passed to the ossicles and cochlea, the hair cells are bent less, and weaker signals reach the brain."/>
          <WrittenQ num={23} question="Stage crew at concerts wear earmuffs. Explain how loud music over many hours can cause permanent hearing loss, and how earmuffs reduce this risk. (4 marks)"
            model="Very loud sound has a large amplitude, so it makes the eardrum, ossicles and cochlear fluid vibrate strongly. Over many hours these strong vibrations damage or destroy the delicate hair cells in the cochlea. Hair cells cannot regrow, so they can no longer turn vibrations into electrical signals and the hearing loss is permanent. Earmuffs absorb much of the sound energy before it enters the ear canal, so a smaller amplitude reaches the eardrum and the hair cells are not bent as violently, lowering the risk of damage."/>
        </Practice>
        <SelfCheck id="7.2.4" items={[
          "I can put the parts of the ear in order from the pinna to the brain.",
          "I can say what each part does to the sound energy.",
          "I can explain how the ear detects loudness and pitch.",
          "I can predict and explain the effect of damage to the eardrum, ossicles or hair cells.",
          "I can explain how hearing protection works.",
        ]}/>
        <NotebookLink href={NB + "#7.2"} label="Learn it in full: Sound Waves"/>
      </DotPoint>
    </div>
  );
}

/* =========================================================
   SECTION 7.3 LIGHT
   ========================================================= */
function Section73({ progress, setProgress }) {
  return (
    <div>
      <div className="topic-head">
        <div className="eyebrow">7.3 Light</div>
        <h1>Light at surfaces</h1>
        <p className="lead">Light can be absorbed, reflected, refracted or scattered. Measure every angle from the normal.</p>
      </div>

      <DotPoint id="7.3.2" title="Absorption, reflection, refraction and scattering of light" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li><Term def="When a material takes in light energy and changes it into another form, usually heat.">Absorption</Term>: light energy is taken in and changed to heat. Dark surfaces absorb most colours and warm up. A red shirt reflects red light and absorbs the other colours.</li>
            <li><Term def="Light bouncing off a surface.">Reflection</Term>: light bounces off a surface. <strong>Law of reflection: angle of incidence = angle of reflection</strong>, both measured from the <Term def="An imaginary line drawn at 90° to a surface where a ray hits it.">normal</Term> (a line at 90° to the surface). Smooth surfaces give regular reflection (a clear image); rough surfaces give diffuse reflection (no image).</li>
            <li><Term def="The bending of light as it passes from one medium into another and changes speed.">Refraction</Term>: light bends when it crosses into a different medium because its <strong>speed changes</strong>. Into a denser medium (air → water or glass) it slows and bends <strong>towards</strong> the normal; coming out it speeds up and bends <strong>away</strong>. This is why a pencil looks bent in water and pools look shallower than they are.</li>
            <li><Term def="Light being redirected in many directions by tiny particles, such as gas molecules in the air.">Scattering</Term>: tiny particles send light off in all directions. Air molecules scatter short-wavelength blue light much more than red, so the sky looks blue. At sunset, light passes through more air, most blue is scattered away, and the sky looks orange-red.</li>
            <li>Common mistake: measuring angles from the surface instead of from the normal.</li>
          </ul>
          <Figure num="6" caption="Reflection obeys i = r. When light enters water it slows and bends towards the normal (here 50° in air becomes about 35° in water).">
            <LightFig/>
          </Figure>
        </Recap>
        <WorkedExample title="The bent pencil"
          problem="A pencil standing in a glass of water looks broken at the water surface. Explain why. (3 marks)"
          steps={[
            "Name the property: this is refraction.",
            "Cause: light from the underwater part of the pencil travels from water into air. It speeds up and bends away from the normal at the surface.",
            "Effect: your brain assumes light travels in straight lines, so it traces the rays back to where the pencil appears to be, which is higher than where it really is. The underwater part looks shifted, so the pencil looks broken.",
          ]}
          answer="Light from the underwater part refracts (bends away from the normal) as it speeds up leaving the water, so that part of the pencil appears in a different place from the part above the water."/>
        <Practice title="Light at surfaces">
          <MCQ num={24} question="Why does the sky look blue on a clear day?"
            options={["Air molecules scatter blue light more than red light", "The sky reflects the blue colour of the ocean", "Air absorbs all colours except blue", "Blue light travels faster than red light in air"]}
            correct={0}
            explain="Blue has a shorter wavelength, and tiny air molecules scatter short wavelengths much more, sending blue light across the whole sky. The ocean idea is a myth (the sky is blue over deserts too)."/>
          <MCQ num={25} question="On a sunny day, a black car bonnet gets much hotter than a white one. Which property of light explains this?"
            options={["Refraction", "Scattering", "Absorption", "Regular reflection"]}
            correct={2}
            explain="Black surfaces absorb most of the light falling on them and change that energy into heat. White surfaces reflect most light, so they stay cooler. Reflection is the property of the white bonnet, not the black one."/>
          <MCQ num={26} question="A ray of light passes from air into a glass block at an angle. What happens to it?"
            options={["It speeds up and bends away from the normal", "It slows down and bends towards the normal", "It slows down and carries on in a straight line", "It is completely reflected"]}
            correct={1}
            explain="Glass is optically denser than air, so the light slows down and bends towards the normal. Speeding up and bending away happens when light leaves the glass."/>
          <WrittenQ num={27} question="A periscope has two flat mirrors, each set at 45° to the tube. Explain how it lets a person see over a high fence. (3 marks)"
            model="Light from an object above the fence enters the top of the periscope and hits the first mirror. By the law of reflection the angle of incidence equals the angle of reflection, so the mirror at 45° turns the light through 90° and sends it straight down the tube. The second mirror, also at 45°, reflects it through another 90° so it travels horizontally into the person's eye, letting them see the object over the fence."/>
        </Practice>
        <SelfCheck id="7.3.2" items={[
          "I can state the law of reflection and measure angles from the normal.",
          "I can explain refraction in terms of light changing speed.",
          "I can explain why the sky is blue using scattering.",
          "I can link the colour or darkness of a surface to absorption.",
        ]}/>
        <NotebookLink href={NB + "#7.3"} label="Learn it in full: Light Waves"/>
      </DotPoint>
    </div>
  );
}

/* =========================================================
   SECTION 7.4 MOTION
   ========================================================= */
function ScooterDT() {
  return (
    <LineGraph id="dt1" xMax={60} yMax={300} xStep={10} yStep={50} xLabel="Time (s)" yLabel="Distance (m)"
      pts={[[0, 0], [20, 160], [50, 280], [60, 280]]}
      aria="Distance-time graph of an electric scooter: 0 to 160 metres in the first 20 seconds, then 160 to 280 metres from 20 to 50 seconds with a gentler slope, then flat at 280 metres from 50 to 60 seconds.">
      {({ X, Y }) => <g>
        <text x={X(12)} y={Y(125)} textAnchor="end" style={{ ...lbl, fontSize: 11, fontWeight: 700 }}>8 m/s</text>
        <text x={X(36)} y={Y(185)} style={{ ...lbl, fontSize: 11, fontWeight: 700 }}>4 m/s</text>
        <text x={X(55)} y={Y(280) - 8} textAnchor="middle" style={{ ...lbl, fontSize: 11, fontWeight: 700 }}>stopped</text>
      </g>}
    </LineGraph>
  );
}
function KartDT() {
  return (
    <LineGraph id="dt2" xMax={80} yMax={250} xStep={20} yStep={50} xLabel="Time (s)" yLabel="Distance (m)"
      pts={[[0, 0], [20, 40], [60, 240], [80, 240]]}
      aria="Distance-time graph of a go-kart: 0 to 40 metres from 0 to 20 seconds, then 40 to 240 metres from 20 to 60 seconds with a steeper slope, then flat at 240 metres from 60 to 80 seconds."/>
  );
}
function TrainVT() {
  return (
    <LineGraph id="vt1" w={380} xMax={120} yMax={25} xStep={20} yStep={5} xLabel="Time (s)" yLabel="Velocity (m/s)" shade
      pts={[[0, 0], [40, 20], [100, 20], [120, 0]]}
      aria="Velocity-time graph of a train: speeds up from 0 to 20 metres per second in 40 seconds, stays at 20 metres per second until 100 seconds, then slows to 0 at 120 seconds. Areas under the graph: 400 metres, 1200 metres and 200 metres.">
      {({ X, Y }) => <g>
        <line x1={X(40)} y1={Y(20)} x2={X(40)} y2={Y(0)} style={{ stroke: "var(--accent-deep)" }} strokeDasharray="4 3"/>
        <line x1={X(100)} y1={Y(20)} x2={X(100)} y2={Y(0)} style={{ stroke: "var(--accent-deep)" }} strokeDasharray="4 3"/>
        <text x={X(28)} y={Y(3)} textAnchor="middle" style={{ ...lbl, fontSize: 11, fontWeight: 700 }}>400 m</text>
        <text x={X(70)} y={Y(9)} textAnchor="middle" style={{ ...lbl, fontSize: 11, fontWeight: 700 }}>1 200 m</text>
        <text x={X(105.5)} y={Y(2.5)} textAnchor="middle" style={{ ...lbl, fontSize: 11, fontWeight: 700 }}>200 m</text>
        <text x={X(70)} y={Y(20) - 8} textAnchor="middle" style={{ ...lbl, fontSize: 11 }}>constant velocity</text>
        <text x={X(14)} y={Y(17)} textAnchor="middle" style={{ ...lbl, fontSize: 11 }}>speeding up</text>
        <text x={X(112)} y={Y(23)} textAnchor="middle" style={{ ...lbl, fontSize: 11 }}>slowing</text>
      </g>}
    </LineGraph>
  );
}
function SkaterVT() {
  return (
    <LineGraph id="vt2" xMax={24} yMax={4} xStep={6} yStep={1} xLabel="Time (s)" yLabel="Velocity (m/s)"
      pts={[[0, 0], [6, 3], [18, 3], [24, 0]]}
      aria="Velocity-time graph of a skateboarder: speeds up from 0 to 3 metres per second in 6 seconds, stays at 3 metres per second until 18 seconds, then slows to 0 at 24 seconds."/>
  );
}

function Section74({ progress, setProgress }) {
  return (
    <div>
      <div className="topic-head">
        <div className="eyebrow">7.4 Motion and forces</div>
        <h1>Describing and explaining motion</h1>
        <p className="lead">The highest-value part of the topic. Practise the formulas and reading motion graphs until they feel automatic. The formulas are on your data sheet.</p>
      </div>

      <DotPoint id="7.4.1" title="Distance and displacement, speed and velocity" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>A <Term def="A quantity with size (magnitude) only, such as distance, speed, mass or time.">scalar</Term> has size only. A <Term def="A quantity with size and direction, such as displacement, velocity, acceleration or force.">vector</Term> has size <strong>and direction</strong>.</li>
            <li><strong>Distance</strong> (scalar): the total length of the path travelled. <strong>Displacement</strong> (vector): the straight-line change in position from start to finish, with a direction.</li>
            <li><strong>Speed</strong> (scalar) = distance ÷ time. <strong>Velocity</strong> (vector) = displacement ÷ time, with a direction.</li>
            <li>Finish where you started → displacement = 0 and average velocity = 0, even though you travelled a distance.</li>
            <li>Changing direction at the same speed means the velocity has changed. Use + and − for opposite directions (e.g. up = +, down = −).</li>
            <li>Scalars: distance, speed, time, mass, energy. Vectors: displacement, velocity, acceleration, force, weight.</li>
          </ul>
        </Recap>
        <WorkedExample title="A delivery drone"
          problem="A delivery drone rises 120 m straight up from the ground, then drops 45 m straight down to hover beside a balcony. The whole trip takes 50 s. Find (a) the distance, (b) the displacement, (c) the average speed and (d) the average velocity."
          steps={[
            "Distance is the total path: 120 m + 45 m = 165 m.",
            "Displacement is the change in position: 120 m up − 45 m down = 75 m upward.",
            "Average speed = distance ÷ time = 165 ÷ 50 = 3.3 m/s.",
            "Average velocity = displacement ÷ time = 75 ÷ 50 = 1.5 m/s upward. A vector answer needs its direction.",
          ]}
          answer="(a) 165 m (b) 75 m up (c) 3.3 m/s (d) 1.5 m/s up."/>
        <Practice title="Scalars and vectors">
          <MCQ num={28} question="Which list contains only vector quantities?"
            options={["Distance, speed, time", "Displacement, velocity, force", "Mass, velocity, acceleration", "Speed, force, displacement"]}
            correct={1}
            explain="Displacement, velocity and force all have a direction. Each other list includes a scalar: mass in C and speed in D are the traps, because they sit next to real vectors."/>
          <MCQ num={29} question="A swimmer completes 2 laps of a 25 m pool (up and back) in 40 s, finishing at the starting wall. What is the swimmer's average velocity?"
            options={["1.25 m/s", "0.625 m/s", "0 m/s", "2.5 m/s"]}
            correct={2}
            explain="The swimmer ends where they started, so the displacement is 0 and the average velocity is 0. 1.25 m/s (50 m ÷ 40 s) is the average speed, not the velocity."/>
          <MCQ num={30} question="A lift goes up at a steady 2 m/s, then comes back down at a steady 2 m/s. Which statement is correct?"
            options={["Its speed and velocity are both the same on the way up and down", "Its speed is the same, but its velocity is different", "Its velocity is the same, but its speed is different", "Its speed and velocity both change"]}
            correct={1}
            explain="Speed has no direction, so it is 2 m/s both ways. Velocity includes direction, so it changes from +2 m/s (up) to −2 m/s (down). Saying both are the same ignores the direction."/>
          <WrittenQ num={31} question="A cable car travels 600 m up a mountainside in 300 s, then immediately travels 600 m back down to the base station in 200 s. (a) Calculate the average speed for the whole trip. (b) State the average velocity for the whole trip. (c) Explain why your answers are different. (3 marks)"
            model="(a) Average speed = total distance ÷ total time = 1 200 m ÷ 500 s = 2.4 m/s. (b) Average velocity = 0 m/s. (c) The cable car finishes where it started, so the displacement is zero. Speed uses the total distance travelled (a scalar), but velocity uses displacement (a vector), so the average velocity is zero even though the cable car moved."/>
        </Practice>
        <SelfCheck id="7.4.1" items={[
          "I can define scalar and vector and sort quantities into each.",
          "I can calculate distance and displacement for a trip that changes direction.",
          "I can calculate average speed and average velocity, giving direction for velocity.",
        ]}/>
        <NotebookLink href={NB + "#7.4"} label="Learn it in full: Motion"/>
      </DotPoint>

      <DotPoint id="7.4.3" title="Drawing and analysing distance–time graphs" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="know"/>
        <Recap>
          <ul>
            <li>Time goes on the horizontal (x) axis and distance on the vertical (y) axis. Label both axes with units and use an even scale.</li>
            <li><strong>Gradient = speed</strong>. Gradient = rise ÷ run = change in distance ÷ change in time.</li>
            <li>Straight sloping line = constant speed. Steeper line = faster. Flat (horizontal) line = stopped. A curve getting steeper = speeding up; a curve getting flatter = slowing down.</li>
            <li>Average speed for a whole trip = total distance ÷ total time (read from the end point).</li>
          </ul>
          <Figure num="7" caption="An electric scooter: gradient = 160 ÷ 20 = 8 m/s, then 120 ÷ 30 = 4 m/s (less steep = slower), then flat (stopped).">
            <ScooterDT/>
          </Figure>
        </Recap>
        <ExamTip>
          <p>To find a gradient, pick two points on the line that sit on grid lines, far apart. Write rise ÷ run with units, e.g. (280 − 160) m ÷ (50 − 20) s = 4 m/s.</p>
        </ExamTip>
        <Practice title="Reading a distance–time graph">
          <Figure num="8" caption="A go-kart on a straight test track.">
            <KartDT/>
          </Figure>
          <MCQ num={32} question="Using Figure 8, what is the go-kart doing between 60 s and 80 s?"
            options={["Moving at a constant speed of 240 m/s", "Speeding up", "Stopped (not moving)", "Driving back towards the start"]}
            correct={2}
            explain="The line is flat: the distance stays at 240 m while time passes, so the go-kart is not moving. Driving back towards the start would make the distance decrease, not stay the same."/>
          <WrittenQ num={33} question="Using Figure 8: (a) calculate the go-kart's speed between 20 s and 60 s, (b) calculate the average speed for the whole 80 s, and (c) state how the graph shows that the go-kart was slower in the first 20 s. (3 marks)"
            model="(a) Speed = gradient = (240 − 40) m ÷ (60 − 20) s = 200 ÷ 40 = 5 m/s. (b) Average speed = 240 m ÷ 80 s = 3 m/s. (c) The line between 0 and 20 s is less steep (gradient 40 ÷ 20 = 2 m/s), and a gentler gradient means a lower speed."/>
        </Practice>
        <SelfCheck id="7.4.3" items={[
          "I can draw a distance–time graph with labelled axes, units and an even scale.",
          "I can calculate speed from the gradient.",
          "I can describe motion from the shape of the line (sloped, steep, flat, curved).",
        ]}/>
        <NotebookLink href={NB + "#7.4"} label="Learn it in full: Motion (motion graphs)"/>
      </DotPoint>

      <DotPoint id="7.4.4" title="Force, mass and acceleration: F = ma" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li><strong>F = m a</strong>: net force <strong>F</strong> in newtons (N), mass <strong>m</strong> in kilograms (kg), acceleration <strong>a</strong> in m/s².</li>
            <li>Rearranged: <strong>a = F ÷ m</strong> and <strong>m = F ÷ a</strong>.</li>
            <li>Bigger net force → bigger acceleration (same mass). Bigger mass → smaller acceleration (same force).</li>
            <li>Use the <strong>net</strong> (unbalanced) force. Convert grams to kilograms first (÷ 1 000).</li>
            <li>1 N is the force that gives 1 kg an acceleration of 1 m/s². Weight is a force too: W = m g, with g = 9.8 m/s² on Earth.</li>
          </ul>
        </Recap>
        <WorkedExample title="Accelerating a drone"
          problem="A delivery drone with a mass of 2.5 kg has a net upward force of 5.0 N acting on it. Calculate its acceleration."
          steps={[
            "Formula: F = m a, so a = F ÷ m.",
            "Substitute: a = 5.0 N ÷ 2.5 kg.",
            "a = 2.0 m/s² upward (the same direction as the net force).",
          ]}
          answer="a = 2.0 m/s² upward."/>
        <Practice title="Using F = ma">
          <MCQ num={34} question="A sled and its rider have a total mass of 120 kg. The net force down the slope is 60 N. What is the acceleration?"
            options={["7 200 m/s²", "2.0 m/s²", "0.50 m/s²", "180 m/s²"]}
            correct={2}
            explain="a = F ÷ m = 60 ÷ 120 = 0.50 m/s². 2.0 m/s² comes from dividing the wrong way (120 ÷ 60), and 7 200 comes from multiplying."/>
          <MCQ num={35} question="The same motor force lifts an empty lift and then a lift full of people. Compared with the empty lift, the full lift will:"
            options={["accelerate more, because it has more mass", "accelerate less, because it has more mass", "accelerate the same, because the force is the same", "not accelerate at all"]}
            correct={1}
            explain="a = F ÷ m: with the same force, a larger mass gives a smaller acceleration. The same force does not mean the same acceleration, because mass also matters."/>
          <WrittenQ num={36} question="A train with a mass of 40 000 kg speeds up with an acceleration of 0.50 m/s². Calculate the net force acting on it. (2 marks)"
            model="F = m a = 40 000 kg × 0.50 m/s² = 20 000 N (in the direction of motion)."/>
          <WrittenQ num={37} question="An ice hockey player hits a 160 g puck, which accelerates across the ice at 25 m/s² while the stick is in contact with it. Calculate the net force on the puck. (2 marks)"
            model="Convert the mass: 160 g = 0.160 kg. F = m a = 0.160 kg × 25 m/s² = 4.0 N (in the direction the puck accelerates)."/>
        </Practice>
        <SelfCheck id="7.4.4" items={[
          "I can use F = ma and give units N, kg and m/s².",
          "I can rearrange to find acceleration or mass.",
          "I can explain how changing force or mass changes acceleration.",
          "I can convert grams to kilograms before calculating.",
        ]}/>
        <NotebookLink href={NB + "#7.4"} label="Learn it in full: Motion"/>
      </DotPoint>

      <DotPoint id="7.4.6" title="Net force in one dimension" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li>The <Term def="The single force that has the same effect as all the forces acting on an object added together, taking direction into account.">net force</Term> is the vector sum of all the forces on an object.</li>
            <li>Pick a positive direction. Forces in the <strong>same</strong> direction <strong>add</strong>; forces in <strong>opposite</strong> directions <strong>subtract</strong>. The net force points the way of the bigger total.</li>
            <li>Always state the size <strong>and direction</strong>, e.g. "2 000 N upward".</li>
            <li><strong>Balanced</strong> forces (net force = 0): the object stays at rest <em>or</em> keeps moving at a constant velocity. It does not have to be stopped.</li>
            <li><strong>Unbalanced</strong> forces: the object accelerates in the direction of the net force (F = m a).</li>
          </ul>
          <Figure num="9" caption="A lift car starting to move up. Arrow length shows force size.">
            <LiftFig/>
          </Figure>
        </Recap>
        <WorkedExample title="A lift starting upward"
          problem="In Figure 9 the cable pulls up on a 1 000 kg lift car with 11 800 N and its weight is 9 800 N. Find the net force and the acceleration."
          steps={[
            "Take up as positive. Net force = 11 800 N − 9 800 N = +2 000 N, so 2 000 N upward.",
            "Use F = m a: a = F ÷ m = 2 000 ÷ 1 000.",
            "a = 2.0 m/s² upward.",
          ]}
          answer="Net force = 2 000 N up; the lift accelerates upward at 2.0 m/s²."/>
        <Practice title="Adding forces">
          <MCQ num={38} question="A train's motors provide a forward force of 85 kN. Friction and air resistance together provide 60 kN backwards. What is the net force?"
            options={["145 kN forward", "25 kN backward", "25 kN forward", "0 kN"]}
            correct={2}
            explain="Opposite forces subtract: 85 − 60 = 25 kN, in the direction of the larger force (forward). 145 kN comes from adding forces that act in opposite directions."/>
          <MCQ num={39} question="An electric scooter travels along a flat path at a constant velocity. Its motor provides a forward driving force of 150 N. What is the total resistance force on the scooter?"
            options={["Less than 150 N, otherwise the scooter would stop", "Exactly 150 N backwards", "More than 150 N backwards", "0 N, because the scooter is moving"]}
            correct={1}
            explain="Constant velocity means zero acceleration, so the forces are balanced: resistance = 150 N backwards. 'Less than 150 N' is a common misconception: a net forward force would make the scooter speed up, not just keep moving."/>
          <MCQ num={40} question="Two people push a broken-down car forward with 300 N and 250 N. Friction acts backwards with 400 N. What is the net force on the car?"
            options={["950 N forward", "150 N forward", "150 N backward", "50 N forward"]}
            correct={1}
            explain="Forward forces add: 300 + 250 = 550 N. Then subtract the opposite force: 550 − 400 = 150 N forward. 950 N comes from adding all three, ignoring direction."/>
          <WrittenQ num={41} question="A drone has a weight of 20 N. (a) While rising, its rotors give 26 N of upward thrust and air resistance is 2 N downward. Calculate the net force. (b) State the upward thrust needed for the drone to hover at a fixed height, and explain why. (3 marks)"
            model="(a) Taking up as positive: net force = 26 − 20 − 2 = 4 N upward. (b) 20 N. When hovering, the drone is not moving, so there is no air resistance and the forces must be balanced (net force = 0). The upward thrust must equal the 20 N weight."/>
        </Practice>
        <SelfCheck id="7.4.6" items={[
          "I can add forces in the same direction and subtract forces in opposite directions.",
          "I can give a net force with size and direction.",
          "I can explain that balanced forces mean rest or constant velocity.",
        ]}/>
        <NotebookLink href={NB + "#7.4"} label="Learn it in full: Motion"/>
      </DotPoint>

      <DotPoint id="7.4.7" title="Formulas and graphs for force and motion" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="core"/>
        <Recap>
          <div style={tableWrap}>
            <table>
              <thead><tr><th>Formula</th><th>Meaning</th><th>Units</th></tr></thead>
              <tbody>
                <tr><td><strong>v = d ÷ t</strong></td><td>speed = distance ÷ time</td><td>m/s, m, s</td></tr>
                <tr><td><strong>a = (v − u) ÷ t</strong></td><td>acceleration = (final velocity − initial velocity) ÷ time</td><td>m/s², m/s, s</td></tr>
                <tr><td><strong>F = m a</strong></td><td>net force = mass × acceleration</td><td>N, kg, m/s²</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>Velocity–time graph</strong>: the <strong>gradient = acceleration</strong>; the <strong>area under the line = distance travelled</strong> (displacement). Horizontal line = constant velocity (not stopped!). Line sloping down = slowing down (negative acceleration).</li>
            <li><strong>Distance–time graph</strong>: gradient = speed; horizontal line = stopped.</li>
            <li>Convert km/h to m/s by dividing by 3.6 (e.g. 72 km/h = 20 m/s). Convert minutes to seconds (× 60).</li>
            <li>A negative acceleration (deceleration) means the object is slowing down.</li>
          </ul>
          <Figure num="10" caption="A train between two stations. Gradients give acceleration; the shaded areas add up to the distance between stations.">
            <TrainVT/>
          </Figure>
        </Recap>
        <WorkedExample title="Acceleration and force for the train"
          problem="Use Figure 10. (a) Calculate the train's acceleration in the first 40 s. (b) The train has a mass of 200 000 kg. Calculate the net force during this time. (c) Calculate the acceleration from 100 s to 120 s."
          steps={[
            "(a) a = (v − u) ÷ t = (20 − 0) ÷ 40 = 0.50 m/s². (This is also the gradient of the first section.)",
            "(b) F = m a = 200 000 × 0.50 = 100 000 N forward.",
            "(c) a = (0 − 20) ÷ (120 − 100) = −20 ÷ 20 = −1.0 m/s². The negative sign shows the train is slowing down.",
          ]}
          answer="(a) 0.50 m/s² (b) 100 000 N (1.0 × 10⁵ N) (c) −1.0 m/s² (deceleration of 1.0 m/s²)."/>
        <WorkedExample title="Distance from the area"
          problem="Use Figure 10 to find the distance between the two stations and the train's average speed."
          steps={[
            "Split the area under the line into shapes.",
            "Triangle 0–40 s: ½ × 40 × 20 = 400 m.",
            "Rectangle 40–100 s: 60 × 20 = 1 200 m.",
            "Triangle 100–120 s: ½ × 20 × 20 = 200 m.",
            "Total distance = 400 + 1 200 + 200 = 1 800 m. Average speed = d ÷ t = 1 800 ÷ 120 = 15 m/s.",
          ]}
          answer="The stations are 1 800 m apart; average speed = 15 m/s."/>
        <ExamTip>
          <p>Before you read a motion graph, check the y-axis label. On a distance–time graph a flat line means stopped; on a velocity–time graph a flat line means moving at a steady velocity. Many marks are lost by reading the wrong kind of graph.</p>
        </ExamTip>
        <Practice title="Motion maths and graphs">
          <MCQ num={42} question="On a velocity–time graph, what does a horizontal line above the time axis show?"
            options={["The object is stopped", "The object is moving at a constant velocity", "The object is speeding up steadily", "The object is slowing down steadily"]}
            correct={1}
            explain="A flat line on a velocity–time graph means the velocity is not changing, so the object moves at a constant velocity (zero acceleration). 'Stopped' is the meaning of a flat line on a distance–time graph."/>
          <MCQ num={43} question="A lift starts from rest and reaches 3.0 m/s in 1.5 s. What is its acceleration?"
            options={["4.5 m/s²", "0.50 m/s²", "2.0 m/s²", "1.5 m/s²"]}
            correct={2}
            explain="a = (v − u) ÷ t = (3.0 − 0) ÷ 1.5 = 2.0 m/s². 0.50 comes from dividing time by velocity, and 4.5 from multiplying."/>
          <MCQ num={44} question="A delivery drone flies at 54 km/h. What is this speed in m/s?"
            options={["15 m/s", "194 m/s", "54 m/s", "0.9 m/s"]}
            correct={0}
            explain="Divide by 3.6: 54 ÷ 3.6 = 15 m/s (54 000 m ÷ 3 600 s). 194 m/s comes from multiplying by 3.6 instead of dividing."/>
          <MCQ num={45} question="A train slows from 25 m/s to 10 m/s in 30 s. What is its acceleration?"
            options={["0.50 m/s²", "−0.50 m/s²", "−1.2 m/s²", "−15 m/s²"]}
            correct={1}
            explain="a = (v − u) ÷ t = (10 − 25) ÷ 30 = −15 ÷ 30 = −0.50 m/s². The negative sign shows it is slowing down; leaving it off (0.50 m/s²) would describe speeding up. −15 forgets to divide by the time."/>
          <WrittenQ num={46} question="A delivery drone flies at a constant 12 m/s for 2.5 minutes. Calculate the distance it travels. (2 marks)"
            model="t = 2.5 × 60 = 150 s. v = d ÷ t, so d = v × t = 12 m/s × 150 s = 1 800 m (1.8 km)."/>
          <Figure num="11" caption="A skateboarder rolling along a flat path.">
            <SkaterVT/>
          </Figure>
          <WrittenQ num={47} question="Use Figure 11. (a) Calculate the skateboarder's acceleration in the first 6 s. (b) Calculate the total distance travelled in 24 s. (c) The skateboarder and board have a total mass of 60 kg. Calculate the net force on them in the first 6 s. (5 marks)"
            model="(a) a = (v − u) ÷ t = (3 − 0) ÷ 6 = 0.5 m/s². (b) Distance = area under the graph: ½ × 6 × 3 = 9 m (0 to 6 s), plus 12 × 3 = 36 m (6 s to 18 s), plus ½ × 6 × 3 = 9 m (18 s to 24 s). Total = 9 + 36 + 9 = 54 m. (c) F = m a = 60 kg × 0.5 m/s² = 30 N forward."/>
          <WrittenQ num={48} question="Describe what a straight line sloping upwards shows on (a) a distance–time graph and (b) a velocity–time graph. (2 marks)"
            model="(a) On a distance–time graph it shows the object is moving at a constant speed (the gradient is the speed). (b) On a velocity–time graph it shows the object is speeding up with a constant acceleration (the gradient is the acceleration)."/>
        </Practice>
        <SelfCheck id="7.4.7" items={[
          "I can use v = d ÷ t, a = (v − u) ÷ t and F = ma with correct units.",
          "I can find acceleration from the gradient of a velocity–time graph.",
          "I can find distance from the area under a velocity–time graph.",
          "I can tell what a flat or sloping line means on each type of graph.",
          "I can convert km/h to m/s and minutes to seconds.",
        ]}/>
        <NotebookLink href={NB + "#7.4"} label="Learn it in full: Motion"/>
      </DotPoint>
    </div>
  );
}

/* =========================================================
   SECTION 7.5 SOCIETY
   ========================================================= */
function Section75({ progress, setProgress }) {
  return (
    <div>
      <div className="topic-head">
        <div className="eyebrow">7.5 Waves, motion and society</div>
        <h1>Arguing about technology</h1>
        <p className="lead">Build an argument with a claim, evidence, reasoning and a limitation, using the physics behind each technology.</p>
      </div>

      <DotPoint id="7.5.1" title="Arguing how waves and motion have changed society" progress={progress} setProgress={setProgress}>
        <ExamFocus tier="important"/>
        <Recap>
          <ul>
            <li><strong>Claim</strong>: a clear answer to the question ("Ultrasound has greatly improved healthcare").</li>
            <li><strong>Evidence</strong>: specific examples, facts or data, not general statements.</li>
            <li><strong>Reasoning</strong>: the science that links the evidence to the claim (the wave or motion idea).</li>
            <li><strong>Counterpoint or limitation</strong>: a cost, risk or drawback, and why your claim still stands.</li>
            <li><strong>Conclusion</strong>: restate your judgement. "Evaluate" questions need a judgement.</li>
          </ul>
          <div style={tableWrap}>
            <table>
              <thead><tr><th>Technology</th><th>Physics behind it</th><th>Impact on society</th></tr></thead>
              <tbody>
                <tr><td>Mobile phones and Wi-Fi</td><td>Microwaves and radio waves carry data at the speed of light</td><td>Instant worldwide communication, online learning and banking; concerns about e-waste and screen time</td></tr>
                <tr><td>Fibre-optic internet</td><td>Light or infrared reflects along glass fibres (total internal reflection)</td><td>Fast, high-capacity internet across continents</td></tr>
                <tr><td>Medical ultrasound</td><td>High-frequency sound reflects at boundaries between tissues</td><td>Safe imaging of unborn babies and organs, with no ionising radiation</td></tr>
                <tr><td>X-rays and CT</td><td>Denser body parts stop more X-rays than less dense parts, so a detector records a shadow picture of the inside</td><td>Diagnosing fractures and disease without surgery; each scan gives a small dose of ionising radiation</td></tr>
                <tr><td>Seatbelts, airbags, crumple zones</td><td>Increase stopping time, so deceleration and force (F = m a) are smaller</td><td>Far fewer deaths and serious injuries in crashes</td></tr>
                <tr><td>GPS navigation</td><td>Timed radio signals from satellites in orbit</td><td>Navigation, delivery, emergency services, farming</td></tr>
              </tbody>
            </table>
          </div>
        </Recap>
        <WorkedExample title="Building a 4-mark argument"
          problem="Construct an argument about how ultrasound technology has changed medicine. (4 marks)"
          steps={[
            "Claim: Ultrasound has changed medicine by giving doctors a safe, fast way to see inside the body.",
            "Evidence: It is used for pregnancy scans, checking the heart and organs, and guiding needles during procedures.",
            "Reasoning: A probe sends high-frequency sound waves into the body. They reflect at boundaries between different tissues, and the time taken for each echo to return is used to build a live image. Ultrasound is not ionising, so it is safe even for an unborn baby, unlike X-rays.",
            "Limitation and conclusion: Ultrasound cannot see well through bone or air, so X-rays or MRI are still needed for some problems. Even so, because it is safe, cheap and gives live images, it has greatly improved medical care.",
          ]}
          answer="Ultrasound has changed medicine by giving doctors a safe, fast way to see inside the body. It is used for pregnancy scans, checking the heart and other organs, and guiding needles during procedures. A probe sends high-frequency sound waves into the body; they reflect at the boundaries between tissues, and the time each echo takes to return is used to build a live image. Because ultrasound is not ionising, it can be used safely even on an unborn baby, unlike X-rays. Ultrasound cannot see clearly through bone or air, so X-rays or MRI are still needed for some problems. Even so, because it is safe, cheap and gives live images, ultrasound has greatly improved medical care."/>
        <Practice title="Waves, motion and society">
          <MCQ num={49} question="A student claims that airbags have made car travel safer. Which sentence is the best piece of reasoning to support this claim?"
            options={["Airbags are fitted in almost every new car.", "Airbags inflate in a crash, which increases the time it takes a person's head to stop, so their deceleration and the force on them are smaller.", "Many people say they feel safer in cars with airbags.", "Airbags were invented in the twentieth century."]}
            correct={1}
            explain="Reasoning uses science to link evidence to the claim: a longer stopping time means a smaller deceleration and, by F = m a, a smaller force. 'Fitted in almost every new car' is evidence of how common airbags are, not why they make travel safer."/>
          <WrittenQ num={50} question="Construct an argument that our understanding of motion has made car travel safer. Refer to at least one safety feature. (4 marks)"
            model="Claim: Applying the physics of motion has made car travel much safer. Evidence: Modern cars have seatbelts, airbags and crumple zones, and road deaths per kilometre driven have fallen greatly since these were introduced. Reasoning: In a crash the car and people must lose their velocity. Crumple zones and airbags make this happen over a longer time, so the deceleration (a = (v − u) ÷ t) is smaller, and by F = m a a smaller force acts on the people, causing fewer injuries. Seatbelts stop people continuing forward because of their inertia. Conclusion: Although these features add cost and cannot prevent every injury, they reduce the forces on the body so much that understanding motion has clearly made cars safer."/>
          <WrittenQ num={51} question="Evaluate the impact of wireless communication (using radio waves and microwaves) on society. (5 marks)"
            model="Wireless communication uses radio waves and microwaves, which travel at 3.0 × 10⁸ m/s and pass through the atmosphere, so information can be sent almost instantly around the world, including by satellite. Benefits: people can contact emergency services from almost anywhere, students can learn online, businesses can trade worldwide, and remote communities are better connected. Drawbacks: discarded phones create e-waste, too much screen time can affect sleep and wellbeing, and people without coverage can be left behind. The radio waves and microwaves used are non-ionising, so at normal exposure they do not damage DNA like X-rays or gamma rays can. Judgement: overall, the impact has been strongly positive because the benefits to safety, education and the economy are large, while the main drawbacks can be reduced by recycling and sensible use."/>
        </Practice>
        <SelfCheck id="7.5.1" items={[
          "I can structure an argument with a claim, evidence, reasoning and a conclusion.",
          "I can explain the wave or motion science behind at least three technologies.",
          "I can include a limitation and still reach a judgement for an 'evaluate' question.",
        ]}/>
        <NotebookLink href={NB + "#7.5"} label="Learn it in full: Waves in Society"/>
      </DotPoint>
    </div>
  );
}

mountTopicApp({
  year: 10,
  topicTitle: "Waves and Motion",
  branch: "physics",
  heroImage: "img/hero.webp",
  strand: "Yearly Exam Revision · Stage 5",
  accent: "blue",
  storageKey: "y10.rev-wavesmotion",
  hubHref: "../",
  intro: "Revise the key ideas of waves and motion for your Yearly Exam: wave types and features, the EM spectrum, v = fλ, sound and the ear, the behaviour of light, and the graphs and formulas that describe motion and force. Each dot point has a quick recap, worked examples and practice questions with model answers. A data sheet with the formulas is provided in the exam, but you still need to know how to use them.",
  glossary: {
    "transverse wave": "A wave where particles vibrate at right angles to the direction the energy travels. Has crests and troughs.",
    "longitudinal wave": "A wave where particles vibrate back and forth parallel to the direction the energy travels. Has compressions and rarefactions.",
    "crest": "The highest point of a transverse wave.",
    "trough": "The lowest point of a transverse wave.",
    "compression": "A region in a longitudinal wave where particles are close together (higher pressure).",
    "rarefaction": "A region in a longitudinal wave where particles are spread apart (lower pressure).",
    "wavelength": "The distance between two matching points next to each other on a wave, such as crest to crest. Symbol λ, unit m.",
    "amplitude": "The largest displacement of a particle from its rest position.",
    "frequency": "The number of complete waves passing a point each second. Unit hertz (Hz).",
    "electromagnetic spectrum": "The family of EM waves in order: radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays.",
    "medium": "The substance a wave travels through, such as air, water or a solid.",
    "eardrum": "A thin membrane that vibrates when sound waves reach it.",
    "ossicles": "The hammer, anvil and stirrup: three tiny bones that pass on and amplify vibrations to the cochlea.",
    "cochlea": "The fluid-filled, snail-shaped part of the inner ear lined with hair cells.",
    "hair cells": "Cells in the cochlea that bend when the fluid moves and produce electrical signals.",
    "auditory nerve": "The nerve that carries electrical signals from the cochlea to the brain.",
    "absorption": "When a material takes in light energy and changes it to another form, usually heat.",
    "reflection": "Light bouncing off a surface. Angle of incidence = angle of reflection.",
    "refraction": "The bending of light as it changes speed passing from one medium into another.",
    "scattering": "Light being redirected in many directions by tiny particles.",
    "normal": "An imaginary line at 90° to a surface, used to measure angles of light rays.",
    "scalar": "A quantity with size only, such as distance, speed or mass.",
    "vector": "A quantity with size and direction, such as displacement, velocity or force.",
    "displacement": "The straight-line change in position from start to finish, including direction.",
    "velocity": "Displacement divided by time; speed in a given direction.",
    "acceleration": "The rate of change of velocity: a = (v − u) ÷ t, in m/s².",
    "net force": "The vector sum of all the forces acting on an object.",
    "gradient": "The steepness of a line on a graph: rise ÷ run.",
  },
  sections: [
    {
      id: "7.1", label: "Wave Properties", accent: "blue",
      blurb: "★★ Transverse and longitudinal waves, v = fλ calculations, the EM spectrum and its uses.",
      points: ["7.1.3", "7.1.4", "7.1.6", "7.1.7"],
      render: (p) => <Section71 {...p}/>,
    },
    {
      id: "7.2", label: "Sound and Hearing", accent: "cyan",
      blurb: "★★★ How the ear responds to sound, plus sound as compressions and rarefactions in a medium.",
      points: ["7.2.1", "7.2.4"],
      render: (p) => <Section72 {...p}/>,
    },
    {
      id: "7.3", label: "Light", accent: "violet",
      blurb: "★★ Absorption, reflection, refraction and scattering of light.",
      points: ["7.3.2"],
      render: (p) => <Section73 {...p}/>,
    },
    {
      id: "7.4", label: "Motion and Forces", accent: "blue",
      blurb: "★★★ Motion formulas and graphs, F = ma, net force, distance–time graphs, scalars and vectors.",
      points: ["7.4.1", "7.4.3", "7.4.4", "7.4.6", "7.4.7"],
      render: (p) => <Section74 {...p}/>,
    },
    {
      id: "7.5", label: "Waves, Motion and Society", accent: "teal",
      blurb: "★★ Structuring an argument about how waves and motion have changed society.",
      points: ["7.5.1"],
      render: (p) => <Section75 {...p}/>,
    },
  ],
});

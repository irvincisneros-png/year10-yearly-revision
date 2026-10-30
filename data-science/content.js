/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */

var NB = "https://irvincisneros-png.github.io/Year-10-Science/data-science-2/";

/* ================================================================
   FIGURES
   ================================================================ */

/* 8.1.1 — four checks that make a question investigable */
function InvestigableFlow() {
  var rows = [{
    y: 64,
    t: "1  Measurable?",
    s: "Can you measure or count it?"
  }, {
    y: 128,
    t: "2  Resources?",
    s: "Equipment, money, materials?"
  }, {
    y: 192,
    t: "3  Time?",
    s: "Done in the time you have?"
  }, {
    y: 256,
    t: "4  Ethical?",
    s: "Safe, with consent, no harm?"
  }];
  var box = {
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: 1.5
  };
  return /*#__PURE__*/React.createElement(Figure, {
    num: 1,
    caption: "A question is investigable only if it passes all four checks. If it fails one, narrow it or change the method."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Flowchart. Start with your question. Check 1: can you measure or count it. Check 2: do you have the equipment, money and materials. Check 3: can it be done in the time you have. Check 4: is it safe, with consent and no harm. Yes to all means investigable. A no at any check means it is not investigable as written: narrow it, change the method or use existing data.",
    width: "100%",
    viewBox: "0 0 360 366",
    style: {
      maxWidth: 520,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "ds-arr1",
    markerWidth: "8",
    markerHeight: "8",
    refX: "7",
    refY: "4",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L8,4 L0,8 z",
    fill: "var(--ink)"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "8",
    width: "220",
    height: "36",
    rx: "18",
    fill: "var(--bg-2)",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "120",
    y: "31",
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Start: your question"), rows.map(function (r, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: "120",
      y1: r.y - 20,
      x2: "120",
      y2: r.y - 2,
      stroke: "var(--ink)",
      strokeWidth: "1.5",
      markerEnd: "url(#ds-arr1)"
    }), i > 0 && /*#__PURE__*/React.createElement("text", {
      x: "128",
      y: r.y - 7,
      fontSize: "10.5",
      fill: "var(--ink-muted)"
    }, "yes"), /*#__PURE__*/React.createElement("rect", _extends({
      x: "10",
      y: r.y,
      width: "220",
      height: "44",
      rx: "8"
    }, box)), /*#__PURE__*/React.createElement("text", {
      x: "22",
      y: r.y + 18,
      fontSize: "13",
      fontWeight: "700",
      fill: "var(--ink)"
    }, r.t), /*#__PURE__*/React.createElement("text", {
      x: "22",
      y: r.y + 35,
      fontSize: "11.5",
      fill: "var(--ink-muted)"
    }, r.s), /*#__PURE__*/React.createElement("line", {
      x1: "230",
      y1: r.y + 22,
      x2: "256",
      y2: r.y + 22,
      stroke: "var(--ink)",
      strokeWidth: "1.5",
      markerEnd: "url(#ds-arr1)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "235",
      y: r.y + 14,
      fontSize: "10",
      fill: "var(--ink-muted)"
    }, "no"));
  }), /*#__PURE__*/React.createElement("rect", {
    x: "258",
    y: "64",
    width: "94",
    height: "236",
    rx: "8",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.5",
    strokeDasharray: "5 3"
  }), ["Not", "investigable", "as written.", "", "Narrow it,", "change the", "method, or", "use existing", "data."].map(function (w, i) {
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      x: "305",
      y: 110 + i * 17,
      textAnchor: "middle",
      fontSize: "11.5",
      fontWeight: i < 3 ? 700 : 400,
      fill: "var(--ink)"
    }, w);
  }), /*#__PURE__*/React.createElement("line", {
    x1: "120",
    y1: "300",
    x2: "120",
    y2: "318",
    stroke: "var(--ink)",
    strokeWidth: "1.5",
    markerEnd: "url(#ds-arr1)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "128",
    y: "313",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "yes"), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "320",
    width: "220",
    height: "38",
    rx: "19",
    fill: "var(--card)",
    stroke: "var(--accent)",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "120",
    y: "344",
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Yes to all: investigable")));
}

/* 8.1.5 — claim, evidence, reasoning */
function CERFigure() {
  var boxes = [{
    x: 6,
    t: "CLAIM",
    a: "What you",
    b: "conclude"
  }, {
    x: 128,
    t: "EVIDENCE",
    a: "Data with",
    b: "numbers + units"
  }, {
    x: 250,
    t: "REASONING",
    a: "The science",
    b: "that links them"
  }];
  var chips = [{
    x: 6,
    y: 150,
    w: 112,
    l: "large sample"
  }, {
    x: 124,
    y: 150,
    w: 112,
    l: "control group"
  }, {
    x: 242,
    y: 150,
    w: 112,
    l: "repeat trials"
  }, {
    x: 6,
    y: 186,
    w: 172,
    l: "one variable changed"
  }, {
    x: 184,
    y: 186,
    w: 170,
    l: "results consistent"
  }];
  return /*#__PURE__*/React.createElement(Figure, {
    num: 2,
    caption: "Claim, evidence, reasoning. The evidence is only as strong as the investigation that produced it."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Three boxes in a row. Claim: what you conclude. Evidence: data with numbers and units. Reasoning: the science that links them. Below: evidence is stronger with a large sample, a control group, repeat trials, only one variable changed, and consistent results.",
    width: "100%",
    viewBox: "0 0 360 222",
    style: {
      maxWidth: 560,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "ds-arr2",
    markerWidth: "8",
    markerHeight: "8",
    refX: "7",
    refY: "4",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L8,4 L0,8 z",
    fill: "var(--ink)"
  }))), boxes.map(function (b, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: b.x,
      y: "10",
      width: "104",
      height: "82",
      rx: "10",
      fill: "var(--card)",
      stroke: "var(--accent)",
      strokeWidth: "2.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: b.x + 52,
      y: "36",
      textAnchor: "middle",
      fontSize: "12.5",
      fontWeight: "800",
      fill: "var(--ink)"
    }, b.t), /*#__PURE__*/React.createElement("text", {
      x: b.x + 52,
      y: "58",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink)"
    }, b.a), /*#__PURE__*/React.createElement("text", {
      x: b.x + 52,
      y: "74",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink)"
    }, b.b), i < 2 && /*#__PURE__*/React.createElement("line", {
      x1: b.x + 106,
      y1: "51",
      x2: b.x + 120,
      y2: "51",
      stroke: "var(--ink)",
      strokeWidth: "1.5",
      markerEnd: "url(#ds-arr2)"
    }));
  }), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "132",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Evidence is stronger with:"), chips.map(function (c, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: c.x,
      y: c.y,
      width: c.w,
      height: "28",
      rx: "14",
      fill: "var(--bg-2)",
      stroke: "var(--ink-muted)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: c.x + c.w / 2,
      y: c.y + 18.5,
      textAnchor: "middle",
      fontSize: "11.5",
      fill: "var(--ink)"
    }, c.l));
  })));
}

/* 8.1.5 — a confounding variable */
function ConfoundFigure() {
  return /*#__PURE__*/React.createElement(Figure, {
    num: 3,
    caption: "Umbrella sales and car crashes rise and fall together, but neither causes the other. Rain (a confounding variable) causes both."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Diagram. Rainy weather has arrows to more umbrellas sold and to more car crashes. A dashed line between umbrellas sold and car crashes is labelled correlated, but not cause and effect.",
    width: "100%",
    viewBox: "0 0 360 200",
    style: {
      maxWidth: 520,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "ds-arr3",
    markerWidth: "8",
    markerHeight: "8",
    refX: "7",
    refY: "4",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L8,4 L0,8 z",
    fill: "var(--ink)"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "115",
    y: "8",
    width: "130",
    height: "40",
    rx: "20",
    fill: "var(--card)",
    stroke: "var(--accent)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "25",
    textAnchor: "middle",
    fontSize: "12.5",
    fontWeight: "800",
    fill: "var(--ink)"
  }, "Rainy weather"), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "40",
    textAnchor: "middle",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "confounding variable"), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "128",
    width: "128",
    height: "44",
    rx: "8",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "70",
    y: "148",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "More umbrellas"), /*#__PURE__*/React.createElement("text", {
    x: "70",
    y: "164",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "sold"), /*#__PURE__*/React.createElement("rect", {
    x: "226",
    y: "128",
    width: "128",
    height: "44",
    rx: "8",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "290",
    y: "148",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "More car"), /*#__PURE__*/React.createElement("text", {
    x: "290",
    y: "164",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "crashes"), /*#__PURE__*/React.createElement("line", {
    x1: "150",
    y1: "48",
    x2: "86",
    y2: "124",
    stroke: "var(--ink)",
    strokeWidth: "1.8",
    markerEnd: "url(#ds-arr3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "210",
    y1: "48",
    x2: "274",
    y2: "124",
    stroke: "var(--ink)",
    strokeWidth: "1.8",
    markerEnd: "url(#ds-arr3)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "96",
    y: "84",
    textAnchor: "end",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "causes"), /*#__PURE__*/React.createElement("text", {
    x: "264",
    y: "84",
    fontSize: "10.5",
    fill: "var(--ink-muted)"
  }, "causes"), /*#__PURE__*/React.createElement("line", {
    x1: "138",
    y1: "150",
    x2: "222",
    y2: "150",
    stroke: "var(--ink-muted)",
    strokeWidth: "1.8",
    strokeDasharray: "5 4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "188",
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink)"
  }, "correlated, but not cause and effect")));
}

/* 8.1.6 — street temperature line graph (worked extended response) */
var TREE = [31.2, 33.0, 29.8, 34.1, 32.4];
var BARE = [33.6, 35.1, 31.9, 36.8, 34.6];
function StreetGraph() {
  var X = function X(d) {
    return 60 + d * 65;
  }; // day index 0..4
  var Y = function Y(t) {
    return 200 - (t - 28) * 17;
  }; // 28 °C at y=200, 38 °C at y=30
  var ticks = [28, 30, 32, 34, 36, 38];
  var path = function path(arr) {
    return arr.map(function (t, i) {
      return (i ? "L" : "M") + X(i) + "," + Y(t);
    }).join(" ");
  };
  return /*#__PURE__*/React.createElement(Figure, {
    num: 4,
    caption: "Air temperature at 3 pm on five hot days, measured 1.5 m above the footpath on two streets."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Line graph of air temperature at 3 pm over five days. Bare street: 33.6, 35.1, 31.9, 36.8 and 34.6 degrees Celsius. Tree-lined street: 31.2, 33.0, 29.8, 34.1 and 32.4 degrees Celsius. The tree-lined street is cooler every day.",
    width: "100%",
    viewBox: "0 0 360 272",
    style: {
      maxWidth: 560,
      display: "block",
      margin: "0 auto"
    }
  }, ticks.map(function (t) {
    return /*#__PURE__*/React.createElement("g", {
      key: t
    }, /*#__PURE__*/React.createElement("line", {
      x1: "44",
      y1: Y(t),
      x2: "344",
      y2: Y(t),
      stroke: "var(--border)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "38",
      y: Y(t) + 4,
      textAnchor: "end",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, t));
  }), /*#__PURE__*/React.createElement("line", {
    x1: "44",
    y1: "30",
    x2: "44",
    y2: "200",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "44",
    y1: "200",
    x2: "344",
    y2: "200",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), [0, 1, 2, 3, 4].map(function (d) {
    return /*#__PURE__*/React.createElement("text", {
      key: d,
      x: X(d),
      y: "216",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, d + 1);
  }), /*#__PURE__*/React.createElement("text", {
    x: "194",
    y: "234",
    textAnchor: "middle",
    fontSize: "11.5",
    fill: "var(--ink)"
  }, "Day"), /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "115",
    textAnchor: "middle",
    fontSize: "11.5",
    fill: "var(--ink)",
    transform: "rotate(-90 14 115)"
  }, "Air temperature (\xB0C)"), /*#__PURE__*/React.createElement("path", {
    d: path(BARE),
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2",
    strokeDasharray: "6 4"
  }), BARE.map(function (t, i) {
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: X(i) - 4.5,
      y: Y(t) - 4.5,
      width: "9",
      height: "9",
      fill: "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "2"
    });
  }), /*#__PURE__*/React.createElement("path", {
    d: path(TREE),
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "2.5"
  }), TREE.map(function (t, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: X(i),
      cy: Y(t),
      r: "5",
      fill: "var(--accent)",
      stroke: "var(--card)",
      strokeWidth: "1.5"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: "56",
    y1: "256",
    x2: "80",
    y2: "256",
    stroke: "var(--ink)",
    strokeWidth: "2",
    strokeDasharray: "6 4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "63.5",
    y: "251.5",
    width: "9",
    height: "9",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "86",
    y: "260",
    fontSize: "11.5",
    fill: "var(--ink)"
  }, "Bare street"), /*#__PURE__*/React.createElement("line", {
    x1: "194",
    y1: "256",
    x2: "218",
    y2: "256",
    stroke: "var(--accent)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "206",
    cy: "256",
    r: "5",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "224",
    y: "260",
    fontSize: "11.5",
    fill: "var(--ink)"
  }, "Tree-lined street")));
}

/* 8.2.2 — homeopathic dilutions */
function DilutionFigure() {
  var steps = [{
    l: "Start",
    r: "about 10²³",
    dots: 18
  }, {
    l: "2C",
    r: "1 in 10⁴",
    dots: 9
  }, {
    l: "6C",
    r: "1 in 10¹²",
    dots: 3
  }, {
    l: "12C",
    r: "1 in 10²⁴",
    dots: 0
  }, {
    l: "30C",
    r: "1 in 10⁶⁰",
    dots: 0
  }];
  var pos = [[0, 0], [8, 6], [-8, 8], [4, -6], [-4, 14], [10, 18], [-10, -2], [0, 22], [6, 28], [-6, 30], [12, 34], [-12, 22], [2, 40], [-2, 10], [10, 44], [-10, 40], [6, 12], [-6, 46]];
  return /*#__PURE__*/React.createElement(Figure, {
    num: 5,
    caption: "Each 'C' step dilutes the mixture 1 part in 100. By about 12C, it is very unlikely that even one molecule of the original substance is left."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Five beakers. Start: about 10 to the 23 molecules, many dots. 2C: diluted 1 in 10 to the 4, fewer dots. 6C: 1 in 10 to the 12, a few dots. 12C: 1 in 10 to the 24, no dots, probably no molecules left. 30C: 1 in 10 to the 60, no dots.",
    width: "100%",
    viewBox: "0 0 360 170",
    style: {
      maxWidth: 560,
      display: "block",
      margin: "0 auto"
    }
  }, steps.map(function (s, i) {
    var cx = 38 + i * 71;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("path", {
      d: "M".concat(cx - 24, ",40 L").concat(cx - 24, ",112 Q").concat(cx - 24, ",120 ").concat(cx - 16, ",120 L").concat(cx + 16, ",120 Q").concat(cx + 24, ",120 ").concat(cx + 24, ",112 L").concat(cx + 24, ",40"),
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "1.8"
    }), /*#__PURE__*/React.createElement("rect", {
      x: cx - 22.5,
      y: "58",
      width: "45",
      height: "60",
      fill: "var(--bg-2)"
    }), pos.slice(0, s.dots).map(function (p, j) {
      return /*#__PURE__*/React.createElement("circle", {
        key: j,
        cx: cx + p[0],
        cy: 66 + p[1] * 1.05,
        r: "2.6",
        fill: "var(--accent)"
      });
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: "24",
      textAnchor: "middle",
      fontSize: "12.5",
      fontWeight: "800",
      fill: "var(--ink)"
    }, s.l), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: "140",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink)"
    }, s.r), i < 4 && /*#__PURE__*/React.createElement("text", {
      x: cx + 35.5,
      y: "88",
      textAnchor: "middle",
      fontSize: "13",
      fill: "var(--ink-muted)"
    }, "\u2192"));
  }), /*#__PURE__*/React.createElement("text", {
    x: "38",
    y: "156",
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, "molecules"), /*#__PURE__*/React.createElement("text", {
    x: "287",
    y: "156",
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, "probably none left")));
}

/* styled stimulus card (social post, label, forum, podcast) */
function Stimulus(_ref) {
  var kind = _ref.kind,
    children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1.5px solid var(--ink)",
      borderRadius: 12,
      padding: "12px 14px",
      background: "var(--card)",
      margin: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--ink-muted)",
      marginBottom: 6
    }
  }, kind), children);
}

/* ================================================================
   SECTION 8.1 — Investigating questions and claims
   ================================================================ */
function Section1(_ref2) {
  var progress = _ref2.progress,
    setProgress = _ref2.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "8.1 Investigating questions and claims"), /*#__PURE__*/React.createElement("h1", null, "Questions, evidence and arguments"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Can the question be tested? Does the data really back up the claim? Can you write an argument that weighs up all the evidence? Those three skills are the whole of 8.1.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.1",
    title: "Investigable and non-investigable questions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "An ", /*#__PURE__*/React.createElement(Term, {
    def: "A question that can be answered by collecting measurable data in a fair, safe and practical way."
  }, "investigable question"), " can be answered by collecting data. It names an ", /*#__PURE__*/React.createElement("strong", null, "independent variable"), " (what you change) and a ", /*#__PURE__*/React.createElement("strong", null, "dependent variable"), " (what you measure)."), /*#__PURE__*/React.createElement("li", null, "It must pass four checks: ", /*#__PURE__*/React.createElement("strong", null, "measurability"), " (can the variables be measured or counted?), ", /*#__PURE__*/React.createElement("strong", null, "resources"), " (equipment, money, materials, place), ", /*#__PURE__*/React.createElement("strong", null, "time"), " (can you get results in the time you have?) and ", /*#__PURE__*/React.createElement("strong", null, "ethics"), " (safe, with consent, no harm to people, animals or the environment)."), /*#__PURE__*/React.createElement("li", null, "Questions about opinions, values or beliefs (\"Which is the best\u2026?\", \"Should we\u2026?\") are ", /*#__PURE__*/React.createElement(Term, {
    def: "A question that cannot be settled by collecting data, because it depends on opinion or values, or cannot be measured, or cannot be tested safely or practically."
  }, "non-investigable"), ". Science can inform them but cannot settle them."), /*#__PURE__*/React.createElement("li", null, "Vague words like \"better\", \"healthier\" or \"harmful\" must be replaced with something you can measure (mass in g, time in s, height in cm, a score out of 10)."), /*#__PURE__*/React.createElement("li", null, "A question that is unethical or too slow to test directly can sometimes be answered with ", /*#__PURE__*/React.createElement("strong", null, "existing data"), " (records, surveys, past studies) instead of an experiment."))), /*#__PURE__*/React.createElement(InvestigableFlow, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Turning a vague question into an investigable one",
    problem: /*#__PURE__*/React.createElement("p", null, "Mia asks: ", /*#__PURE__*/React.createElement("em", null, "\"Does music help plants grow better?\""), " Explain why this is not investigable as written, then rewrite it so it is."),
    steps: ["Check measurability. 'Better' is vague: it could mean taller, heavier, more leaves or more flowers. 'Music' is also vague: what type, how loud, for how long?", "Check resources and time. Radish seeds sprout and grow quickly, cost little and need only pots, soil, a speaker and a ruler, so a two-week test is practical in a school.", "Check ethics. No people or animals are harmed, so it is ethical.", "Rewrite naming the independent variable (music on or off, at a set volume and time) and a measurable dependent variable (mean height in cm after a set number of days)."],
    answer: /*#__PURE__*/React.createElement(React.Fragment, null, "\"Better\" and \"music\" cannot be measured as written. Investigable version: ", /*#__PURE__*/React.createElement("em", null, "\"Does playing classical music at 70 dB for 6 hours a day change the mean height (cm) of radish seedlings after 14 days, compared with seedlings grown in silence?\""))
  }), /*#__PURE__*/React.createElement(ExamTip, null, "When asked to ", /*#__PURE__*/React.createElement("strong", null, "justify"), " whether a question is investigable, name the check it passes or fails (measurable, resources, time, ethics) and quote the word from the question that causes the problem. Then, if asked, rewrite it with an IV and a DV that has a unit."), /*#__PURE__*/React.createElement(Practice, {
    title: "Investigable questions"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "Which question is investigable in a school science lab?",
    options: ["Is it wrong to keep fish in small tanks?", "Does the temperature of water affect how long a 2 g effervescent tablet takes to dissolve?", "Which colour is the most beautiful to look at?", "Will humans ever live on another planet?"],
    correct: 1,
    explain: "Temperature (\xB0C) and dissolving time (s) can both be measured with cheap equipment in a lesson, so B is investigable. A is tempting because fish are real things you could observe, but 'wrong' is a value judgement, not something data can settle. C is opinion and D is about the future, which cannot be measured now."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 2,
    question: "A student wants to test the question: 'Does going without sleep for two nights affect a teenager's memory?' Which check does this question mainly fail?",
    options: ["Measurability", "Time", "Ethics", "Resources"],
    correct: 2,
    explain: "Keeping people awake for two nights could harm their health and safety, so it fails the ethics check. Measurability is tempting, but memory can be measured with a recall test score, so that check is passed. A safer version could use existing sleep-diary data or compare normal sleep with a slightly later bedtime."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 3,
    question: "A coastal council asks: 'Will the new rock sea wall stop our beach eroding over the next 50 years?' Explain why this question is difficult to investigate directly, and suggest how scientists could still gather useful evidence. (2 marks)",
    model: "The question fails the time check: it would take 50 years to collect the results, far too long for the council to wait before deciding. Scientists could instead use existing data, such as measurements of beach width at other beaches where similar sea walls were built decades ago, or measure the beach width every three months for a few years and compare it with a nearby beach that has no wall."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "Noah's question is: 'Are energy drinks bad for you?' Identify two reasons it is not investigable as written, then rewrite it as an investigable question that a school could test safely. (3 marks)",
    model: "First, 'bad for you' is vague and cannot be measured, because it does not say which effect (heart rate, sleep, concentration) is meant. Second, giving teenagers energy drinks to test for harm would be unethical because of the high caffeine content. An investigable and safe version is: 'Does the volume of an energy drink added to 100 mL of water change the pH of the mixture?' The IV is the volume of drink (mL) and the DV is pH, which can be measured with a pH meter."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "8.1.1",
    items: ["I can say whether a question is investigable using the four checks: measurable, resources, time, ethics.", "I can spot vague words like 'better' or 'harmful' and replace them with a measurement and unit.", "I can rewrite a question so it names an independent and a dependent variable.", "I can suggest using existing data when a question is too slow or unethical to test directly."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#8.1",
    label: "Learn it in full: Investigating Questions"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.5",
    title: "Using evidence and reasoning to support conclusions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Claim, evidence, reasoning (CER)."), " The ", /*#__PURE__*/React.createElement(Term, {
    def: "A statement that answers the question or says what you conclude."
  }, "claim"), " says what you conclude. The ", /*#__PURE__*/React.createElement(Term, {
    def: "Specific data from the investigation, quoted with numbers and units, that backs up the claim."
  }, "evidence"), " quotes the data (numbers with units, often means or differences). The ", /*#__PURE__*/React.createElement(Term, {
    def: "The scientific explanation of why the evidence supports the claim."
  }, "reasoning"), " explains the science that links them."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sample size."), " More test subjects or samples means one unusual result has less effect, so the conclusion is more ", /*#__PURE__*/React.createElement(Term, {
    def: "Results are reliable when repeating the investigation gives similar results each time."
  }, "reliable"), ". A test on 3 people says very little; a test on 300 says much more."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Controls."), " A ", /*#__PURE__*/React.createElement(Term, {
    def: "A group that does not receive the change being tested, used for comparison."
  }, "control group"), " gives you something to compare with. ", /*#__PURE__*/React.createElement(Term, {
    def: "Variables kept the same so that only the independent variable changes."
  }, "Controlled variables"), " are kept the same so the test is fair, which makes it ", /*#__PURE__*/React.createElement(Term, {
    def: "An investigation is valid when it actually tests what it claims to test, because only the independent variable was changed."
  }, "valid"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Repeats."), " Repeating trials and taking a mean reduces the effect of random errors and lets you spot ", /*#__PURE__*/React.createElement(Term, {
    def: "A result that does not fit the pattern of the others."
  }, "outliers"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Correlation is not causation."), " Two variables can change together (a ", /*#__PURE__*/React.createElement(Term, {
    def: "A relationship where two variables change together. Positive: both increase. Negative: one increases as the other decreases."
  }, "correlation"), ") without one causing the other. A ", /*#__PURE__*/React.createElement(Term, {
    def: "A third variable that affects both variables being studied, creating a correlation that is not cause and effect."
  }, "confounding variable"), " may cause both. Only a controlled experiment can show cause and effect."), /*#__PURE__*/React.createElement("li", null, "Common mistake: writing \"this proves\u2026\". Data ", /*#__PURE__*/React.createElement("em", null, "support"), " a claim; they rarely prove it."))), /*#__PURE__*/React.createElement(CERFigure, null), /*#__PURE__*/React.createElement(ConfoundFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Is the conclusion justified?",
    problem: /*#__PURE__*/React.createElement("p", null, "Liam claims a new brand of running shoe makes people faster. He asks three friends to sprint 100 m in their old shoes, then straight away sprint 100 m again in the new shoes. Their times drop from a mean of 15.2 s to 14.9 s. Liam concludes, \"The new shoes make you faster.\" Evaluate his conclusion. (3 marks)"),
    steps: ["State the evidence fairly: the mean time fell by 15.2 − 14.9 = 0.3 s, which is a small difference.", "Sample size: only 3 people, so one person having a good run could cause the whole difference. The result is not reliable.", "Fairness: the new-shoe run was always second, so the friends were warmed up (or more tired). Order is an uncontrolled variable. The runners also knew which shoes they wore, so they may have tried harder.", "No repeats: each person ran once in each shoe, so random variation cannot be averaged out.", "Make a judgement and suggest an improvement."],
    answer: "The conclusion is not justified. The 0.3 s improvement is small and came from only 3 runners with one trial each, so it is not reliable. The test was not valid because the new shoes were always worn second, so warm-up or effort could explain the faster time. A better test would use 30 or more runners, randomly decide which shoe each person wears first, rest between runs, and repeat each run three times."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Correlation or cause?",
    problem: /*#__PURE__*/React.createElement("p", null, "A survey of 2000 adults found that people who own a dog have lower average blood pressure than people who do not. A news site reports: \"Owning a dog lowers your blood pressure.\" Explain whether this conclusion is supported. (3 marks)"),
    steps: ["Identify the type of evidence: a survey that compares groups. It shows a correlation (dog ownership goes with lower blood pressure). The large sample of 2000 makes the correlation itself believable.", "Look for confounding variables: dog owners may walk more, be younger, or have more time and money. Each of these could lower blood pressure on its own.", "Reverse direction: people who are already fit and healthy may be more likely to choose to get a dog.", "Say what would show cause and effect: a controlled experiment, or a study that measures blood pressure before and after people get a dog while controlling exercise and age."],
    answer: "The headline is not supported. The survey shows a correlation between owning a dog and lower blood pressure, but it does not show that the dog causes it. A confounding variable such as exercise (dog owners walk more) or age could cause both. A controlled study comparing similar people before and after getting a dog would be needed to test cause and effect."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "For ", /*#__PURE__*/React.createElement("strong", null, "evaluate"), " or ", /*#__PURE__*/React.createElement("strong", null, "assess"), " a conclusion, use the checklist ", /*#__PURE__*/React.createElement("strong", null, "S-C-R-C"), ": ", /*#__PURE__*/React.createElement("strong", null, "S"), "ample size, ", /*#__PURE__*/React.createElement("strong", null, "C"), "ontrols and fairness, ", /*#__PURE__*/React.createElement("strong", null, "R"), "epeats, ", /*#__PURE__*/React.createElement("strong", null, "C"), "orrelation vs causation. Each point you link to the data usually earns a mark. Finish with a clear judgement: supported, partly supported or not supported."), /*#__PURE__*/React.createElement(Practice, {
    title: "Evidence and conclusions"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "Why do scientists repeat trials and calculate a mean?",
    options: ["To make the results match the hypothesis", "To reduce the effect of random errors and make results more reliable", "To remove the need for a control group", "To prove the hypothesis is correct"],
    correct: 1,
    explain: "Repeating and averaging smooths out random errors and shows whether results are consistent, which improves reliability. 'Prove the hypothesis' is tempting, but repeats can only support a hypothesis; one well-designed contrary result could still overturn it. Repeats never replace a control group."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "In a hospital trial of a new cough syrup, half the patients get the syrup and half get an identical-looking syrup with no medicine. What is the purpose of the second group?",
    options: ["To increase the sample size", "To act as a control group for comparison, including any placebo effect", "To test a second independent variable", "To make the trial cheaper to run"],
    correct: 1,
    explain: "The group given the fake syrup (a placebo) is the control. Any improvement they show is due to time or expectation, so the real effect of the medicine is the difference between the two groups. It is tempting to say 'increase the sample size', but the control group's job is comparison, not size."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 7,
    question: "Across a city, weeks with higher hot-chocolate sales also have more flu cases. What is the best explanation?",
    options: ["Hot chocolate causes flu", "Flu makes people crave hot chocolate", "Cold weather is a confounding variable that increases both", "The data must be wrong because the two are unrelated"],
    correct: 2,
    explain: "Cold winter weather makes people buy warm drinks and is also when flu spreads most, so it drives both variables. B is tempting because it sounds possible, but there is no evidence for that direction, and the confounder explains the pattern much better. The data can be correct and still not show cause and effect."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 8,
    question: "Four groups tested whether a fertiliser increases tomato yield. Which design gives the most reliable evidence?",
    options: ["1 plant with fertiliser, 1 plant without, measured once", "10 plants with fertiliser only, measured weekly", "20 plants with fertiliser and 20 without, same soil, water and light", "20 plants with fertiliser in a greenhouse and 20 without outside"],
    correct: 2,
    explain: "C has a large sample, a control group and controlled variables, so any difference is likely due to the fertiliser. D is tempting because it has the same sample size, but the greenhouse changes temperature and light as well, so the test is not fair. B has no control group to compare with."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 9,
    question: /*#__PURE__*/React.createElement(React.Fragment, null, "Ella tested how much water two brands of paper towel absorb, using sheets of the same size dipped for 10 s. Brand A: 42 mL, 45 mL, 39 mL. Brand B: 31 mL, 30 mL, 32 mL. Calculate the mean for each brand and write a claim, evidence and reasoning conclusion. (3 marks)"),
    model: "Claim: Brand A paper towel absorbs more water than Brand B. Evidence: the mean for Brand A is (42 + 45 + 39) \xF7 3 = 42 mL, and the mean for Brand B is (31 + 30 + 32) \xF7 3 = 31 mL, so Brand A absorbed 11 mL more. Reasoning: the sheets were the same size and dipped for the same time, so the brand was the only variable changed; all three Brand A trials were higher than every Brand B trial, so the difference is consistent and not due to one unusual result."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 10,
    question: "A website states: 'Students who play chess score higher in maths tests, so chess makes you better at maths.' Explain why this conclusion may not be valid, and describe how it could be tested properly. (4 marks)",
    model: "The statement is based on a correlation: chess players score higher in maths, but that does not show chess causes the higher scores. A confounding variable, such as students who already enjoy problem-solving being more likely to join chess club, could explain both. To test cause and effect, take a large group of similar students (e.g. 100), measure their maths scores, then randomly put half in weekly chess lessons and half in another activity for one term. Keep the maths teaching the same for both groups, then retest. If the chess group improves more, the claim is supported."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "8.1.5",
    items: ["I can write a claim, evidence and reasoning conclusion that quotes data with units.", "I can explain how sample size, controls and repeats affect how much we trust a conclusion.", "I can explain why a correlation does not show cause and effect, and name a likely confounding variable.", "I can judge whether a conclusion is supported, partly supported or not supported."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#8.1",
    label: "Learn it in full: Investigating Questions"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.6",
    title: "Writing a scientific argument (extended response)",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }, "Extended responses are worth the most marks of any single question. Learn the structure below and practise it."), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("p", null, "A scientific argument weighs up ", /*#__PURE__*/React.createElement("strong", null, "a range of evidence"), " and decides how well it supports a claim. Use this structure:"), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Position."), " Restate the claim and say whether the evidence supports it, partly supports it or does not support it."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Evidence for."), " Quote specific data with units. Do a calculation (mean, difference, percentage change) to show the size of the effect."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Reasoning."), " Explain the science that links the evidence to the claim (the cause)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Evidence against or limitations."), " Contrary data, small sample, missing controls, few repeats, short time, correlation only, possible bias in who ran the test."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Judgement."), " Weigh it up in one or two sentences, and say what further evidence would make the conclusion stronger.")), /*#__PURE__*/React.createElement("p", null, "Useful formula: ", /*#__PURE__*/React.createElement("strong", null, "percentage change = (new \u2212 original) \xF7 original \xD7 100"), "."), /*#__PURE__*/React.createElement("p", null, "Common mistakes: only using one source, describing the graph without numbers, and never actually saying whether you agree with the claim.")), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "A full extended response: do street trees cool a suburb?",
    problem: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "A local newspaper headline claims: ", /*#__PURE__*/React.createElement("em", null, "\"Street trees cool a suburb by 5 \xB0C on hot days.\"")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Source 1."), " Students measured air temperature at 3 pm on five hot days, 1.5 m above the footpath, on a street with mature trees and on a bare street 2 km away."), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowX: "auto"
      }
    }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Day"), /*#__PURE__*/React.createElement("th", null, "1"), /*#__PURE__*/React.createElement("th", null, "2"), /*#__PURE__*/React.createElement("th", null, "3"), /*#__PURE__*/React.createElement("th", null, "4"), /*#__PURE__*/React.createElement("th", null, "5"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Tree-lined street (\xB0C)"), /*#__PURE__*/React.createElement("td", null, "31.2"), /*#__PURE__*/React.createElement("td", null, "33.0"), /*#__PURE__*/React.createElement("td", null, "29.8"), /*#__PURE__*/React.createElement("td", null, "34.1"), /*#__PURE__*/React.createElement("td", null, "32.4")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Bare street (\xB0C)"), /*#__PURE__*/React.createElement("td", null, "33.6"), /*#__PURE__*/React.createElement("td", null, "35.1"), /*#__PURE__*/React.createElement("td", null, "31.9"), /*#__PURE__*/React.createElement("td", null, "36.8"), /*#__PURE__*/React.createElement("td", null, "34.6"))))), /*#__PURE__*/React.createElement(StreetGraph, null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Source 2."), " A summary of a peer-reviewed study across 20 suburbs reports that streets with heavy tree cover were 1 \xB0C to 3 \xB0C cooler in the afternoon than similar streets without trees."), /*#__PURE__*/React.createElement("p", null, "Evaluate the newspaper's claim using both sources. (6 marks)")),
    steps: ["Calculate the size of the effect. Mean tree-lined = (31.2 + 33.0 + 29.8 + 34.1 + 32.4) ÷ 5 = 160.5 ÷ 5 = 32.1 °C. Mean bare = (33.6 + 35.1 + 31.9 + 36.8 + 34.6) ÷ 5 = 172.0 ÷ 5 = 34.4 °C. Difference = 34.4 − 32.1 = 2.3 °C.", "Check consistency. Daily differences are 2.4, 2.1, 2.1, 2.7 and 2.2 °C, so the tree-lined street was cooler on every day, by a similar amount.", "Compare with the claim. The claim says 5 °C, but Source 1 shows 2.3 °C, less than half. Source 2 (larger, peer reviewed) agrees with a cooling effect of 1 to 3 °C, not 5 °C.", "Reasoning. Tree leaves shade the ground and footpath so they absorb less sunlight, and trees release water vapour from their leaves (transpiration), which cools the air around them.", "Limitations. Source 1 only compared two streets, so other differences (distance from the sea, road colour, traffic, building height) could explain some of the gap. It only used five days and one time of day.", "Judgement. Decide 'partly supported' and suggest what further evidence would help."],
    answer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Model response."), " The evidence partly supports the newspaper's claim: trees do cool the street, but by much less than 5 \xB0C."), /*#__PURE__*/React.createElement("p", null, "In Source 1, the mean temperature of the tree-lined street was 32.1 \xB0C compared with 34.4 \xB0C for the bare street, a difference of 2.3 \xB0C. The tree-lined street was cooler on all five days, by 2.1 to 2.7 \xB0C, so the effect is consistent. Source 2 supports this, because a larger peer-reviewed study of 20 suburbs found tree-covered streets were 1 to 3 \xB0C cooler."), /*#__PURE__*/React.createElement("p", null, "This makes scientific sense: leaves shade the ground so less sunlight is absorbed and re-released as heat, and transpiration releases water vapour that cools the air."), /*#__PURE__*/React.createElement("p", null, "However, neither source shows a 5 \xB0C drop. Source 1's 2.3 \xB0C is less than half of the claimed value and sits within Source 2's 1 to 3 \xB0C range. Source 1 is also limited: it compared only two streets, which may differ in other ways such as distance from the coast or road surface, and it used only five days at one time."), /*#__PURE__*/React.createElement("p", null, "Overall, the evidence supports the claim that trees cool streets, but not the size of the cooling. The headline should say \"about 1 to 3 \xB0C\". Stronger evidence would come from measuring many pairs of similar streets over a whole summer, or measuring the same street before and after trees are planted."))
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "When the evidence does not support the claim",
    problem: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "A sports drink label says: ", /*#__PURE__*/React.createElement("em", null, "\"Boosts endurance by 30%.\""), " In a trial, 12 rowers each rowed on a machine until exhaustion on three different days, drinking either water, the sports drink, or a flavoured placebo that looked and tasted the same but had no active ingredients. Nobody knew which drink they had. Mean times: water 40 min, sports drink 44 min, placebo 43 min."), /*#__PURE__*/React.createElement("p", null, "Use the data to evaluate the claim. (4 marks)")),
    steps: ["Calculate the claimed effect: percentage change from water = (44 − 40) ÷ 40 × 100 = 10%. The claim is 30%, so the drink gave only one-third of the claimed boost.", "Use the placebo: the placebo group improved by (43 − 40) ÷ 40 × 100 = 7.5%. Most of the improvement also happens with a fake drink, so it may come from expectation or flavour, not the ingredients.", "The real effect of the ingredients is the difference from the placebo: 44 − 43 = 1 min, which is very small.", "Limitations: only 12 rowers, so the small difference may be due to chance. Judgement: not supported."],
    answer: "The data do not support the claim. Compared with water, the sports drink increased mean time to exhaustion from 40 to 44 min, which is a 10% increase, not 30%. The placebo drink also increased time to 43 min (7.5%), so most of the improvement happened without the active ingredients, probably due to expectation. The drink's own effect was only 1 min more than the placebo. With only 12 rowers, even this small difference could be due to chance, so a larger blind trial would be needed before any boost could be claimed."
  }), /*#__PURE__*/React.createElement(ExamTip, {
    title: "How extended responses are marked"
  }, "Markers look for: a clear position, accurate data quoted with units, a correct calculation, scientific reasoning, at least one limitation or piece of contrary evidence, and a judgement. A long answer that only describes the graph will not reach the top band. Use \"however\" to switch to the limitations; it shows the marker you have weighed both sides."), /*#__PURE__*/React.createElement(Practice, {
    title: "Scientific arguments"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 11,
    question: "Which sentence is the best use of evidence in a scientific argument?",
    options: ["The graph clearly shows the fertiliser worked really well.", "Plants with fertiliser grew taller.", "Plants with fertiliser had a mean height of 24 cm, compared with 16 cm without, a 50% increase.", "Everyone knows fertiliser helps plants grow."],
    correct: 2,
    explain: "C quotes specific data with units and calculates the size of the effect: (24 \u2212 16) \xF7 16 \xD7 100 = 50%. B is tempting because it is true, but it gives no numbers, so it would not earn the evidence mark. A and D are opinions."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 12,
    question: "A question says 'Evaluate the claim using the data.' What must your answer include that a 'describe' answer does not?",
    options: ["A list of the data values", "A judgement about how well the evidence supports the claim, with strengths and limitations", "A labelled diagram", "A new hypothesis"],
    correct: 1,
    explain: "Evaluate means make a judgement based on criteria, so you weigh up strengths and limitations and then decide. Listing data values (A) is only describing, which is the tempting trap: it earns some marks but never the top band."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "A study claims a new toothpaste reduces tooth sensitivity. Which piece of information is the strongest reason to doubt it?",
    options: ["The study was published in English", "The study used 400 people", "The study was paid for and run only by the toothpaste company, and nobody else has repeated it", "The toothpaste is mint flavoured"],
    correct: 2,
    explain: "If the only people who tested it gain from a positive result and no independent group has repeated it, the results may be biased. 400 people (B) is a strength, not a weakness, which is why it is the wrong choice even though it is about study design."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 14,
    question: "The mean height of a group of seedlings rose from 20 cm to 25 cm. What is the percentage increase?",
    options: ["5%", "20%", "25%", "80%"],
    correct: 2,
    explain: "Percentage change = (25 \u2212 20) \xF7 20 \xD7 100 = 5 \xF7 20 \xD7 100 = 25%. The tempting wrong answer is 20%, which comes from dividing by the new value (5 \xF7 25) instead of the original value."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 15,
    question: "A sunscreen company claims its SPF 50 'blocks all UV for 8 hours'. Lab tests on skin samples showed it blocked 98% of UV when first applied and 61% after 4 hours. Use this evidence to write one paragraph that evaluates the claim. (3 marks)",
    model: "The evidence does not support the claim. When first applied, the sunscreen blocked 98% of UV, not all of it, so even at its best it does not block 'all' UV. After 4 hours it blocked only 61%, a drop of 37 percentage points, so it is losing effectiveness well before 8 hours, probably because the active ingredients break down or rub off. The claim should be changed to say users need to reapply every 2 hours, and further tests should be done on people outdoors, not only on lab samples."
  }), /*#__PURE__*/React.createElement(Stimulus, {
    kind: "Question 16 \xB7 claim and three sources"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "Claim from a gardening blog: ", /*#__PURE__*/React.createElement("em", null, "\"Mixing crushed eggshells into the soil makes tomato plants produce more fruit.\"")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Source 1."), " A school agriculture class grew 40 tomato plants of the same variety in one garden bed. Plants were randomly given soil with crushed eggshells (20 plants) or soil without (20 plants). All had the same water, sunlight and fertiliser. Mean mass of ripe fruit per plant over the season: with eggshells 2.4 kg, without 2.0 kg."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Source 2."), " An online poll of 300 home gardeners found that those who said they add eggshells to their soil also said their tomato harvests were bigger."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Source 3."), " One gardener tried eggshells on two of her plants for one summer and saw no difference.")), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 16,
    question: "Use the claim and the three sources above. Evaluate the claim using all three sources. (6 marks)",
    model: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "The evidence mostly supports the claim that adding crushed eggshells to the soil increases the amount of fruit tomato plants produce."), /*#__PURE__*/React.createElement("p", null, "Source 1 is the strongest evidence. Plants with eggshells produced a mean of 2.4 kg of fruit compared with 2.0 kg without, which is 0.4 kg more, a (2.4 \u2212 2.0) \xF7 2.0 \xD7 100 = 20% increase. The plants were the same variety, randomly assigned and given the same water, sunlight and fertiliser, with 20 plants in each group, so the eggshells were the only variable changed. This means it can show cause and effect."), /*#__PURE__*/React.createElement("p", null, "A scientific reason supports this: eggshells are mostly calcium carbonate, and calcium is a nutrient plants need to build cell walls. A shortage of calcium causes blossom-end rot, which spoils tomato fruit."), /*#__PURE__*/React.createElement("p", null, "Source 2 agrees, but it is only a correlation based on what gardeners said, not measured masses. Gardeners who add eggshells may also take more care of their plants in other ways, such as watering or fertilising more, which could explain the bigger harvests."), /*#__PURE__*/React.createElement("p", null, "Source 3 disagrees, but it used only two plants for one season with no control group, so it is the least reliable and does not outweigh Source 1."), /*#__PURE__*/React.createElement("p", null, "Overall, the claim is supported, mainly by Source 1. It would be stronger if the trial were repeated over several seasons, in different soils, and if the calcium already in the soil were measured, because eggshells may only help where soil calcium is low."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Marking guide (6 marks):"), " clear judgement (1); accurate data from Source 1 with units and a calculation (1); explains why Source 1 is valid and reliable (random assignment, controlled variables, sample size) (1); scientific reasoning (calcium as a plant nutrient) (1); evaluates Source 2 as correlation or self-report (1); evaluates Source 3 as small and uncontrolled, and suggests further evidence (1)."))
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "8.1.6",
    items: ["I can structure an extended response: position, evidence for, reasoning, limitations or evidence against, judgement.", "I can calculate a mean, a difference and a percentage change and use them as evidence.", "I can compare sources and explain which is the most reliable and why.", "I can finish with a judgement and suggest what further evidence would help."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#8.1",
    label: "Learn it in full: Investigating Questions"
  })));
}

/* ================================================================
   SECTION 8.2 — Pseudoscience
   ================================================================ */
var FLAG_ITEMS = [{
  id: "f1",
  label: "Results published in a peer-reviewed journal",
  bucket: "sci"
}, {
  id: "f2",
  label: "“It works if you truly believe in it”",
  bucket: "pseudo"
}, {
  id: "f3",
  label: "Tested against a placebo with hundreds of people",
  bucket: "sci"
}, {
  id: "f4",
  label: "A famous footballer says it changed his life",
  bucket: "pseudo"
}, {
  id: "f5",
  label: "“Unlocks your cells' hidden healing code”",
  bucket: "pseudo"
}, {
  id: "f6",
  label: "Other labs repeated it and got the same result",
  bucket: "sci"
}, {
  id: "f7",
  label: "Studies that found no effect are called a cover-up",
  bucket: "pseudo"
}, {
  id: "f8",
  label: "Makes a prediction that could be shown wrong",
  bucket: "sci"
}];
function Section2(_ref3) {
  var progress = _ref3.progress,
    setProgress = _ref3.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "8.2 Pseudoscience"), /*#__PURE__*/React.createElement("h1", null, "Science or pseudoscience?"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Pseudoscience looks and sounds like science but does not follow the scientific method. Learn the common examples and the warning signs, then practise spotting them in posts, labels and podcasts.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.2.2",
    title: "Examples of pseudoscientific claims",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "Claims or practices presented as scientific that are not based on the scientific method: they are not properly tested, cannot be shown wrong, or ignore evidence against them."
  }, "Pseudoscience"), " uses scientific-sounding language but its claims have failed fair tests or cannot be tested at all. Know these examples and ", /*#__PURE__*/React.createElement("strong", null, "why"), " each counts as pseudoscience:"), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Example"), /*#__PURE__*/React.createElement("th", null, "The claim"), /*#__PURE__*/React.createElement("th", null, "What the evidence shows"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Astrology"), /*#__PURE__*/React.createElement("td", null, "The positions of stars and planets at birth shape personality and future events."), /*#__PURE__*/React.createElement("td", null, "Blind tests show astrologers cannot match people to their charts better than chance. Horoscopes use vague statements that fit almost anyone (the Barnum effect).")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Homeopathy"), /*#__PURE__*/React.createElement("td", null, "A substance diluted again and again becomes a stronger medicine."), /*#__PURE__*/React.createElement("td", null, "Dilutions are so extreme that usually no molecule remains. Large reviews of trials find no effect beyond placebo.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Detox products"), /*#__PURE__*/React.createElement("td", null, "Foot pads, teas or juice cleanses pull \"toxins\" out of the body."), /*#__PURE__*/React.createElement("td", null, "The \"toxins\" are never named or measured. The liver and kidneys already remove wastes. Pads go brown when they get damp with sweat or water.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Iridology"), /*#__PURE__*/React.createElement("td", null, "Patterns and colours in the iris of the eye reveal illness in other organs."), /*#__PURE__*/React.createElement("td", null, "When iridologists were shown eye photos of people with and without kidney disease, they could not pick the ill people better than chance, and they disagreed with each other.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Crystal healing"), /*#__PURE__*/React.createElement("td", null, "Crystals give off healing \"vibrations\"."), /*#__PURE__*/React.createElement("td", null, "The \"vibrations\" are never defined or measured. People report the same effects when handed glass replicas."))))), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "An inactive treatment that looks like the real one. People sometimes feel better after a placebo because they expect to (the placebo effect)."
  }, "placebo"), " effect is real: people often feel better because they expect to. That is why fair trials compare the treatment with a placebo."), /*#__PURE__*/React.createElement("li", null, "Pseudoscience is not the same as an idea that turned out wrong. Scientists test their ideas and change them when evidence goes against them; pseudoscience does not."))), /*#__PURE__*/React.createElement(DilutionFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Why homeopathy cannot work as claimed",
    problem: /*#__PURE__*/React.createElement("p", null, "A homeopathic remedy is labelled \"30C\". Each C step dilutes the mixture 1 part in 100. A spoonful of the starting substance contains roughly 10", /*#__PURE__*/React.createElement("sup", null, "23"), " molecules. Use this to explain why scientists classify homeopathy as pseudoscience. (3 marks)"),
    steps: [/*#__PURE__*/React.createElement(React.Fragment, null, "Work out the total dilution. 1 in 100 = 1 in 10", /*#__PURE__*/React.createElement("sup", null, "2"), ". Thirty steps: (10", /*#__PURE__*/React.createElement("sup", null, "2"), ")", /*#__PURE__*/React.createElement("sup", null, "30"), " = 10", /*#__PURE__*/React.createElement("sup", null, "60"), ". So 30C means 1 part in 10", /*#__PURE__*/React.createElement("sup", null, "60"), "."), /*#__PURE__*/React.createElement(React.Fragment, null, "Compare with the number of molecules. After 12C the dilution is already 10", /*#__PURE__*/React.createElement("sup", null, "24"), ", which is more than the 10", /*#__PURE__*/React.createElement("sup", null, "23"), " molecules we started with, so on average less than one molecule is left. At 30C it is almost certain none remains."), "Link to evidence: if no molecule of the substance remains, there is no known way it could act on the body. Fair, placebo-controlled trials agree: homeopathic remedies do no better than placebo.", "Link to the features of pseudoscience: the claim goes against well-tested chemistry and its supporters keep it despite the trial evidence."],
    answer: /*#__PURE__*/React.createElement(React.Fragment, null, "A 30C remedy is diluted 1 in 10", /*#__PURE__*/React.createElement("sup", null, "60"), ". Since a spoonful only has about 10", /*#__PURE__*/React.createElement("sup", null, "23"), " molecules, there is almost certainly no molecule of the original substance left, so there is no way for it to work. Controlled trials comparing homeopathic remedies with placebos find no difference. Because the idea conflicts with established chemistry and is kept despite contrary evidence, it is pseudoscience.")
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Testing a detox foot pad",
    problem: /*#__PURE__*/React.createElement("p", null, "A seller says their foot pads \"draw toxins out while you wear them\" and point to the pads turning dark brown as proof. Describe a simple controlled test of this claim and explain what result would show it is pseudoscience. (3 marks)"),
    steps: ["Identify what the pad does that you can test: it changes colour. The claim says the colour comes from toxins in the body.", "Design a control: put a few drops of water on an unused pad, and leave another pad in a warm, damp place, with no foot at all. Compare with pads worn on feet for 8 hours.", "Keep variables the same: same brand, same time (8 hours), same temperature. Repeat with several pads.", "Predict and interpret: if the control pads also turn brown, the colour change is caused by moisture reacting with the pad's ingredients, not by toxins."],
    answer: "Wet some unused pads with a few drops of water (or leave them somewhere warm and damp) and compare them with pads worn on feet for 8 hours, using the same brand, time and temperature, with several pads in each group. If the pads with no foot also turn brown, the colour comes from moisture, not toxins. The claim also never names or measures any toxin, so it cannot be checked, which is a sign of pseudoscience."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Pseudoscience examples"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 17,
    question: "Which of these is an example of pseudoscience?",
    options: ["Using DNA evidence to identify a suspect", "Choosing your diet according to your blood type to lose weight", "Measuring blood sugar to diagnose diabetes", "Using a vaccine tested in large controlled trials"],
    correct: 1,
    explain: "When researchers compared people's blood types with how well they did on 'blood-type diets', any benefit came from eating more healthily, and it was the same whatever their blood type, yet the diet is still sold as if blood type matters. The other three have been tested many times and give consistent, measurable results. A vaccine is a tempting wrong answer only if you think 'injection = unnatural'; the deciding feature is the controlled-trial evidence."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 18,
    question: "A horoscope says: 'This week you may feel torn between your heart and your head, but an opportunity is coming.' Why do so many people feel it describes them?",
    options: ["The positions of the planets really affect their week", "It is so vague that it fits almost anyone (the Barnum effect)", "It was written for their exact birth time", "It was peer reviewed before publication"],
    correct: 1,
    explain: "Vague, general statements feel personal because they apply to nearly everyone. This is the Barnum effect. Option A is the astrological claim itself, which blind tests do not support."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 19,
    question: "Why do doctors say detox teas are unnecessary for healthy people?",
    options: ["The teas contain toxins themselves", "The liver and kidneys already break down and remove wastes from the blood", "Toxins can only be removed by surgery", "Tea is not absorbed by the body"],
    correct: 1,
    explain: "The body already has organs that filter wastes: the liver breaks them down and the kidneys remove them in urine. Detox products never name or measure the 'toxins' they remove. Option A may be true for some products, which makes it tempting, but it is not the main reason they are unnecessary."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 20,
    question: "A homeopathic remedy is labelled 6C (each C is a 1 in 100 dilution). What is the total dilution?",
    options: ["1 in 600", "1 in 10⁶", "1 in 10¹²", "1 in 10⁶⁰"],
    correct: 2,
    explain: "Six steps of 1 in 100: 100\u2076 = (10\xB2)\u2076 = 10\xB9\xB2. The tempting wrong answer is 1 in 10\u2076, which treats each step as 1 in 10 instead of 1 in 100."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 21,
    question: "Explain why astrology is classed as a pseudoscience rather than a science. (3 marks)",
    model: "Astrology claims the positions of the stars and planets at birth affect personality and future events, but there is no known mechanism for how this could happen. When it has been tested fairly, for example by asking astrologers to match people's personality profiles to their birth charts without meeting them, they did no better than chance. Horoscopes are written in vague terms that fit almost anyone (the Barnum effect), so they cannot be shown to be wrong, and astrologers have not changed their ideas in response to the failed tests. Science changes when evidence goes against it; astrology does not."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 22,
    question: "A café owner sells a 'memory tea'. To prove it works, she gave a cup to 10 regular customers, told them it would sharpen their memory, then gave them a 30-word recall test. Their mean score was 18 words, and she says this proves the tea works. Identify three problems with her test and describe how to fix each one. (4 marks)",
    model: "1. There is no comparison group, so 18 words means nothing on its own: we do not know what the same people would score without the tea. Fix: also test a group who drink an identical-tasting tea without the 'memory' herbs. 2. The customers were told what the tea should do, so expectation (the placebo effect) could improve their effort and scores. Fix: make it double-blind, with the cups coded by someone else so neither the customers nor the tester knows who had which tea. 3. Only 10 people were tested once, and they were her own customers chosen by the person who profits, so the result could be due to chance or bias. Fix: use a much larger, randomly assigned group (e.g. 60 people), repeat the test, and have someone independent run it and mark the recall tests."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "8.2.2",
    items: ["I can name at least four examples of pseudoscience: astrology, homeopathy, detox products, iridology, crystal healing.", "I can explain what fair tests have shown for each example.", "I can calculate a homeopathic dilution and explain why it means no molecules are left.", "I can design a placebo-controlled test of a pseudoscientific product."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#8.2",
    label: "Learn it in full: Pseudoscience"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.2.5",
    title: "Deciding if a claim is pseudoscientific",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("p", null, "Look for these ", /*#__PURE__*/React.createElement("strong", null, "features of pseudoscience"), ". The more you find, the more likely the claim is pseudoscientific."), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Pseudoscience"), /*#__PURE__*/React.createElement("th", null, "Science"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "Untestable or unfalsifiable"), ": any result can be explained away (\"it didn't work because you didn't believe\")."), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Term, {
    def: "A claim is falsifiable if a test could, in principle, show it to be wrong."
  }, "Falsifiable"), ": makes a clear prediction that a test could prove wrong.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "Anecdotes and testimonials"), ": personal stories, reviews, celebrity endorsements."), /*#__PURE__*/React.createElement("td", null, "Data from large, controlled studies.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "No peer review"), ": results only on the seller's website or social media."), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Term, {
    def: "Checking of a study's methods and conclusions by independent experts before it is published."
  }, "Peer reviewed"), " and repeated by independent scientists.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "Vague or science-sounding jargon"), ": \"structured\", \"vibrational\", \"bio-resonance\", \"toxins\", \"cellular renewal\"."), /*#__PURE__*/React.createElement("td", null, "Precise terms, measured quantities with units.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "No controlled trials"), ": no placebo, no control group, no blinding."), /*#__PURE__*/React.createElement("td", null, "Fair tests with a control group, blinding and many participants.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "Ignores contrary evidence"), ": calls failed tests a conspiracy; never changes."), /*#__PURE__*/React.createElement("td", null, "Changes the idea when the evidence changes."))))), /*#__PURE__*/React.createElement("p", null, "In an answer, always ", /*#__PURE__*/React.createElement("strong", null, "quote the words"), " from the stimulus that show each feature.")), /*#__PURE__*/React.createElement(Interactive, {
    title: "Red flag or good science?",
    subtitle: "Tap a statement, then tap the group it belongs in (or drag it).",
    takeaway: "Good science is testable, controlled, peer reviewed and repeated. Pseudoscience leans on stories, jargon and excuses."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: FLAG_ITEMS,
    buckets: [{
      id: "sci",
      label: "Sign of good science"
    }, {
      id: "pseudo",
      label: "Red flag for pseudoscience"
    }]
  })), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Analysing a social-media post",
    problem: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Stimulus, {
      kind: "Social-media post \xB7 fictional account"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "Obsessed with my new ", /*#__PURE__*/React.createElement("strong", null, "Vortex Hydro bottle"), "! It spins your water into \"structured water\" with a higher vibrational frequency, so your cells absorb it 3\xD7 faster. I've felt SO much sharper this month and my skin is glowing. Scientists won't talk about it because the big drink companies don't want you to know. Link in bio!")), /*#__PURE__*/React.createElement("p", null, "Identify three features that suggest this claim is pseudoscientific. Use evidence from the post. (3 marks)")),
    steps: ["Scan for jargon: 'structured water' and 'higher vibrational frequency' sound scientific but are not defined or measured. Water molecules move constantly; spinning water does not give it a lasting structure.", "Scan for anecdotes: 'I've felt SO much sharper' and 'my skin is glowing' are one person's experience, with no control or measurement.", "Scan for how contrary evidence is handled: 'Scientists won't talk about it because the big drink companies don't want you to know' dismisses the lack of evidence as a cover-up.", "Notice the number with nothing behind it: '3× faster' has no study, no peer review and no data."],
    answer: "1. Science-sounding jargon: 'structured water with a higher vibrational frequency' is vague and not a measurable property of water. 2. Anecdotal evidence: 'I've felt so much sharper' is one person's story, with no control group or measurements, so it could be a placebo effect. 3. Ignores or explains away contrary evidence: the lack of scientific support is blamed on drink companies hiding it, rather than on the claim being tested. (Also accepted: no peer review, since the '3\xD7 faster' figure has no published study.)"
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Is the claim falsifiable? (product label)",
    problem: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Stimulus, {
      kind: "Product label \xB7 fictional product"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "Set it up in your veggie patch. The GardenHum speaker plays natural harmonic tones that awaken your plants' growth rhythms for bigger tomato harvests. Every garden is different. If your crop is no bigger, your soil's harmony is out of balance: keep it humming for another season.")), /*#__PURE__*/React.createElement("p", null, "Explain why this claim is unfalsifiable, and rewrite it as a claim that could be tested. (3 marks)")),
    steps: ["Find the escape clauses: 'every garden is different' and 'if your crop is no bigger, your soil's harmony is out of balance'. Whatever happens, the seller has an excuse.", "Explain what that means: no result could ever show the claim is wrong, so it is unfalsifiable. 'Growth rhythms' and 'soil harmony' are never defined and cannot be measured.", "Rewrite it with a measurable outcome and a comparison group, so it could be shown wrong."],
    answer: "The claim is unfalsifiable because every possible result is explained away: if the harvest is bigger the speaker is credited, and if it isn't, the gardener's 'soil harmony' is blamed. Its key terms ('growth rhythms', 'soil harmony') cannot be measured. A testable version is: 'Tomato plants grown in a greenhouse with a GardenHum speaker playing produce a greater total mass of ripe tomatoes per plant over one season than the same variety grown in a matching greenhouse with no speaker.' This could be tested by randomly assigning 30 seedlings to each greenhouse, keeping water, soil, light and temperature the same, weighing every tomato picked, and repeating the trial the next season, so it could be shown to be wrong."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "For \"Is this claim pseudoscientific? Justify your answer\", aim for ", /*#__PURE__*/React.createElement("strong", null, "feature + quote + why it matters"), " each time. For example: \"It relies on a testimonial ('my headaches vanished'), which is one person's experience with no control group, so the improvement could be a placebo effect.\""), /*#__PURE__*/React.createElement(Practice, {
    title: "Spotting pseudoscience"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 23,
    question: "Which feature, on its own, most strongly suggests a claim is pseudoscientific?",
    options: ["The product is expensive", "The claim cannot be tested in any way that could show it is wrong", "The product is made from plants", "The claim was made by a company"],
    correct: 1,
    explain: "If no test could ever show a claim is wrong, it is outside science altogether. Being made by a company (D) is tempting, because companies can be biased, but many real medicines are developed by companies and tested properly. Price and plant origin say nothing about the evidence."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 24,
    question: /*#__PURE__*/React.createElement(React.Fragment, null, "A wellness podcast host says: ", /*#__PURE__*/React.createElement("em", null, "\"Himalayan salt lamps purify the air in your home. If your hay fever hasn't improved, your lamp just isn't big enough.\""), " Which feature of pseudoscience is shown by the second sentence?"),
    options: ["Peer review", "A large sample size", "An unfalsifiable excuse that explains away a negative result", "A controlled trial"],
    correct: 2,
    explain: "The second sentence means no result can ever count against the claim: if your hay fever is no better, the lamp is blamed for being too small, never the idea itself. 'Purify the air' in the first sentence is a vague claim with nothing measured, which is a feature too, but the question asks about the second sentence."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 25,
    question: "What does it mean when a study has been peer reviewed?",
    options: ["The researchers' friends agreed with the results", "Independent experts checked the methods and conclusions before it was published", "The study has been proven to be true", "Lots of people shared it on social media"],
    correct: 1,
    explain: "Peer review means other qualified scientists, who did not do the study, check that the methods and reasoning are sound before publication. It is tempting to think peer review proves a result true (C), but it only checks quality; the results still need to be repeated by other scientists."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 26,
    question: /*#__PURE__*/React.createElement(React.Fragment, null, "A forum post reads: ", /*#__PURE__*/React.createElement("em", null, "\"My nan has used vinegar foot soaks for 30 years and has never caught a cold. Proof it boosts your immune system!\""), " What is the main weakness of this evidence?"),
    options: ["30 years is too short", "It is a single anecdote with no control group, so other factors could explain it", "Vinegar is an acid", "It was posted online, so it must be false"],
    correct: 1,
    explain: "One person's experience cannot show cause and effect: she may have a strong immune system, avoid sick people, or simply forget minor colds. Option D is tempting but wrong: being online doesn't make something false; the problem is the type of evidence."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 27,
    question: "Explain the difference between a falsifiable claim and an unfalsifiable claim. Give an example of each. (2 marks)",
    model: "A falsifiable claim makes a clear prediction that a test could show to be wrong, for example 'This hand gel kills 99% of E. coli bacteria on a surface within 30 seconds', which can be tested by counting bacteria. An unfalsifiable claim is worded so that no test could ever disprove it, for example 'This crystal protects you from harmful vibrations', because 'harmful vibrations' are never defined or measured and any result can be explained away."
  }), /*#__PURE__*/React.createElement(Stimulus, {
    kind: "Question 28 \xB7 online car forum \xB7 fictional product"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "RoadTrip_Wombat:"), " Anyone tried FuelMax pellets? You drop one in the petrol tank and it \"re-aligns the fuel molecules\" so the engine burns them more completely. Box says it cuts fuel use by 25%."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "UteLife:"), " Put one in my ute last month. Easily getting an extra 100 km out of every tank!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "RoadTrip_Wombat:"), " Their website has a video of a car on a test machine using less fuel. Doesn't say how the test was done though."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Marco_T:"), " A motoring magazine tested six cars with and without the pellets and fuel use was the same, within 1%. Pretty sure the oil companies pay them to say that.")), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 28,
    question: "Use the forum thread above. Evaluate whether the FuelMax claim is pseudoscientific. Refer to at least three features, with evidence from the thread. (5 marks)",
    model: "The FuelMax claim shows several features of pseudoscience, so it is very likely pseudoscientific. First, it uses science-sounding jargon: 're-aligns the fuel molecules' sounds scientific, but it is not defined or measured, and no mechanism is given for how a pellet could change how completely an engine burns petrol. Second, it relies on an anecdote: UteLife's 'extra 100 km out of every tank' is one driver's impression with no measurements or control, and it could be explained by other changes such as more highway driving or new tyres. Third, the only supporting evidence is the seller's own video, which has not been peer reviewed and gives no method, no repeats and no comparison, and the seller benefits from a positive result. Fourth, it ignores contrary evidence: the magazine's controlled test of six cars found no difference, but this is dismissed as being paid for by oil companies instead of being taken seriously. Overall the claim is not supported by reliable evidence and should be treated as pseudoscience unless independent, repeated, controlled tests show a real saving."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "8.2.5",
    items: ["I can list the six features of pseudoscience and the matching features of good science.", "I can quote words from a post, label, podcast or forum to show each feature.", "I can explain why an unfalsifiable claim is outside science, and rewrite it as a testable claim.", "I can write a 'feature + quote + why it matters' paragraph to justify a judgement."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#8.2",
    label: "Learn it in full: Pseudoscience"
  })));
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
    "homeopathy": "A practice based on the idea that extreme dilutions of substances act as medicines. Trials show no effect beyond placebo."
  },
  sections: [{
    id: "8.1",
    label: "Investigating questions and claims",
    accent: "teal",
    blurb: "★★★ Using evidence to support conclusions and writing an extended scientific argument, plus ★★ investigable questions.",
    points: ["8.1.1", "8.1.5", "8.1.6"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section1, p);
    }
  }, {
    id: "8.2",
    label: "Pseudoscience",
    accent: "teal",
    blurb: "★★★ Examples of pseudoscience and how to decide whether a claim is pseudoscientific.",
    points: ["8.2.2", "8.2.5"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section2, p);
    }
  }]
});

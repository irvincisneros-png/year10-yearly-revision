/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
var _React = React,
  useState = _React.useState;

/* a soft tint that stays light in light mode and dark in dark mode, so var(--ink) text stays readable */
var SOFT = "color-mix(in srgb, var(--accent) 26%, var(--card))";
var NB = "https://irvincisneros-png.github.io/Year-10-Science/genetics-evolution/";

/* ============================================================
   SHARED FIGURES
   ============================================================ */

/* Nested sets: genome ⊃ chromosome ⊃ gene ⊃ bases */
function OrganisationFigure() {
  var boxes = [{
    x: 6,
    y: 6,
    w: 348,
    h: 252,
    t: "GENOME",
    d: "all of an organism's DNA (every chromosome)"
  }, {
    x: 22,
    y: 62,
    w: 316,
    h: 188,
    t: "CHROMOSOME",
    d: "a thread of DNA wound around histone proteins"
  }, {
    x: 38,
    y: 118,
    w: 284,
    h: 124,
    t: "GENE",
    d: "a section of DNA that codes for one protein"
  }];
  return /*#__PURE__*/React.createElement(Figure, {
    num: 1,
    caption: "Each level sits inside the one above it. A genome is made of chromosomes, each chromosome is one DNA molecule carrying many genes, and each gene is a sequence of bases.",
    maxWidth: 460
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 264",
    width: "100%",
    role: "img",
    "aria-label": "Nested boxes. The genome box contains a chromosome box, which contains a gene box, which contains a row of base pairs."
  }, boxes.map(function (b, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: b.x,
      y: b.y,
      width: b.w,
      height: b.h,
      rx: "12",
      fill: i === 0 ? "var(--card)" : "var(--bg-2)",
      stroke: i === 2 ? "var(--accent-deep)" : "var(--ink-muted)",
      strokeWidth: "1.8"
    }), /*#__PURE__*/React.createElement("text", {
      x: b.x + 12,
      y: b.y + 21,
      fontSize: "13",
      fontWeight: "800",
      fill: "var(--ink)"
    }, b.t), /*#__PURE__*/React.createElement("text", {
      x: b.x + 12,
      y: b.y + 39,
      fontSize: "11.5",
      fill: "var(--ink-muted)"
    }, b.d));
  }), /*#__PURE__*/React.createElement("rect", {
    x: "54",
    y: "174",
    width: "252",
    height: "60",
    rx: "10",
    fill: SOFT,
    stroke: "var(--accent-deep)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "66",
    y: "192",
    fontSize: "11.5",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "BASES (the code)"), ["A–T", "C–G", "G–C", "T–A", "A–T"].map(function (p, i) {
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      x: 80 + i * 48,
      y: "222",
      fontSize: "14",
      fontWeight: "700",
      fill: "var(--ink)",
      textAnchor: "middle",
      fontFamily: "var(--font-mono)"
    }, p);
  })));
}

/* Straightened section of the DNA ladder */
function LadderFigure() {
  var rungs = [["A", "T"], ["C", "G"], ["G", "C"], ["T", "A"]];
  var ys = [60, 120, 180, 240];
  var pent = function pent(cx, cy) {
    var r = 11,
      pts = [];
    for (var k = 0; k < 5; k++) {
      var a = -Math.PI / 2 + k * 2 * Math.PI / 5;
      pts.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1));
    }
    return pts.join(" ");
  };
  var bonds = function bonds(b) {
    return b === "A" || b === "T" ? 2 : 3;
  };
  return /*#__PURE__*/React.createElement(Figure, {
    num: 2,
    caption: "A short section of DNA 'unwound' so it lies flat. The sides are the sugar\u2013phosphate backbone; the rungs are base pairs joined by weak hydrogen bonds (dashes). A\u2013T pairs have 2 hydrogen bonds and C\u2013G pairs have 3.",
    maxWidth: 460
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 330",
    width: "100%",
    role: "img",
    "aria-label": "DNA ladder. Two backbones of alternating sugar pentagons and phosphate circles. Four rungs: A pairs with T, C with G, G with C, T with A, joined by dashed hydrogen bonds."
  }, /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "20",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "Backbone"), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "20",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "Base pairs"), /*#__PURE__*/React.createElement("text", {
    x: "300",
    y: "20",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "Backbone"), [60, 300].map(function (x) {
    return /*#__PURE__*/React.createElement("line", {
      key: x,
      x1: x,
      y1: "34",
      x2: x,
      y2: "262",
      stroke: "var(--ink-muted)",
      strokeWidth: "3"
    });
  }), [30, 90, 150, 210].map(function (y) {
    return [60, 300].map(function (x) {
      return /*#__PURE__*/React.createElement("circle", {
        key: x + "-" + y,
        cx: x,
        cy: y,
        r: "8",
        fill: "var(--card)",
        stroke: "var(--ink)",
        strokeWidth: "1.6"
      });
    });
  }), rungs.map(function (_ref, i) {
    var _ref2 = _slicedToArray(_ref, 2),
      l = _ref2[0],
      r = _ref2[1];
    var y = ys[i];
    var n = bonds(l);
    var offs = n === 2 ? [-4, 4] : [-7, 0, 7];
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("polygon", {
      points: pent(60, y),
      fill: SOFT,
      stroke: "var(--accent-deep)",
      strokeWidth: "1.6"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: pent(300, y),
      fill: SOFT,
      stroke: "var(--accent-deep)",
      strokeWidth: "1.6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "71",
      y1: y,
      x2: "80",
      y2: y,
      stroke: "var(--ink-muted)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "280",
      y1: y,
      x2: "289",
      y2: y,
      stroke: "var(--ink-muted)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "80",
      y: y - 15,
      width: "90",
      height: "30",
      rx: "6",
      fill: l === "A" || l === "T" ? SOFT : "var(--bg-2)",
      stroke: "var(--ink)",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "190",
      y: y - 15,
      width: "90",
      height: "30",
      rx: "6",
      fill: r === "A" || r === "T" ? SOFT : "var(--bg-2)",
      stroke: "var(--ink)",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("text", {
      x: "125",
      y: y + 5,
      fontSize: "15",
      fontWeight: "800",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, l), /*#__PURE__*/React.createElement("text", {
      x: "235",
      y: y + 5,
      fontSize: "15",
      fontWeight: "800",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, r), offs.map(function (o) {
      return /*#__PURE__*/React.createElement("line", {
        key: o,
        x1: "172",
        y1: y + o,
        x2: "188",
        y2: y + o,
        stroke: "var(--accent-deep)",
        strokeWidth: "1.8",
        strokeDasharray: "3 2"
      });
    }));
  }), /*#__PURE__*/React.createElement("polygon", {
    points: pent(40, 290),
    fill: SOFT,
    stroke: "var(--accent-deep)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "58",
    y: "294",
    fontSize: "12",
    fill: "var(--ink)"
  }, "sugar (deoxyribose)"), /*#__PURE__*/React.createElement("circle", {
    cx: "210",
    cy: "290",
    r: "8",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "225",
    y: "294",
    fontSize: "12",
    fill: "var(--ink)"
  }, "phosphate"), /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "316",
    x2: "48",
    y2: "316",
    stroke: "var(--accent-deep)",
    strokeWidth: "1.8",
    strokeDasharray: "3 2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "58",
    y: "320",
    fontSize: "12",
    fill: "var(--ink)"
  }, "weak hydrogen bond")));
}

/* Punnett square. top/side: arrays of two alleles, e.g. ["Y","y"] */
function PunnettSVG(_ref3) {
  var top = _ref3.top,
    side = _ref3.side,
    label = _ref3.label;
  var cell = 70,
    ox = 52,
    oy = 52;
  var geno = function geno(a, b) {
    return a <= b ? a + b : b + a;
  }; // capital letters sort first, so "Yy" not "yY"
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 250 250",
    width: "100%",
    style: {
      maxWidth: 270,
      display: "block",
      margin: "0 auto"
    },
    role: "img",
    "aria-label": label
  }, top.map(function (g, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: "t" + i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: ox + cell * i + cell / 2,
      cy: "30",
      r: "15",
      fill: "var(--bg-2)",
      stroke: "var(--ink-muted)",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("text", {
      x: ox + cell * i + cell / 2,
      y: "36",
      fontSize: "17",
      fontWeight: "800",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, g));
  }), side.map(function (g, j) {
    return /*#__PURE__*/React.createElement("g", {
      key: "s" + j
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "28",
      cy: oy + cell * j + cell / 2,
      r: "15",
      fill: "var(--bg-2)",
      stroke: "var(--ink-muted)",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("text", {
      x: "28",
      y: oy + cell * j + cell / 2 + 6,
      fontSize: "17",
      fontWeight: "800",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, g));
  }), side.map(function (s, j) {
    return top.map(function (t, i) {
      var gt = geno(t, s);
      var rec = gt === gt.toLowerCase();
      return /*#__PURE__*/React.createElement("g", {
        key: i + "-" + j
      }, /*#__PURE__*/React.createElement("rect", {
        x: ox + cell * i,
        y: oy + cell * j,
        width: cell,
        height: cell,
        fill: rec ? SOFT : "var(--card)",
        stroke: "var(--ink)",
        strokeWidth: "1.6"
      }), /*#__PURE__*/React.createElement("text", {
        x: ox + cell * i + cell / 2,
        y: oy + cell * j + cell / 2 + 7,
        fontSize: "20",
        fontWeight: "800",
        fill: "var(--ink)",
        textAnchor: "middle"
      }, gt));
    });
  }));
}

/* Pedigree chart. people: {id,x,gen,sex:"m"|"f",aff,geno}; couples: [[a,b]]; families: [{parents:[a,b], kids:[...]}] */
function Pedigree(_ref4) {
  var people = _ref4.people,
    couples = _ref4.couples,
    families = _ref4.families,
    showGeno = _ref4.showGeno,
    label = _ref4.label,
    _ref4$width = _ref4.width,
    width = _ref4$width === void 0 ? 360 : _ref4$width;
  var S = 14; // half the symbol size
  var gy = function gy(g) {
    return 40 + (g - 1) * 120;
  };
  var by = Object.fromEntries(people.map(function (p) {
    return [p.id, p];
  }));
  var gens = _toConsumableArray(new Set(people.map(function (p) {
    return p.gen;
  }))).sort();
  var roman = ["I", "II", "III", "IV"];
  var H = gy(gens.length) + (showGeno ? 56 : 42) + 30;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(width, " ").concat(H),
    width: "100%",
    style: {
      maxWidth: 480,
      display: "block",
      margin: "0 auto"
    },
    role: "img",
    "aria-label": label
  }, gens.map(function (g) {
    return /*#__PURE__*/React.createElement("text", {
      key: g,
      x: "4",
      y: gy(g) + 5,
      fontSize: "14",
      fontWeight: "800",
      fill: "var(--ink-muted)"
    }, roman[g - 1]);
  }), couples.map(function (_ref5, i) {
    var _ref6 = _slicedToArray(_ref5, 2),
      a = _ref6[0],
      b = _ref6[1];
    var A = by[a],
      B = by[b];
    return /*#__PURE__*/React.createElement("line", {
      key: "c" + i,
      x1: Math.min(A.x, B.x) + S,
      y1: gy(A.gen),
      x2: Math.max(A.x, B.x) - S,
      y2: gy(A.gen),
      stroke: "var(--ink)",
      strokeWidth: "1.8"
    });
  }), families.map(function (f, i) {
    var A = by[f.parents[0]],
      B = by[f.parents[1]];
    var mid = (A.x + B.x) / 2,
      py = gy(A.gen),
      sy = py + 62;
    var xs = f.kids.map(function (k) {
      return by[k].x;
    });
    var lo = Math.min.apply(Math, [mid].concat(_toConsumableArray(xs))),
      hi = Math.max.apply(Math, [mid].concat(_toConsumableArray(xs)));
    return /*#__PURE__*/React.createElement("g", {
      key: "f" + i,
      stroke: "var(--ink)",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("line", {
      x1: mid,
      y1: py,
      x2: mid,
      y2: sy
    }), hi > lo && /*#__PURE__*/React.createElement("line", {
      x1: lo,
      y1: sy,
      x2: hi,
      y2: sy
    }), f.kids.map(function (k) {
      return /*#__PURE__*/React.createElement("line", {
        key: k,
        x1: by[k].x,
        y1: sy,
        x2: by[k].x,
        y2: gy(by[k].gen) - S
      });
    }));
  }), people.map(function (p) {
    var y = gy(p.gen);
    var fill = p.aff ? "var(--accent-deep)" : "var(--card)";
    var num = p.id.split("-")[1];
    return /*#__PURE__*/React.createElement("g", {
      key: p.id
    }, p.sex === "m" ? /*#__PURE__*/React.createElement("rect", {
      x: p.x - S,
      y: y - S,
      width: 2 * S,
      height: 2 * S,
      fill: fill,
      stroke: "var(--ink)",
      strokeWidth: "2"
    }) : /*#__PURE__*/React.createElement("circle", {
      cx: p.x,
      cy: y,
      r: S,
      fill: fill,
      stroke: "var(--ink)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: p.x,
      y: y + S + 15,
      fontSize: "12",
      fontWeight: "700",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, num), showGeno && p.geno && /*#__PURE__*/React.createElement("text", {
      x: p.x,
      y: y + S + 30,
      fontSize: "12",
      fill: "var(--ink)",
      fontWeight: "700",
      textAnchor: "middle",
      fontFamily: "var(--font-mono)"
    }, p.geno));
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(0 ".concat(H - 22, ")")
  }, /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "-8",
    width: "16",
    height: "16",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "29",
    y: "5",
    fontSize: "11.5",
    fill: "var(--ink)"
  }, "male"), /*#__PURE__*/React.createElement("circle", {
    cx: "76",
    cy: "0",
    r: "8",
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "89",
    y: "5",
    fontSize: "11.5",
    fill: "var(--ink)"
  }, "female"), /*#__PURE__*/React.createElement("rect", {
    x: "140",
    y: "-8",
    width: "16",
    height: "16",
    fill: "var(--accent-deep)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "170",
    cy: "0",
    r: "8",
    fill: "var(--accent-deep)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "184",
    y: "5",
    fontSize: "11.5",
    fill: "var(--ink)"
  }, "affected (shaded)")));
}

/* Recessive pedigree (phenylketonuria, PKU) — used for teaching only, genotypes shown */
var PED_REC = {
  people: [{
    id: "I-1",
    x: 110,
    gen: 1,
    sex: "m",
    geno: "Pp"
  }, {
    id: "I-2",
    x: 200,
    gen: 1,
    sex: "f",
    geno: "Pp"
  }, {
    id: "II-1",
    x: 60,
    gen: 2,
    sex: "m",
    geno: "P_"
  }, {
    id: "II-2",
    x: 160,
    gen: 2,
    sex: "f",
    aff: true,
    geno: "pp"
  }, {
    id: "II-3",
    x: 250,
    gen: 2,
    sex: "m",
    geno: "P_"
  }, {
    id: "III-1",
    x: 165,
    gen: 3,
    sex: "m",
    geno: "Pp"
  }, {
    id: "III-2",
    x: 245,
    gen: 3,
    sex: "f",
    geno: "Pp"
  }],
  couples: [["I-1", "I-2"], ["II-2", "II-3"]],
  families: [{
    parents: ["I-1", "I-2"],
    kids: ["II-1", "II-2"]
  }, {
    parents: ["II-2", "II-3"],
    kids: ["III-1", "III-2"]
  }]
};

/* Dominant pedigree (brachydactyly, short fingers) — used in the worked example and practice */
var PED_DOM = {
  people: [{
    id: "I-1",
    x: 110,
    gen: 1,
    sex: "m",
    aff: true
  }, {
    id: "I-2",
    x: 200,
    gen: 1,
    sex: "f"
  }, {
    id: "II-1",
    x: 80,
    gen: 2,
    sex: "m"
  }, {
    id: "II-2",
    x: 170,
    gen: 2,
    sex: "f",
    aff: true
  }, {
    id: "II-3",
    x: 270,
    gen: 2,
    sex: "m",
    aff: true
  }, {
    id: "III-1",
    x: 140,
    gen: 3,
    sex: "m",
    aff: true
  }, {
    id: "III-2",
    x: 220,
    gen: 3,
    sex: "f"
  }, {
    id: "III-3",
    x: 300,
    gen: 3,
    sex: "f",
    aff: true
  }],
  couples: [["I-1", "I-2"], ["II-2", "II-3"]],
  families: [{
    parents: ["I-1", "I-2"],
    kids: ["II-1", "II-2"]
  }, {
    parents: ["II-2", "II-3"],
    kids: ["III-1", "III-2", "III-3"]
  }]
};
function PedigreeDomFigure() {
  return /*#__PURE__*/React.createElement(Figure, {
    num: 5,
    caption: "A family showing brachydactyly (short fingers). Use this pedigree for the worked example and questions below. II-3 married into the family.",
    maxWidth: 480
  }, /*#__PURE__*/React.createElement(Pedigree, _extends({}, PED_DOM, {
    label: "Pedigree for brachydactyly over three generations. Generation I: male 1 affected, female 2 unaffected. Generation II: male 1 unaffected, female 2 affected, married to male 3 affected. Generation III: male 1 affected, female 2 unaffected, female 3 affected."
  })));
}

/* Gel electrophoresis, parentage of a Tasmanian devil joey */
function GelFigure() {
  var lanes = [{
    name: "Mother",
    x: 95,
    bands: [90, 140, 200]
  }, {
    name: "Joey",
    x: 165,
    bands: [90, 120, 170, 200]
  }, {
    name: "Male 1",
    x: 235,
    bands: [105, 150, 180, 220]
  }, {
    name: "Male 2",
    x: 305,
    bands: [120, 135, 170, 230]
  }];
  return /*#__PURE__*/React.createElement(Figure, {
    num: 6,
    caption: "DNA profiles from a captive Tasmanian devil family. Each band is a DNA fragment. Every band in the joey's profile must come from either its mother or its father.",
    maxWidth: 460
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 270",
    width: "100%",
    role: "img",
    "aria-label": "Gel with four lanes: Mother, Joey, Male 1 and Male 2. Wells at the negative end at the top, DNA moves down towards the positive end. The joey's bands each match a band from the mother or from Male 2."
  }, /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "40",
    width: "290",
    height: "215",
    rx: "8",
    fill: "var(--bg-2)",
    stroke: "var(--ink-muted)",
    strokeWidth: "1.6"
  }), lanes.map(function (l) {
    return /*#__PURE__*/React.createElement("g", {
      key: l.name
    }, /*#__PURE__*/React.createElement("text", {
      x: l.x,
      y: "28",
      fontSize: "12",
      fontWeight: "700",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, l.name), /*#__PURE__*/React.createElement("rect", {
      x: l.x - 20,
      y: "46",
      width: "40",
      height: "8",
      rx: "2",
      fill: "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "1.3"
    }), l.bands.map(function (b) {
      return /*#__PURE__*/React.createElement("rect", {
        key: b,
        x: l.x - 20,
        y: b,
        width: "40",
        height: "6",
        rx: "2",
        fill: "var(--accent-deep)"
      });
    }));
  }), /*#__PURE__*/React.createElement("text", {
    x: "30",
    y: "56",
    fontSize: "18",
    fontWeight: "800",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "\u2013"), /*#__PURE__*/React.createElement("text", {
    x: "30",
    y: "252",
    fontSize: "16",
    fontWeight: "800",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "+"), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "70",
    x2: "40",
    y2: "226",
    stroke: "var(--ink-muted)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "34,224 46,224 40,236",
    fill: "var(--ink-muted)"
  }), /*#__PURE__*/React.createElement("text", {
    transform: "translate(24 148) rotate(-90)",
    fontSize: "10.5",
    fill: "var(--ink-muted)",
    textAnchor: "middle"
  }, "smaller pieces move further")));
}

/* Allopatric speciation in four panels */
function SpeciationFigure() {
  var panel = function panel(x, y, title, children) {
    return /*#__PURE__*/React.createElement("g", {
      transform: "translate(".concat(x, " ").concat(y, ")")
    }, /*#__PURE__*/React.createElement("rect", {
      x: "0",
      y: "0",
      width: "172",
      height: "118",
      rx: "10",
      fill: "var(--card)",
      stroke: "var(--ink-muted)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "10",
      y: "19",
      fontSize: "11.5",
      fontWeight: "800",
      fill: "var(--ink)"
    }, title), children);
  };
  var dots = function dots(pts, fill) {
    return pts.map(function (_ref7, i) {
      var _ref8 = _slicedToArray(_ref7, 2),
        a = _ref8[0],
        b = _ref8[1];
      return /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: a,
        cy: b,
        r: "5",
        fill: fill,
        stroke: "var(--ink)",
        strokeWidth: "1"
      });
    });
  };
  var mixed = [[40, 60], [62, 80], [106, 52], [106, 85], [128, 62], [50, 95], [118, 98], [140, 80]];
  var land = /*#__PURE__*/React.createElement("ellipse", {
    cx: "86",
    cy: "76",
    rx: "76",
    ry: "34",
    fill: "var(--bg-2)",
    stroke: "var(--ink-muted)",
    strokeWidth: "1.2"
  });
  var barrier = /*#__PURE__*/React.createElement("path", {
    d: "M86 40 C 78 55, 96 68, 84 82 C 74 96, 94 104, 86 112",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "6",
    strokeLinecap: "round"
  });
  return /*#__PURE__*/React.createElement(Figure, {
    num: 7,
    caption: "How a geographic barrier can lead to new species. Once the two groups can no longer interbreed to produce fertile offspring, they are separate species.",
    maxWidth: 460
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 256",
    width: "100%",
    role: "img",
    "aria-label": "Four panels. 1: one mixed population. 2: a barrier splits it into two groups. 3: each group changes in its own environment, shown by different colours. 4: two species that cannot interbreed even if the barrier is removed."
  }, panel(6, 6, "1  One population", /*#__PURE__*/React.createElement(React.Fragment, null, land, dots(mixed, "var(--ink-muted)"))), panel(182, 6, "2  A barrier splits it", /*#__PURE__*/React.createElement(React.Fragment, null, land, barrier, dots(mixed, "var(--ink-muted)"))), panel(6, 132, "3  Groups change separately", /*#__PURE__*/React.createElement(React.Fragment, null, land, barrier, dots(mixed.filter(function (p) {
    return p[0] < 84;
  }), "var(--accent-deep)"), dots(mixed.filter(function (p) {
    return p[0] >= 84;
  }), "var(--card)"))), panel(182, 132, "4  Two species", /*#__PURE__*/React.createElement(React.Fragment, null, land, dots(mixed.filter(function (p) {
    return p[0] < 84;
  }), "var(--accent-deep)"), dots(mixed.filter(function (p) {
    return p[0] >= 84;
  }), "var(--card)")))));
}

/* ============================================================
   INTERACTIVE: Punnett square builder
   ============================================================ */
function PunnettBuilder() {
  var _useState = useState("Aa"),
    _useState2 = _slicedToArray(_useState, 2),
    p1 = _useState2[0],
    setP1 = _useState2[1];
  var _useState3 = useState("Aa"),
    _useState4 = _slicedToArray(_useState3, 2),
    p2 = _useState4[0],
    setP2 = _useState4[1];
  var opts = ["AA", "Aa", "aa"];
  var kids = [];
  var _iterator = _createForOfIteratorHelper(p1),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var a = _step.value;
      var _iterator2 = _createForOfIteratorHelper(p2),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var b = _step2.value;
          kids.push(a <= b ? a + b : b + a);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var n = function n(g) {
    return kids.filter(function (k) {
      return k === g;
    }).length;
  };
  var dom = n("AA") + n("Aa");
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Punnett square builder",
    subtitle: "Pick a genotype for each parent. A (dominant) and a (recessive). Shaded boxes show the recessive phenotype.",
    takeaway: "Each box is one equally likely outcome, so each box is a 1 in 4 (25%) chance. Two heterozygous parents give the classic 3 : 1 phenotype ratio."
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      minWidth: 72
    }
  }, "Parent 1"), /*#__PURE__*/React.createElement(SegToggle, {
    options: opts,
    value: p1,
    onChange: setP1
  })), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      minWidth: 72
    }
  }, "Parent 2"), /*#__PURE__*/React.createElement(SegToggle, {
    options: opts,
    value: p2,
    onChange: setP2
  })), /*#__PURE__*/React.createElement(PunnettSVG, {
    top: p1.split(""),
    side: p2.split(""),
    label: "Punnett square for ".concat(p1, " crossed with ").concat(p2)
  }), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout",
    style: {
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "".concat(n("AA"), " : ").concat(n("Aa"), " : ").concat(n("aa")),
    label: "genotype ratio"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "".concat(dom * 25, "%"),
    label: "dominant phenotype"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "".concat((4 - dom) * 25, "%"),
    label: "recessive phenotype"
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      textAlign: "center",
      margin: "4px 0 0",
      fontSize: "0.88rem"
    }
  }, "Genotype ratio is in the order AA : Aa : aa."));
}

/* ============================================================
   SECTION 5.1
   ============================================================ */
function Section1(_ref9) {
  var progress = _ref9.progress,
    setProgress = _ref9.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "5.1 DNA structure and function"), /*#__PURE__*/React.createElement("h1", null, "DNA, genes and chromosomes"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Know the levels of genetic information and how the shape of DNA lets it store and copy the code.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.1.2",
    title: "DNA, genes, chromosomes and genomes",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Deoxyribonucleic acid: a double-stranded molecule that carries the genetic code as a sequence of bases."
  }, "DNA"), " is the molecule that carries genetic information as a sequence of four bases: A, T, C and G."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A section of DNA that codes for one protein, which affects a characteristic."
  }, "gene"), " is a section of DNA that codes for one protein. Different versions of the same gene are called ", /*#__PURE__*/React.createElement(Term, {
    def: "Different forms of the same gene, e.g. the allele for red eyes and the allele for white eyes in fruit flies."
  }, "alleles"), "."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A thread-like package of DNA wound around histone proteins. It carries hundreds to thousands of genes."
  }, "chromosome"), " is a thread-like package of DNA wound around histone proteins, so a very long strand fits inside the nucleus. One chromosome carries hundreds to thousands of genes."), /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The complete set of DNA (all the chromosomes and genes) of an organism."
  }, "genome"), " is the complete set of DNA in an organism. The human genome is about 3 billion base pairs and about 20 000 genes."), /*#__PURE__*/React.createElement("li", null, "Human body cells have 46 chromosomes in 23 pairs (one of each pair from each parent). Sex cells (eggs and sperm) have 23, one from each pair."), /*#__PURE__*/React.createElement("li", null, "Common mistake: a gene is ", /*#__PURE__*/React.createElement("em", null, "part of"), " a chromosome, not the same thing. Smallest to largest: base \u2192 gene \u2192 chromosome \u2192 genome."))), /*#__PURE__*/React.createElement(OrganisationFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Linking the three terms",
    problem: "Describe the relationship between DNA, genes and chromosomes. (3 marks)",
    steps: ["One mark for each correct link. Start with the smallest idea that the others are built from: DNA is a long molecule whose sequence of bases (A, T, C, G) carries the genetic code.", "Next, place the gene: a gene is a particular section of a DNA molecule that codes for one protein.", "Finally, the chromosome: a chromosome is a thread-like package of DNA wound around histone proteins, and its DNA holds many genes one after another."],
    answer: "DNA is a molecule that stores genetic information in its sequence of bases. A gene is a short section of a DNA molecule that codes for a particular protein. A chromosome is a thread-like package of DNA wound around histone proteins, and because its DNA is so long, one chromosome contains many genes."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "DNA, genes and chromosomes"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "Which statement best describes a gene?",
    options: ["A thread-like package of DNA and histone proteins that becomes visible when a cell divides", "A section of DNA that codes for a particular protein", "The complete set of DNA in an organism", "A single base, such as adenine"],
    correct: 1,
    explain: "A gene is a section of DNA that codes for one protein. The first option is tempting, but it describes a chromosome, which contains many genes. The complete set of DNA is the genome."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 2,
    question: "A dog's body cells each contain 78 chromosomes. How many chromosomes are in one of its sperm cells?",
    options: ["78", "156", "39", "23"],
    correct: 2,
    explain: "Sex cells carry one chromosome from each pair, so they have half the body-cell number: 78 \xF7 2 = 39. 23 is the number in human sex cells, not dog sex cells."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 3,
    question: "Distinguish between a chromosome and a genome. (2 marks)",
    model: "A chromosome is a thread-like package of DNA wound around histone proteins, and it carries many genes. A genome is the complete set of DNA of an organism, which includes all of its chromosomes. So a genome is made up of many chromosomes."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "A student writes: 'A chromosome is just one gene.' Explain why this is incorrect. (2 marks)",
    model: "A gene is only a short section of DNA that codes for one protein. A chromosome is a whole DNA molecule that contains hundreds to thousands of genes, so a chromosome is much larger and carries many genes, not one."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.1.2",
    items: ["I can define DNA, gene, allele, chromosome and genome in one sentence each.", "I can put base, gene, chromosome and genome in order of size.", "I can state the number of chromosomes in human body cells and sex cells, and explain why they differ.", "I can explain why one chromosome carries many genes."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.1",
    label: "Learn it in full: 5.1 DNA Structure and Function"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.1.3",
    title: "How the shape of the DNA double helix suits its job",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "DNA is made of ", /*#__PURE__*/React.createElement(Term, {
    def: "The building block of DNA: one sugar (deoxyribose), one phosphate and one base."
  }, "nucleotides"), ". Each nucleotide = a sugar (deoxyribose) + a phosphate + a base."), /*#__PURE__*/React.createElement("li", null, "Two strands twist into a ", /*#__PURE__*/React.createElement(Term, {
    def: "The shape of DNA: two strands twisted around each other like a spiral ladder."
  }, "double helix"), " (a twisted ladder). The sides are the ", /*#__PURE__*/React.createElement("strong", null, "sugar\u2013phosphate backbone"), "; the rungs are pairs of bases."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The rule that A always pairs with T, and C always pairs with G."
  }, "Complementary base pairing"), ": A pairs with T, and C pairs with G. Pairs are held together by weak ", /*#__PURE__*/React.createElement("strong", null, "hydrogen bonds"), "."), /*#__PURE__*/React.createElement("li", null, "Structure \u2192 function: the ", /*#__PURE__*/React.createElement("strong", null, "order of bases"), " stores the code; the strong backbone keeps the code stable; the weak hydrogen bonds let the strands \u201Cunzip\u201D to be copied."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Replication"), ": the strands separate, and each acts as a template. Free nucleotides pair up (A\u2013T, C\u2013G), making two identical DNA molecules, each with one old and one new strand."), /*#__PURE__*/React.createElement("li", null, "Because of pairing, %A = %T and %C = %G in any DNA sample (Chargaff's rule)."), /*#__PURE__*/React.createElement("li", null, "Common mistakes: pairing A with G, or writing U. U (uracil) is only in RNA, never in DNA."))), /*#__PURE__*/React.createElement(LadderFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Using base pairing to calculate percentages",
    problem: "A DNA sample taken from a wheat plant contains 22% guanine (G). Calculate the percentage of each of the other three bases. (2 marks)",
    steps: ["G pairs with C, so %C = %G = 22%.", "Together G and C make 22% + 22% = 44%, so A and T make up 100% − 44% = 56%.", "A pairs with T, so they are equal: 56% ÷ 2 = 28% each.", "Check: 22 + 22 + 28 + 28 = 100%."],
    answer: "Cytosine 22%, adenine 28%, thymine 28%."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "For ", /*#__PURE__*/React.createElement("strong", null, "calculate"), " questions, show each step (pairing rule \u2192 subtraction \u2192 halve) even when you can do it in your head. A correct method can still earn a mark if you slip on the final number."), /*#__PURE__*/React.createElement(Practice, {
    title: "The double helix"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "A student was given the DNA strand T G A C C T A G G and wrote its partner strand as A C T G C A T C C. Counting from the left, at which position did the student make a mistake?",
    options: ["Position 2", "Position 5", "Position 8", "There is no mistake"],
    correct: 1,
    explain: "Pairing each base in turn (T\u2192A, G\u2192C, A\u2192T, C\u2192G, C\u2192G, T\u2192A, A\u2192T, G\u2192C, G\u2192C) gives A C T G G A T C C. The fifth base on the given strand is C, so its partner must be G, but the student wrote C. Position 2 is tempting because G and C are both there, but G pairs with C, so that one is correct."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "Which part of a DNA molecule stores the genetic information?",
    options: ["The sugar–phosphate backbone", "The order (sequence) of the bases", "The hydrogen bonds between the strands", "The number of twists in the helix"],
    correct: 1,
    explain: "The code is the order of the bases, in the same way a message is the order of the letters. The backbone is important for strength and stability, but it is the same repeating sugar\u2013phosphate pattern in every gene, so it carries no information."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 7,
    question: "A sample of bacterial DNA contains 35% thymine. Calculate the percentage of cytosine. Show your working. (2 marks)",
    model: "T pairs with A, so A = 35%. A + T = 35 + 35 = 70%. C + G = 100 \u2212 70 = 30%. C pairs with G so they are equal: 30 \xF7 2 = 15%. Cytosine = 15%."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 8,
    question: "Describe why both the weak hydrogen bonds and complementary base pairing are important when DNA is copied (replicated). (3 marks)",
    model: "The hydrogen bonds between bases are weak, so the two strands can separate (unzip) easily without breaking the strong backbone. Each separated strand then acts as a template. Because of complementary base pairing, only A can join opposite T and only C opposite G, so the new strands are exact copies and the two new DNA molecules are identical to the original."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.1.3",
    items: ["I can name the three parts of a nucleotide.", "I can label the sugar–phosphate backbone, base pairs and hydrogen bonds on a DNA diagram.", "I can write the complementary strand for any DNA sequence.", "I can calculate base percentages using A = T and C = G.", "I can explain how DNA's structure allows it to be copied exactly."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.1",
    label: "Learn it in full: 5.1 DNA Structure and Function"
  })));
}

/* ============================================================
   SECTION 5.2
   ============================================================ */
function Section2(_ref0) {
  var progress = _ref0.progress,
    setProgress = _ref0.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "5.2 Variation and inheritance"), /*#__PURE__*/React.createElement("h1", null, "Mutations, alleles and predicting offspring"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "The highest-value part of the topic. Practise Punnett squares and pedigrees until they feel automatic.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.2.3",
    title: "Mutations cause variation (helpful, harmful or no effect)",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A change in the sequence of bases in DNA."
  }, "mutation"), " is a change in the base sequence of DNA. Mutations happen randomly when DNA is copied, or are caused by ", /*#__PURE__*/React.createElement(Term, {
    def: "Something that increases the rate of mutations, such as UV light, X-rays or some chemicals."
  }, "mutagens"), " such as UV light, X-rays and chemicals in cigarette smoke."), /*#__PURE__*/React.createElement("li", null, "Gene mutations: ", /*#__PURE__*/React.createElement("strong", null, "substitution"), " (one base swapped), ", /*#__PURE__*/React.createElement("strong", null, "insertion"), " (base added), ", /*#__PURE__*/React.createElement("strong", null, "deletion"), " (base removed). Chromosome mutations change whole chromosomes or large sections, e.g. Down syndrome (an extra chromosome 21)."), /*#__PURE__*/React.createElement("li", null, "Every allele that exists today first appeared as a mutation. Sexual reproduction reshuffles alleles into new combinations, but only mutation makes brand-new ones, adding to genetic ", /*#__PURE__*/React.createElement(Term, {
    def: "Differences between individuals of the same species."
  }, "variation"), "."), /*#__PURE__*/React.createElement("li", null, "Effects: ", /*#__PURE__*/React.createElement("strong", null, "harmful"), " (protein no longer works, e.g. cystic fibrosis, sickle cell anaemia); ", /*#__PURE__*/React.createElement("strong", null, "beneficial"), " (e.g. lactase persistence lets adults digest milk); ", /*#__PURE__*/React.createElement("strong", null, "minimal / neutral"), " (in DNA that doesn't code for protein, or the protein still works the same)."), /*#__PURE__*/React.createElement("li", null, "Only mutations in sex cells (gametes) are passed on to offspring. A mutation in a body cell, such as a skin cell damaged by UV, is not inherited."))), /*#__PURE__*/React.createElement(Practice, {
    title: "Mutations"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 9,
    question: "A section of DNA reads TAC GGA TTC. After a mutation it reads TAC GGT TTC. Which type of mutation has occurred?",
    options: ["Deletion", "Insertion", "Substitution", "Chromosome mutation"],
    correct: 2,
    explain: "The sequence is still nine bases long, but the sixth base has changed from A to T, so one base has been swapped: a substitution. It is not a deletion or insertion, because no bases were removed or added."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 10,
    question: "Using an example for each, describe how a mutation can be harmful, beneficial or have minimal effect on an organism. (3 marks)",
    model: "Harmful: a mutation in the CFTR gene produces a protein that does not work, causing cystic fibrosis, where thick mucus builds up in the lungs. Beneficial: a mutation that keeps the lactase gene switched on in adults lets them digest milk, an extra food source. Minimal: a mutation in a section of DNA that does not code for a protein has no effect on the organism's traits."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.2.3",
    items: ["I can define mutation and name two mutagens.", "I can identify substitution, insertion and deletion from two DNA sequences.", "I can give an example of a harmful, a beneficial and a neutral mutation.", "I can explain why only mutations in sex cells are inherited."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.2",
    label: "Learn it in full: 5.2 Variation and Inheritance"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.2.4",
    title: "Genotype, phenotype and Mendel's patterns of inheritance",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Each body cell has ", /*#__PURE__*/React.createElement("strong", null, "two alleles"), " for each gene, one from each parent."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The combination of alleles an organism has, e.g. Rr."
  }, "Genotype"), " = the alleles (e.g. Rr). ", /*#__PURE__*/React.createElement(Term, {
    def: "The observable characteristic, e.g. round seeds. Produced by genotype and environment together."
  }, "Phenotype"), " = the characteristic you can observe (e.g. round seeds). Phenotype depends on genotype ", /*#__PURE__*/React.createElement("em", null, "and"), " the environment."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("strong", null, "dominant"), " allele (capital letter, R) shows in the phenotype whenever it is present. A ", /*#__PURE__*/React.createElement("strong", null, "recessive"), " allele (lower case, r) only shows when there are two copies (rr)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Having two identical alleles, e.g. RR or rr."
  }, "Homozygous"), " = two identical alleles (RR or rr). ", /*#__PURE__*/React.createElement(Term, {
    def: "Having two different alleles, e.g. Rr."
  }, "Heterozygous"), " = two different alleles (Rr). A heterozygous person for a recessive condition is a ", /*#__PURE__*/React.createElement("strong", null, "carrier"), "."), /*#__PURE__*/React.createElement("li", null, "Mendel's pea plants: pure-breeding round \xD7 pure-breeding wrinkled \u2192 all offspring round. Crossing those offspring together \u2192 about 3 round : 1 wrinkled. The two alleles separate when gametes form, so each gamete carries just one."), /*#__PURE__*/React.createElement("li", null, "Same patterns in animals, e.g. in cattle, hornless (polled, P) is dominant to horned (p)."), /*#__PURE__*/React.createElement("li", null, "Common mistakes: use one letter for both alleles (R and r, not R and W). \u201CDominant\u201D does not mean \u201Cmost common\u201D or \u201Cbetter\u201D.")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      minWidth: 320
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Genotype"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phenotype (pea seeds)"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "RR"), /*#__PURE__*/React.createElement("td", null, "homozygous dominant"), /*#__PURE__*/React.createElement("td", null, "round")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Rr"), /*#__PURE__*/React.createElement("td", null, "heterozygous"), /*#__PURE__*/React.createElement("td", null, "round")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "rr"), /*#__PURE__*/React.createElement("td", null, "homozygous recessive"), /*#__PURE__*/React.createElement("td", null, "wrinkled")))))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Explaining a cross between pure-breeding plants",
    problem: "In pea plants, the allele for tall stems (T) is dominant to the allele for short stems (t). A pure-breeding tall plant is crossed with a pure-breeding short plant. All the offspring are tall. Explain this result. (3 marks)",
    steps: ["Translate 'pure-breeding': it means homozygous. So the tall parent is TT and the short parent is tt.", "Gametes: the TT parent can only make T gametes; the tt parent can only make t gametes.", "Every offspring therefore receives one T and one t, so every offspring is Tt (heterozygous).", "Link genotype to phenotype: T is dominant, so it masks t and every Tt plant is tall."],
    answer: "The parents are TT and tt. Each offspring gets a T allele from the tall parent and a t allele from the short parent, so they are all Tt. Because T is dominant, it masks the recessive t allele, so all offspring are tall."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "The test cross",
    problem: "In cattle, hornless (P) is dominant to horned (p). A farmer has a hornless bull and wants to know whether it is PP or Pp. Describe a cross she could do and explain how the results would tell her the bull's genotype. (4 marks)",
    steps: ["Choose a partner whose genotype is certain: a horned cow must be pp, because horned is recessive.", "If the bull is PP: PP × pp → every calf is Pp, so all calves are hornless.", "If the bull is Pp: Pp × pp → half Pp (hornless) and half pp (horned), so about 1 in 2 calves are horned.", "Conclusion: even one horned calf proves the bull is Pp. If many calves are all hornless, the bull is very likely PP."],
    answer: "Cross the bull with several horned (pp) cows. If any calf is horned (pp), it must have received a p allele from the bull, so the bull is Pp (expected 1 hornless : 1 horned). If all of a large number of calves are hornless, the bull is almost certainly PP."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Genotype and phenotype"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 11,
    question: "In tomato plants, the allele for a purple stem (A) is dominant to the allele for a green stem (a). Which plant has a green stem?",
    options: ["AA", "Aa", "Both Aa and aa", "aa"],
    correct: 3,
    explain: "A recessive phenotype only appears with two recessive alleles, so only aa is green. Aa is tempting, but the dominant A allele masks a, so Aa plants are purple."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 12,
    question: "Which term describes an organism with the genotype Hh?",
    options: ["Heterozygous", "Homozygous dominant", "Homozygous recessive", "Pure-breeding"],
    correct: 0,
    explain: "Hh has two different alleles, so it is heterozygous. Pure-breeding means homozygous (HH or hh), so it does not describe Hh."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "Two pea plants can have the same phenotype but different genotypes. Which pair shows this? (R = round seeds, r = wrinkled seeds)",
    options: ["Rr and rr, which both have round seeds", "RR and Rr, which both have round seeds", "RR and rr, which both have wrinkled seeds", "rr and rr, which both have round seeds"],
    correct: 1,
    explain: "RR and Rr both contain the dominant R allele, so both are round, but their genotypes differ. Rr and rr is wrong because rr plants have wrinkled seeds."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 14,
    question: "Which statement about a dominant allele is correct?",
    options: ["It is always the most common allele in a population", "It always gives a survival advantage", "It shows in the phenotype even when only one copy is present", "It is only found in homozygous organisms"],
    correct: 2,
    explain: "Dominant means one copy is enough to show in the phenotype. It does not mean common: many dominant alleles, such as the one causing Huntington's disease, are rare."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 15,
    question: "Define genotype and phenotype, and explain why two organisms with exactly the same genotype can have different phenotypes. (3 marks)",
    model: "Genotype is the combination of alleles an organism has for a gene (e.g. Tt). Phenotype is the characteristic that can be observed (e.g. tall). The phenotype is produced by the genotype and the environment together, so if two genetically identical plants are grown in different conditions, such as one in full sun and one in deep shade, they can grow to different heights even though their genotypes are the same."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 16,
    question: "In fruit flies, normal wings (W) are dominant to short, crumpled 'vestigial' wings (w). A fly with normal wings is crossed with a fly with vestigial wings. Half the offspring have normal wings and half have vestigial wings. Deduce the genotype of the normal-winged parent and explain your reasoning. (3 marks)",
    model: "The vestigial-winged parent must be ww, so it can only pass on w. Some offspring are vestigial (ww), so they must also have received a w from the normal-winged parent. The normal-winged parent therefore has one W and one w: it is Ww. Check: Ww \xD7 ww gives 2 Ww (normal) : 2 ww (vestigial), which is the 1 : 1 ratio observed."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.2.4",
    items: ["I can define allele, genotype, phenotype, dominant, recessive, homozygous and heterozygous.", "I can write the genotype of a pure-breeding (homozygous) organism from its phenotype.", "I can explain Mendel's 3 : 1 result using alleles and gametes.", "I can describe how a test cross reveals an unknown genotype.", "I can explain why the same genotype can give different phenotypes."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.2",
    label: "Learn it in full: 5.2 Variation and Inheritance"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.2.5",
    title: "Using Punnett squares and pedigrees to predict inheritance",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Punnett square method:"), " (1) write a key; (2) write the parents' genotypes; (3) split each parent's two alleles into gametes along the edges; (4) fill each box with one allele from the top and one from the side; (5) write the genotype and phenotype ratios."), /*#__PURE__*/React.createElement("li", null, "Each of the 4 boxes is an equal chance: 1 box = 1/4 = 25%. Ratios are ", /*#__PURE__*/React.createElement("em", null, "expected"), " results; real numbers vary because each fertilisation is random."), /*#__PURE__*/React.createElement("li", null, "Key results: Aa \xD7 Aa \u2192 1 AA : 2 Aa : 1 aa (3 dominant : 1 recessive). Aa \xD7 aa \u2192 1 : 1. AA \xD7 anything \u2192 all show the dominant phenotype."), /*#__PURE__*/React.createElement("li", null, "Chance resets for every child. If the first child of two carriers is affected, the next child still has a 1/4 chance."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "A family tree that shows how a trait is inherited across generations."
  }, "Pedigree"), " symbols: square = male, circle = female, shaded = affected; a horizontal line joins parents and a vertical line leads down to their children. Generations are Roman numerals (I, II, III); individuals are numbered left to right."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Recessive"), " clue: two unaffected parents have an affected child, so both parents must be carriers (Aa). ", /*#__PURE__*/React.createElement("strong", null, "Dominant"), " clue: two affected parents have an unaffected child, so both parents must be heterozygous."), /*#__PURE__*/React.createElement("li", null, "To deduce genotypes, start with the people you are sure of (aa for affected in a recessive trait; dd for unaffected in a dominant trait), then work up to parents and down to children."))), /*#__PURE__*/React.createElement(Figure, {
    num: 3,
    caption: "Two pea plants heterozygous for seed colour, Yy \xD7 Yy (Y = yellow, dominant; y = green). Result: 1 YY : 2 Yy : 1 yy, so 3 yellow : 1 green. The shaded box is the only green outcome.",
    maxWidth: 320
  }, /*#__PURE__*/React.createElement(PunnettSVG, {
    top: ["Y", "y"],
    side: ["Y", "y"],
    label: "Punnett square for Yy crossed with Yy. Boxes: YY, Yy, Yy, yy. The yy box is shaded."
  })), /*#__PURE__*/React.createElement(Figure, {
    num: 4,
    caption: "A recessive trait (phenylketonuria, PKU; p = PKU allele, P = normal allele). Genotypes worked out are shown under each person; P_ means PP or Pp (cannot be certain). The clue that it is recessive: unaffected I-1 and I-2 have an affected daughter, II-2. Every child of an affected (pp) parent receives a p, so III-1 and III-2 must be carriers. II-3 married into the family.",
    maxWidth: 480
  }, /*#__PURE__*/React.createElement(Pedigree, _extends({}, PED_REC, {
    showGeno: true,
    label: "Pedigree for phenylketonuria over three generations with genotypes. Generation I: male 1 Pp and female 2 Pp. Generation II: their children are male 1, P_, and affected female 2, pp; female 2 is partnered with male 3, P_, who married into the family. Generation III: their children are male 1, Pp, and female 2, Pp, both unaffected."
  }))), /*#__PURE__*/React.createElement(PunnettBuilder, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "A full Punnett square answer",
    problem: "Two pea plants that are heterozygous for seed colour (Yy) are crossed. Yellow (Y) is dominant to green (y). (a) State the expected genotype ratio. (b) What is the probability that a seed is green? (c) What percentage of the seeds are expected to be homozygous? (4 marks)",
    steps: ["Key: Y = yellow (dominant), y = green (recessive). Parents: Yy × Yy.", "Gametes: each parent makes Y and y gametes. Put Y, y along the top and Y, y down the side.", "Fill the boxes: YY, Yy, Yy, yy (see Figure 3).", "(a) Count genotypes: 1 YY : 2 Yy : 1 yy.", "(b) Only yy is green: 1 box out of 4 = 1/4 = 25%.", "(c) Homozygous means two identical alleles: YY and yy = 2 boxes out of 4 = 50%."],
    answer: "(a) 1 YY : 2 Yy : 1 yy. (b) 1/4 (25%). (c) 50% are homozygous (YY or yy)."
  }), /*#__PURE__*/React.createElement(PedigreeDomFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Reading a dominant pedigree",
    problem: "Use Figure 5. (a) Is brachydactyly caused by a dominant or a recessive allele? Justify your answer. (b) Using D and d, give the genotypes of II-2 and II-3. (4 marks)",
    steps: ["Look for the 'tell-tale' family: II-2 and II-3 are both affected, but their daughter III-2 is unaffected.", "Test the 'recessive' idea: if the trait were recessive, both affected parents would have two recessive alleles, so they could only pass on the recessive allele and every child would be affected. III-2 is unaffected, so the trait cannot be recessive. It is dominant.", "Key: D = brachydactyly (dominant), d = normal fingers. Unaffected III-2 must be dd.", "III-2 received one d from each parent, so II-2 and II-3 each carry a d. They are affected, so each also has a D."],
    answer: "(a) Dominant: two affected parents (II-2 and II-3) have an unaffected child (III-2), so both parents must carry a hidden normal allele. A recessive trait could not do this. (b) II-2 is Dd and II-3 is Dd."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "In pedigree questions, marks come from ", /*#__PURE__*/React.createElement("strong", null, "naming the evidence"), ". Don't just say \u201Cit is recessive\u201D: quote the individuals, e.g. \u201CI-1 and I-2 are unaffected but their daughter II-2 is affected\u201D. For probabilities, show the Punnett square and give the answer as a fraction or percentage."), /*#__PURE__*/React.createElement(Practice, {
    title: "Punnett squares and pedigrees"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 17,
    question: "In Figure 5, what is the genotype of III-2?",
    options: ["DD", "Dd", "dd", "It cannot be determined"],
    correct: 2,
    explain: "Brachydactyly is dominant, so anyone without it cannot carry D: III-2 must be dd. 'Cannot be determined' is tempting, but that only applies to affected people (who could be DD or Dd), not unaffected ones."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 18,
    question: "In Figure 5, what is the probability that the next child of II-2 and II-3 will have brachydactyly?",
    options: ["25%", "50%", "75%", "100%"],
    correct: 2,
    explain: "Dd \xD7 Dd gives DD, Dd, Dd, dd. Three of the four boxes contain D, so 3/4 = 75%. 25% is the chance of an unaffected (dd) child, not an affected one."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 19,
    question: "In pea plants, green pods (G) are dominant to yellow pods (g). A Gg plant is crossed with a gg plant. What fraction of the offspring are expected to have yellow pods?",
    options: ["1/4", "1/2", "3/4", "None of them"],
    correct: 1,
    explain: "Gg \xD7 gg gives Gg, Gg, gg, gg. Two of the four boxes are gg (yellow), so 2/4 = 1/2. 1/4 is the result for a Gg \xD7 Gg cross, not this one."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 20,
    question: "Cystic fibrosis is caused by a recessive allele (f). Two parents who do not have cystic fibrosis have a child who does. (a) State the genotypes of both parents. (b) Use a Punnett square to find the probability that their next child will be a carrier. (4 marks)",
    model: "(a) The child has cystic fibrosis, so it is ff and received one f from each parent. Neither parent is affected, so each also has an F. Both parents are Ff. (b) Ff \xD7 Ff: gametes F and f from each parent. Boxes: FF, Ff, Ff, ff. Carriers are heterozygous (Ff): 2 boxes out of 4 = 1/2, so there is a 50% chance the next child is a carrier."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 21,
    question: "Two students model a cross between two tomato plants that are heterozygous for fruit colour (Rr; red R is dominant to yellow r). Each student tosses two coins at once: heads = R, tails = r, and two tails = a yellow-fruited plant. Mia does 12 double tosses and gets 6 yellow. Kai does 400 double tosses and gets 97 yellow. (a) Calculate how many yellow results Kai should expect. (b) Explain why Kai's result is much closer to the expected ratio than Mia's. (3 marks)",
    model: "(a) Rr \xD7 Rr gives RR, Rr, Rr, rr, so the chance of rr (two tails) is 1/4. Expected yellow = 1/4 \xD7 400 = 100, and Kai got 97, very close. (b) Each toss, like each fertilisation, is random, so a small sample can easily drift far from 1/4 by chance: Mia's 6 out of 12 is 1/2. With many more trials the random ups and downs cancel out, so Kai's large sample gives a proportion (97/400 \u2248 0.24) very close to the expected 1/4."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 22,
    question: "Using Figure 5, explain why the genotype of III-1 cannot be determined with certainty. (2 marks)",
    model: "III-1 is affected, so he has at least one dominant D allele. His parents are both Dd, so he could have received D from both (DD) or D from one and d from the other (Dd). Both genotypes give the same phenotype, so the pedigree cannot tell them apart."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.2.5",
    items: ["I can draw a Punnett square and state genotype and phenotype ratios.", "I can turn a Punnett square into a probability or an expected number of offspring.", "I can read pedigree symbols and number individuals correctly.", "I can decide whether a trait is dominant or recessive by quoting evidence from a pedigree.", "I can deduce genotypes of individuals in a pedigree and say when a genotype is uncertain."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.2",
    label: "Learn it in full: 5.2 Variation and Inheritance"
  })));
}

/* ============================================================
   SECTION 5.3
   ============================================================ */
function Section3(_ref1) {
  var progress = _ref1.progress,
    setProgress = _ref1.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "5.3 Genetic technologies"), /*#__PURE__*/React.createElement("h1", null, "Reading, copying and changing DNA"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Know what each technology does, then be ready to weigh up its benefits and risks.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.3.1",
    title: "Current and emerging genetic technologies",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Term, {
    def: "Polymerase chain reaction: a technique that makes millions of copies of a small piece of DNA."
  }, "PCR")), " copies a tiny DNA sample millions of times using repeated heating and cooling (about 95 \xB0C to separate strands, about 55 \xB0C for primers to attach, about 72 \xB0C for an enzyme to build new strands). Used in virus tests and forensics."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Gel electrophoresis / DNA profiling"), ": DNA is cut into fragments by enzymes and placed in wells in a gel. An electric current pulls the negatively charged DNA towards the positive end; smaller fragments move further. The band pattern is a DNA profile, unique to each person (except identical twins)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Recombinant DNA / genetic modification (GM)"), ": a gene is cut from one organism and inserted into another, often using a bacterial ", /*#__PURE__*/React.createElement(Term, {
    def: "A small circle of DNA in bacteria, used to carry a new gene into a cell."
  }, "plasmid"), ". Example: bacteria with the human insulin gene make human insulin."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Term, {
    def: "A gene-editing tool: a guide RNA leads the Cas9 enzyme to an exact DNA sequence, where it cuts so genes can be removed, repaired or added."
  }, "CRISPR-Cas9")), ": a guide molecule leads the Cas9 enzyme to an exact DNA sequence, which it cuts, so scientists can delete, repair or insert genes."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Term, {
    def: "Treating a genetic disorder by delivering a working copy of a gene into a patient's cells."
  }, "Gene therapy")), ": a working copy of a gene is delivered into a patient's cells, often carried by a harmless virus, to treat a genetic disorder."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Term, {
    def: "Producing genetically identical copies of an organism, cell or gene."
  }, "Cloning")), ": making genetically identical copies, e.g. Dolly the sheep (1996, made by putting a body-cell nucleus into an empty egg cell) or growing plants from cuttings."))), /*#__PURE__*/React.createElement(GelFigure, null), /*#__PURE__*/React.createElement(ExamTip, null, "With a DNA profile, go band by band: every band in the offspring must match a band in the mother ", /*#__PURE__*/React.createElement("em", null, "or"), " the father. A possible father who is missing even one of the non-mother bands can be ruled out."), /*#__PURE__*/React.createElement(Practice, {
    title: "Genetic technologies"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 23,
    question: "Use Figure 6. Which male is most likely to be the joey's father?",
    options: ["Male 1", "Male 2", "Both males are equally likely", "Neither male could be the father"],
    correct: 1,
    explain: "Two of the joey's bands match its mother. The other two bands match bands in Male 2's profile. Male 1 has neither of these bands, so he can be ruled out."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 24,
    question: "Police find a single hair at a crime scene. Which technology would scientists use first to make enough DNA to analyse?",
    options: ["Gel electrophoresis", "CRISPR-Cas9", "PCR", "Cloning"],
    correct: 2,
    explain: "PCR copies a tiny DNA sample millions of times, so there is enough to test. Gel electrophoresis is tempting, but it separates DNA fragments; it can only be done once there is enough DNA."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.3.1",
    items: ["I can describe what PCR, gel electrophoresis, recombinant DNA, CRISPR, gene therapy and cloning each do.", "I can explain why smaller DNA fragments travel further in a gel.", "I can use a DNA profile to identify a parent or match a sample."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.3",
    label: "Learn it in full: 5.3 Genetic Technologies"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.3.2",
    title: "Uses of genetic technology in conservation, farming, industry and medicine: benefits and risks",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      minWidth: 560
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Area"), /*#__PURE__*/React.createElement("th", null, "Example"), /*#__PURE__*/React.createElement("th", null, "Benefits"), /*#__PURE__*/React.createElement("th", null, "Risks / concerns"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "Conservation")), /*#__PURE__*/React.createElement("td", null, "DNA profiling in captive breeding (e.g. Tasmanian devils); environmental DNA (eDNA) from water samples"), /*#__PURE__*/React.createElement("td", null, "Pair unrelated animals to keep genetic diversity; detect rare species without catching them"), /*#__PURE__*/React.createElement("td", null, "Expensive; doesn't fix habitat loss; possible contamination of samples")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "Agriculture")), /*#__PURE__*/React.createElement("td", null, "Herbicide-tolerant GM canola; golden rice with extra vitamin A precursor"), /*#__PURE__*/React.createElement("td", null, "Higher yields, easier weed control, better nutrition"), /*#__PURE__*/React.createElement("td", null, "Genes may spread to weeds or wild relatives; weeds can evolve resistance; seed costs and ownership (patents)")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "Industry")), /*#__PURE__*/React.createElement("td", null, "GM microbes making enzymes for laundry detergents, rennet for cheese, biofuels"), /*#__PURE__*/React.createElement("td", null, "Cheaper, purer products in large amounts; fewer animal products needed"), /*#__PURE__*/React.createElement("td", null, "GM microbes escaping; a few companies controlling the technology")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "Medicine")), /*#__PURE__*/React.createElement("td", null, "Human insulin from GM bacteria; gene therapy; CRISPR treatment for sickle cell disease; PCR diagnosis"), /*#__PURE__*/React.createElement("td", null, "Treats or even cures disease; reliable supply of medicines"), /*#__PURE__*/React.createElement("td", null, "Unknown long-term effects; unintended (off-target) edits; very high cost; privacy of genetic data"))))), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Discuss"), " = give points for ", /*#__PURE__*/React.createElement("em", null, "and"), " against (benefits and risks). ", /*#__PURE__*/React.createElement("strong", null, "Evaluate"), " = weigh them up and finish with a clear judgement."), /*#__PURE__*/React.createElement("li", null, "Strong answers name a specific example and explain ", /*#__PURE__*/React.createElement("em", null, "why"), " each point is a benefit or a risk, rather than just listing words like \u201Ccheaper\u201D or \u201Cdangerous\u201D."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Discussing a medical application",
    problem: "Discuss the use of genetically modified bacteria to produce human insulin for people with diabetes. (4 marks)",
    steps: ["'Discuss' needs both sides, so plan two benefits and two risks or limits, each with a reason.", "Benefit 1: the bacteria carry the human insulin gene, so the insulin is identical to human insulin and causes fewer allergic reactions than insulin taken from pigs or cattle.", "Benefit 2: bacteria reproduce very quickly, so large amounts can be made reliably, without relying on animals from slaughterhouses.", "Risk / limit: the GM bacteria must be contained so they don't escape, and the factories and purification are expensive, which may make insulin costly in poorer countries.", "Optional link to finish: overall the benefits are large because millions of people rely on insulin every day."],
    answer: "Inserting the human insulin gene into bacteria means the insulin made is identical to human insulin, so it causes fewer allergic reactions than animal insulin. Bacteria multiply rapidly, so large, reliable supplies can be produced without using animals. However, the GM bacteria must be kept contained to avoid release into the environment, and production is costly, which may limit access in poorer countries. Overall, the benefits to the millions of people with diabetes are very large."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Discussing an agricultural application",
    problem: "Canola has been genetically modified to tolerate a herbicide (weed killer), so farmers can spray the whole field and kill only the weeds. Discuss one benefit and two risks of growing herbicide-tolerant canola. (3 marks)",
    steps: ["Benefit, with a reason: weeds compete with the crop for light, water and nutrients; killing them without harming the canola increases yield.", "Risk 1, with a reason: pollen can carry the herbicide-tolerance gene to related wild plants, creating weeds that are hard to kill.", "Risk 2, with a reason: spraying one herbicide over and over is a strong selection pressure, so resistant weeds can evolve and the herbicide stops working."],
    answer: "Benefit: farmers can kill competing weeds without harming the crop, so the canola gets more light, water and nutrients and yields increase. Risk: pollen may transfer the tolerance gene to related wild plants, creating 'superweeds'. Risk: heavy use of the same herbicide selects for resistant weeds, so over time the herbicide becomes less effective."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "Read the verb. ", /*#__PURE__*/React.createElement("strong", null, "Discuss"), ": both sides, no judgement needed. ", /*#__PURE__*/React.createElement("strong", null, "Evaluate"), " or ", /*#__PURE__*/React.createElement("strong", null, "assess"), ": both sides, then a final sentence that clearly states your judgement and the main reason for it."), /*#__PURE__*/React.createElement(Practice, {
    title: "Applications, benefits and risks"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 25,
    question: "Which of these is an application of genetic technology in industry?",
    options: ["DNA testing of seized shark fins to identify protected species", "PCR used to diagnose a viral infection", "GM microbes producing enzymes used in laundry detergents", "Golden rice modified to contain a vitamin A precursor"],
    correct: 2,
    explain: "Using GM microbes to manufacture a product, such as detergent enzymes, is an industrial use. Shark-fin testing is conservation, PCR diagnosis is medicine and golden rice is agriculture."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 26,
    question: "Which is a risk scientists often raise about herbicide-tolerant GM crops?",
    options: ["The herbicide-tolerance gene could spread to related wild plants through pollen", "People who eat the crop become resistant to herbicides", "The crop can no longer make seeds", "The crop can no longer photosynthesise"],
    correct: 0,
    explain: "Pollen can carry the gene to related plants, possibly creating weeds that are hard to control. Eating the crop does not transfer genes into people's cells, so the second option is a common misconception."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 27,
    question: "Why is insulin made by GM bacteria usually preferred to insulin extracted from pigs or cattle?",
    options: ["It permanently cures type 1 diabetes", "It is identical to human insulin and can be made in large amounts", "It does not need to be injected", "It changes the patient's genes so they make their own insulin"],
    correct: 1,
    explain: "The bacteria use the human gene, so the insulin is the same as human insulin, and bacteria can produce it in large quantities. It is a treatment, not a cure, so patients still need regular doses."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 28,
    question: "Gene therapy has been used to restore some sight to people with an inherited form of blindness. Discuss one benefit and two risks of gene therapy. (3 marks)",
    model: "Benefit: delivering a working copy of the faulty gene can treat the cause of the disorder, not just the symptoms, so one treatment may last for years. Risk: the virus used to carry the gene could trigger an immune reaction, and some types of virus can insert the gene in the wrong place in the DNA, causing new problems. Risk: the treatment is new, so long-term effects are unknown, and it is extremely expensive, so not everyone who needs it can access it."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 29,
    question: "The platypus is hard to see because it is active at night and lives in murky water. Explain how a genetic technology could help scientists find out where platypuses live, and identify one limitation of this method. (3 marks)",
    model: "Platypuses shed skin cells and other material into the water, leaving traces of their DNA (environmental DNA, eDNA). Scientists can collect water samples from creeks and use PCR to copy and detect platypus DNA, showing which creeks platypuses live in without having to see or catch them. Limitation: DNA can be carried downstream or last for a while in the water, so a positive result does not prove a platypus is living at that exact spot right now, and it does not tell how many there are."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 30,
    question: "Golden rice has been genetically modified to produce a precursor of vitamin A. Evaluate the use of golden rice to reduce vitamin A deficiency in communities where rice is the main food. (5 marks)",
    model: "Benefits: vitamin A deficiency causes blindness and weakens the immune system, especially in children. Because rice is already the main food, golden rice could deliver vitamin A without people changing their diet, and farmers can save and replant the seed. Risks and limitations: some people distrust GM food, so it may not be accepted; the modified genes could spread to other rice varieties by pollen; and it does not fix the underlying problem of poor diet variety, so other foods and supplements are still needed. Judgement: overall, golden rice is a worthwhile tool because it targets a serious health problem cheaply through a food people already eat, as long as it is used alongside other measures and its spread to other crops is monitored."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.3.2",
    items: ["I can give one example of genetic technology in each of conservation, agriculture, industry and medicine.", "I can explain at least one benefit and one risk for each example.", "I can tell the difference between a 'discuss' and an 'evaluate' answer.", "I can write an evaluation that ends with a justified judgement."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.3",
    label: "Learn it in full: 5.3 Genetic Technologies"
  })));
}

/* ============================================================
   SECTION 5.4
   ============================================================ */
function Section4(_ref10) {
  var progress = _ref10.progress,
    setProgress = _ref10.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "5.4 Evolution"), /*#__PURE__*/React.createElement("h1", null, "Natural selection and new species"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Learn the steps of natural selection in order, then practise applying them to examples you have never seen.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.4.1",
    title: "Natural selection and isolation lead to evolution and new species",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The process where individuals with inherited traits better suited to their environment survive and reproduce more, so those traits become more common over generations."
  }, "Natural selection"), " in five steps:", /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: "4px 0 0",
      paddingLeft: "1.3em"
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Variation"), ": individuals in a population differ, because of mutations and sexual reproduction."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Selection pressure"), ": something in the environment (predators, disease, climate, limited food, a chemical such as an antibiotic) means not all individuals survive. More offspring are produced than can survive, so there is competition."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Survival and reproduction"), ": individuals with a helpful variation are more likely to survive and reproduce."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Inheritance"), ": they pass the allele for the helpful trait to their offspring."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Change over generations"), ": the helpful allele becomes more common in the population."))), /*#__PURE__*/React.createElement("li", null, "Populations evolve, not individuals. Organisms do not \u201Ctry\u201D or \u201Cneed\u201D to adapt: mutations happen randomly, then the environment selects."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A group of organisms that can interbreed to produce fertile offspring."
  }, "species"), " is a group that can interbreed to produce fertile offspring."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The formation of a new species."
  }, "Speciation"), " by isolation: (1) a barrier (sea, river, mountain range, rising land) splits a population; (2) no gene flow between the groups; (3) different selection pressures and different random mutations change each group; (4) after many generations they can no longer interbreed to produce fertile offspring."))), /*#__PURE__*/React.createElement(SpeciationFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Antibiotic-resistant bacteria",
    problem: "A patient takes an antibiotic for a bacterial infection but stops after two days because they feel better. Later the infection returns and the antibiotic no longer works. Explain, using natural selection, how the bacteria became resistant. (4 marks)",
    steps: ["Variation: in the large bacterial population, a few bacteria by chance carry a mutation that makes them resistant to the antibiotic.", "Selection pressure: the antibiotic kills the non-resistant bacteria. Stopping early means the resistant ones are not all killed.", "Survival and reproduction: the resistant bacteria survive and divide rapidly with less competition.", "Inheritance and change: they pass the resistance allele to their offspring, so the population becomes mostly resistant and the antibiotic no longer works."],
    answer: "Within the bacterial population there was variation: a few bacteria had a random mutation giving resistance. The antibiotic acted as a selection pressure, killing the non-resistant bacteria, and stopping the course early left the resistant survivors. These survived and reproduced, passing the resistance allele to their offspring. Over many generations, resistant bacteria became most of the population, so the antibiotic no longer worked."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Speciation across a land bridge",
    problem: "About 3 million years ago, the Isthmus of Panama rose out of the sea, joining North and South America and separating the Caribbean Sea from the Pacific Ocean. Pairs of very similar snapping shrimp species now live on either side. When shrimp from opposite sides are put together, they rarely mate. Explain how one original population could have become two species. (4 marks)",
    steps: ["Name the isolating barrier: the land bridge split one shrimp population into a Caribbean group and a Pacific group.", "No gene flow: the two groups could no longer interbreed, so alleles were not shared between them.", "Different changes: the two seas have different conditions (e.g. temperature, food, predators), so different selection pressures acted, and different random mutations arose in each group.", "Outcome: over millions of years the groups changed so much that they no longer mate to produce fertile offspring, so they are now separate species."],
    answer: "The rising Isthmus of Panama geographically isolated the shrimp into two groups with no interbreeding (no gene flow). Each group faced different selection pressures in its own sea and gained different random mutations, so natural selection changed the groups in different ways. After many generations, they became so different that they no longer interbreed to produce fertile offspring, so they are now two separate species."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "For ", /*#__PURE__*/React.createElement("strong", null, "explain"), " questions on natural selection, use the five steps in order and name each one (variation \u2192 selection pressure \u2192 survival and reproduction \u2192 inheritance \u2192 change over generations). Marks are usually given for each step tied to the example. Avoid \u201Cthey needed to\u201D, \u201Cthey got used to it\u201D or \u201Cthey adapted during their life\u201D."), /*#__PURE__*/React.createElement(Practice, {
    title: "Natural selection and speciation"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 31,
    question: "On a small island in the Gal\xE1pagos, a severe drought killed most of the plants that make small, soft seeds, leaving mainly large, hard seeds. In the next generation of medium ground finches, the average beak was deeper and stronger than before the drought. Which is the best explanation?",
    options: ["Finches strengthened their beaks by cracking hard seeds, then passed the stronger beaks on to their chicks", "The drought caused mutations for deeper beaks", "Finches with deeper beaks chose to stay on the island while the others flew away", "Finches that already had deeper beaks could crack the large, hard seeds, so more of them survived and bred, passing on the alleles for deep beaks"],
    correct: 3,
    explain: "Beak depth already varied and is inherited. The food shortage was the selection pressure: birds with deeper beaks could eat the hard seeds, so more of them survived to breed, and the alleles for deep beaks became more common in the next generation. The first option is tempting, but a beak strengthened by use during a bird's life does not change its alleles, so it is not inherited."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 32,
    question: "Cane toads were released in Queensland in 1935 and have spread across northern Australia. Toads at the front of the invasion have longer legs than toads in older populations. What is the most likely explanation?",
    options: ["Toads that hopped further grew longer legs and passed them on", "Toads with longer legs move faster, so they reach new areas first and breed with each other there", "All the toads mutated at the same time because of the hot climate", "Long legs were not inherited, so they appeared by chance each generation"],
    correct: 1,
    explain: "Leg length varies and is inherited. The fastest, longest-legged toads arrive first at the front, breed with each other, and pass long legs on, so leg length increases there. The first option is wrong because characteristics gained by use during a lifetime are not inherited."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 33,
    question: "Which observation is the best evidence that two populations have become separate species?",
    options: ["They look different from each other", "They live in different places", "They can no longer interbreed to produce fertile offspring", "They eat different foods"],
    correct: 2,
    explain: "A species is defined as a group that can interbreed to produce fertile offspring, so losing this ability is the key test. Looking different is tempting, but many members of the same species look very different, such as dog breeds."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 34,
    question: "In 1950 the myxoma virus was released in Australia to control rabbits. At first it killed more than 99% of infected rabbits. Within about ten years, a much smaller proportion of infected rabbits died. Explain this change using natural selection. (4 marks)",
    model: "Variation: in the huge rabbit population, a small number of rabbits had genetic variations that made them more resistant to the virus. Selection pressure: the virus killed almost all non-resistant rabbits. Survival and reproduction: the resistant rabbits survived and bred. Inheritance: they passed their resistance alleles to their offspring. Over many generations, resistant rabbits became more common in the population, so a smaller proportion of infected rabbits died. (The virus also evolved: less deadly strains spread further, because rabbits infected with them lived longer.)"
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 35,
    question: "A farmer sprays the same insecticide on a crop every year. After several years, the spray kills far fewer insects. A student says, 'The insects got used to the spray.' Explain why this statement is incorrect and give the correct explanation. (3 marks)",
    model: "The statement is incorrect because individual insects cannot become used to a poison or change their genes during their lives. Instead, a few insects already had a random mutation that made them resistant. The spray killed the non-resistant insects, so the resistant ones survived, reproduced and passed on the resistance allele. Over many generations, most of the insect population became resistant."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 36,
    question: "A population of lizards lives on a large island. Rising sea levels split the island into two smaller islands: one wet and forested, the other dry and rocky. Describe how two separate species of lizard could form over a long time. (4 marks)",
    model: "The sea acts as a geographic barrier, isolating the lizards into two groups so they cannot interbreed (no gene flow). The two islands have different environments, so different selection pressures act: for example, lizards suited to climbing trees may survive better in the forest, while lizards suited to hot, dry rocks survive better on the other island. Different random mutations also arise in each group. Over many generations, natural selection makes the two groups more and more different, until they could no longer interbreed to produce fertile offspring even if they met. They are then two separate species."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.4.1",
    items: ["I can list the five steps of natural selection in order.", "I can apply the five steps to a new example, such as resistance in bacteria or insects.", "I can explain why 'they got used to it' or 'they needed to' is wrong.", "I can define a species.", "I can describe how geographic isolation can lead to a new species."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.4",
    label: "Learn it in full: 5.4 The Theory of Evolution and Evidence of Natural Selection"
  })));
}

/* ============================================================
   SECTION 5.5
   ============================================================ */
function Section5(_ref11) {
  var progress = _ref11.progress,
    setProgress = _ref11.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "5.5 Genetics in context"), /*#__PURE__*/React.createElement("h1", null, "Arguing about genetic technology"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Science tells us what we ", /*#__PURE__*/React.createElement("em", null, "can"), " do; ethics asks what we ", /*#__PURE__*/React.createElement("em", null, "should"), " do. Learn three frameworks and how to build an argument with them.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "5.5.1",
    title: "Using ethical frameworks to argue about a genetic technology",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Consequences (utilitarian)"), ": the right choice gives the greatest benefit and least harm for the greatest number of people. Weigh up the outcomes."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Duty / rights-based"), ": some actions are right or wrong no matter the outcome. Respect people's rights, such as ", /*#__PURE__*/React.createElement(Term, {
    def: "Agreeing to take part, or to have your cells or data used, after being told clearly what will happen and the risks."
  }, "informed consent"), ", privacy and the right to choose; follow duties such as \u201Cdo no harm\u201D and telling the truth."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Virtue ethics"), ": what would a person of good character (honest, fair, caring, responsible) do?"), /*#__PURE__*/React.createElement("li", null, "An evidence-based argument: state your position \u2192 give scientific evidence \u2192 apply a framework by name \u2192 consider the other side \u2192 finish with a conclusion."), /*#__PURE__*/React.createElement("li", null, "The syllabus case study is the ", /*#__PURE__*/React.createElement("strong", null, "HeLa cell line"), ". Read about it in the notebook; the frameworks above are the tools for discussing it."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Two frameworks, one technology",
    problem: "Scientists have designed 'gene drive' mosquitoes that spread a gene through wild populations that makes female mosquitoes infertile, which could greatly reduce the mosquitoes that spread malaria. The World Health Organization estimates that malaria kills about 600 000 people each year, mostly young children in Africa. Use two ethical frameworks to argue whether gene-drive mosquitoes should be released. (5 marks)",
    steps: ["State your position first, so the marker knows where the argument is going: e.g. 'Gene-drive mosquitoes should be released, but only after careful trials and community agreement.'", "Apply framework 1 by name, with evidence: consequences (utilitarian). Benefit: hundreds of thousands of lives could be saved each year. Harm: removing a mosquito species could affect food webs (e.g. animals that eat mosquitoes or larvae), and a gene drive spreads by itself and cannot easily be recalled.", "Apply framework 2 by name: rights-based. Communities where the mosquitoes would be released have a right to be informed and to agree, because a gene drive will spread across borders and affect people who did not choose it.", "Consider the other side, then conclude, linking back to both frameworks."],
    answer: "I think gene-drive mosquitoes should be released, but only after careful trials and with community consent. Using a consequences framework, the benefit is enormous: malaria kills about 600 000 people a year, so greatly reducing mosquito numbers could save many lives. The possible harms, such as effects on animals that feed on mosquitoes, seem smaller, but they are uncertain and a gene drive cannot easily be reversed, so field trials are needed first. Using a rights-based framework, people in affected regions have a right to informed consent, because the gene will spread across borders and affect communities that did not choose it. So release is justified only if the evidence shows little ecological harm and the communities involved agree."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "Always ", /*#__PURE__*/React.createElement("strong", null, "name"), " the framework you are using and show how it leads to your point (\u201CFrom a utilitarian view, \u2026 because \u2026\u201D). Use at least one piece of scientific evidence, and finish with a clear conclusion."), /*#__PURE__*/React.createElement(Practice, {
    title: "Ethical frameworks"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 37,
    question: "A scientist argues that a new gene therapy should be approved because it will save thousands of lives, even though a few patients may suffer side effects. Which ethical framework is she using?",
    options: ["Rights-based", "Consequences (utilitarian)", "Virtue ethics", "None: this is not an ethical argument"],
    correct: 1,
    explain: "She is weighing total benefits (lives saved) against total harms (side effects), which is a consequences-based approach. A rights-based argument would focus on whether each patient's rights, such as consent, are respected, whatever the overall outcome."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 38,
    question: "Which statement uses a duty / rights-based framework?",
    options: ["More people will benefit from genetic testing than will be harmed by it", "A caring and honest doctor would explain the test results kindly", "A company should do whatever makes the most money", "A person's genetic test results must not be given to an insurance company without their consent"],
    correct: 3,
    explain: "It is based on a right (privacy and consent) that must be respected regardless of outcome. The first statement weighs outcomes (utilitarian) and the second asks what a good person would do (virtue), while making money is not an ethical framework."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 39,
    question: "Parents of a child with a serious inherited blood disorder use IVF and genetic testing of embryos to choose an embryo that is a tissue match. Stem cells from the new baby's umbilical cord could then treat their sick child. Use a consequences framework and a rights-based framework to discuss this decision. (4 marks)",
    model: "Consequences: the sick child could be cured by a matching stem-cell transplant, which is a large benefit, and collecting cord blood causes no harm to the new baby. A possible harm is that embryos that are not a match are not used, and the new child may later feel they were created mainly to help a sibling. Rights-based: the new baby cannot give consent to being selected or to having cells used, and some people believe every embryo has a right not to be discarded. However, the parents also have a right to make reproductive choices and a duty to care for their sick child. Considering both, the decision has a strong benefit but raises real rights concerns, so it needs careful rules and counselling."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 40,
    question: "A company plans to use cloning and gene editing to bring back the thylacine (Tasmanian tiger), which became extinct in 1936. Construct an evidence-based argument for or against this project, using virtue ethics and one other ethical framework. (5 marks)",
    model: "Position: I am against the project going ahead now. Virtue ethics: a responsible and caring society might want to undo a harm humans caused, since hunting helped drive the thylacine extinct. But a responsible scientist would also be honest that a gene-edited animal would only be a close copy and would face risks to its welfare, born without parents of its own species. Consequences: the money and effort could instead protect endangered species that still exist, such as Tasmanian devils, which would help more animals; a released animal could also affect today's ecosystems in ways we cannot predict. The other side: the research may develop gene-editing tools that help conservation of living species. Conclusion: because a responsible approach puts welfare and living species first, and the overall benefits are uncertain, the project should not go ahead until the science is proven and living species are protected."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "5.5.1",
    items: ["I can describe the consequences, duty/rights and virtue frameworks in one sentence each.", "I can identify which framework an argument is using.", "I can build an argument: position, evidence, named framework, other side, conclusion.", "I can briefly explain why the HeLa cell line raises ethical questions."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#5.5",
    label: "Learn it in full: 5.5 Genetics and Evolutionary Change in Context"
  })));
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
    "informed consent": "Agreeing to take part, or to have your cells or data used, after being told clearly what will happen."
  },
  sections: [{
    id: "5.1",
    label: "DNA structure",
    accent: "pink",
    blurb: "★★ DNA, genes, chromosomes and genomes, and how the double helix stores and copies the code.",
    points: ["5.1.2", "5.1.3"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section1, p);
    }
  }, {
    id: "5.2",
    label: "Inheritance",
    accent: "violet",
    blurb: "★★★ Mutations, genotype and phenotype, Punnett squares and pedigrees.",
    points: ["5.2.3", "5.2.4", "5.2.5"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section2, p);
    }
  }, {
    id: "5.3",
    label: "Genetic technologies",
    accent: "blue",
    blurb: "★★★ PCR, DNA profiling, GM, CRISPR, gene therapy and cloning, with their benefits and risks.",
    points: ["5.3.1", "5.3.2"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section3, p);
    }
  }, {
    id: "5.4",
    label: "Evolution",
    accent: "emerald",
    blurb: "★★★ Natural selection step by step, and how isolation leads to new species.",
    points: ["5.4.1"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section4, p);
    }
  }, {
    id: "5.5",
    label: "Ethics",
    accent: "amber",
    blurb: "★★ Using ethical frameworks to argue about a genetic technology.",
    points: ["5.5.1"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section5, p);
    }
  }]
});

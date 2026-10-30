/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

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
var NB = "https://irvincisneros-png.github.io/Year-10-Science/chemical-reactions/";

/* ============================================================
   Small helpers
   ============================================================ */

/* nuclear symbol: mass number on top, atomic number below, then the symbol */
function Nuc(_ref) {
  var a = _ref.a,
    z = _ref.z,
    s = _ref.s;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      verticalAlign: "middle",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      fontSize: "0.68em",
      lineHeight: 1.05,
      textAlign: "right",
      marginRight: 2
    }
  }, /*#__PURE__*/React.createElement("span", null, a), /*#__PURE__*/React.createElement("span", null, z)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, s));
}

/* a displayed equation that can scroll sideways on its own if it is long */
function Eq(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      margin: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      minWidth: "100%",
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid var(--border)",
      background: "rgba(127,127,127,0.07)",
      fontSize: "1.02rem",
      whiteSpace: "nowrap",
      textAlign: "center"
    }
  }, children));
}
function TableWrap(_ref3) {
  var children = _ref3.children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, children);
}

/* monotone cubic path through pixel points, so curves never overshoot a plateau */
function monoPath(p) {
  var n = p.length;
  if (n < 2) return "";
  var dx = [],
    m = [];
  for (var i = 0; i < n - 1; i++) {
    dx[i] = p[i + 1][0] - p[i][0];
    m[i] = (p[i + 1][1] - p[i][1]) / dx[i];
  }
  var t = [m[0]];
  for (var _i = 1; _i < n - 1; _i++) t[_i] = m[_i - 1] * m[_i] <= 0 ? 0 : (m[_i - 1] + m[_i]) / 2;
  t[n - 1] = m[n - 2];
  for (var _i2 = 0; _i2 < n - 1; _i2++) {
    if (m[_i2] === 0) {
      t[_i2] = 0;
      t[_i2 + 1] = 0;
      continue;
    }
    var a = t[_i2] / m[_i2],
      b = t[_i2 + 1] / m[_i2],
      s = a * a + b * b;
    if (s > 9) {
      var k = 3 / Math.sqrt(s);
      t[_i2] = k * a * m[_i2];
      t[_i2 + 1] = k * b * m[_i2];
    }
  }
  var d = "M" + p[0][0].toFixed(1) + "," + p[0][1].toFixed(1);
  for (var _i3 = 0; _i3 < n - 1; _i3++) {
    var h = dx[_i3] / 3;
    d += " C" + (p[_i3][0] + h).toFixed(1) + "," + (p[_i3][1] + t[_i3] * h).toFixed(1) + " " + (p[_i3 + 1][0] - h).toFixed(1) + "," + (p[_i3 + 1][1] - t[_i3 + 1] * h).toFixed(1) + " " + p[_i3 + 1][0].toFixed(1) + "," + p[_i3 + 1][1].toFixed(1);
  }
  return d;
}

/* simple accurate line graph. series: [{ data:[[x,y]], stroke, dash, smooth, markers }] */
function Chart(_ref4) {
  var label = _ref4.label,
    _ref4$w = _ref4.w,
    w = _ref4$w === void 0 ? 440 : _ref4$w,
    _ref4$h = _ref4.h,
    h = _ref4$h === void 0 ? 290 : _ref4$h,
    xMax = _ref4.xMax,
    yMax = _ref4.yMax,
    xTicks = _ref4.xTicks,
    yTicks = _ref4.yTicks,
    xLabel = _ref4.xLabel,
    yLabel = _ref4.yLabel,
    _ref4$series = _ref4.series,
    series = _ref4$series === void 0 ? [] : _ref4$series,
    extra = _ref4.extra,
    fmtY = _ref4.fmtY;
  var L = 54,
    R = 14,
    T = 14,
    B = 50;
  var pw = w - L - R,
    ph = h - T - B;
  var sx = function sx(x) {
    return L + x / xMax * pw;
  };
  var sy = function sy(y) {
    return T + ph - y / yMax * ph;
  };
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": label,
    width: "100%",
    viewBox: "0 0 ".concat(w, " ").concat(h),
    style: {
      maxWidth: 560,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: L,
    y: T,
    width: pw,
    height: ph,
    fill: "var(--card)",
    stroke: "none"
  }), yTicks.map(function (v) {
    return /*#__PURE__*/React.createElement("line", {
      key: "gy" + v,
      x1: L,
      x2: L + pw,
      y1: sy(v),
      y2: sy(v),
      stroke: "var(--border)",
      strokeWidth: "1"
    });
  }), xTicks.map(function (v) {
    return /*#__PURE__*/React.createElement("line", {
      key: "gx" + v,
      x1: sx(v),
      x2: sx(v),
      y1: T,
      y2: T + ph,
      stroke: "var(--border)",
      strokeWidth: "1"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: T + ph,
    x2: L + pw,
    y2: T + ph,
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: T,
    x2: L,
    y2: T + ph,
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), yTicks.map(function (v) {
    return /*#__PURE__*/React.createElement("text", {
      key: "ty" + v,
      x: L - 6,
      y: sy(v) + 4,
      textAnchor: "end",
      fontSize: "12",
      fill: "var(--ink-muted)"
    }, fmtY ? fmtY(v) : v);
  }), xTicks.map(function (v) {
    return /*#__PURE__*/React.createElement("text", {
      key: "tx" + v,
      x: sx(v),
      y: T + ph + 17,
      textAnchor: "middle",
      fontSize: "12",
      fill: "var(--ink-muted)"
    }, v);
  }), /*#__PURE__*/React.createElement("text", {
    x: L + pw / 2,
    y: h - 8,
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "600",
    fill: "var(--ink)"
  }, xLabel), /*#__PURE__*/React.createElement("text", {
    x: 14,
    y: T + ph / 2,
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "600",
    fill: "var(--ink)",
    transform: "rotate(-90 14 ".concat(T + ph / 2, ")")
  }, yLabel), series.map(function (s, i) {
    var pts = s.data.map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        x = _ref6[0],
        y = _ref6[1];
      return [sx(x), sy(y)];
    });
    var d = s.smooth === false ? "M" + pts.map(function (q) {
      return q[0].toFixed(1) + "," + q[1].toFixed(1);
    }).join(" L") : monoPath(pts);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: s.stroke || "var(--accent)",
      strokeWidth: s.width || 3,
      strokeDasharray: s.dash || "none",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), s.markers && pts.map(function (q, j) {
      return /*#__PURE__*/React.createElement("circle", {
        key: j,
        cx: q[0],
        cy: q[1],
        r: "3.6",
        fill: s.stroke || "var(--accent)",
        stroke: "var(--card)",
        strokeWidth: "1.2"
      });
    }));
  }), extra && extra(sx, sy));
}

/* ============================================================
   FIGURES
   ============================================================ */

function BalanceFigure() {
  var bottle = function bottle(x, sealed, after) {
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: x - 70,
      y: 196,
      width: 140,
      height: 34,
      rx: 6,
      fill: "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("rect", {
      x: x - 44,
      y: 204,
      width: 88,
      height: 20,
      rx: 3,
      fill: "var(--bg-2)",
      stroke: "var(--ink-muted)",
      strokeWidth: "1.2"
    }), /*#__PURE__*/React.createElement("text", {
      x: x,
      y: 219,
      textAnchor: "middle",
      fontSize: "14",
      fontWeight: "700",
      fill: "var(--ink)",
      fontFamily: "var(--font-mono, monospace)"
    }, after && !sealed ? "247.90 g" : "248.60 g"), /*#__PURE__*/React.createElement("rect", {
      x: x - 56,
      y: 188,
      width: 112,
      height: 8,
      rx: 2,
      fill: "var(--ink-muted)"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M".concat(x - 30, ",186 L").concat(x - 30, ",110 Q").concat(x - 30, ",96 ").concat(x - 16, ",90 L").concat(x - 12, ",70 L").concat(x + 12, ",70 L").concat(x + 16, ",90 Q").concat(x + 30, ",96 ").concat(x + 30, ",110 L").concat(x + 30, ",186 Z"),
      fill: "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M".concat(x - 28, ",184 L").concat(x - 28, ",130 L").concat(x + 28, ",130 L").concat(x + 28, ",184 Z"),
      fill: "var(--accent)",
      opacity: "0.22"
    }), sealed && /*#__PURE__*/React.createElement("rect", {
      x: x - 15,
      y: 60,
      width: 30,
      height: 12,
      rx: 2,
      fill: "var(--accent)"
    }), after && [[-14, 170], [6, 160], [-4, 146], [14, 176], [-18, 150], [10, 138]].map(function (_ref7, i) {
      var _ref8 = _slicedToArray(_ref7, 2),
        dx = _ref8[0],
        y = _ref8[1];
      return /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: x + dx,
        cy: y,
        r: 3.2,
        fill: "none",
        stroke: "var(--accent)",
        strokeWidth: "1.4"
      });
    }), after && /*#__PURE__*/React.createElement("rect", {
      x: x - 9,
      y: 174,
      width: 18,
      height: 6,
      rx: 2,
      fill: "var(--ink-muted)",
      opacity: "0.6"
    }), after && !sealed && [[-6, 50], [8, 36], [-2, 22]].map(function (_ref9, i) {
      var _ref0 = _slicedToArray(_ref9, 2),
        dx = _ref0[0],
        y = _ref0[1];
      return /*#__PURE__*/React.createElement("circle", {
        key: "g" + i,
        cx: x + dx,
        cy: y,
        r: 4,
        fill: "none",
        stroke: "var(--accent)",
        strokeWidth: "1.6"
      });
    }), after && !sealed && /*#__PURE__*/React.createElement("text", {
      x: x + 22,
      y: 34,
      fontSize: "12",
      fill: "var(--accent)",
      fontWeight: "700"
    }, "CO\u2082 escapes"), after && sealed && /*#__PURE__*/React.createElement("text", {
      x: x,
      y: 52,
      textAnchor: "middle",
      fontSize: "12",
      fill: "var(--accent)",
      fontWeight: "700"
    }, "CO\u2082 trapped"));
  };
  return /*#__PURE__*/React.createElement(Figure, {
    num: "1",
    caption: "An effervescent tablet dropped into water in an open bottle (left) and a sealed bottle (right). Readings are after the fizzing stops. Only the open bottle loses mass, because the carbon dioxide gas leaves the system."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Two bottles on balances. Both start at 248.60 grams. The open bottle reads 247.90 grams after the reaction because carbon dioxide escapes. The sealed bottle still reads 248.60 grams.",
    width: "100%",
    viewBox: "0 0 440 274",
    style: {
      maxWidth: 520,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("text", {
    x: 110,
    y: 266,
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Open system"), /*#__PURE__*/React.createElement("text", {
    x: 330,
    y: 266,
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Closed system"), bottle(110, false, true), bottle(330, true, true), /*#__PURE__*/React.createElement("text", {
    x: 110,
    y: 244,
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "started at 248.60 g"), /*#__PURE__*/React.createElement("text", {
    x: 330,
    y: 244,
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "started at 248.60 g")));
}
function CrissCrossFigure() {
  return /*#__PURE__*/React.createElement(Figure, {
    num: "2",
    caption: "The criss-cross method for calcium phosphate. The size of each ion's charge becomes the other ion's subscript. Brackets go around a polyatomic ion when you need more than one of it."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Calcium ion with charge 2 plus and phosphate ion with charge 3 minus. Arrows cross over: the 3 goes to calcium and the 2 goes to phosphate, giving Ca3(PO4)2.",
    width: "100%",
    viewBox: "0 0 400 200",
    style: {
      maxWidth: 460,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "rx-arrow",
    viewBox: "0 0 10 10",
    refX: "8",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 z",
    fill: "var(--accent)"
  }))), /*#__PURE__*/React.createElement("text", {
    x: 110,
    y: 58,
    textAnchor: "middle",
    fontSize: "30",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Ca"), /*#__PURE__*/React.createElement("text", {
    x: 142,
    y: 40,
    fontSize: "18",
    fontWeight: "700",
    fill: "var(--accent)"
  }, "2+"), /*#__PURE__*/React.createElement("text", {
    x: 236,
    y: 58,
    fontSize: "30",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "PO", /*#__PURE__*/React.createElement("tspan", {
    fontSize: "18",
    dy: "8"
  }, "4")), /*#__PURE__*/React.createElement("text", {
    x: 298,
    y: 36,
    fontSize: "18",
    fontWeight: "700",
    fill: "var(--accent)"
  }, "3\u2212"), /*#__PURE__*/React.createElement("path", {
    d: "M152,46 C190,80 220,110 268,138",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "2.2",
    markerEnd: "url(#rx-arrow)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M314,44 C334,92 240,118 146,138",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "2.2",
    markerEnd: "url(#rx-arrow)"
  }), /*#__PURE__*/React.createElement("text", {
    x: 200,
    y: 178,
    textAnchor: "middle",
    fontSize: "30",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Ca\u2083(PO\u2084)\u2082"), /*#__PURE__*/React.createElement("text", {
    x: 36,
    y: 110,
    fontSize: "12",
    fill: "var(--ink-muted)"
  }, "3 \xD7 (2+) = 6+"), /*#__PURE__*/React.createElement("text", {
    x: 304,
    y: 130,
    fontSize: "12",
    fill: "var(--ink-muted)"
  }, "2 \xD7 (3\u2212) = 6\u2212")));
}
function PhScaleFigure() {
  var items = [[0.5, "battery acid", 0], [2, "lemon juice", 1], [3, "vinegar", 0], [5, "black coffee", 1], [6.5, "milk", 0], [7, "pure water", 1], [8, "sea water", 0], [9, "baking soda", 1], [10.5, "milk of magnesia", 0], [12.5, "bleach", 1], [14, "drain cleaner", 0]];
  var x = function x(p) {
    return 20 + p * 28;
  };
  return /*#__PURE__*/React.createElement(Figure, {
    num: "3",
    caption: "The pH scale with some common substances (approximate values). Pure water at 25 \xB0C is neutral, pH 7."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "pH scale from 0 to 14. Acids below 7 include battery acid, lemon juice, vinegar and black coffee. Milk is about 6.5. Pure water is 7. Bases above 7 include sea water, baking soda, milk of magnesia, bleach and drain cleaner.",
    width: "100%",
    viewBox: "0 0 432 210",
    style: {
      maxWidth: 600,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: 20,
    y: 92,
    width: 392,
    height: 22,
    rx: 4,
    fill: "var(--card)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: 20,
    y: 92,
    width: 196,
    height: 22,
    rx: 4,
    fill: "var(--accent)",
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("rect", {
    x: 214,
    y: 92,
    width: 4,
    height: 22,
    fill: "var(--ink)"
  }), Array.from({
    length: 15
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x(i),
      x2: x(i),
      y1: 114,
      y2: 120,
      stroke: "var(--ink)",
      strokeWidth: "1.2"
    }), /*#__PURE__*/React.createElement("text", {
      x: x(i),
      y: 133,
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink)"
    }, i));
  }), items.map(function (_ref1, i) {
    var _ref10 = _slicedToArray(_ref1, 3),
      p = _ref10[0],
      name = _ref10[1],
      up = _ref10[2];
    var y1 = up ? 92 : 136,
      y2 = up ? i % 4 === 1 ? 50 : 72 : i % 4 === 0 ? 156 : 176;
    return /*#__PURE__*/React.createElement("g", {
      key: name
    }, /*#__PURE__*/React.createElement("line", {
      x1: x(p),
      x2: x(p),
      y1: y1,
      y2: up ? y2 + 4 : y2 - 12,
      stroke: "var(--ink-muted)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: x(p) < 40 ? 20 : x(p) > 400 ? 412 : x(p),
      y: y2,
      textAnchor: x(p) < 40 ? "start" : x(p) > 400 ? "end" : "middle",
      fontSize: "11",
      fill: "var(--ink)"
    }, name));
  }), /*#__PURE__*/React.createElement("text", {
    x: 20,
    y: 22,
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--accent)"
  }, "\u2190 more acidic"), /*#__PURE__*/React.createElement("text", {
    x: 216,
    y: 22,
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "neutral"), /*#__PURE__*/React.createElement("text", {
    x: 412,
    y: 22,
    textAnchor: "end",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink-muted)"
  }, "more basic \u2192"), /*#__PURE__*/React.createElement("text", {
    x: 216,
    y: 204,
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "each step of 1 = 10 \xD7 change in acidity")));
}

/* pH of 25.0 mL of 0.100 mol/L KOH as 0.100 mol/L HCl is added (strong acid + strong base) */
function phAt(v) {
  var base = 0.1 * 25,
    acid = 0.1 * v,
    tot = 25 + v;
  if (Math.abs(base - acid) < 1e-9) return 7;
  if (base > acid) return 14 + Math.log10((base - acid) / tot);
  return -Math.log10((acid - base) / tot);
}
var PH_CURVE = function () {
  var xs = [];
  for (var v = 0; v <= 50.0001; v += v > 22 && v < 28 ? 0.1 : 0.5) xs.push(Math.round(v * 10) / 10);
  return xs.map(function (v) {
    return [v, phAt(v)];
  });
}();
function NeutralisationCurve() {
  return /*#__PURE__*/React.createElement(Figure, {
    num: "4",
    caption: "pH meter readings as hydrochloric acid is added, a little at a time, to 25.0 mL of potassium hydroxide solution (both 0.100 mol/L). The pH falls slowly, then plunges through 7 when the acid has exactly neutralised the base (25.0 mL), then levels off in the acidic range."
  }, /*#__PURE__*/React.createElement(Chart, {
    label: "Graph of pH against volume of acid added. pH starts at 13, stays above 12 until about 20 millilitres, drops steeply through pH 7 at 25 millilitres, then levels off near pH 1.5 by 50 millilitres.",
    xMax: 50,
    yMax: 14,
    xTicks: [0, 10, 20, 30, 40, 50],
    yTicks: [0, 2, 4, 6, 7, 8, 10, 12, 14],
    xLabel: "Volume of acid added (mL)",
    yLabel: "pH",
    series: [{
      data: PH_CURVE,
      smooth: false
    }],
    extra: function extra(sx, sy) {
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
        x1: sx(0),
        x2: sx(25),
        y1: sy(7),
        y2: sy(7),
        stroke: "var(--ink-muted)",
        strokeDasharray: "4 4",
        strokeWidth: "1.3"
      }), /*#__PURE__*/React.createElement("line", {
        x1: sx(25),
        x2: sx(25),
        y1: sy(7),
        y2: sy(0),
        stroke: "var(--ink-muted)",
        strokeDasharray: "4 4",
        strokeWidth: "1.3"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: sx(25),
        cy: sy(7),
        r: "4.5",
        fill: "var(--accent)"
      }), /*#__PURE__*/React.createElement("text", {
        x: sx(26.5),
        y: sy(7) - 6,
        fontSize: "12",
        fill: "var(--ink)",
        fontWeight: "600"
      }, "neutral point"), /*#__PURE__*/React.createElement("text", {
        x: sx(3),
        y: sy(11.2),
        fontSize: "12",
        fill: "var(--ink-muted)"
      }, "basic (excess KOH)"), /*#__PURE__*/React.createElement("text", {
        x: sx(30),
        y: sy(3.4),
        fontSize: "12",
        fill: "var(--ink-muted)"
      }, "acidic (excess HCl)"));
    }
  }));
}
function CollisionFigure() {
  var box = function box(x, y, title, nRed, seed) {
    var pts = [];
    var s = seed;
    var rnd = function rnd() {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    for (var i = 0; i < nRed; i++) pts.push([x + 14 + rnd() * 152, y + 14 + rnd() * 92]);
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: 180,
      height: 120,
      rx: 8,
      fill: "var(--card)",
      stroke: "var(--ink)",
      strokeWidth: "1.6"
    }), pts.map(function (p, i) {
      return /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: p[0],
        cy: p[1],
        r: "5",
        fill: "var(--accent)"
      });
    }), /*#__PURE__*/React.createElement("rect", {
      x: x + 70,
      y: y + 82,
      width: 40,
      height: 30,
      rx: 3,
      fill: "var(--ink-muted)",
      opacity: "0.75"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 90,
      y: y + 140,
      textAnchor: "middle",
      fontSize: "12",
      fontWeight: "700",
      fill: "var(--ink)"
    }, title));
  };
  return /*#__PURE__*/React.createElement(Figure, {
    num: "5",
    caption: "Collision theory. The coloured dots are acid particles; the grey block is a solid reactant. More particles in the same volume (higher concentration) means more frequent collisions with the solid, so the reaction is faster."
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Two boxes containing a solid block and acid particles. The low concentration box has 6 particles, the high concentration box has 20 particles crowded around the solid.",
    width: "100%",
    viewBox: "0 0 400 168",
    style: {
      maxWidth: 520,
      display: "block",
      margin: "0 auto"
    }
  }, box(10, 8, "Low concentration", 6, 7), box(210, 8, "High concentration", 20, 11)));
}

/* marble chips (5.00 g, acid in excess): mass of CO2 lost against time */
var SMALL = [[0, 0], [30, 0.90], [60, 1.50], [90, 1.86], [120, 2.06], [150, 2.16], [180, 2.20], [210, 2.20], [240, 2.20], [270, 2.20], [300, 2.20], [330, 2.20], [360, 2.20]];
var LARGE = [[0, 0], [30, 0.45], [60, 0.85], [90, 1.20], [120, 1.48], [150, 1.70], [180, 1.86], [210, 1.98], [240, 2.07], [270, 2.13], [300, 2.17], [330, 2.19], [360, 2.20]];
function MarbleGraph(_ref11) {
  var _ref11$num = _ref11.num,
    num = _ref11$num === void 0 ? "6" : _ref11$num;
  return /*#__PURE__*/React.createElement(Figure, {
    num: num,
    caption: "Mass lost from a flask on a balance as 5.00 g of marble (calcium carbonate) reacts with excess hydrochloric acid. The mass lost is the carbon dioxide escaping. Small chips (solid line) react faster than large chips (dashed line), but both lose 2.20 g in total."
  }, /*#__PURE__*/React.createElement(Chart, {
    label: "Graph of mass lost in grams against time in seconds. Small chips: 0.90 g at 30 s, 1.50 g at 60 s, 2.06 g at 120 s, levelling at 2.20 g from 180 s. Large chips: 0.45 g at 30 s, 0.85 g at 60 s, 1.48 g at 120 s, 1.86 g at 180 s, reaching 2.20 g at 360 s.",
    xMax: 360,
    yMax: 2.5,
    xTicks: [0, 60, 120, 180, 240, 300, 360],
    yTicks: [0, 0.5, 1.0, 1.5, 2.0, 2.5],
    fmtY: function fmtY(v) {
      return v.toFixed(1);
    },
    xLabel: "Time (s)",
    yLabel: "Mass lost (g)",
    series: [{
      data: SMALL,
      markers: true
    }, {
      data: LARGE,
      markers: true,
      stroke: "var(--orange)",
      dash: "7 5"
    }],
    extra: function extra(sx, sy) {
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
        x: sx(16),
        y: sy(1.9),
        fontSize: "12",
        fontWeight: "700",
        fill: "var(--accent)"
      }, "small chips"), /*#__PURE__*/React.createElement("text", {
        x: sx(150),
        y: sy(1.32),
        fontSize: "12",
        fontWeight: "700",
        fill: "var(--orange)"
      }, "large chips"));
    }
  }));
}

/* sodium-24 decay (half-life 15 h) */
var NA24 = Array.from({
  length: 31
}, function (_, i) {
  var t = i * 2.5;
  return [t, 1600 * Math.pow(0.5, t / 15)];
});
function DecayGraph() {
  return /*#__PURE__*/React.createElement(Figure, {
    num: "7",
    caption: "Activity of a sodium-24 sample over time. It falls from 1600 Bq to 800 Bq in 15 hours, so its half-life is 15 h. Each further 15 h halves the activity again."
  }, /*#__PURE__*/React.createElement(Chart, {
    label: "Decay curve of activity in becquerels against time in hours. 1600 Bq at 0 h, 800 at 15 h, 400 at 30 h, 200 at 45 h, 100 at 60 h, 50 at 75 h.",
    xMax: 75,
    yMax: 1600,
    xTicks: [0, 15, 30, 45, 60, 75],
    yTicks: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600],
    xLabel: "Time (h)",
    yLabel: "Activity (Bq)",
    series: [{
      data: NA24
    }],
    extra: function extra(sx, sy) {
      return /*#__PURE__*/React.createElement("g", null, [[15, 800], [30, 400], [45, 200]].map(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 2),
          t = _ref13[0],
          a = _ref13[1];
        return /*#__PURE__*/React.createElement("g", {
          key: t
        }, /*#__PURE__*/React.createElement("line", {
          x1: sx(0),
          x2: sx(t),
          y1: sy(a),
          y2: sy(a),
          stroke: "var(--ink-muted)",
          strokeDasharray: "4 4",
          strokeWidth: "1.2"
        }), /*#__PURE__*/React.createElement("line", {
          x1: sx(t),
          x2: sx(t),
          y1: sy(a),
          y2: sy(0),
          stroke: "var(--ink-muted)",
          strokeDasharray: "4 4",
          strokeWidth: "1.2"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: sx(t),
          cy: sy(a),
          r: "4",
          fill: "var(--accent)"
        }));
      }), /*#__PURE__*/React.createElement("text", {
        x: sx(17),
        y: sy(800) - 8,
        fontSize: "12",
        fontWeight: "600",
        fill: "var(--ink)"
      }, "1 half-life: 800 Bq"), /*#__PURE__*/React.createElement("text", {
        x: sx(32),
        y: sy(400) - 8,
        fontSize: "12",
        fontWeight: "600",
        fill: "var(--ink)"
      }, "2 half-lives: 400 Bq"));
    }
  }));
}
function HalfLifeInteractive() {
  var ISO = {
    tc: {
      name: "Technetium-99m",
      t: 6,
      unit: "hours",
      start: 400,
      u: "MBq"
    },
    na: {
      name: "Sodium-24",
      t: 15,
      unit: "hours",
      start: 1600,
      u: "Bq"
    },
    co: {
      name: "Cobalt-60",
      t: 5.3,
      unit: "years",
      start: 800,
      u: "GBq"
    }
  };
  var _useState = useState("tc"),
    _useState2 = _slicedToArray(_useState, 2),
    k = _useState2[0],
    setK = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    n = _useState4[0],
    setN = _useState4[1];
  var iso = ISO[k];
  var frac = Math.pow(0.5, n);
  var left = iso.start * frac;
  var fmt = function fmt(v) {
    return v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2);
  };
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Half-life stepper",
    subtitle: "Pick an isotope and slide through half-lives. Watch what is left.",
    takeaway: "Every half-life the amount left halves, no matter how much you start with. After n half-lives, the fraction left is (\xBD)\u207F: \xBD, \xBC, \u215B, \xB9\u2044\u2081\u2086 \u2026"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "tc",
      label: "Tc-99m"
    }, {
      value: "na",
      label: "Na-24"
    }, {
      value: "co",
      label: "Co-60"
    }],
    value: k,
    onChange: function onChange(v) {
      return setK(v);
    }
  })), /*#__PURE__*/React.createElement(Slider, {
    label: "Half-lives passed",
    min: 0,
    max: 5,
    step: 1,
    value: n,
    onChange: setN
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 22,
      borderRadius: 6,
      border: "1.5px solid var(--ink)",
      overflow: "hidden",
      margin: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: frac * 100 + "%",
      height: "100%",
      background: "var(--accent)",
      transition: "width 0.3s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: Math.round(iso.t * n * 10) / 10 + " " + iso.unit,
    label: "Time passed"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: n === 0 ? "1" : "1/" + Math.pow(2, n),
    label: "Fraction left"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: fmt(left) + " " + iso.u,
    label: "Activity (start " + iso.start + " " + iso.u + ")"
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      fontSize: "0.85rem",
      marginTop: 8
    }
  }, iso.name, ": half-life ", iso.t, " ", iso.unit, "."));
}

/* ============================================================
   SECTION 6.1  Conservation of mass
   ============================================================ */
function Section61(_ref14) {
  var progress = _ref14.progress,
    setProgress = _ref14.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.1 Conservation of mass"), /*#__PURE__*/React.createElement("h1", null, "Atoms are never lost"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "In a chemical reaction, atoms are rearranged. None are made and none are destroyed, so the total mass stays the same.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.1.1",
    title: "Explain the law of conservation of mass",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "In a chemical reaction mass is neither created nor destroyed: total mass of reactants = total mass of products."
  }, "law of conservation of mass"), ": in any chemical reaction, ", /*#__PURE__*/React.createElement("strong", null, "total mass of reactants = total mass of products"), "."), /*#__PURE__*/React.createElement("li", null, "Why: atoms are only ", /*#__PURE__*/React.createElement("strong", null, "rearranged"), " into new substances. The same number of each type of atom is there before and after, and each atom keeps its mass."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "An equation where the number of each type of atom is the same on both sides."
  }, "balanced equation"), " shows this: count each type of atom on each side and the numbers match."), /*#__PURE__*/React.createElement("li", null, "Use it to calculate a missing mass: mass of missing substance = total on one side \u2212 the known masses on the other side."), /*#__PURE__*/React.createElement("li", null, "Common mistake: saying mass \"disappears\" when a gas forms. The gas still has mass; it just may not be on the balance."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Finding a missing mass",
    problem: "When 10.0 g of calcium carbonate is heated strongly, it breaks down into 5.6 g of calcium oxide and carbon dioxide gas. What mass of carbon dioxide forms?",
    steps: ["Write the word equation: calcium carbonate → calcium oxide + carbon dioxide.", "Conservation of mass: mass of reactants = mass of products, so 10.0 g = 5.6 g + mass of carbon dioxide.", "Rearrange: mass of carbon dioxide = 10.0 g − 5.6 g = 4.4 g."],
    answer: "4.4 g of carbon dioxide."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "\"Explain\" questions on this law need the ", /*#__PURE__*/React.createElement("strong", null, "atom idea"), ", not just the rule. A full answer says: atoms are rearranged, not created or destroyed \u2192 same number of each atom \u2192 so total mass stays the same."), /*#__PURE__*/React.createElement(Practice, {
    title: "Conservation of mass"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "6.4 g of copper reacts completely with sulfur to make 9.6 g of copper(II) sulfide. What mass of sulfur reacted?",
    options: ["16.0 g", "3.2 g", "6.4 g", "9.6 g"],
    correct: 1,
    explain: "Mass of sulfur = 9.6 g \u2212 6.4 g = 3.2 g, because total mass of reactants equals total mass of product. 16.0 g is the tempting wrong answer: it comes from adding the two numbers, but 9.6 g is already the product, which includes the copper."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 2,
    question: "Which statement best explains why mass is conserved in a chemical reaction?",
    options: ["The molecules stay the same, they only change state", "Some of the mass changes into heat energy", "Atoms are rearranged into new substances, but none are created or destroyed", "The products always end up in the same state as the reactants"],
    correct: 2,
    explain: "Atoms are rearranged into new combinations, and the same atoms (with the same mass) are there at the end. The first option is wrong because in a chemical reaction new molecules do form; staying the same describes a physical change."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 3,
    question: "Hydrogen peroxide breaks down: 2H\u2082O\u2082 \u2192 2H\u2082O + O\u2082. Use the number of atoms on each side to explain how this equation shows conservation of mass. (3 marks)",
    model: "On the reactant side there are 4 hydrogen atoms and 4 oxygen atoms (2 \xD7 H\u2082O\u2082). On the product side there are 4 hydrogen atoms (2 \xD7 H\u2082O) and 2 + 2 = 4 oxygen atoms (2 in the water, 2 in O\u2082). The same number of each type of atom is present before and after, because atoms are only rearranged, so the total mass of the products equals the total mass of the reactants."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "A flask of dilute hydrochloric acid and a small dish of marble chips (calcium carbonate) sit together on a balance, which reads 152.40 g. The chips are tipped into the acid and the flask is left open. The reaction makes calcium chloride, water and 0.88 g of carbon dioxide gas. Predict the balance reading when the fizzing stops, and explain your prediction using the law of conservation of mass. (2 marks)",
    model: "The balance will read 152.40 g \u2212 0.88 g = 151.52 g. No atoms are created or destroyed, so the total mass of the products is still 152.40 g, but the carbon dioxide is a gas that bubbles out of the open flask into the air, so its 0.88 g is no longer on the balance. If the flask had been stoppered, the reading would have stayed at 152.40 g."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.1.1",
    items: ["I can state the law of conservation of mass in one sentence.", "I can explain it using the idea that atoms are rearranged, not created or destroyed.", "I can count atoms on both sides of an equation to show mass is conserved.", "I can calculate a missing mass of a reactant or product."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.1",
    label: "Learn it in full: Conservation of Mass"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.1.2",
    title: "Demonstrate conservation of mass in open and closed systems",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "An ", /*#__PURE__*/React.createElement(Term, {
    def: "A system where matter (such as gas) can move in or out, for example an open beaker."
  }, "open system"), " lets matter in or out (an open beaker or bottle). A ", /*#__PURE__*/React.createElement(Term, {
    def: "A sealed system where no matter can get in or out, but energy can."
  }, "closed system"), " is sealed: no matter can get in or out."), /*#__PURE__*/React.createElement("li", null, "In a ", /*#__PURE__*/React.createElement("strong", null, "closed system"), " the balance reading stays the same, which directly shows mass is conserved. Example: mixing copper(II) sulfate and sodium hydroxide solutions in a stoppered flask makes a blue solid, but the mass does not change."), /*#__PURE__*/React.createElement("li", null, "In an open system mass can ", /*#__PURE__*/React.createElement("strong", null, "seem to decrease"), " when a gas product escapes (an effervescent tablet fizzing in an open bottle loses carbon dioxide)."), /*#__PURE__*/React.createElement("li", null, "Mass can ", /*#__PURE__*/React.createElement("strong", null, "seem to increase"), " when a gas from the air joins the product (a dish of quicklime, calcium oxide, left open slowly takes in carbon dioxide from the air: calcium oxide + carbon dioxide \u2192 calcium carbonate, so the solid gets heavier)."), /*#__PURE__*/React.createElement("li", null, "In both cases mass is still conserved; the balance just is not weighing everything involved."))), /*#__PURE__*/React.createElement(BalanceFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Explaining a mass change",
    problem: "Look at Figure 1. Explain why the open bottle lost 0.70 g but the sealed bottle did not change mass. (3 marks)",
    steps: ["Name what happens: the tablet reacts with water and produces carbon dioxide gas (the fizzing).", "Open bottle: the carbon dioxide escapes into the air, so it is no longer on the balance. The reading drops by the mass of gas lost: 248.60 g − 247.90 g = 0.70 g.", "Closed bottle: the lid traps the carbon dioxide, so all the products stay on the balance.", "Link to the law: no atoms were created or destroyed in either bottle; the open bottle only seemed to lose mass because a product left the system."],
    answer: "The reaction makes carbon dioxide gas. In the open bottle it escapes, so 0.70 g of gas is no longer weighed; in the sealed bottle the gas is trapped, so the total mass stays at 248.60 g. Mass is conserved in both; only the closed system shows it on the balance."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Open and closed systems"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "An open beaker holding silver nitrate solution and a test tube of sodium chloride solution stand together on a balance, which reads 96.25 g. The sodium chloride is poured into the beaker and the empty test tube is put back on the balance. A white solid (silver chloride) forms, and no gas is made. What does the balance read now?",
    options: ["More than 96.25 g, because a solid has formed", "Less than 96.25 g, because the beaker is open", "96.25 g, because no gas is made or used, so no atoms leave or enter even though the beaker is open", "0 g, because the reactants have been used up"],
    correct: 2,
    explain: "The products (silver chloride and sodium nitrate solution) are made from exactly the same atoms as the reactants, and none of them is a gas that can escape, so the reading stays 96.25 g. 'Less, because the beaker is open' is tempting, but an open container only loses mass when a product such as a gas actually leaves it."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "Copper(II) sulfate solution and sodium hydroxide solution are mixed in a stoppered flask. The flask and contents weigh 185.30 g before mixing. A blue solid forms. What does the balance read after the reaction?",
    options: ["More than 185.30 g, because a solid has formed", "Less than 185.30 g, because the solid sinks", "185.30 g", "0 g, because the reactants are used up"],
    correct: 2,
    explain: "It is a closed system and no gas is involved, so nothing enters or leaves: the mass stays 185.30 g. A new solid forming does not add mass, because it is made from atoms that were already in the solutions."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 7,
    question: "Omar puts an effervescent tablet into water in an open beaker on a balance and finds the mass goes down. Describe how he could change his method to show that mass is conserved. (3 marks)",
    model: "He should carry out the reaction in a closed system, for example a plastic bottle with a screw-top lid. He weighs the bottle with water, the tablet (kept separate, such as resting in the neck) and the lid, then tips the tablet in and seals it straight away. When the fizzing stops he weighs it again with the lid still on. The mass should be the same, because the carbon dioxide produced is trapped inside, showing mass is conserved."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 8,
    question: "When baking soda (sodium hydrogen carbonate) is heated in an open test tube, the solid left behind is lighter than the baking soda was. When quicklime (calcium oxide) is left in an open dish for a week, the solid gets heavier. Explain both results using conservation of mass. (3 marks)",
    model: "Heating baking soda breaks it down into sodium carbonate, water vapour and carbon dioxide. The water vapour and carbon dioxide are gases that escape from the open tube, so the solid left behind is lighter. The quicklime reacts with carbon dioxide (and water vapour) from the air to form calcium carbonate, so the solid now contains extra atoms that came from the air and it is heavier. In both cases no atoms are created or destroyed and total mass is conserved; the balance changes only because gases leave the solid or join it from the air, and the air is not being weighed."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.1.2",
    items: ["I can explain the difference between an open and a closed system.", "I can explain why mass seems to go down when a gas escapes.", "I can explain why mass seems to go up when a gas from the air reacts.", "I can describe a closed-system practical that shows mass is conserved."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.1",
    label: "Learn it in full: Conservation of Mass"
  })));
}

/* ============================================================
   SECTION 6.2  Chemical reactions
   ============================================================ */
function Section62(_ref15) {
  var progress = _ref15.progress,
    setProgress = _ref15.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.2 Chemical reactions"), /*#__PURE__*/React.createElement("h1", null, "Names, equations and reaction types"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Name compounds, write balanced equations, recognise common reaction types, and use the pH scale.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.1",
    title: "Name and write formulas for ionic and covalent compounds",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Ionic compounds"), " (metal + non-metal): name the metal first, then the non-metal ending in ", /*#__PURE__*/React.createElement("strong", null, "-ide"), " (chlorine \u2192 chloride, oxygen \u2192 oxide, sulfur \u2192 sulfide). Polyatomic ions keep their own names (sulfate, nitrate, carbonate)."), /*#__PURE__*/React.createElement("li", null, "The charges must add to zero. Use the ", /*#__PURE__*/React.createElement(Term, {
    def: "Swap the sizes of the ion charges so each becomes the other ion's subscript, then simplify."
  }, "criss-cross method"), ": the size of each charge becomes the other ion's subscript. Simplify if you can (Mg\xB2\u207A and O\xB2\u207B give MgO, not Mg\u2082O\u2082)."), /*#__PURE__*/React.createElement("li", null, "Put brackets around a polyatomic ion when you need more than one: Ca(NO\u2083)\u2082, not CaNO\u2083\u2082."), /*#__PURE__*/React.createElement("li", null, "Metals with more than one charge show it in Roman numerals: iron(II) = Fe\xB2\u207A, iron(III) = Fe\xB3\u207A, copper(II) = Cu\xB2\u207A."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Covalent compounds"), " (non-metal + non-metal): use prefixes for the number of atoms: mono 1, di 2, tri 3, tetra 4, penta 5, hexa 6. Skip \"mono\" on the first element: CO\u2082 is carbon dioxide, CO is carbon monoxide."), /*#__PURE__*/React.createElement("li", null, "Ion charges: use the ", /*#__PURE__*/React.createElement("strong", null, "periodic table on your exam data sheet"), ". Group 1 \u2192 1+, group 2 \u2192 2+, group 16 \u2192 2\u2212, group 17 \u2192 1\u2212."))), /*#__PURE__*/React.createElement(TableWrap, null, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      minWidth: 300
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Positive ions"), /*#__PURE__*/React.createElement("th", null, "Negative ions"), /*#__PURE__*/React.createElement("th", null, "Polyatomic ions"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Na\u207A, K\u207A, Ag\u207A"), /*#__PURE__*/React.createElement("td", null, "Cl\u207B chloride, Br\u207B bromide"), /*#__PURE__*/React.createElement("td", null, "NH\u2084\u207A ammonium, OH\u207B hydroxide")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Mg\xB2\u207A, Ca\xB2\u207A, Zn\xB2\u207A, Cu\xB2\u207A"), /*#__PURE__*/React.createElement("td", null, "O\xB2\u207B oxide, S\xB2\u207B sulfide"), /*#__PURE__*/React.createElement("td", null, "NO\u2083\u207B nitrate, HCO\u2083\u207B hydrogen carbonate")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fe\xB2\u207A iron(II), Fe\xB3\u207A iron(III)"), /*#__PURE__*/React.createElement("td", null, "N\xB3\u207B nitride"), /*#__PURE__*/React.createElement("td", null, "SO\u2084\xB2\u207B sulfate, CO\u2083\xB2\u207B carbonate, PO\u2084\xB3\u207B phosphate"))))), /*#__PURE__*/React.createElement(CrissCrossFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Formula of iron(III) sulfate, and a covalent name",
    problem: "(a) Write the formula of iron(III) sulfate. (b) Name the compound PCl\u2085.",
    steps: ["(a) Ions: iron(III) is Fe³⁺ (the Roman numeral tells you the charge); sulfate is SO₄²⁻.", "Criss-cross: the 3 goes to sulfate and the 2 goes to iron, giving Fe₂(SO₄)₃. Brackets are needed because there are three sulfate ions.", "Check the charges: 2 × (3+) = 6+ and 3 × (2−) = 6−. They add to zero.", "(b) P and Cl are both non-metals, so it is covalent: use prefixes. One P (no 'mono' at the start), five Cl → penta + chloride."],
    answer: "(a) Fe\u2082(SO\u2084)\u2083  (b) phosphorus pentachloride."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "First decide ", /*#__PURE__*/React.createElement("strong", null, "ionic or covalent"), ". Metal present \u2192 charges and criss-cross, no prefixes. Only non-metals \u2192 prefixes, no charges. Mixing the two rules (e.g. \"magnesium dichloride\") loses the mark."), /*#__PURE__*/React.createElement(Practice, {
    title: "Naming and formulas"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 9,
    question: "What is the formula of magnesium nitrate?",
    options: ["MgNO₃", "Mg₂NO₃", "Mg(NO₃)₂", "MgN₂"],
    correct: 2,
    explain: "Mg\xB2\u207A needs two NO\u2083\u207B ions to balance the charge (2+ and 2 \xD7 1\u2212), and brackets show two whole nitrate ions: Mg(NO\u2083)\u2082. MgNO\u2083 is tempting but leaves an overall charge of 1+."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 10,
    question: "What is the correct name for SO\u2083?",
    options: ["sulfur(III) oxide", "sulfur trioxide", "monosulfur trioxide", "sulfite"],
    correct: 1,
    explain: "Sulfur and oxygen are both non-metals, so use prefixes: one sulfur (no 'mono' at the start) and three oxygens: sulfur trioxide. Roman numerals like (III) are only used for metal ions in ionic compounds."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 11,
    question: "Write the formula for each compound: (a) potassium carbonate (b) ammonium sulfate (c) copper(II) hydroxide. (3 marks)",
    model: "(a) K\u2082CO\u2083 (two K\u207A balance one CO\u2083\xB2\u207B). (b) (NH\u2084)\u2082SO\u2084 (two NH\u2084\u207A balance one SO\u2084\xB2\u207B, brackets because there are two ammonium ions). (c) Cu(OH)\u2082 (Cu\xB2\u207A needs two OH\u207B, brackets around the hydroxide)."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 12,
    question: "Name Na\u2082S and N\u2082O\u2084, and explain why only one of these names uses prefixes. (3 marks)",
    model: "Na\u2082S is sodium sulfide. N\u2082O\u2084 is dinitrogen tetroxide. Sodium sulfide is ionic (a metal with a non-metal), so the ratio is fixed by the ion charges (Na\u207A and S\xB2\u207B) and no prefixes are needed. N\u2082O\u2084 is covalent (two non-metals), and the same elements can join in different ratios, so prefixes are needed to show the number of each atom."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.2.1",
    items: ["I can decide if a compound is ionic or covalent.", "I can find ion charges from the periodic table on the data sheet.", "I can use the criss-cross method, including brackets for polyatomic ions.", "I can name covalent compounds using prefixes."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.2",
    label: "Learn it in full: Chemical Reactions"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.2",
    title: "Write word and balanced equations, and predict products",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("strong", null, "word equation"), " names the reactants \u2192 products: zinc + hydrochloric acid \u2192 zinc chloride + hydrogen."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("strong", null, "balanced symbol equation"), " uses formulas, with the same number of each atom on both sides."), /*#__PURE__*/React.createElement("li", null, "Balance by changing only the big numbers in front (", /*#__PURE__*/React.createElement(Term, {
    def: "A number in front of a formula showing how many units of that substance react or form."
  }, "coefficients"), "). Never change subscripts, because that changes the substance."), /*#__PURE__*/React.createElement("li", null, "States: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. A solid that forms when two solutions mix is a ", /*#__PURE__*/React.createElement(Term, {
    def: "An insoluble solid formed when two solutions are mixed."
  }, "precipitate"), " (s)."), /*#__PURE__*/React.createElement("li", null, "Diatomic elements: H\u2082, N\u2082, O\u2082, F\u2082, Cl\u2082, Br\u2082, I\u2082."), /*#__PURE__*/React.createElement("li", null, "Predict products from the reaction type (see 6.2.4), e.g. a hydrocarbon burning completely always gives carbon dioxide and water."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Balancing a combustion equation",
    problem: "Propane gas (C\u2083H\u2088) burns completely in oxygen. Write the word equation and a balanced equation with states.",
    steps: ["Products of complete combustion: carbon dioxide and water. Word equation: propane + oxygen → carbon dioxide + water.", "Unbalanced: C₃H₈(g) + O₂(g) → CO₂(g) + H₂O(l).", "Balance C first: 3 C on the left, so 3CO₂.", "Balance H: 8 H on the left, so 4H₂O.", "Balance O last: right side has 3 × 2 + 4 × 1 = 10 O atoms, so 5O₂ on the left.", "Check: C 3 = 3, H 8 = 8, O 10 = 10."],
    answer: "C\u2083H\u2088(g) + 5O\u2082(g) \u2192 3CO\u2082(g) + 4H\u2082O(l)"
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Writing equations"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "Which equation for sodium reacting with chlorine is correctly balanced?",
    options: ["Na + Cl₂ → NaCl", "Na + Cl₂ → NaCl₂", "2Na + 2Cl₂ → 2NaCl", "2Na + Cl₂ → 2NaCl"],
    correct: 3,
    explain: "2Na + Cl\u2082 \u2192 2NaCl has 2 Na and 2 Cl on each side. Na + Cl\u2082 \u2192 NaCl\u2082 looks balanced, but it changes the formula of sodium chloride (the product is NaCl, because Na\u207A and Cl\u207B have equal and opposite charges)."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 14,
    question: "Lead(II) nitrate solution is mixed with potassium iodide solution and a bright yellow solid of lead(II) iodide appears. Which state symbol should lead(II) iodide have?",
    options: ["(aq)", "(l)", "(s)", "(g)"],
    correct: 2,
    explain: "A solid that forms when two solutions mix is a precipitate, so it is (s). (aq) is tempting because the reactants are solutions, but (aq) means dissolved, and a precipitate is the part that does not dissolve."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 15,
    question: "Zinc granules react with hydrochloric acid. Write the word equation and the balanced symbol equation with states. (3 marks)",
    model: "Word equation: zinc + hydrochloric acid \u2192 zinc chloride + hydrogen. Balanced equation: Zn(s) + 2HCl(aq) \u2192 ZnCl\u2082(aq) + H\u2082(g). Check: 1 Zn, 2 H and 2 Cl on each side."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 16,
    question: "In a blast furnace, iron(III) oxide reacts with carbon monoxide gas to form liquid iron and carbon dioxide. Write the balanced equation with states. (2 marks)",
    model: "Fe\u2082O\u2083(s) + 3CO(g) \u2192 2Fe(l) + 3CO\u2082(g). Check: Fe 2 = 2; C 3 = 3; O 3 + 3 = 6 on the left and 3 \xD7 2 = 6 on the right."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.2.2",
    items: ["I can write a word equation from a description of a reaction.", "I can balance an equation by changing coefficients only.", "I can add correct state symbols, including (s) for a precipitate.", "I can predict the products of common reactions."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.2",
    label: "Learn it in full: Chemical Reactions"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.4",
    title: "Features of synthesis, decomposition, displacement, neutralisation and other reactions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement(TableWrap, null, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      minWidth: 420
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Pattern"), /*#__PURE__*/React.createElement("th", null, "Example"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Term, {
    def: "Two or more reactants join to make one product."
  }, "Synthesis")), /*#__PURE__*/React.createElement("td", null, "A + B \u2192 AB"), /*#__PURE__*/React.createElement("td", null, "iron + sulfur \u2192 iron(II) sulfide")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Term, {
    def: "One compound breaks down into two or more simpler substances, often by heating or electricity."
  }, "Decomposition")), /*#__PURE__*/React.createElement("td", null, "AB \u2192 A + B"), /*#__PURE__*/React.createElement("td", null, "copper(II) carbonate \u2192 copper(II) oxide + carbon dioxide")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Term, {
    def: "A more reactive element takes the place of a less reactive element in a compound."
  }, "Single displacement")), /*#__PURE__*/React.createElement("td", null, "A + BC \u2192 AC + B"), /*#__PURE__*/React.createElement("td", null, "zinc + copper(II) sulfate \u2192 zinc sulfate + copper")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Term, {
    def: "An acid reacts with a base to make a salt and water."
  }, "Neutralisation")), /*#__PURE__*/React.createElement("td", null, "acid + base \u2192 salt + water"), /*#__PURE__*/React.createElement("td", null, "hydrochloric acid + potassium hydroxide \u2192 potassium chloride + water")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Combustion"), /*#__PURE__*/React.createElement("td", null, "fuel + oxygen \u2192 carbon dioxide + water"), /*#__PURE__*/React.createElement("td", null, "methane + oxygen \u2192 carbon dioxide + water")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Acid + metal"), /*#__PURE__*/React.createElement("td", null, "\u2192 salt + hydrogen"), /*#__PURE__*/React.createElement("td", null, "zinc + sulfuric acid \u2192 zinc sulfate + hydrogen")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Acid + carbonate"), /*#__PURE__*/React.createElement("td", null, "\u2192 salt + water + carbon dioxide"), /*#__PURE__*/React.createElement("td", null, "calcium carbonate + nitric acid \u2192 calcium nitrate + water + carbon dioxide"))))), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Displacement only happens if the free metal is ", /*#__PURE__*/React.createElement("strong", null, "more reactive"), " than the metal in the compound. Part of the reactivity series: magnesium > zinc > iron > copper > silver."), /*#__PURE__*/React.createElement("li", null, "Salt names: hydrochloric acid \u2192 chlorides, sulfuric acid \u2192 sulfates, nitric acid \u2192 nitrates."), /*#__PURE__*/React.createElement("li", null, "Gas tests: ", /*#__PURE__*/React.createElement("strong", null, "hydrogen"), " gives a squeaky \"pop\" with a lit splint; ", /*#__PURE__*/React.createElement("strong", null, "carbon dioxide"), " turns limewater milky; ", /*#__PURE__*/React.createElement("strong", null, "oxygen"), " relights a glowing splint."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Identifying and testing a decomposition",
    problem: "Green copper(II) carbonate powder is heated in a test tube. It turns black and a gas is given off. Name the type of reaction, write the word equation and describe a test for the gas. (3 marks)",
    steps: ["Count reactants and products: one compound breaks into two simpler substances, so it is a (thermal) decomposition.", "Products of heating a metal carbonate: the metal oxide (black copper(II) oxide) and carbon dioxide.", "Word equation: copper(II) carbonate → copper(II) oxide + carbon dioxide.", "Test: bubble the gas through limewater. Carbon dioxide turns it milky (cloudy)."],
    answer: "Decomposition. Copper(II) carbonate \u2192 copper(II) oxide + carbon dioxide. The gas turns limewater milky, showing it is carbon dioxide."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Will displacement happen?",
    problem: "Mia puts a strip of zinc into blue copper(II) sulfate solution, and a strip of copper into colourless zinc sulfate solution. Predict what happens in each, with reasons and observations. (4 marks)",
    steps: ["Use the reactivity series: zinc is more reactive than copper.", "Zinc in copper(II) sulfate: zinc displaces copper. Word equation: zinc + copper(II) sulfate → zinc sulfate + copper.", "Observations: a brown/pink coating of copper forms on the zinc and the blue colour of the solution fades (Cu²⁺ ions are used up).", "Copper in zinc sulfate: copper is less reactive than zinc, so it cannot displace it. No reaction, no change seen."],
    answer: "Only the zinc strip reacts: it gets a brown copper coating and the blue solution fades, because zinc is more reactive than copper and displaces it. The copper strip in zinc sulfate shows no change, because copper is less reactive than zinc."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "For \"identify the type\" questions, look at the pattern: how many reactants, how many products, is an element swapping places, is an acid meeting a base? Then ", /*#__PURE__*/React.createElement("strong", null, "justify"), " with that feature, e.g. \"decomposition, because one reactant breaks down into two products\"."), /*#__PURE__*/React.createElement(Practice, {
    title: "Types of reactions"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 17,
    question: "Iron filings and sulfur powder are heated together and form a single product, iron(II) sulfide. What type of reaction is this?",
    options: ["Decomposition", "Synthesis", "Single displacement", "Neutralisation"],
    correct: 1,
    explain: "Two reactants join to make one product: A + B \u2192 AB, which is synthesis. Decomposition is the reverse (one reactant breaking into several products), so it is the opposite pattern."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 18,
    question: "Zinc carbonate is added to sulfuric acid and bubbles form. Which gas is made, and how is it identified?",
    options: ["Hydrogen: it makes a lit splint pop", "Oxygen: it relights a glowing splint", "Carbon dioxide: it turns limewater milky", "Carbon dioxide: it makes a lit splint pop"],
    correct: 2,
    explain: "Acid + carbonate \u2192 salt + water + carbon dioxide, and carbon dioxide turns limewater milky. Hydrogen with a 'pop' is tempting, but hydrogen is made when an acid reacts with a metal, not with a carbonate."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 19,
    question: "What are the products when ethanol burns completely in plenty of oxygen?",
    options: ["Carbon dioxide and water", "Carbon monoxide and hydrogen", "Carbon and water", "Carbon dioxide and hydrogen"],
    correct: 0,
    explain: "Complete combustion of a fuel containing carbon and hydrogen gives carbon dioxide and water. Carbon monoxide and soot (carbon) form only in incomplete combustion, when oxygen is limited."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 20,
    question: "Reactivity: magnesium > zinc > iron > copper > silver. Which of these will react?",
    options: ["Copper wire in zinc nitrate solution", "An iron nail in copper(II) sulfate solution", "Silver foil in magnesium sulfate solution", "Copper wire in iron(II) sulfate solution"],
    correct: 1,
    explain: "Iron is more reactive than copper, so it displaces copper from copper(II) sulfate. In each other option the free metal is less reactive than the metal in the solution, so no displacement occurs."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 21,
    question: "An antacid tablet contains magnesium hydroxide, which reacts with hydrochloric acid in the stomach. Name the type of reaction, write the word equation and name the salt formed. (3 marks)",
    model: "It is a neutralisation reaction, because an acid reacts with a base. Word equation: magnesium hydroxide + hydrochloric acid \u2192 magnesium chloride + water. The salt formed is magnesium chloride."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 22,
    question: "Compare the reaction of hydrochloric acid with zinc metal and the reaction of hydrochloric acid with zinc carbonate. Include the products and a test for each gas. (4 marks)",
    model: "Both reactions make the salt zinc chloride and both fizz because a gas is produced. With zinc metal (acid + metal) the products are zinc chloride and hydrogen; hydrogen gives a squeaky pop with a lit splint. With zinc carbonate (acid + carbonate) the products are zinc chloride, water and carbon dioxide; carbon dioxide turns limewater milky. So the difference is the gas made, and only the carbonate reaction also produces water."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.2.4",
    items: ["I can identify synthesis, decomposition, single displacement and neutralisation from their pattern.", "I can predict products of combustion, acid + metal and acid + carbonate reactions.", "I can use a reactivity series to decide if displacement will happen.", "I can describe the tests for hydrogen, carbon dioxide and oxygen.", "I can name the salt made by a given acid."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.2",
    label: "Learn it in full: Chemical Reactions"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.5",
    title: "pH measures acidity; compare common substances with pure water",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "A scale from 0 to 14 showing how acidic or basic a solution is."
  }, "pH"), " measures how acidic or basic a solution is, usually on a 0\u201314 scale."), /*#__PURE__*/React.createElement("li", null, "pH below 7 = ", /*#__PURE__*/React.createElement("strong", null, "acidic"), "; pH 7 = ", /*#__PURE__*/React.createElement("strong", null, "neutral"), " (pure water at 25 \xB0C); pH above 7 = ", /*#__PURE__*/React.createElement("strong", null, "basic"), " (alkaline, if the base is dissolved)."), /*#__PURE__*/React.createElement("li", null, "The lower the pH, the stronger the acidity: each drop of 1 pH unit means 10 times more acidic (pH 2 is 100 times more acidic than pH 4)."), /*#__PURE__*/React.createElement("li", null, "Typical acids: lemon juice, vinegar, soft drinks, stomach acid. Typical bases: baking soda, soap, milk of magnesia, bleach, drain cleaner."))), /*#__PURE__*/React.createElement(PhScaleFigure, null), /*#__PURE__*/React.createElement(Practice, {
    title: "The pH scale"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 23,
    question: "Which of these substances has a pH closest to pure water?",
    options: ["Lemon juice", "Milk", "Drain cleaner", "Vinegar"],
    correct: 1,
    explain: "Milk is about pH 6.5, very close to neutral pH 7. Vinegar might seem mild, but at about pH 3 it is 10 000 times more acidic than water."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 24,
    question: "Rainwater in one town has a pH of 4. In another town it is pH 6. How does the acidity compare?",
    options: ["pH 4 rain is 2 times more acidic", "pH 4 rain is 100 times more acidic", "pH 6 rain is 100 times more acidic", "They are equally acidic because both are below 7"],
    correct: 1,
    explain: "Each pH unit is a 10 times change, so 2 units is 10 \xD7 10 = 100 times. Lower pH means more acidic, so the pH 4 rain is the more acidic. '2 times' is tempting but treats the scale as if it went up in equal steps."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.2.5",
    items: ["I can say what pH below 7, equal to 7 and above 7 means.", "I can place common substances on the pH scale compared with pure water.", "I can explain that a lower pH means more acidic, by 10 times per unit."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.2",
    label: "Learn it in full: Chemical Reactions"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.6",
    title: "Use indicators or a pH meter to follow neutralisation",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "An ", /*#__PURE__*/React.createElement(Term, {
    def: "A substance that changes colour depending on the pH."
  }, "indicator"), " changes colour with pH. Litmus: red in acid, blue in base. Phenolphthalein: colourless in acid and neutral solutions, pink in basic ones. Universal indicator shows a range of colours you match against a chart to estimate pH."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("strong", null, "pH meter"), " gives a number (often to 0.01). Calibrate it first, rinse the probe between solutions, and stir before reading."), /*#__PURE__*/React.createElement("li", null, "To follow a neutralisation, add acid a little at a time to a base (or base to acid) and record the pH after each addition."), /*#__PURE__*/React.createElement("li", null, "The pH moves towards 7, changes very quickly near the ", /*#__PURE__*/React.createElement("strong", null, "neutral point"), ", then levels off on the other side (Figure 4)."))), /*#__PURE__*/React.createElement(NeutralisationCurve, null), /*#__PURE__*/React.createElement(Practice, {
    title: "Following neutralisation"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 25,
    question: "Use Figure 4. What volume of acid had been added when the solution was exactly neutral?",
    options: ["10.0 mL", "20.0 mL", "25.0 mL", "50.0 mL"],
    correct: 2,
    explain: "The curve crosses pH 7 at 25.0 mL, the middle of the steep drop. At 20.0 mL the pH is still about 12, because a little unreacted base remains and pH changes only slowly until very close to the neutral point."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 26,
    question: "Give two reasons why a pH meter is better than universal indicator for following the pH change in Figure 4. (2 marks)",
    model: "A pH meter gives a precise number (for example 12.05) instead of a colour you have to match to a chart, so the results are more accurate. It also does not depend on judging colours by eye, so different people get the same reading, and it can take many readings quickly to show the sudden change near the neutral point."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.2.6",
    items: ["I can describe the colours of litmus and phenolphthalein in acids and bases.", "I can describe how to use a pH meter to follow a neutralisation.", "I can read the neutral point from a pH curve."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.2",
    label: "Learn it in full: Chemical Reactions"
  })));
}

/* ============================================================
   SECTION 6.3  Reaction rate
   ============================================================ */
function Section63(_ref16) {
  var progress = _ref16.progress,
    setProgress = _ref16.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.3 Reaction rate"), /*#__PURE__*/React.createElement("h1", null, "Faster or slower"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Collision theory explains how concentration, surface area, temperature and catalysts change the speed of a reaction, and how to investigate it fairly.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.3.1",
    title: "How concentration, surface area, temperature and catalysts affect rate (collision theory)",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Particles must collide, with enough energy and the right orientation, to react."
  }, "Collision theory"), ": to react, particles must ", /*#__PURE__*/React.createElement("strong", null, "collide"), " with at least the ", /*#__PURE__*/React.createElement(Term, {
    def: "The minimum energy colliding particles need to react."
  }, "activation energy"), ". Rate depends on ", /*#__PURE__*/React.createElement("strong", null, "how often"), " collisions happen and ", /*#__PURE__*/React.createElement("strong", null, "what fraction"), " have enough energy."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Concentration"), " \u2191 \u2192 more particles in the same volume \u2192 more frequent collisions \u2192 faster."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Surface area"), " \u2191 (powder or small pieces instead of a lump) \u2192 more particles exposed \u2192 more frequent collisions \u2192 faster."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Temperature"), " \u2191 \u2192 particles move faster \u2192 collide more often ", /*#__PURE__*/React.createElement("em", null, "and"), " a bigger fraction of collisions have enough energy \u2192 faster (often about double for every 10 \xB0C)."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A substance that speeds up a reaction by lowering the activation energy, and is not used up."
  }, "catalyst"), " gives the reaction a different pathway with a lower activation energy, so more collisions succeed. It is not used up. Examples: manganese dioxide or the enzyme catalase (in yeast or liver) with hydrogen peroxide."), /*#__PURE__*/React.createElement("li", null, "Changing the rate does not change the total amount of product, unless you change the amount of reactant."))), /*#__PURE__*/React.createElement(CollisionFigure, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Explaining a temperature effect",
    problem: "When sodium thiosulfate solution reacts with acid it turns cloudy, so a cross under the flask disappears. Explain why the cross disappears sooner when the solutions are warmed from 20 \xB0C to 40 \xB0C. (3 marks)",
    steps: ["Cause: at higher temperature the particles have more kinetic energy and move faster.", "Effect 1: they collide more often.", "Effect 2: a greater proportion of the collisions have energy equal to or above the activation energy.", "Link: more successful collisions per second means a faster rate, so the cloudy sulfur forms sooner and the cross disappears in less time."],
    answer: "At 40 \xB0C the particles move faster, so they collide more frequently and more of the collisions have at least the activation energy. This gives more successful collisions per second, a faster rate, and the cross disappears sooner."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "What a catalyst does",
    problem: "A little black manganese dioxide powder is added to hydrogen peroxide solution and it fizzes rapidly with oxygen. Afterwards the powder is filtered, dried and weighed: it has the same mass as at the start. Explain these observations. (3 marks)",
    steps: ["Name its role: manganese dioxide is a catalyst for the decomposition hydrogen peroxide → water + oxygen.", "How it speeds up the reaction: it provides a pathway with a lower activation energy, so a larger fraction of collisions are successful.", "Why the mass is unchanged: a catalyst is not used up in the reaction, so it can be recovered."],
    answer: "Manganese dioxide is a catalyst. It lowers the activation energy, so more collisions succeed and oxygen is made much faster. Its mass is unchanged because a catalyst is not used up."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "A full \"explain\" answer on rate has three links: ", /*#__PURE__*/React.createElement("strong", null, "change"), " (e.g. smaller pieces) \u2192 ", /*#__PURE__*/React.createElement("strong", null, "collisions"), " (more frequent, or more with enough energy) \u2192 ", /*#__PURE__*/React.createElement("strong", null, "rate"), " (faster). Answers that skip the collision step usually lose a mark. Say \"more frequent collisions\", not just \"more collisions\"."), /*#__PURE__*/React.createElement(Practice, {
    title: "Collision theory"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 27,
    question: "Equal masses of marble powder and marble chips are added to identical acid. The powder reacts faster. Why?",
    options: ["The powder particles have more energy", "The powder has a larger surface area, so collisions with acid particles are more frequent", "The powder lowers the activation energy", "The powder has more mass exposed to the air"],
    correct: 1,
    explain: "Grinding exposes more surface, so acid particles collide with the solid more often. Lowering the activation energy is what a catalyst does; grinding does not change the energy needed for a collision to succeed."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 28,
    question: "What is the main reason raising the temperature speeds up a reaction?",
    options: ["The activation energy becomes lower", "The particles become larger and easier to hit", "Particles move faster, so they collide more often and more collisions have enough energy", "The concentration of the reactants increases"],
    correct: 2,
    explain: "Faster particles collide more often, and a bigger share of collisions reach the activation energy. The activation energy itself does not change with temperature; only a catalyst lowers it."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 29,
    question: "A piece of liver (containing the enzyme catalase) is added to a flask of hydrogen peroxide. Compared with no liver, what happens to the total volume of oxygen collected when the reaction has finished?",
    options: ["It is the same, but it is produced faster", "It is doubled", "It is less, because the catalyst uses some up", "It is the same, but it is produced more slowly"],
    correct: 0,
    explain: "A catalyst speeds the reaction up but does not change how much product the reactants can make. 'Doubled' is tempting, but the volume of oxygen depends only on how much hydrogen peroxide there is."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 30,
    question: "Sasha repeats a reaction using acid twice as concentrated. Which statement explains why it is faster?",
    options: ["The acid particles move faster", "There are more acid particles in the same volume, so collisions are more frequent", "Each collision has more energy", "The acid becomes a catalyst"],
    correct: 1,
    explain: "Higher concentration means more particles crowded into the same volume, so they collide more often. Speed and energy of particles depend on temperature, which has not changed."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 31,
    question: "Explain, using collision theory, why milk stays fresh for longer in a fridge at 4 \xB0C than on a bench at 25 \xB0C. (3 marks)",
    model: "Milk goes off because of chemical reactions (caused by bacteria and their enzymes). At 4 \xB0C the particles have less kinetic energy and move more slowly, so they collide less often and fewer collisions have the activation energy. This means fewer successful collisions per second, so the reactions that spoil the milk are slower and it stays fresh for longer."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 32,
    question: "A bag of flour burns slowly if lit, but a cloud of fine flour dust in the air of a flour mill can explode. Explain this difference using collision theory. (4 marks)",
    model: "In a cloud of dust each tiny flour particle is surrounded by air, so the surface area in contact with oxygen is enormous compared with a packed bag where only the outside surface is exposed. A larger surface area means oxygen particles collide with flour particles far more frequently. More frequent collisions give many more successful collisions per second, so the reaction rate is extremely fast. The heat is released so quickly that it causes an explosion, whereas the bag only burns slowly at its surface."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.3.1",
    items: ["I can state collision theory, including activation energy.", "I can explain the effect of concentration and surface area using collision frequency.", "I can explain why temperature has two effects on collisions.", "I can explain how a catalyst works and that it is not used up."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.3",
    label: "Learn it in full: Reaction Rate"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.3.2",
    title: "Investigate rate: hypothesis, variables, means, outliers and graphs",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("strong", null, "measurable hypothesis"), " names the independent and dependent variables and the direction: \"If the temperature of the thiosulfate is increased from 20 \xB0C to 50 \xB0C, then the time for the cross to disappear will decrease, because particles collide more often and with more energy.\""), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The variable you change on purpose."
  }, "Independent variable"), " (IV): what you change. ", /*#__PURE__*/React.createElement(Term, {
    def: "The variable you measure."
  }, "Dependent variable"), " (DV): what you measure. ", /*#__PURE__*/React.createElement(Term, {
    def: "Variables kept the same so the test is fair."
  }, "Controlled variables"), ": everything else kept the same (volumes, concentration, mass, chip size, temperature, same balance)."), /*#__PURE__*/React.createElement("li", null, "Do at least ", /*#__PURE__*/React.createElement("strong", null, "three trials"), " and calculate the ", /*#__PURE__*/React.createElement("strong", null, "mean"), ". An ", /*#__PURE__*/React.createElement(Term, {
    def: "A result that does not fit the pattern of the others; leave it out of the mean."
  }, "outlier"), " is a result that clearly does not fit; leave it out of the mean and say so."), /*#__PURE__*/React.createElement("li", null, "Measuring rate: mass lost on a balance (gas escaping), volume of gas collected, or time for a cross to disappear. Shorter time = faster rate; rate \u2248 1 \xF7 time."), /*#__PURE__*/React.createElement("li", null, "Graphs: IV on the x-axis, DV on the y-axis, labels with units, even scales, a smooth curve of best fit. ", /*#__PURE__*/React.createElement("strong", null, "Steeper gradient = faster rate."), " The curve flattens when a reactant runs out."), /*#__PURE__*/React.createElement("li", null, "Average rate = change in amount \xF7 time taken (e.g. g/s)."))), /*#__PURE__*/React.createElement(MarbleGraph, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Means and outliers",
    problem: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 0
      }
    }, "Jordan times how long the cross takes to disappear at different temperatures."), /*#__PURE__*/React.createElement(TableWrap, null, /*#__PURE__*/React.createElement("table", {
      className: "data-table",
      style: {
        minWidth: 300
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Temp (\xB0C)"), /*#__PURE__*/React.createElement("th", null, "Trial 1 (s)"), /*#__PURE__*/React.createElement("th", null, "Trial 2 (s)"), /*#__PURE__*/React.createElement("th", null, "Trial 3 (s)"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "20"), /*#__PURE__*/React.createElement("td", null, "62"), /*#__PURE__*/React.createElement("td", null, "60"), /*#__PURE__*/React.createElement("td", null, "85")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "30"), /*#__PURE__*/React.createElement("td", null, "31"), /*#__PURE__*/React.createElement("td", null, "29"), /*#__PURE__*/React.createElement("td", null, "30")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "40"), /*#__PURE__*/React.createElement("td", null, "16"), /*#__PURE__*/React.createElement("td", null, "14"), /*#__PURE__*/React.createElement("td", null, "15"))))), /*#__PURE__*/React.createElement("p", {
      style: {
        marginBottom: 0
      }
    }, "Identify the outlier, calculate the mean time at each temperature, and describe the trend.")),
    steps: ["Look for a result far from the others in the same row: 85 s at 20 °C (the others are 62 s and 60 s). That is the outlier.", "Mean at 20 °C (outlier removed): (62 + 60) ÷ 2 = 61 s.", "Mean at 30 °C: (31 + 29 + 30) ÷ 3 = 90 ÷ 3 = 30 s.", "Mean at 40 °C: (16 + 14 + 15) ÷ 3 = 45 ÷ 3 = 15 s.", "Trend: as temperature increases the time decreases, so the rate increases. Each 10 °C rise roughly halves the time (doubles the rate)."],
    answer: "Outlier: 85 s. Means: 61 s, 30 s, 15 s. As temperature increases, the time for the cross to disappear decreases (rate increases), roughly halving for every 10 \xB0C."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Reading a rate graph",
    problem: "Use Figure 6. (a) Calculate the average rate of reaction for the small chips over the first 60 s. (b) Explain why both lines level off at the same mass. (3 marks)",
    steps: ["(a) Read the graph: at 60 s the small chips have lost 1.50 g.", "Average rate = change in mass ÷ time = 1.50 g ÷ 60 s = 0.025 g/s.", "(b) The lines level off when the reaction stops, because all the marble has been used up (the acid is in excess).", "Both used the same mass of marble (5.00 g), so both make the same mass of carbon dioxide (2.20 g). Chip size changes only how fast it is made."],
    answer: "(a) 0.025 g/s. (b) Each reaction stops when the 5.00 g of marble is used up; the same mass of marble gives the same total mass of carbon dioxide, 2.20 g. The small chips just get there sooner."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Rate investigations"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 33,
    question: "A class investigates how temperature affects the time for a cross to disappear under a flask of sodium thiosulfate and acid. What is the independent variable?",
    options: ["The time for the cross to disappear", "The temperature of the solution", "The volume of sodium thiosulfate", "The size of the cross"],
    correct: 1,
    explain: "The independent variable is the one deliberately changed: temperature. The time is the dependent variable, because it is what you measure."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 34,
    question: "Four trials give times of 42 s, 44 s, 43 s and 61 s. What is the best mean value to record?",
    options: ["47.5 s", "61 s", "43 s", "44 s"],
    correct: 2,
    explain: "61 s is an outlier, so leave it out: (42 + 44 + 43) \xF7 3 = 129 \xF7 3 = 43 s. 47.5 s is what you get if you include the outlier, which drags the mean away from the real result."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 35,
    question: "Look at the small-chips line in Figure 6. When is the rate of reaction fastest?",
    options: ["At the start, from 0 to 30 s", "From 120 to 150 s", "From 180 to 240 s", "The rate is the same throughout"],
    correct: 0,
    explain: "The line is steepest at the start, when the most marble and acid are available to collide. From 180 s the line is flat, so the rate there is zero, not fastest."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 36,
    question: "Ava drops one effervescent antacid tablet into 200 mL of water and times how long it takes to stop fizzing. She repeats this with water at 15 \xB0C, 25 \xB0C, 35 \xB0C and 45 \xB0C. Write a measurable hypothesis for her investigation. (2 marks)",
    model: "If the temperature of the water is increased from 15 \xB0C to 45 \xB0C, then the time for the tablet to stop fizzing will decrease, because the particles move faster, so they collide more frequently and more of the collisions have at least the activation energy."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 37,
    question: "For Ava's investigation in Question 36, identify two variables she must control, and suggest one way to make her timing more accurate. (3 marks)",
    model: "Two controlled variables: the volume of water (200 mL) and the type and size of tablet (same brand, one whole tablet each time; also no stirring). Keeping these the same means any change in time is caused only by temperature. Deciding exactly when fizzing has 'stopped' is hard to judge, so she could agree a clear end point beforehand (e.g. no bubbles rising for 5 s) and use the same observer and stopwatch every time, which reduces random timing errors."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 38,
    question: "Use Figure 6. Calculate the average rate for the large chips over the first 120 s, and compare it with the small chips over the same time. (3 marks)",
    model: "Large chips: mass lost at 120 s = 1.48 g. Average rate = 1.48 g \xF7 120 s \u2248 0.012 g/s. Small chips: 2.06 g \xF7 120 s \u2248 0.017 g/s. The small chips react faster, because they have a larger surface area, so acid particles collide with the marble more frequently."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.3.2",
    items: ["I can write a measurable 'If … then … because' hypothesis.", "I can identify independent, dependent and controlled variables.", "I can spot an outlier and calculate a mean without it.", "I can read a rate graph and calculate an average rate with units.", "I can explain why a rate curve gets less steep and levels off."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.3",
    label: "Learn it in full: Reaction Rate"
  })));
}

/* ============================================================
   SECTION 6.4  Nuclear reactions
   ============================================================ */
function Section64(_ref17) {
  var progress = _ref17.progress,
    setProgress = _ref17.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.4 Nuclear reactions"), /*#__PURE__*/React.createElement("h1", null, "Unstable nuclei"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Write alpha and beta decay as balanced nuclear equations, work with half-life, and weigh up how radioisotopes are used.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.3",
    title: "Write alpha and beta decay as nuclear equations",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "In a nuclear symbol such as sodium-23, ", /*#__PURE__*/React.createElement(Nuc, {
    a: "23",
    z: "11",
    s: "Na"
  }), ", the upper number counts all the particles in the nucleus (protons + neutrons): this is the ", /*#__PURE__*/React.createElement("strong", null, "mass number"), ". The lower number counts only the protons: this is the ", /*#__PURE__*/React.createElement("strong", null, "atomic number"), ", and it decides which element it is. Neutrons = 23 \u2212 11 = 12."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Decay in which a nucleus emits an alpha particle: a group of 2 protons and 2 neutrons."
  }, "Alpha decay"), ": the nucleus throws out an alpha particle, a tight group of 2 protons and 2 neutrons, written ", /*#__PURE__*/React.createElement(Nuc, {
    a: "4",
    z: "2",
    s: "\u03B1"
  }), ". The new nucleus has a mass number ", /*#__PURE__*/React.createElement("strong", null, "4 lower"), " and an atomic number ", /*#__PURE__*/React.createElement("strong", null, "2 lower"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Decay in which a neutron changes into a proton and a fast electron (beta particle) is emitted."
  }, "Beta decay"), ": a neutron turns into a proton and an electron ", /*#__PURE__*/React.createElement(Nuc, {
    a: "0",
    z: "\u22121",
    s: "e"
  }), " is shot out. Mass number ", /*#__PURE__*/React.createElement("strong", null, "stays the same"), ", atomic number goes ", /*#__PURE__*/React.createElement("strong", null, "up 1"), "."), /*#__PURE__*/React.createElement("li", null, "Nothing is lost in the decay, so check two totals: the mass number before the arrow equals the sum of the mass numbers after it, and the atomic number before the arrow equals the sum of the atomic numbers after it (count \u22121 for a beta particle)."), /*#__PURE__*/React.createElement("li", null, "The new atomic number tells you the new element: look it up on the ", /*#__PURE__*/React.createElement("strong", null, "periodic table on your data sheet"), "."), /*#__PURE__*/React.createElement("li", null, "Gamma rays are energy only, so they change neither number."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Alpha decay of americium-241",
    problem: /*#__PURE__*/React.createElement("span", null, "Americium-241 (", /*#__PURE__*/React.createElement(Nuc, {
      a: "241",
      z: "95",
      s: "Am"
    }), "), used in smoke detectors, decays by alpha emission. Write the nuclear equation."),
    steps: ["Alpha particle: mass number 4, atomic number 2.", "New mass number: 241 − 4 = 237. New atomic number: 95 − 2 = 93.", "Periodic table: element 93 is neptunium (Np).", /*#__PURE__*/React.createElement("span", {
      key: "c"
    }, "Check the totals: mass numbers 241 = 237 + 4; atomic numbers 95 = 93 + 2.")],
    answer: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Nuc, {
      a: "241",
      z: "95",
      s: "Am"
    }), " \u2192 ", /*#__PURE__*/React.createElement(Nuc, {
      a: "237",
      z: "93",
      s: "Np"
    }), " + ", /*#__PURE__*/React.createElement(Nuc, {
      a: "4",
      z: "2",
      s: "He"
    }))
  }), /*#__PURE__*/React.createElement(Eq, null, /*#__PURE__*/React.createElement(Nuc, {
    a: "60",
    z: "27",
    s: "Co"
  }), " \u2192 ", /*#__PURE__*/React.createElement(Nuc, {
    a: "60",
    z: "28",
    s: "Ni"
  }), " + ", /*#__PURE__*/React.createElement(Nuc, {
    a: "0",
    z: "\u22121",
    s: "e"
  }), "   (beta decay of cobalt-60)"), /*#__PURE__*/React.createElement(Practice, {
    title: "Nuclear equations"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 39,
    question: "Strontium-90 (mass number 90, atomic number 38) undergoes beta decay. What is the new nucleus?",
    options: ["Yttrium-90 (atomic number 39)", "Krypton-86 (atomic number 36)", "Rubidium-90 (atomic number 37)", "Strontium-91 (atomic number 38)"],
    correct: 0,
    explain: "In beta decay the mass number stays at 90 and the atomic number rises by 1 to 39, which is yttrium. Krypton-86 is what alpha decay would give (mass \u2212 4, atomic number \u2212 2)."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 40,
    question: "Radium-226 (atomic number 88) decays by alpha emission. What are the mass number and atomic number of the new nucleus?",
    options: ["226 and 89", "222 and 86", "224 and 86", "222 and 90"],
    correct: 1,
    explain: "Alpha decay removes 4 from the mass number (226 \u2192 222) and 2 from the atomic number (88 \u2192 86, radon). '222 and 90' is tempting if you add 2 to the atomic number instead of subtracting it."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 41,
    question: "Phosphorus-32 (atomic number 15) decays by beta emission. Write the nuclear equation and describe what happens inside the nucleus. (3 marks)",
    model: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Nuc, {
      a: "32",
      z: "15",
      s: "P"
    }), " \u2192 ", /*#__PURE__*/React.createElement(Nuc, {
      a: "32",
      z: "16",
      s: "S"
    }), " + ", /*#__PURE__*/React.createElement(Nuc, {
      a: "0",
      z: "\u22121",
      s: "e"
    }), ". Inside the nucleus a neutron changes into a proton and an electron; the electron is emitted as a beta particle. The mass number stays at 32 but the atomic number rises from 15 to 16, so the phosphorus becomes sulfur (sulfur-32).")
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 42,
    question: "Thorium-232 (atomic number 90) decays by one alpha emission, then two beta emissions in a row. Identify the final nucleus, showing the mass number and atomic number after each step. (3 marks)",
    model: "Alpha: mass 232 \u2212 4 = 228, atomic number 90 \u2212 2 = 88 (radium-228). First beta: mass stays 228, atomic number 88 + 1 = 89 (actinium-228). Second beta: mass 228, atomic number 89 + 1 = 90. The final nucleus is thorium-228 (mass number 228, atomic number 90)."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.4.3",
    items: ["I can describe an alpha particle and a beta particle with their symbols.", "I can predict the new mass number and atomic number after alpha or beta decay.", "I can use the periodic table to name the new element.", "I can check that the mass numbers and the atomic numbers each have the same total before and after the arrow."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.4",
    label: "Learn it in full: Nuclear Reactions"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.4",
    title: "Half-life: definition and calculations from tables and graphs",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The time taken for half of the radioactive nuclei in a sample to decay (or for the activity to halve)."
  }, "Half-life"), ": the time for ", /*#__PURE__*/React.createElement("strong", null, "half"), " of the radioactive atoms in a sample to decay. The activity (counts per second, in becquerels, Bq) halves in the same time."), /*#__PURE__*/React.createElement("li", null, "Each half-life leaves half of what was there: 1 \u2192 \xBD \u2192 \xBC \u2192 \u215B \u2192 \xB9\u2044\u2081\u2086."), /*#__PURE__*/React.createElement("li", null, "Number of half-lives n = time passed \xF7 half-life. Amount left = starting amount \xD7 (\xBD)\u207F."), /*#__PURE__*/React.createElement("li", null, "From a graph or table: find the time for the value to fall to half (e.g. 1600 \u2192 800). Check with a second halving (800 \u2192 400) for accuracy."), /*#__PURE__*/React.createElement("li", null, "Half-lives range hugely: technetium-99m 6 hours, sodium-24 15 hours, cobalt-60 5.3 years, americium-241 432 years, carbon-14 5730 years."), /*#__PURE__*/React.createElement("li", null, "Decay is random: you cannot predict when one atom decays, only how a large sample behaves."))), /*#__PURE__*/React.createElement(DecayGraph, null), /*#__PURE__*/React.createElement(HalfLifeInteractive, null), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Activity after a whole number of half-lives",
    problem: "A patient is injected with technetium-99m with an activity of 80 MBq. Its half-life is 6 hours. What is the activity 24 hours later?",
    steps: ["Number of half-lives: n = 24 h ÷ 6 h = 4.", "Halve four times: 80 → 40 → 20 → 10 → 5 MBq.", "Or use the formula: 80 × (½)⁴ = 80 ÷ 16 = 5 MBq."],
    answer: "5 MBq."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Working backwards: carbon-14 dating",
    problem: "A wooden tool has only 25% of the carbon-14 found in living wood. Carbon-14 has a half-life of 5730 years. How old is the tool?",
    steps: ["Work out how many halvings give 25%: 100% → 50% → 25%, which is 2 half-lives.", "Age = number of half-lives × half-life = 2 × 5730 years.", "= 11 460 years."],
    answer: "About 11 460 years old."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "\"Calculate\" questions: show the number of half-lives, then the halving steps, then the answer with a unit. Writing 80 \u2192 40 \u2192 20 \u2192 10 \u2192 5 MBq earns working marks even if you slip at the end."), /*#__PURE__*/React.createElement(Practice, {
    title: "Half-life"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 43,
    question: "Cobalt-60 has a half-life of 5.3 years. A hospital source is 10.6 years old. What fraction of its original cobalt-60 is left?",
    options: ["One half", "One quarter", "One eighth", "None"],
    correct: 1,
    explain: "10.6 \xF7 5.3 = 2 half-lives, so \xBD \xD7 \xBD = \xBC is left. 'None' is a common mistake: after two half-lives a quarter remains, not zero, because each half-life halves what is left."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 44,
    question: "Use Figure 7. What is the half-life of sodium-24?",
    options: ["7.5 hours", "15 hours", "30 hours", "800 hours"],
    correct: 1,
    explain: "The activity falls from 1600 Bq to 800 Bq (half) in 15 hours. 30 hours is when it reaches 400 Bq, a quarter, which is two half-lives."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 45,
    question: "Americium-241 in a smoke detector has a half-life of 432 years. How does its activity after 10 years compare with when the detector was new?",
    options: ["It is almost exactly the same", "It has fallen to about half", "It has fallen to about a quarter", "It has fallen to zero"],
    correct: 0,
    explain: "10 years is a tiny fraction of one 432-year half-life, so almost no americium has decayed (about 98% is left). 'About half' would need 432 years to pass."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 46,
    question: "A patient is given technetium-99m (half-life 6 hours) with an activity of 400 MBq at 8:00 am. (a) What is the activity at 8:00 pm the same day? (b) How many hours after the injection does the activity reach 25 MBq? (3 marks)",
    model: "(a) 8:00 am to 8:00 pm is 12 hours, which is 12 \xF7 6 = 2 half-lives: 400 \u2192 200 \u2192 100 MBq. Activity = 100 MBq. (b) 400 \u2192 200 \u2192 100 \u2192 50 \u2192 25 MBq is 4 half-lives, so 4 \xD7 6 = 24 hours after the injection."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 47,
    question: "A detector measures a fluorine-18 sample: 0 min, 1200 counts/s; 55 min, 850; 110 min, 600; 165 min, 425; 220 min, 300. Determine the half-life, showing how you used the data. (2 marks)",
    model: "The count rate halves from 1200 counts/s to 600 counts/s between 0 and 110 minutes, so the half-life is 110 minutes. This is confirmed because it halves again from 600 to 300 counts/s between 110 and 220 minutes (another 110 minutes)."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 48,
    question: "Iron-59 has a half-life of about 45 days. A research lab has 3.2 g of it. How many days will it take until only 0.4 g of iron-59 remains? (2 marks)",
    model: "Halve until 0.4 g is reached: 3.2 \u2192 1.6 \u2192 0.8 \u2192 0.4 g, which is 3 half-lives. Time = 3 \xD7 45 = 135 days."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.4.4",
    items: ["I can define half-life.", "I can read a half-life from a decay graph or table.", "I can calculate the amount left after a whole number of half-lives.", "I can work backwards from a fraction left to find a time or age."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.4",
    label: "Learn it in full: Nuclear Reactions"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.5",
    title: "Benefits and considerations of radioisotopes in medicine, industry and the environment",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "An unstable isotope of an element that emits radiation as it decays."
  }, "radioisotope"), " is chosen for a job by its ", /*#__PURE__*/React.createElement("strong", null, "type of radiation"), " and its ", /*#__PURE__*/React.createElement("strong", null, "half-life"), "."), /*#__PURE__*/React.createElement("li", null, "Penetration: alpha is stopped by paper or skin; beta by a few millimetres of aluminium; gamma needs thick lead or concrete.")), /*#__PURE__*/React.createElement(TableWrap, null, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      minWidth: 420
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Use"), /*#__PURE__*/React.createElement("th", null, "Radioisotope"), /*#__PURE__*/React.createElement("th", null, "Why it suits the job"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Medical imaging (tracer)"), /*#__PURE__*/React.createElement("td", null, "Technetium-99m"), /*#__PURE__*/React.createElement("td", null, "Gamma passes out of the body to a camera; 6 h half-life means low dose")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Radiotherapy; sterilising equipment and food"), /*#__PURE__*/React.createElement("td", null, "Cobalt-60"), /*#__PURE__*/React.createElement("td", null, "Strong gamma kills cancer cells or microbes; 5.3 y half-life lasts years")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Smoke detectors"), /*#__PURE__*/React.createElement("td", null, "Americium-241"), /*#__PURE__*/React.createElement("td", null, "Alpha ionises air but is stopped by the case; 432 y half-life")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Paper/foil thickness gauge"), /*#__PURE__*/React.createElement("td", null, "a beta emitter"), /*#__PURE__*/React.createElement("td", null, "Beta is partly absorbed, so readings change with thickness")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Finding pipe leaks"), /*#__PURE__*/React.createElement("td", null, "Sodium-24"), /*#__PURE__*/React.createElement("td", null, "Gamma detected through soil; 15 h half-life, gone in days")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Dating and environmental tracing"), /*#__PURE__*/React.createElement("td", null, "Carbon-14; tracers in water"), /*#__PURE__*/React.createElement("td", null, "Dates once-living things; tracks water flow and pollution"))))), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Benefits"), ": diagnosis without surgery, cancer treatment, safer sterile products, fire safety, quality control, dating the past, tracking pollution."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Considerations"), ": radiation can damage cells and DNA (cancer risk), so doses must be kept low; shielding and protective equipment for workers; safe storage and disposal of long-lived waste; cost; security of sources."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Evaluating a medical use",
    problem: "Evaluate the use of technetium-99m to produce images of a patient's bones. (4 marks)",
    steps: ["Benefit 1: it emits gamma rays, which pass out of the body and are picked up by a camera, giving an image without surgery.", "Benefit 2: its short half-life (6 hours) means the activity drops quickly, so the patient receives a low total dose.", "Consideration: any ionising radiation can damage cells and slightly raises cancer risk; staff need shielding; it must be made fresh because it decays quickly.", "Judgement: the benefits of an accurate diagnosis clearly outweigh the small, short-lived risk, so it is a very suitable choice."],
    answer: "Technetium-99m is well suited: its gamma rays escape the body to form an image and its 6-hour half-life keeps the dose low. The risks (cell damage, handling, short shelf life) are small and managed, so the benefit of diagnosis outweighs them."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Why this isotope?",
    problem: "Explain why americium-241 is a suitable radioisotope for a household smoke detector. (3 marks)",
    steps: ["Type of radiation: it emits alpha particles, which ionise the air between two plates so a small current flows. Smoke absorbs the alpha particles, the current drops and the alarm sounds.", "Safety: alpha particles travel only a few centimetres in air and are stopped by the plastic case, so people are not exposed.", "Half-life: 432 years, so the source lasts far longer than the detector and never needs replacing."],
    answer: "It emits alpha radiation, which ionises the air to make the detector work but is stopped by the casing, and its 432-year half-life means it keeps working for the life of the detector."
  }), /*#__PURE__*/React.createElement(ExamTip, null, "\"Evaluate\" means give ", /*#__PURE__*/React.createElement("strong", null, "benefits and considerations"), ", then a ", /*#__PURE__*/React.createElement("strong", null, "judgement"), " (\"overall the benefits outweigh the risks because\u2026\"). Without a judgement, an evaluate answer usually cannot get full marks."), /*#__PURE__*/React.createElement(Practice, {
    title: "Using radioisotopes"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 49,
    question: "Which radioisotope would be most suitable as a tracer injected into a patient to image an organ?",
    options: ["An alpha emitter with a 432-year half-life", "A beta emitter with a 29-year half-life", "A gamma emitter with a 6-hour half-life", "A beta emitter with a 5730-year half-life"],
    correct: 2,
    explain: "Gamma rays leave the body to reach the camera, and a short half-life keeps the dose low. An alpha emitter is the worst choice: alpha cannot escape the body to be detected, and it does a lot of damage to nearby cells."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 50,
    question: "A paper mill uses a radioactive source and a detector to check paper thickness. Why is a beta emitter used?",
    options: ["Beta passes straight through paper whatever its thickness", "Beta is partly absorbed by paper, so the reading changes when thickness changes", "Beta is completely stopped by a single sheet of paper", "Beta has the longest half-life"],
    correct: 1,
    explain: "Some beta gets through and some is absorbed, so thicker paper lowers the count. Alpha is the radiation stopped by a sheet of paper, so it would give zero reading whatever the thickness; gamma passes through almost unchanged."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 51,
    question: "Why can carbon-14 dating not be used to find the age of a 2-million-year-old volcanic rock?",
    options: ["Rocks are too hard for carbon-14 to decay", "Carbon-14 only decays in water", "The rock was never alive, and after so many half-lives almost no carbon-14 would be left anyway", "Carbon-14 has a half-life that is too short to measure"],
    correct: 2,
    explain: "Carbon-14 dating works on things that were once living (they took in carbon), and only up to about 50 000 years, because after many half-lives there is too little left to measure. Rock hardness has no effect: radioactive decay is not affected by physical conditions."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 52,
    question: "Some foods are irradiated with gamma rays from cobalt-60 to kill bacteria. Evaluate this use of a radioisotope. (4 marks)",
    model: "Benefit: gamma rays kill bacteria and insects in the food, so it lasts longer and there is less food poisoning and waste. The food does not become radioactive, because it is only exposed to the radiation, not contaminated with the source. Considerations: the cobalt-60 source is very dangerous to people, so it must be heavily shielded and kept secure, and workers must be protected; the 5.3-year half-life means it must eventually be replaced and disposed of safely; some people worry about the taste or nutrients changing. Judgement: with strict shielding and handling, the benefits of safer, longer-lasting food outweigh the risks."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 53,
    question: "Engineers add a small amount of sodium-24 (a gamma emitter, half-life 15 hours) to water in an underground pipe to find a leak. Explain why sodium-24 is suitable. (3 marks)",
    model: "Sodium-24 emits gamma rays, which can pass through the soil, so a detector on the surface picks up a high reading where water containing it has leaked out. Its half-life of 15 hours is long enough to complete the test, but short enough that the activity falls to almost nothing within a few days, so it does not leave a long-term hazard in the water or soil."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 54,
    question: "Outline one benefit and one consideration of using radioisotopes for environmental monitoring, such as tracing how pollution spreads through a river. (2 marks)",
    model: "Benefit: a radioactive tracer can be detected in very tiny amounts, so scientists can see exactly where and how fast pollution moves and plan how to clean it up. Consideration: the tracer releases radiation into the environment, so only a small amount of a short half-life isotope should be used to avoid harming living things or people who use the water."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "6.4.5",
    items: ["I can describe uses of radioisotopes in medicine, industry and the environment.", "I can explain why the type of radiation and half-life suit a use.", "I can list risks and how they are managed.", "I can write an 'evaluate' answer with a clear judgement."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#6.4",
    label: "Learn it in full: Nuclear Reactions"
  })));
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
    "becquerel (Bq)": "The unit of activity: one decay per second."
  },
  sections: [{
    id: "6.1",
    label: "Conservation of mass",
    accent: "purple",
    blurb: "★★ The law of conservation of mass, and why mass seems to change in open systems.",
    points: ["6.1.1", "6.1.2"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section61, p);
    }
  }, {
    id: "6.2",
    label: "Chemical reactions",
    accent: "purple",
    blurb: "★★★ Reaction types, plus naming compounds, balanced equations and pH.",
    points: ["6.2.1", "6.2.2", "6.2.4", "6.2.5", "6.2.6"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section62, p);
    }
  }, {
    id: "6.3",
    label: "Reaction rate",
    accent: "purple",
    blurb: "★★★ Collision theory and rate investigations: variables, means, outliers and graphs.",
    points: ["6.3.1", "6.3.2"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section63, p);
    }
  }, {
    id: "6.4",
    label: "Nuclear reactions",
    accent: "purple",
    blurb: "★★★ Half-life and uses of radioisotopes, plus alpha and beta nuclear equations.",
    points: ["6.4.3", "6.4.4", "6.4.5"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section64, p);
    }
  }]
});

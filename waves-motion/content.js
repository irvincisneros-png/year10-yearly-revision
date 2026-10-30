/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp,
   ExamFocus, Recap, ExamTip, WorkedExample, Practice, SelfCheck, NotebookLink */
var _React = React,
  useState = _React.useState;
var NB = "https://irvincisneros-png.github.io/Year-10-Science/waves-motion/";

/* ---------- small SVG helpers ---------- */
/* sine-wave path: starts on the rest line going up (crest a quarter-wavelength in) */
function wavePath(x0, x1, yMid, amp, lambdaPx) {
  var step = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;
  var d = "";
  for (var x = x0; x <= x1 + 0.01; x += step) {
    var y = yMid - amp * Math.sin(2 * Math.PI * (x - x0) / lambdaPx);
    d += (d ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
  }
  return d;
}
/* particle rest positions shifted by s·sin(kx): compressions at x0 + λ/2, 3λ/2 … */
function longPositions(x0, x1, gap, lambdaPx, s) {
  var out = [];
  for (var p = x0; p <= x1 + 0.01; p += gap) out.push(p + s * Math.sin(2 * Math.PI * (p - x0) / lambdaPx));
  return out;
}
var lbl = {
  fill: "var(--ink)",
  fontSize: 12,
  fontFamily: "inherit"
};
var lblMuted = {
  fill: "var(--ink-muted)",
  fontSize: 11,
  fontFamily: "inherit"
};
function Arrowheads(_ref) {
  var id = _ref.id,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? "var(--ink)" : _ref$color;
  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: id,
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 z",
    style: {
      fill: color
    }
  })));
}

/* generic line graph with grid. xs/ys: axis maps; pts in data units */
function LineGraph(_ref2) {
  var id = _ref2.id,
    _ref2$w = _ref2.w,
    w = _ref2$w === void 0 ? 370 : _ref2$w,
    _ref2$h = _ref2.h,
    h = _ref2$h === void 0 ? 250 : _ref2$h,
    xMax = _ref2.xMax,
    yMax = _ref2.yMax,
    xStep = _ref2.xStep,
    yStep = _ref2.yStep,
    xLabel = _ref2.xLabel,
    yLabel = _ref2.yLabel,
    pts = _ref2.pts,
    _ref2$shade = _ref2.shade,
    shade = _ref2$shade === void 0 ? false : _ref2$shade,
    children = _ref2.children,
    aria = _ref2.aria;
  var L = 50,
    R = w - 20,
    T = 30,
    B = 210;
  var X = function X(t) {
    return L + t / xMax * (R - L);
  };
  var Y = function Y(v) {
    return B - v / yMax * (B - T);
  };
  var xt = [];
  for (var t = 0; t <= xMax + 1e-9; t += xStep) xt.push(t);
  var yt = [];
  for (var v = 0; v <= yMax + 1e-9; v += yStep) yt.push(v);
  var d = pts.map(function (p, i) {
    return (i ? "L " : "M ") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1);
  }).join(" ");
  var area = d + " L " + X(pts[pts.length - 1][0]).toFixed(1) + " " + B + " L " + X(pts[0][0]).toFixed(1) + " " + B + " Z";
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": aria,
    width: "100%",
    viewBox: "0 0 ".concat(w, " ").concat(h),
    style: {
      display: "block",
      maxWidth: 560,
      margin: "0 auto"
    }
  }, xt.map(function (t) {
    return /*#__PURE__*/React.createElement("line", {
      key: "gx" + t,
      x1: X(t),
      y1: T,
      x2: X(t),
      y2: B,
      style: {
        stroke: "var(--border)"
      },
      strokeWidth: "1"
    });
  }), yt.map(function (v) {
    return /*#__PURE__*/React.createElement("line", {
      key: "gy" + v,
      x1: L,
      y1: Y(v),
      x2: R,
      y2: Y(v),
      style: {
        stroke: "var(--border)"
      },
      strokeWidth: "1"
    });
  }), shade && /*#__PURE__*/React.createElement("path", {
    d: area,
    style: {
      fill: "var(--accent)"
    },
    opacity: "0.18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: B,
    x2: R,
    y2: B,
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: T,
    x2: L,
    y2: B,
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5"
  }), xt.map(function (t) {
    return /*#__PURE__*/React.createElement("text", {
      key: "tx" + t,
      x: X(t),
      y: B + 15,
      textAnchor: "middle",
      style: lblMuted
    }, t);
  }), yt.map(function (v) {
    return /*#__PURE__*/React.createElement("text", {
      key: "ty" + v,
      x: L - 6,
      y: Y(v) + 4,
      textAnchor: "end",
      style: lblMuted
    }, v);
  }), /*#__PURE__*/React.createElement("text", {
    x: (L + R) / 2,
    y: h - 6,
    textAnchor: "middle",
    style: lbl
  }, xLabel), /*#__PURE__*/React.createElement("text", {
    x: 14,
    y: (T + B) / 2,
    textAnchor: "middle",
    transform: "rotate(-90 14 ".concat((T + B) / 2, ")"),
    style: lbl
  }, yLabel), children && children({
    X: X,
    Y: Y
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    style: {
      stroke: "var(--accent)"
    },
    strokeWidth: "3",
    strokeLinejoin: "round"
  }), pts.map(function (p, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: "p" + i,
      cx: X(p[0]),
      cy: Y(p[1]),
      r: "3.5",
      style: {
        fill: "var(--accent-deep)"
      }
    });
  }));
}

/* ---------- figures ---------- */
function TransverseFig() {
  // λ = 120 px, A = 45 px, rest line y = 90. Crests at x = 50, 170; troughs at 110, 230.
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Transverse wave with a crest, a trough, the wavelength measured crest to crest and the amplitude measured from the rest position to a crest",
    width: "100%",
    viewBox: "0 0 400 180",
    style: {
      display: "block",
      maxWidth: 560,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Arrowheads, {
    id: "tw-ah"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "90",
    x2: "330",
    y2: "90",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeDasharray: "5 4",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "10",
    y: "106",
    style: lblMuted
  }, "rest position"), /*#__PURE__*/React.createElement("path", {
    d: wavePath(20, 280, 90, 45, 120),
    fill: "none",
    style: {
      stroke: "var(--accent)"
    },
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "50",
    y: "36",
    textAnchor: "middle",
    style: lbl
  }, "crest"), /*#__PURE__*/React.createElement("text", {
    x: "80",
    y: "150",
    textAnchor: "end",
    style: lbl
  }, "trough"), /*#__PURE__*/React.createElement("text", {
    x: "170",
    y: "36",
    textAnchor: "middle",
    style: lbl
  }, "crest"), /*#__PURE__*/React.createElement("line", {
    x1: "170",
    y1: "45",
    x2: "330",
    y2: "45",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeDasharray: "3 3",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "320",
    y1: "90",
    x2: "320",
    y2: "47",
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5",
    markerEnd: "url(#tw-ah)",
    markerStart: "url(#tw-ah)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "327",
    y: "72",
    style: lbl
  }, "amplitude"), /*#__PURE__*/React.createElement("line", {
    x1: "110",
    y1: "140",
    x2: "110",
    y2: "172",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "230",
    y1: "140",
    x2: "230",
    y2: "172",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "112",
    y1: "166",
    x2: "228",
    y2: "166",
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5",
    markerEnd: "url(#tw-ah)",
    markerStart: "url(#tw-ah)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "238",
    y: "170",
    style: lbl
  }, "wavelength (\u03BB)"));
}
function LongitudinalFig(_ref3) {
  var _ref3$dots = _ref3.dots,
    dots = _ref3$dots === void 0 ? false : _ref3$dots,
    _ref3$speaker = _ref3.speaker,
    speaker = _ref3$speaker === void 0 ? false : _ref3$speaker,
    _ref3$ariaExtra = _ref3.ariaExtra,
    ariaExtra = _ref3$ariaExtra === void 0 ? "" : _ref3$ariaExtra;
  // λ = 120 px. Compressions at x0 + 60 and x0 + 180; rarefactions at x0, x0 + 120, x0 + 240.
  var x0 = speaker ? 70 : 30;
  var xs = longPositions(x0, x0 + 300, 6, 120, 12);
  var mk = "url(#" + (speaker ? "sp-ah" : "lw-ah") + ")";
  var top = 40,
    bot = 110;
  var c1 = x0 + 60,
    c2 = x0 + 180,
    r1 = x0 + 120;
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Longitudinal wave: particles bunched together at compressions and spread out at rarefactions; the wavelength is the distance from one compression to the next" + ariaExtra,
    width: "100%",
    viewBox: "0 0 400 175",
    style: {
      display: "block",
      maxWidth: 560,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Arrowheads, {
    id: speaker ? "sp-ah" : "lw-ah"
  }), speaker && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: "12",
    y: "52",
    width: "22",
    height: "46",
    rx: "3",
    style: {
      fill: "var(--ink-muted)"
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: "M34 60 L56 40 L56 110 L34 90 Z",
    style: {
      fill: "var(--card)",
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "34",
    y: "128",
    textAnchor: "middle",
    style: lblMuted
  }, "speaker"), /*#__PURE__*/React.createElement("text", {
    x: "34",
    y: "141",
    textAnchor: "middle",
    style: lblMuted
  }, "cone")), xs.map(function (x, i) {
    return dots ? [0, 1, 2, 3, 4, 5].map(function (r) {
      return /*#__PURE__*/React.createElement("circle", {
        key: i + "-" + r,
        cx: x,
        cy: top + 6 + r * 12,
        r: "2",
        style: {
          fill: "var(--accent)"
        }
      });
    }) : /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: x,
      y1: top,
      x2: x,
      y2: bot,
      style: {
        stroke: "var(--accent)"
      },
      strokeWidth: "1.6"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: c1,
    y: "30",
    textAnchor: "middle",
    style: lbl
  }, "compression"), /*#__PURE__*/React.createElement("text", {
    x: x0 + 240,
    y: "30",
    textAnchor: "middle",
    style: lbl
  }, "rarefaction"), /*#__PURE__*/React.createElement("line", {
    x1: c1,
    y1: "114",
    x2: c1,
    y2: "130",
    style: {
      stroke: "var(--ink-muted)"
    }
  }), /*#__PURE__*/React.createElement("line", {
    x1: c2,
    y1: "114",
    x2: c2,
    y2: "130",
    style: {
      stroke: "var(--ink-muted)"
    }
  }), /*#__PURE__*/React.createElement("line", {
    x1: r1,
    y1: "124",
    x2: c2 - 2,
    y2: "124",
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5",
    markerEnd: mk
  }), /*#__PURE__*/React.createElement("line", {
    x1: r1,
    y1: "124",
    x2: c1 + 2,
    y2: "124",
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5",
    markerEnd: mk
  }), /*#__PURE__*/React.createElement("text", {
    x: r1,
    y: "142",
    textAnchor: "middle",
    style: lbl
  }, "wavelength (\u03BB)"), /*#__PURE__*/React.createElement("line", {
    x1: x0,
    y1: "162",
    x2: x0 + 40,
    y2: "162",
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5",
    markerEnd: mk,
    markerStart: mk
  }), /*#__PURE__*/React.createElement("text", {
    x: x0 + 48,
    y: "166",
    style: lblMuted
  }, "particles vibrate"), /*#__PURE__*/React.createElement("line", {
    x1: x0 + 170,
    y1: "162",
    x2: x0 + 220,
    y2: "162",
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5",
    markerEnd: mk
  }), /*#__PURE__*/React.createElement("text", {
    x: x0 + 228,
    y: "166",
    style: lblMuted
  }, "energy travels"));
}
function SpectrumFig() {
  var names = [["Radio"], ["Micro-", "waves"], ["Infra-", "red"], ["Visible"], ["Ultra-", "violet"], ["X-rays"], ["Gamma", "rays"]];
  var w = 52,
    x0 = 18;
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Electromagnetic spectrum in order: radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays. Wavelength decreases and frequency and energy increase from radio to gamma. All travel at 3.0 times 10 to the 8 metres per second in a vacuum.",
    width: "100%",
    viewBox: "0 0 400 170",
    style: {
      display: "block",
      maxWidth: 560,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Arrowheads, {
    id: "em-ah"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "em-vis",
    x1: "0",
    x2: "1",
    y1: "0",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#d33"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.2",
    stopColor: "#f80"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.4",
    stopColor: "#ec0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.6",
    stopColor: "#3a3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.8",
    stopColor: "#36c"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#82c"
  }))), names.map(function (n, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: x0 + i * w,
      y: "20",
      width: w - 2,
      height: "56",
      rx: "6",
      style: {
        fill: "color-mix(in srgb, var(--accent) 22%, var(--card))",
        stroke: "var(--accent-deep)"
      },
      strokeWidth: "1.2"
    }), n.map(function (t, j) {
      return /*#__PURE__*/React.createElement("text", {
        key: j,
        x: x0 + i * w + (w - 2) / 2,
        y: n.length === 1 ? 52 : 45 + j * 14,
        textAnchor: "middle",
        style: _objectSpread(_objectSpread({}, lbl), {}, {
          fontSize: 11,
          fill: "var(--ink)",
          fontWeight: 700
        })
      }, t);
    }));
  }), /*#__PURE__*/React.createElement("rect", {
    x: x0 + 3 * w + 4,
    y: "64",
    width: w - 10,
    height: "6",
    rx: "2",
    fill: "url(#em-vis)"
  }), /*#__PURE__*/React.createElement("path", {
    d: wavePath(x0, x0 + 160, 98, 8, 80),
    fill: "none",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: wavePath(x0 + 200, x0 + 360, 98, 8, 16, 1),
    fill: "none",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "80",
    y1: "124",
    x2: "340",
    y2: "124",
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5",
    markerEnd: "url(#em-ah)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "74",
    y: "128",
    textAnchor: "end",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontSize: 11
    })
  }, "radio"), /*#__PURE__*/React.createElement("text", {
    x: "346",
    y: "128",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontSize: 11
    })
  }, "gamma"), /*#__PURE__*/React.createElement("text", {
    x: "220",
    y: "140",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontSize: 11
    })
  }, "frequency \u2191 \xB7 energy \u2191 \xB7 wavelength \u2193"), /*#__PURE__*/React.createElement("text", {
    x: "200",
    y: "162",
    textAnchor: "middle",
    style: lblMuted
  }, "All travel at 3.0 \xD7 10\u2078 m/s in a vacuum"));
}
function EarChainFig() {
  var box = function box(x, y, w, lines, k) {
    return /*#__PURE__*/React.createElement("g", {
      key: k
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: w,
      height: "50",
      rx: "8",
      style: {
        fill: "var(--card)",
        stroke: "var(--accent-deep)"
      },
      strokeWidth: "1.5"
    }), lines.map(function (t, j) {
      return /*#__PURE__*/React.createElement("text", {
        key: j,
        x: x + w / 2,
        y: lines.length === 1 ? y + 29 : y + 22 + j * 14,
        textAnchor: "middle",
        style: _objectSpread(_objectSpread({}, lbl), {}, {
          fontSize: 11,
          fontWeight: 600
        })
      }, t);
    }));
  };
  var band = function band(y, text, anchorEnd) {
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: y,
      width: "352",
      height: "94",
      rx: "10",
      style: {
        fill: "color-mix(in srgb, var(--accent) 22%, var(--card))"
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: anchorEnd ? 348 : 12,
      y: y + 18,
      textAnchor: anchorEnd ? "end" : "start",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11,
        fontWeight: 700,
        fill: "var(--ink)"
      })
    }, text));
  };
  var ar = function ar(x1, y1, x2, y2, k) {
    return /*#__PURE__*/React.createElement("line", {
      key: k,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      style: {
        stroke: "var(--ink)"
      },
      strokeWidth: "1.5",
      markerEnd: "url(#ear-ah)"
    });
  };
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Flow chart of hearing. Outer ear: pinna, ear canal, eardrum. Middle ear: hammer, anvil, stirrup, oval window. Inner ear: cochlea fluid, hair cells, auditory nerve, brain.",
    width: "100%",
    viewBox: "0 0 360 330",
    style: {
      display: "block",
      maxWidth: 520,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Arrowheads, {
    id: "ear-ah"
  }), band(4, "Outer ear: sound waves in air", false), band(118, "Middle ear: vibrations in tiny bones", false), band(232, "Inner ear: fluid waves → electrical signals", true), box(10, 36, 100, ["Pinna"], "a"), box(130, 36, 100, ["Ear canal"], "b"), box(250, 36, 100, ["Eardrum"], "c"), ar(111, 61, 128, 61, "a1"), ar(231, 61, 248, 61, "a2"), box(274, 150, 77, ["Hammer"], "d"), box(186, 150, 77, ["Anvil"], "e"), box(98, 150, 77, ["Stirrup"], "f"), box(10, 150, 77, ["Oval", "window"], "g"), ar(273, 175, 265, 175, "a3"), ar(185, 175, 177, 175, "a4"), ar(97, 175, 89, 175, "a5"), ar(310, 87, 310, 148, "a6"), box(10, 264, 77, ["Cochlea", "(fluid)"], "h"), box(98, 264, 77, ["Hair", "cells"], "i"), box(186, 264, 77, ["Auditory", "nerve"], "j"), box(274, 264, 77, ["Brain"], "k"), ar(88, 289, 96, 289, "a7"), ar(176, 289, 184, 289, "a8"), ar(264, 289, 272, 289, "a9"), ar(48, 201, 48, 262, "a10"));
}
function LightFig() {
  var s = {
    stroke: "var(--ink)"
  };
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Left: reflection from a mirror, the angle of incidence equals the angle of reflection, both measured from the normal. Right: light passing from air into water slows down and bends towards the normal.",
    width: "100%",
    viewBox: "0 0 360 200",
    style: {
      display: "block",
      maxWidth: 560,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Arrowheads, {
    id: "lt-ah",
    color: "var(--accent-deep)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "90",
    y: "16",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontWeight: 700
    })
  }, "Reflection"), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "150",
    x2: "165",
    y2: "150",
    style: s,
    strokeWidth: "2.5"
  }), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) {
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: 20 + i * 15,
      y1: "152",
      x2: 12 + i * 15,
      y2: "160",
      style: {
        stroke: "var(--ink-muted)"
      }
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "90",
    y: "176",
    textAnchor: "middle",
    style: lblMuted
  }, "mirror"), /*#__PURE__*/React.createElement("line", {
    x1: "90",
    y1: "40",
    x2: "90",
    y2: "150",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeDasharray: "5 4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "95",
    y: "48",
    style: lblMuted
  }, "normal"), /*#__PURE__*/React.createElement("line", {
    x1: "22.5",
    y1: "69.6",
    x2: "89",
    y2: "149",
    style: {
      stroke: "var(--accent)"
    },
    strokeWidth: "2.5",
    markerEnd: "url(#lt-ah)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "90",
    y1: "150",
    x2: "157.5",
    y2: "69.6",
    style: {
      stroke: "var(--accent)"
    },
    strokeWidth: "2.5",
    markerEnd: "url(#lt-ah)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 90 120 A 30 30 0 0 0 70.7 127",
    fill: "none",
    style: s,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 90 120 A 30 30 0 0 1 109.3 127",
    fill: "none",
    style: s,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "75.6",
    y: "112",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontStyle: "italic"
    })
  }, "i"), /*#__PURE__*/React.createElement("text", {
    x: "104.4",
    y: "112",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontStyle: "italic"
    })
  }, "r"), /*#__PURE__*/React.createElement("text", {
    x: "275",
    y: "16",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontWeight: 700
    })
  }, "Refraction"), /*#__PURE__*/React.createElement("rect", {
    x: "190",
    y: "95",
    width: "165",
    height: "90",
    style: {
      fill: "color-mix(in srgb, var(--accent) 22%, var(--card))"
    }
  }), /*#__PURE__*/React.createElement("line", {
    x1: "190",
    y1: "95",
    x2: "355",
    y2: "95",
    style: s,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "196",
    y: "88",
    style: lblMuted
  }, "air"), /*#__PURE__*/React.createElement("text", {
    x: "196",
    y: "112",
    style: lblMuted
  }, "water"), /*#__PURE__*/React.createElement("line", {
    x1: "275",
    y1: "25",
    x2: "275",
    y2: "185",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeDasharray: "5 4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "280",
    y: "36",
    style: lblMuted
  }, "normal"), /*#__PURE__*/React.createElement("line", {
    x1: "213.7",
    y1: "43.6",
    x2: "274.3",
    y2: "94.4",
    style: {
      stroke: "var(--accent)"
    },
    strokeWidth: "2.5",
    markerEnd: "url(#lt-ah)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "275",
    y1: "95",
    x2: "323.8",
    y2: "164.6",
    style: {
      stroke: "var(--accent)"
    },
    strokeWidth: "2.5",
    markerEnd: "url(#lt-ah)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 275 67 A 28 28 0 0 0 253.6 77",
    fill: "none",
    style: s,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 275 123 A 28 28 0 0 0 291.1 117.9",
    fill: "none",
    style: s,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "262",
    y: "62",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lblMuted), {}, {
      fontSize: 10
    })
  }, "50\xB0"), /*#__PURE__*/React.createElement("text", {
    x: "289",
    y: "138",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lblMuted), {}, {
      fontSize: 10
    })
  }, "35\xB0"));
}
function LiftFig() {
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Force diagram of a lift car: tension of 11 800 newtons upward and weight of 9 800 newtons downward; net force 2 000 newtons upward.",
    width: "100%",
    viewBox: "0 0 360 220",
    style: {
      display: "block",
      maxWidth: 440,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Arrowheads, {
    id: "lf-ah",
    color: "var(--accent-deep)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "150",
    y: "82",
    width: "60",
    height: "60",
    rx: "4",
    style: {
      fill: "var(--card)",
      stroke: "var(--ink)"
    },
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "116",
    textAnchor: "middle",
    style: lblMuted
  }, "lift"), /*#__PURE__*/React.createElement("line", {
    x1: "180",
    y1: "82",
    x2: "180",
    y2: "12",
    style: {
      stroke: "var(--accent-deep)"
    },
    strokeWidth: "3.5",
    markerEnd: "url(#lf-ah)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "192",
    y: "36",
    style: lbl
  }, "Tension"), /*#__PURE__*/React.createElement("text", {
    x: "192",
    y: "52",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontWeight: 700
    })
  }, "11 800 N"), /*#__PURE__*/React.createElement("line", {
    x1: "180",
    y1: "142",
    x2: "180",
    y2: "200",
    style: {
      stroke: "var(--accent-deep)"
    },
    strokeWidth: "3.5",
    markerEnd: "url(#lf-ah)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "192",
    y: "184",
    style: lbl
  }, "Weight"), /*#__PURE__*/React.createElement("text", {
    x: "192",
    y: "200",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontWeight: 700
    })
  }, "9 800 N"), /*#__PURE__*/React.createElement("text", {
    x: "136",
    y: "102",
    textAnchor: "end",
    style: lblMuted
  }, "Net force"), /*#__PURE__*/React.createElement("text", {
    x: "136",
    y: "118",
    textAnchor: "end",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontWeight: 700
    })
  }, "2 000 N up"));
}

/* ---------- interactive: v = fλ at a fixed speed ---------- */
function WaveEqLab() {
  var _useState = useState(2),
    _useState2 = _slicedToArray(_useState, 2),
    f = _useState2[0],
    setF = _useState2[1];
  var _useState3 = useState(4),
    _useState4 = _slicedToArray(_useState3, 2),
    v = _useState4[0],
    setV = _useState4[1];
  var lam = v / f;
  var pxPerM = 330 / 8; // 8 m window
  var lamPx = lam * pxPerM;
  var x0 = 20;
  var c1 = x0 + lamPx / 4,
    c2 = c1 + lamPx;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Same rope, different frequency",
    subtitle: "A wave is sent along a long rope. The wave speed depends on the rope (the medium), not on how fast you shake it.",
    takeaway: "In one medium the speed stays the same. Shake faster (higher f) and the wavelength gets shorter, so f \xD7 \u03BB always equals v."
  }, /*#__PURE__*/React.createElement(SegToggle, {
    value: v,
    onChange: setV,
    options: [{
      value: 4,
      label: "Loose rope: 4 m/s"
    }, {
      value: 8,
      label: "Tight rope: 8 m/s"
    }]
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Frequency, f",
    min: 1,
    max: 8,
    step: 1,
    value: f,
    onChange: setF,
    unit: " Hz"
  }), /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Wave on a rope with wavelength ".concat(lam.toFixed(2), " metres"),
    width: "100%",
    viewBox: "0 0 370 120",
    style: {
      display: "block",
      maxWidth: 560,
      margin: "8px auto"
    }
  }, /*#__PURE__*/React.createElement(Arrowheads, {
    id: "wl-ah"
  }), /*#__PURE__*/React.createElement("line", {
    x1: x0,
    y1: "62",
    x2: "350",
    y2: "62",
    style: {
      stroke: "var(--ink-muted)"
    },
    strokeDasharray: "4 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: wavePath(x0, 350, 62, 26, lamPx, 1),
    fill: "none",
    style: {
      stroke: "var(--accent)"
    },
    strokeWidth: "3"
  }), c2 <= 350 && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: c1,
    y1: "20",
    x2: c2,
    y2: "20",
    style: {
      stroke: "var(--ink)"
    },
    strokeWidth: "1.5",
    markerEnd: "url(#wl-ah)",
    markerStart: "url(#wl-ah)"
  }), /*#__PURE__*/React.createElement("text", {
    x: Math.min(Math.max((c1 + c2) / 2, 30), 330),
    y: "13",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontSize: 11
    })
  }, "\u03BB = ", +lam.toFixed(2), " m")), c2 > 350 && /*#__PURE__*/React.createElement("text", {
    x: "185",
    y: "14",
    textAnchor: "middle",
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontSize: 11
    })
  }, "\u03BB = ", +lam.toFixed(2), " m (longer than the window)"), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "112",
    style: lblMuted
  }, "0 m"), /*#__PURE__*/React.createElement("text", {
    x: "350",
    y: "112",
    textAnchor: "end",
    style: lblMuted
  }, "8 m")), /*#__PURE__*/React.createElement("div", {
    className: "stat-row",
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: v + " m/s",
    label: "speed v (set by the rope)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: f + " Hz",
    label: "frequency f"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: +lam.toFixed(2) + " m",
    label: "wavelength \u03BB = v \xF7 f"
  })));
}
var tableWrap = {
  overflowX: "auto"
};

/* =========================================================
   SECTION 7.1 WAVE PROPERTIES
   ========================================================= */
function Section71(_ref4) {
  var progress = _ref4.progress,
    setProgress = _ref4.setProgress;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.1 Wave properties"), /*#__PURE__*/React.createElement("h1", null, "Waves carry energy, not matter"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Know the two wave types and their features, the EM spectrum and its uses, and how to use v = f\u03BB.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.3",
    title: "Transverse and longitudinal waves and their features",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A wave where the particles vibrate at right angles (perpendicular) to the direction the energy travels."
  }, "transverse wave"), " makes particles vibrate ", /*#__PURE__*/React.createElement("strong", null, "at right angles"), " to the direction of energy transfer. It has ", /*#__PURE__*/React.createElement("strong", null, "crests"), " (highest points) and ", /*#__PURE__*/React.createElement("strong", null, "troughs"), " (lowest points). Examples: light and all EM waves, a vibrating guitar string, ripples on water."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A wave where the particles vibrate back and forth parallel to the direction the energy travels."
  }, "longitudinal wave"), " makes particles vibrate ", /*#__PURE__*/React.createElement("strong", null, "back and forth along"), " the direction of energy transfer. It has ", /*#__PURE__*/React.createElement("strong", null, "compressions"), " (particles squashed together) and ", /*#__PURE__*/React.createElement("strong", null, "rarefactions"), " (particles spread apart). Examples: sound, ultrasound, P-waves in earthquakes."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Wavelength (\u03BB)"), ": the distance between two matching points next to each other: crest to crest, trough to trough, or compression to compression. Unit: metres (m)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Amplitude"), ": the biggest displacement of a particle from its ", /*#__PURE__*/React.createElement("strong", null, "rest position"), ". It is measured from the middle line to a crest, ", /*#__PURE__*/React.createElement("em", null, "not"), " crest to trough. Bigger amplitude = more energy."), /*#__PURE__*/React.createElement("li", null, "Waves transfer ", /*#__PURE__*/React.createElement("strong", null, "energy"), ", not matter. The particles only vibrate about a fixed spot.")), /*#__PURE__*/React.createElement(Figure, {
    num: "1",
    caption: "A transverse wave. Wavelength is one full cycle (trough to trough, or crest to crest); amplitude is rest position to crest."
  }, /*#__PURE__*/React.createElement(TransverseFig, null)), /*#__PURE__*/React.createElement(Figure, {
    num: "2",
    caption: "A longitudinal wave. Wavelength is the distance from one compression to the next."
  }, /*#__PURE__*/React.createElement(LongitudinalFig, null))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Reading ocean swell",
    problem: "A surf report says the swell has a height of 3.0 m from trough to crest, and the crests are 80 m apart. State the amplitude and the wavelength of the swell.",
    steps: ["Wavelength is crest to crest, so λ = 80 m.", "The 3.0 m is trough to crest. That is twice the amplitude, because amplitude is measured from the rest position (halfway) to a crest.", "Amplitude = 3.0 m ÷ 2 = 1.5 m."],
    answer: "Amplitude = 1.5 m, wavelength = 80 m."
  }), /*#__PURE__*/React.createElement(ExamTip, null, /*#__PURE__*/React.createElement("p", null, "\"Compare\" means give a similarity ", /*#__PURE__*/React.createElement("em", null, "and"), " a difference. For wave types, the key difference is the direction particles vibrate compared with the direction energy travels. Always name the features (crest/trough or compression/rarefaction) and give an example of each.")), /*#__PURE__*/React.createElement(Practice, {
    title: "Transverse and longitudinal waves"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "In a longitudinal wave, what is a rarefaction?",
    options: ["A region where the particles are pushed close together", "A region where the particles are spread further apart", "The highest point of the wave", "The distance between two compressions"],
    correct: 1,
    explain: "A rarefaction is where particles are spread out (lower pressure). Particles pushed close together is a compression, the opposite. 'Highest point' is a crest, which belongs to transverse waves."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 2,
    question: "A guitar string is plucked and a wave travels along it from the bridge towards the neck. How do the parts of the string move?",
    options: ["Along the string, towards the neck", "Back and forth along the length of the string", "Up and down, at right angles to the length of the string", "They travel with the wave to the neck and stay there"],
    correct: 2,
    explain: "A wave on a string is transverse: each bit of string moves at right angles to the direction the wave travels. 'Back and forth along the string' would make it longitudinal. The string itself does not travel to the neck: only energy does."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 3,
    question: "On a grid, a student draws a wave. The rest line is 4 cm below each crest, and 3 complete waves fit across 36 cm. (a) State the amplitude. (b) Calculate the wavelength. (c) The student says the amplitude is 8 cm because the crest is 8 cm above the trough. Explain the mistake. (3 marks)",
    model: "(a) Amplitude = 4 cm. (b) Wavelength = 36 cm \xF7 3 = 12 cm. (c) Amplitude is measured from the rest position to a crest (or to a trough), not from trough to crest. 8 cm is twice the amplitude."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "Compare transverse and longitudinal waves. Give an example of each in your answer. (3 marks)",
    model: "Both types of wave transfer energy from one place to another without moving matter along with them. In a transverse wave, such as a Wi-Fi signal or a wave on a guitar string, the particles or fields vibrate at right angles to the direction the energy travels, forming crests and troughs. In a longitudinal wave, such as ultrasound, the particles vibrate back and forth parallel to the direction of travel, forming compressions and rarefactions."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.1.3",
    items: ["I can describe how particles move in transverse and longitudinal waves.", "I can label crest, trough, compression, rarefaction, wavelength and amplitude on a diagram.", "I can measure amplitude from the rest position, not trough to crest.", "I can give an example of each type of wave."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.1",
    label: "Learn it in full: Wave Properties"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.4",
    title: "Comparing the waves of the electromagnetic spectrum",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Order (long wavelength to short): ", /*#__PURE__*/React.createElement("strong", null, "radio, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays"), ". Memory hook: ", /*#__PURE__*/React.createElement("em", null, "\"Raging Martians Invaded Venus Using X-ray Guns.\"")), /*#__PURE__*/React.createElement("li", null, "From radio to gamma: ", /*#__PURE__*/React.createElement("strong", null, "wavelength decreases"), ", ", /*#__PURE__*/React.createElement("strong", null, "frequency increases"), ", ", /*#__PURE__*/React.createElement("strong", null, "energy increases"), "."), /*#__PURE__*/React.createElement("li", null, "All EM waves are transverse, need no medium and travel at the ", /*#__PURE__*/React.createElement("strong", null, "same speed in a vacuum"), ": 3.0 \xD7 10\u2078 m/s (the speed of light)."), /*#__PURE__*/React.createElement("li", null, "Visible light is a small band: red has the longest wavelength, violet the shortest."), /*#__PURE__*/React.createElement("li", null, "High-energy waves (UV, X-rays, gamma) are ", /*#__PURE__*/React.createElement("strong", null, "ionising"), ": they can damage cells and DNA.")), /*#__PURE__*/React.createElement(Figure, {
    num: "3",
    caption: "The EM spectrum. Moving right, waves get shorter, more frequent and more energetic, but never faster."
  }, /*#__PURE__*/React.createElement(SpectrumFig, null))), /*#__PURE__*/React.createElement(Practice, {
    title: "The EM spectrum"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "Which type of EM wave has a longer wavelength than visible light but a shorter wavelength than microwaves?",
    options: ["Ultraviolet", "Infrared", "Radio waves", "X-rays"],
    correct: 1,
    explain: "Infrared sits between microwaves and visible light. Ultraviolet is on the other side of visible light (shorter wavelength than visible), so it is the tempting wrong answer if you mix up the order."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "In a vacuum, how do X-rays compare with the radio waves used by an FM station?",
    options: ["X-rays travel faster and have a higher frequency", "X-rays travel at the same speed and have a longer wavelength", "X-rays travel at the same speed and have a higher frequency", "X-rays travel slower because they carry more energy"],
    correct: 2,
    explain: "All EM waves travel at 3.0 \xD7 10\u2078 m/s in a vacuum. X-rays are near the high-frequency, short-wavelength end. Higher energy does not mean a higher speed, which is the common trap."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.1.4",
    items: ["I can list the EM spectrum in order from radio to gamma.", "I can state how wavelength, frequency and energy change across the spectrum.", "I can state that all EM waves travel at the same speed in a vacuum."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.1",
    label: "Learn it in full: Wave Properties"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.6",
    title: "The wave equation: v = f \u03BB",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "v = f \u03BB"), ". Wave speed ", /*#__PURE__*/React.createElement("strong", null, "v"), " in m/s, ", /*#__PURE__*/React.createElement(Term, {
    def: "The number of complete waves passing a point each second, in hertz (Hz)."
  }, "frequency"), " ", /*#__PURE__*/React.createElement("strong", null, "f"), " in hertz (Hz), wavelength ", /*#__PURE__*/React.createElement("strong", null, "\u03BB"), " in metres (m)."), /*#__PURE__*/React.createElement("li", null, "Rearranged: ", /*#__PURE__*/React.createElement("strong", null, "f = v \xF7 \u03BB"), " and ", /*#__PURE__*/React.createElement("strong", null, "\u03BB = v \xF7 f"), "."), /*#__PURE__*/React.createElement("li", null, "Convert first: kHz \xD7 1 000, MHz \xD7 1 000 000 (10\u2076), GHz \xD7 10\u2079; cm \xF7 100, mm \xF7 1 000. 1 Hz = 1 wave per second."), /*#__PURE__*/React.createElement("li", null, "In one medium the speed is fixed, so if frequency goes up, wavelength goes down (they are inversely proportional)."), /*#__PURE__*/React.createElement("li", null, "Useful speeds: EM waves 3.0 \xD7 10\u2078 m/s; sound in air about 340 m/s; sound in soft tissue about 1 500 m/s."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Wavelength of a Wi-Fi signal",
    problem: "A Wi-Fi router sends microwaves at a frequency of 2.4 GHz. Microwaves travel at 3.0 \xD7 10\u2078 m/s. Calculate the wavelength in centimetres.",
    steps: ["Convert the frequency: 2.4 GHz = 2.4 × 10⁹ Hz.", "Rearrange v = f λ to get λ = v ÷ f.", "Substitute: λ = (3.0 × 10⁸) ÷ (2.4 × 10⁹) = 0.125 m.", "Convert to centimetres: 0.125 m × 100 = 12.5 cm."],
    answer: "\u03BB = 0.125 m = 12.5 cm."
  }), /*#__PURE__*/React.createElement(WaveEqLab, null), /*#__PURE__*/React.createElement(ExamTip, null, /*#__PURE__*/React.createElement("p", null, "\"Calculate\" questions usually give a mark for the correct working and a mark for the answer with its unit. Write the formula, substitute with units converted, then give the answer with a unit.")), /*#__PURE__*/React.createElement(Practice, {
    title: "Using v = f \u03BB"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 7,
    question: "Ocean swell has a wavelength of 60 m and a frequency of 0.10 Hz. What is the speed of the swell?",
    options: ["0.0017 m/s", "6.0 m/s", "60 m/s", "600 m/s"],
    correct: 1,
    explain: "v = f \u03BB = 0.10 \xD7 60 = 6.0 m/s. 600 m/s comes from dividing 60 by 0.10 instead of multiplying."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 8,
    question: "A guitar plays a note of 220 Hz. The sound travels through air at 330 m/s. What is its wavelength?",
    options: ["1.5 m", "0.67 m", "72 600 m", "1.5 cm"],
    correct: 0,
    explain: "\u03BB = v \xF7 f = 330 \xF7 220 = 1.5 m. 0.67 m comes from dividing the wrong way (220 \xF7 330), and 72 600 m comes from multiplying."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 9,
    question: "An ultrasound probe sends waves through soft tissue at 1 500 m/s. The wavelength is 0.50 mm. Calculate the frequency in MHz. Show your working. (3 marks)",
    model: "\u03BB = 0.50 mm = 0.50 \xF7 1 000 = 0.000 50 m (5.0 \xD7 10\u207B\u2074 m). f = v \xF7 \u03BB = 1 500 \xF7 0.000 50 = 3 000 000 Hz. 3 000 000 Hz \xF7 1 000 000 = 3.0 MHz."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 10,
    question: "A radio station broadcasts at 100 MHz. Radio waves travel at 3.0 \xD7 10\u2078 m/s. (a) Calculate the wavelength. (b) Another station broadcasts at 200 MHz. State and explain what happens to the wavelength. (3 marks)",
    model: "(a) f = 100 MHz = 1.0 \xD7 10\u2078 Hz. \u03BB = v \xF7 f = (3.0 \xD7 10\u2078) \xF7 (1.0 \xD7 10\u2078) = 3.0 m. (b) The wavelength halves to 1.5 m. All radio waves travel at the same speed, so if the frequency doubles, the wavelength must halve to keep f \xD7 \u03BB equal to 3.0 \xD7 10\u2078 m/s."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.1.6",
    items: ["I can write v = f λ and give the unit for each quantity.", "I can rearrange it to find f or λ.", "I can convert kHz, MHz, GHz, cm and mm before substituting.", "I can explain why a higher frequency gives a shorter wavelength in the same medium."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.1",
    label: "Learn it in full: Wave Properties"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.7",
    title: "Uses of EM waves based on their properties",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("p", null, "Each use matches a property. Learn the link, not just the list."), /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Wave"), /*#__PURE__*/React.createElement("th", null, "Key property"), /*#__PURE__*/React.createElement("th", null, "Uses"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Radio"), /*#__PURE__*/React.createElement("td", null, "Long wavelength; bends around hills and buildings; reflects off the upper atmosphere"), /*#__PURE__*/React.createElement("td", null, "Radio and TV broadcasting")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Microwaves"), /*#__PURE__*/React.createElement("td", null, "Pass through the atmosphere; absorbed by water, which heats up"), /*#__PURE__*/React.createElement("td", null, "Mobile phones, Wi-Fi, satellite links, cooking")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Infrared"), /*#__PURE__*/React.createElement("td", null, "Given off by all warm objects; felt as heat"), /*#__PURE__*/React.createElement("td", null, "Thermal imaging, remote controls, heaters")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Visible"), /*#__PURE__*/React.createElement("td", null, "Detected by our eyes; travels along optical fibres"), /*#__PURE__*/React.createElement("td", null, "Seeing, photography, fibre-optic internet")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Ultraviolet"), /*#__PURE__*/React.createElement("td", null, "Makes some substances glow; kills microbes"), /*#__PURE__*/React.createElement("td", null, "Sterilising water, checking banknotes")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "X-rays"), /*#__PURE__*/React.createElement("td", null, "Very penetrating; dense materials such as metal stop more of them than light materials do"), /*#__PURE__*/React.createElement("td", null, "Airport baggage scans, checking welds and pipes for hidden cracks, medical imaging")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Gamma"), /*#__PURE__*/React.createElement("td", null, "Very high energy; kills cells"), /*#__PURE__*/React.createElement("td", null, "Cancer treatment, sterilising medical equipment"))))), /*#__PURE__*/React.createElement("p", null, "When a question gives you a data table, use the numbers or descriptions in it as your evidence (\"the table shows\u2026\").")), /*#__PURE__*/React.createElement(Practice, {
    title: "Choosing the right wave"
  }, /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginTop: 0
    }
  }, "Use this data for both questions."), /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Wave"), /*#__PURE__*/React.createElement("th", null, "Typical wavelength"), /*#__PURE__*/React.createElement("th", null, "Passes through the atmosphere?"), /*#__PURE__*/React.createElement("th", null, "Passes through skin and muscle?"), /*#__PURE__*/React.createElement("th", null, "Strongly absorbed by"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Microwaves"), /*#__PURE__*/React.createElement("td", null, "1 cm"), /*#__PURE__*/React.createElement("td", null, "Yes"), /*#__PURE__*/React.createElement("td", null, "Partly"), /*#__PURE__*/React.createElement("td", null, "Water")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Infrared"), /*#__PURE__*/React.createElement("td", null, "0.01 mm"), /*#__PURE__*/React.createElement("td", null, "Partly"), /*#__PURE__*/React.createElement("td", null, "No"), /*#__PURE__*/React.createElement("td", null, "Skin, most solids")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Ultraviolet"), /*#__PURE__*/React.createElement("td", null, "0.000 3 mm"), /*#__PURE__*/React.createElement("td", null, "Partly (ozone absorbs a lot)"), /*#__PURE__*/React.createElement("td", null, "No"), /*#__PURE__*/React.createElement("td", null, "Skin, ozone")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "X-rays"), /*#__PURE__*/React.createElement("td", null, "0.000 000 1 mm"), /*#__PURE__*/React.createElement("td", null, "No"), /*#__PURE__*/React.createElement("td", null, "Yes"), /*#__PURE__*/React.createElement("td", null, "Dense metals such as lead"))))), /*#__PURE__*/React.createElement(MCQ, {
    num: 11,
    question: "Using the data, which wave is best for sending signals between a ground station and a satellite in orbit?",
    options: ["Microwaves", "Infrared", "Ultraviolet", "X-rays"],
    correct: 0,
    explain: "The table shows microwaves pass through the atmosphere, so the signal reaches orbit. X-rays do not pass through the atmosphere at all, and infrared and ultraviolet only partly do, so signals would be weakened."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 12,
    question: "Rescuers use an infrared camera at night to find a lost bushwalker. Use the properties of infrared to explain why this works. (2 marks)",
    model: "All warm objects give off infrared, and the bushwalker's body is warmer than the cool ground and plants around them. The camera detects the extra infrared from the person, so they show up brightly against the darker background even with no visible light."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.1.7",
    items: ["I can match each EM wave to a use and the property that makes it suitable.", "I can use a data table as evidence when choosing a wave for a job."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.1",
    label: "Learn it in full: Wave Properties"
  })));
}

/* =========================================================
   SECTION 7.2 SOUND
   ========================================================= */
function Section72(_ref5) {
  var progress = _ref5.progress,
    setProgress = _ref5.setProgress;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.2 Sound and hearing"), /*#__PURE__*/React.createElement("h1", null, "From vibration to signal"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Sound is a longitudinal wave that needs a medium. The highest-value part is following sound energy through the ear, step by step.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.2.1",
    title: "Sound travels as compressions and rarefactions and needs a medium",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Sound starts with a ", /*#__PURE__*/React.createElement("strong", null, "vibrating object"), " (a speaker cone, a guitar string, your vocal cords)."), /*#__PURE__*/React.createElement("li", null, "As it moves forward it pushes particles together, making a ", /*#__PURE__*/React.createElement("strong", null, "compression"), " (higher pressure). As it moves back it leaves a ", /*#__PURE__*/React.createElement("strong", null, "rarefaction"), " (particles spread out, lower pressure)."), /*#__PURE__*/React.createElement("li", null, "Sound is a ", /*#__PURE__*/React.createElement("strong", null, "longitudinal"), " wave: particles vibrate back and forth parallel to the direction the sound travels. Each particle passes energy to the next and stays roughly where it was."), /*#__PURE__*/React.createElement("li", null, "Sound needs a ", /*#__PURE__*/React.createElement(Term, {
    def: "The substance a wave travels through, such as air, water or steel."
  }, "medium"), ". It cannot travel through a vacuum, because there are no particles to pass the vibrations on. Space is silent."), /*#__PURE__*/React.createElement("li", null, "Sound travels fastest in solids, then liquids, then gases (roughly 5 000 m/s in steel, 1 500 m/s in water, 340 m/s in air), because particles are closer together.")), /*#__PURE__*/React.createElement(Figure, {
    num: "4",
    caption: "A speaker cone vibrates and sends compressions and rarefactions through the air. The air particles only jiggle back and forth."
  }, /*#__PURE__*/React.createElement(LongitudinalFig, {
    dots: true,
    speaker: true,
    ariaExtra: ", produced by a vibrating speaker cone"
  }))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "A silent spacewalk",
    problem: "Two astronauts are on a spacewalk. One uses a power drill but the other cannot hear it. When they press their helmets together, they can hear each other talk. Explain both observations. (3 marks)",
    steps: ["State the rule: sound is a vibration passed from particle to particle, so it needs a medium.", "Apply it to space: space is a near vacuum, with almost no particles, so the drill's vibrations cannot travel through it to the other astronaut.", "Apply it to the helmets: when the helmets touch, the vibrations pass through the solid helmet material (and the air inside each helmet), so sound can reach the ear."],
    answer: "Sound needs particles to pass on its compressions and rarefactions. Space has no medium, so the drill cannot be heard, but touching helmets gives a solid path for the vibrations."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "How sound travels"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "As sound from a speaker travels across a room, what do the air particles do?",
    options: ["They travel from the speaker to your ear", "They vibrate up and down at right angles to the direction of the sound", "They vibrate back and forth about fixed positions, parallel to the direction of the sound", "They stay completely still while the energy moves past them"],
    correct: 2,
    explain: "Sound is longitudinal, so particles vibrate back and forth along the direction of travel, passing energy on. The tempting answer, 'travel from the speaker to your ear', is wrong: only energy travels across the room, not the air itself."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 14,
    question: "A snorkeller with her head under water can clearly hear dolphins clicking nearby. Which statement best explains this?",
    options: ["Sound travels through water because water is a medium with particles close together", "Sound only travels through water, not through air", "Water turns sound into light, which the diver detects", "Sound travels more slowly in water so it is louder"],
    correct: 0,
    explain: "Water is a medium, and its particles are closer together than in air, so sound travels well (and faster, about 1 500 m/s). Sound does travel through air too, so that option is wrong."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 15,
    question: "Describe how the sound from a plucked guitar string reaches a listener's ear. (3 marks)",
    model: "The plucked string vibrates. As it moves forward it pushes nearby air particles together, forming a compression, and as it moves back it leaves a rarefaction. The air particles vibrate back and forth and pass the energy on to their neighbours, so a longitudinal wave of compressions and rarefactions travels through the air to the listener's ear. The air particles themselves do not travel to the ear."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 16,
    question: "A ringing phone is sealed in a glass jar and the air is slowly pumped out. Predict what the listener hears and explain why. (2 marks)",
    model: "The ringing gets quieter and quieter until it can hardly be heard. As air is removed there are fewer particles to carry the vibrations, and sound cannot travel through a vacuum, so less sound energy reaches the glass and the listener."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.2.1",
    items: ["I can describe how a vibrating object makes compressions and rarefactions.", "I can explain why sound is a longitudinal wave.", "I can explain why sound cannot travel through a vacuum.", "I can compare the speed of sound in solids, liquids and gases."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.2",
    label: "Learn it in full: Sound Waves"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.2.4",
    title: "How the ear responds to sound waves",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement("strong", null, "pinna"), " (outer ear flap) collects sound waves and funnels them into the ", /*#__PURE__*/React.createElement("strong", null, "ear canal"), "."), /*#__PURE__*/React.createElement("li", null, "The ear canal carries the sound to the ", /*#__PURE__*/React.createElement(Term, {
    def: "A thin membrane at the end of the ear canal that vibrates when sound waves hit it."
  }, "eardrum"), ", which ", /*#__PURE__*/React.createElement("strong", null, "vibrates"), " at the same frequency as the sound."), /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The three smallest bones in the body (hammer, anvil and stirrup) that pass vibrations from the eardrum to the inner ear and amplify them."
  }, "ossicles"), " (hammer, anvil and stirrup) pass the vibrations along and ", /*#__PURE__*/React.createElement("strong", null, "amplify"), " them, pushing on the ", /*#__PURE__*/React.createElement("strong", null, "oval window"), " of the cochlea."), /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "A snail-shaped, fluid-filled tube in the inner ear lined with hair cells."
  }, "cochlea"), " is filled with fluid. The vibrations make waves in the fluid."), /*#__PURE__*/React.createElement("li", null, "The moving fluid bends tiny ", /*#__PURE__*/React.createElement("strong", null, "hair cells"), ". Bending the hair cells makes them produce ", /*#__PURE__*/React.createElement("strong", null, "electrical signals"), " (nerve impulses). This is where mechanical energy is changed into electrical signals."), /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement("strong", null, "auditory nerve"), " carries the signals to the ", /*#__PURE__*/React.createElement("strong", null, "brain"), ", which interprets them as sound.")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Loudness"), ": a larger amplitude makes the eardrum vibrate further, bending hair cells more and sending stronger signals."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Pitch"), ": different frequencies make different parts of the cochlea vibrate most. Hair cells near the entrance respond to high frequencies; those further in respond to low frequencies. Humans hear about 20 Hz to 20 000 Hz."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Damage"), ": hair cells do not grow back. Loud sound (above about 85 dB for long periods) damages them and causes permanent hearing loss, often high frequencies first. A torn eardrum or stiff ossicles stop vibrations being passed on."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Protection"), ": earplugs and earmuffs absorb sound energy so smaller-amplitude vibrations reach the eardrum. Also reduce the volume, limit the time, and move further away.")), /*#__PURE__*/React.createElement(Figure, {
    num: "5",
    caption: "The path of sound energy through the ear, from sound waves in air to electrical signals in the auditory nerve."
  }, /*#__PURE__*/React.createElement(EarChainFig, null))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Putting the steps in order",
    problem: "These events happen when you hear a dog bark. Put them in the correct order: (P) hair cells bend, (Q) the eardrum vibrates, (R) the auditory nerve carries signals to the brain, (S) the ossicles vibrate, (T) the pinna funnels sound into the ear canal, (U) the fluid in the cochlea moves.",
    steps: ["Start outside the head: the pinna collects the sound first, so T.", "Sound waves in the canal hit the eardrum: Q.", "The eardrum is joined to the ossicles, which vibrate next: S.", "The stirrup pushes on the oval window, making the cochlear fluid move: U.", "Moving fluid bends the hair cells, which make electrical signals: P.", "The auditory nerve carries the signals to the brain: R."],
    answer: "T \u2192 Q \u2192 S \u2192 U \u2192 P \u2192 R"
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Effect of damage to one part",
    problem: "A person's ossicles become stiff and can hardly move. Explain how this affects their hearing. (3 marks)",
    steps: ["Cause: say what the damaged part normally does. The ossicles pass vibrations from the eardrum to the oval window and amplify them.", "Effect: stiff ossicles pass on much smaller vibrations, so the fluid in the cochlea moves less and the hair cells bend less.", "Link to hearing: weaker electrical signals travel along the auditory nerve, so the brain interprets sounds as much quieter. The hair cells still work, so a hearing aid that makes sounds louder can help."],
    answer: "Stiff ossicles cannot transmit and amplify the eardrum's vibrations, so the hair cells are barely stimulated and sounds seem much quieter (hearing loss), even though the inner ear is healthy."
  }), /*#__PURE__*/React.createElement(ExamTip, null, /*#__PURE__*/React.createElement("p", null, "For \"explain\" questions about the ear, follow the energy one step at a time and name each part and what it does. Use cause \u2192 effect \u2192 link: what the part does, what changes if it is damaged or the sound changes, and how that changes what the brain hears.")), /*#__PURE__*/React.createElement(Practice, {
    title: "The ear in action"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 17,
    question: "Which part of the ear changes vibrations into electrical signals?",
    options: ["The eardrum", "The ossicles", "The hair cells in the cochlea", "The auditory nerve"],
    correct: 2,
    explain: "Hair cells bend when the cochlear fluid moves and produce electrical signals. The auditory nerve is the tempting answer, but it only carries the signals that the hair cells have already made."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 18,
    question: "A bird's high whistle and a low bass note are equally loud. How does the cochlea tell them apart?",
    options: ["The high note bends more hair cells than the low note", "Different frequencies make hair cells in different parts of the cochlea respond", "The ossicles change the high note into a low note", "The auditory nerve carries the high note faster"],
    correct: 1,
    explain: "Pitch depends on which hair cells respond: high frequencies stimulate hair cells near the entrance of the cochlea, low frequencies those further in. Bending more hair cells (more strongly) is how we sense loudness, not pitch."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 19,
    question: "The volume of a song is turned up but the notes stay the same. What changes at the eardrum?",
    options: ["It vibrates with a larger amplitude at the same frequency", "It vibrates at a higher frequency", "It vibrates with a smaller amplitude", "It stops vibrating and the ossicles take over"],
    correct: 0,
    explain: "Louder means a larger amplitude, so the eardrum vibrates further each time. The notes (pitch) are unchanged, so the frequency is the same. A higher frequency would mean a higher pitch."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 20,
    question: "An older person can follow normal conversation but can no longer hear a 15 000 Hz tone that a teenager hears easily. What is the most likely cause?",
    options: ["Their pinna has become too small", "Hair cells that respond to high frequencies have been damaged over time", "Their auditory nerve now carries signals too fast", "Sound travels more slowly through older air"],
    correct: 1,
    explain: "Hair cells near the cochlea's entrance detect high frequencies and are usually damaged first by age and loud noise; they do not grow back. Speech uses lower frequencies, which is why conversation is still heard. The pinna only collects sound."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 21,
    question: "Write these parts in the order that sound energy passes through them: auditory nerve, ear canal, cochlear fluid, eardrum, stirrup, hammer, anvil, hair cells. (2 marks)",
    model: "Ear canal \u2192 eardrum \u2192 hammer \u2192 anvil \u2192 stirrup \u2192 cochlear fluid \u2192 hair cells \u2192 auditory nerve."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 22,
    question: "A person has a small tear (perforation) in their eardrum. Predict how this affects their hearing and explain why. (2 marks)",
    model: "Their hearing in that ear becomes quieter or muffled. A torn eardrum cannot vibrate properly when sound waves hit it, so smaller vibrations are passed to the ossicles and cochlea, the hair cells are bent less, and weaker signals reach the brain."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 23,
    question: "Stage crew at concerts wear earmuffs. Explain how loud music over many hours can cause permanent hearing loss, and how earmuffs reduce this risk. (4 marks)",
    model: "Very loud sound has a large amplitude, so it makes the eardrum, ossicles and cochlear fluid vibrate strongly. Over many hours these strong vibrations damage or destroy the delicate hair cells in the cochlea. Hair cells cannot regrow, so they can no longer turn vibrations into electrical signals and the hearing loss is permanent. Earmuffs absorb much of the sound energy before it enters the ear canal, so a smaller amplitude reaches the eardrum and the hair cells are not bent as violently, lowering the risk of damage."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.2.4",
    items: ["I can put the parts of the ear in order from the pinna to the brain.", "I can say what each part does to the sound energy.", "I can explain how the ear detects loudness and pitch.", "I can predict and explain the effect of damage to the eardrum, ossicles or hair cells.", "I can explain how hearing protection works."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.2",
    label: "Learn it in full: Sound Waves"
  })));
}

/* =========================================================
   SECTION 7.3 LIGHT
   ========================================================= */
function Section73(_ref6) {
  var progress = _ref6.progress,
    setProgress = _ref6.setProgress;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.3 Light"), /*#__PURE__*/React.createElement("h1", null, "Light at surfaces"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Light can be absorbed, reflected, refracted or scattered. Measure every angle from the normal.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.3.2",
    title: "Absorption, reflection, refraction and scattering of light",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "When a material takes in light energy and changes it into another form, usually heat."
  }, "Absorption"), ": light energy is taken in and changed to heat. Dark surfaces absorb most colours and warm up. A red shirt reflects red light and absorbs the other colours."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Light bouncing off a surface."
  }, "Reflection"), ": light bounces off a surface. ", /*#__PURE__*/React.createElement("strong", null, "Law of reflection: angle of incidence = angle of reflection"), ", both measured from the ", /*#__PURE__*/React.createElement(Term, {
    def: "An imaginary line drawn at 90\xB0 to a surface where a ray hits it."
  }, "normal"), " (a line at 90\xB0 to the surface). Smooth surfaces give regular reflection (a clear image); rough surfaces give diffuse reflection (no image)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "The bending of light as it passes from one medium into another and changes speed."
  }, "Refraction"), ": light bends when it crosses into a different medium because its ", /*#__PURE__*/React.createElement("strong", null, "speed changes"), ". Into a denser medium (air \u2192 water or glass) it slows and bends ", /*#__PURE__*/React.createElement("strong", null, "towards"), " the normal; coming out it speeds up and bends ", /*#__PURE__*/React.createElement("strong", null, "away"), ". This is why a pencil looks bent in water and pools look shallower than they are."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Term, {
    def: "Light being redirected in many directions by tiny particles, such as gas molecules in the air."
  }, "Scattering"), ": tiny particles send light off in all directions. Air molecules scatter short-wavelength blue light much more than red, so the sky looks blue. At sunset, light passes through more air, most blue is scattered away, and the sky looks orange-red."), /*#__PURE__*/React.createElement("li", null, "Common mistake: measuring angles from the surface instead of from the normal.")), /*#__PURE__*/React.createElement(Figure, {
    num: "6",
    caption: "Reflection obeys i = r. When light enters water it slows and bends towards the normal (here 50\xB0 in air becomes about 35\xB0 in water)."
  }, /*#__PURE__*/React.createElement(LightFig, null))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "The bent pencil",
    problem: "A pencil standing in a glass of water looks broken at the water surface. Explain why. (3 marks)",
    steps: ["Name the property: this is refraction.", "Cause: light from the underwater part of the pencil travels from water into air. It speeds up and bends away from the normal at the surface.", "Effect: your brain assumes light travels in straight lines, so it traces the rays back to where the pencil appears to be, which is higher than where it really is. The underwater part looks shifted, so the pencil looks broken."],
    answer: "Light from the underwater part refracts (bends away from the normal) as it speeds up leaving the water, so that part of the pencil appears in a different place from the part above the water."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Light at surfaces"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 24,
    question: "Why does the sky look blue on a clear day?",
    options: ["Air molecules scatter blue light more than red light", "The sky reflects the blue colour of the ocean", "Air absorbs all colours except blue", "Blue light travels faster than red light in air"],
    correct: 0,
    explain: "Blue has a shorter wavelength, and tiny air molecules scatter short wavelengths much more, sending blue light across the whole sky. The ocean idea is a myth (the sky is blue over deserts too)."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 25,
    question: "On a sunny day, a black car bonnet gets much hotter than a white one. Which property of light explains this?",
    options: ["Refraction", "Scattering", "Absorption", "Regular reflection"],
    correct: 2,
    explain: "Black surfaces absorb most of the light falling on them and change that energy into heat. White surfaces reflect most light, so they stay cooler. Reflection is the property of the white bonnet, not the black one."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 26,
    question: "A ray of light passes from air into a glass block at an angle. What happens to it?",
    options: ["It speeds up and bends away from the normal", "It slows down and bends towards the normal", "It slows down and carries on in a straight line", "It is completely reflected"],
    correct: 1,
    explain: "Glass is optically denser than air, so the light slows down and bends towards the normal. Speeding up and bending away happens when light leaves the glass."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 27,
    question: "A periscope has two flat mirrors, each set at 45\xB0 to the tube. Explain how it lets a person see over a high fence. (3 marks)",
    model: "Light from an object above the fence enters the top of the periscope and hits the first mirror. By the law of reflection the angle of incidence equals the angle of reflection, so the mirror at 45\xB0 turns the light through 90\xB0 and sends it straight down the tube. The second mirror, also at 45\xB0, reflects it through another 90\xB0 so it travels horizontally into the person's eye, letting them see the object over the fence."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.3.2",
    items: ["I can state the law of reflection and measure angles from the normal.", "I can explain refraction in terms of light changing speed.", "I can explain why the sky is blue using scattering.", "I can link the colour or darkness of a surface to absorption."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.3",
    label: "Learn it in full: Light Waves"
  })));
}

/* =========================================================
   SECTION 7.4 MOTION
   ========================================================= */
function ScooterDT() {
  return /*#__PURE__*/React.createElement(LineGraph, {
    id: "dt1",
    xMax: 60,
    yMax: 300,
    xStep: 10,
    yStep: 50,
    xLabel: "Time (s)",
    yLabel: "Distance (m)",
    pts: [[0, 0], [20, 160], [50, 280], [60, 280]],
    aria: "Distance-time graph of an electric scooter: 0 to 160 metres in the first 20 seconds, then 160 to 280 metres from 20 to 50 seconds with a gentler slope, then flat at 280 metres from 50 to 60 seconds."
  }, function (_ref7) {
    var X = _ref7.X,
      Y = _ref7.Y;
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
      x: X(12),
      y: Y(125),
      textAnchor: "end",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11,
        fontWeight: 700
      })
    }, "8 m/s"), /*#__PURE__*/React.createElement("text", {
      x: X(36),
      y: Y(185),
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11,
        fontWeight: 700
      })
    }, "4 m/s"), /*#__PURE__*/React.createElement("text", {
      x: X(55),
      y: Y(280) - 8,
      textAnchor: "middle",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11,
        fontWeight: 700
      })
    }, "stopped"));
  });
}
function KartDT() {
  return /*#__PURE__*/React.createElement(LineGraph, {
    id: "dt2",
    xMax: 80,
    yMax: 250,
    xStep: 20,
    yStep: 50,
    xLabel: "Time (s)",
    yLabel: "Distance (m)",
    pts: [[0, 0], [20, 40], [60, 240], [80, 240]],
    aria: "Distance-time graph of a go-kart: 0 to 40 metres from 0 to 20 seconds, then 40 to 240 metres from 20 to 60 seconds with a steeper slope, then flat at 240 metres from 60 to 80 seconds."
  });
}
function TrainVT() {
  return /*#__PURE__*/React.createElement(LineGraph, {
    id: "vt1",
    w: 380,
    xMax: 120,
    yMax: 25,
    xStep: 20,
    yStep: 5,
    xLabel: "Time (s)",
    yLabel: "Velocity (m/s)",
    shade: true,
    pts: [[0, 0], [40, 20], [100, 20], [120, 0]],
    aria: "Velocity-time graph of a train: speeds up from 0 to 20 metres per second in 40 seconds, stays at 20 metres per second until 100 seconds, then slows to 0 at 120 seconds. Areas under the graph: 400 metres, 1200 metres and 200 metres."
  }, function (_ref8) {
    var X = _ref8.X,
      Y = _ref8.Y;
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: X(40),
      y1: Y(20),
      x2: X(40),
      y2: Y(0),
      style: {
        stroke: "var(--accent-deep)"
      },
      strokeDasharray: "4 3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: X(100),
      y1: Y(20),
      x2: X(100),
      y2: Y(0),
      style: {
        stroke: "var(--accent-deep)"
      },
      strokeDasharray: "4 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: X(28),
      y: Y(3),
      textAnchor: "middle",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11,
        fontWeight: 700
      })
    }, "400 m"), /*#__PURE__*/React.createElement("text", {
      x: X(70),
      y: Y(9),
      textAnchor: "middle",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11,
        fontWeight: 700
      })
    }, "1 200 m"), /*#__PURE__*/React.createElement("text", {
      x: X(105.5),
      y: Y(2.5),
      textAnchor: "middle",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11,
        fontWeight: 700
      })
    }, "200 m"), /*#__PURE__*/React.createElement("text", {
      x: X(70),
      y: Y(20) - 8,
      textAnchor: "middle",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11
      })
    }, "constant velocity"), /*#__PURE__*/React.createElement("text", {
      x: X(14),
      y: Y(17),
      textAnchor: "middle",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11
      })
    }, "speeding up"), /*#__PURE__*/React.createElement("text", {
      x: X(112),
      y: Y(23),
      textAnchor: "middle",
      style: _objectSpread(_objectSpread({}, lbl), {}, {
        fontSize: 11
      })
    }, "slowing"));
  });
}
function SkaterVT() {
  return /*#__PURE__*/React.createElement(LineGraph, {
    id: "vt2",
    xMax: 24,
    yMax: 4,
    xStep: 6,
    yStep: 1,
    xLabel: "Time (s)",
    yLabel: "Velocity (m/s)",
    pts: [[0, 0], [6, 3], [18, 3], [24, 0]],
    aria: "Velocity-time graph of a skateboarder: speeds up from 0 to 3 metres per second in 6 seconds, stays at 3 metres per second until 18 seconds, then slows to 0 at 24 seconds."
  });
}
function Section74(_ref9) {
  var progress = _ref9.progress,
    setProgress = _ref9.setProgress;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.4 Motion and forces"), /*#__PURE__*/React.createElement("h1", null, "Describing and explaining motion"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "The highest-value part of the topic. Practise the formulas and reading motion graphs until they feel automatic. The formulas are on your data sheet.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.1",
    title: "Distance and displacement, speed and velocity",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A quantity with size (magnitude) only, such as distance, speed, mass or time."
  }, "scalar"), " has size only. A ", /*#__PURE__*/React.createElement(Term, {
    def: "A quantity with size and direction, such as displacement, velocity, acceleration or force."
  }, "vector"), " has size ", /*#__PURE__*/React.createElement("strong", null, "and direction"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Distance"), " (scalar): the total length of the path travelled. ", /*#__PURE__*/React.createElement("strong", null, "Displacement"), " (vector): the straight-line change in position from start to finish, with a direction."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Speed"), " (scalar) = distance \xF7 time. ", /*#__PURE__*/React.createElement("strong", null, "Velocity"), " (vector) = displacement \xF7 time, with a direction."), /*#__PURE__*/React.createElement("li", null, "Finish where you started \u2192 displacement = 0 and average velocity = 0, even though you travelled a distance."), /*#__PURE__*/React.createElement("li", null, "Changing direction at the same speed means the velocity has changed. Use + and \u2212 for opposite directions (e.g. up = +, down = \u2212)."), /*#__PURE__*/React.createElement("li", null, "Scalars: distance, speed, time, mass, energy. Vectors: displacement, velocity, acceleration, force, weight."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "A delivery drone",
    problem: "A delivery drone rises 120 m straight up from the ground, then drops 45 m straight down to hover beside a balcony. The whole trip takes 50 s. Find (a) the distance, (b) the displacement, (c) the average speed and (d) the average velocity.",
    steps: ["Distance is the total path: 120 m + 45 m = 165 m.", "Displacement is the change in position: 120 m up − 45 m down = 75 m upward.", "Average speed = distance ÷ time = 165 ÷ 50 = 3.3 m/s.", "Average velocity = displacement ÷ time = 75 ÷ 50 = 1.5 m/s upward. A vector answer needs its direction."],
    answer: "(a) 165 m (b) 75 m up (c) 3.3 m/s (d) 1.5 m/s up."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Scalars and vectors"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 28,
    question: "Which list contains only vector quantities?",
    options: ["Distance, speed, time", "Displacement, velocity, force", "Mass, velocity, acceleration", "Speed, force, displacement"],
    correct: 1,
    explain: "Displacement, velocity and force all have a direction. Each other list includes a scalar: mass in C and speed in D are the traps, because they sit next to real vectors."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 29,
    question: "A swimmer completes 2 laps of a 25 m pool (up and back) in 40 s, finishing at the starting wall. What is the swimmer's average velocity?",
    options: ["1.25 m/s", "0.625 m/s", "0 m/s", "2.5 m/s"],
    correct: 2,
    explain: "The swimmer ends where they started, so the displacement is 0 and the average velocity is 0. 1.25 m/s (50 m \xF7 40 s) is the average speed, not the velocity."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 30,
    question: "A lift goes up at a steady 2 m/s, then comes back down at a steady 2 m/s. Which statement is correct?",
    options: ["Its speed and velocity are both the same on the way up and down", "Its speed is the same, but its velocity is different", "Its velocity is the same, but its speed is different", "Its speed and velocity both change"],
    correct: 1,
    explain: "Speed has no direction, so it is 2 m/s both ways. Velocity includes direction, so it changes from +2 m/s (up) to \u22122 m/s (down). Saying both are the same ignores the direction."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 31,
    question: "A cable car travels 600 m up a mountainside in 300 s, then immediately travels 600 m back down to the base station in 200 s. (a) Calculate the average speed for the whole trip. (b) State the average velocity for the whole trip. (c) Explain why your answers are different. (3 marks)",
    model: "(a) Average speed = total distance \xF7 total time = 1 200 m \xF7 500 s = 2.4 m/s. (b) Average velocity = 0 m/s. (c) The cable car finishes where it started, so the displacement is zero. Speed uses the total distance travelled (a scalar), but velocity uses displacement (a vector), so the average velocity is zero even though the cable car moved."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.4.1",
    items: ["I can define scalar and vector and sort quantities into each.", "I can calculate distance and displacement for a trip that changes direction.", "I can calculate average speed and average velocity, giving direction for velocity."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.4",
    label: "Learn it in full: Motion"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.3",
    title: "Drawing and analysing distance\u2013time graphs",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "know"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Time goes on the horizontal (x) axis and distance on the vertical (y) axis. Label both axes with units and use an even scale."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Gradient = speed"), ". Gradient = rise \xF7 run = change in distance \xF7 change in time."), /*#__PURE__*/React.createElement("li", null, "Straight sloping line = constant speed. Steeper line = faster. Flat (horizontal) line = stopped. A curve getting steeper = speeding up; a curve getting flatter = slowing down."), /*#__PURE__*/React.createElement("li", null, "Average speed for a whole trip = total distance \xF7 total time (read from the end point).")), /*#__PURE__*/React.createElement(Figure, {
    num: "7",
    caption: "An electric scooter: gradient = 160 \xF7 20 = 8 m/s, then 120 \xF7 30 = 4 m/s (less steep = slower), then flat (stopped)."
  }, /*#__PURE__*/React.createElement(ScooterDT, null))), /*#__PURE__*/React.createElement(ExamTip, null, /*#__PURE__*/React.createElement("p", null, "To find a gradient, pick two points on the line that sit on grid lines, far apart. Write rise \xF7 run with units, e.g. (280 \u2212 160) m \xF7 (50 \u2212 20) s = 4 m/s.")), /*#__PURE__*/React.createElement(Practice, {
    title: "Reading a distance\u2013time graph"
  }, /*#__PURE__*/React.createElement(Figure, {
    num: "8",
    caption: "A go-kart on a straight test track."
  }, /*#__PURE__*/React.createElement(KartDT, null)), /*#__PURE__*/React.createElement(MCQ, {
    num: 32,
    question: "Using Figure 8, what is the go-kart doing between 60 s and 80 s?",
    options: ["Moving at a constant speed of 240 m/s", "Speeding up", "Stopped (not moving)", "Driving back towards the start"],
    correct: 2,
    explain: "The line is flat: the distance stays at 240 m while time passes, so the go-kart is not moving. Driving back towards the start would make the distance decrease, not stay the same."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 33,
    question: "Using Figure 8: (a) calculate the go-kart's speed between 20 s and 60 s, (b) calculate the average speed for the whole 80 s, and (c) state how the graph shows that the go-kart was slower in the first 20 s. (3 marks)",
    model: "(a) Speed = gradient = (240 \u2212 40) m \xF7 (60 \u2212 20) s = 200 \xF7 40 = 5 m/s. (b) Average speed = 240 m \xF7 80 s = 3 m/s. (c) The line between 0 and 20 s is less steep (gradient 40 \xF7 20 = 2 m/s), and a gentler gradient means a lower speed."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.4.3",
    items: ["I can draw a distance–time graph with labelled axes, units and an even scale.", "I can calculate speed from the gradient.", "I can describe motion from the shape of the line (sloped, steep, flat, curved)."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.4",
    label: "Learn it in full: Motion (motion graphs)"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.4",
    title: "Force, mass and acceleration: F = ma",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "F = m a"), ": net force ", /*#__PURE__*/React.createElement("strong", null, "F"), " in newtons (N), mass ", /*#__PURE__*/React.createElement("strong", null, "m"), " in kilograms (kg), acceleration ", /*#__PURE__*/React.createElement("strong", null, "a"), " in m/s\xB2."), /*#__PURE__*/React.createElement("li", null, "Rearranged: ", /*#__PURE__*/React.createElement("strong", null, "a = F \xF7 m"), " and ", /*#__PURE__*/React.createElement("strong", null, "m = F \xF7 a"), "."), /*#__PURE__*/React.createElement("li", null, "Bigger net force \u2192 bigger acceleration (same mass). Bigger mass \u2192 smaller acceleration (same force)."), /*#__PURE__*/React.createElement("li", null, "Use the ", /*#__PURE__*/React.createElement("strong", null, "net"), " (unbalanced) force. Convert grams to kilograms first (\xF7 1 000)."), /*#__PURE__*/React.createElement("li", null, "1 N is the force that gives 1 kg an acceleration of 1 m/s\xB2. Weight is a force too: W = m g, with g = 9.8 m/s\xB2 on Earth."))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Accelerating a drone",
    problem: "A delivery drone with a mass of 2.5 kg has a net upward force of 5.0 N acting on it. Calculate its acceleration.",
    steps: ["Formula: F = m a, so a = F ÷ m.", "Substitute: a = 5.0 N ÷ 2.5 kg.", "a = 2.0 m/s² upward (the same direction as the net force)."],
    answer: "a = 2.0 m/s\xB2 upward."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Using F = ma"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 34,
    question: "A sled and its rider have a total mass of 120 kg. The net force down the slope is 60 N. What is the acceleration?",
    options: ["7 200 m/s²", "2.0 m/s²", "0.50 m/s²", "180 m/s²"],
    correct: 2,
    explain: "a = F \xF7 m = 60 \xF7 120 = 0.50 m/s\xB2. 2.0 m/s\xB2 comes from dividing the wrong way (120 \xF7 60), and 7 200 comes from multiplying."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 35,
    question: "The same motor force lifts an empty lift and then a lift full of people. Compared with the empty lift, the full lift will:",
    options: ["accelerate more, because it has more mass", "accelerate less, because it has more mass", "accelerate the same, because the force is the same", "not accelerate at all"],
    correct: 1,
    explain: "a = F \xF7 m: with the same force, a larger mass gives a smaller acceleration. The same force does not mean the same acceleration, because mass also matters."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 36,
    question: "A train with a mass of 40 000 kg speeds up with an acceleration of 0.50 m/s\xB2. Calculate the net force acting on it. (2 marks)",
    model: "F = m a = 40 000 kg \xD7 0.50 m/s\xB2 = 20 000 N (in the direction of motion)."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 37,
    question: "An ice hockey player hits a 160 g puck, which accelerates across the ice at 25 m/s\xB2 while the stick is in contact with it. Calculate the net force on the puck. (2 marks)",
    model: "Convert the mass: 160 g = 0.160 kg. F = m a = 0.160 kg \xD7 25 m/s\xB2 = 4.0 N (in the direction the puck accelerates)."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.4.4",
    items: ["I can use F = ma and give units N, kg and m/s².", "I can rearrange to find acceleration or mass.", "I can explain how changing force or mass changes acceleration.", "I can convert grams to kilograms before calculating."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.4",
    label: "Learn it in full: Motion"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.6",
    title: "Net force in one dimension",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The single force that has the same effect as all the forces acting on an object added together, taking direction into account."
  }, "net force"), " is the vector sum of all the forces on an object."), /*#__PURE__*/React.createElement("li", null, "Pick a positive direction. Forces in the ", /*#__PURE__*/React.createElement("strong", null, "same"), " direction ", /*#__PURE__*/React.createElement("strong", null, "add"), "; forces in ", /*#__PURE__*/React.createElement("strong", null, "opposite"), " directions ", /*#__PURE__*/React.createElement("strong", null, "subtract"), ". The net force points the way of the bigger total."), /*#__PURE__*/React.createElement("li", null, "Always state the size ", /*#__PURE__*/React.createElement("strong", null, "and direction"), ", e.g. \"2 000 N upward\"."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Balanced"), " forces (net force = 0): the object stays at rest ", /*#__PURE__*/React.createElement("em", null, "or"), " keeps moving at a constant velocity. It does not have to be stopped."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Unbalanced"), " forces: the object accelerates in the direction of the net force (F = m a).")), /*#__PURE__*/React.createElement(Figure, {
    num: "9",
    caption: "A lift car starting to move up. Arrow length shows force size."
  }, /*#__PURE__*/React.createElement(LiftFig, null))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "A lift starting upward",
    problem: "In Figure 9 the cable pulls up on a 1 000 kg lift car with 11 800 N and its weight is 9 800 N. Find the net force and the acceleration.",
    steps: ["Take up as positive. Net force = 11 800 N − 9 800 N = +2 000 N, so 2 000 N upward.", "Use F = m a: a = F ÷ m = 2 000 ÷ 1 000.", "a = 2.0 m/s² upward."],
    answer: "Net force = 2 000 N up; the lift accelerates upward at 2.0 m/s\xB2."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Adding forces"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 38,
    question: "A train's motors provide a forward force of 85 kN. Friction and air resistance together provide 60 kN backwards. What is the net force?",
    options: ["145 kN forward", "25 kN backward", "25 kN forward", "0 kN"],
    correct: 2,
    explain: "Opposite forces subtract: 85 \u2212 60 = 25 kN, in the direction of the larger force (forward). 145 kN comes from adding forces that act in opposite directions."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 39,
    question: "An electric scooter travels along a flat path at a constant velocity. Its motor provides a forward driving force of 150 N. What is the total resistance force on the scooter?",
    options: ["Less than 150 N, otherwise the scooter would stop", "Exactly 150 N backwards", "More than 150 N backwards", "0 N, because the scooter is moving"],
    correct: 1,
    explain: "Constant velocity means zero acceleration, so the forces are balanced: resistance = 150 N backwards. 'Less than 150 N' is a common misconception: a net forward force would make the scooter speed up, not just keep moving."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 40,
    question: "Two people push a broken-down car forward with 300 N and 250 N. Friction acts backwards with 400 N. What is the net force on the car?",
    options: ["950 N forward", "150 N forward", "150 N backward", "50 N forward"],
    correct: 1,
    explain: "Forward forces add: 300 + 250 = 550 N. Then subtract the opposite force: 550 \u2212 400 = 150 N forward. 950 N comes from adding all three, ignoring direction."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 41,
    question: "A drone has a weight of 20 N. (a) While rising, its rotors give 26 N of upward thrust and air resistance is 2 N downward. Calculate the net force. (b) State the upward thrust needed for the drone to hover at a fixed height, and explain why. (3 marks)",
    model: "(a) Taking up as positive: net force = 26 \u2212 20 \u2212 2 = 4 N upward. (b) 20 N. When hovering, the drone is not moving, so there is no air resistance and the forces must be balanced (net force = 0). The upward thrust must equal the 20 N weight."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.4.6",
    items: ["I can add forces in the same direction and subtract forces in opposite directions.", "I can give a net force with size and direction.", "I can explain that balanced forces mean rest or constant velocity."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.4",
    label: "Learn it in full: Motion"
  })), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.7",
    title: "Formulas and graphs for force and motion",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "core"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Formula"), /*#__PURE__*/React.createElement("th", null, "Meaning"), /*#__PURE__*/React.createElement("th", null, "Units"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "v = d \xF7 t")), /*#__PURE__*/React.createElement("td", null, "speed = distance \xF7 time"), /*#__PURE__*/React.createElement("td", null, "m/s, m, s")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "a = (v \u2212 u) \xF7 t")), /*#__PURE__*/React.createElement("td", null, "acceleration = (final velocity \u2212 initial velocity) \xF7 time"), /*#__PURE__*/React.createElement("td", null, "m/s\xB2, m/s, s")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "F = m a")), /*#__PURE__*/React.createElement("td", null, "net force = mass \xD7 acceleration"), /*#__PURE__*/React.createElement("td", null, "N, kg, m/s\xB2"))))), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Velocity\u2013time graph"), ": the ", /*#__PURE__*/React.createElement("strong", null, "gradient = acceleration"), "; the ", /*#__PURE__*/React.createElement("strong", null, "area under the line = distance travelled"), " (displacement). Horizontal line = constant velocity (not stopped!). Line sloping down = slowing down (negative acceleration)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Distance\u2013time graph"), ": gradient = speed; horizontal line = stopped."), /*#__PURE__*/React.createElement("li", null, "Convert km/h to m/s by dividing by 3.6 (e.g. 72 km/h = 20 m/s). Convert minutes to seconds (\xD7 60)."), /*#__PURE__*/React.createElement("li", null, "A negative acceleration (deceleration) means the object is slowing down.")), /*#__PURE__*/React.createElement(Figure, {
    num: "10",
    caption: "A train between two stations. Gradients give acceleration; the shaded areas add up to the distance between stations."
  }, /*#__PURE__*/React.createElement(TrainVT, null))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Acceleration and force for the train",
    problem: "Use Figure 10. (a) Calculate the train's acceleration in the first 40 s. (b) The train has a mass of 200 000 kg. Calculate the net force during this time. (c) Calculate the acceleration from 100 s to 120 s.",
    steps: ["(a) a = (v − u) ÷ t = (20 − 0) ÷ 40 = 0.50 m/s². (This is also the gradient of the first section.)", "(b) F = m a = 200 000 × 0.50 = 100 000 N forward.", "(c) a = (0 − 20) ÷ (120 − 100) = −20 ÷ 20 = −1.0 m/s². The negative sign shows the train is slowing down."],
    answer: "(a) 0.50 m/s\xB2 (b) 100 000 N (1.0 \xD7 10\u2075 N) (c) \u22121.0 m/s\xB2 (deceleration of 1.0 m/s\xB2)."
  }), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Distance from the area",
    problem: "Use Figure 10 to find the distance between the two stations and the train's average speed.",
    steps: ["Split the area under the line into shapes.", "Triangle 0–40 s: ½ × 40 × 20 = 400 m.", "Rectangle 40–100 s: 60 × 20 = 1 200 m.", "Triangle 100–120 s: ½ × 20 × 20 = 200 m.", "Total distance = 400 + 1 200 + 200 = 1 800 m. Average speed = d ÷ t = 1 800 ÷ 120 = 15 m/s."],
    answer: "The stations are 1 800 m apart; average speed = 15 m/s."
  }), /*#__PURE__*/React.createElement(ExamTip, null, /*#__PURE__*/React.createElement("p", null, "Before you read a motion graph, check the y-axis label. On a distance\u2013time graph a flat line means stopped; on a velocity\u2013time graph a flat line means moving at a steady velocity. Many marks are lost by reading the wrong kind of graph.")), /*#__PURE__*/React.createElement(Practice, {
    title: "Motion maths and graphs"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 42,
    question: "On a velocity\u2013time graph, what does a horizontal line above the time axis show?",
    options: ["The object is stopped", "The object is moving at a constant velocity", "The object is speeding up steadily", "The object is slowing down steadily"],
    correct: 1,
    explain: "A flat line on a velocity\u2013time graph means the velocity is not changing, so the object moves at a constant velocity (zero acceleration). 'Stopped' is the meaning of a flat line on a distance\u2013time graph."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 43,
    question: "A lift starts from rest and reaches 3.0 m/s in 1.5 s. What is its acceleration?",
    options: ["4.5 m/s²", "0.50 m/s²", "2.0 m/s²", "1.5 m/s²"],
    correct: 2,
    explain: "a = (v \u2212 u) \xF7 t = (3.0 \u2212 0) \xF7 1.5 = 2.0 m/s\xB2. 0.50 comes from dividing time by velocity, and 4.5 from multiplying."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 44,
    question: "A delivery drone flies at 54 km/h. What is this speed in m/s?",
    options: ["15 m/s", "194 m/s", "54 m/s", "0.9 m/s"],
    correct: 0,
    explain: "Divide by 3.6: 54 \xF7 3.6 = 15 m/s (54 000 m \xF7 3 600 s). 194 m/s comes from multiplying by 3.6 instead of dividing."
  }), /*#__PURE__*/React.createElement(MCQ, {
    num: 45,
    question: "A train slows from 25 m/s to 10 m/s in 30 s. What is its acceleration?",
    options: ["0.50 m/s²", "−0.50 m/s²", "−1.2 m/s²", "−15 m/s²"],
    correct: 1,
    explain: "a = (v \u2212 u) \xF7 t = (10 \u2212 25) \xF7 30 = \u221215 \xF7 30 = \u22120.50 m/s\xB2. The negative sign shows it is slowing down; leaving it off (0.50 m/s\xB2) would describe speeding up. \u221215 forgets to divide by the time."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 46,
    question: "A delivery drone flies at a constant 12 m/s for 2.5 minutes. Calculate the distance it travels. (2 marks)",
    model: "t = 2.5 \xD7 60 = 150 s. v = d \xF7 t, so d = v \xD7 t = 12 m/s \xD7 150 s = 1 800 m (1.8 km)."
  }), /*#__PURE__*/React.createElement(Figure, {
    num: "11",
    caption: "A skateboarder rolling along a flat path."
  }, /*#__PURE__*/React.createElement(SkaterVT, null)), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 47,
    question: "Use Figure 11. (a) Calculate the skateboarder's acceleration in the first 6 s. (b) Calculate the total distance travelled in 24 s. (c) The skateboarder and board have a total mass of 60 kg. Calculate the net force on them in the first 6 s. (5 marks)",
    model: "(a) a = (v \u2212 u) \xF7 t = (3 \u2212 0) \xF7 6 = 0.5 m/s\xB2. (b) Distance = area under the graph: \xBD \xD7 6 \xD7 3 = 9 m (0 to 6 s), plus 12 \xD7 3 = 36 m (6 s to 18 s), plus \xBD \xD7 6 \xD7 3 = 9 m (18 s to 24 s). Total = 9 + 36 + 9 = 54 m. (c) F = m a = 60 kg \xD7 0.5 m/s\xB2 = 30 N forward."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 48,
    question: "Describe what a straight line sloping upwards shows on (a) a distance\u2013time graph and (b) a velocity\u2013time graph. (2 marks)",
    model: "(a) On a distance\u2013time graph it shows the object is moving at a constant speed (the gradient is the speed). (b) On a velocity\u2013time graph it shows the object is speeding up with a constant acceleration (the gradient is the acceleration)."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.4.7",
    items: ["I can use v = d ÷ t, a = (v − u) ÷ t and F = ma with correct units.", "I can find acceleration from the gradient of a velocity–time graph.", "I can find distance from the area under a velocity–time graph.", "I can tell what a flat or sloping line means on each type of graph.", "I can convert km/h to m/s and minutes to seconds."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.4",
    label: "Learn it in full: Motion"
  })));
}

/* =========================================================
   SECTION 7.5 SOCIETY
   ========================================================= */
function Section75(_ref0) {
  var progress = _ref0.progress,
    setProgress = _ref0.setProgress;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.5 Waves, motion and society"), /*#__PURE__*/React.createElement("h1", null, "Arguing about technology"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Build an argument with a claim, evidence, reasoning and a limitation, using the physics behind each technology.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.5.1",
    title: "Arguing how waves and motion have changed society",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement(ExamFocus, {
    tier: "important"
  }), /*#__PURE__*/React.createElement(Recap, null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Claim"), ": a clear answer to the question (\"Ultrasound has greatly improved healthcare\")."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Evidence"), ": specific examples, facts or data, not general statements."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Reasoning"), ": the science that links the evidence to the claim (the wave or motion idea)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Counterpoint or limitation"), ": a cost, risk or drawback, and why your claim still stands."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Conclusion"), ": restate your judgement. \"Evaluate\" questions need a judgement.")), /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Technology"), /*#__PURE__*/React.createElement("th", null, "Physics behind it"), /*#__PURE__*/React.createElement("th", null, "Impact on society"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Mobile phones and Wi-Fi"), /*#__PURE__*/React.createElement("td", null, "Microwaves and radio waves carry data at the speed of light"), /*#__PURE__*/React.createElement("td", null, "Instant worldwide communication, online learning and banking; concerns about e-waste and screen time")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fibre-optic internet"), /*#__PURE__*/React.createElement("td", null, "Light or infrared reflects along glass fibres (total internal reflection)"), /*#__PURE__*/React.createElement("td", null, "Fast, high-capacity internet across continents")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Medical ultrasound"), /*#__PURE__*/React.createElement("td", null, "High-frequency sound reflects at boundaries between tissues"), /*#__PURE__*/React.createElement("td", null, "Safe imaging of unborn babies and organs, with no ionising radiation")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "X-rays and CT"), /*#__PURE__*/React.createElement("td", null, "Denser body parts stop more X-rays than less dense parts, so a detector records a shadow picture of the inside"), /*#__PURE__*/React.createElement("td", null, "Diagnosing fractures and disease without surgery; each scan gives a small dose of ionising radiation")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Seatbelts, airbags, crumple zones"), /*#__PURE__*/React.createElement("td", null, "Increase stopping time, so deceleration and force (F = m a) are smaller"), /*#__PURE__*/React.createElement("td", null, "Far fewer deaths and serious injuries in crashes")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "GPS navigation"), /*#__PURE__*/React.createElement("td", null, "Timed radio signals from satellites in orbit"), /*#__PURE__*/React.createElement("td", null, "Navigation, delivery, emergency services, farming")))))), /*#__PURE__*/React.createElement(WorkedExample, {
    title: "Building a 4-mark argument",
    problem: "Construct an argument about how ultrasound technology has changed medicine. (4 marks)",
    steps: ["Claim: Ultrasound has changed medicine by giving doctors a safe, fast way to see inside the body.", "Evidence: It is used for pregnancy scans, checking the heart and organs, and guiding needles during procedures.", "Reasoning: A probe sends high-frequency sound waves into the body. They reflect at boundaries between different tissues, and the time taken for each echo to return is used to build a live image. Ultrasound is not ionising, so it is safe even for an unborn baby, unlike X-rays.", "Limitation and conclusion: Ultrasound cannot see well through bone or air, so X-rays or MRI are still needed for some problems. Even so, because it is safe, cheap and gives live images, it has greatly improved medical care."],
    answer: "Ultrasound has changed medicine by giving doctors a safe, fast way to see inside the body. It is used for pregnancy scans, checking the heart and other organs, and guiding needles during procedures. A probe sends high-frequency sound waves into the body; they reflect at the boundaries between tissues, and the time each echo takes to return is used to build a live image. Because ultrasound is not ionising, it can be used safely even on an unborn baby, unlike X-rays. Ultrasound cannot see clearly through bone or air, so X-rays or MRI are still needed for some problems. Even so, because it is safe, cheap and gives live images, ultrasound has greatly improved medical care."
  }), /*#__PURE__*/React.createElement(Practice, {
    title: "Waves, motion and society"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 49,
    question: "A student claims that airbags have made car travel safer. Which sentence is the best piece of reasoning to support this claim?",
    options: ["Airbags are fitted in almost every new car.", "Airbags inflate in a crash, which increases the time it takes a person's head to stop, so their deceleration and the force on them are smaller.", "Many people say they feel safer in cars with airbags.", "Airbags were invented in the twentieth century."],
    correct: 1,
    explain: "Reasoning uses science to link evidence to the claim: a longer stopping time means a smaller deceleration and, by F = m a, a smaller force. 'Fitted in almost every new car' is evidence of how common airbags are, not why they make travel safer."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 50,
    question: "Construct an argument that our understanding of motion has made car travel safer. Refer to at least one safety feature. (4 marks)",
    model: "Claim: Applying the physics of motion has made car travel much safer. Evidence: Modern cars have seatbelts, airbags and crumple zones, and road deaths per kilometre driven have fallen greatly since these were introduced. Reasoning: In a crash the car and people must lose their velocity. Crumple zones and airbags make this happen over a longer time, so the deceleration (a = (v \u2212 u) \xF7 t) is smaller, and by F = m a a smaller force acts on the people, causing fewer injuries. Seatbelts stop people continuing forward because of their inertia. Conclusion: Although these features add cost and cannot prevent every injury, they reduce the forces on the body so much that understanding motion has clearly made cars safer."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 51,
    question: "Evaluate the impact of wireless communication (using radio waves and microwaves) on society. (5 marks)",
    model: "Wireless communication uses radio waves and microwaves, which travel at 3.0 \xD7 10\u2078 m/s and pass through the atmosphere, so information can be sent almost instantly around the world, including by satellite. Benefits: people can contact emergency services from almost anywhere, students can learn online, businesses can trade worldwide, and remote communities are better connected. Drawbacks: discarded phones create e-waste, too much screen time can affect sleep and wellbeing, and people without coverage can be left behind. The radio waves and microwaves used are non-ionising, so at normal exposure they do not damage DNA like X-rays or gamma rays can. Judgement: overall, the impact has been strongly positive because the benefits to safety, education and the economy are large, while the main drawbacks can be reduced by recycling and sensible use."
  })), /*#__PURE__*/React.createElement(SelfCheck, {
    id: "7.5.1",
    items: ["I can structure an argument with a claim, evidence, reasoning and a conclusion.", "I can explain the wave or motion science behind at least three technologies.", "I can include a limitation and still reach a judgement for an 'evaluate' question."]
  }), /*#__PURE__*/React.createElement(NotebookLink, {
    href: NB + "#7.5",
    label: "Learn it in full: Waves in Society"
  })));
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
    "gradient": "The steepness of a line on a graph: rise ÷ run."
  },
  sections: [{
    id: "7.1",
    label: "Wave Properties",
    accent: "blue",
    blurb: "★★ Transverse and longitudinal waves, v = fλ calculations, the EM spectrum and its uses.",
    points: ["7.1.3", "7.1.4", "7.1.6", "7.1.7"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section71, p);
    }
  }, {
    id: "7.2",
    label: "Sound and Hearing",
    accent: "cyan",
    blurb: "★★★ How the ear responds to sound, plus sound as compressions and rarefactions in a medium.",
    points: ["7.2.1", "7.2.4"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section72, p);
    }
  }, {
    id: "7.3",
    label: "Light",
    accent: "violet",
    blurb: "★★ Absorption, reflection, refraction and scattering of light.",
    points: ["7.3.2"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section73, p);
    }
  }, {
    id: "7.4",
    label: "Motion and Forces",
    accent: "blue",
    blurb: "★★★ Motion formulas and graphs, F = ma, net force, distance–time graphs, scalars and vectors.",
    points: ["7.4.1", "7.4.3", "7.4.4", "7.4.6", "7.4.7"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section74, p);
    }
  }, {
    id: "7.5",
    label: "Waves, Motion and Society",
    accent: "teal",
    blurb: "★★ Structuring an argument about how waves and motion have changed society.",
    points: ["7.5.1"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section75, p);
    }
  }]
});

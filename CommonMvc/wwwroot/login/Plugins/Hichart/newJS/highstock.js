﻿/*
 Highstock JS v8.2.0 (2020-08-20)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (S, N) { "object" === typeof module && module.exports ? (N["default"] = N, module.exports = S.document ? N(S) : N) : "function" === typeof define && define.amd ? define("highcharts/highstock", function () { return N(S) }) : (S.Highcharts && S.Highcharts.error(16, !0), S.Highcharts = N(S)) })("undefined" !== typeof window ? window : this, function (S) {
    function N(q, f, r, C) { q.hasOwnProperty(f) || (q[f] = C.apply(null, r)) } var r = {}; N(r, "Core/Globals.js", [], function () {
        var q = "undefined" !== typeof S ? S : "undefined" !== typeof window ? window : {}, f = q.document,
        r = q.navigator && q.navigator.userAgent || "", C = f && f.createElementNS && !!f.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, G = /(edge|msie|trident)/i.test(r) && !q.opera, B = -1 !== r.indexOf("Firefox"), H = -1 !== r.indexOf("Chrome"), D = B && 4 > parseInt(r.split("Firefox/")[1], 10); return {
            product: "Highcharts", version: "8.2.0", deg2rad: 2 * Math.PI / 360, doc: f, hasBidiBug: D, hasTouch: !!q.TouchEvent, isMS: G, isWebKit: -1 !== r.indexOf("AppleWebKit"), isFirefox: B, isChrome: H, isSafari: !H && -1 !== r.indexOf("Safari"), isTouchDevice: /(Mobile|Android|Windows Phone)/.test(r),
            SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: C, win: q, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function () { }, charts: [], dateFormats: {}
        }
    }); N(r, "Core/Utilities.js", [r["Core/Globals.js"]], function (q) {
        function f(b, m, d, a) {
            var J = m ? "Highcharts error" : "Highcharts warning"; 32 === b && (b = J + ": Deprecated member"); var e = x(b), k = e ? J + " #" + b + ": www.highcharts.com/errors/" + b + "/" : b.toString(); J = function () {
                if (m) throw Error(k); I.console && -1 === f.messages.indexOf(k) &&
                    console.log(k)
            }; if ("undefined" !== typeof a) { var P = ""; e && (k += "?"); U(a, function (b, m) { P += "\n - " + m + ": " + b; e && (k += encodeURI(m) + "=" + encodeURI(b)) }); k += P } d ? ea(d, "displayError", { code: b, message: k, params: a }, J) : J(); f.messages.push(k)
        } function r() { var b, m = arguments, d = {}, a = function (b, m) { "object" !== typeof b && (b = {}); U(m, function (d, J) { !C(d, !0) || v(d) || l(d) ? b[J] = m[J] : b[J] = a(b[J] || {}, d) }); return b }; !0 === m[0] && (d = m[1], m = Array.prototype.slice.call(m, 2)); var J = m.length; for (b = 0; b < J; b++)d = a(d, m[b]); return d } function C(b,
            m) { return !!b && "object" === typeof b && (!m || !E(b)) } function G(b, m, d) { var a; L(m) ? g(d) ? b.setAttribute(m, d) : b && b.getAttribute && ((a = b.getAttribute(m)) || "class" !== m || (a = b.getAttribute(m + "Name"))) : U(m, function (m, d) { b.setAttribute(d, m) }); return a } function B() { for (var b = arguments, m = b.length, d = 0; d < m; d++) { var a = b[d]; if ("undefined" !== typeof a && null !== a) return a } } function H(b, m) {
                if (!b) return m; var d = b.split(".").reverse(); if (1 === d.length) return m[b]; for (b = d.pop(); "undefined" !== typeof b && "undefined" !== typeof m && null !==
                    m;)m = m[b], b = d.pop(); return m
            } q.timers = []; var D = q.charts, n = q.doc, I = q.win; (f || (f = {})).messages = []; q.error = f; var M = function () {
                function b(b, m, d) { this.options = m; this.elem = b; this.prop = d } b.prototype.dSetter = function () {
                    var b = this.paths, m = b && b[0]; b = b && b[1]; var d = [], a = this.now || 0; if (1 !== a && m && b) if (m.length === b.length && 1 > a) for (var J = 0; J < b.length; J++) { for (var e = m[J], k = b[J], P = [], c = 0; c < k.length; c++) { var h = e[c], g = k[c]; P[c] = "number" === typeof h && "number" === typeof g && ("A" !== k[0] || 4 !== c && 5 !== c) ? h + a * (g - h) : g } d.push(P) } else d =
                        b; else d = this.toD || []; this.elem.attr("d", d, void 0, !0)
                }; b.prototype.update = function () { var b = this.elem, m = this.prop, d = this.now, a = this.options.step; if (this[m + "Setter"]) this[m + "Setter"](); else b.attr ? b.element && b.attr(m, d, null, !0) : b.style[m] = d + this.unit; a && a.call(b, d, this) }; b.prototype.run = function (b, m, d) {
                    var a = this, J = a.options, e = function (b) { return e.stopped ? !1 : a.step(b) }, k = I.requestAnimationFrame || function (b) { setTimeout(b, 13) }, P = function () {
                        for (var b = 0; b < q.timers.length; b++)q.timers[b]() || q.timers.splice(b--,
                            1); q.timers.length && k(P)
                    }; b !== m || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = b, this.end = m, this.unit = d, this.now = this.start, this.pos = 0, e.elem = this.elem, e.prop = this.prop, e() && 1 === q.timers.push(e) && k(P)) : (delete J.curAnim[this.prop], J.complete && 0 === Object.keys(J.curAnim).length && J.complete.call(this.elem))
                }; b.prototype.step = function (b) {
                    var m = +new Date, d = this.options, a = this.elem, J = d.complete, e = d.duration, k = d.curAnim; if (a.attr && !a.element) b = !1; else if (b || m >= e + this.startTime) {
                    this.now =
                        this.end; this.pos = 1; this.update(); var P = k[this.prop] = !0; U(k, function (b) { !0 !== b && (P = !1) }); P && J && J.call(a); b = !1
                    } else this.pos = d.easing((m - this.startTime) / e), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0; return b
                }; b.prototype.initPath = function (b, m, d) {
                    function a(b, m) { for (; b.length < u;) { var d = b[0], a = m[u - b.length]; a && "M" === d[0] && (b[0] = "C" === a[0] ? ["C", d[1], d[2], d[1], d[2], d[1], d[2]] : ["L", d[1], d[2]]); b.unshift(d); P && b.push(b[b.length - 1]) } } function J(b, m) {
                        for (; b.length < u;)if (m = b[b.length /
                            c - 1].slice(), "C" === m[0] && (m[1] = m[5], m[2] = m[6]), P) { var d = b[b.length / c].slice(); b.splice(b.length / 2, 0, m, d) } else b.push(m)
                    } var e = b.startX, k = b.endX; m = m && m.slice(); d = d.slice(); var P = b.isArea, c = P ? 2 : 1; if (!m) return [d, d]; if (e && k) { for (b = 0; b < e.length; b++)if (e[b] === k[0]) { var h = b; break } else if (e[0] === k[k.length - e.length + b]) { h = b; var g = !0; break } else if (e[e.length - 1] === k[k.length - e.length + b]) { h = e.length - b; break } "undefined" === typeof h && (m = []) } if (m.length && x(h)) { var u = d.length + h * c; g ? (a(m, d), J(d, m)) : (a(d, m), J(m, d)) } return [m,
                        d]
                }; b.prototype.fillSetter = function () { b.prototype.strokeSetter.apply(this, arguments) }; b.prototype.strokeSetter = function () { this.elem.attr(this.prop, q.color(this.start).tweenTo(q.color(this.end), this.pos), null, !0) }; return b
            }(); q.Fx = M; q.merge = r; var A = q.pInt = function (b, m) { return parseInt(b, m || 10) }, L = q.isString = function (b) { return "string" === typeof b }, E = q.isArray = function (b) { b = Object.prototype.toString.call(b); return "[object Array]" === b || "[object Array Iterator]" === b }; q.isObject = C; var l = q.isDOMElement = function (b) {
                return C(b) &&
                    "number" === typeof b.nodeType
            }, v = q.isClass = function (b) { var m = b && b.constructor; return !(!C(b, !0) || l(b) || !m || !m.name || "Object" === m.name) }, x = q.isNumber = function (b) { return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b }, t = q.erase = function (b, m) { for (var d = b.length; d--;)if (b[d] === m) { b.splice(d, 1); break } }, g = q.defined = function (b) { return "undefined" !== typeof b && null !== b }; q.attr = G; var c = q.splat = function (b) { return E(b) ? b : [b] }, p = q.syncTimeout = function (b, m, d) { if (0 < m) return setTimeout(b, m, d); b.call(0, d); return -1 },
                h = q.clearTimeout = function (b) { g(b) && clearTimeout(b) }, e = q.extend = function (b, m) { var d; b || (b = {}); for (d in m) b[d] = m[d]; return b }; q.pick = B; var a = q.css = function (b, m) { q.isMS && !q.svg && m && "undefined" !== typeof m.opacity && (m.filter = "alpha(opacity=" + 100 * m.opacity + ")"); e(b.style, m) }, u = q.createElement = function (b, m, d, J, k) { b = n.createElement(b); m && e(b, m); k && a(b, { padding: "0", border: "none", margin: "0" }); d && a(b, d); J && J.appendChild(b); return b }, w = q.extendClass = function (b, m) {
                    var d = function () { }; d.prototype = new b; e(d.prototype,
                        m); return d
                }, F = q.pad = function (b, m, d) { return Array((m || 2) + 1 - String(b).replace("-", "").length).join(d || "0") + b }, y = q.relativeLength = function (b, m, d) { return /%$/.test(b) ? m * parseFloat(b) / 100 + (d || 0) : parseFloat(b) }, k = q.wrap = function (b, m, d) { var a = b[m]; b[m] = function () { var b = Array.prototype.slice.call(arguments), m = arguments, J = this; J.proceed = function () { a.apply(J, arguments.length ? arguments : m) }; b.unshift(a); b = d.apply(this, b); J.proceed = null; return b } }, z = q.format = function (b, m, d) {
                    var a = "{", J = !1, e = [], k = /f$/, P = /\.([0-9])/,
                    c = q.defaultOptions.lang, h = d && d.time || q.time; for (d = d && d.numberFormatter || W; b;) { var g = b.indexOf(a); if (-1 === g) break; var u = b.slice(0, g); if (J) { u = u.split(":"); a = H(u.shift() || "", m); if (u.length && "number" === typeof a) if (u = u.join(":"), k.test(u)) { var w = parseInt((u.match(P) || ["", "-1"])[1], 10); null !== a && (a = d(a, w, c.decimalPoint, -1 < u.indexOf(",") ? c.thousandsSep : "")) } else a = h.dateFormat(u, a); e.push(a) } else e.push(u); b = b.slice(g + 1); a = (J = !J) ? "}" : "{" } e.push(b); return e.join("")
                }, O = q.getMagnitude = function (b) {
                    return Math.pow(10,
                        Math.floor(Math.log(b) / Math.LN10))
                }, K = q.normalizeTickInterval = function (b, m, d, a, J) { var e = b; d = B(d, 1); var k = b / d; m || (m = J ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === a && (1 === d ? m = m.filter(function (b) { return 0 === b % 1 }) : .1 >= d && (m = [1 / d]))); for (a = 0; a < m.length && !(e = m[a], J && e * d >= b || !J && k <= (m[a] + (m[a + 1] || m[a])) / 2); a++); return e = Q(e * d, -Math.round(Math.log(.001) / Math.LN10)) }, d = q.stableSort = function (b, m) {
                    var d = b.length, a, J; for (J = 0; J < d; J++)b[J].safeI = J; b.sort(function (b, d) {
                        a = m(b, d); return 0 === a ? b.safeI - d.safeI :
                            a
                    }); for (J = 0; J < d; J++)delete b[J].safeI
                }, b = q.arrayMin = function (b) { for (var m = b.length, d = b[0]; m--;)b[m] < d && (d = b[m]); return d }, m = q.arrayMax = function (b) { for (var m = b.length, d = b[0]; m--;)b[m] > d && (d = b[m]); return d }, J = q.destroyObjectProperties = function (b, m) { U(b, function (d, a) { d && d !== m && d.destroy && d.destroy(); delete b[a] }) }, P = q.discardElement = function (b) { var m = q.garbageBin; m || (m = u("div")); b && m.appendChild(b); m.innerHTML = "" }, Q = q.correctFloat = function (b, m) { return parseFloat(b.toPrecision(m || 14)) }, Y = q.setAnimation =
                    function (b, m) { m.renderer.globalAnimation = B(b, m.options.chart.animation, !0) }, V = q.animObject = function (b) { return C(b) ? q.merge({ duration: 500, defer: 0 }, b) : { duration: b ? 500 : 0, defer: 0 } }, Z = q.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 }, W = q.numberFormat = function (b, m, d, a) {
                        b = +b || 0; m = +m; var J = q.defaultOptions.lang, e = (b.toString().split(".")[1] || "").split("e")[0].length, k = b.toString().split("e"); if (-1 === m) m = Math.min(e, 20); else if (!x(m)) m = 2; else if (m &&
                            k[1] && 0 > k[1]) { var P = m + +k[1]; 0 <= P ? (k[0] = (+k[0]).toExponential(P).split("e")[0], m = P) : (k[0] = k[0].split(".")[0] || 0, b = 20 > m ? (k[0] * Math.pow(10, k[1])).toFixed(m) : 0, k[1] = 0) } var c = (Math.abs(k[1] ? k[0] : b) + Math.pow(10, -Math.max(m, e) - 1)).toFixed(m); e = String(A(c)); P = 3 < e.length ? e.length % 3 : 0; d = B(d, J.decimalPoint); a = B(a, J.thousandsSep); b = (0 > b ? "-" : "") + (P ? e.substr(0, P) + a : ""); b += e.substr(P).replace(/(\d{3})(?=\d)/g, "$1" + a); m && (b += d + c.slice(-m)); k[1] && 0 !== +b && (b += "e" + k[1]); return b
                    }; Math.easeInOutSine = function (b) {
                        return -.5 *
                            (Math.cos(Math.PI * b) - 1)
                    }; var aa = q.getStyle = function (b, m, d) {
                        if ("width" === m) return m = Math.min(b.offsetWidth, b.scrollWidth), d = b.getBoundingClientRect && b.getBoundingClientRect().width, d < m && d >= m - 1 && (m = Math.floor(d)), Math.max(0, m - q.getStyle(b, "padding-left") - q.getStyle(b, "padding-right")); if ("height" === m) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - q.getStyle(b, "padding-top") - q.getStyle(b, "padding-bottom")); I.getComputedStyle || f(27, !0); if (b = I.getComputedStyle(b, void 0)) b = b.getPropertyValue(m),
                            B(d, "opacity" !== m) && (b = A(b)); return b
                    }, ba = q.getDeferredAnimation = function (b, m, d) { var a = V(m), J = 0, e = 0; (d ? [d] : b.series).forEach(function (b) { b = V(b.options.animation); J = m && g(m.defer) ? a.defer : Math.max(J, b.duration + b.defer); e = Math.min(a.duration, b.duration) }); b.renderer.forExport && (J = 0); return { defer: Math.max(0, J - e), duration: Math.min(J, e) } }, X = q.inArray = function (b, m, d) { f(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" }); return m.indexOf(b, d) }, fa = q.find = Array.prototype.find ? function (b, m) { return b.find(m) } :
                        function (b, m) { var d, a = b.length; for (d = 0; d < a; d++)if (m(b[d], d)) return b[d] }; q.keys = function (b) { f(32, !1, void 0, { "Highcharts.keys": "use Object.keys" }); return Object.keys(b) }; var ka = q.offset = function (b) { var m = n.documentElement; b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : { top: 0, left: 0 }; return { top: b.top + (I.pageYOffset || m.scrollTop) - (m.clientTop || 0), left: b.left + (I.pageXOffset || m.scrollLeft) - (m.clientLeft || 0) } }, ha = q.stop = function (b, m) {
                            for (var d = q.timers.length; d--;)q.timers[d].elem !== b || m && m !==
                                q.timers[d].prop || (q.timers[d].stopped = !0)
                        }, U = q.objectEach = function (b, m, d) { for (var a in b) Object.hasOwnProperty.call(b, a) && m.call(d || b[a], b[a], a, b) }; U({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function (b, m) { q[m] = function (d) { var a; f(32, !1, void 0, (a = {}, a["Highcharts." + m] = "use Array." + b, a)); return Array.prototype[b].apply(d, [].slice.call(arguments, 1)) } }); var la = q.addEvent = function (b, m, d, a) {
                        void 0 === a && (a = {}); var J = b.addEventListener || q.addEventListenerPolyfill; var e = "function" ===
                            typeof b && b.prototype ? b.prototype.protoEvents = b.prototype.protoEvents || {} : b.hcEvents = b.hcEvents || {}; q.Point && b instanceof q.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0); J && J.call(b, m, d, !1); e[m] || (e[m] = []); e[m].push({ fn: d, order: "number" === typeof a.order ? a.order : Infinity }); e[m].sort(function (b, m) { return b.order - m.order }); return function () { ia(b, m, d) }
                        }, ia = q.removeEvent = function (b, m, d) {
                            function a(m, d) { var a = b.removeEventListener || q.removeEventListenerPolyfill; a && a.call(b, m, d, !1) }
                            function J(d) { var J; if (b.nodeName) { if (m) { var e = {}; e[m] = !0 } else e = d; U(e, function (b, m) { if (d[m]) for (J = d[m].length; J--;)a(m, d[m][J].fn) }) } } var e;["protoEvents", "hcEvents"].forEach(function (k, P) { var c = (P = P ? b : b.prototype) && P[k]; c && (m ? (e = c[m] || [], d ? (c[m] = e.filter(function (b) { return d !== b.fn }), a(m, d)) : (J(c), c[m] = [])) : (J(c), P[k] = {})) })
                        }, ea = q.fireEvent = function (b, m, d, a) {
                            var J; d = d || {}; if (n.createEvent && (b.dispatchEvent || b.fireEvent)) {
                                var k = n.createEvent("Events"); k.initEvent(m, !0, !0); e(k, d); b.dispatchEvent ?
                                    b.dispatchEvent(k) : b.fireEvent(m, k)
                            } else d.target || e(d, { preventDefault: function () { d.defaultPrevented = !0 }, target: b, type: m }), function (m, a) { void 0 === m && (m = []); void 0 === a && (a = []); var e = 0, k = 0, P = m.length + a.length; for (J = 0; J < P; J++)!1 === (m[e] ? a[k] ? m[e].order <= a[k].order ? m[e++] : a[k++] : m[e++] : a[k++]).fn.call(b, d) && d.preventDefault() }(b.protoEvents && b.protoEvents[m], b.hcEvents && b.hcEvents[m]); a && !d.defaultPrevented && a.call(b, d)
                        }, T = q.animate = function (b, m, d) {
                            var a, J = "", e, k; if (!C(d)) {
                                var P = arguments; d = {
                                    duration: P[2],
                                    easing: P[3], complete: P[4]
                                }
                            } x(d.duration) || (d.duration = 400); d.easing = "function" === typeof d.easing ? d.easing : Math[d.easing] || Math.easeInOutSine; d.curAnim = r(m); U(m, function (P, c) { ha(b, c); k = new M(b, d, c); e = null; "d" === c && E(m.d) ? (k.paths = k.initPath(b, b.pathArray, m.d), k.toD = m.d, a = 0, e = 1) : b.attr ? a = b.attr(c) : (a = parseFloat(aa(b, c)) || 0, "opacity" !== c && (J = "px")); e || (e = P); e && e.match && e.match("px") && (e = e.replace(/px/g, "")); k.run(a, e, J) })
                        }, ca = q.seriesType = function (b, m, d, a, J) {
                            var e = ja(), k = q.seriesTypes; e.plotOptions[b] =
                                r(e.plotOptions[m], d); k[b] = w(k[m] || function () { }, a); k[b].prototype.type = b; J && (k[b].prototype.pointClass = w(q.Point, J)); return k[b]
                        }, da, ma = q.uniqueKey = function () { var b = Math.random().toString(36).substring(2, 9) + "-", m = 0; return function () { return "highcharts-" + (da ? "" : b) + m++ } }(), N = q.useSerialIds = function (b) { return da = B(b, da) }, na = q.isFunction = function (b) { return "function" === typeof b }, ja = q.getOptions = function () { return q.defaultOptions }, oa = q.setOptions = function (b) {
                        q.defaultOptions = r(!0, q.defaultOptions, b); (b.time ||
                            b.global) && q.time.update(r(q.defaultOptions.global, q.defaultOptions.time, b.global, b.time)); return q.defaultOptions
                        }; I.jQuery && (I.jQuery.fn.highcharts = function () { var b = [].slice.call(arguments); if (this[0]) return b[0] ? (new (q[L(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) : D[G(this[0], "data-highcharts-chart")] }); return {
                            Fx: q.Fx, addEvent: la, animate: T, animObject: V, arrayMax: m, arrayMin: b, attr: G, clamp: function (b, m, d) { return b > m ? b < d ? b : d : m }, clearTimeout: h, correctFloat: Q, createElement: u, css: a, defined: g,
                            destroyObjectProperties: J, discardElement: P, erase: t, error: f, extend: e, extendClass: w, find: fa, fireEvent: ea, format: z, getDeferredAnimation: ba, getMagnitude: O, getNestedProperty: H, getOptions: ja, getStyle: aa, inArray: X, isArray: E, isClass: v, isDOMElement: l, isFunction: na, isNumber: x, isObject: C, isString: L, merge: r, normalizeTickInterval: K, numberFormat: W, objectEach: U, offset: ka, pad: F, pick: B, pInt: A, relativeLength: y, removeEvent: ia, seriesType: ca, setAnimation: Y, setOptions: oa, splat: c, stableSort: d, stop: ha, syncTimeout: p, timeUnits: Z,
                            uniqueKey: ma, useSerialIds: N, wrap: k
                        }
    }); N(r, "Core/Color.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
        var r = f.isNumber, C = f.merge, G = f.pInt; f = function () {
            function f(q) {
            this.parsers = [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function (f) { return [G(f[1]), G(f[2]), G(f[3]), parseFloat(f[4], 10)] } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (f) { return [G(f[1]), G(f[2]), G(f[3]), 1] } }]; this.rgba =
                []; if (!(this instanceof f)) return new f(q); this.init(q)
            } f.parse = function (q) { return new f(q) }; f.prototype.init = function (q) {
                var D, n; if ((this.input = q = f.names[q && q.toLowerCase ? q.toLowerCase() : ""] || q) && q.stops) this.stops = q.stops.map(function (A) { return new f(A[1]) }); else {
                    if (q && q.charAt && "#" === q.charAt()) { var I = q.length; q = parseInt(q.substr(1), 16); 7 === I ? D = [(q & 16711680) >> 16, (q & 65280) >> 8, q & 255, 1] : 4 === I && (D = [(q & 3840) >> 4 | (q & 3840) >> 8, (q & 240) >> 4 | q & 240, (q & 15) << 4 | q & 15, 1]) } if (!D) for (n = this.parsers.length; n-- && !D;) {
                        var M =
                            this.parsers[n]; (I = M.regex.exec(q)) && (D = M.parse(I))
                    }
                } this.rgba = D || []
            }; f.prototype.get = function (f) { var q = this.input, n = this.rgba; if ("undefined" !== typeof this.stops) { var I = C(q); I.stops = [].concat(I.stops); this.stops.forEach(function (n, A) { I.stops[A] = [I.stops[A][0], n.get(f)] }) } else I = n && r(n[0]) ? "rgb" === f || !f && 1 === n[3] ? "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")" : "a" === f ? n[3] : "rgba(" + n.join(",") + ")" : q; return I }; f.prototype.brighten = function (f) {
                var q, n = this.rgba; if (this.stops) this.stops.forEach(function (n) { n.brighten(f) });
                else if (r(f) && 0 !== f) for (q = 0; 3 > q; q++)n[q] += G(255 * f), 0 > n[q] && (n[q] = 0), 255 < n[q] && (n[q] = 255); return this
            }; f.prototype.setOpacity = function (f) { this.rgba[3] = f; return this }; f.prototype.tweenTo = function (f, q) { var n = this.rgba, I = f.rgba; I.length && n && n.length ? (f = 1 !== I[3] || 1 !== n[3], q = (f ? "rgba(" : "rgb(") + Math.round(I[0] + (n[0] - I[0]) * (1 - q)) + "," + Math.round(I[1] + (n[1] - I[1]) * (1 - q)) + "," + Math.round(I[2] + (n[2] - I[2]) * (1 - q)) + (f ? "," + (I[3] + (n[3] - I[3]) * (1 - q)) : "") + ")") : q = f.input || "none"; return q }; f.names = { white: "#ffffff", black: "#000000" };
            return f
        }(); q.Color = f; q.color = f.parse; return q.Color
    }); N(r, "Core/Renderer/SVG/SVGElement.js", [r["Core/Color.js"], r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f, r) {
        var C = f.deg2rad, G = f.doc, B = f.hasTouch, H = f.isFirefox, D = f.noop, n = f.svg, I = f.SVG_NS, M = f.win, A = r.animate, L = r.animObject, E = r.attr, l = r.createElement, v = r.css, x = r.defined, t = r.erase, g = r.extend, c = r.fireEvent, p = r.isArray, h = r.isFunction, e = r.isNumber, a = r.isString, u = r.merge, w = r.objectEach, F = r.pick, y = r.pInt, k = r.stop, z = r.syncTimeout, O = r.uniqueKey;
        ""; r = function () {
            function K() { this.height = this.element = void 0; this.opacity = 1; this.renderer = void 0; this.SVG_NS = I; this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" "); this.width = void 0 } K.prototype._defaultGetter = function (d) { d = F(this[d + "Value"], this[d], this.element ? this.element.getAttribute(d) : null, 0); /^[\-0-9\.]+$/.test(d) && (d = parseFloat(d)); return d }; K.prototype._defaultSetter = function (d, b, m) { m.setAttribute(b, d) }; K.prototype.add = function (d) {
                var b = this.renderer,
                m = this.element; d && (this.parentGroup = d); this.parentInverted = d && d.inverted; "undefined" !== typeof this.textStr && "text" === this.element.nodeName && b.buildText(this); this.added = !0; if (!d || d.handleZ || this.zIndex) var a = this.zIndexSetter(); a || (d ? d.element : b.box).appendChild(m); if (this.onAdd) this.onAdd(); return this
            }; K.prototype.addClass = function (d, b) {
                var m = b ? "" : this.attr("class") || ""; d = (d || "").split(/ /g).reduce(function (b, d) { -1 === m.indexOf(d) && b.push(d); return b }, m ? [m] : []).join(" "); d !== m && this.attr("class",
                    d); return this
            }; K.prototype.afterSetters = function () { this.doTransform && (this.updateTransform(), this.doTransform = !1) }; K.prototype.align = function (d, b, m) {
                var J, e = {}; var k = this.renderer; var c = k.alignedObjects; var h, u; if (d) { if (this.alignOptions = d, this.alignByTranslate = b, !m || a(m)) this.alignTo = J = m || "renderer", t(c, this), c.push(this), m = void 0 } else d = this.alignOptions, b = this.alignByTranslate, J = this.alignTo; m = F(m, k[J], k); J = d.align; k = d.verticalAlign; c = (m.x || 0) + (d.x || 0); var g = (m.y || 0) + (d.y || 0); "right" === J ? h = 1 :
                    "center" === J && (h = 2); h && (c += (m.width - (d.width || 0)) / h); e[b ? "translateX" : "x"] = Math.round(c); "bottom" === k ? u = 1 : "middle" === k && (u = 2); u && (g += (m.height - (d.height || 0)) / u); e[b ? "translateY" : "y"] = Math.round(g); this[this.placed ? "animate" : "attr"](e); this.placed = !0; this.alignAttr = e; return this
            }; K.prototype.alignSetter = function (d) { var b = { left: "start", center: "middle", right: "end" }; b[d] && (this.alignValue = d, this.element.setAttribute("text-anchor", b[d])) }; K.prototype.animate = function (d, b, m) {
                var a = this, e = L(F(b, this.renderer.globalAnimation,
                    !0)); b = e.defer; F(G.hidden, G.msHidden, G.webkitHidden, !1) && (e.duration = 0); 0 !== e.duration ? (m && (e.complete = m), z(function () { a.element && A(a, d, e) }, b)) : (this.attr(d, void 0, m), w(d, function (b, m) { e.step && e.step.call(this, b, { prop: m, pos: 1 }) }, this)); return this
            }; K.prototype.applyTextOutline = function (d) {
                var b = this.element, m; -1 !== d.indexOf("contrast") && (d = d.replace(/contrast/g, this.renderer.getContrast(b.style.fill))); d = d.split(" "); var a = d[d.length - 1]; if ((m = d[0]) && "none" !== m && f.svg) {
                this.fakeTS = !0; d = [].slice.call(b.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter; m = m.replace(/(^[\d\.]+)(.*?)$/g, function (b, m, d) { return 2 * m + d }); this.removeTextOutline(d); var e = b.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(b.textContent) : !1; var k = b.firstChild; d.forEach(function (d, J) {
                    0 === J && (d.setAttribute("x", b.getAttribute("x")), J = b.getAttribute("y"), d.setAttribute("y", J || 0), null === J && b.setAttribute("y", 0)); J = d.cloneNode(!0); E(e && !H ? d : J, { "class": "highcharts-text-outline", fill: a, stroke: a, "stroke-width": m, "stroke-linejoin": "round" });
                        b.insertBefore(J, k)
                    }); e && H && d[0] && (d = d[0].cloneNode(!0), d.textContent = " ", b.insertBefore(d, k))
                }
            }; K.prototype.attr = function (d, b, m, a) {
                var e = this.element, J, c = this, h, u, g = this.symbolCustomAttribs; if ("string" === typeof d && "undefined" !== typeof b) { var z = d; d = {}; d[z] = b } "string" === typeof d ? c = (this[d + "Getter"] || this._defaultGetter).call(this, d, e) : (w(d, function (b, m) {
                    h = !1; a || k(this, m); this.symbolName && -1 !== g.indexOf(m) && (J || (this.symbolAttr(d), J = !0), h = !0); !this.rotation || "x" !== m && "y" !== m || (this.doTransform = !0);
                    h || (u = this[m + "Setter"] || this._defaultSetter, u.call(this, b, m, e), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(m) && this.updateShadows(m, b, u))
                }, this), this.afterSetters()); m && m.call(this); return c
            }; K.prototype.clip = function (d) { return this.attr("clip-path", d ? "url(" + this.renderer.url + "#" + d.id + ")" : "none") }; K.prototype.crisp = function (d, b) {
                b = b || d.strokeWidth || 0; var m = Math.round(b) % 2 / 2; d.x = Math.floor(d.x || this.x || 0) + m; d.y = Math.floor(d.y || this.y || 0) + m; d.width = Math.floor((d.width ||
                    this.width || 0) - 2 * m); d.height = Math.floor((d.height || this.height || 0) - 2 * m); x(d.strokeWidth) && (d.strokeWidth = b); return d
            }; K.prototype.complexColor = function (d, b, m) {
                var a = this.renderer, e, k, h, g, z, y, F, t, v, K, l = [], E; c(this.renderer, "complexColor", { args: arguments }, function () {
                    d.radialGradient ? k = "radialGradient" : d.linearGradient && (k = "linearGradient"); if (k) {
                        h = d[k]; z = a.gradients; y = d.stops; v = m.radialReference; p(h) && (d[k] = h = { x1: h[0], y1: h[1], x2: h[2], y2: h[3], gradientUnits: "userSpaceOnUse" }); "radialGradient" === k && v &&
                            !x(h.gradientUnits) && (g = h, h = u(h, a.getRadialAttr(v, g), { gradientUnits: "userSpaceOnUse" })); w(h, function (b, m) { "id" !== m && l.push(m, b) }); w(y, function (b) { l.push(b) }); l = l.join(","); if (z[l]) K = z[l].attr("id"); else { h.id = K = O(); var J = z[l] = a.createElement(k).attr(h).add(a.defs); J.radAttr = g; J.stops = []; y.forEach(function (b) { 0 === b[1].indexOf("rgba") ? (e = q.parse(b[1]), F = e.get("rgb"), t = e.get("a")) : (F = b[1], t = 1); b = a.createElement("stop").attr({ offset: b[0], "stop-color": F, "stop-opacity": t }).add(J); J.stops.push(b) }) } E = "url(" +
                                a.url + "#" + K + ")"; m.setAttribute(b, E); m.gradient = l; d.toString = function () { return E }
                    }
                })
            }; K.prototype.css = function (d) {
                var b = this.styles, m = {}, a = this.element, e = "", k = !b, c = ["textOutline", "textOverflow", "width"]; d && d.color && (d.fill = d.color); b && w(d, function (d, a) { b && b[a] !== d && (m[a] = d, k = !0) }); if (k) {
                    b && (d = g(b, m)); if (d) if (null === d.width || "auto" === d.width) delete this.textWidth; else if ("text" === a.nodeName.toLowerCase() && d.width) var h = this.textWidth = y(d.width); this.styles = d; h && !n && this.renderer.forExport && delete d.width;
                    if (a.namespaceURI === this.SVG_NS) { var u = function (b, m) { return "-" + m.toLowerCase() }; w(d, function (b, m) { -1 === c.indexOf(m) && (e += m.replace(/([A-Z])/g, u) + ":" + b + ";") }); e && E(a, "style", e) } else v(a, d); this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), d && d.textOutline && this.applyTextOutline(d.textOutline))
                } return this
            }; K.prototype.dashstyleSetter = function (d) {
                var b = this["stroke-width"]; "inherit" === b && (b = 1); if (d = d && d.toLowerCase()) {
                    var m = d.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot",
                        "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","); for (d = m.length; d--;)m[d] = "" + y(m[d]) * F(b, NaN); d = m.join(",").replace(/NaN/g, "none"); this.element.setAttribute("stroke-dasharray", d)
                }
            }; K.prototype.destroy = function () {
                var d = this, b = d.element || {}, m = d.renderer, a = m.isSVG && "SPAN" === b.nodeName && d.parentGroup || void 0, e = b.ownerSVGElement; b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point =
                    null; k(d); if (d.clipPath && e) { var c = d.clipPath;[].forEach.call(e.querySelectorAll("[clip-path],[CLIP-PATH]"), function (b) { -1 < b.getAttribute("clip-path").indexOf(c.element.id) && b.removeAttribute("clip-path") }); d.clipPath = c.destroy() } if (d.stops) { for (e = 0; e < d.stops.length; e++)d.stops[e].destroy(); d.stops.length = 0; d.stops = void 0 } d.safeRemoveChild(b); for (m.styledMode || d.destroyShadows(); a && a.div && 0 === a.div.childNodes.length;)b = a.parentGroup, d.safeRemoveChild(a.div), delete a.div, a = b; d.alignTo && t(m.alignedObjects,
                        d); w(d, function (b, m) { d[m] && d[m].parentGroup === d && d[m].destroy && d[m].destroy(); delete d[m] })
            }; K.prototype.destroyShadows = function () { (this.shadows || []).forEach(function (d) { this.safeRemoveChild(d) }, this); this.shadows = void 0 }; K.prototype.destroyTextPath = function (d, b) {
                var m = d.getElementsByTagName("text")[0]; if (m) {
                    if (m.removeAttribute("dx"), m.removeAttribute("dy"), b.element.setAttribute("id", ""), this.textPathWrapper && m.getElementsByTagName("textPath").length) {
                        for (d = this.textPathWrapper.element.childNodes; d.length;)m.appendChild(d[0]);
                        m.removeChild(this.textPathWrapper.element)
                    }
                } else if (d.getAttribute("dx") || d.getAttribute("dy")) d.removeAttribute("dx"), d.removeAttribute("dy"); this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            }; K.prototype.dSetter = function (d, b, m) {
            p(d) && ("string" === typeof d[0] && (d = this.renderer.pathToSegments(d)), this.pathArray = d, d = d.reduce(function (b, m, d) { return m && m.join ? (d ? b + " " : "") + m.join(" ") : (m || "").toString() }, "")); /(NaN| {2}|^$)/.test(d) && (d = "M 0 0"); this[b] !== d && (m.setAttribute(b,
                d), this[b] = d)
            }; K.prototype.fadeOut = function (d) { var b = this; b.animate({ opacity: 0 }, { duration: F(d, 150), complete: function () { b.attr({ y: -9999 }).hide() } }) }; K.prototype.fillSetter = function (d, b, m) { "string" === typeof d ? m.setAttribute(b, d) : d && this.complexColor(d, b, m) }; K.prototype.getBBox = function (d, b) {
                var m, a = this.renderer, e = this.element, k = this.styles, c = this.textStr, u = a.cache, w = a.cacheKeys, z = e.namespaceURI === this.SVG_NS; b = F(b, this.rotation, 0); var p = a.styledMode ? e && K.prototype.getStyle.call(e, "font-size") : k && k.fontSize;
                if (x(c)) { var y = c.toString(); -1 === y.indexOf("<") && (y = y.replace(/[0-9]/g, "0")); y += ["", b, p, this.textWidth, k && k.textOverflow, k && k.fontWeight].join() } y && !d && (m = u[y]); if (!m) {
                    if (z || a.forExport) { try { var t = this.fakeTS && function (b) { [].forEach.call(e.querySelectorAll(".highcharts-text-outline"), function (m) { m.style.display = b }) }; h(t) && t("none"); m = e.getBBox ? g({}, e.getBBox()) : { width: e.offsetWidth, height: e.offsetHeight }; h(t) && t("") } catch (fa) { "" } if (!m || 0 > m.width) m = { width: 0, height: 0 } } else m = this.htmlGetBBox(); a.isSVG &&
                        (d = m.width, a = m.height, z && (m.height = a = { "11px,17": 14, "13px,20": 16 }[k && k.fontSize + "," + Math.round(a)] || a), b && (k = b * C, m.width = Math.abs(a * Math.sin(k)) + Math.abs(d * Math.cos(k)), m.height = Math.abs(a * Math.cos(k)) + Math.abs(d * Math.sin(k)))); if (y && 0 < m.height) { for (; 250 < w.length;)delete u[w.shift()]; u[y] || w.push(y); u[y] = m }
                } return m
            }; K.prototype.getStyle = function (d) { return M.getComputedStyle(this.element || this, "").getPropertyValue(d) }; K.prototype.hasClass = function (d) { return -1 !== ("" + this.attr("class")).split(" ").indexOf(d) };
            K.prototype.hide = function (d) { d ? this.attr({ y: -9999 }) : this.attr({ visibility: "hidden" }); return this }; K.prototype.htmlGetBBox = function () { return { height: 0, width: 0, x: 0, y: 0 } }; K.prototype.init = function (d, b) { this.element = "span" === b ? l(b) : G.createElementNS(this.SVG_NS, b); this.renderer = d; c(this, "afterInit") }; K.prototype.invert = function (d) { this.inverted = d; this.updateTransform(); return this }; K.prototype.on = function (d, b) {
                var m, a, e = this.element, k; B && "click" === d ? (e.ontouchstart = function (b) {
                    m = b.touches[0].clientX; a =
                        b.touches[0].clientY
                }, e.ontouchend = function (d) { m && 4 <= Math.sqrt(Math.pow(m - d.changedTouches[0].clientX, 2) + Math.pow(a - d.changedTouches[0].clientY, 2)) || b.call(e, d); k = !0; d.preventDefault() }, e.onclick = function (m) { k || b.call(e, m) }) : e["on" + d] = b; return this
            }; K.prototype.opacitySetter = function (d, b, m) { this[b] = d; m.setAttribute(b, d) }; K.prototype.removeClass = function (d) { return this.attr("class", ("" + this.attr("class")).replace(a(d) ? new RegExp("(^| )" + d + "( |$)") : d, " ").replace(/ +/g, " ").trim()) }; K.prototype.removeTextOutline =
                function (d) { for (var b = d.length, m; b--;)m = d[b], "highcharts-text-outline" === m.getAttribute("class") && t(d, this.element.removeChild(m)) }; K.prototype.safeRemoveChild = function (d) { var b = d.parentNode; b && b.removeChild(d) }; K.prototype.setRadialReference = function (d) { var b = this.element.gradient && this.renderer.gradients[this.element.gradient]; this.element.radialReference = d; b && b.radAttr && b.animate(this.renderer.getRadialAttr(d, b.radAttr)); return this }; K.prototype.setTextPath = function (d, b) {
                    var m = this.element, a = { textAnchor: "text-anchor" },
                    k = !1, c = this.textPathWrapper, h = !c; b = u(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, b); var g = b.attributes; if (d && b && b.enabled) {
                        c && null === c.element.parentNode ? (h = !0, c = c.destroy()) : c && this.removeTextOutline.call(c.parentGroup, [].slice.call(m.getElementsByTagName("tspan"))); this.options && this.options.padding && (g.dx = -this.options.padding); c || (this.textPathWrapper = c = this.renderer.createElement("textPath"), k = !0); var z = c.element; (b = d.element.getAttribute("id")) || d.element.setAttribute("id",
                            b = O()); if (h) for (d = m.getElementsByTagName("tspan"); d.length;)d[0].setAttribute("y", 0), e(g.dx) && d[0].setAttribute("x", -g.dx), z.appendChild(d[0]); k && c && c.add({ element: this.text ? this.text.element : m }); z.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + b); x(g.dy) && (z.parentNode.setAttribute("dy", g.dy), delete g.dy); x(g.dx) && (z.parentNode.setAttribute("dx", g.dx), delete g.dx); w(g, function (b, m) { z.setAttribute(a[m] || m, b) }); m.removeAttribute("transform"); this.removeTextOutline.call(c,
                                [].slice.call(m.getElementsByTagName("tspan"))); this.text && !this.renderer.styledMode && this.attr({ fill: "none", "stroke-width": 0 }); this.applyTextOutline = this.updateTransform = D
                    } else c && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(m, d), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline)); return this
                }; K.prototype.shadow = function (d, b, m) {
                    var a = [], e = this.element, k = !1, c = this.oldShadowOptions; var h = {
                        color: "#000000",
                        offsetX: 1, offsetY: 1, opacity: .15, width: 3
                    }; var u; !0 === d ? u = h : "object" === typeof d && (u = g(h, d)); u && (u && c && w(u, function (b, m) { b !== c[m] && (k = !0) }), k && this.destroyShadows(), this.oldShadowOptions = u); if (!u) this.destroyShadows(); else if (!this.shadows) {
                        var z = u.opacity / u.width; var p = this.parentInverted ? "translate(-1,-1)" : "translate(" + u.offsetX + ", " + u.offsetY + ")"; for (h = 1; h <= u.width; h++) {
                            var y = e.cloneNode(!1); var F = 2 * u.width + 1 - 2 * h; E(y, { stroke: d.color || "#000000", "stroke-opacity": z * h, "stroke-width": F, transform: p, fill: "none" });
                            y.setAttribute("class", (y.getAttribute("class") || "") + " highcharts-shadow"); m && (E(y, "height", Math.max(E(y, "height") - F, 0)), y.cutHeight = F); b ? b.element.appendChild(y) : e.parentNode && e.parentNode.insertBefore(y, e); a.push(y)
                        } this.shadows = a
                    } return this
                }; K.prototype.show = function (d) { return this.attr({ visibility: d ? "inherit" : "visible" }) }; K.prototype.strokeSetter = function (d, b, m) {
                this[b] = d; this.stroke && this["stroke-width"] ? (K.prototype.fillSetter.call(this, this.stroke, "stroke", m), m.setAttribute("stroke-width",
                    this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === d && this.hasStroke ? (m.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (m.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
                }; K.prototype.strokeWidth = function () {
                    if (!this.renderer.styledMode) return this["stroke-width"] || 0; var d = this.getStyle("stroke-width"), b = 0; if (d.indexOf("px") === d.length - 2) b = y(d); else if ("" !== d) {
                        var m = G.createElementNS(I, "rect"); E(m, { width: d, "stroke-width": 0 });
                        this.element.parentNode.appendChild(m); b = m.getBBox().width; m.parentNode.removeChild(m)
                    } return b
                }; K.prototype.symbolAttr = function (d) { var b = this; "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (m) { b[m] = F(d[m], b[m]) }); b.attr({ d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b) }) }; K.prototype.textSetter = function (d) { d !== this.textStr && (delete this.textPxLength, this.textStr = d, this.added && this.renderer.buildText(this)) }; K.prototype.titleSetter = function (d) {
                    var b =
                        this.element.getElementsByTagName("title")[0]; b || (b = G.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b)); b.firstChild && b.removeChild(b.firstChild); b.appendChild(G.createTextNode(String(F(d, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
                }; K.prototype.toFront = function () { var d = this.element; d.parentNode.appendChild(d); return this }; K.prototype.translate = function (d, b) { return this.attr({ translateX: d, translateY: b }) }; K.prototype.updateShadows = function (d, b, m) {
                    var a = this.shadows;
                    if (a) for (var e = a.length; e--;)m.call(a[e], "height" === d ? Math.max(b - (a[e].cutHeight || 0), 0) : "d" === d ? this.d : b, d, a[e])
                }; K.prototype.updateTransform = function () {
                    var d = this.translateX || 0, b = this.translateY || 0, m = this.scaleX, a = this.scaleY, e = this.inverted, k = this.rotation, c = this.matrix, h = this.element; e && (d += this.width, b += this.height); d = ["translate(" + d + "," + b + ")"]; x(c) && d.push("matrix(" + c.join(",") + ")"); e ? d.push("rotate(90) scale(-1,1)") : k && d.push("rotate(" + k + " " + F(this.rotationOriginX, h.getAttribute("x"), 0) + " " +
                        F(this.rotationOriginY, h.getAttribute("y") || 0) + ")"); (x(m) || x(a)) && d.push("scale(" + F(m, 1) + " " + F(a, 1) + ")"); d.length && h.setAttribute("transform", d.join(" "))
                }; K.prototype.visibilitySetter = function (d, b, m) { "inherit" === d ? m.removeAttribute(b) : this[b] !== d && m.setAttribute(b, d); this[b] = d }; K.prototype.xGetter = function (d) { "circle" === this.element.nodeName && ("x" === d ? d = "cx" : "y" === d && (d = "cy")); return this._defaultGetter(d) }; K.prototype.zIndexSetter = function (d, b) {
                    var m = this.renderer, a = this.parentGroup, e = (a || m).element ||
                        m.box, k = this.element, c = !1; m = e === m.box; var h = this.added; var u; x(d) ? (k.setAttribute("data-z-index", d), d = +d, this[b] === d && (h = !1)) : x(this[b]) && k.removeAttribute("data-z-index"); this[b] = d; if (h) { (d = this.zIndex) && a && (a.handleZ = !0); b = e.childNodes; for (u = b.length - 1; 0 <= u && !c; u--) { a = b[u]; h = a.getAttribute("data-z-index"); var g = !x(h); if (a !== k) if (0 > d && g && !m && !u) e.insertBefore(k, b[u]), c = !0; else if (y(h) <= d || g && (!x(d) || 0 <= d)) e.insertBefore(k, b[u + 1] || null), c = !0 } c || (e.insertBefore(k, b[m ? 3 : 0] || null), c = !0) } return c
                }; return K
        }();
        r.prototype["stroke-widthSetter"] = r.prototype.strokeSetter; r.prototype.yGetter = r.prototype.xGetter; r.prototype.matrixSetter = r.prototype.rotationOriginXSetter = r.prototype.rotationOriginYSetter = r.prototype.rotationSetter = r.prototype.scaleXSetter = r.prototype.scaleYSetter = r.prototype.translateXSetter = r.prototype.translateYSetter = r.prototype.verticalAlignSetter = function (a, d) { this[d] = a; this.doTransform = !0 }; f.SVGElement = r; return f.SVGElement
    }); N(r, "Core/Renderer/SVG/SVGLabel.js", [r["Core/Renderer/SVG/SVGElement.js"],
    r["Core/Utilities.js"]], function (q, f) {
        var r = this && this.__extends || function () { var f = function (n, M) { f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (f, n) { f.__proto__ = n } || function (f, n) { for (var E in n) n.hasOwnProperty(E) && (f[E] = n[E]) }; return f(n, M) }; return function (n, M) { function A() { this.constructor = n } f(n, M); n.prototype = null === M ? Object.create(M) : (A.prototype = M.prototype, new A) } }(), C = f.defined, G = f.extend, B = f.isNumber, H = f.merge, D = f.removeEvent; return function (f) {
            function n(M, A, q, E, l, v, x,
                t, g, c) { var p = f.call(this) || this; p.init(M, "g"); p.textStr = A; p.x = q; p.y = E; p.anchorX = v; p.anchorY = x; p.baseline = g; p.className = c; "button" !== c && p.addClass("highcharts-label"); c && p.addClass("highcharts-" + c); p.text = M.text("", 0, 0, t).attr({ zIndex: 1 }); if ("string" === typeof l) { var h = /^url\((.*?)\)$/.test(l); if (p.renderer.symbols[l] || h) p.symbolKey = l } p.bBox = n.emptyBBox; p.padding = 3; p.paddingLeft = 0; p.baselineOffset = 0; p.needsBox = M.styledMode || h; p.deferredAttr = {}; p.alignFactor = 0; return p } r(n, f); n.prototype.alignSetter =
                    function (n) { n = { left: 0, center: .5, right: 1 }[n]; n !== this.alignFactor && (this.alignFactor = n, this.bBox && B(this.xSetting) && this.attr({ x: this.xSetting })) }; n.prototype.anchorXSetter = function (n, f) { this.anchorX = n; this.boxAttr(f, Math.round(n) - this.getCrispAdjust() - this.xSetting) }; n.prototype.anchorYSetter = function (n, f) { this.anchorY = n; this.boxAttr(f, n - this.ySetting) }; n.prototype.boxAttr = function (n, f) { this.box ? this.box.attr(n, f) : this.deferredAttr[n] = f }; n.prototype.css = function (f) {
                        if (f) {
                            var A = {}; f = H(f); n.textProps.forEach(function (n) {
                            "undefined" !==
                                typeof f[n] && (A[n] = f[n], delete f[n])
                            }); this.text.css(A); var M = "fontSize" in A || "fontWeight" in A; if ("width" in A || M) this.updateBoxSize(), M && this.updateTextPadding()
                        } return q.prototype.css.call(this, f)
                    }; n.prototype.destroy = function () { D(this.element, "mouseenter"); D(this.element, "mouseleave"); this.text && this.text.destroy(); this.box && (this.box = this.box.destroy()); q.prototype.destroy.call(this) }; n.prototype.fillSetter = function (n, f) { n && (this.needsBox = !0); this.fill = n; this.boxAttr(f, n) }; n.prototype.getBBox =
                        function () { var n = this.bBox, f = this.padding; return { width: n.width + 2 * f, height: n.height + 2 * f, x: n.x - f, y: n.y - f } }; n.prototype.getCrispAdjust = function () { return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2 }; n.prototype.heightSetter = function (n) { this.heightSetting = n }; n.prototype.on = function (n, f) {
                            var A = this, E = A.text, l = E && "SPAN" === E.element.tagName ? E : void 0; if (l) {
                                var v = function (v) {
                                ("mouseenter" === n || "mouseleave" === n) && v.relatedTarget instanceof
                                    Element && (A.element.contains(v.relatedTarget) || l.element.contains(v.relatedTarget)) || f.call(A.element, v)
                                }; l.on(n, v)
                            } q.prototype.on.call(A, n, v || f); return A
                        }; n.prototype.onAdd = function () { var n = this.textStr; this.text.add(this); this.attr({ text: C(n) ? n : "", x: this.x, y: this.y }); this.box && C(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY }) }; n.prototype.paddingSetter = function (n) { C(n) && n !== this.padding && (this.padding = n, this.updateTextPadding()) }; n.prototype.paddingLeftSetter = function (n) {
                        C(n) &&
                            n !== this.paddingLeft && (this.paddingLeft = n, this.updateTextPadding())
                        }; n.prototype.rSetter = function (n, f) { this.boxAttr(f, n) }; n.prototype.shadow = function (n) { n && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(n)); return this }; n.prototype.strokeSetter = function (n, f) { this.stroke = n; this.boxAttr(f, n) }; n.prototype["stroke-widthSetter"] = function (n, f) { n && (this.needsBox = !0); this["stroke-width"] = n; this.boxAttr(f, n) }; n.prototype["text-alignSetter"] = function (n) { this.textAlign = n }; n.prototype.textSetter =
                            function (n) { "undefined" !== typeof n && this.text.attr({ text: n }); this.updateBoxSize(); this.updateTextPadding() }; n.prototype.updateBoxSize = function () {
                                var f = this.text.element.style, A = {}, q = this.padding, E = this.paddingLeft, l = B(this.widthSetting) && B(this.heightSetting) && !this.textAlign || !C(this.text.textStr) ? n.emptyBBox : this.text.getBBox(); this.width = (this.widthSetting || l.width || 0) + 2 * q + E; this.height = (this.heightSetting || l.height || 0) + 2 * q; this.baselineOffset = q + Math.min(this.renderer.fontMetrics(f && f.fontSize,
                                    this.text).b, l.height || Infinity); this.needsBox && (this.box || (f = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), f.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), f.add(this), f = this.getCrispAdjust(), A.x = f, A.y = (this.baseline ? -this.baselineOffset : 0) + f), A.width = Math.round(this.width), A.height = Math.round(this.height), this.box.attr(G(A, this.deferredAttr)), this.deferredAttr = {}); this.bBox = l
                            }; n.prototype.updateTextPadding =
                                function () { var n = this.text, f = this.baseline ? 0 : this.baselineOffset, q = this.paddingLeft + this.padding; C(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (q += { center: .5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width)); if (q !== n.x || f !== n.y) n.attr("x", q), n.hasBoxWidthChanged && (this.bBox = n.getBBox(!0), this.updateBoxSize()), "undefined" !== typeof f && n.attr("y", f); n.x = q; n.y = f }; n.prototype.widthSetter = function (n) { this.widthSetting = B(n) ? n : void 0 }; n.prototype.xSetter =
                                    function (n) { this.x = n; this.alignFactor && (n -= this.alignFactor * ((this.widthSetting || this.bBox.width) + 2 * this.padding), this["forceAnimate:x"] = !0); this.xSetting = Math.round(n); this.attr("translateX", this.xSetting) }; n.prototype.ySetter = function (n) { this.ySetting = this.y = Math.round(n); this.attr("translateY", this.ySetting) }; n.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }; n.textProps = "color cursor direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return n
        }(q)
    }); N(r, "Core/Renderer/SVG/SVGRenderer.js", [r["Core/Color.js"], r["Core/Globals.js"], r["Core/Renderer/SVG/SVGElement.js"], r["Core/Renderer/SVG/SVGLabel.js"], r["Core/Utilities.js"]], function (q, f, r, C, G) {
        var B = G.addEvent, H = G.attr, D = G.createElement, n = G.css, I = G.defined, M = G.destroyObjectProperties, A = G.extend, L = G.isArray, E = G.isNumber, l = G.isObject, v = G.isString, x = G.merge, t = G.objectEach, g = G.pick, c = G.pInt, p = G.splat, h = G.uniqueKey, e = f.charts, a = f.deg2rad, u = f.doc, w = f.isFirefox, F = f.isMS, y = f.isWebKit; G =
            f.noop; var k = f.svg, z = f.SVG_NS, O = f.symbolSizes, K = f.win, d = function () {
                function b(b, d, a, e, k, c, h) { this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0; this.init(b, d, a, e, k, c, h) } b.prototype.init = function (b, d, a, e, k, c, h) {
                    var m = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }); h || m.css(this.getStyle(e)); e = m.element; b.appendChild(e);
                    H(b, "dir", "ltr"); -1 === b.innerHTML.indexOf("xmlns") && H(e, "xmlns", this.SVG_NS); this.isSVG = !0; this.box = e; this.boxWrapper = m; this.alignedObjects = []; this.url = (w || y) && u.getElementsByTagName("base").length ? K.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : ""; this.createElement("desc").add().element.appendChild(u.createTextNode("Created with Highcharts 8.2.0")); this.defs = this.createElement("defs").add(); this.allowHTML = c; this.forExport = k; this.styledMode = h;
                    this.gradients = {}; this.cache = {}; this.cacheKeys = []; this.imgCount = 0; this.setSize(d, a, !1); var J; w && b.getBoundingClientRect && (d = function () { n(b, { left: 0, top: 0 }); J = b.getBoundingClientRect(); n(b, { left: Math.ceil(J.left) - J.left + "px", top: Math.ceil(J.top) - J.top + "px" }) }, d(), this.unSubPixelFix = B(K, "resize", d))
                }; b.prototype.definition = function (b) {
                    function m(b, a) {
                        var e; p(b).forEach(function (b) {
                            var k = d.createElement(b.tagName), J = {}; t(b, function (b, m) { "tagName" !== m && "children" !== m && "textContent" !== m && (J[m] = b) }); k.attr(J);
                            k.add(a || d.defs); b.textContent && k.element.appendChild(u.createTextNode(b.textContent)); m(b.children || [], k); e = k
                        }); return e
                    } var d = this; return m(b)
                }; b.prototype.getStyle = function (b) { return this.style = A({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, b) }; b.prototype.setStyle = function (b) { this.boxWrapper.css(this.getStyle(b)) }; b.prototype.isHidden = function () { return !this.boxWrapper.getBBox().width }; b.prototype.destroy = function () {
                    var b = this.defs; this.box =
                        null; this.boxWrapper = this.boxWrapper.destroy(); M(this.gradients || {}); this.gradients = null; b && (this.defs = b.destroy()); this.unSubPixelFix && this.unSubPixelFix(); return this.alignedObjects = null
                }; b.prototype.createElement = function (b) { var m = new this.Element; m.init(this, b); return m }; b.prototype.getRadialAttr = function (b, d) { return { cx: b[0] - b[2] / 2 + d.cx * b[2], cy: b[1] - b[2] / 2 + d.cy * b[2], r: d.r * b[2] } }; b.prototype.truncate = function (b, d, a, e, k, c, h) {
                    var m = this, J = b.rotation, P, g = e ? 1 : 0, w = (a || e).length, z = w, p = [], y = function (b) {
                    d.firstChild &&
                        d.removeChild(d.firstChild); b && d.appendChild(u.createTextNode(b))
                    }, Q = function (c, J) { J = J || c; if ("undefined" === typeof p[J]) if (d.getSubStringLength) try { p[J] = k + d.getSubStringLength(0, e ? J + 1 : J) } catch (da) { "" } else m.getSpanWidth && (y(h(a || e, c)), p[J] = k + m.getSpanWidth(b, d)); return p[J] }, F; b.rotation = 0; var t = Q(d.textContent.length); if (F = k + t > c) { for (; g <= w;)z = Math.ceil((g + w) / 2), e && (P = h(e, z)), t = Q(z, P && P.length - 1), g === w ? g = w + 1 : t > c ? w = z - 1 : g = z; 0 === w ? y("") : a && w === a.length - 1 || y(P || h(a || e, z)) } e && e.splice(0, z); b.actualWidth =
                        t; b.rotation = J; return F
                }; b.prototype.buildText = function (b) {
                    var m = b.element, d = this, a = d.forExport, e = g(b.textStr, "").toString(), h = -1 !== e.indexOf("<"), w = m.childNodes, p, y = H(m, "x"), F = b.styles, l = b.textWidth, K = F && F.lineHeight, x = F && F.textOutline, O = F && "ellipsis" === F.textOverflow, f = F && "nowrap" === F.whiteSpace, E = F && F.fontSize, A, q = w.length; F = l && !b.added && this.box; var I = function (b) {
                        var a; d.styledMode || (a = /(px|em)$/.test(b && b.style.fontSize) ? b.style.fontSize : E || d.style.fontSize || 12); return K ? c(K) : d.fontMetrics(a,
                            b.getAttribute("style") ? b : m).h
                    }, L = function (b, m) { t(d.escapes, function (d, a) { m && -1 !== m.indexOf(d) || (b = b.toString().replace(new RegExp(d, "g"), a)) }); return b }, D = function (b, m) { var d = b.indexOf("<"); b = b.substring(d, b.indexOf(">") - d); d = b.indexOf(m + "="); if (-1 !== d && (d = d + m.length + 1, m = b.charAt(d), '"' === m || "'" === m)) return b = b.substring(d + 1), b.substring(0, b.indexOf(m)) }, r = /<br.*?>/g; var B = [e, O, f, K, x, E, l].join(); if (B !== b.textCache) {
                        for (b.textCache = B; q--;)m.removeChild(w[q]); h || x || O || l || -1 !== e.indexOf(" ") && (!f ||
                            r.test(e)) ? (F && F.appendChild(m), h ? (e = d.styledMode ? e.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g, '<span class="highcharts-emphasized">') : e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), e = e.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(r)) : e = [e], e = e.filter(function (b) { return "" !== b }), e.forEach(function (e, c) {
                                var J = 0, h = 0; e = e.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g,
                                    "</span>|||"); var g = e.split("|||"); g.forEach(function (e) {
                                        if ("" !== e || 1 === g.length) {
                                            var P = {}, w = u.createElementNS(d.SVG_NS, "tspan"), F, Q; (F = D(e, "class")) && H(w, "class", F); if (F = D(e, "style")) F = F.replace(/(;| |^)color([ :])/, "$1fill$2"), H(w, "style", F); if ((Q = D(e, "href")) && !a && -1 === Q.split(":")[0].toLowerCase().indexOf("javascript")) { var t = u.createElementNS(d.SVG_NS, "a"); H(t, "href", Q); H(w, "class", "highcharts-anchor"); t.appendChild(w); d.styledMode || n(w, { cursor: "pointer" }) } e = L(e.replace(/<[a-zA-Z\/](.|\n)*?>/g,
                                                "") || " "); if (" " !== e) {
                                                    w.appendChild(u.createTextNode(e)); J ? P.dx = 0 : c && null !== y && (P.x = y); H(w, P); m.appendChild(t || w); !J && A && (!k && a && n(w, { display: "block" }), H(w, "dy", I(w))); if (l) {
                                                        var v = e.replace(/([^\^])-/g, "$1- ").split(" "); P = !f && (1 < g.length || c || 1 < v.length); t = 0; Q = I(w); if (O) p = d.truncate(b, w, e, void 0, 0, Math.max(0, l - parseInt(E || 12, 10)), function (b, m) { return b.substring(0, m) + "\u2026" }); else if (P) for (; v.length;)v.length && !f && 0 < t && (w = u.createElementNS(z, "tspan"), H(w, { dy: Q, x: y }), F && H(w, "style", F), w.appendChild(u.createTextNode(v.join(" ").replace(/- /g,
                                                            "-"))), m.appendChild(w)), d.truncate(b, w, null, v, 0 === t ? h : 0, l, function (b, m) { return v.slice(0, m).join(" ").replace(/- /g, "-") }), h = b.actualWidth, t++
                                                    } J++
                                                }
                                        }
                                    }); A = A || m.childNodes.length
                            }), O && p && b.attr("title", L(b.textStr || "", ["&lt;", "&gt;"])), F && F.removeChild(m), v(x) && b.applyTextOutline && b.applyTextOutline(x)) : m.appendChild(u.createTextNode(L(e)))
                    }
                }; b.prototype.getContrast = function (b) { b = q.parse(b).rgba; b[0] *= 1; b[1] *= 1.2; b[2] *= .5; return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF" }; b.prototype.button = function (b,
                    d, a, e, k, c, h, u, g, w) {
                        var m = this.label(b, d, a, g, void 0, void 0, w, void 0, "button"), J = 0, P = this.styledMode; b = (k = k ? x(k) : k) && k.style || {}; k && k.style && delete k.style; m.attr(x({ padding: 8, r: 2 }, k)); if (!P) {
                            k = x({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, { style: b }, k); var z = k.style; delete k.style; c = x(k, { fill: "#e6e6e6" }, c); var p = c.style; delete c.style; h = x(k, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, h); var y = h.style; delete h.style; u =
                                x(k, { style: { color: "#cccccc" } }, u); var Q = u.style; delete u.style
                        } B(m.element, F ? "mouseover" : "mouseenter", function () { 3 !== J && m.setState(1) }); B(m.element, F ? "mouseout" : "mouseleave", function () { 3 !== J && m.setState(J) }); m.setState = function (b) { 1 !== b && (m.state = J = b); m.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]); P || m.attr([k, c, h, u][b || 0]).css([z, p, y, Q][b || 0]) }; P || m.attr(k).css(A({ cursor: "default" }, z)); return m.on("click",
                            function (b) { 3 !== J && e.call(m, b) })
                }; b.prototype.crispLine = function (b, d, a) { void 0 === a && (a = "round"); var m = b[0], e = b[1]; m[1] === e[1] && (m[1] = e[1] = Math[a](m[1]) - d % 2 / 2); m[2] === e[2] && (m[2] = e[2] = Math[a](m[2]) + d % 2 / 2); return b }; b.prototype.path = function (b) { var m = this.styledMode ? {} : { fill: "none" }; L(b) ? m.d = b : l(b) && A(m, b); return this.createElement("path").attr(m) }; b.prototype.circle = function (b, d, a) {
                    b = l(b) ? b : "undefined" === typeof b ? {} : { x: b, y: d, r: a }; d = this.createElement("circle"); d.xSetter = d.ySetter = function (b, m, d) {
                        d.setAttribute("c" +
                            m, b)
                    }; return d.attr(b)
                }; b.prototype.arc = function (b, d, a, e, k, c) { l(b) ? (e = b, d = e.y, a = e.r, b = e.x) : e = { innerR: e, start: k, end: c }; b = this.symbol("arc", b, d, a, a, e); b.r = a; return b }; b.prototype.rect = function (b, d, a, e, k, c) {
                    k = l(b) ? b.r : k; var m = this.createElement("rect"); b = l(b) ? b : "undefined" === typeof b ? {} : { x: b, y: d, width: Math.max(a, 0), height: Math.max(e, 0) }; this.styledMode || ("undefined" !== typeof c && (b.strokeWidth = c, b = m.crisp(b)), b.fill = "none"); k && (b.r = k); m.rSetter = function (b, d, a) { m.r = b; H(a, { rx: b, ry: b }) }; m.rGetter = function () { return m.r };
                    return m.attr(b)
                }; b.prototype.setSize = function (b, d, a) { var m = this.alignedObjects, e = m.length; this.width = b; this.height = d; for (this.boxWrapper.animate({ width: b, height: d }, { step: function () { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }) }, duration: g(a, !0) ? void 0 : 0 }); e--;)m[e].align() }; b.prototype.g = function (b) { var m = this.createElement("g"); return b ? m.attr({ "class": "highcharts-" + b }) : m }; b.prototype.image = function (b, d, a, e, k, c) {
                    var m = { preserveAspectRatio: "none" }, h = function (b, m) {
                        b.setAttributeNS ?
                        b.setAttributeNS("http://www.w3.org/1999/xlink", "href", m) : b.setAttribute("hc-svg-href", m)
                    }, J = function (m) { h(u.element, b); c.call(u, m) }; 1 < arguments.length && A(m, { x: d, y: a, width: e, height: k }); var u = this.createElement("image").attr(m); c ? (h(u.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), m = new K.Image, B(m, "load", J), m.src = b, m.complete && J({})) : h(u.element, b); return u
                }; b.prototype.symbol = function (b, d, a, k, c, h) {
                    var m = this, J = /^url\((.*?)\)$/, w = J.test(b), P = !w && (this.symbols[b] ?
                        b : "circle"), z = P && this.symbols[P], p; if (z) { "number" === typeof d && (p = z.call(this.symbols, Math.round(d || 0), Math.round(a || 0), k || 0, c || 0, h)); var y = this.path(p); m.styledMode || y.attr("fill", "none"); A(y, { symbolName: P, x: d, y: a, width: k, height: c }); h && A(y, h) } else if (w) {
                            var F = b.match(J)[1]; y = this.image(F); y.imgwidth = g(O[F] && O[F].width, h && h.width); y.imgheight = g(O[F] && O[F].height, h && h.height); var t = function () { y.attr({ width: y.width, height: y.height }) };["width", "height"].forEach(function (b) {
                            y[b + "Setter"] = function (b, m) {
                                var d =
                                    {}, a = this["img" + m], e = "width" === m ? "translateX" : "translateY"; this[m] = b; I(a) && (h && "within" === h.backgroundSize && this.width && this.height && (a = Math.round(a * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(m, a), this.alignByTranslate || (d[e] = ((this[m] || 0) - a) / 2, this.attr(d)))
                            }
                            }); I(d) && y.attr({ x: d, y: a }); y.isImg = !0; I(y.imgwidth) && I(y.imgheight) ? t() : (y.attr({ width: 0, height: 0 }), D("img", {
                                onload: function () {
                                    var b = e[m.chartIndex]; 0 === this.width && (n(this, {
                                        position: "absolute",
                                        top: "-999em"
                                    }), u.body.appendChild(this)); O[F] = { width: this.width, height: this.height }; y.imgwidth = this.width; y.imgheight = this.height; y.element && t(); this.parentNode && this.parentNode.removeChild(this); m.imgCount--; if (!m.imgCount && b && !b.hasLoaded) b.onload()
                                }, src: F
                            }), this.imgCount++)
                        } return y
                }; b.prototype.clipRect = function (b, d, a, e) { var m = h() + "-", k = this.createElement("clipPath").attr({ id: m }).add(this.defs); b = this.rect(b, d, a, e, 0).add(k); b.id = m; b.clipPath = k; b.count = 0; return b }; b.prototype.text = function (b, d,
                    a, e) { var m = {}; if (e && (this.allowHTML || !this.forExport)) return this.html(b, d, a); m.x = Math.round(d || 0); a && (m.y = Math.round(a)); I(b) && (m.text = b); b = this.createElement("text").attr(m); e || (b.xSetter = function (b, m, d) { var a = d.getElementsByTagName("tspan"), e = d.getAttribute(m), k; for (k = 0; k < a.length; k++) { var c = a[k]; c.getAttribute(m) === e && c.setAttribute(m, b) } d.setAttribute(m, b) }); return b }; b.prototype.fontMetrics = function (b, d) {
                        b = !this.styledMode && /px/.test(b) || !K.getComputedStyle ? b || d && d.style && d.style.fontSize ||
                            this.style && this.style.fontSize : d && r.prototype.getStyle.call(d, "font-size"); b = /px/.test(b) ? c(b) : 12; d = 24 > b ? b + 3 : Math.round(1.2 * b); return { h: d, b: Math.round(.8 * d), f: b }
                    }; b.prototype.rotCorr = function (b, d, e) { var m = b; d && e && (m = Math.max(m * Math.cos(d * a), 4)); return { x: -b / 3 * Math.sin(d * a), y: m } }; b.prototype.pathToSegments = function (b) {
                        for (var m = [], d = [], a = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 }, e = 0; e < b.length; e++)v(d[0]) && E(b[e]) && d.length === a[d[0].toUpperCase()] && b.splice(e, 0, d[0].replace("M", "L").replace("m", "l")),
                            "string" === typeof b[e] && (d.length && m.push(d.slice(0)), d.length = 0), d.push(b[e]); m.push(d.slice(0)); return m
                    }; b.prototype.label = function (b, d, a, e, k, c, h, u, g) { return new C(this, b, d, a, e, k, c, h, u, g) }; return b
            }(); d.prototype.Element = r; d.prototype.SVG_NS = z; d.prototype.draw = G; d.prototype.escapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }; d.prototype.symbols = {
                circle: function (b, m, d, a) { return this.arc(b + d / 2, m + a / 2, d / 2, a / 2, { start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1 }) }, square: function (b, m, d, a) {
                    return [["M",
                        b, m], ["L", b + d, m], ["L", b + d, m + a], ["L", b, m + a], ["Z"]]
                }, triangle: function (b, m, d, a) { return [["M", b + d / 2, m], ["L", b + d, m + a], ["L", b, m + a], ["Z"]] }, "triangle-down": function (b, m, d, a) { return [["M", b, m], ["L", b + d, m], ["L", b + d / 2, m + a], ["Z"]] }, diamond: function (b, m, d, a) { return [["M", b + d / 2, m], ["L", b + d, m + a / 2], ["L", b + d / 2, m + a], ["L", b, m + a / 2], ["Z"]] }, arc: function (b, m, d, a, e) {
                    var k = []; if (e) {
                        var c = e.start || 0, h = e.end || 0, J = e.r || d; d = e.r || a || d; var u = .001 > Math.abs(h - c - 2 * Math.PI); h -= .001; a = e.innerR; u = g(e.open, u); var w = Math.cos(c), z = Math.sin(c),
                            p = Math.cos(h), P = Math.sin(h); c = g(e.longArc, .001 > h - c - Math.PI ? 0 : 1); k.push(["M", b + J * w, m + d * z], ["A", J, d, 0, c, g(e.clockwise, 1), b + J * p, m + d * P]); I(a) && k.push(u ? ["M", b + a * p, m + a * P] : ["L", b + a * p, m + a * P], ["A", a, a, 0, c, I(e.clockwise) ? 1 - e.clockwise : 0, b + a * w, m + a * z]); u || k.push(["Z"])
                    } return k
                }, callout: function (b, m, d, a, e) {
                    var k = Math.min(e && e.r || 0, d, a), c = k + 6, h = e && e.anchorX || 0; e = e && e.anchorY || 0; var J = [["M", b + k, m], ["L", b + d - k, m], ["C", b + d, m, b + d, m, b + d, m + k], ["L", b + d, m + a - k], ["C", b + d, m + a, b + d, m + a, b + d - k, m + a], ["L", b + k, m + a], ["C", b, m + a,
                        b, m + a, b, m + a - k], ["L", b, m + k], ["C", b, m, b, m, b + k, m]]; h && h > d ? e > m + c && e < m + a - c ? J.splice(3, 1, ["L", b + d, e - 6], ["L", b + d + 6, e], ["L", b + d, e + 6], ["L", b + d, m + a - k]) : J.splice(3, 1, ["L", b + d, a / 2], ["L", h, e], ["L", b + d, a / 2], ["L", b + d, m + a - k]) : h && 0 > h ? e > m + c && e < m + a - c ? J.splice(7, 1, ["L", b, e + 6], ["L", b - 6, e], ["L", b, e - 6], ["L", b, m + k]) : J.splice(7, 1, ["L", b, a / 2], ["L", h, e], ["L", b, a / 2], ["L", b, m + k]) : e && e > a && h > b + c && h < b + d - c ? J.splice(5, 1, ["L", h + 6, m + a], ["L", h, m + a + 6], ["L", h - 6, m + a], ["L", b + k, m + a]) : e && 0 > e && h > b + c && h < b + d - c && J.splice(1, 1, ["L", h - 6, m], ["L",
                            h, m - 6], ["L", h + 6, m], ["L", d - k, m]); return J
                }
            }; f.SVGRenderer = d; f.Renderer = f.SVGRenderer; return f.Renderer
    }); N(r, "Core/Renderer/HTML/HTML.js", [r["Core/Globals.js"], r["Core/Renderer/SVG/SVGElement.js"], r["Core/Renderer/SVG/SVGRenderer.js"], r["Core/Utilities.js"]], function (q, f, r, C) {
        var G = C.attr, B = C.createElement, H = C.css, D = C.defined, n = C.extend, I = C.pick, M = C.pInt, A = q.isFirefox, L = q.isMS, E = q.isWebKit, l = q.win; n(f.prototype, {
            htmlCss: function (v) {
                var l = "SPAN" === this.element.tagName && v && "width" in v, t = I(l && v.width,
                    void 0); if (l) { delete v.width; this.textWidth = t; var g = !0 } v && "ellipsis" === v.textOverflow && (v.whiteSpace = "nowrap", v.overflow = "hidden"); this.styles = n(this.styles, v); H(this.element, v); g && this.htmlUpdateTransform(); return this
            }, htmlGetBBox: function () { var v = this.element; return { x: v.offsetLeft, y: v.offsetTop, width: v.offsetWidth, height: v.offsetHeight } }, htmlUpdateTransform: function () {
                if (this.added) {
                    var v = this.renderer, l = this.element, t = this.translateX || 0, g = this.translateY || 0, c = this.x || 0, p = this.y || 0, h = this.textAlign ||
                        "left", e = { left: 0, center: .5, right: 1 }[h], a = this.styles, u = a && a.whiteSpace; H(l, { marginLeft: t, marginTop: g }); !v.styledMode && this.shadows && this.shadows.forEach(function (a) { H(a, { marginLeft: t + 1, marginTop: g + 1 }) }); this.inverted && [].forEach.call(l.childNodes, function (a) { v.invertChild(a, l) }); if ("SPAN" === l.tagName) {
                            a = this.rotation; var w = this.textWidth && M(this.textWidth), F = [a, h, l.innerHTML, this.textWidth, this.textAlign].join(), y; (y = w !== this.oldTextWidth) && !(y = w > this.oldTextWidth) && ((y = this.textPxLength) || (H(l, {
                                width: "",
                                whiteSpace: u || "nowrap"
                            }), y = l.offsetWidth), y = y > w); y && (/[ \-]/.test(l.textContent || l.innerText) || "ellipsis" === l.style.textOverflow) ? (H(l, { width: w + "px", display: "block", whiteSpace: u || "normal" }), this.oldTextWidth = w, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1; F !== this.cTT && (u = v.fontMetrics(l.style.fontSize, l).b, !D(a) || a === (this.oldRotation || 0) && h === this.oldAlign || this.setSpanRotation(a, e, u), this.getSpanCorrection(!D(a) && this.textPxLength || l.offsetWidth, u, e, a, h)); H(l, {
                                left: c + (this.xCorr || 0) + "px",
                                top: p + (this.yCorr || 0) + "px"
                            }); this.cTT = F; this.oldRotation = a; this.oldAlign = h
                        }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (l, x, t) { var g = {}, c = this.renderer.getTransformKey(); g[c] = g.transform = "rotate(" + l + "deg)"; g[c + (A ? "Origin" : "-origin")] = g.transformOrigin = 100 * x + "% " + t + "px"; H(this.element, g) }, getSpanCorrection: function (l, x, t) { this.xCorr = -l * t; this.yCorr = -x }
        }); n(r.prototype, {
            getTransformKey: function () {
                return L && !/Edge/.test(l.navigator.userAgent) ? "-ms-transform" : E ? "-webkit-transform" : A ? "MozTransform" :
                    l.opera ? "-o-transform" : ""
            }, html: function (l, x, t) {
                var g = this.createElement("span"), c = g.element, p = g.renderer, h = p.isSVG, e = function (a, e) { ["opacity", "visibility"].forEach(function (c) { a[c + "Setter"] = function (h, u, k) { var g = a.div ? a.div.style : e; f.prototype[c + "Setter"].call(this, h, u, k); g && (g[u] = h) } }); a.addedSetters = !0 }; g.textSetter = function (a) { a !== c.innerHTML && (delete this.bBox, delete this.oldTextWidth); this.textStr = a; c.innerHTML = I(a, ""); g.doTransform = !0 }; h && e(g, g.element.style); g.xSetter = g.ySetter = g.alignSetter =
                    g.rotationSetter = function (a, e) { "align" === e ? g.alignValue = g.textAlign = a : g[e] = a; g.doTransform = !0 }; g.afterSetters = function () { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1) }; g.attr({ text: l, x: Math.round(x), y: Math.round(t) }).css({ position: "absolute" }); p.styledMode || g.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize }); c.style.whiteSpace = "nowrap"; g.css = g.htmlCss; h && (g.add = function (a) {
                        var h = p.box.parentNode, w = []; if (this.parentGroup = a) {
                            var F = a.div; if (!F) {
                                for (; a;)w.push(a),
                                    a = a.parentGroup; w.reverse().forEach(function (a) {
                                        function k(e, d) { a[d] = e; "translateX" === d ? u.left = e + "px" : u.top = e + "px"; a.doTransform = !0 } var c = G(a.element, "class"); F = a.div = a.div || B("div", c ? { className: c } : void 0, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, F || h); var u = F.style; n(a, {
                                            classSetter: function (a) { return function (d) { this.element.setAttribute("class", d); a.className = d } }(F), on: function () {
                                                w[0].div &&
                                                g.on.apply({ element: w[0].div }, arguments); return a
                                            }, translateXSetter: k, translateYSetter: k
                                        }); a.addedSetters || e(a)
                                    })
                            }
                        } else F = h; F.appendChild(c); g.added = !0; g.alignOnAdd && g.htmlUpdateTransform(); return g
                    }); return g
            }
        })
    }); N(r, "Core/Axis/Tick.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
        var r = f.clamp, C = f.correctFloat, G = f.defined, B = f.destroyObjectProperties, H = f.extend, D = f.fireEvent, n = f.isNumber, I = f.merge, M = f.objectEach, A = f.pick, L = q.deg2rad; f = function () {
            function f(l, v, x, t, g) {
            this.isNewLabel =
                this.isNew = !0; this.axis = l; this.pos = v; this.type = x || ""; this.parameters = g || {}; this.tickmarkOffset = this.parameters.tickmarkOffset; this.options = this.parameters.options; D(this, "init"); x || t || this.addLabel()
            } f.prototype.addLabel = function () {
                var l = this, v = l.axis, x = v.options, t = v.chart, g = v.categories, c = v.logarithmic, p = v.names, h = l.pos, e = A(l.options && l.options.labels, x.labels), a = v.tickPositions, u = h === a[0], w = h === a[a.length - 1]; p = this.parameters.category || (g ? A(g[h], p[h], h) : h); var F = l.label; g = (!e.step || 1 === e.step) &&
                    1 === v.tickInterval; a = a.info; var y, k; if (v.dateTime && a) { var z = t.time.resolveDTLFormat(x.dateTimeLabelFormats[!x.grid && a.higherRanks[h] || a.unitName]); var O = z.main } l.isFirst = u; l.isLast = w; l.formatCtx = { axis: v, chart: t, isFirst: u, isLast: w, dateTimeLabelFormat: O, tickPositionInfo: a, value: c ? C(c.lin2log(p)) : p, pos: h }; x = v.labelFormatter.call(l.formatCtx, this.formatCtx); if (k = z && z.list) l.shortenLabel = function () {
                        for (y = 0; y < k.length; y++)if (F.attr({ text: v.labelFormatter.call(H(l.formatCtx, { dateTimeLabelFormat: k[y] })) }),
                            F.getBBox().width < v.getSlotWidth(l) - 2 * A(e.padding, 5)) return; F.attr({ text: "" })
                    }; g && v._addedPlotLB && l.moveLabel(x, e); G(F) || l.movedLabel ? F && F.textStr !== x && !g && (!F.textWidth || e.style && e.style.width || F.styles.width || F.css({ width: null }), F.attr({ text: x }), F.textPxLength = F.getBBox().width) : (l.label = F = l.createLabel({ x: 0, y: 0 }, x, e), l.rotation = 0)
            }; f.prototype.createLabel = function (l, v, x) {
                var t = this.axis, g = t.chart; if (l = G(v) && x.enabled ? g.renderer.text(v, l.x, l.y, x.useHTML).add(t.labelGroup) : null) g.styledMode || l.css(I(x.style)),
                    l.textPxLength = l.getBBox().width; return l
            }; f.prototype.destroy = function () { B(this, this.axis) }; f.prototype.getPosition = function (l, v, x, t) { var g = this.axis, c = g.chart, p = t && c.oldChartHeight || c.chartHeight; l = { x: l ? C(g.translate(v + x, null, null, t) + g.transB) : g.left + g.offset + (g.opposite ? (t && c.oldChartWidth || c.chartWidth) - g.right - g.left : 0), y: l ? p - g.bottom + g.offset - (g.opposite ? g.height : 0) : C(p - g.translate(v + x, null, null, t) - g.transB) }; l.y = r(l.y, -1E5, 1E5); D(this, "afterGetPosition", { pos: l }); return l }; f.prototype.getLabelPosition =
                function (l, v, x, t, g, c, p, h) {
                    var e = this.axis, a = e.transA, u = e.isLinked && e.linkedParent ? e.linkedParent.reversed : e.reversed, w = e.staggerLines, F = e.tickRotCorr || { x: 0, y: 0 }, y = g.y, k = t || e.reserveSpaceDefault ? 0 : -e.labelOffset * ("center" === e.labelAlign ? .5 : 1), z = {}; G(y) || (y = 0 === e.side ? x.rotation ? -8 : -x.getBBox().height : 2 === e.side ? F.y + 8 : Math.cos(x.rotation * L) * (F.y - x.getBBox(!1, 0).height / 2)); l = l + g.x + k + F.x - (c && t ? c * a * (u ? -1 : 1) : 0); v = v + y - (c && !t ? c * a * (u ? 1 : -1) : 0); w && (x = p / (h || 1) % w, e.opposite && (x = w - x - 1), v += e.labelOffset / w * x); z.x =
                        l; z.y = Math.round(v); D(this, "afterGetLabelPosition", { pos: z, tickmarkOffset: c, index: p }); return z
                }; f.prototype.getLabelSize = function () { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0 }; f.prototype.getMarkPath = function (l, v, x, t, g, c) { return c.crispLine([["M", l, v], ["L", l + (g ? 0 : -x), v + (g ? x : 0)]], t) }; f.prototype.handleOverflow = function (l) {
                    var v = this.axis, x = v.options.labels, t = l.x, g = v.chart.chartWidth, c = v.chart.spacing, p = A(v.labelLeft, Math.min(v.pos, c[3])); c = A(v.labelRight, Math.max(v.isRadial ?
                        0 : v.pos + v.len, g - c[1])); var h = this.label, e = this.rotation, a = { left: 0, center: .5, right: 1 }[v.labelAlign || h.attr("align")], u = h.getBBox().width, w = v.getSlotWidth(this), F = w, y = 1, k, z = {}; if (e || "justify" !== A(x.overflow, "justify")) 0 > e && t - a * u < p ? k = Math.round(t / Math.cos(e * L) - p) : 0 < e && t + a * u > c && (k = Math.round((g - t) / Math.cos(e * L))); else if (g = t + (1 - a) * u, t - a * u < p ? F = l.x + F * (1 - a) - p : g > c && (F = c - l.x + F * a, y = -1), F = Math.min(w, F), F < w && "center" === v.labelAlign && (l.x += y * (w - F - a * (w - Math.min(u, F)))), u > F || v.autoRotation && (h.styles || {}).width) k =
                            F; k && (this.shortenLabel ? this.shortenLabel() : (z.width = Math.floor(k) + "px", (x.style || {}).textOverflow || (z.textOverflow = "ellipsis"), h.css(z)))
                }; f.prototype.moveLabel = function (l, v) {
                    var x = this, t = x.label, g = !1, c = x.axis, p = c.reversed; t && t.textStr === l ? (x.movedLabel = t, g = !0, delete x.label) : M(c.ticks, function (e) { g || e.isNew || e === x || !e.label || e.label.textStr !== l || (x.movedLabel = e.label, g = !0, e.labelPos = x.movedLabel.xy, delete e.label) }); if (!g && (x.labelPos || t)) {
                        var h = x.labelPos || t.xy; t = c.horiz ? p ? 0 : c.width + c.left : h.x;
                        c = c.horiz ? h.y : p ? c.width + c.left : 0; x.movedLabel = x.createLabel({ x: t, y: c }, l, v); x.movedLabel && x.movedLabel.attr({ opacity: 0 })
                    }
                }; f.prototype.render = function (l, v, x) { var t = this.axis, g = t.horiz, c = this.pos, p = A(this.tickmarkOffset, t.tickmarkOffset); c = this.getPosition(g, c, p, v); p = c.x; var h = c.y; t = g && p === t.pos + t.len || !g && h === t.pos ? -1 : 1; x = A(x, 1); this.isActive = !0; this.renderGridLine(v, x, t); this.renderMark(c, x, t); this.renderLabel(c, v, x, l); this.isNew = !1; D(this, "afterRender") }; f.prototype.renderGridLine = function (l, v, x) {
                    var t =
                        this.axis, g = t.options, c = this.gridLine, p = {}, h = this.pos, e = this.type, a = A(this.tickmarkOffset, t.tickmarkOffset), u = t.chart.renderer, w = e ? e + "Grid" : "grid", F = g[w + "LineWidth"], y = g[w + "LineColor"]; g = g[w + "LineDashStyle"]; c || (t.chart.styledMode || (p.stroke = y, p["stroke-width"] = F, g && (p.dashstyle = g)), e || (p.zIndex = 1), l && (v = 0), this.gridLine = c = u.path().attr(p).addClass("highcharts-" + (e ? e + "-" : "") + "grid-line").add(t.gridGroup)); if (c && (x = t.getPlotLinePath({ value: h + a, lineWidth: c.strokeWidth() * x, force: "pass", old: l }))) c[l ||
                            this.isNew ? "attr" : "animate"]({ d: x, opacity: v })
                }; f.prototype.renderMark = function (l, v, x) {
                    var t = this.axis, g = t.options, c = t.chart.renderer, p = this.type, h = p ? p + "Tick" : "tick", e = t.tickSize(h), a = this.mark, u = !a, w = l.x; l = l.y; var F = A(g[h + "Width"], !p && t.isXAxis ? 1 : 0); g = g[h + "Color"]; e && (t.opposite && (e[0] = -e[0]), u && (this.mark = a = c.path().addClass("highcharts-" + (p ? p + "-" : "") + "tick").add(t.axisGroup), t.chart.styledMode || a.attr({ stroke: g, "stroke-width": F })), a[u ? "attr" : "animate"]({
                        d: this.getMarkPath(w, l, e[0], a.strokeWidth() *
                            x, t.horiz, c), opacity: v
                    }))
                }; f.prototype.renderLabel = function (l, v, x, t) {
                    var g = this.axis, c = g.horiz, p = g.options, h = this.label, e = p.labels, a = e.step; g = A(this.tickmarkOffset, g.tickmarkOffset); var u = !0, w = l.x; l = l.y; h && n(w) && (h.xy = l = this.getLabelPosition(w, l, h, c, e, g, t, a), this.isFirst && !this.isLast && !A(p.showFirstLabel, 1) || this.isLast && !this.isFirst && !A(p.showLastLabel, 1) ? u = !1 : !c || e.step || e.rotation || v || 0 === x || this.handleOverflow(l), a && t % a && (u = !1), u && n(l.y) ? (l.opacity = x, h[this.isNewLabel ? "attr" : "animate"](l), this.isNewLabel =
                        !1) : (h.attr("y", -9999), this.isNewLabel = !0))
                }; f.prototype.replaceMovedLabel = function () { var l = this.label, v = this.axis, x = v.reversed; if (l && !this.isNew) { var t = v.horiz ? x ? v.left : v.width + v.left : l.xy.x; x = v.horiz ? l.xy.y : x ? v.width + v.top : v.top; l.animate({ x: t, y: x, opacity: 0 }, void 0, l.destroy); delete this.label } v.isDirty = !0; this.label = this.movedLabel; delete this.movedLabel }; return f
        }(); q.Tick = f; return q.Tick
    }); N(r, "Core/Time.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
        var r = f.defined, C = f.error,
        G = f.extend, B = f.isObject, H = f.merge, D = f.objectEach, n = f.pad, I = f.pick, M = f.splat, A = f.timeUnits, L = q.win; f = function () {
            function f(l) { this.options = {}; this.variableTimezone = this.useUTC = !1; this.Date = L.Date; this.getTimezoneOffset = this.timezoneOffsetFunction(); this.update(l) } f.prototype.get = function (l, v) { if (this.variableTimezone || this.timezoneOffset) { var x = v.getTime(), t = x - this.getTimezoneOffset(v); v.setTime(t); l = v["getUTC" + l](); v.setTime(x); return l } return this.useUTC ? v["getUTC" + l]() : v["get" + l]() }; f.prototype.set =
                function (l, v, x) { if (this.variableTimezone || this.timezoneOffset) { if ("Milliseconds" === l || "Seconds" === l || "Minutes" === l) return v["setUTC" + l](x); var t = this.getTimezoneOffset(v); t = v.getTime() - t; v.setTime(t); v["setUTC" + l](x); l = this.getTimezoneOffset(v); t = v.getTime() + l; return v.setTime(t) } return this.useUTC ? v["setUTC" + l](x) : v["set" + l](x) }; f.prototype.update = function (l) {
                    var v = I(l && l.useUTC, !0); this.options = l = H(!0, this.options || {}, l); this.Date = l.Date || L.Date || Date; this.timezoneOffset = (this.useUTC = v) && l.timezoneOffset;
                    this.getTimezoneOffset = this.timezoneOffsetFunction(); this.variableTimezone = !(v && !l.getTimezoneOffset && !l.timezone)
                }; f.prototype.makeTime = function (l, v, x, t, g, c) { if (this.useUTC) { var p = this.Date.UTC.apply(0, arguments); var h = this.getTimezoneOffset(p); p += h; var e = this.getTimezoneOffset(p); h !== e ? p += e - h : h - 36E5 !== this.getTimezoneOffset(p - 36E5) || q.isSafari || (p -= 36E5) } else p = (new this.Date(l, v, I(x, 1), I(t, 0), I(g, 0), I(c, 0))).getTime(); return p }; f.prototype.timezoneOffsetFunction = function () {
                    var l = this, v = this.options,
                    x = v.moment || L.moment; if (!this.useUTC) return function (l) { return 6E4 * (new Date(l.toString())).getTimezoneOffset() }; if (v.timezone) { if (x) return function (l) { return 6E4 * -x.tz(l, v.timezone).utcOffset() }; C(25) } return this.useUTC && v.getTimezoneOffset ? function (l) { return 6E4 * v.getTimezoneOffset(l.valueOf()) } : function () { return 6E4 * (l.timezoneOffset || 0) }
                }; f.prototype.dateFormat = function (l, v, x) {
                    var t; if (!r(v) || isNaN(v)) return (null === (t = q.defaultOptions.lang) || void 0 === t ? void 0 : t.invalidDate) || ""; l = I(l, "%Y-%m-%d %H:%M:%S");
                    var g = this; t = new this.Date(v); var c = this.get("Hours", t), p = this.get("Day", t), h = this.get("Date", t), e = this.get("Month", t), a = this.get("FullYear", t), u = q.defaultOptions.lang, w = null === u || void 0 === u ? void 0 : u.weekdays, F = null === u || void 0 === u ? void 0 : u.shortWeekdays; t = G({
                        a: F ? F[p] : w[p].substr(0, 3), A: w[p], d: n(h), e: n(h, 2, " "), w: p, b: u.shortMonths[e], B: u.months[e], m: n(e + 1), o: e + 1, y: a.toString().substr(2, 2), Y: a, H: n(c), k: c, I: n(c % 12 || 12), l: c % 12 || 12, M: n(this.get("Minutes", t)), p: 12 > c ? "AM" : "PM", P: 12 > c ? "am" : "pm", S: n(t.getSeconds()),
                        L: n(Math.floor(v % 1E3), 3)
                    }, q.dateFormats); D(t, function (a, e) { for (; -1 !== l.indexOf("%" + e);)l = l.replace("%" + e, "function" === typeof a ? a.call(g, v) : a) }); return x ? l.substr(0, 1).toUpperCase() + l.substr(1) : l
                }; f.prototype.resolveDTLFormat = function (l) { return B(l, !0) ? l : (l = M(l), { main: l[0], from: l[1], to: l[2] }) }; f.prototype.getTimeTicks = function (l, v, x, t) {
                    var g = this, c = [], p = {}; var h = new g.Date(v); var e = l.unitRange, a = l.count || 1, u; t = I(t, 1); if (r(v)) {
                        g.set("Milliseconds", h, e >= A.second ? 0 : a * Math.floor(g.get("Milliseconds", h) /
                            a)); e >= A.second && g.set("Seconds", h, e >= A.minute ? 0 : a * Math.floor(g.get("Seconds", h) / a)); e >= A.minute && g.set("Minutes", h, e >= A.hour ? 0 : a * Math.floor(g.get("Minutes", h) / a)); e >= A.hour && g.set("Hours", h, e >= A.day ? 0 : a * Math.floor(g.get("Hours", h) / a)); e >= A.day && g.set("Date", h, e >= A.month ? 1 : Math.max(1, a * Math.floor(g.get("Date", h) / a))); if (e >= A.month) { g.set("Month", h, e >= A.year ? 0 : a * Math.floor(g.get("Month", h) / a)); var w = g.get("FullYear", h) } e >= A.year && g.set("FullYear", h, w - w % a); e === A.week && (w = g.get("Day", h), g.set("Date",
                                h, g.get("Date", h) - w + t + (w < t ? -7 : 0))); w = g.get("FullYear", h); t = g.get("Month", h); var F = g.get("Date", h), y = g.get("Hours", h); v = h.getTime(); g.variableTimezone && (u = x - v > 4 * A.month || g.getTimezoneOffset(v) !== g.getTimezoneOffset(x)); v = h.getTime(); for (h = 1; v < x;)c.push(v), v = e === A.year ? g.makeTime(w + h * a, 0) : e === A.month ? g.makeTime(w, t + h * a) : !u || e !== A.day && e !== A.week ? u && e === A.hour && 1 < a ? g.makeTime(w, t, F, y + h * a) : v + e * a : g.makeTime(w, t, F + h * a * (e === A.day ? 1 : 7)), h++; c.push(v); e <= A.hour && 1E4 > c.length && c.forEach(function (a) {
                                0 === a % 18E5 &&
                                    "000000000" === g.dateFormat("%H%M%S%L", a) && (p[a] = "day")
                                })
                    } c.info = G(l, { higherRanks: p, totalRange: e * a }); return c
                }; return f
        }(); q.Time = f; return q.Time
    }); N(r, "Core/Options.js", [r["Core/Globals.js"], r["Core/Time.js"], r["Core/Color.js"], r["Core/Utilities.js"]], function (q, f, r, C) {
        r = r.parse; C = C.merge; q.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: {
                loading: "Loading...", months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " "
            }, global: {}, time: { Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: !0 }, chart: {
                styledMode: !1, borderRadius: 0, colorCount: 10, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: {
                    theme: { zIndex: 6 },
                    position: { align: "right", x: -10, y: 10 }
                }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc"
            }, title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, caption: { margin: 15, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: {
                enabled: !0, align: "center", alignColumns: !0, layout: "horizontal", labelFormatter: function () { return this.name }, borderColor: "#999999",
                borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold" } }
            }, loading: {
                labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: {
                    position: "absolute",
                    backgroundColor: "#ffffff", opacity: .5, textAlign: "center"
                }
            }, tooltip: {
                enabled: !0, animation: q.svg, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", padding: 8, snap: q.isTouchDevice ? 25 : 10, headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: r("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, shadow: !0, style: { color: "#333333", cursor: "default", fontSize: "12px", whiteSpace: "nowrap" }
            }, credits: { enabled: !0, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" }
        }; ""; q.time = new f(C(q.defaultOptions.global, q.defaultOptions.time)); q.dateFormat = function (f, r, H) { return q.time.dateFormat(f, r, H) }; return {
            dateFormat: q.dateFormat,
            defaultOptions: q.defaultOptions, time: q.time
        }
    }); N(r, "Core/Axis/Axis.js", [r["Core/Color.js"], r["Core/Globals.js"], r["Core/Axis/Tick.js"], r["Core/Utilities.js"], r["Core/Options.js"]], function (q, f, r, C, G) {
        var B = C.addEvent, H = C.animObject, D = C.arrayMax, n = C.arrayMin, I = C.clamp, M = C.correctFloat, A = C.defined, L = C.destroyObjectProperties, E = C.error, l = C.extend, v = C.fireEvent, x = C.format, t = C.getMagnitude, g = C.isArray, c = C.isFunction, p = C.isNumber, h = C.isString, e = C.merge, a = C.normalizeTickInterval, u = C.objectEach, w = C.pick,
        F = C.relativeLength, y = C.removeEvent, k = C.splat, z = C.syncTimeout, O = G.defaultOptions, K = f.deg2rad; C = function () {
            function d(b, d) {
            this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks =
                this.overlap = this.options = this.oldMin = this.oldMax = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0; this.init(b, d)
            } d.prototype.init = function (b, d) {
                var m = d.isX, a = this; a.chart = b; a.horiz = b.inverted && !a.isZAxis ? !m : m; a.isXAxis =
                    m; a.coll = a.coll || (m ? "xAxis" : "yAxis"); v(this, "init", { userOptions: d }); a.opposite = d.opposite; a.side = d.side || (a.horiz ? a.opposite ? 0 : 2 : a.opposite ? 1 : 3); a.setOptions(d); var e = this.options, h = e.type; a.labelFormatter = e.labels.formatter || a.defaultLabelFormatter; a.userOptions = d; a.minPixelPadding = 0; a.reversed = e.reversed; a.visible = !1 !== e.visible; a.zoomEnabled = !1 !== e.zoomEnabled; a.hasNames = "category" === h || !0 === e.categories; a.categories = e.categories || a.hasNames; a.names || (a.names = [], a.names.keys = {}); a.plotLinesAndBandsGroups =
                        {}; a.positiveValuesOnly = !!a.logarithmic; a.isLinked = A(e.linkedTo); a.ticks = {}; a.labelEdge = []; a.minorTicks = {}; a.plotLinesAndBands = []; a.alternateBands = {}; a.len = 0; a.minRange = a.userMinRange = e.minRange || e.maxZoom; a.range = e.range; a.offset = e.offset || 0; a.max = null; a.min = null; a.crosshair = w(e.crosshair, k(b.options.tooltip.crosshairs)[m ? 0 : 1], !1); d = a.options.events; -1 === b.axes.indexOf(a) && (m ? b.axes.splice(b.xAxis.length, 0, a) : b.axes.push(a), b[a.coll].push(a)); a.series = a.series || []; b.inverted && !a.isZAxis && m && "undefined" ===
                            typeof a.reversed && (a.reversed = !0); a.labelRotation = a.options.labels.rotation; u(d, function (b, d) { c(b) && B(a, d, b) }); v(this, "afterInit")
            }; d.prototype.setOptions = function (b) { this.options = e(d.defaultOptions, "yAxis" === this.coll && d.defaultYAxisOptions, [d.defaultTopAxisOptions, d.defaultRightAxisOptions, d.defaultBottomAxisOptions, d.defaultLeftAxisOptions][this.side], e(O[this.coll], b)); v(this, "afterSetOptions", { userOptions: b }) }; d.prototype.defaultLabelFormatter = function () {
                var b = this.axis, d = p(this.value) ? this.value :
                    NaN, a = b.chart.time, e = b.categories, k = this.dateTimeLabelFormat, c = O.lang, h = c.numericSymbols; c = c.numericSymbolMagnitude || 1E3; var u = h && h.length, g = b.options.labels.format; b = b.logarithmic ? Math.abs(d) : b.tickInterval; var w = this.chart, z = w.numberFormatter; if (g) var y = x(g, this, w); else if (e) y = "" + this.value; else if (k) y = a.dateFormat(k, d); else if (u && 1E3 <= b) for (; u-- && "undefined" === typeof y;)a = Math.pow(c, u + 1), b >= a && 0 === 10 * d % a && null !== h[u] && 0 !== d && (y = z(d / a, -1) + h[u]); "undefined" === typeof y && (y = 1E4 <= Math.abs(d) ? z(d, -1) :
                        z(d, -1, void 0, "")); return y
            }; d.prototype.getSeriesExtremes = function () {
                var b = this, d = b.chart, a; v(this, "getSeriesExtremes", null, function () {
                b.hasVisibleSeries = !1; b.dataMin = b.dataMax = b.threshold = null; b.softThreshold = !b.isXAxis; b.stacking && b.stacking.buildStacks(); b.series.forEach(function (m) {
                    if (m.visible || !d.options.chart.ignoreHiddenSeries) {
                        var e = m.options, k = e.threshold; b.hasVisibleSeries = !0; b.positiveValuesOnly && 0 >= k && (k = null); if (b.isXAxis) {
                            if (e = m.xData, e.length) {
                                e = b.logarithmic ? e.filter(b.validatePositiveValue) :
                                    e; a = m.getXExtremes(e); var c = a.min; var h = a.max; p(c) || c instanceof Date || (e = e.filter(p), a = m.getXExtremes(e), c = a.min, h = a.max); e.length && (b.dataMin = Math.min(w(b.dataMin, c), c), b.dataMax = Math.max(w(b.dataMax, h), h))
                            }
                        } else if (m = m.applyExtremes(), p(m.dataMin) && (c = m.dataMin, b.dataMin = Math.min(w(b.dataMin, c), c)), p(m.dataMax) && (h = m.dataMax, b.dataMax = Math.max(w(b.dataMax, h), h)), A(k) && (b.threshold = k), !e.softThreshold || b.positiveValuesOnly) b.softThreshold = !1
                    }
                })
                }); v(this, "afterGetSeriesExtremes")
            }; d.prototype.translate =
                function (b, d, a, e, k, c) { var m = this.linkedParent || this, h = 1, u = 0, J = e ? m.oldTransA : m.transA; e = e ? m.oldMin : m.min; var g = m.minPixelPadding; k = (m.isOrdinal || m.brokenAxis && m.brokenAxis.hasBreaks || m.logarithmic && k) && m.lin2val; J || (J = m.transA); a && (h *= -1, u = m.len); m.reversed && (h *= -1, u -= h * (m.sector || m.len)); d ? (b = (b * h + u - g) / J + e, k && (b = m.lin2val(b))) : (k && (b = m.val2lin(b)), b = p(e) ? h * (b - e) * J + u + h * g + (p(c) ? J * c : 0) : void 0); return b }; d.prototype.toPixels = function (b, d) { return this.translate(b, !1, !this.horiz, null, !0) + (d ? 0 : this.pos) };
            d.prototype.toValue = function (b, d) { return this.translate(b - (d ? 0 : this.pos), !0, !this.horiz, null, !0) }; d.prototype.getPlotLinePath = function (b) {
                function d(b, d, m) { if ("pass" !== y && b < d || b > m) y ? b = I(b, d, m) : n = !0; return b } var a = this, e = a.chart, k = a.left, c = a.top, h = b.old, u = b.value, g = b.translatedValue, z = b.lineWidth, y = b.force, F, l, t, K, x = h && e.oldChartHeight || e.chartHeight, O = h && e.oldChartWidth || e.chartWidth, n, f = a.transB; b = { value: u, lineWidth: z, old: h, force: y, acrossPanes: b.acrossPanes, translatedValue: g }; v(this, "getPlotLinePath",
                    b, function (b) { g = w(g, a.translate(u, null, null, h)); g = I(g, -1E5, 1E5); F = t = Math.round(g + f); l = K = Math.round(x - g - f); p(g) ? a.horiz ? (l = c, K = x - a.bottom, F = t = d(F, k, k + a.width)) : (F = k, t = O - a.right, l = K = d(l, c, c + a.height)) : (n = !0, y = !1); b.path = n && !y ? null : e.renderer.crispLine([["M", F, l], ["L", t, K]], z || 1) }); return b.path
            }; d.prototype.getLinearTickPositions = function (b, d, a) {
                var m = M(Math.floor(d / b) * b); a = M(Math.ceil(a / b) * b); var e = [], k; M(m + b) === m && (k = 20); if (this.single) return [d]; for (d = m; d <= a;) {
                    e.push(d); d = M(d + b, k); if (d === c) break;
                    var c = d
                } return e
            }; d.prototype.getMinorTickInterval = function () { var b = this.options; return !0 === b.minorTicks ? w(b.minorTickInterval, "auto") : !1 === b.minorTicks ? null : b.minorTickInterval }; d.prototype.getMinorTickPositions = function () {
                var b = this.options, d = this.tickPositions, a = this.minorTickInterval, e = [], k = this.pointRangePadding || 0, c = this.min - k; k = this.max + k; var h = k - c; if (h && h / a < this.len / 3) {
                    var u = this.logarithmic; if (u) this.paddedTicks.forEach(function (b, d, m) {
                        d && e.push.apply(e, u.getLogTickPositions(a, m[d - 1], m[d],
                            !0))
                    }); else if (this.dateTime && "auto" === this.getMinorTickInterval()) e = e.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(a), c, k, b.startOfWeek)); else for (b = c + (d[0] - c) % a; b <= k && b !== e[0]; b += a)e.push(b)
                } 0 !== e.length && this.trimTicks(e); return e
            }; d.prototype.adjustForMinRange = function () {
                var b = this.options, d = this.min, a = this.max, e = this.logarithmic, k, c, h, u, g; this.isXAxis && "undefined" === typeof this.minRange && !e && (A(b.min) || A(b.max) ? this.minRange = null : (this.series.forEach(function (b) {
                    u = b.xData;
                    for (c = g = b.xIncrement ? 1 : u.length - 1; 0 < c; c--)if (h = u[c] - u[c - 1], "undefined" === typeof k || h < k) k = h
                }), this.minRange = Math.min(5 * k, this.dataMax - this.dataMin))); if (a - d < this.minRange) { var z = this.dataMax - this.dataMin >= this.minRange; var p = this.minRange; var y = (p - a + d) / 2; y = [d - y, w(b.min, d - y)]; z && (y[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin); d = D(y); a = [d + p, w(b.max, d + p)]; z && (a[2] = e ? e.log2lin(this.dataMax) : this.dataMax); a = n(a); a - d < p && (y[0] = a - p, y[1] = w(b.min, a - p), d = D(y)) } this.min = d; this.max =
                    a
            }; d.prototype.getClosest = function () { var b; this.categories ? b = 1 : this.series.forEach(function (d) { var m = d.closestPointRange, a = d.visible || !d.chart.options.chart.ignoreHiddenSeries; !d.noSharedTooltip && A(m) && a && (b = A(b) ? Math.min(b, m) : m) }); return b }; d.prototype.nameToX = function (b) {
                var d = g(this.categories), a = d ? this.categories : this.names, e = b.options.x; b.series.requireSorting = !1; A(e) || (e = !1 === this.options.uniqueNames ? b.series.autoIncrement() : d ? a.indexOf(b.name) : w(a.keys[b.name], -1)); if (-1 === e) { if (!d) var k = a.length } else k =
                    e; "undefined" !== typeof k && (this.names[k] = b.name, this.names.keys[b.name] = k); return k
            }; d.prototype.updateNames = function () {
                var b = this, d = this.names; 0 < d.length && (Object.keys(d.keys).forEach(function (b) { delete d.keys[b] }), d.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (d) {
                d.xIncrement = null; if (!d.points || d.isDirtyData) b.max = Math.max(b.max, d.xData.length - 1), d.processData(), d.generatePoints(); d.data.forEach(function (m, a) {
                    if (m && m.options && "undefined" !== typeof m.name) {
                        var e = b.nameToX(m);
                        "undefined" !== typeof e && e !== m.x && (m.x = e, d.xData[a] = e)
                    }
                })
                }))
            }; d.prototype.setAxisTranslation = function (b) {
                var d = this, a = d.max - d.min, e = d.axisPointRange || 0, k = 0, c = 0, u = d.linkedParent, g = !!d.categories, z = d.transA, p = d.isXAxis; if (p || g || e) {
                    var y = d.getClosest(); u ? (k = u.minPointOffset, c = u.pointRangePadding) : d.series.forEach(function (b) {
                        var m = g ? 1 : p ? w(b.options.pointRange, y, 0) : d.axisPointRange || 0, a = b.options.pointPlacement; e = Math.max(e, m); if (!d.single || g) b = b.is("xrange") ? !p : p, k = Math.max(k, b && h(a) ? 0 : m / 2), c = Math.max(c,
                            b && "on" === a ? 0 : m)
                    }); u = d.ordinal && d.ordinal.slope && y ? d.ordinal.slope / y : 1; d.minPointOffset = k *= u; d.pointRangePadding = c *= u; d.pointRange = Math.min(e, d.single && g ? 1 : a); p && (d.closestPointRange = y)
                } b && (d.oldTransA = z); d.translationSlope = d.transA = z = d.staticScale || d.len / (a + c || 1); d.transB = d.horiz ? d.left : d.bottom; d.minPixelPadding = z * k; v(this, "afterSetAxisTranslation")
            }; d.prototype.minFromRange = function () { return this.max - this.range }; d.prototype.setTickInterval = function (b) {
                var d = this, e = d.chart, k = d.logarithmic, c = d.options,
                h = d.isXAxis, u = d.isLinked, g = c.maxPadding, z = c.minPadding, y = c.tickInterval, F = c.tickPixelInterval, l = d.categories, K = p(d.threshold) ? d.threshold : null, x = d.softThreshold; d.dateTime || l || u || this.getTickAmount(); var O = w(d.userMin, c.min); var n = w(d.userMax, c.max); if (u) { d.linkedParent = e[d.coll][c.linkedTo]; var f = d.linkedParent.getExtremes(); d.min = w(f.min, f.dataMin); d.max = w(f.max, f.dataMax); c.type !== d.linkedParent.options.type && E(11, 1, e) } else {
                    if (x && A(K)) if (d.dataMin >= K) f = K, z = 0; else if (d.dataMax <= K) { var q = K; g = 0 } d.min =
                        w(O, f, d.dataMin); d.max = w(n, q, d.dataMax)
                } k && (d.positiveValuesOnly && !b && 0 >= Math.min(d.min, w(d.dataMin, d.min)) && E(10, 1, e), d.min = M(k.log2lin(d.min), 16), d.max = M(k.log2lin(d.max), 16)); d.range && A(d.max) && (d.userMin = d.min = O = Math.max(d.dataMin, d.minFromRange()), d.userMax = n = d.max, d.range = null); v(d, "foundExtremes"); d.beforePadding && d.beforePadding(); d.adjustForMinRange(); !(l || d.axisPointRange || d.stacking && d.stacking.usePercentage || u) && A(d.min) && A(d.max) && (e = d.max - d.min) && (!A(O) && z && (d.min -= e * z), !A(n) && g && (d.max +=
                    e * g)); p(d.userMin) || (p(c.softMin) && c.softMin < d.min && (d.min = O = c.softMin), p(c.floor) && (d.min = Math.max(d.min, c.floor))); p(d.userMax) || (p(c.softMax) && c.softMax > d.max && (d.max = n = c.softMax), p(c.ceiling) && (d.max = Math.min(d.max, c.ceiling))); x && A(d.dataMin) && (K = K || 0, !A(O) && d.min < K && d.dataMin >= K ? d.min = d.options.minRange ? Math.min(K, d.max - d.minRange) : K : !A(n) && d.max > K && d.dataMax <= K && (d.max = d.options.minRange ? Math.max(K, d.min + d.minRange) : K)); d.tickInterval = d.min === d.max || "undefined" === typeof d.min || "undefined" ===
                        typeof d.max ? 1 : u && !y && F === d.linkedParent.options.tickPixelInterval ? y = d.linkedParent.tickInterval : w(y, this.tickAmount ? (d.max - d.min) / Math.max(this.tickAmount - 1, 1) : void 0, l ? 1 : (d.max - d.min) * F / Math.max(d.len, F)); h && !b && d.series.forEach(function (b) { b.processData(d.min !== d.oldMin || d.max !== d.oldMax) }); d.setAxisTranslation(!0); v(this, "initialAxisTranslation"); d.pointRange && !y && (d.tickInterval = Math.max(d.pointRange, d.tickInterval)); b = w(c.minTickInterval, d.dateTime && !d.series.some(function (b) { return b.noSharedTooltip }) ?
                            d.closestPointRange : 0); !y && d.tickInterval < b && (d.tickInterval = b); d.dateTime || d.logarithmic || y || (d.tickInterval = a(d.tickInterval, void 0, t(d.tickInterval), w(c.allowDecimals, .5 > d.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount)); this.tickAmount || (d.tickInterval = d.unsquish()); this.setTickPositions()
            }; d.prototype.setTickPositions = function () {
                var b = this.options, d = b.tickPositions; var a = this.getMinorTickInterval(); var e = b.tickPositioner, k = this.hasVerticalPanning(), c = "colorAxis" === this.coll, h = (c ||
                    !k) && b.startOnTick; k = (c || !k) && b.endOnTick; this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0; this.minorTickInterval = "auto" === a && this.tickInterval ? this.tickInterval / 5 : a; this.single = this.min === this.max && A(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals); this.tickPositions = a = d && d.slice(); !a && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? a = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval,
                        b.units), this.min, this.max, b.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (a = [this.min, this.max], E(19, !1, this.chart)), a.length > this.len && (a = [a[0], a.pop()], a[0] === a[1] && (a.length = 1)), this.tickPositions = a, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = a = e); this.paddedTicks = a.slice(0); this.trimTicks(a,
                            h, k); this.isLinked || (this.single && 2 > a.length && !this.categories && !this.series.some(function (b) { return b.is("heatmap") && "between" === b.options.pointPlacement }) && (this.min -= .5, this.max += .5), d || e || this.adjustTickAmount()); v(this, "afterSetTickPositions")
            }; d.prototype.trimTicks = function (b, d, a) {
                var m = b[0], e = b[b.length - 1], k = !this.isOrdinal && this.minPointOffset || 0; v(this, "trimTicks"); if (!this.isLinked) {
                    if (d && -Infinity !== m) this.min = m; else for (; this.min - k > b[0];)b.shift(); if (a) this.max = e; else for (; this.max + k <
                        b[b.length - 1];)b.pop(); 0 === b.length && A(m) && !this.options.tickPositions && b.push((e + m) / 2)
                }
            }; d.prototype.alignToOthers = function () { var b = {}, d, a = this.options; !1 === this.chart.options.chart.alignTicks || !1 === a.alignTicks || !1 === a.startOnTick || !1 === a.endOnTick || this.logarithmic || this.chart[this.coll].forEach(function (a) { var m = a.options; m = [a.horiz ? m.left : m.top, m.width, m.height, m.pane].join(); a.series.length && (b[m] ? d = !0 : b[m] = 1) }); return d }; d.prototype.getTickAmount = function () {
                var b = this.options, d = b.tickAmount,
                a = b.tickPixelInterval; !A(b.tickInterval) && !d && this.len < a && !this.isRadial && !this.logarithmic && b.startOnTick && b.endOnTick && (d = 2); !d && this.alignToOthers() && (d = Math.ceil(this.len / a) + 1); 4 > d && (this.finalTickAmt = d, d = 5); this.tickAmount = d
            }; d.prototype.adjustTickAmount = function () {
                var b = this.options, d = this.tickInterval, a = this.tickPositions, e = this.tickAmount, k = this.finalTickAmt, c = a && a.length, h = w(this.threshold, this.softThreshold ? 0 : null), u; if (this.hasData()) {
                    if (c < e) {
                        for (u = this.min; a.length < e;)a.length % 2 || u ===
                            h ? a.push(M(a[a.length - 1] + d)) : a.unshift(M(a[0] - d)); this.transA *= (c - 1) / (e - 1); this.min = b.startOnTick ? a[0] : Math.min(this.min, a[0]); this.max = b.endOnTick ? a[a.length - 1] : Math.max(this.max, a[a.length - 1])
                    } else c > e && (this.tickInterval *= 2, this.setTickPositions()); if (A(k)) { for (d = b = a.length; d--;)(3 === k && 1 === d % 2 || 2 >= k && 0 < d && d < b - 1) && a.splice(d, 1); this.finalTickAmt = void 0 }
                }
            }; d.prototype.setScale = function () {
                var b, d = !1, a = !1; this.series.forEach(function (b) {
                    var m; d = d || b.isDirtyData || b.isDirty; a = a || (null === (m = b.xAxis) ||
                        void 0 === m ? void 0 : m.isDirty) || !1
                }); this.oldMin = this.min; this.oldMax = this.max; this.oldAxisLength = this.len; this.setAxisSize(); (b = this.len !== this.oldAxisLength) || d || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin ||
                    this.max !== this.oldMax)) : this.stacking && this.stacking.cleanStacks(); d && this.panningState && (this.panningState.isDirty = !0); v(this, "afterSetScale")
            }; d.prototype.setExtremes = function (b, d, a, e, k) { var m = this, c = m.chart; a = w(a, !0); m.series.forEach(function (b) { delete b.kdTree }); k = l(k, { min: b, max: d }); v(m, "setExtremes", k, function () { m.userMin = b; m.userMax = d; m.eventArgs = k; a && c.redraw(e) }) }; d.prototype.zoom = function (b, d) {
                var a = this, m = this.dataMin, e = this.dataMax, k = this.options, c = Math.min(m, w(k.min, m)), h = Math.max(e,
                    w(k.max, e)); b = { newMin: b, newMax: d }; v(this, "zoom", b, function (b) { var d = b.newMin, k = b.newMax; if (d !== a.min || k !== a.max) a.allowZoomOutside || (A(m) && (d < c && (d = c), d > h && (d = h)), A(e) && (k < c && (k = c), k > h && (k = h))), a.displayBtn = "undefined" !== typeof d || "undefined" !== typeof k, a.setExtremes(d, k, !1, void 0, { trigger: "zoom" }); b.zoomed = !0 }); return b.zoomed
            }; d.prototype.setAxisSize = function () {
                var b = this.chart, d = this.options, a = d.offsets || [0, 0, 0, 0], e = this.horiz, k = this.width = Math.round(F(w(d.width, b.plotWidth - a[3] + a[1]), b.plotWidth)),
                c = this.height = Math.round(F(w(d.height, b.plotHeight - a[0] + a[2]), b.plotHeight)), h = this.top = Math.round(F(w(d.top, b.plotTop + a[0]), b.plotHeight, b.plotTop)); d = this.left = Math.round(F(w(d.left, b.plotLeft + a[3]), b.plotWidth, b.plotLeft)); this.bottom = b.chartHeight - c - h; this.right = b.chartWidth - k - d; this.len = Math.max(e ? k : c, 0); this.pos = e ? d : h
            }; d.prototype.getExtremes = function () {
                var b = this.logarithmic; return {
                    min: b ? M(b.lin2log(this.min)) : this.min, max: b ? M(b.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax,
                    userMin: this.userMin, userMax: this.userMax
                }
            }; d.prototype.getThreshold = function (b) { var d = this.logarithmic, a = d ? d.lin2log(this.min) : this.min; d = d ? d.lin2log(this.max) : this.max; null === b || -Infinity === b ? b = a : Infinity === b ? b = d : a > b ? b = a : d < b && (b = d); return this.translate(b, 0, 1, 0, 1) }; d.prototype.autoLabelAlign = function (b) { var d = (w(b, 0) - 90 * this.side + 720) % 360; b = { align: "center" }; v(this, "autoLabelAlign", b, function (b) { 15 < d && 165 > d ? b.align = "right" : 195 < d && 345 > d && (b.align = "left") }); return b.align }; d.prototype.tickSize = function (b) {
                var d =
                    this.options, a = d["tick" === b ? "tickLength" : "minorTickLength"], e = w(d["tick" === b ? "tickWidth" : "minorTickWidth"], "tick" === b && this.isXAxis && !this.categories ? 1 : 0); if (e && a) { "inside" === d[b + "Position"] && (a = -a); var k = [a, e] } b = { tickSize: k }; v(this, "afterTickSize", b); return b.tickSize
            }; d.prototype.labelMetrics = function () { var b = this.tickPositions && this.tickPositions[0] || 0; return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[b] && this.ticks[b].label) }; d.prototype.unsquish =
                function () {
                    var b = this.options.labels, d = this.horiz, a = this.tickInterval, e = a, k = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / a), c, h = b.rotation, u = this.labelMetrics(), g, z = Number.MAX_VALUE, p, y = this.max - this.min, F = function (b) { var d = b / (k || 1); d = 1 < d ? Math.ceil(d) : 1; d * a > y && Infinity !== b && Infinity !== k && y && (d = Math.ceil(y / a)); return M(d * a) }; d ? (p = !b.staggerLines && !b.step && (A(h) ? [h] : k < w(b.autoRotationLimit, 80) && b.autoRotation)) && p.forEach(function (b) {
                        if (b === h || b && -90 <= b && 90 >= b) {
                            g = F(Math.abs(u.h / Math.sin(K * b)));
                            var d = g + Math.abs(b / 360); d < z && (z = d, c = b, e = g)
                        }
                    }) : b.step || (e = F(u.h)); this.autoRotation = p; this.labelRotation = w(c, h); return e
                }; d.prototype.getSlotWidth = function (b) {
                    var d, a = this.chart, e = this.horiz, k = this.options.labels, c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), h = a.margin[3]; if (b && p(b.slotWidth)) return b.slotWidth; if (e && k && 2 > (k.step || 0)) return k.rotation ? 0 : (this.staggerLines || 1) * this.len / c; if (!e) {
                        b = null === (d = null === k || void 0 === k ? void 0 : k.style) || void 0 === d ? void 0 : d.width; if (void 0 !== b) return parseInt(b,
                            10); if (h) return h - a.spacing[3]
                    } return .33 * a.chartWidth
                }; d.prototype.renderUnsquish = function () {
                    var b = this.chart, d = b.renderer, a = this.tickPositions, e = this.ticks, k = this.options.labels, c = k && k.style || {}, u = this.horiz, g = this.getSlotWidth(), w = Math.max(1, Math.round(g - 2 * (k.padding || 5))), z = {}, p = this.labelMetrics(), y = k.style && k.style.textOverflow, F = 0; h(k.rotation) || (z.rotation = k.rotation || 0); a.forEach(function (b) { b = e[b]; b.movedLabel && b.replaceMovedLabel(); b && b.label && b.label.textPxLength > F && (F = b.label.textPxLength) });
                    this.maxLabelLength = F; if (this.autoRotation) F > w && F > p.h ? z.rotation = this.labelRotation : this.labelRotation = 0; else if (g) { var l = w; if (!y) { var t = "clip"; for (w = a.length; !u && w--;) { var K = a[w]; if (K = e[K].label) K.styles && "ellipsis" === K.styles.textOverflow ? K.css({ textOverflow: "clip" }) : K.textPxLength > g && K.css({ width: g + "px" }), K.getBBox().height > this.len / a.length - (p.h - p.f) && (K.specificTextOverflow = "ellipsis") } } } z.rotation && (l = F > .5 * b.chartHeight ? .33 * b.chartHeight : F, y || (t = "ellipsis")); if (this.labelAlign = k.align || this.autoLabelAlign(this.labelRotation)) z.align =
                        this.labelAlign; a.forEach(function (b) { var d = (b = e[b]) && b.label, a = c.width, m = {}; d && (d.attr(z), b.shortenLabel ? b.shortenLabel() : l && !a && "nowrap" !== c.whiteSpace && (l < d.textPxLength || "SPAN" === d.element.tagName) ? (m.width = l + "px", y || (m.textOverflow = d.specificTextOverflow || t), d.css(m)) : d.styles && d.styles.width && !m.width && !a && d.css({ width: null }), delete d.specificTextOverflow, b.rotation = z.rotation) }, this); this.tickRotCorr = d.rotCorr(p.b, this.labelRotation || 0, 0 !== this.side)
                }; d.prototype.hasData = function () {
                    return this.series.some(function (b) { return b.hasData() }) ||
                        this.options.showEmpty && A(this.min) && A(this.max)
                }; d.prototype.addTitle = function (b) {
                    var d = this.chart.renderer, a = this.horiz, k = this.opposite, c = this.options.title, h, u = this.chart.styledMode; this.axisTitle || ((h = c.textAlign) || (h = (a ? { low: "left", middle: "center", high: "right" } : { low: k ? "right" : "left", middle: "center", high: k ? "left" : "right" })[c.align]), this.axisTitle = d.text(c.text, 0, 0, c.useHTML).attr({ zIndex: 7, rotation: c.rotation || 0, align: h }).addClass("highcharts-axis-title"), u || this.axisTitle.css(e(c.style)), this.axisTitle.add(this.axisGroup),
                        this.axisTitle.isNew = !0); u || c.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" }); this.axisTitle[b ? "show" : "hide"](b)
                }; d.prototype.generateTick = function (b) { var d = this.ticks; d[b] ? d[b].addLabel() : d[b] = new r(this, b) }; d.prototype.getOffset = function () {
                    var b = this, d = b.chart, a = d.renderer, e = b.options, k = b.tickPositions, c = b.ticks, h = b.horiz, g = b.side, z = d.inverted && !b.isZAxis ? [1, 0, 3, 2][g] : g, p, y = 0, F = 0, l = e.title, t = e.labels, K = 0, x = d.axisOffset; d = d.clipOffset; var O = [-1, 1, 1, -1][g], n = e.className, f = b.axisParent;
                    var E = b.hasData(); b.showAxis = p = E || w(e.showEmpty, !0); b.staggerLines = b.horiz && t.staggerLines; b.axisGroup || (b.gridGroup = a.g("grid").attr({ zIndex: e.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (n || "")).add(f), b.axisGroup = a.g("axis").attr({ zIndex: e.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (n || "")).add(f), b.labelGroup = a.g("axis-labels").attr({ zIndex: t.zIndex || 7 }).addClass("highcharts-" + b.coll.toLowerCase() + "-labels " + (n || "")).add(f)); E || b.isLinked ? (k.forEach(function (d,
                        a) { b.generateTick(d, a) }), b.renderUnsquish(), b.reserveSpaceDefault = 0 === g || 2 === g || { 1: "left", 3: "right" }[g] === b.labelAlign, w(t.reserveSpace, "center" === b.labelAlign ? !0 : null, b.reserveSpaceDefault) && k.forEach(function (b) { K = Math.max(c[b].getLabelSize(), K) }), b.staggerLines && (K *= b.staggerLines), b.labelOffset = K * (b.opposite ? -1 : 1)) : u(c, function (b, d) { b.destroy(); delete c[d] }); if (l && l.text && !1 !== l.enabled && (b.addTitle(p), p && !1 !== l.reserveSpace)) {
                        b.titleOffset = y = b.axisTitle.getBBox()[h ? "height" : "width"]; var q = l.offset;
                            F = A(q) ? 0 : w(l.margin, h ? 5 : 10)
                        } b.renderLine(); b.offset = O * w(e.offset, x[g] ? x[g] + (e.margin || 0) : 0); b.tickRotCorr = b.tickRotCorr || { x: 0, y: 0 }; a = 0 === g ? -b.labelMetrics().h : 2 === g ? b.tickRotCorr.y : 0; F = Math.abs(K) + F; K && (F = F - a + O * (h ? w(t.y, b.tickRotCorr.y + 8 * O) : t.x)); b.axisTitleMargin = w(q, F); b.getMaxLabelDimensions && (b.maxLabelDimensions = b.getMaxLabelDimensions(c, k)); h = this.tickSize("tick"); x[g] = Math.max(x[g], b.axisTitleMargin + y + O * b.offset, F, k && k.length && h ? h[0] + O * b.offset : 0); e = e.offset ? 0 : 2 * Math.floor(b.axisLine.strokeWidth() /
                            2); d[z] = Math.max(d[z], e); v(this, "afterGetOffset")
                }; d.prototype.getLinePath = function (b) { var d = this.chart, a = this.opposite, e = this.offset, k = this.horiz, c = this.left + (a ? this.width : 0) + e; e = d.chartHeight - this.bottom - (a ? this.height : 0) + e; a && (b *= -1); return d.renderer.crispLine([["M", k ? this.left : c, k ? e : this.top], ["L", k ? d.chartWidth - this.right : c, k ? e : d.chartHeight - this.bottom]], b) }; d.prototype.renderLine = function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }))
                }; d.prototype.getTitlePosition = function () {
                    var b = this.horiz, d = this.left, a = this.top, e = this.len, k = this.options.title, c = b ? d : a, h = this.opposite, u = this.offset, g = k.x || 0, w = k.y || 0, z = this.axisTitle, p = this.chart.renderer.fontMetrics(k.style && k.style.fontSize, z); z = Math.max(z.getBBox(null, 0).height - p.h - 1, 0); e = { low: c + (b ? 0 : e), middle: c + e / 2, high: c + (b ? e : 0) }[k.align]; d = (b ? a + this.height : d) + (b ? 1 : -1) *
                        (h ? -1 : 1) * this.axisTitleMargin + [-z, z, p.f, -z][this.side]; b = { x: b ? e + g : d + (h ? this.width : 0) + u + g, y: b ? d + w - (h ? this.height : 0) + u : e + w }; v(this, "afterGetTitlePosition", { titlePosition: b }); return b
                }; d.prototype.renderMinorTick = function (b) { var d = this.chart.hasRendered && p(this.oldMin), a = this.minorTicks; a[b] || (a[b] = new r(this, b, "minor")); d && a[b].isNew && a[b].render(null, !0); a[b].render(null, !1, 1) }; d.prototype.renderTick = function (b, d) {
                    var a = this.isLinked, e = this.ticks, m = this.chart.hasRendered && p(this.oldMin); if (!a || b >=
                        this.min && b <= this.max) e[b] || (e[b] = new r(this, b)), m && e[b].isNew && e[b].render(d, !0, -1), e[b].render(d)
                }; d.prototype.render = function () {
                    var b = this, d = b.chart, a = b.logarithmic, e = b.options, k = b.isLinked, c = b.tickPositions, h = b.axisTitle, g = b.ticks, w = b.minorTicks, y = b.alternateBands, F = e.stackLabels, l = e.alternateGridColor, t = b.tickmarkOffset, K = b.axisLine, x = b.showAxis, O = H(d.renderer.globalAnimation), n, E; b.labelEdge.length = 0; b.overlap = !1;[g, w, y].forEach(function (b) { u(b, function (b) { b.isActive = !1 }) }); if (b.hasData() ||
                        k) b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function (d) { b.renderMinorTick(d) }), c.length && (c.forEach(function (d, a) { b.renderTick(d, a) }), t && (0 === b.min || b.single) && (g[-1] || (g[-1] = new r(b, -1, null, !0)), g[-1].render(-1))), l && c.forEach(function (e, m) {
                            E = "undefined" !== typeof c[m + 1] ? c[m + 1] + t : b.max - t; 0 === m % 2 && e < b.max && E <= b.max + (d.polar ? -t : t) && (y[e] || (y[e] = new f.PlotLineOrBand(b)), n = e + t, y[e].options = { from: a ? a.lin2log(n) : n, to: a ? a.lin2log(E) : E, color: l, className: "highcharts-alternate-grid" },
                                y[e].render(), y[e].isActive = !0)
                        }), b._addedPlotLB || ((e.plotLines || []).concat(e.plotBands || []).forEach(function (d) { b.addPlotBandOrLine(d) }), b._addedPlotLB = !0);[g, w, y].forEach(function (b) { var a, e = [], m = O.duration; u(b, function (b, d) { b.isActive || (b.render(d, !1, 0), b.isActive = !1, e.push(d)) }); z(function () { for (a = e.length; a--;)b[e[a]] && !b[e[a]].isActive && (b[e[a]].destroy(), delete b[e[a]]) }, b !== y && d.hasRendered && m ? m : 0) }); K && (K[K.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(K.strokeWidth()) }), K.isPlaced = !0, K[x ?
                            "show" : "hide"](x)); h && x && (e = b.getTitlePosition(), p(e.y) ? (h[h.isNew ? "attr" : "animate"](e), h.isNew = !1) : (h.attr("y", -9999), h.isNew = !0)); F && F.enabled && b.stacking && b.stacking.renderStackTotals(); b.isDirty = !1; v(this, "afterRender")
                }; d.prototype.redraw = function () { this.visible && (this.render(), this.plotLinesAndBands.forEach(function (b) { b.render() })); this.series.forEach(function (b) { b.isDirty = !0 }) }; d.prototype.getKeepProps = function () { return this.keepProps || d.keepProps }; d.prototype.destroy = function (b) {
                    var d = this,
                    a = d.plotLinesAndBands, e; v(this, "destroy", { keepEvents: b }); b || y(d);[d.ticks, d.minorTicks, d.alternateBands].forEach(function (b) { L(b) }); if (a) for (b = a.length; b--;)a[b].destroy(); "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (b) { d[b] && (d[b] = d[b].destroy()) }); for (e in d.plotLinesAndBandsGroups) d.plotLinesAndBandsGroups[e] = d.plotLinesAndBandsGroups[e].destroy(); u(d, function (b, a) { -1 === d.getKeepProps().indexOf(a) && delete d[a] })
                }; d.prototype.drawCrosshair = function (b,
                    d) {
                        var a = this.crosshair, e = w(a.snap, !0), m, k = this.cross, c = this.chart; v(this, "drawCrosshair", { e: b, point: d }); b || (b = this.cross && this.cross.e); if (this.crosshair && !1 !== (A(d) || !e)) {
                            e ? A(d) && (m = w("colorAxis" !== this.coll ? d.crosshairPos : null, this.isXAxis ? d.plotX : this.len - d.plotY)) : m = b && (this.horiz ? b.chartX - this.pos : this.len - b.chartY + this.pos); if (A(m)) {
                                var h = { value: d && (this.isXAxis ? d.x : w(d.stackY, d.y)), translatedValue: m }; c.polar && l(h, { isCrosshair: !0, chartX: b && b.chartX, chartY: b && b.chartY, point: d }); h = this.getPlotLinePath(h) ||
                                    null
                            } if (!A(h)) { this.hideCrosshair(); return } e = this.categories && !this.isRadial; k || (this.cross = k = c.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (e ? "category " : "thin ") + a.className).attr({ zIndex: w(a.zIndex, 2) }).add(), c.styledMode || (k.attr({ stroke: a.color || (e ? q.parse("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": w(a.width, 1) }).css({ "pointer-events": "none" }), a.dashStyle && k.attr({ dashstyle: a.dashStyle }))); k.show().attr({ d: h }); e && !a.width && k.attr({ "stroke-width": this.transA });
                            this.cross.e = b
                        } else this.hideCrosshair(); v(this, "afterDrawCrosshair", { e: b, point: d })
                }; d.prototype.hideCrosshair = function () { this.cross && this.cross.hide(); v(this, "afterHideCrosshair") }; d.prototype.hasVerticalPanning = function () { var b, d; return /y/.test((null === (d = null === (b = this.chart.options.chart) || void 0 === b ? void 0 : b.panning) || void 0 === d ? void 0 : d.type) || "") }; d.prototype.validatePositiveValue = function (b) { return p(b) && 0 < b }; d.defaultOptions = {
                    dateTimeLabelFormats: {
                        millisecond: { main: "%H:%M:%S.%L", range: !1 },
                        second: { main: "%H:%M:%S", range: !1 }, minute: { main: "%H:%M", range: !1 }, hour: { main: "%H:%M", range: !1 }, day: { main: "%e. %b" }, week: { main: "%e. %b" }, month: { main: "%b '%y" }, year: { main: "%Y" }
                    }, endOnTick: !1, labels: { enabled: !0, indentation: 10, x: 0, style: { color: "#666666", cursor: "default", fontSize: "11px" } }, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", minPadding: .01, showEmpty: !0, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: {
                        align: "middle",
                        style: { color: "#666666" }
                    }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb"
                }; d.defaultYAxisOptions = {
                    endOnTick: !0, maxPadding: .05, minPadding: .05, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: {
                        animation: {}, allowOverlap: !1, enabled: !1, crop: !0, overflow: "justify", formatter: function () {
                            var b = this.axis.chart.numberFormatter; return b(this.total,
                                -1)
                        }, style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" }
                    }, gridLineWidth: 1, lineWidth: 0
                }; d.defaultLeftAxisOptions = { labels: { x: -15 }, title: { rotation: 270 } }; d.defaultRightAxisOptions = { labels: { x: 15 }, title: { rotation: 90 } }; d.defaultBottomAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } }; d.defaultTopAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } }; d.keepProps = "extKey hcEvents names series userMax userMin".split(" "); return d
        }();
        f.Axis = C; return f.Axis
    }); N(r, "Core/Axis/DateTimeAxis.js", [r["Core/Axis/Axis.js"], r["Core/Utilities.js"]], function (q, f) {
        var r = f.addEvent, C = f.getMagnitude, G = f.normalizeTickInterval, B = f.timeUnits, H = function () {
            function f(n) { this.axis = n } f.prototype.normalizeTimeTickInterval = function (n, f) {
                var q = f || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]]; f = q[q.length -
                    1]; var A = B[f[0]], I = f[1], E; for (E = 0; E < q.length && !(f = q[E], A = B[f[0]], I = f[1], q[E + 1] && n <= (A * I[I.length - 1] + B[q[E + 1][0]]) / 2); E++); A === B.year && n < 5 * A && (I = [1, 2, 5]); n = G(n / A, I, "year" === f[0] ? Math.max(C(n / A), 1) : 1); return { unitRange: A, count: n, unitName: f[0] }
            }; return f
        }(); f = function () {
            function f() { } f.compose = function (f) {
                f.keepProps.push("dateTime"); f.prototype.getTimeTicks = function () { return this.chart.time.getTimeTicks.apply(this.chart.time, arguments) }; r(f, "init", function (f) {
                    "datetime" !== f.userOptions.type ? this.dateTime =
                        void 0 : this.dateTime || (this.dateTime = new H(this))
                })
            }; f.AdditionsClass = H; return f
        }(); f.compose(q); return f
    }); N(r, "Core/Axis/LogarithmicAxis.js", [r["Core/Axis/Axis.js"], r["Core/Utilities.js"]], function (q, f) {
        var r = f.addEvent, C = f.getMagnitude, G = f.normalizeTickInterval, B = f.pick, H = function () {
            function f(f) { this.axis = f } f.prototype.getLogTickPositions = function (f, q, r, A) {
                var n = this.axis, E = n.len, l = n.options, v = []; A || (this.minorAutoInterval = void 0); if (.5 <= f) f = Math.round(f), v = n.getLinearTickPositions(f, q, r); else if (.08 <=
                    f) { l = Math.floor(q); var x, t; for (E = .3 < f ? [1, 2, 4] : .15 < f ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; l < r + 1 && !t; l++) { var g = E.length; for (x = 0; x < g && !t; x++) { var c = this.log2lin(this.lin2log(l) * E[x]); c > q && (!A || p <= r) && "undefined" !== typeof p && v.push(p); p > r && (t = !0); var p = c } } } else q = this.lin2log(q), r = this.lin2log(r), f = A ? n.getMinorTickInterval() : l.tickInterval, f = B("auto" === f ? null : f, this.minorAutoInterval, l.tickPixelInterval / (A ? 5 : 1) * (r - q) / ((A ? E / n.tickPositions.length : E) || 1)), f = G(f, void 0, C(f)), v = n.getLinearTickPositions(f, q, r).map(this.log2lin),
                        A || (this.minorAutoInterval = f / 5); A || (n.tickInterval = f); return v
            }; f.prototype.lin2log = function (f) { return Math.pow(10, f) }; f.prototype.log2lin = function (f) { return Math.log(f) / Math.LN10 }; return f
        }(); f = function () {
            function f() { } f.compose = function (f) {
                f.keepProps.push("logarithmic"); var n = f.prototype, q = H.prototype; n.log2lin = q.log2lin; n.lin2log = q.lin2log; r(f, "init", function (f) {
                    var n = this.logarithmic; "logarithmic" !== f.userOptions.type ? this.logarithmic = void 0 : (n || (n = this.logarithmic = new H(this)), this.log2lin !==
                        n.log2lin && (n.log2lin = this.log2lin.bind(this)), this.lin2log !== n.lin2log && (n.lin2log = this.lin2log.bind(this)))
                }); r(f, "afterInit", function () { var f = this.logarithmic; f && (this.lin2val = function (n) { return f.lin2log(n) }, this.val2lin = function (n) { return f.log2lin(n) }) })
            }; return f
        }(); f.compose(q); return f
    }); N(r, "Core/Axis/PlotLineOrBand.js", [r["Core/Axis/Axis.js"], r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f, r) {
        var C = r.arrayMax, G = r.arrayMin, B = r.defined, H = r.destroyObjectProperties, D = r.erase, n = r.extend,
        I = r.merge, M = r.objectEach, A = r.pick, L = function () {
            function n(l, v) { this.axis = l; v && (this.options = v, this.id = v.id) } n.prototype.render = function () {
                f.fireEvent(this, "render"); var l = this, v = l.axis, x = v.horiz, t = v.logarithmic, g = l.options, c = g.label, p = l.label, h = g.to, e = g.from, a = g.value, u = B(e) && B(h), w = B(a), F = l.svgElem, y = !F, k = [], z = g.color, O = A(g.zIndex, 0), K = g.events; k = { "class": "highcharts-plot-" + (u ? "band " : "line ") + (g.className || "") }; var d = {}, b = v.chart.renderer, m = u ? "bands" : "lines"; t && (e = t.log2lin(e), h = t.log2lin(h), a =
                    t.log2lin(a)); v.chart.styledMode || (w ? (k.stroke = z || "#999999", k["stroke-width"] = A(g.width, 1), g.dashStyle && (k.dashstyle = g.dashStyle)) : u && (k.fill = z || "#e6ebf5", g.borderWidth && (k.stroke = g.borderColor, k["stroke-width"] = g.borderWidth))); d.zIndex = O; m += "-" + O; (t = v.plotLinesAndBandsGroups[m]) || (v.plotLinesAndBandsGroups[m] = t = b.g("plot-" + m).attr(d).add()); y && (l.svgElem = F = b.path().attr(k).add(t)); if (w) k = v.getPlotLinePath({ value: a, lineWidth: F.strokeWidth(), acrossPanes: g.acrossPanes }); else if (u) k = v.getPlotBandPath(e,
                        h, g); else return; !l.eventsAdded && K && (M(K, function (b, d) { F.on(d, function (b) { K[d].apply(l, [b]) }) }), l.eventsAdded = !0); (y || !F.d) && k && k.length ? F.attr({ d: k }) : F && (k ? (F.show(!0), F.animate({ d: k })) : F.d && (F.hide(), p && (l.label = p = p.destroy()))); c && (B(c.text) || B(c.formatter)) && k && k.length && 0 < v.width && 0 < v.height && !k.isFlat ? (c = I({ align: x && u && "center", x: x ? !u && 4 : 10, verticalAlign: !x && u && "middle", y: x ? u ? 16 : 10 : u ? 6 : -4, rotation: x && !u && 90 }, c), this.renderLabel(c, k, u, O)) : p && p.hide(); return l
            }; n.prototype.renderLabel = function (l,
                v, f, t) { var g = this.label, c = this.axis.chart.renderer; g || (g = { align: l.textAlign || l.align, rotation: l.rotation, "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (l.className || "") }, g.zIndex = t, t = this.getLabelText(l), this.label = g = c.text(t, 0, 0, l.useHTML).attr(g).add(), this.axis.chart.styledMode || g.css(l.style)); c = v.xBounds || [v[0][1], v[1][1], f ? v[2][1] : v[0][1]]; v = v.yBounds || [v[0][2], v[1][2], f ? v[2][2] : v[0][2]]; f = G(c); t = G(v); g.align(l, !1, { x: f, y: t, width: C(c) - f, height: C(v) - t }); g.show(!0) }; n.prototype.getLabelText =
                    function (l) { return B(l.formatter) ? l.formatter.call(this) : l.text }; n.prototype.destroy = function () { D(this.axis.plotLinesAndBands, this); delete this.axis; H(this) }; return n
        }(); n(q.prototype, {
            getPlotBandPath: function (f, l) {
                var v = this.getPlotLinePath({ value: l, force: !0, acrossPanes: this.options.acrossPanes }), x = this.getPlotLinePath({ value: f, force: !0, acrossPanes: this.options.acrossPanes }), t = [], g = this.horiz, c = 1; f = f < this.min && l < this.min || f > this.max && l > this.max; if (x && v) {
                    if (f) {
                        var p = x.toString() === v.toString(); c =
                            0
                    } for (f = 0; f < x.length; f += 2) { l = x[f]; var h = x[f + 1], e = v[f], a = v[f + 1]; "M" !== l[0] && "L" !== l[0] || "M" !== h[0] && "L" !== h[0] || "M" !== e[0] && "L" !== e[0] || "M" !== a[0] && "L" !== a[0] || (g && e[1] === l[1] ? (e[1] += c, a[1] += c) : g || e[2] !== l[2] || (e[2] += c, a[2] += c), t.push(["M", l[1], l[2]], ["L", h[1], h[2]], ["L", a[1], a[2]], ["L", e[1], e[2]], ["Z"])); t.isFlat = p }
                } return t
            }, addPlotBand: function (f) { return this.addPlotBandOrLine(f, "plotBands") }, addPlotLine: function (f) { return this.addPlotBandOrLine(f, "plotLines") }, addPlotBandOrLine: function (f, l) {
                var v =
                    (new L(this, f)).render(), x = this.userOptions; if (v) { if (l) { var t = x[l] || []; t.push(f); x[l] = t } this.plotLinesAndBands.push(v); this._addedPlotLB = !0 } return v
            }, removePlotBandOrLine: function (f) { for (var l = this.plotLinesAndBands, v = this.options, x = this.userOptions, t = l.length; t--;)l[t].id === f && l[t].destroy();[v.plotLines || [], x.plotLines || [], v.plotBands || [], x.plotBands || []].forEach(function (g) { for (t = g.length; t--;)(g[t] || {}).id === f && D(g, g[t]) }) }, removePlotBand: function (f) { this.removePlotBandOrLine(f) }, removePlotLine: function (f) { this.removePlotBandOrLine(f) }
        });
        f.PlotLineOrBand = L; return f.PlotLineOrBand
    }); N(r, "Core/Tooltip.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
        var r = q.doc, C = f.clamp, G = f.css, B = f.defined, H = f.discardElement, D = f.extend, n = f.fireEvent, I = f.format, M = f.isNumber, A = f.isString, L = f.merge, E = f.pick, l = f.splat, v = f.syncTimeout, x = f.timeUnits; ""; var t = function () {
            function g(c, g) {
            this.container = void 0; this.crosshairs = []; this.distance = 0; this.isHidden = !0; this.isSticky = !1; this.now = {}; this.options = {}; this.outside = !1; this.chart = c; this.init(c,
                g)
            } g.prototype.applyFilter = function () {
                var c = this.chart; c.renderer.definition({ tagName: "filter", id: "drop-shadow-" + c.index, opacity: .5, children: [{ tagName: "feGaussianBlur", "in": "SourceAlpha", stdDeviation: 1 }, { tagName: "feOffset", dx: 1, dy: 1 }, { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", type: "linear", slope: .3 }] }, { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", "in": "SourceGraphic" }] }] }); c.renderer.definition({
                    tagName: "style", textContent: ".highcharts-tooltip-" + c.index +
                        "{filter:url(#drop-shadow-" + c.index + ")}"
                })
            }; g.prototype.bodyFormatter = function (c) { return c.map(function (c) { var h = c.series.tooltipOptions; return (h[(c.point.formatPrefix || "point") + "Formatter"] || c.point.tooltipFormatter).call(c.point, h[(c.point.formatPrefix || "point") + "Format"] || "") }) }; g.prototype.cleanSplit = function (c) { this.chart.series.forEach(function (g) { var h = g && g.tt; h && (!h.isActive || c ? g.tt = h.destroy() : h.isActive = !1) }) }; g.prototype.defaultFormatter = function (c) {
                var g = this.points || l(this); var h = [c.tooltipFooterHeaderFormatter(g[0])];
                h = h.concat(c.bodyFormatter(g)); h.push(c.tooltipFooterHeaderFormatter(g[0], !0)); return h
            }; g.prototype.destroy = function () { this.label && (this.label = this.label.destroy()); this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy()); this.renderer && (this.renderer = this.renderer.destroy(), H(this.container)); f.clearTimeout(this.hideTimer); f.clearTimeout(this.tooltipTimeout) }; g.prototype.getAnchor = function (c, g) {
                var h = this.chart, e = h.pointer, a = h.inverted, u = h.plotTop, w = h.plotLeft, p = 0, y = 0, k, z;
                c = l(c); this.followPointer && g ? ("undefined" === typeof g.chartX && (g = e.normalize(g)), c = [g.chartX - w, g.chartY - u]) : c[0].tooltipPos ? c = c[0].tooltipPos : (c.forEach(function (e) { k = e.series.yAxis; z = e.series.xAxis; p += e.plotX + (!a && z ? z.left - w : 0); y += (e.plotLow ? (e.plotLow + e.plotHigh) / 2 : e.plotY) + (!a && k ? k.top - u : 0) }), p /= c.length, y /= c.length, c = [a ? h.plotWidth - y : p, this.shared && !a && 1 < c.length && g ? g.chartY - u : a ? h.plotHeight - p : y]); return c.map(Math.round)
            }; g.prototype.getDateFormat = function (c, g, h, e) {
                var a = this.chart.time, u = a.dateFormat("%m-%d %H:%M:%S.%L",
                    g), w = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, p = "millisecond"; for (y in x) { if (c === x.week && +a.dateFormat("%w", g) === h && "00:00:00.000" === u.substr(6)) { var y = "week"; break } if (x[y] > c) { y = p; break } if (w[y] && u.substr(w[y]) !== "01-01 00:00:00.000".substr(w[y])) break; "week" !== y && (p = y) } if (y) var k = a.resolveDTLFormat(e[y]).main; return k
            }; g.prototype.getLabel = function () {
                var c, g, h = this, e = this.chart.renderer, a = this.chart.styledMode, u = this.options, w = "tooltip" + (B(u.className) ? " " + u.className : ""), F = (null === (c = u.style) ||
                    void 0 === c ? void 0 : c.pointerEvents) || (!this.followPointer && u.stickOnContact ? "auto" : "none"), y; c = function () { h.inContact = !0 }; var k = function () { var d = h.chart.hoverSeries; h.inContact = !1; if (d && d.onMouseOut) d.onMouseOut() }; if (!this.label) {
                    this.outside && (this.container = y = q.doc.createElement("div"), y.className = "highcharts-tooltip-container", G(y, { position: "absolute", top: "1px", pointerEvents: F, zIndex: 3 }), q.doc.body.appendChild(y), this.renderer = e = new q.Renderer(y, 0, 0, null === (g = this.chart.options.chart) || void 0 ===
                        g ? void 0 : g.style, void 0, void 0, e.styledMode)); this.split ? this.label = e.g(w) : (this.label = e.label("", 0, 0, u.shape || "callout", null, null, u.useHTML, null, w).attr({ padding: u.padding, r: u.borderRadius }), a || this.label.attr({ fill: u.backgroundColor, "stroke-width": u.borderWidth }).css(u.style).css({ pointerEvents: F }).shadow(u.shadow)); a && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)); if (h.outside && !h.split) {
                            var z = this.label, l = z.xSetter, t = z.ySetter; z.xSetter = function (d) {
                                l.call(z, h.distance);
                                y.style.left = d + "px"
                            }; z.ySetter = function (d) { t.call(z, h.distance); y.style.top = d + "px" }
                        } this.label.on("mouseenter", c).on("mouseleave", k).attr({ zIndex: 8 }).add()
                    } return this.label
            }; g.prototype.getPosition = function (c, g, h) {
                var e = this.chart, a = this.distance, u = {}, w = e.inverted && h.h || 0, p, y = this.outside, k = y ? r.documentElement.clientWidth - 2 * a : e.chartWidth, z = y ? Math.max(r.body.scrollHeight, r.documentElement.scrollHeight, r.body.offsetHeight, r.documentElement.offsetHeight, r.documentElement.clientHeight) : e.chartHeight,
                l = e.pointer.getChartPosition(), t = e.containerScaling, d = function (b) { return t ? b * t.scaleX : b }, b = function (b) { return t ? b * t.scaleY : b }, m = function (m) { var u = "x" === m; return [m, u ? k : z, u ? c : g].concat(y ? [u ? d(c) : b(g), u ? l.left - a + d(h.plotX + e.plotLeft) : l.top - a + b(h.plotY + e.plotTop), 0, u ? k : z] : [u ? c : g, u ? h.plotX + e.plotLeft : h.plotY + e.plotTop, u ? e.plotLeft : e.plotTop, u ? e.plotLeft + e.plotWidth : e.plotTop + e.plotHeight]) }, J = m("y"), f = m("x"), v = !this.followPointer && E(h.ttBelow, !e.inverted === !!h.negative), x = function (e, m, k, c, h, g, z) {
                    var p =
                        "y" === e ? b(a) : d(a), y = (k - c) / 2, F = c < h - a, l = h + a + c < m, t = h - p - k + y; h = h + p - y; if (v && l) u[e] = h; else if (!v && F) u[e] = t; else if (F) u[e] = Math.min(z - c, 0 > t - w ? t : t - w); else if (l) u[e] = Math.max(g, h + w + k > m ? h : h + w); else return !1
                }, n = function (b, d, e, m, k) { var c; k < a || k > d - a ? c = !1 : u[b] = k < e / 2 ? 1 : k > d - m / 2 ? d - m - 2 : k - e / 2; return c }, q = function (b) { var d = J; J = f; f = d; p = b }, A = function () { !1 !== x.apply(0, J) ? !1 !== n.apply(0, f) || p || (q(!0), A()) : p ? u.x = u.y = 0 : (q(!0), A()) }; (e.inverted || 1 < this.len) && q(); A(); return u
            }; g.prototype.getXDateFormat = function (c, g, h) {
                g = g.dateTimeLabelFormats;
                var e = h && h.closestPointRange; return (e ? this.getDateFormat(e, c.x, h.options.startOfWeek, g) : g.day) || g.year
            }; g.prototype.hide = function (c) { var g = this; f.clearTimeout(this.hideTimer); c = E(c, this.options.hideDelay, 500); this.isHidden || (this.hideTimer = v(function () { g.getLabel().fadeOut(c ? void 0 : c); g.isHidden = !0 }, c)) }; g.prototype.init = function (c, g) {
            this.chart = c; this.options = g; this.crosshairs = []; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.split = g.split && !c.inverted && !c.polar; this.shared = g.shared || this.split; this.outside =
                E(g.outside, !(!c.scrollablePixelsX && !c.scrollablePixelsY))
            }; g.prototype.isStickyOnContact = function () { return !(this.followPointer || !this.options.stickOnContact || !this.inContact) }; g.prototype.move = function (c, g, h, e) {
                var a = this, u = a.now, w = !1 !== a.options.animation && !a.isHidden && (1 < Math.abs(c - u.x) || 1 < Math.abs(g - u.y)), p = a.followPointer || 1 < a.len; D(u, { x: w ? (2 * u.x + c) / 3 : c, y: w ? (u.y + g) / 2 : g, anchorX: p ? void 0 : w ? (2 * u.anchorX + h) / 3 : h, anchorY: p ? void 0 : w ? (u.anchorY + e) / 2 : e }); a.getLabel().attr(u); a.drawTracker(); w && (f.clearTimeout(this.tooltipTimeout),
                    this.tooltipTimeout = setTimeout(function () { a && a.move(c, g, h, e) }, 32))
            }; g.prototype.refresh = function (c, g) {
                var h = this.chart, e = this.options, a = c, u = {}, w = [], p = e.formatter || this.defaultFormatter; u = this.shared; var y = h.styledMode; if (e.enabled) {
                    f.clearTimeout(this.hideTimer); this.followPointer = l(a)[0].series.tooltipOptions.followPointer; var k = this.getAnchor(a, g); g = k[0]; var z = k[1]; !u || a.series && a.series.noSharedTooltip ? u = a.getLabelConfig() : (h.pointer.applyInactiveState(a), a.forEach(function (a) {
                        a.setState("hover");
                        w.push(a.getLabelConfig())
                    }), u = { x: a[0].category, y: a[0].y }, u.points = w, a = a[0]); this.len = w.length; h = p.call(u, this); p = a.series; this.distance = E(p.tooltipOptions.distance, 16); !1 === h ? this.hide() : (this.split ? this.renderSplit(h, l(c)) : (c = this.getLabel(), e.style.width && !y || c.css({ width: this.chart.spacingBox.width + "px" }), c.attr({ text: h && h.join ? h.join("") : h }), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + E(a.colorIndex, p.colorIndex)), y || c.attr({ stroke: e.borderColor || a.color || p.color || "#666666" }),
                        this.updatePosition({ plotX: g, plotY: z, negative: a.negative, ttBelow: a.ttBelow, h: k[2] || 0 })), this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(), this.isHidden = !1); n(this, "refresh")
                }
            }; g.prototype.renderSplit = function (c, g) {
                function h(b, d, a, e, m) { void 0 === m && (m = !0); a ? (d = r ? 0 : B, b = C(b - e / 2, x.left, x.right - e)) : (d -= I, b = m ? b - e - J : b + J, b = C(b, m ? b : x.left, x.right)); return { x: b, y: d } } var e = this, a = e.chart, u = e.chart, w = u.plotHeight, p = u.plotLeft, y = u.plotTop, k = u.pointer, z = u.renderer, l = u.scrollablePixelsY, t = void 0 === l ?
                    0 : l; l = u.scrollingContainer; l = void 0 === l ? { scrollLeft: 0, scrollTop: 0 } : l; var d = l.scrollLeft, b = l.scrollTop, m = u.styledMode, J = e.distance, f = e.options, v = e.options.positioner, x = { left: d, right: d + u.chartWidth, top: b, bottom: b + u.chartHeight }, n = e.getLabel(), r = !(!a.xAxis[0] || !a.xAxis[0].opposite), I = y + b, L = 0, B = w - t; A(c) && (c = [!1, c]); c = c.slice(0, g.length + 1).reduce(function (d, a, k) {
                        if (!1 !== a && "" !== a) {
                            k = g[k - 1] || { isHeader: !0, plotX: g[0].plotX, plotY: w, series: {} }; var c = k.isHeader, u = c ? e : k.series, l = u.tt, F = k.isHeader; var K = k.series;
                            var O = "highcharts-color-" + E(k.colorIndex, K.colorIndex, "none"); l || (l = { padding: f.padding, r: f.borderRadius }, m || (l.fill = f.backgroundColor, l["stroke-width"] = f.borderWidth), l = z.label("", 0, 0, f[F ? "headerShape" : "shape"] || "callout", void 0, void 0, f.useHTML).addClass((F ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + O).attr(l).add(n)); l.isActive = !0; l.attr({ text: a }); m || l.css(f.style).shadow(f.shadow).attr({ stroke: f.borderColor || k.color || K.color || "#333333" }); a = u.tt = l; F = a.getBBox(); u = F.width + a.strokeWidth();
                            c && (L = F.height, B += L, r && (I -= L)); K = k.plotX; K = void 0 === K ? 0 : K; O = k.plotY; O = void 0 === O ? 0 : O; var P = k.series; if (k.isHeader) { K = p + K; var q = y + w / 2 } else l = P.xAxis, P = P.yAxis, K = l.pos + C(K, -J, l.len + J), P.pos + O >= b + y && P.pos + O <= b + y + w - t && (q = P.pos + O); K = C(K, x.left - J, x.right + J); "number" === typeof q ? (F = F.height + 1, O = v ? v.call(e, u, F, k) : h(K, q, c, u), d.push({ align: v ? 0 : void 0, anchorX: K, anchorY: q, boxWidth: u, point: k, rank: E(O.rank, c ? 1 : 0), size: F, target: O.y, tt: a, x: O.x })) : a.isActive = !1
                        } return d
                    }, []); !v && c.some(function (b) { return b.x < x.left }) &&
                        (c = c.map(function (b) { var d = h(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1); return D(b, { target: d.y, x: d.x }) })); e.cleanSplit(); q.distribute(c, B); c.forEach(function (b) { var d = b.pos; b.tt.attr({ visibility: "undefined" === typeof d ? "hidden" : "inherit", x: b.x, y: d + I, anchorX: b.anchorX, anchorY: b.anchorY }) }); c = e.container; a = e.renderer; e.outside && c && a && (u = n.getBBox(), a.setSize(u.width + u.x, u.height + u.y, !1), k = k.getChartPosition(), c.style.left = k.left + "px", c.style.top = k.top + "px")
            }; g.prototype.drawTracker = function () {
                if (this.followPointer ||
                    !this.options.stickOnContact) this.tracker && this.tracker.destroy(); else {
                        var c = this.chart, g = this.label, h = c.hoverPoint; if (g && h) {
                            var e = { x: 0, y: 0, width: 0, height: 0 }; h = this.getAnchor(h); var a = g.getBBox(); h[0] += c.plotLeft - g.translateX; h[1] += c.plotTop - g.translateY; e.x = Math.min(0, h[0]); e.y = Math.min(0, h[1]); e.width = 0 > h[0] ? Math.max(Math.abs(h[0]), a.width - h[0]) : Math.max(Math.abs(h[0]), a.width); e.height = 0 > h[1] ? Math.max(Math.abs(h[1]), a.height - Math.abs(h[1])) : Math.max(Math.abs(h[1]), a.height); this.tracker ? this.tracker.attr(e) :
                                (this.tracker = g.renderer.rect(e).addClass("highcharts-tracker").add(g), c.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }))
                        }
                }
            }; g.prototype.styledModeFormat = function (c) { return c.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"') }; g.prototype.tooltipFooterHeaderFormatter = function (c, g) {
                var h = g ? "footer" : "header", e = c.series, a = e.tooltipOptions, u = a.xDateFormat, w = e.xAxis, p = w && "datetime" === w.options.type &&
                    M(c.key), y = a[h + "Format"]; g = { isFooter: g, labelConfig: c }; n(this, "headerFormatter", g, function (k) { p && !u && (u = this.getXDateFormat(c, a, w)); p && u && (c.point && c.point.tooltipDateKeys || ["key"]).forEach(function (a) { y = y.replace("{point." + a + "}", "{point." + a + ":" + u + "}") }); e.chart.styledMode && (y = this.styledModeFormat(y)); k.text = I(y, { point: c, series: e }, this.chart) }); return g.text
            }; g.prototype.update = function (c) { this.destroy(); L(!0, this.chart.options.tooltip.userOptions, c); this.init(this.chart, L(!0, this.options, c)) }; g.prototype.updatePosition =
                function (c) {
                    var g = this.chart, h = g.pointer, e = this.getLabel(), a = c.plotX + g.plotLeft, u = c.plotY + g.plotTop; h = h.getChartPosition(); c = (this.options.positioner || this.getPosition).call(this, e.width, e.height, c); if (this.outside) { var w = (this.options.borderWidth || 0) + 2 * this.distance; this.renderer.setSize(e.width + w, e.height + w, !1); if (g = g.containerScaling) G(this.container, { transform: "scale(" + g.scaleX + ", " + g.scaleY + ")" }), a *= g.scaleX, u *= g.scaleY; a += h.left - c.x; u += h.top - c.y } this.move(Math.round(c.x), Math.round(c.y || 0),
                        a, u)
                }; return g
        }(); q.Tooltip = t; return q.Tooltip
    }); N(r, "Core/Pointer.js", [r["Core/Color.js"], r["Core/Globals.js"], r["Core/Tooltip.js"], r["Core/Utilities.js"]], function (q, f, r, C) {
        var G = q.parse, B = f.charts, H = f.noop, D = C.addEvent, n = C.attr, I = C.css, M = C.defined, A = C.extend, L = C.find, E = C.fireEvent, l = C.isNumber, v = C.isObject, x = C.objectEach, t = C.offset, g = C.pick, c = C.splat; ""; q = function () {
            function p(c, e) {
            this.lastValidTouch = {}; this.pinchDown = []; this.runChartClick = !1; this.chart = c; this.hasDragged = !1; this.options = e; this.unbindContainerMouseLeave =
                function () { }; this.unbindContainerMouseEnter = function () { }; this.init(c, e)
            } p.prototype.applyInactiveState = function (c) { var e = [], a; (c || []).forEach(function (c) { a = c.series; e.push(a); a.linkedParent && e.push(a.linkedParent); a.linkedSeries && (e = e.concat(a.linkedSeries)); a.navigatorSeries && e.push(a.navigatorSeries) }); this.chart.series.forEach(function (a) { -1 === e.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive") }) }; p.prototype.destroy = function () {
                var c = this; "undefined" !==
                    typeof c.unDocMouseMove && c.unDocMouseMove(); this.unbindContainerMouseLeave(); f.chartCount || (f.unbindDocumentMouseUp && (f.unbindDocumentMouseUp = f.unbindDocumentMouseUp()), f.unbindDocumentTouchEnd && (f.unbindDocumentTouchEnd = f.unbindDocumentTouchEnd())); clearInterval(c.tooltipTimeout); x(c, function (e, a) { c[a] = void 0 })
            }; p.prototype.drag = function (c) {
                var e = this.chart, a = e.options.chart, h = c.chartX, g = c.chartY, p = this.zoomHor, y = this.zoomVert, k = e.plotLeft, z = e.plotTop, l = e.plotWidth, t = e.plotHeight, d = this.selectionMarker,
                b = this.mouseDownX || 0, m = this.mouseDownY || 0, J = v(a.panning) ? a.panning && a.panning.enabled : a.panning, f = a.panKey && c[a.panKey + "Key"]; if (!d || !d.touch) if (h < k ? h = k : h > k + l && (h = k + l), g < z ? g = z : g > z + t && (g = z + t), this.hasDragged = Math.sqrt(Math.pow(b - h, 2) + Math.pow(m - g, 2)), 10 < this.hasDragged) {
                    var x = e.isInsidePlot(b - k, m - z); e.hasCartesianSeries && (this.zoomX || this.zoomY) && x && !f && !d && (this.selectionMarker = d = e.renderer.rect(k, z, p ? 1 : l, y ? 1 : t, 0).attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), e.styledMode || d.attr({
                        fill: a.selectionMarkerFill ||
                            G("#335cad").setOpacity(.25).get()
                    })); d && p && (h -= b, d.attr({ width: Math.abs(h), x: (0 < h ? 0 : h) + b })); d && y && (h = g - m, d.attr({ height: Math.abs(h), y: (0 < h ? 0 : h) + m })); x && !d && J && e.pan(c, a.panning)
                }
            }; p.prototype.dragStart = function (c) { var e = this.chart; e.mouseIsDown = c.type; e.cancelClick = !1; e.mouseDownX = this.mouseDownX = c.chartX; e.mouseDownY = this.mouseDownY = c.chartY }; p.prototype.drop = function (c) {
                var e = this, a = this.chart, h = this.hasPinched; if (this.selectionMarker) {
                    var g = { originalEvent: c, xAxis: [], yAxis: [] }, p = this.selectionMarker,
                    y = p.attr ? p.attr("x") : p.x, k = p.attr ? p.attr("y") : p.y, z = p.attr ? p.attr("width") : p.width, t = p.attr ? p.attr("height") : p.height, K; if (this.hasDragged || h) a.axes.forEach(function (d) { if (d.zoomEnabled && M(d.min) && (h || e[{ xAxis: "zoomX", yAxis: "zoomY" }[d.coll]]) && l(y) && l(k)) { var b = d.horiz, a = "touchend" === c.type ? d.minPixelPadding : 0, u = d.toValue((b ? y : k) + a); b = d.toValue((b ? y + z : k + t) - a); g[d.coll].push({ axis: d, min: Math.min(u, b), max: Math.max(u, b) }); K = !0 } }), K && E(a, "selection", g, function (d) { a.zoom(A(d, h ? { animation: !1 } : null)) });
                    l(a.index) && (this.selectionMarker = this.selectionMarker.destroy()); h && this.scaleGroups()
                } a && l(a.index) && (I(a.container, { cursor: a._cursor }), a.cancelClick = 10 < this.hasDragged, a.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }; p.prototype.findNearestKDPoint = function (c, e, a) {
                var h = this.chart, g = h.hoverPoint; h = h.tooltip; if (g && h && h.isStickyOnContact()) return g; var p; c.forEach(function (c) {
                    var k = !(c.noSharedTooltip && e) && 0 > c.options.findNearestPointBy.indexOf("y"); c = c.searchPoint(a, k); if ((k =
                        v(c, !0)) && !(k = !v(p, !0))) { k = p.distX - c.distX; var h = p.dist - c.dist, g = (c.series.group && c.series.group.zIndex) - (p.series.group && p.series.group.zIndex); k = 0 < (0 !== k && e ? k : 0 !== h ? h : 0 !== g ? g : p.series.index > c.series.index ? -1 : 1) } k && (p = c)
                }); return p
            }; p.prototype.getChartCoordinatesFromPoint = function (c, e) {
                var a = c.series, h = a.xAxis; a = a.yAxis; var w = g(c.clientX, c.plotX), p = c.shapeArgs; if (h && a) return e ? { chartX: h.len + h.pos - w, chartY: a.len + a.pos - c.plotY } : { chartX: w + h.pos, chartY: c.plotY + a.pos }; if (p && p.x && p.y) return {
                    chartX: p.x,
                    chartY: p.y
                }
            }; p.prototype.getChartPosition = function () { return this.chartPosition || (this.chartPosition = t(this.chart.container)) }; p.prototype.getCoordinates = function (c) { var e = { xAxis: [], yAxis: [] }; this.chart.axes.forEach(function (a) { e[a.isXAxis ? "xAxis" : "yAxis"].push({ axis: a, value: a.toValue(c[a.horiz ? "chartX" : "chartY"]) }) }); return e }; p.prototype.getHoverData = function (c, e, a, u, w, p) {
                var h, k = []; u = !(!u || !c); var z = e && !e.stickyTracking, l = { chartX: p ? p.chartX : void 0, chartY: p ? p.chartY : void 0, shared: w }; E(this, "beforeGetHoverData",
                    l); z = z ? [e] : a.filter(function (a) { return l.filter ? l.filter(a) : a.visible && !(!w && a.directTouch) && g(a.options.enableMouseTracking, !0) && a.stickyTracking }); e = (h = u || !p ? c : this.findNearestKDPoint(z, w, p)) && h.series; h && (w && !e.noSharedTooltip ? (z = a.filter(function (a) { return l.filter ? l.filter(a) : a.visible && !(!w && a.directTouch) && g(a.options.enableMouseTracking, !0) && !a.noSharedTooltip }), z.forEach(function (a) { var d = L(a.points, function (b) { return b.x === h.x && !b.isNull }); v(d) && (a.chart.isBoosting && (d = a.getPoint(d)), k.push(d)) })) :
                        k.push(h)); l = { hoverPoint: h }; E(this, "afterGetHoverData", l); return { hoverPoint: l.hoverPoint, hoverSeries: e, hoverPoints: k }
            }; p.prototype.getPointFromEvent = function (c) { c = c.target; for (var e; c && !e;)e = c.point, c = c.parentNode; return e }; p.prototype.onTrackerMouseOut = function (c) { c = c.relatedTarget || c.toElement; var e = this.chart.hoverSeries; this.isDirectTouch = !1; if (!(!e || !c || e.stickyTracking || this.inClass(c, "highcharts-tooltip") || this.inClass(c, "highcharts-series-" + e.index) && this.inClass(c, "highcharts-tracker"))) e.onMouseOut() };
            p.prototype.inClass = function (c, e) { for (var a; c;) { if (a = n(c, "class")) { if (-1 !== a.indexOf(e)) return !0; if (-1 !== a.indexOf("highcharts-container")) return !1 } c = c.parentNode } }; p.prototype.init = function (c, e) { this.options = e; this.chart = c; this.runChartClick = e.chart.events && !!e.chart.events.click; this.pinchDown = []; this.lastValidTouch = {}; r && (c.tooltip = new r(c, e.tooltip), this.followTouchMove = g(e.tooltip.followTouchMove, !0)); this.setDOMEvents() }; p.prototype.normalize = function (c, e) {
                var a = c.touches, h = a ? a.length ? a.item(0) :
                    g(a.changedTouches, c.changedTouches)[0] : c; e || (e = this.getChartPosition()); a = h.pageX - e.left; e = h.pageY - e.top; if (h = this.chart.containerScaling) a /= h.scaleX, e /= h.scaleY; return A(c, { chartX: Math.round(a), chartY: Math.round(e) })
            }; p.prototype.onContainerClick = function (c) {
                var e = this.chart, a = e.hoverPoint; c = this.normalize(c); var h = e.plotLeft, g = e.plotTop; e.cancelClick || (a && this.inClass(c.target, "highcharts-tracker") ? (E(a.series, "click", A(c, { point: a })), e.hoverPoint && a.firePointEvent("click", c)) : (A(c, this.getCoordinates(c)),
                    e.isInsidePlot(c.chartX - h, c.chartY - g) && E(e, "click", c)))
            }; p.prototype.onContainerMouseDown = function (c) { var e = 1 === ((c.buttons || c.button) & 1); c = this.normalize(c); if (f.isFirefox && 0 !== c.button) this.onContainerMouseMove(c); if ("undefined" === typeof c.button || e) this.zoomOption(c), e && c.preventDefault && c.preventDefault(), this.dragStart(c) }; p.prototype.onContainerMouseLeave = function (c) {
                var e = B[g(f.hoverChartIndex, -1)], a = this.chart.tooltip; c = this.normalize(c); e && (c.relatedTarget || c.toElement) && (e.pointer.reset(),
                    e.pointer.chartPosition = void 0); a && !a.isHidden && this.reset()
            }; p.prototype.onContainerMouseEnter = function (c) { delete this.chartPosition }; p.prototype.onContainerMouseMove = function (c) { var e = this.chart; c = this.normalize(c); this.setHoverChartIndex(); c.preventDefault || (c.returnValue = !1); "mousedown" === e.mouseIsDown && this.drag(c); e.openMenu || !this.inClass(c.target, "highcharts-tracker") && !e.isInsidePlot(c.chartX - e.plotLeft, c.chartY - e.plotTop) || this.runPointActions(c) }; p.prototype.onDocumentTouchEnd = function (c) {
            B[f.hoverChartIndex] &&
                B[f.hoverChartIndex].pointer.drop(c)
            }; p.prototype.onContainerTouchMove = function (c) { this.touch(c) }; p.prototype.onContainerTouchStart = function (c) { this.zoomOption(c); this.touch(c, !0) }; p.prototype.onDocumentMouseMove = function (c) { var e = this.chart, a = this.chartPosition; c = this.normalize(c, a); var h = e.tooltip; !a || h && h.isStickyOnContact() || e.isInsidePlot(c.chartX - e.plotLeft, c.chartY - e.plotTop) || this.inClass(c.target, "highcharts-tracker") || this.reset() }; p.prototype.onDocumentMouseUp = function (c) {
                var e = B[g(f.hoverChartIndex,
                    -1)]; e && e.pointer.drop(c)
            }; p.prototype.pinch = function (c) {
                var e = this, a = e.chart, h = e.pinchDown, w = c.touches || [], p = w.length, y = e.lastValidTouch, k = e.hasZoom, z = e.selectionMarker, l = {}, t = 1 === p && (e.inClass(c.target, "highcharts-tracker") && a.runTrackerClick || e.runChartClick), d = {}; 1 < p && (e.initiated = !0); k && e.initiated && !t && c.preventDefault();[].map.call(w, function (b) { return e.normalize(b) }); "touchstart" === c.type ? ([].forEach.call(w, function (b, d) { h[d] = { chartX: b.chartX, chartY: b.chartY } }), y.x = [h[0].chartX, h[1] && h[1].chartX],
                    y.y = [h[0].chartY, h[1] && h[1].chartY], a.axes.forEach(function (b) { if (b.zoomEnabled) { var d = a.bounds[b.horiz ? "h" : "v"], e = b.minPixelPadding, c = b.toPixels(Math.min(g(b.options.min, b.dataMin), b.dataMin)), k = b.toPixels(Math.max(g(b.options.max, b.dataMax), b.dataMax)), h = Math.max(c, k); d.min = Math.min(b.pos, Math.min(c, k) - e); d.max = Math.max(b.pos + b.len, h + e) } }), e.res = !0) : e.followTouchMove && 1 === p ? this.runPointActions(e.normalize(c)) : h.length && (z || (e.selectionMarker = z = A({ destroy: H, touch: !0 }, a.plotBox)), e.pinchTranslate(h,
                        w, l, z, d, y), e.hasPinched = k, e.scaleGroups(l, d), e.res && (e.res = !1, this.reset(!1, 0)))
            }; p.prototype.pinchTranslate = function (c, e, a, g, w, p) { this.zoomHor && this.pinchTranslateDirection(!0, c, e, a, g, w, p); this.zoomVert && this.pinchTranslateDirection(!1, c, e, a, g, w, p) }; p.prototype.pinchTranslateDirection = function (c, e, a, g, w, p, y, k) {
                var h = this.chart, u = c ? "x" : "y", l = c ? "X" : "Y", d = "chart" + l, b = c ? "width" : "height", m = h["plot" + (c ? "Left" : "Top")], t, f, F = k || 1, v = h.inverted, x = h.bounds[c ? "h" : "v"], n = 1 === e.length, q = e[0][d], E = a[0][d], A = !n &&
                    e[1][d], r = !n && a[1][d]; a = function () { "number" === typeof r && 20 < Math.abs(q - A) && (F = k || Math.abs(E - r) / Math.abs(q - A)); f = (m - E) / F + q; t = h["plot" + (c ? "Width" : "Height")] / F }; a(); e = f; if (e < x.min) { e = x.min; var I = !0 } else e + t > x.max && (e = x.max - t, I = !0); I ? (E -= .8 * (E - y[u][0]), "number" === typeof r && (r -= .8 * (r - y[u][1])), a()) : y[u] = [E, r]; v || (p[u] = f - m, p[b] = t); p = v ? 1 / F : F; w[b] = t; w[u] = e; g[v ? c ? "scaleY" : "scaleX" : "scale" + l] = F; g["translate" + l] = p * m + (E - p * q)
            }; p.prototype.reset = function (h, e) {
                var a = this.chart, g = a.hoverSeries, w = a.hoverPoint, p = a.hoverPoints,
                y = a.tooltip, k = y && y.shared ? p : w; h && k && c(k).forEach(function (a) { a.series.isCartesian && "undefined" === typeof a.plotX && (h = !1) }); if (h) y && k && c(k).length && (y.refresh(k), y.shared && p ? p.forEach(function (a) { a.setState(a.state, !0); a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a)) }) : w && (w.setState(w.state, !0), a.axes.forEach(function (a) { a.crosshair && w.series[a.coll] === a && a.drawCrosshair(null, w) }))); else {
                    if (w) w.onMouseOut();
                    p && p.forEach(function (a) { a.setState() }); if (g) g.onMouseOut(); y && y.hide(e); this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()); a.axes.forEach(function (a) { a.hideCrosshair() }); this.hoverX = a.hoverPoints = a.hoverPoint = null
                }
            }; p.prototype.runPointActions = function (c, e) {
                var a = this.chart, h = a.tooltip && a.tooltip.options.enabled ? a.tooltip : void 0, w = h ? h.shared : !1, p = e || a.hoverPoint, y = p && p.series || a.hoverSeries; y = this.getHoverData(p, y, a.series, (!c || "touchmove" !== c.type) && (!!e || y && y.directTouch && this.isDirectTouch),
                    w, c); p = y.hoverPoint; var k = y.hoverPoints; e = (y = y.hoverSeries) && y.tooltipOptions.followPointer; w = w && y && !y.noSharedTooltip; if (p && (p !== a.hoverPoint || h && h.isHidden)) {
                        (a.hoverPoints || []).forEach(function (a) { -1 === k.indexOf(a) && a.setState() }); if (a.hoverSeries !== y) y.onMouseOver(); this.applyInactiveState(k); (k || []).forEach(function (a) { a.setState("hover") }); a.hoverPoint && a.hoverPoint.firePointEvent("mouseOut"); if (!p.series) return; a.hoverPoints = k; a.hoverPoint = p; p.firePointEvent("mouseOver"); h && h.refresh(w ? k : p,
                            c)
                    } else e && h && !h.isHidden && (p = h.getAnchor([{}], c), h.updatePosition({ plotX: p[0], plotY: p[1] })); this.unDocMouseMove || (this.unDocMouseMove = D(a.container.ownerDocument, "mousemove", function (a) { var e = B[f.hoverChartIndex]; if (e) e.pointer.onDocumentMouseMove(a) })); a.axes.forEach(function (e) { var h = g((e.crosshair || {}).snap, !0), u; h && ((u = a.hoverPoint) && u.series[e.coll] === e || (u = L(k, function (d) { return d.series[e.coll] === e }))); u || !h ? e.drawCrosshair(c, u) : e.hideCrosshair() })
            }; p.prototype.scaleGroups = function (c, e) {
                var a =
                    this.chart, h; a.series.forEach(function (g) { h = c || g.getPlotBox(); g.xAxis && g.xAxis.zoomEnabled && g.group && (g.group.attr(h), g.markerGroup && (g.markerGroup.attr(h), g.markerGroup.clip(e ? a.clipRect : null)), g.dataLabelsGroup && g.dataLabelsGroup.attr(h)) }); a.clipRect.attr(e || a.clipBox)
            }; p.prototype.setDOMEvents = function () {
                var c = this.chart.container, e = c.ownerDocument; c.onmousedown = this.onContainerMouseDown.bind(this); c.onmousemove = this.onContainerMouseMove.bind(this); c.onclick = this.onContainerClick.bind(this); this.unbindContainerMouseEnter =
                    D(c, "mouseenter", this.onContainerMouseEnter.bind(this)); this.unbindContainerMouseLeave = D(c, "mouseleave", this.onContainerMouseLeave.bind(this)); f.unbindDocumentMouseUp || (f.unbindDocumentMouseUp = D(e, "mouseup", this.onDocumentMouseUp.bind(this))); f.hasTouch && (D(c, "touchstart", this.onContainerTouchStart.bind(this)), D(c, "touchmove", this.onContainerTouchMove.bind(this)), f.unbindDocumentTouchEnd || (f.unbindDocumentTouchEnd = D(e, "touchend", this.onDocumentTouchEnd.bind(this))))
            }; p.prototype.setHoverChartIndex =
                function () { var c = this.chart, e = f.charts[g(f.hoverChartIndex, -1)]; if (e && e !== c) e.pointer.onContainerMouseLeave({ relatedTarget: !0 }); e && e.mouseIsDown || (f.hoverChartIndex = c.index) }; p.prototype.touch = function (c, e) {
                    var a = this.chart, h; this.setHoverChartIndex(); if (1 === c.touches.length) if (c = this.normalize(c), (h = a.isInsidePlot(c.chartX - a.plotLeft, c.chartY - a.plotTop)) && !a.openMenu) {
                        e && this.runPointActions(c); if ("touchmove" === c.type) {
                            e = this.pinchDown; var p = e[0] ? 4 <= Math.sqrt(Math.pow(e[0].chartX - c.chartX, 2) + Math.pow(e[0].chartY -
                                c.chartY, 2)) : !1
                        } g(p, !0) && this.pinch(c)
                    } else e && this.reset(); else 2 === c.touches.length && this.pinch(c)
                }; p.prototype.zoomOption = function (c) { var e = this.chart, a = e.options.chart, h = a.zoomType || ""; e = e.inverted; /touch/.test(c.type) && (h = g(a.pinchType, h)); this.zoomX = c = /x/.test(h); this.zoomY = h = /y/.test(h); this.zoomHor = c && !e || h && e; this.zoomVert = h && !e || c && e; this.hasZoom = c || h }; return p
        }(); return f.Pointer = q
    }); N(r, "Core/MSPointer.js", [r["Core/Globals.js"], r["Core/Pointer.js"], r["Core/Utilities.js"]], function (q, f,
        r) {
            function C() { var l = []; l.item = function (l) { return this[l] }; A(E, function (f) { l.push({ pageX: f.pageX, pageY: f.pageY, target: f.target }) }); return l } function G(l, f, t, g) { "touch" !== l.pointerType && l.pointerType !== l.MSPOINTER_TYPE_TOUCH || !H[q.hoverChartIndex] || (g(l), g = H[q.hoverChartIndex].pointer, g[f]({ type: t, target: l.currentTarget, preventDefault: n, touches: C() })) } var B = this && this.__extends || function () {
                var l = function (f, t) {
                    l = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (g, c) { g.__proto__ = c } || function (g,
                        c) { for (var p in c) c.hasOwnProperty(p) && (g[p] = c[p]) }; return l(f, t)
                }; return function (f, t) { function g() { this.constructor = f } l(f, t); f.prototype = null === t ? Object.create(t) : (g.prototype = t.prototype, new g) }
            }(), H = q.charts, D = q.doc, n = q.noop, I = r.addEvent, M = r.css, A = r.objectEach, L = r.removeEvent, E = {}, l = !!q.win.PointerEvent; return function (f) {
                function v() { return null !== f && f.apply(this, arguments) || this } B(v, f); v.prototype.batchMSEvents = function (t) {
                    t(this.chart.container, l ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    t(this.chart.container, l ? "pointermove" : "MSPointerMove", this.onContainerPointerMove); t(D, l ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }; v.prototype.destroy = function () { this.batchMSEvents(L); f.prototype.destroy.call(this) }; v.prototype.init = function (l, g) { f.prototype.init.call(this, l, g); this.hasZoom && M(l.container, { "-ms-touch-action": "none", "touch-action": "none" }) }; v.prototype.onContainerPointerDown = function (l) {
                    G(l, "onContainerTouchStart", "touchstart", function (g) {
                    E[g.pointerId] = {
                        pageX: g.pageX,
                        pageY: g.pageY, target: g.currentTarget
                    }
                    })
                }; v.prototype.onContainerPointerMove = function (l) { G(l, "onContainerTouchMove", "touchmove", function (g) { E[g.pointerId] = { pageX: g.pageX, pageY: g.pageY }; E[g.pointerId].target || (E[g.pointerId].target = g.currentTarget) }) }; v.prototype.onDocumentPointerUp = function (l) { G(l, "onDocumentTouchEnd", "touchend", function (g) { delete E[g.pointerId] }) }; v.prototype.setDOMEvents = function () { f.prototype.setDOMEvents.call(this); (this.hasZoom || this.followTouchMove) && this.batchMSEvents(I) }; return v
            }(f)
    });
    N(r, "Core/Legend.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
        var r = f.addEvent, C = f.animObject, G = f.css, B = f.defined, H = f.discardElement, D = f.find, n = f.fireEvent, I = f.format, M = f.isNumber, A = f.merge, L = f.pick, E = f.relativeLength, l = f.setAnimation, v = f.stableSort, x = f.syncTimeout; f = f.wrap; var t = q.isFirefox, g = q.marginNames, c = q.win, p = function () {
            function c(e, a) {
            this.allItems = []; this.contentGroup = this.box = void 0; this.display = !1; this.group = void 0; this.offsetWidth = this.maxLegendWidth = this.maxItemWidth =
                this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0; this.options = {}; this.padding = 0; this.pages = []; this.proximate = !1; this.scrollGroup = void 0; this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0; this.chart = e; this.init(e, a)
            } c.prototype.init = function (e, a) {
            this.chart = e; this.setOptions(a); a.enabled && (this.render(), r(this.chart, "endResize", function () { this.legend.positionCheckboxes() }),
                this.proximate ? this.unchartrender = r(this.chart, "render", function () { this.legend.proximatePositions(); this.legend.positionItems() }) : this.unchartrender && this.unchartrender())
            }; c.prototype.setOptions = function (e) {
                var a = L(e.padding, 8); this.options = e; this.chart.styledMode || (this.itemStyle = e.itemStyle, this.itemHiddenStyle = A(this.itemStyle, e.itemHiddenStyle)); this.itemMarginTop = e.itemMarginTop || 0; this.itemMarginBottom = e.itemMarginBottom || 0; this.padding = a; this.initialItemY = a - 5; this.symbolWidth = L(e.symbolWidth,
                    16); this.pages = []; this.proximate = "proximate" === e.layout && !this.chart.inverted; this.baseline = void 0
            }; c.prototype.update = function (e, a) { var c = this.chart; this.setOptions(A(!0, this.options, e)); this.destroy(); c.isDirtyLegend = c.isDirtyBox = !0; L(a, !0) && c.redraw(); n(this, "afterUpdate") }; c.prototype.colorizeItem = function (e, a) {
            e.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"); if (!this.chart.styledMode) {
                var c = this.options, g = e.legendItem, h = e.legendLine, p = e.legendSymbol, k = this.itemHiddenStyle.color;
                c = a ? c.itemStyle.color : k; var z = a ? e.color || k : k, l = e.options && e.options.marker, t = { fill: z }; g && g.css({ fill: c, color: c }); h && h.attr({ stroke: z }); p && (l && p.isMarker && (t = e.pointAttribs(), a || (t.stroke = t.fill = k)), p.attr(t))
            } n(this, "afterColorizeItem", { item: e, visible: a })
            }; c.prototype.positionItems = function () { this.allItems.forEach(this.positionItem, this); this.chart.isResizing || this.positionCheckboxes() }; c.prototype.positionItem = function (e) {
                var a = this, c = this.options, g = c.symbolPadding, h = !c.rtl, p = e._legendItemPos; c =
                    p[0]; p = p[1]; var k = e.checkbox, z = e.legendGroup; z && z.element && (g = { translateX: h ? c : this.legendWidth - c - 2 * g - 4, translateY: p }, h = function () { n(a, "afterPositionItem", { item: e }) }, B(z.translateY) ? z.animate(g, void 0, h) : (z.attr(g), h())); k && (k.x = c, k.y = p)
            }; c.prototype.destroyItem = function (e) { var a = e.checkbox;["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (a) { e[a] && (e[a] = e[a].destroy()) }); a && H(e.checkbox) }; c.prototype.destroy = function () {
                function e(a) { this[a] && (this[a] = this[a].destroy()) } this.getAllItems().forEach(function (a) {
                    ["legendItem",
                        "legendGroup"].forEach(e, a)
                }); "clipRect up down pager nav box title group".split(" ").forEach(e, this); this.display = null
            }; c.prototype.positionCheckboxes = function () { var e = this.group && this.group.alignAttr, a = this.clipHeight || this.legendHeight, c = this.titleHeight; if (e) { var g = e.translateY; this.allItems.forEach(function (h) { var p = h.checkbox; if (p) { var k = g + c + p.y + (this.scrollOffset || 0) + 3; G(p, { left: e.translateX + h.checkboxOffset + p.x - 20 + "px", top: k + "px", display: this.proximate || k > g - 6 && k < g + a - 6 ? "" : "none" }) } }, this) } };
            c.prototype.renderTitle = function () { var e = this.options, a = this.padding, c = e.title, g = 0; c.text && (this.title || (this.title = this.chart.renderer.label(c.text, a - 3, a - 4, null, null, null, e.useHTML, null, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(c.style), this.title.add(this.group)), c.width || this.title.css({ width: this.maxLegendWidth + "px" }), e = this.title.getBBox(), g = e.height, this.offsetWidth = e.width, this.contentGroup.attr({ translateY: g })); this.titleHeight = g }; c.prototype.setText = function (e) {
                var a =
                    this.options; e.legendItem.attr({ text: a.labelFormat ? I(a.labelFormat, e, this.chart) : a.labelFormatter.call(e) })
            }; c.prototype.renderItem = function (e) {
                var a = this.chart, c = a.renderer, g = this.options, h = this.symbolWidth, p = g.symbolPadding, k = this.itemStyle, z = this.itemHiddenStyle, l = "horizontal" === g.layout ? L(g.itemDistance, 20) : 0, t = !g.rtl, d = e.legendItem, b = !e.series, m = !b && e.series.drawLegendSymbol ? e.series : e, f = m.options; f = this.createCheckboxForItem && f && f.showCheckbox; l = h + p + l + (f ? 20 : 0); var v = g.useHTML, x = e.options.className;
                d || (e.legendGroup = c.g("legend-item").addClass("highcharts-" + m.type + "-series highcharts-color-" + e.colorIndex + (x ? " " + x : "") + (b ? " highcharts-series-" + e.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), e.legendItem = d = c.text("", t ? h + p : -p, this.baseline || 0, v), a.styledMode || d.css(A(e.visible ? k : z)), d.attr({ align: t ? "left" : "right", zIndex: 2 }).add(e.legendGroup), this.baseline || (this.fontMetrics = c.fontMetrics(a.styledMode ? 12 : k.fontSize, d), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, d.attr("y", this.baseline)),
                    this.symbolHeight = g.symbolHeight || this.fontMetrics.f, m.drawLegendSymbol(this, e), this.setItemEvents && this.setItemEvents(e, d, v)); f && !e.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(e); this.colorizeItem(e, e.visible); !a.styledMode && k.width || d.css({ width: (g.itemWidth || this.widthOption || a.spacingBox.width) - l + "px" }); this.setText(e); a = d.getBBox(); e.itemWidth = e.checkboxOffset = g.itemWidth || e.legendItemWidth || a.width + l; this.maxItemWidth = Math.max(this.maxItemWidth, e.itemWidth); this.totalItemWidth +=
                        e.itemWidth; this.itemHeight = e.itemHeight = Math.round(e.legendItemHeight || a.height || this.symbolHeight)
            }; c.prototype.layoutItem = function (e) {
                var a = this.options, c = this.padding, g = "horizontal" === a.layout, h = e.itemHeight, p = this.itemMarginBottom, k = this.itemMarginTop, z = g ? L(a.itemDistance, 20) : 0, l = this.maxLegendWidth; a = a.alignColumns && this.totalItemWidth > l ? this.maxItemWidth : e.itemWidth; g && this.itemX - c + a > l && (this.itemX = c, this.lastLineHeight && (this.itemY += k + this.lastLineHeight + p), this.lastLineHeight = 0); this.lastItemY =
                    k + this.itemY + p; this.lastLineHeight = Math.max(h, this.lastLineHeight); e._legendItemPos = [this.itemX, this.itemY]; g ? this.itemX += a : (this.itemY += k + h + p, this.lastLineHeight = h); this.offsetWidth = this.widthOption || Math.max((g ? this.itemX - c - (e.checkbox ? 0 : z) : a) + c, this.offsetWidth)
            }; c.prototype.getAllItems = function () {
                var e = []; this.chart.series.forEach(function (a) { var c = a && a.options; a && L(c.showInLegend, B(c.linkedTo) ? !1 : void 0, !0) && (e = e.concat(a.legendItems || ("point" === c.legendType ? a.data : a))) }); n(this, "afterGetAllItems",
                    { allItems: e }); return e
            }; c.prototype.getAlignment = function () { var e = this.options; return this.proximate ? e.align.charAt(0) + "tv" : e.floating ? "" : e.align.charAt(0) + e.verticalAlign.charAt(0) + e.layout.charAt(0) }; c.prototype.adjustMargins = function (e, a) {
                var c = this.chart, h = this.options, p = this.getAlignment(); p && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (u, k) {
                    u.test(p) && !B(e[k]) && (c[g[k]] = Math.max(c[g[k]], c.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] * h[k % 2 ? "x" :
                        "y"] + L(h.margin, 12) + a[k] + (c.titleOffset[k] || 0)))
                })
            }; c.prototype.proximatePositions = function () {
                var e = this.chart, a = [], c = "left" === this.options.align; this.allItems.forEach(function (g) {
                    var h; var p = c; if (g.yAxis) {
                        g.xAxis.options.reversed && (p = !p); g.points && (h = D(p ? g.points : g.points.slice(0).reverse(), function (a) { return M(a.plotY) })); p = this.itemMarginTop + g.legendItem.getBBox().height + this.itemMarginBottom; var k = g.yAxis.top - e.plotTop; g.visible ? (h = h ? h.plotY : g.yAxis.height, h += k - .3 * p) : h = k + g.yAxis.height; a.push({
                            target: h,
                            size: p, item: g
                        })
                    }
                }, this); q.distribute(a, e.plotHeight); a.forEach(function (a) { a.item._legendItemPos[1] = e.plotTop - e.spacing[0] + a.pos })
            }; c.prototype.render = function () {
                var e = this.chart, a = e.renderer, c = this.group, g = this.box, h = this.options, p = this.padding; this.itemX = p; this.itemY = this.initialItemY; this.lastItemY = this.offsetWidth = 0; this.widthOption = E(h.width, e.spacingBox.width - p); var k = e.spacingBox.width - 2 * p - h.x; -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (k /= 2); this.maxLegendWidth = this.widthOption ||
                    k; c || (this.group = c = a.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = a.g().attr({ zIndex: 1 }).add(c), this.scrollGroup = a.g().add(this.contentGroup)); this.renderTitle(); var z = this.getAllItems(); v(z, function (a, d) { return (a.options && a.options.legendIndex || 0) - (d.options && d.options.legendIndex || 0) }); h.reversed && z.reverse(); this.allItems = z; this.display = k = !!z.length; this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0; z.forEach(this.renderItem, this); z.forEach(this.layoutItem, this);
                z = (this.widthOption || this.offsetWidth) + p; var l = this.lastItemY + this.lastLineHeight + this.titleHeight; l = this.handleOverflow(l); l += p; g || (this.box = g = a.rect().addClass("highcharts-legend-box").attr({ r: h.borderRadius }).add(c), g.isNew = !0); e.styledMode || g.attr({ stroke: h.borderColor, "stroke-width": h.borderWidth || 0, fill: h.backgroundColor || "none" }).shadow(h.shadow); 0 < z && 0 < l && (g[g.isNew ? "attr" : "animate"](g.crisp.call({}, { x: 0, y: 0, width: z, height: l }, g.strokeWidth())), g.isNew = !1); g[k ? "show" : "hide"](); e.styledMode &&
                    "none" === c.getStyle("display") && (z = l = 0); this.legendWidth = z; this.legendHeight = l; k && this.align(); this.proximate || this.positionItems(); n(this, "afterRender")
            }; c.prototype.align = function (e) {
            void 0 === e && (e = this.chart.spacingBox); var a = this.chart, c = this.options, g = e.y; /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? g += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a.titleOffset[2] && (g -= a.titleOffset[2]); g !== e.y && (e = A(e, { y: g })); this.group.align(A(c, {
                width: this.legendWidth, height: this.legendHeight,
                verticalAlign: this.proximate ? "top" : c.verticalAlign
            }), !0, e)
            }; c.prototype.handleOverflow = function (e) {
                var a = this, c = this.chart, g = c.renderer, h = this.options, p = h.y, k = this.padding; p = c.spacingBox.height + ("top" === h.verticalAlign ? -p : p) - k; var z = h.maxHeight, l, t = this.clipRect, d = h.navigation, b = L(d.animation, !0), m = d.arrowSize || 12, f = this.nav, v = this.pages, x, n = this.allItems, q = function (b) {
                    "number" === typeof b ? t.attr({ height: b }) : t && (a.clipRect = t.destroy(), a.contentGroup.clip()); a.contentGroup.div && (a.contentGroup.div.style.clip =
                        b ? "rect(" + k + "px,9999px," + (k + b) + "px,0)" : "auto")
                }, E = function (b) { a[b] = g.circle(0, 0, 1.3 * m).translate(m / 2, m / 2).add(f); c.styledMode || a[b].attr("fill", "rgba(0,0,0,0.0001)"); return a[b] }; "horizontal" !== h.layout || "middle" === h.verticalAlign || h.floating || (p /= 2); z && (p = Math.min(p, z)); v.length = 0; e > p && !1 !== d.enabled ? (this.clipHeight = l = Math.max(p - 20 - this.titleHeight - k, 0), this.currentPage = L(this.currentPage, 1), this.fullHeight = e, n.forEach(function (b, d) {
                    var a = b._legendItemPos[1], e = Math.round(b.legendItem.getBBox().height),
                    c = v.length; if (!c || a - v[c - 1] > l && (x || a) !== v[c - 1]) v.push(x || a), c++; b.pageIx = c - 1; x && (n[d - 1].pageIx = c - 1); d === n.length - 1 && a + e - v[c - 1] > l && a !== x && (v.push(a), b.pageIx = c); a !== x && (x = a)
                }), t || (t = a.clipRect = g.clipRect(0, k, 9999, 0), a.contentGroup.clip(t)), q(l), f || (this.nav = f = g.g().attr({ zIndex: 1 }).add(this.group), this.up = g.symbol("triangle", 0, 0, m, m).add(f), E("upTracker").on("click", function () { a.scroll(-1, b) }), this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation"), c.styledMode || this.pager.css(d.style),
                    this.pager.add(f), this.down = g.symbol("triangle-down", 0, 0, m, m).add(f), E("downTracker").on("click", function () { a.scroll(1, b) })), a.scroll(0), e = p) : f && (q(), this.nav = f.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0); return e
            }; c.prototype.scroll = function (e, a) {
                var c = this, g = this.chart, h = this.pages, p = h.length, k = this.currentPage + e; e = this.clipHeight; var z = this.options.navigation, t = this.pager, f = this.padding; k > p && (k = p); 0 < k && ("undefined" !== typeof a && l(a, g), this.nav.attr({
                    translateX: f, translateY: e +
                        this.padding + 7 + this.titleHeight, visibility: "visible"
                }), [this.up, this.upTracker].forEach(function (d) { d.attr({ "class": 1 === k ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }), t.attr({ text: k + "/" + p }), [this.down, this.downTracker].forEach(function (d) { d.attr({ x: 18 + this.pager.getBBox().width, "class": k === p ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }, this), g.styledMode || (this.up.attr({ fill: 1 === k ? z.inactiveColor : z.activeColor }), this.upTracker.css({
                    cursor: 1 === k ? "default" :
                        "pointer"
                }), this.down.attr({ fill: k === p ? z.inactiveColor : z.activeColor }), this.downTracker.css({ cursor: k === p ? "default" : "pointer" })), this.scrollOffset = -h[k - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = k, this.positionCheckboxes(), a = C(L(a, g.renderer.globalAnimation, !0)), x(function () { n(c, "afterScroll", { currentPage: k }) }, a.duration))
            }; return c
        }(); (/Trident\/7\.0/.test(c.navigator && c.navigator.userAgent) || t) && f(p.prototype, "positionItem", function (c, e) {
            var a =
                this, g = function () { e._legendItemPos && c.call(a, e) }; g(); a.bubbleLegend || setTimeout(g)
        }); q.Legend = p; return q.Legend
    }); N(r, "Core/Chart/Chart.js", [r["Core/Axis/Axis.js"], r["Core/Globals.js"], r["Core/Legend.js"], r["Core/MSPointer.js"], r["Core/Options.js"], r["Core/Pointer.js"], r["Core/Time.js"], r["Core/Utilities.js"]], function (q, f, r, C, G, B, H, D) {
        var n = f.charts, I = f.doc, M = f.seriesTypes, A = f.win, L = G.defaultOptions, E = D.addEvent, l = D.animate, v = D.animObject, x = D.attr, t = D.createElement, g = D.css, c = D.defined, p = D.discardElement,
        h = D.erase, e = D.error, a = D.extend, u = D.find, w = D.fireEvent, F = D.getStyle, y = D.isArray, k = D.isFunction, z = D.isNumber, O = D.isObject, K = D.isString, d = D.merge, b = D.numberFormat, m = D.objectEach, J = D.pick, P = D.pInt, Q = D.relativeLength, Y = D.removeEvent, V = D.setAnimation, Z = D.splat, W = D.syncTimeout, aa = D.uniqueKey, ba = f.marginNames, X = function () {
            function G(b, d, a) {
            this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = this.series = this.renderTo = this.renderer = this.pointer =
                this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0; this.getArgs(b, d, a)
            } G.prototype.getArgs = function (b, d, a) { K(b) || b.nodeName ? (this.renderTo = b, this.init(d, a)) : this.init(b, d) }; G.prototype.init = function (a, e) {
                var c, g = a.series, h = a.plotOptions ||
                    {}; w(this, "init", { args: arguments }, function () {
                    a.series = null; c = d(L, a); var p = c.chart || {}; m(c.plotOptions, function (b, a) { O(b) && (b.tooltip = h[a] && d(h[a].tooltip) || void 0) }); c.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip; c.series = a.series = g; this.userOptions = a; var u = p.events; this.margin = []; this.spacing = []; this.bounds = { h: {}, v: {} }; this.labelCollectors = []; this.callback = e; this.isResizing = 0; this.options = c; this.axes = []; this.series = []; this.time = a.time && Object.keys(a.time).length ?
                        new H(a.time) : f.time; this.numberFormatter = p.numberFormatter || b; this.styledMode = p.styledMode; this.hasCartesianSeries = p.showAxes; var z = this; z.index = n.length; n.push(z); f.chartCount++; u && m(u, function (b, d) { k(b) && E(z, d, b) }); z.xAxis = []; z.yAxis = []; z.pointCount = z.colorCounter = z.symbolCounter = 0; w(z, "afterInit"); z.firstRender()
                    })
            }; G.prototype.initSeries = function (b) { var d = this.options.chart; d = b.type || d.type || d.defaultSeriesType; var a = M[d]; a || e(17, !0, this, { missingModuleFor: d }); d = new a; d.init(this, b); return d };
            G.prototype.setSeriesData = function () { this.getSeriesOrderByLinks().forEach(function (b) { b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1) }) }; G.prototype.getSeriesOrderByLinks = function () { return this.series.concat().sort(function (b, d) { return b.linkedSeries.length || d.linkedSeries.length ? d.linkedSeries.length - b.linkedSeries.length : 0 }) }; G.prototype.orderSeries = function (b) { var d = this.series; for (b = b || 0; b < d.length; b++)d[b] && (d[b].index = b, d[b].name = d[b].getName()) }; G.prototype.isInsidePlot =
                function (b, d, a) { var c = a ? d : b; b = a ? b : d; c = { x: c, y: b, isInsidePlot: 0 <= c && c <= this.plotWidth && 0 <= b && b <= this.plotHeight }; w(this, "afterIsInsidePlot", c); return c.isInsidePlot }; G.prototype.redraw = function (b) {
                    w(this, "beforeRedraw"); var d = this, c = d.axes, e = d.series, m = d.pointer, k = d.legend, g = d.userOptions.legend, h = d.isDirtyLegend, p = d.hasCartesianSeries, u = d.isDirtyBox, l = d.renderer, y = l.isHidden(), t = []; d.setResponsive && d.setResponsive(!1); V(d.hasRendered ? b : !1, d); y && d.temporaryDisplay(); d.layOutTitles(); for (b = e.length; b--;) {
                        var f =
                            e[b]; if (f.options.stacking) { var v = !0; if (f.isDirty) { var J = !0; break } }
                    } if (J) for (b = e.length; b--;)f = e[b], f.options.stacking && (f.isDirty = !0); e.forEach(function (b) { b.isDirty && ("point" === b.options.legendType ? (b.updateTotals && b.updateTotals(), h = !0) : g && (g.labelFormatter || g.labelFormat) && (h = !0)); b.isDirtyData && w(b, "updatedData") }); h && k && k.options.enabled && (k.render(), d.isDirtyLegend = !1); v && d.getStacks(); p && c.forEach(function (b) { d.isResizing && z(b.min) || (b.updateNames(), b.setScale()) }); d.getMargins(); p && (c.forEach(function (b) {
                    b.isDirty &&
                        (u = !0)
                    }), c.forEach(function (b) { var d = b.min + "," + b.max; b.extKey !== d && (b.extKey = d, t.push(function () { w(b, "afterSetExtremes", a(b.eventArgs, b.getExtremes())); delete b.eventArgs })); (u || v) && b.redraw() })); u && d.drawChartBox(); w(d, "predraw"); e.forEach(function (b) { (u || b.isDirty) && b.visible && b.redraw(); b.isDirtyData = !1 }); m && m.reset(!0); l.draw(); w(d, "redraw"); w(d, "render"); y && d.temporaryDisplay(!0); t.forEach(function (b) { b.call() })
                }; G.prototype.get = function (b) {
                    function d(d) {
                        return d.id === b || d.options && d.options.id ===
                            b
                    } var a = this.series, c; var e = u(this.axes, d) || u(this.series, d); for (c = 0; !e && c < a.length; c++)e = u(a[c].points || [], d); return e
                }; G.prototype.getAxes = function () { var b = this, d = this.options, a = d.xAxis = Z(d.xAxis || {}); d = d.yAxis = Z(d.yAxis || {}); w(this, "getAxes"); a.forEach(function (b, d) { b.index = d; b.isX = !0 }); d.forEach(function (b, d) { b.index = d }); a.concat(d).forEach(function (d) { new q(b, d) }); w(this, "afterGetAxes") }; G.prototype.getSelectedPoints = function () {
                    var b = []; this.series.forEach(function (d) {
                        b = b.concat(d.getPointsCollection().filter(function (b) {
                            return J(b.selectedStaging,
                                b.selected)
                        }))
                    }); return b
                }; G.prototype.getSelectedSeries = function () { return this.series.filter(function (b) { return b.selected }) }; G.prototype.setTitle = function (b, d, a) { this.applyDescription("title", b); this.applyDescription("subtitle", d); this.applyDescription("caption", void 0); this.layOutTitles(a) }; G.prototype.applyDescription = function (b, a) {
                    var c = this, e = "title" === b ? { color: "#333333", fontSize: this.options.isStock ? "16px" : "18px" } : { color: "#666666" }; e = this.options[b] = d(!this.styledMode && { style: e }, this.options[b],
                        a); var m = this[b]; m && a && (this[b] = m = m.destroy()); e && !m && (m = this.renderer.text(e.text, 0, 0, e.useHTML).attr({ align: e.align, "class": "highcharts-" + b, zIndex: e.zIndex || 4 }).add(), m.update = function (d) { c[{ title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }[b]](d) }, this.styledMode || m.css(e.style), this[b] = m)
                }; G.prototype.layOutTitles = function (b) {
                    var d = [0, 0, 0], c = this.renderer, e = this.spacingBox;["title", "subtitle", "caption"].forEach(function (b) {
                        var m = this[b], k = this.options[b], g = k.verticalAlign || "top"; b =
                            "title" === b ? -3 : "top" === g ? d[0] + 2 : 0; if (m) { if (!this.styledMode) var h = k.style.fontSize; h = c.fontMetrics(h, m).b; m.css({ width: (k.width || e.width + (k.widthAdjust || 0)) + "px" }); var p = Math.round(m.getBBox(k.useHTML).height); m.align(a({ y: "bottom" === g ? h : b + h, height: p }, k), !1, "spacingBox"); k.floating || ("top" === g ? d[0] = Math.ceil(d[0] + p) : "bottom" === g && (d[2] = Math.ceil(d[2] + p))) }
                    }, this); d[0] && "top" === (this.options.title.verticalAlign || "top") && (d[0] += this.options.title.margin); d[2] && "bottom" === this.options.caption.verticalAlign &&
                        (d[2] += this.options.caption.margin); var m = !this.titleOffset || this.titleOffset.join(",") !== d.join(","); this.titleOffset = d; w(this, "afterLayOutTitles"); !this.isDirtyBox && m && (this.isDirtyBox = this.isDirtyLegend = m, this.hasRendered && J(b, !0) && this.isDirtyBox && this.redraw())
                }; G.prototype.getChartSize = function () {
                    var b = this.options.chart, d = b.width; b = b.height; var a = this.renderTo; c(d) || (this.containerWidth = F(a, "width")); c(b) || (this.containerHeight = F(a, "height")); this.chartWidth = Math.max(0, d || this.containerWidth ||
                        600); this.chartHeight = Math.max(0, Q(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                }; G.prototype.temporaryDisplay = function (b) {
                    var d = this.renderTo; if (b) for (; d && d.style;)d.hcOrigStyle && (g(d, d.hcOrigStyle), delete d.hcOrigStyle), d.hcOrigDetached && (I.body.removeChild(d), d.hcOrigDetached = !1), d = d.parentNode; else for (; d && d.style;) {
                        I.body.contains(d) || d.parentNode || (d.hcOrigDetached = !0, I.body.appendChild(d)); if ("none" === F(d, "display", !1) || d.hcOricDetached) d.hcOrigStyle = {
                            display: d.style.display,
                            height: d.style.height, overflow: d.style.overflow
                        }, b = { display: "block", overflow: "hidden" }, d !== this.renderTo && (b.height = 0), g(d, b), d.offsetWidth || d.style.setProperty("display", "block", "important"); d = d.parentNode; if (d === I.body) break
                    }
                }; G.prototype.setClassName = function (b) { this.container.className = "highcharts-container " + (b || "") }; G.prototype.getContainer = function () {
                    var b = this.options, d = b.chart; var c = this.renderTo; var m = aa(), k, h; c || (this.renderTo = c = d.renderTo); K(c) && (this.renderTo = c = I.getElementById(c)); c ||
                        e(13, !0, this); var p = P(x(c, "data-highcharts-chart")); z(p) && n[p] && n[p].hasRendered && n[p].destroy(); x(c, "data-highcharts-chart", this.index); c.innerHTML = ""; d.skipClone || c.offsetWidth || this.temporaryDisplay(); this.getChartSize(); p = this.chartWidth; var u = this.chartHeight; g(c, { overflow: "hidden" }); this.styledMode || (k = a({ position: "relative", overflow: "hidden", width: p + "px", height: u + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none" }, d.style)); this.container =
                            c = t("div", { id: m }, k, c); this._cursor = c.style.cursor; this.renderer = new (f[d.renderer] || f.Renderer)(c, p, u, null, d.forExport, b.exporting && b.exporting.allowHTML, this.styledMode); V(void 0, this); this.setClassName(d.className); if (this.styledMode) for (h in b.defs) this.renderer.definition(b.defs[h]); else this.renderer.setStyle(d.style); this.renderer.chartIndex = this.index; w(this, "afterGetContainer")
                }; G.prototype.getMargins = function (b) {
                    var d = this.spacing, a = this.margin, e = this.titleOffset; this.resetMargins(); e[0] &&
                        !c(a[0]) && (this.plotTop = Math.max(this.plotTop, e[0] + d[0])); e[2] && !c(a[2]) && (this.marginBottom = Math.max(this.marginBottom, e[2] + d[2])); this.legend && this.legend.display && this.legend.adjustMargins(a, d); w(this, "getMargins"); b || this.getAxisMargins()
                }; G.prototype.getAxisMargins = function () {
                    var b = this, d = b.axisOffset = [0, 0, 0, 0], a = b.colorAxis, e = b.margin, m = function (b) { b.forEach(function (b) { b.visible && b.getOffset() }) }; b.hasCartesianSeries ? m(b.axes) : a && a.length && m(a); ba.forEach(function (a, m) { c(e[m]) || (b[a] += d[m]) });
                    b.setChartSize()
                }; G.prototype.reflow = function (b) { var d = this, a = d.options.chart, e = d.renderTo, m = c(a.width) && c(a.height), k = a.width || F(e, "width"); a = a.height || F(e, "height"); e = b ? b.target : A; if (!m && !d.isPrinting && k && a && (e === A || e === I)) { if (k !== d.containerWidth || a !== d.containerHeight) D.clearTimeout(d.reflowTimeout), d.reflowTimeout = W(function () { d.container && d.setSize(void 0, void 0, !1) }, b ? 100 : 0); d.containerWidth = k; d.containerHeight = a } }; G.prototype.setReflow = function (b) {
                    var d = this; !1 === b || this.unbindReflow ? !1 ===
                        b && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = E(A, "resize", function (b) { d.options && d.reflow(b) }), E(this, "destroy", this.unbindReflow))
                }; G.prototype.setSize = function (b, d, a) {
                    var c = this, e = c.renderer; c.isResizing += 1; V(a, c); a = e.globalAnimation; c.oldChartHeight = c.chartHeight; c.oldChartWidth = c.chartWidth; "undefined" !== typeof b && (c.options.chart.width = b); "undefined" !== typeof d && (c.options.chart.height = d); c.getChartSize(); c.styledMode || (a ? l : g)(c.container, {
                        width: c.chartWidth +
                            "px", height: c.chartHeight + "px"
                    }, a); c.setChartSize(!0); e.setSize(c.chartWidth, c.chartHeight, a); c.axes.forEach(function (b) { b.isDirty = !0; b.setScale() }); c.isDirtyLegend = !0; c.isDirtyBox = !0; c.layOutTitles(); c.getMargins(); c.redraw(a); c.oldChartHeight = null; w(c, "resize"); W(function () { c && w(c, "endResize", null, function () { --c.isResizing }) }, v(a).duration)
                }; G.prototype.setChartSize = function (b) {
                    var d = this.inverted, a = this.renderer, c = this.chartWidth, e = this.chartHeight, m = this.options.chart, k = this.spacing, g = this.clipOffset,
                    h, p, u, z; this.plotLeft = h = Math.round(this.plotLeft); this.plotTop = p = Math.round(this.plotTop); this.plotWidth = u = Math.max(0, Math.round(c - h - this.marginRight)); this.plotHeight = z = Math.max(0, Math.round(e - p - this.marginBottom)); this.plotSizeX = d ? z : u; this.plotSizeY = d ? u : z; this.plotBorderWidth = m.plotBorderWidth || 0; this.spacingBox = a.spacingBox = { x: k[3], y: k[0], width: c - k[3] - k[1], height: e - k[0] - k[2] }; this.plotBox = a.plotBox = { x: h, y: p, width: u, height: z }; c = 2 * Math.floor(this.plotBorderWidth / 2); d = Math.ceil(Math.max(c, g[3]) / 2);
                    a = Math.ceil(Math.max(c, g[0]) / 2); this.clipBox = { x: d, y: a, width: Math.floor(this.plotSizeX - Math.max(c, g[1]) / 2 - d), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(c, g[2]) / 2 - a)) }; b || this.axes.forEach(function (b) { b.setAxisSize(); b.setAxisTranslation() }); w(this, "afterSetChartSize", { skipAxes: b })
                }; G.prototype.resetMargins = function () {
                    w(this, "resetMargins"); var b = this, d = b.options.chart;["margin", "spacing"].forEach(function (a) {
                        var c = d[a], e = O(c) ? c : [c, c, c, c];["Top", "Right", "Bottom", "Left"].forEach(function (c,
                            m) { b[a][m] = J(d[a + c], e[m]) })
                    }); ba.forEach(function (d, a) { b[d] = J(b.margin[a], b.spacing[a]) }); b.axisOffset = [0, 0, 0, 0]; b.clipOffset = [0, 0, 0, 0]
                }; G.prototype.drawChartBox = function () {
                    var b = this.options.chart, d = this.renderer, a = this.chartWidth, c = this.chartHeight, e = this.chartBackground, m = this.plotBackground, k = this.plotBorder, g = this.styledMode, h = this.plotBGImage, p = b.backgroundColor, u = b.plotBackgroundColor, z = b.plotBackgroundImage, l, y = this.plotLeft, f = this.plotTop, t = this.plotWidth, v = this.plotHeight, J = this.plotBox,
                    K = this.clipRect, x = this.clipBox, F = "animate"; e || (this.chartBackground = e = d.rect().addClass("highcharts-background").add(), F = "attr"); if (g) var n = l = e.strokeWidth(); else { n = b.borderWidth || 0; l = n + (b.shadow ? 8 : 0); p = { fill: p || "none" }; if (n || e["stroke-width"]) p.stroke = b.borderColor, p["stroke-width"] = n; e.attr(p).shadow(b.shadow) } e[F]({ x: l / 2, y: l / 2, width: a - l - n % 2, height: c - l - n % 2, r: b.borderRadius }); F = "animate"; m || (F = "attr", this.plotBackground = m = d.rect().addClass("highcharts-plot-background").add()); m[F](J); g || (m.attr({
                        fill: u ||
                            "none"
                    }).shadow(b.plotShadow), z && (h ? (z !== h.attr("href") && h.attr("href", z), h.animate(J)) : this.plotBGImage = d.image(z, y, f, t, v).add())); K ? K.animate({ width: x.width, height: x.height }) : this.clipRect = d.clipRect(x); F = "animate"; k || (F = "attr", this.plotBorder = k = d.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()); g || k.attr({ stroke: b.plotBorderColor, "stroke-width": b.plotBorderWidth || 0, fill: "none" }); k[F](k.crisp({ x: y, y: f, width: t, height: v }, -k.strokeWidth())); this.isDirtyBox = !1; w(this, "afterDrawChartBox")
                };
            G.prototype.propFromSeries = function () { var b = this, d = b.options.chart, a, c = b.options.series, e, m;["inverted", "angular", "polar"].forEach(function (k) { a = M[d.type || d.defaultSeriesType]; m = d[k] || a && a.prototype[k]; for (e = c && c.length; !m && e--;)(a = M[c[e].type]) && a.prototype[k] && (m = !0); b[k] = m }) }; G.prototype.linkSeries = function () {
                var b = this, d = b.series; d.forEach(function (b) { b.linkedSeries.length = 0 }); d.forEach(function (d) {
                    var a = d.options.linkedTo; K(a) && (a = ":previous" === a ? b.series[d.index - 1] : b.get(a)) && a.linkedParent !==
                        d && (a.linkedSeries.push(d), d.linkedParent = a, a.enabledDataSorting && d.setDataSortingOptions(), d.visible = J(d.options.visible, a.options.visible, d.visible))
                }); w(this, "afterLinkSeries")
            }; G.prototype.renderSeries = function () { this.series.forEach(function (b) { b.translate(); b.render() }) }; G.prototype.renderLabels = function () {
                var b = this, d = b.options.labels; d.items && d.items.forEach(function (c) {
                    var e = a(d.style, c.style), m = P(e.left) + b.plotLeft, k = P(e.top) + b.plotTop + 12; delete e.left; delete e.top; b.renderer.text(c.html,
                        m, k).attr({ zIndex: 2 }).css(e).add()
                })
            }; G.prototype.render = function () {
                var b = this.axes, d = this.colorAxis, a = this.renderer, c = this.options, e = 0, m = function (b) { b.forEach(function (b) { b.visible && b.render() }) }; this.setTitle(); this.legend = new r(this, c.legend); this.getStacks && this.getStacks(); this.getMargins(!0); this.setChartSize(); c = this.plotWidth; b.some(function (b) { if (b.horiz && b.visible && b.options.labels.enabled && b.series.length) return e = 21, !0 }); var k = this.plotHeight = Math.max(this.plotHeight - e, 0); b.forEach(function (b) { b.setScale() });
                this.getAxisMargins(); var g = 1.1 < c / this.plotWidth; var h = 1.05 < k / this.plotHeight; if (g || h) b.forEach(function (b) { (b.horiz && g || !b.horiz && h) && b.setTickInterval(!0) }), this.getMargins(); this.drawChartBox(); this.hasCartesianSeries ? m(b) : d && d.length && m(d); this.seriesGroup || (this.seriesGroup = a.g("series-group").attr({ zIndex: 3 }).add()); this.renderSeries(); this.renderLabels(); this.addCredits(); this.setResponsive && this.setResponsive(); this.updateContainerScaling(); this.hasRendered = !0
            }; G.prototype.addCredits = function (b) {
                var a =
                    this, c = d(!0, this.options.credits, b); c.enabled && !this.credits && (this.credits = this.renderer.text(c.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () { c.href && (A.location.href = c.href) }).attr({ align: c.position.align, zIndex: 8 }), a.styledMode || this.credits.css(c.style), this.credits.add().align(c.position), this.credits.update = function (b) { a.credits = a.credits.destroy(); a.addCredits(b) })
            }; G.prototype.updateContainerScaling = function () {
                var b = this.container; if (2 < b.offsetWidth &&
                    2 < b.offsetHeight && b.getBoundingClientRect) { var d = b.getBoundingClientRect(), a = d.width / b.offsetWidth; b = d.height / b.offsetHeight; 1 !== a || 1 !== b ? this.containerScaling = { scaleX: a, scaleY: b } : delete this.containerScaling }
            }; G.prototype.destroy = function () {
                var b = this, d = b.axes, a = b.series, c = b.container, e, k = c && c.parentNode; w(b, "destroy"); b.renderer.forExport ? h(n, b) : n[b.index] = void 0; f.chartCount--; b.renderTo.removeAttribute("data-highcharts-chart"); Y(b); for (e = d.length; e--;)d[e] = d[e].destroy(); this.scroller && this.scroller.destroy &&
                    this.scroller.destroy(); for (e = a.length; e--;)a[e] = a[e].destroy(); "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (d) { var a = b[d]; a && a.destroy && (b[d] = a.destroy()) }); c && (c.innerHTML = "", Y(c), k && p(c)); m(b, function (d, a) { delete b[a] })
            }; G.prototype.firstRender = function () {
                var b = this, d = b.options; if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer(); b.resetMargins();
                    b.setChartSize(); b.propFromSeries(); b.getAxes(); (y(d.series) ? d.series : []).forEach(function (d) { b.initSeries(d) }); b.linkSeries(); b.setSeriesData(); w(b, "beforeRender"); B && (b.pointer = f.hasTouch || !A.PointerEvent && !A.MSPointerEvent ? new B(b, d) : new C(b, d)); b.render(); if (!b.renderer.imgCount && !b.hasLoaded) b.onload(); b.temporaryDisplay(!0)
                }
            }; G.prototype.onload = function () {
                this.callbacks.concat([this.callback]).forEach(function (b) { b && "undefined" !== typeof this.index && b.apply(this, [this]) }, this); w(this, "load");
                w(this, "render"); c(this.index) && this.setReflow(this.options.chart.reflow); this.hasLoaded = !0
            }; return G
        }(); X.prototype.callbacks = []; f.chart = function (b, d, a) { return new X(b, d, a) }; return f.Chart = X
    }); N(r, "Extensions/ScrollablePlotArea.js", [r["Core/Chart/Chart.js"], r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f, r) {
        var C = r.addEvent, G = r.createElement, B = r.pick, H = r.stop; ""; C(q, "afterSetChartSize", function (q) {
            var n = this.options.chart.scrollablePlotArea, r = n && n.minWidth; n = n && n.minHeight; if (!this.renderer.forExport) {
                if (r) {
                    if (this.scrollablePixelsX =
                        r = Math.max(0, r - this.chartWidth)) { this.plotWidth += r; this.inverted ? (this.clipBox.height += r, this.plotBox.height += r) : (this.clipBox.width += r, this.plotBox.width += r); var B = { 1: { name: "right", value: r } } }
                } else n && (this.scrollablePixelsY = r = Math.max(0, n - this.chartHeight)) && (this.plotHeight += r, this.inverted ? (this.clipBox.width += r, this.plotBox.width += r) : (this.clipBox.height += r, this.plotBox.height += r), B = { 2: { name: "bottom", value: r } }); B && !q.skipAxes && this.axes.forEach(function (n) {
                    B[n.side] ? n.getPlotLinePath = function () {
                        var q =
                            B[n.side].name, r = this[q]; this[q] = r - B[n.side].value; var l = f.Axis.prototype.getPlotLinePath.apply(this, arguments); this[q] = r; return l
                    } : (n.setAxisSize(), n.setAxisTranslation())
                })
            }
        }); C(q, "render", function () { this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed() }); q.prototype.setUpScrolling = function () {
            var f = this, n = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" }; this.scrollablePixelsX && (n.overflowX =
                "auto"); this.scrollablePixelsY && (n.overflowY = "auto"); this.scrollingParent = G("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, this.renderTo); this.scrollingContainer = G("div", { className: "highcharts-scrolling" }, n, this.scrollingParent); C(this.scrollingContainer, "scroll", function () { f.pointer && delete f.pointer.chartPosition }); this.innerContainer = G("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer); this.innerContainer.appendChild(this.container); this.setUpScrolling =
                    null
        }; q.prototype.moveFixedElements = function () {
            var f = this.container, n = this.fixedRenderer, q = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "), r; this.scrollablePixelsX && !this.inverted ? r = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? r = ".highcharts-xaxis" :
                this.scrollablePixelsY && !this.inverted ? r = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (r = ".highcharts-yaxis"); q.push(r, r + "-labels"); q.forEach(function (q) { [].forEach.call(f.querySelectorAll(q), function (f) { (f.namespaceURI === n.SVG_NS ? n.box : n.box.parentNode).appendChild(f); f.style.pointerEvents = "auto" }) })
        }; q.prototype.applyFixed = function () {
            var q, n, r = !this.fixedDiv, M = this.options.chart.scrollablePlotArea; r ? (this.fixedDiv = G("div", { className: "highcharts-fixed" }, {
                position: "absolute", overflow: "hidden",
                pointerEvents: "none", zIndex: 2, top: 0
            }, null, !0), null === (q = this.scrollingContainer) || void 0 === q ? void 0 : q.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = q = new f.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight, null === (n = this.options.chart) || void 0 === n ? void 0 : n.style), this.scrollableMask = q.path().attr({ fill: this.options.chart.backgroundColor || "#fff", "fill-opacity": B(M.opacity, .85), zIndex: -1 }).addClass("highcharts-scrollable-mask").add(),
                this.moveFixedElements(), C(this, "afterShowResetZoom", this.moveFixedElements), C(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight); n = this.chartWidth + (this.scrollablePixelsX || 0); q = this.chartHeight + (this.scrollablePixelsY || 0); H(this.container); this.container.style.width = n + "px"; this.container.style.height = q + "px"; this.renderer.boxWrapper.attr({ width: n, height: q, viewBox: [0, 0, n, q].join(" ") }); this.chartBackground.attr({ width: n, height: q }); this.scrollingContainer.style.height =
                    this.chartHeight + "px"; r && (M.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * M.scrollPositionX), M.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * M.scrollPositionY)); q = this.axisOffset; r = this.plotTop - q[0] - 1; M = this.plotLeft - q[3] - 1; n = this.plotTop + this.plotHeight + q[2] + 1; q = this.plotLeft + this.plotWidth + q[1] + 1; var A = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0), L = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0); r = this.scrollablePixelsX ?
                        [["M", 0, r], ["L", this.plotLeft - 1, r], ["L", this.plotLeft - 1, n], ["L", 0, n], ["Z"], ["M", A, r], ["L", this.chartWidth, r], ["L", this.chartWidth, n], ["L", A, n], ["Z"]] : this.scrollablePixelsY ? [["M", M, 0], ["L", M, this.plotTop - 1], ["L", q, this.plotTop - 1], ["L", q, 0], ["Z"], ["M", M, L], ["L", M, this.chartHeight], ["L", q, this.chartHeight], ["L", q, L], ["Z"]] : [["M", 0, 0]]; "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: r })
        }
    }); N(r, "Core/Axis/StackingAxis.js", [r["Core/Utilities.js"]], function (q) {
        var f = q.addEvent, r = q.destroyObjectProperties,
        C = q.fireEvent, G = q.getDeferredAnimation, B = q.objectEach, H = q.pick, D = function () {
            function f(f) { this.oldStacks = {}; this.stacks = {}; this.stacksTouched = 0; this.axis = f } f.prototype.buildStacks = function () { var f = this.axis, n = f.series, q = H(f.options.reversedStacks, !0), r = n.length, E; if (!f.isXAxis) { this.usePercentage = !1; for (E = r; E--;) { var l = n[q ? E : r - E - 1]; l.setStackedPoints(); l.setGroupedPoints() } for (E = 0; E < r; E++)n[E].modifyStacks(); C(f, "afterBuildStacks") } }; f.prototype.cleanStacks = function () {
                if (!this.axis.isXAxis) {
                    if (this.oldStacks) var f =
                        this.stacks = this.oldStacks; B(f, function (f) { B(f, function (f) { f.cumulative = f.total }) })
                }
            }; f.prototype.resetStacks = function () { var f = this, n = f.stacks; f.axis.isXAxis || B(n, function (n) { B(n, function (q, r) { q.touched < f.stacksTouched ? (q.destroy(), delete n[r]) : (q.total = null, q.cumulative = null) }) }) }; f.prototype.renderStackTotals = function () {
                var f = this.axis, n = f.chart, q = n.renderer, r = this.stacks; f = G(n, f.options.stackLabels.animation); var E = this.stackTotalGroup = this.stackTotalGroup || q.g("stack-labels").attr({
                    visibility: "visible",
                    zIndex: 6, opacity: 0
                }).add(); E.translate(n.plotLeft, n.plotTop); B(r, function (l) { B(l, function (l) { l.render(E) }) }); E.animate({ opacity: 1 }, f)
            }; return f
        }(); return function () { function n() { } n.compose = function (q) { f(q, "init", n.onInit); f(q, "destroy", n.onDestroy) }; n.onDestroy = function () { var f = this.stacking; if (f) { var n = f.stacks; B(n, function (f, q) { r(f); n[q] = null }); f && f.stackTotalGroup && f.stackTotalGroup.destroy() } }; n.onInit = function () { this.stacking || (this.stacking = new D(this)) }; return n }()
    }); N(r, "Mixins/LegendSymbol.js",
        [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
            var r = f.merge, C = f.pick; return q.LegendSymbolMixin = {
                drawRectangle: function (f, q) { var r = f.symbolHeight, B = f.options.squareSymbol; q.legendSymbol = this.chart.renderer.rect(B ? (f.symbolWidth - r) / 2 : 0, f.baseline - r + 1, B ? r : f.symbolWidth, r, C(f.options.symbolRadius, r / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(q.legendGroup) }, drawLineMarker: function (f) {
                    var q = this.options, H = q.marker, D = f.symbolWidth, n = f.symbolHeight, I = n / 2, G = this.chart.renderer, A =
                        this.legendGroup; f = f.baseline - Math.round(.3 * f.fontMetrics.b); var L = {}; this.chart.styledMode || (L = { "stroke-width": q.lineWidth || 0 }, q.dashStyle && (L.dashstyle = q.dashStyle)); this.legendLine = G.path([["M", 0, f], ["L", D, f]]).addClass("highcharts-graph").attr(L).add(A); H && !1 !== H.enabled && D && (q = Math.min(C(H.radius, I), I), 0 === this.symbol.indexOf("url") && (H = r(H, { width: n, height: n }), q = 0), this.legendSymbol = H = G.symbol(this.symbol, D / 2 - q, f - q, 2 * q, 2 * q, H).addClass("highcharts-point").add(A), H.isMarker = !0)
                }
            }
        }); N(r, "Core/Series/Point.js",
            [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
                var r = f.animObject, C = f.defined, G = f.erase, B = f.extend, H = f.fireEvent, D = f.format, n = f.getNestedProperty, I = f.isArray, M = f.isNumber, A = f.isObject, L = f.syncTimeout, E = f.pick, l = f.removeEvent, v = f.uniqueKey; ""; f = function () {
                    function f() { this.colorIndex = this.category = void 0; this.formatPrefix = "point"; this.id = void 0; this.isNull = !1; this.percentage = this.options = this.name = void 0; this.selected = !1; this.total = this.series = void 0; this.visible = !0; this.x = void 0 } f.prototype.animateBeforeDestroy =
                        function () { var l = this, g = { x: l.startXPos, opacity: 0 }, c, p = l.getGraphicalProps(); p.singular.forEach(function (h) { c = "dataLabel" === h; l[h] = l[h].animate(c ? { x: l[h].startXPos, y: l[h].startYPos, opacity: 0 } : g) }); p.plural.forEach(function (c) { l[c].forEach(function (c) { c.element && c.animate(B({ x: l.startXPos }, c.startYPos ? { x: c.startXPos, y: c.startYPos } : {})) }) }) }; f.prototype.applyOptions = function (l, g) {
                            var c = this.series, p = c.options.pointValKey || c.pointValKey; l = f.prototype.optionsToObject.call(this, l); B(this, l); this.options =
                                this.options ? B(this.options, l) : l; l.group && delete this.group; l.dataLabels && delete this.dataLabels; p && (this.y = f.prototype.getNestedProperty.call(this, p)); this.formatPrefix = (this.isNull = E(this.isValid && !this.isValid(), null === this.x || !M(this.y))) ? "null" : "point"; this.selected && (this.state = "select"); "name" in this && "undefined" === typeof g && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this)); "undefined" === typeof this.x && c && (this.x = "undefined" === typeof g ? c.autoIncrement(this) : g); return this
                        }; f.prototype.destroy =
                            function () { function f() { if (g.graphic || g.dataLabel || g.dataLabels) l(g), g.destroyElements(); for (a in g) g[a] = null } var g = this, c = g.series, p = c.chart; c = c.options.dataSorting; var h = p.hoverPoints, e = r(g.series.chart.renderer.globalAnimation), a; g.legendItem && p.legend.destroyItem(g); h && (g.setState(), G(h, g), h.length || (p.hoverPoints = null)); if (g === p.hoverPoint) g.onMouseOut(); c && c.enabled ? (this.animateBeforeDestroy(), L(f, e.duration)) : f(); p.pointCount-- }; f.prototype.destroyElements = function (l) {
                                var g = this; l = g.getGraphicalProps(l);
                                l.singular.forEach(function (c) { g[c] = g[c].destroy() }); l.plural.forEach(function (c) { g[c].forEach(function (c) { c.element && c.destroy() }); delete g[c] })
                            }; f.prototype.firePointEvent = function (l, g, c) { var p = this, h = this.series.options; (h.point.events[l] || p.options && p.options.events && p.options.events[l]) && p.importEvents(); "click" === l && h.allowPointSelect && (c = function (c) { p.select && p.select(null, c.ctrlKey || c.metaKey || c.shiftKey) }); H(p, l, g, c) }; f.prototype.getClassName = function () {
                                return "highcharts-point" + (this.selected ?
                                    " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                            }; f.prototype.getGraphicalProps = function (l) {
                                var g = this, c = [], p, h = { singular: [], plural: [] }; l = l || { graphic: 1, dataLabel: 1 }; l.graphic && c.push("graphic", "shadowGroup");
                                l.dataLabel && c.push("dataLabel", "dataLabelUpper", "connector"); for (p = c.length; p--;) { var e = c[p]; g[e] && h.singular.push(e) } ["dataLabel", "connector"].forEach(function (a) { var c = a + "s"; l[a] && g[c] && h.plural.push(c) }); return h
                            }; f.prototype.getLabelConfig = function () { return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal } }; f.prototype.getNestedProperty = function (l) {
                                if (l) return 0 ===
                                    l.indexOf("custom.") ? n(l, this.options) : this[l]
                            }; f.prototype.getZone = function () { var l = this.series, g = l.zones; l = l.zoneAxis || "y"; var c = 0, p; for (p = g[c]; this[l] >= p.value;)p = g[++c]; this.nonZonedColor || (this.nonZonedColor = this.color); this.color = p && p.color && !this.options.color ? p.color : this.nonZonedColor; return p }; f.prototype.hasNewShapeType = function () { return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType }; f.prototype.init = function (l, g, c) {
                            this.series = l; this.applyOptions(g,
                                c); this.id = C(this.id) ? this.id : v(); this.resolveColor(); l.chart.pointCount++; H(this, "afterInit"); return this
                            }; f.prototype.optionsToObject = function (l) {
                                var g = {}, c = this.series, p = c.options.keys, h = p || c.pointArrayMap || ["y"], e = h.length, a = 0, u = 0; if (M(l) || null === l) g[h[0]] = l; else if (I(l)) for (!p && l.length > e && (c = typeof l[0], "string" === c ? g.name = l[0] : "number" === c && (g.x = l[0]), a++); u < e;)p && "undefined" === typeof l[a] || (0 < h[u].indexOf(".") ? f.prototype.setNestedProperty(g, l[a], h[u]) : g[h[u]] = l[a]), a++, u++; else "object" ===
                                    typeof l && (g = l, l.dataLabels && (c._hasPointLabels = !0), l.marker && (c._hasPointMarkers = !0)); return g
                            }; f.prototype.resolveColor = function () {
                                var l = this.series; var g = l.chart.options.chart.colorCount; var c = l.chart.styledMode; delete this.nonZonedColor; c || this.options.color || (this.color = l.color); l.options.colorByPoint ? (c || (g = l.options.colors || l.chart.options.colors, this.color = this.color || g[l.colorCounter], g = g.length), c = l.colorCounter, l.colorCounter++, l.colorCounter === g && (l.colorCounter = 0)) : c = l.colorIndex; this.colorIndex =
                                    E(this.colorIndex, c)
                            }; f.prototype.setNestedProperty = function (l, g, c) { c.split(".").reduce(function (c, h, e, a) { c[h] = a.length - 1 === e ? g : A(c[h], !0) ? c[h] : {}; return c[h] }, l); return l }; f.prototype.tooltipFormatter = function (l) {
                                var g = this.series, c = g.tooltipOptions, p = E(c.valueDecimals, ""), h = c.valuePrefix || "", e = c.valueSuffix || ""; g.chart.styledMode && (l = g.chart.tooltip.styledModeFormat(l)); (g.pointArrayMap || ["y"]).forEach(function (a) {
                                    a = "{point." + a; if (h || e) l = l.replace(RegExp(a + "}", "g"), h + a + "}" + e); l = l.replace(RegExp(a +
                                        "}", "g"), a + ":,." + p + "f}")
                                }); return D(l, { point: this, series: this.series }, g.chart)
                            }; return f
                }(); return q.Point = f
            }); N(r, "Core/Series/Series.js", [r["Core/Globals.js"], r["Mixins/LegendSymbol.js"], r["Core/Options.js"], r["Core/Series/Point.js"], r["Core/Renderer/SVG/SVGElement.js"], r["Core/Utilities.js"]], function (q, f, r, C, G, B) {
                var H = r.defaultOptions, D = B.addEvent, n = B.animObject, I = B.arrayMax, M = B.arrayMin, A = B.clamp, L = B.correctFloat, E = B.defined, l = B.erase, v = B.error, x = B.extend, t = B.find, g = B.fireEvent, c = B.getNestedProperty,
                p = B.isArray, h = B.isFunction, e = B.isNumber, a = B.isString, u = B.merge, w = B.objectEach, F = B.pick, y = B.removeEvent; r = B.seriesType; var k = B.splat, z = B.syncTimeout; ""; var O = q.seriesTypes, K = q.win; q.Series = r("line", null, {
                    lineWidth: 2, allowPointSelect: !1, crisp: !0, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: {
                        enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: {
                            normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: {
                                fillColor: "#cccccc", lineColor: "#000000",
                                lineWidth: 2
                            }
                        }
                    }, point: { events: {} }, dataLabels: { animation: {}, align: "center", defer: !0, formatter: function () { var d = this.series.chart.numberFormatter; return "number" !== typeof this.y ? "" : d(this.y, -1) }, padding: 5, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: !0, states: {
                        normal: { animation: !0 }, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { animation: { duration: 0 } },
                        inactive: { animation: { duration: 50 }, opacity: .2 }
                    }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x"
                }, {
                    axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, cropShoulder: 1, directTouch: !1, isCartesian: !0, parallelArrays: ["x", "y"], pointClass: C, requireSorting: !0, sorted: !0, init: function (d, b) {
                        g(this, "init", { options: b }); var a = this, c = d.series, e; this.eventOptions = this.eventOptions || {}; this.eventsToUnbind = []; a.chart = d; a.options = b = a.setOptions(b); a.linkedSeries = []; a.bindAxes(); x(a, {
                            name: b.name, state: "",
                            visible: !1 !== b.visible, selected: !0 === b.selected
                        }); var k = b.events; w(k, function (b, d) { h(b) && a.eventOptions[d] !== b && (h(a.eventOptions[d]) && y(a, d, a.eventOptions[d]), a.eventOptions[d] = b, D(a, d, b)) }); if (k && k.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) d.runTrackerClick = !0; a.getColor(); a.getSymbol(); a.parallelArrays.forEach(function (b) { a[b + "Data"] || (a[b + "Data"] = []) }); a.isCartesian && (d.hasCartesianSeries = !0); c.length && (e = c[c.length - 1]); a._i = F(e && e._i, -1) + 1; a.opacity = a.options.opacity;
                        d.orderSeries(this.insert(c)); b.dataSorting && b.dataSorting.enabled ? a.setDataSortingOptions() : a.points || a.data || a.setData(b.data, !1); g(this, "afterInit")
                    }, is: function (d) { return O[d] && this instanceof O[d] }, insert: function (d) { var b = this.options.index, a; if (e(b)) { for (a = d.length; a--;)if (b >= F(d[a].options.index, d[a]._i)) { d.splice(a + 1, 0, this); break } -1 === a && d.unshift(this); a += 1 } else d.push(this); return F(a, d.length - 1) }, bindAxes: function () {
                        var d = this, b = d.options, a = d.chart, c; g(this, "bindAxes", null, function () {
                            (d.axisTypes ||
                                []).forEach(function (e) { a[e].forEach(function (a) { c = a.options; if (b[e] === c.index || "undefined" !== typeof b[e] && b[e] === c.id || "undefined" === typeof b[e] && 0 === c.index) d.insert(a.series), d[e] = a, a.isDirty = !0 }); d[e] || d.optionalAxis === e || v(18, !0, a) })
                        }); g(this, "afterBindAxes")
                    }, updateParallelArrays: function (d, b) { var a = d.series, c = arguments, k = e(b) ? function (c) { var e = "y" === c && a.toYData ? a.toYData(d) : d[c]; a[c + "Data"][b] = e } : function (d) { Array.prototype[b].apply(a[d + "Data"], Array.prototype.slice.call(c, 2)) }; a.parallelArrays.forEach(k) },
                    hasData: function () { return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length }, autoIncrement: function () {
                        var d = this.options, b = this.xIncrement, a, c = d.pointIntervalUnit, e = this.chart.time; b = F(b, d.pointStart, 0); this.pointInterval = a = F(this.pointInterval, d.pointInterval, 1); c && (d = new e.Date(b), "day" === c ? e.set("Date", d, e.get("Date", d) + a) : "month" === c ? e.set("Month", d, e.get("Month", d) + a) : "year" === c && e.set("FullYear", d, e.get("FullYear",
                            d) + a), a = d.getTime() - b); this.xIncrement = b + a; return b
                    }, setDataSortingOptions: function () { var d = this.options; x(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 }); E(d.pointRange) || (d.pointRange = 1) }, setOptions: function (d) {
                        var b = this.chart, a = b.options, c = a.plotOptions, e = b.userOptions || {}; d = u(d); b = b.styledMode; var k = { plotOptions: c, userOptions: d }; g(this, "setOptions", k); var h = k.plotOptions[this.type], p = e.plotOptions || {}; this.userOptions = k.userOptions; e = u(h, c.series, e.plotOptions && e.plotOptions[this.type],
                            d); this.tooltipOptions = u(H.tooltip, H.plotOptions.series && H.plotOptions.series.tooltip, H.plotOptions[this.type].tooltip, a.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, d.tooltip); this.stickyTracking = F(d.stickyTracking, p[this.type] && p[this.type].stickyTracking, p.series && p.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking); null === h.marker && delete e.marker; this.zoneAxis = e.zoneAxis; a = this.zones = (e.zones || []).slice(); !e.negativeColor && !e.negativeFillColor ||
                                e.zones || (c = { value: e[this.zoneAxis + "Threshold"] || e.threshold || 0, className: "highcharts-negative" }, b || (c.color = e.negativeColor, c.fillColor = e.negativeFillColor), a.push(c)); a.length && E(a[a.length - 1].value) && a.push(b ? {} : { color: this.color, fillColor: this.fillColor }); g(this, "afterSetOptions", { options: e }); return e
                    }, getName: function () { return F(this.options.name, "Series " + (this.index + 1)) }, getCyclic: function (d, b, a) {
                        var c = this.chart, e = this.userOptions, k = d + "Index", m = d + "Counter", g = a ? a.length : F(c.options.chart[d +
                            "Count"], c[d + "Count"]); if (!b) { var h = F(e[k], e["_" + k]); E(h) || (c.series.length || (c[m] = 0), e["_" + k] = h = c[m] % g, c[m] += 1); a && (b = a[h]) } "undefined" !== typeof h && (this[k] = h); this[d] = b
                    }, getColor: function () { this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || H.plotOptions[this.type].color, this.chart.options.colors) }, getPointsCollection: function () { return (this.hasGroupedData ? this.points : this.data) || [] }, getSymbol: function () {
                        this.getCyclic("symbol",
                            this.options.marker.symbol, this.chart.options.symbols)
                    }, findPointIndex: function (d, b) {
                        var a = d.id, c = d.x, k = this.points, g, h = this.options.dataSorting; if (a) var p = this.chart.get(a); else if (this.linkedParent || this.enabledDataSorting) { var l = h && h.matchByName ? "name" : "index"; p = t(k, function (b) { return !b.touched && b[l] === d[l] }); if (!p) return } if (p) { var z = p && p.index; "undefined" !== typeof z && (g = !0) } "undefined" === typeof z && e(c) && (z = this.xData.indexOf(c, b)); -1 !== z && "undefined" !== typeof z && this.cropped && (z = z >= this.cropStart ?
                            z - this.cropStart : z); !g && k[z] && k[z].touched && (z = void 0); return z
                    }, drawLegendSymbol: f.drawLineMarker, updateData: function (d, b) {
                        var a = this.options, c = a.dataSorting, k = this.points, g = [], h, p, l, z = this.requireSorting, u = d.length === k.length, f = !0; this.xIncrement = null; d.forEach(function (b, d) {
                            var m = E(b) && this.pointClass.prototype.optionsToObject.call({ series: this }, b) || {}; var p = m.x; if (m.id || e(p)) {
                                if (p = this.findPointIndex(m, l), -1 === p || "undefined" === typeof p ? g.push(b) : k[p] && b !== a.data[p] ? (k[p].update(b, !1, null, !1),
                                    k[p].touched = !0, z && (l = p + 1)) : k[p] && (k[p].touched = !0), !u || d !== p || c && c.enabled || this.hasDerivedData) h = !0
                            } else g.push(b)
                        }, this); if (h) for (d = k.length; d--;)(p = k[d]) && !p.touched && p.remove && p.remove(!1, b); else !u || c && c.enabled ? f = !1 : (d.forEach(function (b, d) { k[d].update && b !== k[d].y && k[d].update(b, !1, null, !1) }), g.length = 0); k.forEach(function (b) { b && (b.touched = !1) }); if (!f) return !1; g.forEach(function (b) { this.addPoint(b, !1, null, null, !1) }, this); null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement =
                            I(this.xData), this.autoIncrement()); return !0
                    }, setData: function (d, b, c, k) {
                        var m = this, g = m.points, h = g && g.length || 0, l, z = m.options, u = m.chart, f = z.dataSorting, w = null, y = m.xAxis; w = z.turboThreshold; var t = this.xData, K = this.yData, n = (l = m.pointArrayMap) && l.length, J = z.keys, x = 0, q = 1, O; d = d || []; l = d.length; b = F(b, !0); f && f.enabled && (d = this.sortData(d)); !1 !== k && l && h && !m.cropped && !m.hasGroupedData && m.visible && !m.isSeriesBoosting && (O = this.updateData(d, c)); if (!O) {
                        m.xIncrement = null; m.colorCounter = 0; this.parallelArrays.forEach(function (b) {
                            m[b +
                            "Data"].length = 0
                        }); if (w && l > w) if (w = m.getFirstValidPoint(d), e(w)) for (c = 0; c < l; c++)t[c] = this.autoIncrement(), K[c] = d[c]; else if (p(w)) if (n) for (c = 0; c < l; c++)k = d[c], t[c] = k[0], K[c] = k.slice(1, n + 1); else for (J && (x = J.indexOf("x"), q = J.indexOf("y"), x = 0 <= x ? x : 0, q = 0 <= q ? q : 1), c = 0; c < l; c++)k = d[c], t[c] = k[x], K[c] = k[q]; else v(12, !1, u); else for (c = 0; c < l; c++)"undefined" !== typeof d[c] && (k = { series: m }, m.pointClass.prototype.applyOptions.apply(k, [d[c]]), m.updateParallelArrays(k, c)); K && a(K[0]) && v(14, !0, u); m.data = []; m.options.data =
                            m.userOptions.data = d; for (c = h; c--;)g[c] && g[c].destroy && g[c].destroy(); y && (y.minRange = y.userMinRange); m.isDirty = u.isDirtyBox = !0; m.isDirtyData = !!g; c = !1
                        } "point" === z.legendType && (this.processData(), this.generatePoints()); b && u.redraw(c)
                    }, sortData: function (d) {
                        var b = this, a = b.options.dataSorting.sortKey || "y", e = function (b, d) { return E(d) && b.pointClass.prototype.optionsToObject.call({ series: b }, d) || {} }; d.forEach(function (a, c) { d[c] = e(b, a); d[c].index = c }, this); d.concat().sort(function (b, d) {
                            b = c(a, b); d = c(a, d); return d <
                                b ? -1 : d > b ? 1 : 0
                        }).forEach(function (b, d) { b.x = d }, this); b.linkedSeries && b.linkedSeries.forEach(function (b) { var a = b.options, c = a.data; a.dataSorting && a.dataSorting.enabled || !c || (c.forEach(function (a, k) { c[k] = e(b, a); d[k] && (c[k].x = d[k].x, c[k].index = k) }), b.setData(c, !1)) }); return d
                    }, getProcessedData: function (d) {
                        var b = this.xData, a = this.yData, c = b.length; var e = 0; var k = this.xAxis, g = this.options; var h = g.cropThreshold; var p = d || this.getExtremesFromAll || g.getExtremesFromAll, l = this.isCartesian; d = k && k.val2lin; g = !(!k || !k.logarithmic);
                        var z = this.requireSorting; if (k) { k = k.getExtremes(); var u = k.min; var f = k.max } if (l && this.sorted && !p && (!h || c > h || this.forceCrop)) if (b[c - 1] < u || b[0] > f) b = [], a = []; else if (this.yData && (b[0] < u || b[c - 1] > f)) { e = this.cropData(this.xData, this.yData, u, f); b = e.xData; a = e.yData; e = e.start; var w = !0 } for (h = b.length || 1; --h;)if (c = g ? d(b[h]) - d(b[h - 1]) : b[h] - b[h - 1], 0 < c && ("undefined" === typeof y || c < y)) var y = c; else 0 > c && z && (v(15, !1, this.chart), z = !1); return { xData: b, yData: a, cropped: w, cropStart: e, closestPointRange: y }
                    }, processData: function (d) {
                        var b =
                            this.xAxis; if (this.isCartesian && !this.isDirty && !b.isDirty && !this.yAxis.isDirty && !d) return !1; d = this.getProcessedData(); this.cropped = d.cropped; this.cropStart = d.cropStart; this.processedXData = d.xData; this.processedYData = d.yData; this.closestPointRange = this.basePointRange = d.closestPointRange
                    }, cropData: function (d, b, a, c, e) {
                        var k = d.length, m = 0, g = k, h; e = F(e, this.cropShoulder); for (h = 0; h < k; h++)if (d[h] >= a) { m = Math.max(0, h - e); break } for (a = h; a < k; a++)if (d[a] > c) { g = a + e; break } return {
                            xData: d.slice(m, g), yData: b.slice(m, g),
                            start: m, end: g
                        }
                    }, generatePoints: function () {
                        var d = this.options, b = d.data, a = this.data, c, e = this.processedXData, h = this.processedYData, p = this.pointClass, l = e.length, z = this.cropStart || 0, u = this.hasGroupedData; d = d.keys; var f = [], w; a || u || (a = [], a.length = b.length, a = this.data = a); d && u && (this.options.keys = !1); for (w = 0; w < l; w++) {
                            var y = z + w; if (u) { var v = (new p).init(this, [e[w]].concat(k(h[w]))); v.dataGroup = this.groupMap[w]; v.dataGroup.options && (v.options = v.dataGroup.options, x(v, v.dataGroup.options), delete v.dataLabels) } else (v =
                                a[y]) || "undefined" === typeof b[y] || (a[y] = v = (new p).init(this, b[y], e[w])); v && (v.index = y, f[w] = v)
                        } this.options.keys = d; if (a && (l !== (c = a.length) || u)) for (w = 0; w < c; w++)w !== z || u || (w += l), a[w] && (a[w].destroyElements(), a[w].plotX = void 0); this.data = a; this.points = f; g(this, "afterGeneratePoints")
                    }, getXExtremes: function (d) { return { min: M(d), max: I(d) } }, getExtremes: function (d, b) {
                        var a = this.xAxis, c = this.yAxis, k = this.processedXData || this.xData, h = [], l = 0, z = 0; var u = 0; var f = this.requireSorting ? this.cropShoulder : 0, w = c ? c.positiveValuesOnly :
                            !1, y; d = d || this.stackedYData || this.processedYData || []; c = d.length; a && (u = a.getExtremes(), z = u.min, u = u.max); for (y = 0; y < c; y++) { var v = k[y]; var t = d[y]; var K = (e(t) || p(t)) && (t.length || 0 < t || !w); v = b || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !a || (k[y + f] || v) >= z && (k[y - f] || v) <= u; if (K && v) if (K = t.length) for (; K--;)e(t[K]) && (h[l++] = t[K]); else h[l++] = t } d = { dataMin: M(h), dataMax: I(h) }; g(this, "afterGetExtremes", { dataExtremes: d }); return d
                    }, applyExtremes: function () {
                        var d = this.getExtremes(); this.dataMin =
                            d.dataMin; this.dataMax = d.dataMax; return d
                    }, getFirstValidPoint: function (d) { for (var b = null, a = d.length, c = 0; null === b && c < a;)b = d[c], c++; return b }, translate: function () {
                    this.processedXData || this.processData(); this.generatePoints(); var d = this.options, b = d.stacking, a = this.xAxis, c = a.categories, k = this.enabledDataSorting, h = this.yAxis, l = this.points, z = l.length, u = !!this.modifyValue, f, w = this.pointPlacementToXValue(), y = !!w, v = d.threshold, t = d.startFromThreshold ? v : 0, K, n = this.zoneAxis || "y", x = Number.MAX_VALUE; for (f = 0; f <
                        z; f++) {
                            var q = l[f], O = q.x, r = q.y, B = q.low, I = b && h.stacking && h.stacking.stacks[(this.negStacks && r < (t ? 0 : v) ? "-" : "") + this.stackKey]; if (h.positiveValuesOnly && !h.validatePositiveValue(r) || a.positiveValuesOnly && !a.validatePositiveValue(O)) q.isNull = !0; q.plotX = K = L(A(a.translate(O, 0, 0, 0, 1, w, "flags" === this.type), -1E5, 1E5)); if (b && this.visible && I && I[O]) { var D = this.getStackIndicator(D, O, this.index); if (!q.isNull) { var H = I[O]; var C = H.points[D.key] } } p(C) && (B = C[0], r = C[1], B === t && D.key === I[O].base && (B = F(e(v) && v, h.min)), h.positiveValuesOnly &&
                                0 >= B && (B = null), q.total = q.stackTotal = H.total, q.percentage = H.total && q.y / H.total * 100, q.stackY = r, this.irregularWidths || H.setOffset(this.pointXOffset || 0, this.barW || 0)); q.yBottom = E(B) ? A(h.translate(B, 0, 1, 0, 1), -1E5, 1E5) : null; u && (r = this.modifyValue(r, q)); q.plotY = "number" === typeof r && Infinity !== r ? A(h.translate(r, 0, 1, 0, 1), -1E5, 1E5) : void 0; q.isInside = this.isPointInside(q); q.clientX = y ? L(a.translate(O, 0, 0, 0, 1, w)) : K; q.negative = q[n] < (d[n + "Threshold"] || v || 0); q.category = c && "undefined" !== typeof c[q.x] ? c[q.x] : q.x; if (!q.isNull &&
                                    !1 !== q.visible) { "undefined" !== typeof G && (x = Math.min(x, Math.abs(K - G))); var G = K } q.zone = this.zones.length && q.getZone(); !q.graphic && this.group && k && (q.isNew = !0)
                    } this.closestPointRangePx = x; g(this, "afterTranslate")
                    }, getValidPoints: function (d, b, a) { var c = this.chart; return (d || this.points || []).filter(function (d) { return b && !c.isInsidePlot(d.plotX, d.plotY, c.inverted) ? !1 : !1 !== d.visible && (a || !d.isNull) }) }, getClipBox: function (d, b) {
                        var a = this.options, c = this.chart, e = c.inverted, k = this.xAxis, g = k && this.yAxis, h = c.options.chart.scrollablePlotArea ||
                            {}; d && !1 === a.clip && g ? d = e ? { y: -c.chartWidth + g.len + g.pos, height: c.chartWidth, width: c.chartHeight, x: -c.chartHeight + k.len + k.pos } : { y: -g.pos, height: c.chartHeight, width: c.chartWidth, x: -k.pos } : (d = this.clipBox || c.clipBox, b && (d.width = c.plotSizeX, d.x = (c.scrollablePixelsX || 0) * (h.scrollPositionX || 0))); return b ? { width: d.width, x: d.x } : d
                    }, setClip: function (d) {
                        var b = this.chart, a = this.options, c = b.renderer, e = b.inverted, k = this.clipBox, g = this.getClipBox(d), h = this.sharedClipKey || ["_sharedClip", d && d.duration, d && d.easing, g.height,
                            a.xAxis, a.yAxis].join(), p = b[h], l = b[h + "m"]; d && (g.width = 0, e && (g.x = b.plotHeight + (!1 !== a.clip ? 0 : b.plotTop))); p ? b.hasLoaded || p.attr(g) : (d && (b[h + "m"] = l = c.clipRect(e ? b.plotSizeX + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[h] = p = c.clipRect(g), p.count = { length: 0 }); d && !p.count[this.index] && (p.count[this.index] = !0, p.count.length += 1); if (!1 !== a.clip || d) this.group.clip(d || k ? p : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = h; d || (p.count[this.index] && (delete p.count[this.index], --p.count.length),
                                0 === p.count.length && h && b[h] && (k || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
                    }, animate: function (d) { var b = this.chart, a = n(this.options.animation); if (!b.hasRendered) if (d) this.setClip(a); else { var c = this.sharedClipKey; d = b[c]; var e = this.getClipBox(a, !0); d && d.animate(e, a); b[c + "m"] && b[c + "m"].animate({ width: e.width + 99, x: e.x - (b.inverted ? 0 : 99) }, a) } }, afterAnimate: function () { this.setClip(); g(this, "afterAnimate"); this.finishedAnimating = !0 }, drawPoints: function () {
                        var d = this.points, b = this.chart,
                        a, c, e = this.options.marker, k = this[this.specialGroup] || this.markerGroup, g = this.xAxis, h = F(e.enabled, !g || g.isRadial ? !0 : null, this.closestPointRangePx >= e.enabledThreshold * e.radius); if (!1 !== e.enabled || this._hasPointMarkers) for (a = 0; a < d.length; a++) {
                            var p = d[a]; var l = (c = p.graphic) ? "animate" : "attr"; var z = p.marker || {}; var u = !!p.marker; if ((h && "undefined" === typeof z.enabled || z.enabled) && !p.isNull && !1 !== p.visible) {
                                var f = F(z.symbol, this.symbol); var w = this.markerAttribs(p, p.selected && "select"); this.enabledDataSorting &&
                                    (p.startXPos = g.reversed ? -w.width : g.width); var y = !1 !== p.isInside; c ? c[y ? "show" : "hide"](y).animate(w) : y && (0 < w.width || p.hasImage) && (p.graphic = c = b.renderer.symbol(f, w.x, w.y, w.width, w.height, u ? z : e).add(k), this.enabledDataSorting && b.hasRendered && (c.attr({ x: p.startXPos }), l = "animate")); c && "animate" === l && c[y ? "show" : "hide"](y).animate(w); if (c && !b.styledMode) c[l](this.pointAttribs(p, p.selected && "select")); c && c.addClass(p.getClassName(), !0)
                            } else c && (p.graphic = c.destroy())
                        }
                    }, markerAttribs: function (d, b) {
                        var a = this.options,
                        c = a.marker, e = d.marker || {}, k = e.symbol || c.symbol, g = F(e.radius, c.radius); b && (c = c.states[b], b = e.states && e.states[b], g = F(b && b.radius, c && c.radius, g + (c && c.radiusPlus || 0))); d.hasImage = k && 0 === k.indexOf("url"); d.hasImage && (g = 0); d = { x: a.crisp ? Math.floor(d.plotX) - g : d.plotX - g, y: d.plotY - g }; g && (d.width = d.height = 2 * g); return d
                    }, pointAttribs: function (d, b) {
                        var a = this.options.marker, c = d && d.options, e = c && c.marker || {}, k = this.color, g = c && c.color, h = d && d.color; c = F(e.lineWidth, a.lineWidth); var p = d && d.zone && d.zone.color; d = 1; k =
                            g || p || h || k; g = e.fillColor || a.fillColor || k; k = e.lineColor || a.lineColor || k; b = b || "normal"; a = a.states[b]; b = e.states && e.states[b] || {}; c = F(b.lineWidth, a.lineWidth, c + F(b.lineWidthPlus, a.lineWidthPlus, 0)); g = b.fillColor || a.fillColor || g; k = b.lineColor || a.lineColor || k; d = F(b.opacity, a.opacity, d); return { stroke: k, "stroke-width": c, fill: g, opacity: d }
                    }, destroy: function (d) {
                        var b = this, a = b.chart, c = /AppleWebKit\/533/.test(K.navigator.userAgent), e, k, h = b.data || [], p, z; g(b, "destroy"); this.removeEvents(d); (b.axisTypes || []).forEach(function (d) {
                        (z =
                            b[d]) && z.series && (l(z.series, b), z.isDirty = z.forceRedraw = !0)
                        }); b.legendItem && b.chart.legend.destroyItem(b); for (k = h.length; k--;)(p = h[k]) && p.destroy && p.destroy(); b.points = null; B.clearTimeout(b.animationTimeout); w(b, function (b, d) { b instanceof G && !b.survive && (e = c && "group" === d ? "hide" : "destroy", b[e]()) }); a.hoverSeries === b && (a.hoverSeries = null); l(a.series, b); a.orderSeries(); w(b, function (a, c) { d && "hcEvents" === c || delete b[c] })
                    }, getGraphPath: function (d, b, a) {
                        var c = this, e = c.options, k = e.step, m, g = [], h = [], p; d = d ||
                            c.points; (m = d.reversed) && d.reverse(); (k = { right: 1, center: 2 }[k] || k && 3) && m && (k = 4 - k); d = this.getValidPoints(d, !1, !(e.connectNulls && !b && !a)); d.forEach(function (m, l) {
                                var z = m.plotX, u = m.plotY, f = d[l - 1]; (m.leftCliff || f && f.rightCliff) && !a && (p = !0); m.isNull && !E(b) && 0 < l ? p = !e.connectNulls : m.isNull && !b ? p = !0 : (0 === l || p ? l = [["M", m.plotX, m.plotY]] : c.getPointSpline ? l = [c.getPointSpline(d, m, l)] : k ? (l = 1 === k ? [["L", f.plotX, u]] : 2 === k ? [["L", (f.plotX + z) / 2, f.plotY], ["L", (f.plotX + z) / 2, u]] : [["L", z, f.plotY]], l.push(["L", z, u])) : l = [["L",
                                    z, u]], h.push(m.x), k && (h.push(m.x), 2 === k && h.push(m.x)), g.push.apply(g, l), p = !1)
                            }); g.xMap = h; return c.graphPath = g
                    }, drawGraph: function () {
                        var d = this, b = this.options, a = (this.gappedPath || this.getGraphPath).call(this), c = this.chart.styledMode, e = [["graph", "highcharts-graph"]]; c || e[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle); e = d.getZonesGraphs(e); e.forEach(function (e, k) {
                            var m = e[0], g = d[m], h = g ? "animate" : "attr"; g ? (g.endX = d.preventGraphAnimation ? null : a.xMap, g.animate({ d: a })) : a.length && (d[m] = g = d.chart.renderer.path(a).addClass(e[1]).attr({ zIndex: 1 }).add(d.group));
                            g && !c && (m = { stroke: e[2], "stroke-width": b.lineWidth, fill: d.fillGraph && d.color || "none" }, e[3] ? m.dashstyle = e[3] : "square" !== b.linecap && (m["stroke-linecap"] = m["stroke-linejoin"] = "round"), g[h](m).shadow(2 > k && b.shadow)); g && (g.startX = a.xMap, g.isArea = a.isArea)
                        })
                    }, getZonesGraphs: function (d) {
                        this.zones.forEach(function (b, a) { a = ["zone-graph-" + a, "highcharts-graph highcharts-zone-graph-" + a + " " + (b.className || "")]; this.chart.styledMode || a.push(b.color || this.color, b.dashStyle || this.options.dashStyle); d.push(a) }, this);
                        return d
                    }, applyZones: function () {
                        var d = this, b = this.chart, a = b.renderer, c = this.zones, e, k, g = this.clips || [], h, p = this.graph, l = this.area, z = Math.max(b.chartWidth, b.chartHeight), u = this[(this.zoneAxis || "y") + "Axis"], f = b.inverted, w, y, v, t = !1, K, n; if (c.length && (p || l) && u && "undefined" !== typeof u.min) {
                            var x = u.reversed; var q = u.horiz; p && !this.showLine && p.hide(); l && l.hide(); var O = u.getExtremes(); c.forEach(function (c, m) {
                                e = x ? q ? b.plotWidth : 0 : q ? 0 : u.toPixels(O.min) || 0; e = A(F(k, e), 0, z); k = A(Math.round(u.toPixels(F(c.value, O.max),
                                    !0) || 0), 0, z); t && (e = k = u.toPixels(O.max)); w = Math.abs(e - k); y = Math.min(e, k); v = Math.max(e, k); u.isXAxis ? (h = { x: f ? v : y, y: 0, width: w, height: z }, q || (h.x = b.plotHeight - h.x)) : (h = { x: 0, y: f ? v : y, width: z, height: w }, q && (h.y = b.plotWidth - h.y)); f && a.isVML && (h = u.isXAxis ? { x: 0, y: x ? y : v, height: h.width, width: b.chartWidth } : { x: h.y - b.plotLeft - b.spacingBox.x, y: 0, width: h.height, height: b.chartHeight }); g[m] ? g[m].animate(h) : g[m] = a.clipRect(h); K = d["zone-area-" + m]; n = d["zone-graph-" + m]; p && n && n.clip(g[m]); l && K && K.clip(g[m]); t = c.value > O.max;
                                d.resetZones && 0 === k && (k = void 0)
                            }); this.clips = g
                        } else d.visible && (p && p.show(!0), l && l.show(!0))
                    }, invertGroups: function (d) { function b() { ["group", "markerGroup"].forEach(function (b) { a[b] && (c.renderer.isVML && a[b].attr({ width: a.yAxis.len, height: a.xAxis.len }), a[b].width = a.yAxis.len, a[b].height = a.xAxis.len, a[b].invert(a.isRadialSeries ? !1 : d)) }) } var a = this, c = a.chart; a.xAxis && (a.eventsToUnbind.push(D(c, "resize", b)), b(), a.invertGroups = b) }, plotGroup: function (d, b, a, c, e) {
                        var k = this[d], m = !k; a = {
                            visibility: a, zIndex: c ||
                                .1
                        }; "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (a.opacity = this.opacity); m && (this[d] = k = this.chart.renderer.g().add(e)); k.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (E(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (k.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0); k.attr(a)[m ? "attr" : "animate"](this.getPlotBox()); return k
                    }, getPlotBox: function () {
                        var d = this.chart,
                        b = this.xAxis, a = this.yAxis; d.inverted && (b = a, a = this.xAxis); return { translateX: b ? b.left : d.plotLeft, translateY: a ? a.top : d.plotTop, scaleX: 1, scaleY: 1 }
                    }, removeEvents: function (d) { d ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (b) { b() }), this.eventsToUnbind.length = 0) : y(this) }, render: function () {
                        var d = this, b = d.chart, a = d.options, c = n(a.animation), e = !d.finishedAnimating && b.renderer.isSVG && c.duration, k = d.visible ? "inherit" : "hidden", h = a.zIndex, p = d.hasRendered, l = b.seriesGroup, u = b.inverted; g(this, "render");
                        var f = d.plotGroup("group", "series", k, h, l); d.markerGroup = d.plotGroup("markerGroup", "markers", k, h, l); e && d.animate && d.animate(!0); f.inverted = d.isCartesian || d.invertable ? u : !1; d.drawGraph && (d.drawGraph(), d.applyZones()); d.visible && d.drawPoints(); d.drawDataLabels && d.drawDataLabels(); d.redrawPoints && d.redrawPoints(); d.drawTracker && !1 !== d.options.enableMouseTracking && d.drawTracker(); d.invertGroups(u); !1 === a.clip || d.sharedClipKey || p || f.clip(b.clipRect); e && d.animate && d.animate(); p || (e && c.defer && (e += c.defer),
                            d.animationTimeout = z(function () { d.afterAnimate() }, e || 0)); d.isDirty = !1; d.hasRendered = !0; g(d, "afterRender")
                    }, redraw: function () { var d = this.chart, b = this.isDirty || this.isDirtyData, a = this.group, c = this.xAxis, e = this.yAxis; a && (d.inverted && a.attr({ width: d.plotWidth, height: d.plotHeight }), a.animate({ translateX: F(c && c.left, d.plotLeft), translateY: F(e && e.top, d.plotTop) })); this.translate(); this.render(); b && delete this.kdTree }, kdAxisArray: ["clientX", "plotY"], searchPoint: function (d, b) {
                        var a = this.xAxis, c = this.yAxis,
                        e = this.chart.inverted; return this.searchKDTree({ clientX: e ? a.len - d.chartY + a.pos : d.chartX - a.pos, plotY: e ? c.len - d.chartX + c.pos : d.chartY - c.pos }, b, d)
                    }, buildKDTree: function (d) {
                        function b(d, c, e) { var k; if (k = d && d.length) { var g = a.kdAxisArray[c % e]; d.sort(function (b, d) { return b[g] - d[g] }); k = Math.floor(k / 2); return { point: d[k], left: b(d.slice(0, k), c + 1, e), right: b(d.slice(k + 1), c + 1, e) } } } this.buildingKdTree = !0; var a = this, c = -1 < a.options.findNearestPointBy.indexOf("y") ? 2 : 1; delete a.kdTree; z(function () {
                        a.kdTree = b(a.getValidPoints(null,
                            !a.directTouch), c, c); a.buildingKdTree = !1
                        }, a.options.kdNow || d && "touchstart" === d.type ? 0 : 1)
                    }, searchKDTree: function (d, b, a) {
                        function c(b, d, a, h) {
                            var p = d.point, l = e.kdAxisArray[a % h], z = p; var u = E(b[k]) && E(p[k]) ? Math.pow(b[k] - p[k], 2) : null; var f = E(b[g]) && E(p[g]) ? Math.pow(b[g] - p[g], 2) : null; f = (u || 0) + (f || 0); p.dist = E(f) ? Math.sqrt(f) : Number.MAX_VALUE; p.distX = E(u) ? Math.sqrt(u) : Number.MAX_VALUE; l = b[l] - p[l]; f = 0 > l ? "left" : "right"; u = 0 > l ? "right" : "left"; d[f] && (f = c(b, d[f], a + 1, h), z = f[m] < z[m] ? f : p); d[u] && Math.sqrt(l * l) < z[m] &&
                                (b = c(b, d[u], a + 1, h), z = b[m] < z[m] ? b : z); return z
                        } var e = this, k = this.kdAxisArray[0], g = this.kdAxisArray[1], m = b ? "distX" : "dist"; b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1; this.kdTree || this.buildingKdTree || this.buildKDTree(a); if (this.kdTree) return c(d, this.kdTree, b, b)
                    }, pointPlacementToXValue: function () { var d = this.options, b = d.pointRange, a = this.xAxis; d = d.pointPlacement; "between" === d && (d = a.reversed ? -.5 : .5); return e(d) ? d * F(b, a.pointRange) : 0 }, isPointInside: function (d) {
                        return "undefined" !== typeof d.plotY &&
                            "undefined" !== typeof d.plotX && 0 <= d.plotY && d.plotY <= this.yAxis.len && 0 <= d.plotX && d.plotX <= this.xAxis.len
                    }
                }); ""
            }); N(r, "Extensions/Stacking.js", [r["Core/Axis/Axis.js"], r["Core/Chart/Chart.js"], r["Core/Globals.js"], r["Core/Axis/StackingAxis.js"], r["Core/Utilities.js"]], function (q, f, r, C, G) {
                var B = G.correctFloat, H = G.defined, D = G.destroyObjectProperties, n = G.format, I = G.isNumber, M = G.pick; ""; var A = r.Series, L = function () {
                    function f(l, f, n, t, g) {
                        var c = l.chart.inverted; this.axis = l; this.isNegative = n; this.options = f = f ||
                            {}; this.x = t; this.total = null; this.points = {}; this.hasValidPoints = !1; this.stack = g; this.rightCliff = this.leftCliff = 0; this.alignOptions = { align: f.align || (c ? n ? "left" : "right" : "center"), verticalAlign: f.verticalAlign || (c ? "middle" : n ? "bottom" : "top"), y: f.y, x: f.x }; this.textAlign = f.textAlign || (c ? n ? "right" : "left" : "center")
                    } f.prototype.destroy = function () { D(this, this.axis) }; f.prototype.render = function (l) {
                        var f = this.axis.chart, x = this.options, t = x.format; t = t ? n(t, this, f) : x.formatter.call(this); this.label ? this.label.attr({
                            text: t,
                            visibility: "hidden"
                        }) : (this.label = f.renderer.label(t, null, null, x.shape, null, null, x.useHTML, !1, "stack-labels"), t = { r: x.borderRadius || 0, text: t, rotation: x.rotation, padding: M(x.padding, 5), visibility: "hidden" }, f.styledMode || (t.fill = x.backgroundColor, t.stroke = x.borderColor, t["stroke-width"] = x.borderWidth, this.label.css(x.style)), this.label.attr(t), this.label.added || this.label.add(l)); this.label.labelrank = f.plotHeight
                    }; f.prototype.setOffset = function (l, f, n, t, g) {
                        var c = this.axis, p = c.chart; t = c.translate(c.stacking.usePercentage ?
                            100 : t ? t : this.total, 0, 0, 0, 1); n = c.translate(n ? n : 0); n = H(t) && Math.abs(t - n); l = M(g, p.xAxis[0].translate(this.x)) + l; c = H(t) && this.getStackBox(p, this, l, t, f, n, c); f = this.label; n = this.isNegative; l = "justify" === M(this.options.overflow, "justify"); var h = this.textAlign; f && c && (g = f.getBBox(), t = f.padding, h = "left" === h ? p.inverted ? -t : t : "right" === h ? g.width : p.inverted && "center" === h ? g.width / 2 : p.inverted ? n ? g.width + t : -t : g.width / 2, n = p.inverted ? g.height / 2 : n ? -t : g.height, this.alignOptions.x = M(this.options.x, 0), this.alignOptions.y =
                                M(this.options.y, 0), c.x -= h, c.y -= n, f.align(this.alignOptions, null, c), p.isInsidePlot(f.alignAttr.x + h - this.alignOptions.x, f.alignAttr.y + n - this.alignOptions.y) ? f.show() : (f.alignAttr.y = -9999, l = !1), l && A.prototype.justifyDataLabel.call(this.axis, f, this.alignOptions, f.alignAttr, g, c), f.attr({ x: f.alignAttr.x, y: f.alignAttr.y }), M(!l && this.options.crop, !0) && ((p = I(f.x) && I(f.y) && p.isInsidePlot(f.x - t + f.width, f.y) && p.isInsidePlot(f.x + t, f.y)) || f.hide()))
                    }; f.prototype.getStackBox = function (l, f, n, t, g, c, p) {
                        var h = f.axis.reversed,
                        e = l.inverted, a = p.height + p.pos - (e ? l.plotLeft : l.plotTop); f = f.isNegative && !h || !f.isNegative && h; return { x: e ? f ? t - p.right : t - c + p.pos - l.plotLeft : n + l.xAxis[0].transB - l.plotLeft, y: e ? p.height - n - g : f ? a - t - c : a - t, width: e ? c : g, height: e ? g : c }
                    }; return f
                }(); f.prototype.getStacks = function () {
                    var f = this, l = f.inverted; f.yAxis.forEach(function (l) { l.stacking && l.stacking.stacks && l.hasVisibleSeries && (l.stacking.oldStacks = l.stacking.stacks) }); f.series.forEach(function (v) {
                        var n = v.xAxis && v.xAxis.options || {}; !v.options.stacking || !0 !==
                            v.visible && !1 !== f.options.chart.ignoreHiddenSeries || (v.stackKey = [v.type, M(v.options.stack, ""), l ? n.top : n.left, l ? n.height : n.width].join())
                    })
                }; C.compose(q); A.prototype.setGroupedPoints = function () { this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length && A.prototype.setStackedPoints.call(this, "group") }; A.prototype.setStackedPoints = function (f) {
                    var l = f || this.options.stacking; if (l && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                        var n =
                            this.processedXData, x = this.processedYData, t = [], g = x.length, c = this.options, p = c.threshold, h = M(c.startFromThreshold && p, 0); c = c.stack; f = f ? this.type + "," + l : this.stackKey; var e = "-" + f, a = this.negStacks, u = this.yAxis, w = u.stacking.stacks, F = u.stacking.oldStacks, y, k; u.stacking.stacksTouched += 1; for (k = 0; k < g; k++) {
                                var z = n[k]; var q = x[k]; var K = this.getStackIndicator(K, z, this.index); var d = K.key; var b = (y = a && q < (h ? 0 : p)) ? e : f; w[b] || (w[b] = {}); w[b][z] || (F[b] && F[b][z] ? (w[b][z] = F[b][z], w[b][z].total = null) : w[b][z] = new L(u, u.options.stackLabels,
                                    y, z, c)); b = w[b][z]; null !== q ? (b.points[d] = b.points[this.index] = [M(b.cumulative, h)], H(b.cumulative) || (b.base = d), b.touched = u.stacking.stacksTouched, 0 < K.index && !1 === this.singleStacks && (b.points[d][0] = b.points[this.index + "," + z + ",0"][0])) : b.points[d] = b.points[this.index] = null; "percent" === l ? (y = y ? f : e, a && w[y] && w[y][z] ? (y = w[y][z], b.total = y.total = Math.max(y.total, b.total) + Math.abs(q) || 0) : b.total = B(b.total + (Math.abs(q) || 0))) : "group" === l ? null !== q && (b.total = (b.total || 0) + 1) : b.total = B(b.total + (q || 0)); b.cumulative =
                                        "group" === l ? (b.total || 1) - 1 : M(b.cumulative, h) + (q || 0); null !== q && (b.points[d].push(b.cumulative), t[k] = b.cumulative, b.hasValidPoints = !0)
                            } "percent" === l && (u.stacking.usePercentage = !0); "group" !== l && (this.stackedYData = t); u.stacking.oldStacks = {}
                    }
                }; A.prototype.modifyStacks = function () {
                    var f = this, l = f.stackKey, n = f.yAxis.stacking.stacks, x = f.processedXData, t, g = f.options.stacking; f[g + "Stacker"] && [l, "-" + l].forEach(function (c) {
                        for (var p = x.length, h, e; p--;)if (h = x[p], t = f.getStackIndicator(t, h, f.index, c), e = (h = n[c] && n[c][h]) &&
                            h.points[t.key]) f[g + "Stacker"](e, h, p)
                    })
                }; A.prototype.percentStacker = function (f, l, n) { l = l.total ? 100 / l.total : 0; f[0] = B(f[0] * l); f[1] = B(f[1] * l); this.stackedYData[n] = f[1] }; A.prototype.getStackIndicator = function (f, l, n, x) { !H(f) || f.x !== l || x && f.key !== x ? f = { x: l, index: 0, key: x } : f.index++; f.key = [n, l, f.index].join(); return f }; r.StackItem = L; return r.StackItem
            }); N(r, "Core/Dynamics.js", [r["Core/Axis/Axis.js"], r["Core/Chart/Chart.js"], r["Core/Globals.js"], r["Core/Options.js"], r["Core/Series/Point.js"], r["Core/Time.js"],
            r["Core/Utilities.js"]], function (q, f, r, C, G, B, H) {
                var D = C.time, n = H.addEvent, I = H.animate, M = H.createElement, A = H.css, L = H.defined, E = H.erase, l = H.error, v = H.extend, x = H.fireEvent, t = H.isArray, g = H.isNumber, c = H.isObject, p = H.isString, h = H.merge, e = H.objectEach, a = H.pick, u = H.relativeLength, w = H.setAnimation, F = H.splat; C = r.Series; var y = r.seriesTypes; r.cleanRecursively = function (a, g) {
                    var k = {}; e(a, function (e, d) {
                        if (c(a[d], !0) && !a.nodeType && g[d]) e = r.cleanRecursively(a[d], g[d]), Object.keys(e).length && (k[d] = e); else if (c(a[d]) ||
                            a[d] !== g[d]) k[d] = a[d]
                    }); return k
                }; v(f.prototype, {
                    addSeries: function (c, e, g) { var k, d = this; c && (e = a(e, !0), x(d, "addSeries", { options: c }, function () { k = d.initSeries(c); d.isDirtyLegend = !0; d.linkSeries(); k.enabledDataSorting && k.setData(c.data, !1); x(d, "afterAddSeries", { series: k }); e && d.redraw(g) })); return k }, addAxis: function (a, c, e, g) { return this.createAxis(c ? "xAxis" : "yAxis", { axis: a, redraw: e, animation: g }) }, addColorAxis: function (a, c, e) { return this.createAxis("colorAxis", { axis: a, redraw: c, animation: e }) }, createAxis: function (c,
                        e) { var k = this.options, g = "colorAxis" === c, d = e.redraw, b = e.animation; e = h(e.axis, { index: this[c].length, isX: "xAxis" === c }); var m = g ? new r.ColorAxis(this, e) : new q(this, e); k[c] = F(k[c] || {}); k[c].push(e); g && (this.isDirtyLegend = !0, this.axes.forEach(function (b) { b.series = [] }), this.series.forEach(function (b) { b.bindAxes(); b.isDirtyData = !0 })); a(d, !0) && this.redraw(b); return m }, showLoading: function (c) {
                            var e = this, k = e.options, g = e.loadingDiv, d = k.loading, b = function () {
                                g && A(g, {
                                    left: e.plotLeft + "px", top: e.plotTop + "px", width: e.plotWidth +
                                        "px", height: e.plotHeight + "px"
                                })
                            }; g || (e.loadingDiv = g = M("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, e.container), e.loadingSpan = M("span", { className: "highcharts-loading-inner" }, null, g), n(e, "redraw", b)); g.className = "highcharts-loading"; e.loadingSpan.innerHTML = a(c, k.lang.loading, ""); e.styledMode || (A(g, v(d.style, { zIndex: 10 })), A(e.loadingSpan, d.labelStyle), e.loadingShown || (A(g, { opacity: 0, display: "" }), I(g, { opacity: d.style.opacity || .5 }, { duration: d.showDuration || 0 }))); e.loadingShown =
                                !0; b()
                        }, hideLoading: function () { var a = this.options, c = this.loadingDiv; c && (c.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || I(c, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function () { A(c, { display: "none" }) } })); this.loadingShown = !1 }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "), propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
                    propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "), collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"], update: function (c, l, f, w) {
                        var d = this, b = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, k, z, y, t = c.isResponsiveOptions, n = []; x(d, "update", { options: c }); t || d.setResponsive(!1, !0); c = r.cleanRecursively(c, d.options); h(!0, d.userOptions, c); if (k = c.chart) {
                            h(!0, d.options.chart, k); "className" in
                                k && d.setClassName(k.className); "reflow" in k && d.setReflow(k.reflow); if ("inverted" in k || "polar" in k || "type" in k) { d.propFromSeries(); var v = !0 } "alignTicks" in k && (v = !0); e(k, function (b, a) { -1 !== d.propsRequireUpdateSeries.indexOf("chart." + a) && (z = !0); -1 !== d.propsRequireDirtyBox.indexOf(a) && (d.isDirtyBox = !0); -1 !== d.propsRequireReflow.indexOf(a) && (t ? d.isDirtyBox = !0 : y = !0) }); !d.styledMode && "style" in k && d.renderer.setStyle(k.style)
                        } !d.styledMode && c.colors && (this.options.colors = c.colors); c.plotOptions && h(!0, this.options.plotOptions,
                            c.plotOptions); c.time && this.time === D && (this.time = new B(c.time)); e(c, function (a, c) { if (d[c] && "function" === typeof d[c].update) d[c].update(a, !1); else if ("function" === typeof d[b[c]]) d[b[c]](a); "chart" !== c && -1 !== d.propsRequireUpdateSeries.indexOf(c) && (z = !0) }); this.collectionsWithUpdate.forEach(function (b) {
                                if (c[b]) {
                                    if ("series" === b) { var e = []; d[b].forEach(function (b, d) { b.options.isInternal || e.push(a(b.options.index, d)) }) } F(c[b]).forEach(function (a, c) {
                                        var k = L(a.id), g; k && (g = d.get(a.id)); g || (g = d[b][e ? e[c] : c]) &&
                                            k && L(g.options.id) && (g = void 0); g && g.coll === b && (g.update(a, !1), f && (g.touched = !0)); !g && f && d.collectionsWithInit[b] && (d.collectionsWithInit[b][0].apply(d, [a].concat(d.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
                                    }); f && d[b].forEach(function (b) { b.touched || b.options.isInternal ? delete b.touched : n.push(b) })
                                }
                            }); n.forEach(function (b) { b.remove && b.remove(!1) }); v && d.axes.forEach(function (b) { b.update({}, !1) }); z && d.getSeriesOrderByLinks().forEach(function (b) { b.chart && b.update({}, !1) }, this); c.loading &&
                                h(!0, d.options.loading, c.loading); v = k && k.width; k = k && k.height; p(k) && (k = u(k, v || d.chartWidth)); y || g(v) && v !== d.chartWidth || g(k) && k !== d.chartHeight ? d.setSize(v, k, w) : a(l, !0) && d.redraw(w); x(d, "afterUpdate", { options: c, redraw: l, animation: w })
                    }, setSubtitle: function (a, c) { this.applyDescription("subtitle", a); this.layOutTitles(c) }, setCaption: function (a, c) { this.applyDescription("caption", a); this.layOutTitles(c) }
                }); f.prototype.collectionsWithInit = {
                    xAxis: [f.prototype.addAxis, [!0]], yAxis: [f.prototype.addAxis, [!1]],
                    series: [f.prototype.addSeries]
                }; v(G.prototype, {
                    update: function (e, g, h, p) {
                        function d() {
                            b.applyOptions(e); var d = l && b.hasDummyGraphic; d = null === b.y ? !d : d; l && d && (b.graphic = l.destroy(), delete b.hasDummyGraphic); c(e, !0) && (l && l.element && e && e.marker && "undefined" !== typeof e.marker.symbol && (b.graphic = l.destroy()), e && e.dataLabels && b.dataLabel && (b.dataLabel = b.dataLabel.destroy()), b.connector && (b.connector = b.connector.destroy())); f = b.index; k.updateParallelArrays(b, f); z.data[f] = c(z.data[f], !0) || c(e, !0) ? b.options :
                                a(e, z.data[f]); k.isDirty = k.isDirtyData = !0; !k.fixedBox && k.hasCartesianSeries && (u.isDirtyBox = !0); "point" === z.legendType && (u.isDirtyLegend = !0); g && u.redraw(h)
                        } var b = this, k = b.series, l = b.graphic, f, u = k.chart, z = k.options; g = a(g, !0); !1 === p ? d() : b.firePointEvent("update", { options: e }, d)
                    }, remove: function (a, c) { this.series.removePoint(this.series.data.indexOf(this), a, c) }
                }); v(C.prototype, {
                    addPoint: function (c, e, g, h, d) {
                        var b = this.options, k = this.data, p = this.chart, l = this.xAxis; l = l && l.hasNames && l.names; var f = b.data, u =
                            this.xData, z; e = a(e, !0); var w = { series: this }; this.pointClass.prototype.applyOptions.apply(w, [c]); var y = w.x; var t = u.length; if (this.requireSorting && y < u[t - 1]) for (z = !0; t && u[t - 1] > y;)t--; this.updateParallelArrays(w, "splice", t, 0, 0); this.updateParallelArrays(w, t); l && w.name && (l[y] = w.name); f.splice(t, 0, c); z && (this.data.splice(t, 0, null), this.processData()); "point" === b.legendType && this.generatePoints(); g && (k[0] && k[0].remove ? k[0].remove(!1) : (k.shift(), this.updateParallelArrays(w, "shift"), f.shift())); !1 !== d && x(this,
                                "addPoint", { point: w }); this.isDirtyData = this.isDirty = !0; e && p.redraw(h)
                    }, removePoint: function (c, e, g) { var k = this, d = k.data, b = d[c], h = k.points, p = k.chart, l = function () { h && h.length === d.length && h.splice(c, 1); d.splice(c, 1); k.options.data.splice(c, 1); k.updateParallelArrays(b || { series: k }, "splice", c, 1); b && b.destroy(); k.isDirty = !0; k.isDirtyData = !0; e && p.redraw() }; w(g, p); e = a(e, !0); b ? b.firePointEvent("remove", null, l) : l() }, remove: function (c, e, g, h) {
                        function d() {
                            b.destroy(h); b.remove = null; k.isDirtyLegend = k.isDirtyBox =
                                !0; k.linkSeries(); a(c, !0) && k.redraw(e)
                        } var b = this, k = b.chart; !1 !== g ? x(b, "remove", null, d) : d()
                    }, update: function (c, e) {
                        c = r.cleanRecursively(c, this.userOptions); x(this, "update", { options: c }); var k = this, g = k.chart, d = k.userOptions, b = k.initialType || k.type, m = c.type || d.type || g.options.chart.type, p = !(this.hasDerivedData || c.dataGrouping || m && m !== this.type || "undefined" !== typeof c.pointStart || c.pointInterval || c.pointIntervalUnit || c.keys), f = y[b].prototype, u, z = ["eventOptions", "navigatorSeries", "baseSeries"], w = k.finishedAnimating &&
                            { animation: !1 }, t = {}; p && (z.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== c.visible && z.push("area", "graph"), k.parallelArrays.forEach(function (b) { z.push(b + "Data") }), c.data && (c.dataSorting && v(k.options.dataSorting, c.dataSorting), this.setData(c.data, !1))); c = h(d, w, { index: "undefined" === typeof d.index ? k.index : d.index, pointStart: a(d.pointStart, k.xData[0]) }, !p && { data: k.options.data },
                                c); p && c.data && (c.data = k.options.data); z = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(z); z.forEach(function (b) { z[b] = k[b]; delete k[b] }); k.remove(!1, null, !1, !0); for (u in f) k[u] = void 0; y[m || b] ? v(k, y[m || b].prototype) : l(17, !0, g, { missingModuleFor: m || b }); z.forEach(function (b) { k[b] = z[b] }); k.init(g, c); if (p && this.points) {
                                    var n = k.options; !1 === n.visible ? (t.graphic = 1, t.dataLabel = 1) : k._hasPointLabels || (c = n.marker, d = n.dataLabels, c && (!1 === c.enabled || "symbol" in c) && (t.graphic = 1), d && !1 === d.enabled &&
                                        (t.dataLabel = 1)); this.points.forEach(function (b) { b && b.series && (b.resolveColor(), Object.keys(t).length && b.destroyElements(t), !1 === n.showInLegend && b.legendItem && g.legend.destroyItem(b)) }, this)
                                } k.initialType = b; g.linkSeries(); x(this, "afterUpdate"); a(e, !0) && g.redraw(p ? void 0 : !1)
                    }, setName: function (a) { this.name = this.options.name = this.userOptions.name = a; this.chart.isDirtyLegend = !0 }
                }); v(q.prototype, {
                    update: function (c, g) {
                        var k = this.chart, p = c && c.events || {}; c = h(this.userOptions, c); k.options[this.coll].indexOf &&
                            (k.options[this.coll][k.options[this.coll].indexOf(this.userOptions)] = c); e(k.options[this.coll].events, function (d, b) { "undefined" === typeof p[b] && (p[b] = void 0) }); this.destroy(!0); this.init(k, v(c, { events: p })); k.isDirtyBox = !0; a(g, !0) && k.redraw()
                    }, remove: function (c) {
                        for (var e = this.chart, k = this.coll, g = this.series, d = g.length; d--;)g[d] && g[d].remove(!1); E(e.axes, this); E(e[k], this); t(e.options[k]) ? e.options[k].splice(this.options.index, 1) : delete e.options[k]; e[k].forEach(function (b, d) {
                            b.options.index = b.userOptions.index =
                                d
                        }); this.destroy(); e.isDirtyBox = !0; a(c, !0) && e.redraw()
                    }, setTitle: function (a, c) { this.update({ title: a }, c) }, setCategories: function (a, c) { this.update({ categories: a }, c) }
                })
            }); N(r, "Series/AreaSeries.js", [r["Core/Globals.js"], r["Core/Color.js"], r["Mixins/LegendSymbol.js"], r["Core/Utilities.js"]], function (q, f, r, C) {
                var G = f.parse, B = C.objectEach, H = C.pick; f = C.seriesType; var D = q.Series; f("area", "line", { threshold: 0 }, {
                    singleStacks: !1, getStackPoints: function (f) {
                        var n = [], q = [], r = this.xAxis, L = this.yAxis, E = L.stacking.stacks[this.stackKey],
                        l = {}, v = this.index, x = L.series, t = x.length, g = H(L.options.reversedStacks, !0) ? 1 : -1, c; f = f || this.points; if (this.options.stacking) {
                            for (c = 0; c < f.length; c++)f[c].leftNull = f[c].rightNull = void 0, l[f[c].x] = f[c]; B(E, function (c, e) { null !== c.total && q.push(e) }); q.sort(function (c, e) { return c - e }); var p = x.map(function (c) { return c.visible }); q.forEach(function (h, e) {
                                var a = 0, f, w; if (l[h] && !l[h].isNull) n.push(l[h]), [-1, 1].forEach(function (a) {
                                    var u = 1 === a ? "rightNull" : "leftNull", k = 0, z = E[q[e + a]]; if (z) for (c = v; 0 <= c && c < t;)f = z.points[c],
                                        f || (c === v ? l[h][u] = !0 : p[c] && (w = E[h].points[c]) && (k -= w[1] - w[0])), c += g; l[h][1 === a ? "rightCliff" : "leftCliff"] = k
                                }); else { for (c = v; 0 <= c && c < t;) { if (f = E[h].points[c]) { a = f[1]; break } c += g } a = L.translate(a, 0, 1, 0, 1); n.push({ isNull: !0, plotX: r.translate(h, 0, 0, 0, 1), x: h, plotY: a, yBottom: a }) }
                            })
                        } return n
                    }, getGraphPath: function (f) {
                        var n = D.prototype.getGraphPath, q = this.options, r = q.stacking, B = this.yAxis, E, l = [], v = [], x = this.index, t = B.stacking.stacks[this.stackKey], g = q.threshold, c = Math.round(B.getThreshold(q.threshold)); q = H(q.connectNulls,
                            "percent" === r); var p = function (a, h, p) { var u = f[a]; a = r && t[u.x].points[x]; var k = u[p + "Null"] || 0; p = u[p + "Cliff"] || 0; u = !0; if (p || k) { var z = (k ? a[0] : a[1]) + p; var w = a[0] + p; u = !!k } else !r && f[h] && f[h].isNull && (z = w = g); "undefined" !== typeof z && (v.push({ plotX: e, plotY: null === z ? c : B.getThreshold(z), isNull: u, isCliff: !0 }), l.push({ plotX: e, plotY: null === w ? c : B.getThreshold(w), doCurve: !1 })) }; f = f || this.points; r && (f = this.getStackPoints(f)); for (E = 0; E < f.length; E++) {
                                r || (f[E].leftCliff = f[E].rightCliff = f[E].leftNull = f[E].rightNull = void 0);
                                var h = f[E].isNull; var e = H(f[E].rectPlotX, f[E].plotX); var a = r ? f[E].yBottom : c; if (!h || q) q || p(E, E - 1, "left"), h && !r && q || (v.push(f[E]), l.push({ x: E, plotX: e, plotY: a })), q || p(E, E + 1, "right")
                            } E = n.call(this, v, !0, !0); l.reversed = !0; h = n.call(this, l, !0, !0); (a = h[0]) && "M" === a[0] && (h[0] = ["L", a[1], a[2]]); h = E.concat(h); n = n.call(this, v, !1, q); h.xMap = E.xMap; this.areaPath = h; return n
                    }, drawGraph: function () {
                    this.areaPath = []; D.prototype.drawGraph.apply(this); var f = this, q = this.areaPath, r = this.options, A = [["area", "highcharts-area",
                        this.color, r.fillColor]]; this.zones.forEach(function (n, q) { A.push(["zone-area-" + q, "highcharts-area highcharts-zone-area-" + q + " " + n.className, n.color || f.color, n.fillColor || r.fillColor]) }); A.forEach(function (n) {
                            var A = n[0], l = f[A], v = l ? "animate" : "attr", x = {}; l ? (l.endX = f.preventGraphAnimation ? null : q.xMap, l.animate({ d: q })) : (x.zIndex = 0, l = f[A] = f.chart.renderer.path(q).addClass(n[1]).add(f.group), l.isArea = !0); f.chart.styledMode || (x.fill = H(n[3], G(n[2]).setOpacity(H(r.fillOpacity, .75)).get())); l[v](x); l.startX =
                                q.xMap; l.shiftUnit = r.step ? 2 : 1
                        })
                    }, drawLegendSymbol: r.drawRectangle
                }); ""
            }); N(r, "Series/SplineSeries.js", [r["Core/Utilities.js"]], function (q) {
                var f = q.pick; q = q.seriesType; q("spline", "line", {}, {
                    getPointSpline: function (q, r, G) {
                        var B = r.plotX || 0, H = r.plotY || 0, D = q[G - 1]; G = q[G + 1]; if (D && !D.isNull && !1 !== D.doCurve && !r.isCliff && G && !G.isNull && !1 !== G.doCurve && !r.isCliff) {
                            q = D.plotY || 0; var n = G.plotX || 0; G = G.plotY || 0; var I = 0; var C = (1.5 * B + (D.plotX || 0)) / 2.5; var A = (1.5 * H + q) / 2.5; n = (1.5 * B + n) / 2.5; var L = (1.5 * H + G) / 2.5; n !== C && (I =
                                (L - A) * (n - B) / (n - C) + H - L); A += I; L += I; A > q && A > H ? (A = Math.max(q, H), L = 2 * H - A) : A < q && A < H && (A = Math.min(q, H), L = 2 * H - A); L > G && L > H ? (L = Math.max(G, H), A = 2 * H - L) : L < G && L < H && (L = Math.min(G, H), A = 2 * H - L); r.rightContX = n; r.rightContY = L
                        } r = ["C", f(D.rightContX, D.plotX, 0), f(D.rightContY, D.plotY, 0), f(C, B, 0), f(A, H, 0), B, H]; D.rightContX = D.rightContY = void 0; return r
                    }
                }); ""
            }); N(r, "Series/AreaSplineSeries.js", [r["Core/Globals.js"], r["Mixins/LegendSymbol.js"], r["Core/Options.js"], r["Core/Utilities.js"]], function (q, f, r, C) {
                C = C.seriesType; q = q.seriesTypes.area.prototype;
                C("areaspline", "spline", r.defaultOptions.plotOptions.area, { getStackPoints: q.getStackPoints, getGraphPath: q.getGraphPath, drawGraph: q.drawGraph, drawLegendSymbol: f.drawRectangle }); ""
            }); N(r, "Series/ColumnSeries.js", [r["Core/Globals.js"], r["Core/Color.js"], r["Mixins/LegendSymbol.js"], r["Core/Utilities.js"]], function (q, f, r, C) {
                ""; var G = f.parse, B = C.animObject, H = C.clamp, D = C.defined, n = C.extend, I = C.isNumber, M = C.merge, A = C.pick; f = C.seriesType; var L = C.objectEach, E = q.Series; f("column", "line", {
                    borderRadius: 0, centerInCategory: !1,
                    groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff"
                }, {
                    cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () {
                        E.prototype.init.apply(this, arguments); var f = this, n = f.chart; n.hasRendered &&
                            n.series.forEach(function (l) { l.type === f.type && (l.isDirty = !0) })
                    }, getColumnMetrics: function () {
                        var f = this, n = f.options, q = f.xAxis, t = f.yAxis, g = q.options.reversedStacks; g = q.reversed && !g || !q.reversed && g; var c, p = {}, h = 0; !1 === n.grouping ? h = 1 : f.chart.series.forEach(function (a) {
                            var e = a.yAxis, g = a.options; if (a.type === f.type && (a.visible || !f.chart.options.chart.ignoreHiddenSeries) && t.len === e.len && t.pos === e.pos) {
                                if (g.stacking && "group" !== g.stacking) { c = a.stackKey; "undefined" === typeof p[c] && (p[c] = h++); var k = p[c] } else !1 !==
                                    g.grouping && (k = h++); a.columnIndex = k
                            }
                        }); var e = Math.min(Math.abs(q.transA) * (q.ordinal && q.ordinal.slope || n.pointRange || q.closestPointRange || q.tickInterval || 1), q.len), a = e * n.groupPadding, u = (e - 2 * a) / (h || 1); n = Math.min(n.maxPointWidth || q.len, A(n.pointWidth, u * (1 - 2 * n.pointPadding))); f.columnMetrics = { width: n, offset: (u - n) / 2 + (a + ((f.columnIndex || 0) + (g ? 1 : 0)) * u - e / 2) * (g ? -1 : 1), paddedWidth: u, columnCount: h }; return f.columnMetrics
                    }, crispCol: function (f, n, q, t) {
                        var g = this.chart, c = this.borderWidth, p = -(c % 2 ? .5 : 0); c = c % 2 ? .5 : 1;
                        g.inverted && g.renderer.isVML && (c += 1); this.options.crisp && (q = Math.round(f + q) + p, f = Math.round(f) + p, q -= f); t = Math.round(n + t) + c; p = .5 >= Math.abs(n) && .5 < t; n = Math.round(n) + c; t -= n; p && t && (--n, t += 1); return { x: f, y: n, width: q, height: t }
                    }, adjustForMissingColumns: function (f, n, x, t) {
                        var g = this, c = this.options.stacking; if (!x.isNull && 1 < t.columnCount) {
                            var p = 0, h = 0; L(this.yAxis.stacking && this.yAxis.stacking.stacks, function (e) {
                                if ("number" === typeof x.x && (e = e[x.x.toString()])) {
                                    var a = e.points[g.index], f = e.total; c ? (a && (p = h), e.hasValidPoints &&
                                        h++) : q.isArray(a) && (p = a[1], h = f || 0)
                                }
                            }); f = (x.plotX || 0) + ((h - 1) * t.paddedWidth + n) / 2 - n - p * t.paddedWidth
                        } return f
                    }, translate: function () {
                        var f = this, n = f.chart, q = f.options, t = f.dense = 2 > f.closestPointRange * f.xAxis.transA; t = f.borderWidth = A(q.borderWidth, t ? 0 : 1); var g = f.xAxis, c = f.yAxis, p = q.threshold, h = f.translatedThreshold = c.getThreshold(p), e = A(q.minPointLength, 5), a = f.getColumnMetrics(), u = a.width, w = f.barW = Math.max(u, 1 + 2 * t), F = f.pointXOffset = a.offset, y = f.dataMin, k = f.dataMax; n.inverted && (h -= .5); q.pointPadding && (w = Math.ceil(w));
                        E.prototype.translate.apply(f); f.points.forEach(function (l) {
                            var z = A(l.yBottom, h), t = 999 + Math.abs(z), d = u, b = l.plotX || 0; t = H(l.plotY, -t, c.len + t); var m = b + F, v = w, x = Math.min(t, z), r = Math.max(t, z) - x; if (e && Math.abs(r) < e) { r = e; var E = !c.reversed && !l.negative || c.reversed && l.negative; I(p) && I(k) && l.y === p && k <= p && (c.min || 0) < p && y !== k && (E = !E); x = Math.abs(x - h) > e ? z - e : h - (E ? e : 0) } D(l.options.pointWidth) && (d = v = Math.ceil(l.options.pointWidth), m -= Math.round((d - u) / 2)); q.centerInCategory && (m = f.adjustForMissingColumns(m, d, l, a)); l.barX =
                                m; l.pointWidth = d; l.tooltipPos = n.inverted ? [c.len + c.pos - n.plotLeft - t, g.len + g.pos - n.plotTop - (b || 0) - F - v / 2, r] : [m + v / 2, t + c.pos - n.plotTop, r]; l.shapeType = f.pointClass.prototype.shapeType || "rect"; l.shapeArgs = f.crispCol.apply(f, l.isNull ? [m, h, v, 0] : [m, x, v, r])
                        })
                    }, getSymbol: q.noop, drawLegendSymbol: r.drawRectangle, drawGraph: function () { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data") }, pointAttribs: function (f, n) {
                        var l = this.options, t = this.pointAttrToOptions || {}; var g = t.stroke || "borderColor";
                        var c = t["stroke-width"] || "borderWidth", p = f && f.color || this.color, h = f && f[g] || l[g] || this.color || p, e = f && f[c] || l[c] || this[c] || 0; t = f && f.options.dashStyle || l.dashStyle; var a = A(f && f.opacity, l.opacity, 1); if (f && this.zones.length) { var u = f.getZone(); p = f.options.color || u && (u.color || f.nonZonedColor) || this.color; u && (h = u.borderColor || h, t = u.dashStyle || t, e = u.borderWidth || e) } n && f && (f = M(l.states[n], f.options.states && f.options.states[n] || {}), n = f.brightness, p = f.color || "undefined" !== typeof n && G(p).brighten(f.brightness).get() ||
                            p, h = f[g] || h, e = f[c] || e, t = f.dashStyle || t, a = A(f.opacity, a)); g = { fill: p, stroke: h, "stroke-width": e, opacity: a }; t && (g.dashstyle = t); return g
                    }, drawPoints: function () {
                        var f = this, n = this.chart, q = f.options, t = n.renderer, g = q.animationLimit || 250, c; f.points.forEach(function (p) {
                            var h = p.graphic, e = !!h, a = h && n.pointCount < g ? "animate" : "attr"; if (I(p.plotY) && null !== p.y) {
                                c = p.shapeArgs; h && p.hasNewShapeType() && (h = h.destroy()); f.enabledDataSorting && (p.startXPos = f.xAxis.reversed ? -(c ? c.width : 0) : f.xAxis.width); h || (p.graphic = h = t[p.shapeType](c).add(p.group ||
                                    f.group)) && f.enabledDataSorting && n.hasRendered && n.pointCount < g && (h.attr({ x: p.startXPos }), e = !0, a = "animate"); if (h && e) h[a](M(c)); if (q.borderRadius) h[a]({ r: q.borderRadius }); n.styledMode || h[a](f.pointAttribs(p, p.selected && "select")).shadow(!1 !== p.allowShadow && q.shadow, null, q.stacking && !q.borderRadius); h.addClass(p.getClassName(), !0)
                            } else h && (p.graphic = h.destroy())
                        })
                    }, animate: function (f) {
                        var l = this, q = this.yAxis, t = l.options, g = this.chart.inverted, c = {}, p = g ? "translateX" : "translateY"; if (f) c.scaleY = .001, f = H(q.toPixels(t.threshold),
                            q.pos, q.pos + q.len), g ? c.translateX = f - q.len : c.translateY = f, l.clipBox && l.setClip(), l.group.attr(c); else { var h = l.group.attr(p); l.group.animate({ scaleY: 1 }, n(B(l.options.animation), { step: function (e, a) { l.group && (c[p] = h + a.pos * (q.pos - h), l.group.attr(c)) } })) }
                    }, remove: function () { var f = this, n = f.chart; n.hasRendered && n.series.forEach(function (l) { l.type === f.type && (l.isDirty = !0) }); E.prototype.remove.apply(f, arguments) }
                }); ""
            }); N(r, "Series/BarSeries.js", [r["Core/Utilities.js"]], function (q) {
                q = q.seriesType; q("bar", "column",
                    null, { inverted: !0 }); ""
            }); N(r, "Series/ScatterSeries.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
                var r = f.addEvent; f = f.seriesType; var C = q.Series; f("scatter", "line", { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: !0 }, tooltip: { headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } }, {
                    sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group",
                        "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function () { this.options.lineWidth && C.prototype.drawGraph.call(this) }, applyJitter: function () {
                            var f = this, q = this.options.jitter, r = this.points.length; q && this.points.forEach(function (B, n) {
                                ["x", "y"].forEach(function (H, D) {
                                    var A = "plot" + H.toUpperCase(); if (q[H] && !B.isNull) {
                                        var L = f[H + "Axis"]; var E = q[H] * L.transA; if (L && !L.isLog) {
                                            var l = Math.max(0, B[A] - E); L = Math.min(L.len, B[A] + E); D = 1E4 * Math.sin(n + D * r); B[A] = l + (L - l) * (D - Math.floor(D)); "x" === H && (B.clientX =
                                                B.plotX)
                                        }
                                    }
                                })
                            })
                        }
                }); r(C, "afterTranslate", function () { this.applyJitter && this.applyJitter() }); ""
            }); N(r, "Mixins/CenteredSeries.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
                var r = f.isNumber, C = f.pick, G = f.relativeLength, B = q.deg2rad; return q.CenteredSeriesMixin = {
                    getCenter: function () {
                        var f = this.options, r = this.chart, n = 2 * (f.slicedOffset || 0), B = r.plotWidth - 2 * n, M = r.plotHeight - 2 * n, A = f.center, L = Math.min(B, M), E = f.size, l = f.innerSize || 0; "string" === typeof E && (E = parseFloat(E)); "string" === typeof l && (l =
                            parseFloat(l)); f = [C(A[0], "50%"), C(A[1], "50%"), C(E && 0 > E ? void 0 : f.size, "100%"), C(l && 0 > l ? void 0 : f.innerSize || 0, "0%")]; !r.angular || this instanceof q.Series || (f[3] = 0); for (A = 0; 4 > A; ++A)E = f[A], r = 2 > A || 2 === A && /%$/.test(E), f[A] = G(E, [B, M, L, f[2]][A]) + (r ? n : 0); f[3] > f[2] && (f[3] = f[2]); return f
                    }, getStartAndEndRadians: function (f, q) { f = r(f) ? f : 0; q = r(q) && q > f && 360 > q - f ? q : f + 360; return { start: B * (f + -90), end: B * (q + -90) } }
                }
            }); N(r, "Series/PieSeries.js", [r["Core/Globals.js"], r["Core/Renderer/SVG/SVGRenderer.js"], r["Mixins/LegendSymbol.js"],
            r["Core/Series/Point.js"], r["Core/Utilities.js"], r["Mixins/CenteredSeries.js"]], function (q, f, r, C, G, B) {
                var H = G.addEvent, D = G.clamp, n = G.defined, I = G.fireEvent, M = G.isNumber, A = G.merge, L = G.pick, E = G.relativeLength, l = G.seriesType, v = G.setAnimation, x = B.getStartAndEndRadians; G = q.noop; var t = q.Series; l("pie", "line", {
                    center: [null, null], clip: !1, colorByPoint: !0, dataLabels: {
                        allowOverlap: !0, connectorPadding: 5, connectorShape: "fixedOffset", crookDistance: "70%", distance: 30, enabled: !0, formatter: function () {
                            return this.point.isNull ?
                                void 0 : this.point.name
                        }, softConnector: !0, x: 0
                    }, fillColor: void 0, ignoreHiddenPoint: !0, inactiveOtherPoints: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: .1 } }
                }, {
                    isCartesian: !1, requireSorting: !1, directTouch: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttribs: q.seriesTypes.column.prototype.pointAttribs, animate: function (g) {
                        var c =
                            this, f = c.points, h = c.startAngleRad; g || f.forEach(function (e) { var a = e.graphic, g = e.shapeArgs; a && g && (a.attr({ r: L(e.startR, c.center && c.center[3] / 2), start: h, end: h }), a.animate({ r: g.r, start: g.start, end: g.end }, c.options.animation)) })
                    }, hasData: function () { return !!this.processedXData.length }, updateTotals: function () {
                        var g, c = 0, f = this.points, h = f.length, e = this.options.ignoreHiddenPoint; for (g = 0; g < h; g++) { var a = f[g]; c += e && !a.visible ? 0 : a.isNull ? 0 : a.y } this.total = c; for (g = 0; g < h; g++)a = f[g], a.percentage = 0 < c && (a.visible || !e) ?
                            a.y / c * 100 : 0, a.total = c
                    }, generatePoints: function () { t.prototype.generatePoints.call(this); this.updateTotals() }, getX: function (g, c, f) { var h = this.center, e = this.radii ? this.radii[f.index] : h[2] / 2; g = Math.asin(D((g - h[1]) / (e + f.labelDistance), -1, 1)); return h[0] + (c ? -1 : 1) * Math.cos(g) * (e + f.labelDistance) + (0 < f.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0) }, translate: function (g) {
                        this.generatePoints(); var c = 0, f = this.options, h = f.slicedOffset, e = h + (f.borderWidth || 0), a = x(f.startAngle, f.endAngle), l = this.startAngleRad =
                            a.start; a = (this.endAngleRad = a.end) - l; var w = this.points, n = f.dataLabels.distance; f = f.ignoreHiddenPoint; var y, k = w.length; g || (this.center = g = this.getCenter()); for (y = 0; y < k; y++) {
                                var z = w[y]; var t = l + c * a; if (!f || z.visible) c += z.percentage / 100; var q = l + c * a; z.shapeType = "arc"; z.shapeArgs = { x: g[0], y: g[1], r: g[2] / 2, innerR: g[3] / 2, start: Math.round(1E3 * t) / 1E3, end: Math.round(1E3 * q) / 1E3 }; z.labelDistance = L(z.options.dataLabels && z.options.dataLabels.distance, n); z.labelDistance = E(z.labelDistance, z.shapeArgs.r); this.maxLabelDistance =
                                    Math.max(this.maxLabelDistance || 0, z.labelDistance); q = (q + t) / 2; q > 1.5 * Math.PI ? q -= 2 * Math.PI : q < -Math.PI / 2 && (q += 2 * Math.PI); z.slicedTranslation = { translateX: Math.round(Math.cos(q) * h), translateY: Math.round(Math.sin(q) * h) }; var d = Math.cos(q) * g[2] / 2; var b = Math.sin(q) * g[2] / 2; z.tooltipPos = [g[0] + .7 * d, g[1] + .7 * b]; z.half = q < -Math.PI / 2 || q > Math.PI / 2 ? 1 : 0; z.angle = q; t = Math.min(e, z.labelDistance / 5); z.labelPosition = {
                                        natural: { x: g[0] + d + Math.cos(q) * z.labelDistance, y: g[1] + b + Math.sin(q) * z.labelDistance }, "final": {}, alignment: 0 >
                                            z.labelDistance ? "center" : z.half ? "right" : "left", connectorPosition: { breakAt: { x: g[0] + d + Math.cos(q) * t, y: g[1] + b + Math.sin(q) * t }, touchingSliceAt: { x: g[0] + d, y: g[1] + b } }
                                    }
                            } I(this, "afterTranslate")
                    }, drawEmpty: function () {
                        var g = this.startAngleRad, c = this.endAngleRad, p = this.options; if (0 === this.total && this.center) {
                            var h = this.center[0]; var e = this.center[1]; this.graph || (this.graph = this.chart.renderer.arc(h, e, this.center[1] / 2, 0, g, c).addClass("highcharts-empty-series").add(this.group)); this.graph.attr({
                                d: f.prototype.symbols.arc(h,
                                    e, this.center[2] / 2, 0, { start: g, end: c, innerR: this.center[3] / 2 })
                            }); this.chart.styledMode || this.graph.attr({ "stroke-width": p.borderWidth, fill: p.fillColor || "none", stroke: p.color || "#cccccc" })
                        } else this.graph && (this.graph = this.graph.destroy())
                    }, redrawPoints: function () {
                        var g = this, c = g.chart, f = c.renderer, h, e, a, l, w = g.options.shadow; this.drawEmpty(); !w || g.shadowGroup || c.styledMode || (g.shadowGroup = f.g("shadow").attr({ zIndex: -1 }).add(g.group)); g.points.forEach(function (p) {
                            var u = {}; e = p.graphic; if (!p.isNull && e) {
                                l =
                                p.shapeArgs; h = p.getTranslate(); if (!c.styledMode) { var k = p.shadowGroup; w && !k && (k = p.shadowGroup = f.g("shadow").add(g.shadowGroup)); k && k.attr(h); a = g.pointAttribs(p, p.selected && "select") } p.delayedRendering ? (e.setRadialReference(g.center).attr(l).attr(h), c.styledMode || e.attr(a).attr({ "stroke-linejoin": "round" }).shadow(w, k), p.delayedRendering = !1) : (e.setRadialReference(g.center), c.styledMode || A(!0, u, a), A(!0, u, l, h), e.animate(u)); e.attr({ visibility: p.visible ? "inherit" : "hidden" }); e.addClass(p.getClassName())
                            } else e &&
                                (p.graphic = e.destroy())
                        })
                    }, drawPoints: function () { var g = this.chart.renderer; this.points.forEach(function (c) { c.graphic && c.hasNewShapeType() && (c.graphic = c.graphic.destroy()); c.graphic || (c.graphic = g[c.shapeType](c.shapeArgs).add(c.series.group), c.delayedRendering = !0) }) }, searchPoint: G, sortByAngle: function (g, c) { g.sort(function (g, h) { return "undefined" !== typeof g.angle && (h.angle - g.angle) * c }) }, drawLegendSymbol: r.drawRectangle, getCenter: B.getCenter, getSymbol: G, drawGraph: null
                }, {
                    init: function () {
                        C.prototype.init.apply(this,
                            arguments); var g = this; g.name = L(g.name, "Slice"); var c = function (c) { g.slice("select" === c.type) }; H(g, "select", c); H(g, "unselect", c); return g
                    }, isValid: function () { return M(this.y) && 0 <= this.y }, setVisible: function (g, c) {
                        var f = this, h = f.series, e = h.chart, a = h.options.ignoreHiddenPoint; c = L(c, a); g !== f.visible && (f.visible = f.options.visible = g = "undefined" === typeof g ? !f.visible : g, h.options.data[h.data.indexOf(f)] = f.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (a) { if (f[a]) f[a][g ? "show" : "hide"](!0) }),
                            f.legendItem && e.legend.colorizeItem(f, g), g || "hover" !== f.state || f.setState(""), a && (h.isDirty = !0), c && e.redraw())
                    }, slice: function (g, c, f) { var h = this.series; v(f, h.chart); L(c, !0); this.sliced = this.options.sliced = n(g) ? g : !this.sliced; h.options.data[h.data.indexOf(this)] = this.options; this.graphic && this.graphic.animate(this.getTranslate()); this.shadowGroup && this.shadowGroup.animate(this.getTranslate()) }, getTranslate: function () { return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 } }, haloPath: function (g) {
                        var c =
                            this.shapeArgs; return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + g, c.r + g, { innerR: c.r - 1, start: c.start, end: c.end })
                    }, connectorShapes: {
                        fixedOffset: function (g, c, f) { var h = c.breakAt; c = c.touchingSliceAt; return [["M", g.x, g.y], f.softConnector ? ["C", g.x + ("left" === g.alignment ? -5 : 5), g.y, 2 * h.x - c.x, 2 * h.y - c.y, h.x, h.y] : ["L", h.x, h.y], ["L", c.x, c.y]] }, straight: function (g, c) { c = c.touchingSliceAt; return [["M", g.x, g.y], ["L", c.x, c.y]] }, crookedLine: function (g, c, f) {
                            c = c.touchingSliceAt; var h =
                                this.series, e = h.center[0], a = h.chart.plotWidth, p = h.chart.plotLeft; h = g.alignment; var l = this.shapeArgs.r; f = E(f.crookDistance, 1); a = "left" === h ? e + l + (a + p - e - l) * (1 - f) : p + (e - l) * f; f = ["L", a, g.y]; e = !0; if ("left" === h ? a > g.x || a < c.x : a < g.x || a > c.x) e = !1; g = [["M", g.x, g.y]]; e && g.push(f); g.push(["L", c.x, c.y]); return g
                        }
                    }, getConnectorPath: function () {
                        var g = this.labelPosition, c = this.series.options.dataLabels, f = c.connectorShape, h = this.connectorShapes; h[f] && (f = h[f]); return f.call(this, { x: g.final.x, y: g.final.y, alignment: g.alignment },
                            g.connectorPosition, c)
                    }
                }); ""
            }); N(r, "Core/Series/DataLabels.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
                var r = q.noop, C = q.seriesTypes, G = f.arrayMax, B = f.clamp, H = f.defined, D = f.extend, n = f.fireEvent, I = f.format, M = f.getDeferredAnimation, A = f.isArray, L = f.merge, E = f.objectEach, l = f.pick, v = f.relativeLength, x = f.splat, t = f.stableSort, g = q.Series; q.distribute = function (c, g, h) {
                    function e(a, c) { return a.target - c.target } var a, f = !0, p = c, n = []; var y = 0; var k = p.reducedLen || g; for (a = c.length; a--;)y += c[a].size;
                    if (y > k) { t(c, function (a, c) { return (c.rank || 0) - (a.rank || 0) }); for (y = a = 0; y <= k;)y += c[a].size, a++; n = c.splice(a - 1, c.length) } t(c, e); for (c = c.map(function (a) { return { size: a.size, targets: [a.target], align: l(a.align, .5) } }); f;) {
                        for (a = c.length; a--;)f = c[a], y = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = B(y - f.size * f.align, 0, g - f.size); a = c.length; for (f = !1; a--;)0 < a && c[a - 1].pos + c[a - 1].size > c[a].pos && (c[a - 1].size += c[a].size, c[a - 1].targets = c[a - 1].targets.concat(c[a].targets), c[a - 1].align = .5, c[a - 1].pos +
                            c[a - 1].size > g && (c[a - 1].pos = g - c[a - 1].size), c.splice(a, 1), f = !0)
                    } p.push.apply(p, n); a = 0; c.some(function (c) { var e = 0; if (c.targets.some(function () { p[a].pos = c.pos + e; if ("undefined" !== typeof h && Math.abs(p[a].pos - p[a].target) > h) return p.slice(0, a + 1).forEach(function (a) { delete a.pos }), p.reducedLen = (p.reducedLen || g) - .1 * g, p.reducedLen > .1 * g && q.distribute(p, g, h), !0; e += p[a].size; a++ })) return !0 }); t(p, e)
                }; g.prototype.drawDataLabels = function () {
                    function c(a, d) {
                        var b = d.filter; return b ? (d = b.operator, a = a[b.property], b = b.value,
                            ">" === d && a > b || "<" === d && a < b || ">=" === d && a >= b || "<=" === d && a <= b || "==" === d && a == b || "===" === d && a === b ? !0 : !1) : !0
                    } function g(a, d) { var b = [], c; if (A(a) && !A(d)) b = a.map(function (b) { return L(b, d) }); else if (A(d) && !A(a)) b = d.map(function (b) { return L(a, b) }); else if (A(a) || A(d)) for (c = Math.max(a.length, d.length); c--;)b[c] = L(a[c], d[c]); else b = L(a, d); return b } var f = this, e = f.chart, a = f.options, u = a.dataLabels, w = f.points, t, y = f.hasRendered || 0, k = u.animation; k = u.defer ? M(e, k, f) : { defer: 0, duration: 0 }; var z = e.renderer; u = g(g(e.options.plotOptions &&
                        e.options.plotOptions.series && e.options.plotOptions.series.dataLabels, e.options.plotOptions && e.options.plotOptions[f.type] && e.options.plotOptions[f.type].dataLabels), u); n(this, "drawDataLabels"); if (A(u) || u.enabled || f._hasPointLabels) {
                            var q = f.plotGroup("dataLabelsGroup", "data-labels", y ? "inherit" : "hidden", u.zIndex || 6); q.attr({ opacity: +y }); !y && (y = f.dataLabelsGroup) && (f.visible && q.show(!0), y[a.animation ? "animate" : "attr"]({ opacity: 1 }, k)); w.forEach(function (k) {
                                t = x(g(u, k.dlOptions || k.options && k.options.dataLabels));
                                t.forEach(function (d, b) {
                                    var g = d.enabled && (!k.isNull || k.dataLabelOnNull) && c(k, d), h = k.dataLabels ? k.dataLabels[b] : k.dataLabel, p = k.connectors ? k.connectors[b] : k.connector, u = l(d.distance, k.labelDistance), w = !h; if (g) {
                                        var y = k.getLabelConfig(); var n = l(d[k.formatPrefix + "Format"], d.format); y = H(n) ? I(n, y, e) : (d[k.formatPrefix + "Formatter"] || d.formatter).call(y, d); n = d.style; var t = d.rotation; e.styledMode || (n.color = l(d.color, n.color, f.color, "#000000"), "contrast" === n.color ? (k.contrastColor = z.getContrast(k.color || f.color),
                                            n.color = !H(u) && d.inside || 0 > u || a.stacking ? k.contrastColor : "#000000") : delete k.contrastColor, a.cursor && (n.cursor = a.cursor)); var v = { r: d.borderRadius || 0, rotation: t, padding: d.padding, zIndex: 1 }; e.styledMode || (v.fill = d.backgroundColor, v.stroke = d.borderColor, v["stroke-width"] = d.borderWidth); E(v, function (b, d) { "undefined" === typeof b && delete v[d] })
                                    } !h || g && H(y) ? g && H(y) && (h ? v.text = y : (k.dataLabels = k.dataLabels || [], h = k.dataLabels[b] = t ? z.text(y, 0, -9999, d.useHTML).addClass("highcharts-data-label") : z.label(y, 0, -9999,
                                        d.shape, null, null, d.useHTML, null, "data-label"), b || (k.dataLabel = h), h.addClass(" highcharts-data-label-color-" + k.colorIndex + " " + (d.className || "") + (d.useHTML ? " highcharts-tracker" : ""))), h.options = d, h.attr(v), e.styledMode || h.css(n).shadow(d.shadow), h.added || h.add(q), d.textPath && !d.useHTML && (h.setTextPath(k.getDataLabelPath && k.getDataLabelPath(h) || k.graphic, d.textPath), k.dataLabelPath && !d.textPath.enabled && (k.dataLabelPath = k.dataLabelPath.destroy())), f.alignDataLabel(k, h, d, null, w)) : (k.dataLabel = k.dataLabel &&
                                            k.dataLabel.destroy(), k.dataLabels && (1 === k.dataLabels.length ? delete k.dataLabels : delete k.dataLabels[b]), b || delete k.dataLabel, p && (k.connector = k.connector.destroy(), k.connectors && (1 === k.connectors.length ? delete k.connectors : delete k.connectors[b])))
                                })
                            })
                        } n(this, "afterDrawDataLabels")
                }; g.prototype.alignDataLabel = function (c, g, f, e, a) {
                    var h = this, p = this.chart, n = this.isCartesian && p.inverted, y = this.enabledDataSorting, k = l(c.dlBox && c.dlBox.centerX, c.plotX, -9999), z = l(c.plotY, -9999), t = g.getBBox(), q = f.rotation,
                    d = f.align, b = p.isInsidePlot(k, Math.round(z), n), m = "justify" === l(f.overflow, y ? "none" : "justify"), v = this.visible && !1 !== c.visible && (c.series.forceDL || y && !m || b || f.inside && e && p.isInsidePlot(k, n ? e.x + 1 : e.y + e.height - 1, n)); var r = function (d) { y && h.xAxis && !m && h.setDataLabelStartPos(c, g, a, b, d) }; if (v) {
                        var x = p.renderer.fontMetrics(p.styledMode ? void 0 : f.style.fontSize, g).b; e = D({ x: n ? this.yAxis.len - z : k, y: Math.round(n ? this.xAxis.len - k : z), width: 0, height: 0 }, e); D(f, { width: t.width, height: t.height }); q ? (m = !1, k = p.renderer.rotCorr(x,
                            q), k = { x: e.x + (f.x || 0) + e.width / 2 + k.x, y: e.y + (f.y || 0) + { top: 0, middle: .5, bottom: 1 }[f.verticalAlign] * e.height }, r(k), g[a ? "attr" : "animate"](k).attr({ align: d }), r = (q + 720) % 360, r = 180 < r && 360 > r, "left" === d ? k.y -= r ? t.height : 0 : "center" === d ? (k.x -= t.width / 2, k.y -= t.height / 2) : "right" === d && (k.x -= t.width, k.y -= r ? 0 : t.height), g.placed = !0, g.alignAttr = k) : (r(e), g.align(f, null, e), k = g.alignAttr); m && 0 <= e.height ? this.justifyDataLabel(g, f, k, t, e, a) : l(f.crop, !0) && (v = p.isInsidePlot(k.x, k.y) && p.isInsidePlot(k.x + t.width, k.y + t.height)); if (f.shape &&
                                !q) g[a ? "attr" : "animate"]({ anchorX: n ? p.plotWidth - c.plotY : c.plotX, anchorY: n ? p.plotHeight - c.plotX : c.plotY })
                    } a && y && (g.placed = !1); v || y && !m || (g.hide(!0), g.placed = !1)
                }; g.prototype.setDataLabelStartPos = function (c, g, f, e, a) {
                    var h = this.chart, p = h.inverted, l = this.xAxis, y = l.reversed, k = p ? g.height / 2 : g.width / 2; c = (c = c.pointWidth) ? c / 2 : 0; l = p ? a.x : y ? -k - c : l.width - k + c; a = p ? y ? this.yAxis.height - k + c : -k - c : a.y; g.startXPos = l; g.startYPos = a; e ? "hidden" === g.visibility && (g.show(), g.attr({ opacity: 0 }).animate({ opacity: 1 })) : g.attr({ opacity: 1 }).animate({ opacity: 0 },
                        void 0, g.hide); h.hasRendered && (f && g.attr({ x: g.startXPos, y: g.startYPos }), g.placed = !0)
                }; g.prototype.justifyDataLabel = function (c, g, f, e, a, l) {
                    var h = this.chart, p = g.align, u = g.verticalAlign, k = c.box ? 0 : c.padding || 0, z = g.x; z = void 0 === z ? 0 : z; var n = g.y; var t = void 0 === n ? 0 : n; n = f.x + k; if (0 > n) { "right" === p && 0 <= z ? (g.align = "left", g.inside = !0) : z -= n; var d = !0 } n = f.x + e.width - k; n > h.plotWidth && ("left" === p && 0 >= z ? (g.align = "right", g.inside = !0) : z += h.plotWidth - n, d = !0); n = f.y + k; 0 > n && ("bottom" === u && 0 <= t ? (g.verticalAlign = "top", g.inside =
                        !0) : t -= n, d = !0); n = f.y + e.height - k; n > h.plotHeight && ("top" === u && 0 >= t ? (g.verticalAlign = "bottom", g.inside = !0) : t += h.plotHeight - n, d = !0); d && (g.x = z, g.y = t, c.placed = !l, c.align(g, void 0, a)); return d
                }; C.pie && (C.pie.prototype.dataLabelPositioners = {
                    radialDistributionY: function (c) { return c.top + c.distributeBox.pos }, radialDistributionX: function (c, g, f, e) { return c.getX(f < g.top + 2 || f > g.bottom - 2 ? e : f, g.half, g) }, justify: function (c, g, f) { return f[0] + (c.half ? -1 : 1) * (g + c.labelDistance) }, alignToPlotEdges: function (c, g, f, e) {
                        c = c.getBBox().width;
                        return g ? c + e : f - c - e
                    }, alignToConnectors: function (c, g, f, e) { var a = 0, h; c.forEach(function (c) { h = c.dataLabel.getBBox().width; h > a && (a = h) }); return g ? a + e : f - a - e }
                }, C.pie.prototype.drawDataLabels = function () {
                    var c = this, f = c.data, h, e = c.chart, a = c.options.dataLabels || {}, u = a.connectorPadding, w, n = e.plotWidth, y = e.plotHeight, k = e.plotLeft, z = Math.round(e.chartWidth / 3), t, v = c.center, d = v[2] / 2, b = v[1], m, r, x, A, E = [[], []], B, C, D, I, M = [0, 0, 0, 0], N = c.dataLabelPositioners, R; c.visible && (a.enabled || c._hasPointLabels) && (f.forEach(function (b) {
                    b.dataLabel &&
                        b.visible && b.dataLabel.shortened && (b.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), b.dataLabel.shortened = !1)
                    }), g.prototype.drawDataLabels.apply(c), f.forEach(function (b) {
                    b.dataLabel && (b.visible ? (E[b.half].push(b), b.dataLabel._pos = null, !H(a.style.width) && !H(b.options.dataLabels && b.options.dataLabels.style && b.options.dataLabels.style.width) && b.dataLabel.getBBox().width > z && (b.dataLabel.css({ width: Math.round(.7 * z) + "px" }), b.dataLabel.shortened = !0)) : (b.dataLabel = b.dataLabel.destroy(),
                        b.dataLabels && 1 === b.dataLabels.length && delete b.dataLabels))
                    }), E.forEach(function (g, f) {
                        var p = g.length, z = [], w; if (p) {
                            c.sortByAngle(g, f - .5); if (0 < c.maxLabelDistance) {
                                var t = Math.max(0, b - d - c.maxLabelDistance); var F = Math.min(b + d + c.maxLabelDistance, e.plotHeight); g.forEach(function (a) {
                                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, b - d - a.labelDistance), a.bottom = Math.min(b + d + a.labelDistance, e.plotHeight), w = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                    target: a.labelPosition.natural.y - a.top + w / 2, size: w,
                                    rank: a.y
                                }, z.push(a.distributeBox))
                                }); t = F + w - t; q.distribute(z, t, t / 5)
                            } for (I = 0; I < p; I++) {
                                h = g[I]; x = h.labelPosition; m = h.dataLabel; D = !1 === h.visible ? "hidden" : "inherit"; C = t = x.natural.y; z && H(h.distributeBox) && ("undefined" === typeof h.distributeBox.pos ? D = "hidden" : (A = h.distributeBox.size, C = N.radialDistributionY(h))); delete h.positionIndex; if (a.justify) B = N.justify(h, d, v); else switch (a.alignTo) {
                                    case "connectors": B = N.alignToConnectors(g, f, n, k); break; case "plotEdges": B = N.alignToPlotEdges(m, f, n, k); break; default: B = N.radialDistributionX(c,
                                        h, C, t)
                                }m._attr = { visibility: D, align: x.alignment }; R = h.options.dataLabels || {}; m._pos = { x: B + l(R.x, a.x) + ({ left: u, right: -u }[x.alignment] || 0), y: C + l(R.y, a.y) - 10 }; x.final.x = B; x.final.y = C; l(a.crop, !0) && (r = m.getBBox().width, t = null, B - r < u && 1 === f ? (t = Math.round(r - B + u), M[3] = Math.max(t, M[3])) : B + r > n - u && 0 === f && (t = Math.round(B + r - n + u), M[1] = Math.max(t, M[1])), 0 > C - A / 2 ? M[0] = Math.max(Math.round(-C + A / 2), M[0]) : C + A / 2 > y && (M[2] = Math.max(Math.round(C + A / 2 - y), M[2])), m.sideOverflow = t)
                            }
                        }
                    }), 0 === G(M) || this.verifyDataLabelOverflow(M)) &&
                        (this.placeDataLabels(), this.points.forEach(function (b) {
                            R = L(a, b.options.dataLabels); if (w = l(R.connectorWidth, 1)) {
                                var d; t = b.connector; if ((m = b.dataLabel) && m._pos && b.visible && 0 < b.labelDistance) {
                                    D = m._attr.visibility; if (d = !t) b.connector = t = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b.colorIndex + (b.className ? " " + b.className : "")).add(c.dataLabelsGroup), e.styledMode || t.attr({ "stroke-width": w, stroke: R.connectorColor || b.color || "#666666" }); t[d ? "attr" : "animate"]({ d: b.getConnectorPath() });
                                    t.attr("visibility", D)
                                } else t && (b.connector = t.destroy())
                            }
                        }))
                }, C.pie.prototype.placeDataLabels = function () { this.points.forEach(function (c) { var g = c.dataLabel, f; g && c.visible && ((f = g._pos) ? (g.sideOverflow && (g._attr.width = Math.max(g.getBBox().width - g.sideOverflow, 0), g.css({ width: g._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), g.shortened = !0), g.attr(g._attr), g[g.moved ? "animate" : "attr"](f), g.moved = !0) : g && g.attr({ y: -9999 })); delete c.distributeBox }, this) }, C.pie.prototype.alignDataLabel =
                    r, C.pie.prototype.verifyDataLabelOverflow = function (c) { var g = this.center, f = this.options, e = f.center, a = f.minSize || 80, l = null !== f.size; if (!l) { if (null !== e[0]) var w = Math.max(g[2] - Math.max(c[1], c[3]), a); else w = Math.max(g[2] - c[1] - c[3], a), g[0] += (c[3] - c[1]) / 2; null !== e[1] ? w = B(w, a, g[2] - Math.max(c[0], c[2])) : (w = B(w, a, g[2] - c[0] - c[2]), g[1] += (c[0] - c[2]) / 2); w < g[2] ? (g[2] = w, g[3] = Math.min(v(f.innerSize || 0, w), w), this.translate(g), this.drawDataLabels && this.drawDataLabels()) : l = !0 } return l }); C.column && (C.column.prototype.alignDataLabel =
                        function (c, f, h, e, a) {
                            var p = this.chart.inverted, w = c.series, t = c.dlBox || c.shapeArgs, y = l(c.below, c.plotY > l(this.translatedThreshold, w.yAxis.len)), k = l(h.inside, !!this.options.stacking); t && (e = L(t), 0 > e.y && (e.height += e.y, e.y = 0), t = e.y + e.height - w.yAxis.len, 0 < t && t < e.height && (e.height -= t), p && (e = { x: w.yAxis.len - e.y - e.height, y: w.xAxis.len - e.x - e.width, width: e.height, height: e.width }), k || (p ? (e.x += y ? 0 : e.width, e.width = 0) : (e.y += y ? e.height : 0, e.height = 0))); h.align = l(h.align, !p || k ? "center" : y ? "right" : "left"); h.verticalAlign =
                                l(h.verticalAlign, p || k ? "middle" : y ? "top" : "bottom"); g.prototype.alignDataLabel.call(this, c, f, h, e, a); h.inside && c.contrastColor && f.css({ color: c.contrastColor })
                        })
            }); N(r, "Extensions/OverlappingDataLabels.js", [r["Core/Chart/Chart.js"], r["Core/Utilities.js"]], function (q, f) {
                var r = f.addEvent, C = f.fireEvent, G = f.isArray, B = f.isNumber, H = f.objectEach, D = f.pick; r(q, "render", function () {
                    var f = []; (this.labelCollectors || []).forEach(function (n) { f = f.concat(n()) }); (this.yAxis || []).forEach(function (n) {
                    n.stacking && n.options.stackLabels &&
                        !n.options.stackLabels.allowOverlap && H(n.stacking.stacks, function (n) { H(n, function (n) { f.push(n.label) }) })
                    }); (this.series || []).forEach(function (n) { var q = n.options.dataLabels; n.visible && (!1 !== q.enabled || n._hasPointLabels) && (n.nodes || n.points).forEach(function (n) { n.visible && (G(n.dataLabels) ? n.dataLabels : n.dataLabel ? [n.dataLabel] : []).forEach(function (q) { var r = q.options; q.labelrank = D(r.labelrank, n.labelrank, n.shapeArgs && n.shapeArgs.height); r.allowOverlap || f.push(q) }) }) }); this.hideOverlappingLabels(f)
                });
                q.prototype.hideOverlappingLabels = function (f) {
                    var n = this, q = f.length, r = n.renderer, L, E, l, v = !1; var x = function (c) {
                        var g, f = c.box ? 0 : c.padding || 0, e = g = 0, a; if (c && (!c.alignAttr || c.placed)) {
                            var l = c.alignAttr || { x: c.attr("x"), y: c.attr("y") }; var w = c.parentGroup; c.width || (g = c.getBBox(), c.width = g.width, c.height = g.height, g = r.fontMetrics(null, c.element).h); var n = c.width - 2 * f; (a = { left: "0", center: "0.5", right: "1" }[c.alignValue]) ? e = +a * n : B(c.x) && Math.round(c.x) !== c.translateX && (e = c.x - c.translateX); return {
                                x: l.x + (w.translateX ||
                                    0) + f - (e || 0), y: l.y + (w.translateY || 0) + f - g, width: c.width - 2 * f, height: c.height - 2 * f
                            }
                        }
                    }; for (E = 0; E < q; E++)if (L = f[E]) L.oldOpacity = L.opacity, L.newOpacity = 1, L.absoluteBox = x(L); f.sort(function (c, g) { return (g.labelrank || 0) - (c.labelrank || 0) }); for (E = 0; E < q; E++) { var t = (x = f[E]) && x.absoluteBox; for (L = E + 1; L < q; ++L) { var g = (l = f[L]) && l.absoluteBox; !t || !g || x === l || 0 === x.newOpacity || 0 === l.newOpacity || g.x >= t.x + t.width || g.x + g.width <= t.x || g.y >= t.y + t.height || g.y + g.height <= t.y || ((x.labelrank < l.labelrank ? x : l).newOpacity = 0) } } f.forEach(function (c) {
                        if (c) {
                            var g =
                                c.newOpacity; c.oldOpacity !== g && (c.alignAttr && c.placed ? (c[g ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), v = !0, c.alignAttr.opacity = g, c[c.isOld ? "animate" : "attr"](c.alignAttr, null, function () { n.styledMode || c.css({ pointerEvents: g ? "auto" : "none" }); c.visibility = g ? "inherit" : "hidden" }), C(n, "afterHideOverlappingLabel")) : c.attr({ opacity: g })); c.isOld = !0
                        }
                    }); v && C(n, "afterHideAllOverlappingLabels")
                }
            }); N(r, "Core/Interaction.js", [r["Core/Chart/Chart.js"], r["Core/Globals.js"], r["Core/Legend.js"], r["Core/Options.js"],
            r["Core/Series/Point.js"], r["Core/Utilities.js"]], function (q, f, r, C, G, B) {
                var H = C.defaultOptions, D = B.addEvent, n = B.createElement, I = B.css, M = B.defined, A = B.extend, L = B.fireEvent, E = B.isArray, l = B.isFunction, v = B.isNumber, x = B.isObject, t = B.merge, g = B.objectEach, c = B.pick, p = f.hasTouch; C = f.Series; B = f.seriesTypes; var h = f.svg; var e = f.TrackerMixin = {
                    drawTrackerPoint: function () {
                        var a = this, c = a.chart, e = c.pointer, g = function (a) { var c = e.getPointFromEvent(a); "undefined" !== typeof c && (e.isDirectTouch = !0, c.onMouseOver(a)) }, f;
                        a.points.forEach(function (a) { f = E(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : []; a.graphic && (a.graphic.element.point = a); f.forEach(function (c) { c.div ? c.div.point = a : c.element.point = a }) }); a._hasTracking || (a.trackerGroups.forEach(function (k) { if (a[k]) { a[k].addClass("highcharts-tracker").on("mouseover", g).on("mouseout", function (a) { e.onTrackerMouseOut(a) }); if (p) a[k].on("touchstart", g); !c.styledMode && a.options.cursor && a[k].css(I).css({ cursor: a.options.cursor }) } }), a._hasTracking = !0); L(this, "afterDrawTracker")
                    },
                    drawTrackerGraph: function () {
                        var a = this, c = a.options, e = c.trackByArea, g = [].concat(e ? a.areaPath : a.graphPath), f = a.chart, k = f.pointer, l = f.renderer, n = f.options.tooltip.snap, t = a.tracker, d = function (b) { if (f.hoverSeries !== a) a.onMouseOver() }, b = "rgba(192,192,192," + (h ? .0001 : .002) + ")"; t ? t.attr({ d: g }) : a.graph && (a.tracker = l.path(g).attr({ visibility: a.visible ? "visible" : "hidden", zIndex: 2 }).addClass(e ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), f.styledMode || a.tracker.attr({
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round", stroke: b, fill: e ? b : "none", "stroke-width": a.graph.strokeWidth() + (e ? 0 : 2 * n)
                        }), [a.tracker, a.markerGroup].forEach(function (b) { b.addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function (b) { k.onTrackerMouseOut(b) }); c.cursor && !f.styledMode && b.css({ cursor: c.cursor }); if (p) b.on("touchstart", d) })); L(this, "afterDrawTracker")
                    }
                }; B.column && (B.column.prototype.drawTracker = e.drawTrackerPoint); B.pie && (B.pie.prototype.drawTracker = e.drawTrackerPoint); B.scatter && (B.scatter.prototype.drawTracker =
                    e.drawTrackerPoint); A(r.prototype, {
                        setItemEvents: function (a, c, e) {
                            var g = this, f = g.chart.renderer.boxWrapper, k = a instanceof G, h = "highcharts-legend-" + (k ? "point" : "series") + "-active", l = g.chart.styledMode; (e ? [c, a.legendSymbol] : [a.legendGroup]).forEach(function (e) {
                                if (e) e.on("mouseover", function () { a.visible && g.allItems.forEach(function (d) { a !== d && d.setState("inactive", !k) }); a.setState("hover"); a.visible && f.addClass(h); l || c.css(g.options.itemHoverStyle) }).on("mouseout", function () {
                                    g.chart.styledMode || c.css(t(a.visible ?
                                        g.itemStyle : g.itemHiddenStyle)); g.allItems.forEach(function (d) { a !== d && d.setState("", !k) }); f.removeClass(h); a.setState()
                                }).on("click", function (d) { var b = function () { a.setVisible && a.setVisible(); g.allItems.forEach(function (b) { a !== b && b.setState(a.visible ? "inactive" : "", !k) }) }; f.removeClass(h); d = { browserEvent: d }; a.firePointEvent ? a.firePointEvent("legendItemClick", d, b) : L(a, "legendItemClick", d, b) })
                            })
                        }, createCheckboxForItem: function (a) {
                        a.checkbox = n("input", {
                            type: "checkbox", className: "highcharts-legend-checkbox",
                            checked: a.selected, defaultChecked: a.selected
                        }, this.options.itemCheckboxStyle, this.chart.container); D(a.checkbox, "click", function (c) { L(a.series || a, "checkboxClick", { checked: c.target.checked, item: a }, function () { a.select() }) })
                        }
                    }); A(q.prototype, {
                        showResetZoom: function () {
                            function a() { c.zoomOut() } var c = this, e = H.lang, g = c.options.chart.resetZoomButton, f = g.theme, k = f.states, h = "chart" === g.relativeTo || "spaceBox" === g.relativeTo ? null : "plotBox"; L(this, "beforeShowResetZoom", null, function () {
                            c.resetZoomButton = c.renderer.button(e.resetZoom,
                                null, null, a, f, k && k.hover).attr({ align: g.position.align, title: e.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(g.position, !1, h)
                            }); L(this, "afterShowResetZoom")
                        }, zoomOut: function () { L(this, "selection", { resetSelection: !0 }, this.zoom) }, zoom: function (a) {
                            var e = this, g, f = e.pointer, h = !1, k = e.inverted ? f.mouseDownX : f.mouseDownY; !a || a.resetSelection ? (e.axes.forEach(function (a) { g = a.zoom() }), f.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                                var c = a.axis, d = e.inverted ? c.left : c.top, b = e.inverted ?
                                    d + c.width : d + c.height, m = c.isXAxis, l = !1; if (!m && k >= d && k <= b || m || !M(k)) l = !0; f[m ? "zoomX" : "zoomY"] && l && (g = c.zoom(a.min, a.max), c.displayBtn && (h = !0))
                            }); var l = e.resetZoomButton; h && !l ? e.showResetZoom() : !h && x(l) && (e.resetZoomButton = l.destroy()); g && e.redraw(c(e.options.chart.animation, a && a.animation, 100 > e.pointCount))
                        }, pan: function (a, c) {
                            var e = this, g = e.hoverPoints, h = e.options.chart, k = e.options.mapNavigation && e.options.mapNavigation.enabled, l; c = "object" === typeof c ? c : { enabled: c, type: "x" }; h && h.panning && (h.panning =
                                c); var p = c.type; L(this, "pan", { originalEvent: a }, function () {
                                    g && g.forEach(function (d) { d.setState() }); var c = [1]; "xy" === p ? c = [1, 0] : "y" === p && (c = [0]); c.forEach(function (d) {
                                        var b = e[d ? "xAxis" : "yAxis"][0], c = b.horiz, g = a[c ? "chartX" : "chartY"]; c = c ? "mouseDownX" : "mouseDownY"; var h = e[c], u = (b.pointRange || 0) / 2, z = b.reversed && !e.inverted || !b.reversed && e.inverted ? -1 : 1, n = b.getExtremes(), w = b.toValue(h - g, !0) + u * z; z = b.toValue(h + b.len - g, !0) - u * z; var t = z < w; h = t ? z : w; w = t ? w : z; var y = b.hasVerticalPanning(), q = b.panningState; b.series.forEach(function (b) {
                                            if (y &&
                                                !d && (!q || q.isDirty)) { var a = b.getProcessedData(!0); b = b.getExtremes(a.yData, !0); q || (q = { startMin: Number.MAX_VALUE, startMax: -Number.MAX_VALUE }); v(b.dataMin) && v(b.dataMax) && (q.startMin = Math.min(b.dataMin, q.startMin), q.startMax = Math.max(b.dataMax, q.startMax)) }
                                        }); z = Math.min(f.pick(null === q || void 0 === q ? void 0 : q.startMin, n.dataMin), u ? n.min : b.toValue(b.toPixels(n.min) - b.minPixelPadding)); u = Math.max(f.pick(null === q || void 0 === q ? void 0 : q.startMax, n.dataMax), u ? n.max : b.toValue(b.toPixels(n.max) + b.minPixelPadding));
                                        b.panningState = q; b.isOrdinal || (t = z - h, 0 < t && (w += t, h = z), t = w - u, 0 < t && (w = u, h -= t), b.series.length && h !== n.min && w !== n.max && h >= z && w <= u && (b.setExtremes(h, w, !1, !1, { trigger: "pan" }), e.resetZoomButton || k || h === z || w === u || !p.match("y") || (e.showResetZoom(), b.displayBtn = !1), l = !0), e[c] = g)
                                    }); l && e.redraw(!1); I(e.container, { cursor: "move" })
                                })
                        }
                    }); A(G.prototype, {
                        select: function (a, e) {
                            var g = this, f = g.series, h = f.chart; this.selectedStaging = a = c(a, !g.selected); g.firePointEvent(a ? "select" : "unselect", { accumulate: e }, function () {
                            g.selected =
                                g.options.selected = a; f.options.data[f.data.indexOf(g)] = g.options; g.setState(a && "select"); e || h.getSelectedPoints().forEach(function (a) { var c = a.series; a.selected && a !== g && (a.selected = a.options.selected = !1, c.options.data[c.data.indexOf(a)] = a.options, a.setState(h.hoverPoints && c.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect")) })
                            }); delete this.selectedStaging
                        }, onMouseOver: function (a) {
                            var c = this.series.chart, e = c.pointer; a = a ? e.normalize(a) : e.getChartCoordinatesFromPoint(this, c.inverted);
                            e.runPointActions(a, this)
                        }, onMouseOut: function () { var a = this.series.chart; this.firePointEvent("mouseOut"); this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) { a.setState() }); a.hoverPoints = a.hoverPoint = null }, importEvents: function () { if (!this.hasImportedEvents) { var a = this, c = t(a.series.options.point, a.options).events; a.events = c; g(c, function (c, e) { l(c) && D(a, e, c) }); this.hasImportedEvents = !0 } }, setState: function (a, e) {
                            var g = this.series, f = this.state, h = g.options.states[a || "normal"] ||
                                {}, k = H.plotOptions[g.type].marker && g.options.marker, l = k && !1 === k.enabled, p = k && k.states && k.states[a || "normal"] || {}, u = !1 === p.enabled, d = g.stateMarkerGraphic, b = this.marker || {}, m = g.chart, n = g.halo, t, q = k && g.markerAttribs; a = a || ""; if (!(a === this.state && !e || this.selected && "select" !== a || !1 === h.enabled || a && (u || l && !1 === p.enabled) || a && b.states && b.states[a] && !1 === b.states[a].enabled)) {
                                this.state = a; q && (t = g.markerAttribs(this, a)); if (this.graphic) {
                                    f && this.graphic.removeClass("highcharts-point-" + f); a && this.graphic.addClass("highcharts-point-" +
                                        a); if (!m.styledMode) { var v = g.pointAttribs(this, a); var r = c(m.options.chart.animation, h.animation); g.options.inactiveOtherPoints && v.opacity && ((this.dataLabels || []).forEach(function (b) { b && b.animate({ opacity: v.opacity }, r) }), this.connector && this.connector.animate({ opacity: v.opacity }, r)); this.graphic.animate(v, r) } t && this.graphic.animate(t, c(m.options.chart.animation, p.animation, k.animation)); d && d.hide()
                                } else {
                                    if (a && p) {
                                        f = b.symbol || g.symbol; d && d.currentSymbol !== f && (d = d.destroy()); if (t) if (d) d[e ? "animate" : "attr"]({
                                            x: t.x,
                                            y: t.y
                                        }); else f && (g.stateMarkerGraphic = d = m.renderer.symbol(f, t.x, t.y, t.width, t.height).add(g.markerGroup), d.currentSymbol = f); !m.styledMode && d && d.attr(g.pointAttribs(this, a))
                                    } d && (d[a && this.isInside ? "show" : "hide"](), d.element.point = this)
                                } a = h.halo; h = (d = this.graphic || d) && d.visibility || "inherit"; a && a.size && d && "hidden" !== h && !this.isCluster ? (n || (g.halo = n = m.renderer.path().add(d.parentGroup)), n.show()[e ? "animate" : "attr"]({ d: this.haloPath(a.size) }), n.attr({
                                    "class": "highcharts-halo highcharts-color-" + c(this.colorIndex,
                                        g.colorIndex) + (this.className ? " " + this.className : ""), visibility: h, zIndex: -1
                                }), n.point = this, m.styledMode || n.attr(A({ fill: this.color || g.color, "fill-opacity": a.opacity }, a.attributes))) : n && n.point && n.point.haloPath && n.animate({ d: n.point.haloPath(0) }, null, n.hide); L(this, "afterSetState")
                                }
                        }, haloPath: function (a) { return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a) }
                    }); A(C.prototype, {
                        onMouseOver: function () {
                            var a = this.chart, c = a.hoverSeries; a.pointer.setHoverChartIndex();
                            if (c && c !== this) c.onMouseOut(); this.options.events.mouseOver && L(this, "mouseOver"); this.setState("hover"); a.hoverSeries = this
                        }, onMouseOut: function () { var a = this.options, c = this.chart, e = c.tooltip, g = c.hoverPoint; c.hoverSeries = null; if (g) g.onMouseOut(); this && a.events.mouseOut && L(this, "mouseOut"); !e || this.stickyTracking || e.shared && !this.noSharedTooltip || e.hide(); c.series.forEach(function (a) { a.setState("", !0) }) }, setState: function (a, e) {
                            var g = this, f = g.options, h = g.graph, k = f.inactiveOtherPoints, l = f.states, p = f.lineWidth,
                            u = f.opacity, d = c(l[a || "normal"] && l[a || "normal"].animation, g.chart.options.chart.animation); f = 0; a = a || ""; if (g.state !== a && ([g.group, g.markerGroup, g.dataLabelsGroup].forEach(function (b) { b && (g.state && b.removeClass("highcharts-series-" + g.state), a && b.addClass("highcharts-series-" + a)) }), g.state = a, !g.chart.styledMode)) {
                                if (l[a] && !1 === l[a].enabled) return; a && (p = l[a].lineWidth || p + (l[a].lineWidthPlus || 0), u = c(l[a].opacity, u)); if (h && !h.dashstyle) for (l = { "stroke-width": p }, h.animate(l, d); g["zone-graph-" + f];)g["zone-graph-" +
                                    f].attr(l), f += 1; k || [g.group, g.markerGroup, g.dataLabelsGroup, g.labelBySeries].forEach(function (b) { b && b.animate({ opacity: u }, d) })
                            } e && k && g.points && g.setAllPointsToState(a)
                        }, setAllPointsToState: function (a) { this.points.forEach(function (c) { c.setState && c.setState(a) }) }, setVisible: function (a, c) {
                            var e = this, g = e.chart, f = e.legendItem, k = g.options.chart.ignoreHiddenSeries, h = e.visible; var l = (e.visible = a = e.options.visible = e.userOptions.visible = "undefined" === typeof a ? !h : a) ? "show" : "hide";["group", "dataLabelsGroup",
                                "markerGroup", "tracker", "tt"].forEach(function (a) { if (e[a]) e[a][l]() }); if (g.hoverSeries === e || (g.hoverPoint && g.hoverPoint.series) === e) e.onMouseOut(); f && g.legend.colorizeItem(e, a); e.isDirty = !0; e.options.stacking && g.series.forEach(function (a) { a.options.stacking && a.visible && (a.isDirty = !0) }); e.linkedSeries.forEach(function (c) { c.setVisible(a, !1) }); k && (g.isDirtyBox = !0); L(e, l); !1 !== c && g.redraw()
                        }, show: function () { this.setVisible(!0) }, hide: function () { this.setVisible(!1) }, select: function (a) {
                        this.selected = a = this.options.selected =
                            "undefined" === typeof a ? !this.selected : a; this.checkbox && (this.checkbox.checked = a); L(this, a ? "select" : "unselect")
                        }, drawTracker: e.drawTrackerGraph
                    })
            }); N(r, "Core/Responsive.js", [r["Core/Chart/Chart.js"], r["Core/Utilities.js"]], function (q, f) {
                var r = f.find, C = f.isArray, G = f.isObject, B = f.merge, H = f.objectEach, D = f.pick, n = f.splat, I = f.uniqueKey; q.prototype.setResponsive = function (f, n) {
                    var q = this.options.responsive, E = [], l = this.currentResponsive; !n && q && q.rules && q.rules.forEach(function (f) {
                    "undefined" === typeof f._id &&
                        (f._id = I()); this.matchResponsiveRule(f, E)
                    }, this); n = B.apply(0, E.map(function (f) { return r(q.rules, function (l) { return l._id === f }).chartOptions })); n.isResponsiveOptions = !0; E = E.toString() || void 0; E !== (l && l.ruleIds) && (l && this.update(l.undoOptions, f, !0), E ? (l = this.currentOptions(n), l.isResponsiveOptions = !0, this.currentResponsive = { ruleIds: E, mergedOptions: n, undoOptions: l }, this.update(n, f, !0)) : this.currentResponsive = void 0)
                }; q.prototype.matchResponsiveRule = function (f, n) {
                    var q = f.condition; (q.callback || function () {
                        return this.chartWidth <=
                            D(q.maxWidth, Number.MAX_VALUE) && this.chartHeight <= D(q.maxHeight, Number.MAX_VALUE) && this.chartWidth >= D(q.minWidth, 0) && this.chartHeight >= D(q.minHeight, 0)
                    }).call(this) && n.push(f._id)
                }; q.prototype.currentOptions = function (f) {
                    function q(f, v, x, t) {
                        var g; H(f, function (c, f) {
                            if (!t && -1 < r.collectionsWithUpdate.indexOf(f)) for (c = n(c), x[f] = [], g = 0; g < Math.max(c.length, v[f].length); g++)v[f][g] && (void 0 === c[g] ? x[f][g] = v[f][g] : (x[f][g] = {}, q(c[g], v[f][g], x[f][g], t + 1))); else G(c) ? (x[f] = C(c) ? [] : {}, q(c, v[f] || {}, x[f], t + 1)) :
                                x[f] = "undefined" === typeof v[f] ? null : v[f]
                        })
                    } var r = this, E = {}; q(f, this.options, E, 0); return E
                }
            }); N(r, "masters/highcharts.src.js", [r["Core/Globals.js"]], function (q) { return q }); N(r, "Core/Axis/NavigatorAxis.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
                var r = q.isTouchDevice, C = f.addEvent, G = f.correctFloat, B = f.defined, H = f.isNumber, D = f.pick, n = function () {
                    function f(f) { this.axis = f } f.prototype.destroy = function () { this.axis = void 0 }; f.prototype.toFixedRange = function (f, n, q, r) {
                        var l = this.axis, v = l.chart;
                        v = v && v.fixedRange; var x = (l.pointRange || 0) / 2; f = D(q, l.translate(f, !0, !l.horiz)); n = D(r, l.translate(n, !0, !l.horiz)); l = v && (n - f) / v; B(q) || (f = G(f + x)); B(r) || (n = G(n - x)); .7 < l && 1.3 > l && (r ? f = n - v : n = f + v); H(f) && H(n) || (f = n = void 0); return { min: f, max: n }
                    }; return f
                }(); return function () {
                    function f() { } f.compose = function (f) {
                        f.keepProps.push("navigatorAxis"); C(f, "init", function () { this.navigatorAxis || (this.navigatorAxis = new n(this)) }); C(f, "zoom", function (f) {
                            var n = this.chart.options, q = n.navigator, l = this.navigatorAxis, v = n.chart.pinchType,
                            x = n.rangeSelector; n = n.chart.zoomType; this.isXAxis && (q && q.enabled || x && x.enabled) && ("y" === n ? f.zoomed = !1 : (!r && "xy" === n || r && "xy" === v) && this.options.range && (q = l.previousZoom, B(f.newMin) ? l.previousZoom = [this.min, this.max] : q && (f.newMin = q[0], f.newMax = q[1], l.previousZoom = void 0))); "undefined" !== typeof f.zoomed && f.preventDefault()
                        })
                    }; f.AdditionsClass = n; return f
                }()
            }); N(r, "Core/Axis/ScrollbarAxis.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
                var r = f.addEvent, C = f.defined, G = f.pick; return function () {
                    function f() { }
                    f.compose = function (f, B) {
                        r(f, "afterInit", function () {
                            var f = this; f.options && f.options.scrollbar && f.options.scrollbar.enabled && (f.options.scrollbar.vertical = !f.horiz, f.options.startOnTick = f.options.endOnTick = !1, f.scrollbar = new B(f.chart.renderer, f.options.scrollbar, f.chart), r(f.scrollbar, "changed", function (n) {
                                var r = G(f.options && f.options.min, f.min), B = G(f.options && f.options.max, f.max), D = C(f.dataMin) ? Math.min(r, f.min, f.dataMin) : r, E = (C(f.dataMax) ? Math.max(B, f.max, f.dataMax) : B) - D; C(r) && C(B) && (f.horiz && !f.reversed ||
                                    !f.horiz && f.reversed ? (r = D + E * this.to, D += E * this.from) : (r = D + E * (1 - this.from), D += E * (1 - this.to)), G(this.options.liveRedraw, q.svg && !q.isTouchDevice && !this.chart.isBoosting) || "mouseup" === n.DOMType || !C(n.DOMType) ? f.setExtremes(D, r, !0, "mousemove" !== n.DOMType, n) : this.setRange(this.from, this.to))
                            }))
                        }); r(f, "afterRender", function () {
                            var f = Math.min(G(this.options.min, this.min), this.min, G(this.dataMin, this.min)), q = Math.max(G(this.options.max, this.max), this.max, G(this.dataMax, this.max)), r = this.scrollbar, B = this.axisTitleMargin +
                                (this.titleOffset || 0), D = this.chart.scrollbarsOffsets, E = this.options.margin || 0; r && (this.horiz ? (this.opposite || (D[1] += B), r.position(this.left, this.top + this.height + 2 + D[1] - (this.opposite ? E : 0), this.width, this.height), this.opposite || (D[1] += E), B = 1) : (this.opposite && (D[0] += B), r.position(this.left + this.width + 2 + D[0] - (this.opposite ? 0 : E), this.top, this.width, this.height), this.opposite && (D[0] += E), B = 0), D[B] += r.size + r.options.margin, isNaN(f) || isNaN(q) || !C(this.min) || !C(this.max) || this.min === this.max ? r.setRange(0,
                                    1) : (D = (this.min - f) / (q - f), f = (this.max - f) / (q - f), this.horiz && !this.reversed || !this.horiz && this.reversed ? r.setRange(D, f) : r.setRange(1 - f, 1 - D)))
                        }); r(f, "afterGetOffset", function () { var f = this.horiz ? 2 : 1, q = this.scrollbar; q && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[f] += q.size + q.options.margin) })
                    }; return f
                }()
            }); N(r, "Core/Scrollbar.js", [r["Core/Axis/Axis.js"], r["Core/Globals.js"], r["Core/Axis/ScrollbarAxis.js"], r["Core/Utilities.js"], r["Core/Options.js"]], function (q, f, r, C, G) {
                var B = C.addEvent,
                H = C.correctFloat, D = C.defined, n = C.destroyObjectProperties, I = C.fireEvent, M = C.merge, A = C.pick, L = C.removeEvent; C = G.defaultOptions; var E = f.hasTouch, l = f.isTouchDevice, v = f.swapXY = function (f, l) { l && f.forEach(function (g) { for (var c = g.length, f, h = 0; h < c; h += 2)f = g[h + 1], "number" === typeof f && (g[h + 1] = g[h + 2], g[h + 2] = f) }); return f }; G = function () {
                    function f(f, g, c) {
                    this._events = []; this.from = this.chartY = this.chartX = 0; this.scrollbar = this.group = void 0; this.scrollbarButtons = []; this.scrollbarGroup = void 0; this.scrollbarLeft = 0; this.scrollbarRifles =
                        void 0; this.scrollbarStrokeWidth = 1; this.to = this.size = this.scrollbarTop = 0; this.track = void 0; this.trackBorderWidth = 1; this.userOptions = {}; this.y = this.x = 0; this.chart = c; this.options = g; this.renderer = c.renderer; this.init(f, g, c)
                    } f.prototype.addEvents = function () {
                        var f = this.options.inverted ? [1, 0] : [0, 1], g = this.scrollbarButtons, c = this.scrollbarGroup.element, l = this.track.element, h = this.mouseDownHandler.bind(this), e = this.mouseMoveHandler.bind(this), a = this.mouseUpHandler.bind(this); f = [[g[f[0]].element, "click", this.buttonToMinClick.bind(this)],
                        [g[f[1]].element, "click", this.buttonToMaxClick.bind(this)], [l, "click", this.trackClick.bind(this)], [c, "mousedown", h], [c.ownerDocument, "mousemove", e], [c.ownerDocument, "mouseup", a]]; E && f.push([c, "touchstart", h], [c.ownerDocument, "touchmove", e], [c.ownerDocument, "touchend", a]); f.forEach(function (a) { B.apply(null, a) }); this._events = f
                    }; f.prototype.buttonToMaxClick = function (f) {
                        var g = (this.to - this.from) * A(this.options.step, .2); this.updatePosition(this.from + g, this.to + g); I(this, "changed", {
                            from: this.from, to: this.to,
                            trigger: "scrollbar", DOMEvent: f
                        })
                    }; f.prototype.buttonToMinClick = function (f) { var g = H(this.to - this.from) * A(this.options.step, .2); this.updatePosition(H(this.from - g), H(this.to - g)); I(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: f }) }; f.prototype.cursorToScrollbarPosition = function (f) { var g = this.options; g = g.minWidth > this.calculatedWidth ? g.minWidth : 0; return { chartX: (f.chartX - this.x - this.xOffset) / (this.barWidth - g), chartY: (f.chartY - this.y - this.yOffset) / (this.barWidth - g) } }; f.prototype.destroy =
                        function () { var f = this.chart.scroller; this.removeEvents();["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function (g) { this[g] && this[g].destroy && (this[g] = this[g].destroy()) }, this); f && this === f.scrollbar && (f.scrollbar = null, n(f.scrollbarButtons)) }; f.prototype.drawScrollbarButton = function (f) {
                            var g = this.renderer, c = this.scrollbarButtons, l = this.options, h = this.size; var e = g.g().add(this.group); c.push(e); e = g.rect().addClass("highcharts-scrollbar-button").add(e); this.chart.styledMode ||
                                e.attr({ stroke: l.buttonBorderColor, "stroke-width": l.buttonBorderWidth, fill: l.buttonBackgroundColor }); e.attr(e.crisp({ x: -.5, y: -.5, width: h + 1, height: h + 1, r: l.buttonBorderRadius }, e.strokeWidth())); e = g.path(v([["M", h / 2 + (f ? -1 : 1), h / 2 - 3], ["L", h / 2 + (f ? -1 : 1), h / 2 + 3], ["L", h / 2 + (f ? 2 : -2), h / 2]], l.vertical)).addClass("highcharts-scrollbar-arrow").add(c[f]); this.chart.styledMode || e.attr({ fill: l.buttonArrowColor })
                        }; f.prototype.init = function (l, g, c) {
                        this.scrollbarButtons = []; this.renderer = l; this.userOptions = g; this.options =
                            M(f.defaultOptions, g); this.chart = c; this.size = A(this.options.size, this.options.height); g.enabled && (this.render(), this.addEvents())
                        }; f.prototype.mouseDownHandler = function (f) { f = this.chart.pointer.normalize(f); f = this.cursorToScrollbarPosition(f); this.chartX = f.chartX; this.chartY = f.chartY; this.initPositions = [this.from, this.to]; this.grabbedCenter = !0 }; f.prototype.mouseMoveHandler = function (f) {
                            var g = this.chart.pointer.normalize(f), c = this.options.vertical ? "chartY" : "chartX", l = this.initPositions || []; !this.grabbedCenter ||
                                f.touches && 0 === f.touches[0][c] || (g = this.cursorToScrollbarPosition(g)[c], c = this[c], c = g - c, this.hasDragged = !0, this.updatePosition(l[0] + c, l[1] + c), this.hasDragged && I(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: f.type, DOMEvent: f }))
                        }; f.prototype.mouseUpHandler = function (f) { this.hasDragged && I(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: f.type, DOMEvent: f }); this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null }; f.prototype.position = function (f, g, c,
                            l) {
                                var h = this.options.vertical, e = 0, a = this.rendered ? "animate" : "attr"; this.x = f; this.y = g + this.trackBorderWidth; this.width = c; this.xOffset = this.height = l; this.yOffset = e; h ? (this.width = this.yOffset = c = e = this.size, this.xOffset = g = 0, this.barWidth = l - 2 * c, this.x = f += this.options.margin) : (this.height = this.xOffset = l = g = this.size, this.barWidth = c - 2 * l, this.y += this.options.margin); this.group[a]({ translateX: f, translateY: this.y }); this.track[a]({ width: c, height: l }); this.scrollbarButtons[1][a]({
                                    translateX: h ? 0 : c - g, translateY: h ?
                                        l - e : 0
                                })
                        }; f.prototype.removeEvents = function () { this._events.forEach(function (f) { L.apply(null, f) }); this._events.length = 0 }; f.prototype.render = function () {
                            var f = this.renderer, g = this.options, c = this.size, l = this.chart.styledMode, h; this.group = h = f.g("scrollbar").attr({ zIndex: g.zIndex, translateY: -99999 }).add(); this.track = f.rect().addClass("highcharts-scrollbar-track").attr({ x: 0, r: g.trackBorderRadius || 0, height: c, width: c }).add(h); l || this.track.attr({ fill: g.trackBackgroundColor, stroke: g.trackBorderColor, "stroke-width": g.trackBorderWidth });
                            this.trackBorderWidth = this.track.strokeWidth(); this.track.attr({ y: -this.trackBorderWidth % 2 / 2 }); this.scrollbarGroup = f.g().add(h); this.scrollbar = f.rect().addClass("highcharts-scrollbar-thumb").attr({ height: c, width: c, r: g.barBorderRadius || 0 }).add(this.scrollbarGroup); this.scrollbarRifles = f.path(v([["M", -3, c / 4], ["L", -3, 2 * c / 3], ["M", 0, c / 4], ["L", 0, 2 * c / 3], ["M", 3, c / 4], ["L", 3, 2 * c / 3]], g.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup); l || (this.scrollbar.attr({
                                fill: g.barBackgroundColor,
                                stroke: g.barBorderColor, "stroke-width": g.barBorderWidth
                            }), this.scrollbarRifles.attr({ stroke: g.rifleColor, "stroke-width": 1 })); this.scrollbarStrokeWidth = this.scrollbar.strokeWidth(); this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2); this.drawScrollbarButton(0); this.drawScrollbarButton(1)
                        }; f.prototype.setRange = function (f, g) {
                            var c = this.options, l = c.vertical, h = c.minWidth, e = this.barWidth, a, u = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ?
                                "attr" : "animate"; if (D(e)) {
                                    f = Math.max(f, 0); var n = Math.ceil(e * f); this.calculatedWidth = a = H(e * Math.min(g, 1) - n); a < h && (n = (e - h + a) * f, a = h); h = Math.floor(n + this.xOffset + this.yOffset); e = a / 2 - .5; this.from = f; this.to = g; l ? (this.scrollbarGroup[u]({ translateY: h }), this.scrollbar[u]({ height: a }), this.scrollbarRifles[u]({ translateY: e }), this.scrollbarTop = h, this.scrollbarLeft = 0) : (this.scrollbarGroup[u]({ translateX: h }), this.scrollbar[u]({ width: a }), this.scrollbarRifles[u]({ translateX: e }), this.scrollbarLeft = h, this.scrollbarTop =
                                        0); 12 >= a ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0); !1 === c.showFull && (0 >= f && 1 <= g ? this.group.hide() : this.group.show()); this.rendered = !0
                                }
                        }; f.prototype.trackClick = function (f) {
                            var g = this.chart.pointer.normalize(f), c = this.to - this.from, l = this.y + this.scrollbarTop, h = this.x + this.scrollbarLeft; this.options.vertical && g.chartY > l || !this.options.vertical && g.chartX > h ? this.updatePosition(this.from + c, this.to + c) : this.updatePosition(this.from - c, this.to - c); I(this, "changed", {
                                from: this.from, to: this.to, trigger: "scrollbar",
                                DOMEvent: f
                            })
                        }; f.prototype.update = function (f) { this.destroy(); this.init(this.chart.renderer, M(!0, this.options, f), this.chart) }; f.prototype.updatePosition = function (f, g) { 1 < g && (f = H(1 - H(g - f)), g = 1); 0 > f && (g = H(g - f), f = 0); this.from = f; this.to = g }; f.defaultOptions = {
                            height: l ? 20 : 14, barBorderRadius: 0, buttonBorderRadius: 0, liveRedraw: void 0, margin: 10, minWidth: 6, step: .2, zIndex: 3, barBackgroundColor: "#cccccc", barBorderWidth: 1, barBorderColor: "#cccccc", buttonArrowColor: "#333333", buttonBackgroundColor: "#e6e6e6", buttonBorderColor: "#cccccc",
                            buttonBorderWidth: 1, rifleColor: "#333333", trackBackgroundColor: "#f2f2f2", trackBorderColor: "#f2f2f2", trackBorderWidth: 1
                        }; return f
                }(); f.Scrollbar || (C.scrollbar = M(!0, G.defaultOptions, C.scrollbar), f.Scrollbar = G, r.compose(q, G)); return f.Scrollbar
            }); N(r, "Core/Navigator.js", [r["Core/Axis/Axis.js"], r["Core/Chart/Chart.js"], r["Core/Color.js"], r["Core/Globals.js"], r["Core/Axis/NavigatorAxis.js"], r["Core/Options.js"], r["Core/Scrollbar.js"], r["Core/Utilities.js"]], function (q, f, r, C, G, B, H, D) {
                r = r.parse; var n = B.defaultOptions,
                    I = D.addEvent, M = D.clamp, A = D.correctFloat, L = D.defined, E = D.destroyObjectProperties, l = D.erase, v = D.extend, x = D.find, t = D.isArray, g = D.isNumber, c = D.merge, p = D.pick, h = D.removeEvent, e = D.splat, a = C.hasTouch, u = C.isTouchDevice; B = C.Series; var w = function (a) { for (var c = [], e = 1; e < arguments.length; e++)c[e - 1] = arguments[e]; c = [].filter.call(c, g); if (c.length) return Math[a].apply(0, c) }; D = "undefined" === typeof C.seriesTypes.areaspline ? "line" : "areaspline"; v(n, {
                        navigator: {
                            height: 40, margin: 25, maskInside: !0, handles: {
                                width: 7, height: 15,
                                symbols: ["navigator-handle", "navigator-handle"], enabled: !0, lineWidth: 1, backgroundColor: "#f2f2f2", borderColor: "#999999"
                            }, maskFill: r("#6685c2").setOpacity(.3).get(), outlineColor: "#cccccc", outlineWidth: 1, series: {
                                type: D, fillOpacity: .05, lineWidth: 1, compare: null, dataGrouping: {
                                    approximation: "average", enabled: !0, groupPixelWidth: 2, smoothed: !0, units: [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2, 3, 4]], ["week", [1,
                                        2, 3]], ["month", [1, 3, 6]], ["year", null]]
                                }, dataLabels: { enabled: !1, zIndex: 2 }, id: "highcharts-navigator-series", className: "highcharts-navigator-series", lineColor: null, marker: { enabled: !1 }, threshold: null
                            }, xAxis: { overscroll: 0, className: "highcharts-navigator-xaxis", tickLength: 0, lineWidth: 0, gridLineColor: "#e6e6e6", gridLineWidth: 1, tickPixelInterval: 200, labels: { align: "left", style: { color: "#999999" }, x: 3, y: -4 }, crosshair: !1 }, yAxis: {
                                className: "highcharts-navigator-yaxis", gridLineWidth: 0, startOnTick: !1, endOnTick: !1,
                                minPadding: .1, maxPadding: .1, labels: { enabled: !1 }, crosshair: !1, title: { text: null }, tickLength: 0, tickWidth: 0
                            }
                        }
                    }); C.Renderer.prototype.symbols["navigator-handle"] = function (a, c, e, f, g) { a = (g && g.width || 0) / 2; c = Math.round(a / 3) + .5; g = g && g.height || 0; return [["M", -a - 1, .5], ["L", a, .5], ["L", a, g + .5], ["L", -a - 1, g + .5], ["L", -a - 1, .5], ["M", -c, 4], ["L", -c, g - 3], ["M", c - 1, 4], ["L", c - 1, g - 3]] }; var F = function () {
                        function f(a) {
                        this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range =
                            this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0; this.init(a)
                        } f.prototype.drawHandle = function (a, c, e, f) {
                            var d = this.navigatorOptions.handles.height; this.handles[c][f](e ? { translateX: Math.round(this.left + this.height / 2), translateY: Math.round(this.top + parseInt(a, 10) + .5 - d) } : {
                                translateX: Math.round(this.left + parseInt(a, 10)), translateY: Math.round(this.top +
                                    this.height / 2 - d / 2 - 1)
                            })
                        }; f.prototype.drawOutline = function (a, c, e, f) {
                            var d = this.navigatorOptions.maskInside, b = this.outline.strokeWidth(), g = b / 2, k = b % 2 / 2; b = this.outlineHeight; var h = this.scrollbarHeight || 0, l = this.size, p = this.left - h, u = this.top; e ? (p -= g, e = u + c + k, c = u + a + k, k = [["M", p + b, u - h - k], ["L", p + b, e], ["L", p, e], ["L", p, c], ["L", p + b, c], ["L", p + b, u + l + h]], d && k.push(["M", p + b, e - g], ["L", p + b, c + g])) : (a += p + h - k, c += p + h - k, u += g, k = [["M", p, u], ["L", a, u], ["L", a, u + b], ["L", c, u + b], ["L", c, u], ["L", p + l + 2 * h, u]], d && k.push(["M", a - g, u], ["L",
                                c + g, u])); this.outline[f]({ d: k })
                        }; f.prototype.drawMasks = function (a, c, e, f) { var d = this.left, b = this.top, g = this.height; if (e) { var k = [d, d, d]; var h = [b, b + a, b + c]; var l = [g, g, g]; var p = [a, c - a, this.size - c] } else k = [d, d + a, d + c], h = [b, b, b], l = [a, c - a, this.size - c], p = [g, g, g]; this.shades.forEach(function (b, d) { b[f]({ x: k[d], y: h[d], width: l[d], height: p[d] }) }) }; f.prototype.renderElements = function () {
                            var a = this, c = a.navigatorOptions, e = c.maskInside, f = a.chart, d = f.renderer, b, g = { cursor: f.inverted ? "ns-resize" : "ew-resize" }; a.navigatorGroup =
                                b = d.g("navigator").attr({ zIndex: 8, visibility: "hidden" }).add();[!e, e, !e].forEach(function (e, k) { a.shades[k] = d.rect().addClass("highcharts-navigator-mask" + (1 === k ? "-inside" : "-outside")).add(b); f.styledMode || a.shades[k].attr({ fill: e ? c.maskFill : "rgba(0,0,0,0)" }).css(1 === k && g) }); a.outline = d.path().addClass("highcharts-navigator-outline").add(b); f.styledMode || a.outline.attr({ "stroke-width": c.outlineWidth, stroke: c.outlineColor }); c.handles.enabled && [0, 1].forEach(function (e) {
                                    c.handles.inverted = f.inverted; a.handles[e] =
                                        d.symbol(c.handles.symbols[e], -c.handles.width / 2 - 1, 0, c.handles.width, c.handles.height, c.handles); a.handles[e].attr({ zIndex: 7 - e }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][e]).add(b); if (!f.styledMode) { var k = c.handles; a.handles[e].attr({ fill: k.backgroundColor, stroke: k.borderColor, "stroke-width": k.lineWidth }).css(g) }
                                })
                        }; f.prototype.update = function (a) {
                            (this.series || []).forEach(function (a) { a.baseSeries && delete a.baseSeries.navigatorSeries }); this.destroy(); c(!0,
                                this.chart.options.navigator, this.options, a); this.init(this.chart)
                        }; f.prototype.render = function (a, c, e, f) {
                            var d = this.chart, b = this.scrollbarHeight, k, h = this.xAxis, l = h.pointRange || 0; var u = h.navigatorAxis.fake ? d.xAxis[0] : h; var n = this.navigatorEnabled, q, z = this.rendered; var t = d.inverted; var y = d.xAxis[0].minRange, w = d.xAxis[0].options.maxRange; if (!this.hasDragged || L(e)) {
                                a = A(a - l / 2); c = A(c + l / 2); if (!g(a) || !g(c)) if (z) e = 0, f = p(h.width, u.width); else return; this.left = p(h.left, d.plotLeft + b + (t ? d.plotWidth : 0)); this.size =
                                    q = k = p(h.len, (t ? d.plotHeight : d.plotWidth) - 2 * b); d = t ? b : k + 2 * b; e = p(e, h.toPixels(a, !0)); f = p(f, h.toPixels(c, !0)); g(e) && Infinity !== Math.abs(e) || (e = 0, f = d); a = h.toValue(e, !0); c = h.toValue(f, !0); var r = Math.abs(A(c - a)); r < y ? this.grabbedLeft ? e = h.toPixels(c - y - l, !0) : this.grabbedRight && (f = h.toPixels(a + y + l, !0)) : L(w) && A(r - l) > w && (this.grabbedLeft ? e = h.toPixels(c - w - l, !0) : this.grabbedRight && (f = h.toPixels(a + w + l, !0))); this.zoomedMax = M(Math.max(e, f), 0, q); this.zoomedMin = M(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(e,
                                        f), 0, q); this.range = this.zoomedMax - this.zoomedMin; q = Math.round(this.zoomedMax); e = Math.round(this.zoomedMin); n && (this.navigatorGroup.attr({ visibility: "visible" }), z = z && !this.hasDragged ? "animate" : "attr", this.drawMasks(e, q, t, z), this.drawOutline(e, q, t, z), this.navigatorOptions.handles.enabled && (this.drawHandle(e, 0, t, z), this.drawHandle(q, 1, t, z))); this.scrollbar && (t ? (t = this.top - b, u = this.left - b + (n || !u.opposite ? 0 : (u.titleOffset || 0) + u.axisTitleMargin), b = k + 2 * b) : (t = this.top + (n ? this.height : -b), u = this.left - b), this.scrollbar.position(u,
                                            t, d, b), this.scrollbar.setRange(this.zoomedMin / (k || 1), this.zoomedMax / (k || 1))); this.rendered = !0
                            }
                        }; f.prototype.addMouseEvents = function () {
                            var c = this, e = c.chart, f = e.container, g = [], d, b; c.mouseMoveHandler = d = function (b) { c.onMouseMove(b) }; c.mouseUpHandler = b = function (b) { c.onMouseUp(b) }; g = c.getPartsEvents("mousedown"); g.push(I(e.renderTo, "mousemove", d), I(f.ownerDocument, "mouseup", b)); a && (g.push(I(e.renderTo, "touchmove", d), I(f.ownerDocument, "touchend", b)), g.concat(c.getPartsEvents("touchstart"))); c.eventsToUnbind =
                                g; c.series && c.series[0] && g.push(I(c.series[0].xAxis, "foundExtremes", function () { e.navigator.modifyNavigatorAxisExtremes() }))
                        }; f.prototype.getPartsEvents = function (a) { var c = this, e = [];["shades", "handles"].forEach(function (f) { c[f].forEach(function (d, b) { e.push(I(d.element, a, function (d) { c[f + "Mousedown"](d, b) })) }) }); return e }; f.prototype.shadesMousedown = function (a, c) {
                            a = this.chart.pointer.normalize(a); var e = this.chart, f = this.xAxis, d = this.zoomedMin, b = this.left, g = this.size, k = this.range, h = a.chartX; e.inverted &&
                                (h = a.chartY, b = this.top); if (1 === c) this.grabbedCenter = h, this.fixedWidth = k, this.dragOffset = h - d; else { a = h - b - k / 2; if (0 === c) a = Math.max(0, a); else if (2 === c && a + k >= g) if (a = g - k, this.reversedExtremes) { a -= k; var l = this.getUnionExtremes().dataMin } else var p = this.getUnionExtremes().dataMax; a !== d && (this.fixedWidth = k, c = f.navigatorAxis.toFixedRange(a, a + k, l, p), L(c.min) && e.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, null, { trigger: "navigator" })) }
                        }; f.prototype.handlesMousedown = function (a, c) {
                            this.chart.pointer.normalize(a);
                            a = this.chart; var e = a.xAxis[0], f = this.reversedExtremes; 0 === c ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = f ? e.min : e.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = f ? e.max : e.min); a.fixedRange = null
                        }; f.prototype.onMouseMove = function (a) {
                            var c = this, e = c.chart, f = c.left, d = c.navigatorSize, b = c.range, g = c.dragOffset, k = e.inverted; a.touches && 0 === a.touches[0].pageX || (a = e.pointer.normalize(a), e = a.chartX, k && (f = c.top, e = a.chartY), c.grabbedLeft ? (c.hasDragged =
                                !0, c.render(0, 0, e - f, c.otherHandlePos)) : c.grabbedRight ? (c.hasDragged = !0, c.render(0, 0, c.otherHandlePos, e - f)) : c.grabbedCenter && (c.hasDragged = !0, e < g ? e = g : e > d + g - b && (e = d + g - b), c.render(0, 0, e - g, e - g + b)), c.hasDragged && c.scrollbar && p(c.scrollbar.options.liveRedraw, C.svg && !u && !this.chart.isBoosting) && (a.DOMType = a.type, setTimeout(function () { c.onMouseUp(a) }, 0)))
                        }; f.prototype.onMouseUp = function (a) {
                            var c = this.chart, e = this.xAxis, f = this.scrollbar, d = a.DOMEvent || a, b = c.inverted, k = this.rendered && !this.hasDragged ? "animate" :
                                "attr"; if (this.hasDragged && (!f || !f.hasDragged) || "scrollbar" === a.trigger) {
                                    f = this.getUnionExtremes(); if (this.zoomedMin === this.otherHandlePos) var h = this.fixedExtreme; else if (this.zoomedMax === this.otherHandlePos) var l = this.fixedExtreme; this.zoomedMax === this.size && (l = this.reversedExtremes ? f.dataMin : f.dataMax); 0 === this.zoomedMin && (h = this.reversedExtremes ? f.dataMax : f.dataMin); e = e.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, h, l); L(e.min) && c.xAxis[0].setExtremes(Math.min(e.min, e.max), Math.max(e.min,
                                        e.max), !0, this.hasDragged ? !1 : null, { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: d })
                                } "mousemove" !== a.DOMType && "touchmove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null); this.navigatorEnabled && g(this.zoomedMin) && g(this.zoomedMax) && (c = Math.round(this.zoomedMin), a = Math.round(this.zoomedMax), this.shades && this.drawMasks(c, a, b, k), this.outline && this.drawOutline(c, a, b, k), this.navigatorOptions.handles.enabled &&
                                    Object.keys(this.handles).length === this.handles.length && (this.drawHandle(c, 0, b, k), this.drawHandle(a, 1, b, k)))
                        }; f.prototype.removeEvents = function () { this.eventsToUnbind && (this.eventsToUnbind.forEach(function (a) { a() }), this.eventsToUnbind = void 0); this.removeBaseSeriesEvents() }; f.prototype.removeBaseSeriesEvents = function () {
                            var a = this.baseSeries || []; this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function (a) { h(a, "updatedData", this.updatedDataHandler) }, this), a[0].xAxis &&
                                h(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
                        }; f.prototype.init = function (a) {
                            var e = a.options, f = e.navigator, g = f.enabled, d = e.scrollbar, b = d.enabled; e = g ? f.height : 0; var k = b ? d.height : 0; this.handles = []; this.shades = []; this.chart = a; this.setBaseSeries(); this.height = e; this.scrollbarHeight = k; this.scrollbarEnabled = b; this.navigatorEnabled = g; this.navigatorOptions = f; this.scrollbarOptions = d; this.outlineHeight = e + k; this.opposite = p(f.opposite, !(g || !a.inverted)); var h = this; g = h.baseSeries; d = a.xAxis.length;
                            b = a.yAxis.length; var l = g && g[0] && g[0].xAxis || a.xAxis[0] || { options: {} }; a.isDirtyBox = !0; h.navigatorEnabled ? (h.xAxis = new q(a, c({ breaks: l.options.breaks, ordinal: l.options.ordinal }, f.xAxis, { id: "navigator-x-axis", yAxis: "navigator-y-axis", isX: !0, type: "datetime", index: d, isInternal: !0, offset: 0, keepOrdinalPadding: !0, startOnTick: !1, endOnTick: !1, minPadding: 0, maxPadding: 0, zoomEnabled: !1 }, a.inverted ? { offsets: [k, 0, -k, 0], width: e } : { offsets: [0, -k, 0, k], height: e })), h.yAxis = new q(a, c(f.yAxis, {
                                id: "navigator-y-axis", alignTicks: !1,
                                offset: 0, index: b, isInternal: !0, zoomEnabled: !1
                            }, a.inverted ? { width: e } : { height: e })), g || f.series.data ? h.updateNavigatorSeries(!1) : 0 === a.series.length && (h.unbindRedraw = I(a, "beforeRedraw", function () { 0 < a.series.length && !h.series && (h.setBaseSeries(), h.unbindRedraw()) })), h.reversedExtremes = a.inverted && !h.xAxis.reversed || !a.inverted && h.xAxis.reversed, h.renderElements(), h.addMouseEvents()) : (h.xAxis = {
                                chart: a, navigatorAxis: { fake: !0 }, translate: function (b, d) {
                                    var c = a.xAxis[0], e = c.getExtremes(), f = c.len - 2 * k, g = w("min",
                                        c.options.min, e.dataMin); c = w("max", c.options.max, e.dataMax) - g; return d ? b * c / f + g : f * (b - g) / c
                                }, toPixels: function (b) { return this.translate(b) }, toValue: function (b) { return this.translate(b, !0) }
                            }, h.xAxis.navigatorAxis.axis = h.xAxis, h.xAxis.navigatorAxis.toFixedRange = G.AdditionsClass.prototype.toFixedRange.bind(h.xAxis.navigatorAxis)); a.options.scrollbar.enabled && (a.scrollbar = h.scrollbar = new H(a.renderer, c(a.options.scrollbar, { margin: h.navigatorEnabled ? 0 : 10, vertical: a.inverted }), a), I(h.scrollbar, "changed", function (b) {
                                var d =
                                    h.size, c = d * this.to; d *= this.from; h.hasDragged = h.scrollbar.hasDragged; h.render(0, 0, d, c); (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType && "touchmove" !== b.DOMType) && setTimeout(function () { h.onMouseUp(b) })
                            })); h.addBaseSeriesEvents(); h.addChartEvents()
                        }; f.prototype.getUnionExtremes = function (a) {
                            var c = this.chart.xAxis[0], e = this.xAxis, f = e.options, d = c.options, b; a && null === c.dataMin || (b = {
                                dataMin: p(f && f.min, w("min", d.min, c.dataMin, e.dataMin, e.min)), dataMax: p(f && f.max, w("max", d.max, c.dataMax, e.dataMax,
                                    e.max))
                            }); return b
                        }; f.prototype.setBaseSeries = function (a, c) { var e = this.chart, f = this.baseSeries = []; a = a || e.options && e.options.navigator.baseSeries || (e.series.length ? x(e.series, function (a) { return !a.options.isInternal }).index : 0); (e.series || []).forEach(function (d, b) { d.options.isInternal || !d.options.showInNavigator && (b !== a && d.options.id !== a || !1 === d.options.showInNavigator) || f.push(d) }); this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, c) }; f.prototype.updateNavigatorSeries = function (a,
                            f) {
                                var g = this, k = g.chart, d = g.baseSeries, b, m, l = g.navigatorOptions.series, u, q = { enableMouseTracking: !1, index: null, linkedTo: null, group: "nav", padXAxis: !1, xAxis: "navigator-x-axis", yAxis: "navigator-y-axis", showInLegend: !1, stacking: void 0, isInternal: !0, states: { inactive: { opacity: 1 } } }, y = g.series = (g.series || []).filter(function (b) { var a = b.baseSeries; return 0 > d.indexOf(a) ? (a && (h(a, "updatedData", g.updatedDataHandler), delete a.navigatorSeries), b.chart && b.destroy(), !1) : !0 }); d && d.length && d.forEach(function (a) {
                                    var e =
                                        a.navigatorSeries, h = v({ color: a.color, visible: a.visible }, t(l) ? n.navigator.series : l); e && !1 === g.navigatorOptions.adaptToUpdatedData || (q.name = "Navigator " + d.length, b = a.options || {}, u = b.navigatorOptions || {}, m = c(b, q, h, u), m.pointRange = p(h.pointRange, u.pointRange, n.plotOptions[m.type || "line"].pointRange), h = u.data || h.data, g.hasNavigatorData = g.hasNavigatorData || !!h, m.data = h || b.data && b.data.slice(0), e && e.options ? e.update(m, f) : (a.navigatorSeries = k.initSeries(m), a.navigatorSeries.baseSeries = a, y.push(a.navigatorSeries)))
                                });
                            if (l.data && (!d || !d.length) || t(l)) g.hasNavigatorData = !1, l = e(l), l.forEach(function (b, a) { q.name = "Navigator " + (y.length + 1); m = c(n.navigator.series, { color: k.series[a] && !k.series[a].options.isInternal && k.series[a].color || k.options.colors[a] || k.options.colors[0] }, q, b); m.data = b.data; m.data && (g.hasNavigatorData = !0, y.push(k.initSeries(m))) }); a && this.addBaseSeriesEvents()
                        }; f.prototype.addBaseSeriesEvents = function () {
                            var a = this, c = a.baseSeries || []; c[0] && c[0].xAxis && I(c[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                            c.forEach(function (c) { I(c, "show", function () { this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1) }); I(c, "hide", function () { this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1) }); !1 !== this.navigatorOptions.adaptToUpdatedData && c.xAxis && I(c, "updatedData", this.updatedDataHandler); I(c, "remove", function () { this.navigatorSeries && (l(a.series, this.navigatorSeries), L(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries) }) }, this)
                        }; f.prototype.getBaseSeriesMin =
                            function (a) { return this.baseSeries.reduce(function (a, c) { return Math.min(a, c.xData ? c.xData[0] : a) }, a) }; f.prototype.modifyNavigatorAxisExtremes = function () { var a = this.xAxis, c; "undefined" !== typeof a.getExtremes && (!(c = this.getUnionExtremes(!0)) || c.dataMin === a.min && c.dataMax === a.max || (a.min = c.dataMin, a.max = c.dataMax)) }; f.prototype.modifyBaseAxisExtremes = function () {
                                var a = this.chart.navigator, c = this.getExtremes(), e = c.dataMin, f = c.dataMax; c = c.max - c.min; var d = a.stickToMin, b = a.stickToMax, h = p(this.options.overscroll,
                                    0), l = a.series && a.series[0], u = !!this.setExtremes; if (!this.eventArgs || "rangeSelectorButton" !== this.eventArgs.trigger) { if (d) { var n = e; var q = n + c } b && (q = f + h, d || (n = Math.max(e, q - c, a.getBaseSeriesMin(l && l.xData ? l.xData[0] : -Number.MAX_VALUE)))); u && (d || b) && g(n) && (this.min = this.userMin = n, this.max = this.userMax = q) } a.stickToMin = a.stickToMax = null
                            }; f.prototype.updatedDataHandler = function () {
                                var a = this.chart.navigator, c = this.navigatorSeries, e = a.getBaseSeriesMin(this.xData[0]); a.stickToMax = a.reversedExtremes ? 0 === Math.round(a.zoomedMin) :
                                    Math.round(a.zoomedMax) >= Math.round(a.size); a.stickToMin = g(this.xAxis.min) && this.xAxis.min <= e && (!this.chart.fixedRange || !a.stickToMax); c && !a.hasNavigatorData && (c.options.pointStart = this.xData[0], c.setData(this.options.data, !1, null, !1))
                            }; f.prototype.addChartEvents = function () {
                            this.eventsToUnbind || (this.eventsToUnbind = []); this.eventsToUnbind.push(I(this.chart, "redraw", function () { var a = this.navigator, c = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || this.xAxis[0]); c && a.render(c.min, c.max) }),
                                I(this.chart, "getMargins", function () { var a = this.navigator, c = a.opposite ? "plotTop" : "marginBottom"; this.inverted && (c = a.opposite ? "marginRight" : "plotLeft"); this[c] = (this[c] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin }))
                            }; f.prototype.destroy = function () {
                                this.removeEvents(); this.xAxis && (l(this.chart.xAxis, this.xAxis), l(this.chart.axes, this.xAxis)); this.yAxis && (l(this.chart.yAxis, this.yAxis), l(this.chart.axes, this.yAxis)); (this.series || []).forEach(function (a) {
                                a.destroy &&
                                    a.destroy()
                                }); "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function (a) { this[a] && this[a].destroy && this[a].destroy(); this[a] = null }, this);[this.handles].forEach(function (a) { E(a) }, this)
                            }; return f
                    }(); C.Navigator || (C.Navigator = F, G.compose(q), I(f, "beforeShowResetZoom", function () { var a = this.options, c = a.navigator, e = a.rangeSelector; if ((c && c.enabled || e && e.enabled) && (!u && "x" === a.chart.zoomType || u && "x" === a.chart.pinchType)) return !1 }),
                        I(f, "beforeRender", function () { var a = this.options; if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new F(this) }), I(f, "afterSetChartSize", function () {
                            var a = this.legend, c = this.navigator; if (c) {
                                var e = a && a.options; var f = c.xAxis; var g = c.yAxis; var d = c.scrollbarHeight; this.inverted ? (c.left = c.opposite ? this.chartWidth - d - c.height : this.spacing[3] + d, c.top = this.plotTop + d) : (c.left = this.plotLeft + d, c.top = c.navigatorOptions.top || this.chartHeight - c.height - d - this.spacing[2] - (this.rangeSelector &&
                                    this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e && "bottom" === e.verticalAlign && "proximate" !== e.layout && e.enabled && !e.floating ? a.legendHeight + p(e.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0)); f && g && (this.inverted ? f.options.left = g.options.left = c.left : f.options.top = g.options.top = c.top, f.setAxisSize(), g.setAxisSize())
                            }
                        }), I(f, "update", function (a) {
                            var e = a.options.navigator || {}, f = a.options.scrollbar || {}; this.navigator || this.scroller || !e.enabled && !f.enabled || (c(!0, this.options.navigator,
                                e), c(!0, this.options.scrollbar, f), delete a.options.navigator, delete a.options.scrollbar)
                        }), I(f, "afterUpdate", function (a) { this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new F(this), p(a.redraw, !0) && this.redraw(a.animation)) }), I(f, "afterAddSeries", function () { this.navigator && this.navigator.setBaseSeries(null, !1) }), I(B, "afterUpdate", function () {
                            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null,
                                !1)
                        }), f.prototype.callbacks.push(function (a) { var c = a.navigator; c && a.xAxis[0] && (a = a.xAxis[0].getExtremes(), c.render(a.min, a.max)) })); C.Navigator = F; return C.Navigator
            }); N(r, "Core/Axis/OrdinalAxis.js", [r["Core/Axis/Axis.js"], r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f, r) {
                var C = r.addEvent, G = r.css, B = r.defined, H = r.pick, D = r.timeUnits; r = f.Chart; var n = f.Series, I; (function (n) {
                    var q = function () {
                        function n(f) { this.index = {}; this.axis = f } n.prototype.beforeSetTickPositions = function () {
                            var f = this.axis,
                            l = f.ordinal, n = [], q, t = !1, g = f.getExtremes(), c = g.min, p = g.max, h, e = f.isXAxis && !!f.options.breaks; g = f.options.ordinal; var a = Number.MAX_VALUE, u = f.chart.options.chart.ignoreHiddenSeries, w; if (g || e) {
                                f.series.forEach(function (c, f) {
                                    q = []; if (!(u && !1 === c.visible || !1 === c.takeOrdinalPosition && !e) && (n = n.concat(c.processedXData), r = n.length, n.sort(function (a, c) { return a - c }), a = Math.min(a, H(c.closestPointRange, a)), r)) { for (f = 0; f < r - 1;)n[f] !== n[f + 1] && q.push(n[f + 1]), f++; q[0] !== n[0] && q.unshift(n[0]); n = q } c.isSeriesBoosting &&
                                        (w = !0)
                                }); w && (n.length = 0); var r = n.length; if (2 < r) { var y = n[1] - n[0]; for (h = r - 1; h-- && !t;)n[h + 1] - n[h] !== y && (t = !0); !f.options.keepOrdinalPadding && (n[0] - c > y || p - n[n.length - 1] > y) && (t = !0) } else f.options.overscroll && (2 === r ? a = n[1] - n[0] : 1 === r ? (a = f.options.overscroll, n = [n[0], n[0] + a]) : a = l.overscrollPointsRange); t ? (f.options.overscroll && (l.overscrollPointsRange = a, n = n.concat(l.getOverscrollPositions())), l.positions = n, y = f.ordinal2lin(Math.max(c, n[0]), !0), h = Math.max(f.ordinal2lin(Math.min(p, n[n.length - 1]), !0), 1), l.slope =
                                    p = (p - c) / (h - y), l.offset = c - y * p) : (l.overscrollPointsRange = H(f.closestPointRange, l.overscrollPointsRange), l.positions = f.ordinal.slope = l.offset = void 0)
                            } f.isOrdinal = g && t; l.groupIntervalFactor = null
                        }; n.prototype.getExtendedPositions = function () {
                            var n = this, l = n.axis, q = l.constructor.prototype, r = l.chart, t = l.series[0].currentDataGrouping, g = n.index, c = t ? t.count + t.unitName : "raw", p = l.options.overscroll, h = l.getExtremes(), e; g || (g = n.index = {}); if (!g[c]) {
                                var a = {
                                    series: [], chart: r, getExtremes: function () {
                                        return {
                                            min: h.dataMin,
                                            max: h.dataMax + p
                                        }
                                    }, options: { ordinal: !0 }, ordinal: {}, ordinal2lin: q.ordinal2lin, val2lin: q.val2lin
                                }; a.ordinal.axis = a; l.series.forEach(function (c) { e = { xAxis: a, xData: c.xData.slice(), chart: r, destroyGroupedData: f.noop, getProcessedData: f.Series.prototype.getProcessedData }; e.xData = e.xData.concat(n.getOverscrollPositions()); e.options = { dataGrouping: t ? { enabled: !0, forced: !0, approximation: "open", units: [[t.unitName, [t.count]]] } : { enabled: !1 } }; c.processData.apply(e); a.series.push(e) }); l.ordinal.beforeSetTickPositions.apply({ axis: a });
                                g[c] = a.ordinal.positions
                            } return g[c]
                        }; n.prototype.getGroupIntervalFactor = function (f, l, n) { n = n.processedXData; var q = n.length, t = []; var g = this.groupIntervalFactor; if (!g) { for (g = 0; g < q - 1; g++)t[g] = n[g + 1] - n[g]; t.sort(function (c, f) { return c - f }); t = t[Math.floor(q / 2)]; f = Math.max(f, n[0]); l = Math.min(l, n[q - 1]); this.groupIntervalFactor = g = q * t / (l - f) } return g }; n.prototype.getOverscrollPositions = function () {
                            var f = this.axis, l = f.options.overscroll, n = this.overscrollPointsRange, q = [], t = f.dataMax; if (B(n)) for (q.push(t); t <= f.dataMax +
                                l;)t += n, q.push(t); return q
                        }; n.prototype.postProcessTickInterval = function (f) { var l = this.axis, n = this.slope; return n ? l.options.breaks ? l.closestPointRange || f : f / (n / l.closestPointRange) : f }; return n
                    }(); n.Composition = q; n.compose = function (f, q, l) {
                        f.keepProps.push("ordinal"); var r = f.prototype; f.prototype.getTimeTicks = function (f, l, g, c, p, h, e) {
                        void 0 === p && (p = []); void 0 === h && (h = 0); var a = 0, n, q, t = {}, y = [], k = -Number.MAX_VALUE, r = this.options.tickPixelInterval, v = this.chart.time, x = []; if (!this.options.ordinal && !this.options.breaks ||
                            !p || 3 > p.length || "undefined" === typeof l) return v.getTimeTicks.apply(v, arguments); var d = p.length; for (n = 0; n < d; n++) { var b = n && p[n - 1] > g; p[n] < l && (a = n); if (n === d - 1 || p[n + 1] - p[n] > 5 * h || b) { if (p[n] > k) { for (q = v.getTimeTicks(f, p[a], p[n], c); q.length && q[0] <= k;)q.shift(); q.length && (k = q[q.length - 1]); x.push(y.length); y = y.concat(q) } a = n + 1 } if (b) break } q = q.info; if (e && q.unitRange <= D.hour) {
                                n = y.length - 1; for (a = 1; a < n; a++)if (v.dateFormat("%d", y[a]) !== v.dateFormat("%d", y[a - 1])) { t[y[a]] = "day"; var m = !0 } m && (t[y[0]] = "day"); q.higherRanks =
                                    t
                            } q.segmentStarts = x; y.info = q; if (e && B(r)) { a = x = y.length; m = []; var A; for (v = []; a--;)n = this.translate(y[a]), A && (v[a] = A - n), m[a] = A = n; v.sort(); v = v[Math.floor(v.length / 2)]; v < .6 * r && (v = null); a = y[x - 1] > g ? x - 1 : x; for (A = void 0; a--;)n = m[a], x = Math.abs(A - n), A && x < .8 * r && (null === v || x < .8 * v) ? (t[y[a]] && !t[y[a + 1]] ? (x = a + 1, A = n) : x = a, y.splice(x, 1)) : A = n } return y
                        }; r.lin2val = function (f, l) {
                            var g = this.ordinal, c = g.positions; if (c) {
                                var p = g.slope, h = g.offset; g = c.length - 1; if (l) if (0 > f) f = c[0]; else if (f > g) f = c[g]; else {
                                    g = Math.floor(f); var e = f -
                                        g
                                } else for (; g--;)if (l = p * g + h, f >= l) { p = p * (g + 1) + h; e = (f - l) / (p - l); break } return "undefined" !== typeof e && "undefined" !== typeof c[g] ? c[g] + (e ? e * (c[g + 1] - c[g]) : 0) : f
                            } return f
                        }; r.val2lin = function (f, l) { var g = this.ordinal, c = g.positions; if (c) { var p = c.length, h; for (h = p; h--;)if (c[h] === f) { var e = h; break } for (h = p - 1; h--;)if (f > c[h] || 0 === h) { f = (f - c[h]) / (c[h + 1] - c[h]); e = h + f; break } l = l ? e : g.slope * (e || 0) + g.offset } else l = f; return l }; r.ordinal2lin = r.val2lin; C(f, "afterInit", function () { this.ordinal || (this.ordinal = new n.Composition(this)) });
                        C(f, "foundExtremes", function () { this.isXAxis && B(this.options.overscroll) && this.max === this.dataMax && (!this.chart.mouseIsDown || this.isInternal) && (!this.eventArgs || this.eventArgs && "navigator" !== this.eventArgs.trigger) && (this.max += this.options.overscroll, !this.isInternal && B(this.userMin) && (this.min += this.options.overscroll)) }); C(f, "afterSetScale", function () { this.horiz && !this.isDirty && (this.isDirty = this.isOrdinal && this.chart.navigator && !this.chart.navigator.adaptToUpdatedData) }); C(f, "initialAxisTranslation",
                            function () { this.ordinal && (this.ordinal.beforeSetTickPositions(), this.tickInterval = this.ordinal.postProcessTickInterval(this.tickInterval)) }); C(q, "pan", function (f) {
                                var l = this.xAxis[0], g = l.options.overscroll, c = f.originalEvent.chartX, p = this.options.chart && this.options.chart.panning, h = !1; if (p && "y" !== p.type && l.options.ordinal && l.series.length) {
                                    var e = this.mouseDownX, a = l.getExtremes(), n = a.dataMax, q = a.min, r = a.max, y = this.hoverPoints, k = l.closestPointRange || l.ordinal && l.ordinal.overscrollPointsRange; e = (e - c) /
                                        (l.translationSlope * (l.ordinal.slope || k)); var z = { ordinal: { positions: l.ordinal.getExtendedPositions() } }; k = l.lin2val; var v = l.val2lin; if (!z.ordinal.positions) h = !0; else if (1 < Math.abs(e)) {
                                            y && y.forEach(function (a) { a.setState() }); if (0 > e) { y = z; var x = l.ordinal.positions ? l : z } else y = l.ordinal.positions ? l : z, x = z; z = x.ordinal.positions; n > z[z.length - 1] && z.push(n); this.fixedRange = r - q; e = l.navigatorAxis.toFixedRange(null, null, k.apply(y, [v.apply(y, [q, !0]) + e, !0]), k.apply(x, [v.apply(x, [r, !0]) + e, !0])); e.min >= Math.min(a.dataMin,
                                                q) && e.max <= Math.max(n, r) + g && l.setExtremes(e.min, e.max, !0, !1, { trigger: "pan" }); this.mouseDownX = c; G(this.container, { cursor: "move" })
                                        }
                                } else h = !0; h || p && /y/.test(p.type) ? g && (l.max = l.dataMax + g) : f.preventDefault()
                            }); C(l, "updatedData", function () { var f = this.xAxis; f && f.options.ordinal && delete f.ordinal.index })
                    }
                })(I || (I = {})); I.compose(q, r, n); return I
            }); N(r, "Core/Axis/BrokenAxis.js", [r["Core/Axis/Axis.js"], r["Core/Globals.js"], r["Core/Utilities.js"], r["Extensions/Stacking.js"]], function (q, f, r, C) {
                var G = r.addEvent,
                B = r.find, H = r.fireEvent, D = r.isArray, n = r.isNumber, I = r.pick, M = f.Series, A = function () {
                    function f(f) { this.hasBreaks = !1; this.axis = f } f.isInBreak = function (f, l) { var n = f.repeat || Infinity, q = f.from, r = f.to - f.from; l = l >= q ? (l - q) % n : n - (q - l) % n; return f.inclusive ? l <= r : l < r && 0 !== l }; f.lin2Val = function (n) { var l = this.brokenAxis; l = l && l.breakArray; if (!l) return n; var q; for (q = 0; q < l.length; q++) { var r = l[q]; if (r.from >= n) break; else r.to < n ? n += r.len : f.isInBreak(r, n) && (n += r.len) } return n }; f.val2Lin = function (n) {
                        var l = this.brokenAxis;
                        l = l && l.breakArray; if (!l) return n; var q = n, r; for (r = 0; r < l.length; r++) { var t = l[r]; if (t.to <= n) q -= t.len; else if (t.from >= n) break; else if (f.isInBreak(t, n)) { q -= n - t.from; break } } return q
                    }; f.prototype.findBreakAt = function (f, l) { return B(l, function (l) { return l.from < f && f < l.to }) }; f.prototype.isInAnyBreak = function (n, l) { var q = this.axis, r = q.options.breaks, t = r && r.length, g; if (t) { for (; t--;)if (f.isInBreak(r[t], n)) { var c = !0; g || (g = I(r[t].showPoints, !q.isXAxis)) } var p = c && l ? c && !g : c } return p }; f.prototype.setBreaks = function (n,
                        l) {
                            var r = this, x = r.axis, t = D(n) && !!n.length; x.isDirty = r.hasBreaks !== t; r.hasBreaks = t; x.options.breaks = x.userOptions.breaks = n; x.forceRedraw = !0; x.series.forEach(function (f) { f.isDirty = !0 }); t || x.val2lin !== f.val2Lin || (delete x.val2lin, delete x.lin2val); t && (x.userOptions.ordinal = !1, x.lin2val = f.lin2Val, x.val2lin = f.val2Lin, x.setExtremes = function (f, c, l, h, e) {
                                if (r.hasBreaks) { for (var a, g = this.options.breaks; a = r.findBreakAt(f, g);)f = a.to; for (; a = r.findBreakAt(c, g);)c = a.from; c < f && (c = f) } q.prototype.setExtremes.call(this,
                                    f, c, l, h, e)
                            }, x.setAxisTranslation = function (g) {
                                q.prototype.setAxisTranslation.call(this, g); r.unitLength = null; if (r.hasBreaks) {
                                    g = x.options.breaks || []; var c = [], l = [], h = 0, e, a = x.userMin || x.min, n = x.userMax || x.max, t = I(x.pointRangePadding, 0), v; g.forEach(function (c) { e = c.repeat || Infinity; f.isInBreak(c, a) && (a += c.to % e - a % e); f.isInBreak(c, n) && (n -= n % e - c.from % e) }); g.forEach(function (f) {
                                        k = f.from; for (e = f.repeat || Infinity; k - e > a;)k -= e; for (; k < a;)k += e; for (v = k; v < n; v += e)c.push({ value: v, move: "in" }), c.push({
                                            value: v + (f.to - f.from),
                                            move: "out", size: f.breakSize
                                        })
                                    }); c.sort(function (a, c) { return a.value === c.value ? ("in" === a.move ? 0 : 1) - ("in" === c.move ? 0 : 1) : a.value - c.value }); var y = 0; var k = a; c.forEach(function (a) { y += "in" === a.move ? 1 : -1; 1 === y && "in" === a.move && (k = a.value); 0 === y && (l.push({ from: k, to: a.value, len: a.value - k - (a.size || 0) }), h += a.value - k - (a.size || 0)) }); x.breakArray = r.breakArray = l; r.unitLength = n - a - h + t; H(x, "afterBreaks"); x.staticScale ? x.transA = x.staticScale : r.unitLength && (x.transA *= (n - x.min + t) / r.unitLength); t && (x.minPixelPadding = x.transA *
                                        x.minPointOffset); x.min = a; x.max = n
                                }
                            }); I(l, !0) && x.chart.redraw()
                    }; return f
                }(); f = function () {
                    function f() { } f.compose = function (f, l) {
                        f.keepProps.push("brokenAxis"); var q = M.prototype; q.drawBreaks = function (f, l) {
                            var g = this, c = g.points, p, h, e, a; if (f && f.brokenAxis && f.brokenAxis.hasBreaks) {
                                var q = f.brokenAxis; l.forEach(function (l) {
                                    p = q && q.breakArray || []; h = f.isXAxis ? f.min : I(g.options.threshold, f.min); c.forEach(function (c) {
                                        a = I(c["stack" + l.toUpperCase()], c[l]); p.forEach(function (g) {
                                            if (n(h) && n(a)) {
                                                e = !1; if (h < g.from &&
                                                    a > g.to || h > g.from && a < g.from) e = "pointBreak"; else if (h < g.from && a > g.from && a < g.to || h > g.from && a > g.to && a < g.from) e = "pointInBreak"; e && H(f, e, { point: c, brk: g })
                                            }
                                        })
                                    })
                                })
                            }
                        }; q.gappedPath = function () {
                            var f = this.currentDataGrouping, l = f && f.gapSize; f = this.options.gapSize; var g = this.points.slice(), c = g.length - 1, p = this.yAxis, h; if (f && 0 < c) for ("value" !== this.options.gapUnit && (f *= this.basePointRange), l && l > f && l >= this.basePointRange && (f = l), h = void 0; c--;)h && !1 !== h.visible || (h = g[c + 1]), l = g[c], !1 !== h.visible && !1 !== l.visible && (h.x -
                                l.x > f && (h = (l.x + h.x) / 2, g.splice(c + 1, 0, { isNull: !0, x: h }), p.stacking && this.options.stacking && (h = p.stacking.stacks[this.stackKey][h] = new C(p, p.options.stackLabels, !1, h, this.stack), h.total = 0)), h = l); return this.getGraphPath(g)
                        }; G(f, "init", function () { this.brokenAxis || (this.brokenAxis = new A(this)) }); G(f, "afterInit", function () { "undefined" !== typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, !1) }); G(f, "afterSetTickPositions", function () {
                            var f = this.brokenAxis; if (f && f.hasBreaks) {
                                var l = this.tickPositions,
                                g = this.tickPositions.info, c = [], p; for (p = 0; p < l.length; p++)f.isInAnyBreak(l[p]) || c.push(l[p]); this.tickPositions = c; this.tickPositions.info = g
                            }
                        }); G(f, "afterSetOptions", function () { this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1) }); G(l, "afterGeneratePoints", function () {
                            var f = this.options.connectNulls, l = this.points, g = this.xAxis, c = this.yAxis; if (this.isDirty) for (var p = l.length; p--;) {
                                var h = l[p], e = !(null === h.y && !1 === f) && (g && g.brokenAxis && g.brokenAxis.isInAnyBreak(h.x, !0) || c && c.brokenAxis &&
                                    c.brokenAxis.isInAnyBreak(h.y, !0)); h.visible = e ? !1 : !1 !== h.options.visible
                            }
                        }); G(l, "afterRender", function () { this.drawBreaks(this.xAxis, ["x"]); this.drawBreaks(this.yAxis, I(this.pointArrayMap, ["y"])) })
                    }; return f
                }(); f.compose(q, M); return f
            }); N(r, "masters/modules/broken-axis.src.js", [], function () { }); N(r, "Extensions/DataGrouping.js", [r["Core/Axis/DateTimeAxis.js"], r["Core/Globals.js"], r["Core/Options.js"], r["Core/Series/Point.js"], r["Core/Tooltip.js"], r["Core/Utilities.js"]], function (q, f, r, C, G, B) {
                ""; var H =
                    B.addEvent, D = B.arrayMax, n = B.arrayMin, I = B.correctFloat, M = B.defined, A = B.error, L = B.extend, E = B.format, l = B.isNumber, v = B.merge, x = B.pick, t = f.Axis; B = f.Series; var g = f.approximations = {
                        sum: function (a) { var c = a.length; if (!c && a.hasNulls) var e = null; else if (c) for (e = 0; c--;)e += a[c]; return e }, average: function (a) { var c = a.length; a = g.sum(a); l(a) && c && (a = I(a / c)); return a }, averages: function () { var a = [];[].forEach.call(arguments, function (c) { a.push(g.average(c)) }); return "undefined" === typeof a[0] ? void 0 : a }, open: function (a) {
                            return a.length ?
                                a[0] : a.hasNulls ? null : void 0
                        }, high: function (a) { return a.length ? D(a) : a.hasNulls ? null : void 0 }, low: function (a) { return a.length ? n(a) : a.hasNulls ? null : void 0 }, close: function (a) { return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0 }, ohlc: function (a, c, e, f) { a = g.open(a); c = g.high(c); e = g.low(e); f = g.close(f); if (l(a) || l(c) || l(e) || l(f)) return [a, c, e, f] }, range: function (a, c) { a = g.low(a); c = g.high(c); if (l(a) || l(c)) return [a, c]; if (null === a && null === c) return null }
                    }, c = function (a, c, e, f) {
                        var k = this, d = k.data, b = k.options && k.options.data,
                        h = [], p = [], n = [], q = a.length, u = !!c, r = [], w = k.pointArrayMap, t = w && w.length, y = ["x"].concat(w || ["y"]), z = 0, F = 0, x; f = "function" === typeof f ? f : g[f] ? g[f] : g[k.getDGApproximation && k.getDGApproximation() || "average"]; t ? w.forEach(function () { r.push([]) }) : r.push([]); var B = t || 1; for (x = 0; x <= q && !(a[x] >= e[0]); x++); for (x; x <= q; x++) {
                            for (; "undefined" !== typeof e[z + 1] && a[x] >= e[z + 1] || x === q;) {
                                var A = e[z]; k.dataGroupInfo = { start: k.cropStart + F, length: r[0].length }; var D = f.apply(k, r); k.pointClass && !M(k.dataGroupInfo.options) && (k.dataGroupInfo.options =
                                    v(k.pointClass.prototype.optionsToObject.call({ series: k }, k.options.data[k.cropStart + F])), y.forEach(function (b) { delete k.dataGroupInfo.options[b] })); "undefined" !== typeof D && (h.push(A), p.push(D), n.push(k.dataGroupInfo)); F = x; for (A = 0; A < B; A++)r[A].length = 0, r[A].hasNulls = !1; z += 1; if (x === q) break
                            } if (x === q) break; if (w) for (A = k.cropStart + x, D = d && d[A] || k.pointClass.prototype.applyOptions.apply({ series: k }, [b[A]]), A = 0; A < t; A++) { var C = D[w[A]]; l(C) ? r[A].push(C) : null === C && (r[A].hasNulls = !0) } else A = u ? c[x] : null, l(A) ? r[0].push(A) :
                                null === A && (r[0].hasNulls = !0)
                        } return { groupedXData: h, groupedYData: p, groupMap: n }
                    }, p = { approximations: g, groupData: c }, h = B.prototype, e = h.processData, a = h.generatePoints, u = {
                        groupPixelWidth: 2, dateTimeLabelFormats: {
                            millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"], second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"], minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                            week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"], month: ["%B %Y", "%B", "-%B %Y"], year: ["%Y", "%Y", "-%Y"]
                        }
                    }, w = { line: {}, spline: {}, area: {}, areaspline: {}, arearange: {}, column: { groupPixelWidth: 10 }, columnrange: { groupPixelWidth: 10 }, candlestick: { groupPixelWidth: 10 }, ohlc: { groupPixelWidth: 5 } }, F = f.defaultDataGroupingUnits = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year",
                        null]]; h.getDGApproximation = function () { return this.is("arearange") ? "range" : this.is("ohlc") ? "ohlc" : this.is("column") ? "sum" : "average" }; h.groupData = c; h.processData = function () {
                            var a = this.chart, c = this.options.dataGrouping, f = !1 !== this.allowDG && c && x(c.enabled, a.options.isStock), g = this.visible || !a.options.chart.ignoreHiddenSeries, l, d = this.currentDataGrouping, b = !1; this.forceCrop = f; this.groupPixelWidth = null; this.hasProcessed = !0; f && !this.requireSorting && (this.requireSorting = b = !0); f = !1 === e.apply(this, arguments) ||
                                !f; b && (this.requireSorting = !1); if (!f) {
                                    this.destroyGroupedData(); f = c.groupAll ? this.xData : this.processedXData; var m = c.groupAll ? this.yData : this.processedYData, p = a.plotSizeX; a = this.xAxis; var n = a.options.ordinal, u = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth(); if (u) {
                                    this.isDirty = l = !0; this.points = null; b = a.getExtremes(); var r = b.min; b = b.max; n = n && a.ordinal && a.ordinal.getGroupIntervalFactor(r, b, this) || 1; u = u * (b - r) / p * n; p = a.getTimeTicks(q.AdditionsClass.prototype.normalizeTimeTickInterval(u,
                                        c.units || F), Math.min(r, f[0]), Math.max(b, f[f.length - 1]), a.options.startOfWeek, f, this.closestPointRange); m = h.groupData.apply(this, [f, m, p, c.approximation]); f = m.groupedXData; n = m.groupedYData; var w = 0; if (c.smoothed && f.length) { var t = f.length - 1; for (f[t] = Math.min(f[t], b); t-- && 0 < t;)f[t] += u / 2; f[0] = Math.max(f[0], r) } for (t = 1; t < p.length; t++)p.info.segmentStarts && -1 !== p.info.segmentStarts.indexOf(t) || (w = Math.max(p[t] - p[t - 1], w)); r = p.info; r.gapSize = w; this.closestPointRange = p.info.totalRange; this.groupMap = m.groupMap;
                                        if (M(f[0]) && f[0] < a.min && g) { if (!M(a.options.min) && a.min <= a.dataMin || a.min === a.dataMin) a.min = Math.min(f[0], a.min); a.dataMin = Math.min(f[0], a.dataMin) } c.groupAll && (c = this.cropData(f, n, a.min, a.max, 1), f = c.xData, n = c.yData); this.processedXData = f; this.processedYData = n
                                    } else this.groupMap = null; this.hasGroupedData = l; this.currentDataGrouping = r; this.preventGraphAnimation = (d && d.totalRange) !== (r && r.totalRange)
                                }
                        }; h.destroyGroupedData = function () {
                        this.groupedData && (this.groupedData.forEach(function (a, c) {
                            a && (this.groupedData[c] =
                                a.destroy ? a.destroy() : null)
                        }, this), this.groupedData.length = 0)
                        }; h.generatePoints = function () { a.apply(this); this.destroyGroupedData(); this.groupedData = this.hasGroupedData ? this.points : null }; H(C, "update", function () { if (this.dataGroup) return A(24, !1, this.series.chart), !1 }); H(G, "headerFormatter", function (a) {
                            var c = this.chart, e = c.time, f = a.labelConfig, g = f.series, d = g.tooltipOptions, b = g.options.dataGrouping, h = d.xDateFormat, p = g.xAxis, n = d[(a.isFooter ? "footer" : "header") + "Format"]; if (p && "datetime" === p.options.type &&
                                b && l(f.key)) { var q = g.currentDataGrouping; b = b.dateTimeLabelFormats || u.dateTimeLabelFormats; if (q) if (d = b[q.unitName], 1 === q.count) h = d[0]; else { h = d[1]; var r = d[2] } else !h && b && (h = this.getXDateFormat(f, d, p)); h = e.dateFormat(h, f.key); r && (h += e.dateFormat(r, f.key + q.totalRange - 1)); g.chart.styledMode && (n = this.styledModeFormat(n)); a.text = E(n, { point: L(f.point, { key: h }), series: g }, c); a.preventDefault() }
                        }); H(B, "destroy", h.destroyGroupedData); H(B, "afterSetOptions", function (a) {
                            a = a.options; var c = this.type, e = this.chart.options.plotOptions,
                                f = r.defaultOptions.plotOptions[c].dataGrouping, g = this.useCommonDataGrouping && u; if (w[c] || g) f || (f = v(u, w[c])), a.dataGrouping = v(g, f, e.series && e.series.dataGrouping, e[c].dataGrouping, this.userOptions.dataGrouping)
                        }); H(t, "afterSetScale", function () { this.series.forEach(function (a) { a.hasProcessed = !1 }) }); t.prototype.getGroupPixelWidth = function () {
                            var a = this.series, c = a.length, e, f = 0, g = !1, d; for (e = c; e--;)(d = a[e].options.dataGrouping) && (f = Math.max(f, x(d.groupPixelWidth, u.groupPixelWidth))); for (e = c; e--;)(d = a[e].options.dataGrouping) &&
                                a[e].hasProcessed && (c = (a[e].processedXData || a[e].data).length, a[e].groupPixelWidth || c > this.chart.plotSizeX / f || c && d.forced) && (g = !0); return g ? f : 0
                        }; t.prototype.setDataGrouping = function (a, c) { var e; c = x(c, !0); a || (a = { forced: !1, units: null }); if (this instanceof t) for (e = this.series.length; e--;)this.series[e].update({ dataGrouping: a }, !1); else this.chart.options.series.forEach(function (c) { c.dataGrouping = a }, !1); this.ordinal && (this.ordinal.slope = void 0); c && this.chart.redraw() }; f.dataGrouping = p; ""; return p
            }); N(r,
                "Series/OHLCSeries.js", [r["Core/Globals.js"], r["Core/Series/Point.js"], r["Core/Utilities.js"]], function (q, f, r) {
                    r = r.seriesType; var C = q.seriesTypes; r("ohlc", "column", { lineWidth: 1, tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>' }, threshold: null, states: { hover: { lineWidth: 3 } }, stickyTracking: !0 }, {
                        directTouch: !1, pointArrayMap: ["open", "high", "low", "close"], toYData: function (f) {
                            return [f.open,
                            f.high, f.low, f.close]
                        }, pointValKey: "close", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, init: function () { C.column.prototype.init.apply(this, arguments); this.options.stacking = void 0 }, pointAttribs: function (f, q) { q = C.column.prototype.pointAttribs.call(this, f, q); var r = this.options; delete q.fill; !f.options.color && r.upColor && f.open < f.close && (q.stroke = r.upColor); return q }, translate: function () {
                            var f = this, q = f.yAxis, r = !!f.modifyValue, D = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                            C.column.prototype.translate.apply(f); f.points.forEach(function (n) { [n.open, n.high, n.low, n.close, n.low].forEach(function (B, C) { null !== B && (r && (B = f.modifyValue(B)), n[D[C]] = q.toPixels(B, !0)) }); n.tooltipPos[1] = n.plotHigh + q.pos - f.chart.plotTop })
                        }, drawPoints: function () {
                            var f = this, q = f.chart, r = function (f, n, q) { var r = f[0]; f = f[1]; "number" === typeof r[2] && (r[2] = Math.max(q + n, r[2])); "number" === typeof f[2] && (f[2] = Math.min(q - n, f[2])) }; f.points.forEach(function (B) {
                                var n = B.graphic, C = !n; if ("undefined" !== typeof B.plotY) {
                                    n ||
                                    (B.graphic = n = q.renderer.path().add(f.group)); q.styledMode || n.attr(f.pointAttribs(B, B.selected && "select")); var D = n.strokeWidth(); var A = D % 2 / 2; var G = Math.round(B.plotX) - A; var E = Math.round(B.shapeArgs.width / 2); var l = [["M", G, Math.round(B.yBottom)], ["L", G, Math.round(B.plotHigh)]]; if (null !== B.open) { var v = Math.round(B.plotOpen) + A; l.push(["M", G, v], ["L", G - E, v]); r(l, D / 2, v) } null !== B.close && (v = Math.round(B.plotClose) + A, l.push(["M", G, v], ["L", G + E, v]), r(l, D / 2, v)); n[C ? "attr" : "animate"]({ d: l }).addClass(B.getClassName(),
                                        !0)
                                }
                            })
                        }, animate: null
                    }, { getClassName: function () { return f.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down") } }); ""
                }); N(r, "Series/CandlestickSeries.js", [r["Core/Globals.js"], r["Core/Options.js"], r["Core/Utilities.js"]], function (q, f, r) {
                    f = f.defaultOptions; var C = r.merge; r = r.seriesType; var G = q.seriesTypes; r("candlestick", "ohlc", C(f.plotOptions.column, {
                        states: { hover: { lineWidth: 2 } }, tooltip: f.plotOptions.ohlc.tooltip, threshold: null, lineColor: "#000000", lineWidth: 1,
                        upColor: "#ffffff", stickyTracking: !0
                    }), {
                        pointAttribs: function (f, q) { var r = G.column.prototype.pointAttribs.call(this, f, q), n = this.options, B = f.open < f.close, C = n.lineColor || this.color; r["stroke-width"] = n.lineWidth; r.fill = f.options.color || (B ? n.upColor || this.color : this.color); r.stroke = f.options.lineColor || (B ? n.upLineColor || C : C); q && (f = n.states[q], r.fill = f.color || r.fill, r.stroke = f.lineColor || r.stroke, r["stroke-width"] = f.lineWidth || r["stroke-width"]); return r }, drawPoints: function () {
                            var f = this, q = f.chart, r = f.yAxis.reversed;
                            f.points.forEach(function (n) {
                                var B = n.graphic, C = !B; if ("undefined" !== typeof n.plotY) {
                                    B || (n.graphic = B = q.renderer.path().add(f.group)); f.chart.styledMode || B.attr(f.pointAttribs(n, n.selected && "select")).shadow(f.options.shadow); var A = B.strokeWidth() % 2 / 2; var D = Math.round(n.plotX) - A; var E = n.plotOpen; var l = n.plotClose; var v = Math.min(E, l); E = Math.max(E, l); var x = Math.round(n.shapeArgs.width / 2); l = r ? E !== n.yBottom : Math.round(v) !== Math.round(n.plotHigh); var t = r ? Math.round(v) !== Math.round(n.plotHigh) : E !== n.yBottom;
                                    v = Math.round(v) + A; E = Math.round(E) + A; A = []; A.push(["M", D - x, E], ["L", D - x, v], ["L", D + x, v], ["L", D + x, E], ["Z"], ["M", D, v], ["L", D, l ? Math.round(r ? n.yBottom : n.plotHigh) : v], ["M", D, E], ["L", D, t ? Math.round(r ? n.plotHigh : n.yBottom) : E]); B[C ? "attr" : "animate"]({ d: A }).addClass(n.getClassName(), !0)
                                }
                            })
                        }
                    }); ""
                }); N(r, "Mixins/OnSeries.js", [r["Core/Globals.js"], r["Core/Utilities.js"]], function (q, f) {
                    var r = f.defined, C = f.stableSort, G = q.seriesTypes; return {
                        getPlotBox: function () {
                            return q.Series.prototype.getPlotBox.call(this.options.onSeries &&
                                this.chart.get(this.options.onSeries) || this)
                        }, translate: function () {
                            G.column.prototype.translate.apply(this); var f = this, q = f.options, D = f.chart, n = f.points, I = n.length - 1, M, A = q.onSeries; A = A && D.get(A); q = q.onKey || "y"; var L = A && A.options.step, E = A && A.points, l = E && E.length, v = D.inverted, x = f.xAxis, t = f.yAxis, g = 0, c; if (A && A.visible && l) {
                                g = (A.pointXOffset || 0) + (A.barW || 0) / 2; D = A.currentDataGrouping; var p = E[l - 1].x + (D ? D.totalRange : 0); C(n, function (a, c) { return a.x - c.x }); for (q = "plot" + q[0].toUpperCase() + q.substr(1); l-- && n[I];) {
                                    var h =
                                        E[l]; D = n[I]; D.y = h.y; if (h.x <= D.x && "undefined" !== typeof h[q]) { if (D.x <= p && (D.plotY = h[q], h.x < D.x && !L && (c = E[l + 1]) && "undefined" !== typeof c[q])) { var e = (D.x - h.x) / (c.x - h.x); D.plotY += e * (c[q] - h[q]); D.y += e * (c.y - h.y) } I--; l++; if (0 > I) break }
                                }
                            } n.forEach(function (a, c) {
                            a.plotX += g; if ("undefined" === typeof a.plotY || v) 0 <= a.plotX && a.plotX <= x.len ? v ? (a.plotY = x.translate(a.x, 0, 1, 0, 1), a.plotX = r(a.y) ? t.translate(a.y, 0, 0, 0, 1) : 0) : a.plotY = (x.opposite ? 0 : f.yAxis.len) + x.offset : a.shapeArgs = {}; if ((M = n[c - 1]) && M.plotX === a.plotX) {
                            "undefined" ===
                                typeof M.stackIndex && (M.stackIndex = 0); var e = M.stackIndex + 1
                            } a.stackIndex = e
                            }); this.onSeries = A
                        }
                    }
                }); N(r, "Series/FlagsSeries.js", [r["Core/Globals.js"], r["Core/Renderer/SVG/SVGElement.js"], r["Core/Renderer/SVG/SVGRenderer.js"], r["Core/Utilities.js"], r["Mixins/OnSeries.js"]], function (q, f, r, C, G) {
                    function B(f) {
                    t[f + "pin"] = function (c, g, h, e, a) {
                        var l = a && a.anchorX; a = a && a.anchorY; "circle" === f && e > h && (c -= Math.round((e - h) / 2), h = e); var p = t[f](c, g, h, e); if (l && a) {
                            var n = l; "circle" === f ? n = c + h / 2 : (c = p[0], h = p[1], "M" === c[0] &&
                                "L" === h[0] && (n = (c[1] + h[1]) / 2)); p.push(["M", n, g > a ? g : g + e], ["L", l, a]); p = p.concat(t.circle(l - 1, a - 1, 2, 2))
                        } return p
                    }
                    } var H = C.addEvent, D = C.defined, n = C.isNumber, I = C.merge, M = C.objectEach, A = C.seriesType, L = C.wrap; C = q.noop; var E = q.Renderer, l = q.Series, v = q.TrackerMixin, x = q.VMLRenderer, t = r.prototype.symbols; A("flags", "column", {
                        pointRange: 0, allowOverlapX: !1, shape: "flag", stackDistance: 12, textAlign: "center", tooltip: { pointFormat: "{point.text}<br/>" }, threshold: null, y: -30, fillColor: "#ffffff", lineWidth: 1, states: {
                            hover: {
                                lineColor: "#000000",
                                fillColor: "#ccd6eb"
                            }
                        }, style: { fontSize: "11px", fontWeight: "bold" }
                    }, {
                        sorted: !1, noSharedTooltip: !0, allowDG: !1, takeOrdinalPosition: !1, trackerGroups: ["markerGroup"], forceCrop: !0, init: l.prototype.init, pointAttribs: function (f, c) { var g = this.options, h = f && f.color || this.color, e = g.lineColor, a = f && f.lineWidth; f = f && f.fillColor || g.fillColor; c && (f = g.states[c].fillColor, e = g.states[c].lineColor, a = g.states[c].lineWidth); return { fill: f || h, stroke: e || h, "stroke-width": a || g.lineWidth || 0 } }, translate: G.translate, getPlotBox: G.getPlotBox,
                        drawPoints: function () {
                            var g = this.points, c = this.chart, l = c.renderer, h = c.inverted, e = this.options, a = e.y, n, r = this.yAxis, t = {}, y = []; for (n = g.length; n--;) {
                                var k = g[n]; var v = (h ? k.plotY : k.plotX) > this.xAxis.len; var x = k.plotX; var A = k.stackIndex; var d = k.options.shape || e.shape; var b = k.plotY; "undefined" !== typeof b && (b = k.plotY + a - ("undefined" !== typeof A && A * e.stackDistance)); k.anchorX = A ? void 0 : k.plotX; var m = A ? void 0 : k.plotY; var B = "flag" !== d; A = k.graphic; "undefined" !== typeof b && 0 <= x && !v ? (A || (A = k.graphic = l.label("", null,
                                    null, d, null, null, e.useHTML), c.styledMode || A.attr(this.pointAttribs(k)).css(I(e.style, k.style)), A.attr({ align: B ? "center" : "left", width: e.width, height: e.height, "text-align": e.textAlign }).addClass("highcharts-point").add(this.markerGroup), k.graphic.div && (k.graphic.div.point = k), c.styledMode || A.shadow(e.shadow), A.isNew = !0), 0 < x && (x -= A.strokeWidth() % 2), d = { y: b, anchorY: m }, e.allowOverlapX && (d.x = x, d.anchorX = k.anchorX), A.attr({ text: k.options.title || e.title || "A" })[A.isNew ? "attr" : "animate"](d), e.allowOverlapX ||
                                    (t[k.plotX] ? t[k.plotX].size = Math.max(t[k.plotX].size, A.width) : t[k.plotX] = { align: B ? .5 : 0, size: A.width, target: x, anchorX: x }), k.tooltipPos = [x, b + r.pos - c.plotTop]) : A && (k.graphic = A.destroy())
                            } e.allowOverlapX || (M(t, function (a) { a.plotX = a.anchorX; y.push(a) }), q.distribute(y, h ? r.len : this.xAxis.len, 100), g.forEach(function (a) {
                                var b = a.graphic && t[a.plotX]; b && (a.graphic[a.graphic.isNew ? "attr" : "animate"]({ x: b.pos + b.align * b.size, anchorX: a.anchorX }), D(b.pos) ? a.graphic.isNew = !1 : (a.graphic.attr({ x: -9999, anchorX: -9999 }),
                                    a.graphic.isNew = !0))
                            })); e.useHTML && L(this.markerGroup, "on", function (a) { return f.prototype.on.apply(a.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1)) })
                        }, drawTracker: function () { var f = this.points; v.drawTrackerPoint.apply(this); f.forEach(function (c) { var g = c.graphic; g && H(g.element, "mouseover", function () { 0 < c.stackIndex && !c.raised && (c._y = g.y, g.attr({ y: c._y - 8 }), c.raised = !0); f.forEach(function (f) { f !== c && f.raised && f.graphic && (f.graphic.attr({ y: f._y }), f.raised = !1) }) }) }) }, animate: function (f) {
                            f &&
                            this.setClip()
                        }, setClip: function () { l.prototype.setClip.apply(this, arguments); !1 !== this.options.clip && this.sharedClipKey && this.markerGroup.clip(this.chart[this.sharedClipKey]) }, buildKDTree: C, invertGroups: C
                    }, { isValid: function () { return n(this.y) || "undefined" === typeof this.y } }); t.flag = function (f, c, l, h, e) { var a = e && e.anchorX || f; e = e && e.anchorY || c; var g = t.circle(a - 1, e - 1, 2, 2); g.push(["M", a, e], ["L", f, c + h], ["L", f, c], ["L", f + l, c], ["L", f + l, c + h], ["L", f, c + h], ["Z"]); return g }; B("circle"); B("square"); E === x && ["circlepin",
                        "flag", "squarepin"].forEach(function (f) { x.prototype.symbols[f] = t[f] }); ""
                }); N(r, "Extensions/RangeSelector.js", [r["Core/Axis/Axis.js"], r["Core/Chart/Chart.js"], r["Core/Globals.js"], r["Core/Options.js"], r["Core/Renderer/SVG/SVGElement.js"], r["Core/Utilities.js"]], function (q, f, r, C, G, B) {
                    var H = C.defaultOptions, D = B.addEvent, n = B.createElement, I = B.css, M = B.defined, A = B.destroyObjectProperties, L = B.discardElement, E = B.extend, l = B.fireEvent, v = B.isNumber, x = B.merge, t = B.objectEach, g = B.pick, c = B.pInt, p = B.splat; E(H, {
                        rangeSelector: {
                            verticalAlign: "top",
                            buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 }, floating: !1, x: 0, y: 0, height: void 0, inputPosition: { align: "right", x: 0, y: 0 }, buttonPosition: { align: "left", x: 0, y: 0 }, labelStyle: { color: "#666666" }
                        }
                    }); H.lang = x(H.lang, { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From", rangeSelectorTo: "To" }); var h = function () {
                        function e(a) { this.buttons = void 0; this.buttonOptions = e.prototype.defaultButtons; this.options = void 0; this.chart = a; this.init(a) } e.prototype.clickButton = function (a, c) {
                            var e = this.chart, f = this.buttonOptions[a],
                            h = e.xAxis[0], k = e.scroller && e.scroller.getUnionExtremes() || h || {}, l = k.dataMin, n = k.dataMax, r = h && Math.round(Math.min(h.max, g(n, h.max))), d = f.type; k = f._range; var b, m = f.dataGrouping; if (null !== l && null !== n) {
                            e.fixedRange = k; m && (this.forcedDataGrouping = !0, q.prototype.setDataGrouping.call(h || { chart: this.chart }, m, !1), this.frozenStates = f.preserveDataGrouping); if ("month" === d || "year" === d) if (h) { d = { range: f, max: r, chart: e, dataMin: l, dataMax: n }; var u = h.minFromRange.call(d); v(d.newMax) && (r = d.newMax) } else k = f; else if (k) u =
                                Math.max(r - k, l), r = Math.min(u + k, n); else if ("ytd" === d) if (h) "undefined" === typeof n && (l = Number.MAX_VALUE, n = Number.MIN_VALUE, e.series.forEach(function (a) { a = a.xData; l = Math.min(a[0], l); n = Math.max(a[a.length - 1], n) }), c = !1), r = this.getYTDExtremes(n, l, e.time.useUTC), u = b = r.min, r = r.max; else { this.deferredYTDClick = a; return } else "all" === d && h && (u = l, r = n); M(u) && (u += f._offsetMin); M(r) && (r += f._offsetMax); this.setSelected(a); if (h) h.setExtremes(u, r, g(c, 1), null, { trigger: "rangeSelectorButton", rangeSelectorButton: f }); else {
                                    var t =
                                        p(e.options.xAxis)[0]; var x = t.range; t.range = k; var A = t.min; t.min = b; D(e, "load", function () { t.range = x; t.min = A })
                                }
                            }
                        }; e.prototype.setSelected = function (a) { this.selected = this.options.selected = a }; e.prototype.init = function (a) {
                            var c = this, e = a.options.rangeSelector, f = e.buttons || c.defaultButtons.slice(), g = e.selected, h = function () { var a = c.minInput, e = c.maxInput; a && a.blur && l(a, "blur"); e && e.blur && l(e, "blur") }; c.chart = a; c.options = e; c.buttons = []; c.buttonOptions = f; this.unMouseDown = D(a.container, "mousedown", h); this.unResize =
                                D(a, "resize", h); f.forEach(c.computeButtonRange); "undefined" !== typeof g && f[g] && this.clickButton(g, !1); D(a, "load", function () { a.xAxis && a.xAxis[0] && D(a.xAxis[0], "setExtremes", function (e) { this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== e.trigger && "updatedData" !== e.trigger && c.forcedDataGrouping && !c.frozenStates && this.setDataGrouping(!1, !1) }) })
                        }; e.prototype.updateButtonStates = function () {
                            var a = this, c = this.chart, e = c.xAxis[0], f = Math.round(e.max - e.min), g = !e.hasVisibleSeries, h = c.scroller && c.scroller.getUnionExtremes() ||
                                e, l = h.dataMin, n = h.dataMax; c = a.getYTDExtremes(n, l, c.time.useUTC); var p = c.min, d = c.max, b = a.selected, m = v(b), q = a.options.allButtonsEnabled, r = a.buttons; a.buttonOptions.forEach(function (c, h) {
                                    var k = c._range, u = c.type, t = c.count || 1, w = r[h], v = 0, y = c._offsetMax - c._offsetMin; c = h === b; var z = k > n - l, x = k < e.minRange, F = !1, A = !1; k = k === f; ("month" === u || "year" === u) && f + 36E5 >= 864E5 * { month: 28, year: 365 }[u] * t - y && f - 36E5 <= 864E5 * { month: 31, year: 366 }[u] * t + y ? k = !0 : "ytd" === u ? (k = d - p + y === f, F = !c) : "all" === u && (k = e.max - e.min >= n - l, A = !c && m && k); u =
                                        !q && (z || x || A || g); t = c && k || k && !m && !F || c && a.frozenStates; u ? v = 3 : t && (m = !0, v = 2); w.state !== v && (w.setState(v), 0 === v && b === h && a.setSelected(null))
                                })
                        }; e.prototype.computeButtonRange = function (a) { var c = a.type, e = a.count || 1, f = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5 }; if (f[c]) a._range = f[c] * e; else if ("month" === c || "year" === c) a._range = 864E5 * { month: 30, year: 365 }[c] * e; a._offsetMin = g(a.offsetMin, 0); a._offsetMax = g(a.offsetMax, 0); a._range += a._offsetMax - a._offsetMin }; e.prototype.setInputValue = function (a,
                            c) { var e = this.chart.options.rangeSelector, f = this.chart.time, g = this[a + "Input"]; M(c) && (g.previousValue = g.HCTime, g.HCTime = c); g.value = f.dateFormat(e.inputEditDateFormat || "%Y-%m-%d", g.HCTime); this[a + "DateBox"].attr({ text: f.dateFormat(e.inputDateFormat || "%b %e, %Y", g.HCTime) }) }; e.prototype.showInput = function (a) { var c = this.inputGroup, e = this[a + "DateBox"]; I(this[a + "Input"], { left: c.translateX + e.x + "px", top: c.translateY + "px", width: e.width - 2 + "px", height: e.height - 2 + "px", border: "2px solid silver" }) }; e.prototype.hideInput =
                                function (a) { I(this[a + "Input"], { border: 0, width: "1px", height: "1px" }); this.setInputValue(a) }; e.prototype.defaultInputDateParser = function (a, c) { var e = new Date; return r.isSafari ? Date.parse(a.split(" ").join("T")) : c ? Date.parse(a + "Z") : Date.parse(a) - 6E4 * e.getTimezoneOffset() }; e.prototype.drawInput = function (a) {
                                    function e() {
                                        var a = d.value, b = g.xAxis[0]; var e = g.scroller && g.scroller.xAxis ? g.scroller.xAxis : b; var h = e.dataMin, k = e.dataMax; e = (l.inputDateParser || t)(a, g.time.useUTC); e !== d.previousValue && (d.previousValue =
                                            e, v(e) || (e = a.split("-"), e = Date.UTC(c(e[0]), c(e[1]) - 1, c(e[2]))), v(e) && (g.time.useUTC || (e += 6E4 * (new Date).getTimezoneOffset()), q ? e > f.maxInput.HCTime ? e = void 0 : e < h && (e = h) : e < f.minInput.HCTime ? e = void 0 : e > k && (e = k), "undefined" !== typeof e && b.setExtremes(q ? e : b.min, q ? b.max : e, void 0, void 0, { trigger: "rangeSelectorInput" })))
                                    } var f = this, g = f.chart, h = g.renderer.style || {}, k = g.renderer, l = g.options.rangeSelector, p = f.div, q = "min" === a, d, b, m = this.inputGroup, t = this.defaultInputDateParser; this[a + "Label"] = b = k.label(H.lang[q ?
                                        "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({ padding: 2 }).add(m); m.offset += b.width + 5; this[a + "DateBox"] = k = k.label("", m.offset).addClass("highcharts-range-input").attr({ padding: 2, width: l.inputBoxWidth || 90, height: l.inputBoxHeight || 17, "text-align": "center" }).on("click", function () { f.showInput(a); f[a + "Input"].focus() }); g.styledMode || k.attr({ stroke: l.inputBoxBorderColor || "#cccccc", "stroke-width": 1 }); k.add(m); m.offset += k.width + (q ? 10 : 0); this[a + "Input"] =
                                            d = n("input", { name: a, className: "highcharts-range-selector", type: "text" }, { top: g.plotTop + "px" }, p); g.styledMode || (b.css(x(h, l.labelStyle)), k.css(x({ color: "#333333" }, h, l.inputStyle)), I(d, E({ position: "absolute", border: 0, width: "1px", height: "1px", padding: 0, textAlign: "center", fontSize: h.fontSize, fontFamily: h.fontFamily, top: "-9999em" }, l.inputStyle))); d.onfocus = function () { f.showInput(a) }; d.onblur = function () { d === r.doc.activeElement && e(); f.hideInput(a); d.blur() }; d.onchange = e; d.onkeypress = function (a) {
                                            13 === a.keyCode &&
                                                e()
                                            }
                                }; e.prototype.getPosition = function () { var a = this.chart, c = a.options.rangeSelector; a = "top" === c.verticalAlign ? a.plotTop - a.axisOffset[0] : 0; return { buttonTop: a + c.buttonPosition.y, inputTop: a + c.inputPosition.y - 10 } }; e.prototype.getYTDExtremes = function (a, c, e) { var f = this.chart.time, g = new f.Date(a), h = f.get("FullYear", g); e = e ? f.Date.UTC(h, 0, 1) : +new f.Date(h, 0, 1); c = Math.max(c || 0, e); g = g.getTime(); return { max: Math.min(a || g, g), min: c } }; e.prototype.render = function (a, c) {
                                    var e = this, f = e.chart, h = f.renderer, k = f.container,
                                    l = f.options, p = l.exporting && !1 !== l.exporting.enabled && l.navigation && l.navigation.buttonOptions, q = H.lang, d = e.div, b = l.rangeSelector, m = g(l.chart.style && l.chart.style.zIndex, 0) + 1; l = b.floating; var r = e.buttons; d = e.inputGroup; var u = b.buttonTheme, t = b.buttonPosition, v = b.inputPosition, x = b.inputEnabled, A = u && u.states, B = f.plotLeft, C = e.buttonGroup, E, D = e.options.verticalAlign, G = f.legend, I = G && G.options, L = t.y, M = v.y, N = f.hasLoaded, S = N ? "animate" : "attr", R = 0, T = 0; if (!1 !== b.enabled) {
                                    e.rendered || (e.group = E = h.g("range-selector-group").attr({ zIndex: 7 }).add(),
                                        e.buttonGroup = C = h.g("range-selector-buttons").add(E), e.zoomText = h.text(q.rangeSelectorZoom, 0, 15).add(C), f.styledMode || (e.zoomText.css(b.labelStyle), u["stroke-width"] = g(u["stroke-width"], 0)), e.buttonOptions.forEach(function (a, b) { r[b] = h.button(a.text, 0, 0, function (c) { var d = a.events && a.events.click, f; d && (f = d.call(a, c)); !1 !== f && e.clickButton(b); e.isActive = !0 }, u, A && A.hover, A && A.select, A && A.disabled).attr({ "text-align": "center" }).add(C) }), !1 !== x && (e.div = d = n("div", null, { position: "relative", height: 0, zIndex: m }),
                                            k.parentNode.insertBefore(d, k), e.inputGroup = d = h.g("input-group").add(E), d.offset = 0, e.drawInput("min"), e.drawInput("max"))); e.zoomText[S]({ x: g(B + t.x, B) }); var ca = g(B + t.x, B) + e.zoomText.getBBox().width + 5; e.buttonOptions.forEach(function (a, c) { r[c][S]({ x: ca }); ca += r[c].width + g(b.buttonSpacing, 5) }); B = f.plotLeft - f.spacing[3]; e.updateButtonStates(); p && this.titleCollision(f) && "top" === D && "right" === t.align && t.y + C.getBBox().height - 12 < (p.y || 0) + p.height && (R = -40); k = t.x - f.spacing[3]; "right" === t.align ? k += R - B : "center" ===
                                                t.align && (k -= B / 2); C.align({ y: t.y, width: C.getBBox().width, align: t.align, x: k }, !0, f.spacingBox); e.group.placed = N; e.buttonGroup.placed = N; !1 !== x && (R = p && this.titleCollision(f) && "top" === D && "right" === v.align && v.y - d.getBBox().height - 12 < (p.y || 0) + p.height + f.spacing[0] ? -40 : 0, "left" === v.align ? k = B : "right" === v.align && (k = -Math.max(f.axisOffset[1], -R)), d.align({ y: v.y, width: d.getBBox().width, align: v.align, x: v.x + k - 2 }, !0, f.spacingBox), p = d.alignAttr.translateX + d.alignOptions.x - R + d.getBBox().x + 2, k = d.alignOptions.width,
                                                    q = C.alignAttr.translateX + C.getBBox().x, B = C.getBBox().width + 20, (v.align === t.align || q + B > p && p + k > q && L < M + d.getBBox().height) && d.attr({ translateX: d.alignAttr.translateX + (f.axisOffset[1] >= -R ? 0 : -R), translateY: d.alignAttr.translateY + C.getBBox().height + 10 }), e.setInputValue("min", a), e.setInputValue("max", c), e.inputGroup.placed = N); e.group.align({ verticalAlign: D }, !0, f.spacingBox); a = e.group.getBBox().height + 20; c = e.group.alignAttr.translateY; "bottom" === D && (G = I && "bottom" === I.verticalAlign && I.enabled && !I.floating ?
                                                        G.legendHeight + g(I.margin, 10) : 0, a = a + G - 20, T = c - a - (l ? 0 : b.y) - (f.titleOffset ? f.titleOffset[2] : 0) - 10); if ("top" === D) l && (T = 0), f.titleOffset && f.titleOffset[0] && (T = f.titleOffset[0]), T += f.margin[0] - f.spacing[0] || 0; else if ("middle" === D) if (M === L) T = 0 > M ? c + void 0 : c; else if (M || L) T = 0 > M || 0 > L ? T - Math.min(M, L) : c - a + NaN; e.group.translate(b.x, b.y + Math.floor(T)); !1 !== x && (e.minInput.style.marginTop = e.group.translateY + "px", e.maxInput.style.marginTop = e.group.translateY + "px"); e.rendered = !0
                                    }
                                }; e.prototype.getHeight = function () {
                                    var a =
                                        this.options, c = this.group, e = a.y, f = a.buttonPosition.y, g = a.inputPosition.y; if (a.height) return a.height; a = c ? c.getBBox(!0).height + 13 + e : 0; c = Math.min(g, f); if (0 > g && 0 > f || 0 < g && 0 < f) a += Math.abs(c); return a
                                }; e.prototype.titleCollision = function (a) { return !(a.options.title.text || a.options.subtitle.text) }; e.prototype.update = function (a) { var c = this.chart; x(!0, c.options.rangeSelector, a); this.destroy(); this.init(c); c.rangeSelector.render() }; e.prototype.destroy = function () {
                                    var a = this, c = a.minInput, f = a.maxInput; a.unMouseDown();
                                    a.unResize(); A(a.buttons); c && (c.onfocus = c.onblur = c.onchange = null); f && (f.onfocus = f.onblur = f.onchange = null); t(a, function (c, f) { c && "chart" !== f && (c instanceof G ? c.destroy() : c instanceof window.HTMLElement && L(c)); c !== e.prototype[f] && (a[f] = null) }, this)
                                }; return e
                    }(); h.prototype.defaultButtons = [{ type: "month", count: 1, text: "1m" }, { type: "month", count: 3, text: "3m" }, { type: "month", count: 6, text: "6m" }, { type: "ytd", text: "YTD" }, { type: "year", count: 1, text: "1y" }, { type: "all", text: "All" }]; q.prototype.minFromRange = function () {
                        var c =
                            this.range, a = c.type, f = this.max, h = this.chart.time, l = function (c, e) { var d = "year" === a ? "FullYear" : "Month", b = new h.Date(c), f = h.get(d, b); h.set(d, b, f + e); f === h.get(d, b) && h.set("Date", b, 0); return b.getTime() - c }; if (v(c)) { var n = f - c; var k = c } else n = f + l(f, -c.count), this.chart && (this.chart.fixedRange = f - n); var p = g(this.dataMin, Number.MIN_VALUE); v(n) || (n = p); n <= p && (n = p, "undefined" === typeof k && (k = l(n, c.count)), this.newMax = Math.min(n + k, this.dataMax)); v(f) || (n = void 0); return n
                    }; r.RangeSelector || (D(f, "afterGetContainer",
                        function () { this.options.rangeSelector.enabled && (this.rangeSelector = new h(this)) }), D(f, "beforeRender", function () { var c = this.axes, a = this.rangeSelector; a && (v(a.deferredYTDClick) && (a.clickButton(a.deferredYTDClick), delete a.deferredYTDClick), c.forEach(function (a) { a.updateNames(); a.setScale() }), this.getAxisMargins(), a.render(), c = a.options.verticalAlign, a.options.floating || ("bottom" === c ? this.extraBottomMargin = !0 : "middle" !== c && (this.extraTopMargin = !0))) }), D(f, "update", function (c) {
                            var a = c.options.rangeSelector;
                            c = this.rangeSelector; var e = this.extraBottomMargin, f = this.extraTopMargin; a && a.enabled && !M(c) && (this.options.rangeSelector.enabled = !0, this.rangeSelector = new h(this)); this.extraTopMargin = this.extraBottomMargin = !1; c && (c.render(), a = a && a.verticalAlign || c.options && c.options.verticalAlign, c.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)), this.extraBottomMargin !== e || this.extraTopMargin !== f) && (this.isDirtyBox = !0)
                        }), D(f, "render", function () {
                            var c = this.rangeSelector;
                            c && !c.options.floating && (c.render(), c = c.options.verticalAlign, "bottom" === c ? this.extraBottomMargin = !0 : "middle" !== c && (this.extraTopMargin = !0))
                        }), D(f, "getMargins", function () { var c = this.rangeSelector; c && (c = c.getHeight(), this.extraTopMargin && (this.plotTop += c), this.extraBottomMargin && (this.marginBottom += c)) }), f.prototype.callbacks.push(function (c) {
                            function a() {
                                e = c.xAxis[0].getExtremes(); g = c.legend; k = null === f || void 0 === f ? void 0 : f.options.verticalAlign; v(e.min) && f.render(e.min, e.max); f && g.display && "top" ===
                                    k && k === g.options.verticalAlign && (h = x(c.spacingBox), h.y = "vertical" === g.options.layout ? c.plotTop : h.y + f.getHeight(), g.group.placed = !1, g.align(h))
                            } var e, f = c.rangeSelector, g, h, k; if (f) { var l = D(c.xAxis[0], "afterSetExtremes", function (a) { f.render(a.min, a.max) }); var n = D(c, "redraw", a); a() } D(c, "destroy", function () { f && (n(), l()) })
                        }), r.RangeSelector = h); return r.RangeSelector
                }); N(r, "Core/Chart/StockChart.js", [r["Core/Axis/Axis.js"], r["Core/Chart/Chart.js"], r["Core/Globals.js"], r["Core/Series/Point.js"], r["Core/Renderer/SVG/SVGRenderer.js"],
                r["Core/Utilities.js"]], function (q, f, r, C, G, B) {
                    var H = B.addEvent, D = B.arrayMax, n = B.arrayMin, I = B.clamp, M = B.defined, A = B.extend, L = B.find, E = B.format, l = B.getOptions, v = B.isNumber, x = B.isString, t = B.merge, g = B.pick, c = B.splat; B = r.Series; var p = B.prototype, h = p.init, e = p.processData, a = C.prototype.tooltipFormatter; r.StockChart = r.stockChart = function (a, e, h) {
                        var n = x(a) || a.nodeName, k = arguments[n ? 1 : 0], p = k, q = k.series, r = l(), d, b = g(k.navigator && k.navigator.enabled, r.navigator.enabled, !0); k.xAxis = c(k.xAxis || {}).map(function (a,
                            c) { return t({ minPadding: 0, maxPadding: 0, overscroll: 0, ordinal: !0, title: { text: null }, labels: { overflow: "justify" }, showLastLabel: !0 }, r.xAxis, r.xAxis && r.xAxis[c], a, { type: "datetime", categories: null }, b ? { startOnTick: !1, endOnTick: !1 } : null) }); k.yAxis = c(k.yAxis || {}).map(function (a, b) { d = g(a.opposite, !0); return t({ labels: { y: -2 }, opposite: d, showLastLabel: !(!a.categories && "category" !== a.type), title: { text: null } }, r.yAxis, r.yAxis && r.yAxis[b], a) }); k.series = null; k = t({
                                chart: { panning: { enabled: !0, type: "x" }, pinchType: "x" },
                                navigator: { enabled: b }, scrollbar: { enabled: g(r.scrollbar.enabled, !0) }, rangeSelector: { enabled: g(r.rangeSelector.enabled, !0) }, title: { text: null }, tooltip: { split: g(r.tooltip.split, !0), crosshairs: !0 }, legend: { enabled: !1 }
                            }, k, { isStock: !0 }); k.series = p.series = q; return n ? new f(a, k, h) : new f(k, e)
                    }; H(B, "setOptions", function (a) {
                        var c; this.chart.options.isStock && (this.is("column") || this.is("columnrange") ? c = { borderWidth: 0, shadow: !1 } : this.is("scatter") || this.is("sma") || (c = { marker: { enabled: !1, radius: 2 } }), c && (a.plotOptions[this.type] =
                            t(a.plotOptions[this.type], c)))
                    }); H(q, "autoLabelAlign", function (a) { var c = this.chart, e = this.options; c = c._labelPanes = c._labelPanes || {}; var f = this.options.labels; this.chart.options.isStock && "yAxis" === this.coll && (e = e.top + "," + e.height, !c[e] && f.enabled && (15 === f.x && (f.x = 0), "undefined" === typeof f.align && (f.align = "right"), c[e] = this, a.align = "right", a.preventDefault())) }); H(q, "destroy", function () {
                        var a = this.chart, c = this.options && this.options.top + "," + this.options.height; c && a._labelPanes && a._labelPanes[c] === this &&
                            delete a._labelPanes[c]
                    }); H(q, "getPlotLinePath", function (a) {
                        function c(a) { var b = "xAxis" === a ? "yAxis" : "xAxis"; a = e.options[b]; return v(a) ? [h[b][a]] : x(a) ? [h.get(a)] : f.map(function (a) { return a[b] }) } var e = this, f = this.isLinked && !this.series ? this.linkedParent.series : this.series, h = e.chart, l = h.renderer, n = e.left, p = e.top, d, b, m, q, r = [], t = [], u = a.translatedValue, A = a.value, B = a.force; if (h.options.isStock && !1 !== a.acrossPanes && "xAxis" === e.coll || "yAxis" === e.coll) {
                            a.preventDefault(); t = c(e.coll); var C = e.isXAxis ? h.yAxis :
                                h.xAxis; C.forEach(function (a) { if (M(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) { var b = a.isXAxis ? "yAxis" : "xAxis"; b = M(a.options[b]) ? h[b][a.options[b]] : h[b][0]; e === b && t.push(a) } }); var D = t.length ? [] : [e.isXAxis ? h.yAxis[0] : h.xAxis[0]]; t.forEach(function (a) { -1 !== D.indexOf(a) || L(D, function (b) { return b.pos === a.pos && b.len === a.len }) || D.push(a) }); var E = g(u, e.translate(A, null, null, a.old)); v(E) && (e.horiz ? D.forEach(function (a) {
                                    var c; b = a.pos; q = b + a.len; d = m = Math.round(E + e.transB); "pass" !== B && (d < n || d > n + e.width) &&
                                        (B ? d = m = I(d, n, n + e.width) : c = !0); c || r.push(["M", d, b], ["L", m, q])
                                }) : D.forEach(function (a) { var c; d = a.pos; m = d + a.len; b = q = Math.round(p + e.height - E); "pass" !== B && (b < p || b > p + e.height) && (B ? b = q = I(b, p, p + e.height) : c = !0); c || r.push(["M", d, b], ["L", m, q]) })); a.path = 0 < r.length ? l.crispPolyLine(r, a.lineWidth || 1) : null
                        }
                    }); G.prototype.crispPolyLine = function (a, c) { for (var e = 0; e < a.length; e += 2) { var f = a[e], g = a[e + 1]; f[1] === g[1] && (f[1] = g[1] = Math.round(f[1]) - c % 2 / 2); f[2] === g[2] && (f[2] = g[2] = Math.round(f[2]) + c % 2 / 2) } return a }; H(q, "afterHideCrosshair",
                        function () { this.crossLabel && (this.crossLabel = this.crossLabel.hide()) }); H(q, "afterDrawCrosshair", function (a) {
                            var c, e; if (M(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                                var f = this.chart, h = this.logarithmic, l = this.options.crosshair.label, n = this.horiz, p = this.opposite, d = this.left, b = this.top, m = this.crossLabel, q = l.format, r = "", t = "inside" === this.options.tickPosition, u = !1 !== this.crosshair.snap, x = 0, B = a.e || this.cross && this.cross.e, C = a.point; a = this.min; var D = this.max; h && (a = h.lin2log(a), D = h.lin2log(D));
                                h = n ? "center" : p ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center"; m || (m = this.crossLabel = f.renderer.label(null, null, null, l.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({ align: l.align || h, padding: g(l.padding, 8), r: g(l.borderRadius, 3), zIndex: 2 }).add(this.labelGroup), f.styledMode || m.attr({
                                    fill: l.backgroundColor || this.series[0] && this.series[0].color || "#666666", stroke: l.borderColor || "", "stroke-width": l.borderWidth ||
                                        0
                                }).css(A({ color: "#ffffff", fontWeight: "normal", fontSize: "11px", textAlign: "center" }, l.style))); n ? (h = u ? C.plotX + d : B.chartX, b += p ? 0 : this.height) : (h = p ? this.width + d : 0, b = u ? C.plotY + b : B.chartY); q || l.formatter || (this.dateTime && (r = "%b %d, %Y"), q = "{value" + (r ? ":" + r : "") + "}"); r = u ? C[this.isXAxis ? "x" : "y"] : this.toValue(n ? B.chartX : B.chartY); m.attr({ text: q ? E(q, { value: r }, f) : l.formatter.call(this, r), x: h, y: b, visibility: r < a || r > D ? "hidden" : "visible" }); l = m.getBBox(); if (v(m.y)) if (n) { if (t && !p || !t && p) b = m.y - l.height } else b = m.y -
                                    l.height / 2; n ? (c = d - l.x, e = d + this.width - l.x) : (c = "left" === this.labelAlign ? d : 0, e = "right" === this.labelAlign ? d + this.width : f.chartWidth); m.translateX < c && (x = c - m.translateX); m.translateX + l.width >= e && (x = -(m.translateX + l.width - e)); m.attr({ x: h + x, y: b, anchorX: n ? h : this.opposite ? 0 : f.chartWidth, anchorY: n ? this.opposite ? f.chartHeight : 0 : b + l.height / 2 })
                            }
                        }); p.init = function () { h.apply(this, arguments); this.setCompare(this.options.compare) }; p.setCompare = function (a) {
                        this.modifyValue = "value" === a || "percent" === a ? function (c, e) {
                            var f =
                                this.compareValue; return "undefined" !== typeof c && "undefined" !== typeof f ? (c = "value" === a ? c - f : c / f * 100 - (100 === this.options.compareBase ? 0 : 100), e && (e.change = c), c) : 0
                        } : null; this.userOptions.compare = a; this.chart.hasRendered && (this.isDirty = !0)
                        }; p.processData = function (a) {
                            var c, f = -1, g = !0 === this.options.compareStart ? 0 : 1; e.apply(this, arguments); if (this.xAxis && this.processedYData) {
                                var h = this.processedXData; var l = this.processedYData; var n = l.length; this.pointArrayMap && (f = this.pointArrayMap.indexOf(this.options.pointValKey ||
                                    this.pointValKey || "y")); for (c = 0; c < n - g; c++) { var p = l[c] && -1 < f ? l[c][f] : l[c]; if (v(p) && h[c + g] >= this.xAxis.min && 0 !== p) { this.compareValue = p; break } }
                            }
                        }; H(B, "afterGetExtremes", function (a) { a = a.dataExtremes; if (this.modifyValue && a) { var c = [this.modifyValue(a.dataMin), this.modifyValue(a.dataMax)]; a.dataMin = n(c); a.dataMax = D(c) } }); q.prototype.setCompare = function (a, c) { this.isXAxis || (this.series.forEach(function (c) { c.setCompare(a) }), g(c, !0) && this.chart.redraw()) }; C.prototype.tooltipFormatter = function (c) {
                            var e = this.series.chart.numberFormatter;
                            c = c.replace("{point.change}", (0 < this.change ? "+" : "") + e(this.change, g(this.series.tooltipOptions.changeDecimals, 2))); return a.apply(this, [c])
                        }; H(B, "render", function () {
                            var a = this.chart; if (!(a.is3d && a.is3d() || a.polar) && this.xAxis && !this.xAxis.isRadial) {
                                var c = this.yAxis.len; if (this.xAxis.axisLine) { var e = a.plotTop + a.plotHeight - this.yAxis.pos - this.yAxis.len, f = Math.floor(this.xAxis.axisLine.strokeWidth() / 2); 0 <= e && (c -= Math.max(f - e, 0)) } !this.clipBox && this.animate ? (this.clipBox = t(a.clipBox), this.clipBox.width =
                                    this.xAxis.len, this.clipBox.height = c) : a[this.sharedClipKey] && (a[this.sharedClipKey].animate({ width: this.xAxis.len, height: c }), a[this.sharedClipKey + "m"] && a[this.sharedClipKey + "m"].animate({ width: this.xAxis.len }))
                            }
                        }); H(f, "update", function (a) { a = a.options; "scrollbar" in a && this.navigator && (t(!0, this.options.scrollbar, a.scrollbar), this.navigator.update({}, !1), delete a.scrollbar) })
                }); N(r, "masters/modules/stock.src.js", [], function () { }); N(r, "masters/highstock.src.js", [r["masters/highcharts.src.js"]], function (q) {
                q.product =
                    "Highstock"; return q
                }); r["masters/highstock.src.js"]._modules = r; return r["masters/highstock.src.js"]
});
//# sourceMappingURL=highstock.js.map
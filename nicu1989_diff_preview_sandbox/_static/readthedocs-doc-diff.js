// begin-ndi: added event listener for toggling highlights
document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === "d") {
        // Toggle the class only on <body> (or any chosen parent element)
        document.body.classList.toggle("no-highlight");
    }
});
// end-ndi

// base code from https://github.com/readthedocs/doc-diff/blob/main/dist/readthedocs-doc-diff.js
// with changes comment with 'begin-ndi'
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.doc_diff = t() : e.doc_diff = t()
}(this, ( () => ( () => {
    var e = {
        342: (e, t, n) => {
            "use strict";
            n.d(t, {
                setup: () => f
            });
            var r = n(224)
              , i = n(52)
              , o = {
                addedClass: "doc-diff-added",
                modifiedClass: "doc-diff-modified",
                removedClass: "doc-diff-removed",
                skipModified: !0
            };
            function a() {
                var e = {
                    base_host: "",
                    base_version: "latest",
                    base_language: "en",
                    base_page: "index.html",
                    root_selector: "div.document[role='main']",
                    inject_styles: !0
                };
                return new Promise((function(t, n) {
                    var r = document.querySelector("script#READTHEDOCS_DATA");
                    if (r)
                        try {
                            var i = JSON.parse(r.innerText);
                            e.base_host = "https://" + i.project + ".readthedocs.io",
                            e.base_language = i.language,
                            e.base_page = i.page + ".html"
                        } catch (e) {
                            console.debug("Error parsing configuration data", e)
                        }
                    var o = document.querySelector("script#doc-diff-config");
                    if (o)
                        try {
                            var a = JSON.parse(o.innerText);
                            Object.assign(e, a)
                        } catch (e) {
                            console.debug("Error parsing configuration data", e)
                        }
                    return void 0 === e.base_url && (e.base_url = function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "en"
                          , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "latest"
                          , r = arguments.length > 3 ? arguments[3] : void 0
                          , i = [];
                        i = null == n && null == t ? [e, r] : null == t ? [e, n, r] : [e, t, n, r];
                        return i.join("/")
                    }(e.base_host, e.base_language, e.base_version, e.base_page)),
                    t(e)
                }
                ))
            }
            function f() {
                var e = new Promise((function(e) {
                    if ("interactive" === document.readyState || "complete" === document.readyState)
                        return e();
                    document.addEventListener("DOMContentLoaded", (function() {
                        e()
                    }
                    ), {
                        capture: !0,
                        once: !0,
                        passive: !0
                    })
                }
                ));
                return new Promise((function(t) {
                    e.then((function() {
                        return a()
                    }
                    )).then((function(e) {
                        return function(e) {
                            return new Promise((function(t, n) {
                                // begin-ndi: Dynamically build a remoteUrl based on current path:
                                const localPath = window.location.pathname.replace(/\/index\.html?$/, "/");
                                const remoteBase = e.base_url.replace(/\/$/, "");
                                const remoteUrl  = remoteBase + localPath;

                                fetch(remoteUrl)
                                // end-ndi
                                .then((function(e) {
                                    return e.text()
                                }
                                )).then((function(a) {
                                    var f = (new DOMParser).parseFromString(a, "text/html").documentElement.querySelector(e.root_selector)
                                      , s = document.querySelector(e.root_selector);
                                    null != f && null != s || n(new Error("Element not found in both documents.")),
                                    e.inject_styles && (document.adoptedStyleSheets = [i.Z]);
                                    var l = (0,
                                    r.visualDomDiff)(f, s, o);
// Get the original element from the new document.
var originalNavbar = s.querySelector('.navbar-header-items__end');
if (originalNavbar) {
    // Remove it from its current location so we can move it.
    originalNavbar.parentNode.removeChild(originalNavbar);
    // Find the corresponding element in the diff result.
    var diffNavbar = l.firstElementChild.querySelector('.navbar-header-items__end');
    if (diffNavbar) {
        // Replace the diffed version with the original element.
        diffNavbar.replaceWith(originalNavbar);
    }
}
                                    s.replaceWith(l.firstElementChild),
                                    t(!0)
                                }
                                ))
                            }
                            ))
                        }(e)
                    }
                    )).then((function() {
                        t()
                    }
                    )).catch((function(e) {
                        console.error(e.message)
                    }
                    ))
                }
                ))
            }
        }
        ,
        52: (e, t, n) => {
            "use strict";
            n.d(t, {
                Z: () => s
            });
            var r = n(81)
              , i = n.n(r)
              , o = n(645)
              , a = n.n(o)()(i());
            a.push([e.id, ".doc-diff-added {\n  background-color: rgb(171, 242, 188);\n  text-decoration: none;\n}\n\n.doc-diff-modified {\n}\n\n.doc-diff-removed {\n  background-color: rgba(255, 129, 130, 0.4);\n  text-decoration: none;\n}\n", ""]);
            var f = new CSSStyleSheet;
            f.replaceSync(a.toString());
            const s = f
        }
        ,
        645: e => {
            "use strict";
            e.exports = function(e) {
                var t = [];
                return t.toString = function() {
                    return this.map((function(t) {
                        var n = ""
                          , r = void 0 !== t[5];
                        return t[4] && (n += "@supports (".concat(t[4], ") {")),
                        t[2] && (n += "@media ".concat(t[2], " {")),
                        r && (n += "@layer".concat(t[5].length > 0 ? " ".concat(t[5]) : "", " {")),
                        n += e(t),
                        r && (n += "}"),
                        t[2] && (n += "}"),
                        t[4] && (n += "}"),
                        n
                    }
                    )).join("")
                }
                ,
                t.i = function(e, n, r, i, o) {
                    "string" == typeof e && (e = [[null, e, void 0]]);
                    var a = {};
                    if (r)
                        for (var f = 0; f < this.length; f++) {
                            var s = this[f][0];
                            null != s && (a[s] = !0)
                        }
                    for (var l = 0; l < e.length; l++) {
                        var h = [].concat(e[l]);
                        r && a[h[0]] || (void 0 !== o && (void 0 === h[5] || (h[1] = "@layer".concat(h[5].length > 0 ? " ".concat(h[5]) : "", " {").concat(h[1], "}")),
                        h[5] = o),
                        n && (h[2] ? (h[1] = "@media ".concat(h[2], " {").concat(h[1], "}"),
                        h[2] = n) : h[2] = n),
                        i && (h[4] ? (h[1] = "@supports (".concat(h[4], ") {").concat(h[1], "}"),
                        h[4] = i) : h[4] = "".concat(i)),
                        t.push(h))
                    }
                }
                ,
                t
            }
        }
        ,
        81: e => {
            "use strict";
            e.exports = function(e) {
                return e[1]
            }
        }
        ,
        27: e => {
            var t = function() {
                this.Diff_Timeout = 1,
                this.Diff_EditCost = 4,
                this.Match_Threshold = .5,
                this.Match_Distance = 1e3,
                this.Patch_DeleteThreshold = .5,
                this.Patch_Margin = 4,
                this.Match_MaxBits = 32
            }
              , n = -1;
            t.Diff = function(e, t) {
                return [e, t]
            }
            ,
            t.prototype.diff_main = function(e, n, r, i) {
                void 0 === i && (i = this.Diff_Timeout <= 0 ? Number.MAX_VALUE : (new Date).getTime() + 1e3 * this.Diff_Timeout);
                var o = i;
                if (null == e || null == n)
                    throw new Error("Null input. (diff_main)");
                if (e == n)
                    return e ? [new t.Diff(0,e)] : [];
                void 0 === r && (r = !0);
                var a = r
                  , f = this.diff_commonPrefix(e, n)
                  , s = e.substring(0, f);
                e = e.substring(f),
                n = n.substring(f),
                f = this.diff_commonSuffix(e, n);
                var l = e.substring(e.length - f);
                e = e.substring(0, e.length - f),
                n = n.substring(0, n.length - f);
                var h = this.diff_compute_(e, n, a, o);
                return s && h.unshift(new t.Diff(0,s)),
                l && h.push(new t.Diff(0,l)),
                this.diff_cleanupMerge(h),
                h
            }
            ,
            t.prototype.diff_compute_ = function(e, r, i, o) {
                var a;
                if (!e)
                    return [new t.Diff(1,r)];
                if (!r)
                    return [new t.Diff(n,e)];
                var f = e.length > r.length ? e : r
                  , s = e.length > r.length ? r : e
                  , l = f.indexOf(s);
                if (-1 != l)
                    return a = [new t.Diff(1,f.substring(0, l)), new t.Diff(0,s), new t.Diff(1,f.substring(l + s.length))],
                    e.length > r.length && (a[0][0] = a[2][0] = n),
                    a;
                if (1 == s.length)
                    return [new t.Diff(n,e), new t.Diff(1,r)];
                var h = this.diff_halfMatch_(e, r);
                if (h) {
                    var u = h[0]
                      , c = h[1]
                      , d = h[2]
                      , g = h[3]
                      , p = h[4]
                      , v = this.diff_main(u, d, i, o)
                      , _ = this.diff_main(c, g, i, o);
                    return v.concat([new t.Diff(0,p)], _)
                }
                return i && e.length > 100 && r.length > 100 ? this.diff_lineMode_(e, r, o) : this.diff_bisect_(e, r, o)
            }
            ,
            t.prototype.diff_lineMode_ = function(e, r, i) {
                var o = this.diff_linesToChars_(e, r);
                e = o.chars1,
                r = o.chars2;
                var a = o.lineArray
                  , f = this.diff_main(e, r, !1, i);
                this.diff_charsToLines_(f, a),
                this.diff_cleanupSemantic(f),
                f.push(new t.Diff(0,""));
                for (var s = 0, l = 0, h = 0, u = "", c = ""; s < f.length; ) {
                    switch (f[s][0]) {
                    case 1:
                        h++,
                        c += f[s][1];
                        break;
                    case n:
                        l++,
                        u += f[s][1];
                        break;
                    case 0:
                        if (l >= 1 && h >= 1) {
                            f.splice(s - l - h, l + h),
                            s = s - l - h;
                            for (var d = this.diff_main(u, c, !1, i), g = d.length - 1; g >= 0; g--)
                                f.splice(s, 0, d[g]);
                            s += d.length
                        }
                        h = 0,
                        l = 0,
                        u = "",
                        c = ""
                    }
                    s++
                }
                return f.pop(),
                f
            }
            ,
            t.prototype.diff_bisect_ = function(e, r, i) {
                for (var o = e.length, a = r.length, f = Math.ceil((o + a) / 2), s = f, l = 2 * f, h = new Array(l), u = new Array(l), c = 0; c < l; c++)
                    h[c] = -1,
                    u[c] = -1;
                h[s + 1] = 0,
                u[s + 1] = 0;
                for (var d = o - a, g = d % 2 != 0, p = 0, v = 0, _ = 0, b = 0, m = 0; m < f && !((new Date).getTime() > i); m++) {
                    for (var y = -m + p; y <= m - v; y += 2) {
                        for (var w = s + y, x = (E = y == -m || y != m && h[w - 1] < h[w + 1] ? h[w + 1] : h[w - 1] + 1) - y; E < o && x < a && e.charAt(E) == r.charAt(x); )
                            E++,
                            x++;
                        if (h[w] = E,
                        E > o)
                            v += 2;
                        else if (x > a)
                            p += 2;
                        else if (g) {
                            if ((M = s + d - y) >= 0 && M < l && -1 != u[M])
                                if (E >= (N = o - u[M]))
                                    return this.diff_bisectSplit_(e, r, E, x, i)
                        }
                    }
                    for (var D = -m + _; D <= m - b; D += 2) {
                        for (var N, M = s + D, T = (N = D == -m || D != m && u[M - 1] < u[M + 1] ? u[M + 1] : u[M - 1] + 1) - D; N < o && T < a && e.charAt(o - N - 1) == r.charAt(a - T - 1); )
                            N++,
                            T++;
                        if (u[M] = N,
                        N > o)
                            b += 2;
                        else if (T > a)
                            _ += 2;
                        else if (!g) {
                            if ((w = s + d - D) >= 0 && w < l && -1 != h[w]) {
                                var E;
                                x = s + (E = h[w]) - w;
                                if (E >= (N = o - N))
                                    return this.diff_bisectSplit_(e, r, E, x, i)
                            }
                        }
                    }
                }
                return [new t.Diff(n,e), new t.Diff(1,r)]
            }
            ,
            t.prototype.diff_bisectSplit_ = function(e, t, n, r, i) {
                var o = e.substring(0, n)
                  , a = t.substring(0, r)
                  , f = e.substring(n)
                  , s = t.substring(r)
                  , l = this.diff_main(o, a, !1, i)
                  , h = this.diff_main(f, s, !1, i);
                return l.concat(h)
            }
            ,
            t.prototype.diff_linesToChars_ = function(e, t) {
                var n = []
                  , r = {};
                function i(e) {
                    for (var t = "", i = 0, a = -1, f = n.length; a < e.length - 1; ) {
                        -1 == (a = e.indexOf("\n", i)) && (a = e.length - 1);
                        var s = e.substring(i, a + 1);
                        (r.hasOwnProperty ? r.hasOwnProperty(s) : void 0 !== r[s]) ? t += String.fromCharCode(r[s]) : (f == o && (s = e.substring(i),
                        a = e.length),
                        t += String.fromCharCode(f),
                        r[s] = f,
                        n[f++] = s),
                        i = a + 1
                    }
                    return t
                }
                n[0] = "";
                var o = 4e4
                  , a = i(e);
                return o = 65535,
                {
                    chars1: a,
                    chars2: i(t),
                    lineArray: n
                }
            }
            ,
            t.prototype.diff_charsToLines_ = function(e, t) {
                for (var n = 0; n < e.length; n++) {
                    for (var r = e[n][1], i = [], o = 0; o < r.length; o++)
                        i[o] = t[r.charCodeAt(o)];
                    e[n][1] = i.join("")
                }
            }
            ,
            t.prototype.diff_commonPrefix = function(e, t) {
                if (!e || !t || e.charAt(0) != t.charAt(0))
                    return 0;
                for (var n = 0, r = Math.min(e.length, t.length), i = r, o = 0; n < i; )
                    e.substring(o, i) == t.substring(o, i) ? o = n = i : r = i,
                    i = Math.floor((r - n) / 2 + n);
                return i
            }
            ,
            t.prototype.diff_commonSuffix = function(e, t) {
                if (!e || !t || e.charAt(e.length - 1) != t.charAt(t.length - 1))
                    return 0;
                for (var n = 0, r = Math.min(e.length, t.length), i = r, o = 0; n < i; )
                    e.substring(e.length - i, e.length - o) == t.substring(t.length - i, t.length - o) ? o = n = i : r = i,
                    i = Math.floor((r - n) / 2 + n);
                return i
            }
            ,
            t.prototype.diff_commonOverlap_ = function(e, t) {
                var n = e.length
                  , r = t.length;
                if (0 == n || 0 == r)
                    return 0;
                n > r ? e = e.substring(n - r) : n < r && (t = t.substring(0, n));
                var i = Math.min(n, r);
                if (e == t)
                    return i;
                for (var o = 0, a = 1; ; ) {
                    var f = e.substring(i - a)
                      , s = t.indexOf(f);
                    if (-1 == s)
                        return o;
                    a += s,
                    0 != s && e.substring(i - a) != t.substring(0, a) || (o = a,
                    a++)
                }
            }
            ,
            t.prototype.diff_halfMatch_ = function(e, t) {
                if (this.Diff_Timeout <= 0)
                    return null;
                var n = e.length > t.length ? e : t
                  , r = e.length > t.length ? t : e;
                if (n.length < 4 || 2 * r.length < n.length)
                    return null;
                var i = this;
                function o(e, t, n) {
                    for (var r, o, a, f, s = e.substring(n, n + Math.floor(e.length / 4)), l = -1, h = ""; -1 != (l = t.indexOf(s, l + 1)); ) {
                        var u = i.diff_commonPrefix(e.substring(n), t.substring(l))
                          , c = i.diff_commonSuffix(e.substring(0, n), t.substring(0, l));
                        h.length < c + u && (h = t.substring(l - c, l) + t.substring(l, l + u),
                        r = e.substring(0, n - c),
                        o = e.substring(n + u),
                        a = t.substring(0, l - c),
                        f = t.substring(l + u))
                    }
                    return 2 * h.length >= e.length ? [r, o, a, f, h] : null
                }
                var a, f, s, l, h, u = o(n, r, Math.ceil(n.length / 4)), c = o(n, r, Math.ceil(n.length / 2));
                return u || c ? (a = c ? u && u[4].length > c[4].length ? u : c : u,
                e.length > t.length ? (f = a[0],
                s = a[1],
                l = a[2],
                h = a[3]) : (l = a[0],
                h = a[1],
                f = a[2],
                s = a[3]),
                [f, s, l, h, a[4]]) : null
            }
            ,
            t.prototype.diff_cleanupSemantic = function(e) {
                for (var r = !1, i = [], o = 0, a = null, f = 0, s = 0, l = 0, h = 0, u = 0; f < e.length; )
                    0 == e[f][0] ? (i[o++] = f,
                    s = h,
                    l = u,
                    h = 0,
                    u = 0,
                    a = e[f][1]) : (1 == e[f][0] ? h += e[f][1].length : u += e[f][1].length,
                    a && a.length <= Math.max(s, l) && a.length <= Math.max(h, u) && (e.splice(i[o - 1], 0, new t.Diff(n,a)),
                    e[i[o - 1] + 1][0] = 1,
                    o--,
                    f = --o > 0 ? i[o - 1] : -1,
                    s = 0,
                    l = 0,
                    h = 0,
                    u = 0,
                    a = null,
                    r = !0)),
                    f++;
                for (r && this.diff_cleanupMerge(e),
                this.diff_cleanupSemanticLossless(e),
                f = 1; f < e.length; ) {
                    if (e[f - 1][0] == n && 1 == e[f][0]) {
                        var c = e[f - 1][1]
                          , d = e[f][1]
                          , g = this.diff_commonOverlap_(c, d)
                          , p = this.diff_commonOverlap_(d, c);
                        g >= p ? (g >= c.length / 2 || g >= d.length / 2) && (e.splice(f, 0, new t.Diff(0,d.substring(0, g))),
                        e[f - 1][1] = c.substring(0, c.length - g),
                        e[f + 1][1] = d.substring(g),
                        f++) : (p >= c.length / 2 || p >= d.length / 2) && (e.splice(f, 0, new t.Diff(0,c.substring(0, p))),
                        e[f - 1][0] = 1,
                        e[f - 1][1] = d.substring(0, d.length - p),
                        e[f + 1][0] = n,
                        e[f + 1][1] = c.substring(p),
                        f++),
                        f++
                    }
                    f++
                }
            }
            ,
            t.prototype.diff_cleanupSemanticLossless = function(e) {
                function n(e, n) {
                    if (!e || !n)
                        return 6;
                    var r = e.charAt(e.length - 1)
                      , i = n.charAt(0)
                      , o = r.match(t.nonAlphaNumericRegex_)
                      , a = i.match(t.nonAlphaNumericRegex_)
                      , f = o && r.match(t.whitespaceRegex_)
                      , s = a && i.match(t.whitespaceRegex_)
                      , l = f && r.match(t.linebreakRegex_)
                      , h = s && i.match(t.linebreakRegex_)
                      , u = l && e.match(t.blanklineEndRegex_)
                      , c = h && n.match(t.blanklineStartRegex_);
                    return u || c ? 5 : l || h ? 4 : o && !f && s ? 3 : f || s ? 2 : o || a ? 1 : 0
                }
                for (var r = 1; r < e.length - 1; ) {
                    if (0 == e[r - 1][0] && 0 == e[r + 1][0]) {
                        var i = e[r - 1][1]
                          , o = e[r][1]
                          , a = e[r + 1][1]
                          , f = this.diff_commonSuffix(i, o);
                        if (f) {
                            var s = o.substring(o.length - f);
                            i = i.substring(0, i.length - f),
                            o = s + o.substring(0, o.length - f),
                            a = s + a
                        }
                        for (var l = i, h = o, u = a, c = n(i, o) + n(o, a); o.charAt(0) === a.charAt(0); ) {
                            i += o.charAt(0),
                            o = o.substring(1) + a.charAt(0),
                            a = a.substring(1);
                            var d = n(i, o) + n(o, a);
                            d >= c && (c = d,
                            l = i,
                            h = o,
                            u = a)
                        }
                        e[r - 1][1] != l && (l ? e[r - 1][1] = l : (e.splice(r - 1, 1),
                        r--),
                        e[r][1] = h,
                        u ? e[r + 1][1] = u : (e.splice(r + 1, 1),
                        r--))
                    }
                    r++
                }
            }
            ,
            t.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/,
            t.whitespaceRegex_ = /\s/,
            t.linebreakRegex_ = /[\r\n]/,
            t.blanklineEndRegex_ = /\n\r?\n$/,
            t.blanklineStartRegex_ = /^\r?\n\r?\n/,
            t.prototype.diff_cleanupEfficiency = function(e) {
                for (var r = !1, i = [], o = 0, a = null, f = 0, s = !1, l = !1, h = !1, u = !1; f < e.length; )
                    0 == e[f][0] ? (e[f][1].length < this.Diff_EditCost && (h || u) ? (i[o++] = f,
                    s = h,
                    l = u,
                    a = e[f][1]) : (o = 0,
                    a = null),
                    h = u = !1) : (e[f][0] == n ? u = !0 : h = !0,
                    a && (s && l && h && u || a.length < this.Diff_EditCost / 2 && s + l + h + u == 3) && (e.splice(i[o - 1], 0, new t.Diff(n,a)),
                    e[i[o - 1] + 1][0] = 1,
                    o--,
                    a = null,
                    s && l ? (h = u = !0,
                    o = 0) : (f = --o > 0 ? i[o - 1] : -1,
                    h = u = !1),
                    r = !0)),
                    f++;
                r && this.diff_cleanupMerge(e)
            }
            ,
            t.prototype.diff_cleanupMerge = function(e) {
                e.push(new t.Diff(0,""));
                for (var r, i = 0, o = 0, a = 0, f = "", s = ""; i < e.length; )
                    switch (e[i][0]) {
                    case 1:
                        a++,
                        s += e[i][1],
                        i++;
                        break;
                    case n:
                        o++,
                        f += e[i][1],
                        i++;
                        break;
                    case 0:
                        o + a > 1 ? (0 !== o && 0 !== a && (0 !== (r = this.diff_commonPrefix(s, f)) && (i - o - a > 0 && 0 == e[i - o - a - 1][0] ? e[i - o - a - 1][1] += s.substring(0, r) : (e.splice(0, 0, new t.Diff(0,s.substring(0, r))),
                        i++),
                        s = s.substring(r),
                        f = f.substring(r)),
                        0 !== (r = this.diff_commonSuffix(s, f)) && (e[i][1] = s.substring(s.length - r) + e[i][1],
                        s = s.substring(0, s.length - r),
                        f = f.substring(0, f.length - r))),
                        i -= o + a,
                        e.splice(i, o + a),
                        f.length && (e.splice(i, 0, new t.Diff(n,f)),
                        i++),
                        s.length && (e.splice(i, 0, new t.Diff(1,s)),
                        i++),
                        i++) : 0 !== i && 0 == e[i - 1][0] ? (e[i - 1][1] += e[i][1],
                        e.splice(i, 1)) : i++,
                        a = 0,
                        o = 0,
                        f = "",
                        s = ""
                    }
                "" === e[e.length - 1][1] && e.pop();
                var l = !1;
                for (i = 1; i < e.length - 1; )
                    0 == e[i - 1][0] && 0 == e[i + 1][0] && (e[i][1].substring(e[i][1].length - e[i - 1][1].length) == e[i - 1][1] ? (e[i][1] = e[i - 1][1] + e[i][1].substring(0, e[i][1].length - e[i - 1][1].length),
                    e[i + 1][1] = e[i - 1][1] + e[i + 1][1],
                    e.splice(i - 1, 1),
                    l = !0) : e[i][1].substring(0, e[i + 1][1].length) == e[i + 1][1] && (e[i - 1][1] += e[i + 1][1],
                    e[i][1] = e[i][1].substring(e[i + 1][1].length) + e[i + 1][1],
                    e.splice(i + 1, 1),
                    l = !0)),
                    i++;
                l && this.diff_cleanupMerge(e)
            }
            ,
            t.prototype.diff_xIndex = function(e, t) {
                var r, i = 0, o = 0, a = 0, f = 0;
                for (r = 0; r < e.length && (1 !== e[r][0] && (i += e[r][1].length),
                e[r][0] !== n && (o += e[r][1].length),
                !(i > t)); r++)
                    a = i,
                    f = o;
                return e.length != r && e[r][0] === n ? f : f + (t - a)
            }
            ,
            t.prototype.diff_prettyHtml = function(e) {
                for (var t = [], r = /&/g, i = /</g, o = />/g, a = /\n/g, f = 0; f < e.length; f++) {
                    var s = e[f][0]
                      , l = e[f][1].replace(r, "&amp;").replace(i, "&lt;").replace(o, "&gt;").replace(a, "&para;<br>");
                    switch (s) {
                    case 1:
                        t[f] = '<ins style="background:#e6ffe6;">' + l + "</ins>";
                        break;
                    case n:
                        t[f] = '<del style="background:#ffe6e6;">' + l + "</del>";
                        break;
                    case 0:
                        t[f] = "<span>" + l + "</span>"
                    }
                }
                return t.join("")
            }
            ,
            t.prototype.diff_text1 = function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    1 !== e[n][0] && (t[n] = e[n][1]);
                return t.join("")
            }
            ,
            t.prototype.diff_text2 = function(e) {
                for (var t = [], r = 0; r < e.length; r++)
                    e[r][0] !== n && (t[r] = e[r][1]);
                return t.join("")
            }
            ,
            t.prototype.diff_levenshtein = function(e) {
                for (var t = 0, r = 0, i = 0, o = 0; o < e.length; o++) {
                    var a = e[o][0]
                      , f = e[o][1];
                    switch (a) {
                    case 1:
                        r += f.length;
                        break;
                    case n:
                        i += f.length;
                        break;
                    case 0:
                        t += Math.max(r, i),
                        r = 0,
                        i = 0
                    }
                }
                return t += Math.max(r, i)
            }
            ,
            t.prototype.diff_toDelta = function(e) {
                for (var t = [], r = 0; r < e.length; r++)
                    switch (e[r][0]) {
                    case 1:
                        t[r] = "+" + encodeURI(e[r][1]);
                        break;
                    case n:
                        t[r] = "-" + e[r][1].length;
                        break;
                    case 0:
                        t[r] = "=" + e[r][1].length
                    }
                return t.join("\t").replace(/%20/g, " ")
            }
            ,
            t.prototype.diff_fromDelta = function(e, r) {
                for (var i = [], o = 0, a = 0, f = r.split(/\t/g), s = 0; s < f.length; s++) {
                    var l = f[s].substring(1);
                    switch (f[s].charAt(0)) {
                    case "+":
                        try {
                            i[o++] = new t.Diff(1,decodeURI(l))
                        } catch (e) {
                            throw new Error("Illegal escape in diff_fromDelta: " + l)
                        }
                        break;
                    case "-":
                    case "=":
                        var h = parseInt(l, 10);
                        if (isNaN(h) || h < 0)
                            throw new Error("Invalid number in diff_fromDelta: " + l);
                        var u = e.substring(a, a += h);
                        "=" == f[s].charAt(0) ? i[o++] = new t.Diff(0,u) : i[o++] = new t.Diff(n,u);
                        break;
                    default:
                        if (f[s])
                            throw new Error("Invalid diff operation in diff_fromDelta: " + f[s])
                    }
                }
                if (a != e.length)
                    throw new Error("Delta length (" + a + ") does not equal source text length (" + e.length + ").");
                return i
            }
            ,
            t.prototype.match_main = function(e, t, n) {
                if (null == e || null == t || null == n)
                    throw new Error("Null input. (match_main)");
                return n = Math.max(0, Math.min(n, e.length)),
                e == t ? 0 : e.length ? e.substring(n, n + t.length) == t ? n : this.match_bitap_(e, t, n) : -1
            }
            ,
            t.prototype.match_bitap_ = function(e, t, n) {
                if (t.length > this.Match_MaxBits)
                    throw new Error("Pattern too long for this browser.");
                var r = this.match_alphabet_(t)
                  , i = this;
                function o(e, r) {
                    var o = e / t.length
                      , a = Math.abs(n - r);
                    return i.Match_Distance ? o + a / i.Match_Distance : a ? 1 : o
                }
                var a = this.Match_Threshold
                  , f = e.indexOf(t, n);
                -1 != f && (a = Math.min(o(0, f), a),
                -1 != (f = e.lastIndexOf(t, n + t.length)) && (a = Math.min(o(0, f), a)));
                var s, l, h = 1 << t.length - 1;
                f = -1;
                for (var u, c = t.length + e.length, d = 0; d < t.length; d++) {
                    for (s = 0,
                    l = c; s < l; )
                        o(d, n + l) <= a ? s = l : c = l,
                        l = Math.floor((c - s) / 2 + s);
                    c = l;
                    var g = Math.max(1, n - l + 1)
                      , p = Math.min(n + l, e.length) + t.length
                      , v = Array(p + 2);
                    v[p + 1] = (1 << d) - 1;
                    for (var _ = p; _ >= g; _--) {
                        var b = r[e.charAt(_ - 1)];
                        if (v[_] = 0 === d ? (v[_ + 1] << 1 | 1) & b : (v[_ + 1] << 1 | 1) & b | (u[_ + 1] | u[_]) << 1 | 1 | u[_ + 1],
                        v[_] & h) {
                            var m = o(d, _ - 1);
                            if (m <= a) {
                                if (a = m,
                                !((f = _ - 1) > n))
                                    break;
                                g = Math.max(1, 2 * n - f)
                            }
                        }
                    }
                    if (o(d + 1, n) > a)
                        break;
                    u = v
                }
                return f
            }
            ,
            t.prototype.match_alphabet_ = function(e) {
                for (var t = {}, n = 0; n < e.length; n++)
                    t[e.charAt(n)] = 0;
                for (n = 0; n < e.length; n++)
                    t[e.charAt(n)] |= 1 << e.length - n - 1;
                return t
            }
            ,
            t.prototype.patch_addContext_ = function(e, n) {
                if (0 != n.length) {
                    if (null === e.start2)
                        throw Error("patch not initialized");
                    for (var r = n.substring(e.start2, e.start2 + e.length1), i = 0; n.indexOf(r) != n.lastIndexOf(r) && r.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; )
                        i += this.Patch_Margin,
                        r = n.substring(e.start2 - i, e.start2 + e.length1 + i);
                    i += this.Patch_Margin;
                    var o = n.substring(e.start2 - i, e.start2);
                    o && e.diffs.unshift(new t.Diff(0,o));
                    var a = n.substring(e.start2 + e.length1, e.start2 + e.length1 + i);
                    a && e.diffs.push(new t.Diff(0,a)),
                    e.start1 -= o.length,
                    e.start2 -= o.length,
                    e.length1 += o.length + a.length,
                    e.length2 += o.length + a.length
                }
            }
            ,
            t.prototype.patch_make = function(e, r, i) {
                var o, a;
                if ("string" == typeof e && "string" == typeof r && void 0 === i)
                    o = e,
                    (a = this.diff_main(o, r, !0)).length > 2 && (this.diff_cleanupSemantic(a),
                    this.diff_cleanupEfficiency(a));
                else if (e && "object" == typeof e && void 0 === r && void 0 === i)
                    a = e,
                    o = this.diff_text1(a);
                else if ("string" == typeof e && r && "object" == typeof r && void 0 === i)
                    o = e,
                    a = r;
                else {
                    if ("string" != typeof e || "string" != typeof r || !i || "object" != typeof i)
                        throw new Error("Unknown call format to patch_make.");
                    o = e,
                    a = i
                }
                if (0 === a.length)
                    return [];
                for (var f = [], s = new t.patch_obj, l = 0, h = 0, u = 0, c = o, d = o, g = 0; g < a.length; g++) {
                    var p = a[g][0]
                      , v = a[g][1];
                    switch (l || 0 === p || (s.start1 = h,
                    s.start2 = u),
                    p) {
                    case 1:
                        s.diffs[l++] = a[g],
                        s.length2 += v.length,
                        d = d.substring(0, u) + v + d.substring(u);
                        break;
                    case n:
                        s.length1 += v.length,
                        s.diffs[l++] = a[g],
                        d = d.substring(0, u) + d.substring(u + v.length);
                        break;
                    case 0:
                        v.length <= 2 * this.Patch_Margin && l && a.length != g + 1 ? (s.diffs[l++] = a[g],
                        s.length1 += v.length,
                        s.length2 += v.length) : v.length >= 2 * this.Patch_Margin && l && (this.patch_addContext_(s, c),
                        f.push(s),
                        s = new t.patch_obj,
                        l = 0,
                        c = d,
                        h = u)
                    }
                    1 !== p && (h += v.length),
                    p !== n && (u += v.length)
                }
                return l && (this.patch_addContext_(s, c),
                f.push(s)),
                f
            }
            ,
            t.prototype.patch_deepCopy = function(e) {
                for (var n = [], r = 0; r < e.length; r++) {
                    var i = e[r]
                      , o = new t.patch_obj;
                    o.diffs = [];
                    for (var a = 0; a < i.diffs.length; a++)
                        o.diffs[a] = new t.Diff(i.diffs[a][0],i.diffs[a][1]);
                    o.start1 = i.start1,
                    o.start2 = i.start2,
                    o.length1 = i.length1,
                    o.length2 = i.length2,
                    n[r] = o
                }
                return n
            }
            ,
            t.prototype.patch_apply = function(e, t) {
                if (0 == e.length)
                    return [t, []];
                e = this.patch_deepCopy(e);
                var r = this.patch_addPadding(e);
                t = r + t + r,
                this.patch_splitMax(e);
                for (var i = 0, o = [], a = 0; a < e.length; a++) {
                    var f, s, l = e[a].start2 + i, h = this.diff_text1(e[a].diffs), u = -1;
                    if (h.length > this.Match_MaxBits ? -1 != (f = this.match_main(t, h.substring(0, this.Match_MaxBits), l)) && (-1 == (u = this.match_main(t, h.substring(h.length - this.Match_MaxBits), l + h.length - this.Match_MaxBits)) || f >= u) && (f = -1) : f = this.match_main(t, h, l),
                    -1 == f)
                        o[a] = !1,
                        i -= e[a].length2 - e[a].length1;
                    else if (o[a] = !0,
                    i = f - l,
                    h == (s = -1 == u ? t.substring(f, f + h.length) : t.substring(f, u + this.Match_MaxBits)))
                        t = t.substring(0, f) + this.diff_text2(e[a].diffs) + t.substring(f + h.length);
                    else {
                        var c = this.diff_main(h, s, !1);
                        if (h.length > this.Match_MaxBits && this.diff_levenshtein(c) / h.length > this.Patch_DeleteThreshold)
                            o[a] = !1;
                        else {
                            this.diff_cleanupSemanticLossless(c);
                            for (var d, g = 0, p = 0; p < e[a].diffs.length; p++) {
                                var v = e[a].diffs[p];
                                0 !== v[0] && (d = this.diff_xIndex(c, g)),
                                1 === v[0] ? t = t.substring(0, f + d) + v[1] + t.substring(f + d) : v[0] === n && (t = t.substring(0, f + d) + t.substring(f + this.diff_xIndex(c, g + v[1].length))),
                                v[0] !== n && (g += v[1].length)
                            }
                        }
                    }
                }
                return [t = t.substring(r.length, t.length - r.length), o]
            }
            ,
            t.prototype.patch_addPadding = function(e) {
                for (var n = this.Patch_Margin, r = "", i = 1; i <= n; i++)
                    r += String.fromCharCode(i);
                for (i = 0; i < e.length; i++)
                    e[i].start1 += n,
                    e[i].start2 += n;
                var o = e[0]
                  , a = o.diffs;
                if (0 == a.length || 0 != a[0][0])
                    a.unshift(new t.Diff(0,r)),
                    o.start1 -= n,
                    o.start2 -= n,
                    o.length1 += n,
                    o.length2 += n;
                else if (n > a[0][1].length) {
                    var f = n - a[0][1].length;
                    a[0][1] = r.substring(a[0][1].length) + a[0][1],
                    o.start1 -= f,
                    o.start2 -= f,
                    o.length1 += f,
                    o.length2 += f
                }
                if (0 == (a = (o = e[e.length - 1]).diffs).length || 0 != a[a.length - 1][0])
                    a.push(new t.Diff(0,r)),
                    o.length1 += n,
                    o.length2 += n;
                else if (n > a[a.length - 1][1].length) {
                    f = n - a[a.length - 1][1].length;
                    a[a.length - 1][1] += r.substring(0, f),
                    o.length1 += f,
                    o.length2 += f
                }
                return r
            }
            ,
            t.prototype.patch_splitMax = function(e) {
                for (var r = this.Match_MaxBits, i = 0; i < e.length; i++)
                    if (!(e[i].length1 <= r)) {
                        var o = e[i];
                        e.splice(i--, 1);
                        for (var a = o.start1, f = o.start2, s = ""; 0 !== o.diffs.length; ) {
                            var l = new t.patch_obj
                              , h = !0;
                            for (l.start1 = a - s.length,
                            l.start2 = f - s.length,
                            "" !== s && (l.length1 = l.length2 = s.length,
                            l.diffs.push(new t.Diff(0,s))); 0 !== o.diffs.length && l.length1 < r - this.Patch_Margin; ) {
                                var u = o.diffs[0][0]
                                  , c = o.diffs[0][1];
                                1 === u ? (l.length2 += c.length,
                                f += c.length,
                                l.diffs.push(o.diffs.shift()),
                                h = !1) : u === n && 1 == l.diffs.length && 0 == l.diffs[0][0] && c.length > 2 * r ? (l.length1 += c.length,
                                a += c.length,
                                h = !1,
                                l.diffs.push(new t.Diff(u,c)),
                                o.diffs.shift()) : (c = c.substring(0, r - l.length1 - this.Patch_Margin),
                                l.length1 += c.length,
                                a += c.length,
                                0 === u ? (l.length2 += c.length,
                                f += c.length) : h = !1,
                                l.diffs.push(new t.Diff(u,c)),
                                c == o.diffs[0][1] ? o.diffs.shift() : o.diffs[0][1] = o.diffs[0][1].substring(c.length))
                            }
                            s = (s = this.diff_text2(l.diffs)).substring(s.length - this.Patch_Margin);
                            var d = this.diff_text1(o.diffs).substring(0, this.Patch_Margin);
                            "" !== d && (l.length1 += d.length,
                            l.length2 += d.length,
                            0 !== l.diffs.length && 0 === l.diffs[l.diffs.length - 1][0] ? l.diffs[l.diffs.length - 1][1] += d : l.diffs.push(new t.Diff(0,d))),
                            h || e.splice(++i, 0, l)
                        }
                    }
            }
            ,
            t.prototype.patch_toText = function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    t[n] = e[n];
                return t.join("")
            }
            ,
            t.prototype.patch_fromText = function(e) {
                var r = [];
                if (!e)
                    return r;
                for (var i = e.split("\n"), o = 0, a = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; o < i.length; ) {
                    var f = i[o].match(a);
                    if (!f)
                        throw new Error("Invalid patch string: " + i[o]);
                    var s = new t.patch_obj;
                    for (r.push(s),
                    s.start1 = parseInt(f[1], 10),
                    "" === f[2] ? (s.start1--,
                    s.length1 = 1) : "0" == f[2] ? s.length1 = 0 : (s.start1--,
                    s.length1 = parseInt(f[2], 10)),
                    s.start2 = parseInt(f[3], 10),
                    "" === f[4] ? (s.start2--,
                    s.length2 = 1) : "0" == f[4] ? s.length2 = 0 : (s.start2--,
                    s.length2 = parseInt(f[4], 10)),
                    o++; o < i.length; ) {
                        var l = i[o].charAt(0);
                        try {
                            var h = decodeURI(i[o].substring(1))
                        } catch (e) {
                            throw new Error("Illegal escape in patch_fromText: " + h)
                        }
                        if ("-" == l)
                            s.diffs.push(new t.Diff(n,h));
                        else if ("+" == l)
                            s.diffs.push(new t.Diff(1,h));
                        else if (" " == l)
                            s.diffs.push(new t.Diff(0,h));
                        else {
                            if ("@" == l)
                                break;
                            if ("" !== l)
                                throw new Error('Invalid patch mode "' + l + '" in: ' + h)
                        }
                        o++
                    }
                }
                return r
            }
            ,
            (t.patch_obj = function() {
                this.diffs = [],
                this.start1 = null,
                this.start2 = null,
                this.length1 = 0,
                this.length2 = 0
            }
            ).prototype.toString = function() {
                for (var e, t = ["@@ -" + (0 === this.length1 ? this.start1 + ",0" : 1 == this.length1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1) + " +" + (0 === this.length2 ? this.start2 + ",0" : 1 == this.length2 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2) + " @@\n"], r = 0; r < this.diffs.length; r++) {
                    switch (this.diffs[r][0]) {
                    case 1:
                        e = "+";
                        break;
                    case n:
                        e = "-";
                        break;
                    case 0:
                        e = " "
                    }
                    t[r + 1] = e + encodeURI(this.diffs[r][1]) + "\n"
                }
                return t.join("").replace(/%20/g, " ")
            }
            ,
            e.exports = t,
            e.exports.diff_match_patch = t,
            e.exports.DIFF_DELETE = n,
            e.exports.DIFF_INSERT = 1,
            e.exports.DIFF_EQUAL = 0
        }
        ,
        655: (e, t, n) => {
            "use strict";
            n.r(t),
            n.d(t, {
                __assign: () => o,
                __asyncDelegator: () => w,
                __asyncGenerator: () => y,
                __asyncValues: () => x,
                __await: () => m,
                __awaiter: () => h,
                __classPrivateFieldGet: () => E,
                __classPrivateFieldIn: () => O,
                __classPrivateFieldSet: () => S,
                __createBinding: () => c,
                __decorate: () => f,
                __exportStar: () => d,
                __extends: () => i,
                __generator: () => u,
                __importDefault: () => T,
                __importStar: () => M,
                __makeTemplateObject: () => D,
                __metadata: () => l,
                __param: () => s,
                __read: () => p,
                __rest: () => a,
                __spread: () => v,
                __spreadArray: () => b,
                __spreadArrays: () => _,
                __values: () => g
            });
            var r = function(e, t) {
                return r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                ,
                r(e, t)
            };
            function i(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                r(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            var o = function() {
                return o = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var i in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }
                ,
                o.apply(this, arguments)
            };
            function a(e, t) {
                var n = {};
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                        t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                }
                return n
            }
            function f(e, t, n, r) {
                var i, o = arguments.length, a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    a = Reflect.decorate(e, t, n, r);
                else
                    for (var f = e.length - 1; f >= 0; f--)
                        (i = e[f]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
                return o > 3 && a && Object.defineProperty(t, n, a),
                a
            }
            function s(e, t) {
                return function(n, r) {
                    t(n, r, e)
                }
            }
            function l(e, t) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(e, t)
            }
            function h(e, t, n, r) {
                return new (n || (n = Promise))((function(i, o) {
                    function a(e) {
                        try {
                            s(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function f(e) {
                        try {
                            s(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function s(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function(e) {
                            e(t)
                        }
                        ))).then(a, f)
                    }
                    s((r = r.apply(e, t || [])).next())
                }
                ))
            }
            function u(e, t) {
                var n, r, i, o, a = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: f(0),
                    throw: f(1),
                    return: f(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function f(o) {
                    return function(f) {
                        return function(o) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; a; )
                                try {
                                    if (n = 1,
                                    r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                                    0) : r.next) && !(i = i.call(r, o[1])).done)
                                        return i;
                                    switch (r = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return a.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        a.label++,
                                        r = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = a.ops.pop(),
                                        a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = a.trys,
                                        (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            a.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && a.label < i[1]) {
                                            a.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2],
                                            a.ops.push(o);
                                            break
                                        }
                                        i[2] && a.ops.pop(),
                                        a.trys.pop();
                                        continue
                                    }
                                    o = t.call(e, a)
                                } catch (e) {
                                    o = [6, e],
                                    r = 0
                                } finally {
                                    n = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, f])
                    }
                }
            }
            var c = Object.create ? function(e, t, n, r) {
                void 0 === r && (r = n);
                var i = Object.getOwnPropertyDescriptor(t, n);
                i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                    enumerable: !0,
                    get: function() {
                        return t[n]
                    }
                }),
                Object.defineProperty(e, r, i)
            }
            : function(e, t, n, r) {
                void 0 === r && (r = n),
                e[r] = t[n]
            }
            ;
            function d(e, t) {
                for (var n in e)
                    "default" === n || Object.prototype.hasOwnProperty.call(t, n) || c(t, e, n)
            }
            function g(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
            function p(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var r, i, o = n.call(e), a = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
                        a.push(r.value)
                } catch (e) {
                    i = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = o.return) && n.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return a
            }
            function v() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e = e.concat(p(arguments[t]));
                return e
            }
            function _() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                    e += arguments[t].length;
                var r = Array(e)
                  , i = 0;
                for (t = 0; t < n; t++)
                    for (var o = arguments[t], a = 0, f = o.length; a < f; a++,
                    i++)
                        r[i] = o[a];
                return r
            }
            function b(e, t, n) {
                if (n || 2 === arguments.length)
                    for (var r, i = 0, o = t.length; i < o; i++)
                        !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)),
                        r[i] = t[i]);
                return e.concat(r || Array.prototype.slice.call(t))
            }
            function m(e) {
                return this instanceof m ? (this.v = e,
                this) : new m(e)
            }
            function y(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var r, i = n.apply(e, t || []), o = [];
                return r = {},
                a("next"),
                a("throw"),
                a("return"),
                r[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                r;
                function a(e) {
                    i[e] && (r[e] = function(t) {
                        return new Promise((function(n, r) {
                            o.push([e, t, n, r]) > 1 || f(e, t)
                        }
                        ))
                    }
                    )
                }
                function f(e, t) {
                    try {
                        (n = i[e](t)).value instanceof m ? Promise.resolve(n.value.v).then(s, l) : h(o[0][2], n)
                    } catch (e) {
                        h(o[0][3], e)
                    }
                    var n
                }
                function s(e) {
                    f("next", e)
                }
                function l(e) {
                    f("throw", e)
                }
                function h(e, t) {
                    e(t),
                    o.shift(),
                    o.length && f(o[0][0], o[0][1])
                }
            }
            function w(e) {
                var t, n;
                return t = {},
                r("next"),
                r("throw", (function(e) {
                    throw e
                }
                )),
                r("return"),
                t[Symbol.iterator] = function() {
                    return this
                }
                ,
                t;
                function r(r, i) {
                    t[r] = e[r] ? function(t) {
                        return (n = !n) ? {
                            value: m(e[r](t)),
                            done: "return" === r
                        } : i ? i(t) : t
                    }
                    : i
                }
            }
            function x(e) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var t, n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = g(e),
                t = {},
                r("next"),
                r("throw"),
                r("return"),
                t[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                t);
                function r(n) {
                    t[n] = e[n] && function(t) {
                        return new Promise((function(r, i) {
                            (function(e, t, n, r) {
                                Promise.resolve(r).then((function(t) {
                                    e({
                                        value: t,
                                        done: n
                                    })
                                }
                                ), t)
                            }
                            )(r, i, (t = e[n](t)).done, t.value)
                        }
                        ))
                    }
                }
            }
            function D(e, t) {
                return Object.defineProperty ? Object.defineProperty(e, "raw", {
                    value: t
                }) : e.raw = t,
                e
            }
            var N = Object.create ? function(e, t) {
                Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t
                })
            }
            : function(e, t) {
                e.default = t
            }
            ;
            function M(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && c(t, e, n);
                return N(t, e),
                t
            }
            function T(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function E(e, t, n, r) {
                if ("a" === n && !r)
                    throw new TypeError("Private accessor was defined without a getter");
                if ("function" == typeof t ? e !== t || !r : !t.has(e))
                    throw new TypeError("Cannot read private member from an object whose class did not declare it");
                return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e)
            }
            function S(e, t, n, r, i) {
                if ("m" === r)
                    throw new TypeError("Private method is not writable");
                if ("a" === r && !i)
                    throw new TypeError("Private accessor was defined without a setter");
                if ("function" == typeof t ? e !== t || !i : !t.has(e))
                    throw new TypeError("Cannot write private member to an object whose class did not declare it");
                return "a" === r ? i.call(e, n) : i ? i.value = n : t.set(e, n),
                n
            }
            function O(e, t) {
                if (null === t || "object" != typeof t && "function" != typeof t)
                    throw new TypeError("Cannot use 'in' operator on non-object");
                return "function" == typeof e ? t === e : e.has(t)
            }
        }
        ,
        967: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(402)
              , i = new Set;
            i.add("IMG"),
            i.add("VIDEO"),
            i.add("IFRAME"),
            i.add("OBJECT");
            var o = new Set;
            o.add("BDO"),
            o.add("BDI"),
            o.add("Q"),
            o.add("CITE"),
            o.add("CODE"),
            o.add("DATA"),
            o.add("TIME"),
            o.add("VAR"),
            o.add("DFN"),
            o.add("ABBR"),
            o.add("STRONG"),
            o.add("EM"),
            o.add("BIG"),
            o.add("SMALL"),
            o.add("MARK"),
            o.add("SUB"),
            o.add("SUP"),
            o.add("SAMP"),
            o.add("KBD"),
            o.add("B"),
            o.add("I"),
            o.add("S"),
            o.add("U"),
            o.add("SPAN"),
            i.add("SVG"),
            t.optionsToConfig = function(e) {
                var t = void 0 === e ? {} : e
                  , n = t.addedClass
                  , a = void 0 === n ? "vdd-added" : n
                  , f = t.modifiedClass
                  , s = void 0 === f ? "vdd-modified" : f
                  , l = t.removedClass
                  , h = void 0 === l ? "vdd-removed" : l
                  , u = t.skipModified
                  , c = void 0 !== u && u
                  , d = t.skipChildren
                  , g = t.skipSelf
                  , p = t.diffText;
                return {
                    addedClass: a,
                    diffText: void 0 === p ? r.diffText : p,
                    modifiedClass: s,
                    removedClass: h,
                    skipModified: c,
                    skipChildren: function(e) {
                        if (!r.isElement(e) && !r.isDocumentFragment(e) && !r.isDocument(e))
                            return !0;
                        if (d) {
                            var t = d(e);
                            if ("boolean" == typeof t)
                                return t
                        }
                        return i.has(e.nodeName)
                    },
                    skipSelf: function(e) {
                        if (!r.isText(e) && !r.isElement(e))
                            return !0;
                        if (g) {
                            var t = g(e);
                            if ("boolean" == typeof t)
                                return t
                        }
                        return o.has(e.nodeName)
                    }
                }
            }
        }
        ,
        145: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(27)
              , i = n(967)
              , o = n(844)
              , a = n(402)
              , f = function(e) {
                return "TH" === e ? "TD" : e
            }
              , s = function(e, t) {
                return new o.DomIterator(e,t).reduce((function(e, t) {
                    return e + (a.isText(t) ? t.data : a.charForNodeName(f(t.nodeName)))
                }
                ), "")
            }
              , l = function(e) {
                return a.isText(e) ? e.length : 1
            }
              , h = function(e) {
                return "TR" === e.nodeName
            }
              , u = {
                skipChildren: h,
                skipSelf: function(e) {
                    return !h(e)
                }
            };
            t.visualDomDiff = function e(t, n, h) {
                var c, d;
                void 0 === h && (h = {});
                var g, p, v, _, b, m = n.ownerDocument || n, y = i.optionsToConfig(h), w = y.addedClass, x = y.diffText, D = y.modifiedClass, N = y.removedClass, M = y.skipSelf, T = y.skipChildren, E = function(e) {
                    return !M(e)
                }, S = function(e, t) {
                    return a.getAncestors(e, t).filter(E).length
                }, O = function(e) {
                    return a.isElement(e) && M(e)
                }, A = function(e, t) {
                    return a.getAncestors(e, t).filter(O).reverse()
                }, C = function(e) {
                    return Z.has(e) ? 1 : J.has(e) ? -1 : 0
                }, P = x(s(t, y), s(n, y)), k = 0, j = new o.DomIterator(t,y), I = new o.DomIterator(n,y), F = 0, R = 0, B = 0;
                v = P[k++],
                c = j.next(),
                g = c.done,
                _ = c.value,
                d = I.next(),
                p = d.done,
                b = d.value;
                var L = m.createDocumentFragment()
                  , U = L
                  , q = 0
                  , Q = L
                  , V = 0
                  , G = null
                  , H = null
                  , J = new Set
                  , Z = new Set
                  , $ = new Set
                  , z = new Map
                  , K = new Array
                  , X = new Map;
                function Y() {
                    for (var e = S(_, t); q > e; ) {
                        if (!U.parentNode)
                            return a.never();
                        U === G && (G = null),
                        U = U.parentNode,
                        q--
                    }
                    if (q !== e)
                        return a.never()
                }
                function W() {
                    for (var e = S(b, n); V > e; ) {
                        if (!Q.parentNode)
                            return a.never();
                        Q === H && (H = null),
                        Q = Q.parentNode,
                        V--
                    }
                    if (V !== e)
                        return a.never()
                }
                function ee(e) {
                    if (U !== Q || H || G)
                        return a.never();
                    if (a.isText(e)) {
                        var r = A(_, t)
                          , i = A(b, n);
                        z.set(e, i);
                        var o = r.length;
                        if (o !== i.length)
                            $.add(e);
                        else
                            for (var f = 0; f < o; ++f)
                                if (!a.areNodesEqual(r[f], i[f])) {
                                    $.add(e);
                                    break
                                }
                    } else {
                        a.areNodesEqual(_, b) || $.add(e);
                        var s = _.nodeName;
                        "TABLE" === s ? K.push({
                            newTable: b,
                            oldTable: _,
                            outputTable: e
                        }) : "TR" === s && X.set(e, {
                            newRow: b,
                            oldRow: _
                        })
                    }
                    Q.appendChild(e),
                    U = e,
                    Q = e,
                    q++,
                    V++
                }
                function te(e) {
                    if (G || (G = e,
                    J.add(e)),
                    a.isText(e)) {
                        var n = A(_, t);
                        z.set(e, n)
                    }
                    U.appendChild(e),
                    U = e,
                    q++
                }
                function ne(e) {
                    if (H || (H = e,
                    Z.add(e)),
                    a.isText(e)) {
                        var t = A(b, n);
                        z.set(e, t)
                    }
                    Q.appendChild(e),
                    Q = e,
                    V++
                }
                function re(e) {
                    var t = v[1].length;
                    if ((F += e) === t)
                        v = P[k++],
                        F = 0;
                    else if (F > t)
                        return a.never()
                }
                function ie(e) {
                    var t, n = l(_);
                    if ((R += e) === n)
                        t = j.next(),
                        g = t.done,
                        _ = t.value,
                        R = 0;
                    else if (R > n)
                        return a.never()
                }
                function oe(e) {
                    var t, n = l(b);
                    if ((B += e) === n)
                        t = I.next(),
                        p = t.done,
                        b = t.value,
                        B = 0;
                    else if (B > n)
                        return a.never()
                }
                for (; v; )
                    if (v[0] === r.DIFF_DELETE) {
                        if (g)
                            return a.never();
                        Y();
                        var ae = Math.min(v[1].length - F, l(_) - R)
                          , fe = v[1].substring(F, F + ae);
                        te(a.isText(_) ? m.createTextNode(fe) : _.cloneNode(!1)),
                        re(ae),
                        ie(ae)
                    } else if (v[0] === r.DIFF_INSERT) {
                        if (p)
                            return a.never();
                        W();
                        var se = Math.min(v[1].length - F, l(b) - B);
                        fe = v[1].substring(F, F + se);
                        ne(a.isText(b) ? m.createTextNode(fe) : b.cloneNode(!1)),
                        re(se),
                        oe(se)
                    } else {
                        if (g || p)
                            return a.never();
                        Y(),
                        W();
                        var le = Math.min(v[1].length - F, l(_) - R, l(b) - B);
                        fe = v[1].substring(F, F + le);
                        U === Q && (a.isText(_) && a.isText(b) || f(_.nodeName) === f(b.nodeName) && !T(_) && !T(b) || a.areNodesEqual(_, b)) ? ee(a.isText(b) ? m.createTextNode(fe) : b.cloneNode(!1)) : (te(a.isText(_) ? m.createTextNode(fe) : _.cloneNode(!1)),
                        ne(a.isText(b) ? m.createTextNode(fe) : b.cloneNode(!1))),
                        re(le),
                        ie(le),
                        oe(le)
                    }
                return J.forEach((function(e) {
                    for (var t = e.parentNode, n = e.previousSibling; n && Z.has(n); )
                        t.insertBefore(e, n),
                        n = e.previousSibling
                }
                )),
                K.forEach((function(t) {
                    var n = t.newTable
                      , r = t.oldTable
                      , i = t.outputTable;
                    if (!a.isTableValid(r, !0) || !a.isTableValid(n, !0) || !a.isTableValid(i, !1)) {
                        new o.DomIterator(i).forEach((function(e) {
                            Z.delete(e),
                            J.delete(e),
                            $.delete(e),
                            z.delete(e)
                        }
                        ));
                        var f = i.parentNode
                          , s = r.cloneNode(!0)
                          , l = n.cloneNode(!0);
                        return f.insertBefore(s, i),
                        f.insertBefore(l, i),
                        f.removeChild(i),
                        J.add(s),
                        void Z.add(l)
                    }
                    var c = [];
                    new o.DomIterator(i,u).some((function(e) {
                        var t = X.get(e);
                        if (!t)
                            return !1;
                        var n = t.oldRow
                          , r = t.newRow
                          , i = n.childNodes.length
                          , o = r.childNodes.length
                          , a = Math.max(i, o)
                          , f = Math.min(i, o);
                        if (e.childNodes.length === a)
                            for (var s = e.childNodes, l = 0, h = s.length; l < h; ++l)
                                c.push(C(s[l]));
                        else {
                            l = 0;
                            for (var u = 0; l < f; )
                                c[l++] = u;
                            for (u = i < o ? 1 : -1; l < a; )
                                c[l++] = u
                        }
                        return !0
                    }
                    ));
                    var d = c.length;
                    if (0 === d)
                        return a.never();
                    new o.DomIterator(i,u).forEach((function(t) {
                        var n = t.childNodes;
                        if (Z.has(t) || Z.has(t.parentNode)) {
                            if (n.length < d)
                                for (var r = 0; r < d; ++r)
                                    if (-1 === c[r]) {
                                        var i = m.createElement("TD");
                                        t.insertBefore(i, n[r]),
                                        J.add(i)
                                    }
                        } else if (J.has(t) || J.has(t.parentNode)) {
                            if (n.length < d)
                                for (r = 0; r < d; ++r)
                                    if (1 === c[r]) {
                                        i = m.createElement("TD");
                                        t.insertBefore(i, n[r])
                                    }
                        } else {
                            for (var a = !0, f = (r = 0,
                            n.length); r < f; ++r)
                                if (C(n[r]) !== c[r]) {
                                    a = !1;
                                    break
                                }
                            if (!a) {
                                var s = new o.DomIterator(t);
                                for (s.next(),
                                s.forEach((function(e) {
                                    Z.delete(e),
                                    J.delete(e),
                                    $.delete(e),
                                    z.delete(e)
                                }
                                )); t.firstChild; )
                                    t.removeChild(t.firstChild);
                                var l = X.get(t)
                                  , u = l.newRow
                                  , g = l.oldRow
                                  , p = u.childNodes
                                  , v = g.childNodes
                                  , _ = 0
                                  , b = 0;
                                for (r = 0; r < d; ++r)
                                    if (1 === c[r]) {
                                        var y = p[b++].cloneNode(!0);
                                        t.appendChild(y),
                                        Z.add(y)
                                    } else if (-1 === c[r]) {
                                        var w = v[_++].cloneNode(!0);
                                        t.appendChild(w),
                                        J.add(w)
                                    } else
                                        t.appendChild(e(v[_++], p[b++], h))
                            }
                        }
                    }
                    ))
                }
                )),
                J.forEach((function(e) {
                    a.markUpNode(e, "DEL", N)
                }
                )),
                Z.forEach((function(e) {
                    a.markUpNode(e, "INS", w)
                }
                )),
                y.skipModified || $.forEach((function(e) {
                    a.markUpNode(e, "INS", D)
                }
                )),
                z.forEach((function(e, t) {
                    e.forEach((function(e) {
                        var n = t.parentNode
                          , r = t.previousSibling;
                        if (r && a.areNodesEqual(r, e))
                            r.appendChild(t);
                        else {
                            var i = e.cloneNode(!1);
                            n.insertBefore(i, t),
                            i.appendChild(t)
                        }
                    }
                    ))
                }
                )),
                L
            }
        }
        ,
        844: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e, t) {
                    this.rootNode = e,
                    this.config = t,
                    this.descend = !0,
                    this.nextNode = this.rootNode,
                    this.skipSelf(this.nextNode) && this.next()
                }
                return e.prototype.toArray = function() {
                    for (var e, t = [], n = this.next(), r = n.done, i = n.value; !r; )
                        t.push(i),
                        r = (e = this.next()).done,
                        i = e.value;
                    return t
                }
                ,
                e.prototype.forEach = function(e) {
                    for (var t, n = this.next(), r = n.done, i = n.value; !r; )
                        e(i),
                        r = (t = this.next()).done,
                        i = t.value
                }
                ,
                e.prototype.reduce = function(e, t) {
                    for (var n, r = t, i = this.next(), o = i.done, a = i.value; !o; )
                        r = e(r, a),
                        o = (n = this.next()).done,
                        a = n.value;
                    return r
                }
                ,
                e.prototype.some = function(e) {
                    for (var t, n = this.next(), r = n.done, i = n.value; !r; ) {
                        if (e(i))
                            return !0;
                        r = (t = this.next()).done,
                        i = t.value
                    }
                    return !1
                }
                ,
                e.prototype.next = function() {
                    if (!this.nextNode)
                        return {
                            done: !0,
                            value: this.rootNode
                        };
                    var e = this.nextNode;
                    return this.descend && this.nextNode.firstChild && !this.skipChildren(this.nextNode) ? this.nextNode = this.nextNode.firstChild : this.nextNode === this.rootNode ? this.nextNode = null : this.nextNode.nextSibling ? (this.nextNode = this.nextNode.nextSibling,
                    this.descend = !0) : (this.nextNode = this.nextNode.parentNode,
                    this.descend = !1,
                    this.next()),
                    this.nextNode && this.skipSelf(this.nextNode) && this.next(),
                    {
                        done: !1,
                        value: e
                    }
                }
                ,
                e.prototype.skipSelf = function(e) {
                    return !(!this.config || !this.config.skipSelf) && this.config.skipSelf(e)
                }
                ,
                e.prototype.skipChildren = function(e) {
                    return !(!this.config || !this.config.skipChildren) && this.config.skipChildren(e)
                }
                ,
                e
            }();
            t.DomIterator = n
        }
        ,
        224: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            n(655).__exportStar(n(145), t)
        }
        ,
        402: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(27);
            function i(e) {
                return e.nodeType === e.ELEMENT_NODE
            }
            function o(e) {
                return e.nodeType === e.TEXT_NODE
            }
            function a(e) {
                return e.nodeType === e.COMMENT_NODE
            }
            function f(e, t) {
                return e === t
            }
            function s(e, t, n) {
                if (void 0 === n && (n = f),
                e.length !== t.length)
                    return !1;
                for (var r = 0, i = e.length; r < i; ++r)
                    if (!n(e[r], t[r]))
                        return !1;
                return !0
            }
            function l(e) {
                if (e.getAttributeNames)
                    return e.getAttributeNames();
                for (var t = e.attributes, n = t.length, r = new Array(n), i = 0; i < n; i++)
                    r[i] = t[i].name;
                return r
            }
            function h(e) {
                for (var t = 0, n = 0; n < e.length; n++)
                    t = (t << 5) - t + e.charCodeAt(n) | 0;
                return t
            }
            function u(e) {
                for (var t = 0; t < e.length - 2; ) {
                    var n = e[t]
                      , i = e[t + 1]
                      , o = e[t + 2];
                    if (n[0] === r.DIFF_EQUAL && i[0] !== r.DIFF_EQUAL && o[0] === r.DIFF_EQUAL) {
                        var a = n[1]
                          , f = i[1]
                          , s = o[1]
                          , l = a[a.length - 1];
                        l !== f[f.length - 1] || l < "" || l >= "豈" ? t++ : (n[1] = a.substring(0, a.length - 1),
                        i[1] = l + f.substring(0, f.length - 1),
                        o[1] = l + s,
                        0 === n[1].length && e.splice(t, 1))
                    } else
                        t++
                }
            }
            t.isElement = i,
            t.isText = o,
            t.isDocument = function(e) {
                return e.nodeType === e.DOCUMENT_NODE
            }
            ,
            t.isDocumentFragment = function(e) {
                return e.nodeType === e.DOCUMENT_FRAGMENT_NODE
            }
            ,
            t.isComment = a,
            t.strictEqual = f,
            t.areArraysEqual = s,
            t.areNodesEqual = function e(t, n, r) {
                if (void 0 === r && (r = !1),
                t === n)
                    return !0;
                if (t.nodeType !== n.nodeType || t.nodeName !== n.nodeName)
                    return !1;
                if (o(t) || a(t)) {
                    if (t.data !== n.data)
                        return !1
                } else if (i(t)) {
                    var f = l(t).sort();
                    if (!s(f, l(n).sort()))
                        return !1;
                    for (var h = 0, u = f.length; h < u; ++h) {
                        var c = f[h];
                        if (t.getAttribute(c) !== n.getAttribute(c))
                            return !1
                    }
                }
                if (r) {
                    var d = t.childNodes
                      , g = n.childNodes;
                    if (d.length !== g.length)
                        return !1;
                    for (h = 0,
                    u = d.length; h < u; ++h)
                        if (!e(d[h], g[h], r))
                            return !1
                }
                return !0
            }
            ,
            t.getAncestors = function(e, t) {
                if (void 0 === t && (t = null),
                !e || e === t)
                    return [];
                for (var n = [], r = e.parentNode; r && (n.push(r),
                r !== t); )
                    r = r.parentNode;
                return n
            }
            ,
            t.never = function(e) {
                throw void 0 === e && (e = "visual-dom-diff: Should never happen"),
                new Error(e)
            }
            ,
            t.hashCode = h,
            t.charForNodeName = function(e) {
                return String.fromCharCode(57344 + h(e) % 6400)
            }
            ,
            t.cleanUpNodeMarkers = u;
            var c = new r.diff_match_patch;
            function d(e, t) {
                for (var n = e.length, r = 0, i = t.length; r < i; )
                    e[n++] = t[r++]
            }
            t.diffText = function(e, t) {
                var n = c.diff_main(e, t)
                  , i = []
                  , o = [];
                u(n);
                for (var a = 0, f = n.length; a < f; ++a) {
                    var s = n[a];
                    if (s[0] === r.DIFF_EQUAL) {
                        var l = s[1]
                          , h = l.length
                          , g = /^[^\uE000-\uF8FF]*/.exec(l)[0].length;
                        if (g < h) {
                            var p = /[^\uE000-\uF8FF]*$/.exec(l)[0].length;
                            g > 0 && o.push([r.DIFF_EQUAL, l.substring(0, g)]),
                            c.diff_cleanupSemantic(o),
                            d(i, o),
                            o.length = 0,
                            i.push([r.DIFF_EQUAL, l.substring(g, h - p)]),
                            p > 0 && o.push([r.DIFF_EQUAL, l.substring(h - p)])
                        } else
                            o.push(s)
                    } else
                        o.push(s)
                }
                return c.diff_cleanupSemantic(o),
                d(i, o),
                o.length = 0,
                c.diff_cleanupMerge(i),
                u(i),
                i
            }
            ,
            t.markUpNode = function(e, t, n) {
                var r = e.ownerDocument
                  , o = e.parentNode
                  , a = e.previousSibling;
                if (i(e))
                    e.classList.add(n);
                else if (a && a.nodeName === t && a.classList.contains(n))
                    a.appendChild(e);
                else {
                    var f = r.createElement(t);
                    f.classList.add(n),
                    o.insertBefore(f, e),
                    f.appendChild(e)
                }
            }
            ,
            t.isTableValid = function(e, t) {
                var n;
                return function(e) {
                    var t = e.childNodes
                      , n = t.length
                      , i = 0;
                    i < n && "CAPTION" === t[i].nodeName && i++;
                    if (i < n && "THEAD" === t[i].nodeName) {
                        if (!r(t[i]))
                            return !1;
                        i++
                    }
                    if (!(i < n && "TBODY" === t[i].nodeName))
                        return !1;
                    if (!r(t[i]))
                        return !1;
                    i++;
                    if (i < n && "TFOOT" === t[i].nodeName) {
                        if (!r(t[i]))
                            return !1;
                        i++
                    }
                    return i === n
                }(e);
                function r(e) {
                    var t = e.childNodes;
                    if ("TBODY" === e.nodeName && 0 === t.length)
                        return !1;
                    for (var n = 0, r = t.length; n < r; ++n)
                        if (!i(t[n]))
                            return !1;
                    return !0
                }
                function i(e) {
                    var r = e.childNodes;
                    if ("TR" !== e.nodeName || 0 === r.length)
                        return !1;
                    if (t)
                        if (void 0 === n)
                            n = r.length;
                        else if (n !== r.length)
                            return !1;
                    for (var i = 0, a = r.length; i < a; ++i)
                        if (!o(r[i]))
                            return !1;
                    return !0
                }
                function o(e) {
                    var t = e.nodeName;
                    if ("TD" !== t && "TH" !== t)
                        return !1;
                    var n = e
                      , r = n.getAttribute("colspan")
                      , i = n.getAttribute("rowspan");
                    return !(null !== r && "1" !== r || null !== i && "1" !== i)
                }
            }
        }
    }
      , t = {};
    function n(r) {
        var i = t[r];
        if (void 0 !== i)
            return i.exports;
        var o = t[r] = {
            id: r,
            exports: {}
        };
        return e[r](o, o.exports, n),
        o.exports
    }
    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }),
        t
    }
    ,
    n.d = (e, t) => {
        for (var r in t)
            n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
    }
    ,
    n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ;
    var r = {};
    return ( () => {
        "use strict";
        n.r(r),
        n(342).setup()
    }
    )(),
    r
}
)()));

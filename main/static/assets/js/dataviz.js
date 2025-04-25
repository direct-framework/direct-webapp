
/**
 * Data visualization scripts
 */

var dataviz = (function () {
  'use strict';

  var Ic = { exports: {} }, Ku = {};
  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var v0;
  function u1() {
    if (v0) return Ku;
    v0 = 1;
    var u = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
    function r(c, o, d) {
      var v = null;
      if (d !== void 0 && (v = "" + d), o.key !== void 0 && (v = "" + o.key), "key" in o) {
        d = {};
        for (var m in o)
          m !== "key" && (d[m] = o[m]);
      } else d = o;
      return o = d.ref, {
        $$typeof: u,
        type: c,
        key: v,
        ref: o !== void 0 ? o : null,
        props: d
      };
    }
    return Ku.Fragment = i, Ku.jsx = r, Ku.jsxs = r, Ku;
  }
  var m0;
  function a1() {
    return m0 || (m0 = 1, Ic.exports = u1()), Ic.exports;
  }
  var zt = a1();
  var tr = { exports: {} }, rt = {};
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var g0;
  function f1() {
    if (g0) return rt;
    g0 = 1;
    var u = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), v = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), x = Symbol.iterator;
    function M(S) {
      return S === null || typeof S != "object" ? null : (S = x && S[x] || S["@@iterator"], typeof S == "function" ? S : null);
    }
    var N = {
      isMounted: function() {
        return !1;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, Q = Object.assign, K = {};
    function lt(S, w, W) {
      this.props = S, this.context = w, this.refs = K, this.updater = W || N;
    }
    lt.prototype.isReactComponent = {}, lt.prototype.setState = function(S, w) {
      if (typeof S != "object" && typeof S != "function" && S != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, S, w, "setState");
    }, lt.prototype.forceUpdate = function(S) {
      this.updater.enqueueForceUpdate(this, S, "forceUpdate");
    };
    function I() {
    }
    I.prototype = lt.prototype;
    function et(S, w, W) {
      this.props = S, this.context = w, this.refs = K, this.updater = W || N;
    }
    var nt = et.prototype = new I();
    nt.constructor = et, Q(nt, lt.prototype), nt.isPureReactComponent = !0;
    var F = Array.isArray, Z = { H: null, A: null, T: null, S: null }, dt = Object.prototype.hasOwnProperty;
    function Ot(S, w, W, k, X, at) {
      return W = at.ref, {
        $$typeof: u,
        type: S,
        key: w,
        ref: W !== void 0 ? W : null,
        props: at
      };
    }
    function bt(S, w) {
      return Ot(
        S.type,
        w,
        void 0,
        void 0,
        void 0,
        S.props
      );
    }
    function C(S) {
      return typeof S == "object" && S !== null && S.$$typeof === u;
    }
    function $(S) {
      var w = { "=": "=0", ":": "=2" };
      return "$" + S.replace(/[=:]/g, function(W) {
        return w[W];
      });
    }
    var V = /\/+/g;
    function ct(S, w) {
      return typeof S == "object" && S !== null && S.key != null ? $("" + S.key) : w.toString(36);
    }
    function G() {
    }
    function q(S) {
      switch (S.status) {
        case "fulfilled":
          return S.value;
        case "rejected":
          throw S.reason;
        default:
          switch (typeof S.status == "string" ? S.then(G, G) : (S.status = "pending", S.then(
            function(w) {
              S.status === "pending" && (S.status = "fulfilled", S.value = w);
            },
            function(w) {
              S.status === "pending" && (S.status = "rejected", S.reason = w);
            }
          )), S.status) {
            case "fulfilled":
              return S.value;
            case "rejected":
              throw S.reason;
          }
      }
      throw S;
    }
    function tt(S, w, W, k, X) {
      var at = typeof S;
      (at === "undefined" || at === "boolean") && (S = null);
      var ft = !1;
      if (S === null) ft = !0;
      else
        switch (at) {
          case "bigint":
          case "string":
          case "number":
            ft = !0;
            break;
          case "object":
            switch (S.$$typeof) {
              case u:
              case i:
                ft = !0;
                break;
              case p:
                return ft = S._init, tt(
                  ft(S._payload),
                  w,
                  W,
                  k,
                  X
                );
            }
        }
      if (ft)
        return X = X(S), ft = k === "" ? "." + ct(S, 0) : k, F(X) ? (W = "", ft != null && (W = ft.replace(V, "$&/") + "/"), tt(X, w, W, "", function(Tt) {
          return Tt;
        })) : X != null && (C(X) && (X = bt(
          X,
          W + (X.key == null || S && S.key === X.key ? "" : ("" + X.key).replace(
            V,
            "$&/"
          ) + "/") + ft
        )), w.push(X)), 1;
      ft = 0;
      var Ct = k === "" ? "." : k + ":";
      if (F(S))
        for (var vt = 0; vt < S.length; vt++)
          k = S[vt], at = Ct + ct(k, vt), ft += tt(
            k,
            w,
            W,
            at,
            X
          );
      else if (vt = M(S), typeof vt == "function")
        for (S = vt.call(S), vt = 0; !(k = S.next()).done; )
          k = k.value, at = Ct + ct(k, vt++), ft += tt(
            k,
            w,
            W,
            at,
            X
          );
      else if (at === "object") {
        if (typeof S.then == "function")
          return tt(
            q(S),
            w,
            W,
            k,
            X
          );
        throw w = String(S), Error(
          "Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return ft;
    }
    function O(S, w, W) {
      if (S == null) return S;
      var k = [], X = 0;
      return tt(S, k, "", "", function(at) {
        return w.call(W, at, X++);
      }), k;
    }
    function Y(S) {
      if (S._status === -1) {
        var w = S._result;
        w = w(), w.then(
          function(W) {
            (S._status === 0 || S._status === -1) && (S._status = 1, S._result = W);
          },
          function(W) {
            (S._status === 0 || S._status === -1) && (S._status = 2, S._result = W);
          }
        ), S._status === -1 && (S._status = 0, S._result = w);
      }
      if (S._status === 1) return S._result.default;
      throw S._result;
    }
    var B = typeof reportError == "function" ? reportError : function(S) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var w = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S),
          error: S
        });
        if (!window.dispatchEvent(w)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", S);
        return;
      }
      console.error(S);
    };
    function ut() {
    }
    return rt.Children = {
      map: O,
      forEach: function(S, w, W) {
        O(
          S,
          function() {
            w.apply(this, arguments);
          },
          W
        );
      },
      count: function(S) {
        var w = 0;
        return O(S, function() {
          w++;
        }), w;
      },
      toArray: function(S) {
        return O(S, function(w) {
          return w;
        }) || [];
      },
      only: function(S) {
        if (!C(S))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return S;
      }
    }, rt.Component = lt, rt.Fragment = r, rt.Profiler = o, rt.PureComponent = et, rt.StrictMode = c, rt.Suspense = g, rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z, rt.act = function() {
      throw Error("act(...) is not supported in production builds of React.");
    }, rt.cache = function(S) {
      return function() {
        return S.apply(null, arguments);
      };
    }, rt.cloneElement = function(S, w, W) {
      if (S == null)
        throw Error(
          "The argument must be a React element, but you passed " + S + "."
        );
      var k = Q({}, S.props), X = S.key, at = void 0;
      if (w != null)
        for (ft in w.ref !== void 0 && (at = void 0), w.key !== void 0 && (X = "" + w.key), w)
          !dt.call(w, ft) || ft === "key" || ft === "__self" || ft === "__source" || ft === "ref" && w.ref === void 0 || (k[ft] = w[ft]);
      var ft = arguments.length - 2;
      if (ft === 1) k.children = W;
      else if (1 < ft) {
        for (var Ct = Array(ft), vt = 0; vt < ft; vt++)
          Ct[vt] = arguments[vt + 2];
        k.children = Ct;
      }
      return Ot(S.type, X, void 0, void 0, at, k);
    }, rt.createContext = function(S) {
      return S = {
        $$typeof: v,
        _currentValue: S,
        _currentValue2: S,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, S.Provider = S, S.Consumer = {
        $$typeof: d,
        _context: S
      }, S;
    }, rt.createElement = function(S, w, W) {
      var k, X = {}, at = null;
      if (w != null)
        for (k in w.key !== void 0 && (at = "" + w.key), w)
          dt.call(w, k) && k !== "key" && k !== "__self" && k !== "__source" && (X[k] = w[k]);
      var ft = arguments.length - 2;
      if (ft === 1) X.children = W;
      else if (1 < ft) {
        for (var Ct = Array(ft), vt = 0; vt < ft; vt++)
          Ct[vt] = arguments[vt + 2];
        X.children = Ct;
      }
      if (S && S.defaultProps)
        for (k in ft = S.defaultProps, ft)
          X[k] === void 0 && (X[k] = ft[k]);
      return Ot(S, at, void 0, void 0, null, X);
    }, rt.createRef = function() {
      return { current: null };
    }, rt.forwardRef = function(S) {
      return { $$typeof: m, render: S };
    }, rt.isValidElement = C, rt.lazy = function(S) {
      return {
        $$typeof: p,
        _payload: { _status: -1, _result: S },
        _init: Y
      };
    }, rt.memo = function(S, w) {
      return {
        $$typeof: h,
        type: S,
        compare: w === void 0 ? null : w
      };
    }, rt.startTransition = function(S) {
      var w = Z.T, W = {};
      Z.T = W;
      try {
        var k = S(), X = Z.S;
        X !== null && X(W, k), typeof k == "object" && k !== null && typeof k.then == "function" && k.then(ut, B);
      } catch (at) {
        B(at);
      } finally {
        Z.T = w;
      }
    }, rt.unstable_useCacheRefresh = function() {
      return Z.H.useCacheRefresh();
    }, rt.use = function(S) {
      return Z.H.use(S);
    }, rt.useActionState = function(S, w, W) {
      return Z.H.useActionState(S, w, W);
    }, rt.useCallback = function(S, w) {
      return Z.H.useCallback(S, w);
    }, rt.useContext = function(S) {
      return Z.H.useContext(S);
    }, rt.useDebugValue = function() {
    }, rt.useDeferredValue = function(S, w) {
      return Z.H.useDeferredValue(S, w);
    }, rt.useEffect = function(S, w) {
      return Z.H.useEffect(S, w);
    }, rt.useId = function() {
      return Z.H.useId();
    }, rt.useImperativeHandle = function(S, w, W) {
      return Z.H.useImperativeHandle(S, w, W);
    }, rt.useInsertionEffect = function(S, w) {
      return Z.H.useInsertionEffect(S, w);
    }, rt.useLayoutEffect = function(S, w) {
      return Z.H.useLayoutEffect(S, w);
    }, rt.useMemo = function(S, w) {
      return Z.H.useMemo(S, w);
    }, rt.useOptimistic = function(S, w) {
      return Z.H.useOptimistic(S, w);
    }, rt.useReducer = function(S, w, W) {
      return Z.H.useReducer(S, w, W);
    }, rt.useRef = function(S) {
      return Z.H.useRef(S);
    }, rt.useState = function(S) {
      return Z.H.useState(S);
    }, rt.useSyncExternalStore = function(S, w, W) {
      return Z.H.useSyncExternalStore(
        S,
        w,
        W
      );
    }, rt.useTransition = function() {
      return Z.H.useTransition();
    }, rt.version = "19.0.0", rt;
  }
  var _0;
  function br() {
    return _0 || (_0 = 1, tr.exports = f1()), tr.exports;
  }
  var Ar = br();
  function xi(u, i) {
    return u == null || i == null ? NaN : u < i ? -1 : u > i ? 1 : u >= i ? 0 : NaN;
  }
  function c1(u, i) {
    return u == null || i == null ? NaN : i < u ? -1 : i > u ? 1 : i >= u ? 0 : NaN;
  }
  function F0(u) {
    let i, r, c;
    u.length !== 2 ? (i = xi, r = (m, g) => xi(u(m), g), c = (m, g) => u(m) - g) : (i = u === xi || u === c1 ? u : r1, r = u, c = u);
    function o(m, g, h = 0, p = m.length) {
      if (h < p) {
        if (i(g, g) !== 0) return p;
        do {
          const x = h + p >>> 1;
          r(m[x], g) < 0 ? h = x + 1 : p = x;
        } while (h < p);
      }
      return h;
    }
    function d(m, g, h = 0, p = m.length) {
      if (h < p) {
        if (i(g, g) !== 0) return p;
        do {
          const x = h + p >>> 1;
          r(m[x], g) <= 0 ? h = x + 1 : p = x;
        } while (h < p);
      }
      return h;
    }
    function v(m, g, h = 0, p = m.length) {
      const x = o(m, g, h, p - 1);
      return x > h && c(m[x - 1], g) > -c(m[x], g) ? x - 1 : x;
    }
    return { left: o, center: v, right: d };
  }
  function r1() {
    return 0;
  }
  function s1(u) {
    return u === null ? NaN : +u;
  }
  const o1 = F0(xi), h1 = o1.right;
  F0(s1).center;
  class rr extends Map {
    constructor(i, r = td) {
      if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), i != null) for (const [c, o] of i) this.set(c, o);
    }
    get(i) {
      return super.get(sr(this, i));
    }
    has(i) {
      return super.has(sr(this, i));
    }
    set(i, r) {
      return super.set(P0(this, i), r);
    }
    delete(i) {
      return super.delete(I0(this, i));
    }
  }
  class d1 extends Set {
    constructor(i, r = td) {
      if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), i != null) for (const c of i) this.add(c);
    }
    has(i) {
      return super.has(sr(this, i));
    }
    add(i) {
      return super.add(P0(this, i));
    }
    delete(i) {
      return super.delete(I0(this, i));
    }
  }
  function sr({ _intern: u, _key: i }, r) {
    const c = i(r);
    return u.has(c) ? u.get(c) : r;
  }
  function P0({ _intern: u, _key: i }, r) {
    const c = i(r);
    return u.has(c) ? u.get(c) : (u.set(c, r), r);
  }
  function I0({ _intern: u, _key: i }, r) {
    const c = i(r);
    return u.has(c) && (r = u.get(c), u.delete(c)), r;
  }
  function td(u) {
    return u !== null && typeof u == "object" ? u.valueOf() : u;
  }
  function p0(u) {
    return u;
  }
  function y1(u, ...i) {
    return v1(u, p0, p0, i);
  }
  function v1(u, i, r, c) {
    return function o(d, v) {
      if (v >= c.length) return r(d);
      const m = new rr(), g = c[v++];
      let h = -1;
      for (const p of d) {
        const x = g(p, ++h, d), M = m.get(x);
        M ? M.push(p) : m.set(x, [p]);
      }
      for (const [p, x] of m)
        m.set(p, o(x, v));
      return i(m);
    }(u, 0);
  }
  const m1 = Math.sqrt(50), g1 = Math.sqrt(10), _1 = Math.sqrt(2);
  function Oi(u, i, r) {
    const c = (i - u) / Math.max(0, r), o = Math.floor(Math.log10(c)), d = c / Math.pow(10, o), v = d >= m1 ? 10 : d >= g1 ? 5 : d >= _1 ? 2 : 1;
    let m, g, h;
    return o < 0 ? (h = Math.pow(10, -o) / v, m = Math.round(u * h), g = Math.round(i * h), m / h < u && ++m, g / h > i && --g, h = -h) : (h = Math.pow(10, o) * v, m = Math.round(u / h), g = Math.round(i / h), m * h < u && ++m, g * h > i && --g), g < m && 0.5 <= r && r < 2 ? Oi(u, i, r * 2) : [m, g, h];
  }
  function p1(u, i, r) {
    if (i = +i, u = +u, r = +r, !(r > 0)) return [];
    if (u === i) return [u];
    const c = i < u, [o, d, v] = c ? Oi(i, u, r) : Oi(u, i, r);
    if (!(d >= o)) return [];
    const m = d - o + 1, g = new Array(m);
    if (c)
      if (v < 0) for (let h = 0; h < m; ++h) g[h] = (d - h) / -v;
      else for (let h = 0; h < m; ++h) g[h] = (d - h) * v;
    else if (v < 0) for (let h = 0; h < m; ++h) g[h] = (o + h) / -v;
    else for (let h = 0; h < m; ++h) g[h] = (o + h) * v;
    return g;
  }
  function or(u, i, r) {
    return i = +i, u = +u, r = +r, Oi(u, i, r)[2];
  }
  function S1(u, i, r) {
    i = +i, u = +u, r = +r;
    const c = i < u, o = c ? or(i, u, r) : or(u, i, r);
    return (c ? -1 : 1) * (o < 0 ? 1 / -o : o);
  }
  function b1(u, i) {
    let r;
    if (i === void 0)
      for (const c of u)
        c != null && (r < c || r === void 0 && c >= c) && (r = c);
    else {
      let c = -1;
      for (let o of u)
        (o = i(o, ++c, u)) != null && (r < o || r === void 0 && o >= o) && (r = o);
    }
    return r;
  }
  function A1(...u) {
    const i = new d1();
    for (const r of u)
      for (const c of r)
        i.add(c);
    return i;
  }
  var E1 = { value: () => {
  } };
  function ld() {
    for (var u = 0, i = arguments.length, r = {}, c; u < i; ++u) {
      if (!(c = arguments[u] + "") || c in r || /[\s.]/.test(c)) throw new Error("illegal type: " + c);
      r[c] = [];
    }
    return new Mi(r);
  }
  function Mi(u) {
    this._ = u;
  }
  function x1(u, i) {
    return u.trim().split(/^|\s+/).map(function(r) {
      var c = "", o = r.indexOf(".");
      if (o >= 0 && (c = r.slice(o + 1), r = r.slice(0, o)), r && !i.hasOwnProperty(r)) throw new Error("unknown type: " + r);
      return { type: r, name: c };
    });
  }
  Mi.prototype = ld.prototype = {
    constructor: Mi,
    on: function(u, i) {
      var r = this._, c = x1(u + "", r), o, d = -1, v = c.length;
      if (arguments.length < 2) {
        for (; ++d < v; ) if ((o = (u = c[d]).type) && (o = M1(r[o], u.name))) return o;
        return;
      }
      if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
      for (; ++d < v; )
        if (o = (u = c[d]).type) r[o] = S0(r[o], u.name, i);
        else if (i == null) for (o in r) r[o] = S0(r[o], u.name, null);
      return this;
    },
    copy: function() {
      var u = {}, i = this._;
      for (var r in i) u[r] = i[r].slice();
      return new Mi(u);
    },
    call: function(u, i) {
      if ((o = arguments.length - 2) > 0) for (var r = new Array(o), c = 0, o, d; c < o; ++c) r[c] = arguments[c + 2];
      if (!this._.hasOwnProperty(u)) throw new Error("unknown type: " + u);
      for (d = this._[u], c = 0, o = d.length; c < o; ++c) d[c].value.apply(i, r);
    },
    apply: function(u, i, r) {
      if (!this._.hasOwnProperty(u)) throw new Error("unknown type: " + u);
      for (var c = this._[u], o = 0, d = c.length; o < d; ++o) c[o].value.apply(i, r);
    }
  };
  function M1(u, i) {
    for (var r = 0, c = u.length, o; r < c; ++r)
      if ((o = u[r]).name === i)
        return o.value;
  }
  function S0(u, i, r) {
    for (var c = 0, o = u.length; c < o; ++c)
      if (u[c].name === i) {
        u[c] = E1, u = u.slice(0, c).concat(u.slice(c + 1));
        break;
      }
    return r != null && u.push({ name: i, value: r }), u;
  }
  var hr = "http://www.w3.org/1999/xhtml";
  const b0 = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: hr,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  function Gi(u) {
    var i = u += "", r = i.indexOf(":");
    return r >= 0 && (i = u.slice(0, r)) !== "xmlns" && (u = u.slice(r + 1)), b0.hasOwnProperty(i) ? { space: b0[i], local: u } : u;
  }
  function T1(u) {
    return function() {
      var i = this.ownerDocument, r = this.namespaceURI;
      return r === hr && i.documentElement.namespaceURI === hr ? i.createElement(u) : i.createElementNS(r, u);
    };
  }
  function z1(u) {
    return function() {
      return this.ownerDocument.createElementNS(u.space, u.local);
    };
  }
  function ed(u) {
    var i = Gi(u);
    return (i.local ? z1 : T1)(i);
  }
  function O1() {
  }
  function Er(u) {
    return u == null ? O1 : function() {
      return this.querySelector(u);
    };
  }
  function D1(u) {
    typeof u != "function" && (u = Er(u));
    for (var i = this._groups, r = i.length, c = new Array(r), o = 0; o < r; ++o)
      for (var d = i[o], v = d.length, m = c[o] = new Array(v), g, h, p = 0; p < v; ++p)
        (g = d[p]) && (h = u.call(g, g.__data__, p, d)) && ("__data__" in g && (h.__data__ = g.__data__), m[p] = h);
    return new Nl(c, this._parents);
  }
  function R1(u) {
    return u == null ? [] : Array.isArray(u) ? u : Array.from(u);
  }
  function N1() {
    return [];
  }
  function nd(u) {
    return u == null ? N1 : function() {
      return this.querySelectorAll(u);
    };
  }
  function U1(u) {
    return function() {
      return R1(u.apply(this, arguments));
    };
  }
  function H1(u) {
    typeof u == "function" ? u = U1(u) : u = nd(u);
    for (var i = this._groups, r = i.length, c = [], o = [], d = 0; d < r; ++d)
      for (var v = i[d], m = v.length, g, h = 0; h < m; ++h)
        (g = v[h]) && (c.push(u.call(g, g.__data__, h, v)), o.push(g));
    return new Nl(c, o);
  }
  function ud(u) {
    return function() {
      return this.matches(u);
    };
  }
  function ad(u) {
    return function(i) {
      return i.matches(u);
    };
  }
  var w1 = Array.prototype.find;
  function q1(u) {
    return function() {
      return w1.call(this.children, u);
    };
  }
  function Y1() {
    return this.firstElementChild;
  }
  function B1(u) {
    return this.select(u == null ? Y1 : q1(typeof u == "function" ? u : ad(u)));
  }
  var C1 = Array.prototype.filter;
  function X1() {
    return Array.from(this.children);
  }
  function G1(u) {
    return function() {
      return C1.call(this.children, u);
    };
  }
  function Q1(u) {
    return this.selectAll(u == null ? X1 : G1(typeof u == "function" ? u : ad(u)));
  }
  function Z1(u) {
    typeof u != "function" && (u = ud(u));
    for (var i = this._groups, r = i.length, c = new Array(r), o = 0; o < r; ++o)
      for (var d = i[o], v = d.length, m = c[o] = [], g, h = 0; h < v; ++h)
        (g = d[h]) && u.call(g, g.__data__, h, d) && m.push(g);
    return new Nl(c, this._parents);
  }
  function id(u) {
    return new Array(u.length);
  }
  function j1() {
    return new Nl(this._enter || this._groups.map(id), this._parents);
  }
  function Di(u, i) {
    this.ownerDocument = u.ownerDocument, this.namespaceURI = u.namespaceURI, this._next = null, this._parent = u, this.__data__ = i;
  }
  Di.prototype = {
    constructor: Di,
    appendChild: function(u) {
      return this._parent.insertBefore(u, this._next);
    },
    insertBefore: function(u, i) {
      return this._parent.insertBefore(u, i);
    },
    querySelector: function(u) {
      return this._parent.querySelector(u);
    },
    querySelectorAll: function(u) {
      return this._parent.querySelectorAll(u);
    }
  };
  function V1(u) {
    return function() {
      return u;
    };
  }
  function L1(u, i, r, c, o, d) {
    for (var v = 0, m, g = i.length, h = d.length; v < h; ++v)
      (m = i[v]) ? (m.__data__ = d[v], c[v] = m) : r[v] = new Di(u, d[v]);
    for (; v < g; ++v)
      (m = i[v]) && (o[v] = m);
  }
  function K1(u, i, r, c, o, d, v) {
    var m, g, h = /* @__PURE__ */ new Map(), p = i.length, x = d.length, M = new Array(p), N;
    for (m = 0; m < p; ++m)
      (g = i[m]) && (M[m] = N = v.call(g, g.__data__, m, i) + "", h.has(N) ? o[m] = g : h.set(N, g));
    for (m = 0; m < x; ++m)
      N = v.call(u, d[m], m, d) + "", (g = h.get(N)) ? (c[m] = g, g.__data__ = d[m], h.delete(N)) : r[m] = new Di(u, d[m]);
    for (m = 0; m < p; ++m)
      (g = i[m]) && h.get(M[m]) === g && (o[m] = g);
  }
  function $1(u) {
    return u.__data__;
  }
  function J1(u, i) {
    if (!arguments.length) return Array.from(this, $1);
    var r = i ? K1 : L1, c = this._parents, o = this._groups;
    typeof u != "function" && (u = V1(u));
    for (var d = o.length, v = new Array(d), m = new Array(d), g = new Array(d), h = 0; h < d; ++h) {
      var p = c[h], x = o[h], M = x.length, N = k1(u.call(p, p && p.__data__, h, c)), Q = N.length, K = m[h] = new Array(Q), lt = v[h] = new Array(Q), I = g[h] = new Array(M);
      r(p, x, K, lt, I, N, i);
      for (var et = 0, nt = 0, F, Z; et < Q; ++et)
        if (F = K[et]) {
          for (et >= nt && (nt = et + 1); !(Z = lt[nt]) && ++nt < Q; ) ;
          F._next = Z || null;
        }
    }
    return v = new Nl(v, c), v._enter = m, v._exit = g, v;
  }
  function k1(u) {
    return typeof u == "object" && "length" in u ? u : Array.from(u);
  }
  function W1() {
    return new Nl(this._exit || this._groups.map(id), this._parents);
  }
  function F1(u, i, r) {
    var c = this.enter(), o = this, d = this.exit();
    return typeof u == "function" ? (c = u(c), c && (c = c.selection())) : c = c.append(u + ""), i != null && (o = i(o), o && (o = o.selection())), r == null ? d.remove() : r(d), c && o ? c.merge(o).order() : o;
  }
  function P1(u) {
    for (var i = u.selection ? u.selection() : u, r = this._groups, c = i._groups, o = r.length, d = c.length, v = Math.min(o, d), m = new Array(o), g = 0; g < v; ++g)
      for (var h = r[g], p = c[g], x = h.length, M = m[g] = new Array(x), N, Q = 0; Q < x; ++Q)
        (N = h[Q] || p[Q]) && (M[Q] = N);
    for (; g < o; ++g)
      m[g] = r[g];
    return new Nl(m, this._parents);
  }
  function I1() {
    for (var u = this._groups, i = -1, r = u.length; ++i < r; )
      for (var c = u[i], o = c.length - 1, d = c[o], v; --o >= 0; )
        (v = c[o]) && (d && v.compareDocumentPosition(d) ^ 4 && d.parentNode.insertBefore(v, d), d = v);
    return this;
  }
  function tm(u) {
    u || (u = lm);
    function i(x, M) {
      return x && M ? u(x.__data__, M.__data__) : !x - !M;
    }
    for (var r = this._groups, c = r.length, o = new Array(c), d = 0; d < c; ++d) {
      for (var v = r[d], m = v.length, g = o[d] = new Array(m), h, p = 0; p < m; ++p)
        (h = v[p]) && (g[p] = h);
      g.sort(i);
    }
    return new Nl(o, this._parents).order();
  }
  function lm(u, i) {
    return u < i ? -1 : u > i ? 1 : u >= i ? 0 : NaN;
  }
  function em() {
    var u = arguments[0];
    return arguments[0] = this, u.apply(null, arguments), this;
  }
  function nm() {
    return Array.from(this);
  }
  function um() {
    for (var u = this._groups, i = 0, r = u.length; i < r; ++i)
      for (var c = u[i], o = 0, d = c.length; o < d; ++o) {
        var v = c[o];
        if (v) return v;
      }
    return null;
  }
  function am() {
    let u = 0;
    for (const i of this) ++u;
    return u;
  }
  function im() {
    return !this.node();
  }
  function fm(u) {
    for (var i = this._groups, r = 0, c = i.length; r < c; ++r)
      for (var o = i[r], d = 0, v = o.length, m; d < v; ++d)
        (m = o[d]) && u.call(m, m.__data__, d, o);
    return this;
  }
  function cm(u) {
    return function() {
      this.removeAttribute(u);
    };
  }
  function rm(u) {
    return function() {
      this.removeAttributeNS(u.space, u.local);
    };
  }
  function sm(u, i) {
    return function() {
      this.setAttribute(u, i);
    };
  }
  function om(u, i) {
    return function() {
      this.setAttributeNS(u.space, u.local, i);
    };
  }
  function hm(u, i) {
    return function() {
      var r = i.apply(this, arguments);
      r == null ? this.removeAttribute(u) : this.setAttribute(u, r);
    };
  }
  function dm(u, i) {
    return function() {
      var r = i.apply(this, arguments);
      r == null ? this.removeAttributeNS(u.space, u.local) : this.setAttributeNS(u.space, u.local, r);
    };
  }
  function ym(u, i) {
    var r = Gi(u);
    if (arguments.length < 2) {
      var c = this.node();
      return r.local ? c.getAttributeNS(r.space, r.local) : c.getAttribute(r);
    }
    return this.each((i == null ? r.local ? rm : cm : typeof i == "function" ? r.local ? dm : hm : r.local ? om : sm)(r, i));
  }
  function fd(u) {
    return u.ownerDocument && u.ownerDocument.defaultView || u.document && u || u.defaultView;
  }
  function vm(u) {
    return function() {
      this.style.removeProperty(u);
    };
  }
  function mm(u, i, r) {
    return function() {
      this.style.setProperty(u, i, r);
    };
  }
  function gm(u, i, r) {
    return function() {
      var c = i.apply(this, arguments);
      c == null ? this.style.removeProperty(u) : this.style.setProperty(u, c, r);
    };
  }
  function _m(u, i, r) {
    return arguments.length > 1 ? this.each((i == null ? vm : typeof i == "function" ? gm : mm)(u, i, r ?? "")) : Kn(this.node(), u);
  }
  function Kn(u, i) {
    return u.style.getPropertyValue(i) || fd(u).getComputedStyle(u, null).getPropertyValue(i);
  }
  function pm(u) {
    return function() {
      delete this[u];
    };
  }
  function Sm(u, i) {
    return function() {
      this[u] = i;
    };
  }
  function bm(u, i) {
    return function() {
      var r = i.apply(this, arguments);
      r == null ? delete this[u] : this[u] = r;
    };
  }
  function Am(u, i) {
    return arguments.length > 1 ? this.each((i == null ? pm : typeof i == "function" ? bm : Sm)(u, i)) : this.node()[u];
  }
  function cd(u) {
    return u.trim().split(/^|\s+/);
  }
  function xr(u) {
    return u.classList || new rd(u);
  }
  function rd(u) {
    this._node = u, this._names = cd(u.getAttribute("class") || "");
  }
  rd.prototype = {
    add: function(u) {
      var i = this._names.indexOf(u);
      i < 0 && (this._names.push(u), this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function(u) {
      var i = this._names.indexOf(u);
      i >= 0 && (this._names.splice(i, 1), this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function(u) {
      return this._names.indexOf(u) >= 0;
    }
  };
  function sd(u, i) {
    for (var r = xr(u), c = -1, o = i.length; ++c < o; ) r.add(i[c]);
  }
  function od(u, i) {
    for (var r = xr(u), c = -1, o = i.length; ++c < o; ) r.remove(i[c]);
  }
  function Em(u) {
    return function() {
      sd(this, u);
    };
  }
  function xm(u) {
    return function() {
      od(this, u);
    };
  }
  function Mm(u, i) {
    return function() {
      (i.apply(this, arguments) ? sd : od)(this, u);
    };
  }
  function Tm(u, i) {
    var r = cd(u + "");
    if (arguments.length < 2) {
      for (var c = xr(this.node()), o = -1, d = r.length; ++o < d; ) if (!c.contains(r[o])) return !1;
      return !0;
    }
    return this.each((typeof i == "function" ? Mm : i ? Em : xm)(r, i));
  }
  function zm() {
    this.textContent = "";
  }
  function Om(u) {
    return function() {
      this.textContent = u;
    };
  }
  function Dm(u) {
    return function() {
      var i = u.apply(this, arguments);
      this.textContent = i ?? "";
    };
  }
  function Rm(u) {
    return arguments.length ? this.each(u == null ? zm : (typeof u == "function" ? Dm : Om)(u)) : this.node().textContent;
  }
  function Nm() {
    this.innerHTML = "";
  }
  function Um(u) {
    return function() {
      this.innerHTML = u;
    };
  }
  function Hm(u) {
    return function() {
      var i = u.apply(this, arguments);
      this.innerHTML = i ?? "";
    };
  }
  function wm(u) {
    return arguments.length ? this.each(u == null ? Nm : (typeof u == "function" ? Hm : Um)(u)) : this.node().innerHTML;
  }
  function qm() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function Ym() {
    return this.each(qm);
  }
  function Bm() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function Cm() {
    return this.each(Bm);
  }
  function Xm(u) {
    var i = typeof u == "function" ? u : ed(u);
    return this.select(function() {
      return this.appendChild(i.apply(this, arguments));
    });
  }
  function Gm() {
    return null;
  }
  function Qm(u, i) {
    var r = typeof u == "function" ? u : ed(u), c = i == null ? Gm : typeof i == "function" ? i : Er(i);
    return this.select(function() {
      return this.insertBefore(r.apply(this, arguments), c.apply(this, arguments) || null);
    });
  }
  function Zm() {
    var u = this.parentNode;
    u && u.removeChild(this);
  }
  function jm() {
    return this.each(Zm);
  }
  function Vm() {
    var u = this.cloneNode(!1), i = this.parentNode;
    return i ? i.insertBefore(u, this.nextSibling) : u;
  }
  function Lm() {
    var u = this.cloneNode(!0), i = this.parentNode;
    return i ? i.insertBefore(u, this.nextSibling) : u;
  }
  function Km(u) {
    return this.select(u ? Lm : Vm);
  }
  function $m(u) {
    return arguments.length ? this.property("__data__", u) : this.node().__data__;
  }
  function Jm(u) {
    return function(i) {
      u.call(this, i, this.__data__);
    };
  }
  function km(u) {
    return u.trim().split(/^|\s+/).map(function(i) {
      var r = "", c = i.indexOf(".");
      return c >= 0 && (r = i.slice(c + 1), i = i.slice(0, c)), { type: i, name: r };
    });
  }
  function Wm(u) {
    return function() {
      var i = this.__on;
      if (i) {
        for (var r = 0, c = -1, o = i.length, d; r < o; ++r)
          d = i[r], (!u.type || d.type === u.type) && d.name === u.name ? this.removeEventListener(d.type, d.listener, d.options) : i[++c] = d;
        ++c ? i.length = c : delete this.__on;
      }
    };
  }
  function Fm(u, i, r) {
    return function() {
      var c = this.__on, o, d = Jm(i);
      if (c) {
        for (var v = 0, m = c.length; v < m; ++v)
          if ((o = c[v]).type === u.type && o.name === u.name) {
            this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = d, o.options = r), o.value = i;
            return;
          }
      }
      this.addEventListener(u.type, d, r), o = { type: u.type, name: u.name, value: i, listener: d, options: r }, c ? c.push(o) : this.__on = [o];
    };
  }
  function Pm(u, i, r) {
    var c = km(u + ""), o, d = c.length, v;
    if (arguments.length < 2) {
      var m = this.node().__on;
      if (m) {
        for (var g = 0, h = m.length, p; g < h; ++g)
          for (o = 0, p = m[g]; o < d; ++o)
            if ((v = c[o]).type === p.type && v.name === p.name)
              return p.value;
      }
      return;
    }
    for (m = i ? Fm : Wm, o = 0; o < d; ++o) this.each(m(c[o], i, r));
    return this;
  }
  function hd(u, i, r) {
    var c = fd(u), o = c.CustomEvent;
    typeof o == "function" ? o = new o(i, r) : (o = c.document.createEvent("Event"), r ? (o.initEvent(i, r.bubbles, r.cancelable), o.detail = r.detail) : o.initEvent(i, !1, !1)), u.dispatchEvent(o);
  }
  function Im(u, i) {
    return function() {
      return hd(this, u, i);
    };
  }
  function tg(u, i) {
    return function() {
      return hd(this, u, i.apply(this, arguments));
    };
  }
  function lg(u, i) {
    return this.each((typeof i == "function" ? tg : Im)(u, i));
  }
  function* eg() {
    for (var u = this._groups, i = 0, r = u.length; i < r; ++i)
      for (var c = u[i], o = 0, d = c.length, v; o < d; ++o)
        (v = c[o]) && (yield v);
  }
  var ng = [null];
  function Nl(u, i) {
    this._groups = u, this._parents = i;
  }
  function ea() {
    return new Nl([[document.documentElement]], ng);
  }
  function ug() {
    return this;
  }
  Nl.prototype = ea.prototype = {
    constructor: Nl,
    select: D1,
    selectAll: H1,
    selectChild: B1,
    selectChildren: Q1,
    filter: Z1,
    data: J1,
    enter: j1,
    exit: W1,
    join: F1,
    merge: P1,
    selection: ug,
    order: I1,
    sort: tm,
    call: em,
    nodes: nm,
    node: um,
    size: am,
    empty: im,
    each: fm,
    attr: ym,
    style: _m,
    property: Am,
    classed: Tm,
    text: Rm,
    html: wm,
    raise: Ym,
    lower: Cm,
    append: Xm,
    insert: Qm,
    remove: jm,
    clone: Km,
    datum: $m,
    on: Pm,
    dispatch: lg,
    [Symbol.iterator]: eg
  };
  function Mr(u, i, r) {
    u.prototype = i.prototype = r, r.constructor = u;
  }
  function dd(u, i) {
    var r = Object.create(u.prototype);
    for (var c in i) r[c] = i[c];
    return r;
  }
  function na() {
  }
  var Pu = 0.7, Ri = 1 / Pu, Ln = "\\s*([+-]?\\d+)\\s*", Iu = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Gl = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ag = /^#([0-9a-f]{3,8})$/, ig = new RegExp(`^rgb\\(${Ln},${Ln},${Ln}\\)$`), fg = new RegExp(`^rgb\\(${Gl},${Gl},${Gl}\\)$`), cg = new RegExp(`^rgba\\(${Ln},${Ln},${Ln},${Iu}\\)$`), rg = new RegExp(`^rgba\\(${Gl},${Gl},${Gl},${Iu}\\)$`), sg = new RegExp(`^hsl\\(${Iu},${Gl},${Gl}\\)$`), og = new RegExp(`^hsla\\(${Iu},${Gl},${Gl},${Iu}\\)$`), A0 = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  Mr(na, un, {
    copy(u) {
      return Object.assign(new this.constructor(), this, u);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: E0,
    // Deprecated! Use color.formatHex.
    formatHex: E0,
    formatHex8: hg,
    formatHsl: dg,
    formatRgb: x0,
    toString: x0
  });
  function E0() {
    return this.rgb().formatHex();
  }
  function hg() {
    return this.rgb().formatHex8();
  }
  function dg() {
    return yd(this).formatHsl();
  }
  function x0() {
    return this.rgb().formatRgb();
  }
  function un(u) {
    var i, r;
    return u = (u + "").trim().toLowerCase(), (i = ag.exec(u)) ? (r = i[1].length, i = parseInt(i[1], 16), r === 6 ? M0(i) : r === 3 ? new ul(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : r === 8 ? _i(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : r === 4 ? _i(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = ig.exec(u)) ? new ul(i[1], i[2], i[3], 1) : (i = fg.exec(u)) ? new ul(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = cg.exec(u)) ? _i(i[1], i[2], i[3], i[4]) : (i = rg.exec(u)) ? _i(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = sg.exec(u)) ? O0(i[1], i[2] / 100, i[3] / 100, 1) : (i = og.exec(u)) ? O0(i[1], i[2] / 100, i[3] / 100, i[4]) : A0.hasOwnProperty(u) ? M0(A0[u]) : u === "transparent" ? new ul(NaN, NaN, NaN, 0) : null;
  }
  function M0(u) {
    return new ul(u >> 16 & 255, u >> 8 & 255, u & 255, 1);
  }
  function _i(u, i, r, c) {
    return c <= 0 && (u = i = r = NaN), new ul(u, i, r, c);
  }
  function yg(u) {
    return u instanceof na || (u = un(u)), u ? (u = u.rgb(), new ul(u.r, u.g, u.b, u.opacity)) : new ul();
  }
  function Ni(u, i, r, c) {
    return arguments.length === 1 ? yg(u) : new ul(u, i, r, c ?? 1);
  }
  function ul(u, i, r, c) {
    this.r = +u, this.g = +i, this.b = +r, this.opacity = +c;
  }
  Mr(ul, Ni, dd(na, {
    brighter(u) {
      return u = u == null ? Ri : Math.pow(Ri, u), new ul(this.r * u, this.g * u, this.b * u, this.opacity);
    },
    darker(u) {
      return u = u == null ? Pu : Math.pow(Pu, u), new ul(this.r * u, this.g * u, this.b * u, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new ul(nn(this.r), nn(this.g), nn(this.b), Ui(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: T0,
    // Deprecated! Use color.formatHex.
    formatHex: T0,
    formatHex8: vg,
    formatRgb: z0,
    toString: z0
  }));
  function T0() {
    return `#${en(this.r)}${en(this.g)}${en(this.b)}`;
  }
  function vg() {
    return `#${en(this.r)}${en(this.g)}${en(this.b)}${en((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function z0() {
    const u = Ui(this.opacity);
    return `${u === 1 ? "rgb(" : "rgba("}${nn(this.r)}, ${nn(this.g)}, ${nn(this.b)}${u === 1 ? ")" : `, ${u})`}`;
  }
  function Ui(u) {
    return isNaN(u) ? 1 : Math.max(0, Math.min(1, u));
  }
  function nn(u) {
    return Math.max(0, Math.min(255, Math.round(u) || 0));
  }
  function en(u) {
    return u = nn(u), (u < 16 ? "0" : "") + u.toString(16);
  }
  function O0(u, i, r, c) {
    return c <= 0 ? u = i = r = NaN : r <= 0 || r >= 1 ? u = i = NaN : i <= 0 && (u = NaN), new Rl(u, i, r, c);
  }
  function yd(u) {
    if (u instanceof Rl) return new Rl(u.h, u.s, u.l, u.opacity);
    if (u instanceof na || (u = un(u)), !u) return new Rl();
    if (u instanceof Rl) return u;
    u = u.rgb();
    var i = u.r / 255, r = u.g / 255, c = u.b / 255, o = Math.min(i, r, c), d = Math.max(i, r, c), v = NaN, m = d - o, g = (d + o) / 2;
    return m ? (i === d ? v = (r - c) / m + (r < c) * 6 : r === d ? v = (c - i) / m + 2 : v = (i - r) / m + 4, m /= g < 0.5 ? d + o : 2 - d - o, v *= 60) : m = g > 0 && g < 1 ? 0 : v, new Rl(v, m, g, u.opacity);
  }
  function mg(u, i, r, c) {
    return arguments.length === 1 ? yd(u) : new Rl(u, i, r, c ?? 1);
  }
  function Rl(u, i, r, c) {
    this.h = +u, this.s = +i, this.l = +r, this.opacity = +c;
  }
  Mr(Rl, mg, dd(na, {
    brighter(u) {
      return u = u == null ? Ri : Math.pow(Ri, u), new Rl(this.h, this.s, this.l * u, this.opacity);
    },
    darker(u) {
      return u = u == null ? Pu : Math.pow(Pu, u), new Rl(this.h, this.s, this.l * u, this.opacity);
    },
    rgb() {
      var u = this.h % 360 + (this.h < 0) * 360, i = isNaN(u) || isNaN(this.s) ? 0 : this.s, r = this.l, c = r + (r < 0.5 ? r : 1 - r) * i, o = 2 * r - c;
      return new ul(
        lr(u >= 240 ? u - 240 : u + 120, o, c),
        lr(u, o, c),
        lr(u < 120 ? u + 240 : u - 120, o, c),
        this.opacity
      );
    },
    clamp() {
      return new Rl(D0(this.h), pi(this.s), pi(this.l), Ui(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl() {
      const u = Ui(this.opacity);
      return `${u === 1 ? "hsl(" : "hsla("}${D0(this.h)}, ${pi(this.s) * 100}%, ${pi(this.l) * 100}%${u === 1 ? ")" : `, ${u})`}`;
    }
  }));
  function D0(u) {
    return u = (u || 0) % 360, u < 0 ? u + 360 : u;
  }
  function pi(u) {
    return Math.max(0, Math.min(1, u || 0));
  }
  function lr(u, i, r) {
    return (u < 60 ? i + (r - i) * u / 60 : u < 180 ? r : u < 240 ? i + (r - i) * (240 - u) / 60 : i) * 255;
  }
  function gg(u, i, r, c, o) {
    var d = u * u, v = d * u;
    return ((1 - 3 * u + 3 * d - v) * i + (4 - 6 * d + 3 * v) * r + (1 + 3 * u + 3 * d - 3 * v) * c + v * o) / 6;
  }
  function _g(u) {
    var i = u.length - 1;
    return function(r) {
      var c = r <= 0 ? r = 0 : r >= 1 ? (r = 1, i - 1) : Math.floor(r * i), o = u[c], d = u[c + 1], v = c > 0 ? u[c - 1] : 2 * o - d, m = c < i - 1 ? u[c + 2] : 2 * d - o;
      return gg((r - c / i) * i, v, o, d, m);
    };
  }
  const Tr = (u) => () => u;
  function pg(u, i) {
    return function(r) {
      return u + r * i;
    };
  }
  function Sg(u, i, r) {
    return u = Math.pow(u, r), i = Math.pow(i, r) - u, r = 1 / r, function(c) {
      return Math.pow(u + c * i, r);
    };
  }
  function bg(u) {
    return (u = +u) == 1 ? vd : function(i, r) {
      return r - i ? Sg(i, r, u) : Tr(isNaN(i) ? r : i);
    };
  }
  function vd(u, i) {
    var r = i - u;
    return r ? pg(u, r) : Tr(isNaN(u) ? i : u);
  }
  const Hi = function u(i) {
    var r = bg(i);
    function c(o, d) {
      var v = r((o = Ni(o)).r, (d = Ni(d)).r), m = r(o.g, d.g), g = r(o.b, d.b), h = vd(o.opacity, d.opacity);
      return function(p) {
        return o.r = v(p), o.g = m(p), o.b = g(p), o.opacity = h(p), o + "";
      };
    }
    return c.gamma = u, c;
  }(1);
  function Ag(u) {
    return function(i) {
      var r = i.length, c = new Array(r), o = new Array(r), d = new Array(r), v, m;
      for (v = 0; v < r; ++v)
        m = Ni(i[v]), c[v] = m.r || 0, o[v] = m.g || 0, d[v] = m.b || 0;
      return c = u(c), o = u(o), d = u(d), m.opacity = 1, function(g) {
        return m.r = c(g), m.g = o(g), m.b = d(g), m + "";
      };
    };
  }
  var Eg = Ag(_g);
  function xg(u, i) {
    i || (i = []);
    var r = u ? Math.min(i.length, u.length) : 0, c = i.slice(), o;
    return function(d) {
      for (o = 0; o < r; ++o) c[o] = u[o] * (1 - d) + i[o] * d;
      return c;
    };
  }
  function Mg(u) {
    return ArrayBuffer.isView(u) && !(u instanceof DataView);
  }
  function Tg(u, i) {
    var r = i ? i.length : 0, c = u ? Math.min(r, u.length) : 0, o = new Array(c), d = new Array(r), v;
    for (v = 0; v < c; ++v) o[v] = zr(u[v], i[v]);
    for (; v < r; ++v) d[v] = i[v];
    return function(m) {
      for (v = 0; v < c; ++v) d[v] = o[v](m);
      return d;
    };
  }
  function zg(u, i) {
    var r = /* @__PURE__ */ new Date();
    return u = +u, i = +i, function(c) {
      return r.setTime(u * (1 - c) + i * c), r;
    };
  }
  function Dl(u, i) {
    return u = +u, i = +i, function(r) {
      return u * (1 - r) + i * r;
    };
  }
  function Og(u, i) {
    var r = {}, c = {}, o;
    (u === null || typeof u != "object") && (u = {}), (i === null || typeof i != "object") && (i = {});
    for (o in i)
      o in u ? r[o] = zr(u[o], i[o]) : c[o] = i[o];
    return function(d) {
      for (o in r) c[o] = r[o](d);
      return c;
    };
  }
  var dr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, er = new RegExp(dr.source, "g");
  function Dg(u) {
    return function() {
      return u;
    };
  }
  function Rg(u) {
    return function(i) {
      return u(i) + "";
    };
  }
  function md(u, i) {
    var r = dr.lastIndex = er.lastIndex = 0, c, o, d, v = -1, m = [], g = [];
    for (u = u + "", i = i + ""; (c = dr.exec(u)) && (o = er.exec(i)); )
      (d = o.index) > r && (d = i.slice(r, d), m[v] ? m[v] += d : m[++v] = d), (c = c[0]) === (o = o[0]) ? m[v] ? m[v] += o : m[++v] = o : (m[++v] = null, g.push({ i: v, x: Dl(c, o) })), r = er.lastIndex;
    return r < i.length && (d = i.slice(r), m[v] ? m[v] += d : m[++v] = d), m.length < 2 ? g[0] ? Rg(g[0].x) : Dg(i) : (i = g.length, function(h) {
      for (var p = 0, x; p < i; ++p) m[(x = g[p]).i] = x.x(h);
      return m.join("");
    });
  }
  function zr(u, i) {
    var r = typeof i, c;
    return i == null || r === "boolean" ? Tr(i) : (r === "number" ? Dl : r === "string" ? (c = un(i)) ? (i = c, Hi) : md : i instanceof un ? Hi : i instanceof Date ? zg : Mg(i) ? xg : Array.isArray(i) ? Tg : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? Og : Dl)(u, i);
  }
  function Ng(u, i) {
    return u = +u, i = +i, function(r) {
      return Math.round(u * (1 - r) + i * r);
    };
  }
  var R0 = 180 / Math.PI, yr = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function gd(u, i, r, c, o, d) {
    var v, m, g;
    return (v = Math.sqrt(u * u + i * i)) && (u /= v, i /= v), (g = u * r + i * c) && (r -= u * g, c -= i * g), (m = Math.sqrt(r * r + c * c)) && (r /= m, c /= m, g /= m), u * c < i * r && (u = -u, i = -i, g = -g, v = -v), {
      translateX: o,
      translateY: d,
      rotate: Math.atan2(i, u) * R0,
      skewX: Math.atan(g) * R0,
      scaleX: v,
      scaleY: m
    };
  }
  var Si;
  function Ug(u) {
    const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(u + "");
    return i.isIdentity ? yr : gd(i.a, i.b, i.c, i.d, i.e, i.f);
  }
  function Hg(u) {
    return u == null || (Si || (Si = document.createElementNS("http://www.w3.org/2000/svg", "g")), Si.setAttribute("transform", u), !(u = Si.transform.baseVal.consolidate())) ? yr : (u = u.matrix, gd(u.a, u.b, u.c, u.d, u.e, u.f));
  }
  function _d(u, i, r, c) {
    function o(h) {
      return h.length ? h.pop() + " " : "";
    }
    function d(h, p, x, M, N, Q) {
      if (h !== x || p !== M) {
        var K = N.push("translate(", null, i, null, r);
        Q.push({ i: K - 4, x: Dl(h, x) }, { i: K - 2, x: Dl(p, M) });
      } else (x || M) && N.push("translate(" + x + i + M + r);
    }
    function v(h, p, x, M) {
      h !== p ? (h - p > 180 ? p += 360 : p - h > 180 && (h += 360), M.push({ i: x.push(o(x) + "rotate(", null, c) - 2, x: Dl(h, p) })) : p && x.push(o(x) + "rotate(" + p + c);
    }
    function m(h, p, x, M) {
      h !== p ? M.push({ i: x.push(o(x) + "skewX(", null, c) - 2, x: Dl(h, p) }) : p && x.push(o(x) + "skewX(" + p + c);
    }
    function g(h, p, x, M, N, Q) {
      if (h !== x || p !== M) {
        var K = N.push(o(N) + "scale(", null, ",", null, ")");
        Q.push({ i: K - 4, x: Dl(h, x) }, { i: K - 2, x: Dl(p, M) });
      } else (x !== 1 || M !== 1) && N.push(o(N) + "scale(" + x + "," + M + ")");
    }
    return function(h, p) {
      var x = [], M = [];
      return h = u(h), p = u(p), d(h.translateX, h.translateY, p.translateX, p.translateY, x, M), v(h.rotate, p.rotate, x, M), m(h.skewX, p.skewX, x, M), g(h.scaleX, h.scaleY, p.scaleX, p.scaleY, x, M), h = p = null, function(N) {
        for (var Q = -1, K = M.length, lt; ++Q < K; ) x[(lt = M[Q]).i] = lt.x(N);
        return x.join("");
      };
    };
  }
  var wg = _d(Ug, "px, ", "px)", "deg)"), qg = _d(Hg, ", ", ")", ")"), $n = 0, ku = 0, $u = 0, pd = 1e3, wi, Wu, qi = 0, an = 0, Qi = 0, ta = typeof performance == "object" && performance.now ? performance : Date, Sd = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(u) {
    setTimeout(u, 17);
  };
  function Or() {
    return an || (Sd(Yg), an = ta.now() + Qi);
  }
  function Yg() {
    an = 0;
  }
  function Yi() {
    this._call = this._time = this._next = null;
  }
  Yi.prototype = bd.prototype = {
    constructor: Yi,
    restart: function(u, i, r) {
      if (typeof u != "function") throw new TypeError("callback is not a function");
      r = (r == null ? Or() : +r) + (i == null ? 0 : +i), !this._next && Wu !== this && (Wu ? Wu._next = this : wi = this, Wu = this), this._call = u, this._time = r, vr();
    },
    stop: function() {
      this._call && (this._call = null, this._time = 1 / 0, vr());
    }
  };
  function bd(u, i, r) {
    var c = new Yi();
    return c.restart(u, i, r), c;
  }
  function Bg() {
    Or(), ++$n;
    for (var u = wi, i; u; )
      (i = an - u._time) >= 0 && u._call.call(void 0, i), u = u._next;
    --$n;
  }
  function N0() {
    an = (qi = ta.now()) + Qi, $n = ku = 0;
    try {
      Bg();
    } finally {
      $n = 0, Xg(), an = 0;
    }
  }
  function Cg() {
    var u = ta.now(), i = u - qi;
    i > pd && (Qi -= i, qi = u);
  }
  function Xg() {
    for (var u, i = wi, r, c = 1 / 0; i; )
      i._call ? (c > i._time && (c = i._time), u = i, i = i._next) : (r = i._next, i._next = null, i = u ? u._next = r : wi = r);
    Wu = u, vr(c);
  }
  function vr(u) {
    if (!$n) {
      ku && (ku = clearTimeout(ku));
      var i = u - an;
      i > 24 ? (u < 1 / 0 && (ku = setTimeout(N0, u - ta.now() - Qi)), $u && ($u = clearInterval($u))) : ($u || (qi = ta.now(), $u = setInterval(Cg, pd)), $n = 1, Sd(N0));
    }
  }
  function U0(u, i, r) {
    var c = new Yi();
    return i = i == null ? 0 : +i, c.restart((o) => {
      c.stop(), u(o + i);
    }, i, r), c;
  }
  var Gg = ld("start", "end", "cancel", "interrupt"), Qg = [], Ad = 0, H0 = 1, mr = 2, Ti = 3, w0 = 4, gr = 5, zi = 6;
  function Zi(u, i, r, c, o, d) {
    var v = u.__transition;
    if (!v) u.__transition = {};
    else if (r in v) return;
    Zg(u, r, {
      name: i,
      index: c,
      // For context during callback.
      group: o,
      // For context during callback.
      on: Gg,
      tween: Qg,
      time: d.time,
      delay: d.delay,
      duration: d.duration,
      ease: d.ease,
      timer: null,
      state: Ad
    });
  }
  function Dr(u, i) {
    var r = Ul(u, i);
    if (r.state > Ad) throw new Error("too late; already scheduled");
    return r;
  }
  function Ql(u, i) {
    var r = Ul(u, i);
    if (r.state > Ti) throw new Error("too late; already running");
    return r;
  }
  function Ul(u, i) {
    var r = u.__transition;
    if (!r || !(r = r[i])) throw new Error("transition not found");
    return r;
  }
  function Zg(u, i, r) {
    var c = u.__transition, o;
    c[i] = r, r.timer = bd(d, 0, r.time);
    function d(h) {
      r.state = H0, r.timer.restart(v, r.delay, r.time), r.delay <= h && v(h - r.delay);
    }
    function v(h) {
      var p, x, M, N;
      if (r.state !== H0) return g();
      for (p in c)
        if (N = c[p], N.name === r.name) {
          if (N.state === Ti) return U0(v);
          N.state === w0 ? (N.state = zi, N.timer.stop(), N.on.call("interrupt", u, u.__data__, N.index, N.group), delete c[p]) : +p < i && (N.state = zi, N.timer.stop(), N.on.call("cancel", u, u.__data__, N.index, N.group), delete c[p]);
        }
      if (U0(function() {
        r.state === Ti && (r.state = w0, r.timer.restart(m, r.delay, r.time), m(h));
      }), r.state = mr, r.on.call("start", u, u.__data__, r.index, r.group), r.state === mr) {
        for (r.state = Ti, o = new Array(M = r.tween.length), p = 0, x = -1; p < M; ++p)
          (N = r.tween[p].value.call(u, u.__data__, r.index, r.group)) && (o[++x] = N);
        o.length = x + 1;
      }
    }
    function m(h) {
      for (var p = h < r.duration ? r.ease.call(null, h / r.duration) : (r.timer.restart(g), r.state = gr, 1), x = -1, M = o.length; ++x < M; )
        o[x].call(u, p);
      r.state === gr && (r.on.call("end", u, u.__data__, r.index, r.group), g());
    }
    function g() {
      r.state = zi, r.timer.stop(), delete c[i];
      for (var h in c) return;
      delete u.__transition;
    }
  }
  function jg(u, i) {
    var r = u.__transition, c, o, d = !0, v;
    if (r) {
      i = i == null ? null : i + "";
      for (v in r) {
        if ((c = r[v]).name !== i) {
          d = !1;
          continue;
        }
        o = c.state > mr && c.state < gr, c.state = zi, c.timer.stop(), c.on.call(o ? "interrupt" : "cancel", u, u.__data__, c.index, c.group), delete r[v];
      }
      d && delete u.__transition;
    }
  }
  function Vg(u) {
    return this.each(function() {
      jg(this, u);
    });
  }
  function Lg(u, i) {
    var r, c;
    return function() {
      var o = Ql(this, u), d = o.tween;
      if (d !== r) {
        c = r = d;
        for (var v = 0, m = c.length; v < m; ++v)
          if (c[v].name === i) {
            c = c.slice(), c.splice(v, 1);
            break;
          }
      }
      o.tween = c;
    };
  }
  function Kg(u, i, r) {
    var c, o;
    if (typeof r != "function") throw new Error();
    return function() {
      var d = Ql(this, u), v = d.tween;
      if (v !== c) {
        o = (c = v).slice();
        for (var m = { name: i, value: r }, g = 0, h = o.length; g < h; ++g)
          if (o[g].name === i) {
            o[g] = m;
            break;
          }
        g === h && o.push(m);
      }
      d.tween = o;
    };
  }
  function $g(u, i) {
    var r = this._id;
    if (u += "", arguments.length < 2) {
      for (var c = Ul(this.node(), r).tween, o = 0, d = c.length, v; o < d; ++o)
        if ((v = c[o]).name === u)
          return v.value;
      return null;
    }
    return this.each((i == null ? Lg : Kg)(r, u, i));
  }
  function Rr(u, i, r) {
    var c = u._id;
    return u.each(function() {
      var o = Ql(this, c);
      (o.value || (o.value = {}))[i] = r.apply(this, arguments);
    }), function(o) {
      return Ul(o, c).value[i];
    };
  }
  function Ed(u, i) {
    var r;
    return (typeof i == "number" ? Dl : i instanceof un ? Hi : (r = un(i)) ? (i = r, Hi) : md)(u, i);
  }
  function Jg(u) {
    return function() {
      this.removeAttribute(u);
    };
  }
  function kg(u) {
    return function() {
      this.removeAttributeNS(u.space, u.local);
    };
  }
  function Wg(u, i, r) {
    var c, o = r + "", d;
    return function() {
      var v = this.getAttribute(u);
      return v === o ? null : v === c ? d : d = i(c = v, r);
    };
  }
  function Fg(u, i, r) {
    var c, o = r + "", d;
    return function() {
      var v = this.getAttributeNS(u.space, u.local);
      return v === o ? null : v === c ? d : d = i(c = v, r);
    };
  }
  function Pg(u, i, r) {
    var c, o, d;
    return function() {
      var v, m = r(this), g;
      return m == null ? void this.removeAttribute(u) : (v = this.getAttribute(u), g = m + "", v === g ? null : v === c && g === o ? d : (o = g, d = i(c = v, m)));
    };
  }
  function Ig(u, i, r) {
    var c, o, d;
    return function() {
      var v, m = r(this), g;
      return m == null ? void this.removeAttributeNS(u.space, u.local) : (v = this.getAttributeNS(u.space, u.local), g = m + "", v === g ? null : v === c && g === o ? d : (o = g, d = i(c = v, m)));
    };
  }
  function t2(u, i) {
    var r = Gi(u), c = r === "transform" ? qg : Ed;
    return this.attrTween(u, typeof i == "function" ? (r.local ? Ig : Pg)(r, c, Rr(this, "attr." + u, i)) : i == null ? (r.local ? kg : Jg)(r) : (r.local ? Fg : Wg)(r, c, i));
  }
  function l2(u, i) {
    return function(r) {
      this.setAttribute(u, i.call(this, r));
    };
  }
  function e2(u, i) {
    return function(r) {
      this.setAttributeNS(u.space, u.local, i.call(this, r));
    };
  }
  function n2(u, i) {
    var r, c;
    function o() {
      var d = i.apply(this, arguments);
      return d !== c && (r = (c = d) && e2(u, d)), r;
    }
    return o._value = i, o;
  }
  function u2(u, i) {
    var r, c;
    function o() {
      var d = i.apply(this, arguments);
      return d !== c && (r = (c = d) && l2(u, d)), r;
    }
    return o._value = i, o;
  }
  function a2(u, i) {
    var r = "attr." + u;
    if (arguments.length < 2) return (r = this.tween(r)) && r._value;
    if (i == null) return this.tween(r, null);
    if (typeof i != "function") throw new Error();
    var c = Gi(u);
    return this.tween(r, (c.local ? n2 : u2)(c, i));
  }
  function i2(u, i) {
    return function() {
      Dr(this, u).delay = +i.apply(this, arguments);
    };
  }
  function f2(u, i) {
    return i = +i, function() {
      Dr(this, u).delay = i;
    };
  }
  function c2(u) {
    var i = this._id;
    return arguments.length ? this.each((typeof u == "function" ? i2 : f2)(i, u)) : Ul(this.node(), i).delay;
  }
  function r2(u, i) {
    return function() {
      Ql(this, u).duration = +i.apply(this, arguments);
    };
  }
  function s2(u, i) {
    return i = +i, function() {
      Ql(this, u).duration = i;
    };
  }
  function o2(u) {
    var i = this._id;
    return arguments.length ? this.each((typeof u == "function" ? r2 : s2)(i, u)) : Ul(this.node(), i).duration;
  }
  function h2(u, i) {
    if (typeof i != "function") throw new Error();
    return function() {
      Ql(this, u).ease = i;
    };
  }
  function d2(u) {
    var i = this._id;
    return arguments.length ? this.each(h2(i, u)) : Ul(this.node(), i).ease;
  }
  function y2(u, i) {
    return function() {
      var r = i.apply(this, arguments);
      if (typeof r != "function") throw new Error();
      Ql(this, u).ease = r;
    };
  }
  function v2(u) {
    if (typeof u != "function") throw new Error();
    return this.each(y2(this._id, u));
  }
  function m2(u) {
    typeof u != "function" && (u = ud(u));
    for (var i = this._groups, r = i.length, c = new Array(r), o = 0; o < r; ++o)
      for (var d = i[o], v = d.length, m = c[o] = [], g, h = 0; h < v; ++h)
        (g = d[h]) && u.call(g, g.__data__, h, d) && m.push(g);
    return new ie(c, this._parents, this._name, this._id);
  }
  function g2(u) {
    if (u._id !== this._id) throw new Error();
    for (var i = this._groups, r = u._groups, c = i.length, o = r.length, d = Math.min(c, o), v = new Array(c), m = 0; m < d; ++m)
      for (var g = i[m], h = r[m], p = g.length, x = v[m] = new Array(p), M, N = 0; N < p; ++N)
        (M = g[N] || h[N]) && (x[N] = M);
    for (; m < c; ++m)
      v[m] = i[m];
    return new ie(v, this._parents, this._name, this._id);
  }
  function _2(u) {
    return (u + "").trim().split(/^|\s+/).every(function(i) {
      var r = i.indexOf(".");
      return r >= 0 && (i = i.slice(0, r)), !i || i === "start";
    });
  }
  function p2(u, i, r) {
    var c, o, d = _2(i) ? Dr : Ql;
    return function() {
      var v = d(this, u), m = v.on;
      m !== c && (o = (c = m).copy()).on(i, r), v.on = o;
    };
  }
  function S2(u, i) {
    var r = this._id;
    return arguments.length < 2 ? Ul(this.node(), r).on.on(u) : this.each(p2(r, u, i));
  }
  function b2(u) {
    return function() {
      var i = this.parentNode;
      for (var r in this.__transition) if (+r !== u) return;
      i && i.removeChild(this);
    };
  }
  function A2() {
    return this.on("end.remove", b2(this._id));
  }
  function E2(u) {
    var i = this._name, r = this._id;
    typeof u != "function" && (u = Er(u));
    for (var c = this._groups, o = c.length, d = new Array(o), v = 0; v < o; ++v)
      for (var m = c[v], g = m.length, h = d[v] = new Array(g), p, x, M = 0; M < g; ++M)
        (p = m[M]) && (x = u.call(p, p.__data__, M, m)) && ("__data__" in p && (x.__data__ = p.__data__), h[M] = x, Zi(h[M], i, r, M, h, Ul(p, r)));
    return new ie(d, this._parents, i, r);
  }
  function x2(u) {
    var i = this._name, r = this._id;
    typeof u != "function" && (u = nd(u));
    for (var c = this._groups, o = c.length, d = [], v = [], m = 0; m < o; ++m)
      for (var g = c[m], h = g.length, p, x = 0; x < h; ++x)
        if (p = g[x]) {
          for (var M = u.call(p, p.__data__, x, g), N, Q = Ul(p, r), K = 0, lt = M.length; K < lt; ++K)
            (N = M[K]) && Zi(N, i, r, K, M, Q);
          d.push(M), v.push(p);
        }
    return new ie(d, v, i, r);
  }
  var M2 = ea.prototype.constructor;
  function T2() {
    return new M2(this._groups, this._parents);
  }
  function z2(u, i) {
    var r, c, o;
    return function() {
      var d = Kn(this, u), v = (this.style.removeProperty(u), Kn(this, u));
      return d === v ? null : d === r && v === c ? o : o = i(r = d, c = v);
    };
  }
  function xd(u) {
    return function() {
      this.style.removeProperty(u);
    };
  }
  function O2(u, i, r) {
    var c, o = r + "", d;
    return function() {
      var v = Kn(this, u);
      return v === o ? null : v === c ? d : d = i(c = v, r);
    };
  }
  function D2(u, i, r) {
    var c, o, d;
    return function() {
      var v = Kn(this, u), m = r(this), g = m + "";
      return m == null && (g = m = (this.style.removeProperty(u), Kn(this, u))), v === g ? null : v === c && g === o ? d : (o = g, d = i(c = v, m));
    };
  }
  function R2(u, i) {
    var r, c, o, d = "style." + i, v = "end." + d, m;
    return function() {
      var g = Ql(this, u), h = g.on, p = g.value[d] == null ? m || (m = xd(i)) : void 0;
      (h !== r || o !== p) && (c = (r = h).copy()).on(v, o = p), g.on = c;
    };
  }
  function N2(u, i, r) {
    var c = (u += "") == "transform" ? wg : Ed;
    return i == null ? this.styleTween(u, z2(u, c)).on("end.style." + u, xd(u)) : typeof i == "function" ? this.styleTween(u, D2(u, c, Rr(this, "style." + u, i))).each(R2(this._id, u)) : this.styleTween(u, O2(u, c, i), r).on("end.style." + u, null);
  }
  function U2(u, i, r) {
    return function(c) {
      this.style.setProperty(u, i.call(this, c), r);
    };
  }
  function H2(u, i, r) {
    var c, o;
    function d() {
      var v = i.apply(this, arguments);
      return v !== o && (c = (o = v) && U2(u, v, r)), c;
    }
    return d._value = i, d;
  }
  function w2(u, i, r) {
    var c = "style." + (u += "");
    if (arguments.length < 2) return (c = this.tween(c)) && c._value;
    if (i == null) return this.tween(c, null);
    if (typeof i != "function") throw new Error();
    return this.tween(c, H2(u, i, r ?? ""));
  }
  function q2(u) {
    return function() {
      this.textContent = u;
    };
  }
  function Y2(u) {
    return function() {
      var i = u(this);
      this.textContent = i ?? "";
    };
  }
  function B2(u) {
    return this.tween("text", typeof u == "function" ? Y2(Rr(this, "text", u)) : q2(u == null ? "" : u + ""));
  }
  function C2(u) {
    return function(i) {
      this.textContent = u.call(this, i);
    };
  }
  function X2(u) {
    var i, r;
    function c() {
      var o = u.apply(this, arguments);
      return o !== r && (i = (r = o) && C2(o)), i;
    }
    return c._value = u, c;
  }
  function G2(u) {
    var i = "text";
    if (arguments.length < 1) return (i = this.tween(i)) && i._value;
    if (u == null) return this.tween(i, null);
    if (typeof u != "function") throw new Error();
    return this.tween(i, X2(u));
  }
  function Q2() {
    for (var u = this._name, i = this._id, r = Md(), c = this._groups, o = c.length, d = 0; d < o; ++d)
      for (var v = c[d], m = v.length, g, h = 0; h < m; ++h)
        if (g = v[h]) {
          var p = Ul(g, i);
          Zi(g, u, r, h, v, {
            time: p.time + p.delay + p.duration,
            delay: 0,
            duration: p.duration,
            ease: p.ease
          });
        }
    return new ie(c, this._parents, u, r);
  }
  function Z2() {
    var u, i, r = this, c = r._id, o = r.size();
    return new Promise(function(d, v) {
      var m = { value: v }, g = { value: function() {
        --o === 0 && d();
      } };
      r.each(function() {
        var h = Ql(this, c), p = h.on;
        p !== u && (i = (u = p).copy(), i._.cancel.push(m), i._.interrupt.push(m), i._.end.push(g)), h.on = i;
      }), o === 0 && d();
    });
  }
  var j2 = 0;
  function ie(u, i, r, c) {
    this._groups = u, this._parents = i, this._name = r, this._id = c;
  }
  function Md() {
    return ++j2;
  }
  var ae = ea.prototype;
  ie.prototype = {
    constructor: ie,
    select: E2,
    selectAll: x2,
    selectChild: ae.selectChild,
    selectChildren: ae.selectChildren,
    filter: m2,
    merge: g2,
    selection: T2,
    transition: Q2,
    call: ae.call,
    nodes: ae.nodes,
    node: ae.node,
    size: ae.size,
    empty: ae.empty,
    each: ae.each,
    on: S2,
    attr: t2,
    attrTween: a2,
    style: N2,
    styleTween: w2,
    text: B2,
    textTween: G2,
    remove: A2,
    tween: $g,
    delay: c2,
    duration: o2,
    ease: d2,
    easeVarying: v2,
    end: Z2,
    [Symbol.iterator]: ae[Symbol.iterator]
  };
  function V2(u) {
    return ((u *= 2) <= 1 ? u * u * u : (u -= 2) * u * u + 2) / 2;
  }
  var L2 = {
    time: null,
    // Set on use.
    delay: 0,
    duration: 250,
    ease: V2
  };
  function K2(u, i) {
    for (var r; !(r = u.__transition) || !(r = r[i]); )
      if (!(u = u.parentNode))
        throw new Error(`transition ${i} not found`);
    return r;
  }
  function $2(u) {
    var i, r;
    u instanceof ie ? (i = u._id, u = u._name) : (i = Md(), (r = L2).time = Or(), u = u == null ? null : u + "");
    for (var c = this._groups, o = c.length, d = 0; d < o; ++d)
      for (var v = c[d], m = v.length, g, h = 0; h < m; ++h)
        (g = v[h]) && Zi(g, u, i, h, v, r || K2(g, i));
    return new ie(c, this._parents, u, i);
  }
  ea.prototype.interrupt = Vg;
  ea.prototype.transition = $2;
  const _r = Math.PI, pr = 2 * _r, ln = 1e-6, J2 = pr - ln;
  function Td(u) {
    this._ += u[0];
    for (let i = 1, r = u.length; i < r; ++i)
      this._ += arguments[i] + u[i];
  }
  function k2(u) {
    let i = Math.floor(u);
    if (!(i >= 0)) throw new Error(`invalid digits: ${u}`);
    if (i > 15) return Td;
    const r = 10 ** i;
    return function(c) {
      this._ += c[0];
      for (let o = 1, d = c.length; o < d; ++o)
        this._ += Math.round(arguments[o] * r) / r + c[o];
    };
  }
  class W2 {
    constructor(i) {
      this._x0 = this._y0 = // start of current subpath
      this._x1 = this._y1 = null, this._ = "", this._append = i == null ? Td : k2(i);
    }
    moveTo(i, r) {
      this._append`M${this._x0 = this._x1 = +i},${this._y0 = this._y1 = +r}`;
    }
    closePath() {
      this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
    }
    lineTo(i, r) {
      this._append`L${this._x1 = +i},${this._y1 = +r}`;
    }
    quadraticCurveTo(i, r, c, o) {
      this._append`Q${+i},${+r},${this._x1 = +c},${this._y1 = +o}`;
    }
    bezierCurveTo(i, r, c, o, d, v) {
      this._append`C${+i},${+r},${+c},${+o},${this._x1 = +d},${this._y1 = +v}`;
    }
    arcTo(i, r, c, o, d) {
      if (i = +i, r = +r, c = +c, o = +o, d = +d, d < 0) throw new Error(`negative radius: ${d}`);
      let v = this._x1, m = this._y1, g = c - i, h = o - r, p = v - i, x = m - r, M = p * p + x * x;
      if (this._x1 === null)
        this._append`M${this._x1 = i},${this._y1 = r}`;
      else if (M > ln) if (!(Math.abs(x * g - h * p) > ln) || !d)
        this._append`L${this._x1 = i},${this._y1 = r}`;
      else {
        let N = c - v, Q = o - m, K = g * g + h * h, lt = N * N + Q * Q, I = Math.sqrt(K), et = Math.sqrt(M), nt = d * Math.tan((_r - Math.acos((K + M - lt) / (2 * I * et))) / 2), F = nt / et, Z = nt / I;
        Math.abs(F - 1) > ln && this._append`L${i + F * p},${r + F * x}`, this._append`A${d},${d},0,0,${+(x * N > p * Q)},${this._x1 = i + Z * g},${this._y1 = r + Z * h}`;
      }
    }
    arc(i, r, c, o, d, v) {
      if (i = +i, r = +r, c = +c, v = !!v, c < 0) throw new Error(`negative radius: ${c}`);
      let m = c * Math.cos(o), g = c * Math.sin(o), h = i + m, p = r + g, x = 1 ^ v, M = v ? o - d : d - o;
      this._x1 === null ? this._append`M${h},${p}` : (Math.abs(this._x1 - h) > ln || Math.abs(this._y1 - p) > ln) && this._append`L${h},${p}`, c && (M < 0 && (M = M % pr + pr), M > J2 ? this._append`A${c},${c},0,1,${x},${i - m},${r - g}A${c},${c},0,1,${x},${this._x1 = h},${this._y1 = p}` : M > ln && this._append`A${c},${c},0,${+(M >= _r)},${x},${this._x1 = i + c * Math.cos(d)},${this._y1 = r + c * Math.sin(d)}`);
    }
    rect(i, r, c, o) {
      this._append`M${this._x0 = this._x1 = +i},${this._y0 = this._y1 = +r}h${c = +c}v${+o}h${-c}Z`;
    }
    toString() {
      return this._;
    }
  }
  function F2(u) {
    return Math.abs(u = Math.round(u)) >= 1e21 ? u.toLocaleString("en").replace(/,/g, "") : u.toString(10);
  }
  function Bi(u, i) {
    if ((r = (u = i ? u.toExponential(i - 1) : u.toExponential()).indexOf("e")) < 0) return null;
    var r, c = u.slice(0, r);
    return [
      c.length > 1 ? c[0] + c.slice(2) : c,
      +u.slice(r + 1)
    ];
  }
  function Jn(u) {
    return u = Bi(Math.abs(u)), u ? u[1] : NaN;
  }
  function P2(u, i) {
    return function(r, c) {
      for (var o = r.length, d = [], v = 0, m = u[0], g = 0; o > 0 && m > 0 && (g + m + 1 > c && (m = Math.max(1, c - g)), d.push(r.substring(o -= m, o + m)), !((g += m + 1) > c)); )
        m = u[v = (v + 1) % u.length];
      return d.reverse().join(i);
    };
  }
  function I2(u) {
    return function(i) {
      return i.replace(/[0-9]/g, function(r) {
        return u[+r];
      });
    };
  }
  var t_ = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function Ci(u) {
    if (!(i = t_.exec(u))) throw new Error("invalid format: " + u);
    var i;
    return new Nr({
      fill: i[1],
      align: i[2],
      sign: i[3],
      symbol: i[4],
      zero: i[5],
      width: i[6],
      comma: i[7],
      precision: i[8] && i[8].slice(1),
      trim: i[9],
      type: i[10]
    });
  }
  Ci.prototype = Nr.prototype;
  function Nr(u) {
    this.fill = u.fill === void 0 ? " " : u.fill + "", this.align = u.align === void 0 ? ">" : u.align + "", this.sign = u.sign === void 0 ? "-" : u.sign + "", this.symbol = u.symbol === void 0 ? "" : u.symbol + "", this.zero = !!u.zero, this.width = u.width === void 0 ? void 0 : +u.width, this.comma = !!u.comma, this.precision = u.precision === void 0 ? void 0 : +u.precision, this.trim = !!u.trim, this.type = u.type === void 0 ? "" : u.type + "";
  }
  Nr.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };
  function l_(u) {
    t: for (var i = u.length, r = 1, c = -1, o; r < i; ++r)
      switch (u[r]) {
        case ".":
          c = o = r;
          break;
        case "0":
          c === 0 && (c = r), o = r;
          break;
        default:
          if (!+u[r]) break t;
          c > 0 && (c = 0);
          break;
      }
    return c > 0 ? u.slice(0, c) + u.slice(o + 1) : u;
  }
  var zd;
  function e_(u, i) {
    var r = Bi(u, i);
    if (!r) return u + "";
    var c = r[0], o = r[1], d = o - (zd = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1, v = c.length;
    return d === v ? c : d > v ? c + new Array(d - v + 1).join("0") : d > 0 ? c.slice(0, d) + "." + c.slice(d) : "0." + new Array(1 - d).join("0") + Bi(u, Math.max(0, i + d - 1))[0];
  }
  function q0(u, i) {
    var r = Bi(u, i);
    if (!r) return u + "";
    var c = r[0], o = r[1];
    return o < 0 ? "0." + new Array(-o).join("0") + c : c.length > o + 1 ? c.slice(0, o + 1) + "." + c.slice(o + 1) : c + new Array(o - c.length + 2).join("0");
  }
  const Y0 = {
    "%": (u, i) => (u * 100).toFixed(i),
    b: (u) => Math.round(u).toString(2),
    c: (u) => u + "",
    d: F2,
    e: (u, i) => u.toExponential(i),
    f: (u, i) => u.toFixed(i),
    g: (u, i) => u.toPrecision(i),
    o: (u) => Math.round(u).toString(8),
    p: (u, i) => q0(u * 100, i),
    r: q0,
    s: e_,
    X: (u) => Math.round(u).toString(16).toUpperCase(),
    x: (u) => Math.round(u).toString(16)
  };
  function B0(u) {
    return u;
  }
  var C0 = Array.prototype.map, X0 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function n_(u) {
    var i = u.grouping === void 0 || u.thousands === void 0 ? B0 : P2(C0.call(u.grouping, Number), u.thousands + ""), r = u.currency === void 0 ? "" : u.currency[0] + "", c = u.currency === void 0 ? "" : u.currency[1] + "", o = u.decimal === void 0 ? "." : u.decimal + "", d = u.numerals === void 0 ? B0 : I2(C0.call(u.numerals, String)), v = u.percent === void 0 ? "%" : u.percent + "", m = u.minus === void 0 ? "−" : u.minus + "", g = u.nan === void 0 ? "NaN" : u.nan + "";
    function h(x) {
      x = Ci(x);
      var M = x.fill, N = x.align, Q = x.sign, K = x.symbol, lt = x.zero, I = x.width, et = x.comma, nt = x.precision, F = x.trim, Z = x.type;
      Z === "n" ? (et = !0, Z = "g") : Y0[Z] || (nt === void 0 && (nt = 12), F = !0, Z = "g"), (lt || M === "0" && N === "=") && (lt = !0, M = "0", N = "=");
      var dt = K === "$" ? r : K === "#" && /[boxX]/.test(Z) ? "0" + Z.toLowerCase() : "", Ot = K === "$" ? c : /[%p]/.test(Z) ? v : "", bt = Y0[Z], C = /[defgprs%]/.test(Z);
      nt = nt === void 0 ? 6 : /[gprs]/.test(Z) ? Math.max(1, Math.min(21, nt)) : Math.max(0, Math.min(20, nt));
      function $(V) {
        var ct = dt, G = Ot, q, tt, O;
        if (Z === "c")
          G = bt(V) + G, V = "";
        else {
          V = +V;
          var Y = V < 0 || 1 / V < 0;
          if (V = isNaN(V) ? g : bt(Math.abs(V), nt), F && (V = l_(V)), Y && +V == 0 && Q !== "+" && (Y = !1), ct = (Y ? Q === "(" ? Q : m : Q === "-" || Q === "(" ? "" : Q) + ct, G = (Z === "s" ? X0[8 + zd / 3] : "") + G + (Y && Q === "(" ? ")" : ""), C) {
            for (q = -1, tt = V.length; ++q < tt; )
              if (O = V.charCodeAt(q), 48 > O || O > 57) {
                G = (O === 46 ? o + V.slice(q + 1) : V.slice(q)) + G, V = V.slice(0, q);
                break;
              }
          }
        }
        et && !lt && (V = i(V, 1 / 0));
        var B = ct.length + V.length + G.length, ut = B < I ? new Array(I - B + 1).join(M) : "";
        switch (et && lt && (V = i(ut + V, ut.length ? I - G.length : 1 / 0), ut = ""), N) {
          case "<":
            V = ct + V + G + ut;
            break;
          case "=":
            V = ct + ut + V + G;
            break;
          case "^":
            V = ut.slice(0, B = ut.length >> 1) + ct + V + G + ut.slice(B);
            break;
          default:
            V = ut + ct + V + G;
            break;
        }
        return d(V);
      }
      return $.toString = function() {
        return x + "";
      }, $;
    }
    function p(x, M) {
      var N = h((x = Ci(x), x.type = "f", x)), Q = Math.max(-8, Math.min(8, Math.floor(Jn(M) / 3))) * 3, K = Math.pow(10, -Q), lt = X0[8 + Q / 3];
      return function(I) {
        return N(K * I) + lt;
      };
    }
    return {
      format: h,
      formatPrefix: p
    };
  }
  var bi, Od, Dd;
  u_({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function u_(u) {
    return bi = n_(u), Od = bi.format, Dd = bi.formatPrefix, bi;
  }
  function a_(u) {
    return Math.max(0, -Jn(Math.abs(u)));
  }
  function i_(u, i) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Jn(i) / 3))) * 3 - Jn(Math.abs(u)));
  }
  function f_(u, i) {
    return u = Math.abs(u), i = Math.abs(i) - u, Math.max(0, Jn(i) - Jn(u)) + 1;
  }
  function Rd(u, i) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(u);
        break;
      default:
        this.range(i).domain(u);
        break;
    }
    return this;
  }
  const G0 = Symbol("implicit");
  function Nd() {
    var u = new rr(), i = [], r = [], c = G0;
    function o(d) {
      let v = u.get(d);
      if (v === void 0) {
        if (c !== G0) return c;
        u.set(d, v = i.push(d) - 1);
      }
      return r[v % r.length];
    }
    return o.domain = function(d) {
      if (!arguments.length) return i.slice();
      i = [], u = new rr();
      for (const v of d)
        u.has(v) || u.set(v, i.push(v) - 1);
      return o;
    }, o.range = function(d) {
      return arguments.length ? (r = Array.from(d), o) : r.slice();
    }, o.unknown = function(d) {
      return arguments.length ? (c = d, o) : c;
    }, o.copy = function() {
      return Nd(i, r).unknown(c);
    }, Rd.apply(o, arguments), o;
  }
  function c_(u) {
    return function() {
      return u;
    };
  }
  function Ud(u) {
    return +u;
  }
  var Q0 = [0, 1];
  function jn(u) {
    return u;
  }
  function Sr(u, i) {
    return (i -= u = +u) ? function(r) {
      return (r - u) / i;
    } : c_(isNaN(i) ? NaN : 0.5);
  }
  function r_(u, i) {
    var r;
    return u > i && (r = u, u = i, i = r), function(c) {
      return Math.max(u, Math.min(i, c));
    };
  }
  function s_(u, i, r) {
    var c = u[0], o = u[1], d = i[0], v = i[1];
    return o < c ? (c = Sr(o, c), d = r(v, d)) : (c = Sr(c, o), d = r(d, v)), function(m) {
      return d(c(m));
    };
  }
  function o_(u, i, r) {
    var c = Math.min(u.length, i.length) - 1, o = new Array(c), d = new Array(c), v = -1;
    for (u[c] < u[0] && (u = u.slice().reverse(), i = i.slice().reverse()); ++v < c; )
      o[v] = Sr(u[v], u[v + 1]), d[v] = r(i[v], i[v + 1]);
    return function(m) {
      var g = h1(u, m, 1, c) - 1;
      return d[g](o[g](m));
    };
  }
  function h_() {
    var u = Q0, i = Q0, r = zr, c, o, d, v = jn, m, g, h;
    function p() {
      var M = Math.min(u.length, i.length);
      return v !== jn && (v = r_(u[0], u[M - 1])), m = M > 2 ? o_ : s_, g = h = null, x;
    }
    function x(M) {
      return M == null || isNaN(M = +M) ? d : (g || (g = m(u.map(c), i, r)))(c(v(M)));
    }
    return x.invert = function(M) {
      return v(o((h || (h = m(i, u.map(c), Dl)))(M)));
    }, x.domain = function(M) {
      return arguments.length ? (u = Array.from(M, Ud), p()) : u.slice();
    }, x.range = function(M) {
      return arguments.length ? (i = Array.from(M), p()) : i.slice();
    }, x.rangeRound = function(M) {
      return i = Array.from(M), r = Ng, p();
    }, x.clamp = function(M) {
      return arguments.length ? (v = M ? !0 : jn, p()) : v !== jn;
    }, x.interpolate = function(M) {
      return arguments.length ? (r = M, p()) : r;
    }, x.unknown = function(M) {
      return arguments.length ? (d = M, x) : d;
    }, function(M, N) {
      return c = M, o = N, p();
    };
  }
  function d_() {
    return h_()(jn, jn);
  }
  function y_(u, i, r, c) {
    var o = S1(u, i, r), d;
    switch (c = Ci(c ?? ",f"), c.type) {
      case "s": {
        var v = Math.max(Math.abs(u), Math.abs(i));
        return c.precision == null && !isNaN(d = i_(o, v)) && (c.precision = d), Dd(c, v);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        c.precision == null && !isNaN(d = f_(o, Math.max(Math.abs(u), Math.abs(i)))) && (c.precision = d - (c.type === "e"));
        break;
      }
      case "f":
      case "%": {
        c.precision == null && !isNaN(d = a_(o)) && (c.precision = d - (c.type === "%") * 2);
        break;
      }
    }
    return Od(c);
  }
  function v_(u) {
    var i = u.domain;
    return u.ticks = function(r) {
      var c = i();
      return p1(c[0], c[c.length - 1], r ?? 10);
    }, u.tickFormat = function(r, c) {
      var o = i();
      return y_(o[0], o[o.length - 1], r ?? 10, c);
    }, u.nice = function(r) {
      r == null && (r = 10);
      var c = i(), o = 0, d = c.length - 1, v = c[o], m = c[d], g, h, p = 10;
      for (m < v && (h = v, v = m, m = h, h = o, o = d, d = h); p-- > 0; ) {
        if (h = or(v, m, r), h === g)
          return c[o] = v, c[d] = m, i(c);
        if (h > 0)
          v = Math.floor(v / h) * h, m = Math.ceil(m / h) * h;
        else if (h < 0)
          v = Math.ceil(v * h) / h, m = Math.floor(m * h) / h;
        else
          break;
        g = h;
      }
      return u;
    }, u;
  }
  function Z0(u) {
    return Math.sign(u) * u * u;
  }
  function m_(u) {
    return Math.sign(u) * Math.sqrt(Math.abs(u));
  }
  function Hd() {
    var u = d_(), i = [0, 1], r = !1, c;
    function o(d) {
      var v = m_(u(d));
      return isNaN(v) ? c : r ? Math.round(v) : v;
    }
    return o.invert = function(d) {
      return u.invert(Z0(d));
    }, o.domain = function(d) {
      return arguments.length ? (u.domain(d), o) : u.domain();
    }, o.range = function(d) {
      return arguments.length ? (u.range((i = Array.from(d, Ud)).map(Z0)), o) : i.slice();
    }, o.rangeRound = function(d) {
      return o.range(d).round(!0);
    }, o.round = function(d) {
      return arguments.length ? (r = !!d, o) : r;
    }, o.clamp = function(d) {
      return arguments.length ? (u.clamp(d), o) : u.clamp();
    }, o.unknown = function(d) {
      return arguments.length ? (c = d, o) : c;
    }, o.copy = function() {
      return Hd(u.domain(), i).round(r).clamp(u.clamp()).unknown(c);
    }, Rd.apply(o, arguments), v_(o);
  }
  function g_(u) {
    for (var i = u.length / 6 | 0, r = new Array(i), c = 0; c < i; ) r[c] = "#" + u.slice(c * 6, ++c * 6);
    return r;
  }
  const __ = (u) => Eg(u[u.length - 1]);
  var wd = new Array(3).concat(
    "fc8d59ffffbf99d594",
    "d7191cfdae61abdda42b83ba",
    "d7191cfdae61ffffbfabdda42b83ba",
    "d53e4ffc8d59fee08be6f59899d5943288bd",
    "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
    "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
    "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
    "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
    "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
  ).map(g_);
  __(wd);
  function Ne(u) {
    return function() {
      return u;
    };
  }
  const j0 = Math.abs, Wt = Math.atan2, tn = Math.cos, p_ = Math.max, nr = Math.min, Xl = Math.sin, Vn = Math.sqrt, nl = 1e-12, la = Math.PI, Xi = la / 2, S_ = 2 * la;
  function b_(u) {
    return u > 1 ? 0 : u < -1 ? la : Math.acos(u);
  }
  function V0(u) {
    return u >= 1 ? Xi : u <= -1 ? -Xi : Math.asin(u);
  }
  function A_(u) {
    let i = 3;
    return u.digits = function(r) {
      if (!arguments.length) return i;
      if (r == null)
        i = null;
      else {
        const c = Math.floor(r);
        if (!(c >= 0)) throw new RangeError(`invalid digits: ${r}`);
        i = c;
      }
      return u;
    }, () => new W2(i);
  }
  function E_(u) {
    return u.innerRadius;
  }
  function x_(u) {
    return u.outerRadius;
  }
  function M_(u) {
    return u.startAngle;
  }
  function T_(u) {
    return u.endAngle;
  }
  function z_(u) {
    return u && u.padAngle;
  }
  function O_(u, i, r, c, o, d, v, m) {
    var g = r - u, h = c - i, p = v - o, x = m - d, M = x * g - p * h;
    if (!(M * M < nl))
      return M = (p * (i - d) - x * (u - o)) / M, [u + M * g, i + M * h];
  }
  function Ai(u, i, r, c, o, d, v) {
    var m = u - r, g = i - c, h = (v ? d : -d) / Vn(m * m + g * g), p = h * g, x = -h * m, M = u + p, N = i + x, Q = r + p, K = c + x, lt = (M + Q) / 2, I = (N + K) / 2, et = Q - M, nt = K - N, F = et * et + nt * nt, Z = o - d, dt = M * K - Q * N, Ot = (nt < 0 ? -1 : 1) * Vn(p_(0, Z * Z * F - dt * dt)), bt = (dt * nt - et * Ot) / F, C = (-dt * et - nt * Ot) / F, $ = (dt * nt + et * Ot) / F, V = (-dt * et + nt * Ot) / F, ct = bt - lt, G = C - I, q = $ - lt, tt = V - I;
    return ct * ct + G * G > q * q + tt * tt && (bt = $, C = V), {
      cx: bt,
      cy: C,
      x01: -p,
      y01: -x,
      x11: bt * (o / Z - 1),
      y11: C * (o / Z - 1)
    };
  }
  function Ei() {
    var u = E_, i = x_, r = Ne(0), c = null, o = M_, d = T_, v = z_, m = null, g = A_(h);
    function h() {
      var p, x, M = +u.apply(this, arguments), N = +i.apply(this, arguments), Q = o.apply(this, arguments) - Xi, K = d.apply(this, arguments) - Xi, lt = j0(K - Q), I = K > Q;
      if (m || (m = p = g()), N < M && (x = N, N = M, M = x), !(N > nl)) m.moveTo(0, 0);
      else if (lt > S_ - nl)
        m.moveTo(N * tn(Q), N * Xl(Q)), m.arc(0, 0, N, Q, K, !I), M > nl && (m.moveTo(M * tn(K), M * Xl(K)), m.arc(0, 0, M, K, Q, I));
      else {
        var et = Q, nt = K, F = Q, Z = K, dt = lt, Ot = lt, bt = v.apply(this, arguments) / 2, C = bt > nl && (c ? +c.apply(this, arguments) : Vn(M * M + N * N)), $ = nr(j0(N - M) / 2, +r.apply(this, arguments)), V = $, ct = $, G, q;
        if (C > nl) {
          var tt = V0(C / M * Xl(bt)), O = V0(C / N * Xl(bt));
          (dt -= tt * 2) > nl ? (tt *= I ? 1 : -1, F += tt, Z -= tt) : (dt = 0, F = Z = (Q + K) / 2), (Ot -= O * 2) > nl ? (O *= I ? 1 : -1, et += O, nt -= O) : (Ot = 0, et = nt = (Q + K) / 2);
        }
        var Y = N * tn(et), B = N * Xl(et), ut = M * tn(Z), S = M * Xl(Z);
        if ($ > nl) {
          var w = N * tn(nt), W = N * Xl(nt), k = M * tn(F), X = M * Xl(F), at;
          if (lt < la)
            if (at = O_(Y, B, k, X, w, W, ut, S)) {
              var ft = Y - at[0], Ct = B - at[1], vt = w - at[0], Tt = W - at[1], At = 1 / Xl(b_((ft * vt + Ct * Tt) / (Vn(ft * ft + Ct * Ct) * Vn(vt * vt + Tt * Tt))) / 2), al = Vn(at[0] * at[0] + at[1] * at[1]);
              V = nr($, (M - al) / (At - 1)), ct = nr($, (N - al) / (At + 1));
            } else
              V = ct = 0;
        }
        Ot > nl ? ct > nl ? (G = Ai(k, X, Y, B, N, ct, I), q = Ai(w, W, ut, S, N, ct, I), m.moveTo(G.cx + G.x01, G.cy + G.y01), ct < $ ? m.arc(G.cx, G.cy, ct, Wt(G.y01, G.x01), Wt(q.y01, q.x01), !I) : (m.arc(G.cx, G.cy, ct, Wt(G.y01, G.x01), Wt(G.y11, G.x11), !I), m.arc(0, 0, N, Wt(G.cy + G.y11, G.cx + G.x11), Wt(q.cy + q.y11, q.cx + q.x11), !I), m.arc(q.cx, q.cy, ct, Wt(q.y11, q.x11), Wt(q.y01, q.x01), !I))) : (m.moveTo(Y, B), m.arc(0, 0, N, et, nt, !I)) : m.moveTo(Y, B), !(M > nl) || !(dt > nl) ? m.lineTo(ut, S) : V > nl ? (G = Ai(ut, S, w, W, M, -V, I), q = Ai(Y, B, k, X, M, -V, I), m.lineTo(G.cx + G.x01, G.cy + G.y01), V < $ ? m.arc(G.cx, G.cy, V, Wt(G.y01, G.x01), Wt(q.y01, q.x01), !I) : (m.arc(G.cx, G.cy, V, Wt(G.y01, G.x01), Wt(G.y11, G.x11), !I), m.arc(0, 0, M, Wt(G.cy + G.y11, G.cx + G.x11), Wt(q.cy + q.y11, q.cx + q.x11), I), m.arc(q.cx, q.cy, V, Wt(q.y11, q.x11), Wt(q.y01, q.x01), !I))) : m.arc(0, 0, M, Z, F, I);
      }
      if (m.closePath(), p) return m = null, p + "" || null;
    }
    return h.centroid = function() {
      var p = (+u.apply(this, arguments) + +i.apply(this, arguments)) / 2, x = (+o.apply(this, arguments) + +d.apply(this, arguments)) / 2 - la / 2;
      return [tn(x) * p, Xl(x) * p];
    }, h.innerRadius = function(p) {
      return arguments.length ? (u = typeof p == "function" ? p : Ne(+p), h) : u;
    }, h.outerRadius = function(p) {
      return arguments.length ? (i = typeof p == "function" ? p : Ne(+p), h) : i;
    }, h.cornerRadius = function(p) {
      return arguments.length ? (r = typeof p == "function" ? p : Ne(+p), h) : r;
    }, h.padRadius = function(p) {
      return arguments.length ? (c = p == null ? null : typeof p == "function" ? p : Ne(+p), h) : c;
    }, h.startAngle = function(p) {
      return arguments.length ? (o = typeof p == "function" ? p : Ne(+p), h) : o;
    }, h.endAngle = function(p) {
      return arguments.length ? (d = typeof p == "function" ? p : Ne(+p), h) : d;
    }, h.padAngle = function(p) {
      return arguments.length ? (v = typeof p == "function" ? p : Ne(+p), h) : v;
    }, h.context = function(p) {
      return arguments.length ? (m = p ?? null, h) : m;
    }, h;
  }
  function Fu(u, i, r) {
    this.k = u, this.x = i, this.y = r;
  }
  Fu.prototype = {
    constructor: Fu,
    scale: function(u) {
      return u === 1 ? this : new Fu(this.k * u, this.x, this.y);
    },
    translate: function(u, i) {
      return u === 0 & i === 0 ? this : new Fu(this.k, this.x + this.k * u, this.y + this.k * i);
    },
    apply: function(u) {
      return [u[0] * this.k + this.x, u[1] * this.k + this.y];
    },
    applyX: function(u) {
      return u * this.k + this.x;
    },
    applyY: function(u) {
      return u * this.k + this.y;
    },
    invert: function(u) {
      return [(u[0] - this.x) / this.k, (u[1] - this.y) / this.k];
    },
    invertX: function(u) {
      return (u - this.x) / this.k;
    },
    invertY: function(u) {
      return (u - this.y) / this.k;
    },
    rescaleX: function(u) {
      return u.copy().domain(u.range().map(this.invertX, this).map(u.invert, u));
    },
    rescaleY: function(u) {
      return u.copy().domain(u.range().map(this.invertY, this).map(u.invert, u));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };
  Fu.prototype;
  const ur = Math.PI * 2;
  function D_(u) {
    return Nd().domain(u).range(wd[u.length]).unknown("#ccc");
  }
  const R_ = (u) => (i) => {
    const r = u[i], c = Math.sin(r), o = -Math.cos(r);
    return { x: c, y: o };
  }, N_ = (u) => (i) => {
    const r = +u[i], c = Math.sin(r), o = -Math.cos(r);
    return { x: c, y: o };
  };
  function U_({
    data: u,
    width: i,
    height: r,
    innerRadius: c = 90,
    outerPadding: o = 120,
    categoryPadding: d = 0.1,
    skillPadding: v = 0.05,
    arcPercent: m = 0.8,
    arcStartOffset: g = 0.1,
    categoryFocus: h
  }) {
    const p = Math.min(i, r) / 2 - o, x = b1(u, (q) => q.lvl) ?? 0, M = Array.from({ length: x }, (q, tt) => tt + 1), N = y1(u, (q) => q.category), K = [...A1(u.map((q) => q.category)).keys()].sort(), lt = h ? [h] : K, I = u.filter(
      (q) => lt.includes(q.category)
    ), et = ur * m, nt = I.length, F = (et - d * (lt.length - 1) - v * nt) / nt, dt = lt.reduce(
      (q, tt) => {
        var O, Y;
        return [
          ...q,
          q[q.length - 1] + ((((O = N.get(tt)) == null ? void 0 : O.length) ?? 0) * F + (((Y = N.get(tt)) == null ? void 0 : Y.length) ?? 0) * v + d)
        ];
      },
      [ur * g]
    ).slice(0, -1).reduce((q, tt, O) => ({ ...q, [lt[O]]: tt }), {}), Ot = I.reduce(
      (q, tt) => {
        var O, Y;
        return {
          ...q,
          [`${tt.category}-${tt.skill}`]: dt[tt.category] + v + (((O = N.get(tt.category)) == null ? void 0 : O.findIndex((B) => B.skill == tt.skill)) ?? 0) * F + (((Y = N.get(tt.category)) == null ? void 0 : Y.findIndex((B) => B.skill == tt.skill)) ?? 0) * v
        };
      },
      {}
    ), bt = (q) => Ot[`${q.category}-${q.skill}`], C = Hd().domain([0, x]).range([c, p]), $ = Ei().startAngle((q) => bt(q)).endAngle((q) => bt(q) + F).innerRadius(c + 1).outerRadius((q) => C(q.lvl)), V = Ei().startAngle((q) => bt(q)).endAngle((q) => bt(q) + F).innerRadius((q, tt) => C(tt - 1) + 1).outerRadius((q, tt) => C(tt + 0) - 1).padRadius(-1).padAngle(0.01), ct = Ei().innerRadius(c + 5).outerRadius(c).startAngle((q) => dt[q] + v).endAngle(
      (q) => {
        var tt, O;
        return dt[q] + F * (((tt = N.get(q)) == null ? void 0 : tt.length) ?? 0) + (((O = N.get(q)) == null ? void 0 : O.length) ?? 0) * v;
      }
    ), G = Ei().innerRadius((q) => C(q) - 0.5).outerRadius((q) => C(q) + 0).startAngle(0).endAngle(et + (ur - et) / 2);
    return {
      sortedCategories: K,
      filteredCategories: lt,
      groupedByCategory: N,
      catAnnotationPointInner: R_(dt),
      catAnnotationPointOuter: N_(dt),
      barArc: $,
      barSegmentArc: V,
      annotationArc: ct,
      lvlRing: G,
      lvlsArray: M,
      outerRadius: p,
      innerRadius: c,
      getYPoint: C
    };
  }
  function H_({
    data: u,
    width: i = 640,
    height: r = void 0,
    innerRadius: c = 90,
    outerPadding: o = 120,
    categoryPadding: d = 0.1,
    skillPadding: v = 0.05,
    arcPercent: m = 0.8,
    arcStartOffset: g = 0.1,
    annotationPadding: h = 10,
    categoryLabelWidth: p = 100,
    lineThickness: x = 2
  }) {
    const M = r ?? i, [N, Q] = Ar.useState(!1), K = (O) => {
      Q(
        (Y) => Y === O ? !1 : O
      );
    }, {
      sortedCategories: lt,
      filteredCategories: I,
      groupedByCategory: et,
      catAnnotationPointInner: nt,
      catAnnotationPointOuter: F,
      barArc: Z,
      barSegmentArc: dt,
      annotationArc: Ot,
      lvlRing: bt,
      lvlsArray: C,
      outerRadius: $,
      getYPoint: V
    } = U_({
      data: u,
      width: i,
      height: M,
      innerRadius: c,
      outerPadding: o,
      categoryPadding: d,
      skillPadding: v,
      arcPercent: m,
      arcStartOffset: g,
      categoryFocus: N
    }), ct = lt ? D_(lt) : () => "black", G = (O, Y) => /* @__PURE__ */ zt.jsx("g", { fill: ct(O), className: "Bars", children: Y.map((B) => /* @__PURE__ */ zt.jsxs(
      "g",
      {
        className: "bar-group",
        onClick: () => K(O),
        onKeyDown: (ut) => {
          ut.key === "Enter" && K(O);
        },
        children: [
          /* @__PURE__ */ zt.jsx(
            "path",
            {
              d: Z(B),
              tabIndex: 0,
              className: "bar",
              fillOpacity: 1e-4
            }
          ),
          /* @__PURE__ */ zt.jsx(
            "path",
            {
              d: Z(B),
              className: "bar-outline",
              fill: "none",
              stroke: ct(O),
              strokeOpacity: 0
            }
          ),
          Array.from({ length: B.lvl }, (ut, S) => S + 1).map((ut) => /* @__PURE__ */ zt.jsx(
            "path",
            {
              d: dt(B, ut),
              fill: ct(O),
              className: "bar-segment"
            },
            `bar-segment${O}-${B.skill}-${ut}`
          ))
        ]
      },
      `bar ${O}-${B.skill}`
    )) }, O), q = (O) => /* @__PURE__ */ zt.jsx("g", { children: C.map((Y) => /* @__PURE__ */ zt.jsx(
      "path",
      {
        d: bt(Y),
        fill: "rgba(127, 127, 127, 0.04)",
        stroke: "none",
        strokeWidth: 1
      },
      `${O}-${Y}`
    )) }, O), tt = (O) => /* @__PURE__ */ zt.jsxs("g", { fill: ct(O), children: [
      /* @__PURE__ */ zt.jsx(
        "path",
        {
          d: Ot(O),
          fill: ct(O),
          stroke: "none",
          strokeWidth: x
        }
      ),
      /* @__PURE__ */ zt.jsx(
        "line",
        {
          x1: nt(O).x * c,
          y1: nt(O).y * c,
          x2: F(O).x * ($ + h),
          y2: F(O).y * ($ + h),
          stroke: ct(O),
          fill: "none",
          strokeWidth: x,
          opacity: 1
        }
      ),
      /* @__PURE__ */ zt.jsx(
        "line",
        {
          x1: F(O).x * ($ + h),
          y1: F(O).y * ($ + h),
          x2: F(O).x * ($ + h) + (F(O).x > 0 ? p + 20 : -p - 20),
          y2: F(O).y * ($ + h),
          stroke: ct(O),
          fill: "none",
          strokeWidth: x
        }
      ),
      /* @__PURE__ */ zt.jsx(
        "rect",
        {
          x: (F(O).x > 0 ? 0 : -(p + 20)) + F(O).x * ($ + h),
          y: F(O).y * ($ + h) - (F(O).y > 0 ? 0 : 30),
          width: p + 20,
          height: 30,
          fill: ct(O)
        }
      ),
      /* @__PURE__ */ zt.jsx(
        "text",
        {
          x: F(O).x * ($ + h) + (F(O).x > 0 ? p + 10 : -p - 10),
          y: F(O).y * ($ + h) + (F(O).y > 0 ? 20 : -10),
          fill: "white",
          fontWeight: 700,
          textAnchor: F(O).x > 0 ? "end" : "start",
          children: O
        }
      ),
      C.map((Y) => /* @__PURE__ */ zt.jsx(
        "text",
        {
          x: 0,
          y: -V(Y - 0.1),
          fill: "#ccc",
          textAnchor: "middle",
          fontSize: 10,
          children: Y
        },
        `annotation lvl ${O}-${Y}`
      ))
    ] }, `annotation ${O}`);
    return /* @__PURE__ */ zt.jsxs(
      "svg",
      {
        width: i,
        height: M,
        viewBox: `${-i / 2} ${-M / 2} ${i} ${M}`,
        children: [
          /* @__PURE__ */ zt.jsx("g", { children: I.map((O) => q(O)) }),
          /* @__PURE__ */ zt.jsx("g", { children: I.map(
            (O) => G(O, et.get(O) ?? [])
          ) }),
          /* @__PURE__ */ zt.jsx("g", { children: I.map((O) => tt(O)) })
        ]
      }
    );
  }
  var ar = { exports: {} }, Ju = {}, ir = { exports: {} }, fr = {};
  /**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var L0;
  function w_() {
    return L0 || (L0 = 1, function(u) {
      function i(O, Y) {
        var B = O.length;
        O.push(Y);
        t: for (; 0 < B; ) {
          var ut = B - 1 >>> 1, S = O[ut];
          if (0 < o(S, Y))
            O[ut] = Y, O[B] = S, B = ut;
          else break t;
        }
      }
      function r(O) {
        return O.length === 0 ? null : O[0];
      }
      function c(O) {
        if (O.length === 0) return null;
        var Y = O[0], B = O.pop();
        if (B !== Y) {
          O[0] = B;
          t: for (var ut = 0, S = O.length, w = S >>> 1; ut < w; ) {
            var W = 2 * (ut + 1) - 1, k = O[W], X = W + 1, at = O[X];
            if (0 > o(k, B))
              X < S && 0 > o(at, k) ? (O[ut] = at, O[X] = B, ut = X) : (O[ut] = k, O[W] = B, ut = W);
            else if (X < S && 0 > o(at, B))
              O[ut] = at, O[X] = B, ut = X;
            else break t;
          }
        }
        return Y;
      }
      function o(O, Y) {
        var B = O.sortIndex - Y.sortIndex;
        return B !== 0 ? B : O.id - Y.id;
      }
      if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var d = performance;
        u.unstable_now = function() {
          return d.now();
        };
      } else {
        var v = Date, m = v.now();
        u.unstable_now = function() {
          return v.now() - m;
        };
      }
      var g = [], h = [], p = 1, x = null, M = 3, N = !1, Q = !1, K = !1, lt = typeof setTimeout == "function" ? setTimeout : null, I = typeof clearTimeout == "function" ? clearTimeout : null, et = typeof setImmediate < "u" ? setImmediate : null;
      function nt(O) {
        for (var Y = r(h); Y !== null; ) {
          if (Y.callback === null) c(h);
          else if (Y.startTime <= O)
            c(h), Y.sortIndex = Y.expirationTime, i(g, Y);
          else break;
          Y = r(h);
        }
      }
      function F(O) {
        if (K = !1, nt(O), !Q)
          if (r(g) !== null)
            Q = !0, q();
          else {
            var Y = r(h);
            Y !== null && tt(F, Y.startTime - O);
          }
      }
      var Z = !1, dt = -1, Ot = 5, bt = -1;
      function C() {
        return !(u.unstable_now() - bt < Ot);
      }
      function $() {
        if (Z) {
          var O = u.unstable_now();
          bt = O;
          var Y = !0;
          try {
            t: {
              Q = !1, K && (K = !1, I(dt), dt = -1), N = !0;
              var B = M;
              try {
                l: {
                  for (nt(O), x = r(g); x !== null && !(x.expirationTime > O && C()); ) {
                    var ut = x.callback;
                    if (typeof ut == "function") {
                      x.callback = null, M = x.priorityLevel;
                      var S = ut(
                        x.expirationTime <= O
                      );
                      if (O = u.unstable_now(), typeof S == "function") {
                        x.callback = S, nt(O), Y = !0;
                        break l;
                      }
                      x === r(g) && c(g), nt(O);
                    } else c(g);
                    x = r(g);
                  }
                  if (x !== null) Y = !0;
                  else {
                    var w = r(h);
                    w !== null && tt(
                      F,
                      w.startTime - O
                    ), Y = !1;
                  }
                }
                break t;
              } finally {
                x = null, M = B, N = !1;
              }
              Y = void 0;
            }
          } finally {
            Y ? V() : Z = !1;
          }
        }
      }
      var V;
      if (typeof et == "function")
        V = function() {
          et($);
        };
      else if (typeof MessageChannel < "u") {
        var ct = new MessageChannel(), G = ct.port2;
        ct.port1.onmessage = $, V = function() {
          G.postMessage(null);
        };
      } else
        V = function() {
          lt($, 0);
        };
      function q() {
        Z || (Z = !0, V());
      }
      function tt(O, Y) {
        dt = lt(function() {
          O(u.unstable_now());
        }, Y);
      }
      u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(O) {
        O.callback = null;
      }, u.unstable_continueExecution = function() {
        Q || N || (Q = !0, q());
      }, u.unstable_forceFrameRate = function(O) {
        0 > O || 125 < O ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : Ot = 0 < O ? Math.floor(1e3 / O) : 5;
      }, u.unstable_getCurrentPriorityLevel = function() {
        return M;
      }, u.unstable_getFirstCallbackNode = function() {
        return r(g);
      }, u.unstable_next = function(O) {
        switch (M) {
          case 1:
          case 2:
          case 3:
            var Y = 3;
            break;
          default:
            Y = M;
        }
        var B = M;
        M = Y;
        try {
          return O();
        } finally {
          M = B;
        }
      }, u.unstable_pauseExecution = function() {
      }, u.unstable_requestPaint = function() {
      }, u.unstable_runWithPriority = function(O, Y) {
        switch (O) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            O = 3;
        }
        var B = M;
        M = O;
        try {
          return Y();
        } finally {
          M = B;
        }
      }, u.unstable_scheduleCallback = function(O, Y, B) {
        var ut = u.unstable_now();
        switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? ut + B : ut) : B = ut, O) {
          case 1:
            var S = -1;
            break;
          case 2:
            S = 250;
            break;
          case 5:
            S = 1073741823;
            break;
          case 4:
            S = 1e4;
            break;
          default:
            S = 5e3;
        }
        return S = B + S, O = {
          id: p++,
          callback: Y,
          priorityLevel: O,
          startTime: B,
          expirationTime: S,
          sortIndex: -1
        }, B > ut ? (O.sortIndex = B, i(h, O), r(g) === null && O === r(h) && (K ? (I(dt), dt = -1) : K = !0, tt(F, B - ut))) : (O.sortIndex = S, i(g, O), Q || N || (Q = !0, q())), O;
      }, u.unstable_shouldYield = C, u.unstable_wrapCallback = function(O) {
        var Y = M;
        return function() {
          var B = M;
          M = Y;
          try {
            return O.apply(this, arguments);
          } finally {
            M = B;
          }
        };
      };
    }(fr)), fr;
  }
  var K0;
  function q_() {
    return K0 || (K0 = 1, ir.exports = w_()), ir.exports;
  }
  var cr = { exports: {} }, Ft = {};
  /**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var $0;
  function Y_() {
    if ($0) return Ft;
    $0 = 1;
    var u = br();
    function i(g) {
      var h = "https://react.dev/errors/" + g;
      if (1 < arguments.length) {
        h += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var p = 2; p < arguments.length; p++)
          h += "&args[]=" + encodeURIComponent(arguments[p]);
      }
      return "Minified React error #" + g + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function r() {
    }
    var c = {
      d: {
        f: r,
        r: function() {
          throw Error(i(522));
        },
        D: r,
        C: r,
        L: r,
        m: r,
        X: r,
        S: r,
        M: r
      },
      p: 0,
      findDOMNode: null
    }, o = Symbol.for("react.portal");
    function d(g, h, p) {
      var x = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: o,
        key: x == null ? null : "" + x,
        children: g,
        containerInfo: h,
        implementation: p
      };
    }
    var v = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function m(g, h) {
      if (g === "font") return "";
      if (typeof h == "string")
        return h === "use-credentials" ? h : "";
    }
    return Ft.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, Ft.createPortal = function(g, h) {
      var p = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
        throw Error(i(299));
      return d(g, h, null, p);
    }, Ft.flushSync = function(g) {
      var h = v.T, p = c.p;
      try {
        if (v.T = null, c.p = 2, g) return g();
      } finally {
        v.T = h, c.p = p, c.d.f();
      }
    }, Ft.preconnect = function(g, h) {
      typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, c.d.C(g, h));
    }, Ft.prefetchDNS = function(g) {
      typeof g == "string" && c.d.D(g);
    }, Ft.preinit = function(g, h) {
      if (typeof g == "string" && h && typeof h.as == "string") {
        var p = h.as, x = m(p, h.crossOrigin), M = typeof h.integrity == "string" ? h.integrity : void 0, N = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        p === "style" ? c.d.S(
          g,
          typeof h.precedence == "string" ? h.precedence : void 0,
          {
            crossOrigin: x,
            integrity: M,
            fetchPriority: N
          }
        ) : p === "script" && c.d.X(g, {
          crossOrigin: x,
          integrity: M,
          fetchPriority: N,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0
        });
      }
    }, Ft.preinitModule = function(g, h) {
      if (typeof g == "string")
        if (typeof h == "object" && h !== null) {
          if (h.as == null || h.as === "script") {
            var p = m(
              h.as,
              h.crossOrigin
            );
            c.d.M(g, {
              crossOrigin: p,
              integrity: typeof h.integrity == "string" ? h.integrity : void 0,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0
            });
          }
        } else h == null && c.d.M(g);
    }, Ft.preload = function(g, h) {
      if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
        var p = h.as, x = m(p, h.crossOrigin);
        c.d.L(g, p, {
          crossOrigin: x,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0
        });
      }
    }, Ft.preloadModule = function(g, h) {
      if (typeof g == "string")
        if (h) {
          var p = m(h.as, h.crossOrigin);
          c.d.m(g, {
            as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
            crossOrigin: p,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0
          });
        } else c.d.m(g);
    }, Ft.requestFormReset = function(g) {
      c.d.r(g);
    }, Ft.unstable_batchedUpdates = function(g, h) {
      return g(h);
    }, Ft.useFormState = function(g, h, p) {
      return v.H.useFormState(g, h, p);
    }, Ft.useFormStatus = function() {
      return v.H.useHostTransitionStatus();
    }, Ft.version = "19.0.0", Ft;
  }
  var J0;
  function B_() {
    if (J0) return cr.exports;
    J0 = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
        } catch (i) {
          console.error(i);
        }
    }
    return u(), cr.exports = Y_(), cr.exports;
  }
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var k0;
  function C_() {
    if (k0) return Ju;
    k0 = 1;
    var u = q_(), i = br(), r = B_();
    function c(t) {
      var l = "https://react.dev/errors/" + t;
      if (1 < arguments.length) {
        l += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var e = 2; e < arguments.length; e++)
          l += "&args[]=" + encodeURIComponent(arguments[e]);
      }
      return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function o(t) {
      return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
    }
    var d = Symbol.for("react.element"), v = Symbol.for("react.transitional.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), M = Symbol.for("react.consumer"), N = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), lt = Symbol.for("react.suspense_list"), I = Symbol.for("react.memo"), et = Symbol.for("react.lazy"), nt = Symbol.for("react.offscreen"), F = Symbol.for("react.memo_cache_sentinel"), Z = Symbol.iterator;
    function dt(t) {
      return t === null || typeof t != "object" ? null : (t = Z && t[Z] || t["@@iterator"], typeof t == "function" ? t : null);
    }
    var Ot = Symbol.for("react.client.reference");
    function bt(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === Ot ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case g:
          return "Fragment";
        case m:
          return "Portal";
        case p:
          return "Profiler";
        case h:
          return "StrictMode";
        case K:
          return "Suspense";
        case lt:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case N:
            return (t.displayName || "Context") + ".Provider";
          case M:
            return (t._context.displayName || "Context") + ".Consumer";
          case Q:
            var l = t.render;
            return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case I:
            return l = t.displayName || null, l !== null ? l : bt(t.type) || "Memo";
          case et:
            l = t._payload, t = t._init;
            try {
              return bt(t(l));
            } catch {
            }
        }
      return null;
    }
    var C = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = Object.assign, V, ct;
    function G(t) {
      if (V === void 0)
        try {
          throw Error();
        } catch (e) {
          var l = e.stack.trim().match(/\n( *(at )?)/);
          V = l && l[1] || "", ct = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + V + t + ct;
    }
    var q = !1;
    function tt(t, l) {
      if (!t || q) return "";
      q = !0;
      var e = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var n = {
          DetermineComponentFrameRoot: function() {
            try {
              if (l) {
                var H = function() {
                  throw Error();
                };
                if (Object.defineProperty(H.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(H, []);
                  } catch (D) {
                    var z = D;
                  }
                  Reflect.construct(t, [], H);
                } else {
                  try {
                    H.call();
                  } catch (D) {
                    z = D;
                  }
                  t.call(H.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (D) {
                  z = D;
                }
                (H = t()) && typeof H.catch == "function" && H.catch(function() {
                });
              }
            } catch (D) {
              if (D && z && typeof D.stack == "string")
                return [D.stack, z.stack];
            }
            return [null, null];
          }
        };
        n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var a = Object.getOwnPropertyDescriptor(
          n.DetermineComponentFrameRoot,
          "name"
        );
        a && a.configurable && Object.defineProperty(
          n.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var f = n.DetermineComponentFrameRoot(), s = f[0], y = f[1];
        if (s && y) {
          var _ = s.split(`
`), A = y.split(`
`);
          for (a = n = 0; n < _.length && !_[n].includes("DetermineComponentFrameRoot"); )
            n++;
          for (; a < A.length && !A[a].includes(
            "DetermineComponentFrameRoot"
          ); )
            a++;
          if (n === _.length || a === A.length)
            for (n = _.length - 1, a = A.length - 1; 1 <= n && 0 <= a && _[n] !== A[a]; )
              a--;
          for (; 1 <= n && 0 <= a; n--, a--)
            if (_[n] !== A[a]) {
              if (n !== 1 || a !== 1)
                do
                  if (n--, a--, 0 > a || _[n] !== A[a]) {
                    var R = `
` + _[n].replace(" at new ", " at ");
                    return t.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", t.displayName)), R;
                  }
                while (1 <= n && 0 <= a);
              break;
            }
        }
      } finally {
        q = !1, Error.prepareStackTrace = e;
      }
      return (e = t ? t.displayName || t.name : "") ? G(e) : "";
    }
    function O(t) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return G(t.type);
        case 16:
          return G("Lazy");
        case 13:
          return G("Suspense");
        case 19:
          return G("SuspenseList");
        case 0:
        case 15:
          return t = tt(t.type, !1), t;
        case 11:
          return t = tt(t.type.render, !1), t;
        case 1:
          return t = tt(t.type, !0), t;
        default:
          return "";
      }
    }
    function Y(t) {
      try {
        var l = "";
        do
          l += O(t), t = t.return;
        while (t);
        return l;
      } catch (e) {
        return `
Error generating stack: ` + e.message + `
` + e.stack;
      }
    }
    function B(t) {
      var l = t, e = t;
      if (t.alternate) for (; l.return; ) l = l.return;
      else {
        t = l;
        do
          l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
        while (t);
      }
      return l.tag === 3 ? e : null;
    }
    function ut(t) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
      }
      return null;
    }
    function S(t) {
      if (B(t) !== t)
        throw Error(c(188));
    }
    function w(t) {
      var l = t.alternate;
      if (!l) {
        if (l = B(t), l === null) throw Error(c(188));
        return l !== t ? null : t;
      }
      for (var e = t, n = l; ; ) {
        var a = e.return;
        if (a === null) break;
        var f = a.alternate;
        if (f === null) {
          if (n = a.return, n !== null) {
            e = n;
            continue;
          }
          break;
        }
        if (a.child === f.child) {
          for (f = a.child; f; ) {
            if (f === e) return S(a), t;
            if (f === n) return S(a), l;
            f = f.sibling;
          }
          throw Error(c(188));
        }
        if (e.return !== n.return) e = a, n = f;
        else {
          for (var s = !1, y = a.child; y; ) {
            if (y === e) {
              s = !0, e = a, n = f;
              break;
            }
            if (y === n) {
              s = !0, n = a, e = f;
              break;
            }
            y = y.sibling;
          }
          if (!s) {
            for (y = f.child; y; ) {
              if (y === e) {
                s = !0, e = f, n = a;
                break;
              }
              if (y === n) {
                s = !0, n = f, e = a;
                break;
              }
              y = y.sibling;
            }
            if (!s) throw Error(c(189));
          }
        }
        if (e.alternate !== n) throw Error(c(190));
      }
      if (e.tag !== 3) throw Error(c(188));
      return e.stateNode.current === e ? t : l;
    }
    function W(t) {
      var l = t.tag;
      if (l === 5 || l === 26 || l === 27 || l === 6) return t;
      for (t = t.child; t !== null; ) {
        if (l = W(t), l !== null) return l;
        t = t.sibling;
      }
      return null;
    }
    var k = Array.isArray, X = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, at = {
      pending: !1,
      data: null,
      method: null,
      action: null
    }, ft = [], Ct = -1;
    function vt(t) {
      return { current: t };
    }
    function Tt(t) {
      0 > Ct || (t.current = ft[Ct], ft[Ct] = null, Ct--);
    }
    function At(t, l) {
      Ct++, ft[Ct] = t.current, t.current = l;
    }
    var al = vt(null), kn = vt(null), fe = vt(null), ua = vt(null);
    function aa(t, l) {
      switch (At(fe, l), At(kn, t), At(al, null), t = l.nodeType, t) {
        case 9:
        case 11:
          l = (l = l.documentElement) && (l = l.namespaceURI) ? Vh(l) : 0;
          break;
        default:
          if (t = t === 8 ? l.parentNode : l, l = t.tagName, t = t.namespaceURI)
            t = Vh(t), l = Lh(t, l);
          else
            switch (l) {
              case "svg":
                l = 1;
                break;
              case "math":
                l = 2;
                break;
              default:
                l = 0;
            }
      }
      Tt(al), At(al, l);
    }
    function fn() {
      Tt(al), Tt(kn), Tt(fe);
    }
    function ji(t) {
      t.memoizedState !== null && At(ua, t);
      var l = al.current, e = Lh(l, t.type);
      l !== e && (At(kn, t), At(al, e));
    }
    function ia(t) {
      kn.current === t && (Tt(al), Tt(kn)), ua.current === t && (Tt(ua), Qu._currentValue = at);
    }
    var Vi = Object.prototype.hasOwnProperty, Li = u.unstable_scheduleCallback, Ki = u.unstable_cancelCallback, Yd = u.unstable_shouldYield, Bd = u.unstable_requestPaint, Hl = u.unstable_now, Cd = u.unstable_getCurrentPriorityLevel, Ur = u.unstable_ImmediatePriority, Hr = u.unstable_UserBlockingPriority, fa = u.unstable_NormalPriority, Xd = u.unstable_LowPriority, wr = u.unstable_IdlePriority, Gd = u.log, Qd = u.unstable_setDisableYieldValue, Wn = null, il = null;
    function Zd(t) {
      if (il && typeof il.onCommitFiberRoot == "function")
        try {
          il.onCommitFiberRoot(
            Wn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
    }
    function ce(t) {
      if (typeof Gd == "function" && Qd(t), il && typeof il.setStrictMode == "function")
        try {
          il.setStrictMode(Wn, t);
        } catch {
        }
    }
    var fl = Math.clz32 ? Math.clz32 : Ld, jd = Math.log, Vd = Math.LN2;
    function Ld(t) {
      return t >>>= 0, t === 0 ? 32 : 31 - (jd(t) / Vd | 0) | 0;
    }
    var ca = 128, ra = 4194304;
    function Ue(t) {
      var l = t & 42;
      if (l !== 0) return l;
      switch (t & -t) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t & 4194176;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return t & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return t;
      }
    }
    function sa(t, l) {
      var e = t.pendingLanes;
      if (e === 0) return 0;
      var n = 0, a = t.suspendedLanes, f = t.pingedLanes, s = t.warmLanes;
      t = t.finishedLanes !== 0;
      var y = e & 134217727;
      return y !== 0 ? (e = y & ~a, e !== 0 ? n = Ue(e) : (f &= y, f !== 0 ? n = Ue(f) : t || (s = y & ~s, s !== 0 && (n = Ue(s))))) : (y = e & ~a, y !== 0 ? n = Ue(y) : f !== 0 ? n = Ue(f) : t || (s = e & ~s, s !== 0 && (n = Ue(s)))), n === 0 ? 0 : l !== 0 && l !== n && (l & a) === 0 && (a = n & -n, s = l & -l, a >= s || a === 32 && (s & 4194176) !== 0) ? l : n;
    }
    function Fn(t, l) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
    }
    function Kd(t, l) {
      switch (t) {
        case 1:
        case 2:
        case 4:
        case 8:
          return l + 250;
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return l + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function qr() {
      var t = ca;
      return ca <<= 1, (ca & 4194176) === 0 && (ca = 128), t;
    }
    function Yr() {
      var t = ra;
      return ra <<= 1, (ra & 62914560) === 0 && (ra = 4194304), t;
    }
    function $i(t) {
      for (var l = [], e = 0; 31 > e; e++) l.push(t);
      return l;
    }
    function Pn(t, l) {
      t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
    }
    function $d(t, l, e, n, a, f) {
      var s = t.pendingLanes;
      t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
      var y = t.entanglements, _ = t.expirationTimes, A = t.hiddenUpdates;
      for (e = s & ~e; 0 < e; ) {
        var R = 31 - fl(e), H = 1 << R;
        y[R] = 0, _[R] = -1;
        var z = A[R];
        if (z !== null)
          for (A[R] = null, R = 0; R < z.length; R++) {
            var D = z[R];
            D !== null && (D.lane &= -536870913);
          }
        e &= ~H;
      }
      n !== 0 && Br(t, n, 0), f !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= f & ~(s & ~l));
    }
    function Br(t, l, e) {
      t.pendingLanes |= l, t.suspendedLanes &= ~l;
      var n = 31 - fl(l);
      t.entangledLanes |= l, t.entanglements[n] = t.entanglements[n] | 1073741824 | e & 4194218;
    }
    function Cr(t, l) {
      var e = t.entangledLanes |= l;
      for (t = t.entanglements; e; ) {
        var n = 31 - fl(e), a = 1 << n;
        a & l | t[n] & l && (t[n] |= l), e &= ~a;
      }
    }
    function Xr(t) {
      return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function Gr() {
      var t = X.p;
      return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : r0(t.type));
    }
    function Jd(t, l) {
      var e = X.p;
      try {
        return X.p = t, l();
      } finally {
        X.p = e;
      }
    }
    var re = Math.random().toString(36).slice(2), Jt = "__reactFiber$" + re, tl = "__reactProps$" + re, cn = "__reactContainer$" + re, Ji = "__reactEvents$" + re, kd = "__reactListeners$" + re, Wd = "__reactHandles$" + re, Qr = "__reactResources$" + re, In = "__reactMarker$" + re;
    function ki(t) {
      delete t[Jt], delete t[tl], delete t[Ji], delete t[kd], delete t[Wd];
    }
    function He(t) {
      var l = t[Jt];
      if (l) return l;
      for (var e = t.parentNode; e; ) {
        if (l = e[cn] || e[Jt]) {
          if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
            for (t = Jh(t); t !== null; ) {
              if (e = t[Jt]) return e;
              t = Jh(t);
            }
          return l;
        }
        t = e, e = t.parentNode;
      }
      return null;
    }
    function rn(t) {
      if (t = t[Jt] || t[cn]) {
        var l = t.tag;
        if (l === 5 || l === 6 || l === 13 || l === 26 || l === 27 || l === 3)
          return t;
      }
      return null;
    }
    function tu(t) {
      var l = t.tag;
      if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
      throw Error(c(33));
    }
    function sn(t) {
      var l = t[Qr];
      return l || (l = t[Qr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
    }
    function Qt(t) {
      t[In] = !0;
    }
    var Zr = /* @__PURE__ */ new Set(), jr = {};
    function we(t, l) {
      on(t, l), on(t + "Capture", l);
    }
    function on(t, l) {
      for (jr[t] = l, t = 0; t < l.length; t++)
        Zr.add(l[t]);
    }
    var Zl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fd = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Vr = {}, Lr = {};
    function Pd(t) {
      return Vi.call(Lr, t) ? !0 : Vi.call(Vr, t) ? !1 : Fd.test(t) ? Lr[t] = !0 : (Vr[t] = !0, !1);
    }
    function oa(t, l, e) {
      if (Pd(l))
        if (e === null) t.removeAttribute(l);
        else {
          switch (typeof e) {
            case "undefined":
            case "function":
            case "symbol":
              t.removeAttribute(l);
              return;
            case "boolean":
              var n = l.toLowerCase().slice(0, 5);
              if (n !== "data-" && n !== "aria-") {
                t.removeAttribute(l);
                return;
              }
          }
          t.setAttribute(l, "" + e);
        }
    }
    function ha(t, l, e) {
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(l);
            return;
        }
        t.setAttribute(l, "" + e);
      }
    }
    function jl(t, l, e, n) {
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(e);
            return;
        }
        t.setAttributeNS(l, e, "" + n);
      }
    }
    function dl(t) {
      switch (typeof t) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return t;
        case "object":
          return t;
        default:
          return "";
      }
    }
    function Kr(t) {
      var l = t.type;
      return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
    }
    function Id(t) {
      var l = Kr(t) ? "checked" : "value", e = Object.getOwnPropertyDescriptor(
        t.constructor.prototype,
        l
      ), n = "" + t[l];
      if (!t.hasOwnProperty(l) && typeof e < "u" && typeof e.get == "function" && typeof e.set == "function") {
        var a = e.get, f = e.set;
        return Object.defineProperty(t, l, {
          configurable: !0,
          get: function() {
            return a.call(this);
          },
          set: function(s) {
            n = "" + s, f.call(this, s);
          }
        }), Object.defineProperty(t, l, {
          enumerable: e.enumerable
        }), {
          getValue: function() {
            return n;
          },
          setValue: function(s) {
            n = "" + s;
          },
          stopTracking: function() {
            t._valueTracker = null, delete t[l];
          }
        };
      }
    }
    function da(t) {
      t._valueTracker || (t._valueTracker = Id(t));
    }
    function $r(t) {
      if (!t) return !1;
      var l = t._valueTracker;
      if (!l) return !0;
      var e = l.getValue(), n = "";
      return t && (n = Kr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== e ? (l.setValue(t), !0) : !1;
    }
    function ya(t) {
      if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    var ty = /[\n"\\]/g;
    function yl(t) {
      return t.replace(
        ty,
        function(l) {
          return "\\" + l.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function Wi(t, l, e, n, a, f, s, y) {
      t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), l != null ? s === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + dl(l)) : t.value !== "" + dl(l) && (t.value = "" + dl(l)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), l != null ? Fi(t, s, dl(l)) : e != null ? Fi(t, s, dl(e)) : n != null && t.removeAttribute("value"), a == null && f != null && (t.defaultChecked = !!f), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? t.name = "" + dl(y) : t.removeAttribute("name");
    }
    function Jr(t, l, e, n, a, f, s, y) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (t.type = f), l != null || e != null) {
        if (!(f !== "submit" && f !== "reset" || l != null))
          return;
        e = e != null ? "" + dl(e) : "", l = l != null ? "" + dl(l) : e, y || l === t.value || (t.value = l), t.defaultValue = l;
      }
      n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = y ? t.checked : !!n, t.defaultChecked = !!n, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s);
    }
    function Fi(t, l, e) {
      l === "number" && ya(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
    }
    function hn(t, l, e, n) {
      if (t = t.options, l) {
        l = {};
        for (var a = 0; a < e.length; a++)
          l["$" + e[a]] = !0;
        for (e = 0; e < t.length; e++)
          a = l.hasOwnProperty("$" + t[e].value), t[e].selected !== a && (t[e].selected = a), a && n && (t[e].defaultSelected = !0);
      } else {
        for (e = "" + dl(e), l = null, a = 0; a < t.length; a++) {
          if (t[a].value === e) {
            t[a].selected = !0, n && (t[a].defaultSelected = !0);
            return;
          }
          l !== null || t[a].disabled || (l = t[a]);
        }
        l !== null && (l.selected = !0);
      }
    }
    function kr(t, l, e) {
      if (l != null && (l = "" + dl(l), l !== t.value && (t.value = l), e == null)) {
        t.defaultValue !== l && (t.defaultValue = l);
        return;
      }
      t.defaultValue = e != null ? "" + dl(e) : "";
    }
    function Wr(t, l, e, n) {
      if (l == null) {
        if (n != null) {
          if (e != null) throw Error(c(92));
          if (k(n)) {
            if (1 < n.length) throw Error(c(93));
            n = n[0];
          }
          e = n;
        }
        e == null && (e = ""), l = e;
      }
      e = dl(l), t.defaultValue = e, n = t.textContent, n === e && n !== "" && n !== null && (t.value = n);
    }
    function dn(t, l) {
      if (l) {
        var e = t.firstChild;
        if (e && e === t.lastChild && e.nodeType === 3) {
          e.nodeValue = l;
          return;
        }
      }
      t.textContent = l;
    }
    var ly = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    function Fr(t, l, e) {
      var n = l.indexOf("--") === 0;
      e == null || typeof e == "boolean" || e === "" ? n ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : n ? t.setProperty(l, e) : typeof e != "number" || e === 0 || ly.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
    }
    function Pr(t, l, e) {
      if (l != null && typeof l != "object")
        throw Error(c(62));
      if (t = t.style, e != null) {
        for (var n in e)
          !e.hasOwnProperty(n) || l != null && l.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
        for (var a in l)
          n = l[a], l.hasOwnProperty(a) && e[a] !== n && Fr(t, a, n);
      } else
        for (var f in l)
          l.hasOwnProperty(f) && Fr(t, f, l[f]);
    }
    function Pi(t) {
      if (t.indexOf("-") === -1) return !1;
      switch (t) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var ey = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), ny = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function va(t) {
      return ny.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
    }
    var Ii = null;
    function tf(t) {
      return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
    }
    var yn = null, vn = null;
    function Ir(t) {
      var l = rn(t);
      if (l && (t = l.stateNode)) {
        var e = t[tl] || null;
        t: switch (t = l.stateNode, l.type) {
          case "input":
            if (Wi(
              t,
              e.value,
              e.defaultValue,
              e.defaultValue,
              e.checked,
              e.defaultChecked,
              e.type,
              e.name
            ), l = e.name, e.type === "radio" && l != null) {
              for (e = t; e.parentNode; ) e = e.parentNode;
              for (e = e.querySelectorAll(
                'input[name="' + yl(
                  "" + l
                ) + '"][type="radio"]'
              ), l = 0; l < e.length; l++) {
                var n = e[l];
                if (n !== t && n.form === t.form) {
                  var a = n[tl] || null;
                  if (!a) throw Error(c(90));
                  Wi(
                    n,
                    a.value,
                    a.defaultValue,
                    a.defaultValue,
                    a.checked,
                    a.defaultChecked,
                    a.type,
                    a.name
                  );
                }
              }
              for (l = 0; l < e.length; l++)
                n = e[l], n.form === t.form && $r(n);
            }
            break t;
          case "textarea":
            kr(t, e.value, e.defaultValue);
            break t;
          case "select":
            l = e.value, l != null && hn(t, !!e.multiple, l, !1);
        }
      }
    }
    var lf = !1;
    function ts(t, l, e) {
      if (lf) return t(l, e);
      lf = !0;
      try {
        var n = t(l);
        return n;
      } finally {
        if (lf = !1, (yn !== null || vn !== null) && (Pa(), yn && (l = yn, t = vn, vn = yn = null, Ir(l), t)))
          for (l = 0; l < t.length; l++) Ir(t[l]);
      }
    }
    function lu(t, l) {
      var e = t.stateNode;
      if (e === null) return null;
      var n = e[tl] || null;
      if (n === null) return null;
      e = n[l];
      t: switch (l) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
          break t;
        default:
          t = !1;
      }
      if (t) return null;
      if (e && typeof e != "function")
        throw Error(
          c(231, l, typeof e)
        );
      return e;
    }
    var ef = !1;
    if (Zl)
      try {
        var eu = {};
        Object.defineProperty(eu, "passive", {
          get: function() {
            ef = !0;
          }
        }), window.addEventListener("test", eu, eu), window.removeEventListener("test", eu, eu);
      } catch {
        ef = !1;
      }
    var se = null, nf = null, ma = null;
    function ls() {
      if (ma) return ma;
      var t, l = nf, e = l.length, n, a = "value" in se ? se.value : se.textContent, f = a.length;
      for (t = 0; t < e && l[t] === a[t]; t++) ;
      var s = e - t;
      for (n = 1; n <= s && l[e - n] === a[f - n]; n++) ;
      return ma = a.slice(t, 1 < n ? 1 - n : void 0);
    }
    function ga(t) {
      var l = t.keyCode;
      return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
    }
    function _a() {
      return !0;
    }
    function es() {
      return !1;
    }
    function ll(t) {
      function l(e, n, a, f, s) {
        this._reactName = e, this._targetInst = a, this.type = n, this.nativeEvent = f, this.target = s, this.currentTarget = null;
        for (var y in t)
          t.hasOwnProperty(y) && (e = t[y], this[y] = e ? e(f) : f[y]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? _a : es, this.isPropagationStopped = es, this;
      }
      return $(l.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = _a);
        },
        stopPropagation: function() {
          var e = this.nativeEvent;
          e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = _a);
        },
        persist: function() {
        },
        isPersistent: _a
      }), l;
    }
    var qe = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, pa = ll(qe), nu = $({}, qe, { view: 0, detail: 0 }), uy = ll(nu), uf, af, uu, Sa = $({}, nu, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: cf,
      button: 0,
      buttons: 0,
      relatedTarget: function(t) {
        return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
      },
      movementX: function(t) {
        return "movementX" in t ? t.movementX : (t !== uu && (uu && t.type === "mousemove" ? (uf = t.screenX - uu.screenX, af = t.screenY - uu.screenY) : af = uf = 0, uu = t), uf);
      },
      movementY: function(t) {
        return "movementY" in t ? t.movementY : af;
      }
    }), ns = ll(Sa), ay = $({}, Sa, { dataTransfer: 0 }), iy = ll(ay), fy = $({}, nu, { relatedTarget: 0 }), ff = ll(fy), cy = $({}, qe, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), ry = ll(cy), sy = $({}, qe, {
      clipboardData: function(t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      }
    }), oy = ll(sy), hy = $({}, qe, { data: 0 }), us = ll(hy), dy = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, yy = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, vy = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function my(t) {
      var l = this.nativeEvent;
      return l.getModifierState ? l.getModifierState(t) : (t = vy[t]) ? !!l[t] : !1;
    }
    function cf() {
      return my;
    }
    var gy = $({}, nu, {
      key: function(t) {
        if (t.key) {
          var l = dy[t.key] || t.key;
          if (l !== "Unidentified") return l;
        }
        return t.type === "keypress" ? (t = ga(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? yy[t.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: cf,
      charCode: function(t) {
        return t.type === "keypress" ? ga(t) : 0;
      },
      keyCode: function(t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function(t) {
        return t.type === "keypress" ? ga(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      }
    }), _y = ll(gy), py = $({}, Sa, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), as = ll(py), Sy = $({}, nu, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: cf
    }), by = ll(Sy), Ay = $({}, qe, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ey = ll(Ay), xy = $({}, Sa, {
      deltaX: function(t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function(t) {
        return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), My = ll(xy), Ty = $({}, qe, {
      newState: 0,
      oldState: 0
    }), zy = ll(Ty), Oy = [9, 13, 27, 32], rf = Zl && "CompositionEvent" in window, au = null;
    Zl && "documentMode" in document && (au = document.documentMode);
    var Dy = Zl && "TextEvent" in window && !au, is = Zl && (!rf || au && 8 < au && 11 >= au), fs = " ", cs = !1;
    function rs(t, l) {
      switch (t) {
        case "keyup":
          return Oy.indexOf(l.keyCode) !== -1;
        case "keydown":
          return l.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function ss(t) {
      return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
    }
    var mn = !1;
    function Ry(t, l) {
      switch (t) {
        case "compositionend":
          return ss(l);
        case "keypress":
          return l.which !== 32 ? null : (cs = !0, fs);
        case "textInput":
          return t = l.data, t === fs && cs ? null : t;
        default:
          return null;
      }
    }
    function Ny(t, l) {
      if (mn)
        return t === "compositionend" || !rf && rs(t, l) ? (t = ls(), ma = nf = se = null, mn = !1, t) : null;
      switch (t) {
        case "paste":
          return null;
        case "keypress":
          if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
            if (l.char && 1 < l.char.length)
              return l.char;
            if (l.which) return String.fromCharCode(l.which);
          }
          return null;
        case "compositionend":
          return is && l.locale !== "ko" ? null : l.data;
        default:
          return null;
      }
    }
    var Uy = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function os(t) {
      var l = t && t.nodeName && t.nodeName.toLowerCase();
      return l === "input" ? !!Uy[t.type] : l === "textarea";
    }
    function hs(t, l, e, n) {
      yn ? vn ? vn.push(n) : vn = [n] : yn = n, l = ni(l, "onChange"), 0 < l.length && (e = new pa(
        "onChange",
        "change",
        null,
        e,
        n
      ), t.push({ event: e, listeners: l }));
    }
    var iu = null, fu = null;
    function Hy(t) {
      Xh(t, 0);
    }
    function ba(t) {
      var l = tu(t);
      if ($r(l)) return t;
    }
    function ds(t, l) {
      if (t === "change") return l;
    }
    var ys = !1;
    if (Zl) {
      var sf;
      if (Zl) {
        var of = "oninput" in document;
        if (!of) {
          var vs = document.createElement("div");
          vs.setAttribute("oninput", "return;"), of = typeof vs.oninput == "function";
        }
        sf = of;
      } else sf = !1;
      ys = sf && (!document.documentMode || 9 < document.documentMode);
    }
    function ms() {
      iu && (iu.detachEvent("onpropertychange", gs), fu = iu = null);
    }
    function gs(t) {
      if (t.propertyName === "value" && ba(fu)) {
        var l = [];
        hs(
          l,
          fu,
          t,
          tf(t)
        ), ts(Hy, l);
      }
    }
    function wy(t, l, e) {
      t === "focusin" ? (ms(), iu = l, fu = e, iu.attachEvent("onpropertychange", gs)) : t === "focusout" && ms();
    }
    function qy(t) {
      if (t === "selectionchange" || t === "keyup" || t === "keydown")
        return ba(fu);
    }
    function Yy(t, l) {
      if (t === "click") return ba(l);
    }
    function By(t, l) {
      if (t === "input" || t === "change")
        return ba(l);
    }
    function Cy(t, l) {
      return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
    }
    var cl = typeof Object.is == "function" ? Object.is : Cy;
    function cu(t, l) {
      if (cl(t, l)) return !0;
      if (typeof t != "object" || t === null || typeof l != "object" || l === null)
        return !1;
      var e = Object.keys(t), n = Object.keys(l);
      if (e.length !== n.length) return !1;
      for (n = 0; n < e.length; n++) {
        var a = e[n];
        if (!Vi.call(l, a) || !cl(t[a], l[a]))
          return !1;
      }
      return !0;
    }
    function _s(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function ps(t, l) {
      var e = _s(t);
      t = 0;
      for (var n; e; ) {
        if (e.nodeType === 3) {
          if (n = t + e.textContent.length, t <= l && n >= l)
            return { node: e, offset: l - t };
          t = n;
        }
        t: {
          for (; e; ) {
            if (e.nextSibling) {
              e = e.nextSibling;
              break t;
            }
            e = e.parentNode;
          }
          e = void 0;
        }
        e = _s(e);
      }
    }
    function Ss(t, l) {
      return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Ss(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
    }
    function bs(t) {
      t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
      for (var l = ya(t.document); l instanceof t.HTMLIFrameElement; ) {
        try {
          var e = typeof l.contentWindow.location.href == "string";
        } catch {
          e = !1;
        }
        if (e) t = l.contentWindow;
        else break;
        l = ya(t.document);
      }
      return l;
    }
    function hf(t) {
      var l = t && t.nodeName && t.nodeName.toLowerCase();
      return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
    }
    function Xy(t, l) {
      var e = bs(l);
      l = t.focusedElem;
      var n = t.selectionRange;
      if (e !== l && l && l.ownerDocument && Ss(l.ownerDocument.documentElement, l)) {
        if (n !== null && hf(l)) {
          if (t = n.start, e = n.end, e === void 0 && (e = t), "selectionStart" in l)
            l.selectionStart = t, l.selectionEnd = Math.min(
              e,
              l.value.length
            );
          else if (e = (t = l.ownerDocument || document) && t.defaultView || window, e.getSelection) {
            e = e.getSelection();
            var a = l.textContent.length, f = Math.min(n.start, a);
            n = n.end === void 0 ? f : Math.min(n.end, a), !e.extend && f > n && (a = n, n = f, f = a), a = ps(l, f);
            var s = ps(
              l,
              n
            );
            a && s && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), f > n ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(
              s.node,
              s.offset
            ), e.addRange(t)));
          }
        }
        for (t = [], e = l; e = e.parentNode; )
          e.nodeType === 1 && t.push({
            element: e,
            left: e.scrollLeft,
            top: e.scrollTop
          });
        for (typeof l.focus == "function" && l.focus(), l = 0; l < t.length; l++)
          e = t[l], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
      }
    }
    var Gy = Zl && "documentMode" in document && 11 >= document.documentMode, gn = null, df = null, ru = null, yf = !1;
    function As(t, l, e) {
      var n = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
      yf || gn == null || gn !== ya(n) || (n = gn, "selectionStart" in n && hf(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
        anchorNode: n.anchorNode,
        anchorOffset: n.anchorOffset,
        focusNode: n.focusNode,
        focusOffset: n.focusOffset
      }), ru && cu(ru, n) || (ru = n, n = ni(df, "onSelect"), 0 < n.length && (l = new pa(
        "onSelect",
        "select",
        null,
        l,
        e
      ), t.push({ event: l, listeners: n }), l.target = gn)));
    }
    function Ye(t, l) {
      var e = {};
      return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
    }
    var _n = {
      animationend: Ye("Animation", "AnimationEnd"),
      animationiteration: Ye("Animation", "AnimationIteration"),
      animationstart: Ye("Animation", "AnimationStart"),
      transitionrun: Ye("Transition", "TransitionRun"),
      transitionstart: Ye("Transition", "TransitionStart"),
      transitioncancel: Ye("Transition", "TransitionCancel"),
      transitionend: Ye("Transition", "TransitionEnd")
    }, vf = {}, Es = {};
    Zl && (Es = document.createElement("div").style, "AnimationEvent" in window || (delete _n.animationend.animation, delete _n.animationiteration.animation, delete _n.animationstart.animation), "TransitionEvent" in window || delete _n.transitionend.transition);
    function Be(t) {
      if (vf[t]) return vf[t];
      if (!_n[t]) return t;
      var l = _n[t], e;
      for (e in l)
        if (l.hasOwnProperty(e) && e in Es)
          return vf[t] = l[e];
      return t;
    }
    var xs = Be("animationend"), Ms = Be("animationiteration"), Ts = Be("animationstart"), Qy = Be("transitionrun"), Zy = Be("transitionstart"), jy = Be("transitioncancel"), zs = Be("transitionend"), Os = /* @__PURE__ */ new Map(), Ds = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
      " "
    );
    function Ml(t, l) {
      Os.set(t, l), we(l, [t]);
    }
    var vl = [], pn = 0, mf = 0;
    function Aa() {
      for (var t = pn, l = mf = pn = 0; l < t; ) {
        var e = vl[l];
        vl[l++] = null;
        var n = vl[l];
        vl[l++] = null;
        var a = vl[l];
        vl[l++] = null;
        var f = vl[l];
        if (vl[l++] = null, n !== null && a !== null) {
          var s = n.pending;
          s === null ? a.next = a : (a.next = s.next, s.next = a), n.pending = a;
        }
        f !== 0 && Rs(e, a, f);
      }
    }
    function Ea(t, l, e, n) {
      vl[pn++] = t, vl[pn++] = l, vl[pn++] = e, vl[pn++] = n, mf |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
    }
    function gf(t, l, e, n) {
      return Ea(t, l, e, n), xa(t);
    }
    function oe(t, l) {
      return Ea(t, null, null, l), xa(t);
    }
    function Rs(t, l, e) {
      t.lanes |= e;
      var n = t.alternate;
      n !== null && (n.lanes |= e);
      for (var a = !1, f = t.return; f !== null; )
        f.childLanes |= e, n = f.alternate, n !== null && (n.childLanes |= e), f.tag === 22 && (t = f.stateNode, t === null || t._visibility & 1 || (a = !0)), t = f, f = f.return;
      a && l !== null && t.tag === 3 && (f = t.stateNode, a = 31 - fl(e), f = f.hiddenUpdates, t = f[a], t === null ? f[a] = [l] : t.push(l), l.lane = e | 536870912);
    }
    function xa(t) {
      if (50 < wu)
        throw wu = 0, Ec = null, Error(c(185));
      for (var l = t.return; l !== null; )
        t = l, l = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    var Sn = {}, Ns = /* @__PURE__ */ new WeakMap();
    function ml(t, l) {
      if (typeof t == "object" && t !== null) {
        var e = Ns.get(t);
        return e !== void 0 ? e : (l = {
          value: t,
          source: l,
          stack: Y(l)
        }, Ns.set(t, l), l);
      }
      return {
        value: t,
        source: l,
        stack: Y(l)
      };
    }
    var bn = [], An = 0, Ma = null, Ta = 0, gl = [], _l = 0, Ce = null, Vl = 1, Ll = "";
    function Xe(t, l) {
      bn[An++] = Ta, bn[An++] = Ma, Ma = t, Ta = l;
    }
    function Us(t, l, e) {
      gl[_l++] = Vl, gl[_l++] = Ll, gl[_l++] = Ce, Ce = t;
      var n = Vl;
      t = Ll;
      var a = 32 - fl(n) - 1;
      n &= ~(1 << a), e += 1;
      var f = 32 - fl(l) + a;
      if (30 < f) {
        var s = a - a % 5;
        f = (n & (1 << s) - 1).toString(32), n >>= s, a -= s, Vl = 1 << 32 - fl(l) + a | e << a | n, Ll = f + t;
      } else
        Vl = 1 << f | e << a | n, Ll = t;
    }
    function _f(t) {
      t.return !== null && (Xe(t, 1), Us(t, 1, 0));
    }
    function pf(t) {
      for (; t === Ma; )
        Ma = bn[--An], bn[An] = null, Ta = bn[--An], bn[An] = null;
      for (; t === Ce; )
        Ce = gl[--_l], gl[_l] = null, Ll = gl[--_l], gl[_l] = null, Vl = gl[--_l], gl[_l] = null;
    }
    var Pt = null, Lt = null, gt = !1, Tl = null, wl = !1, Sf = Error(c(519));
    function Ge(t) {
      var l = Error(c(418, ""));
      throw hu(ml(l, t)), Sf;
    }
    function Hs(t) {
      var l = t.stateNode, e = t.type, n = t.memoizedProps;
      switch (l[Jt] = t, l[tl] = n, e) {
        case "dialog":
          yt("cancel", l), yt("close", l);
          break;
        case "iframe":
        case "object":
        case "embed":
          yt("load", l);
          break;
        case "video":
        case "audio":
          for (e = 0; e < Yu.length; e++)
            yt(Yu[e], l);
          break;
        case "source":
          yt("error", l);
          break;
        case "img":
        case "image":
        case "link":
          yt("error", l), yt("load", l);
          break;
        case "details":
          yt("toggle", l);
          break;
        case "input":
          yt("invalid", l), Jr(
            l,
            n.value,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name,
            !0
          ), da(l);
          break;
        case "select":
          yt("invalid", l);
          break;
        case "textarea":
          yt("invalid", l), Wr(l, n.value, n.defaultValue, n.children), da(l);
      }
      e = n.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || n.suppressHydrationWarning === !0 || jh(l.textContent, e) ? (n.popover != null && (yt("beforetoggle", l), yt("toggle", l)), n.onScroll != null && yt("scroll", l), n.onScrollEnd != null && yt("scrollend", l), n.onClick != null && (l.onclick = ui), l = !0) : l = !1, l || Ge(t);
    }
    function ws(t) {
      for (Pt = t.return; Pt; )
        switch (Pt.tag) {
          case 3:
          case 27:
            wl = !0;
            return;
          case 5:
          case 13:
            wl = !1;
            return;
          default:
            Pt = Pt.return;
        }
    }
    function su(t) {
      if (t !== Pt) return !1;
      if (!gt) return ws(t), gt = !0, !1;
      var l = !1, e;
      if ((e = t.tag !== 3 && t.tag !== 27) && ((e = t.tag === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Gc(t.type, t.memoizedProps)), e = !e), e && (l = !0), l && Lt && Ge(t), ws(t), t.tag === 13) {
        if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(c(317));
        t: {
          for (t = t.nextSibling, l = 0; t; ) {
            if (t.nodeType === 8)
              if (e = t.data, e === "/$") {
                if (l === 0) {
                  Lt = Ol(t.nextSibling);
                  break t;
                }
                l--;
              } else
                e !== "$" && e !== "$!" && e !== "$?" || l++;
            t = t.nextSibling;
          }
          Lt = null;
        }
      } else
        Lt = Pt ? Ol(t.stateNode.nextSibling) : null;
      return !0;
    }
    function ou() {
      Lt = Pt = null, gt = !1;
    }
    function hu(t) {
      Tl === null ? Tl = [t] : Tl.push(t);
    }
    var du = Error(c(460)), qs = Error(c(474)), bf = { then: function() {
    } };
    function Ys(t) {
      return t = t.status, t === "fulfilled" || t === "rejected";
    }
    function za() {
    }
    function Bs(t, l, e) {
      switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(za, za), l = e), l.status) {
        case "fulfilled":
          return l.value;
        case "rejected":
          throw t = l.reason, t === du ? Error(c(483)) : t;
        default:
          if (typeof l.status == "string") l.then(za, za);
          else {
            if (t = xt, t !== null && 100 < t.shellSuspendCounter)
              throw Error(c(482));
            t = l, t.status = "pending", t.then(
              function(n) {
                if (l.status === "pending") {
                  var a = l;
                  a.status = "fulfilled", a.value = n;
                }
              },
              function(n) {
                if (l.status === "pending") {
                  var a = l;
                  a.status = "rejected", a.reason = n;
                }
              }
            );
          }
          switch (l.status) {
            case "fulfilled":
              return l.value;
            case "rejected":
              throw t = l.reason, t === du ? Error(c(483)) : t;
          }
          throw yu = l, du;
      }
    }
    var yu = null;
    function Cs() {
      if (yu === null) throw Error(c(459));
      var t = yu;
      return yu = null, t;
    }
    var En = null, vu = 0;
    function Oa(t) {
      var l = vu;
      return vu += 1, En === null && (En = []), Bs(En, t, l);
    }
    function mu(t, l) {
      l = l.props.ref, t.ref = l !== void 0 ? l : null;
    }
    function Da(t, l) {
      throw l.$$typeof === d ? Error(c(525)) : (t = Object.prototype.toString.call(l), Error(
        c(
          31,
          t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
        )
      ));
    }
    function Xs(t) {
      var l = t._init;
      return l(t._payload);
    }
    function Gs(t) {
      function l(E, b) {
        if (t) {
          var T = E.deletions;
          T === null ? (E.deletions = [b], E.flags |= 16) : T.push(b);
        }
      }
      function e(E, b) {
        if (!t) return null;
        for (; b !== null; )
          l(E, b), b = b.sibling;
        return null;
      }
      function n(E) {
        for (var b = /* @__PURE__ */ new Map(); E !== null; )
          E.key !== null ? b.set(E.key, E) : b.set(E.index, E), E = E.sibling;
        return b;
      }
      function a(E, b) {
        return E = Ee(E, b), E.index = 0, E.sibling = null, E;
      }
      function f(E, b, T) {
        return E.index = T, t ? (T = E.alternate, T !== null ? (T = T.index, T < b ? (E.flags |= 33554434, b) : T) : (E.flags |= 33554434, b)) : (E.flags |= 1048576, b);
      }
      function s(E) {
        return t && E.alternate === null && (E.flags |= 33554434), E;
      }
      function y(E, b, T, U) {
        return b === null || b.tag !== 6 ? (b = vc(T, E.mode, U), b.return = E, b) : (b = a(b, T), b.return = E, b);
      }
      function _(E, b, T, U) {
        var j = T.type;
        return j === g ? R(
          E,
          b,
          T.props.children,
          U,
          T.key
        ) : b !== null && (b.elementType === j || typeof j == "object" && j !== null && j.$$typeof === et && Xs(j) === b.type) ? (b = a(b, T.props), mu(b, T), b.return = E, b) : (b = $a(
          T.type,
          T.key,
          T.props,
          null,
          E.mode,
          U
        ), mu(b, T), b.return = E, b);
      }
      function A(E, b, T, U) {
        return b === null || b.tag !== 4 || b.stateNode.containerInfo !== T.containerInfo || b.stateNode.implementation !== T.implementation ? (b = mc(T, E.mode, U), b.return = E, b) : (b = a(b, T.children || []), b.return = E, b);
      }
      function R(E, b, T, U, j) {
        return b === null || b.tag !== 7 ? (b = We(
          T,
          E.mode,
          U,
          j
        ), b.return = E, b) : (b = a(b, T), b.return = E, b);
      }
      function H(E, b, T) {
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
          return b = vc(
            "" + b,
            E.mode,
            T
          ), b.return = E, b;
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case v:
              return T = $a(
                b.type,
                b.key,
                b.props,
                null,
                E.mode,
                T
              ), mu(T, b), T.return = E, T;
            case m:
              return b = mc(
                b,
                E.mode,
                T
              ), b.return = E, b;
            case et:
              var U = b._init;
              return b = U(b._payload), H(E, b, T);
          }
          if (k(b) || dt(b))
            return b = We(
              b,
              E.mode,
              T,
              null
            ), b.return = E, b;
          if (typeof b.then == "function")
            return H(E, Oa(b), T);
          if (b.$$typeof === N)
            return H(
              E,
              Va(E, b),
              T
            );
          Da(E, b);
        }
        return null;
      }
      function z(E, b, T, U) {
        var j = b !== null ? b.key : null;
        if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
          return j !== null ? null : y(E, b, "" + T, U);
        if (typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case v:
              return T.key === j ? _(E, b, T, U) : null;
            case m:
              return T.key === j ? A(E, b, T, U) : null;
            case et:
              return j = T._init, T = j(T._payload), z(E, b, T, U);
          }
          if (k(T) || dt(T))
            return j !== null ? null : R(E, b, T, U, null);
          if (typeof T.then == "function")
            return z(
              E,
              b,
              Oa(T),
              U
            );
          if (T.$$typeof === N)
            return z(
              E,
              b,
              Va(E, T),
              U
            );
          Da(E, T);
        }
        return null;
      }
      function D(E, b, T, U, j) {
        if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
          return E = E.get(T) || null, y(b, E, "" + U, j);
        if (typeof U == "object" && U !== null) {
          switch (U.$$typeof) {
            case v:
              return E = E.get(
                U.key === null ? T : U.key
              ) || null, _(b, E, U, j);
            case m:
              return E = E.get(
                U.key === null ? T : U.key
              ) || null, A(b, E, U, j);
            case et:
              var ot = U._init;
              return U = ot(U._payload), D(
                E,
                b,
                T,
                U,
                j
              );
          }
          if (k(U) || dt(U))
            return E = E.get(T) || null, R(b, E, U, j, null);
          if (typeof U.then == "function")
            return D(
              E,
              b,
              T,
              Oa(U),
              j
            );
          if (U.$$typeof === N)
            return D(
              E,
              b,
              T,
              Va(b, U),
              j
            );
          Da(b, U);
        }
        return null;
      }
      function L(E, b, T, U) {
        for (var j = null, ot = null, J = b, P = b = 0, Vt = null; J !== null && P < T.length; P++) {
          J.index > P ? (Vt = J, J = null) : Vt = J.sibling;
          var _t = z(
            E,
            J,
            T[P],
            U
          );
          if (_t === null) {
            J === null && (J = Vt);
            break;
          }
          t && J && _t.alternate === null && l(E, J), b = f(_t, b, P), ot === null ? j = _t : ot.sibling = _t, ot = _t, J = Vt;
        }
        if (P === T.length)
          return e(E, J), gt && Xe(E, P), j;
        if (J === null) {
          for (; P < T.length; P++)
            J = H(E, T[P], U), J !== null && (b = f(
              J,
              b,
              P
            ), ot === null ? j = J : ot.sibling = J, ot = J);
          return gt && Xe(E, P), j;
        }
        for (J = n(J); P < T.length; P++)
          Vt = D(
            J,
            E,
            P,
            T[P],
            U
          ), Vt !== null && (t && Vt.alternate !== null && J.delete(
            Vt.key === null ? P : Vt.key
          ), b = f(
            Vt,
            b,
            P
          ), ot === null ? j = Vt : ot.sibling = Vt, ot = Vt);
        return t && J.forEach(function(Re) {
          return l(E, Re);
        }), gt && Xe(E, P), j;
      }
      function it(E, b, T, U) {
        if (T == null) throw Error(c(151));
        for (var j = null, ot = null, J = b, P = b = 0, Vt = null, _t = T.next(); J !== null && !_t.done; P++, _t = T.next()) {
          J.index > P ? (Vt = J, J = null) : Vt = J.sibling;
          var Re = z(E, J, _t.value, U);
          if (Re === null) {
            J === null && (J = Vt);
            break;
          }
          t && J && Re.alternate === null && l(E, J), b = f(Re, b, P), ot === null ? j = Re : ot.sibling = Re, ot = Re, J = Vt;
        }
        if (_t.done)
          return e(E, J), gt && Xe(E, P), j;
        if (J === null) {
          for (; !_t.done; P++, _t = T.next())
            _t = H(E, _t.value, U), _t !== null && (b = f(_t, b, P), ot === null ? j = _t : ot.sibling = _t, ot = _t);
          return gt && Xe(E, P), j;
        }
        for (J = n(J); !_t.done; P++, _t = T.next())
          _t = D(J, E, P, _t.value, U), _t !== null && (t && _t.alternate !== null && J.delete(_t.key === null ? P : _t.key), b = f(_t, b, P), ot === null ? j = _t : ot.sibling = _t, ot = _t);
        return t && J.forEach(function(n1) {
          return l(E, n1);
        }), gt && Xe(E, P), j;
      }
      function Ht(E, b, T, U) {
        if (typeof T == "object" && T !== null && T.type === g && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case v:
              t: {
                for (var j = T.key; b !== null; ) {
                  if (b.key === j) {
                    if (j = T.type, j === g) {
                      if (b.tag === 7) {
                        e(
                          E,
                          b.sibling
                        ), U = a(
                          b,
                          T.props.children
                        ), U.return = E, E = U;
                        break t;
                      }
                    } else if (b.elementType === j || typeof j == "object" && j !== null && j.$$typeof === et && Xs(j) === b.type) {
                      e(
                        E,
                        b.sibling
                      ), U = a(b, T.props), mu(U, T), U.return = E, E = U;
                      break t;
                    }
                    e(E, b);
                    break;
                  } else l(E, b);
                  b = b.sibling;
                }
                T.type === g ? (U = We(
                  T.props.children,
                  E.mode,
                  U,
                  T.key
                ), U.return = E, E = U) : (U = $a(
                  T.type,
                  T.key,
                  T.props,
                  null,
                  E.mode,
                  U
                ), mu(U, T), U.return = E, E = U);
              }
              return s(E);
            case m:
              t: {
                for (j = T.key; b !== null; ) {
                  if (b.key === j)
                    if (b.tag === 4 && b.stateNode.containerInfo === T.containerInfo && b.stateNode.implementation === T.implementation) {
                      e(
                        E,
                        b.sibling
                      ), U = a(b, T.children || []), U.return = E, E = U;
                      break t;
                    } else {
                      e(E, b);
                      break;
                    }
                  else l(E, b);
                  b = b.sibling;
                }
                U = mc(T, E.mode, U), U.return = E, E = U;
              }
              return s(E);
            case et:
              return j = T._init, T = j(T._payload), Ht(
                E,
                b,
                T,
                U
              );
          }
          if (k(T))
            return L(
              E,
              b,
              T,
              U
            );
          if (dt(T)) {
            if (j = dt(T), typeof j != "function") throw Error(c(150));
            return T = j.call(T), it(
              E,
              b,
              T,
              U
            );
          }
          if (typeof T.then == "function")
            return Ht(
              E,
              b,
              Oa(T),
              U
            );
          if (T.$$typeof === N)
            return Ht(
              E,
              b,
              Va(E, T),
              U
            );
          Da(E, T);
        }
        return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, b !== null && b.tag === 6 ? (e(E, b.sibling), U = a(b, T), U.return = E, E = U) : (e(E, b), U = vc(T, E.mode, U), U.return = E, E = U), s(E)) : e(E, b);
      }
      return function(E, b, T, U) {
        try {
          vu = 0;
          var j = Ht(
            E,
            b,
            T,
            U
          );
          return En = null, j;
        } catch (J) {
          if (J === du) throw J;
          var ot = Al(29, J, null, E.mode);
          return ot.lanes = U, ot.return = E, ot;
        } finally {
        }
      };
    }
    var Qe = Gs(!0), Qs = Gs(!1), xn = vt(null), Ra = vt(0);
    function Zs(t, l) {
      t = ee, At(Ra, t), At(xn, l), ee = t | l.baseLanes;
    }
    function Af() {
      At(Ra, ee), At(xn, xn.current);
    }
    function Ef() {
      ee = Ra.current, Tt(xn), Tt(Ra);
    }
    var pl = vt(null), ql = null;
    function he(t) {
      var l = t.alternate;
      At(Xt, Xt.current & 1), At(pl, t), ql === null && (l === null || xn.current !== null || l.memoizedState !== null) && (ql = t);
    }
    function js(t) {
      if (t.tag === 22) {
        if (At(Xt, Xt.current), At(pl, t), ql === null) {
          var l = t.alternate;
          l !== null && l.memoizedState !== null && (ql = t);
        }
      } else de();
    }
    function de() {
      At(Xt, Xt.current), At(pl, pl.current);
    }
    function Kl(t) {
      Tt(pl), ql === t && (ql = null), Tt(Xt);
    }
    var Xt = vt(0);
    function Na(t) {
      for (var l = t; l !== null; ) {
        if (l.tag === 13) {
          var e = l.memoizedState;
          if (e !== null && (e = e.dehydrated, e === null || e.data === "$?" || e.data === "$!"))
            return l;
        } else if (l.tag === 19 && l.memoizedProps.revealOrder !== void 0) {
          if ((l.flags & 128) !== 0) return l;
        } else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return null;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
      return null;
    }
    var Vy = typeof AbortController < "u" ? AbortController : function() {
      var t = [], l = this.signal = {
        aborted: !1,
        addEventListener: function(e, n) {
          t.push(n);
        }
      };
      this.abort = function() {
        l.aborted = !0, t.forEach(function(e) {
          return e();
        });
      };
    }, Ly = u.unstable_scheduleCallback, Ky = u.unstable_NormalPriority, Gt = {
      $$typeof: N,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function xf() {
      return {
        controller: new Vy(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function gu(t) {
      t.refCount--, t.refCount === 0 && Ly(Ky, function() {
        t.controller.abort();
      });
    }
    var _u = null, Mf = 0, Mn = 0, Tn = null;
    function $y(t, l) {
      if (_u === null) {
        var e = _u = [];
        Mf = 0, Mn = Nc(), Tn = {
          status: "pending",
          value: void 0,
          then: function(n) {
            e.push(n);
          }
        };
      }
      return Mf++, l.then(Vs, Vs), l;
    }
    function Vs() {
      if (--Mf === 0 && _u !== null) {
        Tn !== null && (Tn.status = "fulfilled");
        var t = _u;
        _u = null, Mn = 0, Tn = null;
        for (var l = 0; l < t.length; l++) (0, t[l])();
      }
    }
    function Jy(t, l) {
      var e = [], n = {
        status: "pending",
        value: null,
        reason: null,
        then: function(a) {
          e.push(a);
        }
      };
      return t.then(
        function() {
          n.status = "fulfilled", n.value = l;
          for (var a = 0; a < e.length; a++) (0, e[a])(l);
        },
        function(a) {
          for (n.status = "rejected", n.reason = a, a = 0; a < e.length; a++)
            (0, e[a])(void 0);
        }
      ), n;
    }
    var Ls = C.S;
    C.S = function(t, l) {
      typeof l == "object" && l !== null && typeof l.then == "function" && $y(t, l), Ls !== null && Ls(t, l);
    };
    var Ze = vt(null);
    function Tf() {
      var t = Ze.current;
      return t !== null ? t : xt.pooledCache;
    }
    function Ua(t, l) {
      l === null ? At(Ze, Ze.current) : At(Ze, l.pool);
    }
    function Ks() {
      var t = Tf();
      return t === null ? null : { parent: Gt._currentValue, pool: t };
    }
    var ye = 0, st = null, pt = null, qt = null, Ha = !1, zn = !1, je = !1, wa = 0, pu = 0, On = null, ky = 0;
    function wt() {
      throw Error(c(321));
    }
    function zf(t, l) {
      if (l === null) return !1;
      for (var e = 0; e < l.length && e < t.length; e++)
        if (!cl(t[e], l[e])) return !1;
      return !0;
    }
    function Of(t, l, e, n, a, f) {
      return ye = f, st = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, C.H = t === null || t.memoizedState === null ? Ve : ve, je = !1, f = e(n, a), je = !1, zn && (f = Js(
        l,
        e,
        n,
        a
      )), $s(t), f;
    }
    function $s(t) {
      C.H = Yl;
      var l = pt !== null && pt.next !== null;
      if (ye = 0, qt = pt = st = null, Ha = !1, pu = 0, On = null, l) throw Error(c(300));
      t === null || Zt || (t = t.dependencies, t !== null && ja(t) && (Zt = !0));
    }
    function Js(t, l, e, n) {
      st = t;
      var a = 0;
      do {
        if (zn && (On = null), pu = 0, zn = !1, 25 <= a) throw Error(c(301));
        if (a += 1, qt = pt = null, t.updateQueue != null) {
          var f = t.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        C.H = Le, f = l(e, n);
      } while (zn);
      return f;
    }
    function Wy() {
      var t = C.H, l = t.useState()[0];
      return l = typeof l.then == "function" ? Su(l) : l, t = t.useState()[0], (pt !== null ? pt.memoizedState : null) !== t && (st.flags |= 1024), l;
    }
    function Df() {
      var t = wa !== 0;
      return wa = 0, t;
    }
    function Rf(t, l, e) {
      l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
    }
    function Nf(t) {
      if (Ha) {
        for (t = t.memoizedState; t !== null; ) {
          var l = t.queue;
          l !== null && (l.pending = null), t = t.next;
        }
        Ha = !1;
      }
      ye = 0, qt = pt = st = null, zn = !1, pu = wa = 0, On = null;
    }
    function el() {
      var t = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return qt === null ? st.memoizedState = qt = t : qt = qt.next = t, qt;
    }
    function Yt() {
      if (pt === null) {
        var t = st.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = pt.next;
      var l = qt === null ? st.memoizedState : qt.next;
      if (l !== null)
        qt = l, pt = t;
      else {
        if (t === null)
          throw st.alternate === null ? Error(c(467)) : Error(c(310));
        pt = t, t = {
          memoizedState: pt.memoizedState,
          baseState: pt.baseState,
          baseQueue: pt.baseQueue,
          queue: pt.queue,
          next: null
        }, qt === null ? st.memoizedState = qt = t : qt = qt.next = t;
      }
      return qt;
    }
    var qa;
    qa = function() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    };
    function Su(t) {
      var l = pu;
      return pu += 1, On === null && (On = []), t = Bs(On, t, l), l = st, (qt === null ? l.memoizedState : qt.next) === null && (l = l.alternate, C.H = l === null || l.memoizedState === null ? Ve : ve), t;
    }
    function Ya(t) {
      if (t !== null && typeof t == "object") {
        if (typeof t.then == "function") return Su(t);
        if (t.$$typeof === N) return kt(t);
      }
      throw Error(c(438, String(t)));
    }
    function Uf(t) {
      var l = null, e = st.updateQueue;
      if (e !== null && (l = e.memoCache), l == null) {
        var n = st.alternate;
        n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (l = {
          data: n.data.map(function(a) {
            return a.slice();
          }),
          index: 0
        })));
      }
      if (l == null && (l = { data: [], index: 0 }), e === null && (e = qa(), st.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
        for (e = l.data[l.index] = Array(t), n = 0; n < t; n++)
          e[n] = F;
      return l.index++, e;
    }
    function $l(t, l) {
      return typeof l == "function" ? l(t) : l;
    }
    function Ba(t) {
      var l = Yt();
      return Hf(l, pt, t);
    }
    function Hf(t, l, e) {
      var n = t.queue;
      if (n === null) throw Error(c(311));
      n.lastRenderedReducer = e;
      var a = t.baseQueue, f = n.pending;
      if (f !== null) {
        if (a !== null) {
          var s = a.next;
          a.next = f.next, f.next = s;
        }
        l.baseQueue = a = f, n.pending = null;
      }
      if (f = t.baseState, a === null) t.memoizedState = f;
      else {
        l = a.next;
        var y = s = null, _ = null, A = l, R = !1;
        do {
          var H = A.lane & -536870913;
          if (H !== A.lane ? (mt & H) === H : (ye & H) === H) {
            var z = A.revertLane;
            if (z === 0)
              _ !== null && (_ = _.next = {
                lane: 0,
                revertLane: 0,
                action: A.action,
                hasEagerState: A.hasEagerState,
                eagerState: A.eagerState,
                next: null
              }), H === Mn && (R = !0);
            else if ((ye & z) === z) {
              A = A.next, z === Mn && (R = !0);
              continue;
            } else
              H = {
                lane: 0,
                revertLane: A.revertLane,
                action: A.action,
                hasEagerState: A.hasEagerState,
                eagerState: A.eagerState,
                next: null
              }, _ === null ? (y = _ = H, s = f) : _ = _.next = H, st.lanes |= z, xe |= z;
            H = A.action, je && e(f, H), f = A.hasEagerState ? A.eagerState : e(f, H);
          } else
            z = {
              lane: H,
              revertLane: A.revertLane,
              action: A.action,
              hasEagerState: A.hasEagerState,
              eagerState: A.eagerState,
              next: null
            }, _ === null ? (y = _ = z, s = f) : _ = _.next = z, st.lanes |= H, xe |= H;
          A = A.next;
        } while (A !== null && A !== l);
        if (_ === null ? s = f : _.next = y, !cl(f, t.memoizedState) && (Zt = !0, R && (e = Tn, e !== null)))
          throw e;
        t.memoizedState = f, t.baseState = s, t.baseQueue = _, n.lastRenderedState = f;
      }
      return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
    }
    function wf(t) {
      var l = Yt(), e = l.queue;
      if (e === null) throw Error(c(311));
      e.lastRenderedReducer = t;
      var n = e.dispatch, a = e.pending, f = l.memoizedState;
      if (a !== null) {
        e.pending = null;
        var s = a = a.next;
        do
          f = t(f, s.action), s = s.next;
        while (s !== a);
        cl(f, l.memoizedState) || (Zt = !0), l.memoizedState = f, l.baseQueue === null && (l.baseState = f), e.lastRenderedState = f;
      }
      return [f, n];
    }
    function ks(t, l, e) {
      var n = st, a = Yt(), f = gt;
      if (f) {
        if (e === void 0) throw Error(c(407));
        e = e();
      } else e = l();
      var s = !cl(
        (pt || a).memoizedState,
        e
      );
      if (s && (a.memoizedState = e, Zt = !0), a = a.queue, Bf(Ps.bind(null, n, a, t), [
        t
      ]), a.getSnapshot !== l || s || qt !== null && qt.memoizedState.tag & 1) {
        if (n.flags |= 2048, Dn(
          9,
          Fs.bind(
            null,
            n,
            a,
            e,
            l
          ),
          { destroy: void 0 },
          null
        ), xt === null) throw Error(c(349));
        f || (ye & 60) !== 0 || Ws(n, l, e);
      }
      return e;
    }
    function Ws(t, l, e) {
      t.flags |= 16384, t = { getSnapshot: l, value: e }, l = st.updateQueue, l === null ? (l = qa(), st.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
    }
    function Fs(t, l, e, n) {
      l.value = e, l.getSnapshot = n, Is(l) && to(t);
    }
    function Ps(t, l, e) {
      return e(function() {
        Is(l) && to(t);
      });
    }
    function Is(t) {
      var l = t.getSnapshot;
      t = t.value;
      try {
        var e = l();
        return !cl(t, e);
      } catch {
        return !0;
      }
    }
    function to(t) {
      var l = oe(t, 2);
      l !== null && It(l, t, 2);
    }
    function qf(t) {
      var l = el();
      if (typeof t == "function") {
        var e = t;
        if (t = e(), je) {
          ce(!0);
          try {
            e();
          } finally {
            ce(!1);
          }
        }
      }
      return l.memoizedState = l.baseState = t, l.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $l,
        lastRenderedState: t
      }, l;
    }
    function lo(t, l, e, n) {
      return t.baseState = e, Hf(
        t,
        pt,
        typeof n == "function" ? n : $l
      );
    }
    function Fy(t, l, e, n, a) {
      if (Ga(t)) throw Error(c(485));
      if (t = l.action, t !== null) {
        var f = {
          payload: a,
          action: t,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(s) {
            f.listeners.push(s);
          }
        };
        C.T !== null ? e(!0) : f.isTransition = !1, n(f), e = l.pending, e === null ? (f.next = l.pending = f, eo(l, f)) : (f.next = e.next, l.pending = e.next = f);
      }
    }
    function eo(t, l) {
      var e = l.action, n = l.payload, a = t.state;
      if (l.isTransition) {
        var f = C.T, s = {};
        C.T = s;
        try {
          var y = e(a, n), _ = C.S;
          _ !== null && _(s, y), no(t, l, y);
        } catch (A) {
          Yf(t, l, A);
        } finally {
          C.T = f;
        }
      } else
        try {
          f = e(a, n), no(t, l, f);
        } catch (A) {
          Yf(t, l, A);
        }
    }
    function no(t, l, e) {
      e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
        function(n) {
          uo(t, l, n);
        },
        function(n) {
          return Yf(t, l, n);
        }
      ) : uo(t, l, e);
    }
    function uo(t, l, e) {
      l.status = "fulfilled", l.value = e, ao(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, eo(t, e)));
    }
    function Yf(t, l, e) {
      var n = t.pending;
      if (t.pending = null, n !== null) {
        n = n.next;
        do
          l.status = "rejected", l.reason = e, ao(l), l = l.next;
        while (l !== n);
      }
      t.action = null;
    }
    function ao(t) {
      t = t.listeners;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
    function io(t, l) {
      return l;
    }
    function fo(t, l) {
      if (gt) {
        var e = xt.formState;
        if (e !== null) {
          t: {
            var n = st;
            if (gt) {
              if (Lt) {
                l: {
                  for (var a = Lt, f = wl; a.nodeType !== 8; ) {
                    if (!f) {
                      a = null;
                      break l;
                    }
                    if (a = Ol(
                      a.nextSibling
                    ), a === null) {
                      a = null;
                      break l;
                    }
                  }
                  f = a.data, a = f === "F!" || f === "F" ? a : null;
                }
                if (a) {
                  Lt = Ol(
                    a.nextSibling
                  ), n = a.data === "F!";
                  break t;
                }
              }
              Ge(n);
            }
            n = !1;
          }
          n && (l = e[0]);
        }
      }
      return e = el(), e.memoizedState = e.baseState = l, n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: io,
        lastRenderedState: l
      }, e.queue = n, e = To.bind(
        null,
        st,
        n
      ), n.dispatch = e, n = qf(!1), f = Zf.bind(
        null,
        st,
        !1,
        n.queue
      ), n = el(), a = {
        state: l,
        dispatch: null,
        action: t,
        pending: null
      }, n.queue = a, e = Fy.bind(
        null,
        st,
        a,
        f,
        e
      ), a.dispatch = e, n.memoizedState = t, [l, e, !1];
    }
    function co(t) {
      var l = Yt();
      return ro(l, pt, t);
    }
    function ro(t, l, e) {
      l = Hf(
        t,
        l,
        io
      )[0], t = Ba($l)[0], l = typeof l == "object" && l !== null && typeof l.then == "function" ? Su(l) : l;
      var n = Yt(), a = n.queue, f = a.dispatch;
      return e !== n.memoizedState && (st.flags |= 2048, Dn(
        9,
        Py.bind(null, a, e),
        { destroy: void 0 },
        null
      )), [l, f, t];
    }
    function Py(t, l) {
      t.action = l;
    }
    function so(t) {
      var l = Yt(), e = pt;
      if (e !== null)
        return ro(l, e, t);
      Yt(), l = l.memoizedState, e = Yt();
      var n = e.queue.dispatch;
      return e.memoizedState = t, [l, n, !1];
    }
    function Dn(t, l, e, n) {
      return t = { tag: t, create: l, inst: e, deps: n, next: null }, l = st.updateQueue, l === null && (l = qa(), st.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (n = e.next, e.next = t, t.next = n, l.lastEffect = t), t;
    }
    function oo() {
      return Yt().memoizedState;
    }
    function Ca(t, l, e, n) {
      var a = el();
      st.flags |= t, a.memoizedState = Dn(
        1 | l,
        e,
        { destroy: void 0 },
        n === void 0 ? null : n
      );
    }
    function Xa(t, l, e, n) {
      var a = Yt();
      n = n === void 0 ? null : n;
      var f = a.memoizedState.inst;
      pt !== null && n !== null && zf(n, pt.memoizedState.deps) ? a.memoizedState = Dn(l, e, f, n) : (st.flags |= t, a.memoizedState = Dn(1 | l, e, f, n));
    }
    function ho(t, l) {
      Ca(8390656, 8, t, l);
    }
    function Bf(t, l) {
      Xa(2048, 8, t, l);
    }
    function yo(t, l) {
      return Xa(4, 2, t, l);
    }
    function vo(t, l) {
      return Xa(4, 4, t, l);
    }
    function mo(t, l) {
      if (typeof l == "function") {
        t = t();
        var e = l(t);
        return function() {
          typeof e == "function" ? e() : l(null);
        };
      }
      if (l != null)
        return t = t(), l.current = t, function() {
          l.current = null;
        };
    }
    function go(t, l, e) {
      e = e != null ? e.concat([t]) : null, Xa(4, 4, mo.bind(null, l, t), e);
    }
    function Cf() {
    }
    function _o(t, l) {
      var e = Yt();
      l = l === void 0 ? null : l;
      var n = e.memoizedState;
      return l !== null && zf(l, n[1]) ? n[0] : (e.memoizedState = [t, l], t);
    }
    function po(t, l) {
      var e = Yt();
      l = l === void 0 ? null : l;
      var n = e.memoizedState;
      if (l !== null && zf(l, n[1]))
        return n[0];
      if (n = t(), je) {
        ce(!0);
        try {
          t();
        } finally {
          ce(!1);
        }
      }
      return e.memoizedState = [n, l], n;
    }
    function Xf(t, l, e) {
      return e === void 0 || (ye & 1073741824) !== 0 ? t.memoizedState = l : (t.memoizedState = e, t = bh(), st.lanes |= t, xe |= t, e);
    }
    function So(t, l, e, n) {
      return cl(e, l) ? e : xn.current !== null ? (t = Xf(t, e, n), cl(t, l) || (Zt = !0), t) : (ye & 42) === 0 ? (Zt = !0, t.memoizedState = e) : (t = bh(), st.lanes |= t, xe |= t, l);
    }
    function bo(t, l, e, n, a) {
      var f = X.p;
      X.p = f !== 0 && 8 > f ? f : 8;
      var s = C.T, y = {};
      C.T = y, Zf(t, !1, l, e);
      try {
        var _ = a(), A = C.S;
        if (A !== null && A(y, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
          var R = Jy(
            _,
            n
          );
          bu(
            t,
            l,
            R,
            hl(t)
          );
        } else
          bu(
            t,
            l,
            n,
            hl(t)
          );
      } catch (H) {
        bu(
          t,
          l,
          { then: function() {
          }, status: "rejected", reason: H },
          hl()
        );
      } finally {
        X.p = f, C.T = s;
      }
    }
    function Iy() {
    }
    function Gf(t, l, e, n) {
      if (t.tag !== 5) throw Error(c(476));
      var a = Ao(t).queue;
      bo(
        t,
        a,
        l,
        at,
        e === null ? Iy : function() {
          return Eo(t), e(n);
        }
      );
    }
    function Ao(t) {
      var l = t.memoizedState;
      if (l !== null) return l;
      l = {
        memoizedState: at,
        baseState: at,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: $l,
          lastRenderedState: at
        },
        next: null
      };
      var e = {};
      return l.next = {
        memoizedState: e,
        baseState: e,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: $l,
          lastRenderedState: e
        },
        next: null
      }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
    }
    function Eo(t) {
      var l = Ao(t).next.queue;
      bu(t, l, {}, hl());
    }
    function Qf() {
      return kt(Qu);
    }
    function xo() {
      return Yt().memoizedState;
    }
    function Mo() {
      return Yt().memoizedState;
    }
    function tv(t) {
      for (var l = t.return; l !== null; ) {
        switch (l.tag) {
          case 24:
          case 3:
            var e = hl();
            t = _e(e);
            var n = pe(l, t, e);
            n !== null && (It(n, l, e), xu(n, l, e)), l = { cache: xf() }, t.payload = l;
            return;
        }
        l = l.return;
      }
    }
    function lv(t, l, e) {
      var n = hl();
      e = {
        lane: n,
        revertLane: 0,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, Ga(t) ? zo(l, e) : (e = gf(t, l, e, n), e !== null && (It(e, t, n), Oo(e, l, n)));
    }
    function To(t, l, e) {
      var n = hl();
      bu(t, l, e, n);
    }
    function bu(t, l, e, n) {
      var a = {
        lane: n,
        revertLane: 0,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (Ga(t)) zo(l, a);
      else {
        var f = t.alternate;
        if (t.lanes === 0 && (f === null || f.lanes === 0) && (f = l.lastRenderedReducer, f !== null))
          try {
            var s = l.lastRenderedState, y = f(s, e);
            if (a.hasEagerState = !0, a.eagerState = y, cl(y, s))
              return Ea(t, l, a, 0), xt === null && Aa(), !1;
          } catch {
          } finally {
          }
        if (e = gf(t, l, a, n), e !== null)
          return It(e, t, n), Oo(e, l, n), !0;
      }
      return !1;
    }
    function Zf(t, l, e, n) {
      if (n = {
        lane: 2,
        revertLane: Nc(),
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, Ga(t)) {
        if (l) throw Error(c(479));
      } else
        l = gf(
          t,
          e,
          n,
          2
        ), l !== null && It(l, t, 2);
    }
    function Ga(t) {
      var l = t.alternate;
      return t === st || l !== null && l === st;
    }
    function zo(t, l) {
      zn = Ha = !0;
      var e = t.pending;
      e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
    }
    function Oo(t, l, e) {
      if ((e & 4194176) !== 0) {
        var n = l.lanes;
        n &= t.pendingLanes, e |= n, l.lanes = e, Cr(t, e);
      }
    }
    var Yl = {
      readContext: kt,
      use: Ya,
      useCallback: wt,
      useContext: wt,
      useEffect: wt,
      useImperativeHandle: wt,
      useLayoutEffect: wt,
      useInsertionEffect: wt,
      useMemo: wt,
      useReducer: wt,
      useRef: wt,
      useState: wt,
      useDebugValue: wt,
      useDeferredValue: wt,
      useTransition: wt,
      useSyncExternalStore: wt,
      useId: wt
    };
    Yl.useCacheRefresh = wt, Yl.useMemoCache = wt, Yl.useHostTransitionStatus = wt, Yl.useFormState = wt, Yl.useActionState = wt, Yl.useOptimistic = wt;
    var Ve = {
      readContext: kt,
      use: Ya,
      useCallback: function(t, l) {
        return el().memoizedState = [
          t,
          l === void 0 ? null : l
        ], t;
      },
      useContext: kt,
      useEffect: ho,
      useImperativeHandle: function(t, l, e) {
        e = e != null ? e.concat([t]) : null, Ca(
          4194308,
          4,
          mo.bind(null, l, t),
          e
        );
      },
      useLayoutEffect: function(t, l) {
        return Ca(4194308, 4, t, l);
      },
      useInsertionEffect: function(t, l) {
        Ca(4, 2, t, l);
      },
      useMemo: function(t, l) {
        var e = el();
        l = l === void 0 ? null : l;
        var n = t();
        if (je) {
          ce(!0);
          try {
            t();
          } finally {
            ce(!1);
          }
        }
        return e.memoizedState = [n, l], n;
      },
      useReducer: function(t, l, e) {
        var n = el();
        if (e !== void 0) {
          var a = e(l);
          if (je) {
            ce(!0);
            try {
              e(l);
            } finally {
              ce(!1);
            }
          }
        } else a = l;
        return n.memoizedState = n.baseState = a, t = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: t,
          lastRenderedState: a
        }, n.queue = t, t = t.dispatch = lv.bind(
          null,
          st,
          t
        ), [n.memoizedState, t];
      },
      useRef: function(t) {
        var l = el();
        return t = { current: t }, l.memoizedState = t;
      },
      useState: function(t) {
        t = qf(t);
        var l = t.queue, e = To.bind(null, st, l);
        return l.dispatch = e, [t.memoizedState, e];
      },
      useDebugValue: Cf,
      useDeferredValue: function(t, l) {
        var e = el();
        return Xf(e, t, l);
      },
      useTransition: function() {
        var t = qf(!1);
        return t = bo.bind(
          null,
          st,
          t.queue,
          !0,
          !1
        ), el().memoizedState = t, [!1, t];
      },
      useSyncExternalStore: function(t, l, e) {
        var n = st, a = el();
        if (gt) {
          if (e === void 0)
            throw Error(c(407));
          e = e();
        } else {
          if (e = l(), xt === null) throw Error(c(349));
          (mt & 60) !== 0 || Ws(n, l, e);
        }
        a.memoizedState = e;
        var f = { value: e, getSnapshot: l };
        return a.queue = f, ho(Ps.bind(null, n, f, t), [
          t
        ]), n.flags |= 2048, Dn(
          9,
          Fs.bind(
            null,
            n,
            f,
            e,
            l
          ),
          { destroy: void 0 },
          null
        ), e;
      },
      useId: function() {
        var t = el(), l = xt.identifierPrefix;
        if (gt) {
          var e = Ll, n = Vl;
          e = (n & ~(1 << 32 - fl(n) - 1)).toString(32) + e, l = ":" + l + "R" + e, e = wa++, 0 < e && (l += "H" + e.toString(32)), l += ":";
        } else
          e = ky++, l = ":" + l + "r" + e.toString(32) + ":";
        return t.memoizedState = l;
      },
      useCacheRefresh: function() {
        return el().memoizedState = tv.bind(
          null,
          st
        );
      }
    };
    Ve.useMemoCache = Uf, Ve.useHostTransitionStatus = Qf, Ve.useFormState = fo, Ve.useActionState = fo, Ve.useOptimistic = function(t) {
      var l = el();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = Zf.bind(
        null,
        st,
        !0,
        e
      ), e.dispatch = l, [t, l];
    };
    var ve = {
      readContext: kt,
      use: Ya,
      useCallback: _o,
      useContext: kt,
      useEffect: Bf,
      useImperativeHandle: go,
      useInsertionEffect: yo,
      useLayoutEffect: vo,
      useMemo: po,
      useReducer: Ba,
      useRef: oo,
      useState: function() {
        return Ba($l);
      },
      useDebugValue: Cf,
      useDeferredValue: function(t, l) {
        var e = Yt();
        return So(
          e,
          pt.memoizedState,
          t,
          l
        );
      },
      useTransition: function() {
        var t = Ba($l)[0], l = Yt().memoizedState;
        return [
          typeof t == "boolean" ? t : Su(t),
          l
        ];
      },
      useSyncExternalStore: ks,
      useId: xo
    };
    ve.useCacheRefresh = Mo, ve.useMemoCache = Uf, ve.useHostTransitionStatus = Qf, ve.useFormState = co, ve.useActionState = co, ve.useOptimistic = function(t, l) {
      var e = Yt();
      return lo(e, pt, t, l);
    };
    var Le = {
      readContext: kt,
      use: Ya,
      useCallback: _o,
      useContext: kt,
      useEffect: Bf,
      useImperativeHandle: go,
      useInsertionEffect: yo,
      useLayoutEffect: vo,
      useMemo: po,
      useReducer: wf,
      useRef: oo,
      useState: function() {
        return wf($l);
      },
      useDebugValue: Cf,
      useDeferredValue: function(t, l) {
        var e = Yt();
        return pt === null ? Xf(e, t, l) : So(
          e,
          pt.memoizedState,
          t,
          l
        );
      },
      useTransition: function() {
        var t = wf($l)[0], l = Yt().memoizedState;
        return [
          typeof t == "boolean" ? t : Su(t),
          l
        ];
      },
      useSyncExternalStore: ks,
      useId: xo
    };
    Le.useCacheRefresh = Mo, Le.useMemoCache = Uf, Le.useHostTransitionStatus = Qf, Le.useFormState = so, Le.useActionState = so, Le.useOptimistic = function(t, l) {
      var e = Yt();
      return pt !== null ? lo(e, pt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    };
    function jf(t, l, e, n) {
      l = t.memoizedState, e = e(n, l), e = e == null ? l : $({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
    }
    var Vf = {
      isMounted: function(t) {
        return (t = t._reactInternals) ? B(t) === t : !1;
      },
      enqueueSetState: function(t, l, e) {
        t = t._reactInternals;
        var n = hl(), a = _e(n);
        a.payload = l, e != null && (a.callback = e), l = pe(t, a, n), l !== null && (It(l, t, n), xu(l, t, n));
      },
      enqueueReplaceState: function(t, l, e) {
        t = t._reactInternals;
        var n = hl(), a = _e(n);
        a.tag = 1, a.payload = l, e != null && (a.callback = e), l = pe(t, a, n), l !== null && (It(l, t, n), xu(l, t, n));
      },
      enqueueForceUpdate: function(t, l) {
        t = t._reactInternals;
        var e = hl(), n = _e(e);
        n.tag = 2, l != null && (n.callback = l), l = pe(t, n, e), l !== null && (It(l, t, e), xu(l, t, e));
      }
    };
    function Do(t, l, e, n, a, f, s) {
      return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, f, s) : l.prototype && l.prototype.isPureReactComponent ? !cu(e, n) || !cu(a, f) : !0;
    }
    function Ro(t, l, e, n) {
      t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, n), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, n), l.state !== t && Vf.enqueueReplaceState(l, l.state, null);
    }
    function Ke(t, l) {
      var e = l;
      if ("ref" in l) {
        e = {};
        for (var n in l)
          n !== "ref" && (e[n] = l[n]);
      }
      if (t = t.defaultProps) {
        e === l && (e = $({}, e));
        for (var a in t)
          e[a] === void 0 && (e[a] = t[a]);
      }
      return e;
    }
    var Qa = typeof reportError == "function" ? reportError : function(t) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var l = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
          error: t
        });
        if (!window.dispatchEvent(l)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", t);
        return;
      }
      console.error(t);
    };
    function No(t) {
      Qa(t);
    }
    function Uo(t) {
      console.error(t);
    }
    function Ho(t) {
      Qa(t);
    }
    function Za(t, l) {
      try {
        var e = t.onUncaughtError;
        e(l.value, { componentStack: l.stack });
      } catch (n) {
        setTimeout(function() {
          throw n;
        });
      }
    }
    function wo(t, l, e) {
      try {
        var n = t.onCaughtError;
        n(e.value, {
          componentStack: e.stack,
          errorBoundary: l.tag === 1 ? l.stateNode : null
        });
      } catch (a) {
        setTimeout(function() {
          throw a;
        });
      }
    }
    function Lf(t, l, e) {
      return e = _e(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
        Za(t, l);
      }, e;
    }
    function qo(t) {
      return t = _e(t), t.tag = 3, t;
    }
    function Yo(t, l, e, n) {
      var a = e.type.getDerivedStateFromError;
      if (typeof a == "function") {
        var f = n.value;
        t.payload = function() {
          return a(f);
        }, t.callback = function() {
          wo(l, e, n);
        };
      }
      var s = e.stateNode;
      s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
        wo(l, e, n), typeof a != "function" && (Me === null ? Me = /* @__PURE__ */ new Set([this]) : Me.add(this));
        var y = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: y !== null ? y : ""
        });
      });
    }
    function ev(t, l, e, n, a) {
      if (e.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
        if (l = e.alternate, l !== null && Eu(
          l,
          e,
          a,
          !0
        ), e = pl.current, e !== null) {
          switch (e.tag) {
            case 13:
              return ql === null ? Tc() : e.alternate === null && Ut === 0 && (Ut = 3), e.flags &= -257, e.flags |= 65536, e.lanes = a, n === bf ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([n]) : l.add(n), Oc(t, n, a)), !1;
            case 22:
              return e.flags |= 65536, n === bf ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([n])
              }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([n]) : e.add(n)), Oc(t, n, a)), !1;
          }
          throw Error(c(435, e.tag));
        }
        return Oc(t, n, a), Tc(), !1;
      }
      if (gt)
        return l = pl.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = a, n !== Sf && (t = Error(c(422), { cause: n }), hu(ml(t, e)))) : (n !== Sf && (l = Error(c(423), {
          cause: n
        }), hu(
          ml(l, e)
        )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = ml(n, e), a = Lf(
          t.stateNode,
          n,
          a
        ), ic(t, a), Ut !== 4 && (Ut = 2)), !1;
      var f = Error(c(520), { cause: n });
      if (f = ml(f, e), Uu === null ? Uu = [f] : Uu.push(f), Ut !== 4 && (Ut = 2), l === null) return !0;
      n = ml(n, e), e = l;
      do {
        switch (e.tag) {
          case 3:
            return e.flags |= 65536, t = a & -a, e.lanes |= t, t = Lf(e.stateNode, n, t), ic(e, t), !1;
          case 1:
            if (l = e.type, f = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Me === null || !Me.has(f))))
              return e.flags |= 65536, a &= -a, e.lanes |= a, a = qo(a), Yo(
                a,
                t,
                e,
                n
              ), ic(e, a), !1;
        }
        e = e.return;
      } while (e !== null);
      return !1;
    }
    var Bo = Error(c(461)), Zt = !1;
    function Kt(t, l, e, n) {
      l.child = t === null ? Qs(l, null, e, n) : Qe(
        l,
        t.child,
        e,
        n
      );
    }
    function Co(t, l, e, n, a) {
      e = e.render;
      var f = l.ref;
      if ("ref" in n) {
        var s = {};
        for (var y in n)
          y !== "ref" && (s[y] = n[y]);
      } else s = n;
      return Je(l), n = Of(
        t,
        l,
        e,
        s,
        f,
        a
      ), y = Df(), t !== null && !Zt ? (Rf(t, l, a), Jl(t, l, a)) : (gt && y && _f(l), l.flags |= 1, Kt(t, l, n, a), l.child);
    }
    function Xo(t, l, e, n, a) {
      if (t === null) {
        var f = e.type;
        return typeof f == "function" && !yc(f) && f.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = f, Go(
          t,
          l,
          f,
          n,
          a
        )) : (t = $a(
          e.type,
          null,
          n,
          l,
          l.mode,
          a
        ), t.ref = l.ref, t.return = l, l.child = t);
      }
      if (f = t.child, !tc(t, a)) {
        var s = f.memoizedProps;
        if (e = e.compare, e = e !== null ? e : cu, e(s, n) && t.ref === l.ref)
          return Jl(t, l, a);
      }
      return l.flags |= 1, t = Ee(f, n), t.ref = l.ref, t.return = l, l.child = t;
    }
    function Go(t, l, e, n, a) {
      if (t !== null) {
        var f = t.memoizedProps;
        if (cu(f, n) && t.ref === l.ref)
          if (Zt = !1, l.pendingProps = n = f, tc(t, a))
            (t.flags & 131072) !== 0 && (Zt = !0);
          else
            return l.lanes = t.lanes, Jl(t, l, a);
      }
      return Kf(
        t,
        l,
        e,
        n,
        a
      );
    }
    function Qo(t, l, e) {
      var n = l.pendingProps, a = n.children, f = (l.stateNode._pendingVisibility & 2) !== 0, s = t !== null ? t.memoizedState : null;
      if (Au(t, l), n.mode === "hidden" || f) {
        if ((l.flags & 128) !== 0) {
          if (n = s !== null ? s.baseLanes | e : e, t !== null) {
            for (a = l.child = t.child, f = 0; a !== null; )
              f = f | a.lanes | a.childLanes, a = a.sibling;
            l.childLanes = f & ~n;
          } else l.childLanes = 0, l.child = null;
          return Zo(
            t,
            l,
            n,
            e
          );
        }
        if ((e & 536870912) !== 0)
          l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ua(
            l,
            s !== null ? s.cachePool : null
          ), s !== null ? Zs(l, s) : Af(), js(l);
        else
          return l.lanes = l.childLanes = 536870912, Zo(
            t,
            l,
            s !== null ? s.baseLanes | e : e,
            e
          );
      } else
        s !== null ? (Ua(l, s.cachePool), Zs(l, s), de(), l.memoizedState = null) : (t !== null && Ua(l, null), Af(), de());
      return Kt(t, l, a, e), l.child;
    }
    function Zo(t, l, e, n) {
      var a = Tf();
      return a = a === null ? null : { parent: Gt._currentValue, pool: a }, l.memoizedState = {
        baseLanes: e,
        cachePool: a
      }, t !== null && Ua(l, null), Af(), js(l), t !== null && Eu(t, l, n, !0), null;
    }
    function Au(t, l) {
      var e = l.ref;
      if (e === null)
        t !== null && t.ref !== null && (l.flags |= 2097664);
      else {
        if (typeof e != "function" && typeof e != "object")
          throw Error(c(284));
        (t === null || t.ref !== e) && (l.flags |= 2097664);
      }
    }
    function Kf(t, l, e, n, a) {
      return Je(l), e = Of(
        t,
        l,
        e,
        n,
        void 0,
        a
      ), n = Df(), t !== null && !Zt ? (Rf(t, l, a), Jl(t, l, a)) : (gt && n && _f(l), l.flags |= 1, Kt(t, l, e, a), l.child);
    }
    function jo(t, l, e, n, a, f) {
      return Je(l), l.updateQueue = null, e = Js(
        l,
        n,
        e,
        a
      ), $s(t), n = Df(), t !== null && !Zt ? (Rf(t, l, f), Jl(t, l, f)) : (gt && n && _f(l), l.flags |= 1, Kt(t, l, e, f), l.child);
    }
    function Vo(t, l, e, n, a) {
      if (Je(l), l.stateNode === null) {
        var f = Sn, s = e.contextType;
        typeof s == "object" && s !== null && (f = kt(s)), f = new e(n, f), l.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Vf, l.stateNode = f, f._reactInternals = l, f = l.stateNode, f.props = n, f.state = l.memoizedState, f.refs = {}, uc(l), s = e.contextType, f.context = typeof s == "object" && s !== null ? kt(s) : Sn, f.state = l.memoizedState, s = e.getDerivedStateFromProps, typeof s == "function" && (jf(
          l,
          e,
          s,
          n
        ), f.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (s = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), s !== f.state && Vf.enqueueReplaceState(f, f.state, null), Tu(l, n, f, a), Mu(), f.state = l.memoizedState), typeof f.componentDidMount == "function" && (l.flags |= 4194308), n = !0;
      } else if (t === null) {
        f = l.stateNode;
        var y = l.memoizedProps, _ = Ke(e, y);
        f.props = _;
        var A = f.context, R = e.contextType;
        s = Sn, typeof R == "object" && R !== null && (s = kt(R));
        var H = e.getDerivedStateFromProps;
        R = typeof H == "function" || typeof f.getSnapshotBeforeUpdate == "function", y = l.pendingProps !== y, R || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y || A !== s) && Ro(
          l,
          f,
          n,
          s
        ), ge = !1;
        var z = l.memoizedState;
        f.state = z, Tu(l, n, f, a), Mu(), A = l.memoizedState, y || z !== A || ge ? (typeof H == "function" && (jf(
          l,
          e,
          H,
          n
        ), A = l.memoizedState), (_ = ge || Do(
          l,
          e,
          _,
          n,
          z,
          A,
          s
        )) ? (R || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = n, l.memoizedState = A), f.props = n, f.state = A, f.context = s, n = _) : (typeof f.componentDidMount == "function" && (l.flags |= 4194308), n = !1);
      } else {
        f = l.stateNode, ac(t, l), s = l.memoizedProps, R = Ke(e, s), f.props = R, H = l.pendingProps, z = f.context, A = e.contextType, _ = Sn, typeof A == "object" && A !== null && (_ = kt(A)), y = e.getDerivedStateFromProps, (A = typeof y == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (s !== H || z !== _) && Ro(
          l,
          f,
          n,
          _
        ), ge = !1, z = l.memoizedState, f.state = z, Tu(l, n, f, a), Mu();
        var D = l.memoizedState;
        s !== H || z !== D || ge || t !== null && t.dependencies !== null && ja(t.dependencies) ? (typeof y == "function" && (jf(
          l,
          e,
          y,
          n
        ), D = l.memoizedState), (R = ge || Do(
          l,
          e,
          R,
          n,
          z,
          D,
          _
        ) || t !== null && t.dependencies !== null && ja(t.dependencies)) ? (A || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(n, D, _), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          n,
          D,
          _
        )), typeof f.componentDidUpdate == "function" && (l.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || s === t.memoizedProps && z === t.memoizedState || (l.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && z === t.memoizedState || (l.flags |= 1024), l.memoizedProps = n, l.memoizedState = D), f.props = n, f.state = D, f.context = _, n = R) : (typeof f.componentDidUpdate != "function" || s === t.memoizedProps && z === t.memoizedState || (l.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && z === t.memoizedState || (l.flags |= 1024), n = !1);
      }
      return f = n, Au(t, l), n = (l.flags & 128) !== 0, f || n ? (f = l.stateNode, e = n && typeof e.getDerivedStateFromError != "function" ? null : f.render(), l.flags |= 1, t !== null && n ? (l.child = Qe(
        l,
        t.child,
        null,
        a
      ), l.child = Qe(
        l,
        null,
        e,
        a
      )) : Kt(t, l, e, a), l.memoizedState = f.state, t = l.child) : t = Jl(
        t,
        l,
        a
      ), t;
    }
    function Lo(t, l, e, n) {
      return ou(), l.flags |= 256, Kt(t, l, e, n), l.child;
    }
    var $f = { dehydrated: null, treeContext: null, retryLane: 0 };
    function Jf(t) {
      return { baseLanes: t, cachePool: Ks() };
    }
    function kf(t, l, e) {
      return t = t !== null ? t.childLanes & ~e : 0, l && (t |= El), t;
    }
    function Ko(t, l, e) {
      var n = l.pendingProps, a = !1, f = (l.flags & 128) !== 0, s;
      if ((s = f) || (s = t !== null && t.memoizedState === null ? !1 : (Xt.current & 2) !== 0), s && (a = !0, l.flags &= -129), s = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
        if (gt) {
          if (a ? he(l) : de(), gt) {
            var y = Lt, _;
            if (_ = y) {
              t: {
                for (_ = y, y = wl; _.nodeType !== 8; ) {
                  if (!y) {
                    y = null;
                    break t;
                  }
                  if (_ = Ol(
                    _.nextSibling
                  ), _ === null) {
                    y = null;
                    break t;
                  }
                }
                y = _;
              }
              y !== null ? (l.memoizedState = {
                dehydrated: y,
                treeContext: Ce !== null ? { id: Vl, overflow: Ll } : null,
                retryLane: 536870912
              }, _ = Al(
                18,
                null,
                null,
                0
              ), _.stateNode = y, _.return = l, l.child = _, Pt = l, Lt = null, _ = !0) : _ = !1;
            }
            _ || Ge(l);
          }
          if (y = l.memoizedState, y !== null && (y = y.dehydrated, y !== null))
            return y.data === "$!" ? l.lanes = 16 : l.lanes = 536870912, null;
          Kl(l);
        }
        return y = n.children, n = n.fallback, a ? (de(), a = l.mode, y = Ff(
          { mode: "hidden", children: y },
          a
        ), n = We(
          n,
          a,
          e,
          null
        ), y.return = l, n.return = l, y.sibling = n, l.child = y, a = l.child, a.memoizedState = Jf(e), a.childLanes = kf(
          t,
          s,
          e
        ), l.memoizedState = $f, n) : (he(l), Wf(l, y));
      }
      if (_ = t.memoizedState, _ !== null && (y = _.dehydrated, y !== null)) {
        if (f)
          l.flags & 256 ? (he(l), l.flags &= -257, l = Pf(
            t,
            l,
            e
          )) : l.memoizedState !== null ? (de(), l.child = t.child, l.flags |= 128, l = null) : (de(), a = n.fallback, y = l.mode, n = Ff(
            { mode: "visible", children: n.children },
            y
          ), a = We(
            a,
            y,
            e,
            null
          ), a.flags |= 2, n.return = l, a.return = l, n.sibling = a, l.child = n, Qe(
            l,
            t.child,
            null,
            e
          ), n = l.child, n.memoizedState = Jf(e), n.childLanes = kf(
            t,
            s,
            e
          ), l.memoizedState = $f, l = a);
        else if (he(l), y.data === "$!") {
          if (s = y.nextSibling && y.nextSibling.dataset, s) var A = s.dgst;
          s = A, n = Error(c(419)), n.stack = "", n.digest = s, hu({ value: n, source: null, stack: null }), l = Pf(
            t,
            l,
            e
          );
        } else if (Zt || Eu(t, l, e, !1), s = (e & t.childLanes) !== 0, Zt || s) {
          if (s = xt, s !== null) {
            if (n = e & -e, (n & 42) !== 0) n = 1;
            else
              switch (n) {
                case 2:
                  n = 1;
                  break;
                case 8:
                  n = 4;
                  break;
                case 32:
                  n = 16;
                  break;
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                  n = 64;
                  break;
                case 268435456:
                  n = 134217728;
                  break;
                default:
                  n = 0;
              }
            if (n = (n & (s.suspendedLanes | e)) !== 0 ? 0 : n, n !== 0 && n !== _.retryLane)
              throw _.retryLane = n, oe(t, n), It(s, t, n), Bo;
          }
          y.data === "$?" || Tc(), l = Pf(
            t,
            l,
            e
          );
        } else
          y.data === "$?" ? (l.flags |= 128, l.child = t.child, l = gv.bind(
            null,
            t
          ), y._reactRetry = l, l = null) : (t = _.treeContext, Lt = Ol(
            y.nextSibling
          ), Pt = l, gt = !0, Tl = null, wl = !1, t !== null && (gl[_l++] = Vl, gl[_l++] = Ll, gl[_l++] = Ce, Vl = t.id, Ll = t.overflow, Ce = l), l = Wf(
            l,
            n.children
          ), l.flags |= 4096);
        return l;
      }
      return a ? (de(), a = n.fallback, y = l.mode, _ = t.child, A = _.sibling, n = Ee(_, {
        mode: "hidden",
        children: n.children
      }), n.subtreeFlags = _.subtreeFlags & 31457280, A !== null ? a = Ee(A, a) : (a = We(
        a,
        y,
        e,
        null
      ), a.flags |= 2), a.return = l, n.return = l, n.sibling = a, l.child = n, n = a, a = l.child, y = t.child.memoizedState, y === null ? y = Jf(e) : (_ = y.cachePool, _ !== null ? (A = Gt._currentValue, _ = _.parent !== A ? { parent: A, pool: A } : _) : _ = Ks(), y = {
        baseLanes: y.baseLanes | e,
        cachePool: _
      }), a.memoizedState = y, a.childLanes = kf(
        t,
        s,
        e
      ), l.memoizedState = $f, n) : (he(l), e = t.child, t = e.sibling, e = Ee(e, {
        mode: "visible",
        children: n.children
      }), e.return = l, e.sibling = null, t !== null && (s = l.deletions, s === null ? (l.deletions = [t], l.flags |= 16) : s.push(t)), l.child = e, l.memoizedState = null, e);
    }
    function Wf(t, l) {
      return l = Ff(
        { mode: "visible", children: l },
        t.mode
      ), l.return = t, t.child = l;
    }
    function Ff(t, l) {
      return _h(t, l, 0, null);
    }
    function Pf(t, l, e) {
      return Qe(l, t.child, null, e), t = Wf(
        l,
        l.pendingProps.children
      ), t.flags |= 2, l.memoizedState = null, t;
    }
    function $o(t, l, e) {
      t.lanes |= l;
      var n = t.alternate;
      n !== null && (n.lanes |= l), ec(t.return, l, e);
    }
    function If(t, l, e, n, a) {
      var f = t.memoizedState;
      f === null ? t.memoizedState = {
        isBackwards: l,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: e,
        tailMode: a
      } : (f.isBackwards = l, f.rendering = null, f.renderingStartTime = 0, f.last = n, f.tail = e, f.tailMode = a);
    }
    function Jo(t, l, e) {
      var n = l.pendingProps, a = n.revealOrder, f = n.tail;
      if (Kt(t, l, n.children, e), n = Xt.current, (n & 2) !== 0)
        n = n & 1 | 2, l.flags |= 128;
      else {
        if (t !== null && (t.flags & 128) !== 0)
          t: for (t = l.child; t !== null; ) {
            if (t.tag === 13)
              t.memoizedState !== null && $o(t, e, l);
            else if (t.tag === 19)
              $o(t, e, l);
            else if (t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break t;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l)
                break t;
              t = t.return;
            }
            t.sibling.return = t.return, t = t.sibling;
          }
        n &= 1;
      }
      switch (At(Xt, n), a) {
        case "forwards":
          for (e = l.child, a = null; e !== null; )
            t = e.alternate, t !== null && Na(t) === null && (a = e), e = e.sibling;
          e = a, e === null ? (a = l.child, l.child = null) : (a = e.sibling, e.sibling = null), If(
            l,
            !1,
            a,
            e,
            f
          );
          break;
        case "backwards":
          for (e = null, a = l.child, l.child = null; a !== null; ) {
            if (t = a.alternate, t !== null && Na(t) === null) {
              l.child = a;
              break;
            }
            t = a.sibling, a.sibling = e, e = a, a = t;
          }
          If(
            l,
            !0,
            e,
            null,
            f
          );
          break;
        case "together":
          If(l, !1, null, null, void 0);
          break;
        default:
          l.memoizedState = null;
      }
      return l.child;
    }
    function Jl(t, l, e) {
      if (t !== null && (l.dependencies = t.dependencies), xe |= l.lanes, (e & l.childLanes) === 0)
        if (t !== null) {
          if (Eu(
            t,
            l,
            e,
            !1
          ), (e & l.childLanes) === 0)
            return null;
        } else return null;
      if (t !== null && l.child !== t.child)
        throw Error(c(153));
      if (l.child !== null) {
        for (t = l.child, e = Ee(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
          t = t.sibling, e = e.sibling = Ee(t, t.pendingProps), e.return = l;
        e.sibling = null;
      }
      return l.child;
    }
    function tc(t, l) {
      return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ja(t)));
    }
    function nv(t, l, e) {
      switch (l.tag) {
        case 3:
          aa(l, l.stateNode.containerInfo), me(l, Gt, t.memoizedState.cache), ou();
          break;
        case 27:
        case 5:
          ji(l);
          break;
        case 4:
          aa(l, l.stateNode.containerInfo);
          break;
        case 10:
          me(
            l,
            l.type,
            l.memoizedProps.value
          );
          break;
        case 13:
          var n = l.memoizedState;
          if (n !== null)
            return n.dehydrated !== null ? (he(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Ko(t, l, e) : (he(l), t = Jl(
              t,
              l,
              e
            ), t !== null ? t.sibling : null);
          he(l);
          break;
        case 19:
          var a = (t.flags & 128) !== 0;
          if (n = (e & l.childLanes) !== 0, n || (Eu(
            t,
            l,
            e,
            !1
          ), n = (e & l.childLanes) !== 0), a) {
            if (n)
              return Jo(
                t,
                l,
                e
              );
            l.flags |= 128;
          }
          if (a = l.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), At(Xt, Xt.current), n) break;
          return null;
        case 22:
        case 23:
          return l.lanes = 0, Qo(t, l, e);
        case 24:
          me(l, Gt, t.memoizedState.cache);
      }
      return Jl(t, l, e);
    }
    function ko(t, l, e) {
      if (t !== null)
        if (t.memoizedProps !== l.pendingProps)
          Zt = !0;
        else {
          if (!tc(t, e) && (l.flags & 128) === 0)
            return Zt = !1, nv(
              t,
              l,
              e
            );
          Zt = (t.flags & 131072) !== 0;
        }
      else
        Zt = !1, gt && (l.flags & 1048576) !== 0 && Us(l, Ta, l.index);
      switch (l.lanes = 0, l.tag) {
        case 16:
          t: {
            t = l.pendingProps;
            var n = l.elementType, a = n._init;
            if (n = a(n._payload), l.type = n, typeof n == "function")
              yc(n) ? (t = Ke(n, t), l.tag = 1, l = Vo(
                null,
                l,
                n,
                t,
                e
              )) : (l.tag = 0, l = Kf(
                null,
                l,
                n,
                t,
                e
              ));
            else {
              if (n != null) {
                if (a = n.$$typeof, a === Q) {
                  l.tag = 11, l = Co(
                    null,
                    l,
                    n,
                    t,
                    e
                  );
                  break t;
                } else if (a === I) {
                  l.tag = 14, l = Xo(
                    null,
                    l,
                    n,
                    t,
                    e
                  );
                  break t;
                }
              }
              throw l = bt(n) || n, Error(c(306, l, ""));
            }
          }
          return l;
        case 0:
          return Kf(
            t,
            l,
            l.type,
            l.pendingProps,
            e
          );
        case 1:
          return n = l.type, a = Ke(
            n,
            l.pendingProps
          ), Vo(
            t,
            l,
            n,
            a,
            e
          );
        case 3:
          t: {
            if (aa(
              l,
              l.stateNode.containerInfo
            ), t === null) throw Error(c(387));
            var f = l.pendingProps;
            a = l.memoizedState, n = a.element, ac(t, l), Tu(l, f, null, e);
            var s = l.memoizedState;
            if (f = s.cache, me(l, Gt, f), f !== a.cache && nc(
              l,
              [Gt],
              e,
              !0
            ), Mu(), f = s.element, a.isDehydrated)
              if (a = {
                element: f,
                isDehydrated: !1,
                cache: s.cache
              }, l.updateQueue.baseState = a, l.memoizedState = a, l.flags & 256) {
                l = Lo(
                  t,
                  l,
                  f,
                  e
                );
                break t;
              } else if (f !== n) {
                n = ml(
                  Error(c(424)),
                  l
                ), hu(n), l = Lo(
                  t,
                  l,
                  f,
                  e
                );
                break t;
              } else
                for (Lt = Ol(
                  l.stateNode.containerInfo.firstChild
                ), Pt = l, gt = !0, Tl = null, wl = !0, e = Qs(
                  l,
                  null,
                  f,
                  e
                ), l.child = e; e; )
                  e.flags = e.flags & -3 | 4096, e = e.sibling;
            else {
              if (ou(), f === n) {
                l = Jl(
                  t,
                  l,
                  e
                );
                break t;
              }
              Kt(t, l, f, e);
            }
            l = l.child;
          }
          return l;
        case 26:
          return Au(t, l), t === null ? (e = Ph(
            l.type,
            null,
            l.pendingProps,
            null
          )) ? l.memoizedState = e : gt || (e = l.type, t = l.pendingProps, n = ai(
            fe.current
          ).createElement(e), n[Jt] = l, n[tl] = t, $t(n, e, t), Qt(n), l.stateNode = n) : l.memoizedState = Ph(
            l.type,
            t.memoizedProps,
            l.pendingProps,
            t.memoizedState
          ), null;
        case 27:
          return ji(l), t === null && gt && (n = l.stateNode = kh(
            l.type,
            l.pendingProps,
            fe.current
          ), Pt = l, wl = !0, Lt = Ol(
            n.firstChild
          )), n = l.pendingProps.children, t !== null || gt ? Kt(
            t,
            l,
            n,
            e
          ) : l.child = Qe(
            l,
            null,
            n,
            e
          ), Au(t, l), l.child;
        case 5:
          return t === null && gt && ((a = n = Lt) && (n = Hv(
            n,
            l.type,
            l.pendingProps,
            wl
          ), n !== null ? (l.stateNode = n, Pt = l, Lt = Ol(
            n.firstChild
          ), wl = !1, a = !0) : a = !1), a || Ge(l)), ji(l), a = l.type, f = l.pendingProps, s = t !== null ? t.memoizedProps : null, n = f.children, Gc(a, f) ? n = null : s !== null && Gc(a, s) && (l.flags |= 32), l.memoizedState !== null && (a = Of(
            t,
            l,
            Wy,
            null,
            null,
            e
          ), Qu._currentValue = a), Au(t, l), Kt(t, l, n, e), l.child;
        case 6:
          return t === null && gt && ((t = e = Lt) && (e = wv(
            e,
            l.pendingProps,
            wl
          ), e !== null ? (l.stateNode = e, Pt = l, Lt = null, t = !0) : t = !1), t || Ge(l)), null;
        case 13:
          return Ko(t, l, e);
        case 4:
          return aa(
            l,
            l.stateNode.containerInfo
          ), n = l.pendingProps, t === null ? l.child = Qe(
            l,
            null,
            n,
            e
          ) : Kt(
            t,
            l,
            n,
            e
          ), l.child;
        case 11:
          return Co(
            t,
            l,
            l.type,
            l.pendingProps,
            e
          );
        case 7:
          return Kt(
            t,
            l,
            l.pendingProps,
            e
          ), l.child;
        case 8:
          return Kt(
            t,
            l,
            l.pendingProps.children,
            e
          ), l.child;
        case 12:
          return Kt(
            t,
            l,
            l.pendingProps.children,
            e
          ), l.child;
        case 10:
          return n = l.pendingProps, me(l, l.type, n.value), Kt(
            t,
            l,
            n.children,
            e
          ), l.child;
        case 9:
          return a = l.type._context, n = l.pendingProps.children, Je(l), a = kt(a), n = n(a), l.flags |= 1, Kt(t, l, n, e), l.child;
        case 14:
          return Xo(
            t,
            l,
            l.type,
            l.pendingProps,
            e
          );
        case 15:
          return Go(
            t,
            l,
            l.type,
            l.pendingProps,
            e
          );
        case 19:
          return Jo(t, l, e);
        case 22:
          return Qo(t, l, e);
        case 24:
          return Je(l), n = kt(Gt), t === null ? (a = Tf(), a === null && (a = xt, f = xf(), a.pooledCache = f, f.refCount++, f !== null && (a.pooledCacheLanes |= e), a = f), l.memoizedState = {
            parent: n,
            cache: a
          }, uc(l), me(l, Gt, a)) : ((t.lanes & e) !== 0 && (ac(t, l), Tu(l, null, null, e), Mu()), a = t.memoizedState, f = l.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, l.memoizedState = a, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = a), me(l, Gt, n)) : (n = f.cache, me(l, Gt, n), n !== a.cache && nc(
            l,
            [Gt],
            e,
            !0
          ))), Kt(
            t,
            l,
            l.pendingProps.children,
            e
          ), l.child;
        case 29:
          throw l.pendingProps;
      }
      throw Error(c(156, l.tag));
    }
    var lc = vt(null), $e = null, kl = null;
    function me(t, l, e) {
      At(lc, l._currentValue), l._currentValue = e;
    }
    function Wl(t) {
      t._currentValue = lc.current, Tt(lc);
    }
    function ec(t, l, e) {
      for (; t !== null; ) {
        var n = t.alternate;
        if ((t.childLanes & l) !== l ? (t.childLanes |= l, n !== null && (n.childLanes |= l)) : n !== null && (n.childLanes & l) !== l && (n.childLanes |= l), t === e) break;
        t = t.return;
      }
    }
    function nc(t, l, e, n) {
      var a = t.child;
      for (a !== null && (a.return = t); a !== null; ) {
        var f = a.dependencies;
        if (f !== null) {
          var s = a.child;
          f = f.firstContext;
          t: for (; f !== null; ) {
            var y = f;
            f = a;
            for (var _ = 0; _ < l.length; _++)
              if (y.context === l[_]) {
                f.lanes |= e, y = f.alternate, y !== null && (y.lanes |= e), ec(
                  f.return,
                  e,
                  t
                ), n || (s = null);
                break t;
              }
            f = y.next;
          }
        } else if (a.tag === 18) {
          if (s = a.return, s === null) throw Error(c(341));
          s.lanes |= e, f = s.alternate, f !== null && (f.lanes |= e), ec(s, e, t), s = null;
        } else s = a.child;
        if (s !== null) s.return = a;
        else
          for (s = a; s !== null; ) {
            if (s === t) {
              s = null;
              break;
            }
            if (a = s.sibling, a !== null) {
              a.return = s.return, s = a;
              break;
            }
            s = s.return;
          }
        a = s;
      }
    }
    function Eu(t, l, e, n) {
      t = null;
      for (var a = l, f = !1; a !== null; ) {
        if (!f) {
          if ((a.flags & 524288) !== 0) f = !0;
          else if ((a.flags & 262144) !== 0) break;
        }
        if (a.tag === 10) {
          var s = a.alternate;
          if (s === null) throw Error(c(387));
          if (s = s.memoizedProps, s !== null) {
            var y = a.type;
            cl(a.pendingProps.value, s.value) || (t !== null ? t.push(y) : t = [y]);
          }
        } else if (a === ua.current) {
          if (s = a.alternate, s === null) throw Error(c(387));
          s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(Qu) : t = [Qu]);
        }
        a = a.return;
      }
      t !== null && nc(
        l,
        t,
        e,
        n
      ), l.flags |= 262144;
    }
    function ja(t) {
      for (t = t.firstContext; t !== null; ) {
        if (!cl(
          t.context._currentValue,
          t.memoizedValue
        ))
          return !0;
        t = t.next;
      }
      return !1;
    }
    function Je(t) {
      $e = t, kl = null, t = t.dependencies, t !== null && (t.firstContext = null);
    }
    function kt(t) {
      return Wo($e, t);
    }
    function Va(t, l) {
      return $e === null && Je(t), Wo(t, l);
    }
    function Wo(t, l) {
      var e = l._currentValue;
      if (l = { context: l, memoizedValue: e, next: null }, kl === null) {
        if (t === null) throw Error(c(308));
        kl = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
      } else kl = kl.next = l;
      return e;
    }
    var ge = !1;
    function uc(t) {
      t.updateQueue = {
        baseState: t.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function ac(t, l) {
      t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        callbacks: null
      });
    }
    function _e(t) {
      return { lane: t, tag: 0, payload: null, callback: null, next: null };
    }
    function pe(t, l, e) {
      var n = t.updateQueue;
      if (n === null) return null;
      if (n = n.shared, (Rt & 2) !== 0) {
        var a = n.pending;
        return a === null ? l.next = l : (l.next = a.next, a.next = l), n.pending = l, l = xa(t), Rs(t, null, e), l;
      }
      return Ea(t, n, l, e), xa(t);
    }
    function xu(t, l, e) {
      if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194176) !== 0)) {
        var n = l.lanes;
        n &= t.pendingLanes, e |= n, l.lanes = e, Cr(t, e);
      }
    }
    function ic(t, l) {
      var e = t.updateQueue, n = t.alternate;
      if (n !== null && (n = n.updateQueue, e === n)) {
        var a = null, f = null;
        if (e = e.firstBaseUpdate, e !== null) {
          do {
            var s = {
              lane: e.lane,
              tag: e.tag,
              payload: e.payload,
              callback: null,
              next: null
            };
            f === null ? a = f = s : f = f.next = s, e = e.next;
          } while (e !== null);
          f === null ? a = f = l : f = f.next = l;
        } else a = f = l;
        e = {
          baseState: n.baseState,
          firstBaseUpdate: a,
          lastBaseUpdate: f,
          shared: n.shared,
          callbacks: n.callbacks
        }, t.updateQueue = e;
        return;
      }
      t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
    }
    var fc = !1;
    function Mu() {
      if (fc) {
        var t = Tn;
        if (t !== null) throw t;
      }
    }
    function Tu(t, l, e, n) {
      fc = !1;
      var a = t.updateQueue;
      ge = !1;
      var f = a.firstBaseUpdate, s = a.lastBaseUpdate, y = a.shared.pending;
      if (y !== null) {
        a.shared.pending = null;
        var _ = y, A = _.next;
        _.next = null, s === null ? f = A : s.next = A, s = _;
        var R = t.alternate;
        R !== null && (R = R.updateQueue, y = R.lastBaseUpdate, y !== s && (y === null ? R.firstBaseUpdate = A : y.next = A, R.lastBaseUpdate = _));
      }
      if (f !== null) {
        var H = a.baseState;
        s = 0, R = A = _ = null, y = f;
        do {
          var z = y.lane & -536870913, D = z !== y.lane;
          if (D ? (mt & z) === z : (n & z) === z) {
            z !== 0 && z === Mn && (fc = !0), R !== null && (R = R.next = {
              lane: 0,
              tag: y.tag,
              payload: y.payload,
              callback: null,
              next: null
            });
            t: {
              var L = t, it = y;
              z = l;
              var Ht = e;
              switch (it.tag) {
                case 1:
                  if (L = it.payload, typeof L == "function") {
                    H = L.call(Ht, H, z);
                    break t;
                  }
                  H = L;
                  break t;
                case 3:
                  L.flags = L.flags & -65537 | 128;
                case 0:
                  if (L = it.payload, z = typeof L == "function" ? L.call(Ht, H, z) : L, z == null) break t;
                  H = $({}, H, z);
                  break t;
                case 2:
                  ge = !0;
              }
            }
            z = y.callback, z !== null && (t.flags |= 64, D && (t.flags |= 8192), D = a.callbacks, D === null ? a.callbacks = [z] : D.push(z));
          } else
            D = {
              lane: z,
              tag: y.tag,
              payload: y.payload,
              callback: y.callback,
              next: null
            }, R === null ? (A = R = D, _ = H) : R = R.next = D, s |= z;
          if (y = y.next, y === null) {
            if (y = a.shared.pending, y === null)
              break;
            D = y, y = D.next, D.next = null, a.lastBaseUpdate = D, a.shared.pending = null;
          }
        } while (!0);
        R === null && (_ = H), a.baseState = _, a.firstBaseUpdate = A, a.lastBaseUpdate = R, f === null && (a.shared.lanes = 0), xe |= s, t.lanes = s, t.memoizedState = H;
      }
    }
    function Fo(t, l) {
      if (typeof t != "function")
        throw Error(c(191, t));
      t.call(l);
    }
    function Po(t, l) {
      var e = t.callbacks;
      if (e !== null)
        for (t.callbacks = null, t = 0; t < e.length; t++)
          Fo(e[t], l);
    }
    function zu(t, l) {
      try {
        var e = l.updateQueue, n = e !== null ? e.lastEffect : null;
        if (n !== null) {
          var a = n.next;
          e = a;
          do {
            if ((e.tag & t) === t) {
              n = void 0;
              var f = e.create, s = e.inst;
              n = f(), s.destroy = n;
            }
            e = e.next;
          } while (e !== a);
        }
      } catch (y) {
        Et(l, l.return, y);
      }
    }
    function Se(t, l, e) {
      try {
        var n = l.updateQueue, a = n !== null ? n.lastEffect : null;
        if (a !== null) {
          var f = a.next;
          n = f;
          do {
            if ((n.tag & t) === t) {
              var s = n.inst, y = s.destroy;
              if (y !== void 0) {
                s.destroy = void 0, a = l;
                var _ = e;
                try {
                  y();
                } catch (A) {
                  Et(
                    a,
                    _,
                    A
                  );
                }
              }
            }
            n = n.next;
          } while (n !== f);
        }
      } catch (A) {
        Et(l, l.return, A);
      }
    }
    function Io(t) {
      var l = t.updateQueue;
      if (l !== null) {
        var e = t.stateNode;
        try {
          Po(l, e);
        } catch (n) {
          Et(t, t.return, n);
        }
      }
    }
    function th(t, l, e) {
      e.props = Ke(
        t.type,
        t.memoizedProps
      ), e.state = t.memoizedState;
      try {
        e.componentWillUnmount();
      } catch (n) {
        Et(t, l, n);
      }
    }
    function ke(t, l) {
      try {
        var e = t.ref;
        if (e !== null) {
          var n = t.stateNode;
          switch (t.tag) {
            case 26:
            case 27:
            case 5:
              var a = n;
              break;
            default:
              a = n;
          }
          typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
        }
      } catch (f) {
        Et(t, l, f);
      }
    }
    function rl(t, l) {
      var e = t.ref, n = t.refCleanup;
      if (e !== null)
        if (typeof n == "function")
          try {
            n();
          } catch (a) {
            Et(t, l, a);
          } finally {
            t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
          }
        else if (typeof e == "function")
          try {
            e(null);
          } catch (a) {
            Et(t, l, a);
          }
        else e.current = null;
    }
    function lh(t) {
      var l = t.type, e = t.memoizedProps, n = t.stateNode;
      try {
        t: switch (l) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            e.autoFocus && n.focus();
            break t;
          case "img":
            e.src ? n.src = e.src : e.srcSet && (n.srcset = e.srcSet);
        }
      } catch (a) {
        Et(t, t.return, a);
      }
    }
    function eh(t, l, e) {
      try {
        var n = t.stateNode;
        Ov(n, t.type, e, l), n[tl] = l;
      } catch (a) {
        Et(t, t.return, a);
      }
    }
    function nh(t) {
      return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 || t.tag === 4;
    }
    function cc(t) {
      t: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || nh(t.return)) return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 27 && t.tag !== 18; ) {
          if (t.flags & 2 || t.child === null || t.tag === 4) continue t;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & 2)) return t.stateNode;
      }
    }
    function rc(t, l, e) {
      var n = t.tag;
      if (n === 5 || n === 6)
        t = t.stateNode, l ? e.nodeType === 8 ? e.parentNode.insertBefore(t, l) : e.insertBefore(t, l) : (e.nodeType === 8 ? (l = e.parentNode, l.insertBefore(t, e)) : (l = e, l.appendChild(t)), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = ui));
      else if (n !== 4 && n !== 27 && (t = t.child, t !== null))
        for (rc(t, l, e), t = t.sibling; t !== null; )
          rc(t, l, e), t = t.sibling;
    }
    function La(t, l, e) {
      var n = t.tag;
      if (n === 5 || n === 6)
        t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
      else if (n !== 4 && n !== 27 && (t = t.child, t !== null))
        for (La(t, l, e), t = t.sibling; t !== null; )
          La(t, l, e), t = t.sibling;
    }
    var Fl = !1, Nt = !1, sc = !1, uh = typeof WeakSet == "function" ? WeakSet : Set, jt = null, ah = !1;
    function uv(t, l) {
      if (t = t.containerInfo, Cc = oi, t = bs(t), hf(t)) {
        if ("selectionStart" in t)
          var e = {
            start: t.selectionStart,
            end: t.selectionEnd
          };
        else
          t: {
            e = (e = t.ownerDocument) && e.defaultView || window;
            var n = e.getSelection && e.getSelection();
            if (n && n.rangeCount !== 0) {
              e = n.anchorNode;
              var a = n.anchorOffset, f = n.focusNode;
              n = n.focusOffset;
              try {
                e.nodeType, f.nodeType;
              } catch {
                e = null;
                break t;
              }
              var s = 0, y = -1, _ = -1, A = 0, R = 0, H = t, z = null;
              l: for (; ; ) {
                for (var D; H !== e || a !== 0 && H.nodeType !== 3 || (y = s + a), H !== f || n !== 0 && H.nodeType !== 3 || (_ = s + n), H.nodeType === 3 && (s += H.nodeValue.length), (D = H.firstChild) !== null; )
                  z = H, H = D;
                for (; ; ) {
                  if (H === t) break l;
                  if (z === e && ++A === a && (y = s), z === f && ++R === n && (_ = s), (D = H.nextSibling) !== null) break;
                  H = z, z = H.parentNode;
                }
                H = D;
              }
              e = y === -1 || _ === -1 ? null : { start: y, end: _ };
            } else e = null;
          }
        e = e || { start: 0, end: 0 };
      } else e = null;
      for (Xc = { focusedElem: t, selectionRange: e }, oi = !1, jt = l; jt !== null; )
        if (l = jt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
          t.return = l, jt = t;
        else
          for (; jt !== null; ) {
            switch (l = jt, f = l.alternate, t = l.flags, l.tag) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                if ((t & 1024) !== 0 && f !== null) {
                  t = void 0, e = l, a = f.memoizedProps, f = f.memoizedState, n = e.stateNode;
                  try {
                    var L = Ke(
                      e.type,
                      a,
                      e.elementType === e.type
                    );
                    t = n.getSnapshotBeforeUpdate(
                      L,
                      f
                    ), n.__reactInternalSnapshotBeforeUpdate = t;
                  } catch (it) {
                    Et(
                      e,
                      e.return,
                      it
                    );
                  }
                }
                break;
              case 3:
                if ((t & 1024) !== 0) {
                  if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                    jc(t);
                  else if (e === 1)
                    switch (t.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        jc(t);
                        break;
                      default:
                        t.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((t & 1024) !== 0) throw Error(c(163));
            }
            if (t = l.sibling, t !== null) {
              t.return = l.return, jt = t;
              break;
            }
            jt = l.return;
          }
      return L = ah, ah = !1, L;
    }
    function ih(t, l, e) {
      var n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Il(t, e), n & 4 && zu(5, e);
          break;
        case 1:
          if (Il(t, e), n & 4)
            if (t = e.stateNode, l === null)
              try {
                t.componentDidMount();
              } catch (y) {
                Et(e, e.return, y);
              }
            else {
              var a = Ke(
                e.type,
                l.memoizedProps
              );
              l = l.memoizedState;
              try {
                t.componentDidUpdate(
                  a,
                  l,
                  t.__reactInternalSnapshotBeforeUpdate
                );
              } catch (y) {
                Et(
                  e,
                  e.return,
                  y
                );
              }
            }
          n & 64 && Io(e), n & 512 && ke(e, e.return);
          break;
        case 3:
          if (Il(t, e), n & 64 && (n = e.updateQueue, n !== null)) {
            if (t = null, e.child !== null)
              switch (e.child.tag) {
                case 27:
                case 5:
                  t = e.child.stateNode;
                  break;
                case 1:
                  t = e.child.stateNode;
              }
            try {
              Po(n, t);
            } catch (y) {
              Et(e, e.return, y);
            }
          }
          break;
        case 26:
          Il(t, e), n & 512 && ke(e, e.return);
          break;
        case 27:
        case 5:
          Il(t, e), l === null && n & 4 && lh(e), n & 512 && ke(e, e.return);
          break;
        case 12:
          Il(t, e);
          break;
        case 13:
          Il(t, e), n & 4 && rh(t, e);
          break;
        case 22:
          if (a = e.memoizedState !== null || Fl, !a) {
            l = l !== null && l.memoizedState !== null || Nt;
            var f = Fl, s = Nt;
            Fl = a, (Nt = l) && !s ? be(
              t,
              e,
              (e.subtreeFlags & 8772) !== 0
            ) : Il(t, e), Fl = f, Nt = s;
          }
          n & 512 && (e.memoizedProps.mode === "manual" ? ke(e, e.return) : rl(e, e.return));
          break;
        default:
          Il(t, e);
      }
    }
    function fh(t) {
      var l = t.alternate;
      l !== null && (t.alternate = null, fh(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && ki(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
    }
    var Bt = null, sl = !1;
    function Pl(t, l, e) {
      for (e = e.child; e !== null; )
        ch(t, l, e), e = e.sibling;
    }
    function ch(t, l, e) {
      if (il && typeof il.onCommitFiberUnmount == "function")
        try {
          il.onCommitFiberUnmount(Wn, e);
        } catch {
        }
      switch (e.tag) {
        case 26:
          Nt || rl(e, l), Pl(
            t,
            l,
            e
          ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
          break;
        case 27:
          Nt || rl(e, l);
          var n = Bt, a = sl;
          for (Bt = e.stateNode, Pl(
            t,
            l,
            e
          ), e = e.stateNode, l = e.attributes; l.length; )
            e.removeAttributeNode(l[0]);
          ki(e), Bt = n, sl = a;
          break;
        case 5:
          Nt || rl(e, l);
        case 6:
          a = Bt;
          var f = sl;
          if (Bt = null, Pl(
            t,
            l,
            e
          ), Bt = a, sl = f, Bt !== null)
            if (sl)
              try {
                t = Bt, n = e.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n);
              } catch (s) {
                Et(
                  e,
                  l,
                  s
                );
              }
            else
              try {
                Bt.removeChild(e.stateNode);
              } catch (s) {
                Et(
                  e,
                  l,
                  s
                );
              }
          break;
        case 18:
          Bt !== null && (sl ? (l = Bt, e = e.stateNode, l.nodeType === 8 ? Zc(
            l.parentNode,
            e
          ) : l.nodeType === 1 && Zc(l, e), Lu(l)) : Zc(Bt, e.stateNode));
          break;
        case 4:
          n = Bt, a = sl, Bt = e.stateNode.containerInfo, sl = !0, Pl(
            t,
            l,
            e
          ), Bt = n, sl = a;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Nt || Se(2, e, l), Nt || Se(4, e, l), Pl(
            t,
            l,
            e
          );
          break;
        case 1:
          Nt || (rl(e, l), n = e.stateNode, typeof n.componentWillUnmount == "function" && th(
            e,
            l,
            n
          )), Pl(
            t,
            l,
            e
          );
          break;
        case 21:
          Pl(
            t,
            l,
            e
          );
          break;
        case 22:
          Nt || rl(e, l), Nt = (n = Nt) || e.memoizedState !== null, Pl(
            t,
            l,
            e
          ), Nt = n;
          break;
        default:
          Pl(
            t,
            l,
            e
          );
      }
    }
    function rh(t, l) {
      if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
        try {
          Lu(t);
        } catch (e) {
          Et(l, l.return, e);
        }
    }
    function av(t) {
      switch (t.tag) {
        case 13:
        case 19:
          var l = t.stateNode;
          return l === null && (l = t.stateNode = new uh()), l;
        case 22:
          return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new uh()), l;
        default:
          throw Error(c(435, t.tag));
      }
    }
    function oc(t, l) {
      var e = av(t);
      l.forEach(function(n) {
        var a = _v.bind(null, t, n);
        e.has(n) || (e.add(n), n.then(a, a));
      });
    }
    function Sl(t, l) {
      var e = l.deletions;
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n], f = t, s = l, y = s;
          t: for (; y !== null; ) {
            switch (y.tag) {
              case 27:
              case 5:
                Bt = y.stateNode, sl = !1;
                break t;
              case 3:
                Bt = y.stateNode.containerInfo, sl = !0;
                break t;
              case 4:
                Bt = y.stateNode.containerInfo, sl = !0;
                break t;
            }
            y = y.return;
          }
          if (Bt === null) throw Error(c(160));
          ch(f, s, a), Bt = null, sl = !1, f = a.alternate, f !== null && (f.return = null), a.return = null;
        }
      if (l.subtreeFlags & 13878)
        for (l = l.child; l !== null; )
          sh(l, t), l = l.sibling;
    }
    var zl = null;
    function sh(t, l) {
      var e = t.alternate, n = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Sl(l, t), bl(t), n & 4 && (Se(3, t, t.return), zu(3, t), Se(5, t, t.return));
          break;
        case 1:
          Sl(l, t), bl(t), n & 512 && (Nt || e === null || rl(e, e.return)), n & 64 && Fl && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? n : e.concat(n))));
          break;
        case 26:
          var a = zl;
          if (Sl(l, t), bl(t), n & 512 && (Nt || e === null || rl(e, e.return)), n & 4) {
            var f = e !== null ? e.memoizedState : null;
            if (n = t.memoizedState, e === null)
              if (n === null)
                if (t.stateNode === null) {
                  t: {
                    n = t.type, e = t.memoizedProps, a = a.ownerDocument || a;
                    l: switch (n) {
                      case "title":
                        f = a.getElementsByTagName("title")[0], (!f || f[In] || f[Jt] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = a.createElement(n), a.head.insertBefore(
                          f,
                          a.querySelector("head > title")
                        )), $t(f, n, e), f[Jt] = t, Qt(f), n = f;
                        break t;
                      case "link":
                        var s = l0(
                          "link",
                          "href",
                          a
                        ).get(n + (e.href || ""));
                        if (s) {
                          for (var y = 0; y < s.length; y++)
                            if (f = s[y], f.getAttribute("href") === (e.href == null ? null : e.href) && f.getAttribute("rel") === (e.rel == null ? null : e.rel) && f.getAttribute("title") === (e.title == null ? null : e.title) && f.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                              s.splice(y, 1);
                              break l;
                            }
                        }
                        f = a.createElement(n), $t(f, n, e), a.head.appendChild(f);
                        break;
                      case "meta":
                        if (s = l0(
                          "meta",
                          "content",
                          a
                        ).get(n + (e.content || ""))) {
                          for (y = 0; y < s.length; y++)
                            if (f = s[y], f.getAttribute("content") === (e.content == null ? null : "" + e.content) && f.getAttribute("name") === (e.name == null ? null : e.name) && f.getAttribute("property") === (e.property == null ? null : e.property) && f.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && f.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                              s.splice(y, 1);
                              break l;
                            }
                        }
                        f = a.createElement(n), $t(f, n, e), a.head.appendChild(f);
                        break;
                      default:
                        throw Error(c(468, n));
                    }
                    f[Jt] = t, Qt(f), n = f;
                  }
                  t.stateNode = n;
                } else
                  e0(
                    a,
                    t.type,
                    t.stateNode
                  );
              else
                t.stateNode = t0(
                  a,
                  n,
                  t.memoizedProps
                );
            else
              f !== n ? (f === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : f.count--, n === null ? e0(
                a,
                t.type,
                t.stateNode
              ) : t0(
                a,
                n,
                t.memoizedProps
              )) : n === null && t.stateNode !== null && eh(
                t,
                t.memoizedProps,
                e.memoizedProps
              );
          }
          break;
        case 27:
          if (n & 4 && t.alternate === null) {
            a = t.stateNode, f = t.memoizedProps;
            try {
              for (var _ = a.firstChild; _; ) {
                var A = _.nextSibling, R = _.nodeName;
                _[In] || R === "HEAD" || R === "BODY" || R === "SCRIPT" || R === "STYLE" || R === "LINK" && _.rel.toLowerCase() === "stylesheet" || a.removeChild(_), _ = A;
              }
              for (var H = t.type, z = a.attributes; z.length; )
                a.removeAttributeNode(z[0]);
              $t(a, H, f), a[Jt] = t, a[tl] = f;
            } catch (L) {
              Et(t, t.return, L);
            }
          }
        case 5:
          if (Sl(l, t), bl(t), n & 512 && (Nt || e === null || rl(e, e.return)), t.flags & 32) {
            a = t.stateNode;
            try {
              dn(a, "");
            } catch (L) {
              Et(t, t.return, L);
            }
          }
          n & 4 && t.stateNode != null && (a = t.memoizedProps, eh(
            t,
            a,
            e !== null ? e.memoizedProps : a
          )), n & 1024 && (sc = !0);
          break;
        case 6:
          if (Sl(l, t), bl(t), n & 4) {
            if (t.stateNode === null)
              throw Error(c(162));
            n = t.memoizedProps, e = t.stateNode;
            try {
              e.nodeValue = n;
            } catch (L) {
              Et(t, t.return, L);
            }
          }
          break;
        case 3:
          if (ci = null, a = zl, zl = ii(l.containerInfo), Sl(l, t), zl = a, bl(t), n & 4 && e !== null && e.memoizedState.isDehydrated)
            try {
              Lu(l.containerInfo);
            } catch (L) {
              Et(t, t.return, L);
            }
          sc && (sc = !1, oh(t));
          break;
        case 4:
          n = zl, zl = ii(
            t.stateNode.containerInfo
          ), Sl(l, t), bl(t), zl = n;
          break;
        case 12:
          Sl(l, t), bl(t);
          break;
        case 13:
          Sl(l, t), bl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Sc = Hl()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, oc(t, n)));
          break;
        case 22:
          if (n & 512 && (Nt || e === null || rl(e, e.return)), _ = t.memoizedState !== null, A = e !== null && e.memoizedState !== null, R = Fl, H = Nt, Fl = R || _, Nt = H || A, Sl(l, t), Nt = H, Fl = R, bl(t), l = t.stateNode, l._current = t, l._visibility &= -3, l._visibility |= l._pendingVisibility & 2, n & 8192 && (l._visibility = _ ? l._visibility & -2 : l._visibility | 1, _ && (l = Fl || Nt, e === null || A || l || Rn(t)), t.memoizedProps === null || t.memoizedProps.mode !== "manual"))
            t: for (e = null, l = t; ; ) {
              if (l.tag === 5 || l.tag === 26 || l.tag === 27) {
                if (e === null) {
                  A = e = l;
                  try {
                    if (a = A.stateNode, _)
                      f = a.style, typeof f.setProperty == "function" ? f.setProperty(
                        "display",
                        "none",
                        "important"
                      ) : f.display = "none";
                    else {
                      s = A.stateNode, y = A.memoizedProps.style;
                      var D = y != null && y.hasOwnProperty("display") ? y.display : null;
                      s.style.display = D == null || typeof D == "boolean" ? "" : ("" + D).trim();
                    }
                  } catch (L) {
                    Et(A, A.return, L);
                  }
                }
              } else if (l.tag === 6) {
                if (e === null) {
                  A = l;
                  try {
                    A.stateNode.nodeValue = _ ? "" : A.memoizedProps;
                  } catch (L) {
                    Et(A, A.return, L);
                  }
                }
              } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
                l.child.return = l, l = l.child;
                continue;
              }
              if (l === t) break t;
              for (; l.sibling === null; ) {
                if (l.return === null || l.return === t) break t;
                e === l && (e = null), l = l.return;
              }
              e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
            }
          n & 4 && (n = t.updateQueue, n !== null && (e = n.retryQueue, e !== null && (n.retryQueue = null, oc(t, e))));
          break;
        case 19:
          Sl(l, t), bl(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, oc(t, n)));
          break;
        case 21:
          break;
        default:
          Sl(l, t), bl(t);
      }
    }
    function bl(t) {
      var l = t.flags;
      if (l & 2) {
        try {
          if (t.tag !== 27) {
            t: {
              for (var e = t.return; e !== null; ) {
                if (nh(e)) {
                  var n = e;
                  break t;
                }
                e = e.return;
              }
              throw Error(c(160));
            }
            switch (n.tag) {
              case 27:
                var a = n.stateNode, f = cc(t);
                La(t, f, a);
                break;
              case 5:
                var s = n.stateNode;
                n.flags & 32 && (dn(s, ""), n.flags &= -33);
                var y = cc(t);
                La(t, y, s);
                break;
              case 3:
              case 4:
                var _ = n.stateNode.containerInfo, A = cc(t);
                rc(
                  t,
                  A,
                  _
                );
                break;
              default:
                throw Error(c(161));
            }
          }
        } catch (R) {
          Et(t, t.return, R);
        }
        t.flags &= -3;
      }
      l & 4096 && (t.flags &= -4097);
    }
    function oh(t) {
      if (t.subtreeFlags & 1024)
        for (t = t.child; t !== null; ) {
          var l = t;
          oh(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
        }
    }
    function Il(t, l) {
      if (l.subtreeFlags & 8772)
        for (l = l.child; l !== null; )
          ih(t, l.alternate, l), l = l.sibling;
    }
    function Rn(t) {
      for (t = t.child; t !== null; ) {
        var l = t;
        switch (l.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Se(4, l, l.return), Rn(l);
            break;
          case 1:
            rl(l, l.return);
            var e = l.stateNode;
            typeof e.componentWillUnmount == "function" && th(
              l,
              l.return,
              e
            ), Rn(l);
            break;
          case 26:
          case 27:
          case 5:
            rl(l, l.return), Rn(l);
            break;
          case 22:
            rl(l, l.return), l.memoizedState === null && Rn(l);
            break;
          default:
            Rn(l);
        }
        t = t.sibling;
      }
    }
    function be(t, l, e) {
      for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
        var n = l.alternate, a = t, f = l, s = f.flags;
        switch (f.tag) {
          case 0:
          case 11:
          case 15:
            be(
              a,
              f,
              e
            ), zu(4, f);
            break;
          case 1:
            if (be(
              a,
              f,
              e
            ), n = f, a = n.stateNode, typeof a.componentDidMount == "function")
              try {
                a.componentDidMount();
              } catch (A) {
                Et(n, n.return, A);
              }
            if (n = f, a = n.updateQueue, a !== null) {
              var y = n.stateNode;
              try {
                var _ = a.shared.hiddenCallbacks;
                if (_ !== null)
                  for (a.shared.hiddenCallbacks = null, a = 0; a < _.length; a++)
                    Fo(_[a], y);
              } catch (A) {
                Et(n, n.return, A);
              }
            }
            e && s & 64 && Io(f), ke(f, f.return);
            break;
          case 26:
          case 27:
          case 5:
            be(
              a,
              f,
              e
            ), e && n === null && s & 4 && lh(f), ke(f, f.return);
            break;
          case 12:
            be(
              a,
              f,
              e
            );
            break;
          case 13:
            be(
              a,
              f,
              e
            ), e && s & 4 && rh(a, f);
            break;
          case 22:
            f.memoizedState === null && be(
              a,
              f,
              e
            ), ke(f, f.return);
            break;
          default:
            be(
              a,
              f,
              e
            );
        }
        l = l.sibling;
      }
    }
    function hc(t, l) {
      var e = null;
      t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && gu(e));
    }
    function dc(t, l) {
      t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && gu(t));
    }
    function Ae(t, l, e, n) {
      if (l.subtreeFlags & 10256)
        for (l = l.child; l !== null; )
          hh(
            t,
            l,
            e,
            n
          ), l = l.sibling;
    }
    function hh(t, l, e, n) {
      var a = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Ae(
            t,
            l,
            e,
            n
          ), a & 2048 && zu(9, l);
          break;
        case 3:
          Ae(
            t,
            l,
            e,
            n
          ), a & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && gu(t)));
          break;
        case 12:
          if (a & 2048) {
            Ae(
              t,
              l,
              e,
              n
            ), t = l.stateNode;
            try {
              var f = l.memoizedProps, s = f.id, y = f.onPostCommit;
              typeof y == "function" && y(
                s,
                l.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0
              );
            } catch (_) {
              Et(l, l.return, _);
            }
          } else
            Ae(
              t,
              l,
              e,
              n
            );
          break;
        case 23:
          break;
        case 22:
          f = l.stateNode, l.memoizedState !== null ? f._visibility & 4 ? Ae(
            t,
            l,
            e,
            n
          ) : Ou(t, l) : f._visibility & 4 ? Ae(
            t,
            l,
            e,
            n
          ) : (f._visibility |= 4, Nn(
            t,
            l,
            e,
            n,
            (l.subtreeFlags & 10256) !== 0
          )), a & 2048 && hc(
            l.alternate,
            l
          );
          break;
        case 24:
          Ae(
            t,
            l,
            e,
            n
          ), a & 2048 && dc(l.alternate, l);
          break;
        default:
          Ae(
            t,
            l,
            e,
            n
          );
      }
    }
    function Nn(t, l, e, n, a) {
      for (a = a && (l.subtreeFlags & 10256) !== 0, l = l.child; l !== null; ) {
        var f = t, s = l, y = e, _ = n, A = s.flags;
        switch (s.tag) {
          case 0:
          case 11:
          case 15:
            Nn(
              f,
              s,
              y,
              _,
              a
            ), zu(8, s);
            break;
          case 23:
            break;
          case 22:
            var R = s.stateNode;
            s.memoizedState !== null ? R._visibility & 4 ? Nn(
              f,
              s,
              y,
              _,
              a
            ) : Ou(
              f,
              s
            ) : (R._visibility |= 4, Nn(
              f,
              s,
              y,
              _,
              a
            )), a && A & 2048 && hc(
              s.alternate,
              s
            );
            break;
          case 24:
            Nn(
              f,
              s,
              y,
              _,
              a
            ), a && A & 2048 && dc(s.alternate, s);
            break;
          default:
            Nn(
              f,
              s,
              y,
              _,
              a
            );
        }
        l = l.sibling;
      }
    }
    function Ou(t, l) {
      if (l.subtreeFlags & 10256)
        for (l = l.child; l !== null; ) {
          var e = t, n = l, a = n.flags;
          switch (n.tag) {
            case 22:
              Ou(e, n), a & 2048 && hc(
                n.alternate,
                n
              );
              break;
            case 24:
              Ou(e, n), a & 2048 && dc(n.alternate, n);
              break;
            default:
              Ou(e, n);
          }
          l = l.sibling;
        }
    }
    var Du = 8192;
    function Un(t) {
      if (t.subtreeFlags & Du)
        for (t = t.child; t !== null; )
          dh(t), t = t.sibling;
    }
    function dh(t) {
      switch (t.tag) {
        case 26:
          Un(t), t.flags & Du && t.memoizedState !== null && $v(
            zl,
            t.memoizedState,
            t.memoizedProps
          );
          break;
        case 5:
          Un(t);
          break;
        case 3:
        case 4:
          var l = zl;
          zl = ii(t.stateNode.containerInfo), Un(t), zl = l;
          break;
        case 22:
          t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = Du, Du = 16777216, Un(t), Du = l) : Un(t));
          break;
        default:
          Un(t);
      }
    }
    function yh(t) {
      var l = t.alternate;
      if (l !== null && (t = l.child, t !== null)) {
        l.child = null;
        do
          l = t.sibling, t.sibling = null, t = l;
        while (t !== null);
      }
    }
    function Ru(t) {
      var l = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (l !== null)
          for (var e = 0; e < l.length; e++) {
            var n = l[e];
            jt = n, mh(
              n,
              t
            );
          }
        yh(t);
      }
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          vh(t), t = t.sibling;
    }
    function vh(t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Ru(t), t.flags & 2048 && Se(9, t, t.return);
          break;
        case 3:
          Ru(t);
          break;
        case 12:
          Ru(t);
          break;
        case 22:
          var l = t.stateNode;
          t.memoizedState !== null && l._visibility & 4 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -5, Ka(t)) : Ru(t);
          break;
        default:
          Ru(t);
      }
    }
    function Ka(t) {
      var l = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (l !== null)
          for (var e = 0; e < l.length; e++) {
            var n = l[e];
            jt = n, mh(
              n,
              t
            );
          }
        yh(t);
      }
      for (t = t.child; t !== null; ) {
        switch (l = t, l.tag) {
          case 0:
          case 11:
          case 15:
            Se(8, l, l.return), Ka(l);
            break;
          case 22:
            e = l.stateNode, e._visibility & 4 && (e._visibility &= -5, Ka(l));
            break;
          default:
            Ka(l);
        }
        t = t.sibling;
      }
    }
    function mh(t, l) {
      for (; jt !== null; ) {
        var e = jt;
        switch (e.tag) {
          case 0:
          case 11:
          case 15:
            Se(8, e, l);
            break;
          case 23:
          case 22:
            if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
              var n = e.memoizedState.cachePool.pool;
              n != null && n.refCount++;
            }
            break;
          case 24:
            gu(e.memoizedState.cache);
        }
        if (n = e.child, n !== null) n.return = e, jt = n;
        else
          t: for (e = t; jt !== null; ) {
            n = jt;
            var a = n.sibling, f = n.return;
            if (fh(n), n === e) {
              jt = null;
              break t;
            }
            if (a !== null) {
              a.return = f, jt = a;
              break t;
            }
            jt = f;
          }
      }
    }
    function iv(t, l, e, n) {
      this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Al(t, l, e, n) {
      return new iv(t, l, e, n);
    }
    function yc(t) {
      return t = t.prototype, !(!t || !t.isReactComponent);
    }
    function Ee(t, l) {
      var e = t.alternate;
      return e === null ? (e = Al(
        t.tag,
        l,
        t.key,
        t.mode
      ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 31457280, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
    }
    function gh(t, l) {
      t.flags &= 31457282;
      var e = t.alternate;
      return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
        lanes: l.lanes,
        firstContext: l.firstContext
      }), t;
    }
    function $a(t, l, e, n, a, f) {
      var s = 0;
      if (n = t, typeof t == "function") yc(t) && (s = 1);
      else if (typeof t == "string")
        s = Lv(
          t,
          e,
          al.current
        ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
      else
        t: switch (t) {
          case g:
            return We(e.children, a, f, l);
          case h:
            s = 8, a |= 24;
            break;
          case p:
            return t = Al(12, e, l, a | 2), t.elementType = p, t.lanes = f, t;
          case K:
            return t = Al(13, e, l, a), t.elementType = K, t.lanes = f, t;
          case lt:
            return t = Al(19, e, l, a), t.elementType = lt, t.lanes = f, t;
          case nt:
            return _h(e, a, f, l);
          default:
            if (typeof t == "object" && t !== null)
              switch (t.$$typeof) {
                case x:
                case N:
                  s = 10;
                  break t;
                case M:
                  s = 9;
                  break t;
                case Q:
                  s = 11;
                  break t;
                case I:
                  s = 14;
                  break t;
                case et:
                  s = 16, n = null;
                  break t;
              }
            s = 29, e = Error(
              c(130, t === null ? "null" : typeof t, "")
            ), n = null;
        }
      return l = Al(s, e, l, a), l.elementType = t, l.type = n, l.lanes = f, l;
    }
    function We(t, l, e, n) {
      return t = Al(7, t, n, l), t.lanes = e, t;
    }
    function _h(t, l, e, n) {
      t = Al(22, t, n, l), t.elementType = nt, t.lanes = e;
      var a = {
        _visibility: 1,
        _pendingVisibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
        _current: null,
        detach: function() {
          var f = a._current;
          if (f === null) throw Error(c(456));
          if ((a._pendingVisibility & 2) === 0) {
            var s = oe(f, 2);
            s !== null && (a._pendingVisibility |= 2, It(s, f, 2));
          }
        },
        attach: function() {
          var f = a._current;
          if (f === null) throw Error(c(456));
          if ((a._pendingVisibility & 2) !== 0) {
            var s = oe(f, 2);
            s !== null && (a._pendingVisibility &= -3, It(s, f, 2));
          }
        }
      };
      return t.stateNode = a, t;
    }
    function vc(t, l, e) {
      return t = Al(6, t, null, l), t.lanes = e, t;
    }
    function mc(t, l, e) {
      return l = Al(
        4,
        t.children !== null ? t.children : [],
        t.key,
        l
      ), l.lanes = e, l.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation
      }, l;
    }
    function te(t) {
      t.flags |= 4;
    }
    function ph(t, l) {
      if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
        t.flags &= -16777217;
      else if (t.flags |= 16777216, !n0(l)) {
        if (l = pl.current, l !== null && ((mt & 4194176) === mt ? ql !== null : (mt & 62914560) !== mt && (mt & 536870912) === 0 || l !== ql))
          throw yu = bf, qs;
        t.flags |= 8192;
      }
    }
    function Ja(t, l) {
      l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? Yr() : 536870912, t.lanes |= l, wn |= l);
    }
    function Nu(t, l) {
      if (!gt)
        switch (t.tailMode) {
          case "hidden":
            l = t.tail;
            for (var e = null; l !== null; )
              l.alternate !== null && (e = l), l = l.sibling;
            e === null ? t.tail = null : e.sibling = null;
            break;
          case "collapsed":
            e = t.tail;
            for (var n = null; e !== null; )
              e.alternate !== null && (n = e), e = e.sibling;
            n === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
        }
    }
    function Dt(t) {
      var l = t.alternate !== null && t.alternate.child === t.child, e = 0, n = 0;
      if (l)
        for (var a = t.child; a !== null; )
          e |= a.lanes | a.childLanes, n |= a.subtreeFlags & 31457280, n |= a.flags & 31457280, a.return = t, a = a.sibling;
      else
        for (a = t.child; a !== null; )
          e |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = t, a = a.sibling;
      return t.subtreeFlags |= n, t.childLanes = e, l;
    }
    function fv(t, l, e) {
      var n = l.pendingProps;
      switch (pf(l), l.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Dt(l), null;
        case 1:
          return Dt(l), null;
        case 3:
          return e = l.stateNode, n = null, t !== null && (n = t.memoizedState.cache), l.memoizedState.cache !== n && (l.flags |= 2048), Wl(Gt), fn(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (su(l) ? te(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Tl !== null && (xc(Tl), Tl = null))), Dt(l), null;
        case 26:
          return e = l.memoizedState, t === null ? (te(l), e !== null ? (Dt(l), ph(l, e)) : (Dt(l), l.flags &= -16777217)) : e ? e !== t.memoizedState ? (te(l), Dt(l), ph(l, e)) : (Dt(l), l.flags &= -16777217) : (t.memoizedProps !== n && te(l), Dt(l), l.flags &= -16777217), null;
        case 27:
          ia(l), e = fe.current;
          var a = l.type;
          if (t !== null && l.stateNode != null)
            t.memoizedProps !== n && te(l);
          else {
            if (!n) {
              if (l.stateNode === null)
                throw Error(c(166));
              return Dt(l), null;
            }
            t = al.current, su(l) ? Hs(l) : (t = kh(a, n, e), l.stateNode = t, te(l));
          }
          return Dt(l), null;
        case 5:
          if (ia(l), e = l.type, t !== null && l.stateNode != null)
            t.memoizedProps !== n && te(l);
          else {
            if (!n) {
              if (l.stateNode === null)
                throw Error(c(166));
              return Dt(l), null;
            }
            if (t = al.current, su(l))
              Hs(l);
            else {
              switch (a = ai(
                fe.current
              ), t) {
                case 1:
                  t = a.createElementNS(
                    "http://www.w3.org/2000/svg",
                    e
                  );
                  break;
                case 2:
                  t = a.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    e
                  );
                  break;
                default:
                  switch (e) {
                    case "svg":
                      t = a.createElementNS(
                        "http://www.w3.org/2000/svg",
                        e
                      );
                      break;
                    case "math":
                      t = a.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        e
                      );
                      break;
                    case "script":
                      t = a.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
                      break;
                    case "select":
                      t = typeof n.is == "string" ? a.createElement("select", { is: n.is }) : a.createElement("select"), n.multiple ? t.multiple = !0 : n.size && (t.size = n.size);
                      break;
                    default:
                      t = typeof n.is == "string" ? a.createElement(e, { is: n.is }) : a.createElement(e);
                  }
              }
              t[Jt] = l, t[tl] = n;
              t: for (a = l.child; a !== null; ) {
                if (a.tag === 5 || a.tag === 6)
                  t.appendChild(a.stateNode);
                else if (a.tag !== 4 && a.tag !== 27 && a.child !== null) {
                  a.child.return = a, a = a.child;
                  continue;
                }
                if (a === l) break t;
                for (; a.sibling === null; ) {
                  if (a.return === null || a.return === l)
                    break t;
                  a = a.return;
                }
                a.sibling.return = a.return, a = a.sibling;
              }
              l.stateNode = t;
              t: switch ($t(t, e, n), e) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  t = !!n.autoFocus;
                  break t;
                case "img":
                  t = !0;
                  break t;
                default:
                  t = !1;
              }
              t && te(l);
            }
          }
          return Dt(l), l.flags &= -16777217, null;
        case 6:
          if (t && l.stateNode != null)
            t.memoizedProps !== n && te(l);
          else {
            if (typeof n != "string" && l.stateNode === null)
              throw Error(c(166));
            if (t = fe.current, su(l)) {
              if (t = l.stateNode, e = l.memoizedProps, n = null, a = Pt, a !== null)
                switch (a.tag) {
                  case 27:
                  case 5:
                    n = a.memoizedProps;
                }
              t[Jt] = l, t = !!(t.nodeValue === e || n !== null && n.suppressHydrationWarning === !0 || jh(t.nodeValue, e)), t || Ge(l);
            } else
              t = ai(t).createTextNode(
                n
              ), t[Jt] = l, l.stateNode = t;
          }
          return Dt(l), null;
        case 13:
          if (n = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
            if (a = su(l), n !== null && n.dehydrated !== null) {
              if (t === null) {
                if (!a) throw Error(c(318));
                if (a = l.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(c(317));
                a[Jt] = l;
              } else
                ou(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
              Dt(l), a = !1;
            } else
              Tl !== null && (xc(Tl), Tl = null), a = !0;
            if (!a)
              return l.flags & 256 ? (Kl(l), l) : (Kl(l), null);
          }
          if (Kl(l), (l.flags & 128) !== 0)
            return l.lanes = e, l;
          if (e = n !== null, t = t !== null && t.memoizedState !== null, e) {
            n = l.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool);
            var f = null;
            n.memoizedState !== null && n.memoizedState.cachePool !== null && (f = n.memoizedState.cachePool.pool), f !== a && (n.flags |= 2048);
          }
          return e !== t && e && (l.child.flags |= 8192), Ja(l, l.updateQueue), Dt(l), null;
        case 4:
          return fn(), t === null && qc(l.stateNode.containerInfo), Dt(l), null;
        case 10:
          return Wl(l.type), Dt(l), null;
        case 19:
          if (Tt(Xt), a = l.memoizedState, a === null) return Dt(l), null;
          if (n = (l.flags & 128) !== 0, f = a.rendering, f === null)
            if (n) Nu(a, !1);
            else {
              if (Ut !== 0 || t !== null && (t.flags & 128) !== 0)
                for (t = l.child; t !== null; ) {
                  if (f = Na(t), f !== null) {
                    for (l.flags |= 128, Nu(a, !1), t = f.updateQueue, l.updateQueue = t, Ja(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                      gh(e, t), e = e.sibling;
                    return At(
                      Xt,
                      Xt.current & 1 | 2
                    ), l.child;
                  }
                  t = t.sibling;
                }
              a.tail !== null && Hl() > ka && (l.flags |= 128, n = !0, Nu(a, !1), l.lanes = 4194304);
            }
          else {
            if (!n)
              if (t = Na(f), t !== null) {
                if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, Ja(l, t), Nu(a, !0), a.tail === null && a.tailMode === "hidden" && !f.alternate && !gt)
                  return Dt(l), null;
              } else
                2 * Hl() - a.renderingStartTime > ka && e !== 536870912 && (l.flags |= 128, n = !0, Nu(a, !1), l.lanes = 4194304);
            a.isBackwards ? (f.sibling = l.child, l.child = f) : (t = a.last, t !== null ? t.sibling = f : l.child = f, a.last = f);
          }
          return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Hl(), l.sibling = null, t = Xt.current, At(Xt, n ? t & 1 | 2 : t & 1), l) : (Dt(l), null);
        case 22:
        case 23:
          return Kl(l), Ef(), n = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (l.flags |= 8192) : n && (l.flags |= 8192), n ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Dt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Dt(l), e = l.updateQueue, e !== null && Ja(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), n = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (n = l.memoizedState.cachePool.pool), n !== e && (l.flags |= 2048), t !== null && Tt(Ze), null;
        case 24:
          return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Wl(Gt), Dt(l), null;
        case 25:
          return null;
      }
      throw Error(c(156, l.tag));
    }
    function cv(t, l) {
      switch (pf(l), l.tag) {
        case 1:
          return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
        case 3:
          return Wl(Gt), fn(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
        case 26:
        case 27:
        case 5:
          return ia(l), null;
        case 13:
          if (Kl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
            if (l.alternate === null)
              throw Error(c(340));
            ou();
          }
          return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
        case 19:
          return Tt(Xt), null;
        case 4:
          return fn(), null;
        case 10:
          return Wl(l.type), null;
        case 22:
        case 23:
          return Kl(l), Ef(), t !== null && Tt(Ze), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
        case 24:
          return Wl(Gt), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Sh(t, l) {
      switch (pf(l), l.tag) {
        case 3:
          Wl(Gt), fn();
          break;
        case 26:
        case 27:
        case 5:
          ia(l);
          break;
        case 4:
          fn();
          break;
        case 13:
          Kl(l);
          break;
        case 19:
          Tt(Xt);
          break;
        case 10:
          Wl(l.type);
          break;
        case 22:
        case 23:
          Kl(l), Ef(), t !== null && Tt(Ze);
          break;
        case 24:
          Wl(Gt);
      }
    }
    var rv = {
      getCacheForType: function(t) {
        var l = kt(Gt), e = l.data.get(t);
        return e === void 0 && (e = t(), l.data.set(t, e)), e;
      }
    }, sv = typeof WeakMap == "function" ? WeakMap : Map, Rt = 0, xt = null, ht = null, mt = 0, Mt = 0, ol = null, le = !1, Hn = !1, gc = !1, ee = 0, Ut = 0, xe = 0, Fe = 0, _c = 0, El = 0, wn = 0, Uu = null, Bl = null, pc = !1, Sc = 0, ka = 1 / 0, Wa = null, Me = null, Fa = !1, Pe = null, Hu = 0, bc = 0, Ac = null, wu = 0, Ec = null;
    function hl() {
      if ((Rt & 2) !== 0 && mt !== 0)
        return mt & -mt;
      if (C.T !== null) {
        var t = Mn;
        return t !== 0 ? t : Nc();
      }
      return Gr();
    }
    function bh() {
      El === 0 && (El = (mt & 536870912) === 0 || gt ? qr() : 536870912);
      var t = pl.current;
      return t !== null && (t.flags |= 32), El;
    }
    function It(t, l, e) {
      (t === xt && Mt === 2 || t.cancelPendingCommit !== null) && (qn(t, 0), ne(
        t,
        mt,
        El,
        !1
      )), Pn(t, e), ((Rt & 2) === 0 || t !== xt) && (t === xt && ((Rt & 2) === 0 && (Fe |= e), Ut === 4 && ne(
        t,
        mt,
        El,
        !1
      )), Cl(t));
    }
    function Ah(t, l, e) {
      if ((Rt & 6) !== 0) throw Error(c(327));
      var n = !e && (l & 60) === 0 && (l & t.expiredLanes) === 0 || Fn(t, l), a = n ? dv(t, l) : zc(t, l, !0), f = n;
      do {
        if (a === 0) {
          Hn && !n && ne(t, l, 0, !1);
          break;
        } else if (a === 6)
          ne(
            t,
            l,
            0,
            !le
          );
        else {
          if (e = t.current.alternate, f && !ov(e)) {
            a = zc(t, l, !1), f = !1;
            continue;
          }
          if (a === 2) {
            if (f = l, t.errorRecoveryDisabledLanes & f)
              var s = 0;
            else
              s = t.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
            if (s !== 0) {
              l = s;
              t: {
                var y = t;
                a = Uu;
                var _ = y.current.memoizedState.isDehydrated;
                if (_ && (qn(y, s).flags |= 256), s = zc(
                  y,
                  s,
                  !1
                ), s !== 2) {
                  if (gc && !_) {
                    y.errorRecoveryDisabledLanes |= f, Fe |= f, a = 4;
                    break t;
                  }
                  f = Bl, Bl = a, f !== null && xc(f);
                }
                a = s;
              }
              if (f = !1, a !== 2) continue;
            }
          }
          if (a === 1) {
            qn(t, 0), ne(t, l, 0, !0);
            break;
          }
          t: {
            switch (n = t, a) {
              case 0:
              case 1:
                throw Error(c(345));
              case 4:
                if ((l & 4194176) === l) {
                  ne(
                    n,
                    l,
                    El,
                    !le
                  );
                  break t;
                }
                break;
              case 2:
                Bl = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(c(329));
            }
            if (n.finishedWork = e, n.finishedLanes = l, (l & 62914560) === l && (f = Sc + 300 - Hl(), 10 < f)) {
              if (ne(
                n,
                l,
                El,
                !le
              ), sa(n, 0) !== 0) break t;
              n.timeoutHandle = Kh(
                Eh.bind(
                  null,
                  n,
                  e,
                  Bl,
                  Wa,
                  pc,
                  l,
                  El,
                  Fe,
                  wn,
                  le,
                  2,
                  -0,
                  0
                ),
                f
              );
              break t;
            }
            Eh(
              n,
              e,
              Bl,
              Wa,
              pc,
              l,
              El,
              Fe,
              wn,
              le,
              0,
              -0,
              0
            );
          }
        }
        break;
      } while (!0);
      Cl(t);
    }
    function xc(t) {
      Bl === null ? Bl = t : Bl.push.apply(
        Bl,
        t
      );
    }
    function Eh(t, l, e, n, a, f, s, y, _, A, R, H, z) {
      var D = l.subtreeFlags;
      if ((D & 8192 || (D & 16785408) === 16785408) && (Gu = { stylesheets: null, count: 0, unsuspend: Kv }, dh(l), l = Jv(), l !== null)) {
        t.cancelPendingCommit = l(
          Rh.bind(
            null,
            t,
            e,
            n,
            a,
            s,
            y,
            _,
            1,
            H,
            z
          )
        ), ne(t, f, s, !A);
        return;
      }
      Rh(
        t,
        e,
        n,
        a,
        s,
        y,
        _,
        R,
        H,
        z
      );
    }
    function ov(t) {
      for (var l = t; ; ) {
        var e = l.tag;
        if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
          for (var n = 0; n < e.length; n++) {
            var a = e[n], f = a.getSnapshot;
            a = a.value;
            try {
              if (!cl(f(), a)) return !1;
            } catch {
              return !1;
            }
          }
        if (e = l.child, l.subtreeFlags & 16384 && e !== null)
          e.return = l, l = e;
        else {
          if (l === t) break;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === t) return !0;
            l = l.return;
          }
          l.sibling.return = l.return, l = l.sibling;
        }
      }
      return !0;
    }
    function ne(t, l, e, n) {
      l &= ~_c, l &= ~Fe, t.suspendedLanes |= l, t.pingedLanes &= ~l, n && (t.warmLanes |= l), n = t.expirationTimes;
      for (var a = l; 0 < a; ) {
        var f = 31 - fl(a), s = 1 << f;
        n[f] = -1, a &= ~s;
      }
      e !== 0 && Br(t, e, l);
    }
    function Pa() {
      return (Rt & 6) === 0 ? (qu(0), !1) : !0;
    }
    function Mc() {
      if (ht !== null) {
        if (Mt === 0)
          var t = ht.return;
        else
          t = ht, kl = $e = null, Nf(t), En = null, vu = 0, t = ht;
        for (; t !== null; )
          Sh(t.alternate, t), t = t.return;
        ht = null;
      }
    }
    function qn(t, l) {
      t.finishedWork = null, t.finishedLanes = 0;
      var e = t.timeoutHandle;
      e !== -1 && (t.timeoutHandle = -1, Rv(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Mc(), xt = t, ht = e = Ee(t.current, null), mt = l, Mt = 0, ol = null, le = !1, Hn = Fn(t, l), gc = !1, wn = El = _c = Fe = xe = Ut = 0, Bl = Uu = null, pc = !1, (l & 8) !== 0 && (l |= l & 32);
      var n = t.entangledLanes;
      if (n !== 0)
        for (t = t.entanglements, n &= l; 0 < n; ) {
          var a = 31 - fl(n), f = 1 << a;
          l |= t[a], n &= ~f;
        }
      return ee = l, Aa(), e;
    }
    function xh(t, l) {
      st = null, C.H = Yl, l === du ? (l = Cs(), Mt = 3) : l === qs ? (l = Cs(), Mt = 4) : Mt = l === Bo ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, ol = l, ht === null && (Ut = 1, Za(
        t,
        ml(l, t.current)
      ));
    }
    function Mh() {
      var t = C.H;
      return C.H = Yl, t === null ? Yl : t;
    }
    function Th() {
      var t = C.A;
      return C.A = rv, t;
    }
    function Tc() {
      Ut = 4, le || (mt & 4194176) !== mt && pl.current !== null || (Hn = !0), (xe & 134217727) === 0 && (Fe & 134217727) === 0 || xt === null || ne(
        xt,
        mt,
        El,
        !1
      );
    }
    function zc(t, l, e) {
      var n = Rt;
      Rt |= 2;
      var a = Mh(), f = Th();
      (xt !== t || mt !== l) && (Wa = null, qn(t, l)), l = !1;
      var s = Ut;
      t: do
        try {
          if (Mt !== 0 && ht !== null) {
            var y = ht, _ = ol;
            switch (Mt) {
              case 8:
                Mc(), s = 6;
                break t;
              case 3:
              case 2:
              case 6:
                pl.current === null && (l = !0);
                var A = Mt;
                if (Mt = 0, ol = null, Yn(t, y, _, A), e && Hn) {
                  s = 0;
                  break t;
                }
                break;
              default:
                A = Mt, Mt = 0, ol = null, Yn(t, y, _, A);
            }
          }
          hv(), s = Ut;
          break;
        } catch (R) {
          xh(t, R);
        }
      while (!0);
      return l && t.shellSuspendCounter++, kl = $e = null, Rt = n, C.H = a, C.A = f, ht === null && (xt = null, mt = 0, Aa()), s;
    }
    function hv() {
      for (; ht !== null; ) zh(ht);
    }
    function dv(t, l) {
      var e = Rt;
      Rt |= 2;
      var n = Mh(), a = Th();
      xt !== t || mt !== l ? (Wa = null, ka = Hl() + 500, qn(t, l)) : Hn = Fn(
        t,
        l
      );
      t: do
        try {
          if (Mt !== 0 && ht !== null) {
            l = ht;
            var f = ol;
            l: switch (Mt) {
              case 1:
                Mt = 0, ol = null, Yn(t, l, f, 1);
                break;
              case 2:
                if (Ys(f)) {
                  Mt = 0, ol = null, Oh(l);
                  break;
                }
                l = function() {
                  Mt === 2 && xt === t && (Mt = 7), Cl(t);
                }, f.then(l, l);
                break t;
              case 3:
                Mt = 7;
                break t;
              case 4:
                Mt = 5;
                break t;
              case 7:
                Ys(f) ? (Mt = 0, ol = null, Oh(l)) : (Mt = 0, ol = null, Yn(t, l, f, 7));
                break;
              case 5:
                var s = null;
                switch (ht.tag) {
                  case 26:
                    s = ht.memoizedState;
                  case 5:
                  case 27:
                    var y = ht;
                    if (!s || n0(s)) {
                      Mt = 0, ol = null;
                      var _ = y.sibling;
                      if (_ !== null) ht = _;
                      else {
                        var A = y.return;
                        A !== null ? (ht = A, Ia(A)) : ht = null;
                      }
                      break l;
                    }
                }
                Mt = 0, ol = null, Yn(t, l, f, 5);
                break;
              case 6:
                Mt = 0, ol = null, Yn(t, l, f, 6);
                break;
              case 8:
                Mc(), Ut = 6;
                break t;
              default:
                throw Error(c(462));
            }
          }
          yv();
          break;
        } catch (R) {
          xh(t, R);
        }
      while (!0);
      return kl = $e = null, C.H = n, C.A = a, Rt = e, ht !== null ? 0 : (xt = null, mt = 0, Aa(), Ut);
    }
    function yv() {
      for (; ht !== null && !Yd(); )
        zh(ht);
    }
    function zh(t) {
      var l = ko(t.alternate, t, ee);
      t.memoizedProps = t.pendingProps, l === null ? Ia(t) : ht = l;
    }
    function Oh(t) {
      var l = t, e = l.alternate;
      switch (l.tag) {
        case 15:
        case 0:
          l = jo(
            e,
            l,
            l.pendingProps,
            l.type,
            void 0,
            mt
          );
          break;
        case 11:
          l = jo(
            e,
            l,
            l.pendingProps,
            l.type.render,
            l.ref,
            mt
          );
          break;
        case 5:
          Nf(l);
        default:
          Sh(e, l), l = ht = gh(l, ee), l = ko(e, l, ee);
      }
      t.memoizedProps = t.pendingProps, l === null ? Ia(t) : ht = l;
    }
    function Yn(t, l, e, n) {
      kl = $e = null, Nf(l), En = null, vu = 0;
      var a = l.return;
      try {
        if (ev(
          t,
          a,
          l,
          e,
          mt
        )) {
          Ut = 1, Za(
            t,
            ml(e, t.current)
          ), ht = null;
          return;
        }
      } catch (f) {
        if (a !== null) throw ht = a, f;
        Ut = 1, Za(
          t,
          ml(e, t.current)
        ), ht = null;
        return;
      }
      l.flags & 32768 ? (gt || n === 1 ? t = !0 : Hn || (mt & 536870912) !== 0 ? t = !1 : (le = t = !0, (n === 2 || n === 3 || n === 6) && (n = pl.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Dh(l, t)) : Ia(l);
    }
    function Ia(t) {
      var l = t;
      do {
        if ((l.flags & 32768) !== 0) {
          Dh(
            l,
            le
          );
          return;
        }
        t = l.return;
        var e = fv(
          l.alternate,
          l,
          ee
        );
        if (e !== null) {
          ht = e;
          return;
        }
        if (l = l.sibling, l !== null) {
          ht = l;
          return;
        }
        ht = l = t;
      } while (l !== null);
      Ut === 0 && (Ut = 5);
    }
    function Dh(t, l) {
      do {
        var e = cv(t.alternate, t);
        if (e !== null) {
          e.flags &= 32767, ht = e;
          return;
        }
        if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
          ht = t;
          return;
        }
        ht = t = e;
      } while (t !== null);
      Ut = 6, ht = null;
    }
    function Rh(t, l, e, n, a, f, s, y, _, A) {
      var R = C.T, H = X.p;
      try {
        X.p = 2, C.T = null, vv(
          t,
          l,
          e,
          n,
          H,
          a,
          f,
          s,
          y,
          _,
          A
        );
      } finally {
        C.T = R, X.p = H;
      }
    }
    function vv(t, l, e, n, a, f, s, y) {
      do
        Bn();
      while (Pe !== null);
      if ((Rt & 6) !== 0) throw Error(c(327));
      var _ = t.finishedWork;
      if (n = t.finishedLanes, _ === null) return null;
      if (t.finishedWork = null, t.finishedLanes = 0, _ === t.current) throw Error(c(177));
      t.callbackNode = null, t.callbackPriority = 0, t.cancelPendingCommit = null;
      var A = _.lanes | _.childLanes;
      if (A |= mf, $d(
        t,
        n,
        A,
        f,
        s,
        y
      ), t === xt && (ht = xt = null, mt = 0), (_.subtreeFlags & 10256) === 0 && (_.flags & 10256) === 0 || Fa || (Fa = !0, bc = A, Ac = e, pv(fa, function() {
        return Bn(), null;
      })), e = (_.flags & 15990) !== 0, (_.subtreeFlags & 15990) !== 0 || e ? (e = C.T, C.T = null, f = X.p, X.p = 2, s = Rt, Rt |= 4, uv(t, _), sh(_, t), Xy(Xc, t.containerInfo), oi = !!Cc, Xc = Cc = null, t.current = _, ih(t, _.alternate, _), Bd(), Rt = s, X.p = f, C.T = e) : t.current = _, Fa ? (Fa = !1, Pe = t, Hu = n) : Nh(t, A), A = t.pendingLanes, A === 0 && (Me = null), Zd(_.stateNode), Cl(t), l !== null)
        for (a = t.onRecoverableError, _ = 0; _ < l.length; _++)
          A = l[_], a(A.value, {
            componentStack: A.stack
          });
      return (Hu & 3) !== 0 && Bn(), A = t.pendingLanes, (n & 4194218) !== 0 && (A & 42) !== 0 ? t === Ec ? wu++ : (wu = 0, Ec = t) : wu = 0, qu(0), null;
    }
    function Nh(t, l) {
      (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, gu(l)));
    }
    function Bn() {
      if (Pe !== null) {
        var t = Pe, l = bc;
        bc = 0;
        var e = Xr(Hu), n = C.T, a = X.p;
        try {
          if (X.p = 32 > e ? 32 : e, C.T = null, Pe === null)
            var f = !1;
          else {
            e = Ac, Ac = null;
            var s = Pe, y = Hu;
            if (Pe = null, Hu = 0, (Rt & 6) !== 0)
              throw Error(c(331));
            var _ = Rt;
            if (Rt |= 4, vh(s.current), hh(s, s.current, y, e), Rt = _, qu(0, !1), il && typeof il.onPostCommitFiberRoot == "function")
              try {
                il.onPostCommitFiberRoot(Wn, s);
              } catch {
              }
            f = !0;
          }
          return f;
        } finally {
          X.p = a, C.T = n, Nh(t, l);
        }
      }
      return !1;
    }
    function Uh(t, l, e) {
      l = ml(e, l), l = Lf(t.stateNode, l, 2), t = pe(t, l, 2), t !== null && (Pn(t, 2), Cl(t));
    }
    function Et(t, l, e) {
      if (t.tag === 3)
        Uh(t, t, e);
      else
        for (; l !== null; ) {
          if (l.tag === 3) {
            Uh(
              l,
              t,
              e
            );
            break;
          } else if (l.tag === 1) {
            var n = l.stateNode;
            if (typeof l.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Me === null || !Me.has(n))) {
              t = ml(e, t), e = qo(2), n = pe(l, e, 2), n !== null && (Yo(
                e,
                n,
                l,
                t
              ), Pn(n, 2), Cl(n));
              break;
            }
          }
          l = l.return;
        }
    }
    function Oc(t, l, e) {
      var n = t.pingCache;
      if (n === null) {
        n = t.pingCache = new sv();
        var a = /* @__PURE__ */ new Set();
        n.set(l, a);
      } else
        a = n.get(l), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(l, a));
      a.has(e) || (gc = !0, a.add(e), t = mv.bind(null, t, l, e), l.then(t, t));
    }
    function mv(t, l, e) {
      var n = t.pingCache;
      n !== null && n.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, xt === t && (mt & e) === e && (Ut === 4 || Ut === 3 && (mt & 62914560) === mt && 300 > Hl() - Sc ? (Rt & 2) === 0 && qn(t, 0) : _c |= e, wn === mt && (wn = 0)), Cl(t);
    }
    function Hh(t, l) {
      l === 0 && (l = Yr()), t = oe(t, l), t !== null && (Pn(t, l), Cl(t));
    }
    function gv(t) {
      var l = t.memoizedState, e = 0;
      l !== null && (e = l.retryLane), Hh(t, e);
    }
    function _v(t, l) {
      var e = 0;
      switch (t.tag) {
        case 13:
          var n = t.stateNode, a = t.memoizedState;
          a !== null && (e = a.retryLane);
          break;
        case 19:
          n = t.stateNode;
          break;
        case 22:
          n = t.stateNode._retryCache;
          break;
        default:
          throw Error(c(314));
      }
      n !== null && n.delete(l), Hh(t, e);
    }
    function pv(t, l) {
      return Li(t, l);
    }
    var ti = null, Cn = null, Dc = !1, li = !1, Rc = !1, Ie = 0;
    function Cl(t) {
      t !== Cn && t.next === null && (Cn === null ? ti = Cn = t : Cn = Cn.next = t), li = !0, Dc || (Dc = !0, bv(Sv));
    }
    function qu(t, l) {
      if (!Rc && li) {
        Rc = !0;
        do
          for (var e = !1, n = ti; n !== null; ) {
            if (t !== 0) {
              var a = n.pendingLanes;
              if (a === 0) var f = 0;
              else {
                var s = n.suspendedLanes, y = n.pingedLanes;
                f = (1 << 31 - fl(42 | t) + 1) - 1, f &= a & ~(s & ~y), f = f & 201326677 ? f & 201326677 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (e = !0, Yh(n, f));
            } else
              f = mt, f = sa(
                n,
                n === xt ? f : 0
              ), (f & 3) === 0 || Fn(n, f) || (e = !0, Yh(n, f));
            n = n.next;
          }
        while (e);
        Rc = !1;
      }
    }
    function Sv() {
      li = Dc = !1;
      var t = 0;
      Ie !== 0 && (Dv() && (t = Ie), Ie = 0);
      for (var l = Hl(), e = null, n = ti; n !== null; ) {
        var a = n.next, f = wh(n, l);
        f === 0 ? (n.next = null, e === null ? ti = a : e.next = a, a === null && (Cn = e)) : (e = n, (t !== 0 || (f & 3) !== 0) && (li = !0)), n = a;
      }
      qu(t);
    }
    function wh(t, l) {
      for (var e = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, f = t.pendingLanes & -62914561; 0 < f; ) {
        var s = 31 - fl(f), y = 1 << s, _ = a[s];
        _ === -1 ? ((y & e) === 0 || (y & n) !== 0) && (a[s] = Kd(y, l)) : _ <= l && (t.expiredLanes |= y), f &= ~y;
      }
      if (l = xt, e = mt, e = sa(
        t,
        t === l ? e : 0
      ), n = t.callbackNode, e === 0 || t === l && Mt === 2 || t.cancelPendingCommit !== null)
        return n !== null && n !== null && Ki(n), t.callbackNode = null, t.callbackPriority = 0;
      if ((e & 3) === 0 || Fn(t, e)) {
        if (l = e & -e, l === t.callbackPriority) return l;
        switch (n !== null && Ki(n), Xr(e)) {
          case 2:
          case 8:
            e = Hr;
            break;
          case 32:
            e = fa;
            break;
          case 268435456:
            e = wr;
            break;
          default:
            e = fa;
        }
        return n = qh.bind(null, t), e = Li(e, n), t.callbackPriority = l, t.callbackNode = e, l;
      }
      return n !== null && n !== null && Ki(n), t.callbackPriority = 2, t.callbackNode = null, 2;
    }
    function qh(t, l) {
      var e = t.callbackNode;
      if (Bn() && t.callbackNode !== e)
        return null;
      var n = mt;
      return n = sa(
        t,
        t === xt ? n : 0
      ), n === 0 ? null : (Ah(t, n, l), wh(t, Hl()), t.callbackNode != null && t.callbackNode === e ? qh.bind(null, t) : null);
    }
    function Yh(t, l) {
      if (Bn()) return null;
      Ah(t, l, !0);
    }
    function bv(t) {
      Nv(function() {
        (Rt & 6) !== 0 ? Li(Ur, t) : t();
      });
    }
    function Nc() {
      return Ie === 0 && (Ie = qr()), Ie;
    }
    function Bh(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : va("" + t);
    }
    function Ch(t, l) {
      var e = l.ownerDocument.createElement("input");
      return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
    }
    function Av(t, l, e, n, a) {
      if (l === "submit" && e && e.stateNode === a) {
        var f = Bh(
          (a[tl] || null).action
        ), s = n.submitter;
        s && (l = (l = s[tl] || null) ? Bh(l.formAction) : s.getAttribute("formAction"), l !== null && (f = l, s = null));
        var y = new pa(
          "action",
          "action",
          null,
          n,
          a
        );
        t.push({
          event: y,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (n.defaultPrevented) {
                  if (Ie !== 0) {
                    var _ = s ? Ch(a, s) : new FormData(a);
                    Gf(
                      e,
                      {
                        pending: !0,
                        data: _,
                        method: a.method,
                        action: f
                      },
                      null,
                      _
                    );
                  }
                } else
                  typeof f == "function" && (y.preventDefault(), _ = s ? Ch(a, s) : new FormData(a), Gf(
                    e,
                    {
                      pending: !0,
                      data: _,
                      method: a.method,
                      action: f
                    },
                    f,
                    _
                  ));
              },
              currentTarget: a
            }
          ]
        });
      }
    }
    for (var Uc = 0; Uc < Ds.length; Uc++) {
      var Hc = Ds[Uc], Ev = Hc.toLowerCase(), xv = Hc[0].toUpperCase() + Hc.slice(1);
      Ml(
        Ev,
        "on" + xv
      );
    }
    Ml(xs, "onAnimationEnd"), Ml(Ms, "onAnimationIteration"), Ml(Ts, "onAnimationStart"), Ml("dblclick", "onDoubleClick"), Ml("focusin", "onFocus"), Ml("focusout", "onBlur"), Ml(Qy, "onTransitionRun"), Ml(Zy, "onTransitionStart"), Ml(jy, "onTransitionCancel"), Ml(zs, "onTransitionEnd"), on("onMouseEnter", ["mouseout", "mouseover"]), on("onMouseLeave", ["mouseout", "mouseover"]), on("onPointerEnter", ["pointerout", "pointerover"]), on("onPointerLeave", ["pointerout", "pointerover"]), we(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(" ")
    ), we(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), we("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), we(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), we(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), we(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var Yu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), Mv = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yu)
    );
    function Xh(t, l) {
      l = (l & 4) !== 0;
      for (var e = 0; e < t.length; e++) {
        var n = t[e], a = n.event;
        n = n.listeners;
        t: {
          var f = void 0;
          if (l)
            for (var s = n.length - 1; 0 <= s; s--) {
              var y = n[s], _ = y.instance, A = y.currentTarget;
              if (y = y.listener, _ !== f && a.isPropagationStopped())
                break t;
              f = y, a.currentTarget = A;
              try {
                f(a);
              } catch (R) {
                Qa(R);
              }
              a.currentTarget = null, f = _;
            }
          else
            for (s = 0; s < n.length; s++) {
              if (y = n[s], _ = y.instance, A = y.currentTarget, y = y.listener, _ !== f && a.isPropagationStopped())
                break t;
              f = y, a.currentTarget = A;
              try {
                f(a);
              } catch (R) {
                Qa(R);
              }
              a.currentTarget = null, f = _;
            }
        }
      }
    }
    function yt(t, l) {
      var e = l[Ji];
      e === void 0 && (e = l[Ji] = /* @__PURE__ */ new Set());
      var n = t + "__bubble";
      e.has(n) || (Gh(l, t, 2, !1), e.add(n));
    }
    function wc(t, l, e) {
      var n = 0;
      l && (n |= 4), Gh(
        e,
        t,
        n,
        l
      );
    }
    var ei = "_reactListening" + Math.random().toString(36).slice(2);
    function qc(t) {
      if (!t[ei]) {
        t[ei] = !0, Zr.forEach(function(e) {
          e !== "selectionchange" && (Mv.has(e) || wc(e, !1, t), wc(e, !0, t));
        });
        var l = t.nodeType === 9 ? t : t.ownerDocument;
        l === null || l[ei] || (l[ei] = !0, wc("selectionchange", !1, l));
      }
    }
    function Gh(t, l, e, n) {
      switch (r0(l)) {
        case 2:
          var a = Fv;
          break;
        case 8:
          a = Pv;
          break;
        default:
          a = Jc;
      }
      e = a.bind(
        null,
        l,
        e,
        t
      ), a = void 0, !ef || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(l, e, {
        capture: !0,
        passive: a
      }) : t.addEventListener(l, e, !0) : a !== void 0 ? t.addEventListener(l, e, {
        passive: a
      }) : t.addEventListener(l, e, !1);
    }
    function Yc(t, l, e, n, a) {
      var f = n;
      if ((l & 1) === 0 && (l & 2) === 0 && n !== null)
        t: for (; ; ) {
          if (n === null) return;
          var s = n.tag;
          if (s === 3 || s === 4) {
            var y = n.stateNode.containerInfo;
            if (y === a || y.nodeType === 8 && y.parentNode === a)
              break;
            if (s === 4)
              for (s = n.return; s !== null; ) {
                var _ = s.tag;
                if ((_ === 3 || _ === 4) && (_ = s.stateNode.containerInfo, _ === a || _.nodeType === 8 && _.parentNode === a))
                  return;
                s = s.return;
              }
            for (; y !== null; ) {
              if (s = He(y), s === null) return;
              if (_ = s.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
                n = f = s;
                continue t;
              }
              y = y.parentNode;
            }
          }
          n = n.return;
        }
      ts(function() {
        var A = f, R = tf(e), H = [];
        t: {
          var z = Os.get(t);
          if (z !== void 0) {
            var D = pa, L = t;
            switch (t) {
              case "keypress":
                if (ga(e) === 0) break t;
              case "keydown":
              case "keyup":
                D = _y;
                break;
              case "focusin":
                L = "focus", D = ff;
                break;
              case "focusout":
                L = "blur", D = ff;
                break;
              case "beforeblur":
              case "afterblur":
                D = ff;
                break;
              case "click":
                if (e.button === 2) break t;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                D = ns;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                D = iy;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                D = by;
                break;
              case xs:
              case Ms:
              case Ts:
                D = ry;
                break;
              case zs:
                D = Ey;
                break;
              case "scroll":
              case "scrollend":
                D = uy;
                break;
              case "wheel":
                D = My;
                break;
              case "copy":
              case "cut":
              case "paste":
                D = oy;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                D = as;
                break;
              case "toggle":
              case "beforetoggle":
                D = zy;
            }
            var it = (l & 4) !== 0, Ht = !it && (t === "scroll" || t === "scrollend"), E = it ? z !== null ? z + "Capture" : null : z;
            it = [];
            for (var b = A, T; b !== null; ) {
              var U = b;
              if (T = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || T === null || E === null || (U = lu(b, E), U != null && it.push(
                Bu(b, U, T)
              )), Ht) break;
              b = b.return;
            }
            0 < it.length && (z = new D(
              z,
              L,
              null,
              e,
              R
            ), H.push({ event: z, listeners: it }));
          }
        }
        if ((l & 7) === 0) {
          t: {
            if (z = t === "mouseover" || t === "pointerover", D = t === "mouseout" || t === "pointerout", z && e !== Ii && (L = e.relatedTarget || e.fromElement) && (He(L) || L[cn]))
              break t;
            if ((D || z) && (z = R.window === R ? R : (z = R.ownerDocument) ? z.defaultView || z.parentWindow : window, D ? (L = e.relatedTarget || e.toElement, D = A, L = L ? He(L) : null, L !== null && (Ht = B(L), it = L.tag, L !== Ht || it !== 5 && it !== 27 && it !== 6) && (L = null)) : (D = null, L = A), D !== L)) {
              if (it = ns, U = "onMouseLeave", E = "onMouseEnter", b = "mouse", (t === "pointerout" || t === "pointerover") && (it = as, U = "onPointerLeave", E = "onPointerEnter", b = "pointer"), Ht = D == null ? z : tu(D), T = L == null ? z : tu(L), z = new it(
                U,
                b + "leave",
                D,
                e,
                R
              ), z.target = Ht, z.relatedTarget = T, U = null, He(R) === A && (it = new it(
                E,
                b + "enter",
                L,
                e,
                R
              ), it.target = T, it.relatedTarget = Ht, U = it), Ht = U, D && L)
                l: {
                  for (it = D, E = L, b = 0, T = it; T; T = Xn(T))
                    b++;
                  for (T = 0, U = E; U; U = Xn(U))
                    T++;
                  for (; 0 < b - T; )
                    it = Xn(it), b--;
                  for (; 0 < T - b; )
                    E = Xn(E), T--;
                  for (; b--; ) {
                    if (it === E || E !== null && it === E.alternate)
                      break l;
                    it = Xn(it), E = Xn(E);
                  }
                  it = null;
                }
              else it = null;
              D !== null && Qh(
                H,
                z,
                D,
                it,
                !1
              ), L !== null && Ht !== null && Qh(
                H,
                Ht,
                L,
                it,
                !0
              );
            }
          }
          t: {
            if (z = A ? tu(A) : window, D = z.nodeName && z.nodeName.toLowerCase(), D === "select" || D === "input" && z.type === "file")
              var j = ds;
            else if (os(z))
              if (ys)
                j = By;
              else {
                j = qy;
                var ot = wy;
              }
            else
              D = z.nodeName, !D || D.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? A && Pi(A.elementType) && (j = ds) : j = Yy;
            if (j && (j = j(t, A))) {
              hs(
                H,
                j,
                e,
                R
              );
              break t;
            }
            ot && ot(t, z, A), t === "focusout" && A && z.type === "number" && A.memoizedProps.value != null && Fi(z, "number", z.value);
          }
          switch (ot = A ? tu(A) : window, t) {
            case "focusin":
              (os(ot) || ot.contentEditable === "true") && (gn = ot, df = A, ru = null);
              break;
            case "focusout":
              ru = df = gn = null;
              break;
            case "mousedown":
              yf = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              yf = !1, As(H, e, R);
              break;
            case "selectionchange":
              if (Gy) break;
            case "keydown":
            case "keyup":
              As(H, e, R);
          }
          var J;
          if (rf)
            t: {
              switch (t) {
                case "compositionstart":
                  var P = "onCompositionStart";
                  break t;
                case "compositionend":
                  P = "onCompositionEnd";
                  break t;
                case "compositionupdate":
                  P = "onCompositionUpdate";
                  break t;
              }
              P = void 0;
            }
          else
            mn ? rs(t, e) && (P = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (P = "onCompositionStart");
          P && (is && e.locale !== "ko" && (mn || P !== "onCompositionStart" ? P === "onCompositionEnd" && mn && (J = ls()) : (se = R, nf = "value" in se ? se.value : se.textContent, mn = !0)), ot = ni(A, P), 0 < ot.length && (P = new us(
            P,
            t,
            null,
            e,
            R
          ), H.push({ event: P, listeners: ot }), J ? P.data = J : (J = ss(e), J !== null && (P.data = J)))), (J = Dy ? Ry(t, e) : Ny(t, e)) && (P = ni(A, "onBeforeInput"), 0 < P.length && (ot = new us(
            "onBeforeInput",
            "beforeinput",
            null,
            e,
            R
          ), H.push({
            event: ot,
            listeners: P
          }), ot.data = J)), Av(
            H,
            t,
            A,
            e,
            R
          );
        }
        Xh(H, l);
      });
    }
    function Bu(t, l, e) {
      return {
        instance: t,
        listener: l,
        currentTarget: e
      };
    }
    function ni(t, l) {
      for (var e = l + "Capture", n = []; t !== null; ) {
        var a = t, f = a.stateNode;
        a = a.tag, a !== 5 && a !== 26 && a !== 27 || f === null || (a = lu(t, e), a != null && n.unshift(
          Bu(t, a, f)
        ), a = lu(t, l), a != null && n.push(
          Bu(t, a, f)
        )), t = t.return;
      }
      return n;
    }
    function Xn(t) {
      if (t === null) return null;
      do
        t = t.return;
      while (t && t.tag !== 5 && t.tag !== 27);
      return t || null;
    }
    function Qh(t, l, e, n, a) {
      for (var f = l._reactName, s = []; e !== null && e !== n; ) {
        var y = e, _ = y.alternate, A = y.stateNode;
        if (y = y.tag, _ !== null && _ === n) break;
        y !== 5 && y !== 26 && y !== 27 || A === null || (_ = A, a ? (A = lu(e, f), A != null && s.unshift(
          Bu(e, A, _)
        )) : a || (A = lu(e, f), A != null && s.push(
          Bu(e, A, _)
        ))), e = e.return;
      }
      s.length !== 0 && t.push({ event: l, listeners: s });
    }
    var Tv = /\r\n?/g, zv = /\u0000|\uFFFD/g;
    function Zh(t) {
      return (typeof t == "string" ? t : "" + t).replace(Tv, `
`).replace(zv, "");
    }
    function jh(t, l) {
      return l = Zh(l), Zh(t) === l;
    }
    function ui() {
    }
    function St(t, l, e, n, a, f) {
      switch (e) {
        case "children":
          typeof n == "string" ? l === "body" || l === "textarea" && n === "" || dn(t, n) : (typeof n == "number" || typeof n == "bigint") && l !== "body" && dn(t, "" + n);
          break;
        case "className":
          ha(t, "class", n);
          break;
        case "tabIndex":
          ha(t, "tabindex", n);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          ha(t, e, n);
          break;
        case "style":
          Pr(t, n, f);
          break;
        case "data":
          if (l !== "object") {
            ha(t, "data", n);
            break;
          }
        case "src":
        case "href":
          if (n === "" && (l !== "a" || e !== "href")) {
            t.removeAttribute(e);
            break;
          }
          if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
            t.removeAttribute(e);
            break;
          }
          n = va("" + n), t.setAttribute(e, n);
          break;
        case "action":
        case "formAction":
          if (typeof n == "function") {
            t.setAttribute(
              e,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof f == "function" && (e === "formAction" ? (l !== "input" && St(t, l, "name", a.name, a, null), St(
              t,
              l,
              "formEncType",
              a.formEncType,
              a,
              null
            ), St(
              t,
              l,
              "formMethod",
              a.formMethod,
              a,
              null
            ), St(
              t,
              l,
              "formTarget",
              a.formTarget,
              a,
              null
            )) : (St(t, l, "encType", a.encType, a, null), St(t, l, "method", a.method, a, null), St(t, l, "target", a.target, a, null)));
          if (n == null || typeof n == "symbol" || typeof n == "boolean") {
            t.removeAttribute(e);
            break;
          }
          n = va("" + n), t.setAttribute(e, n);
          break;
        case "onClick":
          n != null && (t.onclick = ui);
          break;
        case "onScroll":
          n != null && yt("scroll", t);
          break;
        case "onScrollEnd":
          n != null && yt("scrollend", t);
          break;
        case "dangerouslySetInnerHTML":
          if (n != null) {
            if (typeof n != "object" || !("__html" in n))
              throw Error(c(61));
            if (e = n.__html, e != null) {
              if (a.children != null) throw Error(c(60));
              t.innerHTML = e;
            }
          }
          break;
        case "multiple":
          t.multiple = n && typeof n != "function" && typeof n != "symbol";
          break;
        case "muted":
          t.muted = n && typeof n != "function" && typeof n != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
            t.removeAttribute("xlink:href");
            break;
          }
          e = va("" + n), t.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            e
          );
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, "" + n) : t.removeAttribute(e);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
          break;
        case "capture":
        case "download":
          n === !0 ? t.setAttribute(e, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, n) : t.removeAttribute(e);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(e, n) : t.removeAttribute(e);
          break;
        case "rowSpan":
        case "start":
          n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(e) : t.setAttribute(e, n);
          break;
        case "popover":
          yt("beforetoggle", t), yt("toggle", t), oa(t, "popover", n);
          break;
        case "xlinkActuate":
          jl(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:actuate",
            n
          );
          break;
        case "xlinkArcrole":
          jl(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:arcrole",
            n
          );
          break;
        case "xlinkRole":
          jl(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:role",
            n
          );
          break;
        case "xlinkShow":
          jl(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:show",
            n
          );
          break;
        case "xlinkTitle":
          jl(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:title",
            n
          );
          break;
        case "xlinkType":
          jl(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:type",
            n
          );
          break;
        case "xmlBase":
          jl(
            t,
            "http://www.w3.org/XML/1998/namespace",
            "xml:base",
            n
          );
          break;
        case "xmlLang":
          jl(
            t,
            "http://www.w3.org/XML/1998/namespace",
            "xml:lang",
            n
          );
          break;
        case "xmlSpace":
          jl(
            t,
            "http://www.w3.org/XML/1998/namespace",
            "xml:space",
            n
          );
          break;
        case "is":
          oa(t, "is", n);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = ey.get(e) || e, oa(t, e, n));
      }
    }
    function Bc(t, l, e, n, a, f) {
      switch (e) {
        case "style":
          Pr(t, n, f);
          break;
        case "dangerouslySetInnerHTML":
          if (n != null) {
            if (typeof n != "object" || !("__html" in n))
              throw Error(c(61));
            if (e = n.__html, e != null) {
              if (a.children != null) throw Error(c(60));
              t.innerHTML = e;
            }
          }
          break;
        case "children":
          typeof n == "string" ? dn(t, n) : (typeof n == "number" || typeof n == "bigint") && dn(t, "" + n);
          break;
        case "onScroll":
          n != null && yt("scroll", t);
          break;
        case "onScrollEnd":
          n != null && yt("scrollend", t);
          break;
        case "onClick":
          n != null && (t.onclick = ui);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!jr.hasOwnProperty(e))
            t: {
              if (e[0] === "o" && e[1] === "n" && (a = e.endsWith("Capture"), l = e.slice(2, a ? e.length - 7 : void 0), f = t[tl] || null, f = f != null ? f[e] : null, typeof f == "function" && t.removeEventListener(l, f, a), typeof n == "function")) {
                typeof f != "function" && f !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, n, a);
                break t;
              }
              e in t ? t[e] = n : n === !0 ? t.setAttribute(e, "") : oa(t, e, n);
            }
      }
    }
    function $t(t, l, e) {
      switch (l) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          yt("error", t), yt("load", t);
          var n = !1, a = !1, f;
          for (f in e)
            if (e.hasOwnProperty(f)) {
              var s = e[f];
              if (s != null)
                switch (f) {
                  case "src":
                    n = !0;
                    break;
                  case "srcSet":
                    a = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(c(137, l));
                  default:
                    St(t, l, f, s, e, null);
                }
            }
          a && St(t, l, "srcSet", e.srcSet, e, null), n && St(t, l, "src", e.src, e, null);
          return;
        case "input":
          yt("invalid", t);
          var y = f = s = a = null, _ = null, A = null;
          for (n in e)
            if (e.hasOwnProperty(n)) {
              var R = e[n];
              if (R != null)
                switch (n) {
                  case "name":
                    a = R;
                    break;
                  case "type":
                    s = R;
                    break;
                  case "checked":
                    _ = R;
                    break;
                  case "defaultChecked":
                    A = R;
                    break;
                  case "value":
                    f = R;
                    break;
                  case "defaultValue":
                    y = R;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (R != null)
                      throw Error(c(137, l));
                    break;
                  default:
                    St(t, l, n, R, e, null);
                }
            }
          Jr(
            t,
            f,
            y,
            _,
            A,
            s,
            a,
            !1
          ), da(t);
          return;
        case "select":
          yt("invalid", t), n = s = f = null;
          for (a in e)
            if (e.hasOwnProperty(a) && (y = e[a], y != null))
              switch (a) {
                case "value":
                  f = y;
                  break;
                case "defaultValue":
                  s = y;
                  break;
                case "multiple":
                  n = y;
                default:
                  St(t, l, a, y, e, null);
              }
          l = f, e = s, t.multiple = !!n, l != null ? hn(t, !!n, l, !1) : e != null && hn(t, !!n, e, !0);
          return;
        case "textarea":
          yt("invalid", t), f = a = n = null;
          for (s in e)
            if (e.hasOwnProperty(s) && (y = e[s], y != null))
              switch (s) {
                case "value":
                  n = y;
                  break;
                case "defaultValue":
                  a = y;
                  break;
                case "children":
                  f = y;
                  break;
                case "dangerouslySetInnerHTML":
                  if (y != null) throw Error(c(91));
                  break;
                default:
                  St(t, l, s, y, e, null);
              }
          Wr(t, n, a, f), da(t);
          return;
        case "option":
          for (_ in e)
            if (e.hasOwnProperty(_) && (n = e[_], n != null))
              switch (_) {
                case "selected":
                  t.selected = n && typeof n != "function" && typeof n != "symbol";
                  break;
                default:
                  St(t, l, _, n, e, null);
              }
          return;
        case "dialog":
          yt("cancel", t), yt("close", t);
          break;
        case "iframe":
        case "object":
          yt("load", t);
          break;
        case "video":
        case "audio":
          for (n = 0; n < Yu.length; n++)
            yt(Yu[n], t);
          break;
        case "image":
          yt("error", t), yt("load", t);
          break;
        case "details":
          yt("toggle", t);
          break;
        case "embed":
        case "source":
        case "link":
          yt("error", t), yt("load", t);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (A in e)
            if (e.hasOwnProperty(A) && (n = e[A], n != null))
              switch (A) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, l));
                default:
                  St(t, l, A, n, e, null);
              }
          return;
        default:
          if (Pi(l)) {
            for (R in e)
              e.hasOwnProperty(R) && (n = e[R], n !== void 0 && Bc(
                t,
                l,
                R,
                n,
                e,
                void 0
              ));
            return;
          }
      }
      for (y in e)
        e.hasOwnProperty(y) && (n = e[y], n != null && St(t, l, y, n, e, null));
    }
    function Ov(t, l, e, n) {
      switch (l) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var a = null, f = null, s = null, y = null, _ = null, A = null, R = null;
          for (D in e) {
            var H = e[D];
            if (e.hasOwnProperty(D) && H != null)
              switch (D) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  _ = H;
                default:
                  n.hasOwnProperty(D) || St(t, l, D, null, n, H);
              }
          }
          for (var z in n) {
            var D = n[z];
            if (H = e[z], n.hasOwnProperty(z) && (D != null || H != null))
              switch (z) {
                case "type":
                  f = D;
                  break;
                case "name":
                  a = D;
                  break;
                case "checked":
                  A = D;
                  break;
                case "defaultChecked":
                  R = D;
                  break;
                case "value":
                  s = D;
                  break;
                case "defaultValue":
                  y = D;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (D != null)
                    throw Error(c(137, l));
                  break;
                default:
                  D !== H && St(
                    t,
                    l,
                    z,
                    D,
                    n,
                    H
                  );
              }
          }
          Wi(
            t,
            s,
            y,
            _,
            A,
            R,
            f,
            a
          );
          return;
        case "select":
          D = s = y = z = null;
          for (f in e)
            if (_ = e[f], e.hasOwnProperty(f) && _ != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  D = _;
                default:
                  n.hasOwnProperty(f) || St(
                    t,
                    l,
                    f,
                    null,
                    n,
                    _
                  );
              }
          for (a in n)
            if (f = n[a], _ = e[a], n.hasOwnProperty(a) && (f != null || _ != null))
              switch (a) {
                case "value":
                  z = f;
                  break;
                case "defaultValue":
                  y = f;
                  break;
                case "multiple":
                  s = f;
                default:
                  f !== _ && St(
                    t,
                    l,
                    a,
                    f,
                    n,
                    _
                  );
              }
          l = y, e = s, n = D, z != null ? hn(t, !!e, z, !1) : !!n != !!e && (l != null ? hn(t, !!e, l, !0) : hn(t, !!e, e ? [] : "", !1));
          return;
        case "textarea":
          D = z = null;
          for (y in e)
            if (a = e[y], e.hasOwnProperty(y) && a != null && !n.hasOwnProperty(y))
              switch (y) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  St(t, l, y, null, n, a);
              }
          for (s in n)
            if (a = n[s], f = e[s], n.hasOwnProperty(s) && (a != null || f != null))
              switch (s) {
                case "value":
                  z = a;
                  break;
                case "defaultValue":
                  D = a;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (a != null) throw Error(c(91));
                  break;
                default:
                  a !== f && St(t, l, s, a, n, f);
              }
          kr(t, z, D);
          return;
        case "option":
          for (var L in e)
            if (z = e[L], e.hasOwnProperty(L) && z != null && !n.hasOwnProperty(L))
              switch (L) {
                case "selected":
                  t.selected = !1;
                  break;
                default:
                  St(
                    t,
                    l,
                    L,
                    null,
                    n,
                    z
                  );
              }
          for (_ in n)
            if (z = n[_], D = e[_], n.hasOwnProperty(_) && z !== D && (z != null || D != null))
              switch (_) {
                case "selected":
                  t.selected = z && typeof z != "function" && typeof z != "symbol";
                  break;
                default:
                  St(
                    t,
                    l,
                    _,
                    z,
                    n,
                    D
                  );
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var it in e)
            z = e[it], e.hasOwnProperty(it) && z != null && !n.hasOwnProperty(it) && St(t, l, it, null, n, z);
          for (A in n)
            if (z = n[A], D = e[A], n.hasOwnProperty(A) && z !== D && (z != null || D != null))
              switch (A) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(c(137, l));
                  break;
                default:
                  St(
                    t,
                    l,
                    A,
                    z,
                    n,
                    D
                  );
              }
          return;
        default:
          if (Pi(l)) {
            for (var Ht in e)
              z = e[Ht], e.hasOwnProperty(Ht) && z !== void 0 && !n.hasOwnProperty(Ht) && Bc(
                t,
                l,
                Ht,
                void 0,
                n,
                z
              );
            for (R in n)
              z = n[R], D = e[R], !n.hasOwnProperty(R) || z === D || z === void 0 && D === void 0 || Bc(
                t,
                l,
                R,
                z,
                n,
                D
              );
            return;
          }
      }
      for (var E in e)
        z = e[E], e.hasOwnProperty(E) && z != null && !n.hasOwnProperty(E) && St(t, l, E, null, n, z);
      for (H in n)
        z = n[H], D = e[H], !n.hasOwnProperty(H) || z === D || z == null && D == null || St(t, l, H, z, n, D);
    }
    var Cc = null, Xc = null;
    function ai(t) {
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    function Vh(t) {
      switch (t) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function Lh(t, l) {
      if (t === 0)
        switch (l) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return t === 1 && l === "foreignObject" ? 0 : t;
    }
    function Gc(t, l) {
      return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
    }
    var Qc = null;
    function Dv() {
      var t = window.event;
      return t && t.type === "popstate" ? t === Qc ? !1 : (Qc = t, !0) : (Qc = null, !1);
    }
    var Kh = typeof setTimeout == "function" ? setTimeout : void 0, Rv = typeof clearTimeout == "function" ? clearTimeout : void 0, $h = typeof Promise == "function" ? Promise : void 0, Nv = typeof queueMicrotask == "function" ? queueMicrotask : typeof $h < "u" ? function(t) {
      return $h.resolve(null).then(t).catch(Uv);
    } : Kh;
    function Uv(t) {
      setTimeout(function() {
        throw t;
      });
    }
    function Zc(t, l) {
      var e = l, n = 0;
      do {
        var a = e.nextSibling;
        if (t.removeChild(e), a && a.nodeType === 8)
          if (e = a.data, e === "/$") {
            if (n === 0) {
              t.removeChild(a), Lu(l);
              return;
            }
            n--;
          } else e !== "$" && e !== "$?" && e !== "$!" || n++;
        e = a;
      } while (e);
      Lu(l);
    }
    function jc(t) {
      var l = t.firstChild;
      for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
        var e = l;
        switch (l = l.nextSibling, e.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            jc(e), ki(e);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (e.rel.toLowerCase() === "stylesheet") continue;
        }
        t.removeChild(e);
      }
    }
    function Hv(t, l, e, n) {
      for (; t.nodeType === 1; ) {
        var a = e;
        if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
          if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
            break;
        } else if (n) {
          if (!t[In])
            switch (l) {
              case "meta":
                if (!t.hasAttribute("itemprop")) break;
                return t;
              case "link":
                if (f = t.getAttribute("rel"), f === "stylesheet" && t.hasAttribute("data-precedence"))
                  break;
                if (f !== a.rel || t.getAttribute("href") !== (a.href == null ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                  break;
                return t;
              case "style":
                if (t.hasAttribute("data-precedence")) break;
                return t;
              case "script":
                if (f = t.getAttribute("src"), (f !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && f && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                  break;
                return t;
              default:
                return t;
            }
        } else if (l === "input" && t.type === "hidden") {
          var f = a.name == null ? null : "" + a.name;
          if (a.type === "hidden" && t.getAttribute("name") === f)
            return t;
        } else return t;
        if (t = Ol(t.nextSibling), t === null) break;
      }
      return null;
    }
    function wv(t, l, e) {
      if (l === "") return null;
      for (; t.nodeType !== 3; )
        if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ol(t.nextSibling), t === null)) return null;
      return t;
    }
    function Ol(t) {
      for (; t != null; t = t.nextSibling) {
        var l = t.nodeType;
        if (l === 1 || l === 3) break;
        if (l === 8) {
          if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "F!" || l === "F")
            break;
          if (l === "/$") return null;
        }
      }
      return t;
    }
    function Jh(t) {
      t = t.previousSibling;
      for (var l = 0; t; ) {
        if (t.nodeType === 8) {
          var e = t.data;
          if (e === "$" || e === "$!" || e === "$?") {
            if (l === 0) return t;
            l--;
          } else e === "/$" && l++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function kh(t, l, e) {
      switch (l = ai(e), t) {
        case "html":
          if (t = l.documentElement, !t) throw Error(c(452));
          return t;
        case "head":
          if (t = l.head, !t) throw Error(c(453));
          return t;
        case "body":
          if (t = l.body, !t) throw Error(c(454));
          return t;
        default:
          throw Error(c(451));
      }
    }
    var xl = /* @__PURE__ */ new Map(), Wh = /* @__PURE__ */ new Set();
    function ii(t) {
      return typeof t.getRootNode == "function" ? t.getRootNode() : t.ownerDocument;
    }
    var ue = X.d;
    X.d = {
      f: qv,
      r: Yv,
      D: Bv,
      C: Cv,
      L: Xv,
      m: Gv,
      X: Zv,
      S: Qv,
      M: jv
    };
    function qv() {
      var t = ue.f(), l = Pa();
      return t || l;
    }
    function Yv(t) {
      var l = rn(t);
      l !== null && l.tag === 5 && l.type === "form" ? Eo(l) : ue.r(t);
    }
    var Gn = typeof document > "u" ? null : document;
    function Fh(t, l, e) {
      var n = Gn;
      if (n && typeof l == "string" && l) {
        var a = yl(l);
        a = 'link[rel="' + t + '"][href="' + a + '"]', typeof e == "string" && (a += '[crossorigin="' + e + '"]'), Wh.has(a) || (Wh.add(a), t = { rel: t, crossOrigin: e, href: l }, n.querySelector(a) === null && (l = n.createElement("link"), $t(l, "link", t), Qt(l), n.head.appendChild(l)));
      }
    }
    function Bv(t) {
      ue.D(t), Fh("dns-prefetch", t, null);
    }
    function Cv(t, l) {
      ue.C(t, l), Fh("preconnect", t, l);
    }
    function Xv(t, l, e) {
      ue.L(t, l, e);
      var n = Gn;
      if (n && t && l) {
        var a = 'link[rel="preload"][as="' + yl(l) + '"]';
        l === "image" && e && e.imageSrcSet ? (a += '[imagesrcset="' + yl(
          e.imageSrcSet
        ) + '"]', typeof e.imageSizes == "string" && (a += '[imagesizes="' + yl(
          e.imageSizes
        ) + '"]')) : a += '[href="' + yl(t) + '"]';
        var f = a;
        switch (l) {
          case "style":
            f = Qn(t);
            break;
          case "script":
            f = Zn(t);
        }
        xl.has(f) || (t = $(
          {
            rel: "preload",
            href: l === "image" && e && e.imageSrcSet ? void 0 : t,
            as: l
          },
          e
        ), xl.set(f, t), n.querySelector(a) !== null || l === "style" && n.querySelector(Cu(f)) || l === "script" && n.querySelector(Xu(f)) || (l = n.createElement("link"), $t(l, "link", t), Qt(l), n.head.appendChild(l)));
      }
    }
    function Gv(t, l) {
      ue.m(t, l);
      var e = Gn;
      if (e && t) {
        var n = l && typeof l.as == "string" ? l.as : "script", a = 'link[rel="modulepreload"][as="' + yl(n) + '"][href="' + yl(t) + '"]', f = a;
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            f = Zn(t);
        }
        if (!xl.has(f) && (t = $({ rel: "modulepreload", href: t }, l), xl.set(f, t), e.querySelector(a) === null)) {
          switch (n) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (e.querySelector(Xu(f)))
                return;
          }
          n = e.createElement("link"), $t(n, "link", t), Qt(n), e.head.appendChild(n);
        }
      }
    }
    function Qv(t, l, e) {
      ue.S(t, l, e);
      var n = Gn;
      if (n && t) {
        var a = sn(n).hoistableStyles, f = Qn(t);
        l = l || "default";
        var s = a.get(f);
        if (!s) {
          var y = { loading: 0, preload: null };
          if (s = n.querySelector(
            Cu(f)
          ))
            y.loading = 5;
          else {
            t = $(
              { rel: "stylesheet", href: t, "data-precedence": l },
              e
            ), (e = xl.get(f)) && Vc(t, e);
            var _ = s = n.createElement("link");
            Qt(_), $t(_, "link", t), _._p = new Promise(function(A, R) {
              _.onload = A, _.onerror = R;
            }), _.addEventListener("load", function() {
              y.loading |= 1;
            }), _.addEventListener("error", function() {
              y.loading |= 2;
            }), y.loading |= 4, fi(s, l, n);
          }
          s = {
            type: "stylesheet",
            instance: s,
            count: 1,
            state: y
          }, a.set(f, s);
        }
      }
    }
    function Zv(t, l) {
      ue.X(t, l);
      var e = Gn;
      if (e && t) {
        var n = sn(e).hoistableScripts, a = Zn(t), f = n.get(a);
        f || (f = e.querySelector(Xu(a)), f || (t = $({ src: t, async: !0 }, l), (l = xl.get(a)) && Lc(t, l), f = e.createElement("script"), Qt(f), $t(f, "link", t), e.head.appendChild(f)), f = {
          type: "script",
          instance: f,
          count: 1,
          state: null
        }, n.set(a, f));
      }
    }
    function jv(t, l) {
      ue.M(t, l);
      var e = Gn;
      if (e && t) {
        var n = sn(e).hoistableScripts, a = Zn(t), f = n.get(a);
        f || (f = e.querySelector(Xu(a)), f || (t = $({ src: t, async: !0, type: "module" }, l), (l = xl.get(a)) && Lc(t, l), f = e.createElement("script"), Qt(f), $t(f, "link", t), e.head.appendChild(f)), f = {
          type: "script",
          instance: f,
          count: 1,
          state: null
        }, n.set(a, f));
      }
    }
    function Ph(t, l, e, n) {
      var a = (a = fe.current) ? ii(a) : null;
      if (!a) throw Error(c(446));
      switch (t) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Qn(e.href), e = sn(
            a
          ).hoistableStyles, n = e.get(l), n || (n = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, e.set(l, n)), n) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
            t = Qn(e.href);
            var f = sn(
              a
            ).hoistableStyles, s = f.get(t);
            if (s || (a = a.ownerDocument || a, s = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null }
            }, f.set(t, s), (f = a.querySelector(
              Cu(t)
            )) && !f._p && (s.instance = f, s.state.loading = 5), xl.has(t) || (e = {
              rel: "preload",
              as: "style",
              href: e.href,
              crossOrigin: e.crossOrigin,
              integrity: e.integrity,
              media: e.media,
              hrefLang: e.hrefLang,
              referrerPolicy: e.referrerPolicy
            }, xl.set(t, e), f || Vv(
              a,
              t,
              e,
              s.state
            ))), l && n === null)
              throw Error(c(528, ""));
            return s;
          }
          if (l && n !== null)
            throw Error(c(529, ""));
          return null;
        case "script":
          return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = Zn(e), e = sn(
            a
          ).hoistableScripts, n = e.get(l), n || (n = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, e.set(l, n)), n) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(c(444, t));
      }
    }
    function Qn(t) {
      return 'href="' + yl(t) + '"';
    }
    function Cu(t) {
      return 'link[rel="stylesheet"][' + t + "]";
    }
    function Ih(t) {
      return $({}, t, {
        "data-precedence": t.precedence,
        precedence: null
      });
    }
    function Vv(t, l, e, n) {
      t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? n.loading = 1 : (l = t.createElement("link"), n.preload = l, l.addEventListener("load", function() {
        return n.loading |= 1;
      }), l.addEventListener("error", function() {
        return n.loading |= 2;
      }), $t(l, "link", e), Qt(l), t.head.appendChild(l));
    }
    function Zn(t) {
      return '[src="' + yl(t) + '"]';
    }
    function Xu(t) {
      return "script[async]" + t;
    }
    function t0(t, l, e) {
      if (l.count++, l.instance === null)
        switch (l.type) {
          case "style":
            var n = t.querySelector(
              'style[data-href~="' + yl(e.href) + '"]'
            );
            if (n)
              return l.instance = n, Qt(n), n;
            var a = $({}, e, {
              "data-href": e.href,
              "data-precedence": e.precedence,
              href: null,
              precedence: null
            });
            return n = (t.ownerDocument || t).createElement(
              "style"
            ), Qt(n), $t(n, "style", a), fi(n, e.precedence, t), l.instance = n;
          case "stylesheet":
            a = Qn(e.href);
            var f = t.querySelector(
              Cu(a)
            );
            if (f)
              return l.state.loading |= 4, l.instance = f, Qt(f), f;
            n = Ih(e), (a = xl.get(a)) && Vc(n, a), f = (t.ownerDocument || t).createElement("link"), Qt(f);
            var s = f;
            return s._p = new Promise(function(y, _) {
              s.onload = y, s.onerror = _;
            }), $t(f, "link", n), l.state.loading |= 4, fi(f, e.precedence, t), l.instance = f;
          case "script":
            return f = Zn(e.src), (a = t.querySelector(
              Xu(f)
            )) ? (l.instance = a, Qt(a), a) : (n = e, (a = xl.get(f)) && (n = $({}, e), Lc(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), Qt(a), $t(a, "link", n), t.head.appendChild(a), l.instance = a);
          case "void":
            return null;
          default:
            throw Error(c(443, l.type));
        }
      else
        l.type === "stylesheet" && (l.state.loading & 4) === 0 && (n = l.instance, l.state.loading |= 4, fi(n, e.precedence, t));
      return l.instance;
    }
    function fi(t, l, e) {
      for (var n = e.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), a = n.length ? n[n.length - 1] : null, f = a, s = 0; s < n.length; s++) {
        var y = n[s];
        if (y.dataset.precedence === l) f = y;
        else if (f !== a) break;
      }
      f ? f.parentNode.insertBefore(t, f.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
    }
    function Vc(t, l) {
      t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
    }
    function Lc(t, l) {
      t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
    }
    var ci = null;
    function l0(t, l, e) {
      if (ci === null) {
        var n = /* @__PURE__ */ new Map(), a = ci = /* @__PURE__ */ new Map();
        a.set(e, n);
      } else
        a = ci, n = a.get(e), n || (n = /* @__PURE__ */ new Map(), a.set(e, n));
      if (n.has(t)) return n;
      for (n.set(t, null), e = e.getElementsByTagName(t), a = 0; a < e.length; a++) {
        var f = e[a];
        if (!(f[In] || f[Jt] || t === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
          var s = f.getAttribute(l) || "";
          s = t + s;
          var y = n.get(s);
          y ? y.push(f) : n.set(s, [f]);
        }
      }
      return n;
    }
    function e0(t, l, e) {
      t = t.ownerDocument || t, t.head.insertBefore(
        e,
        l === "title" ? t.querySelector("head > title") : null
      );
    }
    function Lv(t, l, e) {
      if (e === 1 || l.itemProp != null) return !1;
      switch (t) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
            break;
          return !0;
        case "link":
          if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
            break;
          switch (l.rel) {
            case "stylesheet":
              return t = l.disabled, typeof l.precedence == "string" && t == null;
            default:
              return !0;
          }
        case "script":
          if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
            return !0;
      }
      return !1;
    }
    function n0(t) {
      return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
    }
    var Gu = null;
    function Kv() {
    }
    function $v(t, l, e) {
      if (Gu === null) throw Error(c(475));
      var n = Gu;
      if (l.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (l.state.loading & 4) === 0) {
        if (l.instance === null) {
          var a = Qn(e.href), f = t.querySelector(
            Cu(a)
          );
          if (f) {
            t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (n.count++, n = ri.bind(n), t.then(n, n)), l.state.loading |= 4, l.instance = f, Qt(f);
            return;
          }
          f = t.ownerDocument || t, e = Ih(e), (a = xl.get(a)) && Vc(e, a), f = f.createElement("link"), Qt(f);
          var s = f;
          s._p = new Promise(function(y, _) {
            s.onload = y, s.onerror = _;
          }), $t(f, "link", e), l.instance = f;
        }
        n.stylesheets === null && (n.stylesheets = /* @__PURE__ */ new Map()), n.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (n.count++, l = ri.bind(n), t.addEventListener("load", l), t.addEventListener("error", l));
      }
    }
    function Jv() {
      if (Gu === null) throw Error(c(475));
      var t = Gu;
      return t.stylesheets && t.count === 0 && Kc(t, t.stylesheets), 0 < t.count ? function(l) {
        var e = setTimeout(function() {
          if (t.stylesheets && Kc(t, t.stylesheets), t.unsuspend) {
            var n = t.unsuspend;
            t.unsuspend = null, n();
          }
        }, 6e4);
        return t.unsuspend = l, function() {
          t.unsuspend = null, clearTimeout(e);
        };
      } : null;
    }
    function ri() {
      if (this.count--, this.count === 0) {
        if (this.stylesheets) Kc(this, this.stylesheets);
        else if (this.unsuspend) {
          var t = this.unsuspend;
          this.unsuspend = null, t();
        }
      }
    }
    var si = null;
    function Kc(t, l) {
      t.stylesheets = null, t.unsuspend !== null && (t.count++, si = /* @__PURE__ */ new Map(), l.forEach(kv, t), si = null, ri.call(t));
    }
    function kv(t, l) {
      if (!(l.state.loading & 4)) {
        var e = si.get(t);
        if (e) var n = e.get(null);
        else {
          e = /* @__PURE__ */ new Map(), si.set(t, e);
          for (var a = t.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < a.length; f++) {
            var s = a[f];
            (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (e.set(s.dataset.precedence, s), n = s);
          }
          n && e.set(null, n);
        }
        a = l.instance, s = a.getAttribute("data-precedence"), f = e.get(s) || n, f === n && e.set(null, a), e.set(s, a), this.count++, n = ri.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), f ? f.parentNode.insertBefore(a, f.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), l.state.loading |= 4;
      }
    }
    var Qu = {
      $$typeof: N,
      Provider: null,
      Consumer: null,
      _currentValue: at,
      _currentValue2: at,
      _threadCount: 0
    };
    function Wv(t, l, e, n, a, f, s, y) {
      this.tag = 1, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $i(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $i(0), this.hiddenUpdates = $i(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = f, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function u0(t, l, e, n, a, f, s, y, _, A, R, H) {
      return t = new Wv(
        t,
        l,
        e,
        s,
        y,
        _,
        A,
        H
      ), l = 1, f === !0 && (l |= 24), f = Al(3, null, null, l), t.current = f, f.stateNode = t, l = xf(), l.refCount++, t.pooledCache = l, l.refCount++, f.memoizedState = {
        element: n,
        isDehydrated: e,
        cache: l
      }, uc(f), t;
    }
    function a0(t) {
      return t ? (t = Sn, t) : Sn;
    }
    function i0(t, l, e, n, a, f) {
      a = a0(a), n.context === null ? n.context = a : n.pendingContext = a, n = _e(l), n.payload = { element: e }, f = f === void 0 ? null : f, f !== null && (n.callback = f), e = pe(t, n, l), e !== null && (It(e, t, l), xu(e, t, l));
    }
    function f0(t, l) {
      if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
        var e = t.retryLane;
        t.retryLane = e !== 0 && e < l ? e : l;
      }
    }
    function $c(t, l) {
      f0(t, l), (t = t.alternate) && f0(t, l);
    }
    function c0(t) {
      if (t.tag === 13) {
        var l = oe(t, 67108864);
        l !== null && It(l, t, 67108864), $c(t, 67108864);
      }
    }
    var oi = !0;
    function Fv(t, l, e, n) {
      var a = C.T;
      C.T = null;
      var f = X.p;
      try {
        X.p = 2, Jc(t, l, e, n);
      } finally {
        X.p = f, C.T = a;
      }
    }
    function Pv(t, l, e, n) {
      var a = C.T;
      C.T = null;
      var f = X.p;
      try {
        X.p = 8, Jc(t, l, e, n);
      } finally {
        X.p = f, C.T = a;
      }
    }
    function Jc(t, l, e, n) {
      if (oi) {
        var a = kc(n);
        if (a === null)
          Yc(
            t,
            l,
            n,
            hi,
            e
          ), s0(t, n);
        else if (t1(
          a,
          t,
          l,
          e,
          n
        ))
          n.stopPropagation();
        else if (s0(t, n), l & 4 && -1 < Iv.indexOf(t)) {
          for (; a !== null; ) {
            var f = rn(a);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var s = Ue(f.pendingLanes);
                    if (s !== 0) {
                      var y = f;
                      for (y.pendingLanes |= 2, y.entangledLanes |= 2; s; ) {
                        var _ = 1 << 31 - fl(s);
                        y.entanglements[1] |= _, s &= ~_;
                      }
                      Cl(f), (Rt & 6) === 0 && (ka = Hl() + 500, qu(0));
                    }
                  }
                  break;
                case 13:
                  y = oe(f, 2), y !== null && It(y, f, 2), Pa(), $c(f, 2);
              }
            if (f = kc(n), f === null && Yc(
              t,
              l,
              n,
              hi,
              e
            ), f === a) break;
            a = f;
          }
          a !== null && n.stopPropagation();
        } else
          Yc(
            t,
            l,
            n,
            null,
            e
          );
      }
    }
    function kc(t) {
      return t = tf(t), Wc(t);
    }
    var hi = null;
    function Wc(t) {
      if (hi = null, t = He(t), t !== null) {
        var l = B(t);
        if (l === null) t = null;
        else {
          var e = l.tag;
          if (e === 13) {
            if (t = ut(l), t !== null) return t;
            t = null;
          } else if (e === 3) {
            if (l.stateNode.current.memoizedState.isDehydrated)
              return l.tag === 3 ? l.stateNode.containerInfo : null;
            t = null;
          } else l !== t && (t = null);
        }
      }
      return hi = t, null;
    }
    function r0(t) {
      switch (t) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (Cd()) {
            case Ur:
              return 2;
            case Hr:
              return 8;
            case fa:
            case Xd:
              return 32;
            case wr:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Fc = !1, Te = null, ze = null, Oe = null, Zu = /* @__PURE__ */ new Map(), ju = /* @__PURE__ */ new Map(), De = [], Iv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    );
    function s0(t, l) {
      switch (t) {
        case "focusin":
        case "focusout":
          Te = null;
          break;
        case "dragenter":
        case "dragleave":
          ze = null;
          break;
        case "mouseover":
        case "mouseout":
          Oe = null;
          break;
        case "pointerover":
        case "pointerout":
          Zu.delete(l.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          ju.delete(l.pointerId);
      }
    }
    function Vu(t, l, e, n, a, f) {
      return t === null || t.nativeEvent !== f ? (t = {
        blockedOn: l,
        domEventName: e,
        eventSystemFlags: n,
        nativeEvent: f,
        targetContainers: [a]
      }, l !== null && (l = rn(l), l !== null && c0(l)), t) : (t.eventSystemFlags |= n, l = t.targetContainers, a !== null && l.indexOf(a) === -1 && l.push(a), t);
    }
    function t1(t, l, e, n, a) {
      switch (l) {
        case "focusin":
          return Te = Vu(
            Te,
            t,
            l,
            e,
            n,
            a
          ), !0;
        case "dragenter":
          return ze = Vu(
            ze,
            t,
            l,
            e,
            n,
            a
          ), !0;
        case "mouseover":
          return Oe = Vu(
            Oe,
            t,
            l,
            e,
            n,
            a
          ), !0;
        case "pointerover":
          var f = a.pointerId;
          return Zu.set(
            f,
            Vu(
              Zu.get(f) || null,
              t,
              l,
              e,
              n,
              a
            )
          ), !0;
        case "gotpointercapture":
          return f = a.pointerId, ju.set(
            f,
            Vu(
              ju.get(f) || null,
              t,
              l,
              e,
              n,
              a
            )
          ), !0;
      }
      return !1;
    }
    function o0(t) {
      var l = He(t.target);
      if (l !== null) {
        var e = B(l);
        if (e !== null) {
          if (l = e.tag, l === 13) {
            if (l = ut(e), l !== null) {
              t.blockedOn = l, Jd(t.priority, function() {
                if (e.tag === 13) {
                  var n = hl(), a = oe(e, n);
                  a !== null && It(a, e, n), $c(e, n);
                }
              });
              return;
            }
          } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
            t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
            return;
          }
        }
      }
      t.blockedOn = null;
    }
    function di(t) {
      if (t.blockedOn !== null) return !1;
      for (var l = t.targetContainers; 0 < l.length; ) {
        var e = kc(t.nativeEvent);
        if (e === null) {
          e = t.nativeEvent;
          var n = new e.constructor(
            e.type,
            e
          );
          Ii = n, e.target.dispatchEvent(n), Ii = null;
        } else
          return l = rn(e), l !== null && c0(l), t.blockedOn = e, !1;
        l.shift();
      }
      return !0;
    }
    function h0(t, l, e) {
      di(t) && e.delete(l);
    }
    function l1() {
      Fc = !1, Te !== null && di(Te) && (Te = null), ze !== null && di(ze) && (ze = null), Oe !== null && di(Oe) && (Oe = null), Zu.forEach(h0), ju.forEach(h0);
    }
    function yi(t, l) {
      t.blockedOn === l && (t.blockedOn = null, Fc || (Fc = !0, u.unstable_scheduleCallback(
        u.unstable_NormalPriority,
        l1
      )));
    }
    var vi = null;
    function d0(t) {
      vi !== t && (vi = t, u.unstable_scheduleCallback(
        u.unstable_NormalPriority,
        function() {
          vi === t && (vi = null);
          for (var l = 0; l < t.length; l += 3) {
            var e = t[l], n = t[l + 1], a = t[l + 2];
            if (typeof n != "function") {
              if (Wc(n || e) === null)
                continue;
              break;
            }
            var f = rn(e);
            f !== null && (t.splice(l, 3), l -= 3, Gf(
              f,
              {
                pending: !0,
                data: a,
                method: e.method,
                action: n
              },
              n,
              a
            ));
          }
        }
      ));
    }
    function Lu(t) {
      function l(_) {
        return yi(_, t);
      }
      Te !== null && yi(Te, t), ze !== null && yi(ze, t), Oe !== null && yi(Oe, t), Zu.forEach(l), ju.forEach(l);
      for (var e = 0; e < De.length; e++) {
        var n = De[e];
        n.blockedOn === t && (n.blockedOn = null);
      }
      for (; 0 < De.length && (e = De[0], e.blockedOn === null); )
        o0(e), e.blockedOn === null && De.shift();
      if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
        for (n = 0; n < e.length; n += 3) {
          var a = e[n], f = e[n + 1], s = a[tl] || null;
          if (typeof f == "function")
            s || d0(e);
          else if (s) {
            var y = null;
            if (f && f.hasAttribute("formAction")) {
              if (a = f, s = f[tl] || null)
                y = s.formAction;
              else if (Wc(a) !== null) continue;
            } else y = s.action;
            typeof y == "function" ? e[n + 1] = y : (e.splice(n, 3), n -= 3), d0(e);
          }
        }
    }
    function Pc(t) {
      this._internalRoot = t;
    }
    mi.prototype.render = Pc.prototype.render = function(t) {
      var l = this._internalRoot;
      if (l === null) throw Error(c(409));
      var e = l.current, n = hl();
      i0(e, n, t, l, null, null);
    }, mi.prototype.unmount = Pc.prototype.unmount = function() {
      var t = this._internalRoot;
      if (t !== null) {
        this._internalRoot = null;
        var l = t.containerInfo;
        t.tag === 0 && Bn(), i0(t.current, 2, null, t, null, null), Pa(), l[cn] = null;
      }
    };
    function mi(t) {
      this._internalRoot = t;
    }
    mi.prototype.unstable_scheduleHydration = function(t) {
      if (t) {
        var l = Gr();
        t = { blockedOn: null, target: t, priority: l };
        for (var e = 0; e < De.length && l !== 0 && l < De[e].priority; e++) ;
        De.splice(e, 0, t), e === 0 && o0(t);
      }
    };
    var y0 = i.version;
    if (y0 !== "19.0.0")
      throw Error(
        c(
          527,
          y0,
          "19.0.0"
        )
      );
    X.findDOMNode = function(t) {
      var l = t._reactInternals;
      if (l === void 0)
        throw typeof t.render == "function" ? Error(c(188)) : (t = Object.keys(t).join(","), Error(c(268, t)));
      return t = w(l), t = t !== null ? W(t) : null, t = t === null ? null : t.stateNode, t;
    };
    var e1 = {
      bundleType: 0,
      version: "19.0.0",
      rendererPackageName: "react-dom",
      currentDispatcherRef: C,
      findFiberByHostInstance: He,
      reconcilerVersion: "19.0.0"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var gi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!gi.isDisabled && gi.supportsFiber)
        try {
          Wn = gi.inject(
            e1
          ), il = gi;
        } catch {
        }
    }
    return Ju.createRoot = function(t, l) {
      if (!o(t)) throw Error(c(299));
      var e = !1, n = "", a = No, f = Uo, s = Ho, y = null;
      return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (a = l.onUncaughtError), l.onCaughtError !== void 0 && (f = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError), l.unstable_transitionCallbacks !== void 0 && (y = l.unstable_transitionCallbacks)), l = u0(
        t,
        1,
        !1,
        null,
        null,
        e,
        n,
        a,
        f,
        s,
        y,
        null
      ), t[cn] = l.current, qc(
        t.nodeType === 8 ? t.parentNode : t
      ), new Pc(l);
    }, Ju.hydrateRoot = function(t, l, e) {
      if (!o(t)) throw Error(c(299));
      var n = !1, a = "", f = No, s = Uo, y = Ho, _ = null, A = null;
      return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (f = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (y = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (_ = e.unstable_transitionCallbacks), e.formState !== void 0 && (A = e.formState)), l = u0(
        t,
        1,
        !0,
        l,
        e ?? null,
        n,
        a,
        f,
        s,
        y,
        _,
        A
      ), l.context = a0(null), e = l.current, n = hl(), a = _e(n), a.callback = null, pe(e, a, n), l.current.lanes = n, Pn(l, n), Cl(l), t[cn] = l.current, qc(t), new mi(l);
    }, Ju.version = "19.0.0", Ju;
  }
  var W0;
  function X_() {
    if (W0) return ar.exports;
    W0 = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
        } catch (i) {
          console.error(i);
        }
    }
    return u(), ar.exports = C_(), ar.exports;
  }
  var qd = X_();
  const Q_ = (u, i) => {
    qd.createRoot(document.getElementById(u)).render(
      /* @__PURE__ */ zt.jsx(Ar.StrictMode, { children: /* @__PURE__ */ zt.jsx(H_, { data: i }) })
    );
  };

  var dataviz = (() => {
    function renderDataDemo() {
      const generateRandomData = (n, categoryCount) => Array.from({
        length: n
      }, (_, i) => ({
        skill: `skill-${i}`,
        category: `category-${Math.floor(Math.random() * categoryCount)}`,
        lvl: Math.floor(Math.random() * 10)
      }));
      Q_('dataviz_root', generateRandomData(40, 8));
    }
    return {
      demo: renderDataDemo
    };
  });

  return dataviz;

})();
//# sourceMappingURL=dataviz.js.map

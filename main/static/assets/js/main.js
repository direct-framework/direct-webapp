var main = (function () {
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
  function e1() {
    if (v0) return Ku;
    v0 = 1;
    var u = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
    function r(c, o, y) {
      var v = null;
      if (y !== void 0 && (v = "" + y), o.key !== void 0 && (v = "" + o.key), "key" in o) {
        y = {};
        for (var m in o)
          m !== "key" && (y[m] = o[m]);
      } else y = o;
      return o = y.ref, {
        $$typeof: u,
        type: c,
        key: v,
        ref: o !== void 0 ? o : null,
        props: y
      };
    }
    return Ku.Fragment = i, Ku.jsx = r, Ku.jsxs = r, Ku;
  }
  var m0;
  function n1() {
    return m0 || (m0 = 1, Ic.exports = e1()), Ic.exports;
  }
  var St = n1();
  var tr = { exports: {} }, ft = {};
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
  function a1() {
    if (g0) return ft;
    g0 = 1;
    var u = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), v = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), x = Symbol.iterator;
    function M(S) {
      return S === null || typeof S != "object" ? null : (S = x && S[x] || S["@@iterator"], typeof S == "function" ? S : null);
    }
    var R = {
      isMounted: function() {
        return !1;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, Z = Object.assign, K = {};
    function at(S, q, J) {
      this.props = S, this.context = q, this.refs = K, this.updater = J || R;
    }
    at.prototype.isReactComponent = {}, at.prototype.setState = function(S, q) {
      if (typeof S != "object" && typeof S != "function" && S != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, S, q, "setState");
    }, at.prototype.forceUpdate = function(S) {
      this.updater.enqueueForceUpdate(this, S, "forceUpdate");
    };
    function nt() {
    }
    nt.prototype = at.prototype;
    function F(S, q, J) {
      this.props = S, this.context = q, this.refs = K, this.updater = J || R;
    }
    var lt = F.prototype = new nt();
    lt.constructor = F, Z(lt, at.prototype), lt.isPureReactComponent = !0;
    var ct = Array.isArray, j = { H: null, A: null, T: null, S: null }, ot = Object.prototype.hasOwnProperty;
    function Ot(S, q, J, N, C, W) {
      return J = W.ref, {
        $$typeof: u,
        type: S,
        key: q,
        ref: J !== void 0 ? J : null,
        props: W
      };
    }
    function pt(S, q) {
      return Ot(
        S.type,
        q,
        void 0,
        void 0,
        void 0,
        S.props
      );
    }
    function Y(S) {
      return typeof S == "object" && S !== null && S.$$typeof === u;
    }
    function I(S) {
      var q = { "=": "=0", ":": "=2" };
      return "$" + S.replace(/[=:]/g, function(J) {
        return q[J];
      });
    }
    var L = /\/+/g;
    function yt(S, q) {
      return typeof S == "object" && S !== null && S.key != null ? I("" + S.key) : q.toString(36);
    }
    function G() {
    }
    function P(S) {
      switch (S.status) {
        case "fulfilled":
          return S.value;
        case "rejected":
          throw S.reason;
        default:
          switch (typeof S.status == "string" ? S.then(G, G) : (S.status = "pending", S.then(
            function(q) {
              S.status === "pending" && (S.status = "fulfilled", S.value = q);
            },
            function(q) {
              S.status === "pending" && (S.status = "rejected", S.reason = q);
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
    function B(S, q, J, N, C) {
      var W = typeof S;
      (W === "undefined" || W === "boolean") && (S = null);
      var et = !1;
      if (S === null) et = !0;
      else
        switch (W) {
          case "bigint":
          case "string":
          case "number":
            et = !0;
            break;
          case "object":
            switch (S.$$typeof) {
              case u:
              case i:
                et = !0;
                break;
              case p:
                return et = S._init, B(
                  et(S._payload),
                  q,
                  J,
                  N,
                  C
                );
            }
        }
      if (et)
        return C = C(S), et = N === "" ? "." + yt(S, 0) : N, ct(C) ? (J = "", et != null && (J = et.replace(L, "$&/") + "/"), B(C, q, J, "", function(zt) {
          return zt;
        })) : C != null && (Y(C) && (C = pt(
          C,
          J + (C.key == null || S && S.key === C.key ? "" : ("" + C.key).replace(
            L,
            "$&/"
          ) + "/") + et
        )), q.push(C)), 1;
      et = 0;
      var wt = N === "" ? "." : N + ":";
      if (ct(S))
        for (var vt = 0; vt < S.length; vt++)
          N = S[vt], W = wt + yt(N, vt), et += B(
            N,
            q,
            J,
            W,
            C
          );
      else if (vt = M(S), typeof vt == "function")
        for (S = vt.call(S), vt = 0; !(N = S.next()).done; )
          N = N.value, W = wt + yt(N, vt++), et += B(
            N,
            q,
            J,
            W,
            C
          );
      else if (W === "object") {
        if (typeof S.then == "function")
          return B(
            P(S),
            q,
            J,
            N,
            C
          );
        throw q = String(S), Error(
          "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return et;
    }
    function H(S, q, J) {
      if (S == null) return S;
      var N = [], C = 0;
      return B(S, N, "", "", function(W) {
        return q.call(J, W, C++);
      }), N;
    }
    function X(S) {
      if (S._status === -1) {
        var q = S._result;
        q = q(), q.then(
          function(J) {
            (S._status === 0 || S._status === -1) && (S._status = 1, S._result = J);
          },
          function(J) {
            (S._status === 0 || S._status === -1) && (S._status = 2, S._result = J);
          }
        ), S._status === -1 && (S._status = 0, S._result = q);
      }
      if (S._status === 1) return S._result.default;
      throw S._result;
    }
    var Q = typeof reportError == "function" ? reportError : function(S) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var q = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S),
          error: S
        });
        if (!window.dispatchEvent(q)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", S);
        return;
      }
      console.error(S);
    };
    function ut() {
    }
    return ft.Children = {
      map: H,
      forEach: function(S, q, J) {
        H(
          S,
          function() {
            q.apply(this, arguments);
          },
          J
        );
      },
      count: function(S) {
        var q = 0;
        return H(S, function() {
          q++;
        }), q;
      },
      toArray: function(S) {
        return H(S, function(q) {
          return q;
        }) || [];
      },
      only: function(S) {
        if (!Y(S))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return S;
      }
    }, ft.Component = at, ft.Fragment = r, ft.Profiler = o, ft.PureComponent = F, ft.StrictMode = c, ft.Suspense = g, ft.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j, ft.act = function() {
      throw Error("act(...) is not supported in production builds of React.");
    }, ft.cache = function(S) {
      return function() {
        return S.apply(null, arguments);
      };
    }, ft.cloneElement = function(S, q, J) {
      if (S == null)
        throw Error(
          "The argument must be a React element, but you passed " + S + "."
        );
      var N = Z({}, S.props), C = S.key, W = void 0;
      if (q != null)
        for (et in q.ref !== void 0 && (W = void 0), q.key !== void 0 && (C = "" + q.key), q)
          !ot.call(q, et) || et === "key" || et === "__self" || et === "__source" || et === "ref" && q.ref === void 0 || (N[et] = q[et]);
      var et = arguments.length - 2;
      if (et === 1) N.children = J;
      else if (1 < et) {
        for (var wt = Array(et), vt = 0; vt < et; vt++)
          wt[vt] = arguments[vt + 2];
        N.children = wt;
      }
      return Ot(S.type, C, void 0, void 0, W, N);
    }, ft.createContext = function(S) {
      return S = {
        $$typeof: v,
        _currentValue: S,
        _currentValue2: S,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, S.Provider = S, S.Consumer = {
        $$typeof: y,
        _context: S
      }, S;
    }, ft.createElement = function(S, q, J) {
      var N, C = {}, W = null;
      if (q != null)
        for (N in q.key !== void 0 && (W = "" + q.key), q)
          ot.call(q, N) && N !== "key" && N !== "__self" && N !== "__source" && (C[N] = q[N]);
      var et = arguments.length - 2;
      if (et === 1) C.children = J;
      else if (1 < et) {
        for (var wt = Array(et), vt = 0; vt < et; vt++)
          wt[vt] = arguments[vt + 2];
        C.children = wt;
      }
      if (S && S.defaultProps)
        for (N in et = S.defaultProps, et)
          C[N] === void 0 && (C[N] = et[N]);
      return Ot(S, W, void 0, void 0, null, C);
    }, ft.createRef = function() {
      return { current: null };
    }, ft.forwardRef = function(S) {
      return { $$typeof: m, render: S };
    }, ft.isValidElement = Y, ft.lazy = function(S) {
      return {
        $$typeof: p,
        _payload: { _status: -1, _result: S },
        _init: X
      };
    }, ft.memo = function(S, q) {
      return {
        $$typeof: h,
        type: S,
        compare: q === void 0 ? null : q
      };
    }, ft.startTransition = function(S) {
      var q = j.T, J = {};
      j.T = J;
      try {
        var N = S(), C = j.S;
        C !== null && C(J, N), typeof N == "object" && N !== null && typeof N.then == "function" && N.then(ut, Q);
      } catch (W) {
        Q(W);
      } finally {
        j.T = q;
      }
    }, ft.unstable_useCacheRefresh = function() {
      return j.H.useCacheRefresh();
    }, ft.use = function(S) {
      return j.H.use(S);
    }, ft.useActionState = function(S, q, J) {
      return j.H.useActionState(S, q, J);
    }, ft.useCallback = function(S, q) {
      return j.H.useCallback(S, q);
    }, ft.useContext = function(S) {
      return j.H.useContext(S);
    }, ft.useDebugValue = function() {
    }, ft.useDeferredValue = function(S, q) {
      return j.H.useDeferredValue(S, q);
    }, ft.useEffect = function(S, q) {
      return j.H.useEffect(S, q);
    }, ft.useId = function() {
      return j.H.useId();
    }, ft.useImperativeHandle = function(S, q, J) {
      return j.H.useImperativeHandle(S, q, J);
    }, ft.useInsertionEffect = function(S, q) {
      return j.H.useInsertionEffect(S, q);
    }, ft.useLayoutEffect = function(S, q) {
      return j.H.useLayoutEffect(S, q);
    }, ft.useMemo = function(S, q) {
      return j.H.useMemo(S, q);
    }, ft.useOptimistic = function(S, q) {
      return j.H.useOptimistic(S, q);
    }, ft.useReducer = function(S, q, J) {
      return j.H.useReducer(S, q, J);
    }, ft.useRef = function(S) {
      return j.H.useRef(S);
    }, ft.useState = function(S) {
      return j.H.useState(S);
    }, ft.useSyncExternalStore = function(S, q, J) {
      return j.H.useSyncExternalStore(
        S,
        q,
        J
      );
    }, ft.useTransition = function() {
      return j.H.useTransition();
    }, ft.version = "19.0.0", ft;
  }
  var _0;
  function Ar() {
    return _0 || (_0 = 1, tr.exports = a1()), tr.exports;
  }
  var Oi = Ar();
  function xi(u, i) {
    return u == null || i == null ? NaN : u < i ? -1 : u > i ? 1 : u >= i ? 0 : NaN;
  }
  function i1(u, i) {
    return u == null || i == null ? NaN : i < u ? -1 : i > u ? 1 : i >= u ? 0 : NaN;
  }
  function W0(u) {
    let i, r, c;
    u.length !== 2 ? (i = xi, r = (m, g) => xi(u(m), g), c = (m, g) => u(m) - g) : (i = u === xi || u === i1 ? u : f1, r = u, c = u);
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
    function y(m, g, h = 0, p = m.length) {
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
    return { left: o, center: v, right: y };
  }
  function f1() {
    return 0;
  }
  function c1(u) {
    return u === null ? NaN : +u;
  }
  const r1 = W0(xi), s1 = r1.right;
  W0(c1).center;
  class rr extends Map {
    constructor(i, r = I0) {
      if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), i != null) for (const [c, o] of i) this.set(c, o);
    }
    get(i) {
      return super.get(sr(this, i));
    }
    has(i) {
      return super.has(sr(this, i));
    }
    set(i, r) {
      return super.set(F0(this, i), r);
    }
    delete(i) {
      return super.delete(P0(this, i));
    }
  }
  class o1 extends Set {
    constructor(i, r = I0) {
      if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), i != null) for (const c of i) this.add(c);
    }
    has(i) {
      return super.has(sr(this, i));
    }
    add(i) {
      return super.add(F0(this, i));
    }
    delete(i) {
      return super.delete(P0(this, i));
    }
  }
  function sr({ _intern: u, _key: i }, r) {
    const c = i(r);
    return u.has(c) ? u.get(c) : r;
  }
  function F0({ _intern: u, _key: i }, r) {
    const c = i(r);
    return u.has(c) ? u.get(c) : (u.set(c, r), r);
  }
  function P0({ _intern: u, _key: i }, r) {
    const c = i(r);
    return u.has(c) && (r = u.get(c), u.delete(c)), r;
  }
  function I0(u) {
    return u !== null && typeof u == "object" ? u.valueOf() : u;
  }
  function p0(u) {
    return u;
  }
  function h1(u, ...i) {
    return d1(u, p0, p0, i);
  }
  function d1(u, i, r, c) {
    return function o(y, v) {
      if (v >= c.length) return r(y);
      const m = new rr(), g = c[v++];
      let h = -1;
      for (const p of y) {
        const x = g(p, ++h, y), M = m.get(x);
        M ? M.push(p) : m.set(x, [p]);
      }
      for (const [p, x] of m)
        m.set(p, o(x, v));
      return i(m);
    }(u, 0);
  }
  const y1 = Math.sqrt(50), v1 = Math.sqrt(10), m1 = Math.sqrt(2);
  function Di(u, i, r) {
    const c = (i - u) / Math.max(0, r), o = Math.floor(Math.log10(c)), y = c / Math.pow(10, o), v = y >= y1 ? 10 : y >= v1 ? 5 : y >= m1 ? 2 : 1;
    let m, g, h;
    return o < 0 ? (h = Math.pow(10, -o) / v, m = Math.round(u * h), g = Math.round(i * h), m / h < u && ++m, g / h > i && --g, h = -h) : (h = Math.pow(10, o) * v, m = Math.round(u / h), g = Math.round(i / h), m * h < u && ++m, g * h > i && --g), g < m && 0.5 <= r && r < 2 ? Di(u, i, r * 2) : [m, g, h];
  }
  function g1(u, i, r) {
    if (i = +i, u = +u, r = +r, !(r > 0)) return [];
    if (u === i) return [u];
    const c = i < u, [o, y, v] = c ? Di(i, u, r) : Di(u, i, r);
    if (!(y >= o)) return [];
    const m = y - o + 1, g = new Array(m);
    if (c)
      if (v < 0) for (let h = 0; h < m; ++h) g[h] = (y - h) / -v;
      else for (let h = 0; h < m; ++h) g[h] = (y - h) * v;
    else if (v < 0) for (let h = 0; h < m; ++h) g[h] = (o + h) / -v;
    else for (let h = 0; h < m; ++h) g[h] = (o + h) * v;
    return g;
  }
  function or(u, i, r) {
    return i = +i, u = +u, r = +r, Di(u, i, r)[2];
  }
  function _1(u, i, r) {
    i = +i, u = +u, r = +r;
    const c = i < u, o = c ? or(i, u, r) : or(u, i, r);
    return (c ? -1 : 1) * (o < 0 ? 1 / -o : o);
  }
  function p1(u, i) {
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
  function S1(...u) {
    const i = new o1();
    for (const r of u)
      for (const c of r)
        i.add(c);
    return i;
  }
  var b1 = { value: () => {
  } };
  function td() {
    for (var u = 0, i = arguments.length, r = {}, c; u < i; ++u) {
      if (!(c = arguments[u] + "") || c in r || /[\s.]/.test(c)) throw new Error("illegal type: " + c);
      r[c] = [];
    }
    return new Ti(r);
  }
  function Ti(u) {
    this._ = u;
  }
  function A1(u, i) {
    return u.trim().split(/^|\s+/).map(function(r) {
      var c = "", o = r.indexOf(".");
      if (o >= 0 && (c = r.slice(o + 1), r = r.slice(0, o)), r && !i.hasOwnProperty(r)) throw new Error("unknown type: " + r);
      return { type: r, name: c };
    });
  }
  Ti.prototype = td.prototype = {
    constructor: Ti,
    on: function(u, i) {
      var r = this._, c = A1(u + "", r), o, y = -1, v = c.length;
      if (arguments.length < 2) {
        for (; ++y < v; ) if ((o = (u = c[y]).type) && (o = E1(r[o], u.name))) return o;
        return;
      }
      if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
      for (; ++y < v; )
        if (o = (u = c[y]).type) r[o] = S0(r[o], u.name, i);
        else if (i == null) for (o in r) r[o] = S0(r[o], u.name, null);
      return this;
    },
    copy: function() {
      var u = {}, i = this._;
      for (var r in i) u[r] = i[r].slice();
      return new Ti(u);
    },
    call: function(u, i) {
      if ((o = arguments.length - 2) > 0) for (var r = new Array(o), c = 0, o, y; c < o; ++c) r[c] = arguments[c + 2];
      if (!this._.hasOwnProperty(u)) throw new Error("unknown type: " + u);
      for (y = this._[u], c = 0, o = y.length; c < o; ++c) y[c].value.apply(i, r);
    },
    apply: function(u, i, r) {
      if (!this._.hasOwnProperty(u)) throw new Error("unknown type: " + u);
      for (var c = this._[u], o = 0, y = c.length; o < y; ++o) c[o].value.apply(i, r);
    }
  };
  function E1(u, i) {
    for (var r = 0, c = u.length, o; r < c; ++r)
      if ((o = u[r]).name === i)
        return o.value;
  }
  function S0(u, i, r) {
    for (var c = 0, o = u.length; c < o; ++c)
      if (u[c].name === i) {
        u[c] = b1, u = u.slice(0, c).concat(u.slice(c + 1));
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
  function x1(u) {
    return function() {
      var i = this.ownerDocument, r = this.namespaceURI;
      return r === hr && i.documentElement.namespaceURI === hr ? i.createElement(u) : i.createElementNS(r, u);
    };
  }
  function T1(u) {
    return function() {
      return this.ownerDocument.createElementNS(u.space, u.local);
    };
  }
  function ld(u) {
    var i = Gi(u);
    return (i.local ? T1 : x1)(i);
  }
  function M1() {
  }
  function Er(u) {
    return u == null ? M1 : function() {
      return this.querySelector(u);
    };
  }
  function z1(u) {
    typeof u != "function" && (u = Er(u));
    for (var i = this._groups, r = i.length, c = new Array(r), o = 0; o < r; ++o)
      for (var y = i[o], v = y.length, m = c[o] = new Array(v), g, h, p = 0; p < v; ++p)
        (g = y[p]) && (h = u.call(g, g.__data__, p, y)) && ("__data__" in g && (h.__data__ = g.__data__), m[p] = h);
    return new Nl(c, this._parents);
  }
  function O1(u) {
    return u == null ? [] : Array.isArray(u) ? u : Array.from(u);
  }
  function D1() {
    return [];
  }
  function ed(u) {
    return u == null ? D1 : function() {
      return this.querySelectorAll(u);
    };
  }
  function R1(u) {
    return function() {
      return O1(u.apply(this, arguments));
    };
  }
  function N1(u) {
    typeof u == "function" ? u = R1(u) : u = ed(u);
    for (var i = this._groups, r = i.length, c = [], o = [], y = 0; y < r; ++y)
      for (var v = i[y], m = v.length, g, h = 0; h < m; ++h)
        (g = v[h]) && (c.push(u.call(g, g.__data__, h, v)), o.push(g));
    return new Nl(c, o);
  }
  function nd(u) {
    return function() {
      return this.matches(u);
    };
  }
  function ud(u) {
    return function(i) {
      return i.matches(u);
    };
  }
  var U1 = Array.prototype.find;
  function H1(u) {
    return function() {
      return U1.call(this.children, u);
    };
  }
  function w1() {
    return this.firstElementChild;
  }
  function q1(u) {
    return this.select(u == null ? w1 : H1(typeof u == "function" ? u : ud(u)));
  }
  var Y1 = Array.prototype.filter;
  function B1() {
    return Array.from(this.children);
  }
  function C1(u) {
    return function() {
      return Y1.call(this.children, u);
    };
  }
  function X1(u) {
    return this.selectAll(u == null ? B1 : C1(typeof u == "function" ? u : ud(u)));
  }
  function G1(u) {
    typeof u != "function" && (u = nd(u));
    for (var i = this._groups, r = i.length, c = new Array(r), o = 0; o < r; ++o)
      for (var y = i[o], v = y.length, m = c[o] = [], g, h = 0; h < v; ++h)
        (g = y[h]) && u.call(g, g.__data__, h, y) && m.push(g);
    return new Nl(c, this._parents);
  }
  function ad(u) {
    return new Array(u.length);
  }
  function Q1() {
    return new Nl(this._enter || this._groups.map(ad), this._parents);
  }
  function Ri(u, i) {
    this.ownerDocument = u.ownerDocument, this.namespaceURI = u.namespaceURI, this._next = null, this._parent = u, this.__data__ = i;
  }
  Ri.prototype = {
    constructor: Ri,
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
  function Z1(u) {
    return function() {
      return u;
    };
  }
  function j1(u, i, r, c, o, y) {
    for (var v = 0, m, g = i.length, h = y.length; v < h; ++v)
      (m = i[v]) ? (m.__data__ = y[v], c[v] = m) : r[v] = new Ri(u, y[v]);
    for (; v < g; ++v)
      (m = i[v]) && (o[v] = m);
  }
  function V1(u, i, r, c, o, y, v) {
    var m, g, h = /* @__PURE__ */ new Map(), p = i.length, x = y.length, M = new Array(p), R;
    for (m = 0; m < p; ++m)
      (g = i[m]) && (M[m] = R = v.call(g, g.__data__, m, i) + "", h.has(R) ? o[m] = g : h.set(R, g));
    for (m = 0; m < x; ++m)
      R = v.call(u, y[m], m, y) + "", (g = h.get(R)) ? (c[m] = g, g.__data__ = y[m], h.delete(R)) : r[m] = new Ri(u, y[m]);
    for (m = 0; m < p; ++m)
      (g = i[m]) && h.get(M[m]) === g && (o[m] = g);
  }
  function L1(u) {
    return u.__data__;
  }
  function K1(u, i) {
    if (!arguments.length) return Array.from(this, L1);
    var r = i ? V1 : j1, c = this._parents, o = this._groups;
    typeof u != "function" && (u = Z1(u));
    for (var y = o.length, v = new Array(y), m = new Array(y), g = new Array(y), h = 0; h < y; ++h) {
      var p = c[h], x = o[h], M = x.length, R = $1(u.call(p, p && p.__data__, h, c)), Z = R.length, K = m[h] = new Array(Z), at = v[h] = new Array(Z), nt = g[h] = new Array(M);
      r(p, x, K, at, nt, R, i);
      for (var F = 0, lt = 0, ct, j; F < Z; ++F)
        if (ct = K[F]) {
          for (F >= lt && (lt = F + 1); !(j = at[lt]) && ++lt < Z; ) ;
          ct._next = j || null;
        }
    }
    return v = new Nl(v, c), v._enter = m, v._exit = g, v;
  }
  function $1(u) {
    return typeof u == "object" && "length" in u ? u : Array.from(u);
  }
  function J1() {
    return new Nl(this._exit || this._groups.map(ad), this._parents);
  }
  function k1(u, i, r) {
    var c = this.enter(), o = this, y = this.exit();
    return typeof u == "function" ? (c = u(c), c && (c = c.selection())) : c = c.append(u + ""), i != null && (o = i(o), o && (o = o.selection())), r == null ? y.remove() : r(y), c && o ? c.merge(o).order() : o;
  }
  function W1(u) {
    for (var i = u.selection ? u.selection() : u, r = this._groups, c = i._groups, o = r.length, y = c.length, v = Math.min(o, y), m = new Array(o), g = 0; g < v; ++g)
      for (var h = r[g], p = c[g], x = h.length, M = m[g] = new Array(x), R, Z = 0; Z < x; ++Z)
        (R = h[Z] || p[Z]) && (M[Z] = R);
    for (; g < o; ++g)
      m[g] = r[g];
    return new Nl(m, this._parents);
  }
  function F1() {
    for (var u = this._groups, i = -1, r = u.length; ++i < r; )
      for (var c = u[i], o = c.length - 1, y = c[o], v; --o >= 0; )
        (v = c[o]) && (y && v.compareDocumentPosition(y) ^ 4 && y.parentNode.insertBefore(v, y), y = v);
    return this;
  }
  function P1(u) {
    u || (u = I1);
    function i(x, M) {
      return x && M ? u(x.__data__, M.__data__) : !x - !M;
    }
    for (var r = this._groups, c = r.length, o = new Array(c), y = 0; y < c; ++y) {
      for (var v = r[y], m = v.length, g = o[y] = new Array(m), h, p = 0; p < m; ++p)
        (h = v[p]) && (g[p] = h);
      g.sort(i);
    }
    return new Nl(o, this._parents).order();
  }
  function I1(u, i) {
    return u < i ? -1 : u > i ? 1 : u >= i ? 0 : NaN;
  }
  function tm() {
    var u = arguments[0];
    return arguments[0] = this, u.apply(null, arguments), this;
  }
  function lm() {
    return Array.from(this);
  }
  function em() {
    for (var u = this._groups, i = 0, r = u.length; i < r; ++i)
      for (var c = u[i], o = 0, y = c.length; o < y; ++o) {
        var v = c[o];
        if (v) return v;
      }
    return null;
  }
  function nm() {
    let u = 0;
    for (const i of this) ++u;
    return u;
  }
  function um() {
    return !this.node();
  }
  function am(u) {
    for (var i = this._groups, r = 0, c = i.length; r < c; ++r)
      for (var o = i[r], y = 0, v = o.length, m; y < v; ++y)
        (m = o[y]) && u.call(m, m.__data__, y, o);
    return this;
  }
  function im(u) {
    return function() {
      this.removeAttribute(u);
    };
  }
  function fm(u) {
    return function() {
      this.removeAttributeNS(u.space, u.local);
    };
  }
  function cm(u, i) {
    return function() {
      this.setAttribute(u, i);
    };
  }
  function rm(u, i) {
    return function() {
      this.setAttributeNS(u.space, u.local, i);
    };
  }
  function sm(u, i) {
    return function() {
      var r = i.apply(this, arguments);
      r == null ? this.removeAttribute(u) : this.setAttribute(u, r);
    };
  }
  function om(u, i) {
    return function() {
      var r = i.apply(this, arguments);
      r == null ? this.removeAttributeNS(u.space, u.local) : this.setAttributeNS(u.space, u.local, r);
    };
  }
  function hm(u, i) {
    var r = Gi(u);
    if (arguments.length < 2) {
      var c = this.node();
      return r.local ? c.getAttributeNS(r.space, r.local) : c.getAttribute(r);
    }
    return this.each((i == null ? r.local ? fm : im : typeof i == "function" ? r.local ? om : sm : r.local ? rm : cm)(r, i));
  }
  function id(u) {
    return u.ownerDocument && u.ownerDocument.defaultView || u.document && u || u.defaultView;
  }
  function dm(u) {
    return function() {
      this.style.removeProperty(u);
    };
  }
  function ym(u, i, r) {
    return function() {
      this.style.setProperty(u, i, r);
    };
  }
  function vm(u, i, r) {
    return function() {
      var c = i.apply(this, arguments);
      c == null ? this.style.removeProperty(u) : this.style.setProperty(u, c, r);
    };
  }
  function mm(u, i, r) {
    return arguments.length > 1 ? this.each((i == null ? dm : typeof i == "function" ? vm : ym)(u, i, r ?? "")) : Kn(this.node(), u);
  }
  function Kn(u, i) {
    return u.style.getPropertyValue(i) || id(u).getComputedStyle(u, null).getPropertyValue(i);
  }
  function gm(u) {
    return function() {
      delete this[u];
    };
  }
  function _m(u, i) {
    return function() {
      this[u] = i;
    };
  }
  function pm(u, i) {
    return function() {
      var r = i.apply(this, arguments);
      r == null ? delete this[u] : this[u] = r;
    };
  }
  function Sm(u, i) {
    return arguments.length > 1 ? this.each((i == null ? gm : typeof i == "function" ? pm : _m)(u, i)) : this.node()[u];
  }
  function fd(u) {
    return u.trim().split(/^|\s+/);
  }
  function xr(u) {
    return u.classList || new cd(u);
  }
  function cd(u) {
    this._node = u, this._names = fd(u.getAttribute("class") || "");
  }
  cd.prototype = {
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
  function rd(u, i) {
    for (var r = xr(u), c = -1, o = i.length; ++c < o; ) r.add(i[c]);
  }
  function sd(u, i) {
    for (var r = xr(u), c = -1, o = i.length; ++c < o; ) r.remove(i[c]);
  }
  function bm(u) {
    return function() {
      rd(this, u);
    };
  }
  function Am(u) {
    return function() {
      sd(this, u);
    };
  }
  function Em(u, i) {
    return function() {
      (i.apply(this, arguments) ? rd : sd)(this, u);
    };
  }
  function xm(u, i) {
    var r = fd(u + "");
    if (arguments.length < 2) {
      for (var c = xr(this.node()), o = -1, y = r.length; ++o < y; ) if (!c.contains(r[o])) return !1;
      return !0;
    }
    return this.each((typeof i == "function" ? Em : i ? bm : Am)(r, i));
  }
  function Tm() {
    this.textContent = "";
  }
  function Mm(u) {
    return function() {
      this.textContent = u;
    };
  }
  function zm(u) {
    return function() {
      var i = u.apply(this, arguments);
      this.textContent = i ?? "";
    };
  }
  function Om(u) {
    return arguments.length ? this.each(u == null ? Tm : (typeof u == "function" ? zm : Mm)(u)) : this.node().textContent;
  }
  function Dm() {
    this.innerHTML = "";
  }
  function Rm(u) {
    return function() {
      this.innerHTML = u;
    };
  }
  function Nm(u) {
    return function() {
      var i = u.apply(this, arguments);
      this.innerHTML = i ?? "";
    };
  }
  function Um(u) {
    return arguments.length ? this.each(u == null ? Dm : (typeof u == "function" ? Nm : Rm)(u)) : this.node().innerHTML;
  }
  function Hm() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function wm() {
    return this.each(Hm);
  }
  function qm() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function Ym() {
    return this.each(qm);
  }
  function Bm(u) {
    var i = typeof u == "function" ? u : ld(u);
    return this.select(function() {
      return this.appendChild(i.apply(this, arguments));
    });
  }
  function Cm() {
    return null;
  }
  function Xm(u, i) {
    var r = typeof u == "function" ? u : ld(u), c = i == null ? Cm : typeof i == "function" ? i : Er(i);
    return this.select(function() {
      return this.insertBefore(r.apply(this, arguments), c.apply(this, arguments) || null);
    });
  }
  function Gm() {
    var u = this.parentNode;
    u && u.removeChild(this);
  }
  function Qm() {
    return this.each(Gm);
  }
  function Zm() {
    var u = this.cloneNode(!1), i = this.parentNode;
    return i ? i.insertBefore(u, this.nextSibling) : u;
  }
  function jm() {
    var u = this.cloneNode(!0), i = this.parentNode;
    return i ? i.insertBefore(u, this.nextSibling) : u;
  }
  function Vm(u) {
    return this.select(u ? jm : Zm);
  }
  function Lm(u) {
    return arguments.length ? this.property("__data__", u) : this.node().__data__;
  }
  function Km(u) {
    return function(i) {
      u.call(this, i, this.__data__);
    };
  }
  function $m(u) {
    return u.trim().split(/^|\s+/).map(function(i) {
      var r = "", c = i.indexOf(".");
      return c >= 0 && (r = i.slice(c + 1), i = i.slice(0, c)), { type: i, name: r };
    });
  }
  function Jm(u) {
    return function() {
      var i = this.__on;
      if (i) {
        for (var r = 0, c = -1, o = i.length, y; r < o; ++r)
          y = i[r], (!u.type || y.type === u.type) && y.name === u.name ? this.removeEventListener(y.type, y.listener, y.options) : i[++c] = y;
        ++c ? i.length = c : delete this.__on;
      }
    };
  }
  function km(u, i, r) {
    return function() {
      var c = this.__on, o, y = Km(i);
      if (c) {
        for (var v = 0, m = c.length; v < m; ++v)
          if ((o = c[v]).type === u.type && o.name === u.name) {
            this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = y, o.options = r), o.value = i;
            return;
          }
      }
      this.addEventListener(u.type, y, r), o = { type: u.type, name: u.name, value: i, listener: y, options: r }, c ? c.push(o) : this.__on = [o];
    };
  }
  function Wm(u, i, r) {
    var c = $m(u + ""), o, y = c.length, v;
    if (arguments.length < 2) {
      var m = this.node().__on;
      if (m) {
        for (var g = 0, h = m.length, p; g < h; ++g)
          for (o = 0, p = m[g]; o < y; ++o)
            if ((v = c[o]).type === p.type && v.name === p.name)
              return p.value;
      }
      return;
    }
    for (m = i ? km : Jm, o = 0; o < y; ++o) this.each(m(c[o], i, r));
    return this;
  }
  function od(u, i, r) {
    var c = id(u), o = c.CustomEvent;
    typeof o == "function" ? o = new o(i, r) : (o = c.document.createEvent("Event"), r ? (o.initEvent(i, r.bubbles, r.cancelable), o.detail = r.detail) : o.initEvent(i, !1, !1)), u.dispatchEvent(o);
  }
  function Fm(u, i) {
    return function() {
      return od(this, u, i);
    };
  }
  function Pm(u, i) {
    return function() {
      return od(this, u, i.apply(this, arguments));
    };
  }
  function Im(u, i) {
    return this.each((typeof i == "function" ? Pm : Fm)(u, i));
  }
  function* tg() {
    for (var u = this._groups, i = 0, r = u.length; i < r; ++i)
      for (var c = u[i], o = 0, y = c.length, v; o < y; ++o)
        (v = c[o]) && (yield v);
  }
  var lg = [null];
  function Nl(u, i) {
    this._groups = u, this._parents = i;
  }
  function na() {
    return new Nl([[document.documentElement]], lg);
  }
  function eg() {
    return this;
  }
  Nl.prototype = na.prototype = {
    constructor: Nl,
    select: z1,
    selectAll: N1,
    selectChild: q1,
    selectChildren: X1,
    filter: G1,
    data: K1,
    enter: Q1,
    exit: J1,
    join: k1,
    merge: W1,
    selection: eg,
    order: F1,
    sort: P1,
    call: tm,
    nodes: lm,
    node: em,
    size: nm,
    empty: um,
    each: am,
    attr: hm,
    style: mm,
    property: Sm,
    classed: xm,
    text: Om,
    html: Um,
    raise: wm,
    lower: Ym,
    append: Bm,
    insert: Xm,
    remove: Qm,
    clone: Vm,
    datum: Lm,
    on: Wm,
    dispatch: Im,
    [Symbol.iterator]: tg
  };
  function Tr(u, i, r) {
    u.prototype = i.prototype = r, r.constructor = u;
  }
  function hd(u, i) {
    var r = Object.create(u.prototype);
    for (var c in i) r[c] = i[c];
    return r;
  }
  function ua() {
  }
  var Iu = 0.7, Ni = 1 / Iu, Ln = "\\s*([+-]?\\d+)\\s*", ta = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Gl = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ng = /^#([0-9a-f]{3,8})$/, ug = new RegExp(`^rgb\\(${Ln},${Ln},${Ln}\\)$`), ag = new RegExp(`^rgb\\(${Gl},${Gl},${Gl}\\)$`), ig = new RegExp(`^rgba\\(${Ln},${Ln},${Ln},${ta}\\)$`), fg = new RegExp(`^rgba\\(${Gl},${Gl},${Gl},${ta}\\)$`), cg = new RegExp(`^hsl\\(${ta},${Gl},${Gl}\\)$`), rg = new RegExp(`^hsla\\(${ta},${Gl},${Gl},${ta}\\)$`), A0 = {
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
  Tr(ua, un, {
    copy(u) {
      return Object.assign(new this.constructor(), this, u);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: E0,
    // Deprecated! Use color.formatHex.
    formatHex: E0,
    formatHex8: sg,
    formatHsl: og,
    formatRgb: x0,
    toString: x0
  });
  function E0() {
    return this.rgb().formatHex();
  }
  function sg() {
    return this.rgb().formatHex8();
  }
  function og() {
    return dd(this).formatHsl();
  }
  function x0() {
    return this.rgb().formatRgb();
  }
  function un(u) {
    var i, r;
    return u = (u + "").trim().toLowerCase(), (i = ng.exec(u)) ? (r = i[1].length, i = parseInt(i[1], 16), r === 6 ? T0(i) : r === 3 ? new ul(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : r === 8 ? pi(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : r === 4 ? pi(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = ug.exec(u)) ? new ul(i[1], i[2], i[3], 1) : (i = ag.exec(u)) ? new ul(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = ig.exec(u)) ? pi(i[1], i[2], i[3], i[4]) : (i = fg.exec(u)) ? pi(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = cg.exec(u)) ? O0(i[1], i[2] / 100, i[3] / 100, 1) : (i = rg.exec(u)) ? O0(i[1], i[2] / 100, i[3] / 100, i[4]) : A0.hasOwnProperty(u) ? T0(A0[u]) : u === "transparent" ? new ul(NaN, NaN, NaN, 0) : null;
  }
  function T0(u) {
    return new ul(u >> 16 & 255, u >> 8 & 255, u & 255, 1);
  }
  function pi(u, i, r, c) {
    return c <= 0 && (u = i = r = NaN), new ul(u, i, r, c);
  }
  function hg(u) {
    return u instanceof ua || (u = un(u)), u ? (u = u.rgb(), new ul(u.r, u.g, u.b, u.opacity)) : new ul();
  }
  function dr(u, i, r, c) {
    return arguments.length === 1 ? hg(u) : new ul(u, i, r, c ?? 1);
  }
  function ul(u, i, r, c) {
    this.r = +u, this.g = +i, this.b = +r, this.opacity = +c;
  }
  Tr(ul, dr, hd(ua, {
    brighter(u) {
      return u = u == null ? Ni : Math.pow(Ni, u), new ul(this.r * u, this.g * u, this.b * u, this.opacity);
    },
    darker(u) {
      return u = u == null ? Iu : Math.pow(Iu, u), new ul(this.r * u, this.g * u, this.b * u, this.opacity);
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
    hex: M0,
    // Deprecated! Use color.formatHex.
    formatHex: M0,
    formatHex8: dg,
    formatRgb: z0,
    toString: z0
  }));
  function M0() {
    return `#${en(this.r)}${en(this.g)}${en(this.b)}`;
  }
  function dg() {
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
  function dd(u) {
    if (u instanceof Rl) return new Rl(u.h, u.s, u.l, u.opacity);
    if (u instanceof ua || (u = un(u)), !u) return new Rl();
    if (u instanceof Rl) return u;
    u = u.rgb();
    var i = u.r / 255, r = u.g / 255, c = u.b / 255, o = Math.min(i, r, c), y = Math.max(i, r, c), v = NaN, m = y - o, g = (y + o) / 2;
    return m ? (i === y ? v = (r - c) / m + (r < c) * 6 : r === y ? v = (c - i) / m + 2 : v = (i - r) / m + 4, m /= g < 0.5 ? y + o : 2 - y - o, v *= 60) : m = g > 0 && g < 1 ? 0 : v, new Rl(v, m, g, u.opacity);
  }
  function yg(u, i, r, c) {
    return arguments.length === 1 ? dd(u) : new Rl(u, i, r, c ?? 1);
  }
  function Rl(u, i, r, c) {
    this.h = +u, this.s = +i, this.l = +r, this.opacity = +c;
  }
  Tr(Rl, yg, hd(ua, {
    brighter(u) {
      return u = u == null ? Ni : Math.pow(Ni, u), new Rl(this.h, this.s, this.l * u, this.opacity);
    },
    darker(u) {
      return u = u == null ? Iu : Math.pow(Iu, u), new Rl(this.h, this.s, this.l * u, this.opacity);
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
      return new Rl(D0(this.h), Si(this.s), Si(this.l), Ui(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl() {
      const u = Ui(this.opacity);
      return `${u === 1 ? "hsl(" : "hsla("}${D0(this.h)}, ${Si(this.s) * 100}%, ${Si(this.l) * 100}%${u === 1 ? ")" : `, ${u})`}`;
    }
  }));
  function D0(u) {
    return u = (u || 0) % 360, u < 0 ? u + 360 : u;
  }
  function Si(u) {
    return Math.max(0, Math.min(1, u || 0));
  }
  function lr(u, i, r) {
    return (u < 60 ? i + (r - i) * u / 60 : u < 180 ? r : u < 240 ? i + (r - i) * (240 - u) / 60 : i) * 255;
  }
  const Mr = (u) => () => u;
  function vg(u, i) {
    return function(r) {
      return u + r * i;
    };
  }
  function mg(u, i, r) {
    return u = Math.pow(u, r), i = Math.pow(i, r) - u, r = 1 / r, function(c) {
      return Math.pow(u + c * i, r);
    };
  }
  function gg(u) {
    return (u = +u) == 1 ? yd : function(i, r) {
      return r - i ? mg(i, r, u) : Mr(isNaN(i) ? r : i);
    };
  }
  function yd(u, i) {
    var r = i - u;
    return r ? vg(u, r) : Mr(isNaN(u) ? i : u);
  }
  const Hi = function u(i) {
    var r = gg(i);
    function c(o, y) {
      var v = r((o = dr(o)).r, (y = dr(y)).r), m = r(o.g, y.g), g = r(o.b, y.b), h = yd(o.opacity, y.opacity);
      return function(p) {
        return o.r = v(p), o.g = m(p), o.b = g(p), o.opacity = h(p), o + "";
      };
    }
    return c.gamma = u, c;
  }(1);
  function _g(u, i) {
    i || (i = []);
    var r = u ? Math.min(i.length, u.length) : 0, c = i.slice(), o;
    return function(y) {
      for (o = 0; o < r; ++o) c[o] = u[o] * (1 - y) + i[o] * y;
      return c;
    };
  }
  function pg(u) {
    return ArrayBuffer.isView(u) && !(u instanceof DataView);
  }
  function Sg(u, i) {
    var r = i ? i.length : 0, c = u ? Math.min(r, u.length) : 0, o = new Array(c), y = new Array(r), v;
    for (v = 0; v < c; ++v) o[v] = zr(u[v], i[v]);
    for (; v < r; ++v) y[v] = i[v];
    return function(m) {
      for (v = 0; v < c; ++v) y[v] = o[v](m);
      return y;
    };
  }
  function bg(u, i) {
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
  function Ag(u, i) {
    var r = {}, c = {}, o;
    (u === null || typeof u != "object") && (u = {}), (i === null || typeof i != "object") && (i = {});
    for (o in i)
      o in u ? r[o] = zr(u[o], i[o]) : c[o] = i[o];
    return function(y) {
      for (o in r) c[o] = r[o](y);
      return c;
    };
  }
  var yr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, er = new RegExp(yr.source, "g");
  function Eg(u) {
    return function() {
      return u;
    };
  }
  function xg(u) {
    return function(i) {
      return u(i) + "";
    };
  }
  function vd(u, i) {
    var r = yr.lastIndex = er.lastIndex = 0, c, o, y, v = -1, m = [], g = [];
    for (u = u + "", i = i + ""; (c = yr.exec(u)) && (o = er.exec(i)); )
      (y = o.index) > r && (y = i.slice(r, y), m[v] ? m[v] += y : m[++v] = y), (c = c[0]) === (o = o[0]) ? m[v] ? m[v] += o : m[++v] = o : (m[++v] = null, g.push({ i: v, x: Dl(c, o) })), r = er.lastIndex;
    return r < i.length && (y = i.slice(r), m[v] ? m[v] += y : m[++v] = y), m.length < 2 ? g[0] ? xg(g[0].x) : Eg(i) : (i = g.length, function(h) {
      for (var p = 0, x; p < i; ++p) m[(x = g[p]).i] = x.x(h);
      return m.join("");
    });
  }
  function zr(u, i) {
    var r = typeof i, c;
    return i == null || r === "boolean" ? Mr(i) : (r === "number" ? Dl : r === "string" ? (c = un(i)) ? (i = c, Hi) : vd : i instanceof un ? Hi : i instanceof Date ? bg : pg(i) ? _g : Array.isArray(i) ? Sg : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? Ag : Dl)(u, i);
  }
  function Tg(u, i) {
    return u = +u, i = +i, function(r) {
      return Math.round(u * (1 - r) + i * r);
    };
  }
  var R0 = 180 / Math.PI, vr = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function md(u, i, r, c, o, y) {
    var v, m, g;
    return (v = Math.sqrt(u * u + i * i)) && (u /= v, i /= v), (g = u * r + i * c) && (r -= u * g, c -= i * g), (m = Math.sqrt(r * r + c * c)) && (r /= m, c /= m, g /= m), u * c < i * r && (u = -u, i = -i, g = -g, v = -v), {
      translateX: o,
      translateY: y,
      rotate: Math.atan2(i, u) * R0,
      skewX: Math.atan(g) * R0,
      scaleX: v,
      scaleY: m
    };
  }
  var bi;
  function Mg(u) {
    const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(u + "");
    return i.isIdentity ? vr : md(i.a, i.b, i.c, i.d, i.e, i.f);
  }
  function zg(u) {
    return u == null || (bi || (bi = document.createElementNS("http://www.w3.org/2000/svg", "g")), bi.setAttribute("transform", u), !(u = bi.transform.baseVal.consolidate())) ? vr : (u = u.matrix, md(u.a, u.b, u.c, u.d, u.e, u.f));
  }
  function gd(u, i, r, c) {
    function o(h) {
      return h.length ? h.pop() + " " : "";
    }
    function y(h, p, x, M, R, Z) {
      if (h !== x || p !== M) {
        var K = R.push("translate(", null, i, null, r);
        Z.push({ i: K - 4, x: Dl(h, x) }, { i: K - 2, x: Dl(p, M) });
      } else (x || M) && R.push("translate(" + x + i + M + r);
    }
    function v(h, p, x, M) {
      h !== p ? (h - p > 180 ? p += 360 : p - h > 180 && (h += 360), M.push({ i: x.push(o(x) + "rotate(", null, c) - 2, x: Dl(h, p) })) : p && x.push(o(x) + "rotate(" + p + c);
    }
    function m(h, p, x, M) {
      h !== p ? M.push({ i: x.push(o(x) + "skewX(", null, c) - 2, x: Dl(h, p) }) : p && x.push(o(x) + "skewX(" + p + c);
    }
    function g(h, p, x, M, R, Z) {
      if (h !== x || p !== M) {
        var K = R.push(o(R) + "scale(", null, ",", null, ")");
        Z.push({ i: K - 4, x: Dl(h, x) }, { i: K - 2, x: Dl(p, M) });
      } else (x !== 1 || M !== 1) && R.push(o(R) + "scale(" + x + "," + M + ")");
    }
    return function(h, p) {
      var x = [], M = [];
      return h = u(h), p = u(p), y(h.translateX, h.translateY, p.translateX, p.translateY, x, M), v(h.rotate, p.rotate, x, M), m(h.skewX, p.skewX, x, M), g(h.scaleX, h.scaleY, p.scaleX, p.scaleY, x, M), h = p = null, function(R) {
        for (var Z = -1, K = M.length, at; ++Z < K; ) x[(at = M[Z]).i] = at.x(R);
        return x.join("");
      };
    };
  }
  var Og = gd(Mg, "px, ", "px)", "deg)"), Dg = gd(zg, ", ", ")", ")"), $n = 0, Wu = 0, $u = 0, _d = 1e3, wi, Fu, qi = 0, an = 0, Qi = 0, la = typeof performance == "object" && performance.now ? performance : Date, pd = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(u) {
    setTimeout(u, 17);
  };
  function Or() {
    return an || (pd(Rg), an = la.now() + Qi);
  }
  function Rg() {
    an = 0;
  }
  function Yi() {
    this._call = this._time = this._next = null;
  }
  Yi.prototype = Sd.prototype = {
    constructor: Yi,
    restart: function(u, i, r) {
      if (typeof u != "function") throw new TypeError("callback is not a function");
      r = (r == null ? Or() : +r) + (i == null ? 0 : +i), !this._next && Fu !== this && (Fu ? Fu._next = this : wi = this, Fu = this), this._call = u, this._time = r, mr();
    },
    stop: function() {
      this._call && (this._call = null, this._time = 1 / 0, mr());
    }
  };
  function Sd(u, i, r) {
    var c = new Yi();
    return c.restart(u, i, r), c;
  }
  function Ng() {
    Or(), ++$n;
    for (var u = wi, i; u; )
      (i = an - u._time) >= 0 && u._call.call(void 0, i), u = u._next;
    --$n;
  }
  function N0() {
    an = (qi = la.now()) + Qi, $n = Wu = 0;
    try {
      Ng();
    } finally {
      $n = 0, Hg(), an = 0;
    }
  }
  function Ug() {
    var u = la.now(), i = u - qi;
    i > _d && (Qi -= i, qi = u);
  }
  function Hg() {
    for (var u, i = wi, r, c = 1 / 0; i; )
      i._call ? (c > i._time && (c = i._time), u = i, i = i._next) : (r = i._next, i._next = null, i = u ? u._next = r : wi = r);
    Fu = u, mr(c);
  }
  function mr(u) {
    if (!$n) {
      Wu && (Wu = clearTimeout(Wu));
      var i = u - an;
      i > 24 ? (u < 1 / 0 && (Wu = setTimeout(N0, u - la.now() - Qi)), $u && ($u = clearInterval($u))) : ($u || (qi = la.now(), $u = setInterval(Ug, _d)), $n = 1, pd(N0));
    }
  }
  function U0(u, i, r) {
    var c = new Yi();
    return i = i == null ? 0 : +i, c.restart((o) => {
      c.stop(), u(o + i);
    }, i, r), c;
  }
  var wg = td("start", "end", "cancel", "interrupt"), qg = [], bd = 0, H0 = 1, gr = 2, Mi = 3, w0 = 4, _r = 5, zi = 6;
  function Zi(u, i, r, c, o, y) {
    var v = u.__transition;
    if (!v) u.__transition = {};
    else if (r in v) return;
    Yg(u, r, {
      name: i,
      index: c,
      // For context during callback.
      group: o,
      // For context during callback.
      on: wg,
      tween: qg,
      time: y.time,
      delay: y.delay,
      duration: y.duration,
      ease: y.ease,
      timer: null,
      state: bd
    });
  }
  function Dr(u, i) {
    var r = Ul(u, i);
    if (r.state > bd) throw new Error("too late; already scheduled");
    return r;
  }
  function Ql(u, i) {
    var r = Ul(u, i);
    if (r.state > Mi) throw new Error("too late; already running");
    return r;
  }
  function Ul(u, i) {
    var r = u.__transition;
    if (!r || !(r = r[i])) throw new Error("transition not found");
    return r;
  }
  function Yg(u, i, r) {
    var c = u.__transition, o;
    c[i] = r, r.timer = Sd(y, 0, r.time);
    function y(h) {
      r.state = H0, r.timer.restart(v, r.delay, r.time), r.delay <= h && v(h - r.delay);
    }
    function v(h) {
      var p, x, M, R;
      if (r.state !== H0) return g();
      for (p in c)
        if (R = c[p], R.name === r.name) {
          if (R.state === Mi) return U0(v);
          R.state === w0 ? (R.state = zi, R.timer.stop(), R.on.call("interrupt", u, u.__data__, R.index, R.group), delete c[p]) : +p < i && (R.state = zi, R.timer.stop(), R.on.call("cancel", u, u.__data__, R.index, R.group), delete c[p]);
        }
      if (U0(function() {
        r.state === Mi && (r.state = w0, r.timer.restart(m, r.delay, r.time), m(h));
      }), r.state = gr, r.on.call("start", u, u.__data__, r.index, r.group), r.state === gr) {
        for (r.state = Mi, o = new Array(M = r.tween.length), p = 0, x = -1; p < M; ++p)
          (R = r.tween[p].value.call(u, u.__data__, r.index, r.group)) && (o[++x] = R);
        o.length = x + 1;
      }
    }
    function m(h) {
      for (var p = h < r.duration ? r.ease.call(null, h / r.duration) : (r.timer.restart(g), r.state = _r, 1), x = -1, M = o.length; ++x < M; )
        o[x].call(u, p);
      r.state === _r && (r.on.call("end", u, u.__data__, r.index, r.group), g());
    }
    function g() {
      r.state = zi, r.timer.stop(), delete c[i];
      for (var h in c) return;
      delete u.__transition;
    }
  }
  function Bg(u, i) {
    var r = u.__transition, c, o, y = !0, v;
    if (r) {
      i = i == null ? null : i + "";
      for (v in r) {
        if ((c = r[v]).name !== i) {
          y = !1;
          continue;
        }
        o = c.state > gr && c.state < _r, c.state = zi, c.timer.stop(), c.on.call(o ? "interrupt" : "cancel", u, u.__data__, c.index, c.group), delete r[v];
      }
      y && delete u.__transition;
    }
  }
  function Cg(u) {
    return this.each(function() {
      Bg(this, u);
    });
  }
  function Xg(u, i) {
    var r, c;
    return function() {
      var o = Ql(this, u), y = o.tween;
      if (y !== r) {
        c = r = y;
        for (var v = 0, m = c.length; v < m; ++v)
          if (c[v].name === i) {
            c = c.slice(), c.splice(v, 1);
            break;
          }
      }
      o.tween = c;
    };
  }
  function Gg(u, i, r) {
    var c, o;
    if (typeof r != "function") throw new Error();
    return function() {
      var y = Ql(this, u), v = y.tween;
      if (v !== c) {
        o = (c = v).slice();
        for (var m = { name: i, value: r }, g = 0, h = o.length; g < h; ++g)
          if (o[g].name === i) {
            o[g] = m;
            break;
          }
        g === h && o.push(m);
      }
      y.tween = o;
    };
  }
  function Qg(u, i) {
    var r = this._id;
    if (u += "", arguments.length < 2) {
      for (var c = Ul(this.node(), r).tween, o = 0, y = c.length, v; o < y; ++o)
        if ((v = c[o]).name === u)
          return v.value;
      return null;
    }
    return this.each((i == null ? Xg : Gg)(r, u, i));
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
  function Ad(u, i) {
    var r;
    return (typeof i == "number" ? Dl : i instanceof un ? Hi : (r = un(i)) ? (i = r, Hi) : vd)(u, i);
  }
  function Zg(u) {
    return function() {
      this.removeAttribute(u);
    };
  }
  function jg(u) {
    return function() {
      this.removeAttributeNS(u.space, u.local);
    };
  }
  function Vg(u, i, r) {
    var c, o = r + "", y;
    return function() {
      var v = this.getAttribute(u);
      return v === o ? null : v === c ? y : y = i(c = v, r);
    };
  }
  function Lg(u, i, r) {
    var c, o = r + "", y;
    return function() {
      var v = this.getAttributeNS(u.space, u.local);
      return v === o ? null : v === c ? y : y = i(c = v, r);
    };
  }
  function Kg(u, i, r) {
    var c, o, y;
    return function() {
      var v, m = r(this), g;
      return m == null ? void this.removeAttribute(u) : (v = this.getAttribute(u), g = m + "", v === g ? null : v === c && g === o ? y : (o = g, y = i(c = v, m)));
    };
  }
  function $g(u, i, r) {
    var c, o, y;
    return function() {
      var v, m = r(this), g;
      return m == null ? void this.removeAttributeNS(u.space, u.local) : (v = this.getAttributeNS(u.space, u.local), g = m + "", v === g ? null : v === c && g === o ? y : (o = g, y = i(c = v, m)));
    };
  }
  function Jg(u, i) {
    var r = Gi(u), c = r === "transform" ? Dg : Ad;
    return this.attrTween(u, typeof i == "function" ? (r.local ? $g : Kg)(r, c, Rr(this, "attr." + u, i)) : i == null ? (r.local ? jg : Zg)(r) : (r.local ? Lg : Vg)(r, c, i));
  }
  function kg(u, i) {
    return function(r) {
      this.setAttribute(u, i.call(this, r));
    };
  }
  function Wg(u, i) {
    return function(r) {
      this.setAttributeNS(u.space, u.local, i.call(this, r));
    };
  }
  function Fg(u, i) {
    var r, c;
    function o() {
      var y = i.apply(this, arguments);
      return y !== c && (r = (c = y) && Wg(u, y)), r;
    }
    return o._value = i, o;
  }
  function Pg(u, i) {
    var r, c;
    function o() {
      var y = i.apply(this, arguments);
      return y !== c && (r = (c = y) && kg(u, y)), r;
    }
    return o._value = i, o;
  }
  function Ig(u, i) {
    var r = "attr." + u;
    if (arguments.length < 2) return (r = this.tween(r)) && r._value;
    if (i == null) return this.tween(r, null);
    if (typeof i != "function") throw new Error();
    var c = Gi(u);
    return this.tween(r, (c.local ? Fg : Pg)(c, i));
  }
  function t2(u, i) {
    return function() {
      Dr(this, u).delay = +i.apply(this, arguments);
    };
  }
  function l2(u, i) {
    return i = +i, function() {
      Dr(this, u).delay = i;
    };
  }
  function e2(u) {
    var i = this._id;
    return arguments.length ? this.each((typeof u == "function" ? t2 : l2)(i, u)) : Ul(this.node(), i).delay;
  }
  function n2(u, i) {
    return function() {
      Ql(this, u).duration = +i.apply(this, arguments);
    };
  }
  function u2(u, i) {
    return i = +i, function() {
      Ql(this, u).duration = i;
    };
  }
  function a2(u) {
    var i = this._id;
    return arguments.length ? this.each((typeof u == "function" ? n2 : u2)(i, u)) : Ul(this.node(), i).duration;
  }
  function i2(u, i) {
    if (typeof i != "function") throw new Error();
    return function() {
      Ql(this, u).ease = i;
    };
  }
  function f2(u) {
    var i = this._id;
    return arguments.length ? this.each(i2(i, u)) : Ul(this.node(), i).ease;
  }
  function c2(u, i) {
    return function() {
      var r = i.apply(this, arguments);
      if (typeof r != "function") throw new Error();
      Ql(this, u).ease = r;
    };
  }
  function r2(u) {
    if (typeof u != "function") throw new Error();
    return this.each(c2(this._id, u));
  }
  function s2(u) {
    typeof u != "function" && (u = nd(u));
    for (var i = this._groups, r = i.length, c = new Array(r), o = 0; o < r; ++o)
      for (var y = i[o], v = y.length, m = c[o] = [], g, h = 0; h < v; ++h)
        (g = y[h]) && u.call(g, g.__data__, h, y) && m.push(g);
    return new ie(c, this._parents, this._name, this._id);
  }
  function o2(u) {
    if (u._id !== this._id) throw new Error();
    for (var i = this._groups, r = u._groups, c = i.length, o = r.length, y = Math.min(c, o), v = new Array(c), m = 0; m < y; ++m)
      for (var g = i[m], h = r[m], p = g.length, x = v[m] = new Array(p), M, R = 0; R < p; ++R)
        (M = g[R] || h[R]) && (x[R] = M);
    for (; m < c; ++m)
      v[m] = i[m];
    return new ie(v, this._parents, this._name, this._id);
  }
  function h2(u) {
    return (u + "").trim().split(/^|\s+/).every(function(i) {
      var r = i.indexOf(".");
      return r >= 0 && (i = i.slice(0, r)), !i || i === "start";
    });
  }
  function d2(u, i, r) {
    var c, o, y = h2(i) ? Dr : Ql;
    return function() {
      var v = y(this, u), m = v.on;
      m !== c && (o = (c = m).copy()).on(i, r), v.on = o;
    };
  }
  function y2(u, i) {
    var r = this._id;
    return arguments.length < 2 ? Ul(this.node(), r).on.on(u) : this.each(d2(r, u, i));
  }
  function v2(u) {
    return function() {
      var i = this.parentNode;
      for (var r in this.__transition) if (+r !== u) return;
      i && i.removeChild(this);
    };
  }
  function m2() {
    return this.on("end.remove", v2(this._id));
  }
  function g2(u) {
    var i = this._name, r = this._id;
    typeof u != "function" && (u = Er(u));
    for (var c = this._groups, o = c.length, y = new Array(o), v = 0; v < o; ++v)
      for (var m = c[v], g = m.length, h = y[v] = new Array(g), p, x, M = 0; M < g; ++M)
        (p = m[M]) && (x = u.call(p, p.__data__, M, m)) && ("__data__" in p && (x.__data__ = p.__data__), h[M] = x, Zi(h[M], i, r, M, h, Ul(p, r)));
    return new ie(y, this._parents, i, r);
  }
  function _2(u) {
    var i = this._name, r = this._id;
    typeof u != "function" && (u = ed(u));
    for (var c = this._groups, o = c.length, y = [], v = [], m = 0; m < o; ++m)
      for (var g = c[m], h = g.length, p, x = 0; x < h; ++x)
        if (p = g[x]) {
          for (var M = u.call(p, p.__data__, x, g), R, Z = Ul(p, r), K = 0, at = M.length; K < at; ++K)
            (R = M[K]) && Zi(R, i, r, K, M, Z);
          y.push(M), v.push(p);
        }
    return new ie(y, v, i, r);
  }
  var p2 = na.prototype.constructor;
  function S2() {
    return new p2(this._groups, this._parents);
  }
  function b2(u, i) {
    var r, c, o;
    return function() {
      var y = Kn(this, u), v = (this.style.removeProperty(u), Kn(this, u));
      return y === v ? null : y === r && v === c ? o : o = i(r = y, c = v);
    };
  }
  function Ed(u) {
    return function() {
      this.style.removeProperty(u);
    };
  }
  function A2(u, i, r) {
    var c, o = r + "", y;
    return function() {
      var v = Kn(this, u);
      return v === o ? null : v === c ? y : y = i(c = v, r);
    };
  }
  function E2(u, i, r) {
    var c, o, y;
    return function() {
      var v = Kn(this, u), m = r(this), g = m + "";
      return m == null && (g = m = (this.style.removeProperty(u), Kn(this, u))), v === g ? null : v === c && g === o ? y : (o = g, y = i(c = v, m));
    };
  }
  function x2(u, i) {
    var r, c, o, y = "style." + i, v = "end." + y, m;
    return function() {
      var g = Ql(this, u), h = g.on, p = g.value[y] == null ? m || (m = Ed(i)) : void 0;
      (h !== r || o !== p) && (c = (r = h).copy()).on(v, o = p), g.on = c;
    };
  }
  function T2(u, i, r) {
    var c = (u += "") == "transform" ? Og : Ad;
    return i == null ? this.styleTween(u, b2(u, c)).on("end.style." + u, Ed(u)) : typeof i == "function" ? this.styleTween(u, E2(u, c, Rr(this, "style." + u, i))).each(x2(this._id, u)) : this.styleTween(u, A2(u, c, i), r).on("end.style." + u, null);
  }
  function M2(u, i, r) {
    return function(c) {
      this.style.setProperty(u, i.call(this, c), r);
    };
  }
  function z2(u, i, r) {
    var c, o;
    function y() {
      var v = i.apply(this, arguments);
      return v !== o && (c = (o = v) && M2(u, v, r)), c;
    }
    return y._value = i, y;
  }
  function O2(u, i, r) {
    var c = "style." + (u += "");
    if (arguments.length < 2) return (c = this.tween(c)) && c._value;
    if (i == null) return this.tween(c, null);
    if (typeof i != "function") throw new Error();
    return this.tween(c, z2(u, i, r ?? ""));
  }
  function D2(u) {
    return function() {
      this.textContent = u;
    };
  }
  function R2(u) {
    return function() {
      var i = u(this);
      this.textContent = i ?? "";
    };
  }
  function N2(u) {
    return this.tween("text", typeof u == "function" ? R2(Rr(this, "text", u)) : D2(u == null ? "" : u + ""));
  }
  function U2(u) {
    return function(i) {
      this.textContent = u.call(this, i);
    };
  }
  function H2(u) {
    var i, r;
    function c() {
      var o = u.apply(this, arguments);
      return o !== r && (i = (r = o) && U2(o)), i;
    }
    return c._value = u, c;
  }
  function w2(u) {
    var i = "text";
    if (arguments.length < 1) return (i = this.tween(i)) && i._value;
    if (u == null) return this.tween(i, null);
    if (typeof u != "function") throw new Error();
    return this.tween(i, H2(u));
  }
  function q2() {
    for (var u = this._name, i = this._id, r = xd(), c = this._groups, o = c.length, y = 0; y < o; ++y)
      for (var v = c[y], m = v.length, g, h = 0; h < m; ++h)
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
  function Y2() {
    var u, i, r = this, c = r._id, o = r.size();
    return new Promise(function(y, v) {
      var m = { value: v }, g = { value: function() {
        --o === 0 && y();
      } };
      r.each(function() {
        var h = Ql(this, c), p = h.on;
        p !== u && (i = (u = p).copy(), i._.cancel.push(m), i._.interrupt.push(m), i._.end.push(g)), h.on = i;
      }), o === 0 && y();
    });
  }
  var B2 = 0;
  function ie(u, i, r, c) {
    this._groups = u, this._parents = i, this._name = r, this._id = c;
  }
  function xd() {
    return ++B2;
  }
  var ae = na.prototype;
  ie.prototype = {
    constructor: ie,
    select: g2,
    selectAll: _2,
    selectChild: ae.selectChild,
    selectChildren: ae.selectChildren,
    filter: s2,
    merge: o2,
    selection: S2,
    transition: q2,
    call: ae.call,
    nodes: ae.nodes,
    node: ae.node,
    size: ae.size,
    empty: ae.empty,
    each: ae.each,
    on: y2,
    attr: Jg,
    attrTween: Ig,
    style: T2,
    styleTween: O2,
    text: N2,
    textTween: w2,
    remove: m2,
    tween: Qg,
    delay: e2,
    duration: a2,
    ease: f2,
    easeVarying: r2,
    end: Y2,
    [Symbol.iterator]: ae[Symbol.iterator]
  };
  function C2(u) {
    return ((u *= 2) <= 1 ? u * u * u : (u -= 2) * u * u + 2) / 2;
  }
  var X2 = {
    time: null,
    // Set on use.
    delay: 0,
    duration: 250,
    ease: C2
  };
  function G2(u, i) {
    for (var r; !(r = u.__transition) || !(r = r[i]); )
      if (!(u = u.parentNode))
        throw new Error(`transition ${i} not found`);
    return r;
  }
  function Q2(u) {
    var i, r;
    u instanceof ie ? (i = u._id, u = u._name) : (i = xd(), (r = X2).time = Or(), u = u == null ? null : u + "");
    for (var c = this._groups, o = c.length, y = 0; y < o; ++y)
      for (var v = c[y], m = v.length, g, h = 0; h < m; ++h)
        (g = v[h]) && Zi(g, u, i, h, v, r || G2(g, i));
    return new ie(c, this._parents, u, i);
  }
  na.prototype.interrupt = Cg;
  na.prototype.transition = Q2;
  const pr = Math.PI, Sr = 2 * pr, ln = 1e-6, Z2 = Sr - ln;
  function Td(u) {
    this._ += u[0];
    for (let i = 1, r = u.length; i < r; ++i)
      this._ += arguments[i] + u[i];
  }
  function j2(u) {
    let i = Math.floor(u);
    if (!(i >= 0)) throw new Error(`invalid digits: ${u}`);
    if (i > 15) return Td;
    const r = 10 ** i;
    return function(c) {
      this._ += c[0];
      for (let o = 1, y = c.length; o < y; ++o)
        this._ += Math.round(arguments[o] * r) / r + c[o];
    };
  }
  class V2 {
    constructor(i) {
      this._x0 = this._y0 = // start of current subpath
      this._x1 = this._y1 = null, this._ = "", this._append = i == null ? Td : j2(i);
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
    bezierCurveTo(i, r, c, o, y, v) {
      this._append`C${+i},${+r},${+c},${+o},${this._x1 = +y},${this._y1 = +v}`;
    }
    arcTo(i, r, c, o, y) {
      if (i = +i, r = +r, c = +c, o = +o, y = +y, y < 0) throw new Error(`negative radius: ${y}`);
      let v = this._x1, m = this._y1, g = c - i, h = o - r, p = v - i, x = m - r, M = p * p + x * x;
      if (this._x1 === null)
        this._append`M${this._x1 = i},${this._y1 = r}`;
      else if (M > ln) if (!(Math.abs(x * g - h * p) > ln) || !y)
        this._append`L${this._x1 = i},${this._y1 = r}`;
      else {
        let R = c - v, Z = o - m, K = g * g + h * h, at = R * R + Z * Z, nt = Math.sqrt(K), F = Math.sqrt(M), lt = y * Math.tan((pr - Math.acos((K + M - at) / (2 * nt * F))) / 2), ct = lt / F, j = lt / nt;
        Math.abs(ct - 1) > ln && this._append`L${i + ct * p},${r + ct * x}`, this._append`A${y},${y},0,0,${+(x * R > p * Z)},${this._x1 = i + j * g},${this._y1 = r + j * h}`;
      }
    }
    arc(i, r, c, o, y, v) {
      if (i = +i, r = +r, c = +c, v = !!v, c < 0) throw new Error(`negative radius: ${c}`);
      let m = c * Math.cos(o), g = c * Math.sin(o), h = i + m, p = r + g, x = 1 ^ v, M = v ? o - y : y - o;
      this._x1 === null ? this._append`M${h},${p}` : (Math.abs(this._x1 - h) > ln || Math.abs(this._y1 - p) > ln) && this._append`L${h},${p}`, c && (M < 0 && (M = M % Sr + Sr), M > Z2 ? this._append`A${c},${c},0,1,${x},${i - m},${r - g}A${c},${c},0,1,${x},${this._x1 = h},${this._y1 = p}` : M > ln && this._append`A${c},${c},0,${+(M >= pr)},${x},${this._x1 = i + c * Math.cos(y)},${this._y1 = r + c * Math.sin(y)}`);
    }
    rect(i, r, c, o) {
      this._append`M${this._x0 = this._x1 = +i},${this._y0 = this._y1 = +r}h${c = +c}v${+o}h${-c}Z`;
    }
    toString() {
      return this._;
    }
  }
  function L2(u) {
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
  function K2(u, i) {
    return function(r, c) {
      for (var o = r.length, y = [], v = 0, m = u[0], g = 0; o > 0 && m > 0 && (g + m + 1 > c && (m = Math.max(1, c - g)), y.push(r.substring(o -= m, o + m)), !((g += m + 1) > c)); )
        m = u[v = (v + 1) % u.length];
      return y.reverse().join(i);
    };
  }
  function $2(u) {
    return function(i) {
      return i.replace(/[0-9]/g, function(r) {
        return u[+r];
      });
    };
  }
  var J2 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function Ci(u) {
    if (!(i = J2.exec(u))) throw new Error("invalid format: " + u);
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
  function k2(u) {
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
  var Md;
  function W2(u, i) {
    var r = Bi(u, i);
    if (!r) return u + "";
    var c = r[0], o = r[1], y = o - (Md = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1, v = c.length;
    return y === v ? c : y > v ? c + new Array(y - v + 1).join("0") : y > 0 ? c.slice(0, y) + "." + c.slice(y) : "0." + new Array(1 - y).join("0") + Bi(u, Math.max(0, i + y - 1))[0];
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
    d: L2,
    e: (u, i) => u.toExponential(i),
    f: (u, i) => u.toFixed(i),
    g: (u, i) => u.toPrecision(i),
    o: (u) => Math.round(u).toString(8),
    p: (u, i) => q0(u * 100, i),
    r: q0,
    s: W2,
    X: (u) => Math.round(u).toString(16).toUpperCase(),
    x: (u) => Math.round(u).toString(16)
  };
  function B0(u) {
    return u;
  }
  var C0 = Array.prototype.map, X0 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function F2(u) {
    var i = u.grouping === void 0 || u.thousands === void 0 ? B0 : K2(C0.call(u.grouping, Number), u.thousands + ""), r = u.currency === void 0 ? "" : u.currency[0] + "", c = u.currency === void 0 ? "" : u.currency[1] + "", o = u.decimal === void 0 ? "." : u.decimal + "", y = u.numerals === void 0 ? B0 : $2(C0.call(u.numerals, String)), v = u.percent === void 0 ? "%" : u.percent + "", m = u.minus === void 0 ? "−" : u.minus + "", g = u.nan === void 0 ? "NaN" : u.nan + "";
    function h(x) {
      x = Ci(x);
      var M = x.fill, R = x.align, Z = x.sign, K = x.symbol, at = x.zero, nt = x.width, F = x.comma, lt = x.precision, ct = x.trim, j = x.type;
      j === "n" ? (F = !0, j = "g") : Y0[j] || (lt === void 0 && (lt = 12), ct = !0, j = "g"), (at || M === "0" && R === "=") && (at = !0, M = "0", R = "=");
      var ot = K === "$" ? r : K === "#" && /[boxX]/.test(j) ? "0" + j.toLowerCase() : "", Ot = K === "$" ? c : /[%p]/.test(j) ? v : "", pt = Y0[j], Y = /[defgprs%]/.test(j);
      lt = lt === void 0 ? 6 : /[gprs]/.test(j) ? Math.max(1, Math.min(21, lt)) : Math.max(0, Math.min(20, lt));
      function I(L) {
        var yt = ot, G = Ot, P, B, H;
        if (j === "c")
          G = pt(L) + G, L = "";
        else {
          L = +L;
          var X = L < 0 || 1 / L < 0;
          if (L = isNaN(L) ? g : pt(Math.abs(L), lt), ct && (L = k2(L)), X && +L == 0 && Z !== "+" && (X = !1), yt = (X ? Z === "(" ? Z : m : Z === "-" || Z === "(" ? "" : Z) + yt, G = (j === "s" ? X0[8 + Md / 3] : "") + G + (X && Z === "(" ? ")" : ""), Y) {
            for (P = -1, B = L.length; ++P < B; )
              if (H = L.charCodeAt(P), 48 > H || H > 57) {
                G = (H === 46 ? o + L.slice(P + 1) : L.slice(P)) + G, L = L.slice(0, P);
                break;
              }
          }
        }
        F && !at && (L = i(L, 1 / 0));
        var Q = yt.length + L.length + G.length, ut = Q < nt ? new Array(nt - Q + 1).join(M) : "";
        switch (F && at && (L = i(ut + L, ut.length ? nt - G.length : 1 / 0), ut = ""), R) {
          case "<":
            L = yt + L + G + ut;
            break;
          case "=":
            L = yt + ut + L + G;
            break;
          case "^":
            L = ut.slice(0, Q = ut.length >> 1) + yt + L + G + ut.slice(Q);
            break;
          default:
            L = ut + yt + L + G;
            break;
        }
        return y(L);
      }
      return I.toString = function() {
        return x + "";
      }, I;
    }
    function p(x, M) {
      var R = h((x = Ci(x), x.type = "f", x)), Z = Math.max(-8, Math.min(8, Math.floor(Jn(M) / 3))) * 3, K = Math.pow(10, -Z), at = X0[8 + Z / 3];
      return function(nt) {
        return R(K * nt) + at;
      };
    }
    return {
      format: h,
      formatPrefix: p
    };
  }
  var Ai, zd, Od;
  P2({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function P2(u) {
    return Ai = F2(u), zd = Ai.format, Od = Ai.formatPrefix, Ai;
  }
  function I2(u) {
    return Math.max(0, -Jn(Math.abs(u)));
  }
  function t_(u, i) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Jn(i) / 3))) * 3 - Jn(Math.abs(u)));
  }
  function l_(u, i) {
    return u = Math.abs(u), i = Math.abs(i) - u, Math.max(0, Jn(i) - Jn(u)) + 1;
  }
  function Dd(u, i) {
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
  function Rd() {
    var u = new rr(), i = [], r = [], c = G0;
    function o(y) {
      let v = u.get(y);
      if (v === void 0) {
        if (c !== G0) return c;
        u.set(y, v = i.push(y) - 1);
      }
      return r[v % r.length];
    }
    return o.domain = function(y) {
      if (!arguments.length) return i.slice();
      i = [], u = new rr();
      for (const v of y)
        u.has(v) || u.set(v, i.push(v) - 1);
      return o;
    }, o.range = function(y) {
      return arguments.length ? (r = Array.from(y), o) : r.slice();
    }, o.unknown = function(y) {
      return arguments.length ? (c = y, o) : c;
    }, o.copy = function() {
      return Rd(i, r).unknown(c);
    }, Dd.apply(o, arguments), o;
  }
  function e_(u) {
    return function() {
      return u;
    };
  }
  function n_(u) {
    return +u;
  }
  var Q0 = [0, 1];
  function jn(u) {
    return u;
  }
  function br(u, i) {
    return (i -= u = +u) ? function(r) {
      return (r - u) / i;
    } : e_(isNaN(i) ? NaN : 0.5);
  }
  function u_(u, i) {
    var r;
    return u > i && (r = u, u = i, i = r), function(c) {
      return Math.max(u, Math.min(i, c));
    };
  }
  function a_(u, i, r) {
    var c = u[0], o = u[1], y = i[0], v = i[1];
    return o < c ? (c = br(o, c), y = r(v, y)) : (c = br(c, o), y = r(y, v)), function(m) {
      return y(c(m));
    };
  }
  function i_(u, i, r) {
    var c = Math.min(u.length, i.length) - 1, o = new Array(c), y = new Array(c), v = -1;
    for (u[c] < u[0] && (u = u.slice().reverse(), i = i.slice().reverse()); ++v < c; )
      o[v] = br(u[v], u[v + 1]), y[v] = r(i[v], i[v + 1]);
    return function(m) {
      var g = s1(u, m, 1, c) - 1;
      return y[g](o[g](m));
    };
  }
  function f_(u, i) {
    return i.domain(u.domain()).range(u.range()).interpolate(u.interpolate()).clamp(u.clamp()).unknown(u.unknown());
  }
  function c_() {
    var u = Q0, i = Q0, r = zr, c, o, y, v = jn, m, g, h;
    function p() {
      var M = Math.min(u.length, i.length);
      return v !== jn && (v = u_(u[0], u[M - 1])), m = M > 2 ? i_ : a_, g = h = null, x;
    }
    function x(M) {
      return M == null || isNaN(M = +M) ? y : (g || (g = m(u.map(c), i, r)))(c(v(M)));
    }
    return x.invert = function(M) {
      return v(o((h || (h = m(i, u.map(c), Dl)))(M)));
    }, x.domain = function(M) {
      return arguments.length ? (u = Array.from(M, n_), p()) : u.slice();
    }, x.range = function(M) {
      return arguments.length ? (i = Array.from(M), p()) : i.slice();
    }, x.rangeRound = function(M) {
      return i = Array.from(M), r = Tg, p();
    }, x.clamp = function(M) {
      return arguments.length ? (v = M ? !0 : jn, p()) : v !== jn;
    }, x.interpolate = function(M) {
      return arguments.length ? (r = M, p()) : r;
    }, x.unknown = function(M) {
      return arguments.length ? (y = M, x) : y;
    }, function(M, R) {
      return c = M, o = R, p();
    };
  }
  function r_() {
    return c_()(jn, jn);
  }
  function s_(u, i, r, c) {
    var o = _1(u, i, r), y;
    switch (c = Ci(c ?? ",f"), c.type) {
      case "s": {
        var v = Math.max(Math.abs(u), Math.abs(i));
        return c.precision == null && !isNaN(y = t_(o, v)) && (c.precision = y), Od(c, v);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        c.precision == null && !isNaN(y = l_(o, Math.max(Math.abs(u), Math.abs(i)))) && (c.precision = y - (c.type === "e"));
        break;
      }
      case "f":
      case "%": {
        c.precision == null && !isNaN(y = I2(o)) && (c.precision = y - (c.type === "%") * 2);
        break;
      }
    }
    return zd(c);
  }
  function o_(u) {
    var i = u.domain;
    return u.ticks = function(r) {
      var c = i();
      return g1(c[0], c[c.length - 1], r ?? 10);
    }, u.tickFormat = function(r, c) {
      var o = i();
      return s_(o[0], o[o.length - 1], r ?? 10, c);
    }, u.nice = function(r) {
      r == null && (r = 10);
      var c = i(), o = 0, y = c.length - 1, v = c[o], m = c[y], g, h, p = 10;
      for (m < v && (h = v, v = m, m = h, h = o, o = y, y = h); p-- > 0; ) {
        if (h = or(v, m, r), h === g)
          return c[o] = v, c[y] = m, i(c);
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
  function Nd() {
    var u = r_();
    return u.copy = function() {
      return f_(u, Nd());
    }, Dd.apply(u, arguments), o_(u);
  }
  function h_(u) {
    for (var i = u.length / 6 | 0, r = new Array(i), c = 0; c < i; ) r[c] = "#" + u.slice(c * 6, ++c * 6);
    return r;
  }
  const Ud = h_("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
  function Ne(u) {
    return function() {
      return u;
    };
  }
  const Z0 = Math.abs, Wt = Math.atan2, tn = Math.cos, d_ = Math.max, nr = Math.min, Xl = Math.sin, Vn = Math.sqrt, nl = 1e-12, ea = Math.PI, Xi = ea / 2, y_ = 2 * ea;
  function v_(u) {
    return u > 1 ? 0 : u < -1 ? ea : Math.acos(u);
  }
  function j0(u) {
    return u >= 1 ? Xi : u <= -1 ? -Xi : Math.asin(u);
  }
  function m_(u) {
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
    }, () => new V2(i);
  }
  function g_(u) {
    return u.innerRadius;
  }
  function __(u) {
    return u.outerRadius;
  }
  function p_(u) {
    return u.startAngle;
  }
  function S_(u) {
    return u.endAngle;
  }
  function b_(u) {
    return u && u.padAngle;
  }
  function A_(u, i, r, c, o, y, v, m) {
    var g = r - u, h = c - i, p = v - o, x = m - y, M = x * g - p * h;
    if (!(M * M < nl))
      return M = (p * (i - y) - x * (u - o)) / M, [u + M * g, i + M * h];
  }
  function Ei(u, i, r, c, o, y, v) {
    var m = u - r, g = i - c, h = (v ? y : -y) / Vn(m * m + g * g), p = h * g, x = -h * m, M = u + p, R = i + x, Z = r + p, K = c + x, at = (M + Z) / 2, nt = (R + K) / 2, F = Z - M, lt = K - R, ct = F * F + lt * lt, j = o - y, ot = M * K - Z * R, Ot = (lt < 0 ? -1 : 1) * Vn(d_(0, j * j * ct - ot * ot)), pt = (ot * lt - F * Ot) / ct, Y = (-ot * F - lt * Ot) / ct, I = (ot * lt + F * Ot) / ct, L = (-ot * F + lt * Ot) / ct, yt = pt - at, G = Y - nt, P = I - at, B = L - nt;
    return yt * yt + G * G > P * P + B * B && (pt = I, Y = L), {
      cx: pt,
      cy: Y,
      x01: -p,
      y01: -x,
      x11: pt * (o / j - 1),
      y11: Y * (o / j - 1)
    };
  }
  function Ju() {
    var u = g_, i = __, r = Ne(0), c = null, o = p_, y = S_, v = b_, m = null, g = m_(h);
    function h() {
      var p, x, M = +u.apply(this, arguments), R = +i.apply(this, arguments), Z = o.apply(this, arguments) - Xi, K = y.apply(this, arguments) - Xi, at = Z0(K - Z), nt = K > Z;
      if (m || (m = p = g()), R < M && (x = R, R = M, M = x), !(R > nl)) m.moveTo(0, 0);
      else if (at > y_ - nl)
        m.moveTo(R * tn(Z), R * Xl(Z)), m.arc(0, 0, R, Z, K, !nt), M > nl && (m.moveTo(M * tn(K), M * Xl(K)), m.arc(0, 0, M, K, Z, nt));
      else {
        var F = Z, lt = K, ct = Z, j = K, ot = at, Ot = at, pt = v.apply(this, arguments) / 2, Y = pt > nl && (c ? +c.apply(this, arguments) : Vn(M * M + R * R)), I = nr(Z0(R - M) / 2, +r.apply(this, arguments)), L = I, yt = I, G, P;
        if (Y > nl) {
          var B = j0(Y / M * Xl(pt)), H = j0(Y / R * Xl(pt));
          (ot -= B * 2) > nl ? (B *= nt ? 1 : -1, ct += B, j -= B) : (ot = 0, ct = j = (Z + K) / 2), (Ot -= H * 2) > nl ? (H *= nt ? 1 : -1, F += H, lt -= H) : (Ot = 0, F = lt = (Z + K) / 2);
        }
        var X = R * tn(F), Q = R * Xl(F), ut = M * tn(j), S = M * Xl(j);
        if (I > nl) {
          var q = R * tn(lt), J = R * Xl(lt), N = M * tn(ct), C = M * Xl(ct), W;
          if (at < ea)
            if (W = A_(X, Q, N, C, q, J, ut, S)) {
              var et = X - W[0], wt = Q - W[1], vt = q - W[0], zt = J - W[1], Et = 1 / Xl(v_((et * vt + wt * zt) / (Vn(et * et + wt * wt) * Vn(vt * vt + zt * zt))) / 2), al = Vn(W[0] * W[0] + W[1] * W[1]);
              L = nr(I, (M - al) / (Et - 1)), yt = nr(I, (R - al) / (Et + 1));
            } else
              L = yt = 0;
        }
        Ot > nl ? yt > nl ? (G = Ei(N, C, X, Q, R, yt, nt), P = Ei(q, J, ut, S, R, yt, nt), m.moveTo(G.cx + G.x01, G.cy + G.y01), yt < I ? m.arc(G.cx, G.cy, yt, Wt(G.y01, G.x01), Wt(P.y01, P.x01), !nt) : (m.arc(G.cx, G.cy, yt, Wt(G.y01, G.x01), Wt(G.y11, G.x11), !nt), m.arc(0, 0, R, Wt(G.cy + G.y11, G.cx + G.x11), Wt(P.cy + P.y11, P.cx + P.x11), !nt), m.arc(P.cx, P.cy, yt, Wt(P.y11, P.x11), Wt(P.y01, P.x01), !nt))) : (m.moveTo(X, Q), m.arc(0, 0, R, F, lt, !nt)) : m.moveTo(X, Q), !(M > nl) || !(ot > nl) ? m.lineTo(ut, S) : L > nl ? (G = Ei(ut, S, q, J, M, -L, nt), P = Ei(X, Q, N, C, M, -L, nt), m.lineTo(G.cx + G.x01, G.cy + G.y01), L < I ? m.arc(G.cx, G.cy, L, Wt(G.y01, G.x01), Wt(P.y01, P.x01), !nt) : (m.arc(G.cx, G.cy, L, Wt(G.y01, G.x01), Wt(G.y11, G.x11), !nt), m.arc(0, 0, M, Wt(G.cy + G.y11, G.cx + G.x11), Wt(P.cy + P.y11, P.cx + P.x11), nt), m.arc(P.cx, P.cy, L, Wt(P.y11, P.x11), Wt(P.y01, P.x01), !nt))) : m.arc(0, 0, M, j, ct, nt);
      }
      if (m.closePath(), p) return m = null, p + "" || null;
    }
    return h.centroid = function() {
      var p = (+u.apply(this, arguments) + +i.apply(this, arguments)) / 2, x = (+o.apply(this, arguments) + +y.apply(this, arguments)) / 2 - ea / 2;
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
      return arguments.length ? (y = typeof p == "function" ? p : Ne(+p), h) : y;
    }, h.padAngle = function(p) {
      return arguments.length ? (v = typeof p == "function" ? p : Ne(+p), h) : v;
    }, h.context = function(p) {
      return arguments.length ? (m = p ?? null, h) : m;
    }, h;
  }
  function Pu(u, i, r) {
    this.k = u, this.x = i, this.y = r;
  }
  Pu.prototype = {
    constructor: Pu,
    scale: function(u) {
      return u === 1 ? this : new Pu(this.k * u, this.x, this.y);
    },
    translate: function(u, i) {
      return u === 0 & i === 0 ? this : new Pu(this.k, this.x + this.k * u, this.y + this.k * i);
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
  Pu.prototype;
  const ur = Math.PI * 2;
  function E_(u, i = Ud) {
    return Rd().domain(u).range(i).unknown("#ccc");
  }
  const x_ = (u) => (i) => {
    const r = u[i], c = Math.sin(r), o = -Math.cos(r);
    return { x: c, y: o };
  }, T_ = (u) => (i) => {
    const r = +u[i], c = Math.sin(r), o = -Math.cos(r);
    return { x: c, y: o };
  };
  function M_({
    data: u,
    width: i,
    height: r,
    innerRadius: c = 90,
    outerPadding: o = 140,
    categoryPadding: y = 0.1,
    skillPadding: v = 0.05,
    arcPercent: m = 0.8,
    arcStartOffset: g = 0.1,
    categoryFocus: h
  }) {
    const p = Math.min(i, r) / 2 - o, x = p1(u, (B) => B.skill_level) ?? 0, M = Array.from({ length: x }, (B, H) => H + 1), R = h1(u, (B) => B.category), K = [...S1(u.map((B) => B.category)).keys()].sort(), at = h ? [h] : K, nt = u.filter(
      (B) => at.includes(B.category)
    ), F = ur * m, lt = nt.length, ct = (F - y * (at.length - 1) - v * lt) / lt, ot = at.reduce(
      (B, H) => {
        var X, Q;
        return [
          ...B,
          B[B.length - 1] + ((((X = R.get(H)) == null ? void 0 : X.length) ?? 0) * ct + (((Q = R.get(H)) == null ? void 0 : Q.length) ?? 0) * v + y)
        ];
      },
      [ur * g]
    ).slice(0, -1).reduce((B, H, X) => ({ ...B, [at[X]]: H }), {}), Ot = nt.reduce(
      (B, H) => {
        var X, Q;
        return {
          ...B,
          [`${H.category}-${H.skill}`]: ot[H.category] + v + (((X = R.get(H.category)) == null ? void 0 : X.findIndex((ut) => ut.skill == H.skill)) ?? 0) * ct + (((Q = R.get(H.category)) == null ? void 0 : Q.findIndex((ut) => ut.skill == H.skill)) ?? 0) * v
        };
      },
      {}
    ), pt = (B) => Ot[`${B.category}-${B.skill}`], Y = Nd().domain([0, x]).range([c, p]), I = Ju().startAngle((B) => pt(B)).endAngle((B) => pt(B) + ct).innerRadius(c + 1).outerRadius((B) => Y(B.skill_level)), L = Ju().startAngle((B) => pt(B)).endAngle((B) => pt(B) + ct).innerRadius(c + 1).outerRadius(p - 1), yt = Ju().startAngle((B) => pt(B)).endAngle((B) => pt(B) + ct).innerRadius((B, H) => Y(H - 1) + 1).outerRadius((B, H) => Y(H + 0) - 1).padRadius(-1).padAngle(0.01), G = Ju().innerRadius(c + 5).outerRadius(c).startAngle((B) => ot[B]).endAngle(
      (B) => {
        var H, X;
        return ot[B] + ct * (((H = R.get(B)) == null ? void 0 : H.length) ?? 0) + (((X = R.get(B)) == null ? void 0 : X.length) ?? 0) * v;
      }
    ), P = Ju().innerRadius((B) => Y(B) - 0.5).outerRadius((B) => Y(B) + 0).startAngle(0).endAngle(F + (ur - F) / 2);
    return {
      sortedCategories: K,
      filteredCategories: at,
      groupedByCategory: R,
      catAnnotationPointInner: x_(ot),
      catAnnotationPointOuter: T_(ot),
      barArc: I,
      barFullHeightArc: L,
      barSegmentArc: yt,
      categoryBaseArc: G,
      lvlRing: P,
      lvlsArray: M,
      outerRadius: p,
      innerRadius: c,
      getYPoint: Y
    };
  }
  function z_({
    data: u,
    width: i = 640,
    height: r = void 0,
    innerRadius: c = 80,
    outerPadding: o = 100,
    categoryPadding: y = 0.1,
    skillPadding: v = 0.05,
    arcPercent: m = 0.8,
    arcStartOffset: g = 0.1,
    annotationPadding: h = 10,
    lineThickness: p = 2,
    labelTextColor: x = "black",
    lvlTextColor: M = "#ccc",
    lvlArcColor: R = "#444",
    colourList: Z = Ud
  }) {
    const K = r ?? i * 0.8, [at, nt] = Oi.useState(!1), [F, lt] = Oi.useState(
      !1
    ), ct = (N) => {
      nt(
        (C) => C === N ? !1 : N
      );
    }, {
      sortedCategories: j,
      filteredCategories: ot,
      groupedByCategory: Ot,
      catAnnotationPointInner: pt,
      catAnnotationPointOuter: Y,
      barFullHeightArc: I,
      barSegmentArc: L,
      categoryBaseArc: yt,
      lvlRing: G,
      lvlsArray: P,
      outerRadius: B,
      getYPoint: H
    } = M_({
      data: u,
      width: i,
      height: K,
      innerRadius: c,
      outerPadding: o,
      categoryPadding: y,
      skillPadding: v,
      arcPercent: m,
      arcStartOffset: g,
      categoryFocus: at
    }), X = j ? E_(j, Z) : () => "black", Q = (N, C) => /* @__PURE__ */ St.jsx("g", { fill: X(N), className: "Bars", children: C.map((W) => /* @__PURE__ */ St.jsxs(
      "g",
      {
        className: "bar-group",
        onClick: () => ct(N),
        onKeyDown: (et) => {
          et.key === "Enter" && ct(N);
        },
        onMouseOver: () => lt(W),
        onMouseOut: () => lt(!1),
        onFocus: () => lt(W),
        onBlur: () => lt(!1),
        children: [
          /* @__PURE__ */ St.jsx(
            "path",
            {
              d: I(W),
              tabIndex: 0,
              className: "bar",
              fillOpacity: 1e-4
            }
          ),
          /* @__PURE__ */ St.jsx(
            "path",
            {
              d: I(W),
              className: "bar-outline",
              fill: "none",
              stroke: X(N),
              strokeOpacity: 0
            }
          ),
          Array.from({ length: W.skill_level }, (et, wt) => wt + 1).map((et) => /* @__PURE__ */ St.jsx(
            "path",
            {
              d: L(W, et),
              fill: X(N),
              className: "bar-segment"
            },
            `bar-segment${N}-${W.skill}-${et}`
          ))
        ]
      },
      `bar ${N}-${W.skill}`
    )) }, N), ut = (N) => /* @__PURE__ */ St.jsx("g", { children: P.map((C) => /* @__PURE__ */ St.jsx(
      "path",
      {
        d: G(C),
        fill: R,
        stroke: "none",
        strokeWidth: 1
      },
      `${N}-${C}`
    )) }, N), S = (N) => N.length * 10, q = (N) => /* @__PURE__ */ St.jsxs("g", { fill: X(N), children: [
      /* @__PURE__ */ St.jsx(
        "path",
        {
          d: yt(N),
          fill: X(N),
          stroke: "none",
          strokeWidth: p
        }
      ),
      /* @__PURE__ */ St.jsx(
        "line",
        {
          x1: pt(N).x * c,
          y1: pt(N).y * c,
          x2: Y(N).x * (B + h),
          y2: Y(N).y * (B + h),
          stroke: X(N),
          fill: "none",
          strokeWidth: p,
          opacity: 1
        }
      ),
      /* @__PURE__ */ St.jsx(
        "line",
        {
          x1: Y(N).x * (B + h),
          y1: Y(N).y * (B + h),
          x2: Y(N).x * (B + h) + (Y(N).x > 0 ? S(N) : -S(N)),
          y2: Y(N).y * (B + h),
          stroke: X(N),
          fill: "none",
          strokeWidth: p
        }
      ),
      /* @__PURE__ */ St.jsx(
        "rect",
        {
          x: (Y(N).x > 0 ? 0 : -S(N)) + Y(N).x * (B + h),
          y: Y(N).y * (B + h) - (Y(N).y > 0 ? 0 : 30),
          width: S(N),
          height: 30,
          fill: X(N)
        }
      ),
      /* @__PURE__ */ St.jsx(
        "text",
        {
          x: Y(N).x * (B + h) + (Y(N).x > 0 ? S(N) / 2 : -S(N) / 2),
          y: Y(N).y * (B + h) + (Y(N).y > 0 ? 20 : -10),
          fill: x,
          fontWeight: 700,
          textAnchor: "middle",
          children: N
        }
      ),
      P.map((C) => /* @__PURE__ */ St.jsx(
        "text",
        {
          x: 0,
          y: -H(C - 0.1),
          fill: M,
          textAnchor: "middle",
          fontSize: 10,
          children: C
        },
        `annotation lvl ${N}-${C}`
      ))
    ] }, `annotation ${N}`), J = () => F ? /* @__PURE__ */ St.jsxs("g", { children: [
      /* @__PURE__ */ St.jsx(
        "circle",
        {
          cx: 0,
          cy: 0,
          r: c - 10,
          fill: X(F.category)
        }
      ),
      /* @__PURE__ */ St.jsx("text", { y: "-5", textAnchor: "middle", children: F.category }),
      /* @__PURE__ */ St.jsx("text", { y: "15", textAnchor: "middle", children: F.skill }),
      /* @__PURE__ */ St.jsx("text", { y: "35", textAnchor: "middle", children: F.skill_level })
    ] }) : null;
    return /* @__PURE__ */ St.jsxs(
      "svg",
      {
        width: i,
        height: K,
        viewBox: `${-i / 2} ${-K / 2} ${i} ${K}`,
        children: [
          /* @__PURE__ */ St.jsx("g", { children: ot.map((N) => ut(N)) }),
          /* @__PURE__ */ St.jsx("g", { children: ot.map(
            (N) => Q(N, Ot.get(N) ?? [])
          ) }),
          /* @__PURE__ */ St.jsx("g", { children: ot.map((N) => q(N)) }),
          /* @__PURE__ */ St.jsx("g", { children: J() })
        ]
      }
    );
  }
  var ar = { exports: {} }, ku = {}, ir = { exports: {} }, fr = {};
  /**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var V0;
  function O_() {
    return V0 || (V0 = 1, function(u) {
      function i(H, X) {
        var Q = H.length;
        H.push(X);
        t: for (; 0 < Q; ) {
          var ut = Q - 1 >>> 1, S = H[ut];
          if (0 < o(S, X))
            H[ut] = X, H[Q] = S, Q = ut;
          else break t;
        }
      }
      function r(H) {
        return H.length === 0 ? null : H[0];
      }
      function c(H) {
        if (H.length === 0) return null;
        var X = H[0], Q = H.pop();
        if (Q !== X) {
          H[0] = Q;
          t: for (var ut = 0, S = H.length, q = S >>> 1; ut < q; ) {
            var J = 2 * (ut + 1) - 1, N = H[J], C = J + 1, W = H[C];
            if (0 > o(N, Q))
              C < S && 0 > o(W, N) ? (H[ut] = W, H[C] = Q, ut = C) : (H[ut] = N, H[J] = Q, ut = J);
            else if (C < S && 0 > o(W, Q))
              H[ut] = W, H[C] = Q, ut = C;
            else break t;
          }
        }
        return X;
      }
      function o(H, X) {
        var Q = H.sortIndex - X.sortIndex;
        return Q !== 0 ? Q : H.id - X.id;
      }
      if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var y = performance;
        u.unstable_now = function() {
          return y.now();
        };
      } else {
        var v = Date, m = v.now();
        u.unstable_now = function() {
          return v.now() - m;
        };
      }
      var g = [], h = [], p = 1, x = null, M = 3, R = !1, Z = !1, K = !1, at = typeof setTimeout == "function" ? setTimeout : null, nt = typeof clearTimeout == "function" ? clearTimeout : null, F = typeof setImmediate < "u" ? setImmediate : null;
      function lt(H) {
        for (var X = r(h); X !== null; ) {
          if (X.callback === null) c(h);
          else if (X.startTime <= H)
            c(h), X.sortIndex = X.expirationTime, i(g, X);
          else break;
          X = r(h);
        }
      }
      function ct(H) {
        if (K = !1, lt(H), !Z)
          if (r(g) !== null)
            Z = !0, P();
          else {
            var X = r(h);
            X !== null && B(ct, X.startTime - H);
          }
      }
      var j = !1, ot = -1, Ot = 5, pt = -1;
      function Y() {
        return !(u.unstable_now() - pt < Ot);
      }
      function I() {
        if (j) {
          var H = u.unstable_now();
          pt = H;
          var X = !0;
          try {
            t: {
              Z = !1, K && (K = !1, nt(ot), ot = -1), R = !0;
              var Q = M;
              try {
                l: {
                  for (lt(H), x = r(g); x !== null && !(x.expirationTime > H && Y()); ) {
                    var ut = x.callback;
                    if (typeof ut == "function") {
                      x.callback = null, M = x.priorityLevel;
                      var S = ut(
                        x.expirationTime <= H
                      );
                      if (H = u.unstable_now(), typeof S == "function") {
                        x.callback = S, lt(H), X = !0;
                        break l;
                      }
                      x === r(g) && c(g), lt(H);
                    } else c(g);
                    x = r(g);
                  }
                  if (x !== null) X = !0;
                  else {
                    var q = r(h);
                    q !== null && B(
                      ct,
                      q.startTime - H
                    ), X = !1;
                  }
                }
                break t;
              } finally {
                x = null, M = Q, R = !1;
              }
              X = void 0;
            }
          } finally {
            X ? L() : j = !1;
          }
        }
      }
      var L;
      if (typeof F == "function")
        L = function() {
          F(I);
        };
      else if (typeof MessageChannel < "u") {
        var yt = new MessageChannel(), G = yt.port2;
        yt.port1.onmessage = I, L = function() {
          G.postMessage(null);
        };
      } else
        L = function() {
          at(I, 0);
        };
      function P() {
        j || (j = !0, L());
      }
      function B(H, X) {
        ot = at(function() {
          H(u.unstable_now());
        }, X);
      }
      u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(H) {
        H.callback = null;
      }, u.unstable_continueExecution = function() {
        Z || R || (Z = !0, P());
      }, u.unstable_forceFrameRate = function(H) {
        0 > H || 125 < H ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : Ot = 0 < H ? Math.floor(1e3 / H) : 5;
      }, u.unstable_getCurrentPriorityLevel = function() {
        return M;
      }, u.unstable_getFirstCallbackNode = function() {
        return r(g);
      }, u.unstable_next = function(H) {
        switch (M) {
          case 1:
          case 2:
          case 3:
            var X = 3;
            break;
          default:
            X = M;
        }
        var Q = M;
        M = X;
        try {
          return H();
        } finally {
          M = Q;
        }
      }, u.unstable_pauseExecution = function() {
      }, u.unstable_requestPaint = function() {
      }, u.unstable_runWithPriority = function(H, X) {
        switch (H) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            H = 3;
        }
        var Q = M;
        M = H;
        try {
          return X();
        } finally {
          M = Q;
        }
      }, u.unstable_scheduleCallback = function(H, X, Q) {
        var ut = u.unstable_now();
        switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? ut + Q : ut) : Q = ut, H) {
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
        return S = Q + S, H = {
          id: p++,
          callback: X,
          priorityLevel: H,
          startTime: Q,
          expirationTime: S,
          sortIndex: -1
        }, Q > ut ? (H.sortIndex = Q, i(h, H), r(g) === null && H === r(h) && (K ? (nt(ot), ot = -1) : K = !0, B(ct, Q - ut))) : (H.sortIndex = S, i(g, H), Z || R || (Z = !0, P())), H;
      }, u.unstable_shouldYield = Y, u.unstable_wrapCallback = function(H) {
        var X = M;
        return function() {
          var Q = M;
          M = X;
          try {
            return H.apply(this, arguments);
          } finally {
            M = Q;
          }
        };
      };
    }(fr)), fr;
  }
  var L0;
  function D_() {
    return L0 || (L0 = 1, ir.exports = O_()), ir.exports;
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
  var K0;
  function R_() {
    if (K0) return Ft;
    K0 = 1;
    var u = Ar();
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
    function y(g, h, p) {
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
      return y(g, h, null, p);
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
        var p = h.as, x = m(p, h.crossOrigin), M = typeof h.integrity == "string" ? h.integrity : void 0, R = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        p === "style" ? c.d.S(
          g,
          typeof h.precedence == "string" ? h.precedence : void 0,
          {
            crossOrigin: x,
            integrity: M,
            fetchPriority: R
          }
        ) : p === "script" && c.d.X(g, {
          crossOrigin: x,
          integrity: M,
          fetchPriority: R,
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
  var $0;
  function N_() {
    if ($0) return cr.exports;
    $0 = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
        } catch (i) {
          console.error(i);
        }
    }
    return u(), cr.exports = R_(), cr.exports;
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
  var J0;
  function U_() {
    if (J0) return ku;
    J0 = 1;
    var u = D_(), i = Ar(), r = N_();
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
    var y = Symbol.for("react.element"), v = Symbol.for("react.transitional.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), M = Symbol.for("react.consumer"), R = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), at = Symbol.for("react.suspense_list"), nt = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), lt = Symbol.for("react.offscreen"), ct = Symbol.for("react.memo_cache_sentinel"), j = Symbol.iterator;
    function ot(t) {
      return t === null || typeof t != "object" ? null : (t = j && t[j] || t["@@iterator"], typeof t == "function" ? t : null);
    }
    var Ot = Symbol.for("react.client.reference");
    function pt(t) {
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
        case at:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case R:
            return (t.displayName || "Context") + ".Provider";
          case M:
            return (t._context.displayName || "Context") + ".Consumer";
          case Z:
            var l = t.render;
            return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case nt:
            return l = t.displayName || null, l !== null ? l : pt(t.type) || "Memo";
          case F:
            l = t._payload, t = t._init;
            try {
              return pt(t(l));
            } catch {
            }
        }
      return null;
    }
    var Y = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = Object.assign, L, yt;
    function G(t) {
      if (L === void 0)
        try {
          throw Error();
        } catch (e) {
          var l = e.stack.trim().match(/\n( *(at )?)/);
          L = l && l[1] || "", yt = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + L + t + yt;
    }
    var P = !1;
    function B(t, l) {
      if (!t || P) return "";
      P = !0;
      var e = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var n = {
          DetermineComponentFrameRoot: function() {
            try {
              if (l) {
                var w = function() {
                  throw Error();
                };
                if (Object.defineProperty(w.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(w, []);
                  } catch (O) {
                    var z = O;
                  }
                  Reflect.construct(t, [], w);
                } else {
                  try {
                    w.call();
                  } catch (O) {
                    z = O;
                  }
                  t.call(w.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (O) {
                  z = O;
                }
                (w = t()) && typeof w.catch == "function" && w.catch(function() {
                });
              }
            } catch (O) {
              if (O && z && typeof O.stack == "string")
                return [O.stack, z.stack];
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
        var f = n.DetermineComponentFrameRoot(), s = f[0], d = f[1];
        if (s && d) {
          var _ = s.split(`
`), A = d.split(`
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
                    var D = `
` + _[n].replace(" at new ", " at ");
                    return t.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", t.displayName)), D;
                  }
                while (1 <= n && 0 <= a);
              break;
            }
        }
      } finally {
        P = !1, Error.prepareStackTrace = e;
      }
      return (e = t ? t.displayName || t.name : "") ? G(e) : "";
    }
    function H(t) {
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
          return t = B(t.type, !1), t;
        case 11:
          return t = B(t.type.render, !1), t;
        case 1:
          return t = B(t.type, !0), t;
        default:
          return "";
      }
    }
    function X(t) {
      try {
        var l = "";
        do
          l += H(t), t = t.return;
        while (t);
        return l;
      } catch (e) {
        return `
Error generating stack: ` + e.message + `
` + e.stack;
      }
    }
    function Q(t) {
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
      if (Q(t) !== t)
        throw Error(c(188));
    }
    function q(t) {
      var l = t.alternate;
      if (!l) {
        if (l = Q(t), l === null) throw Error(c(188));
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
          for (var s = !1, d = a.child; d; ) {
            if (d === e) {
              s = !0, e = a, n = f;
              break;
            }
            if (d === n) {
              s = !0, n = a, e = f;
              break;
            }
            d = d.sibling;
          }
          if (!s) {
            for (d = f.child; d; ) {
              if (d === e) {
                s = !0, e = f, n = a;
                break;
              }
              if (d === n) {
                s = !0, n = f, e = a;
                break;
              }
              d = d.sibling;
            }
            if (!s) throw Error(c(189));
          }
        }
        if (e.alternate !== n) throw Error(c(190));
      }
      if (e.tag !== 3) throw Error(c(188));
      return e.stateNode.current === e ? t : l;
    }
    function J(t) {
      var l = t.tag;
      if (l === 5 || l === 26 || l === 27 || l === 6) return t;
      for (t = t.child; t !== null; ) {
        if (l = J(t), l !== null) return l;
        t = t.sibling;
      }
      return null;
    }
    var N = Array.isArray, C = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = {
      pending: !1,
      data: null,
      method: null,
      action: null
    }, et = [], wt = -1;
    function vt(t) {
      return { current: t };
    }
    function zt(t) {
      0 > wt || (t.current = et[wt], et[wt] = null, wt--);
    }
    function Et(t, l) {
      wt++, et[wt] = t.current, t.current = l;
    }
    var al = vt(null), kn = vt(null), fe = vt(null), aa = vt(null);
    function ia(t, l) {
      switch (Et(fe, l), Et(kn, t), Et(al, null), t = l.nodeType, t) {
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
      zt(al), Et(al, l);
    }
    function fn() {
      zt(al), zt(kn), zt(fe);
    }
    function ji(t) {
      t.memoizedState !== null && Et(aa, t);
      var l = al.current, e = Lh(l, t.type);
      l !== e && (Et(kn, t), Et(al, e));
    }
    function fa(t) {
      kn.current === t && (zt(al), zt(kn)), aa.current === t && (zt(aa), Qu._currentValue = W);
    }
    var Vi = Object.prototype.hasOwnProperty, Li = u.unstable_scheduleCallback, Ki = u.unstable_cancelCallback, wd = u.unstable_shouldYield, qd = u.unstable_requestPaint, Hl = u.unstable_now, Yd = u.unstable_getCurrentPriorityLevel, Ur = u.unstable_ImmediatePriority, Hr = u.unstable_UserBlockingPriority, ca = u.unstable_NormalPriority, Bd = u.unstable_LowPriority, wr = u.unstable_IdlePriority, Cd = u.log, Xd = u.unstable_setDisableYieldValue, Wn = null, il = null;
    function Gd(t) {
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
      if (typeof Cd == "function" && Xd(t), il && typeof il.setStrictMode == "function")
        try {
          il.setStrictMode(Wn, t);
        } catch {
        }
    }
    var fl = Math.clz32 ? Math.clz32 : jd, Qd = Math.log, Zd = Math.LN2;
    function jd(t) {
      return t >>>= 0, t === 0 ? 32 : 31 - (Qd(t) / Zd | 0) | 0;
    }
    var ra = 128, sa = 4194304;
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
    function oa(t, l) {
      var e = t.pendingLanes;
      if (e === 0) return 0;
      var n = 0, a = t.suspendedLanes, f = t.pingedLanes, s = t.warmLanes;
      t = t.finishedLanes !== 0;
      var d = e & 134217727;
      return d !== 0 ? (e = d & ~a, e !== 0 ? n = Ue(e) : (f &= d, f !== 0 ? n = Ue(f) : t || (s = d & ~s, s !== 0 && (n = Ue(s))))) : (d = e & ~a, d !== 0 ? n = Ue(d) : f !== 0 ? n = Ue(f) : t || (s = e & ~s, s !== 0 && (n = Ue(s)))), n === 0 ? 0 : l !== 0 && l !== n && (l & a) === 0 && (a = n & -n, s = l & -l, a >= s || a === 32 && (s & 4194176) !== 0) ? l : n;
    }
    function Fn(t, l) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
    }
    function Vd(t, l) {
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
      var t = ra;
      return ra <<= 1, (ra & 4194176) === 0 && (ra = 128), t;
    }
    function Yr() {
      var t = sa;
      return sa <<= 1, (sa & 62914560) === 0 && (sa = 4194304), t;
    }
    function $i(t) {
      for (var l = [], e = 0; 31 > e; e++) l.push(t);
      return l;
    }
    function Pn(t, l) {
      t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
    }
    function Ld(t, l, e, n, a, f) {
      var s = t.pendingLanes;
      t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
      var d = t.entanglements, _ = t.expirationTimes, A = t.hiddenUpdates;
      for (e = s & ~e; 0 < e; ) {
        var D = 31 - fl(e), w = 1 << D;
        d[D] = 0, _[D] = -1;
        var z = A[D];
        if (z !== null)
          for (A[D] = null, D = 0; D < z.length; D++) {
            var O = z[D];
            O !== null && (O.lane &= -536870913);
          }
        e &= ~w;
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
      var t = C.p;
      return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : r0(t.type));
    }
    function Kd(t, l) {
      var e = C.p;
      try {
        return C.p = t, l();
      } finally {
        C.p = e;
      }
    }
    var re = Math.random().toString(36).slice(2), Jt = "__reactFiber$" + re, tl = "__reactProps$" + re, cn = "__reactContainer$" + re, Ji = "__reactEvents$" + re, $d = "__reactListeners$" + re, Jd = "__reactHandles$" + re, Qr = "__reactResources$" + re, In = "__reactMarker$" + re;
    function ki(t) {
      delete t[Jt], delete t[tl], delete t[Ji], delete t[$d], delete t[Jd];
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
    var Zl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), kd = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Vr = {}, Lr = {};
    function Wd(t) {
      return Vi.call(Lr, t) ? !0 : Vi.call(Vr, t) ? !1 : kd.test(t) ? Lr[t] = !0 : (Vr[t] = !0, !1);
    }
    function ha(t, l, e) {
      if (Wd(l))
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
    function da(t, l, e) {
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
    function Fd(t) {
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
    function ya(t) {
      t._valueTracker || (t._valueTracker = Fd(t));
    }
    function $r(t) {
      if (!t) return !1;
      var l = t._valueTracker;
      if (!l) return !0;
      var e = l.getValue(), n = "";
      return t && (n = Kr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== e ? (l.setValue(t), !0) : !1;
    }
    function va(t) {
      if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    var Pd = /[\n"\\]/g;
    function yl(t) {
      return t.replace(
        Pd,
        function(l) {
          return "\\" + l.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function Wi(t, l, e, n, a, f, s, d) {
      t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), l != null ? s === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + dl(l)) : t.value !== "" + dl(l) && (t.value = "" + dl(l)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), l != null ? Fi(t, s, dl(l)) : e != null ? Fi(t, s, dl(e)) : n != null && t.removeAttribute("value"), a == null && f != null && (t.defaultChecked = !!f), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? t.name = "" + dl(d) : t.removeAttribute("name");
    }
    function Jr(t, l, e, n, a, f, s, d) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (t.type = f), l != null || e != null) {
        if (!(f !== "submit" && f !== "reset" || l != null))
          return;
        e = e != null ? "" + dl(e) : "", l = l != null ? "" + dl(l) : e, d || l === t.value || (t.value = l), t.defaultValue = l;
      }
      n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = d ? t.checked : !!n, t.defaultChecked = !!n, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s);
    }
    function Fi(t, l, e) {
      l === "number" && va(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
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
          if (N(n)) {
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
    var Id = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    function Fr(t, l, e) {
      var n = l.indexOf("--") === 0;
      e == null || typeof e == "boolean" || e === "" ? n ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : n ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Id.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
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
    var ty = /* @__PURE__ */ new Map([
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
    ]), ly = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function ma(t) {
      return ly.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
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
        if (lf = !1, (yn !== null || vn !== null) && (Ia(), yn && (l = yn, t = vn, vn = yn = null, Ir(l), t)))
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
    var se = null, nf = null, ga = null;
    function ls() {
      if (ga) return ga;
      var t, l = nf, e = l.length, n, a = "value" in se ? se.value : se.textContent, f = a.length;
      for (t = 0; t < e && l[t] === a[t]; t++) ;
      var s = e - t;
      for (n = 1; n <= s && l[e - n] === a[f - n]; n++) ;
      return ga = a.slice(t, 1 < n ? 1 - n : void 0);
    }
    function _a(t) {
      var l = t.keyCode;
      return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
    }
    function pa() {
      return !0;
    }
    function es() {
      return !1;
    }
    function ll(t) {
      function l(e, n, a, f, s) {
        this._reactName = e, this._targetInst = a, this.type = n, this.nativeEvent = f, this.target = s, this.currentTarget = null;
        for (var d in t)
          t.hasOwnProperty(d) && (e = t[d], this[d] = e ? e(f) : f[d]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? pa : es, this.isPropagationStopped = es, this;
      }
      return I(l.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = pa);
        },
        stopPropagation: function() {
          var e = this.nativeEvent;
          e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = pa);
        },
        persist: function() {
        },
        isPersistent: pa
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
    }, Sa = ll(qe), nu = I({}, qe, { view: 0, detail: 0 }), ey = ll(nu), uf, af, uu, ba = I({}, nu, {
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
    }), ns = ll(ba), ny = I({}, ba, { dataTransfer: 0 }), uy = ll(ny), ay = I({}, nu, { relatedTarget: 0 }), ff = ll(ay), iy = I({}, qe, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), fy = ll(iy), cy = I({}, qe, {
      clipboardData: function(t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      }
    }), ry = ll(cy), sy = I({}, qe, { data: 0 }), us = ll(sy), oy = {
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
    }, hy = {
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
    }, dy = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function yy(t) {
      var l = this.nativeEvent;
      return l.getModifierState ? l.getModifierState(t) : (t = dy[t]) ? !!l[t] : !1;
    }
    function cf() {
      return yy;
    }
    var vy = I({}, nu, {
      key: function(t) {
        if (t.key) {
          var l = oy[t.key] || t.key;
          if (l !== "Unidentified") return l;
        }
        return t.type === "keypress" ? (t = _a(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? hy[t.keyCode] || "Unidentified" : "";
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
        return t.type === "keypress" ? _a(t) : 0;
      },
      keyCode: function(t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function(t) {
        return t.type === "keypress" ? _a(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      }
    }), my = ll(vy), gy = I({}, ba, {
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
    }), as = ll(gy), _y = I({}, nu, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: cf
    }), py = ll(_y), Sy = I({}, qe, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), by = ll(Sy), Ay = I({}, ba, {
      deltaX: function(t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function(t) {
        return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), Ey = ll(Ay), xy = I({}, qe, {
      newState: 0,
      oldState: 0
    }), Ty = ll(xy), My = [9, 13, 27, 32], rf = Zl && "CompositionEvent" in window, au = null;
    Zl && "documentMode" in document && (au = document.documentMode);
    var zy = Zl && "TextEvent" in window && !au, is = Zl && (!rf || au && 8 < au && 11 >= au), fs = " ", cs = !1;
    function rs(t, l) {
      switch (t) {
        case "keyup":
          return My.indexOf(l.keyCode) !== -1;
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
    function Oy(t, l) {
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
    function Dy(t, l) {
      if (mn)
        return t === "compositionend" || !rf && rs(t, l) ? (t = ls(), ga = nf = se = null, mn = !1, t) : null;
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
    var Ry = {
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
      return l === "input" ? !!Ry[t.type] : l === "textarea";
    }
    function hs(t, l, e, n) {
      yn ? vn ? vn.push(n) : vn = [n] : yn = n, l = ui(l, "onChange"), 0 < l.length && (e = new Sa(
        "onChange",
        "change",
        null,
        e,
        n
      ), t.push({ event: e, listeners: l }));
    }
    var iu = null, fu = null;
    function Ny(t) {
      Xh(t, 0);
    }
    function Aa(t) {
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
      if (t.propertyName === "value" && Aa(fu)) {
        var l = [];
        hs(
          l,
          fu,
          t,
          tf(t)
        ), ts(Ny, l);
      }
    }
    function Uy(t, l, e) {
      t === "focusin" ? (ms(), iu = l, fu = e, iu.attachEvent("onpropertychange", gs)) : t === "focusout" && ms();
    }
    function Hy(t) {
      if (t === "selectionchange" || t === "keyup" || t === "keydown")
        return Aa(fu);
    }
    function wy(t, l) {
      if (t === "click") return Aa(l);
    }
    function qy(t, l) {
      if (t === "input" || t === "change")
        return Aa(l);
    }
    function Yy(t, l) {
      return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
    }
    var cl = typeof Object.is == "function" ? Object.is : Yy;
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
      for (var l = va(t.document); l instanceof t.HTMLIFrameElement; ) {
        try {
          var e = typeof l.contentWindow.location.href == "string";
        } catch {
          e = !1;
        }
        if (e) t = l.contentWindow;
        else break;
        l = va(t.document);
      }
      return l;
    }
    function hf(t) {
      var l = t && t.nodeName && t.nodeName.toLowerCase();
      return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
    }
    function By(t, l) {
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
    var Cy = Zl && "documentMode" in document && 11 >= document.documentMode, gn = null, df = null, ru = null, yf = !1;
    function As(t, l, e) {
      var n = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
      yf || gn == null || gn !== va(n) || (n = gn, "selectionStart" in n && hf(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
        anchorNode: n.anchorNode,
        anchorOffset: n.anchorOffset,
        focusNode: n.focusNode,
        focusOffset: n.focusOffset
      }), ru && cu(ru, n) || (ru = n, n = ui(df, "onSelect"), 0 < n.length && (l = new Sa(
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
    var xs = Be("animationend"), Ts = Be("animationiteration"), Ms = Be("animationstart"), Xy = Be("transitionrun"), Gy = Be("transitionstart"), Qy = Be("transitioncancel"), zs = Be("transitionend"), Os = /* @__PURE__ */ new Map(), Ds = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
      " "
    );
    function Tl(t, l) {
      Os.set(t, l), we(l, [t]);
    }
    var vl = [], pn = 0, mf = 0;
    function Ea() {
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
    function xa(t, l, e, n) {
      vl[pn++] = t, vl[pn++] = l, vl[pn++] = e, vl[pn++] = n, mf |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
    }
    function gf(t, l, e, n) {
      return xa(t, l, e, n), Ta(t);
    }
    function oe(t, l) {
      return xa(t, null, null, l), Ta(t);
    }
    function Rs(t, l, e) {
      t.lanes |= e;
      var n = t.alternate;
      n !== null && (n.lanes |= e);
      for (var a = !1, f = t.return; f !== null; )
        f.childLanes |= e, n = f.alternate, n !== null && (n.childLanes |= e), f.tag === 22 && (t = f.stateNode, t === null || t._visibility & 1 || (a = !0)), t = f, f = f.return;
      a && l !== null && t.tag === 3 && (f = t.stateNode, a = 31 - fl(e), f = f.hiddenUpdates, t = f[a], t === null ? f[a] = [l] : t.push(l), l.lane = e | 536870912);
    }
    function Ta(t) {
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
          stack: X(l)
        }, Ns.set(t, l), l);
      }
      return {
        value: t,
        source: l,
        stack: X(l)
      };
    }
    var bn = [], An = 0, Ma = null, za = 0, gl = [], _l = 0, Ce = null, Vl = 1, Ll = "";
    function Xe(t, l) {
      bn[An++] = za, bn[An++] = Ma, Ma = t, za = l;
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
        Ma = bn[--An], bn[An] = null, za = bn[--An], bn[An] = null;
      for (; t === Ce; )
        Ce = gl[--_l], gl[_l] = null, Ll = gl[--_l], gl[_l] = null, Vl = gl[--_l], gl[_l] = null;
    }
    var Pt = null, Lt = null, gt = !1, Ml = null, wl = !1, Sf = Error(c(519));
    function Ge(t) {
      var l = Error(c(418, ""));
      throw hu(ml(l, t)), Sf;
    }
    function Hs(t) {
      var l = t.stateNode, e = t.type, n = t.memoizedProps;
      switch (l[Jt] = t, l[tl] = n, e) {
        case "dialog":
          dt("cancel", l), dt("close", l);
          break;
        case "iframe":
        case "object":
        case "embed":
          dt("load", l);
          break;
        case "video":
        case "audio":
          for (e = 0; e < Yu.length; e++)
            dt(Yu[e], l);
          break;
        case "source":
          dt("error", l);
          break;
        case "img":
        case "image":
        case "link":
          dt("error", l), dt("load", l);
          break;
        case "details":
          dt("toggle", l);
          break;
        case "input":
          dt("invalid", l), Jr(
            l,
            n.value,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name,
            !0
          ), ya(l);
          break;
        case "select":
          dt("invalid", l);
          break;
        case "textarea":
          dt("invalid", l), Wr(l, n.value, n.defaultValue, n.children), ya(l);
      }
      e = n.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || n.suppressHydrationWarning === !0 || jh(l.textContent, e) ? (n.popover != null && (dt("beforetoggle", l), dt("toggle", l)), n.onScroll != null && dt("scroll", l), n.onScrollEnd != null && dt("scrollend", l), n.onClick != null && (l.onclick = ai), l = !0) : l = !1, l || Ge(t);
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
      Ml === null ? Ml = [t] : Ml.push(t);
    }
    var du = Error(c(460)), qs = Error(c(474)), bf = { then: function() {
    } };
    function Ys(t) {
      return t = t.status, t === "fulfilled" || t === "rejected";
    }
    function Oa() {
    }
    function Bs(t, l, e) {
      switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Oa, Oa), l = e), l.status) {
        case "fulfilled":
          return l.value;
        case "rejected":
          throw t = l.reason, t === du ? Error(c(483)) : t;
        default:
          if (typeof l.status == "string") l.then(Oa, Oa);
          else {
            if (t = Tt, t !== null && 100 < t.shellSuspendCounter)
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
    function Da(t) {
      var l = vu;
      return vu += 1, En === null && (En = []), Bs(En, t, l);
    }
    function mu(t, l) {
      l = l.props.ref, t.ref = l !== void 0 ? l : null;
    }
    function Ra(t, l) {
      throw l.$$typeof === y ? Error(c(525)) : (t = Object.prototype.toString.call(l), Error(
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
      function d(E, b, T, U) {
        return b === null || b.tag !== 6 ? (b = vc(T, E.mode, U), b.return = E, b) : (b = a(b, T), b.return = E, b);
      }
      function _(E, b, T, U) {
        var V = T.type;
        return V === g ? D(
          E,
          b,
          T.props.children,
          U,
          T.key
        ) : b !== null && (b.elementType === V || typeof V == "object" && V !== null && V.$$typeof === F && Xs(V) === b.type) ? (b = a(b, T.props), mu(b, T), b.return = E, b) : (b = Ja(
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
      function D(E, b, T, U, V) {
        return b === null || b.tag !== 7 ? (b = We(
          T,
          E.mode,
          U,
          V
        ), b.return = E, b) : (b = a(b, T), b.return = E, b);
      }
      function w(E, b, T) {
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
          return b = vc(
            "" + b,
            E.mode,
            T
          ), b.return = E, b;
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case v:
              return T = Ja(
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
            case F:
              var U = b._init;
              return b = U(b._payload), w(E, b, T);
          }
          if (N(b) || ot(b))
            return b = We(
              b,
              E.mode,
              T,
              null
            ), b.return = E, b;
          if (typeof b.then == "function")
            return w(E, Da(b), T);
          if (b.$$typeof === R)
            return w(
              E,
              La(E, b),
              T
            );
          Ra(E, b);
        }
        return null;
      }
      function z(E, b, T, U) {
        var V = b !== null ? b.key : null;
        if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
          return V !== null ? null : d(E, b, "" + T, U);
        if (typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case v:
              return T.key === V ? _(E, b, T, U) : null;
            case m:
              return T.key === V ? A(E, b, T, U) : null;
            case F:
              return V = T._init, T = V(T._payload), z(E, b, T, U);
          }
          if (N(T) || ot(T))
            return V !== null ? null : D(E, b, T, U, null);
          if (typeof T.then == "function")
            return z(
              E,
              b,
              Da(T),
              U
            );
          if (T.$$typeof === R)
            return z(
              E,
              b,
              La(E, T),
              U
            );
          Ra(E, T);
        }
        return null;
      }
      function O(E, b, T, U, V) {
        if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
          return E = E.get(T) || null, d(b, E, "" + U, V);
        if (typeof U == "object" && U !== null) {
          switch (U.$$typeof) {
            case v:
              return E = E.get(
                U.key === null ? T : U.key
              ) || null, _(b, E, U, V);
            case m:
              return E = E.get(
                U.key === null ? T : U.key
              ) || null, A(b, E, U, V);
            case F:
              var st = U._init;
              return U = st(U._payload), O(
                E,
                b,
                T,
                U,
                V
              );
          }
          if (N(U) || ot(U))
            return E = E.get(T) || null, D(b, E, U, V, null);
          if (typeof U.then == "function")
            return O(
              E,
              b,
              T,
              Da(U),
              V
            );
          if (U.$$typeof === R)
            return O(
              E,
              b,
              T,
              La(b, U),
              V
            );
          Ra(b, U);
        }
        return null;
      }
      function $(E, b, T, U) {
        for (var V = null, st = null, k = b, tt = b = 0, Vt = null; k !== null && tt < T.length; tt++) {
          k.index > tt ? (Vt = k, k = null) : Vt = k.sibling;
          var _t = z(
            E,
            k,
            T[tt],
            U
          );
          if (_t === null) {
            k === null && (k = Vt);
            break;
          }
          t && k && _t.alternate === null && l(E, k), b = f(_t, b, tt), st === null ? V = _t : st.sibling = _t, st = _t, k = Vt;
        }
        if (tt === T.length)
          return e(E, k), gt && Xe(E, tt), V;
        if (k === null) {
          for (; tt < T.length; tt++)
            k = w(E, T[tt], U), k !== null && (b = f(
              k,
              b,
              tt
            ), st === null ? V = k : st.sibling = k, st = k);
          return gt && Xe(E, tt), V;
        }
        for (k = n(k); tt < T.length; tt++)
          Vt = O(
            k,
            E,
            tt,
            T[tt],
            U
          ), Vt !== null && (t && Vt.alternate !== null && k.delete(
            Vt.key === null ? tt : Vt.key
          ), b = f(
            Vt,
            b,
            tt
          ), st === null ? V = Vt : st.sibling = Vt, st = Vt);
        return t && k.forEach(function(Re) {
          return l(E, Re);
        }), gt && Xe(E, tt), V;
      }
      function it(E, b, T, U) {
        if (T == null) throw Error(c(151));
        for (var V = null, st = null, k = b, tt = b = 0, Vt = null, _t = T.next(); k !== null && !_t.done; tt++, _t = T.next()) {
          k.index > tt ? (Vt = k, k = null) : Vt = k.sibling;
          var Re = z(E, k, _t.value, U);
          if (Re === null) {
            k === null && (k = Vt);
            break;
          }
          t && k && Re.alternate === null && l(E, k), b = f(Re, b, tt), st === null ? V = Re : st.sibling = Re, st = Re, k = Vt;
        }
        if (_t.done)
          return e(E, k), gt && Xe(E, tt), V;
        if (k === null) {
          for (; !_t.done; tt++, _t = T.next())
            _t = w(E, _t.value, U), _t !== null && (b = f(_t, b, tt), st === null ? V = _t : st.sibling = _t, st = _t);
          return gt && Xe(E, tt), V;
        }
        for (k = n(k); !_t.done; tt++, _t = T.next())
          _t = O(k, E, tt, _t.value, U), _t !== null && (t && _t.alternate !== null && k.delete(_t.key === null ? tt : _t.key), b = f(_t, b, tt), st === null ? V = _t : st.sibling = _t, st = _t);
        return t && k.forEach(function(l1) {
          return l(E, l1);
        }), gt && Xe(E, tt), V;
      }
      function Ht(E, b, T, U) {
        if (typeof T == "object" && T !== null && T.type === g && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case v:
              t: {
                for (var V = T.key; b !== null; ) {
                  if (b.key === V) {
                    if (V = T.type, V === g) {
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
                    } else if (b.elementType === V || typeof V == "object" && V !== null && V.$$typeof === F && Xs(V) === b.type) {
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
                ), U.return = E, E = U) : (U = Ja(
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
                for (V = T.key; b !== null; ) {
                  if (b.key === V)
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
            case F:
              return V = T._init, T = V(T._payload), Ht(
                E,
                b,
                T,
                U
              );
          }
          if (N(T))
            return $(
              E,
              b,
              T,
              U
            );
          if (ot(T)) {
            if (V = ot(T), typeof V != "function") throw Error(c(150));
            return T = V.call(T), it(
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
              Da(T),
              U
            );
          if (T.$$typeof === R)
            return Ht(
              E,
              b,
              La(E, T),
              U
            );
          Ra(E, T);
        }
        return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, b !== null && b.tag === 6 ? (e(E, b.sibling), U = a(b, T), U.return = E, E = U) : (e(E, b), U = vc(T, E.mode, U), U.return = E, E = U), s(E)) : e(E, b);
      }
      return function(E, b, T, U) {
        try {
          vu = 0;
          var V = Ht(
            E,
            b,
            T,
            U
          );
          return En = null, V;
        } catch (k) {
          if (k === du) throw k;
          var st = Al(29, k, null, E.mode);
          return st.lanes = U, st.return = E, st;
        } finally {
        }
      };
    }
    var Qe = Gs(!0), Qs = Gs(!1), xn = vt(null), Na = vt(0);
    function Zs(t, l) {
      t = ee, Et(Na, t), Et(xn, l), ee = t | l.baseLanes;
    }
    function Af() {
      Et(Na, ee), Et(xn, xn.current);
    }
    function Ef() {
      ee = Na.current, zt(xn), zt(Na);
    }
    var pl = vt(null), ql = null;
    function he(t) {
      var l = t.alternate;
      Et(Xt, Xt.current & 1), Et(pl, t), ql === null && (l === null || xn.current !== null || l.memoizedState !== null) && (ql = t);
    }
    function js(t) {
      if (t.tag === 22) {
        if (Et(Xt, Xt.current), Et(pl, t), ql === null) {
          var l = t.alternate;
          l !== null && l.memoizedState !== null && (ql = t);
        }
      } else de();
    }
    function de() {
      Et(Xt, Xt.current), Et(pl, pl.current);
    }
    function Kl(t) {
      zt(pl), ql === t && (ql = null), zt(Xt);
    }
    var Xt = vt(0);
    function Ua(t) {
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
    var Zy = typeof AbortController < "u" ? AbortController : function() {
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
    }, jy = u.unstable_scheduleCallback, Vy = u.unstable_NormalPriority, Gt = {
      $$typeof: R,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function xf() {
      return {
        controller: new Zy(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function gu(t) {
      t.refCount--, t.refCount === 0 && jy(Vy, function() {
        t.controller.abort();
      });
    }
    var _u = null, Tf = 0, Tn = 0, Mn = null;
    function Ly(t, l) {
      if (_u === null) {
        var e = _u = [];
        Tf = 0, Tn = Nc(), Mn = {
          status: "pending",
          value: void 0,
          then: function(n) {
            e.push(n);
          }
        };
      }
      return Tf++, l.then(Vs, Vs), l;
    }
    function Vs() {
      if (--Tf === 0 && _u !== null) {
        Mn !== null && (Mn.status = "fulfilled");
        var t = _u;
        _u = null, Tn = 0, Mn = null;
        for (var l = 0; l < t.length; l++) (0, t[l])();
      }
    }
    function Ky(t, l) {
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
    var Ls = Y.S;
    Y.S = function(t, l) {
      typeof l == "object" && l !== null && typeof l.then == "function" && Ly(t, l), Ls !== null && Ls(t, l);
    };
    var Ze = vt(null);
    function Mf() {
      var t = Ze.current;
      return t !== null ? t : Tt.pooledCache;
    }
    function Ha(t, l) {
      l === null ? Et(Ze, Ze.current) : Et(Ze, l.pool);
    }
    function Ks() {
      var t = Mf();
      return t === null ? null : { parent: Gt._currentValue, pool: t };
    }
    var ye = 0, rt = null, bt = null, Yt = null, wa = !1, zn = !1, je = !1, qa = 0, pu = 0, On = null, $y = 0;
    function qt() {
      throw Error(c(321));
    }
    function zf(t, l) {
      if (l === null) return !1;
      for (var e = 0; e < l.length && e < t.length; e++)
        if (!cl(t[e], l[e])) return !1;
      return !0;
    }
    function Of(t, l, e, n, a, f) {
      return ye = f, rt = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, Y.H = t === null || t.memoizedState === null ? Ve : ve, je = !1, f = e(n, a), je = !1, zn && (f = Js(
        l,
        e,
        n,
        a
      )), $s(t), f;
    }
    function $s(t) {
      Y.H = Yl;
      var l = bt !== null && bt.next !== null;
      if (ye = 0, Yt = bt = rt = null, wa = !1, pu = 0, On = null, l) throw Error(c(300));
      t === null || Zt || (t = t.dependencies, t !== null && Va(t) && (Zt = !0));
    }
    function Js(t, l, e, n) {
      rt = t;
      var a = 0;
      do {
        if (zn && (On = null), pu = 0, zn = !1, 25 <= a) throw Error(c(301));
        if (a += 1, Yt = bt = null, t.updateQueue != null) {
          var f = t.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        Y.H = Le, f = l(e, n);
      } while (zn);
      return f;
    }
    function Jy() {
      var t = Y.H, l = t.useState()[0];
      return l = typeof l.then == "function" ? Su(l) : l, t = t.useState()[0], (bt !== null ? bt.memoizedState : null) !== t && (rt.flags |= 1024), l;
    }
    function Df() {
      var t = qa !== 0;
      return qa = 0, t;
    }
    function Rf(t, l, e) {
      l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
    }
    function Nf(t) {
      if (wa) {
        for (t = t.memoizedState; t !== null; ) {
          var l = t.queue;
          l !== null && (l.pending = null), t = t.next;
        }
        wa = !1;
      }
      ye = 0, Yt = bt = rt = null, zn = !1, pu = qa = 0, On = null;
    }
    function el() {
      var t = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Yt === null ? rt.memoizedState = Yt = t : Yt = Yt.next = t, Yt;
    }
    function Bt() {
      if (bt === null) {
        var t = rt.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = bt.next;
      var l = Yt === null ? rt.memoizedState : Yt.next;
      if (l !== null)
        Yt = l, bt = t;
      else {
        if (t === null)
          throw rt.alternate === null ? Error(c(467)) : Error(c(310));
        bt = t, t = {
          memoizedState: bt.memoizedState,
          baseState: bt.baseState,
          baseQueue: bt.baseQueue,
          queue: bt.queue,
          next: null
        }, Yt === null ? rt.memoizedState = Yt = t : Yt = Yt.next = t;
      }
      return Yt;
    }
    var Ya;
    Ya = function() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    };
    function Su(t) {
      var l = pu;
      return pu += 1, On === null && (On = []), t = Bs(On, t, l), l = rt, (Yt === null ? l.memoizedState : Yt.next) === null && (l = l.alternate, Y.H = l === null || l.memoizedState === null ? Ve : ve), t;
    }
    function Ba(t) {
      if (t !== null && typeof t == "object") {
        if (typeof t.then == "function") return Su(t);
        if (t.$$typeof === R) return kt(t);
      }
      throw Error(c(438, String(t)));
    }
    function Uf(t) {
      var l = null, e = rt.updateQueue;
      if (e !== null && (l = e.memoCache), l == null) {
        var n = rt.alternate;
        n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (l = {
          data: n.data.map(function(a) {
            return a.slice();
          }),
          index: 0
        })));
      }
      if (l == null && (l = { data: [], index: 0 }), e === null && (e = Ya(), rt.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
        for (e = l.data[l.index] = Array(t), n = 0; n < t; n++)
          e[n] = ct;
      return l.index++, e;
    }
    function $l(t, l) {
      return typeof l == "function" ? l(t) : l;
    }
    function Ca(t) {
      var l = Bt();
      return Hf(l, bt, t);
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
        var d = s = null, _ = null, A = l, D = !1;
        do {
          var w = A.lane & -536870913;
          if (w !== A.lane ? (mt & w) === w : (ye & w) === w) {
            var z = A.revertLane;
            if (z === 0)
              _ !== null && (_ = _.next = {
                lane: 0,
                revertLane: 0,
                action: A.action,
                hasEagerState: A.hasEagerState,
                eagerState: A.eagerState,
                next: null
              }), w === Tn && (D = !0);
            else if ((ye & z) === z) {
              A = A.next, z === Tn && (D = !0);
              continue;
            } else
              w = {
                lane: 0,
                revertLane: A.revertLane,
                action: A.action,
                hasEagerState: A.hasEagerState,
                eagerState: A.eagerState,
                next: null
              }, _ === null ? (d = _ = w, s = f) : _ = _.next = w, rt.lanes |= z, xe |= z;
            w = A.action, je && e(f, w), f = A.hasEagerState ? A.eagerState : e(f, w);
          } else
            z = {
              lane: w,
              revertLane: A.revertLane,
              action: A.action,
              hasEagerState: A.hasEagerState,
              eagerState: A.eagerState,
              next: null
            }, _ === null ? (d = _ = z, s = f) : _ = _.next = z, rt.lanes |= w, xe |= w;
          A = A.next;
        } while (A !== null && A !== l);
        if (_ === null ? s = f : _.next = d, !cl(f, t.memoizedState) && (Zt = !0, D && (e = Mn, e !== null)))
          throw e;
        t.memoizedState = f, t.baseState = s, t.baseQueue = _, n.lastRenderedState = f;
      }
      return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
    }
    function wf(t) {
      var l = Bt(), e = l.queue;
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
      var n = rt, a = Bt(), f = gt;
      if (f) {
        if (e === void 0) throw Error(c(407));
        e = e();
      } else e = l();
      var s = !cl(
        (bt || a).memoizedState,
        e
      );
      if (s && (a.memoizedState = e, Zt = !0), a = a.queue, Bf(Ps.bind(null, n, a, t), [
        t
      ]), a.getSnapshot !== l || s || Yt !== null && Yt.memoizedState.tag & 1) {
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
        ), Tt === null) throw Error(c(349));
        f || (ye & 60) !== 0 || Ws(n, l, e);
      }
      return e;
    }
    function Ws(t, l, e) {
      t.flags |= 16384, t = { getSnapshot: l, value: e }, l = rt.updateQueue, l === null ? (l = Ya(), rt.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
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
        bt,
        typeof n == "function" ? n : $l
      );
    }
    function ky(t, l, e, n, a) {
      if (Qa(t)) throw Error(c(485));
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
        Y.T !== null ? e(!0) : f.isTransition = !1, n(f), e = l.pending, e === null ? (f.next = l.pending = f, eo(l, f)) : (f.next = e.next, l.pending = e.next = f);
      }
    }
    function eo(t, l) {
      var e = l.action, n = l.payload, a = t.state;
      if (l.isTransition) {
        var f = Y.T, s = {};
        Y.T = s;
        try {
          var d = e(a, n), _ = Y.S;
          _ !== null && _(s, d), no(t, l, d);
        } catch (A) {
          Yf(t, l, A);
        } finally {
          Y.T = f;
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
        var e = Tt.formState;
        if (e !== null) {
          t: {
            var n = rt;
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
      }, e.queue = n, e = Mo.bind(
        null,
        rt,
        n
      ), n.dispatch = e, n = qf(!1), f = Zf.bind(
        null,
        rt,
        !1,
        n.queue
      ), n = el(), a = {
        state: l,
        dispatch: null,
        action: t,
        pending: null
      }, n.queue = a, e = ky.bind(
        null,
        rt,
        a,
        f,
        e
      ), a.dispatch = e, n.memoizedState = t, [l, e, !1];
    }
    function co(t) {
      var l = Bt();
      return ro(l, bt, t);
    }
    function ro(t, l, e) {
      l = Hf(
        t,
        l,
        io
      )[0], t = Ca($l)[0], l = typeof l == "object" && l !== null && typeof l.then == "function" ? Su(l) : l;
      var n = Bt(), a = n.queue, f = a.dispatch;
      return e !== n.memoizedState && (rt.flags |= 2048, Dn(
        9,
        Wy.bind(null, a, e),
        { destroy: void 0 },
        null
      )), [l, f, t];
    }
    function Wy(t, l) {
      t.action = l;
    }
    function so(t) {
      var l = Bt(), e = bt;
      if (e !== null)
        return ro(l, e, t);
      Bt(), l = l.memoizedState, e = Bt();
      var n = e.queue.dispatch;
      return e.memoizedState = t, [l, n, !1];
    }
    function Dn(t, l, e, n) {
      return t = { tag: t, create: l, inst: e, deps: n, next: null }, l = rt.updateQueue, l === null && (l = Ya(), rt.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (n = e.next, e.next = t, t.next = n, l.lastEffect = t), t;
    }
    function oo() {
      return Bt().memoizedState;
    }
    function Xa(t, l, e, n) {
      var a = el();
      rt.flags |= t, a.memoizedState = Dn(
        1 | l,
        e,
        { destroy: void 0 },
        n === void 0 ? null : n
      );
    }
    function Ga(t, l, e, n) {
      var a = Bt();
      n = n === void 0 ? null : n;
      var f = a.memoizedState.inst;
      bt !== null && n !== null && zf(n, bt.memoizedState.deps) ? a.memoizedState = Dn(l, e, f, n) : (rt.flags |= t, a.memoizedState = Dn(1 | l, e, f, n));
    }
    function ho(t, l) {
      Xa(8390656, 8, t, l);
    }
    function Bf(t, l) {
      Ga(2048, 8, t, l);
    }
    function yo(t, l) {
      return Ga(4, 2, t, l);
    }
    function vo(t, l) {
      return Ga(4, 4, t, l);
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
      e = e != null ? e.concat([t]) : null, Ga(4, 4, mo.bind(null, l, t), e);
    }
    function Cf() {
    }
    function _o(t, l) {
      var e = Bt();
      l = l === void 0 ? null : l;
      var n = e.memoizedState;
      return l !== null && zf(l, n[1]) ? n[0] : (e.memoizedState = [t, l], t);
    }
    function po(t, l) {
      var e = Bt();
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
      return e === void 0 || (ye & 1073741824) !== 0 ? t.memoizedState = l : (t.memoizedState = e, t = bh(), rt.lanes |= t, xe |= t, e);
    }
    function So(t, l, e, n) {
      return cl(e, l) ? e : xn.current !== null ? (t = Xf(t, e, n), cl(t, l) || (Zt = !0), t) : (ye & 42) === 0 ? (Zt = !0, t.memoizedState = e) : (t = bh(), rt.lanes |= t, xe |= t, l);
    }
    function bo(t, l, e, n, a) {
      var f = C.p;
      C.p = f !== 0 && 8 > f ? f : 8;
      var s = Y.T, d = {};
      Y.T = d, Zf(t, !1, l, e);
      try {
        var _ = a(), A = Y.S;
        if (A !== null && A(d, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
          var D = Ky(
            _,
            n
          );
          bu(
            t,
            l,
            D,
            hl(t)
          );
        } else
          bu(
            t,
            l,
            n,
            hl(t)
          );
      } catch (w) {
        bu(
          t,
          l,
          { then: function() {
          }, status: "rejected", reason: w },
          hl()
        );
      } finally {
        C.p = f, Y.T = s;
      }
    }
    function Fy() {
    }
    function Gf(t, l, e, n) {
      if (t.tag !== 5) throw Error(c(476));
      var a = Ao(t).queue;
      bo(
        t,
        a,
        l,
        W,
        e === null ? Fy : function() {
          return Eo(t), e(n);
        }
      );
    }
    function Ao(t) {
      var l = t.memoizedState;
      if (l !== null) return l;
      l = {
        memoizedState: W,
        baseState: W,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: $l,
          lastRenderedState: W
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
      return Bt().memoizedState;
    }
    function To() {
      return Bt().memoizedState;
    }
    function Py(t) {
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
    function Iy(t, l, e) {
      var n = hl();
      e = {
        lane: n,
        revertLane: 0,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, Qa(t) ? zo(l, e) : (e = gf(t, l, e, n), e !== null && (It(e, t, n), Oo(e, l, n)));
    }
    function Mo(t, l, e) {
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
      if (Qa(t)) zo(l, a);
      else {
        var f = t.alternate;
        if (t.lanes === 0 && (f === null || f.lanes === 0) && (f = l.lastRenderedReducer, f !== null))
          try {
            var s = l.lastRenderedState, d = f(s, e);
            if (a.hasEagerState = !0, a.eagerState = d, cl(d, s))
              return xa(t, l, a, 0), Tt === null && Ea(), !1;
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
      }, Qa(t)) {
        if (l) throw Error(c(479));
      } else
        l = gf(
          t,
          e,
          n,
          2
        ), l !== null && It(l, t, 2);
    }
    function Qa(t) {
      var l = t.alternate;
      return t === rt || l !== null && l === rt;
    }
    function zo(t, l) {
      zn = wa = !0;
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
      use: Ba,
      useCallback: qt,
      useContext: qt,
      useEffect: qt,
      useImperativeHandle: qt,
      useLayoutEffect: qt,
      useInsertionEffect: qt,
      useMemo: qt,
      useReducer: qt,
      useRef: qt,
      useState: qt,
      useDebugValue: qt,
      useDeferredValue: qt,
      useTransition: qt,
      useSyncExternalStore: qt,
      useId: qt
    };
    Yl.useCacheRefresh = qt, Yl.useMemoCache = qt, Yl.useHostTransitionStatus = qt, Yl.useFormState = qt, Yl.useActionState = qt, Yl.useOptimistic = qt;
    var Ve = {
      readContext: kt,
      use: Ba,
      useCallback: function(t, l) {
        return el().memoizedState = [
          t,
          l === void 0 ? null : l
        ], t;
      },
      useContext: kt,
      useEffect: ho,
      useImperativeHandle: function(t, l, e) {
        e = e != null ? e.concat([t]) : null, Xa(
          4194308,
          4,
          mo.bind(null, l, t),
          e
        );
      },
      useLayoutEffect: function(t, l) {
        return Xa(4194308, 4, t, l);
      },
      useInsertionEffect: function(t, l) {
        Xa(4, 2, t, l);
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
        }, n.queue = t, t = t.dispatch = Iy.bind(
          null,
          rt,
          t
        ), [n.memoizedState, t];
      },
      useRef: function(t) {
        var l = el();
        return t = { current: t }, l.memoizedState = t;
      },
      useState: function(t) {
        t = qf(t);
        var l = t.queue, e = Mo.bind(null, rt, l);
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
          rt,
          t.queue,
          !0,
          !1
        ), el().memoizedState = t, [!1, t];
      },
      useSyncExternalStore: function(t, l, e) {
        var n = rt, a = el();
        if (gt) {
          if (e === void 0)
            throw Error(c(407));
          e = e();
        } else {
          if (e = l(), Tt === null) throw Error(c(349));
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
        var t = el(), l = Tt.identifierPrefix;
        if (gt) {
          var e = Ll, n = Vl;
          e = (n & ~(1 << 32 - fl(n) - 1)).toString(32) + e, l = ":" + l + "R" + e, e = qa++, 0 < e && (l += "H" + e.toString(32)), l += ":";
        } else
          e = $y++, l = ":" + l + "r" + e.toString(32) + ":";
        return t.memoizedState = l;
      },
      useCacheRefresh: function() {
        return el().memoizedState = Py.bind(
          null,
          rt
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
        rt,
        !0,
        e
      ), e.dispatch = l, [t, l];
    };
    var ve = {
      readContext: kt,
      use: Ba,
      useCallback: _o,
      useContext: kt,
      useEffect: Bf,
      useImperativeHandle: go,
      useInsertionEffect: yo,
      useLayoutEffect: vo,
      useMemo: po,
      useReducer: Ca,
      useRef: oo,
      useState: function() {
        return Ca($l);
      },
      useDebugValue: Cf,
      useDeferredValue: function(t, l) {
        var e = Bt();
        return So(
          e,
          bt.memoizedState,
          t,
          l
        );
      },
      useTransition: function() {
        var t = Ca($l)[0], l = Bt().memoizedState;
        return [
          typeof t == "boolean" ? t : Su(t),
          l
        ];
      },
      useSyncExternalStore: ks,
      useId: xo
    };
    ve.useCacheRefresh = To, ve.useMemoCache = Uf, ve.useHostTransitionStatus = Qf, ve.useFormState = co, ve.useActionState = co, ve.useOptimistic = function(t, l) {
      var e = Bt();
      return lo(e, bt, t, l);
    };
    var Le = {
      readContext: kt,
      use: Ba,
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
        var e = Bt();
        return bt === null ? Xf(e, t, l) : So(
          e,
          bt.memoizedState,
          t,
          l
        );
      },
      useTransition: function() {
        var t = wf($l)[0], l = Bt().memoizedState;
        return [
          typeof t == "boolean" ? t : Su(t),
          l
        ];
      },
      useSyncExternalStore: ks,
      useId: xo
    };
    Le.useCacheRefresh = To, Le.useMemoCache = Uf, Le.useHostTransitionStatus = Qf, Le.useFormState = so, Le.useActionState = so, Le.useOptimistic = function(t, l) {
      var e = Bt();
      return bt !== null ? lo(e, bt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    };
    function jf(t, l, e, n) {
      l = t.memoizedState, e = e(n, l), e = e == null ? l : I({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
    }
    var Vf = {
      isMounted: function(t) {
        return (t = t._reactInternals) ? Q(t) === t : !1;
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
        e === l && (e = I({}, e));
        for (var a in t)
          e[a] === void 0 && (e[a] = t[a]);
      }
      return e;
    }
    var Za = typeof reportError == "function" ? reportError : function(t) {
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
      Za(t);
    }
    function Uo(t) {
      console.error(t);
    }
    function Ho(t) {
      Za(t);
    }
    function ja(t, l) {
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
        ja(t, l);
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
        wo(l, e, n), typeof a != "function" && (Te === null ? Te = /* @__PURE__ */ new Set([this]) : Te.add(this));
        var d = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: d !== null ? d : ""
        });
      });
    }
    function tv(t, l, e, n, a) {
      if (e.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
        if (l = e.alternate, l !== null && Eu(
          l,
          e,
          a,
          !0
        ), e = pl.current, e !== null) {
          switch (e.tag) {
            case 13:
              return ql === null ? Mc() : e.alternate === null && Ut === 0 && (Ut = 3), e.flags &= -257, e.flags |= 65536, e.lanes = a, n === bf ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([n]) : l.add(n), Oc(t, n, a)), !1;
            case 22:
              return e.flags |= 65536, n === bf ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([n])
              }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([n]) : e.add(n)), Oc(t, n, a)), !1;
          }
          throw Error(c(435, e.tag));
        }
        return Oc(t, n, a), Mc(), !1;
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
            if (l = e.type, f = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Te === null || !Te.has(f))))
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
        for (var d in n)
          d !== "ref" && (s[d] = n[d]);
      } else s = n;
      return Je(l), n = Of(
        t,
        l,
        e,
        s,
        f,
        a
      ), d = Df(), t !== null && !Zt ? (Rf(t, l, a), Jl(t, l, a)) : (gt && d && _f(l), l.flags |= 1, Kt(t, l, n, a), l.child);
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
        )) : (t = Ja(
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
          l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ha(
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
        s !== null ? (Ha(l, s.cachePool), Zs(l, s), de(), l.memoizedState = null) : (t !== null && Ha(l, null), Af(), de());
      return Kt(t, l, a, e), l.child;
    }
    function Zo(t, l, e, n) {
      var a = Mf();
      return a = a === null ? null : { parent: Gt._currentValue, pool: a }, l.memoizedState = {
        baseLanes: e,
        cachePool: a
      }, t !== null && Ha(l, null), Af(), js(l), t !== null && Eu(t, l, n, !0), null;
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
        ), f.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (s = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), s !== f.state && Vf.enqueueReplaceState(f, f.state, null), Mu(l, n, f, a), Tu(), f.state = l.memoizedState), typeof f.componentDidMount == "function" && (l.flags |= 4194308), n = !0;
      } else if (t === null) {
        f = l.stateNode;
        var d = l.memoizedProps, _ = Ke(e, d);
        f.props = _;
        var A = f.context, D = e.contextType;
        s = Sn, typeof D == "object" && D !== null && (s = kt(D));
        var w = e.getDerivedStateFromProps;
        D = typeof w == "function" || typeof f.getSnapshotBeforeUpdate == "function", d = l.pendingProps !== d, D || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (d || A !== s) && Ro(
          l,
          f,
          n,
          s
        ), ge = !1;
        var z = l.memoizedState;
        f.state = z, Mu(l, n, f, a), Tu(), A = l.memoizedState, d || z !== A || ge ? (typeof w == "function" && (jf(
          l,
          e,
          w,
          n
        ), A = l.memoizedState), (_ = ge || Do(
          l,
          e,
          _,
          n,
          z,
          A,
          s
        )) ? (D || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = n, l.memoizedState = A), f.props = n, f.state = A, f.context = s, n = _) : (typeof f.componentDidMount == "function" && (l.flags |= 4194308), n = !1);
      } else {
        f = l.stateNode, ac(t, l), s = l.memoizedProps, D = Ke(e, s), f.props = D, w = l.pendingProps, z = f.context, A = e.contextType, _ = Sn, typeof A == "object" && A !== null && (_ = kt(A)), d = e.getDerivedStateFromProps, (A = typeof d == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (s !== w || z !== _) && Ro(
          l,
          f,
          n,
          _
        ), ge = !1, z = l.memoizedState, f.state = z, Mu(l, n, f, a), Tu();
        var O = l.memoizedState;
        s !== w || z !== O || ge || t !== null && t.dependencies !== null && Va(t.dependencies) ? (typeof d == "function" && (jf(
          l,
          e,
          d,
          n
        ), O = l.memoizedState), (D = ge || Do(
          l,
          e,
          D,
          n,
          z,
          O,
          _
        ) || t !== null && t.dependencies !== null && Va(t.dependencies)) ? (A || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(n, O, _), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          n,
          O,
          _
        )), typeof f.componentDidUpdate == "function" && (l.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || s === t.memoizedProps && z === t.memoizedState || (l.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && z === t.memoizedState || (l.flags |= 1024), l.memoizedProps = n, l.memoizedState = O), f.props = n, f.state = O, f.context = _, n = D) : (typeof f.componentDidUpdate != "function" || s === t.memoizedProps && z === t.memoizedState || (l.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && z === t.memoizedState || (l.flags |= 1024), n = !1);
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
            var d = Lt, _;
            if (_ = d) {
              t: {
                for (_ = d, d = wl; _.nodeType !== 8; ) {
                  if (!d) {
                    d = null;
                    break t;
                  }
                  if (_ = Ol(
                    _.nextSibling
                  ), _ === null) {
                    d = null;
                    break t;
                  }
                }
                d = _;
              }
              d !== null ? (l.memoizedState = {
                dehydrated: d,
                treeContext: Ce !== null ? { id: Vl, overflow: Ll } : null,
                retryLane: 536870912
              }, _ = Al(
                18,
                null,
                null,
                0
              ), _.stateNode = d, _.return = l, l.child = _, Pt = l, Lt = null, _ = !0) : _ = !1;
            }
            _ || Ge(l);
          }
          if (d = l.memoizedState, d !== null && (d = d.dehydrated, d !== null))
            return d.data === "$!" ? l.lanes = 16 : l.lanes = 536870912, null;
          Kl(l);
        }
        return d = n.children, n = n.fallback, a ? (de(), a = l.mode, d = Ff(
          { mode: "hidden", children: d },
          a
        ), n = We(
          n,
          a,
          e,
          null
        ), d.return = l, n.return = l, d.sibling = n, l.child = d, a = l.child, a.memoizedState = Jf(e), a.childLanes = kf(
          t,
          s,
          e
        ), l.memoizedState = $f, n) : (he(l), Wf(l, d));
      }
      if (_ = t.memoizedState, _ !== null && (d = _.dehydrated, d !== null)) {
        if (f)
          l.flags & 256 ? (he(l), l.flags &= -257, l = Pf(
            t,
            l,
            e
          )) : l.memoizedState !== null ? (de(), l.child = t.child, l.flags |= 128, l = null) : (de(), a = n.fallback, d = l.mode, n = Ff(
            { mode: "visible", children: n.children },
            d
          ), a = We(
            a,
            d,
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
        else if (he(l), d.data === "$!") {
          if (s = d.nextSibling && d.nextSibling.dataset, s) var A = s.dgst;
          s = A, n = Error(c(419)), n.stack = "", n.digest = s, hu({ value: n, source: null, stack: null }), l = Pf(
            t,
            l,
            e
          );
        } else if (Zt || Eu(t, l, e, !1), s = (e & t.childLanes) !== 0, Zt || s) {
          if (s = Tt, s !== null) {
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
          d.data === "$?" || Mc(), l = Pf(
            t,
            l,
            e
          );
        } else
          d.data === "$?" ? (l.flags |= 128, l.child = t.child, l = vv.bind(
            null,
            t
          ), d._reactRetry = l, l = null) : (t = _.treeContext, Lt = Ol(
            d.nextSibling
          ), Pt = l, gt = !0, Ml = null, wl = !1, t !== null && (gl[_l++] = Vl, gl[_l++] = Ll, gl[_l++] = Ce, Vl = t.id, Ll = t.overflow, Ce = l), l = Wf(
            l,
            n.children
          ), l.flags |= 4096);
        return l;
      }
      return a ? (de(), a = n.fallback, d = l.mode, _ = t.child, A = _.sibling, n = Ee(_, {
        mode: "hidden",
        children: n.children
      }), n.subtreeFlags = _.subtreeFlags & 31457280, A !== null ? a = Ee(A, a) : (a = We(
        a,
        d,
        e,
        null
      ), a.flags |= 2), a.return = l, n.return = l, n.sibling = a, l.child = n, n = a, a = l.child, d = t.child.memoizedState, d === null ? d = Jf(e) : (_ = d.cachePool, _ !== null ? (A = Gt._currentValue, _ = _.parent !== A ? { parent: A, pool: A } : _) : _ = Ks(), d = {
        baseLanes: d.baseLanes | e,
        cachePool: _
      }), a.memoizedState = d, a.childLanes = kf(
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
      switch (Et(Xt, n), a) {
        case "forwards":
          for (e = l.child, a = null; e !== null; )
            t = e.alternate, t !== null && Ua(t) === null && (a = e), e = e.sibling;
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
            if (t = a.alternate, t !== null && Ua(t) === null) {
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
      return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Va(t)));
    }
    function lv(t, l, e) {
      switch (l.tag) {
        case 3:
          ia(l, l.stateNode.containerInfo), me(l, Gt, t.memoizedState.cache), ou();
          break;
        case 27:
        case 5:
          ji(l);
          break;
        case 4:
          ia(l, l.stateNode.containerInfo);
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
          if (a = l.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), Et(Xt, Xt.current), n) break;
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
            return Zt = !1, lv(
              t,
              l,
              e
            );
          Zt = (t.flags & 131072) !== 0;
        }
      else
        Zt = !1, gt && (l.flags & 1048576) !== 0 && Us(l, za, l.index);
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
                if (a = n.$$typeof, a === Z) {
                  l.tag = 11, l = Co(
                    null,
                    l,
                    n,
                    t,
                    e
                  );
                  break t;
                } else if (a === nt) {
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
              throw l = pt(n) || n, Error(c(306, l, ""));
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
            if (ia(
              l,
              l.stateNode.containerInfo
            ), t === null) throw Error(c(387));
            var f = l.pendingProps;
            a = l.memoizedState, n = a.element, ac(t, l), Mu(l, f, null, e);
            var s = l.memoizedState;
            if (f = s.cache, me(l, Gt, f), f !== a.cache && nc(
              l,
              [Gt],
              e,
              !0
            ), Tu(), f = s.element, a.isDehydrated)
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
                ), Pt = l, gt = !0, Ml = null, wl = !0, e = Qs(
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
          )) ? l.memoizedState = e : gt || (e = l.type, t = l.pendingProps, n = ii(
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
          return t === null && gt && ((a = n = Lt) && (n = Nv(
            n,
            l.type,
            l.pendingProps,
            wl
          ), n !== null ? (l.stateNode = n, Pt = l, Lt = Ol(
            n.firstChild
          ), wl = !1, a = !0) : a = !1), a || Ge(l)), ji(l), a = l.type, f = l.pendingProps, s = t !== null ? t.memoizedProps : null, n = f.children, Gc(a, f) ? n = null : s !== null && Gc(a, s) && (l.flags |= 32), l.memoizedState !== null && (a = Of(
            t,
            l,
            Jy,
            null,
            null,
            e
          ), Qu._currentValue = a), Au(t, l), Kt(t, l, n, e), l.child;
        case 6:
          return t === null && gt && ((t = e = Lt) && (e = Uv(
            e,
            l.pendingProps,
            wl
          ), e !== null ? (l.stateNode = e, Pt = l, Lt = null, t = !0) : t = !1), t || Ge(l)), null;
        case 13:
          return Ko(t, l, e);
        case 4:
          return ia(
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
          return Je(l), n = kt(Gt), t === null ? (a = Mf(), a === null && (a = Tt, f = xf(), a.pooledCache = f, f.refCount++, f !== null && (a.pooledCacheLanes |= e), a = f), l.memoizedState = {
            parent: n,
            cache: a
          }, uc(l), me(l, Gt, a)) : ((t.lanes & e) !== 0 && (ac(t, l), Mu(l, null, null, e), Tu()), a = t.memoizedState, f = l.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, l.memoizedState = a, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = a), me(l, Gt, n)) : (n = f.cache, me(l, Gt, n), n !== a.cache && nc(
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
      Et(lc, l._currentValue), l._currentValue = e;
    }
    function Wl(t) {
      t._currentValue = lc.current, zt(lc);
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
            var d = f;
            f = a;
            for (var _ = 0; _ < l.length; _++)
              if (d.context === l[_]) {
                f.lanes |= e, d = f.alternate, d !== null && (d.lanes |= e), ec(
                  f.return,
                  e,
                  t
                ), n || (s = null);
                break t;
              }
            f = d.next;
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
            var d = a.type;
            cl(a.pendingProps.value, s.value) || (t !== null ? t.push(d) : t = [d]);
          }
        } else if (a === aa.current) {
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
    function Va(t) {
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
    function La(t, l) {
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
        return a === null ? l.next = l : (l.next = a.next, a.next = l), n.pending = l, l = Ta(t), Rs(t, null, e), l;
      }
      return xa(t, n, l, e), Ta(t);
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
    function Tu() {
      if (fc) {
        var t = Mn;
        if (t !== null) throw t;
      }
    }
    function Mu(t, l, e, n) {
      fc = !1;
      var a = t.updateQueue;
      ge = !1;
      var f = a.firstBaseUpdate, s = a.lastBaseUpdate, d = a.shared.pending;
      if (d !== null) {
        a.shared.pending = null;
        var _ = d, A = _.next;
        _.next = null, s === null ? f = A : s.next = A, s = _;
        var D = t.alternate;
        D !== null && (D = D.updateQueue, d = D.lastBaseUpdate, d !== s && (d === null ? D.firstBaseUpdate = A : d.next = A, D.lastBaseUpdate = _));
      }
      if (f !== null) {
        var w = a.baseState;
        s = 0, D = A = _ = null, d = f;
        do {
          var z = d.lane & -536870913, O = z !== d.lane;
          if (O ? (mt & z) === z : (n & z) === z) {
            z !== 0 && z === Tn && (fc = !0), D !== null && (D = D.next = {
              lane: 0,
              tag: d.tag,
              payload: d.payload,
              callback: null,
              next: null
            });
            t: {
              var $ = t, it = d;
              z = l;
              var Ht = e;
              switch (it.tag) {
                case 1:
                  if ($ = it.payload, typeof $ == "function") {
                    w = $.call(Ht, w, z);
                    break t;
                  }
                  w = $;
                  break t;
                case 3:
                  $.flags = $.flags & -65537 | 128;
                case 0:
                  if ($ = it.payload, z = typeof $ == "function" ? $.call(Ht, w, z) : $, z == null) break t;
                  w = I({}, w, z);
                  break t;
                case 2:
                  ge = !0;
              }
            }
            z = d.callback, z !== null && (t.flags |= 64, O && (t.flags |= 8192), O = a.callbacks, O === null ? a.callbacks = [z] : O.push(z));
          } else
            O = {
              lane: z,
              tag: d.tag,
              payload: d.payload,
              callback: d.callback,
              next: null
            }, D === null ? (A = D = O, _ = w) : D = D.next = O, s |= z;
          if (d = d.next, d === null) {
            if (d = a.shared.pending, d === null)
              break;
            O = d, d = O.next, O.next = null, a.lastBaseUpdate = O, a.shared.pending = null;
          }
        } while (!0);
        D === null && (_ = w), a.baseState = _, a.firstBaseUpdate = A, a.lastBaseUpdate = D, f === null && (a.shared.lanes = 0), xe |= s, t.lanes = s, t.memoizedState = w;
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
      } catch (d) {
        xt(l, l.return, d);
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
              var s = n.inst, d = s.destroy;
              if (d !== void 0) {
                s.destroy = void 0, a = l;
                var _ = e;
                try {
                  d();
                } catch (A) {
                  xt(
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
        xt(l, l.return, A);
      }
    }
    function Io(t) {
      var l = t.updateQueue;
      if (l !== null) {
        var e = t.stateNode;
        try {
          Po(l, e);
        } catch (n) {
          xt(t, t.return, n);
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
        xt(t, l, n);
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
        xt(t, l, f);
      }
    }
    function rl(t, l) {
      var e = t.ref, n = t.refCleanup;
      if (e !== null)
        if (typeof n == "function")
          try {
            n();
          } catch (a) {
            xt(t, l, a);
          } finally {
            t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
          }
        else if (typeof e == "function")
          try {
            e(null);
          } catch (a) {
            xt(t, l, a);
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
        xt(t, t.return, a);
      }
    }
    function eh(t, l, e) {
      try {
        var n = t.stateNode;
        Mv(n, t.type, e, l), n[tl] = l;
      } catch (a) {
        xt(t, t.return, a);
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
        t = t.stateNode, l ? e.nodeType === 8 ? e.parentNode.insertBefore(t, l) : e.insertBefore(t, l) : (e.nodeType === 8 ? (l = e.parentNode, l.insertBefore(t, e)) : (l = e, l.appendChild(t)), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = ai));
      else if (n !== 4 && n !== 27 && (t = t.child, t !== null))
        for (rc(t, l, e), t = t.sibling; t !== null; )
          rc(t, l, e), t = t.sibling;
    }
    function Ka(t, l, e) {
      var n = t.tag;
      if (n === 5 || n === 6)
        t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
      else if (n !== 4 && n !== 27 && (t = t.child, t !== null))
        for (Ka(t, l, e), t = t.sibling; t !== null; )
          Ka(t, l, e), t = t.sibling;
    }
    var Fl = !1, Nt = !1, sc = !1, uh = typeof WeakSet == "function" ? WeakSet : Set, jt = null, ah = !1;
    function ev(t, l) {
      if (t = t.containerInfo, Cc = hi, t = bs(t), hf(t)) {
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
              var s = 0, d = -1, _ = -1, A = 0, D = 0, w = t, z = null;
              l: for (; ; ) {
                for (var O; w !== e || a !== 0 && w.nodeType !== 3 || (d = s + a), w !== f || n !== 0 && w.nodeType !== 3 || (_ = s + n), w.nodeType === 3 && (s += w.nodeValue.length), (O = w.firstChild) !== null; )
                  z = w, w = O;
                for (; ; ) {
                  if (w === t) break l;
                  if (z === e && ++A === a && (d = s), z === f && ++D === n && (_ = s), (O = w.nextSibling) !== null) break;
                  w = z, z = w.parentNode;
                }
                w = O;
              }
              e = d === -1 || _ === -1 ? null : { start: d, end: _ };
            } else e = null;
          }
        e = e || { start: 0, end: 0 };
      } else e = null;
      for (Xc = { focusedElem: t, selectionRange: e }, hi = !1, jt = l; jt !== null; )
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
                    var $ = Ke(
                      e.type,
                      a,
                      e.elementType === e.type
                    );
                    t = n.getSnapshotBeforeUpdate(
                      $,
                      f
                    ), n.__reactInternalSnapshotBeforeUpdate = t;
                  } catch (it) {
                    xt(
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
      return $ = ah, ah = !1, $;
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
              } catch (d) {
                xt(e, e.return, d);
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
              } catch (d) {
                xt(
                  e,
                  e.return,
                  d
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
            } catch (d) {
              xt(e, e.return, d);
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
    var Ct = null, sl = !1;
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
          var n = Ct, a = sl;
          for (Ct = e.stateNode, Pl(
            t,
            l,
            e
          ), e = e.stateNode, l = e.attributes; l.length; )
            e.removeAttributeNode(l[0]);
          ki(e), Ct = n, sl = a;
          break;
        case 5:
          Nt || rl(e, l);
        case 6:
          a = Ct;
          var f = sl;
          if (Ct = null, Pl(
            t,
            l,
            e
          ), Ct = a, sl = f, Ct !== null)
            if (sl)
              try {
                t = Ct, n = e.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n);
              } catch (s) {
                xt(
                  e,
                  l,
                  s
                );
              }
            else
              try {
                Ct.removeChild(e.stateNode);
              } catch (s) {
                xt(
                  e,
                  l,
                  s
                );
              }
          break;
        case 18:
          Ct !== null && (sl ? (l = Ct, e = e.stateNode, l.nodeType === 8 ? Zc(
            l.parentNode,
            e
          ) : l.nodeType === 1 && Zc(l, e), Lu(l)) : Zc(Ct, e.stateNode));
          break;
        case 4:
          n = Ct, a = sl, Ct = e.stateNode.containerInfo, sl = !0, Pl(
            t,
            l,
            e
          ), Ct = n, sl = a;
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
          xt(l, l.return, e);
        }
    }
    function nv(t) {
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
      var e = nv(t);
      l.forEach(function(n) {
        var a = mv.bind(null, t, n);
        e.has(n) || (e.add(n), n.then(a, a));
      });
    }
    function Sl(t, l) {
      var e = l.deletions;
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n], f = t, s = l, d = s;
          t: for (; d !== null; ) {
            switch (d.tag) {
              case 27:
              case 5:
                Ct = d.stateNode, sl = !1;
                break t;
              case 3:
                Ct = d.stateNode.containerInfo, sl = !0;
                break t;
              case 4:
                Ct = d.stateNode.containerInfo, sl = !0;
                break t;
            }
            d = d.return;
          }
          if (Ct === null) throw Error(c(160));
          ch(f, s, a), Ct = null, sl = !1, f = a.alternate, f !== null && (f.return = null), a.return = null;
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
                          for (var d = 0; d < s.length; d++)
                            if (f = s[d], f.getAttribute("href") === (e.href == null ? null : e.href) && f.getAttribute("rel") === (e.rel == null ? null : e.rel) && f.getAttribute("title") === (e.title == null ? null : e.title) && f.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                              s.splice(d, 1);
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
                          for (d = 0; d < s.length; d++)
                            if (f = s[d], f.getAttribute("content") === (e.content == null ? null : "" + e.content) && f.getAttribute("name") === (e.name == null ? null : e.name) && f.getAttribute("property") === (e.property == null ? null : e.property) && f.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && f.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                              s.splice(d, 1);
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
                var A = _.nextSibling, D = _.nodeName;
                _[In] || D === "HEAD" || D === "BODY" || D === "SCRIPT" || D === "STYLE" || D === "LINK" && _.rel.toLowerCase() === "stylesheet" || a.removeChild(_), _ = A;
              }
              for (var w = t.type, z = a.attributes; z.length; )
                a.removeAttributeNode(z[0]);
              $t(a, w, f), a[Jt] = t, a[tl] = f;
            } catch ($) {
              xt(t, t.return, $);
            }
          }
        case 5:
          if (Sl(l, t), bl(t), n & 512 && (Nt || e === null || rl(e, e.return)), t.flags & 32) {
            a = t.stateNode;
            try {
              dn(a, "");
            } catch ($) {
              xt(t, t.return, $);
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
            } catch ($) {
              xt(t, t.return, $);
            }
          }
          break;
        case 3:
          if (ri = null, a = zl, zl = fi(l.containerInfo), Sl(l, t), zl = a, bl(t), n & 4 && e !== null && e.memoizedState.isDehydrated)
            try {
              Lu(l.containerInfo);
            } catch ($) {
              xt(t, t.return, $);
            }
          sc && (sc = !1, oh(t));
          break;
        case 4:
          n = zl, zl = fi(
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
          if (n & 512 && (Nt || e === null || rl(e, e.return)), _ = t.memoizedState !== null, A = e !== null && e.memoizedState !== null, D = Fl, w = Nt, Fl = D || _, Nt = w || A, Sl(l, t), Nt = w, Fl = D, bl(t), l = t.stateNode, l._current = t, l._visibility &= -3, l._visibility |= l._pendingVisibility & 2, n & 8192 && (l._visibility = _ ? l._visibility & -2 : l._visibility | 1, _ && (l = Fl || Nt, e === null || A || l || Rn(t)), t.memoizedProps === null || t.memoizedProps.mode !== "manual"))
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
                      s = A.stateNode, d = A.memoizedProps.style;
                      var O = d != null && d.hasOwnProperty("display") ? d.display : null;
                      s.style.display = O == null || typeof O == "boolean" ? "" : ("" + O).trim();
                    }
                  } catch ($) {
                    xt(A, A.return, $);
                  }
                }
              } else if (l.tag === 6) {
                if (e === null) {
                  A = l;
                  try {
                    A.stateNode.nodeValue = _ ? "" : A.memoizedProps;
                  } catch ($) {
                    xt(A, A.return, $);
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
                Ka(t, f, a);
                break;
              case 5:
                var s = n.stateNode;
                n.flags & 32 && (dn(s, ""), n.flags &= -33);
                var d = cc(t);
                Ka(t, d, s);
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
        } catch (D) {
          xt(t, t.return, D);
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
                xt(n, n.return, A);
              }
            if (n = f, a = n.updateQueue, a !== null) {
              var d = n.stateNode;
              try {
                var _ = a.shared.hiddenCallbacks;
                if (_ !== null)
                  for (a.shared.hiddenCallbacks = null, a = 0; a < _.length; a++)
                    Fo(_[a], d);
              } catch (A) {
                xt(n, n.return, A);
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
              var f = l.memoizedProps, s = f.id, d = f.onPostCommit;
              typeof d == "function" && d(
                s,
                l.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0
              );
            } catch (_) {
              xt(l, l.return, _);
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
        var f = t, s = l, d = e, _ = n, A = s.flags;
        switch (s.tag) {
          case 0:
          case 11:
          case 15:
            Nn(
              f,
              s,
              d,
              _,
              a
            ), zu(8, s);
            break;
          case 23:
            break;
          case 22:
            var D = s.stateNode;
            s.memoizedState !== null ? D._visibility & 4 ? Nn(
              f,
              s,
              d,
              _,
              a
            ) : Ou(
              f,
              s
            ) : (D._visibility |= 4, Nn(
              f,
              s,
              d,
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
              d,
              _,
              a
            ), a && A & 2048 && dc(s.alternate, s);
            break;
          default:
            Nn(
              f,
              s,
              d,
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
          Un(t), t.flags & Du && t.memoizedState !== null && Lv(
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
          zl = fi(t.stateNode.containerInfo), Un(t), zl = l;
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
          t.memoizedState !== null && l._visibility & 4 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -5, $a(t)) : Ru(t);
          break;
        default:
          Ru(t);
      }
    }
    function $a(t) {
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
            Se(8, l, l.return), $a(l);
            break;
          case 22:
            e = l.stateNode, e._visibility & 4 && (e._visibility &= -5, $a(l));
            break;
          default:
            $a(l);
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
    function uv(t, l, e, n) {
      this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Al(t, l, e, n) {
      return new uv(t, l, e, n);
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
    function Ja(t, l, e, n, a, f) {
      var s = 0;
      if (n = t, typeof t == "function") yc(t) && (s = 1);
      else if (typeof t == "string")
        s = jv(
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
          case at:
            return t = Al(19, e, l, a), t.elementType = at, t.lanes = f, t;
          case lt:
            return _h(e, a, f, l);
          default:
            if (typeof t == "object" && t !== null)
              switch (t.$$typeof) {
                case x:
                case R:
                  s = 10;
                  break t;
                case M:
                  s = 9;
                  break t;
                case Z:
                  s = 11;
                  break t;
                case nt:
                  s = 14;
                  break t;
                case F:
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
      t = Al(22, t, n, l), t.elementType = lt, t.lanes = e;
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
    function ka(t, l) {
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
    function av(t, l, e) {
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
          return e = l.stateNode, n = null, t !== null && (n = t.memoizedState.cache), l.memoizedState.cache !== n && (l.flags |= 2048), Wl(Gt), fn(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (su(l) ? te(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Ml !== null && (xc(Ml), Ml = null))), Dt(l), null;
        case 26:
          return e = l.memoizedState, t === null ? (te(l), e !== null ? (Dt(l), ph(l, e)) : (Dt(l), l.flags &= -16777217)) : e ? e !== t.memoizedState ? (te(l), Dt(l), ph(l, e)) : (Dt(l), l.flags &= -16777217) : (t.memoizedProps !== n && te(l), Dt(l), l.flags &= -16777217), null;
        case 27:
          fa(l), e = fe.current;
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
          if (fa(l), e = l.type, t !== null && l.stateNode != null)
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
              switch (a = ii(
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
              t = ii(t).createTextNode(
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
              Ml !== null && (xc(Ml), Ml = null), a = !0;
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
          return e !== t && e && (l.child.flags |= 8192), ka(l, l.updateQueue), Dt(l), null;
        case 4:
          return fn(), t === null && qc(l.stateNode.containerInfo), Dt(l), null;
        case 10:
          return Wl(l.type), Dt(l), null;
        case 19:
          if (zt(Xt), a = l.memoizedState, a === null) return Dt(l), null;
          if (n = (l.flags & 128) !== 0, f = a.rendering, f === null)
            if (n) Nu(a, !1);
            else {
              if (Ut !== 0 || t !== null && (t.flags & 128) !== 0)
                for (t = l.child; t !== null; ) {
                  if (f = Ua(t), f !== null) {
                    for (l.flags |= 128, Nu(a, !1), t = f.updateQueue, l.updateQueue = t, ka(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                      gh(e, t), e = e.sibling;
                    return Et(
                      Xt,
                      Xt.current & 1 | 2
                    ), l.child;
                  }
                  t = t.sibling;
                }
              a.tail !== null && Hl() > Wa && (l.flags |= 128, n = !0, Nu(a, !1), l.lanes = 4194304);
            }
          else {
            if (!n)
              if (t = Ua(f), t !== null) {
                if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, ka(l, t), Nu(a, !0), a.tail === null && a.tailMode === "hidden" && !f.alternate && !gt)
                  return Dt(l), null;
              } else
                2 * Hl() - a.renderingStartTime > Wa && e !== 536870912 && (l.flags |= 128, n = !0, Nu(a, !1), l.lanes = 4194304);
            a.isBackwards ? (f.sibling = l.child, l.child = f) : (t = a.last, t !== null ? t.sibling = f : l.child = f, a.last = f);
          }
          return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Hl(), l.sibling = null, t = Xt.current, Et(Xt, n ? t & 1 | 2 : t & 1), l) : (Dt(l), null);
        case 22:
        case 23:
          return Kl(l), Ef(), n = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (l.flags |= 8192) : n && (l.flags |= 8192), n ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Dt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Dt(l), e = l.updateQueue, e !== null && ka(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), n = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (n = l.memoizedState.cachePool.pool), n !== e && (l.flags |= 2048), t !== null && zt(Ze), null;
        case 24:
          return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Wl(Gt), Dt(l), null;
        case 25:
          return null;
      }
      throw Error(c(156, l.tag));
    }
    function iv(t, l) {
      switch (pf(l), l.tag) {
        case 1:
          return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
        case 3:
          return Wl(Gt), fn(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
        case 26:
        case 27:
        case 5:
          return fa(l), null;
        case 13:
          if (Kl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
            if (l.alternate === null)
              throw Error(c(340));
            ou();
          }
          return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
        case 19:
          return zt(Xt), null;
        case 4:
          return fn(), null;
        case 10:
          return Wl(l.type), null;
        case 22:
        case 23:
          return Kl(l), Ef(), t !== null && zt(Ze), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
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
          fa(l);
          break;
        case 4:
          fn();
          break;
        case 13:
          Kl(l);
          break;
        case 19:
          zt(Xt);
          break;
        case 10:
          Wl(l.type);
          break;
        case 22:
        case 23:
          Kl(l), Ef(), t !== null && zt(Ze);
          break;
        case 24:
          Wl(Gt);
      }
    }
    var fv = {
      getCacheForType: function(t) {
        var l = kt(Gt), e = l.data.get(t);
        return e === void 0 && (e = t(), l.data.set(t, e)), e;
      }
    }, cv = typeof WeakMap == "function" ? WeakMap : Map, Rt = 0, Tt = null, ht = null, mt = 0, Mt = 0, ol = null, le = !1, Hn = !1, gc = !1, ee = 0, Ut = 0, xe = 0, Fe = 0, _c = 0, El = 0, wn = 0, Uu = null, Bl = null, pc = !1, Sc = 0, Wa = 1 / 0, Fa = null, Te = null, Pa = !1, Pe = null, Hu = 0, bc = 0, Ac = null, wu = 0, Ec = null;
    function hl() {
      if ((Rt & 2) !== 0 && mt !== 0)
        return mt & -mt;
      if (Y.T !== null) {
        var t = Tn;
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
      (t === Tt && Mt === 2 || t.cancelPendingCommit !== null) && (qn(t, 0), ne(
        t,
        mt,
        El,
        !1
      )), Pn(t, e), ((Rt & 2) === 0 || t !== Tt) && (t === Tt && ((Rt & 2) === 0 && (Fe |= e), Ut === 4 && ne(
        t,
        mt,
        El,
        !1
      )), Cl(t));
    }
    function Ah(t, l, e) {
      if ((Rt & 6) !== 0) throw Error(c(327));
      var n = !e && (l & 60) === 0 && (l & t.expiredLanes) === 0 || Fn(t, l), a = n ? ov(t, l) : zc(t, l, !0), f = n;
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
          if (e = t.current.alternate, f && !rv(e)) {
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
                var d = t;
                a = Uu;
                var _ = d.current.memoizedState.isDehydrated;
                if (_ && (qn(d, s).flags |= 256), s = zc(
                  d,
                  s,
                  !1
                ), s !== 2) {
                  if (gc && !_) {
                    d.errorRecoveryDisabledLanes |= f, Fe |= f, a = 4;
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
              ), oa(n, 0) !== 0) break t;
              n.timeoutHandle = Kh(
                Eh.bind(
                  null,
                  n,
                  e,
                  Bl,
                  Fa,
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
              Fa,
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
    function Eh(t, l, e, n, a, f, s, d, _, A, D, w, z) {
      var O = l.subtreeFlags;
      if ((O & 8192 || (O & 16785408) === 16785408) && (Gu = { stylesheets: null, count: 0, unsuspend: Vv }, dh(l), l = Kv(), l !== null)) {
        t.cancelPendingCommit = l(
          Rh.bind(
            null,
            t,
            e,
            n,
            a,
            s,
            d,
            _,
            1,
            w,
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
        d,
        _,
        D,
        w,
        z
      );
    }
    function rv(t) {
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
    function Ia() {
      return (Rt & 6) === 0 ? (qu(0), !1) : !0;
    }
    function Tc() {
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
      e !== -1 && (t.timeoutHandle = -1, Ov(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Tc(), Tt = t, ht = e = Ee(t.current, null), mt = l, Mt = 0, ol = null, le = !1, Hn = Fn(t, l), gc = !1, wn = El = _c = Fe = xe = Ut = 0, Bl = Uu = null, pc = !1, (l & 8) !== 0 && (l |= l & 32);
      var n = t.entangledLanes;
      if (n !== 0)
        for (t = t.entanglements, n &= l; 0 < n; ) {
          var a = 31 - fl(n), f = 1 << a;
          l |= t[a], n &= ~f;
        }
      return ee = l, Ea(), e;
    }
    function xh(t, l) {
      rt = null, Y.H = Yl, l === du ? (l = Cs(), Mt = 3) : l === qs ? (l = Cs(), Mt = 4) : Mt = l === Bo ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, ol = l, ht === null && (Ut = 1, ja(
        t,
        ml(l, t.current)
      ));
    }
    function Th() {
      var t = Y.H;
      return Y.H = Yl, t === null ? Yl : t;
    }
    function Mh() {
      var t = Y.A;
      return Y.A = fv, t;
    }
    function Mc() {
      Ut = 4, le || (mt & 4194176) !== mt && pl.current !== null || (Hn = !0), (xe & 134217727) === 0 && (Fe & 134217727) === 0 || Tt === null || ne(
        Tt,
        mt,
        El,
        !1
      );
    }
    function zc(t, l, e) {
      var n = Rt;
      Rt |= 2;
      var a = Th(), f = Mh();
      (Tt !== t || mt !== l) && (Fa = null, qn(t, l)), l = !1;
      var s = Ut;
      t: do
        try {
          if (Mt !== 0 && ht !== null) {
            var d = ht, _ = ol;
            switch (Mt) {
              case 8:
                Tc(), s = 6;
                break t;
              case 3:
              case 2:
              case 6:
                pl.current === null && (l = !0);
                var A = Mt;
                if (Mt = 0, ol = null, Yn(t, d, _, A), e && Hn) {
                  s = 0;
                  break t;
                }
                break;
              default:
                A = Mt, Mt = 0, ol = null, Yn(t, d, _, A);
            }
          }
          sv(), s = Ut;
          break;
        } catch (D) {
          xh(t, D);
        }
      while (!0);
      return l && t.shellSuspendCounter++, kl = $e = null, Rt = n, Y.H = a, Y.A = f, ht === null && (Tt = null, mt = 0, Ea()), s;
    }
    function sv() {
      for (; ht !== null; ) zh(ht);
    }
    function ov(t, l) {
      var e = Rt;
      Rt |= 2;
      var n = Th(), a = Mh();
      Tt !== t || mt !== l ? (Fa = null, Wa = Hl() + 500, qn(t, l)) : Hn = Fn(
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
                  Mt === 2 && Tt === t && (Mt = 7), Cl(t);
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
                    var d = ht;
                    if (!s || n0(s)) {
                      Mt = 0, ol = null;
                      var _ = d.sibling;
                      if (_ !== null) ht = _;
                      else {
                        var A = d.return;
                        A !== null ? (ht = A, ti(A)) : ht = null;
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
                Tc(), Ut = 6;
                break t;
              default:
                throw Error(c(462));
            }
          }
          hv();
          break;
        } catch (D) {
          xh(t, D);
        }
      while (!0);
      return kl = $e = null, Y.H = n, Y.A = a, Rt = e, ht !== null ? 0 : (Tt = null, mt = 0, Ea(), Ut);
    }
    function hv() {
      for (; ht !== null && !wd(); )
        zh(ht);
    }
    function zh(t) {
      var l = ko(t.alternate, t, ee);
      t.memoizedProps = t.pendingProps, l === null ? ti(t) : ht = l;
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
      t.memoizedProps = t.pendingProps, l === null ? ti(t) : ht = l;
    }
    function Yn(t, l, e, n) {
      kl = $e = null, Nf(l), En = null, vu = 0;
      var a = l.return;
      try {
        if (tv(
          t,
          a,
          l,
          e,
          mt
        )) {
          Ut = 1, ja(
            t,
            ml(e, t.current)
          ), ht = null;
          return;
        }
      } catch (f) {
        if (a !== null) throw ht = a, f;
        Ut = 1, ja(
          t,
          ml(e, t.current)
        ), ht = null;
        return;
      }
      l.flags & 32768 ? (gt || n === 1 ? t = !0 : Hn || (mt & 536870912) !== 0 ? t = !1 : (le = t = !0, (n === 2 || n === 3 || n === 6) && (n = pl.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Dh(l, t)) : ti(l);
    }
    function ti(t) {
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
        var e = av(
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
        var e = iv(t.alternate, t);
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
    function Rh(t, l, e, n, a, f, s, d, _, A) {
      var D = Y.T, w = C.p;
      try {
        C.p = 2, Y.T = null, dv(
          t,
          l,
          e,
          n,
          w,
          a,
          f,
          s,
          d,
          _,
          A
        );
      } finally {
        Y.T = D, C.p = w;
      }
    }
    function dv(t, l, e, n, a, f, s, d) {
      do
        Bn();
      while (Pe !== null);
      if ((Rt & 6) !== 0) throw Error(c(327));
      var _ = t.finishedWork;
      if (n = t.finishedLanes, _ === null) return null;
      if (t.finishedWork = null, t.finishedLanes = 0, _ === t.current) throw Error(c(177));
      t.callbackNode = null, t.callbackPriority = 0, t.cancelPendingCommit = null;
      var A = _.lanes | _.childLanes;
      if (A |= mf, Ld(
        t,
        n,
        A,
        f,
        s,
        d
      ), t === Tt && (ht = Tt = null, mt = 0), (_.subtreeFlags & 10256) === 0 && (_.flags & 10256) === 0 || Pa || (Pa = !0, bc = A, Ac = e, gv(ca, function() {
        return Bn(), null;
      })), e = (_.flags & 15990) !== 0, (_.subtreeFlags & 15990) !== 0 || e ? (e = Y.T, Y.T = null, f = C.p, C.p = 2, s = Rt, Rt |= 4, ev(t, _), sh(_, t), By(Xc, t.containerInfo), hi = !!Cc, Xc = Cc = null, t.current = _, ih(t, _.alternate, _), qd(), Rt = s, C.p = f, Y.T = e) : t.current = _, Pa ? (Pa = !1, Pe = t, Hu = n) : Nh(t, A), A = t.pendingLanes, A === 0 && (Te = null), Gd(_.stateNode), Cl(t), l !== null)
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
        var e = Xr(Hu), n = Y.T, a = C.p;
        try {
          if (C.p = 32 > e ? 32 : e, Y.T = null, Pe === null)
            var f = !1;
          else {
            e = Ac, Ac = null;
            var s = Pe, d = Hu;
            if (Pe = null, Hu = 0, (Rt & 6) !== 0)
              throw Error(c(331));
            var _ = Rt;
            if (Rt |= 4, vh(s.current), hh(s, s.current, d, e), Rt = _, qu(0, !1), il && typeof il.onPostCommitFiberRoot == "function")
              try {
                il.onPostCommitFiberRoot(Wn, s);
              } catch {
              }
            f = !0;
          }
          return f;
        } finally {
          C.p = a, Y.T = n, Nh(t, l);
        }
      }
      return !1;
    }
    function Uh(t, l, e) {
      l = ml(e, l), l = Lf(t.stateNode, l, 2), t = pe(t, l, 2), t !== null && (Pn(t, 2), Cl(t));
    }
    function xt(t, l, e) {
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
            if (typeof l.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Te === null || !Te.has(n))) {
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
        n = t.pingCache = new cv();
        var a = /* @__PURE__ */ new Set();
        n.set(l, a);
      } else
        a = n.get(l), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(l, a));
      a.has(e) || (gc = !0, a.add(e), t = yv.bind(null, t, l, e), l.then(t, t));
    }
    function yv(t, l, e) {
      var n = t.pingCache;
      n !== null && n.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Tt === t && (mt & e) === e && (Ut === 4 || Ut === 3 && (mt & 62914560) === mt && 300 > Hl() - Sc ? (Rt & 2) === 0 && qn(t, 0) : _c |= e, wn === mt && (wn = 0)), Cl(t);
    }
    function Hh(t, l) {
      l === 0 && (l = Yr()), t = oe(t, l), t !== null && (Pn(t, l), Cl(t));
    }
    function vv(t) {
      var l = t.memoizedState, e = 0;
      l !== null && (e = l.retryLane), Hh(t, e);
    }
    function mv(t, l) {
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
    function gv(t, l) {
      return Li(t, l);
    }
    var li = null, Cn = null, Dc = !1, ei = !1, Rc = !1, Ie = 0;
    function Cl(t) {
      t !== Cn && t.next === null && (Cn === null ? li = Cn = t : Cn = Cn.next = t), ei = !0, Dc || (Dc = !0, pv(_v));
    }
    function qu(t, l) {
      if (!Rc && ei) {
        Rc = !0;
        do
          for (var e = !1, n = li; n !== null; ) {
            if (t !== 0) {
              var a = n.pendingLanes;
              if (a === 0) var f = 0;
              else {
                var s = n.suspendedLanes, d = n.pingedLanes;
                f = (1 << 31 - fl(42 | t) + 1) - 1, f &= a & ~(s & ~d), f = f & 201326677 ? f & 201326677 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (e = !0, Yh(n, f));
            } else
              f = mt, f = oa(
                n,
                n === Tt ? f : 0
              ), (f & 3) === 0 || Fn(n, f) || (e = !0, Yh(n, f));
            n = n.next;
          }
        while (e);
        Rc = !1;
      }
    }
    function _v() {
      ei = Dc = !1;
      var t = 0;
      Ie !== 0 && (zv() && (t = Ie), Ie = 0);
      for (var l = Hl(), e = null, n = li; n !== null; ) {
        var a = n.next, f = wh(n, l);
        f === 0 ? (n.next = null, e === null ? li = a : e.next = a, a === null && (Cn = e)) : (e = n, (t !== 0 || (f & 3) !== 0) && (ei = !0)), n = a;
      }
      qu(t);
    }
    function wh(t, l) {
      for (var e = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, f = t.pendingLanes & -62914561; 0 < f; ) {
        var s = 31 - fl(f), d = 1 << s, _ = a[s];
        _ === -1 ? ((d & e) === 0 || (d & n) !== 0) && (a[s] = Vd(d, l)) : _ <= l && (t.expiredLanes |= d), f &= ~d;
      }
      if (l = Tt, e = mt, e = oa(
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
            e = ca;
            break;
          case 268435456:
            e = wr;
            break;
          default:
            e = ca;
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
      return n = oa(
        t,
        t === Tt ? n : 0
      ), n === 0 ? null : (Ah(t, n, l), wh(t, Hl()), t.callbackNode != null && t.callbackNode === e ? qh.bind(null, t) : null);
    }
    function Yh(t, l) {
      if (Bn()) return null;
      Ah(t, l, !0);
    }
    function pv(t) {
      Dv(function() {
        (Rt & 6) !== 0 ? Li(Ur, t) : t();
      });
    }
    function Nc() {
      return Ie === 0 && (Ie = qr()), Ie;
    }
    function Bh(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ma("" + t);
    }
    function Ch(t, l) {
      var e = l.ownerDocument.createElement("input");
      return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
    }
    function Sv(t, l, e, n, a) {
      if (l === "submit" && e && e.stateNode === a) {
        var f = Bh(
          (a[tl] || null).action
        ), s = n.submitter;
        s && (l = (l = s[tl] || null) ? Bh(l.formAction) : s.getAttribute("formAction"), l !== null && (f = l, s = null));
        var d = new Sa(
          "action",
          "action",
          null,
          n,
          a
        );
        t.push({
          event: d,
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
                  typeof f == "function" && (d.preventDefault(), _ = s ? Ch(a, s) : new FormData(a), Gf(
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
      var Hc = Ds[Uc], bv = Hc.toLowerCase(), Av = Hc[0].toUpperCase() + Hc.slice(1);
      Tl(
        bv,
        "on" + Av
      );
    }
    Tl(xs, "onAnimationEnd"), Tl(Ts, "onAnimationIteration"), Tl(Ms, "onAnimationStart"), Tl("dblclick", "onDoubleClick"), Tl("focusin", "onFocus"), Tl("focusout", "onBlur"), Tl(Xy, "onTransitionRun"), Tl(Gy, "onTransitionStart"), Tl(Qy, "onTransitionCancel"), Tl(zs, "onTransitionEnd"), on("onMouseEnter", ["mouseout", "mouseover"]), on("onMouseLeave", ["mouseout", "mouseover"]), on("onPointerEnter", ["pointerout", "pointerover"]), on("onPointerLeave", ["pointerout", "pointerover"]), we(
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
    ), Ev = new Set(
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
              var d = n[s], _ = d.instance, A = d.currentTarget;
              if (d = d.listener, _ !== f && a.isPropagationStopped())
                break t;
              f = d, a.currentTarget = A;
              try {
                f(a);
              } catch (D) {
                Za(D);
              }
              a.currentTarget = null, f = _;
            }
          else
            for (s = 0; s < n.length; s++) {
              if (d = n[s], _ = d.instance, A = d.currentTarget, d = d.listener, _ !== f && a.isPropagationStopped())
                break t;
              f = d, a.currentTarget = A;
              try {
                f(a);
              } catch (D) {
                Za(D);
              }
              a.currentTarget = null, f = _;
            }
        }
      }
    }
    function dt(t, l) {
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
    var ni = "_reactListening" + Math.random().toString(36).slice(2);
    function qc(t) {
      if (!t[ni]) {
        t[ni] = !0, Zr.forEach(function(e) {
          e !== "selectionchange" && (Ev.has(e) || wc(e, !1, t), wc(e, !0, t));
        });
        var l = t.nodeType === 9 ? t : t.ownerDocument;
        l === null || l[ni] || (l[ni] = !0, wc("selectionchange", !1, l));
      }
    }
    function Gh(t, l, e, n) {
      switch (r0(l)) {
        case 2:
          var a = kv;
          break;
        case 8:
          a = Wv;
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
            var d = n.stateNode.containerInfo;
            if (d === a || d.nodeType === 8 && d.parentNode === a)
              break;
            if (s === 4)
              for (s = n.return; s !== null; ) {
                var _ = s.tag;
                if ((_ === 3 || _ === 4) && (_ = s.stateNode.containerInfo, _ === a || _.nodeType === 8 && _.parentNode === a))
                  return;
                s = s.return;
              }
            for (; d !== null; ) {
              if (s = He(d), s === null) return;
              if (_ = s.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
                n = f = s;
                continue t;
              }
              d = d.parentNode;
            }
          }
          n = n.return;
        }
      ts(function() {
        var A = f, D = tf(e), w = [];
        t: {
          var z = Os.get(t);
          if (z !== void 0) {
            var O = Sa, $ = t;
            switch (t) {
              case "keypress":
                if (_a(e) === 0) break t;
              case "keydown":
              case "keyup":
                O = my;
                break;
              case "focusin":
                $ = "focus", O = ff;
                break;
              case "focusout":
                $ = "blur", O = ff;
                break;
              case "beforeblur":
              case "afterblur":
                O = ff;
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
                O = ns;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                O = uy;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                O = py;
                break;
              case xs:
              case Ts:
              case Ms:
                O = fy;
                break;
              case zs:
                O = by;
                break;
              case "scroll":
              case "scrollend":
                O = ey;
                break;
              case "wheel":
                O = Ey;
                break;
              case "copy":
              case "cut":
              case "paste":
                O = ry;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                O = as;
                break;
              case "toggle":
              case "beforetoggle":
                O = Ty;
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
            0 < it.length && (z = new O(
              z,
              $,
              null,
              e,
              D
            ), w.push({ event: z, listeners: it }));
          }
        }
        if ((l & 7) === 0) {
          t: {
            if (z = t === "mouseover" || t === "pointerover", O = t === "mouseout" || t === "pointerout", z && e !== Ii && ($ = e.relatedTarget || e.fromElement) && (He($) || $[cn]))
              break t;
            if ((O || z) && (z = D.window === D ? D : (z = D.ownerDocument) ? z.defaultView || z.parentWindow : window, O ? ($ = e.relatedTarget || e.toElement, O = A, $ = $ ? He($) : null, $ !== null && (Ht = Q($), it = $.tag, $ !== Ht || it !== 5 && it !== 27 && it !== 6) && ($ = null)) : (O = null, $ = A), O !== $)) {
              if (it = ns, U = "onMouseLeave", E = "onMouseEnter", b = "mouse", (t === "pointerout" || t === "pointerover") && (it = as, U = "onPointerLeave", E = "onPointerEnter", b = "pointer"), Ht = O == null ? z : tu(O), T = $ == null ? z : tu($), z = new it(
                U,
                b + "leave",
                O,
                e,
                D
              ), z.target = Ht, z.relatedTarget = T, U = null, He(D) === A && (it = new it(
                E,
                b + "enter",
                $,
                e,
                D
              ), it.target = T, it.relatedTarget = Ht, U = it), Ht = U, O && $)
                l: {
                  for (it = O, E = $, b = 0, T = it; T; T = Xn(T))
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
              O !== null && Qh(
                w,
                z,
                O,
                it,
                !1
              ), $ !== null && Ht !== null && Qh(
                w,
                Ht,
                $,
                it,
                !0
              );
            }
          }
          t: {
            if (z = A ? tu(A) : window, O = z.nodeName && z.nodeName.toLowerCase(), O === "select" || O === "input" && z.type === "file")
              var V = ds;
            else if (os(z))
              if (ys)
                V = qy;
              else {
                V = Hy;
                var st = Uy;
              }
            else
              O = z.nodeName, !O || O.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? A && Pi(A.elementType) && (V = ds) : V = wy;
            if (V && (V = V(t, A))) {
              hs(
                w,
                V,
                e,
                D
              );
              break t;
            }
            st && st(t, z, A), t === "focusout" && A && z.type === "number" && A.memoizedProps.value != null && Fi(z, "number", z.value);
          }
          switch (st = A ? tu(A) : window, t) {
            case "focusin":
              (os(st) || st.contentEditable === "true") && (gn = st, df = A, ru = null);
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
              yf = !1, As(w, e, D);
              break;
            case "selectionchange":
              if (Cy) break;
            case "keydown":
            case "keyup":
              As(w, e, D);
          }
          var k;
          if (rf)
            t: {
              switch (t) {
                case "compositionstart":
                  var tt = "onCompositionStart";
                  break t;
                case "compositionend":
                  tt = "onCompositionEnd";
                  break t;
                case "compositionupdate":
                  tt = "onCompositionUpdate";
                  break t;
              }
              tt = void 0;
            }
          else
            mn ? rs(t, e) && (tt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (tt = "onCompositionStart");
          tt && (is && e.locale !== "ko" && (mn || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && mn && (k = ls()) : (se = D, nf = "value" in se ? se.value : se.textContent, mn = !0)), st = ui(A, tt), 0 < st.length && (tt = new us(
            tt,
            t,
            null,
            e,
            D
          ), w.push({ event: tt, listeners: st }), k ? tt.data = k : (k = ss(e), k !== null && (tt.data = k)))), (k = zy ? Oy(t, e) : Dy(t, e)) && (tt = ui(A, "onBeforeInput"), 0 < tt.length && (st = new us(
            "onBeforeInput",
            "beforeinput",
            null,
            e,
            D
          ), w.push({
            event: st,
            listeners: tt
          }), st.data = k)), Sv(
            w,
            t,
            A,
            e,
            D
          );
        }
        Xh(w, l);
      });
    }
    function Bu(t, l, e) {
      return {
        instance: t,
        listener: l,
        currentTarget: e
      };
    }
    function ui(t, l) {
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
        var d = e, _ = d.alternate, A = d.stateNode;
        if (d = d.tag, _ !== null && _ === n) break;
        d !== 5 && d !== 26 && d !== 27 || A === null || (_ = A, a ? (A = lu(e, f), A != null && s.unshift(
          Bu(e, A, _)
        )) : a || (A = lu(e, f), A != null && s.push(
          Bu(e, A, _)
        ))), e = e.return;
      }
      s.length !== 0 && t.push({ event: l, listeners: s });
    }
    var xv = /\r\n?/g, Tv = /\u0000|\uFFFD/g;
    function Zh(t) {
      return (typeof t == "string" ? t : "" + t).replace(xv, `
`).replace(Tv, "");
    }
    function jh(t, l) {
      return l = Zh(l), Zh(t) === l;
    }
    function ai() {
    }
    function At(t, l, e, n, a, f) {
      switch (e) {
        case "children":
          typeof n == "string" ? l === "body" || l === "textarea" && n === "" || dn(t, n) : (typeof n == "number" || typeof n == "bigint") && l !== "body" && dn(t, "" + n);
          break;
        case "className":
          da(t, "class", n);
          break;
        case "tabIndex":
          da(t, "tabindex", n);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          da(t, e, n);
          break;
        case "style":
          Pr(t, n, f);
          break;
        case "data":
          if (l !== "object") {
            da(t, "data", n);
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
          n = ma("" + n), t.setAttribute(e, n);
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
            typeof f == "function" && (e === "formAction" ? (l !== "input" && At(t, l, "name", a.name, a, null), At(
              t,
              l,
              "formEncType",
              a.formEncType,
              a,
              null
            ), At(
              t,
              l,
              "formMethod",
              a.formMethod,
              a,
              null
            ), At(
              t,
              l,
              "formTarget",
              a.formTarget,
              a,
              null
            )) : (At(t, l, "encType", a.encType, a, null), At(t, l, "method", a.method, a, null), At(t, l, "target", a.target, a, null)));
          if (n == null || typeof n == "symbol" || typeof n == "boolean") {
            t.removeAttribute(e);
            break;
          }
          n = ma("" + n), t.setAttribute(e, n);
          break;
        case "onClick":
          n != null && (t.onclick = ai);
          break;
        case "onScroll":
          n != null && dt("scroll", t);
          break;
        case "onScrollEnd":
          n != null && dt("scrollend", t);
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
          e = ma("" + n), t.setAttributeNS(
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
          dt("beforetoggle", t), dt("toggle", t), ha(t, "popover", n);
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
          ha(t, "is", n);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = ty.get(e) || e, ha(t, e, n));
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
          n != null && dt("scroll", t);
          break;
        case "onScrollEnd":
          n != null && dt("scrollend", t);
          break;
        case "onClick":
          n != null && (t.onclick = ai);
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
              e in t ? t[e] = n : n === !0 ? t.setAttribute(e, "") : ha(t, e, n);
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
          dt("error", t), dt("load", t);
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
                    At(t, l, f, s, e, null);
                }
            }
          a && At(t, l, "srcSet", e.srcSet, e, null), n && At(t, l, "src", e.src, e, null);
          return;
        case "input":
          dt("invalid", t);
          var d = f = s = a = null, _ = null, A = null;
          for (n in e)
            if (e.hasOwnProperty(n)) {
              var D = e[n];
              if (D != null)
                switch (n) {
                  case "name":
                    a = D;
                    break;
                  case "type":
                    s = D;
                    break;
                  case "checked":
                    _ = D;
                    break;
                  case "defaultChecked":
                    A = D;
                    break;
                  case "value":
                    f = D;
                    break;
                  case "defaultValue":
                    d = D;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (D != null)
                      throw Error(c(137, l));
                    break;
                  default:
                    At(t, l, n, D, e, null);
                }
            }
          Jr(
            t,
            f,
            d,
            _,
            A,
            s,
            a,
            !1
          ), ya(t);
          return;
        case "select":
          dt("invalid", t), n = s = f = null;
          for (a in e)
            if (e.hasOwnProperty(a) && (d = e[a], d != null))
              switch (a) {
                case "value":
                  f = d;
                  break;
                case "defaultValue":
                  s = d;
                  break;
                case "multiple":
                  n = d;
                default:
                  At(t, l, a, d, e, null);
              }
          l = f, e = s, t.multiple = !!n, l != null ? hn(t, !!n, l, !1) : e != null && hn(t, !!n, e, !0);
          return;
        case "textarea":
          dt("invalid", t), f = a = n = null;
          for (s in e)
            if (e.hasOwnProperty(s) && (d = e[s], d != null))
              switch (s) {
                case "value":
                  n = d;
                  break;
                case "defaultValue":
                  a = d;
                  break;
                case "children":
                  f = d;
                  break;
                case "dangerouslySetInnerHTML":
                  if (d != null) throw Error(c(91));
                  break;
                default:
                  At(t, l, s, d, e, null);
              }
          Wr(t, n, a, f), ya(t);
          return;
        case "option":
          for (_ in e)
            if (e.hasOwnProperty(_) && (n = e[_], n != null))
              switch (_) {
                case "selected":
                  t.selected = n && typeof n != "function" && typeof n != "symbol";
                  break;
                default:
                  At(t, l, _, n, e, null);
              }
          return;
        case "dialog":
          dt("cancel", t), dt("close", t);
          break;
        case "iframe":
        case "object":
          dt("load", t);
          break;
        case "video":
        case "audio":
          for (n = 0; n < Yu.length; n++)
            dt(Yu[n], t);
          break;
        case "image":
          dt("error", t), dt("load", t);
          break;
        case "details":
          dt("toggle", t);
          break;
        case "embed":
        case "source":
        case "link":
          dt("error", t), dt("load", t);
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
                  At(t, l, A, n, e, null);
              }
          return;
        default:
          if (Pi(l)) {
            for (D in e)
              e.hasOwnProperty(D) && (n = e[D], n !== void 0 && Bc(
                t,
                l,
                D,
                n,
                e,
                void 0
              ));
            return;
          }
      }
      for (d in e)
        e.hasOwnProperty(d) && (n = e[d], n != null && At(t, l, d, n, e, null));
    }
    function Mv(t, l, e, n) {
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
          var a = null, f = null, s = null, d = null, _ = null, A = null, D = null;
          for (O in e) {
            var w = e[O];
            if (e.hasOwnProperty(O) && w != null)
              switch (O) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  _ = w;
                default:
                  n.hasOwnProperty(O) || At(t, l, O, null, n, w);
              }
          }
          for (var z in n) {
            var O = n[z];
            if (w = e[z], n.hasOwnProperty(z) && (O != null || w != null))
              switch (z) {
                case "type":
                  f = O;
                  break;
                case "name":
                  a = O;
                  break;
                case "checked":
                  A = O;
                  break;
                case "defaultChecked":
                  D = O;
                  break;
                case "value":
                  s = O;
                  break;
                case "defaultValue":
                  d = O;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (O != null)
                    throw Error(c(137, l));
                  break;
                default:
                  O !== w && At(
                    t,
                    l,
                    z,
                    O,
                    n,
                    w
                  );
              }
          }
          Wi(
            t,
            s,
            d,
            _,
            A,
            D,
            f,
            a
          );
          return;
        case "select":
          O = s = d = z = null;
          for (f in e)
            if (_ = e[f], e.hasOwnProperty(f) && _ != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  O = _;
                default:
                  n.hasOwnProperty(f) || At(
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
                  d = f;
                  break;
                case "multiple":
                  s = f;
                default:
                  f !== _ && At(
                    t,
                    l,
                    a,
                    f,
                    n,
                    _
                  );
              }
          l = d, e = s, n = O, z != null ? hn(t, !!e, z, !1) : !!n != !!e && (l != null ? hn(t, !!e, l, !0) : hn(t, !!e, e ? [] : "", !1));
          return;
        case "textarea":
          O = z = null;
          for (d in e)
            if (a = e[d], e.hasOwnProperty(d) && a != null && !n.hasOwnProperty(d))
              switch (d) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  At(t, l, d, null, n, a);
              }
          for (s in n)
            if (a = n[s], f = e[s], n.hasOwnProperty(s) && (a != null || f != null))
              switch (s) {
                case "value":
                  z = a;
                  break;
                case "defaultValue":
                  O = a;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (a != null) throw Error(c(91));
                  break;
                default:
                  a !== f && At(t, l, s, a, n, f);
              }
          kr(t, z, O);
          return;
        case "option":
          for (var $ in e)
            if (z = e[$], e.hasOwnProperty($) && z != null && !n.hasOwnProperty($))
              switch ($) {
                case "selected":
                  t.selected = !1;
                  break;
                default:
                  At(
                    t,
                    l,
                    $,
                    null,
                    n,
                    z
                  );
              }
          for (_ in n)
            if (z = n[_], O = e[_], n.hasOwnProperty(_) && z !== O && (z != null || O != null))
              switch (_) {
                case "selected":
                  t.selected = z && typeof z != "function" && typeof z != "symbol";
                  break;
                default:
                  At(
                    t,
                    l,
                    _,
                    z,
                    n,
                    O
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
            z = e[it], e.hasOwnProperty(it) && z != null && !n.hasOwnProperty(it) && At(t, l, it, null, n, z);
          for (A in n)
            if (z = n[A], O = e[A], n.hasOwnProperty(A) && z !== O && (z != null || O != null))
              switch (A) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(c(137, l));
                  break;
                default:
                  At(
                    t,
                    l,
                    A,
                    z,
                    n,
                    O
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
            for (D in n)
              z = n[D], O = e[D], !n.hasOwnProperty(D) || z === O || z === void 0 && O === void 0 || Bc(
                t,
                l,
                D,
                z,
                n,
                O
              );
            return;
          }
      }
      for (var E in e)
        z = e[E], e.hasOwnProperty(E) && z != null && !n.hasOwnProperty(E) && At(t, l, E, null, n, z);
      for (w in n)
        z = n[w], O = e[w], !n.hasOwnProperty(w) || z === O || z == null && O == null || At(t, l, w, z, n, O);
    }
    var Cc = null, Xc = null;
    function ii(t) {
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
    function zv() {
      var t = window.event;
      return t && t.type === "popstate" ? t === Qc ? !1 : (Qc = t, !0) : (Qc = null, !1);
    }
    var Kh = typeof setTimeout == "function" ? setTimeout : void 0, Ov = typeof clearTimeout == "function" ? clearTimeout : void 0, $h = typeof Promise == "function" ? Promise : void 0, Dv = typeof queueMicrotask == "function" ? queueMicrotask : typeof $h < "u" ? function(t) {
      return $h.resolve(null).then(t).catch(Rv);
    } : Kh;
    function Rv(t) {
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
    function Nv(t, l, e, n) {
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
    function Uv(t, l, e) {
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
      switch (l = ii(e), t) {
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
    function fi(t) {
      return typeof t.getRootNode == "function" ? t.getRootNode() : t.ownerDocument;
    }
    var ue = C.d;
    C.d = {
      f: Hv,
      r: wv,
      D: qv,
      C: Yv,
      L: Bv,
      m: Cv,
      X: Gv,
      S: Xv,
      M: Qv
    };
    function Hv() {
      var t = ue.f(), l = Ia();
      return t || l;
    }
    function wv(t) {
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
    function qv(t) {
      ue.D(t), Fh("dns-prefetch", t, null);
    }
    function Yv(t, l) {
      ue.C(t, l), Fh("preconnect", t, l);
    }
    function Bv(t, l, e) {
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
        xl.has(f) || (t = I(
          {
            rel: "preload",
            href: l === "image" && e && e.imageSrcSet ? void 0 : t,
            as: l
          },
          e
        ), xl.set(f, t), n.querySelector(a) !== null || l === "style" && n.querySelector(Cu(f)) || l === "script" && n.querySelector(Xu(f)) || (l = n.createElement("link"), $t(l, "link", t), Qt(l), n.head.appendChild(l)));
      }
    }
    function Cv(t, l) {
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
        if (!xl.has(f) && (t = I({ rel: "modulepreload", href: t }, l), xl.set(f, t), e.querySelector(a) === null)) {
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
    function Xv(t, l, e) {
      ue.S(t, l, e);
      var n = Gn;
      if (n && t) {
        var a = sn(n).hoistableStyles, f = Qn(t);
        l = l || "default";
        var s = a.get(f);
        if (!s) {
          var d = { loading: 0, preload: null };
          if (s = n.querySelector(
            Cu(f)
          ))
            d.loading = 5;
          else {
            t = I(
              { rel: "stylesheet", href: t, "data-precedence": l },
              e
            ), (e = xl.get(f)) && Vc(t, e);
            var _ = s = n.createElement("link");
            Qt(_), $t(_, "link", t), _._p = new Promise(function(A, D) {
              _.onload = A, _.onerror = D;
            }), _.addEventListener("load", function() {
              d.loading |= 1;
            }), _.addEventListener("error", function() {
              d.loading |= 2;
            }), d.loading |= 4, ci(s, l, n);
          }
          s = {
            type: "stylesheet",
            instance: s,
            count: 1,
            state: d
          }, a.set(f, s);
        }
      }
    }
    function Gv(t, l) {
      ue.X(t, l);
      var e = Gn;
      if (e && t) {
        var n = sn(e).hoistableScripts, a = Zn(t), f = n.get(a);
        f || (f = e.querySelector(Xu(a)), f || (t = I({ src: t, async: !0 }, l), (l = xl.get(a)) && Lc(t, l), f = e.createElement("script"), Qt(f), $t(f, "link", t), e.head.appendChild(f)), f = {
          type: "script",
          instance: f,
          count: 1,
          state: null
        }, n.set(a, f));
      }
    }
    function Qv(t, l) {
      ue.M(t, l);
      var e = Gn;
      if (e && t) {
        var n = sn(e).hoistableScripts, a = Zn(t), f = n.get(a);
        f || (f = e.querySelector(Xu(a)), f || (t = I({ src: t, async: !0, type: "module" }, l), (l = xl.get(a)) && Lc(t, l), f = e.createElement("script"), Qt(f), $t(f, "link", t), e.head.appendChild(f)), f = {
          type: "script",
          instance: f,
          count: 1,
          state: null
        }, n.set(a, f));
      }
    }
    function Ph(t, l, e, n) {
      var a = (a = fe.current) ? fi(a) : null;
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
            }, xl.set(t, e), f || Zv(
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
      return I({}, t, {
        "data-precedence": t.precedence,
        precedence: null
      });
    }
    function Zv(t, l, e, n) {
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
            var a = I({}, e, {
              "data-href": e.href,
              "data-precedence": e.precedence,
              href: null,
              precedence: null
            });
            return n = (t.ownerDocument || t).createElement(
              "style"
            ), Qt(n), $t(n, "style", a), ci(n, e.precedence, t), l.instance = n;
          case "stylesheet":
            a = Qn(e.href);
            var f = t.querySelector(
              Cu(a)
            );
            if (f)
              return l.state.loading |= 4, l.instance = f, Qt(f), f;
            n = Ih(e), (a = xl.get(a)) && Vc(n, a), f = (t.ownerDocument || t).createElement("link"), Qt(f);
            var s = f;
            return s._p = new Promise(function(d, _) {
              s.onload = d, s.onerror = _;
            }), $t(f, "link", n), l.state.loading |= 4, ci(f, e.precedence, t), l.instance = f;
          case "script":
            return f = Zn(e.src), (a = t.querySelector(
              Xu(f)
            )) ? (l.instance = a, Qt(a), a) : (n = e, (a = xl.get(f)) && (n = I({}, e), Lc(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), Qt(a), $t(a, "link", n), t.head.appendChild(a), l.instance = a);
          case "void":
            return null;
          default:
            throw Error(c(443, l.type));
        }
      else
        l.type === "stylesheet" && (l.state.loading & 4) === 0 && (n = l.instance, l.state.loading |= 4, ci(n, e.precedence, t));
      return l.instance;
    }
    function ci(t, l, e) {
      for (var n = e.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), a = n.length ? n[n.length - 1] : null, f = a, s = 0; s < n.length; s++) {
        var d = n[s];
        if (d.dataset.precedence === l) f = d;
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
    var ri = null;
    function l0(t, l, e) {
      if (ri === null) {
        var n = /* @__PURE__ */ new Map(), a = ri = /* @__PURE__ */ new Map();
        a.set(e, n);
      } else
        a = ri, n = a.get(e), n || (n = /* @__PURE__ */ new Map(), a.set(e, n));
      if (n.has(t)) return n;
      for (n.set(t, null), e = e.getElementsByTagName(t), a = 0; a < e.length; a++) {
        var f = e[a];
        if (!(f[In] || f[Jt] || t === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
          var s = f.getAttribute(l) || "";
          s = t + s;
          var d = n.get(s);
          d ? d.push(f) : n.set(s, [f]);
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
    function jv(t, l, e) {
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
    function Vv() {
    }
    function Lv(t, l, e) {
      if (Gu === null) throw Error(c(475));
      var n = Gu;
      if (l.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (l.state.loading & 4) === 0) {
        if (l.instance === null) {
          var a = Qn(e.href), f = t.querySelector(
            Cu(a)
          );
          if (f) {
            t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (n.count++, n = si.bind(n), t.then(n, n)), l.state.loading |= 4, l.instance = f, Qt(f);
            return;
          }
          f = t.ownerDocument || t, e = Ih(e), (a = xl.get(a)) && Vc(e, a), f = f.createElement("link"), Qt(f);
          var s = f;
          s._p = new Promise(function(d, _) {
            s.onload = d, s.onerror = _;
          }), $t(f, "link", e), l.instance = f;
        }
        n.stylesheets === null && (n.stylesheets = /* @__PURE__ */ new Map()), n.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (n.count++, l = si.bind(n), t.addEventListener("load", l), t.addEventListener("error", l));
      }
    }
    function Kv() {
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
    function si() {
      if (this.count--, this.count === 0) {
        if (this.stylesheets) Kc(this, this.stylesheets);
        else if (this.unsuspend) {
          var t = this.unsuspend;
          this.unsuspend = null, t();
        }
      }
    }
    var oi = null;
    function Kc(t, l) {
      t.stylesheets = null, t.unsuspend !== null && (t.count++, oi = /* @__PURE__ */ new Map(), l.forEach($v, t), oi = null, si.call(t));
    }
    function $v(t, l) {
      if (!(l.state.loading & 4)) {
        var e = oi.get(t);
        if (e) var n = e.get(null);
        else {
          e = /* @__PURE__ */ new Map(), oi.set(t, e);
          for (var a = t.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < a.length; f++) {
            var s = a[f];
            (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (e.set(s.dataset.precedence, s), n = s);
          }
          n && e.set(null, n);
        }
        a = l.instance, s = a.getAttribute("data-precedence"), f = e.get(s) || n, f === n && e.set(null, a), e.set(s, a), this.count++, n = si.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), f ? f.parentNode.insertBefore(a, f.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), l.state.loading |= 4;
      }
    }
    var Qu = {
      $$typeof: R,
      Provider: null,
      Consumer: null,
      _currentValue: W,
      _currentValue2: W,
      _threadCount: 0
    };
    function Jv(t, l, e, n, a, f, s, d) {
      this.tag = 1, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $i(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $i(0), this.hiddenUpdates = $i(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = f, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = d, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function u0(t, l, e, n, a, f, s, d, _, A, D, w) {
      return t = new Jv(
        t,
        l,
        e,
        s,
        d,
        _,
        A,
        w
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
    var hi = !0;
    function kv(t, l, e, n) {
      var a = Y.T;
      Y.T = null;
      var f = C.p;
      try {
        C.p = 2, Jc(t, l, e, n);
      } finally {
        C.p = f, Y.T = a;
      }
    }
    function Wv(t, l, e, n) {
      var a = Y.T;
      Y.T = null;
      var f = C.p;
      try {
        C.p = 8, Jc(t, l, e, n);
      } finally {
        C.p = f, Y.T = a;
      }
    }
    function Jc(t, l, e, n) {
      if (hi) {
        var a = kc(n);
        if (a === null)
          Yc(
            t,
            l,
            n,
            di,
            e
          ), s0(t, n);
        else if (Pv(
          a,
          t,
          l,
          e,
          n
        ))
          n.stopPropagation();
        else if (s0(t, n), l & 4 && -1 < Fv.indexOf(t)) {
          for (; a !== null; ) {
            var f = rn(a);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var s = Ue(f.pendingLanes);
                    if (s !== 0) {
                      var d = f;
                      for (d.pendingLanes |= 2, d.entangledLanes |= 2; s; ) {
                        var _ = 1 << 31 - fl(s);
                        d.entanglements[1] |= _, s &= ~_;
                      }
                      Cl(f), (Rt & 6) === 0 && (Wa = Hl() + 500, qu(0));
                    }
                  }
                  break;
                case 13:
                  d = oe(f, 2), d !== null && It(d, f, 2), Ia(), $c(f, 2);
              }
            if (f = kc(n), f === null && Yc(
              t,
              l,
              n,
              di,
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
    var di = null;
    function Wc(t) {
      if (di = null, t = He(t), t !== null) {
        var l = Q(t);
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
      return di = t, null;
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
          switch (Yd()) {
            case Ur:
              return 2;
            case Hr:
              return 8;
            case ca:
            case Bd:
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
    var Fc = !1, Me = null, ze = null, Oe = null, Zu = /* @__PURE__ */ new Map(), ju = /* @__PURE__ */ new Map(), De = [], Fv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    );
    function s0(t, l) {
      switch (t) {
        case "focusin":
        case "focusout":
          Me = null;
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
    function Pv(t, l, e, n, a) {
      switch (l) {
        case "focusin":
          return Me = Vu(
            Me,
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
        var e = Q(l);
        if (e !== null) {
          if (l = e.tag, l === 13) {
            if (l = ut(e), l !== null) {
              t.blockedOn = l, Kd(t.priority, function() {
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
    function yi(t) {
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
      yi(t) && e.delete(l);
    }
    function Iv() {
      Fc = !1, Me !== null && yi(Me) && (Me = null), ze !== null && yi(ze) && (ze = null), Oe !== null && yi(Oe) && (Oe = null), Zu.forEach(h0), ju.forEach(h0);
    }
    function vi(t, l) {
      t.blockedOn === l && (t.blockedOn = null, Fc || (Fc = !0, u.unstable_scheduleCallback(
        u.unstable_NormalPriority,
        Iv
      )));
    }
    var mi = null;
    function d0(t) {
      mi !== t && (mi = t, u.unstable_scheduleCallback(
        u.unstable_NormalPriority,
        function() {
          mi === t && (mi = null);
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
        return vi(_, t);
      }
      Me !== null && vi(Me, t), ze !== null && vi(ze, t), Oe !== null && vi(Oe, t), Zu.forEach(l), ju.forEach(l);
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
            var d = null;
            if (f && f.hasAttribute("formAction")) {
              if (a = f, s = f[tl] || null)
                d = s.formAction;
              else if (Wc(a) !== null) continue;
            } else d = s.action;
            typeof d == "function" ? e[n + 1] = d : (e.splice(n, 3), n -= 3), d0(e);
          }
        }
    }
    function Pc(t) {
      this._internalRoot = t;
    }
    gi.prototype.render = Pc.prototype.render = function(t) {
      var l = this._internalRoot;
      if (l === null) throw Error(c(409));
      var e = l.current, n = hl();
      i0(e, n, t, l, null, null);
    }, gi.prototype.unmount = Pc.prototype.unmount = function() {
      var t = this._internalRoot;
      if (t !== null) {
        this._internalRoot = null;
        var l = t.containerInfo;
        t.tag === 0 && Bn(), i0(t.current, 2, null, t, null, null), Ia(), l[cn] = null;
      }
    };
    function gi(t) {
      this._internalRoot = t;
    }
    gi.prototype.unstable_scheduleHydration = function(t) {
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
    C.findDOMNode = function(t) {
      var l = t._reactInternals;
      if (l === void 0)
        throw typeof t.render == "function" ? Error(c(188)) : (t = Object.keys(t).join(","), Error(c(268, t)));
      return t = q(l), t = t !== null ? J(t) : null, t = t === null ? null : t.stateNode, t;
    };
    var t1 = {
      bundleType: 0,
      version: "19.0.0",
      rendererPackageName: "react-dom",
      currentDispatcherRef: Y,
      findFiberByHostInstance: He,
      reconcilerVersion: "19.0.0"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var _i = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!_i.isDisabled && _i.supportsFiber)
        try {
          Wn = _i.inject(
            t1
          ), il = _i;
        } catch {
        }
    }
    return ku.createRoot = function(t, l) {
      if (!o(t)) throw Error(c(299));
      var e = !1, n = "", a = No, f = Uo, s = Ho, d = null;
      return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (a = l.onUncaughtError), l.onCaughtError !== void 0 && (f = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError), l.unstable_transitionCallbacks !== void 0 && (d = l.unstable_transitionCallbacks)), l = u0(
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
        d,
        null
      ), t[cn] = l.current, qc(
        t.nodeType === 8 ? t.parentNode : t
      ), new Pc(l);
    }, ku.hydrateRoot = function(t, l, e) {
      if (!o(t)) throw Error(c(299));
      var n = !1, a = "", f = No, s = Uo, d = Ho, _ = null, A = null;
      return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (f = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (d = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (_ = e.unstable_transitionCallbacks), e.formState !== void 0 && (A = e.formState)), l = u0(
        t,
        1,
        !0,
        l,
        e ?? null,
        n,
        a,
        f,
        s,
        d,
        _,
        A
      ), l.context = a0(null), e = l.current, n = hl(), a = _e(n), a.callback = null, pe(e, a, n), l.current.lanes = n, Pn(l, n), Cl(l), t[cn] = l.current, qc(t), new gi(l);
    }, ku.version = "19.0.0", ku;
  }
  var k0;
  function H_() {
    if (k0) return ar.exports;
    k0 = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
        } catch (i) {
          console.error(i);
        }
    }
    return u(), ar.exports = U_(), ar.exports;
  }
  var Hd = H_();
  const q_ = (u, i, r) => {
    Hd.createRoot(document.getElementById(u)).render(
      /* @__PURE__ */ St.jsx(Oi.StrictMode, { children: /* @__PURE__ */ St.jsx(z_, { data: i, ...r }) })
    );
  };

  /*!
    * Bootstrap v5.3.2 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
  })(undefined, (function () {
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/data.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */

    /**
     * Constants
     */

    const elementMap = new Map();
    const Data = {
      set(element, key, instance) {
        if (!elementMap.has(element)) {
          elementMap.set(element, new Map());
        }
        const instanceMap = elementMap.get(element);

        // make it clear we only want one instance per element
        // can be removed later when multiple key/instances are fine to be used
        if (!instanceMap.has(key) && instanceMap.size !== 0) {
          // eslint-disable-next-line no-console
          console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
          return;
        }
        instanceMap.set(key, instance);
      },
      get(element, key) {
        if (elementMap.has(element)) {
          return elementMap.get(element).get(key) || null;
        }
        return null;
      },
      remove(element, key) {
        if (!elementMap.has(element)) {
          return;
        }
        const instanceMap = elementMap.get(element);
        instanceMap.delete(key);

        // free up element references if there are no instances left for an element
        if (instanceMap.size === 0) {
          elementMap.delete(element);
        }
      }
    };

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */

    const MAX_UID = 1000000;
    const MILLISECONDS_MULTIPLIER = 1000;
    const TRANSITION_END = 'transitionend';

    /**
     * Properly escape IDs selectors to handle weird IDs
     * @param {string} selector
     * @returns {string}
     */
    const parseSelector = selector => {
      if (selector && window.CSS && window.CSS.escape) {
        // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
        selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
      }
      return selector;
    };

    // Shout-out Angus Croll (https://goo.gl/pxwQGp)
    const toType = object => {
      if (object === null || object === undefined) {
        return `${object}`;
      }
      return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
    };

    /**
     * Public Util API
     */

    const getUID = prefix => {
      do {
        prefix += Math.floor(Math.random() * MAX_UID);
      } while (document.getElementById(prefix));
      return prefix;
    };
    const getTransitionDurationFromElement = element => {
      if (!element) {
        return 0;
      }

      // Get transition-duration of the element
      let {
        transitionDuration,
        transitionDelay
      } = window.getComputedStyle(element);
      const floatTransitionDuration = Number.parseFloat(transitionDuration);
      const floatTransitionDelay = Number.parseFloat(transitionDelay);

      // Return 0 if element or transition duration is not found
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      }

      // If multiple durations are defined, take the first
      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    };
    const triggerTransitionEnd = element => {
      element.dispatchEvent(new Event(TRANSITION_END));
    };
    const isElement$1 = object => {
      if (!object || typeof object !== 'object') {
        return false;
      }
      if (typeof object.jquery !== 'undefined') {
        object = object[0];
      }
      return typeof object.nodeType !== 'undefined';
    };
    const getElement = object => {
      // it's a jQuery object or a node element
      if (isElement$1(object)) {
        return object.jquery ? object[0] : object;
      }
      if (typeof object === 'string' && object.length > 0) {
        return document.querySelector(parseSelector(object));
      }
      return null;
    };
    const isVisible = element => {
      if (!isElement$1(element) || element.getClientRects().length === 0) {
        return false;
      }
      const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
      // Handle `details` element as its content may falsie appear visible when it is closed
      const closedDetails = element.closest('details:not([open])');
      if (!closedDetails) {
        return elementIsVisible;
      }
      if (closedDetails !== element) {
        const summary = element.closest('summary');
        if (summary && summary.parentNode !== closedDetails) {
          return false;
        }
        if (summary === null) {
          return false;
        }
      }
      return elementIsVisible;
    };
    const isDisabled = element => {
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return true;
      }
      if (element.classList.contains('disabled')) {
        return true;
      }
      if (typeof element.disabled !== 'undefined') {
        return element.disabled;
      }
      return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
    };
    const findShadowRoot = element => {
      if (!document.documentElement.attachShadow) {
        return null;
      }

      // Can find the shadow root otherwise it'll return the document
      if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }
      if (element instanceof ShadowRoot) {
        return element;
      }

      // when we don't find a shadow root
      if (!element.parentNode) {
        return null;
      }
      return findShadowRoot(element.parentNode);
    };
    const noop = () => {};

    /**
     * Trick to restart an element's animation
     *
     * @param {HTMLElement} element
     * @return void
     *
     * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
     */
    const reflow = element => {
      element.offsetHeight; // eslint-disable-line no-unused-expressions
    };

    const getjQuery = () => {
      if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
        return window.jQuery;
      }
      return null;
    };
    const DOMContentLoadedCallbacks = [];
    const onDOMContentLoaded = callback => {
      if (document.readyState === 'loading') {
        // add listener on the first call when the document is in loading state
        if (!DOMContentLoadedCallbacks.length) {
          document.addEventListener('DOMContentLoaded', () => {
            for (const callback of DOMContentLoadedCallbacks) {
              callback();
            }
          });
        }
        DOMContentLoadedCallbacks.push(callback);
      } else {
        callback();
      }
    };
    const isRTL = () => document.documentElement.dir === 'rtl';
    const defineJQueryPlugin = plugin => {
      onDOMContentLoaded(() => {
        const $ = getjQuery();
        /* istanbul ignore if */
        if ($) {
          const name = plugin.NAME;
          const JQUERY_NO_CONFLICT = $.fn[name];
          $.fn[name] = plugin.jQueryInterface;
          $.fn[name].Constructor = plugin;
          $.fn[name].noConflict = () => {
            $.fn[name] = JQUERY_NO_CONFLICT;
            return plugin.jQueryInterface;
          };
        }
      });
    };
    const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
      return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
    };
    const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
      if (!waitForTransition) {
        execute(callback);
        return;
      }
      const durationPadding = 5;
      const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
      let called = false;
      const handler = ({
        target
      }) => {
        if (target !== transitionElement) {
          return;
        }
        called = true;
        transitionElement.removeEventListener(TRANSITION_END, handler);
        execute(callback);
      };
      transitionElement.addEventListener(TRANSITION_END, handler);
      setTimeout(() => {
        if (!called) {
          triggerTransitionEnd(transitionElement);
        }
      }, emulatedDuration);
    };

    /**
     * Return the previous/next element of a list.
     *
     * @param {array} list    The list of elements
     * @param activeElement   The active element
     * @param shouldGetNext   Choose to get next or previous element
     * @param isCycleAllowed
     * @return {Element|elem} The proper element
     */
    const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
      const listLength = list.length;
      let index = list.indexOf(activeElement);

      // if the element does not exist in the list return an element
      // depending on the direction and if cycle is allowed
      if (index === -1) {
        return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
      }
      index += shouldGetNext ? 1 : -1;
      if (isCycleAllowed) {
        index = (index + listLength) % listLength;
      }
      return list[Math.max(0, Math.min(index, listLength - 1))];
    };

    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/event-handler.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
    const stripNameRegex = /\..*/;
    const stripUidRegex = /::\d+$/;
    const eventRegistry = {}; // Events storage
    let uidEvent = 1;
    const customEvents = {
      mouseenter: 'mouseover',
      mouseleave: 'mouseout'
    };
    const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

    /**
     * Private methods
     */

    function makeEventUid(element, uid) {
      return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
    }
    function getElementEvents(element) {
      const uid = makeEventUid(element);
      element.uidEvent = uid;
      eventRegistry[uid] = eventRegistry[uid] || {};
      return eventRegistry[uid];
    }
    function bootstrapHandler(element, fn) {
      return function handler(event) {
        hydrateObj(event, {
          delegateTarget: element
        });
        if (handler.oneOff) {
          EventHandler.off(element, event.type, fn);
        }
        return fn.apply(element, [event]);
      };
    }
    function bootstrapDelegationHandler(element, selector, fn) {
      return function handler(event) {
        const domElements = element.querySelectorAll(selector);
        for (let {
          target
        } = event; target && target !== this; target = target.parentNode) {
          for (const domElement of domElements) {
            if (domElement !== target) {
              continue;
            }
            hydrateObj(event, {
              delegateTarget: target
            });
            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }
            return fn.apply(target, [event]);
          }
        }
      };
    }
    function findHandler(events, callable, delegationSelector = null) {
      return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
    }
    function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
      const isDelegated = typeof handler === 'string';
      // TODO: tooltip passes `false` instead of selector, so we need to check
      const callable = isDelegated ? delegationFunction : handler || delegationFunction;
      let typeEvent = getTypeEvent(originalTypeEvent);
      if (!nativeEvents.has(typeEvent)) {
        typeEvent = originalTypeEvent;
      }
      return [isDelegated, callable, typeEvent];
    }
    function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }
      let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

      // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
      // this prevents the handler from being dispatched the same way as mouseover or mouseout does
      if (originalTypeEvent in customEvents) {
        const wrapFunction = fn => {
          return function (event) {
            if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
              return fn.call(this, event);
            }
          };
        };
        callable = wrapFunction(callable);
      }
      const events = getElementEvents(element);
      const handlers = events[typeEvent] || (events[typeEvent] = {});
      const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
      if (previousFunction) {
        previousFunction.oneOff = previousFunction.oneOff && oneOff;
        return;
      }
      const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
      const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
      fn.delegationSelector = isDelegated ? handler : null;
      fn.callable = callable;
      fn.oneOff = oneOff;
      fn.uidEvent = uid;
      handlers[uid] = fn;
      element.addEventListener(typeEvent, fn, isDelegated);
    }
    function removeHandler(element, events, typeEvent, handler, delegationSelector) {
      const fn = findHandler(events[typeEvent], handler, delegationSelector);
      if (!fn) {
        return;
      }
      element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
      delete events[typeEvent][fn.uidEvent];
    }
    function removeNamespacedHandlers(element, events, typeEvent, namespace) {
      const storeElementEvent = events[typeEvent] || {};
      for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
        if (handlerKey.includes(namespace)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    }
    function getTypeEvent(event) {
      // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
      event = event.replace(stripNameRegex, '');
      return customEvents[event] || event;
    }
    const EventHandler = {
      on(element, event, handler, delegationFunction) {
        addHandler(element, event, handler, delegationFunction, false);
      },
      one(element, event, handler, delegationFunction) {
        addHandler(element, event, handler, delegationFunction, true);
      },
      off(element, originalTypeEvent, handler, delegationFunction) {
        if (typeof originalTypeEvent !== 'string' || !element) {
          return;
        }
        const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
        const inNamespace = typeEvent !== originalTypeEvent;
        const events = getElementEvents(element);
        const storeElementEvent = events[typeEvent] || {};
        const isNamespace = originalTypeEvent.startsWith('.');
        if (typeof callable !== 'undefined') {
          // Simplest case: handler is passed, remove that listener ONLY.
          if (!Object.keys(storeElementEvent).length) {
            return;
          }
          removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
          return;
        }
        if (isNamespace) {
          for (const elementEvent of Object.keys(events)) {
            removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
          }
        }
        for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
          const handlerKey = keyHandlers.replace(stripUidRegex, '');
          if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
            removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
          }
        }
      },
      trigger(element, event, args) {
        if (typeof event !== 'string' || !element) {
          return null;
        }
        const $ = getjQuery();
        const typeEvent = getTypeEvent(event);
        const inNamespace = event !== typeEvent;
        let jQueryEvent = null;
        let bubbles = true;
        let nativeDispatch = true;
        let defaultPrevented = false;
        if (inNamespace && $) {
          jQueryEvent = $.Event(event, args);
          $(element).trigger(jQueryEvent);
          bubbles = !jQueryEvent.isPropagationStopped();
          nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
          defaultPrevented = jQueryEvent.isDefaultPrevented();
        }
        const evt = hydrateObj(new Event(event, {
          bubbles,
          cancelable: true
        }), args);
        if (defaultPrevented) {
          evt.preventDefault();
        }
        if (nativeDispatch) {
          element.dispatchEvent(evt);
        }
        if (evt.defaultPrevented && jQueryEvent) {
          jQueryEvent.preventDefault();
        }
        return evt;
      }
    };
    function hydrateObj(obj, meta = {}) {
      for (const [key, value] of Object.entries(meta)) {
        try {
          obj[key] = value;
        } catch (_unused) {
          Object.defineProperty(obj, key, {
            configurable: true,
            get() {
              return value;
            }
          });
        }
      }
      return obj;
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/manipulator.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */

    function normalizeData(value) {
      if (value === 'true') {
        return true;
      }
      if (value === 'false') {
        return false;
      }
      if (value === Number(value).toString()) {
        return Number(value);
      }
      if (value === '' || value === 'null') {
        return null;
      }
      if (typeof value !== 'string') {
        return value;
      }
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch (_unused) {
        return value;
      }
    }
    function normalizeDataKey(key) {
      return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
    }
    const Manipulator = {
      setDataAttribute(element, key, value) {
        element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
      },
      removeDataAttribute(element, key) {
        element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
      },
      getDataAttributes(element) {
        if (!element) {
          return {};
        }
        const attributes = {};
        const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
        for (const key of bsKeys) {
          let pureKey = key.replace(/^bs/, '');
          pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
          attributes[pureKey] = normalizeData(element.dataset[key]);
        }
        return attributes;
      },
      getDataAttribute(element, key) {
        return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
      }
    };

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/config.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Class definition
     */

    class Config {
      // Getters
      static get Default() {
        return {};
      }
      static get DefaultType() {
        return {};
      }
      static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!');
      }
      _getConfig(config) {
        config = this._mergeConfigObj(config);
        config = this._configAfterMerge(config);
        this._typeCheckConfig(config);
        return config;
      }
      _configAfterMerge(config) {
        return config;
      }
      _mergeConfigObj(config, element) {
        const jsonConfig = isElement$1(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

        return {
          ...this.constructor.Default,
          ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
          ...(isElement$1(element) ? Manipulator.getDataAttributes(element) : {}),
          ...(typeof config === 'object' ? config : {})
        };
      }
      _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
        for (const [property, expectedTypes] of Object.entries(configTypes)) {
          const value = config[property];
          const valueType = isElement$1(value) ? 'element' : toType(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
          }
        }
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap base-component.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const VERSION = '5.3.2';

    /**
     * Class definition
     */

    class BaseComponent extends Config {
      constructor(element, config) {
        super();
        element = getElement(element);
        if (!element) {
          return;
        }
        this._element = element;
        this._config = this._getConfig(config);
        Data.set(this._element, this.constructor.DATA_KEY, this);
      }

      // Public
      dispose() {
        Data.remove(this._element, this.constructor.DATA_KEY);
        EventHandler.off(this._element, this.constructor.EVENT_KEY);
        for (const propertyName of Object.getOwnPropertyNames(this)) {
          this[propertyName] = null;
        }
      }
      _queueCallback(callback, element, isAnimated = true) {
        executeAfterTransition(callback, element, isAnimated);
      }
      _getConfig(config) {
        config = this._mergeConfigObj(config, this._element);
        config = this._configAfterMerge(config);
        this._typeCheckConfig(config);
        return config;
      }

      // Static
      static getInstance(element) {
        return Data.get(getElement(element), this.DATA_KEY);
      }
      static getOrCreateInstance(element, config = {}) {
        return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
      }
      static get VERSION() {
        return VERSION;
      }
      static get DATA_KEY() {
        return `bs.${this.NAME}`;
      }
      static get EVENT_KEY() {
        return `.${this.DATA_KEY}`;
      }
      static eventName(name) {
        return `${name}${this.EVENT_KEY}`;
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/selector-engine.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */

    const getSelector = element => {
      let selector = element.getAttribute('data-bs-target');
      if (!selector || selector === '#') {
        let hrefAttribute = element.getAttribute('href');

        // The only valid content that could double as a selector are IDs or classes,
        // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
        // `document.querySelector` will rightfully complain it is invalid.
        // See https://github.com/twbs/bootstrap/issues/32273
        if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
          return null;
        }

        // Just in case some CMS puts out a full URL with the anchor appended
        if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
          hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
        }
        selector = hrefAttribute && hrefAttribute !== '#' ? parseSelector(hrefAttribute.trim()) : null;
      }
      return selector;
    };
    const SelectorEngine = {
      find(selector, element = document.documentElement) {
        return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
      },
      findOne(selector, element = document.documentElement) {
        return Element.prototype.querySelector.call(element, selector);
      },
      children(element, selector) {
        return [].concat(...element.children).filter(child => child.matches(selector));
      },
      parents(element, selector) {
        const parents = [];
        let ancestor = element.parentNode.closest(selector);
        while (ancestor) {
          parents.push(ancestor);
          ancestor = ancestor.parentNode.closest(selector);
        }
        return parents;
      },
      prev(element, selector) {
        let previous = element.previousElementSibling;
        while (previous) {
          if (previous.matches(selector)) {
            return [previous];
          }
          previous = previous.previousElementSibling;
        }
        return [];
      },
      // TODO: this is now unused; remove later along with prev()
      next(element, selector) {
        let next = element.nextElementSibling;
        while (next) {
          if (next.matches(selector)) {
            return [next];
          }
          next = next.nextElementSibling;
        }
        return [];
      },
      focusableChildren(element) {
        const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
        return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
      },
      getSelectorFromElement(element) {
        const selector = getSelector(element);
        if (selector) {
          return SelectorEngine.findOne(selector) ? selector : null;
        }
        return null;
      },
      getElementFromSelector(element) {
        const selector = getSelector(element);
        return selector ? SelectorEngine.findOne(selector) : null;
      },
      getMultipleElementsFromSelector(element) {
        const selector = getSelector(element);
        return selector ? SelectorEngine.find(selector) : [];
      }
    };

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/component-functions.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */

    const enableDismissTrigger = (component, method = 'hide') => {
      const clickEvent = `click.dismiss${component.EVENT_KEY}`;
      const name = component.NAME;
      EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
        if (['A', 'AREA'].includes(this.tagName)) {
          event.preventDefault();
        }
        if (isDisabled(this)) {
          return;
        }
        const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
        const instance = component.getOrCreateInstance(target);

        // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
        instance[method]();
      });
    };

    /**
     * --------------------------------------------------------------------------
     * Bootstrap alert.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$f = 'alert';
    const DATA_KEY$a = 'bs.alert';
    const EVENT_KEY$b = `.${DATA_KEY$a}`;
    const EVENT_CLOSE = `close${EVENT_KEY$b}`;
    const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
    const CLASS_NAME_FADE$5 = 'fade';
    const CLASS_NAME_SHOW$8 = 'show';

    /**
     * Class definition
     */

    class Alert extends BaseComponent {
      // Getters
      static get NAME() {
        return NAME$f;
      }

      // Public
      close() {
        const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
        if (closeEvent.defaultPrevented) {
          return;
        }
        this._element.classList.remove(CLASS_NAME_SHOW$8);
        const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
        this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
      }

      // Private
      _destroyElement() {
        this._element.remove();
        EventHandler.trigger(this._element, EVENT_CLOSED);
        this.dispose();
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Alert.getOrCreateInstance(this);
          if (typeof config !== 'string') {
            return;
          }
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        });
      }
    }

    /**
     * Data API implementation
     */

    enableDismissTrigger(Alert, 'close');

    /**
     * jQuery
     */

    defineJQueryPlugin(Alert);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap button.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$e = 'button';
    const DATA_KEY$9 = 'bs.button';
    const EVENT_KEY$a = `.${DATA_KEY$9}`;
    const DATA_API_KEY$6 = '.data-api';
    const CLASS_NAME_ACTIVE$3 = 'active';
    const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
    const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

    /**
     * Class definition
     */

    class Button extends BaseComponent {
      // Getters
      static get NAME() {
        return NAME$e;
      }

      // Public
      toggle() {
        // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
        this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Button.getOrCreateInstance(this);
          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }

    /**
     * Data API implementation
     */

    EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
      event.preventDefault();
      const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
      const data = Button.getOrCreateInstance(button);
      data.toggle();
    });

    /**
     * jQuery
     */

    defineJQueryPlugin(Button);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/swipe.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$d = 'swipe';
    const EVENT_KEY$9 = '.bs.swipe';
    const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
    const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
    const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
    const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
    const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
    const POINTER_TYPE_TOUCH = 'touch';
    const POINTER_TYPE_PEN = 'pen';
    const CLASS_NAME_POINTER_EVENT = 'pointer-event';
    const SWIPE_THRESHOLD = 40;
    const Default$c = {
      endCallback: null,
      leftCallback: null,
      rightCallback: null
    };
    const DefaultType$c = {
      endCallback: '(function|null)',
      leftCallback: '(function|null)',
      rightCallback: '(function|null)'
    };

    /**
     * Class definition
     */

    class Swipe extends Config {
      constructor(element, config) {
        super();
        this._element = element;
        if (!element || !Swipe.isSupported()) {
          return;
        }
        this._config = this._getConfig(config);
        this._deltaX = 0;
        this._supportPointerEvents = Boolean(window.PointerEvent);
        this._initEvents();
      }

      // Getters
      static get Default() {
        return Default$c;
      }
      static get DefaultType() {
        return DefaultType$c;
      }
      static get NAME() {
        return NAME$d;
      }

      // Public
      dispose() {
        EventHandler.off(this._element, EVENT_KEY$9);
      }

      // Private
      _start(event) {
        if (!this._supportPointerEvents) {
          this._deltaX = event.touches[0].clientX;
          return;
        }
        if (this._eventIsPointerPenTouch(event)) {
          this._deltaX = event.clientX;
        }
      }
      _end(event) {
        if (this._eventIsPointerPenTouch(event)) {
          this._deltaX = event.clientX - this._deltaX;
        }
        this._handleSwipe();
        execute(this._config.endCallback);
      }
      _move(event) {
        this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
      }
      _handleSwipe() {
        const absDeltaX = Math.abs(this._deltaX);
        if (absDeltaX <= SWIPE_THRESHOLD) {
          return;
        }
        const direction = absDeltaX / this._deltaX;
        this._deltaX = 0;
        if (!direction) {
          return;
        }
        execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
      }
      _initEvents() {
        if (this._supportPointerEvents) {
          EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
          EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
          this._element.classList.add(CLASS_NAME_POINTER_EVENT);
        } else {
          EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
          EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
          EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
        }
      }
      _eventIsPointerPenTouch(event) {
        return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
      }

      // Static
      static isSupported() {
        return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap carousel.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$c = 'carousel';
    const DATA_KEY$8 = 'bs.carousel';
    const EVENT_KEY$8 = `.${DATA_KEY$8}`;
    const DATA_API_KEY$5 = '.data-api';
    const ARROW_LEFT_KEY$1 = 'ArrowLeft';
    const ARROW_RIGHT_KEY$1 = 'ArrowRight';
    const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    const ORDER_NEXT = 'next';
    const ORDER_PREV = 'prev';
    const DIRECTION_LEFT = 'left';
    const DIRECTION_RIGHT = 'right';
    const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
    const EVENT_SLID = `slid${EVENT_KEY$8}`;
    const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
    const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
    const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
    const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
    const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
    const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
    const CLASS_NAME_CAROUSEL = 'carousel';
    const CLASS_NAME_ACTIVE$2 = 'active';
    const CLASS_NAME_SLIDE = 'slide';
    const CLASS_NAME_END = 'carousel-item-end';
    const CLASS_NAME_START = 'carousel-item-start';
    const CLASS_NAME_NEXT = 'carousel-item-next';
    const CLASS_NAME_PREV = 'carousel-item-prev';
    const SELECTOR_ACTIVE = '.active';
    const SELECTOR_ITEM = '.carousel-item';
    const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
    const SELECTOR_ITEM_IMG = '.carousel-item img';
    const SELECTOR_INDICATORS = '.carousel-indicators';
    const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
    const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
    const KEY_TO_DIRECTION = {
      [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
      [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
    };
    const Default$b = {
      interval: 5000,
      keyboard: true,
      pause: 'hover',
      ride: false,
      touch: true,
      wrap: true
    };
    const DefaultType$b = {
      interval: '(number|boolean)',
      // TODO:v6 remove boolean support
      keyboard: 'boolean',
      pause: '(string|boolean)',
      ride: '(boolean|string)',
      touch: 'boolean',
      wrap: 'boolean'
    };

    /**
     * Class definition
     */

    class Carousel extends BaseComponent {
      constructor(element, config) {
        super(element, config);
        this._interval = null;
        this._activeElement = null;
        this._isSliding = false;
        this.touchTimeout = null;
        this._swipeHelper = null;
        this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
        this._addEventListeners();
        if (this._config.ride === CLASS_NAME_CAROUSEL) {
          this.cycle();
        }
      }

      // Getters
      static get Default() {
        return Default$b;
      }
      static get DefaultType() {
        return DefaultType$b;
      }
      static get NAME() {
        return NAME$c;
      }

      // Public
      next() {
        this._slide(ORDER_NEXT);
      }
      nextWhenVisible() {
        // FIXME TODO use `document.visibilityState`
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && isVisible(this._element)) {
          this.next();
        }
      }
      prev() {
        this._slide(ORDER_PREV);
      }
      pause() {
        if (this._isSliding) {
          triggerTransitionEnd(this._element);
        }
        this._clearInterval();
      }
      cycle() {
        this._clearInterval();
        this._updateInterval();
        this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
      }
      _maybeEnableCycle() {
        if (!this._config.ride) {
          return;
        }
        if (this._isSliding) {
          EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
          return;
        }
        this.cycle();
      }
      to(index) {
        const items = this._getItems();
        if (index > items.length - 1 || index < 0) {
          return;
        }
        if (this._isSliding) {
          EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
          return;
        }
        const activeIndex = this._getItemIndex(this._getActive());
        if (activeIndex === index) {
          return;
        }
        const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
        this._slide(order, items[index]);
      }
      dispose() {
        if (this._swipeHelper) {
          this._swipeHelper.dispose();
        }
        super.dispose();
      }

      // Private
      _configAfterMerge(config) {
        config.defaultInterval = config.interval;
        return config;
      }
      _addEventListeners() {
        if (this._config.keyboard) {
          EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
        }
        if (this._config.pause === 'hover') {
          EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
          EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
        }
        if (this._config.touch && Swipe.isSupported()) {
          this._addTouchEventListeners();
        }
      }
      _addTouchEventListeners() {
        for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
          EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
        }
        const endCallBack = () => {
          if (this._config.pause !== 'hover') {
            return;
          }

          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling

          this.pause();
          if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
          }
          this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
        };
        const swipeConfig = {
          leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
          rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
          endCallback: endCallBack
        };
        this._swipeHelper = new Swipe(this._element, swipeConfig);
      }
      _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }
        const direction = KEY_TO_DIRECTION[event.key];
        if (direction) {
          event.preventDefault();
          this._slide(this._directionToOrder(direction));
        }
      }
      _getItemIndex(element) {
        return this._getItems().indexOf(element);
      }
      _setActiveIndicatorElement(index) {
        if (!this._indicatorsElement) {
          return;
        }
        const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
        activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
        activeIndicator.removeAttribute('aria-current');
        const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
        if (newActiveIndicator) {
          newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
          newActiveIndicator.setAttribute('aria-current', 'true');
        }
      }
      _updateInterval() {
        const element = this._activeElement || this._getActive();
        if (!element) {
          return;
        }
        const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
        this._config.interval = elementInterval || this._config.defaultInterval;
      }
      _slide(order, element = null) {
        if (this._isSliding) {
          return;
        }
        const activeElement = this._getActive();
        const isNext = order === ORDER_NEXT;
        const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
        if (nextElement === activeElement) {
          return;
        }
        const nextElementIndex = this._getItemIndex(nextElement);
        const triggerEvent = eventName => {
          return EventHandler.trigger(this._element, eventName, {
            relatedTarget: nextElement,
            direction: this._orderToDirection(order),
            from: this._getItemIndex(activeElement),
            to: nextElementIndex
          });
        };
        const slideEvent = triggerEvent(EVENT_SLIDE);
        if (slideEvent.defaultPrevented) {
          return;
        }
        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          // TODO: change tests that use empty divs to avoid this check
          return;
        }
        const isCycling = Boolean(this._interval);
        this.pause();
        this._isSliding = true;
        this._setActiveIndicatorElement(nextElementIndex);
        this._activeElement = nextElement;
        const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
        const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);
        const completeCallBack = () => {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$2);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
          this._isSliding = false;
          triggerEvent(EVENT_SLID);
        };
        this._queueCallback(completeCallBack, activeElement, this._isAnimated());
        if (isCycling) {
          this.cycle();
        }
      }
      _isAnimated() {
        return this._element.classList.contains(CLASS_NAME_SLIDE);
      }
      _getActive() {
        return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
      }
      _getItems() {
        return SelectorEngine.find(SELECTOR_ITEM, this._element);
      }
      _clearInterval() {
        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }
      }
      _directionToOrder(direction) {
        if (isRTL()) {
          return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
        }
        return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
      }
      _orderToDirection(order) {
        if (isRTL()) {
          return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Carousel.getOrCreateInstance(this, config);
          if (typeof config === 'number') {
            data.to(config);
            return;
          }
          if (typeof config === 'string') {
            if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config]();
          }
        });
      }
    }

    /**
     * Data API implementation
     */

    EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
      const target = SelectorEngine.getElementFromSelector(this);
      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }
      event.preventDefault();
      const carousel = Carousel.getOrCreateInstance(target);
      const slideIndex = this.getAttribute('data-bs-slide-to');
      if (slideIndex) {
        carousel.to(slideIndex);
        carousel._maybeEnableCycle();
        return;
      }
      if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
        carousel.next();
        carousel._maybeEnableCycle();
        return;
      }
      carousel.prev();
      carousel._maybeEnableCycle();
    });
    EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
      const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
      for (const carousel of carousels) {
        Carousel.getOrCreateInstance(carousel);
      }
    });

    /**
     * jQuery
     */

    defineJQueryPlugin(Carousel);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap collapse.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$b = 'collapse';
    const DATA_KEY$7 = 'bs.collapse';
    const EVENT_KEY$7 = `.${DATA_KEY$7}`;
    const DATA_API_KEY$4 = '.data-api';
    const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
    const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
    const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
    const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
    const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
    const CLASS_NAME_SHOW$7 = 'show';
    const CLASS_NAME_COLLAPSE = 'collapse';
    const CLASS_NAME_COLLAPSING = 'collapsing';
    const CLASS_NAME_COLLAPSED = 'collapsed';
    const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
    const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
    const WIDTH = 'width';
    const HEIGHT = 'height';
    const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
    const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
    const Default$a = {
      parent: null,
      toggle: true
    };
    const DefaultType$a = {
      parent: '(null|element)',
      toggle: 'boolean'
    };

    /**
     * Class definition
     */

    class Collapse extends BaseComponent {
      constructor(element, config) {
        super(element, config);
        this._isTransitioning = false;
        this._triggerArray = [];
        const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
        for (const elem of toggleList) {
          const selector = SelectorEngine.getSelectorFromElement(elem);
          const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
          if (selector !== null && filterElement.length) {
            this._triggerArray.push(elem);
          }
        }
        this._initializeChildren();
        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
        }
        if (this._config.toggle) {
          this.toggle();
        }
      }

      // Getters
      static get Default() {
        return Default$a;
      }
      static get DefaultType() {
        return DefaultType$a;
      }
      static get NAME() {
        return NAME$b;
      }

      // Public
      toggle() {
        if (this._isShown()) {
          this.hide();
        } else {
          this.show();
        }
      }
      show() {
        if (this._isTransitioning || this._isShown()) {
          return;
        }
        let activeChildren = [];

        // find active children
        if (this._config.parent) {
          activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
            toggle: false
          }));
        }
        if (activeChildren.length && activeChildren[0]._isTransitioning) {
          return;
        }
        const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
        if (startEvent.defaultPrevented) {
          return;
        }
        for (const activeInstance of activeChildren) {
          activeInstance.hide();
        }
        const dimension = this._getDimension();
        this._element.classList.remove(CLASS_NAME_COLLAPSE);
        this._element.classList.add(CLASS_NAME_COLLAPSING);
        this._element.style[dimension] = 0;
        this._addAriaAndCollapsedClass(this._triggerArray, true);
        this._isTransitioning = true;
        const complete = () => {
          this._isTransitioning = false;
          this._element.classList.remove(CLASS_NAME_COLLAPSING);
          this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
          this._element.style[dimension] = '';
          EventHandler.trigger(this._element, EVENT_SHOWN$6);
        };
        const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        const scrollSize = `scroll${capitalizedDimension}`;
        this._queueCallback(complete, this._element, true);
        this._element.style[dimension] = `${this._element[scrollSize]}px`;
      }
      hide() {
        if (this._isTransitioning || !this._isShown()) {
          return;
        }
        const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
        if (startEvent.defaultPrevented) {
          return;
        }
        const dimension = this._getDimension();
        this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
        reflow(this._element);
        this._element.classList.add(CLASS_NAME_COLLAPSING);
        this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        for (const trigger of this._triggerArray) {
          const element = SelectorEngine.getElementFromSelector(trigger);
          if (element && !this._isShown(element)) {
            this._addAriaAndCollapsedClass([trigger], false);
          }
        }
        this._isTransitioning = true;
        const complete = () => {
          this._isTransitioning = false;
          this._element.classList.remove(CLASS_NAME_COLLAPSING);
          this._element.classList.add(CLASS_NAME_COLLAPSE);
          EventHandler.trigger(this._element, EVENT_HIDDEN$6);
        };
        this._element.style[dimension] = '';
        this._queueCallback(complete, this._element, true);
      }
      _isShown(element = this._element) {
        return element.classList.contains(CLASS_NAME_SHOW$7);
      }

      // Private
      _configAfterMerge(config) {
        config.toggle = Boolean(config.toggle); // Coerce string values
        config.parent = getElement(config.parent);
        return config;
      }
      _getDimension() {
        return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
      }
      _initializeChildren() {
        if (!this._config.parent) {
          return;
        }
        const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
        for (const element of children) {
          const selected = SelectorEngine.getElementFromSelector(element);
          if (selected) {
            this._addAriaAndCollapsedClass([element], this._isShown(selected));
          }
        }
      }
      _getFirstLevelChildren(selector) {
        const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
        // remove children if greater depth
        return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
      }
      _addAriaAndCollapsedClass(triggerArray, isOpen) {
        if (!triggerArray.length) {
          return;
        }
        for (const element of triggerArray) {
          element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
          element.setAttribute('aria-expanded', isOpen);
        }
      }

      // Static
      static jQueryInterface(config) {
        const _config = {};
        if (typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }
        return this.each(function () {
          const data = Collapse.getOrCreateInstance(this, _config);
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config]();
          }
        });
      }
    }

    /**
     * Data API implementation
     */

    EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
        event.preventDefault();
      }
      for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
        Collapse.getOrCreateInstance(element, {
          toggle: false
        }).toggle();
      }
    });

    /**
     * jQuery
     */

    defineJQueryPlugin(Collapse);

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getWindow(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }

      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$2(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    const applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$2,
      requires: ['computeStyles']
    };

    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }

    var max = Math.max;
    var min = Math.min;
    var round = Math.round;

    function getUAString() {
      var uaData = navigator.userAgentData;

      if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
        return uaData.brands.map(function (item) {
          return item.brand + "/" + item.version;
        }).join(' ');
      }

      return navigator.userAgent;
    }

    function isLayoutViewport() {
      return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }

    function getBoundingClientRect(element, includeScale, isFixedStrategy) {
      if (includeScale === void 0) {
        includeScale = false;
      }

      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }

      var clientRect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;

      if (includeScale && isHTMLElement(element)) {
        scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
        scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
      }

      var _ref = isElement(element) ? getWindow(element) : window,
          visualViewport = _ref.visualViewport;

      var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
      var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
      var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
      var width = clientRect.width / scaleX;
      var height = clientRect.height / scaleY;
      return {
        width: width,
        height: height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x: x,
        y: y
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;

          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe[prop-missing]: need a better way to handle this...


            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false


      return false;
    }

    function getComputedStyle$1(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$1(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block


    function getContainingBlock(element) {
      var isFirefox = /firefox/i.test(getUAString());
      var isIE = /Trident/i.test(getUAString());

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$1(element);

        if (elementCss.position === 'fixed') {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }

      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.


    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);

      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }
    function withinMaxClamp(min, value, max) {
      var v = within(min, value, max);
      return v > max ? max : v;
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {
        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules


    const arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect$1,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref, win) {
      var x = _ref.x,
          y = _ref.y;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets,
          isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x,
          x = _offsets$x === void 0 ? 0 : _offsets$x,
          _offsets$y = offsets.y,
          y = _offsets$y === void 0 ? 0 : _offsets$y;

      var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);

          if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


        offsetParent = offsetParent;

        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
          offsetParent[heightProp];
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
          offsetParent[widthProp];
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
      }, getWindow(popper)) : {
        x: x,
        y: y
      };

      x = _ref4.x;
      y = _ref4.y;

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref5) {
      var state = _ref5.state,
          options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    const computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    var passive = {
      passive: true
    };

    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    const eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };

    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getViewportRect(element, strategy) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0;

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();

        if (layoutViewport || !layoutViewport && strategy === 'fixed') {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getInnerBoundingClientRect(element, strategy) {
      var rect = getBoundingClientRect(element, false, strategy === 'fixed');
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent, strategy) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary, strategy) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent, strategy);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent, strategy));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$strategy = _options.strategy,
          strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    const flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    const hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    const offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    const popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis) {
        var _offsetModifierState$;

        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min$1 = offset + overflow[mainSide];
        var max$1 = offset - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _offsetModifierState$2;

        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _len = altAxis === 'y' ? 'height' : 'width';

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    const preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round(rect.width) / element.offsetWidth || 1;
      var scaleY = round(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.


    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            });
            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {
              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });

            for (var index = 0; index < state.orderedModifiers.length; index++) {
              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {
          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref) {
            var name = _ref.name,
                _ref$options = _ref.options,
                options = _ref$options === void 0 ? {} : _ref$options,
                effect = _ref.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }
    var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

    var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
    var createPopper$1 = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers$1
    }); // eslint-disable-next-line import/no-unused-modules

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    const Popper = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
      __proto__: null,
      afterMain,
      afterRead,
      afterWrite,
      applyStyles: applyStyles$1,
      arrow: arrow$1,
      auto,
      basePlacements,
      beforeMain,
      beforeRead,
      beforeWrite,
      bottom,
      clippingParents,
      computeStyles: computeStyles$1,
      createPopper,
      createPopperBase: createPopper$2,
      createPopperLite: createPopper$1,
      detectOverflow,
      end,
      eventListeners,
      flip: flip$1,
      hide: hide$1,
      left,
      main,
      modifierPhases,
      offset: offset$1,
      placements,
      popper,
      popperGenerator,
      popperOffsets: popperOffsets$1,
      preventOverflow: preventOverflow$1,
      read,
      reference,
      right,
      start,
      top,
      variationPlacements,
      viewport,
      write
    }, Symbol.toStringTag, { value: 'Module' }));

    /**
     * --------------------------------------------------------------------------
     * Bootstrap dropdown.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$a = 'dropdown';
    const DATA_KEY$6 = 'bs.dropdown';
    const EVENT_KEY$6 = `.${DATA_KEY$6}`;
    const DATA_API_KEY$3 = '.data-api';
    const ESCAPE_KEY$2 = 'Escape';
    const TAB_KEY$1 = 'Tab';
    const ARROW_UP_KEY$1 = 'ArrowUp';
    const ARROW_DOWN_KEY$1 = 'ArrowDown';
    const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

    const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
    const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
    const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
    const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
    const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
    const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
    const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
    const CLASS_NAME_SHOW$6 = 'show';
    const CLASS_NAME_DROPUP = 'dropup';
    const CLASS_NAME_DROPEND = 'dropend';
    const CLASS_NAME_DROPSTART = 'dropstart';
    const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
    const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
    const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
    const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
    const SELECTOR_MENU = '.dropdown-menu';
    const SELECTOR_NAVBAR = '.navbar';
    const SELECTOR_NAVBAR_NAV = '.navbar-nav';
    const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
    const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
    const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
    const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
    const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
    const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
    const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
    const PLACEMENT_TOPCENTER = 'top';
    const PLACEMENT_BOTTOMCENTER = 'bottom';
    const Default$9 = {
      autoClose: true,
      boundary: 'clippingParents',
      display: 'dynamic',
      offset: [0, 2],
      popperConfig: null,
      reference: 'toggle'
    };
    const DefaultType$9 = {
      autoClose: '(boolean|string)',
      boundary: '(string|element)',
      display: 'string',
      offset: '(array|string|function)',
      popperConfig: '(null|object|function)',
      reference: '(string|element|object)'
    };

    /**
     * Class definition
     */

    class Dropdown extends BaseComponent {
      constructor(element, config) {
        super(element, config);
        this._popper = null;
        this._parent = this._element.parentNode; // dropdown wrapper
        // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
        this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
        this._inNavbar = this._detectNavbar();
      }

      // Getters
      static get Default() {
        return Default$9;
      }
      static get DefaultType() {
        return DefaultType$9;
      }
      static get NAME() {
        return NAME$a;
      }

      // Public
      toggle() {
        return this._isShown() ? this.hide() : this.show();
      }
      show() {
        if (isDisabled(this._element) || this._isShown()) {
          return;
        }
        const relatedTarget = {
          relatedTarget: this._element
        };
        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
        if (showEvent.defaultPrevented) {
          return;
        }
        this._createPopper();

        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
          for (const element of [].concat(...document.body.children)) {
            EventHandler.on(element, 'mouseover', noop);
          }
        }
        this._element.focus();
        this._element.setAttribute('aria-expanded', true);
        this._menu.classList.add(CLASS_NAME_SHOW$6);
        this._element.classList.add(CLASS_NAME_SHOW$6);
        EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
      }
      hide() {
        if (isDisabled(this._element) || !this._isShown()) {
          return;
        }
        const relatedTarget = {
          relatedTarget: this._element
        };
        this._completeHide(relatedTarget);
      }
      dispose() {
        if (this._popper) {
          this._popper.destroy();
        }
        super.dispose();
      }
      update() {
        this._inNavbar = this._detectNavbar();
        if (this._popper) {
          this._popper.update();
        }
      }

      // Private
      _completeHide(relatedTarget) {
        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
        if (hideEvent.defaultPrevented) {
          return;
        }

        // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          for (const element of [].concat(...document.body.children)) {
            EventHandler.off(element, 'mouseover', noop);
          }
        }
        if (this._popper) {
          this._popper.destroy();
        }
        this._menu.classList.remove(CLASS_NAME_SHOW$6);
        this._element.classList.remove(CLASS_NAME_SHOW$6);
        this._element.setAttribute('aria-expanded', 'false');
        Manipulator.removeDataAttribute(this._menu, 'popper');
        EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
      }
      _getConfig(config) {
        config = super._getConfig(config);
        if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
          // Popper virtual elements require a getBoundingClientRect method
          throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
        }
        return config;
      }
      _createPopper() {
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
        }
        let referenceElement = this._element;
        if (this._config.reference === 'parent') {
          referenceElement = this._parent;
        } else if (isElement$1(this._config.reference)) {
          referenceElement = getElement(this._config.reference);
        } else if (typeof this._config.reference === 'object') {
          referenceElement = this._config.reference;
        }
        const popperConfig = this._getPopperConfig();
        this._popper = createPopper(referenceElement, this._menu, popperConfig);
      }
      _isShown() {
        return this._menu.classList.contains(CLASS_NAME_SHOW$6);
      }
      _getPlacement() {
        const parentDropdown = this._parent;
        if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
          return PLACEMENT_RIGHT;
        }
        if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
          return PLACEMENT_LEFT;
        }
        if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
          return PLACEMENT_TOPCENTER;
        }
        if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
          return PLACEMENT_BOTTOMCENTER;
        }

        // We need to trim the value because custom properties can also include spaces
        const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
        if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
          return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
        }
        return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
      }
      _detectNavbar() {
        return this._element.closest(SELECTOR_NAVBAR) !== null;
      }
      _getOffset() {
        const {
          offset
        } = this._config;
        if (typeof offset === 'string') {
          return offset.split(',').map(value => Number.parseInt(value, 10));
        }
        if (typeof offset === 'function') {
          return popperData => offset(popperData, this._element);
        }
        return offset;
      }
      _getPopperConfig() {
        const defaultBsPopperConfig = {
          placement: this._getPlacement(),
          modifiers: [{
            name: 'preventOverflow',
            options: {
              boundary: this._config.boundary
            }
          }, {
            name: 'offset',
            options: {
              offset: this._getOffset()
            }
          }]
        };

        // Disable Popper if we have a static display or Dropdown is in Navbar
        if (this._inNavbar || this._config.display === 'static') {
          Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
          defaultBsPopperConfig.modifiers = [{
            name: 'applyStyles',
            enabled: false
          }];
        }
        return {
          ...defaultBsPopperConfig,
          ...execute(this._config.popperConfig, [defaultBsPopperConfig])
        };
      }
      _selectMenuItem({
        key,
        target
      }) {
        const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
        if (!items.length) {
          return;
        }

        // if target isn't included in items (e.g. when expanding the dropdown)
        // allow cycling to get the last item in case key equals ARROW_UP_KEY
        getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Dropdown.getOrCreateInstance(this, config);
          if (typeof config !== 'string') {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        });
      }
      static clearMenus(event) {
        if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
          return;
        }
        const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
        for (const toggle of openToggles) {
          const context = Dropdown.getInstance(toggle);
          if (!context || context._config.autoClose === false) {
            continue;
          }
          const composedPath = event.composedPath();
          const isMenuTarget = composedPath.includes(context._menu);
          if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
            continue;
          }

          // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
          if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
            continue;
          }
          const relatedTarget = {
            relatedTarget: context._element
          };
          if (event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
          context._completeHide(relatedTarget);
        }
      }
      static dataApiKeydownHandler(event) {
        // If not an UP | DOWN | ESCAPE key => not a dropdown command
        // If input/textarea && if key is other than ESCAPE => not a dropdown command

        const isInput = /input|textarea/i.test(event.target.tagName);
        const isEscapeEvent = event.key === ESCAPE_KEY$2;
        const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
        if (!isUpOrDownEvent && !isEscapeEvent) {
          return;
        }
        if (isInput && !isEscapeEvent) {
          return;
        }
        event.preventDefault();

        // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
        const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
        const instance = Dropdown.getOrCreateInstance(getToggleButton);
        if (isUpOrDownEvent) {
          event.stopPropagation();
          instance.show();
          instance._selectMenuItem(event);
          return;
        }
        if (instance._isShown()) {
          // else is escape and we check if it is shown
          event.stopPropagation();
          instance.hide();
          getToggleButton.focus();
        }
      }
    }

    /**
     * Data API implementation
     */

    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
      event.preventDefault();
      Dropdown.getOrCreateInstance(this).toggle();
    });

    /**
     * jQuery
     */

    defineJQueryPlugin(Dropdown);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/backdrop.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$9 = 'backdrop';
    const CLASS_NAME_FADE$4 = 'fade';
    const CLASS_NAME_SHOW$5 = 'show';
    const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
    const Default$8 = {
      className: 'modal-backdrop',
      clickCallback: null,
      isAnimated: false,
      isVisible: true,
      // if false, we use the backdrop helper without adding any element to the dom
      rootElement: 'body' // give the choice to place backdrop under different elements
    };

    const DefaultType$8 = {
      className: 'string',
      clickCallback: '(function|null)',
      isAnimated: 'boolean',
      isVisible: 'boolean',
      rootElement: '(element|string)'
    };

    /**
     * Class definition
     */

    class Backdrop extends Config {
      constructor(config) {
        super();
        this._config = this._getConfig(config);
        this._isAppended = false;
        this._element = null;
      }

      // Getters
      static get Default() {
        return Default$8;
      }
      static get DefaultType() {
        return DefaultType$8;
      }
      static get NAME() {
        return NAME$9;
      }

      // Public
      show(callback) {
        if (!this._config.isVisible) {
          execute(callback);
          return;
        }
        this._append();
        const element = this._getElement();
        if (this._config.isAnimated) {
          reflow(element);
        }
        element.classList.add(CLASS_NAME_SHOW$5);
        this._emulateAnimation(() => {
          execute(callback);
        });
      }
      hide(callback) {
        if (!this._config.isVisible) {
          execute(callback);
          return;
        }
        this._getElement().classList.remove(CLASS_NAME_SHOW$5);
        this._emulateAnimation(() => {
          this.dispose();
          execute(callback);
        });
      }
      dispose() {
        if (!this._isAppended) {
          return;
        }
        EventHandler.off(this._element, EVENT_MOUSEDOWN);
        this._element.remove();
        this._isAppended = false;
      }

      // Private
      _getElement() {
        if (!this._element) {
          const backdrop = document.createElement('div');
          backdrop.className = this._config.className;
          if (this._config.isAnimated) {
            backdrop.classList.add(CLASS_NAME_FADE$4);
          }
          this._element = backdrop;
        }
        return this._element;
      }
      _configAfterMerge(config) {
        // use getElement() with the default "body" to get a fresh Element on each instantiation
        config.rootElement = getElement(config.rootElement);
        return config;
      }
      _append() {
        if (this._isAppended) {
          return;
        }
        const element = this._getElement();
        this._config.rootElement.append(element);
        EventHandler.on(element, EVENT_MOUSEDOWN, () => {
          execute(this._config.clickCallback);
        });
        this._isAppended = true;
      }
      _emulateAnimation(callback) {
        executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/focustrap.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$8 = 'focustrap';
    const DATA_KEY$5 = 'bs.focustrap';
    const EVENT_KEY$5 = `.${DATA_KEY$5}`;
    const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
    const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
    const TAB_KEY = 'Tab';
    const TAB_NAV_FORWARD = 'forward';
    const TAB_NAV_BACKWARD = 'backward';
    const Default$7 = {
      autofocus: true,
      trapElement: null // The element to trap focus inside of
    };

    const DefaultType$7 = {
      autofocus: 'boolean',
      trapElement: 'element'
    };

    /**
     * Class definition
     */

    class FocusTrap extends Config {
      constructor(config) {
        super();
        this._config = this._getConfig(config);
        this._isActive = false;
        this._lastTabNavDirection = null;
      }

      // Getters
      static get Default() {
        return Default$7;
      }
      static get DefaultType() {
        return DefaultType$7;
      }
      static get NAME() {
        return NAME$8;
      }

      // Public
      activate() {
        if (this._isActive) {
          return;
        }
        if (this._config.autofocus) {
          this._config.trapElement.focus();
        }
        EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
        EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
        EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
        this._isActive = true;
      }
      deactivate() {
        if (!this._isActive) {
          return;
        }
        this._isActive = false;
        EventHandler.off(document, EVENT_KEY$5);
      }

      // Private
      _handleFocusin(event) {
        const {
          trapElement
        } = this._config;
        if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
          return;
        }
        const elements = SelectorEngine.focusableChildren(trapElement);
        if (elements.length === 0) {
          trapElement.focus();
        } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
          elements[elements.length - 1].focus();
        } else {
          elements[0].focus();
        }
      }
      _handleKeydown(event) {
        if (event.key !== TAB_KEY) {
          return;
        }
        this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/scrollBar.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
    const SELECTOR_STICKY_CONTENT = '.sticky-top';
    const PROPERTY_PADDING = 'padding-right';
    const PROPERTY_MARGIN = 'margin-right';

    /**
     * Class definition
     */

    class ScrollBarHelper {
      constructor() {
        this._element = document.body;
      }

      // Public
      getWidth() {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
        const documentWidth = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - documentWidth);
      }
      hide() {
        const width = this.getWidth();
        this._disableOverFlow();
        // give padding to element to balance the hidden scrollbar width
        this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
        // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
        this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
        this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
      }
      reset() {
        this._resetElementAttributes(this._element, 'overflow');
        this._resetElementAttributes(this._element, PROPERTY_PADDING);
        this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
        this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
      }
      isOverflowing() {
        return this.getWidth() > 0;
      }

      // Private
      _disableOverFlow() {
        this._saveInitialAttribute(this._element, 'overflow');
        this._element.style.overflow = 'hidden';
      }
      _setElementAttributes(selector, styleProperty, callback) {
        const scrollbarWidth = this.getWidth();
        const manipulationCallBack = element => {
          if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
            return;
          }
          this._saveInitialAttribute(element, styleProperty);
          const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
          element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
        };
        this._applyManipulationCallback(selector, manipulationCallBack);
      }
      _saveInitialAttribute(element, styleProperty) {
        const actualValue = element.style.getPropertyValue(styleProperty);
        if (actualValue) {
          Manipulator.setDataAttribute(element, styleProperty, actualValue);
        }
      }
      _resetElementAttributes(selector, styleProperty) {
        const manipulationCallBack = element => {
          const value = Manipulator.getDataAttribute(element, styleProperty);
          // We only want to remove the property if the value is `null`; the value can also be zero
          if (value === null) {
            element.style.removeProperty(styleProperty);
            return;
          }
          Manipulator.removeDataAttribute(element, styleProperty);
          element.style.setProperty(styleProperty, value);
        };
        this._applyManipulationCallback(selector, manipulationCallBack);
      }
      _applyManipulationCallback(selector, callBack) {
        if (isElement$1(selector)) {
          callBack(selector);
          return;
        }
        for (const sel of SelectorEngine.find(selector, this._element)) {
          callBack(sel);
        }
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap modal.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$7 = 'modal';
    const DATA_KEY$4 = 'bs.modal';
    const EVENT_KEY$4 = `.${DATA_KEY$4}`;
    const DATA_API_KEY$2 = '.data-api';
    const ESCAPE_KEY$1 = 'Escape';
    const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
    const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
    const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
    const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
    const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
    const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
    const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
    const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
    const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
    const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
    const CLASS_NAME_OPEN = 'modal-open';
    const CLASS_NAME_FADE$3 = 'fade';
    const CLASS_NAME_SHOW$4 = 'show';
    const CLASS_NAME_STATIC = 'modal-static';
    const OPEN_SELECTOR$1 = '.modal.show';
    const SELECTOR_DIALOG = '.modal-dialog';
    const SELECTOR_MODAL_BODY = '.modal-body';
    const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
    const Default$6 = {
      backdrop: true,
      focus: true,
      keyboard: true
    };
    const DefaultType$6 = {
      backdrop: '(boolean|string)',
      focus: 'boolean',
      keyboard: 'boolean'
    };

    /**
     * Class definition
     */

    class Modal extends BaseComponent {
      constructor(element, config) {
        super(element, config);
        this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
        this._backdrop = this._initializeBackDrop();
        this._focustrap = this._initializeFocusTrap();
        this._isShown = false;
        this._isTransitioning = false;
        this._scrollBar = new ScrollBarHelper();
        this._addEventListeners();
      }

      // Getters
      static get Default() {
        return Default$6;
      }
      static get DefaultType() {
        return DefaultType$6;
      }
      static get NAME() {
        return NAME$7;
      }

      // Public
      toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
      show(relatedTarget) {
        if (this._isShown || this._isTransitioning) {
          return;
        }
        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
          relatedTarget
        });
        if (showEvent.defaultPrevented) {
          return;
        }
        this._isShown = true;
        this._isTransitioning = true;
        this._scrollBar.hide();
        document.body.classList.add(CLASS_NAME_OPEN);
        this._adjustDialog();
        this._backdrop.show(() => this._showElement(relatedTarget));
      }
      hide() {
        if (!this._isShown || this._isTransitioning) {
          return;
        }
        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
        if (hideEvent.defaultPrevented) {
          return;
        }
        this._isShown = false;
        this._isTransitioning = true;
        this._focustrap.deactivate();
        this._element.classList.remove(CLASS_NAME_SHOW$4);
        this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
      }
      dispose() {
        EventHandler.off(window, EVENT_KEY$4);
        EventHandler.off(this._dialog, EVENT_KEY$4);
        this._backdrop.dispose();
        this._focustrap.deactivate();
        super.dispose();
      }
      handleUpdate() {
        this._adjustDialog();
      }

      // Private
      _initializeBackDrop() {
        return new Backdrop({
          isVisible: Boolean(this._config.backdrop),
          // 'static' option will be translated to true, and booleans will keep their value,
          isAnimated: this._isAnimated()
        });
      }
      _initializeFocusTrap() {
        return new FocusTrap({
          trapElement: this._element
        });
      }
      _showElement(relatedTarget) {
        // try to append dynamic modal
        if (!document.body.contains(this._element)) {
          document.body.append(this._element);
        }
        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.setAttribute('aria-modal', true);
        this._element.setAttribute('role', 'dialog');
        this._element.scrollTop = 0;
        const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
        if (modalBody) {
          modalBody.scrollTop = 0;
        }
        reflow(this._element);
        this._element.classList.add(CLASS_NAME_SHOW$4);
        const transitionComplete = () => {
          if (this._config.focus) {
            this._focustrap.activate();
          }
          this._isTransitioning = false;
          EventHandler.trigger(this._element, EVENT_SHOWN$4, {
            relatedTarget
          });
        };
        this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
      }
      _addEventListeners() {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
          if (event.key !== ESCAPE_KEY$1) {
            return;
          }
          if (this._config.keyboard) {
            this.hide();
            return;
          }
          this._triggerBackdropTransition();
        });
        EventHandler.on(window, EVENT_RESIZE$1, () => {
          if (this._isShown && !this._isTransitioning) {
            this._adjustDialog();
          }
        });
        EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
          // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
          EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
            if (this._element !== event.target || this._element !== event2.target) {
              return;
            }
            if (this._config.backdrop === 'static') {
              this._triggerBackdropTransition();
              return;
            }
            if (this._config.backdrop) {
              this.hide();
            }
          });
        });
      }
      _hideModal() {
        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', true);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        this._isTransitioning = false;
        this._backdrop.hide(() => {
          document.body.classList.remove(CLASS_NAME_OPEN);
          this._resetAdjustments();
          this._scrollBar.reset();
          EventHandler.trigger(this._element, EVENT_HIDDEN$4);
        });
      }
      _isAnimated() {
        return this._element.classList.contains(CLASS_NAME_FADE$3);
      }
      _triggerBackdropTransition() {
        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
        if (hideEvent.defaultPrevented) {
          return;
        }
        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        const initialOverflowY = this._element.style.overflowY;
        // return if the following background transition hasn't yet completed
        if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
          return;
        }
        if (!isModalOverflowing) {
          this._element.style.overflowY = 'hidden';
        }
        this._element.classList.add(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.classList.remove(CLASS_NAME_STATIC);
          this._queueCallback(() => {
            this._element.style.overflowY = initialOverflowY;
          }, this._dialog);
        }, this._dialog);
        this._element.focus();
      }

      /**
       * The following methods are used to handle overflowing modals
       */

      _adjustDialog() {
        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        const scrollbarWidth = this._scrollBar.getWidth();
        const isBodyOverflowing = scrollbarWidth > 0;
        if (isBodyOverflowing && !isModalOverflowing) {
          const property = isRTL() ? 'paddingLeft' : 'paddingRight';
          this._element.style[property] = `${scrollbarWidth}px`;
        }
        if (!isBodyOverflowing && isModalOverflowing) {
          const property = isRTL() ? 'paddingRight' : 'paddingLeft';
          this._element.style[property] = `${scrollbarWidth}px`;
        }
      }
      _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      }

      // Static
      static jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          const data = Modal.getOrCreateInstance(this, config);
          if (typeof config !== 'string') {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](relatedTarget);
        });
      }
    }

    /**
     * Data API implementation
     */

    EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
      const target = SelectorEngine.getElementFromSelector(this);
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }
      EventHandler.one(target, EVENT_SHOW$4, showEvent => {
        if (showEvent.defaultPrevented) {
          // only register focus restorer if modal will actually get shown
          return;
        }
        EventHandler.one(target, EVENT_HIDDEN$4, () => {
          if (isVisible(this)) {
            this.focus();
          }
        });
      });

      // avoid conflict when clicking modal toggler while another one is open
      const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
      if (alreadyOpen) {
        Modal.getInstance(alreadyOpen).hide();
      }
      const data = Modal.getOrCreateInstance(target);
      data.toggle(this);
    });
    enableDismissTrigger(Modal);

    /**
     * jQuery
     */

    defineJQueryPlugin(Modal);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap offcanvas.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$6 = 'offcanvas';
    const DATA_KEY$3 = 'bs.offcanvas';
    const EVENT_KEY$3 = `.${DATA_KEY$3}`;
    const DATA_API_KEY$1 = '.data-api';
    const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
    const ESCAPE_KEY = 'Escape';
    const CLASS_NAME_SHOW$3 = 'show';
    const CLASS_NAME_SHOWING$1 = 'showing';
    const CLASS_NAME_HIDING = 'hiding';
    const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
    const OPEN_SELECTOR = '.offcanvas.show';
    const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
    const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
    const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
    const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
    const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
    const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
    const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
    const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
    const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
    const Default$5 = {
      backdrop: true,
      keyboard: true,
      scroll: false
    };
    const DefaultType$5 = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      scroll: 'boolean'
    };

    /**
     * Class definition
     */

    class Offcanvas extends BaseComponent {
      constructor(element, config) {
        super(element, config);
        this._isShown = false;
        this._backdrop = this._initializeBackDrop();
        this._focustrap = this._initializeFocusTrap();
        this._addEventListeners();
      }

      // Getters
      static get Default() {
        return Default$5;
      }
      static get DefaultType() {
        return DefaultType$5;
      }
      static get NAME() {
        return NAME$6;
      }

      // Public
      toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
      show(relatedTarget) {
        if (this._isShown) {
          return;
        }
        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
          relatedTarget
        });
        if (showEvent.defaultPrevented) {
          return;
        }
        this._isShown = true;
        this._backdrop.show();
        if (!this._config.scroll) {
          new ScrollBarHelper().hide();
        }
        this._element.setAttribute('aria-modal', true);
        this._element.setAttribute('role', 'dialog');
        this._element.classList.add(CLASS_NAME_SHOWING$1);
        const completeCallBack = () => {
          if (!this._config.scroll || this._config.backdrop) {
            this._focustrap.activate();
          }
          this._element.classList.add(CLASS_NAME_SHOW$3);
          this._element.classList.remove(CLASS_NAME_SHOWING$1);
          EventHandler.trigger(this._element, EVENT_SHOWN$3, {
            relatedTarget
          });
        };
        this._queueCallback(completeCallBack, this._element, true);
      }
      hide() {
        if (!this._isShown) {
          return;
        }
        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
        if (hideEvent.defaultPrevented) {
          return;
        }
        this._focustrap.deactivate();
        this._element.blur();
        this._isShown = false;
        this._element.classList.add(CLASS_NAME_HIDING);
        this._backdrop.hide();
        const completeCallback = () => {
          this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
          this._element.removeAttribute('aria-modal');
          this._element.removeAttribute('role');
          if (!this._config.scroll) {
            new ScrollBarHelper().reset();
          }
          EventHandler.trigger(this._element, EVENT_HIDDEN$3);
        };
        this._queueCallback(completeCallback, this._element, true);
      }
      dispose() {
        this._backdrop.dispose();
        this._focustrap.deactivate();
        super.dispose();
      }

      // Private
      _initializeBackDrop() {
        const clickCallback = () => {
          if (this._config.backdrop === 'static') {
            EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
            return;
          }
          this.hide();
        };

        // 'static' option will be translated to true, and booleans will keep their value
        const isVisible = Boolean(this._config.backdrop);
        return new Backdrop({
          className: CLASS_NAME_BACKDROP,
          isVisible,
          isAnimated: true,
          rootElement: this._element.parentNode,
          clickCallback: isVisible ? clickCallback : null
        });
      }
      _initializeFocusTrap() {
        return new FocusTrap({
          trapElement: this._element
        });
      }
      _addEventListeners() {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
          if (event.key !== ESCAPE_KEY) {
            return;
          }
          if (this._config.keyboard) {
            this.hide();
            return;
          }
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        });
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Offcanvas.getOrCreateInstance(this, config);
          if (typeof config !== 'string') {
            return;
          }
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        });
      }
    }

    /**
     * Data API implementation
     */

    EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
      const target = SelectorEngine.getElementFromSelector(this);
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$3, () => {
        // focus on trigger when it is closed
        if (isVisible(this)) {
          this.focus();
        }
      });

      // avoid conflict when clicking a toggler of an offcanvas, while another is open
      const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
      if (alreadyOpen && alreadyOpen !== target) {
        Offcanvas.getInstance(alreadyOpen).hide();
      }
      const data = Offcanvas.getOrCreateInstance(target);
      data.toggle(this);
    });
    EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
      for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
        Offcanvas.getOrCreateInstance(selector).show();
      }
    });
    EventHandler.on(window, EVENT_RESIZE, () => {
      for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
        if (getComputedStyle(element).position !== 'fixed') {
          Offcanvas.getOrCreateInstance(element).hide();
        }
      }
    });
    enableDismissTrigger(Offcanvas);

    /**
     * jQuery
     */

    defineJQueryPlugin(Offcanvas);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/sanitizer.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */

    // js-docs-start allow-list
    const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    const DefaultAllowlist = {
      // Global attributes allowed on any supplied element below.
      '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
      a: ['target', 'href', 'title', 'rel'],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
    };
    // js-docs-end allow-list

    const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

    /**
     * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
     * contexts.
     *
     * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
     */
    // eslint-disable-next-line unicorn/better-regex
    const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
    const allowedAttribute = (attribute, allowedAttributeList) => {
      const attributeName = attribute.nodeName.toLowerCase();
      if (allowedAttributeList.includes(attributeName)) {
        if (uriAttributes.has(attributeName)) {
          return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
        }
        return true;
      }

      // Check if a regular expression validates the attribute.
      return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
    };
    function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
      if (!unsafeHtml.length) {
        return unsafeHtml;
      }
      if (sanitizeFunction && typeof sanitizeFunction === 'function') {
        return sanitizeFunction(unsafeHtml);
      }
      const domParser = new window.DOMParser();
      const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
      const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
      for (const element of elements) {
        const elementName = element.nodeName.toLowerCase();
        if (!Object.keys(allowList).includes(elementName)) {
          element.remove();
          continue;
        }
        const attributeList = [].concat(...element.attributes);
        const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
        for (const attribute of attributeList) {
          if (!allowedAttribute(attribute, allowedAttributes)) {
            element.removeAttribute(attribute.nodeName);
          }
        }
      }
      return createdDocument.body.innerHTML;
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/template-factory.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$5 = 'TemplateFactory';
    const Default$4 = {
      allowList: DefaultAllowlist,
      content: {},
      // { selector : text ,  selector2 : text2 , }
      extraClass: '',
      html: false,
      sanitize: true,
      sanitizeFn: null,
      template: '<div></div>'
    };
    const DefaultType$4 = {
      allowList: 'object',
      content: 'object',
      extraClass: '(string|function)',
      html: 'boolean',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      template: 'string'
    };
    const DefaultContentType = {
      entry: '(string|element|function|null)',
      selector: '(string|element)'
    };

    /**
     * Class definition
     */

    class TemplateFactory extends Config {
      constructor(config) {
        super();
        this._config = this._getConfig(config);
      }

      // Getters
      static get Default() {
        return Default$4;
      }
      static get DefaultType() {
        return DefaultType$4;
      }
      static get NAME() {
        return NAME$5;
      }

      // Public
      getContent() {
        return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
      }
      hasContent() {
        return this.getContent().length > 0;
      }
      changeContent(content) {
        this._checkContent(content);
        this._config.content = {
          ...this._config.content,
          ...content
        };
        return this;
      }
      toHtml() {
        const templateWrapper = document.createElement('div');
        templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
        for (const [selector, text] of Object.entries(this._config.content)) {
          this._setContent(templateWrapper, text, selector);
        }
        const template = templateWrapper.children[0];
        const extraClass = this._resolvePossibleFunction(this._config.extraClass);
        if (extraClass) {
          template.classList.add(...extraClass.split(' '));
        }
        return template;
      }

      // Private
      _typeCheckConfig(config) {
        super._typeCheckConfig(config);
        this._checkContent(config.content);
      }
      _checkContent(arg) {
        for (const [selector, content] of Object.entries(arg)) {
          super._typeCheckConfig({
            selector,
            entry: content
          }, DefaultContentType);
        }
      }
      _setContent(template, content, selector) {
        const templateElement = SelectorEngine.findOne(selector, template);
        if (!templateElement) {
          return;
        }
        content = this._resolvePossibleFunction(content);
        if (!content) {
          templateElement.remove();
          return;
        }
        if (isElement$1(content)) {
          this._putElementInTemplate(getElement(content), templateElement);
          return;
        }
        if (this._config.html) {
          templateElement.innerHTML = this._maybeSanitize(content);
          return;
        }
        templateElement.textContent = content;
      }
      _maybeSanitize(arg) {
        return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
      }
      _resolvePossibleFunction(arg) {
        return execute(arg, [this]);
      }
      _putElementInTemplate(element, templateElement) {
        if (this._config.html) {
          templateElement.innerHTML = '';
          templateElement.append(element);
          return;
        }
        templateElement.textContent = element.textContent;
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap tooltip.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$4 = 'tooltip';
    const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
    const CLASS_NAME_FADE$2 = 'fade';
    const CLASS_NAME_MODAL = 'modal';
    const CLASS_NAME_SHOW$2 = 'show';
    const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
    const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
    const EVENT_MODAL_HIDE = 'hide.bs.modal';
    const TRIGGER_HOVER = 'hover';
    const TRIGGER_FOCUS = 'focus';
    const TRIGGER_CLICK = 'click';
    const TRIGGER_MANUAL = 'manual';
    const EVENT_HIDE$2 = 'hide';
    const EVENT_HIDDEN$2 = 'hidden';
    const EVENT_SHOW$2 = 'show';
    const EVENT_SHOWN$2 = 'shown';
    const EVENT_INSERTED = 'inserted';
    const EVENT_CLICK$1 = 'click';
    const EVENT_FOCUSIN$1 = 'focusin';
    const EVENT_FOCUSOUT$1 = 'focusout';
    const EVENT_MOUSEENTER = 'mouseenter';
    const EVENT_MOUSELEAVE = 'mouseleave';
    const AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: isRTL() ? 'left' : 'right',
      BOTTOM: 'bottom',
      LEFT: isRTL() ? 'right' : 'left'
    };
    const Default$3 = {
      allowList: DefaultAllowlist,
      animation: true,
      boundary: 'clippingParents',
      container: false,
      customClass: '',
      delay: 0,
      fallbackPlacements: ['top', 'right', 'bottom', 'left'],
      html: false,
      offset: [0, 6],
      placement: 'top',
      popperConfig: null,
      sanitize: true,
      sanitizeFn: null,
      selector: false,
      template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
      title: '',
      trigger: 'hover focus'
    };
    const DefaultType$3 = {
      allowList: 'object',
      animation: 'boolean',
      boundary: '(string|element)',
      container: '(string|element|boolean)',
      customClass: '(string|function)',
      delay: '(number|object)',
      fallbackPlacements: 'array',
      html: 'boolean',
      offset: '(array|string|function)',
      placement: '(string|function)',
      popperConfig: '(null|object|function)',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      selector: '(string|boolean)',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string'
    };

    /**
     * Class definition
     */

    class Tooltip extends BaseComponent {
      constructor(element, config) {
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
        }
        super(element, config);

        // Private
        this._isEnabled = true;
        this._timeout = 0;
        this._isHovered = null;
        this._activeTrigger = {};
        this._popper = null;
        this._templateFactory = null;
        this._newContent = null;

        // Protected
        this.tip = null;
        this._setListeners();
        if (!this._config.selector) {
          this._fixTitle();
        }
      }

      // Getters
      static get Default() {
        return Default$3;
      }
      static get DefaultType() {
        return DefaultType$3;
      }
      static get NAME() {
        return NAME$4;
      }

      // Public
      enable() {
        this._isEnabled = true;
      }
      disable() {
        this._isEnabled = false;
      }
      toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
      toggle() {
        if (!this._isEnabled) {
          return;
        }
        this._activeTrigger.click = !this._activeTrigger.click;
        if (this._isShown()) {
          this._leave();
          return;
        }
        this._enter();
      }
      dispose() {
        clearTimeout(this._timeout);
        EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
        if (this._element.getAttribute('data-bs-original-title')) {
          this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
        }
        this._disposePopper();
        super.dispose();
      }
      show() {
        if (this._element.style.display === 'none') {
          throw new Error('Please use show on visible elements');
        }
        if (!(this._isWithContent() && this._isEnabled)) {
          return;
        }
        const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
        const shadowRoot = findShadowRoot(this._element);
        const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
        if (showEvent.defaultPrevented || !isInTheDom) {
          return;
        }

        // TODO: v6 remove this or make it optional
        this._disposePopper();
        const tip = this._getTipElement();
        this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
        const {
          container
        } = this._config;
        if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
          container.append(tip);
          EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
        }
        this._popper = this._createPopper(tip);
        tip.classList.add(CLASS_NAME_SHOW$2);

        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement) {
          for (const element of [].concat(...document.body.children)) {
            EventHandler.on(element, 'mouseover', noop);
          }
        }
        const complete = () => {
          EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
          if (this._isHovered === false) {
            this._leave();
          }
          this._isHovered = false;
        };
        this._queueCallback(complete, this.tip, this._isAnimated());
      }
      hide() {
        if (!this._isShown()) {
          return;
        }
        const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
        if (hideEvent.defaultPrevented) {
          return;
        }
        const tip = this._getTipElement();
        tip.classList.remove(CLASS_NAME_SHOW$2);

        // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          for (const element of [].concat(...document.body.children)) {
            EventHandler.off(element, 'mouseover', noop);
          }
        }
        this._activeTrigger[TRIGGER_CLICK] = false;
        this._activeTrigger[TRIGGER_FOCUS] = false;
        this._activeTrigger[TRIGGER_HOVER] = false;
        this._isHovered = null; // it is a trick to support manual triggering

        const complete = () => {
          if (this._isWithActiveTrigger()) {
            return;
          }
          if (!this._isHovered) {
            this._disposePopper();
          }
          this._element.removeAttribute('aria-describedby');
          EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
        };
        this._queueCallback(complete, this.tip, this._isAnimated());
      }
      update() {
        if (this._popper) {
          this._popper.update();
        }
      }

      // Protected
      _isWithContent() {
        return Boolean(this._getTitle());
      }
      _getTipElement() {
        if (!this.tip) {
          this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
        }
        return this.tip;
      }
      _createTipElement(content) {
        const tip = this._getTemplateFactory(content).toHtml();

        // TODO: remove this check in v6
        if (!tip) {
          return null;
        }
        tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
        // TODO: v6 the following can be achieved with CSS only
        tip.classList.add(`bs-${this.constructor.NAME}-auto`);
        const tipId = getUID(this.constructor.NAME).toString();
        tip.setAttribute('id', tipId);
        if (this._isAnimated()) {
          tip.classList.add(CLASS_NAME_FADE$2);
        }
        return tip;
      }
      setContent(content) {
        this._newContent = content;
        if (this._isShown()) {
          this._disposePopper();
          this.show();
        }
      }
      _getTemplateFactory(content) {
        if (this._templateFactory) {
          this._templateFactory.changeContent(content);
        } else {
          this._templateFactory = new TemplateFactory({
            ...this._config,
            // the `content` var has to be after `this._config`
            // to override config.content in case of popover
            content,
            extraClass: this._resolvePossibleFunction(this._config.customClass)
          });
        }
        return this._templateFactory;
      }
      _getContentForTemplate() {
        return {
          [SELECTOR_TOOLTIP_INNER]: this._getTitle()
        };
      }
      _getTitle() {
        return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
      }

      // Private
      _initializeOnDelegatedTarget(event) {
        return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
      }
      _isAnimated() {
        return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
      }
      _isShown() {
        return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
      }
      _createPopper(tip) {
        const placement = execute(this._config.placement, [this, tip, this._element]);
        const attachment = AttachmentMap[placement.toUpperCase()];
        return createPopper(this._element, tip, this._getPopperConfig(attachment));
      }
      _getOffset() {
        const {
          offset
        } = this._config;
        if (typeof offset === 'string') {
          return offset.split(',').map(value => Number.parseInt(value, 10));
        }
        if (typeof offset === 'function') {
          return popperData => offset(popperData, this._element);
        }
        return offset;
      }
      _resolvePossibleFunction(arg) {
        return execute(arg, [this._element]);
      }
      _getPopperConfig(attachment) {
        const defaultBsPopperConfig = {
          placement: attachment,
          modifiers: [{
            name: 'flip',
            options: {
              fallbackPlacements: this._config.fallbackPlacements
            }
          }, {
            name: 'offset',
            options: {
              offset: this._getOffset()
            }
          }, {
            name: 'preventOverflow',
            options: {
              boundary: this._config.boundary
            }
          }, {
            name: 'arrow',
            options: {
              element: `.${this.constructor.NAME}-arrow`
            }
          }, {
            name: 'preSetPlacement',
            enabled: true,
            phase: 'beforeMain',
            fn: data => {
              // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
              // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
              this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
            }
          }]
        };
        return {
          ...defaultBsPopperConfig,
          ...execute(this._config.popperConfig, [defaultBsPopperConfig])
        };
      }
      _setListeners() {
        const triggers = this._config.trigger.split(' ');
        for (const trigger of triggers) {
          if (trigger === 'click') {
            EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
              const context = this._initializeOnDelegatedTarget(event);
              context.toggle();
            });
          } else if (trigger !== TRIGGER_MANUAL) {
            const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
            const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
            EventHandler.on(this._element, eventIn, this._config.selector, event => {
              const context = this._initializeOnDelegatedTarget(event);
              context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
              context._enter();
            });
            EventHandler.on(this._element, eventOut, this._config.selector, event => {
              const context = this._initializeOnDelegatedTarget(event);
              context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
              context._leave();
            });
          }
        }
        this._hideModalHandler = () => {
          if (this._element) {
            this.hide();
          }
        };
        EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      }
      _fixTitle() {
        const title = this._element.getAttribute('title');
        if (!title) {
          return;
        }
        if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
          this._element.setAttribute('aria-label', title);
        }
        this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
        this._element.removeAttribute('title');
      }
      _enter() {
        if (this._isShown() || this._isHovered) {
          this._isHovered = true;
          return;
        }
        this._isHovered = true;
        this._setTimeout(() => {
          if (this._isHovered) {
            this.show();
          }
        }, this._config.delay.show);
      }
      _leave() {
        if (this._isWithActiveTrigger()) {
          return;
        }
        this._isHovered = false;
        this._setTimeout(() => {
          if (!this._isHovered) {
            this.hide();
          }
        }, this._config.delay.hide);
      }
      _setTimeout(handler, timeout) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(handler, timeout);
      }
      _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(true);
      }
      _getConfig(config) {
        const dataAttributes = Manipulator.getDataAttributes(this._element);
        for (const dataAttribute of Object.keys(dataAttributes)) {
          if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
            delete dataAttributes[dataAttribute];
          }
        }
        config = {
          ...dataAttributes,
          ...(typeof config === 'object' && config ? config : {})
        };
        config = this._mergeConfigObj(config);
        config = this._configAfterMerge(config);
        this._typeCheckConfig(config);
        return config;
      }
      _configAfterMerge(config) {
        config.container = config.container === false ? document.body : getElement(config.container);
        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }
        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }
        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }
        return config;
      }
      _getDelegateConfig() {
        const config = {};
        for (const [key, value] of Object.entries(this._config)) {
          if (this.constructor.Default[key] !== value) {
            config[key] = value;
          }
        }
        config.selector = false;
        config.trigger = 'manual';

        // In the future can be replaced with:
        // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
        // `Object.fromEntries(keysWithDifferentValues)`
        return config;
      }
      _disposePopper() {
        if (this._popper) {
          this._popper.destroy();
          this._popper = null;
        }
        if (this.tip) {
          this.tip.remove();
          this.tip = null;
        }
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Tooltip.getOrCreateInstance(this, config);
          if (typeof config !== 'string') {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        });
      }
    }

    /**
     * jQuery
     */

    defineJQueryPlugin(Tooltip);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap popover.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$3 = 'popover';
    const SELECTOR_TITLE = '.popover-header';
    const SELECTOR_CONTENT = '.popover-body';
    const Default$2 = {
      ...Tooltip.Default,
      content: '',
      offset: [0, 8],
      placement: 'right',
      template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
      trigger: 'click'
    };
    const DefaultType$2 = {
      ...Tooltip.DefaultType,
      content: '(null|string|element|function)'
    };

    /**
     * Class definition
     */

    class Popover extends Tooltip {
      // Getters
      static get Default() {
        return Default$2;
      }
      static get DefaultType() {
        return DefaultType$2;
      }
      static get NAME() {
        return NAME$3;
      }

      // Overrides
      _isWithContent() {
        return this._getTitle() || this._getContent();
      }

      // Private
      _getContentForTemplate() {
        return {
          [SELECTOR_TITLE]: this._getTitle(),
          [SELECTOR_CONTENT]: this._getContent()
        };
      }
      _getContent() {
        return this._resolvePossibleFunction(this._config.content);
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Popover.getOrCreateInstance(this, config);
          if (typeof config !== 'string') {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        });
      }
    }

    /**
     * jQuery
     */

    defineJQueryPlugin(Popover);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap scrollspy.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$2 = 'scrollspy';
    const DATA_KEY$2 = 'bs.scrollspy';
    const EVENT_KEY$2 = `.${DATA_KEY$2}`;
    const DATA_API_KEY = '.data-api';
    const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
    const EVENT_CLICK = `click${EVENT_KEY$2}`;
    const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
    const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
    const CLASS_NAME_ACTIVE$1 = 'active';
    const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
    const SELECTOR_TARGET_LINKS = '[href]';
    const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
    const SELECTOR_NAV_LINKS = '.nav-link';
    const SELECTOR_NAV_ITEMS = '.nav-item';
    const SELECTOR_LIST_ITEMS = '.list-group-item';
    const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
    const SELECTOR_DROPDOWN = '.dropdown';
    const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
    const Default$1 = {
      offset: null,
      // TODO: v6 @deprecated, keep it for backwards compatibility reasons
      rootMargin: '0px 0px -25%',
      smoothScroll: false,
      target: null,
      threshold: [0.1, 0.5, 1]
    };
    const DefaultType$1 = {
      offset: '(number|null)',
      // TODO v6 @deprecated, keep it for backwards compatibility reasons
      rootMargin: 'string',
      smoothScroll: 'boolean',
      target: 'element',
      threshold: 'array'
    };

    /**
     * Class definition
     */

    class ScrollSpy extends BaseComponent {
      constructor(element, config) {
        super(element, config);

        // this._element is the observablesContainer and config.target the menu links wrapper
        this._targetLinks = new Map();
        this._observableSections = new Map();
        this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
        this._activeTarget = null;
        this._observer = null;
        this._previousScrollData = {
          visibleEntryTop: 0,
          parentScrollTop: 0
        };
        this.refresh(); // initialize
      }

      // Getters
      static get Default() {
        return Default$1;
      }
      static get DefaultType() {
        return DefaultType$1;
      }
      static get NAME() {
        return NAME$2;
      }

      // Public
      refresh() {
        this._initializeTargetsAndObservables();
        this._maybeEnableSmoothScroll();
        if (this._observer) {
          this._observer.disconnect();
        } else {
          this._observer = this._getNewObserver();
        }
        for (const section of this._observableSections.values()) {
          this._observer.observe(section);
        }
      }
      dispose() {
        this._observer.disconnect();
        super.dispose();
      }

      // Private
      _configAfterMerge(config) {
        // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
        config.target = getElement(config.target) || document.body;

        // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
        config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
        if (typeof config.threshold === 'string') {
          config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
        }
        return config;
      }
      _maybeEnableSmoothScroll() {
        if (!this._config.smoothScroll) {
          return;
        }

        // unregister any previous listeners
        EventHandler.off(this._config.target, EVENT_CLICK);
        EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
          const observableSection = this._observableSections.get(event.target.hash);
          if (observableSection) {
            event.preventDefault();
            const root = this._rootElement || window;
            const height = observableSection.offsetTop - this._element.offsetTop;
            if (root.scrollTo) {
              root.scrollTo({
                top: height,
                behavior: 'smooth'
              });
              return;
            }

            // Chrome 60 doesn't support `scrollTo`
            root.scrollTop = height;
          }
        });
      }
      _getNewObserver() {
        const options = {
          root: this._rootElement,
          threshold: this._config.threshold,
          rootMargin: this._config.rootMargin
        };
        return new IntersectionObserver(entries => this._observerCallback(entries), options);
      }

      // The logic of selection
      _observerCallback(entries) {
        const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
        const activate = entry => {
          this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
          this._process(targetElement(entry));
        };
        const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
        const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = parentScrollTop;
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            this._activeTarget = null;
            this._clearActiveClass(targetElement(entry));
            continue;
          }
          const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
          // if we are scrolling down, pick the bigger offsetTop
          if (userScrollsDown && entryIsLowerThanPrevious) {
            activate(entry);
            // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
            if (!parentScrollTop) {
              return;
            }
            continue;
          }

          // if we are scrolling up, pick the smallest offsetTop
          if (!userScrollsDown && !entryIsLowerThanPrevious) {
            activate(entry);
          }
        }
      }
      _initializeTargetsAndObservables() {
        this._targetLinks = new Map();
        this._observableSections = new Map();
        const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
        for (const anchor of targetLinks) {
          // ensure that the anchor has an id and is not disabled
          if (!anchor.hash || isDisabled(anchor)) {
            continue;
          }
          const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

          // ensure that the observableSection exists & is visible
          if (isVisible(observableSection)) {
            this._targetLinks.set(decodeURI(anchor.hash), anchor);
            this._observableSections.set(anchor.hash, observableSection);
          }
        }
      }
      _process(target) {
        if (this._activeTarget === target) {
          return;
        }
        this._clearActiveClass(this._config.target);
        this._activeTarget = target;
        target.classList.add(CLASS_NAME_ACTIVE$1);
        this._activateParents(target);
        EventHandler.trigger(this._element, EVENT_ACTIVATE, {
          relatedTarget: target
        });
      }
      _activateParents(target) {
        // Activate dropdown parents
        if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
          SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
          return;
        }
        for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
            item.classList.add(CLASS_NAME_ACTIVE$1);
          }
        }
      }
      _clearActiveClass(parent) {
        parent.classList.remove(CLASS_NAME_ACTIVE$1);
        const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
        for (const node of activeNodes) {
          node.classList.remove(CLASS_NAME_ACTIVE$1);
        }
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = ScrollSpy.getOrCreateInstance(this, config);
          if (typeof config !== 'string') {
            return;
          }
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        });
      }
    }

    /**
     * Data API implementation
     */

    EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
      for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
        ScrollSpy.getOrCreateInstance(spy);
      }
    });

    /**
     * jQuery
     */

    defineJQueryPlugin(ScrollSpy);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap tab.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME$1 = 'tab';
    const DATA_KEY$1 = 'bs.tab';
    const EVENT_KEY$1 = `.${DATA_KEY$1}`;
    const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
    const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
    const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
    const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
    const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
    const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
    const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
    const ARROW_LEFT_KEY = 'ArrowLeft';
    const ARROW_RIGHT_KEY = 'ArrowRight';
    const ARROW_UP_KEY = 'ArrowUp';
    const ARROW_DOWN_KEY = 'ArrowDown';
    const HOME_KEY = 'Home';
    const END_KEY = 'End';
    const CLASS_NAME_ACTIVE = 'active';
    const CLASS_NAME_FADE$1 = 'fade';
    const CLASS_NAME_SHOW$1 = 'show';
    const CLASS_DROPDOWN = 'dropdown';
    const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
    const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
    const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
    const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
    const SELECTOR_OUTER = '.nav-item, .list-group-item';
    const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
    const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
    const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
    const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

    /**
     * Class definition
     */

    class Tab extends BaseComponent {
      constructor(element) {
        super(element);
        this._parent = this._element.closest(SELECTOR_TAB_PANEL);
        if (!this._parent) {
          return;
          // TODO: should throw exception in v6
          // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
        }

        // Set up initial aria attributes
        this._setInitialAttributes(this._parent, this._getChildren());
        EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
      }

      // Getters
      static get NAME() {
        return NAME$1;
      }

      // Public
      show() {
        // Shows this elem and deactivate the active sibling if exists
        const innerElem = this._element;
        if (this._elemIsActive(innerElem)) {
          return;
        }

        // Search for active tab on same parent to deactivate it
        const active = this._getActiveElem();
        const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
          relatedTarget: innerElem
        }) : null;
        const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
          relatedTarget: active
        });
        if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
          return;
        }
        this._deactivate(active, innerElem);
        this._activate(innerElem, active);
      }

      // Private
      _activate(element, relatedElem) {
        if (!element) {
          return;
        }
        element.classList.add(CLASS_NAME_ACTIVE);
        this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

        const complete = () => {
          if (element.getAttribute('role') !== 'tab') {
            element.classList.add(CLASS_NAME_SHOW$1);
            return;
          }
          element.removeAttribute('tabindex');
          element.setAttribute('aria-selected', true);
          this._toggleDropDown(element, true);
          EventHandler.trigger(element, EVENT_SHOWN$1, {
            relatedTarget: relatedElem
          });
        };
        this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
      }
      _deactivate(element, relatedElem) {
        if (!element) {
          return;
        }
        element.classList.remove(CLASS_NAME_ACTIVE);
        element.blur();
        this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

        const complete = () => {
          if (element.getAttribute('role') !== 'tab') {
            element.classList.remove(CLASS_NAME_SHOW$1);
            return;
          }
          element.setAttribute('aria-selected', false);
          element.setAttribute('tabindex', '-1');
          this._toggleDropDown(element, false);
          EventHandler.trigger(element, EVENT_HIDDEN$1, {
            relatedTarget: relatedElem
          });
        };
        this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
      }
      _keydown(event) {
        if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
          return;
        }
        event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
        event.preventDefault();
        const children = this._getChildren().filter(element => !isDisabled(element));
        let nextActiveElement;
        if ([HOME_KEY, END_KEY].includes(event.key)) {
          nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
        } else {
          const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
          nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
        }
        if (nextActiveElement) {
          nextActiveElement.focus({
            preventScroll: true
          });
          Tab.getOrCreateInstance(nextActiveElement).show();
        }
      }
      _getChildren() {
        // collection of inner elements
        return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
      }
      _getActiveElem() {
        return this._getChildren().find(child => this._elemIsActive(child)) || null;
      }
      _setInitialAttributes(parent, children) {
        this._setAttributeIfNotExists(parent, 'role', 'tablist');
        for (const child of children) {
          this._setInitialAttributesOnChild(child);
        }
      }
      _setInitialAttributesOnChild(child) {
        child = this._getInnerElement(child);
        const isActive = this._elemIsActive(child);
        const outerElem = this._getOuterElement(child);
        child.setAttribute('aria-selected', isActive);
        if (outerElem !== child) {
          this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
        }
        if (!isActive) {
          child.setAttribute('tabindex', '-1');
        }
        this._setAttributeIfNotExists(child, 'role', 'tab');

        // set attributes to the related panel too
        this._setInitialAttributesOnTargetPanel(child);
      }
      _setInitialAttributesOnTargetPanel(child) {
        const target = SelectorEngine.getElementFromSelector(child);
        if (!target) {
          return;
        }
        this._setAttributeIfNotExists(target, 'role', 'tabpanel');
        if (child.id) {
          this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
        }
      }
      _toggleDropDown(element, open) {
        const outerElem = this._getOuterElement(element);
        if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
          return;
        }
        const toggle = (selector, className) => {
          const element = SelectorEngine.findOne(selector, outerElem);
          if (element) {
            element.classList.toggle(className, open);
          }
        };
        toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
        toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
        outerElem.setAttribute('aria-expanded', open);
      }
      _setAttributeIfNotExists(element, attribute, value) {
        if (!element.hasAttribute(attribute)) {
          element.setAttribute(attribute, value);
        }
      }
      _elemIsActive(elem) {
        return elem.classList.contains(CLASS_NAME_ACTIVE);
      }

      // Try to get the inner element (usually the .nav-link)
      _getInnerElement(elem) {
        return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
      }

      // Try to get the outer element (usually the .nav-item)
      _getOuterElement(elem) {
        return elem.closest(SELECTOR_OUTER) || elem;
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Tab.getOrCreateInstance(this);
          if (typeof config !== 'string') {
            return;
          }
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        });
      }
    }

    /**
     * Data API implementation
     */

    EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      Tab.getOrCreateInstance(this).show();
    });

    /**
     * Initialize on focus
     */
    EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
      for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
        Tab.getOrCreateInstance(element);
      }
    });
    /**
     * jQuery
     */

    defineJQueryPlugin(Tab);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap toast.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */


    /**
     * Constants
     */

    const NAME = 'toast';
    const DATA_KEY = 'bs.toast';
    const EVENT_KEY = `.${DATA_KEY}`;
    const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
    const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
    const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
    const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
    const EVENT_HIDE = `hide${EVENT_KEY}`;
    const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
    const EVENT_SHOW = `show${EVENT_KEY}`;
    const EVENT_SHOWN = `shown${EVENT_KEY}`;
    const CLASS_NAME_FADE = 'fade';
    const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
    const CLASS_NAME_SHOW = 'show';
    const CLASS_NAME_SHOWING = 'showing';
    const DefaultType = {
      animation: 'boolean',
      autohide: 'boolean',
      delay: 'number'
    };
    const Default = {
      animation: true,
      autohide: true,
      delay: 5000
    };

    /**
     * Class definition
     */

    class Toast extends BaseComponent {
      constructor(element, config) {
        super(element, config);
        this._timeout = null;
        this._hasMouseInteraction = false;
        this._hasKeyboardInteraction = false;
        this._setListeners();
      }

      // Getters
      static get Default() {
        return Default;
      }
      static get DefaultType() {
        return DefaultType;
      }
      static get NAME() {
        return NAME;
      }

      // Public
      show() {
        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
        if (showEvent.defaultPrevented) {
          return;
        }
        this._clearTimeout();
        if (this._config.animation) {
          this._element.classList.add(CLASS_NAME_FADE);
        }
        const complete = () => {
          this._element.classList.remove(CLASS_NAME_SHOWING);
          EventHandler.trigger(this._element, EVENT_SHOWN);
          this._maybeScheduleHide();
        };
        this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
        reflow(this._element);
        this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
        this._queueCallback(complete, this._element, this._config.animation);
      }
      hide() {
        if (!this.isShown()) {
          return;
        }
        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
        if (hideEvent.defaultPrevented) {
          return;
        }
        const complete = () => {
          this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
          this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
          EventHandler.trigger(this._element, EVENT_HIDDEN);
        };
        this._element.classList.add(CLASS_NAME_SHOWING);
        this._queueCallback(complete, this._element, this._config.animation);
      }
      dispose() {
        this._clearTimeout();
        if (this.isShown()) {
          this._element.classList.remove(CLASS_NAME_SHOW);
        }
        super.dispose();
      }
      isShown() {
        return this._element.classList.contains(CLASS_NAME_SHOW);
      }

      // Private

      _maybeScheduleHide() {
        if (!this._config.autohide) {
          return;
        }
        if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
          return;
        }
        this._timeout = setTimeout(() => {
          this.hide();
        }, this._config.delay);
      }
      _onInteraction(event, isInteracting) {
        switch (event.type) {
          case 'mouseover':
          case 'mouseout':
            {
              this._hasMouseInteraction = isInteracting;
              break;
            }
          case 'focusin':
          case 'focusout':
            {
              this._hasKeyboardInteraction = isInteracting;
              break;
            }
        }
        if (isInteracting) {
          this._clearTimeout();
          return;
        }
        const nextElement = event.relatedTarget;
        if (this._element === nextElement || this._element.contains(nextElement)) {
          return;
        }
        this._maybeScheduleHide();
      }
      _setListeners() {
        EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
        EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
        EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
        EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
      }
      _clearTimeout() {
        clearTimeout(this._timeout);
        this._timeout = null;
      }

      // Static
      static jQueryInterface(config) {
        return this.each(function () {
          const data = Toast.getOrCreateInstance(this, config);
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config](this);
          }
        });
      }
    }

    /**
     * Data API implementation
     */

    enableDismissTrigger(Toast);

    /**
     * jQuery
     */

    defineJQueryPlugin(Toast);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap index.umd.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */

    const index_umd = {
      Alert,
      Button,
      Carousel,
      Collapse,
      Dropdown,
      Modal,
      Offcanvas,
      Popover,
      ScrollSpy,
      Tab,
      Toast,
      Tooltip
    };

    return index_umd;

  }));

  /*!
   * smooth-scroll v16.1.3
   * Animate scrolling to anchor links
   * (c) 2020 Chris Ferdinandi
   * MIT License
   * http://github.com/cferdinandi/smooth-scroll
   */

  /**
   * closest() polyfill
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
   */
  if (window.Element && !Element.prototype.closest) {
  	Element.prototype.closest = function(s) {
  		var matches = (this.document || this.ownerDocument).querySelectorAll(s),
  			i,
  			el = this;
  		do {
  			i = matches.length;
  			while (--i >= 0 && matches.item(i) !== el) {}
  		} while ((i < 0) && (el = el.parentElement));
  		return el;
  	};
  }

  /**
   * CustomEvent() polyfill
   * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
   */
  (function () {

  	if (typeof window.CustomEvent === "function") return false;

  	function CustomEvent(event, params) {
  		params = params || { bubbles: false, cancelable: false, detail: undefined };
  		var evt = document.createEvent('CustomEvent');
  		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  		return evt;
  	}

  	CustomEvent.prototype = window.Event.prototype;

  	window.CustomEvent = CustomEvent;
  })();
  /**
   * requestAnimationFrame() polyfill
   * By Erik Möller. Fixes from Paul Irish and Tino Zijdel.
   * @link http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * @link http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   * @license MIT
   */
  (function() {
  	var lastTime = 0;
  	var vendors = ['ms', 'moz', 'webkit', 'o'];
  	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
  		                              window[vendors[x]+'CancelRequestAnimationFrame'];
  	}

  	if (!window.requestAnimationFrame) {
  		window.requestAnimationFrame = function(callback, element) {
  			var currTime = new Date().getTime();
  			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
  			var id = window.setTimeout((function() { callback(currTime + timeToCall); }),
  				timeToCall);
  			lastTime = currTime + timeToCall;
  			return id;
  		};
  	}

  	if (!window.cancelAnimationFrame) {
  		window.cancelAnimationFrame = function(id) {
  			clearTimeout(id);
  		};
  	}
  }());

  (function (root, factory) {
  	if (typeof define === 'function' && define.amd) {
  		define([], (function () {
  			return factory(root);
  		}));
  	} else if (typeof exports === 'object') {
  		module.exports = factory(root);
  	} else {
  		root.SmoothScroll = factory(root);
  	}
  })(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : undefined, (function (window) {

  	//
  	// Default settings
  	//

  	var defaults = {

  		// Selectors
  		ignore: '[data-scroll-ignore]',
  		header: null,
  		topOnEmptyHash: true,

  		// Speed & Duration
  		speed: 500,
  		speedAsDuration: false,
  		durationMax: null,
  		durationMin: null,
  		clip: true,
  		offset: 0,

  		// Easing
  		easing: 'easeInOutCubic',
  		customEasing: null,

  		// History
  		updateURL: true,
  		popstate: true,

  		// Custom Events
  		emitEvents: true

  	};


  	//
  	// Utility Methods
  	//

  	/**
  	 * Check if browser supports required methods
  	 * @return {Boolean} Returns true if all required methods are supported
  	 */
  	var supports = function () {
  		return (
  			'querySelector' in document &&
  			'addEventListener' in window &&
  			'requestAnimationFrame' in window &&
  			'closest' in window.Element.prototype
  		);
  	};

  	/**
  	 * Merge two or more objects together.
  	 * @param   {Object}   objects  The objects to merge together
  	 * @returns {Object}            Merged values of defaults and options
  	 */
  	var extend = function () {
  		var merged = {};
  		Array.prototype.forEach.call(arguments, (function (obj) {
  			for (var key in obj) {
  				if (!obj.hasOwnProperty(key)) return;
  				merged[key] = obj[key];
  			}
  		}));
  		return merged;
  	};

  	/**
  	 * Check to see if user prefers reduced motion
  	 * @param  {Object} settings Script settings
  	 */
  	var reduceMotion = function () {
  		if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches) {
  			return true;
  		}
  		return false;
  	};

  	/**
  	 * Get the height of an element.
  	 * @param  {Node} elem The element to get the height of
  	 * @return {Number}    The element's height in pixels
  	 */
  	var getHeight = function (elem) {
  		return parseInt(window.getComputedStyle(elem).height, 10);
  	};

  	/**
  	 * Escape special characters for use with querySelector
  	 * @author Mathias Bynens
  	 * @link https://github.com/mathiasbynens/CSS.escape
  	 * @param {String} id The anchor ID to escape
  	 */
  	var escapeCharacters = function (id) {

  		// Remove leading hash
  		if (id.charAt(0) === '#') {
  			id = id.substr(1);
  		}

  		var string = String(id);
  		var length = string.length;
  		var index = -1;
  		var codeUnit;
  		var result = '';
  		var firstCodeUnit = string.charCodeAt(0);
  		while (++index < length) {
  			codeUnit = string.charCodeAt(index);
  			// Note: there’s no need to special-case astral symbols, surrogate
  			// pairs, or lone surrogates.

  			// If the character is NULL (U+0000), then throw an
  			// `InvalidCharacterError` exception and terminate these steps.
  			if (codeUnit === 0x0000) {
  				throw new InvalidCharacterError(
  					'Invalid character: the input contains U+0000.'
  				);
  			}

  			if (
  				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
  				// U+007F, […]
  				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
  				// If the character is the first character and is in the range [0-9]
  				// (U+0030 to U+0039), […]
  				(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
  				// If the character is the second character and is in the range [0-9]
  				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
  				(
  					index === 1 &&
  					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
  					firstCodeUnit === 0x002D
  				)
  			) {
  				// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
  				result += '\\' + codeUnit.toString(16) + ' ';
  				continue;
  			}

  			// If the character is not handled by one of the above rules and is
  			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
  			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
  			// U+005A), or [a-z] (U+0061 to U+007A), […]
  			if (
  				codeUnit >= 0x0080 ||
  				codeUnit === 0x002D ||
  				codeUnit === 0x005F ||
  				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
  				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
  				codeUnit >= 0x0061 && codeUnit <= 0x007A
  			) {
  				// the character itself
  				result += string.charAt(index);
  				continue;
  			}

  			// Otherwise, the escaped character.
  			// http://dev.w3.org/csswg/cssom/#escape-a-character
  			result += '\\' + string.charAt(index);

  		}

  		// Return sanitized hash
  		return '#' + result;

  	};

  	/**
  	 * Calculate the easing pattern
  	 * @link https://gist.github.com/gre/1650294
  	 * @param {String} type Easing pattern
  	 * @param {Number} time Time animation should take to complete
  	 * @returns {Number}
  	 */
  	var easingPattern = function (settings, time) {
  		var pattern;

  		// Default Easing Patterns
  		if (settings.easing === 'easeInQuad') pattern = time * time; // accelerating from zero velocity
  		if (settings.easing === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity
  		if (settings.easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
  		if (settings.easing === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity
  		if (settings.easing === 'easeOutCubic') pattern = (--time) * time * time + 1; // decelerating to zero velocity
  		if (settings.easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
  		if (settings.easing === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity
  		if (settings.easing === 'easeOutQuart') pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
  		if (settings.easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
  		if (settings.easing === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity
  		if (settings.easing === 'easeOutQuint') pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
  		if (settings.easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration

  		// Custom Easing Patterns
  		if (!!settings.customEasing) pattern = settings.customEasing(time);

  		return pattern || time; // no easing, no acceleration
  	};

  	/**
  	 * Determine the document's height
  	 * @returns {Number}
  	 */
  	var getDocumentHeight = function () {
  		return Math.max(
  			document.body.scrollHeight, document.documentElement.scrollHeight,
  			document.body.offsetHeight, document.documentElement.offsetHeight,
  			document.body.clientHeight, document.documentElement.clientHeight
  		);
  	};

  	/**
  	 * Calculate how far to scroll
  	 * Clip support added by robjtede - https://github.com/cferdinandi/smooth-scroll/issues/405
  	 * @param {Element} anchor       The anchor element to scroll to
  	 * @param {Number}  headerHeight Height of a fixed header, if any
  	 * @param {Number}  offset       Number of pixels by which to offset scroll
  	 * @param {Boolean} clip         If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
  	 * @returns {Number}
  	 */
  	var getEndLocation = function (anchor, headerHeight, offset, clip) {
  		var location = 0;
  		if (anchor.offsetParent) {
  			do {
  				location += anchor.offsetTop;
  				anchor = anchor.offsetParent;
  			} while (anchor);
  		}
  		location = Math.max(location - headerHeight - offset, 0);
  		if (clip) {
  			location = Math.min(location, getDocumentHeight() - window.innerHeight);
  		}
   		return location;
  	};

  	/**
  	 * Get the height of the fixed header
  	 * @param  {Node}   header The header
  	 * @return {Number}        The height of the header
  	 */
  	var getHeaderHeight = function (header) {
  		return !header ? 0 : (getHeight(header) + header.offsetTop);
  	};

  	/**
  	 * Calculate the speed to use for the animation
  	 * @param  {Number} distance The distance to travel
  	 * @param  {Object} settings The plugin settings
  	 * @return {Number}          How fast to animate
  	 */
  	var getSpeed = function (distance, settings) {
  		var speed = settings.speedAsDuration ? settings.speed : Math.abs(distance / 1000 * settings.speed);
  		if (settings.durationMax && speed > settings.durationMax) return settings.durationMax;
  		if (settings.durationMin && speed < settings.durationMin) return settings.durationMin;
  		return parseInt(speed, 10);
  	};

  	var setHistory = function (options) {

  		// Make sure this should run
  		if (!history.replaceState || !options.updateURL || history.state) return;

  		// Get the hash to use
  		var hash = window.location.hash;
  		hash = hash ? hash : '';

  		// Set a default history
  		history.replaceState(
  			{
  				smoothScroll: JSON.stringify(options),
  				anchor: hash ? hash : window.pageYOffset
  			},
  			document.title,
  			hash ? hash : window.location.href
  		);

  	};

  	/**
  	 * Update the URL
  	 * @param  {Node}    anchor  The anchor that was scrolled to
  	 * @param  {Boolean} isNum   If true, anchor is a number
  	 * @param  {Object}  options Settings for Smooth Scroll
  	 */
  	var updateURL = function (anchor, isNum, options) {

  		// Bail if the anchor is a number
  		if (isNum) return;

  		// Verify that pushState is supported and the updateURL option is enabled
  		if (!history.pushState || !options.updateURL) return;

  		// Update URL
  		history.pushState(
  			{
  				smoothScroll: JSON.stringify(options),
  				anchor: anchor.id
  			},
  			document.title,
  			anchor === document.documentElement ? '#top' : '#' + anchor.id
  		);

  	};

  	/**
  	 * Bring the anchored element into focus
  	 * @param {Node}     anchor      The anchor element
  	 * @param {Number}   endLocation The end location to scroll to
  	 * @param {Boolean}  isNum       If true, scroll is to a position rather than an element
  	 */
  	var adjustFocus = function (anchor, endLocation, isNum) {

  		// Is scrolling to top of page, blur
  		if (anchor === 0) {
  			document.body.focus();
  		}

  		// Don't run if scrolling to a number on the page
  		if (isNum) return;

  		// Otherwise, bring anchor element into focus
  		anchor.focus();
  		if (document.activeElement !== anchor) {
  			anchor.setAttribute('tabindex', '-1');
  			anchor.focus();
  			anchor.style.outline = 'none';
  		}
  		window.scrollTo(0 , endLocation);

  	};

  	/**
  	 * Emit a custom event
  	 * @param  {String} type    The event type
  	 * @param  {Object} options The settings object
  	 * @param  {Node}   anchor  The anchor element
  	 * @param  {Node}   toggle  The toggle element
  	 */
  	var emitEvent = function (type, options, anchor, toggle) {
  		if (!options.emitEvents || typeof window.CustomEvent !== 'function') return;
  		var event = new CustomEvent(type, {
  			bubbles: true,
  			detail: {
  				anchor: anchor,
  				toggle: toggle
  			}
  		});
  		document.dispatchEvent(event);
  	};


  	//
  	// SmoothScroll Constructor
  	//

  	var SmoothScroll = function (selector, options) {

  		//
  		// Variables
  		//

  		var smoothScroll = {}; // Object for public APIs
  		var settings, toggle, fixedHeader, animationInterval;


  		//
  		// Methods
  		//

  		/**
  		 * Cancel a scroll-in-progress
  		 */
  		smoothScroll.cancelScroll = function (noEvent) {
  			cancelAnimationFrame(animationInterval);
  			animationInterval = null;
  			if (noEvent) return;
  			emitEvent('scrollCancel', settings);
  		};

  		/**
  		 * Start/stop the scrolling animation
  		 * @param {Node|Number} anchor  The element or position to scroll to
  		 * @param {Element}     toggle  The element that toggled the scroll event
  		 * @param {Object}      options
  		 */
  		smoothScroll.animateScroll = function (anchor, toggle, options) {

  			// Cancel any in progress scrolls
  			smoothScroll.cancelScroll();

  			// Local settings
  			var _settings = extend(settings || defaults, options || {}); // Merge user options with defaults

  			// Selectors and variables
  			var isNum = Object.prototype.toString.call(anchor) === '[object Number]' ? true : false;
  			var anchorElem = isNum || !anchor.tagName ? null : anchor;
  			if (!isNum && !anchorElem) return;
  			var startLocation = window.pageYOffset; // Current location on the page
  			if (_settings.header && !fixedHeader) {
  				// Get the fixed header if not already set
  				fixedHeader = document.querySelector(_settings.header);
  			}
  			var headerHeight = getHeaderHeight(fixedHeader);
  			var endLocation = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt((typeof _settings.offset === 'function' ? _settings.offset(anchor, toggle) : _settings.offset), 10), _settings.clip); // Location to scroll to
  			var distance = endLocation - startLocation; // distance to travel
  			var documentHeight = getDocumentHeight();
  			var timeLapsed = 0;
  			var speed = getSpeed(distance, _settings);
  			var start, percentage, position;

  			/**
  			 * Stop the scroll animation when it reaches its target (or the bottom/top of page)
  			 * @param {Number} position Current position on the page
  			 * @param {Number} endLocation Scroll to location
  			 * @param {Number} animationInterval How much to scroll on this loop
  			 */
  			var stopAnimateScroll = function (position, endLocation) {

  				// Get the current location
  				var currentLocation = window.pageYOffset;

  				// Check if the end location has been reached yet (or we've hit the end of the document)
  				if (position == endLocation || currentLocation == endLocation || ((startLocation < endLocation && window.innerHeight + currentLocation) >= documentHeight)) {

  					// Clear the animation timer
  					smoothScroll.cancelScroll(true);

  					// Bring the anchored element into focus
  					adjustFocus(anchor, endLocation, isNum);

  					// Emit a custom event
  					emitEvent('scrollStop', _settings, anchor, toggle);

  					// Reset start
  					start = null;
  					animationInterval = null;

  					return true;

  				}
  			};

  			/**
  			 * Loop scrolling animation
  			 */
  			var loopAnimateScroll = function (timestamp) {
  				if (!start) { start = timestamp; }
  				timeLapsed += timestamp - start;
  				percentage = speed === 0 ? 0 : (timeLapsed / speed);
  				percentage = (percentage > 1) ? 1 : percentage;
  				position = startLocation + (distance * easingPattern(_settings, percentage));
  				window.scrollTo(0, Math.floor(position));
  				if (!stopAnimateScroll(position, endLocation)) {
  					animationInterval = window.requestAnimationFrame(loopAnimateScroll);
  					start = timestamp;
  				}
  			};

  			/**
  			 * Reset position to fix weird iOS bug
  			 * @link https://github.com/cferdinandi/smooth-scroll/issues/45
  			 */
  			if (window.pageYOffset === 0) {
  				window.scrollTo(0, 0);
  			}

  			// Update the URL
  			updateURL(anchor, isNum, _settings);

  			// If the user prefers reduced motion, jump to location
  			if (reduceMotion()) {
  				adjustFocus(anchor, Math.floor(endLocation), false);
  				return;
  			}

  			// Emit a custom event
  			emitEvent('scrollStart', _settings, anchor, toggle);

  			// Start scrolling animation
  			smoothScroll.cancelScroll(true);
  			window.requestAnimationFrame(loopAnimateScroll);

  		};

  		/**
  		 * If smooth scroll element clicked, animate scroll
  		 */
  		var clickHandler = function (event) {

  			// Don't run if event was canceled but still bubbled up
  			// By @mgreter - https://github.com/cferdinandi/smooth-scroll/pull/462/
  			if (event.defaultPrevented) return;

  			// Don't run if right-click or command/control + click or shift + click
  			if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;

  			// Check if event.target has closest() method
  			// By @totegi - https://github.com/cferdinandi/smooth-scroll/pull/401/
  			if (!('closest' in event.target)) return;

  			// Check if a smooth scroll link was clicked
  			toggle = event.target.closest(selector);
  			if (!toggle || toggle.tagName.toLowerCase() !== 'a' || event.target.closest(settings.ignore)) return;

  			// Only run if link is an anchor and points to the current page
  			if (toggle.hostname !== window.location.hostname || toggle.pathname !== window.location.pathname || !/#/.test(toggle.href)) return;

  			// Get an escaped version of the hash
  			var hash;
  			try {
  				hash = escapeCharacters(decodeURIComponent(toggle.hash));
  			} catch(e) {
  				hash = escapeCharacters(toggle.hash);
  			}

  			// Get the anchored element
  			var anchor;
  			if (hash === '#') {
  				if (!settings.topOnEmptyHash) return;
  				anchor = document.documentElement;
  			} else {
  				anchor = document.querySelector(hash);
  			}
  			anchor = !anchor && hash === '#top' ? document.documentElement : anchor;

  			// If anchored element exists, scroll to it
  			if (!anchor) return;
  			event.preventDefault();
  			setHistory(settings);
  			smoothScroll.animateScroll(anchor, toggle);

  		};

  		/**
  		 * Animate scroll on popstate events
  		 */
  		var popstateHandler = function (event) {

  			// Stop if history.state doesn't exist (ex. if clicking on a broken anchor link).
  			// fixes `Cannot read property 'smoothScroll' of null` error getting thrown.
  			if (history.state === null) return;

  			// Only run if state is a popstate record for this instantiation
  			if (!history.state.smoothScroll || history.state.smoothScroll !== JSON.stringify(settings)) return;

  			// Only run if state includes an anchor

  			// if (!history.state.anchor && history.state.anchor !== 0) return;

  			// Get the anchor
  			var anchor = history.state.anchor;
  			if (typeof anchor === 'string' && anchor) {
  				anchor = document.querySelector(escapeCharacters(history.state.anchor));
  				if (!anchor) return;
  			}

  			// Animate scroll to anchor link
  			smoothScroll.animateScroll(anchor, null, {updateURL: false});

  		};

  		/**
  		 * Destroy the current initialization.
  		 */
  		smoothScroll.destroy = function () {

  			// If plugin isn't already initialized, stop
  			if (!settings) return;

  			// Remove event listeners
  			document.removeEventListener('click', clickHandler, false);
  			window.removeEventListener('popstate', popstateHandler, false);

  			// Cancel any scrolls-in-progress
  			smoothScroll.cancelScroll();

  			// Reset variables
  			settings = null;
  			toggle = null;
  			fixedHeader = null;
  			animationInterval = null;

  		};

  		/**
  		 * Initialize Smooth Scroll
  		 * @param {Object} options User settings
  		 */
  		var init = function () {

  			// feature test
  			if (!supports()) throw 'Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.';

  			// Destroy any existing initializations
  			smoothScroll.destroy();

  			// Selectors and variables
  			settings = extend(defaults, options || {}); // Merge user options with defaults
  			fixedHeader = settings.header ? document.querySelector(settings.header) : null; // Get the fixed header

  			// When a toggle is clicked, run the click handler
  			document.addEventListener('click', clickHandler, false);

  			// If updateURL and popState are enabled, listen for pop events
  			if (settings.updateURL && settings.popstate) {
  				window.addEventListener('popstate', popstateHandler, false);
  			}

  		};


  		//
  		// Initialize plugin
  		//

  		init();


  		//
  		// Public APIs
  		//

  		return smoothScroll;

  	};

  	return SmoothScroll;

  }));

  /**
   * Animation on scroll (AOS)
   *
   * @requires https://github.com/michalsnik/aos
   */

  (() => {
    const animationToggle = document.querySelector('[data-aos]');
    if (animationToggle === null) return;
    AOS.init(); // eslint-disable-line no-undef
  })();

  /**
   * Bind different content to different navs or even accordion.
   */

  (() => {
    const clickToggles = document.querySelectorAll('[data-binded-content]');

    // Get target element siblings
    const getSiblings = elem => {
      let siblings = [],
        sibling = elem.parentNode.firstChild;
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
          siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
      }
      return siblings;
    };

    // Change binded content function
    const changeBindedContent = target => {
      const targetEl = document.querySelector(target);
      const targetSiblings = getSiblings(targetEl);
      targetSiblings.map(sibling => {
        sibling.classList.remove('active');
      });
      targetEl.classList.add('active');
    };

    // Change binded content on click
    for (let i = 0; i < clickToggles.length; i++) {
      clickToggles[i].addEventListener('click', e => {
        changeBindedContent(e.currentTarget.dataset.bindedContent);
      });
    }
  })();

  /**
   * Update the text of the label when radio button / checkbox changes
   */

  (() => {
    const toggleBtns = document.querySelectorAll('[data-binded-label]');
    for (let i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].addEventListener('change', function () {
        const target = this.dataset.bindedLabel;
        try {
          document.getElementById(target).textContent = this.value;
        } catch (err) {
          /* eslint-disable no-constant-condition */
          if (err.message = "Cannot set property 'textContent' of null") {
            console.error('Make sure the [data-binded-label] matches with the id of the target element you want to change text of!');
          }
          /* eslint-enable no-constant-condition */
        }
      });
    }
  })();

  /**
   * FullCalendar plugin initialization (Schedule)
   * @requires https://github.com/fullcalendar/fullcalendar
   */

  (() => {
    // forEach function
    const forEach = (array, callback, scope) => {
      for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    };

    // Calendar initialisation
    const calendars = document.querySelectorAll('.calendar');
    forEach(calendars, (index, value) => {
      let userOptions;
      if (value.dataset.calendarOptions != undefined) userOptions = JSON.parse(value.dataset.calendarOptions);
      let options = {
        themeSystem: 'bootstrap5',
        ...userOptions
      };

      /* eslint-disable no-undef */
      const calendarInstance = new FullCalendar.Calendar(value, options);
      /* eslint-enable no-undef */
      calendarInstance.render();
    });
  })();

  /**
   * Content carousel with extensive options to control behaviour and appearance
   * @requires https://github.com/nolimits4web/swiper
   */

  (() => {
    // forEach function
    const forEach = (array, callback, scope) => {
      for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    };

    // Carousel initialisation
    const carousels = document.querySelectorAll('.swiper');
    forEach(carousels, (index, value) => {
      let options;
      if (value.dataset.swiperOptions != undefined) options = JSON.parse(value.dataset.swiperOptions);

      // Thumbnails
      if (options.thumbnails) {
        let images = options.thumbnails.images;
        options = Object.assign({}, options, {
          pagination: {
            el: options.thumbnails.el,
            clickable: true,
            bulletActiveClass: 'active',
            renderBullet: (index, className) => {
              return `<li class='swiper-thumbnail ${className}'>
              <img src='${images[index]}' alt='Thumbnail'>
            </li>`;
            }
          }
        });
      }
      const swiper = new Swiper(value, options); // eslint-disable-line no-undef

      // Controlled slider
      if (options.controlledSlider) {
        const controlledSlider = document.querySelector(options.controlledSlider);
        let controlledSliderOptions;
        if (controlledSlider.dataset.swiperOptions != undefined) controlledSliderOptions = JSON.parse(controlledSlider.dataset.swiperOptions);
        /* eslint-disable no-undef */
        const swiperControlled = new Swiper(controlledSlider, controlledSliderOptions);
        /* eslint-enable no-undef */
        swiper.controller.control = swiperControlled;
      }

      // Binded content
      if (options.bindedContent) {
        swiper.on('activeIndexChange', e => {
          const targetItem = document.querySelector(e.slides[e.activeIndex].dataset.swiperBinded);
          const previousItem = document.querySelector(e.slides[e.previousIndex].dataset.swiperBinded);
          previousItem.classList.remove('active');
          targetItem.classList.add('active');
        });
      }
    });
  })();

  /**
   * Charts
   * @requires https://github.com/gionkunz/chartist-js
   */

  (() => {
    const chart = document.querySelectorAll('[data-chart]');
    if (chart.length === 0) return;

    // Line chart
    for (let i = 0; i < chart.length; i++) {
      const dataOptions = JSON.parse(chart[i].dataset.chart);
      new Chart(chart[i], dataOptions); // eslint-disable-line no-undef
    }
  })();

  /**
   * Toggle that checks / unchecks all target checkboxes at once
   */

  (() => {
    const toggler = document.querySelectorAll('[data-bs-toggle="checkbox"]');
    if (toggler.length === 0) return;
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', e => {
        e.preventDefault();
        let checkboxListContainer = document.querySelector(e.target.dataset.bsTarget),
          checkboxList = checkboxListContainer.querySelectorAll('input[type="checkbox"]');
        checkboxListContainer.classList.toggle('all-checked');
        if (checkboxListContainer.classList.contains('all-checked')) {
          for (let n = 0; n < checkboxList.length; n++) {
            checkboxList[n].checked = true;
          }
        } else {
          for (let m = 0; m < checkboxList.length; m++) {
            checkboxList[m].checked = false;
          }
        }
      });
    }
  })();

  /**
   * Count input with increment (+) and decrement (-) buttons
   */

  (() => {
    const countInputs = document.querySelectorAll('.count-input');
    for (let i = 0; i < countInputs.length; i++) {
      const component = countInputs[i];
      const incrementBtn = component.querySelector('[data-increment]');
      const decrementBtn = component.querySelector('[data-decrement]');
      const input = component.querySelector('.form-control');
      const handleIncrement = () => {
        input.value++;
      };
      const handleDecrement = () => {
        if (input.value > 0) {
          input.value--;
        }
      };

      // Add click event to buttons
      incrementBtn.addEventListener('click', handleIncrement);
      decrementBtn.addEventListener('click', handleDecrement);
    }
  })();

  /**
   * Countdown timer
   * @requires https://github.com/BrooonS/timezz
   */

  (() => {
    const timers = document.querySelectorAll('.countdown');
    if (timers.length === 0) return;
    for (let i = 0; i < timers.length; i++) {
      const date = timers[i].dataset.countdownDate;

      /* eslint-disable no-undef */
      timezz(timers[i], {
        date: date
        // add more options here
      });
      /* eslint-enable no-undef */
    }
  })();

  /**
   * Date / time picker
   * @requires https://github.com/flatpickr/flatpickr
   */

  (() => {
    const picker = document.querySelectorAll('.date-picker');
    if (picker.length === 0) return;
    for (let i = 0; i < picker.length; i++) {
      const defaults = {
        disableMobile: 'true'
      };
      let userOptions;
      if (picker[i].dataset.datepickerOptions != undefined) userOptions = JSON.parse(picker[i].dataset.datepickerOptions);

      /* eslint-disable no-undef */
      const linkedInput = picker[i].classList.contains('date-range') ? {
        plugins: [new rangePlugin({
          input: picker[i].dataset.linkedInput
        })]
      } : '{}';
      /* eslint-enable no-undef */
      const options = {
        ...defaults,
        ...linkedInput,
        ...userOptions
      };
      flatpickr(picker[i], options); // eslint-disable-line no-undef
    }
  })();

  /**
   * Form validation
   */

  (() => {
    const selector = 'needs-validation';
    window.addEventListener('load', () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName(selector);
      // Loop over them and prevent submission

      /* eslint-disable no-unused-vars */
      Array.prototype.filter.call(forms, form => {
        form.addEventListener('submit', e => {
          if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
      /* eslint-enable no-unused-vars */
    }, false);
  })();

  /**
   * Gallery like styled lightbox component for presenting various types of media
   * @requires https://github.com/sachinchoolur/lightGallery
   */

  (() => {
    const gallery = document.querySelectorAll('.gallery');
    if (gallery.length) {
      for (let i = 0; i < gallery.length; i++) {
        /* eslint-disable no-undef */
        const thumbnails = gallery[i].dataset.thumbnails ? true : false,
          video = gallery[i].dataset.video ? true : false,
          defaultPlugins = [lgZoom, lgFullscreen],
          videoPlugin = video ? [lgVideo] : [],
          thumbnailPlugin = thumbnails ? [lgThumbnail] : [],
          plugins = [...defaultPlugins, ...videoPlugin, ...thumbnailPlugin];
        lightGallery(gallery[i], {
          selector: '.gallery-item',
          plugins: plugins,
          licenseKey: 'D4194FDD-48924833-A54AECA3-D6F8E646',
          download: false,
          autoplayVideoOnSlide: true,
          zoomFromOrigin: false,
          youtubePlayerParams: {
            modestbranding: 1,
            showinfo: 0,
            rel: 0
          },
          vimeoPlayerParams: {
            byline: 0,
            portrait: 0,
            color: '6366f1'
          }
        });
        /* eslint-enable no-undef */
      }
    }
  })();

  /**
   * Focus first input on modal / offcanvas / collapse open
   *
   */

  (() => {
    const targetInput = document.querySelectorAll('[data-focus-on-open]');
    if (targetInput === null) return;
    for (let i = 0; i < targetInput.length; i++) {
      const toggler = JSON.parse(targetInput[i].dataset.focusOnOpen);
      document.querySelector(toggler[1]).addEventListener(`shown.bs.${toggler[0]}`, () => {
        targetInput[i].focus();
      });
    }
  })();

  /**
   * Input fields formatter
   * @requires https://github.com/nosir/cleave.js
   */

  (() => {
    const input = document.querySelectorAll('[data-format]');
    if (input.length === 0) return;
    for (let i = 0; i < input.length; i++) {
      let targetInput = input[i],
        cardIcon = targetInput.parentNode.querySelector('.credit-card-icon'),
        options;
      if (targetInput.dataset.format != undefined) options = JSON.parse(targetInput.dataset.format);

      /* eslint-disable no-unused-vars, no-undef */
      if (cardIcon) {
        new Cleave(targetInput, {
          ...options,
          onCreditCardTypeChanged: type => {
            cardIcon.className = 'credit-card-icon ' + type;
          }
        });
      } else {
        new Cleave(targetInput, options);
      }
      /* eslint-enable no-unused-vars, no-undef */
    }
  })();

  /**
   * Interactive map
   * @requires https://github.com/Leaflet/Leaflet
   */

  (() => {
    const mapList = document.querySelectorAll('.interactive-map');
    if (mapList.length === 0) return;
    for (let i = 0; i < mapList.length; i++) {
      const mapOptions = mapList[i].dataset.mapOptions;
      let map;

      // Map options: Inline JSON data
      if (mapOptions && mapOptions !== '') {
        const mapOptionsObj = JSON.parse(mapOptions),
          mapLayer = mapOptionsObj.mapLayer || 'https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=BO4zZpr0fIIoydRTOLSx',
          mapCenter = mapOptionsObj.center ? mapOptionsObj.center : [0, 0],
          mapZoom = mapOptionsObj.zoom || 1,
          scrollWheelZoom = mapOptionsObj.scrollWheelZoom === false ? false : true,
          markers = mapOptionsObj.markers;

        // Map setup
        /* eslint-disable no-undef */
        map = L.map(mapList[i], {
          scrollWheelZoom: scrollWheelZoom
        }).setView(mapCenter, mapZoom);

        // Tile layer
        L.tileLayer(mapLayer, {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
          crossOrigin: true
        }).addTo(map);

        // Markers
        if (markers) {
          for (let n = 0; n < markers.length; n++) {
            const iconUrl = markers[n].iconUrl,
              shadowUrl = markers[n].shadowUrl,
              markerIcon = L.icon({
                iconUrl: iconUrl || 'assets/img/map/marker-icon.png',
                iconSize: [30, 43],
                iconAnchor: [14, 43],
                shadowUrl: shadowUrl || 'assets/img/map/marker-shadow.png',
                shadowSize: [41, 41],
                shadowAnchor: [13, 41],
                popupAnchor: [1, -40]
              }),
              popup = markers[n].popup;
            const marker = L.marker(markers[n].position, {
              icon: markerIcon
            }).addTo(map);
            if (popup) {
              marker.bindPopup(popup);
            }
          }
        }

        // Map option: No options provided
      } else {
        map = L.map(mapList[i]).setView([0, 0], 1);
        L.tileLayer('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=BO4zZpr0fIIoydRTOLSx', {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
          crossOrigin: true
        }).addTo(map);
      }
      /* eslint-enable no-undef */
    }
  })();

  /**
   * Cascading (Masonry) grid layout
   *
   * @requires https://github.com/desandro/imagesloaded
   * @requires https://github.com/Vestride/Shuffle
   */

  (() => {
    const grid = document.querySelectorAll('.masonry-grid');
    let masonry;
    if (grid === null) return;
    for (let i = 0; i < grid.length; i++) {
      /* eslint-disable no-undef */
      masonry = new Shuffle(grid[i], {
        itemSelector: '.masonry-grid-item',
        sizer: '.masonry-grid-item'
      });
      imagesLoaded(grid[i]).on('progress', () => {
        masonry.layout();
      });
      /* eslint-enable no-undef */

      // Filtering
      const filtersWrap = grid[i].closest('.masonry-filterable');
      if (filtersWrap === null) return;
      const filters = filtersWrap.querySelectorAll('.masonry-filters [data-group]');
      for (let n = 0; n < filters.length; n++) {
        filters[n].addEventListener('click', function (e) {
          const current = filtersWrap.querySelector('.masonry-filters .active');
          const target = this.dataset.group;
          if (current !== null) {
            current.classList.remove('active');
          }
          this.classList.add('active');
          masonry.filter(target);
          e.preventDefault();
        });
      }
    }
  })();

  /**
   * Mouse move parallax effect
   * @requires https://github.com/wagerfield/parallax
   */

  (() => {
    const element = document.querySelectorAll('.parallax');

    /* eslint-disable no-unused-vars, no-undef */
    for (let i = 0; i < element.length; i++) {
      new Parallax(element[i]);
    }
    /* eslint-enable no-unused-vars, no-undef */
  })();

  /**
   * Toggling password visibility in password input
   */

  (() => {
    const elements = document.querySelectorAll('.password-toggle');
    for (let i = 0; i < elements.length; i++) {
      const passInput = elements[i].querySelector('.form-control');
      const passToggle = elements[i].querySelector('.password-toggle-btn');
      passToggle.addEventListener('click', e => {
        if (e.target.type !== 'checkbox') return;
        if (e.target.checked) {
          passInput.type = 'text';
        } else {
          passInput.type = 'password';
        }
      }, false);
    }
  })();

  /**
   * Popover
   * @requires https://getbootstrap.com
   * @requires https://popper.js.org/
   */

  (() => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');

    /* eslint-disable no-unused-vars, no-undef */
    [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    /* eslint-enable no-unused-vars, no-undef */
  })();

  /**
   * Price switch
   */

  (() => {
    const switchWrapper = document.querySelectorAll('.price-switch-wrapper');
    if (switchWrapper.length <= 0) return;
    const showMonthlyPrice = (monthlyPrice, annualPrice) => {
      for (let n = 0; n < monthlyPrice.length; n++) {
        annualPrice[n].classList.add('d-none');
        monthlyPrice[n].classList.remove('d-none');
      }
    };
    const showAnnualPrice = (monthlyPrice, annualPrice) => {
      for (let n = 0; n < monthlyPrice.length; n++) {
        monthlyPrice[n].classList.add('d-none');
        annualPrice[n].classList.remove('d-none');
      }
    };
    for (let i = 0; i < switchWrapper.length; i++) {
      const switchToggle = switchWrapper[i].querySelector('[data-bs-toggle="price"]');
      switchToggle.addEventListener('change', e => {
        const monthlySwitch = e.currentTarget.querySelector('[data-monthly-switch]');
        const annualSwitch = e.currentTarget.querySelector('[data-annual-switch]');
        const monthlyPrice = e.currentTarget.closest('.price-switch-wrapper').querySelectorAll('[data-monthly-price]');
        const annualPrice = e.currentTarget.closest('.price-switch-wrapper').querySelectorAll('[data-annual-price]');
        if (monthlySwitch.checked == true) showMonthlyPrice(monthlyPrice, annualPrice);
        if (annualSwitch.checked == true) showAnnualPrice(monthlyPrice, annualPrice);
      });
    }
  })();

  /**
   * Range slider
   * @requires https://github.com/leongersen/noUiSlider
   */

  (() => {
    let rangeSliderWidget = document.querySelectorAll('.range-slider');
    for (let i = 0; i < rangeSliderWidget.length; i++) {
      let rangeSlider = rangeSliderWidget[i].querySelector('.range-slider-ui'),
        valueMinInput = rangeSliderWidget[i].querySelector('.range-slider-value-min'),
        valueMaxInput = rangeSliderWidget[i].querySelector('.range-slider-value-max');
      let options = {
        dataStartMin: parseInt(rangeSliderWidget[i].dataset.startMin, 10),
        dataStartMax: parseInt(rangeSliderWidget[i].dataset.startMax, 10),
        dataMin: parseInt(rangeSliderWidget[i].dataset.min, 10),
        dataMax: parseInt(rangeSliderWidget[i].dataset.max, 10),
        dataStep: parseInt(rangeSliderWidget[i].dataset.step, 10),
        dataPips: rangeSliderWidget[i].dataset.pips,
        dataTooltips: rangeSliderWidget[i].dataset.tooltips ? rangeSliderWidget[i].dataset.tooltips === 'true' : true,
        dataTooltipPrefix: rangeSliderWidget[i].dataset.tooltipPrefix || '',
        dataTooltipSuffix: rangeSliderWidget[i].dataset.tooltipSuffix || ''
      };
      let start = options.dataStartMax ? [options.dataStartMin, options.dataStartMax] : [options.dataStartMin],
        connect = options.dataStartMax ? true : 'lower';

      /* eslint-disable no-undef */
      noUiSlider.create(rangeSlider, {
        start: start,
        connect: connect,
        step: options.dataStep,
        pips: options.dataPips ? {
          mode: 'count',
          values: 5
        } : false,
        tooltips: options.dataTooltips,
        range: {
          min: options.dataMin,
          max: options.dataMax
        },
        format: {
          to: function (value) {
            return options.dataTooltipPrefix + parseInt(value, 10) + options.dataTooltipSuffix;
          },
          from: function (value) {
            return Number(value);
          }
        }
      });
      /* eslint-enable no-undef */

      rangeSlider.noUiSlider.on('update', (values, handle) => {
        let value = values[handle];
        value = value.replace(/\D/g, '');
        if (handle) {
          if (valueMaxInput) {
            valueMaxInput.value = Math.round(value);
          }
        } else {
          if (valueMinInput) {
            valueMinInput.value = Math.round(value);
          }
        }
      });
      if (valueMinInput) {
        valueMinInput.addEventListener('change', function () {
          rangeSlider.noUiSlider.set([this.value, null]);
        });
      }
      if (valueMaxInput) {
        valueMaxInput.addEventListener('change', function () {
          rangeSlider.noUiSlider.set([null, this.value]);
        });
      }
    }
  })();

  /**
   * Animate scroll to top button in/off view
   */

  (() => {
    const button = document.querySelector('.btn-scroll-top');
    const scrollOffset = 450;
    if (button == null) return;
    const offsetFromTop = parseInt(scrollOffset, 10);
    const progress = button.querySelector('svg circle');
    const length = progress.getTotalLength();
    progress.style.strokeDasharray = length;
    progress.style.strokeDashoffset = length;
    const showProgress = () => {
      const scrollPercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const draw = length * scrollPercent;
      progress.style.strokeDashoffset = length - draw;
    };
    window.addEventListener('scroll', e => {
      if (e.currentTarget.pageYOffset > offsetFromTop) {
        button.classList.add('show');
      } else {
        button.classList.remove('show');
      }
      showProgress();
    });
  })();

  /**
   * Anchor smooth scrolling
   * @requires https://github.com/cferdinandi/smooth-scroll/
   */

  (() => {
    /* eslint-disable no-unused-vars, no-undef */
    const selector = '[data-scroll]',
      fixedHeader = '[data-scroll-header]';
      new SmoothScroll(selector, {
        speed: 800,
        speedAsDuration: true,
        offset: (anchor, toggle) => {
          return toggle.dataset.scrollOffset || 20;
        },
        header: fixedHeader,
        updateURL: false
      });
    /* eslint-enable no-unused-vars, no-undef */
  })();

  /**
   * Add solid background to fixed to top navigation bar
   */

  (() => {
    const navbar = document.querySelector('.navbar.fixed-top');
    if (navbar == null) return;
    const navbarClass = navbar.classList;
    const scrollOffset = 20;
    const navbarStuck = e => {
      if (e.currentTarget.pageYOffset > scrollOffset) {
        navbarClass.add('navbar-stuck');
      } else {
        navbarClass.remove('navbar-stuck');
      }
    };

    // On load
    window.addEventListener('load', e => {
      navbarStuck(e);
    });

    // On scroll
    window.addEventListener('scroll', e => {
      navbarStuck(e);
    });
  })();

  /**
   * Ajaxify MailChimp subscription form
   */

  (() => {
    const form = document.querySelectorAll('.subscription-form');
    if (form === null) return;
    for (let i = 0; i < form.length; i++) {
      const button = form[i].querySelector('button[type="submit"]'),
        buttonText = button.innerHTML,
        input = form[i].querySelector('.form-control'),
        antispam = form[i].querySelector('.subscription-form-antispam'),
        status = form[i].querySelector('.subscription-status');
      form[i].addEventListener('submit', function (e) {
        if (e) e.preventDefault();
        if (antispam.value !== '') return;
        register(this, button, input, buttonText, status);
      });
    }
    const register = (form, button, input, buttonText, status) => {
      button.innerHTML = 'Sending...';

      // Get url for MailChimp
      const url = form.action.replace('/post?', '/post-json?');

      // Add form data to object
      const data = '&' + input.name + '=' + encodeURIComponent(input.value);

      // Create and add post script to the DOM
      const script = document.createElement('script');
      script.src = url + '&c=callback' + data;
      document.body.appendChild(script);

      // Callback function
      const callback = 'callback';
      window[callback] = response => {
        // Remove post script from the DOM
        delete window[callback];
        document.body.removeChild(script);

        // Change button text back to initial
        button.innerHTML = buttonText;

        // Display content and apply styling to response message conditionally
        if (response.result == 'success') {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          status.classList.remove('status-error');
          status.classList.add('status-success');
          status.innerHTML = response.msg;
          setTimeout(() => {
            input.classList.remove('is-valid');
            status.innerHTML = '';
            status.classList.remove('status-success');
          }, 6000);
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
          status.classList.remove('status-success');
          status.classList.add('status-error');
          status.innerHTML = response.msg.substring(4);
          setTimeout(() => {
            input.classList.remove('is-invalid');
            status.innerHTML = '';
            status.classList.remove('status-error');
          }, 6000);
        }
      };
    };
  })();

  /**
   * Toast
   * @requires https://getbootstrap.com
   */

  (() => {
    const toastElList = [].slice.call(document.querySelectorAll('.toast'));

    /* eslint-disable no-unused-vars, no-undef */
    toastElList.map(toastEl => new bootstrap.Toast(toastEl));
    /* eslint-enable no-unused-vars, no-undef */
  })();

  /**
   * Tooltip
   * @requires https://getbootstrap.com
   * @requires https://popper.js.org/
   */

  (() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    /* eslint-disable no-unused-vars, no-undef */
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: 'hover'
    }));
    /* eslint-enable no-unused-vars, no-undef */
  })();

  /**
   * Open YouTube video in lightbox
   * @requires https://github.com/sachinchoolur/lightGallery
   */

  (() => {
    const button = document.querySelectorAll('[data-bs-toggle="video"]');
    if (button.length) {
      for (let i = 0; i < button.length; i++) {
        /* eslint-disable no-undef */
        // TODO: lightGallery is not defined!
        // lightGallery(button[i], {
        //   selector: 'this',
        //   plugins: [lgVideo],
        //   licenseKey: 'D4194FDD-48924833-A54AECA3-D6F8E646',
        //   download: false,
        //   youtubePlayerParams: {
        //     modestbranding: 1,
        //     showinfo: 0,
        //     rel: 0,
        //   },
        //   vimeoPlayerParams: {
        //     byline: 0,
        //     portrait: 0,
        //     color: '6366f1',
        //   },
        // })
        /* eslint-enable no-undef */
      }
    }
  })();

  /** Root of all javascript scripts to be compiled to static assets directory
   *
   * This file is the entry point for all JavaScript files in the project.
   * It imports all the necessary components and libraries required for the project.
   */

  // const foo = function
  // export function foo() {
  //   return { renderRadialPlot }
  // }
  var main = (() => {
    return {
      renderRadialPlot: q_
    };
  });

  return main;

})();
//# sourceMappingURL=main.js.map

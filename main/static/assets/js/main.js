var main = (function () {
  'use strict';

  function ascending$1(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function descending(a, b) {
    return a == null || b == null ? NaN
      : b < a ? -1
      : b > a ? 1
      : b >= a ? 0
      : NaN;
  }

  function bisector(f) {
    let compare1, compare2, delta;

    // If an accessor is specified, promote it to a comparator. In this case we
    // can test whether the search value is (self-) comparable. We can’t do this
    // for a comparator (except for specific, known comparators) because we can’t
    // tell if the comparator is symmetric, and an asymmetric comparator can’t be
    // used to test whether a single value is comparable.
    if (f.length !== 2) {
      compare1 = ascending$1;
      compare2 = (d, x) => ascending$1(f(d), x);
      delta = (d, x) => f(d) - x;
    } else {
      compare1 = f === ascending$1 || f === descending ? f : zero$1;
      compare2 = f;
      delta = f;
    }

    function left(a, x, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x, x) !== 0) return hi;
        do {
          const mid = (lo + hi) >>> 1;
          if (compare2(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        } while (lo < hi);
      }
      return lo;
    }

    function right(a, x, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x, x) !== 0) return hi;
        do {
          const mid = (lo + hi) >>> 1;
          if (compare2(a[mid], x) <= 0) lo = mid + 1;
          else hi = mid;
        } while (lo < hi);
      }
      return lo;
    }

    function center(a, x, lo = 0, hi = a.length) {
      const i = left(a, x, lo, hi - 1);
      return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }

    return {left, center, right};
  }

  function zero$1() {
    return 0;
  }

  function number$1(x) {
    return x === null ? NaN : +x;
  }

  const ascendingBisect = bisector(ascending$1);
  const bisectRight = ascendingBisect.right;
  bisector(number$1).center;

  class InternMap extends Map {
    constructor(entries, key = keyof) {
      super();
      Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
      if (entries != null) for (const [key, value] of entries) this.set(key, value);
    }
    get(key) {
      return super.get(intern_get(this, key));
    }
    has(key) {
      return super.has(intern_get(this, key));
    }
    set(key, value) {
      return super.set(intern_set(this, key), value);
    }
    delete(key) {
      return super.delete(intern_delete(this, key));
    }
  }

  class InternSet extends Set {
    constructor(values, key = keyof) {
      super();
      Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
      if (values != null) for (const value of values) this.add(value);
    }
    has(value) {
      return super.has(intern_get(this, value));
    }
    add(value) {
      return super.add(intern_set(this, value));
    }
    delete(value) {
      return super.delete(intern_delete(this, value));
    }
  }

  function intern_get({_intern, _key}, value) {
    const key = _key(value);
    return _intern.has(key) ? _intern.get(key) : value;
  }

  function intern_set({_intern, _key}, value) {
    const key = _key(value);
    if (_intern.has(key)) return _intern.get(key);
    _intern.set(key, value);
    return value;
  }

  function intern_delete({_intern, _key}, value) {
    const key = _key(value);
    if (_intern.has(key)) {
      value = _intern.get(key);
      _intern.delete(key);
    }
    return value;
  }

  function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  function identity$3(x) {
    return x;
  }

  function group(values, ...keys) {
    return nest(values, identity$3, identity$3, keys);
  }

  function nest(values, map, reduce, keys) {
    return (function regroup(values, i) {
      if (i >= keys.length) return reduce(values);
      const groups = new InternMap();
      const keyof = keys[i++];
      let index = -1;
      for (const value of values) {
        const key = keyof(value, ++index, values);
        const group = groups.get(key);
        if (group) group.push(value);
        else groups.set(key, [value]);
      }
      for (const [key, values] of groups) {
        groups.set(key, regroup(values, i));
      }
      return map(groups);
    })(values, 0);
  }

  const e10 = Math.sqrt(50),
      e5 = Math.sqrt(10),
      e2 = Math.sqrt(2);

  function tickSpec(start, stop, count) {
    const step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log10(step)),
        error = step / Math.pow(10, power),
        factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
    let i1, i2, inc;
    if (power < 0) {
      inc = Math.pow(10, -power) / factor;
      i1 = Math.round(start * inc);
      i2 = Math.round(stop * inc);
      if (i1 / inc < start) ++i1;
      if (i2 / inc > stop) --i2;
      inc = -inc;
    } else {
      inc = Math.pow(10, power) * factor;
      i1 = Math.round(start / inc);
      i2 = Math.round(stop / inc);
      if (i1 * inc < start) ++i1;
      if (i2 * inc > stop) --i2;
    }
    if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
    return [i1, i2, inc];
  }

  function ticks(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    if (!(count > 0)) return [];
    if (start === stop) return [start];
    const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
    if (!(i2 >= i1)) return [];
    const n = i2 - i1 + 1, ticks = new Array(n);
    if (reverse) {
      if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
      else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
    } else {
      if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
      else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
    }
    return ticks;
  }

  function tickIncrement(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    return tickSpec(start, stop, count)[2];
  }

  function tickStep(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
    return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
  }

  function max$1(values, valueof) {
    let max;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    }
    return max;
  }

  function min$1(values, valueof) {
    let min;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (min > value || (min === undefined && value >= value))) {
          min = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (min > value || (min === undefined && value >= value))) {
          min = value;
        }
      }
    }
    return min;
  }

  function union(...others) {
    const set = new InternSet();
    for (const other of others) {
      for (const o of other) {
        set.add(o);
      }
    }
    return set;
  }

  var noop = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames$1(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  // Given something array like (or null), returns something that is strictly an
  // array. This is used to ensure that array-like objects passed to d3.selectAll
  // or selection.selectAll are converted into proper arrays when creating a
  // selection; we don’t ever want to create a selection backed by a live
  // HTMLCollection or NodeList. However, note that selection.selectAll will use a
  // static NodeList as a group, since it safely derived from querySelectorAll.
  function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection$1(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return Array.from(this.children);
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant$2(x) {
    return function() {
      return x;
    };
  }

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant$2(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  // Given some data, this returns an array-like view of it: an object that
  // exposes a length property and allows numeric indexing. Note that unlike
  // selectAll, this isn’t worried about “live” collections because the resulting
  // array will only be used briefly while data is being bound. (It is possible to
  // cause the data to change while iterating by using a key function, but please
  // don’t; we’d rather avoid a gratuitous copy.)
  function arraylike(data) {
    return typeof data === "object" && "length" in data
      ? data // Array, TypedArray, NodeList, array-like
      : Array.from(data); // Map, Set, iterable, string, or anything else
  }

  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter) enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update) update = update.selection();
    }
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(context) {
    var selection = context.selection ? context.selection() : context;

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection$1(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection$1(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction$1(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS$1(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction$1(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove$1 : typeof value === "function"
              ? styleFunction$1
              : styleConstant$1)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction$1
            : textConstant$1)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection$1([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
        : new Selection$1([[selector]], root);
  }

  function define$1(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
      reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
      reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
      reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
      reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
      reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define$1(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHex8() {
    return this.rgb().formatHex8();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define$1(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }

  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }

  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }

  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }

  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }

  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define$1(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));

  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }

  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var constant$1 = x => () => x;

  function linear$2(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear$2(a, d) : constant$1(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function numberArray(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
        c = b.slice(),
        i;
    return function(t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }

  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];

    return function(t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }

  function date(a, b) {
    var d = new Date;
    return a = +a, b = +b, function(t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  function object(a, b) {
    var i = {},
        c = {},
        k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate$1(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  function interpolate$1(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant$1(b)
        : (t === "number" ? interpolateNumber
        : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
        : b instanceof color ? interpolateRgb
        : b instanceof Date ? date
        : isNumberArray(b) ? numberArray
        : Array.isArray(b) ? genericArray
        : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
        : interpolateNumber)(a, b);
  }

  function interpolateRound(a, b) {
    return a = +a, b = +b, function(t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  var degrees = 180 / Math.PI;

  var identity$2 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity$2 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity$2;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var frame = 0, // is an animation frame pending?
      timeout$1 = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? init : set;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection = selection.prototype.constructor;

  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction(tweenValue(this, "text", value))
        : textConstant(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function transition(name) {
    return selection().transition(name);
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  const linear$1 = t => +t;

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  const pi$1 = Math.PI,
      tau$1 = 2 * pi$1,
      epsilon$1 = 1e-6,
      tauEpsilon = tau$1 - epsilon$1;

  function append(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += arguments[i] + strings[i];
    }
  }

  function appendRound(digits) {
    let d = Math.floor(digits);
    if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
    if (d > 15) return append;
    const k = 10 ** d;
    return function(strings) {
      this._ += strings[0];
      for (let i = 1, n = strings.length; i < n; ++i) {
        this._ += Math.round(arguments[i] * k) / k + strings[i];
      }
    };
  }

  class Path {
    constructor(digits) {
      this._x0 = this._y0 = // start of current subpath
      this._x1 = this._y1 = null; // end of current subpath
      this._ = "";
      this._append = digits == null ? append : appendRound(digits);
    }
    moveTo(x, y) {
      this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
    }
    closePath() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._append`Z`;
      }
    }
    lineTo(x, y) {
      this._append`L${this._x1 = +x},${this._y1 = +y}`;
    }
    quadraticCurveTo(x1, y1, x, y) {
      this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
    }
    bezierCurveTo(x1, y1, x2, y2, x, y) {
      this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
    }
    arcTo(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

      // Is the radius negative? Error.
      if (r < 0) throw new Error(`negative radius: ${r}`);

      let x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01;

      // Is this path empty? Move to (x1,y1).
      if (this._x1 === null) {
        this._append`M${this._x1 = x1},${this._y1 = y1}`;
      }

      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon$1));

      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
        this._append`L${this._x1 = x1},${this._y1 = y1}`;
      }

      // Otherwise, draw an arc!
      else {
        let x20 = x2 - x0,
            y20 = y2 - y0,
            l21_2 = x21 * x21 + y21 * y21,
            l20_2 = x20 * x20 + y20 * y20,
            l21 = Math.sqrt(l21_2),
            l01 = Math.sqrt(l01_2),
            l = r * Math.tan((pi$1 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
            t01 = l / l01,
            t21 = l / l21;

        // If the start tangent is not coincident with (x0,y0), line to.
        if (Math.abs(t01 - 1) > epsilon$1) {
          this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
        }

        this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
      }
    }
    arc(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;

      // Is the radius negative? Error.
      if (r < 0) throw new Error(`negative radius: ${r}`);

      let dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0;

      // Is this path empty? Move to (x0,y0).
      if (this._x1 === null) {
        this._append`M${x0},${y0}`;
      }

      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
        this._append`L${x0},${y0}`;
      }

      // Is this arc empty? We’re done.
      if (!r) return;

      // Does the angle go the wrong way? Flip the direction.
      if (da < 0) da = da % tau$1 + tau$1;

      // Is this a complete circle? Draw two arcs to complete the circle.
      if (da > tauEpsilon) {
        this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
      }

      // Is this arc non-empty? Draw an arc!
      else if (da > epsilon$1) {
        this._append`A${r},${r},0,${+(da >= pi$1)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
      }
    }
    rect(x, y, w, h) {
      this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
    }
    toString() {
      return this._;
    }
  }

  function formatDecimal(x) {
    return Math.abs(x = Math.round(x)) >= 1e21
        ? x.toLocaleString("en").replace(/,/g, "")
        : x.toString(10);
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimalParts(1.23) returns ["123", 0].
  function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  }

  function exponent(x) {
    return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }

  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width === undefined ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
        + (this.trim ? "~" : "")
        + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim(s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
      }
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": (x) => Math.round(x).toString(2),
    "c": (x) => x + "",
    "d": formatDecimal,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": (x) => Math.round(x).toString(8),
    "p": (x, p) => formatRounded(x * 100, p),
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": (x) => Math.round(x).toString(16).toUpperCase(),
    "x": (x) => Math.round(x).toString(16)
  };

  function identity$1(x) {
    return x;
  }

  var map = Array.prototype.map,
      prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function formatLocale(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "−" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type;

      // The "n" type is an alias for ",g".
      if (type === "n") comma = true, type = "g";

      // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision === undefined ? 6
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i, n, c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Determine the sign. -0 is not less than 0, but 1 / -0 is!
          var valueNegative = value < 0 || 1 / value < 0;

          // Perform the initial formatting.
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

          // Trim insignificant zeros.
          if (trim) value = formatTrim(value);

          // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": value = valuePrefix + value + valueSuffix + padding; break;
          case "=": value = valuePrefix + padding + value + valueSuffix; break;
          case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
          default: value = padding + valuePrefix + value + valueSuffix; break;
        }

        return numerals(value);
      }

      format.toString = function() {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale;
  var format;
  var formatPrefix;

  defaultLocale({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0: break;
      case 1: this.range(domain); break;
      default: this.range(range).domain(domain); break;
    }
    return this;
  }

  const implicit = Symbol("implicit");

  function ordinal() {
    var index = new InternMap(),
        domain = [],
        range = [],
        unknown = implicit;

    function scale(d) {
      let i = index.get(d);
      if (i === undefined) {
        if (unknown !== implicit) return unknown;
        index.set(d, i = domain.push(d) - 1);
      }
      return range[i % range.length];
    }

    scale.domain = function(_) {
      if (!arguments.length) return domain.slice();
      domain = [], index = new InternMap();
      for (const value of _) {
        if (index.has(value)) continue;
        index.set(value, domain.push(value) - 1);
      }
      return scale;
    };

    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), scale) : range.slice();
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function() {
      return ordinal(domain, range).unknown(unknown);
    };

    initRange.apply(scale, arguments);

    return scale;
  }

  function constants(x) {
    return function() {
      return x;
    };
  }

  function number(x) {
    return +x;
  }

  var unit = [0, 1];

  function identity(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= (a = +a))
        ? function(x) { return (x - a) / b; }
        : constants(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function(x) { return Math.max(a, Math.min(b, x)); };
  }

  // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
  function bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x) { return r0(d0(x)); };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1;

    // Reverse descending domains.
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function(x) {
      var i = bisectRight(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target
        .domain(source.domain())
        .range(source.range())
        .interpolate(source.interpolate())
        .clamp(source.clamp())
        .unknown(source.unknown());
  }

  function transformer() {
    var domain = unit,
        range = unit,
        interpolate = interpolate$1,
        transform,
        untransform,
        unknown,
        clamp = identity,
        piecewise,
        output,
        input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
    }

    scale.invert = function(y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function(_) {
      return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
    };

    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };

    scale.rangeRound = function(_) {
      return range = Array.from(_), interpolate = interpolateRound, rescale();
    };

    scale.clamp = function(_) {
      return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
    };

    scale.interpolate = function(_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function(t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }

  function continuous() {
    return transformer()(identity, identity);
  }

  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function(count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function(count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function(count) {
      if (count == null) count = 10;

      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }
      
      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);
        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }
        prestep = step;
      }

      return scale;
    };

    return scale;
  }

  function linear() {
    var scale = continuous();

    scale.copy = function() {
      return copy(scale, linear());
    };

    initRange.apply(scale, arguments);

    return linearish(scale);
  }

  function colors(specifier) {
    var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
    while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    return colors;
  }

  var Accent = colors("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

  function constant(x) {
    return function constant() {
      return x;
    };
  }

  const abs = Math.abs;
  const atan2 = Math.atan2;
  const cos = Math.cos;
  const max = Math.max;
  const min = Math.min;
  const sin = Math.sin;
  const sqrt = Math.sqrt;

  const epsilon = 1e-12;
  const pi = Math.PI;
  const halfPi = pi / 2;
  const tau = 2 * pi;

  function acos(x) {
    return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
  }

  function asin(x) {
    return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
  }

  function withPath(shape) {
    let digits = 3;

    shape.digits = function(_) {
      if (!arguments.length) return digits;
      if (_ == null) {
        digits = null;
      } else {
        const d = Math.floor(_);
        if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
        digits = d;
      }
      return shape;
    };

    return () => new Path(digits);
  }

  function arcInnerRadius(d) {
    return d.innerRadius;
  }

  function arcOuterRadius(d) {
    return d.outerRadius;
  }

  function arcStartAngle(d) {
    return d.startAngle;
  }

  function arcEndAngle(d) {
    return d.endAngle;
  }

  function arcPadAngle(d) {
    return d && d.padAngle; // Note: optional!
  }

  function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
    var x10 = x1 - x0, y10 = y1 - y0,
        x32 = x3 - x2, y32 = y3 - y2,
        t = y32 * x10 - x32 * y10;
    if (t * t < epsilon) return;
    t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
    return [x0 + t * x10, y0 + t * y10];
  }

  // Compute perpendicular offset line of length rc.
  // http://mathworld.wolfram.com/Circle-LineIntersection.html
  function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
    var x01 = x0 - x1,
        y01 = y0 - y1,
        lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
        ox = lo * y01,
        oy = -lo * x01,
        x11 = x0 + ox,
        y11 = y0 + oy,
        x10 = x1 + ox,
        y10 = y1 + oy,
        x00 = (x11 + x10) / 2,
        y00 = (y11 + y10) / 2,
        dx = x10 - x11,
        dy = y10 - y11,
        d2 = dx * dx + dy * dy,
        r = r1 - rc,
        D = x11 * y10 - x10 * y11,
        d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
        cx0 = (D * dy - dx * d) / d2,
        cy0 = (-D * dx - dy * d) / d2,
        cx1 = (D * dy + dx * d) / d2,
        cy1 = (-D * dx + dy * d) / d2,
        dx0 = cx0 - x00,
        dy0 = cy0 - y00,
        dx1 = cx1 - x00,
        dy1 = cy1 - y00;

    // Pick the closer of the two intersection points.
    // TODO Is there a faster way to determine which intersection to use?
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

    return {
      cx: cx0,
      cy: cy0,
      x01: -ox,
      y01: -oy,
      x11: cx0 * (r1 / r - 1),
      y11: cy0 * (r1 / r - 1)
    };
  }

  function arc() {
    var innerRadius = arcInnerRadius,
        outerRadius = arcOuterRadius,
        cornerRadius = constant(0),
        padRadius = null,
        startAngle = arcStartAngle,
        endAngle = arcEndAngle,
        padAngle = arcPadAngle,
        context = null,
        path = withPath(arc);

    function arc() {
      var buffer,
          r,
          r0 = +innerRadius.apply(this, arguments),
          r1 = +outerRadius.apply(this, arguments),
          a0 = startAngle.apply(this, arguments) - halfPi,
          a1 = endAngle.apply(this, arguments) - halfPi,
          da = abs(a1 - a0),
          cw = a1 > a0;

      if (!context) context = buffer = path();

      // Ensure that the outer radius is always larger than the inner radius.
      if (r1 < r0) r = r1, r1 = r0, r0 = r;

      // Is it a point?
      if (!(r1 > epsilon)) context.moveTo(0, 0);

      // Or is it a circle or annulus?
      else if (da > tau - epsilon) {
        context.moveTo(r1 * cos(a0), r1 * sin(a0));
        context.arc(0, 0, r1, a0, a1, !cw);
        if (r0 > epsilon) {
          context.moveTo(r0 * cos(a1), r0 * sin(a1));
          context.arc(0, 0, r0, a1, a0, cw);
        }
      }

      // Or is it a circular or annular sector?
      else {
        var a01 = a0,
            a11 = a1,
            a00 = a0,
            a10 = a1,
            da0 = da,
            da1 = da,
            ap = padAngle.apply(this, arguments) / 2,
            rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
            rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
            rc0 = rc,
            rc1 = rc,
            t0,
            t1;

        // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
        if (rp > epsilon) {
          var p0 = asin(rp / r0 * sin(ap)),
              p1 = asin(rp / r1 * sin(ap));
          if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
          else da0 = 0, a00 = a10 = (a0 + a1) / 2;
          if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
          else da1 = 0, a01 = a11 = (a0 + a1) / 2;
        }

        var x01 = r1 * cos(a01),
            y01 = r1 * sin(a01),
            x10 = r0 * cos(a10),
            y10 = r0 * sin(a10);

        // Apply rounded corners?
        if (rc > epsilon) {
          var x11 = r1 * cos(a11),
              y11 = r1 * sin(a11),
              x00 = r0 * cos(a00),
              y00 = r0 * sin(a00),
              oc;

          // Restrict the corner radius according to the sector angle. If this
          // intersection fails, it’s probably because the arc is too small, so
          // disable the corner radius entirely.
          if (da < pi) {
            if (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10)) {
              var ax = x01 - oc[0],
                  ay = y01 - oc[1],
                  bx = x11 - oc[0],
                  by = y11 - oc[1],
                  kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
                  lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
              rc0 = min(rc, (r0 - lc) / (kc - 1));
              rc1 = min(rc, (r1 - lc) / (kc + 1));
            } else {
              rc0 = rc1 = 0;
            }
          }
        }

        // Is the sector collapsed to a line?
        if (!(da1 > epsilon)) context.moveTo(x01, y01);

        // Does the sector’s outer ring have rounded corners?
        else if (rc1 > epsilon) {
          t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
          t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

          context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

          // Have the corners merged?
          if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

          // Otherwise, draw the two corners and the ring.
          else {
            context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
            context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
            context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
          }
        }

        // Or is the outer ring just a circular arc?
        else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

        // Is there no inner ring, and it’s a circular sector?
        // Or perhaps it’s an annular sector collapsed due to padding?
        if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

        // Does the sector’s inner ring (or point) have rounded corners?
        else if (rc0 > epsilon) {
          t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
          t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

          context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

          // Have the corners merged?
          if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

          // Otherwise, draw the two corners and the ring.
          else {
            context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
            context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
            context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
          }
        }

        // Or is the inner ring just a circular arc?
        else context.arc(0, 0, r0, a10, a00, cw);
      }

      context.closePath();

      if (buffer) return context = null, buffer + "" || null;
    }

    arc.centroid = function() {
      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
          a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
      return [cos(a) * r, sin(a) * r];
    };

    arc.innerRadius = function(_) {
      return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
    };

    arc.outerRadius = function(_) {
      return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
    };

    arc.cornerRadius = function(_) {
      return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
    };

    arc.padRadius = function(_) {
      return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
    };

    arc.startAngle = function(_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
    };

    arc.endAngle = function(_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
    };

    arc.padAngle = function(_) {
      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
    };

    arc.context = function(_) {
      return arguments.length ? ((context = _ == null ? null : _), arc) : context;
    };

    return arc;
  }

  function Transform(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };

  Transform.prototype;

  function splitTextToFitWidth(text, maxWidth, fontSize) {
    const newLabel = text.split(' ').reduce((acc, word) => {
      const testLine = acc.length === 0 ? word : `${acc[acc.length - 1]} ${word}`;
      const testLineWidth = testLine.length * (fontSize * 0.6); // Approximate width of text in pixels
      if (testLineWidth > maxWidth) {
        acc.push(word);
      } else {
        if (acc.length > 0) acc[acc.length - 1] = testLine;else {
          acc.push(testLine);
        }
      }
      return acc;
    }, []);
    return newLabel;
  }

  const fullCircleAngle = Math.PI * 2;

  /* Use d3's schemeSpectral color scheme to get a color for each category

  Usage:
  const colorFn = getColor(sortedCategories);
  const color = colorFn(category);
  */
  function getColor(categories, colourList = Accent) {
    return ordinal().domain(categories).range(colourList).unknown('#ccc');
  }
  /* Get the point at the bottom left of the category. Used as the start point of
  the line from category segments to category label  */
  const catAnnotationPointInner = categoryStartAngleMap => categoryId => {
    const angle = categoryStartAngleMap[categoryId];
    const x = Math.sin(angle);
    const y = -Math.cos(angle);
    return {
      x,
      y
    };
  };

  /* Get the point where the category label should start

  categoryStartAngleMap: Record<Category, number>
  */
  const catAnnotationPointOuter = categoryStartAngleMap => categoryId => {
    const angle = +categoryStartAngleMap[categoryId];
    const x = Math.sin(angle);
    const y = -Math.cos(angle);
    return {
      x,
      y
    };
  };

  /* Calculates label position based on offset from y centre */
  // NOTE: This is an alternate method. Delete once confirmed using the other one
  // export const catAnnotationPointOuterLabel =
  //   (categoryStartAngleMap, catLabelWidthHeightMap, xPadding, yPadding) =>
  //   (categoryId) => {
  //     const angle = categoryStartAngleMap[categoryId] % fullCircleAngle
  //     const xSide = Math.sin(angle) > 0 ? 1 : -1
  //     const ySide = -Math.cos(angle) > 0 ? 1 : -1

  //     const catsOnThisSide = Object.keys(categoryStartAngleMap)
  //       .filter((catId) => {
  //         const inXSide = Math.sin(categoryStartAngleMap[catId]) > 0 ? 1 : -1
  //         const inYSide = -Math.cos(categoryStartAngleMap[catId]) > 0 ? 1 : -1
  //         return inXSide === xSide && inYSide === ySide
  //       })
  //       .sort((a, b) =>
  //         (ySide === -1 && xSide === -1) || (ySide === 1 && xSide === 1)
  //           ? categoryStartAngleMap[a] > categoryStartAngleMap[b]
  //             ? 1
  //             : -1
  //           : categoryStartAngleMap[a] > categoryStartAngleMap[b]
  //           ? -1
  //           : 1
  //       )

  //     const thisCatIndex = catsOnThisSide.indexOf(categoryId)
  //     const preCatHeights = catsOnThisSide
  //       .slice(0, thisCatIndex)
  //       .reduce((acc, catId) => acc + catLabelWidthHeightMap[catId].height, 0)
  //     const x = xSide * xPadding
  //     const y = ySide * (preCatHeights + (thisCatIndex + 3) * yPadding)

  //     return { x, y }
  //   }

  /* Calculates label position based on offset from y top/bottom */
  const catAnnotationPointOuterLabel = (categoryStartAngleMap, catLabelWidthHeightMap, xPadding, yPadding, plotHeight) => categoryId => {
    const angle = categoryStartAngleMap[categoryId] % fullCircleAngle;
    const xSide = Math.sin(angle) > 0 ? 1 : -1;
    const ySide = -Math.cos(angle) > 0 ? 1 : -1;
    const catsOnThisSide = Object.keys(categoryStartAngleMap).filter(catId => {
      const inXSide = Math.sin(categoryStartAngleMap[catId]) > 0 ? 1 : -1;
      const inYSide = -Math.cos(categoryStartAngleMap[catId]) > 0 ? 1 : -1;
      return inXSide === xSide && inYSide === ySide;
    }).sort((a, b) => ySide === -1 && xSide === -1 || ySide === 1 && xSide === 1 ? categoryStartAngleMap[a] > categoryStartAngleMap[b] ? 1 : -1 : categoryStartAngleMap[a] > categoryStartAngleMap[b] ? -1 : 1);
    const thisCatIndex = catsOnThisSide.length - catsOnThisSide.indexOf(categoryId) - 1;
    const preCatHeights = catsOnThisSide.slice(0, thisCatIndex).reduce((acc, catId) => acc + catLabelWidthHeightMap[catId].height, 0);
    const topPadding = 2.8; // TODO: Make this clearer and configurable
    const x = xSide * xPadding;
    const y = ySide * (plotHeight / topPadding - preCatHeights - thisCatIndex * yPadding);
    return {
      x,
      y
    };
  };

  /* Get the arcs for the radial bar chart. This includes the skill bars, category
    base, and level rings. It also includes the start angles for each skill and
    category, and the height of each level.

    The function takes in the following parameters:
      width: number;
      height: number;
      innerRadius: number;
      outerRadius: number;
      categoryPadding: number;
      skillPadding: number;
      arcPercent: number;
      arcStartOffset: number;

    The function returns a function that takes in the following parameters:
      skillsData: IDataItem[];
      categories: Category[];
      groupedByCategory: Map<Category, IDataItem[]>;

      where IDataItem is an object with the following properties:
        skill: string;
        category: string;
        skill_level: number;
        color: string;

      Category is an object with the following properties:
        id: string;
        skills: IDataItem[];
        color: string;
  */
  const getArcsFn = ({
    width,
    height,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2 - 20,
    categoryPadding = 0.1,
    skillPadding = 0.05,
    arcPercent = 0.8,
    arcStartOffset = 0.1,
    labelXOffset = 1.1,
    labelYSpacing = 10,
    maxLabelWidth = 150,
    fontSize = 14
  }) =>
  // eslint-disable-next-line indent
  ({
    skillsData,
    levels,
    categories,
    groupedByCategory
  }) => {
    var _d3$max, _d3$min;
    const maxLvl = (_d3$max = max$1(levels, d => d.level)) != null ? _d3$max : 0;
    const minLvl = (_d3$min = min$1(levels, d => d.level)) != null ? _d3$min : 0;
    const lvlsArray = levels.sort((a, b) => a.level - b.level);

    /* Total angle used by skills. Remaining is left blank */
    const totalArcAngle = fullCircleAngle * arcPercent;
    const totalSkillCount = skillsData.length;

    /* Calculate the column widths based on the available width
        shared between the categories and the skills with padding
        included
        */
    const columnAngle = (totalArcAngle - categoryPadding * (categories.length - 1) - skillPadding * totalSkillCount) / totalSkillCount;

    /* Calculate the start angle for each category based on the number of skills
        in each category and the position of previous categories
        */
    const categoryStartAngle = categories.reduce((acc, category) => {
      var _groupedByCategory$ge, _groupedByCategory$ge2, _groupedByCategory$ge3, _groupedByCategory$ge4;
      return [...acc, (acc[acc.length - 1] + (((_groupedByCategory$ge = (_groupedByCategory$ge2 = groupedByCategory.get(category.id)) == null ? void 0 : _groupedByCategory$ge2.length) != null ? _groupedByCategory$ge : 0) * columnAngle + ((_groupedByCategory$ge3 = (_groupedByCategory$ge4 = groupedByCategory.get(category.id)) == null ? void 0 : _groupedByCategory$ge4.length) != null ? _groupedByCategory$ge3 : 0) * skillPadding + categoryPadding)) % (Math.PI * 2)];
    }, [fullCircleAngle * arcStartOffset]);

    /* Convert the category start angles to a map for easy access
       categoryStartAngleMap: Record<Category, number>
      */
    const categoryStartAngleMap = categoryStartAngle.slice(0, -1).reduce((acc, v, i) => {
      var _categories$i;
      return {
        ...acc,
        [(_categories$i = categories[i]) == null ? void 0 : _categories$i.id]: v
      };
    }, {});
    /* Calculate the start angle for each skill based on the category start angle
        and the position of previous skills.
        Stored as a map where key = category-skill
         skillAngleStart: Record<string, number>
      */
    const skillAngleStart = skillsData.reduce((acc, d) => {
      var _groupedByCategory$ge5, _groupedByCategory$ge6, _groupedByCategory$ge7, _groupedByCategory$ge8;
      return {
        ...acc,
        [`${d.category}-${d.skill}`]: categoryStartAngleMap[d.category] + skillPadding + ((_groupedByCategory$ge5 = (_groupedByCategory$ge6 = groupedByCategory.get(d.category)) == null ? void 0 : _groupedByCategory$ge6.findIndex(s => s.skill == d.skill)) != null ? _groupedByCategory$ge5 : 0) * columnAngle + ((_groupedByCategory$ge7 = (_groupedByCategory$ge8 = groupedByCategory.get(d.category)) == null ? void 0 : _groupedByCategory$ge8.findIndex(s => s.skill == d.skill)) != null ? _groupedByCategory$ge7 : 0) * skillPadding
      };
    }, {});

    /* Function to get skill AngleStart using the data item
       args:
        d: IDataItem
      returns:
        number: angle in radians
      */
    const getSkillAngleStart = d => skillAngleStart[`${d.category}-${d.skill}`];

    /* Function to get the distance from the center of the circle to a y value
        at the bottom of the level */
    const lvlHeight = linear().domain([minLvl, maxLvl + 1]) // Use max lvl + 1 as we need the top and bottom of each lvl
    .range([innerRadius, outerRadius]);

    /* A d3.js arc generator for the skill bar where height = skill level  */
    const barArc = arc().startAngle(d => getSkillAngleStart(d)).endAngle(d => getSkillAngleStart(d) + columnAngle).innerRadius(innerRadius + 1).outerRadius(d => lvlHeight(d.skill_level));
    const barFullHeightArc = arc().startAngle(d => getSkillAngleStart(d)).endAngle(d => getSkillAngleStart(d) + columnAngle).innerRadius(innerRadius + 1).outerRadius(outerRadius - 1);

    /* A d3.js arc generator for each segment of a skills bar where a single bar
      is split into segments per level.
      */
    const barSegmentArc = arc().startAngle(d => getSkillAngleStart(d)).endAngle(d => getSkillAngleStart(d) + columnAngle).innerRadius((_, lvl) => lvlHeight(lvl)).outerRadius((_, lvl) => lvlHeight(lvl + 1)) // + 1 as top of level
    .padRadius(-1).padAngle(0.01);

    /* A d3.js arc generator for the arc that is at the base of the category. */
    const categoryBaseArc = arc().innerRadius(innerRadius - 1).outerRadius(innerRadius - 3).startAngle(category => categoryStartAngleMap[category]).endAngle(category => {
      var _groupedByCategory$ge9, _groupedByCategory$ge0, _groupedByCategory$ge1, _groupedByCategory$ge10;
      return categoryStartAngleMap[category] + columnAngle * ((_groupedByCategory$ge9 = (_groupedByCategory$ge0 = groupedByCategory.get(category)) == null ? void 0 : _groupedByCategory$ge0.length) != null ? _groupedByCategory$ge9 : 0) + ((_groupedByCategory$ge1 = (_groupedByCategory$ge10 = groupedByCategory.get(category)) == null ? void 0 : _groupedByCategory$ge10.length) != null ? _groupedByCategory$ge1 : 0) * skillPadding;
    });
    const thicknessOfLvlRing = 0.5;
    /* A d3.js arc generator for the ring that shows each level for the entire plot */
    const lvlRing = arc().innerRadius(lvl => lvlHeight(lvl + 1) - thicknessOfLvlRing) // use + 1 as ring at top of lvl
    .outerRadius(lvl => lvlHeight(lvl + 1)) // use + 1 as ring at top of lvl
    .startAngle(0).endAngle(totalArcAngle + (fullCircleAngle - totalArcAngle) / 2);
    const getCatLabelWidth = getCatLabelWidthFn(fontSize);
    const catLabelWidthHeightMap = categories.reduce((acc, cat) => {
      // TODO: This is repeated
      const newLabel = splitTextToFitWidth(cat.id, maxLabelWidth, fontSize);
      const labelWidthCalced = getCatLabelWidth(cat.id);
      const labelWidth = Math.min(labelWidthCalced, maxLabelWidth);
      // If the label width is greater than the max label width, wrap the text
      // by increasing the labelHeight to be a multiple of the font size
      // TODO: Move label padding to config
      const labelPadding = 5; // Padding between lines
      const labelHeight = fontSize * newLabel.length + labelPadding;
      acc[cat.id] = {
        width: labelWidth,
        height: labelHeight
      };
      return acc;
    }, {});
    return {
      catAnnotationPointInner: catAnnotationPointInner(categoryStartAngleMap),
      catAnnotationPointOuter: catAnnotationPointOuter(categoryStartAngleMap),
      catAnnotationPointOuterLabel: catAnnotationPointOuterLabel(categoryStartAngleMap, catLabelWidthHeightMap, labelXOffset, labelYSpacing, height),
      barArc,
      barFullHeightArc,
      barSegmentArc,
      categoryBaseArc,
      lvlRing,
      lvlsArray,
      outerRadius,
      innerRadius,
      getYPoint: lvlHeight,
      catLabelWidthHeightMap
    };
  };

  /* Preprocess the data for the radial bar chart. This includes calculating the
    start and end angles for each skill, the height of each level, and the
    category start angles. It also includes creating the arc generators for the
    skill bars, category base, and level rings.

    The function takes in the following parameters:
      data: IDataItem[];

    Where IDataItem is an object with the following properties:
      skill: string;
      category: string;
      skill_level: number;
  */
  function radialBarChartPreProcessing({
    data,
    colourList
  }) {
    const categoryIds = [...union(data.map(d => d.category)).keys()];
    const sortedCategories = categoryIds.sort();
    const colorFn = getColor(sortedCategories, colourList);
    const augmentedData = data /* Add color to each data item based on its category */.map(d => ({
      ...d,
      color: colorFn(d.category)
    }));
    const groupedByCategory = group(augmentedData, d => d.category);
    const categoriesData = sortedCategories.map(cat => {
      var _groupedByCategory$ge11;
      return {
        id: cat,
        skills: (_groupedByCategory$ge11 = groupedByCategory.get(cat)) != null ? _groupedByCategory$ge11 : [],
        color: colorFn(cat)
      };
    });
    return {
      sortedCategories: categoriesData,
      groupedByCategory,
      skillsData: augmentedData
    };
  }

  /* Get the width of the category label based on the length of the category string */
  const getCatLabelWidthFn = fontSize => cat => {
    const width = cat.length * fontSize;
    return width;
  };

  /* D3js component to render the radial bar chart bars

    Each bar is made up of a path for the bar itself and a path for each segment
    where each segment represents a lvl.

    A path is also created to handle the hover events for each bar
    */
  function refreshBarsD3({
    svg,
    sortedCategories,
    categoryFocus,
    skillsData,
    getArcs,
    levels,
    groupedByCategory,
    handleSkillSelect,
    setHighlightedSkill
  }) {
    const filteredCategories = categoryFocus ? [categoryFocus] : sortedCategories;
    const filteredCategoriesIds = filteredCategories.map(c => c.id);
    const filteredData = skillsData
    /* Only show the data in the focus category or all categories */.filter(d => filteredCategoriesIds.includes(d.category));
    const {
      barFullHeightArc,
      barSegmentArc
    } = getArcs({
      levels: levels,
      skillsData: filteredData,
      categories: filteredCategories,
      groupedByCategory
    });
    svg.selectAll('.Bars').remove();
    filteredCategories.forEach(categoryData => {
      const dItems = groupedByCategory.get(categoryData.id);
      const barGroup = svg.append('g').attr('class', `Bars Bars-${categoryData.id}`).attr('fill', categoryData.color);
      const bars = barGroup.selectAll('.bar-group').data(dItems, d => d.skill).join('g').attr('class', 'bar-group');
      bars.append('path').attr('d', d => barFullHeightArc(d)).attr('class', 'bar').attr('fill-opacity', 0.0001);
      bars.each(function (d) {
        const group = select(this);
        for (let lvl = 1; lvl <= d.skill_level; lvl++) {
          group.append('path').attr('d', barSegmentArc(d, lvl)).attr('fill', categoryData.color).attr('class', 'bar-segment');
        }
      });
      bars.append('path').attr('d', d => barFullHeightArc(d)).attr('class', 'bar-outline').attr('fill', 'rgba(0, 0, 0, 0)').attr('stroke', categoryData.color).attr('stroke-opacity', 0).on('click', () => handleSkillSelect(categoryFocus ? null : categoryData)).on('mouseover', (event, d) => setHighlightedSkill(d)).on('mouseout', () => setHighlightedSkill(false)).on('focus', (event, d) => setHighlightedSkill(d)).on('blur', () => setHighlightedSkill(false));
    });
    return svg;
  }

  /* D3 component to render the annotations for each category
    Each annotation consists of a path for the arc, a line to the outer radius,
    a line to the label, a box around the label and the label itself.
    The label is positioned at the outer radius and is centered on the line
    */
  function renderAnnotationsD3({
    svg,
    sortedCategories,
    categoryFocus,
    skillsData,
    levels,
    getArcs,
    groupedByCategory,
    config
  }) {
    const {
      lineThickness,
      innerRadius,
      outerRadius,
      annotationPadding,
      labelTextColor,
      lvlTextColor,
      lvlLabelType = 'name',
      // 'none' | 'name' | 'level' - Whether to show the lvl name or lvl number in the lvl annotation
      fontSize = 10,
      useSmartLabelPositioning = true
    } = config;

    // Remove previous annotation for this category if any
    svg.selectAll('.Annotation').remove();
    const filteredCategories = categoryFocus ? [categoryFocus] : sortedCategories;
    const filteredCategoriesIds = filteredCategories.map(c => c.id);
    const filteredData = skillsData.filter(d => filteredCategoriesIds.includes(d.category));
    const {
      categoryBaseArc,
      catAnnotationPointInner,
      catAnnotationPointOuter,
      catAnnotationPointOuterLabel,
      lvlsArray,
      getYPoint,
      catLabelWidthHeightMap
    } = getArcs({
      levels,
      skillsData: filteredData,
      categories: filteredCategories,
      groupedByCategory
    });
    filteredCategories.forEach(cat => {
      const annotationGroup = svg.append('g').attr('class', `Annotation Annotation-${cat.id.replaceAll(' ', '-')}`).attr('fill', cat.color);
      const labelXDir = catAnnotationPointOuterLabel(cat.id).x > 0 ? 1 : -1;
      const labelYDir = catAnnotationPointOuterLabel(cat.id).y > 0 ? 1 : -1;
      const labelWidth = catLabelWidthHeightMap[cat.id].width;
      const labelHeight = catLabelWidthHeightMap[cat.id].height;
      const labelAnchorPoint = useSmartLabelPositioning ? {
        x: (catAnnotationPointOuterLabel(cat.id).x > 0 ? 0 : -labelWidth) + catAnnotationPointOuterLabel(cat.id).x * (outerRadius + annotationPadding),
        y: catAnnotationPointOuterLabel(cat.id).y
      } : {
        x: (catAnnotationPointOuter(cat.id).x > 0 ? 0 : -labelWidth) + catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding),
        y: catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding) + labelYDir * fontSize
      };
      const outerAnnotationLineAnchor = {
        x: catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding),
        y: catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding)
      };
      const baseOfCategoryAnchor = {
        x: catAnnotationPointInner(cat.id).x * (innerRadius - 3),
        y: catAnnotationPointInner(cat.id).y * (innerRadius - 3)
      };

      // Arc at base of category
      annotationGroup.append('path').attr('d', categoryBaseArc(cat.id)).attr('fill', cat.color).attr('stroke', 'none').attr('stroke-width', lineThickness);

      // Line from base of category to outer radius
      annotationGroup.append('line').attr('x1', baseOfCategoryAnchor.x).attr('y1', baseOfCategoryAnchor.y).attr('x2', outerAnnotationLineAnchor.x).attr('y2', outerAnnotationLineAnchor.y).attr('stroke', cat.color).attr('fill', 'none').attr('stroke-width', lineThickness).attr('opacity', 1);

      // Line from outer radius to category label
      annotationGroup.append('line').attr('x1', outerAnnotationLineAnchor.x).attr('y1', outerAnnotationLineAnchor.y).attr('x2', labelAnchorPoint.x + (labelXDir > 0 ? 0 : labelWidth)).attr('y2', labelAnchorPoint.y).attr('stroke', cat.color).attr('fill', 'none').attr('stroke-width', lineThickness).attr('opacity', 1);

      // Line beneath category label
      annotationGroup.append('line').attr('x1', labelAnchorPoint.x).attr('y1', labelAnchorPoint.y).attr('x2', labelAnchorPoint.x + labelWidth).attr('y2', labelAnchorPoint.y).attr('stroke', cat.color).attr('fill', 'none').attr('stroke-width', lineThickness);

      // Category label text box
      annotationGroup.append('rect').attr('class', 'label-box').attr('x', labelAnchorPoint.x).attr('y', labelAnchorPoint.y + (labelYDir === 1 ? 0 : -labelHeight)).attr('width', labelWidth).attr('height', labelHeight).attr('color', labelTextColor).attr('opacity', 0.8) // increased on hover
      .attr('fill', cat.color);
      const highlightLineThickness = 10;
      // Line On Side of category label
      annotationGroup.append('line').attr('class', 'highlight-line').attr('x1', labelAnchorPoint.x + labelXDir * highlightLineThickness + (labelXDir === 1 ? labelWidth : 0)).attr('y1', labelAnchorPoint.y).attr('x2', labelAnchorPoint.x + labelXDir * highlightLineThickness + (labelXDir === 1 ? labelWidth : 0)).attr('y2', labelAnchorPoint.y + labelHeight * labelYDir).attr('stroke', cat.color).attr('opacity', 0) // only shown on hover
      .attr('fill', 'none').attr('stroke-width', highlightLineThickness);

      // Category label text
      // Split the text into blocks of maxLabelWidth
      const newLabel = splitTextToFitWidth(cat.id, config.maxLabelWidth, fontSize);
      const labelDirected = labelYDir === 1 ? newLabel : newLabel.reverse();
      labelDirected.forEach((line, i) => {
        annotationGroup.append('text').attr('x', labelAnchorPoint.x + labelWidth / 2).attr('y', labelAnchorPoint.y + i * fontSize * labelYDir + fontSize / 2 * labelYDir).attr('fill', labelTextColor).attr('font-weight', 700).attr('font-size', fontSize).attr('text-anchor', 'middle').attr('dominant-baseline', 'middle').attr('color', labelTextColor).text(line);
      });
      // annotationGroup
      //   .append('text')
      //   .attr('x', labelAnchorPoint.x + labelWidth / 2)
      //   .attr(
      //     'y',
      //     labelAnchorPoint.y + labelHeight / 2 + (labelYDir === 1 ? 0 : labelHeight)
      //   )
      //   .attr('fill', labelTextColor)
      //   .attr('font-weight', 700)
      //   .attr('font-size', fontSize)
      //   .attr('text-anchor', 'middle')
      //   .attr('color', labelTextColor)
      //   .text(newLabel)

      // Category lvl annotations
      if (lvlLabelType !== 'none') lvlsArray.forEach(lvl => {
        annotationGroup.append('text').attr('x', 0).attr('y', -getYPoint(lvl.level + 1) + fontSize / 2) // level + 1 as we want this at the top of the level
        .attr('fill', lvlTextColor).attr('text-anchor', 'middle').attr('font-size', fontSize).text(lvl.name);
      });
    });
    return svg;
  }
  const defaultConfig = {
    width: 640,
    height: undefined,
    innerRadius: 80,
    // Radius of the inner empty circle
    outerPadding: 100,
    // Padding between the outermost bars and the edge of the svg
    categoryPadding: 0.1,
    // Proportion of space between categories
    skillPadding: 0.05,
    // Proportion of space between skills in a category
    arcPercent: 0.8,
    // Proportion of the circle to use for the bars (1 = full circle, 0.5 = half circle)
    arcStartOffset: 0.1,
    // Proportion of the circle to offset the start of the bars (0 = start at top, 0.25 = start at right)
    annotationPadding: 10,
    // Padding between the outermost bars and the annotation lines
    lineThickness: 2,
    // Thickness of the annotation lines
    labelTextColor: 'black',
    // Color of the category label text
    lvlTextColor: '#ccc',
    // Color of the level annotation text
    lvlArcColor: '#444',
    // Color of the level annotation arcs
    colourList: Accent,
    // List of colours to use for the categories
    fontSize: 10,
    // Font size for the category and level labels
    labelXOffset: 1.1,
    // Sets the distance of the category label from the outer radius as a multiple of the outer radius
    labelYSpacing: 10,
    // Sets the spacing of the category labels from each other as a multiple of the font size
    maxLabelWidth: 150,
    // Maximum width of the category label in pixels
    lvlLabelType: 'name',
    // 'none' | 'name' | 'level' - Whether to show the lvl name or lvl number in the lvl annotation
    useSmartLabelPositioning: true,
    // Whether to use smart positioning for the category labels to avoid overlap
    plotYOffset: 0 // Y offset for the entire plot to allow for annotations above the plot
  };

  /**
   * RadialBarChart component renders a radial bar chart using D3.js.
   *
   * @param {Object} target - The target DOM element to append the chart to.
   * @param {Array} data - The data to be visualized in the radial bar chart as array of objects.
   * Each data item should have the following structure:
   * {
   *   skill: 'Skill Name',
   *   category: 'Category Name',
   *   skill_level: number
   * }
   * @param {Array} levels - Array of skill levels to be used in the chart.
   * Each level should have the following structure:
   * {
   *   level: number,
   *   name: 'Level Name',
   *   description: 'Level Description'
   * }
   * @param {Object} config - Configuration parameters for the chart.
   * See `defaultConfig` for available options and their default values.
   *
   */
  function RadialBarChart({
    target,
    data,
    levels,
    config: configIn
  }) {
    const config = {
      ...defaultConfig,
      ...configIn
    };
    const {
      width = 640,
      height: _height = undefined,
      innerRadius = 80,
      outerPadding = 200,
      categoryPadding = 0.1,
      skillPadding = 0.05,
      arcPercent = 0.8,
      arcStartOffset = 0.1,
      labelTextColor = 'black',
      lvlArcColor = '#444',
      colourList = Accent,
      labelXOffset = 1.1,
      labelYSpacing = 10,
      plotYOffset = 0,
      fontSize = 14
    } = config;
    const height = _height != null ? _height : width * 0.8; // Width needs to be larger than height to fit cat labels
    const outerRadius = Math.min(width, height) / 2 - outerPadding;
    config.height = height; // Update config with calculated height
    config.outerRadius = config.outerRadius || outerRadius;
    const svg = select(target).append('svg').attr('width', width).attr('height', height).attr('viewBox', `0 ${plotYOffset} ${width} ${height}`).attr('class', 'radial-bar-chart');
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`).attr('class', 'radial-bar-chart-group').attr('aria-label', 'Radial Bar Chart').attr('role', 'img').attr('aria-describedby', 'radial-bar-chart-description');
    const {
      skillsData,
      sortedCategories,
      groupedByCategory
    } = radialBarChartPreProcessing({
      data,
      colourList
    });
    const getArcs = getArcsFn({
      width,
      height,
      innerRadius,
      outerRadius,
      categoryPadding,
      skillPadding,
      arcPercent,
      arcStartOffset,
      labelXOffset,
      labelYSpacing,
      fontSize: config.fontSize
    });
    const {
      lvlRing,
      lvlsArray
    } = getArcs({
      skillsData,
      levels,
      categories: sortedCategories,
      groupedByCategory
    });

    // D3.js function to render the skill highlight
    function renderSkillHighlightD3(svg) {
      const group = svg.append('g').attr('class', 'skill-highlight');

      // Circle for skill highlight
      group.append('circle').attr('cx', 0).attr('cy', 0).attr('r', innerRadius - 10).attr('class', 'skill-highlight-circle').attr('opacity', 0);

      // Category text
      group.append('text').attr('y', -5).attr('text-anchor', 'middle').attr('fill', labelTextColor).attr('class', 'skill-highlight-text-cat').text('');

      // Skill text
      // group
      //   .append('text')
      //   .attr('y', 0)
      //   .attr('text-anchor', 'middle')
      //   .attr('fill', labelTextColor)
      //   .attr('class', 'skill-highlight-text-skill')
      //   .text('')

      group.append('g').attr('class', 'skill-highlight-text-skill');
      // Skill level text
      group.append('line').attr('class', 'skill-highlight-text-lvl-line').attr('x1', -innerRadius * 0.7).attr('y1', 50 - fontSize / 1.3).attr('x2', innerRadius * 0.7).attr('y2', 50 - fontSize / 1.3).attr('stroke', '#FFF').attr('fill', 'none').attr('stroke-width', 2).attr('opacity', 0);
      group.append('text').attr('y', 60).attr('text-anchor', 'middle').attr('fill', '#FFF').attr('font-size', fontSize).attr('class', 'skill-highlight-text-lvl').text('');
    }

    // D3.js function to render the skill highlight
    function refreshSkillHighlightD3(svg, highlightedSkill, innerCircleWidth, fontSize) {
      const group = svg.select('.skill-highlight');
      if (!highlightedSkill) {
        const t = transition().delay(200).duration(200).ease(linear$1);
        // Renders a circle
        group.select('.skill-highlight-circle').transition(t) // Transition to the new highlight
        .attr('opacity', 0);

        // Category text TEMPORARILY DISABLED
        // group
        //   .select('.skill-highlight-text-cat')
        //   .transition(t)
        //   .attr('opacity', 0)
        //   .text('')

        // Skill text
        group.select('.skill-highlight-text-skill').transition(t).attr('opacity', 0).text('');

        // Skill level text
        group.select('.skill-highlight-text-lvl').transition(t).attr('opacity', 0).text('');
        group.select('.skill-highlight-text-lvl-line').transition(t).attr('opacity', 0);
        svg.selectAll('.highlight-line').transition(t).attr('opacity', 0);
        svg.selectAll('.label-box').transition(t).attr('opacity', 0.8);
        group.selectAll('.skill-highlight-text-skill-central').remove();
      } else {
        var _lvlsArray$find;
        const t = transition().duration(200).ease(linear$1);

        // Circle for skill highlight
        group.select('.skill-highlight-circle').transition(t) // Transition to the new highlight
        .attr('opacity', 1).attr('fill', highlightedSkill.color);

        // Category text TEMPORARILY DISABLED
        // group
        //   .select('.skill-highlight-text-cat')
        //   .transition(t)
        //   .attr('opacity', 1)
        //   .text(highlightedSkill.category)

        // Skill text

        const skillTextSplit = splitTextToFitWidth(highlightedSkill.skill, innerCircleWidth * 2.5, fontSize);
        group.select('.skill-highlight-text-skill').transition(t).attr('opacity', 1);
        group.select('.skill-highlight-text-skill').selectAll('skill-highlight-text-skill-central').data(skillTextSplit).enter().append('text').attr('x', 0).attr('font-size', fontSize).attr('y', (_, i) => -(0.5 * fontSize * skillTextSplit.length / 2) + i * fontSize * 1.2).attr('class', 'skill-highlight-text-skill-central').attr('text-anchor', 'middle').attr('fill', labelTextColor).text(skillText => skillText);

        // Skill level text
        group.select('.skill-highlight-text-lvl').transition(t).attr('opacity', 1).text((_lvlsArray$find = lvlsArray.find(lvl => lvl.level === highlightedSkill.skill_level)) == null ? void 0 : _lvlsArray$find.name);
        group.select('.skill-highlight-text-lvl-line').transition(t).attr('opacity', 1);
        svg.select(`.Annotation-${highlightedSkill.category.replaceAll(' ', '-')}`).selectAll('.highlight-line').transition(t)
        // .attr('fill', "#333")
        .attr('opacity', 1);
        svg.select(`.Annotation-${highlightedSkill.category.replaceAll(' ', '-')}`).selectAll('.label-box').transition(t).attr('opacity', 1);
      }
    }
    const setHighlightedSkill = skill => {
      refreshSkillHighlightD3(g, skill, innerRadius, fontSize);
    };

    // eslint-disable-next-line no-unused-vars
    const handleSkillSelect = categoryFocus => {
      refreshBarsD3({
        svg: g,
        sortedCategories,
        categoryFocus,
        skillsData,
        getArcs,
        levels,
        groupedByCategory,
        handleSkillSelect,
        setHighlightedSkill
      });
      renderAnnotationsD3({
        svg: g,
        sortedCategories,
        categoryFocus,
        skillsData,
        levels,
        getArcs,
        groupedByCategory,
        config
      });
    };

    /* React component to render the rings indicating each level */
    // D3.js function to render the background level rings for a category
    function renderBackgroundLvlRingsD3(svg) {
      // Remove previous rings for this category if any
      svg.selectAll('.LvlRings').remove();
      const ringGroup = svg.append('g').attr('class', 'LvlRings');
      lvlsArray.forEach(lvl => {
        ringGroup.append('path').attr('d', lvlRing(lvl.level)).attr('fill', lvlArcColor).attr('stroke', 'none').attr('stroke-width', 1);
      });
      return svg;
    }

    /* add bars to svg */

    renderBackgroundLvlRingsD3(g);
    renderAnnotationsD3({
      svg: g,
      sortedCategories,
      categoryFocus: null,
      skillsData,
      levels,
      getArcs,
      groupedByCategory,
      config
    });
    renderSkillHighlightD3(g);
    refreshBarsD3({
      svg: g,
      sortedCategories,
      categoryFocus: false,
      skillsData,
      levels,
      getArcs,
      groupedByCategory,
      handleSkillSelect,
      setHighlightedSkill
    });
    return svg;
  }

  /*!
    * Bootstrap v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
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
     * @see https://www.harrytheo.com/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
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
      return typeof possibleCallback === 'function' ? possibleCallback.call(...args) : defaultValue;
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
          pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
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

    const VERSION = '5.3.8';

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

      // Private
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
        selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
      }
      return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null;
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

      // Private
      _isShown(element = this._element) {
        return element.classList.contains(CLASS_NAME_SHOW$7);
      }
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
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org/docs/v2/)');
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
          ...execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
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
      dd: [],
      div: [],
      dl: [],
      dt: [],
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
        return execute(arg, [undefined, this]);
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
          throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org/docs/v2/)');
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
        return execute(arg, [this._element, this._element]);
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
          ...execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
        };
      }
      _setListeners() {
        const triggers = this._config.trigger.split(' ');
        for (const trigger of triggers) {
          if (trigger === 'click') {
            EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
              const context = this._initializeOnDelegatedTarget(event);
              context._activeTrigger[TRIGGER_CLICK] = !(context._isShown() && context._activeTrigger[TRIGGER_CLICK]);
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


  /** export functions accessible in the global scope
   *
   * Usage example:  main().RadialBarChart(...args)
   *
   */
  var theme = () => {
    return {
      RadialBarChart
    };
  };

  return theme;

})();
//# sourceMappingURL=main.js.map

//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = Object.freeze({}), u = Array.isArray;
function d(e) {
	return e == null;
}
function f(e) {
	return e != null;
}
function p(e) {
	return e === !0;
}
function m(e) {
	return e === !1;
}
function h(e) {
	return typeof e == "string" || typeof e == "number" || typeof e == "symbol" || typeof e == "boolean";
}
function g(e) {
	return typeof e == "function";
}
function _(e) {
	return typeof e == "object" && !!e;
}
var v = Object.prototype.toString;
function y(e) {
	return v.call(e).slice(8, -1);
}
function b(e) {
	return v.call(e) === "[object Object]";
}
function x(e) {
	return v.call(e) === "[object RegExp]";
}
function ee(e) {
	let t = parseFloat(String(e));
	return t >= 0 && Math.floor(t) === t && isFinite(e);
}
function te(e) {
	return f(e) && typeof e.then == "function" && typeof e.catch == "function";
}
function ne(e) {
	return e == null ? "" : Array.isArray(e) || b(e) && e.toString === v ? JSON.stringify(e, re, 2) : String(e);
}
function re(e, t) {
	return t && t.__v_isRef ? t.value : t;
}
function ie(e) {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}
function S(e, t) {
	let n = Object.create(null), r = e.split(",");
	for (let e = 0; e < r.length; e++) n[r[e]] = !0;
	return t ? (e) => n[e.toLowerCase()] : (e) => n[e];
}
var C = S("slot,component", !0), w = S("key,ref,slot,slot-scope,is");
function T(e, t) {
	let n = e.length;
	if (n) {
		if (t === e[n - 1]) {
			e.length = n - 1;
			return;
		}
		let r = e.indexOf(t);
		if (r > -1) return e.splice(r, 1);
	}
}
var ae = Object.prototype.hasOwnProperty;
function E(e, t) {
	return ae.call(e, t);
}
function D(e) {
	let t = Object.create(null);
	return function(n) {
		return t[n] || (t[n] = e(n));
	};
}
var O = /-(\w)/g, k = D((e) => e.replace(O, (e, t) => t ? t.toUpperCase() : "")), A = D((e) => e.charAt(0).toUpperCase() + e.slice(1)), oe = /\B([A-Z])/g, j = D((e) => e.replace(oe, "-$1").toLowerCase());
/* istanbul ignore next */
function se(e, t) {
	function n(n) {
		let r = arguments.length;
		return r ? r > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t);
	}
	return n._length = e.length, n;
}
function ce(e, t) {
	return e.bind(t);
}
var le = Function.prototype.bind ? ce : se;
function ue(e, t) {
	t ||= 0;
	let n = e.length - t, r = Array(n);
	for (; n--;) r[n] = e[n + t];
	return r;
}
function M(e, t) {
	for (let n in t) e[n] = t[n];
	return e;
}
function de(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) e[n] && M(t, e[n]);
	return t;
}
function N(e, t, n) {}
var fe = (e, t, n) => !1, pe = (e) => e;
function me(e) {
	return e.reduce((e, t) => e.concat(t.staticKeys || []), []).join(",");
}
function P(e, t) {
	if (e === t) return !0;
	let n = _(e), r = _(t);
	if (n && r) try {
		let n = Array.isArray(e), r = Array.isArray(t);
		if (n && r) return e.length === t.length && e.every((e, n) => P(e, t[n]));
		if (e instanceof Date && t instanceof Date) return e.getTime() === t.getTime();
		if (!n && !r) {
			let n = Object.keys(e), r = Object.keys(t);
			return n.length === r.length && n.every((n) => P(e[n], t[n]));
		}
		/* istanbul ignore next */
		return !1;
	} catch {
		/* istanbul ignore next */
		return !1;
	}
	return !n && !r && String(e) === String(t);
}
function he(e, t) {
	for (let n = 0; n < e.length; n++) if (P(e[n], t)) return n;
	return -1;
}
function ge(e) {
	let t = !1;
	return function() {
		t || (t = !0, e.apply(this, arguments));
	};
}
function _e(e, t) {
	return e === t ? e === 0 && 1 / e != 1 / t : e === e || t === t;
}
var ve = "data-server-rendered", ye = [
	"component",
	"directive",
	"filter"
], be = [
	"beforeCreate",
	"created",
	"beforeMount",
	"mounted",
	"beforeUpdate",
	"updated",
	"beforeDestroy",
	"destroyed",
	"activated",
	"deactivated",
	"errorCaptured",
	"serverPrefetch",
	"renderTracked",
	"renderTriggered"
], F = {
	optionMergeStrategies: Object.create(null),
	silent: !1,
	productionTip: !0,
	devtools: !0,
	performance: !1,
	errorHandler: null,
	warnHandler: null,
	ignoredElements: [],
	keyCodes: Object.create(null),
	isReservedTag: fe,
	isReservedAttr: fe,
	isUnknownElement: fe,
	getTagNamespace: N,
	parsePlatformTagName: pe,
	mustUseProp: fe,
	async: !0,
	_lifecycleHooks: be
}, xe = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function Se(e) {
	let t = (e + "").charCodeAt(0);
	return t === 36 || t === 95;
}
function Ce(e, t, n, r) {
	Object.defineProperty(e, t, {
		value: n,
		enumerable: !!r,
		writable: !0,
		configurable: !0
	});
}
var we = RegExp(`[^${xe.source}.$_\\d]`);
function Te(e) {
	if (we.test(e)) return;
	let t = e.split(".");
	return function(e) {
		for (let n = 0; n < t.length; n++) {
			if (!e) return;
			e = e[t[n]];
		}
		return e;
	};
}
var Ee = "__proto__" in {}, I = typeof window < "u", L = I && window.navigator.userAgent.toLowerCase(), De = L && /msie|trident/.test(L), Oe = L && L.indexOf("msie 9.0") > 0, ke = L && L.indexOf("edge/") > 0;
L && L.indexOf("android");
var Ae = L && /iphone|ipad|ipod|ios/.test(L);
L && /chrome\/\d+/.test(L), L && /phantomjs/.test(L);
var je = L && L.match(/firefox\/(\d+)/), Me = {}.watch, Ne = !1;
if (I) try {
	let e = {};
	Object.defineProperty(e, "passive", { get() {
		/* istanbul ignore next */
		Ne = !0;
	} }), window.addEventListener("test-passive", null, e);
} catch {}
var Pe, R = () => (Pe === void 0 && 
/* istanbul ignore if */
(Pe = !I && typeof global < "u" && global.process && global.process.env.VUE_ENV === "server"), Pe), Fe = I && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */
function Ie(e) {
	return typeof e == "function" && /native code/.test(e.toString());
}
var Le = typeof Symbol < "u" && Ie(Symbol) && typeof Reflect < "u" && Ie(Reflect.ownKeys), Re = typeof Set < "u" && Ie(Set) ? Set : class {
	constructor() {
		this.set = Object.create(null);
	}
	has(e) {
		return this.set[e] === !0;
	}
	add(e) {
		this.set[e] = !0;
	}
	clear() {
		this.set = Object.create(null);
	}
}, z = null;
function B(e = null) {
	e || z && z._scope.off(), z = e, e && e._scope.on();
}
var V = class {
	constructor(e, t, n, r, i, a, o, s) {
		this.tag = e, this.data = t, this.children = n, this.text = r, this.elm = i, this.ns = void 0, this.context = a, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, this.key = t && t.key, this.componentOptions = o, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = s, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
	}
	/* istanbul ignore next */
	get child() {
		return this.componentInstance;
	}
}, ze = (e = "") => {
	let t = new V();
	return t.text = e, t.isComment = !0, t;
};
function H(e) {
	return new V(void 0, void 0, void 0, String(e));
}
function Be(e) {
	let t = new V(e.tag, e.data, e.children && e.children.slice(), e.text, e.elm, e.context, e.componentOptions, e.asyncFactory);
	return t.ns = e.ns, t.isStatic = e.isStatic, t.key = e.key, t.isComment = e.isComment, t.fnContext = e.fnContext, t.fnOptions = e.fnOptions, t.fnScopeId = e.fnScopeId, t.asyncMeta = e.asyncMeta, t.isCloned = !0, t;
}
var Ve;
{
	let e = S("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,require"), t = (e, t) => {
		Y(`Property or method "${t}" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://v2.vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.`, e);
	}, n = (e, t) => {
		Y(`Property "${t}" must be accessed with "$data.${t}" because properties starting with "\$" or "_" are not proxied in the Vue instance to prevent conflicts with Vue internals. See: https://v2.vuejs.org/v2/api/#data`, e);
	}, r = typeof Proxy < "u" && Ie(Proxy);
	if (r) {
		let e = S("stop,prevent,self,ctrl,shift,alt,meta,exact");
		F.keyCodes = new Proxy(F.keyCodes, { set(t, n, r) {
			return e(n) ? (Y(`Avoid overwriting built-in modifier in config.keyCodes: .${n}`), !1) : (t[n] = r, !0);
		} });
	}
	let i = { has(r, i) {
		let a = i in r, o = e(i) || typeof i == "string" && i.charAt(0) === "_" && !(i in r.$data);
		return !a && !o && (i in r.$data ? n(r, i) : t(r, i)), a || !o;
	} }, a = { get(e, r) {
		return typeof r == "string" && !(r in e) && (r in e.$data ? n(e, r) : t(e, r)), e[r];
	} };
	Ve = function(e) {
		if (r) {
			let t = e.$options, n = t.render && t.render._withStripped ? a : i;
			e._renderProxy = new Proxy(e, n);
		} else e._renderProxy = e;
	};
}
var U = 0, W = [], He = () => {
	for (let e = 0; e < W.length; e++) {
		let t = W[e];
		t.subs = t.subs.filter((e) => e), t._pending = !1;
	}
	W.length = 0;
}, Ue = class e {
	constructor() {
		this._pending = !1, this.id = U++, this.subs = [];
	}
	addSub(e) {
		this.subs.push(e);
	}
	removeSub(e) {
		this.subs[this.subs.indexOf(e)] = null, this._pending || (this._pending = !0, W.push(this));
	}
	depend(t) {
		e.target && (e.target.addDep(this), t && e.target.onTrack && e.target.onTrack(Object.assign({ effect: e.target }, t)));
	}
	notify(e) {
		let t = this.subs.filter((e) => e);
		F.async || t.sort((e, t) => e.id - t.id);
		for (let n = 0, r = t.length; n < r; n++) {
			let r = t[n];
			e && r.onTrigger && r.onTrigger(Object.assign({ effect: t[n] }, e)), r.update();
		}
	}
};
Ue.target = null;
var We = [];
function Ge(e) {
	We.push(e), Ue.target = e;
}
function Ke() {
	We.pop(), Ue.target = We[We.length - 1];
}
var qe = Array.prototype, G = Object.create(qe);
[
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"sort",
	"reverse"
].forEach(function(e) {
	let t = qe[e];
	Ce(G, e, function(...n) {
		let r = t.apply(this, n), i = this.__ob__, a;
		switch (e) {
			case "push":
			case "unshift":
				a = n;
				break;
			case "splice": a = n.slice(2);
		}
		return a && i.observeArray(a), i.dep.notify({
			type: "array mutation",
			target: this,
			key: e
		}), r;
	});
});
var K = Object.getOwnPropertyNames(G), q = {}, Je = !0;
function Ye(e) {
	Je = e;
}
var Xe = {
	notify: N,
	depend: N,
	addSub: N,
	removeSub: N
}, Ze = class {
	constructor(e, t = !1, n = !1) {
		if (this.value = e, this.shallow = t, this.mock = n, this.dep = n ? Xe : new Ue(), this.vmCount = 0, Ce(e, "__ob__", this), u(e)) {
			if (!n) {
				if (Ee) e.__proto__ = G;
				else for (let t = 0, n = K.length; t < n; t++) {
					let n = K[t];
					Ce(e, n, G[n]);
				}
			}
			t || this.observeArray(e);
		} else {
			let r = Object.keys(e);
			for (let i = 0; i < r.length; i++) {
				let a = r[i];
				$e(e, a, q, void 0, t, n);
			}
		}
	}
	observeArray(e) {
		for (let t = 0, n = e.length; t < n; t++) Qe(e[t], !1, this.mock);
	}
};
function Qe(e, t, n) {
	if (e && E(e, "__ob__") && e.__ob__ instanceof Ze) return e.__ob__;
	if (Je && (n || !R()) && (u(e) || b(e)) && Object.isExtensible(e) && !e.__v_skip && !st(e) && !(e instanceof V)) return new Ze(e, t, n);
}
function $e(e, t, n, r, i, a, o = !1) {
	let s = new Ue(), c = Object.getOwnPropertyDescriptor(e, t);
	if (c && c.configurable === !1) return;
	let l = c && c.get, d = c && c.set;
	(!l || d) && (n === q || arguments.length === 2) && (n = e[t]);
	let f = i ? n && n.__ob__ : Qe(n, !1, a);
	return Object.defineProperty(e, t, {
		enumerable: !0,
		configurable: !0,
		get: function() {
			let r = l ? l.call(e) : n;
			return Ue.target && (s.depend({
				target: e,
				type: "get",
				key: t
			}), f && (f.dep.depend(), u(r) && nt(r))), st(r) && !i ? r.value : r;
		},
		set: function(o) {
			let c = l ? l.call(e) : n;
			if (_e(c, o)) {
				if (r && r(), d) d.call(e, o);
				else if (l) return;
				else if (!i && st(c) && !st(o)) {
					c.value = o;
					return;
				} else n = o;
				f = i ? o && o.__ob__ : Qe(o, !1, a), s.notify({
					type: "set",
					target: e,
					key: t,
					newValue: o,
					oldValue: c
				});
			}
		}
	}), s;
}
function et(e, t, n) {
	if ((d(e) || h(e)) && Y(`Cannot set reactive property on undefined, null, or primitive value: ${e}`), at(e)) {
		Y(`Set operation on key "${t}" failed: target is readonly.`);
		return;
	}
	let r = e.__ob__;
	return u(e) && ee(t) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), r && !r.shallow && r.mock && Qe(n, !1, !0), n) : t in e && !(t in Object.prototype) ? (e[t] = n, n) : e._isVue || r && r.vmCount ? (Y("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option."), n) : r ? ($e(r.value, t, n, void 0, r.shallow, r.mock), r.dep.notify({
		type: "add",
		target: e,
		key: t,
		newValue: n,
		oldValue: void 0
	}), n) : (e[t] = n, n);
}
function tt(e, t) {
	if ((d(e) || h(e)) && Y(`Cannot delete reactive property on undefined, null, or primitive value: ${e}`), u(e) && ee(t)) {
		e.splice(t, 1);
		return;
	}
	let n = e.__ob__;
	e._isVue || n && n.vmCount ? Y("Avoid deleting properties on a Vue instance or its root $data - just set it to null.") : at(e) ? Y(`Delete operation on key "${t}" failed: target is readonly.`) : E(e, t) && (delete e[t], n && n.dep.notify({
		type: "delete",
		target: e,
		key: t
	}));
}
function nt(e) {
	for (let t, n = 0, r = e.length; n < r; n++) t = e[n], t && t.__ob__ && t.__ob__.dep.depend(), u(t) && nt(t);
}
function rt(e) {
	return it(e, !0), Ce(e, "__v_isShallow", !0), e;
}
function it(e, t) {
	if (!at(e)) {
		{
			u(e) && Y(`Avoid using Array as root value for ${t ? "shallowReactive()" : "reactive()"} as it cannot be tracked in watch() or watchEffect(). Use ${t ? "shallowRef()" : "ref()"} instead. This is a Vue-2-only limitation.`);
			let n = e && e.__ob__;
			n && n.shallow !== t && Y(`Target is already a ${n.shallow ? "" : "non-"}shallow reactive object, and cannot be converted to ${t ? "" : "non-"}shallow.`);
		}
		Qe(e, t, R()) || ((e == null || h(e)) && Y(`value cannot be made reactive: ${String(e)}`), ot(e) && Y("Vue 2 does not support reactive collection types such as Map or Set."));
	}
}
function at(e) {
	return !!(e && e.__v_isReadonly);
}
function ot(e) {
	let t = y(e);
	return t === "Map" || t === "WeakMap" || t === "Set" || t === "WeakSet";
}
function st(e) {
	return !!(e && e.__v_isRef === !0);
}
function ct(e, t, n) {
	Object.defineProperty(e, n, {
		enumerable: !0,
		configurable: !0,
		get: () => {
			let e = t[n];
			if (st(e)) return e.value;
			{
				let t = e && e.__ob__;
				return t && t.dep.depend(), e;
			}
		},
		set: (e) => {
			let r = t[n];
			st(r) && !st(e) ? r.value = e : t[n] = e;
		}
	});
}
var J, lt;
{
	let e = I && window.performance;
	/* istanbul ignore if */
	e && e.mark && e.measure && e.clearMarks && e.clearMeasures && (J = (t) => e.mark(t), lt = (t, n, r) => {
		e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
	});
}
var ut = D((e) => {
	let t = e.charAt(0) === "&";
	e = t ? e.slice(1) : e;
	let n = e.charAt(0) === "~";
	e = n ? e.slice(1) : e;
	let r = e.charAt(0) === "!";
	return e = r ? e.slice(1) : e, {
		name: e,
		once: n,
		capture: r,
		passive: t
	};
});
function dt(e, t) {
	function n() {
		let e = n.fns;
		if (u(e)) {
			let n = e.slice();
			for (let e = 0; e < n.length; e++) Yn(n[e], null, arguments, t, "v-on handler");
		} else return Yn(e, null, arguments, t, "v-on handler");
	}
	return n.fns = e, n;
}
function ft(e, t, n, r, i, a) {
	let o, s, c, l;
	for (o in e) s = e[o], c = t[o], l = ut(o), d(s) ? Y(`Invalid handler for event "${l.name}": got ` + String(s), a) : d(c) ? (d(s.fns) && (s = e[o] = dt(s, a)), p(l.once) && (s = e[o] = i(l.name, s, l.capture)), n(l.name, s, l.capture, l.passive, l.params)) : s !== c && (c.fns = s, e[o] = c);
	for (o in t) d(e[o]) && (l = ut(o), r(l.name, t[o], l.capture));
}
function pt(e, t, n) {
	e instanceof V && (e = e.data.hook || (e.data.hook = {}));
	let r, i = e[t];
	function a() {
		n.apply(this, arguments), T(r.fns, a);
	}
	d(i) ? r = dt([a]) : f(i.fns) && p(i.merged) ? (r = i, r.fns.push(a)) : r = dt([i, a]), r.merged = !0, e[t] = r;
}
function mt(e, t, n) {
	let r = t.options.props;
	if (d(r)) return;
	let i = {}, { attrs: a, props: o } = e;
	if (f(a) || f(o)) for (let e in r) {
		let r = j(e);
		{
			let i = e.toLowerCase();
			e !== i && a && E(a, i) && Gr(`Prop "${i}" is passed to component ${qr(n || t)}, but the declared prop name is "${e}". Note that HTML attributes are case-insensitive and camelCased props need to use their kebab-case equivalents when using in-DOM templates. You should probably use "${r}" instead of "${e}".`);
		}
		ht(i, o, e, r, !0) || ht(i, a, e, r, !1);
	}
	return i;
}
function ht(e, t, n, r, i) {
	if (f(t)) {
		if (E(t, n)) return e[n] = t[n], i || delete t[n], !0;
		if (E(t, r)) return e[n] = t[r], i || delete t[r], !0;
	}
	return !1;
}
function gt(e) {
	for (let t = 0; t < e.length; t++) if (u(e[t])) return Array.prototype.concat.apply([], e);
	return e;
}
function _t(e) {
	return h(e) ? [H(e)] : u(e) ? yt(e) : void 0;
}
function vt(e) {
	return f(e) && f(e.text) && m(e.isComment);
}
function yt(e, t) {
	let n = [], r, i, a, o;
	for (r = 0; r < e.length; r++) i = e[r], !(d(i) || typeof i == "boolean") && (a = n.length - 1, o = n[a], u(i) ? i.length > 0 && (i = yt(i, `${t || ""}_${r}`), vt(i[0]) && vt(o) && (n[a] = H(o.text + i[0].text), i.shift()), n.push.apply(n, i)) : h(i) ? vt(o) ? n[a] = H(o.text + i) : i !== "" && n.push(H(i)) : vt(i) && vt(o) ? n[a] = H(o.text + i.text) : (p(e._isVList) && f(i.tag) && d(i.key) && f(t) && (i.key = `__vlist${t}_${r}__`), n.push(i)));
	return n;
}
var bt = 1, xt = 2;
function St(e, t, n, r, i, a) {
	return (u(n) || h(n)) && (i = r, r = n, n = void 0), p(a) && (i = xt), Ct(e, t, n, r, i);
}
function Ct(e, t, n, r, i) {
	if (f(n) && f(n.__ob__)) return Y(`Avoid using observed data object as vnode data: ${JSON.stringify(n)}\nAlways create fresh vnode data objects in each render!`, e), ze();
	if (f(n) && f(n.is) && (t = n.is), !t) return ze();
	f(n) && f(n.key) && !h(n.key) && Y("Avoid using non-primitive value as key, use string/number value instead.", e), u(r) && g(r[0]) && (n ||= {}, n.scopedSlots = { default: r[0] }, r.length = 0), i === xt ? r = _t(r) : i === bt && (r = gt(r));
	let a, o;
	if (typeof t == "string") {
		let i;
		o = e.$vnode && e.$vnode.ns || F.getTagNamespace(t), F.isReservedTag(t) ? (f(n) && f(n.nativeOn) && n.tag !== "component" && Y(`The .native modifier for v-on is only valid on components but it was used on <${t}>.`, e), a = new V(F.parsePlatformTagName(t), n, r, void 0, void 0, e)) : a = (!n || !n.pre) && f(i = ci(e.$options, "components", t)) ? Br(i, n, e, r, t) : new V(t, n, r, void 0, void 0, e);
	} else a = Br(t, n, e, r);
	return u(a) ? a : f(a) ? (f(o) && wt(a, o), f(n) && Tt(n), a) : ze();
}
function wt(e, t, n) {
	if (e.ns = t, e.tag === "foreignObject" && (t = void 0, n = !0), f(e.children)) for (let r = 0, i = e.children.length; r < i; r++) {
		let i = e.children[r];
		f(i.tag) && (d(i.ns) || p(n) && i.tag !== "svg") && wt(i, t, n);
	}
}
function Tt(e) {
	_(e.style) && or(e.style), _(e.class) && or(e.class);
}
function Et(e, t) {
	let n = null, r, i, a, o;
	if (u(e) || typeof e == "string") for (n = Array(e.length), r = 0, i = e.length; r < i; r++) n[r] = t(e[r], r);
	else if (typeof e == "number") for (n = Array(e), r = 0; r < e; r++) n[r] = t(r + 1, r);
	else if (_(e)) {
		if (Le && e[Symbol.iterator]) {
			n = [];
			let r = e[Symbol.iterator](), i = r.next();
			for (; !i.done;) n.push(t(i.value, n.length)), i = r.next();
		} else for (a = Object.keys(e), n = Array(a.length), r = 0, i = a.length; r < i; r++) o = a[r], n[r] = t(e[o], o, r);
	}
	return f(n) || (n = []), n._isVList = !0, n;
}
function Dt(e, t, n, r) {
	let i = this.$scopedSlots[e], a;
	i ? (n ||= {}, r && (_(r) || Y("slot v-bind without argument expects an Object", this), n = M(M({}, r), n)), a = i(n) || (g(t) ? t() : t)) : a = this.$slots[e] || (g(t) ? t() : t);
	let o = n && n.slot;
	return o ? this.$createElement("template", { slot: o }, a) : a;
}
function Ot(e) {
	return ci(this.$options, "filters", e, !0) || pe;
}
function kt(e, t) {
	return u(e) ? e.indexOf(t) === -1 : e !== t;
}
function At(e, t, n, r, i) {
	let a = F.keyCodes[t] || n;
	return i && r && !F.keyCodes[t] ? kt(i, r) : a ? kt(a, e) : r ? j(r) !== t : e === void 0;
}
function jt(e, t, n, r, i) {
	if (n) {
		if (!_(n)) Y("v-bind without argument expects an Object or Array value", this);
		else {
			u(n) && (n = de(n));
			let a;
			for (let o in n) {
				if (o === "class" || o === "style" || w(o)) a = e;
				else {
					let n = e.attrs && e.attrs.type;
					a = r || F.mustUseProp(t, n, o) ? e.domProps ||= {} : e.attrs ||= {};
				}
				let s = k(o), c = j(o);
				if (!(s in a) && !(c in a) && (a[o] = n[o], i)) {
					let t = e.on ||= {};
					t[`update:${o}`] = function(e) {
						n[o] = e;
					};
				}
			}
		}
	}
	return e;
}
function Mt(e, t) {
	let n = this._staticTrees ||= [], r = n[e];
	return r && !t || (r = n[e] = this.$options.staticRenderFns[e].call(this._renderProxy, this._c, this), Pt(r, `__static__${e}`, !1)), r;
}
function Nt(e, t, n) {
	return Pt(e, `__once__${t}${n ? `_${n}` : ""}`, !0), e;
}
function Pt(e, t, n) {
	if (u(e)) for (let r = 0; r < e.length; r++) e[r] && typeof e[r] != "string" && Ft(e[r], `${t}_${r}`, n);
	else Ft(e, t, n);
}
function Ft(e, t, n) {
	e.isStatic = !0, e.key = t, e.isOnce = n;
}
function It(e, t) {
	if (t) {
		if (!b(t)) Y("v-on without argument expects an Object value", this);
		else {
			let n = e.on = e.on ? M({}, e.on) : {};
			for (let e in t) {
				let r = n[e], i = t[e];
				n[e] = r ? [].concat(r, i) : i;
			}
		}
	}
	return e;
}
function Lt(e, t, n, r) {
	t ||= { $stable: !n };
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		u(i) ? Lt(i, t, n) : i && (i.proxy && (i.fn.proxy = !0), t[i.key] = i.fn);
	}
	return r && (t.$key = r), t;
}
function Rt(e, t) {
	for (let n = 0; n < t.length; n += 2) {
		let r = t[n];
		typeof r == "string" && r ? e[t[n]] = t[n + 1] : r !== "" && r !== null && Y(`Invalid value for dynamic directive argument (expected string or null): ${r}`, this);
	}
	return e;
}
function zt(e, t) {
	return typeof e == "string" ? t + e : e;
}
function Bt(e) {
	e._o = Nt, e._n = ie, e._s = ne, e._l = Et, e._t = Dt, e._q = P, e._i = he, e._m = Mt, e._f = Ot, e._k = At, e._b = jt, e._v = H, e._e = ze, e._u = Lt, e._g = It, e._d = Rt, e._p = zt;
}
function Vt(e, t) {
	if (!e || !e.length) return {};
	let n = {};
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r], a = i.data;
		if (a && a.attrs && a.attrs.slot && delete a.attrs.slot, (i.context === t || i.fnContext === t) && a && a.slot != null) {
			let e = a.slot, t = n[e] || (n[e] = []);
			i.tag === "template" ? t.push.apply(t, i.children || []) : t.push(i);
		} else (n.default ||= []).push(i);
	}
	for (let e in n) n[e].every(Ht) && delete n[e];
	return n;
}
function Ht(e) {
	return e.isComment && !e.asyncFactory || e.text === " ";
}
function Ut(e) {
	return e.isComment && e.asyncFactory;
}
function Wt(e, t, n, r) {
	let i, a = Object.keys(n).length > 0, o = t ? !!t.$stable : !a, s = t && t.$key;
	if (!t) i = {};
	else if (t._normalized) return t._normalized;
	else if (o && r && r !== l && s === r.$key && !a && !r.$hasNormal) return r;
	else {
		i = {};
		for (let r in t) t[r] && r[0] !== "$" && (i[r] = Gt(e, n, r, t[r]));
	}
	for (let e in n) e in i || (i[e] = Kt(n, e));
	return t && Object.isExtensible(t) && (t._normalized = i), Ce(i, "$stable", o), Ce(i, "$key", s), Ce(i, "$hasNormal", a), i;
}
function Gt(e, t, n, r) {
	let i = function() {
		let t = z;
		B(e);
		let n = arguments.length ? r.apply(null, arguments) : r({});
		n = n && typeof n == "object" && !u(n) ? [n] : _t(n);
		let i = n && n[0];
		return B(t), n && (!i || n.length === 1 && i.isComment && !Ut(i)) ? void 0 : n;
	};
	return r.proxy && Object.defineProperty(t, n, {
		get: i,
		enumerable: !0,
		configurable: !0
	}), i;
}
function Kt(e, t) {
	return () => e[t];
}
function qt(e) {
	let t = e.$options, n = t.setup;
	if (n) {
		let r = e._setupContext = Jt(e);
		B(e), Ge();
		let i = Yn(n, null, [e._props || rt({}), r], e, "setup");
		if (Ke(), B(), g(i)) t.render = i;
		else if (_(i)) {
			if (i instanceof V && Y("setup() should not return VNodes directly - return a render function instead."), e._setupState = i, i.__sfc) {
				let t = e._setupProxy = {};
				for (let e in i) e !== "__sfc" && ct(t, i, e);
			} else for (let t in i) Se(t) ? Y("Avoid using variables that start with _ or $ in setup().") : ct(e, i, t);
		} else i !== void 0 && Y(`setup() should return an object. Received: ${i === null ? "null" : typeof i}`);
	}
}
function Jt(e) {
	let t = !1;
	return {
		get attrs() {
			if (!e._attrsProxy) {
				let t = e._attrsProxy = {};
				Ce(t, "_v_attr_proxy", !0), Yt(t, e.$attrs, l, e, "$attrs");
			}
			return e._attrsProxy;
		},
		get listeners() {
			return e._listenersProxy || Yt(e._listenersProxy = {}, e.$listeners, l, e, "$listeners"), e._listenersProxy;
		},
		get slots() {
			return Zt(e);
		},
		emit: le(e.$emit, e),
		expose(n) {
			t && Y("expose() should be called only once per setup().", e), t = !0, n && Object.keys(n).forEach((t) => ct(e, n, t));
		}
	};
}
function Yt(e, t, n, r, i) {
	let a = !1;
	for (let o in t) o in e ? t[o] !== n[o] && (a = !0) : (a = !0, Xt(e, o, r, i));
	for (let n in e) n in t || (a = !0, delete e[n]);
	return a;
}
function Xt(e, t, n, r) {
	Object.defineProperty(e, t, {
		enumerable: !0,
		configurable: !0,
		get() {
			return n[r][t];
		}
	});
}
function Zt(e) {
	return e._slotsProxy || Qt(e._slotsProxy = {}, e.$scopedSlots), e._slotsProxy;
}
function Qt(e, t) {
	for (let n in t) e[n] = t[n];
	for (let n in e) n in t || delete e[n];
}
function $t(e) {
	e._vnode = null, e._staticTrees = null;
	let t = e.$options, n = e.$vnode = t._parentVnode, r = n && n.context;
	e.$slots = Vt(t._renderChildren, r), e.$scopedSlots = n ? Wt(e.$parent, n.data.scopedSlots, e.$slots) : l, e._c = (t, n, r, i) => St(e, t, n, r, i, !1), e.$createElement = (t, n, r, i) => St(e, t, n, r, i, !0);
	let i = n && n.data;
	$e(e, "$attrs", i && i.attrs || l, () => {
		!yn && Y("$attrs is readonly.", e);
	}, !0), $e(e, "$listeners", t._parentListeners || l, () => {
		!yn && Y("$listeners is readonly.", e);
	}, !0);
}
var en = null;
function tn(e) {
	Bt(e.prototype), e.prototype.$nextTick = function(e) {
		return rr(e, this);
	}, e.prototype._render = function() {
		let e = this, { render: t, _parentVnode: n } = e.$options;
		n && e._isMounted && (e.$scopedSlots = Wt(e.$parent, n.data.scopedSlots, e.$slots, e.$scopedSlots), e._slotsProxy && Qt(e._slotsProxy, e.$scopedSlots)), e.$vnode = n;
		let r = z, i = en, a;
		try {
			B(e), en = e, a = t.call(e._renderProxy, e.$createElement);
		} catch (t) {
			/* istanbul ignore else */
			if (Jn(t, e, "render"), e.$options.renderError) try {
				a = e.$options.renderError.call(e._renderProxy, e.$createElement, t);
			} catch (t) {
				Jn(t, e, "renderError"), a = e._vnode;
			}
			else a = e._vnode;
		} finally {
			en = i, B(r);
		}
		return u(a) && a.length === 1 && (a = a[0]), a instanceof V || (u(a) && Y("Multiple root nodes returned from render function. Render function should return a single root node.", e), a = ze()), a.parent = n, a;
	};
}
function nn(e, t) {
	return (e.__esModule || Le && e[Symbol.toStringTag] === "Module") && (e = e.default), _(e) ? t.extend(e) : e;
}
function rn(e, t, n, r, i) {
	let a = ze();
	return a.asyncFactory = e, a.asyncMeta = {
		data: t,
		context: n,
		children: r,
		tag: i
	}, a;
}
function an(e, t) {
	if (p(e.error) && f(e.errorComp)) return e.errorComp;
	if (f(e.resolved)) return e.resolved;
	let n = en;
	if (n && f(e.owners) && e.owners.indexOf(n) === -1 && e.owners.push(n), p(e.loading) && f(e.loadingComp)) return e.loadingComp;
	if (n && !f(e.owners)) {
		let r = e.owners = [n], i = !0, a = null, o = null;
		n.$on("hook:destroyed", () => T(r, n));
		let s = (e) => {
			for (let e = 0, t = r.length; e < t; e++) r[e].$forceUpdate();
			e && (r.length = 0, a !== null && (clearTimeout(a), a = null), o !== null && (clearTimeout(o), o = null));
		}, c = ge((n) => {
			e.resolved = nn(n, t), i ? r.length = 0 : s(!0);
		}), l = ge((t) => {
			Y(`Failed to resolve async component: ${String(e)}` + (t ? `\nReason: ${t}` : "")), f(e.errorComp) && (e.error = !0, s(!0));
		}), u = e(c, l);
		return _(u) && (te(u) ? d(e.resolved) && u.then(c, l) : te(u.component) && (u.component.then(c, l), f(u.error) && (e.errorComp = nn(u.error, t)), f(u.loading) && (e.loadingComp = nn(u.loading, t), u.delay === 0 ? e.loading = !0 : a = setTimeout(() => {
			a = null, d(e.resolved) && d(e.error) && (e.loading = !0, s(!1));
		}, u.delay || 200)), f(u.timeout) && (o = setTimeout(() => {
			o = null, d(e.resolved) && l(`timeout (${u.timeout}ms)`);
		}, u.timeout)))), i = !1, e.loading ? e.loadingComp : e.resolved;
	}
}
function on(e) {
	if (u(e)) for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (f(n) && (f(n.componentOptions) || Ut(n))) return n;
	}
}
function sn(e) {
	e._events = Object.create(null), e._hasHookEvent = !1;
	let t = e.$options._parentListeners;
	t && fn(e, t);
}
var cn;
function ln(e, t) {
	cn.$on(e, t);
}
function un(e, t) {
	cn.$off(e, t);
}
function dn(e, t) {
	let n = cn;
	return function r() {
		t.apply(null, arguments) !== null && n.$off(e, r);
	};
}
function fn(e, t, n) {
	cn = e, ft(t, n || {}, ln, un, dn, e), cn = void 0;
}
function pn(e) {
	let t = /^hook:/;
	e.prototype.$on = function(e, n) {
		let r = this;
		if (u(e)) for (let t = 0, i = e.length; t < i; t++) r.$on(e[t], n);
		else (r._events[e] || (r._events[e] = [])).push(n), t.test(e) && (r._hasHookEvent = !0);
		return r;
	}, e.prototype.$once = function(e, t) {
		let n = this;
		function r() {
			n.$off(e, r), t.apply(n, arguments);
		}
		return r.fn = t, n.$on(e, r), n;
	}, e.prototype.$off = function(e, t) {
		let n = this;
		if (!arguments.length) return n._events = Object.create(null), n;
		if (u(e)) {
			for (let r = 0, i = e.length; r < i; r++) n.$off(e[r], t);
			return n;
		}
		let r = n._events[e];
		if (!r) return n;
		if (!t) return n._events[e] = null, n;
		let i, a = r.length;
		for (; a--;) if (i = r[a], i === t || i.fn === t) {
			r.splice(a, 1);
			break;
		}
		return n;
	}, e.prototype.$emit = function(e) {
		let t = this;
		{
			let n = e.toLowerCase();
			n !== e && t._events[n] && Gr(`Event "${n}" is emitted in component ${qr(t)} but the handler is registered for "${e}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${j(e)}" instead of "${e}".`);
		}
		let n = t._events[e];
		if (n) {
			n = n.length > 1 ? ue(n) : n;
			let r = ue(arguments, 1), i = `event handler for "${e}"`;
			for (let e = 0, a = n.length; e < a; e++) Yn(n[e], t, r, t, i);
		}
		return t;
	};
}
var mn, hn = class {
	constructor(e = !1) {
		this.detached = e, this.active = !0, this.effects = [], this.cleanups = [], this.parent = mn, !e && mn && (this.index = (mn.scopes || (mn.scopes = [])).push(this) - 1);
	}
	run(e) {
		if (this.active) {
			let t = mn;
			try {
				return mn = this, e();
			} finally {
				mn = t;
			}
		} else Y("cannot run an inactive effect scope.");
	}
	on() {
		mn = this;
	}
	off() {
		mn = this.parent;
	}
	stop(e) {
		if (this.active) {
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].teardown();
			for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0, this.active = !1;
		}
	}
};
function gn(e, t = mn) {
	t && t.active && t.effects.push(e);
}
function _n() {
	return mn;
}
var vn = null, yn = !1;
function bn(e) {
	let t = vn;
	return vn = e, () => {
		vn = t;
	};
}
function xn(e) {
	let t = e.$options, n = t.parent;
	if (n && !t.abstract) {
		for (; n.$options.abstract && n.$parent;) n = n.$parent;
		n.$children.push(e);
	}
	e.$parent = n, e.$root = n ? n.$root : e, e.$children = [], e.$refs = {}, e._provided = n ? n._provided : Object.create(null), e._watcher = null, e._inactive = null, e._directInactive = !1, e._isMounted = !1, e._isDestroyed = !1, e._isBeingDestroyed = !1;
}
function Sn(e) {
	e.prototype._update = function(e, t) {
		let n = this, r = n.$el, i = n._vnode, a = bn(n);
		n._vnode = e, n.$el = i ? n.__patch__(i, e) : n.__patch__(n.$el, e, t, !1), a(), r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n);
		let o = n;
		for (; o && o.$vnode && o.$parent && o.$vnode === o.$parent._vnode;) o.$parent.$el = o.$el, o = o.$parent;
	}, e.prototype.$forceUpdate = function() {
		let e = this;
		e._watcher && e._watcher.update();
	}, e.prototype.$destroy = function() {
		let e = this;
		if (e._isBeingDestroyed) return;
		On(e, "beforeDestroy"), e._isBeingDestroyed = !0;
		let t = e.$parent;
		t && !t._isBeingDestroyed && !e.$options.abstract && T(t.$children, e), e._scope.stop(), e._data.__ob__ && e._data.__ob__.vmCount--, e._isDestroyed = !0, e.__patch__(e._vnode, null), On(e, "destroyed"), e.$off(), e.$el && (e.$el.__vue__ = null), e.$vnode && (e.$vnode.parent = null);
	};
}
function Cn(e, t, n) {
	e.$el = t, e.$options.render || (e.$options.render = ze, e.$options.template && e.$options.template.charAt(0) !== "#" || e.$options.el || t ? Y("You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.", e) : Y("Failed to mount component: template or render function not defined.", e)), On(e, "beforeMount");
	let r;
	/* istanbul ignore if */
	r = F.performance && J ? () => {
		let t = e._name, r = e._uid, i = `vue-perf-start:${r}`, a = `vue-perf-end:${r}`;
		J(i);
		let o = e._render();
		J(a), lt(`vue ${t} render`, i, a), J(i), e._update(o, n), J(a), lt(`vue ${t} patch`, i, a);
	} : () => {
		e._update(e._render(), n);
	};
	let i = { before() {
		e._isMounted && !e._isDestroyed && On(e, "beforeUpdate");
	} };
	i.onTrack = (t) => On(e, "renderTracked", [t]), i.onTrigger = (t) => On(e, "renderTriggered", [t]), new lr(e, r, N, i, !0), n = !1;
	let a = e._preWatchers;
	if (a) for (let e = 0; e < a.length; e++) a[e].run();
	return e.$vnode ?? (e._isMounted = !0, On(e, "mounted")), e;
}
function wn(e, t, n, r, i) {
	yn = !0;
	let a = r.data.scopedSlots, o = e.$scopedSlots, s = !!(a && !a.$stable || o !== l && !o.$stable || a && e.$scopedSlots.$key !== a.$key || !a && e.$scopedSlots.$key), c = !!(i || e.$options._renderChildren || s), u = e.$vnode;
	e.$options._parentVnode = r, e.$vnode = r, e._vnode && (e._vnode.parent = r), e.$options._renderChildren = i;
	let d = r.data.attrs || l;
	e._attrsProxy && Yt(e._attrsProxy, d, u.data && u.data.attrs || l, e, "$attrs") && (c = !0), e.$attrs = d, n ||= l;
	let f = e.$options._parentListeners;
	if (e._listenersProxy && Yt(e._listenersProxy, n, f || l, e, "$listeners"), e.$listeners = e.$options._parentListeners = n, fn(e, n, f), t && e.$options.props) {
		Ye(!1);
		let n = e._props, r = e.$options._propKeys || [];
		for (let i = 0; i < r.length; i++) {
			let a = r[i], o = e.$options.props;
			n[a] = li(a, o, t, e);
		}
		Ye(!0), e.$options.propsData = t;
	}
	c && (e.$slots = Vt(i, r.context), e.$forceUpdate()), yn = !1;
}
function Tn(e) {
	for (; e &&= e.$parent;) if (e._inactive) return !0;
	return !1;
}
function En(e, t) {
	if (t) {
		if (e._directInactive = !1, Tn(e)) return;
	} else if (e._directInactive) return;
	if (e._inactive || e._inactive === null) {
		e._inactive = !1;
		for (let t = 0; t < e.$children.length; t++) En(e.$children[t]);
		On(e, "activated");
	}
}
function Dn(e, t) {
	if (!(t && (e._directInactive = !0, Tn(e))) && !e._inactive) {
		e._inactive = !0;
		for (let t = 0; t < e.$children.length; t++) Dn(e.$children[t]);
		On(e, "deactivated");
	}
}
function On(e, t, n, r = !0) {
	Ge();
	let i = z, a = _n();
	r && B(e);
	let o = e.$options[t], s = `${t} hook`;
	if (o) for (let t = 0, r = o.length; t < r; t++) Yn(o[t], e, n || null, e, s);
	e._hasHookEvent && e.$emit("hook:" + t), r && (B(i), a && a.on()), Ke();
}
var kn = 100, An = [], jn = [], Mn = {}, Nn = {}, Pn = !1, Fn = !1, In = 0;
function Ln() {
	In = An.length = jn.length = 0, Mn = {}, Nn = {}, Pn = Fn = !1;
}
var Rn = 0, zn = Date.now;
if (I && !De) {
	let e = window.performance;
	e && typeof e.now == "function" && zn() > document.createEvent("Event").timeStamp && (zn = () => e.now());
}
var Bn = (e, t) => {
	if (e.post) {
		if (!t.post) return 1;
	} else if (t.post) return -1;
	return e.id - t.id;
};
function Vn() {
	Rn = zn(), Fn = !0;
	let e, t;
	for (An.sort(Bn), In = 0; In < An.length; In++) if (e = An[In], e.before && e.before(), t = e.id, Mn[t] = null, e.run(), Mn[t] != null && (Nn[t] = (Nn[t] || 0) + 1, Nn[t] > kn)) {
		Y("You may have an infinite update loop " + (e.user ? `in watcher with expression "${e.expression}"` : "in a component render function."), e.vm);
		break;
	}
	let n = jn.slice(), r = An.slice();
	/* istanbul ignore if */
	Ln(), Wn(n), Hn(r), He(), Fe && F.devtools && Fe.emit("flush");
}
function Hn(e) {
	let t = e.length;
	for (; t--;) {
		let n = e[t], r = n.vm;
		r && r._watcher === n && r._isMounted && !r._isDestroyed && On(r, "updated");
	}
}
function Un(e) {
	e._inactive = !1, jn.push(e);
}
function Wn(e) {
	for (let t = 0; t < e.length; t++) e[t]._inactive = !0, En(e[t], !0);
}
function Gn(e) {
	let t = e.id;
	if (Mn[t] == null && !(e === Ue.target && e.noRecurse)) {
		if (Mn[t] = !0, !Fn) An.push(e);
		else {
			let t = An.length - 1;
			for (; t > In && An[t].id > e.id;) t--;
			An.splice(t + 1, 0, e);
		}
		if (!Pn) {
			if (Pn = !0, !F.async) {
				Vn();
				return;
			}
			rr(Vn);
		}
	}
}
var Kn = "watcher";
`${Kn}`, `${Kn}`, `${Kn}`;
function qn(e) {
	let t = e._provided, n = e.$parent && e.$parent._provided;
	return n === t ? e._provided = Object.create(n) : t;
}
function Jn(e, t, n) {
	Ge();
	try {
		if (t) {
			let r = t;
			for (; r = r.$parent;) {
				let i = r.$options.errorCaptured;
				if (i) for (let a = 0; a < i.length; a++) try {
					if (i[a].call(r, e, t, n) === !1) return;
				} catch (e) {
					Xn(e, r, "errorCaptured hook");
				}
			}
		}
		Xn(e, t, n);
	} finally {
		Ke();
	}
}
function Yn(e, t, n, r, i) {
	let a;
	try {
		a = n ? e.apply(t, n) : e.call(t), a && !a._isVue && te(a) && !a._handled && (a.catch((e) => Jn(e, r, i + " (Promise/async)")), a._handled = !0);
	} catch (e) {
		Jn(e, r, i);
	}
	return a;
}
function Xn(e, t, n) {
	if (F.errorHandler) try {
		return F.errorHandler.call(null, e, t, n);
	} catch (t) {
		t !== e && Zn(t, null, "config.errorHandler");
	}
	Zn(e, t, n);
}
function Zn(e, t, n) {
	/* istanbul ignore else */
	if (Y(`Error in ${n}: "${e.toString()}"`, t), I && typeof console < "u") console.error(e);
	else throw e;
}
var Qn = !1, $n = [], er = !1;
function tr() {
	er = !1;
	let e = $n.slice(0);
	$n.length = 0;
	for (let t = 0; t < e.length; t++) e[t]();
}
var nr;
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise < "u" && Ie(Promise)) {
	let e = Promise.resolve();
	nr = () => {
		e.then(tr), Ae && setTimeout(N);
	}, Qn = !0;
} else if (!De && typeof MutationObserver < "u" && (Ie(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
	let e = 1, t = new MutationObserver(tr), n = document.createTextNode(String(e));
	t.observe(n, { characterData: !0 }), nr = () => {
		e = (e + 1) % 2, n.data = String(e);
	}, Qn = !0;
} else nr = typeof setImmediate < "u" && Ie(setImmediate) ? () => {
	setImmediate(tr);
} : () => {
	setTimeout(tr, 0);
};
function rr(e, t) {
	let n;
	if ($n.push(() => {
		if (e) try {
			e.call(t);
		} catch (e) {
			Jn(e, t, "nextTick");
		}
		else n && n(t);
	}), er || (er = !0, nr()), !e && typeof Promise < "u") return new Promise((e) => {
		n = e;
	});
}
var ir = "2.7.16", ar = new Re();
function or(e) {
	return sr(e, ar), ar.clear(), e;
}
function sr(e, t) {
	let n, r, i = u(e);
	if (!(!i && !_(e) || e.__v_skip || Object.isFrozen(e) || e instanceof V)) {
		if (e.__ob__) {
			let n = e.__ob__.dep.id;
			if (t.has(n)) return;
			t.add(n);
		}
		if (i) for (n = e.length; n--;) sr(e[n], t);
		else if (st(e)) sr(e.value, t);
		else for (r = Object.keys(e), n = r.length; n--;) sr(e[r[n]], t);
	}
}
var cr = 0, lr = class {
	constructor(e, t, n, r, i) {
		gn(this, mn && !mn._vm ? mn : e ? e._scope : void 0), (this.vm = e) && i && (e._watcher = this), r ? (this.deep = !!r.deep, this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync, this.before = r.before, this.onTrack = r.onTrack, this.onTrigger = r.onTrigger) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++cr, this.active = !0, this.post = !1, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new Re(), this.newDepIds = new Re(), this.expression = t.toString(), g(t) ? this.getter = t : (this.getter = Te(t), this.getter || (this.getter = N, Y(`Failed watching path: "${t}" Watcher only accepts simple dot-delimited paths. For full control, use a function instead.`, e))), this.value = this.lazy ? void 0 : this.get();
	}
	get() {
		Ge(this);
		let e, t = this.vm;
		try {
			e = this.getter.call(t, t);
		} catch (e) {
			if (this.user) Jn(e, t, `getter for watcher "${this.expression}"`);
			else throw e;
		} finally {
			this.deep && or(e), Ke(), this.cleanupDeps();
		}
		return e;
	}
	addDep(e) {
		let t = e.id;
		this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this));
	}
	cleanupDeps() {
		let e = this.deps.length;
		for (; e--;) {
			let t = this.deps[e];
			this.newDepIds.has(t.id) || t.removeSub(this);
		}
		let t = this.depIds;
		this.depIds = this.newDepIds, this.newDepIds = t, this.newDepIds.clear(), t = this.deps, this.deps = this.newDeps, this.newDeps = t, this.newDeps.length = 0;
	}
	update() {
		/* istanbul ignore else */
		this.lazy ? this.dirty = !0 : this.sync ? this.run() : Gn(this);
	}
	run() {
		if (this.active) {
			let e = this.get();
			if (e !== this.value || _(e) || this.deep) {
				let t = this.value;
				if (this.value = e, this.user) {
					let n = `callback for watcher "${this.expression}"`;
					Yn(this.cb, this.vm, [e, t], this.vm, n);
				} else this.cb.call(this.vm, e, t);
			}
		}
	}
	evaluate() {
		this.value = this.get(), this.dirty = !1;
	}
	depend() {
		let e = this.deps.length;
		for (; e--;) this.deps[e].depend();
	}
	teardown() {
		if (this.vm && !this.vm._isBeingDestroyed && T(this.vm._scope.effects, this), this.active) {
			let e = this.deps.length;
			for (; e--;) this.deps[e].removeSub(this);
			this.active = !1, this.onStop && this.onStop();
		}
	}
}, ur = {
	enumerable: !0,
	configurable: !0,
	get: N,
	set: N
};
function dr(e, t, n) {
	ur.get = function() {
		return this[t][n];
	}, ur.set = function(e) {
		this[t][n] = e;
	}, Object.defineProperty(e, n, ur);
}
function fr(e) {
	let t = e.$options;
	if (t.props && pr(e, t.props), qt(e), t.methods && xr(e, t.methods), t.data) mr(e);
	else {
		let t = Qe(e._data = {});
		t && t.vmCount++;
	}
	t.computed && _r(e, t.computed), t.watch && t.watch !== Me && Sr(e, t.watch);
}
function pr(e, t) {
	let n = e.$options.propsData || {}, r = e._props = rt({}), i = e.$options._propKeys = [], a = !e.$parent;
	a || Ye(!1);
	for (let o in t) {
		i.push(o);
		let s = li(o, t, n, e);
		/* istanbul ignore else */
		{
			let t = j(o);
			(w(t) || F.isReservedAttr(t)) && Y(`"${t}" is a reserved attribute and cannot be used as component prop.`, e), $e(r, o, s, () => {
				!a && !yn && Y(`Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "${o}"`, e);
			}, !0);
		}
		o in e || dr(e, "_props", o);
	}
	Ye(!0);
}
function mr(e) {
	let t = e.$options.data;
	t = e._data = g(t) ? hr(t, e) : t || {}, b(t) || (t = {}, Y("data functions should return an object:\nhttps://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function", e));
	let n = Object.keys(t), r = e.$options.props, i = e.$options.methods, a = n.length;
	for (; a--;) {
		let t = n[a];
		i && E(i, t) && Y(`Method "${t}" has already been defined as a data property.`, e), r && E(r, t) ? Y(`The data property "${t}" is already declared as a prop. Use prop default value instead.`, e) : Se(t) || dr(e, "_data", t);
	}
	let o = Qe(t);
	o && o.vmCount++;
}
function hr(e, t) {
	Ge();
	try {
		return e.call(t, t);
	} catch (e) {
		return Jn(e, t, "data()"), {};
	} finally {
		Ke();
	}
}
var gr = { lazy: !0 };
function _r(e, t) {
	let n = e._computedWatchers = Object.create(null), r = R();
	for (let i in t) {
		let a = t[i], o = g(a) ? a : a.get;
		o ?? Y(`Getter is missing for computed property "${i}".`, e), r || (n[i] = new lr(e, o || N, N, gr)), i in e ? i in e.$data ? Y(`The computed property "${i}" is already defined in data.`, e) : e.$options.props && i in e.$options.props ? Y(`The computed property "${i}" is already defined as a prop.`, e) : e.$options.methods && i in e.$options.methods && Y(`The computed property "${i}" is already defined as a method.`, e) : vr(e, i, a);
	}
}
function vr(e, t, n) {
	let r = !R();
	g(n) ? (ur.get = r ? yr(t) : br(n), ur.set = N) : (ur.get = n.get ? r && n.cache !== !1 ? yr(t) : br(n.get) : N, ur.set = n.set || N), ur.set === N && (ur.set = function() {
		Y(`Computed property "${t}" was assigned to but it has no setter.`, this);
	}), Object.defineProperty(e, t, ur);
}
function yr(e) {
	return function() {
		let t = this._computedWatchers && this._computedWatchers[e];
		if (t) return t.dirty && t.evaluate(), Ue.target && (Ue.target.onTrack && Ue.target.onTrack({
			effect: Ue.target,
			target: this,
			type: "get",
			key: e
		}), t.depend()), t.value;
	};
}
function br(e) {
	return function() {
		return e.call(this, this);
	};
}
function xr(e, t) {
	let n = e.$options.props;
	for (let r in t) typeof t[r] != "function" && Y(`Method "${r}" has type "${typeof t[r]}" in the component definition. Did you reference the function correctly?`, e), n && E(n, r) && Y(`Method "${r}" has already been defined as a prop.`, e), r in e && Se(r) && Y(`Method "${r}" conflicts with an existing Vue instance method. Avoid defining component methods that start with _ or $.`), e[r] = typeof t[r] == "function" ? le(t[r], e) : N;
}
function Sr(e, t) {
	for (let n in t) {
		let r = t[n];
		if (u(r)) for (let t = 0; t < r.length; t++) Cr(e, n, r[t]);
		else Cr(e, n, r);
	}
}
function Cr(e, t, n, r) {
	return b(n) && (r = n, n = n.handler), typeof n == "string" && (n = e[n]), e.$watch(t, n, r);
}
function wr(e) {
	let t = {};
	t.get = function() {
		return this._data;
	};
	let n = {};
	n.get = function() {
		return this._props;
	}, t.set = function() {
		Y("Avoid replacing instance root $data. Use nested data properties instead.", this);
	}, n.set = function() {
		Y("$props is readonly.", this);
	}, Object.defineProperty(e.prototype, "$data", t), Object.defineProperty(e.prototype, "$props", n), e.prototype.$set = et, e.prototype.$delete = tt, e.prototype.$watch = function(e, t, n) {
		let r = this;
		if (b(t)) return Cr(r, e, t, n);
		n ||= {}, n.user = !0;
		let i = new lr(r, e, t, n);
		if (n.immediate) {
			let e = `callback for immediate watcher "${i.expression}"`;
			Ge(), Yn(t, r, [i.value], r, e), Ke();
		}
		return function() {
			i.teardown();
		};
	};
}
function Tr(e) {
	let t = e.$options.provide;
	if (t) {
		let n = g(t) ? t.call(e) : t;
		if (!_(n)) return;
		let r = qn(e), i = Le ? Reflect.ownKeys(n) : Object.keys(n);
		for (let e = 0; e < i.length; e++) {
			let t = i[e];
			Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(n, t));
		}
	}
}
function Er(e) {
	let t = Dr(e.$options.inject, e);
	t && (Ye(!1), Object.keys(t).forEach((n) => {
		$e(e, n, t[n], () => {
			Y(`Avoid mutating an injected value directly since the changes will be overwritten whenever the provided component re-renders. injection being mutated: "${n}"`, e);
		});
	}), Ye(!0));
}
function Dr(e, t) {
	if (e) {
		let n = Object.create(null), r = Le ? Reflect.ownKeys(e) : Object.keys(e);
		for (let i = 0; i < r.length; i++) {
			let a = r[i];
			if (a === "__ob__") continue;
			let o = e[a].from;
			if (o in t._provided) n[a] = t._provided[o];
			else if ("default" in e[a]) {
				let r = e[a].default;
				n[a] = g(r) ? r.call(t) : r;
			} else Y(`Injection "${a}" not found`, t);
		}
		return n;
	}
}
var Or = 0;
function kr(e) {
	e.prototype._init = function(e) {
		let t = this;
		t._uid = Or++;
		let n, r;
		F.performance && J && (n = `vue-perf-start:${t._uid}`, r = `vue-perf-end:${t._uid}`, J(n)), t._isVue = !0, t.__v_skip = !0, t._scope = new hn(!0), t._scope.parent = void 0, t._scope._vm = !0, e && e._isComponent ? Ar(t, e) : t.$options = si(jr(t.constructor), e || {}, t), Ve(t), t._self = t, xn(t), sn(t), $t(t), On(t, "beforeCreate", void 0, !1), Er(t), fr(t), Tr(t), On(t, "created"), F.performance && J && (t._name = qr(t, !1), J(r), lt(`vue ${t._name} init`, n, r)), t.$options.el && t.$mount(t.$options.el);
	};
}
function Ar(e, t) {
	let n = e.$options = Object.create(e.constructor.options), r = t._parentVnode;
	n.parent = t.parent, n._parentVnode = r;
	let i = r.componentOptions;
	n.propsData = i.propsData, n._parentListeners = i.listeners, n._renderChildren = i.children, n._componentTag = i.tag, t.render && (n.render = t.render, n.staticRenderFns = t.staticRenderFns);
}
function jr(e) {
	let t = e.options;
	if (e.super) {
		let n = jr(e.super);
		if (n !== e.superOptions) {
			e.superOptions = n;
			let r = Mr(e);
			r && M(e.extendOptions, r), t = e.options = si(n, e.extendOptions), t.name && (t.components[t.name] = e);
		}
	}
	return t;
}
function Mr(e) {
	let t, n = e.options, r = e.sealedOptions;
	for (let e in n) n[e] !== r[e] && (t ||= {}, t[e] = n[e]);
	return t;
}
function Nr(e, t, n, r, i) {
	let a = i.options, o;
	E(r, "_uid") ? (o = Object.create(r), o._original = r) : (o = r, r = r._original);
	let s = p(a._compiled), c = !s;
	this.data = e, this.props = t, this.children = n, this.parent = r, this.listeners = e.on || l, this.injections = Dr(a.inject, r), this.slots = () => (this.$slots || Wt(r, e.scopedSlots, this.$slots = Vt(n, r)), this.$slots), Object.defineProperty(this, "scopedSlots", {
		enumerable: !0,
		get() {
			return Wt(r, e.scopedSlots, this.slots());
		}
	}), s && (this.$options = a, this.$slots = this.slots(), this.$scopedSlots = Wt(r, e.scopedSlots, this.$slots)), this._c = a._scopeId ? (e, t, n, i) => {
		let s = St(o, e, t, n, i, c);
		return s && !u(s) && (s.fnScopeId = a._scopeId, s.fnContext = r), s;
	} : (e, t, n, r) => St(o, e, t, n, r, c);
}
Bt(Nr.prototype);
function Pr(e, t, n, r, i) {
	let a = e.options, o = {}, s = a.props;
	if (f(s)) for (let e in s) o[e] = li(e, s, t || l);
	else f(n.attrs) && Ir(o, n.attrs), f(n.props) && Ir(o, n.props);
	let c = new Nr(n, o, i, r, e), d = a.render.call(null, c._c, c);
	if (d instanceof V) return Fr(d, n, c.parent, a, c);
	if (u(d)) {
		let e = _t(d) || [], t = Array(e.length);
		for (let r = 0; r < e.length; r++) t[r] = Fr(e[r], n, c.parent, a, c);
		return t;
	}
}
function Fr(e, t, n, r, i) {
	let a = Be(e);
	return a.fnContext = n, a.fnOptions = r, (a.devtoolsMeta = a.devtoolsMeta || {}).renderContext = i, t.slot && ((a.data ||= {}).slot = t.slot), a;
}
function Ir(e, t) {
	for (let n in t) e[k(n)] = t[n];
}
function Lr(e) {
	return e.name || e.__name || e._componentTag;
}
var Rr = {
	init(e, t) {
		if (e.componentInstance && !e.componentInstance._isDestroyed && e.data.keepAlive) {
			let t = e;
			Rr.prepatch(t, t);
		} else (e.componentInstance = Vr(e, vn)).$mount(t ? e.elm : void 0, t);
	},
	prepatch(e, t) {
		let n = t.componentOptions;
		wn(t.componentInstance = e.componentInstance, n.propsData, n.listeners, t, n.children);
	},
	insert(e) {
		let { context: t, componentInstance: n } = e;
		n._isMounted || (n._isMounted = !0, On(n, "mounted")), e.data.keepAlive && (t._isMounted ? Un(n) : En(n, !0));
	},
	destroy(e) {
		let { componentInstance: t } = e;
		t._isDestroyed || (e.data.keepAlive ? Dn(t, !0) : t.$destroy());
	}
}, zr = Object.keys(Rr);
function Br(e, t, n, r, i) {
	if (d(e)) return;
	let a = n.$options._base;
	if (_(e) && (e = a.extend(e)), typeof e != "function") {
		Y(`Invalid Component definition: ${String(e)}`, n);
		return;
	}
	let o;
	if (d(e.cid) && (o = e, e = an(o, a), e === void 0)) return rn(o, t, n, r, i);
	t ||= {}, jr(e), f(t.model) && Wr(e.options, t);
	let s = mt(t, e, i);
	if (p(e.options.functional)) return Pr(e, s, t, n, r);
	let c = t.on;
	if (t.on = t.nativeOn, p(e.options.abstract)) {
		let e = t.slot;
		t = {}, e && (t.slot = e);
	}
	Hr(t);
	let l = Lr(e.options) || i;
	return new V(`vue-component-${e.cid}${l ? `-${l}` : ""}`, t, void 0, void 0, void 0, n, {
		Ctor: e,
		propsData: s,
		listeners: c,
		tag: i,
		children: r
	}, o);
}
function Vr(e, t) {
	let n = {
		_isComponent: !0,
		_parentVnode: e,
		parent: t
	}, r = e.data.inlineTemplate;
	return f(r) && (n.render = r.render, n.staticRenderFns = r.staticRenderFns), new e.componentOptions.Ctor(n);
}
function Hr(e) {
	let t = e.hook ||= {};
	for (let e = 0; e < zr.length; e++) {
		let n = zr[e], r = t[n], i = Rr[n];
		r !== i && !(r && r._merged) && (t[n] = r ? Ur(i, r) : i);
	}
}
function Ur(e, t) {
	let n = (n, r) => {
		e(n, r), t(n, r);
	};
	return n._merged = !0, n;
}
function Wr(e, t) {
	let n = e.model && e.model.prop || "value", r = e.model && e.model.event || "input";
	(t.attrs ||= {})[n] = t.model.value;
	let i = t.on ||= {}, a = i[r], o = t.model.callback;
	f(a) ? (u(a) ? a.indexOf(o) === -1 : a !== o) && (i[r] = [o].concat(a)) : i[r] = o;
}
var Y = N, Gr = N, Kr, qr;
{
	let e = typeof console < "u", t = /(?:^|[-_])(\w)/g, n = (e) => e.replace(t, (e) => e.toUpperCase()).replace(/[-_]/g, "");
	Y = (t, n = z) => {
		let r = n ? Kr(n) : "";
		F.warnHandler ? F.warnHandler.call(null, t, n, r) : e && !F.silent && console.error(`[Vue warn]: ${t}${r}`);
	}, Gr = (t, n) => {
		e && !F.silent && console.warn(`[Vue tip]: ${t}` + (n ? Kr(n) : ""));
	}, qr = (e, t) => {
		if (e.$root === e) return "<Root>";
		let r = g(e) && e.cid != null ? e.options : e._isVue ? e.$options || e.constructor.options : e, i = Lr(r), a = r.__file;
		if (!i && a) {
			let e = a.match(/([^/\\]+)\.vue$/);
			i = e && e[1];
		}
		return (i ? `<${n(i)}>` : "<Anonymous>") + (a && t !== !1 ? ` at ${a}` : "");
	};
	let r = (e, t) => {
		let n = "";
		for (; t;) t % 2 == 1 && (n += e), t > 1 && (e += e), t >>= 1;
		return n;
	};
	Kr = (e) => {
		if (e._isVue && e.$parent) {
			let t = [], n = 0;
			for (; e;) {
				if (t.length > 0) {
					let r = t[t.length - 1];
					if (r.constructor === e.constructor) {
						n++, e = e.$parent;
						continue;
					}
					n > 0 && (t[t.length - 1] = [r, n], n = 0);
				}
				t.push(e), e = e.$parent;
			}
			return "\n\nfound in\n\n" + t.map((e, t) => `${t === 0 ? "---> " : r(" ", 5 + t * 2)}${u(e) ? `${qr(e[0])}... (${e[1]} recursive calls)` : qr(e)}`).join("\n");
		}
		return `\n\n(found in ${qr(e)})`;
	};
}
var Jr = F.optionMergeStrategies;
Jr.el = Jr.propsData = function(e, t, n, r) {
	return n || Y(`option "${r}" can only be used during instance creation with the \`new\` keyword.`), ei(e, t);
};
function Yr(e, t, n = !0) {
	if (!t) return e;
	let r, i, a, o = Le ? Reflect.ownKeys(t) : Object.keys(t);
	for (let s = 0; s < o.length; s++) r = o[s], r !== "__ob__" && (i = e[r], a = t[r], !n || !E(e, r) ? et(e, r, a) : i !== a && b(i) && b(a) && Yr(i, a));
	return e;
}
function Xr(e, t, n) {
	return n ? function() {
		let r = g(t) ? t.call(n, n) : t, i = g(e) ? e.call(n, n) : e;
		return r ? Yr(r, i) : i;
	} : t ? e ? function() {
		return Yr(g(t) ? t.call(this, this) : t, g(e) ? e.call(this, this) : e);
	} : t : e;
}
Jr.data = function(e, t, n) {
	return n ? Xr(e, t, n) : t && typeof t != "function" ? (Y("The \"data\" option should be a function that returns a per-instance value in component definitions.", n), e) : Xr(e, t);
};
function Zr(e, t) {
	let n = t ? e ? e.concat(t) : u(t) ? t : [t] : e;
	return n && Qr(n);
}
function Qr(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.indexOf(e[n]) === -1 && t.push(e[n]);
	return t;
}
be.forEach((e) => {
	Jr[e] = Zr;
});
function $r(e, t, n, r) {
	let i = Object.create(e || null);
	return t ? (oi(r, t, n), M(i, t)) : i;
}
ye.forEach(function(e) {
	Jr[e + "s"] = $r;
}), Jr.watch = function(e, t, n, r) {
	/* istanbul ignore if */
	if (e === Me && (e = void 0), t === Me && (t = void 0), !t) return Object.create(e || null);
	if (oi(r, t, n), !e) return t;
	let i = {};
	M(i, e);
	for (let e in t) {
		let n = i[e], r = t[e];
		n && !u(n) && (n = [n]), i[e] = n ? n.concat(r) : u(r) ? r : [r];
	}
	return i;
}, Jr.props = Jr.methods = Jr.inject = Jr.computed = function(e, t, n, r) {
	if (t && oi(r, t, n), !e) return t;
	let i = Object.create(null);
	return M(i, e), t && M(i, t), i;
}, Jr.provide = function(e, t) {
	return e ? function() {
		let n = Object.create(null);
		return Yr(n, g(e) ? e.call(this) : e), t && Yr(n, g(t) ? t.call(this) : t, !1), n;
	} : t;
};
var ei = function(e, t) {
	return t === void 0 ? e : t;
};
function ti(e) {
	for (let t in e.components) ni(t);
}
function ni(e) {
	RegExp(`^[a-zA-Z][\\-\\.0-9_${xe.source}]*$`).test(e) || Y("Invalid component name: \"" + e + "\". Component names should conform to valid custom element name in html5 specification."), (C(e) || F.isReservedTag(e)) && Y("Do not use built-in or reserved HTML elements as component id: " + e);
}
function ri(e, t) {
	let n = e.props;
	if (!n) return;
	let r = {}, i, a, o;
	if (u(n)) for (i = n.length; i--;) a = n[i], typeof a == "string" ? (o = k(a), r[o] = { type: null }) : Y("props must be strings when using array syntax.");
	else if (b(n)) for (let e in n) a = n[e], o = k(e), r[o] = b(a) ? a : { type: a };
	else Y(`Invalid value for option "props": expected an Array or an Object, but got ${y(n)}.`, t);
	e.props = r;
}
function ii(e, t) {
	let n = e.inject;
	if (!n) return;
	let r = e.inject = {};
	if (u(n)) for (let e = 0; e < n.length; e++) r[n[e]] = { from: n[e] };
	else if (b(n)) for (let e in n) {
		let t = n[e];
		r[e] = b(t) ? M({ from: e }, t) : { from: t };
	}
	else Y(`Invalid value for option "inject": expected an Array or an Object, but got ${y(n)}.`, t);
}
function ai(e) {
	let t = e.directives;
	if (t) for (let e in t) {
		let n = t[e];
		g(n) && (t[e] = {
			bind: n,
			update: n
		});
	}
}
function oi(e, t, n) {
	b(t) || Y(`Invalid value for option "${e}": expected an Object, but got ${y(t)}.`, n);
}
function si(e, t, n) {
	if (ti(t), g(t) && (t = t.options), ri(t, n), ii(t, n), ai(t), !t._base && (t.extends && (e = si(e, t.extends, n)), t.mixins)) for (let r = 0, i = t.mixins.length; r < i; r++) e = si(e, t.mixins[r], n);
	let r = {}, i;
	for (i in e) a(i);
	for (i in t) E(e, i) || a(i);
	function a(i) {
		let a = Jr[i] || ei;
		r[i] = a(e[i], t[i], n, i);
	}
	return r;
}
function ci(e, t, n, r) {
	/* istanbul ignore if */
	if (typeof n != "string") return;
	let i = e[t];
	if (E(i, n)) return i[n];
	let a = k(n);
	if (E(i, a)) return i[a];
	let o = A(a);
	if (E(i, o)) return i[o];
	let s = i[n] || i[a] || i[o];
	return r && !s && Y("Failed to resolve " + t.slice(0, -1) + ": " + n), s;
}
function li(e, t, n, r) {
	let i = t[e], a = !E(n, e), o = n[e], s = _i(Boolean, i.type);
	if (s > -1) {
		if (a && !E(i, "default")) o = !1;
		else if (o === "" || o === j(e)) {
			let e = _i(String, i.type);
			(e < 0 || s < e) && (o = !0);
		}
	}
	if (o === void 0) {
		o = ui(r, i, e);
		let t = Je;
		Ye(!0), Qe(o), Ye(t);
	}
	return di(i, e, o, r, a), o;
}
function ui(e, t, n) {
	if (!E(t, "default")) return;
	let r = t.default;
	return _(r) && Y("Invalid default value for prop \"" + n + "\": Props with type Object/Array must use a factory function to return the default value.", e), e && e.$options.propsData && e.$options.propsData[n] === void 0 && e._props[n] !== void 0 ? e._props[n] : g(r) && hi(t.type) !== "Function" ? r.call(e) : r;
}
function di(e, t, n, r, i) {
	if (e.required && i) {
		Y("Missing required prop: \"" + t + "\"", r);
		return;
	}
	if (n == null && !e.required) return;
	let a = e.type, o = !a || a === !0, s = [];
	if (a) {
		u(a) || (a = [a]);
		for (let e = 0; e < a.length && !o; e++) {
			let t = pi(n, a[e], r);
			s.push(t.expectedType || ""), o = t.valid;
		}
	}
	let c = s.some((e) => e);
	if (!o && c) {
		Y(vi(t, n, s), r);
		return;
	}
	let l = e.validator;
	l && (l(n) || Y("Invalid prop: custom validator check failed for prop \"" + t + "\".", r));
}
var fi = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
function pi(e, t, n) {
	let r, i = hi(t);
	if (fi.test(i)) {
		let n = typeof e;
		r = n === i.toLowerCase(), !r && n === "object" && (r = e instanceof t);
	} else if (i === "Object") r = b(e);
	else if (i === "Array") r = u(e);
	else try {
		r = e instanceof t;
	} catch {
		Y("Invalid prop type: \"" + String(t) + "\" is not a constructor", n), r = !1;
	}
	return {
		valid: r,
		expectedType: i
	};
}
var mi = /^\s*function (\w+)/;
function hi(e) {
	let t = e && e.toString().match(mi);
	return t ? t[1] : "";
}
function gi(e, t) {
	return hi(e) === hi(t);
}
function _i(e, t) {
	if (!u(t)) return gi(t, e) ? 0 : -1;
	for (let n = 0, r = t.length; n < r; n++) if (gi(t[n], e)) return n;
	return -1;
}
function vi(e, t, n) {
	let r = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(A).join(", ")}`, i = n[0], a = y(t);
	return n.length === 1 && xi(i) && xi(typeof t) && !Si(i, a) && (r += ` with value ${yi(t, i)}`), r += `, got ${a} `, xi(a) && (r += `with value ${yi(t, a)}.`), r;
}
function yi(e, t) {
	return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
var bi = [
	"string",
	"number",
	"boolean"
];
function xi(e) {
	return bi.some((t) => e.toLowerCase() === t);
}
function Si(...e) {
	return e.some((e) => e.toLowerCase() === "boolean");
}
function X(e) {
	this instanceof X || Y("Vue is a constructor and should be called with the `new` keyword"), this._init(e);
}
kr(X), wr(X), pn(X), Sn(X), tn(X);
function Ci(e) {
	e.use = function(e) {
		let t = this._installedPlugins ||= [];
		if (t.indexOf(e) > -1) return this;
		let n = ue(arguments, 1);
		return n.unshift(this), g(e.install) ? e.install.apply(e, n) : g(e) && e.apply(null, n), t.push(e), this;
	};
}
function wi(e) {
	e.mixin = function(e) {
		return this.options = si(this.options, e), this;
	};
}
function Ti(e) {
	e.cid = 0;
	let t = 1;
	e.extend = function(e) {
		e ||= {};
		let n = this, r = n.cid, i = e._Ctor || (e._Ctor = {});
		if (i[r]) return i[r];
		let a = Lr(e) || Lr(n.options);
		a && ni(a);
		let o = function(e) {
			this._init(e);
		};
		return o.prototype = Object.create(n.prototype), o.prototype.constructor = o, o.cid = t++, o.options = si(n.options, e), o.super = n, o.options.props && Ei(o), o.options.computed && Di(o), o.extend = n.extend, o.mixin = n.mixin, o.use = n.use, ye.forEach(function(e) {
			o[e] = n[e];
		}), a && (o.options.components[a] = o), o.superOptions = n.options, o.extendOptions = e, o.sealedOptions = M({}, o.options), i[r] = o, o;
	};
}
function Ei(e) {
	let t = e.options.props;
	for (let n in t) dr(e.prototype, "_props", n);
}
function Di(e) {
	let t = e.options.computed;
	for (let n in t) vr(e.prototype, n, t[n]);
}
function Oi(e) {
	ye.forEach((t) => {
		e[t] = function(e, n) {
			return n ? 
			/* istanbul ignore if */
			(t === "component" && ni(e), t === "component" && b(n) && (n.name = n.name || e, n = this.options._base.extend(n)), t === "directive" && g(n) && (n = {
				bind: n,
				update: n
			}), this.options[t + "s"][e] = n, n) : this.options[t + "s"][e];
		};
	});
}
function ki(e) {
	return e && (Lr(e.Ctor.options) || e.tag);
}
function Ai(e, t) {
	/* istanbul ignore next */
	return u(e) ? e.indexOf(t) > -1 : typeof e == "string" ? e.split(",").indexOf(t) > -1 : x(e) ? e.test(t) : !1;
}
function ji(e, t) {
	let { cache: n, keys: r, _vnode: i, $vnode: a } = e;
	for (let e in n) {
		let a = n[e];
		if (a) {
			let o = a.name;
			o && !t(o) && Mi(n, e, r, i);
		}
	}
	a.componentOptions.children = void 0;
}
function Mi(e, t, n, r) {
	let i = e[t];
	i && (!r || i.tag !== r.tag) && i.componentInstance.$destroy(), e[t] = null, T(n, t);
}
var Ni = [
	String,
	RegExp,
	Array
], Pi = { KeepAlive: {
	name: "keep-alive",
	abstract: !0,
	props: {
		include: Ni,
		exclude: Ni,
		max: [String, Number]
	},
	methods: { cacheVNode() {
		let { cache: e, keys: t, vnodeToCache: n, keyToCache: r } = this;
		if (n) {
			let { tag: i, componentInstance: a, componentOptions: o } = n;
			e[r] = {
				name: ki(o),
				tag: i,
				componentInstance: a
			}, t.push(r), this.max && t.length > parseInt(this.max) && Mi(e, t[0], t, this._vnode), this.vnodeToCache = null;
		}
	} },
	created() {
		this.cache = Object.create(null), this.keys = [];
	},
	destroyed() {
		for (let e in this.cache) Mi(this.cache, e, this.keys);
	},
	mounted() {
		this.cacheVNode(), this.$watch("include", (e) => {
			ji(this, (t) => Ai(e, t));
		}), this.$watch("exclude", (e) => {
			ji(this, (t) => !Ai(e, t));
		});
	},
	updated() {
		this.cacheVNode();
	},
	render() {
		let e = this.$slots.default, t = on(e), n = t && t.componentOptions;
		if (n) {
			let e = ki(n), { include: r, exclude: i } = this;
			if (r && (!e || !Ai(r, e)) || i && e && Ai(i, e)) return t;
			let { cache: a, keys: o } = this, s = t.key == null ? n.Ctor.cid + (n.tag ? `::${n.tag}` : "") : t.key;
			a[s] ? (t.componentInstance = a[s].componentInstance, T(o, s), o.push(s)) : (this.vnodeToCache = t, this.keyToCache = s), t.data.keepAlive = !0;
		}
		return t || e && e[0];
	}
} };
function Fi(e) {
	let t = {};
	t.get = () => F, t.set = () => {
		Y("Do not replace the Vue.config object, set individual fields instead.");
	}, Object.defineProperty(e, "config", t), e.util = {
		warn: Y,
		extend: M,
		mergeOptions: si,
		defineReactive: $e
	}, e.set = et, e.delete = tt, e.nextTick = rr, e.observable = (e) => (Qe(e), e), e.options = Object.create(null), ye.forEach((t) => {
		e.options[t + "s"] = Object.create(null);
	}), e.options._base = e, M(e.options.components, Pi), Ci(e), wi(e), Ti(e), Oi(e);
}
Fi(X), Object.defineProperty(X.prototype, "$isServer", { get: R }), Object.defineProperty(X.prototype, "$ssrContext", { get() {
	/* istanbul ignore next */
	return this.$vnode && this.$vnode.ssrContext;
} }), Object.defineProperty(X, "FunctionalRenderContext", { value: Nr }), X.version = ir;
var Ii = S("style,class"), Li = S("input,textarea,option,select,progress"), Ri = (e, t, n) => n === "value" && Li(e) && t !== "button" || n === "selected" && e === "option" || n === "checked" && e === "input" || n === "muted" && e === "video", zi = S("contenteditable,draggable,spellcheck"), Bi = S("events,caret,typing,plaintext-only"), Vi = (e, t) => Ki(t) || t === "false" ? "false" : e === "contenteditable" && Bi(t) ? t : "true", Hi = S("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"), Ui = "http://www.w3.org/1999/xlink", Wi = (e) => e.charAt(5) === ":" && e.slice(0, 5) === "xlink", Gi = (e) => Wi(e) ? e.slice(6, e.length) : "", Ki = (e) => e == null || e === !1;
function qi(e) {
	let t = e.data, n = e, r = e;
	for (; f(r.componentInstance);) r = r.componentInstance._vnode, r && r.data && (t = Ji(r.data, t));
	for (; f(n = n.parent);) n && n.data && (t = Ji(t, n.data));
	return Yi(t.staticClass, t.class);
}
function Ji(e, t) {
	return {
		staticClass: Xi(e.staticClass, t.staticClass),
		class: f(e.class) ? [e.class, t.class] : t.class
	};
}
function Yi(e, t) {
	/* istanbul ignore next */
	return f(e) || f(t) ? Xi(e, Zi(t)) : "";
}
function Xi(e, t) {
	return e ? t ? e + " " + t : e : t || "";
}
function Zi(e) {
	/* istanbul ignore next */
	return Array.isArray(e) ? Qi(e) : _(e) ? $i(e) : typeof e == "string" ? e : "";
}
function Qi(e) {
	let t = "", n;
	for (let r = 0, i = e.length; r < i; r++) f(n = Zi(e[r])) && n !== "" && (t && (t += " "), t += n);
	return t;
}
function $i(e) {
	let t = "";
	for (let n in e) e[n] && (t && (t += " "), t += n);
	return t;
}
var ea = {
	svg: "http://www.w3.org/2000/svg",
	math: "http://www.w3.org/1998/Math/MathML"
}, ta = S("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"), na = S("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0), ra = (e) => e === "pre", ia = (e) => ta(e) || na(e);
function aa(e) {
	if (na(e)) return "svg";
	if (e === "math") return "math";
}
var oa = Object.create(null);
function sa(e) {
	/* istanbul ignore if */
	if (!I) return !0;
	if (ia(e)) return !1;
	/* istanbul ignore if */
	if (e = e.toLowerCase(), oa[e] != null) return oa[e];
	let t = document.createElement(e);
	return e.indexOf("-") > -1 ? oa[e] = t.constructor === window.HTMLUnknownElement || t.constructor === window.HTMLElement : oa[e] = /HTMLUnknownElement/.test(t.toString());
}
var ca = S("text,number,password,search,email,tel,url");
function la(e) {
	return typeof e == "string" ? document.querySelector(e) || (Y("Cannot find element: " + e), document.createElement("div")) : e;
}
function ua(e, t) {
	let n = document.createElement(e);
	return e === "select" && t.data && t.data.attrs && t.data.attrs.multiple !== void 0 && n.setAttribute("multiple", "multiple"), n;
}
function da(e, t) {
	return document.createElementNS(ea[e], t);
}
function fa(e) {
	return document.createTextNode(e);
}
function pa(e) {
	return document.createComment(e);
}
function ma(e, t, n) {
	e.insertBefore(t, n);
}
function ha(e, t) {
	e.removeChild(t);
}
function ga(e, t) {
	e.appendChild(t);
}
function _a(e) {
	return e.parentNode;
}
function va(e) {
	return e.nextSibling;
}
function ya(e) {
	return e.tagName;
}
function ba(e, t) {
	e.textContent = t;
}
function xa(e, t) {
	e.setAttribute(t, "");
}
var Sa = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	createElement: ua,
	createElementNS: da,
	createTextNode: fa,
	createComment: pa,
	insertBefore: ma,
	removeChild: ha,
	appendChild: ga,
	parentNode: _a,
	nextSibling: va,
	tagName: ya,
	setTextContent: ba,
	setStyleScope: xa
}), Ca = {
	create(e, t) {
		wa(t);
	},
	update(e, t) {
		e.data.ref !== t.data.ref && (wa(e, !0), wa(t));
	},
	destroy(e) {
		wa(e, !0);
	}
};
function wa(e, t) {
	let n = e.data.ref;
	if (!f(n)) return;
	let r = e.context, i = e.componentInstance || e.elm, a = t ? null : i, o = t ? void 0 : i;
	if (g(n)) {
		Yn(n, r, [a], r, "template ref function");
		return;
	}
	let s = e.data.refInFor, c = typeof n == "string" || typeof n == "number", l = st(n), d = r.$refs;
	if (c || l) {
		if (s) {
			let e = c ? d[n] : n.value;
			t ? u(e) && T(e, i) : u(e) ? e.includes(i) || e.push(i) : c ? (d[n] = [i], Ta(r, n, d[n])) : n.value = [i];
		} else if (c) {
			if (t && d[n] !== i) return;
			d[n] = o, Ta(r, n, a);
		} else if (l) {
			if (t && n.value !== i) return;
			n.value = a;
		} else Y(`Invalid template ref type: ${typeof n}`);
	}
}
function Ta({ _setupState: e }, t, n) {
	e && E(e, t) && (st(e[t]) ? e[t].value = n : e[t] = n);
}
var Ea = new V("", {}, []), Da = [
	"create",
	"activate",
	"update",
	"remove",
	"destroy"
];
function Oa(e, t) {
	return e.key === t.key && e.asyncFactory === t.asyncFactory && (e.tag === t.tag && e.isComment === t.isComment && f(e.data) === f(t.data) && ka(e, t) || p(e.isAsyncPlaceholder) && d(t.asyncFactory.error));
}
function ka(e, t) {
	if (e.tag !== "input") return !0;
	let n, r = f(n = e.data) && f(n = n.attrs) && n.type, i = f(n = t.data) && f(n = n.attrs) && n.type;
	return r === i || ca(r) && ca(i);
}
function Aa(e, t, n) {
	let r, i, a = {};
	for (r = t; r <= n; ++r) i = e[r].key, f(i) && (a[i] = r);
	return a;
}
function ja(e) {
	let t, n, r = {}, { modules: i, nodeOps: a } = e;
	for (t = 0; t < Da.length; ++t) for (r[Da[t]] = [], n = 0; n < i.length; ++n) f(i[n][Da[t]]) && r[Da[t]].push(i[n][Da[t]]);
	function o(e) {
		return new V(a.tagName(e).toLowerCase(), {}, [], void 0, e);
	}
	function s(e, t) {
		function n() {
			--n.listeners === 0 && c(e);
		}
		return n.listeners = t, n;
	}
	function c(e) {
		let t = a.parentNode(e);
		f(t) && a.removeChild(t, e);
	}
	function l(e, t) {
		return !t && !e.ns && !(F.ignoredElements.length && F.ignoredElements.some((t) => x(t) ? t.test(e.tag) : t === e.tag)) && F.isUnknownElement(e.tag);
	}
	let m = 0;
	function g(e, t, n, r, i, o, s) {
		if (f(e.elm) && f(o) && (e = o[s] = Be(e)), e.isRootInsert = !i, _(e, t, n, r)) return;
		let c = e.data, u = e.children, d = e.tag;
		f(d) ? (c && c.pre && m++, l(e, m) && Y("Unknown custom element: <" + d + "> - did you register the component correctly? For recursive components, make sure to provide the \"name\" option.", e.context), e.elm = e.ns ? a.createElementNS(e.ns, d) : a.createElement(d, e), re(e), ee(e, u, t), f(c) && ne(e, t), b(n, e.elm, r), c && c.pre && m--) : p(e.isComment) ? (e.elm = a.createComment(e.text), b(n, e.elm, r)) : (e.elm = a.createTextNode(e.text), b(n, e.elm, r));
	}
	function _(e, t, n, r) {
		let i = e.data;
		if (f(i)) {
			let a = f(e.componentInstance) && i.keepAlive;
			if (f(i = i.hook) && f(i = i.init) && i(e, !1), f(e.componentInstance)) return v(e, t), b(n, e.elm, r), p(a) && y(e, t, n, r), !0;
		}
	}
	function v(e, t) {
		f(e.data.pendingInsert) && (t.push.apply(t, e.data.pendingInsert), e.data.pendingInsert = null), e.elm = e.componentInstance.$el, te(e) ? (ne(e, t), re(e)) : (wa(e), t.push(e));
	}
	function y(e, t, n, i) {
		let a, o = e;
		for (; o.componentInstance;) if (o = o.componentInstance._vnode, f(a = o.data) && f(a = a.transition)) {
			for (a = 0; a < r.activate.length; ++a) r.activate[a](Ea, o);
			t.push(o);
			break;
		}
		b(n, e.elm, i);
	}
	function b(e, t, n) {
		f(e) && (f(n) ? a.parentNode(n) === e && a.insertBefore(e, t, n) : a.appendChild(e, t));
	}
	function ee(e, t, n) {
		if (u(t)) {
			E(t);
			for (let r = 0; r < t.length; ++r) g(t[r], n, e.elm, null, !0, t, r);
		} else h(e.text) && a.appendChild(e.elm, a.createTextNode(String(e.text)));
	}
	function te(e) {
		for (; e.componentInstance;) e = e.componentInstance._vnode;
		return f(e.tag);
	}
	function ne(e, n) {
		for (let t = 0; t < r.create.length; ++t) r.create[t](Ea, e);
		t = e.data.hook, f(t) && (f(t.create) && t.create(Ea, e), f(t.insert) && n.push(e));
	}
	function re(e) {
		let t;
		if (f(t = e.fnScopeId)) a.setStyleScope(e.elm, t);
		else {
			let n = e;
			for (; n;) f(t = n.context) && f(t = t.$options._scopeId) && a.setStyleScope(e.elm, t), n = n.parent;
		}
		f(t = vn) && t !== e.context && t !== e.fnContext && f(t = t.$options._scopeId) && a.setStyleScope(e.elm, t);
	}
	function ie(e, t, n, r, i, a) {
		for (; r <= i; ++r) g(n[r], a, e, t, !1, n, r);
	}
	function C(e) {
		let t, n, i = e.data;
		if (f(i)) for (f(t = i.hook) && f(t = t.destroy) && t(e), t = 0; t < r.destroy.length; ++t) r.destroy[t](e);
		if (f(t = e.children)) for (n = 0; n < e.children.length; ++n) C(e.children[n]);
	}
	function w(e, t, n) {
		for (; t <= n; ++t) {
			let n = e[t];
			f(n) && (f(n.tag) ? (T(n), C(n)) : c(n.elm));
		}
	}
	function T(e, t) {
		if (f(t) || f(e.data)) {
			let n, i = r.remove.length + 1;
			for (f(t) ? t.listeners += i : t = s(e.elm, i), f(n = e.componentInstance) && f(n = n._vnode) && f(n.data) && T(n, t), n = 0; n < r.remove.length; ++n) r.remove[n](e, t);
			f(n = e.data.hook) && f(n = n.remove) ? n(e, t) : t();
		} else c(e.elm);
	}
	function ae(e, t, n, r, i) {
		let o = 0, s = 0, c = t.length - 1, l = t[0], u = t[c], p = n.length - 1, m = n[0], h = n[p], _, v, y, b, x = !i;
		for (E(n); o <= c && s <= p;) d(l) ? l = t[++o] : d(u) ? u = t[--c] : Oa(l, m) ? (O(l, m, r, n, s), l = t[++o], m = n[++s]) : Oa(u, h) ? (O(u, h, r, n, p), u = t[--c], h = n[--p]) : Oa(l, h) ? (O(l, h, r, n, p), x && a.insertBefore(e, l.elm, a.nextSibling(u.elm)), l = t[++o], h = n[--p]) : Oa(u, m) ? (O(u, m, r, n, s), x && a.insertBefore(e, u.elm, l.elm), u = t[--c], m = n[++s]) : (d(_) && (_ = Aa(t, o, c)), v = f(m.key) ? _[m.key] : D(m, t, o, c), d(v) ? g(m, r, e, l.elm, !1, n, s) : (y = t[v], Oa(y, m) ? (O(y, m, r, n, s), t[v] = void 0, x && a.insertBefore(e, y.elm, l.elm)) : g(m, r, e, l.elm, !1, n, s)), m = n[++s]);
		o > c ? (b = d(n[p + 1]) ? null : n[p + 1].elm, ie(e, b, n, s, p, r)) : s > p && w(t, o, c);
	}
	function E(e) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.key;
			f(i) && (t[i] ? Y(`Duplicate keys detected: '${i}'. This may cause an update error.`, r.context) : t[i] = !0);
		}
	}
	function D(e, t, n, r) {
		for (let i = n; i < r; i++) {
			let n = t[i];
			if (f(n) && Oa(e, n)) return i;
		}
	}
	function O(e, t, n, i, o, s) {
		if (e === t) return;
		f(t.elm) && f(i) && (t = i[o] = Be(t));
		let c = t.elm = e.elm;
		if (p(e.isAsyncPlaceholder)) {
			f(t.asyncFactory.resolved) ? j(e.elm, t, n) : t.isAsyncPlaceholder = !0;
			return;
		}
		if (p(t.isStatic) && p(e.isStatic) && t.key === e.key && (p(t.isCloned) || p(t.isOnce))) {
			t.componentInstance = e.componentInstance;
			return;
		}
		let l, u = t.data;
		f(u) && f(l = u.hook) && f(l = l.prepatch) && l(e, t);
		let m = e.children, h = t.children;
		if (f(u) && te(t)) {
			for (l = 0; l < r.update.length; ++l) r.update[l](e, t);
			f(l = u.hook) && f(l = l.update) && l(e, t);
		}
		d(t.text) ? f(m) && f(h) ? m !== h && ae(c, m, h, n, s) : f(h) ? (E(h), f(e.text) && a.setTextContent(c, ""), ie(c, null, h, 0, h.length - 1, n)) : f(m) ? w(m, 0, m.length - 1) : f(e.text) && a.setTextContent(c, "") : e.text !== t.text && a.setTextContent(c, t.text), f(u) && f(l = u.hook) && f(l = l.postpatch) && l(e, t);
	}
	function k(e, t, n) {
		if (p(n) && f(e.parent)) e.parent.data.pendingInsert = t;
		else for (let e = 0; e < t.length; ++e) t[e].data.hook.insert(t[e]);
	}
	let A = !1, oe = S("attrs,class,staticClass,staticStyle,key");
	function j(e, t, n, r) {
		let i, { tag: a, data: o, children: s } = t;
		if (r ||= o && o.pre, t.elm = e, p(t.isComment) && f(t.asyncFactory)) return t.isAsyncPlaceholder = !0, !0;
		if (!se(e, t, r)) return !1;
		if (f(o) && (f(i = o.hook) && f(i = i.init) && i(t, !0), f(i = t.componentInstance))) return v(t, n), !0;
		if (f(a)) {
			if (f(s)) {
				if (!e.hasChildNodes()) ee(t, s, n);
				else if (f(i = o) && f(i = i.domProps) && f(i = i.innerHTML)) {
					if (i !== e.innerHTML) return typeof console < "u" && !A && (A = !0, console.warn("Parent: ", e), console.warn("server innerHTML: ", i), console.warn("client innerHTML: ", e.innerHTML)), !1;
				} else {
					let t = !0, i = e.firstChild;
					for (let e = 0; e < s.length; e++) {
						if (!i || !j(i, s[e], n, r)) {
							t = !1;
							break;
						}
						i = i.nextSibling;
					}
					if (!t || i) return typeof console < "u" && !A && (A = !0, console.warn("Parent: ", e), console.warn("Mismatching childNodes vs. VNodes: ", e.childNodes, s)), !1;
				}
			}
			if (f(o)) {
				let e = !1;
				for (let r in o) if (!oe(r)) {
					e = !0, ne(t, n);
					break;
				}
				!e && o.class && or(o.class);
			}
		} else e.data !== t.text && (e.data = t.text);
		return !0;
	}
	function se(e, t, n) {
		return f(t.tag) ? t.tag.indexOf("vue-component") === 0 || !l(t, n) && t.tag.toLowerCase() === (e.tagName && e.tagName.toLowerCase()) : e.nodeType === (t.isComment ? 8 : 3);
	}
	return function(e, t, n, i) {
		if (d(t)) {
			f(e) && C(e);
			return;
		}
		let s = !1, c = [];
		if (d(e)) s = !0, g(t, c);
		else {
			let s = f(e.nodeType);
			if (!s && Oa(e, t)) O(e, t, c, null, null, i);
			else {
				if (s) {
					if (e.nodeType === 1 && e.hasAttribute(ve) && (e.removeAttribute(ve), n = !0), p(n)) {
						if (j(e, t, c)) return k(t, c, !0), e;
						Y("The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.");
					}
					e = o(e);
				}
				let i = e.elm, l = a.parentNode(i);
				if (g(t, c, i._leaveCb ? null : l, a.nextSibling(i)), f(t.parent)) {
					let e = t.parent, n = te(t);
					for (; e;) {
						for (let t = 0; t < r.destroy.length; ++t) r.destroy[t](e);
						if (e.elm = t.elm, n) {
							for (let t = 0; t < r.create.length; ++t) r.create[t](Ea, e);
							let t = e.data.hook.insert;
							if (t.merged) {
								let e = t.fns.slice(1);
								for (let t = 0; t < e.length; t++) e[t]();
							}
						} else wa(e);
						e = e.parent;
					}
				}
				f(l) ? w([e], 0, 0) : f(e.tag) && C(e);
			}
		}
		return k(t, c, s), t.elm;
	};
}
var Ma = {
	create: Na,
	update: Na,
	destroy: function(e) {
		Na(e, Ea);
	}
};
function Na(e, t) {
	(e.data.directives || t.data.directives) && Pa(e, t);
}
function Pa(e, t) {
	let n = e === Ea, r = t === Ea, i = Ia(e.data.directives, e.context), a = Ia(t.data.directives, t.context), o = [], s = [], c, l, u;
	for (c in a) l = i[c], u = a[c], l ? (u.oldValue = l.value, u.oldArg = l.arg, Ra(u, "update", t, e), u.def && u.def.componentUpdated && s.push(u)) : (Ra(u, "bind", t, e), u.def && u.def.inserted && o.push(u));
	if (o.length) {
		let r = () => {
			for (let n = 0; n < o.length; n++) Ra(o[n], "inserted", t, e);
		};
		n ? pt(t, "insert", r) : r();
	}
	if (s.length && pt(t, "postpatch", () => {
		for (let n = 0; n < s.length; n++) Ra(s[n], "componentUpdated", t, e);
	}), !n) for (c in i) a[c] || Ra(i[c], "unbind", e, e, r);
}
var Fa = Object.create(null);
function Ia(e, t) {
	let n = Object.create(null);
	if (!e) return n;
	let r, i;
	for (r = 0; r < e.length; r++) {
		if (i = e[r], i.modifiers || (i.modifiers = Fa), n[La(i)] = i, t._setupState && t._setupState.__sfc) {
			let e = i.def || ci(t, "_setupState", "v-" + i.name);
			typeof e == "function" ? i.def = {
				bind: e,
				update: e
			} : i.def = e;
		}
		i.def = i.def || ci(t.$options, "directives", i.name, !0);
	}
	return n;
}
function La(e) {
	return e.rawName || `${e.name}.${Object.keys(e.modifiers || {}).join(".")}`;
}
function Ra(e, t, n, r, i) {
	let a = e.def && e.def[t];
	if (a) try {
		a(n.elm, e, n, r, i);
	} catch (r) {
		Jn(r, n.context, `directive ${e.name} ${t} hook`);
	}
}
var za = [Ca, Ma];
function Ba(e, t) {
	let n = t.componentOptions;
	if (f(n) && n.Ctor.options.inheritAttrs === !1 || d(e.data.attrs) && d(t.data.attrs)) return;
	let r, i, a, o = t.elm, s = e.data.attrs || {}, c = t.data.attrs || {};
	for (r in (f(c.__ob__) || p(c._v_attr_proxy)) && (c = t.data.attrs = M({}, c)), c) i = c[r], a = s[r], a !== i && Va(o, r, i, t.data.pre);
	for (r in (De || ke) && c.value !== s.value && Va(o, "value", c.value), s) d(c[r]) && (Wi(r) ? o.removeAttributeNS(Ui, Gi(r)) : zi(r) || o.removeAttribute(r));
}
function Va(e, t, n, r) {
	r || e.tagName.indexOf("-") > -1 ? Ha(e, t, n) : Hi(t) ? Ki(n) ? e.removeAttribute(t) : (n = t === "allowfullscreen" && e.tagName === "EMBED" ? "true" : t, e.setAttribute(t, n)) : zi(t) ? e.setAttribute(t, Vi(t, n)) : Wi(t) ? Ki(n) ? e.removeAttributeNS(Ui, Gi(t)) : e.setAttributeNS(Ui, t, n) : Ha(e, t, n);
}
function Ha(e, t, n) {
	if (Ki(n)) e.removeAttribute(t);
	else {
		/* istanbul ignore if */
		if (De && !Oe && e.tagName === "TEXTAREA" && t === "placeholder" && n !== "" && !e.__ieph) {
			let t = (n) => {
				n.stopImmediatePropagation(), e.removeEventListener("input", t);
			};
			e.addEventListener("input", t), e.__ieph = !0;
		}
		e.setAttribute(t, n);
	}
}
var Ua = {
	create: Ba,
	update: Ba
};
function Wa(e, t) {
	let n = t.elm, r = t.data, i = e.data;
	if (d(r.staticClass) && d(r.class) && (d(i) || d(i.staticClass) && d(i.class))) return;
	let a = qi(t), o = n._transitionClasses;
	f(o) && (a = Xi(a, Zi(o))), a !== n._prevClass && (n.setAttribute("class", a), n._prevClass = a);
}
var Ga = {
	create: Wa,
	update: Wa
}, Ka = /[\w).+\-_$\]]/;
function qa(e) {
	let t = !1, n = !1, r = !1, i = !1, a = 0, o = 0, s = 0, c = 0, l, u, d, f, p;
	for (d = 0; d < e.length; d++) if (u = l, l = e.charCodeAt(d), t) l === 39 && u !== 92 && (t = !1);
	else if (n) l === 34 && u !== 92 && (n = !1);
	else if (r) l === 96 && u !== 92 && (r = !1);
	else if (i) l === 47 && u !== 92 && (i = !1);
	else if (l === 124 && e.charCodeAt(d + 1) !== 124 && e.charCodeAt(d - 1) !== 124 && !a && !o && !s) f === void 0 ? (c = d + 1, f = e.slice(0, d).trim()) : m();
	else {
		switch (l) {
			case 34:
				n = !0;
				break;
			case 39:
				t = !0;
				break;
			case 96:
				r = !0;
				break;
			case 40:
				s++;
				break;
			case 41:
				s--;
				break;
			case 91:
				o++;
				break;
			case 93:
				o--;
				break;
			case 123:
				a++;
				break;
			case 125: a--;
		}
		if (l === 47) {
			let t = d - 1, n;
			for (; t >= 0 && (n = e.charAt(t), n === " "); t--);
			(!n || !Ka.test(n)) && (i = !0);
		}
	}
	f === void 0 ? f = e.slice(0, d).trim() : c !== 0 && m();
	function m() {
		(p ||= []).push(e.slice(c, d).trim()), c = d + 1;
	}
	if (p) for (d = 0; d < p.length; d++) f = Ja(f, p[d]);
	return f;
}
function Ja(e, t) {
	let n = t.indexOf("(");
	if (n < 0) return `_f("${t}")(${e})`;
	{
		let r = t.slice(0, n), i = t.slice(n + 1);
		return `_f("${r}")(${e}${i === ")" ? i : "," + i}`;
	}
}
function Ya(e, t) {
	console.error(`[Vue compiler]: ${e}`);
}
function Xa(e, t) {
	return e ? e.map((e) => e[t]).filter((e) => e) : [];
}
function Za(e, t, n, r, i) {
	(e.props ||= []).push(oo({
		name: t,
		value: n,
		dynamic: i
	}, r)), e.plain = !1;
}
function Qa(e, t, n, r, i) {
	(i ? e.dynamicAttrs ||= [] : e.attrs ||= []).push(oo({
		name: t,
		value: n,
		dynamic: i
	}, r)), e.plain = !1;
}
function $a(e, t, n, r) {
	e.attrsMap[t] = n, e.attrsList.push(oo({
		name: t,
		value: n
	}, r));
}
function eo(e, t, n, r, i, a, o, s) {
	(e.directives ||= []).push(oo({
		name: t,
		rawName: n,
		value: r,
		arg: i,
		isDynamicArg: a,
		modifiers: o
	}, s)), e.plain = !1;
}
function to(e, t, n) {
	return n ? `_p(${t},"${e}")` : e + t;
}
function no(e, t, n, r, i, a, o, s) {
	/* istanbul ignore if */
	r ||= l, a && r.prevent && r.passive && a("passive and prevent can't be used together. Passive handler can't prevent default event.", o), r.right ? s ? t = `(${t})==='click'?'contextmenu':(${t})` : t === "click" && (t = "contextmenu", delete r.right) : r.middle && (s ? t = `(${t})==='click'?'mouseup':(${t})` : t === "click" && (t = "mouseup")), r.capture && (delete r.capture, t = to("!", t, s)), r.once && (delete r.once, t = to("~", t, s)), r.passive && (delete r.passive, t = to("&", t, s));
	let c;
	r.native ? (delete r.native, c = e.nativeEvents ||= {}) : c = e.events ||= {};
	let u = oo({
		value: n.trim(),
		dynamic: s
	}, o);
	r !== l && (u.modifiers = r);
	let d = c[t];
	Array.isArray(d) ? i ? d.unshift(u) : d.push(u) : d ? c[t] = i ? [u, d] : [d, u] : c[t] = u, e.plain = !1;
}
function ro(e, t) {
	return e.rawAttrsMap[":" + t] || e.rawAttrsMap["v-bind:" + t] || e.rawAttrsMap[t];
}
function io(e, t, n) {
	let r = Z(e, ":" + t) || Z(e, "v-bind:" + t);
	if (r != null) return qa(r);
	if (n !== !1) {
		let n = Z(e, t);
		if (n != null) return JSON.stringify(n);
	}
}
function Z(e, t, n) {
	let r;
	if ((r = e.attrsMap[t]) != null) {
		let n = e.attrsList;
		for (let e = 0, r = n.length; e < r; e++) if (n[e].name === t) {
			n.splice(e, 1);
			break;
		}
	}
	return n && delete e.attrsMap[t], r;
}
function ao(e, t) {
	let n = e.attrsList;
	for (let e = 0, r = n.length; e < r; e++) {
		let r = n[e];
		if (t.test(r.name)) return n.splice(e, 1), r;
	}
}
function oo(e, t) {
	return t && (t.start != null && (e.start = t.start), t.end != null && (e.end = t.end)), e;
}
function so(e, t, n) {
	let { number: r, trim: i } = n || {}, a = "$$v";
	i && (a = "(typeof $$v === 'string'? $$v.trim(): $$v)"), r && (a = `_n(${a})`);
	let o = co(t, a);
	e.model = {
		value: `(${t})`,
		expression: JSON.stringify(t),
		callback: `function (\$\$v) {${o}}`
	};
}
function co(e, t) {
	let n = go(e);
	return n.key === null ? `${e}=${t}` : `$set(${n.exp}, ${n.key}, ${t})`;
}
var lo, uo, fo, po, mo, ho;
function go(e) {
	if (e = e.trim(), lo = e.length, e.indexOf("[") < 0 || e.lastIndexOf("]") < lo - 1) return po = e.lastIndexOf("."), po > -1 ? {
		exp: e.slice(0, po),
		key: "\"" + e.slice(po + 1) + "\""
	} : {
		exp: e,
		key: null
	};
	for (uo = e, po = mo = ho = 0; !vo();)
 /* istanbul ignore if */
	fo = _o(), yo(fo) ? xo(fo) : fo === 91 && bo(fo);
	return {
		exp: e.slice(0, mo),
		key: e.slice(mo + 1, ho)
	};
}
function _o() {
	return uo.charCodeAt(++po);
}
function vo() {
	return po >= lo;
}
function yo(e) {
	return e === 34 || e === 39;
}
function bo(e) {
	let t = 1;
	for (mo = po; !vo();) if (e = _o(), yo(e)) xo(e);
	else if (e === 91 && t++, e === 93 && t--, t === 0) {
		ho = po;
		break;
	}
}
function xo(e) {
	let t = e;
	for (; !vo() && (e = _o(), e !== t););
}
var So, Co = "__r", wo = "__c";
function To(e, t, n) {
	So = n;
	let r = t.value, i = t.modifiers, a = e.tag, o = e.attrsMap.type;
	if (a === "input" && o === "file" && So(`<${e.tag} v-model="${r}" type="file">:\nFile inputs are read only. Use a v-on:change listener instead.`, e.rawAttrsMap["v-model"]), e.component) return so(e, r, i), !1;
	if (a === "select") Oo(e, r, i);
	else if (a === "input" && o === "checkbox") Eo(e, r, i);
	else if (a === "input" && o === "radio") Do(e, r, i);
	else if (a === "input" || a === "textarea") ko(e, r, i);
	else if (F.isReservedTag(a)) So(`<${e.tag} v-model="${r}">: v-model is not supported on this element type. If you are working with contenteditable, it's recommended to wrap a library dedicated for that purpose inside a custom component.`, e.rawAttrsMap["v-model"]);
	else return so(e, r, i), !1;
	return !0;
}
function Eo(e, t, n) {
	let r = n && n.number, i = io(e, "value") || "null", a = io(e, "true-value") || "true", o = io(e, "false-value") || "false";
	Za(e, "checked", `Array.isArray(${t})?_i(${t},${i})>-1` + (a === "true" ? `:(${t})` : `:_q(${t},${a})`)), no(e, "change", `var $$a=${t},\$\$el=\$event.target,$$c=$$el.checked?(${a}):(${o});if(Array.isArray(\$\$a)){var $$v=${r ? "_n(" + i + ")" : i},\$\$i=_i(\$\$a,\$\$v);if($$el.checked){$$i<0&&(${co(t, "$$a.concat([$$v])")})}else{$$i>-1&&(${co(t, "$$a.slice(0,$$i).concat($$a.slice($$i+1))")})}}else{${co(t, "$$c")}}`, null, !0);
}
function Do(e, t, n) {
	let r = n && n.number, i = io(e, "value") || "null";
	i = r ? `_n(${i})` : i, Za(e, "checked", `_q(${t},${i})`), no(e, "change", co(t, i), null, !0);
}
function Oo(e, t, n) {
	let r = `var $$selectedVal = ${`Array.prototype.filter.call(\$event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ${n && n.number ? "_n(val)" : "val"}})`};`;
	r = `${r} ${co(t, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]")}`, no(e, "change", r, null, !0);
}
function ko(e, t, n) {
	let r = e.attrsMap.type;
	{
		let t = e.attrsMap["v-bind:value"] || e.attrsMap[":value"], n = e.attrsMap["v-bind:type"] || e.attrsMap[":type"];
		if (t && !n) {
			let n = e.attrsMap["v-bind:value"] ? "v-bind:value" : ":value";
			So(`${n}="${t}" conflicts with v-model on the same element because the latter already expands to a value binding internally`, e.rawAttrsMap[n]);
		}
	}
	let { lazy: i, number: a, trim: o } = n || {}, s = !i && r !== "range", c = i ? "change" : r === "range" ? Co : "input", l = "$event.target.value";
	o && (l = "$event.target.value.trim()"), a && (l = `_n(${l})`);
	let u = co(t, l);
	s && (u = `if($event.target.composing)return;${u}`), Za(e, "value", `(${t})`), no(e, c, u, null, !0), (o || a) && no(e, "blur", "$forceUpdate()");
}
function Ao(e) {
	/* istanbul ignore if */
	if (f(e[Co])) {
		let t = De ? "change" : "input";
		e[t] = [].concat(e[Co], e[t] || []), delete e[Co];
	}
	/* istanbul ignore if */
	f(e[wo]) && (e.change = [].concat(e[wo], e.change || []), delete e[wo]);
}
var jo;
function Mo(e, t, n) {
	let r = jo;
	return function i() {
		t.apply(null, arguments) !== null && Fo(e, i, n, r);
	};
}
var No = Qn && !(je && Number(je[1]) <= 53);
function Po(e, t, n, r) {
	if (No) {
		let e = Rn, n = t;
		t = n._wrapper = function(t) {
			if (t.target === t.currentTarget || t.timeStamp >= e || t.timeStamp <= 0 || t.target.ownerDocument !== document) return n.apply(this, arguments);
		};
	}
	jo.addEventListener(e, t, Ne ? {
		capture: n,
		passive: r
	} : n);
}
function Fo(e, t, n, r) {
	(r || jo).removeEventListener(e, t._wrapper || t, n);
}
function Io(e, t) {
	if (d(e.data.on) && d(t.data.on)) return;
	let n = t.data.on || {}, r = e.data.on || {};
	jo = t.elm || e.elm, Ao(n), ft(n, r, Po, Fo, Mo, t.context), jo = void 0;
}
var Lo = {
	create: Io,
	update: Io,
	destroy: (e) => Io(e, Ea)
}, Ro;
function zo(e, t) {
	if (d(e.data.domProps) && d(t.data.domProps)) return;
	let n, r, i = t.elm, a = e.data.domProps || {}, o = t.data.domProps || {};
	for (n in (f(o.__ob__) || p(o._v_attr_proxy)) && (o = t.data.domProps = M({}, o)), a) n in o || (i[n] = "");
	for (n in o) {
		if (r = o[n], n === "textContent" || n === "innerHTML") {
			if (t.children && (t.children.length = 0), r === a[n]) continue;
			i.childNodes.length === 1 && i.removeChild(i.childNodes[0]);
		}
		if (n === "value" && i.tagName !== "PROGRESS") {
			i._value = r;
			let e = d(r) ? "" : String(r);
			Bo(i, e) && (i.value = e);
		} else if (n === "innerHTML" && na(i.tagName) && d(i.innerHTML)) {
			Ro ||= document.createElement("div"), Ro.innerHTML = `<svg>${r}</svg>`;
			let e = Ro.firstChild;
			for (; i.firstChild;) i.removeChild(i.firstChild);
			for (; e.firstChild;) i.appendChild(e.firstChild);
		} else if (r !== a[n]) try {
			i[n] = r;
		} catch {}
	}
}
function Bo(e, t) {
	return !e.composing && (e.tagName === "OPTION" || Vo(e, t) || Ho(e, t));
}
function Vo(e, t) {
	let n = !0;
	try {
		n = document.activeElement !== e;
	} catch {}
	return n && e.value !== t;
}
function Ho(e, t) {
	let n = e.value, r = e._vModifiers;
	if (f(r)) {
		if (r.number) return ie(n) !== ie(t);
		if (r.trim) return n.trim() !== t.trim();
	}
	return n !== t;
}
var Uo = {
	create: zo,
	update: zo
}, Wo = D(function(e) {
	let t = {}, n = /;(?![^(]*\))/g, r = /:(.+)/;
	return e.split(n).forEach(function(e) {
		if (e) {
			let n = e.split(r);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
});
function Go(e) {
	let t = Ko(e.style);
	return e.staticStyle ? M(e.staticStyle, t) : t;
}
function Ko(e) {
	return Array.isArray(e) ? de(e) : typeof e == "string" ? Wo(e) : e;
}
function qo(e, t) {
	let n = {}, r;
	if (t) {
		let t = e;
		for (; t.componentInstance;) t = t.componentInstance._vnode, t && t.data && (r = Go(t.data)) && M(n, r);
	}
	(r = Go(e.data)) && M(n, r);
	let i = e;
	for (; i = i.parent;) i.data && (r = Go(i.data)) && M(n, r);
	return n;
}
var Jo = /^--/, Yo = /\s*!important$/, Xo = (e, t, n) => {
	/* istanbul ignore if */
	if (Jo.test(t)) e.style.setProperty(t, n);
	else if (Yo.test(n)) e.style.setProperty(j(t), n.replace(Yo, ""), "important");
	else {
		let r = $o(t);
		if (Array.isArray(n)) for (let t = 0, i = n.length; t < i; t++) e.style[r] = n[t];
		else e.style[r] = n;
	}
}, Zo = [
	"Webkit",
	"Moz",
	"ms"
], Qo, $o = D(function(e) {
	if (Qo ||= document.createElement("div").style, e = k(e), e !== "filter" && e in Qo) return e;
	let t = e.charAt(0).toUpperCase() + e.slice(1);
	for (let e = 0; e < Zo.length; e++) {
		let n = Zo[e] + t;
		if (n in Qo) return n;
	}
});
function es(e, t) {
	let n = t.data, r = e.data;
	if (d(n.staticStyle) && d(n.style) && d(r.staticStyle) && d(r.style)) return;
	let i, a, o = t.elm, s = r.staticStyle, c = r.normalizedStyle || r.style || {}, l = s || c, u = Ko(t.data.style) || {};
	t.data.normalizedStyle = f(u.__ob__) ? M({}, u) : u;
	let p = qo(t, !0);
	for (a in l) d(p[a]) && Xo(o, a, "");
	for (a in p) i = p[a], Xo(o, a, i ?? "");
}
var ts = {
	create: es,
	update: es
}, ns = /\s+/;
function rs(e, t) {
	/* istanbul ignore if */
	if (t &&= t.trim()) {
		/* istanbul ignore else */
		if (e.classList) t.indexOf(" ") > -1 ? t.split(ns).forEach((t) => e.classList.add(t)) : e.classList.add(t);
		else {
			let n = ` ${e.getAttribute("class") || ""} `;
			n.indexOf(" " + t + " ") < 0 && e.setAttribute("class", (n + t).trim());
		}
	}
}
function is(e, t) {
	/* istanbul ignore if */
	if (t &&= t.trim()) {
		/* istanbul ignore else */
		if (e.classList) t.indexOf(" ") > -1 ? t.split(ns).forEach((t) => e.classList.remove(t)) : e.classList.remove(t), e.classList.length || e.removeAttribute("class");
		else {
			let n = ` ${e.getAttribute("class") || ""} `, r = " " + t + " ";
			for (; n.indexOf(r) >= 0;) n = n.replace(r, " ");
			n = n.trim(), n ? e.setAttribute("class", n) : e.removeAttribute("class");
		}
	}
}
function as(e) {
	if (e) {
		/* istanbul ignore else */
		if (typeof e == "object") {
			let t = {};
			return e.css !== !1 && M(t, os(e.name || "v")), M(t, e), t;
		}
		if (typeof e == "string") return os(e);
	}
}
var os = D((e) => ({
	enterClass: `${e}-enter`,
	enterToClass: `${e}-enter-to`,
	enterActiveClass: `${e}-enter-active`,
	leaveClass: `${e}-leave`,
	leaveToClass: `${e}-leave-to`,
	leaveActiveClass: `${e}-leave-active`
})), ss = I && !Oe, cs = "transition", ls = "animation", us = "transition", ds = "transitionend", fs = "animation", ps = "animationend";
ss && 
/* istanbul ignore if */
(window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0 && (us = "WebkitTransition", ds = "webkitTransitionEnd"), window.onanimationend === void 0 && window.onwebkitanimationend !== void 0 && (fs = "WebkitAnimation", ps = "webkitAnimationEnd"));
var ms = I ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */ /* istanbul ignore next */ (e) => e();
function hs(e) {
	ms(() => {
		ms(e);
	});
}
function gs(e, t) {
	let n = e._transitionClasses ||= [];
	n.indexOf(t) < 0 && (n.push(t), rs(e, t));
}
function _s(e, t) {
	e._transitionClasses && T(e._transitionClasses, t), is(e, t);
}
function vs(e, t, n) {
	let { type: r, timeout: i, propCount: a } = bs(e, t);
	if (!r) return n();
	let o = r === cs ? ds : ps, s = 0, c = () => {
		e.removeEventListener(o, l), n();
	}, l = (t) => {
		t.target === e && ++s >= a && c();
	};
	setTimeout(() => {
		s < a && c();
	}, i + 1), e.addEventListener(o, l);
}
var ys = /\b(transform|all)(,|$)/;
function bs(e, t) {
	let n = window.getComputedStyle(e), r = (n[us + "Delay"] || "").split(", "), i = (n[us + "Duration"] || "").split(", "), a = xs(r, i), o = (n[fs + "Delay"] || "").split(", "), s = (n[fs + "Duration"] || "").split(", "), c = xs(o, s), l, u = 0, d = 0;
	/* istanbul ignore if */
	t === cs ? a > 0 && (l = cs, u = a, d = i.length) : t === ls ? c > 0 && (l = ls, u = c, d = s.length) : (u = Math.max(a, c), l = u > 0 ? a > c ? cs : ls : null, d = l ? l === cs ? i.length : s.length : 0);
	let f = l === cs && ys.test(n[us + "Property"]);
	return {
		type: l,
		timeout: u,
		propCount: d,
		hasTransform: f
	};
}
function xs(e, t) {
	/* istanbul ignore next */
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max.apply(null, t.map((t, n) => Ss(t) + Ss(e[n])));
}
function Ss(e) {
	return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Cs(e, t) {
	let n = e.elm;
	f(n._leaveCb) && (n._leaveCb.cancelled = !0, n._leaveCb());
	let r = as(e.data.transition);
	/* istanbul ignore if */
	if (d(r) || f(n._enterCb) || n.nodeType !== 1) return;
	let { css: i, type: a, enterClass: o, enterToClass: s, enterActiveClass: c, appearClass: l, appearToClass: u, appearActiveClass: p, beforeEnter: m, enter: h, afterEnter: v, enterCancelled: y, beforeAppear: b, appear: x, afterAppear: ee, appearCancelled: te, duration: ne } = r, re = vn, S = vn.$vnode;
	for (; S && S.parent;) re = S.context, S = S.parent;
	let C = !re._isMounted || !e.isRootInsert;
	if (C && !x && x !== "") return;
	let w = C && l ? l : o, T = C && p ? p : c, ae = C && u ? u : s, E = C && b || m, D = C && g(x) ? x : h, O = C && ee || v, k = C && te || y, A = ie(_(ne) ? ne.enter : ne);
	A != null && Ts(A, "enter", e);
	let oe = i !== !1 && !Oe, j = Ds(D), se = n._enterCb = ge(() => {
		oe && (_s(n, ae), _s(n, T)), se.cancelled ? (oe && _s(n, w), k && k(n)) : O && O(n), n._enterCb = null;
	});
	e.data.show || pt(e, "insert", () => {
		let t = n.parentNode, r = t && t._pending && t._pending[e.key];
		r && r.tag === e.tag && r.elm._leaveCb && r.elm._leaveCb(), D && D(n, se);
	}), E && E(n), oe && (gs(n, w), gs(n, T), hs(() => {
		_s(n, w), se.cancelled || (gs(n, ae), j || (Es(A) ? setTimeout(se, A) : vs(n, a, se)));
	})), e.data.show && (t && t(), D && D(n, se)), !oe && !j && se();
}
function ws(e, t) {
	let n = e.elm;
	f(n._enterCb) && (n._enterCb.cancelled = !0, n._enterCb());
	let r = as(e.data.transition);
	if (d(r) || n.nodeType !== 1) return t();
	/* istanbul ignore if */
	if (f(n._leaveCb)) return;
	let { css: i, type: a, leaveClass: o, leaveToClass: s, leaveActiveClass: c, beforeLeave: l, leave: u, afterLeave: p, leaveCancelled: m, delayLeave: h, duration: g } = r, v = i !== !1 && !Oe, y = Ds(u), b = ie(_(g) ? g.leave : g);
	f(b) && Ts(b, "leave", e);
	let x = n._leaveCb = ge(() => {
		n.parentNode && n.parentNode._pending && (n.parentNode._pending[e.key] = null), v && (_s(n, s), _s(n, c)), x.cancelled ? (v && _s(n, o), m && m(n)) : (t(), p && p(n)), n._leaveCb = null;
	});
	h ? h(ee) : ee();
	function ee() {
		x.cancelled || (!e.data.show && n.parentNode && ((n.parentNode._pending || (n.parentNode._pending = {}))[e.key] = e), l && l(n), v && (gs(n, o), gs(n, c), hs(() => {
			_s(n, o), x.cancelled || (gs(n, s), y || (Es(b) ? setTimeout(x, b) : vs(n, a, x)));
		})), u && u(n, x), !v && !y && x());
	}
}
function Ts(e, t, n) {
	typeof e == "number" ? isNaN(e) && Y(`<transition> explicit ${t} duration is NaN - the duration expression might be incorrect.`, n.context) : Y(`<transition> explicit ${t} duration is not a valid number - got ${JSON.stringify(e)}.`, n.context);
}
function Es(e) {
	return typeof e == "number" && !isNaN(e);
}
function Ds(e) {
	if (d(e)) return !1;
	let t = e.fns;
	return f(t) ? Ds(Array.isArray(t) ? t[0] : t) : (e._length || e.length) > 1;
}
function Os(e, t) {
	t.data.show !== !0 && Cs(t);
}
var ks = ja({
	nodeOps: Sa,
	modules: [
		Ua,
		Ga,
		Lo,
		Uo,
		ts,
		I ? {
			create: Os,
			activate: Os,
			remove(e, t) {
				/* istanbul ignore else */
				e.data.show === !0 ? t() : ws(e, t);
			}
		} : {}
	].concat(za)
});
/* istanbul ignore if */
Oe && document.addEventListener("selectionchange", () => {
	let e = document.activeElement;
	e && e.vmodel && Ls(e, "input");
});
var As = {
	inserted(e, t, n, r) {
		n.tag === "select" ? (r.elm && !r.elm._vOptions ? pt(n, "postpatch", () => {
			As.componentUpdated(e, t, n);
		}) : js(e, t, n.context), e._vOptions = [].map.call(e.options, Ps)) : (n.tag === "textarea" || ca(e.type)) && (e._vModifiers = t.modifiers, t.modifiers.lazy || (e.addEventListener("compositionstart", Fs), e.addEventListener("compositionend", Is), e.addEventListener("change", Is), Oe && (e.vmodel = !0)));
	},
	componentUpdated(e, t, n) {
		if (n.tag === "select") {
			js(e, t, n.context);
			let r = e._vOptions, i = e._vOptions = [].map.call(e.options, Ps);
			i.some((e, t) => !P(e, r[t])) && (e.multiple ? t.value.some((e) => Ns(e, i)) : t.value !== t.oldValue && Ns(t.value, i)) && Ls(e, "change");
		}
	}
};
function js(e, t, n) {
	/* istanbul ignore if */
	Ms(e, t, n), (De || ke) && setTimeout(() => {
		Ms(e, t, n);
	}, 0);
}
function Ms(e, t, n) {
	let r = t.value, i = e.multiple;
	if (i && !Array.isArray(r)) {
		Y(`<select multiple v-model="${t.expression}"> expects an Array value for its binding, but got ${Object.prototype.toString.call(r).slice(8, -1)}`, n);
		return;
	}
	let a, o;
	for (let t = 0, n = e.options.length; t < n; t++) if (o = e.options[t], i) a = he(r, Ps(o)) > -1, o.selected !== a && (o.selected = a);
	else if (P(Ps(o), r)) {
		e.selectedIndex !== t && (e.selectedIndex = t);
		return;
	}
	i || (e.selectedIndex = -1);
}
function Ns(e, t) {
	return t.every((t) => !P(t, e));
}
function Ps(e) {
	return "_value" in e ? e._value : e.value;
}
function Fs(e) {
	e.target.composing = !0;
}
function Is(e) {
	e.target.composing && (e.target.composing = !1, Ls(e.target, "input"));
}
function Ls(e, t) {
	let n = document.createEvent("HTMLEvents");
	n.initEvent(t, !0, !0), e.dispatchEvent(n);
}
function Rs(e) {
	return e.componentInstance && (!e.data || !e.data.transition) ? Rs(e.componentInstance._vnode) : e;
}
var zs = {
	model: As,
	show: {
		bind(e, { value: t }, n) {
			n = Rs(n);
			let r = n.data && n.data.transition, i = e.__vOriginalDisplay = e.style.display === "none" ? "" : e.style.display;
			t && r ? (n.data.show = !0, Cs(n, () => {
				e.style.display = i;
			})) : e.style.display = t ? i : "none";
		},
		update(e, { value: t, oldValue: n }, r) {
			/* istanbul ignore if */
			!t != !n && (r = Rs(r), r.data && r.data.transition ? (r.data.show = !0, t ? Cs(r, () => {
				e.style.display = e.__vOriginalDisplay;
			}) : ws(r, () => {
				e.style.display = "none";
			})) : e.style.display = t ? e.__vOriginalDisplay : "none");
		},
		unbind(e, t, n, r, i) {
			i || (e.style.display = e.__vOriginalDisplay);
		}
	}
}, Bs = {
	name: String,
	appear: Boolean,
	css: Boolean,
	mode: String,
	type: String,
	enterClass: String,
	leaveClass: String,
	enterToClass: String,
	leaveToClass: String,
	enterActiveClass: String,
	leaveActiveClass: String,
	appearClass: String,
	appearActiveClass: String,
	appearToClass: String,
	duration: [
		Number,
		String,
		Object
	]
};
function Vs(e) {
	let t = e && e.componentOptions;
	return t && t.Ctor.options.abstract ? Vs(on(t.children)) : e;
}
function Hs(e) {
	let t = {}, n = e.$options;
	for (let r in n.propsData) t[r] = e[r];
	let r = n._parentListeners;
	for (let e in r) t[k(e)] = r[e];
	return t;
}
function Us(e, t) {
	if (/\d-keep-alive$/.test(t.tag)) return e("keep-alive", { props: t.componentOptions.propsData });
}
function Ws(e) {
	for (; e = e.parent;) if (e.data.transition) return !0;
}
function Gs(e, t) {
	return t.key === e.key && t.tag === e.tag;
}
var Ks = (e) => e.tag || Ut(e), qs = (e) => e.name === "show", Js = {
	name: "transition",
	props: Bs,
	abstract: !0,
	render(e) {
		let t = this.$slots.default;
		/* istanbul ignore if */
		if (!t || (t = t.filter(Ks), !t.length)) return;
		t.length > 1 && Y("<transition> can only be used on a single element. Use <transition-group> for lists.", this.$parent);
		let n = this.mode;
		n && n !== "in-out" && n !== "out-in" && Y("invalid <transition> mode: " + n, this.$parent);
		let r = t[0];
		if (Ws(this.$vnode)) return r;
		let i = Vs(r);
		/* istanbul ignore if */
		if (!i) return r;
		if (this._leaving) return Us(e, r);
		let a = `__transition-${this._uid}-`;
		i.key = i.key == null ? i.isComment ? a + "comment" : a + i.tag : h(i.key) ? String(i.key).indexOf(a) === 0 ? i.key : a + i.key : i.key;
		let o = (i.data ||= {}).transition = Hs(this), s = this._vnode, c = Vs(s);
		if (i.data.directives && i.data.directives.some(qs) && (i.data.show = !0), c && c.data && !Gs(i, c) && !Ut(c) && !(c.componentInstance && c.componentInstance._vnode.isComment)) {
			let t = c.data.transition = M({}, o);
			if (n === "out-in") return this._leaving = !0, pt(t, "afterLeave", () => {
				this._leaving = !1, this.$forceUpdate();
			}), Us(e, r);
			if (n === "in-out") {
				if (Ut(i)) return s;
				let e, n = () => {
					e();
				};
				pt(o, "afterEnter", n), pt(o, "enterCancelled", n), pt(t, "delayLeave", (t) => {
					e = t;
				});
			}
		}
		return r;
	}
}, Ys = M({
	tag: String,
	moveClass: String
}, Bs);
delete Ys.mode;
var Xs = {
	props: Ys,
	beforeMount() {
		let e = this._update;
		this._update = (t, n) => {
			let r = bn(this);
			this.__patch__(this._vnode, this.kept, !1, !0), this._vnode = this.kept, r(), e.call(this, t, n);
		};
	},
	render(e) {
		let t = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, i = this.$slots.default || [], a = this.children = [], o = Hs(this);
		for (let e = 0; e < i.length; e++) {
			let t = i[e];
			if (t.tag) {
				if (t.key != null && String(t.key).indexOf("__vlist") !== 0) a.push(t), n[t.key] = t, (t.data ||= {}).transition = o;
				else {
					let e = t.componentOptions, n = e ? Lr(e.Ctor.options) || e.tag || "" : t.tag;
					Y(`<transition-group> children must be keyed: <${n}>`);
				}
			}
		}
		if (r) {
			let i = [], a = [];
			for (let e = 0; e < r.length; e++) {
				let t = r[e];
				t.data.transition = o, t.data.pos = t.elm.getBoundingClientRect(), n[t.key] ? i.push(t) : a.push(t);
			}
			this.kept = e(t, null, i), this.removed = a;
		}
		return e(t, null, a);
	},
	updated() {
		let e = this.prevChildren, t = this.moveClass || (this.name || "v") + "-move";
		e.length && this.hasMove(e[0].elm, t) && (e.forEach(Zs), e.forEach(Qs), e.forEach($s), this._reflow = document.body.offsetHeight, e.forEach((e) => {
			if (e.data.moved) {
				let n = e.elm, r = n.style;
				gs(n, t), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(ds, n._moveCb = function e(r) {
					r && r.target !== n || (!r || /transform$/.test(r.propertyName)) && (n.removeEventListener(ds, e), n._moveCb = null, _s(n, t));
				});
			}
		}));
	},
	methods: { hasMove(e, t) {
		/* istanbul ignore if */
		if (!ss) return !1;
		/* istanbul ignore if */
		if (this._hasMove) return this._hasMove;
		let n = e.cloneNode();
		e._transitionClasses && e._transitionClasses.forEach((e) => {
			is(n, e);
		}), rs(n, t), n.style.display = "none", this.$el.appendChild(n);
		let r = bs(n);
		return this.$el.removeChild(n), this._hasMove = r.hasTransform;
	} }
};
function Zs(e) {
	/* istanbul ignore if */
	e.elm._moveCb && e.elm._moveCb(), e.elm._enterCb && e.elm._enterCb();
}
function Qs(e) {
	e.data.newPos = e.elm.getBoundingClientRect();
}
function $s(e) {
	let t = e.data.pos, n = e.data.newPos, r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		e.data.moved = !0;
		let t = e.elm.style;
		t.transform = t.WebkitTransform = `translate(${r}px,${i}px)`, t.transitionDuration = "0s";
	}
}
var ec = {
	Transition: Js,
	TransitionGroup: Xs
};
/* istanbul ignore next */
X.config.mustUseProp = Ri, X.config.isReservedTag = ia, X.config.isReservedAttr = Ii, X.config.getTagNamespace = aa, X.config.isUnknownElement = sa, M(X.options.directives, zs), M(X.options.components, ec), X.prototype.__patch__ = I ? ks : N, X.prototype.$mount = function(e, t) {
	return e = e && I ? la(e) : void 0, Cn(this, e, t);
}, I && setTimeout(() => {
	F.devtools && (Fe ? Fe.emit("init", X) : console[console.info ? "info" : "log"]("Download the Vue Devtools extension for a better development experience:\nhttps://github.com/vuejs/vue-devtools")), F.productionTip !== !1 && typeof console < "u" && console[console.info ? "info" : "log"]("You are running Vue in development mode.\nMake sure to turn on production mode when deploying for production.\nSee more tips at https://vuejs.org/guide/deployment.html");
}, 0);
var tc = /\{\{((?:.|\r?\n)+?)\}\}/g, nc = /[-.*+?^${}()|[\]\/\\]/g, rc = D((e) => {
	let t = e[0].replace(nc, "\\$&"), n = e[1].replace(nc, "\\$&");
	return RegExp(t + "((?:.|\\n)+?)" + n, "g");
});
function ic(e, t) {
	let n = t ? rc(t) : tc;
	if (!n.test(e)) return;
	let r = [], i = [], a = n.lastIndex = 0, o, s, c;
	for (; o = n.exec(e);) {
		s = o.index, s > a && (i.push(c = e.slice(a, s)), r.push(JSON.stringify(c)));
		let t = qa(o[1].trim());
		r.push(`_s(${t})`), i.push({ "@binding": t }), a = s + o[0].length;
	}
	return a < e.length && (i.push(c = e.slice(a)), r.push(JSON.stringify(c))), {
		expression: r.join("+"),
		tokens: i
	};
}
function ac(e, t) {
	let n = t.warn || Ya, r = Z(e, "class");
	r && ic(r, t.delimiters) && n(`class="${r}": Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div class="{{ val }}">, use <div :class="val">.`, e.rawAttrsMap.class), r && (e.staticClass = JSON.stringify(r.replace(/\s+/g, " ").trim()));
	let i = io(e, "class", !1);
	i && (e.classBinding = i);
}
function oc(e) {
	let t = "";
	return e.staticClass && (t += `staticClass:${e.staticClass},`), e.classBinding && (t += `class:${e.classBinding},`), t;
}
var sc = {
	staticKeys: ["staticClass"],
	transformNode: ac,
	genData: oc
};
function cc(e, t) {
	let n = t.warn || Ya, r = Z(e, "style");
	r && (ic(r, t.delimiters) && n(`style="${r}": Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div style="{{ val }}">, use <div :style="val">.`, e.rawAttrsMap.style), e.staticStyle = JSON.stringify(Wo(r)));
	let i = io(e, "style", !1);
	i && (e.styleBinding = i);
}
function lc(e) {
	let t = "";
	return e.staticStyle && (t += `staticStyle:${e.staticStyle},`), e.styleBinding && (t += `style:(${e.styleBinding}),`), t;
}
var uc = {
	staticKeys: ["staticStyle"],
	transformNode: cc,
	genData: lc
}, dc, fc = { decode(e) {
	return dc ||= document.createElement("div"), dc.innerHTML = e, dc.textContent;
} }, pc = S("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"), mc = S("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"), hc = S("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"), gc = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/, _c = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/, vc = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${xe.source}]*`, yc = `((?:${vc}\\:)?${vc})`, bc = RegExp(`^<${yc}`), xc = /^\s*(\/?)>/, Sc = RegExp(`^<\\/${yc}[^>]*>`), Cc = /^<!DOCTYPE [^>]+>/i, wc = /^<!\--/, Tc = /^<!\[/, Ec = S("script,style,textarea", !0), Dc = {}, Oc = {
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&amp;": "&",
	"&#10;": "\n",
	"&#9;": "	",
	"&#39;": "'"
}, kc = /&(?:lt|gt|quot|amp|#39);/g, Ac = /&(?:lt|gt|quot|amp|#39|#10|#9);/g, jc = S("pre,textarea", !0), Mc = (e, t) => e && jc(e) && t[0] === "\n";
function Nc(e, t) {
	let n = t ? Ac : kc;
	return e.replace(n, (e) => Oc[e]);
}
function Pc(e, t) {
	let n = [], r = t.expectHTML, i = t.isUnaryTag || fe, a = t.canBeLeftOpenTag || fe, o = 0, s, c;
	for (; e;) {
		if (s = e, !c || !Ec(c)) {
			let n = e.indexOf("<");
			if (n === 0) {
				if (wc.test(e)) {
					let n = e.indexOf("-->");
					if (n >= 0) {
						t.shouldKeepComment && t.comment && t.comment(e.substring(4, n), o, o + n + 3), l(n + 3);
						continue;
					}
				}
				if (Tc.test(e)) {
					let t = e.indexOf("]>");
					if (t >= 0) {
						l(t + 2);
						continue;
					}
				}
				let n = e.match(Cc);
				if (n) {
					l(n[0].length);
					continue;
				}
				let r = e.match(Sc);
				if (r) {
					let e = o;
					l(r[0].length), f(r[1], e, o);
					continue;
				}
				let i = u();
				if (i) {
					d(i), Mc(i.tagName, e) && l(1);
					continue;
				}
			}
			let r, i, a;
			if (n >= 0) {
				for (i = e.slice(n); !Sc.test(i) && !bc.test(i) && !wc.test(i) && !Tc.test(i) && (a = i.indexOf("<", 1), !(a < 0));) n += a, i = e.slice(n);
				r = e.substring(0, n);
			}
			n < 0 && (r = e), r && l(r.length), t.chars && r && t.chars(r, o - r.length, o);
		} else {
			let n = 0, r = c.toLowerCase(), i = Dc[r] || (Dc[r] = RegExp("([\\s\\S]*?)(</" + r + "[^>]*>)", "i")), a = e.replace(i, function(e, i, a) {
				return n = a.length, !Ec(r) && r !== "noscript" && (i = i.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), Mc(r, i) && (i = i.slice(1)), t.chars && t.chars(i), "";
			});
			o += e.length - a.length, e = a, f(r, o - n, o);
		}
		if (e === s) {
			t.chars && t.chars(e), !n.length && t.warn && t.warn(`Mal-formatted tag at end of template: "${e}"`, { start: o + e.length });
			break;
		}
	}
	f();
	function l(t) {
		o += t, e = e.substring(t);
	}
	function u() {
		let t = e.match(bc);
		if (t) {
			let n = {
				tagName: t[1],
				attrs: [],
				start: o
			};
			l(t[0].length);
			let r, i;
			for (; !(r = e.match(xc)) && (i = e.match(_c) || e.match(gc));) i.start = o, l(i[0].length), i.end = o, n.attrs.push(i);
			if (r) return n.unarySlash = r[1], l(r[0].length), n.end = o, n;
		}
	}
	function d(e) {
		let o = e.tagName, s = e.unarySlash;
		r && (c === "p" && hc(o) && f(c), a(o) && c === o && f(o));
		let l = i(o) || !!s, u = e.attrs.length, d = Array(u);
		for (let n = 0; n < u; n++) {
			let r = e.attrs[n], i = r[3] || r[4] || r[5] || "", a = o === "a" && r[1] === "href" ? t.shouldDecodeNewlinesForHref : t.shouldDecodeNewlines;
			d[n] = {
				name: r[1],
				value: Nc(i, a)
			}, t.outputSourceRange && (d[n].start = r.start + r[0].match(/^\s*/).length, d[n].end = r.end);
		}
		l || (n.push({
			tag: o,
			lowerCasedTag: o.toLowerCase(),
			attrs: d,
			start: e.start,
			end: e.end
		}), c = o), t.start && t.start(o, d, l, e.start, e.end);
	}
	function f(e, r, i) {
		let a, s;
		if (r ??= o, i ??= o, e) for (s = e.toLowerCase(), a = n.length - 1; a >= 0 && n[a].lowerCasedTag !== s; a--);
		else a = 0;
		if (a >= 0) {
			for (let o = n.length - 1; o >= a; o--) (o > a || !e) && t.warn && t.warn(`tag <${n[o].tag}> has no matching end tag.`, {
				start: n[o].start,
				end: n[o].end
			}), t.end && t.end(n[o].tag, r, i);
			n.length = a, c = a && n[a - 1].tag;
		} else s === "br" ? t.start && t.start(e, [], !0, r, i) : s === "p" && (t.start && t.start(e, [], !1, r, i), t.end && t.end(e, r, i));
	}
}
var Fc = /^@|^v-on:/, Ic = /^v-|^@|^:|^#/, Lc = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Rc = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, zc = /^\(|\)$/g, Bc = /^\[.*\]$/, Vc = /:(.*)$/, Hc = /^:|^\.|^v-bind:/, Uc = /\.[^.\]]+(?=[^\]]*$)/g, Wc = /^v-slot(:|$)|^#/, Gc = /[\r\n]/, Kc = /[ \f\t\r\n]+/g, qc = /[\s"'<>\/=]/, Jc = D(fc.decode), Yc = "_empty_", Q, Xc, Zc, Qc, $c, el, tl, nl, rl;
function il(e, t, n) {
	return {
		type: 1,
		tag: e,
		attrsList: t,
		attrsMap: Tl(t),
		rawAttrsMap: {},
		parent: n,
		children: []
	};
}
function al(e, t) {
	Q = t.warn || Ya, el = t.isPreTag || fe, tl = t.mustUseProp || fe, nl = t.getTagNamespace || fe;
	let n = t.isReservedTag || fe;
	rl = (e) => !!(e.component || e.attrsMap[":is"] || e.attrsMap["v-bind:is"] || !(e.attrsMap.is ? n(e.attrsMap.is) : n(e.tag))), Zc = Xa(t.modules, "transformNode"), Qc = Xa(t.modules, "preTransformNode"), $c = Xa(t.modules, "postTransformNode"), Xc = t.delimiters;
	let r = [], i = t.preserveWhitespace !== !1, a = t.whitespace, o, s, c = !1, l = !1, u = !1;
	function d(e, t) {
		u || (u = !0, Q(e, t));
	}
	function f(e) {
		if (p(e), !c && !e.processed && (e = cl(e, t)), !r.length && e !== o && (o.if && (e.elseif || e.else) ? (m(e), gl(o, {
			exp: e.elseif,
			block: e
		})) : d("Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.", { start: e.start })), s && !e.forbidden) {
			if (e.elseif || e.else) ml(e, s);
			else {
				if (e.slotScope) {
					let t = e.slotTarget || "\"default\"";
					(s.scopedSlots || (s.scopedSlots = {}))[t] = e;
				}
				s.children.push(e), e.parent = s;
			}
		}
		e.children = e.children.filter((e) => !e.slotScope), p(e), e.pre && (c = !1), el(e.tag) && (l = !1);
		for (let n = 0; n < $c.length; n++) $c[n](e, t);
	}
	function p(e) {
		if (!l) {
			let t;
			for (; (t = e.children[e.children.length - 1]) && t.type === 3 && t.text === " ";) e.children.pop();
		}
	}
	function m(e) {
		(e.tag === "slot" || e.tag === "template") && d(`Cannot use <${e.tag}> as component root element because it may contain multiple nodes.`, { start: e.start }), e.attrsMap.hasOwnProperty("v-for") && d("Cannot use v-for on stateful component root element because it renders multiple elements.", e.rawAttrsMap["v-for"]);
	}
	return Pc(e, {
		warn: Q,
		expectHTML: t.expectHTML,
		isUnaryTag: t.isUnaryTag,
		canBeLeftOpenTag: t.canBeLeftOpenTag,
		shouldDecodeNewlines: t.shouldDecodeNewlines,
		shouldDecodeNewlinesForHref: t.shouldDecodeNewlinesForHref,
		shouldKeepComment: t.comments,
		outputSourceRange: t.outputSourceRange,
		start(e, n, i, a, u) {
			let d = s && s.ns || nl(e);
			/* istanbul ignore if */
			De && d === "svg" && (n = Al(n));
			let p = il(e, n, s);
			d && (p.ns = d), t.outputSourceRange && (p.start = a, p.end = u, p.rawAttrsMap = p.attrsList.reduce((e, t) => (e[t.name] = t, e), {})), n.forEach((e) => {
				qc.test(e.name) && Q("Invalid dynamic argument expression: attribute names cannot contain spaces, quotes, <, >, / or =.", t.outputSourceRange ? {
					start: e.start + e.name.indexOf("["),
					end: e.start + e.name.length
				} : void 0);
			}), Dl(p) && !R() && (p.forbidden = !0, Q(`Templates should only be responsible for mapping the state to the UI. Avoid placing tags with side-effects in your templates, such as <${e}>, as they will not be parsed.`, { start: p.start }));
			for (let e = 0; e < Qc.length; e++) p = Qc[e](p, t) || p;
			c || (ol(p), p.pre && (c = !0)), el(p.tag) && (l = !0), c ? sl(p) : p.processed || (dl(p), pl(p), _l(p)), o || (o = p, m(o)), i ? f(p) : (s = p, r.push(p));
		},
		end(e, n, i) {
			let a = r[r.length - 1];
			--r.length, s = r[r.length - 1], t.outputSourceRange && (a.end = i), f(a);
		},
		chars(n, r, o) {
			if (!s) {
				n === e ? d("Component template requires a root element, rather than just text.", { start: r }) : (n = n.trim()) && d(`text "${n}" outside root element will be ignored.`, { start: r });
				return;
			}
			/* istanbul ignore if */
			if (De && s.tag === "textarea" && s.attrsMap.placeholder === n) return;
			let u = s.children;
			if (n = l || n.trim() ? El(s) ? n : Jc(n) : u.length ? a ? a === "condense" && Gc.test(n) ? "" : " " : i ? " " : "" : "", n) {
				!l && a === "condense" && (n = n.replace(Kc, " "));
				let e, i;
				!c && n !== " " && (e = ic(n, Xc)) ? i = {
					type: 2,
					expression: e.expression,
					tokens: e.tokens,
					text: n
				} : (n !== " " || !u.length || u[u.length - 1].text !== " ") && (i = {
					type: 3,
					text: n
				}), i && (t.outputSourceRange && (i.start = r, i.end = o), u.push(i));
			}
		},
		comment(e, n, r) {
			if (s) {
				let i = {
					type: 3,
					text: e,
					isComment: !0
				};
				t.outputSourceRange && (i.start = n, i.end = r), s.children.push(i);
			}
		}
	}), o;
}
function ol(e) {
	Z(e, "v-pre") != null && (e.pre = !0);
}
function sl(e) {
	let t = e.attrsList, n = t.length;
	if (n) {
		let r = e.attrs = Array(n);
		for (let e = 0; e < n; e++) r[e] = {
			name: t[e].name,
			value: JSON.stringify(t[e].value)
		}, t[e].start != null && (r[e].start = t[e].start, r[e].end = t[e].end);
	} else e.pre || (e.plain = !0);
}
function cl(e, t) {
	ll(e), e.plain = !e.key && !e.scopedSlots && !e.attrsList.length, ul(e), vl(e), bl(e), xl(e);
	for (let n = 0; n < Zc.length; n++) e = Zc[n](e, t) || e;
	return Sl(e), e;
}
function ll(e) {
	let t = io(e, "key");
	if (t) {
		if (e.tag === "template" && Q("<template> cannot be keyed. Place the key on real elements instead.", ro(e, "key")), e.for) {
			let n = e.iterator2 || e.iterator1, r = e.parent;
			n && n === t && r && r.tag === "transition-group" && Q("Do not use v-for index as key on <transition-group> children, this is the same as not using keys.", ro(e, "key"), !0);
		}
		e.key = t;
	}
}
function ul(e) {
	let t = io(e, "ref");
	t && (e.ref = t, e.refInFor = Cl(e));
}
function dl(e) {
	let t;
	if (t = Z(e, "v-for")) {
		let n = fl(t);
		n ? M(e, n) : Q(`Invalid v-for expression: ${t}`, e.rawAttrsMap["v-for"]);
	}
}
function fl(e) {
	let t = e.match(Lc);
	if (!t) return;
	let n = {};
	n.for = t[2].trim();
	let r = t[1].trim().replace(zc, ""), i = r.match(Rc);
	return i ? (n.alias = r.replace(Rc, "").trim(), n.iterator1 = i[1].trim(), i[2] && (n.iterator2 = i[2].trim())) : n.alias = r, n;
}
function pl(e) {
	let t = Z(e, "v-if");
	if (t) e.if = t, gl(e, {
		exp: t,
		block: e
	});
	else {
		Z(e, "v-else") != null && (e.else = !0);
		let t = Z(e, "v-else-if");
		t && (e.elseif = t);
	}
}
function ml(e, t) {
	let n = hl(t.children);
	n && n.if ? gl(n, {
		exp: e.elseif,
		block: e
	}) : Q(`v-${e.elseif ? "else-if=\"" + e.elseif + "\"" : "else"} used on element <${e.tag}> without corresponding v-if.`, e.rawAttrsMap[e.elseif ? "v-else-if" : "v-else"]);
}
function hl(e) {
	let t = e.length;
	for (; t--;) if (e[t].type === 1) return e[t];
	else e[t].text !== " " && Q(`text "${e[t].text.trim()}" between v-if and v-else(-if) will be ignored.`, e[t]), e.pop();
}
function gl(e, t) {
	e.ifConditions ||= [], e.ifConditions.push(t);
}
function _l(e) {
	Z(e, "v-once") != null && (e.once = !0);
}
function vl(e) {
	let t;
	e.tag === "template" ? (t = Z(e, "scope"), t && Q("the \"scope\" attribute for scoped slots have been deprecated and replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute can also be used on plain elements in addition to <template> to denote scoped slots.", e.rawAttrsMap.scope, !0), e.slotScope = t || Z(e, "slot-scope")) : (t = Z(e, "slot-scope")) && 
	/* istanbul ignore if */
	(e.attrsMap["v-for"] && Q(`Ambiguous combined usage of slot-scope and v-for on <${e.tag}> (v-for takes higher priority). Use a wrapper <template> for the scoped slot to make it clearer.`, e.rawAttrsMap["slot-scope"], !0), e.slotScope = t);
	let n = io(e, "slot");
	if (n && (e.slotTarget = n === "\"\"" ? "\"default\"" : n, e.slotTargetDynamic = !!(e.attrsMap[":slot"] || e.attrsMap["v-bind:slot"]), e.tag !== "template" && !e.slotScope && Qa(e, "slot", n, ro(e, "slot"))), e.tag === "template") {
		let t = ao(e, Wc);
		if (t) {
			(e.slotTarget || e.slotScope) && Q("Unexpected mixed usage of different slot syntaxes.", e), e.parent && !rl(e.parent) && Q("<template v-slot> can only appear at the root level inside the receiving component", e);
			let { name: n, dynamic: r } = yl(t);
			e.slotTarget = n, e.slotTargetDynamic = r, e.slotScope = t.value || Yc;
		}
	} else {
		let t = ao(e, Wc);
		if (t) {
			rl(e) || Q("v-slot can only be used on components or <template>.", t), (e.slotScope || e.slotTarget) && Q("Unexpected mixed usage of different slot syntaxes.", e), e.scopedSlots && Q("To avoid scope ambiguity, the default slot should also use <template> syntax when there are other named slots.", t);
			let n = e.scopedSlots ||= {}, { name: r, dynamic: i } = yl(t), a = n[r] = il("template", [], e);
			a.slotTarget = r, a.slotTargetDynamic = i, a.children = e.children.filter((e) => {
				if (!e.slotScope) return e.parent = a, !0;
			}), a.slotScope = t.value || Yc, e.children = [], e.plain = !1;
		}
	}
}
function yl(e) {
	let t = e.name.replace(Wc, "");
	return t || (e.name[0] === "#" ? Q("v-slot shorthand syntax requires a slot name.", e) : t = "default"), Bc.test(t) ? {
		name: t.slice(1, -1),
		dynamic: !0
	} : {
		name: `"${t}"`,
		dynamic: !1
	};
}
function bl(e) {
	e.tag === "slot" && (e.slotName = io(e, "name"), e.key && Q("`key` does not work on <slot> because slots are abstract outlets and can possibly expand into multiple elements. Use the key on a wrapping element instead.", ro(e, "key")));
}
function xl(e) {
	let t;
	(t = io(e, "is")) && (e.component = t), Z(e, "inline-template") != null && (e.inlineTemplate = !0);
}
function Sl(e) {
	let t = e.attrsList, n, r, i, a, o, s, c, l;
	for (n = 0, r = t.length; n < r; n++) if (i = a = t[n].name, o = t[n].value, Ic.test(i)) {
		if (e.hasBindings = !0, s = wl(i.replace(Ic, "")), s && (i = i.replace(Uc, "")), Hc.test(i)) i = i.replace(Hc, ""), o = qa(o), l = Bc.test(i), l && (i = i.slice(1, -1)), o.trim().length === 0 && Q(`The value for a v-bind expression cannot be empty. Found in "v-bind:${i}"`), s && (s.prop && !l && (i = k(i), i === "innerHtml" && (i = "innerHTML")), s.camel && !l && (i = k(i)), s.sync && (c = co(o, "$event"), l ? no(e, `"update:"+(${i})`, c, null, !1, Q, t[n], !0) : (no(e, `update:${k(i)}`, c, null, !1, Q, t[n]), j(i) !== k(i) && no(e, `update:${j(i)}`, c, null, !1, Q, t[n])))), s && s.prop || !e.component && tl(e.tag, e.attrsMap.type, i) ? Za(e, i, o, t[n], l) : Qa(e, i, o, t[n], l);
		else if (Fc.test(i)) i = i.replace(Fc, ""), l = Bc.test(i), l && (i = i.slice(1, -1)), no(e, i, o, s, !1, Q, t[n], l);
		else {
			i = i.replace(Ic, "");
			let r = i.match(Vc), c = r && r[1];
			l = !1, c && (i = i.slice(0, -(c.length + 1)), Bc.test(c) && (c = c.slice(1, -1), l = !0)), eo(e, i, a, o, c, l, s, t[n]), i === "model" && jl(e, o);
		}
	} else ic(o, Xc) && Q(`${i}="${o}": Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div id="{{ val }}">, use <div :id="val">.`, t[n]), Qa(e, i, JSON.stringify(o), t[n]), !e.component && i === "muted" && tl(e.tag, e.attrsMap.type, i) && Za(e, i, "true", t[n]);
}
function Cl(e) {
	let t = e;
	for (; t;) {
		if (t.for !== void 0) return !0;
		t = t.parent;
	}
	return !1;
}
function wl(e) {
	let t = e.match(Uc);
	if (t) {
		let e = {};
		return t.forEach((t) => {
			e[t.slice(1)] = !0;
		}), e;
	}
}
function Tl(e) {
	let t = {};
	for (let n = 0, r = e.length; n < r; n++) t[e[n].name] && !De && !ke && Q("duplicate attribute: " + e[n].name, e[n]), t[e[n].name] = e[n].value;
	return t;
}
function El(e) {
	return e.tag === "script" || e.tag === "style";
}
function Dl(e) {
	return e.tag === "style" || e.tag === "script" && (!e.attrsMap.type || e.attrsMap.type === "text/javascript");
}
var Ol = /^xmlns:NS\d+/, kl = /^NS\d+:/;
/* istanbul ignore next */
function Al(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		Ol.test(r.name) || (r.name = r.name.replace(kl, ""), t.push(r));
	}
	return t;
}
function jl(e, t) {
	let n = e;
	for (; n;) n.for && n.alias === t && Q(`<${e.tag} v-model="${t}">: You are binding v-model directly to a v-for iteration alias. This will not be able to modify the v-for source array because writing to the alias is like modifying a function local variable. Consider using an array of objects and use v-model on an object property instead.`, e.rawAttrsMap["v-model"]), n = n.parent;
}
function Ml(e, t) {
	if (e.tag === "input") {
		let n = e.attrsMap;
		if (!n["v-model"]) return;
		let r;
		if ((n[":type"] || n["v-bind:type"]) && (r = io(e, "type")), !n.type && !r && n["v-bind"] && (r = `(${n["v-bind"]}).type`), r) {
			let n = Z(e, "v-if", !0), i = n ? `&&(${n})` : "", a = Z(e, "v-else", !0) != null, o = Z(e, "v-else-if", !0), s = Nl(e);
			dl(s), $a(s, "type", "checkbox"), cl(s, t), s.processed = !0, s.if = `(${r})==='checkbox'` + i, gl(s, {
				exp: s.if,
				block: s
			});
			let c = Nl(e);
			Z(c, "v-for", !0), $a(c, "type", "radio"), cl(c, t), gl(s, {
				exp: `(${r})==='radio'` + i,
				block: c
			});
			let l = Nl(e);
			return Z(l, "v-for", !0), $a(l, ":type", r), cl(l, t), gl(s, {
				exp: n,
				block: l
			}), a ? s.else = !0 : o && (s.elseif = o), s;
		}
	}
}
function Nl(e) {
	return il(e.tag, e.attrsList.slice(), e.parent);
}
var Pl = [
	sc,
	uc,
	{ preTransformNode: Ml }
];
function Fl(e, t) {
	t.value && Za(e, "textContent", `_s(${t.value})`, t);
}
function Il(e, t) {
	t.value && Za(e, "innerHTML", `_s(${t.value})`, t);
}
var Ll = {
	expectHTML: !0,
	modules: Pl,
	directives: {
		model: To,
		text: Fl,
		html: Il
	},
	isPreTag: ra,
	isUnaryTag: pc,
	mustUseProp: Ri,
	canBeLeftOpenTag: mc,
	isReservedTag: ia,
	getTagNamespace: aa,
	staticKeys: me(Pl)
}, Rl, zl, Bl = D(Hl);
function Vl(e, t) {
	e && (Rl = Bl(t.staticKeys || ""), zl = t.isReservedTag || fe, Ul(e), Wl(e, !1));
}
function Hl(e) {
	return S("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" + (e ? "," + e : ""));
}
function Ul(e) {
	if (e.static = Gl(e), e.type === 1) {
		if (!zl(e.tag) && e.tag !== "slot" && e.attrsMap["inline-template"] == null) return;
		for (let t = 0, n = e.children.length; t < n; t++) {
			let n = e.children[t];
			Ul(n), n.static || (e.static = !1);
		}
		if (e.ifConditions) for (let t = 1, n = e.ifConditions.length; t < n; t++) {
			let n = e.ifConditions[t].block;
			Ul(n), n.static || (e.static = !1);
		}
	}
}
function Wl(e, t) {
	if (e.type === 1) {
		if ((e.static || e.once) && (e.staticInFor = t), e.static && e.children.length && (e.children.length !== 1 || e.children[0].type !== 3)) {
			e.staticRoot = !0;
			return;
		}
		if (e.staticRoot = !1, e.children) for (let n = 0, r = e.children.length; n < r; n++) Wl(e.children[n], t || !!e.for);
		if (e.ifConditions) for (let n = 1, r = e.ifConditions.length; n < r; n++) Wl(e.ifConditions[n].block, t);
	}
}
function Gl(e) {
	return e.type === 2 ? !1 : e.type === 3 || !(!e.pre && (e.hasBindings || e.if || e.for || C(e.tag) || !zl(e.tag) || Kl(e) || !Object.keys(e).every(Rl)));
}
function Kl(e) {
	for (; e.parent;) {
		if (e = e.parent, e.tag !== "template") return !1;
		if (e.for) return !0;
	}
	return !1;
}
var ql = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/, Jl = /\([^)]*?\);*$/, Yl = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, Xl = {
	esc: 27,
	tab: 9,
	enter: 13,
	space: 32,
	up: 38,
	left: 37,
	right: 39,
	down: 40,
	delete: [8, 46]
}, Zl = {
	esc: ["Esc", "Escape"],
	tab: "Tab",
	enter: "Enter",
	space: [" ", "Spacebar"],
	up: ["Up", "ArrowUp"],
	left: ["Left", "ArrowLeft"],
	right: ["Right", "ArrowRight"],
	down: ["Down", "ArrowDown"],
	delete: [
		"Backspace",
		"Delete",
		"Del"
	]
}, Ql = (e) => `if(${e})return null;`, $l = {
	stop: "$event.stopPropagation();",
	prevent: "$event.preventDefault();",
	self: Ql("$event.target !== $event.currentTarget"),
	ctrl: Ql("!$event.ctrlKey"),
	shift: Ql("!$event.shiftKey"),
	alt: Ql("!$event.altKey"),
	meta: Ql("!$event.metaKey"),
	left: Ql("'button' in $event && $event.button !== 0"),
	middle: Ql("'button' in $event && $event.button !== 1"),
	right: Ql("'button' in $event && $event.button !== 2")
};
function eu(e, t) {
	let n = t ? "nativeOn:" : "on:", r = "", i = "";
	for (let t in e) {
		let n = tu(e[t]);
		e[t] && e[t].dynamic ? i += `${t},${n},` : r += `"${t}":${n},`;
	}
	return r = `{${r.slice(0, -1)}}`, i ? n + `_d(${r},[${i.slice(0, -1)}])` : n + r;
}
function tu(e) {
	if (!e) return "function(){}";
	if (Array.isArray(e)) return `[${e.map((e) => tu(e)).join(",")}]`;
	let t = Yl.test(e.value), n = ql.test(e.value), r = Yl.test(e.value.replace(Jl, ""));
	if (e.modifiers) {
		let i = "", a = "", o = [];
		for (let t in e.modifiers) if ($l[t]) a += $l[t], Xl[t] && o.push(t);
		else if (t === "exact") {
			let t = e.modifiers;
			a += Ql([
				"ctrl",
				"shift",
				"alt",
				"meta"
			].filter((e) => !t[e]).map((e) => `$event.${e}Key`).join("||"));
		} else o.push(t);
		o.length && (i += nu(o)), a && (i += a);
		let s = t ? `return ${e.value}.apply(null, arguments)` : n ? `return (${e.value}).apply(null, arguments)` : r ? `return ${e.value}` : e.value;
		return `function($event){${i}${s}}`;
	}
	return t || n ? e.value : `function($event){${r ? `return ${e.value}` : e.value}}`;
}
function nu(e) {
	return `if(!$event.type.indexOf('key')&&${e.map(ru).join("&&")})return null;`;
}
function ru(e) {
	let t = parseInt(e, 10);
	if (t) return `$event.keyCode!==${t}`;
	let n = Xl[e], r = Zl[e];
	return `_k($event.keyCode,${JSON.stringify(e)},${JSON.stringify(n)},$event.key,${JSON.stringify(r)})`;
}
function iu(e, t) {
	t.modifiers && Y("v-on without argument does not support modifiers."), e.wrapListeners = (e) => `_g(${e},${t.value})`;
}
function au(e, t) {
	e.wrapData = (n) => `_b(${n},'${e.tag}',${t.value},${t.modifiers && t.modifiers.prop ? "true" : "false"}${t.modifiers && t.modifiers.sync ? ",true" : ""})`;
}
var ou = {
	on: iu,
	bind: au,
	cloak: N
}, su = class {
	constructor(e) {
		this.options = e, this.warn = e.warn || Ya, this.transforms = Xa(e.modules, "transformCode"), this.dataGenFns = Xa(e.modules, "genData"), this.directives = M(M({}, ou), e.directives);
		let t = e.isReservedTag || fe;
		this.maybeComponent = (e) => !!e.component || !t(e.tag), this.onceId = 0, this.staticRenderFns = [], this.pre = !1;
	}
};
function cu(e, t) {
	let n = new su(t);
	return {
		render: `with(this){return ${e ? e.tag === "script" ? "null" : lu(e, n) : "_c(\"div\")"}}`,
		staticRenderFns: n.staticRenderFns
	};
}
function lu(e, t) {
	if (e.parent && (e.pre = e.pre || e.parent.pre), e.staticRoot && !e.staticProcessed) return du(e, t);
	if (e.once && !e.onceProcessed) return fu(e, t);
	if (e.for && !e.forProcessed) return hu(e, t);
	if (e.if && !e.ifProcessed) return pu(e, t);
	if (e.tag === "template" && !e.slotTarget && !t.pre) return Cu(e, t) || "void 0";
	if (e.tag === "slot") return ku(e, t);
	{
		let n;
		if (e.component) n = Au(e.component, e, t);
		else {
			let r, i = t.maybeComponent(e);
			(!e.plain || e.pre && i) && (r = gu(e, t));
			let a, o = t.options.bindings;
			i && o && o.__isScriptSetup !== !1 && (a = uu(o, e.tag)), a ||= `'${e.tag}'`;
			let s = e.inlineTemplate ? null : Cu(e, t, !0);
			n = `_c(${a}${r ? `,${r}` : ""}${s ? `,${s}` : ""})`;
		}
		for (let r = 0; r < t.transforms.length; r++) n = t.transforms[r](e, n);
		return n;
	}
}
function uu(e, t) {
	let n = k(t), r = A(n), i = (i) => {
		if (e[t] === i) return t;
		if (e[n] === i) return n;
		if (e[r] === i) return r;
	}, a = i("setup-const") || i("setup-reactive-const");
	if (a) return a;
	let o = i("setup-let") || i("setup-ref") || i("setup-maybe-ref");
	if (o) return o;
}
function du(e, t) {
	e.staticProcessed = !0;
	let n = t.pre;
	return e.pre && (t.pre = e.pre), t.staticRenderFns.push(`with(this){return ${lu(e, t)}}`), t.pre = n, `_m(${t.staticRenderFns.length - 1}${e.staticInFor ? ",true" : ""})`;
}
function fu(e, t) {
	if (e.onceProcessed = !0, e.if && !e.ifProcessed) return pu(e, t);
	if (e.staticInFor) {
		let n = "", r = e.parent;
		for (; r;) {
			if (r.for) {
				n = r.key;
				break;
			}
			r = r.parent;
		}
		return n ? `_o(${lu(e, t)},${t.onceId++},${n})` : (t.warn("v-once can only be used inside v-for that is keyed. ", e.rawAttrsMap["v-once"]), lu(e, t));
	}
	return du(e, t);
}
function pu(e, t, n, r) {
	return e.ifProcessed = !0, mu(e.ifConditions.slice(), t, n, r);
}
function mu(e, t, n, r) {
	if (!e.length) return r || "_e()";
	let i = e.shift();
	return i.exp ? `(${i.exp})?${a(i.block)}:${mu(e, t, n, r)}` : `${a(i.block)}`;
	function a(e) {
		return n ? n(e, t) : e.once ? fu(e, t) : lu(e, t);
	}
}
function hu(e, t, n, r) {
	let i = e.for, a = e.alias, o = e.iterator1 ? `,${e.iterator1}` : "", s = e.iterator2 ? `,${e.iterator2}` : "";
	return t.maybeComponent(e) && e.tag !== "slot" && e.tag !== "template" && !e.key && t.warn(`<${e.tag} v-for="${a} in ${i}">: component lists rendered with v-for should have explicit keys. See https://v2.vuejs.org/v2/guide/list.html#key for more info.`, e.rawAttrsMap["v-for"], !0), e.forProcessed = !0, `${r || "_l"}((${i}),function(${a}${o}${s}){return ${(n || lu)(e, t)}})`;
}
function gu(e, t) {
	let n = "{", r = _u(e, t);
	r && (n += r + ","), e.key && (n += `key:${e.key},`), e.ref && (n += `ref:${e.ref},`), e.refInFor && (n += "refInFor:true,"), e.pre && (n += "pre:true,"), e.component && (n += `tag:"${e.tag}",`);
	for (let r = 0; r < t.dataGenFns.length; r++) n += t.dataGenFns[r](e);
	if (e.attrs && (n += `attrs:${ju(e.attrs)},`), e.props && (n += `domProps:${ju(e.props)},`), e.events && (n += `${eu(e.events, !1)},`), e.nativeEvents && (n += `${eu(e.nativeEvents, !0)},`), e.slotTarget && !e.slotScope && (n += `slot:${e.slotTarget},`), e.scopedSlots && (n += `${yu(e, e.scopedSlots, t)},`), e.model && (n += `model:{value:${e.model.value},callback:${e.model.callback},expression:${e.model.expression}},`), e.inlineTemplate) {
		let r = vu(e, t);
		r && (n += `${r},`);
	}
	return n = n.replace(/,$/, "") + "}", e.dynamicAttrs && (n = `_b(${n},"${e.tag}",${ju(e.dynamicAttrs)})`), e.wrapData && (n = e.wrapData(n)), e.wrapListeners && (n = e.wrapListeners(n)), n;
}
function _u(e, t) {
	let n = e.directives;
	if (!n) return;
	let r = "directives:[", i = !1, a, o, s, c;
	for (a = 0, o = n.length; a < o; a++) {
		s = n[a], c = !0;
		let o = t.directives[s.name];
		o && (c = !!o(e, s, t.warn)), c && (i = !0, r += `{name:"${s.name}",rawName:"${s.rawName}"${s.value ? `,value:(${s.value}),expression:${JSON.stringify(s.value)}` : ""}${s.arg ? `,arg:${s.isDynamicArg ? s.arg : `"${s.arg}"`}` : ""}${s.modifiers ? `,modifiers:${JSON.stringify(s.modifiers)}` : ""}},`);
	}
	if (i) return r.slice(0, -1) + "]";
}
function vu(e, t) {
	let n = e.children[0];
	if ((e.children.length !== 1 || n.type !== 1) && t.warn("Inline-template components must have exactly one child element.", { start: e.start }), n && n.type === 1) {
		let e = cu(n, t.options);
		return `inlineTemplate:{render:function(){${e.render}},staticRenderFns:[${e.staticRenderFns.map((e) => `function(){${e}}`).join(",")}]}`;
	}
}
function yu(e, t, n) {
	let r = e.for || Object.keys(t).some((e) => {
		let n = t[e];
		return n.slotTargetDynamic || n.if || n.for || xu(n);
	}), i = !!e.if;
	if (!r) {
		let t = e.parent;
		for (; t;) {
			if (t.slotScope && t.slotScope !== Yc || t.for) {
				r = !0;
				break;
			}
			t.if && (i = !0), t = t.parent;
		}
	}
	let a = Object.keys(t).map((e) => Su(t[e], n)).join(",");
	return `scopedSlots:_u([${a}]${r ? ",null,true" : ""}${!r && i ? `,null,false,${bu(a)}` : ""})`;
}
function bu(e) {
	let t = 5381, n = e.length;
	for (; n;) t = t * 33 ^ e.charCodeAt(--n);
	return t >>> 0;
}
function xu(e) {
	return e.type === 1 ? e.tag === "slot" || e.children.some(xu) : !1;
}
function Su(e, t) {
	let n = e.attrsMap["slot-scope"];
	if (e.if && !e.ifProcessed && !n) return pu(e, t, Su, "null");
	if (e.for && !e.forProcessed) return hu(e, t, Su);
	let r = e.slotScope === Yc ? "" : String(e.slotScope), i = `function(${r}){return ${e.tag === "template" ? e.if && n ? `(${e.if})?${Cu(e, t) || "undefined"}:undefined` : Cu(e, t) || "undefined" : lu(e, t)}}`, a = r ? "" : ",proxy:true";
	return `{key:${e.slotTarget || "\"default\""},fn:${i}${a}}`;
}
function Cu(e, t, n, r, i) {
	let a = e.children;
	if (a.length) {
		let e = a[0];
		if (a.length === 1 && e.for && e.tag !== "template" && e.tag !== "slot") {
			let i = n ? t.maybeComponent(e) ? ",1" : ",0" : "";
			return `${(r || lu)(e, t)}${i}`;
		}
		let o = n ? wu(a, t.maybeComponent) : 0, s = i || Eu;
		return `[${a.map((e) => s(e, t)).join(",")}]${o ? `,${o}` : ""}`;
	}
}
function wu(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i.type === 1) {
			if (Tu(i) || i.ifConditions && i.ifConditions.some((e) => Tu(e.block))) {
				n = 2;
				break;
			}
			(t(i) || i.ifConditions && i.ifConditions.some((e) => t(e.block))) && (n = 1);
		}
	}
	return n;
}
function Tu(e) {
	return e.for !== void 0 || e.tag === "template" || e.tag === "slot";
}
function Eu(e, t) {
	return e.type === 1 ? lu(e, t) : e.type === 3 && e.isComment ? Ou(e) : Du(e);
}
function Du(e) {
	return `_v(${e.type === 2 ? e.expression : Mu(JSON.stringify(e.text))})`;
}
function Ou(e) {
	return `_e(${JSON.stringify(e.text)})`;
}
function ku(e, t) {
	let n = e.slotName || "\"default\"", r = Cu(e, t), i = `_t(${n}${r ? `,function(){return ${r}}` : ""}`, a = e.attrs || e.dynamicAttrs ? ju((e.attrs || []).concat(e.dynamicAttrs || []).map((e) => ({
		name: k(e.name),
		value: e.value,
		dynamic: e.dynamic
	}))) : null, o = e.attrsMap["v-bind"];
	return (a || o) && !r && (i += ",null"), a && (i += `,${a}`), o && (i += `${a ? "" : ",null"},${o}`), i + ")";
}
function Au(e, t, n) {
	let r = t.inlineTemplate ? null : Cu(t, n, !0);
	return `_c(${e},${gu(t, n)}${r ? `,${r}` : ""})`;
}
function ju(e) {
	let t = "", n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = Mu(i.value);
		i.dynamic ? n += `${i.name},${a},` : t += `"${i.name}":${a},`;
	}
	return t = `{${t.slice(0, -1)}}`, n ? `_d(${t},[${n.slice(0, -1)}])` : t;
}
function Mu(e) {
	return e.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
var Nu = RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b"), Pu = RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)"), Fu = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
function Iu(e, t) {
	e && Lu(e, t);
}
function Lu(e, t) {
	if (e.type === 1) {
		for (let n in e.attrsMap) if (Ic.test(n)) {
			let r = e.attrsMap[n];
			if (r) {
				let i = e.rawAttrsMap[n];
				n === "v-for" ? zu(e, `v-for="${r}"`, t, i) : n === "v-slot" || n[0] === "#" ? Hu(r, `${n}="${r}"`, t, i) : Fc.test(n) ? Ru(r, `${n}="${r}"`, t, i) : Vu(r, `${n}="${r}"`, t, i);
			}
		}
		if (e.children) for (let n = 0; n < e.children.length; n++) Lu(e.children[n], t);
	} else e.type === 2 && Vu(e.expression, e.text, t, e);
}
function Ru(e, t, n, r) {
	let i = e.replace(Fu, ""), a = i.match(Pu);
	a && i.charAt(a.index - 1) !== "$" && n(`avoid using JavaScript unary operator as property name: "${a[0]}" in expression ${t.trim()}`, r), Vu(e, t, n, r);
}
function zu(e, t, n, r) {
	Vu(e.for || "", t, n, r), Bu(e.alias, "v-for alias", t, n, r), Bu(e.iterator1, "v-for iterator", t, n, r), Bu(e.iterator2, "v-for iterator", t, n, r);
}
function Bu(e, t, n, r, i) {
	if (typeof e == "string") try {
		Function(`var ${e}=_`);
	} catch {
		r(`invalid ${t} "${e}" in expression: ${n.trim()}`, i);
	}
}
function Vu(e, t, n, r) {
	try {
		Function(`return ${e}`);
	} catch (i) {
		let a = e.replace(Fu, "").match(Nu);
		n(a ? `avoid using JavaScript keyword as property name: "${a[0]}"\n  Raw expression: ${t.trim()}` : `invalid expression: ${i.message} in\n\n    ${e}\n\n  Raw expression: ${t.trim()}\n`, r);
	}
}
function Hu(e, t, n, r) {
	try {
		Function(e, "");
	} catch (i) {
		n(`invalid function parameter expression: ${i.message} in\n\n    ${e}\n\n  Raw expression: ${t.trim()}\n`, r);
	}
}
var Uu = 2;
function Wu(e, t = 0, n = e.length) {
	let r = e.split(/\r?\n/), i = 0, a = [];
	for (let e = 0; e < r.length; e++) if (i += r[e].length + 1, i >= t) {
		for (let o = e - Uu; o <= e + Uu || n > i; o++) {
			if (o < 0 || o >= r.length) continue;
			a.push(`${o + 1}${Gu(" ", 3 - String(o + 1).length)}|  ${r[o]}`);
			let s = r[o].length;
			if (o === e) {
				let e = t - (i - s) + 1, r = n > i ? s - e : n - t;
				a.push("   |  " + Gu(" ", e) + Gu("^", r));
			} else if (o > e) {
				if (n > i) {
					let e = Math.min(n - i, s);
					a.push("   |  " + Gu("^", e));
				}
				i += s + 1;
			}
		}
		break;
	}
	return a.join("\n");
}
function Gu(e, t) {
	let n = "";
	if (t > 0) for (; t & 1 && (n += e), t >>>= 1, !(t <= 0);) e += e;
	return n;
}
function Ku(e, t) {
	try {
		return Function(e);
	} catch (n) {
		return t.push({
			err: n,
			code: e
		}), N;
	}
}
function qu(e) {
	let t = Object.create(null);
	return function(n, r, i) {
		r = M({}, r);
		let a = r.warn || Y;
		delete r.warn;
		try {
			Function("return 1");
		} catch (e) {
			e.toString().match(/unsafe-eval|CSP/) && a("It seems you are using the standalone build of Vue.js in an environment with Content Security Policy that prohibits unsafe-eval. The template compiler cannot work in this environment. Consider relaxing the policy to allow unsafe-eval or pre-compiling your templates into render functions.");
		}
		let o = r.delimiters ? String(r.delimiters) + n : n;
		if (t[o]) return t[o];
		let s = e(n, r);
		s.errors && s.errors.length && (r.outputSourceRange ? s.errors.forEach((e) => {
			a(`Error compiling template:\n\n${e.msg}\n\n` + Wu(n, e.start, e.end), i);
		}) : a(`Error compiling template:\n\n${n}\n\n` + s.errors.map((e) => `- ${e}`).join("\n") + "\n", i)), s.tips && s.tips.length && (r.outputSourceRange ? s.tips.forEach((e) => Gr(e.msg, i)) : s.tips.forEach((e) => Gr(e, i)));
		let c = {}, l = [];
		return c.render = Ku(s.render, l), c.staticRenderFns = s.staticRenderFns.map((e) => Ku(e, l)), (!s.errors || !s.errors.length) && l.length && a("Failed to generate render function:\n\n" + l.map(({ err: e, code: t }) => `${e.toString()} in\n\n${t}\n`).join("\n"), i), t[o] = c;
	};
}
function Ju(e) {
	return function(t) {
		function n(n, r) {
			let i = Object.create(t), a = [], o = [], s = (e, t, n) => {
				(n ? o : a).push(e);
			};
			if (r) {
				if (r.outputSourceRange) {
					let e = n.match(/^\s*/)[0].length;
					s = (t, n, r) => {
						let i = typeof t == "string" ? { msg: t } : t;
						n && (n.start != null && (i.start = n.start + e), n.end != null && (i.end = n.end + e)), (r ? o : a).push(i);
					};
				}
				r.modules && (i.modules = (t.modules || []).concat(r.modules)), r.directives && (i.directives = M(Object.create(t.directives || null), r.directives));
				for (let e in r) e !== "modules" && e !== "directives" && (i[e] = r[e]);
			}
			i.warn = s;
			let c = e(n.trim(), i);
			return Iu(c.ast, s), c.errors = a, c.tips = o, c;
		}
		return {
			compile: n,
			compileToFunctions: qu(n)
		};
	};
}
var { compile: Yu, compileToFunctions: Xu } = Ju(function(e, t) {
	let n = al(e.trim(), t);
	t.optimize !== !1 && Vl(n, t);
	let r = cu(n, t);
	return {
		ast: n,
		render: r.render,
		staticRenderFns: r.staticRenderFns
	};
})(Ll), Zu;
function Qu(e) {
	return Zu ||= document.createElement("div"), Zu.innerHTML = e ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>", Zu.innerHTML.indexOf("&#10;") > 0;
}
var $u = I ? Qu(!1) : !1, ed = I ? Qu(!0) : !1, td = D((e) => {
	let t = la(e);
	return t && t.innerHTML;
}), nd = X.prototype.$mount;
X.prototype.$mount = function(e, t) {
	/* istanbul ignore if */
	if (e &&= la(e), e === document.body || e === document.documentElement) return Y("Do not mount Vue to <html> or <body> - mount to normal elements instead."), this;
	let n = this.$options;
	if (!n.render) {
		let t = n.template;
		if (t) {
			if (typeof t == "string") t.charAt(0) === "#" && (t = td(t), t || Y(`Template element not found or is empty: ${n.template}`, this));
			else if (t.nodeType) t = t.innerHTML;
			else return Y("invalid template option:" + t, this), this;
		} else e && (t = rd(e));
		if (t) {
			/* istanbul ignore if */
			F.performance && J && J("compile");
			let { render: e, staticRenderFns: r } = Xu(t, {
				outputSourceRange: !0,
				shouldDecodeNewlines: $u,
				shouldDecodeNewlinesForHref: ed,
				delimiters: n.delimiters,
				comments: n.comments
			}, this);
			/* istanbul ignore if */
			n.render = e, n.staticRenderFns = r, F.performance && J && (J("compile end"), lt(`vue ${this._name} compile`, "compile", "compile end"));
		}
	}
	return nd.call(this, e, t);
};
function rd(e) {
	if (e.outerHTML) return e.outerHTML;
	{
		let t = document.createElement("div");
		return t.appendChild(e.cloneNode(!0)), t.innerHTML;
	}
}
X.compile = Xu;
//#endregion
//#region node_modules/.pnpm/screenfull@6.0.2/node_modules/screenfull/index.js
var id = [
	[
		"requestFullscreen",
		"exitFullscreen",
		"fullscreenElement",
		"fullscreenEnabled",
		"fullscreenchange",
		"fullscreenerror"
	],
	[
		"webkitRequestFullscreen",
		"webkitExitFullscreen",
		"webkitFullscreenElement",
		"webkitFullscreenEnabled",
		"webkitfullscreenchange",
		"webkitfullscreenerror"
	],
	[
		"webkitRequestFullScreen",
		"webkitCancelFullScreen",
		"webkitCurrentFullScreenElement",
		"webkitCancelFullScreen",
		"webkitfullscreenchange",
		"webkitfullscreenerror"
	],
	[
		"mozRequestFullScreen",
		"mozCancelFullScreen",
		"mozFullScreenElement",
		"mozFullScreenEnabled",
		"mozfullscreenchange",
		"mozfullscreenerror"
	],
	[
		"msRequestFullscreen",
		"msExitFullscreen",
		"msFullscreenElement",
		"msFullscreenEnabled",
		"MSFullscreenChange",
		"MSFullscreenError"
	]
], ad = (() => {
	if (typeof document > "u") return !1;
	let e = id[0], t = {};
	for (let n of id) if (n?.[1] in document) {
		for (let [r, i] of n.entries()) t[e[r]] = i;
		return t;
	}
	return !1;
})(), od = {
	change: ad.fullscreenchange,
	error: ad.fullscreenerror
}, sd = {
	request(e = document.documentElement, t) {
		return new Promise((n, r) => {
			let i = () => {
				sd.off("change", i), n();
			};
			sd.on("change", i);
			let a = e[ad.requestFullscreen](t);
			a instanceof Promise && a.then(i).catch(r);
		});
	},
	exit() {
		return new Promise((e, t) => {
			if (!sd.isFullscreen) {
				e();
				return;
			}
			let n = () => {
				sd.off("change", n), e();
			};
			sd.on("change", n);
			let r = document[ad.exitFullscreen]();
			r instanceof Promise && r.then(n).catch(t);
		});
	},
	toggle(e, t) {
		return sd.isFullscreen ? sd.exit() : sd.request(e, t);
	},
	onchange(e) {
		sd.on("change", e);
	},
	onerror(e) {
		sd.on("error", e);
	},
	on(e, t) {
		let n = od[e];
		n && document.addEventListener(n, t, !1);
	},
	off(e, t) {
		let n = od[e];
		n && document.removeEventListener(n, t, !1);
	},
	raw: ad
};
Object.defineProperties(sd, {
	isFullscreen: { get: () => !!document[ad.fullscreenElement] },
	element: {
		enumerable: !0,
		get: () => document[ad.fullscreenElement] ?? void 0
	},
	isEnabled: {
		enumerable: !0,
		get: () => !!document[ad.fullscreenEnabled]
	}
}), ad || (sd = { isEnabled: !1 });
var cd = sd;
//#endregion
//#region packages/core/src/index.ts
function ld(e) {
	let t;
	if (t = e == null ? document.body : typeof e == "function" ? e() : typeof e == "object" && !(e instanceof Element) && !("$el" in e) && "value" in e ? e.value : e, typeof t == "string") {
		let e = t.charAt(0) === "#" ? t.slice(1) : t, n = document.getElementById(e);
		if (!n) try {
			n = document.querySelector(t);
		} catch {}
		if (!n) throw Error(`Fullscreen target not found: ${t}`);
		t = n;
	}
	if (t && !(t instanceof Element) && typeof t == "object" && (t = t.$el), !(t instanceof HTMLElement)) throw TypeError("Fullscreen target must resolve to an HTML element");
	return t;
}
function ud() {
	let e = null, t = !1, n = null, r = !1, i, a = {
		fullscreenClass: "fullscreen",
		teleport: !1,
		pageOnly: !1
	}, o = null, s = (e) => {
		t !== e && (t = e, a.callback?.(e));
	}, c = () => {
		typeof document < "u" && document.removeEventListener("keyup", u), cd.isEnabled && cd.off("change", l), i?.(), i = void 0, e = null, o = null;
	}, l = () => {
		cd.element === o && cd.isFullscreen ? s(!0) : (c(), s(!1));
	}, u = (e) => {
		(e.key === "Escape" || e.key === "Esc") && d.exit().catch(() => {});
	}, d = {
		get options() {
			return a;
		},
		get element() {
			return e;
		},
		get isFullscreen() {
			return t;
		},
		get isSupported() {
			return cd.isEnabled;
		},
		get isEnabled() {
			return this.isSupported;
		},
		toggle(e, n, r) {
			return r ?? !t ? this.enter(e, n) : this.exit();
		},
		request(e, t = {}) {
			return d.enter(e, t);
		},
		enter(d, f = {}) {
			if (r) return Promise.reject(/* @__PURE__ */ Error("Fullscreen controller has been disposed"));
			if (n) return n;
			if (t) return Promise.resolve();
			if (typeof document > "u") return Promise.reject(/* @__PURE__ */ Error("Fullscreen requires a browser"));
			let p;
			try {
				p = ld(d);
			} catch (e) {
				return Promise.reject(e);
			}
			a = {
				fullscreenClass: "fullscreen",
				teleport: !1,
				pageOnly: !1,
				...f
			}, a.pageOnly ||= !cd.isEnabled, a.teleport &&= p !== document.body;
			let m = a.fullscreenClass.split(/\s+/).filter(Boolean).filter((e) => !p.classList.contains(e)), h = [
				"position",
				"left",
				"top",
				"width",
				"height"
			].map((e) => [
				e,
				p.style.getPropertyValue(e),
				p.style.getPropertyPriority(e)
			]), g;
			if (i = () => {
				if (m.forEach((e) => p.classList.remove(e)), a.pageOnly || a.teleport) for (let [e, t, n] of h) t ? p.style.setProperty(e, t, n) : p.style.removeProperty(e);
				g?.parentNode && (p.parentNode ? g.parentNode.replaceChild(p, g) : g.parentNode.removeChild(g));
			}, e = p, m.forEach((e) => p.classList.add(e)), (a.pageOnly || a.teleport) && Object.assign(p.style, {
				position: "fixed",
				left: "0",
				top: "0",
				width: "100%",
				height: "100%"
			}), a.teleport && p.parentNode && (g = document.createComment("fullscreen"), p.parentNode.insertBefore(g, p), document.body.appendChild(p)), a.pageOnly) return document.addEventListener("keyup", u), s(!0), Promise.resolve();
			o = a.teleport ? document.body : p, cd.on("change", l);
			try {
				return n = cd.request(o).then(() => {
					if (r) return cd.element === o ? cd.exit() : void 0;
					e && l();
				}).catch((e) => {
					throw c(), s(!1), e;
				}).finally(() => {
					n = null;
				}), n;
			} catch (e) {
				return c(), Promise.reject(e);
			}
		},
		async exit() {
			n && await n, t && (a.pageOnly ? (c(), s(!1)) : (await cd.exit(), t && (c(), s(!1))));
		},
		dispose() {
			r = !0;
			let e = o, t = n;
			c();
			try {
				s(!1);
			} finally {
				if (cd.isEnabled) {
					let n = () => {
						if (e && cd.element === e) return cd.exit();
					};
					t ? t.then(n, () => {}).catch(() => {}) : Promise.resolve(n()).catch(() => {});
				}
			}
		}
	};
	return d;
}
var dd = ud(), fd = {
	get options() {
		return dd.options;
	},
	get element() {
		return dd.element;
	},
	get isFullscreen() {
		return dd.isFullscreen;
	},
	get isSupported() {
		return dd.isSupported;
	},
	get isEnabled() {
		return dd.isSupported;
	},
	enter: (e, t) => dd.enter(e, t),
	request: (e, t) => dd.enter(e, t),
	toggle: (e, t, n) => dd.toggle(e, t, n),
	exit: () => dd.exit(),
	dispose() {
		let e = dd;
		dd = ud(), hd = null, e.dispose();
	}
}, pd = {
	fullscreen: {
		type: Boolean,
		default: !1
	},
	exitOnClickWrapper: {
		type: Boolean,
		default: !0
	},
	fullscreenClass: {
		type: String,
		default: "fullscreen"
	},
	pageOnly: {
		type: Boolean,
		default: !1
	},
	teleport: {
		type: Boolean,
		default: !1
	}
}, md = /* @__PURE__ */ new WeakMap(), hd = null;
function gd(e) {
	let t = md.get(e);
	t && e.removeEventListener("click", t), md.delete(e);
}
function _d(e) {
	gd(e), hd === e && fd.dispose();
}
function vd(e, t) {
	gd(e);
	let n = () => {
		try {
			let { target: n, ...i } = typeof t.value == "string" ? { target: t.value } : t.value ?? {}, a = dd;
			a.element || (hd = e), a.toggle(n, {
				teleport: !!t.modifiers.teleport,
				pageOnly: !!t.modifiers.pageOnly,
				...i,
				callback: (e) => {
					!e && dd === a && (hd = null), i.callback?.(e);
				}
			}).catch((e) => {
				dd === a && !a.element && (hd = null), r(e);
			});
		} catch (e) {
			r(e);
		}
	}, r = (t) => {
		let n = document.createEvent("CustomEvent");
		n.initCustomEvent("fullscreen-error", !0, !1, t), e.dispatchEvent(n);
	};
	md.set(e, n), e.addEventListener("click", n);
}
//#endregion
//#region packages/vue2/src/index.ts
var yd = /* @__PURE__ */ new WeakMap(), bd = X.extend({
	name: "Fullscreen",
	inheritAttrs: !1,
	props: {
		...pd,
		value: {
			type: Boolean,
			default: !1
		}
	},
	data() {
		return {
			isFullscreen: !1,
			isSupported: !1
		};
	},
	computed: {
		isEnabled() {
			return this.isSupported;
		},
		support() {
			return this.isSupported;
		}
	},
	created() {
		let e = ud();
		yd.set(this, e), this.isSupported = e.isSupported;
	},
	mounted() {
		(this.value || this.fullscreen) && this.update(!0);
	},
	beforeDestroy() {
		yd.get(this)?.dispose(), yd.delete(this);
	},
	watch: {
		value(e) {
			this.update(e);
		},
		fullscreen(e) {
			this.update(e);
		}
	},
	methods: {
		enter() {
			return yd.get(this).enter(this.$el, {
				pageOnly: this.pageOnly,
				teleport: this.teleport,
				fullscreenClass: this.fullscreenClass,
				callback: (e) => {
					this.isFullscreen = e, this.$emit("change", e), this.$emit("input", e), this.$emit("update:fullscreen", e);
				}
			});
		},
		exit() {
			return yd.get(this).exit();
		},
		toggle(e) {
			return e ?? !this.isFullscreen ? this.enter() : this.exit();
		},
		update(e) {
			this.toggle(e).catch((e) => this.$emit("error", e));
		},
		request() {
			return this.enter();
		},
		getState() {
			return this.isFullscreen;
		}
	},
	render(e) {
		return e("div", {
			attrs: this.$attrs,
			class: { [this.fullscreenClass]: this.isFullscreen },
			on: {
				...this.$listeners,
				click: (e) => {
					this.$emit("click", e), this.exitOnClickWrapper && e.target === this.$el && this.update(!1);
				}
			}
		}, this.$slots.default);
	}
}), xd = {
	inserted: vd,
	update: vd,
	unbind: _d
}, Sd = { install(e, { name: t = "fullscreen" } = {}) {
	Object.defineProperty(e.prototype, `$${t}`, {
		configurable: !0,
		get: () => fd
	}), e.component(t, bd), e.directive(t, xd);
} }, Cd = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self, n.Viewer = r());
	})(e, (function() {
		function e(e, t) {
			if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
		}
		function t(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, s(r.key), r);
			}
		}
		function n(e, n, r) {
			return n && t(e.prototype, n), r && t(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
		}
		function r(e, t, n) {
			return (t = s(t)) in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e;
		}
		function i(e, t) {
			var n = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(e);
				t && (r = r.filter(function(t) {
					return Object.getOwnPropertyDescriptor(e, t).enumerable;
				})), n.push.apply(n, r);
			}
			return n;
		}
		function a(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t] == null ? {} : arguments[t];
				t % 2 ? i(Object(n), !0).forEach(function(t) {
					r(e, t, n[t]);
				}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function(t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
				});
			}
			return e;
		}
		function o(e, t) {
			if (typeof e != "object" || !e) return e;
			var n = e[Symbol.toPrimitive];
			if (n !== void 0) {
				var r = n.call(e, t || "default");
				if (typeof r != "object") return r;
				throw TypeError("@@toPrimitive must return a primitive value.");
			}
			return (t === "string" ? String : Number)(e);
		}
		function s(e) {
			var t = o(e, "string");
			return typeof t == "symbol" ? t : t + "";
		}
		function c(e) {
			"@babel/helpers - typeof";
			return c = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
				return typeof e;
			} : function(e) {
				return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			}, c(e);
		}
		var l = {
			backdrop: !0,
			button: !0,
			navbar: !0,
			title: !0,
			toolbar: !0,
			className: "",
			container: "body",
			filter: null,
			fullscreen: !0,
			inheritedAttributes: [
				"crossOrigin",
				"decoding",
				"isMap",
				"loading",
				"referrerPolicy",
				"sizes",
				"srcset",
				"useMap"
			],
			initialCoverage: .9,
			initialViewIndex: 0,
			inline: !1,
			interval: 5e3,
			keyboard: !0,
			focus: !0,
			loading: !0,
			loop: !0,
			minWidth: 200,
			minHeight: 100,
			movable: !0,
			rotatable: !0,
			scalable: !0,
			zoomable: !0,
			zoomOnTouch: !0,
			zoomOnWheel: !0,
			slideOnTouch: !0,
			toggleOnDblclick: !0,
			tooltip: !0,
			transition: !0,
			zIndex: 2015,
			zIndexInline: 0,
			zoomRatio: .1,
			minZoomRatio: .01,
			maxZoomRatio: 100,
			url: "src",
			ready: null,
			show: null,
			shown: null,
			hide: null,
			hidden: null,
			view: null,
			viewed: null,
			move: null,
			moved: null,
			rotate: null,
			rotated: null,
			scale: null,
			scaled: null,
			zoom: null,
			zoomed: null,
			play: null,
			stop: null
		}, u = "<div class=\"viewer-container\" tabindex=\"-1\" touch-action=\"none\"><div class=\"viewer-canvas\"></div><div class=\"viewer-footer\"><div class=\"viewer-title\"></div><div class=\"viewer-toolbar\"></div><div class=\"viewer-navbar\"><ul class=\"viewer-list\" role=\"navigation\"></ul></div></div><div class=\"viewer-tooltip\" role=\"alert\" aria-hidden=\"true\"></div><div class=\"viewer-button\" data-viewer-action=\"mix\" role=\"button\"></div><div class=\"viewer-player\"></div></div>", d = typeof window < "u" && window.document !== void 0, f = d ? window : {}, p = d && f.document.documentElement ? "ontouchstart" in f.document.documentElement : !1, m = d ? "PointerEvent" in f : !1, h = "viewer", g = "move", _ = "switch", v = "zoom", y = `${h}-active`, b = `${h}-close`, x = `${h}-fade`, ee = `${h}-fixed`, te = `${h}-fullscreen`, ne = `${h}-fullscreen-exit`, re = `${h}-hide`, ie = `${h}-hide-md-down`, S = `${h}-hide-sm-down`, C = `${h}-hide-xs-down`, w = `${h}-in`, T = `${h}-invisible`, ae = `${h}-loading`, E = `${h}-move`, D = `${h}-open`, O = `${h}-show`, k = `${h}-transition`, A = "click", oe = "dblclick", j = "dragstart", se = "focusin", ce = "keydown", le = "load", ue = "error", M = p ? "touchend touchcancel" : "mouseup", de = p ? "touchmove" : "mousemove", N = m ? "pointerdown" : p ? "touchstart" : "mousedown", fe = m ? "pointermove" : de, pe = m ? "pointerup pointercancel" : M, me = "resize", P = "transitionend", he = "wheel", ge = "ready", _e = "show", ve = "shown", ye = "hide", be = "hidden", F = "view", xe = "viewed", Se = "move", Ce = "moved", we = "rotate", Te = "rotated", Ee = "scale", I = "scaled", L = "zoom", De = "zoomed", Oe = "play", ke = "stop", Ae = `${h}Action`, je = /\s\s*/, Me = [
			"zoom-in",
			"zoom-out",
			"one-to-one",
			"reset",
			"prev",
			"play",
			"next",
			"rotate-left",
			"rotate-right",
			"flip-horizontal",
			"flip-vertical"
		];
		function Ne(e) {
			return typeof e == "string";
		}
		var Pe = Number.isNaN || f.isNaN;
		function R(e) {
			return typeof e == "number" && !Pe(e);
		}
		function Fe(e) {
			return e === void 0;
		}
		function Ie(e) {
			return c(e) === "object" && e !== null;
		}
		var Le = Object.prototype.hasOwnProperty;
		function Re(e) {
			if (!Ie(e)) return !1;
			try {
				var t = e.constructor, n = t.prototype;
				return t && n && Le.call(n, "isPrototypeOf");
			} catch {
				return !1;
			}
		}
		function z(e) {
			return typeof e == "function";
		}
		function B(e, t) {
			if (e && z(t)) {
				if (Array.isArray(e) || R(e.length)) for (var n = e.length, r = 0; r < n && t.call(e, e[r], r, e) !== !1; r += 1);
				else Ie(e) && Object.keys(e).forEach(function(n) {
					t.call(e, e[n], n, e);
				});
			}
			return e;
		}
		var V = Object.assign || function(e) {
			var t = [...arguments].slice(1);
			return Ie(e) && t.length > 0 && t.forEach(function(t) {
				Ie(t) && Object.keys(t).forEach(function(n) {
					e[n] = t[n];
				});
			}), e;
		}, ze = /^(?:width|height|left|top|marginLeft|marginTop)$/;
		function H(e, t) {
			var n = e.style;
			B(t, function(e, t) {
				ze.test(t) && R(e) && (e += "px"), n[t] = e;
			});
		}
		function Be(e) {
			return Ne(e) ? e.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
		}
		function Ve(e, t) {
			return !e || !t ? !1 : e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1;
		}
		function U(e, t) {
			if (e && t) {
				if (R(e.length)) B(e, function(e) {
					U(e, t);
				});
				else if (e.classList) e.classList.add(t);
				else {
					var n = e.className.trim();
					n ? n.indexOf(t) < 0 && (e.className = `${n} ${t}`) : e.className = t;
				}
			}
		}
		function W(e, t) {
			e && t && (R(e.length) ? B(e, function(e) {
				W(e, t);
			}) : e.classList ? e.classList.remove(t) : e.className.indexOf(t) >= 0 && (e.className = e.className.replace(t, "")));
		}
		function He(e, t, n) {
			t && (R(e.length) ? B(e, function(e) {
				He(e, t, n);
			}) : n ? U(e, t) : W(e, t));
		}
		var Ue = /([a-z\d])([A-Z])/g;
		function We(e) {
			return e.replace(Ue, "$1-$2").toLowerCase();
		}
		function Ge(e, t) {
			return Ie(e[t]) ? e[t] : e.dataset ? e.dataset[t] : e.getAttribute(`data-${We(t)}`);
		}
		function Ke(e, t, n) {
			Ie(n) ? e[t] = n : e.dataset ? e.dataset[t] = n : e.setAttribute(`data-${We(t)}`, n);
		}
		var qe = function() {
			var e = !1;
			if (d) {
				var t = !1, n = function() {}, r = Object.defineProperty({}, "once", {
					get: function() {
						return e = !0, t;
					},
					set: function(e) {
						t = e;
					}
				});
				f.addEventListener("test", n, r), f.removeEventListener("test", n, r);
			}
			return e;
		}();
		function G(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = n;
			t.trim().split(je).forEach(function(t) {
				if (!qe) {
					var a = e.listeners;
					a && a[t] && a[t][n] && (i = a[t][n], delete a[t][n], Object.keys(a[t]).length === 0 && delete a[t], Object.keys(a).length === 0 && delete e.listeners);
				}
				e.removeEventListener(t, i, r);
			});
		}
		function K(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = n;
			t.trim().split(je).forEach(function(t) {
				if (r.once && !qe) {
					var a = e.listeners, o = a === void 0 ? {} : a;
					i = function() {
						delete o[t][n], e.removeEventListener(t, i, r);
						var a = [...arguments];
						n.apply(e, a);
					}, o[t] || (o[t] = {}), o[t][n] && e.removeEventListener(t, o[t][n], r), o[t][n] = i, e.listeners = o;
				}
				e.addEventListener(t, i, r);
			});
		}
		function q(e, t, n, r) {
			var i;
			return z(Event) && z(CustomEvent) ? i = new CustomEvent(t, a({
				bubbles: !0,
				cancelable: !0,
				detail: n
			}, r)) : (i = document.createEvent("CustomEvent"), i.initCustomEvent(t, !0, !0, n)), e.dispatchEvent(i);
		}
		function Je(e) {
			var t = e.getBoundingClientRect();
			return {
				left: t.left + (window.pageXOffset - document.documentElement.clientLeft),
				top: t.top + (window.pageYOffset - document.documentElement.clientTop)
			};
		}
		function Ye(e) {
			var t = e.rotate, n = e.scaleX, r = e.scaleY, i = e.translateX, a = e.translateY, o = [];
			R(i) && i !== 0 && o.push(`translateX(${i}px)`), R(a) && a !== 0 && o.push(`translateY(${a}px)`), R(t) && t !== 0 && o.push(`rotate(${t}deg)`), R(n) && n !== 1 && o.push(`scaleX(${n})`), R(r) && r !== 1 && o.push(`scaleY(${r})`);
			var s = o.length ? o.join(" ") : "none";
			return {
				WebkitTransform: s,
				msTransform: s,
				transform: s
			};
		}
		function Xe(e) {
			return Ne(e) ? decodeURIComponent(e.replace(/^.*\//, "").replace(/[?&#].*$/, "")) : "";
		}
		var Ze = f.navigator && /Version\/\d+(\.\d+)+?\s+Safari/i.test(f.navigator.userAgent);
		function Qe(e, t, n) {
			var r = document.createElement("img");
			if (e.naturalWidth && !Ze) return n(e.naturalWidth, e.naturalHeight), r;
			var i = document.body || document.documentElement;
			return r.onload = function() {
				n(r.width, r.height), Ze || i.removeChild(r);
			}, B(t.inheritedAttributes, function(t) {
				var n = e.getAttribute(t);
				n !== null && r.setAttribute(t, n);
			}), r.src = e.src, Ze || (r.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", i.appendChild(r)), r;
		}
		function $e(e) {
			switch (e) {
				case 2: return C;
				case 3: return S;
				case 4: return ie;
				default: return "";
			}
		}
		function et(e) {
			var t = a({}, e), n = [];
			return B(e, function(e, r) {
				delete t[r], B(t, function(t) {
					var r = Math.abs(e.startX - t.startX), i = Math.abs(e.startY - t.startY), a = Math.abs(e.endX - t.endX), o = Math.abs(e.endY - t.endY), s = Math.sqrt(r * r + i * i), c = (Math.sqrt(a * a + o * o) - s) / s;
					n.push(c);
				});
			}), n.sort(function(e, t) {
				return Math.abs(e) < Math.abs(t);
			}), n[0];
		}
		function tt(e, t) {
			var n = e.pageX, r = e.pageY, i = {
				endX: n,
				endY: r
			};
			return t ? i : a({
				timeStamp: Date.now(),
				startX: n,
				startY: r
			}, i);
		}
		function nt(e) {
			var t = 0, n = 0, r = 0;
			return B(e, function(e) {
				var i = e.startX, a = e.startY;
				t += i, n += a, r += 1;
			}), t /= r, n /= r, {
				pageX: t,
				pageY: n
			};
		}
		var rt = {
			render: function() {
				this.initContainer(), this.initViewer(), this.initList(), this.renderViewer();
			},
			initBody: function() {
				var e = this.element.ownerDocument, t = e.body || e.documentElement;
				this.body = t, this.scrollbarWidth = window.innerWidth - e.documentElement.clientWidth, this.initialBodyPaddingRight = t.style.paddingRight, this.initialBodyComputedPaddingRight = window.getComputedStyle(t).paddingRight;
			},
			initContainer: function() {
				this.containerData = {
					width: window.innerWidth,
					height: window.innerHeight
				};
			},
			initViewer: function() {
				var e = this.options, t = this.parent, n;
				e.inline && (n = {
					width: Math.max(t.offsetWidth, e.minWidth),
					height: Math.max(t.offsetHeight, e.minHeight)
				}, this.parentData = n), (this.fulled || !n) && (n = this.containerData), this.viewerData = V({}, n);
			},
			renderViewer: function() {
				this.options.inline && !this.fulled && H(this.viewer, this.viewerData);
			},
			initList: function() {
				var e = this, t = this.element, n = this.options, r = this.list, i = [];
				r.innerHTML = "", B(this.images, function(t, a) {
					var o = t.src, s = t.alt || Xe(o), c = e.getImageURL(t);
					if (o || c) {
						var l = document.createElement("li"), u = document.createElement("img");
						B(n.inheritedAttributes, function(e) {
							var n = t.getAttribute(e);
							n !== null && u.setAttribute(e, n);
						}), n.navbar && (u.src = o || c), u.alt = s, u.setAttribute("data-original-url", c || o), l.setAttribute("data-index", a), l.setAttribute("data-viewer-action", "view"), l.setAttribute("role", "button"), n.keyboard && l.setAttribute("tabindex", 0), l.appendChild(u), r.appendChild(l), i.push(l);
					}
				}), this.items = i, B(i, function(t) {
					var r = t.firstElementChild, i, a;
					Ke(r, "filled", !0), n.loading && U(t, ae), K(r, le, i = function(i) {
						G(r, ue, a), n.loading && W(t, ae), e.loadImage(i);
					}, { once: !0 }), K(r, ue, a = function() {
						G(r, le, i), n.loading && W(t, ae);
					}, { once: !0 });
				}), n.transition && K(t, xe, function() {
					U(r, k);
				}, { once: !0 });
			},
			renderList: function() {
				var e = this.index, t = this.items[e];
				if (t) {
					var n = t.nextElementSibling, r = parseInt(window.getComputedStyle(n || t).marginLeft, 10), i = t.offsetWidth, a = i + r;
					H(this.list, V({ width: a * this.length - r }, Ye({ translateX: (this.viewerData.width - i) / 2 - a * e })));
				}
			},
			resetList: function() {
				var e = this.list;
				e.innerHTML = "", W(e, k), H(e, Ye({ translateX: 0 }));
			},
			initImage: function(e) {
				var t = this, n = this.options, r = this.image, i = this.viewerData, a = this.footer.offsetHeight, o = i.width, s = Math.max(i.height - a, a), c = this.imageData || {}, l;
				this.imageInitializing = { abort: function() {
					l.onload = null;
				} }, l = Qe(r, n, function(r, i) {
					var a = r / i, l = Math.max(0, Math.min(1, n.initialCoverage)), u = o, d = s;
					t.imageInitializing = !1, s * a > o ? d = o / a : u = s * a, l = R(l) ? l : .9, u = Math.min(u * l, r), d = Math.min(d * l, i);
					var f = (o - u) / 2, p = (s - d) / 2, m = {
						left: f,
						top: p,
						x: f,
						y: p,
						width: u,
						height: d,
						oldRatio: 1,
						ratio: u / r,
						aspectRatio: a,
						naturalWidth: r,
						naturalHeight: i
					}, h = V({}, m);
					n.rotatable && (m.rotate = c.rotate || 0, h.rotate = 0), n.scalable && (m.scaleX = c.scaleX || 1, m.scaleY = c.scaleY || 1, h.scaleX = 1, h.scaleY = 1), t.imageData = m, t.initialImageData = h, e && e();
				});
			},
			renderImage: function(e) {
				var t = this, n = this.image, r = this.imageData;
				if (H(n, V({
					width: r.width,
					height: r.height,
					marginLeft: r.x,
					marginTop: r.y
				}, Ye(r))), e) {
					if ((this.viewing || this.moving || this.rotating || this.scaling || this.zooming) && this.options.transition && Ve(n, k)) {
						var i = function() {
							t.imageRendering = !1, e();
						};
						this.imageRendering = { abort: function() {
							G(n, P, i);
						} }, K(n, P, i, { once: !0 });
					} else e();
				}
			},
			resetImage: function() {
				var e = this.image;
				e && (this.viewing && this.viewing.abort(), e.parentNode.removeChild(e), this.image = null, this.title.innerHTML = "");
			}
		}, it = {
			bind: function() {
				var e = this.options, t = this.viewer, n = this.canvas, r = this.element.ownerDocument;
				K(t, A, this.onClick = this.click.bind(this)), K(t, j, this.onDragStart = this.dragstart.bind(this)), K(n, N, this.onPointerDown = this.pointerdown.bind(this)), K(r, fe, this.onPointerMove = this.pointermove.bind(this)), K(r, pe, this.onPointerUp = this.pointerup.bind(this)), K(r, ce, this.onKeyDown = this.keydown.bind(this)), K(window, me, this.onResize = this.resize.bind(this)), e.zoomable && e.zoomOnWheel && K(t, he, this.onWheel = this.wheel.bind(this), {
					passive: !1,
					capture: !0
				}), e.toggleOnDblclick && K(n, oe, this.onDblclick = this.dblclick.bind(this));
			},
			unbind: function() {
				var e = this.options, t = this.viewer, n = this.canvas, r = this.element.ownerDocument;
				G(t, A, this.onClick), G(t, j, this.onDragStart), G(n, N, this.onPointerDown), G(r, fe, this.onPointerMove), G(r, pe, this.onPointerUp), G(r, ce, this.onKeyDown), G(window, me, this.onResize), e.zoomable && e.zoomOnWheel && G(t, he, this.onWheel, {
					passive: !1,
					capture: !0
				}), e.toggleOnDblclick && G(n, oe, this.onDblclick);
			}
		}, at = {
			click: function(e) {
				var t = this.options, n = this.imageData, r = e.target, i = Ge(r, Ae);
				switch (!i && r.localName === "img" && r.parentElement.localName === "li" && (r = r.parentElement, i = Ge(r, Ae)), p && e.isTrusted && r === this.canvas && clearTimeout(this.clickCanvasTimeout), i) {
					case "mix":
						this.played ? this.stop() : t.inline ? this.fulled ? this.exit() : this.full() : this.hide();
						break;
					case "hide":
						this.pointerMoved || this.hide();
						break;
					case "view":
						this.view(Ge(r, "index"));
						break;
					case "zoom-in":
						this.zoom(.1, !0);
						break;
					case "zoom-out":
						this.zoom(-.1, !0);
						break;
					case "one-to-one":
						this.toggle();
						break;
					case "reset":
						this.reset();
						break;
					case "prev":
						this.prev(t.loop);
						break;
					case "play":
						this.play(t.fullscreen);
						break;
					case "next":
						this.next(t.loop);
						break;
					case "rotate-left":
						this.rotate(-90);
						break;
					case "rotate-right":
						this.rotate(90);
						break;
					case "flip-horizontal":
						this.scaleX(-n.scaleX || -1);
						break;
					case "flip-vertical":
						this.scaleY(-n.scaleY || -1);
						break;
					default: this.played && this.stop();
				}
			},
			dblclick: function(e) {
				e.preventDefault(), this.viewed && e.target === this.image && (p && e.isTrusted && clearTimeout(this.doubleClickImageTimeout), this.toggle(e.isTrusted ? e : e.detail && e.detail.originalEvent));
			},
			load: function() {
				var e = this;
				this.timeout &&= (clearTimeout(this.timeout), !1);
				var t = this.element, n = this.options, r = this.image, i = this.index, a = this.viewerData;
				W(r, T), n.loading && W(this.canvas, ae), r.style.cssText = `height:0;margin-left:${a.width / 2}px;margin-top:${a.height / 2}px;max-width:none!important;position:relative;width:0;`, this.initImage(function() {
					He(r, E, n.movable), He(r, k, n.transition), e.renderImage(function() {
						e.viewed = !0, e.viewing = !1, z(n.viewed) && K(t, xe, n.viewed, { once: !0 }), q(t, xe, {
							originalImage: e.images[i],
							index: i,
							image: r
						}, { cancelable: !1 });
					});
				});
			},
			loadImage: function(e) {
				var t = e.target, n = t.parentNode, r = n.offsetWidth || 30, i = n.offsetHeight || 50, a = !!Ge(t, "filled");
				Qe(t, this.options, function(e, n) {
					var o = e / n, s = r, c = i;
					i * o > r ? a ? s = i * o : c = r / o : a ? c = r / o : s = i * o, H(t, V({
						width: s,
						height: c
					}, Ye({
						translateX: (r - s) / 2,
						translateY: (i - c) / 2
					})));
				});
			},
			keydown: function(e) {
				var t = this.options;
				if (t.keyboard) {
					var n = e.keyCode || e.which || e.charCode;
					if (n === 13 && this.viewer.contains(e.target) && this.click(e), this.fulled) switch (n) {
						case 27:
							this.played ? this.stop() : t.inline ? this.fulled && this.exit() : this.hide();
							break;
						case 32:
							this.played && this.stop();
							break;
						case 37:
							this.played && this.playing ? this.playing.prev() : this.prev(t.loop);
							break;
						case 38:
							e.preventDefault(), this.zoom(t.zoomRatio, !0);
							break;
						case 39:
							this.played && this.playing ? this.playing.next() : this.next(t.loop);
							break;
						case 40:
							e.preventDefault(), this.zoom(-t.zoomRatio, !0);
							break;
						case 48:
						case 49: e.ctrlKey && (e.preventDefault(), this.toggle());
					}
				}
			},
			dragstart: function(e) {
				e.target.localName === "img" && e.preventDefault();
			},
			pointerdown: function(e) {
				var t = this.options, n = this.pointers, r = e.buttons, i = e.button;
				if (this.pointerMoved = !1, !(!this.viewed || this.showing || this.viewing || this.hiding || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (R(r) && r !== 1 || R(i) && i !== 0 || e.ctrlKey))) {
					e.preventDefault(), e.changedTouches ? B(e.changedTouches, function(e) {
						n[e.identifier] = tt(e);
					}) : n[e.pointerId || 0] = tt(e);
					var a = t.movable ? g : !1;
					t.zoomOnTouch && t.zoomable && Object.keys(n).length > 1 ? a = v : t.slideOnTouch && (e.pointerType === "touch" || e.type === "touchstart") && this.isSwitchable() && (a = _), t.transition && (a === g || a === v) && W(this.image, k), this.action = a;
				}
			},
			pointermove: function(e) {
				var t = this.pointers, n = this.action;
				this.viewed && n && (e.preventDefault(), e.changedTouches ? B(e.changedTouches, function(e) {
					V(t[e.identifier] || {}, tt(e, !0));
				}) : V(t[e.pointerId || 0] || {}, tt(e, !0)), this.change(e));
			},
			pointerup: function(e) {
				var t = this, n = this.options, r = this.action, i = this.pointers, a;
				e.changedTouches ? B(e.changedTouches, function(e) {
					a = i[e.identifier], delete i[e.identifier];
				}) : (a = i[e.pointerId || 0], delete i[e.pointerId || 0]), r && (e.preventDefault(), n.transition && (r === g || r === v) && U(this.image, k), this.action = !1, p && r !== v && a && Date.now() - a.timeStamp < 500 && (clearTimeout(this.clickCanvasTimeout), clearTimeout(this.doubleClickImageTimeout), n.toggleOnDblclick && this.viewed && e.target === this.image ? this.imageClicked ? (this.imageClicked = !1, this.doubleClickImageTimeout = setTimeout(function() {
					q(t.image, oe, { originalEvent: e });
				}, 50)) : (this.imageClicked = !0, this.doubleClickImageTimeout = setTimeout(function() {
					t.imageClicked = !1;
				}, 500)) : (this.imageClicked = !1, n.backdrop && n.backdrop !== "static" && e.target === this.canvas && (this.clickCanvasTimeout = setTimeout(function() {
					q(t.canvas, A, { originalEvent: e });
				}, 50)))));
			},
			resize: function() {
				var e = this;
				if (this.isShown && !this.hiding && (this.fulled && (this.close(), this.initBody(), this.open()), this.initContainer(), this.initViewer(), this.renderViewer(), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage();
				}), this.played)) {
					if (this.options.fullscreen && this.fulled && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
						this.stop();
						return;
					}
					B(this.player.getElementsByTagName("img"), function(t) {
						K(t, le, e.loadImage.bind(e), { once: !0 }), q(t, le);
					});
				}
			},
			wheel: function(e) {
				var t = this;
				if (this.viewed && (e.preventDefault(), !this.wheeling)) {
					this.wheeling = !0, setTimeout(function() {
						t.wheeling = !1;
					}, 50);
					var n = Number(this.options.zoomRatio) || .1, r = 1;
					e.deltaY ? r = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? r = -e.wheelDelta / 120 : e.detail && (r = e.detail > 0 ? 1 : -1), this.zoom(-r * n, !0, null, e);
				}
			}
		}, ot = {
			show: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], t = this.element, n = this.options;
				if (n.inline || this.showing || this.isShown || this.showing) return this;
				if (!this.ready) return this.build(), this.ready && this.show(e), this;
				if (z(n.show) && K(t, _e, n.show, { once: !0 }), q(t, _e) === !1 || !this.ready) return this;
				this.hiding && this.transitioning.abort(), this.showing = !0, this.open();
				var r = this.viewer;
				if (W(r, re), r.setAttribute("role", "dialog"), r.setAttribute("aria-labelledby", this.title.id), r.setAttribute("aria-modal", !0), r.removeAttribute("aria-hidden"), n.transition && !e) {
					var i = this.shown.bind(this);
					this.transitioning = { abort: function() {
						G(r, P, i), W(r, w);
					} }, U(r, k), r.initialOffsetWidth = r.offsetWidth, K(r, P, i, { once: !0 }), U(r, w);
				} else U(r, w), this.shown();
				return this;
			},
			hide: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], n = this.element, r = this.options;
				if (r.inline || this.hiding || !(this.isShown || this.showing) || (z(r.hide) && K(n, ye, r.hide, { once: !0 }), q(n, ye) === !1)) return this;
				this.showing && this.transitioning.abort(), this.hiding = !0, this.played ? this.stop() : this.viewing && this.viewing.abort();
				var i = this.viewer, a = this.image, o = function() {
					W(i, w), e.hidden();
				};
				if (r.transition && !t) {
					var s = function(t) {
						t && t.target === i && (G(i, P, s), e.hidden());
					}, c = function() {
						Ve(i, k) ? (K(i, P, s), W(i, w)) : o();
					};
					this.transitioning = { abort: function() {
						e.viewed && Ve(a, k) ? G(a, P, c) : Ve(i, k) && G(i, P, s);
					} }, this.viewed && Ve(a, k) ? (K(a, P, c, { once: !0 }), this.zoomTo(0, !1, null, null, !0)) : c();
				} else o();
				return this;
			},
			view: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.initialViewIndex;
				if (t = Number(t) || 0, this.hiding || this.played || t < 0 || t >= this.length || this.viewed && t === this.index) return this;
				if (!this.isShown) return this.index = t, this.show();
				this.viewing && this.viewing.abort();
				var n = this.element, r = this.options, i = this.title, a = this.canvas, o = this.items[t], s = o.querySelector("img"), c = Ge(s, "originalUrl"), l = s.getAttribute("alt"), u = document.createElement("img");
				if (B(r.inheritedAttributes, function(e) {
					var t = s.getAttribute(e);
					t !== null && u.setAttribute(e, t);
				}), u.src = c, u.alt = l, z(r.view) && K(n, F, r.view, { once: !0 }), q(n, F, {
					originalImage: this.images[t],
					index: t,
					image: u
				}) === !1 || !this.isShown || this.hiding || this.played) return this;
				var d = this.items[this.index];
				d && (W(d, y), d.removeAttribute("aria-selected")), U(o, y), o.setAttribute("aria-selected", !0), r.focus && o.focus(), this.image = u, this.viewed = !1, this.index = t, this.imageData = {}, U(u, T), r.loading && U(a, ae), a.innerHTML = "", a.appendChild(u), this.renderList(), i.innerHTML = "";
				var f = function() {
					var t = e.imageData, n = Array.isArray(r.title) ? r.title[1] : r.title;
					i.innerHTML = Be(z(n) ? n.call(e, u, t) : `${l} (${t.naturalWidth} × ${t.naturalHeight})`);
				}, p, m;
				return K(n, xe, f, { once: !0 }), this.viewing = { abort: function() {
					G(n, xe, f), u.complete ? e.imageRendering ? e.imageRendering.abort() : e.imageInitializing && e.imageInitializing.abort() : (u.src = "", G(u, le, p), e.timeout && clearTimeout(e.timeout));
				} }, u.complete ? this.load() : (K(u, le, p = function() {
					G(u, ue, m), e.load();
				}, { once: !0 }), K(u, ue, m = function() {
					G(u, le, p), e.timeout &&= (clearTimeout(e.timeout), !1), W(u, T), r.loading && W(e.canvas, ae);
				}, { once: !0 }), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function() {
					W(u, T), e.timeout = !1;
				}, 1e3)), this;
			},
			prev: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], t = this.index - 1;
				return t < 0 && (t = e ? this.length - 1 : 0), this.view(t), this;
			},
			next: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], t = this.length - 1, n = this.index + 1;
				return n > t && (n = e ? 0 : t), this.view(n), this;
			},
			move: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData;
				return this.moveTo(Fe(e) ? e : n.x + Number(e), Fe(t) ? t : n.y + Number(t)), this;
			},
			moveTo: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, i = this.element, a = this.options, o = this.imageData;
				if (e = Number(e), n = Number(n), this.viewed && !this.played && a.movable) {
					var s = o.x, c = o.y, l = !1;
					if (R(e) ? l = !0 : e = s, R(n) ? l = !0 : n = c, l) {
						if (z(a.move) && K(i, Se, a.move, { once: !0 }), q(i, Se, {
							x: e,
							y: n,
							oldX: s,
							oldY: c,
							originalEvent: r
						}) === !1) return this;
						o.x = e, o.y = n, o.left = e, o.top = n, this.moving = !0, this.renderImage(function() {
							t.moving = !1, z(a.moved) && K(i, Ce, a.moved, { once: !0 }), q(i, Ce, {
								x: e,
								y: n,
								oldX: s,
								oldY: c,
								originalEvent: r
							}, { cancelable: !1 });
						});
					}
				}
				return this;
			},
			rotate: function(e) {
				return this.rotateTo((this.imageData.rotate || 0) + Number(e)), this;
			},
			rotateTo: function(e) {
				var t = this, n = this.element, r = this.options, i = this.imageData;
				if (e = Number(e), R(e) && this.viewed && !this.played && r.rotatable) {
					var a = i.rotate;
					if (z(r.rotate) && K(n, we, r.rotate, { once: !0 }), q(n, we, {
						degree: e,
						oldDegree: a
					}) === !1) return this;
					i.rotate = e, this.rotating = !0, this.renderImage(function() {
						t.rotating = !1, z(r.rotated) && K(n, Te, r.rotated, { once: !0 }), q(n, Te, {
							degree: e,
							oldDegree: a
						}, { cancelable: !1 });
					});
				}
				return this;
			},
			scaleX: function(e) {
				return this.scale(e, this.imageData.scaleY), this;
			},
			scaleY: function(e) {
				return this.scale(this.imageData.scaleX, e), this;
			},
			scale: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = this.element, i = this.options, a = this.imageData;
				if (e = Number(e), n = Number(n), this.viewed && !this.played && i.scalable) {
					var o = a.scaleX, s = a.scaleY, c = !1;
					if (R(e) ? c = !0 : e = o, R(n) ? c = !0 : n = s, c) {
						if (z(i.scale) && K(r, Ee, i.scale, { once: !0 }), q(r, Ee, {
							scaleX: e,
							scaleY: n,
							oldScaleX: o,
							oldScaleY: s
						}) === !1) return this;
						a.scaleX = e, a.scaleY = n, this.scaling = !0, this.renderImage(function() {
							t.scaling = !1, z(i.scaled) && K(r, I, i.scaled, { once: !0 }), q(r, I, {
								scaleX: e,
								scaleY: n,
								oldScaleX: o,
								oldScaleY: s
							}, { cancelable: !1 });
						});
					}
				}
				return this;
			},
			zoom: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, i = this.imageData;
				return e = Number(e), e = e < 0 ? 1 / (1 - e) : 1 + e, this.zoomTo(i.width * e / i.naturalWidth, t, n, r), this;
			},
			zoomTo: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, a = arguments.length > 4 && arguments[4] !== void 0 && arguments[4], o = this.element, s = this.options, c = this.pointers, l = this.imageData, u = l.x, d = l.y, f = l.width, p = l.height, m = l.naturalWidth, h = l.naturalHeight;
				if (e = Math.max(0, e), R(e) && this.viewed && !this.played && (a || s.zoomable)) {
					if (!a) {
						var g = Math.max(.01, s.minZoomRatio), _ = Math.min(100, s.maxZoomRatio);
						e = Math.min(Math.max(e, g), _);
					}
					if (i) switch (i.type) {
						case "wheel":
							s.zoomRatio >= .055 && e > .95 && e < 1.05 && (e = 1);
							break;
						case "pointermove":
						case "touchmove":
						case "mousemove": e > .99 && e < 1.01 && (e = 1);
					}
					var v = m * e, y = h * e, b = v - f, x = y - p, ee = l.ratio;
					if (z(s.zoom) && K(o, L, s.zoom, { once: !0 }), q(o, L, {
						ratio: e,
						oldRatio: ee,
						originalEvent: i
					}) === !1) return this;
					if (this.zooming = !0, i) {
						var te = Je(this.viewer), ne = c && Object.keys(c).length > 0 ? nt(c) : {
							pageX: i.pageX,
							pageY: i.pageY
						};
						l.x -= b * ((ne.pageX - te.left - u) / f), l.y -= x * ((ne.pageY - te.top - d) / p);
					} else Re(r) && R(r.x) && R(r.y) ? (l.x -= b * ((r.x - u) / f), l.y -= x * ((r.y - d) / p)) : (l.x -= b / 2, l.y -= x / 2);
					l.left = l.x, l.top = l.y, l.width = v, l.height = y, l.oldRatio = ee, l.ratio = e, this.renderImage(function() {
						t.zooming = !1, z(s.zoomed) && K(o, De, s.zoomed, { once: !0 }), q(o, De, {
							ratio: e,
							oldRatio: ee,
							originalEvent: i
						}, { cancelable: !1 });
					}), n && this.tooltip();
				}
				return this;
			},
			play: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
				if (!this.isShown || this.played) return this;
				var n = this.element, r = this.options;
				if (z(r.play) && K(n, Oe, r.play, { once: !0 }), q(n, Oe) === !1) return this;
				var i = this.player, a = this.loadImage.bind(this), o = [], s = 0, c = 0;
				if (this.played = !0, this.onLoadWhenPlay = a, t && this.requestFullscreen(t), U(i, O), B(this.items, function(e, t) {
					var n = e.querySelector("img"), l = document.createElement("img");
					l.src = Ge(n, "originalUrl"), l.alt = n.getAttribute("alt"), l.referrerPolicy = n.referrerPolicy, s += 1, U(l, x), He(l, k, r.transition), Ve(e, y) && (U(l, w), c = t), o.push(l), K(l, le, a, { once: !0 }), i.appendChild(l);
				}), R(r.interval) && r.interval > 0) {
					var l = function() {
						clearTimeout(e.playing.timeout), W(o[c], w), --c, c = c >= 0 ? c : s - 1, U(o[c], w), e.playing.timeout = setTimeout(l, r.interval);
					}, u = function() {
						clearTimeout(e.playing.timeout), W(o[c], w), c += 1, c = c < s ? c : 0, U(o[c], w), e.playing.timeout = setTimeout(u, r.interval);
					};
					s > 1 && (this.playing = {
						prev: l,
						next: u,
						timeout: setTimeout(u, r.interval)
					});
				}
				return this;
			},
			stop: function() {
				var e = this;
				if (!this.played) return this;
				var t = this.element, n = this.options;
				if (z(n.stop) && K(t, ke, n.stop, { once: !0 }), q(t, ke) === !1) return this;
				var r = this.player;
				return clearTimeout(this.playing.timeout), this.playing = !1, this.played = !1, B(r.getElementsByTagName("img"), function(t) {
					G(t, le, e.onLoadWhenPlay);
				}), W(r, O), r.innerHTML = "", this.exitFullscreen(), this;
			},
			full: function() {
				var e = this, t = this.options, n = this.viewer, r = this.image, i = this.list;
				return !this.isShown || this.played || this.fulled || !t.inline || (this.fulled = !0, this.open(), U(this.button, ne), t.transition && (W(i, k), this.viewed && W(r, k)), U(n, ee), n.setAttribute("role", "dialog"), n.setAttribute("aria-labelledby", this.title.id), n.setAttribute("aria-modal", !0), n.removeAttribute("style"), H(n, { zIndex: t.zIndex }), t.focus && this.enforceFocus(), this.initContainer(), this.viewerData = V({}, this.containerData), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage(function() {
						t.transition && setTimeout(function() {
							U(r, k), U(i, k);
						}, 0);
					});
				})), this;
			},
			exit: function() {
				var e = this, t = this.options, n = this.viewer, r = this.image, i = this.list;
				return !this.isShown || this.played || !this.fulled || !t.inline || (this.fulled = !1, this.close(), W(this.button, ne), t.transition && (W(i, k), this.viewed && W(r, k)), t.focus && this.clearEnforceFocus(), n.removeAttribute("role"), n.removeAttribute("aria-labelledby"), n.removeAttribute("aria-modal"), W(n, ee), H(n, { zIndex: t.zIndexInline }), this.viewerData = V({}, this.parentData), this.renderViewer(), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage(function() {
						t.transition && setTimeout(function() {
							U(r, k), U(i, k);
						}, 0);
					});
				})), this;
			},
			tooltip: function() {
				var e = this, t = this.options, n = this.tooltipBox, r = this.imageData;
				return !this.viewed || this.played || !t.tooltip || (n.textContent = `${Math.round(r.ratio * 100)}%`, this.tooltipping ? clearTimeout(this.tooltipping) : t.transition ? (this.fading && q(n, P), U(n, O), U(n, x), U(n, k), n.removeAttribute("aria-hidden"), n.initialOffsetWidth = n.offsetWidth, U(n, w)) : (U(n, O), n.removeAttribute("aria-hidden")), this.tooltipping = setTimeout(function() {
					t.transition ? (K(n, P, function() {
						W(n, O), W(n, x), W(n, k), n.setAttribute("aria-hidden", !0), e.fading = !1;
					}, { once: !0 }), W(n, w), e.fading = !0) : (W(n, O), n.setAttribute("aria-hidden", !0)), e.tooltipping = !1;
				}, 1e3)), this;
			},
			toggle: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
				return this.imageData.ratio === 1 ? this.zoomTo(this.imageData.oldRatio, !0, null, e) : this.zoomTo(1, !0, null, e), this;
			},
			reset: function() {
				return this.viewed && !this.played && (this.imageData = V({}, this.initialImageData), this.renderImage()), this;
			},
			update: function() {
				var e = this, t = this.element, n = this.options, r = this.isImg;
				if (r && !t.parentNode) return this.destroy();
				var i = [];
				if (B(r ? [t] : t.querySelectorAll("img"), function(t) {
					z(n.filter) ? n.filter.call(e, t) && i.push(t) : e.getImageURL(t) && i.push(t);
				}), !i.length) return this;
				if (this.images = i, this.length = i.length, this.ready) {
					var a = [];
					if (B(this.items, function(e, t) {
						var n = e.querySelector("img"), r = i[t];
						r && n ? (r.src !== n.src || r.alt !== n.alt) && a.push(t) : a.push(t);
					}), H(this.list, { width: "auto" }), this.initList(), this.isShown) {
						if (this.length) {
							if (this.viewed) {
								var o = a.indexOf(this.index);
								if (o >= 0) this.viewed = !1, this.view(Math.max(Math.min(this.index - o, this.length - 1), 0));
								else {
									var s = this.items[this.index];
									U(s, y), s.setAttribute("aria-selected", !0);
								}
							}
						} else this.image = null, this.viewed = !1, this.index = 0, this.imageData = {}, this.canvas.innerHTML = "", this.title.innerHTML = "";
					}
				} else this.build();
				return this;
			},
			destroy: function() {
				var e = this.element, t = this.options;
				return e[h] && (this.destroyed = !0, this.ready ? (this.played && this.stop(), t.inline ? (this.fulled && this.exit(), this.unbind()) : this.isShown ? (this.viewing && (this.imageRendering ? this.imageRendering.abort() : this.imageInitializing && this.imageInitializing.abort()), this.hiding && this.transitioning.abort(), this.hidden()) : this.showing && (this.transitioning.abort(), this.hidden()), this.ready = !1, this.viewer.parentNode.removeChild(this.viewer)) : t.inline && (this.delaying ? this.delaying.abort() : this.initializing && this.initializing.abort()), t.inline || G(e, A, this.onStart), e[h] = void 0), this;
			}
		}, st = {
			getImageURL: function(e) {
				var t = this.options.url;
				return t = Ne(t) ? e.getAttribute(t) : z(t) ? t.call(this, e) : "", t;
			},
			enforceFocus: function() {
				var e = this;
				this.clearEnforceFocus(), K(document, se, this.onFocusin = function(t) {
					var n = e.viewer, r = t.target;
					if (!(r === document || r === n || n.contains(r))) {
						for (; r;) {
							if (r.getAttribute("tabindex") !== null || r.getAttribute("aria-modal") === "true") return;
							r = r.parentElement;
						}
						n.focus();
					}
				});
			},
			clearEnforceFocus: function() {
				this.onFocusin &&= (G(document, se, this.onFocusin), null);
			},
			open: function() {
				var e = this.body;
				U(e, D), this.scrollbarWidth > 0 && (e.style.paddingRight = `${this.scrollbarWidth + (parseFloat(this.initialBodyComputedPaddingRight) || 0)}px`);
			},
			close: function() {
				var e = this.body;
				W(e, D), this.scrollbarWidth > 0 && (e.style.paddingRight = this.initialBodyPaddingRight);
			},
			shown: function() {
				var e = this.element, t = this.options, n = this.viewer;
				this.fulled = !0, this.isShown = !0, this.render(), this.bind(), this.showing = !1, t.focus && (n.focus(), this.enforceFocus()), z(t.shown) && K(e, ve, t.shown, { once: !0 }), q(e, ve) !== !1 && this.ready && this.isShown && !this.hiding && this.view(this.index);
			},
			hidden: function() {
				var e = this.element, t = this.options, n = this.viewer;
				t.fucus && this.clearEnforceFocus(), this.close(), this.unbind(), U(n, re), n.removeAttribute("role"), n.removeAttribute("aria-labelledby"), n.removeAttribute("aria-modal"), n.setAttribute("aria-hidden", !0), this.resetList(), this.resetImage(), this.fulled = !1, this.viewed = !1, this.isShown = !1, this.hiding = !1, this.destroyed || (z(t.hidden) && K(e, be, t.hidden, { once: !0 }), q(e, be, null, { cancelable: !1 }));
			},
			requestFullscreen: function(e) {
				var t = this.element.ownerDocument;
				if (this.fulled && !(t.fullscreenElement || t.webkitFullscreenElement || t.mozFullScreenElement || t.msFullscreenElement)) {
					var n = t.documentElement;
					n.requestFullscreen ? Re(e) ? n.requestFullscreen(e) : n.requestFullscreen() : n.webkitRequestFullscreen ? n.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.msRequestFullscreen && n.msRequestFullscreen();
				}
			},
			exitFullscreen: function() {
				var e = this.element.ownerDocument;
				this.fulled && (e.fullscreenElement || e.webkitFullscreenElement || e.mozFullScreenElement || e.msFullscreenElement) && (e.exitFullscreen ? e.exitFullscreen() : e.webkitExitFullscreen ? e.webkitExitFullscreen() : e.mozCancelFullScreen ? e.mozCancelFullScreen() : e.msExitFullscreen && e.msExitFullscreen());
			},
			change: function(e) {
				var t = this.options, n = this.pointers, r = n[Object.keys(n)[0]];
				if (r) {
					var i = r.endX - r.startX, a = r.endY - r.startY;
					switch (this.action) {
						case g:
							(i !== 0 || a !== 0) && (this.pointerMoved = !0, this.move(i, a, e));
							break;
						case v:
							this.zoom(et(n), !1, null, e);
							break;
						case _:
							this.action = "switched";
							var o = Math.abs(i);
							o > 1 && o > Math.abs(a) && (this.pointers = {}, i > 1 ? this.prev(t.loop) : i < -1 && this.next(t.loop));
					}
					B(n, function(e) {
						e.startX = e.endX, e.startY = e.endY;
					});
				}
			},
			isSwitchable: function() {
				var e = this.imageData, t = this.viewerData;
				return this.length > 1 && e.x >= 0 && e.y >= 0 && e.width <= t.width && e.height <= t.height;
			}
		}, ct = f.Viewer, J = function(e) {
			return function() {
				return e += 1, e;
			};
		}(-1), lt = /*#__PURE__*/ function() {
			function t(n) {
				var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				if (e(this, t), !n || n.nodeType !== 1) throw Error("The first argument is required and must be an element.");
				this.element = n, this.options = V({}, l, Re(r) && r), this.action = !1, this.fading = !1, this.fulled = !1, this.hiding = !1, this.imageClicked = !1, this.imageData = {}, this.index = this.options.initialViewIndex, this.isImg = !1, this.isShown = !1, this.length = 0, this.moving = !1, this.played = !1, this.playing = !1, this.pointers = {}, this.ready = !1, this.rotating = !1, this.scaling = !1, this.showing = !1, this.timeout = !1, this.tooltipping = !1, this.viewed = !1, this.viewing = !1, this.wheeling = !1, this.zooming = !1, this.pointerMoved = !1, this.id = J(), this.init();
			}
			return n(t, [{
				key: "init",
				value: function() {
					var e = this, t = this.element, n = this.options;
					if (!t[h]) {
						t[h] = this, n.focus && !n.keyboard && (n.focus = !1);
						var r = t.localName === "img", i = [];
						if (B(r ? [t] : t.querySelectorAll("img"), function(t) {
							z(n.filter) ? n.filter.call(e, t) && i.push(t) : e.getImageURL(t) && i.push(t);
						}), this.isImg = r, this.length = i.length, this.images = i, this.initBody(), Fe(document.createElement(h).style.transition) && (n.transition = !1), n.inline) {
							var a = 0, o = function() {
								if (a += 1, a === e.length) {
									var t;
									e.initializing = !1, e.delaying = { abort: function() {
										clearTimeout(t);
									} }, t = setTimeout(function() {
										e.delaying = !1, e.build();
									}, 0);
								}
							};
							this.initializing = { abort: function() {
								B(i, function(e) {
									e.complete || (G(e, le, o), G(e, ue, o));
								});
							} }, B(i, function(e) {
								if (e.complete) o();
								else {
									var t, n;
									K(e, le, t = function() {
										G(e, ue, n), o();
									}, { once: !0 }), K(e, ue, n = function() {
										G(e, le, t), o();
									}, { once: !0 });
								}
							});
						} else K(t, A, this.onStart = function(t) {
							var r = t.target;
							r.localName === "img" && (!z(n.filter) || n.filter.call(e, r)) && e.view(e.images.indexOf(r));
						});
					}
				}
			}, {
				key: "build",
				value: function() {
					if (!this.ready) {
						var e = this.element, t = this.options, n = e.parentNode, r = document.createElement("div");
						r.innerHTML = u;
						var i = r.querySelector(`.${h}-container`), a = i.querySelector(`.${h}-title`), o = i.querySelector(`.${h}-toolbar`), s = i.querySelector(`.${h}-navbar`), c = i.querySelector(`.${h}-button`), l = i.querySelector(`.${h}-canvas`);
						if (this.parent = n, this.viewer = i, this.title = a, this.toolbar = o, this.navbar = s, this.button = c, this.canvas = l, this.footer = i.querySelector(`.${h}-footer`), this.tooltipBox = i.querySelector(`.${h}-tooltip`), this.player = i.querySelector(`.${h}-player`), this.list = i.querySelector(`.${h}-list`), i.id = `${h}${this.id}`, a.id = `${h}Title${this.id}`, U(a, t.title ? $e(Array.isArray(t.title) ? t.title[0] : t.title) : re), U(s, t.navbar ? $e(t.navbar) : re), He(c, re, !t.button), t.keyboard && c.setAttribute("tabindex", 0), t.backdrop && (U(i, `${h}-backdrop`), !t.inline && t.backdrop !== "static" && Ke(l, Ae, "hide")), Ne(t.className) && t.className && t.className.split(je).forEach(function(e) {
							U(i, e);
						}), t.toolbar) {
							var d = document.createElement("ul"), f = Re(t.toolbar), p = Me.slice(0, 3), m = Me.slice(7, 9), g = Me.slice(9);
							f || U(o, $e(t.toolbar)), B(f ? t.toolbar : Me, function(e, n) {
								var r = f && Re(e), i = f ? We(n) : e, a = r && !Fe(e.show) ? e.show : e;
								if (!(!a || !t.zoomable && p.indexOf(i) !== -1 || !t.rotatable && m.indexOf(i) !== -1 || !t.scalable && g.indexOf(i) !== -1)) {
									var o = r && !Fe(e.size) ? e.size : e, s = r && !Fe(e.click) ? e.click : e, c = document.createElement("li");
									t.keyboard && c.setAttribute("tabindex", 0), c.setAttribute("role", "button"), U(c, `${h}-${i}`), z(s) || Ke(c, Ae, i), R(a) && U(c, $e(a)), ["small", "large"].indexOf(o) === -1 ? i === "play" && U(c, `${h}-large`) : U(c, `${h}-${o}`), z(s) && K(c, A, s), d.appendChild(c);
								}
							}), o.appendChild(d);
						} else U(o, re);
						if (!t.rotatable) {
							var _ = o.querySelectorAll("li[class*=\"rotate\"]");
							U(_, T), B(_, function(e) {
								o.appendChild(e);
							});
						}
						if (t.inline) U(c, te), H(i, { zIndex: t.zIndexInline }), window.getComputedStyle(n).position === "static" && H(n, { position: "relative" }), n.insertBefore(i, e.nextSibling);
						else {
							U(c, b), U(i, ee), U(i, x), U(i, re), H(i, { zIndex: t.zIndex });
							var v = t.container;
							Ne(v) && (v = e.ownerDocument.querySelector(v)), v ||= this.body, v.appendChild(i);
						}
						t.inline && (this.render(), this.bind(), this.isShown = !0), this.ready = !0, z(t.ready) && K(e, ge, t.ready, { once: !0 }), q(e, ge) === !1 ? this.ready = !1 : this.ready && t.inline && this.view(this.index);
					}
				}
			}], [{
				key: "noConflict",
				value: function() {
					return window.Viewer = ct, t;
				}
			}, {
				key: "setDefaults",
				value: function(e) {
					V(l, Re(e) && e);
				}
			}]);
		}();
		return V(lt.prototype, rt, it, at, ot, st), lt;
	}));
})))(), 1), wd = ["observe", "rebuild"], Td = ["observe", "rebuild"];
function Ed(e, t) {
	if (e == null) return {};
	var n, r, i = Dd(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Dd(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Od(e) {
	return jd(e) || Ad(e) || Vd(e) || kd();
}
function kd() {
	throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ad(e) {
	if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function jd(e) {
	if (Array.isArray(e)) return Hd(e);
}
function Md(e, t) {
	return Fd(e) || Pd(e, t) || Vd(e, t) || Nd();
}
function Nd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Pd(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Fd(e) {
	if (Array.isArray(e)) return e;
}
function Id(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function $(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Id(Object(n), !0).forEach(function(t) {
			Ld(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Id(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ld(e, t, n) {
	return (t = Rd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Rd(e) {
	var t = zd(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function zd(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Bd(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = Vd(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, o, s = !0;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			s = !0;
			var e = n.next();
			return e.done ? { done: !0 } : {
				value: e.value,
				done: s = !1
			};
		},
		e: function(e) {
			a = !0, o = e;
		},
		f: function() {
			try {
				s || n.return == null || n.return();
			} finally {
				if (a) throw o;
			}
		}
	};
}
function Vd(e, t) {
	if (e) {
		if (typeof e == "string") return Hd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Hd(e, t) : void 0;
	}
}
function Hd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var Ud = 0;
function Wd() {
	var e, t = "", n = [], r = [];
	function i() {
		var i = Bd(r.splice(0)), a;
		try {
			for (i.s(); !(a = i.n()).done;) {
				var o = a.value;
				o();
			}
		} catch (e) {
			i.e(e);
		} finally {
			i.f();
		}
		e = void 0, t = "", n = [];
	}
	function a(a, o) {
		var s = a?.toolbar, c = ["toolbar", "toolbar-append"].map(function(e) {
			return +o(e);
		}).join("");
		if (s === e && t === c || (i(), e = s, t = c, !e)) return n;
		var l = e.querySelector("ul");
		if (!l) return n;
		function u(e, t) {
			var i = e === "toolbar-append" && t.tagName === "UL", a = document.createElement(i ? "li" : "span");
			a.className = `v-viewer-${e}-slot`, a.style.cssText = "display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;gap:4px;color:#fff;font-size:14px;line-height:1.4", i && (a.style.cssText += ";width:auto;height:auto;overflow:visible;background:none;border-radius:0;float:left;margin:0 0 0 4px;padding:0"), t.appendChild(a);
			var o = function(e) {
				return e.stopPropagation();
			}, s = function(e) {
				var t = e.target;
				(e.key === "Enter" || e.key === " " || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) && e.stopPropagation();
			};
			a.addEventListener("click", o), a.addEventListener("keydown", s);
			for (var c = 0, l = [
				"pointerdown",
				"mousedown",
				"touchstart",
				"dblclick"
			]; c < l.length; c++) {
				var u = l[c];
				a.addEventListener(u, o);
			}
			r.push(function() {
				a.removeEventListener("click", o), a.removeEventListener("keydown", s);
				for (var e = 0, t = [
					"pointerdown",
					"mousedown",
					"touchstart",
					"dblclick"
				]; e < t.length; e++) {
					var n = t[e];
					a.removeEventListener(n, o);
				}
				a.remove();
			}), n.push({
				key: ++Ud,
				slot: e,
				target: a
			});
		}
		if (o("toolbar")) {
			var d = l.style.display;
			l.style.display = "none", r.push(function() {
				l.style.display = d;
			}), u("toolbar", e);
		}
		if (o("toolbar-append") && u("toolbar-append", o("toolbar") ? e : l), n.length && typeof ResizeObserver < "u") {
			var f = -1, p = -1, m = new ResizeObserver(function() {
				var t;
				!e || e.offsetWidth === f && e.offsetHeight === p || (f = e.offsetWidth, p = e.offsetHeight, (t = a.resize) == null || t.call(a));
			});
			m.observe(e), r.push(function() {
				return m.disconnect();
			});
		}
		return n;
	}
	return {
		sync: a,
		clear: i
	};
}
function Gd(e) {
	var t = e;
	return {
		image: t != null && t.viewed ? t.image : void 0,
		index: t?.index ?? 0
	};
}
var Kd = [
	"ready",
	"show",
	"shown",
	"hide",
	"hidden",
	"view",
	"viewed",
	"move",
	"moved",
	"rotate",
	"rotated",
	"scale",
	"scaled",
	"zoom",
	"zoomed",
	"play",
	"playing",
	"stop"
], qd = {
	backdrop: {
		type: [Boolean, String],
		default: void 0
	},
	button: {
		type: Boolean,
		default: void 0
	},
	className: {
		type: String,
		default: void 0
	},
	container: {
		type: [String, Object],
		default: void 0
	},
	filter: {
		type: Function,
		default: void 0
	},
	fullscreen: {
		type: [Boolean, Object],
		default: void 0
	},
	focus: {
		type: Boolean,
		default: void 0
	},
	inheritedAttributes: {
		type: Array,
		default: void 0
	},
	initialCoverage: {
		type: Number,
		default: void 0
	},
	initialViewIndex: {
		type: Number,
		default: void 0
	},
	inline: {
		type: Boolean,
		default: void 0
	},
	autoplay: {
		type: Boolean,
		default: void 0
	},
	interval: {
		type: Number,
		default: void 0
	},
	keyboard: {
		type: Boolean,
		default: void 0
	},
	loading: {
		type: Boolean,
		default: void 0
	},
	loop: {
		type: Boolean,
		default: void 0
	},
	magnifier: {
		type: [Boolean, Object],
		default: void 0
	},
	maxZoomRatio: {
		type: [Number, Function],
		default: void 0
	},
	minHeight: {
		type: Number,
		default: void 0
	},
	minWidth: {
		type: Number,
		default: void 0
	},
	minZoomRatio: {
		type: [Number, Function],
		default: void 0
	},
	movable: {
		type: Boolean,
		default: void 0
	},
	navbar: {
		type: [
			Boolean,
			Number,
			String,
			Object
		],
		default: void 0
	},
	navigation: {
		type: [
			Boolean,
			Number,
			Object
		],
		default: void 0
	},
	preload: {
		type: Boolean,
		default: void 0
	},
	rotatable: {
		type: Boolean,
		default: void 0
	},
	rotateOnGesture: {
		type: Boolean,
		default: void 0
	},
	rotateOnTouch: {
		type: Boolean,
		default: void 0
	},
	scalable: {
		type: Boolean,
		default: void 0
	},
	slideOnTouch: {
		type: Boolean,
		default: void 0
	},
	slideOnWheel: {
		type: [Boolean, String],
		default: void 0
	},
	title: {
		type: [
			Boolean,
			Number,
			Function,
			Array
		],
		default: void 0
	},
	toggleOnDblclick: {
		type: Boolean,
		default: void 0
	},
	toolbar: {
		type: [
			Boolean,
			Number,
			Object
		],
		default: void 0
	},
	tooltip: {
		type: Boolean,
		default: void 0
	},
	transition: {
		type: [Boolean, Object],
		default: void 0
	},
	url: {
		type: [String, Function],
		default: void 0
	},
	zIndex: {
		type: Number,
		default: void 0
	},
	zIndexInline: {
		type: Number,
		default: void 0
	},
	zoomOnGesture: {
		type: Boolean,
		default: void 0
	},
	zoomOnTouch: {
		type: Boolean,
		default: void 0
	},
	zoomOnWheel: {
		type: [Boolean, String],
		default: void 0
	},
	zoomRatio: {
		type: Number,
		default: void 0
	},
	zoomable: {
		type: Boolean,
		default: void 0
	}
};
function Jd(e) {
	for (var t = $({}, e.options), n = 0, r = Object.keys(qd); n < r.length; n++) {
		var i = r[n];
		e[i] !== void 0 && (t[i] = e[i]);
	}
	return t;
}
function Yd(e, t) {
	var n = Kd.map(function(n) {
		var r = function(r) {
			r.target === e && t(n, r);
		};
		return e.addEventListener(n, r), function() {
			return e.removeEventListener(n, r);
		};
	});
	return function() {
		return n.forEach(function(e) {
			return e();
		});
	};
}
var Xd = [
	"show",
	"hide",
	"view",
	"prev",
	"next",
	"move",
	"moveTo",
	"zoom",
	"zoomTo",
	"rotate",
	"rotateTo",
	"scale",
	"scaleX",
	"scaleY",
	"play",
	"stop",
	"full",
	"exit",
	"reset",
	"toggle"
];
function Zd(e) {
	return $($({}, Object.fromEntries(Xd.map(function(t) {
		return [t, function() {
			var n, r = e(), i = [...arguments];
			return r == null || (n = r[t]) == null ? void 0 : n.apply(r, i);
		}];
	}))), {}, { showTooltip: function() {
		return e()?.tooltip();
	} });
}
function Qd(e) {
	var t = (e.tagName === "IMG" ? [e] : Array.from(e.querySelectorAll("img"))).filter(function(e) {
		return !e.closest(".viewer-container");
	});
	return {
		sources: t,
		attributes: JSON.stringify(t.map(function(e) {
			return Array.from(e.attributes).map(function(e) {
				return [e.name, e.value];
			}).sort(function(e, t) {
				var n = Md(e, 1)[0], r = Md(t, 1)[0];
				return n.localeCompare(r);
			});
		}))
	};
}
function $d(e) {
	if (e.nodeType !== 1) return !1;
	var t = e;
	return t.closest(".viewer-container") ? !1 : t.tagName === "IMG" || Array.from(t.querySelectorAll("img")).some(function(e) {
		return !e.closest(".viewer-container");
	});
}
function ef(e) {
	return e.type === "attributes" ? e.target.tagName === "IMG" && !e.target.closest(".viewer-container") : [].concat(Od(Array.from(e.addedNodes)), Od(Array.from(e.removedNodes))).some($d);
}
function tf(e) {
	var t = $({}, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}), n, r, i = Qd(e), a, o = 0, s = !1, c = t.onEvent ? Yd(e, function(e, n) {
		return t.onEvent?.call(t, e, n);
	}) : void 0;
	function l() {
		var r;
		(r = t.onDestroy) == null || r.call(t);
		var i = n;
		n = void 0, e.$viewer === i && delete e.$viewer, i?.destroy();
	}
	function u() {
		var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(e) {
			return (e = t.rebuild) != null && e;
		}(), o;
		if (!s) {
			d(), r?.disconnect();
			try {
				if (a && l(), n) n.update();
				else {
					n = new Cd.default(e, $({}, t.options));
					var c = n, u = c.build;
					c.build = function() {
						if (!this.destroyed) return u.call(this);
					};
				}
				e.$viewer = n, i = Qd(e);
			} finally {
				h();
			}
			return (o = t.onInit) == null || o.call(t, n), n;
		}
	}
	function d() {
		a !== void 0 && clearTimeout(a), a = void 0;
	}
	function f() {
		return typeof t.observe == "number" && Number.isFinite(t.observe) && t.observe >= 0 ? Math.min(t.observe, 2147483647) : 50;
	}
	function p() {
		s || t.observe === !1 || a !== void 0 || (o = Date.now(), m());
	}
	function m() {
		a = setTimeout(function() {
			if (a = void 0, !(s || t.observe === !1)) {
				var n = Qd(e);
				(n.attributes !== i.attributes || n.sources.length !== i.sources.length || n.sources.some(function(e, t) {
					return e !== i.sources[t];
				})) && u();
			}
		}, Math.max(0, f() - (Date.now() - o)));
	}
	function h() {
		r?.disconnect(), !(s || t.observe === !1 || typeof MutationObserver > "u") && (r ??= new MutationObserver(function(e) {
			e.some(ef) && p();
		}), r.observe(e, {
			attributes: !0,
			childList: !0,
			subtree: !0
		}));
	}
	function g(e) {
		var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
		if (!s) {
			if (t = $($({}, t), e), !("options" in e) && !("rebuild" in e) && "observe" in e) {
				var i = a !== void 0;
				return d(), h(), t.observe !== !1 && (i ? m() : p()), n;
			}
			return u(r);
		}
	}
	function _() {
		s = !0, d(), r?.disconnect();
		try {
			l();
		} finally {
			c?.();
		}
	}
	try {
		u();
	} catch (e) {
		throw _(), e;
	}
	return {
		get viewer() {
			return n;
		},
		refresh: u,
		configure: g,
		dispose: _
	};
}
function nf(e) {
	var t = e.images, n = e.options, r = n === void 0 ? {} : n;
	if (typeof document > "u") throw Error("v-viewer: showViewer must be called in a browser");
	var i = document.createElement("div");
	i.hidden = !0, i.className = "v-viewer-token";
	var a = Bd(t), o;
	try {
		for (a.s(); !(o = a.n()).done;) {
			for (var s = o.value, c = document.createElement("img"), l = typeof s == "string" ? { src: s } : s, u = 0, d = Object.entries(l); u < d.length; u++) {
				var f = Md(d[u], 2), p = f[0], m = f[1];
				/^on/i.test(p) || c.setAttribute(p, m);
			}
			i.appendChild(c);
		}
	} catch (e) {
		a.e(e);
	} finally {
		a.f();
	}
	document.body.appendChild(i);
	var h;
	try {
		h = new Cd.default(i, $($({}, rf(r)), {}, { inline: !1 }));
	} catch (e) {
		throw i.remove(), e;
	}
	var g = h.destroy.bind(h), _ = !1, v = function(e) {
		e.target === i && h.destroy();
	};
	h.destroy = function() {
		if (_) return h;
		_ = !0, i.removeEventListener("hidden", v);
		try {
			g();
		} finally {
			i.remove();
		}
		return h;
	}, i.addEventListener("hidden", v);
	try {
		h.show();
	} catch (e) {
		throw h.destroy(), e;
	}
	return h;
}
function rf(e) {
	return Array.isArray(e) ? e.map(rf) : e && Object.prototype.toString.call(e) === "[object Object]" ? Object.fromEntries(Object.entries(e).map(function(e) {
		var t = Md(e, 2), n = t[0], r = t[1];
		return [n, rf(r)];
	})) : e;
}
function af(e, t) {
	if (e === t) return !0;
	if (!e || !t || typeof e != "object" || typeof t != "object") return !1;
	var n = function(e) {
		return Array.isArray(e) || Object.prototype.toString.call(e) === "[object Object]";
	};
	if (!n(e) || !n(t)) return !1;
	var r = Object.keys(e);
	return r.length === Object.keys(t).length && r.every(function(n) {
		return Object.prototype.hasOwnProperty.call(t, n) && af(e[n], t[n]);
	});
}
function of() {
	var e = /* @__PURE__ */ new WeakMap();
	return {
		mount: function(t, n) {
			var r;
			(r = e.get(t)) == null || r.controller.dispose();
			var i = n.value ?? {}, a = i.observe, o = i.rebuild, s = Ed(i, wd), c = o ?? !!n.modifiers.rebuild;
			e.set(t, {
				options: rf(s),
				observe: a,
				rebuild: c,
				controller: tf(t, {
					options: s,
					rebuild: c,
					observe: a
				})
			});
		},
		update: function(t, n) {
			var r = e.get(t);
			if (r) {
				var i = n.value ?? {}, a = i.observe, o = i.rebuild, s = Ed(i, Td), c = o ?? !!n.modifiers.rebuild, l = !af(r.options, s);
				l || c !== r.rebuild ? r.controller.configure({
					options: s,
					rebuild: c,
					observe: a
				}, l || c) : a !== r.observe && r.controller.configure({ observe: a }), r.options = rf(s), r.observe = a, r.rebuild = c;
			}
		},
		unmount: function(t) {
			var n;
			(n = e.get(t)) == null || n.controller.dispose(), e.delete(t);
		}
	};
}
var sf = nf, cf = /* @__PURE__ */ new WeakMap(), lf = /* @__PURE__ */ new WeakMap();
function uf(e) {
	e.$viewer = void 0;
	var t = lf.get(e);
	if (t) {
		var n = Bd(t.portals.values()), r;
		try {
			for (n.s(); !(r = n.n()).done;) {
				var i = r.value;
				i.$destroy(), i.$el.remove();
			}
		} catch (e) {
			n.e(e);
		} finally {
			n.f();
		}
		t.portals.clear(), t.bridge.clear();
	}
}
function df(e) {
	var t = lf.get(e);
	if (t) {
		var n = t.bridge.sync(e.$viewer, function(t) {
			if (t === "toolbar") {
				var n, r = e, i = (n = e.$scopedSlots).toolbar?.call(n, $($({}, Zd(function() {
					return e.$viewer;
				})), {}, {
					update: function() {
						return r.update();
					},
					destroy: function() {
						return r.destroy();
					}
				}, Gd(e.$viewer))) || e.$slots.toolbar;
				return !!(i != null && i.some(function(e) {
					var t;
					return !e.isComment && (!!e.tag || !!((t = e.text) != null && t.trim()));
				}));
			}
			return !!e.$scopedSlots[t] || !!e.$slots[t];
		}), r = Bd(t.portals), i;
		try {
			for (r.s(); !(i = r.n()).done;) {
				var a = Md(i.value, 2), o = a[0], s = a[1];
				n.indexOf(o) === -1 && (s.$destroy(), s.$el.remove(), t.portals.delete(o));
			}
		} catch (e) {
			r.e(e);
		} finally {
			r.f();
		}
		var c = Bd(n), l;
		try {
			var u = function() {
				var n = l.value, r = t.portals.get(n);
				if (r) return r.$forceUpdate(), 1;
				var i = Zd(function() {
					return e.$viewer;
				}), a = new X({
					parent: e,
					render: function(t) {
						var r, a = e, o = $($({}, i), {}, {
							update: function() {
								return a.update();
							},
							destroy: function() {
								return a.destroy();
							}
						}, Gd(e.$viewer));
						return t("span", { style: { display: "contents" } }, (r = e.$scopedSlots)[n.slot]?.call(r, o) || e.$slots[n.slot]);
					}
				}).$mount();
				n.target.appendChild(a.$el), t.portals.set(n, a);
			};
			for (c.s(); !(l = c.n()).done;) if (u()) continue;
		} catch (e) {
			c.e(e);
		} finally {
			c.f();
		}
	}
}
var ff = Object.fromEntries(Xd.map(function(e) {
	return [e, function() {
		var t, n = this.$viewer, r = [...arguments];
		return n == null || (t = n[e]) == null ? void 0 : t.apply(n, r);
	}];
})), pf = X.extend({
	name: "Viewer",
	props: $($({}, qd), {}, {
		options: {
			type: Object,
			default: function() {
				return {};
			}
		},
		rebuild: Boolean,
		observe: {
			type: [Boolean, Number],
			default: !0
		}
	}),
	computed: { viewerOptions: function() {
		return Jd(this.$props);
	} },
	mounted: function() {
		this.createViewer();
	},
	updated: function() {
		df(this);
	},
	beforeDestroy: function() {
		this._viewerDisposed = !0, this.destroyViewer(), lf.delete(this);
	},
	watch: {
		observe: function(e) {
			var t;
			(t = cf.get(this)) == null || t.configure({ observe: e });
		},
		viewerOptions: {
			deep: !0,
			handler: function() {
				var e = this;
				this.$nextTick(function() {
					return e.rebuildViewer();
				});
			}
		},
		rebuild: function() {
			var e = this;
			this.$nextTick(function() {
				return e.changeViewer();
			});
		}
	},
	methods: $($({}, ff), {}, {
		showTooltip: function() {
			return this.$viewer?.tooltip();
		},
		update: function() {
			this.updateViewer();
		},
		destroy: function() {
			this.destroyViewer();
		},
		createViewer: function() {
			var e = this;
			cf.has(this) || this.$isServer || this._viewerDisposed || cf.set(this, tf(this.$el, {
				options: this.viewerOptions,
				rebuild: this.rebuild,
				observe: this.observe,
				onEvent: function(t, n) {
					df(e), e.$emit(t, n);
				},
				onDestroy: function() {
					return uf(e);
				},
				onInit: function(t) {
					e.$viewer = t, df(e);
				}
			}));
		},
		destroyViewer: function() {
			var e;
			(e = cf.get(this)) == null || e.dispose(), cf.delete(this), this.$viewer = void 0;
		},
		updateViewer: function() {
			cf.has(this) ? cf.get(this).refresh(!1) : this.createViewer();
		},
		rebuildViewer: function() {
			cf.has(this) ? cf.get(this).configure({
				options: this.viewerOptions,
				rebuild: this.rebuild
			}) : this.createViewer();
		},
		changeViewer: function() {
			var e;
			(e = cf.get(this)) == null || e.configure({ rebuild: this.rebuild }, this.rebuild);
		}
	}),
	beforeCreate: function() {
		lf.set(this, {
			bridge: Wd(),
			portals: /* @__PURE__ */ new Map()
		}), this._viewerDisposed = !1;
	},
	destroyed: function() {
		this._viewerDisposed = !0;
	},
	render: function(e) {
		var t;
		return e("div", (t = this.$scopedSlots).default?.call(t, { options: this.options }) || this.$slots.default);
	}
}), mf = of(), hf = /* @__PURE__ */ new WeakMap(), gf = function(e, t, n) {
	var r;
	if ((r = hf.get(e)) == null || r(), n.context) {
		var i = n.context.$watch(function() {
			return t.value;
		}, function() {
			return mf.update(e, t);
		}, { deep: !0 });
		hf.set(e, i);
	}
}, _f = {
	inserted: function(e, t, n, r) {
		mf.mount(e, t), gf(e, t, n, r);
	},
	componentUpdated: function(e, t, n, r) {
		mf.update(e, t), gf(e, t, n, r);
	},
	unbind: function(e) {
		var t;
		(t = hf.get(e)) == null || t(), hf.delete(e), mf.unmount(e);
	}
}, vf = {
	install: function(e) {
		var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.name, r = n === void 0 ? "viewer" : n, i = t.defaultOptions;
		i && Cd.default.setDefaults(i), e.component(r, pf), e.directive(r, _f), e.prototype[`\$${r}Api`] = sf;
	},
	setDefaults: function(e) {
		return Cd.default.setDefaults(e);
	}
};
X.use(Sd), X.use(vf);
var yf = [
	10,
	11,
	12,
	13,
	14,
	15
], bf = {
	data: () => ({
		images: yf,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !0,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-component",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, e || this.$refs.preview?.hide(), this.$nextTick(() => {
				!e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
bf.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      <label class=\"page-only-control\"><input v-model=\"pageOnly\" type=\"checkbox\" :disabled=\"isFullscreen\"> pageOnly</label>\n      <label><input v-model=\"teleport\" type=\"checkbox\" :disabled=\"isFullscreen\"> teleport</label>\n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" @click=\"isFullscreen = true\" >进入全屏</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <fullscreen id=\"demo-component\" ref=\"target\" class=\"surface\" v-model=\"isFullscreen\" :page-only=\"pageOnly\" :teleport=\"teleport\" :exit-on-click-wrapper=\"false\" fullscreen-class=\"demo-fullscreen\" @change=\"changed\" @error=\"report\">\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" @click=\"isFullscreen = false\" >退出全屏</button>\n        \n        <viewer ref=\"preview\" class=\"image-preview\"  url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <button v-for=\"(id, index) in images\" :key=\"id\" class=\"image-trigger gallery-image-trigger\" :aria-label=\"'预览图片 ' + (index + 1)\" :aria-expanded=\"showDetails && selected === index ? 'true' : 'false'\" @click.stop=\"previewImage(index)\">\n            <img class=\"gallery-image demo-picture\" :src=\"'https://picsum.photos/id/' + id + '/640/360'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'风景图片 ' + (index + 1)\" width=\"1280\" height=\"720\">\n          </button>\n        </viewer>\n        \n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">弹窗已在 body 下打开，但不属于当前原生全屏元素。</p>\n      </fullscreen>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", bf._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var xf = [
	10,
	11,
	12,
	13,
	14,
	15
], Sf = {
	data: () => ({
		images: xf,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !1,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-page-only",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, this.$nextTick(() => {
				window.dispatchEvent(new Event("resize")), !e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
Sf.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      <label class=\"page-only-control\"><input v-model=\"pageOnly\" type=\"checkbox\" :disabled=\"isFullscreen\"> pageOnly</label>\n      \n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" @click=\"isFullscreen = true\" >进入全屏</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <fullscreen id=\"demo-page-only\" ref=\"target\" class=\"surface\" v-model=\"isFullscreen\" :page-only=\"pageOnly\" :teleport=\"teleport\" :exit-on-click-wrapper=\"false\" fullscreen-class=\"demo-fullscreen\" @change=\"changed\" @error=\"report\">\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" @click=\"isFullscreen = false\" >退出全屏</button>\n        <div class=\"inline-gallery-stage\">\n        <viewer ref=\"preview\" class=\"inline-gallery-sources\" inline :button=\"false\" url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <img v-for=\"(id, index) in images\" :key=\"id\" :src=\"'https://picsum.photos/id/' + id + '/128/72'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'风景图片 ' + (index + 1)\" width=\"1280\" height=\"720\">\n        </viewer>\n        </div>\n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">弹窗已在 body 下打开，但不属于当前原生全屏元素。</p>\n      </fullscreen>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", Sf._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var Cf = [
	10,
	11,
	12,
	13,
	14,
	15
], wf = {
	data: () => ({
		images: Cf,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !1,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-component",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, e || this.$refs.preview?.hide(), this.$nextTick(() => {
				!e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
wf.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      \n      <label><input v-model=\"teleport\" type=\"checkbox\" :disabled=\"isFullscreen\"> teleport</label>\n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" @click=\"isFullscreen = true\" >进入全屏</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <fullscreen id=\"demo-component\" ref=\"target\" class=\"surface\" v-model=\"isFullscreen\" :page-only=\"pageOnly\" :teleport=\"teleport\" :exit-on-click-wrapper=\"false\" fullscreen-class=\"demo-fullscreen\" @change=\"changed\" @error=\"report\">\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" @click=\"isFullscreen = false\" >退出全屏</button>\n        \n        <viewer ref=\"preview\" class=\"image-preview\"  url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <button v-for=\"(id, index) in images\" :key=\"id\" class=\"image-trigger gallery-image-trigger\" :aria-label=\"'预览图片 ' + (index + 1)\" :aria-expanded=\"showDetails && selected === index ? 'true' : 'false'\" @click.stop=\"previewImage(index)\">\n            <img class=\"gallery-image demo-picture\" :src=\"'https://picsum.photos/id/' + id + '/640/360'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'风景图片 ' + (index + 1)\" width=\"1280\" height=\"720\">\n          </button>\n        </viewer>\n        \n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">弹窗已在 body 下打开，但不属于当前原生全屏元素。</p>\n      </fullscreen>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", wf._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var Tf = [
	10,
	11,
	12,
	13,
	14,
	15
], Ef = {
	data: () => ({
		images: Tf,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !0,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-component",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, e || this.$refs.preview?.hide(), this.$nextTick(() => {
				!e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
Ef.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      <label class=\"page-only-control\"><input v-model=\"pageOnly\" type=\"checkbox\" :disabled=\"isFullscreen\"> pageOnly</label>\n      <label><input v-model=\"teleport\" type=\"checkbox\" :disabled=\"isFullscreen\"> teleport</label>\n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" @click=\"isFullscreen = true\" >Enter fullscreen</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <fullscreen id=\"demo-component\" ref=\"target\" class=\"surface\" v-model=\"isFullscreen\" :page-only=\"pageOnly\" :teleport=\"teleport\" :exit-on-click-wrapper=\"false\" fullscreen-class=\"demo-fullscreen\" @change=\"changed\" @error=\"report\">\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" @click=\"isFullscreen = false\" >Exit fullscreen</button>\n        \n        <viewer ref=\"preview\" class=\"image-preview\"  url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <button v-for=\"(id, index) in images\" :key=\"id\" class=\"image-trigger gallery-image-trigger\" :aria-label=\"'Preview image ' + (index + 1)\" :aria-expanded=\"showDetails && selected === index ? 'true' : 'false'\" @click.stop=\"previewImage(index)\">\n            <img class=\"gallery-image demo-picture\" :src=\"'https://picsum.photos/id/' + id + '/640/360'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'Landscape ' + (index + 1)\" width=\"1280\" height=\"720\">\n          </button>\n        </viewer>\n        \n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">The popup is open under body, but is outside the native fullscreen element.</p>\n      </fullscreen>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", Ef._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var Df = [
	10,
	11,
	12,
	13,
	14,
	15
], Of = {
	data: () => ({
		images: Df,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !1,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-page-only",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, this.$nextTick(() => {
				window.dispatchEvent(new Event("resize")), !e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
Of.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      <label class=\"page-only-control\"><input v-model=\"pageOnly\" type=\"checkbox\" :disabled=\"isFullscreen\"> pageOnly</label>\n      \n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" @click=\"isFullscreen = true\" >Enter fullscreen</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <fullscreen id=\"demo-page-only\" ref=\"target\" class=\"surface\" v-model=\"isFullscreen\" :page-only=\"pageOnly\" :teleport=\"teleport\" :exit-on-click-wrapper=\"false\" fullscreen-class=\"demo-fullscreen\" @change=\"changed\" @error=\"report\">\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" @click=\"isFullscreen = false\" >Exit fullscreen</button>\n        <div class=\"inline-gallery-stage\">\n        <viewer ref=\"preview\" class=\"inline-gallery-sources\" inline :button=\"false\" url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <img v-for=\"(id, index) in images\" :key=\"id\" :src=\"'https://picsum.photos/id/' + id + '/128/72'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'Landscape ' + (index + 1)\" width=\"1280\" height=\"720\">\n        </viewer>\n        </div>\n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">The popup is open under body, but is outside the native fullscreen element.</p>\n      </fullscreen>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", Of._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var kf = [
	10,
	11,
	12,
	13,
	14,
	15
], Af = {
	data: () => ({
		images: kf,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !1,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-component",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, e || this.$refs.preview?.hide(), this.$nextTick(() => {
				!e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
Af.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      \n      <label><input v-model=\"teleport\" type=\"checkbox\" :disabled=\"isFullscreen\"> teleport</label>\n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" @click=\"isFullscreen = true\" >Enter fullscreen</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <fullscreen id=\"demo-component\" ref=\"target\" class=\"surface\" v-model=\"isFullscreen\" :page-only=\"pageOnly\" :teleport=\"teleport\" :exit-on-click-wrapper=\"false\" fullscreen-class=\"demo-fullscreen\" @change=\"changed\" @error=\"report\">\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" @click=\"isFullscreen = false\" >Exit fullscreen</button>\n        \n        <viewer ref=\"preview\" class=\"image-preview\"  url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <button v-for=\"(id, index) in images\" :key=\"id\" class=\"image-trigger gallery-image-trigger\" :aria-label=\"'Preview image ' + (index + 1)\" :aria-expanded=\"showDetails && selected === index ? 'true' : 'false'\" @click.stop=\"previewImage(index)\">\n            <img class=\"gallery-image demo-picture\" :src=\"'https://picsum.photos/id/' + id + '/640/360'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'Landscape ' + (index + 1)\" width=\"1280\" height=\"720\">\n          </button>\n        </viewer>\n        \n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">The popup is open under body, but is outside the native fullscreen element.</p>\n      </fullscreen>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", Af._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var jf = [
	10,
	11,
	12,
	13,
	14,
	15
], Mf = {
	data: () => ({
		images: jf,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !0,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-directive",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, e || this.$refs.preview?.hide(), this.$nextTick(() => {
				!e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
Mf.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      <label class=\"page-only-control\"><input v-model=\"pageOnly\" type=\"checkbox\" :disabled=\"isFullscreen\"> pageOnly</label>\n      <label><input v-model=\"teleport\" type=\"checkbox\" :disabled=\"isFullscreen\"> teleport</label>\n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" v-fullscreen=\"options\" @fullscreen-error=\"report($event.detail)\">点击指令按钮</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <section id=\"demo-directive\" ref=\"target\" class=\"surface\" >\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" v-fullscreen=\"options\" @fullscreen-error=\"report($event.detail)\">退出全屏</button>\n        \n        <viewer ref=\"preview\" class=\"image-preview\"  url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <button v-for=\"(id, index) in images\" :key=\"id\" class=\"image-trigger gallery-image-trigger\" :aria-label=\"'预览图片 ' + (index + 1)\" :aria-expanded=\"showDetails && selected === index ? 'true' : 'false'\" @click.stop=\"previewImage(index)\">\n            <img class=\"gallery-image demo-picture\" :src=\"'https://picsum.photos/id/' + id + '/640/360'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'风景图片 ' + (index + 1)\" width=\"1280\" height=\"720\">\n          </button>\n        </viewer>\n        \n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">弹窗已在 body 下打开，但不属于当前原生全屏元素。</p>\n      </section>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", Mf._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var Nf = [
	10,
	11,
	12,
	13,
	14,
	15
], Pf = {
	data: () => ({
		images: Nf,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !0,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-directive",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, e || this.$refs.preview?.hide(), this.$nextTick(() => {
				!e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
Pf.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      <label class=\"page-only-control\"><input v-model=\"pageOnly\" type=\"checkbox\" :disabled=\"isFullscreen\"> pageOnly</label>\n      <label><input v-model=\"teleport\" type=\"checkbox\" :disabled=\"isFullscreen\"> teleport</label>\n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" v-fullscreen=\"options\" @fullscreen-error=\"report($event.detail)\">Toggle with directive</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <section id=\"demo-directive\" ref=\"target\" class=\"surface\" >\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" v-fullscreen=\"options\" @fullscreen-error=\"report($event.detail)\">Exit fullscreen</button>\n        \n        <viewer ref=\"preview\" class=\"image-preview\"  url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <button v-for=\"(id, index) in images\" :key=\"id\" class=\"image-trigger gallery-image-trigger\" :aria-label=\"'Preview image ' + (index + 1)\" :aria-expanded=\"showDetails && selected === index ? 'true' : 'false'\" @click.stop=\"previewImage(index)\">\n            <img class=\"gallery-image demo-picture\" :src=\"'https://picsum.photos/id/' + id + '/640/360'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'Landscape ' + (index + 1)\" width=\"1280\" height=\"720\">\n          </button>\n        </viewer>\n        \n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">The popup is open under body, but is outside the native fullscreen element.</p>\n      </section>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", Pf._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var Ff = [
	10,
	11,
	12,
	13,
	14,
	15
], If = {
	data: () => ({
		images: Ff,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !0,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-api",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, e || this.$refs.preview?.hide(), this.$nextTick(() => {
				!e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		enter() {
			return this.$fullscreen.enter("demo-api", this.options).catch(this.report);
		},
		exit() {
			return this.$fullscreen.exit().catch(this.report);
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
If.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      <label class=\"page-only-control\"><input v-model=\"pageOnly\" type=\"checkbox\" :disabled=\"isFullscreen\"> pageOnly</label>\n      <label><input v-model=\"teleport\" type=\"checkbox\" :disabled=\"isFullscreen\"> teleport</label>\n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" @click=\"enter\" >进入全屏</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <section id=\"demo-api\" ref=\"target\" class=\"surface\" >\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" @click=\"exit\" >退出全屏</button>\n        \n        <viewer ref=\"preview\" class=\"image-preview\"  url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <button v-for=\"(id, index) in images\" :key=\"id\" class=\"image-trigger gallery-image-trigger\" :aria-label=\"'预览图片 ' + (index + 1)\" :aria-expanded=\"showDetails && selected === index ? 'true' : 'false'\" @click.stop=\"previewImage(index)\">\n            <img class=\"gallery-image demo-picture\" :src=\"'https://picsum.photos/id/' + id + '/640/360'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'风景图片 ' + (index + 1)\" width=\"1280\" height=\"720\">\n          </button>\n        </viewer>\n        \n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">弹窗已在 body 下打开，但不属于当前原生全屏元素。</p>\n      </section>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", If._scopeId = "data-v-playground", X.use(Sd), X.use(vf);
var Lf = [
	10,
	11,
	12,
	13,
	14,
	15
], Rf = {
	data: () => ({
		images: Lf,
		selected: 0,
		isFullscreen: !1,
		pageOnly: !1,
		teleport: !0,
		showDetails: !1,
		error: "",
		readingPosition: null
	}),
	computed: { options() {
		return {
			target: "#demo-api",
			pageOnly: this.pageOnly,
			teleport: this.teleport,
			fullscreenClass: "demo-fullscreen",
			callback: this.changed
		};
	} },
	methods: {
		rememberReadingPosition() {
			!this.isFullscreen && !this.readingPosition && (this.readingPosition = {
				left: window.scrollX,
				top: window.scrollY
			});
		},
		changed(e) {
			this.isFullscreen = e, e || this.$refs.preview?.hide(), this.$nextTick(() => {
				!e && this.readingPosition && (window.scrollTo({
					...this.readingPosition,
					behavior: "instant"
				}), this.readingPosition = null);
			});
		},
		report(e) {
			this.changed(!1), this.showDetails = !1, this.error = e.message;
		},
		enter() {
			return this.$fullscreen.enter("demo-api", this.options).catch(this.report);
		},
		exit() {
			return this.$fullscreen.exit().catch(this.report);
		},
		previewImage(e) {
			this.showDetails && this.selected === e ? this.$refs.preview.hide() : (this.selected = e, this.$refs.preview.view(e));
		}
	},
	beforeDestroy() {
		this.readingPosition = null, this.$fullscreen.element === this.$refs.target && this.$fullscreen.exit().catch(() => {});
	}
};
Rf.template = "\n  <div class=\"lab\">\n    <header class=\"options\">\n      <label class=\"page-only-control\"><input v-model=\"pageOnly\" type=\"checkbox\" :disabled=\"isFullscreen\"> pageOnly</label>\n      <label><input v-model=\"teleport\" type=\"checkbox\" :disabled=\"isFullscreen\"> teleport</label>\n      <button id=\"enter\" :disabled=\"isFullscreen\" @click.capture=\"rememberReadingPosition\" @click=\"enter\" >Enter fullscreen</button>\n    </header>\n    <div class=\"surface-placeholder\">\n      <section id=\"demo-api\" ref=\"target\" class=\"surface\" >\n        <button v-if=\"isFullscreen\" id=\"exit\" class=\"exit\" @click=\"exit\" >Exit fullscreen</button>\n        \n        <viewer ref=\"preview\" class=\"image-preview\"  url=\"data-source\" :z-index=\"10001\" :toolbar=\"false\" :title=\"false\" :transition=\"false\" :focus=\"false\" :fullscreen=\"false\" @show=\"showDetails = true\" @hidden=\"showDetails = false\">\n          <button v-for=\"(id, index) in images\" :key=\"id\" class=\"image-trigger gallery-image-trigger\" :aria-label=\"'Preview image ' + (index + 1)\" :aria-expanded=\"showDetails && selected === index ? 'true' : 'false'\" @click.stop=\"previewImage(index)\">\n            <img class=\"gallery-image demo-picture\" :src=\"'https://picsum.photos/id/' + id + '/640/360'\" :data-source=\"'https://picsum.photos/id/' + id + '/1280/720'\" :alt=\"'Landscape ' + (index + 1)\" width=\"1280\" height=\"720\">\n          </button>\n        </viewer>\n        \n        <p v-if=\"isFullscreen && showDetails && !pageOnly && !teleport\" role=\"status\">The popup is open under body, but is outside the native fullscreen element.</p>\n      </section>\n    </div>\n    <p v-if=\"error\" role=\"alert\">{{ error }}</p>\n  </div>\n", Rf._scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-examples
var zf = {
	"component zh": bf,
	"component zh pageOnly": Sf,
	"component zh teleport": wf,
	"component en": Ef,
	"component en pageOnly": Of,
	"component en teleport": Af,
	"directive zh": Mf,
	"directive en": Pf,
	"api zh": If,
	"api en": Rf
}, Bf = "\n.lab[data-v-playground], .surface[data-v-playground] { --sample-bg: #f6f6f7; --sample-surface: #fff; --sample-text: #3c3c43; --sample-border: #c2c2c4; --sample-accent: #5b51d8; --sample-button-text: #fff; box-sizing: border-box; font: 14px/1.7 system-ui, sans-serif; color: var(--sample-text);\n}\n.dark .lab[data-v-playground], .dark .surface[data-v-playground] { --sample-bg: #1b1b1f; --sample-surface: #202127; --sample-text: #dfdfe5; --sample-border: #67676c; --sample-accent: #aaa2ff; --sample-button-text: #202127;\n}\n.lab[data-v-playground] { padding: 16px; background: var(--sample-bg);\n}\nbutton[data-v-playground], input[data-v-playground] { font: inherit;\n}\nbutton[data-v-playground] { padding: 8px 16px; border: 1px solid var(--sample-accent); border-radius: 6px; background: var(--sample-accent); color: var(--sample-button-text); cursor: pointer;\n}\nbutton[data-v-playground]:hover { filter: brightness(.94);\n}\nbutton[data-v-playground]:disabled { opacity: .5; cursor: default;\n}\nbutton[data-v-playground]:focus-visible, input[data-v-playground]:focus-visible { outline: 2px solid var(--sample-accent); outline-offset: 3px;\n}\ninput[data-v-playground] { accent-color: var(--sample-accent);\n}\n.options[data-v-playground] { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; padding-bottom: 16px;\n}\n.options label[data-v-playground] { display: flex; gap: 6px; align-items: center;\n}\n.options button[data-v-playground], .exit[data-v-playground] { width: 100%; padding: 12px 16px; font-size: 16px;\n}\n.surface-placeholder[data-v-playground] { height: 300px;\n}\n.surface[data-v-playground] { position: relative; height: 300px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; padding: 10px; background: var(--sample-surface); border: 1px solid var(--sample-border); border-radius: 8px;\n}\n.surface.demo-fullscreen[data-v-playground] { z-index: 10000; min-height: 100vh; height: 100vh; overflow: auto; border-radius: 0; padding: 20px 24px;\n}\n.image-preview[data-v-playground] { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-content: start; gap: 10px; width: 100%;\n}\n.image-trigger[data-v-playground] { display: block; aspect-ratio: 16 / 10; width: 100%; padding: 0; border: 0; border-radius: 4px; overflow: hidden; background: transparent; cursor: zoom-in;\n}\n.image-trigger[data-v-playground]:hover { background: transparent; filter: none;\n}\n.gallery-image[data-v-playground] { position: static; display: block; width: 100%; height: 100%; object-fit: cover;\n}\n.exit[data-v-playground] { flex-shrink: 0; margin-bottom: 16px;\n}\n.inline-gallery-stage[data-v-playground] { position: relative; flex: 1; min-height: 0; width: 100%;\n}\n.inline-gallery-sources[data-v-playground] { display: none;\n}\n.surface p[role=\"status\"][data-v-playground] { position: absolute; bottom: 68px; margin: 0; padding: 6px 12px; background: var(--sample-surface); font-size: 12px;\n}\n@media (max-width: 480px) {\n.image-preview[data-v-playground] { grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n}\n\n";
//#endregion
//#region docs/.vitepress/theme/demos/mount.mjs
function Vf(e) {
	return (t, n, r, i) => {
		let a = document.createElement("style");
		a.textContent = Bf, document.head.appendChild(a);
		try {
			let o = zf[`${n} ${r ? "en" : "zh"}${i ? ` ${i}` : ""}`], s = e(t, o);
			return () => {
				try {
					s();
				} finally {
					a.remove();
				}
			};
		} catch (e) {
			throw a.remove(), e;
		}
	};
}
//#endregion
//#region docs/.vitepress/theme/demos/mount-vue2.mjs
var Hf = Vf((e, t) => {
	let n = document.createElement("div");
	e.appendChild(n);
	let r = new X(t).$mount(n);
	return () => {
		let e = r.$refs.target?.$el ?? r.$refs.target;
		r.$fullscreen.element === e && r.$fullscreen.dispose(), r.$destroy(), r.$el.remove();
	};
});
//#endregion
export { Hf as mount };

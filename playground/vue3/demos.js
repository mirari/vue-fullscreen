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
}) : o, n));
//#endregion
//#region node_modules/.pnpm/@vue+shared@3.5.43/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function l(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var u = {}, d = [], f = () => {}, p = () => !1, m = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), h = (e) => e.startsWith("onUpdate:"), g = Object.assign, _ = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, v = Object.prototype.hasOwnProperty, y = (e, t) => v.call(e, t), b = Array.isArray, x = (e) => ne(e) === "[object Map]", S = (e) => ne(e) === "[object Set]", C = (e) => ne(e) === "[object Date]", w = (e) => typeof e == "function", T = (e) => typeof e == "string", ee = (e) => typeof e == "symbol", E = (e) => typeof e == "object" && !!e, te = (e) => (E(e) || w(e)) && w(e.then) && w(e.catch), D = Object.prototype.toString, ne = (e) => D.call(e), re = (e) => ne(e).slice(8, -1), ie = (e) => ne(e) === "[object Object]", ae = (e) => T(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, oe = /* @__PURE__ */ l(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), O = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, se = /-\w/g, k = O((e) => e.replace(se, (e) => e.slice(1).toUpperCase())), ce = /\B([A-Z])/g, le = O((e) => e.replace(ce, "-$1").toLowerCase()), ue = O((e) => e.charAt(0).toUpperCase() + e.slice(1)), A = O((e) => e ? `on${ue(e)}` : ""), j = (e, t) => !Object.is(e, t), de = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, fe = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, pe = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, me, he = () => me ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function ge(e) {
	if (b(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = T(r) ? be(r) : ge(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (T(e) || E(e)) return e;
}
var _e = /;(?![^(]*\))/g, ve = /:([^]+)/, ye = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function be(e) {
	let t = {};
	return e.replace(ye, (e) => e.startsWith("/*") ? "" : e).split(_e).forEach((e) => {
		if (e) {
			let n = e.split(ve);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function xe(e) {
	let t = "";
	if (T(e)) t = e;
	else if (b(e)) for (let n = 0; n < e.length; n++) {
		let r = xe(e[n]);
		r && (t += r + " ");
	}
	else if (E(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Se = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ce = /* @__PURE__ */ l(Se);
Se + "";
function we(e) {
	return !!e || e === "";
}
function Te(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = ke(e[i], t[i], n);
	return r;
}
function Ee(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && ke(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function De(e, t, n) {
	let r = x(e), i = x(t);
	if (r || i || (r = S(e), i = S(t), r || i)) return r && i ? Ee(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !ke(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function Oe(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function ke(e, t, n) {
	if (e === t) return !0;
	let r = C(e), i = C(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = ee(e), i = ee(t), r || i ? e === t : (r = b(e), i = b(t), r || i ? r && i ? Oe(e, t, n, Te) : !1 : (r = E(e), i = E(t), r || i ? !r || !i ? !1 : Oe(e, t, n, De) : String(e) === String(t))));
}
function Ae(e, t) {
	return e.findIndex((e) => ke(e, t));
}
var je = (e) => !!(e && e.__v_isRef === !0), Me = (e) => T(e) ? e : e == null ? "" : b(e) || E(e) && (e.toString === D || !w(e.toString)) ? je(e) ? Me(e.value) : JSON.stringify(e, Ne, 2) : String(e), Ne = (e, t) => je(t) ? Ne(e, t.value) : x(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Pe(t, r) + " =>"] = n, e), {}) } : S(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Pe(e)) } : ee(t) ? Pe(t) : E(t) && !b(t) && !ie(t) ? String(t) : t, Pe = (e, t = "") => ee(e) ? `Symbol(${e.description ?? t})` : e, M, Fe = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && M && (M.active ? (this.parent = M, this.index = (M.scopes || (M.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = M;
			try {
				return M = this, e();
			} finally {
				M = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = M, M = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (M === this) M = this.prevScope;
			else {
				let e = M;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Ie() {
	return M;
}
var N, Le = /* @__PURE__ */ new WeakSet(), Re = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, M && (M.active ? M.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Le.has(this) && (Le.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ve(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Xe(this), I(this);
		let e = N, t = L;
		N = this, L = !0;
		try {
			return this.fn();
		} finally {
			Ue(this), N = e, L = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Ke(e);
			this.deps = this.depsTail = void 0, Xe(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Le.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		We(this) && this.run();
	}
	get dirty() {
		return We(this);
	}
}, P = 0, ze, Be;
function Ve(e, t = !1) {
	e.flags |= 8, t ? (e.next = Be, Be = e) : (e.next = ze, ze = e);
}
function He() {
	P++;
}
function F() {
	if (--P > 0) return;
	if (Be) {
		let e = Be;
		for (Be = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; ze;) {
		let t = ze;
		for (ze = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function I(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ue(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Ke(r), qe(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function We(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ge(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Ge(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ze) || (e.globalVersion = Ze, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !We(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = N, r = L;
	N = e, L = !0;
	try {
		I(e);
		let n = e.fn(e._value);
		(t.version === 0 || j(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		N = n, L = r, Ue(e), e.flags &= -3;
	}
}
function Ke(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Ke(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function qe(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var L = !0, R = [];
function Je() {
	R.push(L), L = !1;
}
function Ye() {
	let e = R.pop();
	L = e === void 0 || e;
}
function Xe(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = N;
		N = void 0;
		try {
			t();
		} finally {
			N = e;
		}
	}
}
var Ze = 0, Qe = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, $e = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!N || !L || N === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== N) t = this.activeLink = new Qe(N, this), N.deps ? (t.prevDep = N.depsTail, N.depsTail.nextDep = t, N.depsTail = t) : N.deps = N.depsTail = t, z(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = N.depsTail, t.nextDep = void 0, N.depsTail.nextDep = t, N.depsTail = t, N.deps === t && (N.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ze++, this.notify(e);
	}
	notify(e) {
		He();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			F();
		}
	}
};
function z(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) z(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var B = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ Symbol(""), et = /* @__PURE__ */ Symbol(""), tt = /* @__PURE__ */ Symbol("");
function H(e, t, n) {
	if (L && N) {
		let t = B.get(e);
		t || B.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new $e()), r.map = t, r.key = n), r.track();
	}
}
function nt(e, t, n, r, i, a) {
	let o = B.get(e);
	if (!o) {
		Ze++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (He(), t === "clear") o.forEach(s);
	else {
		let i = b(e), a = i && ae(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === tt || !ee(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(tt)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(V)), x(e) && s(o.get(et)));
				break;
			case "delete":
				i || (s(o.get(V)), x(e) && s(o.get(et)));
				break;
			case "set": x(e) && s(o.get(V));
		}
	}
	F();
}
function rt(e) {
	let t = /* @__PURE__ */ U(e);
	return t === e || (H(t, "iterate", tt), /* @__PURE__ */ Ht(e)) ? t : /* @__PURE__ */ Vt(e) ? /* @__PURE__ */ Bt(e) ? t.map((e) => Kt(Gt(e))) : t.map(Kt) : t.map(Gt);
}
function it(e) {
	return H(e = /* @__PURE__ */ U(e), "iterate", tt), e;
}
function at(e, t) {
	return /* @__PURE__ */ Vt(e) ? Kt(/* @__PURE__ */ Bt(e) ? Gt(t) : t) : Gt(t);
}
var ot = {
	__proto__: null,
	[Symbol.iterator]() {
		return st(this, Symbol.iterator, (e) => at(this, e));
	},
	concat(...e) {
		return rt(this).concat(...e.map((e) => b(e) ? rt(e) : e));
	},
	entries() {
		return st(this, "entries", (e) => (e[1] = at(this, e[1]), e));
	},
	every(e, t) {
		return lt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return lt(this, "filter", e, t, (e) => e.map((e) => at(this, e)), arguments);
	},
	find(e, t) {
		return lt(this, "find", e, t, (e) => at(this, e), arguments);
	},
	findIndex(e, t) {
		return lt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return lt(this, "findLast", e, t, (e) => at(this, e), arguments);
	},
	findLastIndex(e, t) {
		return lt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return lt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return dt(this, "includes", e);
	},
	indexOf(...e) {
		return dt(this, "indexOf", e);
	},
	join(e) {
		return rt(this).join(e);
	},
	lastIndexOf(...e) {
		return dt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return lt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ft(this, "pop");
	},
	push(...e) {
		return ft(this, "push", e);
	},
	reduce(e, ...t) {
		return ut(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ut(this, "reduceRight", e, t);
	},
	shift() {
		return ft(this, "shift");
	},
	some(e, t) {
		return lt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ft(this, "splice", e);
	},
	toReversed() {
		return rt(this).toReversed();
	},
	toSorted(e) {
		return rt(this).toSorted(e);
	},
	toSpliced(...e) {
		return rt(this).toSpliced(...e);
	},
	unshift(...e) {
		return ft(this, "unshift", e);
	},
	values() {
		return st(this, "values", (e) => at(this, e));
	}
};
function st(e, t, n) {
	let r = it(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Ht(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var ct = Array.prototype;
function lt(e, t, n, r, i, a) {
	let o = it(e), s = o !== e && !/* @__PURE__ */ Ht(e), c = o[t];
	if (c !== ct[t]) {
		let t = c.apply(e, a);
		return s ? Gt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, at(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ut(e, t, n, r) {
	let i = it(e), a = i !== e && !/* @__PURE__ */ Ht(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = at(e, t)), n.call(this, t, at(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? at(e, c) : c;
}
function dt(e, t, n) {
	let r = /* @__PURE__ */ U(e);
	H(r, "iterate", tt);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ut(n[0]) ? (n[0] = /* @__PURE__ */ U(n[0]), r[t](...n)) : i;
}
function ft(e, t, n = []) {
	Je(), He();
	let r = (/* @__PURE__ */ U(e))[t].apply(e, n);
	return F(), Ye(), r;
}
var pt = /* @__PURE__ */ l("__proto__,__v_isRef,__isVue"), mt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ee));
function ht(e) {
	ee(e) || (e = String(e));
	let t = /* @__PURE__ */ U(this);
	return H(t, "has", e), t.hasOwnProperty(e);
}
var gt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Pt : Nt : i ? Mt : jt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = b(e);
		if (!r) {
			let e;
			if (a && (e = ot[t])) return e;
			if (t === "hasOwnProperty") return ht;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ qt(e) ? e : n);
		if ((ee(t) ? mt.has(t) : pt(t)) || (r || H(e, "get", t), i)) return o;
		if (/* @__PURE__ */ qt(o)) {
			let e = a && ae(t) ? o : o.value;
			return r && E(e) ? /* @__PURE__ */ Rt(e) : e;
		}
		return E(o) ? r ? /* @__PURE__ */ Rt(o) : /* @__PURE__ */ It(o) : o;
	}
}, _t = class extends gt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = b(e) && ae(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Vt(i);
			if (!/* @__PURE__ */ Ht(n) && !/* @__PURE__ */ Vt(n) && (i = /* @__PURE__ */ U(i), n = /* @__PURE__ */ U(n)), !a && /* @__PURE__ */ qt(i) && !/* @__PURE__ */ qt(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : y(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ qt(e) ? e : r);
		return e === /* @__PURE__ */ U(r) && s && (o ? j(n, i) && nt(e, "set", t, n, i) : nt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = y(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && nt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!ee(t) || !mt.has(t)) && H(e, "has", t), n;
	}
	ownKeys(e) {
		return H(e, "iterate", b(e) ? "length" : V), Reflect.ownKeys(e);
	}
}, vt = class extends gt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, yt = /* @__PURE__ */ new _t(), bt = /* @__PURE__ */ new vt(), xt = /* @__PURE__ */ new _t(!0), St = (e) => e, Ct = (e) => Reflect.getPrototypeOf(e);
function wt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ U(i), o = x(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? St : t ? Kt : Gt;
		return !t && H(a, "iterate", c ? et : V), g(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function Tt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Et(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ U(r), a = /* @__PURE__ */ U(n);
			e || (j(n, a) && H(i, "get", n), H(i, "get", a));
			let { has: o } = Ct(i), s = t ? St : e ? Kt : Gt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && H(/* @__PURE__ */ U(t), "iterate", V), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ U(n), i = /* @__PURE__ */ U(t);
			return e || (j(t, i) && H(r, "has", t), H(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ U(a), s = t ? St : e ? Kt : Gt;
			return !e && H(o, "iterate", V), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return g(n, e ? {
		add: Tt("add"),
		set: Tt("set"),
		delete: Tt("delete"),
		clear: Tt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ U(this), r = Ct(n), i = /* @__PURE__ */ U(e), a = !t && !/* @__PURE__ */ Ht(e) && !/* @__PURE__ */ Vt(e) ? i : e;
			return r.has.call(n, a) || j(e, a) && r.has.call(n, e) || j(i, a) && r.has.call(n, i) || (n.add(a), nt(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Ht(n) && !/* @__PURE__ */ Vt(n) && (n = /* @__PURE__ */ U(n));
			let r = /* @__PURE__ */ U(this), { has: i, get: a } = Ct(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ U(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? j(n, s) && nt(r, "set", e, n, s) : nt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ U(this), { has: n, get: r } = Ct(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ U(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && nt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ U(this), t = e.size !== 0, n = e.clear();
			return t && nt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = wt(r, e, t);
	}), n;
}
function Dt(e, t) {
	let n = Et(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(y(n, r) && r in t ? n : t, r, i);
}
var Ot = { get: /* @__PURE__ */ Dt(!1, !1) }, kt = { get: /* @__PURE__ */ Dt(!1, !0) }, At = { get: /* @__PURE__ */ Dt(!0, !1) }, jt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap();
function Ft(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function It(e) {
	return /* @__PURE__ */ Vt(e) ? e : zt(e, !1, yt, Ot, jt);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
	return zt(e, !1, xt, kt, Mt);
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
	return zt(e, !0, bt, At, Nt);
}
function zt(e, t, n, r, i) {
	if (!E(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Ft(re(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
	return /* @__PURE__ */ Vt(e) ? /* @__PURE__ */ Bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ht(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function U(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ U(t) : e;
}
function Wt(e) {
	return !y(e, "__v_skip") && Object.isExtensible(e) && fe(e, "__v_skip", !0), e;
}
var Gt = (e) => E(e) ? /* @__PURE__ */ It(e) : e, Kt = (e) => E(e) ? /* @__PURE__ */ Rt(e) : e;
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function W(e) {
	return Yt(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
	return Yt(e, !0);
}
function Yt(e, t) {
	return /* @__PURE__ */ qt(e) ? e : new Xt(e, t);
}
var Xt = class {
	constructor(e, t) {
		this.dep = new $e(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ U(e), this._value = t ? e : Gt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Ht(e) || /* @__PURE__ */ Vt(e);
		e = n ? e : /* @__PURE__ */ U(e), j(e, t) && (this._rawValue = e, this._value = n ? e : Gt(e), this.dep.trigger());
	}
};
function G(e) {
	return /* @__PURE__ */ qt(e) ? e.value : e;
}
var Zt = {
	get: (e, t, n) => t === "__v_raw" ? e : G(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ qt(i) && !/* @__PURE__ */ qt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Qt(e) {
	return /* @__PURE__ */ Bt(e) ? e : new Proxy(e, Zt);
}
var $t = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new $e(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ze - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && N !== this) return Ve(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Ge(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function en(e, t, n = !1) {
	let r, i;
	return w(e) ? r = e : (r = e.get, i = e.set), new $t(r, i, n);
}
var tn = {}, nn = /* @__PURE__ */ new WeakMap(), rn = void 0;
function an(e, t = !1, n = rn) {
	if (n) {
		let t = nn.get(n);
		t || nn.set(n, t = []), t.push(e);
	}
}
function on(e, t, n = u) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => i ? e : /* @__PURE__ */ Ht(e) || i === !1 || i === 0 ? sn(e, 1) : sn(e), d, p, m, h, g = !1, v = !1;
	if (/* @__PURE__ */ qt(e) ? (p = () => e.value, g = /* @__PURE__ */ Ht(e)) : /* @__PURE__ */ Bt(e) ? (p = () => l(e), g = !0) : b(e) ? (v = !0, g = e.some((e) => /* @__PURE__ */ Bt(e) || /* @__PURE__ */ Ht(e)), p = () => e.map((e) => {
		if (/* @__PURE__ */ qt(e)) return e.value;
		if (/* @__PURE__ */ Bt(e)) return l(e);
		if (w(e)) return c ? c(e, 2) : e();
	})) : p = w(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (m) {
			Je();
			try {
				m();
			} finally {
				Ye();
			}
		}
		let t = rn;
		rn = d;
		try {
			return c ? c(e, 3, [h]) : e(h);
		} finally {
			rn = t;
		}
	} : f, t && i) {
		let e = p, t = i === !0 ? Infinity : i;
		p = () => sn(e(), t);
	}
	let y = Ie(), x = () => {
		d.stop(), y && y.active && _(y.effects, d);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return x(), n;
		};
	}
	let S = v ? Array(e.length).fill(tn) : tn, C = (e) => {
		if (d.flags & 1 && (d.dirty || e)) {
			if (t) {
				let n = d.run();
				if (e || i || g || (v ? n.some((e, t) => j(e, S[t])) : j(n, S))) {
					m && m();
					let e = rn;
					rn = d;
					try {
						let e = [
							n,
							S === tn ? void 0 : v && S[0] === tn ? [] : S,
							h
						];
						S = n, c ? c(t, 3, e) : t(...e);
					} finally {
						rn = e;
					}
				}
			} else d.run();
		}
	};
	return s && s(C), d = new Re(p), d.scheduler = o ? () => o(C, !1) : C, h = (e) => an(e, !1, d), m = d.onStop = () => {
		let e = nn.get(d);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			nn.delete(d);
		}
	}, t ? r ? C(!0) : S = d.run() : o ? o(C.bind(null, !0), !0) : d.run(), x.pause = d.pause.bind(d), x.resume = d.resume.bind(d), x.stop = x, x;
}
function sn(e, t = Infinity, n) {
	if (t <= 0 || !E(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ qt(e)) sn(e.value, t, n);
	else if (b(e)) for (let r = 0; r < e.length; r++) sn(e[r], t, n);
	else if (S(e) || x(e)) e.forEach((e) => {
		sn(e, t, n);
	});
	else if (ie(e)) {
		for (let r in e) sn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && sn(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/@vue+runtime-core@3.5.43/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function cn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		un(e, t, n);
	}
}
function ln(e, t, n, r) {
	if (w(e)) {
		let i = cn(e, t, n, r);
		return i && te(i) && i.catch((e) => {
			un(e, t, n);
		}), i;
	}
	if (b(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(ln(e[a], t, n, r));
		return i;
	}
}
function un(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || u;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			Je(), cn(a, null, 10, [
				e,
				i,
				o
			]), Ye();
			return;
		}
	}
	dn(e, n, i, r, o);
}
function dn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var fn = [], pn = -1, mn = [], hn = null, gn = 0, _n = /* @__PURE__ */ Promise.resolve(), vn = null;
function yn(e) {
	let t = vn || _n;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function bn(e) {
	let t = pn + 1, n = fn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = fn[r], a = En(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function xn(e) {
	if (!(e.flags & 1)) {
		let t = En(e), n = fn[fn.length - 1];
		!n || !(e.flags & 2) && t >= En(n) ? fn.push(e) : fn.splice(bn(t), 0, e), e.flags |= 1, Sn();
	}
}
function Sn() {
	vn ||= _n.then(Dn);
}
function Cn(e) {
	if (!b(e)) hn && e.id === -1 ? hn.splice(gn + 1, 0, e) : e.flags & 1 || (mn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) mn.push(e[t]);
	Sn();
}
function wn(e, t, n = pn + 1) {
	for (; n < fn.length; n++) {
		let t = fn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			fn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Tn(e) {
	if (mn.length) {
		let e = [...new Set(mn)].sort((e, t) => En(e) - En(t));
		if (mn.length = 0, hn) {
			for (let t = 0; t < e.length; t++) hn.push(e[t]);
			return;
		}
		for (hn = e, gn = 0; gn < hn.length; gn++) {
			let e = hn[gn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		hn = null, gn = 0;
	}
}
var En = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function Dn(e) {
	try {
		for (pn = 0; pn < fn.length; pn++) {
			let e = fn[pn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), cn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; pn < fn.length; pn++) {
			let e = fn[pn];
			e && (e.flags &= -2);
		}
		pn = -1, fn.length = 0, Tn(e), vn = null, (fn.length || mn.length) && Dn(e);
	}
}
var On = null, kn = null;
function An(e) {
	let t = On;
	return On = e, kn = e && e.type.__scopeId || null, t;
}
function jn(e, t = On, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Zi(-1);
		let i = An(t), a = qi.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = qi.length; e > a; e--) Yi();
			An(i), r._d && Zi(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function K(e, t) {
	if (On === null) return e;
	let n = ka(On), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = u] = t[e];
		i && (w(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && sn(a), r.push({
			dir: i,
			instance: n,
			value: a,
			oldValue: void 0,
			arg: o,
			modifiers: s
		}));
	}
	return e;
}
function Mn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Je(), ln(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ye());
	}
}
function Nn(e, t) {
	if (ha) {
		let n = ha.provides, r = ha.parent && ha.parent.provides;
		r === n && (n = ha.provides = Object.create(r)), n[e] = t;
	}
}
function Pn(e, t, n = !1) {
	let r = ga();
	if (r || ei) {
		let i = ei ? ei._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && w(t) ? t.call(r && r.proxy) : t;
	}
}
var Fn = /* @__PURE__ */ Symbol.for("v-scx"), In = () => Pn(Fn);
function Ln(e, t, n) {
	return Rn(e, t, n);
}
function Rn(e, t, n = u) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = g({}, n), c = t && r || !t && a !== "post", l;
	if (Sa) {
		if (a === "sync") {
			let e = In();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = f, e.resume = f, e.pause = f, e;
		}
	}
	let d = ha;
	s.call = (e, t, n) => ln(e, d, t, n);
	let p = !1;
	a === "post" ? s.scheduler = (e) => {
		ji(e, d && d.suspense);
	} : a !== "sync" && (p = !0, s.scheduler = (e, t) => {
		t ? e() : xn(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), p && (e.flags |= 2, d && (e.id = d.uid, e.i = d));
	};
	let m = on(e, t, s);
	return Sa && (l ? l.push(m) : c && m()), m;
}
function zn(e, t, n) {
	let r = this.proxy, i = T(e) ? e.includes(".") ? Bn(r, e) : () => r[e] : e.bind(r, r), a;
	w(t) ? a = t : (a = t.handler, n = t);
	let o = ya(this), s = Rn(i, a.bind(r), n);
	return o(), s;
}
function Bn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Vn = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ Symbol("_vte"), Un = (e) => e.__isTeleport, Wn = (e) => e && (e.disabled || e.disabled === ""), Gn = (e) => e && (e.defer || e.defer === ""), Kn = (e) => typeof SVGElement < "u" && e instanceof SVGElement, qn = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Jn = (e, t) => {
	let n = e && e.to;
	return T(n) ? t ? t(n) : null : n;
}, Yn = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = Wn(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = Wn(e.props), r = e.target = Jn(e.props, m), a = er(r, e, h, p);
			r && (o !== "svg" && Kn(r) ? o = "svg" : o !== "mathml" && qn(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), $n(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (Vn.get(e) === t) {
					if (Vn.delete(e), Wn(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), $n(e, !0);
					}
					x(e);
				}
			};
			Vn.set(e, t), ji(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), Gn(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), $n(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Vn.get(e);
			if (u) {
				u.flags |= 8, Vn.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = Wn(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || Kn(p) ? o = "svg" : (o === "mathml" || qn(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Li(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Xn(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = Jn(t.props, m);
				e && (t.target = e, Xn(t, e, null, l, 0));
			} else g && Xn(t, p, h, l, 1);
			$n(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = Wn(f), m = a || !p, h = Vn.get(e);
		if (h && (h.flags |= 8, Vn.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: Xn,
	hydrate: Zn
};
function Xn(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Vn.has(e) && (!d || Wn(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Zn(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = Jn(t.props, c), h = Wn(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || er(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || er(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), $n(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var Qn = Yn;
function $n(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function er(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Hn] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var tr = /* @__PURE__ */ Symbol("_leaveCb");
function nr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Gi) {
			t = n;
			break;
		}
	}
	return t;
}
function rr(e) {
	if (!fr(e)) return Un(e.type) && e.children ? nr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && w(n.default)) return n.default();
	}
}
function ir(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		ir(Un(n.type) && rr(n) || n, t);
	} else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function ar(e, t) {
	return w(e) ? /* @__PURE__ */ g({ name: e.name }, t, { setup: e }) : e;
}
function or(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function sr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var cr = /* @__PURE__ */ new WeakMap();
function lr(e, t, n, r, i = !1) {
	if (b(e)) {
		e.forEach((e, a) => lr(e, t && (b(t) ? t[a] : t), n, r, i));
		return;
	}
	if (dr(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && lr(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? ka(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, d = s.refs === u ? s.refs = {} : s.refs, f = s.setupState, m = /* @__PURE__ */ U(f), h = f === u ? p : (e) => !sr(d, e) && y(m, e), g = (e, t) => !(t && sr(d, t));
	if (l != null && l !== c) {
		if (ur(t), T(l)) d[l] = null, h(l) && (f[l] = null);
		else if (/* @__PURE__ */ qt(l)) {
			let e = t;
			g(l, e.k) && (l.value = null), e.k && (d[e.k] = null);
		}
	}
	if (w(c)) cn(c, s, 12, [o, d]);
	else {
		let t = T(c), r = /* @__PURE__ */ qt(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? h(c) ? f[c] : d[c] : g(c) || !e.k ? c.value : d[e.k];
					if (i) b(n) && _(n, a);
					else if (b(n)) n.includes(a) || n.push(a);
					else if (t) d[c] = [a], h(c) && (f[c] = d[c]);
					else {
						let t = [a];
						g(c, e.k) && (c.value = t), e.k && (d[e.k] = t);
					}
				} else t ? (d[c] = o, h(c) && (f[c] = o)) : r && (g(c, e.k) && (c.value = o), e.k && (d[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), cr.delete(e);
				};
				t.id = -1, cr.set(e, t), ji(t, n);
			} else ur(e), s();
		}
	}
}
function ur(e) {
	let t = cr.get(e);
	t && (t.flags |= 8, cr.delete(e));
}
he().requestIdleCallback, he().cancelIdleCallback;
var dr = (e) => !!e.type.__asyncLoader, fr = (e) => e.type.__isKeepAlive;
function pr(e, t) {
	hr(e, "a", t);
}
function mr(e, t) {
	hr(e, "da", t);
}
function hr(e, t, n = ha) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (_r(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) fr(e.parent.vnode) && gr(r, t, n, e), e = e.parent;
	}
}
function gr(e, t, n, r) {
	let i = _r(t, e, r, !0);
	wr(() => {
		_(r[t], i);
	}, n);
}
function _r(e, t, n = ha, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Je();
			let i = ya(n), a = ln(t, n, e, r);
			return i(), Ye(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var vr = (e) => (t, n = ha) => {
	(!Sa || e === "sp") && _r(e, (...e) => t(...e), n);
}, yr = vr("bm"), br = vr("m"), xr = vr("bu"), Sr = vr("u"), Cr = vr("bum"), wr = vr("um"), Tr = vr("sp"), Er = vr("rtg"), Dr = vr("rtc");
function Or(e, t = ha) {
	_r("ec", e, t);
}
var kr = /* @__PURE__ */ Symbol.for("v-ndc");
function Ar(e, t, n, r) {
	let i, a = n && n[r], o = b(e);
	if (o || T(e)) {
		let n = o && /* @__PURE__ */ Bt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Ht(e), s = /* @__PURE__ */ Vt(e), e = it(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Kt(Gt(e[n])) : Gt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (E(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
var jr = (e) => e ? xa(e) ? ka(e) : jr(e.parent) : null, Mr = /* @__PURE__ */ g(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => jr(e.parent),
	$root: (e) => jr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Vr(e),
	$forceUpdate: (e) => e.f ||= () => {
		xn(e.update);
	},
	$nextTick: (e) => e.n ||= yn.bind(e.proxy),
	$watch: (e) => zn.bind(e)
}), Nr = (e, t) => e !== u && !e.__isScriptSetup && y(e, t), Pr = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (Nr(r, t)) return o[t] = 1, r[t];
			else if (i !== u && y(i, t)) return o[t] = 2, i[t];
			else if (y(a, t)) return o[t] = 3, a[t];
			else if (n !== u && y(n, t)) return o[t] = 4, n[t];
			else Ir && (o[t] = 0);
		}
		let l = Mr[t], d, f;
		if (l) return t === "$attrs" && H(e.attrs, "get", ""), l(e);
		if ((d = s.__cssModules) && (d = d[t])) return d;
		if (n !== u && y(n, t)) return o[t] = 4, n[t];
		if (f = c.config.globalProperties, y(f, t)) return f[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Nr(i, t) ? (i[t] = n, !0) : r !== u && y(r, t) ? (r[t] = n, !0) : y(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== u && s[0] !== "$" && y(e, s) || Nr(t, s) || y(a, s) || y(r, s) || y(Mr, s) || y(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? y(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Fr(e) {
	return b(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Ir = !0;
function Lr(e) {
	let t = Vr(e), n = e.proxy, r = e.ctx;
	Ir = !1, t.beforeCreate && zr(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: p, beforeUpdate: m, updated: h, activated: g, deactivated: _, beforeDestroy: v, beforeUnmount: y, destroyed: x, unmounted: S, render: C, renderTracked: T, renderTriggered: ee, errorCaptured: te, serverPrefetch: D, expose: ne, inheritAttrs: re, components: ie, directives: ae, filters: oe } = t;
	if (l && Rr(l, r, null), o) for (let e in o) {
		let t = o[e];
		w(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		E(t) && (e.data = /* @__PURE__ */ It(t));
	}
	if (Ir = !0, a) for (let e in a) {
		let t = a[e], i = ja({
			get: w(t) ? t.bind(n, n) : w(t.get) ? t.get.bind(n, n) : f,
			set: !w(t) && w(t.set) ? t.set.bind(n) : f
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) Br(s[e], r, n, e);
	if (c) {
		let e = w(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			Nn(t, e[t]);
		});
	}
	u && zr(u, e, "c");
	function O(e, t) {
		b(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (O(yr, d), O(br, p), O(xr, m), O(Sr, h), O(pr, g), O(mr, _), O(Or, te), O(Dr, T), O(Er, ee), O(Cr, y), O(wr, S), O(Tr, D), b(ne)) {
		if (ne.length) {
			let t = e.exposed ||= {};
			ne.forEach((e) => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: (t) => n[e] = t,
					enumerable: !0
				});
			});
		} else e.exposed ||= {};
	}
	C && e.render === f && (e.render = C), re != null && (e.inheritAttrs = re), ie && (e.components = ie), ae && (e.directives = ae), D && or(e);
}
function Rr(e, t, n = f) {
	b(e) && (e = Kr(e));
	for (let n in e) {
		let r = e[n], i;
		i = E(r) ? "default" in r ? Pn(r.from || n, r.default, !0) : Pn(r.from || n) : Pn(r), /* @__PURE__ */ qt(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function zr(e, t, n) {
	ln(b(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Br(e, t, n, r) {
	let i = r.includes(".") ? Bn(n, r) : () => n[r];
	if (T(e)) {
		let n = t[e];
		w(n) && Ln(i, n);
	} else if (w(e)) Ln(i, e.bind(n));
	else if (E(e)) {
		if (b(e)) e.forEach((e) => Br(e, t, n, r));
		else {
			let r = w(e.handler) ? e.handler.bind(n) : t[e.handler];
			w(r) && Ln(i, r, e);
		}
	}
}
function Vr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Hr(c, e, o, !0)), Hr(c, t, o)), E(t) && a.set(t, c), c;
}
function Hr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Hr(e, a, n, !0), i && i.forEach((t) => Hr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Ur[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Ur = {
	data: Wr,
	props: Yr,
	emits: Yr,
	methods: Jr,
	computed: Jr,
	beforeCreate: qr,
	created: qr,
	beforeMount: qr,
	mounted: qr,
	beforeUpdate: qr,
	updated: qr,
	beforeDestroy: qr,
	beforeUnmount: qr,
	destroyed: qr,
	unmounted: qr,
	activated: qr,
	deactivated: qr,
	errorCaptured: qr,
	serverPrefetch: qr,
	components: Jr,
	directives: Jr,
	watch: Xr,
	provide: Wr,
	inject: Gr
};
function Wr(e, t) {
	return t ? e ? function() {
		return g(w(e) ? e.call(this, this) : e, w(t) ? t.call(this, this) : t);
	} : t : e;
}
function Gr(e, t) {
	return Jr(Kr(e), Kr(t));
}
function Kr(e) {
	if (b(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function qr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Jr(e, t) {
	return e ? g(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Yr(e, t) {
	return e ? b(e) && b(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : g(/* @__PURE__ */ Object.create(null), Fr(e), Fr(t ?? {})) : t;
}
function Xr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = g(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = qr(e[r], t[r]);
	return n;
}
function Zr() {
	return {
		app: null,
		config: {
			isNativeTag: p,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var Qr = 0;
function $r(e, t) {
	return function(n, r = null) {
		w(n) || (n = g({}, n)), r != null && !E(r) && (r = null);
		let i = Zr(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: Qr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Na,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && w(e.install) ? (a.add(e), e.install(c, ...t)) : w(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || Z(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, ka(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (ln(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = ei;
				ei = c;
				try {
					return e();
				} finally {
					ei = t;
				}
			}
		};
		return c;
	};
}
var ei = null, ti = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${k(t)}Modifiers`] || e[`${le(t)}Modifiers`];
function ni(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || u, i = n, a = t.startsWith("update:"), o = a && ti(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => T(e) ? e.trim() : e)), o.number && (i = i.map(pe)));
	let s, c = r[s = A(t)] || r[s = A(k(t))];
	!c && a && (c = r[s = A(le(t))]), c && ln(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, ln(l, e, 6, i);
	}
}
var ri = /* @__PURE__ */ new WeakMap();
function ii(e, t, n = !1) {
	let r = n ? ri : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!w(e)) {
		let r = (e) => {
			let n = ii(e, t, !0);
			n && (s = !0, g(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (E(e) && r.set(e, null), null) : (b(a) ? a.forEach((e) => o[e] = null) : g(o, a), E(e) && r.set(e, o), o);
}
function ai(e, t) {
	return !e || !m(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), y(e, t[0].toLowerCase() + t.slice(1)) || y(e, le(t)) || y(e, t));
}
function oi(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: g } = e, _ = An(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = sa(l.call(t, e, u, d, p, f, m)), y = s;
		} else {
			let e = t;
			v = sa(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), y = t.props ? s : si(s);
		}
	} catch (t) {
		qi.length = 0, un(t, e, 1), v = Z(Gi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(h) && (y = ci(y, a)), b = oa(b, y, !1, !0));
	}
	return n.dirs && (b = oa(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ir(Un(b.type) && rr(b) || b, n.transition), v = b, An(_), v;
}
var si = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || m(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, ci = (e, t) => {
	let n = {};
	for (let r in e) (!h(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function li(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? ui(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (di(o, r, n) && !ai(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || ui(r, o, l) : !!o;
	return !1;
}
function ui(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (di(t, e, a) && !ai(n, a)) return !0;
	}
	return !1;
}
function di(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && E(r) && E(i) ? !ke(r, i) : r !== i;
}
function fi({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var pi = {}, mi = () => Object.create(pi), hi = (e) => Object.getPrototypeOf(e) === pi;
function gi(e, t, n, r = !1) {
	let i = {}, a = mi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), vi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Lt(i) : e.type.props ? i : a, e.attrs = a;
}
function _i(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ U(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ai(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (y(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = k(o);
						i[t] = yi(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		vi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !y(t, a) && ((r = le(a)) === a || !y(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = yi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !y(t, e)) && (delete a[e], l = !0);
	}
	l && nt(e.attrs, "set", "");
}
function vi(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (oe(c)) continue;
		let l = t[c], u;
		i && y(i, u = k(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : ai(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ U(n), r = s || u;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = yi(i, t, s, r[s], e, !y(r, s));
		}
	}
	return o;
}
function yi(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = y(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && w(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = ya(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === le(n)) && (r = !0));
	}
	return r;
}
var bi = /* @__PURE__ */ new WeakMap();
function xi(e, t, n = !1) {
	let r = n ? bi : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!w(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = xi(e, t, !0);
			g(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return E(e) && r.set(e, d), d;
	if (b(a)) for (let e = 0; e < a.length; e++) {
		let t = k(a[e]);
		Si(t) && (o[t] = u);
	}
	else if (a) for (let e in a) {
		let t = k(e);
		if (Si(t)) {
			let n = a[e], r = o[t] = b(n) || w(n) ? { type: n } : g({}, n), i = r.type, c = !1, l = !0;
			if (b(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = w(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				}
				n === "String" && (l = !1);
			}
			else c = w(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || y(r, "default")) && s.push(t);
		}
	}
	let l = [o, s];
	return E(e) && r.set(e, l), l;
}
function Si(e) {
	return e[0] !== "$" && !oe(e);
}
var Ci = (e) => e === "_" || e === "_ctx" || e === "$stable", wi = (e) => b(e) ? e.map(sa) : [sa(e)], Ti = (e, t, n) => {
	if (t._n) return t;
	let r = jn((...e) => wi(t(...e)), n);
	return r._c = !1, r;
}, Ei = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Ci(n)) continue;
		let i = e[n];
		if (w(i)) t[n] = Ti(n, i, r);
		else if (i != null) {
			let e = wi(i);
			t[n] = () => e;
		}
	}
}, Di = (e, t) => {
	let n = wi(t);
	e.slots.default = () => n;
}, Oi = (e, t, n) => {
	for (let r in t) (n || !Ci(r)) && (e[r] = t[r]);
}, ki = (e, t, n) => {
	let r = e.slots = mi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Oi(r, t, n), n && fe(r, "_", e, !0)) : Ei(t, r);
	} else t && Di(e, t);
}, Ai = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = u;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Oi(i, t, n) : (a = !t.$stable, Ei(t, i)), o = t;
	} else t && (Di(e, t), o = { default: 1 });
	if (a) for (let e in i) !Ci(e) && o[e] == null && delete i[e];
}, ji = Ui;
function Mi(e) {
	return Ni(e);
}
function Ni(e, t) {
	let n = he();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = f, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !ta(e, t) && (r = _e(e), j(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === d && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: l, ref: u, shapeFlag: f } = t;
		switch (l) {
			case Wi:
				y(e, t, n, r);
				break;
			case Gi:
				b(e, t, n, r);
				break;
			case Ki:
				e ?? x(t, n, r, o);
				break;
			case q:
				re(e, t, n, r, i, a, o, s, c);
				break;
			default: f & 1 ? w(e, t, n, r, i, a, o, s, c) : f & 6 ? ie(e, t, n, r, i, a, o, s, c) : (f & 64 || f & 128) && l.process(e, t, n, r, i, a, o, s, c, be);
		}
		u != null && i ? lr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && lr(e.ref, null, a, e, !0);
	}, y = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = h(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) T(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), te(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, T = (e, t, n, i, s, c, l, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = o(e.type, c, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && E(e.children, d, null, i, s, Pi(e, c), l, u), _ && Mn(e, null, i, "created"), ee(d, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !oe(e) && a(d, e, null, m[e], c, i);
			"value" in m && a(d, "value", null, m.value, c), (f = m.onVnodeBeforeMount) && da(f, i, e);
		}
		_ && Mn(e, null, i, "beforeMount");
		let v = Ii(s, g);
		v && g.beforeEnter(d), r(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && ji(() => {
			try {
				f && da(f, i, e), v && g.enter(d), _ && Mn(e, null, i, "mounted");
			} finally {}
		}, s);
	}, ee = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Hi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ee(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, E = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? ca(e[l]) : sa(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, te = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let m = e.props || u, h = t.props || u, g;
		if (n && Fi(n, !1), (g = h.onVnodeBeforeUpdate) && da(g, n, t, e), f && Mn(t, e, n, "beforeUpdate"), n && Fi(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (l = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(c, ""), d ? D(e.dynamicChildren, d, c, n, r, Pi(t, i), o) : s || ce(e, t, c, null, n, r, Pi(t, i), o, !1), l > 0) {
			if (l & 16) ne(c, m, h, n, i);
			else if (l & 2 && m.class !== h.class && a(c, "class", null, h.class, i), l & 4 && a(c, "style", m.style, h.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = m[r], s = h[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && p(c, t.children);
		} else !s && d == null && ne(c, m, h, n, i);
		((g = h.onVnodeUpdated) || f) && ji(() => {
			g && da(g, n, t, e), f && Mn(t, e, n, "updated");
		}, r);
	}, D = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === q || !ta(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, ne = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== u) for (let o in t) !oe(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (oe(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, re = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), E(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (D(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Li(e, t, !0)) : ce(e, t, n, f, a, o, c, l, u);
	}, ie = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ae(t, n, r, i, a, o, c) : O(e, t, c);
	}, ae = (e, t, n, r, i, a, o) => {
		let s = e.component = ma(e, r, i);
		if (fr(e) && (s.ctx.renderer = be), Ca(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, se, o), !e.el) {
				let r = s.subTree = Z(Gi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else se(s, e, t, n, i, a, o);
	}, O = (e, t, n) => {
		let r = t.component = e.component;
		if (li(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, k(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, r.vnode = t;
	}, se = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = zi(e);
					if (n) {
						t && (t.el = c.el, k(e, t, o)), n.asyncDep.then(() => {
							ji(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Fi(e, !1), t ? (t.el = c.el, k(e, t, o)) : t = c, n && de(n), (d = t.props && t.props.onVnodeBeforeUpdate) && da(d, s, t, c), Fi(e, !0);
				let f = oi(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), _e(p), e, i, a), t.el = f.el, u === null && fi(e, f.el), r && ji(r, i), (d = t.props && t.props.onVnodeUpdated) && ji(() => da(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = dr(t);
				if (Fi(e, !1), l && de(l), !m && (o = c && c.onVnodeBeforeMount) && da(o, d, t), Fi(e, !0), s && Se) {
					let t = () => {
						e.subTree = oi(e), Se(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = oi(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && ji(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					ji(() => da(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && dr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && ji(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Re(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => xn(u), Fi(e, !0), l();
	}, k = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, _i(e, t.props, r, n), Ai(e, t.children, n), Je(), wn(e), Ye();
	}, ce = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				ue(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				le(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ge(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? ue(l, d, n, r, i, a, o, s, c) : ge(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && E(d, n, r, i, a, o, s, c));
	}, le = (e, t, n, r, i, a, o, s, c) => {
		e ||= d, t ||= d;
		let l = e.length, u = t.length, f = Math.min(l, u), p = 0;
		for (; p < f; p++) {
			let r = t[p] = c ? ca(t[p]) : sa(t[p]);
			v(e[p], r, n, null, i, a, o, s, c);
		}
		l > u ? ge(e, i, a, !0, !1, f) : E(t, n, r, i, a, o, s, c, f);
	}, ue = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, f = e.length - 1, p = u - 1;
		for (; l <= f && l <= p;) {
			let r = e[l], u = t[l] = c ? ca(t[l]) : sa(t[l]);
			if (ta(r, u)) v(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= f && l <= p;) {
			let r = e[f], l = t[p] = c ? ca(t[p]) : sa(t[p]);
			if (ta(r, l)) v(r, l, n, null, i, a, o, s, c);
			else break;
			f--, p--;
		}
		if (l > f) {
			if (l <= p) {
				let e = p + 1, d = e < u ? t[e].el : r;
				for (; l <= p;) v(null, t[l] = c ? ca(t[l]) : sa(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > p) for (; l <= f;) j(e[l], i, a, !0), l++;
		else {
			let m = l, h = l, g = /* @__PURE__ */ new Map();
			for (l = h; l <= p; l++) {
				let e = t[l] = c ? ca(t[l]) : sa(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (l = 0; l < b; l++) C[l] = 0;
			for (l = m; l <= f; l++) {
				let r = e[l];
				if (y >= b) {
					j(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && ta(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? j(r, i, a, !0) : (C[u - h] = l + 1, u >= S ? S = u : x = !0, v(r, t[u], n, null, i, a, o, s, c), y++);
			}
			let w = x ? Ri(C) : d;
			for (_ = w.length - 1, l = b - 1; l >= 0; l--) {
				let e = h + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || Vi(f) : r;
				C[l] === 0 ? v(null, d, n, p, i, a, o, s, c) : x && (_ < 0 || l !== w[_] ? A(d, n, p, 2) : _--);
			}
		}
	}, A = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) A(e.component.subTree, t, n, a);
		else if (d & 128) e.suspense.move(t, n, a);
		else if (d & 64) c.move(e, t, n, be);
		else if (c === q) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) A(u[e], t, n, a);
			r(e.anchor, t, n);
		} else if (c === Ki) S(e, t, n);
		else if (a !== 2 && d & 1 && l) {
			if (a === 0) l.persisted && !s[tr] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), ji(() => l.enter(s), o));
			else {
				let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? i(s) : r(s, t, n);
				}, d = () => {
					let e = s._isLeaving || !!s[tr];
					s._isLeaving && s[tr](!0), l.persisted && !e ? u() : a(s, () => {
						u(), c && c();
					});
				};
				o ? o(s, u, d) : d();
			}
		} else r(s, t, n);
	}, j = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (Je(), lr(s, null, n, e, !0), Ye()), p != null && (!e.ctx || e.ctx === t) && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !dr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && da(_, t, e), u & 6) me(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Mn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, be, r) : l && !l.hasOnce && (a !== q || d > 0 && d & 64) ? ge(l, t, n, !1, !0) : (a === q && d & 384 || !i && u & 16) && ge(c, t, n), r && fe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && ji(() => {
			_ && da(_, t, e), h && Mn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, fe = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === q) {
			pe(n, r);
			return;
		}
		if (t === Ki) {
			C(e), a && !a.persisted && a.afterLeave && a.afterLeave();
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, pe = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, me = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Bi(c), Bi(l), r && de(r), i.stop(), a ? (a.flags |= 8, j(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, j(o, e, t, n)), s && ji(s, t), ji(() => {
			e.isUnmounted = !0;
		}, t);
	}, ge = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) j(e[o], t, n, r, i);
	}, _e = (e) => {
		if (e.shapeFlag & 6) return _e(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Hn];
		return n ? h(n) : t;
	}, ve = !1, ye = (e, t, n) => {
		let r;
		e == null ? t._vnode && (j(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ve ||= (ve = !0, wn(r), Tn(), !1);
	}, be = {
		p: v,
		um: j,
		m: A,
		r: fe,
		mt: ae,
		mc: E,
		pc: ce,
		pbc: D,
		n: _e,
		o: e
	}, xe, Se;
	return t && ([xe, Se] = t(be)), {
		render: ye,
		hydrate: xe,
		createApp: $r(ye, xe)
	};
}
function Pi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Fi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ii(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Li(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (b(r) && b(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ca(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Li(t, a)), a.type === Wi && (a.patchFlag === -1 && (a = i[e] = ca(a)), a.el = t.el), a.type === Gi && !a.el && (a.el = t.el);
	}
}
function Ri(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function zi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : zi(t);
}
function Bi(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Vi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Vi(t.subTree) : null;
}
var Hi = (e) => e.__isSuspense;
function Ui(e, t) {
	t && t.pendingBranch ? b(e) ? t.effects.push(...e) : t.effects.push(e) : Cn(e);
}
var q = /* @__PURE__ */ Symbol.for("v-fgt"), Wi = /* @__PURE__ */ Symbol.for("v-txt"), Gi = /* @__PURE__ */ Symbol.for("v-cmt"), Ki = /* @__PURE__ */ Symbol.for("v-stc"), qi = [], Ji = null;
function J(e = !1) {
	qi.push(Ji = e ? null : []);
}
function Yi() {
	qi.pop(), Ji = qi[qi.length - 1] || null;
}
var Xi = 1;
function Zi(e, t = !1) {
	Xi += e, e < 0 && Ji && t && (Ji.hasOnce = !0);
}
function Qi(e) {
	return e.dynamicChildren = Xi > 0 ? Ji || d : null, Yi(), Xi > 0 && Ji && Ji.push(e), e;
}
function Y(e, t, n, r, i, a) {
	return Qi(X(e, t, n, r, i, a, !0));
}
function $i(e, t, n, r, i) {
	return Qi(Z(e, t, n, r, i, !0));
}
function ea(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function ta(e, t) {
	return e.type === t.type && e.key === t.key;
}
var na = ({ key: e }) => e ?? null, ra = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : T(e) || /* @__PURE__ */ qt(e) || w(e) ? {
	i: On,
	r: e,
	k: t,
	f: !!n
} : e);
function X(e, t = null, n = null, r = 0, i = null, a = e === q ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && na(t),
		ref: t && ra(t),
		scopeId: kn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: On
	};
	return s ? (la(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= T(n) ? 8 : 16), Xi > 0 && !o && Ji && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Ji.push(c), c;
}
var Z = ia;
function ia(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === kr) && (e = Gi), ea(e)) {
		let r = oa(e, t, !0);
		return n && la(r, n), Xi > 0 && !a && Ji && (r.shapeFlag & 6 ? Ji[Ji.indexOf(e)] = r : Ji.push(r)), r.patchFlag = -2, r;
	}
	if (Aa(e) && (e = e.__vccOpts), t) {
		t = aa(t);
		let { class: e, style: n } = t;
		e && !T(e) && (t.class = xe(e)), E(n) && (/* @__PURE__ */ Ut(n) && !b(n) && (n = g({}, n)), t.style = ge(n));
	}
	let o = T(e) ? 1 : Hi(e) ? 128 : Un(e) ? 64 : E(e) ? 4 : w(e) ? 2 : 0;
	return X(e, t, n, r, i, o, a, !0);
}
function aa(e) {
	return e ? /* @__PURE__ */ Ut(e) || hi(e) ? g({}, e) : e : null;
}
function oa(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ua(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && na(l),
		ref: t && t.ref ? n && a ? b(a) ? a.concat(ra(t)) : [a, ra(t)] : ra(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== q ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && oa(e.ssContent),
		ssFallback: e.ssFallback && oa(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && ir(u, c.clone(u)), u;
}
function Q(e = " ", t = 0) {
	return Z(Wi, null, e, t);
}
function $(e = "", t = !1) {
	return t ? (J(), $i(Gi, null, e)) : Z(Gi, null, e);
}
function sa(e) {
	return e == null || typeof e == "boolean" ? Z(Gi) : b(e) ? Z(q, null, e.slice()) : ea(e) ? ca(e) : Z(Wi, null, String(e));
}
function ca(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : oa(e);
}
function la(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (b(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), la(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !hi(t) ? t._ctx = On : r === 3 && On && (On.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (w(t)) {
		if (r & 65) {
			la(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: On
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [Q(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function ua(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = xe([t.class, r.class]));
		else if (e === "style") t.style = ge([t.style, r.style]);
		else if (m(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(b(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !h(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function da(e, t, n, r = null) {
	ln(e, t, 7, [n, r]);
}
var fa = Zr(), pa = 0;
function ma(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || fa, a = {
		uid: pa++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Fe(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: xi(r, i),
		emitsOptions: ii(r, i),
		emit: null,
		emitted: null,
		propsDefaults: u,
		inheritAttrs: r.inheritAttrs,
		ctx: u,
		data: u,
		props: u,
		attrs: u,
		slots: u,
		refs: u,
		setupState: u,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ni.bind(null, a), e.ce && e.ce(a), a;
}
var ha = null, ga = () => ha || On, _a, va;
{
	let e = he(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	_a = t("__VUE_INSTANCE_SETTERS__", (e) => ha = e), va = t("__VUE_SSR_SETTERS__", (e) => Sa = e);
}
var ya = (e) => {
	let t = ha;
	return _a(e), e.scope.on(), () => {
		e.scope.off(), _a(t);
	};
}, ba = () => {
	ha && ha.scope.off(), _a(null);
};
function xa(e) {
	return e.vnode.shapeFlag & 4;
}
var Sa = !1;
function Ca(e, t = !1, n = !1) {
	t && va(t);
	let { props: r, children: i } = e.vnode, a = xa(e);
	gi(e, r, a, t), ki(e, i, n || t);
	let o = a ? wa(e, t) : void 0;
	return t && va(!1), o;
}
function wa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Pr);
	let { setup: r } = n;
	if (r) {
		Je();
		let n = e.setupContext = r.length > 1 ? Oa(e) : null, i = ya(e), a = cn(r, e, 0, [e.props, n]), o = te(a);
		if (Ye(), i(), (o || e.sp) && !dr(e) && or(e), o) {
			if (a.then(ba, ba), t) return a.then((n) => {
				va(!0);
				try {
					Ta(e, n, t);
				} finally {
					va(!1);
				}
			}).catch((t) => {
				un(t, e, 0);
			});
			e.asyncDep = a;
		} else Ta(e, a, t);
	} else Ea(e, t);
}
function Ta(e, t, n) {
	w(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : E(t) && (e.setupState = Qt(t)), Ea(e, n);
}
function Ea(e, t, n) {
	let r = e.type;
	e.render ||= r.render || f;
	{
		let t = ya(e);
		Je();
		try {
			Lr(e);
		} finally {
			Ye(), t();
		}
	}
}
var Da = { get(e, t) {
	return H(e, "get", ""), e[t];
} };
function Oa(e) {
	return {
		attrs: new Proxy(e.attrs, Da),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function ka(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Qt(Wt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Mr) return Mr[n](e);
		},
		has(e, t) {
			return t in e || t in Mr;
		}
	}) : e.proxy;
}
function Aa(e) {
	return w(e) && "__vccOpts" in e;
}
var ja = (e, t) => /* @__PURE__ */ en(e, t, Sa);
function Ma(e, t, n) {
	try {
		Zi(-1);
		let r = arguments.length;
		return r === 2 ? E(t) && !b(t) ? ea(t) ? Z(e, null, [t]) : Z(e, t) : Z(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && ea(n) && (n = [n]), Z(e, t, n));
	} finally {
		Zi(1);
	}
}
var Na = "3.5.43", Pa = void 0, Fa = typeof window < "u" && window.trustedTypes;
if (Fa) try {
	Pa = /* @__PURE__ */ Fa.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Ia = Pa ? (e) => Pa.createHTML(e) : (e) => e, La = "http://www.w3.org/2000/svg", Ra = "http://www.w3.org/1998/Math/MathML", za = typeof document < "u" ? document : null, Ba = za && /* @__PURE__ */ za.createElement("template"), Va = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? za.createElementNS(La, e) : t === "mathml" ? za.createElementNS(Ra, e) : n ? za.createElement(e, { is: n }) : za.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => za.createTextNode(e),
	createComment: (e) => za.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => za.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Ba.innerHTML = Ia(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ba.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ha = /* @__PURE__ */ Symbol("_vtc");
function Ua(e, t, n) {
	let r = e[Ha];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Wa = /* @__PURE__ */ Symbol("_vod"), Ga = /* @__PURE__ */ Symbol("_vsh"), Ka = /* @__PURE__ */ Symbol(""), qa = /(?:^|;)\s*display\s*:/;
function Ja(e, t, n) {
	let r = e.style, i = T(n), a = !1;
	if (n && !i) {
		if (t) {
			if (T(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? Xa(r, t, "");
			}
			else for (let e in t) n[e] ?? Xa(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Xa(r, i, "") : eo(e, i, !T(t) && t ? t[i] : void 0, o) || Xa(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Ka];
			e && (n += ";" + e), r.cssText = n, a = qa.test(n);
		}
	} else t && e.removeAttribute("style");
	Wa in e && (e[Wa] = a ? r.display : "", e[Ga] && (r.display = "none"));
}
var Ya = /\s*!important$/;
function Xa(e, t, n) {
	if (b(n)) n.forEach((n) => Xa(e, t, n));
	else if (n ??= "", t.startsWith("--")) Ya.test(n) ? e.setProperty(t, n.replace(Ya, ""), "important") : e.setProperty(t, n);
	else {
		let r = $a(e, t);
		Ya.test(n) ? e.setProperty(le(r), n.replace(Ya, ""), "important") : e[r] = n;
	}
}
var Za = [
	"Webkit",
	"Moz",
	"ms"
], Qa = {};
function $a(e, t) {
	let n = Qa[t];
	if (n) return n;
	let r = k(t);
	if (r !== "filter" && r in e) return Qa[t] = r;
	r = ue(r);
	for (let n = 0; n < Za.length; n++) {
		let i = Za[n] + r;
		if (i in e) return Qa[t] = i;
	}
	return t;
}
function eo(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && T(r) && n === r;
}
var to = "http://www.w3.org/1999/xlink";
function no(e, t, n, r, i, a = Ce(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(to, t.slice(6, t.length)) : e.setAttributeNS(to, t, n) : n == null || a && !we(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : ee(n) ? String(n) : n);
}
function ro(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ia(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = we(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function io(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function ao(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var oo = /* @__PURE__ */ Symbol("_vei");
function so(e, t, n, r, i = null) {
	let a = e[oo] || (e[oo] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = uo(t);
		r ? io(e, n, a[t] = ho(r, i), s) : o && (ao(e, n, o, s), a[t] = void 0);
	}
}
var co = /(Once|Passive|Capture)$/, lo = /^on:?(?:Once|Passive|Capture)$/;
function uo(e) {
	let t, n;
	for (; (n = e.match(co)) && !lo.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : le(e.slice(2)), t];
}
var fo = 0, po = /* @__PURE__ */ Promise.resolve(), mo = () => fo ||= (po.then(() => fo = 0), Date.now());
function ho(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (b(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && ln(e, t, 5, a);
			}
		} else ln(r, t, 5, [e]);
	};
	return n.value = e, n.attached = mo(), n;
}
var go = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, _o = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Ua(e, r, o) : t === "style" ? Ja(e, n, r) : m(t) ? h(t) || so(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : vo(e, t, r, o)) ? (ro(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && no(e, t, r, o, a, t !== "value")) : e._isVueCE && (yo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !T(r))) ? ro(e, k(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), no(e, t, r, o));
};
function vo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && go(t) && w(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return go(t) && T(n) ? !1 : t in e;
}
function yo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = k(t);
	return Array.isArray(n) ? n.some((e) => k(e) === r) : Object.keys(n).some((e) => k(e) === r);
}
var bo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return b(t) ? (e) => de(t, e) : t;
}, xo = /* @__PURE__ */ Symbol("_assign"), So = {
	deep: !0,
	created(e, t, n) {
		e[xo] = bo(n), io(e, "change", () => {
			let t = e._modelValue, n = wo(e), r = e.checked, i = e[xo];
			if (b(t)) {
				let e = Ae(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (S(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(To(e, r));
		});
	},
	mounted: Co,
	beforeUpdate(e, t, n) {
		e[xo] = bo(n), Co(e, t, n);
	}
};
function Co(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (b(t)) i = Ae(t, r.props.value) > -1;
	else if (S(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = ke(t, To(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
function wo(e) {
	return "_value" in e ? e._value : e.value;
}
function To(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Eo = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Do = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Eo.some((n) => e[`${n}Key`] && !t.includes(n))
}, Oo = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Do[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, ko = /* @__PURE__ */ g({ patchProp: _o }, Va), Ao;
function jo() {
	return Ao ||= Mi(ko);
}
var Mo = ((...e) => {
	let t = jo().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Po(e);
		if (!r) return;
		let i = t._component;
		!w(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, No(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function No(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Po(e) {
	return T(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/.pnpm/screenfull@6.0.2/node_modules/screenfull/index.js
var Fo = [
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
], Io = (() => {
	if (typeof document > "u") return !1;
	let e = Fo[0], t = {};
	for (let n of Fo) if (n?.[1] in document) {
		for (let [r, i] of n.entries()) t[e[r]] = i;
		return t;
	}
	return !1;
})(), Lo = {
	change: Io.fullscreenchange,
	error: Io.fullscreenerror
}, Ro = {
	request(e = document.documentElement, t) {
		return new Promise((n, r) => {
			let i = () => {
				Ro.off("change", i), n();
			};
			Ro.on("change", i);
			let a = e[Io.requestFullscreen](t);
			a instanceof Promise && a.then(i).catch(r);
		});
	},
	exit() {
		return new Promise((e, t) => {
			if (!Ro.isFullscreen) {
				e();
				return;
			}
			let n = () => {
				Ro.off("change", n), e();
			};
			Ro.on("change", n);
			let r = document[Io.exitFullscreen]();
			r instanceof Promise && r.then(n).catch(t);
		});
	},
	toggle(e, t) {
		return Ro.isFullscreen ? Ro.exit() : Ro.request(e, t);
	},
	onchange(e) {
		Ro.on("change", e);
	},
	onerror(e) {
		Ro.on("error", e);
	},
	on(e, t) {
		let n = Lo[e];
		n && document.addEventListener(n, t, !1);
	},
	off(e, t) {
		let n = Lo[e];
		n && document.removeEventListener(n, t, !1);
	},
	raw: Io
};
Object.defineProperties(Ro, {
	isFullscreen: { get: () => !!document[Io.fullscreenElement] },
	element: {
		enumerable: !0,
		get: () => document[Io.fullscreenElement] ?? void 0
	},
	isEnabled: {
		enumerable: !0,
		get: () => !!document[Io.fullscreenEnabled]
	}
}), Io || (Ro = { isEnabled: !1 });
var zo = Ro;
//#endregion
//#region packages/core/src/index.ts
function Bo(e) {
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
function Vo() {
	let e = null, t = !1, n = null, r = !1, i, a = {
		fullscreenClass: "fullscreen",
		teleport: !1,
		pageOnly: !1
	}, o = null, s = (e) => {
		t !== e && (t = e, a.callback?.(e));
	}, c = (t = !1) => {
		typeof document < "u" && document.removeEventListener("keyup", u), zo.isEnabled && zo.off("change", l), i?.(t), i = void 0, e = null, o = null;
	}, l = () => {
		zo.element === o && zo.isFullscreen ? s(!0) : (c(), s(!1));
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
			return zo.isEnabled;
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
				p = Bo(d);
			} catch (e) {
				return Promise.reject(e);
			}
			a = {
				fullscreenClass: "fullscreen",
				teleport: !1,
				pageOnly: !1,
				...f
			}, a.pageOnly ||= !zo.isEnabled, a.teleport &&= p !== document.body;
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
			]), g, _;
			if (i = (e) => {
				if (m.forEach((e) => p.classList.remove(e)), a.pageOnly || a.teleport) for (let [e, t, n] of h) t ? p.style.setProperty(e, t, n) : p.style.removeProperty(e);
				if (g?.parentNode) {
					let t = g.parentNode;
					if (p.parentNode ? g.parentNode.replaceChild(p, g) : g.parentNode.removeChild(g), e && _) {
						let e = _;
						t.insertBefore(e, p.parentNode === t ? p : null), Promise.resolve().then(() => {
							let t = e.parentNode;
							if (t) {
								for (; e.firstChild;) t.insertBefore(e.firstChild, e);
								t.removeChild(e);
							}
						});
						return;
					}
				}
				_?.parentNode && _.parentNode.removeChild(_);
			}, e = p, m.forEach((e) => p.classList.add(e)), (a.pageOnly || a.teleport) && Object.assign(p.style, {
				position: "fixed",
				left: "0",
				top: "0",
				width: "100%",
				height: "100%"
			}), a.teleport && p.parentNode && (g = document.createComment("fullscreen"), p.parentNode.insertBefore(g, p), _ = document.createElement("div"), _.setAttribute("data-fullscreen-teleport", ""), _.style.display = "contents", document.body.appendChild(_), _.appendChild(p)), a.pageOnly) return document.addEventListener("keyup", u), s(!0), Promise.resolve();
			o = a.teleport ? document.body : p, zo.on("change", l);
			try {
				return n = zo.request(o).then(() => {
					if (r) return zo.element === o ? zo.exit() : void 0;
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
			n && await n, t && (a.pageOnly ? (c(), s(!1)) : (await zo.exit(), t && (c(), s(!1))));
		},
		dispose() {
			r = !0;
			let e = o, t = n;
			c(!0);
			try {
				s(!1);
			} finally {
				if (zo.isEnabled) {
					let n = () => {
						if (e && zo.element === e) return zo.exit();
					};
					t ? t.then(n, () => {}).catch(() => {}) : Promise.resolve(n()).catch(() => {});
				}
			}
		}
	};
	return d;
}
var Ho = Vo(), Uo = {
	get options() {
		return Ho.options;
	},
	get element() {
		return Ho.element;
	},
	get isFullscreen() {
		return Ho.isFullscreen;
	},
	get isSupported() {
		return Ho.isSupported;
	},
	get isEnabled() {
		return Ho.isSupported;
	},
	enter: (e, t) => Ho.enter(e, t),
	request: (e, t) => Ho.enter(e, t),
	toggle: (e, t, n) => Ho.toggle(e, t, n),
	exit: () => Ho.exit(),
	dispose() {
		let e = Ho;
		Ho = Vo(), Ko = null, e.dispose();
	}
}, Wo = {
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
}, Go = /* @__PURE__ */ new WeakMap(), Ko = null;
function qo(e) {
	let t = Go.get(e);
	t && e.removeEventListener("click", t), Go.delete(e);
}
function Jo(e) {
	qo(e), Ko === e && Uo.dispose();
}
function Yo(e, t) {
	qo(e);
	let n = () => {
		try {
			let { target: n, ...i } = typeof t.value == "string" ? { target: t.value } : t.value ?? {}, a = Ho;
			a.element || (Ko = e), a.toggle(n, {
				teleport: !!t.modifiers.teleport,
				pageOnly: !!t.modifiers.pageOnly,
				...i,
				callback: (e) => {
					!e && Ho === a && (Ko = null), i.callback?.(e);
				}
			}).catch((e) => {
				Ho === a && !a.element && (Ko = null), r(e);
			});
		} catch (e) {
			r(e);
		}
	}, r = (t) => {
		let n = document.createEvent("CustomEvent");
		n.initCustomEvent("fullscreen-error", !0, !1, t), e.dispatchEvent(n);
	};
	Go.set(e, n), e.addEventListener("click", n);
}
var Xo = /* @__PURE__ */ ar({
	name: "Fullscreen",
	inheritAttrs: !1,
	props: {
		...Wo,
		modelValue: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"change",
		"update:modelValue",
		"update:fullscreen",
		"error"
	],
	setup(e, { emit: t }) {
		let n = /* @__PURE__ */ W(), r = /* @__PURE__ */ W(!1), i = Vo(), a = (e) => {
			r.value = e, t("change", e), t("update:modelValue", e), t("update:fullscreen", e);
		}, o = () => i.enter(n.value, {
			pageOnly: e.pageOnly,
			teleport: e.teleport,
			fullscreenClass: e.fullscreenClass,
			callback: a
		}), s = () => i.exit(), c = (e) => e ?? !i.isFullscreen ? o() : s(), l = (e) => {
			c(e).catch((e) => t("error", e));
		};
		return Ln(() => e.modelValue, l), Ln(() => e.fullscreen, l), br(() => {
			(e.modelValue || e.fullscreen) && l(!0);
		}), Cr(() => i.dispose()), {
			wrapper: n,
			enter: o,
			request: o,
			exit: s,
			toggle: c,
			isFullscreen: r,
			isSupported: i.isSupported,
			isEnabled: i.isSupported,
			shadeClick: (t) => {
				e.exitOnClickWrapper && t.target === n.value && l(!1);
			}
		};
	},
	render() {
		return Ma("div", ua(this.$attrs, {
			ref: "wrapper",
			class: { [this.fullscreenClass]: this.isFullscreen },
			onClick: this.shadeClick
		}), this.$slots.default?.());
	}
}), Zo = {
	mounted: Yo,
	updated: Yo,
	beforeUnmount: Jo
}, Qo = (e) => typeof e == "function" ? e() : G(e);
function $o(e, t = {}) {
	let n = Vo(), r = /* @__PURE__ */ W(!1), i = () => n.enter(e, {
		pageOnly: Qo(t.pageOnly ?? !1),
		teleport: Qo(t.teleport ?? !1),
		fullscreenClass: Qo(t.fullscreenClass ?? "fullscreen"),
		callback: (e) => {
			r.value = e;
		}
	});
	return ga() && Cr(() => {
		n.dispose(), r.value = !1;
	}), {
		isFullscreen: /* @__PURE__ */ Rt(r),
		isSupported: ja(() => n.isSupported),
		enter: i,
		exit: () => n.exit(),
		toggle: () => n.isFullscreen ? n.exit() : i()
	};
}
//#endregion
//#region node_modules/.pnpm/v-viewer@5.0.0_vue@3.5.43_typescript@7.0.2_/node_modules/v-viewer/index.js
var es = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
		}, u = "<div class=\"viewer-container\" tabindex=\"-1\" touch-action=\"none\"><div class=\"viewer-canvas\"></div><div class=\"viewer-footer\"><div class=\"viewer-title\"></div><div class=\"viewer-toolbar\"></div><div class=\"viewer-navbar\"><ul class=\"viewer-list\" role=\"navigation\"></ul></div></div><div class=\"viewer-tooltip\" role=\"alert\" aria-hidden=\"true\"></div><div class=\"viewer-button\" data-viewer-action=\"mix\" role=\"button\"></div><div class=\"viewer-player\"></div></div>", d = typeof window < "u" && window.document !== void 0, f = d ? window : {}, p = d && f.document.documentElement ? "ontouchstart" in f.document.documentElement : !1, m = d ? "PointerEvent" in f : !1, h = "viewer", g = "move", _ = "switch", v = "zoom", y = `${h}-active`, b = `${h}-close`, x = `${h}-fade`, S = `${h}-fixed`, C = `${h}-fullscreen`, w = `${h}-fullscreen-exit`, T = `${h}-hide`, ee = `${h}-hide-md-down`, E = `${h}-hide-sm-down`, te = `${h}-hide-xs-down`, D = `${h}-in`, ne = `${h}-invisible`, re = `${h}-loading`, ie = `${h}-move`, ae = `${h}-open`, oe = `${h}-show`, O = `${h}-transition`, se = "click", k = "dblclick", ce = "dragstart", le = "focusin", ue = "keydown", A = "load", j = "error", de = p ? "touchend touchcancel" : "mouseup", fe = p ? "touchmove" : "mousemove", pe = m ? "pointerdown" : p ? "touchstart" : "mousedown", me = m ? "pointermove" : fe, he = m ? "pointerup pointercancel" : de, ge = "resize", _e = "transitionend", ve = "wheel", ye = "ready", be = "show", xe = "shown", Se = "hide", Ce = "hidden", we = "view", Te = "viewed", Ee = "move", De = "moved", Oe = "rotate", ke = "rotated", Ae = "scale", je = "scaled", Me = "zoom", Ne = "zoomed", Pe = "play", M = "stop", Fe = `${h}Action`, Ie = /\s\s*/, N = [
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
		function Le(e) {
			return typeof e == "string";
		}
		var Re = Number.isNaN || f.isNaN;
		function P(e) {
			return typeof e == "number" && !Re(e);
		}
		function ze(e) {
			return e === void 0;
		}
		function Be(e) {
			return c(e) === "object" && e !== null;
		}
		var Ve = Object.prototype.hasOwnProperty;
		function He(e) {
			if (!Be(e)) return !1;
			try {
				var t = e.constructor, n = t.prototype;
				return t && n && Ve.call(n, "isPrototypeOf");
			} catch {
				return !1;
			}
		}
		function F(e) {
			return typeof e == "function";
		}
		function I(e, t) {
			if (e && F(t)) {
				if (Array.isArray(e) || P(e.length)) for (var n = e.length, r = 0; r < n && t.call(e, e[r], r, e) !== !1; r += 1);
				else Be(e) && Object.keys(e).forEach(function(n) {
					t.call(e, e[n], n, e);
				});
			}
			return e;
		}
		var Ue = Object.assign || function(e) {
			var t = [...arguments].slice(1);
			return Be(e) && t.length > 0 && t.forEach(function(t) {
				Be(t) && Object.keys(t).forEach(function(n) {
					e[n] = t[n];
				});
			}), e;
		}, We = /^(?:width|height|left|top|marginLeft|marginTop)$/;
		function Ge(e, t) {
			var n = e.style;
			I(t, function(e, t) {
				We.test(t) && P(e) && (e += "px"), n[t] = e;
			});
		}
		function Ke(e) {
			return Le(e) ? e.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
		}
		function qe(e, t) {
			return !e || !t ? !1 : e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1;
		}
		function L(e, t) {
			if (e && t) {
				if (P(e.length)) I(e, function(e) {
					L(e, t);
				});
				else if (e.classList) e.classList.add(t);
				else {
					var n = e.className.trim();
					n ? n.indexOf(t) < 0 && (e.className = `${n} ${t}`) : e.className = t;
				}
			}
		}
		function R(e, t) {
			e && t && (P(e.length) ? I(e, function(e) {
				R(e, t);
			}) : e.classList ? e.classList.remove(t) : e.className.indexOf(t) >= 0 && (e.className = e.className.replace(t, "")));
		}
		function Je(e, t, n) {
			t && (P(e.length) ? I(e, function(e) {
				Je(e, t, n);
			}) : n ? L(e, t) : R(e, t));
		}
		var Ye = /([a-z\d])([A-Z])/g;
		function Xe(e) {
			return e.replace(Ye, "$1-$2").toLowerCase();
		}
		function Ze(e, t) {
			return Be(e[t]) ? e[t] : e.dataset ? e.dataset[t] : e.getAttribute(`data-${Xe(t)}`);
		}
		function Qe(e, t, n) {
			Be(n) ? e[t] = n : e.dataset ? e.dataset[t] = n : e.setAttribute(`data-${Xe(t)}`, n);
		}
		var $e = function() {
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
		function z(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = n;
			t.trim().split(Ie).forEach(function(t) {
				if (!$e) {
					var a = e.listeners;
					a && a[t] && a[t][n] && (i = a[t][n], delete a[t][n], Object.keys(a[t]).length === 0 && delete a[t], Object.keys(a).length === 0 && delete e.listeners);
				}
				e.removeEventListener(t, i, r);
			});
		}
		function B(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = n;
			t.trim().split(Ie).forEach(function(t) {
				if (r.once && !$e) {
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
		function V(e, t, n, r) {
			var i;
			return F(Event) && F(CustomEvent) ? i = new CustomEvent(t, a({
				bubbles: !0,
				cancelable: !0,
				detail: n
			}, r)) : (i = document.createEvent("CustomEvent"), i.initCustomEvent(t, !0, !0, n)), e.dispatchEvent(i);
		}
		function et(e) {
			var t = e.getBoundingClientRect();
			return {
				left: t.left + (window.pageXOffset - document.documentElement.clientLeft),
				top: t.top + (window.pageYOffset - document.documentElement.clientTop)
			};
		}
		function tt(e) {
			var t = e.rotate, n = e.scaleX, r = e.scaleY, i = e.translateX, a = e.translateY, o = [];
			P(i) && i !== 0 && o.push(`translateX(${i}px)`), P(a) && a !== 0 && o.push(`translateY(${a}px)`), P(t) && t !== 0 && o.push(`rotate(${t}deg)`), P(n) && n !== 1 && o.push(`scaleX(${n})`), P(r) && r !== 1 && o.push(`scaleY(${r})`);
			var s = o.length ? o.join(" ") : "none";
			return {
				WebkitTransform: s,
				msTransform: s,
				transform: s
			};
		}
		function H(e) {
			return Le(e) ? decodeURIComponent(e.replace(/^.*\//, "").replace(/[?&#].*$/, "")) : "";
		}
		var nt = f.navigator && /Version\/\d+(\.\d+)+?\s+Safari/i.test(f.navigator.userAgent);
		function rt(e, t, n) {
			var r = document.createElement("img");
			if (e.naturalWidth && !nt) return n(e.naturalWidth, e.naturalHeight), r;
			var i = document.body || document.documentElement;
			return r.onload = function() {
				n(r.width, r.height), nt || i.removeChild(r);
			}, I(t.inheritedAttributes, function(t) {
				var n = e.getAttribute(t);
				n !== null && r.setAttribute(t, n);
			}), r.src = e.src, nt || (r.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", i.appendChild(r)), r;
		}
		function it(e) {
			switch (e) {
				case 2: return te;
				case 3: return E;
				case 4: return ee;
				default: return "";
			}
		}
		function at(e) {
			var t = a({}, e), n = [];
			return I(e, function(e, r) {
				delete t[r], I(t, function(t) {
					var r = Math.abs(e.startX - t.startX), i = Math.abs(e.startY - t.startY), a = Math.abs(e.endX - t.endX), o = Math.abs(e.endY - t.endY), s = Math.sqrt(r * r + i * i), c = (Math.sqrt(a * a + o * o) - s) / s;
					n.push(c);
				});
			}), n.sort(function(e, t) {
				return Math.abs(e) < Math.abs(t);
			}), n[0];
		}
		function ot(e, t) {
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
		function st(e) {
			var t = 0, n = 0, r = 0;
			return I(e, function(e) {
				var i = e.startX, a = e.startY;
				t += i, n += a, r += 1;
			}), t /= r, n /= r, {
				pageX: t,
				pageY: n
			};
		}
		var ct = {
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
				}, this.parentData = n), (this.fulled || !n) && (n = this.containerData), this.viewerData = Ue({}, n);
			},
			renderViewer: function() {
				this.options.inline && !this.fulled && Ge(this.viewer, this.viewerData);
			},
			initList: function() {
				var e = this, t = this.element, n = this.options, r = this.list, i = [];
				r.innerHTML = "", I(this.images, function(t, a) {
					var o = t.src, s = t.alt || H(o), c = e.getImageURL(t);
					if (o || c) {
						var l = document.createElement("li"), u = document.createElement("img");
						I(n.inheritedAttributes, function(e) {
							var n = t.getAttribute(e);
							n !== null && u.setAttribute(e, n);
						}), n.navbar && (u.src = o || c), u.alt = s, u.setAttribute("data-original-url", c || o), l.setAttribute("data-index", a), l.setAttribute("data-viewer-action", "view"), l.setAttribute("role", "button"), n.keyboard && l.setAttribute("tabindex", 0), l.appendChild(u), r.appendChild(l), i.push(l);
					}
				}), this.items = i, I(i, function(t) {
					var r = t.firstElementChild, i, a;
					Qe(r, "filled", !0), n.loading && L(t, re), B(r, A, i = function(i) {
						z(r, j, a), n.loading && R(t, re), e.loadImage(i);
					}, { once: !0 }), B(r, j, a = function() {
						z(r, A, i), n.loading && R(t, re);
					}, { once: !0 });
				}), n.transition && B(t, Te, function() {
					L(r, O);
				}, { once: !0 });
			},
			renderList: function() {
				var e = this.index, t = this.items[e];
				if (t) {
					var n = t.nextElementSibling, r = parseInt(window.getComputedStyle(n || t).marginLeft, 10), i = t.offsetWidth, a = i + r;
					Ge(this.list, Ue({ width: a * this.length - r }, tt({ translateX: (this.viewerData.width - i) / 2 - a * e })));
				}
			},
			resetList: function() {
				var e = this.list;
				e.innerHTML = "", R(e, O), Ge(e, tt({ translateX: 0 }));
			},
			initImage: function(e) {
				var t = this, n = this.options, r = this.image, i = this.viewerData, a = this.footer.offsetHeight, o = i.width, s = Math.max(i.height - a, a), c = this.imageData || {}, l;
				this.imageInitializing = { abort: function() {
					l.onload = null;
				} }, l = rt(r, n, function(r, i) {
					var a = r / i, l = Math.max(0, Math.min(1, n.initialCoverage)), u = o, d = s;
					t.imageInitializing = !1, s * a > o ? d = o / a : u = s * a, l = P(l) ? l : .9, u = Math.min(u * l, r), d = Math.min(d * l, i);
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
					}, h = Ue({}, m);
					n.rotatable && (m.rotate = c.rotate || 0, h.rotate = 0), n.scalable && (m.scaleX = c.scaleX || 1, m.scaleY = c.scaleY || 1, h.scaleX = 1, h.scaleY = 1), t.imageData = m, t.initialImageData = h, e && e();
				});
			},
			renderImage: function(e) {
				var t = this, n = this.image, r = this.imageData;
				if (Ge(n, Ue({
					width: r.width,
					height: r.height,
					marginLeft: r.x,
					marginTop: r.y
				}, tt(r))), e) {
					if ((this.viewing || this.moving || this.rotating || this.scaling || this.zooming) && this.options.transition && qe(n, O)) {
						var i = function() {
							t.imageRendering = !1, e();
						};
						this.imageRendering = { abort: function() {
							z(n, _e, i);
						} }, B(n, _e, i, { once: !0 });
					} else e();
				}
			},
			resetImage: function() {
				var e = this.image;
				e && (this.viewing && this.viewing.abort(), e.parentNode.removeChild(e), this.image = null, this.title.innerHTML = "");
			}
		}, lt = {
			bind: function() {
				var e = this.options, t = this.viewer, n = this.canvas, r = this.element.ownerDocument;
				B(t, se, this.onClick = this.click.bind(this)), B(t, ce, this.onDragStart = this.dragstart.bind(this)), B(n, pe, this.onPointerDown = this.pointerdown.bind(this)), B(r, me, this.onPointerMove = this.pointermove.bind(this)), B(r, he, this.onPointerUp = this.pointerup.bind(this)), B(r, ue, this.onKeyDown = this.keydown.bind(this)), B(window, ge, this.onResize = this.resize.bind(this)), e.zoomable && e.zoomOnWheel && B(t, ve, this.onWheel = this.wheel.bind(this), {
					passive: !1,
					capture: !0
				}), e.toggleOnDblclick && B(n, k, this.onDblclick = this.dblclick.bind(this));
			},
			unbind: function() {
				var e = this.options, t = this.viewer, n = this.canvas, r = this.element.ownerDocument;
				z(t, se, this.onClick), z(t, ce, this.onDragStart), z(n, pe, this.onPointerDown), z(r, me, this.onPointerMove), z(r, he, this.onPointerUp), z(r, ue, this.onKeyDown), z(window, ge, this.onResize), e.zoomable && e.zoomOnWheel && z(t, ve, this.onWheel, {
					passive: !1,
					capture: !0
				}), e.toggleOnDblclick && z(n, k, this.onDblclick);
			}
		}, ut = {
			click: function(e) {
				var t = this.options, n = this.imageData, r = e.target, i = Ze(r, Fe);
				switch (!i && r.localName === "img" && r.parentElement.localName === "li" && (r = r.parentElement, i = Ze(r, Fe)), p && e.isTrusted && r === this.canvas && clearTimeout(this.clickCanvasTimeout), i) {
					case "mix":
						this.played ? this.stop() : t.inline ? this.fulled ? this.exit() : this.full() : this.hide();
						break;
					case "hide":
						this.pointerMoved || this.hide();
						break;
					case "view":
						this.view(Ze(r, "index"));
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
				R(r, ne), n.loading && R(this.canvas, re), r.style.cssText = `height:0;margin-left:${a.width / 2}px;margin-top:${a.height / 2}px;max-width:none!important;position:relative;width:0;`, this.initImage(function() {
					Je(r, ie, n.movable), Je(r, O, n.transition), e.renderImage(function() {
						e.viewed = !0, e.viewing = !1, F(n.viewed) && B(t, Te, n.viewed, { once: !0 }), V(t, Te, {
							originalImage: e.images[i],
							index: i,
							image: r
						}, { cancelable: !1 });
					});
				});
			},
			loadImage: function(e) {
				var t = e.target, n = t.parentNode, r = n.offsetWidth || 30, i = n.offsetHeight || 50, a = !!Ze(t, "filled");
				rt(t, this.options, function(e, n) {
					var o = e / n, s = r, c = i;
					i * o > r ? a ? s = i * o : c = r / o : a ? c = r / o : s = i * o, Ge(t, Ue({
						width: s,
						height: c
					}, tt({
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
				if (this.pointerMoved = !1, !(!this.viewed || this.showing || this.viewing || this.hiding || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (P(r) && r !== 1 || P(i) && i !== 0 || e.ctrlKey))) {
					e.preventDefault(), e.changedTouches ? I(e.changedTouches, function(e) {
						n[e.identifier] = ot(e);
					}) : n[e.pointerId || 0] = ot(e);
					var a = t.movable ? g : !1;
					t.zoomOnTouch && t.zoomable && Object.keys(n).length > 1 ? a = v : t.slideOnTouch && (e.pointerType === "touch" || e.type === "touchstart") && this.isSwitchable() && (a = _), t.transition && (a === g || a === v) && R(this.image, O), this.action = a;
				}
			},
			pointermove: function(e) {
				var t = this.pointers, n = this.action;
				this.viewed && n && (e.preventDefault(), e.changedTouches ? I(e.changedTouches, function(e) {
					Ue(t[e.identifier] || {}, ot(e, !0));
				}) : Ue(t[e.pointerId || 0] || {}, ot(e, !0)), this.change(e));
			},
			pointerup: function(e) {
				var t = this, n = this.options, r = this.action, i = this.pointers, a;
				e.changedTouches ? I(e.changedTouches, function(e) {
					a = i[e.identifier], delete i[e.identifier];
				}) : (a = i[e.pointerId || 0], delete i[e.pointerId || 0]), r && (e.preventDefault(), n.transition && (r === g || r === v) && L(this.image, O), this.action = !1, p && r !== v && a && Date.now() - a.timeStamp < 500 && (clearTimeout(this.clickCanvasTimeout), clearTimeout(this.doubleClickImageTimeout), n.toggleOnDblclick && this.viewed && e.target === this.image ? this.imageClicked ? (this.imageClicked = !1, this.doubleClickImageTimeout = setTimeout(function() {
					V(t.image, k, { originalEvent: e });
				}, 50)) : (this.imageClicked = !0, this.doubleClickImageTimeout = setTimeout(function() {
					t.imageClicked = !1;
				}, 500)) : (this.imageClicked = !1, n.backdrop && n.backdrop !== "static" && e.target === this.canvas && (this.clickCanvasTimeout = setTimeout(function() {
					V(t.canvas, se, { originalEvent: e });
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
					I(this.player.getElementsByTagName("img"), function(t) {
						B(t, A, e.loadImage.bind(e), { once: !0 }), V(t, A);
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
		}, dt = {
			show: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], t = this.element, n = this.options;
				if (n.inline || this.showing || this.isShown || this.showing) return this;
				if (!this.ready) return this.build(), this.ready && this.show(e), this;
				if (F(n.show) && B(t, be, n.show, { once: !0 }), V(t, be) === !1 || !this.ready) return this;
				this.hiding && this.transitioning.abort(), this.showing = !0, this.open();
				var r = this.viewer;
				if (R(r, T), r.setAttribute("role", "dialog"), r.setAttribute("aria-labelledby", this.title.id), r.setAttribute("aria-modal", !0), r.removeAttribute("aria-hidden"), n.transition && !e) {
					var i = this.shown.bind(this);
					this.transitioning = { abort: function() {
						z(r, _e, i), R(r, D);
					} }, L(r, O), r.initialOffsetWidth = r.offsetWidth, B(r, _e, i, { once: !0 }), L(r, D);
				} else L(r, D), this.shown();
				return this;
			},
			hide: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], n = this.element, r = this.options;
				if (r.inline || this.hiding || !(this.isShown || this.showing) || (F(r.hide) && B(n, Se, r.hide, { once: !0 }), V(n, Se) === !1)) return this;
				this.showing && this.transitioning.abort(), this.hiding = !0, this.played ? this.stop() : this.viewing && this.viewing.abort();
				var i = this.viewer, a = this.image, o = function() {
					R(i, D), e.hidden();
				};
				if (r.transition && !t) {
					var s = function(t) {
						t && t.target === i && (z(i, _e, s), e.hidden());
					}, c = function() {
						qe(i, O) ? (B(i, _e, s), R(i, D)) : o();
					};
					this.transitioning = { abort: function() {
						e.viewed && qe(a, O) ? z(a, _e, c) : qe(i, O) && z(i, _e, s);
					} }, this.viewed && qe(a, O) ? (B(a, _e, c, { once: !0 }), this.zoomTo(0, !1, null, null, !0)) : c();
				} else o();
				return this;
			},
			view: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.initialViewIndex;
				if (t = Number(t) || 0, this.hiding || this.played || t < 0 || t >= this.length || this.viewed && t === this.index) return this;
				if (!this.isShown) return this.index = t, this.show();
				this.viewing && this.viewing.abort();
				var n = this.element, r = this.options, i = this.title, a = this.canvas, o = this.items[t], s = o.querySelector("img"), c = Ze(s, "originalUrl"), l = s.getAttribute("alt"), u = document.createElement("img");
				if (I(r.inheritedAttributes, function(e) {
					var t = s.getAttribute(e);
					t !== null && u.setAttribute(e, t);
				}), u.src = c, u.alt = l, F(r.view) && B(n, we, r.view, { once: !0 }), V(n, we, {
					originalImage: this.images[t],
					index: t,
					image: u
				}) === !1 || !this.isShown || this.hiding || this.played) return this;
				var d = this.items[this.index];
				d && (R(d, y), d.removeAttribute("aria-selected")), L(o, y), o.setAttribute("aria-selected", !0), r.focus && o.focus(), this.image = u, this.viewed = !1, this.index = t, this.imageData = {}, L(u, ne), r.loading && L(a, re), a.innerHTML = "", a.appendChild(u), this.renderList(), i.innerHTML = "";
				var f = function() {
					var t = e.imageData, n = Array.isArray(r.title) ? r.title[1] : r.title;
					i.innerHTML = Ke(F(n) ? n.call(e, u, t) : `${l} (${t.naturalWidth} × ${t.naturalHeight})`);
				}, p, m;
				return B(n, Te, f, { once: !0 }), this.viewing = { abort: function() {
					z(n, Te, f), u.complete ? e.imageRendering ? e.imageRendering.abort() : e.imageInitializing && e.imageInitializing.abort() : (u.src = "", z(u, A, p), e.timeout && clearTimeout(e.timeout));
				} }, u.complete ? this.load() : (B(u, A, p = function() {
					z(u, j, m), e.load();
				}, { once: !0 }), B(u, j, m = function() {
					z(u, A, p), e.timeout &&= (clearTimeout(e.timeout), !1), R(u, ne), r.loading && R(e.canvas, re);
				}, { once: !0 }), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function() {
					R(u, ne), e.timeout = !1;
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
				return this.moveTo(ze(e) ? e : n.x + Number(e), ze(t) ? t : n.y + Number(t)), this;
			},
			moveTo: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, i = this.element, a = this.options, o = this.imageData;
				if (e = Number(e), n = Number(n), this.viewed && !this.played && a.movable) {
					var s = o.x, c = o.y, l = !1;
					if (P(e) ? l = !0 : e = s, P(n) ? l = !0 : n = c, l) {
						if (F(a.move) && B(i, Ee, a.move, { once: !0 }), V(i, Ee, {
							x: e,
							y: n,
							oldX: s,
							oldY: c,
							originalEvent: r
						}) === !1) return this;
						o.x = e, o.y = n, o.left = e, o.top = n, this.moving = !0, this.renderImage(function() {
							t.moving = !1, F(a.moved) && B(i, De, a.moved, { once: !0 }), V(i, De, {
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
				if (e = Number(e), P(e) && this.viewed && !this.played && r.rotatable) {
					var a = i.rotate;
					if (F(r.rotate) && B(n, Oe, r.rotate, { once: !0 }), V(n, Oe, {
						degree: e,
						oldDegree: a
					}) === !1) return this;
					i.rotate = e, this.rotating = !0, this.renderImage(function() {
						t.rotating = !1, F(r.rotated) && B(n, ke, r.rotated, { once: !0 }), V(n, ke, {
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
					if (P(e) ? c = !0 : e = o, P(n) ? c = !0 : n = s, c) {
						if (F(i.scale) && B(r, Ae, i.scale, { once: !0 }), V(r, Ae, {
							scaleX: e,
							scaleY: n,
							oldScaleX: o,
							oldScaleY: s
						}) === !1) return this;
						a.scaleX = e, a.scaleY = n, this.scaling = !0, this.renderImage(function() {
							t.scaling = !1, F(i.scaled) && B(r, je, i.scaled, { once: !0 }), V(r, je, {
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
				if (e = Math.max(0, e), P(e) && this.viewed && !this.played && (a || s.zoomable)) {
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
					var v = m * e, y = h * e, b = v - f, x = y - p, S = l.ratio;
					if (F(s.zoom) && B(o, Me, s.zoom, { once: !0 }), V(o, Me, {
						ratio: e,
						oldRatio: S,
						originalEvent: i
					}) === !1) return this;
					if (this.zooming = !0, i) {
						var C = et(this.viewer), w = c && Object.keys(c).length > 0 ? st(c) : {
							pageX: i.pageX,
							pageY: i.pageY
						};
						l.x -= b * ((w.pageX - C.left - u) / f), l.y -= x * ((w.pageY - C.top - d) / p);
					} else He(r) && P(r.x) && P(r.y) ? (l.x -= b * ((r.x - u) / f), l.y -= x * ((r.y - d) / p)) : (l.x -= b / 2, l.y -= x / 2);
					l.left = l.x, l.top = l.y, l.width = v, l.height = y, l.oldRatio = S, l.ratio = e, this.renderImage(function() {
						t.zooming = !1, F(s.zoomed) && B(o, Ne, s.zoomed, { once: !0 }), V(o, Ne, {
							ratio: e,
							oldRatio: S,
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
				if (F(r.play) && B(n, Pe, r.play, { once: !0 }), V(n, Pe) === !1) return this;
				var i = this.player, a = this.loadImage.bind(this), o = [], s = 0, c = 0;
				if (this.played = !0, this.onLoadWhenPlay = a, t && this.requestFullscreen(t), L(i, oe), I(this.items, function(e, t) {
					var n = e.querySelector("img"), l = document.createElement("img");
					l.src = Ze(n, "originalUrl"), l.alt = n.getAttribute("alt"), l.referrerPolicy = n.referrerPolicy, s += 1, L(l, x), Je(l, O, r.transition), qe(e, y) && (L(l, D), c = t), o.push(l), B(l, A, a, { once: !0 }), i.appendChild(l);
				}), P(r.interval) && r.interval > 0) {
					var l = function() {
						clearTimeout(e.playing.timeout), R(o[c], D), --c, c = c >= 0 ? c : s - 1, L(o[c], D), e.playing.timeout = setTimeout(l, r.interval);
					}, u = function() {
						clearTimeout(e.playing.timeout), R(o[c], D), c += 1, c = c < s ? c : 0, L(o[c], D), e.playing.timeout = setTimeout(u, r.interval);
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
				if (F(n.stop) && B(t, M, n.stop, { once: !0 }), V(t, M) === !1) return this;
				var r = this.player;
				return clearTimeout(this.playing.timeout), this.playing = !1, this.played = !1, I(r.getElementsByTagName("img"), function(t) {
					z(t, A, e.onLoadWhenPlay);
				}), R(r, oe), r.innerHTML = "", this.exitFullscreen(), this;
			},
			full: function() {
				var e = this, t = this.options, n = this.viewer, r = this.image, i = this.list;
				return !this.isShown || this.played || this.fulled || !t.inline || (this.fulled = !0, this.open(), L(this.button, w), t.transition && (R(i, O), this.viewed && R(r, O)), L(n, S), n.setAttribute("role", "dialog"), n.setAttribute("aria-labelledby", this.title.id), n.setAttribute("aria-modal", !0), n.removeAttribute("style"), Ge(n, { zIndex: t.zIndex }), t.focus && this.enforceFocus(), this.initContainer(), this.viewerData = Ue({}, this.containerData), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage(function() {
						t.transition && setTimeout(function() {
							L(r, O), L(i, O);
						}, 0);
					});
				})), this;
			},
			exit: function() {
				var e = this, t = this.options, n = this.viewer, r = this.image, i = this.list;
				return !this.isShown || this.played || !this.fulled || !t.inline || (this.fulled = !1, this.close(), R(this.button, w), t.transition && (R(i, O), this.viewed && R(r, O)), t.focus && this.clearEnforceFocus(), n.removeAttribute("role"), n.removeAttribute("aria-labelledby"), n.removeAttribute("aria-modal"), R(n, S), Ge(n, { zIndex: t.zIndexInline }), this.viewerData = Ue({}, this.parentData), this.renderViewer(), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage(function() {
						t.transition && setTimeout(function() {
							L(r, O), L(i, O);
						}, 0);
					});
				})), this;
			},
			tooltip: function() {
				var e = this, t = this.options, n = this.tooltipBox, r = this.imageData;
				return !this.viewed || this.played || !t.tooltip || (n.textContent = `${Math.round(r.ratio * 100)}%`, this.tooltipping ? clearTimeout(this.tooltipping) : t.transition ? (this.fading && V(n, _e), L(n, oe), L(n, x), L(n, O), n.removeAttribute("aria-hidden"), n.initialOffsetWidth = n.offsetWidth, L(n, D)) : (L(n, oe), n.removeAttribute("aria-hidden")), this.tooltipping = setTimeout(function() {
					t.transition ? (B(n, _e, function() {
						R(n, oe), R(n, x), R(n, O), n.setAttribute("aria-hidden", !0), e.fading = !1;
					}, { once: !0 }), R(n, D), e.fading = !0) : (R(n, oe), n.setAttribute("aria-hidden", !0)), e.tooltipping = !1;
				}, 1e3)), this;
			},
			toggle: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
				return this.imageData.ratio === 1 ? this.zoomTo(this.imageData.oldRatio, !0, null, e) : this.zoomTo(1, !0, null, e), this;
			},
			reset: function() {
				return this.viewed && !this.played && (this.imageData = Ue({}, this.initialImageData), this.renderImage()), this;
			},
			update: function() {
				var e = this, t = this.element, n = this.options, r = this.isImg;
				if (r && !t.parentNode) return this.destroy();
				var i = [];
				if (I(r ? [t] : t.querySelectorAll("img"), function(t) {
					F(n.filter) ? n.filter.call(e, t) && i.push(t) : e.getImageURL(t) && i.push(t);
				}), !i.length) return this;
				if (this.images = i, this.length = i.length, this.ready) {
					var a = [];
					if (I(this.items, function(e, t) {
						var n = e.querySelector("img"), r = i[t];
						r && n ? (r.src !== n.src || r.alt !== n.alt) && a.push(t) : a.push(t);
					}), Ge(this.list, { width: "auto" }), this.initList(), this.isShown) {
						if (this.length) {
							if (this.viewed) {
								var o = a.indexOf(this.index);
								if (o >= 0) this.viewed = !1, this.view(Math.max(Math.min(this.index - o, this.length - 1), 0));
								else {
									var s = this.items[this.index];
									L(s, y), s.setAttribute("aria-selected", !0);
								}
							}
						} else this.image = null, this.viewed = !1, this.index = 0, this.imageData = {}, this.canvas.innerHTML = "", this.title.innerHTML = "";
					}
				} else this.build();
				return this;
			},
			destroy: function() {
				var e = this.element, t = this.options;
				return e[h] && (this.destroyed = !0, this.ready ? (this.played && this.stop(), t.inline ? (this.fulled && this.exit(), this.unbind()) : this.isShown ? (this.viewing && (this.imageRendering ? this.imageRendering.abort() : this.imageInitializing && this.imageInitializing.abort()), this.hiding && this.transitioning.abort(), this.hidden()) : this.showing && (this.transitioning.abort(), this.hidden()), this.ready = !1, this.viewer.parentNode.removeChild(this.viewer)) : t.inline && (this.delaying ? this.delaying.abort() : this.initializing && this.initializing.abort()), t.inline || z(e, se, this.onStart), e[h] = void 0), this;
			}
		}, ft = {
			getImageURL: function(e) {
				var t = this.options.url;
				return t = Le(t) ? e.getAttribute(t) : F(t) ? t.call(this, e) : "", t;
			},
			enforceFocus: function() {
				var e = this;
				this.clearEnforceFocus(), B(document, le, this.onFocusin = function(t) {
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
				this.onFocusin &&= (z(document, le, this.onFocusin), null);
			},
			open: function() {
				var e = this.body;
				L(e, ae), this.scrollbarWidth > 0 && (e.style.paddingRight = `${this.scrollbarWidth + (parseFloat(this.initialBodyComputedPaddingRight) || 0)}px`);
			},
			close: function() {
				var e = this.body;
				R(e, ae), this.scrollbarWidth > 0 && (e.style.paddingRight = this.initialBodyPaddingRight);
			},
			shown: function() {
				var e = this.element, t = this.options, n = this.viewer;
				this.fulled = !0, this.isShown = !0, this.render(), this.bind(), this.showing = !1, t.focus && (n.focus(), this.enforceFocus()), F(t.shown) && B(e, xe, t.shown, { once: !0 }), V(e, xe) !== !1 && this.ready && this.isShown && !this.hiding && this.view(this.index);
			},
			hidden: function() {
				var e = this.element, t = this.options, n = this.viewer;
				t.fucus && this.clearEnforceFocus(), this.close(), this.unbind(), L(n, T), n.removeAttribute("role"), n.removeAttribute("aria-labelledby"), n.removeAttribute("aria-modal"), n.setAttribute("aria-hidden", !0), this.resetList(), this.resetImage(), this.fulled = !1, this.viewed = !1, this.isShown = !1, this.hiding = !1, this.destroyed || (F(t.hidden) && B(e, Ce, t.hidden, { once: !0 }), V(e, Ce, null, { cancelable: !1 }));
			},
			requestFullscreen: function(e) {
				var t = this.element.ownerDocument;
				if (this.fulled && !(t.fullscreenElement || t.webkitFullscreenElement || t.mozFullScreenElement || t.msFullscreenElement)) {
					var n = t.documentElement;
					n.requestFullscreen ? He(e) ? n.requestFullscreen(e) : n.requestFullscreen() : n.webkitRequestFullscreen ? n.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.msRequestFullscreen && n.msRequestFullscreen();
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
							this.zoom(at(n), !1, null, e);
							break;
						case _:
							this.action = "switched";
							var o = Math.abs(i);
							o > 1 && o > Math.abs(a) && (this.pointers = {}, i > 1 ? this.prev(t.loop) : i < -1 && this.next(t.loop));
					}
					I(n, function(e) {
						e.startX = e.endX, e.startY = e.endY;
					});
				}
			},
			isSwitchable: function() {
				var e = this.imageData, t = this.viewerData;
				return this.length > 1 && e.x >= 0 && e.y >= 0 && e.width <= t.width && e.height <= t.height;
			}
		}, pt = f.Viewer, mt = function(e) {
			return function() {
				return e += 1, e;
			};
		}(-1), ht = /*#__PURE__*/ function() {
			function t(n) {
				var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				if (e(this, t), !n || n.nodeType !== 1) throw Error("The first argument is required and must be an element.");
				this.element = n, this.options = Ue({}, l, He(r) && r), this.action = !1, this.fading = !1, this.fulled = !1, this.hiding = !1, this.imageClicked = !1, this.imageData = {}, this.index = this.options.initialViewIndex, this.isImg = !1, this.isShown = !1, this.length = 0, this.moving = !1, this.played = !1, this.playing = !1, this.pointers = {}, this.ready = !1, this.rotating = !1, this.scaling = !1, this.showing = !1, this.timeout = !1, this.tooltipping = !1, this.viewed = !1, this.viewing = !1, this.wheeling = !1, this.zooming = !1, this.pointerMoved = !1, this.id = mt(), this.init();
			}
			return n(t, [{
				key: "init",
				value: function() {
					var e = this, t = this.element, n = this.options;
					if (!t[h]) {
						t[h] = this, n.focus && !n.keyboard && (n.focus = !1);
						var r = t.localName === "img", i = [];
						if (I(r ? [t] : t.querySelectorAll("img"), function(t) {
							F(n.filter) ? n.filter.call(e, t) && i.push(t) : e.getImageURL(t) && i.push(t);
						}), this.isImg = r, this.length = i.length, this.images = i, this.initBody(), ze(document.createElement(h).style.transition) && (n.transition = !1), n.inline) {
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
								I(i, function(e) {
									e.complete || (z(e, A, o), z(e, j, o));
								});
							} }, I(i, function(e) {
								if (e.complete) o();
								else {
									var t, n;
									B(e, A, t = function() {
										z(e, j, n), o();
									}, { once: !0 }), B(e, j, n = function() {
										z(e, A, t), o();
									}, { once: !0 });
								}
							});
						} else B(t, se, this.onStart = function(t) {
							var r = t.target;
							r.localName === "img" && (!F(n.filter) || n.filter.call(e, r)) && e.view(e.images.indexOf(r));
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
						if (this.parent = n, this.viewer = i, this.title = a, this.toolbar = o, this.navbar = s, this.button = c, this.canvas = l, this.footer = i.querySelector(`.${h}-footer`), this.tooltipBox = i.querySelector(`.${h}-tooltip`), this.player = i.querySelector(`.${h}-player`), this.list = i.querySelector(`.${h}-list`), i.id = `${h}${this.id}`, a.id = `${h}Title${this.id}`, L(a, t.title ? it(Array.isArray(t.title) ? t.title[0] : t.title) : T), L(s, t.navbar ? it(t.navbar) : T), Je(c, T, !t.button), t.keyboard && c.setAttribute("tabindex", 0), t.backdrop && (L(i, `${h}-backdrop`), !t.inline && t.backdrop !== "static" && Qe(l, Fe, "hide")), Le(t.className) && t.className && t.className.split(Ie).forEach(function(e) {
							L(i, e);
						}), t.toolbar) {
							var d = document.createElement("ul"), f = He(t.toolbar), p = N.slice(0, 3), m = N.slice(7, 9), g = N.slice(9);
							f || L(o, it(t.toolbar)), I(f ? t.toolbar : N, function(e, n) {
								var r = f && He(e), i = f ? Xe(n) : e, a = r && !ze(e.show) ? e.show : e;
								if (!(!a || !t.zoomable && p.indexOf(i) !== -1 || !t.rotatable && m.indexOf(i) !== -1 || !t.scalable && g.indexOf(i) !== -1)) {
									var o = r && !ze(e.size) ? e.size : e, s = r && !ze(e.click) ? e.click : e, c = document.createElement("li");
									t.keyboard && c.setAttribute("tabindex", 0), c.setAttribute("role", "button"), L(c, `${h}-${i}`), F(s) || Qe(c, Fe, i), P(a) && L(c, it(a)), ["small", "large"].indexOf(o) === -1 ? i === "play" && L(c, `${h}-large`) : L(c, `${h}-${o}`), F(s) && B(c, se, s), d.appendChild(c);
								}
							}), o.appendChild(d);
						} else L(o, T);
						if (!t.rotatable) {
							var _ = o.querySelectorAll("li[class*=\"rotate\"]");
							L(_, ne), I(_, function(e) {
								o.appendChild(e);
							});
						}
						if (t.inline) L(c, C), Ge(i, { zIndex: t.zIndexInline }), window.getComputedStyle(n).position === "static" && Ge(n, { position: "relative" }), n.insertBefore(i, e.nextSibling);
						else {
							L(c, b), L(i, S), L(i, x), L(i, T), Ge(i, { zIndex: t.zIndex });
							var v = t.container;
							Le(v) && (v = e.ownerDocument.querySelector(v)), v ||= this.body, v.appendChild(i);
						}
						t.inline && (this.render(), this.bind(), this.isShown = !0), this.ready = !0, F(t.ready) && B(e, ye, t.ready, { once: !0 }), V(e, ye) === !1 ? this.ready = !1 : this.ready && t.inline && this.view(this.index);
					}
				}
			}], [{
				key: "noConflict",
				value: function() {
					return window.Viewer = pt, t;
				}
			}, {
				key: "setDefaults",
				value: function(e) {
					Ue(l, He(e) && e);
				}
			}]);
		}();
		return Ue(ht.prototype, ct, lt, ut, dt, ft), ht;
	}));
})))(), 1), ts = [
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
], ns = {
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
function rs(e) {
	let t = { ...e.options };
	for (let n of Object.keys(ns)) e[n] !== void 0 && (t[n] = e[n]);
	return t;
}
function is(e, t) {
	let n = ts.map((n) => {
		let r = (r) => {
			r.target === e && t(n, r);
		};
		return e.addEventListener(n, r), () => e.removeEventListener(n, r);
	});
	return () => n.forEach((e) => e());
}
var as = [
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
function os(e) {
	return {
		...Object.fromEntries(as.map((t) => [t, (...n) => {
			var r;
			let i = e();
			return i == null || (r = i[t]) == null ? void 0 : r.apply(i, n);
		}])),
		showTooltip: () => e()?.tooltip()
	};
}
function ss(e) {
	let t = (e.tagName === "IMG" ? [e] : Array.from(e.querySelectorAll("img"))).filter((e) => !e.closest(".viewer-container"));
	return {
		sources: t,
		attributes: JSON.stringify(t.map((e) => Array.from(e.attributes).map((e) => [e.name, e.value]).sort(([e], [t]) => e.localeCompare(t))))
	};
}
function cs(e) {
	if (e.nodeType !== 1) return !1;
	let t = e;
	return t.closest(".viewer-container") ? !1 : t.tagName === "IMG" || Array.from(t.querySelectorAll("img")).some((e) => !e.closest(".viewer-container"));
}
function ls(e) {
	return e.type === "attributes" ? e.target.tagName === "IMG" && !e.target.closest(".viewer-container") : [...Array.from(e.addedNodes), ...Array.from(e.removedNodes)].some(cs);
}
function us(e, t = {}) {
	let n = { ...t }, r, i, a = ss(e), o, s = 0, c = !1, l = n.onEvent ? is(e, (e, t) => n.onEvent?.call(n, e, t)) : void 0;
	function u() {
		var t;
		(t = n.onDestroy) == null || t.call(n);
		let i = r;
		r = void 0, e.$viewer === i && delete e.$viewer, i?.destroy();
	}
	function d(t = ((e) => (e = n.rebuild) != null && e)()) {
		var o;
		if (!c) {
			f(), i?.disconnect();
			try {
				if (t && u(), r) r.update();
				else {
					r = new es.default(e, { ...n.options });
					let t = r, i = t.build;
					t.build = function() {
						if (!this.destroyed) return i.call(this);
					};
				}
				e.$viewer = r, a = ss(e);
			} finally {
				g();
			}
			return (o = n.onInit) == null || o.call(n, r), r;
		}
	}
	function f() {
		o !== void 0 && clearTimeout(o), o = void 0;
	}
	function p() {
		return typeof n.observe == "number" && Number.isFinite(n.observe) && n.observe >= 0 ? Math.min(n.observe, 2147483647) : 50;
	}
	function m() {
		c || n.observe === !1 || o !== void 0 || (s = Date.now(), h());
	}
	function h() {
		o = setTimeout(() => {
			if (o = void 0, c || n.observe === !1) return;
			let t = ss(e);
			(t.attributes !== a.attributes || t.sources.length !== a.sources.length || t.sources.some((e, t) => e !== a.sources[t])) && d();
		}, Math.max(0, p() - (Date.now() - s)));
	}
	function g() {
		i?.disconnect(), !(c || n.observe === !1 || typeof MutationObserver > "u") && (i ??= new MutationObserver((e) => {
			e.some(ls) && m();
		}), i.observe(e, {
			attributes: !0,
			childList: !0,
			subtree: !0
		}));
	}
	function _(e, t = !0) {
		if (!c) {
			if (n = {
				...n,
				...e
			}, !("options" in e) && !("rebuild" in e) && "observe" in e) {
				let e = o !== void 0;
				return f(), g(), n.observe !== !1 && (e ? h() : m()), r;
			}
			return d(t);
		}
	}
	function v() {
		c = !0, f(), i?.disconnect();
		try {
			u();
		} finally {
			l?.();
		}
	}
	try {
		d();
	} catch (e) {
		throw v(), e;
	}
	return {
		get viewer() {
			return r;
		},
		refresh: d,
		configure: _,
		dispose: v
	};
}
function ds(e) {
	return Array.isArray(e) ? e.map(ds) : e && Object.prototype.toString.call(e) === "[object Object]" ? Object.fromEntries(Object.entries(e).map(([e, t]) => [e, ds(t)])) : e;
}
function fs(e, t) {
	if (e === t) return !0;
	if (!e || !t || typeof e != "object" || typeof t != "object") return !1;
	let n = (e) => Array.isArray(e) || Object.prototype.toString.call(e) === "[object Object]";
	if (!n(e) || !n(t)) return !1;
	let r = Object.keys(e);
	return r.length === Object.keys(t).length && r.every((n) => Object.prototype.hasOwnProperty.call(t, n) && fs(e[n], t[n]));
}
function ps() {
	let e = /* @__PURE__ */ new WeakMap();
	return {
		mount(t, n) {
			var r;
			(r = e.get(t)) == null || r.controller.dispose();
			let { observe: i, rebuild: a, ...o } = n.value ?? {}, s = a ?? !!n.modifiers.rebuild;
			e.set(t, {
				options: ds(o),
				observe: i,
				rebuild: s,
				controller: us(t, {
					options: o,
					rebuild: s,
					observe: i
				})
			});
		},
		update(t, n) {
			let r = e.get(t);
			if (!r) return;
			let { observe: i, rebuild: a, ...o } = n.value ?? {}, s = a ?? !!n.modifiers.rebuild, c = !fs(r.options, o);
			c || s !== r.rebuild ? r.controller.configure({
				options: o,
				rebuild: s,
				observe: i
			}, c || s) : i !== r.observe && r.controller.configure({ observe: i }), r.options = ds(o), r.observe = i, r.rebuild = s;
		},
		unmount(t) {
			var n;
			(n = e.get(t)) == null || n.controller.dispose(), e.delete(t);
		}
	};
}
var ms = 0;
function hs() {
	let e, t = "", n = [], r = [];
	function i() {
		for (let e of r.splice(0)) e();
		e = void 0, t = "", n = [];
	}
	function a(a, o) {
		let s = a?.toolbar, c = ["toolbar", "toolbar-append"].map((e) => +o(e)).join("");
		if (s === e && t === c || (i(), e = s, t = c, !e)) return n;
		let l = e.querySelector("ul");
		if (!l) return n;
		function u(e, t) {
			let i = e === "toolbar-append" && t.tagName === "UL", a = document.createElement(i ? "li" : "span");
			a.className = `v-viewer-${e}-slot`, a.style.cssText = "display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;gap:4px;color:#fff;font-size:14px;line-height:1.4", i && (a.style.cssText += ";width:auto;height:auto;overflow:visible;background:none;border-radius:0;float:left;margin:0 0 0 4px;padding:0"), t.appendChild(a);
			let o = (e) => e.stopPropagation(), s = (e) => {
				let t = e.target;
				(e.key === "Enter" || e.key === " " || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) && e.stopPropagation();
			};
			a.addEventListener("click", o), a.addEventListener("keydown", s);
			for (let e of [
				"pointerdown",
				"mousedown",
				"touchstart",
				"dblclick"
			]) a.addEventListener(e, o);
			r.push(() => {
				a.removeEventListener("click", o), a.removeEventListener("keydown", s);
				for (let e of [
					"pointerdown",
					"mousedown",
					"touchstart",
					"dblclick"
				]) a.removeEventListener(e, o);
				a.remove();
			}), n.push({
				key: ++ms,
				slot: e,
				target: a
			});
		}
		if (o("toolbar")) {
			let t = l.style.display;
			l.style.display = "none", r.push(() => {
				l.style.display = t;
			}), u("toolbar", e);
		}
		if (o("toolbar-append") && u("toolbar-append", o("toolbar") ? e : l), n.length && typeof ResizeObserver < "u") {
			let t = -1, n = -1, i = new ResizeObserver(() => {
				var r;
				!e || e.offsetWidth === t && e.offsetHeight === n || (t = e.offsetWidth, n = e.offsetHeight, (r = a.resize) == null || r.call(a));
			});
			i.observe(e), r.push(() => i.disconnect());
		}
		return n;
	}
	return {
		sync: a,
		clear: i
	};
}
function gs(e) {
	let t = e;
	return {
		image: t != null && t.viewed ? t.image : void 0,
		index: t?.index ?? 0
	};
}
var _s = /* @__PURE__ */ ar({
	props: { content: {
		type: Function,
		required: !0
	} },
	render() {
		return Ma("span", { style: { display: "contents" } }, this.content());
	}
}), vs = /* @__PURE__ */ ar({
	name: "Viewer",
	props: {
		...ns,
		options: {
			type: Object,
			default: () => ({})
		},
		rebuild: Boolean,
		observe: {
			type: [Boolean, Number],
			default: !0
		}
	},
	emits: [...ts],
	setup(e, { emit: t, expose: n, slots: r }) {
		let i = /* @__PURE__ */ W(), a = /* @__PURE__ */ Jt(), o, s = !1, c = hs(), l = /* @__PURE__ */ Jt([]), u = /* @__PURE__ */ Jt(gs(void 0)), d = () => {
			l.value = c.sync(a.value, (e) => !!r[e]);
			let e = gs(a.value);
			(e.image !== u.value.image || e.index !== u.value.index) && (u.value = e);
		}, f = () => {
			a.value = void 0, c.clear(), l.value = [], u.value = gs(void 0);
		}, p = () => rs(e), m = () => {
			s || !i.value || o || (o = us(i.value, {
				options: p(),
				rebuild: e.rebuild,
				observe: e.observe,
				onEvent: (e, n) => {
					d(), t(e, n);
				},
				onDestroy: f,
				onInit: (e) => {
					a.value = e, d();
				}
			}));
		}, h = () => {
			o?.dispose(), o = void 0, a.value = void 0;
		}, g = () => o ? o.refresh(!1) : m(), _ = () => o ? o.configure({
			options: p(),
			rebuild: e.rebuild
		}) : m();
		Ln(p, _, {
			deep: !0,
			flush: "post"
		}), Ln(() => e.observe, (e) => o?.configure({ observe: e }), { flush: "post" }), Ln(() => e.rebuild, () => {
			o?.configure({ rebuild: e.rebuild }, e.rebuild);
		}, { flush: "post" }), br(m), Sr(d), Cr(() => {
			s = !0, h();
		});
		let v = {
			...os(() => a.value),
			update: g,
			destroy: h,
			viewer: a,
			createViewer: m,
			updateViewer: g,
			rebuildViewer: _,
			destroyViewer: h
		};
		n?.(v);
		let y = () => ({
			...v,
			...u.value
		});
		return {
			...v,
			root: i,
			toolbarMounts: l,
			toolbarScope: y
		};
	},
	render() {
		var e;
		return Ma("div", { ref: "root" }, [(e = this.$slots).default?.call(e, { options: this.options }), ...this.toolbarMounts.map((e) => Ma(Qn, {
			to: e.target,
			key: e.key
		}, [Ma(_s, { content: () => {
			var t;
			return (t = this.$slots)[e.slot]?.call(t, this.toolbarScope());
		} })]))]);
	}
}), ys = ps();
ys.mount, ys.update, ys.unmount;
//#endregion
//#region \0virtual:fullscreen-example:component zh
var bs = { class: "lab" }, xs = { class: "options" }, Ss = { class: "page-only-control" }, Cs = ["disabled"], ws = ["disabled"], Ts = ["disabled"], Es = { class: "surface-placeholder" }, Ds = [
	"aria-label",
	"aria-expanded",
	"onClick"
], Os = [
	"src",
	"data-source",
	"alt"
], ks = {
	key: 1,
	role: "status"
}, As = {
	key: 0,
	role: "alert"
}, js = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(0), i = /* @__PURE__ */ W(!0), a;
		function o() {
			!d.value && !a && (a = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			a = void 0;
		});
		let s = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W();
		function l(e) {
			s.value && r.value === e ? c.value.hide() : (r.value = e, c.value.view(e));
		}
		let u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(!1);
		async function f(e) {
			d.value = e, e || c.value?.hide(), await yn(), !e && a && (window.scrollTo({
				...a,
				behavior: "instant"
			}), a = void 0);
		}
		function p(e) {
			f(!1), s.value = !1, u.value = e.message;
		}
		return (e, a) => (J(), Y("div", bs, [
			X("header", xs, [
				X("label", Ss, [K(X("input", {
					"onUpdate:modelValue": a[0] ||= (e) => t.value = e,
					type: "checkbox",
					disabled: d.value
				}, null, 8, Cs), [[So, t.value]]), a[7] ||= Q(" pageOnly", -1)]),
				X("label", null, [K(X("input", {
					"onUpdate:modelValue": a[1] ||= (e) => i.value = e,
					type: "checkbox",
					disabled: d.value
				}, null, 8, ws), [[So, i.value]]), a[8] ||= Q(" teleport", -1)]),
				X("button", {
					id: "enter",
					disabled: d.value,
					onClickCapture: o,
					onClick: a[2] ||= (e) => d.value = !0
				}, "进入全屏", 40, Ts)
			]),
			X("div", Es, [Z(G(Xo), {
				id: "demo-component",
				ref: "target",
				class: "surface",
				modelValue: d.value,
				"onUpdate:modelValue": a[6] ||= (e) => d.value = e,
				"page-only": t.value,
				teleport: i.value,
				"exit-on-click-wrapper": !1,
				"fullscreen-class": "demo-fullscreen",
				onChange: f,
				onError: p
			}, {
				default: jn(() => [
					d.value ? (J(), Y("button", {
						key: 0,
						id: "exit",
						class: "exit",
						onClick: a[3] ||= (e) => d.value = !1
					}, "退出全屏")) : $("v-if", !0),
					Z(G(vs), {
						ref_key: "preview",
						ref: c,
						class: "image-preview",
						url: "data-source",
						"z-index": 10001,
						toolbar: !1,
						title: !1,
						transition: !1,
						focus: !1,
						fullscreen: !1,
						onShow: a[4] ||= (e) => s.value = !0,
						onHidden: a[5] ||= (e) => s.value = !1
					}, {
						default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("button", {
							key: e,
							class: "image-trigger gallery-image-trigger",
							"aria-label": "预览图片 " + (t + 1),
							"aria-expanded": s.value && r.value === t ? "true" : "false",
							onClick: Oo((e) => l(t), ["stop"])
						}, [X("img", {
							class: "gallery-image demo-picture",
							src: "https://picsum.photos/id/" + e + "/640/360",
							"data-source": "https://picsum.photos/id/" + e + "/1280/720",
							alt: "风景图片 " + (t + 1),
							width: "1280",
							height: "720"
						}, null, 8, Os)], 8, Ds)), 64))]),
						_: 1
					}, 512),
					d.value && s.value && !t.value && !i.value ? (J(), Y("p", ks, "弹窗已在 body 下打开，但不属于当前原生全屏元素。")) : $("v-if", !0)
				]),
				_: 1
			}, 8, [
				"modelValue",
				"page-only",
				"teleport"
			])]),
			u.value ? (J(), Y("p", As, Me(u.value), 1)) : $("v-if", !0)
		]));
	}
};
js.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:component zh pageOnly
var Ms = { class: "lab" }, Ns = { class: "options" }, Ps = { class: "page-only-control" }, Fs = ["disabled"], Is = ["disabled"], Ls = { class: "surface-placeholder" }, Rs = { class: "inline-gallery-stage" }, zs = [
	"src",
	"data-source",
	"alt"
], Bs = {
	key: 1,
	role: "status"
}, Vs = {
	key: 0,
	role: "alert"
}, Hs = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(!1), i;
		function a() {
			!l.value && !i && (i = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			i = void 0;
		});
		let o = /* @__PURE__ */ W(!1), s = /* @__PURE__ */ W(), c = /* @__PURE__ */ W(""), l = /* @__PURE__ */ W(!1);
		async function u(e) {
			l.value = e, await yn(), window.dispatchEvent(new Event("resize")), !e && i && (window.scrollTo({
				...i,
				behavior: "instant"
			}), i = void 0);
		}
		function d(e) {
			u(!1), o.value = !1, c.value = e.message;
		}
		return (e, i) => (J(), Y("div", Ms, [
			X("header", Ns, [X("label", Ps, [K(X("input", {
				"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
				type: "checkbox",
				disabled: l.value
			}, null, 8, Fs), [[So, t.value]]), i[6] ||= Q(" pageOnly", -1)]), X("button", {
				id: "enter",
				disabled: l.value,
				onClickCapture: a,
				onClick: i[1] ||= (e) => l.value = !0
			}, "进入全屏", 40, Is)]),
			X("div", Ls, [Z(G(Xo), {
				id: "demo-page-only",
				ref: "target",
				class: "surface",
				modelValue: l.value,
				"onUpdate:modelValue": i[5] ||= (e) => l.value = e,
				"page-only": t.value,
				teleport: r.value,
				"exit-on-click-wrapper": !1,
				"fullscreen-class": "demo-fullscreen",
				onChange: u,
				onError: d
			}, {
				default: jn(() => [
					l.value ? (J(), Y("button", {
						key: 0,
						id: "exit",
						class: "exit",
						onClick: i[2] ||= (e) => l.value = !1
					}, "退出全屏")) : $("v-if", !0),
					X("div", Rs, [Z(G(vs), {
						ref_key: "preview",
						ref: s,
						class: "inline-gallery-sources",
						inline: "",
						button: !1,
						url: "data-source",
						"z-index": 10001,
						toolbar: !1,
						title: !1,
						transition: !1,
						focus: !1,
						fullscreen: !1,
						onShow: i[3] ||= (e) => o.value = !0,
						onHidden: i[4] ||= (e) => o.value = !1
					}, {
						default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("img", {
							key: e,
							src: "https://picsum.photos/id/" + e + "/128/72",
							"data-source": "https://picsum.photos/id/" + e + "/1280/720",
							alt: "风景图片 " + (t + 1),
							width: "1280",
							height: "720"
						}, null, 8, zs)), 64))]),
						_: 1
					}, 512)]),
					l.value && o.value && !t.value && !r.value ? (J(), Y("p", Bs, "弹窗已在 body 下打开，但不属于当前原生全屏元素。")) : $("v-if", !0)
				]),
				_: 1
			}, 8, [
				"modelValue",
				"page-only",
				"teleport"
			])]),
			c.value ? (J(), Y("p", Vs, Me(c.value), 1)) : $("v-if", !0)
		]));
	}
};
Hs.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:component zh teleport
var Us = { class: "lab" }, Ws = { class: "options" }, Gs = ["disabled"], Ks = ["disabled"], qs = { class: "surface-placeholder" }, Js = [
	"aria-label",
	"aria-expanded",
	"onClick"
], Ys = [
	"src",
	"data-source",
	"alt"
], Xs = {
	key: 1,
	role: "status"
}, Zs = {
	key: 0,
	role: "alert"
}, Qs = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(0), i = /* @__PURE__ */ W(!1), a;
		function o() {
			!d.value && !a && (a = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			a = void 0;
		});
		let s = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W();
		function l(e) {
			s.value && r.value === e ? c.value.hide() : (r.value = e, c.value.view(e));
		}
		let u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(!1);
		async function f(e) {
			d.value = e, e || c.value?.hide(), await yn(), !e && a && (window.scrollTo({
				...a,
				behavior: "instant"
			}), a = void 0);
		}
		function p(e) {
			f(!1), s.value = !1, u.value = e.message;
		}
		return (e, a) => (J(), Y("div", Us, [
			X("header", Ws, [X("label", null, [K(X("input", {
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e,
				type: "checkbox",
				disabled: d.value
			}, null, 8, Gs), [[So, i.value]]), a[6] ||= Q(" teleport", -1)]), X("button", {
				id: "enter",
				disabled: d.value,
				onClickCapture: o,
				onClick: a[1] ||= (e) => d.value = !0
			}, "进入全屏", 40, Ks)]),
			X("div", qs, [Z(G(Xo), {
				id: "demo-component",
				ref: "target",
				class: "surface",
				modelValue: d.value,
				"onUpdate:modelValue": a[5] ||= (e) => d.value = e,
				"page-only": t.value,
				teleport: i.value,
				"exit-on-click-wrapper": !1,
				"fullscreen-class": "demo-fullscreen",
				onChange: f,
				onError: p
			}, {
				default: jn(() => [
					d.value ? (J(), Y("button", {
						key: 0,
						id: "exit",
						class: "exit",
						onClick: a[2] ||= (e) => d.value = !1
					}, "退出全屏")) : $("v-if", !0),
					Z(G(vs), {
						ref_key: "preview",
						ref: c,
						class: "image-preview",
						url: "data-source",
						"z-index": 10001,
						toolbar: !1,
						title: !1,
						transition: !1,
						focus: !1,
						fullscreen: !1,
						onShow: a[3] ||= (e) => s.value = !0,
						onHidden: a[4] ||= (e) => s.value = !1
					}, {
						default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("button", {
							key: e,
							class: "image-trigger gallery-image-trigger",
							"aria-label": "预览图片 " + (t + 1),
							"aria-expanded": s.value && r.value === t ? "true" : "false",
							onClick: Oo((e) => l(t), ["stop"])
						}, [X("img", {
							class: "gallery-image demo-picture",
							src: "https://picsum.photos/id/" + e + "/640/360",
							"data-source": "https://picsum.photos/id/" + e + "/1280/720",
							alt: "风景图片 " + (t + 1),
							width: "1280",
							height: "720"
						}, null, 8, Ys)], 8, Js)), 64))]),
						_: 1
					}, 512),
					d.value && s.value && !t.value && !i.value ? (J(), Y("p", Xs, "弹窗已在 body 下打开，但不属于当前原生全屏元素。")) : $("v-if", !0)
				]),
				_: 1
			}, 8, [
				"modelValue",
				"page-only",
				"teleport"
			])]),
			u.value ? (J(), Y("p", Zs, Me(u.value), 1)) : $("v-if", !0)
		]));
	}
};
Qs.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:component en
var $s = { class: "lab" }, ec = { class: "options" }, tc = { class: "page-only-control" }, nc = ["disabled"], rc = ["disabled"], ic = ["disabled"], ac = { class: "surface-placeholder" }, oc = [
	"aria-label",
	"aria-expanded",
	"onClick"
], sc = [
	"src",
	"data-source",
	"alt"
], cc = {
	key: 1,
	role: "status"
}, lc = {
	key: 0,
	role: "alert"
}, uc = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(0), i = /* @__PURE__ */ W(!0), a;
		function o() {
			!d.value && !a && (a = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			a = void 0;
		});
		let s = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W();
		function l(e) {
			s.value && r.value === e ? c.value.hide() : (r.value = e, c.value.view(e));
		}
		let u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(!1);
		async function f(e) {
			d.value = e, e || c.value?.hide(), await yn(), !e && a && (window.scrollTo({
				...a,
				behavior: "instant"
			}), a = void 0);
		}
		function p(e) {
			f(!1), s.value = !1, u.value = e.message;
		}
		return (e, a) => (J(), Y("div", $s, [
			X("header", ec, [
				X("label", tc, [K(X("input", {
					"onUpdate:modelValue": a[0] ||= (e) => t.value = e,
					type: "checkbox",
					disabled: d.value
				}, null, 8, nc), [[So, t.value]]), a[7] ||= Q(" pageOnly", -1)]),
				X("label", null, [K(X("input", {
					"onUpdate:modelValue": a[1] ||= (e) => i.value = e,
					type: "checkbox",
					disabled: d.value
				}, null, 8, rc), [[So, i.value]]), a[8] ||= Q(" teleport", -1)]),
				X("button", {
					id: "enter",
					disabled: d.value,
					onClickCapture: o,
					onClick: a[2] ||= (e) => d.value = !0
				}, "Enter fullscreen", 40, ic)
			]),
			X("div", ac, [Z(G(Xo), {
				id: "demo-component",
				ref: "target",
				class: "surface",
				modelValue: d.value,
				"onUpdate:modelValue": a[6] ||= (e) => d.value = e,
				"page-only": t.value,
				teleport: i.value,
				"exit-on-click-wrapper": !1,
				"fullscreen-class": "demo-fullscreen",
				onChange: f,
				onError: p
			}, {
				default: jn(() => [
					d.value ? (J(), Y("button", {
						key: 0,
						id: "exit",
						class: "exit",
						onClick: a[3] ||= (e) => d.value = !1
					}, "Exit fullscreen")) : $("v-if", !0),
					Z(G(vs), {
						ref_key: "preview",
						ref: c,
						class: "image-preview",
						url: "data-source",
						"z-index": 10001,
						toolbar: !1,
						title: !1,
						transition: !1,
						focus: !1,
						fullscreen: !1,
						onShow: a[4] ||= (e) => s.value = !0,
						onHidden: a[5] ||= (e) => s.value = !1
					}, {
						default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("button", {
							key: e,
							class: "image-trigger gallery-image-trigger",
							"aria-label": "Preview image " + (t + 1),
							"aria-expanded": s.value && r.value === t ? "true" : "false",
							onClick: Oo((e) => l(t), ["stop"])
						}, [X("img", {
							class: "gallery-image demo-picture",
							src: "https://picsum.photos/id/" + e + "/640/360",
							"data-source": "https://picsum.photos/id/" + e + "/1280/720",
							alt: "Landscape " + (t + 1),
							width: "1280",
							height: "720"
						}, null, 8, sc)], 8, oc)), 64))]),
						_: 1
					}, 512),
					d.value && s.value && !t.value && !i.value ? (J(), Y("p", cc, "The popup is open under body, but is outside the native fullscreen element.")) : $("v-if", !0)
				]),
				_: 1
			}, 8, [
				"modelValue",
				"page-only",
				"teleport"
			])]),
			u.value ? (J(), Y("p", lc, Me(u.value), 1)) : $("v-if", !0)
		]));
	}
};
uc.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:component en pageOnly
var dc = { class: "lab" }, fc = { class: "options" }, pc = { class: "page-only-control" }, mc = ["disabled"], hc = ["disabled"], gc = { class: "surface-placeholder" }, _c = { class: "inline-gallery-stage" }, vc = [
	"src",
	"data-source",
	"alt"
], yc = {
	key: 1,
	role: "status"
}, bc = {
	key: 0,
	role: "alert"
}, xc = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(!1), i;
		function a() {
			!l.value && !i && (i = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			i = void 0;
		});
		let o = /* @__PURE__ */ W(!1), s = /* @__PURE__ */ W(), c = /* @__PURE__ */ W(""), l = /* @__PURE__ */ W(!1);
		async function u(e) {
			l.value = e, await yn(), window.dispatchEvent(new Event("resize")), !e && i && (window.scrollTo({
				...i,
				behavior: "instant"
			}), i = void 0);
		}
		function d(e) {
			u(!1), o.value = !1, c.value = e.message;
		}
		return (e, i) => (J(), Y("div", dc, [
			X("header", fc, [X("label", pc, [K(X("input", {
				"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
				type: "checkbox",
				disabled: l.value
			}, null, 8, mc), [[So, t.value]]), i[6] ||= Q(" pageOnly", -1)]), X("button", {
				id: "enter",
				disabled: l.value,
				onClickCapture: a,
				onClick: i[1] ||= (e) => l.value = !0
			}, "Enter fullscreen", 40, hc)]),
			X("div", gc, [Z(G(Xo), {
				id: "demo-page-only",
				ref: "target",
				class: "surface",
				modelValue: l.value,
				"onUpdate:modelValue": i[5] ||= (e) => l.value = e,
				"page-only": t.value,
				teleport: r.value,
				"exit-on-click-wrapper": !1,
				"fullscreen-class": "demo-fullscreen",
				onChange: u,
				onError: d
			}, {
				default: jn(() => [
					l.value ? (J(), Y("button", {
						key: 0,
						id: "exit",
						class: "exit",
						onClick: i[2] ||= (e) => l.value = !1
					}, "Exit fullscreen")) : $("v-if", !0),
					X("div", _c, [Z(G(vs), {
						ref_key: "preview",
						ref: s,
						class: "inline-gallery-sources",
						inline: "",
						button: !1,
						url: "data-source",
						"z-index": 10001,
						toolbar: !1,
						title: !1,
						transition: !1,
						focus: !1,
						fullscreen: !1,
						onShow: i[3] ||= (e) => o.value = !0,
						onHidden: i[4] ||= (e) => o.value = !1
					}, {
						default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("img", {
							key: e,
							src: "https://picsum.photos/id/" + e + "/128/72",
							"data-source": "https://picsum.photos/id/" + e + "/1280/720",
							alt: "Landscape " + (t + 1),
							width: "1280",
							height: "720"
						}, null, 8, vc)), 64))]),
						_: 1
					}, 512)]),
					l.value && o.value && !t.value && !r.value ? (J(), Y("p", yc, "The popup is open under body, but is outside the native fullscreen element.")) : $("v-if", !0)
				]),
				_: 1
			}, 8, [
				"modelValue",
				"page-only",
				"teleport"
			])]),
			c.value ? (J(), Y("p", bc, Me(c.value), 1)) : $("v-if", !0)
		]));
	}
};
xc.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:component en teleport
var Sc = { class: "lab" }, Cc = { class: "options" }, wc = ["disabled"], Tc = ["disabled"], Ec = { class: "surface-placeholder" }, Dc = [
	"aria-label",
	"aria-expanded",
	"onClick"
], Oc = [
	"src",
	"data-source",
	"alt"
], kc = {
	key: 1,
	role: "status"
}, Ac = {
	key: 0,
	role: "alert"
}, jc = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(0), i = /* @__PURE__ */ W(!1), a;
		function o() {
			!d.value && !a && (a = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			a = void 0;
		});
		let s = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W();
		function l(e) {
			s.value && r.value === e ? c.value.hide() : (r.value = e, c.value.view(e));
		}
		let u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(!1);
		async function f(e) {
			d.value = e, e || c.value?.hide(), await yn(), !e && a && (window.scrollTo({
				...a,
				behavior: "instant"
			}), a = void 0);
		}
		function p(e) {
			f(!1), s.value = !1, u.value = e.message;
		}
		return (e, a) => (J(), Y("div", Sc, [
			X("header", Cc, [X("label", null, [K(X("input", {
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e,
				type: "checkbox",
				disabled: d.value
			}, null, 8, wc), [[So, i.value]]), a[6] ||= Q(" teleport", -1)]), X("button", {
				id: "enter",
				disabled: d.value,
				onClickCapture: o,
				onClick: a[1] ||= (e) => d.value = !0
			}, "Enter fullscreen", 40, Tc)]),
			X("div", Ec, [Z(G(Xo), {
				id: "demo-component",
				ref: "target",
				class: "surface",
				modelValue: d.value,
				"onUpdate:modelValue": a[5] ||= (e) => d.value = e,
				"page-only": t.value,
				teleport: i.value,
				"exit-on-click-wrapper": !1,
				"fullscreen-class": "demo-fullscreen",
				onChange: f,
				onError: p
			}, {
				default: jn(() => [
					d.value ? (J(), Y("button", {
						key: 0,
						id: "exit",
						class: "exit",
						onClick: a[2] ||= (e) => d.value = !1
					}, "Exit fullscreen")) : $("v-if", !0),
					Z(G(vs), {
						ref_key: "preview",
						ref: c,
						class: "image-preview",
						url: "data-source",
						"z-index": 10001,
						toolbar: !1,
						title: !1,
						transition: !1,
						focus: !1,
						fullscreen: !1,
						onShow: a[3] ||= (e) => s.value = !0,
						onHidden: a[4] ||= (e) => s.value = !1
					}, {
						default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("button", {
							key: e,
							class: "image-trigger gallery-image-trigger",
							"aria-label": "Preview image " + (t + 1),
							"aria-expanded": s.value && r.value === t ? "true" : "false",
							onClick: Oo((e) => l(t), ["stop"])
						}, [X("img", {
							class: "gallery-image demo-picture",
							src: "https://picsum.photos/id/" + e + "/640/360",
							"data-source": "https://picsum.photos/id/" + e + "/1280/720",
							alt: "Landscape " + (t + 1),
							width: "1280",
							height: "720"
						}, null, 8, Oc)], 8, Dc)), 64))]),
						_: 1
					}, 512),
					d.value && s.value && !t.value && !i.value ? (J(), Y("p", kc, "The popup is open under body, but is outside the native fullscreen element.")) : $("v-if", !0)
				]),
				_: 1
			}, 8, [
				"modelValue",
				"page-only",
				"teleport"
			])]),
			u.value ? (J(), Y("p", Ac, Me(u.value), 1)) : $("v-if", !0)
		]));
	}
};
jc.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:directive zh
var Mc = { class: "lab" }, Nc = { class: "options" }, Pc = { class: "page-only-control" }, Fc = ["disabled"], Ic = ["disabled"], Lc = ["disabled"], Rc = { class: "surface-placeholder" }, zc = {
	id: "demo-directive",
	ref: "target",
	class: "surface"
}, Bc = [
	"aria-label",
	"aria-expanded",
	"onClick"
], Vc = [
	"src",
	"data-source",
	"alt"
], Hc = {
	key: 1,
	role: "status"
}, Uc = {
	key: 0,
	role: "alert"
}, Wc = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(0), i = /* @__PURE__ */ W(!0), a;
		function o() {
			!d.value && !a && (a = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			a = void 0;
		});
		let s = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W();
		function l(e) {
			s.value && r.value === e ? c.value.hide() : (r.value = e, c.value.view(e));
		}
		let u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(!1), f = ja(() => ({
			target: "#demo-directive",
			pageOnly: t.value,
			teleport: i.value,
			fullscreenClass: "demo-fullscreen",
			callback: p
		}));
		async function p(e) {
			d.value = e, e || c.value?.hide(), await yn(), !e && a && (window.scrollTo({
				...a,
				behavior: "instant"
			}), a = void 0);
		}
		function m(e) {
			p(!1), s.value = !1, u.value = e.message;
		}
		return (e, a) => (J(), Y("div", Mc, [
			X("header", Nc, [
				X("label", Pc, [K(X("input", {
					"onUpdate:modelValue": a[0] ||= (e) => t.value = e,
					type: "checkbox",
					disabled: d.value
				}, null, 8, Fc), [[So, t.value]]), a[6] ||= Q(" pageOnly", -1)]),
				X("label", null, [K(X("input", {
					"onUpdate:modelValue": a[1] ||= (e) => i.value = e,
					type: "checkbox",
					disabled: d.value
				}, null, 8, Ic), [[So, i.value]]), a[7] ||= Q(" teleport", -1)]),
				K((J(), Y("button", {
					id: "enter",
					disabled: d.value,
					onClickCapture: o,
					onFullscreenError: a[2] ||= (e) => m(e.detail)
				}, [...a[8] ||= [Q("点击指令按钮", -1)]], 40, Lc)), [[G(Zo), f.value]])
			]),
			X("div", Rc, [X("section", zc, [
				d.value ? K((J(), Y("button", {
					key: 0,
					id: "exit",
					class: "exit",
					onFullscreenError: a[3] ||= (e) => m(e.detail)
				}, [...a[9] ||= [Q("退出全屏", -1)]], 32)), [[G(Zo), f.value]]) : $("v-if", !0),
				Z(G(vs), {
					ref_key: "preview",
					ref: c,
					class: "image-preview",
					url: "data-source",
					"z-index": 10001,
					toolbar: !1,
					title: !1,
					transition: !1,
					focus: !1,
					fullscreen: !1,
					onShow: a[4] ||= (e) => s.value = !0,
					onHidden: a[5] ||= (e) => s.value = !1
				}, {
					default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("button", {
						key: e,
						class: "image-trigger gallery-image-trigger",
						"aria-label": "预览图片 " + (t + 1),
						"aria-expanded": s.value && r.value === t ? "true" : "false",
						onClick: Oo((e) => l(t), ["stop"])
					}, [X("img", {
						class: "gallery-image demo-picture",
						src: "https://picsum.photos/id/" + e + "/640/360",
						"data-source": "https://picsum.photos/id/" + e + "/1280/720",
						alt: "风景图片 " + (t + 1),
						width: "1280",
						height: "720"
					}, null, 8, Vc)], 8, Bc)), 64))]),
					_: 1
				}, 512),
				d.value && s.value && !t.value && !i.value ? (J(), Y("p", Hc, "弹窗已在 body 下打开，但不属于当前原生全屏元素。")) : $("v-if", !0)
			], 512)]),
			u.value ? (J(), Y("p", Uc, Me(u.value), 1)) : $("v-if", !0)
		]));
	}
};
Wc.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:directive en
var Gc = { class: "lab" }, Kc = { class: "options" }, qc = { class: "page-only-control" }, Jc = ["disabled"], Yc = ["disabled"], Xc = ["disabled"], Zc = { class: "surface-placeholder" }, Qc = {
	id: "demo-directive",
	ref: "target",
	class: "surface"
}, $c = [
	"aria-label",
	"aria-expanded",
	"onClick"
], el = [
	"src",
	"data-source",
	"alt"
], tl = {
	key: 1,
	role: "status"
}, nl = {
	key: 0,
	role: "alert"
}, rl = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(0), i = /* @__PURE__ */ W(!0), a;
		function o() {
			!d.value && !a && (a = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			a = void 0;
		});
		let s = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W();
		function l(e) {
			s.value && r.value === e ? c.value.hide() : (r.value = e, c.value.view(e));
		}
		let u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(!1), f = ja(() => ({
			target: "#demo-directive",
			pageOnly: t.value,
			teleport: i.value,
			fullscreenClass: "demo-fullscreen",
			callback: p
		}));
		async function p(e) {
			d.value = e, e || c.value?.hide(), await yn(), !e && a && (window.scrollTo({
				...a,
				behavior: "instant"
			}), a = void 0);
		}
		function m(e) {
			p(!1), s.value = !1, u.value = e.message;
		}
		return (e, a) => (J(), Y("div", Gc, [
			X("header", Kc, [
				X("label", qc, [K(X("input", {
					"onUpdate:modelValue": a[0] ||= (e) => t.value = e,
					type: "checkbox",
					disabled: d.value
				}, null, 8, Jc), [[So, t.value]]), a[6] ||= Q(" pageOnly", -1)]),
				X("label", null, [K(X("input", {
					"onUpdate:modelValue": a[1] ||= (e) => i.value = e,
					type: "checkbox",
					disabled: d.value
				}, null, 8, Yc), [[So, i.value]]), a[7] ||= Q(" teleport", -1)]),
				K((J(), Y("button", {
					id: "enter",
					disabled: d.value,
					onClickCapture: o,
					onFullscreenError: a[2] ||= (e) => m(e.detail)
				}, [...a[8] ||= [Q("Toggle with directive", -1)]], 40, Xc)), [[G(Zo), f.value]])
			]),
			X("div", Zc, [X("section", Qc, [
				d.value ? K((J(), Y("button", {
					key: 0,
					id: "exit",
					class: "exit",
					onFullscreenError: a[3] ||= (e) => m(e.detail)
				}, [...a[9] ||= [Q("Exit fullscreen", -1)]], 32)), [[G(Zo), f.value]]) : $("v-if", !0),
				Z(G(vs), {
					ref_key: "preview",
					ref: c,
					class: "image-preview",
					url: "data-source",
					"z-index": 10001,
					toolbar: !1,
					title: !1,
					transition: !1,
					focus: !1,
					fullscreen: !1,
					onShow: a[4] ||= (e) => s.value = !0,
					onHidden: a[5] ||= (e) => s.value = !1
				}, {
					default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("button", {
						key: e,
						class: "image-trigger gallery-image-trigger",
						"aria-label": "Preview image " + (t + 1),
						"aria-expanded": s.value && r.value === t ? "true" : "false",
						onClick: Oo((e) => l(t), ["stop"])
					}, [X("img", {
						class: "gallery-image demo-picture",
						src: "https://picsum.photos/id/" + e + "/640/360",
						"data-source": "https://picsum.photos/id/" + e + "/1280/720",
						alt: "Landscape " + (t + 1),
						width: "1280",
						height: "720"
					}, null, 8, el)], 8, $c)), 64))]),
					_: 1
				}, 512),
				d.value && s.value && !t.value && !i.value ? (J(), Y("p", tl, "The popup is open under body, but is outside the native fullscreen element.")) : $("v-if", !0)
			], 512)]),
			u.value ? (J(), Y("p", nl, Me(u.value), 1)) : $("v-if", !0)
		]));
	}
};
rl.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:api zh
var il = { class: "lab" }, al = { class: "options" }, ol = { class: "page-only-control" }, sl = ["disabled"], cl = ["disabled"], ll = ["disabled"], ul = { class: "surface-placeholder" }, dl = [
	"aria-label",
	"aria-expanded",
	"onClick"
], fl = [
	"src",
	"data-source",
	"alt"
], pl = {
	key: 1,
	role: "status"
}, ml = {
	key: 0,
	role: "alert"
}, hl = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(0), i = /* @__PURE__ */ W(!0), a;
		function o() {
			!f.value && !a && (a = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			a = void 0;
		});
		let s = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W();
		function l(e) {
			s.value && r.value === e ? c.value.hide() : (r.value = e, c.value.view(e));
		}
		let u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(), { isFullscreen: f, enter: p, exit: m } = $o(d, {
			pageOnly: t,
			teleport: i,
			fullscreenClass: "demo-fullscreen"
		});
		async function h(e) {
			e || c.value?.hide(), await yn(), !e && a && (window.scrollTo({
				...a,
				behavior: "instant"
			}), a = void 0);
		}
		function g(e) {
			h(!1), s.value = !1, u.value = e.message;
		}
		return Ln(f, h), (e, a) => (J(), Y("div", il, [
			X("header", al, [
				X("label", ol, [K(X("input", {
					"onUpdate:modelValue": a[0] ||= (e) => t.value = e,
					type: "checkbox",
					disabled: G(f)
				}, null, 8, sl), [[So, t.value]]), a[6] ||= Q(" pageOnly", -1)]),
				X("label", null, [K(X("input", {
					"onUpdate:modelValue": a[1] ||= (e) => i.value = e,
					type: "checkbox",
					disabled: G(f)
				}, null, 8, cl), [[So, i.value]]), a[7] ||= Q(" teleport", -1)]),
				X("button", {
					id: "enter",
					disabled: G(f),
					onClickCapture: o,
					onClick: a[2] ||= (e) => G(p)().catch(g)
				}, "进入全屏", 40, ll)
			]),
			X("div", ul, [X("section", {
				id: "demo-api",
				ref_key: "target",
				ref: d,
				class: "surface"
			}, [
				G(f) ? (J(), Y("button", {
					key: 0,
					id: "exit",
					class: "exit",
					onClick: a[3] ||= (e) => G(m)().catch(g)
				}, "退出全屏")) : $("v-if", !0),
				Z(G(vs), {
					ref_key: "preview",
					ref: c,
					class: "image-preview",
					url: "data-source",
					"z-index": 10001,
					toolbar: !1,
					title: !1,
					transition: !1,
					focus: !1,
					fullscreen: !1,
					onShow: a[4] ||= (e) => s.value = !0,
					onHidden: a[5] ||= (e) => s.value = !1
				}, {
					default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("button", {
						key: e,
						class: "image-trigger gallery-image-trigger",
						"aria-label": "预览图片 " + (t + 1),
						"aria-expanded": s.value && r.value === t ? "true" : "false",
						onClick: Oo((e) => l(t), ["stop"])
					}, [X("img", {
						class: "gallery-image demo-picture",
						src: "https://picsum.photos/id/" + e + "/640/360",
						"data-source": "https://picsum.photos/id/" + e + "/1280/720",
						alt: "风景图片 " + (t + 1),
						width: "1280",
						height: "720"
					}, null, 8, fl)], 8, dl)), 64))]),
					_: 1
				}, 512),
				G(f) && s.value && !t.value && !i.value ? (J(), Y("p", pl, "弹窗已在 body 下打开，但不属于当前原生全屏元素。")) : $("v-if", !0)
			], 512)]),
			u.value ? (J(), Y("p", ml, Me(u.value), 1)) : $("v-if", !0)
		]));
	}
};
hl.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-example:api en
var gl = { class: "lab" }, _l = { class: "options" }, vl = { class: "page-only-control" }, yl = ["disabled"], bl = ["disabled"], xl = ["disabled"], Sl = { class: "surface-placeholder" }, Cl = [
	"aria-label",
	"aria-expanded",
	"onClick"
], wl = [
	"src",
	"data-source",
	"alt"
], Tl = {
	key: 1,
	role: "status"
}, El = {
	key: 0,
	role: "alert"
}, Dl = {
	__name: "App",
	setup(e) {
		let t = /* @__PURE__ */ W(!1), n = [
			10,
			11,
			12,
			13,
			14,
			15
		], r = /* @__PURE__ */ W(0), i = /* @__PURE__ */ W(!0), a;
		function o() {
			!f.value && !a && (a = {
				left: window.scrollX,
				top: window.scrollY
			});
		}
		Cr(() => {
			a = void 0;
		});
		let s = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W();
		function l(e) {
			s.value && r.value === e ? c.value.hide() : (r.value = e, c.value.view(e));
		}
		let u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(), { isFullscreen: f, enter: p, exit: m } = $o(d, {
			pageOnly: t,
			teleport: i,
			fullscreenClass: "demo-fullscreen"
		});
		async function h(e) {
			e || c.value?.hide(), await yn(), !e && a && (window.scrollTo({
				...a,
				behavior: "instant"
			}), a = void 0);
		}
		function g(e) {
			h(!1), s.value = !1, u.value = e.message;
		}
		return Ln(f, h), (e, a) => (J(), Y("div", gl, [
			X("header", _l, [
				X("label", vl, [K(X("input", {
					"onUpdate:modelValue": a[0] ||= (e) => t.value = e,
					type: "checkbox",
					disabled: G(f)
				}, null, 8, yl), [[So, t.value]]), a[6] ||= Q(" pageOnly", -1)]),
				X("label", null, [K(X("input", {
					"onUpdate:modelValue": a[1] ||= (e) => i.value = e,
					type: "checkbox",
					disabled: G(f)
				}, null, 8, bl), [[So, i.value]]), a[7] ||= Q(" teleport", -1)]),
				X("button", {
					id: "enter",
					disabled: G(f),
					onClickCapture: o,
					onClick: a[2] ||= (e) => G(p)().catch(g)
				}, "Enter fullscreen", 40, xl)
			]),
			X("div", Sl, [X("section", {
				id: "demo-api",
				ref_key: "target",
				ref: d,
				class: "surface"
			}, [
				G(f) ? (J(), Y("button", {
					key: 0,
					id: "exit",
					class: "exit",
					onClick: a[3] ||= (e) => G(m)().catch(g)
				}, "Exit fullscreen")) : $("v-if", !0),
				Z(G(vs), {
					ref_key: "preview",
					ref: c,
					class: "image-preview",
					url: "data-source",
					"z-index": 10001,
					toolbar: !1,
					title: !1,
					transition: !1,
					focus: !1,
					fullscreen: !1,
					onShow: a[4] ||= (e) => s.value = !0,
					onHidden: a[5] ||= (e) => s.value = !1
				}, {
					default: jn(() => [(J(), Y(q, null, Ar(n, (e, t) => X("button", {
						key: e,
						class: "image-trigger gallery-image-trigger",
						"aria-label": "Preview image " + (t + 1),
						"aria-expanded": s.value && r.value === t ? "true" : "false",
						onClick: Oo((e) => l(t), ["stop"])
					}, [X("img", {
						class: "gallery-image demo-picture",
						src: "https://picsum.photos/id/" + e + "/640/360",
						"data-source": "https://picsum.photos/id/" + e + "/1280/720",
						alt: "Landscape " + (t + 1),
						width: "1280",
						height: "720"
					}, null, 8, wl)], 8, Cl)), 64))]),
					_: 1
				}, 512),
				G(f) && s.value && !t.value && !i.value ? (J(), Y("p", Tl, "The popup is open under body, but is outside the native fullscreen element.")) : $("v-if", !0)
			], 512)]),
			u.value ? (J(), Y("p", El, Me(u.value), 1)) : $("v-if", !0)
		]));
	}
};
Dl.__scopeId = "data-v-playground";
//#endregion
//#region \0virtual:fullscreen-examples
var Ol = {
	"component zh": js,
	"component zh pageOnly": Hs,
	"component zh teleport": Qs,
	"component en": uc,
	"component en pageOnly": xc,
	"component en teleport": jc,
	"directive zh": Wc,
	"directive en": rl,
	"api zh": hl,
	"api en": Dl
}, kl = "\n.lab[data-v-playground], .surface[data-v-playground] { --sample-bg: #f6f6f7; --sample-surface: #fff; --sample-text: #3c3c43; --sample-border: #c2c2c4; --sample-accent: #5b51d8; --sample-button-text: #fff; box-sizing: border-box; font: 14px/1.7 system-ui, sans-serif; color: var(--sample-text);\n}\n.dark .lab[data-v-playground], .dark .surface[data-v-playground] { --sample-bg: #1b1b1f; --sample-surface: #202127; --sample-text: #dfdfe5; --sample-border: #67676c; --sample-accent: #aaa2ff; --sample-button-text: #202127;\n}\n.lab[data-v-playground] { padding: 16px; background: var(--sample-bg);\n}\nbutton[data-v-playground], input[data-v-playground] { font: inherit;\n}\nbutton[data-v-playground] { padding: 8px 16px; border: 1px solid var(--sample-accent); border-radius: 6px; background: var(--sample-accent); color: var(--sample-button-text); cursor: pointer;\n}\nbutton[data-v-playground]:hover { filter: brightness(.94);\n}\nbutton[data-v-playground]:disabled { opacity: .5; cursor: default;\n}\nbutton[data-v-playground]:focus-visible, input[data-v-playground]:focus-visible { outline: 2px solid var(--sample-accent); outline-offset: 3px;\n}\ninput[data-v-playground] { accent-color: var(--sample-accent);\n}\n.options[data-v-playground] { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; padding-bottom: 16px;\n}\n.options label[data-v-playground] { display: flex; gap: 6px; align-items: center;\n}\n.options button[data-v-playground], .exit[data-v-playground] { width: 100%; padding: 12px 16px; font-size: 16px;\n}\n.surface-placeholder[data-v-playground] { height: 300px;\n}\n.surface[data-v-playground] { position: relative; height: 300px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; padding: 10px; background: var(--sample-surface); border: 1px solid var(--sample-border); border-radius: 8px;\n}\n.surface.demo-fullscreen[data-v-playground] { z-index: 10000; min-height: 100vh; height: 100vh; overflow: auto; border-radius: 0; padding: 20px 24px;\n}\n.image-preview[data-v-playground] { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-content: start; gap: 10px; width: 100%;\n}\n.image-trigger[data-v-playground] { display: block; aspect-ratio: 16 / 10; width: 100%; padding: 0; border: 0; border-radius: 4px; overflow: hidden; background: transparent; cursor: zoom-in;\n}\n.image-trigger[data-v-playground]:hover { background: transparent; filter: none;\n}\n.gallery-image[data-v-playground] { position: static; display: block; width: 100%; height: 100%; object-fit: cover;\n}\n.exit[data-v-playground] { flex-shrink: 0; margin-bottom: 16px;\n}\n.inline-gallery-stage[data-v-playground] { position: relative; flex: 1; min-height: 0; width: 100%;\n}\n.inline-gallery-sources[data-v-playground] { display: none;\n}\n.surface p[role=\"status\"][data-v-playground] { position: absolute; bottom: 68px; margin: 0; padding: 6px 12px; background: var(--sample-surface); font-size: 12px;\n}\n@media (max-width: 480px) {\n.image-preview[data-v-playground] { grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n}\n\n";
//#endregion
//#region docs/.vitepress/theme/demos/mount.mjs
function Al(e) {
	return (t, n, r, i) => {
		let a = document.createElement("style");
		a.textContent = kl, document.head.appendChild(a);
		try {
			let o = Ol[`${n} ${r ? "en" : "zh"}${i ? ` ${i}` : ""}`], s = e(t, o);
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
//#region docs/.vitepress/theme/demos/mount-vue3.mjs
var jl = Al((e, t) => {
	let n = Mo(t);
	return n.mount(e), () => {
		n.unmount();
	};
});
//#endregion
export { jl as mount };

import e from "vue";
//#region node_modules/.pnpm/screenfull@6.0.2/node_modules/screenfull/index.js
var t = [
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
], n = (() => {
	if (typeof document > "u") return !1;
	let e = t[0], n = {};
	for (let r of t) if (r?.[1] in document) {
		for (let [t, i] of r.entries()) n[e[t]] = i;
		return n;
	}
	return !1;
})(), r = {
	change: n.fullscreenchange,
	error: n.fullscreenerror
}, i = {
	request(e = document.documentElement, t) {
		return new Promise((r, a) => {
			let o = () => {
				i.off("change", o), r();
			};
			i.on("change", o);
			let s = e[n.requestFullscreen](t);
			s instanceof Promise && s.then(o).catch(a);
		});
	},
	exit() {
		return new Promise((e, t) => {
			if (!i.isFullscreen) {
				e();
				return;
			}
			let r = () => {
				i.off("change", r), e();
			};
			i.on("change", r);
			let a = document[n.exitFullscreen]();
			a instanceof Promise && a.then(r).catch(t);
		});
	},
	toggle(e, t) {
		return i.isFullscreen ? i.exit() : i.request(e, t);
	},
	onchange(e) {
		i.on("change", e);
	},
	onerror(e) {
		i.on("error", e);
	},
	on(e, t) {
		let n = r[e];
		n && document.addEventListener(n, t, !1);
	},
	off(e, t) {
		let n = r[e];
		n && document.removeEventListener(n, t, !1);
	},
	raw: n
};
Object.defineProperties(i, {
	isFullscreen: { get: () => !!document[n.fullscreenElement] },
	element: {
		enumerable: !0,
		get: () => document[n.fullscreenElement] ?? void 0
	},
	isEnabled: {
		enumerable: !0,
		get: () => !!document[n.fullscreenEnabled]
	}
}), n || (i = { isEnabled: !1 });
var a = i;
//#endregion
//#region packages/core/src/index.ts
function o(e) {
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
function s() {
	let e = null, t = !1, n = null, r = !1, i, s = {
		fullscreenClass: "fullscreen",
		teleport: !1,
		pageOnly: !1
	}, c = null, l = (e) => {
		t !== e && (t = e, s.callback?.(e));
	}, u = () => {
		typeof document < "u" && document.removeEventListener("keyup", f), a.isEnabled && a.off("change", d), i?.(), i = void 0, e = null, c = null;
	}, d = () => {
		a.element === c && a.isFullscreen ? l(!0) : (u(), l(!1));
	}, f = (e) => {
		(e.key === "Escape" || e.key === "Esc") && p.exit().catch(() => {});
	}, p = {
		get options() {
			return s;
		},
		get element() {
			return e;
		},
		get isFullscreen() {
			return t;
		},
		get isSupported() {
			return a.isEnabled;
		},
		get isEnabled() {
			return this.isSupported;
		},
		toggle(e, n, r) {
			return r ?? !t ? this.enter(e, n) : this.exit();
		},
		request(e, t = {}) {
			return p.enter(e, t);
		},
		enter(p, m = {}) {
			if (r) return Promise.reject(/* @__PURE__ */ Error("Fullscreen controller has been disposed"));
			if (n) return n;
			if (t) return Promise.resolve();
			if (typeof document > "u") return Promise.reject(/* @__PURE__ */ Error("Fullscreen requires a browser"));
			let h;
			try {
				h = o(p);
			} catch (e) {
				return Promise.reject(e);
			}
			s = {
				fullscreenClass: "fullscreen",
				teleport: !1,
				pageOnly: !1,
				...m
			}, s.pageOnly ||= !a.isEnabled, s.teleport &&= h !== document.body;
			let g = s.fullscreenClass.split(/\s+/).filter(Boolean).filter((e) => !h.classList.contains(e)), _ = [
				"position",
				"left",
				"top",
				"width",
				"height"
			].map((e) => [
				e,
				h.style.getPropertyValue(e),
				h.style.getPropertyPriority(e)
			]), v;
			if (i = () => {
				if (g.forEach((e) => h.classList.remove(e)), s.pageOnly || s.teleport) for (let [e, t, n] of _) t ? h.style.setProperty(e, t, n) : h.style.removeProperty(e);
				v?.parentNode && (h.parentNode ? v.parentNode.replaceChild(h, v) : v.parentNode.removeChild(v));
			}, e = h, g.forEach((e) => h.classList.add(e)), (s.pageOnly || s.teleport) && Object.assign(h.style, {
				position: "fixed",
				left: "0",
				top: "0",
				width: "100%",
				height: "100%"
			}), s.teleport && h.parentNode && (v = document.createComment("fullscreen"), h.parentNode.insertBefore(v, h), document.body.appendChild(h)), s.pageOnly) return document.addEventListener("keyup", f), l(!0), Promise.resolve();
			c = s.teleport ? document.body : h, a.on("change", d);
			try {
				return n = a.request(c).then(() => {
					if (r) return a.element === c ? a.exit() : void 0;
					e && d();
				}).catch((e) => {
					throw u(), l(!1), e;
				}).finally(() => {
					n = null;
				}), n;
			} catch (e) {
				return u(), Promise.reject(e);
			}
		},
		async exit() {
			n && await n, t && (s.pageOnly ? (u(), l(!1)) : (await a.exit(), t && (u(), l(!1))));
		},
		dispose() {
			r = !0;
			let e = c, t = n;
			u();
			try {
				l(!1);
			} finally {
				if (a.isEnabled) {
					let n = () => {
						if (e && a.element === e) return a.exit();
					};
					t ? t.then(n, () => {}).catch(() => {}) : Promise.resolve(n()).catch(() => {});
				}
			}
		}
	};
	return p;
}
var c = s(), l = {
	get options() {
		return c.options;
	},
	get element() {
		return c.element;
	},
	get isFullscreen() {
		return c.isFullscreen;
	},
	get isSupported() {
		return c.isSupported;
	},
	get isEnabled() {
		return c.isSupported;
	},
	enter: (e, t) => c.enter(e, t),
	request: (e, t) => c.enter(e, t),
	toggle: (e, t, n) => c.toggle(e, t, n),
	exit: () => c.exit(),
	dispose() {
		let e = c;
		c = s(), f = null, e.dispose();
	}
}, u = {
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
}, d = /* @__PURE__ */ new WeakMap(), f = null;
function p(e) {
	let t = d.get(e);
	t && e.removeEventListener("click", t), d.delete(e);
}
function m(e) {
	p(e), f === e && l.dispose();
}
function h(e, t) {
	p(e);
	let n = () => {
		try {
			let { target: n, ...i } = typeof t.value == "string" ? { target: t.value } : t.value ?? {}, a = c;
			a.element || (f = e), a.toggle(n, {
				teleport: !!t.modifiers.teleport,
				pageOnly: !!t.modifiers.pageOnly,
				...i,
				callback: (e) => {
					!e && c === a && (f = null), i.callback?.(e);
				}
			}).catch((e) => {
				c === a && !a.element && (f = null), r(e);
			});
		} catch (e) {
			r(e);
		}
	}, r = (t) => {
		let n = document.createEvent("CustomEvent");
		n.initCustomEvent("fullscreen-error", !0, !1, t), e.dispatchEvent(n);
	};
	d.set(e, n), e.addEventListener("click", n);
}
//#endregion
//#region packages/vue2/src/index.ts
var g = /* @__PURE__ */ new WeakMap(), _ = e.extend({
	name: "Fullscreen",
	inheritAttrs: !1,
	props: {
		...u,
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
		let e = s();
		g.set(this, e), this.isSupported = e.isSupported;
	},
	mounted() {
		(this.value || this.fullscreen) && this.update(!0);
	},
	beforeDestroy() {
		g.get(this)?.dispose(), g.delete(this);
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
			return g.get(this).enter(this.$el, {
				pageOnly: this.pageOnly,
				teleport: this.teleport,
				fullscreenClass: this.fullscreenClass,
				callback: (e) => {
					this.isFullscreen = e, this.$emit("change", e), this.$emit("input", e), this.$emit("update:fullscreen", e);
				}
			});
		},
		exit() {
			return g.get(this).exit();
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
}), v = {
	inserted: h,
	update: h,
	unbind: m
}, y = _, b = v, x = { install(e, { name: t = "fullscreen" } = {}) {
	Object.defineProperty(e.prototype, `$${t}`, {
		configurable: !0,
		get: () => l
	}), e.component(t, _), e.directive(t, v);
} };
//#endregion
export { _ as Fullscreen, l as api, l as fullscreen, y as component, x as default, b as directive, a as screenfull, v as vFullscreen };

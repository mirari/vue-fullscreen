import { computed as e, defineComponent as t, getCurrentInstance as n, h as r, mergeProps as i, onBeforeUnmount as a, onMounted as o, readonly as s, ref as c, unref as l, watch as u } from "vue";
//#region node_modules/.pnpm/screenfull@6.0.2/node_modules/screenfull/index.js
var d = [
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
], f = (() => {
	if (typeof document > "u") return !1;
	let e = d[0], t = {};
	for (let n of d) if (n?.[1] in document) {
		for (let [r, i] of n.entries()) t[e[r]] = i;
		return t;
	}
	return !1;
})(), p = {
	change: f.fullscreenchange,
	error: f.fullscreenerror
}, m = {
	request(e = document.documentElement, t) {
		return new Promise((n, r) => {
			let i = () => {
				m.off("change", i), n();
			};
			m.on("change", i);
			let a = e[f.requestFullscreen](t);
			a instanceof Promise && a.then(i).catch(r);
		});
	},
	exit() {
		return new Promise((e, t) => {
			if (!m.isFullscreen) {
				e();
				return;
			}
			let n = () => {
				m.off("change", n), e();
			};
			m.on("change", n);
			let r = document[f.exitFullscreen]();
			r instanceof Promise && r.then(n).catch(t);
		});
	},
	toggle(e, t) {
		return m.isFullscreen ? m.exit() : m.request(e, t);
	},
	onchange(e) {
		m.on("change", e);
	},
	onerror(e) {
		m.on("error", e);
	},
	on(e, t) {
		let n = p[e];
		n && document.addEventListener(n, t, !1);
	},
	off(e, t) {
		let n = p[e];
		n && document.removeEventListener(n, t, !1);
	},
	raw: f
};
Object.defineProperties(m, {
	isFullscreen: { get: () => !!document[f.fullscreenElement] },
	element: {
		enumerable: !0,
		get: () => document[f.fullscreenElement] ?? void 0
	},
	isEnabled: {
		enumerable: !0,
		get: () => !!document[f.fullscreenEnabled]
	}
}), f || (m = { isEnabled: !1 });
var h = m;
//#endregion
//#region packages/core/src/index.ts
function g(e) {
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
function _() {
	let e = null, t = !1, n = null, r = !1, i, a = {
		fullscreenClass: "fullscreen",
		teleport: !1,
		pageOnly: !1
	}, o = null, s = (e) => {
		t !== e && (t = e, a.callback?.(e));
	}, c = (t = !1) => {
		typeof document < "u" && document.removeEventListener("keyup", u), h.isEnabled && h.off("change", l), i?.(t), i = void 0, e = null, o = null;
	}, l = () => {
		h.element === o && h.isFullscreen ? s(!0) : (c(), s(!1));
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
			return h.isEnabled;
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
				p = g(d);
			} catch (e) {
				return Promise.reject(e);
			}
			a = {
				fullscreenClass: "fullscreen",
				teleport: !1,
				pageOnly: !1,
				...f
			}, a.pageOnly ||= !h.isEnabled, a.teleport &&= p !== document.body;
			let m = a.fullscreenClass.split(/\s+/).filter(Boolean).filter((e) => !p.classList.contains(e)), _ = [
				"position",
				"left",
				"top",
				"width",
				"height"
			].map((e) => [
				e,
				p.style.getPropertyValue(e),
				p.style.getPropertyPriority(e)
			]), v, y;
			if (i = (e) => {
				if (m.forEach((e) => p.classList.remove(e)), a.pageOnly || a.teleport) for (let [e, t, n] of _) t ? p.style.setProperty(e, t, n) : p.style.removeProperty(e);
				if (v?.parentNode) {
					let t = v.parentNode;
					if (p.parentNode ? v.parentNode.replaceChild(p, v) : v.parentNode.removeChild(v), e && y) {
						let e = y;
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
				y?.parentNode && y.parentNode.removeChild(y);
			}, e = p, m.forEach((e) => p.classList.add(e)), (a.pageOnly || a.teleport) && Object.assign(p.style, {
				position: "fixed",
				left: "0",
				top: "0",
				width: "100%",
				height: "100%"
			}), a.teleport && p.parentNode && (v = document.createComment("fullscreen"), p.parentNode.insertBefore(v, p), y = document.createElement("div"), y.setAttribute("data-fullscreen-teleport", ""), y.style.display = "contents", document.body.appendChild(y), y.appendChild(p)), a.pageOnly) return document.addEventListener("keyup", u), s(!0), Promise.resolve();
			o = a.teleport ? document.body : p, h.on("change", l);
			try {
				return n = h.request(o).then(() => {
					if (r) return h.element === o ? h.exit() : void 0;
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
			n && await n, t && (a.pageOnly ? (c(), s(!1)) : (await h.exit(), t && (c(), s(!1))));
		},
		dispose() {
			r = !0;
			let e = o, t = n;
			c(!0);
			try {
				s(!1);
			} finally {
				if (h.isEnabled) {
					let n = () => {
						if (e && h.element === e) return h.exit();
					};
					t ? t.then(n, () => {}).catch(() => {}) : Promise.resolve(n()).catch(() => {});
				}
			}
		}
	};
	return d;
}
var v = _(), y = {
	get options() {
		return v.options;
	},
	get element() {
		return v.element;
	},
	get isFullscreen() {
		return v.isFullscreen;
	},
	get isSupported() {
		return v.isSupported;
	},
	get isEnabled() {
		return v.isSupported;
	},
	enter: (e, t) => v.enter(e, t),
	request: (e, t) => v.enter(e, t),
	toggle: (e, t, n) => v.toggle(e, t, n),
	exit: () => v.exit(),
	dispose() {
		let e = v;
		v = _(), S = null, e.dispose();
	}
}, b = {
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
}, x = /* @__PURE__ */ new WeakMap(), S = null;
function C(e) {
	let t = x.get(e);
	t && e.removeEventListener("click", t), x.delete(e);
}
function w(e) {
	C(e), S === e && y.dispose();
}
function T(e, t) {
	C(e);
	let n = () => {
		try {
			let { target: n, ...i } = typeof t.value == "string" ? { target: t.value } : t.value ?? {}, a = v;
			a.element || (S = e), a.toggle(n, {
				teleport: !!t.modifiers.teleport,
				pageOnly: !!t.modifiers.pageOnly,
				...i,
				callback: (e) => {
					!e && v === a && (S = null), i.callback?.(e);
				}
			}).catch((e) => {
				v === a && !a.element && (S = null), r(e);
			});
		} catch (e) {
			r(e);
		}
	}, r = (t) => {
		let n = document.createEvent("CustomEvent");
		n.initCustomEvent("fullscreen-error", !0, !1, t), e.dispatchEvent(n);
	};
	x.set(e, n), e.addEventListener("click", n);
}
var E = t({
	name: "Fullscreen",
	inheritAttrs: !1,
	props: {
		...b,
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
		let n = c(), r = c(!1), i = _(), s = (e) => {
			r.value = e, t("change", e), t("update:modelValue", e), t("update:fullscreen", e);
		}, l = () => i.enter(n.value, {
			pageOnly: e.pageOnly,
			teleport: e.teleport,
			fullscreenClass: e.fullscreenClass,
			callback: s
		}), d = () => i.exit(), f = (e) => e ?? !i.isFullscreen ? l() : d(), p = (e) => {
			f(e).catch((e) => t("error", e));
		};
		return u(() => e.modelValue, p), u(() => e.fullscreen, p), o(() => {
			(e.modelValue || e.fullscreen) && p(!0);
		}), a(() => i.dispose()), {
			wrapper: n,
			enter: l,
			request: l,
			exit: d,
			toggle: f,
			isFullscreen: r,
			isSupported: i.isSupported,
			isEnabled: i.isSupported,
			shadeClick: (t) => {
				e.exitOnClickWrapper && t.target === n.value && p(!1);
			}
		};
	},
	render() {
		return r("div", i(this.$attrs, {
			ref: "wrapper",
			class: { [this.fullscreenClass]: this.isFullscreen },
			onClick: this.shadeClick
		}), this.$slots.default?.());
	}
}), D = {
	mounted: T,
	updated: T,
	beforeUnmount: w
}, O = E, k = D, A = (e) => typeof e == "function" ? e() : l(e);
function j(t, r = {}) {
	let i = _(), o = c(!1), l = () => i.enter(t, {
		pageOnly: A(r.pageOnly ?? !1),
		teleport: A(r.teleport ?? !1),
		fullscreenClass: A(r.fullscreenClass ?? "fullscreen"),
		callback: (e) => {
			o.value = e;
		}
	});
	return n() && a(() => {
		i.dispose(), o.value = !1;
	}), {
		isFullscreen: s(o),
		isSupported: e(() => i.isSupported),
		enter: l,
		exit: () => i.exit(),
		toggle: () => i.isFullscreen ? i.exit() : l()
	};
}
//#endregion
export { E as Fullscreen, O as component, k as directive, h as screenfull, j as useFullscreen, D as vFullscreen };

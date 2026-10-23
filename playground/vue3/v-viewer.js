import * as e from "vue";
import { Teleport as t, defineComponent as n, h as r, onBeforeUnmount as i, onMounted as a, onUpdated as o, ref as s, shallowRef as c, unref as l, watch as u } from "vue";
//#region \0rolldown/runtime.js
var d = Object.create, f = Object.defineProperty, p = Object.getOwnPropertyDescriptor, m = Object.getOwnPropertyNames, h = Object.getPrototypeOf, g = Object.prototype.hasOwnProperty, _ = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), v = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = m(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !g.call(e, s) && s !== n && f(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = p(t, s)) || r.enumerable
	});
	return e;
}, y = /* @__PURE__ */ ((e, t, n) => (n = e == null ? {} : d(h(e)), v(t || !e || !e.__esModule || !g.call(e, "default") ? f(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)))((/* @__PURE__ */ _(((e, t) => {
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
		}, u = "<div class=\"viewer-container\" tabindex=\"-1\" touch-action=\"none\"><div class=\"viewer-canvas\"></div><div class=\"viewer-footer\"><div class=\"viewer-title\"></div><div class=\"viewer-toolbar\"></div><div class=\"viewer-navbar\"><ul class=\"viewer-list\" role=\"navigation\"></ul></div></div><div class=\"viewer-tooltip\" role=\"alert\" aria-hidden=\"true\"></div><div class=\"viewer-button\" data-viewer-action=\"mix\" role=\"button\"></div><div class=\"viewer-player\"></div></div>", d = typeof window < "u" && window.document !== void 0, f = d ? window : {}, p = d && f.document.documentElement ? "ontouchstart" in f.document.documentElement : !1, m = d ? "PointerEvent" in f : !1, h = "viewer", g = "move", _ = "switch", v = "zoom", y = `${h}-active`, b = `${h}-close`, x = `${h}-fade`, S = `${h}-fixed`, C = `${h}-fullscreen`, w = `${h}-fullscreen-exit`, T = `${h}-hide`, E = `${h}-hide-md-down`, ee = `${h}-hide-sm-down`, te = `${h}-hide-xs-down`, D = `${h}-in`, O = `${h}-invisible`, k = `${h}-loading`, ne = `${h}-move`, re = `${h}-open`, A = `${h}-show`, j = `${h}-transition`, M = "click", ie = "dblclick", ae = "dragstart", N = "focusin", oe = "keydown", P = "load", F = "error", se = p ? "touchend touchcancel" : "mouseup", ce = p ? "touchmove" : "mousemove", le = m ? "pointerdown" : p ? "touchstart" : "mousedown", ue = m ? "pointermove" : ce, de = m ? "pointerup pointercancel" : se, fe = "resize", I = "transitionend", pe = "wheel", me = "ready", he = "show", ge = "shown", _e = "hide", ve = "hidden", ye = "view", L = "viewed", be = "move", xe = "moved", Se = "rotate", Ce = "rotated", we = "scale", Te = "scaled", Ee = "zoom", De = "zoomed", Oe = "play", ke = "stop", Ae = `${h}Action`, je = /\s\s*/, Me = [
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
		function R(e) {
			return typeof e == "string";
		}
		var Ne = Number.isNaN || f.isNaN;
		function z(e) {
			return typeof e == "number" && !Ne(e);
		}
		function B(e) {
			return e === void 0;
		}
		function V(e) {
			return c(e) === "object" && e !== null;
		}
		var Pe = Object.prototype.hasOwnProperty;
		function H(e) {
			if (!V(e)) return !1;
			try {
				var t = e.constructor, n = t.prototype;
				return t && n && Pe.call(n, "isPrototypeOf");
			} catch {
				return !1;
			}
		}
		function U(e) {
			return typeof e == "function";
		}
		function W(e, t) {
			if (e && U(t)) {
				if (Array.isArray(e) || z(e.length)) for (var n = e.length, r = 0; r < n && t.call(e, e[r], r, e) !== !1; r += 1);
				else V(e) && Object.keys(e).forEach(function(n) {
					t.call(e, e[n], n, e);
				});
			}
			return e;
		}
		var G = Object.assign || function(e) {
			var t = [...arguments].slice(1);
			return V(e) && t.length > 0 && t.forEach(function(t) {
				V(t) && Object.keys(t).forEach(function(n) {
					e[n] = t[n];
				});
			}), e;
		}, Fe = /^(?:width|height|left|top|marginLeft|marginTop)$/;
		function K(e, t) {
			var n = e.style;
			W(t, function(e, t) {
				Fe.test(t) && z(e) && (e += "px"), n[t] = e;
			});
		}
		function Ie(e) {
			return R(e) ? e.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
		}
		function q(e, t) {
			return !e || !t ? !1 : e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1;
		}
		function J(e, t) {
			if (e && t) {
				if (z(e.length)) W(e, function(e) {
					J(e, t);
				});
				else if (e.classList) e.classList.add(t);
				else {
					var n = e.className.trim();
					n ? n.indexOf(t) < 0 && (e.className = `${n} ${t}`) : e.className = t;
				}
			}
		}
		function Y(e, t) {
			e && t && (z(e.length) ? W(e, function(e) {
				Y(e, t);
			}) : e.classList ? e.classList.remove(t) : e.className.indexOf(t) >= 0 && (e.className = e.className.replace(t, "")));
		}
		function Le(e, t, n) {
			t && (z(e.length) ? W(e, function(e) {
				Le(e, t, n);
			}) : n ? J(e, t) : Y(e, t));
		}
		var Re = /([a-z\d])([A-Z])/g;
		function ze(e) {
			return e.replace(Re, "$1-$2").toLowerCase();
		}
		function X(e, t) {
			return V(e[t]) ? e[t] : e.dataset ? e.dataset[t] : e.getAttribute(`data-${ze(t)}`);
		}
		function Be(e, t, n) {
			V(n) ? e[t] = n : e.dataset ? e.dataset[t] = n : e.setAttribute(`data-${ze(t)}`, n);
		}
		var Ve = function() {
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
		function Z(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = n;
			t.trim().split(je).forEach(function(t) {
				if (!Ve) {
					var a = e.listeners;
					a && a[t] && a[t][n] && (i = a[t][n], delete a[t][n], Object.keys(a[t]).length === 0 && delete a[t], Object.keys(a).length === 0 && delete e.listeners);
				}
				e.removeEventListener(t, i, r);
			});
		}
		function Q(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = n;
			t.trim().split(je).forEach(function(t) {
				if (r.once && !Ve) {
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
		function $(e, t, n, r) {
			var i;
			return U(Event) && U(CustomEvent) ? i = new CustomEvent(t, a({
				bubbles: !0,
				cancelable: !0,
				detail: n
			}, r)) : (i = document.createEvent("CustomEvent"), i.initCustomEvent(t, !0, !0, n)), e.dispatchEvent(i);
		}
		function He(e) {
			var t = e.getBoundingClientRect();
			return {
				left: t.left + (window.pageXOffset - document.documentElement.clientLeft),
				top: t.top + (window.pageYOffset - document.documentElement.clientTop)
			};
		}
		function Ue(e) {
			var t = e.rotate, n = e.scaleX, r = e.scaleY, i = e.translateX, a = e.translateY, o = [];
			z(i) && i !== 0 && o.push(`translateX(${i}px)`), z(a) && a !== 0 && o.push(`translateY(${a}px)`), z(t) && t !== 0 && o.push(`rotate(${t}deg)`), z(n) && n !== 1 && o.push(`scaleX(${n})`), z(r) && r !== 1 && o.push(`scaleY(${r})`);
			var s = o.length ? o.join(" ") : "none";
			return {
				WebkitTransform: s,
				msTransform: s,
				transform: s
			};
		}
		function We(e) {
			return R(e) ? decodeURIComponent(e.replace(/^.*\//, "").replace(/[?&#].*$/, "")) : "";
		}
		var Ge = f.navigator && /Version\/\d+(\.\d+)+?\s+Safari/i.test(f.navigator.userAgent);
		function Ke(e, t, n) {
			var r = document.createElement("img");
			if (e.naturalWidth && !Ge) return n(e.naturalWidth, e.naturalHeight), r;
			var i = document.body || document.documentElement;
			return r.onload = function() {
				n(r.width, r.height), Ge || i.removeChild(r);
			}, W(t.inheritedAttributes, function(t) {
				var n = e.getAttribute(t);
				n !== null && r.setAttribute(t, n);
			}), r.src = e.src, Ge || (r.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", i.appendChild(r)), r;
		}
		function qe(e) {
			switch (e) {
				case 2: return te;
				case 3: return ee;
				case 4: return E;
				default: return "";
			}
		}
		function Je(e) {
			var t = a({}, e), n = [];
			return W(e, function(e, r) {
				delete t[r], W(t, function(t) {
					var r = Math.abs(e.startX - t.startX), i = Math.abs(e.startY - t.startY), a = Math.abs(e.endX - t.endX), o = Math.abs(e.endY - t.endY), s = Math.sqrt(r * r + i * i), c = (Math.sqrt(a * a + o * o) - s) / s;
					n.push(c);
				});
			}), n.sort(function(e, t) {
				return Math.abs(e) < Math.abs(t);
			}), n[0];
		}
		function Ye(e, t) {
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
		function Xe(e) {
			var t = 0, n = 0, r = 0;
			return W(e, function(e) {
				var i = e.startX, a = e.startY;
				t += i, n += a, r += 1;
			}), t /= r, n /= r, {
				pageX: t,
				pageY: n
			};
		}
		var Ze = {
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
				}, this.parentData = n), (this.fulled || !n) && (n = this.containerData), this.viewerData = G({}, n);
			},
			renderViewer: function() {
				this.options.inline && !this.fulled && K(this.viewer, this.viewerData);
			},
			initList: function() {
				var e = this, t = this.element, n = this.options, r = this.list, i = [];
				r.innerHTML = "", W(this.images, function(t, a) {
					var o = t.src, s = t.alt || We(o), c = e.getImageURL(t);
					if (o || c) {
						var l = document.createElement("li"), u = document.createElement("img");
						W(n.inheritedAttributes, function(e) {
							var n = t.getAttribute(e);
							n !== null && u.setAttribute(e, n);
						}), n.navbar && (u.src = o || c), u.alt = s, u.setAttribute("data-original-url", c || o), l.setAttribute("data-index", a), l.setAttribute("data-viewer-action", "view"), l.setAttribute("role", "button"), n.keyboard && l.setAttribute("tabindex", 0), l.appendChild(u), r.appendChild(l), i.push(l);
					}
				}), this.items = i, W(i, function(t) {
					var r = t.firstElementChild, i, a;
					Be(r, "filled", !0), n.loading && J(t, k), Q(r, P, i = function(i) {
						Z(r, F, a), n.loading && Y(t, k), e.loadImage(i);
					}, { once: !0 }), Q(r, F, a = function() {
						Z(r, P, i), n.loading && Y(t, k);
					}, { once: !0 });
				}), n.transition && Q(t, L, function() {
					J(r, j);
				}, { once: !0 });
			},
			renderList: function() {
				var e = this.index, t = this.items[e];
				if (t) {
					var n = t.nextElementSibling, r = parseInt(window.getComputedStyle(n || t).marginLeft, 10), i = t.offsetWidth, a = i + r;
					K(this.list, G({ width: a * this.length - r }, Ue({ translateX: (this.viewerData.width - i) / 2 - a * e })));
				}
			},
			resetList: function() {
				var e = this.list;
				e.innerHTML = "", Y(e, j), K(e, Ue({ translateX: 0 }));
			},
			initImage: function(e) {
				var t = this, n = this.options, r = this.image, i = this.viewerData, a = this.footer.offsetHeight, o = i.width, s = Math.max(i.height - a, a), c = this.imageData || {}, l;
				this.imageInitializing = { abort: function() {
					l.onload = null;
				} }, l = Ke(r, n, function(r, i) {
					var a = r / i, l = Math.max(0, Math.min(1, n.initialCoverage)), u = o, d = s;
					t.imageInitializing = !1, s * a > o ? d = o / a : u = s * a, l = z(l) ? l : .9, u = Math.min(u * l, r), d = Math.min(d * l, i);
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
					}, h = G({}, m);
					n.rotatable && (m.rotate = c.rotate || 0, h.rotate = 0), n.scalable && (m.scaleX = c.scaleX || 1, m.scaleY = c.scaleY || 1, h.scaleX = 1, h.scaleY = 1), t.imageData = m, t.initialImageData = h, e && e();
				});
			},
			renderImage: function(e) {
				var t = this, n = this.image, r = this.imageData;
				if (K(n, G({
					width: r.width,
					height: r.height,
					marginLeft: r.x,
					marginTop: r.y
				}, Ue(r))), e) {
					if ((this.viewing || this.moving || this.rotating || this.scaling || this.zooming) && this.options.transition && q(n, j)) {
						var i = function() {
							t.imageRendering = !1, e();
						};
						this.imageRendering = { abort: function() {
							Z(n, I, i);
						} }, Q(n, I, i, { once: !0 });
					} else e();
				}
			},
			resetImage: function() {
				var e = this.image;
				e && (this.viewing && this.viewing.abort(), e.parentNode.removeChild(e), this.image = null, this.title.innerHTML = "");
			}
		}, Qe = {
			bind: function() {
				var e = this.options, t = this.viewer, n = this.canvas, r = this.element.ownerDocument;
				Q(t, M, this.onClick = this.click.bind(this)), Q(t, ae, this.onDragStart = this.dragstart.bind(this)), Q(n, le, this.onPointerDown = this.pointerdown.bind(this)), Q(r, ue, this.onPointerMove = this.pointermove.bind(this)), Q(r, de, this.onPointerUp = this.pointerup.bind(this)), Q(r, oe, this.onKeyDown = this.keydown.bind(this)), Q(window, fe, this.onResize = this.resize.bind(this)), e.zoomable && e.zoomOnWheel && Q(t, pe, this.onWheel = this.wheel.bind(this), {
					passive: !1,
					capture: !0
				}), e.toggleOnDblclick && Q(n, ie, this.onDblclick = this.dblclick.bind(this));
			},
			unbind: function() {
				var e = this.options, t = this.viewer, n = this.canvas, r = this.element.ownerDocument;
				Z(t, M, this.onClick), Z(t, ae, this.onDragStart), Z(n, le, this.onPointerDown), Z(r, ue, this.onPointerMove), Z(r, de, this.onPointerUp), Z(r, oe, this.onKeyDown), Z(window, fe, this.onResize), e.zoomable && e.zoomOnWheel && Z(t, pe, this.onWheel, {
					passive: !1,
					capture: !0
				}), e.toggleOnDblclick && Z(n, ie, this.onDblclick);
			}
		}, $e = {
			click: function(e) {
				var t = this.options, n = this.imageData, r = e.target, i = X(r, Ae);
				switch (!i && r.localName === "img" && r.parentElement.localName === "li" && (r = r.parentElement, i = X(r, Ae)), p && e.isTrusted && r === this.canvas && clearTimeout(this.clickCanvasTimeout), i) {
					case "mix":
						this.played ? this.stop() : t.inline ? this.fulled ? this.exit() : this.full() : this.hide();
						break;
					case "hide":
						this.pointerMoved || this.hide();
						break;
					case "view":
						this.view(X(r, "index"));
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
				Y(r, O), n.loading && Y(this.canvas, k), r.style.cssText = `height:0;margin-left:${a.width / 2}px;margin-top:${a.height / 2}px;max-width:none!important;position:relative;width:0;`, this.initImage(function() {
					Le(r, ne, n.movable), Le(r, j, n.transition), e.renderImage(function() {
						e.viewed = !0, e.viewing = !1, U(n.viewed) && Q(t, L, n.viewed, { once: !0 }), $(t, L, {
							originalImage: e.images[i],
							index: i,
							image: r
						}, { cancelable: !1 });
					});
				});
			},
			loadImage: function(e) {
				var t = e.target, n = t.parentNode, r = n.offsetWidth || 30, i = n.offsetHeight || 50, a = !!X(t, "filled");
				Ke(t, this.options, function(e, n) {
					var o = e / n, s = r, c = i;
					i * o > r ? a ? s = i * o : c = r / o : a ? c = r / o : s = i * o, K(t, G({
						width: s,
						height: c
					}, Ue({
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
				if (this.pointerMoved = !1, !(!this.viewed || this.showing || this.viewing || this.hiding || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (z(r) && r !== 1 || z(i) && i !== 0 || e.ctrlKey))) {
					e.preventDefault(), e.changedTouches ? W(e.changedTouches, function(e) {
						n[e.identifier] = Ye(e);
					}) : n[e.pointerId || 0] = Ye(e);
					var a = t.movable ? g : !1;
					t.zoomOnTouch && t.zoomable && Object.keys(n).length > 1 ? a = v : t.slideOnTouch && (e.pointerType === "touch" || e.type === "touchstart") && this.isSwitchable() && (a = _), t.transition && (a === g || a === v) && Y(this.image, j), this.action = a;
				}
			},
			pointermove: function(e) {
				var t = this.pointers, n = this.action;
				this.viewed && n && (e.preventDefault(), e.changedTouches ? W(e.changedTouches, function(e) {
					G(t[e.identifier] || {}, Ye(e, !0));
				}) : G(t[e.pointerId || 0] || {}, Ye(e, !0)), this.change(e));
			},
			pointerup: function(e) {
				var t = this, n = this.options, r = this.action, i = this.pointers, a;
				e.changedTouches ? W(e.changedTouches, function(e) {
					a = i[e.identifier], delete i[e.identifier];
				}) : (a = i[e.pointerId || 0], delete i[e.pointerId || 0]), r && (e.preventDefault(), n.transition && (r === g || r === v) && J(this.image, j), this.action = !1, p && r !== v && a && Date.now() - a.timeStamp < 500 && (clearTimeout(this.clickCanvasTimeout), clearTimeout(this.doubleClickImageTimeout), n.toggleOnDblclick && this.viewed && e.target === this.image ? this.imageClicked ? (this.imageClicked = !1, this.doubleClickImageTimeout = setTimeout(function() {
					$(t.image, ie, { originalEvent: e });
				}, 50)) : (this.imageClicked = !0, this.doubleClickImageTimeout = setTimeout(function() {
					t.imageClicked = !1;
				}, 500)) : (this.imageClicked = !1, n.backdrop && n.backdrop !== "static" && e.target === this.canvas && (this.clickCanvasTimeout = setTimeout(function() {
					$(t.canvas, M, { originalEvent: e });
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
					W(this.player.getElementsByTagName("img"), function(t) {
						Q(t, P, e.loadImage.bind(e), { once: !0 }), $(t, P);
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
		}, et = {
			show: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], t = this.element, n = this.options;
				if (n.inline || this.showing || this.isShown || this.showing) return this;
				if (!this.ready) return this.build(), this.ready && this.show(e), this;
				if (U(n.show) && Q(t, he, n.show, { once: !0 }), $(t, he) === !1 || !this.ready) return this;
				this.hiding && this.transitioning.abort(), this.showing = !0, this.open();
				var r = this.viewer;
				if (Y(r, T), r.setAttribute("role", "dialog"), r.setAttribute("aria-labelledby", this.title.id), r.setAttribute("aria-modal", !0), r.removeAttribute("aria-hidden"), n.transition && !e) {
					var i = this.shown.bind(this);
					this.transitioning = { abort: function() {
						Z(r, I, i), Y(r, D);
					} }, J(r, j), r.initialOffsetWidth = r.offsetWidth, Q(r, I, i, { once: !0 }), J(r, D);
				} else J(r, D), this.shown();
				return this;
			},
			hide: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], n = this.element, r = this.options;
				if (r.inline || this.hiding || !(this.isShown || this.showing) || (U(r.hide) && Q(n, _e, r.hide, { once: !0 }), $(n, _e) === !1)) return this;
				this.showing && this.transitioning.abort(), this.hiding = !0, this.played ? this.stop() : this.viewing && this.viewing.abort();
				var i = this.viewer, a = this.image, o = function() {
					Y(i, D), e.hidden();
				};
				if (r.transition && !t) {
					var s = function(t) {
						t && t.target === i && (Z(i, I, s), e.hidden());
					}, c = function() {
						q(i, j) ? (Q(i, I, s), Y(i, D)) : o();
					};
					this.transitioning = { abort: function() {
						e.viewed && q(a, j) ? Z(a, I, c) : q(i, j) && Z(i, I, s);
					} }, this.viewed && q(a, j) ? (Q(a, I, c, { once: !0 }), this.zoomTo(0, !1, null, null, !0)) : c();
				} else o();
				return this;
			},
			view: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.initialViewIndex;
				if (t = Number(t) || 0, this.hiding || this.played || t < 0 || t >= this.length || this.viewed && t === this.index) return this;
				if (!this.isShown) return this.index = t, this.show();
				this.viewing && this.viewing.abort();
				var n = this.element, r = this.options, i = this.title, a = this.canvas, o = this.items[t], s = o.querySelector("img"), c = X(s, "originalUrl"), l = s.getAttribute("alt"), u = document.createElement("img");
				if (W(r.inheritedAttributes, function(e) {
					var t = s.getAttribute(e);
					t !== null && u.setAttribute(e, t);
				}), u.src = c, u.alt = l, U(r.view) && Q(n, ye, r.view, { once: !0 }), $(n, ye, {
					originalImage: this.images[t],
					index: t,
					image: u
				}) === !1 || !this.isShown || this.hiding || this.played) return this;
				var d = this.items[this.index];
				d && (Y(d, y), d.removeAttribute("aria-selected")), J(o, y), o.setAttribute("aria-selected", !0), r.focus && o.focus(), this.image = u, this.viewed = !1, this.index = t, this.imageData = {}, J(u, O), r.loading && J(a, k), a.innerHTML = "", a.appendChild(u), this.renderList(), i.innerHTML = "";
				var f = function() {
					var t = e.imageData, n = Array.isArray(r.title) ? r.title[1] : r.title;
					i.innerHTML = Ie(U(n) ? n.call(e, u, t) : `${l} (${t.naturalWidth} × ${t.naturalHeight})`);
				}, p, m;
				return Q(n, L, f, { once: !0 }), this.viewing = { abort: function() {
					Z(n, L, f), u.complete ? e.imageRendering ? e.imageRendering.abort() : e.imageInitializing && e.imageInitializing.abort() : (u.src = "", Z(u, P, p), e.timeout && clearTimeout(e.timeout));
				} }, u.complete ? this.load() : (Q(u, P, p = function() {
					Z(u, F, m), e.load();
				}, { once: !0 }), Q(u, F, m = function() {
					Z(u, P, p), e.timeout &&= (clearTimeout(e.timeout), !1), Y(u, O), r.loading && Y(e.canvas, k);
				}, { once: !0 }), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function() {
					Y(u, O), e.timeout = !1;
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
				return this.moveTo(B(e) ? e : n.x + Number(e), B(t) ? t : n.y + Number(t)), this;
			},
			moveTo: function(e) {
				var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, i = this.element, a = this.options, o = this.imageData;
				if (e = Number(e), n = Number(n), this.viewed && !this.played && a.movable) {
					var s = o.x, c = o.y, l = !1;
					if (z(e) ? l = !0 : e = s, z(n) ? l = !0 : n = c, l) {
						if (U(a.move) && Q(i, be, a.move, { once: !0 }), $(i, be, {
							x: e,
							y: n,
							oldX: s,
							oldY: c,
							originalEvent: r
						}) === !1) return this;
						o.x = e, o.y = n, o.left = e, o.top = n, this.moving = !0, this.renderImage(function() {
							t.moving = !1, U(a.moved) && Q(i, xe, a.moved, { once: !0 }), $(i, xe, {
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
				if (e = Number(e), z(e) && this.viewed && !this.played && r.rotatable) {
					var a = i.rotate;
					if (U(r.rotate) && Q(n, Se, r.rotate, { once: !0 }), $(n, Se, {
						degree: e,
						oldDegree: a
					}) === !1) return this;
					i.rotate = e, this.rotating = !0, this.renderImage(function() {
						t.rotating = !1, U(r.rotated) && Q(n, Ce, r.rotated, { once: !0 }), $(n, Ce, {
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
					if (z(e) ? c = !0 : e = o, z(n) ? c = !0 : n = s, c) {
						if (U(i.scale) && Q(r, we, i.scale, { once: !0 }), $(r, we, {
							scaleX: e,
							scaleY: n,
							oldScaleX: o,
							oldScaleY: s
						}) === !1) return this;
						a.scaleX = e, a.scaleY = n, this.scaling = !0, this.renderImage(function() {
							t.scaling = !1, U(i.scaled) && Q(r, Te, i.scaled, { once: !0 }), $(r, Te, {
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
				if (e = Math.max(0, e), z(e) && this.viewed && !this.played && (a || s.zoomable)) {
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
					if (U(s.zoom) && Q(o, Ee, s.zoom, { once: !0 }), $(o, Ee, {
						ratio: e,
						oldRatio: S,
						originalEvent: i
					}) === !1) return this;
					if (this.zooming = !0, i) {
						var C = He(this.viewer), w = c && Object.keys(c).length > 0 ? Xe(c) : {
							pageX: i.pageX,
							pageY: i.pageY
						};
						l.x -= b * ((w.pageX - C.left - u) / f), l.y -= x * ((w.pageY - C.top - d) / p);
					} else H(r) && z(r.x) && z(r.y) ? (l.x -= b * ((r.x - u) / f), l.y -= x * ((r.y - d) / p)) : (l.x -= b / 2, l.y -= x / 2);
					l.left = l.x, l.top = l.y, l.width = v, l.height = y, l.oldRatio = S, l.ratio = e, this.renderImage(function() {
						t.zooming = !1, U(s.zoomed) && Q(o, De, s.zoomed, { once: !0 }), $(o, De, {
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
				if (U(r.play) && Q(n, Oe, r.play, { once: !0 }), $(n, Oe) === !1) return this;
				var i = this.player, a = this.loadImage.bind(this), o = [], s = 0, c = 0;
				if (this.played = !0, this.onLoadWhenPlay = a, t && this.requestFullscreen(t), J(i, A), W(this.items, function(e, t) {
					var n = e.querySelector("img"), l = document.createElement("img");
					l.src = X(n, "originalUrl"), l.alt = n.getAttribute("alt"), l.referrerPolicy = n.referrerPolicy, s += 1, J(l, x), Le(l, j, r.transition), q(e, y) && (J(l, D), c = t), o.push(l), Q(l, P, a, { once: !0 }), i.appendChild(l);
				}), z(r.interval) && r.interval > 0) {
					var l = function() {
						clearTimeout(e.playing.timeout), Y(o[c], D), --c, c = c >= 0 ? c : s - 1, J(o[c], D), e.playing.timeout = setTimeout(l, r.interval);
					}, u = function() {
						clearTimeout(e.playing.timeout), Y(o[c], D), c += 1, c = c < s ? c : 0, J(o[c], D), e.playing.timeout = setTimeout(u, r.interval);
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
				if (U(n.stop) && Q(t, ke, n.stop, { once: !0 }), $(t, ke) === !1) return this;
				var r = this.player;
				return clearTimeout(this.playing.timeout), this.playing = !1, this.played = !1, W(r.getElementsByTagName("img"), function(t) {
					Z(t, P, e.onLoadWhenPlay);
				}), Y(r, A), r.innerHTML = "", this.exitFullscreen(), this;
			},
			full: function() {
				var e = this, t = this.options, n = this.viewer, r = this.image, i = this.list;
				return !this.isShown || this.played || this.fulled || !t.inline || (this.fulled = !0, this.open(), J(this.button, w), t.transition && (Y(i, j), this.viewed && Y(r, j)), J(n, S), n.setAttribute("role", "dialog"), n.setAttribute("aria-labelledby", this.title.id), n.setAttribute("aria-modal", !0), n.removeAttribute("style"), K(n, { zIndex: t.zIndex }), t.focus && this.enforceFocus(), this.initContainer(), this.viewerData = G({}, this.containerData), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage(function() {
						t.transition && setTimeout(function() {
							J(r, j), J(i, j);
						}, 0);
					});
				})), this;
			},
			exit: function() {
				var e = this, t = this.options, n = this.viewer, r = this.image, i = this.list;
				return !this.isShown || this.played || !this.fulled || !t.inline || (this.fulled = !1, this.close(), Y(this.button, w), t.transition && (Y(i, j), this.viewed && Y(r, j)), t.focus && this.clearEnforceFocus(), n.removeAttribute("role"), n.removeAttribute("aria-labelledby"), n.removeAttribute("aria-modal"), Y(n, S), K(n, { zIndex: t.zIndexInline }), this.viewerData = G({}, this.parentData), this.renderViewer(), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage(function() {
						t.transition && setTimeout(function() {
							J(r, j), J(i, j);
						}, 0);
					});
				})), this;
			},
			tooltip: function() {
				var e = this, t = this.options, n = this.tooltipBox, r = this.imageData;
				return !this.viewed || this.played || !t.tooltip || (n.textContent = `${Math.round(r.ratio * 100)}%`, this.tooltipping ? clearTimeout(this.tooltipping) : t.transition ? (this.fading && $(n, I), J(n, A), J(n, x), J(n, j), n.removeAttribute("aria-hidden"), n.initialOffsetWidth = n.offsetWidth, J(n, D)) : (J(n, A), n.removeAttribute("aria-hidden")), this.tooltipping = setTimeout(function() {
					t.transition ? (Q(n, I, function() {
						Y(n, A), Y(n, x), Y(n, j), n.setAttribute("aria-hidden", !0), e.fading = !1;
					}, { once: !0 }), Y(n, D), e.fading = !0) : (Y(n, A), n.setAttribute("aria-hidden", !0)), e.tooltipping = !1;
				}, 1e3)), this;
			},
			toggle: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
				return this.imageData.ratio === 1 ? this.zoomTo(this.imageData.oldRatio, !0, null, e) : this.zoomTo(1, !0, null, e), this;
			},
			reset: function() {
				return this.viewed && !this.played && (this.imageData = G({}, this.initialImageData), this.renderImage()), this;
			},
			update: function() {
				var e = this, t = this.element, n = this.options, r = this.isImg;
				if (r && !t.parentNode) return this.destroy();
				var i = [];
				if (W(r ? [t] : t.querySelectorAll("img"), function(t) {
					U(n.filter) ? n.filter.call(e, t) && i.push(t) : e.getImageURL(t) && i.push(t);
				}), !i.length) return this;
				if (this.images = i, this.length = i.length, this.ready) {
					var a = [];
					if (W(this.items, function(e, t) {
						var n = e.querySelector("img"), r = i[t];
						r && n ? (r.src !== n.src || r.alt !== n.alt) && a.push(t) : a.push(t);
					}), K(this.list, { width: "auto" }), this.initList(), this.isShown) {
						if (this.length) {
							if (this.viewed) {
								var o = a.indexOf(this.index);
								if (o >= 0) this.viewed = !1, this.view(Math.max(Math.min(this.index - o, this.length - 1), 0));
								else {
									var s = this.items[this.index];
									J(s, y), s.setAttribute("aria-selected", !0);
								}
							}
						} else this.image = null, this.viewed = !1, this.index = 0, this.imageData = {}, this.canvas.innerHTML = "", this.title.innerHTML = "";
					}
				} else this.build();
				return this;
			},
			destroy: function() {
				var e = this.element, t = this.options;
				return e[h] && (this.destroyed = !0, this.ready ? (this.played && this.stop(), t.inline ? (this.fulled && this.exit(), this.unbind()) : this.isShown ? (this.viewing && (this.imageRendering ? this.imageRendering.abort() : this.imageInitializing && this.imageInitializing.abort()), this.hiding && this.transitioning.abort(), this.hidden()) : this.showing && (this.transitioning.abort(), this.hidden()), this.ready = !1, this.viewer.parentNode.removeChild(this.viewer)) : t.inline && (this.delaying ? this.delaying.abort() : this.initializing && this.initializing.abort()), t.inline || Z(e, M, this.onStart), e[h] = void 0), this;
			}
		}, tt = {
			getImageURL: function(e) {
				var t = this.options.url;
				return t = R(t) ? e.getAttribute(t) : U(t) ? t.call(this, e) : "", t;
			},
			enforceFocus: function() {
				var e = this;
				this.clearEnforceFocus(), Q(document, N, this.onFocusin = function(t) {
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
				this.onFocusin &&= (Z(document, N, this.onFocusin), null);
			},
			open: function() {
				var e = this.body;
				J(e, re), this.scrollbarWidth > 0 && (e.style.paddingRight = `${this.scrollbarWidth + (parseFloat(this.initialBodyComputedPaddingRight) || 0)}px`);
			},
			close: function() {
				var e = this.body;
				Y(e, re), this.scrollbarWidth > 0 && (e.style.paddingRight = this.initialBodyPaddingRight);
			},
			shown: function() {
				var e = this.element, t = this.options, n = this.viewer;
				this.fulled = !0, this.isShown = !0, this.render(), this.bind(), this.showing = !1, t.focus && (n.focus(), this.enforceFocus()), U(t.shown) && Q(e, ge, t.shown, { once: !0 }), $(e, ge) !== !1 && this.ready && this.isShown && !this.hiding && this.view(this.index);
			},
			hidden: function() {
				var e = this.element, t = this.options, n = this.viewer;
				t.fucus && this.clearEnforceFocus(), this.close(), this.unbind(), J(n, T), n.removeAttribute("role"), n.removeAttribute("aria-labelledby"), n.removeAttribute("aria-modal"), n.setAttribute("aria-hidden", !0), this.resetList(), this.resetImage(), this.fulled = !1, this.viewed = !1, this.isShown = !1, this.hiding = !1, this.destroyed || (U(t.hidden) && Q(e, ve, t.hidden, { once: !0 }), $(e, ve, null, { cancelable: !1 }));
			},
			requestFullscreen: function(e) {
				var t = this.element.ownerDocument;
				if (this.fulled && !(t.fullscreenElement || t.webkitFullscreenElement || t.mozFullScreenElement || t.msFullscreenElement)) {
					var n = t.documentElement;
					n.requestFullscreen ? H(e) ? n.requestFullscreen(e) : n.requestFullscreen() : n.webkitRequestFullscreen ? n.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.msRequestFullscreen && n.msRequestFullscreen();
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
							this.zoom(Je(n), !1, null, e);
							break;
						case _:
							this.action = "switched";
							var o = Math.abs(i);
							o > 1 && o > Math.abs(a) && (this.pointers = {}, i > 1 ? this.prev(t.loop) : i < -1 && this.next(t.loop));
					}
					W(n, function(e) {
						e.startX = e.endX, e.startY = e.endY;
					});
				}
			},
			isSwitchable: function() {
				var e = this.imageData, t = this.viewerData;
				return this.length > 1 && e.x >= 0 && e.y >= 0 && e.width <= t.width && e.height <= t.height;
			}
		}, nt = f.Viewer, rt = function(e) {
			return function() {
				return e += 1, e;
			};
		}(-1), it = /*#__PURE__*/ function() {
			function t(n) {
				var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				if (e(this, t), !n || n.nodeType !== 1) throw Error("The first argument is required and must be an element.");
				this.element = n, this.options = G({}, l, H(r) && r), this.action = !1, this.fading = !1, this.fulled = !1, this.hiding = !1, this.imageClicked = !1, this.imageData = {}, this.index = this.options.initialViewIndex, this.isImg = !1, this.isShown = !1, this.length = 0, this.moving = !1, this.played = !1, this.playing = !1, this.pointers = {}, this.ready = !1, this.rotating = !1, this.scaling = !1, this.showing = !1, this.timeout = !1, this.tooltipping = !1, this.viewed = !1, this.viewing = !1, this.wheeling = !1, this.zooming = !1, this.pointerMoved = !1, this.id = rt(), this.init();
			}
			return n(t, [{
				key: "init",
				value: function() {
					var e = this, t = this.element, n = this.options;
					if (!t[h]) {
						t[h] = this, n.focus && !n.keyboard && (n.focus = !1);
						var r = t.localName === "img", i = [];
						if (W(r ? [t] : t.querySelectorAll("img"), function(t) {
							U(n.filter) ? n.filter.call(e, t) && i.push(t) : e.getImageURL(t) && i.push(t);
						}), this.isImg = r, this.length = i.length, this.images = i, this.initBody(), B(document.createElement(h).style.transition) && (n.transition = !1), n.inline) {
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
								W(i, function(e) {
									e.complete || (Z(e, P, o), Z(e, F, o));
								});
							} }, W(i, function(e) {
								if (e.complete) o();
								else {
									var t, n;
									Q(e, P, t = function() {
										Z(e, F, n), o();
									}, { once: !0 }), Q(e, F, n = function() {
										Z(e, P, t), o();
									}, { once: !0 });
								}
							});
						} else Q(t, M, this.onStart = function(t) {
							var r = t.target;
							r.localName === "img" && (!U(n.filter) || n.filter.call(e, r)) && e.view(e.images.indexOf(r));
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
						if (this.parent = n, this.viewer = i, this.title = a, this.toolbar = o, this.navbar = s, this.button = c, this.canvas = l, this.footer = i.querySelector(`.${h}-footer`), this.tooltipBox = i.querySelector(`.${h}-tooltip`), this.player = i.querySelector(`.${h}-player`), this.list = i.querySelector(`.${h}-list`), i.id = `${h}${this.id}`, a.id = `${h}Title${this.id}`, J(a, t.title ? qe(Array.isArray(t.title) ? t.title[0] : t.title) : T), J(s, t.navbar ? qe(t.navbar) : T), Le(c, T, !t.button), t.keyboard && c.setAttribute("tabindex", 0), t.backdrop && (J(i, `${h}-backdrop`), !t.inline && t.backdrop !== "static" && Be(l, Ae, "hide")), R(t.className) && t.className && t.className.split(je).forEach(function(e) {
							J(i, e);
						}), t.toolbar) {
							var d = document.createElement("ul"), f = H(t.toolbar), p = Me.slice(0, 3), m = Me.slice(7, 9), g = Me.slice(9);
							f || J(o, qe(t.toolbar)), W(f ? t.toolbar : Me, function(e, n) {
								var r = f && H(e), i = f ? ze(n) : e, a = r && !B(e.show) ? e.show : e;
								if (!(!a || !t.zoomable && p.indexOf(i) !== -1 || !t.rotatable && m.indexOf(i) !== -1 || !t.scalable && g.indexOf(i) !== -1)) {
									var o = r && !B(e.size) ? e.size : e, s = r && !B(e.click) ? e.click : e, c = document.createElement("li");
									t.keyboard && c.setAttribute("tabindex", 0), c.setAttribute("role", "button"), J(c, `${h}-${i}`), U(s) || Be(c, Ae, i), z(a) && J(c, qe(a)), ["small", "large"].indexOf(o) === -1 ? i === "play" && J(c, `${h}-large`) : J(c, `${h}-${o}`), U(s) && Q(c, M, s), d.appendChild(c);
								}
							}), o.appendChild(d);
						} else J(o, T);
						if (!t.rotatable) {
							var _ = o.querySelectorAll("li[class*=\"rotate\"]");
							J(_, O), W(_, function(e) {
								o.appendChild(e);
							});
						}
						if (t.inline) J(c, C), K(i, { zIndex: t.zIndexInline }), window.getComputedStyle(n).position === "static" && K(n, { position: "relative" }), n.insertBefore(i, e.nextSibling);
						else {
							J(c, b), J(i, S), J(i, x), J(i, T), K(i, { zIndex: t.zIndex });
							var v = t.container;
							R(v) && (v = e.ownerDocument.querySelector(v)), v ||= this.body, v.appendChild(i);
						}
						t.inline && (this.render(), this.bind(), this.isShown = !0), this.ready = !0, U(t.ready) && Q(e, me, t.ready, { once: !0 }), $(e, me) === !1 ? this.ready = !1 : this.ready && t.inline && this.view(this.index);
					}
				}
			}], [{
				key: "noConflict",
				value: function() {
					return window.Viewer = nt, t;
				}
			}, {
				key: "setDefaults",
				value: function(e) {
					G(l, H(e) && e);
				}
			}]);
		}();
		return G(it.prototype, Ze, Qe, $e, et, tt), it;
	}));
})))(), 1), b = [
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
], x = {
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
function S(e) {
	let t = { ...e.options };
	for (let n of Object.keys(x)) e[n] !== void 0 && (t[n] = e[n]);
	return t;
}
function C(e, t) {
	let n = b.map((n) => {
		let r = (r) => {
			r.target === e && t(n, r);
		};
		return e.addEventListener(n, r), () => e.removeEventListener(n, r);
	});
	return () => n.forEach((e) => e());
}
var w = [
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
function T(e) {
	return {
		...Object.fromEntries(w.map((t) => [t, (...n) => {
			var r;
			let i = e();
			return i == null || (r = i[t]) == null ? void 0 : r.apply(i, n);
		}])),
		showTooltip: () => e()?.tooltip()
	};
}
function E(e) {
	let t = (e.tagName === "IMG" ? [e] : Array.from(e.querySelectorAll("img"))).filter((e) => !e.closest(".viewer-container"));
	return {
		sources: t,
		attributes: JSON.stringify(t.map((e) => Array.from(e.attributes).map((e) => [e.name, e.value]).sort(([e], [t]) => e.localeCompare(t))))
	};
}
function ee(e) {
	if (e.nodeType !== 1) return !1;
	let t = e;
	return t.closest(".viewer-container") ? !1 : t.tagName === "IMG" || Array.from(t.querySelectorAll("img")).some((e) => !e.closest(".viewer-container"));
}
function te(e) {
	return e.type === "attributes" ? e.target.tagName === "IMG" && !e.target.closest(".viewer-container") : [...Array.from(e.addedNodes), ...Array.from(e.removedNodes)].some(ee);
}
function D(e, t = {}) {
	let n = { ...t }, r, i, a = E(e), o, s = 0, c = !1, l = n.onEvent ? C(e, (e, t) => n.onEvent?.call(n, e, t)) : void 0;
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
					r = new y.default(e, { ...n.options });
					let t = r, i = t.build;
					t.build = function() {
						if (!this.destroyed) return i.call(this);
					};
				}
				e.$viewer = r, a = E(e);
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
			let t = E(e);
			(t.attributes !== a.attributes || t.sources.length !== a.sources.length || t.sources.some((e, t) => e !== a.sources[t])) && d();
		}, Math.max(0, p() - (Date.now() - s)));
	}
	function g() {
		i?.disconnect(), !(c || n.observe === !1 || typeof MutationObserver > "u") && (i ??= new MutationObserver((e) => {
			e.some(te) && m();
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
function O({ images: e, options: t = {} }) {
	if (typeof document > "u") throw Error("v-viewer: showViewer must be called in a browser");
	let n = document.createElement("div");
	n.hidden = !0, n.className = "v-viewer-token";
	for (let t of e) {
		let e = document.createElement("img"), r = typeof t == "string" ? { src: t } : t;
		for (let [t, n] of Object.entries(r)) /^on/i.test(t) || e.setAttribute(t, n);
		n.appendChild(e);
	}
	document.body.appendChild(n);
	let r;
	try {
		r = new y.default(n, {
			...k(t),
			inline: !1
		});
	} catch (e) {
		throw n.remove(), e;
	}
	let i = r.destroy.bind(r), a = !1, o = (e) => {
		e.target === n && r.destroy();
	};
	r.destroy = () => {
		if (a) return r;
		a = !0, n.removeEventListener("hidden", o);
		try {
			i();
		} finally {
			n.remove();
		}
		return r;
	}, n.addEventListener("hidden", o);
	try {
		r.show();
	} catch (e) {
		throw r.destroy(), e;
	}
	return r;
}
function k(e) {
	return Array.isArray(e) ? e.map(k) : e && Object.prototype.toString.call(e) === "[object Object]" ? Object.fromEntries(Object.entries(e).map(([e, t]) => [e, k(t)])) : e;
}
function ne(e, t) {
	if (e === t) return !0;
	if (!e || !t || typeof e != "object" || typeof t != "object") return !1;
	let n = (e) => Array.isArray(e) || Object.prototype.toString.call(e) === "[object Object]";
	if (!n(e) || !n(t)) return !1;
	let r = Object.keys(e);
	return r.length === Object.keys(t).length && r.every((n) => Object.prototype.hasOwnProperty.call(t, n) && ne(e[n], t[n]));
}
function re() {
	let e = /* @__PURE__ */ new WeakMap();
	return {
		mount(t, n) {
			var r;
			(r = e.get(t)) == null || r.controller.dispose();
			let { observe: i, rebuild: a, ...o } = n.value ?? {}, s = a ?? !!n.modifiers.rebuild;
			e.set(t, {
				options: k(o),
				observe: i,
				rebuild: s,
				controller: D(t, {
					options: o,
					rebuild: s,
					observe: i
				})
			});
		},
		update(t, n) {
			let r = e.get(t);
			if (!r) return;
			let { observe: i, rebuild: a, ...o } = n.value ?? {}, s = a ?? !!n.modifiers.rebuild, c = !ne(r.options, o);
			c || s !== r.rebuild ? r.controller.configure({
				options: o,
				rebuild: s,
				observe: i
			}, c || s) : i !== r.observe && r.controller.configure({ observe: i }), r.options = k(o), r.observe = i, r.rebuild = s;
		},
		unmount(t) {
			var n;
			(n = e.get(t)) == null || n.controller.dispose(), e.delete(t);
		}
	};
}
var A = 0;
function j() {
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
				key: ++A,
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
function M(e) {
	let t = e;
	return {
		image: t != null && t.viewed ? t.image : void 0,
		index: t?.index ?? 0
	};
}
var ie = n({
	props: { content: {
		type: Function,
		required: !0
	} },
	render() {
		return r("span", { style: { display: "contents" } }, this.content());
	}
}), ae = n({
	name: "Viewer",
	props: {
		...x,
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
	emits: [...b],
	setup(e, { emit: t, expose: n, slots: r }) {
		let l = s(), d = c(), f, p = !1, m = j(), h = c([]), g = c(M(void 0)), _ = () => {
			h.value = m.sync(d.value, (e) => !!r[e]);
			let e = M(d.value);
			(e.image !== g.value.image || e.index !== g.value.index) && (g.value = e);
		}, v = () => {
			d.value = void 0, m.clear(), h.value = [], g.value = M(void 0);
		}, y = () => S(e), b = () => {
			p || !l.value || f || (f = D(l.value, {
				options: y(),
				rebuild: e.rebuild,
				observe: e.observe,
				onEvent: (e, n) => {
					_(), t(e, n);
				},
				onDestroy: v,
				onInit: (e) => {
					d.value = e, _();
				}
			}));
		}, x = () => {
			f?.dispose(), f = void 0, d.value = void 0;
		}, C = () => f ? f.refresh(!1) : b(), w = () => f ? f.configure({
			options: y(),
			rebuild: e.rebuild
		}) : b();
		u(y, w, {
			deep: !0,
			flush: "post"
		}), u(() => e.observe, (e) => f?.configure({ observe: e }), { flush: "post" }), u(() => e.rebuild, () => {
			f?.configure({ rebuild: e.rebuild }, e.rebuild);
		}, { flush: "post" }), a(b), o(_), i(() => {
			p = !0, x();
		});
		let E = {
			...T(() => d.value),
			update: C,
			destroy: x,
			viewer: d,
			createViewer: b,
			updateViewer: C,
			rebuildViewer: w,
			destroyViewer: x
		};
		n?.(E);
		let ee = () => ({
			...E,
			...g.value
		});
		return {
			...E,
			root: l,
			toolbarMounts: h,
			toolbarScope: ee
		};
	},
	render() {
		var e;
		return r("div", { ref: "root" }, [(e = this.$slots).default?.call(e, { options: this.options }), ...this.toolbarMounts.map((e) => r(t, {
			to: e.target,
			key: e.key
		}, [r(ie, { content: () => {
			var t;
			return (t = this.$slots)[e.slot]?.call(t, this.toolbarScope());
		} })]))]);
	}
}), N = re(), oe = {
	deep: !0,
	mounted: N.mount,
	updated: N.update,
	beforeUnmount: N.unmount,
	getSSRProps: () => ({})
}, P = (e) => typeof e == "function" ? e() : l(e);
function F(t = {}) {
	var n;
	let r = c(), a = s(!1), o = !1;
	function l() {
		var e;
		(e = r.value) == null || e.destroy(), r.value = void 0, a.value = !1;
	}
	function u(e) {
		if (o || typeof document > "u") return;
		let n = r.value;
		if (n) return e === void 0 ? n.show() : n.view(e), n;
		let i = t.options ? P(t.options) : {}, { shown: s, hidden: c } = i, l;
		try {
			l = O({
				images: t.images ? P(t.images) : [],
				options: {
					...i,
					...e === void 0 ? {} : { initialViewIndex: e },
					shown(e) {
						a.value = !0, s?.call(this, e);
					},
					hidden(e) {
						a.value = !1, r.value = void 0, c?.call(this, e);
					}
				}
			});
		} catch (e) {
			throw a.value = !1, e;
		}
		let u = l.destroy.bind(l);
		return l.destroy = () => {
			try {
				return u();
			} finally {
				r.value === l && (r.value = void 0, a.value = !1);
			}
		}, r.value = l, l;
	}
	function d() {
		var e;
		(e = r.value) == null || e.hide();
	}
	let f = () => {
		o = !0, l();
	};
	return (n = e.getCurrentScope) != null && n.call(e) ? e.onScopeDispose(f) : i(f), {
		viewer: r,
		isShown: a,
		show: u,
		hide: d,
		destroy: l
	};
}
//#endregion
var se = y.default;
export { ae as Viewer, se as ViewerJs, F as useViewer, oe as vViewer };

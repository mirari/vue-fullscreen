import e from "vue";
//#region \0rolldown/runtime.js
var t = Object.create, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, a = Object.getPrototypeOf, o = Object.prototype.hasOwnProperty, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), c = (e, t, a, s) => {
	if (t && typeof t == "object" || typeof t == "function") for (var c = i(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !o.call(e, d) && d !== a && n(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(s = r(t, d)) || s.enumerable
	});
	return e;
}, l = /* @__PURE__ */ ((e, r, i) => (i = e == null ? {} : t(a(e)), c(r || !e || !e.__esModule || !o.call(e, "default") ? n(i, "default", {
	value: e,
	enumerable: !0
}) : i, e)))((/* @__PURE__ */ s(((e, t) => {
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
		}, u = "<div class=\"viewer-container\" tabindex=\"-1\" touch-action=\"none\"><div class=\"viewer-canvas\"></div><div class=\"viewer-footer\"><div class=\"viewer-title\"></div><div class=\"viewer-toolbar\"></div><div class=\"viewer-navbar\"><ul class=\"viewer-list\" role=\"navigation\"></ul></div></div><div class=\"viewer-tooltip\" role=\"alert\" aria-hidden=\"true\"></div><div class=\"viewer-button\" data-viewer-action=\"mix\" role=\"button\"></div><div class=\"viewer-player\"></div></div>", d = typeof window < "u" && window.document !== void 0, f = d ? window : {}, p = d && f.document.documentElement ? "ontouchstart" in f.document.documentElement : !1, m = d ? "PointerEvent" in f : !1, h = "viewer", g = "move", _ = "switch", v = "zoom", y = `${h}-active`, b = `${h}-close`, x = `${h}-fade`, S = `${h}-fixed`, C = `${h}-fullscreen`, ee = `${h}-fullscreen-exit`, w = `${h}-hide`, te = `${h}-hide-md-down`, T = `${h}-hide-sm-down`, ne = `${h}-hide-xs-down`, E = `${h}-in`, D = `${h}-invisible`, O = `${h}-loading`, re = `${h}-move`, ie = `${h}-open`, k = `${h}-show`, A = `${h}-transition`, j = "click", ae = "dblclick", oe = "dragstart", se = "focusin", ce = "keydown", M = "load", N = "error", le = p ? "touchend touchcancel" : "mouseup", ue = p ? "touchmove" : "mousemove", de = m ? "pointerdown" : p ? "touchstart" : "mousedown", fe = m ? "pointermove" : ue, pe = m ? "pointerup pointercancel" : le, P = "resize", F = "transitionend", me = "wheel", he = "ready", ge = "show", _e = "shown", I = "hide", L = "hidden", ve = "view", R = "viewed", ye = "move", be = "moved", xe = "rotate", Se = "rotated", Ce = "scale", we = "scaled", Te = "zoom", Ee = "zoomed", De = "play", Oe = "stop", ke = `${h}Action`, Ae = /\s\s*/, je = [
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
		function Me(e) {
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
			return Me(e) ? e.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
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
			t.trim().split(Ae).forEach(function(t) {
				if (!Ve) {
					var a = e.listeners;
					a && a[t] && a[t][n] && (i = a[t][n], delete a[t][n], Object.keys(a[t]).length === 0 && delete a[t], Object.keys(a).length === 0 && delete e.listeners);
				}
				e.removeEventListener(t, i, r);
			});
		}
		function Q(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = n;
			t.trim().split(Ae).forEach(function(t) {
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
			return Me(e) ? decodeURIComponent(e.replace(/^.*\//, "").replace(/[?&#].*$/, "")) : "";
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
				case 2: return ne;
				case 3: return T;
				case 4: return te;
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
					Be(r, "filled", !0), n.loading && J(t, O), Q(r, M, i = function(i) {
						Z(r, N, a), n.loading && Y(t, O), e.loadImage(i);
					}, { once: !0 }), Q(r, N, a = function() {
						Z(r, M, i), n.loading && Y(t, O);
					}, { once: !0 });
				}), n.transition && Q(t, R, function() {
					J(r, A);
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
				e.innerHTML = "", Y(e, A), K(e, Ue({ translateX: 0 }));
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
					if ((this.viewing || this.moving || this.rotating || this.scaling || this.zooming) && this.options.transition && q(n, A)) {
						var i = function() {
							t.imageRendering = !1, e();
						};
						this.imageRendering = { abort: function() {
							Z(n, F, i);
						} }, Q(n, F, i, { once: !0 });
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
				Q(t, j, this.onClick = this.click.bind(this)), Q(t, oe, this.onDragStart = this.dragstart.bind(this)), Q(n, de, this.onPointerDown = this.pointerdown.bind(this)), Q(r, fe, this.onPointerMove = this.pointermove.bind(this)), Q(r, pe, this.onPointerUp = this.pointerup.bind(this)), Q(r, ce, this.onKeyDown = this.keydown.bind(this)), Q(window, P, this.onResize = this.resize.bind(this)), e.zoomable && e.zoomOnWheel && Q(t, me, this.onWheel = this.wheel.bind(this), {
					passive: !1,
					capture: !0
				}), e.toggleOnDblclick && Q(n, ae, this.onDblclick = this.dblclick.bind(this));
			},
			unbind: function() {
				var e = this.options, t = this.viewer, n = this.canvas, r = this.element.ownerDocument;
				Z(t, j, this.onClick), Z(t, oe, this.onDragStart), Z(n, de, this.onPointerDown), Z(r, fe, this.onPointerMove), Z(r, pe, this.onPointerUp), Z(r, ce, this.onKeyDown), Z(window, P, this.onResize), e.zoomable && e.zoomOnWheel && Z(t, me, this.onWheel, {
					passive: !1,
					capture: !0
				}), e.toggleOnDblclick && Z(n, ae, this.onDblclick);
			}
		}, $e = {
			click: function(e) {
				var t = this.options, n = this.imageData, r = e.target, i = X(r, ke);
				switch (!i && r.localName === "img" && r.parentElement.localName === "li" && (r = r.parentElement, i = X(r, ke)), p && e.isTrusted && r === this.canvas && clearTimeout(this.clickCanvasTimeout), i) {
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
				Y(r, D), n.loading && Y(this.canvas, O), r.style.cssText = `height:0;margin-left:${a.width / 2}px;margin-top:${a.height / 2}px;max-width:none!important;position:relative;width:0;`, this.initImage(function() {
					Le(r, re, n.movable), Le(r, A, n.transition), e.renderImage(function() {
						e.viewed = !0, e.viewing = !1, U(n.viewed) && Q(t, R, n.viewed, { once: !0 }), $(t, R, {
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
					t.zoomOnTouch && t.zoomable && Object.keys(n).length > 1 ? a = v : t.slideOnTouch && (e.pointerType === "touch" || e.type === "touchstart") && this.isSwitchable() && (a = _), t.transition && (a === g || a === v) && Y(this.image, A), this.action = a;
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
				}) : (a = i[e.pointerId || 0], delete i[e.pointerId || 0]), r && (e.preventDefault(), n.transition && (r === g || r === v) && J(this.image, A), this.action = !1, p && r !== v && a && Date.now() - a.timeStamp < 500 && (clearTimeout(this.clickCanvasTimeout), clearTimeout(this.doubleClickImageTimeout), n.toggleOnDblclick && this.viewed && e.target === this.image ? this.imageClicked ? (this.imageClicked = !1, this.doubleClickImageTimeout = setTimeout(function() {
					$(t.image, ae, { originalEvent: e });
				}, 50)) : (this.imageClicked = !0, this.doubleClickImageTimeout = setTimeout(function() {
					t.imageClicked = !1;
				}, 500)) : (this.imageClicked = !1, n.backdrop && n.backdrop !== "static" && e.target === this.canvas && (this.clickCanvasTimeout = setTimeout(function() {
					$(t.canvas, j, { originalEvent: e });
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
						Q(t, M, e.loadImage.bind(e), { once: !0 }), $(t, M);
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
				if (U(n.show) && Q(t, ge, n.show, { once: !0 }), $(t, ge) === !1 || !this.ready) return this;
				this.hiding && this.transitioning.abort(), this.showing = !0, this.open();
				var r = this.viewer;
				if (Y(r, w), r.setAttribute("role", "dialog"), r.setAttribute("aria-labelledby", this.title.id), r.setAttribute("aria-modal", !0), r.removeAttribute("aria-hidden"), n.transition && !e) {
					var i = this.shown.bind(this);
					this.transitioning = { abort: function() {
						Z(r, F, i), Y(r, E);
					} }, J(r, A), r.initialOffsetWidth = r.offsetWidth, Q(r, F, i, { once: !0 }), J(r, E);
				} else J(r, E), this.shown();
				return this;
			},
			hide: function() {
				var e = this, t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], n = this.element, r = this.options;
				if (r.inline || this.hiding || !(this.isShown || this.showing) || (U(r.hide) && Q(n, I, r.hide, { once: !0 }), $(n, I) === !1)) return this;
				this.showing && this.transitioning.abort(), this.hiding = !0, this.played ? this.stop() : this.viewing && this.viewing.abort();
				var i = this.viewer, a = this.image, o = function() {
					Y(i, E), e.hidden();
				};
				if (r.transition && !t) {
					var s = function(t) {
						t && t.target === i && (Z(i, F, s), e.hidden());
					}, c = function() {
						q(i, A) ? (Q(i, F, s), Y(i, E)) : o();
					};
					this.transitioning = { abort: function() {
						e.viewed && q(a, A) ? Z(a, F, c) : q(i, A) && Z(i, F, s);
					} }, this.viewed && q(a, A) ? (Q(a, F, c, { once: !0 }), this.zoomTo(0, !1, null, null, !0)) : c();
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
				}), u.src = c, u.alt = l, U(r.view) && Q(n, ve, r.view, { once: !0 }), $(n, ve, {
					originalImage: this.images[t],
					index: t,
					image: u
				}) === !1 || !this.isShown || this.hiding || this.played) return this;
				var d = this.items[this.index];
				d && (Y(d, y), d.removeAttribute("aria-selected")), J(o, y), o.setAttribute("aria-selected", !0), r.focus && o.focus(), this.image = u, this.viewed = !1, this.index = t, this.imageData = {}, J(u, D), r.loading && J(a, O), a.innerHTML = "", a.appendChild(u), this.renderList(), i.innerHTML = "";
				var f = function() {
					var t = e.imageData, n = Array.isArray(r.title) ? r.title[1] : r.title;
					i.innerHTML = Ie(U(n) ? n.call(e, u, t) : `${l} (${t.naturalWidth} × ${t.naturalHeight})`);
				}, p, m;
				return Q(n, R, f, { once: !0 }), this.viewing = { abort: function() {
					Z(n, R, f), u.complete ? e.imageRendering ? e.imageRendering.abort() : e.imageInitializing && e.imageInitializing.abort() : (u.src = "", Z(u, M, p), e.timeout && clearTimeout(e.timeout));
				} }, u.complete ? this.load() : (Q(u, M, p = function() {
					Z(u, N, m), e.load();
				}, { once: !0 }), Q(u, N, m = function() {
					Z(u, M, p), e.timeout &&= (clearTimeout(e.timeout), !1), Y(u, D), r.loading && Y(e.canvas, O);
				}, { once: !0 }), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function() {
					Y(u, D), e.timeout = !1;
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
						if (U(a.move) && Q(i, ye, a.move, { once: !0 }), $(i, ye, {
							x: e,
							y: n,
							oldX: s,
							oldY: c,
							originalEvent: r
						}) === !1) return this;
						o.x = e, o.y = n, o.left = e, o.top = n, this.moving = !0, this.renderImage(function() {
							t.moving = !1, U(a.moved) && Q(i, be, a.moved, { once: !0 }), $(i, be, {
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
					if (U(r.rotate) && Q(n, xe, r.rotate, { once: !0 }), $(n, xe, {
						degree: e,
						oldDegree: a
					}) === !1) return this;
					i.rotate = e, this.rotating = !0, this.renderImage(function() {
						t.rotating = !1, U(r.rotated) && Q(n, Se, r.rotated, { once: !0 }), $(n, Se, {
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
						if (U(i.scale) && Q(r, Ce, i.scale, { once: !0 }), $(r, Ce, {
							scaleX: e,
							scaleY: n,
							oldScaleX: o,
							oldScaleY: s
						}) === !1) return this;
						a.scaleX = e, a.scaleY = n, this.scaling = !0, this.renderImage(function() {
							t.scaling = !1, U(i.scaled) && Q(r, we, i.scaled, { once: !0 }), $(r, we, {
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
					if (U(s.zoom) && Q(o, Te, s.zoom, { once: !0 }), $(o, Te, {
						ratio: e,
						oldRatio: S,
						originalEvent: i
					}) === !1) return this;
					if (this.zooming = !0, i) {
						var C = He(this.viewer), ee = c && Object.keys(c).length > 0 ? Xe(c) : {
							pageX: i.pageX,
							pageY: i.pageY
						};
						l.x -= b * ((ee.pageX - C.left - u) / f), l.y -= x * ((ee.pageY - C.top - d) / p);
					} else H(r) && z(r.x) && z(r.y) ? (l.x -= b * ((r.x - u) / f), l.y -= x * ((r.y - d) / p)) : (l.x -= b / 2, l.y -= x / 2);
					l.left = l.x, l.top = l.y, l.width = v, l.height = y, l.oldRatio = S, l.ratio = e, this.renderImage(function() {
						t.zooming = !1, U(s.zoomed) && Q(o, Ee, s.zoomed, { once: !0 }), $(o, Ee, {
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
				if (U(r.play) && Q(n, De, r.play, { once: !0 }), $(n, De) === !1) return this;
				var i = this.player, a = this.loadImage.bind(this), o = [], s = 0, c = 0;
				if (this.played = !0, this.onLoadWhenPlay = a, t && this.requestFullscreen(t), J(i, k), W(this.items, function(e, t) {
					var n = e.querySelector("img"), l = document.createElement("img");
					l.src = X(n, "originalUrl"), l.alt = n.getAttribute("alt"), l.referrerPolicy = n.referrerPolicy, s += 1, J(l, x), Le(l, A, r.transition), q(e, y) && (J(l, E), c = t), o.push(l), Q(l, M, a, { once: !0 }), i.appendChild(l);
				}), z(r.interval) && r.interval > 0) {
					var l = function() {
						clearTimeout(e.playing.timeout), Y(o[c], E), --c, c = c >= 0 ? c : s - 1, J(o[c], E), e.playing.timeout = setTimeout(l, r.interval);
					}, u = function() {
						clearTimeout(e.playing.timeout), Y(o[c], E), c += 1, c = c < s ? c : 0, J(o[c], E), e.playing.timeout = setTimeout(u, r.interval);
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
				if (U(n.stop) && Q(t, Oe, n.stop, { once: !0 }), $(t, Oe) === !1) return this;
				var r = this.player;
				return clearTimeout(this.playing.timeout), this.playing = !1, this.played = !1, W(r.getElementsByTagName("img"), function(t) {
					Z(t, M, e.onLoadWhenPlay);
				}), Y(r, k), r.innerHTML = "", this.exitFullscreen(), this;
			},
			full: function() {
				var e = this, t = this.options, n = this.viewer, r = this.image, i = this.list;
				return !this.isShown || this.played || this.fulled || !t.inline || (this.fulled = !0, this.open(), J(this.button, ee), t.transition && (Y(i, A), this.viewed && Y(r, A)), J(n, S), n.setAttribute("role", "dialog"), n.setAttribute("aria-labelledby", this.title.id), n.setAttribute("aria-modal", !0), n.removeAttribute("style"), K(n, { zIndex: t.zIndex }), t.focus && this.enforceFocus(), this.initContainer(), this.viewerData = G({}, this.containerData), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage(function() {
						t.transition && setTimeout(function() {
							J(r, A), J(i, A);
						}, 0);
					});
				})), this;
			},
			exit: function() {
				var e = this, t = this.options, n = this.viewer, r = this.image, i = this.list;
				return !this.isShown || this.played || !this.fulled || !t.inline || (this.fulled = !1, this.close(), Y(this.button, ee), t.transition && (Y(i, A), this.viewed && Y(r, A)), t.focus && this.clearEnforceFocus(), n.removeAttribute("role"), n.removeAttribute("aria-labelledby"), n.removeAttribute("aria-modal"), Y(n, S), K(n, { zIndex: t.zIndexInline }), this.viewerData = G({}, this.parentData), this.renderViewer(), this.renderList(), this.viewed && this.initImage(function() {
					e.renderImage(function() {
						t.transition && setTimeout(function() {
							J(r, A), J(i, A);
						}, 0);
					});
				})), this;
			},
			tooltip: function() {
				var e = this, t = this.options, n = this.tooltipBox, r = this.imageData;
				return !this.viewed || this.played || !t.tooltip || (n.textContent = `${Math.round(r.ratio * 100)}%`, this.tooltipping ? clearTimeout(this.tooltipping) : t.transition ? (this.fading && $(n, F), J(n, k), J(n, x), J(n, A), n.removeAttribute("aria-hidden"), n.initialOffsetWidth = n.offsetWidth, J(n, E)) : (J(n, k), n.removeAttribute("aria-hidden")), this.tooltipping = setTimeout(function() {
					t.transition ? (Q(n, F, function() {
						Y(n, k), Y(n, x), Y(n, A), n.setAttribute("aria-hidden", !0), e.fading = !1;
					}, { once: !0 }), Y(n, E), e.fading = !0) : (Y(n, k), n.setAttribute("aria-hidden", !0)), e.tooltipping = !1;
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
				return e[h] && (this.destroyed = !0, this.ready ? (this.played && this.stop(), t.inline ? (this.fulled && this.exit(), this.unbind()) : this.isShown ? (this.viewing && (this.imageRendering ? this.imageRendering.abort() : this.imageInitializing && this.imageInitializing.abort()), this.hiding && this.transitioning.abort(), this.hidden()) : this.showing && (this.transitioning.abort(), this.hidden()), this.ready = !1, this.viewer.parentNode.removeChild(this.viewer)) : t.inline && (this.delaying ? this.delaying.abort() : this.initializing && this.initializing.abort()), t.inline || Z(e, j, this.onStart), e[h] = void 0), this;
			}
		}, tt = {
			getImageURL: function(e) {
				var t = this.options.url;
				return t = Me(t) ? e.getAttribute(t) : U(t) ? t.call(this, e) : "", t;
			},
			enforceFocus: function() {
				var e = this;
				this.clearEnforceFocus(), Q(document, se, this.onFocusin = function(t) {
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
				this.onFocusin &&= (Z(document, se, this.onFocusin), null);
			},
			open: function() {
				var e = this.body;
				J(e, ie), this.scrollbarWidth > 0 && (e.style.paddingRight = `${this.scrollbarWidth + (parseFloat(this.initialBodyComputedPaddingRight) || 0)}px`);
			},
			close: function() {
				var e = this.body;
				Y(e, ie), this.scrollbarWidth > 0 && (e.style.paddingRight = this.initialBodyPaddingRight);
			},
			shown: function() {
				var e = this.element, t = this.options, n = this.viewer;
				this.fulled = !0, this.isShown = !0, this.render(), this.bind(), this.showing = !1, t.focus && (n.focus(), this.enforceFocus()), U(t.shown) && Q(e, _e, t.shown, { once: !0 }), $(e, _e) !== !1 && this.ready && this.isShown && !this.hiding && this.view(this.index);
			},
			hidden: function() {
				var e = this.element, t = this.options, n = this.viewer;
				t.fucus && this.clearEnforceFocus(), this.close(), this.unbind(), J(n, w), n.removeAttribute("role"), n.removeAttribute("aria-labelledby"), n.removeAttribute("aria-modal"), n.setAttribute("aria-hidden", !0), this.resetList(), this.resetImage(), this.fulled = !1, this.viewed = !1, this.isShown = !1, this.hiding = !1, this.destroyed || (U(t.hidden) && Q(e, L, t.hidden, { once: !0 }), $(e, L, null, { cancelable: !1 }));
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
									e.complete || (Z(e, M, o), Z(e, N, o));
								});
							} }, W(i, function(e) {
								if (e.complete) o();
								else {
									var t, n;
									Q(e, M, t = function() {
										Z(e, N, n), o();
									}, { once: !0 }), Q(e, N, n = function() {
										Z(e, M, t), o();
									}, { once: !0 });
								}
							});
						} else Q(t, j, this.onStart = function(t) {
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
						if (this.parent = n, this.viewer = i, this.title = a, this.toolbar = o, this.navbar = s, this.button = c, this.canvas = l, this.footer = i.querySelector(`.${h}-footer`), this.tooltipBox = i.querySelector(`.${h}-tooltip`), this.player = i.querySelector(`.${h}-player`), this.list = i.querySelector(`.${h}-list`), i.id = `${h}${this.id}`, a.id = `${h}Title${this.id}`, J(a, t.title ? qe(Array.isArray(t.title) ? t.title[0] : t.title) : w), J(s, t.navbar ? qe(t.navbar) : w), Le(c, w, !t.button), t.keyboard && c.setAttribute("tabindex", 0), t.backdrop && (J(i, `${h}-backdrop`), !t.inline && t.backdrop !== "static" && Be(l, ke, "hide")), Me(t.className) && t.className && t.className.split(Ae).forEach(function(e) {
							J(i, e);
						}), t.toolbar) {
							var d = document.createElement("ul"), f = H(t.toolbar), p = je.slice(0, 3), m = je.slice(7, 9), g = je.slice(9);
							f || J(o, qe(t.toolbar)), W(f ? t.toolbar : je, function(e, n) {
								var r = f && H(e), i = f ? ze(n) : e, a = r && !B(e.show) ? e.show : e;
								if (!(!a || !t.zoomable && p.indexOf(i) !== -1 || !t.rotatable && m.indexOf(i) !== -1 || !t.scalable && g.indexOf(i) !== -1)) {
									var o = r && !B(e.size) ? e.size : e, s = r && !B(e.click) ? e.click : e, c = document.createElement("li");
									t.keyboard && c.setAttribute("tabindex", 0), c.setAttribute("role", "button"), J(c, `${h}-${i}`), U(s) || Be(c, ke, i), z(a) && J(c, qe(a)), ["small", "large"].indexOf(o) === -1 ? i === "play" && J(c, `${h}-large`) : J(c, `${h}-${o}`), U(s) && Q(c, j, s), d.appendChild(c);
								}
							}), o.appendChild(d);
						} else J(o, w);
						if (!t.rotatable) {
							var _ = o.querySelectorAll("li[class*=\"rotate\"]");
							J(_, D), W(_, function(e) {
								o.appendChild(e);
							});
						}
						if (t.inline) J(c, C), K(i, { zIndex: t.zIndexInline }), window.getComputedStyle(n).position === "static" && K(n, { position: "relative" }), n.insertBefore(i, e.nextSibling);
						else {
							J(c, b), J(i, S), J(i, x), J(i, w), K(i, { zIndex: t.zIndex });
							var v = t.container;
							Me(v) && (v = e.ownerDocument.querySelector(v)), v ||= this.body, v.appendChild(i);
						}
						t.inline && (this.render(), this.bind(), this.isShown = !0), this.ready = !0, U(t.ready) && Q(e, he, t.ready, { once: !0 }), $(e, he) === !1 ? this.ready = !1 : this.ready && t.inline && this.view(this.index);
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
})))(), 1), u = ["observe", "rebuild"], d = ["observe", "rebuild"];
function f(e, t) {
	if (e == null) return {};
	var n, r, i = p(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function p(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function m(e) {
	return _(e) || g(e) || ne(e) || h();
}
function h() {
	throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function g(e) {
	if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function _(e) {
	if (Array.isArray(e)) return E(e);
}
function v(e, t) {
	return x(e) || b(e, t) || ne(e, t) || y();
}
function y() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function b(e, t) {
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
function x(e) {
	if (Array.isArray(e)) return e;
}
function S(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function C(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? S(Object(n), !0).forEach(function(t) {
			ee(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : S(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ee(e, t, n) {
	return (t = w(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function w(e) {
	var t = te(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function te(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function T(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = ne(e)) || t && e && typeof e.length == "number") {
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
function ne(e, t) {
	if (e) {
		if (typeof e == "string") return E(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? E(e, t) : void 0;
	}
}
function E(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var D = 0;
function O() {
	var e, t = "", n = [], r = [];
	function i() {
		var i = T(r.splice(0)), a;
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
				key: ++D,
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
function re(e) {
	var t = e;
	return {
		image: t != null && t.viewed ? t.image : void 0,
		index: t?.index ?? 0
	};
}
var ie = [
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
], k = {
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
function A(e) {
	for (var t = C({}, e.options), n = 0, r = Object.keys(k); n < r.length; n++) {
		var i = r[n];
		e[i] !== void 0 && (t[i] = e[i]);
	}
	return t;
}
function j(e, t) {
	var n = ie.map(function(n) {
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
var ae = [
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
function oe(e) {
	return C(C({}, Object.fromEntries(ae.map(function(t) {
		return [t, function() {
			var n, r = e(), i = [...arguments];
			return r == null || (n = r[t]) == null ? void 0 : n.apply(r, i);
		}];
	}))), {}, { showTooltip: function() {
		return e()?.tooltip();
	} });
}
function se(e) {
	var t = (e.tagName === "IMG" ? [e] : Array.from(e.querySelectorAll("img"))).filter(function(e) {
		return !e.closest(".viewer-container");
	});
	return {
		sources: t,
		attributes: JSON.stringify(t.map(function(e) {
			return Array.from(e.attributes).map(function(e) {
				return [e.name, e.value];
			}).sort(function(e, t) {
				var n = v(e, 1)[0], r = v(t, 1)[0];
				return n.localeCompare(r);
			});
		}))
	};
}
function ce(e) {
	if (e.nodeType !== 1) return !1;
	var t = e;
	return t.closest(".viewer-container") ? !1 : t.tagName === "IMG" || Array.from(t.querySelectorAll("img")).some(function(e) {
		return !e.closest(".viewer-container");
	});
}
function M(e) {
	return e.type === "attributes" ? e.target.tagName === "IMG" && !e.target.closest(".viewer-container") : [].concat(m(Array.from(e.addedNodes)), m(Array.from(e.removedNodes))).some(ce);
}
function N(e) {
	var t = C({}, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}), n, r, i = se(e), a, o = 0, s = !1, c = t.onEvent ? j(e, function(e, n) {
		return t.onEvent?.call(t, e, n);
	}) : void 0;
	function u() {
		var r;
		(r = t.onDestroy) == null || r.call(t);
		var i = n;
		n = void 0, e.$viewer === i && delete e.$viewer, i?.destroy();
	}
	function d() {
		var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(e) {
			return (e = t.rebuild) != null && e;
		}(), o;
		if (!s) {
			f(), r?.disconnect();
			try {
				if (a && u(), n) n.update();
				else {
					n = new l.default(e, C({}, t.options));
					var c = n, d = c.build;
					c.build = function() {
						if (!this.destroyed) return d.call(this);
					};
				}
				e.$viewer = n, i = se(e);
			} finally {
				g();
			}
			return (o = t.onInit) == null || o.call(t, n), n;
		}
	}
	function f() {
		a !== void 0 && clearTimeout(a), a = void 0;
	}
	function p() {
		return typeof t.observe == "number" && Number.isFinite(t.observe) && t.observe >= 0 ? Math.min(t.observe, 2147483647) : 50;
	}
	function m() {
		s || t.observe === !1 || a !== void 0 || (o = Date.now(), h());
	}
	function h() {
		a = setTimeout(function() {
			if (a = void 0, !(s || t.observe === !1)) {
				var n = se(e);
				(n.attributes !== i.attributes || n.sources.length !== i.sources.length || n.sources.some(function(e, t) {
					return e !== i.sources[t];
				})) && d();
			}
		}, Math.max(0, p() - (Date.now() - o)));
	}
	function g() {
		r?.disconnect(), !(s || t.observe === !1 || typeof MutationObserver > "u") && (r ??= new MutationObserver(function(e) {
			e.some(M) && m();
		}), r.observe(e, {
			attributes: !0,
			childList: !0,
			subtree: !0
		}));
	}
	function _(e) {
		var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
		if (!s) {
			if (t = C(C({}, t), e), !("options" in e) && !("rebuild" in e) && "observe" in e) {
				var i = a !== void 0;
				return f(), g(), t.observe !== !1 && (i ? h() : m()), n;
			}
			return d(r);
		}
	}
	function v() {
		s = !0, f(), r?.disconnect();
		try {
			u();
		} finally {
			c?.();
		}
	}
	try {
		d();
	} catch (e) {
		throw v(), e;
	}
	return {
		get viewer() {
			return n;
		},
		refresh: d,
		configure: _,
		dispose: v
	};
}
function le(e) {
	var t = e.images, n = e.options, r = n === void 0 ? {} : n;
	if (typeof document > "u") throw Error("v-viewer: showViewer must be called in a browser");
	var i = document.createElement("div");
	i.hidden = !0, i.className = "v-viewer-token";
	var a = T(t), o;
	try {
		for (a.s(); !(o = a.n()).done;) {
			for (var s = o.value, c = document.createElement("img"), u = typeof s == "string" ? { src: s } : s, d = 0, f = Object.entries(u); d < f.length; d++) {
				var p = v(f[d], 2), m = p[0], h = p[1];
				/^on/i.test(m) || c.setAttribute(m, h);
			}
			i.appendChild(c);
		}
	} catch (e) {
		a.e(e);
	} finally {
		a.f();
	}
	document.body.appendChild(i);
	var g;
	try {
		g = new l.default(i, C(C({}, ue(r)), {}, { inline: !1 }));
	} catch (e) {
		throw i.remove(), e;
	}
	var _ = g.destroy.bind(g), y = !1, b = function(e) {
		e.target === i && g.destroy();
	};
	g.destroy = function() {
		if (y) return g;
		y = !0, i.removeEventListener("hidden", b);
		try {
			_();
		} finally {
			i.remove();
		}
		return g;
	}, i.addEventListener("hidden", b);
	try {
		g.show();
	} catch (e) {
		throw g.destroy(), e;
	}
	return g;
}
function ue(e) {
	return Array.isArray(e) ? e.map(ue) : e && Object.prototype.toString.call(e) === "[object Object]" ? Object.fromEntries(Object.entries(e).map(function(e) {
		var t = v(e, 2), n = t[0], r = t[1];
		return [n, ue(r)];
	})) : e;
}
function de(e, t) {
	if (e === t) return !0;
	if (!e || !t || typeof e != "object" || typeof t != "object") return !1;
	var n = function(e) {
		return Array.isArray(e) || Object.prototype.toString.call(e) === "[object Object]";
	};
	if (!n(e) || !n(t)) return !1;
	var r = Object.keys(e);
	return r.length === Object.keys(t).length && r.every(function(n) {
		return Object.prototype.hasOwnProperty.call(t, n) && de(e[n], t[n]);
	});
}
function fe() {
	var e = /* @__PURE__ */ new WeakMap();
	return {
		mount: function(t, n) {
			var r;
			(r = e.get(t)) == null || r.controller.dispose();
			var i = n.value ?? {}, a = i.observe, o = i.rebuild, s = f(i, u), c = o ?? !!n.modifiers.rebuild;
			e.set(t, {
				options: ue(s),
				observe: a,
				rebuild: c,
				controller: N(t, {
					options: s,
					rebuild: c,
					observe: a
				})
			});
		},
		update: function(t, n) {
			var r = e.get(t);
			if (r) {
				var i = n.value ?? {}, a = i.observe, o = i.rebuild, s = f(i, d), c = o ?? !!n.modifiers.rebuild, l = !de(r.options, s);
				l || c !== r.rebuild ? r.controller.configure({
					options: s,
					rebuild: c,
					observe: a
				}, l || c) : a !== r.observe && r.controller.configure({ observe: a }), r.options = ue(s), r.observe = a, r.rebuild = c;
			}
		},
		unmount: function(t) {
			var n;
			(n = e.get(t)) == null || n.controller.dispose(), e.delete(t);
		}
	};
}
var pe = le, P = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap();
function me(e) {
	e.$viewer = void 0;
	var t = F.get(e);
	if (t) {
		var n = T(t.portals.values()), r;
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
function he(t) {
	var n = F.get(t);
	if (n) {
		var r = n.bridge.sync(t.$viewer, function(e) {
			if (e === "toolbar") {
				var n, r = t, i = (n = t.$scopedSlots).toolbar?.call(n, C(C({}, oe(function() {
					return t.$viewer;
				})), {}, {
					update: function() {
						return r.update();
					},
					destroy: function() {
						return r.destroy();
					}
				}, re(t.$viewer))) || t.$slots.toolbar;
				return !!(i != null && i.some(function(e) {
					var t;
					return !e.isComment && (!!e.tag || !!((t = e.text) != null && t.trim()));
				}));
			}
			return !!t.$scopedSlots[e] || !!t.$slots[e];
		}), i = T(n.portals), a;
		try {
			for (i.s(); !(a = i.n()).done;) {
				var o = v(a.value, 2), s = o[0], c = o[1];
				r.indexOf(s) === -1 && (c.$destroy(), c.$el.remove(), n.portals.delete(s));
			}
		} catch (e) {
			i.e(e);
		} finally {
			i.f();
		}
		var l = T(r), u;
		try {
			var d = function() {
				var r = u.value, i = n.portals.get(r);
				if (i) return i.$forceUpdate(), 1;
				var a = oe(function() {
					return t.$viewer;
				}), o = new e({
					parent: t,
					render: function(e) {
						var n, i = t, o = C(C({}, a), {}, {
							update: function() {
								return i.update();
							},
							destroy: function() {
								return i.destroy();
							}
						}, re(t.$viewer));
						return e("span", { style: { display: "contents" } }, (n = t.$scopedSlots)[r.slot]?.call(n, o) || t.$slots[r.slot]);
					}
				}).$mount();
				r.target.appendChild(o.$el), n.portals.set(r, o);
			};
			for (l.s(); !(u = l.n()).done;) if (d()) continue;
		} catch (e) {
			l.e(e);
		} finally {
			l.f();
		}
	}
}
var ge = Object.fromEntries(ae.map(function(e) {
	return [e, function() {
		var t, n = this.$viewer, r = [...arguments];
		return n == null || (t = n[e]) == null ? void 0 : t.apply(n, r);
	}];
})), _e = e.extend({
	name: "Viewer",
	props: C(C({}, k), {}, {
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
		return A(this.$props);
	} },
	mounted: function() {
		this.createViewer();
	},
	updated: function() {
		he(this);
	},
	beforeDestroy: function() {
		this._viewerDisposed = !0, this.destroyViewer(), F.delete(this);
	},
	watch: {
		observe: function(e) {
			var t;
			(t = P.get(this)) == null || t.configure({ observe: e });
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
	methods: C(C({}, ge), {}, {
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
			P.has(this) || this.$isServer || this._viewerDisposed || P.set(this, N(this.$el, {
				options: this.viewerOptions,
				rebuild: this.rebuild,
				observe: this.observe,
				onEvent: function(t, n) {
					he(e), e.$emit(t, n);
				},
				onDestroy: function() {
					return me(e);
				},
				onInit: function(t) {
					e.$viewer = t, he(e);
				}
			}));
		},
		destroyViewer: function() {
			var e;
			(e = P.get(this)) == null || e.dispose(), P.delete(this), this.$viewer = void 0;
		},
		updateViewer: function() {
			P.has(this) ? P.get(this).refresh(!1) : this.createViewer();
		},
		rebuildViewer: function() {
			P.has(this) ? P.get(this).configure({
				options: this.viewerOptions,
				rebuild: this.rebuild
			}) : this.createViewer();
		},
		changeViewer: function() {
			var e;
			(e = P.get(this)) == null || e.configure({ rebuild: this.rebuild }, this.rebuild);
		}
	}),
	beforeCreate: function() {
		F.set(this, {
			bridge: O(),
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
}), I = fe(), L = /* @__PURE__ */ new WeakMap(), ve = function(e, t, n) {
	var r;
	if ((r = L.get(e)) == null || r(), n.context) {
		var i = n.context.$watch(function() {
			return t.value;
		}, function() {
			return I.update(e, t);
		}, { deep: !0 });
		L.set(e, i);
	}
}, R = {
	inserted: function(e, t, n, r) {
		I.mount(e, t), ve(e, t, n, r);
	},
	componentUpdated: function(e, t, n, r) {
		I.update(e, t), ve(e, t, n, r);
	},
	unbind: function(e) {
		var t;
		(t = L.get(e)) == null || t(), L.delete(e), I.unmount(e);
	}
}, ye = {
	install: function(e) {
		var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.name, r = n === void 0 ? "viewer" : n, i = t.defaultOptions;
		i && l.default.setDefaults(i), e.component(r, _e), e.directive(r, R), e.prototype[`\$${r}Api`] = pe;
	},
	setDefaults: function(e) {
		return l.default.setDefaults(e);
	}
}, be = l.default;
export { _e as Viewer, be as ViewerJs, ye as default, R as vViewer, pe as viewerApi };

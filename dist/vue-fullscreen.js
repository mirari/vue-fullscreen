(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueFullscreen"] = factory();
	else
		root["VueFullscreen"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = typeof module !== 'undefined' && module.exports;

	var fn = function () {
		var val;

		var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	}();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function request(element, options) {
			return new Promise(function (resolve, reject) {
				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				element = element || document.documentElement;

				var returnPromise = element[fn.requestFullscreen](options);

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenEntered).catch(reject);
				}
			}.bind(this));
		},
		exit: function exit() {
			return new Promise(function (resolve, reject) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenExit);

				var returnPromise = document[fn.exitFullscreen]();

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenExit).catch(reject);
				}
			}.bind(this));
		},
		toggle: function toggle(element, options) {
			return this.isFullscreen ? this.exit() : this.request(element, options);
		},
		onchange: function onchange(callback) {
			this.on('change', callback);
		},
		onerror: function onerror(callback) {
			this.on('error', callback);
		},
		on: function on(event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function off(event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = { isEnabled: false };
		} else {
			window.screenfull = { isEnabled: false };
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function get() {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function get() {
				return document[fn.fullscreenElement];
			}
		},
		isEnabled: {
			enumerable: true,
			get: function get() {
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;

function extend() {
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0];
    i++;
  }

  function merge(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  }

  for (; i < length; i++) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_screenfull__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_screenfull___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_screenfull__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);



var defaults = {
  callback: function callback() {},
  fullscreenClass: 'fullscreen',
  pageOnly: false,
  teleport: false
};

var token = void 0;
var parentNode = void 0;

function setStyle(element, style) {
  element.style.position = style.position;
  element.style.left = style.left;
  element.style.top = style.top;
  element.style.width = style.width;
  element.style.height = style.height;
}

function resetElement(api) {
  var target = api.element;
  if (target) {
    target.classList.remove(api.options.fullscreenClass);

    if (api.options.teleport || api.options.pageOnly) {
      if (api.options.teleport && parentNode) {
        parentNode.insertBefore(target, token);
        parentNode.removeChild(token);
      }

      if (target.__styleCache) {
        setStyle(target, target.__styleCache);
      }
    }
  }
}

var api = {
  options: null,
  element: null,
  isFullscreen: false,
  isEnabled: __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isEnabled,
  toggle: function toggle(target, options, force) {
    if (force === undefined) {
      return !this.isFullscreen ? this.request(target, options) : this.exit();
    } else {
      return force ? this.request(target, options) : this.exit();
    }
  },
  request: function request(target, options) {
    var _this = this;

    if (this.isFullscreen) {
      return Promise.resolve();
    }

    if (!target) {
      target = document.body;
    }
    this.options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* extend */])({}, defaults, options);

    if (target === document.body) {
      this.options.teleport = false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isEnabled) {
      this.options.pageOnly = true;
    }

    target.classList.add(this.options.fullscreenClass);

    if (this.options.teleport || this.options.pageOnly) {
      var _target$style = target.style,
          position = _target$style.position,
          left = _target$style.left,
          top = _target$style.top,
          width = _target$style.width,
          height = _target$style.height;

      target.__styleCache = { position: position, left: left, top: top, width: width, height: height };
      setStyle(target, {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%'
      });
    }

    if (this.options.teleport) {
      parentNode = target.parentNode;
      if (parentNode) {
        token = document.createComment('fullscreen-token');
        parentNode.insertBefore(token, target);
        document.body.appendChild(target);
      }
    }
    if (this.options.pageOnly) {
      var keypressCallback = function keypressCallback(e) {
        if (e.key === 'Escape') {
          document.removeEventListener('keyup', keypressCallback);
          _this.exit();
        }
      };
      this.isFullscreen = true;
      this.element = target;
      document.removeEventListener('keyup', keypressCallback);
      document.addEventListener('keyup', keypressCallback);
      if (this.options.callback) {
        this.options.callback(this.isFullscreen);
      }
      return Promise.resolve();
    } else {
      var fullScreenCallback = function fullScreenCallback() {
        if (!__WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isFullscreen) {
          __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.off('change', fullScreenCallback);
          resetElement(_this);
        }
        _this.isFullscreen = __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isFullscreen;
        if (!_this.options.teleport) {
          _this.element = __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.element;
        } else {
          _this.element = target || null;
        }
        if (_this.options.callback) {
          _this.options.callback(__WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isFullscreen);
        }
      };
      __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.on('change', fullScreenCallback);

      return __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.request(this.options.teleport ? document.body : target);
    }
  },
  exit: function exit() {
    if (!this.isFullscreen) {
      return Promise.resolve();
    }
    if (this.options.pageOnly) {
      resetElement(this);
      this.isFullscreen = false;
      this.element = null;
      if (this.options.callback) {
        this.options.callback(this.isFullscreen);
      }
      return Promise.resolve();
    } else {
      return __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.exit();
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (api);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(7),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\Workspaces\\Git\\vue-fullscreen\\src\\component.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] component.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c545db3", Component.options)
  } else {
    hotAPI.reload("data-v-2c545db3", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__component_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_screenfull__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_screenfull___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_screenfull__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(1);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "screenfull", function() { return __WEBPACK_IMPORTED_MODULE_2_screenfull___default.a; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return __WEBPACK_IMPORTED_MODULE_1__api__["a"]; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "component", function() { return __WEBPACK_IMPORTED_MODULE_0__component_vue___default.a; });







/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var name = opts.name || 'fullscreen';
    Vue.component(name, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* extend */])(__WEBPACK_IMPORTED_MODULE_0__component_vue___default.a, { name: name }));
    Vue.prototype['$' + name] = __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */];
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_screenfull__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_screenfull___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_screenfull__);



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    fullscreen: {
      type: Boolean,
      default: false
    },
    exitOnClickWrapper: {
      type: Boolean,
      default: true
    },
    fullscreenClass: {
      type: String,
      default: 'fullscreen'
    },
    pageOnly: {
      type: Boolean,
      default: false
    },
    teleport: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      isFullscreen: false,
      isEnabled: false
    };
  },


  computed: {
    isPageOnly: function isPageOnly() {
      return this.pageOnly || !__WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isEnabled;
    },
    wrapperStyle: function wrapperStyle() {
      return (this.pageOnly || this.teleport) && this.isFullscreen ? {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%'
      } : undefined;
    }
  },

  methods: {
    toggle: function toggle(value) {
      if (value === undefined) {
        if (this.getState()) {
          this.exit();
        } else {
          this.request();
        }
      } else {
        value ? this.request() : this.exit();
      }
    },
    request: function request() {
      if (this.isPageOnly) {
        this.isFullscreen = true;
        this.onChangeFullScreen();
        document.removeEventListener('keyup', this.keypressCallback);
        document.addEventListener('keyup', this.keypressCallback);
      } else {
        __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.off('change', this.fullScreenCallback);
        __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.on('change', this.fullScreenCallback);
        __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.request(this.teleport ? document.body : this.$el);
      }
      if (this.teleport) {
        if (this.$el.parentNode === document.body) {
          return;
        }
        this.__parentNode = this.$el.parentNode;
        this.__token = document.createComment('fullscreen-token');
        this.__parentNode.insertBefore(this.__token, this.$el);
        document.body.appendChild(this.$el);
      }
    },
    exit: function exit() {
      if (!this.isFullscreen) {
        return;
      }
      if (this.isPageOnly) {
        this.isFullscreen = false;
        this.onChangeFullScreen();
        document.removeEventListener('keyup', this.keypressCallback);
      } else {
        __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.exit();
      }
    },
    shadeClick: function shadeClick(e) {
      if (e.target === this.$el) {
        if (this.exitOnClickWrapper) {
          this.exit();
        }
      }
    },
    fullScreenCallback: function fullScreenCallback() {
      if (!__WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isFullscreen) {
        __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.off('change', this.fullScreenCallback);
      }
      this.isFullscreen = __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isFullscreen;
      this.onChangeFullScreen();
    },
    keypressCallback: function keypressCallback(e) {
      if (e.key === 'Escape') {
        this.exit();
      }
    },
    onChangeFullScreen: function onChangeFullScreen() {
      if (!this.isFullscreen) {
        if (this.teleport && this.__parentNode) {
          this.__parentNode.insertBefore(this.$el, this.__token);
          this.__parentNode.removeChild(this.__token);
        }
      }
      this.$emit('change', this.isFullscreen);
      this.$emit('update:fullscreen', this.isFullscreen);
    }
  },

  watch: {
    fullscreen: function fullscreen(value) {
      if (value !== this.isFullscreen) {
        value ? this.request() : this.exit();
      }
    }
  },

  created: function created() {
    this.isEnabled = __WEBPACK_IMPORTED_MODULE_0_screenfull___default.a.isEnabled;
  }
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._b({
    ref: "wrapper",
    class: ( _obj = {}, _obj[_vm.fullscreenClass] = _vm.isFullscreen, _obj ),
    style: (_vm.wrapperStyle),
    on: {
      "click": function($event) {
        return _vm.shadeClick($event)
      },
      "keyup": _vm.exit
    }
  }, 'div', _vm.$attrs, false), [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c545db3", module.exports)
  }
}

/***/ })
/******/ ]);
});
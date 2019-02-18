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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = supportFullScreen;
/* harmony export (immutable) */ __webpack_exports__["c"] = fullScreenStatus;
/* harmony export (immutable) */ __webpack_exports__["g"] = requestFullscreen;
/* harmony export (immutable) */ __webpack_exports__["d"] = exitFullscreen;
/* harmony export (immutable) */ __webpack_exports__["f"] = onFullScreenEvent;
/* harmony export (immutable) */ __webpack_exports__["e"] = offFullScreenEvent;
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;
function supportFullScreen() {
  var doc = document.documentElement;

  return 'requestFullscreen' in doc || 'mozRequestFullScreen' in doc && document.mozFullScreenEnabled || 'msRequestFullscreen' in doc && document.msFullscreenEnabled || 'webkitRequestFullScreen' in doc;
}

function fullScreenStatus() {
  if (document.fullscreen || document.mozFullScreen || document.fullscreenElement || document.msFullscreenElement || document.webkitIsFullScreen) {
    return true;
  } else {
    return false;
  }
}

function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
}

function onFullScreenEvent(callback) {
  document.addEventListener('fullscreenchange', callback);
  document.addEventListener('mozfullscreenchange', callback);
  document.addEventListener('MSFullscreenChange', callback);
  document.addEventListener('webkitfullscreenchange', callback);
}

function offFullScreenEvent(callback) {
  document.removeEventListener('fullscreenchange', callback);
  document.removeEventListener('mozfullscreenchange', callback);
  document.removeEventListener('MSFullscreenChange', callback);
  document.removeEventListener('webkitfullscreenchange', callback);
}

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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


var defaults = {
  wrap: true,
  background: '#333',
  callback: function callback() {},
  fullscreenClass: 'fullscreen'
};

var support = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* supportFullScreen */])();

function getState() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* fullScreenStatus */])();
}

function toggle(target, options, force) {
  if (!support) {
    return;
  }
  if (force === undefined) {
    !getState() ? enter(target, options) : exit();
  } else {
    force ? enter(target, options) : exit();
  }
}

function enter() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
  var options = arguments[1];

  if (!support) {
    return;
  }
  if (getState()) {
    return;
  }
  options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* extend */])(true, {}, defaults, options);

  var el = target;
  var wrapper = void 0;
  if (options.wrap) {
    wrapper = document.createElement('div');
    wrapper.style['overflow-y'] = 'auto';
    wrapper.style['background'] = options.background;
    wrapper.style['width'] = '100%';
    wrapper.style['height'] = '100%';

    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    wrapper.addEventListener('click', function (event) {
      if (event.target === this) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* exitFullscreen */])();
      }
    });
  }

  el.classList.add(options.fullscreenClass);

  function fullScreenCallback() {
    var isFullscreen = getState();
    if (!isFullscreen) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* offFullScreenEvent */])(fullScreenCallback);

      el.classList.remove(options.fullscreenClass);

      if (options.wrap) {
        wrapper.parentNode.insertBefore(el, wrapper);
        wrapper.parentNode.removeChild(wrapper);
      }
    }

    if (options.callback) {
      options.callback(isFullscreen);
    }
  }

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* onFullScreenEvent */])(fullScreenCallback);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* requestFullscreen */])(options.wrap ? wrapper : el);
}

function exit() {
  if (!support) {
    return;
  }
  if (!getState()) {
    return;
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* exitFullscreen */])();
}

/* harmony default export */ __webpack_exports__["a"] = ({
  getState: getState,
  toggle: toggle,
  enter: enter,
  exit: exit
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(4),
  /* template */
  __webpack_require__(6),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\Workspaces\\Web\\Git\\vue-fullscreen\\src\\component.vue"
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__component_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);




/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var name = opts.name || 'fullscreen';
    Vue.component(name, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* extend */])(__WEBPACK_IMPORTED_MODULE_0__component_vue___default.a, { name: name }));
    Vue.prototype['$' + name] = __WEBPACK_IMPORTED_MODULE_1__service__["a" /* default */];
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    background: {
      type: String,
      default: '#333'
    },
    fullscreenClass: {
      type: String,
      default: 'fullscreen'
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      supportFullScreen: false,
      isFullscreen: false
    };
  },


  computed: {
    wrapperStyle: function wrapperStyle() {
      return {
        'background': this.background,
        'overflow-y': 'auto',
        'width': '100%',
        'height': '100%'
      };
    }
  },

  methods: {
    toggle: function toggle(value) {
      if (value === undefined) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* fullScreenStatus */])()) {
          this.exit();
        } else {
          this.enter();
        }
      } else {
        value ? this.enter() : this.exit();
      }
    },
    enter: function enter() {
      if (!this.supportFullScreen) {
        return;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* onFullScreenEvent */])(this.fullScreenCallback);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* requestFullscreen */])(this.$el);
    },
    exit: function exit() {
      if (!this.supportFullScreen || !this.getState()) {
        return;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* exitFullscreen */])();
    },
    getState: function getState() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* fullScreenStatus */])();
    },
    shadeClick: function shadeClick(e) {
      if (e.target === this.$el) {
        this.exit();
      }
    },
    fullScreenCallback: function fullScreenCallback() {
      this.isFullscreen = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* fullScreenStatus */])();
      if (!this.isFullscreen) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* offFullScreenEvent */])(this.fullScreenCallback);
      }
      this.$emit('change', this.isFullscreen);
      this.$emit('update:fullscreen', this.isFullscreen);
    }
  },

  watch: {
    fullscreen: function fullscreen(value) {
      if (value !== __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* fullScreenStatus */])()) {
        value ? this.enter() : this.exit();
      }
    }
  },

  created: function created() {
    this.supportFullScreen = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* supportFullScreen */])();
  }
});

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.isFullscreen ? [_vm.fullscreenClass] : [],
    style: (_vm.isFullscreen ? [_vm.wrapperStyle] : []),
    on: {
      "click": function($event) {
        _vm.shadeClick($event)
      }
    }
  }, [_vm._t("default")], 2)
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
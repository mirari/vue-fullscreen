webpackJsonp([1],{137:function(e,s,t){"use strict";function a(){var e=document.documentElement;return"requestFullscreen"in e||"mozRequestFullScreen"in e&&document.mozFullScreenEnabled||"msRequestFullscreen"in e&&document.msFullscreenEnabled||"webkitRequestFullScreen"in e}function r(){return!!(document.fullscreen||document.mozFullScreen||document.fullscreenElement||document.msFullscreenElement||document.webkitIsFullScreen)}function l(e){e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen?e.msRequestFullscreen():console.log("Fullscreen API is not supported.")}function n(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen?document.msExitFullscreen():console.log("Fullscreen API is not supported.")}function c(e){document.addEventListener("fullscreenchange",e),document.addEventListener("mozfullscreenchange",e),document.addEventListener("MSFullscreenChange",e),document.addEventListener("webkitfullscreenchange",e)}function v(e){document.removeEventListener("fullscreenchange",e),document.removeEventListener("mozfullscreenchange",e),document.removeEventListener("MSFullscreenChange",e),document.removeEventListener("webkitfullscreenchange",e)}function p(){var e={},s=!1,t=0,a=arguments.length;for("[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(s=arguments[0],t++);t<a;t++){var r=arguments[t];!function(t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(s&&"[object Object]"===Object.prototype.toString.call(t[a])?e[a]=p(!0,e[a],t[a]):e[a]=t[a])}(r)}return e}s.f=a,s.d=r,s.b=l,s.c=n,s.a=c,s.e=v,s.g=p},277:function(e,s,t){var a=t(88)(t(307),t(780),null,null);e.exports=a.exports},298:function(e,s,t){t(766);var a=t(88)(t(303),t(779),null,null);e.exports=a.exports},299:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t(105),r=t(298),l=t.n(r),n=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e};console.log(a.default.version),new a.default(n({el:"#app"},l.a))},300:function(e,s,t){"use strict";(function(e){s.a={getMapScript:function(){if(e.BMap)return e.BMap._preloader?e.BMap._preloader:Promise.resolve(e.BMap);return e.BMap={},e.BMap._preloader=new Promise(function(s,t){e._initBaiduMap=function(){s(e.BMap),e.document.body.removeChild(a),e.BMap._preloader=null,e._initBaiduMap=null};var a=document.createElement("script");e.document.body.appendChild(a),a.src="//api.map.baidu.com/api?v=3.0&ak=DVr9V80HdBU5pjBWHyGMI2ei9nFuFbAc&callback=_initBaiduMap"}),e.BMap._preloader}}}).call(s,t(52))},301:function(e,s,t){"use strict";var a=t(277),r=t.n(a),l=t(302),n=t(137);s.a={install:function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=s.name||"fullscreen";e.component(a,t.i(n.g)(r.a,{name:a})),e.prototype["$"+a]=l.a}}},302:function(e,s,t){"use strict";function a(){return t.i(c.d)()}function r(e,s,t){p&&(void 0===t?a()?n():l(e,s):t?l(e,s):n())}function l(){function e(){var s=a();s||(t.i(c.e)(e),l.classList.remove(r.fullscreenClass),r.wrap&&(n.parentNode.insertBefore(l,n),n.parentNode.removeChild(n))),r.callback&&r.callback(s)}var s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body,r=arguments[1];if(p&&!a()){r=t.i(c.g)(!0,{},v,r),s===document.body&&(r.wrap=!1);var l=s,n=void 0;r.wrap&&(n=document.createElement("div"),n.style["overflow-y"]="auto",n.style.background=r.background,n.style.width="100%",n.style.height="100%",l.parentNode.insertBefore(n,l),n.appendChild(l),r.exitOnClickWrapper&&n.addEventListener("click",function(e){e.target===this&&t.i(c.c)()})),l.classList.add(r.fullscreenClass),t.i(c.a)(e),t.i(c.b)(r.wrap?n:l)}}function n(){p&&a()&&t.i(c.c)()}var c=t(137),v={wrap:!0,exitOnClickWrapper:!0,background:"#333",callback:function(){},fullscreenClass:"fullscreen"},p=t.i(c.f)();s.a={getState:a,support:p,toggle:r,enter:l,exit:n}},303:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t(785),r=t.n(a),l=t(778),n=t.n(l),c=t(764),v=(t.n(c),t(765));t.n(v);s.default={components:{Doc:r.a,Example:n.a}}},304:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});for(var a=t(277),r=t.n(a),l=t(511),n=t.n(l),c=null,v=null,p=[],o=[],_=[],i=[],u=[],h=0;h<10;h++)p.push("Class"+h),o.push((2*Math.random()).toFixed(2)),_.push(-Math.random().toFixed(2)),i.push((5*Math.random()).toFixed(2)),u.push((Math.random()+.3).toFixed(2));var d={normal:{},emphasis:{barBorderWidth:1,shadowBlur:10,shadowOffsetX:0,shadowOffsetY:0,shadowColor:"rgba(0,0,0,0.5)"}},f={legend:{data:["bar","bar2","bar3","bar4"],align:"left",left:10},toolbox:{feature:{magicType:{type:["stack","tiled"]},dataView:{}}},tooltip:{},xAxis:{data:p,name:"X Axis",silent:!1,axisLine:{onZero:!0},splitLine:{show:!1},splitArea:{show:!1}},yAxis:{inverse:!0,splitArea:{show:!1}},grid:{left:100},visualMap:{type:"continuous",dimension:1,text:["High","Low"],inverse:!0,itemHeight:200,calculable:!0,min:-2,max:6,top:60,left:10,inRange:{colorLightness:[.4,.8]},outOfRange:{color:"#bbb"},controller:{inRange:{color:"#2f4554"}}},series:[{name:"bar",type:"bar",stack:"one",itemStyle:d,data:o},{name:"bar2",type:"bar",stack:"one",itemStyle:d,data:_},{name:"bar3",type:"bar",stack:"two",itemStyle:d,data:i},{name:"bar4",type:"bar",stack:"two",itemStyle:d,data:u}]};s.default={components:{Fullscreen:r.a},data:function(){return{exitOnClickWrapper:!1,pageOnly:!1,fullscreen:!1}},computed:{},methods:{toggleFullScreen:function(){this.$refs.fullscreen.toggle()},fullscreenChange:function(e){this.$nextTick(function(){c.resize()})}},mounted:function(){v=this.$el.querySelector(".chart-container"),c=n.a.init(v),c.setOption(f)}}},305:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t(301),r=t(105),l=t(300);r.default.use(a.a);var n=null,c=null,v=null;s.default={data:function(){return{fullscreen:!1}},methods:{toggleFullScreen:function(){this.$fullscreen.toggle(this.$el.querySelector(".map-example"),{wrap:!1,callback:this.fullscreenChange})},fullscreenChange:function(e){this.fullscreen=e,c.checkResize(),c.setMapStyle({style:e?"bluish":"normal"})}},mounted:function(){var e=this;l.a.getMapScript().then(function(s){n=s,v=e.$el.querySelector(".map-container"),c=new n.Map(v),c.enableKeyboard(),c.enableScrollWheelZoom(),c.centerAndZoom("杭州",13)})}}},306:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t(777),r=t.n(a),l=t(776),n=t.n(l);s.default={components:{MapExample:r.a,ChartExample:n.a},data:function(){return{}},computed:{},mounted:function(){}}},307:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t(137);s.default={props:{exitOnClickWrapper:{type:Boolean,default:!0},background:{type:String,default:"#333"},fullscreenClass:{type:String,default:"fullscreen"},fullscreen:{type:Boolean,default:!1},pageOnly:{type:Boolean,default:!1}},data:function(){return{support:!1,isFullscreen:!1}},computed:{isPageOnly:function(){return this.pageOnly||!this.support},wrapperClass:function(){var e=[];return this.isFullscreen&&e.push(this.fullscreenClass),e},wrapperStyle:function(){var e={};return this.isFullscreen&&(e={background:this.background,"overflow-y":"auto",width:"100%",height:"100%"},this.isPageOnly&&(e.position="fixed !important",e["z-index"]="100000 !important",e.left="0",e.top="0",e.width="100% !important",e.height="100% !important")),e}},methods:{toggle:function(e){void 0===e?this.getState()?this.exit():this.enter():e?this.enter():this.exit()},enter:function(){this.isPageOnly?(this.isFullscreen=!0,this.onChangeFullScreen()):(t.i(a.a)(this.fullScreenCallback),t.i(a.b)(this.$el))},exit:function(){this.getState()&&(this.isPageOnly?(this.isFullscreen=!1,this.onChangeFullScreen()):t.i(a.c)())},getState:function(){return this.isPageOnly?this.isFullscreen:t.i(a.d)()},shadeClick:function(e){e.target===this.$el&&this.exitOnClickWrapper&&this.exit()},fullScreenCallback:function(){this.isFullscreen=t.i(a.d)(),this.isFullscreen||t.i(a.e)(this.fullScreenCallback),this.onChangeFullScreen()},onChangeFullScreen:function(){this.$emit("change",this.isFullscreen),this.$emit("update:fullscreen",this.isFullscreen)}},watch:{fullscreen:function(e){e!==t.i(a.d)()&&(e?this.enter():this.exit())}},created:function(){this.support=t.i(a.f)()}}},764:function(e,s){},765:function(e,s){},766:function(e,s){},767:function(e,s){},768:function(e,s){},769:function(e,s){},775:function(e,s,t){var a=t(88)(null,t(784),null,null);e.exports=a.exports},776:function(e,s,t){t(769);var a=t(88)(t(304),t(783),"data-v-79393b74",null);e.exports=a.exports},777:function(e,s,t){t(767);var a=t(88)(t(305),t(781),"data-v-59c17288",null);e.exports=a.exports},778:function(e,s,t){t(768);var a=t(88)(t(306),t(782),"data-v-703c5270",null);e.exports=a.exports},779:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"app"}},[t("a",{staticClass:"github-fork-ribbon",attrs:{href:"https://github.com/mirari/vue-fullscreen",title:"Fork me on GitHub"}},[e._v("Fork me on GitHub")]),e._v(" "),e._m(0),e._v(" "),t("div",{staticClass:"container"},[t("example"),e._v(" "),t("div",{staticClass:"row"},[t("doc",{staticClass:"col-md-12 markdown-body"})],1)],1),e._v(" "),e._m(1)])},staticRenderFns:[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"jumbotron"},[t("div",{staticClass:"container"},[t("h1",[e._v("vue-fullscreen")]),e._v(" "),t("p",[e._v("A simple Vue.js component for fullscreen")])])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("footer",{staticClass:"footer"},[t("div",{staticClass:"container"},[t("h4",[t("a",{attrs:{href:"https://mirari.cc",target:"_blank",title:"mirari.cc"}},[e._v("\n          mirari.cc\n        ")]),e._v("\n        ·  GitHub\n        "),t("a",{attrs:{href:"https://github.com/mirari",target:"_blank",title:"GitHub"}},[e._v("\n          @mirari\n        ")])])])])}]}},780:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement;return(e._self._c||s)("div",{class:e.wrapperClass,style:e.wrapperStyle,on:{click:function(s){return e.shadeClick(s)}}},[e._t("default")],2)},staticRenderFns:[]}},781:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"box"},[t("div",{ref:"fullscreen",staticClass:"map-example",attrs:{fullscreen:e.fullscreen},on:{change:e.fullscreenChange,"update:fullscreen":function(s){e.fullscreen=s}}},[t("div",{staticClass:"map-container"}),e._v(" "),e.$fullscreen.support?t("button",{staticClass:"btn btn-default btn-map-fullscreen",attrs:{type:"button"},on:{click:e.toggleFullScreen}},[t("i",{staticClass:"mdi",class:[e.fullscreen?"mdi-fullscreen-exit":"mdi-fullscreen"]})]):e._e()])])},staticRenderFns:[]}},782:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("h1",{staticClass:"page-header"},[e._v("Demo")]),e._v(" "),t("div",{staticClass:"row",staticStyle:{"margin-bottom":"20px"}},[t("div",{staticClass:"col-md-6"},[e._m(0),e._v(" "),t("map-example")],1),e._v(" "),t("div",{staticClass:"col-md-6"},[e._m(1),e._v(" "),t("chart-example")],1)])])},staticRenderFns:[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[t("a",{attrs:{href:"https://github.com/mirari/vue-fullscreen/blob/master/example/views/example/MapExample.vue",target:"_blank"}},[e._v("Source")])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[t("a",{attrs:{href:"https://github.com/mirari/vue-fullscreen/blob/master/example/views/example/ChartExample.vue",target:"_blank"}},[e._v("Source")])])}]}},783:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"box"},[t("fullscreen",{ref:"fullscreen",staticClass:"wrapper",attrs:{background:"#C7EDCC",fullscreen:e.fullscreen,"page-only":e.pageOnly,"exit-on-click-wrapper":e.exitOnClickWrapper},on:{"update:fullscreen":function(s){e.fullscreen=s},change:e.fullscreenChange}},[t("div",{staticClass:"chart-container"}),e._v(" "),t("button",{staticClass:"btn btn-default btn-map-fullscreen",attrs:{type:"button"},on:{click:e.toggleFullScreen}},[t("i",{staticClass:"mdi",class:[e.fullscreen?"mdi-fullscreen-exit":"mdi-fullscreen"]})])])],1)},staticRenderFns:[]}},784:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("section",[t("h1",[e._v("vue-fullscreen")]),e._v(" "),t("p",[e._v("A simple Vue.js component for fullscreen")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.npmjs.com/package/vue-fullscreen"}},[t("img",{attrs:{src:"https://img.shields.io/npm/v/vue-fullscreen.svg",alt:"npm version"}})]),e._v(" "),t("a",{attrs:{href:"https://www.npmjs.com/package/vue-fullscreen"}},[t("img",{attrs:{src:"https://img.shields.io/badge/language-Vue2-brightgreen.svg",alt:"language"}})])]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.npmjs.com/package/vue-fullscreen"}},[t("img",{attrs:{src:"https://img.shields.io/npm/v/vue-fullscreen/next.svg",alt:"npm version"}})]),e._v(" "),t("a",{attrs:{href:"https://www.npmjs.com/package/vue-fullscreen"}},[t("img",{attrs:{src:"https://img.shields.io/badge/language-Vue3-brightgreen.svg",alt:"language"}})])]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.npmjs.com/package/vue-fullscreen"}},[t("img",{attrs:{src:"https://img.shields.io/npm/dw/vue-fullscreen.svg",alt:"npm download"}})]),e._v(" "),t("a",{attrs:{href:"https://mit-license.org/"}},[t("img",{attrs:{src:"https://img.shields.io/badge/license-MIT-brightgreen.svg",alt:"license"}})])]),e._v(" "),t("h2",[t("a",{attrs:{href:"https://github.com/mirari/vue-fullscreen/tree/v3"}},[e._v("vue-fullscreen for vue2")])]),e._v(" "),t("h2",[t("a",{attrs:{href:"http://mirari.github.io/vue-fullscreen/"}},[e._v("Live demo")])]),e._v(" "),t("h2",[e._v("Quick Example")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://codepen.io/mirari/pen/LmJRxK"}},[e._v("Usage with v-for")])]),e._v(" "),t("li",[t("a",{attrs:{href:"https://codepen.io/mirari/pen/vjzXJN"}},[e._v("Usage with modal")])]),e._v(" "),t("li",[t("a",{attrs:{href:"https://codepen.io/mirari/pen/VwmEaRX"}},[e._v("Run in iPhone & Component properties")])])]),e._v(" "),t("h2",[t("a",{attrs:{href:"http://mirari.cc/2017/08/14/%E5%85%A8%E5%B1%8F%E5%88%87%E6%8D%A2%E7%BB%84%E4%BB%B6vue-fullscreen/"}},[e._v("中文文档")])]),e._v(" "),t("h2",[e._v("Browser support")]),e._v(" "),t("p",[t("a",{attrs:{href:"http://caniuse.com/fullscreen"}},[e._v("Full Screen API")])]),e._v(" "),t("h2",[e._v("Installation")]),e._v(" "),t("p",[e._v("Install from GitHub via NPM")]),e._v(" "),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-bash"}},[e._v("npm install vue-fullscreen\n")])]),e._v(" "),t("h2",[e._v("Usage")]),e._v(" "),t("p",[e._v("To use "),t("code",{pre:!0},[e._v("vue-fullscreen")]),e._v(", simply import it, and call "),t("code",{pre:!0},[e._v("Vue.use()")]),e._v(" to install.")]),e._v(" "),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("template")]),e._v(">")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("id")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"app"')]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("fullscreen")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("ref")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"fullscreen"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("@change")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"fullscreenChange"')]),e._v(">")]),e._v("\n      Content\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("fullscreen")]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v('\x3c!--  deprecated\n      <fullscreen :fullscreen.sync="fullscreen">\n        Content\n      </fullscreen>\n    --\x3e')]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("button")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("type")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"button"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("@click")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"toggle"')]),e._v(" >")]),e._v("Fullscreen"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("button")]),e._v(">")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(">")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("template")]),e._v(">")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("script")]),e._v(">")]),t("span",{pre:!0,attrs:{class:"javascript"}},[e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("import")]),e._v(" fullscreen "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'vue-fullscreen'")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("import")]),e._v(" Vue "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'vue'")]),e._v("\n  Vue.use(fullscreen)\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("export")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("default")]),e._v(" {\n    "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("methods")]),e._v(": {\n      toggle () {\n        "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".$refs["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'fullscreen'")]),e._v("].toggle() "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// recommended")]),e._v("\n        "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// this.fullscreen = !this.fullscreen // deprecated")]),e._v("\n      },\n      fullscreenChange (fullscreen) {\n        "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".fullscreen = fullscreen\n      }\n    },\n    data() {\n      "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" {\n        "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("fullscreen")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n      }\n    }\n  }\n")]),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("script")]),e._v(">")]),e._v("\n")])]),e._v(" "),t("p",[t("strong",[e._v("Caution:")]),e._v(" Because of the browser security function, you can only call these methods by a user gesture("),t("code",{pre:!0},[e._v("click")]),e._v(" or "),t("code",{pre:!0},[e._v("keypress")]),e._v(").")]),e._v(" "),t("p",[t("strong",[e._v("Caution:")]),e._v(" Since the prop watcher can not be a sync action now, the browser will intercept the subsequent operation of the callback. I recommend you to call the method directly by "),t("code",{pre:!0},[e._v("refs")]),e._v(" instead of changing the prop like the old version.")]),e._v(" "),t("h2",[e._v("Use as plugin")]),e._v(" "),t("p",[e._v("In your vue component, You can use "),t("code",{pre:!0},[e._v("this.$fullscreen")]),e._v(" to get the instance.")]),e._v(" "),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("template")]),e._v(">")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("id")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"app"')]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("class")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"example"')]),e._v(">")]),e._v("\n      Content\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("button")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("type")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"button"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("@click")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"toggle"')]),e._v(" >")]),e._v("Fullscreen"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("button")]),e._v(">")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(">")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("template")]),e._v(">")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("script")]),e._v(">")]),t("span",{pre:!0,attrs:{class:"javascript"}},[e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("import")]),e._v(" fullscreen "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'vue-fullscreen'")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("import")]),e._v(" Vue "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'vue'")]),e._v("\nVue.use(fullscreen)\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("export")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("default")]),e._v(" {\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("methods")]),e._v(": {\n    toggle () {\n      "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".$fullscreen.toggle("),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".$el.querySelector("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'.example'")]),e._v("), {\n        "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("wrap")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v(",\n        "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("callback")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".fullscreenChange\n      })\n    },\n    fullscreenChange (fullscreen) {\n      "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".fullscreen = fullscreen\n    }\n  },\n  data() {\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" {\n      "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("fullscreen")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n    }\n  }\n}\n")]),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("script")]),e._v(">")]),e._v("\n")])]),e._v(" "),t("h3",[e._v("Methods & Attributes")]),e._v(" "),t("h4",[e._v("toggle([target, options, force])")]),e._v(" "),t("p",[e._v("Toggle the fullscreen mode.")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("target")]),e._v(":\n"),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Element")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("document.body")])]),e._v(" "),t("li",[e._v("The element target for fullscreen.")])])]),e._v(" "),t("li",[t("strong",[e._v("options")]),e._v(" (optional):\n"),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Object")])]),e._v(" "),t("li",[e._v("The fullscreen options.")])])]),e._v(" "),t("li",[t("strong",[e._v("force")]),e._v(" (optional):\n"),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("undefined")])]),e._v(" "),t("li",[e._v("pass "),t("code",{pre:!0},[e._v("true")]),e._v(" to  force enter , "),t("code",{pre:!0},[e._v("false")]),e._v(" to exit fullscreen mode.")])])])]),e._v(" "),t("h4",[e._v("enter([target, options])")]),e._v(" "),t("p",[e._v("enter the fullscreen mode.")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("target")]),e._v(":\n"),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Element")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("document.body")])]),e._v(" "),t("li",[e._v("The element target for fullscreen.")])])]),e._v(" "),t("li",[t("strong",[e._v("options")]),e._v(" (optional):\n"),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Object")])]),e._v(" "),t("li",[e._v("The fullscreen options.")])])])]),e._v(" "),t("h4",[e._v("exit()")]),e._v(" "),t("p",[e._v("exit the fullscreen mode.")]),e._v(" "),t("h4",[e._v("getState()")]),e._v(" "),t("p",[e._v("get the fullscreen state.")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])])]),e._v(" "),t("p",[t("strong",[e._v("Caution:")]),e._v(" The action is asynchronous, you can not get the expected state immediately following the calling method.")]),e._v(" "),t("h4",[e._v("support")]),e._v(" "),t("p",[e._v("check browser support for the fullscreen API.")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])])]),e._v(" "),t("h3",[e._v("Options")]),e._v(" "),t("h3",[e._v("callback")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Function")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("null")])])]),e._v(" "),t("p",[e._v("It will be called when the fullscreen mode changed.")]),e._v(" "),t("h3",[e._v("fullscreenClass")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("String")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("fullscreen")])])]),e._v(" "),t("p",[e._v("The class will be added to target element when fullscreen mode is on.")]),e._v(" "),t("h3",[e._v("wrap")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("true")])])]),e._v(" "),t("p",[e._v("If "),t("code",{pre:!0},[e._v("true")]),e._v(", the target element will be wrapped up in a background "),t("code",{pre:!0},[e._v("div")]),e._v(", and you can set the background color.")]),e._v(" "),t("h3",[e._v("exitOnClickWrapper")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("true")])])]),e._v(" "),t("p",[e._v("If "),t("code",{pre:!0},[e._v("true")]),e._v(", clicking wrapper will exit fullscreen.")]),e._v(" "),t("h3",[e._v("background")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("String")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("#333")])])]),e._v(" "),t("p",[e._v("The background style of wrapper, only available when fullscreen mode is on and "),t("code",{pre:!0},[e._v("wrap")]),e._v(" is true.")]),e._v(" "),t("h2",[e._v("Use as component")]),e._v(" "),t("p",[e._v("You can simply import the component and register it locally.")]),e._v(" "),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("template")]),e._v(">")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("id")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"app"')]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("fullscreen")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("ref")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"fullscreen"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("@change")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"fullscreenChange"')]),e._v(">")]),e._v("\n      Content\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("fullscreen")]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("button")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("type")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"button"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("@click")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"toggle"')]),e._v(" >")]),e._v("Fullscreen"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("button")]),e._v(">")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(">")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("template")]),e._v(">")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("script")]),e._v(">")]),t("span",{pre:!0,attrs:{class:"javascript"}},[e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("import")]),e._v(" fullscreen "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'vue-fullscreen'")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("import")]),e._v(" Vue "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'vue'")]),e._v("\n  Vue.use(fullscreen)\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("export")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("default")]),e._v(" {\n    "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("methods")]),e._v(": {\n      toggle () {\n        "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".$refs["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'fullscreen'")]),e._v("].toggle()\n      },\n      fullscreenChange (fullscreen) {\n        "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".fullscreen = fullscreen\n      }\n    },\n    data() {\n      "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" {\n        "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("fullscreen")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n      }\n    }\n  }\n")]),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("script")]),e._v(">")]),e._v("\n")])]),e._v(" "),t("h3",[e._v("Methods")]),e._v(" "),t("h4",[e._v("toggle([force])")]),e._v(" "),t("p",[e._v("Toggle the fullscreen mode.You can pass "),t("code",{pre:!0},[e._v("force")]),e._v(" to force enter or exit fullscreen mode.")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("force")]),e._v(" (optional):\n"),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("undefined")])]),e._v(" "),t("li",[e._v("pass "),t("code",{pre:!0},[e._v("true")]),e._v(" to  force enter , "),t("code",{pre:!0},[e._v("false")]),e._v(" to exit fullscreen mode.")])])])]),e._v(" "),t("h4",[e._v("enter()")]),e._v(" "),t("p",[e._v("enter the fullscreen mode.")]),e._v(" "),t("h4",[e._v("exit()")]),e._v(" "),t("p",[e._v("exit the fullscreen mode.")]),e._v(" "),t("h4",[e._v("getState()")]),e._v(" "),t("p",[e._v("get the fullscreen state.")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])])]),e._v(" "),t("p",[t("strong",[e._v("Caution:")]),e._v(" The action is asynchronous, you can not get the expected state immediately following the calling method.")]),e._v(" "),t("h3",[e._v("Props")]),e._v(" "),t("h4",[e._v("fullscreen-class")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("String")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("fullscreen")])])]),e._v(" "),t("p",[e._v("The class will be added to the component when fullscreen mode is on.")]),e._v(" "),t("h4",[e._v("background")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("String")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("#333")])])]),e._v(" "),t("p",[e._v("The background style of component, only available when fullscreen mode is on.")]),e._v(" "),t("h4",[e._v("exit-on-click-wrapper")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("true")])])]),e._v(" "),t("p",[e._v("If "),t("code",{pre:!0},[e._v("true")]),e._v(", clicking wrapper will exit fullscreen.")]),e._v(" "),t("h4",[e._v("page-only")]),e._v(" "),t("ul",[t("li",[e._v("Type: "),t("code",{pre:!0},[e._v("Boolean")])]),e._v(" "),t("li",[e._v("Default: "),t("code",{pre:!0},[e._v("false")])])]),e._v(" "),t("p",[e._v("If "),t("code",{pre:!0},[e._v("true")]),e._v(", only fill the page with current element.")]),e._v(" "),t("p",[t("strong",[e._v("Note:")]),e._v(" If the browser does not support full-screen Api, this option will be automatically enabled.")]),e._v(" "),t("h3",[e._v("Events")]),e._v(" "),t("h4",[e._v("change")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("isFullscreen")]),e._v(":  The current fullscreen state.")])]),e._v(" "),t("p",[e._v("This event fires when the fullscreen mode changed.")]),e._v(" "),t("h2",[e._v("No conflict")]),e._v(" "),t("p",[e._v("If you need to avoid name conflict, you can import it like this:")]),e._v(" "),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("template")]),e._v(">")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("id")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"app"')]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("fs")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("ref")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"fullscreen"')]),e._v(">")]),e._v("\n      Content\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("fs")]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("class")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"example"')]),e._v(">")]),e._v("\n      Content\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(">")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("button")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("type")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"button"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("@click")]),e._v("="),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v('"toggle"')]),e._v(" >")]),e._v("Fullscreen"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("button")]),e._v(">")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("div")]),e._v(">")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("template")]),e._v(">")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("<"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("script")]),e._v(">")]),t("span",{pre:!0,attrs:{class:"javascript"}},[e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("import")]),e._v(" Fullscreen "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'vue-fullscreen'")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("import")]),e._v(" Vue "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'vue'")]),e._v("\nVue.use(Fullscreen, {"),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("name")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'fs'")]),e._v("})\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("export")]),e._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("default")]),e._v(" {\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("methods")]),e._v(": {\n    toggle () {\n      "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".$refs["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'fullscreen'")]),e._v("].toggle()\n      "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".$fs.toggle("),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".$el.querySelector("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'.example'")]),e._v("), {\n        "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("wrap")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v(",\n        "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("callback")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".fullscreenChange\n      })\n    },\n    fullscreenChange (fullscreen) {\n      "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("this")]),e._v(".fullscreen = fullscreen\n    }\n  },\n  data() {\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" {\n      "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("fullscreen")]),e._v(": "),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n    }\n  }\n}\n")]),t("span",{pre:!0,attrs:{class:"hljs-tag"}},[e._v("</"),t("span",{pre:!0,attrs:{class:"hljs-name"}},[e._v("script")]),e._v(">")]),e._v("\n")])])])}]}},785:function(e,s,t){e.exports=t(775)}},[299]);
//# sourceMappingURL=app.eccf685aa086e6119398.js.map
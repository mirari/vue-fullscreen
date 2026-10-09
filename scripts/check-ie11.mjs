import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { parse } from 'acorn'
import { JSDOM } from 'jsdom'

for (const file of ['index.js', 'index.cjs', 'index.umd.js']) {
  let code = readFileSync(`dist/vue2/${file}`, 'utf8')
  if (file === 'index.js') {
    // ES modules require a bundler in IE; their executable body must still be ES5.
    const ast = parse(code, { ecmaVersion: 'latest', sourceType: 'module' })
    for (const node of ast.body.reverse()) {
      if (
        node.type === 'ImportDeclaration' ||
        node.type === 'ExportNamedDeclaration'
      ) {
        assert(!node.declaration, 'Unexpected inline export in bundled output')
        code = code.slice(0, node.start) + code.slice(node.end)
      }
    }
  }
  parse(code, { ecmaVersion: 5 })
  console.log(`ES5 syntax verified: ${file}`)
}
const requireVue2 = createRequire(resolve('packages/vue2/package.json'))
const vue = readFileSync(requireVue2.resolve('vue/dist/vue.js'), 'utf8')
const bundle = readFileSync('dist/vue2/index.umd.js', 'utf8')
for (const native of [false, true]) {
  const dom = new JSDOM(
    '<main><div id="target" class="existing" style="position:relative"></div><span id="after"></span></main><div id="app"></div><button id="directive"></button>',
    { runScripts: 'outside-only', url: 'http://localhost' },
  )
  const w = dom.window
  try {
    w.eval(`
      delete Array.prototype[Symbol.iterator];
      delete String.prototype[Symbol.iterator];
      window.Promise = undefined; window.WeakMap = undefined; window.Symbol = undefined;
      Object.assign = undefined; Array.from = undefined;
      delete Array.prototype.entries; delete Array.prototype.values; delete Array.prototype.keys;
      window.CustomEvent = undefined;
      [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function(p) {
        ['before', 'after', 'replaceWith', 'remove', 'append'].forEach(function(k) { p[k] = undefined; });
      });
      ['add', 'remove'].forEach(function(k) {
        var original = DOMTokenList.prototype[k];
        DOMTokenList.prototype[k] = function(token) { return original.call(this, token); };
      });
    `)
    if (native) {
      w.eval(`
        document.msFullscreenEnabled = true;
        document.msFullscreenElement = null;
        function change() { var e = document.createEvent('Event'); e.initEvent('MSFullscreenChange', true, false); document.dispatchEvent(e); }
        HTMLElement.prototype.msRequestFullscreen = function() { var target = this; setTimeout(function() { if (window.failFullscreen) { var e = document.createEvent('Event'); e.initEvent('MSFullscreenError', true, false); document.dispatchEvent(e); } else { document.msFullscreenElement = target; change(); } }, 0); };
        document.msExitFullscreen = function() { setTimeout(function() { document.msFullscreenElement = null; change(); }, 0); };
      `)
    }
    w.eval(vue)
    w.eval(bundle)
    assert.equal(typeof w.Promise, 'function')
    assert.equal(typeof w.Promise.prototype.finally, 'function')
    assert.equal(typeof w.WeakMap, 'function')
    const { api, directive } = w.VueFullscreen
    assert.equal(api.isEnabled, native)
    const target = w.document.querySelector('#target')
    await api.request(target, { teleport: true, fullscreenClass: 'full one' })
    assert.equal(target.parentNode, w.document.body)
    assert(target.classList.contains('one'))
    if (native) {
      assert.equal(w.document.msFullscreenElement, w.document.body)
      await api.exit()
    } else {
      const event = new w.Event('keyup')
      Object.defineProperty(event, 'key', { value: 'Esc' })
      w.document.dispatchEvent(event)
    }
    assert.equal(api.isFullscreen, false)
    assert.equal(target.nextElementSibling.id, 'after')
    assert.equal(target.className, 'existing')
    assert.equal(target.style.position, 'relative')
    if (native) {
      w.failFullscreen = true
      await assert.rejects(
        api.request(target, { teleport: true }),
        /IE fullscreen request failed/,
      )
      assert.equal(api.isFullscreen, false)
      assert.equal(target.nextElementSibling.id, 'after')
      assert.equal(target.className, 'existing')
      w.failFullscreen = false
      await api.request(target, { teleport: true })
      await api.exit()
    }
    const button = w.document.querySelector('#directive')
    let reported
    button.addEventListener('fullscreen-error', (e) => {
      reported = e.detail
    })
    directive.inserted(button, { value: '#missing', modifiers: {} })
    button.click()
    assert.match(reported.message, /not found/)
    directive.unbind(button)
    // Vue itself is external: verify a real Vue 2 component with the bundled polyfills.
    w.eval(`
      Vue.config.productionTip = false;
      Vue.use(VueFullscreen.default);
      window.app = new Vue({ render: function(h) { return h('fullscreen', { ref: 'fs', props: { pageOnly: true, teleport: true } }, ['content']); } }).$mount('#app');
    `)
    await w.app.$refs.fs.request()
    assert.equal(w.app.$el.parentNode, w.document.body)
    w.app.$destroy()
    assert(!w.document.querySelector('body > .fullscreen'))
    console.log(
      `IE 11 capability simulation passed: ${native ? 'MS native API' : 'page fallback'}`,
    )
  } finally {
    w.close()
  }
}

import { expect, test } from '@playwright/test'
const cases = [
  ['Vue 2 script', 'http://127.0.0.1:4180/vue2/'],
  ['Vue script', 'http://127.0.0.1:4180/vue3/'],
  ['Vue Vite', 'http://127.0.0.1:4181/'],
  ['Nuxt 4 SSR', 'http://127.0.0.1:4182/'],
]
for (const vue2 of [true, false]) {
  for (const pageOnly of [true, false]) {
    test(`Vue ${vue2 ? 2 : 3}: conditional root replacement from tarball (${pageOnly ? 'page' : 'native'})`, async ({
      page,
    }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto(`http://127.0.0.1:4180/vue${vue2 ? 2 : 3}/`)
      await page.evaluate(`(() => {
        const vue2 = ${vue2}, pageOnly = ${pageOnly}
        const host = document.createElement('main')
        const mount = document.createElement('div')
        host.id = 'conditional-host'; mount.id = 'conditional-mount'
        host.appendChild(mount); document.body.appendChild(host)
        const controls = document.createElement('div')
        controls.style.cssText = 'position:fixed;top:0;right:0;z-index:100000'
        document.body.appendChild(controls)
        const state = vue2 ? { visible: true, active: false } : Vue.reactive({ visible: true, active: false })
        let destroyed = 0
        const count = document.createElement('output'); count.id = 'destroyed-children'; controls.appendChild(count)
        const removed = () => { count.textContent = String(++destroyed) }
        const Child = { destroyed: removed, unmounted: removed, render(h) { return (vue2 ? h : Vue.h)('span', 'child') } }
        const render = (h) => state.visible ? h(VueFullscreen.Fullscreen, vue2 ? {
          attrs: { id: 'conditional-target' }, props: { value: state.active, pageOnly, teleport: true },
          on: { input: value => { state.active = value } },
        } : {
          id: 'conditional-target', modelValue: state.active, pageOnly, teleport: true,
          'onUpdate:modelValue': value => { state.active = value },
        }, vue2 ? [h(Child)] : () => h(Child)) : h('p', vue2 ? { attrs: { id: 'conditional-other' } } : { id: 'conditional-other' }, 'other')
        const app = vue2 ? new Vue({ data: state, render(h) { return render(h) } }).$mount(mount) : Vue.createApp({ render() { return render(Vue.h) } })
        if (!vue2) app.mount(mount)
        for (const [id, click] of [
          ['root-enter', () => { state.active = true }],
          ['root-hide', () => { state.visible = false }],
          ['root-show', () => { state.visible = true }],
          ['root-dispose', () => { if (vue2) { app.$destroy(); app.$el.remove() } else app.unmount(); host.remove(); controls.remove() }],
        ]) {
          const button = document.createElement('button'); button.id = id; button.textContent = id
          button.onclick = click; controls.appendChild(button)
        }
      })()`)
      for (let cycle = 0; cycle < 2; cycle++) {
        await page.locator('#root-enter').click()
        await expect(
          page.locator(
            'body > [data-fullscreen-teleport] > #conditional-target',
          ),
        ).toBeVisible()
        if (!pageOnly)
          await expect
            .poll(() =>
              page.evaluate(() => document.fullscreenElement === document.body),
            )
            .toBe(true)
        await page.locator('#root-hide').click()
        await expect(page.locator('#conditional-target')).toHaveCount(0)
        await expect(
          page.locator(
            `${vue2 ? '#conditional-host' : '#conditional-mount'} > #conditional-other`,
          ),
        ).toBeVisible()
        await expect(page.locator('#destroyed-children')).toHaveText(
          String(cycle + 1),
        )
        await expect(page.locator('[data-fullscreen-teleport]')).toHaveCount(0)
        await expect
          .poll(() => page.evaluate(() => document.fullscreenElement))
          .toBeNull()
        await page.locator('#root-show').click()
        await expect(
          page.locator(
            `${vue2 ? '#conditional-host' : '#conditional-mount'} > #conditional-target`,
          ),
        ).toBeVisible()
      }
      await page.locator('#root-dispose').click()
      await expect(page.locator('#conditional-target')).toHaveCount(0)
      expect(errors).toEqual([])
    })
  }
}
for (const [name, url] of cases) {
  for (const native of [false, true]) {
    test(`${name}: ${native ? 'native' : 'page'} fullscreen from tarball`, async ({
      page,
    }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => {
        if (
          message.type() === 'error' ||
          /hydration|Failed to resolve/.test(message.text())
        )
          errors.push(message.text())
      })
      await page.goto(url + (native ? '?native' : ''))
      if (!name.includes('script'))
        await expect(page.locator('#ready')).toHaveText('ready')
      await page.locator('#enter').click()
      await expect(page.locator('#state')).toHaveText('true')
      await expect(
        page.locator('body > [data-fullscreen-teleport] > #target'),
      ).toBeVisible()
      if (native)
        expect(
          await page.evaluate(
            () => document.fullscreenElement === document.body,
          ),
        ).toBe(true)
      await page.locator('#exit').click()
      await expect(page.locator('#state')).toHaveText('false')
      await expect(page.locator('main > #target')).toBeVisible()
      if (!name.includes('script')) {
        for (const button of ['api', 'directive']) {
          await page.locator(`#${button}`).click()
          await expect(page.locator('#api-state')).toHaveText('true')
          await expect(
            page.locator('body > [data-fullscreen-teleport] > #api-target'),
          ).toBeVisible()
          await page.locator('#api-exit').click()
          await expect(page.locator('#api-state')).toHaveText('false')
        }
      }
      expect(await page.evaluate(() => document.fullscreenElement)).toBeNull()
      expect(errors).toEqual([])
    })
  }
}
test('Nuxt renders fullscreen content without JavaScript', async ({
  browser,
  request,
}) => {
  const response = await request.get('http://127.0.0.1:4182/')
  expect(response.ok()).toBe(true)
  expect(await response.text()).toContain('Server rendered fullscreen content')
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4182/')
  await expect(page.locator('#target')).toContainText(
    'Server rendered fullscreen content',
  )
  await expect(page.locator('#ready')).toHaveText('server-rendered')
  await context.close()
})
test('Nuxt route unmount restores teleported content and remounts cleanly', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('http://127.0.0.1:4182/')
  await expect(page.locator('#ready')).toHaveText('ready')
  await page.locator('#enter').click()
  await expect(
    page.locator('body > [data-fullscreen-teleport] > #target'),
  ).toBeVisible()
  await page.locator('#other').evaluate((el: HTMLElement) => el.click())
  await expect(page.getByRole('heading', { name: 'Other route' })).toBeVisible()
  await expect(page.locator('#target')).toHaveCount(0)
  await page.getByRole('link', { name: 'Back', exact: true }).click()
  await expect(page.locator('#ready')).toHaveText('ready')
  await page.locator('#enter').click()
  await expect(
    page.locator('body > [data-fullscreen-teleport] > #target'),
  ).toBeVisible()
  await page.locator('#exit').click()
  await expect(page.locator('#state')).toHaveText('false')
  expect(errors).toEqual([])
})

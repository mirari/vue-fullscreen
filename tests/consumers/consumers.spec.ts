import { expect, test } from '@playwright/test'
const cases = [
  ['Vue 2 script', 'http://127.0.0.1:4180/vue2/'],
  ['Vue script', 'http://127.0.0.1:4180/vue3/'],
  ['Vue Vite', 'http://127.0.0.1:4181/'],
  ['Nuxt 4 SSR', 'http://127.0.0.1:4182/'],
]
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
      await expect(page.locator('body > #target')).toBeVisible()
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
          await expect(page.locator('body > #api-target')).toBeVisible()
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
  await expect(page.locator('body > #target')).toBeVisible()
  await page.locator('#other').evaluate((el: HTMLElement) => el.click())
  await expect(page.getByRole('heading', { name: 'Other route' })).toBeVisible()
  await expect(page.locator('#target')).toHaveCount(0)
  await page.getByRole('link', { name: 'Back', exact: true }).click()
  await expect(page.locator('#ready')).toHaveText('ready')
  await page.locator('#enter').click()
  await expect(page.locator('body > #target')).toBeVisible()
  await page.locator('#exit').click()
  await expect(page.locator('#state')).toHaveText('false')
  expect(errors).toEqual([])
})

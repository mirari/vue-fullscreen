import { expect, test } from '@playwright/test'

test('production site supports navigation, local search and mobile layout', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('./')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'vue-fullscreen',
  )
  await page.getByRole('link', { name: '快速上手', exact: true }).click()
  await expect(page).toHaveURL(/\/guide\/getting-started$/)
  await expect(
    page.getByRole('heading', { level: 1, name: /快速上手/ }),
  ).toBeVisible()
  await page.reload()
  await expect(page.locator('.vp-doc')).toContainText(
    'npm install vue-fullscreen@next',
  )
  await page.getByRole('button', { name: '搜索文档' }).click()
  await page.locator('#localsearch-input').fill('teleport')
  await expect(page.locator('.VPLocalSearchBox .result').first()).toBeVisible()
  await page.keyboard.press('Escape')
  await page.setViewportSize({ width: 390, height: 844 })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await page.getByRole('button', { name: 'mobile navigation' }).click()
  await expect(
    page.getByRole('link', { name: '交互示例', exact: true }).last(),
  ).toBeVisible()
  expect(errors).toEqual([])
})

for (const kind of ['component', 'directive', 'api']) {
  for (const native of [false, true]) {
    test(`${kind} demo: ${native ? 'native' : 'page'} fullscreen and restore`, async ({
      page,
    }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto('./examples')
      const demo = page.locator(`[data-demo="${kind}"]`)
      await expect(demo).toBeVisible()
      if (native) {
        expect(await page.evaluate(() => document.fullscreenEnabled)).toBe(true)
        await demo.getByLabel('仅网页全屏').uncheck()
      }
      await demo
        .getByRole('button', {
          name: kind === 'directive' ? '点击指令按钮' : '进入全屏',
        })
        .click()
      const target = page.locator(`#demo-${kind}`)
      await expect(target).toHaveClass(/demo-fullscreen/)
      expect(
        await target.evaluate((el) => el.parentElement === document.body),
      ).toBe(true)
      if (native)
        expect(
          await page.evaluate(
            () => document.fullscreenElement === document.body,
          ),
        ).toBe(true)
      await target.getByRole('button', { name: '退出全屏' }).click()
      await expect(demo.getByRole('status')).toHaveText('未全屏')
      await expect(demo.locator(`#demo-${kind}`)).toBeVisible()
      expect(await page.evaluate(() => document.fullscreenElement)).toBeNull()
      expect(errors).toEqual([])
    })
  }
}

test('API demo is restored before client-side navigation', async ({ page }) => {
  await page.goto('./examples')
  await page
    .locator('[data-demo="api"]')
    .getByRole('button', { name: '进入全屏' })
    .click()
  await expect(page.locator('body > #demo-api')).toBeVisible()
  // Trigger the real navigation link while the demo overlays the document.
  await page
    .locator('.VPNavBarMenu')
    .getByRole('link', { name: '指南' })
    .evaluate((el: HTMLElement) => el.click())
  await expect(page).toHaveURL(/getting-started$/)
  await expect(page.locator('body > #demo-api')).toHaveCount(0)
})

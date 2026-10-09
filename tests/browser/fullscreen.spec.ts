import { expect, test } from '@playwright/test'
for (const port of [4172, 4173]) {
  for (const pageOnly of [true, false]) {
    test(`Vue ${port - 4170}: ${pageOnly ? 'page' : 'native'} fullscreen lifecycle`, async ({
      page,
    }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto(`http://localhost:${port}/${pageOnly ? '?pageOnly' : ''}`)
      if (!pageOnly)
        expect(await page.evaluate(() => document.fullscreenEnabled)).toBe(true)
      await page.locator('#enter').click()
      await expect(page.locator('#state')).toHaveText('true')
      await expect(page.locator('body > #target')).toBeVisible()
      if (!pageOnly)
        expect(
          await page.evaluate(
            () => document.fullscreenElement === document.body,
          ),
        ).toBe(true)
      await page.locator('#exit').click()
      await expect(page.locator('#state')).toHaveText('false')
      await expect(page.locator('main > #target')).toBeVisible()
      expect(await page.evaluate(() => document.fullscreenElement)).toBeNull()
      await page.locator('#api').click()
      await expect(page.locator('body > #api-target')).toBeVisible()
      if (pageOnly) await page.keyboard.press('Escape')
      else await page.evaluate(() => document.exitFullscreen())
      await expect(page.locator('main > #api-target')).toBeVisible()
      expect(errors).toEqual([])
    })
  }
}

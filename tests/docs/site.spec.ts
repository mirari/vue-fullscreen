import { expect, test } from '@playwright/test'

// Keep interaction tests independent of the external image service.
test.beforeEach(async ({ page }) => {
  await page.route('https://picsum.photos/**', (route) =>
    route.fulfill({
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"><rect width="1280" height="720" fill="#406b8a"/></svg>',
    }),
  )
})

for (const english of [false, true]) {
  const prefix = english ? './en/' : './'
  const text = english
    ? {
        start: 'Getting started',
        search: 'Search',
        examples: 'Examples',
        pageOnly: 'Page-only fullscreen',
        enter: 'Enter fullscreen',
        directive: 'Toggle with directive',
        exit: 'Exit fullscreen',
        guide: 'Guide',
      }
    : {
        start: '快速上手',
        search: '搜索文档',
        examples: '交互示例',
        pageOnly: '仅网页全屏',
        enter: '进入全屏',
        directive: '点击指令按钮',
        exit: '退出全屏',
        guide: '指南',
      }

  test(`${english ? 'English' : 'Chinese'} navigation, search and mobile layout`, async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(prefix)
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      english ? 'en-US' : 'zh-CN',
    )
    await page.getByRole('link', { name: text.start, exact: true }).click()
    await expect(page).toHaveURL(
      english ? /\/en\/guide\/getting-started$/ : /\/guide\/getting-started$/,
    )
    await page.reload()
    await expect(page.locator('.VPDoc .vp-doc')).toContainText(
      'npm install vue-fullscreen@next',
    )
    await expect(page.locator('.VPDoc .vp-doc')).not.toContainText(
      'npm install vue-fullscreen@legacy',
    )
    await page.getByRole('button', { name: text.search, exact: true }).click()
    await page.locator('#localsearch-input').fill('teleport')
    await expect(
      page.locator('.VPLocalSearchBox .result').first(),
    ).toBeVisible()
    await page.keyboard.press('Escape')
    await page.setViewportSize({ width: 390, height: 844 })
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    await page.getByRole('button', { name: 'mobile navigation' }).click()
    await expect(
      page.getByRole('link', { name: text.examples, exact: true }).last(),
    ).toBeVisible()
    expect(errors).toEqual([])
  })

  for (const kind of ['component', 'directive', 'api']) {
    for (const native of [false, true]) {
      test(`${english ? 'en' : 'zh'} ${kind}: ${native ? 'native' : 'page'} fullscreen`, async ({
        page,
      }) => {
        const errors: string[] = []
        page.on('pageerror', (error) => errors.push(error.message))
        await page.goto(`${prefix}examples`)
        const demo = page.locator(`[data-demo="${kind}"]`)
        await expect(demo).toBeVisible()
        const image = demo.locator('.gallery-image')
        await expect(image).toHaveCSS('object-fit', 'contain')
        const preview = await image.boundingBox()
        expect(preview!.height).toBeLessThanOrEqual(280)
        await expect(demo.getByLabel(text.pageOnly)).not.toBeChecked()
        if (!native) await demo.getByLabel(text.pageOnly).check()
        if (native) {
          expect(await page.evaluate(() => document.fullscreenEnabled)).toBe(
            true,
          )
        }
        await demo
          .getByRole('button', {
            name: kind === 'directive' ? text.directive : text.enter,
          })
          .click()
        const target = page.locator(`#demo-${kind}`)
        await expect(target).toHaveClass(/demo-fullscreen/)
        const fullImage = target.locator('.gallery-image')
        await expect(fullImage).toHaveCSS('object-fit', 'contain')
        await expect
          .poll(async () => {
            const box = await fullImage.boundingBox()
            // Photos are 16:9; compare the visible image, not its letterbox.
            return Math.min(box!.height, (box!.width * 9) / 16)
          })
          .toBeGreaterThan(preview!.height * 1.5)
        expect(
          await target.evaluate((el) => el.parentElement === document.body),
        ).toBe(true)
        if (native)
          expect(
            await page.evaluate(
              () => document.fullscreenElement === document.body,
            ),
          ).toBe(true)
        await target.getByRole('button', { name: text.exit }).click()
        await expect(target).not.toHaveClass(/demo-fullscreen/)
        await expect(demo.locator(`#demo-${kind}`)).toBeVisible()
        expect(await page.evaluate(() => document.fullscreenElement)).toBeNull()
        expect(errors).toEqual([])
      })
    }
  }

  test(`${english ? 'en' : 'zh'} API cleanup before navigation`, async ({
    page,
  }) => {
    await page.goto(`${prefix}examples`)
    await page
      .locator('[data-demo="api"]')
      .getByRole('button', { name: text.enter })
      .click()
    await expect(page.locator('body > #demo-api')).toBeVisible()
    await page
      .locator('.VPNavBarMenu')
      .getByRole('link', { name: text.guide, exact: true })
      .evaluate((el: HTMLElement) => el.click())
    await expect(page).toHaveURL(/getting-started$/)
    await expect(page.locator('body > #demo-api')).toHaveCount(0)
  })

  test(`${english ? 'en' : 'zh'} Vue 2 has a separate entry and sidebar`, async ({
    page,
  }) => {
    await page.goto(prefix)
    await page
      .locator('.VPNavBarMenu')
      .getByRole('link', { name: 'Vue 2', exact: true })
      .click()
    await expect(page).toHaveURL(english ? /\/en\/vue2\/$/ : /\/vue2\/$/)
    await expect(page.locator('.VPDoc .vp-doc')).toContainText(
      'vue-fullscreen@legacy',
    )
    const sidebar = page.locator('.VPSidebar')
    const links = await sidebar
      .locator('a[href]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')))
    expect(
      links.every((href) => href?.startsWith(english ? '/en/vue2/' : '/vue2/')),
    ).toBe(true)
    await sidebar
      .getByRole('link', { name: english ? 'Component' : '组件', exact: true })
      .click()
    await expect(page.locator('.VPDoc .vp-doc')).toContainText('input')
    await expect(page.locator('.VPDoc .vp-doc')).not.toContainText('modelValue')
    await page.locator('.VPNavBarTranslations button').click()
    await page
      .locator('.VPNavBarTranslations')
      .getByRole('link', {
        name: english ? '简体中文' : 'English',
        exact: true,
      })
      .click()
    await expect(page).toHaveURL(
      english ? /\/vue2\/guide\/component$/ : /\/en\/vue2\/guide\/component$/,
    )
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      english ? 'zh-CN' : 'en-US',
    )
  })

  for (const native of [false, true]) {
    test(`${english ? 'en' : 'zh'} embedded Vue 2 ${native ? 'native' : 'page'} example`, async ({
      page,
    }) => {
      await page.goto(`${prefix}vue2/examples`)
      await expect(page.getByLabel(text.pageOnly)).not.toBeChecked()
      if (!native) await page.getByLabel(text.pageOnly).check()
      const frame = page.frameLocator('iframe')
      await expect(frame.locator('html')).toHaveAttribute(
        'lang',
        english ? 'en' : 'zh-CN',
      )
      await frame.locator('#enter').click()
      await expect(frame.locator('#state')).toHaveText('true')
      if (native)
        expect(
          await frame
            .locator('body')
            .evaluate(() => document.fullscreenElement === document.body),
        ).toBe(true)
      await frame.locator('#exit').click()
      await expect(frame.locator('#state')).toHaveText('false')
    })
  }
}

test('language switch keeps the Vue 3 page', async ({ page }) => {
  await page.goto('./guide/component')
  await page.locator('.VPNavBarTranslations button').click()
  await page
    .locator('.VPNavBarTranslations')
    .getByRole('link', { name: 'English', exact: true })
    .click()
  await expect(page).toHaveURL(/\/en\/guide\/component$/)
  await expect(page.locator('[data-demo="component"]')).toContainText(
    'Enter fullscreen',
  )
})

for (const vue2 of [false, true]) {
  for (const native of [false, true]) {
    test(`${vue2 ? 'Vue 2' : 'Vue'} teleport comparison in ${native ? 'native' : 'page'} mode`, async ({
      page,
    }) => {
      await page.goto(vue2 ? './vue2/examples' : './examples')
      const scope = vue2 ? page.frameLocator('iframe') : page
      const controls = vue2
        ? scope.locator('main')
        : page.locator('[data-demo="teleport"]')
      await expect(
        (vue2 ? page : controls).getByLabel('仅网页全屏'),
      ).not.toBeChecked()
      if (!native)
        await (vue2 ? page : controls).getByLabel('仅网页全屏').check()
      const target = scope.locator(vue2 ? '#target' : '#teleport-target')
      const popup = scope.locator(vue2 ? '#body-popup' : '.teleport-popup')
      for (const teleport of [false, true]) {
        await controls
          .getByLabel('teleport', { exact: true })
          .setChecked(teleport)
        await controls
          .getByRole('button', {
            name: vue2 ? '进入组件全屏' : '进入全屏',
            exact: true,
          })
          .click()
        await expect(target).toHaveClass(/(?:teleport-active|fullscreen)/)
        expect(
          await target.evaluate((el) => el.parentElement === document.body),
        ).toBe(teleport)
        if (native) {
          expect(
            await target.evaluate((el) => document.fullscreenElement === el),
          ).toBe(!teleport)
          await target.getByRole('button', { name: '切换 body 弹窗' }).click()
          await expect(popup).toBeAttached()
          // Visibility alone cannot detect exclusion from the fullscreen top layer.
          await expect
            .poll(() =>
              popup.evaluate((el) => {
                const r = el.getBoundingClientRect()
                return el.contains(
                  document.elementFromPoint(
                    r.x + r.width / 2,
                    r.y + r.height / 2,
                  ),
                )
              }),
            )
            .toBe(teleport)
        } else {
          const fillsViewport = await target.evaluate((el) => {
            const r = el.getBoundingClientRect()
            return (
              Math.abs(r.width - innerWidth) < 2 &&
              Math.abs(r.height - innerHeight) < 2
            )
          })
          expect(fillsViewport).toBe(teleport)
        }
        await target
          .getByRole('button', { name: '退出全屏', exact: true })
          .click()
        await expect(target).not.toHaveClass(/(?:teleport-active|fullscreen)/)
        expect(
          await target.evaluate((el) => el.parentElement === document.body),
        ).toBe(false)
      }
    })
  }
}

for (const english of [false, true]) {
  for (const route of ['', 'guide/getting-started']) {
    test(`${english ? 'en' : 'zh'} gallery on ${route || 'home'}`, async ({
      page,
    }) => {
      await page.goto(`${english ? './en/' : './'}${route}`)
      const demo = page.locator('[data-demo="component"]')
      const image = page.locator('#demo-component .gallery-image')
      if (!route) {
        await expect(demo.getByRole('checkbox')).toHaveCount(0)
        await expect(demo.locator('.demo-caption')).toHaveCount(0)
        await expect(
          page.getByRole('heading', {
            name: english ? 'Component example' : '组件示例',
            exact: true,
          }),
        ).toHaveCount(0)
      } else {
        await expect(demo.getByRole('checkbox')).toHaveCount(2)
      }
      await expect(demo).not.toContainText(
        english ? 'Photos:' : '图片：个人摄影',
      )

      await expect(demo.locator('.gallery-thumbnails')).toBeHidden()
      await expect(demo.locator('.gallery-thumbnails button')).toHaveCount(6)
      await expect(
        demo.locator('.gallery-thumbnails img').first(),
      ).toHaveAttribute('src', /picsum\.photos\/id\/10\/128\/72$/)
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true)
      await demo
        .getByRole('button', {
          name: english ? 'Next image' : '下一张',
          exact: true,
        })
        .click()
      await expect(image).toHaveAttribute(
        'src',
        /picsum\.photos\/id\/11\/640\/360$/,
      )
      await demo
        .getByRole('button', {
          name: english ? 'Enter fullscreen' : '进入全屏',
          exact: true,
        })
        .click()
      const target = page.locator('#demo-component')
      await expect(target).toHaveClass(/demo-fullscreen/)
      await expect(target.locator('.gallery-thumbnails')).toBeVisible()
      await expect(image).toHaveAttribute(
        'src',
        /picsum\.photos\/id\/11\/1280\/720$/,
      )
      await target
        .getByRole('button', {
          name: english ? 'Image 3' : '图片 3',
          exact: true,
        })
        .click()
      await expect(image).toHaveAttribute(
        'src',
        /picsum\.photos\/id\/12\/1280\/720$/,
      )
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true)
      await target.focus()
      await page.keyboard.press('ArrowLeft')
      await expect(image).toHaveAttribute(
        'src',
        /picsum\.photos\/id\/11\/1280\/720$/,
      )
      await target
        .getByRole('button', {
          name: english ? 'Exit fullscreen' : '退出全屏',
          exact: true,
        })
        .click()
      await expect(demo.locator('.gallery-thumbnails')).toBeHidden()
      await expect(demo.locator('.gallery-count')).toHaveText('2 / 6')
      await expect(image).toHaveAttribute(
        'src',
        /picsum\.photos\/id\/11\/640\/360$/,
      )
    })
  }
}

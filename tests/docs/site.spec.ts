import { expect, test, type Page } from '@playwright/test'

async function expectSidebar(page: Page, english: boolean, vue2 = false) {
  const sidebar = page.locator('.VPSidebar')
  const prefix = (english ? '/en' : '') + (vue2 ? '/vue2' : '')
  await expect(sidebar.getByRole('button')).toHaveText(
    english
      ? ['Getting started', 'Usage', 'Reference']
      : ['开始使用', '使用方法', '参考'],
  )
  await expect(sidebar.getByRole('link')).toHaveText(
    english
      ? [
          'Quick start',
          'Compatibility',
          'Component',
          'Directive',
          'API',
          'API reference',
          'FAQ',
          'Feedback',
        ]
      : [
          '快速上手',
          '兼容性',
          '组件',
          '指令',
          'API',
          '完整 API',
          '常见问题',
          '问题反馈',
        ],
  )
  expect(
    await sidebar
      .locator('a[href]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href'))),
  ).toEqual([
    vue2 ? `${prefix}/` : `${prefix}/guide/getting-started`,
    `${prefix}/guide/compatibility`,
    `${prefix}/guide/component`,
    `${prefix}/guide/directive`,
    `${prefix}/guide/api`,
    `${prefix}/reference/api`,
    `${prefix}/guide/faq`,
    `${prefix}/contributing`,
  ])
}

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
        start: 'Quick start',
        search: 'Search',
        usage: 'Usage',
        pageOnly: 'Page-only fullscreen',
        enter: 'Enter fullscreen',
        directive: 'Toggle with directive',
        exit: 'Exit fullscreen',
        guide: 'Getting started',
      }
    : {
        start: '快速上手',
        search: '搜索文档',
        usage: '使用方法',
        pageOnly: '仅网页全屏',
        enter: '进入全屏',
        directive: '点击指令按钮',
        exit: '退出全屏',
        guide: '开始使用',
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
    await expectSidebar(page, english)
    await expect(page.locator('.VPDoc .vp-doc')).toContainText(
      'npm install vue-fullscreen',
    )
    await expect(page.locator('.VPDoc .vp-doc')).not.toContainText(
      /npm install vue-fullscreen@(?:next|legacy)/,
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
      page.getByRole('link', { name: text.usage, exact: true }).last(),
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
        await page.goto(`${prefix}guide/${kind}`)
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
    await page.goto(`${prefix}guide/api`)
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
    await expectSidebar(page, english, true)
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
      await page.goto(`${prefix}vue2/`)
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

for (const english of [false, true]) {
  for (const native of [false, true]) {
    test(`${english ? 'en' : 'zh'} getting started demonstrates teleport in ${native ? 'native' : 'page'} mode`, async ({
      page,
    }) => {
      await page.goto(`${english ? './en/' : './'}guide/getting-started`)
      const demo = page.locator('[data-demo="component"]')
      const target = page.locator('#demo-component')
      const popup = page.getByRole('dialog', {
        name: english ? 'Image details' : '图片详情',
      })
      const popupButton = target.getByRole('button', {
        name: english ? 'Details' : '详情',
        exact: true,
      })
      const pageOnly = demo.getByLabel(
        english ? 'Page-only fullscreen' : '仅网页全屏',
      )
      await expect(pageOnly).not.toBeChecked()
      // The same button opens a working body popup before entering fullscreen.
      await popupButton.click()
      await expect(popup).toBeVisible()
      expect(
        await popup.evaluate((el) => {
          const r = el.getBoundingClientRect()
          return (
            Math.abs(r.x + r.width / 2 - innerWidth / 2) < 1 &&
            Math.abs(r.y + r.height / 2 - innerHeight / 2) < 1
          )
        }),
      ).toBe(true)
      await popupButton.click()
      await expect(popup).toHaveCount(0)
      await pageOnly.setChecked(!native)
      for (const teleport of [false, true]) {
        await demo.getByLabel('teleport', { exact: true }).setChecked(teleport)
        // An existing body popup must also survive entry into fullscreen.
        await popupButton.click()
        await demo
          .getByRole('button', {
            name: english ? 'Enter fullscreen' : '进入全屏',
            exact: true,
          })
          .click()
        await expect(target).toHaveClass(/demo-fullscreen/)
        expect(
          await target.evaluate((el) => el.parentElement === document.body),
        ).toBe(teleport)
        await expect
          .poll(() =>
            target.evaluate((el) => {
              const r = el.getBoundingClientRect()
              return (
                Math.abs(r.width - innerWidth) < 2 &&
                Math.abs(r.height - innerHeight) < 2
              )
            }),
          )
          .toBe(true)
        if (native) {
          expect(
            await target.evaluate(
              (el) =>
                document.fullscreenElement ===
                (el.parentElement === document.body ? document.body : el),
            ),
          ).toBe(true)
        }
        await expect(popup).toBeAttached()
        expect(
          await popup.evaluate((el) => el.parentElement === document.body),
        ).toBe(true)
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
          .toBe(!native || teleport)
        if (native && !teleport)
          await expect(target.getByRole('status')).toContainText(
            english
              ? 'outside the native fullscreen element'
              : '不属于当前原生全屏元素',
          )
        // The Details button toggles even a popup excluded from native fullscreen.
        await popupButton.click()
        await expect(popup).toHaveCount(0)
        await expect(popupButton).toHaveAttribute('aria-expanded', 'false')
        await popupButton.click()
        await expect(popup).toBeAttached()
        await expect(popupButton).toHaveAttribute('aria-expanded', 'true')
        // Also exercise opening the popup from within fullscreen.
        if (!native || teleport) {
          await popup
            .getByRole('button', {
              name: english ? 'Close popup' : '关闭弹窗',
              exact: true,
            })
            .click()
          await expect(popup).toHaveCount(0)
          await popupButton.click()
          await expect(popup).toBeVisible()
        }
        await target
          .getByRole('button', {
            name: english ? 'Exit fullscreen' : '退出全屏',
            exact: true,
          })
          .click()
        await expect(target).not.toHaveClass(/demo-fullscreen/)
        await expect(demo.locator('#demo-component')).toBeVisible()
        await expect(popup).toHaveCount(0)
        expect(await page.evaluate(() => document.fullscreenElement)).toBeNull()
      }
    })
  }
}

for (const english of [false, true]) {
  for (const native of [false, true]) {
    test(`${english ? 'en' : 'zh'} Vue 2 teleport comparison in ${native ? 'native' : 'page'} mode`, async ({
      page,
    }) => {
      await page.goto(english ? './en/vue2/' : './vue2/')
      const scope = page.frameLocator('iframe')
      if (!native)
        await page
          .getByLabel(english ? 'Page-only fullscreen' : '仅网页全屏')
          .check()
      const controls = scope.locator('main')
      const target = scope.locator('#target')
      const popup = scope.locator('#body-popup')
      for (const teleport of [false, true]) {
        await controls
          .getByLabel('teleport', { exact: true })
          .setChecked(teleport)
        await controls
          .getByRole('button', {
            name: english ? 'Enter component fullscreen' : '进入组件全屏',
            exact: true,
          })
          .click()
        await expect(target).toHaveClass(/fullscreen/)
        expect(
          await target.evaluate((el) => el.parentElement === document.body),
        ).toBe(teleport)
        expect(
          await target.evaluate((el) => {
            const r = el.getBoundingClientRect()
            return (
              Math.abs(r.width - innerWidth) < 2 &&
              Math.abs(r.height - innerHeight) < 2
            )
          }),
        ).toBe(true)
        if (native) {
          expect(
            await target.evaluate((el) => document.fullscreenElement === el),
          ).toBe(!teleport)
        }
        const details = target.getByRole('button', {
          name: english ? 'Details' : '详情',
          exact: true,
        })
        await details.click()
        await expect(popup).not.toHaveAttribute('hidden')
        expect(
          await popup.evaluate((el) => {
            const r = el.getBoundingClientRect()
            return (
              Math.abs(r.x + r.width / 2 - innerWidth / 2) < 1 &&
              Math.abs(r.y + r.height / 2 - innerHeight / 2) < 1
            )
          }),
        ).toBe(true)
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
          .toBe(!native || teleport)
        await details.click()
        await expect(popup).toHaveAttribute('hidden')
        await expect(details).toHaveAttribute('aria-expanded', 'false')
        await details.click()
        await expect(popup).not.toHaveAttribute('hidden')
        await expect(details).toHaveAttribute('aria-expanded', 'true')
        await target
          .getByRole('button', {
            name: english ? 'Exit' : '退出全屏',
            exact: true,
          })
          .click()
        await expect(target).not.toHaveClass(/fullscreen/)
        expect(
          await target.evaluate((el) => el.parentElement === document.body),
        ).toBe(false)
        await expect(popup).toHaveAttribute('hidden')
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

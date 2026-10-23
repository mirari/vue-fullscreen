import { expect, test, type Locator, type Page } from '@playwright/test'

async function expectBodyViewer(popup: Locator, visible: boolean) {
  await expect(popup).toHaveClass(/viewer-in/)
  expect(await popup.evaluate((el) => el.parentElement === document.body)).toBe(
    true,
  )
  await expect
    .poll(() =>
      popup.evaluate((el) => {
        const box = el.getBoundingClientRect()
        return el.contains(
          document.elementFromPoint(
            box.x + box.width / 2,
            box.y + box.height / 2,
          ),
        )
      }),
    )
    .toBe(visible)
}

async function closeViewer(popup: Locator, image: Locator, visible: boolean) {
  if (visible)
    await popup.getByRole('button', { name: 'Close', exact: true }).click()
  else await image.click({ position: { x: 8, y: 8 } })
  await expect(popup).not.toHaveClass(/viewer-in/)
  await expect(image).toHaveAttribute('aria-expanded', 'false')
}

async function expectInlineViewerSize(target: Locator, fullscreen: boolean) {
  const stage = target.locator('.gallery-stage, .inline-gallery-stage')
  const viewer = target.locator('.viewer-container')
  await expect(viewer.locator('.viewer-canvas img')).toBeVisible()
  await expect
    .poll(async () => {
      const container = await stage.boundingBox()
      const content = await viewer.boundingBox()
      return Math.max(
        Math.abs(container!.width - content!.width),
        Math.abs(container!.height - content!.height),
      )
    })
    .toBeLessThan(2)
  const box = await viewer.boundingBox()
  if (fullscreen) expect(box!.height).toBeGreaterThan(300)
}

async function expectSurfaceTheme(target: Locator) {
  const dark = await target.evaluate((el) =>
    el.ownerDocument.documentElement.classList.contains('dark'),
  )
  await expect(target).toHaveCSS(
    'background-color',
    dark ? 'rgb(32, 33, 39)' : 'rgb(255, 255, 255)',
  )
  await expect(target).toHaveCSS(
    'color',
    dark ? 'rgb(223, 223, 229)' : 'rgb(60, 60, 67)',
  )
  await expect(target.locator('#exit')).toHaveCSS(
    'background-color',
    dark ? 'rgb(170, 162, 255)' : 'rgb(91, 81, 216)',
  )
}

async function expectExitAction(target: Locator) {
  const button = target.locator('#exit')
  await expect(button).toBeVisible()
  await expect(button).toHaveCSS('position', 'static')
  expect(
    await button.evaluate((el) => {
      const style = getComputedStyle(el)
      const parent = el.parentElement!
      const parentStyle = getComputedStyle(parent)
      const width =
        parent.clientWidth -
        parseFloat(parentStyle.paddingLeft) -
        parseFloat(parentStyle.paddingRight) -
        parseFloat(style.marginLeft) -
        parseFloat(style.marginRight)
      return Math.abs(el.getBoundingClientRect().width - width)
    }),
  ).toBeLessThan(2)
  const content = target.locator(
    '.image-preview, .inline-gallery-stage, .popup-gallery',
  )
  const actionBox = await button.boundingBox()
  const contentBox = await content.boundingBox()
  expect(contentBox!.y).toBeGreaterThanOrEqual(actionBox!.y + actionBox!.height)
}

for (const vue2 of [false, true]) {
  for (const teleport of [false, true]) {
    for (const browserExit of [false, true]) {
      test(`Vue ${vue2 ? 2 : 3} native fullscreen preserves reading position: teleport=${teleport}, ${browserExit ? 'browser exit' : 'exit button'}`, async ({
        page,
      }) => {
        await page.goto(vue2 ? './vue2/' : './guide/getting-started')
        const demo = page.locator('[data-comparison="teleport"]')
        await expect(demo.locator('iframe')).toHaveCount(0)
        await demo.getByLabel('teleport', { exact: true }).setChecked(teleport)
        const enter = demo.getByRole('button', {
          name: '进入全屏',
          exact: true,
        })
        await enter.scrollIntoViewIfNeeded()
        const before = await page.evaluate(() => ({ x: scrollX, y: scrollY }))
        expect(before.y).toBeGreaterThan(500)
        await enter.click()
        const target = page.locator('#demo-component')
        await expect(target).toHaveClass(/demo-fullscreen/)
        if (browserExit) await page.evaluate(() => document.exitFullscreen())
        else
          await target
            .getByRole('button', { name: '退出全屏', exact: true })
            .click()
        await expect(target).not.toHaveClass(/demo-fullscreen/)
        await expect
          .poll(() =>
            page.evaluate(
              ({ x, y }) =>
                Math.max(Math.abs(scrollX - x), Math.abs(scrollY - y)),
              before,
            ),
          )
          .toBeLessThan(2)
      })
    }
  }
}

for (const english of [false, true]) {
  for (const kind of ['component', 'directive', 'api']) {
    test(`${english ? 'en' : 'zh'} Vue 2 ${kind}: pageOnly and teleport popup comparison`, async ({
      page,
    }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto(`${english ? './en/' : './'}vue2/guide/${kind}`)
      const demo = page.locator(`[data-demo="${kind}"]`)
      await expect(demo.locator('iframe')).toHaveCount(0)
      for (const pageOnly of [false, true]) {
        await demo.getByLabel('pageOnly', { exact: true }).setChecked(pageOnly)
        for (const teleport of [false, true]) {
          await expect(page.locator(`#demo-${kind} #exit`)).toHaveCount(0)
          await demo
            .getByLabel('teleport', { exact: true })
            .setChecked(teleport)
          await demo.locator('#enter').click()
          const target = page.locator(`#demo-${kind}`)
          await expect(demo.locator('#enter')).toBeDisabled()
          await expect(target).toHaveClass(/fullscreen/)
          expect(
            await target.evaluate((el) => {
              const rect = el.getBoundingClientRect()
              return (
                Math.abs(rect.width - innerWidth) < 2 &&
                Math.abs(rect.height - innerHeight) < 2
              )
            }),
          ).toBe(true)
          await expectSurfaceTheme(target)
          await expectExitAction(target)
          expect(
            await target.evaluate(
              (el) =>
                el.parentElement?.hasAttribute('data-fullscreen-teleport') ===
                true,
            ),
          ).toBe(teleport)
          expect(
            await target.evaluate(
              (el) =>
                document.fullscreenElement ===
                (el.parentElement?.hasAttribute('data-fullscreen-teleport') ===
                true
                  ? document.body
                  : el),
            ),
          ).toBe(!pageOnly)
          const details = target.getByRole('button', {
            name: english ? 'Preview image 1' : '预览图片 1',
            exact: true,
          })
          const popup = page.locator('body > .viewer-container')
          await details.click({ position: { x: 8, y: 8 } })
          await expect(details).toHaveAttribute('aria-expanded', 'true')
          await expectBodyViewer(popup, pageOnly || teleport)
          await closeViewer(popup, details, pageOnly || teleport)
          await page.locator(`#demo-${kind} #exit`).click()
          await expect(demo.locator('#enter')).toBeEnabled()
          await expect(target).not.toHaveClass(/fullscreen/)
          await expect(target.locator('#exit')).toHaveCount(0)
          expect(
            await target.evaluate(() => document.fullscreenElement),
          ).toBeNull()
        }
      }
      expect(errors).toEqual([])
    })
  }
}

for (const vue2 of [false, true]) {
  test(`Vue ${vue2 ? 2 : 3} direct examples inherit theme without remounting`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto(vue2 ? './vue2/guide/component' : './guide/component')
    const demo = page.locator('[data-demo="component"]')
    const target = page.locator('#demo-component')
    await expect(demo.locator('iframe')).toHaveCount(0)
    await demo.getByLabel('pageOnly', { exact: true }).check()
    await demo.locator('#enter').click()
    await expect(target).toHaveClass(/demo-fullscreen/)
    await expectSurfaceTheme(target)
    await page.getByRole('switch').evaluate((el: HTMLElement) => el.click())
    await expect(page.locator('html')).toHaveClass('dark')
    await expectSurfaceTheme(target)
    await expect(target).toHaveClass(/demo-fullscreen/)
    await target.locator('#exit').click()
    await expect(demo.locator('#demo-component')).toBeVisible()
    await page.locator('.VPSidebar a[href$="/guide/api"]').click()
    await page.locator('.VPSidebar a[href$="/guide/component"]').click()
    await expect(page.locator('#demo-component')).toBeVisible()
    await expect(page.locator('.usage-demo iframe')).toHaveCount(0)
    await expect(page.locator('body > .viewer-container')).toHaveCount(0)
  })
}

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
          'Playground',
          'More examples',
          'FAQ',
          'Feedback',
        ]
      : [
          '快速上手',
          '兼容性',
          '组件',
          '指令',
          'API',
          '演练场',
          '更多示例',
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
    `${prefix}/playground`,
    `${prefix}/guide/examples`,
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
  for (const vue2 of [false, true]) {
    const prefix = (english ? './en/' : './') + (vue2 ? 'vue2/' : '')
    const playground = english ? 'Playground' : '演练场'
    test(`${prefix} usage links select the matching playground example`, async ({
      page,
    }) => {
      for (const kind of ['component', 'directive', 'api']) {
        await page.goto(`${prefix}guide/${kind}`)
        await expect(page.locator('h2#playground')).toContainText(playground)
        await expect(page.locator('.vp-doc')).not.toContainText(
          english ? 'On this page' : '本页参考',
        )
        const code = page.locator('.vp-doc div.language-vue').first()
        await expect(code).toContainText('teleport')
        await expect(code).toContainText('v-if="isFullscreen"')
        await expect(code).toContainText(
          kind === 'component' ? 'page-only' : 'pageOnly',
        )
        await expect(code).toContainText(
          english ? 'Your fullscreen content' : '需要全屏的内容',
        )
        await expect(code).not.toContainText('v-viewer')
        await expect(code).not.toContainText('showDetails')
        await expect(code).not.toContainText('<style')
        const source = await code.locator('pre code').innerText()
        await page
          .locator('.vp-doc')
          .getByRole('link', {
            name: english ? 'Edit this example' : '编辑此示例',
            exact: true,
          })
          .click()
        await expect(page).toHaveURL(
          new RegExp(`/playground\\?example=${kind}$`),
        )
        const name =
          kind === 'component'
            ? english
              ? 'Component'
              : '组件'
            : kind === 'directive'
              ? english
                ? 'Directive'
                : '指令'
              : 'API'
        await expect(
          page
            .locator('.playground-examples')
            .getByRole('button', { name, exact: true }),
        ).toHaveAttribute('aria-pressed', 'true')
        await expect(page.locator('.playground-status')).toHaveText(
          english ? 'Ready' : '已就绪',
        )
        await expect(page.locator('.cm-content')).toContainText('v-viewer')
        // The focused code must also work when copied into the Playground.
        await page.locator('.cm-content').click()
        await page.locator('.cm-content').press('ControlOrMeta+A')
        await page.keyboard.insertText(source)
        await page.locator('.playground-run').click()
        await expect(page.locator('.playground-status')).toHaveText(
          english ? 'Ready' : '已就绪',
        )
        const frame = page.frameLocator('.playground-output iframe')
        await frame
          .getByRole('button', {
            name: english ? 'Enter fullscreen' : '进入全屏',
            exact: true,
          })
          .click()
        await expect(frame.locator('.fullscreen')).toBeVisible()
        await frame
          .getByRole('button', {
            name: english ? 'Exit fullscreen' : '退出全屏',
            exact: true,
          })
          .click()
        await expect(frame.locator('.fullscreen')).toHaveCount(0)
      }
      await page.goto(`${prefix}playground?example=unknown`)
      await expect(
        page.locator('.playground-examples button').first(),
      ).toHaveAttribute('aria-pressed', 'true')
    })

    test(`${prefix} playground v-viewer works in fullscreen and cleans up on rerun`, async ({
      page,
    }) => {
      await page.goto(`${prefix}playground?example=component`)
      await expect(page.locator('.playground-status')).toHaveText(
        english ? 'Ready' : '已就绪',
      )
      const frame = page.frameLocator('.playground-output iframe')
      const popup = frame.locator('body > .viewer-container')
      const image = frame.locator('.image-trigger').first()
      for (const teleport of [false, true]) {
        await expect(frame.locator('#exit')).toHaveCount(0)
        await frame.getByLabel('teleport', { exact: true }).setChecked(teleport)
        await frame.locator('#enter').click()
        await expect(frame.locator('#demo-component')).toHaveClass(
          /demo-fullscreen/,
        )
        await expectSurfaceTheme(frame.locator('#demo-component'))
        await expectExitAction(frame.locator('#demo-component'))
        await image.click({ position: { x: 8, y: 8 } })
        await expectBodyViewer(popup, teleport)
        await closeViewer(popup, image, teleport)
        await frame.locator('#exit').click()
        await expect(frame.locator('#exit')).toHaveCount(0)
      }
      // Rerunning replaces the iframe and removes the previous viewer session.
      await image.click({ position: { x: 8, y: 8 } })
      await expectBodyViewer(popup, true)
      await page.locator('.playground-run').click()
      await expect(page.locator('.playground-status')).toHaveText(
        english ? 'Ready' : '已就绪',
      )
      await expect(
        frame.locator('body > .viewer-container.viewer-in'),
      ).toHaveCount(0)
      await expect(frame.locator('body')).not.toHaveClass(/viewer-open/)
      await image.click({ position: { x: 8, y: 8 } })
      await expectBodyViewer(popup, true)
    })

    test(`${prefix} playground theme follows the document without losing edits`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto(`${prefix}playground?example=directive`)
      await expect(page.locator('.playground-status')).toHaveText(
        english ? 'Ready' : '已就绪',
      )
      const frameElement = page.locator('.playground-output iframe')
      const frame = page.frameLocator('.playground-output iframe')
      await expect(frame.locator('.lab')).toHaveCSS(
        'background-color',
        'rgb(246, 246, 247)',
      )
      const source = await frameElement.getAttribute('srcdoc')
      const editor = page.locator('.cm-content')
      await editor.click()
      await editor.press('ControlOrMeta+End')
      await page.keyboard.type('\n<!-- theme draft -->')
      await page.getByRole('switch').click()
      await expect(frame.locator('html')).toHaveClass('dark')
      await expect(frame.locator('.lab')).toHaveCSS(
        'background-color',
        'rgb(27, 27, 31)',
      )
      await expect(editor).toContainText('theme draft')
      await expect(frameElement).toHaveAttribute('srcdoc', source!)
      await frame.locator('#enter').click()
      const target = frame.locator('#demo-directive')
      await expect(target).toHaveClass(/demo-fullscreen/)
      await expectSurfaceTheme(target)
      await target.locator('#exit').click()
      await page.getByRole('switch').click()
      await expect(frame.locator('html')).not.toHaveClass('dark')
      await expect(editor).toContainText('theme draft')
    })

    test(`${prefix} component methods anchor survives example loading`, async ({
      page,
    }) => {
      await page.route('**/demos.js', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 400))
        await route.continue()
      })
      await page.goto(`${prefix}guide/component#methods`)
      await expect(page.locator('h2#methods')).toBeInViewport()
      await expect(
        page.locator('[data-demo="component"] #enter'),
      ).toBeAttached()
      await expect(page.locator('h2#methods')).toBeInViewport()
      await expect(page).toHaveURL(/#methods$/)
    })
  }
}

for (const english of [false, true]) {
  const prefix = english ? './en/' : './'
  const text = english
    ? {
        start: 'Quick start',
        search: 'Search',
        usage: 'Usage',
        pageOnly: 'pageOnly',
        enter: 'Enter fullscreen',
        directive: 'Toggle with directive',
        exit: 'Exit fullscreen',
        guide: 'Getting started',
      }
    : {
        start: '快速上手',
        search: '搜索文档',
        usage: '使用方法',
        pageOnly: 'pageOnly',
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
        const image = demo.locator('.gallery-image').first()
        await expect(image).toHaveCSS('object-fit', 'cover')
        const preview = await image.boundingBox()
        expect(preview!.height).toBeLessThanOrEqual(280)
        await expect(demo.getByLabel(text.pageOnly)).not.toBeChecked()
        if (!native) await demo.getByLabel(text.pageOnly).check()
        if (native) {
          expect(await page.evaluate(() => document.fullscreenEnabled)).toBe(
            true,
          )
        }
        for (const teleport of [false, true]) {
          await expect(demo.locator('#exit')).toHaveCount(0)
          await demo
            .getByLabel('teleport', { exact: true })
            .setChecked(teleport)
          await demo
            .getByRole('button', {
              name: kind === 'directive' ? text.directive : text.enter,
            })
            .click()
          const target = page.locator(`#demo-${kind}`)
          await expect(target).toHaveClass(/demo-fullscreen/)
          await expectSurfaceTheme(target)
          await expectExitAction(target)
          const fullImage = target.locator('.gallery-image').first()
          await expect(fullImage).toHaveCSS('object-fit', 'cover')
          await expect
            .poll(async () => {
              const box = await fullImage.boundingBox()
              // Photos are 16:9; compare the visible image, not its letterbox.
              return Math.min(box!.height, (box!.width * 9) / 16)
            })
            .toBeGreaterThan(preview!.height * 1.5)
          expect(
            await target.evaluate(
              (el) =>
                el.parentElement?.hasAttribute('data-fullscreen-teleport') ===
                true,
            ),
          ).toBe(teleport)
          if (native)
            expect(
              await page.evaluate(
                () => document.fullscreenElement === document.body,
              ),
            ).toBe(teleport)
          const details = target.getByRole('button', {
            name: english ? 'Preview image 1' : '预览图片 1',
            exact: true,
          })
          const popup = page.locator('body > .viewer-container')
          await details.click({ position: { x: 8, y: 8 } })
          await expect(details).toHaveAttribute('aria-expanded', 'true')
          await expectBodyViewer(popup, !native || teleport)
          if (native && !teleport)
            await expect(target.getByRole('status')).toContainText(
              english
                ? 'outside the native fullscreen element'
                : '不属于当前原生全屏元素',
            )
          await closeViewer(popup, details, !native || teleport)
          await target.getByRole('button', { name: text.exit }).click()
          await expect(target).not.toHaveClass(/demo-fullscreen/)
          await expect(target.locator('#exit')).toHaveCount(0)
          await expect(demo.locator(`#demo-${kind}`)).toBeVisible()
          expect(
            await page.evaluate(() => document.fullscreenElement),
          ).toBeNull()
        }
        expect(errors).toEqual([])
      })
    }
  }

  for (const vue2 of [false, true]) {
    for (const kind of ['component', 'api', 'directive']) {
      test(`${english ? 'en' : 'zh'} Vue ${vue2 ? 2 : 3} ${kind} cleanup before navigation`, async ({
        page,
      }) => {
        await page.goto(`${prefix}${vue2 ? 'vue2/' : ''}guide/${kind}`)
        await page
          .locator(`[data-demo="${kind}"]`)
          .getByRole('button', {
            name: kind === 'directive' ? text.directive : text.enter,
          })
          .click()
        await expect(
          page.locator(`body > [data-fullscreen-teleport] > #demo-${kind}`),
        ).toBeVisible()
        await page.locator(`#demo-${kind} .image-trigger`).first().click()
        await expectBodyViewer(page.locator('body > .viewer-container'), true)
        await page
          .locator('.VPNavBarMenu')
          .getByRole('link', { name: text.guide, exact: true })
          .evaluate((el: HTMLElement) => el.click())
        await expect(page).toHaveURL(/getting-started$/)
        await expect(
          page.locator(`body > [data-fullscreen-teleport] > #demo-${kind}`),
        ).toHaveCount(0)
        await expect(page.locator('body > .viewer-container')).toHaveCount(0)
        await expect(page.locator('body')).not.toHaveClass(/viewer-open/)
        await expect
          .poll(() => page.evaluate(() => document.fullscreenElement === null))
          .toBe(true)
      })
    }
  }

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
  for (const english of [false, true]) {
    test(`${english ? 'en' : 'zh'} Vue ${vue2 ? 2 : 3} pageOnly comparison switches native fullscreen and restores the target`, async ({
      page,
    }) => {
      await page.goto(
        `${english ? './en/' : './'}${vue2 ? 'vue2/' : 'guide/getting-started'}`,
      )
      const demo = page.locator('[data-comparison="pageOnly"]')
      await expect(demo.locator('iframe')).toHaveCount(0)
      const target = page.locator('#demo-page-only')
      await expectInlineViewerSize(target, false)
      await expect(demo.getByRole('checkbox')).toHaveCount(1)
      for (const pageOnly of [false, true]) {
        await demo.getByLabel('pageOnly', { exact: true }).setChecked(pageOnly)
        await demo
          .getByRole('button', {
            name: english ? 'Enter fullscreen' : '进入全屏',
            exact: true,
          })
          .click()
        await expect(target).toHaveClass(/demo-fullscreen/)
        expect(
          await target.evaluate((el) => document.fullscreenElement === el),
        ).toBe(!pageOnly)
        await expectInlineViewerSize(target, true)
        expect(
          await target.evaluate((el) => {
            const rect = el.getBoundingClientRect()
            return (
              Math.abs(rect.width - innerWidth) < 2 &&
              Math.abs(rect.height - innerHeight) < 2
            )
          }),
        ).toBe(true)
        await expect(
          demo.getByLabel('pageOnly', { exact: true }),
        ).toBeDisabled()
        // The adjacent teleport example must not enter fullscreen with this one.
        await expect(page.locator('#demo-component')).not.toHaveClass(
          /demo-fullscreen/,
        )
        await target
          .getByRole('button', {
            name: english ? 'Exit fullscreen' : '退出全屏',
            exact: true,
          })
          .click()
        await expect(demo.locator('#demo-page-only')).toBeVisible()
        await expect(target).not.toHaveClass(/demo-fullscreen/)
        await expectInlineViewerSize(target, false)
        expect(await page.evaluate(() => document.fullscreenElement)).toBeNull()
      }
    })

    test(`${english ? 'en' : 'zh'} Vue ${vue2 ? 2 : 3} getting started demonstrates teleport in native fullscreen`, async ({
      page,
    }) => {
      await page.goto(
        `${english ? './en/' : './'}${vue2 ? 'vue2/' : 'guide/getting-started'}`,
      )
      const demo = page.locator('[data-comparison="teleport"]')
      const target = page.locator('#demo-component')
      const popup = page.locator('body > .viewer-container')
      const image = target.getByRole('button', {
        name: english ? 'Preview image 1' : '预览图片 1',
        exact: true,
      })
      await expect(demo.getByLabel('pageOnly', { exact: true })).toHaveCount(0)
      await image.click({ position: { x: 8, y: 8 } })
      await expectBodyViewer(popup, true)
      const previewImage = popup.locator('.viewer-canvas img')
      await expect(previewImage).toBeVisible()
      await closeViewer(popup, image, true)
      for (const teleport of [false, true]) {
        await demo.getByLabel('teleport', { exact: true }).setChecked(teleport)
        await demo
          .getByRole('button', {
            name: english ? 'Enter fullscreen' : '进入全屏',
            exact: true,
          })
          .click()
        await expect(target).toHaveClass(/demo-fullscreen/)
        expect(
          await target.evaluate(
            (el) =>
              el.parentElement?.hasAttribute('data-fullscreen-teleport') ===
              true,
          ),
        ).toBe(teleport)
        expect(
          await target.evaluate(
            (el) =>
              document.fullscreenElement ===
              (el.parentElement?.hasAttribute('data-fullscreen-teleport') ===
              true
                ? document.body
                : el),
          ),
        ).toBe(true)
        await image.click({ position: { x: 8, y: 8 } })
        await expectBodyViewer(popup, teleport)
        if (!teleport)
          await expect(target.getByRole('status')).toContainText(
            english
              ? 'outside the native fullscreen element'
              : '不属于当前原生全屏元素',
          )
        await closeViewer(popup, image, teleport)
        await image.click({ position: { x: 8, y: 8 } })
        await expectBodyViewer(popup, teleport)
        // Browser exit must also close a body-mounted viewer.
        await page.evaluate(() => document.exitFullscreen())
        await expect(target).not.toHaveClass(/demo-fullscreen/)
        await expect(demo.locator('#demo-component')).toBeVisible()
        await expect(popup).not.toHaveClass(/viewer-in/)
        await expect(page.locator('body')).not.toHaveClass(/viewer-open/)
        expect(await page.evaluate(() => document.fullscreenElement)).toBeNull()
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
      if (!route) {
        await expect(demo.getByRole('checkbox')).toHaveCount(0)
        await expect(demo.locator('.demo-caption')).toHaveCount(0)
        await expect(
          page.getByRole('heading', {
            name: english ? 'Component example' : '组件示例',
            exact: true,
          }),
        ).toHaveCount(0)
        const target = page.locator('#demo-component')
        const viewer = target.locator('.viewer-container')
        const image = viewer.locator('.viewer-canvas img')
        await expectInlineViewerSize(target, false)
        expect((await image.boundingBox())!.height).toBeGreaterThan(300)
        await expect(viewer.locator('.viewer-list > li')).toHaveCount(6)
        await viewer.locator('.viewer-list > li').nth(1).click()
        await expect(image).toHaveAttribute(
          'src',
          /picsum\.photos\/id\/11\/1280\/720$/,
        )
        await demo
          .getByRole('button', {
            name: english ? 'Enter fullscreen' : '进入全屏',
            exact: true,
          })
          .click()
        await expectInlineViewerSize(target, true)
        await viewer.locator('.viewer-list > li').nth(2).click()
        await expect(image).toHaveAttribute(
          'src',
          /picsum\.photos\/id\/12\/1280\/720$/,
        )
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
        await expectInlineViewerSize(target, false)
        await expect(page.locator('body > .viewer-container')).toHaveCount(0)
        await page.setViewportSize({ width: 390, height: 844 })
        await expectInlineViewerSize(target, false)
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true)
        return
      }
      await expect(demo.getByRole('checkbox')).toHaveCount(1)
      const target = page.locator('#demo-component')
      const tiles = target.locator('.gallery-image-trigger')
      await expect(tiles).toHaveCount(6)
      await expect(target.locator('.viewer-container')).toHaveCount(0)
      await expect(page.locator('body > .viewer-container')).toHaveCount(0)
      const boxes = await tiles.evaluateAll((elements) =>
        elements.map((el) => {
          const box = el.getBoundingClientRect()
          return { x: box.x, y: box.y }
        }),
      )
      expect(boxes[0].y).toBe(boxes[1].y)
      expect(boxes[0].y).toBe(boxes[2].y)
      expect(boxes[3].y).toBeGreaterThan(boxes[0].y)
      await tiles.nth(2).click()
      const popup = page.locator('body > .viewer-container')
      await expectBodyViewer(popup, true)
      await expect(popup.locator('.viewer-canvas img')).toHaveAttribute(
        'src',
        /picsum\.photos\/id\/12\/1280\/720$/,
      )
      await closeViewer(popup, tiles.nth(2), true)
      await page.setViewportSize({ width: 390, height: 844 })
      const mobile = await tiles.evaluateAll((elements) =>
        elements.map((el) => el.getBoundingClientRect().y),
      )
      expect(mobile[0]).toBe(mobile[1])
      expect(mobile[2]).toBeGreaterThan(mobile[0])
    })
  }
}

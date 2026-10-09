import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

function navigation(english: boolean, vue2 = false) {
  const prefix = (english ? '/en' : '') + (vue2 ? '/vue2' : '')
  const link = (path: string) =>
    vue2 && path === '/guide/getting-started'
      ? `${prefix}/`
      : `${prefix}${path}`
  return {
    nav: [
      {
        text: english ? 'Guide' : '指南',
        link: link('/guide/getting-started'),
      },
      { text: english ? 'Examples' : '交互示例', link: link('/examples') },
      {
        text: english ? 'API reference' : 'API 参考',
        link: link('/reference/api'),
      },
      {
        text: english ? 'Compatibility' : '兼容性',
        link: link('/guide/compatibility'),
      },
      { text: 'Vue 2', link: english ? '/en/vue2/' : '/vue2/' },
    ],
    sidebar: [
      {
        text: `${vue2 ? 'Vue 2 · ' : ''}${english ? 'Getting started' : '开始使用'}`,
        items: [
          {
            text: english ? 'Installation' : '快速上手',
            link: link('/guide/getting-started'),
          },
          {
            text: english ? 'Fullscreen modes' : '全屏方式',
            link: link('/guide/modes'),
          },
          {
            text: english ? 'Compatibility' : '兼容性',
            link: link('/guide/compatibility'),
          },
        ],
      },
      {
        text: english ? 'Usage' : '使用方法',
        items: [
          {
            text: english ? 'Component' : '组件',
            link: link('/guide/component'),
          },
          {
            text: english ? 'Directive' : '指令',
            link: link('/guide/directive'),
          },
          { text: 'API', link: link('/guide/api') },
          { text: english ? 'Examples' : '交互示例', link: link('/examples') },
        ],
      },
      {
        text: english ? 'Reference' : '参考',
        items: [
          {
            text: english ? 'API reference' : '完整 API',
            link: link('/reference/api'),
          },
          { text: english ? 'FAQ' : '常见问题', link: link('/guide/faq') },
          {
            text: english ? 'Feedback' : '问题反馈',
            link: link('/contributing'),
          },
        ],
      },
    ],
  }
}

export default defineConfig({
  title: 'vue-fullscreen',
  base: process.env.DOCS_BASE || '/',
  cleanUrls: true,
  lastUpdated: true,
  head: [['meta', { name: 'theme-color', content: '#646cff' }]],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: 'Vue 的全屏组件、指令与 API。',
      themeConfig: {
        ...navigation(false),
        sidebar: {
          '/vue2/': navigation(false, true).sidebar,
          '/': navigation(false).sidebar,
        },
        langMenuLabel: '切换语言',
        outline: { label: '本页内容', level: [2, 3] },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新' },
        sidebarMenuLabel: '目录',
        returnToTopLabel: '返回顶部',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色主题',
        darkModeSwitchTitle: '切换到深色主题',
        skipToContentLabel: '跳转到内容',
        notFound: {
          title: '页面不存在',
          quote: '请检查地址，或返回首页查看文档。',
          linkLabel: '返回首页',
          linkText: '返回首页',
        },
        footer: {
          message: '基于 MIT 许可发布',
          copyright: 'vue-fullscreen · mirari',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      description: 'Fullscreen components, directives and API for Vue.',
      themeConfig: {
        ...navigation(true),
        sidebar: {
          '/en/vue2/': navigation(true, true).sidebar,
          '/en/': navigation(true).sidebar,
        },
        langMenuLabel: 'Change language',
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous page', next: 'Next page' },
        lastUpdated: { text: 'Last updated' },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'vue-fullscreen · mirari',
        },
      },
    },
  },
  themeConfig: {
    siteTitle: 'vue-fullscreen',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mirari/vue-fullscreen' },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '没有找到相关内容',
                resetButtonTitle: '清除搜索',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
  },
  vite: {
    resolve: {
      alias: {
        'vue-fullscreen': fileURLToPath(
          new URL('../../packages/vue3/src/index.ts', import.meta.url),
        ),
      },
      dedupe: ['vue'],
    },
  },
})

import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  lang: 'zh-CN',
  title: 'vue-fullscreen',
  description: '为 Vue 2 和 Vue 3 添加全屏体验：组件、指令和 API，按需选择。',
  base: process.env.DOCS_BASE || '/vue-fullscreen/',
  cleanUrls: true,
  lastUpdated: true,
  head: [['meta', { name: 'theme-color', content: '#646cff' }]],
  themeConfig: {
    siteTitle: 'vue-fullscreen',
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '交互示例', link: '/examples' },
      { text: '参考', link: '/reference/api' },
      { text: '版本与迁移', link: '/guide/compatibility' },
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '快速上手', link: '/guide/getting-started' },
          { text: '选择全屏方式', link: '/guide/modes' },
          { text: 'Vue 2 / Vue 3 与迁移', link: '/guide/compatibility' },
        ],
      },
      {
        text: '用法与示例',
        items: [
          { text: '组件 · 跟随状态', link: '/guide/component' },
          { text: '指令 · 点击触发', link: '/guide/directive' },
          { text: 'API · 手动控制', link: '/guide/api' },
          { text: '交互实验室', link: '/examples' },
        ],
      },
      {
        text: '参考与维护',
        items: [
          { text: '完整 API', link: '/reference/api' },
          { text: '常见问题', link: '/guide/faq' },
          { text: '开发与发布', link: '/contributing' },
        ],
      },
    ],
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
    outline: { label: '本页内容', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新' },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'vue-fullscreen · mirari',
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

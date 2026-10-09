import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/consumers',
  testMatch: '*.spec.ts',
  use: {
    browserName: 'chromium',
    channel: 'chromium',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  webServer: [
    {
      command:
        'node scripts/serve-consumers.mjs tests/consumers/fixture/public 4180',
      url: 'http://127.0.0.1:4180/vue3/',
    },
    {
      command:
        'node scripts/serve-consumers.mjs tests/consumers/fixture/vite/dist 4181',
      url: 'http://127.0.0.1:4181',
    },
    {
      command: 'node tests/consumers/fixture/nuxt/.output/server/index.mjs',
      env: { PORT: '4182', HOST: '127.0.0.1' },
      url: 'http://127.0.0.1:4182',
    },
  ],
})

import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/browser',
  use: {
    browserName: 'chromium',
    // Use full Chromium's new headless mode; headless shell lacks native fullscreen.
    channel: 'chromium',
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  webServer: [
    {
      command:
        'pnpm --filter @vue-fullscreen/vue2 dev --port 4172 --strictPort',
      url: 'http://localhost:4172',
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        'pnpm --filter @vue-fullscreen/vue3 dev --port 4173 --strictPort',
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env.CI,
    },
  ],
})

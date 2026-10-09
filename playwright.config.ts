import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/browser',
  use: {
    browserName: 'chromium',
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  webServer: [
    {
      command:
        'npm run dev -w @vue-fullscreen/vue2 -- --port 4172 --strictPort',
      url: 'http://localhost:4172',
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        'npm run dev -w @vue-fullscreen/vue3 -- --port 4173 --strictPort',
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env.CI,
    },
  ],
})

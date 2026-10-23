import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/browser',
  outputDir: 'test-results/browser',
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [
        ['list'],
        ['html', { outputFolder: 'playwright-report/browser', open: 'never' }],
      ]
    : 'list',
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        // Full Chromium is required for native fullscreen coverage.
        channel: 'chromium',
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
        },
      },
    },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
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

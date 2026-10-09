import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/docs',
  use: {
    baseURL: 'http://localhost:4174/',
    browserName: 'chromium',
    // Use full Chromium's new headless mode; headless shell lacks native fullscreen.
    channel: 'chromium',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  webServer: {
    command: 'npm run docs:build && npm run docs:preview -- --port 4174',
    url: 'http://localhost:4174/',
    timeout: 120000,
    reuseExistingServer: false,
  },
})

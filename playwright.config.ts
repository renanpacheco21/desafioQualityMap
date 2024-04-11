import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'src/scenarios',
  timeout: 60000,
  retries: 0,
  use: {
    trace: 'on',
    locale: 'pt-BR',
    headless: false,
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'on'
  },
  expect: {
    timeout: 30000
  },
  reporter: [
    [
      'html',
      {
        outputFolder: 'artifacts/report',
        open: 'never'
      }
    ]
  ]
};
export default config;

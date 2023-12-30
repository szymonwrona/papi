import { defineConfig } from '@playwright/test';

require('dotenv').config()

export default defineConfig({
  testDir: './tests',

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  fullyParallel: true,      

  reporter: [["list"], ["html"]], 
  
  use: {
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,

    // extraHTTPHeaders: {
    //   'key': process.env.API_KEY as string,
    //   'token': process.env.API_TOKEN as string,
    // },
  },

  projects: [
    {
      name: 'Setup before tests',
      testMatch: /...setup.ts/
    },
  
    {
      name: 'Cleanup after tests',
      testMatch: /...delete-board.ts/
    },

    {
      name: 'api',
      dependencies: ['Setup before tests'],
      teardown: 'Cleanup after tests'
    },
  ]
});

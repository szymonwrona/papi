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
  },

  projects: [
    {
      name: 'Create board', 
      testMatch: /...setup.ts/
    },
  
    {
      name: 'Delete board',
      testMatch: /...delete-board.ts/
    },

    {
      name: 'api',
      dependencies: ['Create board'],
      teardown: 'Delete board'
    },
  ]
});

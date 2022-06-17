import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './src/tests',
    reporter: 'list',
    forbidOnly: !!process.env.CI,
    maxFailures: process.env.CI ? 10 : undefined,
    workers: 4, // set to 1 to disable parallelism
    // fullyParallel: true, // Parallelize tests in a single file
    projects: [
        {
            name: 'mdm',
            use: {
                baseURL: 'http://localhost:3000',
                headless: false,
                // Tell all tests to load signed-in state from 'storageState.json'.
                storageState: 'storageState.json',
                ...devices['Desktop Chrome'],
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                trace: 'retain-on-failure',
            }
        },
        {
            name: 'git',
            use: {
                baseURL: 'https://api.github.com',
                extraHTTPHeaders: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'token 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'
                }
            }
        }
    ],
};
export default config;

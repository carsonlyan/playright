import { chromium, test } from '@playwright/test';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

test('login browser', async () => {
    test.setTimeout(300*1000);
    const browser = await chromium.launch({ headless: false });// a browser could have multiple contexts
    const context = await browser.newContext();// a context could have multiple pages, each context is isolated env
    const page = await context.newPage();// a page is the smallest unit, each page is a tag
    await page.goto('http://localhost:8001/');
    const loginPage = new LoginPage(page);
    await loginPage.run();
    const homePage = new HomePage(page);
});

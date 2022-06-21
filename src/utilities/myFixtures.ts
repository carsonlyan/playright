import { test as base } from '@playwright/test';

import LoginPage from '../pages/login-page/LoginPage';

export const test = base.extend({
    page: async ({ page, context }, use) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        const resLogin = await loginPage.login();
        if (resLogin) {
            context.storageState({ path: 'storageState.json' })
        }
        await use(page);
    }
})

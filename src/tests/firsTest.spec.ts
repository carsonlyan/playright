import { chromium, test, expect } from '@playwright/test';

import LoginPage from '../pages/login-page/LoginPage';

test('test filter', async () => {
    test.setTimeout(300*1000);
    const browser = await chromium.launch({ headless: false });// a browser could have multiple contexts
    const context = await browser.newContext();// a context could have multiple pages, each context is isolated env
    const page = await context.newPage();// a page is the smallest unit, each page is a tag
    await page.goto('http://localhost:3000/');
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.login();
    await homePage.initComps();
    expect(homePage.filter.databanksCount).toEqual(9);
    const firstDatabank = homePage.filter.dataBankNames[0];
    const databank = await homePage.filter.checkADatabank(firstDatabank);
    await homePage.mainTable.init();
    const pagination = await homePage.mainTable.getPagination();
    expect(pagination.totalCount).toEqual(databank.count);
    // await loginPage.run();
    await page.waitForTimeout(60*1000);
});

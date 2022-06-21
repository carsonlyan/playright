import { chromium, expect } from '@playwright/test';

import { test } from '../utilities/myFixtures';
import LoginPage from '../pages/login-page/LoginPage';
import HomePage from '../pages/home-page/HomePage';

test.only('test filter', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    await homePage.initComps();
    expect(homePage.filter.databanksCount).toEqual(9);
    const firstDatabank = homePage.filter.dataBankNames[0];
    const databank = await homePage.filter.checkADatabank(firstDatabank);
    await homePage.mainTable.init();
    const pagination = await homePage.mainTable.getPagination();
    expect(pagination.totalCount).toEqual(databank.count);
    expect(page).toHaveScreenshot();
    // await page.waitForTimeout(60*1000);
});

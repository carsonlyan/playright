import { chromium, test, expect } from '@playwright/test';

import LoginPage from '../pages/login-page/LoginPage';
import HomePage from '../pages/home-page/HomePage';

test('test filter', async ({ page }, testInfo) => {
    await page.goto('http://localhost:3000/');
    const homePage = await new HomePage(page);;
    await homePage.initComps();
    expect(homePage.filter.databanksCount).toEqual(9);
    const firstDatabank = homePage.filter.dataBankNames[0];
    const databank = await homePage.filter.checkADatabank(firstDatabank);
    await homePage.mainTable.init();
    const pagination = await homePage.mainTable.getPagination();
    expect(pagination.totalCount).toEqual(databank.count);
    // await page.waitForTimeout(60*1000);
});

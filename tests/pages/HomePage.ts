import { Page, Locator } from '@playwright/test';

import { BasePage, InvalidPageException } from './BasePage';

class HomePage extends BasePage {
    private _headerTitleSelector = 'p:has-text("Nucleo Enrich")';
    constructor(page: Page) {
        super(page);
    }

    public async run(): Promise<void> {
    }

    protected _validatePage(page: Page): void {
        try{
            page.locator(this._headerTitleSelector);
        } catch {
            throw new InvalidPageException('Home page is not loaded');
        }
    }
}

export default HomePage;

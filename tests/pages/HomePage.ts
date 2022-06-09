import { Page, Locator } from '@playwright/test';

import { BasePage, InvalidPageException } from './BasePage';

class HomePage extends BasePage {
    private _title = 'Material Center NG';
    constructor(page: Page) {
        super(page);
    }

    protected async _validatePage(): Promise<void> {
        const title = await this.page.title();
        if (title !== this._title) {
            throw new InvalidPageException('Home page is not loaded.');
        }
    }
}

export default HomePage;

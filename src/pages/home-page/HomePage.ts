import { Page, Locator } from '@playwright/test';

import Filter from './components/Filter';
import MainTable from './components/MainTable';
import { BasePage, InvalidPageException } from '../BasePage';

class HomePage extends BasePage {
    private _title = 'Material Center NG';

    filter: Filter;
    mainTable: MainTable;
    constructor(page: Page) {
        super(page);
        this.filter = new Filter(page);
        this.mainTable = new MainTable(page);
    }

    public async initComps(): Promise<void> {
        await Promise.all([
            this.filter.init(),
            this.mainTable.init()
        ])
    }

    protected async _validatePage(): Promise<void> {
        const title = await this.page.title();
        if (title !== this._title) {
            throw new InvalidPageException('Home page is not loaded.');
        }
    }
}

export default HomePage;

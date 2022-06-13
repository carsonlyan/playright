import { Page, Locator, ElementHandle  } from '@playwright/test';

import { CheckStatus } from '../../share/types/check-status.enum';

interface Databank {
    ele: ElementHandle<Node>;
    name: string;
    count: number;
    status?: CheckStatus;
}

class Filter {
    private _filterConfigSelectLocator: Locator;
    private _addFilterConfigButtonLocator: Locator;

    private _databankExpandIconLocator: Locator;
    private _databankItemsLocator: Locator;

    private _propertyExpandIconLocator: Locator;
    private _propertySelectLocator: Locator;
    private _clearAllPropertiesButtonLocator: Locator;
    private _propertyListBoxLocator: Locator;
    private _propertyItemsLocator: Locator;

    private _databanks: Databank[] | undefined = undefined;

    page: Page;

    constructor(page: Page) {
        this.page = page;

        this._filterConfigSelectLocator = this.page.locator('div[data-testid="FilterConfig-GenericConfig"]');
        this._addFilterConfigButtonLocator = this.page.locator('span:has-text("Add new configuration")');

        this._databankExpandIconLocator = this.page.locator('div#databankFilter-header svg[data-testid="ExpandMoreIcon"]');
        this._databankItemsLocator = this.page.locator('div[data-testid^="DatabankFilter-"]');

        this._propertyExpandIconLocator = this.page.locator('div#materialPropertyFilter-header svg[data-testid="ExpandMoreIcon"]');
        this._propertySelectLocator = this.page.locator('label:has-text("Search and select")');
        this._clearAllPropertiesButtonLocator = this.page.locator('div[data-testid="MaterialPropertyFilter-SelectProperty"] [button:has-text("Clear All")]');
        this._propertyListBoxLocator = this.page.locator('ul.MuiAutocomplete-listbox');
        this._propertyItemsLocator = this.page.locator('div[data-testid^="MaterialPropertyFilter-"]');
    }

    public async init(): Promise<void> {
        await this.page.waitForResponse((resp) => resp.url() === 'http://mcng-develop.westeurope.cloudapp.azure.com/material-search/search/databanks/AllMaterials' && resp.status() === 200);
        await this._initDatabanks();
    }

    private async _initDatabanks(): Promise<void> {
        const databankItems = await this._databankItemsLocator.elementHandles();
        this._databanks = [];
        for (let index=0; index<databankItems.length; index++) {
            const ele = databankItems[index];
            const innerText = await ele.innerText();
            const matchCount = innerText.match(/\((\d+)\)/);
            const count = matchCount ? parseInt(matchCount[1]) : 0;
            const name = innerText.split(' (')[0];
            this._databanks.push({ ele, count, name });
        }
    }

    public async checkADatabank(name: string): Promise<Databank> {
        if (!this._databanks) {
            throw new Error('this._databanks is not initialized yet.');
        }
        const databank = this._databanks.find((o) => o.name === name);
        if (!databank) {
            return new Promise((_, reject) => reject());
        }
        const checkbox = await databank.ele.$('input[type="checkbox"]');
        if (!checkbox) {
            return new Promise((_, reject) => reject());
        }
        await checkbox.click()
        return databank;
    }

    public get databanksCount(): number {
        if (!this._databanks) {
            throw new Error('this._databanks is not initialized yet.');
        }
        return this._databanks.length;
    }

    public get dataBankNames(): string[] {
        if (!this._databanks) {
            throw new Error('this._databanks is not initialized yet.');
        }
        return this._databanks.map((o) => o.name);
    }

    public get materialCount(): number {
        if (!this._databanks) {
            throw new Error('this._databanks is not initialized yet.');
        }
        let resCount = 0;
        this._databanks.forEach((databank) => resCount += databank.count);
        return resCount;
    }
}

export default Filter;

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

    private _databanks: Databank[];
    private _isInited: boolean;

    page: Page;

    constructor(page: Page) {
        this.page = page;
        this._databanks = [];
        this._isInited = false;

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
        await this._initDatabanks();
        this._isInited = true;
    }

    private _checkIfInit(): void {
        if (!this._isInited) {
            throw new Error('It must call "init" function first of all.');
        }
    }

    private async _initDatabanks(): Promise<void> {
        const databankItems = await this._databankItemsLocator.elementHandles();
        for (let index=0; index<databankItems.length; index++) {
            const ele = databankItems[index];
            const innerText = await ele.innerText();
            const matchCount = innerText.match(/\((\d+)\)/);
            const count = matchCount ? parseInt(matchCount[0]) : 0;
            const name = innerText.split(' (')[0];
            this._databanks.push({ ele, count, name });
        }
    }

    public async checkADatabank(name: string): Promise<boolean> {
        const databank = this._databanks.find((o) => o.name === name);
        if (!databank) {
            return new Promise((resolve) => resolve(false));
        }
        const checkbox = await databank.ele.$('input[type="checkbox"]');
        if (!checkbox) {
            return new Promise((resolve) => resolve(false));
        }
        await checkbox.click()
        return new Promise((reslove) => reslove(true));
    }

    public get databanksCount(): number {
        this._checkIfInit();
        return this._databanks.length;
    }

    public get dataBankNames(): string[] {
        return this._databanks.map((o) => o.name);
    }

    public get materialCount(): number {
        this._checkIfInit();
        let resCount = 0;
        this._databanks.forEach((databank) => resCount += databank.count);
        return resCount;
    }
}

export default Filter;

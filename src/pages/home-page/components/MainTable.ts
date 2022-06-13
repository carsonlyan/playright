import { Page, Locator, ElementHandle } from '@playwright/test';

interface Pagination {
    rowsPerPage: number;
    currentPage: number;
    totalPage: number;
    totalCount: number;
}

class MainTable {
    private _headerItemsLocator: Locator;
    private _bodyLocator: Locator;
    private _paginationLocator: Locator;

    page: Page;
    constructor(page: Page) {
        this.page = page;
        this._headerItemsLocator = page.locator('th[data-testid="TableRow-TableCell"][role="columnheader"]');
        this._bodyLocator = page.locator('tbody[data-testid="SearchTable-TableBody"]');
        this._paginationLocator = page.locator('div[data-testid="SearchTable-TablePagination"]');
    }

    public async init(): Promise<void> {
        await this.page.waitForResponse(
            (resp) =>
                resp.url() === 'http://mcng-develop.westeurope.cloudapp.azure.com/material-search/search/materials' &&
                resp.status() === 200
        );
    }

    public async getHeaderNames(): Promise<string[]> {
        return new Promise(async (resolve, reject) => {
            const headerEles = await this._headerItemsLocator.elementHandles();
            if (!headerEles.length) {
                reject();
            }
            const res: string[] = [];
            for (let index = 0; index < headerEles.length; index++) {
                const headerEle = headerEles[index];
                const header = await headerEle.innerText();
                res.push(header);
            }
            resolve(res);
        })
    }

    public async getPagination(): Promise<Pagination> {
        return new Promise(async (resolve, reject) => {
            const paginationInfo = await this._paginationLocator.allInnerTexts();
            const resMatch = paginationInfo[0].match(/(\d+)/g);
            if (!resMatch) {
                reject();
                return;
            }
            const [rowsPerPage, currentPage, totalPage, totalCount] = resMatch.map((o) => parseInt(o));
            resolve({ rowsPerPage, currentPage, totalPage, totalCount });
        })
    }
}

export default MainTable;

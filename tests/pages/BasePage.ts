import { chromium, Page } from '@playwright/test';

export abstract class BasePage {
    public page: Page;
    constructor(page: Page) {
        this._validatePage(page);
        this.page = page;
    }

    protected abstract _validatePage(page: Page): void;
}

export class InvalidPageException extends Error {
    constructor(message: string) {
        super(message);
    }
};

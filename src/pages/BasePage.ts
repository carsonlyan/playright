import { Page } from '@playwright/test';

export abstract class BasePage {
    public page: Page;
    constructor(page: Page) {
        this.page = page;
        this._validatePage();
    }

    protected async _validatePage(): Promise<void> {
        throw new NoImplementationException('Funtion "_validatePage" must be implemented.');
    };
}

export class InvalidPageException extends Error {
    constructor(message: string) {
        super(message);
    }
};

export class NoImplementationException extends Error {
    constructor(message: string) {
        super(message);
    }
};

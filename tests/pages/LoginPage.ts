import { Page } from '@playwright/test';

import { BasePage } from './BasePage';

class LoginPage extends BasePage {
    private _loginButtonSelector = 'button:has-text("LOGIN")';
    private _usernameInputSelector = 'input[id="username"]';
    private _continueButtonSelector = 'button:has-text("Continue")';
    private _pswInputSelector = 'input[type="password"]';
    private _submitButtonSelector = 'input[type="submit"]';

    constructor(page: Page) {
        super(page);
    }

    public async run(): Promise<void> {
        await this.page.locator(this._loginButtonSelector).click();
        const userNameInput = this.page.locator(this._usernameInputSelector);
        await userNameInput.type('qun.chen@hexagon.com');
        await userNameInput.press('Enter');
        const pswInput = this.page.locator(this._pswInputSelector);
        await pswInput.type('Windows@chenqun');
        await pswInput.press('Enter');
        await this.page.locator(this._submitButtonSelector).click();
    }

    protected _validatePage(page: Page): void {
        return;
    }
}

export default LoginPage;

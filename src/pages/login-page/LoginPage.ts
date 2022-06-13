import { Page } from '@playwright/test';

import { BasePage } from '../BasePage';
import HomePage from '../home-page/HomePage';

class LoginPage extends BasePage {
    private _loginButtonSelector = 'button:has-text("LOGIN")';
    private _usernameInputSelector = 'input[id="username"]';
    private _continueButtonSelector = 'button:has-text("Continue")';
    private _pswInputSelector = 'input[type="password"]';
    private _submitButtonSelector = 'input[type="submit"]';

    constructor(page: Page) {
        super(page);
    }

    public async login(): Promise<HomePage> {
        const userNameInput = this.page.locator(this._usernameInputSelector);
        await userNameInput.type('qun.chen@hexagon.com');
        await userNameInput.press('Enter');
        const pswInput = this.page.locator(this._pswInputSelector);
        await pswInput.type('Windows@chenqun');
        await pswInput.press('Enter');
        await this.page.locator(this._submitButtonSelector).click();
        await this.page.waitForResponse((resp) => resp.url() === 'https://auth.dev.nexus.hexagon.com/oauth/token' && resp.status() === 200)
        return new HomePage(this.page);
    }

    protected async _validatePage(): Promise<void> {}
}

export default LoginPage;

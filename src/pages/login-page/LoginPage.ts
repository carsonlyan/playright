import { Page } from '@playwright/test';

import { BasePage } from '../BasePage';

class LoginPage extends BasePage {
    private _loginButtonSelector = 'button:has-text("LOGIN")';
    private _usernameInputSelector = 'input[id="username"]';
    private _continueButtonSelector = 'button:has-text("Continue")';
    private _pswInputSelector = 'input[type="password"]';
    private _submitButtonSelector = 'input[type="submit"]';

    constructor(page: Page) {
        super(page);
    }

    public async login(): Promise<boolean> {
        const userNameInput = this.page.locator(this._usernameInputSelector);
        let isLogined = false;
        if (await userNameInput.isVisible()) {
            isLogined = true;
            await userNameInput.type('qun.chen@hexagon.com');
            await userNameInput.press('Enter');
            const pswInput = await this.page.locator(this._pswInputSelector);
            if (await pswInput.isVisible({ timeout: 5*1000 })) {
                await pswInput.type('Windows@chenqun');
                await pswInput.press('Enter');
                await this.page.locator(this._submitButtonSelector).click();
            }
        }
        await this.page.waitForResponse((resp) => resp.url() === 'https://auth.dev.nexus.hexagon.com/oauth/token' && resp.status() === 200)
        return isLogined;
    }

    protected async _validatePage(): Promise<void> {}
}

export default LoginPage;

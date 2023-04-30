import { expect } from '@playwright/test';

export class VkComIDPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.passwordInput = page.locator('xpath=//input[@name=\'password\']');
    this.continueButton = page.locator('.vkuiButton');
    this.errorMessagePassword = page.locator('.vkc__TextField__errorMessage');
    this.errorMessageLogin = page.locator('.vkuiFormItem__bottom');
  }

  async fillPassword(value) {
    await this.passwordInput.fill(value);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async WrongPassword() {
    return await this.errorMessagePassword.isVisible();
  }

  async WrongLogin() {
    return await this.errorMessageLogin.isVisible();
  }

}
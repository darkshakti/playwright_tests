import { expect } from '@playwright/test';
import { VkComIDPage } from './vk-com-ID-page';

export class VkIDLoginForm {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginInput = page.locator('#index_email');
    this.signInButton = page.locator('xpath=//button[@type=\'submit\']');
  }

  async goto() {
    await this.page.goto('https://vk.com');
  }

  async fillLogin(value) {
    await this.loginInput.fill(value);
  }

  async clickSingIn() {
    await this.signInButton.click();
  }
}
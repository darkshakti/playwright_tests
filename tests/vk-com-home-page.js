import { expect } from '@playwright/test';

export class VkComHomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.MyPagelink = page.locator('.LeftMenuItem-module__label--itYtZ');
    this.OwnerPageName = page.locator('#owner_page_name');
  }

  async clickMyPage() {
    await this.MyPagelink.first().click();
  }

  async checkOwnerName() {
    return await this.OwnerPageName.innerText();
  }
}
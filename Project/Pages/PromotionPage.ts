import { Page } from "@playwright/test";

export class PromotionPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getHeaderText() {
    let headerName = await this.page
      .locator('h1[class="pagehead-container__header"]')
      .textContent();
    return headerName;
  }
}

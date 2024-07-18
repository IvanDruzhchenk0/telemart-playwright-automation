import { Page } from "@playwright/test";

export class FilteringResultsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnItem(number: number){
    await this.page.locator('//*[@id="catalogList"]//*[@class="product-item__title"]/a').nth(number).click();
  }
}
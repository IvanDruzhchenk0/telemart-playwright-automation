import { Page, expect } from "@playwright/test";

export class SearchResultsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkHeader(searchResult: string){
    await expect(this.page.locator('//div[@class="page-main-header"]')).toContainText(searchResult);
  }

  async clickOnSearchResult(searchInput: string) {
    await this.page
      .locator(
        `//*[@class="product-item__title"]/a[contains(text(), '${searchInput}')]`
      )
      .click();
  }
}

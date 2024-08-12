import { Page } from "@playwright/test";

export class SearchResultsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnSearchResult(searchInput: string) {
    await this.page
      .locator(
        `//*[@class="product-item__title"]/a[contains(text(), '${searchInput}')]`
      )
      .click();
  }
}

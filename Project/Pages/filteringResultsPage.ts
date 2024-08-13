import { expect, Page } from "@playwright/test";

export class FilteringResultsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnItemInList(number: number) {
    await this.page
      .locator('//*[@id="catalogList"]//*[@class="product-item__title"]/a')
      .nth(number)
      .click();
  }

  async checkFiltersApplication(numberOfFilters: number){
    const filterSelection = this.page.locator('//div[@class="category-main-container"]//div[@class="filter-selected-items__list"]/button');
    const numberOfSelectedFilters = await filterSelection.count();
    expect(numberOfFilters).toEqual(numberOfSelectedFilters);


  }
}

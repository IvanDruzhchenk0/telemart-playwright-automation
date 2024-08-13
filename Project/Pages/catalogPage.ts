import { Page, expect } from "@playwright/test";

export class CatalogPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openFilterOptions(filterName: string) {
    await this.page
      .locator(
        `//div[@class="filter-item__head"][contains(text(), "${filterName}")]`
      )
      .click();
  }
  async openMultipleFilterOptions(listOfOptions: Array<string>) {
    for (const option of listOfOptions) {
      await this.page
        .locator(
          `//div[@class="filter-item__head"][contains(text(), "${option}")]`
        )
        .click();
    }
  }

  async applyFilter(filterID: string) {
    await this.page.locator(`label[for="${filterID}"]`).check();
    await expect(this.page.locator(`label[for="${filterID}"]`)).toBeChecked();
  }

  async applyMultipleFilters(listOfFilters: Array<string>) {
    for (const filter of listOfFilters) {
      await this.page.locator(`label[for="${filter}"]`).check();
      await expect(this.page.locator(`label[for="${filter}"]`)).toBeChecked();
    }
  }

  async submitFiltering() {
    await this.page
      .locator(
        '//div[@class="filter-option-apply"]/a[contains(text(), "Показати")]'
      )
      .click();
  }
}

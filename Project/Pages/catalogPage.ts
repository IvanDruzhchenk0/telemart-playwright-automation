import { Page, expect } from "@playwright/test";

export class CatalogPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openFilterOptions(filterTarget: string) {
    await this.page
      .locator(
        `//div[@class="filter-item__head"][@data-bs-target="${filterTarget}"]`
      )
      .click();
  }
  async openMultipleFilterOptions(listOfTargets: Array<string>) {
    for (const target of listOfTargets) {
      await this.page
        .locator(
          `//div[@class="filter-item__head"][@data-bs-target="${target}"]`
        )
        .click();
    }
  }

  async applyFilter(filterID: string) {
    await this.page.locator(`label[for="${filterID}"]`).check();
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/filter/") &&
        response.status() === 200 &&
        response.request().method() === "GET",
      { timeout: 6000 }
    );
    await expect(this.page.locator(`label[for="${filterID}"]`)).toBeChecked();
  }

  async applyMultipleFilters(listOfFilters: Array<string>) {
    for (const filter of listOfFilters) {
      await this.page.locator(`label[for="${filter}"]`).check();
      await this.page.waitForResponse(
        (response) =>
          response.url().includes("/filter/") &&
          response.status() === 200 &&
          response.request().method() === "GET",
        { timeout: 6000 }
      );
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

  async compareNthItem(buttonNumbers: Array<number>) {
    for (const button of buttonNumbers) {
      await this.page
        .locator(
          '//div[@class="product-btns"]/button[contains(@class, "btn_compare")]'
        )
        .nth(button)
        .click();
      await this.page
        .locator(
          `//div[contains(text(), "Товар додан")]/parent::*/preceding-sibling::*/button`
        )
        .click();
    }
  }

  async checkURL(URL: string) {
    await expect(this.page).toHaveURL(URL);
  }
}

export enum Filters {
  ResolutionSelection = "filterOption301-1013-22721",
  DiagonalSelection = "filterOption301-1012-22707",
  AspectRatioSelection = "filterOption301-1015-22736",
  MonitorTypeSelection = "filterOption301-1596-26795",
  ResponseTimeSelection = "filterOption301-1261-24353",
}

export enum FilterOptions {
  AspectRatio = "#filterItem-301-1015",
  Type = "#filterItem-301-1596",
  ResponseTime = "#filterItem-301-1261",
}

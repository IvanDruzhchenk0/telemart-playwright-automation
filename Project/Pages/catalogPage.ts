import { Page } from "@playwright/test";

export class CatalogPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async applyFilter(filterID: string){
    await this.page.locator(`label[for="${filterID}"]`).check();
  }

  async openFilterOptions(filterName: string){
    await this.page.locator(`//div[@class="filter-item__head"][contains(text(), "${filterName}")]`).click();
  }

  async submitFiltering(){
    await this.page.locator('//div[@class="filter-option-apply"]/a[contains(text(), "Показати")]').click();
  }
}
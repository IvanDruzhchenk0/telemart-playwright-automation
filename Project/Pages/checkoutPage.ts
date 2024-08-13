import { Page, expect } from "@playwright/test";

export class CheckOutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkProductInBucket(productName: string){
    await expect(this.page.locator(`//div[@class="thanks-page__product"]//div[contains(@class, "product-title") and contains(text(), "${productName}")]`)).toBeVisible();
  }

  async fillSurname(surname: string) {
    await this.page.locator('[id="customerLastname"]').fill(surname);
  }

  async fillName(name: string) {
    await this.page.locator('[id="customerLastname"]').fill(name);
  }

}

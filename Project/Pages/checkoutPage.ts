import { Page, expect } from "@playwright/test";

export class CheckOutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkURL(URL: string) {
    await expect(this.page).toHaveURL(URL);
  }

  async checkProductInBucket(productName: string) {
    await expect(
      this.page.locator(
        `//div[@class="thanks-page__product"]//div[contains(@class, "product-title") and contains(text(), "${productName}")]`
      )
    ).toBeVisible();
  }

  async fillSurname(surname: string) {
    await this.page.locator('[id="customerLastname"]').fill(surname);
    await expect(
      this.page.locator(`//input[@id="customerLastname"][@value='${surname}']`)
    ).toBeVisible();
  }

  async fillName(name: string) {
    await this.page.locator('[id="customerFirstname"]').fill(name);
    await expect(
      this.page.locator(`//input[@id="customerFirstname"][@value='${name}']`)
    ).toBeVisible();
  }
}

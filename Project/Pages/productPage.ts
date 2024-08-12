import { Page } from "@playwright/test";

export class ProductPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickBuyButton() {
    await this.page.locator('//a/span[contains(text(), "Купити")]').click();
  }

  async clickCheckoutButton() {
    await this.page
      .locator(
        '//*[@class="bag-total"]//a[contains(text(), "Оформити замовлення")]'
      )
      .click();
  }
}

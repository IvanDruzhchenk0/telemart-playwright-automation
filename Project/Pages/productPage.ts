import { Page, expect } from "@playwright/test";

export class ProductPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickBuyButton() {
    await this.page.locator('//a/span[contains(text(), "Купити")]').click();
  }

  async clickCheckoutButton() {
    const modal = this.page.locator('//div[@class="bag-total"]');
    await modal.waitFor({state: "visible"});
    await this.page
      .locator(
        '//*[@class="bag-total"]//a[contains(text(), "Оформити замовлення")]'
      )
      .click();
  }

  async checkParameter(parameters: Array<object>){
    for (const parameter of parameters){
      await expect(this.page.locator(`//div[@class="card-block__info-item"]/div[contains(text(), "${Object.keys(parameter)}")]`)).toBeVisible();
      await expect(this.page.locator(`//div[@class="card-block__info-item"]/div[contains(text(), "${Object.values(parameter)}")] | //div[@class="card-block__info-item"]/div/a[contains(text(), "${Object.values(parameter)}")]`)).toBeVisible();
    }
  }

  async getProductName(){
    const productName = await this.page.locator('h1[class="card-block__title"]').textContent();
    const withRemovedSpecialCharacters = productName?.replace(/\w+[A-Z0-9.]\w.*\w+[A-Z0-9".]\w.*/g, '');
    return withRemovedSpecialCharacters;
  }
}

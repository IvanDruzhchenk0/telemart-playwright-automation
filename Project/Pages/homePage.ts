import { Page, expect } from "@playwright/test";

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToBaseURL() {
    await this.page.goto("");
  }

  async confirmCityModal() {
    await this.page
      .locator('//*[@role="tooltip"]//button[contains(text(), "Так, вірно")]')
      .click();
    await expect(
      this.page.locator('//div[@class="header-select-city"]/button/span')
    ).toHaveText("Київ");
    await expect(
      this.page.locator(
        '//*[@role="tooltip"]//button[contains(text(), "Так, вірно")]'
      )
    ).toBeHidden();
  }

  async searchWithSearchBar(input: string) {
    await this.page.locator('[name="search_que"]').fill(input);
    await this.page.locator('[name="search_que"]').press("Enter");
  }

  async filterByCatalog(category: string, subcategoryLink: string) {
    await this.page
      .locator(
        `//div[@class="content"]//button[@class="nav-link"]/span[text()="${category}"]`
      )
      .hover();
    await this.page
      .locator(
        `//div[@class="content"]//*[@class="catalog-box__item"]//a[contains(@href, "${subcategoryLink}")]`
      )
      .click();
  }

  async getListTextContents(className: string) {
    let textContents = await this.page
      .locator(`//*[@class="${className}"]//*[@class="article-item__title"]`)
      .allTextContents();
    return textContents;
  }

  async clickOnArticleItem(item: string) {
    await this.page
      .locator(
        `//*[@class="article-item__title"]//*[contains(text(), "${item}")]`
      )
      .click();
  }

  async clickButton(buttonLocator: string) {
    await this.page.locator(buttonLocator).click();
  }
}

export enum MainFilter {
  Components = "Комплектуючі",
  PC = "Комп'ютери",
}

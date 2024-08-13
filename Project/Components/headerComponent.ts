import { Page } from "@playwright/test";

export class HeaderComponent {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickButton(buttonLink: string){
    await this.page.locator(`//div[@class="header-center"]//a[contains(@href, "${buttonLink}")]`).click();
  }

}
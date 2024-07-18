import { Page } from "@playwright/test";

export class CheckOutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillSurname(surname: string) {
    await this.page.locator('[id="customerLastname"]').fill(surname);
  }

  async fillName(name: string) {
    await this.page.locator('[id="customerLastname"]').fill(name);
  }
}

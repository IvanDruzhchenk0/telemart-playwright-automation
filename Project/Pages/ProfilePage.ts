import { Page, expect } from "@playwright/test";

export class ProfilePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkHeader() {
    await expect(
      this.page.locator('h1[class="pagehead-container__header"]')
    ).toBeVisible();
    await expect(
      this.page.locator('h1[class="pagehead-container__header"]')
    ).toHaveText("Особистий кабінет");
  }

  async checkTabName(numberOfTab: number, sectionName: string) {
    await expect(
      this.page.locator('h2[class="cabinet-section__title"]').nth(numberOfTab)
    ).toHaveText(sectionName);
  }

  async checkPersonalData(defaultData: Array<string>) {
    for (const data of defaultData) {
      await expect(
        this.page.locator(
          `//div[@class="my-data-item__value" and (text()="${data}")]`
        )
      ).toBeVisible();
    }
  }

  async editPersonalData(newData: Array<string>) {
    await this.page.locator('button[data-bs-target="#profileEdit"]').click();
    await expect(this.page.locator('//div[@id="profileEdit"]')).toHaveAttribute(
      "class",
      "tab-pane fade active show"
    );
    for (const data of newData) {
      await this.page
        .locator(
          '//div[@id="profileEdit"]//div[@class="forms__item"]//input[not(contains(@name, "AccountForm[phone]"))]'
        )
        .nth(newData.indexOf(data))
        .fill(data);
    }
    await this.page
      .locator('//div[@id="profileEdit"]//button[@type="submit"]')
      .click();
    await expect(this.page
        .locator('//div[@id="profileEdit"]//button[@type="submit"]'))
        .toBeHidden();
  }

  async editPassword(passwords: Array<string>) {
    await this.page.locator('button[data-bs-target="#passwordEdit"]').click();
    await expect(
      this.page.locator('//div[@id="passwordEdit"]')
    ).toHaveAttribute("class", "tab-pane fade active show");
    for (let i = 0; i < passwords.length; i++) {
      await this.page
        .locator('//div[@id="passwordEdit"]//div[@class="forms__item"]//input')
        .nth(i)
        .fill(passwords[i]);
    }
    await this.page
      .locator('//div[@id="passwordEdit"]//button[@type="submit"]')
      .click();
    await expect(
      this.page.locator(
        '//div[@class="modal-content"]/div[@class="modal-body"]/div[contains(text(), "Пароль успішно збережено")]'
      )
    ).toBeVisible();
    await this.page
      .locator('//div[@class="modal-content"]/div[@class="modal-body"]/button')
      .click();
  }
}

export enum TabTitles {
  PersonalData = "Особисті дані",
  ChangePassword = "Зміна паролю",
}

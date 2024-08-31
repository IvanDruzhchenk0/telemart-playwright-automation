import { Page, expect } from "@playwright/test";

export const constructorButton =
  '//div[@class="quick-main-links"]//a[contains(@href, "https://telemart.ua/ua/assembly-start.html")]';
export const buildPCButton =
  '//div[@class="before-config__left-col"]//a[contains(@href, "https://telemart.ua/ua/assembly/clear")]';
export const getConsultationButton =
  '//div[@class="content"]//*[@data-bs-target="#modalRequestConsultation"]';

export class ConstructorPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkSections() {
    await expect(
      this.page.locator(
        '//div[@class="before-config__left-col"]//div[text()="Конфігуратор ПК"]'
      )
    ).toBeVisible();
    await expect(
      this.page.locator(
        '//div[@class="before-config__right-col"]/div[text()="Потрібна допомога у збірці?"]'
      )
    ).toBeVisible();
  }

  async checkHeader(text: string) {
    await expect(
      this.page.locator('h1[class="pagehead-container__header"]')
    ).toHaveText(text);
  }

  async clickButton(buttonLocator: string) {
    await this.page.locator(buttonLocator).click();
  }
}

export class FAQComponent extends ConstructorPage {
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async checkFAQ() {
    await this.page.locator('div[data-bs-target="#faqid1"]').click();
    await expect(
      this.page.locator('div[data-bs-target="#faqid1"]')
    ).toHaveAttribute("aria-expanded", "true");
    await expect(this.page.locator('div[data-bs-target="#faqid1"]')).toHaveText(
      "Інструкція зі створення конфігурації"
    );
    await expect(
      this.page.locator('div[class="faq-item__body__text"]')
    ).toBeVisible();
  }
}

export class ConsultationModal extends ConstructorPage {
page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async getConsultation(data: Array<string>) {
    await expect(
      this.page.locator(
        '//div[@class="modal-content"]/div[@class="modal-header"]/h5[text()="Запросити консультацію"]'
      )
    ).toBeVisible();
    await this.page
      .locator(
        '//div[@class="forms__item"]//input[@id="assemblycontactform-name"]'
      )
      .fill(data[0]);
    await this.page
      .locator(
        '//div[@class="forms__item"]//input[@id="assemblycontactform-phone"]'
      )
      .fill(data[1]);
    await this.page
      .locator(
        '//div[@class="forms__item"]//textarea[@id="assemblycontactform-body"]'
      )
      .fill(data[2]);
    await this.page
      .locator(`//div[@class="form-check"]//label[@for="${data[3]}"]`)
      .check();
    await this.page
      .locator('//form[@id="cAssemblyContactForm"]//button[@type="submit"]')
      .click();
    await expect(
      this.page.locator(
        '//div[@class="modal-body"]/div[contains(text(), "Ваш запит успішно прийнятий")]'
      )
    ).toBeVisible();
  }
}

export enum callReason {
  newPC = "assemblycontactform-reason0",
  upgradePC = "assemblycontactform-reason1"
}
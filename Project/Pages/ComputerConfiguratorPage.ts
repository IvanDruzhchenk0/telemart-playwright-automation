import { Page, expect } from "@playwright/test";
import { ConstructorPage } from "./ConstructorPage";

export class ComputerConfiguratorPage extends ConstructorPage{
    page: Page;

    constructor(page: Page) {
      super(page);
      this.page = page;
    }

  assembledPCs =
  '//div[@id="assembly"]//a[contains(@href, "https://telemart.ua/ua/pc/")]';
  buyButton =
  '//div[@class="configuration__info-row"]//button[contains(text(), "Купити")]';

  async checkNumberOfSections(number: number) {
    const section = this.page.locator(
      '//div[@class="configuration"]//div[@class="configuration__categoies-title"]'
    );
    await expect(section).toHaveCount(number);
  }

  async checkNumberOfItems(number: number) {
    const item = this.page.locator(
      '//div[@class="configuration__section"]//div[@class="configuration__section-link"]'
    );
    await expect(item).toHaveCount(number);
  }

  async checkSectionTitles(titles: Array<string>) {
    const sectionTitle = this.page.locator(
      'span[class="configuration__categoies-title"]'
    );
    const numberOfSectionTitles = await sectionTitle.count();
    for (let i = 0; i < numberOfSectionTitles; i++) {
      await expect(sectionTitle.nth(i)).toHaveText(titles[i]);
    }
  }

  async addComponents(componentSections: Array<number>) {
    for (const componentSection of componentSections) {
      const defaultFilters = [
        "filterOptionavailable_0",
        "filterOptioncompatible_1",
        "filterOptionrecommend_2",
      ];
      // витягую "стартовий прогрес" збірки, тобто кількість вже доданих запчастин
      const startingProgress = await this.page
        .locator('//div[@class="configuration__build-counter"]/span')
        .textContent();

      // розкриваю секцію з запчастинами (працює лише через force чомусь)
      await this.page
        .locator(
          `//div[@id="category${componentSection}"]//div[contains(@class, "configuration__section-title")]`
        )
        .click({ force: true });
      await this.page.waitForResponse(
        (response) =>
          response.url() ===
            "https://telemart.ua/ua/assembly/filter-products/" &&
          response.status() === 200 &&
          response.request().method() === "POST",
        { timeout: 6000 }
      );

      // перевіряю, що дефолтні фільтри увімкнені
      await expect(
        this.page.locator(
          '//div[@class="configuration__table"]//div[@class="configuration__table-content"]'
        )
      ).toBeVisible();
      await expect(
        this.page.locator(
          '//div[@class="configuration__section-header"]//div[contains(@class, "search-filter__item_active") and text() = "Основні"]'
        )
      ).toBeVisible();
      for (const filter of defaultFilters) {
        await expect(
          this.page.locator(
            `//div[@class="filter-selected-items__list"]/button[@id="${filter}"]`
          )
        ).toBeVisible();
      }

      // обираю першу запчастину зі списку і додаю її
      await this.page
        .locator(
          `//div[@class="configuration__table-row "]//a[@data-id_category="${componentSection}"]`
        )
        .first()
        .click({ force: true });
      await this.page.waitForResponse(
        (response) =>
          response.url() === "https://telemart.ua/ua/assembly/add-product/" &&
          response.status() === 200 &&
          response.request().method() === "POST",
        { timeout: 6000 }
      );
      await expect(
        this.page.locator(
          `//div[@id="category${componentSection}"]//div[@class="configuration__section configuration__section_selected"]`
        )
      ).toBeVisible();

      // перевіряю, що кількість запчастин стала більшою, ніж була на початку роботи методу
      const currentProgress = await this.page
        .locator('//div[@class="configuration__build-counter"]/span')
        .textContent();
      expect(parseInt(startingProgress!)).toBeLessThan(
        parseInt(currentProgress!)
      );
    }
  }

  async checkConstructionCompleted() {
    await expect(
      this.page.locator(
        '//div[@class="configuration__build-counter"]/span[@class="configuration__build-active"]'
      )
    ).toHaveText("13");
    await expect(
      this.page.locator(
        '//div[@class="configuration__build-bar"]/div[contains(@style,"width: 100%")]'
      )
    ).toBeVisible();
    await expect(
      this.page.locator(
        '//div[@class="configuration__info"]/div[contains(text(), "Комплектуючі сумісні")]'
      )
    ).toBeVisible();
  }

  async submitBuyModal() {
    await expect(
      this.page.locator(
        '//div[@id="modalConfigFullBuy"]//h5[contains(text(), "Склад збірки")]'
      )
    ).toBeVisible();
    await expect(
      this.page.locator(
        '//div[@id="modalConfigFullBuy"]//input[@id="filterfincheck"]'
      )
    ).toBeChecked();
    await this.page.locator('//div[@class="mcfb-total-fin"]//button').click();
  }
}

export enum headerTextContent {
  configurePC = "Конфігуратор комп'ютера",
}

export enum componentsSections {
  CPU = 398,
  motherBoard = 400,
  graphicCard = 397,
  memory = 403,
  powerSupply = 406,
  coolingSystem = 1317,
  thermalPaste = 2379,
  waterCooling = 2381,
  SSD = 407,
  HDD = 399,
  soundCard = 1545,
  case = 405,
  caseFan = 2373,
}

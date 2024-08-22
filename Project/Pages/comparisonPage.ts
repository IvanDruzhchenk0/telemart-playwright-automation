import { Page, expect } from "@playwright/test";

export class ComparisonPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectFromList(selection: string){
    await
      this.page.locator(
        `//div[@class="content"]//span[@class="selection"]//span[@role="combobox"]`
      )
      .click();
    await 
    this.page.locator(
        `//ul[@role="listbox"]//li[contains(text(), "${selection}")]`)
        .click();
  }

  async checkListSelection(selectionName: string) {
    await expect(
      this.page.locator(
        `//span[@class="selection"]//span[contains(text(), "${selectionName}")]`
      )
    ).toContainText(selectionName);
  }

  async checkNumberOfItems(number: number) {
    const item = this.page.locator(
      '//div[@class="comparison__box"]//div[contains(@class, "product_wrapper")]'
    );
    await expect(item).toHaveCount(number);
  }

  async checkNumberOfSections(number: number) {
    const section = this.page.locator('div[class="comparison__section"]');
    await expect(section).toHaveCount(number);
  }

  async checkSectionTitles(titles: Array<string>) {
    const sectionTitle = this.page.locator(
      'span[class="comparison__section-title"]'
    );
    const numberOfSectionTitles = await sectionTitle.count();
    for (let i = 0; i < numberOfSectionTitles; i++) {
      await expect(sectionTitle.nth(i)).toHaveText(titles[i]);
    }
  }

  async expandSections() {
    const expandButton = this.page.locator(
      '//span[contains(@class, "comparison__section-btn_open")]'
    );
    const numberOfExtendButtons = await expandButton.count();
    for (let i = 0; i < numberOfExtendButtons; i++) {
      await expandButton.nth(i).click();
    }
  }

  async checkExpandedCharacteristics(
    sectionTitles: Array<string>,
    characteristicsPerSection: Array<number>
  ) {
    for (let i = 0; i < characteristicsPerSection.length; i++) {
      let presentedCharacteristics = await this.page
        .locator(
          `//span[contains(@class, "comparison__section-title") and text() = "${
            sectionTitles[i]
          }"]/following::div[contains(@class, "comparison__section-content")][@id = "slider${
            i + 1
          }"]/div[@class = "comparison__table-th"]`
        )
        .count();
      expect(presentedCharacteristics).toEqual(characteristicsPerSection[i]);
    }
  }

  async deleteFromComparison(numberOfItems: number) {
    for (let i = 0; i < numberOfItems; i++) {
      await this.page
        .locator(
          '//div[@class="comparison__slider"]//button[contains(@class, "compare_delete")]'
        )
        .first()
        .click();
      await this.page.waitForResponse(
        (response) =>
          response.url().includes("https://telemart.ua/ua/cart/summary") &&
          response.status() === 200 &&
          response.request().method() === "GET",
        { timeout: 6000 }
      );
    }
  }

  async checkEmptyPage() {
    await expect(
      this.page.locator('//div[@class="not-found__title"]')
    ).toBeVisible();
  }
}

export enum SectionTitles {
  Specifications = "Технічні характеристики",
  Components = "Комплектація і рекомендації",
  CPU = "Процесор",
  GraphicCard = "Відеокарта",
  Motherboard = "Материнська плата",
  RAM = "Оперативна пам'ять",
  SSD = "Внутрішній накопичувач",
  Cooling = "Охолодження",
  Additional = "Додатково",
  GameSupport = "Підтримка ігор"
}

export enum CategoryToCompare {
  CPU = "Процесори",
  PC = "Комп'ютери"
}

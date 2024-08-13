import { Page, expect } from "@playwright/test";

export class ComparisonPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkSelection(selectionName: string) {
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
      '//span[contains(@class, "comparison__section-btn") and text() = "Показати"]'
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
    let presentedCharacteristics = 0;
    for (let sectionTitle of sectionTitles) {
      let presentedCharacteristics = await this.page
        .locator(
          `//div[@id="${sectionTitle}"]/div[@class="comparison__table-th"]`
        )
        .count();
      return presentedCharacteristics;
    }
    for (let number of characteristicsPerSection) {
      expect(presentedCharacteristics).toEqual(number);
    }
  }

  async deleteFromComparison(numberOfItems: number){
    for(let i = 0; i <=numberOfItems + 1; i++){
      await this.page.locator('//div[@class="comparison__slider"]//button[contains(@class, "compare_delete")]').first().click();
    }
  }

  async checkVisibility(locator: string){
    await expect(this.page.locator(locator)).toBeVisible();
  }
}

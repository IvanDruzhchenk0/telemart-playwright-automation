// Easy
// Перевірка роботи банерів

// - на головній сторінці отримати назви всіх промоакцій 
// - клікнути на одну з промоакцій за її назвою 
// - перевірити що тайтл сторінки яка відкрилась збігаєтья з назвою промоакції

import { test, expect } from "@playwright/test";

test("Check promotion page title", async ({ page }) => {
  await page.goto("https://telemart.ua/ua/");
  await page
    .locator('//*[@role="tooltip"]//button[contains(text(), "Так, вірно")]')
    .click();
  await expect(page.locator("section[class='promotions']")).toBeVisible();

  const promotionsTitles = await page
    .locator('//*[@class="promotions"]//*[@class="article-item__title"]')
    .allTextContents();
  const itemTitle = promotionsTitles[1];
  await page
    .locator(
      `//*[@class="article-item__title"]//*[contains(text(), "${itemTitle[1]}")]`
    )
    .click();
  let pageTitle = await page
    .locator('h1[class="pagehead-container__header"]')
    .textContent();
  expect(pageTitle).toEqual(itemTitle);
});

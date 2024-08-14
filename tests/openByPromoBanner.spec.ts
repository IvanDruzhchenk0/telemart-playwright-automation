// Easy
// Перевірка роботи банерів

// - на головній сторінці отримати назви всіх промоакцій
// - клікнути на одну з промоакцій за її назвою
// - перевірити що тайтл сторінки яка відкрилась збігаєтья з назвою промоакції

import { test } from "../Project/Fixtures/fixturePages";
import { expect } from "@playwright/test";

test("Order product with filtering", async ({ homePage, promotionPage }) => {
  await homePage.navigateToBaseURL();
  await homePage.confirmCityModal();

  const list = await homePage.getListTextContents("promotions");
  const secondItemTitle = list[1];
  await homePage.clickOnArticleItem(secondItemTitle);

  const pageTitle = await promotionPage.getHeaderText();
  expect(pageTitle).toEqual(secondItemTitle);
});

// Easy
// Перевірка роботи банерів

// - на головній сторінці отримати назви всіх промоакцій 
// - клікнути на одну з промоакцій за її назвою 
// - перевірити що тайтл сторінки яка відкрилась збігаєтья з назвою промоакції

import { test, expect } from "@playwright/test";
import { HomePage } from '../Project/Pages/homePage';
import { PromotionProductPage } from "../Project/Pages/promotionProductPage";

test("Check promo item title", async ({ page }) => {
  const homePage = new HomePage(page);
  const promotionProductPage = new PromotionProductPage(page);

  await homePage.navigateToBaseURL();
  await homePage.clickOnCityModal('Так, вірно');

  const list = await homePage.getListTextContents('promotions');
  const secondItemTitle = list[1];
  await homePage.clickOnArticleItem(secondItemTitle);

  const pageTitle = await promotionProductPage.getHeaderText()
  expect(pageTitle).toEqual(secondItemTitle);
});

// Medium
// Покупка товару через search

// - пошук з головної сторінки
// - вибрати товар який шукав з результатів пошуку
// - натиснути купити
// - натиснути оформити замовлення
// - заповнити данні
//   --- прізвище
//   --- ім'який

import { test } from "../Project/Fixtures/fixturePages";

test("Order product with filtering", async ({
  homePage,
  searchResultsPage,
  productPage,
  checkoutPage
}) => {
  await homePage.navigateToBaseURL();
  await homePage.clickOnCityModal("Так, вірно");
  await homePage.searchWithSearchBar("Ігровий стіл DXRacer");

  await searchResultsPage.checkHeader("Ігровий стіл DXRacer");
  await searchResultsPage.clickOnSearchResult("Ігровий стіл DXRacer");

  await productPage.clickBuyButton();
  await productPage.clickCheckoutButton();

  await checkoutPage.checkProductInBucket("Ігровий стіл DXRacer");
  await checkoutPage.fillSurname("Druzhchenko");
  await checkoutPage.fillName("Ivan");
});

// Medium
// Покупка товару через search

// - пошук з головної сторінки
// - вибрати товар який шукав з результатів пошуку
// - натиснути купити
// - натиснути оформити замовлення
// - заповнити данні
//   --- прізвище
//   --- ім'який

import { test } from "@playwright/test";
import { HomePage } from '../Project/Pages/homePage';
import { SearchResultsPage } from "../Project/Pages/searchResultsPage";
import { ProductPage } from "../Project/Pages/productPage";
import { CheckOutPage } from "../Project/Pages/checkoutPage";

test("Search and order product", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const checkOutPage = new CheckOutPage(page);

  await homePage.navigateToBaseURL();
  await homePage.clickOnCityModal('Так, вірно');
  await homePage.searchWithSearchBar('Ігровий стіл DXRacer');

  await searchResultsPage.clickOnSearchResult('Ігровий стіл DXRacer');
  
  await productPage.clickBuyButton();
  await productPage.clickCheckoutButton();

  await checkOutPage.fillSurname('Druzhechenko');
  await checkOutPage.fillName('Ivan');
});

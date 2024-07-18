// Hard
// пошук товару через фільтри 

// - пошук з головної сторінки 
// - вибрати категорію товарів Монітори і ТВ
// - Обрати монітори Sumsung
// - На сторінці Monitors/sumsung
// Обрати довільні 5 Фільтрів
// - клікнути на перший монітор зі списку 
// - заповнити данні 
//   --- прізвище 
//   --- ім'я
// - натиснути купити 
// - натиснути оформити замовлення  
// - заповнити данні 
//   --- прізвище 
//   --- ім'я

import { test } from "@playwright/test";
import { HomePage } from '../Project/Pages/homePage';
import { CatalogPage } from "../Project/Pages/catalogPage";
import { FilteringResultsPage } from "../Project/Pages/filteringResultsPage";
import { ProductPage } from "../Project/Pages/productPage";
import { CheckOutPage } from "../Project/Pages/checkoutPage";

test("Order product with filtering", async ({ page }) => {
const homePage = new HomePage(page);
const catalogPage = new CatalogPage(page);
const filteringResultsPage = new FilteringResultsPage(page);
const productPage = new ProductPage(page);
const checkOutPage = new CheckOutPage(page);

await homePage.navigateToBaseURL();
await homePage.clickOnCityModal('Так, вірно');

await homePage.filterByCatalog('Монітори та ТВ', 'https://telemart.ua/ua/monitors/samsung/');

await catalogPage.applyFilter('filterOption301-1013-22721');
await catalogPage.applyFilter('filterOption301-1012-22707');
await catalogPage.openFilterOptions('Вбудовані колонки');
await catalogPage.applyFilter('filterOption301-1979-32707');
await catalogPage.openFilterOptions('Тип монітору');
await catalogPage.applyFilter('filterOption301-1596-26795');
await catalogPage.openFilterOptions('Колір');
await catalogPage.applyFilter('filterOption301-877-24693');
await catalogPage.submitFiltering();

await filteringResultsPage.clickOnItem(1);

await productPage.clickBuyButton();
await productPage.clickCheckoutButton();

await checkOutPage.fillSurname('Druzhechenko');
await checkOutPage.fillName('Ivan');
});
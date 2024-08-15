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

import { test } from "../Project/Fixtures/fixturePages";
import { Filters, FilterOptions } from "../Project/Pages/CatalogPage";

test("Order product with filtering", async ({
  homePage,
  catalogPage,
  filteringResultsPage,
  productPage,
  checkoutPage,
}) => {
  const filterOptions = [
    FilterOptions.AspectRatio,
    FilterOptions.ResponseTime,
    FilterOptions.Type
  ];
  const expectedParameters = [
    { "Роздільна здатність": "1920x1080" },
    { "Співвідношення сторін": "16:9" },
  ];
  const listOfFilters = [
    Filters.AspectRatioSelection,
    Filters.ResponseTimeSelection,
    Filters.MonitorTypeSelection,
    Filters.DiagonalSelection,
    Filters.ResolutionSelection
  ];

  await homePage.navigateToBaseURL();
  await homePage.confirmCityModal();

  await homePage.filterByCatalog("Монітори та ТВ", "/ua/monitors/samsung/");

  await catalogPage.openMultipleFilterOptions(filterOptions);
  await catalogPage.applyMultipleFilters(listOfFilters);
  await catalogPage.submitFiltering();

  // перевірка на те, що всі 5 фільтрів активні
  await filteringResultsPage.checkFiltersApplication(5);
  await filteringResultsPage.clickOnItemInList(0);

  const productName = await productPage.getProductName();
  // перевірка самого товару на відповідність фільтрам
  await productPage.checkParameter(expectedParameters);
  await productPage.clickBuyButton();
  await productPage.clickCheckoutButton();

  await checkoutPage.checkProductInBucket(`${productName}`);
  await checkoutPage.fillSurname("Druzhchenko");
  await checkoutPage.fillName("Ivan");
});

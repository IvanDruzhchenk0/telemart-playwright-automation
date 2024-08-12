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

test("Order product with filtering", async ({
  homePage,
  catalogPage,
  filteringResultsPage,
  productPage,
  checkoutPage,
}) => {
  const listOfFilterOptions = [
    "Вбудовані колонки",
    "Тип монітору",
    "Час відгуку",
  ];
  const listOfFilters = [
    "filterOption301-1013-22721",
    "filterOption301-1012-22707",
    "filterOption301-1979-32707",
    "filterOption301-1596-26795",
    "filterOption301-1261-24353",
  ];

  await homePage.navigateToBaseURL();
  await homePage.clickOnCityModal("Так, вірно");

  await homePage.filterByCatalog(
    "Монітори та ТВ",
    "https://telemart.ua/ua/monitors/samsung/"
  );

  await catalogPage.openMultipleFilterOptions(listOfFilterOptions);
  await catalogPage.applyMultipleFilters(listOfFilters);
  await catalogPage.submitFiltering();

  await filteringResultsPage.clickOnItemInList(0);

  await productPage.clickBuyButton();
  await productPage.clickCheckoutButton();

  await checkoutPage.fillSurname("Druzhchenko");
  await checkoutPage.fillName("Ivan");
});

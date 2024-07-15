// Medium
// Покупка товару через search

// - пошук з головної сторінки
// - вибрати товар який шукав з результатів пошуку
// - натиснути купити
// - натиснути оформити замовлення
// - заповнити данні
//   --- прізвище
//   --- ім'який

import { test, expect } from "@playwright/test";

test("Order product by search", async ({ page }) => {
  await page.goto("https://telemart.ua/ua/");
  await page
    .locator('//*[@role="tooltip"]//button[contains(text(), "Так, вірно")]')
    .click();
  await page.locator('[name="search_que"]').fill("Ігровий стіл DXRacer");
  await page.locator('[name="search_que"]').press("Enter");
  await page
    .locator(
      '//*[@class="product-item__title"]/a[contains(text(), "Ігровий стіл DXRacer Gaming GD003")]'
    )
    .click();
  await page.locator('//a/span[contains(text(), "Купити")]').click();
  await page
    .locator(
      '//*[@class="bag-total"]//a[contains(text(), "Оформити замовлення")]'
    )
    .click();
  await page.locator('[id="customerLastname"]').fill("Druzhchenko");
  await page.locator('[id="customerFirstname"]').fill("Ivan");
});

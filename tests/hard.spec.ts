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

import { test, expect } from "@playwright/test";

test("Order product by filtering", async ({ page }) => {
    await page.goto("https://telemart.ua/ua/");
    await page
      .locator('//*[@role="tooltip"]//button[contains(text(), "Так, вірно")]')
      .click();
await page.locator('//*[@class="content"]//span[contains(text(), "Монітори та ТВ")]').hover();
await page.locator('//*[@class="content"]//a[contains(@href, "https://telemart.ua/ua/monitors/samsung/")]').click();
await page.locator('label[for="filterOption301-1013-22721"]').check();
await page.locator('label[for="filterOption301-1012-22707"]').check();
await page.locator('//div[@class="filter-item__head"][contains(text(), "Вбудовані колонки")]').click();
await page.locator('label[for="filterOption301-1979-32707"]').check();
await page.locator('//div[@class="filter-item__head"][contains(text(), "Тип монітору")]').click();
await page.locator('label[for="filterOption301-1596-26795"]').check();
await page.locator('//div[@class="filter-item__head"][@data-bs-target="#filterItem-301-877"]').click();
await page.locator('label[for="filterOption301-877-24693"]').check();
await page.locator('//div[@class="filter-option-apply"]/a[contains(text(), "Показати")]').click();
await page.locator('//*[@id="catalogList"]//*[@class="product-item__pic__img"]').first().click();
await page.locator('//a/span[contains(text(), "Купити")]').click();
await page
  .locator(
    '//*[@class="bag-total"]//a[contains(text(), "Оформити замовлення")]'
  )
  .click();
await page.locator('[id="customerLastname"]').fill("Druzhchenko");
await page.locator('[id="customerFirstname"]').fill("Ivan");
});
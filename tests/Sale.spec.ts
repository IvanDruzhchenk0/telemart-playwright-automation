import { test, expect } from "@playwright/test";

test("Promotion Page", async ({ page }) => {
  await page.goto("https://telemart.ua/");
  // Pass default pop-ups
  await page.getByRole("button", { name: "Українська" }).click();
  await page.getByRole("button", { name: "Так, вірно" }).click();
  // Navigate to Promotions page
  await page.getByRole("banner").getByRole("link", { name: "Акції" }).click();
  // Check that heading is correct
  await expect(page.getByRole("heading", { name: "Акції" })).toBeVisible();
  await expect(
    page.locator(".catalog-slider-main-mobile__container")
  ).toBeVisible();
  // Check that list is not empty
  await page.locator(".articles-container__list-col__item").first().click();
  await expect(page.locator(".one-promo__aside")).toBeVisible();
  // Back to home page
  await page.locator(".header__logo").first().click();
});

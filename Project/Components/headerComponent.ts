import { Page, expect } from "@playwright/test";

export class HeaderComponent {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPage(path: string){
    await this.page.goto(`/${path}`);
  }

  async signIn(email: string, password: string){
    await this.page.locator('//div[@class="header-center"]//button[@id="appinbox"]').click({force:true});
    await expect(this.page.locator('//div[@id="modalCommonAuth"]//div[@class="modal-content"]')).toBeVisible();
    await expect(this.page.locator('//div[@class="modal-content"]//button[@data-bs-target="#authItem1"]')).toHaveAttribute("aria-selected", "true");
    await this.page.locator('input[id="loginform-identity"]').fill(email);
    await this.page.locator('input[id="loginform-password"]').fill(password);
    await this.page.locator('//div[@id="authItem1"]//button[@type="submit"]').click();
    await expect(this.page.locator('//div[@class="header-center"]//a[contains(@class, "authorized")]')).toBeVisible(); 
  }

  async clickButton(buttonLink: string){
    await this.page.locator(`//div[@class="header-center"]//a[contains(@href, "${buttonLink}")]`).click();
  }

}
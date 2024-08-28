import { test } from "../../Project/Fixtures/fixturePages";
import { callReason } from "../../Project/Pages/ConstructorPage";

test("Get consultation: Constructor page", async ({
  homePage,
  constructorPage
}) => {
  const constructorButton =
    '//div[@class="quick-main-links"]//a[contains(@href, "https://telemart.ua/ua/assembly-start.html")]';
  const modalFormData = ["Test", "0000000000", "10000", callReason.newPC];
  const getConsultationButton =
    '//div[@class="content"]//a[@data-bs-target="#modalRequestConsultation"]';

  await homePage.navigateToBaseURL();
  await homePage.confirmCityModal();
  await homePage.clickButton(constructorButton);

  await constructorPage.checkSections();
  await constructorPage.checkFAQ();

  await constructorPage.clickButton(getConsultationButton);
  await constructorPage.getConsultation(modalFormData);
});

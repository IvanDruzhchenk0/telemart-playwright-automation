import { test } from "../../Project/Fixtures/fixturePages";
import { callReason, constructorButton, getConsultationButton } from "../../Project/Pages/ConstructorPage";

test("Get consultation: Constructor page", async ({
  homePage,
  constructorPage
}) => {
  const modalFormData = ["Test", "0000000000", "10000", callReason.newPC];

  await homePage.navigateToBaseURL();
  await homePage.confirmCityModal();
  await homePage.clickButton(constructorButton);

  await constructorPage.checkSections();
  await constructorPage.checkFAQ();

  await constructorPage.clickButton(getConsultationButton);
  await constructorPage.getConsultation(modalFormData);
});

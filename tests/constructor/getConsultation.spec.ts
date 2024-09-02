import { test } from "../../Project/Fixtures/fixturePages";
import { callReason } from "../../Project/Pages/ConstructorPage";

test("Get consultation: Constructor page", async ({
  homePage,
  constructorPage
}) => {
  const modalFormData = ["Test", "0000000000", "10000", callReason.newPC];

  await homePage.navigateToBaseURL();
  await homePage.confirmCityModal();
  await homePage.clickButton(homePage.constructorButton);

  await constructorPage.checkSections();
  await constructorPage.faqComponent.checkFAQ();

  await constructorPage.clickButton(constructorPage.getConsultationButton);
  await constructorPage.consultationModal.getConsultation(modalFormData);
});

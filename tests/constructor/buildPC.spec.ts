import { test } from "../../Project/Fixtures/fixturePages";
import {
  callReason,
  headerTextContent,
  componentsSections,
  constructorButton,
  buildPCButton,
  buyButton,
  getConsultationButton,
  assembledPCs
} from "../../Project/Pages/ConstructorPage";
import { headerText } from "../../Project/Pages/FilteringResultsPage";

test.describe("Build PC page", () => {

  const modalFormData = ["Test", "0000000000", "10000", callReason.newPC];
  const sectionTitles = [
    "Послуги",
    "Комплектуючі",
    "Периферія",
    "Аксесуари та оргтехніка",
  ];
  const componentsTitles = [
    componentsSections.CPU,
    componentsSections.motherBoard,
    componentsSections.graphicCard,
    componentsSections.memory,
    componentsSections.powerSupply,
    componentsSections.coolingSystem,
    componentsSections.thermalPaste,
    componentsSections.waterCooling,
    componentsSections.SSD,
    componentsSections.HDD,
    componentsSections.soundCard,
    componentsSections.case,
    componentsSections.caseFan,
  ];

  test("Build PC page: Get consultation", async ({
    homePage,
    constructorPage,
  }) => {
    await homePage.navigateToBaseURL();
    await homePage.confirmCityModal();
    await homePage.clickButton(constructorButton);

    await constructorPage.clickButton(buildPCButton);
    await constructorPage.checkHeader(headerTextContent.configurePC);
    await constructorPage.clickButton(getConsultationButton);
    await constructorPage.getConsultation(modalFormData);
  });

  test("Build PC page: assembled PCs", async ({
    homePage,
    constructorPage,
    filteringResultsPage,
    catalogPage,
  }) => {
    await homePage.navigateToBaseURL();
    await homePage.confirmCityModal();
    await homePage.clickButton(constructorButton);

    await constructorPage.clickButton(buildPCButton);
    await constructorPage.clickButton(assembledPCs);
    await filteringResultsPage.checkHeader(headerText.PCs);
    await catalogPage.checkURL("https://telemart.ua/ua/pc/");
  });

  test("Build PC page: Configure PC", async ({
    homePage,
    constructorPage,
    checkoutPage,
  }) => {
    await homePage.navigateToBaseURL();
    await homePage.confirmCityModal();
    await homePage.clickButton(constructorButton);

    await constructorPage.clickButton(buildPCButton);
    await constructorPage.checkNumberOfSections(4);
    await constructorPage.checkNumberOfItems(35);
    await constructorPage.checkSectionTitles(sectionTitles);

    await constructorPage.addComponents(componentsTitles);
    await constructorPage.checkConstructionCompleted();
    await constructorPage.clickButton(buyButton);
    await constructorPage.submitBuyModal();

    await checkoutPage.checkURL("https://telemart.ua/ua/order/");
    await checkoutPage.fillSurname("Druzhchenko");
    await checkoutPage.fillName("Ivan");
  });
});

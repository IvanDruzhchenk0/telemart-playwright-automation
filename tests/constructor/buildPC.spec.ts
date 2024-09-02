import { test } from "../../Project/Fixtures/fixturePages";
import {
  callReason
} from "../../Project/Pages/ConstructorPage";
import {
  headerTextContent,
  componentsSections
} from "../../Project/Pages/ComputerConfiguratorPage";
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
    constructorPage
  }) => {
    await homePage.navigateToBaseURL();
    await homePage.confirmCityModal();
    await homePage.clickButton(homePage.constructorButton);

    await constructorPage.clickButton(constructorPage.buildPCButton);
    await constructorPage.checkHeader(headerTextContent.configurePC);
    await constructorPage.clickButton(constructorPage.getConsultationButton);
    await constructorPage.consultationModal.getConsultation(modalFormData);
  });

  test("Build PC page: assembled PCs", async ({
    homePage,
    constructorPage,
    filteringResultsPage,
    catalogPage,
    computerConfiguratorPage,
  }) => {
    await homePage.navigateToBaseURL();
    await homePage.confirmCityModal();
    await homePage.clickButton(homePage.constructorButton);

    await constructorPage.clickButton(constructorPage.buildPCButton);
    await computerConfiguratorPage.clickButton(computerConfiguratorPage.assembledPCs);
    await filteringResultsPage.checkHeader(headerText.PCs);
    await catalogPage.checkURL("https://telemart.ua/ua/pc/");
  });

  test("Build PC page: Configure PC", async ({
    homePage,
    constructorPage,
    computerConfiguratorPage,
    checkoutPage,
  }) => {
    await homePage.navigateToBaseURL();
    await homePage.confirmCityModal();
    await homePage.clickButton(homePage.constructorButton);

    await constructorPage.clickButton(constructorPage.buildPCButton);
    await computerConfiguratorPage.checkNumberOfSections(4);
    await computerConfiguratorPage.checkNumberOfItems(35);
    await computerConfiguratorPage.checkSectionTitles(sectionTitles);

    await computerConfiguratorPage.addComponents(componentsTitles);
    await computerConfiguratorPage.checkConstructionCompleted();
    await computerConfiguratorPage.clickButton(computerConfiguratorPage.buyButton);
    await computerConfiguratorPage.submitBuyModal();

    await checkoutPage.checkURL("https://telemart.ua/ua/order/");
    await checkoutPage.fillSurname("Druzhchenko");
    await checkoutPage.fillName("Ivan");
  });
});

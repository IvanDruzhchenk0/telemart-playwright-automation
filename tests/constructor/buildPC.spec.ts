import { test } from "../../Project/Fixtures/fixturePages";
import {
  callReason,
  headerTextContent,
  componentsSections,
} from "../../Project/Pages/ConstructorPage";
import { headerText } from "../../Project/Pages/FilteringResultsPage";

test.describe("Build PC page", () => {
  const constructorButton =
    '//div[@class="quick-main-links"]//a[contains(@href, "https://telemart.ua/ua/assembly-start.html")]';
  const buildPCButton =
    '//div[@class="before-config__left-col"]//a[contains(@href, "https://telemart.ua/ua/assembly/clear")]';
  const buyButton =
    '//div[@class="configuration__info-row"]//button[contains(text(), "Купити")]';
  const getConsultationButton =
    '//div[@id="assembly"]//div[@data-bs-target="#modalRequestConsultation"]';
  const assembledPCs =
    '//div[@id="assembly"]//a[contains(@href, "https://telemart.ua/ua/pc/")]';
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

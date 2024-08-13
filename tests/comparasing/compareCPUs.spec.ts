// Порівняння двох товарів

// -Відкрити каталог і обрати категорію "Комплектуючі: процесори"
// -Нажати на кнопку 'Порівняти' для заданої кількості товарів (в моєму прикладі - 2)
// -Перейти на сторінку для порівняння 
// -Перевірити, що обрана правильна категорія 
// -Перевірити, що додано задана кількость товарів (в моєму прикладі - 2)
// -Перевірити, що наявні всі необхідні секції з характеристиками 
// -Перевірити, що у секціях з характеристиками наявні всі підсекції
// -Видалити товари зі сторінки порівняння
// -Перевірити, що товари видалено

// P.S. Писав так, аби можна було легко перевикористати тест на будь-який інший набір вхідних даних 


import { test } from "../../Project/Fixtures/fixturePages";

test('test', async ({ homePage, catalogPage, headerComponent, comparisonPage }) => {

const numbersOfItems = [0,1];
const sectionTitles = ['Технічні характеристики', 'Комплектація і рекомендації'];
const characteristicsPerSection = [19, 3];
const emptyPageLocator = '//div[@class="not-found__title"]';

await homePage.navigateToBaseURL();
await homePage.clickOnCityModal("Так, вірно");

await homePage.filterByCatalog(
    "Комплектуючі",
    "https://telemart.ua/ua/processor/"
  );

await catalogPage.compareNthItem(numbersOfItems);

await headerComponent.clickButton('https://telemart.ua/ua/compare');
await comparisonPage.checkSelection('Процесори');
await comparisonPage.checkNumberOfItems(2);
await comparisonPage.checkNumberOfSections(2);
await comparisonPage.checkSectionTitles(sectionTitles);

await comparisonPage.expandSections();
await comparisonPage.checkExpandedCharacteristics(sectionTitles, characteristicsPerSection);

await comparisonPage.deleteFromComparison(2);
await comparisonPage.checkVisibility(emptyPageLocator);

});
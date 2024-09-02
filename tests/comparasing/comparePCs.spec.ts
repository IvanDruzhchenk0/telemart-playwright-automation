// Дадавання ще однієї сутності до порівняння

// -Відкрити каталог і обрати категорію "Комплектуючі: процесори"
// -Нажати на кнопку 'Порівняти' для заданої кількості товарів (в цьому прикладі - 3)
// -Відкрити каталог і обрати категорію "Комп'ютери: преміум ПК Evolve"
// -Нажати на кнопку 'Порівняти' для заданої кількості товарів (в цьому прикладі - 3)
// -Перейти на сторінку для порівняння 
// -Обрати потрібну категорію, яку хочемо порівнювати
// -Перевірити, що обрана правильна категорія 
// -Перевірити, що додано задана кількость товарів (в цьому прикладі - 3)
// -Перевірити, що наявні всі необхідні секції з характеристиками 
// -Перевірити, що у секціях з характеристиками наявні всі підсекції
// -Видалити товари однієї з категорій зі сторінки порівняння
// -Перевірити, що товари з іншої категорії залишились


import { test } from "../../Project/Fixtures/fixturePages";
import { SectionTitles, CategoryToCompare } from "../../Project/Pages/ComparisonPage";
import { MainFilter } from "../../Project/Pages/HomePage";

test('Compare PCs and CPUs', async ({ homePage, catalogPage, headerComponent, comparisonPage }) => {

const numbersOfItems = [0,1,2];
const sectionTitles = [SectionTitles.CPU, SectionTitles.GraphicCard, SectionTitles.Motherboard, SectionTitles.RAM, SectionTitles.SSD, SectionTitles.Cooling, SectionTitles.Additional, SectionTitles.GameSupport];
const characteristicsPerSection = [6, 7, 3, 4, 4, 2, 8, 17];

await homePage.navigateToBaseURL();
await homePage.confirmCityModal();

await homePage.filterByCatalog(
    MainFilter.Components,
    "/ua/processor/"
  );
await catalogPage.compareNthItem(numbersOfItems);

await homePage.navigateToBaseURL();
await homePage.filterByCatalog(
    MainFilter.PC,
    "/ua/pc/evolve/"
  );
await catalogPage.compareNthItem(numbersOfItems);
await headerComponent.clickButton('/compare');

await comparisonPage.selectFromList(CategoryToCompare.PC)
await comparisonPage.checkListSelection(CategoryToCompare.PC);
await comparisonPage.checkNumberOfItems(3);
await comparisonPage.checkNumberOfSections(8);
await comparisonPage.checkSectionTitles(sectionTitles);

await comparisonPage.expandSections();
await comparisonPage.checkExpandedCharacteristics(sectionTitles, characteristicsPerSection);

await comparisonPage.deleteFromComparison(3);
await comparisonPage.checkListSelection(CategoryToCompare.CPU);
await comparisonPage.checkNumberOfItems(3);
});
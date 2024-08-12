import { test as base } from '@playwright/test';
import { CatalogPage } from '../Pages/catalogPage';
import { CheckOutPage } from '../Pages/checkoutPage';
import { FilteringResultsPage } from '../Pages/filteringResultsPage';
import { HomePage } from '../Pages/homePage';
import { ProductPage } from '../Pages/productPage';
import { PromotionProductPage } from '../Pages/promotionProductPage';
import { SearchResultsPage } from '../Pages/searchResultsPage';

type Pages = {
    catalogPage: CatalogPage;
    checkoutPage: CheckOutPage;
    filteringResultsPage: FilteringResultsPage;
    homePage: HomePage;
    productPage: ProductPage;
    promotionProductPage: PromotionProductPage;
    searchResultsPage: SearchResultsPage;
}


export const test = base.extend<Pages>({ 
    catalogPage: ({page}, use) => {
        const catalogPage = new CatalogPage(page);
        use(catalogPage);
    },
    checkoutPage: ({page}, use) => {
        const checkoutPage = new CheckOutPage(page);
        use(checkoutPage);
    },
    filteringResultsPage: ({page}, use) => {
        const filteringResultsPage = new FilteringResultsPage(page);
        use(filteringResultsPage);
    },
    homePage: ({page}, use) => {
        const homePage = new HomePage(page);
        use(homePage);
    },
    productPage: ({page}, use) => {
        const productPage = new ProductPage(page);
        use(productPage);
    },
    promotionProductPage: ({page}, use) => {
        const promotionProductPage = new PromotionProductPage(page);
        use(promotionProductPage);
    },
    searchResultsPage: ({page}, use) => {
        const searchResultsPage = new SearchResultsPage(page);
        use(searchResultsPage);
    }

})
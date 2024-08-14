import { test as base } from '@playwright/test';
import { CatalogPage } from '../Pages/CatalogPage';
import { CheckOutPage } from '../Pages/CheckoutPage';
import { FilteringResultsPage } from '../Pages/FilteringResultsPage';
import { HomePage } from '../Pages/HomePage';
import { ProductPage } from '../Pages/ProductPage';
import { PromotionPage } from '../Pages/PromotionPage';
import { SearchResultsPage } from '../Pages/SearchResultsPage';

type Pages = {
    catalogPage: CatalogPage;
    checkoutPage: CheckOutPage;
    filteringResultsPage: FilteringResultsPage;
    homePage: HomePage;
    productPage: ProductPage;
    promotionPage: PromotionPage;
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
    promotionPage: ({page}, use) => {
        const promotionProductPage = new PromotionPage(page);
        use(promotionProductPage);
    },
    searchResultsPage: ({page}, use) => {
        const searchResultsPage = new SearchResultsPage(page);
        use(searchResultsPage);
    }

})
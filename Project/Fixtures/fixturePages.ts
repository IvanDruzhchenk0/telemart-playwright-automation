import { test as base } from '@playwright/test';
import { CatalogPage } from '../Pages/CatalogPage';
import { CheckOutPage } from '../Pages/CheckoutPage';
import { FilteringResultsPage } from '../Pages/FilteringResultsPage';
import { HomePage } from '../Pages/HomePage';
import { ProductPage } from '../Pages/ProductPage';
import { PromotionPage } from '../Pages/PromotionPage';
import { SearchResultsPage } from '../Pages/SearchResultsPage';
import { ComparisonPage } from '../Pages/ComparisonPage';
import { HeaderComponent } from '../Components/headerComponent';
import { ProfilePage } from '../Pages/ProfilePage';
import { ConstructorPage } from '../Pages/ConstructorPage';
import { ComputerConfiguratorPage } from '../Pages/ComputerConfiguratorPage';


type Pages = {
    catalogPage: CatalogPage;
    checkoutPage: CheckOutPage;
    filteringResultsPage: FilteringResultsPage;
    homePage: HomePage;
    productPage: ProductPage;
    promotionPage: PromotionPage;
    searchResultsPage: SearchResultsPage;
    comparisonPage: ComparisonPage;
    profilePage: ProfilePage;
    constructorPage: ConstructorPage;
    computerConfiguratorPage: ComputerConfiguratorPage;
}

type Components = {
    headerComponent: HeaderComponent;
}


export const test = base.extend<Pages & Components> ({ 
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
    },
    headerComponent: ({page}, use) => {
        const headerComponent = new HeaderComponent(page);
        use(headerComponent);
    }, 
    comparisonPage: ({page}, use) => {
        const comparisonPage = new ComparisonPage(page);
        use(comparisonPage);
    },
    profilePage: ({page}, use) => {
        const profilePage = new ProfilePage(page);
        use(profilePage);
    },
    constructorPage: ({page}, use) => {
        const constructorPage = new ConstructorPage(page);
        use(constructorPage);
    },
    computerConfiguratorPage: ({page}, use) => {
        const computerConfiguratorPage = new ComputerConfiguratorPage(page);
        use(computerConfiguratorPage);
    }
})
import { test } from "../../Project/Fixtures/fixturePages";
import { TabTitles } from "../../Project/Pages/ProfilePage";

test.describe("Editing user instance", () => {
  test.beforeEach(async ({ homePage, headerComponent }) => {
    await homePage.navigateToBaseURL();
    await homePage.confirmCityModal();
    await headerComponent.signIn(
      process.env.PRODUCTION_MOBILE_PHONE!,
      process.env.PRODUCTION_PASSWORD!
    );
  });

  const defaultData = [
    "Dojo",
    "Sempai",
    "Ivanich",
    "01.02.1997",
    "havierqalol@gmail.com",
    "0677005517",
    "0123456789",
  ];
  const newData = [
    "newDojo",
    "newSempai",
    "newIvanich",
    "1990.01.01",
    "new@gmail.com",
    "0231232513",
  ];
  const newDataWithMobileNumber = [
    "newDojo",
    "newSempai",
    "newIvanich",
    "01.01.1990",
    "new@gmail.com",
    "0677005517",
    "0231232513",
  ];
  const passwords = [
    process.env.PRODUCTION_PASSWORD!,
    "Qwerty123!",
    "Qwerty123!",
  ];

  test("Edit profile info", async ({ headerComponent, profilePage }) => {
 
    await headerComponent.navigateToPage("user/default/index/");
    await profilePage.checkHeader();
    await profilePage.checkTabName(0, TabTitles.PersonalData);
    await profilePage.checkPersonalData(defaultData);

    await profilePage.editPersonalData(newData);
    await profilePage.checkPersonalData(newDataWithMobileNumber);
  });

  test("Edit password", async ({ headerComponent, profilePage }) => {

    await headerComponent.navigateToPage("user/default/index/");
    await profilePage.checkHeader();
    await profilePage.checkTabName(1, TabTitles.ChangePassword);

    await profilePage.editPassword(passwords);
  });
});

test("Teardown", async ({ homePage, headerComponent, profilePage }) => {
  const resetData = [
    "Dojo",
    "Sempai",
    "Ivanich",
    "1997.01.02",
    "havierqalol@gmail.com",
    "0123456789",
  ];
  const resetPasswords = [
    "Qwerty123!",
    process.env.PRODUCTION_PASSWORD!,
    process.env.PRODUCTION_PASSWORD!,
  ];
  await homePage.navigateToBaseURL();
  await homePage.confirmCityModal();
  await headerComponent.signIn(
    process.env.PRODUCTION_MOBILE_PHONE!,
    "Qwerty123!"
  );
  await headerComponent.navigateToPage("user/default/index/");
  await profilePage.editPersonalData(resetData);
  await profilePage.editPassword(resetPasswords);
});

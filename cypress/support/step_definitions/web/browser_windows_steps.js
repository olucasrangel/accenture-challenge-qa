import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../pages/HomePage';
import BrowserWindowsPage from '../../pages/BrowserWindowsPage';

Given('I am on the "Alerts, Frame & Windows" page', () => {
  HomePage.visit();
  HomePage.navigateToAlertsFrameWindowsPage();
  BrowserWindowsPage.navigateToBrowserWindows();
});

When('I click on the "New Window" button', () => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
  });

  BrowserWindowsPage.clickNewWindowButton();
});

Then('a new page should open with the message {string}', (message) => {
  cy.get('@windowOpen').should('be.called');

  cy.visit('/sample');

  BrowserWindowsPage.verifyNewPageMessage(message);
});

When('I can return to the previous page', () => {
  cy.go('back');
  BrowserWindowsPage.elements.newWindowButton().should('be.visible');
});

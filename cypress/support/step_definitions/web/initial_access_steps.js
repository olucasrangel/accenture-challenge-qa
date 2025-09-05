import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

import HomePage from '../../pages/HomePage';
import PracticeFormPage from '../../pages/PracticeFormPage';

let testData;

Given('I visit the DemoQA website', () => {
  HomePage.visit();
});

When('I click on the {string} card', (cardName) => {
  cy.get('.card').contains(cardName).click();
});

When('I select the {string} menu item', (menuItem) => {
  cy.get('.menu-list').contains(menuItem).click();
});

When('I fill the practice form with random valid data', () => {
  testData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: 'Male',
    mobile: faker.string.numeric(10),
  };
  PracticeFormPage.fillMainForm(testData);
});

When('I select {string} as a subject', (subject) => {
  PracticeFormPage.selectSubject(subject);
});
When('I select {string} as a hobby', (hobbyName) => {
  PracticeFormPage.selectHobby(hobbyName);
});
When('I upload a text file', () => {
  PracticeFormPage.uploadFile('exemplo.txt');
});
When('I fill in the address details', () => {
  PracticeFormPage.fillAddressDetails({
    street: faker.location.streetAddress(),
    state: 'NCR',
    city: 'Delhi',
  });
});

When('I submit the form', () => {
  PracticeFormPage.submitForm();
});

Then('the confirmation modal should display the correct data', () => {
  const expectedData = {
    studentName: `${testData.firstName} ${testData.lastName}`,
    email: testData.email,
    gender: testData.gender,
    mobile: testData.mobile,
  };
  PracticeFormPage.verifyModalData(expectedData);
});

Then('I close the confirmation modal', () => {
  PracticeFormPage.closeModal();
});

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import HomePage from '../../pages/HomePage';
import WebTablesPage from '../../pages/WebTablesPage';

let userData;

Given('I am on the "Web Tables" page', () => {
  HomePage.visit();
  HomePage.navigateToElementsPage();
  WebTablesPage.navigateToWebTables();
  WebTablesPage.changePageSize(100);
});

When('I open the registration form', () => {
  WebTablesPage.openRegistrationForm();
});

When('I fill the registration form with random valid data', () => {
  userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    age: faker.number.int({ min: 18, max: 99 }).toString(),
    salary: faker.number.int({ min: 1000, max: 9000 }).toString(),
    department: faker.commerce.department(),
  };
  WebTablesPage.fillRegistrationForm(userData);
});

When('I submit the registration form', () => {
  WebTablesPage.submitRegistrationForm();
});

Then('the new record should be visible in the table', () => {
  WebTablesPage.verifyRecordInTable(userData);
});

When('I edit the new record with updated data', () => {
  const updatedData = {
    firstName: faker.person.firstName(),
    salary: faker.number.int({ min: 1000, max: 9000 }).toString(),
  };

  WebTablesPage.editRecord(userData.email, updatedData);

  userData.firstName = updatedData.firstName;
  userData.salary = updatedData.salary;
});

Then('the record should reflect the updated data in the table', () => {
  WebTablesPage.verifyRecordInTable(userData);
});

When('I delete the new record', () => {
  WebTablesPage.deleteRecord(userData.email);
});

Then('the record should be removed from the table', () => {
  WebTablesPage.verifyRecordIsRemoved(userData.email);
});

let createdEmails = [];

When('I create {int} new dynamic records', (recordCount) => {
  createdEmails = [];

  for (let i = 0; i < recordCount; i++) {
    const newUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      age: faker.number.int({ min: 18, max: 99 }).toString(),
      salary: faker.number.int({ min: 1000, max: 9000 }).toString(),
      department: faker.commerce.department(),
    };

    createdEmails.push(newUser.email);

    WebTablesPage.openRegistrationForm();
    WebTablesPage.fillRegistrationForm(newUser);
    WebTablesPage.submitRegistrationForm();
  }
});

Then('the table should contain {int} records in total', (expectedCount) => {
  WebTablesPage.getTableRowCount().should('eq', expectedCount);
});

When('I delete all created records', () => {
  createdEmails.forEach((email) => {
    WebTablesPage.deleteRecord(email);
  });
});

Then('the table should contain {int} records again', (expectedCount) => {
  WebTablesPage.getTableRowCount().should('eq', expectedCount);
});

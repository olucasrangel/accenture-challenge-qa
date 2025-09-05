class WebTablesPage {
  elements = {
    webTablesMenuItem: () => cy.contains('span', 'Web Tables'),
    addButton: () => cy.get('#addNewRecordButton'),
    registrationFormModal: () => cy.get('.modal-content'),
    firstNameInput: () => cy.get('#firstName'),
    lastNameInput: () => cy.get('#lastName'),
    emailInput: () => cy.get('#userEmail'),
    ageInput: () => cy.get('#age'),
    salaryInput: () => cy.get('#salary'),
    departmentInput: () => cy.get('#department'),
    submitButton: () => cy.get('#submit'),
    tableRow: (text) =>
      cy
        .get('.rt-tr-group')
        .contains('.rt-td', text, { matchCase: false })
        .parent(),
    editButtonInRow: (email) =>
      this.elements.tableRow(email).find('[id^="edit-record-"]'),
    deleteButtonInRow: (email) =>
      this.elements.tableRow(email).find('[id^="delete-record-"]'),
    pageSizeSelect: () => cy.get('select[aria-label="rows per page"]'),
  };

  navigateToWebTables() {
    this.elements.webTablesMenuItem().click();
  }

  openRegistrationForm() {
    this.elements.addButton().click();
    this.elements.registrationFormModal().should('be.visible');
  }

  fillRegistrationForm(userData) {
    this.elements.firstNameInput().type(userData.firstName);
    this.elements.lastNameInput().type(userData.lastName);
    this.elements.emailInput().type(userData.email);
    this.elements.ageInput().type(userData.age);
    this.elements.salaryInput().type(userData.salary);
    this.elements.departmentInput().type(userData.department);
  }

  submitRegistrationForm() {
    this.elements.submitButton().click();
    this.elements.registrationFormModal().should('not.exist');
  }

  verifyRecordInTable(userData) {
    const row = this.elements.tableRow(userData.email);

    row.should('contain.text', userData.firstName);
    row.should('contain.text', userData.lastName);
    row.should('contain.text', userData.age);
    row.should('contain.text', userData.salary);
    row.should('contain.text', userData.department);
  }

  editRecord(email, updatedData) {
    this.elements.editButtonInRow(email).click();
    this.elements.registrationFormModal().should('be.visible');

    this.elements.firstNameInput().clear().type(updatedData.firstName);
    this.elements.salaryInput().clear().type(updatedData.salary);

    this.submitRegistrationForm();
  }

  deleteRecord(email) {
    this.elements.deleteButtonInRow(email).click();
  }

  verifyRecordIsRemoved(email) {
    cy.get('.rt-tbody').should('not.contain', email);
  }

  getTableRowCount() {
    return cy.get('[id^="delete-record-"]').its('length');
  }
  changePageSize(numberOfRows) {
    this.elements.pageSizeSelect().select(numberOfRows.toString());
  }
}

export default new WebTablesPage();

class PracticeFormPage {
  elements = {
    firstNameInput: () => cy.get('#firstName'),
    lastNameInput: () => cy.get('#lastName'),
    emailInput: () => cy.get('#userEmail'),
    genderRadio: () => cy.get('#genterWrapper [for="gender-radio-1"]'),
    mobileNumberInput: () => cy.get('#userNumber'),
    dateOfBirthInput: () => cy.get('#dateOfBirthInput'),
    subjectsInput: () => cy.get('#subjectsInput'),
    hobbiesCheckbox: (hobbyName) =>
      cy.get('#hobbiesWrapper').contains(hobbyName),
    uploadPictureButton: () => cy.get('#uploadPicture'),
    currentAddressInput: () => cy.get('#currentAddress'),
    stateDropdown: () => cy.get('#state'),
    cityDropdown: () => cy.get('#city'),
    submitButton: () => cy.get('#submit'),
    modal: () => cy.get('.modal-content'),
    modalTitle: () => cy.get('#example-modal-sizes-title-lg'),
    resultsTable: () => cy.get('.table-responsive'),
    closeModalButton: () => cy.get('#closeLargeModal'),
  };

  fillMainForm(userData) {
    this.elements.firstNameInput().type(userData.firstName);
    this.elements.lastNameInput().type(userData.lastName);
    this.elements.emailInput().type(userData.email);
    this.elements.genderRadio().click();
    this.elements.mobileNumberInput().type(userData.mobile);
    this.elements
      .dateOfBirthInput()
      .type(`{end}${'{backspace}'.repeat(10)}${userData.dateOfBirth}{enter}`);
  }

  selectSubject(subject) {
    this.elements.subjectsInput().type(`${subject}{enter}`);
  }

  selectHobby(hobbyName) {
    this.elements.hobbiesCheckbox(hobbyName).click();
  }

  uploadFile(fileName) {
    this.elements
      .uploadPictureButton()
      .selectFile(`cypress/fixtures/${fileName}`);
  }

  fillAddressDetails(addressData) {
    this.elements.currentAddressInput().type(addressData.street);
    this.elements.stateDropdown().type(`${addressData.state}{enter}`);
    this.elements.cityDropdown().type(`${addressData.city}{enter}`);
  }

  submitForm() {
    this.elements.submitButton().scrollIntoView().click();
  }

  verifyModalData(expectedData) {
    this.elements.modal().should('be.visible');
    this.elements
      .modalTitle()
      .should('have.text', 'Thanks for submitting the form');

    this.elements
      .resultsTable()
      .contains('td', 'Student Name')
      .next('td')
      .should('have.text', expectedData.studentName);
    this.elements
      .resultsTable()
      .contains('td', 'Student Email')
      .next('td')
      .should('have.text', expectedData.email);
    this.elements
      .resultsTable()
      .contains('td', 'Gender')
      .next('td')
      .should('have.text', expectedData.gender);
    this.elements
      .resultsTable()
      .contains('td', 'Mobile')
      .next('td')
      .should('have.text', expectedData.mobile);
  }

  closeModal() {
    this.elements.closeModalButton().scrollIntoView().click({ force: true });
    this.elements.modal().should('not.exist');
  }
}

export default new PracticeFormPage();

class HomePage {
  visit() {
    cy.visit('/');
  }

  clickFormsCard() {
    cy.get('.card').contains('Forms').click();
  }
  navigateToAlertsFrameWindowsPage() {
    cy.get('.card').contains('Alerts, Frame & Windows').click();
  }
  navigateToElementsPage() {
    cy.get('.card').contains('Elements').click();
  }
  navigateToWidgetsPage() {
    cy.get('.card').contains('Widgets').click();
  }
}

export default new HomePage();

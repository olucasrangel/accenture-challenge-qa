class BrowserWindowsPage {
  elements = {
    browserWindowsMenuItem: () => cy.contains('span', 'Browser Windows'),
    newWindowButton: () => cy.get('#windowButton'),
    samplePageHeading: () => cy.get('#sampleHeading'),
  };

  navigateToBrowserWindows() {
    this.elements.browserWindowsMenuItem().click();
  }

  clickNewWindowButton() {
    this.elements.newWindowButton().click();
  }

  verifyNewPageMessage(expectedMessage) {
    this.elements.samplePageHeading().should('have.text', expectedMessage);
  }
}

export default new BrowserWindowsPage();

class ProgressBarPage {
  elements = {
    progressBarMenuItem: () => cy.contains('span', 'Progress Bar'),
    startStopButton: () => cy.get('#startStopButton'),
    resetButton: () => cy.get('#resetButton'),
    progressBar: () => cy.get('div[role="progressbar"]'),
  };

  navigateToProgressBar() {
    this.elements.progressBarMenuItem().click();
  }

  clickStartStopButton() {
    this.elements.startStopButton().click();
  }

  stopWhenValueIsMet(targetValue) {
    const checkValueAndStop = () => {
      this.elements
        .progressBar()
        .invoke('attr', 'aria-valuenow')
        .then((currentValue) => {
          const numericValue = parseInt(currentValue);
          cy.log(`Progresso atual: ${numericValue}%`);
          if (numericValue < targetValue) {
            cy.wait(50);
            checkValueAndStop();
          } else {
            this.elements.startStopButton().should('be.enabled').click();
          }
        });
    };
    checkValueAndStop();
  }

  waitForCompletionAndReset() {
    cy.get('div[role="progressbar"]', { timeout: 20000 }).should(
      'have.attr',
      'aria-valuenow',
      '100'
    );

    this.elements.resetButton().click();
  }

  verifyProgressBarValue(assertionType, expectedValue) {
    this.elements
      .progressBar()
      .invoke('attr', 'aria-valuenow')
      .then((value) => {
        const numericValue = parseInt(value);
        switch (assertionType) {
          case 'lte':
            expect(numericValue).to.be.lte(expectedValue);
            break;
          case 'eq':
            expect(numericValue).to.equal(expectedValue);
            break;
          default:
            throw new Error(`Invalid assertion type: ${assertionType}`);
        }
      });
  }
}

export default new ProgressBarPage();

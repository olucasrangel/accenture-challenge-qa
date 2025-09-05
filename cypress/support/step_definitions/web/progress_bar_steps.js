import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../pages/HomePage';
import ProgressBarPage from '../../pages/ProgressBarPage';

Given('I am on the "Progress Bar" page', () => {
  HomePage.visit();
  HomePage.navigateToWidgetsPage();
  ProgressBarPage.navigateToProgressBar();
});

When('I start the progress bar', () => {
  ProgressBarPage.clickStartStopButton();
});

When(
  'I stop it when the progress is about to reach {int} percent',
  (targetValue) => {
    ProgressBarPage.stopWhenValueIsMet(10);
  }
);

Then(
  'the progress bar value should be less than or equal to {int}',
  (maxValue) => {
    ProgressBarPage.verifyProgressBarValue('lte', maxValue);
  }
);

When('I start the progress bar again', () => {
  ProgressBarPage.clickStartStopButton();
});

When('I reset it after it completes', () => {
  ProgressBarPage.waitForCompletionAndReset();
});

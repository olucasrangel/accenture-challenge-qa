Feature: Progress Bar Interaction

Scenario: Control and validate the progress bar
  Given I am on the "Progress Bar" page
  When I start the progress bar
  And I stop it when the progress is about to reach 25 percent
  Then the progress bar value should be less than or equal to 25
  When I start the progress bar again
  And I reset it after it completes
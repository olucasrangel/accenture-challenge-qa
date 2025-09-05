Feature: Browser Windows Interaction

Scenario: Open a new window and validate its content
  Given I am on the "Alerts, Frame & Windows" page
  When I click on the "New Window" button
  Then a new page should open with the message "This is a sample page"
  And I can return to the previous page
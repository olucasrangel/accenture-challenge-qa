Feature: Navigate to the Practice Form

Scenario: Successfully navigate, fill, and submit the practice form
  Given I visit the DemoQA website
  When I click on the "Forms" card
  And I select the "Practice Form" menu item
  And I fill the practice form with random valid data
  And I select "Computer Science" as a subject
  And I select "Sports" as a hobby
  And I upload a text file
  And I fill in the address details
  And I submit the form
  Then the confirmation modal should display the correct data
  And I close the confirmation modal
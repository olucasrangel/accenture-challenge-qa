Feature: Web Tables Manipulation

Scenario: Successfully create, edit, and delete a user record
  Given I am on the "Web Tables" page
  When I open the registration form
  And I fill the registration form with random valid data
  And I submit the registration form
  Then the new record should be visible in the table
  When I edit the new record with updated data
  Then the record should reflect the updated data in the table
  When I delete the new record
  Then the record should be removed from the table

  Scenario: Bulk create and delete user records
  Given I am on the "Web Tables" page
  When I create 12 new dynamic records
  Then the table should contain 15 records in total
  When I delete all created records
  Then the table should contain 3 records again
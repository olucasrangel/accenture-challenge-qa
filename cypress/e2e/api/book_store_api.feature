Feature: Book Store API Workflow

Scenario: Successfully create a user, add books, and verify the user's collection
  Given a new user is created via API
  When a token is generated for the new user
  And the user authorization is confirmed
  And two books are added to the user's collection
  Then the user's account details should include the two added books
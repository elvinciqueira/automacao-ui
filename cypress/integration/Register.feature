Feature: Register Account
  Scenario: Register account and access my account page
    Given I vistit EBAC Store
    When I register a new account with email and password
    Then I should be able to access my account page

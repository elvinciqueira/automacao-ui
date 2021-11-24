Feature: Checkout
  Scenario: As a User I want to buy a product
    Given I visit EBAC Shop "Produtos"
    When I add to the cart a product
    And I go to "Checkout"
    Then I should be able to order the product

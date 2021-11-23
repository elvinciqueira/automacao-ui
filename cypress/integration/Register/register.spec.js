/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';
import { RegisterPageObject } from '../../support/page_objects';

const emailFaker = faker.internet.email();
const name = emailFaker.split('@')[0];
const expectedWelcomeText = `Welcome ${name.toLowerCase()} !`;
const registerPageObject = new RegisterPageObject(cy);

describe('Register Account', () => {
  describe('Given I visit EBAC Store "Minha Conta"', () => {
    before(() => {
      cy.visit('minha-conta');
    });

    describe(`I register a new account with ${emailFaker} and "!teste@teste$"`, () => {
      beforeEach(() => {
        registerPageObject.fillFormAndSubmit(emailFaker, '!teste@teste$');
      });

      it('should be able to access my account page', () => {
        registerPageObject.welcomeText
          .should('be.visible')
          .should('include.text', expectedWelcomeText);
      });
    });
  });
});

// Given('I visit EBAC Store "Minha Conta"', () => {
//   cy.visit('minha-conta');
// });

// When('I register a new account with email and password', () => {
//   registerPageObject.fillFormAndSubmit(email, '!teste@teste$');
// });

// Then('I should be able to access my account page', () => {
//   cy.url().should('include', '/minha-conta');
//   cy.get('[class="hidden-xs"]')
//     .should('be.visible')
//     .should('include.text', `Welcome ${name}`);
// });

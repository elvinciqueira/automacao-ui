/// <reference types="cypress" />

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
        cy.url().should('include', '/minha-conta');
        registerPageObject.welcomeText
          .should('be.visible')
          .should('include.text', expectedWelcomeText);
      });
    });
  });
});

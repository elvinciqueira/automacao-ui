/// <reference types="cypress" />

import faker from 'faker';
import { RegisterPageObject } from '../../support/page_objects';

const emailFaker = faker.internet.email();
const name = emailFaker.split('@')[0];
const expectedWelcomeText = `Welcome ${name.toLowerCase()} !`;
const registerPageObject = new RegisterPageObject(cy);

describe('Register Account', () => {
  beforeEach(() => {
    cy.register(emailFaker, '!teste@teste$');
  });

  it('should be able to access my account page', () => {
    cy.url().should('include', '/minha-conta');
    registerPageObject.welcomeText
      .should('be.visible')
      .should('include.text', expectedWelcomeText);
  });
});

/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import faker from 'faker';
import { RegisterPageObject } from '../../support/page_objects';

const emailFaker = faker.internet.email();
const name = emailFaker.split('@')[0];
const expectedWelcomeText = `Welcome ${name.toLowerCase()} !`;
const registerPageObject = new RegisterPageObject(cy);

Given('I visit EBAC Store "Minha Conta"', () => {
  cy.visit('minha-conta');
});

When('I register a new account with email and password', () => {
  registerPageObject.fillFormAndSubmit(email, '!teste@teste$');
});

Then('I should be able to access my account page', () => {
  cy.url().should('include', '/minha-conta');
  registerPageObject.welcomeText
    .should('be.visible')
    .should('include.text', expectedWelcomeText);
});

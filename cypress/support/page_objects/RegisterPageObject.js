export default class RegisterPageObject {
  constructor(cy) {
    this.cy = cy;
  }

  get welcomeText() {
    return this.cy.get('[class="hidden-xs"]');
  }

  fillFormAndSubmit(email, password) {
    cy.get('#reg_email').type(email);
    cy.get('#reg_password').type(password);
    cy.get(':nth-child(4) > .button').click();
    return this;
  }
}

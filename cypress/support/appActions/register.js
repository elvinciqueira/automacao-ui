/// <reference types="cypress" />

Cypress.Commands.add('register', (email, password) => {
  const formData = new FormData();

  formData.append('email', email);
  formData.append('password', password);
  formData.append('woocommerce-register-nonce', 'ef87b4aa09');
  formData.append('_wp_http_referer', '/minha-conta/');
  formData.append('register', 'Register');

  cy.request({
    url: `minha-conta`,
    method: 'POST',
    body: formData,
  });

  cy.visit('/minha-conta/');
});

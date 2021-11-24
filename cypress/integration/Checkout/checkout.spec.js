/// <reference types="cypress" />

import {
  ProductPageObject,
  CheckoutPageObject,
} from '../../support/page_objects';

const billingFormData = require('../../fixtures/billing.json');
const data = require('../../fixtures/produtos.json');
const productPage = new ProductPageObject(cy);
const checkoutPage = new CheckoutPageObject(cy);

describe('Checkout', () => {
  describe('Given I visit EBAC shop "Produtos"', () => {
    before(() => {
      cy.visit('produtos');
    });

    describe('I add to the cart a product and go to checkout', () => {
      beforeEach(() => {
        const [produto] = data.produtos;

        productPage
          .chooseProduct(produto.nome)
          .selectSize(produto.tamanho)
          .selectColor(produto.cor)
          .addQuantity(produto.quantidade)
          .addToCart()
          .goToCheckout();

        checkoutPage
          .fillBillingForm({ ...billingFormData })
          .choosePaymentMethod(billingFormData.paymentMethod)
          .checkAgreementTerm()
          .purchaseItems();
      });

      it('I should be able order the product', () => {
        cy.url().should('include', 'order-received');
        cy.get('.woocommerce-notice').should(
          'contain',
          'Obrigado. Seu pedido foi recebido.'
        );
      });
    });
  });
});

import { HomePageObject, ProductSearchObject } from '../support/page_objects';
const data = require('../fixtures/data.json');

const homePage = new HomePageObject(cy);
const productSearchPage = new ProductSearchObject(cy);

describe('Product Search', () => {
  before(() => {});

  beforeEach(() => {
    cy.visit('/');
  });

  it('should not load list when has an error', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/wp-admin/admin-ajax*',
      },
      (req) => {
        req.reply({
          statusCode: 400,
          body: '{"error":"Bad Request"}',
        });
      }
    );

    homePage.searchMagnifier();
    productSearchPage.search('Jacket');
    productSearchPage.productList.should('have.length', 0);
  });

  it('autocomplete product item should be return correctly', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/wp-admin/admin-ajax*',
        query: {
          term: 'Jacket',
        },
      },
      (req) => {
        req.reply({
          statusCode: 200,
          body: `${req.query.callback}(
            ${JSON.stringify(data.autocompleteSearchData)} 
          )`,
        });
      }
    );

    homePage.searchMagnifier();
    productSearchPage.search('Jacket');
    productSearchPage.productList
      .first()
      .should('have.attr', 'title', 'Ingrid Running Jacket');
  });
});

export default class ProductSearchPageObject {
  constructor(cy) {
    this.cy = cy;
  }

  get autocompleteInput() {
    return cy.get('#tbay-header .tbay-search');
  }

  get productList() {
    return cy.get(`.ui-menu-item:not([class^="list-header"]) > a`);
  }

  search(product) {
    this.autocompleteInput.type(product);
  }
}

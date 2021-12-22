export default class HomePageObject {
  constructor(cy) {
    this.cy = cy;
  }

  get magnifier() {
    return this.cy.get('.site-header .search-form > button');
  }

  searchMagnifier() {
    this.magnifier.click();
  }
}

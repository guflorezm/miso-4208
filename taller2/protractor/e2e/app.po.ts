import {browser, by, element, ElementFinder} from 'protractor';

export class TourOfHeroesPage {
  navigateTo() {
    return browser.get('/');
  }

  getTop4Heroes() {
    return element.all(by.css('.module.hero')).all(by.tagName('h4')).getText();
  }

  navigateToHeroes() {
    element(by.linkText('Heroes')).click();
  }

  getAllHeroes() {
    return element(by.tagName('my-heroes')).all(by.tagName('li'));
  }

  enterNewHeroInInput(newHero: string) {
    element(by.tagName('input')).sendKeys(newHero);
    element(by.buttonText('Add')).click();
  }

  searchHeroe(heroe: string) {
    element(by.id('search-box')).sendKeys(heroe);
    element(by.className('search-result')).click();
    return element(by.tagName('input')).getAttribute("value");
  }

  deleteHeroe() {
    this.getAllHeroes().first().element(by.className('delete')).click();
  }

  editHeroe(heroeActual: string, heroeNuevo) {
    this.searchHeroe(heroeActual);
    element(by.tagName('input')).sendKeys(heroeNuevo);
    element(by.buttonText('Save')).click();
  }

  navigateToDashboard() {
    element(by.linkText('Dashboard')).click();
  }

  navigateToHeroeFromDashboard() {
    element.all(by.css('.module.hero')).get(1).click();
    expect(element(by.tagName('h2')).getText()).toBe('Narco details!');
  }

  navigateToHeroeFromList() {
    this.getAllHeroes().get(2).click();
    element(by.buttonText('View Details')).click();
    expect(element(by.tagName('h2')).getText()).toBe('Narco details!');
  }
}

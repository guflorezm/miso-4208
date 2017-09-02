import { TourOfHeroesPage } from './app.po';

describe('Tour of heroes Dashboard', () => {
  let page: TourOfHeroesPage;

  beforeEach(() => {
    page = new TourOfHeroesPage();
  });

  it('should display top 4 heroes', () => {
    page.navigateTo();
    expect(page.getTop4Heroes()).toEqual(['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas']);
  });

  it('should navigate to heroes', () => {
    page.navigateToHeroes();
    expect(page.getAllHeroes().count()).toBe(11);
  });
});

describe('Tour of heroes, Taller 2', () => {
  let page: TourOfHeroesPage;

  beforeEach(() => {
    page = new TourOfHeroesPage;
  });

  it('Debe buscar un heroe', () => {
    page.navigateTo();
    expect(page.searchHeroe("Narco")).toBe("Narco");
  });

  it('Debe eliminar un heroe', () => {
    page.navigateToHeroes();
    let numeroHeroes = page.getAllHeroes().count();
    page.deleteHeroe();
    expect(page.getAllHeroes().count()).toBe(numeroHeroes.then(n => n - 1));
  });

  it('Debe editar un heroe', () => {
     page.navigateTo();
     page.editHeroe("Bombasto", "Wolverine");
     page.navigateToDashboard();
     page.searchHeroe("Wolverine");
   });

   it('Debe ir a un heroe desde el Dashboard', () => {
      page.navigateTo();
      page.navigateToHeroeFromDashboard();
    });

    it('Debe ir a un heroe desde la lista de heroes', () => {
       page.navigateToHeroes();
       page.navigateToHeroeFromList();
     });

});

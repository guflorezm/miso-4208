var assert = require('assert');
describe('los estudiantes filtrar materia', function() {
    it('Visita losestudiantes.co y filtra materia de un profesor', function () {
        browser.url('https://losestudiantes.co/universidad-de-los-andes/ingenieria-de-sistemas/profesores/victor-manuel-toro-cordoba');

        browser.waitForVisible('.materias', 5000);
        browser.waitForVisible('input[name="ISIS3425"]', 5000);
        browser.element('.materias').element('input[name="ISIS3425"]').click();
        browser.pause(2000);
    });
});

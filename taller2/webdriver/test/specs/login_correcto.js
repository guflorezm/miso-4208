var assert = require('assert');
describe('los estudiantes login correcto', function() {
    it('Visita losestudiantes.co y loguea OK', function () {
        browser.url('https://losestudiantes.co');

        browser.click('button=Cerrar');
        browser.waitForVisible('button=Ingresar', 5000);
        browser.click('button=Ingresar');

        var cajaLogIn = browser.element('.cajaLogIn');

        var mailInput = cajaLogIn.element('input[name="correo"]');
        mailInput.waitForVisible(5000);
        mailInput.click();
        mailInput.setValue('gu.florez@uniandes.edu.co');

        var passwordInput = cajaLogIn.element('input[name="password"]');
        passwordInput.waitForVisible(5000);
        passwordInput.click();
        passwordInput.setValue('Gufm1025');

        cajaLogIn.element('button=Ingresar').click();
        browser.waitForVisible('#cuenta', 5000);
        expect(browser.element('#cuenta')).toBeDefined();
    });
});

module.exports = { // adapted from: https://git.io/vodU0
  'Los estudiantes login correcto': function(browser) {
    browser
      .url('https://losestudiantes.co/')
      .click('.botonCerrar')
      .waitForElementVisible('.botonIngresar', 4000)
      .click('.botonIngresar')
      .setValue('.cajaLogIn input[name="correo"]', 'gu.florez@uniandes.edu.co')
      .setValue('.cajaLogIn input[name="password"]', 'Gufm1025')
      .click('.cajaLogIn .logInButton')
      .waitForElementVisible('.botonDropdown', 4000)
      .assert.elementPresent("#cuenta")
      .end();
  }
};

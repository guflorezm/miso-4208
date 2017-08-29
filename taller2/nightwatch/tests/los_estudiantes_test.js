module.exports = { // adapted from: https://git.io/vodU0
  'Los estudiantes login falied': function(browser) {
    browser
      .url('https://losestudiantes.co/')
      .click('.botonCerrar')
      .waitForElementVisible('.botonIngresar', 4000)
      .click('.botonIngresar')
      .setValue('.cajaLogIn input[name="correo"]', 'wrongemail@example.com')
      .setValue('.cajaLogIn input[name="password"]', '12345')
      .click('.cajaLogIn .logInButton')
      .waitForElementVisible('.aviso.alert.alert-danger', 5000)
      .assert.containsText('.aviso.alert.alert-danger', 'El correo y la contraseña que ingresaste no figuran')
      .end();
  }
};

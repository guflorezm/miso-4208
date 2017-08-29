module.exports = { // adapted from: https://git.io/vodU0
  'Los estudiantes buscar profesor': function(browser) {
    browser
    .url('https://losestudiantes.co/')
    .click('.botonCerrar')
    .waitForElementVisible('.Select-placeholder', 4000)
    .click('.Select-placeholder')
    .pause(1000)
    .setValue('.Select-input input[role="combobox"]', ['Victor Manuel Toro', browser.Keys.ENTER])
    .pause(4000)
    .assert.containsText('.Select-menu-outer .Select-option', 'Victor Manuel Toro Cordoba')
    .end();
  }
};

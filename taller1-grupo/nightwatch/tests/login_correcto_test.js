module.exports = {
  'open-source-billing login correcto': function(browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('.submit', 4000)
      .setValue('input[id="login_email"]', 'gu.florez@uniandes.edu.co')
      .setValue('input[id="login_pswd"]', 'Gufm1025')
      .click('.submit')
      .waitForElementVisible('.dashboart_menu', 4000)
      .assert.containsText('body', "guflorezm")
      .end();
  }
};

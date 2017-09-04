module.exports = {
  'login correcto': function(browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('.submit', 4000)
      .setValue('input[id="login_email"]', 'gu.florez@uniandes.edu.co')
      .setValue('input[id="login_pswd"]', 'Gufm1025')
      .click('.submit')
      .waitForElementVisible('.dashboart_menu', 4000)
      .assert.containsText('body', "guflorezm")
  },

  'logout correcto': function(browser) {
    browser
      .useXpath()
      .click('//a[normalize-space(text())="guflorezm"]')
      .waitForElementVisible('//div[@class="dropdown-menu"]', 4000)
      .click('//div[@class="dropdown-menu"]//a[@href="/en/users/logout"]')
      .useCss()
      .waitForElementPresent('.notice', 4000)
      .assert.containsText('body', "You need to sign in or sign up")
      .end();
  }

};

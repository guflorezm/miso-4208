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

  'crear impuesto': function(browser) {
    browser
      .useXpath()
      .click('//a[@href="/en/items"]')
      .waitForElementPresent('//li[@class="dropdown"]//ul[@class="sub"]//a[@href="/en/taxes"]', 4000)
      .click('//li[@class="dropdown"]//ul[@class="sub"]//a[@href="/en/taxes"]')
      .waitForElementPresent('//a[@href="/en/taxes/new"]', 4000)
      .click('//a[@href="/en/taxes/new"]')
      .useCss()
      .waitForElementVisible('input[value="Create Tax"]', 4000)
      .setValue('input[id="tax_name"]', 'IVA 19%')
      .setValue('input[id="tax_percentage"]', '19')
      .useCss()
      .click('input[value="Create Tax"]')
      .waitForElementPresent('.alert-success', 4000)
      .assert.containsText('tbody', "Tax has been created successfully.")
      .end();
  }

};

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

  'crear item': function(browser) {
    browser
      .useXpath()
      .click('//div[@class="dashboart_menu"]//a[@href="/en/items/new"]')
      .useCss()
      .waitForElementVisible('input[value="Create Item"]', 4000)
      .setValue('input[id="item_item_name"]', 'Item 3 Prueba')
      .setValue('#item_item_description', 'Esta es la descripcion del Item 3 Prueba')
      .setValue('input[id="item_unit_cost"]', '1000000')
      .setValue('input[id="item_quantity"]', '1000')
      .useXpath()
      .click('//div[@id="item_tax_1_chzn"]//a')
      .pause(4000)
      .setValue('//div[@id="item_tax_1_chzn"]//div[@class="chzn-search"]//input', ['IVA 19%', browser.Keys.ENTER])
      .pause(1000)
      .useCss()
      .click('#account_association')
      .click('input[value="Create Item"]')
      .waitForElementPresent('.alert-success', 4000)
      .assert.containsText('tbody', "Item has been created successfully.")
      .end();
  }

};

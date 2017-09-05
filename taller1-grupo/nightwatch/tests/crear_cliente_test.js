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

  'crear cliente': function(browser) {
    browser
      .useXpath()
      .click('//div[@class="dashboart_menu"]//a[@href="/en/clients/new"]')
      .useCss()
      .waitForElementVisible('input[value="Create Client"]', 4000)
      .setValue('input[id="client_organization_name"]', 'Cliente 6 Prueba')
      .setValue('input[id="client_email"]', 'gerflomo@hotmail.com')
      .setValue('input[id="client_business_phone"]', '5514808')
      .setValue('input[id="client_first_name"]', 'Cliente 6')
      .setValue('input[id="client_last_name"]', 'Prueba')
      .setValue('input[id="client_mobile_number"]', '3058174676')
      .click('#account_association')
      .useXpath()
      .click('//div[@class="fields_content_heading"]//h2[normalize-space(text())="Details"]')
      .useCss()
      .waitForElementPresent('#client_country', 1000)
      .useXpath()
      .click('//div[@id="client_country_chzn"]//a')
      .pause(4000)
      .setValue('//div[@id="client_country_chzn"]//div[@class="chzn-search"]//input', ['Colombi', browser.Keys.ENTER])
      .pause(2000)
      .useCss()
      .setValue('input[id="client_address_street1"]', 'Carrera 112 # 72F - 11')
      .setValue('input[id="client_city"]', 'Bogota')
      .setValue('input[id="client_province_state"]', 'Cundinamarca')
      .setValue('input[id="client_postal_zip_code"]', '11031')
      .useXpath()
      .click('//div[@id="client_industry_chzn"]//a')
      .pause(4000)
      .setValue('//div[@id="client_industry_chzn"]//div[@class="chzn-search"]//input', ['Software', browser.Keys.ENTER])
      .pause(2000)
      .useCss()
      .click('input[value="Create Client"]')
      .waitForElementPresent('.alert-success', 4000)
      .assert.containsText('tbody', "Client has been created successfully.")
      .end();
  }

};

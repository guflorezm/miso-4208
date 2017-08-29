describe('Los estudiantes buscar profesor', function() {
    it('Visita los estudiantes y busca un profesor', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()
      //Lineas nuevas
      cy.get('.buscador').find('.Select-placeholder').click()
      cy.get('.buscador').find('input[role="combobox"]').type('Victor Manuel Toro')
      cy.wait(3000)
      cy.get('.buscador').find('input[role="combobox"]').type('{downarrow}{enter}')
      cy.wait(3000)
    })
})

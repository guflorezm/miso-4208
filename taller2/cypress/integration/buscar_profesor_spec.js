describe('Los estudiantes buscar profesor', function() {
    it('Visits los estudiantes and busca un profesor', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()
      //Lineas nuevas
      cy.contains('Buscar un profesor...').click().type("Gloria Cristina Cortes Buitrago")
      //cy.contains('Buscar un profesor...').find('input').click().type("Gloria Cristina Cortes Buitrago")
    })
})

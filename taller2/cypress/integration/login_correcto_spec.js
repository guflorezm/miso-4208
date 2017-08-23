describe('Los estudiantes login correcto', function() {
    it('Visits los estudiantes and works at login', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()
      //Lineas nuevas
      cy.contains('Ingresar').click()
      cy.get('.cajaLogIn').find('input[name="correo"]').click().type("gu.florez@uniandes.edu.co")
      cy.get('.cajaLogIn').find('input[name="password"]').click().type("Gufm1025")
      cy.get('.cajaLogIn').contains('Ingresar').click()
    })
})

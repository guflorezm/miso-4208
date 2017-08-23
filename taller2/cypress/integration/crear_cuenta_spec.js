describe('Los estudiantes crear cuenta existente', function() {
    it('Visits los estudiantes and fails crea cuenta', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()
      // Lineas nuevas
      cy.contains('Ingresar').click()
      cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("Gerson")
      cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("Florez")
      cy.get('.cajaSignUp').find('input[name="correo"]').click().type("gu.florez@uniandes.edu.co")
      cy.get('.cajaSignUp').find('select[name="idUniversidad"]').select("universidad-de-los-andes")
      cy.get('.cajaSignUp').find('select[name="idDepartamento"]').select("3")
      cy.get('.cajaSignUp').find('input[name="password"]').click().type("Gufm1025")
      cy.get('.cajaSignUp').find('input[name="acepta"]').check().should('be.checked')
      cy.get('.cajaSignUp').contains('Registrarse').click()
      cy.contains("Error: Ya existe un usuario registrado con el correo 'gu.florez@uniandes.edu.co'")
    })
})

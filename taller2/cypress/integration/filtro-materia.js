describe('Los estudiantes filtrar materia', function() {
    it('Visita los estudiantes y filtra una materia', function() {
      cy.visit('https://losestudiantes.co/universidad-de-los-andes/ingenieria-de-sistemas/profesores/victor-manuel-toro-cordoba')
      cy.get(".materias").find('[type="checkbox"]').last().check()
      cy.wait(3000)
    })
})

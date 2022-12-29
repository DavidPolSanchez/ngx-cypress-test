/// <reference types="cypress" />

describe('Our First Suite', () => {


  it('first Test', () => {
/*
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //? by Tag Name
    cy.get('input')

    //? by Id
    cy.get('#inputEmail1')
    
     //? by Class Name
    cy.get('.input-full-width')
    
     //? by Attribute Name
    cy.get('[placeholder]')
    
     //? by by Attribute Name and Value
    cy.get('[placeholder="Email"]')
    
    //? by Class Value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')
    
    //? by Tag Name Attribute with Value
    cy.get('input[placeholder="Email"]')
    
    //? by two different attributes
    cy.get('[placeholder="Email"][type="email"]')
    
    //? by Tag Name ,Attribute with Value, ID and Class Name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    //? THE MOST RECOMENDED WAY IS CREATE YOUR OWN SELECTORES
    cy.get('input[data-cy="imputEmail1"]')
    */
  })

  it('Second Test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')
    
    cy.contains('Sign in')

    cy.contains('[status="warning"]','Sign in')
    //! con este cogemos los 8
    cy.get('#inputEmail3')
        .parents('form')
        .get('button')
    //! con este cogemos el que esta dentro del filtro
    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain','Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

      cy.contains('nb-card','Horizontal form').find('[type="email"]')
  })

})

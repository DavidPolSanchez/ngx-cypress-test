/// <reference types="cypress" />

describe('Our First Suite', () => {


  it('first Test', () => {

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
    
    
  })

})

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

  it('Second Test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')
    
    cy.contains('Sign in')

    cy.contains('[status="warning"]','Sign in')

    // con este cogemos los 8
    cy.get('#inputEmail3')
        .parents('form')
        .get('button')
    // con este cogemos el que esta dentro del filtro
    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain','Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

      cy.contains('nb-card','Horizontal form').find('[type="email"]')
  })

  it('Then and wrap methods', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //*loking for the secod card
    //cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    //cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')  
    //cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
    //cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')  

    //!Selenium Not GOOD -Cypress is asincronous and doesn't manage this way the variables.
      //const firstForm = cy.contains('nb-card','Using the Grid')
      //const secondForm = cy.contains('nb-card','Basic form')

      //firstForm.find('[for="inputEmail1"]').should('contain','Email')
      //firstForm.find('[for="inputPassword2"]').should('contain','Password')
      //secondForm.find('[for="exampleInputEmail1"]').should('contain','Email address')

    //!CYPRESS STYLE

      cy.contains('nb-card','Using the Grid').then(firstForm => {
        //Jquery 
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
        const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
        expect(emailLabelFirst).to.equal('Email')
        expect(passwordLabelFirst).to.equal('Password')

        cy.contains('nb-card','Basic form').then(secondForm => {
          const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
          expect(passwordLabelFirst).to.equal(passwordSecondText)

          //!use wrap to change context from jquery to cypress
          cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
        })
      })

  })
  it.only('invoke command', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2 using jquery  method
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    //3 using cypress method
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
      expect(text).to.equal('Email address')
    })

    //4
    cy.contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr','class')
          //.should('contain','checked')
        .then(classValue=>{
              expect(classValue).to.contain('checked')
        })
  })



  it.only('assert property', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop','value').should('contain', 'Dec 17, 2022')
      })
  })




  it.only('radio button', () => {
    cy.visit('/')
    cy.contains("Forms").click()
    cy.contains('Form Layouts').click()
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
        cy.wrap(radioButtons)
          .first()
          .check({force: true})
          .should('be.checked')
        cy.wrap(radioButtons)
            .eq(1)
            .check({force: true})
        cy.wrap(radioButtons)
            .first() 
            .should( 'not.be.checked')
    })
  })  


  it.only('assert event', () => {

    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    //cy.get('[type="checkbox"]').check({force: true})
    cy.get('[type="checkbox"]').eq(0).click({force: true})
    cy.get('[type="checkbox"]').eq(1).check({force: true})
    
  })


})






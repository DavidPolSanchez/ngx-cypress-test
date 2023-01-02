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

  it('invoke command', () => {

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

  it('assert property', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop','value').should('contain', 'Dec 17, 2022')
      })
  })

  it('radio button', () => {
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

  it('assert event', () => {

    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    //cy.get('[type="checkbox"]').check({force: true})
    cy.get('[type="checkbox"]').eq(0).click({force: true})
    cy.get('[type="checkbox"]').eq(1).check({force: true})
    
  })

  it('lists and dropdowns', () => {
    cy.visit('/')
     //1
     // cy.get('nav nb-select').click()
       //cy.get('.options-list').contains('Dark').click()
       //cy.get('nav nb-select').should('contain', 'Dark')
       //cy.get('nb-layout-header nav'), should( 'have. css', 'background-color', 'rgb(34, 43, 69)')
     //2
    cy.get( 'nav nb-select').then( dropdown => {
        cy.wrap(dropdown).click()
        cy.get('.options-list nb-option').each( (listItem, index) => {
            const itemText = listItem.text().trim()
            
            const colors = {
                "Light": "rgb(255, 255, 255)",
                "Dark": "rgb(34, 43, 69)",
                "Cosmic": "rgb(50, 50, 89)",
                "Corporate": "rgb(255, 255, 255)"
            }

            cy.wrap(listItem).click()
            cy.wrap(dropdown).should('contain', itemText)
            cy.get('nb-layout-header nav').should( 'have.css', 'background-color', colors[itemText])
            if( index < 3){
              cy.wrap(dropdown).click()
            }
        })
    })
  })
  
  it('Web tables', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get( 'tbody').contains('tr', 'Larry'). then( tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
        су.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').eq(6).shoulkd('contain','25')
                                                                
    })
     //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('tbody').find('tr').eq(2).then( tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bordam')
      cy.wrap(tableRow).find('nb-checkmark').type('Artem')
    })
    cy.get('tbody tr').first().find('td').then(tableColumns => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
        cy.wrap(tableColumns).eq(3).should('contain', 'Bordam')
    })

    //3
    const age = [20,30,40,200]

    cy.wrap(age).each( age =>{
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each( tableRow => {
        if(age == 200){
          cy.wrap(tableRow).should('contain','No data found')
        }else{
          cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        }
        
      })
    })
  })

  it.only('Pro DatePicker',() =>{
    //funtionregion
    function selectDayFromCurrent(day){
      let date = new Date() 
      date.setDate(date.getDate() + day)
      let futureDay = date.getDate() 
      let futureMonth = date.toLocaleDateString('default',{month:'short'})
      let dateAssert = futureMonth + ' ' + futureDay +', '+date.getFullYear()
      cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( dateAttribute => {
        if(!dateAttribute.includes(futureMonth)){
          cy.get('[ata-name="chevron-right"]').click()
          selectDayFromCurrentMonth(day)
        }else{
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).first().click()
        }
      })
      return dateAssert
    }
    //end function region 

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card','Common Datepicker').find('input').then( input => {
      cy.wrap(input).click()
      let dateAssert = selectDayFromCurrent(7)
      cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
    })
  })
})






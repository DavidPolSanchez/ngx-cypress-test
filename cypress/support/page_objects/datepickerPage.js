
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
        cy.get('.day-cell').not('.bounding-month').contains(futureDay).first().click()
    }
    })
    return dateAssert
  }
  //end function region 

export class datepickerPage {


    selectCommonDatePickerDatFromToday(day){

        cy.contains('nb-card','Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        let dateAssert = selectDayFromCurrent(day)
        cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
        cy.wrap(input).should('have.value', dateAssert)
        })
    }

    selectCommonDatePickerDatFromToday(day,secondDay){

        cy.contains('nb-card','Datepicker With Range').find('input').then( input => {
        cy.wrap(input).click()
        let dateAssertFirst = selectDayFromCurrent(day)
        let dateAssertSecond = selectDayFromCurrent(secondDay)
        const finaldate = dateAssertFirst + ' - ' + dateAssertSecond
        cy.wrap(input).invoke('prop','value').should('contain',finaldate)
        cy.wrap(input).should('have.value', finaldate)
        })
    }

}

export const  onDatePickerPage = new datepickerPage()
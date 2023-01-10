function selectgroupItem(groupName){
  cy.contains('a',groupName).then(menu=>{
    cy.wrap(menu).find('.expand-state g g').invoke('attr','data-name').then(attr =>{
      if(attr.includes('left')){
        cy.wrap(menu).click()
      }
    })
  })
}

export class navigationPage{
  
  formLayoutsPage(){
    selectgroupItem('Forms')
    cy.contains('Form Layouts').click()
  }

  datePickerPage(){
    selectgroupItem('Forms')
    cy.contains('Datepicker').click()
  }

  toasterPage(){
    selectgroupItem('Modal & Overlays')
    cy.contains('Toastr').click()
  }

  smartTablePage(){
    selectgroupItem('Tables & Data')
    cy.contains('Smart Table').click()
  }
  tooltipPage(){
    selectgroupItem('Modal & Overlays')
    cy.contains('Tooltip').click()
  }


}

export const navigateTo = new navigationPage()
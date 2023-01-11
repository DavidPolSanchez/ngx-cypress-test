import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { onDatePickerPage } from "../support/page_objects/datepickerPage"

describe("Test with Page Objects", () => {

    beforeEach('open aplication',() => {
        cy.openHomePage()
            
    })

    it("verify navigations accross the pages", () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })


    it.only('should submit Inline and Basic form and select tomorrow date calendar',()=>{
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineForWithNameAndEmail("Artem","test@test.com")
        onFormLayoutsPage.submitInlineForWithEmailAndPassword("test@test.com","password")
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerDatFromToday(7,9)
    })
})
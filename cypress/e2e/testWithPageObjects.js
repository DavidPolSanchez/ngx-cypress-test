import { navigateTo } from "../support/page_objects/navigationPage"

describe("Test with Page Objects", () => {

    beforeEach(() => {
        cy.visit("/")
            
    })

    it("verify navigations accross the pages", () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })
})
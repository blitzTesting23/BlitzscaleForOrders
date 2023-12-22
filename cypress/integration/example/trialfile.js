import Nudges from "../PageObjects/Nudges"
import Filters from "../PageObjects/Filters"
import ApproveRequests from "../PageObjects/ApproveReturnRequests"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"

describe('New Requests filter check', function () {
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })

    it('ReturnRequests_05_01',function(){
        const Nudge=new Nudges();
        const filters=new Filters();
        const approve=new ApproveRequests();
        const misc=new SidebarAndMisc();
        misc.url()
        cy.get('.rs-input').type(this.data.PhoneNo)
        cy.get('.Button_button-primary__9i0Rz').click()
        cy.wait(2000);
        cy.get('.rs-input').type(this.data.Password);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000)

        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("nitin ",main.find('div[role="dialog"]').length)
              if(main.find('div[role="dialog"]').length>0){
                cy.get('.Button_button-ghost__rieSu').click();   
                cy.wait(2000);
            }})

            misc.sidebarwidgets().trigger('mouseover');
            cy.wait(1000)
           misc.sidebarMenuItems().each(($el, index, $list) => {
                const settings = $el.find('p').text();
    
                if (settings.includes('Finance')) {
                    $el.find('p').click();
                }
            })
            misc.expenseLedger().click();
            cy.wait(1000)
            //to handle the nudges 
            cy.get('div[class="PnlHeaderCard_linear-gradient-primary__L+uim"]').click()
            cy.wait(1000)
            filters.getSearchFilterDropDown().click()    
            cy.wait(1000)  
                filters.getSearchFilterDropDown().each(($el, index, $list) => {
                    const searchBox = $el.find('p').text();
                    if (searchBox.includes('Action')) {
                        $el.click();
                    }
                })
                filters.getInputBoxForSearchFilter().type('R_NS07K1697457719148')
                filters.getSearchSVG().click()
                cy.wait(1000)
                cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(1) div:nth-child(5) p').should('contain','R_NS07K1697457719148')
                cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(2) div:nth-child(5) p').should('contain','R_NS07K1697457719148')
                cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(1) div:nth-child(3) p').should('contain','Return Order Refund')
                cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(2) div:nth-child(3) p').should('contain','Shipping Charge')
                cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(1) div:nth-child(4) p').should('contain','-') 
                cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(2) div:nth-child(4) p').should('contain','-')
                cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(1) div:nth-child(7) p').should('contain','Return') 
                cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(2) div:nth-child(7) p').should('contain','Return')
        })
    

})
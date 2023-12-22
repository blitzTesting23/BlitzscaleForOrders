import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
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
        const Nudge=new NudgesAndColumns();
        const filters=new Filters();
        const approve=new ApproveRequests();
        const misc=new SidebarAndMisc();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo)
        misc.submit().click()
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000)
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find('div[role="dialog"]').length)
              if(main.find('div[role="dialog"]').length>0){
                cy.get('.Button_button-ghost__rieSu').click();   
                cy.wait(2000);
            }})
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        misc.returnRequests().click();
        cy.wait(1000)
        //to handle the nudges 
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
            }})

            Nudge.getinfobutton().click();
            cy.wait(1000)
            Nudge.getinfobutton().click();
            cy.wait(1000)
            filters.getSearchFilterDropDown().click()
        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
            const searchBox = $el.find('p').text();
            if (searchBox.includes('ID')) {
                $el.click();
            }
        })
        filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
        filters.getSearchSVG().click()    

        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("The length present",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length

                     if (length === 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                             const OrderID=$el.text()
                             if(OrderID.includes(this.data.newRequestsOrderID)){
                                cy.log('The searched ID is present in the table')
                             }
                         })
                     }
                     else
                         if (length > 1) {
                             filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                                 const OrderIDs = $el.text();
                                 cy.log('Multiple requests are present with the same Order ID ')
                             })
                         }
                         filters.buttonListfromtheOrderLineItem().each(($el, index, $list) => {
                            const approvebutton = $el.text();
                            if(approvebutton.includes('Approve')){
                                $el.click()
                                cy.wait(1000)
                            }
                        })

                        approve.header().should('have.text','Approve Return Request')
                        approve.bookreturnshipmenttext().should('contain','Book Return Shipment')
                        approve.qcOnReturnText().should('contain','Quality Check on Return')
                        approve.autoSettlementText().should('contain','Auto Settlement')
                       approve.shippingPartnerCheck().eq(1).then((shippingpartner)=>{
                        if(shippingpartner.find('div[role="gridcell"]').length>0){
                           cy.log('shipping partners available are ',shippingpartner.find('div[role="gridcell"]').text()) //available Logistic partners 
                        }
                       })
                      approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                        const courierpartner = $el.text();
                        if(courierpartner.includes('Ecom')){
                            $el.click();
                        }
                    })
                    approve.approveButton().click();
                    cy.wait(1000)
                    })

                    approve.qcCheckListButton().click()//click on QC checklist 
                    cy.wait(1000)
                    approve.header().should('have.text','QC Checklist') //Assert the QC checklist window 
                    approve.productTypeDropDown().click()
                    cy.wait(1000)
                    approve.optionsfromtheDropdown().each(($el, index, $list) => {
                        $el.click().eq(3)
                    })   
                  approve.sizeDropdown().click()
                    cy.wait(1000)
                    approve.optionsfromtheDropdown().each(($el, index, $list) => {
                        $el.click().eq(6)
                    })          
                    approve.approveButton().click()
                    approve.checkboxForApproveReturnRequest().check({ force: true })                   
                    approve.areaCheckedTrue().should('exist')
                    cy.wait(1000)
                    approve.approveButton().click()
                    cy.wait(1000)
                    filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
                    cy.wait(1000)
                    filters.getSearchSVG().click()    
                    cy.wait(1000)
                    filters.resultcardwithNoItems().should('not.exist')

                    cy.log('The order has moved from new requests tab') 
                    cy.wait(1000)     
                    misc.ongoingTabField().click()      //click on the ongoing tab      
                    filters.getSearchFilterDropDown().click()
                filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
                    const searchBox = $el.find('p').text();
                    if (searchBox.includes('ID')) {
                        $el.click();
                    }
                })
                filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID) ///to enter values in search input box 
        filters.getSearchSVG().click()    
        filters.searchResultCard().then((cardforresults)=>{   
            cy.log("The length present",cardforresults.find('p').length) //verify the results are present 
              if(cardforresults.find('p').length>0)
              {
                  filters.OrderDetailsLineItem().then(($value) => {
                      length = $value.length
 
                      if (length === 1) {
                          filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                            const OrderID=$el.text()
                              if(OrderID.includes(this.data.newRequestsOrderID)){
                                 cy.log('The searched ID is present in the table and AWB is created')
                                 
                              approve.returnshippingstatus().should('contain','Created')
                             approve.awbforOnfgoingTab().should('contain','AWB')
                             approve.trackLink().should('have.attr','href')
                             approve.settlementStatus().should('contain','REFUND')
                             approve.autoSettlement().should('contain','Yes')
                              }
                              else{
                                 cy.log('The return is not created according to requirement ')
                              }
                              
                          })
                      }  
                     })        
              }
            })     
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
            .click()
            cy.wait(1000)
            filters.getSearchFilterDropDown().click()    
            cy.wait(1000)  
                filters.getSearchFilterDropDown().each(($el, index, $list) => {
                    const searchBox = $el.find('p').text();
                    if (searchBox.includes('Action')) {
                        $el.click();
                    }
                })
                filters.getInputBoxForSearchFilter().type('R_NS0T81701941715098')
                filters.getSearchSVG().click()
                cy.wait(1000)
                approve.returnOrderRefundOrderID().should('contain','R_NS0T81701941715098') //return Order Refund Order ID assertion
                approve.shippingChargeOrderID().should('contain','R_NS0T81701941715098')    //shipping charge Order ID assertion
                approve.spendTypeForReturnOrderRefund().should('contain','Return Order Refund')  //spendType assertion for return order refund 
                approve.spendTypeForShippingcharge().should('contain','Shipping Charge')  //spendtype assertion for shipping charge 
                approve.amountForReturnOrderRefund().should('contain','-')  //amount assertion for return order refund 
                approve.amountForShippingCharge().should('contain','-')     //amount assertion for shipping charge 
                approve.triggerForOrderRefund().should('contain','Return')  //trigger state for return order refund 
                approve.triggerForShippingCharge().should('contain','Return') //trigger state for return shipping charge 

             }
             else{
                misc.noresultFound().then(($el)=>{
                 const NoorderFOund=$el.text()
                 cy.log(NoorderFOund)
                 cy.log('No results Were forund for this order ID ')
             })
                }
         }) 

    })
    
    //Verify the selectable and unselectable fields and amount fields for the approve return request in new requests tab 
    it.only('ReturnRequests_05_02',function(){
        const Nudge=new NudgesAndColumns();
        const filters=new Filters();
        const approve=new ApproveRequests();
        const misc=new SidebarAndMisc();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo)
        misc.submit().click()
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000)
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find('div[role="dialog"]').length)
              if(main.find('div[role="dialog"]').length>0){
                cy.get('.Button_button-ghost__rieSu').click();   
                cy.wait(2000);
            }})
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        misc.returnRequests().click();
        cy.wait(1000)
        //to handle the nudges 
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
            }})

            Nudge.getinfobutton().click();
            cy.wait(1000)
            Nudge.getinfobutton().click();
            cy.wait(1000)
            filters.getSearchFilterDropDown().click()
        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
            const searchBox = $el.find('p').text();
            if (searchBox.includes('ID')) {
                $el.click();
            }
        })
        filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
        filters.getSearchSVG().click()    

        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("The length present",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length

                     if (length === 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                             const OrderID=$el.text()
                             if(OrderID.includes(this.data.newRequestsOrderID)){
                                cy.log('The searched ID is present in the table')
                             }
                         })
                     }
                     else
                         if (length > 1) {
                             filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                                 const OrderIDs = $el.text();
                                 cy.log('Multiple requests are present with the same Order ID ')
                             })
                         }
                         filters.buttonListfromtheOrderLineItem().each(($el, index, $list) => {
                            const approvebutton = $el.text();
                            if(approvebutton.includes('Approve')){
                                $el.click()
                                cy.wait(1000)
                            }
                        })

                        approve.header().should('have.text','Approve Return Request')
                        approve.bookreturnshipmenttext().should('contain','Book Return Shipment')
                        approve.qcOnReturnText().should('contain','Quality Check on Return')
                        approve.autoSettlementText().should('contain','Auto Settlement')
                       approve.shippingPartnerCheck().eq(1).then((shippingpartner)=>{
                        if(shippingpartner.find('div[role="gridcell"]').length>0){
                           cy.log('shipping partners available are ',shippingpartner.find('div[role="gridcell"]').text()) //available Logistic partners 
                        }
                       })
                    
                    approve.approveButton().click();
                    cy.wait(1000)
                    
                    })
                    approve.qcCheckListButton().click()//click on QC checklist 
                    cy.wait(1000)
                    approve.header().should('have.text','QC Checklist') //Assert the QC checklist window 
                    approve.productTypeDropDown().click()
                    cy.wait(1000)
                    approve.optionsfromtheDropdown().each(($el, index, $list) => {
                        $el.click().eq(3)
                    })   
                  approve.sizeDropdown().click()
                    cy.wait(1000)
                    approve.optionsfromtheDropdown().each(($el, index, $list) => {
                        $el.click().eq(6)
                    })          
                    approve.approveButton().click() //click on submit for QC 
                    approve.checkboxForApproveReturnRequest().check({ force: true })        //check for            
                    approve.areaCheckedTrue().should('exist')
                    cy.wait(1000)
                      
                    filters.getSearchFilterDropDown().click()
                filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
                    const searchBox = $el.find('p').text();
                    if (searchBox.includes('ID')) {
                        $el.click();
                    }
                })
                filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID) ///to enter values in search input box 
        filters.getSearchSVG().click()    
        filters.searchResultCard().then((cardforresults)=>{   
            cy.log("The length present",cardforresults.find('p').length) //verify the results are present 
              if(cardforresults.find('p').length>0)
              {
                  filters.OrderDetailsLineItem().then(($value) => {
                      length = $value.length
 
                      if (length === 1) {
                          filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                            const OrderID=$el.text()
                              if(OrderID.includes(this.data.newRequestsOrderID)){
                                 cy.log('The searched ID is present in the table and AWB is created')
                                 
                              approve.returnshippingstatus().should('contain','Created')
                             approve.awbforOnfgoingTab().should('contain','AWB')
                             approve.trackLink().should('have.attr','href')
                             approve.settlementStatus().should('contain','REFUND')
                             approve.autoSettlement().should('contain','Yes')
                              }
                              else{
                                 cy.log('The return is not created according to requirement ')
                              }
                              
                          })
                      }  
                     })        
              }
            })     
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
            .click()
            cy.wait(1000)
            filters.getSearchFilterDropDown().click()    
            cy.wait(1000)  
                filters.getSearchFilterDropDown().each(($el, index, $list) => {
                    const searchBox = $el.find('p').text();
                    if (searchBox.includes('Action')) {
                        $el.click();
                    }
                })
                filters.getInputBoxForSearchFilter().type('R_NS0T81701941715098')
                filters.getSearchSVG().click()
                cy.wait(1000)
                approve.returnOrderRefundOrderID().should('contain','R_NS0T81701941715098') //return Order Refund Order ID assertion
                approve.shippingChargeOrderID().should('contain','R_NS0T81701941715098')    //shipping charge Order ID assertion
                approve.spendTypeForReturnOrderRefund().should('contain','Return Order Refund')  //spendType assertion for return order refund 
                approve.spendTypeForShippingcharge().should('contain','Shipping Charge')  //spendtype assertion for shipping charge 
                approve.amountForReturnOrderRefund().should('contain','-')  //amount assertion for return order refund 
                approve.amountForShippingCharge().should('contain','-')     //amount assertion for shipping charge 
                approve.triggerForOrderRefund().should('contain','Return')  //trigger state for return order refund 
                approve.triggerForShippingCharge().should('contain','Return') //trigger state for return shipping charge 

             }
             else{
                misc.noresultFound().then(($el)=>{
                 const NoorderFOund=$el.text()
                 cy.log(NoorderFOund)
                 cy.log('No results Were forund for this order ID ')
                 cy.get('.Flexbox_flex-column__cNkZ2 > .Button_button-primary__9i0Rz').click();
             })
                }
         }) 

    })
    
})
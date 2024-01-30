import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import Filters from "../PageObjects/Filters"
import ApproveRequests from "../PageObjects/ApproveReturnRequests"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"

describe('New Requests filter check', function () {
    let OrderIDForReturn
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })

    //Verify the selectable and unselectable fields and amount fields for the approve return request in new requests tab and All the fields are QC 
    it('ReturnRequests_05_02',function(){
        let OrderIDForReturn
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
             cy.log("dialogue box ",main.find(Nudge.dialogue).length)
               if(main.find(Nudge.dialogue).length>0){
                 Nudge.nudgeClick().click();   
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
             cy.log("nitin ",main.find(Nudge.floater).length)
               if(main.find(Nudge.floater).length>0){
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
                             OrderIDForReturn=$el.text()
                              if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
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
                         approve.autoSettlementFields().eq(0).should('contain','Customer Paid')
                         approve.autoSettlementFields().eq(1).should('contain','Eligible Refund Amount')
                        approve.shippingPartnerCheck().eq(1).then((shippingpartner)=>{
                         if(shippingpartner.find(Nudge.gridcell).length>0){
                            cy.log('shipping partners available are ',shippingpartner.find(Nudge.gridcell).text()) //available Logistic partners 
                         }
                        })
                     })
                     approve.qcCheckListButton().should('have.text','View QC Checklist')
                     cy.wait(1000)
                     approve.qcCheckListButton().click()//click on QC checklist 
                     cy.wait(1000)
                     approve.header().should('have.text','QC Checklist') //Assert the QC checklist window 
                     approve.qcInfoText().should('contain','Please provide correct reference information for the PRODUCT RECEIVED by the User')
                     approve.qcProductPhotos().should('have.text','Update Product Photos')
                     approve.qcDetails().eq(0).should('contain','Dispatched Product Images')
                     approve.qcDetails().eq(1).should('contain','Product Type')
                     approve.qcDetails().eq(2).should('contain','Size')
                     approve.qcDetails().eq(3).should('contain','Color')                    
                     approve.approveButton().click() //click on submit for QC 
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

    //Verify The return request is approved with options Book Return Shipment=True,QC on return=true,Auto Settlement=true and shipping partners present in new requests tab 
    it('ReturnRequests_05_04',function(){
        let OrderIDForReturn
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
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
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
            cy.log("nitin ",main.find(Nudge.floater).length)
              if(main.find(Nudge.floater).length>0){
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
                             OrderIDForReturn=$el.text()
                             if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
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
                        if(shippingpartner.find(Nudge.gridcell).length>0){
                           cy.log('shipping partners available are ',shippingpartner.find(Nudge.gridcell).text()) //available Logistic partners 
                        }
                       })
                      approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                        const courierpartner = $el.text();
                        if(courierpartner.includes('Ecom')){
                            $el.click();
                        }
                    })
                    })

                    approve.qcCheckListButton().click()//click on QC checklist 
                    cy.wait(1000)
                    approve.header().should('have.text','QC Checklist') //Assert the QC checklist window 
                    approve.productTypeDropDown().click()
                    cy.wait(1000)
                    approve.optionsfromtheDropdown().each(($el, index, $list) => {
                        $el.click().eq(3)   //ProductType DropDown
                    })   
                  approve.sizeDropdown().click()
                    cy.wait(1000)
                    approve.optionsfromtheDropdown().each(($el, index, $list) => {
                        $el.click().eq(6) //SizeDropDown
                    })          
                    approve.inputForQC().clear()
                    approve.inputForQC().type('Color') //color
                    approve.approveButton().click()
                    .then(()=>{
                        approve.checkboxForApproveReturnRequest().check({ force: true })                   
                        approve.areaCheckedTrue().should('exist')
                        cy.wait(1000)
                        approve.approveButton().click()
                        cy.wait(1000)

                    })
                   
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
                             approve.ongoingTabButtons.eq(0).should('contain','Details')
                             approve.ongoingTabButtons.eq(1).should('contain','Cancel Return')
                             approve.ongoingTabButtons.eq(2).should('contain','Cancel Refund')
                              }
                              else{
                                 cy.log('The return is not created according to requirement ')
                              }
                              
                          })
                      }  
                     })        
              }
            }).then(()=>{
                misc.sidebarwidgets().trigger('mouseover');
                cy.wait(1000)
               misc.sidebarMenuItems().each(($el, index, $list) => {
                    const settings = $el.find('p').text();
        
                    if (settings.includes('Finance')) {
                        $el.find('p').click();
                    }
                })
            }).then(()=>{
                misc.expenseLedger().click();
                cy.wait(1000)
                misc.expenseLedgerHover().click()
                cy.wait(1000)
                filters.getSearchFilterDropDown().click()    
                cy.wait(1000)  
                    filters.getSearchFilterDropDown().each(($el, index, $list) => {
                        const searchBox = $el.find('p').text();
                        if (searchBox.includes('Action')) {
                            $el.click();
                        }
                    })
                    filters.getInputBoxForSearchFilter().type(OrderIDForReturn)
                    filters.getSearchSVG().click()
                    cy.wait(1000)
                    approve.returnOrderRefundOrderID().should('contain',OrderIDForReturn) //return Order Refund Order ID assertion
                    approve.shippingChargeOrderID().should('contain',OrderIDForReturn)    //shipping charge Order ID assertion
                    approve.spendTypeForReturnOrderRefund().should('contain','Return Order Refund')  //spendType assertion for return order refund 
                    approve.spendTypeForShippingcharge().should('contain','Shipping Charge')  //spendtype assertion for shipping charge 
                    approve.amountForReturnOrderRefund().should('contain','-')  //amount assertion for return order refund 
                    approve.amountForShippingCharge().should('contain','-')     //amount assertion for shipping charge 
                    approve.triggerForOrderRefund().should('contain','Return')  //trigger state for return order refund 
                    approve.triggerForShippingCharge().should('contain','Return') //trigger state for return shipping charge   
            })   
            
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

    //Verify The return request is approved with options Book Return Shipment=True,QC on return=false,Auto Settlement=true and shipping partners present in the new requests tab 
    it('ReturnRequests_05_05',function(){
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
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
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
            cy.log("nitin ",main.find(Nudge.floater).length)
              if(main.find(Nudge.floater).length>0){
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
        filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)   //this.data.newRequestsOrderID
        filters.getSearchSVG().click()    
       var  shippingrateWithQC;
       var shippingrateWithoutQC ;
        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("The length present",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length
    
                     if (length === 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                              OrderIDForReturn=$el.text()
                             cy.log(OrderIDForReturn)
                             if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){     //this.data.newRequestsOrderID
                                cy.log('The searched ID is present in the table',OrderIDForReturn)
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
                        if(shippingpartner.find(Nudge.gridcell).length>0){
                           cy.log('shipping partners available are ',shippingpartner.find(Nudge.gridcell).text()) //available Logistic partners 
                        }
                       })
                       approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                        const courierpartner = $el.text();
                        if(courierpartner.includes('Ecom')){
                            shippingrateWithQC= parseFloat($el.siblings('h4').text())   
                         cy.log('shipping partner with QC ',shippingrateWithQC)
                            $el.click();
                        }
                    })

                   
                    })
                    .then(()=>{
                        approve.checkboxForApproveReturnRequest().eq(1).uncheck({force:true})               
                        approve.areaCheckedFalse().should('exist')
                        cy.wait(1000)
                        
                        approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                            const courierpartner = $el.text();
                            if(courierpartner.includes('Ecom')){
                                shippingrateWithoutQC= parseFloat($el.siblings('h4').text())   
                                cy.log('With QC charges',shippingrateWithQC)
                                cy.wait(1000) 
                                expect(shippingrateWithQC).to.eq(shippingrateWithoutQC + 15)
                                $el.click();
                                cy.wait(1000) 
                            }
                        })                        
                         approve.approveButton().click()
                         cy.wait(1000)
                    })
                   
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
                             OrderIDForReturn=$el.text()
                              if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
                                 cy.log('The searched ID is present in the table and AWB is created')
                                 
                              approve.returnshippingstatus().should('contain','Created')
                             approve.awbforOnfgoingTab().should('contain','AWB')
                             approve.trackLink().should('have.attr','href')
                             approve.settlementStatus().should('contain','REFUND')
                             approve.autoSettlement().should('contain','Yes')
                             approve.ongoingTabButtons().eq(0).should('contain','Details')
                             approve.ongoingTabButtons().eq(1).should('contain','Cancel Return')
                             approve.ongoingTabButtons().eq(2).should('contain','Cancel Refund')
                              }
                              else{
                                 cy.log('The return is not created according to requirement ')
                              }
                              
                          })
                      }  
                     })        
              }
            }).then(()=>{
                misc.sidebarwidgets().trigger('mouseover');
                cy.wait(1000)
               misc.sidebarMenuItems().each(($el, index, $list) => {
                    const settings = $el.find('p').text();
        
                    if (settings.includes('Finance')) {
                        $el.find('p').click();
                    }
                }).then(()=>{
    
                    misc.expenseLedger().click();
                    cy.wait(1000)
                    misc.expenseLedgerHover().click()
            cy.wait(1000)
                    filters.getSearchFilterDropDown().click()    
                    cy.wait(1000)  
                        filters.getSearchFilterDropDown().each(($el, index, $list) => {
                            const searchBox = $el.find('p').text();
                            if (searchBox.includes('Action')) {
                                $el.click();
                            }
                        })
                        cy.log('the order in expense ledger ',OrderIDForReturn)
                        filters.getInputBoxForSearchFilter().type(OrderIDForReturn)
                        filters.getSearchSVG().click()
                        cy.wait(1000)
                        approve.returnOrderRefundOrderID().should('contain',OrderIDForReturn) //return Order Refund Order ID assertion
                        approve.shippingChargeOrderID().should('contain',OrderIDForReturn)    //shipping charge Order ID assertion
                        approve.spendTypeForReturnOrderRefund().should('contain','Return Order Refund')  //spendType assertion for return order refund 
                        approve.spendTypeForShippingcharge().should('contain','Shipping Charge')  //spendtype assertion for shipping charge 
                        approve.amountForReturnOrderRefund().should('contain','-')  //amount assertion for return order refund 
                        approve.amountForShippingCharge().should('contain','-')     //amount assertion for shipping charge 
                        approve.triggerForOrderRefund().should('contain','Return')  //trigger state for return order refund 
                        approve.triggerForShippingCharge().should('contain','Return') //trigger state for return shipping charge 
                })
            })     
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
    //Verify The return request is approved with options Book Return Shipment=True,QC on return=false,Auto Settlement=false and shipping partners present in the new requests tab 
    it('ReturnRequests_05_06',function(){
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
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
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
            cy.log("nitin ",main.find(Nudge.floater).length)
              if(main.find(Nudge.floater).length>0){
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
       var  shippingrateWithQC;
       var shippingrateWithoutQC ;
        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("The length present",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length
    
                     if (length === 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                              OrderIDForReturn=$el.text()
                             cy.log(OrderIDForReturn)
                             if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){    
                                cy.log('The searched ID is present in the table',OrderIDForReturn)
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
                        if(shippingpartner.find(Nudge.gridcell).length>0){
                           cy.log('shipping partners available are ',shippingpartner.find(Nudge.gridcell).text()) //available Logistic partners 
                           
                        }
                       })
                       approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                        const courierpartner = $el.text();
                        if(courierpartner.includes('Ecom')){
                            shippingrateWithQC= parseFloat($el.siblings('h4').text())   
                         cy.log('shipping partner with QC ',shippingrateWithQC)
                            $el.click();
                        }
                    })
                    })
                    .then(()=>{
                        approve.checkboxForApproveReturnRequest().eq(1).uncheck({force:true})               
                        approve.areaCheckedFalse().should('exist')
                        cy.wait(1000)

                        approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                            const courierpartner = $el.text();
                            if(courierpartner.includes('Ecom')){
                                shippingrateWithoutQC= parseFloat($el.siblings('h4').text())   
                                cy.log('With QC charges',shippingrateWithQC)
                                cy.wait(1000) 
                                expect(shippingrateWithQC).to.eq(shippingrateWithoutQC + 15)
                                $el.click();
                            }
                        })
                        approve.checkboxForApproveReturnRequest().eq(2).uncheck({force:true})               
                        approve.areaCheckedFalse().should('exist')
                        cy.wait(1000)
                         approve.approveButton().click()
                         cy.wait(1000)
                    })                   
                    filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
                    cy.wait(1000)
                    filters.getSearchSVG().click()    
                    cy.wait(1000)
                    filters.resultcardwithNoItems().should('not.exist') //to check order is moved from New requests tab 
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
                             OrderIDForReturn=$el.text()
                              if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
                                 cy.log('The searched ID is present in the table and AWB is created')
                                 
                              approve.returnshippingstatus().should('contain','Created')
                             approve.awbforOnfgoingTab().should('contain','AWB')
                             approve.trackLink().should('have.attr','href')
                             approve.settlementStatus().should('contain','REFUND')
                             approve.autoSettlement().should('contain','No')
                             approve.ongoingTabButtons().eq(0).should('contain','Details')
                             approve.ongoingTabButtons().eq(1).should('contain','Cancel Return')
                              }
                              else{
                                 cy.log('The return is not created according to requirement ')
                              }
                              
                          })
                      }  
                     })        
              }
            }).then(()=>{
                misc.sidebarwidgets().trigger('mouseover');
                cy.wait(1000)
               misc.sidebarMenuItems().each(($el, index, $list) => {
                    const settings = $el.find('p').text();
        
                    if (settings.includes('Finance')) {
                        $el.find('p').click();
                    }
                }).then(()=>{
    
                    misc.expenseLedger().click();
                    cy.wait(1000)
                    misc.expenseLedgerHover().click()
            cy.wait(1000)
                    filters.getSearchFilterDropDown().click()    
                    cy.wait(1000)  
                        filters.getSearchFilterDropDown().each(($el, index, $list) => {
                            const searchBox = $el.find('p').text();
                            if (searchBox.includes('Action')) {
                                $el.click();
                            }
                        })
                        cy.log('the order in expense ledger ',OrderIDForReturn)
                        filters.getInputBoxForSearchFilter().type(OrderIDForReturn)
                        filters.getSearchSVG().click()
                        cy.wait(1000)
                        approve.returnOrderRefundOrderID().should('contain',OrderIDForReturn) //shipping charge Order ID assertion                         
                        approve.spendTypeForReturnOrderRefund().should('contain','Shipping Charge') //spendtype assertion for shipping charge               
                        approve.amountForReturnOrderRefund().should('contain',shippingrateWithoutQC)   //amount assertion for shipping charge                           
                        approve.triggerForOrderRefund().should('contain','Return') //trigger state for return shipping charge 
                       
                })
            })     
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

    //Verify The return request is approved with options Book Return Shipment=False,and send refund directly to customer is true in the new requests tab 
    it('ReturnRequests_05_07',function(){
        let OrderIDForReturn
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
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
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
            cy.log("nitin ",main.find(Nudge.floater).length)
              if(main.find(Nudge.floater).length>0){
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
                             OrderIDForReturn=$el.text()
                             if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
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
                    })
                    .then(()=>{
                        approve.checkboxForApproveReturnRequest().eq(0).uncheck({force:true})               
                        approve.areaCheckedFalse().should('exist')
                        cy.wait(1000)                       
                        approve.checkboxForApproveReturnRequest().eq(1).check({ force: true })                   
                        approve.areaCheckedTrue().should('exist')
                        cy.wait(1000)
                        approve.autoSettlementFields().eq(0).should('contain','Customer Paid')
                        approve.autoSettlementFields().eq(1).should('contain','Eligible Refund Amount')
                        approve.autoSettlementFieldTwo().should('contain','Refund Amount')
                         approve.approveButton().click()
                         cy.wait(1000)
                    })
                    filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
                    cy.wait(1000)
                    filters.getSearchSVG().click()    
                    cy.wait(1000)
                    filters.resultcardwithNoItems().should('not.exist')
                    cy.log('The order has moved from new requests tab') 
                    cy.wait(1000)     
                    misc.tabsForReturnRequests().eq(3).click()      //click on the settlment pending  tab      
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
                                 
                              approve.NoReturnOptionForShipping().should('contain','No Return')
                             approve.awbforOnfgoingTab().should('contain','NA')
                             approve.settlementMethod().should('contain','REFUND')
                             approve.settlementStatusForSettlementPending().should('contain','Initiated')
                             approve.autosettlementForSettlementPending().should('contain','NA')
                             approve.refundLink().then(($link)=>{
                                cy.wrap($link).invoke('attr','href').then((link)=>{                                  
                                    cy.log('the refund link provided is',link)
                                })
                             })
                              }
                              else{
                                 cy.log('The return is not created according to requirement ')
                              }
                              
                          })
                      }  
                     })        
              }
            }).then(()=>{
                misc.sidebarwidgets().trigger('mouseover');
                cy.wait(1000)
               misc.sidebarMenuItems().each(($el, index, $list) => {
                    const settings = $el.find('p').text();
        
                    if (settings.includes('Finance')) {
                        $el.find('p').click();
                    }
                })
            }).then(()=>{
                misc.expenseLedger().click();
                cy.wait(1000)
                misc.expenseLedgerHover().click()
                cy.wait(1000)
                filters.getSearchFilterDropDown().click()    
                cy.wait(1000)  
                    filters.getSearchFilterDropDown().each(($el, index, $list) => {
                        const searchBox = $el.find('p').text();
                        if (searchBox.includes('Action')) {
                            $el.click();
                        }
                    })
                    filters.getInputBoxForSearchFilter().type(OrderIDForReturn)
                    filters.getSearchSVG().click()
                    cy.wait(1000)
                    approve.returnOrderRefundOrderID().should('contain',OrderIDForReturn) //return Order Refund Order ID assertion
                    approve.spendTypeForReturnOrderRefund().should('contain','Return Order Refund')  //spendType assertion for return order refund 
                    approve.amountForReturnOrderRefund().should('contain','-')  //amount assertion for return order refund 
                    approve.triggerForOrderRefund().should('contain','Return')  //trigger state for return order refund
            })     
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

    //Verify The return request is approved with options Book Return Shipment=False,and send refund directly to customer is false in the new requests tab 
    it('ReturnRequests_05_08',function(){
        let OrderIDForReturn
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
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
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
            cy.log("nitin ",main.find(Nudge.floater).length)
              if(main.find(Nudge.floater).length>0){
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
                             OrderIDForReturn=$el.text()
                             if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
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
                    })
                    .then(()=>{
                        approve.checkboxForApproveReturnRequest().eq(0).uncheck({force:true})               
                        approve.areaCheckedFalse().should('exist')
                        cy.wait(1000)                       
                        approve.checkboxForApproveReturnRequest().eq(1).uncheck({ force: true })                   
                        approve.areaCheckedFalse().should('exist')
                        cy.wait(1000)
                         approve.approveButton().click()
                         cy.wait(1000)
                    })
                    filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
                    cy.wait(1000)
                    filters.getSearchSVG().click()    
                    cy.wait(1000)
                    filters.resultcardwithNoItems().should('not.exist')
                    cy.log('The order has moved from new requests tab') 
                    cy.wait(1000)     
                    misc.tabsForReturnRequests().eq(3).click()      //click on the settlment pending  tab      
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
                                 
                              approve.NoReturnOptionForShipping().should('contain','No Return')
                             approve.awbforOnfgoingTab().should('contain','NA')
                             approve.settlementMethod().should('contain','REFUND')
                             approve.settlementStatusForSettlementPending().should('contain','Not Started')
                             approve.autosettlementForSettlementPending().should('contain','NA')
                                approve.sendRefundLink().should('contain','Send Refund Link')
                                approve.paidOffline().should('contain','Paid Offline')
                              }
                              else{
                                 cy.log('The return is not created according to requirement ')
                              }
                              
                          })
                      }  
                     })        
              }
            }).then(()=>{
                misc.sidebarwidgets().trigger('mouseover');
                cy.wait(1000)
               misc.sidebarMenuItems().each(($el, index, $list) => {
                    const settings = $el.find('p').text();
        
                    if (settings.includes('Finance')) {
                        $el.find('p').click();
                    }
                })
            }).then(()=>{
                misc.expenseLedger().click();
                cy.wait(1000)
                misc.expenseLedgerHover().click()
                cy.wait(1000)
                filters.getSearchFilterDropDown().click()    
                cy.wait(1000)  
                    filters.getSearchFilterDropDown().each(($el, index, $list) => {
                        const searchBox = $el.find('p').text();
                        if (searchBox.includes('Action')) {
                            $el.click();
                        }
                    })
                    filters.getInputBoxForSearchFilter().type(OrderIDForReturn)
                    filters.getSearchSVG().click()
                    cy.wait(1000)
                    misc.noresultFound().should('contain','No result found')
            })     
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

   // Verify the  return request is approved with the settlement method as replace and Book return shipment is True &QC on return is true in the new requests tab 
   it('ReturnRequests_05_09',function(){
    let OrderIDForReturn
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
        cy.log("dialogue box ",main.find(Nudge.dialogue).length)
          if(main.find(Nudge.dialogue).length>0){
            Nudge.nudgeClick().click();   
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
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
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
                         OrderIDForReturn=$el.text()
                         if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
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
                    approve.forReturnOrReplace().eq(1).click()  //to click on replace option 
                    cy.wait(1000)
                    approve.header().should('have.text','Approve Return Request')
                    approve.bookreturnshipmenttext().should('contain','Book Return Shipment')
                    approve.qcOnReturnText().should('contain','Quality Check on Return')
                   approve.shippingPartnerCheck().eq(1).then((shippingpartner)=>{
                    if(shippingpartner.find(Nudge.gridcell).length>0){
                       cy.log('shipping partners available are ',shippingpartner.find(Nudge.gridcell).text()) //available Logistic partners 
                    }
                   })
                  approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                    const courierpartner = $el.text();
                    if(courierpartner.includes('Ecom')){
                        $el.click();
                    }
                })
                })
                approve.qcCheckListButton().click()   //click on QC checklist 
                cy.wait(1000)
                approve.header().should('have.text','QC Checklist')    //Assert the QC checklist window 
                approve.productTypeDropDown().click()
                cy.wait(1000)
                approve.optionsfromtheDropdown().each(($el, index, $list) => {
                    $el.click().eq(3)   //ProductType DropDown
                })   
              approve.sizeDropdown().click()
                cy.wait(1000)
                approve.optionsfromtheDropdown().each(($el, index, $list) => {
                    $el.click().eq(6)   //SizeDropDown
                })          
                approve.inputForQC().clear()
                approve.inputForQC().type('Color')     //color
                approve.approveButton().click()     ///click on QC check list button 
                .then(()=>{
                    approve.checkboxForApproveReturnRequest().check({ force: true })        //checkbox select            
                    approve.areaCheckedTrue().should('exist')
                    cy.wait(1000)
                    approve.approveButton().click()    //click on approve from ongoing tab 
                    cy.wait(1000)

                })
               
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
                         approve.settlementStatus().should('contain','REPLACE')
                         approve.autoSettlement().should('contain','NA')
                         approve.ongoingTabButtons().eq(0).should('contain','Details')
                         approve.ongoingTabButtons().eq(1).should('contain','Cancel Return')
                          }
                          else{
                             cy.log('The return is not created according to requirement ')
                          }
                          
                      })
                  }  
                 })        
          }
        }).then(()=>{
            misc.sidebarwidgets().trigger('mouseover');
            cy.wait(1000)
           misc.sidebarMenuItems().each(($el, index, $list) => {
                const settings = $el.find('p').text();
    
                if (settings.includes('Finance')) {
                    $el.find('p').click();
                }
            })
        }).then(()=>{
            misc.expenseLedger().click();
            cy.wait(1000)
            misc.expenseLedgerHover().click()
            cy.wait(1000)
            filters.getSearchFilterDropDown().click()    
            cy.wait(1000)  
                filters.getSearchFilterDropDown().each(($el, index, $list) => {
                    const searchBox = $el.find('p').text();
                    if (searchBox.includes('Action')) {
                        $el.click();
                    }
                })
                filters.getInputBoxForSearchFilter().type(OrderIDForReturn)
                filters.getSearchSVG().click()
                cy.wait(1000)
                approve.returnOrderRefundOrderID().should('contain',OrderIDForReturn) //shipping charge Order ID assertion                         
                approve.spendTypeForReturnOrderRefund().should('contain','Shipping Charge') //spendtype assertion for shipping charge               
                approve.amountForReturnOrderRefund().should('contain',shippingrateWithoutQC)   //amount assertion for shipping charge                           
                approve.triggerForOrderRefund().should('contain','Return') //trigger state for return shipping charge           
        })           
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

//Verify the  return request is approved with the settlement method as replace and Book return shipment is True &QC on return is false in the new requests tab 
it('ReturnRequests_05_10',function(){
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
        cy.log("dialogue box ",main.find(Nudge.dialogue).length)
          if(main.find(Nudge.dialogue).length>0){
            Nudge.nudgeClick().click();   
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
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
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
   var  shippingrateWithQC;
   var shippingrateWithoutQC ;
    filters.searchResultCard().then((cardforresults)=>{   
       cy.log("The length present",cardforresults.find('p').length)
         if(cardforresults.find('p').length>0)
         {
             filters.OrderDetailsLineItem().then(($value) => {
                 length = $value.length

                 if (length === 1) {
                     filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                          OrderIDForReturn=$el.text()
                         cy.log(OrderIDForReturn)
                         if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){    
                            cy.log('The searched ID is present in the table',OrderIDForReturn)
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

                    approve.forReturnOrReplace().eq(1).click()  //to click on replace option 
                    cy.wait(1000)


                    approve.header().should('have.text','Approve Return Request')
                    approve.bookreturnshipmenttext().should('contain','Book Return Shipment')
                    approve.qcOnReturnText().should('contain','Quality Check on Return')
                   approve.shippingPartnerCheck().eq(1).then((shippingpartner)=>{
                    if(shippingpartner.find(Nudge.gridcell).length>0){
                       cy.log('shipping partners available are ',shippingpartner.find(Nudge.gridcell).text()) //available Logistic partners 
                    }
                   })
                   approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                    const courierpartner = $el.text();
                    if(courierpartner.includes('Ecom')){
                        shippingrateWithQC= parseFloat($el.siblings('h4').text())   
                     cy.log('shipping partner with QC ',shippingrateWithQC)
                        $el.click();
                    }
                })
                })
                .then(()=>{
                    approve.checkboxForApproveReturnRequest().eq(1).uncheck({force:true})               
                    approve.areaCheckedFalse().should('exist')
                    cy.wait(1000)

                    approve.shippingPartnerList().each(($el, index, $list) => {  //select the Logistic partners 
                        const courierpartner = $el.text();
                        if(courierpartner.includes('Ecom')){
                            shippingrateWithoutQC= parseFloat($el.siblings('h4').text())   
                            cy.log('Without QC charges',shippingrateWithoutQC)
                            cy.log('With QC charges',shippingrateWithQC)
                            expect(shippingrateWithQC).to.eq(shippingrateWithoutQC + 15)
                            cy.wait(1000)
                            $el.click()
                            cy.wait(1000)
                        }

                    })
                     approve.approveButton().click()
                     cy.wait(1000)
                })                   
                filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
                cy.wait(1000)
                filters.getSearchSVG().click()    
                cy.wait(1000)
                filters.resultcardwithNoItems().should('not.exist') //to check order is moved from New requests tab 
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
                         OrderIDForReturn=$el.text()
                          if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
                             cy.log('The searched ID is present in the table and AWB is created')
                         
                             approve.returnshippingstatus().should('contain','Created')
                             approve.awbforOnfgoingTab().should('contain','AWB')
                             approve.trackLink().should('have.attr','href')
                             approve.settlementStatus().should('contain','REPLACE')
                             approve.autoSettlement().should('contain','NA')
                             approve.ongoingTabButtons().eq(0).should('contain','Details')
                             approve.ongoingTabButtons().eq(1).should('contain','Cancel Return')
                          }
                          else{
                             cy.log('The return is not created according to requirement ')
                          }
                          
                      })
                  }  
                 })        
          }
        }).then(()=>{
            misc.sidebarwidgets().trigger('mouseover');
            cy.wait(1000)
           misc.sidebarMenuItems().each(($el, index, $list) => {
                const settings = $el.find('p').text();
    
                if (settings.includes('Finance')) {
                    $el.find('p').click();
                }
            }).then(()=>{

                misc.expenseLedger().click();
                cy.wait(1000)
                misc.expenseLedgerHover().click()
        cy.wait(1000)
                filters.getSearchFilterDropDown().click()    
                cy.wait(1000)  
                    filters.getSearchFilterDropDown().each(($el, index, $list) => {
                        const searchBox = $el.find('p').text();
                        if (searchBox.includes('Action')) {
                            $el.click();
                        }
                    })
                    cy.log('the order in expense ledger ',OrderIDForReturn)
                    filters.getInputBoxForSearchFilter().type(OrderIDForReturn)
                    filters.getSearchSVG().click()
                    cy.wait(1000)
                    approve.returnOrderRefundOrderID().should('contain',OrderIDForReturn) //shipping charge Order ID assertion                         
                    approve.spendTypeForReturnOrderRefund().should('contain','Shipping Charge') //spendtype assertion for shipping charge               
                    approve.amountForReturnOrderRefund().should('contain',shippingrateWithoutQC)   //amount assertion for shipping charge                           
                    approve.triggerForOrderRefund().should('contain','Return') //trigger state for return shipping charge 
                   
            })
        })     
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

//Verify the  return request is approved with the settlement method as replace and Book return shipment is false &QC on return is false in the new requests tab 
it('ReturnRequests_05_11',function(){
    let OrderIDForReturn
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
        cy.log("dialogue box ",main.find(Nudge.dialogue).length)
          if(main.find(Nudge.dialogue).length>0){
            Nudge.nudgeClick().click();   
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
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
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
                         OrderIDForReturn=$el.text()
                         if(OrderIDForReturn.includes(this.data.newRequestsOrderID)){
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
                    approve.forReturnOrReplace().eq(1).click()  //to click on replace option 
                    cy.wait(1000)

                    approve.header().should('have.text','Approve Return Request')
                    approve.bookreturnshipmenttext().should('contain','Book Return Shipment')
                    approve.qcOnReturnText().should('contain','Quality Check on Return')
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
                })
                .then(()=>{
                    approve.checkboxForApproveReturnRequest().eq(0).uncheck({force:true})               
                    approve.areaCheckedFalse().should('exist')
                    cy.wait(1000)                       
                     approve.approveButton().click()
                     cy.wait(1000)
                })
                filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
                cy.wait(1000)
                filters.getSearchSVG().click()    
                cy.wait(1000)
                filters.resultcardwithNoItems().should('not.exist')
                cy.log('The order has moved from new requests tab') 
                cy.wait(1000)     
                misc.tabsForReturnRequests().eq(3).click()      //click on the settlment pending  tab      
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
                             
                          approve.NoReturnOptionForShipping().should('contain','No Return')
                         approve.awbforOnfgoingTab().should('contain','NA')
                         approve.settlementMethod().should('contain','REPLACE')
                         approve.settlementStatusForSettlementPending().should('contain','Not Started')
                         approve.autosettlementForSettlementPending().should('contain','NA')
                            approve.sendRefundLink().should('contain','Send Replacement')              
                          }
                          else{
                             cy.log('The return is not created according to requirement ')
                          }
                          
                      })
                  }  
                 })        
          }
        }).then(()=>{
            misc.sidebarwidgets().trigger('mouseover');
            cy.wait(1000)
           misc.sidebarMenuItems().each(($el, index, $list) => {
                const settings = $el.find('p').text();
    
                if (settings.includes('Finance')) {
                    $el.find('p').click();
                }
            })
        }).then(()=>{
            misc.expenseLedger().click();
            cy.wait(1000)
            misc.expenseLedgerHover().click()
            cy.wait(1000)
            filters.getSearchFilterDropDown().click()    
            cy.wait(1000)  
                filters.getSearchFilterDropDown().each(($el, index, $list) => {
                    const searchBox = $el.find('p').text();
                    if (searchBox.includes('Action')) {
                        $el.click();
                    }
                })
                filters.getInputBoxForSearchFilter().type(OrderIDForReturn)
                filters.getSearchSVG().click()
                cy.wait(1000)
                misc.noresultFound().should('contain','No result found')
        })     
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

//Verify on  rejecting  the request from the new requests tab ..the order  moves to closed tab 
it('ReturnRequests_05_12',function(){
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
        cy.log("dialogue box ",main.find(Nudge.dialogue).length)
          if(main.find(Nudge.dialogue).length>0){
            Nudge.nudgeClick().click();   
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
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
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
                        if(approvebutton.includes('Reject')){
                            $el.click()
                            cy.wait(1000)
                        }
                    })
                    approve.header().should('have.text','Reject Return Request')              
                    approve.rejectionReason().eq(0).should('contain','Rejection Reason')
                    approve.rejectionReason().eq(1).should('contain','Select Rejection Reason')
                    approve.rejectionRemark().eq(0).should('contain','Rejection Remark(For Customers)')
                    approve.rejectionRemark().eq(1).should('contain','This rejection remarks will be displayed to customer on the website')    
                    filters.selectRejectionReasonPlaceholder().click()
                    cy.wait(1000)
                    filters.selectrejectionReasonDropdown().eq(2).click()
                    cy.wait(1000)
                    filters.inputForRejectionRemark().type('the rejection reason for rejecting the request')      
                    cy.wait(1000)   
                }).then(()=>{
                    approve.approveButton().click()
                })     
        ForSearchFilter().type(this.data.newRequestsOrderID)
                cy.wait(1000)
                filters.getSearchSVG().click()    
                cy.wait(1000)
                filters.resultcardwithNoItems().should('not.exist')
                cy.log('The order has moved from new requests tab') 
                cy.wait(1000)     
                misc.tabsForReturnRequests().eq(4).click()      //click on the closed  tab      
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
                          approve.requestActionForRejected().should('contain','Rejected')
                         approve.approvedRequestStatusNA().should('contain','NA')
                         approve.shippingStatusinclosedtab().should('contain','Cancelled')
                            approve.rejectionReason().eq(1).should('exist')
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
        misc.expenseLedgerHover().click()
            cy.wait(1000)
        filters.getSearchFilterDropDown().click()    
        cy.wait(1000)  
            filters.getSearchFilterDropDown().each(($el, index, $list) => {
                const searchBox = $el.find('p').text();
                if (searchBox.includes('Action')) {
                    $el.click();
                }
            })
            filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
            filters.getSearchSVG().click()
            cy.wait(1000)
            misc.noresultFound().should('contain','No result found')

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
})
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
                   approve.shippingPartnerList().eq(0).then(($el) => {  //select the Logistic partners 
                    shippingrateWithQC= parseFloat($el.siblings('h4').text())   
                    cy.log('shipping partner with QC ',shippingrateWithQC)
                    $el.eq(0).click();
                })
                })
                .then(()=>{
                    approve.checkboxForApproveReturnRequest().eq(1).uncheck({force:true})               
                    approve.areaCheckedFalse().should('exist')
                    cy.wait(1000)
                    approve.shippingPartnerList().eq(0).then(($el) => {  //select the Logistic partners 
                        shippingrateWithoutQC= parseFloat($el.siblings('h4').text())         
                        cy.log('Without QC charges',shippingrateWithoutQC)      
                        cy.log('With QC charges',shippingrateWithQC) 
                        cy.wait(1000)
                       expect(shippingrateWithQC).to.eq(shippingrateWithoutQC + 15)                       
                     
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

})
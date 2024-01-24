import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import WebsiteWebElements from "../PageObjects/website"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
import placeOrderWebelements from "../PageObjects/placeOrderWebelements"
import Filters from "../PageObjects/Filters"
import ApproveRequests from "../PageObjects/ApproveReturnRequests"

describe('ReturnRequest_EE_02', function () {
    let AWB;
    let OrderID;
    let OrderIDForReturn;
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
        cy.fixture('Customer_details').then(function(custdata){
            this.custdata=custdata
        })
       
    })
    //Place COD,catalogue Order From dashbaord with Discount amout per quantity
    it('PlaceOrder_01_03',function(){
        const Nudge=new NudgesAndColumns();
        const misc=new SidebarAndMisc();
        const placeOrder=new placeOrderWebelements();
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
        cy.wait(1000)
        misc.placeorderFromOrders().click()
        placeOrder.infotextSVG().trigger('mouseover');
        placeOrder.customerNumberField().type(this.custdata.customerNumber);
        placeOrder.altContactField().clear()
        placeOrder.altContactField().type(this.custdata.Alternative_Number);
        placeOrder.custNameField().clear()
       placeOrder.custNameField().type(this.custdata.Customer_Name)
        
       //Select payment  mode
        placeOrder.paymentMode().each(($el, index, $list)=>
        {
            const paymentmode= $el.find('span').text();
            if(paymentmode.includes('COD'))
            {
                $el.find('span').click();
            }
        })
        placeOrder.pincodeField().clear()
        placeOrder.pincodeField().type(this.custdata.Pincode); //pincode
        placeOrder.houseNumberField().clear()
        placeOrder.houseNumberField().type(this.custdata.House_NUmber);//house number 
        placeOrder.streetField().clear()
        placeOrder.streetField().type(this.custdata.Street); //street/colony
        placeOrder.landmarkField().clear()
        placeOrder.landmarkField().type(this.custdata.Landmark); //landmark
        placeOrder.nextButton().click(); //click on next 

        //select manual or cataloge item and click 
        placeOrder.typeSelection().each(($el, index, $list)=>
        {
            const productselection= $el.find('button').text();
            if(productselection.includes('Search products'))
            {
                $el.find('span').click();
            }
        })
   //test step
        placeOrder.comboHolder().click()
        cy.wait(1000); 

        placeOrder.listItems().each(($el, index, $list)=>
        {
            const productType= $el.find('span').text();
            if(productType.includes('Product Name'))
            {
                $el.click();
            }
        })

        placeOrder.inputBox().type(this.custdata.productID);
        cy.wait(1000);
        placeOrder.searchSVG().click();
        cy.wait(1000);
        placeOrder.productLineItem().each(($el, index, $list)=>
        {
            const catalogueList= $el.find(placeOrder.productId).text();
            if(catalogueList.includes(this.custdata.SkuID))
            { 
               cy.log(catalogueList);
              $el.find(placeOrder.checkBox).click();
            }
        })
        placeOrder.addOrReset().each(($el, index, $list)=>
        {
            const foraddbutton= $el.text();
            if(foraddbutton.includes('Add'))
            {
              $el.click();
              cy.wait(2000) 
            }
        })
       placeOrder.quantityForItems().click();
        placeOrder.listItems().each(($el, index, $list)=>
        {
            const selectQuantity= $el.find('span').text();
            if(selectQuantity==='01')
            {
              $el.click();
            }
        })
        placeOrder.discountField().click();
        placeOrder.listItems().each(($el, index, $list)=>
        {
            const selectcoupon= $el.find('span').text();
            if(selectcoupon.includes('amount'))
            {
              $el.click();
              cy.wait(2000)
              placeOrder.amountInputField().type("49");
              cy.wait(1000)
              placeOrder.gridSVG().click();
              cy.wait(1000)
              placeOrder.productDetailsNext().click();
              cy.wait(1000)
            }
        })
        placeOrder.CPname().each(($el, index, $list)=>
        {
            const courierpartner= $el.text();
            if(courierpartner.includes('EKART'))
            {
               cy.log(courierpartner);
              $el.click();
            }
            
        })
        placeOrder.cpPageNextCTA().click();
        cy.wait(1000)
        placeOrder.placeOrderCTA().click();
        cy.wait(1000)
        placeOrder.toastForSuccess().should('contain','Successfully')
        placeOrder.successpage().then(($value)=>{
            const getTSuccesspage = $value.text()
            cy.log(getTSuccesspage)
            cy.wait(1000)
            placeOrder.awbFieldFromSuccessPage().then(($el)=>{
                AWB=$el.text()
                cy.wait(1000)
                cy.log(AWB)
            })
            placeOrder.orderIDField().eq(0).then(($el)=>{
                OrderID=$el.text()
                cy.wait(1000)
                cy.log(OrderID)
            })
        })
        
        cy.clearCookies()
    })

//To mark an order delivered API 
    it('deliveredAPI ', function () {
        const payload = {
            data: {
                awb: AWB,
                scans: "",
                current_status: "delivered",
                latest_status: {
                    clickpost_status_code: 8,
                    timestamp: "2023-04-16T22:00:00.000Z"
                },
                clickpost_data: {
                    clickpost_status_code: 8
                },
                additional: {
                    ndr_status_code: "1",
                    ndr_status_description: "Customer Unavailable"
                }
            }
        }
        cy.request({
            method: 'POST',
            url: 'http://nushop-dashboard.kaip.in/api/update-order-state',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'
               
            },
            body: payload
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });
    })

     //create return from website with video media attached
     it('ReturnRequests_10_01', function () {
        const website= new WebsiteWebElements();
       let eleindex ;
           cy.visit(Cypress.env('website'))
       
           website.startShoppingBanner().click()
       
           website.naviagtionBar().each(($el, index, $list) => {
               const settings = $el.text();
               if (settings.includes('Orders')) {
                   cy.wrap($el).click();
               }
           })
       
           website.phoneNoField().type(this.custdata.customerNumber);
       
           website.confirmPhoneNumberButton().click();
       
           website.passwordField().each(($el, index, $list) => {
               cy.wrap($el).type('0');
           }).wait(1000);
       
           website.verifyButton().click().wait(2000);
           
           website.orderListings().each(($el, index, $list) => {
               cy.wrap($el).children().invoke('attr', 'href').then((references) => {
                   const hyperlink = references.toString();
                   if (hyperlink.includes(OrderID)) {
                       cy.log(hyperlink);
                       eleindex = index
                       cy.log(eleindex)
                   }
               })
   
           }).then(()=>{
               cy.wait(1000);
               website.orderListings().eq(eleindex).click()
               cy.wait(1000);
               website.returnOrderCTA().click().then(() => {
                   website.returnReasonOption().eq(3).click();
               }).then(() => {
                   cy.wait(1000)
                   website.nextCTAforReason().eq(1).click();
               }).then(() => { 
                   cy.wait(1000); 
                 website.uploadMediainput().eq(0).click({force: true}).invoke('css', 'display', 'block')
                 .selectFile('C:\\Users\\Lenovo\\Downloads\\pexels-jeandaniel-francoeur-2570139.jpg',{force:true})         
                 cy.wait(1000); 
                 website.uploadMediainput().eq(1).click({force: true}).invoke('css', 'display', 'block')
                 .selectFile('C:\\Users\\Lenovo\\Downloads\\vdo.mp4',{force:true}) 
                 cy.wait(1000);
                 website.uploadMediainput().eq(2).click({force: true}).invoke('css', 'display', 'block')
                 .selectFile('C:\\Users\\Lenovo\\Downloads\\pexels-pixabay-45911.jpg',{force:true})
                 cy.wait(1000);
               }).then(()=>{
                   website.remarksInputField().type('AReas we want to type dowsnt exist in the DOM')
               }).then(()=>{
                   website.nextButtonForMediaUpload().eq(1).click()
               }).then(()=>{
                   website.radioForReturnProduct().click()
               }).then(()=>{
                   website.checkboxForconformPage().click()  
                   website.ConformButton().click()
               })
               website.finalConformButton().click()
           })     
           cy.wait(4000); 
           website.returnConfirmInfo().should('have.text','Return Requested')
           website.returnStatus().should('have.text',' Return request submitted')
           website.cancelReturnCTA().should('have.text','Cancel Return')
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
        filters.getInputBoxForSearchFilter().type(OrderID)   
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
                             if(OrderIDForReturn.includes(OrderID)){    
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
                     
                        approve.checkboxForApproveReturnRequest().eq(2).uncheck({force:true})               
                        approve.areaCheckedFalse().should('exist')
                        cy.wait(1000)
                         approve.approveButton().click()
                         cy.wait(1000)
                    })                   
                    filters.getInputBoxForSearchFilter().type(OrderID)
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
                filters.getInputBoxForSearchFilter().type(OrderID) ///to enter values in search input box 
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
                              if(OrderIDForReturn.includes(OrderID)){
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
    
})
import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import WebsiteWebElements from "../PageObjects/website"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
import placeOrderWebelements from "../PageObjects/placeOrderWebelements"

describe('ReturnRequest_EE_02', function () {
    let AWB;
    let OrderID;
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
})
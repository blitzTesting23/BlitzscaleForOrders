
import WebsiteWebElements from "../PageObjects/website"
describe('ReturnRequest_EE_03', function () {
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
   
     //Place Order From the website and store the order ID 
     it('WebsiteOrder01', function () {
        const website= new WebsiteWebElements();
      
           cy.visit(Cypress.env('website'))       
          // website.startShoppingBanner().click()       
           website.naviagtionBar().each(($el, index, $list) => {
               const settings = $el.text();
               if (settings.includes('Orders')) {
                   cy.wrap($el).click({force:true});
               }
           })     
           website.phoneNoField().type(this.custdata.customerNumber);   
           website.confirmPhoneNumberButton().click();   
           website.passwordField().each(($el, index, $list) => {
               cy.wrap($el).type('0');
           }).wait(1000);      
           website.verifyButton().click().wait(2000);   
           website.homePage().click().wait(3000);
           website.searchSVG().click()
           website.inputForSearch().type(this.custdata.productID).wait(2000)
           website.productname().eq(3).click().wait(2000)
           website.buttonForBuyNow().click()
           website.inputFieldFOrAddress().eq(0).clear()
           website.inputFieldFOrAddress().eq(0).type(this.custdata.Customer_Name)
           website.inputFieldFOrAddress().eq(1).clear()
           website.inputFieldFOrAddress().eq(1).type(this.custdata.Pincode)
           website.inputFieldFOrAddress().eq(2).clear()
           website.inputFieldFOrAddress().eq(2).type(this.custdata.House_NUmber)
           website.inputFieldFOrAddress().eq(3).clear()
           website.inputFieldFOrAddress().eq(3).type(this.custdata.Street)
           website.inputFieldFOrAddress().eq(4).clear()
           website.inputFieldFOrAddress().eq(4).type(this.custdata.Landmark)
           website.inputFieldFOrAddress().eq(5).clear()
           website.inputFieldFOrAddress().eq(5).type(this.custdata.Alternative_Number).wait(1000)
           website.saveAndContinueButton().click().wait(1000) 
           website.getBodyforWebsite().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find(website.dialogueForWebsite).length)
              if(main.find(website.dialogueForWebsite).length>0){
                website.wantToOrderMore().click();   
                cy.wait(2000);
            }})
           website.proceedButton().click().wait(2000)
           website.payCODOption().eq(1).click().wait(1000)
           website.placeOrder().click().wait(1000)    
           website.notNowOption().click().wait(1000)
           website.orderSuccessPage().should('contain','Thank You')
           website.orderItem().then(($id)=>{
            cy.wrap($id).invoke('attr','href').then((references) => {
                OrderID= references.split('/').pop();
               cy.log(OrderID)    
            })
           })
       }) 


})
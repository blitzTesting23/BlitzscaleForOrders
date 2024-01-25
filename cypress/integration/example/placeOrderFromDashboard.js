import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
import placeOrderWebelements from "../PageObjects/placeOrderWebelements"
describe('Place Order Suite',function(){
    let AWB;
    let OrderID;
    before(function()
    {
        cy.fixture('example').then(function(data)
        {
        this.data=data
    })
    cy.fixture('Customer_details').then(function(custdata){
        this.custdata=custdata
    })
    })

    //Place COD,catalogue Order From dashbaord with amount Discount amout per quantity 
    it.only('PlaceOrder_01_03',function(){
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
              $el.find('span').click();
              cy.wait(2000)
              placeOrder.amountInputField().type("10");
         cy.wait(1000)
         placeOrder.gridSVG().click();
         cy.wait(1000)
         placeOrder.productDetailsNext().click();
         cy.wait(3000)
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
    })

    //Place PREPAID,catalogue Order From dashbaord with amount  Discount amout per quantity
    it('PlaceOrder_01_04',function(){
        const Nudge=new NudgesAndColumns();
        const misc=new SidebarAndMisc();
        const placeOrder=new placeOrderWebelements();
        cy.visit(Cypress.env('url'))
        cy.wait(2000);
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
            if(paymentmode.includes('Prepaid'))
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

        //select manual or cataloge order and click 
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
         $el.find('span').click();
         cy.wait(2000)
         placeOrder.amountInputField().type("1000");
    cy.wait(1000)
    placeOrder.gridSVG().click();
    cy.wait(1000)
    placeOrder.productDetailsNext().click();
    cy.wait(3000)
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
    })

    //Place COD,catalogue Order From dashbaord with percentage discount per quantuty
    it('PlaceOrder_01_05',function(){
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
            if(selectcoupon.includes('discount'))
            {
              $el.find('span').click();
              cy.wait(2000)
              placeOrder.amountInputField().type("10");
         cy.wait(1000)
         placeOrder.gridSVG().click();
         cy.wait(1000)
         placeOrder.productDetailsNext().click();
         cy.wait(3000)
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
    })

    //Place Prepaid,catalogue Order From dashbaord with percentage discount per quantuty
   it('PlaceOrder_01_06',function(){
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
            if(paymentmode.includes('Prepaid'))
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

        //select manual or cataloge order and click 
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
       if(selectcoupon.includes('discount'))
       {
         $el.find('span').click();
         cy.wait(2000)
         placeOrder.amountInputField().type("10");
    cy.wait(1000)
    placeOrder.gridSVG().click();
    cy.wait(1000)
    placeOrder.productDetailsNext().click();
    cy.wait(3000)
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

})

})

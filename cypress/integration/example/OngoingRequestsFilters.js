import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import Filters from "../PageObjects/Filters"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
describe('New Requests filter check', function () {
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })

//Verify search filter by order ID is working and  is displaying the valid filtered results  for Ongoing requests tab 
it('ReturnRequests_06_01', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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
        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })
        cy.wait(1000)
    filters.getSearchFilterDropDown().click()
    filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
        const searchBox = $el.find('span').text();
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
                         cy.log('The Order ID present on the dashboard',OrderID)
                         cy.log('The Order ID searched ',this.data.newRequestsOrderID)
                        if(OrderID.includes(this.data.newRequestsOrderID)){
                            cy.log('The searched ID is present in the table')
                         }
                     })
                     filters.returnShippingColumn().find('span').should('exist')
                     filters.returnShippingColumn().find('p').should('exist')

                 }
                 else
                     if (length > 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                             const OrderIDs = $el.text();
                             cy.log('The Order ID present on the dashboard',OrderIDs)
                         cy.log('THe Order ID searched ',this.data.newRequestsOrderID)
                         })
                     }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
                cy.wait(1000)

             const NoordeFOund=$el.text()
             cy.log(NoordeFOund)
             cy.wait(1000)

             cy.log('No results Were forund for this order ID ')
         })
            }
     }) 

})

//Verify search filter by AWB no is working and  is displaying the valid filtered results  for Ongoing requests tab 
it('ReturnRequests_06_02', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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
        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })
        cy.wait(1000)
    filters.getSearchFilterDropDown().click()
    cy.wait(1000)
    filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
        const searchBox = $el.find('span').text();
        if (searchBox.includes('AWB Number')) {
            $el.click();
            cy.wait(1000)
        }
    })
    filters.getInputBoxForSearchFilter().type(this.data.AWB_Number)
    filters.getSearchSVG().click()    

    filters.searchResultCard().then((cardforresults)=>{   
       cy.log("The length present",cardforresults.find('p').length)
         if(cardforresults.find('p').length>0)
         {
             filters.OrderDetailsLineItem().then(($value) => {
                 length = $value.length

                 if (length === 1) {
                     filters.awbNumberfield().then(($el)=>{
                         const awb=$el.text()
                         cy.log('The AWB searched is present on the dashboard',awb)
                         cy.log('The AWB searched is',this.data.AWB_Number)
                        if(awb.includes(this.data.AWB_Number)){
                            cy.log('The searched AWB  is present in the table')
                         }
                     })
                     filters.returnShippingColumn().find('span').should('exist')
                     filters.returnShippingColumn().find('p').should('exist')

                 }
                 else
                     if (length > 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                             const OrderIDs = $el.text();
                             cy.log('The Order ID present on the dashboard',OrderIDs)
                         cy.log('THe Order ID searched ',this.data.newRequestsOrderID)
                         })
                     }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
                cy.wait(1000)

             const NoordeFOund=$el.text()
             cy.log(NoordeFOund)
             cy.wait(1000)

             cy.log('No results Were found for the searched AWB number')
         })
            }
     }) 

})

//Verify search filter by customer number is working is displaying the valid filtered results for ongoing requests tab 
it('ReturnRequests_06_03', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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
        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })
        cy.wait(1000)
    filters.getSearchFilterDropDown().click()
    cy.wait(1000)
    filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
        const searchBox = $el.find('span').text();
        if (searchBox.includes('Customer Number')) {
            $el.click();
            cy.wait(1000)
        }
    })
    filters.getInputBoxForSearchFilter().type(this.data.CustomerNumber)
    filters.getSearchSVG().click()    

    filters.searchResultCard().then((cardforresults)=>{   
       cy.log("The length present",cardforresults.find('p').length)
         if(cardforresults.find('p').length>0)
         {
             filters.OrderDetailsLineItem().then(($value) => {
                 length = $value.length

                 if (length === 1) {
                     filters.customerInfoitems().eq(0).then(($el)=>{
                         const customer_Number=$el.text()
                         cy.log('The Customer phone number  searched is present on the dashboard',customer_Number)
                         cy.log('The Customer no is  searched is',this.data.AWB_Number)
                        if(customer_Number.includes(this.data.CustomerNumber)){
                            cy.log('The searched contact number is present in the table')
                         }
                     })

                 }
                 else
                     if (length > 1) {
                        cy.log('multiple orders are present for the searched phone number ')
                         filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                             const OrderIDs = $el.text();
                             cy.log('The Order ID present on the dashboard',OrderIDs)
                         cy.log('THe customer number searched ',this.data.CustomerNumber)
                         filters.customerInfoitems().eq(0).then(($el)=>{
                            const customer_Number=$el.text()
                            cy.log('The Customer phone number which is present on the dashboard against order ID',customer_Number)
                         })

                         })
                     }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
                cy.wait(1000)

             const NoordeFOund=$el.text()
             cy.log(NoordeFOund)
             cy.wait(1000)

             cy.log('No results Were found for the searched AWB number')
         })
            }
     }) 

})
//Verify on clicking on More details option in Order details all the necessory field values are present  in ongoing requests tab
it('ReturnRequests_06_04', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })

    filters.getSearchFilterDropDown().click()
    filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
        const searchBox = $el.find('span').text();
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
                     filters.OrderIDFromtheOrderdetailsLineItem().eq(0).then(($el)=>{
                         const OrderID=$el.text()
                         cy.log('The Order ID present on the dashboard',OrderID)
                         cy.log('The order ID searched ',this.data.newRequestsOrderID)
                         if(OrderID===this.data.newRequestsOrderID)
                         {
                            cy.log('The searched ID is present in the table')
                         }
                         filters.moredetailsctaButton().click()
                         cy.wait(2000)
                         filters.contentsFromSideBarFromMoreDetails().eq(1).should('have.text','Request Accepted On')
                         filters.contentsFromSideBarFromMoreDetails().eq(2).should('have.text','Settlement Method')
                         filters.contentsFromSideBarFromMoreDetails().eq(3).should('have.text','Return Status')
                         filters.contentsFromSideBarFromMoreDetails().eq(4).should('have.text','Return AWB')
                         filters.contentsFromSideBarFromMoreDetails().eq(5).should('have.text','Tracking Id With Link')
                         filters.contentsFromSideBarFromMoreDetails().eq(6).should('have.text','Shipping Partner')
                         filters.contentsFromSideBarFromMoreDetails().eq(7).should('have.text','Quality Check on Return')
                         filters.contentsFromSideBarFromMoreDetails().eq(8).should('have.text','Auto Settlement')
                         filters.contentsFromSideBarFromMoreDetails().eq(9).should('have.text','Refund Amount (₹)')
                         filters.contentsFromSideBarFromMoreDetails().eq(10).should('have.text','Customer Paid')
                         filters.contentsFromSideBarFromMoreDetails().eq(11).should('have.text','Eligible Refund Amount')
                         filters.contentsFromSideBarFromMoreDetails().eq(12).should('have.text','Return Request Date')
                         filters.contentsFromSideBarFromMoreDetails().eq(13).should('have.text','Return policy')
                         filters.contentsFromSideBarFromMoreDetails().eq(15).should('have.text','Return Reason')
                         filters.contentsFromSideBarFromMoreDetails().eq(16).should('have.text','Customer Remark')
                         filters.contentsFromSideBarFromMoreDetails().eq(18).should('have.text','Customer Photos and Videos')
                         filters.contentsFromSideBarFromMoreDetails().eq(19).should('have.text','Forward order payment mode')
                         filters.contentsFromSideBarFromMoreDetails().eq(20).should('have.text','Customer Contact')
                         filters.contentsFromSideBarFromMoreDetails().eq(21).should('have.text','Customer Name')
                         filters.contentsFromSideBarFromMoreDetails().eq(22).should('have.text','Pickup Address')
                         filters.contentsFromSideBarFromMoreDetails().each(($el, index, $list) => {
                            const sidebarwindow = $el.text();
                           cy.log(sidebarwindow)
                          filters.visitWebsite().then((sidebar)=>{
                            if(sidebar.find('a').length>0){
                                cy.log('the link for the catalogue exists',sidebar.find('a').length)
                            }
                          })        
                        })    
                        })
                 }
                //  else
                //      if (length > 1) {
                //          cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ"]').each(($el, index, $list) => {
                //              const OrderIDs = $el.text();
                //              cy.log('The Order ID present on the dashboard',OrderIDs)
                //          cy.log('THe Order ID searched ',this.data.newRequestsOrderID)
                //          })
                //      }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
             const NoorderFOund=$el.text()
             cy.log(NoorderFOund)
             cy.log('No results Were forund for this order ID ')
         })
            }
     }) 

})
//Verify the Return status  filter dropdown is clickable and all the options are present and the checkbox is clickable 
it('ReturnRequests_06_05', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })


    filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
        const returnStatus = $el.text();

        if (returnStatus.includes('Return Status')) {
            cy.wait(1000)
            $el.click();
            cy.wait(1000)
        }
    })
    filters.dropdownItems().each(($el, index, $list) => {
        const returnStatus = $el.find('label').text()
        if(returnStatus.includes(this.data.returnStatus_option)){
            cy.log(returnStatus)
            $el.find(Nudge.optionSelect).click()
        }

    })
    filters.clickonPlaceHolder().click()
    filters.clearAllAndApply().find('button').each(($el,index,$list) =>
    {
        if($el.text().includes('Apply'))
        {
            $el.click()
        }
    })

    filters.searchResultCard().then((cardforresults)=>{
           
       cy.log("Result ",cardforresults.find('p').length)
         if(cardforresults.find('p').length>0)
         {
             filters.OrderDetailsLineItem().then(($value) => {
                 length = $value.length

                 if (length === 1) {
                    cy.log('Only One order Item is present for the applied filter option ')
                     filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                         const OrderID=$el.text()
                         filters.shippingStatus().should('have.text',this.data.returnStatus_option)
                         cy.log(OrderID)
                     })

                 }
                 else
                     if (length > 1) {
                        cy.log('multiple orders are present against the applied filter ')
                        filters.shippingStatus().each(($el, index, $list) => {
                            expect($el).to.have.text(this.data.returnStatus_option)
                           // $el.should('have.text',this.data.returnStatus_option)
                        })
                         filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                             const OrderIDs = $el.text();                  
                             cy.log(OrderIDs)
                         })
                     }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
             const NoorderFOund=$el.text()
             cy.log(NoorderFOund)
             cy.log('No results Were forund for this order ID ')
         })
            }
     })  
})

//Verify the "x"svg is working on the filter and on clicking clear filter&apply filter options are not visible on the UI"
it('ReturnRequests_06_06', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })

    filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
        const returnStatus = $el.text();

        if (returnStatus.includes('Return Status')) {
            cy.wait(1000)
            $el.click();
            cy.wait(1000)
        }
    })
    filters.dropdownItems().each(($el, index, $list) => {
        const returnStatus = $el.find('label').text()
        if(returnStatus.includes(this.data.returnStatus_option)){
            cy.log(returnStatus)
            $el.find(Nudge.optionSelect).click()
        }

    })
    filters.clickonPlaceHolder().click()
    filters.clearAllAndApply().find('button').each(($el,index,$list) =>
    {
        if($el.text().includes('Apply'))
        {
            $el.click()
        }
    })
    filters.returnReasonOption().then(($el)=> {


        if ($el.length) {
            cy.log($el.text())
            cy.log('The filter values are present as selected')
            cy.wait(1000)
        }
    })
    filters.closeSVGforReturnReason().click();
    filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
        const returnStatus = $el.text();

        if (returnStatus.includes('Return Status')) {
            cy.wait(1000)
            cy.log('the filters are cleared successfully')
            cy.wait(1000)
        }
    })
    filters.clearAllAndApply().find('button').each(($el,index,$list) =>
    {
        if($el.text().includes('Clear All'))
        {
            $el.click()
        }
    })
    
})

//Verify the Request source  filter dropdown is clickable and all the options are present and the checkbox is clickable 
it('ReturnRequests_06_07', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })

        filters.moreFiltersOption().click();
        cy.wait(1000)

    filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
        const FilterOption = $el.text();

        if (FilterOption.includes('Request Source')) {
            cy.wait(1000)
            $el.click();
            cy.wait(1000)
        }
    })
    filters.dropdownItems().each(($el, index, $list) => {
        const returnSource = $el.find('label').text()
        if(returnSource.includes(this.data.requestSource_option)){
            cy.log(returnSource)
            $el.find(Nudge.optionSelect).click()
        }
    })
    filters.clickonPlaceHolder().click()
    filters.clearAllAndApply().find('button').each(($el,index,$list) =>
    {
        if($el.text().includes('Apply'))
        {
            $el.click()
        }
    })

    filters.searchResultCard().then((cardforresults)=>{
           
       cy.log("Result ",cardforresults.find('p').length)
         if(cardforresults.find('p').length>0)
         {
             filters.OrderDetailsLineItem().then(($value) => {
                 length = $value.length

                 if (length === 1) {
                    cy.log('Only One order Item is present for the applied filter option ')
                     filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                         const OrderID=$el.text()
                         filters.requestedOnfieldDetails().should('contain',this.data.requestSource_option)
                         cy.log(OrderID)
                     })

                 }
                 else
                     if (length > 1) {
                        cy.log('multiple orders are present against the applied filter ')
                        filters.requestedOnfieldDetails().each(($el, index, $list) => {
                            expect($el).to.contain(this.data.requestSource_option)
                        })
                         filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                             const OrderIDs = $el.text();                  
                             cy.log(OrderIDs)
                         })
                     }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
             const NoorderFOund=$el.text()
             cy.log(NoorderFOund)
             cy.log('No results Were forund for this order ID ')
         })
            }
     })  
})

//Verify the settlement method filter dropdown is clickable and all the options are present and the checkbox is clickable 
it('ReturnRequests_06_08', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })

        filters.moreFiltersOption().click();
        cy.wait(1000)

    filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
        const FilterOption = $el.text();

        if (FilterOption.includes('Settlement method')) {
            cy.wait(1000)
            $el.click();
            cy.wait(1000)
        }
    })
    filters.dropdownItems().each(($el, index, $list) => {
        const settlementOption = $el.find('label').text()
        if(settlementOption.includes(this.data.settlementMethod_option)){
            cy.log(settlementOption)
            $el.find(Nudge.optionSelect).click()
        }
    })
    filters.clickonPlaceHolder().click()
    filters.clearAllAndApply().find('button').each(($el,index,$list) =>
    {
        if($el.text().includes('Apply'))
        {
            $el.click()
        }
    })

    filters.searchResultCard().then((cardforresults)=>{
           
       cy.log("Result ",cardforresults.find('p').length)
         if(cardforresults.find('p').length>0)
         {
             filters.OrderDetailsLineItem().then(($value) => {
                 length = $value.length

                 if (length === 1) {
                    cy.log('Only One order Item is present for the applied filter option ')
                     filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                         const OrderID=$el.text()
                         filters.settlementMethodDetails().should('have.text',this.data.settlementMethod_option)
                         cy.log(OrderID)
                     })

                 }
                 else
                     if (length > 1) {
                        cy.log('multiple orders are present against the applied filter ')
                        filters.settlementMethodDetails().each(($el, index, $list) => {
                            expect($el).to.have.text(this.data.settlementMethod_option)
                        })
                         filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                             const OrderIDs = $el.text();                  
                             cy.log(OrderIDs)
                         })
                     }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
             const NoorderFOund=$el.text()
             cy.log(NoorderFOund)
             cy.log('No results Were forund for this order ID ')
         })
            }
     })  
})

//Verify the Auto settlement filter dropdown is clickable and all the options are present and the checkbox is clickable 
it('ReturnRequests_06_09', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })

        filters.moreFiltersOption().click();
        cy.wait(1000)

    filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
        const FilterOption = $el.text();

        if(FilterOption.includes('Auto Settlement')) {
            cy.wait(1000)
            $el.click();
            cy.wait(1000)
        }
    })
    filters.autoSettleementDropdownoptions().each(($el, index, $list) => {
        const autoSettlement = $el.find('label').text()
        if(autoSettlement.includes(this.data.autoSettlement_option)){
            cy.log(autoSettlement)
            $el.find(Nudge.radioOption).click()
        }
    })
    filters.clickonPlaceHolder().click()
    filters.clearAllAndApply().find('button').each(($el,index,$list) =>
    {
        if($el.text().includes('Apply'))
        {
            $el.click()
        }
    })

    filters.searchResultCard().then((cardforresults)=>{
           
       cy.log("Result ",cardforresults.find('p').length)
         if(cardforresults.find('p').length>0)
         {
             filters.OrderDetailsLineItem().then(($value) => {
                 length = $value.length

                 if (length === 1) {
                    cy.log('Only One order Item is present for the applied filter option ')
                     filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                         const OrderID=$el.text()
                         filters.autoSettlementDetails().should('have.text',this.data.autoSettlement_option)
                         cy.log(OrderID)
                     })

                 }
                 else
                     if (length > 1) {
                        cy.log('multiple orders are present against the applied filter ')
                        filters.autoSettlementDetails().each(($el, index, $list) => {
                            expect($el).to.have.text(this.data.autoSettlement_option)
                        })
                         filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                             const OrderIDs = $el.text();                  
                             cy.log(OrderIDs)
                         })
                     }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
             const NoorderFOund=$el.text()
             cy.log(NoorderFOund)
             cy.log('No results Were forund for this order ID ')
         })
            }
     })  
})

//Verify the Shipping partner filter dropdown is clickable and all the options are present and the checkbox is clickable 
it('ReturnRequests_06_10', function () {
    const Nudge=new NudgesAndColumns();
    const filters=new Filters();
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

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })

        filters.moreFiltersOption().click();
        cy.wait(1000)

    filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
        const FilterOption = $el.text();

        if (FilterOption.includes('Shipping Partner')) {
            cy.wait(1000)
            $el.click();
            cy.wait(1000)
        }
    })
    filters.dropdownItems().each(($el, index, $list) => {
        const shippingPartner = $el.find('label').text()
        if(shippingPartner.includes(this.data.shippingPartner_options)){
            cy.log(shippingPartner)
            $el.find(Nudge.optionSelect).click()
        }
    })
    filters.clickonPlaceHolder().click()
    filters.clearAllAndApply().find('button').each(($el,index,$list) =>
    {
        if($el.text().includes('Apply'))
        {
            $el.click()
        }
    })

    filters.searchResultCard().then((cardforresults)=>{
           
       cy.log("Result ",cardforresults.find('p').length)
         if(cardforresults.find('p').length>0)
         {
             filters.OrderDetailsLineItem().then(($value) => {
                 length = $value.length

                 if (length === 1) {
                    cy.log('Only One order Item is present for the applied filter option ')
                     filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                         const OrderID=$el.text()
                         cy.log(OrderID)
                     })

                 }
                 else
                     if (length > 1) {
                        cy.log('multiple orders are present against the applied filter ')
                        filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                            const OrderIDs = $el.text();                  
                             cy.log(OrderIDs)
                        })                  
                                              
                     }
             })

         }
         else{
            filters.searchResultNotFound().then(($el)=>{
             const NoorderFOund=$el.text()
             cy.log(NoorderFOund)
             cy.log('No results Were forund for this order ID ')
         })
            }
     })  
})
})
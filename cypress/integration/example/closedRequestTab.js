import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import Filters from "../PageObjects/Filters"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
describe('New Requests filter check', function () {
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })

    //Verify search filter by order ID is working and  is displaying the valid filtered results  for closed requests tab 
    it('ReturnRequests_09_01', function () {
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
            misc.returnRequestSubTabs().each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Closed Requests')) {
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
        filters.getInputBoxForSearchFilter().type(this.data.orderIDForClosedRequest)
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
                             cy.log('The Order ID searched ',this.data.orderIDForClosedRequest)
                            if(OrderID.includes(this.data.orderIDForClosedRequest)){
                                cy.log('The searched ID is present in the table')
                             }
                         })
                         
                     }
                     else
                         if (length > 1) {
                             filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                                 const OrderIDs = $el.text();
                                 cy.log('The Order ID present on the dashboard',OrderIDs)
                             cy.log('The Order ID searched ',this.data.orderIDForClosedRequest)
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

    //Verify search filter by AWB no is working and  is displaying the valid filtered results  forclosed requests tab 
  it('ReturnRequests_09_02', function () {
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
            misc.returnRequestSubTabs().each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Closed Requests')) {
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
        filters.getInputBoxForSearchFilter().type(this.data.AWBForCLosedRequestTab)
        filters.getSearchSVG().click()    
    
        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("The length present",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length
    
                     if (length === 1) {
                         filters.awbFieldForClosedRequest().then(($el)=>{
                             const awb=$el.text()
                             cy.log('The AWB searched is present on the dashboard',awb)
                             cy.log('The AWB searched is',this.data.AWBForCLosedRequestTab)
                            if(awb.includes(this.data.AWBForCLosedRequestTab)){
                                cy.log('The searched AWB  is present in the table')
                             }
                         })
    
                     }
                     else
                         if (length > 1) {
                             filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                                 const OrderIDs = $el.text();
                                 cy.log('The Order ID present on the dashboard for the searched AWB',OrderIDs)
                             cy.log('The AWB searched ',this.data.AWBForCLosedRequestTab)
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

    //Verify search filter by customer number is working is displaying the valid filtered results for closed requests tab 
    it('ReturnRequests_09_03', function () {
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
            misc.returnRequestSubTabs().each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Closed Requests')) {
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
                             cy.log('The Customer no is  searched is',this.data.CustomerNumber)
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
                             filters.settlementMethodForPickupFailed().eq(0).then(($el)=>{
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

    //Verify on clicking on More details option in Order details all the necessory field values are present  in closed requests tab
    it.only('ReturnRequests_09_04', function () {
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
    
            misc.returnRequestSubTabs().each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Closed Requests')) {
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
        filters.getInputBoxForSearchFilter().type(this.data.orderIDForClosedRequest)
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
                             cy.log('The order ID searched ',this.data.orderIDForClosedRequest)
                             if(OrderID===this.data.orderIDForClosedRequest)
                             {
                                cy.log('The searched ID is present in the table')
                             }
                             cy.wait(1000)
                             filters.moreDetailsButtonForClosedTab().click()
                             cy.wait(2000)
                             filters.contentsFromSideBarFromMoreDetails().eq(1).should('have.text','Approved Request Status')
                             filters.contentsFromSideBarFromMoreDetails().eq(2).should('have.text','Settlement Id')
                             filters.contentsFromSideBarFromMoreDetails().eq(3).should('have.text','Refund Method')
                             filters.contentsFromSideBarFromMoreDetails().eq(4).should('have.text','Refund Date')
                             filters.contentsFromSideBarFromMoreDetails().eq(5).should('have.text','Request Accepted On')
                             filters.contentsFromSideBarFromMoreDetails().eq(6).should('have.text','Settlement Method')
                             filters.contentsFromSideBarFromMoreDetails().eq(7).should('have.text','Return Status')
                             filters.contentsFromSideBarFromMoreDetails().eq(8).should('have.text','Return AWB')
                             filters.contentsFromSideBarFromMoreDetails().eq(9).should('have.text','Tracking Id With Link')
                             filters.contentsFromSideBarFromMoreDetails().eq(10).should('have.text','Shipping Partner')
                             filters.contentsFromSideBarFromMoreDetails().eq(11).should('have.text','Quality Check on Return')
                             filters.contentsFromSideBarFromMoreDetails().eq(12).should('have.text','Auto Settlement')
                             filters.contentsFromSideBarFromMoreDetails().eq(13).should('have.text','Refund Amount(₹)')
                             filters.contentsFromSideBarFromMoreDetails().eq(14).should('have.text','Customer Paid')
                             filters.contentsFromSideBarFromMoreDetails().eq(15).should('have.text','Eligible Refund Amount')
                             filters.contentsFromSideBarFromMoreDetails().eq(16).should('have.text','Return Request Date')
                             filters.contentsFromSideBarFromMoreDetails().eq(17).should('have.text','Return policy')
                             filters.contentsFromSideBarFromMoreDetails().eq(19).should('have.text','Return Reason')
                             filters.contentsFromSideBarFromMoreDetails().eq(20).should('have.text','Customer Remark')
                             filters.contentsFromSideBarFromMoreDetails().eq(22).should('have.text','Customer Photos and Videos')
                             filters.contentsFromSideBarFromMoreDetails().eq(23).should('have.text','Forward order payment mode')
                             filters.contentsFromSideBarFromMoreDetails().eq(24).should('have.text','Customer Contact')
                             filters.contentsFromSideBarFromMoreDetails().eq(25).should('have.text','Customer Name')
                             filters.contentsFromSideBarFromMoreDetails().eq(26).should('have.text','Pickup Address')
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
})